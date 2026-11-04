import * as THREE from "three";

/**
 * Standard equirectangular lat/lon -> 3D position mapping
 * (same convention used by the classic three.js earth textures).
 */
export function latLonToVector3(
  lat: number,
  lon: number,
  radius: number
): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

export function clamp01(t: number): number {
  return Math.max(0, Math.min(1, t));
}

/**
 * Arc between two points on a unit sphere: linear interpolation lifted
 * by a parabolic bulge along the interpolated direction, then smoothed
 * with a Catmull-Rom curve.
 */
export function createArcCurve(
  a: THREE.Vector3,
  b: THREE.Vector3
): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [];
  const segments = 20;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const bulge = -t * t + t;
    const p = a
      .clone()
      .multiplyScalar(1 - t)
      .add(b.clone().multiplyScalar(t));
    p.add(p.clone().normalize().multiplyScalar(bulge * 0.3));
    points.push(p);
  }
  return new THREE.CatmullRomCurve3(points);
}

/**
 * Rounded square ("squircle") used for the land dots.
 */
export function createSquircleGeometry(
  size: number,
  cornerRadius: number
): THREE.ShapeGeometry {
  const half = size / 2;
  const r = cornerRadius;
  const shape = new THREE.Shape();
  shape.moveTo(-half + r, -half);
  shape.lineTo(half - r, -half);
  shape.quadraticCurveTo(half, -half, half, -half + r);
  shape.lineTo(half, half - r);
  shape.quadraticCurveTo(half, half, half - r, half);
  shape.lineTo(-half + r, half);
  shape.quadraticCurveTo(-half, half, -half, half - r);
  shape.lineTo(-half, -half + r);
  shape.quadraticCurveTo(-half, -half, -half + r, -half);
  return new THREE.ShapeGeometry(shape);
}

/**
 * Fibonacci sphere point for candidate `index` out of `count`, at `radius`.
 *
 * Uses the golden angle (~2.4 rad) per index, so consecutive candidates
 * alternate sides of the sphere and the whole set covers it uniformly.
 * Returns the 3D position plus equirectangular uv that matches
 * THREE.SphereGeometry's texture mapping (hence the -0.25 u offset
 * applied by callers to sample the same image as the base sphere).
 */
export function fibonacciSpherePoint(
  index: number,
  count: number,
  radius: number
): { position: THREE.Vector3; u: number; v: number } {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const t = count <= 1 ? 0.5 : index / (count - 1);
  const phi = Math.acos(1 - 2 * t);
  const theta = goldenAngle * index;
  const position = new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta) * radius,
    Math.cos(phi) * radius,
    Math.sin(phi) * Math.sin(theta) * radius
  );
  // Equirectangular uv matching THREE.SphereGeometry's texture mapping
  // (hence the -0.25 u offset used by default).
  let u = Math.atan2(position.x, position.z) / (2 * Math.PI) + 0.5;
  u = ((u % 1) + 1) % 1;
  const v =
    Math.asin(Math.max(-1, Math.min(1, position.y / radius))) / Math.PI + 0.5;
  return { position, u, v };
}
