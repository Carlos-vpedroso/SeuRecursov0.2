import { PrismaClient, User, Providers, Recurso } from "../../../generated/prisma/client";
import prisma from "../../config/prisma";

export class UserService {
  // Criar usuário
  async create(data: {
    nome: string;
    email: string;
    password?: string;
    telefone?: string;
    provider?: Providers;
  }): Promise<User> {
    return prisma.user.create({
      data: {
        ...data,
      },
    });
  }

  // Buscar todos usuários
  async findAll(): Promise<User[]> {
    return prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Buscar todos recursos do Usuário
  async findAllRecursos(userId: string) {
    return prisma.recurso.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        nome: true,
        autoInfracao: true,
        multa: true,
        payment: {
          select: {
            paidAt: true,
          },
        },
      },
    });
  }

  // Buscar por ID
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  // Buscar por email
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  // Atualizar usuário
  async update(
    id: string,
    data: Partial<{
      nome: string;
      email: string;
      password: string;
      telefone: string;
      provider: Providers;
    }>
  ): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  // Deletar usuário
  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}

// Exporta instância pronta pra uso
export const userService = new UserService();