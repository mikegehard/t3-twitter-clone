#!/bin/bash
# CI loop check: container verification + inner-loop checks
# Returns 0 for success, 1 for failure
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

echo "=== Verifying toolchain ==="
for cmd in node npm tsc eslint; do
  if ! command -v "$cmd" &> /dev/null; then
    echo "ERROR: $cmd not found in container"
    exit 1
  fi
done
echo "Toolchain OK."

echo ""
echo "=== Running inner-loop checks ==="
bash "$SCRIPT_DIR/inner-loop-check.sh"

echo ""
echo "CI checks passed."
