"use client";

import { useEffect, useState } from "react";

/**
 * Reads a CSS custom property from :root so the 3D scene stays in sync
 * with the page palette defined in globals.css.
 */
export function useCssVar(name: string, fallback: string): string {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    const read = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
      if (!raw) return;
      setValue(raw.startsWith("#") || raw.startsWith("rgb") ? raw : `#${raw}`);
    };
    read();
    return;
  }, [name]);

  return value;
}
