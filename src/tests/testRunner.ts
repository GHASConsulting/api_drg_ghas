import { TestDataGenerator, TestData } from "./testDataGenerator";
import { TestValidator, ValidationResult } from "./testValidator";
import knex from "../config/database";
import { LoteInternacao } from "../models/loteInternacao";
import { buildInternacao } from "../modules/createXml/helpers/buildInternacao";
import { makeRequest } from "../utils/makeRequest";
import { writeLog } from "../utils/writeLogs";

export interface TestResult {
  id: string;
  testData: TestData;
  validation: ValidationResult;
  xmlGenerated: boolean;
  xmlContent?: string;
  drgResponse?: any;
  drgSuccess: boolean;
  drgError?: string;
  executionTime: number;
  timestamp: Date;
}

export class TestRunner {
  private dataGenerator: TestDataGenerator;
  private validator: TestValidator;
  private results: TestResult[] = [];

  constructor() {
    this.dataGenerator = new TestDataGenerator();
    this.validator = new TestValidator();
  }

  async initialize(): Promise<void> {
    await this.dataGenerator.loadBaseData();
  }

  async runAllTests(
    skipDatabase: boolean = false,
    offlineMode: boolean = false
  ): Promise<TestResult[]> {
    console.log("🚀 Iniciando execução de todos os testes...");

    const scenarios = this.dataGenerator.generateTestScenarios();
    const results: TestResult[] = [];

    for (const scenario of scenarios) {
      console.log(`\n📋 Executando teste: ${scenario.nome}`);
      const result = await this.runTest(scenario, skipDatabase, offlineMode);
      results.push(result);
      this.results.push(result);
    }

    console.log(`\n✅ Execução concluída! ${results.length} testes executados`);
    return results;
  }

  async runTest(
    testData: TestData,
    skipDatabase: boolean = false,
    offlineMode: boolean = false
  ): Promise<TestResult> {
    const startTime = Date.now();
    const result: TestResult = {
      id: testData.id,
      testData,
      validation: { isValid: false, errors: [], warnings: [], score: 0 },
      xmlGenerated: false,
      drgSuccess: false,
      executionTime: 0,
      timestamp: new Date(),
    };

    try {
      // 1. Validar dados
      console.log("  🔍 Validando dados...");
      result.validation = this.validator.validateCompleteData(testData);

      if (!result.validation.isValid) {
        console.log(
          `  ❌ Dados inválidos: ${result.validation.errors.join(", ")}`
        );
        result.executionTime = Date.now() - startTime;
        return result;
      }

      // 2. Salvar no banco (opcional)
      if (offlineMode) {
        console.log("  🔌 Modo offline - pulando salvamento no banco");
      } else if (!skipDatabase) {
        console.log("  💾 Salvando dados no banco...");
        try {
          await this.saveTestDataToDatabase(testData);
        } catch (error) {
          console.log(
            "  ⚠️ Erro ao salvar no banco, continuando com o teste..."
          );
        }
      } else {
        console.log("  ⏭️ Pulando salvamento no banco (modo validação)");
      }

      // 3. Gerar XML
      console.log("  📄 Gerando XML...");
      const xml = await this.generateXML(testData, offlineMode);
      result.xmlGenerated = true;
      result.xmlContent = xml;

      // 4. Enviar para DRG
      console.log("  📤 Enviando para DRG...");
      const drgResponse = await this.sendToDRG(
        xml,
        testData.dados.cd_hospital || 9948
      );
      result.drgResponse = drgResponse;
      result.drgSuccess = drgResponse.success;

      if (!drgResponse.success) {
        result.drgError = drgResponse.error;
        console.log(`  ❌ Erro no envio: ${drgResponse.error}`);
      } else {
        console.log("  ✅ Enviado com sucesso!");
      }
    } catch (error) {
      console.error(`  ❌ Erro durante execução: ${error}`);
      result.drgError = error instanceof Error ? error.message : String(error);
    }

    result.executionTime = Date.now() - startTime;
    return result;
  }

  private async saveTestDataToDatabase(testData: TestData): Promise<void> {
    try {
      // Insere apenas os dados que existem na tabela tbl_dti_atendimento
      // Remove campos específicos de teste que não existem na tabela
      const {
        ID_TESTE,
        TIPO_TESTE,
        STATUS_TESTE,
        DT_CRIACAO_TESTE,
        ...dadosParaSalvar
      } = testData.dados;

      await knex("tbl_dti_atendimento").insert(dadosParaSalvar);
      console.log("✅ Dados de teste salvos no banco com sucesso");
    } catch (error) {
      console.error(
        "⚠️ Erro ao salvar dados de teste no banco:",
        error.message
      );
      // Não falha o teste por causa do banco, apenas registra o erro
      console.log("ℹ️ Continuando com o teste sem salvar no banco...");
    }
  }

  private async generateXML(
    testData: TestData,
    offlineMode: boolean = false
  ): Promise<string> {
    try {
      // Cria o lote de internação
      const lote = new LoteInternacao();

      // Constrói a internação
      let internacao;
      if (offlineMode) {
        internacao = await this.buildInternacaoOffline(testData.dados);
      } else {
        internacao = await buildInternacao(testData.dados);
      }
      lote.addInternacao(internacao);

      // Gera o XML
      const xml = lote.generateXML();

      // Log do XML gerado
      await writeLog(xml, `TEST_XML_${testData.id}`);

      return xml;
    } catch (error) {
      console.error("Erro ao gerar XML:", error);
      throw error;
    }
  }

  private async sendToDRG(xml: string, hospitalCode: number): Promise<any> {
    try {
      const response = await makeRequest(xml, hospitalCode);

      // Log da resposta (evita erro de estrutura circular)
      const logData = {
        status: response?.status,
        statusText: response?.statusText,
        data: response?.data,
        headers: response?.headers,
      };
      await writeLog(JSON.stringify(logData), "TEST_DRG_RESPONSE");

      return {
        success: response?.status >= 200 && response?.status < 300,
        status: response?.status,
        data: response?.data,
        error:
          response?.status >= 400
            ? `HTTP ${response?.status}: ${response?.statusText}`
            : null,
      };
    } catch (error) {
      console.error("Erro ao enviar para DRG:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async runCustomTest(situacao: number, customData: any): Promise<TestResult> {
    let testData: TestData;

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

    // Aplica dados customizados
    testData.dados = { ...testData.dados, ...customData };
    testData.id = `custom_${Date.now()}`;

    return await this.runTest(testData);
  }

  async runValidationOnly(testData: TestData): Promise<ValidationResult> {
    return this.validator.validateCompleteData(testData);
  }

  async runOfflineTest(testData: TestData): Promise<TestResult> {
    console.log(`🔌 Executando teste offline: ${testData.nome}`);
    return await this.runTest(testData, true, true);
  }

  async runAllOfflineTests(): Promise<TestResult[]> {
    console.log("🔌 Iniciando execução de todos os testes offline...");
    return await this.runAllTests(true, true);
  }

  private async buildInternacaoOffline(dados: any): Promise<any> {
    // Importa as classes necessárias
    const { Internacao } = await import("../models/internacao");
    const { Hospital } = await import("../models/hospital");
    const { Paciente } = await import("../models/paciente");
    const { Operadora } = await import("../models/operadora");

    // Cria uma internação offline sem depender do banco de dados
    const internacao = new Internacao();

    // Configura dados básicos da internação
    internacao.setAcao(dados.acao || "I");
    internacao.setNumeroAtendimento(
      dados.nr_atendimento || this.generateUniqueNumber()
    );
    internacao.setSituacao(dados.situacao_internacao?.toString() || "1");
    internacao.setCaraterInternacao(dados.carater_internacao || "1");
    internacao.setProcedencia(dados.procedencia_paciente || "M");
    internacao.setLeito(dados.leito || "");
    internacao.setNumeroOperadora(dados.nr_operadora_fonte_pagadora || "");
    internacao.setNumeroRegistro(dados.nr_registro || "");
    internacao.setDataInternacao(
      dados.dt_internacao || new Date().toISOString().split("T")[0]
    );
    internacao.setDataAlta(dados.dt_alta || null);
    internacao.setCondicaoAlta(dados.condicao_alta || "A"); // A-Casa (conforme especificação DRG)
    internacao.setDataAutorizacao(dados.dt_autorizacao || "");
    internacao.setCodigoCidPrincipal(dados.cd_cid_principal || "A41.9");
    internacao.setInternadoOutrasVezes(
      dados.paciente_internado_outras_vezes || "N"
    );
    internacao.setHospitalInternacaoAnterior(
      dados.hospital_internacao_anterior || "I"
    );
    internacao.setReiternacao(dados.ultima_internacao_30_dias || "N");
    internacao.setRecaida(dados.internacao_complicacao_recaida || "N");
    internacao.setNota(
      dados.nota || "Teste offline - sem dependência do banco"
    );

    // Cria hospital
    const hospital = new Hospital();
    hospital.setCodigo(dados.cd_hospital || 9948);
    hospital.setNome(dados.nm_hospital || "INOVEMED");
    hospital.setCnes(dados.cnes_hospital || 124);
    hospital.setUf(dados.uf_hospital || "MG");
    hospital.setCidade(dados.cidade_hospital || "Minas Gerais");
    hospital.setTipoLogradouro(dados.tp_logradouro_hospital || "AVENIDA");
    hospital.setLogradouro(
      dados.logradouro_hospital || "NISIO BATISTA DE OLIVEIRA"
    );
    hospital.setNumeroLogradouro(
      dados.nr_logradouro_hospital?.toString() || "400"
    );
    hospital.setComplementoLogradouro(
      dados.complemento_logradouro_hospital || "S/N"
    );
    hospital.setBairro(dados.bairro_hospital || "SAO LUCAS");
    hospital.setCep(dados.cep_hospital || "30240510");
    internacao.addHospital(hospital);

    // Cria paciente
    const paciente = new Paciente();
    paciente.setCpf(dados.cpf_pac || "12345678909");
    paciente.setCns(dados.cns_pac || "123456789012345");
    paciente.setDataNascimento(dados.dt_nasc_pac || "1980-05-15");
    paciente.setSexo(dados.sexo_pac || "M");
    paciente.setRecemNascido(dados.recem_nascido || "N");
    paciente.setParticular(dados.particular || "N");
    paciente.setCodigoIdentificacao(dados.codigo_identificacao || "");
    paciente.setVulnerabilidadeSocial(dados.vulnerabilidade_social || "N");
    paciente.setUf(dados.uf_pac || "SP");
    paciente.setCidade(dados.cidade_pac || "São Paulo");
    paciente.setTipoLogradouro(dados.tp_logradouro_pac || "RUA");
    paciente.setLogradouro(dados.logradouro_pac || "Rua do Paciente");
    paciente.setNumeroLogradouro(dados.nr_logradouro_pac || "456");
    paciente.setComplementoLogradouro(dados.complemento_logradouro_pac || "B");
    paciente.setBairro(dados.bairro_pac || "Vila Nova");
    paciente.setCep(dados.cep_pac || "01234567");
    internacao.addPaciente(paciente);

    // Cria operadora (apenas se não for particular)
    if (dados.particular !== "S") {
      const operadora = new Operadora();
      operadora.setCodigo(dados.cd_operadora || "3945"); // Operadora do Estabelecimento 8
      operadora.setPlano(dados.plano_operadora || "Operadora 3945");
      operadora.setNumeroCarteira(dados.nr_carteira || "3945123456");
      internacao.addOpradora(operadora);
    }

    return internacao;
  }

  private generateUniqueNumber(): string {
    return Math.floor(Math.random() * 9000000000) + 1000000000 + "";
  }

  async cleanupTestData(): Promise<void> {
    try {
      // Remove dados de teste antigos (mais de 24 horas)
      const cutoffDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

      await knex("tbl_dti_atendimento")
        .whereNotNull("ID_TESTE")
        .where("DT_CRIACAO_TESTE", "<", cutoffDate)
        .del();

      console.log("🧹 Limpeza de dados de teste concluída");
    } catch (error) {
      console.error("Erro na limpeza de dados:", error);
      throw error;
    }
  }

  getResults(): TestResult[] {
    return this.results;
  }

  getResultsBySituacao(situacao: number): TestResult[] {
    return this.results.filter(
      (result) => result.testData.situacao === situacao
    );
  }

  getResultsByStatus(success: boolean): TestResult[] {
    return this.results.filter((result) => result.drgSuccess === success);
  }

  getStatistics(): any {
    const total = this.results.length;
    const successful = this.results.filter((r) => r.drgSuccess).length;
    const failed = total - successful;
    const avgExecutionTime =
      this.results.reduce((sum, r) => sum + r.executionTime, 0) / total;

    return {
      total,
      successful,
      failed,
      successRate: total > 0 ? (successful / total) * 100 : 0,
      avgExecutionTime,
      bySituacao: {
        1: this.getResultsBySituacao(1).length,
        2: this.getResultsBySituacao(2).length,
        3: this.getResultsBySituacao(3).length,
      },
    };
  }

  async runEstabelecimento8Test(testData: TestData): Promise<TestResult> {
    const startTime = Date.now();
    const testId = this.generateUniqueNumber();

    console.log(
      `🏥 Executando teste com dados reais do Estabelecimento 8: ${testData.situacao}`
    );

    // Valida dados
    const validation = this.validator.validateTestData(testData);
    if (!validation.isValid) {
      console.log(`❌ Dados inválidos: ${validation.errors.join(", ")}`);
      return {
        id: testId,
        testData,
        validation,
        xmlGenerated: false,
        drgSuccess: false,
        drgError: `Dados inválidos: ${validation.errors.join(", ")}`,
        executionTime: Date.now() - startTime,
        timestamp: new Date(),
      };
    }

    console.log(`  🔍 Validando dados...`);

    // Salva dados no banco (dados reais)
    console.log(`  💾 Salvando dados reais no banco...`);
    await this.saveTestDataToDatabase(testData);

    // Gera XML
    console.log(`  📄 Gerando XML...`);
    const xmlContent = await this.generateXML(testData, false);

    // Envia para DRG
    console.log(`  📤 Enviando para DRG...`);
    const drgResult = await this.sendToDRG(
      xmlContent,
      testData.dados.cd_hospital || 9948
    );

    return {
      id: testId,
      testData,
      validation,
      xmlGenerated: true,
      xmlContent: xmlContent,
      drgResponse: drgResult.response,
      drgSuccess: drgResult.success,
      drgError: drgResult.success ? undefined : drgResult.message,
      executionTime: Date.now() - startTime,
      timestamp: new Date(),
    };
  }
}
