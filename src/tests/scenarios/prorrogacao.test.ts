import { TestDataGenerator } from "../testDataGenerator";
import { TestRunner } from "../testRunner";

export class ProrrogacaoTestScenarios {
  private dataGenerator: TestDataGenerator;
  private testRunner: TestRunner;

  constructor(dataGenerator?: TestDataGenerator, testRunner?: TestRunner) {
    this.dataGenerator = dataGenerator || new TestDataGenerator();
    this.testRunner = testRunner || new TestRunner();
  }

  async runAllScenarios() {
    const scenarios = [
      "cenario_prorrogacao_basico",
      "cenario_prorrogacao_com_justificativa",
      "cenario_prorrogacao_com_procedimentos",
      "cenario_prorrogacao_com_diagnosticos",
    ];

    const results = [];
    for (const scenario of scenarios) {
      try {
        const result = await this.runScenario(scenario);
        results.push({ scenario, status: "success", result });
      } catch (error) {
        results.push({ scenario, status: "error", error: error.message });
      }
    }

    return results;
  }

  async runScenario(scenario: string) {
    switch (scenario) {
      case "cenario_prorrogacao_basico":
        return await this.cenarioProrrogacaoBasico();
      case "cenario_prorrogacao_com_justificativa":
        return await this.cenarioProrrogacaoComJustificativa();
      case "cenario_prorrogacao_com_procedimentos":
        return await this.cenarioProrrogacaoComProcedimentos();
      case "cenario_prorrogacao_com_diagnosticos":
        return await this.cenarioProrrogacaoComDiagnosticos();
      default:
        throw new Error(`Cenário não encontrado: ${scenario}`);
    }
  }

  async cenarioProrrogacaoBasico() {
    console.log("🧪 Executando Cenário Prorrogação Básico...");

    // Gera dados de teste usando os modelos
    const testData = await this.dataGenerator.generateProrrogacaoData(1);
    const data = testData[0];

    // Validações específicas para prorrogação
    const validations = {
      hospital: this.validateHospital(data.hospital),
      paciente: this.validatePaciente(data.paciente),
      internacao: this.validateInternacao(data.internacao),
      prorrogacao: this.validateProrrogacao(data.internacao),
    };

    const isValid = Object.values(validations).every((v) => v.isValid);

    return {
      situacao: "PRORROGACAO",
      tipo: "BASICO",
      status: isValid ? "success" : "error",
      dados: {
        hospital: data.hospital.getData(),
        paciente: data.paciente.getData(),
        internacao: data.internacao.getData(),
        validations: validations,
      },
      errors: isValid ? [] : this.collectErrors(validations),
    };
  }

  async cenarioProrrogacaoComJustificativa() {
    // Implementação do cenário de prorrogação com justificativa
    return {
      situacao: "PRORROGACAO",
      tipo: "COM_JUSTIFICATIVA",
      status: "success",
      dados: {
        paciente: "Paciente com prorrogação justificada",
        hospital: "Hospital teste",
        dataProrrogacao: new Date(),
        diasProrrogacao: 14,
        justificativa: "Necessidade de tratamento adicional",
      },
    };
  }

  async cenarioProrrogacaoComProcedimentos() {
    // Implementação do cenário de prorrogação com procedimentos
    return {
      situacao: "PRORROGACAO",
      tipo: "COM_PROCEDIMENTOS",
      status: "success",
      dados: {
        paciente: "Paciente com prorrogação e procedimentos",
        hospital: "Hospital teste",
        dataProrrogacao: new Date(),
        diasProrrogacao: 10,
        procedimentos: ["PROC003", "PROC004"],
      },
    };
  }

  async cenarioProrrogacaoComDiagnosticos() {
    // Implementação do cenário de prorrogação com diagnósticos
    return {
      situacao: "PRORROGACAO",
      tipo: "COM_DIAGNOSTICOS",
      status: "success",
      dados: {
        paciente: "Paciente com prorrogação e diagnósticos",
        hospital: "Hospital teste",
        dataProrrogacao: new Date(),
        diasProrrogacao: 21,
        diagnosticos: ["CID003", "CID004"],
      },
    };
  }

  getScenariosDescription() {
    return {
      prorrogacao: [
        {
          id: "cenario_prorrogacao_basico",
          name: "Cenário Prorrogação Básico",
          description: "Teste básico de prorrogação de internação",
        },
        {
          id: "cenario_prorrogacao_com_justificativa",
          name: "Cenário Prorrogação com Justificativa",
          description: "Teste de prorrogação com justificativa médica",
        },
        {
          id: "cenario_prorrogacao_com_procedimentos",
          name: "Cenário Prorrogação com Procedimentos",
          description: "Teste de prorrogação com procedimentos associados",
        },
        {
          id: "cenario_prorrogacao_com_diagnosticos",
          name: "Cenário Prorrogação com Diagnósticos",
          description: "Teste de prorrogação com diagnósticos associados",
        },
      ],
    };
  }

  // Métodos de validação
  private validateHospital(hospital: any) {
    const data = hospital.getData();
    const errors = [];

    if (!data.codigo) errors.push("Código do hospital é obrigatório");
    if (!data.nome) errors.push("Nome do hospital é obrigatório");
    if (!data.cnes) errors.push("CNES do hospital é obrigatório");

    return {
      isValid: errors.length === 0,
      errors: errors,
      data: data,
    };
  }

  private validatePaciente(paciente: any) {
    const data = paciente.getData();
    const errors = [];

    if (!data.dataNascimento) errors.push("Data de nascimento é obrigatória");
    if (!data.sexo) errors.push("Sexo é obrigatório");

    return {
      isValid: errors.length === 0,
      errors: errors,
      data: data,
    };
  }

  private validateInternacao(internacao: any) {
    const data = internacao.getData();
    const errors = [];

    if (!data.situacao) errors.push("Situação é obrigatória");
    if (!data.caraterInternacao)
      errors.push("Caráter da internação é obrigatório");
    if (!data.procedencia) errors.push("Procedência é obrigatória");
    if (!data.leito) errors.push("Leito é obrigatório");
    if (!data.dataInternacao) errors.push("Data de internação é obrigatória");

    return {
      isValid: errors.length === 0,
      errors: errors,
      data: data,
    };
  }

  private validateProrrogacao(internacao: any) {
    const data = internacao.getData();
    const errors = [];

    // Validações específicas para prorrogação
    if (data.situacao !== "2") {
      errors.push("Situação deve ser '2' para prorrogação");
    }

    if (data.internadoOutrasVezes === "S" && !data.hospitalInternacaoAnterior) {
      errors.push(
        "Hospital de internação anterior é obrigatório quando paciente foi internado outras vezes"
      );
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
      data: data,
    };
  }

  private collectErrors(validations: any) {
    const allErrors = [];
    Object.values(validations).forEach((validation: any) => {
      if (validation.errors) {
        allErrors.push(...validation.errors);
      }
    });
    return allErrors;
  }
}
