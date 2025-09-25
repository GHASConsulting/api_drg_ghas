import { TestDataGenerator, TestData } from "../testDataGenerator";
import { TestRunner } from "../testRunner";

export class AdmissionalTestScenarios {
  private dataGenerator: TestDataGenerator;
  private testRunner: TestRunner;

  constructor(dataGenerator: TestDataGenerator, testRunner: TestRunner) {
    this.dataGenerator = dataGenerator;
    this.testRunner = testRunner;
  }

  async runAllScenarios(): Promise<void> {
    console.log("🏥 Executando cenários de Admissional...");

    await this.scenarioAdmissionalBasica();
    await this.scenarioAdmissionalCompleta();
    await this.scenarioAdmissionalEmergencia();
    await this.scenarioAdmissionalRecemNascido();
    await this.scenarioAdmissionalReinternacao();
    await this.scenarioAdmissionalRecaida();
    await this.scenarioAdmissionalParticular();
    await this.scenarioAdmissionalVulnerabilidade();
  }

  async scenarioAdmissionalBasica(): Promise<void> {
    console.log("  📋 Cenário: Admissional Básica");

    const testData = this.dataGenerator.generateAdmissionalData();
    testData.nome = "Admissional Básica";
    testData.descricao = "Admissão com dados mínimos obrigatórios";

    // Remove campos opcionais para testar apenas obrigatórios
    testData.dados.DT_ALTA = null;
    testData.dados.DT_PRORROGACAO = null;
    testData.dados.MOTIVO_ALTA = null;
    testData.dados.MOTIVO_PRORROGACAO = null;
    testData.dados.OBSERVACOES = null;
    testData.dados.CID_SECUNDARIO = null;

    await this.testRunner.runTest(testData);
  }

  async scenarioAdmissionalCompleta(): Promise<void> {
    console.log("  📋 Cenário: Admissional Completa");

    const testData = this.dataGenerator.generateAdmissionalData();
    testData.nome = "Admissional Completa";
    testData.descricao =
      "Admissão com todos os campos obrigatórios e opcionais";

    // Adiciona campos opcionais
    testData.dados.DT_ALTA = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    testData.dados.MOTIVO_ALTA = "Alta médica programada";
    testData.dados.OBSERVACOES = "Paciente em bom estado geral";
    testData.dados.CID_PRINCIPAL = "A00.0";
    testData.dados.CID_SECUNDARIO = "B00.0";

    await this.testRunner.runTest(testData);
  }

  async scenarioAdmissionalEmergencia(): Promise<void> {
    console.log("  📋 Cenário: Admissional Emergência");

    const testData = this.dataGenerator.generateAdmissionalData();
    testData.nome = "Admissional Emergência";
    testData.descricao = "Admissão de emergência com dados específicos";

    // Dados específicos para emergência
    testData.dados.TIPO_ATENDIMENTO = "EMERGENCIA";
    testData.dados.PRIORIDADE = "ALTA";
    testData.dados.OBSERVACOES = "Paciente admitido via emergência";
    testData.dados.CID_PRINCIPAL = "S72.0"; // Fratura do fêmur

    await this.testRunner.runTest(testData);
  }

  async scenarioAdmissionalRecemNascido(): Promise<void> {
    console.log("  📋 Cenário: Admissional Recém-nascido");

    const testData = this.dataGenerator.generateAdmissionalData();
    testData.nome = "Admissional Recém-nascido";
    testData.descricao = "Admissão de recém-nascido com dados específicos";

    // Dados específicos para recém-nascido
    testData.dados.TIPO_PACIENTE = "RECEM_NASCIDO";
    testData.dados.IDADE_PACIENTE = "0";
    testData.dados.PESO_NASCIMENTO = "3200";
    testData.dados.ALTURA_NASCIMENTO = "50";
    testData.dados.APGAR_1MIN = "8";
    testData.dados.APGAR_5MIN = "9";
    testData.dados.CID_PRINCIPAL = "P07.0"; // Recém-nascido de baixo peso

    await this.testRunner.runTest(testData);
  }

  async scenarioAdmissionalReinternacao(): Promise<void> {
    console.log("  📋 Cenário: Admissional Reinternação");

    const testData = this.dataGenerator.generateAdmissionalData();
    testData.nome = "Admissional Reinternação";
    testData.descricao = "Reinternação de paciente com histórico";

    // Dados específicos para reinternação
    testData.dados.TIPO_INTERNACAO = "REINTERNACAO";
    testData.dados.INTERNACAO_ANTERIOR = "1234567890";
    testData.dados.DT_ALTA_ANTERIOR = new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0];
    testData.dados.MOTIVO_REINTERNACAO = "Complicação pós-alta";
    testData.dados.OBSERVACOES = "Paciente reinternado por complicação";

    await this.testRunner.runTest(testData);
  }

  async scenarioAdmissionalRecaida(): Promise<void> {
    console.log("  📋 Cenário: Admissional Recaída");

    const testData = this.dataGenerator.generateAdmissionalData();
    testData.nome = "Admissional Recaída";
    testData.descricao = "Admissão por recaída de condição crônica";

    // Dados específicos para recaída
    testData.dados.TIPO_INTERNACAO = "RECAIDA";
    testData.dados.CONDICAO_CRONICA = "DIABETES";
    testData.dados.MOTIVO_RECAIDA = "Descompensação glicêmica";
    testData.dados.OBSERVACOES = "Paciente com diabetes descompensado";
    testData.dados.CID_PRINCIPAL = "E11.9"; // Diabetes tipo 2

    await this.testRunner.runTest(testData);
  }

  async scenarioAdmissionalParticular(): Promise<void> {
    console.log("  📋 Cenário: Admissional Particular");

    const testData = this.dataGenerator.generateAdmissionalData();
    testData.nome = "Admissional Particular";
    testData.descricao = "Admissão de paciente particular (sem convênio)";

    // Dados específicos para paciente particular
    testData.dados.TIPO_PAGAMENTO = "PARTICULAR";
    testData.dados.CODIGO_OPERADORA = null;
    testData.dados.NUMERO_CARTEIRA = null;
    testData.dados.VALIDADE_CARTEIRA = null;
    testData.dados.OBSERVACOES = "Paciente particular - pagamento direto";

    await this.testRunner.runTest(testData);
  }

  async scenarioAdmissionalVulnerabilidade(): Promise<void> {
    console.log("  📋 Cenário: Admissional Vulnerabilidade");

    const testData = this.dataGenerator.generateAdmissionalData();
    testData.nome = "Admissional Vulnerabilidade";
    testData.descricao = "Admissão de paciente em situação de vulnerabilidade";

    // Dados específicos para vulnerabilidade
    testData.dados.SITUACAO_VULNERABILIDADE = "SIM";
    testData.dados.TIPO_VULNERABILIDADE = "SOCIAL";
    testData.dados.OBSERVACOES =
      "Paciente em situação de vulnerabilidade social";
    testData.dados.ACOMPANHANTE = "SIM";
    testData.dados.NOME_ACOMPANHANTE = "João Silva";

    await this.testRunner.runTest(testData);
  }

  async runScenario(scenarioNumber: number): Promise<void> {
    const scenarios = [
      this.scenarioAdmissionalBasica,
      this.scenarioAdmissionalCompleta,
      this.scenarioAdmissionalEmergencia,
      this.scenarioAdmissionalRecemNascido,
      this.scenarioAdmissionalReinternacao,
      this.scenarioAdmissionalRecaida,
      this.scenarioAdmissionalParticular,
      this.scenarioAdmissionalVulnerabilidade,
    ];

    if (scenarioNumber < 1 || scenarioNumber > scenarios.length) {
      throw new Error(
        `Cenário inválido. Escolha entre 1 e ${scenarios.length}`
      );
    }

    await scenarios[scenarioNumber - 1].call(this);
  }

  getScenariosDescription(): string[] {
    return [
      "1. Admissional Básica - Dados mínimos obrigatórios",
      "2. Admissional Completa - Todos os campos obrigatórios e opcionais",
      "3. Admissional Emergência - Admissão de emergência",
      "4. Admissional Recém-nascido - Admissão de recém-nascido",
      "5. Admissional Reinternação - Reinternação de paciente",
      "6. Admissional Recaída - Admissão por recaída",
      "7. Admissional Particular - Paciente particular",
      "8. Admissional Vulnerabilidade - Paciente em vulnerabilidade",
    ];
  }
}
