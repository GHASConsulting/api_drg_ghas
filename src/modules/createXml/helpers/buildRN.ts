import { Rn } from "../../../models/rn";
import { converterData } from "../../../utils/formatDate_yyyy-mm-dd";

/**
 * @description buildRN é uma função para construir todos os elementos da tag <rn></rn> para o XML.
 * Esta função recebe um item do select na TBL_INM_RN, usando os métodos set da classe RN.
 * A função retorna todos os itens com suas informações.
 */
export async function buildRN(item: any): Promise<Rn> {
  const rn = new Rn();

  rn.setPesoNascimento(item.PESO_NASCIMENTO);
  rn.setIdadeGestacional(item.IDADE_GESTACIONAL);
  rn.setComprimento(item.COMPRIMENTO);
  rn.setSexo(item.SEXO_RN);
  rn.setNascidoVivo(item.NASCIDO_VIVO);
  rn.setTocotraumatismo(item.TOCOTRAUMATISMO);
  rn.setApgar(item.APGAR);
  rn.setApgarQuintoMinuto(item.APGAR_QUINTO_MINUTO);
  rn.setAlta48horas(item.ALTA_48_HORAS);
  rn.setNumeroAutorizacaoMae(item.NR_AUTORIZACAO_MAE);
  rn.setNumeroAtendimentoMae(item.NR_ATENDIMENTO_MAE);
  rn.setNumeroCarteiraMae(item.NR_CARTEIRA_MAE);

  return rn;
}
