import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";

import type { TDocumentDefinitions } from "pdfmake/interfaces";

import type { GerarPdfProps } from "./types";

import { pdfStyles } from "./config/styles";
import { pdfPageConfig } from "./config/page";
import { pdfFooter } from "./config/footer";

import { formatarNome, formatarDataAtual } from "./utils";

import { recursoTemplate } from "./templates/index";

const GerarPdf = async ({
  dadosFormulario,
  dadosUsuario,
  endereco,
  selectedMulta,
  download = true,
  readOnly = false,
}: GerarPdfProps) => {
  const context = {
    dadosFormulario,
    dadosUsuario,
    endereco,
    selectedMulta,
    dataFormatada: formatarDataAtual(),
  };

  const baseUrl = window.location.origin;

  pdfMake.fonts = {
    LibreBaskerville: {
      normal: `${baseUrl}/fonts/LibreBaskerville-Regular.ttf`,
      bold: `${baseUrl}/fonts/LibreBaskerville-Bold.ttf`,
      italics: `${baseUrl}/fonts/LibreBaskerville-Italic.ttf`,
      bolditalics: `${baseUrl}/fonts/LibreBaskerville-BoldItalic.ttf`,
    },
  };

  const docDefinitions: TDocumentDefinitions = {
    ...pdfPageConfig,

    content: recursoTemplate(context),

    styles: pdfStyles,

    defaultStyle: {
      font: "LibreBaskerville",
    },

    footer: pdfFooter,
  };

  const pdf = pdfMake.createPdf(docDefinitions);

  if (download) {
    pdf.download(
      `Recurso ${formatarNome(dadosUsuario.nome)}-${dadosUsuario.autoInfracao}`,
    );
  }

  if (readOnly) {
    pdf.open();
  }
};

export default GerarPdf;
