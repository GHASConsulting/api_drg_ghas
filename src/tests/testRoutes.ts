import { FastifyInstance } from "fastify";
import { DRGTestSuite } from "./index";
import { z } from "zod";

export async function createTestRoutes(app: FastifyInstance) {
  // Schema para validação de parâmetros
  const situacaoSchema = z.object({
    situacao: z.number().min(1).max(3),
  });

  const scenarioSchema = z.object({
    situacao: z.number().min(1).max(3),
    cenario: z.number().min(1).max(8),
  });

  const testConfigSchema = z.object({
    saveToDatabase: z.boolean().optional().default(true),
    sendToDRG: z.boolean().optional().default(false),
    validateOnly: z.boolean().optional().default(false),
    hospitalCode: z.number().optional(),
  });

  // GET /tests/scenarios - Lista todos os cenários disponíveis
  app.get("/tests/scenarios", async (request, reply) => {
    try {
      const testSuite = new DRGTestSuite();
      await testSuite.initialize();

      const scenarios = {
        admissional: testSuite.getDataGenerator().generateAdmissionalData(),
        prorrogacao: testSuite.getDataGenerator().generateProrrogacaoData(),
        suplementar: testSuite.getDataGenerator().generateSuplementarData(),
      };

      return {
        success: true,
        data: {
          situacoes: {
            1: "Admissional",
            2: "Prorrogação",
            3: "Suplementar",
          },
          scenarios,
        },
      };
    } catch (error) {
      reply.code(500);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });

  // POST /tests/run-all - Executa todos os testes
  app.post("/tests/run-all", async (request, reply) => {
    try {
      const config = testConfigSchema.parse(request.body || {});

      const testSuite = new DRGTestSuite();
      await testSuite.initialize();

      if (config.validateOnly) {
        await testSuite.runValidationOnly();
      } else if (config.sendToDRG) {
        await testSuite.runTestsWithDRGSend();
      } else {
        await testSuite.runAllTests();
      }

      const reporter = testSuite.getReporter();
      const stats = reporter.getDetailedStats();

      return {
        success: true,
        data: {
          message: "Todos os testes executados com sucesso",
          statistics: stats,
          config,
        },
      };
    } catch (error) {
      reply.code(500);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });

  // POST /tests/run-situacao/:situacao - Executa testes para uma situação específica
  app.post("/tests/run-situacao/:situacao", async (request, reply) => {
    try {
      const { situacao } = situacaoSchema.parse(request.params);
      const config = testConfigSchema.parse(request.body || {});

      const testSuite = new DRGTestSuite();
      await testSuite.initialize();

      await testSuite.runTestsForSituacao(situacao);

      const reporter = testSuite.getReporter();
      const stats = reporter.getDetailedStats();

      return {
        success: true,
        data: {
          message: `Testes para situação ${situacao} executados com sucesso`,
          situacao,
          statistics: stats,
          config,
        },
      };
    } catch (error) {
      reply.code(500);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });

  // POST /tests/run-scenario/:situacao/:cenario - Executa um cenário específico
  app.post("/tests/run-scenario/:situacao/:cenario", async (request, reply) => {
    try {
      const { situacao, cenario } = scenarioSchema.parse(request.params);
      const config = testConfigSchema.parse(request.body || {});

      const testSuite = new DRGTestSuite();
      await testSuite.initialize();

      await testSuite.runSpecificScenario(situacao, cenario);

      const reporter = testSuite.getReporter();
      const stats = reporter.getDetailedStats();

      return {
        success: true,
        data: {
          message: `Cenário ${cenario} para situação ${situacao} executado com sucesso`,
          situacao,
          cenario,
          statistics: stats,
          config,
        },
      };
    } catch (error) {
      reply.code(500);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });

  // POST /tests/validate - Executa apenas validações
  app.post("/tests/validate", async (request, reply) => {
    try {
      const testSuite = new DRGTestSuite();
      await testSuite.initialize();

      await testSuite.runValidationOnly();

      return {
        success: true,
        data: {
          message: "Validações executadas com sucesso",
        },
      };
    } catch (error) {
      reply.code(500);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });

  // POST /tests/run-with-send - Executa testes com envio para DRG
  app.post("/tests/run-with-send", async (request, reply) => {
    try {
      const config = testConfigSchema.parse(request.body || {});

      const testSuite = new DRGTestSuite();
      await testSuite.initialize();

      await testSuite.runTestsWithDRGSend();

      const reporter = testSuite.getReporter();
      const stats = reporter.getDetailedStats();

      return {
        success: true,
        data: {
          message: "Testes com envio para DRG executados com sucesso",
          statistics: stats,
          config,
        },
      };
    } catch (error) {
      reply.code(500);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });

  // GET /tests/stats - Retorna estatísticas dos testes
  app.get("/tests/stats", async (request, reply) => {
    try {
      const testSuite = new DRGTestSuite();
      await testSuite.initialize();

      const reporter = testSuite.getReporter();
      const stats = reporter.getDetailedStats();

      return {
        success: true,
        data: {
          statistics: stats,
        },
      };
    } catch (error) {
      reply.code(500);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });

  // DELETE /tests/cleanup - Limpa dados de teste
  app.delete("/tests/cleanup", async (request, reply) => {
    try {
      const testSuite = new DRGTestSuite();
      await testSuite.initialize();

      await testSuite.cleanupTestData();

      return {
        success: true,
        data: {
          message: "Limpeza de dados de teste concluída",
        },
      };
    } catch (error) {
      reply.code(500);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });

  // GET /tests/report - Retorna relatório detalhado
  app.get("/tests/report", async (request, reply) => {
    try {
      const testSuite = new DRGTestSuite();
      await testSuite.initialize();

      const reporter = testSuite.getReporter();
      const summary = reporter.generateSummary();
      const jsonReport = reporter.generateJSONReport();

      return {
        success: true,
        data: {
          summary,
          jsonReport,
        },
      };
    } catch (error) {
      reply.code(500);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  });

  // GET /tests/info - Informações sobre o sistema de testes
  app.get("/tests/info", async (request, reply) => {
    return {
      success: true,
      data: {
        name: "DRG Test Suite",
        version: "1.0.0",
        description: "Sistema de testes para envios DRG",
        endpoints: {
          "GET /tests/scenarios": "Lista cenários disponíveis",
          "POST /tests/run-all": "Executa todos os testes",
          "POST /tests/run-situacao/:situacao":
            "Executa testes para situação específica",
          "POST /tests/run-scenario/:situacao/:cenario":
            "Executa cenário específico",
          "POST /tests/validate": "Executa apenas validações",
          "POST /tests/run-with-send": "Executa testes com envio para DRG",
          "GET /tests/stats": "Retorna estatísticas dos testes",
          "DELETE /tests/cleanup": "Limpa dados de teste",
          "GET /tests/report": "Retorna relatório detalhado",
          "GET /tests/info": "Informações sobre o sistema",
        },
        situacoes: {
          1: "Admissional",
          2: "Prorrogação",
          3: "Suplementar",
        },
      },
    };
  });
}
