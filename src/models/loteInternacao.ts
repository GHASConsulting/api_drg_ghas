import { create } from 'xmlbuilder2'
import { Internacao } from './internacao'

export class LoteInternacao {
  private internacoes: Internacao[]
  constructor() {
    this.internacoes = []
  }

  public addInternacao(internacao: Internacao): void {
    this.internacoes.push(internacao)
  }

  public generateXML(): string {
    const data = {
      loteInternacao: {
        Internacao: this.internacoes.map((internacao) => internacao.getData()),
      },
    }

    return create(data).end({ prettyPrint: true })
  }
}
