import { Request, Response } from "express";
import { pagamentoService } from "../pagamento/pagamento.service";
import { PaymentStatus } from "../../../generated/prisma/enums";
import { paymentQueue } from "../../queues/payment.queue";

export class WebhookInfinitePayController {
  async infinitepay(req: Request, res: Response) {
    try {
      const {
        transaction_nsu,
        order_nsu,
        amount,
        paid_amount,
        capture_method,
      } = req.body;

      // 🔍 validação básica
      if (!order_nsu || !transaction_nsu) {
        return res.status(400).json({
          error: "Dados inválidos no webhook",
        });
      }

      // 🔍 busca pagamento pelo gatewayId (que você salvou como order_nsu)
      const pagamento = await pagamentoService.findByGatewayId(order_nsu);

      if (!pagamento) {
        console.warn(`Pagamento order_nsu=${order_nsu} não encontrado`);
        return res.status(200).json({ ok: true }); // evita retry desnecessário
      }

      if (pagamento.status === PaymentStatus.PAID) {
        return res.status(200).json({ ok: true });
      }

      // 💾 atualiza pagamento
      await pagamentoService.update(
        { id: pagamento.id },
        {
          status: PaymentStatus.PAID,
          paidAt: new Date(),
          gatewayId: order_nsu, // mantém consistência
        }
      );

      console.log(`Pagamento ${order_nsu} atualizado para PAID`);

      // 🚀 envia para fila
      const job = await paymentQueue.add(
        "processarPagamento",
        {
          pagamentoId: pagamento.id,
          metodo: capture_method === "pix" ? "PIX" : "CREDIT_CARD",
        },
        {
          jobId: pagamento.id,
        }
      );

      console.log("Job adicionado:", job.id);

      return res.status(200).json({ ok: true });

    } catch (error: any) {
      console.error("Erro webhook InfinitePay:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}

export const webhookInfinitePayController = new WebhookInfinitePayController();