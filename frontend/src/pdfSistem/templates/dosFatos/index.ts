import { PdfContext } from "@/pdfSistem/types";
import type { Content } from "pdfmake/interfaces";

export function dosFatosPadrao(): Content[] {
  return [
    {
      text: "DOS FATOS",
      style: "titleSection",
    },
    {
      text: [
        "Ao que se vislumbra, o ",
        { text: "REQUERENTE ", style: "textBold" },
        "recebeu referida notificação de infração, e não concordando com ela, vem expor os fatos comprovando o erro do órgão autuador.",
      ],
      style: "paragrafos",
    },
    {
      text: "Desta feita, há de se fazer importantes considerações, no sentido de se averiguar a verdadeira situação fática ensejadora do pronto e necessário arquivamento da multa, com a decorrente nulidade da pontuação.",
      style: "paragrafos",
    },
  ];
}

export function dosFatosComComentario({
  dadosFormulario,
}: PdfContext): Content[] {
  return [
    {
      text: "DOS FATOS",
      style: "titleSection",
    },
    {
      text: [
        "Ao que se vislumbra, o ",
        { text: "REQUERENTE ", style: "textBold" },
        "recebeu referida notificação de infração, e não concordando com ela, vem expor os fatos comprovando o erro do órgão autuador.",
      ],
      style: "paragrafos",
    },
    {
      text: [
        { text: `“${dadosFormulario.fatoComentario}”` },
        "(relato breve do que ocorreu no momento da infração).",
      ],
      style: "paragrafos",
    },
    {
      text: "Desta feita, há de se fazer importantes considerações, no sentido de se averiguar a verdadeira situação fática ensejadora do pronto e necessário arquivamento da multa, com a decorrente nulidade da pontuação.",
      style: "paragrafos",
    },
  ];
}
