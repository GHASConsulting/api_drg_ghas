// Importações diretas para evitar dependência circular
import { TestDataGenerator } from "./testDataGenerator";
import { TestReporter } from "./testReporter";
import { AdmissionalTestScenarios } from "./scenarios/admissional.test";
import { ProrrogacaoTestScenarios } from "./scenarios/prorrogacao.test";
import { SuplementarTestScenarios } from "./scenarios/suplementar.test";
import { ModuleControlTestSuite } from "./moduleControl.test";
import { PartoAdequadoTestScenarios } from "./scenarios/partoAdequado.test";
import { ModelValidationTests } from "./modelValidation.test";
import { DataStructureValidationTests } from "./dataStructureValidation.test";

/**
 * Script para executar os testes DRG
 */
async function runTests() {
  console.log("🚀 Iniciando Testes DRG - Sistema Atualizado");
  console.log("=".repeat(60));

  try {
    // Inicializa componentes
    const dataGenerator = new TestDataGenerator();
    const reporter = new TestReporter();
    const modelValidationTests = new ModelValidationTests();
    const dataStructureValidationTests = new DataStructureValidationTests();

    // Carrega dados base
    await dataGenerator.loadBaseData();

    // Teste 1: Validação dos Modelos
    console.log("\n📋 TESTE 1: Validação dos Modelos DRG");
    console.log("-".repeat(40));
    const modelResults = await modelValidationTests.runAllValidationTests();
    reporter.addResults(modelResults.results);
    console.log(
      `✅ Modelos: ${modelResults.passed} passaram, ${modelResults.failed} falharam`
    );

    // Teste 2: Validação de Estrutura de Dados
    console.log("\n📋 TESTE 2: Validação de Estrutura de Dados");
    console.log("-".repeat(40));
    const structureResults =
      await dataStructureValidationTests.runAllStructureValidationTests();
    reporter.addResults(structureResults.results);
    console.log(
      `✅ Estrutura: ${structureResults.passed} passaram, ${structureResults.failed} falharam`
    );

    // Teste 3: Cenários Básicos
    console.log("\n📋 TESTE 3: Cenários Básicos");
    console.log("-".repeat(40));

    // Teste Admissional
    const admissionalScenarios = new AdmissionalTestScenarios();
    const admissionalResults = await admissionalScenarios.runAllScenarios();
    console.log(
      `✅ Admissional: ${admissionalResults.length} cenários executados`
    );

    // Teste Prorrogação
    const prorrogacaoScenarios = new ProrrogacaoTestScenarios();
    const prorrogacaoResults = await prorrogacaoScenarios.runAllScenarios();
    console.log(
      `✅ Prorrogação: ${prorrogacaoResults.length} cenários executados`
    );

    console.log("\n🎉 TODOS OS TESTES CONCLUÍDOS COM SUCESSO!");
    console.log("=".repeat(60));
    console.log("📊 Relatório final:");
    reporter.displayReport();
  } catch (error) {
    console.error("\n❌ ERRO DURANTE A EXECUÇÃO DOS TESTES:");
    console.error(error);
    process.exit(1);
  }
}

// Executa os testes se o script for chamado diretamente
if (require.main === module) {
  runTests()
    .then(() => {
      console.log("\n✅ Script de teste finalizado!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 Erro no script de teste:", error);
      process.exit(1);
    });
}

export { runTests };
