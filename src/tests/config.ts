export interface TestConfig {
  // Configurações gerais
  saveToDatabase: boolean;
  sendToDRG: boolean;
  validateOnly: boolean;

  // Configurações de hospital
  hospitalCode: number;
  hospitalName: string;

  // Configurações de validação
  strictValidation: boolean;
  allowOptionalFields: boolean;

  // Configurações de relatório
  generateReport: boolean;
  saveReport: boolean;
  reportFormat: "text" | "json" | "both";

  // Configurações de limpeza
  autoCleanup: boolean;
  cleanupAfterHours: number;

  // Configurações de timeout
  requestTimeout: number;
  validationTimeout: number;
}

export const DEFAULT_TEST_CONFIG: TestConfig = {
  saveToDatabase: true,
  sendToDRG: false,
  validateOnly: false,
  hospitalCode: 1,
  hospitalName: "Hospital Teste",
  strictValidation: true,
  allowOptionalFields: true,
  generateReport: true,
  saveReport: true,
  reportFormat: "both",
  autoCleanup: true,
  cleanupAfterHours: 24,
  requestTimeout: 30000,
  validationTimeout: 5000,
};

export const TEST_SCENARIOS = {
  ADMISSIONAL: {
    BASIC: "Admissional Básica",
    COMPLETE: "Admissional Completa",
    EMERGENCY: "Admissional Emergência",
    NEWBORN: "Admissional Recém-nascido",
    READMISSION: "Admissional Reinternação",
    RELAPSE: "Admissional Recaída",
    PRIVATE: "Admissional Particular",
    VULNERABILITY: "Admissional Vulnerabilidade",
  },
  PRORROGACAO: {
    BASIC: "Prorrogação Básica",
    WITH_DISCHARGE: "Prorrogação com Alta",
    EMERGENCY: "Prorrogação Emergência",
    NEWBORN: "Prorrogação Recém-nascido",
    READMISSION: "Prorrogação Reinternação",
    RELAPSE: "Prorrogação Recaída",
    PRIVATE: "Prorrogação Particular",
    VULNERABILITY: "Prorrogação Vulnerabilidade",
  },
  SUPLEMENTAR: {
    BASIC: "Suplementar Básica",
    COMPLETE: "Suplementar Completa",
    EMERGENCY: "Suplementar Emergência",
    NEWBORN: "Suplementar Recém-nascido",
    READMISSION: "Suplementar Reinternação",
    RELAPSE: "Suplementar Recaída",
    PRIVATE: "Suplementar Particular",
    VULNERABILITY: "Suplementar Vulnerabilidade",
  },
};

export const VALIDATION_RULES = {
  REQUIRED_FIELDS: {
    ADMISSIONAL: [
      "NR_ATENDIMENTO",
      "ID_PACIENTE",
      "ID_INTERNACAO",
      "SITUACAO_INTERNACAO",
      "DT_ADMISSAO",
      "DT_ATENDIMENTO",
      "CODIGO_HOSPITAL",
      "CODIGO_OPERADORA",
    ],
    PRORROGACAO: [
      "NR_ATENDIMENTO",
      "ID_PACIENTE",
      "ID_INTERNACAO",
      "SITUACAO_INTERNACAO",
      "DT_ADMISSAO",
      "DT_ATENDIMENTO",
      "DT_PRORROGACAO",
      "MOTIVO_PRORROGACAO",
      "CODIGO_HOSPITAL",
      "CODIGO_OPERADORA",
    ],
    SUPLEMENTAR: [
      "NR_ATENDIMENTO",
      "ID_PACIENTE",
      "ID_INTERNACAO",
      "SITUACAO_INTERNACAO",
      "DT_ADMISSAO",
      "DT_ATENDIMENTO",
      "DT_ALTA",
      "MOTIVO_ALTA",
      "CODIGO_HOSPITAL",
      "CODIGO_OPERADORA",
    ],
  },
  OPTIONAL_FIELDS: {
    ADMISSIONAL: [
      "DT_ALTA",
      "DT_PRORROGACAO",
      "MOTIVO_ALTA",
      "MOTIVO_PRORROGACAO",
      "OBSERVACOES",
      "CID_PRINCIPAL",
      "CID_SECUNDARIO",
      "PROCEDIMENTOS",
    ],
    PRORROGACAO: [
      "DT_ALTA",
      "MOTIVO_ALTA",
      "OBSERVACOES",
      "CID_PRINCIPAL",
      "CID_SECUNDARIO",
      "PROCEDIMENTOS",
      "MEDICAMENTOS",
    ],
    SUPLEMENTAR: [
      "DT_PRORROGACAO",
      "MOTIVO_PRORROGACAO",
      "OBSERVACOES",
      "CID_PRINCIPAL",
      "CID_SECUNDARIO",
      "PROCEDIMENTOS",
      "MEDICAMENTOS",
      "RESUMO_ALTA",
    ],
  },
};

export const TEST_DATA_PATTERNS = {
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CNS: /^\d{15}$/,
  CEP: /^\d{5}-\d{3}$/,
  CID: /^[A-Z]\d{2}(\.\d)?$/,
  UF: /^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/,
  DATE: /^\d{4}-\d{2}-\d{2}$/,
  SEX: /^[MF]$/,
};

export const ERROR_MESSAGES = {
  INVALID_CPF: "CPF inválido",
  INVALID_CNS: "CNS inválido",
  INVALID_CEP: "CEP inválido",
  INVALID_CID: "CID inválido",
  INVALID_UF: "UF inválido",
  INVALID_DATE: "Data inválida",
  INVALID_SEX: "Sexo deve ser M ou F",
  MISSING_REQUIRED_FIELD: "Campo obrigatório ausente",
  MISSING_OPTIONAL_FIELD: "Campo opcional ausente",
  INVALID_DATE_RANGE: "Intervalo de datas inválido",
  INVALID_SITUATION: "Situação inválida",
  INVALID_SCENARIO: "Cenário inválido",
};

export const SUCCESS_MESSAGES = {
  TEST_EXECUTED: "Teste executado com sucesso",
  VALIDATION_PASSED: "Validação aprovada",
  XML_GENERATED: "XML gerado com sucesso",
  DRG_SENT: "Enviado para DRG com sucesso",
  REPORT_GENERATED: "Relatório gerado com sucesso",
  DATA_SAVED: "Dados salvos no banco com sucesso",
  CLEANUP_COMPLETED: "Limpeza concluída com sucesso",
};

export function getConfigForSituacao(situacao: number): Partial<TestConfig> {
  const baseConfig = { ...DEFAULT_TEST_CONFIG };

  switch (situacao) {
    case 1: // Admissional
      return {
        ...baseConfig,
        hospitalCode: 1,
        hospitalName: "Hospital Admissional",
      };
    case 2: // Prorrogação
      return {
        ...baseConfig,
        hospitalCode: 2,
        hospitalName: "Hospital Prorrogação",
      };
    case 3: // Suplementar
      return {
        ...baseConfig,
        hospitalCode: 3,
        hospitalName: "Hospital Suplementar",
      };
    default:
      return baseConfig;
  }
}

export function getConfigForScenario(
  situacao: number,
  scenario: number
): Partial<TestConfig> {
  const baseConfig = getConfigForSituacao(situacao);

  // Configurações específicas por cenário
  const scenarioConfigs = {
    1: {
      // Básico
      strictValidation: true,
      allowOptionalFields: false,
    },
    2: {
      // Completo
      strictValidation: false,
      allowOptionalFields: true,
    },
    3: {
      // Emergência
      requestTimeout: 10000,
      strictValidation: true,
    },
    4: {
      // Recém-nascido
      strictValidation: true,
      allowOptionalFields: true,
    },
    5: {
      // Reinternação
      strictValidation: true,
      allowOptionalFields: true,
    },
    6: {
      // Recaída
      strictValidation: true,
      allowOptionalFields: true,
    },
    7: {
      // Particular
      strictValidation: false,
      allowOptionalFields: true,
    },
    8: {
      // Vulnerabilidade
      strictValidation: true,
      allowOptionalFields: true,
    },
  };

  return {
    ...baseConfig,
    ...(scenarioConfigs[scenario] || {}),
  };
}

export function mergeConfigs(...configs: Partial<TestConfig>[]): TestConfig {
  const result = { ...DEFAULT_TEST_CONFIG };

  for (const config of configs) {
    Object.assign(result, config);
  }

  return result;
}
