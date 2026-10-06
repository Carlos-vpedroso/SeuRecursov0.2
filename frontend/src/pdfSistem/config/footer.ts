import type { Content } from "pdfmake/interfaces";

export function pdfFooter(
  currentPage: number,
  pageCount: number,
): Content {
  return {
    text: `${currentPage} / ${pageCount}`,
    fontSize: 8,
    bold: true,
    alignment: "right",
    margin: [0, 10, 20, 0],
  };
}