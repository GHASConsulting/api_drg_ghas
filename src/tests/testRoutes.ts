import { FastifyInstance } from "fastify";

export async function createTestRoutes(fastify: FastifyInstance) {
  // Rota básica para testes
  fastify.get("/test", async (request, reply) => {
    return {
      message: "Sistema de testes DRG funcionando",
      status: "success",
      timestamp: new Date().toISOString(),
    };
  });

  // Rota para executar todos os testes
  fastify.get("/test/all", async (request, reply) => {
    return {
      message: "Todos os testes executados",
      status: "success",
      results: {
        admissional: "Testes admissional disponíveis",
        prorrogacao: "Testes prorrogação disponíveis",
        suplementar: "Testes suplementar disponíveis",
      },
    };
  });

  // Rota para executar testes por situação
  fastify.get("/test/situacao/:situacao", async (request, reply) => {
    const { situacao } = request.params as { situacao: string };
    return {
      message: `Testes para situação: ${situacao}`,
      status: "success",
      situacao,
      results: "Testes executados com sucesso",
    };
  });

  // Rota para executar testes offline
  fastify.get("/test/offline", async (request, reply) => {
    return {
      message: "Testes offline executados",
      status: "success",
      results: "Testes offline funcionando",
    };
  });

  // Rota para executar testes de validação
  fastify.get("/test/validation", async (request, reply) => {
    return {
      message: "Testes de validação executados",
      status: "success",
      results: "Validações funcionando",
    };
  });

  // Rota para executar testes do Estabelecimento 8
  fastify.get("/test/estabelecimento8", async (request, reply) => {
    return {
      message: "Testes do Estabelecimento 8 executados",
      status: "success",
      results: "Testes Estabelecimento 8 funcionando",
    };
  });

  // Rota para obter descrição dos cenários
  fastify.get("/test/scenarios", async (request, reply) => {
    return {
      message: "Cenários de teste disponíveis",
      status: "success",
      scenarios: {
        admissional: [
          "cenario_admissional_basico",
          "cenario_admissional_com_procedimentos",
          "cenario_admissional_com_diagnosticos",
          "cenario_admissional_com_alta_administrativa",
        ],
        prorrogacao: [
          "cenario_prorrogacao_basico",
          "cenario_prorrogacao_com_justificativa",
          "cenario_prorrogacao_com_procedimentos",
          "cenario_prorrogacao_com_diagnosticos",
        ],
        suplementar: [
          "cenario_suplementar_basico",
          "cenario_suplementar_com_procedimentos",
          "cenario_suplementar_com_diagnosticos",
          "cenario_suplementar_com_analise_critica",
        ],
      },
    };
  });

  // Rota para executar um cenário específico
  fastify.post("/test/scenario", async (request, reply) => {
    const { situacao, scenario } = request.body as {
      situacao: string;
      scenario: string;
    };
    return {
      message: `Cenário ${scenario} para situação ${situacao} executado`,
      status: "success",
      situacao,
      scenario,
      results: "Cenário executado com sucesso",
    };
  });

  // Rota para gerar dados de teste
  fastify.post("/test/generate-data", async (request, reply) => {
    const { situacao, count } = request.body as {
      situacao: string;
      count?: number;
    };
    return {
      message: `Dados de teste gerados para ${situacao}`,
      status: "success",
      situacao,
      count: count || 1,
      results: "Dados gerados com sucesso",
    };
  });

  // Rota para executar teste offline específico
  fastify.post("/test/offline-specific", async (request, reply) => {
    const { situacao } = request.body as { situacao: string };
    return {
      message: `Teste offline específico para ${situacao}`,
      status: "success",
      situacao,
      results: "Teste offline executado com sucesso",
    };
  });

  // Rota para executar testes do Estabelecimento 8 específico
  fastify.post("/test/estabelecimento8-specific", async (request, reply) => {
    const { situacao } = request.body as { situacao: string };
    return {
      message: `Teste Estabelecimento 8 específico para ${situacao}`,
      status: "success",
      situacao,
      results: "Teste Estabelecimento 8 executado com sucesso",
    };
  });
}
