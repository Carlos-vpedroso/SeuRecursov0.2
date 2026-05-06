export function maskCPF(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  }

  export function maskPhone(value: string) {
    if (!value) return "";
  
    // Remove tudo que não é número
    let digits = value.replace(/\D/g, "");
  
    let prefix = "";
    // Suporta +55 ou 55 no começo (opcional)
    if (digits.startsWith("55")) {
      prefix = "+55 ";
      digits = digits.slice(2);
    }
  
    // Limita ao máximo de 11 dígitos locais (DDD + 9 dígitos)
    digits = digits.slice(0, 11);
  
    // Formatação progressiva:
    if (digits.length === 0) return prefix.trim();
  
    if (digits.length <= 2) {
      // Só DDD parcial
      return `${prefix}(${digits}`;
    }
  
    const ddd = digits.slice(0, 2);
    const rest = digits.slice(2);
  
    if (rest.length <= 4) {
      // (XX) 9xxx (ou (XX) xxxx)
      return `${prefix}(${ddd}) ${rest}`;
    }
  
    if (rest.length <= 7) {
      // (XX) xxxx-xxx  (quando ainda não tem todos os números)
      const part1 = rest.slice(0, 4);
      const part2 = rest.slice(4);
      return `${prefix}(${ddd}) ${part1}${part2 ? "-" + part2 : ""}`;
    }
  
    // rest.length between 8 and 9 (normal: 9 digits -> 5 + 4)
    const part1 = rest.slice(0, rest.length === 9 ? 5 : 4); // se tiver 9 dígitos, usa 5 no primeiro bloco
    const part2 = rest.slice(part1.length, part1.length + 4);
    return `${prefix}(${ddd}) ${part1}${part2 ? "-" + part2 : ""}`;
  }
  
  export function maskCEP(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  }

  export function maskRG(value: string) {
    return value
      .replace(/\D/g, "") // remove tudo que não é número
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1})$/, "$1-$2")
      .slice(0, 12);
  }