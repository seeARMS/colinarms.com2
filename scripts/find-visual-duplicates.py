#!/usr/bin/env python3
"""Find visually-similar images using a dHash perceptual hash.

Uses ImageMagick to downscale each image to 9x8 grayscale, then compares
adjacent pixels to produce a 64-bit hash. Images whose hashes differ by
<= THRESHOLD bits (Hamming distance) are grouped as likely duplicates.
"""

import subprocess
import sys
import os
import struct
from pathlib import Path
from collections import defaultdict

THRESHOLD = 8  # Hamming distance; <=5 near-identical, 6-10 visually similar.
EXTS = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".tiff"}


def dhash(path: Path) -> int:
    # Output raw 8-bit grayscale, 9 wide x 8 tall = 72 bytes.
    result = subprocess.run(
        [
            "magick", str(path),
            "-auto-orient",
            "-colorspace", "Gray",
            "-resize", "9x8!",
            "-depth", "8",
            "gray:-",
        ],
        check=True,
        capture_output=True,
    )
    pixels = result.stdout
    if len(pixels) != 72:
        raise RuntimeError(f"expected 72 bytes, got {len(pixels)} for {path}")
    h = 0
    bit = 0
    for row in range(8):
        for col in range(8):
            left = pixels[row * 9 + col]
            right = pixels[row * 9 + col + 1]
            if left < right:
                h |= (1 << bit)
            bit += 1
    return h


def hamming(a: int, b: int) -> int:
    return bin(a ^ b).count("1")


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else "src/assets/photos")
    files = sorted(p for p in root.iterdir() if p.suffix.lower() in EXTS)
    print(f"Hashing {len(files)} files...", file=sys.stderr)

    hashes: dict[Path, int] = {}
    for p in files:
        try:
            hashes[p] = dhash(p)
        except Exception as e:
            print(f"  skip {p.name}: {e}", file=sys.stderr)

    # Union-find grouping by Hamming distance.
    items = list(hashes.items())
    parent = list(range(len(items)))

    def find(i):
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i

    def union(i, j):
        ri, rj = find(i), find(j)
        if ri != rj:
            parent[ri] = rj

    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            if hamming(items[i][1], items[j][1]) <= THRESHOLD:
                union(i, j)

    groups: dict[int, list[tuple[Path, int]]] = defaultdict(list)
    for i, entry in enumerate(items):
        groups[find(i)].append(entry)

    dup_groups = [g for g in groups.values() if len(g) > 1]
    if not dup_groups:
        print("No visual duplicates found.")
        return 0

    print(f"\nFound {len(dup_groups)} duplicate group(s):\n")
    for grp in sorted(dup_groups, key=lambda g: -len(g)):
        # Sort within group by filesize desc so the biggest (likely original) is first.
        grp_sorted = sorted(grp, key=lambda e: -e[0].stat().st_size)
        print("Group:")
        base_hash = grp_sorted[0][1]
        for p, h in grp_sorted:
            size_mb = p.stat().st_size / (1024 * 1024)
            dist = hamming(base_hash, h)
            print(f"  {p.name:40s}  {size_mb:6.1f} MB  dist={dist}")
        print()
    return 0


if __name__ == "__main__":
    sys.exit(main())
