/**
 * Funções de validação para o sistema DRG
 * Validação de entrada, configuração e campos obrigatórios
 */

import { SecaoDRG, SituacaoInternacao } from '../types/enums';
import { ResultadoValidacao, ConfigResolvida, IDRGValidator } from '../types/base';
import { resolveSecaoHabilitada, DRG_CONFIG } from '../config/drg-config';
import {
    logDataValidation,
    logRequiredFields,
    logEnvironmentVariable,
    logValidatorCreation,
    drgLogger
} from './logger';

// ============================================================================
// VALIDAÇÃO DE ENTRADA
// ============================================================================

/**
 * Valida se o código do hospital é válido
 */
export function validateHospitalCode(hospitalCode?: number): boolean {
    if (hospitalCode === undefined || hospitalCode === null) {
        drgLogger.debug('Código do hospital não fornecido (opcional)', {
            validator: 'HospitalCodeValidator'
        });
        return true; // Código opcional
    }

    if (!Number.isInteger(hospitalCode)) {
        drgLogger.warn('Código do hospital não é um número inteiro', {
            hospitalCode,
            validator: 'HospitalCodeValidator'
        });
        return false;
    }

    if (hospitalCode < 1 || hospitalCode > 9999) {
        drgLogger.warn('Código do hospital fora do range válido (1-9999)', {
            hospitalCode,
            validator: 'HospitalCodeValidator'
        });
        return false;
    }

    drgLogger.debug('Código do hospital válido', {
        hospitalCode,
        validator: 'HospitalCodeValidator'
    });
    return true;
}

/**
 * Valida se a seção DRG é válida
 */
export function validateSecaoDRG(secao: string): secao is SecaoDRG {
    return Object.values(SecaoDRG).includes(secao as SecaoDRG);
}

/**
 * Valida se a situação de internação é válida
 */
export function validateSituacaoInternacao(situacao: number): situacao is SituacaoInternacao {
    return Object.values(SituacaoInternacao).includes(situacao as SituacaoInternacao);
}

/**
 * Valida se uma string é um valor booleano válido
 */
export function validateBooleanValue(value: string | undefined): boolean {
    if (value === undefined) {
        return true; // Valor opcional
    }

    return value === 'true' || value === 'false';
}

// ============================================================================
// VALIDAÇÃO DE CONFIGURAÇÃO
// ============================================================================

/**
 * Valida se a configuração DRG está correta
 */
export function validateDRGConfig(): ResultadoValidacao {
    const errors: string[] = [];

    try {
        // Validar se todas as situações estão presentes
        const situacoesEsperadas = [1, 2, 3, 4];
        const situacoesPresentes = Object.keys(DRG_CONFIG.situacoes).map(Number);

        for (const situacao of situacoesEsperadas) {
            if (!situacoesPresentes.includes(situacao)) {
                errors.push(`Situação ${situacao} não encontrada na configuração`);
            }
        }

        // Validar se todas as seções estão presentes em cada situação
        const secoesEsperadas = Object.values(SecaoDRG);

        for (const [situacaoKey, situacao] of Object.entries(DRG_CONFIG.situacoes)) {
            const situacaoNum = parseInt(situacaoKey);

            for (const secao of secoesEsperadas) {
                if (!(secao in situacao.secoes)) {
                    errors.push(`Seção ${secao} não encontrada na situação ${situacaoNum}`);
                }
            }
        }

        // Validar campos obrigatórios não estão vazios
        for (const [situacaoKey, situacao] of Object.entries(DRG_CONFIG.situacoes)) {
            if (situacao.camposObrigatorios.length === 0) {
                errors.push(`Situação ${situacaoKey} não possui campos obrigatórios`);
            }
        }

        // Validar variáveis de ambiente
        const envVars = Object.values(DRG_CONFIG.situacoes)
            .flatMap(situacao => Object.values(situacao.secoes))
            .map(secao => secao.envVar)
            .filter((envVar): envVar is string => envVar !== undefined);

        for (const envVar of envVars) {
            const value = process.env[envVar];
            if (value !== undefined && !validateBooleanValue(value)) {
                errors.push(`Variável de ambiente ${envVar} tem valor inválido: ${value}`);
            }
        }

    } catch (error) {
        errors.push(`Erro ao validar configuração DRG: ${error}`);
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Valida se uma variável de ambiente está configurada corretamente
 */
export function validateEnvironmentVariable(envVar: string): ResultadoValidacao {
    const errors: string[] = [];

    const value = process.env[envVar];

    if (value === undefined) {
        errors.push(`Variável de ambiente ${envVar} não está definida`);
    } else if (!validateBooleanValue(value)) {
        errors.push(`Variável de ambiente ${envVar} tem valor inválido: ${value}. Deve ser 'true' ou 'false'`);
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

// ============================================================================
// VALIDAÇÃO DE CAMPOS OBRIGATÓRIOS
// ============================================================================

/**
 * Valida se todos os campos obrigatórios estão presentes nos dados
 */
export function validateRequiredFields(
    data: Record<string, any>,
    situacao: SituacaoInternacao,
    hospitalCode?: number
): ResultadoValidacao {
    const errors: string[] = [];

    drgLogger.debug('Iniciando validação de campos obrigatórios', {
        situacao,
        hospitalCode,
        validator: 'RequiredFieldsValidator',
        dataKeys: Object.keys(data).length
    });

    try {
        const configSituacao = DRG_CONFIG.situacoes[situacao];
        const camposPresentes: string[] = [];

        // Validar campos obrigatórios da situação
        for (const campo of configSituacao.camposObrigatorios) {
            if (!(campo in data) || data[campo] === undefined || data[campo] === null || data[campo] === '') {
                errors.push(`Campo obrigatório '${campo}' não está presente ou está vazio`);
                drgLogger.debug(`Campo obrigatório '${campo}' não encontrado`, {
                    situacao,
                    hospitalCode,
                    validator: 'RequiredFieldsValidator',
                    campo
                });
            } else {
                camposPresentes.push(campo);
            }
        }

        // Validar campos obrigatórios das seções habilitadas
        for (const [secaoKey, secao] of Object.entries(configSituacao.secoes)) {
            if (secao.habilitada) {
                drgLogger.debug(`Validando seção habilitada: ${secaoKey}`, {
                    situacao,
                    hospitalCode,
                    validator: 'RequiredFieldsValidator',
                    secao: secaoKey as SecaoDRG,
                    camposObrigatorios: secao.camposObrigatorios.length
                });

                for (const campo of secao.camposObrigatorios) {
                    const campoCompleto = `${secaoKey}.${campo}`;
                    if (!(campoCompleto in data) || data[campoCompleto] === undefined || data[campoCompleto] === null || data[campoCompleto] === '') {
                        errors.push(`Campo obrigatório '${campoCompleto}' da seção '${secaoKey}' não está presente ou está vazio`);
                        drgLogger.debug(`Campo obrigatório '${campoCompleto}' não encontrado`, {
                            situacao,
                            hospitalCode,
                            validator: 'RequiredFieldsValidator',
                            secao: secaoKey as SecaoDRG,
                            campo
                        });
                    } else {
                        camposPresentes.push(campoCompleto);
                    }
                }
            }
        }

        // Log do resultado da validação
        logRequiredFields(situacao, configSituacao.camposObrigatorios, camposPresentes);
        logDataValidation(situacao, hospitalCode, errors.length === 0, errors);

    } catch (error) {
        const errorMsg = `Erro ao validar campos obrigatórios: ${error}`;
        errors.push(errorMsg);
        drgLogger.error(errorMsg, {
            situacao,
            hospitalCode,
            validator: 'RequiredFieldsValidator'
        });
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Valida se um campo específico deve ser incluído
 */
export function shouldIncludeField(
    secao: SecaoDRG,
    campo: string,
    situacao: SituacaoInternacao,
    hospitalCode?: number
): boolean {
    try {
        const configSituacao = DRG_CONFIG.situacoes[situacao];
        const configSecao = configSituacao.secoes[secao];

        if (!configSecao.habilitada) {
            return false;
        }

        // Verificar se o campo está na lista de campos obrigatórios ou opcionais
        return configSecao.camposObrigatorios.includes(campo) ||
            configSecao.camposOpcionais.includes(campo);

    } catch (error) {
        console.error(`Erro ao verificar se deve incluir campo: ${error}`);
        return false;
    }
}

// ============================================================================
// CLASSE VALIDADOR DRG
// ============================================================================

/**
 * Implementação do validador DRG
 */
export class DRGValidator implements IDRGValidator {
    private situacao: SituacaoInternacao;
    private hospitalCode?: number;
    private configResolvida?: ConfigResolvida;

    constructor(situacao: SituacaoInternacao, hospitalCode?: number) {
        // Validar entrada
        if (!validateSituacaoInternacao(situacao)) {
            const errorMsg = `Situação de internação inválida: ${situacao}`;
            drgLogger.error(errorMsg, {
                situacao,
                hospitalCode,
                validator: 'DRGValidator'
            });
            throw new Error(errorMsg);
        }

        if (!validateHospitalCode(hospitalCode)) {
            const errorMsg = `Código do hospital inválido: ${hospitalCode}`;
            drgLogger.error(errorMsg, {
                situacao,
                hospitalCode,
                validator: 'DRGValidator'
            });
            throw new Error(errorMsg);
        }

        this.situacao = situacao;
        this.hospitalCode = hospitalCode;

        // Log da criação do validador
        logValidatorCreation(situacao, hospitalCode);
    }

    /**
     * Valida campos obrigatórios
     */
    validateRequiredFields(data: any): ResultadoValidacao {
        return validateRequiredFields(data, this.situacao, this.hospitalCode);
    }

    /**
     * Verifica se deve incluir uma seção
     */
    shouldIncludeSection(sectionName: string): boolean {
        if (!validateSecaoDRG(sectionName)) {
            return false;
        }

        return resolveSecaoHabilitada(sectionName as SecaoDRG, this.hospitalCode);
    }

    /**
     * Verifica se deve incluir um campo
     */
    shouldIncludeField(sectionName: string, fieldName: string): boolean {
        if (!validateSecaoDRG(sectionName)) {
            return false;
        }

        return shouldIncludeField(sectionName as SecaoDRG, fieldName, this.situacao, this.hospitalCode);
    }

    /**
     * Retorna seções habilitadas
     */
    getEnabledSections(): string[] {
        const configSituacao = DRG_CONFIG.situacoes[this.situacao];
        const enabledSections: string[] = [];

        for (const [secaoKey, secao] of Object.entries(configSituacao.secoes)) {
            if (secao.habilitada) {
                enabledSections.push(secaoKey);
            }
        }

        return enabledSections;
    }

    /**
     * Retorna configuração resolvida
     */
    getConfig(): ConfigResolvida {
        if (this.configResolvida) {
            return this.configResolvida;
        }

        const configSituacao = DRG_CONFIG.situacoes[this.situacao];

        this.configResolvida = {
            camposObrigatorios: [...configSituacao.camposObrigatorios],
            camposOpcionais: [...configSituacao.camposOpcionais],
            secoes: {}
        };

        // Resolver seções
        for (const [secaoKey, secao] of Object.entries(configSituacao.secoes)) {
            this.configResolvida.secoes[secaoKey] = {
                habilitada: secao.habilitada,
                camposObrigatorios: [...secao.camposObrigatorios],
                camposOpcionais: [...secao.camposOpcionais]
            };
        }

        return this.configResolvida;
    }
}

// ============================================================================
// FUNÇÕES UTILITÁRIAS
// ============================================================================

/**
 * Valida se os dados estão no formato correto para uma situação específica
 */
export function validateDataFormat(
    data: Record<string, any>,
    situacao: SituacaoInternacao
): ResultadoValidacao {
    const errors: string[] = [];

    try {
        // Validar estrutura básica
        if (typeof data !== 'object' || data === null) {
            errors.push('Dados devem ser um objeto');
            return { valid: false, errors };
        }

        // Validar campos obrigatórios da situação
        const configSituacao = DRG_CONFIG.situacoes[situacao];

        for (const campo of configSituacao.camposObrigatorios) {
            if (!(campo in data)) {
                errors.push(`Campo obrigatório '${campo}' não encontrado`);
            }
        }

        // Validar tipos básicos
        if (data.situacao !== undefined && typeof data.situacao !== 'string') {
            errors.push('Campo "situacao" deve ser uma string');
        }

        if (data.caraterInternacao !== undefined && typeof data.caraterInternacao !== 'string') {
            errors.push('Campo "caraterInternacao" deve ser uma string');
        }

        if (data.codigoCidPrincipal !== undefined && typeof data.codigoCidPrincipal !== 'string') {
            errors.push('Campo "codigoCidPrincipal" deve ser uma string');
        }

    } catch (error) {
        errors.push(`Erro ao validar formato dos dados: ${error}`);
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Retorna lista de campos obrigatórios para uma situação
 */
export function getRequiredFields(situacao: SituacaoInternacao): string[] {
    const configSituacao = DRG_CONFIG.situacoes[situacao];
    return [...configSituacao.camposObrigatorios];
}

/**
 * Retorna lista de campos opcionais para uma situação
 */
export function getOptionalFields(situacao: SituacaoInternacao): string[] {
    const configSituacao = DRG_CONFIG.situacoes[situacao];
    return [...configSituacao.camposOpcionais];
}

/**
 * Retorna lista de seções habilitadas para uma situação
 */
export function getEnabledSections(situacao: SituacaoInternacao, hospitalCode?: number): string[] {
    const configSituacao = DRG_CONFIG.situacoes[situacao];
    const enabledSections: string[] = [];

    for (const [secaoKey, secao] of Object.entries(configSituacao.secoes)) {
        if (secao.habilitada) {
            enabledSections.push(secaoKey);
        }
    }

    return enabledSections;
}
