#!/usr/bin/env bash

# Wait for postgresql before starting the bot

set -euo pipefail
  
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "${DB_HOST}" -U "${POSTGRES_USER}" -c '\q'; do
  sleep 1
done
  
exec "$@"