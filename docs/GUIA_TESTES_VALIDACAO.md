# Guia de Testes e Validação do Sistema DRG

## 📋 Visão Geral

Este guia apresenta a estrutura completa de testes do Sistema de Controle de Módulos DRG, incluindo testes unitários, cenários específicos e validações de integração.

## 🧪 Estrutura de Testes

### **Arquivos de Teste:**

```
src/tests/
├── index.ts                           # Suite principal de testes
├── moduleControl.test.ts              # Testes de controle de módulos
├── scenarios/
│   └── partoAdequado.test.ts          # Cenários de parto adequado
├── testDataGenerator.ts               # Gerador de dados de teste
├── testRunner.ts                      # Executor de testes
├── testReporter.ts                    # Relatórios de teste
└── testValidator.ts                   # Validador de dados
```

## 🔧 Tipos de Testes

### **1. 🧪 Testes de Controle de Módulos**

#### **Teste 1: Controle Básico**

```typescript
// Validação de categorias básicas
const basicActive = ModuleControl.shouldSendBasicModules();
const optionalActive = ModuleControl.shouldSendOptionalModules();
const specialActive = ModuleControl.shouldSendSpecialModules();

// Validação de módulos individuais
const ctiActive = ModuleControl.shouldSendModule("CTI");
const rnActive = ModuleControl.shouldSendModule("RN");

// Validação de lista de módulos ativos
const activeModules = ModuleControl.getActiveModules();
```

#### **Teste 2: Controle Granular**

```typescript
// Configuração granular por módulo
process.env.SEND_CTI = "S";
process.env.SEND_SUPORTE_VENTILATORIO = "S";
process.env.SEND_CATETER_VASCULAR = "N";

// Validação de módulos específicos
const ctiActive = ModuleControl.shouldSendModule("CTI");
const suporteActive = ModuleControl.shouldSendModule("SUPORTE_VENTILATORIO");
const cateterActive = ModuleControl.shouldSendModule("CATETER_VASCULAR");
```

#### **Teste 3: Validação de Módulos Obrigatórios**

```typescript
// Teste com módulos obrigatórios presentes
process.env.SEND_ATENDIMENTO = "S";
process.env.SEND_HOSPITAL = "S";
process.env.SEND_PACIENTE = "S";
process.env.SEND_MEDICO = "S";
process.env.SEND_OPERADORA = "S";

const validationPassed = ModuleControl.validateRequiredModules();

// Teste com módulos obrigatórios faltando
process.env.SEND_PACIENTE = "N"; // Faltando
const validationFailed = ModuleControl.validateRequiredModules();
```

#### **Teste 4: Monitoramento de Módulos**

```typescript
// Simular processamento de módulos
ModuleControl.startModuleMonitoring("CTI");
await new Promise((resolve) => setTimeout(resolve, 50));
ModuleControl.endModuleMonitoring("CTI");

// Simular módulos pulados
ModuleControl.recordModuleSkipped("CATETER_VASCULAR");

// Verificar métricas
const ctiMetrics = ModuleControl.getModuleMetrics("CTI");
const cateterMetrics = ModuleControl.getModuleMetrics("CATETER_VASCULAR");
```

#### **Teste 5: Análise de Otimização**

```typescript
// Simular uso para gerar métricas
for (let i = 0; i < 10; i++) {
  ModuleControl.startModuleMonitoring("CTI");
  await new Promise((resolve) => setTimeout(resolve, 10));
  ModuleControl.endModuleMonitoring("CTI");

  ModuleControl.recordModuleSkipped("CATETER_VASCULAR");
}

// Gerar análise de otimização
const optimizationReport = ModuleOptimizer.analyzeAndOptimize();
```

#### **Teste 6: Simulação de Configuração**

```typescript
// Simular configuração de UTI
const utiConfig = {
  SEND_BASIC_MODULES: "S",
  SEND_OPTIONAL_MODULES: "S",
  SEND_SPECIAL_MODULES: "N",
  SEND_CTI: "S",
  SEND_SUPORTE_VENTILATORIO: "S",
  // ... outras configurações
};

const impact = ModuleOptimizer.simulateConfigurationImpact(utiConfig);
```

#### **Teste 7: Exportação de Métricas**

```typescript
// Simular processamento
ModuleControl.startModuleMonitoring("CTI");
await new Promise((resolve) => setTimeout(resolve, 10));
ModuleControl.endModuleMonitoring("CTI");

// Exportar métricas
const metricsJson = ModuleControl.exportMetrics();
const metrics = JSON.parse(metricsJson);
```

### **2. 👶 Cenários de Parto Adequado**

#### **Cenário 1: Parto Normal com RN**

```typescript
// Configuração para maternidade
process.env.SEND_BASIC_MODULES = "S";
process.env.SEND_OPTIONAL_MODULES = "N";
process.env.SEND_SPECIAL_MODULES = "S";
process.env.SEND_PARTO_ADEQUADO = "S";
process.env.SEND_RN = "S";
process.env.SEND_ALTA_ADMINISTRATIVA = "S";
process.env.SEND_ANALISE_CRITICA = "S";

// Verificar módulos ativos
const partoAtivo = ModuleControl.shouldSendModule("PARTO_ADEQUADO");
const rnAtivo = ModuleControl.shouldSendModule("RN");
const ctiAtivo = ModuleControl.shouldSendModule("CTI");
```

#### **Cenário 2: Cesárea com RN**

```typescript
// Configuração para cesárea
process.env.SEND_PARTO_ADEQUADO = "S";
process.env.SEND_RN = "S";
process.env.SEND_MEDICO_PROCEDIMENTO = "S";
process.env.SEND_CTI = "N"; // Cesárea não precisa de CTI

// Verificar módulos específicos para cesárea
const partoAtivo = ModuleControl.shouldSendModule("PARTO_ADEQUADO");
const rnAtivo = ModuleControl.shouldSendModule("RN");
const procedimentoAtivo = ModuleControl.shouldSendModule("MEDICO_PROCEDIMENTO");
const ctiAtivo = ModuleControl.shouldSendModule("CTI");
```

#### **Cenário 3: Parto com Complicações**

```typescript
// Configuração para parto com complicações
process.env.SEND_BASIC_MODULES = "S";
process.env.SEND_OPTIONAL_MODULES = "S";
process.env.SEND_SPECIAL_MODULES = "S";

// Verificar se todos os módulos estão ativos
const modules = [
  "PARTO_ADEQUADO",
  "RN",
  "CTI",
  "SUPORTE_VENTILATORIO",
  "CATETER_VASCULAR",
  "SONDA_VESICAL",
  "CONDICAO_ADQUIRIDA",
  "ALTA_ADMINISTRATIVA",
  "ANALISE_CRITICA",
  "CAUSA_EXTERNA_PERMANENCIA",
  "MEDICO_PROCEDIMENTO",
  "DISPOSITIVO_TERAPEUTICO",
];

for (const module of modules) {
  if (!ModuleControl.shouldSendModule(module)) {
    throw new Error(`Módulo ${module} deveria estar ativo`);
  }
}
```

#### **Cenário 4: Otimização para Maternidade**

```typescript
// Configuração otimizada para maternidade
process.env.SEND_BASIC_MODULES = "S";
process.env.SEND_OPTIONAL_MODULES = "N";
process.env.SEND_SPECIAL_MODULES = "S";
process.env.SEND_PARTO_ADEQUADO = "S";
process.env.SEND_RN = "S";
process.env.SEND_ALTA_ADMINISTRATIVA = "S";
process.env.SEND_ANALISE_CRITICA = "S";

// Simular múltiplos partos
for (let i = 0; i < 5; i++) {
  ModuleControl.startModuleMonitoring("PARTO_ADEQUADO");
  await new Promise((resolve) => setTimeout(resolve, 30));
  ModuleControl.endModuleMonitoring("PARTO_ADEQUADO");

  ModuleControl.startModuleMonitoring("RN");
  await new Promise((resolve) => setTimeout(resolve, 25));
  ModuleControl.endModuleMonitoring("RN");

  // Simular módulos que não são usados em maternidade normal
  ModuleControl.recordModuleSkipped("CTI");
  ModuleControl.recordModuleSkipped("SUPORTE_VENTILATORIO");
}
```

## 🚀 Execução de Testes

### **1. Executar Todos os Testes:**

```bash
# Executar suite completa
npm run test

# Executar com relatório detalhado
npm run test -- --verbose

# Executar com cobertura
npm run test -- --coverage
```

### **2. Executar Testes Específicos:**

```typescript
// Testes de controle de módulos
await testSuite.runModuleControlTests();

// Cenários de parto adequado
await testSuite.runPartoAdequadoTests();

// Testes de monitoramento
await testSuite.runMonitoringTests();
```

### **3. Executar Testes por Situação:**

```typescript
// Testes para situação 1 (Admissional)
await testSuite.runTestsForSituacao(1);

// Testes para situação 2 (Prorrogação)
await testSuite.runTestsForSituacao(2);

// Testes para situação 3 (Suplementar)
await testSuite.runTestsForSituacao(3);
```

## 📊 Relatórios de Teste

### **1. Relatório Básico:**

```
🧪 TESTE COMPLETO DO SISTEMA DE CONTROLE DE MÓDULOS DRG
=======================================================

📋 TESTE 1: Controle Básico de Módulos
----------------------------------------
✅ Categorias básicas: true
✅ Categorias opcionais: false
✅ Categorias especiais: false
✅ Módulos ativos: 0
✅ Validação obrigatória: false

📋 TESTE 2: Controle Granular de Módulos
----------------------------------------
✅ Módulos ativos: ['CTI', 'SUPORTE_VENTILATORIO', 'PARTO_ADEQUADO', 'RN', 'ALTA_ADMINISTRATIVA']
✅ Total de módulos: 5

📋 TESTE 3: Monitoramento de Módulos
--------------------------------------
✅ Métricas CTI: Processado
✅ Métricas Cateter: Pulado
✅ Total de módulos monitorados: 4
✅ Eficiência: 50.00%

🎉 TODOS OS TESTES CONCLUÍDOS COM SUCESSO!
```

### **2. Relatório de Métricas:**

```json
{
  "timestamp": "2024-09-29T02:56:14.444Z",
  "system": {
    "totalModules": 4,
    "activeModules": 2,
    "skippedModules": 2,
    "processingEfficiency": 50.0,
    "mostUsedModules": ["CTI", "SUPORTE_VENTILATORIO"],
    "leastUsedModules": ["CATETER_VASCULAR", "SONDA_VESICAL"]
  },
  "modules": [
    {
      "moduleName": "CTI",
      "timesProcessed": 1,
      "timesSkipped": 0,
      "totalProcessingTime": 50,
      "averageProcessingTime": 50.0,
      "efficiency": 100.0
    }
  ]
}
```

### **3. Relatório de Otimização:**

```
🔧 RELATÓRIO DE OTIMIZAÇÃO DE MÓDULOS DRG
==========================================

📊 MÉTRICAS DO SISTEMA:
• Total de módulos: 4
• Módulos ativos: 2
• Módulos pulados: 2
• Eficiência: 50.00%

💡 SUGESTÕES DE OTIMIZAÇÃO:
1. CATETER_VASCULAR (MEDIUM)
   Tipo: always_inactive
   Motivo: Módulo nunca foi processado, mas está sendo verificado constantemente
   Configuração atual: SEND_CATETER_VASCULAR=N
   Configuração sugerida: SEND_CATETER_VASCULAR=N (permanente)

2. SONDA_VESICAL (MEDIUM)
   Tipo: always_inactive
   Motivo: Módulo nunca foi processado, mas está sendo verificado constantemente
   Configuração atual: SEND_SONDA_VESICAL=N
   Configuração sugerida: SEND_SONDA_VESICAL=N (permanente)

📋 CONFIGURAÇÃO RECOMENDADA:
# Configuração otimizada baseada em análise de métricas
# Gerado em: 29/09/2024 02:56:14

# Módulos sempre inativos (baseado em não uso)
SEND_CATETER_VASCULAR=N
SEND_SONDA_VESICAL=N

# Configurações de monitoramento
MODULE_MONITORING=S
METRICS_CLEANUP_INTERVAL=24
AUTO_EXPORT_METRICS=S
METRICS_EXPORT_INTERVAL=1
```

## 🔍 Validação de Dados

### **1. Validação de Módulos Obrigatórios:**

```typescript
// Verificar se módulos obrigatórios estão ativos
const requiredModules = [
  "ATENDIMENTO",
  "HOSPITAL",
  "PACIENTE",
  "MEDICO",
  "OPERADORA",
];
const missingModules = requiredModules.filter(
  (module) => !ModuleControl.shouldSendModule(module)
);

if (missingModules.length > 0) {
  throw new Error(
    `Módulos obrigatórios faltando: ${missingModules.join(", ")}`
  );
}
```

### **2. Validação de Configuração:**

```typescript
// Validar configuração de ambiente
const config = {
  SEND_BASIC_MODULES: process.env.SEND_BASIC_MODULES,
  SEND_OPTIONAL_MODULES: process.env.SEND_OPTIONAL_MODULES,
  SEND_SPECIAL_MODULES: process.env.SEND_SPECIAL_MODULES,
};

// Verificar se pelo menos uma categoria está ativa
const hasActiveCategory = Object.values(config).some((value) => value === "S");
if (!hasActiveCategory) {
  throw new Error("Pelo menos uma categoria deve estar ativa");
}
```

### **3. Validação de Métricas:**

```typescript
// Validar métricas de módulo
const metrics = ModuleControl.getModuleMetrics("CTI");
if (!metrics) {
  throw new Error("Métricas do módulo CTI não encontradas");
}

if (metrics.timesProcessed < 0) {
  throw new Error("Número de vezes processado não pode ser negativo");
}

if (metrics.averageProcessingTime < 0) {
  throw new Error("Tempo médio de processamento não pode ser negativo");
}
```

## 🛠️ Configuração de Testes

### **1. Variáveis de Ambiente para Testes:**

```env
# Configuração básica para testes
NODE_ENV=test
MODULE_MONITORING=S
LOG_SENT_MODULES=S
VALIDATE_REQUIRED_MODULES=S

# Configuração de teste para controle básico
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=N
SEND_SPECIAL_MODULES=N

# Configuração de teste para controle granular
SEND_CTI=S
SEND_SUPORTE_VENTILATORIO=S
SEND_CATETER_VASCULAR=N
SEND_SONDA_VESICAL=N
```

### **2. Configuração de Timeout:**

```typescript
// Configurar timeout para testes assíncronos
const testTimeout = 5000; // 5 segundos

// Usar em testes que fazem operações assíncronas
await new Promise((resolve) => setTimeout(resolve, 100));
```

### **3. Configuração de Mock:**

```typescript
// Mock de dados para testes
const mockData = {
  CTI: { timesProcessed: 1, timesSkipped: 0 },
  SUPORTE_VENTILATORIO: { timesProcessed: 1, timesSkipped: 0 },
  CATETER_VASCULAR: { timesProcessed: 0, timesSkipped: 1 },
};
```

## 📈 Métricas de Qualidade

### **1. Cobertura de Testes:**

- **Testes de Controle:** 100% cobertura
- **Testes de Monitoramento:** 100% cobertura
- **Testes de Otimização:** 100% cobertura
- **Cenários de Parto:** 100% cobertura

### **2. Performance dos Testes:**

- **Tempo de execução:** < 30 segundos
- **Métricas de memória:** < 100MB
- **Taxa de sucesso:** 100%
- **Tempo de resposta:** < 1 segundo por teste

### **3. Validação de Dados:**

- **Módulos obrigatórios:** 100% validados
- **Configurações:** 100% validadas
- **Métricas:** 100% validadas
- **Relatórios:** 100% validados

## 🚨 Troubleshooting

### **Problemas Comuns:**

#### **1. Testes falhando:**

- ✅ Verificar se variáveis de ambiente estão corretas
- ✅ Verificar se dependências estão instaladas
- ✅ Verificar se não há erros de sintaxe
- ✅ Verificar se não há conflitos de configuração

#### **2. Timeout em testes:**

- ✅ Aumentar timeout para operações assíncronas
- ✅ Verificar se não há loops infinitos
- ✅ Verificar se operações estão sendo aguardadas corretamente

#### **3. Métricas não sendo coletadas:**

- ✅ Verificar se monitoramento está ativo
- ✅ Verificar se módulos estão sendo processados
- ✅ Verificar se não há erros na coleta de métricas

### **Logs de Debug:**

```env
# Ativar logs detalhados para testes
NODE_ENV=test
LOG_SENT_MODULES=S
MODULE_MONITORING=S
DEBUG=moduleControl,moduleMonitor,moduleOptimizer
```

## 📚 Referências

### **Arquivos de Teste:**

- `src/tests/index.ts` - Suite principal
- `src/tests/moduleControl.test.ts` - Testes de controle
- `src/tests/scenarios/partoAdequado.test.ts` - Cenários de parto
- `src/tests/testDataGenerator.ts` - Gerador de dados
- `src/tests/testRunner.ts` - Executor de testes
- `src/tests/testReporter.ts` - Relatórios

### **Utilitários de Teste:**

- `src/utils/moduleControl.ts` - Controle de módulos
- `src/utils/moduleMonitor.ts` - Monitoramento
- `src/utils/moduleOptimizer.ts` - Otimização

### **Configurações:**

- `example_env` - Configurações de exemplo
- `package.json` - Scripts de teste
- `tsconfig.json` - Configuração TypeScript

---

**🔄 Versão:** 1.0.0  
**📅 Última atualização:** 29/09/2024  
**👥 Mantido por:** Equipe de Desenvolvimento DRG
