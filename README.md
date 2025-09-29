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

---

## Documentação da API

### Instalação

A API é um software que permite enviar internações para uma outra API, chamada API SOAP. Para instalar a API, você precisa ter o Node.js, o Oracle Instant Client e o NPM.

**Requisitos:**

- Node.js: https://node.js.org/en/download/
- Oracle Instant Client: https://www.oracle.com/database/technologies/instant-client/downloads.html
  deve-se atentar a versão de instalação do INSTANT CLIENT. Por exemplo, se a instalação for a versão 21.7, no ORACLE_DIR do .env terá: /opt/oracle/instantclient_21_7
- NPM: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/

**Etapas de instalação:**

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

## Rodando em produção

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
