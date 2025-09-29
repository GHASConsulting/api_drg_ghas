# Sistema DRG - Documentação Completa

## 📚 Documentação Disponível

### **🏗️ Sistema de Controle de Módulos**

- **[Sistema de Controle de Módulos DRG](./docs/SISTEMA_CONTROLE_MODULOS_DRG.md)** - Documentação completa do sistema
- **[Guia de Configuração por Tipo de Estabelecimento](./docs/GUIA_CONFIGURACAO_ESTABELECIMENTOS.md)** - Configurações otimizadas
- **[Guia de Testes e Validação](./docs/GUIA_TESTES_VALIDACAO.md)** - Testes e validação
- **[Índice da Documentação](./docs/INDEX.md)** - Navegação completa

### **🚀 Início Rápido**

- **[Sistema de Controle](./docs/SISTEMA_CONTROLE_MODULOS_DRG.md)** - Começar aqui
- **[Configuração por Estabelecimento](./docs/GUIA_CONFIGURACAO_ESTABELECIMENTOS.md)** - Configurar para seu tipo
- **[Testes e Validação](./docs/GUIA_TESTES_VALIDACAO.md)** - Validar configuração

### **⚡ Guias Práticos**

- **[README Deploy](./README_DEPLOY.md)** - Guia completo de deploy e instruções
- **[Configuração Rápida](./CONFIGURACAO_RAPIDA.md)** - Configuração por tipo de estabelecimento
- **[Troubleshooting](./TROUBLESHOOTING.md)** - Resolução de problemas comuns

### **🎯 Início Ultrarrápido**

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd drg

# 2. Execute o script de instalação automática
chmod +x install.sh
./install.sh

# 3. Configure suas credenciais no arquivo .env
nano .env

# 4. Execute a aplicação
docker-compose up -d

# 5. Acesse:
# - Aplicação: http://localhost:3434
# - Portainer: https://localhost:9443
```

---

## 🚀 Instalação Automática

### **Instalação Completa com Script Automatizado**

Para uma instalação rápida e completa, use o script de instalação que configura automaticamente:

- Docker
- Docker Compose
- Portainer
- Aplicação DRG

```bash
# Tornar o script executável e executar
chmod +x install.sh
./install.sh
```

O script detecta automaticamente seu sistema operacional e instala todas as dependências necessárias.

**O que o script instala:**

- ✅ Docker (detecção automática do SO)
- ✅ Docker Compose
- ✅ Portainer (interface web para gerenciar containers)
- ✅ Dependências da aplicação
- ✅ Estrutura de logs
- ✅ Configuração inicial

**Acesso após instalação:**

- 🌐 **Portainer**: https://localhost:9443 (gerenciamento de containers)
- 🚀 **Aplicação**: http://localhost:3434 (após executar `docker-compose up -d`)

---

## 📖 Instalação Manual

### Requisitos

A API é um software que permite enviar internações para uma outra API, chamada API SOAP. Para instalar a API manualmente, você precisa ter:

**Dependências obrigatórias:**

- Node.js: https://node.js.org/en/download/
- Oracle Instant Client: https://www.oracle.com/database/technologies/instant-client/downloads.html
  deve-se atentar a versão de instalação do INSTANT CLIENT. Por exemplo, se a instalação for a versão 21.7, no ORACLE_DIR do .env terá: /opt/oracle/instantclient_21_7
- NPM: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/
- Docker: https://docs.docker.com/get-docker/
- Docker Compose: https://docs.docker.com/compose/install/

**Etapas de instalação manual:**

1. **Clonar o código-fonte da API:**

```bash
git clone [https://github.com/seu-nome/api-drgmv-fastify-ghas.git](https://github.com/seu-nome/api-drgmv-fastify-ghas.git)
```

2. **Entrar no diretório do projeto**

```bash
cd api-drgmv-fastify-ghas
```

3. **Instalar as dependências**

```bash
npm install
```

4. **Configuração da API**
   Criar o arquivo .env e preencher os campos necessários:

```

ORACLE_DIR='/opt/oracle/instantclient_21_7'


# Porta da API
PORT=3434

#SEPARE OS HORÁRIOS DO CRON POR ;
#NÃO ESQUEÇA DO ; NO FINAL
#EXEMPLO: 14:30;17:30;
HORARIOS_CRON = '08:10;12:00;18:00;'

# Configuração de Banco de Dados
DATABASE_CLIENT='' # 'oracledb' || 'pg'


# Acesso ao Banco de Dados
DB_CONNECTION_STRING=''
DB_PASSWORD=''
DB_USER=''


API_USER=''
API_PASSWORD=''

#WSDL URL

WSDL_URL=''

```

Exemplo de DB_CONNECTION_STRING:

```
DB_CONNECTION_STRING='(DESCRIPTION=(ADDRESS_LIST=(ADDRESS = (PROTOCOL = TCP)(HOST = x7m.feliciorocho.local)(PORT = 1521)))(CONNECT_DATA=(SERVICE_NAME = smlmv.feliciorocho.local)))'
```

## Rodando em desenvolvimento

1. **Dar permissão de leitura e escrita ao diretório do projeto**

```bash
sudo chmod -R 777 ./api-drgmv-fastify-ghas
```

2. **Inicie o servidor**

```bash
npm run dev
```

A API estará disponível em http://localhost:3434.

Rotas:

```http
GET /createxml
```

Rota com a finalidade de criar e mandar as internações, para rodar independentemente do CRON.

```
GET /createxml/:nr_atendimento
```

Essa rota recebe o “nr_atendimento” e faz o envio referente a esse “nr_atendimento”.

Exemplo de requisição:

Para enviar todas as internações, execute o seguinte comando:

```bash
curl -X GET http://localhost:3434/createxml
```

Para enviar uma internação específica, execute o seguinte comando:

```bash
curl -X GET http://localhost:3434/createxml/990724
```

## 🐳 Rodando com Docker

### **Opção 1: Docker Compose (Recomendado)**

```bash
# Executar a aplicação em containers
docker-compose up -d

# Visualizar logs
docker-compose logs -f

# Parar aplicação
docker-compose down
```

### **Opção 2: Docker manual**

```bash
# Build da imagem
docker build -t drg-app .

# Executar container
docker run -d -p 3434:3434 --name drg-app-container drg-app
```

### **Gerenciamento com Portainer**

Após instalar com o script, acesse o Portainer para gerenciar containers via interface web:

- 🌐 **URL**: https://localhost:9443
- 📊 **Funcionalidades**:
  - Visualizar status dos containers
  - Monitorar logs em tempo real
  - Gerenciar volumes e redes
  - Atualizar containers
  - Visualizar métricas de recursos

---

## ⚙️ Rodando em produção

### **Produção com Docker (Recomendado)**

```bash
# Para produção, use o docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

### **Produção com PM2 (Tradicional)**

Faça o deploy da aplicação, seguindo os passos 1 a 4 da instalação.

Construa a aplicação:

```bash
npm run build
```

Inicie a aplicação com o PM2:

```bash
npm install pm2 -g
```

```bash
pm2 start ./dist/server.js --name producao
```

4. Para que a aplicação sempre reinicie e evite que a conexão com o Oracle feche, execute o seguinte comando com o PM2:

```bash
pm2 restart producao --cron "50 7,11,15 * * *"
```

A aplicação rodará às 8 horas, meio dia, e às 4 horas da tarde.

### Diretório de LOGS

As logs (XMLs referentes aos lotes de internação) estarão dentro do diretório da aplicação (api-drgmv-fastify-ghas), dentro da pasta `logs`.

```bash
cd api-drgmv-fastify-ghas/logs
```

# api_drg_ghas
