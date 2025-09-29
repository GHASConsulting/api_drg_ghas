import { DispositivoTerapeutico } from "../../../models/dispositivoTerapeutico";
import { converterData } from "../../../utils/formatDate_yyyy-mm-dd";

/**
 * @description buildDispositivoTerapeutico é uma função para construir todos os elementos da tag <dispositivoTerapeutico></dispositivoTerapeutico> para o XML.
 * Esta função recebe um item do select na TBL_INM_DISPOSITIVO_TERAPEUTICO, usando os métodos set da classe DispositivoTerapeutico.
 * A função retorna todos os itens com suas informações.
 */
export async function buildDispositivoTerapeutico(
  item: any
): Promise<DispositivoTerapeutico> {
  const dispositivo = new DispositivoTerapeutico();

  dispositivo.setLocal(item.LOCAL_DISPOSITIVO);
  dispositivo.setTipoTerapeutico(item.TIPO_DISPOSITIVO);

  const formatedDataInicial = converterData(item.DT_INICIAL_DISPOSITIVO);
  dispositivo.setDataInicial(formatedDataInicial);

  const formatedDataFinal = converterData(item.DT_FINAL_DISPOSITIVO);
  dispositivo.setDataFinal(formatedDataFinal);

  return dispositivo;
}
