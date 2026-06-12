#!/bin/bash
echo "🚀 Iniciando Deploy do Frontend (Angular)..."
git pull
docker compose down --rmi all
docker compose build --no-cache
docker compose up -d --force-recreate
echo "✅ Deploy do Frontend finalizado com sucesso!"
