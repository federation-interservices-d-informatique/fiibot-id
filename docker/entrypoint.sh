#!/usr/bin/env sh
set -e
DIR="$(realpath "$(dirname "${0}")")"
# Wait for PostgreSQL to start
timeout 25s "${DIR}"/wait-for-postgres.js

node "${DIR}/dist/index.js"
