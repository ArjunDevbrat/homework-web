#!/bin/sh
# Starts the local PostgreSQL 15 instance backed by the persistent /app/pgdata directory.
set -e

PGDATA=/app/pgdata
PGBIN=/usr/lib/postgresql/15/bin

mkdir -p "$PGDATA"
chown -R postgres:postgres "$PGDATA"
chmod 700 "$PGDATA"

if [ ! -f "$PGDATA/PG_VERSION" ]; then
  su postgres -c "$PGBIN/initdb -D $PGDATA -U postgres --auth=trust"
fi

mkdir -p /var/run/postgresql
chown postgres:postgres /var/run/postgresql

exec su postgres -c "$PGBIN/postgres -D $PGDATA -c listen_addresses=127.0.0.1 -p 5432"
