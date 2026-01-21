'use client'
import { useAuth } from "@/context";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import GerarPdf from "../../pdfSistem/GerarPdf"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DadosUsuario } from "@/types";


function Purchase() {
    const searchParams = useSearchParams();
    const dadosCrus = searchParams.get("dados");
    const [dados, setDados] = useState<DadosUsuario | null>(null);
    const { dadosFormulario } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (dadosCrus) {
            try {
                const decodificados = JSON.parse(atob(decodeURIComponent(dadosCrus)));
                console.log(decodificados)
                setDados(decodificados);
            } catch (error) {
                console.error("Erro ao decodificar os dados:", error);
            }
        }
    }, [dadosCrus]);

    if (!dados || !dadosFormulario) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">Carregando...</p>
            </div>
        );
    }

    const valorMulta = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(dadosFormulario.valorMulta);
    const valorRecurso = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(dadosFormulario.valorRecurso);

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
                        <p><strong>Nome:</strong> {dados.nome}</p>
                        <p><strong>CPF:</strong> {dados.cpf}</p>
                        <p><strong>RG:</strong> {dados.rg} ({dados.ufEmissao})</p>
                        <p><strong>Telefone:</strong> {dados.celular}</p>
                        <p><strong>Tipo de Usuário:</strong> {dados.tipoUsuario}</p>
                        <p><strong>Solicitante:</strong> {dados.solicitante}</p>
                    </CardContent>
                </Card>

                {/* Endereço */}
                <Card className="border border-gray-200 shadow-md rounded-xl">
                    <CardContent className="space-y-2 pt-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Endereço</h2>
                        <p><strong>CEP:</strong> {dados.cep}</p>
                        <p><strong>Logradouro:</strong> {dados.logradouro}, {dados.numero}</p>
                        <p><strong>Bairro:</strong> {dados.bairro}</p>
                        <p><strong>Cidade:</strong> {dados.cidade} - {dados.uf}</p>
                    </CardContent>
                </Card>

                {/* Dados da Multa */}
                <Card className="md:col-span-2 border border-gray-200 shadow-md rounded-xl">
                    <CardContent className="space-y-2 pt-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Detalhes da Multa</h2>
                        <p><strong>Nº do Auto:</strong> {dados.autoInfracao}</p>
                        <p><strong>Placa do Veículo:</strong> {dados.placaVeiculo}</p>
                        <p><strong>Motivo:</strong> {dadosFormulario.descricao}</p>
                        <p><strong>Tipo da Defesa:</strong> {dadosFormulario.tipoDefesa}</p>
                        <p><strong>Valor da Multa:</strong> {valorMulta}</p>
                        <p><strong>Valor do Recurso:</strong> {valorRecurso}</p>
                    </CardContent>
                </Card>

                {/* <Card className="md:col-span-2 border border-gray-200 shadow-md rounded-xl">
                    <CardContent className="space-y-2 pt-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">Método de Pagamento</h2>
                        <Label>Cartão</Label>
                        <Input type="text" placeholder="Nº Cartão" />
                    </CardContent>
                </Card> */}
            </div>

            {/* Botão de Finalizar */}
            {/* <div className="pt-4 w-full justify-around flex">
                <Button
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold text-lg px-8 py-4 rounded-xl cursor-pointer"
                    onClick={() => router.back()}
                >
                    Voltar
                </Button>
                <Button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-8 py-4 rounded-xl cursor-pointer"
                    onClick={() => GerarPdf(dadosFormulario, dados)}
                >
                    Finalizar Compra
                </Button>
            </div> */}
        </section>
    );
}

export default Purchase;