"use client";

/**
 * ParticleWave — volumetric particle wave on a transparent background.
 *
 * Ported from seismos.com hero section. Renders a Three.js wave of
 * ~27,000 GPU points that respond to mouse hover and gracefully fade
 * in / scroll-dim. The canvas is transparent, so the component can be
 * dropped anywhere on top of any background (image, gradient, video…).
 *
 * USAGE
 *   import ParticleWave from "@/components/ParticleWave";
 *   <ParticleWave className="absolute inset-0 h-full w-full" />
 *
 * PROPS
 *   className        — applied to the wrapper div (positioning / size)
 *   waveLines        — number of horizontal wave lines (default 40)
 *   dotsPerLine      — points per line (default 690)
 *   colorCore        — inner color of the wave (default "#FF0000")
 *   colorEdge        — outer color of the wave (default "#FFFFFF")
 *   colorShadow      — shadow tint (default "#FF3C00")
 *   amplitude        — vertical amplitude (default 0.25)
 *   frequency        — wave frequency (default 25 on desktop, auto-scales)
 *   speed            — animation speed (default 0.3)
 *   particleSize     — point sprite size in px (default 5)
 *   interactive      — react to mouse hover (default true)
 *   introDuration    — seconds of fade-in (default 1.5)
 *
 * The component is a client component — just import it into any
 * server component; Next.js handles the boundary.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type ParticleWaveProps = {
  className?: string;
  waveLines?: number;
  dotsPerLine?: number;
  colorCore?: string;
  colorEdge?: string;
  colorShadow?: string;
  amplitude?: number;
  frequency?: number;
  speed?: number;
  particleSize?: number;
  interactive?: boolean;
  introDuration?: number;
  introDelay?: number;
  scrollIntensity?: number;
};

const VERT = /* glsl */ `
  precision highp float;
  uniform float uTime; uniform vec2 uMouse; uniform float uAmp;
  uniform float uFreq; uniform float uSpeed; uniform float uMRad;
  uniform float uMBoost; uniform float uMAttract; uniform float uPSize;
  uniform float uLines; uniform float uLSpread; uniform float uPShift;
  uniform float uAFalloff; uniform float uEnvW; uniform float uEnvP;
  uniform float uJitter; uniform float uAspect; uniform float uHover;
  uniform float uGlobalIntensity;

  attribute float aLine; attribute float aT; attribute vec2 aRand;
  varying float vAlpha; varying float vGlow; varying float vLineN;

  void main() {
    float nLine = (aLine / max(uLines - 1.0, 1.0)) * 2.0 - 1.0;
    float absL = abs(nLine);
    vLineN = absL;

    float x = position.x + aRand.x * uJitter * 0.004;
    float env = exp(-pow(abs(x) / uEnvW, uEnvP));
    float lAmp = 1.0 - pow(absL, 1.3) * uAFalloff;
    float phase = nLine * uPShift + aRand.y * uJitter * 0.1;

    float mx = uMouse.x * 2.0 - 1.0;
    float my = -(uMouse.y * 2.0 - 1.0);
    float dMx = abs(x - mx);
    float mInf = smoothstep(uMRad, 0.0, dMx) * uHover;
    float mInf2 = mInf * mInf;

    float amp = uAmp * env * lAmp * (1.0 + mInf2 * uMBoost) * uGlobalIntensity;

    float t = uTime * uSpeed;
    float f = uFreq;
    float wave  = sin(x*f + t + phase) * amp;
    wave += sin(x*f*2.1 + t*0.75 + phase*1.4) * amp * 0.35;
    wave += sin(x*f*3.3 + t*0.50 + phase*0.8) * amp * 0.15;
    wave += sin(x*f*0.6 + t*1.30 + phase*2.0) * amp * 0.20;

    float spread = uLSpread;
    float y = wave + nLine * spread + aRand.y * uJitter * 0.003 * env;

    vec2 pos2 = vec2(x, y);
    vec2 mPos = vec2(mx, my);
    float d2 = distance(pos2, mPos);
    float aRad = uMRad * 1.5;
    float attract = smoothstep(aRad, 0.0, d2);
    attract = attract * attract * uMAttract * 0.04 * uHover;
    vec2 aDir = normalize(mPos - pos2 + 0.0001);
    pos2 += aDir * attract;

    pos2.x *= uAspect;

    float edgeF = smoothstep(1.02, 0.7, abs(x));
    float envF  = smoothstep(0.0, 0.03, env);
    vAlpha = edgeF * envF * uGlobalIntensity;
    vGlow  = mInf2 + attract * 5.0;

    gl_PointSize = max(uPSize * (0.8 + env * 0.2) * (1.0 + vGlow * 0.2), 0.5);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos2, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform vec3 uColCore; uniform vec3 uColEdge; uniform vec3 uColShadow;
  uniform float uDiffuse; uniform float uOpacity; uniform float uDiffuseInten;
  varying float vAlpha; varying float vGlow; varying float vLineN;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);

    float alphaCircle = smoothstep(0.5, 0.05, d) * pow(1.0 - d * 2.0, 2.0);
    vec3 base = mix(uColCore, uColEdge, pow(vLineN, 0.5));
    vec3 col  = mix(base, uColShadow, uDiffuseInten * smoothstep(0.5, -0.5, uv.y));
    vec3 interactedCol = mix(col, uColEdge * (1.0 + vGlow * 0.5), smoothstep(0.0, 0.5, vGlow));

    gl_FragColor = vec4(interactedCol, alphaCircle * vAlpha * uOpacity);
  }
`;

const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) =>
  outMin +
  (outMax - outMin) *
    Math.min(Math.max((value - inMin) / (inMax - inMin), 0), 1);

export default function ParticleWave({
  className,
  waveLines = 40,
  dotsPerLine = 690,
  colorCore = "#FF0000",
  colorEdge = "#FFFFFF",
  colorShadow = "#FF3C00",
  amplitude = 0.25,
  frequency = 25,
  speed = 0.3,
  particleSize = 5,
  interactive = true,
  introDuration = 1.5,
  introDelay = 0.2,
  scrollIntensity = 0.5,
}: ParticleWaveProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Sizes / camera ---
    let W = container.clientWidth || 1;
    let H = container.clientHeight || 1;
    let aspect = W / H;
    let pixelRatio = Math.min(window.devicePixelRatio, 2);

    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 10);
    cam.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // ← transparent background, key for integration
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0); // ← fully transparent clear
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    // --- Geometry: lines × dotsPerLine grid of points ---
    const total = waveLines * dotsPerLine;
    const pos = new Float32Array(total * 3);
    const aLine = new Float32Array(total);
    const aT = new Float32Array(total);
    const aRand = new Float32Array(total * 2);

    let idx = 0;
    for (let ln = 0; ln < waveLines; ln++) {
      for (let d = 0; d < dotsPerLine; d++) {
        const t = d / (dotsPerLine - 1);
        pos[idx * 3] = t * 2 - 1;
        pos[idx * 3 + 1] = 0;
        pos[idx * 3 + 2] = 0;
        aLine[idx] = ln;
        aT[idx] = t;
        aRand[idx * 2] = (Math.random() - 0.5) * 2;
        aRand[idx * 2 + 1] = (Math.random() - 0.5) * 2;
        idx++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aLine", new THREE.BufferAttribute(aLine, 1));
    geo.setAttribute("aT", new THREE.BufferAttribute(aT, 1));
    geo.setAttribute("aRand", new THREE.BufferAttribute(aRand, 2));

    const matPoints = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uAmp: { value: amplitude },
        uFreq: { value: frequency },
        uSpeed: { value: speed },
        uMRad: { value: 0.32 },
        uMBoost: { value: 1.5 },
        uMAttract: { value: 0 },
        uPSize: { value: particleSize * pixelRatio },
        uLines: { value: waveLines },
        uLSpread: { value: 0 },
        uPShift: { value: 6.7 },
        uAFalloff: { value: 0.7 },
        uEnvW: { value: 0.45 },
        uEnvP: { value: 1.9 },
        uJitter: { value: 0 },
        uAspect: { value: aspect },
        uHover: { value: 0 },
        uGlobalIntensity: { value: 0 },
        uColCore: { value: new THREE.Color(colorCore) },
        uColEdge: { value: new THREE.Color(colorEdge) },
        uColShadow: { value: new THREE.Color(colorShadow) },
        uDiffuse: { value: 1 },
        uDiffuseInten: { value: 0.16 },
        uOpacity: { value: 1 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    scene.add(new THREE.Points(geo, matPoints));

    // --- Responsive freq/size ---
    const updateResponsive = () => {
      const w = container.clientWidth;
      matPoints.uniforms.uFreq.value = mapRange(w, 375, 1800, 6, frequency);
      matPoints.uniforms.uPSize.value =
        mapRange(w, 375, 1800, particleSize * 0.5, particleSize) * pixelRatio;
    };
    updateResponsive();

    // --- Mouse ---
    const mouse = { x: 0.5, y: 0.5 };
    const lerped = { x: 0.5, y: 0.5 };
    let hover = false;
    let hoverVal = 0;
    let introVal = 0;
    let scrollVal = 1;

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
      hover = true;
    };
    const onLeave = () => {
      hover = false;
    };
    if (interactive) {
      container.addEventListener("mousemove", onMove);
      container.addEventListener("mouseleave", onLeave);
    }

    // --- Resize ---
    const onResize = () => {
      W = container.clientWidth;
      H = container.clientHeight;
      aspect = W / H;
      cam.left = -aspect;
      cam.right = aspect;
      cam.updateProjectionMatrix();

      pixelRatio = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(W, H);

      matPoints.uniforms.uAspect.value = aspect;
      updateResponsive();
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    // --- Animation loop ---
    let rafId = 0;
    const loop = (time: number) => {
      const rect = container.getBoundingClientRect();
      const winH = window.innerHeight;
      const visiblePct = Math.max(
        0,
        Math.min(1, rect.bottom / (winH + rect.height))
      );
      const targetScroll =
        1.0 - Math.abs(0.5 - visiblePct) * 2.0 * scrollIntensity;
      scrollVal += (targetScroll - scrollVal) * 0.1;

      const elapsed = time * 0.001 - introDelay;
      const targetIntro = Math.max(
        0,
        Math.min(1, elapsed / introDuration)
      );
      introVal += (targetIntro - introVal) * 0.05;

      matPoints.uniforms.uTime.value = time * 0.001;
      matPoints.uniforms.uGlobalIntensity.value = introVal * scrollVal;

      lerped.x += (mouse.x - lerped.x) * 0.04;
      lerped.y += (mouse.y - lerped.y) * 0.04;
      hoverVal += ((hover ? 1.0 : 0.0) - hoverVal) * 0.05;

      matPoints.uniforms.uHover.value = hoverVal;
      matPoints.uniforms.uMouse.value.set(lerped.x, lerped.y);

      renderer.render(scene, cam);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      if (interactive) {
        container.removeEventListener("mousemove", onMove);
        container.removeEventListener("mouseleave", onLeave);
      }
      geo.dispose();
      matPoints.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [
    waveLines,
    dotsPerLine,
    colorCore,
    colorEdge,
    colorShadow,
    amplitude,
    frequency,
    speed,
    particleSize,
    interactive,
    introDuration,
    introDelay,
    scrollIntensity,
  ]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: interactive ? "auto" : "none",
        ...(!className ? { position: "relative" as const } : {}),
      }}
      aria-hidden="true"
    />
  );
}
