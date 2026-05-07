import { Router } from "express";
import { recursoController } from "./recurso.controller";
import userMiddleware from "../../middlewares/userMiddleware";

const recursoRouter = Router();

recursoRouter.get("/make-pdf/:id", userMiddleware, recursoController.findByIdWithSensitiveData)

export default {
    path: "/recursos",
    router: recursoRouter
}