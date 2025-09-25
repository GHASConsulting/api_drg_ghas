#!/usr/bin/env node

/**
 * Script para executar testes DRG com dados reais do Hospital INOVEMED
 * Execute com: node run-drg-tests.js [opção]
 * 
 * Opções:
 * - all: Executa todos os testes
 * - validate: Executa apenas validações
 * - send: Executa testes com envio para DRG
 * - offline: Executa testes offline (sem dependência do banco)
 * - admissional: Executa apenas testes de admissional
 * - prorrogacao: Executa apenas testes de prorrogação
 * - suplementar: Executa apenas testes de suplementar
 */

const { execSync } = require('child_process');
const path = require('path');

const option = process.argv[2] || 'validate';

console.log('🏥 Executando testes DRG com dados do Hospital INOVEMED...\n');

try {
  // Compila o TypeScript
  console.log('📦 Compilando TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });

  console.log(`\n🔍 Executando testes: ${option.toUpperCase()}`);

  let command;
  switch (option.toLowerCase()) {
    case 'all':
      command = 'node -e "require(\'./dist/tests/index.js\').runDRGTests()"';
      break;
    case 'validate':
      command = 'node -e "require(\'./dist/tests/index.js\').validateDRGData()"';
      break;
    case 'send':
      command = 'node -e "require(\'./dist/tests/index.js\').runDRGTestsWithSend()"';
      break;
    case 'admissional':
      command = 'node -e "require(\'./dist/tests/index.js\').runDRGTestsForSituacao(1)"';
      break;
    case 'prorrogacao':
      command = 'node -e "require(\'./dist/tests/index.js\').runDRGTestsForSituacao(2)"';
      break;
    case 'suplementar':
      command = 'node -e "require(\'./dist/tests/index.js\').runDRGTestsForSituacao(3)"';
      break;
    case 'offline':
      command = 'node -e "require(\'./dist/tests/index.js\').runDRGOfflineTests()"';
      break;
    default:
      console.log('❌ Opção inválida. Use: all, validate, send, offline, admissional, prorrogacao, ou suplementar');
      process.exit(1);
  }

  execSync(command, { stdio: 'inherit' });

  console.log('\n✅ Testes concluídos com sucesso!');
  console.log('🎯 Os testes foram executados com dados reais do Hospital INOVEMED.');

} catch (error) {
  console.error('\n❌ Erro durante os testes:', error.message);
  process.exit(1);
}
