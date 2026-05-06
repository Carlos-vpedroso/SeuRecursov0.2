import { UUID } from "node:crypto";

export interface AuthContextType {
    user: string | null;
    signed: boolean;
    SignIn: (email: string, password: string) => Promise<void>;
    SignOut: () => void;
    dadosFormulario: DadosFormulario;
    setDadosFormulario: React.Dispatch<React.SetStateAction<DadosFormulario>>;
    multas: Multa[];
    loading: boolean;
    erro: string | null;
}

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
    id: UUID;
    codigo_multa: string;
    artigo_multa: string;
    tipo_multa: TipoMulta;
    descricao: string;
    valor_multa: string;
    valor_recurso: string;
}
export type TipoMulta = "LEVE" | "MEDIA" | "GRAVE" | "GRAVISSIMA";

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

export type Providers = "LOCAL" | "GOOGLE"

export interface RecursoResponse {
    nome: string;
    autoInfracao: string;
    multa: Multa;
    payment?: {
        paidAt: string | null; // vem como string no JSON
    }
}