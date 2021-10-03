#!/usr/bin/env sh

# Wait for postgresql before starting the bot

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "${DB_HOST}" -U "${POSTGRES_USER}" -c '\q'; do
  sleep 1
done
  
exec "$@"
