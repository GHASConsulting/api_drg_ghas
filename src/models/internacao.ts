import { AltaAdministrativa } from "./altaAdministrativa";
import { AnaliseCritica } from "./analiseCritica";
import { CateterVascularCentral } from "./cateterVascularCentral";
import { CausaExternaPermanencia } from "./causaExternaPermanencia";
import { CidSecundario } from "./cidSecundario";
import { CondicaoAdquirida } from "./condicaoAdquirida";
import { CondicaoAdquiridaCateterVascularCentral } from "./condicaoAdquiridaCateterVascularCentral";
import { CondicaoAdquiridaSondaVesicalDeDemora } from "./condicaoAdquiridaSondaVesicalDeDemora";
import { CondicaoAdquiridaSuporteVentilatorio } from "./condicaoAdquiridaSuporteVentilatorio";
import { Cti } from "./cti";
import { DispositivoTerapeutico } from "./dispositivoTerapeutico";
import { Hospital } from "./hospital";
import { Medico } from "./medico";
import { MedicoProcedimento } from "./medicoProcedimento";
import { Operadora } from "./operadora";
import { Paciente } from "./paciente";
import { PartoAdequado } from "./partoAdequado";
import { Procedimento } from "./procedimento";
import { Rn } from "./rn";
import { SondaVesicalDeDemora } from "./sondaVesicalDeDemora";
import { SuporteVentilatorio } from "./suporteVentilatorio";

export class Internacao {
  // Campos básicos da internação (conforme documentação DRG)
  private situacao: string; // 1-Admissional, 2-Prorrogação, 3-Alta, 4-Autorização
  private caraterInternacao: string; // 1-Eletivo, 2-Urgência, 3-Emergência, 4-Trauma, 9-Não Definido
  private procedencia: string; // M-Comunidade, I-Instituição, D-Atenção domiciliar, C-Transferido hospital curta, L-Transferido hospital longa, P-Próprio Hospital, U-UPA
  private leito: string; // Número do leito (máx 50 caracteres)
  private numeroOperadora: string; // Número da operadora-Fonte Pagadora (máx 25 caracteres)
  private numeroRegistro: string; // Número de identificação do paciente no Hospital (máx 25 caracteres)
  private numeroAtendimento: string; // Número de atendimento (máx 25 caracteres)
  private numeroAutorizacao: string; // Número da autorização (máx 25 caracteres)
  private dataInternacao: string; // Data e hora de internação (yyyy-MM-ddTHH:mm:ss)
  private dataAlta: string; // Data e hora da alta (yyyy-MM-ddTHH:mm:ss)
  private condicaoAlta: string; // A-Casa, I-Instituição longa, D-Atenção domiciliar, P-Alta pedido, C-Transferido curta, L-Transferido longa, O-Óbito, E-Evasão
  private dataAutorizacao: string; // Data da autorização (yyyy-MM-ddTHH:mm:ss)
  private codigoCidPrincipal: string; // Código CID principal (máx 15 caracteres)
  private internadoOutrasVezes: string; // S-Sim, N-Não, I-Informação não disponível
  private hospitalInternacaoAnterior: string; // N-Neste Hospital, O-Outro Hospital, I-Informação não disponível
  private reinternacao: string; // S-Sim, N-Não, I-Informação não disponível
  private recaida: string; // S-Sim, N-Não, I-Informação não disponível
  private acao: string; // COMPLEMENTAR, EXCLUIR, INCLUIR, SUBSTITUIR
  private nenhumDispositivoTerapeutico: string; // S-Sim, N-Não
  private nota: string; // Notas do prontuário (máx 50000 caracteres)
  private tipoNota: string; // A-Admissão, L-Alta
  private dataNota: string; // Data da nota (yyyy-MM-ddTHH:mm:ss)

  // Entidades relacionadas
  private hospital: Hospital;
  private hospitais: Hospital[];
  private paciente: Paciente;
  private pacientes: Paciente[];
  private medico: Medico;
  private medicos: Medico[];
  private operadora: Operadora;
  private operadoras: Operadora[];
  private cidSecundario: CidSecundario;
  private cidsSecundarios: CidSecundario[];
  private procedimento: Procedimento;
  private procedimentos: Procedimento[];
  private cti: Cti;
  private ctis: Cti[];
  private suporteVentilatorio: SuporteVentilatorio;
  private suportesVentilatorios: SuporteVentilatorio[];
  private condicaoAdquirida: CondicaoAdquirida;
  private condicoesAdquiridas: CondicaoAdquirida[];
  private altaAdministrativa: AltaAdministrativa;
  private altasAdministrativas: AltaAdministrativa[];
  private partoAdequado: PartoAdequado;
  private partosAdequados: PartoAdequado[];
  private sondaVesicualDeDemora: SondaVesicalDeDemora;
  private sondasVesicularesDeDemora: SondaVesicalDeDemora[];
  private cateterVascularCentral: CateterVascularCentral;
  private cateteresVascularesCentral: CateterVascularCentral[];
  private medicoProcedimento: MedicoProcedimento;
  private medicosProcedimento: MedicoProcedimento[];

  // Novos modelos da documentação DRG
  private rn: Rn;
  private rns: Rn[];
  private analiseCritica: AnaliseCritica;
  private analisesCriticas: AnaliseCritica[];
  private dispositivoTerapeutico: DispositivoTerapeutico;
  private dispositivosTerapeuticos: DispositivoTerapeutico[];
  private causaExternaPermanencia: CausaExternaPermanencia;
  private causasExternasPermanencia: CausaExternaPermanencia[];
  private condicaoAdquiridaSondaVesicalDeDemora: CondicaoAdquiridaSondaVesicalDeDemora;
  private condicoesAdquiridasSondaVesicalDeDemora: CondicaoAdquiridaSondaVesicalDeDemora[];
  private condicaoAdquiridaCateterVascularCentral: CondicaoAdquiridaCateterVascularCentral;
  private condicoesAdquiridasCateterVascularCentral: CondicaoAdquiridaCateterVascularCentral[];
  private condicaoAdquiridaSuporteVentilatorio: CondicaoAdquiridaSuporteVentilatorio;
  private condicoesAdquiridasSuporteVentilatorio: CondicaoAdquiridaSuporteVentilatorio[];
  constructor() {
    // Inicialização dos campos básicos
    this.situacao = "";
    this.caraterInternacao = "";
    this.procedencia = "";
    this.leito = "";
    this.numeroOperadora = "";
    this.numeroRegistro = "";
    this.numeroAtendimento = "";
    this.numeroAutorizacao = "";
    this.dataInternacao = "";
    this.dataAlta = "";
    this.condicaoAlta = "";
    this.dataAutorizacao = "";
    this.codigoCidPrincipal = "";
    this.internadoOutrasVezes = "";
    this.hospitalInternacaoAnterior = "";
    this.reinternacao = "";
    this.recaida = "";
    this.acao = "";
    this.nenhumDispositivoTerapeutico = "";
    this.nota = "";
    this.tipoNota = "";
    this.dataNota = "";

    // Inicialização das entidades relacionadas
    this.hospital = new Hospital();
    this.hospitais = [];
    this.paciente = new Paciente();
    this.pacientes = [];
    this.medico = new Medico();
    this.medicos = [];
    this.operadora = new Operadora();
    this.operadoras = [];
    this.cidSecundario = new CidSecundario();
    this.cidsSecundarios = [];
    this.procedimento = new Procedimento();
    this.procedimentos = [];
    this.cti = new Cti();
    this.ctis = [];
    this.suporteVentilatorio = new SuporteVentilatorio();
    this.suportesVentilatorios = [];
    this.condicaoAdquirida = new CondicaoAdquirida();
    this.condicoesAdquiridas = [];
    this.altaAdministrativa = new AltaAdministrativa();
    this.altasAdministrativas = [];
    this.partoAdequado = new PartoAdequado();
    this.partosAdequados = [];
    this.sondaVesicualDeDemora = new SondaVesicalDeDemora();
    this.sondasVesicularesDeDemora = [];
    this.cateterVascularCentral = new CateterVascularCentral();
    this.cateteresVascularesCentral = [];
    this.medicoProcedimento = new MedicoProcedimento();
    this.medicosProcedimento = [];

    // Inicialização dos novos modelos
    this.rn = new Rn();
    this.rns = [];
    this.analiseCritica = new AnaliseCritica();
    this.analisesCriticas = [];
    this.dispositivoTerapeutico = new DispositivoTerapeutico();
    this.dispositivosTerapeuticos = [];
    this.causaExternaPermanencia = new CausaExternaPermanencia();
    this.causasExternasPermanencia = [];
    this.condicaoAdquiridaSondaVesicalDeDemora =
      new CondicaoAdquiridaSondaVesicalDeDemora();
    this.condicoesAdquiridasSondaVesicalDeDemora = [];
    this.condicaoAdquiridaCateterVascularCentral =
      new CondicaoAdquiridaCateterVascularCentral();
    this.condicoesAdquiridasCateterVascularCentral = [];
    this.condicaoAdquiridaSuporteVentilatorio =
      new CondicaoAdquiridaSuporteVentilatorio();
    this.condicoesAdquiridasSuporteVentilatorio = [];
  }

  public addHospital(hospital: Hospital): void {
    this.hospitais.push(hospital);
  }

  public addPaciente(paciente: Paciente): void {
    this.pacientes.push(paciente);
  }

  public addOpradora(operadora: Operadora): void {
    this.operadoras.push(operadora);
  }

  public addMedico(medico: Medico): void {
    this.medicos.push(medico);
  }

  public addCidSecundario(cidSecundario: CidSecundario): void {
    this.cidsSecundarios.push(cidSecundario);
  }

  public addProcedimento(procedimento: Procedimento): void {
    this.procedimentos.push(procedimento);
  }

  public addCti(cti: Cti): void {
    this.ctis.push(cti);
  }

  public addSuporteVentilatorio(
    suporteVentilatorio: SuporteVentilatorio
  ): void {
    this.suportesVentilatorios.push(suporteVentilatorio);
  }

  public addCondicaoAdquirida(condicaoAdquirida: CondicaoAdquirida): void {
    this.condicoesAdquiridas.push(condicaoAdquirida);
  }

  public addAltaAdministrativa(altaAdministrativa: AltaAdministrativa): void {
    this.altasAdministrativas.push(altaAdministrativa);
  }

  public addPartoAdequado(partoAdequado: PartoAdequado): void {
    this.partosAdequados.push(partoAdequado);
  }

  public addSondaVesicalDeDemora(
    sondaVesicalDeDemora: SondaVesicalDeDemora
  ): void {
    this.sondasVesicularesDeDemora.push(sondaVesicalDeDemora);
  }

  public addCateterVascularCentral(
    cateterVascularCentral: CateterVascularCentral
  ): void {
    this.cateteresVascularesCentral.push(cateterVascularCentral);
  }

  public addRn(rn: Rn): void {
    this.rns.push(rn);
  }

  public addAnaliseCritica(analiseCritica: AnaliseCritica): void {
    this.analisesCriticas.push(analiseCritica);
  }

  public addDispositivoTerapeutico(
    dispositivoTerapeutico: DispositivoTerapeutico
  ): void {
    this.dispositivosTerapeuticos.push(dispositivoTerapeutico);
  }

  public addCausaExternaPermanencia(
    causaExternaPermanencia: CausaExternaPermanencia
  ): void {
    this.causasExternasPermanencia.push(causaExternaPermanencia);
  }

  public addCondicaoAdquiridaSondaVesicalDeDemora(
    condicaoAdquiridaSondaVesicalDeDemora: CondicaoAdquiridaSondaVesicalDeDemora
  ): void {
    this.condicoesAdquiridasSondaVesicalDeDemora.push(
      condicaoAdquiridaSondaVesicalDeDemora
    );
  }

  public addCondicaoAdquiridaCateterVascularCentral(
    condicaoAdquiridaCateterVascularCentral: CondicaoAdquiridaCateterVascularCentral
  ): void {
    this.condicoesAdquiridasCateterVascularCentral.push(
      condicaoAdquiridaCateterVascularCentral
    );
  }

  public addCondicaoAdquiridaSuporteVentilatorio(
    condicaoAdquiridaSuporteVentilatorio: CondicaoAdquiridaSuporteVentilatorio
  ): void {
    this.condicoesAdquiridasSuporteVentilatorio.push(
      condicaoAdquiridaSuporteVentilatorio
    );
  }

  // public addMedicoProcedimento(medicoProcedimento: MedicoProcedimento): void {
  //   this.medicosProcedimento.push(medicoProcedimento)
  // }
  // ------//

  public setSituacao(situacao: string): void {
    this.situacao = situacao;
  }

  public setCaraterInternacao(caraterInternacao: string): void {
    this.caraterInternacao = caraterInternacao;
  }

  public setNumeroAtendimento(numeroAtendimento: string): void {
    this.numeroAtendimento = numeroAtendimento;
  }

  public setNumeroAutorizacao(numeroAutorizacao: string): void {
    this.numeroAutorizacao = numeroAutorizacao;
  }

  public setDataInternacao(dataInternacao: string): void {
    this.dataInternacao = dataInternacao;
  }

  public setDataAlta(dataAlta: string): void {
    this.dataAlta = dataAlta;
  }

  public setCondicaoAlta(condicaoAlta: string): void {
    this.condicaoAlta = condicaoAlta;
  }

  public setDataAutorizacao(dataAutorizacao: string): void {
    this.dataAutorizacao = dataAutorizacao;
  }

  public setCodigoCidPrincipal(codigoCidPrincipal: string): void {
    this.codigoCidPrincipal = codigoCidPrincipal;
  }

  public setInternadoOutrasVezes(internadoOutrasVezes: string): void {
    this.internadoOutrasVezes = internadoOutrasVezes;
  }

  public setReiternacao(reiternacao: string): void {
    this.reinternacao = reiternacao;
  }

  public setRecaida(recaida: string): void {
    this.recaida = recaida;
  }

  public setHospitalInternacaoAnterior(
    hospitalInternacaoAnterior: string
  ): void {
    this.hospitalInternacaoAnterior = hospitalInternacaoAnterior;
  }

  public setAcao(acao: string): void {
    this.acao = acao;
  }

  public setProcedencia(procedencia: string): void {
    this.procedencia = procedencia;
  }

  public setLeito(leito: string): void {
    this.leito = leito;
  }

  public setNumeroOperadora(numeroOperadora: string): void {
    this.numeroOperadora = numeroOperadora;
  }

  public setNumeroRegistro(numeroRegistro: string): void {
    this.numeroRegistro = numeroRegistro;
  }

  public setNenhumDispositivoTerapeutico(
    nenhumDispositivoTerapeutico: string
  ): void {
    this.nenhumDispositivoTerapeutico = nenhumDispositivoTerapeutico;
  }

  public setNota(nota: string): void {
    this.nota = nota;
  }

  public setTipoNota(tipoNota: string): void {
    this.tipoNota = tipoNota;
  }

  public setDataNota(dataNota: string): void {
    this.dataNota = dataNota;
  }

  public getData(): object {
    return {
      // Campos básicos da internação
      situacao: this.situacao,
      caraterInternacao: this.caraterInternacao,
      procedencia: this.procedencia,
      leito: this.leito,
      numeroOperadora: this.numeroOperadora,
      numeroRegistro: this.numeroRegistro,
      numeroAtendimento: this.numeroAtendimento,
      numeroAutorizacao: this.numeroAutorizacao,
      dataInternacao: this.dataInternacao,
      dataAlta: this.dataAlta,
      condicaoAlta: this.condicaoAlta,
      dataAutorizacao: this.dataAutorizacao,
      codigoCidPrincipal: this.codigoCidPrincipal,
      internadoOutrasVezes: this.internadoOutrasVezes,
      hospitalInternacaoAnterior: this.hospitalInternacaoAnterior,
      reinternacao: this.reinternacao,
      recaida: this.recaida,
      acao: this.acao,
      nenhumDispositivoTerapeutico: this.nenhumDispositivoTerapeutico,
      nota: this.nota,
      tipoNota: this.tipoNota,
      dataNota: this.dataNota,

      // Entidades relacionadas
      Hospital: this.hospitais.map((hospital) => hospital.getData()),
      Beneficiario: this.pacientes.map((paciente) => paciente.getData()),
      Operadora: this.operadoras.map((operadora) => operadora.getData()),
      Medico: this.medicos.map((medico) => medico.getData()),
      CidSecundario: this.cidsSecundarios.map((cidSecundario) =>
        cidSecundario.getData()
      ),
      Procedimento: this.procedimentos.map((procedimento) =>
        procedimento.getData()
      ),
      Cti: this.ctis.map((cti) => cti.getData()),
      SuporteVentilatorio: this.suportesVentilatorios.map(
        (suporteVentilatorio) => suporteVentilatorio.getData()
      ),
      SondaVesicalDeDemora: this.sondasVesicularesDeDemora.map(
        (sondaVesicualDeDemora) => sondaVesicualDeDemora.getData()
      ),
      CateterVascularCentral: this.cateteresVascularesCentral.map(
        (cateterVascularCentral) => cateterVascularCentral.getData()
      ),
      CondicaoAdquirida: this.condicoesAdquiridas.map((condicaoAdquirida) =>
        condicaoAdquirida.getData()
      ),
      AltaAdministrativa: this.altasAdministrativas.map((altaAdministrativa) =>
        altaAdministrativa.getData()
      ),
      PartoAdequado: this.partosAdequados.map((partoAdequado) =>
        partoAdequado.getData()
      ),
      Rn: this.rns.map((rn) => rn.getData()),
      AnaliseCritica: this.analisesCriticas.map((analiseCritica) =>
        analiseCritica.getData()
      ),
      DispositivoTerapeutico: this.dispositivosTerapeuticos.map(
        (dispositivoTerapeutico) => dispositivoTerapeutico.getData()
      ),
      CausaExternaPermanencia: this.causasExternasPermanencia.map(
        (causaExternaPermanencia) => causaExternaPermanencia.getData()
      ),
      CondicaoAdquiridaSondaVesicalDeDemora:
        this.condicoesAdquiridasSondaVesicalDeDemora.map(
          (condicaoAdquiridaSondaVesicalDeDemora) =>
            condicaoAdquiridaSondaVesicalDeDemora.getData()
        ),
      CondicaoAdquiridaCateterVascularCentral:
        this.condicoesAdquiridasCateterVascularCentral.map(
          (condicaoAdquiridaCateterVascularCentral) =>
            condicaoAdquiridaCateterVascularCentral.getData()
        ),
      CondicaoAdquiridaSuporteVentilatorio:
        this.condicoesAdquiridasSuporteVentilatorio.map(
          (condicaoAdquiridaSuporteVentilatorio) =>
            condicaoAdquiridaSuporteVentilatorio.getData()
        ),
    };
  }
}
