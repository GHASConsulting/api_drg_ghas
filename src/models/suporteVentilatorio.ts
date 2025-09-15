import { CondicaoAdquiridaSuporteVentilatorio } from './condicaoAdquiridaSuporteVentilatorio'

export class SuporteVentilatorio {
  private tipo: string
  private tipoInvasivo: string
  private local: string
  private dataInicial: string
  private dataFinal: string
  private condicaoAdquiridaSuporteVentilatorio: CondicaoAdquiridaSuporteVentilatorio
  private condicoesAdquiridasSuportesVentilatorios: CondicaoAdquiridaSuporteVentilatorio[]

  constructor() {
    this.tipo = ''
    this.tipoInvasivo = ''
    this.local = ''
    this.dataInicial = ''
    this.dataFinal = ''
    this.condicaoAdquiridaSuporteVentilatorio =
      new CondicaoAdquiridaSuporteVentilatorio()
    this.condicoesAdquiridasSuportesVentilatorios = []
  }

  public addCondicaoAdquiridaSuporteVentilatorio(
    condicaoAdquiridaSuporteVentilatorio,
  ) {
    this.condicoesAdquiridasSuportesVentilatorios.push(
      condicaoAdquiridaSuporteVentilatorio,
    )
  }

  public setTipo(tipo) {
    this.tipo = tipo
  }

  public setTipoInvasivo(tipoInvasivo) {
    this.tipoInvasivo = tipoInvasivo
  }

  public setLocal(local) {
    this.local = local
  }

  public setDataInicial(dataInicial) {
    this.dataInicial = dataInicial
  }

  public setDataFinal(dataFinal) {
    this.dataFinal = dataFinal
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
            condicaoAdquiridaSuporteVentilatorio.getData(),
        ),
    }
  }
}
