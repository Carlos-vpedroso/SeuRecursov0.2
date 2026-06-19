import { Router } from "express";
import { userController } from "./user.controller";
import userMiddleware from "../../middlewares/userMiddleware";
import adminMiddleware from "../../middlewares/adminMiddleware";

const userRouter = Router();

userRouter.get("/all", adminMiddleware, userController.get);

userRouter.get("/:id/all-recursos", userMiddleware, userController.getAllRecursos)

userRouter.post("/auth/google", userController.authGoogle);

export default {
    path: "/users",
    router: userRouter
}