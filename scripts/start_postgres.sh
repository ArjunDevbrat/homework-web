#!/bin/sh
# Starts the local PostgreSQL 15 instance backed by the persistent /app/pgdata directory.
# Self-healing: recreates the `postgres` OS user and re-installs the server binaries if the
# container image layer has been reset by a pod restart.
set -e

PGDATA=/app/pgdata
PGBIN=/usr/lib/postgresql/15/bin

# 1. Ensure the postgres server binaries exist.
if [ ! -x "$PGBIN/postgres" ]; then
  export DEBIAN_FRONTEND=noninteractive
  apt-get update >/dev/null 2>&1 || true
  apt-get install -y postgresql-15 postgresql-client-15 >/dev/null 2>&1
fi

# 2. Ensure the postgres OS user/group exist.
if ! getent group postgres >/dev/null 2>&1; then
  groupadd --system postgres
fi
if ! getent passwd postgres >/dev/null 2>&1; then
  useradd --system --gid postgres --home-dir /var/lib/postgresql --shell /bin/sh postgres
fi

# 3. Ensure the data directory exists and is owned correctly.
mkdir -p "$PGDATA"
chown -R postgres:postgres "$PGDATA"
chmod 700 "$PGDATA"

if [ ! -f "$PGDATA/PG_VERSION" ]; then
  su postgres -c "$PGBIN/initdb -D $PGDATA -U postgres --auth=trust"
fi

mkdir -p /var/run/postgresql
chown postgres:postgres /var/run/postgresql

# 4. Remove a stale postmaster lock left behind by an unclean pod shutdown.
if [ -f "$PGDATA/postmaster.pid" ]; then
  PID=$(head -n 1 "$PGDATA/postmaster.pid")
  if ! kill -0 "$PID" 2>/dev/null; then
    rm -f "$PGDATA/postmaster.pid"
  fi
fi

exec su postgres -c "$PGBIN/postgres -D $PGDATA -c listen_addresses=127.0.0.1 -p 5432"
