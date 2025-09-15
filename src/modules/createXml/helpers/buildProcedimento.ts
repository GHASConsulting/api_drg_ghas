import { MedicoProcedimento } from '../../../models/medicoProcedimento'
import { Procedimento } from '../../../models/procedimento'
import { converterData } from '../../../utils/formatDate_yyyy-mm-dd'
import knex from '../../../config/database'

/** @description buildProcedimento is a function for buil all elements in the tag <procedimento></procedimento> for the XML. This function recebe a item for select in tbl_dti_atendimento, using the set methodos in the class Procedimento. A function return all itens with your informations.  */
export async function buildProcediemnto(
  procedimentoItens: any,
  CD_DTI_ATENDIMENTO: any,
): Promise<Procedimento> {
  const TBL_PROCEDIMENTO = process.env.TBL_PROCEDIMENTO
  const procedimento = new Procedimento()
  procedimento.setCodigoProcedimento(procedimentoItens.CD_PROCEDIMENTO)
  const formatedDateExecucao = converterData(procedimentoItens.DT_EXEC)

  procedimento.setDataExecucao(formatedDateExecucao)
  const formatedDateAutorizacao = converterData(
    procedimentoItens.DT_AUTORIZACAO,
  )

  const formatedDataSolicitacao = converterData(procedimentoItens.DT_SOLIC)
  procedimento.setDataSolicitacao(formatedDataSolicitacao)
  procedimento.setDataAutorizacao(formatedDateAutorizacao)

  const formatedDataExecucaoFinal = converterData(procedimentoItens.DT_FIM_EXEC)

  procedimento.setDataExecucaoFinal(formatedDataExecucaoFinal)

  const CodigoCirurgia = procedimentoItens.CD_CIRURGIA_AVISO
  const CD_PROC = procedimentoItens.CD_PROCEDIMENTO
const dataMedicoProcedimento = await knex
  .select(
    'CRM_MEDICO_PROCEDIMENTO',
    'UF_MEDICO_PROCEDIMENTO',
    'TP_ATUACAO_MEDICO_PROCEDIMENTO',
  )
  .distinct('CD_CIRURGIA_AVISO')
  .from(TBL_PROCEDIMENTO)
  .where({ CD_CIRURGIA_AVISO: CodigoCirurgia, CD_DTI_ATENDIMENTO, CD_PROCEDIMENTO: CD_PROC })
for (const medicoProcedimentoItens of dataMedicoProcedimento) {
  const medicoProcedimento = new MedicoProcedimento()
  medicoProcedimento.setUf(medicoProcedimentoItens.UF_MEDICO_PROCEDIMENTO)
  medicoProcedimento.setCrm(medicoProcedimentoItens.CRM_MEDICO_PROCEDIMENTO)
  medicoProcedimento.setTipoAtuacao(
    medicoProcedimentoItens.TP_ATUACAO_MEDICO_PROCEDIMENTO,
  )
  procedimento.addMedicoProcedimento(medicoProcedimento)
}

return procedimento
}
