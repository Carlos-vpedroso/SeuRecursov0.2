import { Multa, TipoMulta } from "../../../generated/prisma/client";
import prisma from "../../config/prisma";

export class MultaService {
  // Criar multa
  async create(data: {
    artigo_multa: string;
    codigo_multa: string;
    valor_multa: number;
    valor_recurso: number;
    descricao: string;
    tipo_multa?: TipoMulta;
  }): Promise<Multa> {
    return prisma.multa.create({
      data: {
        ...data,
      },
    });
  }

  // Buscar todas multas
  async findAll(): Promise<Multa[]> {
    return prisma.multa.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Buscar por ID
  async findById(id: string): Promise<Multa | null> {
    return prisma.multa.findUnique({
      where: { id },
    });
  }

  // Buscar por código da multa
  async findByCodigo(codigo_multa: string): Promise<Multa | null> {
    return prisma.multa.findUnique({
      where: { codigo_multa },
    });
  }

  // Buscar por artigo da multa
  async findByArtigo(artigo_multa: string): Promise<Multa | null> {
    return prisma.multa.findUnique({
      where: { artigo_multa },
    });
  }

  // Atualizar multa
  async update(
    id: string,
    data: Partial<{
      artigo_multa: string;
      codigo_multa: string;
      valor_multa: number;
      valor_recurso: number;
      descricao: string;
      tipo_multa: TipoMulta;
    }>
  ): Promise<Multa> {
    return prisma.multa.update({
      where: { id },
      data,
    });
  }

  // Deletar multa
  async delete(id: string): Promise<Multa> {
    return prisma.multa.delete({
      where: { id },
    });
  }
}

// Exporta instância pronta pra uso
export const multaService = new MultaService();