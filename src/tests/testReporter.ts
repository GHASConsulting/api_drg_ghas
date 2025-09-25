import { TestResult } from "./testRunner";
import { writeLog } from "../utils/writeLogs";

export class TestReporter {
  private results: TestResult[] = [];

  addResult(result: TestResult): void {
    this.results.push(result);
  }

  addResults(results: TestResult[]): void {
    this.results.push(...results);
  }

  generateSummary(): string {
    const total = this.results.length;
    const successful = this.results.filter((r) => r.drgSuccess).length;
    const failed = total - successful;
    const avgExecutionTime =
      this.results.reduce((sum, r) => sum + r.executionTime, 0) / total;

    return `
📊 RESUMO DOS TESTES DRG
========================

📈 Estatísticas Gerais:
  • Total de testes: ${total}
  • Sucessos: ${successful} (${total > 0 ? ((successful / total) * 100).toFixed(1) : 0}%)
  • Falhas: ${failed} (${total > 0 ? ((failed / total) * 100).toFixed(1) : 0}%)
  • Tempo médio de execução: ${avgExecutionTime.toFixed(2)}ms

📋 Por Situação:
  • Admissional (1): ${this.results.filter((r) => r.testData.situacao === 1).length}
  • Prorrogação (2): ${this.results.filter((r) => r.testData.situacao === 2).length}
  • Suplementar (3): ${this.results.filter((r) => r.testData.situacao === 3).length}

⏱️ Tempo de Execução:
  • Mais rápido: ${Math.min(...this.results.map((r) => r.executionTime))}ms
  • Mais lento: ${Math.max(...this.results.map((r) => r.executionTime))}ms
  • Média: ${avgExecutionTime.toFixed(2)}ms

🎯 Taxa de Sucesso por Situação:
  • Admissional: ${this.getSuccessRateBySituacao(1).toFixed(1)}%
  • Prorrogação: ${this.getSuccessRateBySituacao(2).toFixed(1)}%
  • Suplementar: ${this.getSuccessRateBySituacao(3).toFixed(1)}%
`;
  }

  generateDetailedReport(): string {
    let report = this.generateSummary();
    report += "\n\n📋 DETALHES DOS TESTES\n";
    report += "=====================\n\n";

    for (const result of this.results) {
      report += this.formatTestResult(result);
      report += "\n" + "─".repeat(80) + "\n\n";
    }

    return report;
  }

  private formatTestResult(result: TestResult): string {
    const status = result.drgSuccess ? "✅ SUCESSO" : "❌ FALHA";
    const situacao = this.getSituacaoName(result.testData.situacao);
    const timestamp = result.timestamp.toLocaleString("pt-BR");

    return `
🧪 Teste: ${result.testData.nome}
📅 Data: ${timestamp}
⏱️ Tempo: ${result.executionTime}ms
📊 Status: ${status}
📋 Situação: ${situacao} (${result.testData.situacao})

🔍 Validação:
  • Válido: ${result.validation.isValid ? "Sim" : "Não"}
  • Score: ${result.validation.score}/100
  • Erros: ${result.validation.errors.length}
  • Avisos: ${result.validation.warnings.length}

📄 XML:
  • Gerado: ${result.xmlGenerated ? "Sim" : "Não"}
  • Tamanho: ${result.xmlContent ? result.xmlContent.length : 0} caracteres

📤 DRG:
  • Enviado: ${result.drgSuccess ? "Sim" : "Não"}
  ${result.drgError ? `• Erro: ${result.drgError}` : ""}

${
  result.validation.errors.length > 0
    ? `
❌ Erros de Validação:
${result.validation.errors.map((e) => `  • ${e}`).join("\n")}
`
    : ""
}

${
  result.validation.warnings.length > 0
    ? `
⚠️ Avisos:
${result.validation.warnings.map((w) => `  • ${w}`).join("\n")}
`
    : ""
}

${
  result.drgResponse
    ? `
📥 Resposta DRG:
${JSON.stringify(result.drgResponse, null, 2)}
`
    : ""
}
`;
  }

  private getSituacaoName(situacao: number): string {
    const names = {
      1: "Admissional",
      2: "Prorrogação",
      3: "Suplementar",
    };
    return names[situacao] || "Desconhecida";
  }

  private getSuccessRateBySituacao(situacao: number): number {
    const situacaoResults = this.results.filter(
      (r) => r.testData.situacao === situacao
    );
    if (situacaoResults.length === 0) return 0;

    const successful = situacaoResults.filter((r) => r.drgSuccess).length;
    return (successful / situacaoResults.length) * 100;
  }

  generateJSONReport(): any {
    return {
      summary: {
        total: this.results.length,
        successful: this.results.filter((r) => r.drgSuccess).length,
        failed: this.results.filter((r) => !r.drgSuccess).length,
        successRate:
          this.results.length > 0
            ? (this.results.filter((r) => r.drgSuccess).length /
                this.results.length) *
              100
            : 0,
        avgExecutionTime:
          this.results.reduce((sum, r) => sum + r.executionTime, 0) /
          this.results.length,
        bySituacao: {
          1: this.results.filter((r) => r.testData.situacao === 1).length,
          2: this.results.filter((r) => r.testData.situacao === 2).length,
          3: this.results.filter((r) => r.testData.situacao === 3).length,
        },
      },
      results: this.results.map((result) => ({
        id: result.id,
        testName: result.testData.nome,
        situacao: result.testData.situacao,
        situacaoName: this.getSituacaoName(result.testData.situacao),
        timestamp: result.timestamp,
        executionTime: result.executionTime,
        validation: {
          isValid: result.validation.isValid,
          score: result.validation.score,
          errors: result.validation.errors,
          warnings: result.validation.warnings,
        },
        xmlGenerated: result.xmlGenerated,
        xmlSize: result.xmlContent ? result.xmlContent.length : 0,
        drgSuccess: result.drgSuccess,
        drgError: result.drgError,
        drgResponse: result.drgResponse,
      })),
    };
  }

  async saveReport(): Promise<void> {
    try {
      const report = this.generateDetailedReport();
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `test_report_${timestamp}.txt`;

      await writeLog(report, `TEST_REPORT_${timestamp}`);

      console.log(`📄 Relatório salvo: ${filename}`);
    } catch (error) {
      console.error("Erro ao salvar relatório:", error);
      throw error;
    }
  }

  async saveJSONReport(): Promise<void> {
    try {
      const jsonReport = this.generateJSONReport();
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `test_report_${timestamp}.json`;

      await writeLog(
        JSON.stringify(jsonReport, null, 2),
        `TEST_JSON_REPORT_${timestamp}`
      );

      console.log(`📄 Relatório JSON salvo: ${filename}`);
    } catch (error) {
      console.error("Erro ao salvar relatório JSON:", error);
      throw error;
    }
  }

  displayReport(): void {
    console.log(this.generateDetailedReport());
  }

  getResults(): TestResult[] {
    return this.results;
  }

  getResultsBySituacao(situacao: number): TestResult[] {
    return this.results.filter((r) => r.testData.situacao === situacao);
  }

  getResultsByStatus(success: boolean): TestResult[] {
    return this.results.filter((r) => r.drgSuccess === success);
  }

  getDetailedStats(): any {
    const total = this.results.length;
    const successful = this.results.filter((r) => r.drgSuccess).length;
    const failed = total - successful;

    const bySituacao = {
      1: this.results.filter((r) => r.testData.situacao === 1),
      2: this.results.filter((r) => r.testData.situacao === 2),
      3: this.results.filter((r) => r.testData.situacao === 3),
    };

    return {
      total,
      successful,
      failed,
      successRate: total > 0 ? (successful / total) * 100 : 0,
      avgExecutionTime:
        this.results.reduce((sum, r) => sum + r.executionTime, 0) / total,
      bySituacao: {
        1: {
          total: bySituacao[1].length,
          successful: bySituacao[1].filter((r) => r.drgSuccess).length,
          failed: bySituacao[1].filter((r) => !r.drgSuccess).length,
          successRate:
            bySituacao[1].length > 0
              ? (bySituacao[1].filter((r) => r.drgSuccess).length /
                  bySituacao[1].length) *
                100
              : 0,
        },
        2: {
          total: bySituacao[2].length,
          successful: bySituacao[2].filter((r) => r.drgSuccess).length,
          failed: bySituacao[2].filter((r) => !r.drgSuccess).length,
          successRate:
            bySituacao[2].length > 0
              ? (bySituacao[2].filter((r) => r.drgSuccess).length /
                  bySituacao[2].length) *
                100
              : 0,
        },
        3: {
          total: bySituacao[3].length,
          successful: bySituacao[3].filter((r) => r.drgSuccess).length,
          failed: bySituacao[3].filter((r) => !r.drgSuccess).length,
          successRate:
            bySituacao[3].length > 0
              ? (bySituacao[3].filter((r) => r.drgSuccess).length /
                  bySituacao[3].length) *
                100
              : 0,
        },
      },
    };
  }
}
