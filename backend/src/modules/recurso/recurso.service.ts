import { Recurso } from "../../../generated/prisma/client";
import prisma from "../../config/prisma";
import { MetadataInput } from "../../types/metaDataInput";
import { decrypt } from "../../utils/criptografia";

type RecursoComSensitiveData = {
  nome: string;
  autoInfracao: string;
  createdAt: Date;
  sensitiveData: MetadataInput;
};

export class RecursoService {
  // Buscar por ID
  async findById(id: string, userId: string): Promise<Recurso | null> {
    return prisma.recurso.findUnique({
      where: { id, userId },
    });
  }

  async findByIdWithSensitiveData(
    id: string,
    userId: string,
  ): Promise<MetadataInput | null> {
    const recurso = await prisma.recurso.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        sensitiveData: true,
      },
    });

    if (!recurso) {
      return null;
    }

    const decrypted: MetadataInput = decrypt(recurso.sensitiveData);

    return decrypted;
  }

  async create(data: {
    userId: string;
    multaId: string;
    paymentId: string;
    nome: string;
    autoInfracao: string;
    sensitiveData: string;
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
      userId: string;
      multaId: string;
      paymentId: string;
      nome: string;
      autoInfracao: string;
      sensitiveData: string;
    }>,
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
