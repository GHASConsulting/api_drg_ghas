FROM node:18-slim

# Instalar dependências necessárias
RUN apt-get update && apt-get install -y \
    libaio1 \
    unzip \
    wget \
    smbclient \
    && rm -rf /var/lib/apt/lists/*

# Criar diretório para o Oracle Instant Client
RUN mkdir -p /opt/oracle

# Baixar e instalar o Oracle Instant Client
RUN cd /tmp && \
    wget https://download.oracle.com/otn_software/linux/instantclient/2117000/instantclient-basic-linux.x64-21.17.0.0.0dbru.zip && \
    unzip instantclient-basic-linux.x64-21.17.0.0.0dbru.zip -d /opt/oracle/ && \
    rm instantclient-basic-linux.x64-21.17.0.0.0dbru.zip

# Configurar variáveis de ambiente
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_21_17 \
    TNS_ADMIN=/opt/oracle/instantclient_21_17 \
    ORACLE_LIB_DIR=/opt/oracle/instantclient_21_17

# Criar diretório da aplicação
WORKDIR /app

# Criar diretório de logs
RUN mkdir -p /app/logs

# Copiar arquivos da aplicação
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY start.sh ./start.sh

# Dar permissão de execução ao script
RUN chmod +x /app/start.sh

# Instalar dependências
RUN npm install

# Compilar TypeScript
RUN npm run build

# Expor porta
EXPOSE 3434

# Comando para iniciar a aplicação
CMD ["/app/start.sh"] 