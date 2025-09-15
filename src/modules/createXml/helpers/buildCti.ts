import { Cti } from '../../../models/cti'
import { converterData } from '../../../utils/formatDate_yyyy-mm-dd'

export async function buildCti(ctiItens: any): Promise<Cti> {
  const cti = new Cti()
  const formatedDataInicial = converterData(ctiItens.DT_INICIAL_CTI)

  const formatedDataFinal = converterData(ctiItens.DT_FINAL_CTI)

  cti.setDataInicial(formatedDataInicial)

  cti.setDataFinal(formatedDataFinal)

  cti.setCodigoCidPrincipal(ctiItens.CD_CID_PRINCIPAL)
  cti.setCondicaoAlta(ctiItens.CONDICAO_ALTA_CTI)
  cti.setUf(ctiItens.UF_CTI)
  cti.setCrm(ctiItens.CRM_CTI)
  cti.setCodigoHospital(ctiItens.CD_HOSPITAL)
  cti.setNomeHospital(ctiItens.NM_HOSPITAL)
  cti.setTipo(ctiItens.TIPO)
  cti.setLeito(ctiItens.DS_LEITO)
  return cti
}
