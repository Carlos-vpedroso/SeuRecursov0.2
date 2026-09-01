import { Router } from "express";
import commanderMiddleware from "../../middlewares/commanderMiddleware";
import { adminController } from "./admin.controller";

const adminRouter = Router();

adminRouter.post("/create", commanderMiddleware, adminController.create);

adminRouter.post("/login", adminController.login);

adminRouter.put("/update/:id", commanderMiddleware, adminController.update);

adminRouter.delete("/delete/:id", commanderMiddleware, adminController.delete);

export default {
  path: "/admin",
  router: adminRouter,
};
