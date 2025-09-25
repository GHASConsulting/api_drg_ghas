import * as fs from "fs";
import * as path from "path";
import { xml2js } from "xml-js";
import knex from "../config/database";

interface Estabelecimento8Data {
  situacao: string;
  caraterInternacao: string;
  numeroRegistro: string;
  numeroAtendimento: string;
  dataInternacao: string;
  codigoCidPrincipal?: string;
  acao: string;
  hospital: {
    codigo: string;
    nome: string;
    cnes: string;
    porte: string;
    complexidade: string;
    esferaAdministrativa: string;
    uf: string;
    cidade: string;
    tipoLogradouro: string;
    logradouro: string;
    numeroLogradouro: string;
    bairro: string;
    cep: string;
  };
  beneficiario: {
    dataNascimento: string;
    sexo: string;
    cpf: string;
    particular: string;
    uf: string;
    tipoLogradouro: string;
    logradouro: string;
    numeroLogradouro: string;
    complementoLogradouro?: string;
    bairro: string;
    cep: string;
    recemNascido: string;
    cns: string;
  };
  operadora: {
    codigo: string;
    plano?: string;
    numeroCarteira: string;
  };
  medicos: Array<{
    nome: string;
    ddd: string;
    telefone: string;
    uf: string;
    crm: string;
    especialidade?: string;
    medicoResponsavel: string;
    email?: string;
  }>;
  procedimentos?: Array<{
    codigoProcedimento: string;
    dataExecucao: string;
    dataSolicitacao: string;
    dataExecucaoFinal: string;
    medicosProcedimento: Array<{
      uf: string;
      crm: string;
      tipoAtuacao: string;
    }>;
  }>;
  cti?: {
    dataInicial: string;
    dataFinal: string;
    condicaoAlta: string;
    uf: string;
    tipo: string;
    crm: string;
    condigoHospital: string;
    nomeHospital: string;
  };
}

export class Estabelecimento8DataImporter {
  private dataDir: string;

  constructor() {
    this.dataDir = path.join(process.cwd(), "docs", "estabelecimento_8");
  }

  async importAllData(): Promise<void> {
    console.log("🏥 Iniciando importação dos dados do Estabelecimento 8...");

    try {
      // Lista todos os arquivos XML
      const files = fs
        .readdirSync(this.dataDir)
        .filter(
          (file) => file.endsWith(".xml") && file.startsWith("atendimento_")
        );

      console.log(`📁 Encontrados ${files.length} arquivos XML para importar`);

      let importedCount = 0;
      let errorCount = 0;

      for (const file of files) {
        try {
          await this.importXmlFile(file);
          importedCount++;
          console.log(`✅ ${file} importado com sucesso`);
        } catch (error) {
          errorCount++;
          console.error(`❌ Erro ao importar ${file}:`, error.message);
        }
      }

      console.log(`\n📊 Resumo da importação:`);
      console.log(`✅ Importados: ${importedCount}`);
      console.log(`❌ Erros: ${errorCount}`);
      console.log(`📁 Total: ${files.length}`);
    } catch (error) {
      console.error("❌ Erro durante a importação:", error);
      throw error;
    }
  }

  private async importXmlFile(filename: string): Promise<void> {
    const filePath = path.join(this.dataDir, filename);
    const xmlContent = fs.readFileSync(filePath, "utf8");

    // Converte XML para JSON
    const result = xml2js(xmlContent, { compact: true }) as any;
    const internacao = result.loteInternacao.Internacao;

    // Extrai dados estruturados
    const data = this.extractDataFromXml(internacao);

    // Insere no banco de dados
    await this.insertDataToDatabase(data, filename);
  }

  private extractDataFromXml(internacao: any): Estabelecimento8Data {
    // Extrai dados do hospital
    const hospital = internacao.Hospital;

    // Extrai dados do beneficiário
    const beneficiario = internacao.Beneficiario;

    // Extrai dados da operadora
    const operadora = internacao.Operadora;

    // Extrai médicos (pode ser array ou objeto único)
    let medicos = internacao.Medico;
    if (!Array.isArray(medicos)) {
      medicos = [medicos];
    }

    // Extrai procedimentos (opcional)
    let procedimentos = internacao.Procedimento;
    if (procedimentos && !Array.isArray(procedimentos)) {
      procedimentos = [procedimentos];
    }

    // Extrai dados de CTI (opcional)
    const cti = internacao.Cti;

    return {
      situacao: internacao.situacao._text || internacao.situacao,
      caraterInternacao:
        internacao.caraterInternacao._text || internacao.caraterInternacao,
      numeroRegistro:
        internacao.numeroRegistro._text || internacao.numeroRegistro,
      numeroAtendimento:
        internacao.numeroAtendimento._text || internacao.numeroAtendimento,
      dataInternacao:
        internacao.dataInternacao._text || internacao.dataInternacao,
      codigoCidPrincipal:
        internacao.codigoCidPrincipal?._text || internacao.codigoCidPrincipal,
      acao: internacao.acao._text || internacao.acao,
      hospital: {
        codigo: hospital.codigo._text || hospital.codigo,
        nome: hospital.nome._text || hospital.nome,
        cnes: hospital.cnes._text || hospital.cnes,
        porte: hospital.porte._text || hospital.porte,
        complexidade: hospital.complexidade._text || hospital.complexidade,
        esferaAdministrativa:
          hospital.esferaAdministrativa._text || hospital.esferaAdministrativa,
        uf: hospital.uf._text || hospital.uf,
        cidade: hospital.cidade._text || hospital.cidade,
        tipoLogradouro:
          hospital.tipoLogradouro._text || hospital.tipoLogradouro,
        logradouro: hospital.logradouro._text || hospital.logradouro,
        numeroLogradouro:
          hospital.numeroLogradouro._text || hospital.numeroLogradouro,
        bairro: hospital.bairro._text || hospital.bairro,
        cep: hospital.cep._text || hospital.cep,
      },
      beneficiario: {
        dataNascimento:
          beneficiario.dataNascimento._text || beneficiario.dataNascimento,
        sexo: beneficiario.sexo._text || beneficiario.sexo,
        cpf: beneficiario.cpf._text || beneficiario.cpf,
        particular: beneficiario.particular._text || beneficiario.particular,
        uf: beneficiario.uf._text || beneficiario.uf,
        tipoLogradouro:
          beneficiario.tipoLogradouro._text || beneficiario.tipoLogradouro,
        logradouro: beneficiario.logradouro._text || beneficiario.logradouro,
        numeroLogradouro:
          beneficiario.numeroLogradouro._text || beneficiario.numeroLogradouro,
        complementoLogradouro:
          beneficiario.complementoLogradouro?._text ||
          beneficiario.complementoLogradouro,
        bairro: beneficiario.bairro._text || beneficiario.bairro,
        cep: beneficiario.cep._text || beneficiario.cep,
        recemNascido:
          beneficiario.recemNascido._text || beneficiario.recemNascido,
        cns: beneficiario.cns._text || beneficiario.cns,
      },
      operadora: {
        codigo: operadora.codigo._text || operadora.codigo,
        plano: operadora.plano?._text || operadora.plano,
        numeroCarteira:
          operadora.numeroCarteira._text || operadora.numeroCarteira,
      },
      medicos: medicos.map((medico: any) => ({
        nome: medico.nome._text || medico.nome,
        ddd: medico.ddd._text || medico.ddd,
        telefone: medico.telefone._text || medico.telefone,
        uf: medico.uf._text || medico.uf,
        crm: medico.crm._text || medico.crm,
        especialidade: medico.especialidade?._text || medico.especialidade,
        medicoResponsavel:
          medico.medicoResponsavel._text || medico.medicoResponsavel,
        email: medico.email?._text || medico.email,
      })),
      procedimentos: procedimentos?.map((proc: any) => ({
        codigoProcedimento:
          proc.codigoProcedimento._text || proc.codigoProcedimento,
        dataExecucao: proc.dataExecucao._text || proc.dataExecucao,
        dataSolicitacao: proc.dataSolicitacao._text || proc.dataSolicitacao,
        dataExecucaoFinal:
          proc.dataExecucaoFinal._text || proc.dataExecucaoFinal,
        medicosProcedimento: Array.isArray(proc.MedicoProcedimento)
          ? proc.MedicoProcedimento.map((mp: any) => ({
              uf: mp.uf._text || mp.uf,
              crm: mp.crm._text || mp.crm,
              tipoAtuacao: mp.tipoAtuacao._text || mp.tipoAtuacao,
            }))
          : [
              {
                uf:
                  proc.MedicoProcedimento.uf._text ||
                  proc.MedicoProcedimento.uf,
                crm:
                  proc.MedicoProcedimento.crm._text ||
                  proc.MedicoProcedimento.crm,
                tipoAtuacao:
                  proc.MedicoProcedimento.tipoAtuacao._text ||
                  proc.MedicoProcedimento.tipoAtuacao,
              },
            ],
      })),
      cti: cti
        ? {
            dataInicial: cti.dataInicial._text || cti.dataInicial,
            dataFinal: cti.dataFinal._text || cti.dataFinal,
            condicaoAlta: cti.condicaoAlta._text || cti.condicaoAlta,
            uf: cti.uf._text || cti.uf,
            tipo: cti.tipo._text || cti.tipo,
            crm: cti.crm._text || cti.crm,
            condigoHospital: cti.condigoHospital._text || cti.condigoHospital,
            nomeHospital: cti.nomeHospital._text || cti.nomeHospital,
          }
        : undefined,
    };
  }

  private async insertDataToDatabase(
    data: Estabelecimento8Data,
    filename: string
  ): Promise<void> {
    const transaction = await knex.transaction();

    try {
      // Insere dados do hospital (se não existir)
      await this.insertHospital(transaction, data.hospital);

      // Insere dados do paciente
      await this.insertPaciente(transaction, data.beneficiario);

      // Insere dados da operadora (se não existir)
      await this.insertOperadora(transaction, data.operadora);

      // Insere médicos
      for (const medico of data.medicos) {
        await this.insertMedico(transaction, medico);
      }

      // Insere dados da internação
      const internacaoId = await this.insertInternacao(
        transaction,
        data,
        filename
      );

      // Insere procedimentos (se existirem)
      if (data.procedimentos) {
        for (const procedimento of data.procedimentos) {
          await this.insertProcedimento(
            transaction,
            procedimento,
            internacaoId
          );
        }
      }

      // Insere dados de CTI (se existirem)
      if (data.cti) {
        await this.insertCti(transaction, data.cti, internacaoId);
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  private async insertHospital(transaction: any, hospital: any): Promise<void> {
    const existing = await transaction("tbl_dti_hospital")
      .where("cd_hospital", hospital.codigo)
      .first();

    if (!existing) {
      await transaction("tbl_dti_hospital").insert({
        cd_hospital: hospital.codigo,
        nm_hospital: hospital.nome,
        cd_cnes: hospital.cnes,
        cd_porte: hospital.porte,
        cd_complexidade: hospital.complexidade,
        cd_esfera_administrativa: hospital.esferaAdministrativa,
        cd_uf: hospital.uf,
        cd_cidade: hospital.cidade,
        ds_tipo_logradouro: hospital.tipoLogradouro,
        ds_logradouro: hospital.logradouro,
        nr_logradouro: hospital.numeroLogradouro,
        ds_bairro: hospital.bairro,
        cd_cep: hospital.cep,
        dt_criacao: new Date(),
        dt_atualizacao: new Date(),
      });
    }
  }

  private async insertPaciente(
    transaction: any,
    beneficiario: any
  ): Promise<void> {
    const existing = await transaction("tbl_dti_paciente")
      .where("cpf_pac", beneficiario.cpf)
      .first();

    if (!existing) {
      await transaction("tbl_dti_paciente").insert({
        cpf_pac: beneficiario.cpf,
        dt_nascimento: new Date(beneficiario.dataNascimento),
        sexo_pac: beneficiario.sexo,
        particular: beneficiario.particular,
        cd_uf: beneficiario.uf,
        ds_tipo_logradouro: beneficiario.tipoLogradouro,
        ds_logradouro: beneficiario.logradouro,
        nr_logradouro: beneficiario.numeroLogradouro,
        ds_complemento_logradouro: beneficiario.complementoLogradouro,
        ds_bairro: beneficiario.bairro,
        cd_cep: beneficiario.cep,
        recem_nascido: beneficiario.recemNascido,
        cns_pac: beneficiario.cns,
        dt_criacao: new Date(),
        dt_atualizacao: new Date(),
      });
    }
  }

  private async insertOperadora(
    transaction: any,
    operadora: any
  ): Promise<void> {
    const existing = await transaction("tbl_dti_operadora")
      .where("cd_operadora", operadora.codigo)
      .first();

    if (!existing) {
      await transaction("tbl_dti_operadora").insert({
        cd_operadora: operadora.codigo,
        nm_operadora: operadora.plano || "Operadora " + operadora.codigo,
        dt_criacao: new Date(),
        dt_atualizacao: new Date(),
      });
    }
  }

  private async insertMedico(transaction: any, medico: any): Promise<void> {
    const existing = await transaction("tbl_dti_medico")
      .where("crm_medico", medico.crm)
      .where("cd_uf", medico.uf)
      .first();

    if (!existing) {
      await transaction("tbl_dti_medico").insert({
        crm_medico: medico.crm,
        nm_medico: medico.nome,
        cd_ddd: medico.ddd,
        nr_telefone: medico.telefone,
        cd_uf: medico.uf,
        ds_especialidade: medico.especialidade,
        medico_responsavel: medico.medicoResponsavel === "S",
        ds_email: medico.email,
        dt_criacao: new Date(),
        dt_atualizacao: new Date(),
      });
    }
  }

  private async insertInternacao(
    transaction: any,
    data: Estabelecimento8Data,
    filename: string
  ): Promise<number> {
    const [result] = await transaction("tbl_dti_atendimento")
      .insert({
        nr_atendimento: data.numeroAtendimento,
        id_atendimento: data.numeroRegistro,
        situacao_internacao: parseInt(data.situacao),
        dt_internacao: new Date(data.dataInternacao),
        cd_cid_principal: data.codigoCidPrincipal,
        cd_hospital: data.hospital.codigo,
        cpf_pac: data.beneficiario.cpf,
        cd_operadora: data.operadora.codigo,
        nr_carteira: data.operadora.numeroCarteira,
        carater_internacao: parseInt(data.caraterInternacao),
        acao: data.acao,
        arquivo_origem: filename,
        dt_criacao: new Date(),
        dt_atualizacao: new Date(),
      })
      .returning("id");

    return result.id;
  }

  private async insertProcedimento(
    transaction: any,
    procedimento: any,
    internacaoId: number
  ): Promise<void> {
    const [procResult] = await transaction("tbl_dti_procedimento")
      .insert({
        cd_dti_atendimento: internacaoId,
        cd_procedimento: procedimento.codigoProcedimento,
        dt_execucao: new Date(procedimento.dataExecucao),
        dt_solicitacao: new Date(procedimento.dataSolicitacao),
        dt_execucao_final: new Date(procedimento.dataExecucaoFinal),
        dt_criacao: new Date(),
        dt_atualizacao: new Date(),
      })
      .returning("id");

    // Insere médicos do procedimento
    for (const medicoProc of procedimento.medicosProcedimento) {
      await transaction("tbl_dti_medico_procedimento").insert({
        cd_dti_procedimento: procResult.id,
        crm_medico: medicoProc.crm,
        cd_uf: medicoProc.uf,
        tipo_atuacao: medicoProc.tipoAtuacao,
        dt_criacao: new Date(),
        dt_atualizacao: new Date(),
      });
    }
  }

  private async insertCti(
    transaction: any,
    cti: any,
    internacaoId: number
  ): Promise<void> {
    await transaction("tbl_dti_cti").insert({
      cd_dti_atendimento: internacaoId,
      dt_inicial: new Date(cti.dataInicial),
      dt_final: new Date(cti.dataFinal),
      condicao_alta: cti.condicaoAlta,
      cd_uf: cti.uf,
      ds_tipo: cti.tipo,
      crm_medico: cti.crm,
      cd_hospital: cti.condigoHospital,
      nm_hospital: cti.nomeHospital,
      dt_criacao: new Date(),
      dt_atualizacao: new Date(),
    });
  }

  async getImportedDataCount(): Promise<{ [key: string]: number }> {
    const counts = await Promise.all([
      knex("tbl_dti_hospital").count("* as count").first(),
      knex("tbl_dti_paciente").count("* as count").first(),
      knex("tbl_dti_operadora").count("* as count").first(),
      knex("tbl_dti_medico").count("* as count").first(),
      knex("tbl_dti_atendimento").count("* as count").first(),
      knex("tbl_dti_procedimento").count("* as count").first(),
      knex("tbl_dti_cti").count("* as count").first(),
    ]);

    return {
      hospitais: parseInt(counts[0].count as string),
      pacientes: parseInt(counts[1].count as string),
      operadoras: parseInt(counts[2].count as string),
      medicos: parseInt(counts[3].count as string),
      atendimentos: parseInt(counts[4].count as string),
      procedimentos: parseInt(counts[5].count as string),
      ctis: parseInt(counts[6].count as string),
    };
  }
}

// Função para executar a importação
export async function importEstabelecimento8Data(): Promise<void> {
  const importer = new Estabelecimento8DataImporter();

  console.log("🚀 Iniciando importação dos dados do Estabelecimento 8...");

  // Verifica contagem antes da importação
  const beforeCounts = await importer.getImportedDataCount();
  console.log("📊 Dados antes da importação:", beforeCounts);

  // Executa a importação
  await importer.importAllData();

  // Verifica contagem após a importação
  const afterCounts = await importer.getImportedDataCount();
  console.log("📊 Dados após a importação:", afterCounts);

  console.log("✅ Importação concluída com sucesso!");
}

// Executa se chamado diretamente
if (require.main === module) {
  importEstabelecimento8Data()
    .then(() => {
      console.log("🎉 Importação finalizada!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Erro na importação:", error);
      process.exit(1);
    });
}
