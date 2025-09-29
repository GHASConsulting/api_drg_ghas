import { AltaAdministrativa } from "../../../models/altaAdministrativa";
import { converterData } from "../../../utils/formatDate_yyyy-mm-dd";

/**
 * @description buildAltaAdministrativa é uma função para construir todos os elementos da tag <altaAdministrativa></altaAdministrativa> para o XML.
 * Esta função recebe um item do select na TBL_INM_ALTA_ADMINISTRATIVA, usando os métodos set da classe AltaAdministrativa.
 * A função retorna todos os itens com suas informações.
 */
export async function buildAltaAdministrativa(
  item: any
): Promise<AltaAdministrativa> {
  const alta = new AltaAdministrativa();

  alta.setNumeroAtendimento(item.NR_ATENDIMENTO_ALTA);
  alta.setNumeroAutorizacao(item.NR_AUTORIZACAO_ALTA);

  const formatedDataAutorizacao = converterData(item.DT_AUTORIZACAO_ALTA);
  alta.setDataAutorizacao(formatedDataAutorizacao);

  const formatedDataInicial = converterData(item.DT_INICIAL_ATENDIMENTO);
  alta.setDataAtendimentoInicial(formatedDataInicial);

  const formatedDataFinal = converterData(item.DT_FINAL_ATENDIMENTO);
  alta.setDataAtendimentoFinal(formatedDataFinal);

  return alta;
}
