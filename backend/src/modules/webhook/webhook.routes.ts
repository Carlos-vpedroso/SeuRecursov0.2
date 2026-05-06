import { Router } from "express";
import { webHookSicoobController } from "./webhookSicoob.controller";
import { webhookInfinitePayController } from "./webhookInfinitePay.controller";

const webhookRouter = Router();

webhookRouter.post("/pix", webHookSicoobController.pix)

webhookRouter.post("/infinitepay", webhookInfinitePayController.infinitepay)


export default {
    path: "/webhook",
    router: webhookRouter
}