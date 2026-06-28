#!/usr/bin/env python3
"""Re-render favicons at correct pixel sizes using cairosvg output_width."""
import cairosvg
from pathlib import Path

SRC = Path("/home/z/my-project/scripts/sross_emblem.svg")
OUT = Path("/home/z/my-project/download/sross-brand")

# Re-render favicons at exact pixel sizes
for size in [16, 32, 64, 180, 192, 512]:
    out = OUT / f"favicon_{size}.png"
    cairosvg.svg2png(
        url=str(SRC),
        write_to=str(out),
        output_width=size,
        output_height=size,
    )
    print(f"  favicon_{size}.png  →  {size}×{size}  ({out.stat().st_size/1024:.1f} KB)")

print("\nDone.")
