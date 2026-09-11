import prisma from "../../config/prisma";
import { Admin } from "../../../generated/prisma/client";

export class AdminService {
  async create(
    username: string,
    name: string,
    hashedPassword: string,
  ): Promise<Admin> {
    return prisma.admin.create({
      data: { username, name, password: hashedPassword },
    });
  }

  async findById(id: string): Promise<Admin | null> {
    return prisma.admin.findUnique({
      where: { id },
    });
  }

  async findByUsername(username: string): Promise<Admin | null> {
    return prisma.admin.findUnique({
      where: { username },
    });
  }

  async update(
    id: string,
    data: Partial<{ username: string; password: string; ativo: boolean }>,
  ): Promise<Admin> {
    return prisma.admin.update({
      where: { id },
      data,
    });
  }

  // Deletar usuário
  async delete(id: string): Promise<Admin> {
    return prisma.admin.delete({
      where: { id },
    });
  }
}

export const adminService = new AdminService();
