import prisma from "../../src/config/prisma"
import { TipoMulta } from "../../generated/prisma/enums";

export async function multasSeed() {
    await prisma.multa.createMany({
        data: [
            {
                artigo_multa: "Art. 203, V",
                codigo_multa: "Cód 596-70",
                valor_multa: 73.84,
                valor_recurso: 42.17,
                descricao:
                    "Ultrapassar pela contramão linha de divisão de fluxos opostos, contínua amarela",
                tipo_multa: TipoMulta.GRAVISSIMA,
            },
            {
                artigo_multa: "Art. 165-A",
                codigo_multa: "Cód 757-90",
                valor_multa: 89.43,
                valor_recurso: 51.28,
                descricao:
                    "Recusar-se a ser submetido a teste, exame clínico, perícia ou outro procedimento que permita certificar influência de álcool ou outra substância psicoativa, na forma estabelecida pelo art. 277",
                tipo_multa: TipoMulta.GRAVISSIMA,
            },
            {
                artigo_multa: "Art. 218, III",
                codigo_multa: "Cód 746-30",
                valor_multa: 76.51,
                valor_recurso: 39.63,
                descricao:
                    "Transitar em velocidade superior à máxima permitida em mais de 50%",
                tipo_multa: TipoMulta.GRAVISSIMA,
            },
            {
                artigo_multa: "Art. 252, § Único",
                codigo_multa: "Cód 763-32",
                valor_multa: 57.91,
                valor_recurso: 31.44,
                descricao: "Dirigir veículo manuseando telefone celular",
                tipo_multa: TipoMulta.GRAVISSIMA,
            },
            {
                artigo_multa: "Art. 218, II",
                codigo_multa: "Cód 746-31",
                valor_multa: 41.75,
                valor_recurso: 18.36,
                descricao:
                    "Transitar em velocidade superior à máxima permitida em 20% até 50%",
                tipo_multa: TipoMulta.GRAVE,
            },
            {
                artigo_multa: "Art. 184, III",
                codigo_multa: "Cód 758-70",
                valor_multa: 63.27,
                valor_recurso: 27.58,
                descricao:
                    "Transitar na faixa ou via de trânsito exclusivo, regulamentada com circulação destinada aos veículos de transporte público coletivo de passageiros",
                tipo_multa: TipoMulta.GRAVISSIMA,
            },
            {
                artigo_multa: "Art. 181, XVII",
                codigo_multa: "Cód 554-12",
                valor_multa: 36.82,
                valor_recurso: 17.49,
                descricao:
                    "Estacionar em desacordo com a regulamentação - estacionamento rotativo",
                tipo_multa: TipoMulta.GRAVE,
            },
            {
                artigo_multa: "Art. 167",
                codigo_multa: "Cód 518-51",
                valor_multa: 47.36,
                valor_recurso: 16.71,
                descricao:
                    "Deixar o condutor de usar o cinto de segurança, conforme previsto no art. 65",
                tipo_multa: TipoMulta.GRAVE,
            },
            {
                artigo_multa: "Art. 169",
                codigo_multa: "Cód 520-70",
                valor_multa: 21.48,
                valor_recurso: 8.37,
                descricao:
                    "Dirigir sem atenção ou sem os cuidados indispensáveis à segurança",
                tipo_multa: TipoMulta.LEVE,
            },
            {
                artigo_multa: "Art. 208",
                codigo_multa: "Cód 605-01",
                valor_multa: 62.88,
                valor_recurso: 25.91,
                descricao: "Avançar o sinal vermelho do semáforo (sem foto)",
                tipo_multa: TipoMulta.GRAVISSIMA,
            },
            {
                artigo_multa: "Art. 208-A",
                codigo_multa: "Cód 605-03",
                valor_multa: 59.74,
                valor_recurso: 28.66,
                descricao:
                    "Avançar o sinal vermelho do semáforo - Fiscalização Eletrônica (com foto)",
                tipo_multa: TipoMulta.GRAVISSIMA,
            },
            {
                artigo_multa: "Art. 218, I",
                codigo_multa: "Cód 745-50",
                valor_multa: 31.83,
                valor_recurso: 11.24,
                descricao:
                    "Transitar em velocidade superior à máxima permitida em até 20%",
                tipo_multa: TipoMulta.MEDIA,
            },
        ],
        skipDuplicates: true,
    });
}
