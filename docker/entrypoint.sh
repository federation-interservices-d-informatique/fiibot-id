#!/usr/bin/env sh
set -e
DIR="$(realpath "$(dirname "${0}")")"
# Wait for PostgreSQL to start
timeout 25s bun "${DIR}"/wait-for-postgres.js

bun "${DIR}/src/index.ts"
