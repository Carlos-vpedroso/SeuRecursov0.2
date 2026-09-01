import { adminService } from "./admin.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export class AdminController {
  async create(req: Request, res: Response) {
    try {
      const { username, name, password } = req.body;

      // Validação dos campos
      if (!username || !password) {
        return res.status(400).json({
          message: "Username e senha são obrigatórios.",
        });
      }

      // Validação da senha
      const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message:
            "A senha deve ter no mínimo 8 caracteres, pelo menos 1 letra maiúscula e 1 caractere especial.",
        });
      }

      // Verifica se o username já existe
      const existingAdmin = await adminService.findByUsername(username);

      if (existingAdmin) {
        return res.status(409).json({
          message: "Este username já está cadastrado.",
        });
      }

      // Gera o hash da senha
      const hashedPassword = await bcrypt.hash(password, 12);

      // Cria o administrador
      const admin = await adminService.create(username, name, hashedPassword);

      // Nunca retornar a senha/hash
      return res.status(201).json({
        id: admin.id,
        name: admin.name,
        username: admin.username,
        ativo: admin.ativo,
      });
    } catch (error) {
      console.error("Erro ao criar administrador:", error);

      return res.status(500).json({
        message: "Erro interno ao criar administrador.",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({
          error: "Email e senha são obrigatórios",
        });
      }
      const user = await adminService.findByUsername(username);

      // 🔐 Segurança (mensagem genérica)
      if (!user) {
        return res.status(401).json({
          error: "Email ou senha inválidos",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({
          error: "Email ou senha inválidos",
        });
      }

      const { password: _, ...userWithoutPassword } = user;

      // 🔥 Gerar token
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          name: user.name,
        },
        process.env.JWT_ADMIN_TOKEN as string,
        {
          expiresIn: "30m",
        },
      );
      return res.status(200).json({
        admin: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Erro ao fazer login admin",
      });
    }
  }

  async update(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "ID do administrador é obrigatório",
        });
      }

      // Verifica se o admin existe
      const admin = await adminService.findById(id);

      if (!admin) {
        return res.status(404).json({
          error: "Administrador não encontrado",
        });
      }

      const { username, name, password, ativo } = req.body;

      // Nenhum campo enviado
      if (
        username === undefined &&
        name === undefined &&
        password === undefined &&
        ativo === undefined
      ) {
        return res.status(400).json({
          error: "Nenhum campo foi informado para atualização",
        });
      }

      // Verifica se o novo username já pertence a outro admin
      if (username !== undefined && username !== admin.username) {
        const existingAdmin = await adminService.findByUsername(username);

        if (existingAdmin && existingAdmin.id !== id) {
          return res.status(409).json({
            error: "Este username já está cadastrado",
          });
        }
      }

      const data: {
        username?: string;
        name?: string;
        password?: string;
        ativo?: boolean;
      } = {};

      // Username
      if (username !== undefined) {
        if (!username.trim()) {
          return res.status(400).json({
            error: "Username não pode ser vazio",
          });
        }

        data.username = username.trim();
      }

      // Nome
      if (name !== undefined) {
        if (!name.trim()) {
          return res.status(400).json({
            error: "Nome não pode ser vazio",
          });
        }

        data.name = name.trim();
      }

      // Senha
      if (password !== undefined) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

        if (!passwordRegex.test(password)) {
          return res.status(400).json({
            error:
              "A senha deve ter no mínimo 8 caracteres, pelo menos 1 letra maiúscula e 1 caractere especial.",
          });
        }

        // Hash da nova senha
        data.password = await bcrypt.hash(password, 12);
      }

      // Status ativo
      if (ativo !== undefined) {
        if (typeof ativo !== "boolean") {
          return res.status(400).json({
            error: "O campo ativo deve ser booleano",
          });
        }

        data.ativo = ativo;
      }

      // Atualiza o administrador
      const updatedAdmin = await adminService.update(id, data);

      // Nunca retorna o hash da senha
      const { password: _, ...adminWithoutPassword } = updatedAdmin;

      return res.status(200).json(adminWithoutPassword);
    } catch (error) {
      console.error("Erro ao atualizar admin:", error);

      return res.status(500).json({
        error: "Erro ao atualizar admin",
      });
    }
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      // Validação do ID
      if (!id) {
        return res.status(400).json({
          error: "ID do administrador é obrigatório",
        });
      }

      // Verifica se o administrador existe
      const admin = await adminService.findById(id);

      if (!admin) {
        return res.status(404).json({
          error: "Administrador não encontrado",
        });
      }

      // Deleta o administrador
      await adminService.delete(id);

      return res.status(200).json({
        message: "Administrador deletado com sucesso",
      });
    } catch (error) {
      console.error("Erro ao deletar administrador:", error);

      return res.status(500).json({
        error: "Erro ao deletar administrador",
      });
    }
  }
}

export const adminController = new AdminController();
