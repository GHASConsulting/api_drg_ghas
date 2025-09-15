export class CondicaoAdquiridaSuporteVentilatorio {
  private codigoCondicaoAdquirida: string
  private dataOcorrencia: string

  constructor() {
    this.codigoCondicaoAdquirida = ''
    this.dataOcorrencia = ''
  }

  public setCodigoCondicaoAdquirida(codigoCondicaoAdquirida) {
    this.codigoCondicaoAdquirida = codigoCondicaoAdquirida
  }

  public setDataOcorrencia(dataOcorrencia) {
    this.dataOcorrencia = dataOcorrencia
  }

  public getData(): object {
    return {
      codigoCondicaoAdquirida: this.codigoCondicaoAdquirida,
      dataOcorrencia: this.dataOcorrencia,
    }
  }
}
