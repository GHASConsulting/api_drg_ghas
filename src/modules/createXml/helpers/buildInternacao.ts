import knex from '../../../config/database'
import { AltaAdministrativa } from '../../../models/altaAdministrativa'
import { CondicaoAdquirida } from '../../../models/condicaoAdquirida'
import { Internacao } from '../../../models/internacao'
import { PartoAdequado } from '../../../models/partoAdequado'
import { converterData } from '../../../utils/formatDate_yyyy-mm-dd'
import { buildCateterVascularCentral } from './buildCateterVascularCentral'
import { buildCidSecundario } from './buildCidSecundario'
import { buildCti } from './buildCti'
import { buildHospital } from './buildHospital'
import { buildMedico } from './buildMedico'
import { buildOperadora } from './buildOperadora'
import { buildPaciente } from './buildPaciente'
import { buildProcediemnto } from './buildProcedimento'
import { buildSondaVesicalDeDemora } from './buildSondaVesicalDeDemora'
import { buildSuporteVentilatorioFromDatabase } from './buildSuporteVentilatorioFromDatabase'

/**
 *
 * @param item is a item of select
 * @returns every data of <internacao> tag for mount a XML.
 */
export async function buildInternacao(item: any): Promise<Internacao> {
  const TBL_MEDICO = process.env.TBL_MEDICO
  const TBL_CID_SEC = process.env.TBL_CID_SEC
  const TBL_PROCEDIMENTO = process.env.TBL_PROCEDIMENTO
  const TBL_CTI = process.env.TBL_CTI
  const TBL_SUPORTEVENTILATORIO = process.env.TBL_SUPORTEVENTILATORIO
  const TBL_CATETERVASCULARCENTRAL = process.env.TBL_CATETERVASCULARCENTRAL
  const TBL_SONDAVESICALDEDEMORA = process.env.TBL_SONDAVESICALDEDEMORA
  const internacao = new Internacao()

  const CD_DTI_ATENDIMENTO = item.CD_DTI_ATENDIMENTO
  internacao.setSituacao(item.SITUACAO_INTERNACAO)
  internacao.setCaraterInternacao(item.CARATER_INTERNACAO)
  internacao.setNumeroRegistro(item.NUMEROREGISTRO)
  internacao.setNumeroAtendimento(item.NR_ATENDIMENTO)
  internacao.setNumeroAutorizacao(item.NR_AUTORIZACAO)
  // console.log('item.dataAlta' + item.DT_ALTA)
  internacao.setLeito(item.DS_LEITO)
  // const formatedDate: any = converterData(item.DT_INTERNACAO)
  const formatedDate: any = converterData(item.DT_INTERNACAO)
  // console.log("teste")
  internacao.setDataInternacao(formatedDate)

  const formatedDateAlta: any = converterData(item.DT_ALTA)
  internacao.setDataAlta(formatedDateAlta)
  internacao.setCondicaoAlta(item.CONDICAO_ALTA)
  internacao.setCodigoCidPrincipal(item.CD_CID_PRINCIPAL)
  internacao.setDataAutorizacao(item.DT_AUTORIZACAO)
  internacao.setInternadoOutrasVezes(item.INTERNADO_OUTRAS_VEZES)
  internacao.setReiternacao(item.REITERNACAO)
  internacao.setRecaida(item.RECAIDA)

  // eslint-disable-next-line eqeqeq
  if (item.SITUACAO_INTERNACAO == 2 || item.SITUACAO_INTERNACAO == 3) {
    internacao.setAcao('COMPLEMENTAR')
  }else if (item.SITUACAO_INTERNACAO == 5 ){
    internacao.setAcao('EXCLUIR')
  } else {
    internacao.setAcao('')
  }



  const hospital = await buildHospital(item)
  internacao.addHospital(hospital)

  const paciente = await buildPaciente(item)
  if (item.CD_OPERADORA) {
    const operadora = await buildOperadora(item)
    paciente.setParticular('N')
    internacao.addOpradora(operadora)
  } else {
   paciente.setParticular('N')
    console.log('setado pra N por que não tem operadora')
  }
  internacao.addPaciente(paciente)

  const dataMedicoFromDatabase = await knex
    .select(
      'CD_DTI_ATENDIMENTO',
      'NM_MEDICO',
      'DDD_MEDICO',
      'NR_TELEFONE_MEDICO',
      'EMAIL_MEDICO',
      'UF_MEDICO',
      'CRM_MEDICO',
      'ESPECIALIDADE_MEDICO',
      'MEDICO_RESPONSAVEL',
      'TP_ATUACAO_MEDICO',
    )
    .distinct('CRM_MEDICO')
    .from(TBL_MEDICO)
    .where({ CD_DTI_ATENDIMENTO })

  for (const medicalItens of dataMedicoFromDatabase) {
    const medico = await buildMedico(medicalItens)
    internacao.addMedico(medico)
  }

  const dataCidFromDatabase = await knex
    .select('CD_CID')
    .from(TBL_CID_SEC)
    .where({ CD_DTI_ATENDIMENTO })
  for (const cidItens of dataCidFromDatabase) {
    const cidSecundario = await buildCidSecundario(cidItens)
    internacao.addCidSecundario(cidSecundario)
  }

  const dataProcedimentoFromDatabase = await knex
    .select(
      'CD_PROCEDIMENTO',
      'DT_EXEC',
      'DT_SOLIC',
      'DT_FIM_EXEC',
      'CD_CIRURGIA_AVISO',
    )
    .distinct('CD_CIRURGIA_AVISO')
    .from(TBL_PROCEDIMENTO)
    .where({ CD_DTI_ATENDIMENTO })

  for (const procedimentoItens of dataProcedimentoFromDatabase) {
    const procedimento = await buildProcediemnto(
      procedimentoItens,
      CD_DTI_ATENDIMENTO,
    )
    internacao.addProcedimento(procedimento)
  }
  const dataCtiFromDatabase = await knex
    .select(
      'DT_INICIAL_CTI',
      'DT_FINAL_CTI',
      'CD_CID_PRINCIPAL',
      'CONDICAO_ALTA_CTI',
      'UF_CTI',
      'CRM_CTI',
      'NM_HOSPITAL',
      'CD_HOSPITAL',
      'DS_LEITO',
      'TIPO',
    )
    .from(TBL_CTI)
    .where({ CD_DTI_ATENDIMENTO })
  for (const ctiItens of dataCtiFromDatabase) {
    const cti = await buildCti(ctiItens)
    internacao.addCti(cti)
  }

  const dataSuporteVentilatorioFromDatabase = await knex
    .select(
      'CD_DTI_ATENDIMENTO',
      'DT_INICIAL_SUP_VENTILATORIO',
      'DT_FINAL_SUP_VENTILATORIO',
    )
    .from(TBL_SUPORTEVENTILATORIO)
    .where({ CD_DTI_ATENDIMENTO })

  for (const suporteVentilatorioItem of dataSuporteVentilatorioFromDatabase) {
    const suporteVentilatorio = await buildSuporteVentilatorioFromDatabase(
      suporteVentilatorioItem,
    )
    internacao.addSuporteVentilatorio(suporteVentilatorio)
  }

  const condicaoAdquirida = new CondicaoAdquirida()
  condicaoAdquirida.setCodigoCondicaoAdquirida(item.CD_CONDICAO_ADQUIRIDA)
  condicaoAdquirida.setDataOcorrencia(item.DT_OCORRENCIA_SUP)
  internacao.addCondicaoAdquirida(condicaoAdquirida)

  const altaAdministrativa = new AltaAdministrativa()
  altaAdministrativa.setNumeroAtendimento(item.NR_ATEND_ALTA_ADM)
  altaAdministrativa.setNumeroAutorizacao(item.NR_AUTORIZACAO_ALTA_ADM)
  internacao.addAltaAdministrativa(altaAdministrativa)

  const partoAdequado = new PartoAdequado()
  partoAdequado.setMedicacaoInducaoParto(item.MEDICACAO_INDUCAO_PARTO)
  partoAdequado.setCesariana(item.CESARIANA_PARTO_ADEQUADO)
  partoAdequado.setNumeroPartosAnteriores(item.NR_PARTOS_ANTERIORES)

  internacao.addPartoAdequado(partoAdequado)

  const dataSondaVesicalDeDemoraFromDatabase = await knex
    .select('*')
    .from(TBL_SONDAVESICALDEDEMORA)
    .where({ CD_DTI_ATENDIMENTO })

  for (const itemSonda of dataSondaVesicalDeDemoraFromDatabase) {
    const sondaVesicalDeDemora = await buildSondaVesicalDeDemora(itemSonda)
    internacao.addSondaVesicalDeDemora(sondaVesicalDeDemora)
  }

  const dataCateterVascularCentralFromDatabase = await knex
    .select('*')
    .from(TBL_CATETERVASCULARCENTRAL)
    .where({ CD_DTI_ATENDIMENTO })

  for (const itemCateter of dataCateterVascularCentralFromDatabase) {
    const cateterVascularCentral =
      await buildCateterVascularCentral(itemCateter)

    internacao.addCateterVascularCentral(cateterVascularCentral)
  }

  return internacao
}
