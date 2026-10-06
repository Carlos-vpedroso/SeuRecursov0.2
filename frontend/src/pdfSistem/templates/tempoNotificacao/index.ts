import type { Content } from "pdfmake/interfaces";

export function tempoNotificacaoPadrao(): Content[] {
  return [
    {
      text: "PRELIMINARMENTE - DA NULIDADE DO AUTO DE INFRAÇÃO",
      style: "titleSection",
    },

    {
      text: "O presente auto de infração merece nulidade imediata de maneira preliminar, em razão de sua expedição ter sido realizada após o prazo de 30 dias, contados do dia em que ocorreu a suposta infração. O artigo 281, II, do Código de Trânsito Brasileiro corrobora com o alegado.",
      style: "paragrafos",
    },

    {
      text: "ART 281:",
      style: "paragrafosBoldRight",
    },

    {
      text: "A autoridade de trânsito, na esfera da competência estabelecida neste Código e dentro de sua circunscrição, julgará a consistência do auto de infração e aplicará a penalidade cabível.",
      style: "paragrafosBoldRight",
    },

    {
      text: "§ 1º O auto de infração será arquivado e seu registro julgado insubsistente: (Renumerado do parágrafo único pela Lei nº 14.304, de 2022)",
      style: "paragrafosBoldRight",
    },
    {
      text: "I - se considerado inconsistente ou irregular;",
      style: "paragrafosBoldRight",
    },
    {
      text: "II - se, no prazo máximo de trinta dias, não for expedida a notificação da autuação.",
      style: "paragrafosBoldRight",
    },
    {
      text: "(Redação do inciso II dada pela Lei n. 9.602/98)",
      style: "paragrafosBoldRight",
    },
    {
      text: "Dessa forma, requer a nulidade do auto de infração de maneira preliminar, e consequentemente o arquivamento deste.",
      style: "paragrafos",
    },
  ];
}
