#!/usr/bin/env sh
set -e
DIR="$(realpath "$(dirname "${0}")")"

until PGPASSWORD="${POSTGRES_PASSWORD}" psql -h "${DB_HOST}" -U "${POSTGRES_USER}" -c '\q' -d "${POSTGRES_DB}" 2>/dev/null
do
    echo "PostgreSQL is starting... Waiting"
    sleep 1
done

node "${DIR}/dist/index.js"
