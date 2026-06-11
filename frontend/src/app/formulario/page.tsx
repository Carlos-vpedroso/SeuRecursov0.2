"use client";
import Header from "@/components/Header";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecursoContext } from "@/context/RecursoContext";
import { useAuth } from "@/hook/useAuth";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import { TipoDefesa } from "./_components/TipoDefesa";
import Questions from "./_components/Questions";
import InfoUsuario from "./_components/InfoUsuario";

export default function FormularioPage() {
    const {
        selectedMulta,
        dadosFormulario,
        setDadosFormulario,
        dadosUsuario,
        setDadosUsuario,
        endereco,
        setEndereco
    } = useAuth(RecursoContext);

    const progresso = useMemo(() => {
        const {
            fatoComentario,
            patioComentario,
            patio,
            acessoAuto,
            ...dadosFormularioSemComentarios
        } = dadosFormulario;
        const {
            tipoUsuario,
            ufEmissao,
            ...dadosUsuarioClear
        } = dadosUsuario;
        const {
            cep,
            logradouro,
            numero,
            bairro,
            ...enderecoClear
        } = endereco
        const campos = [
            ...Object.values(dadosFormularioSemComentarios),
            ...Object.values(dadosUsuarioClear),
            ...Object.values(enderecoClear),
        ];

        const preenchidos = campos.filter(
            (valor) => valor !== "" && valor !== null && valor !== undefined
        ).length;

        return Math.round((preenchidos / campos.length) * 100);
    }, [dadosFormulario, dadosUsuario, endereco]);

    const progressColor =
        progresso < 30
            ? "[&>div]:bg-red-500"
            : progresso < 70
                ? "[&>div]:bg-yellow-500"
                : "[&>div]:bg-green-500";

    const [step, setStep] = useState(1);

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <TipoDefesa
                        onNext={() => setStep(2)}
                        tipoDefesa={dadosFormulario.tipoDefesa}
                        setTipoDefesa={(value) =>
                            setDadosFormulario((prev) => ({
                                ...prev,
                                tipoDefesa: value,
                            }))
                        }
                    />
                );

            case 2:
                return (
                    <Questions
                        onNext={() => setStep(3)}
                        onBack={() => setStep(1)}
                        fato={dadosFormulario.fato}
                        notificado={dadosFormulario.notificado}
                        tempoNotificacao={dadosFormulario.tempoNotificacao}
                        agente={dadosFormulario.agente}
                        acessoAuto={dadosFormulario.acessoAuto}
                        patio={dadosFormulario.patio}
                        comentarios={{ fato: dadosFormulario.fatoComentario, patio: dadosFormulario.patioComentario }}
                        setDadosFormulario={setDadosFormulario}
                    />
                );

            case 3:
                return (
                    <InfoUsuario
                        onNext={() => setStep(4)}
                        onBack={() => setStep(2)}
                        nome={dadosUsuario.nome}
                        celular={dadosUsuario.celular}
                        cpf={dadosUsuario.cpf}
                        rg={dadosUsuario.rg}
                        autoInfracao={dadosUsuario.autoInfracao}
                        placaVeiculo={dadosUsuario.placaVeiculo}
                        solicitante={dadosUsuario.solicitante}
                        cep={endereco.cep}
                        cidade={endereco.cidade}
                        uf={endereco.uf}
                        setDadosUsuario={setDadosUsuario}
                        setEndereco={setEndereco}
                    />
                );

            // case 4:
            //     return (
            //         <Step4Revisao
            //             onBack={() => setStep(3)}
            //         />
            //     );

            default:
                return null;
        }
    };
    if (!selectedMulta) {
        return (
            <main>
                <Header visible={true} position="relative" />
                <section className="flex items-center justify-center min-h-screen">
                    <p>Carregando...</p>
                </section>
            </main>
        )
    }
    return (
        <main className="flex flex-col bg-fundo2 text-texto2 min-h-screen">
            <section className="flex flex-col items-center justify-center flex-1 max-w-11/12 mx-auto py-8">
                <div className="mb-6 bg-card p-4 rounded-md shadow-sm border-border">
                    <div className="flex justify-between mb-2 space-x-4">
                        <span className="text-sm font-medium font-title">
                            Progresso do Formulário
                        </span>
                        <span className="text-sm font-bold font-title">
                            {progresso}%
                        </span>
                    </div>

                    <Progress
                        value={progresso}
                        className={`h-3 ${progressColor}`}
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="flex w-full h-full lg:col-span-3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                className="w-full h-full "
                                key={step}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                {renderStep()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <Card className="h-fit">
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
                                        R$ {selectedMulta.valor_multa}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">Valor do Recurso</p>
                                    <p className="font-bold text-green-600">
                                        R$ {selectedMulta.valor_recurso}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    )
}