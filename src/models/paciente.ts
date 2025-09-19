export class Paciente {
  // Campos obrigatórios para todas as situações
  private dataNascimento: string; // Data de nascimento (yyyy-MM-ddTHH:mm:ss)
  private sexo: string; // M-Masculino, F-Feminino, I-Indefinido

  // Campos opcionais
  private cpf: string; // CPF sem máscara (11 caracteres)
  private recemNascido: string; // S-Sim, N-Não
  private particular: string; // S-Sim, N-Não
  private cns: string; // Cartão Nacional de Saúde (15 caracteres)
  private codigoIdentificacao: string; // Código de identificação do beneficiário (15 caracteres)
  private vulnerabilidadeSocial: string; // S-Sim, N-Não

  // Endereço (opcional)
  private uf: string; // Unidade Federativa (2 caracteres)
  private cidade: string; // Código do município (12 caracteres)
  private tipoLogradouro: string; // Tipo do logradouro (20 caracteres)
  private logradouro: string; // Descrição do logradouro (72 caracteres)
  private numeroLogradouro: string; // Número do logradouro (8 caracteres)
  private complementoLogradouro: string; // Complemento do logradouro (5 caracteres)
  private bairro: string; // Nome do bairro (72 caracteres)
  private cep: string; // Código do CEP (8 caracteres)
  constructor() {
    // Campos obrigatórios
    this.dataNascimento = "";
    this.sexo = "";

    // Campos opcionais
    this.cpf = "";
    this.recemNascido = "";
    this.particular = "";
    this.cns = "";
    this.codigoIdentificacao = "";
    this.vulnerabilidadeSocial = "";

    // Endereço
    this.uf = "";
    this.cidade = "";
    this.tipoLogradouro = "";
    this.logradouro = "";
    this.numeroLogradouro = "";
    this.complementoLogradouro = "";
    this.bairro = "";
    this.cep = "";
  }

  public setDataNascimento(dataNascimento) {
    this.dataNascimento = dataNascimento;
  }

  public setSexo(sexo) {
    this.sexo = sexo;
  }

  public setCpf(cpf) {
    this.cpf = cpf;
  }

  public setUf(uf) {
    this.uf = uf;
  }

  public setCidade(cidade) {
    this.cidade = cidade;
  }

  public setTipoLogradouro(tipoLogradouro) {
    this.tipoLogradouro = tipoLogradouro;
  }

  public setLogradouro(logradouro) {
    this.logradouro = logradouro;
  }

  public setNumeroLogradouro(numeroLogradouro) {
    this.numeroLogradouro = numeroLogradouro;
  }

  public setComplementoLogradouro(complementoLogradouro) {
    this.complementoLogradouro = complementoLogradouro;
  }

  public setBairro(bairro) {
    this.bairro = bairro;
  }

  public setCep(cep) {
    this.cep = cep;
  }

  public setVulnerabilidadeSocial(vulnerabilidadeSocial) {
    this.vulnerabilidadeSocial = vulnerabilidadeSocial;
  }

  public setRecemNascido(recemNascido) {
    this.recemNascido = recemNascido;
  }

  public setCns(cns) {
    this.cns = cns;
  }

  public setParticular(particular) {
    this.particular = particular;
  }

  public setCodigoIdentificacao(codigoItentificacao) {
    this.codigoIdentificacao = codigoItentificacao;
  }

  public getData(): object {
    return {
      dataNascimento: this.dataNascimento,
      sexo: this.sexo,
      cpf: this.cpf,
      recemNascido: this.recemNascido,
      particular: this.particular,
      cns: this.cns,
      codigoIdentificacao: this.codigoIdentificacao,
      vulnerabilidadeSocial: this.vulnerabilidadeSocial,
      uf: this.uf,
      cidade: this.cidade,
      tipoLogradouro: this.tipoLogradouro,
      logradouro: this.logradouro,
      numeroLogradouro: this.numeroLogradouro,
      complementoLogradouro: this.complementoLogradouro,
      bairro: this.bairro,
      cep: this.cep,
    };
  }
}
