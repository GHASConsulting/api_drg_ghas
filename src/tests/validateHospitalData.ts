import { TestDataGenerator } from "./testDataGenerator";

/**
 * Script para validar se os dados do hospital INOVEMED estão sendo carregados corretamente
 */
export async function validateHospitalData(): Promise<void> {
  console.log("🏥 Validando dados do Hospital INOVEMED...");

  const generator = new TestDataGenerator();

  try {
    // Carrega os dados base
    await generator.loadBaseData();

    // Gera dados de teste para cada situação
    const admissionalData = await generator.generateAdmissionalData();
    const prorrogacaoData = await generator.generateProrrogacaoData();
    const suplementarData = await generator.generateSuplementarData();

    console.log("\n📋 Dados do Hospital INOVEMED:");
    if (admissionalData.length > 0) {
      const hospital = admissionalData[0].hospital;
      if (hospital) {
        console.log(`  - Código: ${hospital.cd_hospital || "N/A"}`);
        console.log(`  - Nome: ${hospital.nm_hospital || "N/A"}`);
        console.log(`  - CNES: ${hospital.cnes_hospital || "N/A"}`);
        console.log(`  - UF: ${hospital.uf_hospital || "N/A"}`);
        console.log(`  - Cidade: ${hospital.cidade_hospital || "N/A"}`);
        console.log(
          `  - Endereço: ${hospital.tp_logradouro_hospital || ""} ${hospital.logradouro_hospital || ""}, ${hospital.nr_logradouro_hospital || ""}`
        );
        console.log(`  - Bairro: ${hospital.bairro_hospital || "N/A"}`);
        console.log(`  - CEP: ${hospital.cep_hospital || "N/A"}`);
      } else {
        console.log("  - Dados do hospital não disponíveis");
      }
    }

    console.log("\n✅ Validação dos cenários:");
    console.log(
      `  - Admissional: ${admissionalData.length} registros (Situação: ${admissionalData[0]?.situacao || "N/A"})`
    );
    console.log(
      `  - Prorrogação: ${prorrogacaoData.length} registros (Situação: ${prorrogacaoData[0]?.situacao || "N/A"})`
    );
    console.log(
      `  - Suplementar: ${suplementarData.length} registros (Situação: ${suplementarData[0]?.situacao || "N/A"})`
    );

    console.log("\n🔍 Dados gerados:");
    console.log(`  - Admissional: ${admissionalData.length} registros`);
    console.log(`  - Prorrogação: ${prorrogacaoData.length} registros`);
    console.log(`  - Suplementar: ${suplementarData.length} registros`);

    console.log("\n✅ Dados do Hospital INOVEMED carregados com sucesso!");
    console.log(
      "🎯 Os testes agora podem ser executados com dados reais do hospital."
    );
  } catch (error) {
    console.error("❌ Erro ao validar dados do hospital:", error);
    throw error;
  }
}

// Executa a validação se o script for chamado diretamente
if (require.main === module) {
  validateHospitalData()
    .then(() => {
      console.log("\n🎉 Validação concluída com sucesso!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 Erro na validação:", error);
      process.exit(1);
    });
}
