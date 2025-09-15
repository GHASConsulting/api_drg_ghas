import knex from '../config/database'
export async function executeProcedure() {
  await knex.raw(`BEGIN INOVEMED.PRC_INM_DIARIA(); END;`)
}
