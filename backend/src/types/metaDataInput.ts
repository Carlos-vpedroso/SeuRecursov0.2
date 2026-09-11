export type MetadataInput = {
  dadosFormulario: {
    tipoDefesa: string;
    fato: string;
    fatoComentario: string;
    notificado: string;
    tempoNotificacao: string;
    agente: string;
    acessoAuto: string;
    patio: string;
    patioComentario: string;
  };
  dadosUsuario: {
    nome: string;
    cpf: string;
    rg: string;
    celular: string;
    ufEmissao: string;
    autoInfracao: string;
    placaVeiculo: string;
    tipoUsuario: string;
    solicitante: string;
  };
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
  createdAt: Date;
};
