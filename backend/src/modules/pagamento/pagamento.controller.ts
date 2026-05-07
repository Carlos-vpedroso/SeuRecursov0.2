import { Request, Response } from "express";
import { pagamentoService } from "./pagamento.service";
import { PaymentGateway, PaymentMethod } from "../../../generated/prisma/enums";
import { createPixSicoob } from "../../integration/sicoob/sicoobPix";
import { createInfinitePayLink } from "../../integration/infinite_pay/infinitePayLink";

function validateRequiredFields(obj: any, path = ""): string[] {
    let errors: string[] = [];

    const optionalFields = [
        "dadosFormulario.patioComentario",
        "dadosFormulario.fatoComentario"
    ];

    for (const key in obj) {
        const value = obj[key];
        const currentPath = path ? `${path}.${key}` : key;

        // 🔥 ignora campos opcionais
        if (optionalFields.includes(currentPath)) continue;

        if (value === null || value === undefined || value === "") {
            errors.push(currentPath);
        } else if (typeof value === "object" && !Array.isArray(value)) {
            errors = errors.concat(validateRequiredFields(value, currentPath));
        }
    }

    return errors;
}

export class PagamentoController {
    async getAll(req: Request, res: Response) {
        try {
            const pagamentos = await pagamentoService.findAll();

            if (!pagamentos || pagamentos.length === 0) {
                return res.status(404).json({
                    error: "Nenhum pagamento encontrado.",
                });
            }

            return res.status(200).json(pagamentos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Erro ao buscar Pagamentos",
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { userId, multaId, metodo, gateway, metadata } = req.body;

            // 🔍 valida campos básicos
            if (!userId || !multaId || !metodo || !gateway || !metadata) {
                return res.status(400).json({
                    success: false,
                    message: "Dados obrigatórios não enviados.",
                });
            }

            // 🔍 valida metadata completa
            const errors = validateRequiredFields(metadata);

            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Preencha todos os campos obrigatórios.",
                    fields: errors,
                });
            }

            // 🔍 valida enums (segurança)
            if (!Object.values(PaymentMethod).includes(metodo)) {
                return res.status(400).json({
                    success: false,
                    message: "Método de pagamento inválido.",
                });
            }

            if (!Object.values(PaymentGateway).includes(gateway)) {
                return res.status(400).json({
                    success: false,
                    message: "Gateway de pagamento inválido.",
                });
            }

            // 🚀 chama service
            const result = await pagamentoService.create(
                userId,
                multaId,
                metodo,
                gateway,
                metadata
            );

            if (!result.success || !result.pagamentoData?.id) {
                return res.status(400).json(result);
            }

            let paymentData: any = null;

            // 💰 PIX SICOOB
            if (
                metodo === PaymentMethod.PIX &&
                gateway === PaymentGateway.SICOOB
            ) {
                // 💰 cria PIX
                const pix = await createPixSicoob(Number(result.pagamentoData.valor));

                // 💾 atualiza pagamento
                await pagamentoService.update({ id: result.pagamentoData.id }, {
                    gatewayId: pix.txid,
                    qrCode: pix.qrCode,
                    qrCodeImage: pix.qrCodeImage
                })

                paymentData = {
                    qrCode: pix.qrCode,
                    qrCodeImage: pix.qrCodeImage,
                };
            }
            // 💳 INFINITE PAY (link de pagamento)
            if (
                metodo === PaymentMethod.CREDIT_CARD &&
                gateway === PaymentGateway.INFINITEPAY
            ) {
                const items = [
                    {
                        description: "Pagamento de recurso de multa",
                        quantity: 1,
                        price: Number(result.pagamentoData.valor) * 100 // centavos
                    }
                ];

                const order_nsu = `pedido-${result.pagamentoData.id}`;

                const link = await createInfinitePayLink(items, order_nsu);

                // 💾 salva no banco
                await pagamentoService.update(
                    { id: result.pagamentoData.id },
                    {
                        gatewayId: order_nsu,
                        checkout_url: link.checkoutUrl
                    }
                );

                paymentData = {
                    checkoutUrl: link.checkoutUrl
                };
            }

            return res.status(201).json({
                success: true,
                message: "Pagamento criado com sucesso.",
                pagamentoId: result.pagamentoData.id,
                paymentData,
            });

        } catch (error) {
            console.error("Erro ao criar pagamento:", error);

            return res.status(500).json({
                success: false,
                message: "Erro interno ao criar pagamento.",
            });
        }
    }
}

export const pagamentoController = new PagamentoController();