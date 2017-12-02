#!/bin/bash
file="/usr/src/app/node_modules/.yarn-integrity"
if [ -e "$file" ]; then
    cd /usr/src/app && yarn install --pure-lockfile
fi

exec "$@"
