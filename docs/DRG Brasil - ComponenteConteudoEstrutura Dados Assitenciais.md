# Única

|BANCO|API| | | | | | | | | | |
|---|---|---|---|---|---|---|---|---|---|---|---|
| | |<Internacao>|OK| | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Situação|Texto|1|Código da situação da internação.|1 - Admissional 2 - Prorrogação 3 - Alta 4 - Autorização| |Obrigatório|Obrigatório|Obrigatório|<situacao></situacao>|
| | |Caráter da Internação|Texto|1|Código do caráter da internação.|1 - Eletivo 2 - Urgência 3 - Emergência 4 - Trauma 9 - Não Definido| |Obrigatório|Obrigatório|Obrigatório|<caraterInternacao></caraterInternacao>|
| | |Procedência do Paciente|Texto|1|Código da procedência do paciente.|M - Comunidade I - Instituição de longa permanência D - Atenção domiciliar C - Transferido de hospital de curta permanência L - Transferido de hospital de longa permanência - unidade de cuidados crônicos, reabilitação P - Próprio Hospital U - Unidade de Pronto Atendimento| |-|-|-|<procedencia></procedencia>|
| | |Leito|Texto|50|Número do leito de internação do paciente.| | |-|-|-|<leito></leito>|
| | |Número da Operadora-Fonte Pagadora|Texto|25|Número da operadora-Fonte Pagadora na ANS.| | |-|-|-|<numeroOperadora></numeroOperadora>|
| | |Número do Registro|Texto|25|Número de identificação do paciente no Hospital.| | |-|-|-|<numeroRegistro></numeroRegistro>|
| | |Número de Atendimento|Texto|25|Número de atendimento do paciente no Hospital.| | |Obrigatório se Número da Autorização não informado|Obrigatório se Numero da Autorização não informado|Obrigatório se Numero da Autorização não informado|<numeroAtendimento></numeroAtendimento>|
| | |Número da Autorização|Texto|25|Número da autorização.| | |Obrigatório se Número de Atendimento não informado|Obrigatório se Número de Atendimento não informado|Obrigatório se Número de Atendimento não informado|<numeroAutorizacao></numeroAutorizacao>|
| | |Data de Internação|Data| |Data e hora de internação.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|Obrigatório|Obrigatório|<dataInternacao></dataInternacao>|
| | |Data da Alta|Data| |Data e hora da alta.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|Obrigatório|<dataAlta></dataAlta>|
| | |Condição da Alta|Texto|1|Código da condição da alta.|A - Casa/Auto-Cuidado I - Instituição de longa permanência D - Atenção domiciliar P - Alta a pedido C - Transferido para hospital de curta permanência L - Transferido para hospital de longa permanência - unidade de cuidados crônicos, reabilitação O - Óbito E - Evasão| |-|-|Obrigatório|<condicaoAlta></condicaoAlta>|
| | |Código do CID Principal|Texto|15|Código do CID principal.|Tabela CID-10 versão 2008| |Obrigatório|Obrigatório|Obrigatório|<codigoCidPrincipal></codigoCidPrincipal>|
| | |Data da Autorização|Data| |Data da autorização da internação.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataAutorizacao></dataAutorizacao>|
| | |Paciente Internado Outras Vezes|Texto|1|Indica se o paciente já foi internado outras vezes.|S - Sim N - Não I - Informação não disponível nos registros do Hospital| |-|-|-|<internadoOutrasVezes></internadoOutrasVezes>|
| | |Hospital de Internação Anterior|Texto|1|Indica qual a origem da internação anterior.|N - Neste Hospital O - Outro Hospital I - Informação não disponível nos registros do Hospital| |-|-|-|<hospitalInternacaoAnterior></hospitalInternacaoAnterior>|
| | |Última Internação à 30 dias|Texto|1|Indica se a última internação ocorreu à 30 dias ou menos.|S - Sim N - Não I - Informação não disponível nos registros do Hospital| |-|-|-|<reinternacao></reinternacao>|
| | |Internação é uma complicação ou recaída da internação anterior |Texto|1|Indica se a internação é uma complicação ou recaída da internação anterior.|S - Sim N - Não I - Informação não disponível nos registros do Hospital| |Obrigatório se Última Internação à 30 dias = 'S'|Obrigatório se Última Internação à 30 dias = 'S'|Obrigatório se Última Internação à 30 dias = 'S'|<recaida></recaida>|
| | |Ação|Texto|15|Ação   Obs: a ação INCLUIR é a ação padrão|COMPLEMENTAR EXCLUIR INCLUIR SUBSTITUIR| |-|-|-|<acao></acao>|
| | |Nenhum Dispositivo Terapêutico|Texto|1|Indica que não está sendo enviado nenhum dispositivo terapêutico na internação.|S - Sim N - Não| |Obrigatório se a lista de dispositivos terapêutidcfos está vazia|Obrigatório se a lista de dispositivos terapêutidcfos está vazia|Obrigatório se a lista de dispositivos terapêutidcfos está vazia|<nenhumDispositivoTerapeutico></nenhumDispositivoTerapeutico>|
| | |Nota|Texto|50000|Notas do prontuário do paciente ou sumário de alta para diagnóstico por inteligência artificial.| | |Campo ignorado na autorização| | |<nota></nota>|
| | |Tipo de Nota|Texto|1|Tipo da nota|A - Admissão L - Alta| |Campo ignorado na autorização|Obrigatório se enviado o campo Nota.|Obrigatório se enviado o campo Nota.|<tipoNota></tipoNota>|
| | |Data da Nota|Data| |Data da nota para referênica de condições adquiridas.| |yyyy-MM-ddTHH:mm:ss|Campo ignorado na autorização|Obrigatório se enviado o campo Nota.|Obrigatório se enviado o campo Nota.|<dataNota></dataNota>|
| | | | | | | | | | | | |
| | |<Hospital>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Código do Hospital|Numérico|15|Código de identificação do hospital.| | |-|Obrigatório|Obrigatório|<codigo></codigo>|
| | |Nome do Hospital|Texto|120|Nome do hospital.| | |-|Obrigatório|Obrigatório|<nome></nome>|
| | |CNES|Numérico|15|CNES do hospital.| | |-|Obrigatório|Obrigatório|<cnes></cnes>|
| | |Porte|Numérico|1|Código do porte do hospital.|1 - Pequeno 2 - Médio 3 - Grande| |-|Obrigatório|Obrigatório|<porte></porte>|
| | |Complexidade|Numérico|1|Código da complexidade do hospital.|1 - Atenção de Média Complexidade 2 - Atenção de Alta Complexidade| |-|Obrigatório|Obrigatório|<complexidade></complexidade>|
| | |Esfera Administrativa|Numérico|1|Código da esfera administrativa do hospital.|1- Federal 2 - Estadual 3 - Municipal 4 - Privada| |-|Obrigatório|Obrigatório|<esferaAdministrativa></esferaAdministrativa>|
| | |Tipo do Logradouro|Texto|20|Descrição do tipo de logradouro.|AEROPORTO, ALAMEDA, AREA, AVENIDA, CAMPO, CHACARA, COLONIA, CONDOMÍNIO, CONJUNTO, DISTRITO, ESPLANA, ESTAÇÃO, ESTRADA, FAVELA, FAZENDA, FEIRA, JARDIM, LADEIRA, LAGO, LAGOA, LARGO, LOTEAMENTO, MORRO, NUCLEO, PARQUE, PASSARELA, PÁTIO, PRAÇA, QUADRA, RECANTO, RESIDENCIAL, RODOVIA, RUA, SETOR, SITIO, TRAVESSA, TRECHO, TREVO, VALE, VEREDA, VIA, VIADUTO, VIELA, VIA| |-|Obrigatório|Obrigatório|<tipoLogradouro></tipoLogradouro>|
| | |Logradouro|Texto|72|Descrição do logradouro.| | |-|Obrigatório|Obrigatório|<logradouro></logradouro>|
| | |Número do Logradouro|Texto|8|Número do logradouro.| | |-|Obrigatório|Obrigatório|<numeroLogradouro></numeroLogradouro>|
| | |Complemento do Logradouro|Texto|100|Complemento do logradouro.| | |-|-|-|<complementoLogradouro></complementoLogradouro>|
| | |Bairro|Texto|72|Nome do bairro.| | |-|Obrigatório|Obrigatório|<bairro></bairro>|
| | |UF|Texto|2|Unidade Federativa de endereço do paciente| | |-|Obrigatório|Obrigatório|<uf></uf>|
| | |Município|Numérico|12|Código do município de endereço do paciente conforme tabela de cidades| | |-|Obrigatório|Obrigatório|<cidade></cidade>|
| | |CEP|Texto|8|Código do CEP.| | |-|Obrigatório|Obrigatório|<cep></cep>|
| | | | | | | | | | | | |
| | |<Beneficiario>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Data de Nascimento|Data| |Data de nascimento do beneficiário.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|Obrigatório|Obrigatório|Obrigatório|<dataNascimento></dataNascimento>|
| | |Sexo|Texto|1|Sexo do beneficiário.|M - Masculino F - Feminino I - Indefinido| |Obrigatório|Obrigatório|Obrigatório|<sexo></sexo>|
| | |CPF|Texto|11|CPF do beneficiário (sem mascara)| | |-|-|-|<cpf></cpf>|
| | |Recém Nascido|Texto|1|Indica se o beneficiário é um recém nascido.|S - Sim N - Não| |-|-|-|<recemNascido></recemNascido>|
| | |Particular|Texto|1|Indica se o beneficiário é particular (sem operadora-FontePagadora).|S - Sim N - Não| |-|-|-|<particular></particular>|
| | |UF|Texto|2|Unidade Federativa de endereço do paciente| | |-|-|-|<uf></uf>|
| | |Município|Numérico|12|Código do município de endereço do paciente conforme tabela de cidades| | |-|-|-|<cidade></cidade>|
| | |Tipo do Logradouro|Texto|20|Descrição do tipo de logradouro.|AEROPORTO, ALAMEDA, AREA, AVENIDA, CAMPO, CHACARA, COLONIA, CONDOMÍNIO, CONJUNTO, DISTRITO, ESPLANADA, ESTAÇÃO, ESTRADA, FAVELA, FAZENDA, FEIRA, JARDIM, LADEIRA, LAGO, LAGOA, LARGO, LOTEAMENTO, MORRO, NUCLEO, PARQUE, PASSARELA, PÁTIO, PRAÇA, QUADRA, RECANTO, RESIDENCIAL, RODOVIA, RUA, SETOR, SITIO, TRAVESSA, TRECHO, TREVO, VALE, VEREDA, VIA, VIADUTO, VIELA| |-|-|-|<tipoLogradouro></tipoLogradouro>|
| | |Logradouro|Texto|72|Descrição do logradouro.| | |-|-|-|<logradouro></logradouro>|
| | |Número do Logradouro|Texto|8|Número do logradouro.| | |-|-|-|<numeroLogradouro></numeroLogradouro>|
| | |Complemento do Logradouro|Texto|5|Complemento do logradouro.| | |-|-|-|<complementoLogradouro></complementoLogradouro>|
| | |Bairro|Texto|72|Nome do bairro.| | |-|-|-|<bairro></bairro>|
| | |CEP|Texto|8|Código do CEP.| | |-|-|-|<cep></cep>|
| | |Vulnerabilidade Social|Texto|1|Beneficiario com vulnerabilidade social.|S - Sim N - Não| |-|-|-|<vulnerabilidadeSocial></vulnerabilidadeSocial>|
| | |CNS|Numérico|15|Cartão Nacional de Saúde|15 números obrigatórios| |-|-|-|<cns></cns>|
| | |Código de Identificação|Numérico|15|Código (ID) de identificação do beneficiário na base de dados do cliente.  (Se enviado, deverá ser único por beneficiário)|Numérico| |-|-|-|<codigoIdentificacao></codigoIdentificacao>|
| | | | | | | | | | | | |
|OK| |<Operadora>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
|OK| |Código da Operadora-Fonte Pagadora|Numérico|15|Código de identificação da operadora-Fonte Pagadora.| | |Obrigatório|Obrigatório|Obrigatório|<codigo></codigo>|
|OK| |Plano|Texto|40|Nome do plano do beneficiário na operadora-Fonte Pagadora  de saúde.| | |-|-|-|<plano></plano>|
|OK| |Número da Carteira|Texto|30|Número da carteira do beneficiário na operadora-Fonte Pagadora.| | |Obrigatório|Obrigatório|Obrigatório|<numeroCarteira></numeroCarteira>|
|OK| |Data de Validade|Data| |Data de validade da carteira do beneficiário.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataValidade></dataValidade>|
| | | | | | | | | | | | |
| | |<Medico>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Nome do Médico|Texto|300|Nome do médico.| | |-|Obrigatório|Obrigatório|<nome></nome>|
| | |DDD do Telefone|Numérico|2|DDD do telefone.| | |-|-|-|<ddd></ddd>|
| | |Telefone|Numérico|9|Telefone do médico.| | |-|-|-|<telefone></telefone>|
| | |Email|Texto|600|Email do médico.| | |-|-|-|<email></email>|
| | |UF|Texto|2|UF do CRM do médico.| | |-|Obrigatório|Obrigatório|<uf></uf>|
| | |Número do CRM|Texto|20|Número do CRM do médico para a respectiva UF.| | |-|Obrigatório|Obrigatório|<crm></crm>|
| | |Especialidade|Texto|120|Descrição da especialidade.| | |-|Obrigatório|Obrigatório|<especialidade></especialidade>|
| | |Responsável|Texto|1|Indica se o médico é o responsável pela internação do paciente. Médico responsável é obrigatório um e somente um. |S - Sim N - Não| |-|Obrigatório|Obrigatório|<medicoResponsavel></medicoResponsavel>|
| | |Atuação|Texto|1|Tipo de atuação do médico.|I - Interconsulta C - Coordenador da Equipe| |-|-|-|<tipoAtuacao></tipoAtuacao>|
| | | | | | | | | | | | |
| | |<CidSecundario>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Código do CID Secundário|Texto|15|Código do CID secundário.|Tabela CID-10 versão 2008| |-|-|-|<codigoCidSecundario></codigoCidSecundario>|
| | | | | | | | | | | | |
| | |<Procedimento>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Código do Procedimento|Texto|20|Código do procedimento.|Tabela de procedimentos SUS Tabela de procedimentos TUSS| |-|-|-|<codigoProcedimento></codigoProcedimento>|
| | |Data da Autorização|Data| |Data da autorização do procedimento.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataAutorizacao></dataAutorizacao>|
| | |Data da Solicitação|Data| |Data da solicitação do procedimento.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataSolicitacao></dataSolicitacao>|
| | |Data da Execução|Data| |Data inicial da execução do procedimento.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataExecucao></dataExecucao>|
| | |Data Final da Execução|Data| |Data final da execução do procedimento.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataExecucaoFinal></dataExecucaoFinal>|
| | | | | | | | | | | | |
| | |<MedicoProcedimento>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |UF|Texto|2|UF do CRM do médico.| | |-|-|-|<uf></uf>|
| | |Número do CRM|Texto|20|Número do CRM do médico para a respectiva UF.| | |-|-|-|<crm></crm>|
| | |Tipo de Atuação|Texto|2|Tipo de atuação do médico.|A - Primeiro Auxiliar A2 - Segundo Auxiliar A3 - Terceiro Auxiliar R - Responsável| |-|-|-|<tipoAtuacao></tipoAtuacao>|
| | | | | | | | | | | | |
| | |<Cti>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Data e Hora inicial de internação|Data| |Data e hora inicial de internação no CTI.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataInicial></dataInicial>|
| | |Data e Hora final de internação|Data| |Data e hora final de internação no CTI.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataFinal></dataFinal>|
| | |Código do CID Principal|Texto|15|Código do CID principal de entrada no CTI.|Tabela CID-10 versão 2008| |-|-|-|<codigoCidPrincipal></codigoCidPrincipal>|
| | |Condição da Alta|Texto|1|Código da condição da alta do CTI.|A - Casa/Auto Cuidado P - Alta a Pedido N - Transferência Interna T - Transferido para Internação H - Transferido para outro Hospital O - Óbito| |-|-|-|<condicaoAlta></condicaoAlta>|
| | |UF do Médico|Texto|2|UF do CRM do médico responsável pela entrada no CTI (quando for um médico diferente do responsável pela internação).| | |-|-|-|<uf></uf>|
| | |Número do CRM|Texto|20|Número do CRM do médico responsável pela entrada no CTI.| | |-|-|-|<crm></crm>|
| | |Código do Hospital|Numérico|15|Código de identificação do hospital de internação no CTI (quando o CTI fica em outro hospital).| | |-|-|-|<codigoHospital></codigoHospital>|
| | |Nome do Hospital|Texto|120|Nome do hospital de internação no CTI (quando o CTI fica em outro hospital).| | |-|-|-|<nomeHospital></nomeHospital>|
| | |Tipo de CTI|Texto|120|Nome do tipo de CTI.| | |-|-|-|<tipo></tipo>|
| | |Leito|Texto|50|Número do leito de internação no CTI.| | |-|-|-|<leito></leito>|
| | | | | | | | | | | | |
| | |<Rn>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Peso de Nascimento|Numérico|4|Peso de nascimento em gramas.|Inteiro|Inteiro|-|-|-|<pesoNascimento></pesoNascimento>|
| | |Idade Gestacional|Numérico|3|Idade gestacional em semanas.| |99.9  1 casa decimal e ponto (".") como separador decimal|-|-|-|<idadeGestacional></idadeGestacional>|
| | |Comprimento|Numérico|3|Comprimento em centímetros.| |99.9  1 casa decimal e ponto (".") como separador decimal|-|-|-|<comprimento></comprimento>|
| | |Sexo|Texto|1|Sexo do recém nascido.|M - Masculino F - Feminino I - Indefinido| |-|-|-|<sexo></sexo>|
| | |Nascido Vivo|Texto|1|Indica se é recém nascido vivo.|S - Sim N - Não| |-|-|-|<nascidoVivo></nascidoVivo>|
| | |Tocotraumatismo|Texto|1|Indica se o recém nascido teve tocotraumatismo.|S - Sim N - Não I - Sem Informação| |-|-|-|<tocotraumatismo></tocotraumatismo>|
| | |APGAR|Texto|1|Indica se houve medição do APGAR do recém nascido.|S - Sim N - Não I - Sem Informação| |-|-|-|<apgar></apgar>|
| | |Quinto Minuto|Numérico|2|Valor do APGAR no quinto minuto.|Inteiro (0 a 10)| |-|-|-|<apgarQuintoMinuto></apgarQuintoMinuto>|
| | |Alta em 48 horas|Texto|1|Indica se o recém nascido teve alta para domicílio em até 48 horas.|S - Sim N - Não| |-|-|-|<alta48horas></alta48horas>|
| | |Numero de Autorização da mâe|Texto|25|Número de autorização da mãe no mesmo Hospital do recem nascido.| | |-|-|-|<numeroAutorizacaoMae></numeroAutorizacaoMae>|
| | |Numero de Atendimento da Mãe|Texto|25|Número de atendimento da mãe no mesmo Hospital do recem nascido.| | |-|-|-|<numeroAtendimentoMae></numeroAtendimentoMae>|
| | |Número da Carteira da mãe|Texto|30|Número da carteira da mãe na operadora-Fonte Pagadora.| | |-|-|-|<numeroCarteiraMae></numeroCarteiraMae>|
| | | | | | | | | | | | |
| | |<CondicaoAdquirida>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Código da Condição Adquirida|Texto|15|Código do CID da condição adquirida.|Tabela CID-10 versão 2008| |-|-|-|<codigoCondicaoAdquirida></codigoCondicaoAdquirida>|
| | |Data da Ocorrência|Data| |Data da ocorrência da condição adquirida.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataOcorrencia></dataOcorrencia>|
| | |Data da Manifestação|Data| |Data da manifestação da condição adquirida.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataManifestacao></dataManifestacao>|
| | |UF do Médico|Texto|2|UF do CRM do médico responsável pela CA (quando for um médico diferente do responsável pela internação).| | |-|-|-|<uf></uf>|
| | |Número do CRM|Texto|20|Número do CRM do médico responsável pela CA.| | |-|-|-|<crm></crm>|
| | | | | | | | | | | | |
| | |<AltaAdministrativa>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Número de Atendimento|Texto|25|Número de atendimento do paciente no Hospital.| | |-|-|-|<numeroAtendimento></numeroAtendimento>|
| | |Número da Autorização|Texto|25|Número da autorização.| | |-|-|-|<numeroAutorizacao></numeroAutorizacao>|
| | |Data da Autorização|Data| |Data da autorização da internação.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataAutorizacao></dataAutorizacao>|
| | |Data Inicial do Atendimento|Data| |Data inicial do atendimento.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataAtendimentoInicial></dataAtendimentoInicial>|
| | |Data Final do Atendimento|Data| |Data final do atendimento.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataAtendimentoFinal></dataAtendimentoFinal>|
| | | | | | | | | | | | |
| | |<AnaliseCritica>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Data da Análise|Data| |Data da análise crítica.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataAnalise></dataAnalise>|
| | |Análise Crítica|Texto|1200|Descrição da análise crítica.| | |-|-|-|<analiseCritica></analiseCritica>|
| | | | | | | | | | | | |
| | |<SuporteVentilatorio>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Tipo de Suporte Ventilatório|Texto|1|Código do Tipo de Suporte Ventilatório.|I - Invasivo N - Não Invasivo S - Sem Informação| |-|-|-|<tipo></tipo>|
| | |Tipo de Suporte Ventilatório Invasivo|Texto|1|Código do Tipo de Suporte Ventilatório Invasivo.|T - Traqueostomia U - Tubo Oro/Nasotraqueal S - Sem Informação| |-|-|-|<tipoInvasivo></tipoInvasivo>|
| | |Local do Suporte Ventilatório|Texto|1|Código do Local do Suporte Ventilatório.|C - No CTI F - Fora do CTI S - Sem Informação| |-|-|-|<local></local>|
| | |Data Inicial do Suporte Ventilatório|Data| |Data inicial do Suporte Ventilatório.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataInicial></dataInicial>|
| | |Dada Final do Suporte Ventilatório|Data| |Data final do Suporte Ventilatório.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataFinal></dataFinal>|
| | | | | | | | | | | | |
| | |<CondicaoAdquiridaSuporteVentilatorio>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Código da Condição Adquirida|Texto|15|Código do CID da condição adquirida.| | |-|-|-|<codigoCondicaoAdquirida></codigoCondicaoAdquirida>|
| | |Data da Ocorrência|Data| |Data da ocorrência da condição adquirida.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataOcorrencia></dataOcorrencia>|
| | | | | | | | | | | | |
| | |<SondaVesicalDeDemora>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Local de Utilização|Texto|1|Código do local de utilização da sonda.|C - No CTI F - Fora do CTI S - Sem Informação| |-|-|-|<local></local>|
| | |Data Inicial da Sonda|Data| |Data inicial da utilização da sonda.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataInicial></dataInicial>|
| | |Dada Final da Sonda|Data| |Data final da utilização da sonda.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataFinal></dataFinal>|
| | | | | | | | | | | | |
| | |<CondicaoAdquiridaSondaVesicalDeDemora>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta| |
| | |Código da Condição Adquirida|Texto|15|Código do CID da condição adquirida.|Tabela CID-10 versão 2008| |-|-|-|<codigoCondicaoAdquirida></codigoCondicaoAdquirida>|
| | |Data da Ocorrência|Data| |Data da ocorrência da condição adquirida.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataOcorrencia></dataOcorrencia>|
| | | | | | | | | | | | |
| | |<CateterVascularCentral>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Local de Utilização|Texto|1|Código do local de utilização do cateter.|C - No CTI F - Fora do CTI S - Sem Informação| |-|-|-|<local></local>|
| | |Data Inicial do Cateter Vascular|Data| |Data inicial da utilização do cateter vascular central.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataInicial></dataInicial>|
| | |Dada Final da Cateter Vascular|Data| |Data final da utilização do cateter vascular central.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataFinal></dataFinal>|
| | | | | | | | | | | | |
| | |<CondicaoAdquiridaCateterVascularCentral>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Código da Condição Adquirida|Texto|15|Código do CID da condição adquirida.|Tabela CID-10 versão 2008| |-|-|-|<codigoCondicaoAdquirida></codigoCondicaoAdquirida>|
| | |Data da Ocorrência|Data| |Data da ocorrência da condição adquirida.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataOcorrencia></dataOcorrencia>|
| | | | | | | | | | | | |
| | |<DispositivoTerapeutico>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Local do Dispositivo Terapêutico|Texto|1|Código do Local do Dispositivo Terapêutico|C - No CTI F - Fora do CTI S - Sem Informação| |-|-|-|<local></local>|
| | |Tipo de dispositivo|Texto|4|Código do local de utilização do cateter.|BIA2 - Balão intra-aórtico  IVA1 - Infusões venosas antiarrítmicos, insulina ou vasodilatadores MCC2 - Monitorização cardíaca contínua MPI2 - Monitorização da pressão intracraniana MHA2 - Monitorização hemodinâmica avançada com cateter de Swan-Ganz OME2 - Oxigenação por membrana extracorpórea TSR2 - Terapia de substituição renal contínua UDV2 - Uso de drogas vasoativas VMI2 - Ventilação mecânica invasiva VNI1 - Ventilação não invasiva intermitente VNC2 - Ventilação não invasiva contínua| |-|-|-|<tipoTerapeutico><tipoTerapeutico>|
| | |Data Inicial do Dispositivo|Data| |Data inicial da utilização do dispositivo terapêutico|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataInicial></dataInicial>|
| | |Dada Final da Dispositivo|Data| |Data final da utilização do dispositivo terapêutico|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataFinal></dataFinal>|
| | | | | | | | | | | | |
| | |<OrigemRecaida>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta| |
| | |Número de Atendimento|Texto|25|Número de atendimento do paciente no Hospital.| | |-|-|-|<numeroAtendimento></numeroAtendimento>|
| | |Número da Autorização|Texto|25|Número da autorização.| | |-|-|-|<numeroAutorizacao></numeroAutorizacao>|
| | | | | | | | | | | | |
| | |<PartoAdequado>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Antecedentes Obstétricos|Texto|2|Código dos antedecedentes obstétricos.|NL - Nulípara MS - Multípara Sem CS Anterior MC - Multípara Com CS Anterior| |-|-|-|<antecedentesObstetricos></antecedentesObstetricos>|
| | |Número de Cesáreas Anteriores|Numérico|1|Número de Cesáreas Anteriores|Entre 1 e 8| |-|-|-|<numeroCesareasAnteriores></numeroCesareasAnteriores>|
| | |Apresentação Fetal RN1|Texto|2|Código da apresentação fetal do RN1.|CF - Cefálica PN - Pélvica CN - Córmica| |-|-|-|<apresentacaoFetalRn1></apresentacaoFetalRn1>|
| | |Apresentação Fetal RN2|Texto|2|Código da apresentação fetal do RN2, se existir.|CF - Cefálica PN - Pélvica CN - Córmica| |-|-|-|<apresentacaoFetalRn2></apresentacaoFetalRn2>|
| | |Apresentação Fetal RN3|Texto|2|Código da apresentação fetal do RN3, se existir.|CF - Cefálica PN - Pélvica CN - Córmica| |-|-|-|<apresentacaoFetalRn3></apresentacaoFetalRn3>|
| | |Apresentação Fetal RN4|Texto|2|Código da apresentação fetal do RN4, se existir.|CF - Cefálica PN - Pélvica CN - Córmica| |-|-|-|<apresentacaoFetalRn4></apresentacaoFetalRn4>|
| | |Apresentação Fetal RN5|Texto|2|Código da apresentação fetal do RN5, se existir.|CF - Cefálica PN - Pélvica CN - Córmica| |-|-|-|<apresentacaoFetalRn5></apresentacaoFetalRn5>|
| | |Início do Trabalho de Parto|Texto|2|Código do início do trabalho de parto.|EP - Espontâneo IZ - Induzido (Qualquer Método) CS - CS Antes do Início TP| |-|-|-|<inicioTrabalhoParto></inicioTrabalhoParto>|
| | |Ruptura Uterina|Texto|1|Houve ruptura uterina.|S - Sim N - Não| |-|-|-|<rupturaUterina></rupturaUterina>|
| | |Laceração Perineal de 3º e 4º graus|Texto|1|Houve laceração perineal de 3º e 4º graus.|S - Sim N - Não| |-|-|-|<laceracaoPerineal></laceracaoPerineal>|
| | |Transfusão Sanguínea|Texto|1|Houve transfusão sanguínea.|S - Sim N - Não| |-|-|-|<transfusaoSanguinea></transfusaoSanguinea>|
| | |Morte Materna|Texto|1|Houve morte materna.|S - Sim N - Não| |-|-|-|<morteMaterna></morteMaterna>|
| | |Morte Fetal intraparto >= 2,5 kg|Texto|1|Houve morte fetal intraparto >= 2,5 kg.|S - Sim N - Não| |-|-|-|<morteFetalIntraparto></morteFetalIntraparto>|
| | |Admissão Materna em UTI|Texto|1|Houve admissão materna em uti.|S - Sim N - Não| |-|-|-|<admissaoMaternaUti></admissaoMaternaUti>|
| | |Retorno Materno a Sala de Parto |Texto|1|Houve retorno materno a sala de parto.|S - Sim N - Não| |-|-|-|<retornoSalaParto></retornoSalaParto>|
| | |Índice de Satisfação com Hospital|Numérico|2|Índice de satisfação com o hospital ( 1 - Muito Insatisfeito e 10 - Muito Satisfeito )|1 a 10| |-|-|-|<indiceSatisfacaoHospital></indiceSatisfacaoHospital>|
| | |Índice de Satisfação com Equipe|Numérico|2|Índice de satisfação com a equipe médica ( 1 - Muito Insatisfeito e 10 - Muito Satisfeito )|1 a 10| |-|-|-|<indiceSatisfacaoEquipe></indiceSatisfacaoEquipe>|
| | |Houve contato pele-a-pela na 1ª hora|Texto|1|Houve contato pele-a-pela na 1ª hora.|S - Sim N - Não| |-|-|-|<houveContatoPele></houveContatoPele>|
| | |Qual posição materna durante o parto|Texto|1|Qual posição materna durante o parto.|1 - Supino 2 - Não Supino| |-|-|-|<posicaoParto></posicaoParto>|
| | |Foi administrada medicação para indução do parto|Texto|2|Se foi administrada medicação para indução do parto.|S - Sim N - Não| |-|-|-|<medicacaoInducaoParto></medicacaoInducaoParto>|
| | |Se ocitocina ou misoprostol|Texto|1|Houve uso de ocitocina ou misoprostol.|1 - 1º ou 2º Estágio 3 - 3º Estágio| |-|-|-|<usoOcitocinaMisoprostol></usoOcitocinaMisoprostol>|
| | |A parturiente estava acompanhada|Texto|1|A parturiente estava acompanhada.|S - Sim N - Não| |-|-|-|<parturienteAcompanhada></parturienteAcompanhada>|
| | |Havia a presença de doula|Texto|1|Havia a presença de doula.|S - Sim N - Não| |-|-|-|<presencaDoula></presencaDoula>|
| | |Foi realizada episiotomia|Texto|1|Foi realizada episiotomia.|S - Sim N - Não| |-|-|-|<realizadaEpisiotomia></realizadaEpisiotomia>|
| | |Houve aleitamento materno na 1ª hora|Texto|1|Houve aleitamento materno na 1ª hora.|S - Sim N - Não| |-|-|-|<houveAleitamentoMaterno></houveAleitamentoMaterno>|
| | |Quando ocorreu o clampeamento do cordão|Texto|1|Quando ocorreu o clampeamento do cordão.|1 - Imediatamente 2 - Até 30 segundos 3 - De 30 a 60 segundos 4 - Após 1 minuto| |-|-|-|<quandoOcorreuClampeamento></quandoOcorreuClampeamento>|
| | |Houve uso de métodos de analgesia|Texto|1|Houve uso de métodos de analgesia.|S - Sim N - Não| |-|-|-|<houveMetodosAnalgesia></houveMetodosAnalgesia>|
| | |Qual o método de analgesia utilizado|Texto|600|Qual o método de analgesia utilizado.| | |-|-|-|<metodoAnalgesia></metodoAnalgesia>|
| | |Perímetro cefálico do RN1|Numérico|3|Perímetro cefálico do RN1 em centímetros.| |99.9  1 casa decimal e ponto (".") como separador decimal|-|-|-|<perimetroCefalicoRn1></perimetroCefalicoRn1>|
| | |Perímetro cefálico do RN2|Numérico|3|Perímetro cefálico do RN2, se existir, em centímetros.| |99.9  1 casa decimal e ponto (".") como separador decimal|-|-|-|<perimetroCefalicoRn2></perimetroCefalicoRn2>|
| | |Perímetro cefálico do RN3|Numérico|3|Perímetro cefálico do RN3, se existir, em centímetros.| |99.9  1 casa decimal e ponto (".") como separador decimal|-|-|-|<perimetroCefalicoRn3></perimetroCefalicoRn3>|
| | |Perímetro cefálico do RN4|Numérico|3|Perímetro cefálico do RN4, se existir, em centímetros.| |99.9  1 casa decimal e ponto (".") como separador decimal|-|-|-|<perimetroCefalicoRn4></perimetroCefalicoRn4>|
| | |Perímetro cefálico do RN5|Numérico|3|Perímetro cefálico do RN5, se existir, em centímetros.| |99.9  1 casa decimal e ponto (".") como separador decimal|-|-|-|<perimetroCefalicoRn5></perimetroCefalicoRn5>|
| | |Cesariana|Texto|3|Motivo da cesariana.|I - Com Indicação Médica P - A Pedido da Paciente| |-|-|-|<cesariana></cesariana>|
| | |Número de partos anteriores a gravidez atual|Numérico|2|Número de partos anteriores a gravidez atual, se existir.| | |-|-|-|<numeroPartosAnteriores></numeroPartosAnteriores>|
| | | | | | | | | | | | |
| | | | | | | | | | | | |
| | |<CausaExternaPermanencia>| | | | | | | | | |
| | | | | | | | |Obrigatoriedade de Envio Conforme a Situação da Internação| | | |
| | |Termo|Tipo|Tamanho|Descrição|Domínio|Formato|4 - Autorização|1 - Admissional/ 2 - Prorrogação|3 - Alta|Referência no XML|
| | |Descrição|Texto|250|Descrição da causa externa.|Causas Externas.xlsx| |-|-|-|<descricao></descricao>|
| | |Tempo|Texto|8|Tempo da causa externa.| | |-|-|-|<tempo></tempo>|
| | |Data Inicial da Causa Externa|Data| |Data inicial da causa externa.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataInicial></dataInicial>|
| | |Data Final da Causa Externa|Data| |Data final da causa externa.|yyyy - ano com 4 dígitos MM - mês com 2 dígitos dd - dia com 2 dígitos HH - hora com 2 dígitos (00 a 23) mm - minuto com 2 dígitos (00 a 59) ss - segundo com 2 dígitos (00 a 59)|yyyy-MM-ddTHH:mm:ss|-|-|-|<dataFinal></dataFinal>|
| | |Origem|Texto|1|Origem da causa externa.|A - Ambos H - Hospitalar R - Rede Operadora| |-|-|-|<tempo></tempo>|
| | | | | | | | | | | | |
| | | | | | | | | | | | |
| | |Este documento e seus anexos são restritos ao(s) destinatário(s) e poderão ser divulgados para pessoas que  necessitem dessas informações para a realização de suas atividades. Se você o recebeu por engano, favor entrar em contato com o remetente imediatamente e apagá-lo de seus arquivos. Qualquer uso não autorizado, replicação ou disseminação deste documento ou parte dele é proibido. Antes de imprimir, pense no meio ambiente.| | | | | | | | | |
