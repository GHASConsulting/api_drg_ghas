import knex from "../config/database";
import { v4 as uuidv4 } from "uuid";

export interface TestData {
  id: string;
  situacao: number;
  nome: string;
  descricao: string;
  dados: any;
  obrigatorios: string[];
  opcionais: string[];
}

export class TestDataGenerator {
  private baseData: any = null;

  async loadBaseData(): Promise<void> {
    // Força o uso dos dados reais do Hospital INOVEMED para testes
    this.baseData = this.createRealHospitalData();
    console.log("✅ Dados reais do Hospital INOVEMED carregados para teste");

    // Comentado: busca no banco (pode ser reativado se necessário)
    /*
    try {
      // Tenta buscar um caso de sucesso no banco
      const successCase = await knex("tbl_dti_atendimento")
        .where("situacao_internacao", 1) // Admissional
        .first();

      if (successCase) {
        this.baseData = successCase;
        console.log("✅ Dados base carregados do banco com sucesso");
      } else {
        // Se não há dados no banco, usa dados reais do INOVEMED
        this.baseData = this.createRealHospitalData();
        console.log("✅ Dados reais do Hospital INOVEMED carregados para teste");
      }
    } catch (error) {
      console.log(
        "⚠️ Erro ao acessar banco, usando dados reais do INOVEMED:",
        error.message
      );
      // Se houver erro de conexão, usa dados reais do INOVEMED
      this.baseData = this.createRealHospitalData();
      console.log("✅ Dados reais do Hospital INOVEMED carregados para teste");
    }
    */
  }

  private createRealHospitalData(): any {
    // Dados baseados no arquivo CSV fornecido - Hospital INOVEMED
    return {
      id_atendimento: 1,
      nr_atendimento: 123456789,
      situacao_internacao: 1,
      carater_internacao: 1,
      procedencia_paciente: "M", // Comunidade
      leito: "101",
      nr_operadora_fonte_pagadora: "123456",
      nr_registro: "REG123456",
      dt_internacao: new Date().toISOString().split("T")[0],
      dt_alta: null,
      condicao_alta: null,
      dt_autorizacao: new Date().toISOString().split("T")[0],
      cd_cid_principal: "I10", // Hipertensão essencial
      paciente_internado_outras_vezes: "N",
      hospital_internacao_anterior: null,
      ultima_internacao_30_dias: "N",
      internacao_complicacao_recaida: "N",
      acao: "I",
      nenhum_dispositivo_terapeutico: "S",
      nota: "Paciente internado para tratamento",
      tipo_nota: "OBSERVACAO",
      dt_nota: new Date().toISOString().split("T")[0],
      // Dados reais do Hospital INOVEMED
      cd_hospital: 9948,
      nm_hospital: "INOVEMED",
      cnes_hospital: 124,
      porte_hospital: 2,
      complexidade_hospital: 2,
      esfera_adm_hospital: 1,
      uf_hospital: "MG",
      cidade_hospital: "Minas Gerais",
      tp_logradouro_hospital: "AVENIDA",
      logradouro_hospital: "NISIO BATISTA DE OLIVEIRA",
      nr_logradouro_hospital: 400,
      complemento_logradouro_hospital: "S/N",
      bairro_hospital: "SAO LUCAS",
      cep_hospital: "30240510",
      dt_nasc_pac: "1980-05-15",
      sexo_pac: "M",
      cpf_pac: "12345678909",
      cns_pac: "123456789012345",
      recem_nascido_pac: "N",
      particular_pac: "N",
      vulnerabilidade_social_pac: "N",
      uf_pac: "SP",
      cidade_pac: "São Paulo",
      tp_logradouro_pac: "RUA",
      logradouro_pac: "Rua do Paciente",
      nr_logradouro_pac: "456",
      complemento_logradouro_pac: "B",
      bairro_pac: "Vila Nova",
      cep_pac: "01234567",
      cd_operadora: "3945", // Operadora do Estabelecimento 8
      plano_operadora: "Operadora 3945",
      nr_carteira: "CART123",
      dt_validade_operadora: "2025-12-31",
      tp_sup_vent: null,
      local_sup_vent: null,
      tp_invasivo_sup_vent: null,
      dt_inicial_sup_vent: null,
      dt_final_sup_vent: null,
      cd_condicao_adquirida: null,
      dt_ocorrencia_sup: null,
      nr_atend_alta_adm: null,
      nr_autorizacao_alta_adm: null,
      cesariana_parto_adequado: null,
      medicacao_inducao_parto: null,
      nr_partos_anteriores: null,
      tp_status: "ATIVO",
      ds_erro: null,
    };
  }

  generateAdmissionalData(): TestData {
    if (!this.baseData) {
      throw new Error("Dados base não carregados");
    }

    const base = { ...this.baseData };

    // Gera novos IDs únicos
    base.nr_atendimento = this.generateUniqueNumber();
    base.id_atendimento = this.generateUniqueNumber();

    // Define situação como Admissional
    base.situacao_internacao = 1;
    base.acao = "I"; // Inclusão

    // Dados obrigatórios para Admissional
    base.dt_internacao = new Date().toISOString().split("T")[0];
    base.cd_hospital = this.baseData.cd_hospital || 9948; // INOVEMED
    base.cd_operadora = this.baseData.cd_operadora || "346001"; // Unimed (operadora comum)

    // Dados opcionais
    base.dt_alta = null;
    base.condicao_alta = null;

    return {
      id: uuidv4(),
      situacao: 1,
      nome: "Admissional Básico",
      descricao: "Teste de admissão com dados obrigatórios e opcionais",
      dados: base,
      obrigatorios: [
        "nr_atendimento",
        "id_atendimento",
        "situacao_internacao",
        "dt_internacao",
        "cd_hospital",
        "cd_operadora",
      ],
      opcionais: ["dt_alta", "condicao_alta", "cd_cid_principal", "nota"],
    };
  }

  generateProrrogacaoData(): TestData {
    if (!this.baseData) {
      throw new Error("Dados base não carregados");
    }

    const base = { ...this.baseData };

    // Gera novos IDs únicos
    base.nr_atendimento = this.generateUniqueNumber();
    base.id_atendimento = this.generateUniqueNumber();

    // Define situação como Prorrogação
    base.situacao_internacao = 2;
    base.acao = "A"; // Alteração

    // Dados obrigatórios para Prorrogação
    base.dt_internacao = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]; // 7 dias atrás
    base.cd_hospital = this.baseData.cd_hospital || 9948; // INOVEMED
    base.cd_operadora = this.baseData.cd_operadora || "346001"; // Unimed (operadora comum)

    // Dados opcionais
    base.dt_alta = null;
    base.condicao_alta = null;

    return {
      id: uuidv4(),
      situacao: 2,
      nome: "Prorrogação Básica",
      descricao: "Teste de prorrogação com dados obrigatórios e opcionais",
      dados: base,
      obrigatorios: [
        "nr_atendimento",
        "id_atendimento",
        "situacao_internacao",
        "dt_internacao",
        "cd_hospital",
        "cd_operadora",
      ],
      opcionais: ["dt_alta", "condicao_alta", "cd_cid_principal", "nota"],
    };
  }

  generateSuplementarData(): TestData {
    if (!this.baseData) {
      throw new Error("Dados base não carregados");
    }

    const base = { ...this.baseData };

    // Gera novos IDs únicos
    base.nr_atendimento = this.generateUniqueNumber();
    base.id_atendimento = this.generateUniqueNumber();

    // Define situação como Suplementar
    base.situacao_internacao = 3;
    base.acao = "A"; // Alteração

    // Dados obrigatórios para Suplementar
    base.dt_internacao = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]; // 14 dias atrás
    base.dt_alta = new Date().toISOString().split("T")[0];
    base.condicao_alta = "A"; // A-Casa (conforme especificação DRG)
    base.cd_hospital = this.baseData.cd_hospital || 9948; // INOVEMED
    base.cd_operadora = this.baseData.cd_operadora || "346001"; // Unimed (operadora comum)

    return {
      id: uuidv4(),
      situacao: 3,
      nome: "Suplementar Básico",
      descricao: "Teste de suplementar com dados obrigatórios e opcionais",
      dados: base,
      obrigatorios: [
        "nr_atendimento",
        "id_atendimento",
        "situacao_internacao",
        "dt_internacao",
        "dt_alta",
        "condicao_alta",
        "cd_hospital",
        "cd_operadora",
      ],
      opcionais: ["cd_cid_principal", "nota"],
    };
  }

  generateTestScenarios(): TestData[] {
    const scenarios: TestData[] = [];

    // Cenários para Admissional
    scenarios.push(this.generateAdmissionalData());

    // Cenários para Prorrogação
    scenarios.push(this.generateProrrogacaoData());

    // Cenários para Suplementar
    scenarios.push(this.generateSuplementarData());

    return scenarios;
  }

  private generateUniqueNumber(): string {
    return Math.floor(Math.random() * 9000000000) + 1000000000 + "";
  }

  getBaseData(): any {
    return this.baseData;
  }

  setBaseData(data: any): void {
    this.baseData = data;
  }

  async loadEstabelecimento8Data(): Promise<any> {
    try {
      // Carrega dados reais do Estabelecimento 8 da base de dados
      const estabelecimento8Data =
        await this.loadEstabelecimento8FromDatabase();
      if (estabelecimento8Data) {
        console.log(
          "✅ Dados reais do Estabelecimento 8 carregados para teste"
        );
        return estabelecimento8Data;
      }
    } catch (error) {
      console.log(
        "⚠️ Erro ao carregar dados do Estabelecimento 8, usando dados padrão"
      );
    }

    // Fallback para dados padrão
    return this.createRealHospitalData();
  }

  private async loadEstabelecimento8FromDatabase(): Promise<any> {
    try {
      // Busca um atendimento aleatório do Estabelecimento 8 (apenas dados de paciente, operadora, etc.)
      const atendimento = await knex("tbl_dti_atendimento")
        .join(
          "tbl_dti_paciente",
          "tbl_dti_atendimento.cpf_pac",
          "tbl_dti_paciente.cpf_pac"
        )
        .join(
          "tbl_dti_operadora",
          "tbl_dti_atendimento.cd_operadora",
          "tbl_dti_operadora.cd_operadora"
        )
        .where("tbl_dti_atendimento.cd_hospital", "8")
        .orderByRaw("RANDOM()")
        .first();

      if (!atendimento) {
        return null;
      }

      // Busca médicos do atendimento
      const medicos = await knex("tbl_dti_medico")
        .join(
          "tbl_dti_medico_procedimento",
          "tbl_dti_medico.crm_medico",
          "tbl_dti_medico_procedimento.crm_medico"
        )
        .join(
          "tbl_dti_procedimento",
          "tbl_dti_medico_procedimento.cd_dti_procedimento",
          "tbl_dti_procedimento.id"
        )
        .where("tbl_dti_procedimento.cd_dti_atendimento", atendimento.id)
        .select("tbl_dti_medico.*");

      // Busca procedimentos do atendimento
      const procedimentos = await knex("tbl_dti_procedimento").where(
        "cd_dti_atendimento",
        atendimento.id
      );

      // Busca dados de CTI se existirem
      const cti = await knex("tbl_dti_cti")
        .where("cd_dti_atendimento", atendimento.id)
        .first();

      return {
        // Dados do atendimento
        nr_atendimento: atendimento.nr_atendimento,
        id_atendimento: atendimento.id_atendimento,
        situacao_internacao: atendimento.situacao_internacao,
        dt_internacao: atendimento.dt_internacao,
        dt_alta: atendimento.dt_alta,
        condicao_alta: atendimento.condicao_alta || "A",
        cd_cid_principal: atendimento.cd_cid_principal,
        carater_internacao: atendimento.carater_internacao,
        acao: atendimento.acao,

        // Dados do hospital (mantém dados do teste - Hospital INOVEMED)
        cd_hospital: "9948", // Hospital INOVEMED (dados do teste)
        nm_hospital: "INOVEMED - Instituto de Oncologia e Hematologia",
        cd_cnes: "1234567",
        cd_porte: "3",
        cd_complexidade: "3",
        cd_esfera_administrativa: "1",
        cd_uf: "SP",
        cd_cidade: "São Paulo",
        ds_tipo_logradouro: "RUA",
        ds_logradouro: "Rua do Hospital",
        nr_logradouro: "123",
        ds_bairro: "Centro",
        cd_cep: "01234567",

        // Dados do paciente
        cpf_pac: atendimento.cpf_pac,
        dt_nascimento: atendimento.dt_nascimento,
        sexo_pac: atendimento.sexo_pac,
        recem_nascido: atendimento.recem_nascido,
        cns_pac: atendimento.cns_pac,
        cd_uf_pac: atendimento.cd_uf,
        ds_tipo_logradouro_pac: atendimento.ds_tipo_logradouro,
        ds_logradouro_pac: atendimento.ds_logradouro,
        nr_logradouro_pac: atendimento.nr_logradouro,
        ds_complemento_logradouro_pac: atendimento.ds_complemento_logradouro,
        ds_bairro_pac: atendimento.ds_bairro,
        cd_cep_pac: atendimento.cd_cep,

        // Dados da operadora (usa operadora 3945 do Estabelecimento 8)
        cd_operadora: "3945", // Operadora do Estabelecimento 8
        nm_operadora: atendimento.nm_operadora || "Operadora 3945",
        nr_carteira: atendimento.nr_carteira,

        // Dados dos médicos
        medicos: medicos,

        // Dados dos procedimentos
        procedimentos: procedimentos,

        // Dados de CTI
        cti: cti,

        // Campos específicos para cenários
        recemNascido: atendimento.recem_nascido === "S" ? "S" : "N",
        particular: atendimento.particular === "S" ? "S" : "N",
        vulnerabilidade_social: "N", // Default
        codigo_identificacao: null,
        paciente_internado_outras_vezes: "N", // Default
        internacao_complicacao_recaida: "N", // Default
        procedencia: "M", // Default - Comunidade
        leito: "101", // Default
        numero_operadora: "123456", // Default
        numero_registro: "REG123456", // Default
        data_autorizacao: new Date().toISOString().split("T")[0],
        internado_outras_vezes: "N", // Default
        reiternacao: "N", // Default
        recaida: "N", // Default
      };
    } catch (error) {
      console.error("Erro ao carregar dados do Estabelecimento 8:", error);
      return null;
    }
  }
}
