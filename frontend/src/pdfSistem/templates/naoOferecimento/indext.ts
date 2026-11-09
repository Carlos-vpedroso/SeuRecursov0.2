import type { Content } from "pdfmake/interfaces";

export function naoOferecimentoPadrao(): Content[] {
  return [
    {
      text: "DO NÃO OFERECIMENTO DO ETILÔMETRO",
      style: "titleSection",
    },
    {
      text: "Outro erro absurdo e passível de anulação do órgão autuador, é que não foi oferecido o etilômetro à pessoa que retirou o veículo para a recorrente. Ora, sem a comprovação da não embriaguez, o que garante que a pessoa não havia ingerido bebida alcóolica? O artigo 11º da Resolução 1031 do CONTRAN, EXIGE a realização do teste de etilômetro ao condutor que retirou o veículo.",
      style: "paragrafos",
    },
    {
      text: "Ora, essa omissão por parte do agente trânsito não pode ser perdoada, merecendo dessa forma a anulação do presente auto de infração de maneira preliminar e seu consequente arquivamento.",
      style: "paragrafos",
    },
  ];
}
