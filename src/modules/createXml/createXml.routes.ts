import { FastifyInstance } from 'fastify/fastify'
import { executeProcedure } from '../../utils/executeProcedure'
import { enviaPareclado } from './enviaParcelado'
import { admission } from './admissionSend'
import knex from '../../config/database'
import { z } from 'zod'

/** @description create a XML route, only for test. */
export async function createXmlRoutes(app: FastifyInstance) {
  app.get('/createxml', async () => {
    await executeProcedure()
    await enviaPareclado()
  })
}
export async function createXmlParams(app: FastifyInstance) {
  app.get('/createxml/:nr_atendimento', async (request, reply) => {
    const TBL_ATENDIMENTO = process.env.TBL_ATENDIMENTO
    const createXmlParamsSchema = z.object({
      nr_atendimento: z.coerce.number(),
    })
    const { nr_atendimento } = createXmlParamsSchema.parse(request.params)
    const dataAtendimentoFromDatabase = await knex
      .select('*')
      .from(TBL_ATENDIMENTO)
      .where({ TP_STATUS: 'A', NR_ATENDIMENTO: nr_atendimento })
      .orderBy('SITUACAO_INTERNACAO', 'ASC')
    if (!dataAtendimentoFromDatabase[0]) {
      console.log('NENHUM DADO ENCONTRADO.')
      return reply.send({ message: 'Nenhum dado encontrado' })
    }

    let newParam :any = []

    dataAtendimentoFromDatabase.forEach(item => {
   
      if(item?.CD_HOSPITAL != null){
        newParam.push(item)
      }
    
    })

    await admission(newParam)
    return reply.send({ message: 'Envio realizado.' })
  })
}