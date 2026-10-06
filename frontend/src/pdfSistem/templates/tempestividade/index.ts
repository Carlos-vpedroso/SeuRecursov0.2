import type { Content } from "pdfmake/interfaces";

export function tempestividadePadrao(): Content[] {
  return [
    {
      text: "DA TEMPESTIVIDADE",
      style: "titleSection",
    },

    {
      text: "O presente recurso é tempestivo, em razão ao posicionamento unânime dos Tribunais Superiores, “que o decurso do tempo não convalida o que nasceu invalido.” Confira-se:",
      style: "paragrafos",
    },
    {
      text: [
        "DIREITO ADMINISTRATIVO. ATO ADMINISTRATIVO NULO. IMPRESCRITIBILIDADE. DECRETO 20.910/32 - ART. 1º. ",
        {
          text: `1. Não se pode levar na devida linha de conta a tese da prescrição quinquenal (art. 1º do Decreto 20.910/32), em se tratando de ato administrativo nulo, porquanto, nestas condições, "o decurso do tempo não convalida o que nasceu inválido." Precedentes. 2. Recurso especial conhecido. `,
          style: "textBold",
        },
        "(STJ - REsp: 311044 RJ 2001/0031224-1, Relator: Ministro FERNANDO GONÇALVES, Data de Julgamento: 27/08/2002, T6 - SEXTA TURMA, Data de Publicação:  --> DJ 23/09/2002 p. 401) (grifei)",
      ],
      style: "paragrafosRight",
    },
    {
      text: "Assim fica nítida a validade do presente recurso, requerendo, assim, sua plena análise e seu total provimento pelos motivos elencados.",
      style: "paragrafos",
    },
  ];
}
