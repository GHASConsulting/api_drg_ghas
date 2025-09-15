import { Operadora } from '../../../models/operadora'

export async function buildOperadora(item: any): Promise<Operadora> {
  const operadora = new Operadora()
  operadora.setCodigo(item.CD_OPERADORA)
  // operadora.setCodigo(343889)
  operadora.setPlano(item.PLANO_OPERADORA)
  operadora.setNumeroCarteira(item.NR_CARTEIRA)
  operadora.setDataValidade(item.DT_VALIDADE_OPERADORA)
  return operadora
}
