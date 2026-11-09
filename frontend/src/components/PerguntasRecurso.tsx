"use client";

import type { DadosFormulario } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

export type PerguntasRecursoProps = {
  fato: string;
  tempoNotificacao: string;
  agente: string;
  acessoAuto: string;
  detalhamentoEtilometro: string;
  etilometroCondutorRetirada: string;
  isBafometro: boolean;
  comentarios: {
    fato: string;
  };
  setDadosFormulario: React.Dispatch<React.SetStateAction<DadosFormulario>>;
};

type CampoPergunta =
  | "fato"
  | "tempoNotificacao"
  | "agente"
  | "acessoAuto"
  | "detalhamentoEtilometro"
  | "etilometroCondutorRetirada";

type Pergunta = {
  campo: CampoPergunta;
  texto: string;
  condicao?: "abordagem" | "bafometro";
};

const perguntas: Pergunta[] = [
  {
    campo: "fato",
    texto: "Você gostaria de descrever os fatos ocorridos na sua multa?",
  },
  {
    campo: "tempoNotificacao",
    texto:
      "A notificação de autuação (primeira notificação) foi emitida em mais de 30 dias após a data do cometimento da infração?",
  },
  {
    campo: "agente",
    texto: "O veículo foi parado e abordado pelo agente de trânsito?",
  },
  {
    campo: "acessoAuto",
    texto:
      "Você teve acesso ao auto de infração (papel da infração) no momento da abordagem?",
    condicao: "abordagem",
  },
  {
    campo: "detalhamentoEtilometro",
    texto:
      "Na notificação recebida há o detalhamento do aparelho etilômetro oferecido na abordagem?",
    condicao: "bafometro",
  },
  {
    campo: "etilometroCondutorRetirada",
    texto:
      "Caso o veículo não tenha sido encaminhado para o pátio, foi oferecido o etilômetro ao condutor que retirou o veículo?",
    condicao: "bafometro",
  },
];

const opcoes = [
  { valor: "NÃO", rotulo: "Não" },
  { valor: "SIM", rotulo: "Sim" },
] as const;

export default function PerguntasRecurso({
  fato,
  tempoNotificacao,
  agente,
  acessoAuto,
  detalhamentoEtilometro,
  etilometroCondutorRetirada,
  isBafometro,
  comentarios,
  setDadosFormulario,
}: PerguntasRecursoProps) {
  const respostas: Record<CampoPergunta, string> = {
    fato,
    tempoNotificacao,
    agente,
    acessoAuto,
    detalhamentoEtilometro,
    etilometroCondutorRetirada,
  };

  const perguntasVisiveis = perguntas.filter((pergunta) => {
    if (pergunta.condicao === "abordagem") return agente === "SIM";
    if (pergunta.condicao === "bafometro") return isBafometro;
    return true;
  });

  const responder = (campo: CampoPergunta, resposta: "SIM" | "NÃO") => {
    setDadosFormulario((prev) => ({
      ...prev,
      [campo]: resposta,
      ...(campo === "fato" ? { fatoComentario: "" } : {}),
      ...(campo === "agente" ? { acessoAuto: "" } : {}),
    }));
  };

  return (
    <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
      {perguntasVisiveis.map((pergunta, index) => (
        <motion.section
          key={pergunta.campo}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          aria-labelledby={`pergunta-${pergunta.campo}`}
          className="border-border flex min-w-0 gap-4 rounded-md border p-4"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="bg-cor1 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3
              id={`pergunta-${pergunta.campo}`}
              className="text-base leading-snug"
            >
              {pergunta.texto}
            </h3>

            <div
              role="group"
              aria-labelledby={`pergunta-${pergunta.campo}`}
              className="flex items-center gap-4"
            >
              {opcoes.map((opcao) => (
                <button
                  key={opcao.valor}
                  type="button"
                  aria-pressed={respostas[pergunta.campo] === opcao.valor}
                  onClick={() => responder(pergunta.campo, opcao.valor)}
                  className={`hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                    respostas[pergunta.campo] === opcao.valor
                      ? "border-cor1 bg-cor1/10"
                      : "border-border"
                  }`}
                >
                  <span>{opcao.rotulo}</span>
                </button>
              ))}
            </div>

            {pergunta.campo === "fato" && (
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
                        value={comentarios.fato}
                        onChange={(e) =>
                          setDadosFormulario((prev) => ({
                            ...prev,
                            fatoComentario: e.target.value,
                          }))
                        }
                        aria-label="Descrição dos fatos"
                        placeholder="Informe sobre o ocorrido"
                        rows={4}
                        className="border-input h-24 w-full min-w-0 resize-none rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
