import { NextPage } from "next";
import { formatCurrency } from "@/lib/utils";
import { Multa } from "@/types";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

interface Props {
  multa: Multa;
  setStateSelectedMulta: React.Dispatch<React.SetStateAction<Multa | null>>;
}

const Cardmultas: NextPage<Props> = ({ multa, setStateSelectedMulta }) => {
  const router = useRouter();

  const handleClick = () => {
    try {
      setStateSelectedMulta(multa);
      router.push(`/formulario`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="bg-card cursor-pointer rounded-2xl border p-4 shadow-lg backdrop-blur-md transition-all duration-300 select-none hover:scale-[1.02] active:scale-[0.98]"
      onClick={handleClick}
    >
      <ScrollArea className="h-24">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-title text-texto2 my-auto text-lg">
            {multa.descricao}
          </h1>
        </div>
      </ScrollArea>
      <Separator className="my-4" />

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 lg:justify-between">
        <div className="flex flex-col items-center gap-2">
          <Badge className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-sm font-medium text-red-400">
            <span className="mr-2 font-semibold text-red-300">
              Multa: {formatCurrency(multa.valor_multa)}
            </span>
          </Badge>

          <Badge className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-lg font-medium text-emerald-400">
            <span className="mr-2 font-semibold text-green-700">
              Recurso: {formatCurrency(multa.valor_recurso)}
            </span>
          </Badge>
        </div>

        <div className="text-texto2/60 flex items-center gap-2">
          <span>{multa.artigo_multa}</span>
          <span>-</span>
          <span>{multa.codigo_multa}</span>
        </div>
      </div>
    </div>
  );
};

export default Cardmultas;
