# Documentação do Sistema DRG

## 📋 Visão Geral

Esta documentação abrange o Sistema de Controle de Módulos DRG, uma solução completa para gerenciar, monitorar e otimizar o envio de dados para o sistema DRG (Diagnosis-Related Group).

## 📚 Documentação Disponível

### **1. 🏗️ Sistema de Controle de Módulos**

- **[Sistema de Controle de Módulos DRG](./SISTEMA_CONTROLE_MODULOS_DRG.md)**
  - Visão geral do sistema
  - Funcionalidades principais
  - Arquitetura e componentes
  - Configuração e uso
  - Exemplos práticos

### **2. 🏥 Guia de Configuração por Estabelecimento**

- **[Guia de Configuração por Tipo de Estabelecimento](./GUIA_CONFIGURACAO_ESTABELECIMENTOS.md)**
  - Hospital Geral
  - UTI (Unidade de Terapia Intensiva)
  - Maternidade
  - Maternidade com UTI
  - Clínica Especializada
  - Configurações por especialidade

### **3. 🧪 Guia de Testes e Validação**

- **[Guia de Testes e Validação](./GUIA_TESTES_VALIDACAO.md)**
  - Estrutura de testes
  - Tipos de testes
  - Execução de testes
  - Relatórios de teste
  - Validação de dados
  - Métricas de qualidade

## 🚀 Início Rápido

### **1. Instalação:**

```bash
# Clonar repositório
git clone <repository-url>
cd drg

# Instalar dependências
npm install

# Compilar TypeScript
npm run build
```

### **2. Configuração:**

```bash
# Copiar arquivo de configuração
cp example_env .env

# Editar configuração conforme necessário
nano .env
```

### **3. Executar Testes:**

```bash
# Executar todos os testes
npm run test

# Executar testes específicos
npm run test:module-control
npm run test:parto-adequado
```

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
├── modules/
│   └── createXml/
│       └── helpers/
│           └── buildInternacao.ts # Integração com XML
└── models/
    ├── partoAdequado.ts     # Modelo de parto adequado
    ├── rn.ts                # Modelo de recém-nascido
    └── ...                  # Outros modelos
```

## 🔧 Funcionalidades Principais

### **1. Controle de Módulos**

- ✅ Controle por categorias (Básico, Opcional, Especial)
- ✅ Controle granular por módulo individual
- ✅ Validação de módulos obrigatórios
- ✅ Configuração flexível via variáveis de ambiente

### **2. Monitoramento em Tempo Real**

- ✅ Coleta de métricas de performance
- ✅ Análise de eficiência de processamento
- ✅ Identificação de módulos subutilizados
- ✅ Relatórios detalhados de uso

### **3. Otimização Automática**

- ✅ Sugestões de configuração baseadas em uso
- ✅ Análise de impacto de mudanças
- ✅ Simulação de configurações
- ✅ Relatórios de otimização

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

## 🎯 Cenários de Uso

### **🏥 Hospital Geral**

```env
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=N
SEND_SPECIAL_MODULES=N
```

**Módulos ativos:** 5 (Apenas básicos)

### **🏥 UTI**

```env
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=S
SEND_SPECIAL_MODULES=S
```

**Módulos ativos:** 12 (Básicos + Opcionais + Administrativos)

### **🏥 Maternidade**

```env
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=N
SEND_SPECIAL_MODULES=S
SEND_PARTO_ADEQUADO=S
SEND_RN=S
```

**Módulos ativos:** 9 (Básicos + Parto + RN + Administrativos)

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

- ✅ **7 testes** de controle de módulos
- ✅ **4 cenários** de parto adequado
- ✅ **3 tipos** de monitoramento
- ✅ **2 simulações** de configuração
- ✅ **1 exportação** de métricas

## 📈 Métricas e Relatórios

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

### **Exemplo 1: Controle Básico**

```typescript
import { ModuleControl } from "./utils/moduleControl";

// Verificar se módulo deve ser enviado
const shouldSend = ModuleControl.shouldSendModule("CTI");

// Obter lista de módulos ativos
const activeModules = ModuleControl.getActiveModules();

// Validar módulos obrigatórios
const isValid = ModuleControl.validateRequiredModules();
```

### **Exemplo 2: Monitoramento**

```typescript
// Iniciar monitoramento
ModuleControl.startModuleMonitoring("CTI");

// ... processar módulo ...

// Finalizar monitoramento
ModuleControl.endModuleMonitoring("CTI");

// Obter métricas
const metrics = ModuleControl.getModuleMetrics("CTI");
```

### **Exemplo 3: Otimização**

```typescript
import { ModuleOptimizer } from "./utils/moduleOptimizer";

// Gerar análise de otimização
const report = ModuleOptimizer.analyzeAndOptimize();

// Simular configuração
const impact = ModuleOptimizer.simulateConfigurationImpact(config);
```

## 🛠️ Manutenção

### **Limpeza Regular:**

```typescript
// Limpar métricas antigas (diariamente)
ModuleControl.cleanOldMetrics();

// Resetar métricas (semanalmente)
ModuleControl.resetMetrics();
```

### **Backup de Configuração:**

```bash
# Backup da configuração atual
cp .env .env.backup.$(date +%Y%m%d)

# Restaurar configuração
cp .env.backup.20240929 .env
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

## 📚 Referências

### **Arquivos Principais:**

- `src/utils/moduleControl.ts` - Controle de módulos
- `src/utils/moduleMonitor.ts` - Monitoramento
- `src/utils/moduleOptimizer.ts` - Otimização
- `src/tests/` - Testes e validação
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

## 📞 Suporte

Para dúvidas ou problemas:

1. Consulte a documentação específica
2. Verifique os logs de erro
3. Execute os testes de validação
4. Entre em contato com a equipe de desenvolvimento

---

**🔄 Versão:** 1.0.0  
**📅 Última atualização:** 29/09/2024  
**👥 Mantido por:** Equipe de Desenvolvimento DRG
