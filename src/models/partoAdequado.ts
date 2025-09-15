export class PartoAdequado {
  private medicacaoInducaoParto: string
  private cesariana: string
  private numeroPartosAnteriores: string
  constructor() {
    this.medicacaoInducaoParto = ''
    this.cesariana = ''
    this.numeroPartosAnteriores = ''
  }

  public setMedicacaoInducaoParto(medicacaoInducaoParto: string): void {
    this.medicacaoInducaoParto = medicacaoInducaoParto
  }

  public setCesariana(cesariana: string): void {
    this.cesariana = cesariana
  }

  public setNumeroPartosAnteriores(numeroPartosAnteriores: string): void {
    this.numeroPartosAnteriores = numeroPartosAnteriores
  }

  public getData(): object {
    return {
      cesariana: this.cesariana,
      medicacaoInducaoParto: this.medicacaoInducaoParto,
      numeroPartosAnteriores: this.numeroPartosAnteriores,
    }
  }
}
