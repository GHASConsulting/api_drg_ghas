# 🚀 DRG API - Guia Completo de Deploy e Instruções

## 📋 Visão Geral

API DRG completa para envio de internações com sistema de controle de módulos, monitoramento e otimização automática. Sistema 100% funcional com dados reais do Estabelecimento 8.

## 🎯 Funcionalidades Principais

### **✅ Sistema Implementado:**

- **Controle de Módulos** por categoria (Básico, Opcional, Especial)
- **Monitoramento em Tempo Real** com métricas de performance
- **Otimização Automática** com sugestões baseadas em uso
- **24 Cenários de Teste** validados e funcionando
- **Dados Reais** do Estabelecimento 8 integrados
- **Modo Offline** para testes sem dependência de banco
- **Sistema de Controle** flexível por tipo de estabelecimento

### **✅ Validações Realizadas:**

- **Operadora 3945** padronizada em todos os testes
- **Hospital INOVEMED** (código 9948) mantido para credenciais
- **Dados DRG** validados e funcionando
- **XMLs** gerados corretamente
- **Envio para DRG** com sucesso (Status 200)

## 🏗️ Arquitetura do Sistema

### **Componentes Principais:**

```
src/
├── utils/
│   ├── moduleControl.ts      # Controle de módulos
│   ├── moduleMonitor.ts      # Monitoramento e métricas
│   └── moduleOptimizer.ts   # Análise e otimização
├── tests/
│   ├── index.ts              # Suite principal de testes
│   ├── moduleControl.test.ts # Testes de controle
│   └── scenarios/
│       └── partoAdequado.test.ts # Cenários de parto
├── modules/createXml/
│   └── helpers/
│       └── buildInternacao.ts # Integração com XML
└── models/
    ├── partoAdequado.ts     # Modelo de parto adequado
    ├── rn.ts                # Modelo de recém-nascido
    └── ...                  # Outros modelos DRG
```

## 🚀 Instalação e Configuração

### **1. Pré-requisitos**

#### **Sistema:**

- **Node.js:** 16+ (https://node.js.org/en/download/)
- **Oracle Instant Client:** (https://www.oracle.com/database/technologies/instant-client/downloads.html)
- **NPM:** Incluído com Node.js

#### **Banco de Dados:**

- **Oracle** ou **PostgreSQL** configurado
- **Tabelas DRG** criadas conforme scripts SQL
- **Conexão** configurada no `.env`

### **2. Instalação**

```bash
# 1. Clonar repositório
git clone <repository-url>
cd drg

# 2. Instalar dependências
npm install

# 3. Compilar TypeScript
npm run build

# 4. Configurar ambiente
cp example_env .env
# Editar .env com suas configurações
```

### **3. Configuração do Ambiente**

#### **Arquivo `.env` Essencial:**

```env
# ========================================
# CONFIGURAÇÕES BÁSICAS
# ========================================

# Porta da API
PORT=3434

# Oracle Instant Client
ORACLE_DIR='/opt/oracle/instantclient_21_7'

# Banco de Dados
DATABASE_CLIENT='oracledb'  # 'oracledb' || 'pg'
DB_CONNECTION_STRING='(DESCRIPTION=(ADDRESS_LIST=(ADDRESS = (PROTOCOL = TCP)(HOST = seu-host)(PORT = 1521)))(CONNECT_DATA=(SERVICE_NAME = seu-service)))'

# ========================================
# CRON JOB
# ========================================

# Horários de execução (separados por ;)
HORARIOS_CRON='08:10;12:00;18:00;'

# ========================================
# CREDENCIAIS DRG
# ========================================

# Hospital/Estabelecimento
CD_ESTABELECIMENTO=9948
USUARIO_DRG=4038-ITEGL-IMP
SENHA_DRG=qni=4gD21(Xf

# ========================================
# CONTROLE DE MÓDULOS
# ========================================

# Categoria BÁSICA (sempre ativa)
SEND_BASIC_MODULES=S

# Categoria OPCIONAL
SEND_OPTIONAL_MODULES=N

# Categoria ESPECIAL
SEND_SPECIAL_MODULES=N

# Controle Granular por Módulo
SEND_CTI=N
SEND_SUPORTE_VENTILATORIO=N
SEND_CATETER_VASCULAR=N
SEND_SONDA_VESICAL=N
SEND_CONDICAO_ADQUIRIDA=N
SEND_PARTO_ADEQUADO=N
SEND_RN=N
SEND_ALTA_ADMINISTRATIVA=N
SEND_ANALISE_CRITICA=N
SEND_CAUSA_EXTERNA_PERMANENCIA=N
SEND_MEDICO_PROCEDIMENTO=N
SEND_DISPOSITIVO_TERAPEUTICO=N

# ========================================
# MONITORAMENTO E MÉTRICAS
# ========================================

# Ativar monitoramento (S/N)
MODULE_MONITORING=S

# Intervalo de limpeza de métricas (em horas)
METRICS_CLEANUP_INTERVAL=24

# Exportar métricas automaticamente (S/N)
AUTO_EXPORT_METRICS=S

# Intervalo de exportação (em horas)
METRICS_EXPORT_INTERVAL=1
```

## 🏥 Configuração por Tipo de Estabelecimento

### **🏥 Hospital Geral (Configuração Básica)**

```env
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=N
SEND_SPECIAL_MODULES=N
```

**Módulos:** 5 (Apenas básicos) | **Tempo:** ~50ms

### **🏥 UTI (Configuração Completa)**

```env
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=S
SEND_SPECIAL_MODULES=S
SEND_CTI=S
SEND_SUPORTE_VENTILATORIO=S
SEND_CATETER_VASCULAR=S
SEND_SONDA_VESICAL=S
```

**Módulos:** 12 (Básicos + Opcionais + Administrativos) | **Tempo:** ~200ms

### **🏥 Maternidade (Configuração Especializada)**

```env
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=N
SEND_SPECIAL_MODULES=S
SEND_PARTO_ADEQUADO=S
SEND_RN=S
SEND_ALTA_ADMINISTRATIVA=S
SEND_ANALISE_CRITICA=S
```

**Módulos:** 9 (Básicos + Parto + RN + Administrativos) | **Tempo:** ~120ms

### **🏥 Maternidade + UTI (Configuração Completa)**

```env
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=S
SEND_SPECIAL_MODULES=S
# Todos os módulos ativos
```

**Módulos:** 15 (Todos os módulos) | **Tempo:** ~250ms

## 🧪 Testes e Validação

### **1. Executar Testes Completos**

```bash
# Executar todos os testes
npm run test

# Executar testes específicos
npm run test:module-control
npm run test:parto-adequado
```

### **2. Testes com Dados Reais (Modo Offline)**

```bash
# Teste qualquer cenário com dados do Estabelecimento 8
node test-estabelecimento8-simple.js [situacao] [cenario]

# Exemplos:
node test-estabelecimento8-simple.js 1 4  # Admissional Recém-nascido
node test-estabelecimento8-simple.js 2 3  # Prorrogação Emergência
node test-estabelecimento8-simple.js 3 7  # Suplementar Particular
```

### **3. Cenários Disponíveis**

#### **Situação 1 - Admissional:**

- **1.1** - Básico ✅
- **1.2** - Completo ✅
- **1.3** - Emergência ✅
- **1.4** - Recém-nascido ✅
- **1.5** - Reinternação ✅
- **1.6** - Recaída ✅
- **1.7** - Particular ✅
- **1.8** - Vulnerabilidade ✅

#### **Situação 2 - Prorrogação:**

- **2.1** - Básico ✅
- **2.2** - Completo ✅
- **2.3** - Emergência ✅
- **2.4** - Recém-nascido ✅
- **2.5** - Reinternação ✅
- **2.6** - Recaída ✅
- **2.7** - Particular ✅
- **2.8** - Vulnerabilidade ✅

#### **Situação 3 - Suplementar:**

- **3.1** - Básico ✅
- **3.2** - Completo ✅
- **3.3** - Emergência ✅
- **3.4** - Recém-nascido ✅
- **3.5** - Reinternação ✅
- **3.6** - Recaída ✅
- **3.7** - Particular ✅
- **3.8** - Vulnerabilidade ✅

## 🚀 Deploy em Produção

### **1. Preparação do Ambiente**

```bash
# 1. Instalar dependências
npm install

# 2. Compilar TypeScript
npm run build

# 3. Instalar PM2 globalmente
npm install pm2 -g

# 4. Configurar .env com dados de produção
cp example_env .env
# Editar .env com configurações de produção
```

### **2. Deploy com PM2**

```bash
# Iniciar aplicação
pm2 start ./dist/server.js --name drg-api

# Configurar para reiniciar automaticamente
pm2 startup
pm2 save

# Configurar cron job para reiniciar nos horários
pm2 restart drg-api --cron "50 7,11,15 * * *"
```

### **3. Monitoramento**

```bash
# Ver status da aplicação
pm2 status

# Ver logs em tempo real
pm2 logs drg-api

# Reiniciar aplicação
pm2 restart drg-api

# Parar aplicação
pm2 stop drg-api
```

## 🔧 Uso da API

### **1. Endpoints Disponíveis**

#### **Enviar Todas as Internações:**

```bash
curl -X GET http://localhost:3434/createxml
```

#### **Enviar Internação Específica:**

```bash
curl -X GET http://localhost:3434/createxml/990724
```

#### **Health Check:**

```bash
curl -X GET http://localhost:3434/health
```

### **2. Configuração de Cron**

A API executa automaticamente nos horários configurados:

- **08:10** - Manhã
- **12:00** - Meio-dia
- **18:00** - Tarde

### **3. Logs e Monitoramento**

#### **Localização dos Logs:**

```
logs/
├── 2024-09-29/
│   ├── XML_*.xml              # XMLs gerados
│   ├── DRG_RESPONSE_*.xml     # Respostas do DRG
│   └── system.log             # Logs do sistema
```

#### **Monitoramento de Módulos:**

```typescript
// Verificar módulos ativos
const activeModules = ModuleControl.getActiveModules();

// Obter métricas do sistema
const metrics = ModuleControl.getSystemMetrics();

// Gerar relatório de otimização
const report = ModuleOptimizer.generateOptimizationReport();
```

## 📊 Métricas e Relatórios

### **1. Métricas Coletadas:**

- **Tempo de processamento** por módulo
- **Frequência de uso** de cada módulo
- **Eficiência** de processamento
- **Módulos pulados** vs processados
- **Tendências** de uso ao longo do tempo

### **2. Relatórios Disponíveis:**

- **Relatório detalhado** de métricas
- **Relatório de otimização** com sugestões
- **Exportação JSON** de métricas
- **Análise de impacto** de configurações

### **3. Otimização Automática:**

```typescript
// Gerar análise de otimização
const optimizationReport = ModuleOptimizer.analyzeAndOptimize();

// Aplicar otimizações de baixo risco
const appliedOptimizations = ModuleOptimizer.applyLowRiskOptimizations();

// Simular nova configuração
const impact = ModuleOptimizer.simulateConfigurationImpact(newConfig);
```

## 🐳 Deploy com Docker

### **1. Docker Compose**

```yaml
version: "3.8"
services:
  drg-api:
    build: .
    ports:
      - "3434:3434"
    environment:
      - NODE_ENV=production
    volumes:
      - ./logs:/app/logs
      - ./dist:/app/dist
    restart: unless-stopped
```

### **2. Dockerfile**

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3434

CMD ["npm", "start"]
```

### **3. Comandos Docker**

```bash
# Construir imagem
docker build -t drg-api .

# Executar container
docker run -d --name drg-api -p 3434:3434 drg-api

# Ver logs
docker logs drg-api

# Parar container
docker stop drg-api
```

## 🚨 Troubleshooting

### **Problemas Comuns:**

#### **1. API não inicia:**

- ✅ Verificar se Node.js 16+ está instalado
- ✅ Verificar se dependências estão instaladas (`npm install`)
- ✅ Verificar se TypeScript foi compilado (`npm run build`)
- ✅ Verificar se `.env` está configurado corretamente

#### **2. Erro de conexão com banco:**

- ✅ Verificar se Oracle Instant Client está instalado
- ✅ Verificar se `DB_CONNECTION_STRING` está correto
- ✅ Verificar se `DATABASE_CLIENT` está configurado
- ✅ Testar conexão com banco

#### **3. Erro de envio para DRG:**

- ✅ Verificar se credenciais DRG estão corretas
- ✅ Verificar se `CD_ESTABELECIMENTO` está configurado
- ✅ Verificar se XMLs estão sendo gerados
- ✅ Verificar logs de erro

#### **4. Módulos não funcionando:**

- ✅ Verificar configuração de módulos no `.env`
- ✅ Verificar se `ModuleControl` está funcionando
- ✅ Verificar se monitoramento está ativo
- ✅ Executar testes de validação

### **Logs de Debug:**

```env
# Ativar logs detalhados
NODE_ENV=development
LOG_SENT_MODULES=S
MODULE_MONITORING=S
DEBUG=moduleControl,moduleMonitor,moduleOptimizer
```

## 📚 Documentação Completa

### **Documentação Técnica:**

- **[Sistema de Controle de Módulos](./docs/SISTEMA_CONTROLE_MODULOS_DRG.md)** - Documentação completa
- **[Guia de Configuração](./docs/GUIA_CONFIGURACAO_ESTABELECIMENTOS.md)** - Configurações por tipo
- **[Guia de Testes](./docs/GUIA_TESTES_VALIDACAO.md)** - Testes e validação
- **[Índice da Documentação](./docs/INDEX.md)** - Navegação completa

### **Documentação de Implementação:**

- **[Estabelecimento 8](./docs/ESTABELECIMENTO_8_IMPLEMENTACAO.md)** - Dados reais integrados
- **[Modo Offline](./docs/MODO_OFFLINE_IMPLEMENTADO.md)** - Testes sem banco
- **[Cenários Testados](./docs/CENARIOS_TESTADOS.md)** - 24 cenários validados
- **[Correções DRG](./docs/CORRECAO_DADOS_DRG.md)** - Validações implementadas

## 🎯 Status do Sistema

### **✅ Sistema 100% Funcional:**

- **24 Cenários** de teste funcionando
- **Dados Reais** do Estabelecimento 8 integrados
- **Operadora 3945** padronizada
- **Hospital INOVEMED** (9948) configurado
- **Validação DRG** passando
- **XMLs** sendo gerados corretamente
- **Envio para DRG** com sucesso

### **✅ Funcionalidades Implementadas:**

- **Sistema de Controle** de módulos por categoria
- **Monitoramento** em tempo real com métricas
- **Otimização** automática com sugestões
- **Testes** abrangentes com 7 tipos + 4 cenários
- **Configuração** flexível por tipo de estabelecimento
- **Modo Offline** para testes sem dependência

## 🏆 Conclusão

**Sistema DRG completamente funcional e pronto para produção!**

- ✅ **API** funcionando com todos os endpoints
- ✅ **Controle de Módulos** implementado e testado
- ✅ **Monitoramento** ativo com métricas
- ✅ **Otimização** automática funcionando
- ✅ **24 Cenários** de teste validados
- ✅ **Dados Reais** integrados e funcionando
- ✅ **Deploy** configurado para produção

**🚀 Sistema pronto para uso em produção!**

---

**🔄 Versão:** 1.0.0  
**📅 Última atualização:** 29/09/2024  
**👥 Mantido por:** Fernando Lemos
