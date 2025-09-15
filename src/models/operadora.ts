export class Operadora {
  private codigo: string
  private plano: string
  private numeroCarteira: string
  private dataValidade: string

  constructor() {
    this.codigo = ''
    this.plano = ''
    this.numeroCarteira = ''
    this.dataValidade = ''
  }

  public setCodigo(codigo) {
    this.codigo = codigo
  }

  public setPlano(plano) {
    this.plano = plano
  }

  public setNumeroCarteira(numeroCarteira) {
    this.numeroCarteira = numeroCarteira
  }

  public setDataValidade(dataValidade) {
    this.dataValidade = dataValidade
  }

  public getData(): object {
    return {
      codigo: this.codigo,
      plano: this.plano,
      numeroCarteira: this.numeroCarteira,
      dataValidade: this.dataValidade,
    }
  }
}
