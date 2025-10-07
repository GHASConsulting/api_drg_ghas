import { TestDataGenerator } from "../tests/testDataGenerator";
import { makeRequest } from "../utils/makeRequest";
import { LoteInternacao } from "../models/loteInternacao";
import { Hospital } from "../models/hospital";
import { Paciente } from "../models/paciente";
import { Internacao } from "../models/internacao";
import { Operadora } from "../models/operadora";
import { Medico } from "../models/medico";
import { PartoAdequado } from "../models/partoAdequado";
import { Rn } from "../models/rn";
import { Procedimento } from "../models/procedimento";

/**
 * Script para envio REAL de dados para o DRG
 * Este script cria dados reais e envia via API SOAP
 */
export class RealSendToDRG {
  private dataGenerator: TestDataGenerator;

  constructor() {
    this.dataGenerator = new TestDataGenerator();
  }

  /**
   * Envia dados de admissão reais para o DRG
   */
  async sendAdmissionalData(count: number = 1): Promise<boolean> {
    console.log(
      `🚀 ENVIANDO DADOS REAIS DE ADMISSÃO PARA DRG (${count} registros)`
    );
    console.log("=".repeat(70));

    try {
      // Gera dados de admissão
      const admissionalData =
        await this.dataGenerator.generateAdmissionalData(count);
      console.log(`✅ ${admissionalData.length} registros de admissão gerados`);

      let successCount = 0;
      let errorCount = 0;

      // Processa cada registro
      for (let i = 0; i < admissionalData.length; i++) {
        const record = admissionalData[i];

        console.log(`\n📋 Processando Registro ${i + 1}:`);
        console.log(
          `   Hospital: ${record.hospital.getData().nome} (${record.hospital.getData().codigo})`
        );
        console.log(`   Paciente: CPF ${record.paciente.getData().cpf}`);
        console.log(
          `   Atendimento: ${record.internacao.getData().numeroAtendimento}`
        );

        try {
          // Cria lote de internação
          const loteInternacao = new LoteInternacao();
          loteInternacao.addInternacao(record.internacao);

          // Gera XML real
          const xml = loteInternacao.generateXML();
          console.log(`   📄 XML gerado: ✅ (${xml.length} caracteres)`);

          // ENVIO REAL para API SOAP
          console.log(`   📤 Enviando para API SOAP...`);
          const hospitalCode = parseInt(record.hospital.getData().codigo);
          const response = await makeRequest(xml, hospitalCode);

          if (response && response.status === 200) {
            successCount++;
            console.log(`   ✅ Envio realizado com sucesso!`);
            console.log(`   📊 Status: ${response.status}`);
            console.log(`   🕐 Timestamp: ${new Date().toISOString()}`);

            // Log da resposta
            if (response.data) {
              console.log(
                `   📝 Resposta da API: ${JSON.stringify(response.data).substring(0, 200)}...`
              );
            }
          } else {
            errorCount++;
            console.log(
              `   ❌ Erro no envio: Status ${response?.status || "N/A"}`
            );
            if (response?.data) {
              console.log(`   📝 Erro: ${JSON.stringify(response.data)}`);
            }
          }
        } catch (error) {
          errorCount++;
          console.log(`   ❌ Erro no processamento: ${error.message}`);
        }
      }

      // Resumo
      console.log(`\n🎯 RESUMO DO ENVIO REAL:`);
      console.log(`✅ Registros processados: ${admissionalData.length}`);
      console.log(`✅ Envios bem-sucedidos: ${successCount}`);
      console.log(`❌ Envios com erro: ${errorCount}`);
      console.log(
        `📈 Taxa de sucesso: ${((successCount / admissionalData.length) * 100).toFixed(1)}%`
      );

      return successCount === admissionalData.length;
    } catch (error) {
      console.error("❌ Erro no envio de admissão:", error);
      return false;
    }
  }

  /**
   * Envia dados de parto adequado reais para o DRG
   */
  async sendPartoAdequadoData(count: number = 1): Promise<boolean> {
    console.log(
      `🚀 ENVIANDO DADOS REAIS DE PARTO ADEQUADO PARA DRG (${count} registros)`
    );
    console.log("=".repeat(70));

    try {
      // Gera dados de parto adequado
      const partoData =
        await this.dataGenerator.generatePartoAdequadoData(count);
      console.log(`✅ ${partoData.length} registros de parto adequado gerados`);

      let successCount = 0;
      let errorCount = 0;

      // Processa cada registro
      for (let i = 0; i < partoData.length; i++) {
        const record = partoData[i];

        console.log(`\n📋 Processando Registro de Parto ${i + 1}:`);
        console.log(
          `   Hospital: ${record.hospital.getData().nome} (${record.hospital.getData().codigo})`
        );
        console.log(`   Paciente: CPF ${record.paciente.getData().cpf}`);
        console.log(
          `   Atendimento: ${record.internacao.getData().numeroAtendimento}`
        );
        console.log(
          `   Antecedentes: ${record.partoAdequado.getData().antecedentesObstetricos}`
        );
        console.log(`   Peso RN: ${record.rn.getData().pesoNascimento}g`);

        try {
          // Cria lote de internação
          const loteInternacao = new LoteInternacao();
          loteInternacao.addInternacao(record.internacao);

          // Gera XML real
          const xml = loteInternacao.generateXML();
          console.log(`   📄 XML gerado: ✅ (${xml.length} caracteres)`);

          // ENVIO REAL para API SOAP
          console.log(`   📤 Enviando para API SOAP...`);
          const hospitalCode = parseInt(record.hospital.getData().codigo);
          const response = await makeRequest(xml, hospitalCode);

          if (response && response.status === 200) {
            successCount++;
            console.log(`   ✅ Envio realizado com sucesso!`);
            console.log(`   📊 Status: ${response.status}`);
            console.log(`   🕐 Timestamp: ${new Date().toISOString()}`);

            // Log da resposta
            if (response.data) {
              console.log(
                `   📝 Resposta da API: ${JSON.stringify(response.data).substring(0, 200)}...`
              );
            }
          } else {
            errorCount++;
            console.log(
              `   ❌ Erro no envio: Status ${response?.status || "N/A"}`
            );
            if (response?.data) {
              console.log(`   📝 Erro: ${JSON.stringify(response.data)}`);
            }
          }
        } catch (error) {
          errorCount++;
          console.log(`   ❌ Erro no processamento: ${error.message}`);
        }
      }

      // Resumo
      console.log(`\n🎯 RESUMO DO ENVIO REAL DE PARTO ADEQUADO:`);
      console.log(`✅ Registros processados: ${partoData.length}`);
      console.log(`✅ Envios bem-sucedidos: ${successCount}`);
      console.log(`❌ Envios com erro: ${errorCount}`);
      console.log(
        `📈 Taxa de sucesso: ${((successCount / partoData.length) * 100).toFixed(1)}%`
      );

      return successCount === partoData.length;
    } catch (error) {
      console.error("❌ Erro no envio de parto adequado:", error);
      return false;
    }
  }

  /**
   * Executa envio completo (admissão + parto adequado)
   */
  async executeFullSend(): Promise<boolean> {
    console.log("🚀 EXECUTANDO ENVIO COMPLETO REAL PARA DRG");
    console.log("=".repeat(80));
    console.log("🎯 Objetivo: Enviar dados reais via API SOAP");
    console.log(
      "📤 Destino: https://iagwebservice.sigquali.com.br/iagwebservice/importaInternacao?wsdl"
    );
    console.log("=".repeat(80));

    try {
      // Envia dados de admissão
      const admissionalSuccess = await this.sendAdmissionalData(2);

      // Envia dados de parto adequado
      const partoSuccess = await this.sendPartoAdequadoData(2);

      // Resumo final
      console.log("\n🎯 RESUMO FINAL DO ENVIO REAL:");
      console.log("=".repeat(80));
      console.log(`✅ Admissão: ${admissionalSuccess ? "SUCESSO" : "FALHA"}`);
      console.log(`✅ Parto Adequado: ${partoSuccess ? "SUCESSO" : "FALHA"}`);
      console.log(`📤 Total de registros enviados: 4`);
      console.log(
        `🌐 API SOAP: https://iagwebservice.sigquali.com.br/iagwebservice/importaInternacao?wsdl`
      );

      const overallSuccess = admissionalSuccess && partoSuccess;

      if (overallSuccess) {
        console.log("\n🎉 ENVIO REAL PARA DRG CONCLUÍDO COM SUCESSO!");
        console.log("📝 Todos os dados foram enviados via API SOAP");
        console.log("✅ Sistema DRG recebeu os dados corretamente");
      } else {
        console.log("\n⚠️  ENVIO REAL PARCIALMENTE CONCLUÍDO");
        console.log("📝 Alguns dados não foram enviados com sucesso");
        console.log("🔍 Verifique os logs acima para detalhes");
      }

      return overallSuccess;
    } catch (error) {
      console.error("❌ Erro no envio completo:", error);
      return false;
    }
  }

  /**
   * Testa a conectividade com a API SOAP
   */
  async testAPIConnectivity(): Promise<boolean> {
    console.log("🔍 TESTANDO CONECTIVIDADE COM API SOAP");
    console.log("=".repeat(50));

    try {
      // Cria um XML de teste simples
      const testXML = `
        <DRG>
          <Header>
            <Versao>1.0</Versao>
            <DataEnvio>${new Date().toISOString()}</DataEnvio>
            <Estabelecimento>9948</Estabelecimento>
            <TipoRegistro>TESTE</TipoRegistro>
          </Header>
          <Teste>
            <Mensagem>Teste de conectividade</Mensagem>
            <Timestamp>${new Date().toISOString()}</Timestamp>
          </Teste>
        </DRG>
      `;

      console.log("📤 Enviando teste de conectividade...");
      const response = await makeRequest(testXML, 9948);

      if (response && response.status === 200) {
        console.log("✅ Conectividade OK!");
        console.log(`📊 Status: ${response.status}`);
        return true;
      } else {
        console.log("❌ Problema de conectividade");
        console.log(`📊 Status: ${response?.status || "N/A"}`);
        return false;
      }
    } catch (error) {
      console.error("❌ Erro no teste de conectividade:", error);
      return false;
    }
  }
}

// Execução direta se chamado como script
if (require.main === module) {
  const realSend = new RealSendToDRG();

  realSend
    .executeFullSend()
    .then((success) => {
      console.log(`\n🏆 Resultado final: ${success ? "SUCESSO" : "FALHA"}`);
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error("Erro fatal:", error);
      process.exit(1);
    });
}
