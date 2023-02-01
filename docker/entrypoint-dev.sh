#!/usr/bin/env sh
set -e

NODE_PATH="${PWD}/node_modules" node "${PWD}/wait-for-postgres.js"
echo "Starting bot!"
tsc-watch --onSuccess "npm run start-build"

