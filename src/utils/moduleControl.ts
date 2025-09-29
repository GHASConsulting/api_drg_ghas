/**
 * Utilitário para controle de envio de módulos DRG
 * Baseado em categorias: BÁSICO, OPCIONAL, ESPECIAL
 */

import { ModuleMonitor } from "./moduleMonitor";

export class ModuleControl {
  private static logSentModules: boolean = process.env.LOG_SENT_MODULES === "S";
  private static validateRequired: boolean =
    process.env.VALIDATE_REQUIRED_MODULES === "S";

  /**
   * Verifica se um módulo deve ser enviado
   * @param moduleName Nome do módulo (ex: 'CTI', 'RN', 'PARTO_ADEQUADO')
   * @returns boolean - true se deve enviar, false caso contrário
   */
  public static shouldSendModule(moduleName: string): boolean {
    const moduleEnvVar = `SEND_${moduleName.toUpperCase()}`;
    const shouldSend = process.env[moduleEnvVar] === "S";

    if (this.logSentModules) {
      console.log(
        `[ModuleControl] ${moduleName}: ${shouldSend ? "ENVIANDO" : "PULANDO"}`
      );
    }

    return shouldSend;
  }

  /**
   * Verifica se uma categoria de módulos deve ser enviada
   * @param category Categoria (BASIC, OPTIONAL, SPECIAL)
   * @returns boolean - true se deve enviar, false caso contrário
   */
  public static shouldSendCategory(
    category: "BASIC" | "OPTIONAL" | "SPECIAL"
  ): boolean {
    const categoryEnvVar = `SEND_${category}_MODULES`;
    const shouldSend = process.env[categoryEnvVar] === "S";

    if (this.logSentModules) {
      console.log(
        `[ModuleControl] Categoria ${category}: ${shouldSend ? "ATIVA" : "INATIVA"}`
      );
    }

    return shouldSend;
  }

  /**
   * Verifica se deve enviar módulos básicos (sempre obrigatórios)
   * @returns boolean - sempre true para módulos básicos
   */
  public static shouldSendBasicModules(): boolean {
    return this.shouldSendCategory("BASIC");
  }

  /**
   * Verifica se deve enviar módulos opcionais
   * @returns boolean - baseado na configuração SEND_OPTIONAL_MODULES
   */
  public static shouldSendOptionalModules(): boolean {
    return this.shouldSendCategory("OPTIONAL");
  }

  /**
   * Verifica se deve enviar módulos especiais
   * @returns boolean - baseado na configuração SEND_SPECIAL_MODULES
   */
  public static shouldSendSpecialModules(): boolean {
    return this.shouldSendCategory("SPECIAL");
  }

  /**
   * Verifica se deve enviar módulos de dispositivos médicos
   * @returns boolean - baseado na categoria OPCIONAL
   */
  public static shouldSendDeviceModules(): boolean {
    return this.shouldSendOptionalModules();
  }

  /**
   * Verifica se deve enviar módulos de parto/RN
   * @returns boolean - baseado na categoria ESPECIAL
   */
  public static shouldSendBirthModules(): boolean {
    return this.shouldSendSpecialModules();
  }

  /**
   * Verifica se deve enviar módulos administrativos
   * @returns boolean - baseado na categoria OPCIONAL
   */
  public static shouldSendAdminModules(): boolean {
    return this.shouldSendOptionalModules();
  }

  /**
   * Obtém lista de módulos que devem ser enviados
   * @returns string[] - array com nomes dos módulos ativos
   */
  public static getActiveModules(): string[] {
    const modules = [
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

    return modules.filter((module) => this.shouldSendModule(module));
  }

  /**
   * Valida se todos os módulos obrigatórios estão ativos
   * @returns boolean - true se válido, false caso contrário
   */
  public static validateRequiredModules(): boolean {
    if (!this.validateRequired) {
      return true;
    }

    const requiredModules = [
      "ATENDIMENTO",
      "HOSPITAL",
      "PACIENTE",
      "MEDICO",
      "OPERADORA",
    ];
    const missingModules = requiredModules.filter(
      (module) => !this.shouldSendModule(module)
    );

    if (missingModules.length > 0) {
      console.error(
        `[ModuleControl] Módulos obrigatórios faltando: ${missingModules.join(", ")}`
      );
      return false;
    }

    return true;
  }

  /**
   * Log de resumo dos módulos ativos
   */
  public static logActiveModules(): void {
    if (!this.logSentModules) {
      return;
    }

    const activeModules = this.getActiveModules();
    console.log(`[ModuleControl] Módulos ativos: ${activeModules.join(", ")}`);
    console.log(`[ModuleControl] Total de módulos: ${activeModules.length}`);
  }

  /**
   * Inicia monitoramento de um módulo
   */
  public static startModuleMonitoring(moduleName: string): void {
    ModuleMonitor.startModuleMonitoring(moduleName);
  }

  /**
   * Finaliza monitoramento de um módulo
   */
  public static endModuleMonitoring(moduleName: string): void {
    ModuleMonitor.endModuleMonitoring(moduleName);
  }

  /**
   * Registra que um módulo foi pulado
   */
  public static recordModuleSkipped(moduleName: string): void {
    ModuleMonitor.recordModuleSkipped(moduleName);
  }

  /**
   * Obtém métricas de um módulo
   */
  public static getModuleMetrics(moduleName: string) {
    return ModuleMonitor.getModuleMetrics(moduleName);
  }

  /**
   * Obtém métricas gerais do sistema
   */
  public static getSystemMetrics() {
    return ModuleMonitor.getSystemMetrics();
  }

  /**
   * Gera relatório detalhado
   */
  public static generateDetailedReport(): string {
    return ModuleMonitor.generateDetailedReport();
  }

  /**
   * Exporta métricas para JSON
   */
  public static exportMetrics(): string {
    return ModuleMonitor.exportMetrics();
  }

  /**
   * Limpa métricas antigas
   */
  public static cleanOldMetrics(): void {
    ModuleMonitor.cleanOldMetrics();
  }

  /**
   * Reseta todas as métricas
   */
  public static resetMetrics(): void {
    ModuleMonitor.resetMetrics();
  }
}
