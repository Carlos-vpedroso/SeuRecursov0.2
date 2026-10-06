import type { Content } from "pdfmake/interfaces";

export function atosAdministrativoPadrao(): Content[] {
  return [
    {
      text: "DA MOTIVAÇÃO DOS ATOS ADMINISTRATIVOS",
      style: "titleSection",
    },
    {
      text: "Reza o artigo 50 da lei 9.784/99 que regula os atos administrativos, aplica parâmetros para que a administração pública siga e aja de acordo com os dizeres da lei. É impossível deixar de expor os dizeres de tal artigo que EXIGE que os órgãos públicos sigam tais parâmetros:",
      style: "paragrafos",
    },
    {
      text: "Art. 50. Os atos administrativos deverão ser motivados, com indicação dos fatos e dos fundamentos jurídicos, quando:",
      style: "textBoldRight",
    },
    {
      text: "I - neguem, limitem ou afetem direitos ou interesses;",
      style: "textBoldRight",
    },
    {
      text: "II - imponham ou agravem deveres, encargos ou sanções;",
      style: "textBoldRight",
    },
    {
      text: "III - decidam processos administrativos de concurso ou seleção pública;",
      style: "textBoldRight",
    },
    {
      text: "IV - dispensem ou declarem a inexigibilidade de processo licitatório;",
      style: "textBoldRight",
    },
    {
      text: "V - decidam recursos administrativos;",
      style: "textBoldRight",
    },
    {
      text: "VI - decorram de reexame de ofício;",
      style: "textBoldRight",
    },
    {
      text: "VII - deixem de aplicar jurisprudência firmada sobre a questão ou discrepem de pareceres, laudos, propostas e relatórios oficiais;",
      style: "textBoldRight",
    },
    {
      text: "VIII - importem anulação, revogação, suspensão ou convalidação de ato administrativo.",
      style: "textBoldRight",
    },
    {
      text: "§ 1º A motivação deve ser explícita, clara e congruente, podendo consistir em declaração de concordância com fundamentos de anteriores pareceres, informações, decisões ou propostas, que, neste caso, serão parte integrante do ato.",
      style: "textBoldRight",
    },
    {
      text: "§ 2º Na solução de vários assuntos da mesma natureza, pode ser utilizado meio mecânico que reproduza os fundamentos das decisões, desde que não prejudique direito ou garantia dos interessados.",
      style: "textBoldRight",
    },
    {
      text: "§ 3º A motivação das decisões de órgãos colegiados e comissões ou de decisões orais constará da respectiva ata ou de termo escrito.",
      style: "textBoldRight",
    },
  ];
}
