#!/usr/bin/env sh
if test "$(curl http://localhost:${HEALTHCHECK_PORT})" == "ok"
then
    exit 0
else
    exit 1
fi