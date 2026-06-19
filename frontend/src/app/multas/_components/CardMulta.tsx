"use client";

import { NextPage } from "next";
import { formatCurrency } from "@/lib/utils";
import { Multa } from "@/types";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  multa: Multa;
  setStateSelectedMulta: React.Dispatch<React.SetStateAction<Multa | null>>;
}

const severityStyles = {
  LEVE: {
    badge: "border-green-500/20 bg-green-500/10 text-green-400",
    label: "Leve",
  },
  MEDIA: {
    badge: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
    label: "Média",
  },
  GRAVE: {
    badge: "border-orange-500/20 bg-orange-500/10 text-orange-400",
    label: "Grave",
  },
  GRAVISSIMA: {
    badge: "border-red-500/20 bg-red-500/10 text-red-400",
    label: "Gravíssima",
  },
};

const CardMulta: NextPage<Props> = ({ multa, setStateSelectedMulta }) => {
  const router = useRouter();

  const handleClick = () => {
    setStateSelectedMulta(multa);
    router.push("/formulario");
  };

  const severity =
    severityStyles[multa.tipo_multa as keyof typeof severityStyles] ||
    severityStyles.GRAVE;

  return (
    <div
      className="bg-card hover:border-cor1/40 flex h-full cursor-pointer flex-col rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:-translate-y-1"
      onClick={handleClick}
    >
      {/* TOPO */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-title text-texto2 text-xl font-bold">
            {multa.artigo_multa}
          </h2>
          <p className="text-texto2/50 mt-1 text-sm">{multa.codigo_multa}</p>
        </div>

        <Badge className={`rounded-xl border p-2 text-sm ${severity.badge}`}>
          {severity.label}
        </Badge>
      </div>

      {/* DESCRIÇÃO */}
      <ScrollArea className="mt-4 max-h-16 flex-1">
        <p className="text-texto2/80">{multa.descricao}</p>
      </ScrollArea>

      {/* PREÇOS */}
      <div className="mt-4 flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col justify-between rounded-2xl border border-red-500/10 bg-red-500/5 p-4">
          <p className="text-xs font-semibold tracking-wide whitespace-nowrap text-red-400 uppercase">
            Valor da multa
          </p>

          <h3 className="mt-1 text-2xl font-bold text-red-400">
            {formatCurrency(multa.valor_multa)}
          </h3>
        </div>

        <div className="flex w-full flex-col justify-between rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4 text-emerald-600">
          <p className="text-xs font-semibold tracking-wide whitespace-nowrap uppercase">
            Valor do recurso
          </p>

          <h3 className="mt-1 text-4xl font-bold">
            {formatCurrency(multa.valor_recurso)}
          </h3>
        </div>
      </div>

      <button className="bg-cor1 hover:bg-cor1/90 text-texto text- mt-6 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 font-semibold transition-all duration-200">
        Adquirir Recurso
        <ArrowRight />
      </button>
    </div>
  );
};

export default CardMulta;
