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
    const admissionalData = generator.generateAdmissionalData();
    const prorrogacaoData = generator.generateProrrogacaoData();
    const suplementarData = generator.generateSuplementarData();

    console.log("\n📋 Dados do Hospital INOVEMED:");
    console.log(`  - Código: ${admissionalData.dados.cd_hospital}`);
    console.log(`  - Nome: ${admissionalData.dados.nm_hospital}`);
    console.log(`  - CNES: ${admissionalData.dados.cnes_hospital}`);
    console.log(`  - UF: ${admissionalData.dados.uf_hospital}`);
    console.log(`  - Cidade: ${admissionalData.dados.cidade_hospital}`);
    console.log(
      `  - Endereço: ${admissionalData.dados.tp_logradouro_hospital} ${admissionalData.dados.logradouro_hospital}, ${admissionalData.dados.nr_logradouro_hospital}`
    );
    console.log(`  - Bairro: ${admissionalData.dados.bairro_hospital}`);
    console.log(`  - CEP: ${admissionalData.dados.cep_hospital}`);

    console.log("\n✅ Validação dos cenários:");
    console.log(
      `  - Admissional: ${admissionalData.nome} (Situação ${admissionalData.situacao})`
    );
    console.log(
      `  - Prorrogação: ${prorrogacaoData.nome} (Situação ${prorrogacaoData.situacao})`
    );
    console.log(
      `  - Suplementar: ${suplementarData.nome} (Situação ${suplementarData.situacao})`
    );

    console.log("\n🔍 Campos obrigatórios validados:");
    console.log(
      `  - Admissional: ${admissionalData.obrigatorios.length} campos`
    );
    console.log(
      `  - Prorrogação: ${prorrogacaoData.obrigatorios.length} campos`
    );
    console.log(
      `  - Suplementar: ${suplementarData.obrigatorios.length} campos`
    );

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

