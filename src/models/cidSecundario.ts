export class CidSecundario {
  // Campo opcional para todas as situações
  private codigoCidSecundario: string; // Código CID secundário (15 caracteres)

  constructor() {
    this.codigoCidSecundario = "";
  }

  public setCodigoCidSecundario(codigoCidSecundario: string): void {
    this.codigoCidSecundario = codigoCidSecundario;
  }

  public getData(): object {
    return {
      codigoCidSecundario: this.codigoCidSecundario,
    };
  }
}
