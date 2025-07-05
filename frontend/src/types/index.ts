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
    artigoMulta: string;
    codigoMulta: string;
    valorMulta: number;
    valorRecurso: number;
    descricao: string;
    tipoMulta: string;
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
    tipo_multa: string;
    descricao: string;
    valor_multa: number;
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
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
}

export interface DadosUser {
  id: string;
  username: string;
  useremail: string;
  password: string;
  telefone: string | null;
  createdAt: string; 
  updatedAt: string; 
}