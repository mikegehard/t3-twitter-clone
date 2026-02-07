#!/bin/bash
# CI loop check: verify toolchain is present
# Inner-loop checks and tests are added later
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

echo "Verifying toolchain..."
for cmd in node npm tsc prisma; do
  if ! command -v "$cmd" &> /dev/null; then
    echo "ERROR: $cmd not found in container"
    exit 1
  fi
done
echo "Toolchain OK."

echo "CI checks passed."
