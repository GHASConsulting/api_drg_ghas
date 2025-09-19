export class CondicaoAdquirida {
  // Campos opcionais para todas as situações
  private codigoCondicaoAdquirida: string; // Código CID da condição adquirida (15 caracteres)
  private dataOcorrencia: string; // Data da ocorrência (yyyy-MM-ddTHH:mm:ss)
  private dataManifestacao: string; // Data da manifestação (yyyy-MM-ddTHH:mm:ss)
  private uf: string; // UF do CRM do médico responsável (2 caracteres)
  private crm: string; // CRM do médico responsável (20 caracteres)

  constructor() {
    this.codigoCondicaoAdquirida = "";
    this.dataOcorrencia = "";
    this.dataManifestacao = "";
    this.uf = "";
    this.crm = "";
  }

  public setCodigoCondicaoAdquirida(codigoCondicaoAdquirida) {
    this.codigoCondicaoAdquirida = codigoCondicaoAdquirida;
  }

  public setDataOcorrencia(dataOcorrencia: string): void {
    this.dataOcorrencia = dataOcorrencia;
  }

  public setDataManifestacao(dataManifestacao: string): void {
    this.dataManifestacao = dataManifestacao;
  }

  public setUf(uf: string): void {
    this.uf = uf;
  }

  public setCrm(crm: string): void {
    this.crm = crm;
  }

  public getData(): object {
    return {
      codigoCondicaoAdquirida: this.codigoCondicaoAdquirida,
      dataOcorrencia: this.dataOcorrencia,
      dataManifestacao: this.dataManifestacao,
      uf: this.uf,
      crm: this.crm,
    };
  }
}
