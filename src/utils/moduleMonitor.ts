/**
 * Sistema de Monitoramento de Módulos DRG
 * Coleta métricas, analisa performance e sugere otimizações
 */

interface ModuleMetrics {
  moduleName: string;
  timesProcessed: number;
  timesSkipped: number;
  averageProcessingTime: number;
  lastProcessed: Date | null;
  lastSkipped: Date | null;
  efficiency: number; // Porcentagem de vezes que foi processado
}

interface SystemMetrics {
  totalModules: number;
  activeModules: number;
  skippedModules: number;
  processingEfficiency: number;
  mostUsedModules: string[];
  leastUsedModules: string[];
  recommendations: string[];
}

export class ModuleMonitor {
  private static metrics: Map<string, ModuleMetrics> = new Map();
  private static processingTimes: Map<string, number[]> = new Map();
  private static isMonitoring: boolean = process.env.MODULE_MONITORING === "S";

  /**
   * Inicia o monitoramento de um módulo
   */
  public static startModuleMonitoring(moduleName: string): void {
    if (!this.isMonitoring) return;

    const startTime = Date.now();
    this.processingTimes.set(moduleName, [
      ...(this.processingTimes.get(moduleName) || []),
      startTime,
    ]);
  }

  /**
   * Finaliza o monitoramento de um módulo
   */
  public static endModuleMonitoring(moduleName: string): void {
    if (!this.isMonitoring) return;

    const endTime = Date.now();
    const times = this.processingTimes.get(moduleName) || [];
    const startTime = times[times.length - 1];
    const processingTime = endTime - startTime;

    this.updateModuleMetrics(moduleName, processingTime, true);
  }

  /**
   * Registra que um módulo foi pulado
   */
  public static recordModuleSkipped(moduleName: string): void {
    if (!this.isMonitoring) return;

    this.updateModuleMetrics(moduleName, 0, false);
  }

  /**
   * Atualiza métricas de um módulo
   */
  private static updateModuleMetrics(
    moduleName: string,
    processingTime: number,
    wasProcessed: boolean
  ): void {
    const existing = this.metrics.get(moduleName) || {
      moduleName,
      timesProcessed: 0,
      timesSkipped: 0,
      averageProcessingTime: 0,
      lastProcessed: null,
      lastSkipped: null,
      efficiency: 0,
    };

    if (wasProcessed) {
      existing.timesProcessed++;
      existing.lastProcessed = new Date();
      existing.averageProcessingTime =
        (existing.averageProcessingTime * (existing.timesProcessed - 1) +
          processingTime) /
        existing.timesProcessed;
    } else {
      existing.timesSkipped++;
      existing.lastSkipped = new Date();
    }

    const total = existing.timesProcessed + existing.timesSkipped;
    existing.efficiency =
      total > 0 ? (existing.timesProcessed / total) * 100 : 0;

    this.metrics.set(moduleName, existing);
  }

  /**
   * Obtém métricas de um módulo específico
   */
  public static getModuleMetrics(moduleName: string): ModuleMetrics | null {
    return this.metrics.get(moduleName) || null;
  }

  /**
   * Obtém métricas gerais do sistema
   */
  public static getSystemMetrics(): SystemMetrics {
    const allModules = Array.from(this.metrics.values());
    const totalModules = allModules.length;
    const activeModules = allModules.filter((m) => m.timesProcessed > 0).length;
    const skippedModules = allModules.filter((m) => m.timesSkipped > 0).length;

    const totalProcessed = allModules.reduce(
      (sum, m) => sum + m.timesProcessed,
      0
    );
    const totalSkipped = allModules.reduce((sum, m) => sum + m.timesSkipped, 0);
    const processingEfficiency =
      totalProcessed + totalSkipped > 0
        ? (totalSkipped / (totalProcessed + totalSkipped)) * 100
        : 0;

    // Módulos mais usados
    const mostUsedModules = allModules
      .sort((a, b) => b.timesProcessed - a.timesProcessed)
      .slice(0, 5)
      .map((m) => m.moduleName);

    // Módulos menos usados
    const leastUsedModules = allModules
      .filter((m) => m.timesProcessed === 0 && m.timesSkipped > 0)
      .sort((a, b) => b.timesSkipped - a.timesSkipped)
      .slice(0, 5)
      .map((m) => m.moduleName);

    // Gerar recomendações
    const recommendations = this.generateRecommendations(allModules);

    return {
      totalModules,
      activeModules,
      skippedModules,
      processingEfficiency,
      mostUsedModules,
      leastUsedModules,
      recommendations,
    };
  }

  /**
   * Gera recomendações de otimização
   */
  private static generateRecommendations(modules: ModuleMetrics[]): string[] {
    const recommendations: string[] = [];

    // Módulos nunca processados
    const neverProcessedModules = modules.filter(
      (m) => m.timesProcessed === 0 && m.timesSkipped > 10
    );
    if (neverProcessedModules.length > 0) {
      recommendations.push(
        `Considere desativar permanentemente: ${neverProcessedModules.map((m) => m.moduleName).join(", ")}`
      );
    }

    // Módulos com baixa eficiência
    const lowEfficiency = modules.filter(
      (m) => m.efficiency < 20 && m.timesSkipped > 5
    );
    if (lowEfficiency.length > 0) {
      recommendations.push(
        `Módulos com baixa utilização: ${lowEfficiency.map((m) => m.moduleName).join(", ")}`
      );
    }

    // Módulos com alto tempo de processamento
    const slowModules = modules.filter((m) => m.averageProcessingTime > 1000);
    if (slowModules.length > 0) {
      recommendations.push(
        `Módulos com processamento lento: ${slowModules.map((m) => m.moduleName).join(", ")}`
      );
    }

    // Sugestão de configuração otimizada
    const alwaysProcessed = modules.filter((m) => m.efficiency === 100);
    const neverProcessedOptimized = modules.filter((m) => m.efficiency === 0);

    if (alwaysProcessed.length > 0) {
      recommendations.push(
        `Configure como sempre ativo: ${alwaysProcessed.map((m) => m.moduleName).join(", ")}`
      );
    }

    if (neverProcessedOptimized.length > 0) {
      recommendations.push(
        `Configure como sempre inativo: ${neverProcessedOptimized.map((m) => m.moduleName).join(", ")}`
      );
    }

    return recommendations;
  }

  /**
   * Gera relatório detalhado
   */
  public static generateDetailedReport(): string {
    const systemMetrics = this.getSystemMetrics();
    const allModules = Array.from(this.metrics.values());

    let report = `
📊 RELATÓRIO DE MONITORAMENTO DE MÓDULOS DRG
=============================================

📈 MÉTRICAS GERAIS:
• Total de módulos monitorados: ${systemMetrics.totalModules}
• Módulos ativos: ${systemMetrics.activeModules}
• Módulos pulados: ${systemMetrics.skippedModules}
• Eficiência de processamento: ${systemMetrics.processingEfficiency.toFixed(2)}%

🏆 MÓDULOS MAIS UTILIZADOS:
${systemMetrics.mostUsedModules
  .map((module, index) => `${index + 1}. ${module}`)
  .join("\n")}

⏭️ MÓDULOS MENOS UTILIZADOS:
${systemMetrics.leastUsedModules
  .map((module, index) => `${index + 1}. ${module}`)
  .join("\n")}

📋 DETALHES POR MÓDULO:
${allModules
  .map(
    (module) => `
🔹 ${module.moduleName}:
   • Processado: ${module.timesProcessed} vezes
   • Pulado: ${module.timesSkipped} vezes
   • Eficiência: ${module.efficiency.toFixed(2)}%
   • Tempo médio: ${module.averageProcessingTime.toFixed(2)}ms
   • Último processado: ${module.lastProcessed ? module.lastProcessed.toLocaleString() : "Nunca"}
   • Último pulado: ${module.lastSkipped ? module.lastSkipped.toLocaleString() : "Nunca"}
`
  )
  .join("")}

💡 RECOMENDAÇÕES:
${systemMetrics.recommendations
  .map((rec, index) => `${index + 1}. ${rec}`)
  .join("\n")}

📅 Relatório gerado em: ${new Date().toLocaleString()}
`;

    return report;
  }

  /**
   * Exporta métricas para JSON
   */
  public static exportMetrics(): string {
    const systemMetrics = this.getSystemMetrics();
    const moduleMetrics = Array.from(this.metrics.values());

    return JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        system: systemMetrics,
        modules: moduleMetrics,
      },
      null,
      2
    );
  }

  /**
   * Limpa métricas antigas (mais de 24h)
   */
  public static cleanOldMetrics(): void {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    for (const [moduleName, metrics] of this.metrics.entries()) {
      const lastActivity = metrics.lastProcessed || metrics.lastSkipped;
      if (lastActivity && lastActivity < oneDayAgo) {
        this.metrics.delete(moduleName);
        this.processingTimes.delete(moduleName);
      }
    }
  }

  /**
   * Reseta todas as métricas
   */
  public static resetMetrics(): void {
    this.metrics.clear();
    this.processingTimes.clear();
  }

  /**
   * Verifica se o monitoramento está ativo
   */
  public static isMonitoringActive(): boolean {
    return this.isMonitoring;
  }

  /**
   * Ativa/desativa o monitoramento
   */
  public static setMonitoring(active: boolean): void {
    this.isMonitoring = active;
  }
}
