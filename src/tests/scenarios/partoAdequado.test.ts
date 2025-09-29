/**
 * Testes específicos para cenários de Parto Adequado
 * Valida funcionalidades relacionadas a parto e RN
 */

import { TestDataGenerator } from "../testDataGenerator";
import { TestRunner } from "../testRunner";
import { ModuleControl } from "../../utils/moduleControl";

export class PartoAdequadoTestScenarios {
  private dataGenerator: TestDataGenerator;
  private testRunner: TestRunner;

  constructor(dataGenerator: TestDataGenerator, testRunner: TestRunner) {
    this.dataGenerator = dataGenerator;
    this.testRunner = testRunner;
  }

  /**
   * Cenário 1: Parto Normal com RN
   */
  async testPartoNormalComRN(): Promise<boolean> {
    console.log("🧪 Cenário 1: Parto Normal com RN");

    let originalEnv: NodeJS.ProcessEnv;

    try {
      // Configurar ambiente para maternidade
      originalEnv = { ...process.env };
      Object.assign(process.env, {
        SEND_BASIC_MODULES: "S",
        SEND_OPTIONAL_MODULES: "N",
        SEND_SPECIAL_MODULES: "S",
        SEND_PARTO_ADEQUADO: "S",
        SEND_RN: "S",
        SEND_ALTA_ADMINISTRATIVA: "S",
        SEND_ANALISE_CRITICA: "S",
        SEND_CTI: "N",
        SEND_SUPORTE_VENTILATORIO: "N",
        SEND_CATETER_VASCULAR: "N",
        SEND_SONDA_VESICAL: "N",
        SEND_CONDICAO_ADQUIRIDA: "N",
        SEND_CAUSA_EXTERNA_PERMANENCIA: "N",
        SEND_MEDICO_PROCEDIMENTO: "N",
        SEND_DISPOSITIVO_TERAPEUTICO: "N",
        MODULE_MONITORING: "S",
        LOG_SENT_MODULES: "S",
      });

      // Verificar se módulos de parto estão ativos
      const partoAtivo = ModuleControl.shouldSendModule("PARTO_ADEQUADO");
      const rnAtivo = ModuleControl.shouldSendModule("RN");
      const ctiAtivo = ModuleControl.shouldSendModule("CTI");

      if (!partoAtivo || !rnAtivo || ctiAtivo) {
        throw new Error("Configuração de módulos para parto não está correta");
      }

      // Verificar lista de módulos ativos
      const activeModules = ModuleControl.getActiveModules();
      const expectedModules = [
        "PARTO_ADEQUADO",
        "RN",
        "ALTA_ADMINISTRATIVA",
        "ANALISE_CRITICA",
      ];

      for (const module of expectedModules) {
        if (!activeModules.includes(module)) {
          throw new Error(`Módulo ${module} deveria estar ativo para parto`);
        }
      }

      // Simular processamento
      ModuleControl.startModuleMonitoring("PARTO_ADEQUADO");
      await new Promise((resolve) => setTimeout(resolve, 50));
      ModuleControl.endModuleMonitoring("PARTO_ADEQUADO");

      ModuleControl.startModuleMonitoring("RN");
      await new Promise((resolve) => setTimeout(resolve, 30));
      ModuleControl.endModuleMonitoring("RN");

      // Verificar métricas
      const partoMetrics = ModuleControl.getModuleMetrics("PARTO_ADEQUADO");
      const rnMetrics = ModuleControl.getModuleMetrics("RN");

      if (!partoMetrics || partoMetrics.timesProcessed !== 1) {
        throw new Error("Métricas do Parto Adequado não estão corretas");
      }

      if (!rnMetrics || rnMetrics.timesProcessed !== 1) {
        throw new Error("Métricas do RN não estão corretas");
      }

      console.log("✅ Parto Normal com RN funcionando");
      return true;
    } catch (error) {
      console.error("❌ Erro no cenário de parto normal:", error);
      return false;
    } finally {
      // Restaurar ambiente original
      if (typeof originalEnv !== "undefined") {
        process.env = originalEnv;
      }
      ModuleControl.resetMetrics();
    }
  }

  /**
   * Cenário 2: Cesárea com RN
   */
  async testCesareaComRN(): Promise<boolean> {
    console.log("🧪 Cenário 2: Cesárea com RN");

    let originalEnv: NodeJS.ProcessEnv;

    try {
      // Configurar ambiente para cesárea
      originalEnv = { ...process.env };
      Object.assign(process.env, {
        SEND_BASIC_MODULES: "S",
        SEND_OPTIONAL_MODULES: "N",
        SEND_SPECIAL_MODULES: "S",
        SEND_PARTO_ADEQUADO: "S",
        SEND_RN: "S",
        SEND_ALTA_ADMINISTRATIVA: "S",
        SEND_ANALISE_CRITICA: "S",
        SEND_CTI: "N", // Cesárea não precisa de CTI
        SEND_SUPORTE_VENTILATORIO: "N",
        SEND_CATETER_VASCULAR: "N",
        SEND_SONDA_VESICAL: "N",
        SEND_CONDICAO_ADQUIRIDA: "N",
        SEND_CAUSA_EXTERNA_PERMANENCIA: "N",
        SEND_MEDICO_PROCEDIMENTO: "S", // Cesárea precisa de procedimento
        SEND_DISPOSITIVO_TERAPEUTICO: "N",
        MODULE_MONITORING: "S",
        LOG_SENT_MODULES: "S",
      });

      // Verificar módulos específicos para cesárea
      const partoAtivo = ModuleControl.shouldSendModule("PARTO_ADEQUADO");
      const rnAtivo = ModuleControl.shouldSendModule("RN");
      const procedimentoAtivo = ModuleControl.shouldSendModule(
        "MEDICO_PROCEDIMENTO"
      );
      const ctiAtivo = ModuleControl.shouldSendModule("CTI");

      if (!partoAtivo || !rnAtivo || !procedimentoAtivo || ctiAtivo) {
        throw new Error(
          "Configuração de módulos para cesárea não está correta"
        );
      }

      // Simular processamento de cesárea
      ModuleControl.startModuleMonitoring("PARTO_ADEQUADO");
      await new Promise((resolve) => setTimeout(resolve, 60));
      ModuleControl.endModuleMonitoring("PARTO_ADEQUADO");

      ModuleControl.startModuleMonitoring("RN");
      await new Promise((resolve) => setTimeout(resolve, 40));
      ModuleControl.endModuleMonitoring("RN");

      ModuleControl.startModuleMonitoring("MEDICO_PROCEDIMENTO");
      await new Promise((resolve) => setTimeout(resolve, 80));
      ModuleControl.endModuleMonitoring("MEDICO_PROCEDIMENTO");

      // Verificar métricas
      const partoMetrics = ModuleControl.getModuleMetrics("PARTO_ADEQUADO");
      const rnMetrics = ModuleControl.getModuleMetrics("RN");
      const procedimentoMetrics = ModuleControl.getModuleMetrics(
        "MEDICO_PROCEDIMENTO"
      );

      if (!partoMetrics || partoMetrics.timesProcessed !== 1) {
        throw new Error(
          "Métricas do Parto Adequado para cesárea não estão corretas"
        );
      }

      if (!rnMetrics || rnMetrics.timesProcessed !== 1) {
        throw new Error("Métricas do RN para cesárea não estão corretas");
      }

      if (!procedimentoMetrics || procedimentoMetrics.timesProcessed !== 1) {
        throw new Error(
          "Métricas do Procedimento para cesárea não estão corretas"
        );
      }

      console.log("✅ Cesárea com RN funcionando");
      return true;
    } catch (error) {
      console.error("❌ Erro no cenário de cesárea:", error);
      return false;
    } finally {
      // Restaurar ambiente original
      if (typeof originalEnv !== "undefined") {
        process.env = originalEnv;
      }
      ModuleControl.resetMetrics();
    }
  }

  /**
   * Cenário 3: Parto com complicações (CTI)
   */
  async testPartoComComplicacoes(): Promise<boolean> {
    console.log("🧪 Cenário 3: Parto com Complicações (CTI)");

    let originalEnv: NodeJS.ProcessEnv;

    try {
      // Configurar ambiente para parto com complicações
      originalEnv = { ...process.env };
      Object.assign(process.env, {
        SEND_BASIC_MODULES: "S",
        SEND_OPTIONAL_MODULES: "S",
        SEND_SPECIAL_MODULES: "S",
        SEND_PARTO_ADEQUADO: "S",
        SEND_RN: "S",
        SEND_ALTA_ADMINISTRATIVA: "S",
        SEND_ANALISE_CRITICA: "S",
        SEND_CTI: "S", // Complicações precisam de CTI
        SEND_SUPORTE_VENTILATORIO: "S",
        SEND_CATETER_VASCULAR: "S",
        SEND_SONDA_VESICAL: "S",
        SEND_CONDICAO_ADQUIRIDA: "S",
        SEND_CAUSA_EXTERNA_PERMANENCIA: "S",
        SEND_MEDICO_PROCEDIMENTO: "S",
        SEND_DISPOSITIVO_TERAPEUTICO: "S",
        MODULE_MONITORING: "S",
        LOG_SENT_MODULES: "S",
      });

      // Verificar se todos os módulos estão ativos
      const modules = [
        "PARTO_ADEQUADO",
        "RN",
        "CTI",
        "SUPORTE_VENTILATORIO",
        "CATETER_VASCULAR",
        "SONDA_VESICAL",
        "CONDICAO_ADQUIRIDA",
        "ALTA_ADMINISTRATIVA",
        "ANALISE_CRITICA",
        "CAUSA_EXTERNA_PERMANENCIA",
        "MEDICO_PROCEDIMENTO",
        "DISPOSITIVO_TERAPEUTICO",
      ];

      for (const module of modules) {
        if (!ModuleControl.shouldSendModule(module)) {
          throw new Error(
            `Módulo ${module} deveria estar ativo para parto com complicações`
          );
        }
      }

      // Simular processamento completo
      for (const module of modules) {
        ModuleControl.startModuleMonitoring(module);
        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 50 + 20)
        );
        ModuleControl.endModuleMonitoring(module);
      }

      // Verificar métricas do sistema
      const systemMetrics = ModuleControl.getSystemMetrics();
      if (systemMetrics.totalModules !== modules.length) {
        throw new Error("Nem todos os módulos foram processados");
      }

      // Verificar eficiência
      if (systemMetrics.processingEfficiency < 0) {
        throw new Error(
          "Eficiência de processamento não está sendo calculada corretamente"
        );
      }

      console.log("✅ Parto com complicações funcionando");
      return true;
    } catch (error) {
      console.error("❌ Erro no cenário de parto com complicações:", error);
      return false;
    } finally {
      // Restaurar ambiente original
      if (typeof originalEnv !== "undefined") {
        process.env = originalEnv;
      }
      ModuleControl.resetMetrics();
    }
  }

  /**
   * Cenário 4: Otimização para Maternidade
   */
  async testOtimizacaoMaternidade(): Promise<boolean> {
    console.log("🧪 Cenário 4: Otimização para Maternidade");

    let originalEnv: NodeJS.ProcessEnv;

    try {
      // Configurar ambiente otimizado para maternidade
      originalEnv = { ...process.env };
      Object.assign(process.env, {
        SEND_BASIC_MODULES: "S",
        SEND_OPTIONAL_MODULES: "N",
        SEND_SPECIAL_MODULES: "S",
        SEND_PARTO_ADEQUADO: "S",
        SEND_RN: "S",
        SEND_ALTA_ADMINISTRATIVA: "S",
        SEND_ANALISE_CRITICA: "S",
        SEND_CTI: "N", // Maternidade normal não precisa
        SEND_SUPORTE_VENTILATORIO: "N",
        SEND_CATETER_VASCULAR: "N",
        SEND_SONDA_VESICAL: "N",
        SEND_CONDICAO_ADQUIRIDA: "N",
        SEND_CAUSA_EXTERNA_PERMANENCIA: "N",
        SEND_MEDICO_PROCEDIMENTO: "N",
        SEND_DISPOSITIVO_TERAPEUTICO: "N",
        MODULE_MONITORING: "S",
        LOG_SENT_MODULES: "S",
      });

      // Simular múltiplos partos
      for (let i = 0; i < 5; i++) {
        ModuleControl.startModuleMonitoring("PARTO_ADEQUADO");
        await new Promise((resolve) => setTimeout(resolve, 30));
        ModuleControl.endModuleMonitoring("PARTO_ADEQUADO");

        ModuleControl.startModuleMonitoring("RN");
        await new Promise((resolve) => setTimeout(resolve, 25));
        ModuleControl.endModuleMonitoring("RN");

        ModuleControl.startModuleMonitoring("ALTA_ADMINISTRATIVA");
        await new Promise((resolve) => setTimeout(resolve, 20));
        ModuleControl.endModuleMonitoring("ALTA_ADMINISTRATIVA");

        ModuleControl.startModuleMonitoring("ANALISE_CRITICA");
        await new Promise((resolve) => setTimeout(resolve, 15));
        ModuleControl.endModuleMonitoring("ANALISE_CRITICA");

        // Simular módulos que não são usados em maternidade normal
        ModuleControl.recordModuleSkipped("CTI");
        ModuleControl.recordModuleSkipped("SUPORTE_VENTILATORIO");
        ModuleControl.recordModuleSkipped("CATETER_VASCULAR");
        ModuleControl.recordModuleSkipped("SONDA_VESICAL");
      }

      // Verificar métricas
      const partoMetrics = ModuleControl.getModuleMetrics("PARTO_ADEQUADO");
      const rnMetrics = ModuleControl.getModuleMetrics("RN");
      const ctiMetrics = ModuleControl.getModuleMetrics("CTI");

      if (!partoMetrics || partoMetrics.timesProcessed !== 5) {
        throw new Error("Métricas do Parto Adequado não estão corretas");
      }

      if (!rnMetrics || rnMetrics.timesProcessed !== 5) {
        throw new Error("Métricas do RN não estão corretas");
      }

      if (!ctiMetrics || ctiMetrics.timesSkipped !== 5) {
        throw new Error("Métricas do CTI (pulado) não estão corretas");
      }

      // Verificar eficiência
      const systemMetrics = ModuleControl.getSystemMetrics();
      if (systemMetrics.processingEfficiency < 50) {
        throw new Error(
          "Eficiência deveria ser alta para maternidade otimizada"
        );
      }

      console.log("✅ Otimização para Maternidade funcionando");
      return true;
    } catch (error) {
      console.error("❌ Erro na otimização de maternidade:", error);
      return false;
    } finally {
      // Restaurar ambiente original
      if (typeof originalEnv !== "undefined") {
        process.env = originalEnv;
      }
      ModuleControl.resetMetrics();
    }
  }

  /**
   * Executa todos os cenários de parto adequado
   */
  async runAllScenarios(): Promise<{
    passed: number;
    failed: number;
    results: any[];
  }> {
    console.log("🚀 Iniciando Cenários de Parto Adequado");
    console.log("=".repeat(50));

    const scenarios = [
      { name: "Parto Normal com RN", test: () => this.testPartoNormalComRN() },
      { name: "Cesárea com RN", test: () => this.testCesareaComRN() },
      {
        name: "Parto com Complicações",
        test: () => this.testPartoComComplicacoes(),
      },
      {
        name: "Otimização para Maternidade",
        test: () => this.testOtimizacaoMaternidade(),
      },
    ];

    const results: any[] = [];
    let passed = 0;
    let failed = 0;

    for (const scenario of scenarios) {
      try {
        const startTime = Date.now();
        const result = await scenario.test();
        const duration = Date.now() - startTime;

        if (result) {
          passed++;
          console.log(`✅ ${scenario.name}: PASSOU (${duration}ms)`);
        } else {
          failed++;
          console.log(`❌ ${scenario.name}: FALHOU (${duration}ms)`);
        }

        results.push({
          name: scenario.name,
          passed: result,
          duration,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        failed++;
        console.log(`❌ ${scenario.name}: ERRO - ${error}`);
        results.push({
          name: scenario.name,
          passed: false,
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        });
      }
    }

    console.log("=".repeat(50));
    console.log(`📊 RESUMO: ${passed} passaram, ${failed} falharam`);
    console.log(
      `🎯 Taxa de sucesso: ${Math.round((passed / scenarios.length) * 100)}%`
    );

    return { passed, failed, results };
  }
}
