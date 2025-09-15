#!/bin/bash

# Script para reiniciar o container 1h antes de cada envio programado
# Lê os horários da variável HORARIOS_CRON no arquivo .env

echo "🚀 Iniciando scheduler de reinício automático..."
echo "📅 Timezone: $(date)"
echo "⏰ Aguardando configuração dos horários..."

# Função para reiniciar o container
restart_container() {
    echo "🔄 Reiniciando container drg_alta..."
    docker restart drg_alta
    if [ $? -eq 0 ]; then
        echo "✅ Container reiniciado com sucesso!"
    else
        echo "❌ Erro ao reiniciar container!"
    fi
}

# Função para calcular horário de reinício (1h antes)
calculate_restart_time() {
    local hora_envio=$1
    local hora=$(echo "$hora_envio" | cut -d ':' -f1)
    local minuto=$(echo "$hora_envio" | cut -d ':' -f2)
    
    # Converter para minutos e subtrair 60 minutos (1h)
    local total_minutos=$((10#$hora * 60 + 10#$minuto - 60))
    
    # Se ficar negativo, adicionar 24h
    if [ $total_minutos -lt 0 ]; then
        total_minutos=$((total_minutos + 24 * 60))
    fi
    
    # Converter de volta para HH:MM
    local hora_restart=$((total_minutos / 60))
    local minuto_restart=$((total_minutos % 60))
    
    printf "%02d:%02d" $hora_restart $minuto_restart
}

# Função principal para agendar reinícios
schedule_restarts() {
    # Ler horários do .env
    if [ ! -f ".env" ]; then
        echo "❌ Arquivo .env não encontrado!"
        exit 1
    fi
    
    # Extrair horários da variável HORARIOS_CRON
    horarios_cron=$(grep "HORARIOS_CRON" .env | cut -d '=' -f2 | tr -d "'" | tr -d ' ')
    
    if [ -z "$horarios_cron" ]; then
        echo "❌ Variável HORARIOS_CRON não encontrada no .env!"
        exit 1
    fi
    
    echo "📋 Horários de envio configurados: $horarios_cron"
    
    # Separar horários
    IFS=';' read -ra horas <<< "$horarios_cron"
    
    # Criar arquivo de cron temporário
    cron_file="/tmp/restart_cron"
    
    # Limpar arquivo de cron
    > "$cron_file"
    
    # Para cada horário, calcular horário de reinício e adicionar ao cron
    for hora_envio in "${horas[@]}"; do
        if [ -n "$hora_envio" ]; then
            hora_restart=$(calculate_restart_time "$hora_envio")
            minuto_restart=$(echo "$hora_restart" | cut -d ':' -f2)
            hora_restart_num=$(echo "$hora_restart" | cut -d ':' -f1)
            
            echo "⏰ Horário de envio: $hora_envio -> Reinício: $hora_restart"
            
            # Adicionar entrada no cron (executar a cada minuto e verificar se é hora)
            echo "$minuto_restart $hora_restart_num * * * /app/restart-container.sh execute_restart" >> "$cron_file"
        fi
    done
    
    echo "📅 Configuração de cron criada:"
    cat "$cron_file"
    
    # Instalar cron
    crontab "$cron_file"
    
    echo "✅ Scheduler configurado com sucesso!"
    echo "🔄 Container será reiniciado 1h antes de cada envio programado"
    
    # Manter o script rodando
    while true; do
        sleep 60
    done
}

# Verificar se é uma execução direta de reinício
if [ "$1" = "execute_restart" ]; then
    restart_container
    exit 0
fi

# Iniciar scheduler
schedule_restarts

