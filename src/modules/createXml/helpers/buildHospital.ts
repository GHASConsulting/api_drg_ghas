import { Hospital } from '../../../models/hospital'

export async function buildHospital(item: any): Promise<Hospital> {
  const hospital = new Hospital()
  hospital.setCodigo(item.CD_HOSPITAL)
  hospital.setNome(item.NM_HOSPITAL)
  hospital.setCnes(item.CNES_HOSPITAL)
  hospital.setPorte(item.PORTE_HOSPITAL)
  hospital.setComplexidade(item.COMPLEXIDADE_HOSPITAL)
  hospital.setEsferaAdministrativa(item.ESFERA_ADM_HOSPITAL)
  hospital.setTipoLogradouro(item.TP_LOGRADOURO_HOSPITAL)
  hospital.setLogradouro(item.LOGRADOURO_HOSPITAL)
  hospital.setNumeroLogradouro(item.NR_LOGRADOURO_HOSPITAL)

  hospital.setComplementoLogradouro(item.COMPLEMENTO_LOGRAD_HOSPITAL)

  hospital.setBairro(item.BAIRRO_HOSPITAL)
  hospital.setUf(item.UF_HOSPITAL)
  hospital.setCidade(item.CIDADE_HOSPITAL)

  hospital.setCep(item.CEP_HOSPITAL)

  return hospital
}
