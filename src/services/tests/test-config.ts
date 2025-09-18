/**
 * Configuração de testes para o sistema DRG
 * Configuração base para todos os testes unitários
 */

import { DRGLogger, LogLevel } from '../utils/logger';

// ============================================================================
// CONFIGURAÇÃO DE TESTES
// ============================================================================

/**
 * Configuração padrão para testes
 */
export const TEST_CONFIG = {
    // Configuração do logger para testes
    logger: {
        enabled: true,
        level: LogLevel.DEBUG,
        includeTimestamp: false,
        includeContext: true,
        logToConsole: false, // Não poluir console durante testes
        logToFile: false
    },

    // Configuração de ambiente para testes
    environment: {
        LOG_CAMPOS_ENVIADOS: 'true',
        LOG_LEVEL: 'debug',
        INCLUIR_CID_SECUNDARIO: 'true',
        INCLUIR_PROCEDIMENTO: 'false',
        INCLUIR_CTI: 'true',
        VALIDAR_CAMPOS_OBRIGATORIOS: 'true'
    },

    // Dados de teste padrão
    testData: {
        hospitalCode: 123,
        situacaoAdmissional: 1,
        situacaoTransferencia: 2,
        situacaoAlta: 3,
        situacaoAutorizacao: 4
    }
};

/**
 * Configuração específica para testes de hospital
 */
export const HOSPITAL_TEST_CONFIG = {
    hospital123: {
        code: 123,
        envVars: {
            'HOSPITAL_123_INCLUIR_CID_SECUNDARIO': 'false',
            'HOSPITAL_123_INCLUIR_PROCEDIMENTO': 'true',
            'HOSPITAL_123_INCLUIR_CTI': 'false'
        }
    },
    hospital456: {
        code: 456,
        envVars: {
            'HOSPITAL_456_INCLUIR_CID_SECUNDARIO': 'true',
            'HOSPITAL_456_INCLUIR_PROCEDIMENTO': 'false',
            'HOSPITAL_456_INCLUIR_CTI': 'true'
        }
    }
};

/**
 * Dados de teste para validação
 */
export const TEST_DATA_SETS = {
    // Dados completos para situação 1 (Admissional)
    situacao1Completa: {
        numeroInternacao: '12345',
        dataInternacao: '2024-01-15',
        'hospital.codigoHospital': '123',
        'hospital.nomeHospital': 'Hospital Teste',
        'beneficiario.cpf': '12345678901',
        'beneficiario.nome': 'João Silva',
        'operadora.codigoOperadora': '001',
        'operadora.nomeOperadora': 'Operadora Teste',
        'medico.crm': '12345',
        'medico.nome': 'Dr. João',
        'cidSecundario.codigoCid': 'A00',
        'cidSecundario.descricaoCid': 'Cólera',
        'procedimento.codigoProcedimento': '12345',
        'procedimento.descricaoProcedimento': 'Procedimento Teste'
    },

    // Dados mínimos para situação 1 (apenas campos obrigatórios)
    situacao1Minima: {
        numeroInternacao: '12345',
        dataInternacao: '2024-01-15',
        'hospital.codigoHospital': '123',
        'beneficiario.cpf': '12345678901',
        'operadora.codigoOperadora': '001',
        'medico.crm': '12345'
    },

    // Dados com campos faltando (para teste de validação)
    situacao1Incompleta: {
        numeroInternacao: '12345',
        dataInternacao: '2024-01-15'
        // Faltando campos obrigatórios
    },

    // Dados para situação 2 (Transferência)
    situacao2Completa: {
        numeroInternacao: '12345',
        dataInternacao: '2024-01-15',
        'hospital.codigoHospital': '123',
        'beneficiario.cpf': '12345678901',
        'operadora.codigoOperadora': '001',
        'medico.crm': '12345',
        'sondaVesicalDeDemora.dataInsercao': '2024-01-15',
        'sondaVesicalDeDemora.dataRemocao': '2024-01-20',
        'cateterVascularCentral.dataInsercao': '2024-01-15',
        'cateterVascularCentral.dataRemocao': '2024-01-20',
        'altaAdministrativa.dataAlta': '2024-01-20',
        'altaAdministrativa.motivoAlta': 'Transferência'
    },

    // Dados para situação 3 (Alta)
    situacao3Completa: {
        numeroInternacao: '12345',
        dataInternacao: '2024-01-15',
        dataAlta: '2024-01-20',
        'hospital.codigoHospital': '123',
        'beneficiario.cpf': '12345678901',
        'operadora.codigoOperadora': '001',
        'medico.crm': '12345',
        'procedimento.codigoProcedimento': '12345',
        'procedimento.descricaoProcedimento': 'Procedimento Teste',
        'cti.dataEntrada': '2024-01-15',
        'cti.dataSaida': '2024-01-20',
        'rn.pesoNascimento': '3000',
        'rn.alturaNascimento': '50',
        'condicaoAdquirida.codigoCondicao': 'A00',
        'condicaoAdquirida.descricaoCondicao': 'Condição Teste',
        'analiseCritica.dataAnalise': '2024-01-20',
        'analiseCritica.resultadoAnalise': 'Aprovado'
    },

    // Dados para situação 4 (Autorização)
    situacao4Completa: {
        numeroInternacao: '12345',
        dataInternacao: '2024-01-15',
        'hospital.codigoHospital': '123',
        'beneficiario.cpf': '12345678901',
        'operadora.codigoOperadora': '001',
        'medico.crm': '12345'
    }
};

/**
 * Configuração de mocks para testes
 */
export const MOCK_CONFIG = {
    // Mock de variáveis de ambiente
    processEnv: {
        ...TEST_CONFIG.environment,
        ...HOSPITAL_TEST_CONFIG.hospital123.envVars
    },

    // Mock de console para capturar logs
    console: {
        debug: () => { },
        info: () => { },
        warn: () => { },
        error: () => { }
    }
};

// ============================================================================
// UTILITÁRIOS DE TESTE
// ============================================================================

/**
 * Configura ambiente de teste
 */
export function setupTestEnvironment(): void {
    // Configurar variáveis de ambiente
    Object.entries(TEST_CONFIG.environment).forEach(([key, value]) => {
        process.env[key] = value;
    });

    // Configurar logger para testes
    const logger = new DRGLogger(TEST_CONFIG.logger);
    logger.clearHistory();
}

/**
 * Limpa ambiente de teste
 */
export function cleanupTestEnvironment(): void {
    // Limpar variáveis de ambiente
    Object.keys(TEST_CONFIG.environment).forEach(key => {
        delete process.env[key];
    });

    // Limpar histórico de logs
    const logger = new DRGLogger();
    logger.clearHistory();
}

/**
 * Verifica se um log específico foi gerado
 */
export function expectLogToBeGenerated(
    logger: DRGLogger,
    level: LogLevel,
    message: string,
    context?: any
): boolean {
    const logs = logger.getLogHistory();
    const log = logs.find(l =>
        l.level === level &&
        l.message === message &&
        (!context || JSON.stringify(l.context) === JSON.stringify(context))
    );

    return log !== undefined;
}

/**
 * Verifica se um log específico NÃO foi gerado
 */
export function expectLogNotToBeGenerated(
    logger: DRGLogger,
    level: LogLevel,
    message: string
): boolean {
    const logs = logger.getLogHistory();
    const log = logs.find(l =>
        l.level === level &&
        l.message === message
    );

    return log === undefined;
}

/**
 * Conta quantos logs de um nível específico foram gerados
 */
export function countLogsByLevel(logger: DRGLogger, level: LogLevel): number {
    const logs = logger.getLogHistory();
    return logs.filter(l => l.level === level).length;
}

/**
 * Verifica se todos os logs têm contexto válido
 */
export function expectAllLogsHaveContext(logger: DRGLogger): boolean {
    const logs = logger.getLogHistory();
    return logs.every(log => {
        return log.context !== undefined && log.timestamp !== undefined;
    });
}

/**
 * Gera dados de teste dinâmicos
 */
export function generateTestData(
    situacao: number,
    hospitalCode: number,
    includeOptional: boolean = false
): Record<string, any> {
    const baseData = {
        numeroInternacao: `TEST${Date.now()}`,
        dataInternacao: '2024-01-15',
        'hospital.codigoHospital': hospitalCode.toString(),
        'beneficiario.cpf': '12345678901',
        'operadora.codigoOperadora': '001',
        'medico.crm': '12345'
    };

    if (includeOptional) {
        return {
            ...baseData,
            'hospital.nomeHospital': 'Hospital Teste',
            'beneficiario.nome': 'João Silva',
            'operadora.nomeOperadora': 'Operadora Teste',
            'medico.nome': 'Dr. João'
        };
    }

    return baseData;
}

/**
 * Valida estrutura de dados de teste
 */
export function validateTestDataStructure(data: Record<string, any>): boolean {
    const requiredFields = [
        'numeroInternacao',
        'dataInternacao',
        'hospital.codigoHospital',
        'beneficiario.cpf',
        'operadora.codigoOperadora',
        'medico.crm'
    ];

    return requiredFields.every(field => field in data);
}

// ============================================================================
// CONSTANTES DE TESTE
// ============================================================================

export const TEST_CONSTANTS = {
    // Timeouts para testes
    TIMEOUTS: {
        SHORT: 1000,
        MEDIUM: 5000,
        LONG: 10000
    },

    // Números de repetição para testes de performance
    PERFORMANCE: {
        SMALL: 10,
        MEDIUM: 100,
        LARGE: 1000
    },

    // Códigos de erro esperados
    ERROR_CODES: {
        INVALID_SITUATION: 'INVALID_SITUATION',
        INVALID_HOSPITAL: 'INVALID_HOSPITAL',
        MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
        VALIDATION_ERROR: 'VALIDATION_ERROR'
    }
};
