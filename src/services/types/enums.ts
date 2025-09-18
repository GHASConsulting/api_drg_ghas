/**
 * Enums para valores fixos do sistema DRG
 * Apenas enums essenciais que são usados na lógica do sistema
 */

/**
 * Situações de internação possíveis
 */
export enum SituacaoInternacao {
    /** Situação 1 - Admissional */
    ADMISSIONAL = 1,
    /** Situação 2 - Transferência */
    TRANSFERENCIA = 2,
    /** Situação 3 - Alta */
    ALTA = 3,
    /** Situação 4 - Autorização */
    AUTORIZACAO = 4
}

/**
 * Caráter da internação
 */
export enum CaraterInternacao {
    /** Eletiva */
    ELETIVA = 'E',
    /** Urgência */
    URGENCIA = 'U',
    /** Acidente */
    ACIDENTE = 'A'
}

/**
 * Condições de alta possíveis
 */
export enum CondicaoAlta {
    /** Alta por melhora */
    ALTA_MELHORA = '1',
    /** Alta por cura */
    ALTA_CURA = '2',
    /** Alta por óbito */
    ALTA_OBITO = '3',
    /** Alta por transferência */
    ALTA_TRANSFERENCIA = '4',
    /** Alta por abandono */
    ALTA_ABANDONO = '5',
    /** Alta por evasão */
    ALTA_EVASAO = '6',
    /** Alta por alta administrativa */
    ALTA_ADMINISTRATIVA = '7',
    /** Alta por alta a pedido */
    ALTA_PEDIDO = '8',
    /** Alta por alta por outros motivos */
    ALTA_OUTROS = '9'
}

/**
 * Sexo do beneficiário
 */
export enum Sexo {
    /** Masculino */
    MASCULINO = 'M',
    /** Feminino */
    FEMININO = 'F',
    /** Indefinido */
    INDEFINIDO = 'I'
}

/**
 * Seções disponíveis no sistema DRG
 */
export enum SecaoDRG {
    /** Seção Hospital */
    HOSPITAL = 'hospital',
    /** Seção Beneficiário */
    BENEFICIARIO = 'beneficiario',
    /** Seção Operadora */
    OPERADORA = 'operadora',
    /** Seção Médico */
    MEDICO = 'medico',
    /** Seção CID Secundário */
    CID_SECUNDARIO = 'cidSecundario',
    /** Seção Procedimento */
    PROCEDIMENTO = 'procedimento',
    /** Seção Médico Procedimento */
    MEDICO_PROCEDIMENTO = 'medicoProcedimento',
    /** Seção CTI */
    CTI = 'cti',
    /** Seção Recém-nascido */
    RN = 'rn',
    /** Seção Condição Adquirida */
    CONDICAO_ADQUIRIDA = 'condicaoAdquirida',
    /** Seção Alta Administrativa */
    ALTA_ADMINISTRATIVA = 'altaAdministrativa',
    /** Seção Análise Crítica */
    ANALISE_CRITICA = 'analiseCritica',
    /** Seção Suporte Ventilatório */
    SUPORTE_VENTILATORIO = 'suporteVentilatorio',
    /** Seção Condição Adquirida Suporte Ventilatório */
    CONDICAO_ADQUIRIDA_SUPORTE_VENTILATORIO = 'condicaoAdquiridaSuporteVentilatorio',
    /** Seção Sonda Vesical de Demora */
    SONDA_VESICAL_DE_DEMORA = 'sondaVesicalDeDemora',
    /** Seção Condição Adquirida Sonda Vesical de Demora */
    CONDICAO_ADQUIRIDA_SONDA_VESICAL_DE_DEMORA = 'condicaoAdquiridaSondaVesicalDeDemora',
    /** Seção Cateter Vascular Central */
    CATETER_VASCULAR_CENTRAL = 'cateterVascularCentral',
    /** Seção Condição Adquirida Cateter Vascular Central */
    CONDICAO_ADQUIRIDA_CATETER_VASCULAR_CENTRAL = 'condicaoAdquiridaCateterVascularCentral',
    /** Seção Dispositivo Terapêutico */
    DISPOSITIVO_TERAPEUTICO = 'dispositivoTerapeutico',
    /** Seção Origem Recaída */
    ORIGEM_RECAIDA = 'origemRecaida',
    /** Seção Parto Adequado */
    PARTO_ADEQUADO = 'partoAdequado',
    /** Seção Causa Externa Permanência */
    CAUSA_EXTERNA_PERMANENCIA = 'causaExternaPermanencia'
}

/**
 * Tipos de procedência
 */
export enum Procedencia {
    /** Próprio */
    PROPRIO = '1',
    /** Transferência */
    TRANSFERENCIA = '2',
    /** Outros */
    OUTROS = '3'
}

/**
 * Tipos de leito
 */
export enum TipoLeito {
    /** Leito comum */
    COMUM = '1',
    /** Leito de UTI */
    UTI = '2',
    /** Leito de CTI */
    CTI = '3',
    /** Leito de isolamento */
    ISOLAMENTO = '4'
}