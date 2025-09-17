import { makeDirectory } from './makeDirectory'
import fs from 'fs/promises'

export async function writeXmlLog(xml: string, fileName: string, estabelecimentoCode?: number) {
  try {
    const folder = await makeDirectory()
    if (!folder) {
      console.error('Erro: Não foi possível obter o diretório de logs')
      return
    }

    // Cria subdiretório por estabelecimento
    const estabelecimentoFolder = estabelecimentoCode 
      ? `${folder}estabelecimento_${estabelecimentoCode}/`
      : folder
    
    // Cria o diretório se não existir
    try {
      await fs.access(estabelecimentoFolder)
    } catch {
      await fs.mkdir(estabelecimentoFolder, { recursive: true })
    }

    const now = new Date()
    const hour = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')
    const date = now.toISOString().slice(0, 10).replace(/-/g, '')
    const fullFileName = `${fileName}_${date}-${hour}-${minute}.xml`
    const filePath = `${estabelecimentoFolder}${fullFileName}`

    await fs.writeFile(filePath, xml)
    console.log(`Log XML salvo: ${estabelecimentoFolder}${fullFileName}`)
  } catch (error) {
    console.error('Erro ao salvar log XML:', error)
  }
}