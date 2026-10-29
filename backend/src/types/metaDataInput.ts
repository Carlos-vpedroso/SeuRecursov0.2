export type TipoDefesa = "Defesa Prévia" | "Jari" | "Cetran";

export type MetadataInput = {
  dadosFormulario: {
    tipoDefesa: TipoDefesa;
    recorreuDefesaPrevia: "SIM" | "NÃO" | "";
    fato: "SIM" | "NÃO" | "";
    fatoComentario: string;
    tempoNotificacao: "SIM" | "NÃO" | "";
    agente: "SIM" | "NÃO" | "";
    acessoAuto: "SIM" | "NÃO" | "";
  };
  dadosUsuario: {
    nome: string;
    cpf: string;
    rg: string;
    celular: string;
    autoInfracao: string;
    placaVeiculo: string;
    solicitante: string;
  };
  endereco: {
    cep: string;
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cidade: string;
    uf: string;
  };
  createdAt: Date;
};
