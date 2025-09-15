import fs from 'fs/promises' // Use 'fs/promises' para await diretamente
import { makeDirectory } from './makeDirectory'
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'log.json' })],
})

export async function writeLog(xml: string, customFileName?: string) {
  try {
    const folder = await makeDirectory()

    // Adição de uma verificação defensiva caso makeDirectory retorne undefined por algum motivo
    // Embora o ideal seja que makeDirectory lance um erro neste caso.
    if (!folder) {
      const errorMessage = 'O caminho do diretório não foi retornado por makeDirectory.'
      console.error(errorMessage)
      logger.error(errorMessage)
      return // Sai da função se o folder for inválido
    }

    const now = new Date()
    const hour = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')
    const date = now.toISOString().slice(0, 10).replace(/-/g, '')
    
    // Se foi passado um nome customizado, usa ele, senão usa o padrão
    const fileName = customFileName 
      ? `${customFileName}_${date}-${hour}-${minute}.xml`
      : `${date}-${hour}-${minute}.xml`
    
    const filePath = `${folder}${fileName}`

    try {
      // Tenta acessar o arquivo. Se existir, anexa.
      await fs.access(filePath)
      await fs.appendFile(filePath, xml)
      console.log(`Dados foram anexados ao arquivo ${fileName} em ${folder}`)
      logger.info(`Dados foram anexados ao arquivo ${fileName} em ${folder}`)
    } catch (err: any) { // Explicitamente tipado para 'any' para acessar 'code'
      // Se o arquivo não existir (ENOENT), cria. Outros erros são re-lançados.
      if (err.code === 'ENOENT') {
        await fs.writeFile(filePath, xml)
        console.log(`Arquivo ${fileName} foi criado em ${folder}`)
        logger.info(`Arquivo ${fileName} foi criado em ${folder}`)
      } else {
        // Lidar com outros erros de arquivo que não seja 'arquivo não encontrado'
        console.error(`Erro ao manipular o arquivo ${filePath}:`, err)
        logger.error(`Erro ao manipular o arquivo ${filePath}: ${err.message}`)
      }
    }
  } catch (err: any) {
    // Captura erros da makeDirectory ou outros erros inesperados antes da manipulação do arquivo
    console.error(`Erro geral no processo de log: ${err.message}`)
    logger.error(`Erro geral no processo de log: ${err.message}`)
  }
}