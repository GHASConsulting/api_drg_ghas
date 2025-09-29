import { CausaExternaPermanencia } from "../../../models/causaExternaPermanencia";
import { converterData } from "../../../utils/formatDate_yyyy-mm-dd";

/**
 * @description buildCausaExternaPermanencia é uma função para construir todos os elementos da tag <causaExternaPermanencia></causaExternaPermanencia> para o XML.
 * Esta função recebe um item do select na TBL_INM_CAUSA_EXTERNA_PERMANENCIA, usando os métodos set da classe CausaExternaPermanencia.
 * A função retorna todos os itens com suas informações.
 */
export async function buildCausaExternaPermanencia(
  item: any
): Promise<CausaExternaPermanencia> {
  const causa = new CausaExternaPermanencia();

  causa.setDescricao(item.DESCRICAO_CAUSA);
  causa.setTempo(item.TEMPO_CAUSA);

  const formatedDataInicial = converterData(item.DT_INICIAL_CAUSA);
  causa.setDataInicial(formatedDataInicial);

  const formatedDataFinal = converterData(item.DT_FINAL_CAUSA);
  causa.setDataFinal(formatedDataFinal);

  causa.setOrigem(item.ORIGEM_CAUSA);

  return causa;
}
