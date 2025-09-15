#!/bin/bash

# Script de gerenciamento do Docker para aplicação DRG
# Inclui funcionalidades de logs e reinício automático

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para mostrar ajuda
show_help() {
    echo -e "${BLUE}🚀 Gerenciador Docker DRG${NC}"
    echo ""
    echo "Uso: $0 [comando]"
    echo ""
    echo "Comandos disponíveis:"
    echo "  start     - Iniciar todos os serviços"
    echo "  stop      - Parar todos os serviços"
    echo "  restart   - Reiniciar todos os serviços"
    echo "  logs      - Mostrar logs da aplicação"
    echo "  logs-restart - Mostrar logs do scheduler de reinício"
    echo "  status    - Mostrar status dos containers"
    echo "  build     - Reconstruir as imagens"
    echo "  clean     - Limpar containers e imagens não utilizadas"
    echo "  help      - Mostrar esta ajuda"
    echo ""
    echo "Exemplos:"
    echo "  $0 start"
    echo "  $0 logs"
    echo "  $0 status"
}

# Função para verificar se o Docker está rodando
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}❌ Docker não está rodando ou não está acessível${NC}"
        exit 1
    fi
}

# Função para verificar se o arquivo .env existe
check_env() {
    if [ ! -f ".env" ]; then
        echo -e "${RED}❌ Arquivo .env não encontrado!${NC}"
        echo "Por favor, crie o arquivo .env com as configurações necessárias."
        exit 1
    fi
}

# Função para criar pasta de logs se não existir
create_logs_dir() {
    if [ ! -d "logs" ]; then
        echo -e "${YELLOW}📁 Criando pasta de logs...${NC}"
        mkdir -p logs
        chmod 755 logs
    fi
}

# Função para mostrar horários configurados
show_schedule() {
    if [ -f ".env" ]; then
        horarios_cron=$(grep "HORARIOS_CRON" .env | cut -d '=' -f2 | tr -d "'" | tr -d ' ')
        if [ -n "$horarios_cron" ]; then
            echo -e "${BLUE}📅 Horários de envio configurados:${NC} $horarios_cron"
            echo -e "${YELLOW}⏰ Container será reiniciado 1h antes de cada envio${NC}"
        else
            echo -e "${YELLOW}⚠️  Variável HORARIOS_CRON não encontrada no .env${NC}"
        fi
    fi
}

# Função para iniciar serviços
start_services() {
    echo -e "${GREEN}🚀 Iniciando serviços...${NC}"
    check_docker
    check_env
    create_logs_dir
    show_schedule
    
    docker-compose up -d
    
    echo -e "${GREEN}✅ Serviços iniciados com sucesso!${NC}"
    echo -e "${BLUE}📊 Para verificar status: $0 status${NC}"
    echo -e "${BLUE}📋 Para ver logs: $0 logs${NC}"
}

# Função para parar serviços
stop_services() {
    echo -e "${YELLOW}🛑 Parando serviços...${NC}"
    docker-compose down
    echo -e "${GREEN}✅ Serviços parados com sucesso!${NC}"
}

# Função para reiniciar serviços
restart_services() {
    echo -e "${YELLOW}🔄 Reiniciando serviços...${NC}"
    docker-compose restart
    echo -e "${GREEN}✅ Serviços reiniciados com sucesso!${NC}"
}

# Função para mostrar logs
show_logs() {
    echo -e "${BLUE}📋 Mostrando logs da aplicação...${NC}"
    docker-compose logs -f app
}

# Função para mostrar logs do scheduler de reinício
show_restart_logs() {
    echo -e "${BLUE}📋 Mostrando logs do scheduler de reinício...${NC}"
    docker-compose logs -f restart-scheduler
}

# Função para mostrar status
show_status() {
    echo -e "${BLUE}📊 Status dos containers:${NC}"
    docker-compose ps
    
    echo ""
    echo -e "${BLUE}📁 Pasta de logs:${NC}"
    if [ -d "logs" ]; then
        echo "logs/ (existe)"
        ls -la logs/ 2>/dev/null || echo "Pasta vazia"
    else
        echo "logs/ (não existe)"
    fi
    
    show_schedule
}

# Função para reconstruir imagens
build_images() {
    echo -e "${YELLOW}🔨 Reconstruindo imagens...${NC}"
    docker-compose build --no-cache
    echo -e "${GREEN}✅ Imagens reconstruídas com sucesso!${NC}"
}

# Função para limpar
clean_docker() {
    echo -e "${YELLOW}🧹 Limpando containers e imagens não utilizadas...${NC}"
    docker system prune -f
    echo -e "${GREEN}✅ Limpeza concluída!${NC}"
}

# Verificar argumentos
case "${1:-help}" in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    logs)
        show_logs
        ;;
    logs-restart)
        show_restart_logs
        ;;
    status)
        show_status
        ;;
    build)
        build_images
        ;;
    clean)
        clean_docker
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}❌ Comando inválido: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac

