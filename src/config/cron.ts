import { CronTask } from './models/cronTask'
import { executeCron } from '../modules/createXml/executeCron'

let QTD_CRON = 0
const STR_HORAS_CRON = process.env.HORARIOS_CRON
const strHora = []
const strMin = []

for (let i = 1; i < STR_HORAS_CRON.length; i++) {
  if (STR_HORAS_CRON[i] === ':') {
    QTD_CRON++
    let string1 = ''

    for (let j = i - 2; j < i; j++) {
      string1 += STR_HORAS_CRON[j]
    }
    strHora.push(string1)
  }
  if (STR_HORAS_CRON[i] === ';') {
    let string2 = ''
    for (let j = i - 2; j < i; j++) {
      string2 += STR_HORAS_CRON[j]
    }
    strMin.push(string2)
  }
}
console.log('O CRON RODARÁ ' + QTD_CRON + ' VEZES.')
for (let i = 0; i < QTD_CRON; i++) {
  console.log(i + 1 + '° HORÁRIO: ' + parseInt(strHora[i]) + ':' + strMin[i])
}

for (let i = 0; i < QTD_CRON; i++) {
  const admissionCron = new CronTask(
    executeCron,
    `0 ${parseInt(strMin[i])} ${parseInt(strHora[i])} * * *`,
  )
  admissionCron.start()
}

// const admissionCron = new CronTask(executeCron, '0 0 8 * * *')
// admissionCron.start()

// // Meio dia
// const middayAdmission = new CronTask(executeCron, '0 0 12 * * *')
// middayAdmission.start()

// // 16 horas da tarde
// const afternoonAdmission = new CronTask(executeCron, '0 0 16 * * *')
// afternoonAdmission.start()
