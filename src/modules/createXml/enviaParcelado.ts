import knex from '../../config/database'
import { admission } from './admissionSend'

export async function enviaPareclado() {
  const TBL_ATENDIMENTO = process.env.TBL_ATENDIMENTO  

  // Busca todos os atendimentos pendentes
  const dataAtendimentoFromDatabase = await knex
    .select('*')
    .from(TBL_ATENDIMENTO)
    .where({ TP_STATUS: 'A' })
    .orderBy('SITUACAO_INTERNACAO', 'ASC')

  if (!dataAtendimentoFromDatabase[0]) {
    console.log('NENHUM DADO ENCONTRADO.')
    return
  }

  console.log(dataAtendimentoFromDatabase)




  console.log(
    'FEZ O SELECT DE ' + dataAtendimentoFromDatabase.length + ' INTERNACOES',
  )

  // Separa os atendimentos por estabelecimento baseado no CD_HOSPITAL
  const atendimentosPorEstabelecimento: { [key: number]: any[] } = {}

  dataAtendimentoFromDatabase.forEach(item => {
    if (item?.CD_HOSPITAL != null) {
      if (!atendimentosPorEstabelecimento[item.CD_HOSPITAL]) {
        atendimentosPorEstabelecimento[item.CD_HOSPITAL] = []
      }
      atendimentosPorEstabelecimento[item.CD_HOSPITAL].push(item)
    }
  })

  console.log('Atendimentos separados por estabelecimento:', Object.keys(atendimentosPorEstabelecimento).map(key => ({
    hospital: key,
    quantidade: atendimentosPorEstabelecimento[parseInt(key)].length
  })))

  // Processa cada estabelecimento separadamente
  for (const [hospitalCode, atendimentos] of Object.entries(atendimentosPorEstabelecimento)) {
    const hospitalCodeNum = parseInt(hospitalCode)
    console.log(`\n=== Processando estabelecimento ${hospitalCodeNum} com ${atendimentos.length} atendimentos ===`)

    // Se tem mais de 15 atendimentos, processa em lotes
    if (atendimentos.length <= 15) {
      await admission(atendimentos, hospitalCodeNum)
    } else {
      let qtdRestante = atendimentos.length
      let indiceInicial = 0

      while (qtdRestante > 0) {
        const lote = atendimentos.slice(indiceInicial, indiceInicial + 15)
        console.log(`Enviando lote de ${lote.length} atendimentos para hospital ${hospitalCodeNum}`)
        
        await admission(lote, hospitalCodeNum)
        
        indiceInicial += 15
        qtdRestante -= lote.length
        console.log(`FALTAM ${qtdRestante} INTERNAÇÕES para hospital ${hospitalCodeNum}`)
      }
    }
  }

  console.log('\n=== Processamento concluído para todos os estabelecimentos ===')
}
