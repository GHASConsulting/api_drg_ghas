export class TestReporter {
  private results: any[] = [];

  constructor() {
    // Inicialização do relator de testes
  }

  addResults(results: any) {
    this.results.push(results);
  }

  displayReport() {
    console.log("=== RELATÓRIO DE TESTES ===");
    console.log(`Total de testes executados: ${this.results.length}`);

    const successCount = this.results.filter(
      (r) => r.status === "success"
    ).length;
    const errorCount = this.results.filter((r) => r.status === "error").length;

    console.log(`Sucessos: ${successCount}`);
    console.log(`Erros: ${errorCount}`);

    if (errorCount > 0) {
      console.log("\n=== ERROS DETALHADOS ===");
      this.results
        .filter((r) => r.status === "error")
        .forEach((error, index) => {
          console.log(`${index + 1}. ${error.message || "Erro desconhecido"}`);
        });
    }
  }

  saveReport(filename?: string) {
    const reportName =
      filename || `test-report-${new Date().toISOString().split("T")[0]}.txt`;

    const report = this.generateTextReport();

    // Aqui você pode implementar a lógica para salvar o arquivo
    console.log(`Relatório salvo como: ${reportName}`);
    return reportName;
  }

  saveJSONReport(filename?: string) {
    const reportName =
      filename || `test-report-${new Date().toISOString().split("T")[0]}.json`;

    const report = {
      timestamp: new Date().toISOString(),
      totalTests: this.results.length,
      results: this.results,
      summary: this.generateSummary(),
    };

    // Aqui você pode implementar a lógica para salvar o arquivo JSON
    console.log(`Relatório JSON salvo como: ${reportName}`);
    return reportName;
  }

  private generateTextReport(): string {
    let report = "=== RELATÓRIO DE TESTES ===\n";
    report += `Data: ${new Date().toISOString()}\n`;
    report += `Total de testes: ${this.results.length}\n\n`;

    const successCount = this.results.filter(
      (r) => r.status === "success"
    ).length;
    const errorCount = this.results.filter((r) => r.status === "error").length;

    report += `Sucessos: ${successCount}\n`;
    report += `Erros: ${errorCount}\n\n`;

    if (errorCount > 0) {
      report += "=== ERROS DETALHADOS ===\n";
      this.results
        .filter((r) => r.status === "error")
        .forEach((error, index) => {
          report += `${index + 1}. ${error.message || "Erro desconhecido"}\n`;
        });
    }

    return report;
  }

  private generateSummary() {
    const successCount = this.results.filter(
      (r) => r.status === "success"
    ).length;
    const errorCount = this.results.filter((r) => r.status === "error").length;

    return {
      total: this.results.length,
      success: successCount,
      errors: errorCount,
      successRate:
        this.results.length > 0
          ? (successCount / this.results.length) * 100
          : 0,
    };
  }

  getResults() {
    return this.results;
  }

  clearResults() {
    this.results = [];
  }
}
