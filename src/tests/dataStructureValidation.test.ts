import { TestDataGenerator } from "./testDataGenerator";
import { Hospital } from "../models/hospital";
import { Paciente } from "../models/paciente";
import { Internacao } from "../models/internacao";
import { Operadora } from "../models/operadora";
import { Procedimento } from "../models/procedimento";
import { Medico } from "../models/medico";

/**
 * Testes para validar se a estrutura de dados dos testes está alinhada com os modelos
 */
export class DataStructureValidationTests {
  private dataGenerator: TestDataGenerator;

  constructor() {
    this.dataGenerator = new TestDataGenerator();
  }

  /**
   * Executa todos os testes de validação de estrutura de dados
   */
  async runAllStructureValidationTests(): Promise<{
    passed: number;
    failed: number;
    results: any[];
  }> {
    console.log("🔍 Iniciando Validação de Estrutura de Dados");
    console.log("=".repeat(60));

    const tests = [
      {
        name: "Estrutura Admissional",
        test: () => this.testAdmissionalStructure(),
      },
      {
        name: "Estrutura Prorrogação",
        test: () => this.testProrrogacaoStructure(),
      },
      {
        name: "Estrutura Suplementar",
        test: () => this.testSuplementarStructure(),
      },
      {
        name: "Consistência de Relacionamentos",
        test: () => this.testRelationshipConsistency(),
      },
      {
        name: "Validação de Tipos de Dados",
        test: () => this.testDataTypeValidation(),
      },
      {
        name: "Conformidade com Modelos",
        test: () => this.testModelCompliance(),
      },
    ];

    const results: any[] = [];
    let passed = 0;
    let failed = 0;

    for (const test of tests) {
      try {
        const startTime = Date.now();
        const result = await test.test();
        const duration = Date.now() - startTime;

        if (result.isValid) {
          passed++;
          console.log(`✅ ${test.name}: PASSOU (${duration}ms)`);
        } else {
          failed++;
          console.log(`❌ ${test.name}: FALHOU (${duration}ms)`);
          if (result.errors && result.errors.length > 0) {
            console.log(`   Erros: ${result.errors.join(", ")}`);
          }
        }

        results.push({
          name: test.name,
          passed: result.isValid,
          duration,
          errors: result.errors || [],
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        failed++;
        console.log(`❌ ${test.name}: ERRO - ${error}`);
        results.push({
          name: test.name,
          passed: false,
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        });
      }
    }

    console.log("=".repeat(60));
    console.log(`📊 RESUMO: ${passed} passaram, ${failed} falharam`);
    console.log(
      `🎯 Taxa de sucesso: ${Math.round((passed / tests.length) * 100)}%`
    );

    return { passed, failed, results };
  }

  /**
   * Testa estrutura de dados admissional
   */
  async testAdmissionalStructure(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];

    try {
      // Gera dados de teste
      const testData = await this.dataGenerator.generateAdmissionalData(1);
      const data = testData[0];

      // Valida estrutura básica
      if (!data.internacao) errors.push("Internação não está presente");
      if (!data.hospital) errors.push("Hospital não está presente");
      if (!data.paciente) errors.push("Paciente não está presente");
      if (!data.operadora) errors.push("Operadora não está presente");
      if (!data.medico) errors.push("Médico não está presente");

      // Valida se são instâncias dos modelos corretos
      if (data.internacao && !(data.internacao instanceof Internacao)) {
        errors.push("Internação não é uma instância do modelo Internacao");
      }
      if (data.hospital && !(data.hospital instanceof Hospital)) {
        errors.push("Hospital não é uma instância do modelo Hospital");
      }
      if (data.paciente && !(data.paciente instanceof Paciente)) {
        errors.push("Paciente não é uma instância do modelo Paciente");
      }
      if (data.operadora && !(data.operadora instanceof Operadora)) {
        errors.push("Operadora não é uma instância do modelo Operadora");
      }
      if (data.medico && !(data.medico instanceof Medico)) {
        errors.push("Médico não é uma instância do modelo Medico");
      }

      // Valida dados da internação
      const internacaoData = data.internacao.getData();
      if (internacaoData.situacao !== "1") {
        errors.push("Situação deve ser '1' para admissional");
      }
      if (!internacaoData.caraterInternacao) {
        errors.push("Caráter da internação é obrigatório");
      }
      if (!internacaoData.procedencia) {
        errors.push("Procedência é obrigatória");
      }

      // Valida relacionamentos na internação
      if (!internacaoData.Hospital || internacaoData.Hospital.length === 0) {
        errors.push("Hospital não foi adicionado à internação");
      }
      if (
        !internacaoData.Beneficiario ||
        internacaoData.Beneficiario.length === 0
      ) {
        errors.push("Paciente não foi adicionado à internação");
      }
    } catch (error) {
      errors.push(`Erro ao gerar dados admissional: ${error}`);
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa estrutura de dados de prorrogação
   */
  async testProrrogacaoStructure(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];

    try {
      // Gera dados de teste
      const testData = await this.dataGenerator.generateProrrogacaoData(1);
      const data = testData[0];

      // Valida estrutura básica
      if (!data.internacao) errors.push("Internação não está presente");
      if (!data.hospital) errors.push("Hospital não está presente");
      if (!data.paciente) errors.push("Paciente não está presente");

      // Valida dados da internação para prorrogação
      const internacaoData = data.internacao.getData();
      if (internacaoData.situacao !== "2") {
        errors.push("Situação deve ser '2' para prorrogação");
      }
      if (internacaoData.caraterInternacao !== "2") {
        errors.push("Caráter deve ser '2' (Urgência) para prorrogação");
      }
      if (internacaoData.procedencia !== "I") {
        errors.push("Procedência deve ser 'I' (Instituição) para prorrogação");
      }

      // Valida histórico de internações
      if (internacaoData.internadoOutrasVezes !== "S") {
        errors.push(
          "Paciente deve ter histórico de internações para prorrogação"
        );
      }
    } catch (error) {
      errors.push(`Erro ao gerar dados de prorrogação: ${error}`);
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa estrutura de dados suplementar
   */
  async testSuplementarStructure(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];

    try {
      // Gera dados de teste
      const testData = await this.dataGenerator.generateSuplementarData(1);
      const data = testData[0];

      // Valida estrutura básica
      if (!data.internacao) errors.push("Internação não está presente");
      if (!data.hospital) errors.push("Hospital não está presente");
      if (!data.paciente) errors.push("Paciente não está presente");

      // Valida dados da internação para suplementar
      const internacaoData = data.internacao.getData();
      if (internacaoData.situacao !== "3") {
        errors.push("Situação deve ser '3' para suplementar");
      }
      if (internacaoData.caraterInternacao !== "3") {
        errors.push("Caráter deve ser '3' (Emergência) para suplementar");
      }
      if (internacaoData.procedencia !== "U") {
        errors.push("Procedência deve ser 'U' (UPA) para suplementar");
      }

      // Valida dados do paciente para suplementar
      const pacienteData = data.paciente.getData();
      if (pacienteData.particular !== "S") {
        errors.push("Paciente deve ser particular para suplementar");
      }
    } catch (error) {
      errors.push(`Erro ao gerar dados suplementar: ${error}`);
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa consistência dos relacionamentos
   */
  async testRelationshipConsistency(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];

    try {
      // Gera dados de teste
      const testData = await this.dataGenerator.generateAdmissionalData(1);
      const data = testData[0];

      const internacaoData = data.internacao.getData();

      // Valida que todos os relacionamentos estão presentes
      const requiredRelationships = [
        "Hospital",
        "Beneficiario",
        "Operadora",
        "Medico",
      ];

      for (const relationship of requiredRelationships) {
        if (
          !internacaoData[relationship] ||
          internacaoData[relationship].length === 0
        ) {
          errors.push(`Relacionamento ${relationship} não está presente`);
        }
      }

      // Valida consistência dos dados entre relacionamentos
      if (internacaoData.Hospital && internacaoData.Hospital.length > 0) {
        const hospitalData = internacaoData.Hospital[0];
        if (!hospitalData.codigo || !hospitalData.nome) {
          errors.push("Dados do hospital estão incompletos");
        }
      }

      if (
        internacaoData.Beneficiario &&
        internacaoData.Beneficiario.length > 0
      ) {
        const pacienteData = internacaoData.Beneficiario[0];
        if (!pacienteData.dataNascimento || !pacienteData.sexo) {
          errors.push("Dados do paciente estão incompletos");
        }
      }
    } catch (error) {
      errors.push(`Erro ao validar relacionamentos: ${error}`);
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa validação de tipos de dados
   */
  async testDataTypeValidation(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];

    try {
      // Gera dados de teste
      const testData = await this.dataGenerator.generateAdmissionalData(1);
      const data = testData[0];

      const internacaoData = data.internacao.getData();
      const hospitalData = data.hospital.getData();
      const pacienteData = data.paciente.getData();

      // Valida tipos de dados da internação
      if (typeof internacaoData.situacao !== "string") {
        errors.push("Situação deve ser string");
      }
      if (typeof internacaoData.caraterInternacao !== "string") {
        errors.push("Caráter da internação deve ser string");
      }
      if (typeof internacaoData.procedencia !== "string") {
        errors.push("Procedência deve ser string");
      }
      if (typeof internacaoData.leito !== "string") {
        errors.push("Leito deve ser string");
      }

      // Valida tipos de dados do hospital
      if (typeof hospitalData.codigo !== "string") {
        errors.push("Código do hospital deve ser string");
      }
      if (typeof hospitalData.nome !== "string") {
        errors.push("Nome do hospital deve ser string");
      }
      if (typeof hospitalData.cnes !== "string") {
        errors.push("CNES do hospital deve ser string");
      }

      // Valida tipos de dados do paciente
      if (typeof pacienteData.dataNascimento !== "string") {
        errors.push("Data de nascimento deve ser string");
      }
      if (typeof pacienteData.sexo !== "string") {
        errors.push("Sexo deve ser string");
      }

      // Valida formato de data
      if (
        pacienteData.dataNascimento &&
        !this.isValidDateFormat(pacienteData.dataNascimento)
      ) {
        errors.push("Data de nascimento deve estar no formato ISO");
      }
    } catch (error) {
      errors.push(`Erro ao validar tipos de dados: ${error}`);
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa conformidade com os modelos
   */
  async testModelCompliance(): Promise<{ isValid: boolean; errors: string[] }> {
    const errors = [];

    try {
      // Gera dados de teste
      const testData = await this.dataGenerator.generateAdmissionalData(1);
      const data = testData[0];

      // Valida se os métodos getData() retornam objetos válidos
      const internacaoData = data.internacao.getData();
      const hospitalData = data.hospital.getData();
      const pacienteData = data.paciente.getData();

      // Valida estrutura do objeto de internação
      const requiredInternacaoFields = [
        "situacao",
        "caraterInternacao",
        "procedencia",
        "leito",
        "dataInternacao",
        "codigoCidPrincipal",
      ];

      for (const field of requiredInternacaoFields) {
        if (!(field in internacaoData)) {
          errors.push(
            `Campo obrigatório '${field}' não está presente na internação`
          );
        }
      }

      // Valida estrutura do objeto de hospital
      const requiredHospitalFields = [
        "codigo",
        "nome",
        "cnes",
        "porte",
        "complexidade",
        "esferaAdministrativa",
        "uf",
        "cidade",
      ];

      for (const field of requiredHospitalFields) {
        if (!(field in hospitalData)) {
          errors.push(
            `Campo obrigatório '${field}' não está presente no hospital`
          );
        }
      }

      // Valida estrutura do objeto de paciente
      const requiredPacienteFields = ["dataNascimento", "sexo"];

      for (const field of requiredPacienteFields) {
        if (!(field in pacienteData)) {
          errors.push(
            `Campo obrigatório '${field}' não está presente no paciente`
          );
        }
      }
    } catch (error) {
      errors.push(`Erro ao validar conformidade com modelos: ${error}`);
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Valida formato de data ISO
   */
  private isValidDateFormat(dateString: string): boolean {
    try {
      const date = new Date(dateString);
      return date.toISOString() === dateString;
    } catch {
      return false;
    }
  }
}
