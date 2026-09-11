import { Recurso } from "@/types";

export const recursosMock: Recurso[] = [
  {
    id: "539095ae-4e1f-4be4-bc71-eccee588296e",
    multaId: "402149f7-95a3-4009-b7c6-c4d97292157c",
    nome: "Carlos Vínicius Pedroso",
    autoInfracao: "Infracao",
    multa: {
      id: "402149f7-95a3-4009-b7c6-c4d97292157c",
      codigo_multa: "Cód 596-70",
      artigo_multa: "Art. 203, V",
      tipo_multa: "GRAVISSIMA",
      descricao:
        "Ultrapassar pela contramão linha de divisão de fluxos opostos, contínua amarela",
      valor_multa: "58.69",
      valor_recurso: "0.10",
    },
    payment: {
      paidAt: "2026-05-07 22:47:06",
    },
    createdAt: "2026-05-06 14:55:12",
    updatedAt: "2026-05-06 14:55:12",
  },
  {
    id: "7d1a8c9b-2c61-4f4a-a8e0-9f4c8b1d7321",
    multaId: "b5f5b8d4-6f3a-4f8d-9f1c-8c4e7f2a9156",
    nome: "Maria Alves Costa",
    autoInfracao: "Infracao",
    multa: {
      id: "b5f5b8d4-6f3a-4f8d-9f1c-8c4e7f2a9156",
      codigo_multa: "Cód 745-50",
      artigo_multa: "Art. 218, III",
      tipo_multa: "MEDIA",
      descricao:
        "Transitar em velocidade superior à máxima permitida em mais de 50%",
      valor_multa: "880.41",
      valor_recurso: "110.50",
    },
    payment: {
      paidAt: "2026-05-12 10:15:44",
    },
    createdAt: "2026-05-11 08:22:19",
    updatedAt: "2026-05-11 08:22:19",
  },
  {
    id: "1f6d2e4c-7b9f-4a81-a6e5-3c2f4b9d8e73",
    multaId: "9a8c3d2e-4b6f-4d7a-b9e1-5f2c7d8a4e61",
    nome: "João Henrique Martins",
    autoInfracao: "Infracao",
    multa: {
      id: "9a8c3d2e-4b6f-4d7a-b9e1-5f2c7d8a4e61",
      codigo_multa: "Cód 574-61",
      artigo_multa: "Art. 187, I",
      tipo_multa: "GRAVE",
      descricao: "Transitar em local/horário não permitido pela regulamentação",
      valor_multa: "130.16",
      valor_recurso: "90.99",
    },
    payment: {
      paidAt: "2026-05-18 16:34:12",
    },
    createdAt: "2026-05-17 09:41:55",
    updatedAt: "2026-05-17 09:41:55",
  },
  {
    id: "8b4e3f7a-5d2c-4f9b-a1e8-6c7d9f2b4a10",
    multaId: "3c7a1e9d-5f4b-4a8c-b2d6-7e9f1a3c5b82",
    nome: "Fernanda Ribeiro Souza",
    autoInfracao: "Infracao",
    multa: {
      id: "3c7a1e9d-5f4b-4a8c-b2d6-7e9f1a3c5b82",
      codigo_multa: "Cód 605-01",
      artigo_multa: "Art. 208",
      tipo_multa: "LEVE",
      descricao:
        "Avançar o sinal vermelho do semáforo ou de parada obrigatória",
      valor_multa: "293.47",
      valor_recurso: "50.49",
    },
    payment: {
      paidAt: "2026-05-23 13:08:27",
    },
    createdAt: "2026-05-22 11:17:03",
    updatedAt: "2026-05-22 11:17:03",
  },
];
