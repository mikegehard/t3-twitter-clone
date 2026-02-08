#!/bin/bash
# Inner loop check: type check + lint
# Returns 0 for success, 1 for failure
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

echo "=== Installing dependencies ==="
npm install --ignore-scripts 2>&1

echo ""
echo "=== Generating Prisma client ==="
npx prisma generate 2>&1

echo ""
echo "=== Running TypeScript type check ==="
npx tsc --noEmit 2>&1

echo ""
echo "=== Running ESLint ==="
npx eslint . 2>&1

echo ""
echo "All inner-loop checks passed."
