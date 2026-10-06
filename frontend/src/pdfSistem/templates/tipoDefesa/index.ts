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
