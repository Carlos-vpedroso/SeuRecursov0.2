import type { Content } from "pdfmake/interfaces";

export function defesaPrevia(): Content[] {
  return [
    {
      text: "DEFESA PRÉVIA",
      style: "titleSection",
    },

    {
      text: "Em face da penalidade de infração aplicada, de forma arbitrária, conforme será demonstrado a seguir.",
      style: "paragrafos",
    },
  ];
}

export function defesaJari(): Content[] {
  return [
    {
      text: "RECURSO ADMINISTRATIVO",
      style: "titleSection",
    },

    {
      text: "Em face da penalidade de infração aplicada, de forma arbitrária, conforme será demonstrado a seguir.",
      style: "paragrafos",
    },
  ];
}

export function defesaCetran(): Content[] {
  return [
    {
      text: "RECURSO ADMINISTRATIVO AO CETRAN",
      style: "titleSection",
    },

    {
      text: "Em face da penalidade de infração aplicada, de forma arbitrária, conforme será demonstrado a seguir.",
      style: "paragrafos",
    },
  ];
}

export function defesaPreviaBafometro(): Content[] {
  return [
    {
      text: "DEFESA PRÉVIA",
      style: "titleSection",
    },

    {
      text: "Em face da penalidade de infração aplicada, de forma arbitrária, conforme será demonstrado a seguir.",
      style: "paragrafos",
    },
    {
      text: "Conforme será demonstrado a seguir, a presente infração não tem fundamentos e provas cabíveis para que seja aplicada penalidade, pois é nula desde o seu início pelos motivos que seguem:",
      style: "paragrafos",
    },
    {
      text: "Em face da penalidade aplicada irregularmente conforme será demonstrado, sem obedecer às delimitações estabelecidas pelo CONTRAN.",
      style: "paragrafos",
    },
    {
      text: [
        "Frente à lavratura de auto de infração inepto e omisso, que não segue as determinações e especificações do Código de Trânsito Brasileiro e fere os princípios da legalidade e eficácia dos atos públicos, bem como da razoabilidade, moralidade e ",
        {
          text: "TRANSPARÊNCIA, omitindo documento obrigatório e prejudicando a garantia constitucional a ampla defesa.",
          style: "textBold",
        },
      ],
      style: "paragrafos",
    },
    {
      text: [
        "A notificação recebida contém omissões claríssimas e passíveis de anulação, gerando então inconsistência e obscuridade no preenchimento do ",
        {
          text: "AIT",
          style: "textBold",
        },
        ", ausente informações ",
        {
          text: "ESSENCIAIS.",
          style: "textBold",
        },
      ],
      style: "paragrafos",
    },
    {
      text: "Ora, este ato fere a transparência dos atos públicos e o princípio da publicidade, devendo ser anulado e revertido, vez que tal vício gera arbitrariedade no julgamento e completa irregularidade no procedimento processual, pois mesmo este sendo administrativo, possui regras, leis e princípios a serem seguidos, não podendo se tornar uma desorganização total, no sentido de arbitrariedade sem sentido e intenção meramente punitiva e lucrativa.",
      style: "paragrafos",
    },
  ];
}
