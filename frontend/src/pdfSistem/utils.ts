export function formatarNome(nome: string): string {
  return nome
    .toLowerCase()
    .split(" ")
    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(" ");
}

export function formatarDataAtual(): string {
  return new Date().toLocaleDateString("pt-BR");
}
