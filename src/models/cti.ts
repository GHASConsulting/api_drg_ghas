export class Cti {
  // Campos opcionais para todas as situações
  private dataInicial: string; // Data e hora inicial de internação no CTI (yyyy-MM-ddTHH:mm:ss)
  private dataFinal: string; // Data e hora final de internação no CTI (yyyy-MM-ddTHH:mm:ss)
  private codigoCidPrincipal: string; // CID principal de entrada no CTI (15 caracteres)
  private condicaoAlta: string; // A-Casa/Auto Cuidado, P-Alta a Pedido, N-Transferência Interna, T-Transferido para Internação, H-Transferido para outro Hospital, O-Óbito
  private uf: string; // UF do CRM do médico responsável (2 caracteres)
  private crm: string; // CRM do médico responsável (20 caracteres)
  private codigoHospital: string; // Código do hospital (quando CTI em outro hospital) (15 caracteres)
  private nomeHospital: string; // Nome do hospital (quando CTI em outro hospital) (120 caracteres)
  private tipo: string; // Nome do tipo de CTI (120 caracteres)
  private leito: string; // Número do leito no CTI (50 caracteres)

  constructor() {
    this.dataInicial = "";
    this.dataFinal = "";
    this.codigoCidPrincipal = "";
    this.condicaoAlta = "";
    this.uf = "";
    this.crm = "";
    this.codigoHospital = "";
    this.nomeHospital = "";
    this.tipo = "";
    this.leito = "";
  }

  public setDataInicial(dataInicial) {
    this.dataInicial = dataInicial;
  }

  public setLeito(leito) {
    this.leito = leito;
  }

  public setDataFinal(dataFinal) {
    this.dataFinal = dataFinal;
  }

  public setTipo(tipo) {
    this.tipo = tipo;
  }

  public setCodigoCidPrincipal(codigoCidPrincipal) {
    this.codigoCidPrincipal = codigoCidPrincipal;
  }

  public setCondicaoAlta(condicaoAlta) {
    this.condicaoAlta = condicaoAlta;
  }

  public setUf(uf) {
    this.uf = uf;
  }

  public setCrm(crm) {
    this.crm = crm;
  }

  public setCodigoHospital(codigoHospital) {
    this.codigoHospital = codigoHospital;
  }

  public setNomeHospital(nomeHospital) {
    this.nomeHospital = nomeHospital;
  }

  public getData(): object {
    return {
      dataInicial: this.dataInicial,
      dataFinal: this.dataFinal,
      codigoCidPrincipal: this.codigoCidPrincipal,
      condicaoAlta: this.condicaoAlta,
      uf: this.uf,
      crm: this.crm,
      codigoHospital: this.codigoHospital,
      nomeHospital: this.nomeHospital,
      tipo: this.tipo,
      leito: this.leito,
    };
  }
}
