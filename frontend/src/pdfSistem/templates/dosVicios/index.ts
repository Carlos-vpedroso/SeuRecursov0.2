import type { Content } from "pdfmake/interfaces";

export function dosViciosPadrao(): Content[] {
  return [
    {
      text: "DOS VÍCIOS INSANÁVEIS – OMISSÃO NA CONDUTA E OBSCURIDADE DE INFORMAÇÕES ESSENCIAIS",
      style: "titleSection",
    },
    {
      text: "Primeiramente, é essencial decretar a absoluta nulidade do presente auto de infração, pois o auto de infração encontra-se indisponível e houve vários vícios no procedimento, tais como:",
      style: "paragrafos",
    },
    {
      text: "> A OMISSÃO DE DADOS NA NOTIFICAÇÃO DE AUTUAÇÃO, GERANDO INCONSISTÊNCIA E IRREGULARIDADE NO REFERIDO AUTO DE INFRAÇÃO, CABENDO NULIDADE POR VÍCIO INSANÁVEL E OBSCURIDADE DE INFORMAÇÕES ESSENCIAIS.",
      style: "paragrafosBoldRight",
    },
    {
      text: "> NÃO HÁ O PREENCHIMENTO CONFORME ESTABELECIDO PELO MBFT E TOTAL DESCUMPRIMENTO FRENTE A MEDIDA ADMINISTRATIVA. ",
      style: "paragrafosBoldRight",
    },
    {
      text: [
        "Tratando-se de um estado ",
        { text: "DEMOCRÁTICO DE DIREITO. ", style: "textBold" },
        "O recorrente apenas exerceu seu direito de RECUSAR-SE a efetuar o referido teste. ",
      ],
      style: "paragrafos",
    },
    {
      text: [
        "Estaria a palavra do agente acima da lei? Sim, há presunção de verdade e fé publica em suas alegações, ",
        {
          text: "mas devido ao princípio da presunção de inocência",
          style: "textBoldUnderline",
        },
        ", a palavra do agente ",
        {
          text: "SEM QUALQUER FUNDAMENTAÇÃO OU MOTIVAÇÃO, NÃO HAVENDO QUALQUER PREENCHIMENTO",
          style: "textBold",
        },
        ", teria está palavra mais peso que a própria lei e princípios constitucionais? Ou perderia sua credibilidade em meio a tamanho vício? ",
      ],
      style: "paragrafos",
    },
    {
      text: "Sendo o que se sustenta, requer pelo total provimento da presente defesa e seu deferimento, para que haja cancelamento do AIT e posterior arquivamento do mesmo",
      style: "paragrafos",
    },
  ];
}
