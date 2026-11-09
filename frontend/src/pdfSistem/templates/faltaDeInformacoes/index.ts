import type { Content } from "pdfmake/interfaces";

export function faltaDeInformacoesPadrao(): Content[] {
  return [
    {
      text: "PRELIMINARES DE NULIDADE.",
      style: "titleSection",
    },
    {
      text: "DA FALTA DE INFORMAÇÕES SOBRE O EQUIPAMENTO OFERECIDO",
      style: "titleSection",
    },
    {
      text: "Prevê o artigo 5º, inciso I e II, da Resolução 1031/2026 do CONTRAN, que o instrumento do etilômetro deve, necessariamente, estar aferido anualmente pelo Inmetro. Segue abaixo o artigo:",
      style: "paragrafos",
    },
    {
      text: "Art. 5º O etilômetro deve atender aos seguintes requisitos:",
      style: "textBoldRight",
    },
    {
      text: "I - ter seu modelo aprovado pelo Instituto Nacional de Metrologia, Qualidade e Tecnologia - Inmetro; e",
      style: "textBoldRight",
    },
    {
      text: "II - ser aprovado na verificação metrológica inicial, eventual, em serviço e periódica realizadas pelo Inmetro ou por órgão da Rede Brasileira de Metrologia Legal e Qualidade - RBMLQ, conforme regulamentação metrológica.",
      style: "textBoldRight",
    },
    {
      text: "Ao analisar o auto de infração imposto a Recorrente, podemos observar que fica omisso as informações acerca do equipamento oferecido à recorrente, levando a conclusão que este se encontra em desacordo com o artigo 5º supracitado.",
      style: "paragrafos",
    },
    {
      text: [
        "Dessa forma, fica claro a necessidade de ",
        {
          text: "anulação imediata do auto de infração, em razão da omissão de um dado INDISPENSÁVEL, ferindo assim o contraditório e ampla defesa do condutor.",
          style: "textBold",
        },
      ],
      style: "paragrafos",
    },
  ];
}
