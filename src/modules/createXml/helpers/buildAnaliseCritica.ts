import { AnaliseCritica } from "../../../models/analiseCritica";
import { converterData } from "../../../utils/formatDate_yyyy-mm-dd";

/**
 * @description buildAnaliseCritica é uma função para construir todos os elementos da tag <analiseCritica></analiseCritica> para o XML.
 * Esta função recebe um item do select na TBL_INM_ANALISE_CRITICA, usando os métodos set da classe AnaliseCritica.
 * A função retorna todos os itens com suas informações.
 */
export async function buildAnaliseCritica(item: any): Promise<AnaliseCritica> {
  const analise = new AnaliseCritica();

  const formatedDataAnalise = converterData(item.DT_ANALISE);
  analise.setDataAnalise(formatedDataAnalise);

  analise.setAnaliseCritica(item.ANALISE_CRITICA);

  return analise;
}
