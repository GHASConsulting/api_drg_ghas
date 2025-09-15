import { executeProcedure } from '../../utils/executeProcedure'
import { enviaPareclado } from './enviaParcelado'

export async function executeCron() {
  console.log('CHAMOU O CRON')
  await executeProcedure()
  await enviaPareclado()
}
