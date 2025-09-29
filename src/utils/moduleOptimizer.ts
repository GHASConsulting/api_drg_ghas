/**
 * Otimizador de Módulos DRG
 * Analisa métricas e sugere configurações otimizadas
 */

import { ModuleControl } from "./moduleControl";

interface OptimizationSuggestion {
  type: "always_active" | "always_inactive" | "conditional" | "performance";
  module: string;
  reason: string;
  currentConfig: string;
  suggestedConfig: string;
  impact: "high" | "medium" | "low";
}

interface OptimizationReport {
  totalSuggestions: number;
  highImpactSuggestions: number;
  mediumImpactSuggestions: number;
  lowImpactSuggestions: number;
  suggestions: OptimizationSuggestion[];
  estimatedEfficiencyGain: number;
  recommendedEnvConfig: string;
}

export class ModuleOptimizer {
  /**
   * Analisa métricas e gera sugestões de otimização
   */
  public static analyzeAndOptimize(): OptimizationReport {
    const systemMetrics = ModuleControl.getSystemMetrics();
    const suggestions: OptimizationSuggestion[] = [];

    // Analisar módulos nunca processados
    const neverProcessed = systemMetrics.leastUsedModules;
    neverProcessed.forEach((module) => {
      suggestions.push({
        type: "always_inactive",
        module,
        reason:
          "Módulo nunca foi processado, mas está sendo verificado constantemente",
        currentConfig: `SEND_${module}=N`,
        suggestedConfig: `SEND_${module}=N (permanente)`,
        impact: "medium",
      });
    });

    // Analisar módulos sempre processados
    const alwaysProcessed = systemMetrics.mostUsedModules;
    alwaysProcessed.forEach((module) => {
      suggestions.push({
        type: "always_active",
        module,
        reason: "Módulo sempre processado, pode ser configurado como padrão",
        currentConfig: `SEND_${module}=S`,
        suggestedConfig: `SEND_${module}=S (permanente)`,
        impact: "low",
      });
    });

    // Analisar eficiência de processamento
    if (systemMetrics.processingEfficiency < 50) {
      suggestions.push({
        type: "performance",
        module: "SYSTEM",
        reason: `Eficiência baixa (${systemMetrics.processingEfficiency.toFixed(2)}%), muitos módulos sendo pulados`,
        currentConfig: "Configuração atual",
        suggestedConfig: "Revisar configuração de módulos opcionais",
        impact: "high",
      });
    }

    // Calcular ganho estimado de eficiência
    const estimatedEfficiencyGain = this.calculateEfficiencyGain(suggestions);

    // Gerar configuração recomendada
    const recommendedEnvConfig = this.generateRecommendedEnvConfig(suggestions);

    return {
      totalSuggestions: suggestions.length,
      highImpactSuggestions: suggestions.filter((s) => s.impact === "high")
        .length,
      mediumImpactSuggestions: suggestions.filter((s) => s.impact === "medium")
        .length,
      lowImpactSuggestions: suggestions.filter((s) => s.impact === "low")
        .length,
      suggestions,
      estimatedEfficiencyGain,
      recommendedEnvConfig,
    };
  }

  /**
   * Calcula ganho estimado de eficiência
   */
  private static calculateEfficiencyGain(
    suggestions: OptimizationSuggestion[]
  ): number {
    let gain = 0;

    suggestions.forEach((suggestion) => {
      switch (suggestion.impact) {
        case "high":
          gain += 20;
          break;
        case "medium":
          gain += 10;
          break;
        case "low":
          gain += 5;
          break;
      }
    });

    return Math.min(gain, 100); // Máximo 100%
  }

  /**
   * Gera configuração de ambiente recomendada
   */
  private static generateRecommendedEnvConfig(
    suggestions: OptimizationSuggestion[]
  ): string {
    const alwaysActive = suggestions.filter((s) => s.type === "always_active");
    const alwaysInactive = suggestions.filter(
      (s) => s.type === "always_inactive"
    );

    let config = `# Configuração otimizada baseada em análise de métricas
# Gerado em: ${new Date().toLocaleString()}

# Módulos sempre ativos (baseado em uso)
${alwaysActive.map((s) => `SEND_${s.module}=S`).join("\n")}

# Módulos sempre inativos (baseado em não uso)
${alwaysInactive.map((s) => `SEND_${s.module}=N`).join("\n")}

# Configurações de monitoramento
MODULE_MONITORING=S
LOG_SENT_MODULES=S
VALIDATE_REQUIRED_MODULES=S
`;

    return config;
  }

  /**
   * Gera relatório de otimização
   */
  public static generateOptimizationReport(): string {
    const report = this.analyzeAndOptimize();

    let output = `
🔧 RELATÓRIO DE OTIMIZAÇÃO DE MÓDULOS DRG
=========================================

📊 RESUMO:
• Total de sugestões: ${report.totalSuggestions}
• Alto impacto: ${report.highImpactSuggestions}
• Médio impacto: ${report.mediumImpactSuggestions}
• Baixo impacto: ${report.lowImpactSuggestions}
• Ganho estimado de eficiência: ${report.estimatedEfficiencyGain}%

💡 SUGESTÕES DE OTIMIZAÇÃO:
${report.suggestions
  .map(
    (suggestion, index) => `
${index + 1}. ${suggestion.module} (${suggestion.impact.toUpperCase()})
   Tipo: ${suggestion.type}
   Motivo: ${suggestion.reason}
   Configuração atual: ${suggestion.currentConfig}
   Configuração sugerida: ${suggestion.suggestedConfig}
`
  )
  .join("")}

📋 CONFIGURAÇÃO RECOMENDADA:
${report.recommendedEnvConfig}

📅 Relatório gerado em: ${new Date().toLocaleString()}
`;

    return output;
  }

  /**
   * Aplica otimizações automáticas (modo conservador)
   */
  public static applyConservativeOptimizations(): string[] {
    const report = this.analyzeAndOptimize();
    const appliedOptimizations: string[] = [];

    // Aplicar apenas otimizações de baixo risco
    report.suggestions.forEach((suggestion) => {
      if (
        suggestion.impact === "low" &&
        suggestion.type === "always_inactive"
      ) {
        // Desativar módulos que nunca são usados
        appliedOptimizations.push(
          `Desativado ${suggestion.module} (nunca usado)`
        );
      }
    });

    return appliedOptimizations;
  }

  /**
   * Simula impacto de uma configuração
   */
  public static simulateConfigurationImpact(
    envConfig: Record<string, string>
  ): {
    activeModules: string[];
    skippedModules: string[];
    efficiency: number;
    estimatedProcessingTime: number;
  } {
    // Simular configuração
    const originalEnv = { ...process.env };
    Object.assign(process.env, envConfig);

    const activeModules = ModuleControl.getActiveModules();
    const allModules = [
      "CTI",
      "SUPORTE_VENTILATORIO",
      "CATETER_VASCULAR",
      "SONDA_VESICAL",
      "CONDICAO_ADQUIRIDA",
      "PARTO_ADEQUADO",
      "RN",
      "ALTA_ADMINISTRATIVA",
      "ANALISE_CRITICA",
      "CAUSA_EXTERNA_PERMANENCIA",
      "MEDICO_PROCEDIMENTO",
      "DISPOSITIVO_TERAPEUTICO",
    ];

    const skippedModules = allModules.filter(
      (module) => !activeModules.includes(module)
    );
    const efficiency = (skippedModules.length / allModules.length) * 100;
    const estimatedProcessingTime = activeModules.length * 100; // Estimativa baseada em 100ms por módulo

    // Restaurar configuração original
    Object.assign(process.env, originalEnv);

    return {
      activeModules,
      skippedModules,
      efficiency,
      estimatedProcessingTime,
    };
  }
}
