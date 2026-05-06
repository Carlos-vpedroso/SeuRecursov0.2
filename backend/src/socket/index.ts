import { Server } from "socket.io";
import Redis from "ioredis";
import prisma from "../config/prisma"
import jwt from "jsonwebtoken"
import { JwtPayload } from "../types/jwtPayload";

let io: Server;

export async function initSocket(server: any) {
    io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000", "https://seurecurso.com"]
        },
    });

    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;

            if (!token) {
                return next(new Error("Não autorizado"));
            }

            // 🔥 aqui você valida o token
            const user = jwt.verify(token, process.env.JWT_TOKEN!) as JwtPayload;

            socket.data.user = user; // salva no socket

            next();
        } catch (error) {
            return next(new Error("Token inválido"));
        }
    });

    io.on("connection", (socket) => {
        console.log("🔌 Cliente conectado:", socket.id);

        socket.on("join_payment", async (paymentId) => {
            try {
                const user = socket.data.user;

                const pagamento = await prisma.pagamento.findUnique({
                    where: { id: paymentId },
                });

                if (!pagamento) {
                    return socket.emit("error", "Pagamento não encontrado");
                }

                if (pagamento.userId !== user.id) {
                    return socket.emit("error", "Acesso negado");
                }

                socket.join(`payment-${paymentId}`);

                console.log(`✅ Usuário ${user.id} entrou na sala payment-${paymentId}`);
            } catch (error) {
                console.error("Erro no join_payment:", error);
                socket.emit("error", "Erro interno");
            }
        });
    });

    // 🔥 Redis subscriber (ioredis)
    const subscriber = new Redis(process.env.REDIS_URL!);

    subscriber.on("connect", () => {
        console.log("🟢 Redis conectado (subscriber)");
    });

    subscriber.on("error", (err) => {
        console.error("🔴 Redis erro:", err);
    });

    subscriber.on("message", (channel, message) => {
        if (channel === "payment_confirmed") {
            const data = JSON.parse(message);

            if (!data.pagamentoId || isNaN(Number(data.pagamentoId))) {
                return console.error("🔴 ID do pagamento inválido")
            }

            console.log("📩 Evento recebido do worker:", data);

            io.to(`payment-${data.pagamentoId}`).emit("payment_confirmed", data);
        }
    });
}

export function getIO() {
    if (!io) throw new Error("Socket não inicializado");
    return io;
}