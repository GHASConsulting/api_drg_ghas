#!/usr/bin/env node

/**
 * Script para importar dados reais do Estabelecimento 8 para a base de dados
 * Execute com: node import-estabelecimento8.js
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🏥 Importando dados reais do Estabelecimento 8...\n');

try {
  // Compila o TypeScript
  console.log('📦 Compilando TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });

  // Executa a importação
  console.log('\n🔍 Executando importação...');
  const command = `node -e "require('./dist/scripts/importEstabelecimento8Data.js').importEstabelecimento8Data()"`;
  execSync(command, { stdio: 'inherit' });

  console.log('\n✅ Importação concluída com sucesso!');
  console.log('🎯 Dados do Estabelecimento 8 importados para a base de dados.');

} catch (error) {
  console.error('\n❌ Erro durante a importação:', error.message);
  process.exit(1);
}
