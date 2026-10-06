import { Address, DadosFormulario, DadosUsuario, Multa } from "@/types";
import type { Content } from "pdfmake/interfaces";

export type GerarPdfProps = {
  dadosFormulario: DadosFormulario;
  dadosUsuario: DadosUsuario;
  endereco: Address;
  selectedMulta: Multa;
  download?: boolean;
  readOnly?: boolean;
};

export type PdfContext = {
  dadosFormulario: DadosFormulario;
  dadosUsuario: DadosUsuario;
  endereco: Address;
  selectedMulta: Multa;
  dataFormatada: string;
};

export type PdfSection = (context: PdfContext) => Content[];
