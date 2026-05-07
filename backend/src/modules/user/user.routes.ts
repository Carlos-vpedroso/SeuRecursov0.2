import { Router } from "express";
import { userController } from "./user.controller";
import userMiddleware from "../../middlewares/userMiddleware";
import adminMiddleware from "../../middlewares/adminMiddleware";

const userRouter = Router();

userRouter.get("/all", adminMiddleware, userController.get);

userRouter.get("/:id/all-recursos", userMiddleware, userController.getAllRecursos)

userRouter.post("/create", userController.createUser);

userRouter.post("/login", userController.login);

export default {
    path: "/users",
    router: userRouter
}