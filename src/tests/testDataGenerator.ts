import database from "../config/database";
import { v4 as uuidv4 } from "uuid";

export class TestDataGenerator {
  private baseData: any = {};

  constructor() {
    // Inicialização do gerador de dados de teste
  }

  async loadBaseData() {
    try {
      // Carrega dados básicos necessários para os testes
      this.baseData = {
        hospitals: await this.getHospitals(),
        operators: await this.getOperators(),
        procedures: await this.getProcedures(),
        // Adicione outros dados básicos conforme necessário
      };
      return this.baseData;
    } catch (error) {
      console.error("Erro ao carregar dados básicos:", error);
      throw error;
    }
  }

  async setBaseData(data: any) {
    this.baseData = data;
  }

  async generateAdmissionalData(count: number = 1) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        id: uuidv4(),
        situacao: "ADMISSIONAL",
        hospital: this.baseData.hospitals?.[0] || null,
        operator: this.baseData.operators?.[0] || null,
        // Adicione outros campos específicos para admissional
        createdAt: new Date(),
      });
    }
    return data;
  }

  async generateProrrogacaoData(count: number = 1) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        id: uuidv4(),
        situacao: "PRORROGACAO",
        hospital: this.baseData.hospitals?.[0] || null,
        operator: this.baseData.operators?.[0] || null,
        // Adicione outros campos específicos para prorrogação
        createdAt: new Date(),
      });
    }
    return data;
  }

  async generateSuplementarData(count: number = 1) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        id: uuidv4(),
        situacao: "SUPLEMENTAR",
        hospital: this.baseData.hospitals?.[0] || null,
        operator: this.baseData.operators?.[0] || null,
        // Adicione outros campos específicos para suplementar
        createdAt: new Date(),
      });
    }
    return data;
  }

  async loadEstabelecimento8Data() {
    try {
      // Carrega dados específicos do Estabelecimento 8
      return {
        estabelecimento8: true,
        data: await this.getEstabelecimento8Data(),
      };
    } catch (error) {
      console.error("Erro ao carregar dados do Estabelecimento 8:", error);
      throw error;
    }
  }

  async generateTestScenarios() {
    return {
      admissional: await this.generateAdmissionalData(5),
      prorrogacao: await this.generateProrrogacaoData(5),
      suplementar: await this.generateSuplementarData(5),
    };
  }

  private async getHospitals() {
    try {
      const result = await database("hospital").select("*").limit(10);
      return result;
    } catch (error) {
      console.error("Erro ao buscar hospitais:", error);
      return [];
    }
  }

  private async getOperators() {
    try {
      const result = await database("operadora").select("*").limit(10);
      return result;
    } catch (error) {
      console.error("Erro ao buscar operadoras:", error);
      return [];
    }
  }

  private async getProcedures() {
    try {
      const result = await database("procedimento").select("*").limit(10);
      return result;
    } catch (error) {
      console.error("Erro ao buscar procedimentos:", error);
      return [];
    }
  }

  private async getEstabelecimento8Data() {
    try {
      // Implementação específica para dados do Estabelecimento 8
      return {
        estabelecimento: "8",
        data: "dados específicos do estabelecimento 8",
      };
    } catch (error) {
      console.error("Erro ao buscar dados do Estabelecimento 8:", error);
      return null;
    }
  }
}
