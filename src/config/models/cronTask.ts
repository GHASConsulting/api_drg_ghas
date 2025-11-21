import { CronJob } from 'cron'

function isValidCronExpression(cronExpression: string): boolean {
  // Aceita expressões cron com 5 ou 6 campos
  // Formato: [segundo] minuto hora dia mês dia-da-semana
  // Exemplos válidos: "*/5 * * * *" ou "0 */5 * * * *"
  
  const parts = cronExpression.trim().split(/\s+/)
  
  // Deve ter 5 ou 6 partes
  if (parts.length !== 5 && parts.length !== 6) {
    return false
  }
  
  // Valida cada parte usando uma regex mais flexível
  // Aceita: *, */n, n, n-m, n,m, n-m/x
  const cronPartRegex = /^(\*|\*\/\d+|\d+|\d+-\d+|\d+,\d+|\d+-\d+\/\d+|\d+\/\d+)$/
  
  for (const part of parts) {
    if (!cronPartRegex.test(part)) {
      return false
    }
  }
  
  // Tenta criar um CronJob para validação final
  try {
    new CronJob(cronExpression, () => {})
    return true
  } catch {
    return false
  }
}

export class CronTask {
  private isTaskRunning = false
  private time: string

  constructor(
    private task: () => Promise<void>,
    time?: string,
  ) {
    if (time) {
      const isTimeValid = isValidCronExpression(time)

      if (!isTimeValid) {
        throw new Error('❌ Cron Expression not valid!')
      }

      this.time = time
    } else {
      this.time = '*/1 * * * * *'
    }
  }

  private executeCronTask = async () => {
    if (this.isTaskRunning) {
      return
    }

    try {
      this.isTaskRunning = true
      await this.task()
    } catch (error) {
      console.error('Ocorreu um erro durante a execução da tarefa:', error)
    } finally {
      this.isTaskRunning = false
    }
  }

  public start() {
    const job = new CronJob(this.time, this.executeCronTask)
    job.start()
  }
}
