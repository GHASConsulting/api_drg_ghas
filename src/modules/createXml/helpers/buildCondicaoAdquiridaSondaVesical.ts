import { CondicaoAdquiridaSondaVesicalDeDemora } from "../../../models/condicaoAdquiridaSondaVesicalDeDemora";
import { converterData } from "../../../utils/formatDate_yyyy-mm-dd";

/**
 * @description buildCondicaoAdquiridaSondaVesical é uma função para construir todos os elementos da tag <condicaoAdquiridaSondaVesicalDeDemora></condicaoAdquiridaSondaVesicalDeDemora> para o XML.
 * Esta função recebe um item do select na TBL_INM_COND_ADQ_SONDA, usando os métodos set da classe CondicaoAdquiridaSondaVesicalDeDemora.
 * A função retorna todos os itens com suas informações.
 */
export async function buildCondicaoAdquiridaSondaVesical(
  item: any
): Promise<CondicaoAdquiridaSondaVesicalDeDemora> {
  const condicao = new CondicaoAdquiridaSondaVesicalDeDemora();

  condicao.setCodigoCondicaoAdquirida(item.CD_CID_COND_ADQ_SONDA);

  const formatedDataOcorrencia = converterData(
    item.DT_OCORRENCIA_COND_ADQ_SONDA
  );
  condicao.setDataOcorrencia(formatedDataOcorrencia);

  return condicao;
}
