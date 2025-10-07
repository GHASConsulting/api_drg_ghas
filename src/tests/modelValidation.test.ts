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

/**
 * Testes de validação dos campos obrigatórios dos modelos DRG
 */
export class ModelValidationTests {
  private results: any[] = [];

  /**
   * Executa todos os testes de validação dos modelos
   */
  async runAllValidationTests(): Promise<{
    passed: number;
    failed: number;
    results: any[];
  }> {
    console.log("🔍 Iniciando Testes de Validação dos Modelos DRG");
    console.log("=".repeat(60));

    const tests = [
      { name: "Validação Hospital", test: () => this.testHospitalValidation() },
      { name: "Validação Paciente", test: () => this.testPacienteValidation() },
      {
        name: "Validação Internação",
        test: () => this.testInternacaoValidation(),
      },
      {
        name: "Validação Operadora",
        test: () => this.testOperadoraValidation(),
      },
      {
        name: "Validação Procedimento",
        test: () => this.testProcedimentoValidation(),
      },
      { name: "Validação Médico", test: () => this.testMedicoValidation() },
      {
        name: "Validação PartoAdequado",
        test: () => this.testPartoAdequadoValidation(),
      },
      {
        name: "Validação RN",
        test: () => this.testRnValidation(),
      },
      {
        name: "Validação SuporteVentilatorio",
        test: () => this.testSuporteVentilatorioValidation(),
      },
      {
        name: "Validação Relacionamentos",
        test: () => this.testRelacionamentosValidation(),
      },
    ];

    const results: any[] = [];
    let passed = 0;
    let failed = 0;

    for (const test of tests) {
      try {
        const startTime = Date.now();
        const result = await test.test();
        const duration = Date.now() - startTime;

        if (result.isValid) {
          passed++;
          console.log(`✅ ${test.name}: PASSOU (${duration}ms)`);
        } else {
          failed++;
          console.log(`❌ ${test.name}: FALHOU (${duration}ms)`);
          if (result.errors && result.errors.length > 0) {
            console.log(`   Erros: ${result.errors.join(", ")}`);
          }
        }

        results.push({
          name: test.name,
          passed: result.isValid,
          duration,
          errors: result.errors || [],
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        failed++;
        console.log(`❌ ${test.name}: ERRO - ${error}`);
        results.push({
          name: test.name,
          passed: false,
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
        });
      }
    }

    console.log("=".repeat(60));
    console.log(`📊 RESUMO: ${passed} passaram, ${failed} falharam`);
    console.log(
      `🎯 Taxa de sucesso: ${Math.round((passed / tests.length) * 100)}%`
    );

    return { passed, failed, results };
  }

  /**
   * Testa validação do modelo Hospital
   */
  async testHospitalValidation(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];
    const hospital = new Hospital();

    // Testa campos obrigatórios vazios
    const data = hospital.getData() as any;

    if (!data.codigo) errors.push("Código do hospital é obrigatório");
    if (!data.nome) errors.push("Nome do hospital é obrigatório");
    if (!data.cnes) errors.push("CNES do hospital é obrigatório");
    if (!data.porte) errors.push("Porte do hospital é obrigatório");
    if (!data.complexidade)
      errors.push("Complexidade do hospital é obrigatória");
    if (!data.esferaAdministrativa)
      errors.push("Esfera administrativa é obrigatória");
    if (!data.uf) errors.push("UF é obrigatória");
    if (!data.cidade) errors.push("Cidade é obrigatória");

    // Testa com dados válidos
    hospital.setCodigo("HOSP001");
    hospital.setNome("Hospital Teste");
    hospital.setCnes("12345678");
    hospital.setPorte("2");
    hospital.setComplexidade("2");
    hospital.setEsferaAdministrativa("4");
    hospital.setUf("SP");
    hospital.setCidade("3550308");

    const validData = hospital.getData() as any;
    if (!validData.codigo) errors.push("Código não foi definido corretamente");
    if (!validData.nome) errors.push("Nome não foi definido corretamente");
    if (!validData.cnes) errors.push("CNES não foi definido corretamente");

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa validação do modelo Paciente
   */
  async testPacienteValidation(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];
    const paciente = new Paciente();

    // Testa campos obrigatórios vazios
    const data = paciente.getData() as any;

    if (!data.dataNascimento) errors.push("Data de nascimento é obrigatória");
    if (!data.sexo) errors.push("Sexo é obrigatório");

    // Testa com dados válidos
    paciente.setDataNascimento("1990-01-01T00:00:00");
    paciente.setSexo("M");

    const validData = paciente.getData() as any;
    if (!validData.dataNascimento)
      errors.push("Data de nascimento não foi definida corretamente");
    if (!validData.sexo) errors.push("Sexo não foi definido corretamente");

    // Testa validação de campos opcionais
    paciente.setCpf("12345678901");
    paciente.setRecemNascido("N");
    paciente.setParticular("N");
    paciente.setCns("123456789012345");

    const fullData = paciente.getData() as any;
    if (!fullData.cpf) errors.push("CPF não foi definido corretamente");
    if (!fullData.recemNascido)
      errors.push("Recém-nascido não foi definido corretamente");

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa validação do modelo Internação
   */
  async testInternacaoValidation(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];
    const internacao = new Internacao();

    // Testa campos obrigatórios vazios
    const data = internacao.getData() as any;

    if (!data.situacao) errors.push("Situação é obrigatória");
    if (!data.caraterInternacao)
      errors.push("Caráter da internação é obrigatório");
    if (!data.procedencia) errors.push("Procedência é obrigatória");
    if (!data.leito) errors.push("Leito é obrigatório");
    if (!data.dataInternacao) errors.push("Data de internação é obrigatória");
    if (!data.codigoCidPrincipal) errors.push("CID principal é obrigatório");

    // Testa com dados válidos
    internacao.setSituacao("1"); // Admissional
    internacao.setCaraterInternacao("1"); // Eletivo
    internacao.setProcedencia("M"); // Comunidade
    internacao.setLeito("LEITO001");
    internacao.setDataInternacao(new Date().toISOString());
    internacao.setCodigoCidPrincipal("A00.0");

    const validData = internacao.getData() as any;
    if (!validData.situacao)
      errors.push("Situação não foi definida corretamente");
    if (!validData.caraterInternacao)
      errors.push("Caráter não foi definido corretamente");
    if (!validData.procedencia)
      errors.push("Procedência não foi definida corretamente");

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa validação do modelo Operadora
   */
  async testOperadoraValidation(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];
    const operadora = new Operadora();

    // Testa campos obrigatórios vazios
    const data = operadora.getData() as any;

    if (!data.codigo) errors.push("Código da operadora é obrigatório");
    if (!data.plano) errors.push("Plano da operadora é obrigatório");

    // Testa com dados válidos
    operadora.setCodigo("OP001");
    operadora.setPlano("Plano Teste");

    const validData = operadora.getData() as any;
    if (!validData.codigo) errors.push("Código não foi definido corretamente");
    if (!validData.plano) errors.push("Plano não foi definido corretamente");

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa validação do modelo Procedimento
   */
  async testProcedimentoValidation(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];
    const procedimento = new Procedimento();

    // Testa campos obrigatórios vazios
    const data = procedimento.getData() as any;

    if (!data.codigoProcedimento)
      errors.push("Código do procedimento é obrigatório");
    if (!data.dataExecucao) errors.push("Data de execução é obrigatória");

    // Testa com dados válidos
    procedimento.setCodigoProcedimento("PROC001");
    procedimento.setDataExecucao(new Date().toISOString());
    procedimento.setDataAutorizacao(new Date().toISOString());
    procedimento.setDataSolicitacao(new Date().toISOString());
    procedimento.setDataExecucaoFinal(new Date().toISOString());
    // ✅ TESTANDO O NOVO CAMPO
    procedimento.setCodigoCirurgiaAviso("CIR001");

    const validData = procedimento.getData() as any;
    if (!validData.codigoProcedimento)
      errors.push("Código não foi definido corretamente");
    if (!validData.dataExecucao)
      errors.push("Data de execução não foi definida corretamente");
    if (!validData.dataSolicitacao)
      errors.push("Data de solicitação não foi definida corretamente");
    if (!validData.dataExecucaoFinal)
      errors.push("Data final de execução não foi definida corretamente");
    if (!validData.codigoCirurgiaAviso)
      errors.push("Código de cirurgia aviso não foi definido corretamente");

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa validação do modelo Médico
   */
  async testMedicoValidation(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];
    const medico = new Medico();

    // Testa campos obrigatórios vazios
    const data = medico.getData() as any;

    if (!data.nome) errors.push("Nome do médico é obrigatório");
    if (!data.crm) errors.push("CRM do médico é obrigatório");
    if (!data.uf) errors.push("UF do médico é obrigatória");
    if (!data.especialidade)
      errors.push("Especialidade do médico é obrigatória");
    if (!data.medicoResponsavel)
      errors.push("Médico responsável é obrigatório");

    // Testa com dados válidos
    medico.setNome("Dr. João Silva");
    medico.setCrm("123456");
    medico.setUf("SP");
    medico.setEspecialidade("Cardiologia");
    medico.setMedicoResponsavel("S");

    const validData = medico.getData() as any;
    if (!validData.nome) errors.push("Nome não foi definido corretamente");
    if (!validData.crm) errors.push("CRM não foi definido corretamente");

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa validação dos relacionamentos entre modelos
   */
  async testRelacionamentosValidation(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];

    // Cria instâncias dos modelos
    const hospital = new Hospital();
    const paciente = new Paciente();
    const internacao = new Internacao();
    const operadora = new Operadora();
    const medico = new Medico();

    // Configura dados básicos
    hospital.setCodigo("HOSP001");
    hospital.setNome("Hospital Teste");
    hospital.setCnes("12345678");
    hospital.setPorte("2");
    hospital.setComplexidade("2");
    hospital.setEsferaAdministrativa("4");
    hospital.setUf("SP");
    hospital.setCidade("3550308");

    paciente.setDataNascimento("1990-01-01T00:00:00");
    paciente.setSexo("M");

    operadora.setCodigo("OP001");
    operadora.setPlano("Plano Teste");

    medico.setNome("Dr. João Silva");
    medico.setCrm("123456");
    medico.setUf("SP");
    medico.setEspecialidade("Cardiologia");
    medico.setMedicoResponsavel("S");

    internacao.setSituacao("1");
    internacao.setCaraterInternacao("1");
    internacao.setProcedencia("M");
    internacao.setLeito("LEITO001");
    internacao.setDataInternacao(new Date().toISOString());
    internacao.setCodigoCidPrincipal("A00.0");

    // Testa relacionamentos
    internacao.addHospital(hospital);
    internacao.addPaciente(paciente);
    internacao.addOpradora(operadora);
    internacao.addMedico(medico);

    const internacaoData = internacao.getData() as any;

    if (!internacaoData.Hospital || internacaoData.Hospital.length === 0) {
      errors.push("Hospital não foi adicionado à internação");
    }

    if (
      !internacaoData.Beneficiario ||
      internacaoData.Beneficiario.length === 0
    ) {
      errors.push("Paciente não foi adicionado à internação");
    }

    if (!internacaoData.Operadora || internacaoData.Operadora.length === 0) {
      errors.push("Operadora não foi adicionada à internação");
    }

    if (!internacaoData.Medico || internacaoData.Medico.length === 0) {
      errors.push("Médico não foi adicionado à internação");
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa validação do modelo PartoAdequado
   */
  async testPartoAdequadoValidation(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];
    const partoAdequado = new PartoAdequado();

    // Testa com dados válidos completos
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
    partoAdequado.setUsoOcitocinaMisoprostol("3");
    partoAdequado.setParturienteAcompanhada("S");
    partoAdequado.setPresencaDoula("N");
    partoAdequado.setRealizadaEpisiotomia("N");
    partoAdequado.setHouveAleitamentoMaterno("S");
    partoAdequado.setQuandoOcorreuClampeamento("2");
    partoAdequado.setHouveMetodosAnalgesia("S");
    partoAdequado.setMetodoAnalgesia("Analgesia peridural");
    partoAdequado.setPerimetroCefalicoRn1("34.5");
    partoAdequado.setCesariana("N");
    partoAdequado.setMedicacaoInducaoParto("N");
    partoAdequado.setNumeroPartosAnteriores("0");

    const data = partoAdequado.getData() as any;

    // Validação básica dos campos principais
    if (!data.antecedentesObstetricos)
      errors.push("Antecedentes obstétricos não foram definidos");
    if (!data.apresentacaoFetalRn1)
      errors.push("Apresentação fetal RN1 não foi definida");
    if (!data.inicioTrabalhoParto)
      errors.push("Início do trabalho de parto não foi definido");

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa validação do modelo RN (Recém-Nascido)
   */
  async testRnValidation(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];
    const rn = new Rn();

    // Testa com dados válidos
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

    const data = rn.getData() as any;

    // Validação dos campos obrigatórios
    if (!data.pesoNascimento)
      errors.push("Peso de nascimento não foi definido");
    if (!data.sexo) errors.push("Sexo do RN não foi definido");
    if (!data.nascidoVivo) errors.push("Status nascido vivo não foi definido");

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa validação do modelo SuporteVentilatorio
   */
  async testSuporteVentilatorioValidation(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];
    const suporte = new SuporteVentilatorio();

    // Testa com dados válidos
    suporte.setTipo("I"); // Invasivo
    suporte.setTipoInvasivo("T"); // Traqueostomia
    suporte.setLocal("C"); // No CTI
    suporte.setDataInicial(new Date().toISOString());
    suporte.setDataFinal(new Date().toISOString());

    const data = suporte.getData() as any;

    // Validação dos campos
    if (!data.tipo)
      errors.push("Tipo de suporte ventilatório não foi definido");
    if (!data.local)
      errors.push("Local do suporte ventilatório não foi definido");
    if (!data.dataInicial) errors.push("Data inicial não foi definida");

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Testa validação de campos com valores inválidos
   */
  async testInvalidDataValidation(): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors = [];

    // Testa valores inválidos para sexo
    const paciente = new Paciente();
    paciente.setSexo("X"); // Valor inválido
    const data = paciente.getData() as any;

    if (data.sexo === "X") {
      errors.push("Sexo deve ser M, F ou I");
    }

    // Testa valores inválidos para situação
    const internacao = new Internacao();
    internacao.setSituacao("5"); // Valor inválido
    const internacaoData = internacao.getData() as any;

    if (internacaoData.situacao === "5") {
      errors.push("Situação deve ser 1, 2, 3 ou 4");
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }
}
