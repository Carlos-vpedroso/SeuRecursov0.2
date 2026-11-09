"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PerguntasRecurso, {
  type PerguntasRecursoProps,
} from "@/components/PerguntasRecurso";
import { MoveLeft, MoveRight } from "lucide-react";

type StepProps = PerguntasRecursoProps & {
  onBack: () => void;
  onNext: () => void;
};

export default function QuestionsPadrao({
  onBack,
  onNext,
  ...perguntasProps
}: StepProps) {
  const {
    fato,
    agente,
    acessoAuto,
    detalhamentoEtilometro,
    etilometroCondutorRetirada,
    isBafometro,
    comentarios,
  } = perguntasProps;

  const podeAvancar =
    (fato === "NÃO" || (fato === "SIM" && comentarios.fato !== "")) &&
    agente !== "" &&
    (agente === "NÃO" || acessoAuto !== "") &&
    (!isBafometro ||
      (detalhamentoEtilometro !== "" && etilometroCondutorRetirada !== ""));

  return (
    <Card className="bg-card flex h-full w-full flex-col justify-between select-none">
      <CardHeader>
        <CardTitle className="font-title text-lg">Perguntas</CardTitle>
      </CardHeader>
      <CardContent>
        <PerguntasRecurso {...perguntasProps} />
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
