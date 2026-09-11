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

  async update(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "ID da multa é obrigatório",
        });
      }

      // Verifica se a multa existe
      const multa = await multaService.findById(id);

      if (!multa) {
        return res.status(404).json({
          error: "Multa não encontrada",
        });
      }

      const {
        artigo_multa,
        codigo_multa,
        valor_multa,
        valor_recurso,
        descricao,
        tipo_multa,
      } = req.body;

      // Verifica se o código já pertence a outra multa
      if (codigo_multa && codigo_multa !== multa.codigo_multa) {
        const multaByCodigo = await multaService.findByCodigo(codigo_multa);

        if (multaByCodigo && multaByCodigo.id !== id) {
          return res.status(409).json({
            error: "Código da multa já cadastrado",
          });
        }
      }

      // Verifica se o artigo já pertence a outra multa
      if (artigo_multa && artigo_multa !== multa.artigo_multa) {
        const multaByArtigo = await multaService.findByArtigo(artigo_multa);

        if (multaByArtigo && multaByArtigo.id !== id) {
          return res.status(409).json({
            error: "Artigo da multa já cadastrado",
          });
        }
      }

      // Monta apenas os campos enviados
      const data: {
        artigo_multa?: string;
        codigo_multa?: string;
        valor_multa?: number;
        valor_recurso?: number;
        descricao?: string;
        tipo_multa?: "LEVE" | "MEDIA" | "GRAVE" | "GRAVISSIMA";
      } = {};

      if (artigo_multa !== undefined) {
        data.artigo_multa = artigo_multa;
      }

      if (codigo_multa !== undefined) {
        data.codigo_multa = codigo_multa;
      }

      if (valor_multa !== undefined) {
        const valor = Number(valor_multa);

        if (Number.isNaN(valor)) {
          return res.status(400).json({
            error: "valor_multa deve ser um número válido",
          });
        }

        data.valor_multa = valor;
      }

      if (valor_recurso !== undefined) {
        const valor = Number(valor_recurso);

        if (Number.isNaN(valor)) {
          return res.status(400).json({
            error: "valor_recurso deve ser um número válido",
          });
        }

        data.valor_recurso = valor;
      }

      if (descricao !== undefined) {
        data.descricao = descricao;
      }

      if (tipo_multa !== undefined) {
        const tiposValidos = ["LEVE", "MEDIA", "GRAVE", "GRAVISSIMA"];

        if (!tiposValidos.includes(tipo_multa)) {
          return res.status(400).json({
            error:
              "tipo_multa inválido. Valores permitidos: LEVE, MEDIA, GRAVE, GRAVISSIMA",
          });
        }

        data.tipo_multa = tipo_multa;
      }

      // Atualiza a multa
      const multaAtualizada = await multaService.update(id, data);

      return res.status(200).json(multaAtualizada);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Erro ao atualizar multa",
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

      await multaService.softDelete(id);

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
