
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DadosFormulario } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { MoveLeft, MoveRight } from "lucide-react";

type StepProps = {
    onBack: () => void;
    onNext: () => void;
    fato: string;
    notificado: string;
    tempoNotificacao: string;
    agente: string;
    acessoAuto: string;
    patio: string;
    comentarios: {
        fato: string,
        patio: string
    }
    setDadosFormulario: React.Dispatch<React.SetStateAction<DadosFormulario>>;
};

export default function Questions({
    onBack,
    onNext,
    fato,
    notificado,
    tempoNotificacao,
    agente,
    acessoAuto,
    patio,
    comentarios,
    setDadosFormulario
}: StepProps) {


    const podeAvancar =
        (
            fato === "NÃO" ||
            (fato === "SIM" && comentarios.fato !== "")
        ) &&
        notificado !== "" &&
        agente !== "" &&
        (
            agente === "NÃO" ||
            (
                acessoAuto !== "" &&
                (
                    patio === "NÃO" ||
                    (patio === "SIM" && comentarios.patio !== "")
                )
            )
        );
    return (
        <Card className="w-full h-full flex flex-col bg-card justify-between select-none">
            <CardHeader>
                <CardTitle className="font-title text-lg">Perguntas</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Fatos */}
                <main className="flex w-full border border-border rounded-md p-4 gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                        {/* Question */}
                        <div className="flex items-center">
                            <div className="flex bg-cor1 p-4 rounded-full w-4 h-4 items-center justify-center text-white font-bold">
                                <span>01</span>
                            </div>
                        </div>
                        <h1 className="text-lg">Você gostaria de descrever os fatos ocorridos na sua multa?</h1>

                        {/* Answer */}
                        <div className="flex items-center gap-4">
                            <div
                                onClick={() =>
                                    setDadosFormulario((prev) => ({
                                        ...prev,
                                        fato: 'NÃO',
                                        fatoComentario: ""
                                    }))}
                                className={`max-h-10
                                cursor-pointer rounded-lg border p-2 text-center transition-all
                                hover:border-cor1 hover:shadow-md space-y-2
                                ${fato === "NÃO"
                                        ? "border-cor1 bg-cor1/10"
                                        : "border-border"
                                    }
                            `}>
                                <span>Não</span>
                            </div>
                            <div
                                onClick={() =>
                                    setDadosFormulario((prev) => ({
                                        ...prev,
                                        fato: "SIM",
                                        fatoComentario: ""
                                    }))}
                                className={`max-h-10
                                cursor-pointer rounded-lg border p-2 text-center transition-all
                                hover:border-cor1 hover:shadow-md space-y-2
                                ${fato === "SIM"
                                        ? "border-cor1 bg-cor1/10"
                                        : "border-border"
                                    }
                            `}>
                                <span>Sim</span>
                            </div>
                        </div>
                        <AnimatePresence>
                            {fato === "SIM" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden w-full"
                                >
                                    <div className="flex w-full items-center justify-center pt-2">
                                        <textarea
                                            onChange={(e) => setDadosFormulario((prev) => ({
                                                ...prev,
                                                fatoComentario: e.target.value
                                            }))}
                                            placeholder="Informe sobre o ocorrido"
                                            rows={4}
                                            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none resize-none max-h-20"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>


                </main>
                {/* Notificação */}
                <main className="flex w-full border border-border rounded-md p-4 gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                        {/* Question */}
                        <div className="flex items-center">
                            <div className="flex bg-cor1 p-4 rounded-full w-4 h-4 items-center justify-center text-white font-bold">
                                <span>02</span>
                            </div>
                        </div>
                        <h1 className="text-lg">Você recebeu a primeira notificação da infração pelo correio?</h1>

                        {/* Answer */}
                        <div className="flex items-center gap-4">
                            <div
                                onClick={() =>
                                    setDadosFormulario((prev) => ({
                                        ...prev,
                                        notificado: 'NÃO'
                                    }))}
                                className={`max-h-10
                                cursor-pointer rounded-lg border p-2 text-center transition-all
                                hover:border-cor1 hover:shadow-md space-y-2
                                ${notificado === "NÃO"
                                        ? "border-cor1 bg-cor1/10"
                                        : "border-border"
                                    }
                            `}>
                                <span>Não</span>
                            </div>
                            <div
                                onClick={() =>
                                    setDadosFormulario((prev) => ({
                                        ...prev,
                                        notificado: "SIM"
                                    }))}
                                className={`max-h-10
                                cursor-pointer rounded-lg border p-2 text-center transition-all
                                hover:border-cor1 hover:shadow-md space-y-2
                                ${notificado === "SIM"
                                        ? "border-cor1 bg-cor1/10"
                                        : "border-border"
                                    }
                            `}>
                                <span>Sim</span>
                            </div>
                        </div>
                    </div>
                </main>
                {/* Tempo Notificação */}
                <main className="flex w-full border border-border rounded-md p-4 gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                        {/* Question */}
                        <div className="flex items-center">
                            <div className="flex bg-cor1 p-4 rounded-full w-4 h-4 items-center justify-center text-white font-bold">
                                <span>03</span>
                            </div>
                        </div>
                        <h1 className="text-lg">A notificação de autuação (primeira notificação) foi postada em mais de 30 dias após a data do cometimento da infração?</h1>

                        {/* Answer */}
                        <div className="flex items-center gap-4">
                            <div
                                onClick={() =>
                                    setDadosFormulario((prev) => ({
                                        ...prev,
                                        tempoNotificacao: 'NÃO'
                                    }))}
                                className={`max-h-10
                                cursor-pointer rounded-lg border p-2 text-center transition-all
                                hover:border-cor1 hover:shadow-md space-y-2
                                ${tempoNotificacao === "NÃO"
                                        ? "border-cor1 bg-cor1/10"
                                        : "border-border"
                                    }
                            `}>
                                <span>Não</span>
                            </div>
                            <div
                                onClick={() =>
                                    setDadosFormulario((prev) => ({
                                        ...prev,
                                        tempoNotificacao: "SIM"
                                    }))}
                                className={`max-h-10
                                cursor-pointer rounded-lg border p-2 text-center transition-all
                                hover:border-cor1 hover:shadow-md space-y-2
                                ${tempoNotificacao === "SIM"
                                        ? "border-cor1 bg-cor1/10"
                                        : "border-border"
                                    }
                            `}>
                                <span>Sim</span>
                            </div>
                        </div>
                    </div>
                </main>
                {/* Agente */}
                <main className="flex w-full border border-border rounded-md p-4 gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                        {/* Question */}
                        <div className="flex items-center">
                            <div className="flex bg-cor1 p-4 rounded-full w-4 h-4 items-center justify-center text-white font-bold">
                                <span>04</span>
                            </div>
                        </div>
                        <h1 className="text-lg">O veículo foi parado e abordado pelo agente de trânsito?</h1>

                        {/* Answer */}
                        <div className="flex items-center gap-4">
                            <div
                                onClick={() =>
                                    setDadosFormulario((prev) => ({
                                        ...prev,
                                        agente: 'NÃO',
                                        acessoAuto: "",
                                        patio: "",
                                        patioComentario: ""
                                    }))}
                                className={`max-h-10
                                cursor-pointer rounded-lg border p-2 text-center transition-all
                                hover:border-cor1 hover:shadow-md space-y-2
                                ${agente === "NÃO"
                                        ? "border-cor1 bg-cor1/10"
                                        : "border-border"
                                    }
                            `}>
                                <span>Não</span>
                            </div>
                            <div
                                onClick={() =>
                                    setDadosFormulario((prev) => ({
                                        ...prev,
                                        agente: "SIM",
                                        acessoAuto: "",
                                        patio: "",
                                        patioComentario: ""
                                    }))}
                                className={`max-h-10
                                cursor-pointer rounded-lg border p-2 text-center transition-all
                                hover:border-cor1 hover:shadow-md space-y-2
                                ${agente === "SIM"
                                        ? "border-cor1 bg-cor1/10"
                                        : "border-border"
                                    }
                            `}>
                                <span>Sim</span>
                            </div>
                        </div>
                    </div>
                </main>
                <AnimatePresence>
                    {agente === "SIM" && (
                        <>
                            {/* Acesso Auto */}
                            <motion.main
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex w-full border border-border rounded-md p-4 gap-4">
                                <div className="flex flex-col gap-2 flex-1">
                                    {/* Question */}
                                    <div className="flex items-center">
                                        <div className="flex bg-cor1 p-4 rounded-full w-4 h-4 items-center justify-center text-white font-bold">
                                            <span>05</span>
                                        </div>
                                    </div>
                                    <h1 className="text-lg">Você teve acesso ao auto de infração (papel da infração) no momento da abordagem?</h1>

                                    {/* Answer */}
                                    <div className="flex items-center gap-4">
                                        <div
                                            onClick={() =>
                                                setDadosFormulario((prev) => ({
                                                    ...prev,
                                                    acessoAuto: 'NÃO'
                                                }))}
                                            className={`max-h-10
                                cursor-pointer rounded-lg border p-2 text-center transition-all
                                hover:border-cor1 hover:shadow-md space-y-2
                                ${acessoAuto === "NÃO"
                                                    ? "border-cor1 bg-cor1/10"
                                                    : "border-border"
                                                }
                            `}>
                                            <span>Não</span>
                                        </div>
                                        <div
                                            onClick={() =>
                                                setDadosFormulario((prev) => ({
                                                    ...prev,
                                                    acessoAuto: "SIM"
                                                }))}
                                            className={`max-h-10
                                cursor-pointer rounded-lg border p-2 text-center transition-all
                                hover:border-cor1 hover:shadow-md space-y-2
                                ${acessoAuto === "SIM"
                                                    ? "border-cor1 bg-cor1/10"
                                                    : "border-border"
                                                }
                            `}>
                                            <span>Sim</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.main>
                            {/* Pátio */}
                            <motion.main
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex w-full border border-border rounded-md p-4 gap-4">
                                <div className="flex flex-col gap-2 flex-1">
                                    {/* Question */}
                                    <div className="flex items-center">
                                        <div className="flex bg-cor1 p-4 rounded-full w-4 h-4 items-center justify-center text-white font-bold">
                                            <span>06</span>
                                        </div>
                                    </div>
                                    <h1 className="text-lg">Seu veículo foi removido ao pátio ou foi liberado?</h1>

                                    {/* Answer */}
                                    <div className="flex items-center gap-4">
                                        <div
                                            onClick={() =>
                                                setDadosFormulario((prev) => ({
                                                    ...prev,
                                                    patio: 'NÃO'
                                                }))}
                                            className={`max-h-10
                                cursor-pointer rounded-lg border p-2 text-center transition-all
                                hover:border-cor1 hover:shadow-md space-y-2
                                ${patio === "NÃO"
                                                    ? "border-cor1 bg-cor1/10"
                                                    : "border-border"
                                                }
                            `}>
                                            <span>Não</span>
                                        </div>
                                        <div
                                            onClick={() =>
                                                setDadosFormulario((prev) => ({
                                                    ...prev,
                                                    patio: "SIM"
                                                }))}
                                            className={`max-h-10 cursor-pointer rounded-lg border p-2 text-center transition-all hover:border-cor1 hover:shadow-md space-y-2 ${patio === "SIM"
                                                ? "border-cor1 bg-cor1/10"
                                                : "border-border"
                                                }`}>
                                            <span>Sim</span>
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {patio === "SIM" && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden w-full"
                                            >
                                                <div className="flex w-full items-center justify-center pt-2">
                                                    <textarea
                                                        onChange={(e) => setDadosFormulario((prev) => ({
                                                            ...prev,
                                                            patioComentario: e.target.value
                                                        }))}
                                                        placeholder="Apenas cite o nome para quem foi liberado o veículo"
                                                        rows={4}
                                                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none resize-none max-h-20"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.main>
                        </>
                    )}

                </AnimatePresence>
            </CardContent>

            <CardFooter className="flex items-center justify-between bg-card">
                <button
                    onClick={onBack}
                    className="bg-transparent hover:bg-gray-200 text-texto2 flex h-10 cursor-pointer items-center  rounded-xl px-4 transition-all duration-200 border-border border"
                >
                    <MoveLeft />
                </button>
                <button
                    onClick={onNext}
                    disabled={!podeAvancar}
                    className={`
                        flex h-10 items-center rounded-xl px-4 transition-all duration-200
                        ${podeAvancar
                            ? "bg-cor1 hover:brightness-125 text-texto cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }
                        `}
                >
                    <MoveRight />
                </button>
            </CardFooter>
        </Card >
    );
}