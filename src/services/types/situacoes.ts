/**
 * Interfaces específicas por situação de internação
 * Interfaces compostas que combinam as interfaces base para cada situação
 */

import {
    CamposInternacaoBase,
    CamposInternacaoOpcionais,
    CamposInternacaoComData,
    CamposInternacaoAlta,
    CamposHospitalBase,
    CamposHospitalCompleto,
    CamposBeneficiarioBase,
    CamposBeneficiarioCompleto,
    CamposOperadoraBase,
    CamposMedicoBase,
    CamposDispositivoBase,
    CamposCondicaoAdquiridaBase
} from './base';

// ============================================================================
// INTERFACES PARA SITUAÇÃO 1 (ADMISSIONAL)
// ============================================================================

/**
 * Interface para campos da internação na situação 1 (Admissional)
 * Combina campos base + data de internação + campos opcionais
 */
export interface CamposInternacaoSituacao1 extends CamposInternacaoBase, CamposInternacaoComData, CamposInternacaoOpcionais { }

/**
 * Interface para campos de hospital na situação 1
 */
export interface CamposHospitalSituacao1 extends CamposHospitalBase { }

/**
 * Interface para campos de beneficiário na situação 1
 */
export interface CamposBeneficiarioSituacao1 extends CamposBeneficiarioBase { }

/**
 * Interface para campos de operadora na situação 1
 */
export interface CamposOperadoraSituacao1 extends CamposOperadoraBase { }

/**
 * Interface para campos de médico na situação 1
 */
export interface CamposMedicoSituacao1 extends CamposMedicoBase { }

/**
 * Interface para campos de CID secundário na situação 1
 */
export interface CamposCidSecundarioSituacao1 {
    /** Código CID secundário */
    codigoCidSecundario?: string;
}

/**
 * Interface para campos de procedimento na situação 1
 */
export interface CamposProcedimentoSituacao1 {
    /** Código do procedimento */
    codigoProcedimento?: string;
    /** Data da autorização */
    dataAutorizacao?: string;
    /** Data da execução */
    dataExecucao?: string;
}

/**
 * Interface para campos de CTI na situação 1
 */
export interface CamposCtiSituacao1 extends CamposDispositivoBase {
    /** Código CID principal */
    codigoCidPrincipal?: string;
}

/**
 * Interface para campos de suporte ventilatório na situação 1
 */
export interface CamposSuporteVentilatorioSituacao1 extends CamposDispositivoBase {
    /** Tipo do suporte ventilatório */
    tipo?: string;
}

/**
 * Interface para campos de condição adquirida na situação 1
 */
export interface CamposCondicaoAdquiridaSituacao1 extends CamposCondicaoAdquiridaBase { }

/**
 * Interface para campos de parto adequado na situação 1
 */
export interface CamposPartoAdequadoSituacao1 {
    /** Antecedentes obstétricos */
    antecedentesObstetricos?: string;
    /** Número de cesáreas anteriores */
    numeroCesareasAnteriores?: string;
}

// ============================================================================
// INTERFACES PARA SITUAÇÃO 2 (TRANSFERÊNCIA)
// ============================================================================

/**
 * Interface para campos da internação na situação 2 (Transferência)
 * Combina campos base + data de internação + campos opcionais
 */
export interface CamposInternacaoSituacao2 extends CamposInternacaoBase, CamposInternacaoComData, CamposInternacaoOpcionais { }

/**
 * Interface para campos de sonda vesical de demora na situação 2
 * Usa interface base de dispositivos médicos
 */
export interface CamposSondaVesicalDeDemoraSituacao2 extends CamposDispositivoBase { }

/**
 * Interface para campos de cateter vascular central na situação 2
 * Usa interface base de dispositivos médicos
 */
export interface CamposCateterVascularCentralSituacao2 extends CamposDispositivoBase { }

/**
 * Interface para campos de alta administrativa na situação 2
 * Campos específicos para processos administrativos de alta
 */
export interface CamposAltaAdministrativaSituacao2 {
    /** Número do atendimento */
    numeroAtendimento?: string;
    /** Número da autorização */
    numeroAutorizacao?: string;
    /** Data da autorização */
    dataAutorizacao?: string;
    /** Data inicial do atendimento */
    dataAtendimentoInicial?: string;
    /** Data final do atendimento */
    dataAtendimentoFinal?: string;
}

// ============================================================================
// INTERFACES PARA SITUAÇÃO 3 (ALTA)
// ============================================================================

/**
 * Interface para campos da internação na situação 3 (Alta)
 * Combina campos base + data de internação + campos de alta + campos opcionais
 */
export interface CamposInternacaoSituacao3 extends CamposInternacaoBase, CamposInternacaoComData, CamposInternacaoAlta, CamposInternacaoOpcionais { }

/**
 * Interface para campos de hospital na situação 3 (Alta)
 * Usa interface completa com endereço
 */
export interface CamposHospitalSituacao3 extends CamposHospitalCompleto { }

/**
 * Interface para campos de beneficiário na situação 3 (Alta)
 * Usa interface completa com dados de endereço
 */
export interface CamposBeneficiarioSituacao3 extends CamposBeneficiarioCompleto { }

/**
 * Interface para campos de procedimento na situação 3 (Alta)
 * Campos opcionais expandidos com datas de execução
 */
export interface CamposProcedimentoSituacao3 {
    /** Código do procedimento */
    codigoProcedimento?: string;
    /** Data da autorização */
    dataAutorizacao?: string;
    /** Data da solicitação */
    dataSolicitacao?: string;
    /** Data da execução */
    dataExecucao?: string;
    /** Data final da execução */
    dataExecucaoFinal?: string;
}

/**
 * Interface para campos de médico procedimento na situação 3
 * Campos específicos para médicos que executaram procedimentos
 */
export interface CamposMedicoProcedimentoSituacao3 {
    /** UF do médico */
    uf?: string;
    /** CRM do médico */
    crm?: string;
    /** Tipo de atuação */
    tipoAtuacao?: string;
}

/**
 * Interface para campos de CTI na situação 3 (Alta)
 * Campos opcionais expandidos com informações completas de UTI
 */
export interface CamposCtiSituacao3 {
    /** Data inicial */
    dataInicial?: string;
    /** Data final */
    dataFinal?: string;
    /** Código CID principal */
    codigoCidPrincipal?: string;
    /** Condição da alta */
    condicaoAlta?: string;
    /** UF do médico */
    uf?: string;
    /** CRM do médico */
    crm?: string;
    /** Código do hospital */
    codigoHospital?: string;
    /** Nome do hospital */
    nomeHospital?: string;
    /** Tipo de UTI */
    tipo?: string;
    /** Leito */
    leito?: string;
}

/**
 * Interface para campos de recém-nascido na situação 3
 * Campos específicos para dados neonatais
 */
export interface CamposRnSituacao3 {
    /** Peso ao nascer */
    pesoNascimento?: string;
    /** Idade gestacional */
    idadeGestacional?: string;
    /** Comprimento */
    comprimento?: string;
    /** Sexo */
    sexo?: string;
    /** Se nasceu vivo */
    nascidoVivo?: string;
    /** Tocotraumatismo */
    tocotraumatismo?: string;
    /** Apgar */
    apgar?: string;
    /** Apgar no 5º minuto */
    apgarQuintoMinuto?: string;
    /** Alta em 48 horas */
    alta48horas?: string;
    /** Número da autorização da mãe */
    numeroAutorizacaoMae?: string;
    /** Número do atendimento da mãe */
    numeroAtendimentoMae?: string;
    /** Número da carteira da mãe */
    numeroCarteiraMae?: string;
}

/**
 * Interface para campos de condição adquirida na situação 3
 * Estende interface base com campos adicionais
 */
export interface CamposCondicaoAdquiridaSituacao3 extends CamposCondicaoAdquiridaBase {
    /** Data da manifestação */
    dataManifestacao?: string;
    /** UF do médico */
    uf?: string;
    /** CRM do médico */
    crm?: string;
}

/**
 * Interface para campos de análise crítica na situação 3
 * Campos específicos para análise de qualidade
 */
export interface CamposAnaliseCriticaSituacao3 {
    /** Data da análise */
    dataAnalise?: string;
    /** Análise crítica */
    analiseCritica?: string;
}

/**
 * Interface para campos de suporte ventilatório na situação 3
 * Estende interface base de dispositivos com campos específicos
 */
export interface CamposSuporteVentilatorioSituacao3 extends CamposDispositivoBase {
    /** Tipo do suporte ventilatório */
    tipo?: string;
    /** Tipo invasivo */
    tipoInvasivo?: string;
}

/**
 * Interface para campos de condição adquirida por suporte ventilatório na situação 3
 * Usa interface base de condição adquirida
 */
export interface CamposCondicaoAdquiridaSuporteVentilatorioSituacao3 extends CamposCondicaoAdquiridaBase { }

/**
 * Interface para campos de sonda vesical de demora na situação 3
 * Usa interface base de dispositivos médicos
 */
export interface CamposSondaVesicalDeDemoraSituacao3 extends CamposDispositivoBase { }

/**
 * Interface para campos de condição adquirida por sonda vesical na situação 3
 * Usa interface base de condição adquirida
 */
export interface CamposCondicaoAdquiridaSondaVesicalDeDemoraSituacao3 extends CamposCondicaoAdquiridaBase { }

/**
 * Interface para campos de cateter vascular central na situação 3
 * Usa interface base de dispositivos médicos
 */
export interface CamposCateterVascularCentralSituacao3 extends CamposDispositivoBase { }

/**
 * Interface para campos de condição adquirida por cateter vascular na situação 3
 * Usa interface base de condição adquirida
 */
export interface CamposCondicaoAdquiridaCateterVascularCentralSituacao3 extends CamposCondicaoAdquiridaBase { }

/**
 * Interface para campos de dispositivo terapêutico na situação 3
 * Estende interface base de dispositivos com campo específico
 */
export interface CamposDispositivoTerapeuticoSituacao3 extends CamposDispositivoBase {
    /** Tipo terapêutico */
    tipoTerapeutico?: string;
}

/**
 * Interface para campos de origem de recaída na situação 3
 * Campos específicos para rastreamento de recaídas
 */
export interface CamposOrigemRecaidaSituacao3 {
    /** Número do atendimento */
    numeroAtendimento?: string;
    /** Número da autorização */
    numeroAutorizacao?: string;
}

/**
 * Interface para campos de parto adequado na situação 3
 * Campos opcionais expandidos com dados obstétricos completos
 */
export interface CamposPartoAdequadoSituacao3 {
    /** Antecedentes obstétricos */
    antecedentesObstetricos?: string;
    /** Número de cesáreas anteriores */
    numeroCesareasAnteriores?: string;
    /** Apresentação fetal RN 1 */
    apresentacaoFetalRn1?: string;
    /** Apresentação fetal RN 2 */
    apresentacaoFetalRn2?: string;
    /** Apresentação fetal RN 3 */
    apresentacaoFetalRn3?: string;
    /** Apresentação fetal RN 4 */
    apresentacaoFetalRn4?: string;
    /** Apresentação fetal RN 5 */
    apresentacaoFetalRn5?: string;
    /** Início do trabalho de parto */
    inicioTrabalhoParto?: string;
    /** Ruptura uterina */
    rupturaUterina?: string;
    /** Laceração perineal */
    laceracaoPerineal?: string;
    /** Transfusão sanguínea */
    transfusaoSanguinea?: string;
    /** Morte materna */
    morteMaterna?: string;
    /** Morte fetal intraparto */
    morteFetalIntraparto?: string;
    /** Admissão materna UTI */
    admissaoMaternaUti?: string;
    /** Retorno à sala de parto */
    retornoSalaParto?: string;
    /** Índice de satisfação hospital */
    indiceSatisfacaoHospital?: string;
    /** Índice de satisfação equipe */
    indiceSatisfacaoEquipe?: string;
    /** Houve contato pele a pele */
    houveContatoPele?: string;
    /** Posição do parto */
    posicaoParto?: string;
    /** Medicação de indução do parto */
    medicacaoInducaoParto?: string;
    /** Uso de ocitocina/misoprostol */
    usoOcitocinaMisoprostol?: string;
    /** Parturiente acompanhada */
    parturienteAcompanhada?: string;
    /** Presença de doula */
    presencaDoula?: string;
    /** Realizada episiotomia */
    realizadaEpisiotomia?: string;
    /** Houve aleitamento materno */
    houveAleitamentoMaterno?: string;
    /** Quando ocorreu clampeamento */
    quandoOcorreuClampeamento?: string;
    /** Houve métodos de analgesia */
    houveMetodosAnalgesia?: string;
    /** Método de analgesia */
    metodoAnalgesia?: string;
    /** Perímetro cefálico RN 1 */
    perimetroCefalicoRn1?: string;
    /** Perímetro cefálico RN 2 */
    perimetroCefalicoRn2?: string;
    /** Perímetro cefálico RN 3 */
    perimetroCefalicoRn3?: string;
    /** Perímetro cefálico RN 4 */
    perimetroCefalicoRn4?: string;
    /** Perímetro cefálico RN 5 */
    perimetroCefalicoRn5?: string;
    /** Cesariana */
    cesariana?: string;
    /** Número de partos anteriores */
    numeroPartosAnteriores?: string;
}

/**
 * Interface para campos de causa externa de permanência na situação 3
 * Campos específicos para causas externas que prolongam internação
 */
export interface CamposCausaExternaPermanenciaSituacao3 {
    /** Descrição da causa externa */
    descricao?: string;
    /** Tempo de permanência */
    tempo?: string;
    /** Data inicial */
    dataInicial?: string;
    /** Data final */
    dataFinal?: string;
    /** Origem da causa externa */
    origem?: string;
}

// ============================================================================
// INTERFACES PARA SITUAÇÃO 4 (AUTORIZAÇÃO)
// ============================================================================

/**
 * Interface para campos da internação na situação 4 (Autorização)
 * Combina apenas campos base + alguns campos opcionais específicos
 */
export interface CamposInternacaoSituacao4 extends CamposInternacaoBase {
    /** Número do atendimento */
    numeroAtendimento?: string;
    /** Número da autorização */
    numeroAutorizacao?: string;
    /** Se é recaída */
    recaida?: string;
}
