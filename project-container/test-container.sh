#!/bin/bash
# Test script for project container
# Verifies container builds and key binaries are available

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGE_NAME="t3-twitter-clone-dev:test"

echo "=== Building container ==="
docker build -t "$IMAGE_NAME" "$SCRIPT_DIR"

echo ""
echo "=== Testing installed binaries ==="

test_binary() {
    local name="$1"
    local cmd="$2"

    if docker run --rm "$IMAGE_NAME" $cmd > /dev/null 2>&1; then
        version=$(docker run --rm "$IMAGE_NAME" $cmd 2>&1)
        echo "✓ $name: $version"
        return 0
    else
        echo "✗ $name: FAILED"
        return 1
    fi
}

FAILED=0

test_binary "node" "node --version" || FAILED=1
test_binary "npm" "npm --version" || FAILED=1
test_binary "tsc" "tsc --version" || FAILED=1
test_binary "eslint" "eslint --version" || FAILED=1
test_binary "prisma" "prisma --version" || FAILED=1
test_binary "git" "git --version" || FAILED=1

echo ""
if [ $FAILED -eq 0 ]; then
    echo "=== All tests passed ==="
    exit 0
else
    echo "=== Some tests failed ==="
    exit 1
fi
