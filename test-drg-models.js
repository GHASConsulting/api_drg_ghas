#!/usr/bin/env node

/**
 * Script simples para testar os modelos DRG
 * Execute com: node test-drg-models.js
 */

const { runDRGModelValidationTests, runDRGDataStructureValidationTests } = require('./dist/tests/index');

async function testDRGModels() {
  console.log('🧪 Testando Modelos DRG - Validação Rápida');
  console.log('='.repeat(50));

  try {
    console.log('\n📋 Teste 1: Validação dos Modelos...');
    await runDRGModelValidationTests();

    console.log('\n📋 Teste 2: Validação de Estrutura...');
    await runDRGDataStructureValidationTests();

    console.log('\n✅ Testes concluídos com sucesso!');
    console.log('🎯 Os modelos DRG estão funcionando corretamente!');

  } catch (error) {
    console.error('\n❌ Erro durante os testes:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Executa os testes
testDRGModels();
