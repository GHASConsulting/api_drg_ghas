import { CidSecundario } from '../../../models/cidSecundario'

/** @description CidSecundario builder, recive a item of itens in the select, return a CidSecundario */
export async function buildCidSecundario(
  cidItens: any,
): Promise<CidSecundario> {
  const cidSecundario = new CidSecundario()
  cidSecundario.setCidSecundario(cidItens.CD_CID)

  return cidSecundario
}
