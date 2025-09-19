export class AnaliseCritica {
  // Campos opcionais para todas as situações
  private dataAnalise: string; // Data da análise crítica (yyyy-MM-ddTHH:mm:ss)
  private analiseCritica: string; // Descrição da análise crítica (1200 caracteres)

  constructor() {
    this.dataAnalise = "";
    this.analiseCritica = "";
  }

  public setDataAnalise(dataAnalise: string): void {
    this.dataAnalise = dataAnalise;
  }

  public setAnaliseCritica(analiseCritica: string): void {
    this.analiseCritica = analiseCritica;
  }

  public getData(): object {
    return {
      dataAnalise: this.dataAnalise,
      analiseCritica: this.analiseCritica,
    };
  }
}
