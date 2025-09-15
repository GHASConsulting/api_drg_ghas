import { CronJob } from 'cron'

function isValidCronExpression(cronExpression: string): boolean {
  const cronRegex =
    /^(\*|((\*\/)?[1-5]?[0-9])) (\*|((\*\/)?[1-5]?[0-9])) (\*|((\*\/)?(1?[0-9]|2[0-3]))) (\*|((\*\/)?([1-9]|[12][0-9]|3[0-1]))) (\*|((\*\/)?([1-9]|1[0-2]))) (\*|((\*\/)?[0-6]))$/

  return cronRegex.test(cronExpression)
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
