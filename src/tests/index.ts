import { TestDataGenerator } from "./testDataGenerator";
import { TestRunner } from "./testRunner";
import { TestReporter } from "./testReporter";
import { AdmissionalTestScenarios } from "./scenarios/admissional.test";
import { ProrrogacaoTestScenarios } from "./scenarios/prorrogacao.test";
import { SuplementarTestScenarios } from "./scenarios/suplementar.test";
import { ModuleControlTestSuite } from "./moduleControl.test";
import { PartoAdequadoTestScenarios } from "./scenarios/partoAdequado.test";
import { ModelValidationTests } from "./modelValidation.test";
import { DataStructureValidationTests } from "./dataStructureValidation.test";

export class DRGTestSuite {
  private dataGenerator: TestDataGenerator;
  private testRunner: TestRunner;
  private reporter: TestReporter;
  private admissionalScenarios: AdmissionalTestScenarios;
  private prorrogacaoScenarios: ProrrogacaoTestScenarios;
  private suplementarScenarios: SuplementarTestScenarios;
  private moduleControlTests: ModuleControlTestSuite;
  private partoAdequadoScenarios: PartoAdequadoTestScenarios;
  private modelValidationTests: ModelValidationTests;
  private dataStructureValidationTests: DataStructureValidationTests;

  constructor() {
    this.dataGenerator = new TestDataGenerator();
    this.testRunner = new TestRunner();
    this.reporter = new TestReporter();
    this.admissionalScenarios = new AdmissionalTestScenarios();
    this.prorrogacaoScenarios = new ProrrogacaoTestScenarios();
    this.suplementarScenarios = new SuplementarTestScenarios();
    this.moduleControlTests = new ModuleControlTestSuite();
    this.partoAdequadoScenarios = new PartoAdequadoTestScenarios(
      this.dataGenerator,
      this.testRunner
    );
    this.modelValidationTests = new ModelValidationTests();
    this.dataStructureValidationTests = new DataStructureValidationTests();
  }

  async initialize(): Promise<void> {
    console.log("🚀 Inicializando DRG Test Suite...");
    await this.dataGenerator.loadBaseData();
    await this.testRunner.initialize();
    console.log("✅ DRG Test Suite inicializado com sucesso!");
  }

  async runAllTests(): Promise<void> {
    console.log("🧪 Executando todos os testes DRG...");

    // Executa testes básicos
    const basicResults = await this.testRunner.runAllTests();
    this.reporter.addResults(basicResults);

    // Executa cenários específicos
    await this.admissionalScenarios.runAllScenarios();
    await this.prorrogacaoScenarios.runAllScenarios();
    await this.suplementarScenarios.runAllScenarios();

    // Executa testes de controle de módulos
    console.log("🔧 Executando testes de controle de módulos...");
    const moduleControlResults = await this.moduleControlTests.runAllTests();
    this.reporter.addResults(moduleControlResults.results);

    // Executa cenários de parto adequado
    console.log("👶 Executando cenários de parto adequado...");
    const partoAdequadoResults =
      await this.partoAdequadoScenarios.runAllScenarios();
    this.reporter.addResults(partoAdequadoResults.results);

    // Executa testes de validação dos modelos
    console.log("🔍 Executando testes de validação dos modelos...");
    const modelValidationResults =
      await this.modelValidationTests.runAllValidationTests();
    this.reporter.addResults(modelValidationResults.results);

    // Executa testes de validação de estrutura de dados
    console.log("🔍 Executando testes de validação de estrutura de dados...");
    const dataStructureResults =
      await this.dataStructureValidationTests.runAllStructureValidationTests();
    this.reporter.addResults(dataStructureResults.results);

    // Coleta todos os resultados
    const allResults = this.testRunner.getResults();
    this.reporter.addResults(allResults);

    console.log("✅ Todos os testes executados!");
  }

  async runOfflineTests(): Promise<void> {
    console.log("🔌 Executando testes offline (sem dependência do banco)...");

    // Executa testes básicos offline
    const basicResults = await this.testRunner.runAllOfflineTests();
    this.reporter.addResults(basicResults);

    console.log("✅ Todos os testes offline executados!");
  }

  async runTestsForSituacao(situacao: number): Promise<void> {
    console.log(`🧪 Executando testes para situação ${situacao}...`);

    switch (situacao) {
      case 1:
        await this.admissionalScenarios.runAllScenarios();
        break;
      case 2:
        await this.prorrogacaoScenarios.runAllScenarios();
        break;
      case 3:
        await this.suplementarScenarios.runAllScenarios();
        break;
      default:
        throw new Error(`Situação inválida: ${situacao}`);
    }

    const results = this.testRunner.getResultsBySituacao(situacao.toString());
    this.reporter.addResults(results);

    console.log(`✅ Testes para situação ${situacao} executados!`);
  }

  /**
   * Executa apenas testes de controle de módulos
   */
  async runModuleControlTests(): Promise<void> {
    console.log("🔧 Executando testes de controle de módulos...");

    const results = await this.moduleControlTests.runAllTests();
    this.reporter.addResults(results.results);

    console.log(
      `✅ Testes de controle de módulos executados! (${results.passed} passaram, ${results.failed} falharam)`
    );
  }

  /**
   * Executa apenas cenários de parto adequado
   */
  async runPartoAdequadoTests(): Promise<void> {
    console.log("👶 Executando cenários de parto adequado...");

    const results = await this.partoAdequadoScenarios.runAllScenarios();
    this.reporter.addResults(results.results);

    console.log(
      `✅ Cenários de parto adequado executados! (${results.passed} passaram, ${results.failed} falharam)`
    );
  }

  /**
   * Executa testes de validação dos modelos DRG
   */
  async runModelValidationTests(): Promise<void> {
    console.log("🔍 Executando testes de validação dos modelos...");

    const results = await this.modelValidationTests.runAllValidationTests();
    this.reporter.addResults(results.results);

    console.log(
      `✅ Testes de validação dos modelos executados! (${results.passed} passaram, ${results.failed} falharam)`
    );
  }

  /**
   * Executa testes de validação de estrutura de dados
   */
  async runDataStructureValidationTests(): Promise<void> {
    console.log("🔍 Executando testes de validação de estrutura de dados...");

    const results =
      await this.dataStructureValidationTests.runAllStructureValidationTests();
    this.reporter.addResults(results.results);

    console.log(
      `✅ Testes de validação de estrutura executados! (${results.passed} passaram, ${results.failed} falharam)`
    );
  }

  /**
   * Executa testes de monitoramento e otimização
   */
  async runMonitoringTests(): Promise<void> {
    console.log("📊 Executando testes de monitoramento...");

    // Executa testes de controle de módulos (inclui monitoramento)
    const moduleControlResults = await this.moduleControlTests.runAllTests();

    // Filtra apenas testes relacionados a monitoramento
    const monitoringTests = moduleControlResults.results.filter(
      (result) =>
        result.name.includes("Monitoramento") ||
        result.name.includes("Otimização") ||
        result.name.includes("Exportação")
    );

    this.reporter.addResults(monitoringTests);

    const passed = monitoringTests.filter((t) => t.passed).length;
    const failed = monitoringTests.filter((t) => !t.passed).length;

    console.log(
      `✅ Testes de monitoramento executados! (${passed} passaram, ${failed} falharam)`
    );
  }

  async runSpecificScenario(
    situacao: number,
    scenarioNumber: number
  ): Promise<void> {
    console.log(
      `🧪 Executando cenário ${scenarioNumber} para situação ${situacao}...`
    );

    switch (situacao) {
      case 1:
        await this.admissionalScenarios.runScenario(scenarioNumber.toString());
        break;
      case 2:
        await this.prorrogacaoScenarios.runScenario(scenarioNumber.toString());
        break;
      case 3:
        await this.suplementarScenarios.runScenario(scenarioNumber.toString());
        break;
      default:
        throw new Error(`Situação inválida: ${situacao}`);
    }

    const results = this.testRunner.getResultsBySituacao(situacao.toString());
    this.reporter.addResults(results);

    console.log(
      `✅ Cenário ${scenarioNumber} para situação ${situacao} executado!`
    );
  }

  async runSpecificScenarioOffline(
    situacao: number,
    scenarioNumber: number
  ): Promise<void> {
    console.log(
      `🔌 Executando cenário ${scenarioNumber} para situação ${situacao} (Modo Offline)...`
    );

    // Gera dados de teste para o cenário específico
    let testData;
    switch (situacao) {
      case 1:
        testData = this.dataGenerator.generateAdmissionalData();
        break;
      case 2:
        testData = this.dataGenerator.generateProrrogacaoData();
        break;
      case 3:
        testData = this.dataGenerator.generateSuplementarData();
        break;
      default:
        throw new Error(`Situação inválida: ${situacao}`);
    }

    // Aplica configurações específicas do cenário
    this.applyScenarioSpecificData(testData, situacao, scenarioNumber);

    // Executa o teste offline
    const result = await this.testRunner.runOfflineTest(testData);
    this.reporter.addResults([result]);

    console.log(
      `✅ Cenário ${scenarioNumber} para situação ${situacao} executado offline!`
    );
  }

  async runSpecificScenarioEstabelecimento8(
    situacao: number,
    scenarioNumber: number
  ): Promise<void> {
    console.log(
      `🏥 Executando cenário ${scenarioNumber} para situação ${situacao} com dados reais do Estabelecimento 8...`
    );

    // Carrega dados reais do Estabelecimento 8
    const baseData = await this.dataGenerator.loadEstabelecimento8Data();
    this.dataGenerator.setBaseData(baseData);

    // Gera dados de teste para o cenário específico
    let testData;
    switch (situacao) {
      case 1:
        testData = this.dataGenerator.generateAdmissionalData();
        break;
      case 2:
        testData = this.dataGenerator.generateProrrogacaoData();
        break;
      case 3:
        testData = this.dataGenerator.generateSuplementarData();
        break;
      default:
        throw new Error(`Situação inválida: ${situacao}`);
    }

    // Aplica dados específicos do cenário
    this.applyScenarioSpecificData(testData, situacao, scenarioNumber);

    // Executa o teste com dados reais
    const result = await this.testRunner.runEstabelecimento8Test(testData);
    this.reporter.addResults([result]);

    console.log(
      `✅ Cenário ${scenarioNumber} para situação ${situacao} executado com dados reais do Estabelecimento 8!`
    );
  }

  private applyScenarioSpecificData(
    testData: any,
    situacao: number,
    scenarioNumber: number
  ): void {
    const dados = testData.dados;

    switch (scenarioNumber) {
      case 1: // Básico - já configurado
        break;

      case 2: // Completo
        dados.carater_internacao = "2"; // Urgência
        dados.procedencia_paciente = "M"; // Comunidade
        dados.leito = "101";
        dados.nr_operadora_fonte_pagadora = "123456";
        dados.nr_registro = "REG123456";
        dados.dt_autorizacao = new Date().toISOString().split("T")[0];
        dados.paciente_internado_outras_vezes = "S";
        dados.hospital_internacao_anterior = "O";
        dados.ultima_internacao_30_dias = "N";
        dados.internacao_complicacao_recaida = "N";
        break;

      case 3: // Emergência
        dados.carater_internacao = "3"; // Emergência
        dados.procedencia_paciente = "U"; // UPA
        break;

      case 4: // Recém-nascido
        dados.recem_nascido = "S";
        dados.peso_nascimento = "3200";
        dados.idade_gestacional = "38";
        dados.comprimento = "50";
        dados.sexo_pac = "M";
        dados.nascido_vivo = "S";
        dados.tocotraumatismo = "N";
        dados.apgar = "9";
        dados.apgar_quinto_minuto = "10";
        dados.alta_48_horas = "N";
        break;

      case 5: // Reinternação
        dados.paciente_internado_outras_vezes = "S";
        dados.hospital_internacao_anterior = "O";
        dados.ultima_internacao_30_dias = "S";
        dados.internacao_complicacao_recaida = "N";
        break;

      case 6: // Recaída
        dados.paciente_internado_outras_vezes = "S";
        dados.hospital_internacao_anterior = "N";
        dados.ultima_internacao_30_dias = "S";
        dados.internacao_complicacao_recaida = "S";
        break;

      case 7: // Particular
        dados.particular = "S";
        dados.cd_operadora = ""; // Vazio para particular
        dados.nr_carteira = ""; // Vazio para particular
        dados.plano_operadora = ""; // Vazio para particular
        break;

      case 8: // Vulnerabilidade
        dados.vulnerabilidade_social = "S";
        dados.codigo_identificacao = "VULN123";
        break;
    }
  }

  async runValidationOnly(): Promise<void> {
    console.log("🔍 Executando apenas validações...");

    const scenarios = await this.dataGenerator.generateTestScenarios();

    for (const situacao in scenarios) {
      const situacaoScenarios = scenarios[situacao];
      for (const scenario of situacaoScenarios) {
        const validation = await this.testRunner.runValidationOnly();
        console.log(
          `  📋 ${situacao}: ${validation.status === "success" ? "✅ Válido" : "❌ Inválido"}`
        );

        if (validation.status !== "success") {
          console.log(`    ❌ Status: ${validation.status}`);
        }

        if (validation.tests && validation.tests.length > 0) {
          console.log(`    📊 Testes executados: ${validation.tests.length}`);
        }
      }
    }

    console.log("✅ Validações executadas!");
  }

  async runTestsWithDRGSend(): Promise<void> {
    console.log("📤 Executando testes com envio para DRG...");

    // Executa todos os testes incluindo envio para DRG
    await this.runAllTests();

    console.log("✅ Testes com envio para DRG executados!");
  }

  async generateAndDisplayReport(): Promise<void> {
    console.log("📊 Gerando relatório...");

    this.reporter.displayReport();

    // Salva relatórios
    await this.reporter.saveReport();
    await this.reporter.saveJSONReport();

    console.log("✅ Relatório gerado e salvo!");
  }

  async cleanupTestData(): Promise<void> {
    console.log("🧹 Limpando dados de teste...");
    await this.testRunner.cleanupTestData();
    console.log("✅ Limpeza concluída!");
  }

  getReporter(): TestReporter {
    return this.reporter;
  }

  getTestRunner(): TestRunner {
    return this.testRunner;
  }

  getDataGenerator(): TestDataGenerator {
    return this.dataGenerator;
  }

  listAllScenarios(): void {
    console.log("📋 Cenários disponíveis:");
    console.log("\n🏥 Admissional (Situação 1):");
    const admissionalDescs =
      this.admissionalScenarios.getScenariosDescription();
    if (Array.isArray(admissionalDescs)) {
      admissionalDescs.forEach((desc) => console.log(`  ${desc}`));
    } else {
      console.log("  Cenários admissional disponíveis");
    }

    console.log("\n⏰ Prorrogação (Situação 2):");
    const prorrogacaoDescs =
      this.prorrogacaoScenarios.getScenariosDescription();
    if (Array.isArray(prorrogacaoDescs)) {
      prorrogacaoDescs.forEach((desc) => console.log(`  ${desc}`));
    } else {
      console.log("  Cenários prorrogação disponíveis");
    }

    console.log("\n📋 Suplementar (Situação 3):");
    const suplementarDescs =
      this.suplementarScenarios.getScenariosDescription();
    if (Array.isArray(suplementarDescs)) {
      suplementarDescs.forEach((desc) => console.log(`  ${desc}`));
    } else {
      console.log("  Cenários suplementar disponíveis");
    }
  }
}

// Funções de conveniência para uso direto
export async function runDRGTests(): Promise<void> {
  const testSuite = new DRGTestSuite();
  await testSuite.initialize();
  await testSuite.runAllTests();
  await testSuite.generateAndDisplayReport();
}

export async function validateDRGData(): Promise<void> {
  const testSuite = new DRGTestSuite();
  await testSuite.initialize();
  await testSuite.runValidationOnly();
}

export async function runDRGTestsWithSend(): Promise<void> {
  const testSuite = new DRGTestSuite();
  await testSuite.initialize();
  await testSuite.runTestsWithDRGSend();
  await testSuite.generateAndDisplayReport();
}

export async function runDRGTestsForSituacao(situacao: number): Promise<void> {
  const testSuite = new DRGTestSuite();
  await testSuite.initialize();
  await testSuite.runTestsForSituacao(situacao);
  await testSuite.generateAndDisplayReport();
}

export async function runDRGOfflineTests(): Promise<void> {
  const testSuite = new DRGTestSuite();
  await testSuite.initialize();
  await testSuite.runOfflineTests();
}

export async function runDRGSpecificScenario(
  situacao: number,
  scenarioNumber: number
): Promise<void> {
  const testSuite = new DRGTestSuite();
  await testSuite.initialize();
  await testSuite.runSpecificScenario(situacao, scenarioNumber);
  await testSuite.generateAndDisplayReport();
}

export async function runDRGSpecificScenarioOffline(
  situacao: number,
  scenarioNumber: number
): Promise<void> {
  const testSuite = new DRGTestSuite();
  await testSuite.initialize();
  await testSuite.runSpecificScenarioOffline(situacao, scenarioNumber);
}

export async function runDRGSpecificScenarioEstabelecimento8(
  situacao: number,
  scenarioNumber: number
): Promise<void> {
  const testSuite = new DRGTestSuite();
  await testSuite.initialize();
  await testSuite.runSpecificScenarioEstabelecimento8(situacao, scenarioNumber);
}

export async function runDRGModelValidationTests(): Promise<void> {
  const testSuite = new DRGTestSuite();
  await testSuite.initialize();
  await testSuite.runModelValidationTests();
  await testSuite.generateAndDisplayReport();
}

export async function runDRGDataStructureValidationTests(): Promise<void> {
  const testSuite = new DRGTestSuite();
  await testSuite.initialize();
  await testSuite.runDataStructureValidationTests();
  await testSuite.generateAndDisplayReport();
}
