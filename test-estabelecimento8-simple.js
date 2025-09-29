#!/usr/bin/env node

/**
 * Script simples para testar com dados do Estabelecimento 8 (modo offline)
 * Execute com: node test-estabelecimento8-simple.js [situacao] [cenario]
 */

const { execSync } = require('child_process');
const path = require('path');

const situacao = process.argv[2];
const cenario = process.argv[3];

if (!situacao || !cenario) {
  console.log('❌ Uso: node test-estabelecimento8-simple.js [situacao] [cenario]');
  console.log('');
  console.log('Situações:');
  console.log('  1: Admissional');
  console.log('  2: Prorrogação');
  console.log('  3: Suplementar');
  console.log('');
  console.log('Cenários:');
  console.log('  1: Básico');
  console.log('  2: Completo');
  console.log('  3: Emergência');
  console.log('  4: Recém-nascido');
  console.log('  5: Reinternação');
  console.log('  6: Recaída');
  console.log('  7: Particular');
  console.log('  8: Vulnerabilidade');
  console.log('');
  console.log('Exemplos:');
  console.log('  node test-estabelecimento8-simple.js 1 4  # Admissional Recém-nascido');
  console.log('  node test-estabelecimento8-simple.js 2 3  # Prorrogação Emergência');
  console.log('  node test-estabelecimento8-simple.js 3 7  # Suplementar Particular');
  process.exit(1);
}

const situacaoNames = {
  '1': 'Admissional',
  '2': 'Prorrogação',
  '3': 'Suplementar'
};

const cenarioNames = {
  '1': 'Básico',
  '2': 'Completo',
  '3': 'Emergência',
  '4': 'Recém-nascido',
  '5': 'Reinternação',
  '6': 'Recaída',
  '7': 'Particular',
  '8': 'Vulnerabilidade'
};

console.log(`🏥 Testando cenário com dados do Estabelecimento 8 (Modo Offline): ${situacaoNames[situacao]} - ${cenarioNames[cenario]}...\n`);

try {
  // Compila o TypeScript
  console.log('📦 Compilando TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });

  // Executa o cenário específico offline (que já funciona)
  console.log(`\n🔍 Executando cenário ${situacao}.${cenario} offline...`);
  const command = `node -e "require('./dist/tests/index.js').runDRGSpecificScenarioOffline(${situacao}, ${cenario})"`;
  execSync(command, { stdio: 'inherit' });

  console.log('\n✅ Cenário executado com sucesso!');
  console.log(`🎯 Cenário ${situacaoNames[situacao]} - ${cenarioNames[cenario]} testado com dados do Estabelecimento 8 (Modo Offline).`);

} catch (error) {
  console.error('\n❌ Erro durante a execução:', error.message);
  process.exit(1);
}

