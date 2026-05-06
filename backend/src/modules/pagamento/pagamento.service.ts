import { Pagamento } from "../../../generated/prisma/client";
import { PaymentGateway, PaymentMethod, PaymentStatus } from "../../../generated/prisma/enums";
import prisma from "../../config/prisma";
import { encrypt } from "../../utils/criptografia";

type MetadataInput = {
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
};

export class PagamentoService {
    async create(
        userId: string,
        multaId: string,
        metodo: PaymentMethod,
        gateway: PaymentGateway,
        metadata: MetadataInput
        // metadata : { cpf: "", rg: "", telefone: "", endereco: { cep: "", ...}, mais outros dados. }
    ): Promise<{ success: boolean, message: string, pagamentoData?: Pagamento }> {
        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (!user) {
            return {
                success: false,
                message: "Usuário não encontrado."
            }
        }
        const multa = await prisma.multa.findUnique({ where: { id: multaId } })
        if (!multa) {
            return {
                success: false,
                message: "Multa não encontrada."
            }
        }
        //aqui vem a função de criptografia
        const encryptedData = encrypt(metadata)

        const pagamento = await prisma.pagamento.create({
            data: {
                userId,
                multaId,
                valor: multa.valor_recurso,
                metodo,
                status: PaymentStatus.PENDING,
                gateway,
                metadata: encryptedData
            },
        })

        return {
            success: true,
            message: "Pagamento criado com sucesso.",
            pagamentoData: pagamento
        }
    }

    // Atualizar pagamento
    async update(
        options: { id?: string; gatewayId?: string },
        data: Partial<{
            status: PaymentStatus;
            gatewayId: string;
            checkout_url: string;
            qrCode: string;
            qrCodeImage: string;
            paidAt: Date
        }>
    ): Promise<Pagamento> {

        if (options.id) {
            return prisma.pagamento.update({
                where: { id: options.id },
                data,
            });
        }

        if (options.gatewayId) {
            return prisma.pagamento.update({
                where: { gatewayId: options.gatewayId },
                data,
            });
        }

        throw new Error("É necessário informar id ou gatewayId");
    }

    // Buscar todos pagamentos
    async findAll(): Promise<Pagamento[]> {
        return prisma.pagamento.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    // Buscar por ID
    async findById(id: string): Promise<Pagamento | null> {
        return prisma.pagamento.findUnique({
            where: { id },
        });
    }
    // Buscar por gatewayId
    async findByGatewayId(gatewayId: string): Promise<Pagamento | null> {
        return prisma.pagamento.findUnique({
            where: { gatewayId },
        });
    }

    // Deletar pagamento
    async delete(id: string): Promise<Pagamento> {
        return prisma.pagamento.delete({
            where: { id },
        });
    }
}

export const pagamentoService = new PagamentoService();