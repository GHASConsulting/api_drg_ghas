import database from "../config/database";
import { v4 as uuidv4 } from "uuid";
import { Hospital } from "../models/hospital";
import { Paciente } from "../models/paciente";
import { Internacao } from "../models/internacao";
import { Operadora } from "../models/operadora";
import { Procedimento } from "../models/procedimento";
import { Medico } from "../models/medico";
import { PartoAdequado } from "../models/partoAdequado";
import { Rn } from "../models/rn";
import { CidSecundario } from "../models/cidSecundario";
import { Cti } from "../models/cti";
import { SuporteVentilatorio } from "../models/suporteVentilatorio";
import { CateterVascularCentral } from "../models/cateterVascularCentral";
import { SondaVesicalDeDemora } from "../models/sondaVesicalDeDemora";
import { CondicaoAdquirida } from "../models/condicaoAdquirida";
import { AltaAdministrativa } from "../models/altaAdministrativa";
import { AnaliseCritica } from "../models/analiseCritica";
import { DispositivoTerapeutico } from "../models/dispositivoTerapeutico";
import { CausaExternaPermanencia } from "../models/causaExternaPermanencia";

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

      // Configura dados do hospital com base nos dados reais do INOVEMED
      hospital.setCodigo("9948"); // Código real do estabelecimento
      hospital.setNome("INOVEMED");
      hospital.setCnes("124"); // CNES real
      hospital.setPorte("2"); // Médio
      hospital.setComplexidade("2"); // Alta complexidade
      hospital.setEsferaAdministrativa("4"); // Privada
      hospital.setUf("MG");
      hospital.setCidade("Minas Gerais");
      hospital.setCodigoMunicipio("3145208"); // Código de Minas Gerais
      hospital.setTipoLogradouro("AVENIDA");
      hospital.setLogradouro("NISIO BATISTA DE OLIVEIRA");
      hospital.setNumeroLogradouro("400");
      hospital.setComplementoLogradouro("S/N");
      hospital.setBairro("SAO LUCAS");
      hospital.setCep("30240510");

      // Configura dados do paciente com base nos dados reais
      paciente.setDataNascimento("1971-06-19T00:00:00"); // Data real
      paciente.setSexo("F"); // Sexo real
      paciente.setCpf("50234242191"); // CPF real
      paciente.setRecemNascido("N");
      paciente.setParticular("N");
      paciente.setCns("702109711362597"); // CNS real
      paciente.setCodigoIdentificacao("702109711362597"); // Código de identificação
      paciente.setVulnerabilidadeSocial("N");
      // Endereço do paciente real
      paciente.setUf("SP");
      paciente.setCidade("SP");
      paciente.setCodigoMunicipio("3550308"); // Código SP
      paciente.setTipoLogradouro("RUA");
      paciente.setLogradouro("RUA 11");
      paciente.setNumeroLogradouro("337");
      paciente.setComplementoLogradouro("CASA");
      paciente.setBairro("JARDIM PRIMAVERA");
      paciente.setCep("15755036");

      // Configura dados da internação com base nos dados reais
      internacao.setSituacao("4"); // Situação 3 conforme dados reais
      internacao.setCaraterInternacao("1"); // Eletivo
      internacao.setProcedencia("M"); // Comunidade
      internacao.setLeito("LEITO_01"); // Leito de exemplo
      internacao.setNumeroOperadora("3945"); // Operadora real
      internacao.setNumeroRegistro("1539811"); // Registro real
      internacao.setNumeroAtendimento("6580261"); // Atendimento real
      internacao.setDataInternacao("2025-09-16T11:13:35"); // Data real
      internacao.setDataAlta("2025-09-16T17:13:35"); // Data real
      internacao.setCondicaoAlta("A"); // Alta para casa conforme dados reais
      internacao.setCodigoCidPrincipal("C50"); // CID real
      internacao.setInternadoOutrasVezes("S"); // Conforme dados reais
      internacao.setHospitalInternacaoAnterior("N");
      internacao.setReiternacao("N");
      internacao.setRecaida("N");
      internacao.setAcao("COMPLEMENTAR"); // Ação real
      internacao.setNenhumDispositivoTerapeutico("S");

      // Configura dados da operadora com base nos dados reais
      operadora.setCodigo("3945"); // Código real da operadora
      operadora.setNumeroCarteira("702109711362597"); // Carteira real
      operadora.setPlano("PLANO_TESTE"); // Plano de exemplo
      operadora.setDataValidade("2025-12-31T23:59:59"); // Data de validade

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

      // Configura dados do hospital (mesmo padrão do admissional) - INOVEMED
      hospital.setCodigo("9948");
      hospital.setNome("INOVEMED");
      hospital.setCnes("124");
      hospital.setPorte("2");
      hospital.setComplexidade("2");
      hospital.setEsferaAdministrativa("4");
      hospital.setUf("MG");
      hospital.setCidade("Minas Gerais");
      hospital.setCodigoMunicipio("3145208");
      hospital.setTipoLogradouro("AVENIDA");
      hospital.setLogradouro("NISIO BATISTA DE OLIVEIRA");
      hospital.setNumeroLogradouro("400");
      hospital.setComplementoLogradouro("S/N");
      hospital.setBairro("SAO LUCAS");
      hospital.setCep("30240510");

      // Configura dados do paciente
      paciente.setDataNascimento("1985-05-15T00:00:00");
      paciente.setSexo("F");
      paciente.setCpf("98765432100");
      paciente.setRecemNascido("N");
      paciente.setParticular("N");
      paciente.setCns("987654321098765");

      // Configura dados da internação para prorrogação
      internacao.setSituacao("4"); // Prorrogação
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
      internacao.setSituacao("4"); // Suplementar
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

  /**
   * Gera dados de teste específicos para Parto Adequado
   */
  async generatePartoAdequadoData(count: number = 1) {
    const data = [];
    for (let i = 0; i < count; i++) {
      // Cria instâncias dos modelos
      const hospital = new Hospital();
      const paciente = new Paciente();
      const internacao = new Internacao();
      const operadora = new Operadora();
      const medico = new Medico();
      const partoAdequado = new PartoAdequado();
      const rn = new Rn();
      const procedimento = new Procedimento();

      // Configura dados do hospital maternidade - INOVEMED (mesmo hospital para consistência)
      hospital.setCodigo("9948");
      hospital.setNome("INOVEMED");
      hospital.setCnes("124");
      hospital.setPorte("2"); // Médio
      hospital.setComplexidade("2"); // Alta complexidade
      hospital.setEsferaAdministrativa("4"); // Privada
      hospital.setUf("MG");
      hospital.setCidade("Minas Gerais");
      hospital.setCodigoMunicipio("3145208");
      hospital.setTipoLogradouro("AVENIDA");
      hospital.setLogradouro("NISIO BATISTA DE OLIVEIRA");
      hospital.setNumeroLogradouro("400");
      hospital.setComplementoLogradouro("S/N");
      hospital.setBairro("SAO LUCAS");
      hospital.setCep("30240510");

      // Configura dados da paciente gestante
      paciente.setDataNascimento("1995-03-20T00:00:00");
      paciente.setSexo("F");
      paciente.setCpf("11122233344");
      paciente.setRecemNascido("N");
      paciente.setParticular("N");
      paciente.setCns("111222333444555");

      // Configura dados da internação obstétrica
      internacao.setSituacao("4"); // Admissional
      internacao.setCaraterInternacao("2"); // Urgência
      internacao.setProcedencia("M"); // Comunidade
      internacao.setLeito(`OBSTETRICIA${String(i + 1).padStart(3, "0")}`);
      internacao.setNumeroOperadora("3945"); // Operadora real
      internacao.setNumeroRegistro(`PARTO${String(i + 1).padStart(6, "0")}`);
      internacao.setNumeroAtendimento(`PARTO${String(i + 1).padStart(7, "0")}`);
      internacao.setDataInternacao(new Date().toISOString());
      internacao.setCodigoCidPrincipal("O80.1"); // Parto normal

      // Configura dados do médico obstetra
      medico.setNome("Dr. João Obstetra");
      medico.setCrm("12345");
      medico.setUf("SP");
      medico.setEspecialidade("Ginecologia e Obstetrícia");
      medico.setMedicoResponsavel("S");

      // **CONFIGURA DADOS COMPLETOS DE PARTO ADEQUADO**
      partoAdequado.setAntecedentesObstetricos("NL"); // Nulípara
      partoAdequado.setNumeroCesareasAnteriores("0");
      partoAdequado.setApresentacaoFetalRn1("CF"); // Cefálica
      partoAdequado.setInicioTrabalhoParto("EP"); // Espontâneo
      partoAdequado.setRupturaUterina("N");
      partoAdequado.setLaceracaoPerineal("N");
      partoAdequado.setTransfusaoSanguinea("N");
      partoAdequado.setMorteMaterna("N");
      partoAdequado.setMorteFetalIntraparto("N");
      partoAdequado.setAdmissaoMaternaUti("N");
      partoAdequado.setRetornoSalaParto("N");
      partoAdequado.setIndiceSatisfacaoHospital("9");
      partoAdequado.setIndiceSatisfacaoEquipe("10");
      partoAdequado.setHouveContatoPele("S");
      partoAdequado.setPosicaoParto("2"); // Não Supino
      partoAdequado.setUsoOcitocinaMisoprostol("3"); // 3º Estágio
      partoAdequado.setParturienteAcompanhada("S");
      partoAdequado.setPresencaDoula("N");
      partoAdequado.setRealizadaEpisiotomia("N");
      partoAdequado.setHouveAleitamentoMaterno("S");
      partoAdequado.setQuandoOcorreuClampeamento("2"); // Até 30 segundos
      partoAdequado.setHouveMetodosAnalgesia("S");
      partoAdequado.setMetodoAnalgesia("Analgesia peridural");
      partoAdequado.setPerimetroCefalicoRn1("34.5");
      partoAdequado.setCesariana("N"); // Não foi cesariana
      partoAdequado.setMedicacaoInducaoParto("N");
      partoAdequado.setNumeroPartosAnteriores("0");

      // **CONFIGURA DADOS DO RN**
      rn.setPesoNascimento("3200");
      rn.setIdadeGestacional("39.0");
      rn.setComprimento("50.5");
      rn.setSexo("M");
      rn.setNascidoVivo("S");
      rn.setTocotraumatismo("N");
      rn.setApgar("S");
      rn.setApgarQuintoMinuto("9");
      rn.setAlta48horas("S");
      rn.setNumeroAutorizacaoMae("AUTH12345");
      rn.setNumeroAtendimentoMae("ATEND12345");
      rn.setNumeroCarteiraMae("CART12345");

      // **CONFIGURA PROCEDIMENTO COM CAMPO NOVO**
      procedimento.setCodigoProcedimento("0310010020"); // Parto normal
      procedimento.setDataExecucao(new Date().toISOString());
      procedimento.setDataSolicitacao(new Date().toISOString());
      procedimento.setDataExecucaoFinal(new Date().toISOString());
      // ✅ TESTANDO O NOVO CAMPO
      procedimento.setCodigoCirurgiaAviso("PARTO001");

      // Adiciona entidades relacionadas
      internacao.addHospital(hospital);
      internacao.addPaciente(paciente);
      internacao.addOpradora(operadora);
      internacao.addMedico(medico);
      internacao.addPartoAdequado(partoAdequado);
      internacao.addRn(rn);
      internacao.addProcedimento(procedimento);

      data.push({
        id: uuidv4(),
        situacao: "PARTO_ADEQUADO",
        internacao: internacao,
        hospital: hospital,
        paciente: paciente,
        operadora: operadora,
        medico: medico,
        partoAdequado: partoAdequado,
        rn: rn,
        procedimento: procedimento,
        createdAt: new Date(),
      });
    }
    return data;
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
