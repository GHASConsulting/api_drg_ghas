import { CondicaoAdquiridaSuporteVentilatorio } from '../../../models/condicaoAdquiridaSuporteVentilatorio'
import { SuporteVentilatorio } from '../../../models/suporteVentilatorio'
import { converterData } from '../../../utils/formatDate_yyyy-mm-dd'

/** @description build a sondaVesicalDeDemora */
export async function buildSuporteVentilatorioFromDatabase(
  item: any,
): Promise<SuporteVentilatorio> {
  const suporteVentilatorio = new SuporteVentilatorio()

  const formatedDataFinal = converterData(item.DT_FINAL_SUP_VENTILATORIO)
  const formatedDataInicial = converterData(item.DT_INICIAL_SUP_VENTILATORIO)
  suporteVentilatorio.setDataFinal(formatedDataFinal)
  suporteVentilatorio.setDataInicial(formatedDataInicial)

  const condicaoAdquiridaSuporteVentilatorio =
    new CondicaoAdquiridaSuporteVentilatorio()
  condicaoAdquiridaSuporteVentilatorio.setCodigoCondicaoAdquirida(
    item.CD_CONDICAO_ADQUIRIDA,
  )
  condicaoAdquiridaSuporteVentilatorio.setDataOcorrencia(item.DT_OCORRENCIA_SUP)
  suporteVentilatorio.addCondicaoAdquiridaSuporteVentilatorio(
    condicaoAdquiridaSuporteVentilatorio,
  )

  return suporteVentilatorio
}
