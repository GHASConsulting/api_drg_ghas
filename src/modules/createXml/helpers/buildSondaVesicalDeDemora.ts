import { SondaVesicalDeDemora } from '../../../models/sondaVesicalDeDemora'
import { converterData } from '../../../utils/formatDate_yyyy-mm-dd'

/** @description build a sondaVesicalDeDemora */
export async function buildSondaVesicalDeDemora(
  item: any,
): Promise<SondaVesicalDeDemora> {
  const sondaVesicalDeDemora = new SondaVesicalDeDemora()

  const formatedDataFinal = converterData(item.DT_FINAL_SONDA)
  const formatedDataInicial = converterData(item.DT_INICIAL_SONDA)
  sondaVesicalDeDemora.setDataFinal(formatedDataFinal)
  sondaVesicalDeDemora.setDataInicial(formatedDataInicial)

  return sondaVesicalDeDemora
}
