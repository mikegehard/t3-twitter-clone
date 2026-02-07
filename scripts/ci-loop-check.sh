#!/bin/bash
# CI loop check: test-container + inner-loop checks
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

echo "Verifying toolchain..."
for cmd in node npm tsc eslint prisma; do
  if ! command -v "$cmd" &> /dev/null; then
    echo "ERROR: $cmd not found in container"
    exit 1
  fi
done
echo "Toolchain OK."

echo "Running inner-loop checks..."
"$SCRIPT_DIR/inner-loop-check.sh"

echo "CI checks passed."
