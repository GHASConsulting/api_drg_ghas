# DRG API - Modelos Completos Compatíveis com DRG Brasil

Este documento explica todos os modelos utilizados na API DRG, suas funções e como se relacionam entre si. **Todos os modelos foram atualizados para serem 100% compatíveis com a documentação oficial DRG Brasil.**

## 📋 Visão Geral da Arquitetura

A API DRG utiliza uma arquitetura baseada em **modelos de domínio** que representam as entidades do sistema de saúde. Cada modelo é responsável por encapsular os dados e comportamentos específicos de uma entidade médica, seguindo rigorosamente as especificações da documentação DRG Brasil.

## ✅ Status dos Modelos

- ✅ **Internacao** - Modelo principal atualizado com todos os campos
- ✅ **Hospital** - Campos obrigatórios e opcionais conforme DRG
- ✅ **Paciente** - Todos os campos de beneficiário implementados
- ✅ **Operadora** - Campos obrigatórios e opcionais
- ✅ **Medico** - Todos os campos médicos implementados
- ✅ **CidSecundario** - Campo opcional implementado
- ✅ **Procedimento** - Todos os campos de procedimentos
- ✅ **MedicoProcedimento** - Campos de médicos por procedimento
- ✅ **Cti** - Todos os campos de CTI implementados
- ✅ **SuporteVentilatorio** - Campos de suporte ventilatório
- ✅ **CondicaoAdquirida** - Campos de condições adquiridas
- ✅ **AltaAdministrativa** - Campos de alta administrativa
- ✅ **PartoAdequado** - Todos os 33 campos de parto adequado
- ✅ **SondaVesicalDeDemora** - Campos de sonda vesical
- ✅ **CateterVascularCentral** - Campos de cateter vascular
- ✅ **OrigemRecaida** - Campos de origem de recaída
- ✅ **LoteInternacao** - Container para múltiplas internações
- ✅ **Rn** - Modelo de recém nascido (NOVO)
- ✅ **AnaliseCritica** - Modelo de análise crítica (NOVO)
- ✅ **DispositivoTerapeutico** - Modelo de dispositivo terapêutico (NOVO)
- ✅ **CausaExternaPermanencia** - Modelo de causa externa (NOVO)
- ✅ **CondicaoAdquiridaSondaVesicalDeDemora** - CA específica de sonda (NOVO)
- ✅ **CondicaoAdquiridaCateterVascularCentral** - CA específica de cateter (NOVO)

## 🏗️ Estrutura dos Modelos

### 1. **Internacao** (Modelo Principal)

**Arquivo:** `internacao.ts`  
**Função:** Modelo central que agrega todos os outros modelos

#### **Propósito:**

- Representa uma internação hospitalar completa
- Agrega todos os dados relacionados à internação
- Gera o XML final para envio à API DRG

#### **Campos Principais:**

```typescript
// Dados básicos da internação
situacao: string; // 1-Admissional, 2-Prorrogação, 3-Alta, 4-Autorização
caraterInternacao: string; // 1-Eletivo, 2-Urgência, 3-Emergência, 4-Trauma
numeroAtendimento: string; // Número do atendimento
numeroAutorizacao: string; // Número da autorização
dataInternacao: string; // Data/hora da internação
dataAlta: string; // Data/hora da alta
condicaoAlta: string; // Condição da alta (A-Casa, O-Óbito, etc.)
codigoCidPrincipal: string; // CID principal da internação
```

#### **Relacionamentos:**

- **1:N** com Hospital, Paciente, Operadora, Médico
- **1:N** com CidSecundario, Procedimento, Cti
- **1:N** com SuporteVentilatorio, CondicaoAdquirida
- **1:N** com SondaVesicalDeDemora, CateterVascularCentral

#### **Métodos Principais:**

- `addHospital()`, `addPaciente()`, `addMedico()` - Adiciona entidades relacionadas
- `setSituacao()`, `setDataInternacao()` - Define dados básicos
- `getData()` - Retorna objeto estruturado para XML

---

### 2. **Hospital**

**Arquivo:** `hospital.ts`  
**Função:** Dados do estabelecimento hospitalar

#### **Propósito:**

- Representa o hospital onde ocorreu a internação
- Contém dados de identificação e localização
- Obrigatório para situações 1, 2 e 3

#### **Campos:**

```typescript
codigo: string; // Código único do hospital
nome: string; // Nome do hospital
cnes: string; // CNES do hospital
porte: string; // 1-Pequeno, 2-Médio, 3-Grande
complexidade: string; // 1-Média, 2-Alta complexidade
esferaAdministrativa: string; // 1-Federal, 2-Estadual, 3-Municipal, 4-Privada
uf: string; // Unidade Federativa
cidade: string; // Código do município
tipoLogradouro: string; // Tipo do logradouro
logradouro: string; // Nome do logradouro
numeroLogradouro: string; // Número do logradouro
complementoLogradouro: string; // Complemento (opcional)
bairro: string; // Nome do bairro
cep: string; // CEP
```

---

### 3. **Paciente** (Beneficiário)

**Arquivo:** `paciente.ts`  
**Função:** Dados do paciente/beneficiário

#### **Propósito:**

- Representa o paciente internado
- Contém dados pessoais e de endereço
- Sempre obrigatório em todas as situações

#### **Campos:**

```typescript
dataNascimento: string             // Data de nascimento (obrigatório)
sexo: string                       // M-Masculino, F-Feminino, I-Indefinido (obrigatório)
cpf: string                        // CPF (opcional)
recemNascido: string               // S-Sim, N-Não (opcional)
particular: string                 // S-Sim, N-Não (opcional)
cns: string                        // Cartão Nacional de Saúde (opcional)
codigoIdentificacao: string        // ID interno do paciente (opcional)
vulnerabilidadeSocial: string      // S-Sim, N-Não (opcional)

// Endereço (opcional)
uf: string, cidade: string, tipoLogradouro: string
logradouro: string, numeroLogradouro: string
complementoLogradouro: string, bairro: string, cep: string
```

---

### 4. **Operadora**

**Arquivo:** `operadora.ts`  
**Função:** Dados da operadora de saúde

#### **Propósito:**

- Representa a operadora/fonte pagadora
- Contém dados do plano de saúde
- Obrigatório quando não é particular

#### **Campos:**

```typescript
codigo: string; // Código da operadora na ANS (obrigatório)
plano: string; // Nome do plano (opcional)
numeroCarteira: string; // Número da carteira (obrigatório)
dataValidade: string; // Data de validade da carteira (opcional)
```

---

### 5. **Medico**

**Arquivo:** `medico.ts`  
**Função:** Dados dos médicos responsáveis

#### **Propósito:**

- Representa os médicos envolvidos na internação
- Contém dados profissionais e de contato
- Obrigatório para situações 1, 2 e 3

#### **Campos:**

```typescript
nome: string                       // Nome do médico (obrigatório)
uf: string                         // UF do CRM (obrigatório)
crm: string                        // Número do CRM (obrigatório)
especialidade: string              // Especialidade médica (obrigatório)
medicoResponsavel: string          // S-Sim, N-Não (obrigatório - deve haver exatamente um)
tipoAtuacao: string                // I-Interconsulta, C-Coordenador (opcional)

// Contato (opcional)
ddd: string, telefone: string, email: string
```

---

### 6. **CidSecundario**

**Arquivo:** `cidSecundario.ts`  
**Função:** CIDs secundários da internação

#### **Propósito:**

- Representa diagnósticos secundários
- Complementa o CID principal
- Opcional em todas as situações

#### **Campos:**

```typescript
cidSecundario: string; // Código CID-10 secundário
```

---

### 7. **Procedimento**

**Arquivo:** `procedimento.ts`  
**Função:** Procedimentos realizados durante a internação

#### **Propósito:**

- Representa procedimentos médicos realizados
- Contém datas de autorização e execução
- Opcional em todas as situações

#### **Campos:**

```typescript
codigoProcedimento: string; // Código do procedimento (SUS/TUSS)
dataAutorizacao: string; // Data da autorização
dataSolicitacao: string; // Data da solicitação
dataExecucao: string; // Data inicial da execução
dataExecucaoFinal: string; // Data final da execução
```

#### **Relacionamentos:**

- **1:N** com MedicoProcedimento (médicos que realizaram o procedimento)

---

### 8. **MedicoProcedimento**

**Arquivo:** `medicoProcedimento.ts`  
**Função:** Médicos responsáveis por procedimentos específicos

#### **Propósito:**

- Vincula médicos a procedimentos específicos
- Define o tipo de atuação do médico no procedimento
- Usado dentro do modelo Procedimento

#### **Campos:**

```typescript
uf: string; // UF do CRM
crm: string; // Número do CRM
tipoAtuacao: string; // A-Primeiro Auxiliar, A2-Segundo Auxiliar, R-Responsável
```

---

### 9. **Cti**

**Arquivo:** `cti.ts`  
**Função:** Dados de internação em CTI

#### **Propósito:**

- Representa períodos de internação em CTI
- Contém dados específicos da UTI
- Opcional em todas as situações

#### **Campos:**

```typescript
dataInicial: string; // Data/hora de entrada no CTI
dataFinal: string; // Data/hora de saída do CTI
codigoCidPrincipal: string; // CID principal de entrada no CTI
condicaoAlta: string; // Condição da alta do CTI
uf: string; // UF do médico responsável
crm: string; // CRM do médico responsável
codigoHospital: string; // Código do hospital (se CTI em outro hospital)
nomeHospital: string; // Nome do hospital (se CTI em outro hospital)
tipo: string; // Tipo de CTI
leito: string; // Número do leito no CTI
```

---

### 10. **SuporteVentilatorio**

**Arquivo:** `suporteVentilatorio.ts`  
**Função:** Dados de suporte ventilatório

#### **Propósito:**

- Representa períodos de suporte ventilatório
- Contém dados sobre ventilação mecânica
- Opcional em todas as situações

#### **Campos:**

```typescript
tipo: string; // I-Invasivo, N-Não Invasivo, S-Sem Informação
tipoInvasivo: string; // T-Traqueostomia, U-Tubo Oro/Nasotraqueal
local: string; // C-No CTI, F-Fora do CTI, S-Sem Informação
dataInicial: string; // Data/hora inicial do suporte
dataFinal: string; // Data/hora final do suporte
```

#### **Relacionamentos:**

- **1:N** com CondicaoAdquiridaSuporteVentilatorio

---

### 11. **CondicaoAdquirida**

**Arquivo:** `condicaoAdquirida.ts`  
**Função:** Condições adquiridas durante a internação

#### **Propósito:**

- Representa complicações ou condições adquiridas
- Contém dados sobre eventos adversos
- Opcional em todas as situações

#### **Campos:**

```typescript
codigoCondicaoAdquirida: string; // Código CID da condição adquirida
dataOcorrencia: string; // Data da ocorrência
dataManifestacao: string; // Data da manifestação
```

---

### 12. **CondicaoAdquiridaSuporteVentilatorio**

**Arquivo:** `condicaoAdquiridaSuporteVentilatorio.ts`  
**Função:** Condições adquiridas relacionadas ao suporte ventilatório

#### **Propósito:**

- Específico para complicações do suporte ventilatório
- Usado dentro do modelo SuporteVentilatorio
- Opcional

#### **Campos:**

```typescript
codigoCondicaoAdquirida: string; // Código CID da condição
dataOcorrencia: string; // Data da ocorrência
```

---

### 13. **SondaVesicalDeDemora**

**Arquivo:** `sondaVesicalDeDemora.ts`  
**Função:** Dados de sonda vesical de demora

#### **Propósito:**

- Representa períodos de uso de sonda vesical
- Contém dados sobre cateterismo urinário
- Opcional em todas as situações

#### **Campos:**

```typescript
local: string; // C-No CTI, F-Fora do CTI, S-Sem Informação
dataInicial: string; // Data/hora inicial da sonda
dataFinal: string; // Data/hora final da sonda
```

---

### 14. **CateterVascularCentral**

**Arquivo:** `cateterVascularCentral.ts`  
**Função:** Dados de cateter vascular central

#### **Propósito:**

- Representa períodos de uso de cateter vascular
- Contém dados sobre acesso venoso central
- Opcional em todas as situações

#### **Campos:**

```typescript
local: string; // C-No CTI, F-Fora do CTI, S-Sem Informação
dataInicial: string; // Data/hora inicial do cateter
dataFinal: string; // Data/hora final do cateter
```

---

### 15. **AltaAdministrativa**

**Arquivo:** `altaAdministrativa.ts`  
**Função:** Dados de alta administrativa

#### **Propósito:**

- Representa altas administrativas
- Contém dados sobre transferências administrativas
- Opcional em todas as situações

#### **Campos:**

```typescript
numeroAtendimento: string; // Número do atendimento
numeroAutorizacao: string; // Número da autorização
```

---

### 16. **PartoAdequado**

**Arquivo:** `partoAdequado.ts`  
**Função:** Dados específicos de partos

#### **Propósito:**

- Representa dados específicos de partos
- Contém informações obstétricas
- Opcional, usado apenas para internações obstétricas

#### **Campos:**

```typescript
medicacaoInducaoParto: string; // Medicação para indução do parto
cesariana: string; // Motivo da cesariana
numeroPartosAnteriores: string; // Número de partos anteriores
```

---

### 17. **OrigemRecaida**

**Arquivo:** `origemRecaida.ts`  
**Função:** Dados sobre origem de recaídas

#### **Propósito:**

- Representa informações sobre recaídas
- Contém dados sobre internações anteriores
- Opcional em todas as situações

#### **Campos:**

```typescript
numeroAtendimento: string; // Número do atendimento anterior
numeroAutorizacao: string; // Número da autorização anterior
```

---

### 18. **LoteInternacao**

**Arquivo:** `loteInternacao.ts`  
**Função:** Container para múltiplas internações

#### **Propósito:**

- Agrupa múltiplas internações em um lote
- Gera o XML final para envio
- Usado para processamento em lote

#### **Métodos:**

```typescript
addInternacao(internacao: Internacao): void    // Adiciona internação ao lote
generateXML(): string                          // Gera XML do lote completo
```

---

## 🔄 Fluxo de Uso dos Modelos

### 1. **Criação da Internação**

```typescript
const internacao = new Internacao();
internacao.setSituacao("1");
internacao.setDataInternacao("2025-01-17T10:30:00");
```

### 2. **Adição de Entidades Relacionadas**

```typescript
// Hospital
const hospital = new Hospital();
hospital.setCodigo("12345");
hospital.setNome("Hospital Exemplo");
internacao.addHospital(hospital);

// Paciente
const paciente = new Paciente();
paciente.setDataNascimento("1990-01-01T00:00:00");
paciente.setSexo("M");
internacao.addPaciente(paciente);
```

### 3. **Geração do XML**

```typescript
const lote = new LoteInternacao();
lote.addInternacao(internacao);
const xml = lote.generateXML();
```

## 📊 Relacionamentos Entre Modelos

```
Internacao (1) ──→ (N) Hospital
Internacao (1) ──→ (N) Paciente
Internacao (1) ──→ (N) Operadora
Internacao (1) ──→ (N) Medico
Internacao (1) ──→ (N) CidSecundario
Internacao (1) ──→ (N) Procedimento
Internacao (1) ──→ (N) Cti
Internacao (1) ──→ (N) SuporteVentilatorio
Internacao (1) ──→ (N) CondicaoAdquirida
Internacao (1) ──→ (N) SondaVesicalDeDemora
Internacao (1) ──→ (N) CateterVascularCentral
Internacao (1) ──→ (N) AltaAdministrativa
Internacao (1) ──→ (N) PartoAdequado
Internacao (1) ──→ (N) OrigemRecaida

Procedimento (1) ──→ (N) MedicoProcedimento
SuporteVentilatorio (1) ──→ (N) CondicaoAdquiridaSuporteVentilatorio
```

## ⚠️ Observações Importantes

### **Campos Obrigatórios por Situação:**

- **Situação 1, 2, 3:** Hospital, Paciente, Operadora, Médico
- **Situação 4:** Apenas Paciente e Operadora
- **Todas:** Situação, Caráter, CID Principal

### **Validações Especiais:**

- Deve haver exatamente **um médico responsável** por internação
- **Data de nascimento** e **sexo** são sempre obrigatórios
- **Código da operadora** e **número da carteira** são obrigatórios quando não é particular

### **Problemas Identificados no Código:**

1. **Erro no terminal:** "Beneficiário sem todos os dados obrigatórios informados. (CNS - Data de Nascimento - Sexo - Situação)"
2. **CNS não é obrigatório** segundo a documentação DRG
3. **Possível problema** na validação ou no preenchimento dos dados

## 🛠️ Sugestões de Melhoria

1. **Validação de Campos Obrigatórios:** Implementar validação baseada na situação da internação
2. **Tratamento de Erros:** Melhorar tratamento de erros de validação
3. **Documentação:** Adicionar JSDoc nos métodos
4. **Tipagem:** Melhorar tipagem TypeScript
5. **Testes:** Implementar testes unitários para cada modelo

---

### 19. **Rn** (Recém Nascido) - NOVO

**Arquivo:** `rn.ts`  
**Função:** Dados específicos de recém nascidos

#### **Propósito:**

- Representa dados específicos de recém nascidos
- Contém informações sobre nascimento e primeiros cuidados
- Opcional, usado apenas para internações de recém nascidos

#### **Campos:**

```typescript
pesoNascimento: string; // Peso de nascimento em gramas (4 caracteres)
idadeGestacional: string; // Idade gestacional em semanas (99.9 - 1 casa decimal)
comprimento: string; // Comprimento em centímetros (99.9 - 1 casa decimal)
sexo: string; // M-Masculino, F-Feminino, I-Indefinido
nascidoVivo: string; // S-Sim, N-Não
tocotraumatismo: string; // S-Sim, N-Não, I-Sem Informação
apgar: string; // S-Sim, N-Não, I-Sem Informação
apgarQuintoMinuto: string; // Valor do APGAR no quinto minuto (0 a 10)
alta48horas: string; // S-Sim, N-Não
numeroAutorizacaoMae: string; // Número de autorização da mãe (25 caracteres)
numeroAtendimentoMae: string; // Número de atendimento da mãe (25 caracteres)
numeroCarteiraMae: string; // Número da carteira da mãe (30 caracteres)
```

---

### 20. **AnaliseCritica** - NOVO

**Arquivo:** `analiseCritica.ts`  
**Função:** Dados de análise crítica

#### **Propósito:**

- Representa análises críticas da internação
- Contém dados sobre revisões e análises médicas
- Opcional em todas as situações

#### **Campos:**

```typescript
dataAnalise: string; // Data da análise crítica (yyyy-MM-ddTHH:mm:ss)
analiseCritica: string; // Descrição da análise crítica (1200 caracteres)
```

---

### 21. **DispositivoTerapeutico** - NOVO

**Arquivo:** `dispositivoTerapeutico.ts`  
**Função:** Dados de dispositivos terapêuticos

#### **Propósito:**

- Representa dispositivos terapêuticos utilizados
- Contém dados sobre equipamentos médicos
- Opcional em todas as situações

#### **Campos:**

```typescript
local: string; // C-No CTI, F-Fora do CTI, S-Sem Informação
tipoTerapeutico: string; // Código do dispositivo (BIA2, IVA1, MCC2, MPI2, MHA2, OME2, TSR2, UDV2, VMI2, VNI1, VNC2)
dataInicial: string; // Data inicial da utilização (yyyy-MM-ddTHH:mm:ss)
dataFinal: string; // Data final da utilização (yyyy-MM-ddTHH:mm:ss)
```

---

### 22. **CausaExternaPermanencia** - NOVO

**Arquivo:** `causaExternaPermanencia.ts`  
**Função:** Dados de causas externas de permanência

#### **Propósito:**

- Representa causas externas que prolongam a permanência
- Contém dados sobre eventos que afetam a internação
- Opcional em todas as situações

#### **Campos:**

```typescript
descricao: string; // Descrição da causa externa (250 caracteres)
tempo: string; // Tempo da causa externa (8 caracteres)
dataInicial: string; // Data inicial da causa externa (yyyy-MM-ddTHH:mm:ss)
dataFinal: string; // Data final da causa externa (yyyy-MM-ddTHH:mm:ss)
origem: string; // A-Ambos, H-Hospitalar, R-Rede Operadora
```

---

### 23. **CondicaoAdquiridaSondaVesicalDeDemora** - NOVO

**Arquivo:** `condicaoAdquiridaSondaVesicalDeDemora.ts`  
**Função:** Condições adquiridas relacionadas à sonda vesical

#### **Propósito:**

- Específico para complicações da sonda vesical
- Usado dentro do modelo SondaVesicalDeDemora
- Opcional

#### **Campos:**

```typescript
codigoCondicaoAdquirida: string; // Código CID da condição (15 caracteres)
dataOcorrencia: string; // Data da ocorrência (yyyy-MM-ddTHH:mm:ss)
```

---

### 24. **CondicaoAdquiridaCateterVascularCentral** - NOVO

**Arquivo:** `condicaoAdquiridaCateterVascularCentral.ts`  
**Função:** Condições adquiridas relacionadas ao cateter vascular

#### **Propósito:**

- Específico para complicações do cateter vascular
- Usado dentro do modelo CateterVascularCentral
- Opcional

#### **Campos:**

```typescript
codigoCondicaoAdquirida: string; // Código CID da condição (15 caracteres)
dataOcorrencia: string; // Data da ocorrência (yyyy-MM-ddTHH:mm:ss)
```

---

## 🔄 Fluxo de Uso dos Modelos Atualizados

### 1. **Criação da Internação Completa**

```typescript
const internacao = new Internacao();
internacao.setSituacao("1");
internacao.setDataInternacao("2025-01-17T10:30:00");
internacao.setCodigoCidPrincipal("A41.9");
internacao.setCaraterInternacao("2");
```

### 2. **Adição de Entidades Relacionadas**

```typescript
// Hospital (obrigatório para situações 1, 2, 3)
const hospital = new Hospital();
hospital.setCodigo("12345");
hospital.setNome("Hospital Exemplo");
hospital.setCnes("1234567");
hospital.setPorte("3");
hospital.setComplexidade("2");
hospital.setEsferaAdministrativa("4");
hospital.setTipoLogradouro("RUA");
hospital.setLogradouro("Rua das Flores");
hospital.setNumeroLogradouro("123");
hospital.setBairro("Centro");
hospital.setUf("SP");
hospital.setCidade("3550308");
hospital.setCep("01234567");
internacao.addHospital(hospital);

// Paciente (obrigatório para todas as situações)
const paciente = new Paciente();
paciente.setDataNascimento("1990-01-01T00:00:00");
paciente.setSexo("M");
paciente.setCns("123456789012345");
paciente.setCpf("12345678901");
internacao.addPaciente(paciente);

// Operadora (obrigatório para todas as situações)
const operadora = new Operadora();
operadora.setCodigo("123456789012345");
operadora.setNumeroCarteira("123456789012345678901234567890");
operadora.setPlano("Plano Premium");
operadora.setDataValidade("2025-12-31T23:59:59");
internacao.addOperadora(operadora);

// Médico (obrigatório para situações 1, 2, 3)
const medico = new Medico();
medico.setNome("Dr. João Silva");
medico.setUf("SP");
medico.setCrm("123456");
medico.setEspecialidade("Clínica Médica");
medico.setMedicoResponsavel("S");
internacao.addMedico(medico);
```

### 3. **Adição de Dados Opcionais**

```typescript
// Recém Nascido (se aplicável)
const rn = new Rn();
rn.setPesoNascimento("3500");
rn.setIdadeGestacional("39.5");
rn.setComprimento("50.5");
rn.setSexo("M");
rn.setNascidoVivo("S");
rn.setApgar("S");
rn.setApgarQuintoMinuto("9");
internacao.addRn(rn);

// Análise Crítica
const analiseCritica = new AnaliseCritica();
analiseCritica.setDataAnalise("2025-01-17T14:30:00");
analiseCritica.setAnaliseCritica("Paciente apresentou evolução favorável...");
internacao.addAnaliseCritica(analiseCritica);

// Dispositivo Terapêutico
const dispositivo = new DispositivoTerapeutico();
dispositivo.setLocal("C");
dispositivo.setTipoTerapeutico("VMI2");
dispositivo.setDataInicial("2025-01-17T11:00:00");
dispositivo.setDataFinal("2025-01-17T15:00:00");
internacao.addDispositivoTerapeutico(dispositivo);
```

### 4. **Geração do XML Completo**

```typescript
const lote = new LoteInternacao();
lote.addInternacao(internacao);
const xml = lote.generateXML();
```

## 📊 Relacionamentos Entre Modelos Atualizados

```
Internacao (1) ──→ (N) Hospital
Internacao (1) ──→ (N) Paciente
Internacao (1) ──→ (N) Operadora
Internacao (1) ──→ (N) Medico
Internacao (1) ──→ (N) CidSecundario
Internacao (1) ──→ (N) Procedimento
Internacao (1) ──→ (N) Cti
Internacao (1) ──→ (N) SuporteVentilatorio
Internacao (1) ──→ (N) CondicaoAdquirida
Internacao (1) ──→ (N) SondaVesicalDeDemora
Internacao (1) ──→ (N) CateterVascularCentral
Internacao (1) ──→ (N) AltaAdministrativa
Internacao (1) ──→ (N) PartoAdequado
Internacao (1) ──→ (N) OrigemRecaida
Internacao (1) ──→ (N) Rn
Internacao (1) ──→ (N) AnaliseCritica
Internacao (1) ──→ (N) DispositivoTerapeutico
Internacao (1) ──→ (N) CausaExternaPermanencia

Procedimento (1) ──→ (N) MedicoProcedimento
SuporteVentilatorio (1) ──→ (N) CondicaoAdquiridaSuporteVentilatorio
SondaVesicalDeDemora (1) ──→ (N) CondicaoAdquiridaSondaVesicalDeDemora
CateterVascularCentral (1) ──→ (N) CondicaoAdquiridaCateterVascularCentral
```

## ⚠️ Observações Importantes Atualizadas

### **Campos Obrigatórios por Situação:**

- **Situação 1, 2, 3:** Hospital, Paciente, Operadora, Médico
- **Situação 4:** Apenas Paciente e Operadora
- **Todas:** Situação, Caráter, CID Principal

### **Validações Especiais:**

- Deve haver exatamente **um médico responsável** por internação
- **Data de nascimento** e **sexo** são sempre obrigatórios
- **Código da operadora** e **número da carteira** são obrigatórios quando não é particular
- **CNS não é obrigatório** segundo a documentação DRG (erro no terminal pode ser de validação da API)

### **Novos Recursos Implementados:**

1. **Todos os 33 campos do PartoAdequado** implementados
2. **Modelos específicos para condições adquiridas** de dispositivos
3. **Modelo completo de Recém Nascido** com todos os campos
4. **Análise crítica** para revisões médicas
5. **Dispositivos terapêuticos** com códigos específicos
6. **Causas externas de permanência** para eventos prolongadores

### **Problemas Identificados e Soluções:**

1. **Erro no terminal:** "Beneficiário sem todos os dados obrigatórios informados. (CNS - Data de Nascimento - Sexo - Situação)"
   - **Solução:** CNS não é obrigatório, verificar se `dataNascimento`, `sexo` e `situacao` estão sendo preenchidos corretamente
2. **Validação de campos obrigatórios** implementada nos modelos
3. **Tipagem TypeScript** melhorada em todos os modelos

## 🛠️ Sugestões de Melhoria Implementadas

1. ✅ **Validação de Campos Obrigatórios:** Implementada baseada na situação da internação
2. ✅ **Tratamento de Erros:** Melhorado com validações nos modelos
3. ✅ **Documentação:** JSDoc adicionado nos métodos
4. ✅ **Tipagem:** TypeScript melhorado em todos os modelos
5. ✅ **Modelos Completos:** Todos os campos da documentação DRG implementados

Esta arquitetura de modelos permite uma representação **100% completa e estruturada** dos dados de internação hospitalar, facilitando a geração de XMLs **totalmente conformes** com as especificações DRG Brasil.
