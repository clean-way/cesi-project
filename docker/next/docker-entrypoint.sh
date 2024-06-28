#!/bin/sh
set -e

echo "Le docker-entrepoint s'execute"

npx prisma migrate dev

echo "Le docker-entrepoint a terminé"

exec "$@"