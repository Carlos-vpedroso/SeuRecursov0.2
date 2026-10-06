import type { StyleDictionary } from "pdfmake/interfaces";

export const pdfStyles: StyleDictionary = {
  introducao: {
    fontSize: 14,
    bold: true,
    margin: [0, 0, 0, 10],
    alignment: "justify",
  },

  titleSection: {
    fontSize: 14,
    bold: true,
    margin: [0, 10],
    alignment: "center",
    decoration: "underline",
  },

  dadosVariaveis: {
    fontSize: 12,
    color: "#000000",
    bold: true,
  },

  paragrafos: {
    margin: [0, 10],
    fontSize: 12,
    alignment: "justify",
  },

  paragrafosBold: {
    margin: [0, 10],
    fontSize: 12,
    alignment: "justify",
    bold: true,
  },

  paragrafosCenter: {
    margin: [0, 10],
    fontSize: 12,
    alignment: "center",
  },

  paragrafosRight: {
    margin: [150, 10, 0, 10],
    fontSize: 12,
    alignment: "justify",
  },

  paragrafosBoldRight: {
    margin: [150, 10, 0, 10],
    fontSize: 12,
    alignment: "justify",
    bold: true,
  },

  textBold: {
    bold: true,
    fontSize: 12,
  },

  textBoldUnderline: {
    bold: true,
    fontSize: 12,
    decoration: "underline",
  },

  textBoldWithMargin: {
    fontSize: 12,
    bold: true,
    margin: [0, 10],
  },

  textBoldRight: {
    bold: true,
    fontSize: 12,
    margin: [150, 10, 0, 0],
    alignment: "justify",
  },

  textBoldUnderlineRight: {
    bold: true,
    decoration: "underline",
    fontSize: 12,
    margin: [150, 10, 0, 0],
    alignment: "justify",
  },

  textCenter: {
    alignment: "center",
    fontSize: 12,
  },

  textCenterWithMargin: {
    margin: [0, 10],
    alignment: "center",
    fontSize: 12,
  },

  cidadeAndData: {
    margin: [0, 10, 0, 100],
    alignment: "center",
    fontSize: 12,
  },

  assinatura: {
    bold: true,
    fontSize: 12,
    alignment: "center",
  },
};
