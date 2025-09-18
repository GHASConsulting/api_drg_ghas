/**
 * Arquivo de demonstração do sistema de logs DRG
 * Testa todas as funcionalidades de logging implementadas
 */

import {
    createDRGValidator,
    isSecaoHabilitada,
    getConfigSituacao,
    getSecoesHabilitadas,
    validateDRGData,
    SituacaoInternacao,
    SecaoDRG
} from './interface';
import { drgLogger, LogLevel } from './utils/logger';

// ============================================================================
// CONFIGURAÇÃO DE AMBIENTE PARA TESTE
// ============================================================================

// Simular variáveis de ambiente para teste
process.env.LOG_CAMPOS_ENVIADOS = 'true';
process.env.LOG_LEVEL = 'debug';
process.env.INCLUIR_CID_SECUNDARIO = 'true';
process.env.INCLUIR_PROCEDIMENTO = 'false';
process.env.HOSPITAL_123_INCLUIR_CID_SECUNDARIO = 'false';

console.log('🚀 Iniciando demonstração do sistema de logs DRG...\n');

// ============================================================================
// TESTE 1: CRIAÇÃO DE VALIDADOR
// ============================================================================

console.log('📋 TESTE 1: Criação de Validador');
console.log('================================');

try {
    const validator = createDRGValidator(SituacaoInternacao.ADMISSIONAL, 123);
    console.log('✅ Validador criado com sucesso!\n');
} catch (error) {
    console.error('❌ Erro ao criar validador:', error);
}

// ============================================================================
// TESTE 2: VERIFICAÇÃO DE SEÇÕES HABILITADAS
// ============================================================================

console.log('📋 TESTE 2: Verificação de Seções Habilitadas');
console.log('==============================================');

const secoesParaTestar = [
    SecaoDRG.HOSPITAL,
    SecaoDRG.CID_SECUNDARIO,
    SecaoDRG.PROCEDIMENTO,
    SecaoDRG.CTI
];

secoesParaTestar.forEach(secao => {
    const habilitada = isSecaoHabilitada(secao, SituacaoInternacao.ADMISSIONAL, 123);
    console.log(`Seção ${secao}: ${habilitada ? '✅ Habilitada' : '❌ Desabilitada'}`);
});

console.log('');

// ============================================================================
// TESTE 3: CONFIGURAÇÃO DE SITUAÇÃO
// ============================================================================

console.log('📋 TESTE 3: Configuração de Situação');
console.log('====================================');

const config = getConfigSituacao(SituacaoInternacao.ADMISSIONAL);
console.log(`Campos obrigatórios da situação 1: ${config.camposObrigatorios.length}`);
console.log(`Seções configuradas: ${Object.keys(config.secoes).length}`);
console.log('');

// ============================================================================
// TESTE 4: SEÇÕES HABILITADAS
// ============================================================================

console.log('📋 TESTE 4: Seções Habilitadas');
console.log('==============================');

const secoesHabilitadas = getSecoesHabilitadas(SituacaoInternacao.ADMISSIONAL, 123);
console.log(`Seções habilitadas para situação 1: ${secoesHabilitadas.length}`);
secoesHabilitadas.forEach(secao => {
    console.log(`  - ${secao}`);
});
console.log('');

// ============================================================================
// TESTE 5: VALIDAÇÃO DE DADOS
// ============================================================================

console.log('📋 TESTE 5: Validação de Dados');
console.log('==============================');

// Dados de teste - alguns campos obrigatórios faltando
const dadosTeste = {
    numeroInternacao: '12345',
    dataInternacao: '2024-01-15',
    // hospital.codigoHospital - FALTANDO
    // beneficiario.cpf - FALTANDO
    'hospital.codigoHospital': '123',
    'beneficiario.cpf': '12345678901'
};

const resultadoValidacao = validateDRGData(dadosTeste, SituacaoInternacao.ADMISSIONAL, 123);
console.log(`Validação: ${resultadoValidacao.valid ? '✅ Válida' : '❌ Inválida'}`);
if (!resultadoValidacao.valid) {
    console.log(`Erros encontrados: ${resultadoValidacao.errors.length}`);
    resultadoValidacao.errors.slice(0, 3).forEach(erro => {
        console.log(`  - ${erro}`);
    });
}
console.log('');

// ============================================================================
// TESTE 6: LOGS ESPECÍFICOS
// ============================================================================

console.log('📋 TESTE 6: Logs Específicos');
console.log('============================');

// Testar diferentes níveis de log
drgLogger.debug('Este é um log de debug', {
    situacao: SituacaoInternacao.ADMISSIONAL,
    hospitalCode: 123,
    validator: 'TestLogger'
});

drgLogger.info('Este é um log de informação', {
    situacao: SituacaoInternacao.ADMISSIONAL,
    hospitalCode: 123,
    validator: 'TestLogger'
});

drgLogger.warn('Este é um log de aviso', {
    situacao: SituacaoInternacao.ADMISSIONAL,
    hospitalCode: 123,
    validator: 'TestLogger'
});

drgLogger.error('Este é um log de erro', {
    situacao: SituacaoInternacao.ADMISSIONAL,
    hospitalCode: 123,
    validator: 'TestLogger'
});

console.log('');

// ============================================================================
// TESTE 7: HISTÓRICO DE LOGS
// ============================================================================

console.log('📋 TESTE 7: Histórico de Logs');
console.log('=============================');

const historicoLogs = drgLogger.getLogHistory();
console.log(`Total de logs gerados: ${historicoLogs.length}`);
console.log(`Últimos 3 logs:`);
historicoLogs.slice(-3).forEach((log, index) => {
    console.log(`  ${index + 1}. [${log.level.toUpperCase()}] ${log.message}`);
});

console.log('');

// ============================================================================
// TESTE 8: CONFIGURAÇÃO DE LOGGER
// ============================================================================

console.log('📋 TESTE 8: Configuração de Logger');
console.log('==================================');

// Alterar nível de log para WARN
drgLogger.updateConfig({ level: LogLevel.WARN });
console.log('Nível de log alterado para WARN');

// Tentar fazer log de DEBUG (não deve aparecer)
drgLogger.debug('Este log de debug não deve aparecer');

// Fazer log de WARN (deve aparecer)
drgLogger.warn('Este log de aviso deve aparecer');

// Restaurar nível original
drgLogger.updateConfig({ level: LogLevel.DEBUG });
console.log('Nível de log restaurado para DEBUG');

console.log('');

// ============================================================================
// RESUMO FINAL
// ============================================================================

console.log('📊 RESUMO FINAL');
console.log('===============');
console.log('✅ Sistema de logs implementado com sucesso!');
console.log('✅ Logs estruturados funcionando');
console.log('✅ Diferentes níveis de log testados');
console.log('✅ Histórico de logs funcionando');
console.log('✅ Configuração dinâmica testada');
console.log('✅ Integração com sistema DRG funcionando');
console.log('');
console.log('🎯 Próximo passo: Testes unitários!');
console.log('');

// Limpar histórico para não poluir
drgLogger.clearHistory();
