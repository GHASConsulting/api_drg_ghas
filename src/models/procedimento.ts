import { MedicoProcedimento } from './medicoProcedimento'

export class Procedimento {
  private codigoProcedimento: string
  private dataAutorizacao: string
  private dataExecucao: string
  private dataSolicitacao: string
  private dataExecucaoFinal: string

  private medicoProcedimento: MedicoProcedimento
  private medicosProcedimentos: MedicoProcedimento[]

  constructor() {
    this.codigoProcedimento = ''
    this.dataAutorizacao = ''

    this.dataExecucao = ''
    this.dataSolicitacao = ''

    this.dataExecucaoFinal = ''

    this.medicoProcedimento = new MedicoProcedimento()
    this.medicosProcedimentos = []
  }

  public setCodigoProcedimento(codigoProcedimento) {
    this.codigoProcedimento = codigoProcedimento
  }

  public setDataExecucao(dataExecucao) {
    this.dataExecucao = dataExecucao
  }

  public setDataAutorizacao(dataAutorizacao) {
    this.dataAutorizacao = dataAutorizacao
  }

  public setDataSolicitacao(dataSolicitacao) {
    this.dataSolicitacao = dataSolicitacao
  }

  public setDataExecucaoFinal(dataExecucaoFinal) {
    this.dataExecucaoFinal = dataExecucaoFinal
  }

  public addMedicoProcedimento(medicoProcedimento: MedicoProcedimento): void {
    this.medicosProcedimentos.push(medicoProcedimento)
  }

  public getData(): object {
    return {
      codigoProcedimento: this.codigoProcedimento,
      dataAutorizado: this.dataAutorizacao,
      dataExecucao: this.dataExecucao,
      dataSolicitacao: this.dataSolicitacao,
      dataExecucaoFinal: this.dataExecucaoFinal,
      MedicoProcedimento: this.medicosProcedimentos.map((medicoProcedimento) =>
        medicoProcedimento.getData(),
      ),
    }
  }
}
