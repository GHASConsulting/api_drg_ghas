# Sistema de Controle de Módulos DRG

## 📋 Visão Geral

O Sistema de Controle de Módulos DRG é uma solução avançada para gerenciar, monitorar e otimizar o envio de módulos de dados para o sistema DRG (Diagnosis-Related Group). O sistema oferece controle granular, monitoramento em tempo real e análise de otimização automática.

## 🎯 Funcionalidades Principais

### 1. **Controle de Módulos**

- ✅ Controle por categorias (Básico, Opcional, Especial)
- ✅ Controle granular por módulo individual
- ✅ Validação de módulos obrigatórios
- ✅ Configuração flexível via variáveis de ambiente

### 2. **Monitoramento em Tempo Real**

- ✅ Coleta de métricas de performance
- ✅ Análise de eficiência de processamento
- ✅ Identificação de módulos subutilizados
- ✅ Relatórios detalhados de uso

### 3. **Otimização Automática**

- ✅ Sugestões de configuração baseadas em uso
- ✅ Análise de impacto de mudanças
- ✅ Simulação de configurações
- ✅ Relatórios de otimização

## 🏗️ Arquitetura do Sistema

### **Componentes Principais:**

```
src/utils/
├── moduleControl.ts      # Controle de módulos
├── moduleMonitor.ts      # Monitoramento e métricas
└── moduleOptimizer.ts    # Análise e otimização

src/tests/
├── moduleControl.test.ts           # Testes de controle
└── scenarios/partoAdequado.test.ts # Cenários específicos
```

## 🔧 Configuração

### **Variáveis de Ambiente:**

#### **Controle por Categoria:**

```env
# Categoria BÁSICA (sempre ativa)
SEND_BASIC_MODULES=S

# Categoria OPCIONAL
SEND_OPTIONAL_MODULES=N

# Categoria ESPECIAL
SEND_SPECIAL_MODULES=N
```

#### **Controle Granular por Módulo:**

```env
# Módulos de Dispositivos
SEND_CTI=N
SEND_SUPORTE_VENTILATORIO=N
SEND_CATETER_VASCULAR=N
SEND_SONDA_VESICAL=N

# Módulos de Condições
SEND_CONDICAO_ADQUIRIDA=N
SEND_PARTO_ADEQUADO=N
SEND_RN=N

# Módulos Administrativos
SEND_ALTA_ADMINISTRATIVA=N
SEND_ANALISE_CRITICA=N
SEND_CAUSA_EXTERNA_PERMANENCIA=N
SEND_MEDICO_PROCEDIMENTO=N
SEND_DISPOSITIVO_TERAPEUTICO=N
```

#### **Monitoramento:**

```env
# Ativar monitoramento (S/N)
MODULE_MONITORING=S

# Intervalo de limpeza de métricas (em horas)
METRICS_CLEANUP_INTERVAL=24

# Exportar métricas automaticamente (S/N)
AUTO_EXPORT_METRICS=S

# Intervalo de exportação (em horas)
METRICS_EXPORT_INTERVAL=1
```

## 📊 Categorias de Módulos

### **🔵 BÁSICOS (Sempre Ativos)**

- `ATENDIMENTO` - Dados do atendimento
- `HOSPITAL` - Informações do hospital
- `PACIENTE` - Dados do paciente
- `MEDICO` - Informações do médico
- `OPERADORA` - Dados da operadora

### **🟡 OPCIONAIS (Ativados Conforme Necessidade)**

- `CTI` - Unidade de Terapia Intensiva
- `SUPORTE_VENTILATORIO` - Suporte ventilatório
- `CATETER_VASCULAR` - Cateter vascular central
- `SONDA_VESICAL` - Sonda vesical de demora
- `CONDICAO_ADQUIRIDA` - Condições adquiridas

### **🟢 ESPECIAIS (Casos Específicos)**

- `PARTO_ADEQUADO` - Parto adequado
- `RN` - Recém-nascido
- `ALTA_ADMINISTRATIVA` - Alta administrativa
- `ANALISE_CRITICA` - Análise crítica
- `CAUSA_EXTERNA_PERMANENCIA` - Causa externa de permanência
- `MEDICO_PROCEDIMENTO` - Médico procedimento
- `DISPOSITIVO_TERAPEUTICO` - Dispositivo terapêutico

## 🚀 Como Usar

### **1. Controle Básico de Módulos**

```typescript
import { ModuleControl } from "./utils/moduleControl";

// Verificar se módulo deve ser enviado
const shouldSend = ModuleControl.shouldSendModule("CTI");

// Verificar categoria
const basicActive = ModuleControl.shouldSendBasicModules();
const optionalActive = ModuleControl.shouldSendOptionalModules();
const specialActive = ModuleControl.shouldSendSpecialModules();

// Obter lista de módulos ativos
const activeModules = ModuleControl.getActiveModules();

// Validar módulos obrigatórios
const isValid = ModuleControl.validateRequiredModules();
```

### **2. Monitoramento de Módulos**

```typescript
// Iniciar monitoramento
ModuleControl.startModuleMonitoring("CTI");

// ... processar módulo ...

// Finalizar monitoramento
ModuleControl.endModuleMonitoring("CTI");

// Registrar módulo pulado
ModuleControl.recordModuleSkipped("SONDA_VESICAL");

// Obter métricas
const metrics = ModuleControl.getModuleMetrics("CTI");
const systemMetrics = ModuleControl.getSystemMetrics();
```

### **3. Análise de Otimização**

```typescript
import { ModuleOptimizer } from "./utils/moduleOptimizer";

// Gerar análise de otimização
const report = ModuleOptimizer.analyzeAndOptimize();

// Simular configuração
const config = {
  SEND_CTI: "S",
  SEND_SUPORTE_VENTILATORIO: "S",
  // ... outras configurações
};

const impact = ModuleOptimizer.simulateConfigurationImpact(config);

// Gerar relatório de otimização
const optimizationReport = ModuleOptimizer.generateOptimizationReport();
```

## 📈 Cenários de Uso

### **🏥 Hospital Geral**

```env
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=N
SEND_SPECIAL_MODULES=N
```

**Módulos ativos:** Apenas os básicos (ATENDIMENTO, HOSPITAL, PACIENTE, MEDICO, OPERADORA)

### **🏥 UTI**

```env
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=S
SEND_SPECIAL_MODULES=N
SEND_CTI=S
SEND_SUPORTE_VENTILATORIO=S
SEND_CATETER_VASCULAR=S
SEND_SONDA_VESICAL=S
```

**Módulos ativos:** Básicos + dispositivos + administrativos

### **🏥 Maternidade**

```env
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=N
SEND_SPECIAL_MODULES=S
SEND_PARTO_ADEQUADO=S
SEND_RN=S
SEND_ALTA_ADMINISTRATIVA=S
SEND_ANALISE_CRITICA=S
```

**Módulos ativos:** Básicos + parto + RN + administrativos

### **🏥 Parto com Complicações**

```env
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=S
SEND_SPECIAL_MODULES=S
# Todos os módulos ativos
```

**Módulos ativos:** Todos os módulos disponíveis

## 🧪 Testes

### **Executar Todos os Testes:**

```bash
npm run test
```

### **Executar Testes Específicos:**

```typescript
// Testes de controle de módulos
await testSuite.runModuleControlTests();

// Cenários de parto adequado
await testSuite.runPartoAdequadoTests();

// Testes de monitoramento
await testSuite.runMonitoringTests();
```

### **Cenários de Teste:**

#### **1. Controle Básico**

- ✅ Validação de categorias
- ✅ Verificação de módulos individuais
- ✅ Lista de módulos ativos
- ✅ Validação de módulos obrigatórios

#### **2. Controle Granular**

- ✅ Configuração por módulo
- ✅ Múltiplos módulos ativos
- ✅ Validação de configuração

#### **3. Monitoramento**

- ✅ Coleta de métricas
- ✅ Análise de performance
- ✅ Identificação de módulos pulados

#### **4. Otimização**

- ✅ Análise de uso
- ✅ Sugestões automáticas
- ✅ Simulação de configurações

#### **5. Cenários de Parto**

- ✅ Parto normal com RN
- ✅ Cesárea com RN
- ✅ Parto com complicações
- ✅ Otimização para maternidade

## 📊 Métricas e Relatórios

### **Métricas Coletadas:**

- **Tempo de processamento** por módulo
- **Frequência de uso** de cada módulo
- **Eficiência** de processamento
- **Módulos pulados** vs processados
- **Tendências** de uso ao longo do tempo

### **Relatórios Disponíveis:**

- **Relatório detalhado** de métricas
- **Relatório de otimização** com sugestões
- **Exportação JSON** de métricas
- **Análise de impacto** de configurações

## 🔍 Exemplos de Uso

### **Exemplo 1: Configuração para UTI**

```typescript
// Configurar ambiente para UTI
process.env.SEND_BASIC_MODULES = "S";
process.env.SEND_OPTIONAL_MODULES = "S";
process.env.SEND_SPECIAL_MODULES = "N";
process.env.SEND_CTI = "S";
process.env.SEND_SUPORTE_VENTILATORIO = "S";
process.env.SEND_CATETER_VASCULAR = "S";
process.env.SEND_SONDA_VESICAL = "S";

// Verificar módulos ativos
const activeModules = ModuleControl.getActiveModules();
console.log("Módulos ativos para UTI:", activeModules);
// Output: ['CTI', 'SUPORTE_VENTILATORIO', 'CATETER_VASCULAR', 'SONDA_VESICAL', ...]
```

### **Exemplo 2: Monitoramento de Performance**

```typescript
// Iniciar monitoramento
ModuleControl.startModuleMonitoring("CTI");

// Simular processamento
await processCTIData();

// Finalizar monitoramento
ModuleControl.endModuleMonitoring("CTI");

// Obter métricas
const ctiMetrics = ModuleControl.getModuleMetrics("CTI");
console.log("Tempo médio de processamento:", ctiMetrics.averageProcessingTime);
console.log("Vezes processado:", ctiMetrics.timesProcessed);
console.log("Eficiência:", ctiMetrics.efficiency + "%");
```

### **Exemplo 3: Análise de Otimização**

```typescript
// Gerar análise de otimização
const optimizationReport = ModuleOptimizer.analyzeAndOptimize();

console.log("Total de sugestões:", optimizationReport.totalSuggestions);
console.log(
  "Ganho estimado:",
  optimizationReport.estimatedEfficiencyGain + "%"
);

// Aplicar otimizações de baixo risco
const appliedOptimizations = ModuleOptimizer.applyLowRiskOptimizations();
console.log("Otimizações aplicadas:", appliedOptimizations);
```

## 🛠️ Manutenção

### **Limpeza de Métricas:**

```typescript
// Limpar métricas antigas (mais de 24 horas)
ModuleControl.cleanOldMetrics();

// Resetar todas as métricas
ModuleControl.resetMetrics();
```

### **Exportação de Dados:**

```typescript
// Exportar métricas em JSON
const metricsJson = ModuleControl.exportMetrics();

// Gerar relatório detalhado
const detailedReport = ModuleControl.generateDetailedReport();

// Gerar relatório de otimização
const optimizationReport = ModuleOptimizer.generateOptimizationReport();
```

## 🚨 Troubleshooting

### **Problemas Comuns:**

#### **1. Módulos não estão sendo enviados**

- ✅ Verificar variáveis de ambiente
- ✅ Validar configuração de categorias
- ✅ Verificar se módulo está na categoria correta

#### **2. Monitoramento não está funcionando**

- ✅ Verificar se `MODULE_MONITORING=S`
- ✅ Verificar se `startModuleMonitoring` e `endModuleMonitoring` estão sendo chamados
- ✅ Verificar se não há erros no console

#### **3. Métricas não estão sendo coletadas**

- ✅ Verificar se monitoramento está ativo
- ✅ Verificar se módulos estão sendo processados
- ✅ Verificar se não há erros na coleta de métricas

### **Logs de Debug:**

```env
# Ativar logs detalhados
LOG_SENT_MODULES=S
MODULE_MONITORING=S
```

## 📚 Referências

### **Arquivos Relacionados:**

- `src/utils/moduleControl.ts` - Controle de módulos
- `src/utils/moduleMonitor.ts` - Monitoramento
- `src/utils/moduleOptimizer.ts` - Otimização
- `src/tests/moduleControl.test.ts` - Testes de controle
- `src/tests/scenarios/partoAdequado.test.ts` - Cenários de parto
- `example_env` - Configurações de ambiente

### **Dependências:**

- Node.js 16+
- TypeScript 4+
- Sistema DRG existente

## 🎯 Próximos Passos

### **Melhorias Futuras:**

- ✅ Dashboard web para visualização de métricas
- ✅ Alertas automáticos para problemas de performance
- ✅ Integração com sistemas de monitoramento externos
- ✅ Machine learning para otimização automática
- ✅ API REST para controle remoto

---

**📞 Suporte:** Para dúvidas ou problemas, consulte a documentação ou entre em contato com a equipe de desenvolvimento.

**🔄 Versão:** 1.0.0  
**📅 Última atualização:** 29/09/2024
