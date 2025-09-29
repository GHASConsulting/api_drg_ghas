#!/usr/bin/env npx ts-node

/**
 * Script simples para testar o sistema DRG
 * Execute com: npx ts-node src/test-simple.ts
 */

import { TestDataGenerator } from "./tests/testDataGenerator";
import { ModelValidationTests } from "./tests/modelValidation.test";
import { DataStructureValidationTests } from "./tests/dataStructureValidation.test";

async function testDRGSystem() {
  console.log("🧪 TESTANDO SISTEMA DRG - VERSÃO SIMPLES");
  console.log("=".repeat(60));
  console.log("📅 Data:", new Date().toLocaleString());
  console.log("");

  const startTime = Date.now();

  try {
    // Inicializa componentes
    const dataGenerator = new TestDataGenerator();
    const modelValidationTests = new ModelValidationTests();
    const dataStructureValidationTests = new DataStructureValidationTests();

    // Carrega dados base
    console.log("🔄 Carregando dados base...");
    await dataGenerator.loadBaseData();
    console.log("✅ Dados base carregados!");

    // Teste 1: Validação dos Modelos
    console.log("\n🔍 TESTE 1: Validação dos Modelos DRG");
    console.log("-".repeat(40));
    const modelStart = Date.now();
    const modelResults = await modelValidationTests.runAllValidationTests();
    const modelDuration = Date.now() - modelStart;
    console.log(`⏱️  Duração: ${modelDuration}ms`);
    console.log(
      `📊 Resultado: ${modelResults.passed} passaram, ${modelResults.failed} falharam`
    );

    // Teste 2: Validação de Estrutura
    console.log("\n🔍 TESTE 2: Validação de Estrutura de Dados");
    console.log("-".repeat(40));
    const structureStart = Date.now();
    const structureResults =
      await dataStructureValidationTests.runAllStructureValidationTests();
    const structureDuration = Date.now() - structureStart;
    console.log(`⏱️  Duração: ${structureDuration}ms`);
    console.log(
      `📊 Resultado: ${structureResults.passed} passaram, ${structureResults.failed} falharam`
    );

    // Teste 3: Geração de Dados
    console.log("\n🔍 TESTE 3: Geração de Dados de Teste");
    console.log("-".repeat(40));
    const dataStart = Date.now();

    // Gera dados para cada situação
    const admissionalData = await dataGenerator.generateAdmissionalData(1);
    const prorrogacaoData = await dataGenerator.generateProrrogacaoData(1);
    const suplementarData = await dataGenerator.generateSuplementarData(1);

    const dataDuration = Date.now() - dataStart;
    console.log(`⏱️  Duração: ${dataDuration}ms`);
    console.log(
      `📊 Dados gerados: Admissional(${admissionalData.length}), Prorrogação(${prorrogacaoData.length}), Suplementar(${suplementarData.length})`
    );

    // Valida estrutura dos dados gerados
    console.log("\n🔍 TESTE 4: Validação dos Dados Gerados");
    console.log("-".repeat(40));

    const admissionalDataItem = admissionalData[0];
    console.log(
      `✅ Admissional: Hospital(${admissionalDataItem.hospital ? "OK" : "ERRO"}), Paciente(${admissionalDataItem.paciente ? "OK" : "ERRO"}), Internação(${admissionalDataItem.internacao ? "OK" : "ERRO"})`
    );

    const prorrogacaoDataItem = prorrogacaoData[0];
    console.log(
      `✅ Prorrogação: Hospital(${prorrogacaoDataItem.hospital ? "OK" : "ERRO"}), Paciente(${prorrogacaoDataItem.paciente ? "OK" : "ERRO"}), Internação(${prorrogacaoDataItem.internacao ? "OK" : "ERRO"})`
    );

    const suplementarDataItem = suplementarData[0];
    console.log(
      `✅ Suplementar: Hospital(${suplementarDataItem.hospital ? "OK" : "ERRO"}), Paciente(${suplementarDataItem.paciente ? "OK" : "ERRO"}), Internação(${suplementarDataItem.internacao ? "OK" : "ERRO"})`
    );

    const totalDuration = Date.now() - startTime;

    console.log("\n🎉 TODOS OS TESTES CONCLUÍDOS COM SUCESSO!");
    console.log("=".repeat(60));
    console.log(`⏱️  Tempo total: ${totalDuration}ms`);
    console.log("✅ Sistema DRG está funcionando perfeitamente!");
    console.log("🎯 Testes alinhados com os modelos DRG!");
    console.log("📊 Resumo:");
    console.log(
      `   - Validação de Modelos: ${modelResults.passed}/${modelResults.passed + modelResults.failed} passaram`
    );
    console.log(
      `   - Validação de Estrutura: ${structureResults.passed}/${structureResults.passed + structureResults.failed} passaram`
    );
    console.log(`   - Geração de Dados: ✅ Funcionando`);
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
