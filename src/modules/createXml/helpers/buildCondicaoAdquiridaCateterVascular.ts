import { CondicaoAdquiridaCateterVascularCentral } from "../../../models/condicaoAdquiridaCateterVascularCentral";
import { converterData } from "../../../utils/formatDate_yyyy-mm-dd";

/**
 * @description buildCondicaoAdquiridaCateterVascular é uma função para construir todos os elementos da tag <condicaoAdquiridaCateterVascularCentral></condicaoAdquiridaCateterVascularCentral> para o XML.
 * Esta função recebe um item do select na TBL_INM_COND_ADQ_CAT_VAS, usando os métodos set da classe CondicaoAdquiridaCateterVascularCentral.
 * A função retorna todos os itens com suas informações.
 */
export async function buildCondicaoAdquiridaCateterVascular(
  item: any
): Promise<CondicaoAdquiridaCateterVascularCentral> {
  const condicao = new CondicaoAdquiridaCateterVascularCentral();

  condicao.setCodigoCondicaoAdquirida(item.CD_CID_COND_ADQ_CAT_VAS);

  const formatedDataOcorrencia = converterData(
    item.DT_OCORRENCIA_COND_ADQ_CAT_VAS
  );
  condicao.setDataOcorrencia(formatedDataOcorrencia);

  return condicao;
}
