import express, { Application, Request, Response } from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import routes from "./src/routes";
import { initSocket } from "./src/socket";
const app: Application = express();
const server = http.createServer(app);
initSocket(server);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", routes);
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "🚀 API do site SeuRecurso.com" })
});

export default app;