export class OrigemRecaida {
  private numeroAtendimento: string
  private numeroAutorizacao: string

  constructor() {
    this.numeroAtendimento = ''
    this.numeroAutorizacao = ''
  }

  public setNumeroAtendimento(numeroAtendimento) {
    this.numeroAtendimento = numeroAtendimento
  }

  public setNumeroAutorizacao(numeroAutorizacao) {
    this.numeroAutorizacao = numeroAutorizacao
  }

  public getData(): object {
    return {
      numeroAtendimento: this.numeroAtendimento,
      numeroAutorizacao: this.numeroAutorizacao,
    }
  }
}
