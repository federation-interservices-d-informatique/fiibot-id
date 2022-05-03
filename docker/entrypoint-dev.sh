#!/usr/bin/env sh
set -e

NODE_PATH="${PWD}/node_modules" node "${PWD}/wait-for-postgres.js"
echo "Starting bot!"
nodemon --watch 'src/*' --ext 'ts' --exec 'npm run start-build'
