#!/bin/sh
# Re-registers the local PostgreSQL supervisor program after a pod restart.
#
# /etc/supervisor/conf.d is not part of the persistent workspace, so if the pod is
# recycled the `postgres` program definition disappears while the data directory in
# /app/pgdata survives. Run this script to restore it:
#
#   sh /app/scripts/bootstrap_env.sh
set -e

cat > /etc/supervisor/conf.d/postgres.conf <<'CONF'
[program:postgres]
command=/bin/sh /app/scripts/start_postgres.sh
autostart=true
autorestart=true
startsecs=5
startretries=5
stopsignal=INT
stopwaitsecs=30
stderr_logfile=/var/log/supervisor/postgres.err.log
stdout_logfile=/var/log/supervisor/postgres.out.log
priority=1
CONF

supervisorctl reread
supervisorctl update
supervisorctl restart postgres || supervisorctl start postgres

echo 'Waiting for PostgreSQL to accept connections...'
for _ in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
  if psql -h 127.0.0.1 -U postgres -c 'SELECT 1' >/dev/null 2>&1; then
    echo 'PostgreSQL is up.'
    break
  fi
  sleep 2
done

psql -h 127.0.0.1 -U postgres -tc "SELECT 1 FROM pg_database WHERE datname='homework'" | grep -q 1 \
  || psql -h 127.0.0.1 -U postgres -c 'CREATE DATABASE homework'

cd /app/frontend
npx prisma migrate deploy

supervisorctl restart frontend
echo 'Environment bootstrap complete.'
