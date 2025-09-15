import { MedicoProcedimento } from '../../../models/medicoProcedimento'

export async function buildMedicoProcedimento(
  medicoProcedimentoItem: any,
): Promise<MedicoProcedimento> {
  const medicoProcedimento = new MedicoProcedimento()
  medicoProcedimento.setUf(medicoProcedimentoItem.UF_MEDICO_PROCEDIMENTO)
  medicoProcedimento.setCrm(medicoProcedimentoItem.CRM_MEDICO_PROCEDIMENTO)
  medicoProcedimento.setTipoAtuacao(
    medicoProcedimentoItem.TP_ATUACAO_MEDICO_PROCEDIMENTO,
  )

  return medicoProcedimento
}
