export class CateterVascularCentral {
  private local: string
  private dataInicial: string
  private dataFinal: string

  constructor() {
    this.local = ''
    this.dataInicial = ''
    this.dataFinal = ''
  }

  public setLocal(local) {
    this.local = local
  }

  public setDataInicial(dataInicial) {
    this.dataInicial = dataInicial
  }

  public setDataFinal(dataFinal) {
    this.dataFinal = dataFinal
  }

  public getData(): object {
    return {
      local: this.local,
      dataInicial: this.dataInicial,
      dataFinal: this.dataFinal,
    }
  }
}
