import { CondicaoAdquiridaSuporteVentilatorio } from "../../../models/condicaoAdquiridaSuporteVentilatorio";
import { converterData } from "../../../utils/formatDate_yyyy-mm-dd";

/**
 * @description buildCondicaoAdquiridaSuporteVentilatorio é uma função para construir todos os elementos da tag <condicaoAdquiridaSuporteVentilatorio></condicaoAdquiridaSuporteVentilatorio> para o XML.
 * Esta função recebe um item do select na TBL_INM_COND_ADQ_SUP_VENT, usando os métodos set da classe CondicaoAdquiridaSuporteVentilatorio.
 * A função retorna todos os itens com suas informações.
 */
export async function buildCondicaoAdquiridaSuporteVentilatorio(
  item: any
): Promise<CondicaoAdquiridaSuporteVentilatorio> {
  const condicao = new CondicaoAdquiridaSuporteVentilatorio();

  condicao.setCodigoCondicaoAdquirida(item.CD_CID_COND_ADQ_VENT);

  const formatedDataOcorrencia = converterData(
    item.DT_OCORRENCIA_COND_ADQ_VENT
  );
  condicao.setDataOcorrencia(formatedDataOcorrencia);

  return condicao;
}
