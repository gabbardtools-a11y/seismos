#!/usr/bin/env python3
"""
Render SROSS® brand SVG files to high-resolution PNGs and assemble
an HTML brand-sheet that shows all variants in one preview page.

Output goes to /home/z/my-project/download/sross-brand/
"""

import os
import shutil
import subprocess
from pathlib import Path

# Paths
SCRIPTS = Path("/home/z/my-project/scripts")
OUT = Path("/home/z/my-project/download/sross-brand")
OUT.mkdir(parents=True, exist_ok=True)

# Files to render (svg, png scale factor)
FILES = [
    ("sross_emblem.svg",            "sross_emblem.png",            4),  # 2400x2400
    ("sross_logo_horizontal.svg",   "sross_logo_horizontal.png",   3),  # 4200x1200
    ("sross_logo_vertical.svg",     "sross_logo_vertical.png",     3),  # 1800x2400
    ("sross_emblem_mono.svg",       "sross_emblem_mono.png",       4),  # 2400x2400
]

def render_svg_to_png(svg_path: Path, png_path: Path, scale: int):
    """Render SVG to PNG using rsvg-convert (fallback: cairosvg / Inkscape)."""
    # Try rsvg-convert first
    try:
        subprocess.run(
            ["rsvg-convert", "-d", str(scale*96), "-p", str(scale*96),
             "-o", str(png_path), str(svg_path)],
            check=True, capture_output=True
        )
        print(f"  [rsvg] {png_path.name}  ✓")
        return True
    except (FileNotFoundError, subprocess.CalledProcessError):
        pass

    # Fallback: Inkscape
    try:
        subprocess.run(
            ["inkscape", str(svg_path),
             "--export-type=png",
             f"--export-filename={png_path}",
             f"--export-dpi={scale*96}"],
            check=True, capture_output=True
        )
        print(f"  [inkscape] {png_path.name}  ✓")
        return True
    except (FileNotFoundError, subprocess.CalledProcessError):
        pass

    # Fallback: cairosvg via Python
    try:
        import cairosvg
        cairosvg.svg2png(url=str(svg_path), write_to=str(png_path),
                          scale=scale)
        print(f"  [cairosvg] {png_path.name}  ✓")
        return True
    except Exception as e:
        print(f"  [FAILED] {png_path.name}: {e}")
        return False

def main():
    print("=" * 60)
    print("SROSS® brand assets — rendering pipeline")
    print("=" * 60)

    # 1) Copy SVGs to download dir
    print("\n[1] Copying SVG sources to download dir...")
    for svg_name, _, _ in FILES:
        src = SCRIPTS / svg_name
        dst = OUT / svg_name
        shutil.copy(src, dst)
        print(f"  {svg_name}  ✓")

    # 2) Render PNGs
    print("\n[2] Rendering SVG → PNG (high resolution)...")
    for svg_name, png_name, scale in FILES:
        svg = SCRIPTS / svg_name
        png = OUT / png_name
        render_svg_to_png(svg, png, scale)

    # 3) Render favicon (16, 32, 64, 180, 512)
    print("\n[3] Generating favicon set from emblem...")
    for size in [16, 32, 64, 180, 192, 512]:
        fav = OUT / f"favicon_{size}.png"
        render_svg_to_png(SCRIPTS / "sross_emblem.svg", fav, max(1, size // 200))

    print("\n" + "=" * 60)
    print("DONE. Files written to:", OUT)
    print("=" * 60)

    # List output
    print("\nOutput directory:")
    for f in sorted(OUT.iterdir()):
        size = f.stat().st_size
        print(f"  {f.name:40s}  {size/1024:8.1f} KB")

if __name__ == "__main__":
    main()
