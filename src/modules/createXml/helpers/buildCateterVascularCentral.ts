import { CateterVascularCentral } from '../../../models/cateterVascularCentral'
import { converterData } from '../../../utils/formatDate_yyyy-mm-dd'

/** @description build a cateter vascular central */
export async function buildCateterVascularCentral(
  item: any,
): Promise<CateterVascularCentral> {
  const cateterVascularCentral = new CateterVascularCentral()

  const formatedDataFinal = converterData(item.DT_FINAL_CATETER)
  const formatedDataInicial = converterData(item.DT_INICIAL_CATETER)
  cateterVascularCentral.setDataFinal(formatedDataFinal)
  cateterVascularCentral.setDataInicial(formatedDataInicial)
  return cateterVascularCentral
}
