# 🚨 Troubleshooting - DRG API

## 📋 Problemas Comuns e Soluções

### **🔧 Problemas de Instalação**

#### **1. Node.js não encontrado**

```bash
# Erro: 'node' não é reconhecido como comando
# Solução: Instalar Node.js 16+
```

**Solução:**

```bash
# Windows: Baixar do https://nodejs.org
# Linux:
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS:
brew install node@16
```

#### **2. Dependências não instaladas**

```bash
# Erro: Cannot find module
# Solução: Instalar dependências
```

**Solução:**

```bash
npm install
# ou
npm ci
```

#### **3. TypeScript não compilado**

```bash
# Erro: Cannot find module './dist/server.js'
# Solução: Compilar TypeScript
```

**Solução:**

```bash
npm run build
```

---

### **🗄️ Problemas de Banco de Dados**

#### **1. Oracle Instant Client não encontrado**

```bash
# Erro: ORA-12541: TNS:no listener
# Solução: Instalar Oracle Instant Client
```

**Solução:**

```bash
# 1. Baixar Oracle Instant Client
# 2. Extrair para /opt/oracle/instantclient_21_7
# 3. Configurar ORACLE_DIR no .env
ORACLE_DIR='/opt/oracle/instantclient_21_7'
```

#### **2. String de conexão inválida**

```bash
# Erro: ORA-12514: TNS:listener does not currently know of service
# Solução: Verificar string de conexão
```

**Solução:**

```env
# Verificar se DB_CONNECTION_STRING está correto
DB_CONNECTION_STRING='(DESCRIPTION=(ADDRESS_LIST=(ADDRESS = (PROTOCOL = TCP)(HOST = seu-host)(PORT = 1521)))(CONNECT_DATA=(SERVICE_NAME = seu-service)))'
```

#### **3. Tabelas não existem**

```bash
# Erro: Table 'TBL_INM_ATENDIMENTO' doesn't exist
# Solução: Executar scripts SQL
```

**Solução:**

```bash
# 1. Executar script PostgreSQL
psql -d seu_banco -f createTablesPostgreSQL_Updated.sql

# 2. Ou executar script SQLite
sqlite3 drg.db < createTablesSQLite_Updated.sql
```

---

### **🏥 Problemas de Configuração**

#### **1. Módulos não estão sendo enviados**

```bash
# Problema: XMLs não contêm módulos esperados
# Solução: Verificar configuração de módulos
```

**Solução:**

```env
# Verificar se categorias estão ativas
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=S  # Se necessário
SEND_SPECIAL_MODULES=S   # Se necessário

# Verificar módulos específicos
SEND_CTI=S
SEND_SUPORTE_VENTILATORIO=S
SEND_PARTO_ADEQUADO=S
```

#### **2. Configuração de estabelecimento incorreta**

```bash
# Problema: Módulos não correspondem ao tipo de estabelecimento
# Solução: Usar configuração correta
```

**Solução:**

```bash
# Hospital Geral
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=N
SEND_SPECIAL_MODULES=N

# UTI
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=S
SEND_SPECIAL_MODULES=S

# Maternidade
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=N
SEND_SPECIAL_MODULES=S
SEND_PARTO_ADEQUADO=S
SEND_RN=S
```

---

### **📡 Problemas de Envio para DRG**

#### **1. Credenciais DRG incorretas**

```bash
# Erro: 401 Unauthorized
# Solução: Verificar credenciais
```

**Solução:**

```env
# Verificar credenciais no .env
CD_ESTABELECIMENTO=9948
USUARIO_DRG=4038-ITEGL-IMP
SENHA_DRG=qni=4gD21(Xf
```

#### **2. XML inválido**

```bash
# Erro: 400 Bad Request
# Solução: Verificar estrutura do XML
```

**Solução:**

```bash
# 1. Verificar se XMLs estão sendo gerados
ls logs/2024-09-29/XML_*.xml

# 2. Validar estrutura do XML
# 3. Verificar se todos os campos obrigatórios estão preenchidos
```

#### **3. Dados DRG inválidos**

```bash
# Erro: Procedência do Paciente com valor inválido
# Solução: Usar valores válidos
```

**Solução:**

```typescript
// Valores válidos para procedência
procedencia_paciente: "M", // Comunidade (não "1")
cd_cid_principal: "I10",   // Hipertensão (não "A41.9")
```

---

### **🧪 Problemas de Testes**

#### **1. Testes falhando**

```bash
# Erro: Test failed
# Solução: Verificar configuração de teste
```

**Solução:**

```bash
# 1. Verificar se .env está configurado
cp example_env .env

# 2. Executar testes específicos
npm run test:module-control

# 3. Verificar logs de erro
npm run test -- --verbose
```

#### **2. Dados de teste não carregados**

```bash
# Erro: Cannot load test data
# Solução: Verificar dados do Estabelecimento 8
```

**Solução:**

```bash
# 1. Verificar se dados estão disponíveis
node test-estabelecimento8-simple.js 1 1

# 2. Usar modo offline se necessário
# 3. Verificar se arquivos de dados existem
```

#### **3. Timeout em testes**

```bash
# Erro: Test timeout
# Solução: Aumentar timeout
```

**Solução:**

```typescript
// Aumentar timeout para testes assíncronos
const testTimeout = 10000; // 10 segundos

// Usar em testes que fazem operações assíncronas
await new Promise((resolve) => setTimeout(resolve, 100));
```

---

### **📊 Problemas de Monitoramento**

#### **1. Métricas não sendo coletadas**

```bash
# Problema: Métricas vazias
# Solução: Verificar se monitoramento está ativo
```

**Solução:**

```env
# Ativar monitoramento
MODULE_MONITORING=S

# Verificar se módulos estão sendo processados
# Verificar se não há erros na coleta de métricas
```

#### **2. Performance baixa**

```bash
# Problema: Tempo de processamento alto
# Solução: Otimizar configuração
```

**Solução:**

```typescript
// Gerar análise de otimização
const report = ModuleOptimizer.analyzeAndOptimize();

// Aplicar otimizações sugeridas
const applied = ModuleOptimizer.applyLowRiskOptimizations();

// Verificar métricas de performance
const metrics = ModuleControl.getSystemMetrics();
```

#### **3. Módulos subutilizados**

```bash
# Problema: Módulos sempre pulados
# Solução: Desativar módulos desnecessários
```

**Solução:**

```env
# Desativar módulos que nunca são usados
SEND_CATETER_VASCULAR=N
SEND_SONDA_VESICAL=N
SEND_DISPOSITIVO_TERAPEUTICO=N
```

---

### **🔄 Problemas de Deploy**

#### **1. PM2 não inicia**

```bash
# Erro: PM2 process failed
# Solução: Verificar configuração PM2
```

**Solução:**

```bash
# 1. Verificar se aplicação foi compilada
npm run build

# 2. Verificar se dist/server.js existe
ls dist/server.js

# 3. Iniciar manualmente para ver erros
node dist/server.js

# 4. Configurar PM2 corretamente
pm2 start ./dist/server.js --name drg-api
```

#### **2. Cron job não executa**

```bash
# Problema: API não executa nos horários configurados
# Solução: Verificar configuração do cron
```

**Solução:**

```bash
# 1. Verificar se PM2 está rodando
pm2 status

# 2. Configurar cron job
pm2 restart drg-api --cron "50 7,11,15 * * *"

# 3. Verificar logs do cron
pm2 logs drg-api
```

#### **3. Porta já em uso**

```bash
# Erro: Port 3434 is already in use
# Solução: Liberar porta ou usar outra
```

**Solução:**

```bash
# 1. Verificar o que está usando a porta
lsof -i :3434

# 2. Parar processo que está usando a porta
kill -9 <PID>

# 3. Ou usar outra porta
PORT=3435
```

---

### **📁 Problemas de Logs**

#### **1. Logs não sendo gerados**

```bash
# Problema: Pasta logs vazia
# Solução: Verificar permissões e configuração
```

**Solução:**

```bash
# 1. Verificar se pasta logs existe
mkdir -p logs

# 2. Verificar permissões
chmod 755 logs

# 3. Verificar se API está gerando logs
tail -f logs/system.log
```

#### **2. Logs muito grandes**

```bash
# Problema: Logs ocupando muito espaço
# Solução: Configurar rotação de logs
```

**Solução:**

```bash
# 1. Configurar rotação de logs
pm2 install pm2-logrotate

# 2. Configurar limpeza automática
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

---

### **🔍 Diagnóstico Avançado**

#### **1. Verificar Status Completo**

```bash
# Verificar status da aplicação
pm2 status
pm2 logs drg-api --lines 100

# Verificar métricas do sistema
curl -X GET http://localhost:3434/health

# Verificar módulos ativos
curl -X GET http://localhost:3434/modules
```

#### **2. Teste de Conectividade**

```bash
# Testar conexão com banco
node -e "
const knex = require('knex')({
  client: 'oracledb',
  connection: process.env.DB_CONNECTION_STRING
});
knex.raw('SELECT 1 FROM DUAL').then(() => {
  console.log('✅ Conexão com banco OK');
  process.exit(0);
}).catch(err => {
  console.error('❌ Erro de conexão:', err.message);
  process.exit(1);
});
"

# Testar envio para DRG
curl -X GET http://localhost:3434/createxml/990724
```

#### **3. Análise de Performance**

```bash
# Verificar métricas de módulos
curl -X GET http://localhost:3434/metrics

# Gerar relatório de otimização
curl -X GET http://localhost:3434/optimization-report

# Exportar métricas
curl -X GET http://localhost:3434/export-metrics
```

---

## 🆘 Suporte de Emergência

### **Reset Completo do Sistema**

```bash
# 1. Parar aplicação
pm2 stop drg-api
pm2 delete drg-api

# 2. Limpar cache
npm cache clean --force
rm -rf node_modules
rm -rf dist

# 3. Reinstalar
npm install
npm run build

# 4. Reconfigurar
cp example_env .env
# Editar .env com configurações corretas

# 5. Reiniciar
pm2 start ./dist/server.js --name drg-api
```

### **Modo de Recuperação**

```bash
# Usar modo offline para testes
node test-estabelecimento8-simple.js 1 1

# Verificar se dados básicos funcionam
curl -X GET http://localhost:3434/health
```

### **Contato de Suporte**

- **Documentação:** [docs/INDEX.md](./docs/INDEX.md)
- **Configuração:** [CONFIGURACAO_RAPIDA.md](./CONFIGURACAO_RAPIDA.md)
- **Deploy:** [README_DEPLOY.md](./README_DEPLOY.md)

---

**🎯 Sistema DRG com troubleshooting completo para resolução rápida de problemas!**

---

**🔄 Versão:** 1.0.0  
**📅 Última atualização:** 29/09/2024  
**👥 Mantido por:** Equipe de Desenvolvimento DRG
