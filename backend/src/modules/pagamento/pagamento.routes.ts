import { Router } from "express"
import { pagamentoController } from "./pagamento.controller"
import userMiddleware from "../../middlewares/userMiddleware";
import adminMiddleware from "../../middlewares/adminMiddleware";

const pagamentoRouter = Router();

pagamentoRouter.get("/getall", adminMiddleware, pagamentoController.getAll)

pagamentoRouter.post("/create", userMiddleware, pagamentoController.create)

export default {
    path: "/pagamentos",
    router: pagamentoRouter
}