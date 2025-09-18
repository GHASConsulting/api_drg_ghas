/**
 * Interfaces base reutilizáveis para o sistema DRG
 * Interfaces fundamentais que são compostas para criar interfaces específicas
 */

import {
    SituacaoInternacao,
    CaraterInternacao,
    CondicaoAlta,
    Sexo,
    Procedencia,
    TipoLeito
} from './enums';

// ============================================================================
// INTERFACES BASE PARA INTERNAÇÃO
// ============================================================================

/**
 * Campos básicos comuns a todas as internações
 * Interface base que contém os campos fundamentais
 */
export interface CamposInternacaoBase {
    /** Situação da internação (1, 2, 3, 4) */
    situacao: SituacaoInternacao;
    /** Caráter da internação (E, U, A) */
    caraterInternacao: CaraterInternacao;
    /** Código CID principal */
    codigoCidPrincipal: string;
}

/**
 * Campos opcionais comuns a todas as internações
 * Campos que podem estar presentes em qualquer situação
 */
export interface CamposInternacaoOpcionais {
    /** Procedência do paciente */
    procedencia?: Procedencia;
    /** Tipo de leito */
    leito?: TipoLeito;
    /** Número da operadora */
    numeroOperadora?: string;
    /** Número do registro */
    numeroRegistro?: string;
    /** Data da autorização */
    dataAutorizacao?: string;
    /** Se foi internado outras vezes */
    internadoOutrasVezes?: string;
    /** Se é reinternação */
    reinternacao?: string;
    /** Se é recaída */
    recaida?: string;
}

/**
 * Campos específicos para internações com data de internação
 * Usado nas situações 1, 2 e 3
 */
export interface CamposInternacaoComData {
    /** Data da internação */
    dataInternacao: string;
    /** Número do atendimento */
    numeroAtendimento: string;
    /** Número da autorização */
    numeroAutorizacao: string;
}

/**
 * Campos específicos para alta de internação
 * Usado apenas na situação 3
 */
export interface CamposInternacaoAlta {
    /** Data da alta */
    dataAlta: string;
    /** Condição da alta */
    condicaoAlta: CondicaoAlta;
}

// ============================================================================
// INTERFACES BASE PARA HOSPITAL
// ============================================================================

/**
 * Campos básicos de hospital (usado em situações 1 e 2)
 */
export interface CamposHospitalBase {
    /** Código do hospital */
    codigo: string;
    /** Nome do hospital */
    nome: string;
    /** CNES do hospital */
    cnes: string;
    /** Porte do hospital */
    porte: string;
    /** Complexidade do hospital */
    complexidade: string;
    /** Complemento do logradouro */
    complementoLogradouro?: string;
}

/**
 * Campos expandidos de hospital (usado na situação 3)
 */
export interface CamposHospitalCompleto extends CamposHospitalBase {
    /** Esfera administrativa */
    esferaAdministrativa: string;
    /** Tipo do logradouro */
    tipoLogradouro: string;
    /** Logradouro */
    logradouro: string;
    /** Número do logradouro */
    numeroLogradouro: string;
    /** Bairro */
    bairro: string;
    /** UF */
    uf: string;
    /** Cidade */
    cidade: string;
    /** CEP */
    cep: string;
}

// ============================================================================
// INTERFACES BASE PARA BENEFICIÁRIO
// ============================================================================

/**
 * Campos básicos de beneficiário (usado em todas as situações)
 */
export interface CamposBeneficiarioBase {
    /** Data de nascimento */
    dataNascimento: string;
    /** Sexo do beneficiário */
    sexo: Sexo;
    /** CPF do beneficiário */
    cpf?: string;
    /** Se é recém-nascido */
    recemNascido?: string;
    /** Se é particular */
    particular?: string;
}

/**
 * Campos expandidos de beneficiário (usado na situação 3)
 */
export interface CamposBeneficiarioCompleto extends CamposBeneficiarioBase {
    /** UF do beneficiário */
    uf?: string;
    /** Cidade do beneficiário */
    cidade?: string;
    /** Tipo do logradouro */
    tipoLogradouro?: string;
    /** Logradouro */
    logradouro?: string;
    /** Número do logradouro */
    numeroLogradouro?: string;
    /** Complemento do logradouro */
    complementoLogradouro?: string;
    /** Bairro */
    bairro?: string;
    /** CEP */
    cep?: string;
    /** Vulnerabilidade social */
    vulnerabilidadeSocial?: string;
    /** CNS */
    cns?: string;
    /** Código de identificação */
    codigoIdentificacao?: string;
}

// ============================================================================
// INTERFACES BASE PARA OPERADORA
// ============================================================================

/**
 * Campos básicos de operadora (usado em todas as situações)
 */
export interface CamposOperadoraBase {
    /** Código da operadora */
    codigo: string;
    /** Número da carteira */
    numeroCarteira: string;
    /** Plano de saúde */
    plano?: string;
    /** Data de validade */
    dataValidade?: string;
}

// ============================================================================
// INTERFACES BASE PARA MÉDICO
// ============================================================================

/**
 * Campos básicos de médico (usado em todas as situações)
 */
export interface CamposMedicoBase {
    /** Nome do médico */
    nome: string;
    /** UF do médico */
    uf: string;
    /** CRM do médico */
    crm: string;
    /** Especialidade do médico */
    especialidade: string;
    /** Se é médico responsável */
    medicoResponsavel: string;
    /** DDD do telefone */
    ddd?: string;
    /** Telefone */
    telefone?: string;
    /** Email */
    email?: string;
    /** Tipo de atuação */
    tipoAtuacao?: string;
}

// ============================================================================
// INTERFACES BASE PARA DISPOSITIVOS MÉDICOS
// ============================================================================

/**
 * Campos básicos de dispositivos médicos
 */
export interface CamposDispositivoBase {
    /** Local do dispositivo */
    local?: string;
    /** Data inicial */
    dataInicial?: string;
    /** Data final */
    dataFinal?: string;
}

// ============================================================================
// INTERFACES BASE PARA CONDIÇÃO ADQUIRIDA
// ============================================================================

/**
 * Campos básicos de condição adquirida
 */
export interface CamposCondicaoAdquiridaBase {
    /** Código da condição adquirida */
    codigoCondicaoAdquirida?: string;
    /** Data da ocorrência */
    dataOcorrencia?: string;
}

// ============================================================================
// INTERFACES BASE PARA CONFIGURAÇÃO
// ============================================================================

/**
 * Interface para configuração de uma seção
 */
export interface ConfigSecao {
    /** Se a seção está habilitada */
    habilitada: boolean;
    /** Campos obrigatórios da seção */
    camposObrigatorios: string[];
    /** Campos opcionais da seção */
    camposOpcionais: string[];
}

/**
 * Interface para configuração dinâmica de seção (com variáveis de ambiente)
 */
export interface ConfigSecaoDinamica extends ConfigSecao {
    /** Nome da variável de ambiente (ex: "INCLUIR_CTI") */
    envVar?: string;
}

/**
 * Interface para configuração de uma situação
 */
export interface ConfigSituacao {
    /** Campos obrigatórios da situação */
    camposObrigatorios: string[];
    /** Campos opcionais da situação */
    camposOpcionais: string[];
    /** Seções da situação */
    secoes: Record<string, ConfigSecao>;
}

/**
 * Interface para configuração dinâmica de situação (com variáveis de ambiente)
 */
export interface ConfigSituacaoDinamica {
    /** Campos obrigatórios da situação */
    camposObrigatorios: string[];
    /** Campos opcionais da situação */
    camposOpcionais: string[];
    /** Seções da situação */
    secoes: Record<string, ConfigSecaoDinamica>;
}

/**
 * Interface principal de configuração DRG
 */
export interface DRGFieldConfig {
    /** Situações de internação */
    situacoes: Record<SituacaoInternacao, ConfigSituacao>;
    /** Configurações globais */
    global: ConfigGlobal;
}

/**
 * Interface para configuração dinâmica DRG (com variáveis de ambiente)
 */
export interface DRGFieldConfigDinamica {
    /** Situações de internação */
    situacoes: Record<SituacaoInternacao, ConfigSituacaoDinamica>;
    /** Configurações globais */
    global: ConfigGlobal;
}

/**
 * Interface para configurações globais
 */
export interface ConfigGlobal {
    /** Se deve incluir campos vazios */
    incluirCamposVazios: boolean;
    /** Se deve validar campos obrigatórios */
    validarCamposObrigatorios: boolean;
    /** Se deve logar campos enviados */
    logCamposEnviados: boolean;
}

// ============================================================================
// INTERFACES BASE PARA VALIDAÇÃO
// ============================================================================

/**
 * Interface para resultado de validação
 */
export interface ResultadoValidacao {
    /** Se a validação passou */
    valid: boolean;
    /** Lista de erros encontrados */
    errors: string[];
}

/**
 * Interface para configuração resolvida (após aplicar variáveis de ambiente)
 */
export interface ConfigResolvida {
    /** Campos obrigatórios */
    camposObrigatorios: string[];
    /** Campos opcionais */
    camposOpcionais: string[];
    /** Seções resolvidas */
    secoes: Record<string, {
        /** Se a seção está habilitada */
        habilitada: boolean;
        /** Campos obrigatórios da seção */
        camposObrigatorios: string[];
        /** Campos opcionais da seção */
        camposOpcionais: string[];
    }>;
}

/**
 * Interface para o validador DRG
 */
export interface IDRGValidator {
    /** Valida campos obrigatórios */
    validateRequiredFields(data: any): ResultadoValidacao;
    /** Verifica se deve incluir uma seção */
    shouldIncludeSection(sectionName: string): boolean;
    /** Verifica se deve incluir um campo */
    shouldIncludeField(sectionName: string, fieldName: string): boolean;
    /** Retorna seções habilitadas */
    getEnabledSections(): string[];
    /** Retorna configuração resolvida */
    getConfig(): ConfigResolvida;
}
