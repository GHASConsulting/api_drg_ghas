/**
 * Sistema de logs estruturado para o sistema DRG
 * Logs configuráveis com diferentes níveis e contexto específico
 */

import { SituacaoInternacao, SecaoDRG } from '../types/enums';
import { DRG_CONFIG } from '../config/drg-config';

// ============================================================================
// TIPOS DE LOG
// ============================================================================

export enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error'
}

export interface LogContext {
    situacao?: SituacaoInternacao;
    hospitalCode?: number;
    secao?: SecaoDRG;
    campo?: string;
    validator?: string;
    timestamp?: string;
    [key: string]: any;
}

export interface LogEntry {
    level: LogLevel;
    message: string;
    context?: LogContext;
    timestamp: string;
}

// ============================================================================
// CONFIGURAÇÃO DE LOGS
// ============================================================================

export interface LoggerConfig {
    enabled: boolean;
    level: LogLevel;
    includeTimestamp: boolean;
    includeContext: boolean;
    logToConsole: boolean;
    logToFile?: boolean;
    logFile?: string;
}

/**
 * Configuração padrão do logger
 */
export const DEFAULT_LOGGER_CONFIG: LoggerConfig = {
    enabled: process.env.LOG_CAMPOS_ENVIADOS === 'true' || process.env.NODE_ENV === 'development',
    level: process.env.LOG_LEVEL as LogLevel || LogLevel.INFO,
    includeTimestamp: true,
    includeContext: true,
    logToConsole: true,
    logToFile: false
};

// ============================================================================
// CLASSE LOGGER PRINCIPAL
// ============================================================================

export class DRGLogger {
    private config: LoggerConfig;
    private logHistory: LogEntry[] = [];

    constructor(config: Partial<LoggerConfig> = {}) {
        this.config = { ...DEFAULT_LOGGER_CONFIG, ...config };
    }

    /**
     * Log de debug - informações detalhadas
     */
    debug(message: string, context?: LogContext): void {
        this.log(LogLevel.DEBUG, message, context);
    }

    /**
     * Log de informação - eventos normais
     */
    info(message: string, context?: LogContext): void {
        this.log(LogLevel.INFO, message, context);
    }

    /**
     * Log de aviso - situações que merecem atenção
     */
    warn(message: string, context?: LogContext): void {
        this.log(LogLevel.WARN, message, context);
    }

    /**
     * Log de erro - problemas que precisam ser corrigidos
     */
    error(message: string, context?: LogContext): void {
        this.log(LogLevel.ERROR, message, context);
    }

    /**
     * Método principal de log
     */
    log(level: LogLevel, message: string, context?: LogContext): void {
        if (!this.config.enabled) {
            return;
        }

        if (!this.shouldLog(level)) {
            return;
        }

        const timestamp = new Date().toISOString();
        const logEntry: LogEntry = {
            level,
            message,
            context,
            timestamp
        };

        // Adicionar ao histórico
        this.logHistory.push(logEntry);

        // Manter apenas os últimos 1000 logs
        if (this.logHistory.length > 1000) {
            this.logHistory = this.logHistory.slice(-1000);
        }

        // Output do log
        this.outputLog(logEntry);
    }

    /**
     * Verifica se deve fazer log baseado no nível
     */
    private shouldLog(level: LogLevel): boolean {
        const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
        const currentLevelIndex = levels.indexOf(this.config.level);
        const messageLevelIndex = levels.indexOf(level);

        return messageLevelIndex >= currentLevelIndex;
    }

    /**
     * Output do log formatado
     */
    private outputLog(entry: LogEntry): void {
        const parts: string[] = [];

        // Timestamp
        if (this.config.includeTimestamp) {
            parts.push(`[${entry.timestamp}]`);
        }

        // Level
        parts.push(`[${entry.level.toUpperCase()}]`);

        // Message
        parts.push(entry.message);

        // Context
        if (this.config.includeContext && entry.context) {
            const contextStr = this.formatContext(entry.context);
            if (contextStr) {
                parts.push(`| ${contextStr}`);
            }
        }

        const logLine = parts.join(' ');

        // Console output
        if (this.config.logToConsole) {
            switch (entry.level) {
                case LogLevel.DEBUG:
                    console.debug(logLine);
                    break;
                case LogLevel.INFO:
                    console.info(logLine);
                    break;
                case LogLevel.WARN:
                    console.warn(logLine);
                    break;
                case LogLevel.ERROR:
                    console.error(logLine);
                    break;
            }
        }

        // File output (futuro)
        if (this.config.logToFile) {
            // Implementar escrita em arquivo se necessário
        }
    }

    /**
     * Formata o contexto para exibição
     */
    private formatContext(context: LogContext): string {
        const parts: string[] = [];

        if (context.situacao !== undefined) {
            parts.push(`Situação: ${context.situacao}`);
        }

        if (context.hospitalCode !== undefined) {
            parts.push(`Hospital: ${context.hospitalCode}`);
        }

        if (context.secao) {
            parts.push(`Seção: ${context.secao}`);
        }

        if (context.campo) {
            parts.push(`Campo: ${context.campo}`);
        }

        if (context.validator) {
            parts.push(`Validador: ${context.validator}`);
        }

        // Outros campos do contexto
        Object.keys(context).forEach(key => {
            if (!['situacao', 'hospitalCode', 'secao', 'campo', 'validator', 'timestamp'].includes(key)) {
                parts.push(`${key}: ${context[key]}`);
            }
        });

        return parts.join(', ');
    }

    /**
     * Retorna o histórico de logs
     */
    getLogHistory(): LogEntry[] {
        return [...this.logHistory];
    }

    /**
     * Limpa o histórico de logs
     */
    clearHistory(): void {
        this.logHistory = [];
    }

    /**
     * Atualiza a configuração do logger
     */
    updateConfig(newConfig: Partial<LoggerConfig>): void {
        this.config = { ...this.config, ...newConfig };
    }
}

// ============================================================================
// LOGGER GLOBAL
// ============================================================================

/**
 * Instância global do logger DRG
 */
export const drgLogger = new DRGLogger();

// ============================================================================
// FUNÇÕES DE LOG ESPECÍFICAS PARA DRG
// ============================================================================

/**
 * Log de configuração DRG carregada
 */
export function logDRGConfigLoaded(): void {
    drgLogger.info('Configuração DRG carregada com sucesso', {
        validator: 'DRGConfig',
        situacoes: Object.keys(DRG_CONFIG.situacoes).length,
        secoes: Object.keys(DRG_CONFIG.situacoes[1].secoes).length
    });
}

/**
 * Log de validação de dados
 */
export function logDataValidation(
    situacao: SituacaoInternacao,
    hospitalCode: number | undefined,
    isValid: boolean,
    errors: string[]
): void {
    const level = isValid ? LogLevel.INFO : LogLevel.WARN;
    const message = isValid
        ? 'Validação de dados bem-sucedida'
        : `Validação de dados falhou com ${errors.length} erro(s)`;

    drgLogger.log(level, message, {
        situacao,
        hospitalCode,
        validator: 'DRGValidator',
        errors: errors.length,
        errorDetails: errors.slice(0, 3) // Primeiros 3 erros
    });
}

/**
 * Log de seção habilitada/desabilitada
 */
export function logSecaoStatus(
    secao: SecaoDRG,
    situacao: SituacaoInternacao,
    hospitalCode: number | undefined,
    habilitada: boolean
): void {
    const message = habilitada
        ? `Seção ${secao} habilitada para situação ${situacao}`
        : `Seção ${secao} desabilitada para situação ${situacao}`;

    drgLogger.debug(message, {
        secao,
        situacao,
        hospitalCode,
        validator: 'SecaoResolver'
    });
}

/**
 * Log de campos obrigatórios
 */
export function logRequiredFields(
    situacao: SituacaoInternacao,
    campos: string[],
    camposPresentes: string[]
): void {
    const camposFaltando = campos.filter(campo => !camposPresentes.includes(campo));

    if (camposFaltando.length === 0) {
        drgLogger.info(`Todos os ${campos.length} campos obrigatórios estão presentes`, {
            situacao,
            validator: 'RequiredFieldsValidator',
            camposTotal: campos.length,
            camposPresentes: camposPresentes.length
        });
    } else {
        drgLogger.warn(`${camposFaltando.length} campos obrigatórios estão faltando`, {
            situacao,
            validator: 'RequiredFieldsValidator',
            camposTotal: campos.length,
            camposPresentes: camposPresentes.length,
            camposFaltando: camposFaltando.slice(0, 5) // Primeiros 5 campos faltando
        });
    }
}

/**
 * Log de variável de ambiente
 */
export function logEnvironmentVariable(
    envVar: string,
    value: string | undefined,
    secao?: SecaoDRG
): void {
    const message = value !== undefined
        ? `Variável de ambiente ${envVar} = ${value}`
        : `Variável de ambiente ${envVar} não definida`;

    const level = value !== undefined ? LogLevel.DEBUG : LogLevel.WARN;

    drgLogger.log(level, message, {
        validator: 'EnvironmentValidator',
        envVar,
        value,
        secao
    });
}

/**
 * Log de resolução de seção
 */
export function logSecaoResolution(
    secao: SecaoDRG,
    hospitalCode: number | undefined,
    envVar: string,
    hospitalValue: string | undefined,
    globalValue: string | undefined,
    finalResult: boolean
): void {
    drgLogger.debug(`Resolução de seção ${secao}`, {
        secao,
        hospitalCode,
        validator: 'SecaoResolver',
        envVar,
        hospitalValue,
        globalValue,
        finalResult,
        resolutionPath: hospitalValue !== undefined ? 'hospital-specific' : 'global'
    });
}

/**
 * Log de criação de validador
 */
export function logValidatorCreation(
    situacao: SituacaoInternacao,
    hospitalCode: number | undefined
): void {
    drgLogger.info('Validador DRG criado', {
        situacao,
        hospitalCode,
        validator: 'DRGValidator'
    });
}

/**
 * Log de uso de função de conveniência
 */
export function logConvenienceFunction(
    functionName: string,
    situacao: SituacaoInternacao,
    hospitalCode: number | undefined,
    result: any
): void {
    drgLogger.debug(`Função de conveniência ${functionName} executada`, {
        situacao,
        hospitalCode,
        validator: 'ConvenienceFunction',
        functionName,
        resultType: typeof result
    });
}
