import type { Content } from "pdfmake/interfaces";

export function introducaoPadrao(): Content[] {
  return [
    {
      text: "ILUSTRÍSSIMO (A) SENHOR (A) DOUTOR (A) SUPERINTENDENTE DO DEPARTAMENTO DE TRÂNSITO DO ÓRGÃO AUTUADOR",
      style: "introducao",
    },
  ];
}

export function introducaoCetran(): Content[] {
  return [
    {
      text: "ILUSTRÍSSIMO (A) SENHOR (A) DOUTOR (A) PRESIDENTE DA JUNTA ADMINISTRATIVA DE RECURSOS DO CONSELHO ESTADUAL DE TRÂNSITO – CETRAN",
      style: "introducao",
    },
  ];
}
