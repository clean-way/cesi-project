#!/bin/sh
set -e

echo "Le docker-entrepoint s'execute"

npx prisma migrate deploy

echo "Le docker-entrepoint a terminé"

exec "$@"