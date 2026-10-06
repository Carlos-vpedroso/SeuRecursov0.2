import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TipoDefesa } from "@/types";
import { MoveRight } from "lucide-react";

type StepProps = {
  onNext: () => void;
  tipoDefesa: TipoDefesa | "";
  setTipoDefesa: (value: TipoDefesa) => void;
};

export function TipoDefesaComponent({
  onNext,
  tipoDefesa,
  setTipoDefesa,
}: StepProps) {
  const opcoes: { label: string; info: string; value: TipoDefesa }[] = [
    {
      label: "Defesa Prévia",
      info: "Verifique na multa ou consulte no site do Detran",
      value: "Defesa Prévia",
    },
    {
      label: "JARI",
      info: "Verifique na multa ou consulte no site do Detran",
      value: "Jari",
    },
    {
      label: "CETRAN",
      info: "Somente para recursos negados pela JARI",
      value: "Cetran",
    },
  ];
  const podeAvancar = tipoDefesa !== "";
  return (
    <Card className="bg-card flex h-full w-full flex-col justify-between select-none">
      <CardHeader>
        <CardTitle className="font-title text-lg">Tipo Defesa</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {opcoes.map((opcao) => (
            <div
              key={opcao.value}
              onClick={() => setTipoDefesa(opcao.value)}
              className={`hover:border-cor1 cursor-pointer space-y-2 rounded-lg border p-6 text-center transition-all hover:shadow-md ${
                tipoDefesa === opcao.value
                  ? "border-cor1 bg-cor1/10"
                  : "border-border"
              } `}
            >
              <h2 className="font-title border-border border-b text-lg font-semibold">
                {opcao.label}
              </h2>
              <p className="text-texto2/60 text-xs">{opcao.info}</p>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="bg-card flex items-center justify-end">
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
