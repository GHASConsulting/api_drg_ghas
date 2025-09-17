# DRG API - Implementação de Campos Flexíveis e Configuráveis

Este documento apresenta estratégias para implementar uma lógica flexível na API DRG, permitindo controlar dinamicamente quais campos obrigatórios e opcionais devem ser enviados através de variáveis de configuração.

## 📋 Análise da Estrutura Atual

### Estrutura Atual da API

```
src/
├── models/
│   ├── internacao.ts          # Modelo principal da internação
│   ├── hospital.ts            # Dados do hospital
│   ├── paciente.ts            # Dados do beneficiário
│   └── ...                    # Outros modelos
├── modules/createXml/
│   ├── admissionSend.ts       # Função principal de envio
│   ├── enviaParcelado.ts      # Envio em lotes
│   └── helpers/
│       ├── buildInternacao.ts # Construtor da internação
│       └── build*.ts          # Construtores específicos
```

### Problemas Identificados

1. **Campos fixos**: Todos os campos são sempre enviados
2. **Sem flexibilidade**: Não há controle sobre quais dados incluir
3. **Performance**: Envio de dados desnecessários
4. **Manutenção**: Dificuldade para adaptar a diferentes cenários

## 🎯 Estratégias de Implementação

### 1. Sistema de Configuração por Variáveis de Ambiente

#### 1.1 Arquivo de Configuração (`config/drgFields.ts`)

```typescript
export interface DRGFieldConfig {
  // Configurações por situação da internação
  situacoes: {
    [situacao: number]: {
      camposObrigatorios: string[];
      camposOpcionais: string[];
      secoes: {
        [secao: string]: {
          habilitada: boolean;
          camposObrigatorios: string[];
          camposOpcionais: string[];
        };
      };
    };
  };

  // Configurações globais
  global: {
    incluirCamposVazios: boolean;
    validarCamposObrigatorios: boolean;
    logCamposEnviados: boolean;
  };
}

export const DRG_CONFIG: DRGFieldConfig = {
  situacoes: {
    1: {
      // Admissional
      camposObrigatorios: [
        "situacao",
        "caraterInternacao",
        "codigoCidPrincipal",
        "dataInternacao",
        "numeroAtendimento",
        "numeroAutorizacao",
      ],
      camposOpcionais: [
        "procedencia",
        "leito",
        "numeroOperadora",
        "numeroRegistro",
        "dataAutorizacao",
        "internadoOutrasVezes",
        "reinternacao",
        "recaida",
      ],
      secoes: {
        hospital: {
          habilitada: true,
          camposObrigatorios: [
            "codigo",
            "nome",
            "cnes",
            "porte",
            "complexidade",
          ],
          camposOpcionais: ["complementoLogradouro"],
        },
        beneficiario: {
          habilitada: true,
          camposObrigatorios: ["dataNascimento", "sexo"],
          camposOpcionais: ["cpf", "recemNascido", "particular"],
        },
        operadora: {
          habilitada: true,
          camposObrigatorios: ["codigo", "numeroCarteira"],
          camposOpcionais: ["plano", "dataValidade"],
        },
        medico: {
          habilitada: true,
          camposObrigatorios: [
            "nome",
            "uf",
            "crm",
            "especialidade",
            "medicoResponsavel",
          ],
          camposOpcionais: ["ddd", "telefone", "email", "tipoAtuacao"],
        },
        cidSecundario: {
          habilitada: process.env.INCLUIR_CID_SECUNDARIO === "true",
          camposObrigatorios: [],
          camposOpcionais: ["codigoCidSecundario"],
        },
        procedimento: {
          habilitada: process.env.INCLUIR_PROCEDIMENTOS === "true",
          camposObrigatorios: [],
          camposOpcionais: [
            "codigoProcedimento",
            "dataAutorizacao",
            "dataExecucao",
          ],
        },
        cti: {
          habilitada: process.env.INCLUIR_CTI === "true",
          camposObrigatorios: [],
          camposOpcionais: ["dataInicial", "dataFinal", "codigoCidPrincipal"],
        },
        suporteVentilatorio: {
          habilitada: process.env.INCLUIR_SUPORTE_VENTILATORIO === "true",
          camposObrigatorios: [],
          camposOpcionais: ["tipo", "dataInicial", "dataFinal"],
        },
        condicaoAdquirida: {
          habilitada: process.env.INCLUIR_CONDICOES_ADQUIRIDAS === "true",
          camposObrigatorios: [],
          camposOpcionais: ["codigoCondicaoAdquirida", "dataOcorrencia"],
        },
        partoAdequado: {
          habilitada: process.env.INCLUIR_PARTO_ADEQUADO === "true",
          camposObrigatorios: [],
          camposOpcionais: [
            "antecedentesObstetricos",
            "numeroCesareasAnteriores",
          ],
        },
      },
    },
    2: {
      // Prorrogação - similar ao admissional
      // ... configuração similar
    },
    3: {
      // Alta
      camposObrigatorios: [
        "situacao",
        "caraterInternacao",
        "codigoCidPrincipal",
        "dataInternacao",
        "dataAlta",
        "condicaoAlta",
        "numeroAtendimento",
        "numeroAutorizacao",
      ],
      // ... resto da configuração
    },
    4: {
      // Autorização
      camposObrigatorios: [
        "situacao",
        "caraterInternacao",
        "codigoCidPrincipal",
      ],
      camposOpcionais: ["numeroAtendimento", "numeroAutorizacao", "recaida"],
      secoes: {
        beneficiario: {
          habilitada: true,
          camposObrigatorios: ["dataNascimento", "sexo"],
          camposOpcionais: ["cpf", "recemNascido", "particular"],
        },
        operadora: {
          habilitada: true,
          camposObrigatorios: ["codigo", "numeroCarteira"],
          camposOpcionais: ["plano", "dataValidade"],
        },
        // Outras seções desabilitadas para autorização
        hospital: {
          habilitada: false,
          camposObrigatorios: [],
          camposOpcionais: [],
        },
        medico: {
          habilitada: false,
          camposObrigatorios: [],
          camposOpcionais: [],
        },
        cidSecundario: {
          habilitada: false,
          camposObrigatorios: [],
          camposOpcionais: [],
        },
        procedimento: {
          habilitada: false,
          camposObrigatorios: [],
          camposOpcionais: [],
        },
        cti: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
        suporteVentilatorio: {
          habilitada: false,
          camposObrigatorios: [],
          camposOpcionais: [],
        },
        condicaoAdquirida: {
          habilitada: false,
          camposObrigatorios: [],
          camposOpcionais: [],
        },
        partoAdequado: {
          habilitada: false,
          camposObrigatorios: [],
          camposOpcionais: [],
        },
      },
    },
  },
  global: {
    incluirCamposVazios: process.env.INCLUIR_CAMPOS_VAZIOS === "true",
    validarCamposObrigatorios:
      process.env.VALIDAR_CAMPOS_OBRIGATORIOS === "true",
    logCamposEnviados: process.env.LOG_CAMPOS_ENVIADOS === "true",
  },
};
```

#### 1.2 Variáveis de Ambiente (`.env`)

```bash
# Configurações de seções opcionais
INCLUIR_CID_SECUNDARIO=true
INCLUIR_PROCEDIMENTOS=true
INCLUIR_CTI=false
INCLUIR_SUPORTE_VENTILATORIO=true
INCLUIR_CONDICOES_ADQUIRIDAS=true
INCLUIR_PARTO_ADEQUADO=false
INCLUIR_SONDA_VESICAL=false
INCLUIR_CATETER_VASCULAR=false
INCLUIR_ALTA_ADMINISTRATIVA=true

# Configurações globais
INCLUIR_CAMPOS_VAZIOS=false
VALIDAR_CAMPOS_OBRIGATORIOS=true
LOG_CAMPOS_ENVIADOS=true

# Configurações específicas por hospital
HOSPITAL_1_INCLUIR_CTI=true
HOSPITAL_2_INCLUIR_CTI=false
HOSPITAL_3_INCLUIR_PROCEDIMENTOS=false
```

### 2. Sistema de Validação Dinâmica

#### 2.1 Classe Validador (`utils/drgValidator.ts`)

```typescript
import { DRG_CONFIG } from "../config/drgFields";

export class DRGValidator {
  private config: any;
  private situacao: number;
  private hospitalCode?: number;

  constructor(situacao: number, hospitalCode?: number) {
    this.situacao = situacao;
    this.hospitalCode = hospitalCode;
    this.config = this.getConfigForSituacao();
  }

  private getConfigForSituacao() {
    const baseConfig = DRG_CONFIG.situacoes[this.situacao];

    // Aplica configurações específicas do hospital se existirem
    if (this.hospitalCode) {
      return this.applyHospitalSpecificConfig(baseConfig);
    }

    return baseConfig;
  }

  private applyHospitalSpecificConfig(baseConfig: any) {
    const hospitalConfig = { ...baseConfig };

    // Verifica configurações específicas do hospital
    const hospitalEnvPrefix = `HOSPITAL_${this.hospitalCode}_`;

    Object.keys(process.env).forEach((key) => {
      if (key.startsWith(hospitalEnvPrefix)) {
        const sectionName = key.replace(hospitalEnvPrefix, "").toLowerCase();
        const value = process.env[key] === "true";

        if (hospitalConfig.secoes[sectionName]) {
          hospitalConfig.secoes[sectionName].habilitada = value;
        }
      }
    });

    return hospitalConfig;
  }

  public validateRequiredFields(data: any): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Valida campos obrigatórios da internação
    this.config.camposObrigatorios.forEach((campo: string) => {
      if (!data[campo] || data[campo] === "") {
        errors.push(`Campo obrigatório ausente: ${campo}`);
      }
    });

    // Valida seções obrigatórias
    Object.entries(this.config.secoes).forEach(
      ([secao, config]: [string, any]) => {
        if (config.habilitada) {
          config.camposObrigatorios.forEach((campo: string) => {
            if (
              !data[secao] ||
              !data[secao][campo] ||
              data[secao][campo] === ""
            ) {
              errors.push(
                `Campo obrigatório ausente na seção ${secao}: ${campo}`
              );
            }
          });
        }
      }
    );

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  public shouldIncludeSection(sectionName: string): boolean {
    return this.config.secoes[sectionName]?.habilitada || false;
  }

  public shouldIncludeField(sectionName: string, fieldName: string): boolean {
    const section = this.config.secoes[sectionName];
    if (!section || !section.habilitada) return false;

    return (
      section.camposObrigatorios.includes(fieldName) ||
      section.camposOpcionais.includes(fieldName)
    );
  }

  public getEnabledSections(): string[] {
    return Object.keys(this.config.secoes).filter(
      (section) => this.config.secoes[section].habilitada
    );
  }
}
```

### 3. Modificação do Builder de Internação

#### 3.1 Builder Flexível (`helpers/buildInternacaoFlexivel.ts`)

```typescript
import { DRGValidator } from '../../utils/drgValidator';
import { Internacao } from '../../models/internacao';

export async function buildInternacaoFlexivel(
  item: any,
  situacao: number,
  hospitalCode?: number
): Promise<Internacao> {
  const validator = new DRGValidator(situacao, hospitalCode);
  const internacao = new Internacao();

  // Campos básicos da internação
  internacao.setSituacao(item.SITUACAO_INTERNACAO);
  internacao.setCaraterInternacao(item.CARATER_INTERNACAO);
  internacao.setCodigoCidPrincipal(item.CD_CID_PRINCIPAL);

  // Campos obrigatórios baseados na situação
  if (validator.shouldIncludeField('internacao', 'dataInternacao')) {
    internacao.setDataInternacao(converterData(item.DT_INTERNACAO));
  }

  if (validator.shouldIncludeField('internacao', 'numeroAtendimento')) {
    internacao.setNumeroAtendimento(item.NR_ATENDIMENTO);
  }

  if (validator.shouldIncludeField('internacao', 'numeroAutorizacao')) {
    internacao.setNumeroAutorizacao(item.NR_AUTORIZACAO);
  }

  // Campos opcionais
  if (validator.shouldIncludeField('internacao', 'procedencia')) {
    internacao.setProcedencia(item.PROCEDENCIA);
  }

  if (validator.shouldIncludeField('internacao', 'leito')) {
    internacao.setLeito(item.DS_LEITO);
  }

  // Seções condicionais
  if (validator.shouldIncludeSection('hospital')) {
    const hospital = await buildHospital(item, validator);
    internacao.addHospital(hospital);
  }

  if (validator.shouldIncludeSection('beneficiario')) {
    const paciente = await buildPaciente(item, validator);
    internacao.addPaciente(paciente);
  }

  if (validator.shouldIncludeSection('operadora') && item.CD_OPERADORA) {
    const operadora = await buildOperadora(item, validator);
    internacao.addOpradora(operadora);
  }

  if (validator.shouldIncludeSection('medico')) {
    const medicos = await buildMedicos(item, validator);
    medicos.forEach(medico => internacao.addMedico(medico));
  }

  if (validator.shouldIncludeSection('cidSecundario')) {
    const cidsSecundarios = await buildCidsSecundarios(item, validator);
    cidsSecundarios.forEach(cid => internacao.addCidSecundario(cid));
  }

  if (validator.shouldIncludeSection('procedimento')) {
    const procedimentos = await buildProcedimentos(item, validator);
    procedimentos.forEach(proc => internacao.addProcedimento(proc));
  }

  if (validator.shouldIncludeSection('cti')) {
    const ctis = await buildCtis(item, validator);
    ctis.forEach(cti => internacao.addCti(cti));
  }

  if (validator.shouldIncludeSection('suporteVentilatorio')) {
    const suportes = await buildSuportesVentilatorios(item, validator);
    suportes.forEach(sup => internacao.addSuporteVentilatorio(sup));
  }

  if (validator.shouldIncludeSection('condicaoAdquirida')) {
    const condicoes = await buildCondicoesAdquiridas(item, validator);
    condicoes.forEach(cond => internacao.addCondicaoAdquirida(cond));
  }

  if (validator.shouldIncludeSection('partoAdequado')) {
    const partos = await buildPartosAdequados(item, validator);
    partos.forEach(parto => internacao.addPartoAdequado(parto));
  }

  // Log dos campos enviados se habilitado
  if (DRG_CONFIG.global.logCamposEnviados) {
    this.logCamposEnviados(internacao, validator);
  }

  return internacao;
}

private logCamposEnviados(internacao: Internacao, validator: DRGValidator) {
  console.log('=== CAMPOS ENVIADOS ===');
  console.log(`Situação: ${internacao.getSituacao()}`);
  console.log(`Seções habilitadas: ${validator.getEnabledSections().join(', ')}`);
  console.log('========================');
}
```

### 4. Modificação da Função de Envio

#### 4.1 Função de Envio Flexível (`admissionSendFlexivel.ts`)

```typescript
import { DRGValidator } from "../../utils/drgValidator";
import { buildInternacaoFlexivel } from "./helpers/buildInternacaoFlexivel";

export async function admissionFlexivel(
  dataAtendimentoFromDatabase: any[],
  hospitalCode?: number,
  situacao?: number
) {
  const TBL_ATENDIMENTO = process.env.TBL_ATENDIMENTO;
  let contaInternacao = 0;
  let contErro = 0;
  let contSucesso = 0;
  let contaInternacaoEnviada = 0;

  if (!hospitalCode && dataAtendimentoFromDatabase.length > 0) {
    hospitalCode = dataAtendimentoFromDatabase[0].CD_HOSPITAL;
  }

  for (const item of dataAtendimentoFromDatabase) {
    contaInternacao++;

    // Usa a situação do item ou a passada como parâmetro
    const situacaoInternacao = situacao || item.SITUACAO_INTERNACAO;

    try {
      // Validação prévia se habilitada
      if (DRG_CONFIG.global.validarCamposObrigatorios) {
        const validator = new DRGValidator(situacaoInternacao, hospitalCode);
        const validation = validator.validateRequiredFields(item);

        if (!validation.valid) {
          console.error(
            `Erro de validação para atendimento ${item.CD_DTI_ATENDIMENTO}:`,
            validation.errors
          );
          contErro++;
          continue;
        }
      }

      // Cria internação com configuração flexível
      const loteInternacao = new LoteInternacao();
      const internacao = await buildInternacaoFlexivel(
        item,
        situacaoInternacao,
        hospitalCode
      );
      loteInternacao.addInternacao(internacao);

      const xml = loteInternacao.generateXML();

      // Log do XML
      const logFileName = `atendimento_${item.CD_DTI_ATENDIMENTO}`;
      await writeXmlLog(xml, logFileName, hospitalCode);

      console.log(
        `Enviando atendimento ${item.CD_DTI_ATENDIMENTO} (situação: ${situacaoInternacao}) para hospital ${hospitalCode}`
      );

      // Envio e processamento da resposta
      const response = await makeRequest(xml, hospitalCode!);

      // ... resto do processamento igual ao original
    } catch (error) {
      console.error(
        `Erro ao processar atendimento ${item.CD_DTI_ATENDIMENTO}:`,
        error
      );
      contErro++;

      // ... tratamento de erro igual ao original
    }
  }

  // ... resto da função igual ao original
}
```

### 5. Sistema de Configuração Dinâmica

#### 5.1 API de Configuração (`routes/configRoutes.ts`)

```typescript
import express from "express";
import { DRG_CONFIG } from "../config/drgFields";

const router = express.Router();

// Endpoint para obter configuração atual
router.get("/config", (req, res) => {
  res.json(DRG_CONFIG);
});

// Endpoint para atualizar configuração
router.post("/config", (req, res) => {
  const { situacao, secao, habilitada } = req.body;

  if (DRG_CONFIG.situacoes[situacao]?.secoes[secao]) {
    DRG_CONFIG.situacoes[situacao].secoes[secao].habilitada = habilitada;
    res.json({ success: true, message: "Configuração atualizada" });
  } else {
    res.status(400).json({ success: false, message: "Configuração inválida" });
  }
});

// Endpoint para configurar hospital específico
router.post("/config/hospital/:hospitalCode", (req, res) => {
  const { hospitalCode } = req.params;
  const { secao, habilitada } = req.body;

  // Atualiza variável de ambiente específica do hospital
  process.env[`HOSPITAL_${hospitalCode}_${secao.toUpperCase()}`] =
    habilitada.toString();

  res.json({
    success: true,
    message: `Configuração do hospital ${hospitalCode} atualizada`,
  });
});

export default router;
```

## 🚀 Passo a Passo para Implementação

### Passo 1: Criar Sistema de Configuração

```bash
# 1. Criar arquivo de configuração
mkdir -p src/config
touch src/config/drgFields.ts

# 2. Criar validador
mkdir -p src/utils
touch src/utils/drgValidator.ts

# 3. Atualizar .env com novas variáveis
echo "INCLUIR_CID_SECUNDARIO=true" >> .env
echo "INCLUIR_PROCEDIMENTOS=true" >> .env
echo "INCLUIR_CTI=false" >> .env
```

### Passo 2: Modificar Builders Existentes

```bash
# 1. Criar versão flexível do builder
cp src/modules/createXml/helpers/buildInternacao.ts src/modules/createXml/helpers/buildInternacaoFlexivel.ts

# 2. Modificar cada builder específico
# Exemplo: buildHospital.ts
```

### Passo 3: Implementar Validação

```typescript
// Em cada builder específico, adicionar validação
export async function buildHospital(
  item: any,
  validator?: DRGValidator
): Promise<Hospital> {
  const hospital = new Hospital();

  // Campos obrigatórios
  if (!validator || validator.shouldIncludeField("hospital", "codigo")) {
    hospital.setCodigo(item.CD_HOSPITAL);
  }

  // Campos opcionais
  if (
    !validator ||
    validator.shouldIncludeField("hospital", "complementoLogradouro")
  ) {
    hospital.setComplementoLogradouro(item.COMPLEMENTO_LOGRADOURO);
  }

  return hospital;
}
```

### Passo 4: Atualizar Função Principal

```typescript
// Modificar admissionSend.ts para usar a versão flexível
import { buildInternacaoFlexivel } from "./helpers/buildInternacaoFlexivel";

export async function admission(item: any, hospitalCode?: number) {
  // ... código existente ...

  const internacao = await buildInternacaoFlexivel(
    item,
    item.SITUACAO_INTERNACAO,
    hospitalCode
  );

  // ... resto do código ...
}
```

### Passo 5: Adicionar Logs e Monitoramento

```typescript
// Adicionar logs detalhados
if (DRG_CONFIG.global.logCamposEnviados) {
  console.log(`Enviando para hospital ${hospitalCode}:`);
  console.log(`- Situação: ${situacao}`);
  console.log(
    `- Seções habilitadas: ${validator.getEnabledSections().join(", ")}`
  );
  console.log(
    `- Campos obrigatórios: ${validator.config.camposObrigatorios.join(", ")}`
  );
}
```

## 🎛️ Exemplos de Uso

### Exemplo 1: Envio Mínimo (Autorização)

```bash
# Configurar para envio mínimo
export SITUACAO_INTERNACAO=4
export INCLUIR_CID_SECUNDARIO=false
export INCLUIR_PROCEDIMENTOS=false
export INCLUIR_CTI=false
export INCLUIR_SUPORTE_VENTILATORIO=false

# Executar envio
npm run send:admission
```

### Exemplo 2: Envio Completo (Alta)

```bash
# Configurar para envio completo
export SITUACAO_INTERNACAO=3
export INCLUIR_CID_SECUNDARIO=true
export INCLUIR_PROCEDIMENTOS=true
export INCLUIR_CTI=true
export INCLUIR_SUPORTE_VENTILATORIO=true
export INCLUIR_CONDICOES_ADQUIRIDAS=true

# Executar envio
npm run send:admission
```

### Exemplo 3: Configuração por Hospital

```bash
# Hospital 1 - Envio completo
export HOSPITAL_1_INCLUIR_CTI=true
export HOSPITAL_1_INCLUIR_PROCEDIMENTOS=true

# Hospital 2 - Envio mínimo
export HOSPITAL_2_INCLUIR_CTI=false
export HOSPITAL_2_INCLUIR_PROCEDIMENTOS=false

# Executar envio
npm run send:admission
```

## 📊 Benefícios da Implementação

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
- Logs detalhados para debugging

### 4. **Conformidade**

- Validação automática de campos obrigatórios
- Conformidade com especificações DRG
- Tratamento de erros melhorado

## 🔧 Próximos Passos

1. **Implementar sistema de configuração**
2. **Modificar builders existentes**
3. **Adicionar validação dinâmica**
4. **Criar testes unitários**
5. **Implementar API de configuração**
6. **Documentar configurações por hospital**
7. **Criar dashboard de monitoramento**

Esta implementação permitirá que a API DRG seja altamente configurável e adaptável a diferentes cenários, mantendo a conformidade com as especificações oficiais enquanto oferece flexibilidade operacional.
