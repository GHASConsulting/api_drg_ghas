import { CondicaoAdquiridaSuporteVentilatorio } from "./condicaoAdquiridaSuporteVentilatorio";

export class SuporteVentilatorio {
  // Campos opcionais para todas as situações
  private tipo: string; // I-Invasivo, N-Não Invasivo, S-Sem Informação
  private tipoInvasivo: string; // T-Traqueostomia, U-Tubo Oro/Nasotraqueal, S-Sem Informação
  private local: string; // C-No CTI, F-Fora do CTI, S-Sem Informação
  private dataInicial: string; // Data inicial do suporte ventilatório (yyyy-MM-ddTHH:mm:ss)
  private dataFinal: string; // Data final do suporte ventilatório (yyyy-MM-ddTHH:mm:ss)

  // Relacionamento com condições adquiridas
  private condicaoAdquiridaSuporteVentilatorio: CondicaoAdquiridaSuporteVentilatorio;
  private condicoesAdquiridasSuportesVentilatorios: CondicaoAdquiridaSuporteVentilatorio[];

  constructor() {
    this.tipo = "";
    this.tipoInvasivo = "";
    this.local = "";
    this.dataInicial = "";
    this.dataFinal = "";
    this.condicaoAdquiridaSuporteVentilatorio =
      new CondicaoAdquiridaSuporteVentilatorio();
    this.condicoesAdquiridasSuportesVentilatorios = [];
  }

  public addCondicaoAdquiridaSuporteVentilatorio(
    condicaoAdquiridaSuporteVentilatorio
  ) {
    this.condicoesAdquiridasSuportesVentilatorios.push(
      condicaoAdquiridaSuporteVentilatorio
    );
  }

  public setTipo(tipo) {
    this.tipo = tipo;
  }

  public setTipoInvasivo(tipoInvasivo) {
    this.tipoInvasivo = tipoInvasivo;
  }

  public setLocal(local) {
    this.local = local;
  }

  public setDataInicial(dataInicial) {
    this.dataInicial = dataInicial;
  }

  public setDataFinal(dataFinal) {
    this.dataFinal = dataFinal;
  }

  public getData(): object {
    return {
      tipo: this.tipo,
      tipoInvasivo: this.tipoInvasivo,
      local: this.local,
      dataInicial: this.dataInicial,
      dataFinal: this.dataFinal,
      CondicaoAdquiridaSuporteVentilatorio:
        this.condicoesAdquiridasSuportesVentilatorios.map(
          (condicaoAdquiridaSuporteVentilatorio) =>
            condicaoAdquiridaSuporteVentilatorio.getData()
        ),
    };
  }
}
