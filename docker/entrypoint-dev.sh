#!/usr/bin/env sh
set -e

NODE_PATH="${PWD}/node_modules" bun "${PWD}/wait-for-postgres.js"
echo "Starting bot!"
bun run --watch "${PWD}/src/index.ts"

