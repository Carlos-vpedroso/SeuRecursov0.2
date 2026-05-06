import { Redis } from "ioredis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error("REDIS_URL não configurado");
}

export const redisConnection = new Redis(redisUrl, {
    maxRetriesPerRequest: null, // 👈 obrigatório para o BullMQ
    enableReadyCheck: false,    // 👈 recomendável em ambientes Docker/Render
});