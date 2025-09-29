import database from "../config/database";
import { v4 as uuidv4 } from "uuid";
import { Hospital } from "../models/hospital";
import { Paciente } from "../models/paciente";
import { Internacao } from "../models/internacao";
import { Operadora } from "../models/operadora";
import { Procedimento } from "../models/procedimento";
import { Medico } from "../models/medico";

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
      // Cria instâncias dos modelos
      const hospital = new Hospital();
      const paciente = new Paciente();
      const internacao = new Internacao();
      const operadora = new Operadora();
      const medico = new Medico();

      // Configura dados do hospital
      hospital.setCodigo(`HOSP${String(i + 1).padStart(3, "0")}`);
      hospital.setNome(`Hospital Teste ${i + 1}`);
      hospital.setCnes(`123456${String(i + 1).padStart(2, "0")}`);
      hospital.setPorte("2"); // Médio
      hospital.setComplexidade("2"); // Alta complexidade
      hospital.setEsferaAdministrativa("4"); // Privada
      hospital.setUf("SP");
      hospital.setCidade("3550308"); // São Paulo
      hospital.setTipoLogradouro("Rua");
      hospital.setLogradouro(`Rua Teste ${i + 1}`);
      hospital.setNumeroLogradouro(`${100 + i}`);
      hospital.setBairro("Centro");
      hospital.setCep("01234567");

      // Configura dados do paciente
      paciente.setDataNascimento("1990-01-01T00:00:00");
      paciente.setSexo("M");
      paciente.setCpf("12345678901");
      paciente.setRecemNascido("N");
      paciente.setParticular("N");
      paciente.setCns("123456789012345");

      // Configura dados da internação
      internacao.setSituacao("1"); // Admissional
      internacao.setCaraterInternacao("1"); // Eletivo
      internacao.setProcedencia("M"); // Comunidade
      internacao.setLeito(`LEITO${String(i + 1).padStart(3, "0")}`);
      internacao.setNumeroOperadora("123456789");
      internacao.setNumeroRegistro(`REG${String(i + 1).padStart(6, "0")}`);
      internacao.setDataInternacao(new Date().toISOString());
      internacao.setCodigoCidPrincipal("A00.0");
      internacao.setInternadoOutrasVezes("N");
      internacao.setHospitalInternacaoAnterior("N");
      internacao.setReiternacao("N");
      internacao.setRecaida("N");

      // Adiciona entidades relacionadas
      internacao.addHospital(hospital);
      internacao.addPaciente(paciente);
      internacao.addOpradora(operadora);
      internacao.addMedico(medico);

      data.push({
        id: uuidv4(),
        situacao: "ADMISSIONAL",
        internacao: internacao,
        hospital: hospital,
        paciente: paciente,
        operadora: operadora,
        medico: medico,
        createdAt: new Date(),
      });
    }
    return data;
  }

  async generateProrrogacaoData(count: number = 1) {
    const data = [];
    for (let i = 0; i < count; i++) {
      // Cria instâncias dos modelos
      const hospital = new Hospital();
      const paciente = new Paciente();
      const internacao = new Internacao();
      const operadora = new Operadora();
      const medico = new Medico();

      // Configura dados do hospital (mesmo padrão do admissional)
      hospital.setCodigo(`HOSP${String(i + 1).padStart(3, "0")}`);
      hospital.setNome(`Hospital Teste ${i + 1}`);
      hospital.setCnes(`123456${String(i + 1).padStart(2, "0")}`);
      hospital.setPorte("2");
      hospital.setComplexidade("2");
      hospital.setEsferaAdministrativa("4");
      hospital.setUf("SP");
      hospital.setCidade("3550308");
      hospital.setTipoLogradouro("Rua");
      hospital.setLogradouro(`Rua Teste ${i + 1}`);
      hospital.setNumeroLogradouro(`${100 + i}`);
      hospital.setBairro("Centro");
      hospital.setCep("01234567");

      // Configura dados do paciente
      paciente.setDataNascimento("1985-05-15T00:00:00");
      paciente.setSexo("F");
      paciente.setCpf("98765432100");
      paciente.setRecemNascido("N");
      paciente.setParticular("N");
      paciente.setCns("987654321098765");

      // Configura dados da internação para prorrogação
      internacao.setSituacao("2"); // Prorrogação
      internacao.setCaraterInternacao("2"); // Urgência
      internacao.setProcedencia("I"); // Instituição
      internacao.setLeito(`LEITO${String(i + 1).padStart(3, "0")}`);
      internacao.setNumeroOperadora("987654321");
      internacao.setNumeroRegistro(`REG${String(i + 1).padStart(6, "0")}`);
      internacao.setDataInternacao(
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      ); // 7 dias atrás
      internacao.setCodigoCidPrincipal("B00.0");
      internacao.setInternadoOutrasVezes("S");
      internacao.setHospitalInternacaoAnterior("N");
      internacao.setReiternacao("N");
      internacao.setRecaida("N");

      // Adiciona entidades relacionadas
      internacao.addHospital(hospital);
      internacao.addPaciente(paciente);
      internacao.addOpradora(operadora);
      internacao.addMedico(medico);

      data.push({
        id: uuidv4(),
        situacao: "PRORROGACAO",
        internacao: internacao,
        hospital: hospital,
        paciente: paciente,
        operadora: operadora,
        medico: medico,
        createdAt: new Date(),
      });
    }
    return data;
  }

  async generateSuplementarData(count: number = 1) {
    const data = [];
    for (let i = 0; i < count; i++) {
      // Cria instâncias dos modelos
      const hospital = new Hospital();
      const paciente = new Paciente();
      const internacao = new Internacao();
      const operadora = new Operadora();
      const medico = new Medico();

      // Configura dados do hospital
      hospital.setCodigo(`HOSP${String(i + 1).padStart(3, "0")}`);
      hospital.setNome(`Hospital Teste ${i + 1}`);
      hospital.setCnes(`123456${String(i + 1).padStart(2, "0")}`);
      hospital.setPorte("3"); // Grande
      hospital.setComplexidade("2"); // Alta complexidade
      hospital.setEsferaAdministrativa("2"); // Estadual
      hospital.setUf("RJ");
      hospital.setCidade("3304557"); // Rio de Janeiro
      hospital.setTipoLogradouro("Avenida");
      hospital.setLogradouro(`Av. Teste ${i + 1}`);
      hospital.setNumeroLogradouro(`${200 + i}`);
      hospital.setBairro("Copacabana");
      hospital.setCep("22000000");

      // Configura dados do paciente
      paciente.setDataNascimento("1975-12-10T00:00:00");
      paciente.setSexo("M");
      paciente.setCpf("11122233344");
      paciente.setRecemNascido("N");
      paciente.setParticular("S"); // Particular para suplementar
      paciente.setCns("111222333444555");

      // Configura dados da internação para suplementar
      internacao.setSituacao("3"); // Suplementar
      internacao.setCaraterInternacao("3"); // Emergência
      internacao.setProcedencia("U"); // UPA
      internacao.setLeito(`LEITO${String(i + 1).padStart(3, "0")}`);
      internacao.setNumeroOperadora(""); // Vazio para particular
      internacao.setNumeroRegistro(`REG${String(i + 1).padStart(6, "0")}`);
      internacao.setDataInternacao(
        new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      ); // 3 dias atrás
      internacao.setCodigoCidPrincipal("C00.0");
      internacao.setInternadoOutrasVezes("N");
      internacao.setHospitalInternacaoAnterior("N");
      internacao.setReiternacao("N");
      internacao.setRecaida("N");

      // Adiciona entidades relacionadas
      internacao.addHospital(hospital);
      internacao.addPaciente(paciente);
      internacao.addOpradora(operadora);
      internacao.addMedico(medico);

      data.push({
        id: uuidv4(),
        situacao: "SUPLEMENTAR",
        internacao: internacao,
        hospital: hospital,
        paciente: paciente,
        operadora: operadora,
        medico: medico,
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
