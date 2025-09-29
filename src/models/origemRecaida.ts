export class OrigemRecaida {
  // Campos opcionais para todas as situações
  private numeroAtendimento: string; // Número de atendimento do paciente no Hospital (25 caracteres)
  private numeroAutorizacao: string; // Número da autorização (25 caracteres)

  constructor() {
    this.numeroAtendimento = "";
    this.numeroAutorizacao = "";
  }

  public setNumeroAtendimento(numeroAtendimento: string): void {
    this.numeroAtendimento = numeroAtendimento;
  }

  public setNumeroAutorizacao(numeroAutorizacao: string): void {
    this.numeroAutorizacao = numeroAutorizacao;
  }

  public getData(): object {
    return {
      numeroAtendimento: this.numeroAtendimento,
      numeroAutorizacao: this.numeroAutorizacao,
    };
  }
}
