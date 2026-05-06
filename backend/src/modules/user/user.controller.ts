import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userService } from "./user.service";

export class UserController {
    async get(req: Request, res: Response) {
        try {
            const users = await userService.findAll()
            if (!users || users.length === 0) {
                return res.status(400).json({ error: "Nenhum usuário encontrado." })
            }
            return res.status(200).json(users)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }

    async getAllRecursos(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params

            if (!id) {
                return res.status(401).json({
                    error: "Id não informado",
                });
            }

            const recursos = await userService.findAllRecursos(id);

            return res.status(200).json(recursos);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Erro ao buscar recursos do usuário",
            });
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const { nome, email, password, telefone, provider } = req.body;

            // Validação básica
            if (!nome || !email) {
                return res.status(400).json({
                    error: "Nome e email são obrigatórios",
                });
            }

            // Verificar se usuário já existe
            const userExists = await userService.findByEmail(email)

            if (userExists) {
                return res.status(409).json({
                    error: "Email já cadastrado",
                });
            }

            let hashedPassword: string | undefined = undefined;

            // Se for LOCAL, exige senha
            if ((provider ?? "LOCAL") === "LOCAL") {
                if (!password) {
                    return res.status(400).json({
                        error: "Senha é obrigatória para usuários locais",
                    });
                }

                hashedPassword = await bcrypt.hash(password, 10);
            }

            const user = await userService.create({
                nome,
                email,
                password: hashedPassword,
                telefone,
                provider: provider ?? "LOCAL",
            });

            // Remover senha da resposta
            const { password: _, ...userWithoutPassword } = user;

            return res.status(201).json(userWithoutPassword);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Erro ao criar usuário",
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    error: "Email e senha são obrigatórios",
                });
            }

            const user = await userService.findByEmail(email);

            // 🔐 Segurança (mensagem genérica)
            if (!user) {
                return res.status(401).json({
                    error: "Email ou senha inválidos",
                });
            }

            if (user.provider !== "LOCAL") {
                return res.status(400).json({
                    error: "Este usuário usa login social",
                });
            }

            if (!user.password) {
                return res.status(400).json({
                    error: "Usuário sem senha cadastrada",
                });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({
                    error: "Email ou senha inválidos",
                });
            }

            // Remove senha
            const { password: _, ...userWithoutPassword } = user;

            // 🔥 Gerar token
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    nome: user.nome,
                    provider: user.provider
                },
                process.env.JWT_TOKEN as string,
                {
                    expiresIn: "1d",
                }
            );

            return res.status(200).json({
                user: userWithoutPassword,
                token,
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Erro ao fazer login",
            });
        }
    }
}

export const userController = new UserController();
