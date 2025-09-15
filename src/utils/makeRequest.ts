import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'

/** @description Performs the request regardless of the configuration */
export async function makeRequest(xml: any, hospitalCode: number) {
  try {

    // O código do hospital é igual ao código do estabelecimento
    // Usa diretamente o hospitalCode para buscar as credenciais
    const estabelecimentoCode = hospitalCode

    // Busca a string de configuração baseada no código do estabelecimento
    let stringEstabelecimento = ''
    
    // Tenta buscar a configuração específica do estabelecimento
    const configKey = `STRING_ESTABELECIMENTO_DRG_${estabelecimentoCode}`
    stringEstabelecimento = process.env[configKey] || ''

    // Se não encontrar configuração específica, usa a padrão
    if (!stringEstabelecimento) {
      stringEstabelecimento = process.env.STRING_ESTABELECIMENTO_DRG_DEFAULT || ''
    }

    // Extrai as credenciais da string de configuração
    function extrairCredenciais(configString?: string) {
      let estabelecimento: string | undefined = undefined
      let apiUser: string | undefined = undefined
      let apiPassword: string | undefined = undefined

      if (configString) {
        const matchEstabelecimento = configString.match(/\[ESTABELECIMENTO=(\d+)\]/)
        if (matchEstabelecimento && matchEstabelecimento[1]) {
          estabelecimento = matchEstabelecimento[1]
        }

        const matchApiUser = configString.match(/\[api_user=([^\]]+)\]/i)
        apiUser = matchApiUser && matchApiUser[1] ? matchApiUser[1].replace(/"/g, '') : undefined

        const matchApiPassword = configString.match(/\[api_password=([^\]]+)\]/i)
        apiPassword = matchApiPassword && matchApiPassword[1] ? matchApiPassword[1].replace(/"/g, '') : undefined
      }

      return {
        estabelecimento,
        apiUser,
        apiPassword
      }
    }

    const credenciais = extrairCredenciais(stringEstabelecimento)
    
    const usuarioIAG = credenciais.apiUser || process.env.API_USER
    const senhaIAG = credenciais.apiPassword || process.env.API_PASSWORD

    console.log(`Enviando para estabelecimento ${credenciais.estabelecimento} (Hospital/Estabelecimento ${estabelecimentoCode})`)
    console.log(`Usuário: ${usuarioIAG}`)
    console.log(`Senha: ${senhaIAG}`)

    const wsdlUrl =
      'https://iagwebservice.sigquali.com.br/iagwebservice/importaInternacao?wsdl'

    const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.iagwebservice.sigquali.com.br/">
      <soapenv:Header/>
      <soapenv:Body>
        <ser:importaInternacao>
          <!--Optional:-->
          <xml><![CDATA[${xml}]]></xml>
          <!--Optional:-->
          <usuarioIAG>${usuarioIAG}</usuarioIAG>
          <!--Optional:-->
          <senhaIAG>${senhaIAG}</senhaIAG>
        </ser:importaInternacao>
      </soapenv:Body>
    </soapenv:Envelope>
  `

    const headers = {
      'Content-Type': 'text/xml;charset=UTF-8',
    }
    const response = await axios.post(wsdlUrl, soapEnvelope, { headers })

    return response
  } catch (error) {
    return error
  }
}
