"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { latLonToVector3 } from "@/lib/globe/geo";

interface GraticuleProps {
  color: string;
  radius?: number;
  meridians?: number;
  parallels?: number;
  diagonals?: number;
}

/**
 * Wireframe over the globe: meridians (half circles pole to pole),
 * the equator, evenly spaced parallels and a set of great circles
 * through the poles ("diagonals").
 */
export function Graticule({
  color,
  radius = 1,
  meridians = 24,
  parallels = 23,
  diagonals = 12,
}: GraticuleProps) {
  const material = useMemo(
    () => new THREE.LineBasicMaterial({ transparent: true, opacity: 1 }),
    []
  );

  useEffect(() => {
    material.color.set(color);
  }, [color, material]);

  const lines = useMemo(() => {
    const result: THREE.Line[] = [];

    const addLine = (points: THREE.Vector3[], key: string) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      line.raycast = () => null;
      line.name = key;
      result.push(line);
    };

    // Meridians.
    for (let m = 0; m < meridians; m++) {
      const lon = -180 + (360 / meridians) * m;
      const points: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat++) {
        points.push(latLonToVector3(lat, lon, radius));
      }
      addLine(points, `mer-${m}`);
    }

    // Equator.
    const equator: THREE.Vector3[] = [];
    for (let lon = -180; lon <= 180; lon++) {
      equator.push(latLonToVector3(0, lon, radius));
    }
    addLine(equator, "equator");

    // Parallels.
    for (let p = 0; p < parallels; p++) {
      const lat = -90 + (180 / (parallels + 1)) * (p + 1);
      if (Math.abs(lat) < 5) continue;
      const points: THREE.Vector3[] = [];
      for (let lon = -180; lon <= 180; lon++) {
        points.push(latLonToVector3(lat, lon, radius));
      }
      addLine(points, `par-${p}`);
    }

    // Diagonal great circles through the poles.
    for (let d = 0; d < diagonals; d++) {
      const phase = d * 30 * (Math.PI / 180);
      const points: THREE.Vector3[] = [];
      for (let a = 0; a <= 360; a += 2) {
        const rad = a * (Math.PI / 180);
        points.push(
          new THREE.Vector3(
            radius * Math.sin(rad) * Math.cos(phase),
            radius * Math.cos(rad),
            radius * Math.sin(rad) * Math.sin(phase)
          )
        );
      }
      addLine(points, `diag-${d}`);
    }

    return result;
  }, [radius, meridians, parallels, diagonals, material]);

  useEffect(() => {
    return () => {
      lines.forEach((line) => {
        line.geometry.dispose();
      });
      material.dispose();
    };
  }, [lines, material]);

  return (
    <group>
      {lines.map((line) => (
        <primitive key={line.name} object={line} raycast={() => null} />
      ))}
    </group>
  );
}
