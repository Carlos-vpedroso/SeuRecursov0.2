"use client";
import { Eraser, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import PriceSlider from "./_components/PriceSlider";
import CardMulta from "./_components/CardMulta";
import { RecursoContext } from "@/context/RecursoContext";
import { useAuth } from "@/hook/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

const severities = [
  {
    label: "Leve",
    value: "LEVE",
    hover: "hover:bg-green-500/10 hover:border-green-500/20",
    checked:
      "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500",
  },
  {
    label: "Média",
    value: "MEDIA",
    hover: "hover:bg-yellow-500/10 hover:border-yellow-500/20",
    checked:
      "data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500",
  },
  {
    label: "Grave",
    value: "GRAVE",
    hover: "hover:bg-orange-500/10 hover:border-orange-500/20",
    checked:
      "data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500",
  },
  {
    label: "Gravíssima",
    value: "GRAVISSIMA",
    hover: "hover:bg-red-500/10 hover:border-red-500/20",
    checked:
      "data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500",
  },
];

export default function MultasPage() {
  const { multas, setSelectedMulta, loading } = useAuth(RecursoContext);

  const [search, setSearch] = useState("");
  const [multasPriceRange, setMultasPriceRange] = useState<number[]>([0, 0]);
  const [recursosPriceRange, setRecursosPriceRange] = useState<number[]>([
    0, 0,
  ]);
  const [selectedSeverities, setSelectedSeverities] = useState<string[]>([]);

  const { minMultasPrice, maxMultasPrice, minRecursosPrice, maxRecursosPrice } =
    useMemo(() => {
      const multasValues = multas.map((m) => Number(m.valor_multa));
      const recursosValues = multas.map((m) => Number(m.valor_recurso));

      return {
        minMultasPrice: Math.min(...multasValues),
        maxMultasPrice: Math.max(...multasValues),
        minRecursosPrice: Math.min(...recursosValues),
        maxRecursosPrice: Math.max(...recursosValues),
      };
    }, []);

  const toggleSeverity = (value: string) => {
    setSelectedSeverities((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value],
    );
  };

  useEffect(() => {
    setMultasPriceRange([minMultasPrice, maxMultasPrice]);
    setRecursosPriceRange([minRecursosPrice, maxRecursosPrice]);
  }, [minMultasPrice, maxMultasPrice, minRecursosPrice, maxRecursosPrice]);

  const filteredMultas = useMemo(() => {
    return multas.filter((multa) => {
      const multasPrice = Number(multa.valor_multa);
      const recursosPrice = Number(multa.valor_recurso);

      const matchesSearch =
        multa.descricao.toLowerCase().includes(search.toLowerCase()) ||
        multa.artigo_multa.toLowerCase().includes(search.toLowerCase()) ||
        multa.codigo_multa.toLowerCase().includes(search.toLowerCase());

      const matchesSeverity =
        selectedSeverities.length === 0 ||
        selectedSeverities.some((severity) => severity === multa.tipo_multa);

      const matchesMultasPrice =
        multasPrice >= multasPriceRange[0] &&
        multasPrice <= multasPriceRange[1];

      const matchesRecursosPrice =
        recursosPrice >= recursosPriceRange[0] &&
        recursosPrice <= recursosPriceRange[1];

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesMultasPrice &&
        matchesRecursosPrice
      );
    });
  }, [search, selectedSeverities, multasPriceRange, recursosPriceRange]);

  return (
    <main className="flex min-h-screen flex-col">
      <Header visible={true} />
      <div className="bg-fundo2 grid flex-1 grid-cols-1 lg:grid-cols-4">
        <div className="border-fundo col-span-1 space-y-6 p-8 lg:border-r">
          <h1 className="font-title text-texto2 text-2xl font-semibold">
            Filtros
          </h1>

          {/* PESQUISA */}
          <div className="focus-within:ring-cor1 bg-card flex w-full items-center overflow-hidden rounded-2xl border shadow-md transition-all duration-300 focus-within:ring-1">
            <div className="text-cor1 pointer-events-none ml-4">
              <Search className="h-5 w-5" />
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar multa por descrição, código ou artigo..."
              className="text-texto2 placeholder:text-texto2/50 h-14 w-full bg-transparent px-4 outline-none"
            />
          </div>

          <PriceSlider
            type="Multas"
            min={minMultasPrice}
            max={maxMultasPrice}
            value={multasPriceRange}
            onChange={setMultasPriceRange}
          />

          <PriceSlider
            type="Recursos"
            min={minRecursosPrice}
            max={maxRecursosPrice}
            value={recursosPriceRange}
            onChange={setRecursosPriceRange}
          />

          <Separator />

          <div>
            <h2 className="text-texto2/60 mb-3 text-sm font-semibold tracking-wide uppercase">
              Gravidade
            </h2>

            <div className="space-y-2">
              {severities.map((severity) => (
                <label
                  key={severity.value}
                  className={`${severity.hover} text-texto2/80 flex cursor-pointer items-center justify-between rounded-lg border p-3 shadow-sm transition`}
                >
                  <span className="font-medium">{severity.label}</span>
                  <Checkbox
                    className={severity.checked}
                    id={severity.value}
                    checked={selectedSeverities.includes(severity.value)}
                    onCheckedChange={() => toggleSeverity(severity.value)}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3 p-4 lg:p-8">
          <div className="mb-6 flex items-end justify-between px-4">
            <h1 className="font-title text-texto2 text-3xl font-bold">
              {filteredMultas.length}
              <span className="text-texto2/60 ml-2 text-xl font-medium">
                Multas Encontradas
              </span>
            </h1>

            <button
              onClick={() => {
                setSearch("");
                setSelectedSeverities([]);
                setMultasPriceRange([minMultasPrice, maxMultasPrice]);
                setRecursosPriceRange([minRecursosPrice, maxRecursosPrice]);
              }}
              className="bg-cor1 hover:bg-cor1/90 text-texto mr-2 flex h-10 cursor-pointer items-center gap-2 rounded-xl px-4 font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              <Eraser className="h-4 w-4" />

              <span className="text-sm">Limpar Filtros</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 2xl:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-64 w-full rounded-2xl bg-gray-300"
                />
              ))
            ) : filteredMultas.length > 0 ? (
              filteredMultas.map((multa) => (
                <CardMulta
                  key={multa.id}
                  multa={multa}
                  setStateSelectedMulta={setSelectedMulta}
                />
              ))
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 lg:col-span-3">
                <Search className="text-texto2/30 h-16 w-16" />

                <div className="text-center">
                  <h2 className="text-texto2 text-xl font-semibold">
                    Nenhuma multa encontrada
                  </h2>

                  <p className="text-texto2/60 mt-2 max-w-md">
                    Nenhuma multa corresponde aos filtros aplicados. Tente
                    ajustar a pesquisa, os valores ou as gravidades
                    selecionadas.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
