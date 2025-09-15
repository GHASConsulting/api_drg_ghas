#!/bin/bash

# Script de inicialização da aplicação
echo "🚀 Iniciando aplicação DRG..."

# Verificar se a pasta de logs existe
if [ ! -d "/app/logs" ]; then
    echo "📁 Criando pasta de logs..."
    mkdir -p /app/logs
fi

# Verificar permissões da pasta de logs
chmod 755 /app/logs

echo "📋 Configuração de logs:"
echo "   - Pasta de logs: /app/logs"
echo "   - Logs serão salvos na pasta de origem do Docker"
echo "   - Timezone: $(date)"

# Verificar se o build existe
if [ ! -f "/app/dist/server.js" ]; then
    echo "🔨 Compilando TypeScript..."
    npm run build
fi

echo "✅ Iniciando aplicação..."
exec npm start

