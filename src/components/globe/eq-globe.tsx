"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { LandDots } from "./land-dots";
import { latLonToVector3 } from "@/lib/globe/geo";
import { useCssVar } from "@/hooks/use-css-var";
import {
  formatCoords,
  formatDepth,
  formatEventTime,
  magColor,
  timeAgoRu,
  MAG_LEGEND,
  type EqEvent,
  type EqResponse,
} from "@/lib/earthquakes";
import { findNearestCity, formatLocation, type NearestCity } from "@/lib/geo/nearest-city";

/* ------------------------------------------------------------------ */
/* Данные: /api/earthquakes (серверный прокси к источнику данных)      */
/* ------------------------------------------------------------------ */

function useEarthquakes() {
  const [data, setData] = useState<EqResponse | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/earthquakes", { cache: "no-store" });
        const json = (await res.json()) as EqResponse;
        if (alive) setData(json);
      } catch {
        /* сеть моргнула — оставляем предыдущие данные */
      }
    };
    load();
    const id = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // тик для пересчёта относительного времени в тултипах/статистике
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  return { data, now };
}

/* ------------------------------------------------------------------ */
/* 3D: маркеры землетрясений (THREE.Points + шейдер пульсации)         */
/* ------------------------------------------------------------------ */

const MARKER_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uHover;
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;
  attribute float aIndex;
  varying vec3 vColor;
  varying float vPhase;
  varying float vHover;
  void main() {
    vColor = aColor;
    vPhase = aPhase;
    vHover = step(abs(aIndex - uHover), 0.5);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float pulse = 1.0 + 0.12 * sin(uTime * 2.6 + aPhase * 6.2831853);
    // min() ограничивает рост спрайта при сильном приближении, иначе
    // маркеры превращаются в огромные пятна, парящие над поверхностью.
    gl_PointSize = aSize * uPixelRatio * pulse * (1.0 + vHover * 0.4) * min(3.8 / -mvPosition.z, 2.8);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const MARKER_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uPeriod;
  varying vec3 vColor;
  varying float vPhase;
  varying float vHover;
  void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float r = length(uv);
    if (r > 1.0) discard;

    // белая подложка отделяет маркер от точек континентов
    float core = 1.0 - smoothstep(0.24, 0.32, r);
    float base = 1.0 - smoothstep(0.34, 0.42, r);

    // расширяющееся кольцо: период ~2.6 с, старт сдвинут по aPhase
    float t = fract(uTime / uPeriod + vPhase);
    float ringR = mix(0.42, 0.95, t);
    float ring = (1.0 - smoothstep(0.0, 0.08, abs(r - ringR))) * (1.0 - t) * (1.0 - t);
    float glow = (1.0 - smoothstep(0.25, 0.65, r)) * (0.14 + vHover * 0.25);

    vec3 col = mix(vec3(1.0), vColor, core);
    float alpha = max(base * 0.95, core) + ring * 0.85 + glow;
    if (alpha < 0.02) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;

interface HoverInfo {
  event: EqEvent;
  index: number;
}

/**
 * Однократно разворачивает камеру к заданной долготе (самое сильное
 * событие ленты), чтобы глобус сразу показывал населённую полусферу.
 */
function CameraAim({ lon, distance }: { lon: number; distance: number }) {
  const { camera } = useThree();
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const dir = latLonToVector3(0, lon, 1);
    camera.position.set(dir.x * distance, 0, dir.z * distance);
    camera.lookAt(0, 0, 0);
  }, [lon, distance, camera]);
  return null;
}

/**
 * Держит туман привязанным к дистанции камеры: при зуме колесом
 * глубина заднего плана остаётся визуально одинаковой.
 */
function FogFollow() {
  const { camera, scene } = useThree();
  useFrame(() => {
    const fog = scene.fog as THREE.Fog | null;
    if (!fog) return;
    const d = camera.position.length();
    fog.near = Math.max(0.1, d - 0.5);
    fog.far = d + 1.3;
  });
  return null;
}

/* ------------------------------------------------------------------ */
/* Атмосфера: fresnel-нимб по краю реалистичного глобуса                */
/* ------------------------------------------------------------------ */

const ATMO_VERT = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vViewDirW;
  void main() {
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vViewDirW = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const ATMO_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uInnerPower;
  uniform float uEdgeStart;
  varying vec3 vNormalW;
  varying vec3 vViewDirW;
  void main() {
    // rim: 0 в центре диска, 1 на внешней кромке атмосферы.
    // Плотность держится по всему видимому кольцу и плавно гасится
    // только у самой внешней кромки (smoothstep) — мягкий край без ступеньки.
    float rim = 1.0 - abs(dot(normalize(vNormalW), normalize(vViewDirW)));
    float s = clamp((1.0 - rim) / (1.0 - uEdgeStart), 0.0, 1.0);
    float fade = s * s * (3.0 - 2.0 * s);
    float a = pow(clamp(rim, 0.0, 1.0), uInnerPower) * fade * uIntensity;
    gl_FragColor = vec4(uColor, a);
  }
`;

function AtmosphereMesh({
  radius,
  color,
  intensity,
  innerPower,
  edgeStart,
}: {
  radius: number;
  color: string;
  intensity: number;
  innerPower: number;
  edgeStart: number;
}) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: ATMO_VERT,
        fragmentShader: ATMO_FRAG,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uIntensity: { value: intensity },
          uInnerPower: { value: innerPower },
          uEdgeStart: { value: edgeStart },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
      }),
    // Материал создаётся один раз на слой атмосферы.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => () => material.dispose(), [material]);

  return (
    <mesh material={material} renderOrder={3} raycast={() => null}>
      <sphereGeometry args={[radius, 64, 64]} />
    </mesh>
  );
}

/** Двухслойная дымка: насыщенный ободок у лимба + мягкое широкое сияние. */
function GlobeAtmosphere() {
  return (
    <>
      <AtmosphereMesh
        radius={1.012}
        color="#7fb9ff"
        intensity={0.85}
        innerPower={1.6}
        edgeStart={0.82}
      />
      <AtmosphereMesh
        radius={1.052}
        color="#5da2ff"
        intensity={0.5}
        innerPower={1.3}
        edgeStart={0.75}
      />
    </>
  );
}

function EqMarkers({
  events,
  mouseRef,
  hoveredIndexRef,
  onHoverChange,
  tooltipRef,
}: {
  events: EqEvent[];
  mouseRef: React.RefObject<{ x: number; y: number; inside: boolean }>;
  hoveredIndexRef: React.RefObject<number>;
  onHoverChange: (info: HoverInfo | null) => void;
  tooltipRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { gl, camera } = useThree();

  const geometry = useMemo(() => {
    const count = events.length;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const indices = new Float32Array(count);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const ev = events[i];
      // Радиус 0.99 — уровень точек суши: маркер прижат к поверхности,
      // а не парит над ней (у горизонта его естественно срезает сфера).
      const p = latLonToVector3(ev.lat, ev.lon, 0.99);
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
      sizes[i] = Math.min(11 + (ev.mag - 2.5) * 5, 34);
      color.set(magColor(ev.mag));
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      phases[i] = (i * 0.618034) % 1;
      indices[i] = i;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geo.setAttribute("aIndex", new THREE.BufferAttribute(indices, 1));
    return geo;
  }, [events]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: MARKER_VERT,
        fragmentShader: MARKER_FRAG,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        uniforms: {
          uTime: { value: 0 },
          uPeriod: { value: 2.6 },
          uPixelRatio: { value: 1 },
          uHover: { value: -1 },
        },
      }),
    []
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  const pointsRef = useRef<THREE.Points>(null);
  const frameCount = useRef(0);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uPixelRatio.value = gl.getPixelRatio();
    material.uniforms.uHover.value = hoveredIndexRef.current ?? -1;

    const points = pointsRef.current;
    if (!points) return;

    const rect = gl.domElement.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const mouse = mouseRef.current;
    const center = new THREE.Vector3();
    points.parent?.getWorldPosition(center);

    // --- поиск маркера под курсором + экранные позиции (для тестов) ---
    let best: { index: number; x: number; y: number; dist: number } | null = null;
    const world = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const toCam = new THREE.Vector3();
    const camPos = new THREE.Vector3();
    camera.getWorldPosition(camPos);

    const screens: Array<{ id: string; x: number; y: number }> = [];
    const dumpScreens = frameCount.current % 15 === 0;
    let maxFacing = -2;

    for (let i = 0; i < events.length; i++) {
      world
        .set(
          geometry.attributes.position.getX(i),
          geometry.attributes.position.getY(i),
          geometry.attributes.position.getZ(i)
        )
        .applyMatrix4(points.matrixWorld);

      // только ближайшая к камере сторона глобуса
      normal.copy(world).sub(center).normalize();
      toCam.copy(camPos).sub(world).normalize();
      const facing = normal.dot(toCam);
      if (facing > maxFacing) maxFacing = facing;
      if (facing < 0.05) continue;

      const projected = world.clone().project(camera);
      const x = (projected.x * 0.5 + 0.5) * rect.width;
      const y = (projected.y * -0.5 + 0.5) * rect.height;
      if (dumpScreens && facing > 0.15) {
        screens.push({ id: events[i].id, x: Math.round(x), y: Math.round(y) });
      }

      if (mouse?.inside) {
        const dist = Math.hypot(x - mouse.x, y - mouse.y);
        if (dist < 26 && (!best || dist < best.dist)) {
          best = { index: i, x, y, dist };
        }
      }
    }

    if (dumpScreens) {
      (window as unknown as Record<string, unknown>).__eqScreens = {
        top: rect.top,
        left: rect.left,
        points: screens,
        debug: {
          events: events.length,
          cam: camPos.toArray().map((v) => +v.toFixed(2)),
          maxFacing: +maxFacing.toFixed(3),
        },
      };
    }
    frameCount.current += 1;

    const prev = hoveredIndexRef.current ?? -1;
    const nextIndex = best ? best.index : -1;
    if (prev !== nextIndex) {
      hoveredIndexRef.current = nextIndex;
      onHoverChange(best ? { event: events[best.index], index: best.index } : null);
    }

    // --- тултип следует за маркером ---
    const tip = tooltipRef.current;
    if (tip && nextIndex >= 0) {
      const target = best && best.index === nextIndex ? best : null;
      if (target) {
        const flipX = target.x + 300 > rect.width;
        const flipY = target.y + 210 > rect.height;
        const tx = flipX ? target.x - 16 : target.x + 16;
        const ty = flipY ? target.y - 16 : target.y + 16;
        tip.style.transform = `translate3d(${tx}px, ${ty}px, 0) ${flipX ? "translateX(-100%)" : ""} ${flipY ? "translateY(-100%)" : ""}`;
      }
    }
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      frustumCulled={false}
      renderOrder={2}
      raycast={() => null}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Публичный компонент: канвас + HTML-оверлей (тултип, легенда)        */
/* ------------------------------------------------------------------ */

export function EqGlobe({
  variant = "full",
  className,
  heightClass,
  autoRotateSpeed = 0.3,
  initialLon,
}: {
  /**
   * "full" — полный виджет с тулбаром, тултипом, легендой и статистикой
   *          (используется на странице /seismo-globus).
   * "minimal" — только вращающийся глобус без оверлеев; идеально для
   *          встраивания в hero или на главную. Суша всегда в режиме "dots".
   */
  variant?: "full" | "minimal";
  /** className для внешнего контейнера (полная ширина/высота по умолчанию). */
  className?: string;
  /** className для обёртки Canvas (высота). По умолчанию h-[560px] md:h-[760px]. */
  heightClass?: string;
  /** Скорость авто-вращения. 0 = выключено. */
  autoRotateSpeed?: number;
  /** Зафиксировать начальную долготу (поверх), иначе — по самому сильному событию. */
  initialLon?: number;
}) {
  const { data, now } = useEarthquakes();
  const background = useCssVar("--globe-bg", "#fffbf5");
  // Суша — синяя: красные сейсмические маркеры контрастнее на холодном фоне.
  const land = useCssVar("--globe-land", "#2563eb");
  const oceanTint = useCssVar("--globe-ocean-tint", "#d8e6f8");

  const events = useMemo(() => data?.events ?? [], [data]);

  const mouseRef = useRef({ x: 0, y: 0, inside: false });
  const hoveredIndexRef = useRef<number>(-1);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<HoverInfo | null>(null);
  const [nearestCity, setNearestCity] = useState<NearestCity | null>(null);

  // При смене наведённого события — асинхронно ищем ближайший город
  useEffect(() => {
    if (!hovered) {
      setNearestCity(null);
      return;
    }
    let cancelled = false;
    findNearestCity(hovered.event.lat, hovered.event.lon).then((city) => {
      if (!cancelled) setNearestCity(city);
    });
    return () => {
      cancelled = true;
    };
  }, [hovered]);

  const location = formatLocation(nearestCity);

  const isMinimal = variant === "minimal";

  // Вид суши: реалистичная текстура или синие точки (переключатель на глобусе).
  // В minimal-режиме — всегда "dots".
  const [landMode, setLandMode] = useState<"real" | "dots">(
    isMinimal ? "dots" : "real"
  );

  // начальная ориентация: зафиксированная lon ИЛИ самое сильное событие ленты
  const [aimLon, setAimLon] = useState<number | null>(
    typeof initialLon === "number" ? initialLon : null
  );
  useEffect(() => {
    if (aimLon === null && events.length > 0) {
      const strongest = events.reduce((a, b) => (b.mag > a.mag ? b : a));
      setAimLon(strongest.lon);
    }
  }, [aimLon, events]);

  const onHoverChange = useCallback((info: HoverInfo | null) => {
    setHovered(info);
  }, []);

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      // Тултип работает в обоих режимах — отслеживаем позицию курсора
      const rect = e.currentTarget.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        inside: true,
      };
    },
    []
  );

  const handlePointerLeave = useCallback(() => {
    mouseRef.current = { x: 0, y: 0, inside: false };
    hoveredIndexRef.current = -1;
    setHovered(null);
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Камера приближенна — глобус занимает почти всю высоту кадра.
  const cameraDistance = isMobile ? 3.4 : 3.1;
  const cameraPosition = useMemo<[number, number, number]>(
    () => [0, -0.5, cameraDistance],
    [cameraDistance]
  );

  /* статистика по ленте */
  const stats = useMemo(() => {
    if (events.length === 0) return null;
    const maxMag = events.reduce((m, e) => Math.max(m, e.mag), 0);
    const last = events[0];
    return { count: events.length, maxMag, last };
  }, [events]);

  return (
    <div className={className ?? "flex w-full flex-col items-center"}>
      {/* баннеры состояния — только в full-режиме */}
      {!isMinimal && data?.stale && (
        <div className="mb-3 w-full max-w-[1200px] rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-2 text-center text-xs text-amber-800">
          {data.error ?? "Источник недоступен — показаны последние сохранённые данные."}
        </div>
      )}
      {!isMinimal && data && !data.ok && (
        <div className="mb-3 w-full max-w-[1200px] rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-center text-xs text-red-700">
          {data.error ?? "Не удалось загрузить данные."}
        </div>
      )}

      {/* глобус */}
      <div
        className={
          heightClass ??
          "relative h-[560px] w-full cursor-grab active:cursor-grabbing md:h-[760px]"
        }
        aria-label="Интерактивный глобус землетрясений"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* переключатель вида суши — только в full-режиме */}
        {!isMinimal && (
          <div className="absolute right-4 top-4 z-20 inline-flex overflow-hidden rounded-full border border-globe-border bg-white/85 p-1 shadow-sm backdrop-blur-sm">
            {(
              [
                ["real", "Реалистичная"],
                ["dots", "Точки"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={landMode === value}
                onClick={() => setLandMode(value)}
                className={`h-7 rounded-full px-3.5 text-xs font-medium transition-colors ${
                  landMode === value
                    ? "bg-globe-accent text-white"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <Canvas
          camera={{ position: cameraPosition, fov: 45 }}
          dpr={[1, 1.5]}
          flat
          gl={{
            antialias: true,
            // В minimal-режиме Canvas прозрачный — просвечивает фон страницы
            // (например, .bg-paper-grid в hero). В full-режиме — непрозрачный
            // (фиксированный бежевый фон из --globe-bg).
            alpha: isMinimal,
            powerPreference: "default",
          }}
        >
          {/* Фон сцены: в full-режиме — бежевый, в minimal — прозрачный */}
          {!isMinimal && <color attach="background" args={[background]} />}
          {!isMinimal && <fog attach="fog" args={[background, 2.6, 4.4]} />}
          {/* Свет нужен только реалистичной сфере (meshPhongMaterial);
              точки и маркеры используют неосвещаемые материалы. */}
          <ambientLight intensity={1.05} />
          <directionalLight position={[4, 2.5, 5]} intensity={1.5} />
          {aimLon !== null && (
            <CameraAim lon={aimLon} distance={cameraDistance} />
          )}
          <FogFollow />
          <OrbitControls
            enablePan={false}
            // Зум колесом мыши выключаем в minimal-режиме — иначе OrbitControls
            // перехватывает wheel и страница не скроллится в hero.
            enableZoom={!isMinimal}
            minDistance={2.1}
            maxDistance={4.6}
            zoomSpeed={0.8}
            // Вращение мышью включено в обоих режимах — пользователь может
            // крутить глобус. Авто-вращение продолжает работать после отпускания.
            enableRotate
            // Вертикальное вращение разблокировано: наклон «на зрителя» и
            // «от зрителя». Ограничиваем полярный угол, чтобы не переворачивать
            // глобус через полюс.
            minPolarAngle={Math.PI * 0.15}
            maxPolarAngle={Math.PI * 0.85}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.8}
            autoRotate
            autoRotateSpeed={autoRotateSpeed}
          />
          <group scale={1.2} rotation={[0, 0, -0.25]} position={[0, 0, 0]}>
            <LandDots mode={landMode} color={land} baseTint={oceanTint} />
            {landMode === "real" && <GlobeAtmosphere />}
            <EqMarkers
              events={events}
              mouseRef={mouseRef}
              hoveredIndexRef={hoveredIndexRef}
              onHoverChange={onHoverChange}
              tooltipRef={tooltipRef}
            />
          </group>
        </Canvas>

        {/* карточка события при наведении — рендерится в обоих режимах */}
        {hovered && (
          <div
            ref={tooltipRef}
            className="pointer-events-none absolute left-0 top-0 z-20 w-[264px]"
            style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
          >
            <div className="relative rounded-xl border border-globe-border bg-white/95 p-3.5 shadow-lg backdrop-blur-sm">
              <span className="pointer-events-none absolute -left-[1.5px] -top-[1.5px] h-[2px] w-4 bg-globe-accent" />
              <span className="pointer-events-none absolute -left-[1.5px] -top-[1.5px] h-4 w-[2px] bg-globe-accent" />
              <span className="pointer-events-none absolute -bottom-[1.5px] -right-[1.5px] h-[2px] w-4 bg-globe-accent" />
              <span className="pointer-events-none absolute -bottom-[1.5px] -right-[1.5px] h-4 w-[2px] bg-globe-accent" />

              <div className="flex items-baseline gap-2">
                <span
                  className="text-2xl font-semibold leading-none"
                  style={{ color: magColor(hovered.event.mag) }}
                >
                  M {hovered.event.mag.toFixed(1)}
                </span>
                <span className="text-xs text-foreground/60">землетрясение</span>
              </div>

              <dl className="mt-2.5 space-y-1.5 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-foreground/50">Место</dt>
                  <dd className="text-right font-medium text-foreground/80">
                    {location.primary}
                    {location.secondary && (
                      <span className="block text-[10px] font-normal text-foreground/50">
                        {location.secondary}
                      </span>
                    )}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-foreground/50">Время</dt>
                  <dd className="text-right font-medium text-foreground/80">
                    {formatEventTime(hovered.event.time)}
                    <span className="block text-[10px] font-normal text-foreground/50">
                      {timeAgoRu(hovered.event.time, now)}
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-foreground/50">Координаты</dt>
                  <dd className="text-right font-medium text-foreground/80">
                    {formatCoords(hovered.event.lat, hovered.event.lon)}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-foreground/50">Глубина</dt>
                  <dd className="font-medium text-foreground/80">
                    {formatDepth(hovered.event.depthKm)}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-foreground/50">Источник</dt>
                  <dd className="font-medium text-foreground/80">{hovered.event.agency}</dd>
                </div>
              </dl>

              <a
                href="#"
                className="mt-2.5 inline-block text-[11px] font-medium text-globe-accent hover:underline"
              >
                Подробнее →
              </a>
            </div>
          </div>
        )}

        {/* загрузка — только в full-режиме */}
        {!isMinimal && !data && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <div className="rounded-full border border-globe-border bg-white/80 px-4 py-1.5 text-xs text-foreground/60">
              Загружаем данные…
            </div>
          </div>
        )}
      </div>

      {/* легенда + статистика — только в full-режиме */}
      {!isMinimal && (
        <>
          <div className="mt-4 flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-foreground/60">
            {MAG_LEGEND.map((tier) => (
              <span key={tier.label} className="inline-flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: tier.color }}
                />
                {tier.label}
              </span>
            ))}
            <span className="text-foreground/40">
              Наведите курсор на маркер — карточка события. Тяните глобус — вращение и наклон, колесо мыши — масштаб.
            </span>
          </div>

          <div className="mx-auto mt-5 grid w-full max-w-[1200px] grid-cols-2 gap-3 px-6 pb-4 md:grid-cols-4">
            <div className="rounded-2xl border border-globe-border bg-white/60 px-5 py-4 text-center">
              <div className="text-2xl font-semibold text-globe-accent">
                {stats ? stats.count : "—"}
              </div>
              <div className="mt-1 text-xs text-foreground/60">событий в ленте</div>
            </div>
            <div className="rounded-2xl border border-globe-border bg-white/60 px-5 py-4 text-center">
              <div className="text-2xl font-semibold text-globe-accent">
                {stats ? `M ${stats.maxMag.toFixed(1)}` : "—"}
              </div>
              <div className="mt-1 text-xs text-foreground/60">максимум в ленте</div>
            </div>
            <div className="rounded-2xl border border-globe-border bg-white/60 px-5 py-4 text-center">
              <div className="text-2xl font-semibold text-globe-accent">
                {stats ? timeAgoRu(stats.last.time, now) : "—"}
              </div>
              <div className="mt-1 text-xs text-foreground/60">последнее событие</div>
            </div>
            <div className="rounded-2xl border border-globe-border bg-white/60 px-5 py-4 text-center">
              <div className="text-2xl font-semibold text-globe-accent">
                {data ? formatEventTime(data.fetchedAt) : "—"}
              </div>
              <div className="mt-1 text-xs text-foreground/60">
                данные обновлены {data?.stale ? "(кэш)" : ""}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
