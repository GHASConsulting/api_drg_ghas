export class SondaVesicalDeDemora {
  // Campos opcionais para todas as situações
  private local: string; // C-No CTI, F-Fora do CTI, S-Sem Informação
  private dataInicial: string; // Data inicial da utilização da sonda (yyyy-MM-ddTHH:mm:ss)
  private dataFinal: string; // Data final da utilização da sonda (yyyy-MM-ddTHH:mm:ss)

  constructor() {
    this.local = "";
    this.dataInicial = "";
    this.dataFinal = "";
  }

  public setLocal(local: string): void {
    this.local = local;
  }

  public setDataInicial(dataInicial: string): void {
    this.dataInicial = dataInicial;
  }

  public setDataFinal(dataFinal: string): void {
    this.dataFinal = dataFinal;
  }

  public getData(): object {
    return {
      local: this.local,
      dataInicial: this.dataInicial,
      dataFinal: this.dataFinal,
    };
  }
}
