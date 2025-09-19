export class AltaAdministrativa {
  // Campos opcionais para todas as situações
  private numeroAtendimento: string; // Número de atendimento (25 caracteres)
  private numeroAutorizacao: string; // Número da autorização (25 caracteres)
  private dataAutorizacao: string; // Data da autorização (yyyy-MM-ddTHH:mm:ss)
  private dataAtendimentoInicial: string; // Data inicial do atendimento (yyyy-MM-ddTHH:mm:ss)
  private dataAtendimentoFinal: string; // Data final do atendimento (yyyy-MM-ddTHH:mm:ss)

  constructor() {
    this.numeroAtendimento = "";
    this.numeroAutorizacao = "";
    this.dataAutorizacao = "";
    this.dataAtendimentoInicial = "";
    this.dataAtendimentoFinal = "";
  }

  /**
   *
   * @param numeroAtendimento setter of <numeroAtendimento> in <altaAdministrativa> parent in XML
   */
  public setNumeroAtendimento(numeroAtendimento) {
    this.numeroAtendimento = numeroAtendimento;
  }

  public setNumeroAutorizacao(numeroAutorizacao: string): void {
    this.numeroAutorizacao = numeroAutorizacao;
  }

  public setDataAutorizacao(dataAutorizacao: string): void {
    this.dataAutorizacao = dataAutorizacao;
  }

  public setDataAtendimentoInicial(dataAtendimentoInicial: string): void {
    this.dataAtendimentoInicial = dataAtendimentoInicial;
  }

  public setDataAtendimentoFinal(dataAtendimentoFinal: string): void {
    this.dataAtendimentoFinal = dataAtendimentoFinal;
  }

  public getData(): object {
    return {
      numeroAtendimento: this.numeroAtendimento,
      numeroAutorizacao: this.numeroAutorizacao,
      dataAutorizacao: this.dataAutorizacao,
      dataAtendimentoInicial: this.dataAtendimentoInicial,
      dataAtendimentoFinal: this.dataAtendimentoFinal,
    };
  }
}
