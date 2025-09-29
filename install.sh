#!/bin/bash

# Script de Instalação Completa - Sistema DRG
# Instala Docker, Docker Compose, Portainer e configura a aplicação

set -e  # Para em caso de erro

echo "🚀 Script de Instalação Completa - Sistema DRG"
echo "=============================================="
echo ""
echo "Este script irá instalar:"
echo "1. Docker"
echo "2. Docker Compose"
echo "3. Portainer"
echo "4. Configurar a aplicação DRG"
echo ""

# Função para detectar o sistema operacional
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if [ -f /etc/redhat-release ]; then
            echo "rhel"
        elif [ -f /etc/debian_version ]; then
            echo "debian"
        else
            echo "linux"
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    else
        echo "unknown"
    fi
}

# Função para verificar se um comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Função para instalar Docker no Ubuntu/Debian
install_docker_debian() {
    echo "📦 Instalando Docker no Ubuntu/Debian..."
    
    # Remover versões antigas
    sudo apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true
    
    # Atualizar pacotes
    sudo apt-get update
    
    # Instalar dependências
    sudo apt-get install -y \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
    
    # Adicionar chave GPG do Docker
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    
    # Adicionar repositório
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Instalar Docker
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    # Adicionar usuário ao grupo docker
    sudo usermod -aG docker $USER
    
    echo "✅ Docker instalado com sucesso!"
}

# Função para instalar Docker no CentOS/RHEL
install_docker_rhel() {
    echo "📦 Instalando Docker no CentOS/RHEL..."
    
    # Remover versões antigas
    sudo yum remove -y docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine 2>/dev/null || true
    
    # Instalar dependências
    sudo yum install -y yum-utils
    
    # Adicionar repositório
    sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    
    # Instalar Docker
    sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    # Iniciar e habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Adicionar usuário ao grupo docker
    sudo usermod -aG docker $USER
    
    echo "✅ Docker instalado com sucesso!"
}

# Função para instalar Docker no macOS
install_docker_macos() {
    echo "📦 Instalando Docker no macOS..."
    
    if command_exists brew; then
        brew install --cask docker
        echo "✅ Docker instalado via Homebrew!"
        echo "⚠️  Por favor, abra o Docker Desktop para completar a configuração."
    else
        echo "❌ Homebrew não encontrado. Por favor, instale o Docker Desktop manualmente:"
        echo "   https://docs.docker.com/desktop/mac/install/"
        return 1
    fi
}

# Função para instalar Docker Compose (standalone)
install_docker_compose() {
    echo "📦 Instalando Docker Compose..."
    
    if command_exists docker && docker compose version >/dev/null 2>&1; then
        echo "✅ Docker Compose já está instalado (plugin)!"
        return 0
    fi
    
    # Download do Docker Compose
    DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)
    sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    
    # Dar permissões de execução
    sudo chmod +x /usr/local/bin/docker-compose
    
    echo "✅ Docker Compose instalado com sucesso!"
}

# Função para instalar Portainer
install_portainer() {
    echo "📦 Instalando Portainer..."
    
    # Criar volume para dados do Portainer
    docker volume create portainer_data
    
    # Executar Portainer
    docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v portainer_data:/data \
        portainer/portainer-ce:latest
    
    echo "✅ Portainer instalado com sucesso!"
    echo "🌐 Acesse o Portainer em: https://localhost:9443"
    echo "   ou: http://localhost:8000"
}

# Função para configurar a aplicação
setup_application() {
    echo "⚙️  Configurando aplicação DRG..."
    
    # Verificar se existe arquivo .env
    if [ ! -f ".env" ]; then
        if [ -f "example_env" ]; then
            echo "📋 Copiando arquivo de exemplo de configuração..."
            cp example_env .env
            echo "⚠️  Por favor, edite o arquivo .env com suas configurações específicas!"
        else
            echo "❌ Arquivo example_env não encontrado. Criando .env básico..."
            cat > .env << EOF
# Configuração da API DRG
PORT=3434

# Oracle Instant Client
ORACLE_DIR='/opt/oracle/instantclient_21_7'

# Horários do CRON (separados por ;)
HORARIOS_CRON='08:10;12:00;18:00;'

# Configuração de Banco de Dados
DATABASE_CLIENT=''  # 'oracledb' || 'pg'

# Acesso ao Banco de Dados
DB_CONNECTION_STRING=''
DB_PASSWORD=''
DB_USER=''

# API Credentials
API_USER=''
API_PASSWORD=''

# WSDL URL
WSDL_URL=''
EOF
        fi
    fi
    
    # Verificar se o Node.js está instalado
    if ! command_exists node; then
        echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro:"
        echo "   https://nodejs.org/"
        return 1
    fi
    
    # Instalar dependências
    echo "📦 Instalando dependências do Node.js..."
    npm install
    
    # Build da aplicação
    echo "🔨 Compilando aplicação..."
    npm run build
    
    echo "✅ Aplicação configurada com sucesso!"
}

# Função para criar estrutura de logs
create_log_structure() {
    echo "📁 Criando estrutura de logs..."
    
    mkdir -p logs
    chmod 755 logs
    
    echo "✅ Estrutura de logs criada!"
}

# Função para verificar instalações
verify_installations() {
    echo "🔍 Verificando instalações..."
    
    # Verificar Docker
    if command_exists docker; then
        echo "✅ Docker: $(docker --version)"
    else
        echo "❌ Docker não encontrado!"
        return 1
    fi
    
    # Verificar Docker Compose
    if docker compose version >/dev/null 2>&1; then
        echo "✅ Docker Compose: $(docker compose version)"
    elif command_exists docker-compose; then
        echo "✅ Docker Compose: $(docker-compose --version)"
    else
        echo "❌ Docker Compose não encontrado!"
        return 1
    fi
    
    # Verificar se Portainer está rodando
    if docker ps | grep -q portainer; then
        echo "✅ Portainer: Rodando"
    else
        echo "⚠️  Portainer: Não está rodando"
    fi
    
    # Verificar Node.js
    if command_exists node; then
        echo "✅ Node.js: $(node --version)"
    else
        echo "❌ Node.js não encontrado!"
    fi
    
    # Verificar npm
    if command_exists npm; then
        echo "✅ npm: $(npm --version)"
    else
        echo "❌ npm não encontrado!"
    fi
}

# Função principal
main() {
    echo "🔍 Detectando sistema operacional..."
    OS=$(detect_os)
    echo "Sistema detectado: $OS"
    echo ""
    
    # Verificar se já tem Docker instalado
    if command_exists docker; then
        echo "✅ Docker já está instalado!"
    else
        case $OS in
            "debian")
                install_docker_debian
                ;;
            "rhel")
                install_docker_rhel
                ;;
            "macos")
                install_docker_macos
                ;;
            *)
                echo "❌ Sistema operacional não suportado para instalação automática do Docker."
                echo "Por favor, instale o Docker manualmente: https://docs.docker.com/get-docker/"
                exit 1
                ;;
        esac
    fi
    
    # Verificar se Docker Compose está disponível
    if ! docker compose version >/dev/null 2>&1 && ! command_exists docker-compose; then
        install_docker_compose
    else
        echo "✅ Docker Compose já está disponível!"
    fi
    
    # Instalar Portainer
    if docker ps -a | grep -q portainer; then
        echo "✅ Portainer já está instalado!"
        if ! docker ps | grep -q portainer; then
            echo "🔄 Iniciando Portainer..."
            docker start portainer
        fi
    else
        install_portainer
    fi
    
    # Configurar aplicação
    setup_application
    
    # Criar estrutura de logs
    create_log_structure
    
    echo ""
    echo "🎉 Instalação completa!"
    echo "======================"
    
    # Verificar todas as instalações
    verify_installations
    
    echo ""
    echo "📝 Próximos passos:"
    echo "1. Configure o arquivo .env com suas credenciais"
    echo "2. Acesse o Portainer em: https://localhost:9443"
    echo "3. Execute 'docker-compose up -d' para iniciar a aplicação"
    echo "4. A aplicação estará disponível em: http://localhost:3434"
    echo ""
    echo "📚 Consulte o README.md para mais informações!"
    
    # Aviso sobre reinicialização (necessário para grupos do Docker)
    if [[ "$OS" != "macos" ]]; then
        echo ""
        echo "⚠️  IMPORTANTE: Para usar o Docker sem sudo, faça logout e login novamente"
        echo "   ou execute: newgrp docker"
    fi
}

# Executar função principal
main "$@"
