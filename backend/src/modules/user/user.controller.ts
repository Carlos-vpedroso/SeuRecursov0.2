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

    async authGoogle(req: Request, res: Response) {
        try {
            const { nome, email, imageUrl } = req.body;

            if (!email) {
                return res.status(400).json({
                    error: "Email não informado",
                });
            }

            let user = await userService.findByEmail(email);

            if (!user) {
                user = await userService.create({
                    nome,
                    email,
                    imageUrl,
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                process.env.JWT_TOKEN!,
                {
                    expiresIn: "7d",
                }
            );

            return res.status(200).json({
                user,
                token,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: "Erro ao autenticar usuário",
            });
        }
    }

}

export const userController = new UserController();
