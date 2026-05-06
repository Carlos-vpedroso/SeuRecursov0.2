import { Request, Response } from "express";
import { multaService } from "./multa.service";

export class MultaController {
    async getAll(req: Request, res: Response) {
        try {
            const multas = await multaService.findAll();

            if (!multas || multas.length === 0) {
                return res.status(404).json({
                    error: "Nenhuma multa encontrada.",
                });
            }

            return res.status(200).json(multas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Erro ao buscar multas",
            });
        }
    }

    async getById(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    error: "ID da multa é obrigatório",
                });
            }

            const multa = await multaService.findById(id);

            if (!multa) {
                return res.status(404).json({
                    error: "Multa não encontrada",
                });
            }

            return res.status(200).json(multa);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Erro ao buscar multa",
            });
        }
    }

    async createMulta(req: Request, res: Response) {
        try {
            const {
                artigo_multa,
                codigo_multa,
                valor_multa,
                valor_recurso,
                descricao,
                tipo_multa,
            } = req.body;

            // Validação básica
            if (
                !artigo_multa ||
                !codigo_multa ||
                !valor_multa ||
                !valor_recurso ||
                !descricao
            ) {
                return res.status(400).json({
                    error: "Todos os campos obrigatórios devem ser preenchidos",
                });
            }

            // Verifica se já existe pelo código
            const multaByCodigo = await multaService.findByCodigo(codigo_multa);
            if (multaByCodigo) {
                return res.status(409).json({
                    error: "Código da multa já cadastrado",
                });
            }

            // Verifica se já existe pelo artigo
            const multaByArtigo = await multaService.findByArtigo(artigo_multa);
            if (multaByArtigo) {
                return res.status(409).json({
                    error: "Artigo da multa já cadastrado",
                });
            }

            const multa = await multaService.create({
                artigo_multa,
                codigo_multa,
                valor_multa: Number(valor_multa),
                valor_recurso: Number(valor_recurso),
                descricao,
                tipo_multa: tipo_multa ?? "LEVE",
            });

            return res.status(201).json(multa);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Erro ao criar multa",
            });
        }
    }

    async delete(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    error: "ID da multa é obrigatório",
                });
            }

            // Verifica se existe
            const multa = await multaService.findById(id);

            if (!multa) {
                return res.status(404).json({
                    error: "Multa não encontrada",
                });
            }

            await multaService.delete(id);

            return res.status(200).json({
                message: "Multa deletada com sucesso",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Erro ao deletar multa",
            });
        }
    }
}

export const multaController = new MultaController();