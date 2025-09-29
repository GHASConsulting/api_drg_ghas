/**
 * Teste para validar geração de dados com informações reais do INOVEMED
 */

import { TestDataGenerator } from "./testDataGenerator";

export class RealDataValidator {
  private dataGenerator: TestDataGenerator;

  constructor() {
    this.dataGenerator = new TestDataGenerator();
  }

  /**
   * Testa geração de dados admissionais com dados reais
   */
  async testRealAdmissionalData(): Promise<boolean> {
    console.log("🧪 Testando Dados Reais - Cenário Admissional");
    console.log("=".repeat(60));

    try {
      // Gera dados com informações reais do INOVEMED
      const testData = await this.dataGenerator.generateAdmissionalData(1);
      const data = testData[0];

      // Validações específicas dos dados reais
      const validations = this.validateRealData(data);

      if (validations.isValid) {
        console.log("✅ Dados reais validados com sucesso!");
        console.log(
          `✅ Hospital: ${data.hospital.getData().nome} (${data.hospital.getData().codigo})`
        );
        console.log(`✅ CNES: ${data.hospital.getData().cnes}`);
        console.log(`✅ Paciente CPF: ${data.paciente.getData().cpf}`);
        console.log(`✅ CNS: ${data.paciente.getData().cns}`);
        console.log(
          `✅ Internação: ${data.internacao.getData().numeroAtendimento}`
        );
        return true;
      } else {
        console.log("❌ Falha na validação dos dados reais:");
        validations.errors.forEach((error) => console.log(`  - ${error}`));
        return false;
      }
    } catch (error) {
      console.error("❌ Erro ao testar dados reais:", error);
      return false;
    }
  }

  /**
   * Testa geração de dados de parto adequado com dados reais
   */
  async testRealPartoAdequadoData(): Promise<boolean> {
    console.log("🧪 Testando Dados Reais - Parto Adequado");
    console.log("=".repeat(60));

    try {
      const testData = await this.dataGenerator.generatePartoAdequadoData(1);
      const data = testData[0];

      // Validações específicas de parto adequado
      const validations = this.validatePartoAdequadoData(data);

      if (validations.isValid) {
        console.log("✅ Dados de Parto Adequado validados com sucesso!");
        console.log(`✅ Hospital: ${data.hospital.getData().nome}`);
        console.log(
          `✅ Antecedentes: ${data.partoAdequado.getData().antecedentesObstetricos}`
        );
        console.log(`✅ RN Peso: ${data.rn.getData().pesoNascimento}g`);
        console.log(
          `✅ Procedimento com cirurgia aviso: ${data.procedimento.getData().codigoCirurgiaAviso}`
        );
        return true;
      } else {
        console.log("❌ Falha na validação do Parto Adequado:");
        validations.errors.forEach((error) => console.log(`  - ${error}`));
        return false;
      }
    } catch (error) {
      console.error("❌ Erro ao testar Parto Adequado:", error);
      return false;
    }
  }

  /**
   * Valida se os dados gerados correspondem aos dados reais esperados
   */
  private validateRealData(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validação do Hospital INOVEMED
    const hospital = data.hospital.getData();
    if (hospital.codigo !== "9948") {
      errors.push(
        `Código do hospital incorreto: esperado 9948, recebido ${hospital.codigo}`
      );
    }
    if (hospital.nome !== "INOVEMED") {
      errors.push(
        `Nome do hospital incorreto: esperado INOVEMED, recebido ${hospital.nome}`
      );
    }
    if (hospital.cnes !== "124") {
      errors.push(`CNES incorreto: esperado 124, recebido ${hospital.cnes}`);
    }
    if (hospital.uf !== "MG") {
      errors.push(`UF incorreta: esperado MG, recebido ${hospital.uf}`);
    }

    // Validação do Paciente
    const paciente = data.paciente.getData();
    if (paciente.cpf !== "50234242191") {
      errors.push(
        `CPF do paciente incorreto: esperado 50234242191, recebido ${paciente.cpf}`
      );
    }
    if (paciente.cns !== "702109711362597") {
      errors.push(
        `CNS do paciente incorreto: esperado 702109711362597, recebido ${paciente.cns}`
      );
    }
    if (paciente.sexo !== "F") {
      errors.push(
        `Sexo do paciente incorreto: esperado F, recebido ${paciente.sexo}`
      );
    }

    // Validação da Internação
    const internacao = data.internacao.getData();
    if (internacao.numeroRegistro !== "1539811") {
      errors.push(
        `Número de registro incorreto: esperado 1539811, recebido ${internacao.numeroRegistro}`
      );
    }
    if (internacao.numeroAtendimento !== "6580261") {
      errors.push(
        `Número de atendimento incorreto: esperado 6580261, recebido ${internacao.numeroAtendimento}`
      );
    }
    if (internacao.codigoCidPrincipal !== "C50") {
      errors.push(
        `CID principal incorreto: esperado C50, recebido ${internacao.codigoCidPrincipal}`
      );
    }

    // Validação da Operadora
    const operadora = data.operadora.getData();
    if (operadora.codigo !== "3945") {
      errors.push(
        `Código da operadora incorreto: esperado 3945, recebido ${operadora.codigo}`
      );
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Valida dados específicos de Parto Adequado
   */
  private validatePartoAdequadoData(data: any): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Validação do PartoAdequado
    const parto = data.partoAdequado.getData();
    if (!parto.antecedentesObstetricos) {
      errors.push("Antecedentes obstétricos não definidos");
    }
    if (!parto.apresentacaoFetalRn1) {
      errors.push("Apresentação fetal RN1 não definida");
    }

    // Validação do RN
    const rn = data.rn.getData();
    if (!rn.pesoNascimento) {
      errors.push("Peso de nascimento do RN não definido");
    }
    if (!rn.sexo) {
      errors.push("Sexo do RN não definido");
    }

    // Validação do Procedimento com novo campo
    const procedimento = data.procedimento.getData();
    if (!procedimento.codigoCirurgiaAviso) {
      errors.push("Código de cirurgia aviso não definido no procedimento");
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Executa todos os testes de dados reais
   */
  async runAllRealDataTests(): Promise<boolean> {
    console.log("🚀 Iniciando Testes de Dados Reais INOVEMED");
    console.log("=".repeat(80));

    const results = {
      admissional: await this.testRealAdmissionalData(),
      partoAdequado: await this.testRealPartoAdequadoData(),
    };

    console.log("\n📊 Resultado dos Testes:");
    console.log(`✅ Admissional: ${results.admissional ? "PASSOU" : "FALHOU"}`);
    console.log(
      `✅ Parto Adequado: ${results.partoAdequado ? "PASSOU" : "FALHOU"}`
    );

    const allPassed = Object.values(results).every((result) => result);
    console.log(
      `\n🎯 Resultado Geral: ${allPassed ? "✅ TODOS OS TESTES PASSARAM" : "❌ ALGUNS TESTES FALHARAM"}`
    );

    return allPassed;
  }
}

// Execução direta se chamado como script
if (require.main === module) {
  const validator = new RealDataValidator();
  validator
    .runAllRealDataTests()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error("Erro fatal:", error);
      process.exit(1);
    });
}
