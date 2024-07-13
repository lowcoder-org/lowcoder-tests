#!/bin/bash

if [ "$(id -u)" = "0" ]; then
    echo "Running as root, dropping privileges..."
    TESTS_UID=`ls -n /app/tests | tail -1 | cut -f3 -d' '`
    TESTS_GID=`ls -n /app/tests | tail -1 | cut -f4 -d' '`
    PUID=`id playwright -u`
    PGID=`id playwright -g`

    if [ "${TESTS_GID}" != "${PGID}" ]; then
        echo "   changing GID to ${TESTS_GID}"
        groupmod --gid="${TESTS_GID}" -o playwright
    fi;

    if [ "${TESTS_UID}" != "${PUID}" ]; then
        echo "   changing UID to ${TESTS_UID}"
        usermod --uid="${TESTS_UID}" -o playwright
    fi;
fi;

cd /app
if [ ! -e "/app/node_modules" ]; then
  gosu playwright npm install
fi;

gosu playwright npx playwright test
