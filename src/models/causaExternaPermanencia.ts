export class CausaExternaPermanencia {
  // Campos opcionais para todas as situações
  private descricao: string; // Descrição da causa externa (250 caracteres)
  private tempo: string; // Tempo da causa externa (8 caracteres)
  private dataInicial: string; // Data inicial da causa externa (yyyy-MM-ddTHH:mm:ss)
  private dataFinal: string; // Data final da causa externa (yyyy-MM-ddTHH:mm:ss)
  private origem: string; // A-Ambos, H-Hospitalar, R-Rede Operadora

  constructor() {
    this.descricao = "";
    this.tempo = "";
    this.dataInicial = "";
    this.dataFinal = "";
    this.origem = "";
  }

  public setDescricao(descricao: string): void {
    this.descricao = descricao;
  }

  public setTempo(tempo: string): void {
    this.tempo = tempo;
  }

  public setDataInicial(dataInicial: string): void {
    this.dataInicial = dataInicial;
  }

  public setDataFinal(dataFinal: string): void {
    this.dataFinal = dataFinal;
  }

  public setOrigem(origem: string): void {
    this.origem = origem;
  }

  public getData(): object {
    return {
      descricao: this.descricao,
      tempo: this.tempo,
      dataInicial: this.dataInicial,
      dataFinal: this.dataFinal,
      origem: this.origem,
    };
  }
}
