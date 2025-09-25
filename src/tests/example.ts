import { DRGTestSuite } from "./index";
import { getConfigForSituacao, getConfigForScenario } from "./config";

/**
 * Exemplo de uso do DRG Test Suite
 * Este arquivo demonstra como usar o sistema de testes em diferentes cenários
 */

// Exemplo 1: Execução básica de todos os testes
export async function exemploBasico() {
  console.log("🧪 Exemplo 1: Execução básica de todos os testes");

  const testSuite = new DRGTestSuite();
  await testSuite.initialize();

  // Executa todos os testes
  await testSuite.runAllTests();

  // Gera e exibe relatório
  await testSuite.generateAndDisplayReport();

  console.log("✅ Exemplo 1 concluído!");
}

// Exemplo 2: Execução apenas de validações
export async function exemploValidacao() {
  console.log("🔍 Exemplo 2: Execução apenas de validações");

  const testSuite = new DRGTestSuite();
  await testSuite.initialize();

  // Executa apenas validações
  await testSuite.runValidationOnly();

  console.log("✅ Exemplo 2 concluído!");
}

// Exemplo 3: Execução com envio para DRG
export async function exemploComEnvio() {
  console.log("📤 Exemplo 3: Execução com envio para DRG");

  const testSuite = new DRGTestSuite();
  await testSuite.initialize();

  // Executa testes com envio real para DRG
  await testSuite.runTestsWithDRGSend();

  // Gera relatório
  await testSuite.generateAndDisplayReport();

  console.log("✅ Exemplo 3 concluído!");
}

// Exemplo 4: Execução para situação específica
export async function exemploSituacaoEspecifica() {
  console.log("🏥 Exemplo 4: Execução para situação específica");

  const testSuite = new DRGTestSuite();
  await testSuite.initialize();

  // Executa apenas testes de Admissional (situação 1)
  await testSuite.runTestsForSituacao(1);

  // Gera relatório
  await testSuite.generateAndDisplayReport();

  console.log("✅ Exemplo 4 concluído!");
}

// Exemplo 5: Execução de cenário específico
export async function exemploCenarioEspecifico() {
  console.log("📋 Exemplo 5: Execução de cenário específico");

  const testSuite = new DRGTestSuite();
  await testSuite.initialize();

  // Executa apenas o cenário "Admissional Básica" (situação 1, cenário 1)
  await testSuite.runSpecificScenario(1, 1);

  // Gera relatório
  await testSuite.generateAndDisplayReport();

  console.log("✅ Exemplo 5 concluído!");
}

// Exemplo 6: Execução com configuração personalizada
export async function exemploConfiguracaoPersonalizada() {
  console.log("⚙️ Exemplo 6: Execução com configuração personalizada");

  const testSuite = new DRGTestSuite();
  await testSuite.initialize();

  // Obtém configuração para situação específica
  const config = getConfigForSituacao(1);
  console.log("Configuração para Admissional:", config);

  // Obtém configuração para cenário específico
  const scenarioConfig = getConfigForScenario(1, 1);
  console.log("Configuração para Admissional Básica:", scenarioConfig);

  // Executa testes com configuração personalizada
  await testSuite.runTestsForSituacao(1);

  console.log("✅ Exemplo 6 concluído!");
}

// Exemplo 7: Execução e análise de resultados
export async function exemploAnaliseResultados() {
  console.log("📊 Exemplo 7: Execução e análise de resultados");

  const testSuite = new DRGTestSuite();
  await testSuite.initialize();

  // Executa todos os testes
  await testSuite.runAllTests();

  // Obtém estatísticas detalhadas
  const reporter = testSuite.getReporter();
  const stats = reporter.getDetailedStats();

  console.log("📈 Estatísticas detalhadas:");
  console.log(`  Total de testes: ${(stats as any).total}`);
  console.log(`  Sucessos: ${(stats as any).successful}`);
  console.log(`  Falhas: ${(stats as any).failed}`);
  console.log(`  Taxa de sucesso: ${(stats as any).successRate.toFixed(2)}%`);
  console.log(`  Tempo médio: ${(stats as any).avgExecutionTime.toFixed(2)}ms`);

  // Estatísticas por situação
  console.log("\n📋 Por situação:");
  Object.entries((stats as any).bySituacao).forEach(
    ([situacao, data]: [string, any]) => {
      console.log(
        `  Situação ${situacao}: ${data.total} testes, ${data.successRate.toFixed(2)}% sucesso`
      );
    }
  );

  // Gera relatório
  await testSuite.generateAndDisplayReport();

  console.log("✅ Exemplo 7 concluído!");
}

// Exemplo 8: Execução e limpeza
export async function exemploExecucaoELimpeza() {
  console.log("🧹 Exemplo 8: Execução e limpeza");

  const testSuite = new DRGTestSuite();
  await testSuite.initialize();

  // Executa testes
  await testSuite.runAllTests();

  // Gera relatório
  await testSuite.generateAndDisplayReport();

  // Limpa dados de teste antigos
  await testSuite.cleanupTestData();

  console.log("✅ Exemplo 8 concluído!");
}

// Exemplo 9: Listagem de cenários
export async function exemploListagemCenarios() {
  console.log("📋 Exemplo 9: Listagem de cenários");

  const testSuite = new DRGTestSuite();
  await testSuite.initialize();

  // Lista todos os cenários disponíveis
  testSuite.listAllScenarios();

  console.log("✅ Exemplo 9 concluído!");
}

// Exemplo 10: Execução completa com tratamento de erros
export async function exemploExecucaoCompleta() {
  console.log("🚀 Exemplo 10: Execução completa com tratamento de erros");

  try {
    const testSuite = new DRGTestSuite();
    await testSuite.initialize();

    // Executa todos os testes
    await testSuite.runAllTests();

    // Gera relatório
    await testSuite.generateAndDisplayReport();

    // Limpa dados antigos
    await testSuite.cleanupTestData();

    console.log("✅ Exemplo 10 concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante execução:", error);

    // Tenta limpar dados mesmo em caso de erro
    try {
      const testSuite = new DRGTestSuite();
      await testSuite.initialize();
      await testSuite.cleanupTestData();
      console.log("🧹 Limpeza de dados concluída após erro");
    } catch (cleanupError) {
      console.error("❌ Erro durante limpeza:", cleanupError);
    }
  }
}

// Função principal para executar todos os exemplos
export async function executarTodosExemplos() {
  console.log("🎯 Executando todos os exemplos do DRG Test Suite\n");

  const exemplos = [
    exemploBasico,
    exemploValidacao,
    exemploComEnvio,
    exemploSituacaoEspecifica,
    exemploCenarioEspecifico,
    exemploConfiguracaoPersonalizada,
    exemploAnaliseResultados,
    exemploExecucaoELimpeza,
    exemploListagemCenarios,
    exemploExecucaoCompleta,
  ];

  for (let i = 0; i < exemplos.length; i++) {
    try {
      console.log(`\n${"=".repeat(50)}`);
      console.log(`Executando exemplo ${i + 1}/${exemplos.length}`);
      console.log(`${"=".repeat(50)}\n`);

      await exemplos[i]();

      console.log(`\n✅ Exemplo ${i + 1} executado com sucesso!`);
    } catch (error) {
      console.error(`\n❌ Erro no exemplo ${i + 1}:`, error);
    }

    // Pausa entre exemplos
    if (i < exemplos.length - 1) {
      console.log("\n⏳ Aguardando 2 segundos antes do próximo exemplo...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  console.log("\n🎉 Todos os exemplos foram executados!");
}

// Execução direta se o arquivo for chamado diretamente
if (require.main === module) {
  executarTodosExemplos().catch(console.error);
}
