#!/usr/bin/env bash
set -euo pipefail

# Resize JPEGs over 25MB in place so they fit under the Cloudflare Worker limit.
# Uses macOS `sips`. Shrinks max dimension and reduces quality until the file is under the threshold.

DIR="${1:-src/assets/photos}"
MAX_BYTES=$((25 * 1024 * 1024))
DIMENSIONS=(4000 3500 3000 2500 2000)
QUALITIES=(85 80 75 70)

if ! command -v sips >/dev/null 2>&1; then
  echo "sips not found (this script requires macOS)" >&2
  exit 1
fi

file_size() {
  stat -f%z "$1"
}

human() {
  awk -v b="$1" 'BEGIN { split("B KB MB GB", u); s=1; while (b>=1024 && s<4) { b/=1024; s++ } printf "%.1f%s", b, u[s] }'
}

shopt -s nullglob nocaseglob
found=0
for f in "$DIR"/*.jpg "$DIR"/*.jpeg; do
  size=$(file_size "$f")
  if (( size <= MAX_BYTES )); then
    continue
  fi
  found=1
  orig_human=$(human "$size")
  echo "▶ $f ($orig_human)"

  done_resize=0
  for dim in "${DIMENSIONS[@]}"; do
    for q in "${QUALITIES[@]}"; do
      sips --resampleHeightWidthMax "$dim" -s format jpeg -s formatOptions "$q" "$f" --out "$f" >/dev/null
      new_size=$(file_size "$f")
      echo "   dim=$dim q=$q → $(human "$new_size")"
      if (( new_size <= MAX_BYTES )); then
        done_resize=1
        break 2
      fi
    done
  done

  if (( done_resize == 0 )); then
    echo "   ⚠ could not get under $(human "$MAX_BYTES")" >&2
  fi
done

if (( found == 0 )); then
  echo "No files over $(human "$MAX_BYTES") in $DIR"
fi
