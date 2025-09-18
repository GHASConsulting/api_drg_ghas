/**
 * Interfaces DRG - Sistema de Campos Flexíveis
 * Tipagem simples para dados do sistema DRG
 */

// ============================================================================
// ENUMS BÁSICOS
// ============================================================================

export enum SituacaoInternacao {
    ADMISSIONAL = 1,
    TRANSFERENCIA = 2,
    ALTA = 3,
    AUTORIZACAO = 4
}

export enum CaraterInternacao {
    ELETIVO = "E",
    URGENCIA = "U"
}

export enum CondicaoAlta {
    ALTA_MELHORADO = "1",
    ALTA_CURADO = "2",
    ALTA_SEM_MELHORIA = "3",
    ALTA_PIORADO = "4",
    OBITO = "5",
    TRANSFERENCIA = "6"
}

export enum Sexo {
    MASCULINO = "M",
    FEMININO = "F"
}

export enum Procedencia {
    URGENCIA = "1",
    AMBULATORIO = "2",
    INTERNAMENTO = "3",
    TRANSFERENCIA = "4"
}

export enum TipoLeito {
    ENFERMARIA = "1",
    APARTAMENTO = "2",
    UTI = "3",
    CTI = "4"
}

// ============================================================================
// INTERFACES DE DADOS
// ============================================================================

// Campos básicos da internação
export interface CamposInternacao {
    situacao: SituacaoInternacao;
    caraterInternacao: CaraterInternacao;
    codigoCidPrincipal: string;
    dataInternacao?: string;
    dataAlta?: string;
    condicaoAlta?: CondicaoAlta;
    numeroAtendimento?: string;
    numeroAutorizacao?: string;
    procedencia?: Procedencia;
    leito?: string;
    numeroOperadora?: string;
    numeroRegistro?: string;
    dataAutorizacao?: string;
    internadoOutrasVezes?: boolean;
    reinternacao?: boolean;
    recaida?: boolean;
}

// Dados do hospital
export interface CamposHospital {
    codigo: string;
    nome: string;
    cnes: string;
    porte: string;
    complexidade: string;
    esferaAdministrativa?: string;
    tipoLogradouro?: string;
    logradouro?: string;
    numeroLogradouro?: string;
    bairro?: string;
    uf?: string;
    cidade?: string;
    cep?: string;
    complementoLogradouro?: string;
}

// Dados do beneficiário
export interface CamposBeneficiario {
    dataNascimento: string;
    sexo: Sexo;
    cpf?: string;
    recemNascido?: boolean;
    particular?: boolean;
    uf?: string;
    cidade?: string;
    tipoLogradouro?: string;
    logradouro?: string;
    numeroLogradouro?: string;
    complementoLogradouro?: string;
    bairro?: string;
    cep?: string;
    vulnerabilidadeSocial?: boolean;
    cns?: string;
    codigoIdentificacao?: string;
}

// Dados da operadora
export interface CamposOperadora {
    codigo: string;
    numeroCarteira: string;
    plano?: string;
    dataValidade?: string;
}

// Dados do médico
export interface CamposMedico {
    nome: string;
    uf: string;
    crm: string;
    especialidade: string;
    medicoResponsavel: boolean;
    ddd?: string;
    telefone?: string;
    email?: string;
    tipoAtuacao?: string;
}

// CID Secundário
export interface CamposCidSecundario {
    codigoCidSecundario?: string;
}

// Procedimento
export interface CamposProcedimento {
    codigoProcedimento?: string;
    dataAutorizacao?: string;
    dataSolicitacao?: string;
    dataExecucao?: string;
    dataExecucaoFinal?: string;
}

// Médico do Procedimento
export interface CamposMedicoProcedimento {
    uf?: string;
    crm?: string;
    tipoAtuacao?: string;
}

// CTI
export interface CamposCTI {
    dataInicial?: string;
    dataFinal?: string;
    codigoCidPrincipal?: string;
    condicaoAlta?: CondicaoAlta;
    uf?: string;
    crm?: string;
    codigoHospital?: string;
    nomeHospital?: string;
    tipo?: string;
    leito?: string;
}

// Recém-nascido
export interface CamposRN {
    pesoNascimento?: number;
    idadeGestacional?: number;
    comprimento?: number;
    sexo?: Sexo;
    nascidoVivo?: boolean;
    tocotraumatismo?: boolean;
    apgar?: number;
    apgarQuintoMinuto?: number;
    alta48horas?: boolean;
    numeroAutorizacaoMae?: string;
    numeroAtendimentoMae?: string;
    numeroCarteiraMae?: string;
}

// Condição Adquirida
export interface CamposCondicaoAdquirida {
    codigoCondicaoAdquirida?: string;
    dataOcorrencia?: string;
    dataManifestacao?: string;
    uf?: string;
    crm?: string;
}

// Alta Administrativa
export interface CamposAltaAdministrativa {
    numeroAtendimento?: string;
    numeroAutorizacao?: string;
    dataAutorizacao?: string;
    dataAtendimentoInicial?: string;
    dataAtendimentoFinal?: string;
}

// Análise Crítica
export interface CamposAnaliseCritica {
    dataAnalise?: string;
    analiseCritica?: string;
}

// Suporte Ventilatório
export interface CamposSuporteVentilatorio {
    tipo?: string;
    tipoInvasivo?: string;
    local?: string;
    dataInicial?: string;
    dataFinal?: string;
}

// Condição Adquirida Suporte Ventilatório
export interface CamposCondicaoAdquiridaSuporteVentilatorio {
    codigoCondicaoAdquirida?: string;
    dataOcorrencia?: string;
}

// Sonda Vesical de Demora
export interface CamposSondaVesicalDeDemora {
    local?: string;
    dataInicial?: string;
    dataFinal?: string;
}

// Condição Adquirida Sonda Vesical
export interface CamposCondicaoAdquiridaSondaVesicalDeDemora {
    codigoCondicaoAdquirida?: string;
    dataOcorrencia?: string;
}

// Cateter Vascular Central
export interface CamposCateterVascularCentral {
    local?: string;
    dataInicial?: string;
    dataFinal?: string;
}

// Condição Adquirida Cateter Vascular
export interface CamposCondicaoAdquiridaCateterVascularCentral {
    codigoCondicaoAdquirida?: string;
    dataOcorrencia?: string;
}

// Dispositivo Terapêutico
export interface CamposDispositivoTerapeutico {
    local?: string;
    tipoTerapeutico?: string;
    dataInicial?: string;
    dataFinal?: string;
}

// Origem Recaída
export interface CamposOrigemRecaida {
    numeroAtendimento?: string;
    numeroAutorizacao?: string;
}

// Parto Adequado
export interface CamposPartoAdequado {
    antecedentesObstetricos?: string;
    numeroCesareasAnteriores?: number;
    apresentacaoFetalRn1?: string;
    apresentacaoFetalRn2?: string;
    apresentacaoFetalRn3?: string;
    apresentacaoFetalRn4?: string;
    apresentacaoFetalRn5?: string;
    inicioTrabalhoParto?: string;
    rupturaUterina?: boolean;
    laceracaoPerineal?: string;
    transfusaoSanguinea?: boolean;
    morteMaterna?: boolean;
    morteFetalIntraparto?: boolean;
    admissaoMaternaUti?: boolean;
    retornoSalaParto?: boolean;
    indiceSatisfacaoHospital?: number;
    indiceSatisfacaoEquipe?: number;
    houveContatoPele?: boolean;
    posicaoParto?: string;
    medicacaoInducaoParto?: string;
    usoOcitocinaMisoprostol?: boolean;
    parturienteAcompanhada?: boolean;
    presencaDoula?: boolean;
    realizadaEpisiotomia?: boolean;
    houveAleitamentoMaterno?: boolean;
    quandoOcorreuClampeamento?: string;
    houveMetodosAnalgesia?: boolean;
    metodoAnalgesia?: string;
    perimetroCefalicoRn1?: number;
    perimetroCefalicoRn2?: number;
    perimetroCefalicoRn3?: number;
    perimetroCefalicoRn4?: number;
    perimetroCefalicoRn5?: number;
    cesariana?: boolean;
    numeroPartosAnteriores?: number;
}

// Causa Externa Permanência
export interface CamposCausaExternaPermanencia {
    descricao?: string;
    tempo?: string;
    dataInicial?: string;
    dataFinal?: string;
    origem?: string;
}

// ============================================================================
// INTERFACE PRINCIPAL DRG
// ============================================================================

export interface DadosDRG {
    // Campos obrigatórios da internação
    internacao: CamposInternacao;

    // Seções opcionais (podem estar presentes ou não)
    hospital?: CamposHospital;
    beneficiario?: CamposBeneficiario;
    operadora?: CamposOperadora;
    medico?: CamposMedico;
    cidSecundario?: CamposCidSecundario;
    procedimento?: CamposProcedimento;
    medicoProcedimento?: CamposMedicoProcedimento;
    cti?: CamposCTI;
    rn?: CamposRN;
    condicaoAdquirida?: CamposCondicaoAdquirida;
    altaAdministrativa?: CamposAltaAdministrativa;
    analiseCritica?: CamposAnaliseCritica;
    suporteVentilatorio?: CamposSuporteVentilatorio;
    condicaoAdquiridaSuporteVentilatorio?: CamposCondicaoAdquiridaSuporteVentilatorio;
    sondaVesicalDeDemora?: CamposSondaVesicalDeDemora;
    condicaoAdquiridaSondaVesicalDeDemora?: CamposCondicaoAdquiridaSondaVesicalDeDemora;
    cateterVascularCentral?: CamposCateterVascularCentral;
    condicaoAdquiridaCateterVascularCentral?: CamposCondicaoAdquiridaCateterVascularCentral;
    dispositivoTerapeutico?: CamposDispositivoTerapeutico;
    origemRecaida?: CamposOrigemRecaida;
    partoAdequado?: CamposPartoAdequado;
    causaExternaPermanencia?: CamposCausaExternaPermanencia;
}

// ============================================================================
// INTERFACES POR SITUAÇÃO (ESPECÍFICAS)
// ============================================================================

// Situação 1 - Admissional
export interface DadosDRGSituacao1 extends DadosDRG {
    internacao: CamposInternacao & {
        situacao: SituacaoInternacao.ADMISSIONAL;
        dataInternacao: string;
        numeroAtendimento: string;
        numeroAutorizacao: string;
    };
    hospital: CamposHospital;
    beneficiario: CamposBeneficiario;
    operadora: CamposOperadora;
    medico: CamposMedico;
}

// Situação 2 - Transferência
export interface DadosDRGSituacao2 extends DadosDRG {
    internacao: CamposInternacao & {
        situacao: SituacaoInternacao.TRANSFERENCIA;
        dataInternacao: string;
        numeroAtendimento: string;
        numeroAutorizacao: string;
    };
    hospital: CamposHospital;
    beneficiario: CamposBeneficiario;
    operadora: CamposOperadora;
    medico: CamposMedico;
}

// Situação 3 - Alta
export interface DadosDRGSituacao3 extends DadosDRG {
    internacao: CamposInternacao & {
        situacao: SituacaoInternacao.ALTA;
        dataInternacao: string;
        dataAlta: string;
        condicaoAlta: CondicaoAlta;
        numeroAtendimento: string;
        numeroAutorizacao: string;
    };
    hospital: CamposHospital & {
        esferaAdministrativa: string;
        tipoLogradouro: string;
        logradouro: string;
        numeroLogradouro: string;
        bairro: string;
        uf: string;
        cidade: string;
        cep: string;
    };
    beneficiario: CamposBeneficiario;
    operadora: CamposOperadora;
    medico: CamposMedico;
}

// Situação 4 - Autorização
export interface DadosDRGSituacao4 extends DadosDRG {
    internacao: CamposInternacao & {
        situacao: SituacaoInternacao.AUTORIZACAO;
    };
    beneficiario: CamposBeneficiario;
    operadora: CamposOperadora;
}

// ============================================================================
// CONFIGURAÇÃO DRG (SIMPLIFICADA)
// ============================================================================

export interface DRGFieldConfig {
    situacoes: {
        [situacao: number]: {
            camposObrigatorios: string[];
            camposOpcionais: string[];
            secoes: {
                [secao: string]: {
                    habilitada: boolean;
                    camposObrigatorios: string[];
                    camposOpcionais: string[];
                };
            };
        };
    };
    global: {
        incluirCamposVazios: boolean;
        validarCamposObrigatorios: boolean;
        logCamposEnviados: boolean;
    };
}

// ============================================================================
// RESULTADO DE VALIDAÇÃO
// ============================================================================

export interface ResultadoValidacao {
    valid: boolean;
    errors: string[];
}

// ============================================================================
// TIPOS UTILITÁRIOS
// ============================================================================

export type SituacaoDRG = 1 | 2 | 3 | 4;
export type SecaoDRG =
    | 'hospital'
    | 'beneficiario'
    | 'operadora'
    | 'medico'
    | 'cidSecundario'
    | 'procedimento'
    | 'medicoProcedimento'
    | 'cti'
    | 'rn'
    | 'condicaoAdquirida'
    | 'altaAdministrativa'
    | 'analiseCritica'
    | 'suporteVentilatorio'
    | 'condicaoAdquiridaSuporteVentilatorio'
    | 'sondaVesicalDeDemora'
    | 'condicaoAdquiridaSondaVesicalDeDemora'
    | 'cateterVascularCentral'
    | 'condicaoAdquiridaCateterVascularCentral'
    | 'dispositivoTerapeutico'
    | 'origemRecaida'
    | 'partoAdequado'
    | 'causaExternaPermanencia';
