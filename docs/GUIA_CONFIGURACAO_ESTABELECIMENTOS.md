# Guia de Configuração por Tipo de Estabelecimento

## 📋 Visão Geral

Este guia apresenta configurações otimizadas do Sistema de Controle de Módulos DRG para diferentes tipos de estabelecimentos de saúde, garantindo máxima eficiência e conformidade com as regras DRG.

## 🏥 Tipos de Estabelecimentos

### **1. 🏥 Hospital Geral**

#### **Características:**

- Atendimento geral de pacientes
- Módulos básicos sempre ativos
- Módulos opcionais conforme necessidade
- Módulos especiais raramente utilizados

#### **Configuração Recomendada:**

```env
# ========================================
# HOSPITAL GERAL - CONFIGURAÇÃO BÁSICA
# ========================================

# Categorias
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=N
SEND_SPECIAL_MODULES=N

# Módulos Básicos (sempre ativos)
SEND_ATENDIMENTO=S
SEND_HOSPITAL=S
SEND_PACIENTE=S
SEND_MEDICO=S
SEND_OPERADORA=S

# Módulos Opcionais (ativar conforme necessidade)
SEND_CTI=N
SEND_SUPORTE_VENTILATORIO=N
SEND_CATETER_VASCULAR=N
SEND_SONDA_VESICAL=N
SEND_CONDICAO_ADQUIRIDA=N

# Módulos Especiais (raramente utilizados)
SEND_PARTO_ADEQUADO=N
SEND_RN=N
SEND_ALTA_ADMINISTRATIVA=N
SEND_ANALISE_CRITICA=N
SEND_CAUSA_EXTERNA_PERMANENCIA=N
SEND_MEDICO_PROCEDIMENTO=N
SEND_DISPOSITIVO_TERAPEUTICO=N

# Monitoramento
MODULE_MONITORING=S
LOG_SENT_MODULES=S
VALIDATE_REQUIRED_MODULES=S
```

#### **Módulos Ativos:** 5 (Básicos)

#### **Eficiência Esperada:** 100%

#### **Tempo de Processamento:** ~50ms

---

### **2. 🏥 UTI (Unidade de Terapia Intensiva)**

#### **Características:**

- Atendimento de pacientes críticos
- Uso intensivo de dispositivos terapêuticos
- Monitoramento contínuo
- Módulos administrativos essenciais

#### **Configuração Recomendada:**

```env
# ========================================
# UTI - CONFIGURAÇÃO COMPLETA
# ========================================

# Categorias
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=S
SEND_SPECIAL_MODULES=S

# Módulos Básicos
SEND_ATENDIMENTO=S
SEND_HOSPITAL=S
SEND_PACIENTE=S
SEND_MEDICO=S
SEND_OPERADORA=S

# Módulos Opcionais (dispositivos)
SEND_CTI=S
SEND_SUPORTE_VENTILATORIO=S
SEND_CATETER_VASCULAR=S
SEND_SONDA_VESICAL=S
SEND_CONDICAO_ADQUIRIDA=S

# Módulos Especiais (administrativos)
SEND_ALTA_ADMINISTRATIVA=S
SEND_ANALISE_CRITICA=S
SEND_CAUSA_EXTERNA_PERMANENCIA=S
SEND_MEDICO_PROCEDIMENTO=S
SEND_DISPOSITIVO_TERAPEUTICO=S

# Módulos Especiais (não utilizados em UTI)
SEND_PARTO_ADEQUADO=N
SEND_RN=N

# Monitoramento
MODULE_MONITORING=S
LOG_SENT_MODULES=S
VALIDATE_REQUIRED_MODULES=S
```

#### **Módulos Ativos:** 12 (Básicos + Opcionais + Administrativos)

#### **Eficiência Esperada:** 100%

#### **Tempo de Processamento:** ~200ms

---

### **3. 🏥 Maternidade**

#### **Características:**

- Atendimento especializado em partos
- Módulos de parto adequado essenciais
- RN (Recém-nascido) sempre presente
- Módulos de CTI raramente utilizados

#### **Configuração Recomendada:**

```env
# ========================================
# MATERNIDADE - CONFIGURAÇÃO ESPECIALIZADA
# ========================================

# Categorias
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=N
SEND_SPECIAL_MODULES=S

# Módulos Básicos
SEND_ATENDIMENTO=S
SEND_HOSPITAL=S
SEND_PACIENTE=S
SEND_MEDICO=S
SEND_OPERADORA=S

# Módulos Especiais (parto e RN)
SEND_PARTO_ADEQUADO=S
SEND_RN=S
SEND_ALTA_ADMINISTRATIVA=S
SEND_ANALISE_CRITICA=S

# Módulos Opcionais (não utilizados em maternidade normal)
SEND_CTI=N
SEND_SUPORTE_VENTILATORIO=N
SEND_CATETER_VASCULAR=N
SEND_SONDA_VESICAL=N
SEND_CONDICAO_ADQUIRIDA=N

# Módulos Especiais (não utilizados)
SEND_CAUSA_EXTERNA_PERMANENCIA=N
SEND_MEDICO_PROCEDIMENTO=N
SEND_DISPOSITIVO_TERAPEUTICO=N

# Monitoramento
MODULE_MONITORING=S
LOG_SENT_MODULES=S
VALIDATE_REQUIRED_MODULES=S
```

#### **Módulos Ativos:** 9 (Básicos + Parto + RN + Administrativos)

#### **Eficiência Esperada:** 100%

#### **Tempo de Processamento:** ~120ms

---

### **4. 🏥 Maternidade com UTI**

#### **Características:**

- Maternidade com UTI neonatal
- Partos de alto risco
- Uso de dispositivos terapêuticos
- Monitoramento intensivo

#### **Configuração Recomendada:**

```env
# ========================================
# MATERNIDADE COM UTI - CONFIGURAÇÃO COMPLETA
# ========================================

# Categorias
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=S
SEND_SPECIAL_MODULES=S

# Módulos Básicos
SEND_ATENDIMENTO=S
SEND_HOSPITAL=S
SEND_PACIENTE=S
SEND_MEDICO=S
SEND_OPERADORA=S

# Módulos Opcionais (dispositivos para UTI neonatal)
SEND_CTI=S
SEND_SUPORTE_VENTILATORIO=S
SEND_CATETER_VASCULAR=S
SEND_SONDA_VESICAL=S
SEND_CONDICAO_ADQUIRIDA=S

# Módulos Especiais (parto e RN)
SEND_PARTO_ADEQUADO=S
SEND_RN=S
SEND_ALTA_ADMINISTRATIVA=S
SEND_ANALISE_CRITICA=S
SEND_CAUSA_EXTERNA_PERMANENCIA=S
SEND_MEDICO_PROCEDIMENTO=S
SEND_DISPOSITIVO_TERAPEUTICO=S

# Monitoramento
MODULE_MONITORING=S
LOG_SENT_MODULES=S
VALIDATE_REQUIRED_MODULES=S
```

#### **Módulos Ativos:** 15 (Todos os módulos)

#### **Eficiência Esperada:** 100%

#### **Tempo de Processamento:** ~250ms

---

### **5. 🏥 Clínica Especializada**

#### **Características:**

- Atendimento ambulatorial
- Módulos básicos essenciais
- Módulos opcionais conforme especialidade
- Módulos especiais raramente utilizados

#### **Configuração Recomendada:**

```env
# ========================================
# CLÍNICA ESPECIALIZADA - CONFIGURAÇÃO BÁSICA
# ========================================

# Categorias
SEND_BASIC_MODULES=S
SEND_OPTIONAL_MODULES=N
SEND_SPECIAL_MODULES=N

# Módulos Básicos
SEND_ATENDIMENTO=S
SEND_HOSPITAL=S
SEND_PACIENTE=S
SEND_MEDICO=S
SEND_OPERADORA=S

# Módulos Opcionais (ativar conforme especialidade)
SEND_CTI=N
SEND_SUPORTE_VENTILATORIO=N
SEND_CATETER_VASCULAR=N
SEND_SONDA_VESICAL=N
SEND_CONDICAO_ADQUIRIDA=N

# Módulos Especiais (não utilizados em clínica)
SEND_PARTO_ADEQUADO=N
SEND_RN=N
SEND_ALTA_ADMINISTRATIVA=N
SEND_ANALISE_CRITICA=N
SEND_CAUSA_EXTERNA_PERMANENCIA=N
SEND_MEDICO_PROCEDIMENTO=N
SEND_DISPOSITIVO_TERAPEUTICO=N

# Monitoramento
MODULE_MONITORING=S
LOG_SENT_MODULES=S
VALIDATE_REQUIRED_MODULES=S
```

#### **Módulos Ativos:** 5 (Básicos)

#### **Eficiência Esperada:** 100%

#### **Tempo de Processamento:** ~50ms

---

## 🔧 Configurações Específicas por Especialidade

### **Cardiologia:**

```env
# Ativar módulos relacionados ao coração
SEND_SUPORTE_VENTILATORIO=S
SEND_CATETER_VASCULAR=S
SEND_CONDICAO_ADQUIRIDA=S
```

### **Neurologia:**

```env
# Ativar módulos relacionados ao sistema nervoso
SEND_CTI=S
SEND_SUPORTE_VENTILATORIO=S
SEND_CONDICAO_ADQUIRIDA=S
```

### **Pediatria:**

```env
# Ativar módulos relacionados a crianças
SEND_RN=S
SEND_PARTO_ADEQUADO=S
SEND_ALTA_ADMINISTRATIVA=S
```

### **Oncologia:**

```env
# Ativar módulos relacionados ao câncer
SEND_CATETER_VASCULAR=S
SEND_SONDA_VESICAL=S
SEND_CONDICAO_ADQUIRIDA=S
SEND_DISPOSITIVO_TERAPEUTICO=S
```

## 📊 Comparativo de Configurações

| Tipo de Estabelecimento | Módulos Ativos | Eficiência | Tempo (ms) | Complexidade |
| ----------------------- | -------------- | ---------- | ---------- | ------------ |
| Hospital Geral          | 5              | 100%       | 50         | Baixa        |
| UTI                     | 12             | 100%       | 200        | Alta         |
| Maternidade             | 9              | 100%       | 120        | Média        |
| Maternidade + UTI       | 15             | 100%       | 250        | Muito Alta   |
| Clínica Especializada   | 5              | 100%       | 50         | Baixa        |

## 🚀 Implementação

### **1. Aplicar Configuração:**

```bash
# Copiar configuração para .env
cp example_env .env

# Editar configuração conforme tipo de estabelecimento
nano .env
```

### **2. Validar Configuração:**

```typescript
// Verificar módulos ativos
const activeModules = ModuleControl.getActiveModules();
console.log("Módulos ativos:", activeModules);

// Validar configuração
const isValid = ModuleControl.validateRequiredModules();
console.log("Configuração válida:", isValid);
```

### **3. Testar Configuração:**

```bash
# Executar testes específicos
npm run test:module-control
npm run test:parto-adequado
```

## 📈 Monitoramento e Otimização

### **Métricas Importantes:**

- **Eficiência de processamento:** Deve ser 100%
- **Tempo médio por módulo:** < 50ms
- **Módulos pulados:** Deve ser 0% para módulos ativos
- **Uso de recursos:** Monitorar CPU e memória

### **Alertas Recomendados:**

- Eficiência < 95%
- Tempo de processamento > 500ms
- Módulos obrigatórios faltando
- Erros de validação

### **Otimização Automática:**

```typescript
// Gerar análise de otimização
const report = ModuleOptimizer.analyzeAndOptimize();

// Aplicar otimizações de baixo risco
const applied = ModuleOptimizer.applyLowRiskOptimizations();

// Simular nova configuração
const impact = ModuleOptimizer.simulateConfigurationImpact(newConfig);
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

- ✅ Verificar se variáveis de ambiente estão corretas
- ✅ Validar se categoria está ativa
- ✅ Verificar se módulo está na categoria correta

#### **2. Performance baixa**

- ✅ Verificar se módulos desnecessários estão ativos
- ✅ Analisar métricas de uso
- ✅ Aplicar otimizações sugeridas

#### **3. Erros de validação**

- ✅ Verificar se módulos obrigatórios estão ativos
- ✅ Validar configuração com `validateRequiredModules()`
- ✅ Verificar logs de erro

## 📚 Referências

### **Documentação Relacionada:**

- [Sistema de Controle de Módulos DRG](./SISTEMA_CONTROLE_MODULOS_DRG.md)
- [Testes e Validação](./TESTES_VALIDACAO.md)
- [API Reference](./API_REFERENCE.md)

### **Arquivos de Configuração:**

- `example_env` - Configurações de exemplo
- `src/utils/moduleControl.ts` - Lógica de controle
- `src/utils/moduleMonitor.ts` - Monitoramento
- `src/utils/moduleOptimizer.ts` - Otimização

---

**🔄 Versão:** 1.0.0  
**📅 Última atualização:** 29/09/2024  
**👥 Mantido por:** Equipe de Desenvolvimento DRG
