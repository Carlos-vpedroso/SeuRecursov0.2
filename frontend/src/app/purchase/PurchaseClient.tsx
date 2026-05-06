'use client'

import { useSearchParams } from "next/navigation"
import { use, useEffect, useState } from "react"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { useAuth } from "@/hook/useAuth";
import { RecursoContext } from "@/context/RecursoContext";
import { formatCurrency } from "@/lib/utils";
import { paymentService } from "@/services/payment.service";
import { UserContext } from "@/context/UserContext";


function Purchase() {
    const { user, accessToken } = useAuth(UserContext)
    const { dadosFormulario, endereco, dadosUsuario, selectedMulta } = useAuth(RecursoContext);
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [metodoPagamento, setMetodoPagamento] = useState<"PIX" | "CREDIT_CARD" | null>(null);
    const [pixData, setPixData] = useState<{
        qrCode?: string;
        qrCodeImage?: string;
    } | null>(null);
    const [openPixDialog, setOpenPixDialog] = useState(false);
    const [pagamentoId, setPagamentoId] = useState<string | null>(null);


    const handleConfirmarPagamento = async () => {
        try {
            if (!metodoPagamento || !selectedMulta || !dadosUsuario || !user) return;

            const response = await paymentService.create({
                userId: String(user.id),
                multaId: String(selectedMulta.id),
                metodo: metodoPagamento,
                gateway: metodoPagamento === "PIX" ? "SICOOB" : "INFINITEPAY",
                metadata: {
                    dadosFormulario,
                    dadosUsuario,
                    endereco,
                },
            });

            // 👉 PIX → abrir dialog com QR Code
            if (metodoPagamento === "PIX" && response.paymentData) {
                setPixData(response.paymentData);
                setPagamentoId(String(response.pagamentoId)); // 👈 importante para o socket
                setOpen(false); // fecha dialog de escolha
                setOpenPixDialog(true); // abre dialog do PIX
                return;
            }

            // 👉 Cartão → redirecionar para checkout
            if (metodoPagamento === "CREDIT_CARD" && response.paymentData?.checkoutUrl) {
                setOpen(false);
                window.location.href = response.paymentData.checkoutUrl;
                return;
            }

        } catch (error: any) {
            console.error("Erro ao criar pagamento:", error);

            if (error.fields) {
                console.log("Campos faltando:", error.fields);
            }
        }
    };

    useEffect(() => {
        if (!pagamentoId) return;

        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
            auth: {
                token: accessToken,
            },
        });

        socket.emit("join_payment", pagamentoId);

        socket.on("payment_confirmed", (data) => {
            console.log("✅ Pagamento confirmado:", data);

            setOpenPixDialog(false);

            // 🔥 redireciona
            router.push("/perfil");
        });

        return () => {
            socket.disconnect();
        };
    }, [pagamentoId]);

    if (!dadosFormulario) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">Carregando...</p>
            </div>
        );
    }

    const valorMulta = selectedMulta != null
        ? formatCurrency(selectedMulta.valor_multa)
        : null;
    const valorRecurso = selectedMulta != null
        ? formatCurrency(selectedMulta.valor_recurso)
        : null;

    return (
        <section className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-10 space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Finalizar Recurso</h1>
                <p className="text-gray-600">Confira seus dados antes de concluir a compra</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dados Pessoais */}
                <Card className="border border-gray-200 shadow-md rounded-xl">
                    <CardContent className="space-y-2 pt-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Seus dados</h2>
                        <p><strong>Nome:</strong> {dadosUsuario.nome}</p>
                        <p><strong>CPF:</strong> {dadosUsuario.cpf}</p>
                        <p><strong>RG:</strong> {dadosUsuario.rg} ({dadosUsuario.ufEmissao})</p>
                        <p><strong>Telefone:</strong> {dadosUsuario.celular}</p>
                        <p><strong>Tipo de Usuário:</strong> {dadosUsuario.tipoUsuario}</p>
                        <p><strong>Solicitante:</strong> {dadosUsuario.solicitante}</p>
                    </CardContent>
                </Card>

                {/* Endereço */}
                <Card className="border border-gray-200 shadow-md rounded-xl">
                    <CardContent className="space-y-2 pt-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Endereço</h2>
                        <p><strong>CEP:</strong> {endereco.cep}</p>
                        <p><strong>Logradouro:</strong> {endereco.logradouro}, {endereco.numero}</p>
                        <p><strong>Bairro:</strong> {endereco.bairro}</p>
                        <p><strong>Cidade:</strong> {endereco.cidade} - {endereco.uf}</p>
                    </CardContent>
                </Card>

                {/* Dados da Multa */}
                <Card className="md:col-span-2 border border-gray-200 shadow-md rounded-xl">
                    <CardContent className="space-y-2 pt-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Detalhes da Multa</h2>
                        <p><strong>Nº do Auto:</strong> {dadosUsuario.autoInfracao}</p>
                        <p><strong>Placa do Veículo:</strong> {dadosUsuario.placaVeiculo}</p>
                        <p><strong>Motivo:</strong> {selectedMulta?.descricao}</p>
                        <p><strong>Tipo da Defesa:</strong> {dadosFormulario.tipoDefesa}</p>
                        <p><strong>Valor da Multa:</strong> {valorMulta}</p>
                        <p><strong>Valor do Recurso:</strong> {valorRecurso}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Botão de Finalizar */}
            <div className="pt-4 w-full justify-around flex">
                <Button
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold text-lg px-8 py-4 rounded-xl cursor-pointer"
                    onClick={() => router.back()}
                >
                    Voltar
                </Button>
                <Button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-8 py-4 rounded-xl cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    Finalizar Compra
                </Button>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Escolha o método de pagamento</DialogTitle>
                        <DialogDescription>
                            Selecione como deseja finalizar sua compra.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-4 py-4">
                        <Button
                            variant={metodoPagamento === "PIX" ? "default" : "outline"}
                            onClick={() => setMetodoPagamento("PIX")}
                        >
                            PIX
                        </Button>

                        <Button
                            variant={metodoPagamento === "CREDIT_CARD" ? "default" : "outline"}
                            onClick={() => setMetodoPagamento("CREDIT_CARD")}
                        >
                            Cartão de Crédito
                        </Button>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>

                        <Button
                            disabled={!metodoPagamento}
                            onClick={handleConfirmarPagamento}
                        >
                            Confirmar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={openPixDialog} onOpenChange={setOpenPixDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Pagamento via PIX</DialogTitle>
                        <DialogDescription>
                            Escaneie o QR Code abaixo para pagar.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-center gap-4 py-4">
                        {pixData?.qrCodeImage && (
                            <img
                                src={pixData.qrCodeImage}
                                alt="QR Code PIX"
                                className="w-56 h-56"
                            />
                        )}

                        {pixData?.qrCode && (
                            <textarea
                                readOnly
                                value={pixData.qrCode}
                                className="w-full p-2 border rounded text-sm"
                            />
                        )}
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setOpenPixDialog(false)}>
                            Fechar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>

    );
}

export default Purchase;