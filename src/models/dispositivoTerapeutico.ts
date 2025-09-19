export class DispositivoTerapeutico {
  // Campos opcionais para todas as situações
  private local: string; // C-No CTI, F-Fora do CTI, S-Sem Informação
  private tipoTerapeutico: string; // Código do dispositivo terapêutico
  private dataInicial: string; // Data inicial da utilização (yyyy-MM-ddTHH:mm:ss)
  private dataFinal: string; // Data final da utilização (yyyy-MM-ddTHH:mm:ss)

  constructor() {
    this.local = "";
    this.tipoTerapeutico = "";
    this.dataInicial = "";
    this.dataFinal = "";
  }

  public setLocal(local: string): void {
    this.local = local;
  }

  public setTipoTerapeutico(tipoTerapeutico: string): void {
    this.tipoTerapeutico = tipoTerapeutico;
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
      tipoTerapeutico: this.tipoTerapeutico,
      dataInicial: this.dataInicial,
      dataFinal: this.dataFinal,
    };
  }
}
