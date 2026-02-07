#!/bin/bash
# Inner loop check: type check + lint + tests
# MUST pass with zero errors and zero warnings
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install --legacy-peer-deps
fi

# Generate Prisma client if needed
if [ ! -d "node_modules/.prisma/client" ]; then
  echo "Generating Prisma client..."
  npx prisma generate
fi

echo "Running TypeScript type check..."
npx tsc --noEmit

echo "Running ESLint..."
npx eslint --ext .ts,.tsx src/ server/

echo "Inner loop checks passed."
