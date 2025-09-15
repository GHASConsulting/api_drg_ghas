export class Medico {
  private nome: string
  private ddd: string
  private telefone: string
  private email: string
  private uf: string
  private crm: string
  private especialidade: string
  private medicoResponsavel: string
  private tipoAtuacao: string

  constructor() {
    this.nome = ''
    this.ddd = ''
    this.telefone = ''
    this.email = ''
    this.uf = ''
    this.crm = ''
    this.especialidade = ''
    this.medicoResponsavel = ''
    this.tipoAtuacao = ''
  }

  public setNome(nome) {
    this.nome = nome
  }

  public setDdd(ddd) {
    this.ddd = ddd
  }

  public setTelefone(telefone) {
    this.telefone = telefone
  }

  public setEmail(email) {
    this.email = email
  }

  public setUf(uf) {
    this.uf = uf
  }

  public setCrm(crm) {
    this.crm = crm
  }

  public setEspecialidade(especialidade) {
    this.especialidade = especialidade
  }

  public setMedicoResponsavel(medicoResponsavel) {
    this.medicoResponsavel = medicoResponsavel
  }

  public setTipoAtuacao(tipoAtuacao) {
    this.tipoAtuacao = tipoAtuacao
  }

  public getData(): object {
    return {
      nome: this.nome,
      ddd: this.ddd,
      telefone: this.telefone,
      email: this.email,
      uf: this.uf,
      crm: this.crm,
      especialidade: this.especialidade,
      medicoResponsavel: this.medicoResponsavel,
      tipoAtuacao: this.tipoAtuacao,
    }
  }
}
