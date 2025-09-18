import { date } from "zod";

// TO DO:
// - em teste desativado a funcao para teste.

/** @description Format date to format yyyy-MM-ddTHH:mm:ss */
export function converterData(dataStr: string | Date | null): string | null {
  // Como os dados já estão no formato correto no banco, retorna diretamente
  if (!dataStr) {
    return null;
  }

  // Se é um objeto Date, converte para string ISO
  if (dataStr instanceof Date) {
    return dataStr.toISOString();
  }

  // Converte para string se não for
  const dataString = String(dataStr);

  // Se já está no formato ISO (yyyy-MM-ddTHH:mm:ss), retorna como está
  if (dataString.includes("T") && dataString.includes(":")) {
    return dataString;
  }

  // Se está no formato DD/MM/YYYY HH24:MI:SS, converte
  const [date, time] = dataString.split(" ");

  if (!date || !time) {
    return dataString;
  }

  const [hora, minuto, segundo] = time.split(":");
  const [dia, mes, ano] = date.split("/");

  if (!dia || !mes || !ano || !hora || !minuto || !segundo) {
    return dataString;
  }

  const novaDataStr = `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}`;
  return novaDataStr;
}
// DD/MM/RRRR HH24:MI:SS

// yyyy-MM-ddTHH:mm:ss
