import { Request, Response } from "express";
import { recursoService } from "./recurso.service";
import { AuthRequest } from "../../types/authRequest";

export class RecursoController {
  // Buscar recurso normal
  async findById(req: AuthRequest<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      // vindo do middleware JWT
      const userId = req.user!.id;
      const recurso = await recursoService.findById(id, userId);

      if (!recurso) {
        return res.status(404).json({
          message: "Recurso não encontrado",
        });
      }

      return res.status(200).json(recurso);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  }

  // Buscar recurso com dados descriptografados
  async findByIdWithSensitiveData(
    req: AuthRequest<{ id: string }>,
    res: Response,
  ) {
    try {
      const { id } = req.params;
      // vindo do middleware JWT
      const userId = req.user!.id;

      const recurso = await recursoService.findByIdWithSensitiveData(
        id,
        userId,
      );

      if (!recurso) {
        return res.status(404).json({
          message: "Recurso não encontrado",
        });
      }

      return res.status(200).json(recurso);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao descriptografar dados",
      });
    }
  }
}

export const recursoController = new RecursoController();
