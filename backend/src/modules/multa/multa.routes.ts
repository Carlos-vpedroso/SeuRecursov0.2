import { Router } from "express";
import { multaController } from "./multa.controller";
import adminMiddleware from "../../middlewares/adminMiddleware";

const multaRouter = Router();

multaRouter.get("/all", multaController.getAll);

multaRouter.get("/get/:id", multaController.getById);

multaRouter.post("/create", adminMiddleware, multaController.createMulta);

multaRouter.put("/update/:id", adminMiddleware, multaController.update);

multaRouter.delete("/delete/:id", adminMiddleware, multaController.delete);

export default {
  path: "/multas",
  router: multaRouter,
};
