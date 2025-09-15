export class AltaAdministrativa {
  private numeroAtendimento: string
  private numeroAutorizacao: string

  constructor() {
    this.numeroAtendimento = ''
    this.numeroAutorizacao = ''
  }

  /**
   *
   * @param numeroAtendimento setter of <numeroAtendimento> in <altaAdministrativa> parent in XML
   */
  public setNumeroAtendimento(numeroAtendimento) {
    this.numeroAtendimento = numeroAtendimento
  }

  /**
   *
   * @param numeroAutorizacao setter of <numeroAutorizacao> in <altaAdministrativa> XML
   */
  public setNumeroAutorizacao(numeroAutorizacao) {
    this.numeroAutorizacao = numeroAutorizacao
  }

  /**
   *
   * @param dataAutorizacao setter of <dataAutorizacao> in <altaAdministrativa> XML
   */

  /**
   * name
   */
  public getData(): object {
    return {
      numeroAtendimento: this.numeroAtendimento,
      numeroAutorizacao: this.numeroAutorizacao,
    }
  }
}
