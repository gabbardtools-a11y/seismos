"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { fibonacciSpherePoint } from "@/lib/globe/geo";

interface LandDotsProps {
  color: string;
  radius?: number;
  /** Equirectangular earth texture for the subtle base sphere. */
  textureUrl?: string;
  /** Pre-built binary land mask (white = land). */
  maskUrl?: string;
  /** Number of Fibonacci-sphere candidate points. */
  pixelCount?: number;
  /** Dot size in world units. */
  pixelSize?: number;
  uOffset?: number;
  vOffset?: number;
  showBaseSphere?: boolean;
  /** Tint multiplied over the base-sphere texture (cool it down, etc.). */
  baseTint?: string;
  /**
   * "dots" — подсвеченная сфера + синие точки суши,
   * "real" — реалистичная текстура Земли на всю непрозрачность.
   */
  mode?: "dots" | "real";
}

/**
 * Dotted continents: candidates are distributed over a Fibonacci sphere,
 * then kept when the matching pixel of a pre-built land mask is land.
 * All kept dots are baked into a single merged BufferGeometry (one draw
 * call, no instancing) of small squares oriented towards the globe center.
 */
export function LandDots({
  color,
  radius = 0.99,
  textureUrl = "/static/earth_atmos_2048.jpg",
  maskUrl = "/static/land-mask.png",
  pixelCount = 50000,
  pixelSize = 0.012,
  uOffset = -0.25,
  vOffset = 0,
  showBaseSphere = true,
  baseTint = "#ffffff",
  mode = "dots",
}: LandDotsProps) {
  const texture = useLoader(TextureLoader, textureUrl);
  const maskTexture = useLoader(TextureLoader, maskUrl);
  const meshRef = useRef<THREE.Mesh>(null);
  const [dotsGeometry, setDotsGeometry] = useState<THREE.BufferGeometry | null>(null);

  // Корректные цвета текстуры (sRGB) — иначе реалистичный режим выглядит блекло.
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      }),
    []
  );

  useEffect(() => {
    material.color.set(color);
  }, [color, material]);

  // Rasterize the mask once and build the land test.
  useEffect(() => {
    const image = maskTexture.image as HTMLImageElement | undefined;
    if (!image || !image.width) return;
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.drawImage(image, 0, 0);
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;

    setLandTestInternal(
      () => (u: number, v: number) => {
        const x = Math.floor((((u % 1) + 1) % 1) * width) % width;
        const y = Math.floor((1 - Math.max(0, Math.min(1, v))) * (height - 1));
        const i = (y * width + x) * 4;
        if (i < 0 || i >= data.length - 3) return false;
        return data[i] > 127;
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maskTexture]);

  const [landTest, setLandTestInternal] = useState<
    ((u: number, v: number) => boolean) | null
  >(null);

  // Bake all land dots into one merged geometry.
  useEffect(() => {
    if (!landTest) return;

    const half = pixelSize / 2;
    const corners: Array<[number, number]> = [
      [-half, -half],
      [half, -half],
      [half, half],
      [-half, half],
    ];

    const positions: number[] = [];
    const indices: number[] = [];
    const normal = new THREE.Vector3();
    const tangent = new THREE.Vector3();
    const bitangent = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    const fallback = new THREE.Vector3(1, 0, 0);
    const vertex = new THREE.Vector3();

    for (let i = 0; i < pixelCount; i++) {
      const { position, u, v } = fibonacciSpherePoint(i, pixelCount, radius);
      const uu = u + uOffset;
      const vv = Math.max(0, Math.min(1, v + vOffset));
      if (!landTest(uu, vv)) continue;

      normal.copy(position).divideScalar(radius);
      tangent.copy(up).cross(normal);
      if (tangent.lengthSq() < 1e-6) tangent.copy(fallback).cross(normal);
      tangent.normalize();
      bitangent.copy(normal).cross(tangent).normalize();

      const base = positions.length / 3;
      for (const [cx, cy] of corners) {
        vertex
          .copy(position)
          .addScaledVector(tangent, cx)
          .addScaledVector(bitangent, cy);
        positions.push(vertex.x, vertex.y, vertex.z);
      }
      indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    setDotsGeometry(geometry);

    return () => {
      geometry.dispose();
    };
  }, [landTest, pixelCount, radius, pixelSize, uOffset, vOffset]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  return (
    <group>
      {showBaseSphere && (
        <mesh renderOrder={0}>
          <sphereGeometry args={[radius - 0.01, 64, 64]} />
          {mode === "real" ? (
            // Реалистичный режим: текстура на всю непрозрачность + мягкий
            // свет. Emissive-слой с той же текстурой подсвечивает тени,
            // чтобы глобус не уходил в черноту по краям.
            <meshPhongMaterial
              map={texture}
              emissive="#ffffff"
              emissiveMap={texture}
              emissiveIntensity={0.42}
              shininess={5}
              specular="#1a1a1a"
            />
          ) : (
            // Режим «точки»: океан — чистый голубой цвет (без спутниковой
            // текстуры, иначе сквозь точки проступает коричнево-серая суша).
            // baseTint по умолчанию #d8e6f8 — холодный светло-голубой океан.
            <meshBasicMaterial
              color={baseTint}
              side={THREE.DoubleSide}
            />
          )}
        </mesh>
      )}
      {dotsGeometry && (
        <mesh
          ref={meshRef}
          geometry={dotsGeometry}
          material={material}
          renderOrder={1}
          frustumCulled={false}
          visible={mode === "dots"}
          raycast={() => null}
        />
      )}
    </group>
  );
}
