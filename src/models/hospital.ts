export class Hospital {
  // Campos obrigatórios para situações 1, 2 e 3
  private codigo: string; // Código de identificação do hospital (máx 15 caracteres)
  private nome: string; // Nome do hospital (máx 120 caracteres)
  private cnes: string; // CNES do hospital (máx 15 caracteres)
  private porte: string; // 1-Pequeno, 2-Médio, 3-Grande
  private complexidade: string; // 1-Atenção Média Complexidade, 2-Atenção Alta Complexidade
  private esferaAdministrativa: string; // 1-Federal, 2-Estadual, 3-Municipal, 4-Privada
  private tipoLogradouro: string; // Tipo do logradouro (máx 20 caracteres)
  private logradouro: string; // Descrição do logradouro (máx 72 caracteres)
  private numeroLogradouro: string; // Número do logradouro (máx 8 caracteres)
  private bairro: string; // Nome do bairro (máx 72 caracteres)
  private uf: string; // Unidade Federativa (2 caracteres)
  private cidade: string; // Código do município (máx 12 caracteres)
  private cep: string; // Código do CEP (8 caracteres)

  // Campo opcional
  private complementoLogradouro: string; // Complemento do logradouro (máx 100 caracteres)

  constructor() {
    this.codigo = "";
    this.nome = "";
    this.cnes = "";
    this.porte = "";
    this.complexidade = "";
    this.esferaAdministrativa = "";
    this.uf = "";
    this.cidade = "";
    this.tipoLogradouro = "";
    this.logradouro = "";
    this.numeroLogradouro = "";
    this.complementoLogradouro = "";
    this.bairro = "";
    this.cep = "";
  }

  public setCodigo(codigo) {
    this.codigo = codigo;
  }

  public setNome(nome) {
    this.nome = nome;
  }

  public setCnes(cnes) {
    this.cnes = cnes;
  }

  public setPorte(porte) {
    this.porte = porte;
  }

  public setComplexidade(complexidade) {
    this.complexidade = complexidade;
  }

  public setEsferaAdministrativa(esferaAdministrativa) {
    this.esferaAdministrativa = esferaAdministrativa;
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
    };
  }
}
