# ⚡ Configuração Rápida - DRG API

## 🎯 Configuração por Tipo de Estabelecimento

### **🏥 Hospital Geral (Configuração Básica)**

**Características:** Atendimento geral, módulos básicos sempre ativos
**Módulos:** 5 (Básicos) | **Tempo:** ~50ms | **Eficiência:** 100%

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

# Módulos Opcionais (não utilizados)
SEND_CTI=N
SEND_SUPORTE_VENTILATORIO=N
SEND_CATETER_VASCULAR=N
SEND_SONDA_VESICAL=N
SEND_CONDICAO_ADQUIRIDA=N

# Módulos Especiais (não utilizados)
SEND_PARTO_ADEQUADO=N
SEND_RN=N
SEND_ALTA_ADMINISTRATIVA=N
SEND_ANALISE_CRITICA=N
SEND_CAUSA_EXTERNA_PERMANENCIA=N
SEND_MEDICO_PROCEDIMENTO=N
SEND_DISPOSITIVO_TERAPEUTICO=N
```

---

### **🏥 UTI (Configuração Completa)**

**Características:** Atendimento crítico, dispositivos terapêuticos, monitoramento intensivo
**Módulos:** 12 (Básicos + Opcionais + Administrativos) | **Tempo:** ~200ms | **Eficiência:** 100%

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
```

---

### **🏥 Maternidade (Configuração Especializada)**

**Características:** Atendimento especializado em partos, RN sempre presente
**Módulos:** 9 (Básicos + Parto + RN + Administrativos) | **Tempo:** ~120ms | **Eficiência:** 100%

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
```

---

### **🏥 Maternidade + UTI (Configuração Completa)**

**Características:** Maternidade com UTI neonatal, partos de alto risco
**Módulos:** 15 (Todos os módulos) | **Tempo:** ~250ms | **Eficiência:** 100%

```env
# ========================================
# MATERNIDADE + UTI - CONFIGURAÇÃO COMPLETA
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
```

---

### **🏥 Clínica Especializada (Configuração Básica)**

**Características:** Atendimento ambulatorial, módulos básicos essenciais
**Módulos:** 5 (Básicos) | **Tempo:** ~50ms | **Eficiência:** 100%

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
```

---

## 🔧 Configurações por Especialidade

### **Cardiologia:**

```env
SEND_SUPORTE_VENTILATORIO=S
SEND_CATETER_VASCULAR=S
SEND_CONDICAO_ADQUIRIDA=S
```

### **Neurologia:**

```env
SEND_CTI=S
SEND_SUPORTE_VENTILATORIO=S
SEND_CONDICAO_ADQUIRIDA=S
```

### **Pediatria:**

```env
SEND_RN=S
SEND_PARTO_ADEQUADO=S
SEND_ALTA_ADMINISTRATIVA=S
```

### **Oncologia:**

```env
SEND_CATETER_VASCULAR=S
SEND_SONDA_VESICAL=S
SEND_CONDICAO_ADQUIRIDA=S
SEND_DISPOSITIVO_TERAPEUTICO=S
```

---

## 📊 Comparativo de Configurações

| Tipo de Estabelecimento | Módulos Ativos | Eficiência | Tempo (ms) | Complexidade |
| ----------------------- | -------------- | ---------- | ---------- | ------------ |
| Hospital Geral          | 5              | 100%       | 50         | Baixa        |
| UTI                     | 12             | 100%       | 200        | Alta         |
| Maternidade             | 9              | 100%       | 120        | Média        |
| Maternidade + UTI       | 15             | 100%       | 250        | Muito Alta   |
| Clínica Especializada   | 5              | 100%       | 50         | Baixa        |

---

## 🚀 Implementação Rápida

### **1. Escolher Configuração:**

```bash
# Copiar configuração desejada para .env
cp example_env .env
# Editar .env com a configuração escolhida
```

### **2. Validar Configuração:**

```bash
# Executar testes de validação
npm run test

# Testar configuração específica
node test-estabelecimento8-simple.js 1 1
```

### **3. Deploy:**

```bash
# Compilar e iniciar
npm run build
pm2 start ./dist/server.js --name drg-api
```

---

## 🎯 Configuração Recomendada por Cenário

### **Para Hospitais Pequenos:**

- **Configuração:** Hospital Geral
- **Módulos:** 5 (Básicos)
- **Uso:** Atendimento geral, baixa complexidade

### **Para Hospitais Médios:**

- **Configuração:** Maternidade ou UTI
- **Módulos:** 9-12 (Básicos + Especiais)
- **Uso:** Especialização em área específica

### **Para Hospitais Grandes:**

- **Configuração:** Maternidade + UTI
- **Módulos:** 15 (Todos)
- **Uso:** Atendimento completo, alta complexidade

### **Para Clínicas:**

- **Configuração:** Clínica Especializada
- **Módulos:** 5 (Básicos)
- **Uso:** Atendimento ambulatorial

---

## ✅ Validação Rápida

### **Teste Básico:**

```bash
# Verificar se API está funcionando
curl -X GET http://localhost:3434/health
```

### **Teste de Envio:**

```bash
# Testar envio de internação
curl -X GET http://localhost:3434/createxml/990724
```

### **Teste de Módulos:**

```bash
# Executar teste de controle de módulos
npm run test:module-control
```

---

**🎯 Sistema pronto para uso com configuração otimizada por tipo de estabelecimento!**

---

**🔄 Versão:** 1.0.0  
**📅 Última atualização:** 29/09/2024  
**👥 Mantido por:** Fernando Lemos
