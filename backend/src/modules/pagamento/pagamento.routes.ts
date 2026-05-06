import { Router } from "express"
import { pagamentoController } from "./pagamento.controller"
import userMiddleware from "../../middlewares/userMiddleware";

const pagamentoRouter = Router();

pagamentoRouter.get("/getall", pagamentoController.getAll)

pagamentoRouter.post("/create", userMiddleware, pagamentoController.create)

export default {
    path: "/pagamentos",
    router: pagamentoRouter
}