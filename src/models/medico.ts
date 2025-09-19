export class Medico {
  // Campos obrigatórios para situações 1, 2 e 3
  private nome: string; // Nome do médico (300 caracteres)
  private uf: string; // UF do CRM (2 caracteres)
  private crm: string; // Número do CRM (20 caracteres)
  private especialidade: string; // Descrição da especialidade (120 caracteres)
  private medicoResponsavel: string; // S-Sim, N-Não (deve haver exatamente um responsável)

  // Campos opcionais
  private ddd: string; // DDD do telefone (2 caracteres)
  private telefone: string; // Telefone (9 caracteres)
  private email: string; // Email (600 caracteres)
  private tipoAtuacao: string; // I-Interconsulta, C-Coordenador da Equipe

  constructor() {
    this.nome = "";
    this.ddd = "";
    this.telefone = "";
    this.email = "";
    this.uf = "";
    this.crm = "";
    this.especialidade = "";
    this.medicoResponsavel = "";
    this.tipoAtuacao = "";
  }

  public setNome(nome) {
    this.nome = nome;
  }

  public setDdd(ddd) {
    this.ddd = ddd;
  }

  public setTelefone(telefone) {
    this.telefone = telefone;
  }

  public setEmail(email) {
    this.email = email;
  }

  public setUf(uf) {
    this.uf = uf;
  }

  public setCrm(crm) {
    this.crm = crm;
  }

  public setEspecialidade(especialidade) {
    this.especialidade = especialidade;
  }

  public setMedicoResponsavel(medicoResponsavel) {
    this.medicoResponsavel = medicoResponsavel;
  }

  public setTipoAtuacao(tipoAtuacao) {
    this.tipoAtuacao = tipoAtuacao;
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
    };
  }
}
