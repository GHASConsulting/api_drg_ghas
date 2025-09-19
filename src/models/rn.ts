export class Rn {
  // Campos opcionais para todas as situações (usado para recém nascidos)
  private pesoNascimento: string; // Peso de nascimento em gramas (4 caracteres)
  private idadeGestacional: string; // Idade gestacional em semanas (99.9 - 1 casa decimal)
  private comprimento: string; // Comprimento em centímetros (99.9 - 1 casa decimal)
  private sexo: string; // M-Masculino, F-Feminino, I-Indefinido
  private nascidoVivo: string; // S-Sim, N-Não
  private tocotraumatismo: string; // S-Sim, N-Não, I-Sem Informação
  private apgar: string; // S-Sim, N-Não, I-Sem Informação
  private apgarQuintoMinuto: string; // Valor do APGAR no quinto minuto (0 a 10)
  private alta48horas: string; // S-Sim, N-Não
  private numeroAutorizacaoMae: string; // Número de autorização da mãe (25 caracteres)
  private numeroAtendimentoMae: string; // Número de atendimento da mãe (25 caracteres)
  private numeroCarteiraMae: string; // Número da carteira da mãe (30 caracteres)

  constructor() {
    this.pesoNascimento = "";
    this.idadeGestacional = "";
    this.comprimento = "";
    this.sexo = "";
    this.nascidoVivo = "";
    this.tocotraumatismo = "";
    this.apgar = "";
    this.apgarQuintoMinuto = "";
    this.alta48horas = "";
    this.numeroAutorizacaoMae = "";
    this.numeroAtendimentoMae = "";
    this.numeroCarteiraMae = "";
  }

  public setPesoNascimento(pesoNascimento: string): void {
    this.pesoNascimento = pesoNascimento;
  }

  public setIdadeGestacional(idadeGestacional: string): void {
    this.idadeGestacional = idadeGestacional;
  }

  public setComprimento(comprimento: string): void {
    this.comprimento = comprimento;
  }

  public setSexo(sexo: string): void {
    this.sexo = sexo;
  }

  public setNascidoVivo(nascidoVivo: string): void {
    this.nascidoVivo = nascidoVivo;
  }

  public setTocotraumatismo(tocotraumatismo: string): void {
    this.tocotraumatismo = tocotraumatismo;
  }

  public setApgar(apgar: string): void {
    this.apgar = apgar;
  }

  public setApgarQuintoMinuto(apgarQuintoMinuto: string): void {
    this.apgarQuintoMinuto = apgarQuintoMinuto;
  }

  public setAlta48horas(alta48horas: string): void {
    this.alta48horas = alta48horas;
  }

  public setNumeroAutorizacaoMae(numeroAutorizacaoMae: string): void {
    this.numeroAutorizacaoMae = numeroAutorizacaoMae;
  }

  public setNumeroAtendimentoMae(numeroAtendimentoMae: string): void {
    this.numeroAtendimentoMae = numeroAtendimentoMae;
  }

  public setNumeroCarteiraMae(numeroCarteiraMae: string): void {
    this.numeroCarteiraMae = numeroCarteiraMae;
  }

  public getData(): object {
    return {
      pesoNascimento: this.pesoNascimento,
      idadeGestacional: this.idadeGestacional,
      comprimento: this.comprimento,
      sexo: this.sexo,
      nascidoVivo: this.nascidoVivo,
      tocotraumatismo: this.tocotraumatismo,
      apgar: this.apgar,
      apgarQuintoMinuto: this.apgarQuintoMinuto,
      alta48horas: this.alta48horas,
      numeroAutorizacaoMae: this.numeroAutorizacaoMae,
      numeroAtendimentoMae: this.numeroAtendimentoMae,
      numeroCarteiraMae: this.numeroCarteiraMae,
    };
  }
}
