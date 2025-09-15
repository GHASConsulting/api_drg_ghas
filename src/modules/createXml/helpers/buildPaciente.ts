import { Paciente } from '../../../models/paciente'
import { converterData } from '../../../utils/formatDate_yyyy-mm-dd'

/** @description build a paciente */
export async function buildPaciente(item: any): Promise<Paciente> {
  const paciente = new Paciente()
  const newDate = converterData(item.DT_NASC_PAC)

  paciente.setDataNacimento(newDate)
  paciente.setSexo(item.SEXO_PAC)
  paciente.setCpf(item.CPF_PAC)
  paciente.setRecemNascido(item.RECEM_NASCIO_PAC)
  paciente.setUf(item.UF_PAC)
  paciente.setCidade(item.CIDADE_PAC)
  paciente.setTipoLogradouro(item.TP_LOGRADOURO_PAC)
  paciente.setLogradouro(item.LOGRADOURO_PAC)
  paciente.setNumeroLogradouro(item.NR_LOGRADOURO)
  paciente.setComplementoLogradouro(item.COMPLEMENTO_LOGRADOURO_PAC)
  paciente.setBairro(item.BAIRRO_PAC)
  paciente.setCep(item.CEP_PAC)
  paciente.setVulnerabilidadeSocial(item.VULNERABILIDADE_SOCIAL_PAC)
  paciente.setCns(item.CNS_PAC)
  return paciente
}
