export class Hospital {
  private codigo: string
  private nome: string
  private cnes: string
  private porte: string
  private complexidade: string
  private esferaAdministrativa: string
  private uf: string
  private cidade: string
  private tipoLogradouro: string
  private logradouro: string
  private numeroLogradouro: string
  private complementoLogradouro: string
  private bairro: string
  private cep: string

  constructor() {
    this.codigo = ''
    this.nome = ''
    this.cnes = ''
    this.porte = ''
    this.complexidade = ''
    this.esferaAdministrativa = ''
    this.uf = ''
    this.cidade = ''
    this.tipoLogradouro = ''
    this.logradouro = ''
    this.numeroLogradouro = ''
    this.complementoLogradouro = ''
    this.bairro = ''
    this.cep = ''
  }

  public setCodigo(codigo) {
    this.codigo = codigo
  }

  public setNome(nome) {
    this.nome = nome
  }

  public setCnes(cnes) {
    this.cnes = cnes
  }

  public setPorte(porte) {
    this.porte = porte
  }

  public setComplexidade(complexidade) {
    this.complexidade = complexidade
  }

  public setEsferaAdministrativa(esferaAdministrativa) {
    this.esferaAdministrativa = esferaAdministrativa
  }

  public setUf(uf) {
    this.uf = uf
  }

  public setCidade(cidade) {
    this.cidade = cidade
  }

  public setTipoLogradouro(tipoLogradouro) {
    this.tipoLogradouro = tipoLogradouro
  }

  public setLogradouro(logradouro) {
    this.logradouro = logradouro
  }

  public setNumeroLogradouro(numeroLogradouro) {
    this.numeroLogradouro = numeroLogradouro
  }

  public setComplementoLogradouro(complementoLogradouro) {
    this.complementoLogradouro = complementoLogradouro
  }

  public setBairro(bairro) {
    this.bairro = bairro
  }

  public setCep(cep) {
    this.cep = cep
  }

  public getData(): object {
    return {
      codigo: this.codigo,
      nome: this.nome,
      cnes: this.cnes,
      porte: this.porte,
      complexidade: this.complexidade,
      esferaAdministrativa: this.esferaAdministrativa,
      uf: this.uf,
      cidade: this.cidade,
      tipoLogradouro: this.tipoLogradouro,
      logradouro: this.logradouro,
      numeroLogradouro: this.numeroLogradouro,
      complementoLogradouro: this.complementoLogradouro,
      bairro: this.bairro,
      cep: this.cep,
    }
  }
}
