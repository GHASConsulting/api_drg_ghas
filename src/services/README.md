# DRG API - Sistema de Campos Flexíveis e Configuráveis

Este diretório contém o sistema completo de configuração flexível para a API DRG, permitindo controlar dinamicamente quais campos obrigatórios e opcionais devem ser enviados através de variáveis de ambiente.

## 📁 Estrutura do Sistema

```
src/services/
├── interface.ts              # Ponto de entrada principal - re-exporta tudo
├── types/                   # Interfaces e tipos TypeScript
│   ├── enums.ts            # Enums centralizados (SituacaoInternacao, SecaoDRG, etc.)
│   ├── base.ts             # Interfaces base reutilizáveis
│   └── situacoes.ts        # Interfaces específicas por situação
├── config/                  # Configuração dinâmica
│   └── drg-config.ts       # Configuração DRG e resolução de variáveis de ambiente
├── utils/                   # Utilitários e validação
│   ├── validation.ts       # Sistema de validação e DRGValidator
│   └── logger.ts          # Sistema de logs estruturado
├── tests/                   # Testes e demonstrações
│   ├── test-config.ts      # Configuração centralizada dos testes
│   ├── simple-demo.ts      # Demonstração funcional do sistema
│   └── README.md          # Documentação dos testes
├── README.md               # Este arquivo
├── README-LOGS.md         # Documentação do sistema de logs
└── demo-logs.ts           # Demonstração do sistema de logs
```

## 🎯 Visão Geral

O sistema permite:
- **Configuração dinâmica** por situação da internação (1, 2, 3, 4)
- **Controle granular** de seções através de variáveis de ambiente
- **Configuração específica** por hospital
- **Type safety** completo com TypeScript
- **Validação automática** de campos obrigatórios
- **Sistema de logs estruturado** para observabilidade completa
- **Testes funcionais** para validação do sistema

## 🔧 Configuração

### Variáveis de Ambiente

#### Configurações Globais
```bash
# Configurações de seções opcionais
INCLUIR_CID_SECUNDARIO=true
INCLUIR_PROCEDIMENTOS=true
INCLUIR_MEDICO_PROCEDIMENTO=true
INCLUIR_CTI=false
INCLUIR_RN=false
INCLUIR_CONDICOES_ADQUIRIDAS=true
INCLUIR_ALTA_ADMINISTRATIVA=true
INCLUIR_ANALISE_CRITICA=false
INCLUIR_SUPORTE_VENTILATORIO=true
INCLUIR_CONDICAO_ADQUIRIDA_SUPORTE=true
INCLUIR_SONDA_VESICAL=false
INCLUIR_CONDICAO_ADQUIRIDA_SONDA=false
INCLUIR_CATETER_VASCULAR=false
INCLUIR_CONDICAO_ADQUIRIDA_CATETER=false
INCLUIR_DISPOSITIVO_TERAPEUTICO=false
INCLUIR_ORIGEM_RECAIDA=false
INCLUIR_PARTO_ADEQUADO=false
INCLUIR_CAUSA_EXTERNA=false

# Configurações globais
INCLUIR_CAMPOS_VAZIOS=false
VALIDAR_CAMPOS_OBRIGATORIOS=true
LOG_CAMPOS_ENVIADOS=true
```

#### Configurações Específicas por Hospital
```bash
# Hospital 1 - Envio completo
HOSPITAL_1_INCLUIR_CTI=true
HOSPITAL_1_INCLUIR_PROCEDIMENTOS=true
HOSPITAL_1_INCLUIR_SUPORTE_VENTILATORIO=true

# Hospital 2 - Envio mínimo
HOSPITAL_2_INCLUIR_CTI=false
HOSPITAL_2_INCLUIR_PROCEDIMENTOS=false
HOSPITAL_2_INCLUIR_SUPORTE_VENTILATORIO=false

# Hospital 3 - Configuração específica
HOSPITAL_3_INCLUIR_PROCEDIMENTOS=false
HOSPITAL_3_INCLUIR_PARTO_ADEQUADO=true
```

## 📋 Situações de Internação

### Situação 1 - Admissional
**Campos obrigatórios**: situacao, caraterInternacao, codigoCidPrincipal, dataInternacao, numeroAtendimento, numeroAutorizacao

**Seções disponíveis**:
- ✅ hospital, beneficiario, operadora, medico (sempre habilitadas)
- 🔧 cidSecundario, procedimento, cti, suporteVentilatorio, condicaoAdquirida, partoAdequado (configuráveis)

### Situação 2 - Transferência
**Campos obrigatórios**: situacao, caraterInternacao, codigoCidPrincipal, dataInternacao, numeroAtendimento, numeroAutorizacao

**Seções adicionais**:
- 🔧 sondaVesicalDeDemora, cateterVascularCentral, altaAdministrativa

### Situação 3 - Alta
**Campos obrigatórios**: situacao, caraterInternacao, codigoCidPrincipal, dataInternacao, dataAlta, condicaoAlta, numeroAtendimento, numeroAutorizacao

**Seções expandidas**:
- 🏥 hospital (endereço completo obrigatório)
- 👤 beneficiario (dados de endereço opcionais)
- 🔧 Todas as seções opcionais disponíveis

### Situação 4 - Autorização
**Campos obrigatórios**: situacao, caraterInternacao, codigoCidPrincipal

**Seções mínimas**:
- ✅ beneficiario, operadora (apenas estas habilitadas)

## 🚀 Como Usar

### 1. Importar do Ponto de Entrada Principal

```typescript
import { 
  // Enums
  SituacaoInternacao, 
  SecaoDRG,
  
  // Interfaces
  CamposInternacaoSituacao1,
  CamposHospitalSituacao1,
  
  // Configuração
  DRG_CONFIG,
  
  // Funções de conveniência
  createDRGValidator,
  isSecaoHabilitada,
  getConfigSituacao,
  getSecoesHabilitadas,
  validateDRGData,
  
  // Validador
  DRGValidator
} from './interface';
```

### 2. Usar Funções de Conveniência (Recomendado)

```typescript
// Criar validador para situação 1, hospital 123
const validator = createDRGValidator(SituacaoInternacao.ADMISSIONAL, 123);

// Verificar se uma seção está habilitada
const ctiHabilitado = isSecaoHabilitada(SecaoDRG.CTI, SituacaoInternacao.ADMISSIONAL, 123);

// Obter configuração de uma situação
const configSituacao1 = getConfigSituacao(SituacaoInternacao.ADMISSIONAL);

// Obter todas as seções habilitadas
const secoesHabilitadas = getSecoesHabilitadas(SituacaoInternacao.ADMISSIONAL, 123);

// Validar dados completos
const dadosTeste = { situacao: "1", caraterInternacao: "E", /* ... */ };
const resultado = validateDRGData(dadosTeste, SituacaoInternacao.ADMISSIONAL, 123);
```

### 3. Usar Validador Diretamente

```typescript
// Criar validador
const validator = new DRGValidator(SituacaoInternacao.ADMISSIONAL, 123);

// Verificar se deve incluir seção
if (validator.shouldIncludeSection(SecaoDRG.CTI)) {
  // Incluir seção CTI no XML
  const ctis = await buildCtis(item, validator);
  ctis.forEach(cti => internacao.addCti(cti));
}

// Verificar se deve incluir campo
if (validator.shouldIncludeField('hospital', 'complementoLogradouro')) {
  // Incluir campo opcional
  hospital.setComplementoLogradouro(item.COMPLEMENTO_LOGRADOURO);
}

// Validar campos obrigatórios
const resultado = validator.validateRequiredFields(dadosInternacao);
if (!resultado.valid) {
  console.error('Erros de validação:', resultado.errors);
}
```

### 4. Usar Interfaces Type-Safe

```typescript
// Dados da internação (Situação 1)
const dadosInternacao: CamposInternacaoSituacao1 = {
  situacao: SituacaoInternacao.ADMISSIONAL,
  caraterInternacao: CaraterInternacao.ELETIVO,
  codigoCidPrincipal: "A41.9",
  dataInternacao: "2024-01-15",
  numeroAtendimento: "12345",
  numeroAutorizacao: "67890",
  // Campos opcionais podem ser omitidos
  leito: "101A"
};

// Dados do hospital (Situação 1)
const dadosHospital: CamposHospitalSituacao1 = {
  codigo: "123",
  nome: "Hospital Exemplo",
  cnes: "1234567",
  porte: "3",
  complexidade: "Alta",
  complementoLogradouro: "Sala 101"
};
```

### 5. Sistema de Logs

```typescript
import { drgLogger, LogLevel } from './utils/logger';

// Configurar logger
drgLogger.updateConfig({
  enabled: true,
  level: LogLevel.DEBUG,
  includeTimestamp: true,
  includeContext: true
});

// Usar logger
drgLogger.debug('Iniciando validação', {
  situacao: SituacaoInternacao.ADMISSIONAL,
  hospitalCode: 123,
  validator: 'DRGValidator'
});

// Ver histórico de logs
const logs = drgLogger.getLogHistory();
console.log(`Total de logs: ${logs.length}`);
```

## 🔍 Mapeamento de Variáveis de Ambiente

| Seção | Variável de Ambiente | Descrição |
|-------|---------------------|-----------|
| cidSecundario | `INCLUIR_CID_SECUNDARIO` | CIDs secundários |
| procedimento | `INCLUIR_PROCEDIMENTOS` | Procedimentos realizados |
| medicoProcedimento | `INCLUIR_MEDICO_PROCEDIMENTO` | Médicos de procedimentos |
| cti | `INCLUIR_CTI` | Dados de UTI/CTI |
| rn | `INCLUIR_RN` | Dados de recém-nascido |
| condicaoAdquirida | `INCLUIR_CONDICOES_ADQUIRIDAS` | Condições adquiridas |
| altaAdministrativa | `INCLUIR_ALTA_ADMINISTRATIVA` | Alta administrativa |
| analiseCritica | `INCLUIR_ANALISE_CRITICA` | Análise crítica |
| suporteVentilatorio | `INCLUIR_SUPORTE_VENTILATORIO` | Suporte ventilatório |
| sondaVesicalDeDemora | `INCLUIR_SONDA_VESICAL` | Sonda vesical |
| cateterVascularCentral | `INCLUIR_CATETER_VASCULAR` | Cateter vascular |
| dispositivoTerapeutico | `INCLUIR_DISPOSITIVO_TERAPEUTICO` | Dispositivos terapêuticos |
| origemRecaida | `INCLUIR_ORIGEM_RECAIDA` | Origem de recaída |
| partoAdequado | `INCLUIR_PARTO_ADEQUADO` | Parto adequado |
| causaExternaPermanencia | `INCLUIR_CAUSA_EXTERNA` | Causa externa |

## ⚡ Precedência de Configuração

1. **Hospital específico**: `HOSPITAL_1_INCLUIR_CTI=true`
2. **Configuração global**: `INCLUIR_CTI=true`
3. **Valor padrão**: `false`

## 🎛️ Exemplos de Configuração

### Envio Mínimo (Autorização)
```bash
export SITUACAO_INTERNACAO=4
export INCLUIR_CID_SECUNDARIO=false
export INCLUIR_PROCEDIMENTOS=false
export INCLUIR_CTI=false
export INCLUIR_SUPORTE_VENTILATORIO=false
```

### Envio Completo (Alta)
```bash
export SITUACAO_INTERNACAO=3
export INCLUIR_CID_SECUNDARIO=true
export INCLUIR_PROCEDIMENTOS=true
export INCLUIR_CTI=true
export INCLUIR_SUPORTE_VENTILATORIO=true
export INCLUIR_CONDICOES_ADQUIRIDAS=true
```

### Configuração por Hospital
```bash
# Hospital 1 - Envio completo
export HOSPITAL_1_INCLUIR_CTI=true
export HOSPITAL_1_INCLUIR_PROCEDIMENTOS=true

# Hospital 2 - Envio mínimo
export HOSPITAL_2_INCLUIR_CTI=false
export HOSPITAL_2_INCLUIR_PROCEDIMENTOS=false
```

## 🧪 Testando o Sistema

### Executar Demonstração Completa

```bash
# Navegar para o diretório de testes
cd src/services/tests

# Executar demonstração funcional
npx ts-node simple-demo.ts
```

### Executar Demonstração de Logs

```bash
# Navegar para o diretório principal
cd src/services

# Executar demonstração de logs
npx ts-node demo-logs.ts
```

### Configurar Ambiente para Testes

```bash
# Configuração para testes
export LOG_CAMPOS_ENVIADOS=true
export LOG_LEVEL=debug
export INCLUIR_CID_SECUNDARIO=true
export INCLUIR_PROCEDIMENTO=false
export HOSPITAL_123_INCLUIR_CID_SECUNDARIO=false
```

## 🔧 Interfaces e Tipos Disponíveis

### Enums (`types/enums.ts`)
- `SituacaoInternacao` - Situações de internação (1, 2, 3, 4)
- `SecaoDRG` - Seções do DRG (hospital, cidSecundario, etc.)
- `CaraterInternacao` - Caráter da internação (Eletivo, Urgência, etc.)
- `CondicaoAlta` - Condições de alta
- `Sexo` - Sexo do paciente
- `Procedencia` - Procedência do paciente
- `TipoLeito` - Tipos de leito

### Interfaces Base (`types/base.ts`)
- `CamposInternacaoBase` - Campos básicos comuns
- `CamposInternacaoOpcionais` - Campos opcionais comuns
- `CamposInternacaoComData` - Campos com data de internação
- `CamposInternacaoAlta` - Campos específicos de alta
- `CamposHospitalBase` - Campos básicos de hospital
- `CamposHospitalCompleto` - Campos expandidos de hospital
- `CamposBeneficiarioBase` - Campos básicos de beneficiário
- `CamposBeneficiarioCompleto` - Campos expandidos de beneficiário
- `CamposOperadoraBase` - Campos de operadora
- `CamposMedicoBase` - Campos de médico
- `CamposDispositivoBase` - Campos de dispositivos médicos
- `CamposCondicaoAdquiridaBase` - Campos de condições adquiridas

### Interfaces por Situação (`types/situacoes.ts`)
- `CamposInternacaoSituacao1` - Situação 1 (Admissional)
- `CamposInternacaoSituacao2` - Situação 2 (Transferência)
- `CamposInternacaoSituacao3` - Situação 3 (Alta)
- `CamposInternacaoSituacao4` - Situação 4 (Autorização)

### Interfaces de Configuração (`types/base.ts`)
- `DRGFieldConfig` - Configuração estática
- `DRGFieldConfigDinamica` - Configuração com variáveis de ambiente
- `ConfigResolvida` - Configuração após resolução
- `ResultadoValidacao` - Resultado de validação
- `IDRGValidator` - Interface do validador

### Sistema de Logs (`utils/logger.ts`)
- `DRGLogger` - Logger principal com níveis configuráveis
- `LogLevel` - Níveis de log (DEBUG, INFO, WARN, ERROR)
- `LogContext` - Contexto estruturado dos logs

## 📊 Benefícios

### 1. **Flexibilidade**
- Controle granular sobre quais dados enviar
- Configuração por situação da internação
- Configuração específica por hospital

### 2. **Performance**
- Redução do tamanho dos XMLs
- Menos dados trafegando na rede
- Processamento mais rápido

### 3. **Manutenibilidade**
- Configuração centralizada
- Fácil adaptação a novos requisitos
- Type safety completo

### 4. **Conformidade**
- Validação automática de campos obrigatórios
- Conformidade com especificações DRG
- Tratamento de erros melhorado

### 5. **Observabilidade**
- Sistema de logs estruturado e configurável
- Visibilidade completa sobre o funcionamento
- Debugging facilitado com contexto rico

## 🚨 Importante

- **Sempre use as interfaces TypeScript** para garantir type safety
- **Configure as variáveis de ambiente** antes de usar o sistema
- **Teste diferentes configurações** para validar o comportamento
- **Monitore os logs** quando `LOG_CAMPOS_ENVIADOS=true`

## 🔄 Status do Projeto

### ✅ **Implementado e Funcionando**
1. **Sistema Modular Completo** - Estrutura organizada em módulos especializados
2. **Sistema de Logs Estruturado** - Ver [README-LOGS.md](./README-LOGS.md)
3. **Testes Funcionais** - Demonstração completa do sistema funcionando
4. **Validação Dinâmica** - Sistema completo de validação com DRGValidator
5. **Configuração Flexível** - Controle granular via variáveis de ambiente
6. **Type Safety Completo** - Interfaces TypeScript para todas as situações

### 🚀 **Próximos Passos Sugeridos**
1. **Builders Flexíveis** - Criar builders para cada seção DRG
2. **API de Configuração** - Implementar API REST para configuração dinâmica
3. **Documentação de API** - Criar documentação completa da API
4. **Integração com XML** - Conectar com sistema de geração de XML
5. **Métricas e Monitoramento** - Implementar dashboards de uso

---

