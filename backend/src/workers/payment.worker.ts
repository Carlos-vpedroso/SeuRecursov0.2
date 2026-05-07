import "dotenv/config";
import { Worker } from "bullmq";
import { redisConnection } from "../config/redis";
import prisma from "../config/prisma";
import { decrypt } from "../utils/criptografia";
import { recursoService } from "../modules/recurso/recurso.service";

async function gerarRecurso(pagamentoId: string) {
    const pagamento = await prisma.pagamento.findUnique({
        where: { id: pagamentoId },
    });

    if (!pagamento) {
        throw new Error("Pagamento não encontrado");
    }

    if (!pagamento.metadata) {
        throw new Error("Pagamento sem metadata");
    }

    // 🚫 evita duplicação
    const existing = await prisma.recurso.findUnique({
        where: { paymentId: pagamento.id },
    });

    if (existing) {
        console.log("⚠️ Recurso já existe");

        // 🔥 MESMO ASSIM, emite evento
        await redisConnection.publish(
            "payment_confirmed",
            JSON.stringify({ pagamentoId })
        );

        return;
    }

    // 🔐 descriptografa
    const metadata = decrypt(pagamento.metadata);

    // 🧠 cria recurso
    try {
        await recursoService.create({
            userId: pagamento.userId,
            multaId: pagamento.multaId,
            paymentId: pagamento.id,
            nome: metadata.dadosUsuario.nome,
            autoInfracao: metadata.dadosUsuario.autoInfracao,
            sensitiveData: pagamento.metadata,
        });

        console.log("✅ Recurso gerado com sucesso");

        await redisConnection.publish(
            "payment_confirmed",
            JSON.stringify({ pagamentoId })
        );
        
        console.log("📤 Publicando evento:", pagamentoId);

    } catch (error) {
        console.error("❌ Erro ao gerar recurso:", error);
        throw error; // importante pro BullMQ retry
    }
}

new Worker(
    "payment-queue",
    async (job) => {
        const { pagamentoId, metodo } = job.data;

        console.log("🔄 Processando:", {
            pagamentoId,
            metodo,
            jobName: job.name,
        });

        switch (metodo) {
            case "PIX":
                console.log("💰 Pagamento via PIX confirmado");
                await gerarRecurso(pagamentoId);
                break;

            case "CREDIT_CARD":
                console.log("💳 Pagamento via Cartão confirmado");
                // 👉 aqui você pode colocar lógica extra no futuro
                await gerarRecurso(pagamentoId);
                break;

            default:
                throw new Error(`Método inválido: ${metodo}`);
        }
    },
    {
        connection: redisConnection,
    }
);