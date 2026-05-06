import { Request, Response } from "express";
import { pagamentoService } from "../pagamento/pagamento.service";
import { PaymentStatus } from "../../../generated/prisma/enums";
import { paymentQueue } from "../../queues/payment.queue"

export class WebHookSicoobController {
    async pix(req: Request, res: Response) {
        try {
            const { pix } = req.body;

            if (!pix || pix.length === 0) {
                return res.status(400).json({ erro: "Nenhum pagamento recebido" });
            }

            for (const pagamentoPix of pix) {
                const { txid, horario } = pagamentoPix;

                // Atualiza status do pagamento
                const pagamento = await pagamentoService.findByGatewayId(txid);

                if (!pagamento) {
                    console.warn(`Pagamento gatewayId=${txid} não encontrado no banco`);
                    continue; // pula para o próximo pagamento
                }

                if (pagamento.status === PaymentStatus.PAID) continue;

                await pagamentoService.update(
                    { gatewayId: txid },
                    {
                        status: PaymentStatus.PAID,
                        paidAt: new Date(horario),
                    }
                );

                console.log(`Pagamento gatewayId=${txid} atualizado para Pago`);


                const job = await paymentQueue.add(
                    "processarPagamento",
                    {
                        pagamentoId: pagamento.id,
                        metodo: "PIX"
                    },
                    {
                        jobId: pagamento.id, // 👈 evita duplicar job
                    },

                );
                console.log("Job adicionado na fila:", job.id);
            }

            return res
                .status(200)
                .json({ mensagem: "Webhook processado e jobs adicionados na fila" });
        } catch (error: any) {
            console.error("Erro ao processar webhook PIX:", error);
            return res.status(500).json({ erro: error.message });
        }
    }
}

export const webHookSicoobController = new WebHookSicoobController();