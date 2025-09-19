export class CondicaoAdquiridaSondaVesicalDeDemora {
  // Campos opcionais para todas as situações
  private codigoCondicaoAdquirida: string; // Código CID da condição adquirida (15 caracteres)
  private dataOcorrencia: string; // Data da ocorrência (yyyy-MM-ddTHH:mm:ss)

  constructor() {
    this.codigoCondicaoAdquirida = "";
    this.dataOcorrencia = "";
  }

  public setCodigoCondicaoAdquirida(codigoCondicaoAdquirida: string): void {
    this.codigoCondicaoAdquirida = codigoCondicaoAdquirida;
  }

  public setDataOcorrencia(dataOcorrencia: string): void {
    this.dataOcorrencia = dataOcorrencia;
  }

  public getData(): object {
    return {
      codigoCondicaoAdquirida: this.codigoCondicaoAdquirida,
      dataOcorrencia: this.dataOcorrencia,
    };
  }
}
