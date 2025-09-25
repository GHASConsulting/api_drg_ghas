import { TestDataGenerator, TestData } from "../testDataGenerator";
import { TestRunner } from "../testRunner";

export class ProrrogacaoTestScenarios {
  private dataGenerator: TestDataGenerator;
  private testRunner: TestRunner;

  constructor(dataGenerator: TestDataGenerator, testRunner: TestRunner) {
    this.dataGenerator = dataGenerator;
    this.testRunner = testRunner;
  }

  async runAllScenarios(): Promise<void> {
    console.log("⏰ Executando cenários de Prorrogação...");

    await this.scenarioProrrogacaoBasica();
    await this.scenarioProrrogacaoComAlta();
    await this.scenarioProrrogacaoEmergencia();
    await this.scenarioProrrogacaoRecemNascido();
    await this.scenarioProrrogacaoReinternacao();
    await this.scenarioProrrogacaoRecaida();
    await this.scenarioProrrogacaoParticular();
    await this.scenarioProrrogacaoVulnerabilidade();
  }

  async scenarioProrrogacaoBasica(): Promise<void> {
    console.log("  📋 Cenário: Prorrogação Básica");

    const testData = this.dataGenerator.generateProrrogacaoData();
    testData.nome = "Prorrogação Básica";
    testData.descricao = "Prorrogação com dados mínimos obrigatórios";

    // Remove campos opcionais para testar apenas obrigatórios
    testData.dados.DT_ALTA = null;
    testData.dados.MOTIVO_ALTA = null;
    testData.dados.OBSERVACOES = null;
    testData.dados.CID_SECUNDARIO = null;

    await this.testRunner.runTest(testData);
  }

  async scenarioProrrogacaoComAlta(): Promise<void> {
    console.log("  📋 Cenário: Prorrogação com Alta");

    const testData = this.dataGenerator.generateProrrogacaoData();
    testData.nome = "Prorrogação com Alta";
    testData.descricao = "Prorrogação seguida de alta médica";

    // Adiciona dados de alta
    testData.dados.DT_ALTA = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    testData.dados.MOTIVO_ALTA = "Alta médica após prorrogação";
    testData.dados.OBSERVACOES = "Paciente estabilizado após prorrogação";
    testData.dados.CID_PRINCIPAL = "A00.0";
    testData.dados.CID_SECUNDARIO = "B00.0";

    await this.testRunner.runTest(testData);
  }

  async scenarioProrrogacaoEmergencia(): Promise<void> {
    console.log("  📋 Cenário: Prorrogação Emergência");

    const testData = this.dataGenerator.generateProrrogacaoData();
    testData.nome = "Prorrogação Emergência";
    testData.descricao = "Prorrogação de internação de emergência";

    // Dados específicos para emergência
    testData.dados.TIPO_ATENDIMENTO = "EMERGENCIA";
    testData.dados.PRIORIDADE = "ALTA";
    testData.dados.MOTIVO_PRORROGACAO =
      "Prorrogação para estabilização do paciente";
    testData.dados.OBSERVACOES =
      "Paciente em estado crítico, necessita prorrogação";
    testData.dados.CID_PRINCIPAL = "S72.0"; // Fratura do fêmur

    await this.testRunner.runTest(testData);
  }

  async scenarioProrrogacaoRecemNascido(): Promise<void> {
    console.log("  📋 Cenário: Prorrogação Recém-nascido");

    const testData = this.dataGenerator.generateProrrogacaoData();
    testData.nome = "Prorrogação Recém-nascido";
    testData.descricao = "Prorrogação de internação de recém-nascido";

    // Dados específicos para recém-nascido
    testData.dados.TIPO_PACIENTE = "RECEM_NASCIDO";
    testData.dados.IDADE_PACIENTE = "0";
    testData.dados.PESO_NASCIMENTO = "3200";
    testData.dados.ALTURA_NASCIMENTO = "50";
    testData.dados.APGAR_1MIN = "8";
    testData.dados.APGAR_5MIN = "9";
    testData.dados.MOTIVO_PRORROGACAO = "Prorrogação para ganho de peso";
    testData.dados.OBSERVACOES = "Recém-nascido necessita ganho de peso";
    testData.dados.CID_PRINCIPAL = "P07.0"; // Recém-nascido de baixo peso

    await this.testRunner.runTest(testData);
  }

  async scenarioProrrogacaoReinternacao(): Promise<void> {
    console.log("  📋 Cenário: Prorrogação Reinternação");

    const testData = this.dataGenerator.generateProrrogacaoData();
    testData.nome = "Prorrogação Reinternação";
    testData.descricao = "Prorrogação de reinternação de paciente";

    // Dados específicos para reinternação
    testData.dados.TIPO_INTERNACAO = "REINTERNACAO";
    testData.dados.INTERNACAO_ANTERIOR = "1234567890";
    testData.dados.DT_ALTA_ANTERIOR = new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0];
    testData.dados.MOTIVO_PRORROGACAO = "Prorrogação para tratamento completo";
    testData.dados.OBSERVACOES = "Paciente reinternado necessita prorrogação";

    await this.testRunner.runTest(testData);
  }

  async scenarioProrrogacaoRecaida(): Promise<void> {
    console.log("  📋 Cenário: Prorrogação Recaída");

    const testData = this.dataGenerator.generateProrrogacaoData();
    testData.nome = "Prorrogação Recaída";
    testData.descricao = "Prorrogação de internação por recaída";

    // Dados específicos para recaída
    testData.dados.TIPO_INTERNACAO = "RECAIDA";
    testData.dados.CONDICAO_CRONICA = "DIABETES";
    testData.dados.MOTIVO_PRORROGACAO = "Prorrogação para controle glicêmico";
    testData.dados.OBSERVACOES = "Paciente com diabetes necessita prorrogação";
    testData.dados.CID_PRINCIPAL = "E11.9"; // Diabetes tipo 2

    await this.testRunner.runTest(testData);
  }

  async scenarioProrrogacaoParticular(): Promise<void> {
    console.log("  📋 Cenário: Prorrogação Particular");

    const testData = this.dataGenerator.generateProrrogacaoData();
    testData.nome = "Prorrogação Particular";
    testData.descricao = "Prorrogação de paciente particular";

    // Dados específicos para paciente particular
    testData.dados.TIPO_PAGAMENTO = "PARTICULAR";
    testData.dados.CODIGO_OPERADORA = null;
    testData.dados.NUMERO_CARTEIRA = null;
    testData.dados.VALIDADE_CARTEIRA = null;
    testData.dados.MOTIVO_PRORROGACAO =
      "Prorrogação para tratamento particular";
    testData.dados.OBSERVACOES = "Paciente particular - prorrogação autorizada";

    await this.testRunner.runTest(testData);
  }

  async scenarioProrrogacaoVulnerabilidade(): Promise<void> {
    console.log("  📋 Cenário: Prorrogação Vulnerabilidade");

    const testData = this.dataGenerator.generateProrrogacaoData();
    testData.nome = "Prorrogação Vulnerabilidade";
    testData.descricao = "Prorrogação de paciente em vulnerabilidade";

    // Dados específicos para vulnerabilidade
    testData.dados.SITUACAO_VULNERABILIDADE = "SIM";
    testData.dados.TIPO_VULNERABILIDADE = "SOCIAL";
    testData.dados.MOTIVO_PRORROGACAO = "Prorrogação para suporte social";
    testData.dados.OBSERVACOES =
      "Paciente em vulnerabilidade necessita prorrogação";
    testData.dados.ACOMPANHANTE = "SIM";
    testData.dados.NOME_ACOMPANHANTE = "João Silva";

    await this.testRunner.runTest(testData);
  }

  async runScenario(scenarioNumber: number): Promise<void> {
    const scenarios = [
      this.scenarioProrrogacaoBasica,
      this.scenarioProrrogacaoComAlta,
      this.scenarioProrrogacaoEmergencia,
      this.scenarioProrrogacaoRecemNascido,
      this.scenarioProrrogacaoReinternacao,
      this.scenarioProrrogacaoRecaida,
      this.scenarioProrrogacaoParticular,
      this.scenarioProrrogacaoVulnerabilidade,
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
      "1. Prorrogação Básica - Dados mínimos obrigatórios",
      "2. Prorrogação com Alta - Prorrogação seguida de alta",
      "3. Prorrogação Emergência - Prorrogação de emergência",
      "4. Prorrogação Recém-nascido - Prorrogação de recém-nascido",
      "5. Prorrogação Reinternação - Prorrogação de reinternação",
      "6. Prorrogação Recaída - Prorrogação por recaída",
      "7. Prorrogação Particular - Prorrogação de paciente particular",
      "8. Prorrogação Vulnerabilidade - Prorrogação de paciente vulnerável",
    ];
  }
}
