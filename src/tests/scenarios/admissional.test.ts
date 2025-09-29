import { TestDataGenerator } from "../testDataGenerator";

export class AdmissionalTestScenarios {
  private dataGenerator: TestDataGenerator;

  constructor(dataGenerator?: TestDataGenerator) {
    this.dataGenerator = dataGenerator || new TestDataGenerator();
  }

  async runAllScenarios() {
    const scenarios = [
      "cenario_admissional_basico",
      "cenario_admissional_com_procedimentos",
      "cenario_admissional_com_diagnosticos",
      "cenario_admissional_com_alta_administrativa",
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
      case "cenario_admissional_basico":
        return await this.cenarioAdmissionalBasico();
      case "cenario_admissional_com_procedimentos":
        return await this.cenarioAdmissionalComProcedimentos();
      case "cenario_admissional_com_diagnosticos":
        return await this.cenarioAdmissionalComDiagnosticos();
      case "cenario_admissional_com_alta_administrativa":
        return await this.cenarioAdmissionalComAltaAdministrativa();
      default:
        throw new Error(`Cenário não encontrado: ${scenario}`);
    }
  }

  async cenarioAdmissionalBasico() {
    console.log("🧪 Executando Cenário Admissional Básico...");

    // Gera dados de teste usando os modelos
    const testData = await this.dataGenerator.generateAdmissionalData(1);
    const data = testData[0];

    // Validações básicas
    const validations = {
      hospital: this.validateHospital(data.hospital),
      paciente: this.validatePaciente(data.paciente),
      internacao: this.validateInternacao(data.internacao),
    };

    const isValid = Object.values(validations).every((v) => v.isValid);

    return {
      situacao: "ADMISSIONAL",
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

  async cenarioAdmissionalComProcedimentos() {
    console.log("🧪 Executando Cenário Admissional com Procedimentos...");

    // Gera dados de teste
    const testData = await this.dataGenerator.generateAdmissionalData(1);
    const data = testData[0];

    // Adiciona procedimentos à internação
    const procedimento1 = new (
      await import("../../models/procedimento")
    ).Procedimento();
    procedimento1.setCodigoProcedimento("PROC001");
    procedimento1.setDataExecucao(new Date().toISOString());
    procedimento1.setDataAutorizacao(new Date().toISOString());
    procedimento1.setDataSolicitacao(new Date().toISOString());
    procedimento1.setDataExecucaoFinal(new Date().toISOString());
    // ✅ TESTANDO O NOVO CAMPO
    procedimento1.setCodigoCirurgiaAviso("CIR001");

    const procedimento2 = new (
      await import("../../models/procedimento")
    ).Procedimento();
    procedimento2.setCodigoProcedimento("PROC002");
    procedimento2.setDataExecucao(new Date().toISOString());
    procedimento2.setDataAutorizacao(new Date().toISOString());
    procedimento2.setDataSolicitacao(new Date().toISOString());
    procedimento2.setDataExecucaoFinal(new Date().toISOString());
    // ✅ TESTANDO O NOVO CAMPO
    procedimento2.setCodigoCirurgiaAviso("CIR002");

    data.internacao.addProcedimento(procedimento1);
    data.internacao.addProcedimento(procedimento2);

    // Validações
    const validations = {
      hospital: this.validateHospital(data.hospital),
      paciente: this.validatePaciente(data.paciente),
      internacao: this.validateInternacao(data.internacao),
      procedimentos: this.validateProcedimentos(
        data.internacao.getData().Procedimento
      ),
    };

    const isValid = Object.values(validations).every((v) => v.isValid);

    return {
      situacao: "ADMISSIONAL",
      tipo: "COM_PROCEDIMENTOS",
      status: isValid ? "success" : "error",
      dados: {
        hospital: data.hospital.getData(),
        paciente: data.paciente.getData(),
        internacao: data.internacao.getData(),
        procedimentos: data.internacao.getData().Procedimento,
        validations: validations,
      },
      errors: isValid ? [] : this.collectErrors(validations),
    };
  }

  async cenarioAdmissionalComDiagnosticos() {
    // Implementação do cenário admissional com diagnósticos
    return {
      situacao: "ADMISSIONAL",
      tipo: "COM_DIAGNOSTICOS",
      status: "success",
      dados: {
        paciente: "Paciente com diagnósticos",
        hospital: "Hospital teste",
        diagnosticos: ["CID001", "CID002"],
        dataAdmissao: new Date(),
      },
    };
  }

  async cenarioAdmissionalComAltaAdministrativa() {
    // Implementação do cenário admissional com alta administrativa
    return {
      situacao: "ADMISSIONAL",
      tipo: "COM_ALTA_ADMINISTRATIVA",
      status: "success",
      dados: {
        paciente: "Paciente com alta administrativa",
        hospital: "Hospital teste",
        altaAdministrativa: true,
        dataAdmissao: new Date(),
      },
    };
  }

  getScenariosDescription() {
    return {
      admissional: [
        {
          id: "cenario_admissional_basico",
          name: "Cenário Admissional Básico",
          description: "Teste básico de admissão de paciente",
        },
        {
          id: "cenario_admissional_com_procedimentos",
          name: "Cenário Admissional com Procedimentos",
          description: "Teste de admissão com procedimentos associados",
        },
        {
          id: "cenario_admissional_com_diagnosticos",
          name: "Cenário Admissional com Diagnósticos",
          description: "Teste de admissão com diagnósticos associados",
        },
        {
          id: "cenario_admissional_com_alta_administrativa",
          name: "Cenário Admissional com Alta Administrativa",
          description: "Teste de admissão com alta administrativa",
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
    if (!data.porte) errors.push("Porte do hospital é obrigatório");
    if (!data.complexidade)
      errors.push("Complexidade do hospital é obrigatória");
    if (!data.esferaAdministrativa)
      errors.push("Esfera administrativa é obrigatória");

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
    if (!data.codigoCidPrincipal) errors.push("CID principal é obrigatório");

    return {
      isValid: errors.length === 0,
      errors: errors,
      data: data,
    };
  }

  private validateProcedimentos(procedimentos: any[]) {
    const errors = [];

    if (!procedimentos || procedimentos.length === 0) {
      errors.push("Pelo menos um procedimento é obrigatório");
    } else {
      procedimentos.forEach((proc, index) => {
        if (!proc.codigoProcedimento)
          errors.push(`Procedimento ${index + 1}: Código é obrigatório`);
        if (!proc.dataExecucao)
          errors.push(
            `Procedimento ${index + 1}: Data de execução é obrigatória`
          );
        if (!proc.dataAutorizacao)
          errors.push(
            `Procedimento ${index + 1}: Data de autorização é obrigatória`
          );
        if (!proc.dataSolicitacao)
          errors.push(
            `Procedimento ${index + 1}: Data de solicitação é obrigatória`
          );
        if (!proc.dataExecucaoFinal)
          errors.push(
            `Procedimento ${index + 1}: Data final de execução é obrigatória`
          );
        // ✅ VALIDANDO O NOVO CAMPO
        if (!proc.codigoCirurgiaAviso)
          errors.push(
            `Procedimento ${index + 1}: Código de cirurgia aviso é obrigatório`
          );
      });
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
      data: procedimentos,
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
