export class PartoAdequado {
  // Campos opcionais para todas as situações (usado apenas para internações obstétricas)
  private antecedentesObstetricos: string; // NL-Nulípara, MS-Multípara Sem CS Anterior, MC-Multípara Com CS Anterior
  private numeroCesareasAnteriores: string; // Número de Cesáreas Anteriores (1 a 8)
  private apresentacaoFetalRn1: string; // CF-Cefálica, PN-Pélvica, CN-Córmica
  private apresentacaoFetalRn2: string; // CF-Cefálica, PN-Pélvica, CN-Córmica
  private apresentacaoFetalRn3: string; // CF-Cefálica, PN-Pélvica, CN-Córmica
  private apresentacaoFetalRn4: string; // CF-Cefálica, PN-Pélvica, CN-Córmica
  private apresentacaoFetalRn5: string; // CF-Cefálica, PN-Pélvica, CN-Córmica
  private inicioTrabalhoParto: string; // EP-Espontâneo, IZ-Induzido, CS-CS Antes do Início TP
  private rupturaUterina: string; // S-Sim, N-Não
  private laceracaoPerineal: string; // S-Sim, N-Não
  private transfusaoSanguinea: string; // S-Sim, N-Não
  private morteMaterna: string; // S-Sim, N-Não
  private morteFetalIntraparto: string; // S-Sim, N-Não
  private admissaoMaternaUti: string; // S-Sim, N-Não
  private retornoSalaParto: string; // S-Sim, N-Não
  private indiceSatisfacaoHospital: string; // Índice de satisfação com hospital (1 a 10)
  private indiceSatisfacaoEquipe: string; // Índice de satisfação com equipe (1 a 10)
  private houveContatoPele: string; // S-Sim, N-Não
  private posicaoParto: string; // 1-Supino, 2-Não Supino
  private medicacaoInducaoParto: string; // S-Sim, N-Não
  private usoOcitocinaMisoprostol: string; // 1-1º ou 2º Estágio, 3-3º Estágio
  private parturienteAcompanhada: string; // S-Sim, N-Não
  private presencaDoula: string; // S-Sim, N-Não
  private realizadaEpisiotomia: string; // S-Sim, N-Não
  private houveAleitamentoMaterno: string; // S-Sim, N-Não
  private quandoOcorreuClampeamento: string; // 1-Imediatamente, 2-Até 30 segundos, 3-De 30 a 60 segundos, 4-Após 1 minuto
  private houveMetodosAnalgesia: string; // S-Sim, N-Não
  private metodoAnalgesia: string; // Qual o método de analgesia utilizado (600 caracteres)
  private perimetroCefalicoRn1: string; // Perímetro cefálico do RN1 em cm (99.9)
  private perimetroCefalicoRn2: string; // Perímetro cefálico do RN2 em cm (99.9)
  private perimetroCefalicoRn3: string; // Perímetro cefálico do RN3 em cm (99.9)
  private perimetroCefalicoRn4: string; // Perímetro cefálico do RN4 em cm (99.9)
  private perimetroCefalicoRn5: string; // Perímetro cefálico do RN5 em cm (99.9)
  private cesariana: string; // I-Com Indicação Médica, P-A Pedido da Paciente
  private numeroPartosAnteriores: string; // Número de partos anteriores a gravidez atual

  constructor() {
    this.antecedentesObstetricos = "";
    this.numeroCesareasAnteriores = "";
    this.apresentacaoFetalRn1 = "";
    this.apresentacaoFetalRn2 = "";
    this.apresentacaoFetalRn3 = "";
    this.apresentacaoFetalRn4 = "";
    this.apresentacaoFetalRn5 = "";
    this.inicioTrabalhoParto = "";
    this.rupturaUterina = "";
    this.laceracaoPerineal = "";
    this.transfusaoSanguinea = "";
    this.morteMaterna = "";
    this.morteFetalIntraparto = "";
    this.admissaoMaternaUti = "";
    this.retornoSalaParto = "";
    this.indiceSatisfacaoHospital = "";
    this.indiceSatisfacaoEquipe = "";
    this.houveContatoPele = "";
    this.posicaoParto = "";
    this.medicacaoInducaoParto = "";
    this.usoOcitocinaMisoprostol = "";
    this.parturienteAcompanhada = "";
    this.presencaDoula = "";
    this.realizadaEpisiotomia = "";
    this.houveAleitamentoMaterno = "";
    this.quandoOcorreuClampeamento = "";
    this.houveMetodosAnalgesia = "";
    this.metodoAnalgesia = "";
    this.perimetroCefalicoRn1 = "";
    this.perimetroCefalicoRn2 = "";
    this.perimetroCefalicoRn3 = "";
    this.perimetroCefalicoRn4 = "";
    this.perimetroCefalicoRn5 = "";
    this.cesariana = "";
    this.numeroPartosAnteriores = "";
  }

  public setMedicacaoInducaoParto(medicacaoInducaoParto: string): void {
    this.medicacaoInducaoParto = medicacaoInducaoParto;
  }

  public setCesariana(cesariana: string): void {
    this.cesariana = cesariana;
  }

  public setNumeroPartosAnteriores(numeroPartosAnteriores: string): void {
    this.numeroPartosAnteriores = numeroPartosAnteriores;
  }

  public getData(): object {
    return {
      antecedentesObstetricos: this.antecedentesObstetricos,
      numeroCesareasAnteriores: this.numeroCesareasAnteriores,
      apresentacaoFetalRn1: this.apresentacaoFetalRn1,
      apresentacaoFetalRn2: this.apresentacaoFetalRn2,
      apresentacaoFetalRn3: this.apresentacaoFetalRn3,
      apresentacaoFetalRn4: this.apresentacaoFetalRn4,
      apresentacaoFetalRn5: this.apresentacaoFetalRn5,
      inicioTrabalhoParto: this.inicioTrabalhoParto,
      rupturaUterina: this.rupturaUterina,
      laceracaoPerineal: this.laceracaoPerineal,
      transfusaoSanguinea: this.transfusaoSanguinea,
      morteMaterna: this.morteMaterna,
      morteFetalIntraparto: this.morteFetalIntraparto,
      admissaoMaternaUti: this.admissaoMaternaUti,
      retornoSalaParto: this.retornoSalaParto,
      indiceSatisfacaoHospital: this.indiceSatisfacaoHospital,
      indiceSatisfacaoEquipe: this.indiceSatisfacaoEquipe,
      houveContatoPele: this.houveContatoPele,
      posicaoParto: this.posicaoParto,
      medicacaoInducaoParto: this.medicacaoInducaoParto,
      usoOcitocinaMisoprostol: this.usoOcitocinaMisoprostol,
      parturienteAcompanhada: this.parturienteAcompanhada,
      presencaDoula: this.presencaDoula,
      realizadaEpisiotomia: this.realizadaEpisiotomia,
      houveAleitamentoMaterno: this.houveAleitamentoMaterno,
      quandoOcorreuClampeamento: this.quandoOcorreuClampeamento,
      houveMetodosAnalgesia: this.houveMetodosAnalgesia,
      metodoAnalgesia: this.metodoAnalgesia,
      perimetroCefalicoRn1: this.perimetroCefalicoRn1,
      perimetroCefalicoRn2: this.perimetroCefalicoRn2,
      perimetroCefalicoRn3: this.perimetroCefalicoRn3,
      perimetroCefalicoRn4: this.perimetroCefalicoRn4,
      perimetroCefalicoRn5: this.perimetroCefalicoRn5,
      cesariana: this.cesariana,
      numeroPartosAnteriores: this.numeroPartosAnteriores,
    };
  }
}
