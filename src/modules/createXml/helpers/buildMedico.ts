import { Medico } from '../../../models/medico'

export async function buildMedico(medicalItens: any): Promise<Medico> {
  const medico = new Medico()
  medico.setNome(medicalItens.NM_MEDICO)
  medico.setDdd(medicalItens.DDD_MEDICO)
  medico.setTelefone(medicalItens.NR_TELEFONE_MEDICO)
  medico.setEmail(medicalItens.EMAIL_MEDICO)
  medico.setUf(medicalItens.UF_MEDICO)
  medico.setCrm(medicalItens.CRM_MEDICO)
  medico.setEspecialidade(medicalItens.ESPECIALIDADE_MEDICO)
  medico.setMedicoResponsavel(medicalItens.MEDICO_RESPONSAVEL)
  medico.setTipoAtuacao(medicalItens.TP_ATUACAO_MEDICO)
  return medico
}
