export class Cti {
  private dataInicial: string
  private dataFinal: string
  private codigoCidPrincipal: string
  private condicaoAlta: string
  private uf: string
  private crm: string
  private codigoHospital: string
  private nomeHospital: string
  private tipo: string
  private leito: string

  constructor() {
    this.dataInicial = ''
    this.dataFinal = ''
    this.codigoCidPrincipal = ''
    this.condicaoAlta = ''
    this.uf = ''
    this.crm = ''
    this.codigoHospital = ''
    this.nomeHospital = ''
    this.tipo = ''
    this.leito = ''
  }

  public setDataInicial(dataInicial) {
    this.dataInicial = dataInicial
  }

  public setLeito(leito) {
    this.leito = leito
  }

  public setDataFinal(dataFinal) {
    this.dataFinal = dataFinal
  }

  public setTipo(tipo) {
    this.tipo = tipo
  }

  public setCodigoCidPrincipal(codigoCidPrincipal) {
    this.codigoCidPrincipal = codigoCidPrincipal
  }

  public setCondicaoAlta(condicaoAlta) {
    this.condicaoAlta = condicaoAlta
  }

  public setUf(uf) {
    this.uf = uf
  }

  public setCrm(crm) {
    this.crm = crm
  }

  public setCodigoHospital(codigoHospital) {
    this.codigoHospital = codigoHospital
  }

  public setNomeHospital(nomeHospital) {
    this.nomeHospital = nomeHospital
  }

  public getData(): object {
    return {
      dataInicial: this.dataInicial,
      dataFinal: this.dataFinal,
      codigoCidPrincipal: this.codigoCidPrincipal,
      condicaoAlta: this.condicaoAlta,
      uf: this.uf,
      tipo: this.tipo,
      crm: this.crm,
      leito: this.leito,
      condigoHospital: this.codigoHospital,
      nomeHospital: this.nomeHospital,
    }
  }
}
