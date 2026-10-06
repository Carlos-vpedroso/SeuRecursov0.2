import type { Content } from "pdfmake/interfaces";
import type { PdfContext } from "../../types";
import { formatarNome } from "@/pdfSistem/utils";

// infracaoAndRecorrente
// dadosVariaveis
// paragrafos

export function headerPadrao({ dadosUsuario }: PdfContext): Content[] {
  return [
    {
      text: [
        "Auto de Infração: ",
        { text: `${dadosUsuario.autoInfracao}`, style: "textBold" },
      ],
      style: "textBold",
    },

    {
      text: [
        "Recorrente: ",
        { text: `${dadosUsuario.solicitante}`, style: "textBold" },
      ],
      style: "textBold",
    },

    {
      text: [
        {
          text: `${formatarNome(dadosUsuario.nome)}`,
          style: "dadosVariaveis",
        },
        ", brasileiro, portador do CPF ",
        { text: `${dadosUsuario.cpf}`, style: "dadosVariaveis" },
        ", do RG ",
        { text: `${dadosUsuario.rg}`, style: "dadosVariaveis" },
        ", ",
        { text: `${dadosUsuario.solicitante}`, style: "dadosVariaveis" },
        " do veículo de placa ",
        { text: `${dadosUsuario.placaVeiculo}`, style: "dadosVariaveis" },
        ", vem respeitosamente a presença de Vossa Senhoria, com fundamento na Constituição da República e demais dispositivos aplicáveis à espécie, interpor a presente:",
      ],
      style: "paragrafos",
    },
  ];
}
