/**
 * Testes para o Sistema de Controle de Módulos DRG
 * Valida funcionalidades de controle, monitoramento e otimização
 */

import { ModuleControl } from "../utils/moduleControl";
import { ModuleOptimizer } from "../utils/moduleOptimizer";

export class ModuleControlTestSuite {
  private originalEnv: NodeJS.ProcessEnv;

  constructor() {
    this.originalEnv = { ...process.env };
  }

  /**
   * Configura ambiente de teste
   */
  private setupTestEnvironment(config: Record<string, string>): void {
    Object.assign(process.env, config);
  }

  /**
   * Restaura ambiente original
   */
  private restoreEnvironment(): void {
    process.env = this.originalEnv;
  }

  /**
   * Teste 1: Controle básico de módulos
   */
  async testBasicModuleControl(): Promise<boolean> {
    console.log("🧪 Teste 1: Controle Básico de Módulos");

    try {
      // Configurar ambiente básico
      this.setupTestEnvironment({
        SEND_BASIC_MODULES: "S",
        SEND_OPTIONAL_MODULES: "N",
        SEND_SPECIAL_MODULES: "N",
        SEND_CTI: "N",
        SEND_SUPORTE_VENTILATORIO: "N",
        SEND_CATETER_VASCULAR: "N",
        SEND_SONDA_VESICAL: "N",
        SEND_CONDICAO_ADQUIRIDA: "N",
        SEND_PARTO_ADEQUADO: "N",
        SEND_RN: "N",
        SEND_ALTA_ADMINISTRATIVA: "N",
        SEND_ANALISE_CRITICA: "N",
        SEND_CAUSA_EXTERNA_PERMANENCIA: "N",
        SEND_MEDICO_PROCEDIMENTO: "N",
        SEND_DISPOSITIVO_TERAPEUTICO: "N",
        MODULE_MONITORING: "S",
        LOG_SENT_MODULES: "S",
        VALIDATE_REQUIRED_MODULES: "S",
      });

      // Testar categorias
      const basicActive = ModuleControl.shouldSendBasicModules();
      const optionalActive = ModuleControl.shouldSendOptionalModules();
      const specialActive = ModuleControl.shouldSendSpecialModules();

      if (!basicActive || optionalActive || specialActive) {
        throw new Error("Categorias básicas não funcionando corretamente");
      }

      // Testar módulos individuais
      const ctiActive = ModuleControl.shouldSendModule("CTI");
      const rnActive = ModuleControl.shouldSendModule("RN");

      if (ctiActive || rnActive) {
        throw new Error("Módulos individuais não respeitando configuração");
      }

      // Testar lista de módulos ativos
      const activeModules = ModuleControl.getActiveModules();
      if (activeModules.length > 0) {
        throw new Error("Lista de módulos ativos deveria estar vazia");
      }

      console.log("✅ Controle básico funcionando");
      return true;
    } catch (error) {
      console.error("❌ Erro no controle básico:", error);
      return false;
    } finally {
      this.restoreEnvironment();
    }
  }

  /**
   * Teste 2: Controle granular de módulos
   */
  async testGranularModuleControl(): Promise<boolean> {
    console.log("🧪 Teste 2: Controle Granular de Módulos");

    try {
      // Configurar ambiente granular
      this.setupTestEnvironment({
        SEND_BASIC_MODULES: "S",
        SEND_OPTIONAL_MODULES: "N",
        SEND_SPECIAL_MODULES: "N",
        SEND_CTI: "S",
        SEND_SUPORTE_VENTILATORIO: "S",
        SEND_CATETER_VASCULAR: "N",
        SEND_SONDA_VESICAL: "N",
        SEND_CONDICAO_ADQUIRIDA: "N",
        SEND_PARTO_ADEQUADO: "S",
        SEND_RN: "S",
        SEND_ALTA_ADMINISTRATIVA: "S",
        SEND_ANALISE_CRITICA: "N",
        SEND_CAUSA_EXTERNA_PERMANENCIA: "N",
        SEND_MEDICO_PROCEDIMENTO: "N",
        SEND_DISPOSITIVO_TERAPEUTICO: "N",
        MODULE_MONITORING: "S",
        LOG_SENT_MODULES: "S",
        VALIDATE_REQUIRED_MODULES: "S",
      });

      // Testar módulos específicos
      const ctiActive = ModuleControl.shouldSendModule("CTI");
      const suporteActive = ModuleControl.shouldSendModule(
        "SUPORTE_VENTILATORIO"
      );
      const cateterActive = ModuleControl.shouldSendModule("CATETER_VASCULAR");
      const partoActive = ModuleControl.shouldSendModule("PARTO_ADEQUADO");
      const rnActive = ModuleControl.shouldSendModule("RN");

      if (
        !ctiActive ||
        !suporteActive ||
        cateterActive ||
        !partoActive ||
        !rnActive
      ) {
        throw new Error("Controle granular não funcionando corretamente");
      }

      // Testar lista de módulos ativos
      const activeModules = ModuleControl.getActiveModules();
      const expectedModules = [
        "CTI",
        "SUPORTE_VENTILATORIO",
        "PARTO_ADEQUADO",
        "RN",
        "ALTA_ADMINISTRATIVA",
      ];

      if (activeModules.length !== expectedModules.length) {
        throw new Error(
          `Esperado ${expectedModules.length} módulos, encontrado ${activeModules.length}`
        );
      }

      for (const module of expectedModules) {
        if (!activeModules.includes(module)) {
          throw new Error(`Módulo ${module} deveria estar ativo`);
        }
      }

      console.log("✅ Controle granular funcionando");
      return true;
    } catch (error) {
      console.error("❌ Erro no controle granular:", error);
      return false;
    } finally {
      this.restoreEnvironment();
    }
  }

  /**
   * Teste 3: Validação de módulos obrigatórios
   */
  async testRequiredModulesValidation(): Promise<boolean> {
    console.log("🧪 Teste 3: Validação de Módulos Obrigatórios");

    try {
      // Teste com módulos obrigatórios presentes
      this.setupTestEnvironment({
        VALIDATE_REQUIRED_MODULES: "S",
        SEND_ATENDIMENTO: "S",
        SEND_HOSPITAL: "S",
        SEND_PACIENTE: "S",
        SEND_MEDICO: "S",
        SEND_OPERADORA: "S",
      });

      const validationPassed = ModuleControl.validateRequiredModules();
      if (!validationPassed) {
        throw new Error("Validação deveria passar com módulos obrigatórios");
      }

      // Teste com módulos obrigatórios faltando
      this.setupTestEnvironment({
        VALIDATE_REQUIRED_MODULES: "S",
        SEND_ATENDIMENTO: "S",
        SEND_HOSPITAL: "S",
        SEND_PACIENTE: "N", // Faltando
        SEND_MEDICO: "S",
        SEND_OPERADORA: "S",
      });

      const validationFailed = ModuleControl.validateRequiredModules();
      if (validationFailed) {
        throw new Error(
          "Validação deveria falhar com módulos obrigatórios faltando"
        );
      }

      console.log("✅ Validação de módulos obrigatórios funcionando");
      return true;
    } catch (error) {
      console.error("❌ Erro na validação:", error);
      return false;
    } finally {
      this.restoreEnvironment();
    }
  }

  /**
   * Teste 4: Monitoramento de módulos
   */
  async testModuleMonitoring(): Promise<boolean> {
    console.log("🧪 Teste 4: Monitoramento de Módulos");

    try {
      // Configurar ambiente com monitoramento
      this.setupTestEnvironment({
        MODULE_MONITORING: "S",
        SEND_CTI: "S",
        SEND_SUPORTE_VENTILATORIO: "S",
        SEND_CATETER_VASCULAR: "N",
        SEND_SONDA_VESICAL: "N",
      });

      // Simular processamento de módulos
      ModuleControl.startModuleMonitoring("CTI");
      await new Promise((resolve) => setTimeout(resolve, 50)); // Simular processamento
      ModuleControl.endModuleMonitoring("CTI");

      ModuleControl.startModuleMonitoring("SUPORTE_VENTILATORIO");
      await new Promise((resolve) => setTimeout(resolve, 30));
      ModuleControl.endModuleMonitoring("SUPORTE_VENTILATORIO");

      // Simular módulos pulados
      ModuleControl.recordModuleSkipped("CATETER_VASCULAR");
      ModuleControl.recordModuleSkipped("SONDA_VESICAL");

      // Verificar métricas
      const ctiMetrics = ModuleControl.getModuleMetrics("CTI");
      const cateterMetrics = ModuleControl.getModuleMetrics("CATETER_VASCULAR");

      if (!ctiMetrics || ctiMetrics.timesProcessed !== 1) {
        throw new Error("Métricas do CTI não estão corretas");
      }

      if (!cateterMetrics || cateterMetrics.timesSkipped !== 1) {
        throw new Error("Métricas do Cateter não estão corretas");
      }

      // Verificar métricas do sistema
      const systemMetrics = ModuleControl.getSystemMetrics();
      if (systemMetrics.totalModules < 2) {
        throw new Error("Métricas do sistema não estão sendo coletadas");
      }

      console.log("✅ Monitoramento funcionando");
      return true;
    } catch (error) {
      console.error("❌ Erro no monitoramento:", error);
      return false;
    } finally {
      this.restoreEnvironment();
      ModuleControl.resetMetrics();
    }
  }

  /**
   * Teste 5: Análise de otimização
   */
  async testOptimizationAnalysis(): Promise<boolean> {
    console.log("🧪 Teste 5: Análise de Otimização");

    try {
      // Configurar ambiente com dados de teste
      this.setupTestEnvironment({
        MODULE_MONITORING: "S",
        SEND_CTI: "S",
        SEND_SUPORTE_VENTILATORIO: "S",
        SEND_CATETER_VASCULAR: "N",
        SEND_SONDA_VESICAL: "N",
      });

      // Simular uso para gerar métricas
      for (let i = 0; i < 10; i++) {
        ModuleControl.startModuleMonitoring("CTI");
        await new Promise((resolve) => setTimeout(resolve, 10));
        ModuleControl.endModuleMonitoring("CTI");

        ModuleControl.startModuleMonitoring("SUPORTE_VENTILATORIO");
        await new Promise((resolve) => setTimeout(resolve, 10));
        ModuleControl.endModuleMonitoring("SUPORTE_VENTILATORIO");

        ModuleControl.recordModuleSkipped("CATETER_VASCULAR");
        ModuleControl.recordModuleSkipped("SONDA_VESICAL");
      }

      // Gerar análise de otimização
      const optimizationReport = ModuleOptimizer.analyzeAndOptimize();

      if (optimizationReport.totalSuggestions === 0) {
        throw new Error("Análise de otimização deveria gerar sugestões");
      }

      // Verificar se há sugestões para módulos nunca usados
      const neverUsedSuggestions = optimizationReport.suggestions.filter(
        (s) => s.type === "always_inactive"
      );

      if (neverUsedSuggestions.length === 0) {
        throw new Error("Deveria haver sugestões para módulos nunca usados");
      }

      // Gerar relatório de otimização
      const report = ModuleOptimizer.generateOptimizationReport();
      if (!report.includes("RELATÓRIO DE OTIMIZAÇÃO")) {
        throw new Error(
          "Relatório de otimização não está sendo gerado corretamente"
        );
      }

      console.log("✅ Análise de otimização funcionando");
      return true;
    } catch (error) {
      console.error("❌ Erro na análise de otimização:", error);
      return false;
    } finally {
      this.restoreEnvironment();
      ModuleControl.resetMetrics();
    }
  }

  /**
   * Teste 6: Simulação de configuração
   */
  async testConfigurationSimulation(): Promise<boolean> {
    console.log("🧪 Teste 6: Simulação de Configuração");

    try {
      // Simular configuração de UTI
      const utiConfig = {
        SEND_BASIC_MODULES: "S",
        SEND_OPTIONAL_MODULES: "S",
        SEND_SPECIAL_MODULES: "N",
        SEND_CTI: "S",
        SEND_SUPORTE_VENTILATORIO: "S",
        SEND_CATETER_VASCULAR: "S",
        SEND_SONDA_VESICAL: "S",
        SEND_CONDICAO_ADQUIRIDA: "S",
        SEND_PARTO_ADEQUADO: "N",
        SEND_RN: "N",
        SEND_ALTA_ADMINISTRATIVA: "S",
        SEND_ANALISE_CRITICA: "S",
        SEND_CAUSA_EXTERNA_PERMANENCIA: "S",
        SEND_MEDICO_PROCEDIMENTO: "S",
        SEND_DISPOSITIVO_TERAPEUTICO: "S",
      };

      const impact = ModuleOptimizer.simulateConfigurationImpact(utiConfig);

      if (impact.activeModules.length < 5) {
        throw new Error("Configuração de UTI deveria ativar mais módulos");
      }

      if (impact.efficiency < 50) {
        throw new Error("Eficiência deveria ser calculada corretamente");
      }

      // Simular configuração de Maternidade
      const maternidadeConfig = {
        SEND_BASIC_MODULES: "S",
        SEND_OPTIONAL_MODULES: "N",
        SEND_SPECIAL_MODULES: "S",
        SEND_CTI: "N",
        SEND_SUPORTE_VENTILATORIO: "N",
        SEND_CATETER_VASCULAR: "N",
        SEND_SONDA_VESICAL: "N",
        SEND_CONDICAO_ADQUIRIDA: "N",
        SEND_PARTO_ADEQUADO: "S",
        SEND_RN: "S",
        SEND_ALTA_ADMINISTRATIVA: "S",
        SEND_ANALISE_CRITICA: "S",
        SEND_CAUSA_EXTERNA_PERMANENCIA: "N",
        SEND_MEDICO_PROCEDIMENTO: "N",
        SEND_DISPOSITIVO_TERAPEUTICO: "N",
      };

      const maternidadeImpact =
        ModuleOptimizer.simulateConfigurationImpact(maternidadeConfig);

      if (!maternidadeImpact.activeModules.includes("PARTO_ADEQUADO")) {
        throw new Error("Maternidade deveria ativar PARTO_ADEQUADO");
      }

      if (!maternidadeImpact.activeModules.includes("RN")) {
        throw new Error("Maternidade deveria ativar RN");
      }

      console.log("✅ Simulação de configuração funcionando");
      return true;
    } catch (error) {
      console.error("❌ Erro na simulação:", error);
      return false;
    } finally {
      this.restoreEnvironment();
    }
  }

  /**
   * Teste 7: Exportação de métricas
   */
  async testMetricsExport(): Promise<boolean> {
    console.log("🧪 Teste 7: Exportação de Métricas");

    try {
      // Configurar ambiente e gerar dados
      this.setupTestEnvironment({
        MODULE_MONITORING: "S",
        SEND_CTI: "S",
        SEND_SUPORTE_VENTILATORIO: "N",
      });

      // Simular processamento
      ModuleControl.startModuleMonitoring("CTI");
      await new Promise((resolve) => setTimeout(resolve, 10));
      ModuleControl.endModuleMonitoring("CTI");
      ModuleControl.recordModuleSkipped("SUPORTE_VENTILATORIO");

      // Exportar métricas
      const metricsJson = ModuleControl.exportMetrics();
      const metrics = JSON.parse(metricsJson);

      if (!metrics.timestamp || !metrics.system || !metrics.modules) {
        throw new Error("Exportação de métricas não está no formato correto");
      }

      if (metrics.modules.length === 0) {
        throw new Error("Métricas de módulos não estão sendo exportadas");
      }

      // Verificar se há dados de CTI
      const ctiData = metrics.modules.find((m: any) => m.moduleName === "CTI");
      if (!ctiData || ctiData.timesProcessed !== 1) {
        throw new Error("Dados do CTI não estão corretos na exportação");
      }

      console.log("✅ Exportação de métricas funcionando");
      return true;
    } catch (error) {
      console.error("❌ Erro na exportação:", error);
      return false;
    } finally {
      this.restoreEnvironment();
      ModuleControl.resetMetrics();
    }
  }

  /**
   * Executa todos os testes
   */
  async runAllTests(): Promise<{
    passed: number;
    failed: number;
    results: any[];
  }> {
    console.log("🚀 Iniciando Testes de Controle de Módulos DRG");
    console.log("=".repeat(50));

    const tests = [
      { name: "Controle Básico", test: () => this.testBasicModuleControl() },
      {
        name: "Controle Granular",
        test: () => this.testGranularModuleControl(),
      },
      {
        name: "Validação de Módulos",
        test: () => this.testRequiredModulesValidation(),
      },
      { name: "Monitoramento", test: () => this.testModuleMonitoring() },
      {
        name: "Análise de Otimização",
        test: () => this.testOptimizationAnalysis(),
      },
      {
        name: "Simulação de Configuração",
        test: () => this.testConfigurationSimulation(),
      },
      { name: "Exportação de Métricas", test: () => this.testMetricsExport() },
    ];

    const results: any[] = [];
    let passed = 0;
    let failed = 0;

    for (const test of tests) {
      try {
        const startTime = Date.now();
        const result = await test.test();
        const duration = Date.now() - startTime;

        if (result) {
          passed++;
          console.log(`✅ ${test.name}: PASSOU (${duration}ms)`);
        } else {
          failed++;
          console.log(`❌ ${test.name}: FALHOU (${duration}ms)`);
        }

        results.push({
          name: test.name,
          passed: result,
          duration,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        failed++;
        console.log(`❌ ${test.name}: ERRO - ${error}`);
        results.push({
          name: test.name,
          passed: false,
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        });
      }
    }

    console.log("=".repeat(50));
    console.log(`📊 RESUMO: ${passed} passaram, ${failed} falharam`);
    console.log(
      `🎯 Taxa de sucesso: ${Math.round((passed / tests.length) * 100)}%`
    );

    return { passed, failed, results };
  }
}
