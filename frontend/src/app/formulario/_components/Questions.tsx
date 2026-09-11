import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    fato: string;
    patio: string;
  };
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
  setDadosFormulario,
}: StepProps) {
  const podeAvancar =
    (fato === "NÃO" || (fato === "SIM" && comentarios.fato !== "")) &&
    notificado !== "" &&
    agente !== "" &&
    (agente === "NÃO" ||
      (acessoAuto !== "" &&
        (patio === "NÃO" || (patio === "SIM" && comentarios.patio !== ""))));
  return (
    <Card className="bg-card flex h-full w-full flex-col justify-between select-none">
      <CardHeader>
        <CardTitle className="font-title text-lg">Perguntas</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Fatos */}
        <main className="border-border flex w-full gap-4 rounded-md border p-4">
          <div className="flex flex-1 flex-col gap-2">
            {/* Question */}
            <div className="flex items-center">
              <div className="bg-cor1 flex h-4 w-4 items-center justify-center rounded-full p-4 font-bold text-white">
                <span>01</span>
              </div>
            </div>
            <h1 className="text-lg">
              Você gostaria de descrever os fatos ocorridos na sua multa?
            </h1>

            {/* Answer */}
            <div className="flex items-center gap-4">
              <div
                onClick={() =>
                  setDadosFormulario((prev) => ({
                    ...prev,
                    fato: "NÃO",
                    fatoComentario: "",
                  }))
                }
                className={`hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                  fato === "NÃO" ? "border-cor1 bg-cor1/10" : "border-border"
                } `}
              >
                <span>Não</span>
              </div>
              <div
                onClick={() =>
                  setDadosFormulario((prev) => ({
                    ...prev,
                    fato: "SIM",
                    fatoComentario: "",
                  }))
                }
                className={`hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                  fato === "SIM" ? "border-cor1 bg-cor1/10" : "border-border"
                } `}
              >
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
                  className="w-full overflow-hidden"
                >
                  <div className="flex w-full items-center justify-center pt-2">
                    <textarea
                      onChange={(e) =>
                        setDadosFormulario((prev) => ({
                          ...prev,
                          fatoComentario: e.target.value,
                        }))
                      }
                      placeholder="Informe sobre o ocorrido"
                      rows={4}
                      className="border-input max-h-20 w-full resize-none rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
        {/* Notificação */}
        <main className="border-border flex w-full gap-4 rounded-md border p-4">
          <div className="flex flex-1 flex-col gap-2">
            {/* Question */}
            <div className="flex items-center">
              <div className="bg-cor1 flex h-4 w-4 items-center justify-center rounded-full p-4 font-bold text-white">
                <span>02</span>
              </div>
            </div>
            <h1 className="text-lg">
              Você recebeu a primeira notificação da infração pelo correio?
            </h1>

            {/* Answer */}
            <div className="flex items-center gap-4">
              <div
                onClick={() =>
                  setDadosFormulario((prev) => ({
                    ...prev,
                    notificado: "NÃO",
                  }))
                }
                className={`hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                  notificado === "NÃO"
                    ? "border-cor1 bg-cor1/10"
                    : "border-border"
                } `}
              >
                <span>Não</span>
              </div>
              <div
                onClick={() =>
                  setDadosFormulario((prev) => ({
                    ...prev,
                    notificado: "SIM",
                  }))
                }
                className={`hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                  notificado === "SIM"
                    ? "border-cor1 bg-cor1/10"
                    : "border-border"
                } `}
              >
                <span>Sim</span>
              </div>
            </div>
          </div>
        </main>
        {/* Tempo Notificação */}
        <main className="border-border flex w-full gap-4 rounded-md border p-4">
          <div className="flex flex-1 flex-col gap-2">
            {/* Question */}
            <div className="flex items-center">
              <div className="bg-cor1 flex h-4 w-4 items-center justify-center rounded-full p-4 font-bold text-white">
                <span>03</span>
              </div>
            </div>
            <h1 className="text-lg">
              A notificação de autuação (primeira notificação) foi emitida em
              mais de 30 dias após a data do cometimento da infração?
            </h1>

            {/* Answer */}
            <div className="flex items-center gap-4">
              <div
                onClick={() =>
                  setDadosFormulario((prev) => ({
                    ...prev,
                    tempoNotificacao: "NÃO",
                  }))
                }
                className={`hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                  tempoNotificacao === "NÃO"
                    ? "border-cor1 bg-cor1/10"
                    : "border-border"
                } `}
              >
                <span>Não</span>
              </div>
              <div
                onClick={() =>
                  setDadosFormulario((prev) => ({
                    ...prev,
                    tempoNotificacao: "SIM",
                  }))
                }
                className={`hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                  tempoNotificacao === "SIM"
                    ? "border-cor1 bg-cor1/10"
                    : "border-border"
                } `}
              >
                <span>Sim</span>
              </div>
            </div>
          </div>
        </main>
        {/* Agente */}
        <main className="border-border flex w-full gap-4 rounded-md border p-4">
          <div className="flex flex-1 flex-col gap-2">
            {/* Question */}
            <div className="flex items-center">
              <div className="bg-cor1 flex h-4 w-4 items-center justify-center rounded-full p-4 font-bold text-white">
                <span>04</span>
              </div>
            </div>
            <h1 className="text-lg">
              O veículo foi parado e abordado pelo agente de trânsito?
            </h1>

            {/* Answer */}
            <div className="flex items-center gap-4">
              <div
                onClick={() =>
                  setDadosFormulario((prev) => ({
                    ...prev,
                    agente: "NÃO",
                    acessoAuto: "",
                    patio: "",
                    patioComentario: "",
                  }))
                }
                className={`hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                  agente === "NÃO" ? "border-cor1 bg-cor1/10" : "border-border"
                } `}
              >
                <span>Não</span>
              </div>
              <div
                onClick={() =>
                  setDadosFormulario((prev) => ({
                    ...prev,
                    agente: "SIM",
                    acessoAuto: "",
                    patio: "",
                    patioComentario: "",
                  }))
                }
                className={`hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                  agente === "SIM" ? "border-cor1 bg-cor1/10" : "border-border"
                } `}
              >
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
                className="border-border flex w-full gap-4 rounded-md border p-4"
              >
                <div className="flex flex-1 flex-col gap-2">
                  {/* Question */}
                  <div className="flex items-center">
                    <div className="bg-cor1 flex h-4 w-4 items-center justify-center rounded-full p-4 font-bold text-white">
                      <span>05</span>
                    </div>
                  </div>
                  <h1 className="text-lg">
                    Você teve acesso ao auto de infração (papel da infração) no
                    momento da abordagem?
                  </h1>

                  {/* Answer */}
                  <div className="flex items-center gap-4">
                    <div
                      onClick={() =>
                        setDadosFormulario((prev) => ({
                          ...prev,
                          acessoAuto: "NÃO",
                        }))
                      }
                      className={`hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                        acessoAuto === "NÃO"
                          ? "border-cor1 bg-cor1/10"
                          : "border-border"
                      } `}
                    >
                      <span>Não</span>
                    </div>
                    <div
                      onClick={() =>
                        setDadosFormulario((prev) => ({
                          ...prev,
                          acessoAuto: "SIM",
                        }))
                      }
                      className={`hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                        acessoAuto === "SIM"
                          ? "border-cor1 bg-cor1/10"
                          : "border-border"
                      } `}
                    >
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
                className="border-border flex w-full gap-4 rounded-md border p-4"
              >
                <div className="flex flex-1 flex-col gap-2">
                  {/* Question */}
                  <div className="flex items-center">
                    <div className="bg-cor1 flex h-4 w-4 items-center justify-center rounded-full p-4 font-bold text-white">
                      <span>06</span>
                    </div>
                  </div>
                  <h1 className="text-lg">
                    Seu veículo foi removido ao pátio ou foi liberado?
                  </h1>

                  {/* Answer */}
                  <div className="flex items-center gap-4">
                    <div
                      onClick={() =>
                        setDadosFormulario((prev) => ({
                          ...prev,
                          patio: "NÃO",
                        }))
                      }
                      className={`hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                        patio === "NÃO"
                          ? "border-cor1 bg-cor1/10"
                          : "border-border"
                      } `}
                    >
                      <span>Removido</span>
                    </div>
                    <div
                      onClick={() =>
                        setDadosFormulario((prev) => ({
                          ...prev,
                          patio: "SIM",
                        }))
                      }
                      className={`hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                        patio === "SIM"
                          ? "border-cor1 bg-cor1/10"
                          : "border-border"
                      }`}
                    >
                      <span>Liberado</span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {patio === "SIM" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full overflow-hidden"
                      >
                        <div className="flex w-full items-center justify-center pt-2">
                          <textarea
                            onChange={(e) =>
                              setDadosFormulario((prev) => ({
                                ...prev,
                                patioComentario: e.target.value,
                              }))
                            }
                            placeholder="Apenas cite o nome para quem foi liberado o veículo"
                            rows={4}
                            className="border-input max-h-20 w-full resize-none rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"
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

      <CardFooter className="bg-card flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-texto2 border-border flex h-10 cursor-pointer items-center rounded-xl border bg-transparent px-4 transition-all duration-200 hover:bg-gray-200"
        >
          <MoveLeft />
        </button>
        <button
          onClick={onNext}
          disabled={!podeAvancar}
          className={`flex h-10 items-center rounded-xl px-4 transition-all duration-200 ${
            podeAvancar
              ? "bg-cor1 text-texto cursor-pointer hover:brightness-125"
              : "cursor-not-allowed bg-gray-300 text-gray-500"
          } `}
        >
          <MoveRight />
        </button>
      </CardFooter>
    </Card>
  );
}
