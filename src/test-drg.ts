#!/usr/bin/env npx ts-node

/**
 * Script para testar o sistema DRG atualizado
 * Execute com: npx ts-node src/test-drg.ts
 */

import {
  runDRGModelValidationTests,
  runDRGDataStructureValidationTests,
  runDRGTests,
} from "./tests/index";

async function testDRGSystem() {
  console.log("🧪 TESTANDO SISTEMA DRG ATUALIZADO");
  console.log("=".repeat(60));
  console.log("📅 Data:", new Date().toLocaleString());
  console.log("");

  const startTime = Date.now();

  try {
    // Teste 1: Validação dos Modelos
    console.log("🔍 TESTE 1: Validação dos Modelos DRG");
    console.log("-".repeat(40));
    const modelStart = Date.now();
    await runDRGModelValidationTests();
    const modelDuration = Date.now() - modelStart;
    console.log(`⏱️  Duração: ${modelDuration}ms`);
    console.log("");

    // Teste 2: Validação de Estrutura
    console.log("🔍 TESTE 2: Validação de Estrutura de Dados");
    console.log("-".repeat(40));
    const structureStart = Date.now();
    await runDRGDataStructureValidationTests();
    const structureDuration = Date.now() - structureStart;
    console.log(`⏱️  Duração: ${structureDuration}ms`);
    console.log("");

    // Teste 3: Testes Completos (opcional)
    console.log("🔍 TESTE 3: Testes Completos DRG");
    console.log("-".repeat(40));
    console.log("⚠️  Executando todos os testes (pode demorar)...");
    const fullStart = Date.now();
    await runDRGTests();
    const fullDuration = Date.now() - fullStart;
    console.log(`⏱️  Duração: ${fullDuration}ms`);
    console.log("");

    const totalDuration = Date.now() - startTime;

    console.log("🎉 TODOS OS TESTES CONCLUÍDOS COM SUCESSO!");
    console.log("=".repeat(60));
    console.log(`⏱️  Tempo total: ${totalDuration}ms`);
    console.log("✅ Sistema DRG está funcionando perfeitamente!");
    console.log("🎯 Testes alinhados com os modelos DRG!");
  } catch (error) {
    console.error("\n❌ ERRO DURANTE A EXECUÇÃO DOS TESTES:");
    console.error("Erro:", error.message);
    if (error.stack) {
      console.error("Stack:", error.stack);
    }
    process.exit(1);
  }
}

// Executa os testes
testDRGSystem();
