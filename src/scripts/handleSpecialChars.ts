import { EnvStringBuilder, createSafeEnvString, updateEnvVariable } from '../utils/envStringBuilder';

/**
 * Script prático para lidar com caracteres especiais no .env
 */
async function main() {
  console.log('🔧 Script para lidar com caracteres especiais no .env\n');
  
  const builder = new EnvStringBuilder();
  
  try {
    // 1. Analisar caracteres especiais no arquivo
    console.log('📋 1. Análise de caracteres especiais:');
    builder.analyzeSpecialChars();
    
    console.log('='.repeat(80) + '\n');
    
    // 2. Exemplos práticos com diferentes formatos
    const variaveis = ['API_USER', 'API_PASSWORD', 'ESTABELECIMENTO'];
    
    console.log('📋 2. Exemplos de formatação com caracteres especiais:\n');
    
    // Formato bracket (pode ter problemas com caracteres especiais)
    console.log('🔴 Formato bracket (pode ter problemas):');
    const bracketFormat = builder.buildFilteredEnvString(variaveis, 'bracket');
    console.log(bracketFormat);
    console.log('');
    
    // Formato safe (recomendado para caracteres especiais)
    console.log('🟢 Formato safe (recomendado):');
    const safeFormat = builder.buildFilteredEnvString(variaveis, 'safe');
    console.log(safeFormat);
    console.log('');
    
    // Formato custom
    console.log('🟡 Formato custom:');
    const customFormat = builder.buildFilteredEnvString(variaveis, 'custom');
    console.log(customFormat);
    console.log('');
    
    console.log('='.repeat(80) + '\n');
    
    // 3. Atualizar variáveis no .env
    console.log('📋 3. Atualizando variáveis no .env:\n');
    
    // Atualizar STRING_ESTABELECIMENTO_DRG_A com formato safe
    console.log('🔄 Atualizando STRING_ESTABELECIMENTO_DRG_A...');
    const successA = updateEnvVariable('STRING_ESTABELECIMENTO_DRG_A', safeFormat);
    console.log(successA ? '✅ Atualizado com sucesso!' : '❌ Erro ao atualizar');
    console.log('Nova string:', safeFormat);
    console.log('');
    
    // Atualizar STRING_ESTABELECIMENTO_DRG_B com formato custom
    console.log('🔄 Atualizando STRING_ESTABELECIMENTO_DRG_B...');
    const successB = updateEnvVariable('STRING_ESTABELECIMENTO_DRG_B', customFormat);
    console.log(successB ? '✅ Atualizado com sucesso!' : '❌ Erro ao atualizar');
    console.log('Nova string:', customFormat);
    console.log('');
    
    console.log('='.repeat(80) + '\n');
    
    // 4. Exemplo de uso em código
    console.log('📋 4. Exemplo de uso em seu código:\n');
    console.log(`
// Importar as funções
import { createSafeEnvString, updateEnvVariable } from './utils/envStringBuilder';

// Criar string segura com caracteres especiais
const variaveis = ['API_USER', 'API_PASSWORD', 'ESTABELECIMENTO'];

// Formato safe (recomendado para caracteres especiais)
const stringSegura = createSafeEnvString(variaveis, 'safe');
console.log('String segura:', stringSegura);

// Atualizar no .env
updateEnvVariable('STRING_ESTABELECIMENTO_DRG_A', stringSegura);

// Usar em uma API ou configuração
const config = {
  estabelecimento: stringSegura,
  timestamp: new Date().toISOString()
};
    `);
    
    console.log('='.repeat(80) + '\n');
    
    // 5. Verificar resultado final
    console.log('📋 5. Verificando resultado final:\n');
    
    console.log('STRING_ESTABELECIMENTO_DRG_A:');
    const resultA = builder.buildFilteredEnvString(['STRING_ESTABELECIMENTO_DRG_A'], 'custom');
    console.log(resultA || 'Variável não encontrada');
    console.log('');
    
    console.log('STRING_ESTABELECIMENTO_DRG_B:');
    const resultB = builder.buildFilteredEnvString(['STRING_ESTABELECIMENTO_DRG_B'], 'custom');
    console.log(resultB || 'Variável não encontrada');
    
  } catch (error) {
    console.error('❌ Erro durante a execução:', error);
  }
}

// Executar o script
if (require.main === module) {
  main().catch(console.error);
}

export { main };





