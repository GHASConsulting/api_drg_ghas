export class Operadora {
  // Campos obrigatórios para todas as situações
  private codigo: string; // Código da operadora-Fonte Pagadora (15 caracteres)
  private numeroCarteira: string; // Número da carteira (30 caracteres)

  // Campos opcionais
  private plano: string; // Nome do plano (40 caracteres)
  private dataValidade: string; // Data de validade da carteira (yyyy-MM-ddTHH:mm:ss)

  constructor() {
    this.codigo = "";
    this.plano = "";
    this.numeroCarteira = "";
    this.dataValidade = "";
  }

  public setCodigo(codigo) {
    this.codigo = codigo;
  }

  public setPlano(plano) {
    this.plano = plano;
  }

  public setNumeroCarteira(numeroCarteira) {
    this.numeroCarteira = numeroCarteira;
  }

  public setDataValidade(dataValidade) {
    this.dataValidade = dataValidade;
  }

  public getData(): object {
    return {
      codigo: this.codigo,
      plano: this.plano,
      numeroCarteira: this.numeroCarteira,
      dataValidade: this.dataValidade,
    };
  }
}
