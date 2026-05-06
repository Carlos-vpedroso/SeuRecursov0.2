import app from "./app";
import http from "http";
import { initSocket } from "./src/socket";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

// 🔥 cria server HTTP
const server = http.createServer(app);

// 🔥 inicia socket
initSocket(server);

// 🚀 sobe o server correto
server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});