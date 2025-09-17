# DRG Brasil - Análise de Campos Obrigatórios e Opcionais

Este documento apresenta uma análise detalhada dos campos obrigatórios e opcionais do sistema DRG Brasil, organizados por situação da internação. Esta análise serve como base para o desenvolvimento de APIs que implementem o protocolo DRG.

## Situações da Internação

O sistema DRG define 4 situações principais para internação:

- **4 - Autorização**: Solicitação de autorização para internação
- **1 - Admissional**: Internação admissional
- **2 - Prorrogação**: Prorrogação de internação
- **3 - Alta**: Alta da internação

## Estrutura dos Dados

### 1. Internação

#### Campos Obrigatórios

**Para todas as situações (1, 2, 3, 4):**

- `situacao` (Texto, 1): Código da situação da internação
- `caraterInternacao` (Texto, 1): Código do caráter da internação
- `codigoCidPrincipal` (Texto, 15): Código do CID principal

**Para situações 1, 2, 3 (Admissional/Prorrogação/Alta):**

- `dataInternacao` (Data): Data e hora de internação
- `numeroAtendimento` (Texto, 25): Número de atendimento (obrigatório se número da autorização não informado)
- `numeroAutorizacao` (Texto, 25): Número da autorização (obrigatório se número de atendimento não informado)

**Para situação 3 (Alta):**

- `dataAlta` (Data): Data e hora da alta
- `condicaoAlta` (Texto, 1): Código da condição da alta

**Condicionais:**

- `recaida` (Texto, 1): Obrigatório se "Última Internação à 30 dias" = 'S'
- `nenhumDispositivoTerapeutico` (Texto, 1): Obrigatório se lista de dispositivos terapêuticos está vazia
- `tipoNota` (Texto, 1): Obrigatório se campo "Nota" for enviado
- `dataNota` (Data): Obrigatório se campo "Nota" for enviado

#### Campos Opcionais

- `procedencia` (Texto, 1): Código da procedência do paciente
- `leito` (Texto, 50): Número do leito de internação
- `numeroOperadora` (Texto, 25): Número da operadora-Fonte Pagadora na ANS
- `numeroRegistro` (Texto, 25): Número de identificação do paciente no Hospital
- `dataAutorizacao` (Data): Data da autorização da internação
- `internadoOutrasVezes` (Texto, 1): Se paciente foi internado outras vezes
- `hospitalInternacaoAnterior` (Texto, 1): Origem da internação anterior
- `reinternacao` (Texto, 1): Se última internação ocorreu à 30 dias ou menos
- `acao` (Texto, 15): Ação (padrão: INCLUIR)
- `nota` (Texto, 50000): Notas do prontuário (ignorado na autorização)

### 2. Hospital

#### Campos Obrigatórios

**Para situações 1, 2, 3 (Admissional/Prorrogação/Alta):**

- `codigo` (Numérico, 15): Código de identificação do hospital
- `nome` (Texto, 120): Nome do hospital
- `cnes` (Numérico, 15): CNES do hospital
- `porte` (Numérico, 1): Código do porte do hospital
- `complexidade` (Numérico, 1): Código da complexidade do hospital
- `esferaAdministrativa` (Numérico, 1): Código da esfera administrativa
- `tipoLogradouro` (Texto, 20): Tipo de logradouro
- `logradouro` (Texto, 72): Descrição do logradouro
- `numeroLogradouro` (Texto, 8): Número do logradouro
- `bairro` (Texto, 72): Nome do bairro
- `uf` (Texto, 2): Unidade Federativa
- `cidade` (Numérico, 12): Código do município
- `cep` (Texto, 8): Código do CEP

#### Campos Opcionais

- `complementoLogradouro` (Texto, 100): Complemento do logradouro

### 3. Beneficiário

#### Campos Obrigatórios

**Para todas as situações (1, 2, 3, 4):**

- `dataNascimento` (Data): Data de nascimento do beneficiário
- `sexo` (Texto, 1): Sexo do beneficiário

#### Campos Opcionais

- `cpf` (Texto, 11): CPF do beneficiário (sem máscara)
- `recemNascido` (Texto, 1): Se é recém nascido
- `particular` (Texto, 1): Se é particular (sem operadora)
- `uf` (Texto, 2): UF de endereço do paciente
- `cidade` (Numérico, 12): Código do município de endereço
- `tipoLogradouro` (Texto, 20): Tipo de logradouro
- `logradouro` (Texto, 72): Descrição do logradouro
- `numeroLogradouro` (Texto, 8): Número do logradouro
- `complementoLogradouro` (Texto, 5): Complemento do logradouro
- `bairro` (Texto, 72): Nome do bairro
- `cep` (Texto, 8): Código do CEP
- `vulnerabilidadeSocial` (Texto, 1): Beneficiário com vulnerabilidade social
- `cns` (Numérico, 15): Cartão Nacional de Saúde
- `codigoIdentificacao` (Numérico, 15): Código de identificação do beneficiário

### 4. Operadora

#### Campos Obrigatórios

**Para todas as situações (1, 2, 3, 4):**

- `codigo` (Numérico, 15): Código de identificação da operadora-Fonte Pagadora
- `numeroCarteira` (Texto, 30): Número da carteira do beneficiário

#### Campos Opcionais

- `plano` (Texto, 40): Nome do plano do beneficiário
- `dataValidade` (Data): Data de validade da carteira

### 5. Médico

#### Campos Obrigatórios

**Para situações 1, 2, 3 (Admissional/Prorrogação/Alta):**

- `nome` (Texto, 300): Nome do médico
- `uf` (Texto, 2): UF do CRM do médico
- `crm` (Texto, 20): Número do CRM do médico
- `especialidade` (Texto, 120): Descrição da especialidade
- `medicoResponsavel` (Texto, 1): Se é responsável pela internação (obrigatório um e somente um)

#### Campos Opcionais

- `ddd` (Numérico, 2): DDD do telefone
- `telefone` (Numérico, 9): Telefone do médico
- `email` (Texto, 600): Email do médico
- `tipoAtuacao` (Texto, 1): Tipo de atuação do médico

### 6. CID Secundário

#### Campos Opcionais

- `codigoCidSecundario` (Texto, 15): Código do CID secundário

### 7. Procedimento

#### Campos Opcionais

- `codigoProcedimento` (Texto, 20): Código do procedimento
- `dataAutorizacao` (Data): Data da autorização do procedimento
- `dataSolicitacao` (Data): Data da solicitação do procedimento
- `dataExecucao` (Data): Data inicial da execução
- `dataExecucaoFinal` (Data): Data final da execução

### 8. Médico Procedimento

#### Campos Opcionais

- `uf` (Texto, 2): UF do CRM do médico
- `crm` (Texto, 20): Número do CRM do médico
- `tipoAtuacao` (Texto, 2): Tipo de atuação do médico

### 9. CTI

#### Campos Opcionais

- `dataInicial` (Data): Data e hora inicial de internação no CTI
- `dataFinal` (Data): Data e hora final de internação no CTI
- `codigoCidPrincipal` (Texto, 15): Código do CID principal de entrada no CTI
- `condicaoAlta` (Texto, 1): Código da condição da alta do CTI
- `uf` (Texto, 2): UF do CRM do médico responsável
- `crm` (Texto, 20): Número do CRM do médico responsável
- `codigoHospital` (Numérico, 15): Código do hospital de internação no CTI
- `nomeHospital` (Texto, 120): Nome do hospital de internação no CTI
- `tipo` (Texto, 120): Nome do tipo de CTI
- `leito` (Texto, 50): Número do leito de internação no CTI

### 10. Recém Nascido (RN)

#### Campos Opcionais

- `pesoNascimento` (Numérico, 4): Peso de nascimento em gramas
- `idadeGestacional` (Numérico, 3): Idade gestacional em semanas
- `comprimento` (Numérico, 3): Comprimento em centímetros
- `sexo` (Texto, 1): Sexo do recém nascido
- `nascidoVivo` (Texto, 1): Se é recém nascido vivo
- `tocotraumatismo` (Texto, 1): Se teve tocotraumatismo
- `apgar` (Texto, 1): Se houve medição do APGAR
- `apgarQuintoMinuto` (Numérico, 2): Valor do APGAR no quinto minuto
- `alta48horas` (Texto, 1): Se teve alta em 48 horas
- `numeroAutorizacaoMae` (Texto, 25): Número de autorização da mãe
- `numeroAtendimentoMae` (Texto, 25): Número de atendimento da mãe
- `numeroCarteiraMae` (Texto, 30): Número da carteira da mãe

### 11. Condição Adquirida

#### Campos Opcionais

- `codigoCondicaoAdquirida` (Texto, 15): Código do CID da condição adquirida
- `dataOcorrencia` (Data): Data da ocorrência da condição adquirida
- `dataManifestacao` (Data): Data da manifestação da condição adquirida
- `uf` (Texto, 2): UF do CRM do médico responsável
- `crm` (Texto, 20): Número do CRM do médico responsável

### 12. Alta Administrativa

#### Campos Opcionais

- `numeroAtendimento` (Texto, 25): Número de atendimento
- `numeroAutorizacao` (Texto, 25): Número da autorização
- `dataAutorizacao` (Data): Data da autorização
- `dataAtendimentoInicial` (Data): Data inicial do atendimento
- `dataAtendimentoFinal` (Data): Data final do atendimento

### 13. Análise Crítica

#### Campos Opcionais

- `dataAnalise` (Data): Data da análise crítica
- `analiseCritica` (Texto, 1200): Descrição da análise crítica

### 14. Suporte Ventilatório

#### Campos Opcionais

- `tipo` (Texto, 1): Código do tipo de suporte ventilatório
- `tipoInvasivo` (Texto, 1): Código do tipo de suporte ventilatório invasivo
- `local` (Texto, 1): Código do local do suporte ventilatório
- `dataInicial` (Data): Data inicial do suporte ventilatório
- `dataFinal` (Data): Data final do suporte ventilatório

### 15. Condição Adquirida Suporte Ventilatório

#### Campos Opcionais

- `codigoCondicaoAdquirida` (Texto, 15): Código do CID da condição adquirida
- `dataOcorrencia` (Data): Data da ocorrência da condição adquirida

### 16. Sonda Vesical de Demora

#### Campos Opcionais

- `local` (Texto, 1): Código do local de utilização da sonda
- `dataInicial` (Data): Data inicial da utilização da sonda
- `dataFinal` (Data): Data final da utilização da sonda

### 17. Condição Adquirida Sonda Vesical de Demora

#### Campos Opcionais

- `codigoCondicaoAdquirida` (Texto, 15): Código do CID da condição adquirida
- `dataOcorrencia` (Data): Data da ocorrência da condição adquirida

### 18. Cateter Vascular Central

#### Campos Opcionais

- `local` (Texto, 1): Código do local de utilização do cateter
- `dataInicial` (Data): Data inicial da utilização do cateter
- `dataFinal` (Data): Data final da utilização do cateter

### 19. Condição Adquirida Cateter Vascular Central

#### Campos Opcionais

- `codigoCondicaoAdquirida` (Texto, 15): Código do CID da condição adquirida
- `dataOcorrencia` (Data): Data da ocorrência da condição adquirida

### 20. Dispositivo Terapêutico

#### Campos Opcionais

- `local` (Texto, 1): Código do local do dispositivo terapêutico
- `tipoTerapeutico` (Texto, 4): Código do tipo de dispositivo
- `dataInicial` (Data): Data inicial da utilização do dispositivo
- `dataFinal` (Data): Data final da utilização do dispositivo

### 21. Origem Recaída

#### Campos Opcionais

- `numeroAtendimento` (Texto, 25): Número de atendimento
- `numeroAutorizacao` (Texto, 25): Número da autorização

### 22. Parto Adequado

#### Campos Opcionais

- `antecedentesObstetricos` (Texto, 2): Código dos antecedentes obstétricos
- `numeroCesareasAnteriores` (Numérico, 1): Número de cesáreas anteriores
- `apresentacaoFetalRn1` (Texto, 2): Apresentação fetal do RN1
- `apresentacaoFetalRn2` (Texto, 2): Apresentação fetal do RN2
- `apresentacaoFetalRn3` (Texto, 2): Apresentação fetal do RN3
- `apresentacaoFetalRn4` (Texto, 2): Apresentação fetal do RN4
- `apresentacaoFetalRn5` (Texto, 2): Apresentação fetal do RN5
- `inicioTrabalhoParto` (Texto, 2): Código do início do trabalho de parto
- `rupturaUterina` (Texto, 1): Se houve ruptura uterina
- `laceracaoPerineal` (Texto, 1): Se houve laceração perineal de 3º e 4º graus
- `transfusaoSanguinea` (Texto, 1): Se houve transfusão sanguínea
- `morteMaterna` (Texto, 1): Se houve morte materna
- `morteFetalIntraparto` (Texto, 1): Se houve morte fetal intraparto >= 2,5 kg
- `admissaoMaternaUti` (Texto, 1): Se houve admissão materna em UTI
- `retornoSalaParto` (Texto, 1): Se houve retorno materno a sala de parto
- `indiceSatisfacaoHospital` (Numérico, 2): Índice de satisfação com hospital (1-10)
- `indiceSatisfacaoEquipe` (Numérico, 2): Índice de satisfação com equipe (1-10)
- `houveContatoPele` (Texto, 1): Se houve contato pele-a-pela na 1ª hora
- `posicaoParto` (Texto, 1): Posição materna durante o parto
- `medicacaoInducaoParto` (Texto, 2): Se foi administrada medicação para indução
- `usoOcitocinaMisoprostol` (Texto, 1): Se houve uso de ocitocina ou misoprostol
- `parturienteAcompanhada` (Texto, 1): Se a parturiente estava acompanhada
- `presencaDoula` (Texto, 1): Se havia presença de doula
- `realizadaEpisiotomia` (Texto, 1): Se foi realizada episiotomia
- `houveAleitamentoMaterno` (Texto, 1): Se houve aleitamento materno na 1ª hora
- `quandoOcorreuClampeamento` (Texto, 1): Quando ocorreu o clampeamento do cordão
- `houveMetodosAnalgesia` (Texto, 1): Se houve uso de métodos de analgesia
- `metodoAnalgesia` (Texto, 600): Qual método de analgesia utilizado
- `perimetroCefalicoRn1` (Numérico, 3): Perímetro cefálico do RN1
- `perimetroCefalicoRn2` (Numérico, 3): Perímetro cefálico do RN2
- `perimetroCefalicoRn3` (Numérico, 3): Perímetro cefálico do RN3
- `perimetroCefalicoRn4` (Numérico, 3): Perímetro cefálico do RN4
- `perimetroCefalicoRn5` (Numérico, 3): Perímetro cefálico do RN5
- `cesariana` (Texto, 3): Motivo da cesariana
- `numeroPartosAnteriores` (Numérico, 2): Número de partos anteriores

### 23. Causa Externa Permanência

#### Campos Opcionais

- `descricao` (Texto, 250): Descrição da causa externa
- `tempo` (Texto, 8): Tempo da causa externa
- `dataInicial` (Data): Data inicial da causa externa
- `dataFinal` (Data): Data final da causa externa
- `origem` (Texto, 1): Origem da causa externa

## Resumo por Situação

### Autorização (4)

**Campos Obrigatórios:**

- Internação: `situacao`, `caraterInternacao`, `codigoCidPrincipal`
- Beneficiário: `dataNascimento`, `sexo`
- Operadora: `codigo`, `numeroCarteira`

**Campos Condicionais:**

- `numeroAtendimento` ou `numeroAutorizacao` (pelo menos um obrigatório)
- `recaida` (se última internação à 30 dias = 'S')
- `nenhumDispositivoTerapeutico` (se lista de dispositivos vazia)

### Admissional/Prorrogação (1/2)

**Campos Obrigatórios:**

- Todos os campos obrigatórios da Autorização
- Internação: `dataInternacao`
- Hospital: todos os campos obrigatórios
- Médico: `nome`, `uf`, `crm`, `especialidade`, `medicoResponsavel`

**Campos Condicionais:**

- `numeroAtendimento` ou `numeroAutorizacao` (pelo menos um obrigatório)
- `recaida` (se última internação à 30 dias = 'S')
- `nenhumDispositivoTerapeutico` (se lista de dispositivos vazia)
- `tipoNota` e `dataNota` (se campo `nota` for enviado)

### Alta (3)

**Campos Obrigatórios:**

- Todos os campos obrigatórios da Admissional/Prorrogação
- Internação: `dataAlta`, `condicaoAlta`

**Campos Condicionais:**

- `numeroAtendimento` ou `numeroAutorizacao` (pelo menos um obrigatório)
- `recaida` (se última internação à 30 dias = 'S')
- `nenhumDispositivoTerapeutico` (se lista de dispositivos vazia)
- `tipoNota` e `dataNota` (se campo `nota` for enviado)

## Observações Importantes

1. **Formato de Data**: Todas as datas devem seguir o formato `yyyy-MM-ddTHH:mm:ss`
2. **Médico Responsável**: Deve haver exatamente um médico marcado como responsável (`medicoResponsavel = 'S'`)
3. **Campos Condicionais**: Alguns campos são obrigatórios apenas em situações específicas
4. **Validações**: Implementar validações de domínio conforme especificado na documentação
5. **Tamanhos**: Respeitar os tamanhos máximos especificados para cada campo

## Implementação da API

Para implementar uma API DRG, considere:

1. **Validação de Campos**: Implementar validações baseadas na situação da internação
2. **Estrutura de Dados**: Organizar os dados em objetos aninhados conforme a estrutura XML
3. **Tratamento de Erros**: Retornar mensagens claras para campos obrigatórios ausentes
4. **Logs**: Implementar logs detalhados para auditoria
5. **Versionamento**: Considerar versionamento da API para futuras atualizações

Este documento serve como base para o desenvolvimento de APIs que implementem o protocolo DRG Brasil, garantindo conformidade com as especificações oficiais.
