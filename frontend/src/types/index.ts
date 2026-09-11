import { UUID } from "node:crypto";

export interface DadosFormulario {
  tipoDefesa: string;
  fato: string;
  fatoComentario: string;
  notificado: string;
  tempoNotificacao: string;
  agente: string;
  acessoAuto: string;
  patio: string;
  patioComentario: string;
}

export interface Multa {
  id: string;
  codigo_multa: string;
  artigo_multa: string;
  tipo_multa: TipoMulta;
  descricao: string;
  valor_multa: string;
  valor_recurso: string;
}
export type TipoMulta = "LEVE" | "MEDIA" | "GRAVE" | "GRAVISSIMA";

export interface Recurso {
  id: UUID;
  multaId: UUID;
  multa: Multa;
  nome: string;
  autoInfracao: string;
  payment?: {
    paidAt: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface DadosUsuario {
  nome: string;
  cpf: string;
  rg: string;
  celular: string;
  ufEmissao: string;
  autoInfracao: string;
  placaVeiculo: string;
  tipoUsuario: string;
  solicitante: string;
}

export interface Address {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface DadosUser {
  id: string;
  nome: string;
  email: string;
  telefone?: string | null;
  provider: Providers;
  createdAt?: string;
  updatedAt?: string;
}

export type Providers = "LOCAL" | "GOOGLE";

export interface RecursoResponseWithMetaData {
  dadosFormulario: DadosFormulario;
  dadosUsuario: DadosUsuario;
  endereco: Address;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  username: string;
  ativo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
