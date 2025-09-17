import knex from "../../config/database";
import { LoteInternacao } from "../../models/loteInternacao";
import { buildInternacao } from "./helpers/buildInternacao";
import { xmlToJson } from "../../utils/xmlToJson";
import { makeRequest } from "../../utils/makeRequest";
import { writeLog } from "../../utils/writeLogs";
import { writeXmlLog } from "../../utils/writeXmlLog";
import { writeResumoLog } from "../../utils/writeResumolog";

/** @description Admission function select every record in DB where TP_STATUS is 'A', and sends it to SOAP API. */
export async function admission(
  dataAtendimentoFromDatabase: any[],
  hospitalCode?: number
) {
  const TBL_ATENDIMENTO = process.env.TBL_ATENDIMENTO;
  let contaInternacao = 0;
  let contErro = 0;
  let contSucesso = 0;
  let contaInternacaoEnviada = 0;

  // Se não foi passado hospitalCode, pega do primeiro item
  if (!hospitalCode && dataAtendimentoFromDatabase.length > 0) {
    hospitalCode = dataAtendimentoFromDatabase[0].CD_HOSPITAL;
  }

  // Processa cada atendimento individualmente
  for (const item of dataAtendimentoFromDatabase) {
    contaInternacao++;

    try {
      // Cria um lote individual para cada atendimento
      const loteInternacao = new LoteInternacao();
      const internacao = await buildInternacao(item);
      loteInternacao.addInternacao(internacao);

      // Gera XML individual para este atendimento
      const xml = loteInternacao.generateXML();

      // Log do XML individual por estabelecimento
      const logFileName = `atendimento_${item.CD_DTI_ATENDIMENTO}`;
      await writeXmlLog(xml, logFileName, hospitalCode);

      console.log(
        `Enviando atendimento ${item.CD_DTI_ATENDIMENTO} (${item.NR_ATENDIMENTO}) para hospital ${hospitalCode}`
      );

      // Envia o XML individual
      const response = await makeRequest(xml, hospitalCode!);
      console.log(
        `Resposta para atendimento ${item.CD_DTI_ATENDIMENTO}:`,
        response.status
      );

      // Processa a resposta individual
      if (response.data) {
        const jObj = await xmlToJson(response.data);
        const sEnvelope = jObj["S:Envelope"]?.["S:Body"]?.[0];

        if (sEnvelope) {
          const ns2ImportaInternacaoResponse =
            sEnvelope["ns2:importaInternacaoResponse"]?.[0];

          if (ns2ImportaInternacaoResponse) {
            const sBody = ns2ImportaInternacaoResponse.return;

            if (sBody) {
              const bodyResponseJson = await xmlToJson(sBody);
              const internacoesArray =
                bodyResponseJson.logInternacao.Internacao;

              if (internacoesArray && internacoesArray.length > 0) {
                const internacao = internacoesArray[0]; // Pega a primeira (e única) internação
                const codigoAtendimento = internacao.numeroAtendimento?.[0];
                const situacao = internacao.situacao?.[0];

                if (codigoAtendimento !== undefined && situacao !== undefined) {
                  contaInternacaoEnviada++;

                  if (situacao === "P") {
                    console.log(
                      `Atendimento ${item.CD_DTI_ATENDIMENTO} - Erro`
                    );
                    const erro = internacao.erro?.[0] ?? "Erro padrão";
                    await knex
                      .update({
                        TP_STATUS: "E",
                        DS_ERRO: erro,
                      })
                      .from(TBL_ATENDIMENTO)
                      .where("CD_DTI_ATENDIMENTO", item.CD_DTI_ATENDIMENTO);
                    contErro++;
                  } else {
                    console.log(
                      `Atendimento ${item.CD_DTI_ATENDIMENTO} - Sucesso`
                    );
                    await knex
                      .update({ TP_STATUS: "T" })
                      .from(TBL_ATENDIMENTO)
                      .where("CD_DTI_ATENDIMENTO", item.CD_DTI_ATENDIMENTO);
                    contSucesso++;
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(
        `Erro ao processar atendimento ${item.CD_DTI_ATENDIMENTO}:`,
        error
      );
      contErro++;

      // Log de erro por estabelecimento
      const errorLog = `
      === ERRO ESTABELECIMENTO ${hospitalCode} ===
      Data/Hora: ${new Date().toISOString()}
      Atendimento: ${item.CD_DTI_ATENDIMENTO}
      NR_Atendimento: ${item.NR_ATENDIMENTO}
      Erro: ${error.message || "Erro desconhecido"}
      Stack: ${error.stack || "N/A"}
      ==========================================
      `;
      await writeResumoLog(
        errorLog,
        `erro_atendimento_${item.CD_DTI_ATENDIMENTO}`,
        hospitalCode
      );

      // Marca como erro no banco
      await knex
        .update({
          TP_STATUS: "E",
          DS_ERRO: error.message || "Erro no processamento",
        })
        .from(TBL_ATENDIMENTO)
        .where("CD_DTI_ATENDIMENTO", item.CD_DTI_ATENDIMENTO);
    }
  }

  console.log("=== RESUMO DO PROCESSAMENTO ===");
  console.log(`Estabelecimento: ${hospitalCode}`);
  console.log("Total de atendimentos processados: " + contaInternacao);
  console.log("Sucesso: " + contSucesso);
  console.log("Erro: " + contErro);
  console.log("Internações enviadas: " + contaInternacaoEnviada);

  // Log de resumo por estabelecimento
  const resumoLog = `
    === RESUMO ESTABELECIMENTO ${hospitalCode} ===
    Data/Hora: ${new Date().toISOString()}
    Total de atendimentos processados: ${contaInternacao}
    Sucesso: ${contSucesso}
    Erro: ${contErro}
    Internações enviadas: ${contaInternacaoEnviada}
    Taxa de sucesso: ${contaInternacao > 0 ? ((contSucesso / contaInternacao) * 100).toFixed(2) : 0}%
    ==========================================
    `;
  await writeResumoLog(resumoLog, `resumo_processamento`, hospitalCode);
}
