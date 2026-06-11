import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: string,
  locale = "pt-BR",
  currency = "BRL",
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(Number(value));
}

export function validarCPF(cpf: string): boolean {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return regex.test(cpf);
}

export function validarRG(rg: string): boolean {
  const regex = /^\d{2}\.\d{3}\.\d{3}(-\d{1})?$/;
  return regex.test(rg);
}

export async function buscarCEP(
  cep: string,
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      return {
        success: false,
        error: "CEP inválido",
      };
    }
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    if (!response.ok) {
      return {
        success: false,
        error: "Erro ao buscar CEP",
      };
    }
    const result = await response.json();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
}

export function handleScrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
