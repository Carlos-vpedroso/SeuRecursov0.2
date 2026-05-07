"use client";

import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";

import { userService } from "@/services/user.service";
import { RecursoResponseWithoutMetaData } from "@/types";
import { recursoService } from "@/services/recurso.service";
import GerarPDF from "@/pdfSistem/GerarPdf"

type Props = {
    userId: string;
};

const Recursos = ({ userId }: Props) => {
    const [recursos, setRecursos] = useState<
        RecursoResponseWithoutMetaData[]
    >([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecursos = async () => {
            try {
                setLoading(true);

                const response = await userService.getAllRecursos(userId);

                if (!response.success) {
                    setError(response.error || "Erro ao buscar recursos");
                    return;
                }

                setRecursos(response.data || []);
            } catch (err) {
                console.error(err);
                setError("Erro inesperado");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchRecursos();
        }
    }, [userId]);

    const handleGerarPDF = async (
        recurso: RecursoResponseWithoutMetaData
    ) => {
        try {
            const response = await recursoService.makePDF(
                recurso.id
            );

            if (!response.success || !response.data) {
                console.error(
                    response.error || "Erro ao carregar dados do PDF"
                );

                return;
            }

            const {
                metadata: {
                    dadosFormulario,
                    dadosUsuario,
                    endereco,
                },
            } = response.data;

            if (
                !dadosFormulario ||
                !dadosUsuario ||
                !endereco
            ) {
                console.error(
                    "Dados obrigatórios do PDF não encontrados"
                );

                return;
            }

            console.log("Gerando PDF com os dados:");
            console.log({
                dadosFormulario,
                dadosUsuario,
                endereco,
                multa: recurso.multa,
            });

            await GerarPDF({
                dadosRecurso: dadosFormulario,
                dadosUsuario,
                endereco,
                selectedMulta: recurso.multa,
            });

        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-gray-500">Carregando recursos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-center font-bold text-3xl mb-8">
                Meus Recursos
            </h1>

            {recursos.length === 0 ? (
                <div className="text-center text-gray-500">
                    Nenhum recurso encontrado.
                </div>
            ) : (
                <div className="grid gap-6">
                    {recursos.map((recurso) => (
                        <div
                            key={recurso.id}
                            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-3 rounded-xl">
                                        <FileText className="text-blue-600 w-6 h-6" />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-lg text-gray-800">
                                            {recurso.nome}
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {recurso.autoInfracao}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() =>
                                        handleGerarPDF(recurso)
                                    }
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
                                >
                                    <Download size={18} />
                                    Gerar PDF
                                </button>
                            </div>

                            <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p>
                                        <span className="font-semibold">
                                            Artigo:
                                        </span>{" "}
                                        {recurso.multa.artigo_multa}
                                    </p>

                                    <p className="mt-2">
                                        <span className="font-semibold">
                                            Código:
                                        </span>{" "}
                                        {recurso.multa.codigo_multa}
                                    </p>

                                    <p className="mt-2">
                                        <span className="font-semibold">
                                            Tipo:
                                        </span>{" "}
                                        {recurso.multa.tipo_multa}
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p>
                                        <span className="font-semibold">
                                            Valor da Multa:
                                        </span>{" "}
                                        R$ {recurso.multa.valor_multa}
                                    </p>
                                    {recurso.payment?.paidAt &&
                                        <p className="mt-2">
                                            <span className="font-semibold">
                                                Pago em:
                                            </span>{" "}
                                            {new Date(
                                                recurso.payment.paidAt
                                            ).toLocaleDateString(
                                                "pt-BR"
                                            )}
                                        </p>
                                    }

                                </div>
                            </div>

                            <div className="mt-4 bg-gray-50 rounded-xl p-4">
                                <p className="font-semibold mb-2">
                                    Descrição da Infração
                                </p>

                                <p className="text-sm text-gray-700">
                                    {recurso.multa.descricao}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Recursos;