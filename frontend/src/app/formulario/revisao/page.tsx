"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hook/useAuth"
import { RecursoContext } from "@/context/RecursoContext"
import { ArrowLeft, Copy, CreditCard } from "lucide-react";
import { FaPix } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { paymentService } from "@/services/payment.service";
import { io } from "socket.io-client";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import ContextoVazio from "@/components/ContextoVazio";
import Header from "@/components/Header";
import { UserContext } from "@/context/UserContext";
import LoadingScreen from "@/components/LoadingScreen";

export default function RevisaoPage() {
    const router = useRouter();
    const { accessToken, userId } = useAuth(UserContext);
    const {
        selectedMulta,
        dadosFormulario,
        dadosUsuario,
        endereco,
        loading
    } = useAuth(RecursoContext);
    const [metodoPagamento, setMetodoPagamento] = useState<"PIX" | "CREDIT_CARD" | null>(null);
    const [terms, setTerms] = useState<boolean>(false)
    const [pixData, setPixData] = useState<{
        qrCode?: string;
        qrCodeImage?: string;
    } | null>(null);
    const [openPixDialog, setOpenPixDialog] = useState(false);
    const [pagamentoId, setPagamentoId] = useState<string | null>(null);
    // USE_EFFECT PARA APARECER ALERTA DE RELOAD DA PAGE
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener(
            "beforeunload",
            handleBeforeUnload
        );

        return () => {
            window.removeEventListener(
                "beforeunload",
                handleBeforeUnload
            );
        };
    }, []);
    // CONEXÃO COM O WEB_SOCKET
    useEffect(() => {
        if (!pagamentoId) return;

        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
            transports: ["websocket"],
            auth: { token: accessToken },
        });

        socket.on("connect", () => {
            console.log("🔌 conectado");

            socket.emit("join_payment", pagamentoId);
        });

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

    if (loading) {
        return <LoadingScreen />;
    }

    if (!selectedMulta) {
        return (
            <main >
                <Header visible={true} position="relative" />
                <ContextoVazio />
            </main>
        );
    }

    function Info({
        label,
        value,
    }: {
        label: string;
        value?: string;
    }) {
        return (
            <div className="rounded-lg border p-3 bg-muted/30">
                <p className="text-xs text-muted-foreground">
                    {label}
                </p>

                <p className="font-medium">
                    {value || "-"}
                </p>
            </div>
        );
    }

    const handleConfirmarPagamento = async () => {
        try {
            if (!metodoPagamento || !selectedMulta || !dadosUsuario || !userId || !accessToken) return;

            const response = await paymentService.create({
                userId: String(userId),
                multaId: String(selectedMulta.id),
                metodo: metodoPagamento,
                gateway: metodoPagamento === "PIX" ? "SICOOB" : "INFINITEPAY",
                metadata: {
                    dadosFormulario,
                    dadosUsuario,
                    endereco,
                },
            }, accessToken);

            // 👉 PIX → abrir dialog com QR Code
            if (metodoPagamento === "PIX" && response.paymentData) {
                setPixData(response.paymentData);
                setPagamentoId(String(response.pagamentoId)); // 👈 importante para o socket
                setOpenPixDialog(true); // abre dialog do PIX
                return;
            }

            // 👉 Cartão → redirecionar para checkout
            if (metodoPagamento === "CREDIT_CARD" && response.paymentData?.checkoutUrl) {
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

    return (
        <main className="flex flex-col bg-fundo2 text-texto2 min-h-screen">
            <section className="flex flex-col items-center justify-center flex-1 max-w-11/12 mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-title">Informações Complementares</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Tipo de Defesa */}
                            <div>
                                <h3 className="font-semibold border-b pb-2 mb-3">
                                    Tipo de Defesa
                                </h3>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <Info
                                        label="Tipo"
                                        value={dadosFormulario.tipoDefesa}
                                    />
                                </div>
                            </div>

                            {/* Dados do Usuário */}
                            <div>
                                <h3 className="font-semibold border-b pb-2 mb-3">
                                    Dados do Solicitante
                                </h3>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <Info label="Nome" value={dadosUsuario.nome} />
                                    <Info label="CPF" value={dadosUsuario.cpf} />
                                    <Info label="RG" value={dadosUsuario.rg} />
                                    <Info label="Celular" value={dadosUsuario.celular} />
                                    <Info label="Solicitante" value={dadosUsuario.solicitante} />
                                </div>
                            </div>

                            {/* Veículo */}
                            <div>
                                <h3 className="font-semibold border-b pb-2 mb-3">
                                    Dados da Infração
                                </h3>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <Info
                                        label="Auto de Infração"
                                        value={dadosUsuario.autoInfracao}
                                    />
                                    <Info
                                        label="Placa"
                                        value={dadosUsuario.placaVeiculo}
                                    />
                                </div>
                            </div>

                            {/* Endereço */}
                            <div>
                                <h3 className="font-semibold border-b pb-2 mb-3">
                                    Endereço
                                </h3>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <Info label="CEP" value={endereco.cep} />
                                    <Info label="Cidade" value={endereco.cidade} />
                                    <Info label="UF" value={endereco.uf} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex flex-col space-y-4">
                        {/* Dados Da Multa */}
                        <Card>
                            <CardHeader className="font-title">
                                <CardTitle>Informações da Multa</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Código</p>
                                    <p className="font-medium">{selectedMulta.codigo_multa}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">Artigo</p>
                                    <p className="font-medium">{selectedMulta.artigo_multa}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">Tipo</p>
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${selectedMulta.tipo_multa === "GRAVISSIMA"
                                            ? "bg-red-100 text-red-700"
                                            : selectedMulta.tipo_multa === "GRAVE"
                                                ? "bg-orange-100 text-orange-700"
                                                : selectedMulta.tipo_multa === "MEDIA"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {selectedMulta.tipo_multa}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">Descrição</p>
                                    <p className="font-medium">{selectedMulta.descricao}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Valor da Multa</p>
                                        <p className="font-bold text-red-600">
                                            {formatCurrency(selectedMulta.valor_multa)}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">Valor do Recurso</p>
                                        <p className="font-bold text-green-600">
                                            {formatCurrency(selectedMulta.valor_recurso)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Método de Pagamento */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-title">
                                    Método de Pagamento
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <div className="flex justify-between border-green-200 border items-center rounded-lg bg-green-50 p-4 text-sm">
                                    <h1 className="font-semibold text-green-700">Resumo do Pedido:</h1>
                                    <span className="font-semibold text-green-700">{formatCurrency(selectedMulta.valor_recurso)}</span>

                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setMetodoPagamento("CREDIT_CARD")}
                                        className={` cursor-pointer group flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all hover:shadow-md ${metodoPagamento === "CREDIT_CARD"
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-border hover:border-blue-400"
                                            }`}
                                    >
                                        <CreditCard
                                            size={32}
                                            className={
                                                metodoPagamento === "CREDIT_CARD"
                                                    ? "text-blue-600"
                                                    : "text-muted-foreground"
                                            }
                                        />
                                        <span className="font-medium">
                                            Cartão de Crédito
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setMetodoPagamento("PIX")}
                                        className={` cursor-pointer group flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all hover:shadow-md ${metodoPagamento === "PIX"
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-border hover:border-blue-400"
                                            }`}
                                    >
                                        <FaPix
                                            size={32}
                                            className={
                                                metodoPagamento === "PIX"
                                                    ? "text-blue-600"
                                                    : "text-muted-foreground"
                                            }
                                        />
                                        <span className="font-medium">
                                            PIX
                                        </span>
                                    </button>
                                </div>
                                <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50">
                                    <Checkbox
                                        id="terms-checkbox"
                                        className="
                                            cursor-pointer
                                            border
                                            border-gray-500
                                            data-[state=checked]:bg-cor1
                                            data-[state=checked]:border-cor1
                                            data-[state=checked]:text-white
                                        "
                                        checked={terms}
                                        onCheckedChange={(checked) => setTerms(!!checked)}
                                    />

                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="terms-checkbox"
                                            className="cursor-pointer font-medium"
                                        >
                                            Confirmo que os dados informados estão corretos
                                        </Label>

                                        <p className="text-sm text-muted-foreground">
                                            Revise todas as informações antes de finalizar o pagamento.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={handleConfirmarPagamento}
                                        disabled={!metodoPagamento || !terms}
                                        className="w-full rounded-xl bg-cor1 py-3 font-semibold text-texto transition-colors duration-300 hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-500 cursor-pointer"
                                    >
                                        Finalizar Compra
                                    </button>
                                    <button
                                        onClick={() => router.push("/formulario")}
                                        className=" flex items-center justify-center gap-2 w-full rounded-xl border-border border text-texto2 py-3 font-semibold transition-colors duration-300 cursor-pointer"
                                    >
                                        <ArrowLeft size={16} />
                                        Voltar
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            {/* MODAL DO QR_CODE PIX */}
            <Dialog open={openPixDialog} onOpenChange={setOpenPixDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-title">Pagamento via PIX</DialogTitle>
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
                            <div className="flex gap-2">
                                <Input
                                    readOnly
                                    value={pixData.qrCode}
                                    className="flex-1 border rounded text-sm bg-muted"
                                />

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        navigator.clipboard.writeText(pixData.qrCode!);
                                        toast.success("Código PIX copiado!");
                                    }}
                                    className="cursor-pointer"
                                >
                                    <Copy />
                                </Button>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button className="cursor-pointer" onClick={() => setOpenPixDialog(false)}>
                            Fechar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    )
}