import { Recurso } from "../../../generated/prisma/client";
import prisma from "../../config/prisma";

export class RecursoService {
    // Buscar por ID
    async findById(id: string): Promise<Recurso | null> {
        return prisma.recurso.findUnique({
            where: { id },
        });
    }

    async create(data: {
        userId: string,
        multaId: string,
        paymentId: string,
        nome: string,
        autoInfracao: string,
        sensitiveData: string
    }): Promise<Recurso> {
        return prisma.recurso.create({
            data: {
                ...data,
            },
        });
    }

    async update(
        id: string,
        data: Partial<{
            userId: string,
            multaId: string,
            paymentId: string,
            nome: string,
            autoInfracao: string,
            sensitiveData: string
        }>
    ): Promise<Recurso> {
        return prisma.recurso.update({
            where: { id },
            data,
        });
    }

    // Deletar recurso
    async delete(id: string): Promise<Recurso> {
        return prisma.recurso.delete({
            where: { id },
        });
    }
}

export const recursoService = new RecursoService();
