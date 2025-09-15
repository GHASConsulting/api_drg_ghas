export class MedicoProcedimento {
  private uf: string
  private crm: string
  private tipoAtuacao: string

  constructor() {
    this.uf = ''
    this.crm = ''
    this.tipoAtuacao = ''
  }

  public setUf(uf) {
    this.uf = uf
  }

  public setCrm(crm) {
    this.crm = crm
  }

  public setTipoAtuacao(tipoAtuacao) {
    this.tipoAtuacao = tipoAtuacao
  }

  public getData(): object {
    return {
      uf: this.uf,
      crm: this.crm,
      tipoAtuacao: this.tipoAtuacao,
    }
  }
}
