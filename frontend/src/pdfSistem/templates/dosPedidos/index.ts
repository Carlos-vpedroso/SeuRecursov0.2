import { PdfContext } from "@/pdfSistem/types";
import { formatarNome } from "@/pdfSistem/utils";
import type { Content } from "pdfmake/interfaces";

export function dosPedidosPadrao({
  dadosUsuario,
  endereco,
  dataFormatada,
}: PdfContext): Content[] {
  return [
    {
      text: "DOS PEDIDOS",
      style: "titleSection",
    },
    {
      text: "Estando demonstrada a absoluta inviabilidade jurídica dessa PENALIDADE, requer seja acolhido o presente recurso administrativo, com o consequente arquivamento do Auto de Infração aqui impugnado, nos termos do artigo 28, parágrafo único, I. Caso, contudo, não seja este o entendimento do julgador, requer seja a decisão devidamente motivada, sob pena de nulidade, a teor do Art. 50, I e II, parágrafo 1º, da Lei nº 9.784/99. E que haja notificação da decisão no endereço cadastrado da recorrente.",
      style: "paragrafos",
    },
    {
      text: "> Que suspenda seus efeitos até o julgamento;",
      style: "textBoldRight",
    },
    {
      text: "> Que seja convertido o ônus da prova ao órgão competente;",
      style: "textBoldRight",
    },
    {
      text: "> A improcedência da penalidade;",
      style: "textBoldRight",
    },
    {
      text: "> A declaração de nulidade do presente;",
      style: "textBoldRight",
    },
    {
      text: "> Que seja arquivado e julgado insubsistente.",
      style: "textBoldRight",
    },
    {
      text: "Termos em que, pede deferimento.",
      style: "paragrafosCenter",
    },
    {
      text: `${endereco.cidade}-${endereco.uf}, ${dataFormatada}.`,
      style: "cidadeAndData",
    },
    {
      text: "_________________________________",
      style: "assinatura",
    },
    {
      text: `${formatarNome(dadosUsuario.nome)}`,
      style: "assinatura",
    },
  ];
}
