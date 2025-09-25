import { TestData } from "./testDataGenerator";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number;
}

export class TestValidator {
  private requiredFields: { [key: number]: string[] } = {
    1: [
      // Admissional
      "nr_atendimento",
      "id_atendimento",
      "situacao_internacao",
      "dt_internacao",
      "cd_hospital",
      "cd_operadora",
    ],
    2: [
      // Prorrogação
      "nr_atendimento",
      "id_atendimento",
      "situacao_internacao",
      "dt_internacao",
      "cd_hospital",
      "cd_operadora",
    ],
    3: [
      // Suplementar
      "nr_atendimento",
      "id_atendimento",
      "situacao_internacao",
      "dt_internacao",
      "dt_alta",
      "condicao_alta",
      "cd_hospital",
      "cd_operadora",
    ],
  };

  private optionalFields: { [key: number]: string[] } = {
    1: [
      // Admissional
      "dt_alta",
      "condicao_alta",
      "cd_cid_principal",
      "nota",
    ],
    2: [
      // Prorrogação
      "dt_alta",
      "condicao_alta",
      "cd_cid_principal",
      "nota",
    ],
    3: [
      // Suplementar
      "cd_cid_principal",
      "nota",
    ],
  };

  validateTestData(testData: TestData): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    let score = 100;

    // Validação de campos obrigatórios
    const requiredFields = this.requiredFields[testData.situacao] || [];
    for (const field of requiredFields) {
      // Para pacientes particulares, cd_operadora não é obrigatório
      if (field === "cd_operadora" && testData.dados.particular === "S") {
        continue;
      }

      if (!testData.dados[field] || testData.dados[field] === "") {
        errors.push(`Campo obrigatório ausente: ${field}`);
        score -= 10;
      }
    }

    // Validação de campos opcionais
    const optionalFields = this.optionalFields[testData.situacao] || [];
    for (const field of optionalFields) {
      if (!testData.dados[field] || testData.dados[field] === "") {
        warnings.push(`Campo opcional ausente: ${field}`);
        score -= 2;
      }
    }

    // Validações específicas por situação
    this.validateSpecificFields(testData, errors, warnings, score);

    // Validações de formato
    this.validateFormats(testData, errors, warnings, score);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, score),
    };
  }

  private validateSpecificFields(
    testData: TestData,
    errors: string[],
    warnings: string[],
    score: number
  ): void {
    const { situacao, dados } = testData;

    switch (situacao) {
      case 1: // Admissional
        this.validateAdmissional(dados, errors, warnings, score);
        break;
      case 2: // Prorrogação
        this.validateProrrogacao(dados, errors, warnings, score);
        break;
      case 3: // Suplementar
        this.validateSuplementar(dados, errors, warnings, score);
        break;
    }
  }

  private validateAdmissional(
    dados: any,
    errors: string[],
    warnings: string[],
    score: number
  ): void {
    // Validações específicas para Admissional
    if (dados.dt_internacao && dados.dt_alta) {
      const dtInternacao = new Date(dados.dt_internacao);
      const dtAlta = new Date(dados.dt_alta);

      if (dtAlta <= dtInternacao) {
        errors.push("Data de alta deve ser posterior à data de internação");
        score -= 15;
      }
    }
  }

  private validateProrrogacao(
    dados: any,
    errors: string[],
    warnings: string[],
    score: number
  ): void {
    // Validações específicas para Prorrogação
    if (dados.dt_internacao && dados.dt_alta) {
      const dtInternacao = new Date(dados.dt_internacao);
      const dtAlta = new Date(dados.dt_alta);

      if (dtAlta <= dtInternacao) {
        errors.push("Data de alta deve ser posterior à data de internação");
        score -= 15;
      }
    }
  }

  private validateSuplementar(
    dados: any,
    errors: string[],
    warnings: string[],
    score: number
  ): void {
    // Validações específicas para Suplementar
    if (dados.dt_alta && dados.dt_internacao) {
      const dtInternacao = new Date(dados.dt_internacao);
      const dtAlta = new Date(dados.dt_alta);

      if (dtAlta <= dtInternacao) {
        errors.push("Data de alta deve ser posterior à data de internação");
        score -= 15;
      }
    }

    if (dados.condicao_alta && dados.condicao_alta.length < 10) {
      warnings.push(
        "Condição da alta muito curta, considere adicionar mais detalhes"
      );
      score -= 5;
    }
  }

  private validateFormats(
    testData: TestData,
    errors: string[],
    warnings: string[],
    score: number
  ): void {
    const { dados } = testData;

    // Validação de datas
    const dateFields = ["dt_internacao", "dt_alta"];
    for (const field of dateFields) {
      if (dados[field] && !this.isValidDate(dados[field])) {
        errors.push(`Formato de data inválido: ${field}`);
        score -= 10;
      }
    }

    // Validação de CID
    if (dados.cd_cid_principal && !this.isValidCID(dados.cd_cid_principal)) {
      errors.push("Formato de CID principal inválido");
      score -= 10;
    }

    // Validação de CPF
    if (dados.cpf_pac && !this.isValidCPF(dados.cpf_pac)) {
      errors.push("Formato de CPF inválido");
      score -= 10;
    }

    // Validação de CNS
    if (dados.cns_pac && !this.isValidCNS(dados.cns_pac)) {
      errors.push("Formato de CNS inválido");
      score -= 10;
    }

    // Validação de CEP
    if (dados.cep_pac && !this.isValidCEP(dados.cep_pac)) {
      errors.push("Formato de CEP inválido");
      score -= 10;
    }

    // Validação de UF
    if (dados.uf_pac && !this.isValidUF(dados.uf_pac)) {
      errors.push("Formato de UF inválido");
      score -= 10;
    }

    // Validação de sexo
    if (dados.sexo_pac && !["M", "F"].includes(dados.sexo_pac)) {
      errors.push("Sexo deve ser M ou F");
      score -= 10;
    }
  }

  private isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  private isValidCID(cid: string): boolean {
    // CID deve ter formato A00.0 ou A00
    const cidRegex = /^[A-Z]\d{2}(\.\d)?$/;
    return cidRegex.test(cid);
  }

  private isValidCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, "");

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação do CPF
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  private isValidCNS(cns: string): boolean {
    // CNS deve ter 15 dígitos
    cns = cns.replace(/\D/g, "");
    return cns.length === 15;
  }

  private isValidCEP(cep: string): boolean {
    // CEP deve ter 8 dígitos
    cep = cep.replace(/\D/g, "");
    return cep.length === 8;
  }

  private isValidUF(uf: string): boolean {
    // UF deve ter 2 caracteres e ser válida
    const validUFs = [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ];
    return validUFs.includes(uf.toUpperCase());
  }

  validateOptionalFields(testData: TestData): ValidationResult {
    const warnings: string[] = [];
    const optionalFields = this.optionalFields[testData.situacao] || [];

    for (const field of optionalFields) {
      if (!testData.dados[field] || testData.dados[field] === "") {
        warnings.push(`Campo opcional ausente: ${field}`);
      }
    }

    return {
      isValid: true,
      errors: [],
      warnings,
      score: 100 - warnings.length * 2,
    };
  }

  validateCompleteData(testData: TestData): ValidationResult {
    const result = this.validateTestData(testData);
    const optionalResult = this.validateOptionalFields(testData);

    return {
      isValid: result.isValid,
      errors: result.errors,
      warnings: [...result.warnings, ...optionalResult.warnings],
      score: Math.min(result.score, optionalResult.score),
    };
  }
}
