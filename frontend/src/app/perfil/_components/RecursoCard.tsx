"use client";

import { Download, Eye, Clock3 } from "lucide-react";
import { Recurso } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { recursoService } from "@/services/recurso.service";
import GerarPdf from "@/pdfSistem/GerarPdf";
import { toast } from "sonner";

interface RecursoCardProps {
  recurso: Recurso;
  accessToken: string;
}

const severityStyles = {
  LEVE: "border-green-500/20 bg-green-500/10 text-green-600",
  MEDIA: "border-yellow-500/20 bg-yellow-500/10 text-yellow-600",
  GRAVE: "border-orange-500/20 bg-orange-500/10 text-orange-600",
  GRAVISSIMA: "border-red-500/20 bg-red-500/10 text-red-600",
};

export default function RecursoCard({
  recurso,
  accessToken,
}: RecursoCardProps) {
  const severityClass = severityStyles[recurso.multa.tipo_multa];

  const handleMakePDF = async (download: boolean, readOnly: boolean) => {
    try {
      if (!accessToken) {
        console.error("Token não encontrado");
        return;
      }

      const response = await recursoService.makePDF(recurso.id, accessToken);

      if (!response.success || !response.data) {
        if (response.status === 410) {
          toast.error(
            response.error || "O prazo para acesso a este recurso expirou.",
          );
          return;
        }

        toast.error(response.error || "Erro ao gerar PDF");
        return;
      }

      const { dadosFormulario, dadosUsuario, endereco } = response.data;

      await GerarPdf({
        dadosRecurso: dadosFormulario,
        dadosUsuario,
        endereco,
        selectedMulta: recurso.multa,
        download,
        readOnly,
      });
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    }
  };

  return (
    <Card className="border-border/70 bg-card/95 shadow-sm transition-all duration-300">
      <CardHeader className="gap-3 border-b pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-texto2 truncate text-xl font-semibold">
              {recurso.nome}
            </CardTitle>

            <p className="text-texto2/60 mt-1 text-sm font-medium">
              {recurso.autoInfracao}
            </p>
          </div>

          <Badge
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${severityClass}`}
          >
            {recurso.multa.tipo_multa}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-texto2/60 flex flex-wrap items-center gap-2 text-xs">
            <span>{recurso.multa.codigo_multa}</span>
            <span>•</span>
            <span>{recurso.multa.artigo_multa}</span>
          </div>

          <div className="text-texto2/60 flex items-center gap-2 text-sm">
            <Clock3 className="h-4 w-4" />
            <span>Pago em {formatDate(recurso.payment!.paidAt)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between space-y-5">
        <p className="text-texto2/80 line-clamp-3 text-sm leading-6">
          {recurso.multa.descricao}
        </p>

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-4 text-red-400">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase">
              Valor da multa
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {formatCurrency(recurso.multa.valor_multa)}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4 text-emerald-600 ring-1 ring-emerald-500/10">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase">
              Valor do recurso
            </p>
            <p className="mt-2 text-3xl font-bold">
              {formatCurrency(recurso.multa.valor_recurso)}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t bg-transparent p-4">
        <button
          className="bg-cor1 hover:bg-cor1/90 text-texto flex h-8 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          onClick={() => handleMakePDF(false, true)}
        >
          <Eye className="h-4 w-4" />
          Visualizar Recurso
        </button>

        <button
          className="bg-cor2 hover:bg-cor2/90 text-texto flex h-8 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          onClick={() => handleMakePDF(true, false)}
        >
          <Download className="h-4 w-4" />
          Baixar Recurso
        </button>
      </CardFooter>
    </Card>
  );
}
