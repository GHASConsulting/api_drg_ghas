/**
 * Configuração DRG completa com variáveis de ambiente
 * Configuração dinâmica baseada no documento de implementação
 */

import { SecaoDRG, SituacaoInternacao } from '../types/enums';
import { DRGFieldConfigDinamica, ConfigSecaoDinamica } from '../types/base';
import { logSecaoResolution, logDRGConfigLoaded, drgLogger } from '../utils/logger';

// ============================================================================
// MAPEAMENTO DE VARIÁVEIS DE AMBIENTE
// ============================================================================

/**
 * Mapeamento das variáveis de ambiente para seções DRG
 */
export const ENV_VAR_MAPPING: Record<SecaoDRG, string> = {
    [SecaoDRG.HOSPITAL]: '', // Sempre habilitado
    [SecaoDRG.BENEFICIARIO]: '', // Sempre habilitado
    [SecaoDRG.OPERADORA]: '', // Sempre habilitado
    [SecaoDRG.MEDICO]: '', // Sempre habilitado
    [SecaoDRG.CID_SECUNDARIO]: 'INCLUIR_CID_SECUNDARIO',
    [SecaoDRG.PROCEDIMENTO]: 'INCLUIR_PROCEDIMENTOS',
    [SecaoDRG.MEDICO_PROCEDIMENTO]: 'INCLUIR_MEDICO_PROCEDIMENTO',
    [SecaoDRG.CTI]: 'INCLUIR_CTI',
    [SecaoDRG.RN]: 'INCLUIR_RN',
    [SecaoDRG.CONDICAO_ADQUIRIDA]: 'INCLUIR_CONDICOES_ADQUIRIDAS',
    [SecaoDRG.ALTA_ADMINISTRATIVA]: 'INCLUIR_ALTA_ADMINISTRATIVA',
    [SecaoDRG.ANALISE_CRITICA]: 'INCLUIR_ANALISE_CRITICA',
    [SecaoDRG.SUPORTE_VENTILATORIO]: 'INCLUIR_SUPORTE_VENTILATORIO',
    [SecaoDRG.CONDICAO_ADQUIRIDA_SUPORTE_VENTILATORIO]: 'INCLUIR_CONDICAO_ADQUIRIDA_SUPORTE',
    [SecaoDRG.SONDA_VESICAL_DE_DEMORA]: 'INCLUIR_SONDA_VESICAL',
    [SecaoDRG.CONDICAO_ADQUIRIDA_SONDA_VESICAL_DE_DEMORA]: 'INCLUIR_CONDICAO_ADQUIRIDA_SONDA',
    [SecaoDRG.CATETER_VASCULAR_CENTRAL]: 'INCLUIR_CATETER_VASCULAR',
    [SecaoDRG.CONDICAO_ADQUIRIDA_CATETER_VASCULAR_CENTRAL]: 'INCLUIR_CONDICAO_ADQUIRIDA_CATETER',
    [SecaoDRG.DISPOSITIVO_TERAPEUTICO]: 'INCLUIR_DISPOSITIVO_TERAPEUTICO',
    [SecaoDRG.ORIGEM_RECAIDA]: 'INCLUIR_ORIGEM_RECAIDA',
    [SecaoDRG.PARTO_ADEQUADO]: 'INCLUIR_PARTO_ADEQUADO',
    [SecaoDRG.CAUSA_EXTERNA_PERMANENCIA]: 'INCLUIR_CAUSA_EXTERNA',
};

// ============================================================================
// FUNÇÕES DE RESOLUÇÃO
// ============================================================================

/**
 * Função para resolver seção com variável de ambiente
 * Respeita a precedência: hospital específico > global > padrão
 */
export function resolveSecaoHabilitada(secao: SecaoDRG, hospitalCode?: number): boolean {
    const envVar = ENV_VAR_MAPPING[secao];

    // Seções sempre habilitadas
    if (!envVar) {
        drgLogger.debug(`Seção ${secao} sempre habilitada`, {
            secao,
            hospitalCode,
            validator: 'SecaoResolver'
        });
        return true;
    }

    let hospitalValue: string | undefined;
    let globalValue: string | undefined;

    // Verificar configuração específica do hospital primeiro
    if (hospitalCode) {
        const hospitalEnvVar = `HOSPITAL_${hospitalCode}_${envVar}`;
        hospitalValue = process.env[hospitalEnvVar];
        if (hospitalValue !== undefined) {
            const result = hospitalValue === 'true';
            logSecaoResolution(secao, hospitalCode, envVar, hospitalValue, undefined, result);
            return result;
        }
    }

    // Usar configuração global
    globalValue = process.env[envVar];
    const result = globalValue === 'true';

    logSecaoResolution(secao, hospitalCode, envVar, hospitalValue, globalValue, result);

    return result;
}

/**
 * Função para criar configuração de seção dinâmica
 */
function createSecaoDinamica(
    secao: SecaoDRG,
    camposObrigatorios: string[] = [],
    camposOpcionais: string[] = []
): ConfigSecaoDinamica {
    const envVar = ENV_VAR_MAPPING[secao];

    return {
        habilitada: envVar ? resolveSecaoHabilitada(secao) : true,
        camposObrigatorios,
        camposOpcionais,
        envVar: envVar || undefined,
    };
}

// ============================================================================
// CONFIGURAÇÃO DRG COMPLETA
// ============================================================================

/**
 * Configuração DRG real baseada no documento de implementação
 */
export const DRG_CONFIG: DRGFieldConfigDinamica = {
    situacoes: {
        1: {
            camposObrigatorios: [
                "situacao",
                "caraterInternacao",
                "codigoCidPrincipal",
                "dataInternacao",
                "numeroAtendimento",
                "numeroAutorizacao",
            ],
            camposOpcionais: [
                "procedencia",
                "leito",
                "numeroOperadora",
                "numeroRegistro",
                "dataAutorizacao",
                "internadoOutrasVezes",
                "reinternacao",
                "recaida",
            ],
            secoes: {
                hospital: createSecaoDinamica(SecaoDRG.HOSPITAL,
                    ["codigo", "nome", "cnes", "porte", "complexidade"],
                    ["complementoLogradouro"]
                ),
                beneficiario: createSecaoDinamica(SecaoDRG.BENEFICIARIO,
                    ["dataNascimento", "sexo"],
                    ["cpf", "recemNascido", "particular"]
                ),
                operadora: createSecaoDinamica(SecaoDRG.OPERADORA,
                    ["codigo", "numeroCarteira"],
                    ["plano", "dataValidade"]
                ),
                medico: createSecaoDinamica(SecaoDRG.MEDICO,
                    ["nome", "uf", "crm", "especialidade", "medicoResponsavel"],
                    ["ddd", "telefone", "email", "tipoAtuacao"]
                ),
                cidSecundario: createSecaoDinamica(SecaoDRG.CID_SECUNDARIO,
                    [],
                    ["codigoCidSecundario"]
                ),
                procedimento: createSecaoDinamica(SecaoDRG.PROCEDIMENTO,
                    [],
                    ["codigoProcedimento", "dataAutorizacao", "dataExecucao"]
                ),
                cti: createSecaoDinamica(SecaoDRG.CTI,
                    [],
                    ["dataInicial", "dataFinal", "codigoCidPrincipal"]
                ),
                suporteVentilatorio: createSecaoDinamica(SecaoDRG.SUPORTE_VENTILATORIO,
                    [],
                    ["tipo", "dataInicial", "dataFinal"]
                ),
                condicaoAdquirida: createSecaoDinamica(SecaoDRG.CONDICAO_ADQUIRIDA,
                    [],
                    ["codigoCondicaoAdquirida", "dataOcorrencia"]
                ),
                partoAdequado: createSecaoDinamica(SecaoDRG.PARTO_ADEQUADO,
                    [],
                    ["antecedentesObstetricos", "numeroCesareasAnteriores"]
                ),
                // Seções não presentes na situação 1
                medicoProcedimento: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                rn: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                altaAdministrativa: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                analiseCritica: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                condicaoAdquiridaSuporteVentilatorio: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                sondaVesicalDeDemora: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                condicaoAdquiridaSondaVesicalDeDemora: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                cateterVascularCentral: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                condicaoAdquiridaCateterVascularCentral: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                dispositivoTerapeutico: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                origemRecaida: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                causaExternaPermanencia: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
            },
        },
        2: {
            camposObrigatorios: [
                "situacao",
                "caraterInternacao",
                "codigoCidPrincipal",
                "dataInternacao",
                "numeroAtendimento",
                "numeroAutorizacao",
            ],
            camposOpcionais: [
                "procedencia",
                "leito",
                "numeroOperadora",
                "numeroRegistro",
                "dataAutorizacao",
                "internadoOutrasVezes",
                "reinternacao",
                "recaida",
            ],
            secoes: {
                hospital: createSecaoDinamica(SecaoDRG.HOSPITAL,
                    ["codigo", "nome", "cnes", "porte", "complexidade"],
                    ["complementoLogradouro"]
                ),
                beneficiario: createSecaoDinamica(SecaoDRG.BENEFICIARIO,
                    ["dataNascimento", "sexo"],
                    ["cpf", "recemNascido", "particular"]
                ),
                operadora: createSecaoDinamica(SecaoDRG.OPERADORA,
                    ["codigo", "numeroCarteira"],
                    ["plano", "dataValidade"]
                ),
                medico: createSecaoDinamica(SecaoDRG.MEDICO,
                    ["nome", "uf", "crm", "especialidade", "medicoResponsavel"],
                    ["ddd", "telefone", "email", "tipoAtuacao"]
                ),
                cidSecundario: createSecaoDinamica(SecaoDRG.CID_SECUNDARIO,
                    [],
                    ["codigoCidSecundario"]
                ),
                procedimento: createSecaoDinamica(SecaoDRG.PROCEDIMENTO,
                    [],
                    ["codigoProcedimento", "dataAutorizacao", "dataExecucao"]
                ),
                cti: createSecaoDinamica(SecaoDRG.CTI,
                    [],
                    ["dataInicial", "dataFinal", "codigoCidPrincipal"]
                ),
                suporteVentilatorio: createSecaoDinamica(SecaoDRG.SUPORTE_VENTILATORIO,
                    [],
                    ["tipo", "dataInicial", "dataFinal"]
                ),
                condicaoAdquirida: createSecaoDinamica(SecaoDRG.CONDICAO_ADQUIRIDA,
                    [],
                    ["codigoCondicaoAdquirida", "dataOcorrencia"]
                ),
                partoAdequado: createSecaoDinamica(SecaoDRG.PARTO_ADEQUADO,
                    [],
                    ["antecedentesObstetricos", "numeroCesareasAnteriores"]
                ),
                sondaVesicalDeDemora: createSecaoDinamica(SecaoDRG.SONDA_VESICAL_DE_DEMORA,
                    [],
                    ["local", "dataInicial", "dataFinal"]
                ),
                cateterVascularCentral: createSecaoDinamica(SecaoDRG.CATETER_VASCULAR_CENTRAL,
                    [],
                    ["local", "dataInicial", "dataFinal"]
                ),
                altaAdministrativa: createSecaoDinamica(SecaoDRG.ALTA_ADMINISTRATIVA,
                    [],
                    ["numeroAtendimento", "numeroAutorizacao", "dataAutorizacao", "dataAtendimentoInicial", "dataAtendimentoFinal"]
                ),
                // Seções não presentes na situação 2
                medicoProcedimento: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                rn: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                analiseCritica: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                condicaoAdquiridaSuporteVentilatorio: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                condicaoAdquiridaSondaVesicalDeDemora: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                condicaoAdquiridaCateterVascularCentral: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                dispositivoTerapeutico: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                origemRecaida: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                causaExternaPermanencia: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
            },
        },
        3: {
            camposObrigatorios: [
                "situacao",
                "caraterInternacao",
                "codigoCidPrincipal",
                "dataInternacao",
                "dataAlta",
                "condicaoAlta",
                "numeroAtendimento",
                "numeroAutorizacao",
            ],
            camposOpcionais: [
                "procedencia",
                "leito",
                "numeroOperadora",
                "numeroRegistro",
                "dataAutorizacao",
                "internadoOutrasVezes",
                "reinternacao",
                "recaida",
            ],
            secoes: {
                hospital: createSecaoDinamica(SecaoDRG.HOSPITAL,
                    ["codigo", "nome", "cnes", "porte", "complexidade", "esferaAdministrativa", "tipoLogradouro", "logradouro", "numeroLogradouro", "bairro", "uf", "cidade", "cep"],
                    ["complementoLogradouro"]
                ),
                beneficiario: createSecaoDinamica(SecaoDRG.BENEFICIARIO,
                    ["dataNascimento", "sexo"],
                    ["cpf", "recemNascido", "particular", "uf", "cidade", "tipoLogradouro", "logradouro", "numeroLogradouro", "complementoLogradouro", "bairro", "cep", "vulnerabilidadeSocial", "cns", "codigoIdentificacao"]
                ),
                operadora: createSecaoDinamica(SecaoDRG.OPERADORA,
                    ["codigo", "numeroCarteira"],
                    ["plano", "dataValidade"]
                ),
                medico: createSecaoDinamica(SecaoDRG.MEDICO,
                    ["nome", "uf", "crm", "especialidade", "medicoResponsavel"],
                    ["ddd", "telefone", "email", "tipoAtuacao"]
                ),
                cidSecundario: createSecaoDinamica(SecaoDRG.CID_SECUNDARIO,
                    [],
                    ["codigoCidSecundario"]
                ),
                procedimento: createSecaoDinamica(SecaoDRG.PROCEDIMENTO,
                    [],
                    ["codigoProcedimento", "dataAutorizacao", "dataSolicitacao", "dataExecucao", "dataExecucaoFinal"]
                ),
                medicoProcedimento: createSecaoDinamica(SecaoDRG.MEDICO_PROCEDIMENTO,
                    [],
                    ["uf", "crm", "tipoAtuacao"]
                ),
                cti: createSecaoDinamica(SecaoDRG.CTI,
                    [],
                    ["dataInicial", "dataFinal", "codigoCidPrincipal", "condicaoAlta", "uf", "crm", "codigoHospital", "nomeHospital", "tipo", "leito"]
                ),
                rn: createSecaoDinamica(SecaoDRG.RN,
                    [],
                    ["pesoNascimento", "idadeGestacional", "comprimento", "sexo", "nascidoVivo", "tocotraumatismo", "apgar", "apgarQuintoMinuto", "alta48horas", "numeroAutorizacaoMae", "numeroAtendimentoMae", "numeroCarteiraMae"]
                ),
                condicaoAdquirida: createSecaoDinamica(SecaoDRG.CONDICAO_ADQUIRIDA,
                    [],
                    ["codigoCondicaoAdquirida", "dataOcorrencia", "dataManifestacao", "uf", "crm"]
                ),
                altaAdministrativa: createSecaoDinamica(SecaoDRG.ALTA_ADMINISTRATIVA,
                    [],
                    ["numeroAtendimento", "numeroAutorizacao", "dataAutorizacao", "dataAtendimentoInicial", "dataAtendimentoFinal"]
                ),
                analiseCritica: createSecaoDinamica(SecaoDRG.ANALISE_CRITICA,
                    [],
                    ["dataAnalise", "analiseCritica"]
                ),
                suporteVentilatorio: createSecaoDinamica(SecaoDRG.SUPORTE_VENTILATORIO,
                    [],
                    ["tipo", "tipoInvasivo", "local", "dataInicial", "dataFinal"]
                ),
                condicaoAdquiridaSuporteVentilatorio: createSecaoDinamica(SecaoDRG.CONDICAO_ADQUIRIDA_SUPORTE_VENTILATORIO,
                    [],
                    ["codigoCondicaoAdquirida", "dataOcorrencia"]
                ),
                sondaVesicalDeDemora: createSecaoDinamica(SecaoDRG.SONDA_VESICAL_DE_DEMORA,
                    [],
                    ["local", "dataInicial", "dataFinal"]
                ),
                condicaoAdquiridaSondaVesicalDeDemora: createSecaoDinamica(SecaoDRG.CONDICAO_ADQUIRIDA_SONDA_VESICAL_DE_DEMORA,
                    [],
                    ["codigoCondicaoAdquirida", "dataOcorrencia"]
                ),
                cateterVascularCentral: createSecaoDinamica(SecaoDRG.CATETER_VASCULAR_CENTRAL,
                    [],
                    ["local", "dataInicial", "dataFinal"]
                ),
                condicaoAdquiridaCateterVascularCentral: createSecaoDinamica(SecaoDRG.CONDICAO_ADQUIRIDA_CATETER_VASCULAR_CENTRAL,
                    [],
                    ["codigoCondicaoAdquirida", "dataOcorrencia"]
                ),
                dispositivoTerapeutico: createSecaoDinamica(SecaoDRG.DISPOSITIVO_TERAPEUTICO,
                    [],
                    ["local", "tipoTerapeutico", "dataInicial", "dataFinal"]
                ),
                origemRecaida: createSecaoDinamica(SecaoDRG.ORIGEM_RECAIDA,
                    [],
                    ["numeroAtendimento", "numeroAutorizacao"]
                ),
                partoAdequado: createSecaoDinamica(SecaoDRG.PARTO_ADEQUADO,
                    [],
                    ["antecedentesObstetricos", "numeroCesareasAnteriores", "apresentacaoFetalRn1", "apresentacaoFetalRn2", "apresentacaoFetalRn3", "apresentacaoFetalRn4", "apresentacaoFetalRn5", "inicioTrabalhoParto", "rupturaUterina", "laceracaoPerineal", "transfusaoSanguinea", "morteMaterna", "morteFetalIntraparto", "admissaoMaternaUti", "retornoSalaParto", "indiceSatisfacaoHospital", "indiceSatisfacaoEquipe", "houveContatoPele", "posicaoParto", "medicacaoInducaoParto", "usoOcitocinaMisoprostol", "parturienteAcompanhada", "presencaDoula", "realizadaEpisiotomia", "houveAleitamentoMaterno", "quandoOcorreuClampeamento", "houveMetodosAnalgesia", "metodoAnalgesia", "perimetroCefalicoRn1", "perimetroCefalicoRn2", "perimetroCefalicoRn3", "perimetroCefalicoRn4", "perimetroCefalicoRn5", "cesariana", "numeroPartosAnteriores"]
                ),
                causaExternaPermanencia: createSecaoDinamica(SecaoDRG.CAUSA_EXTERNA_PERMANENCIA,
                    [],
                    ["descricao", "tempo", "dataInicial", "dataFinal", "origem"]
                ),
            },
        },
        4: {
            camposObrigatorios: [
                "situacao",
                "caraterInternacao",
                "codigoCidPrincipal",
            ],
            camposOpcionais: ["numeroAtendimento", "numeroAutorizacao", "recaida"],
            secoes: {
                beneficiario: createSecaoDinamica(SecaoDRG.BENEFICIARIO,
                    ["dataNascimento", "sexo"],
                    ["cpf", "recemNascido", "particular"]
                ),
                operadora: createSecaoDinamica(SecaoDRG.OPERADORA,
                    ["codigo", "numeroCarteira"],
                    ["plano", "dataValidade"]
                ),
                // Todas as outras seções desabilitadas na situação 4
                hospital: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                medico: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                cidSecundario: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                procedimento: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                medicoProcedimento: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                cti: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                rn: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                condicaoAdquirida: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                altaAdministrativa: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                analiseCritica: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                suporteVentilatorio: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                condicaoAdquiridaSuporteVentilatorio: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                sondaVesicalDeDemora: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                condicaoAdquiridaSondaVesicalDeDemora: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                cateterVascularCentral: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                condicaoAdquiridaCateterVascularCentral: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                dispositivoTerapeutico: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                origemRecaida: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                partoAdequado: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
                causaExternaPermanencia: { habilitada: false, camposObrigatorios: [], camposOpcionais: [] },
            },
        },
    },
    global: {
        incluirCamposVazios: process.env.INCLUIR_CAMPOS_VAZIOS === "true",
        validarCamposObrigatorios: process.env.VALIDAR_CAMPOS_OBRIGATORIOS === "true",
        logCamposEnviados: process.env.LOG_CAMPOS_ENVIADOS === "true",
    },
};

// Log de configuração carregada
logDRGConfigLoaded();
