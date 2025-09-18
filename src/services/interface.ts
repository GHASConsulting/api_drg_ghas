/**
 * Arquivo principal do sistema DRG 
 * Este arquivo serve como ponto de entrada único para todo o sistema DRG,
 * mantendo compatibilidade com imports existentes e organizando as exportações.
 */

// ============================================================================
// IMPORTS INTERNOS
// ============================================================================

import { SituacaoInternacao, SecaoDRG } from './types/enums';
import { ResultadoValidacao } from './types/base';
import { DRGValidator } from './utils/validation';
import { resolveSecaoHabilitada, DRG_CONFIG } from './config/drg-config';
import { logConvenienceFunction } from './utils/logger';

// ============================================================================
// RE-EXPORT DE ENUMS
// ============================================================================

export {
    SituacaoInternacao,
    CaraterInternacao,
    CondicaoAlta,
    Sexo,
    SecaoDRG,
    Procedencia,
    TipoLeito
} from './types/enums';

// ============================================================================
// RE-EXPORT DE INTERFACES BASE
// ============================================================================

export {
    // Interfaces de internação
    CamposInternacaoBase,
    CamposInternacaoOpcionais,
    CamposInternacaoComData,
    CamposInternacaoAlta,

    // Interfaces de hospital
    CamposHospitalBase,
    CamposHospitalCompleto,

    // Interfaces de beneficiário
    CamposBeneficiarioBase,
    CamposBeneficiarioCompleto,

    // Interfaces de operadora e médico
    CamposOperadoraBase,
    CamposMedicoBase,

    // Interfaces de dispositivos e condições
    CamposDispositivoBase,
    CamposCondicaoAdquiridaBase,

    // Interfaces de configuração
    ConfigSecao,
    ConfigSecaoDinamica,
    ConfigSituacao,
    ConfigSituacaoDinamica,
    ConfigGlobal,
    DRGFieldConfig,
    DRGFieldConfigDinamica,

    // Interfaces de validação
    ResultadoValidacao,
    ConfigResolvida,
    IDRGValidator
} from './types/base';

// ============================================================================
// RE-EXPORT DE INTERFACES POR SITUAÇÃO
// ============================================================================

export {
    // Situação 1 (Admissional)
    CamposInternacaoSituacao1,
    CamposHospitalSituacao1,
    CamposBeneficiarioSituacao1,
    CamposOperadoraSituacao1,
    CamposMedicoSituacao1,
    CamposCidSecundarioSituacao1,
    CamposProcedimentoSituacao1,
    CamposCtiSituacao1,
    CamposSuporteVentilatorioSituacao1,
    CamposCondicaoAdquiridaSituacao1,
    CamposPartoAdequadoSituacao1,

    // Situação 2 (Transferência)
    CamposInternacaoSituacao2,
    CamposSondaVesicalDeDemoraSituacao2,
    CamposCateterVascularCentralSituacao2,
    CamposAltaAdministrativaSituacao2,

    // Situação 3 (Alta)
    CamposInternacaoSituacao3,
    CamposHospitalSituacao3,
    CamposBeneficiarioSituacao3,
    CamposProcedimentoSituacao3,
    CamposMedicoProcedimentoSituacao3,
    CamposCtiSituacao3,
    CamposRnSituacao3,
    CamposCondicaoAdquiridaSituacao3,
    CamposAnaliseCriticaSituacao3,
    CamposSuporteVentilatorioSituacao3,
    CamposCondicaoAdquiridaSuporteVentilatorioSituacao3,
    CamposSondaVesicalDeDemoraSituacao3,
    CamposCondicaoAdquiridaSondaVesicalDeDemoraSituacao3,
    CamposCateterVascularCentralSituacao3,
    CamposCondicaoAdquiridaCateterVascularCentralSituacao3,
    CamposDispositivoTerapeuticoSituacao3,
    CamposOrigemRecaidaSituacao3,
    CamposPartoAdequadoSituacao3,
    CamposCausaExternaPermanenciaSituacao3,

    // Situação 4 (Autorização)
    CamposInternacaoSituacao4
} from './types/situacoes';

// ============================================================================
// RE-EXPORT DE CONFIGURAÇÃO DRG
// ============================================================================

export {
    ENV_VAR_MAPPING,
    resolveSecaoHabilitada,
    DRG_CONFIG
} from './config/drg-config';

// ============================================================================
// RE-EXPORT DE FUNÇÕES DE VALIDAÇÃO
// ============================================================================

export {
    // Validação de entrada
    validateHospitalCode,
    validateSecaoDRG,
    validateSituacaoInternacao,
    validateBooleanValue,

    // Validação de configuração
    validateDRGConfig,
    validateEnvironmentVariable,

    // Validação de campos obrigatórios
    validateRequiredFields,
    shouldIncludeField,

    // Classe validador
    DRGValidator,

    // Funções utilitárias
    validateDataFormat,
    getRequiredFields,
    getOptionalFields,
    getEnabledSections
} from './utils/validation';

// ============================================================================
// EXPORTS CONVENIÊNCIA
// ============================================================================

/**
 * Cria uma instância do validador DRG
 */
export function createDRGValidator(situacao: SituacaoInternacao, hospitalCode?: number) {
    const validator = new DRGValidator(situacao, hospitalCode);
    logConvenienceFunction('createDRGValidator', situacao, hospitalCode, validator);
    return validator;
}

/**
 * Verifica se uma seção está habilitada para uma situação específica
 */
export function isSecaoHabilitada(secao: SecaoDRG, situacao: SituacaoInternacao, hospitalCode?: number): boolean {
    const result = resolveSecaoHabilitada(secao, hospitalCode);
    logConvenienceFunction('isSecaoHabilitada', situacao, hospitalCode, result);
    return result;
}

/**
 * Retorna a configuração para uma situação específica
 */
export function getConfigSituacao(situacao: SituacaoInternacao) {
    const config = DRG_CONFIG.situacoes[situacao];
    logConvenienceFunction('getConfigSituacao', situacao, undefined, config);
    return config;
}

/**
 * Retorna todas as seções habilitadas para uma situação
 */
export function getSecoesHabilitadas(situacao: SituacaoInternacao, hospitalCode?: number): SecaoDRG[] {
    const configSituacao = DRG_CONFIG.situacoes[situacao];
    const secoesHabilitadas: SecaoDRG[] = [];

    for (const [secaoKey, secao] of Object.entries(configSituacao.secoes)) {
        if (secao.habilitada) {
            secoesHabilitadas.push(secaoKey as SecaoDRG);
        }
    }

    logConvenienceFunction('getSecoesHabilitadas', situacao, hospitalCode, secoesHabilitadas);
    return secoesHabilitadas;
}

/**
 * Valida se os dados estão corretos para uma situação específica
 */
export function validateDRGData(data: Record<string, any>, situacao: SituacaoInternacao, hospitalCode?: number): ResultadoValidacao {
    const validator = new DRGValidator(situacao, hospitalCode);
    const result = validator.validateRequiredFields(data);
    logConvenienceFunction('validateDRGData', situacao, hospitalCode, result);
    return result;
}