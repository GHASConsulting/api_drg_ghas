import { TestDataGenerator, TestData } from "../testDataGenerator";
import { TestRunner } from "../testRunner";

export class SuplementarTestScenarios {
  private dataGenerator: TestDataGenerator;
  private testRunner: TestRunner;

  constructor(dataGenerator: TestDataGenerator, testRunner: TestRunner) {
    this.dataGenerator = dataGenerator;
    this.testRunner = testRunner;
  }

  async runAllScenarios(): Promise<void> {
    console.log("📋 Executando cenários de Suplementar...");

    await this.scenarioSuplementarBasica();
    await this.scenarioSuplementarCompleta();
    await this.scenarioSuplementarEmergencia();
    await this.scenarioSuplementarRecemNascido();
    await this.scenarioSuplementarReinternacao();
    await this.scenarioSuplementarRecaida();
    await this.scenarioSuplementarParticular();
    await this.scenarioSuplementarVulnerabilidade();
  }

  async scenarioSuplementarBasica(): Promise<void> {
    console.log("  📋 Cenário: Suplementar Básica");

    const testData = this.dataGenerator.generateSuplementarData();
    testData.nome = "Suplementar Básica";
    testData.descricao = "Suplementar com dados mínimos obrigatórios";

    // Remove campos opcionais para testar apenas obrigatórios
    testData.dados.DT_PRORROGACAO = null;
    testData.dados.MOTIVO_PRORROGACAO = null;
    testData.dados.OBSERVACOES = null;
    testData.dados.CID_SECUNDARIO = null;

    await this.testRunner.runTest(testData);
  }

  async scenarioSuplementarCompleta(): Promise<void> {
    console.log("  📋 Cenário: Suplementar Completa");

    const testData = this.dataGenerator.generateSuplementarData();
    testData.nome = "Suplementar Completa";
    testData.descricao =
      "Suplementar com todos os campos obrigatórios e opcionais";

    // Adiciona campos opcionais
    testData.dados.DT_PRORROGACAO = new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0];
    testData.dados.MOTIVO_PRORROGACAO = "Prorrogação anterior para tratamento";
    testData.dados.OBSERVACOES = "Paciente com alta médica bem-sucedida";
    testData.dados.CID_PRINCIPAL = "A00.0";
    testData.dados.CID_SECUNDARIO = "B00.0";
    testData.dados.RESUMO_ALTA = "Paciente recebeu alta em bom estado geral";

    await this.testRunner.runTest(testData);
  }

  async scenarioSuplementarEmergencia(): Promise<void> {
    console.log("  📋 Cenário: Suplementar Emergência");

    const testData = this.dataGenerator.generateSuplementarData();
    testData.nome = "Suplementar Emergência";
    testData.descricao = "Suplementar de internação de emergência";

    // Dados específicos para emergência
    testData.dados.TIPO_ATENDIMENTO = "EMERGENCIA";
    testData.dados.PRIORIDADE = "ALTA";
    testData.dados.MOTIVO_ALTA = "Alta médica após tratamento de emergência";
    testData.dados.OBSERVACOES = "Paciente estabilizado após emergência";
    testData.dados.CID_PRINCIPAL = "S72.0"; // Fratura do fêmur
    testData.dados.RESUMO_ALTA = "Fratura tratada com sucesso";

    await this.testRunner.runTest(testData);
  }

  async scenarioSuplementarRecemNascido(): Promise<void> {
    console.log("  📋 Cenário: Suplementar Recém-nascido");

    const testData = this.dataGenerator.generateSuplementarData();
    testData.nome = "Suplementar Recém-nascido";
    testData.descricao = "Suplementar de internação de recém-nascido";

    // Dados específicos para recém-nascido
    testData.dados.TIPO_PACIENTE = "RECEM_NASCIDO";
    testData.dados.IDADE_PACIENTE = "0";
    testData.dados.PESO_NASCIMENTO = "3200";
    testData.dados.ALTURA_NASCIMENTO = "50";
    testData.dados.APGAR_1MIN = "8";
    testData.dados.APGAR_5MIN = "9";
    testData.dados.MOTIVO_ALTA = "Alta médica do recém-nascido";
    testData.dados.OBSERVACOES = "Recém-nascido com alta em bom estado";
    testData.dados.CID_PRINCIPAL = "P07.0"; // Recém-nascido de baixo peso
    testData.dados.RESUMO_ALTA = "Recém-nascido ganhou peso adequadamente";

    await this.testRunner.runTest(testData);
  }

  async scenarioSuplementarReinternacao(): Promise<void> {
    console.log("  📋 Cenário: Suplementar Reinternação");

    const testData = this.dataGenerator.generateSuplementarData();
    testData.nome = "Suplementar Reinternação";
    testData.descricao = "Suplementar de reinternação de paciente";

    // Dados específicos para reinternação
    testData.dados.TIPO_INTERNACAO = "REINTERNACAO";
    testData.dados.INTERNACAO_ANTERIOR = "1234567890";
    testData.dados.DT_ALTA_ANTERIOR = new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0];
    testData.dados.MOTIVO_ALTA = "Alta médica após reinternação";
    testData.dados.OBSERVACOES = "Paciente reinternado com alta bem-sucedida";
    testData.dados.RESUMO_ALTA = "Reinternação tratada com sucesso";

    await this.testRunner.runTest(testData);
  }

  async scenarioSuplementarRecaida(): Promise<void> {
    console.log("  📋 Cenário: Suplementar Recaída");

    const testData = this.dataGenerator.generateSuplementarData();
    testData.nome = "Suplementar Recaída";
    testData.descricao = "Suplementar de internação por recaída";

    // Dados específicos para recaída
    testData.dados.TIPO_INTERNACAO = "RECAIDA";
    testData.dados.CONDICAO_CRONICA = "DIABETES";
    testData.dados.MOTIVO_ALTA = "Alta médica após controle da recaída";
    testData.dados.OBSERVACOES = "Paciente com diabetes controlado";
    testData.dados.CID_PRINCIPAL = "E11.9"; // Diabetes tipo 2
    testData.dados.RESUMO_ALTA = "Diabetes controlado, paciente estável";

    await this.testRunner.runTest(testData);
  }

  async scenarioSuplementarParticular(): Promise<void> {
    console.log("  📋 Cenário: Suplementar Particular");

    const testData = this.dataGenerator.generateSuplementarData();
    testData.nome = "Suplementar Particular";
    testData.descricao = "Suplementar de paciente particular";

    // Dados específicos para paciente particular
    testData.dados.TIPO_PAGAMENTO = "PARTICULAR";
    testData.dados.CODIGO_OPERADORA = null;
    testData.dados.NUMERO_CARTEIRA = null;
    testData.dados.VALIDADE_CARTEIRA = null;
    testData.dados.MOTIVO_ALTA = "Alta médica de paciente particular";
    testData.dados.OBSERVACOES = "Paciente particular com alta bem-sucedida";
    testData.dados.RESUMO_ALTA = "Tratamento particular concluído com sucesso";

    await this.testRunner.runTest(testData);
  }

  async scenarioSuplementarVulnerabilidade(): Promise<void> {
    console.log("  📋 Cenário: Suplementar Vulnerabilidade");

    const testData = this.dataGenerator.generateSuplementarData();
    testData.nome = "Suplementar Vulnerabilidade";
    testData.descricao = "Suplementar de paciente em vulnerabilidade";

    // Dados específicos para vulnerabilidade
    testData.dados.SITUACAO_VULNERABILIDADE = "SIM";
    testData.dados.TIPO_VULNERABILIDADE = "SOCIAL";
    testData.dados.MOTIVO_ALTA = "Alta médica com suporte social";
    testData.dados.OBSERVACOES =
      "Paciente em vulnerabilidade com alta bem-sucedida";
    testData.dados.ACOMPANHANTE = "SIM";
    testData.dados.NOME_ACOMPANHANTE = "João Silva";
    testData.dados.RESUMO_ALTA = "Alta com suporte social adequado";

    await this.testRunner.runTest(testData);
  }

  async runScenario(scenarioNumber: number): Promise<void> {
    const scenarios = [
      this.scenarioSuplementarBasica,
      this.scenarioSuplementarCompleta,
      this.scenarioSuplementarEmergencia,
      this.scenarioSuplementarRecemNascido,
      this.scenarioSuplementarReinternacao,
      this.scenarioSuplementarRecaida,
      this.scenarioSuplementarParticular,
      this.scenarioSuplementarVulnerabilidade,
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
      "1. Suplementar Básica - Dados mínimos obrigatórios",
      "2. Suplementar Completa - Todos os campos obrigatórios e opcionais",
      "3. Suplementar Emergência - Suplementar de emergência",
      "4. Suplementar Recém-nascido - Suplementar de recém-nascido",
      "5. Suplementar Reinternação - Suplementar de reinternação",
      "6. Suplementar Recaída - Suplementar por recaída",
      "7. Suplementar Particular - Suplementar de paciente particular",
      "8. Suplementar Vulnerabilidade - Suplementar de paciente vulnerável",
    ];
  }
}

