#!/bin/bash
set -e

TALKS_DIR="talks"
OUTPUT_DIR="public/talks"

mkdir -p "$OUTPUT_DIR"

for talk_dir in "$TALKS_DIR"/*/; do
  if [ ! -f "$talk_dir/slides.md" ]; then
    continue
  fi

  slug=$(basename "$talk_dir")
  echo "Building talk: $slug"

  (cd "$talk_dir" && bun install && bunx slidev build --base "/talks/$slug/" --out "../../$OUTPUT_DIR/$slug")

  echo "Built: $slug -> $OUTPUT_DIR/$slug"
done

echo "All talks built."
