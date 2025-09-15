export class Paciente {
  private dataNascimento: string
  private sexo: string
  private cpf: string
  private recemNascido: string
  private particular: string
  private uf: string
  private cidade: string
  private tipoLogradouro: string
  private logradouro: string
  private numeroLogradouro: string
  private complementoLogradouro: string
  private bairro: string
  private cep: string
  private vulnerabilidadeSocial: string
  private codigoIdentifiacao: string
  private cns: string
  private codigoIdentificacao: string
  constructor() {
    this.dataNascimento = ''
    this.sexo = ''
    this.cpf = ''
    this.uf = ''
    this.cidade = ''
    this.tipoLogradouro = ''
    this.logradouro = ''
    this.numeroLogradouro = ''
    this.complementoLogradouro = ''
    this.bairro = ''
    this.cep = ''
    this.vulnerabilidadeSocial = ''
    this.recemNascido = ''
    this.cns = ''
    this.particular = ''
    this.codigoIdentifiacao = ''
  }

  public setDataNacimento(dataNascimento) {
    this.dataNascimento = dataNascimento
  }

  public setSexo(sexo) {
    this.sexo = sexo
  }

  public setCpf(cpf) {
    this.cpf = cpf
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

  public setVulnerabilidadeSocial(vulnerabilidadeSocial) {
    this.vulnerabilidadeSocial = vulnerabilidadeSocial
  }

  public setRecemNascido(recemNascido) {
    this.recemNascido = recemNascido
  }

  public setCns(cns) {
    this.cns = cns
  }

  public setParticular(particular) {
    this.particular = particular
  }

  public setCodigoIdentificacao(codigoItentificacao) {
    this.codigoIdentificacao = codigoItentificacao
  }

  public getData(): object {
    return {
      dataNascimento: this.dataNascimento,
      sexo: this.sexo,
      cpf: this.cpf,
      particular: this.particular,
      uf: this.uf,
      cidade: this.cidade,
      tipoLogradouro: this.tipoLogradouro,
      logradouro: this.logradouro,
      numeroLogradouro: this.numeroLogradouro,
      complementoLogradouro: this.complementoLogradouro,
      bairro: this.bairro,
      cep: this.cep,
      vulnerabilidadeSocial: this.vulnerabilidadeSocial,
      recemNascido: this.recemNascido,
      cns: this.cns,
      codigoIdentificacao: this.codigoIdentificacao,
    }
  }
}
