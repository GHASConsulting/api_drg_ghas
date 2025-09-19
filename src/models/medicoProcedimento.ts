export class MedicoProcedimento {
  // Campos opcionais para todas as situações
  private uf: string; // UF do CRM (2 caracteres)
  private crm: string; // Número do CRM (20 caracteres)
  private tipoAtuacao: string; // A-Primeiro Auxiliar, A2-Segundo Auxiliar, A3-Terceiro Auxiliar, R-Responsável

  constructor() {
    this.uf = "";
    this.crm = "";
    this.tipoAtuacao = "";
  }

  public setUf(uf) {
    this.uf = uf;
  }

  public setCrm(crm) {
    this.crm = crm;
  }

  public setTipoAtuacao(tipoAtuacao) {
    this.tipoAtuacao = tipoAtuacao;
  }

  public getData(): object {
    return {
      uf: this.uf,
      crm: this.crm,
      tipoAtuacao: this.tipoAtuacao,
    };
  }
}
