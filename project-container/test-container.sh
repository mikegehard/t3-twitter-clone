#!/bin/bash
# Test script for project-container
# Verifies container builds and key binaries are installed

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGE_NAME="t3-twitter-clone-dev:test"

echo "=== Building container ==="
docker build -t "$IMAGE_NAME" "$SCRIPT_DIR"

echo ""
echo "=== Verifying installed tools ==="

check_tool() {
    local tool=$1
    local cmd=$2
    echo -n "Checking $tool... "
    if docker run --rm "$IMAGE_NAME" $cmd > /dev/null 2>&1; then
        echo "OK ($(docker run --rm "$IMAGE_NAME" $cmd 2>&1 | head -1))"
        return 0
    else
        echo "FAILED"
        return 1
    fi
}

FAILED=0

check_tool "node" "node --version" || FAILED=1
check_tool "npm" "npm --version" || FAILED=1
check_tool "typescript" "tsc --version" || FAILED=1
check_tool "eslint" "eslint --version" || FAILED=1
check_tool "prettier" "prettier --version" || FAILED=1
check_tool "git" "git --version" || FAILED=1

echo ""
if [ $FAILED -eq 0 ]; then
    echo "=== All checks passed ==="
    exit 0
else
    echo "=== Some checks failed ==="
    exit 1
fi
