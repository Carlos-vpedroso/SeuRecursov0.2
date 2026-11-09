"use client";

import { useEffect, useRef, useState } from "react";
import { buscarCEP } from "@/lib/utils";
import { useAuth } from "@/hook/useAuth";
import PerguntasRecurso from "@/components/PerguntasRecurso";
import type {
  Address,
  DadosFormulario,
  DadosUsuario,
  TipoDefesa,
  TipoMulta,
  TipoRecurso,
} from "@/types";
import GerarPdf from "@/pdfSistem";
import { DashboardContext } from "@/context/DashboardContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { maskCPF, maskPhone, maskRG, maskPlate, maskCEP } from "@/lib/masks";
import { toast } from "sonner";
import {
  ArrowDownToLine,
  Check,
  CheckCheck,
  ChevronRight,
  Circle,
  ClipboardList,
  FileText,
  LoaderCircle,
  MapPin,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

const tiposRecurso: Record<TipoRecurso, string> = {
  ADMINISTRATIVO: "Administrativo",
  ADMINISTRATIVO_EQUIPAMENTO: "Administrativo + equipamento",
  VELOCIDADE: "Velocidade",
  BAFOMETRO: "Bafômetro",
};

const gravidades: Record<TipoMulta, { label: string; classe: string }> = {
  LEVE: {
    label: "Leve",
    classe: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  },
  MEDIA: {
    label: "Média",
    classe: "bg-amber-50 text-amber-700 ring-amber-600/15",
  },
  GRAVE: {
    label: "Grave",
    classe: "bg-orange-50 text-orange-700 ring-orange-600/15",
  },
  GRAVISSIMA: {
    label: "Gravíssima",
    classe: "bg-red-50 text-red-700 ring-red-600/15",
  },
};

const opcoesDefesa: { value: TipoDefesa; label: string; descricao: string }[] =
  [
    {
      value: "Defesa Prévia",
      label: "Defesa prévia",
      descricao: "Contestação da autuação",
    },
    { value: "Jari", label: "JARI", descricao: "Recurso em 1ª instância" },
    { value: "Cetran", label: "CETRAN", descricao: "Recurso em 2ª instância" },
  ];

const camposUsuario: {
  campo: Exclude<keyof DadosUsuario, "solicitante">;
  label: string;
  placeholder: string;
  formatar?: (value: string) => string;
  inputMode?: "text" | "numeric" | "tel";
  obrigatorio?: boolean;
}[] = [
  {
    campo: "nome",
    label: "Nome completo",
    placeholder: "Nome do recorrente",
    obrigatorio: true,
  },
  {
    campo: "cpf",
    label: "CPF",
    placeholder: "000.000.000-00",
    formatar: maskCPF,
    inputMode: "numeric",
    obrigatorio: true,
  },
  {
    campo: "rg",
    label: "RG",
    placeholder: "Número do documento",
    formatar: maskRG,
    inputMode: "numeric",
  },
  {
    campo: "celular",
    label: "Celular",
    placeholder: "(00) 00000-0000",
    formatar: maskPhone,
    inputMode: "tel",
  },
  {
    campo: "autoInfracao",
    label: "Auto de infração",
    placeholder: "Número do auto",
  },
  {
    campo: "placaVeiculo",
    label: "Placa do veículo",
    placeholder: "ABC1D23",
    formatar: maskPlate,
  },
];

const classeInput =
  "h-11 rounded-xl border-slate-200 bg-slate-50/70 px-3 text-sm placeholder:text-slate-400 focus-visible:border-cor1 focus-visible:ring-cor1/15";
const classeSecao =
  "scroll-mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-card shadow-sm";
const classeCabecalhoSecao =
  "flex items-start gap-3 border-b border-slate-100 px-5 py-5 sm:px-6";
const classeNumeroSecao =
  "flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-semibold";
const classeFoco =
  "outline-none focus-visible:ring-3 focus-visible:ring-cor1/30";

function normalizarBusca(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const RecursoDashboard = () => {
  const { multas, loading: carregandoMultas } = useAuth(DashboardContext);
  const conteudoRef = useRef<HTMLDivElement>(null);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    // Descarta uma posição de rolagem do documento preservada pelo navegador.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setHidratado(true);
  }, []);

  const [multaSelecionadaId, setMultaSelecionadaId] = useState("");

  const [dadosFormulario, setDadosFormulario] = useState<DadosFormulario>({
    tipoDefesa: "" as TipoDefesa,
    recorreuDefesaPrevia: "",
    fato: "",
    fatoComentario: "",
    tempoNotificacao: "",
    agente: "",
    acessoAuto: "",
    detalhamentoEtilometro: "",
    etilometroCondutorRetirada: "",
  });

  const [dadosUsuario, setDadosUsuario] = useState<DadosUsuario>({
    nome: "",
    cpf: "",
    rg: "",
    celular: "",
    autoInfracao: "",
    placaVeiculo: "",
    solicitante: "",
  });

  const [endereco, setEndereco] = useState<Address>({
    cep: "",
    cidade: "",
    uf: "",
  });

  const [gerando, setGerando] = useState(false);
  const [buscaMulta, setBuscaMulta] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<TipoRecurso | "TODOS">("TODOS");

  const selectedMulta = multas.find((multa) => multa.id === multaSelecionadaId);

  const handleCEP = async (value: string) => {
    setEndereco((prev) => ({
      ...prev,
      cep: value,
    }));

    const cepLimpo = value.replace(/\D/g, "");

    if (cepLimpo.length !== 8) return;

    const response = await buscarCEP(cepLimpo);

    if (!response.success) {
      setEndereco((prev) => ({
        ...prev,
        cidade: "",
        uf: "",
      }));

      return;
    }

    setEndereco((prev) => ({
      ...prev,
      cidade: response.data.localidade ?? "",
      uf: response.data.uf ?? "",
    }));
  };

  const handleGerarRecurso = async (download: boolean, readOnly: boolean) => {
    if (!selectedMulta) {
      toast.info("Selecione uma multa.");
      return;
    }

    if (!dadosUsuario.nome || !dadosUsuario.cpf || !dadosUsuario.solicitante) {
      toast.info("Preencha os dados do usuário.");
      return;
    }

    if (!endereco.cidade || !endereco.uf) {
      toast.info("Informe um CEP válido.");
      return;
    }

    if (!dadosFormulario.tipoDefesa) {
      toast.info("Selecione o tipo de defesa.");
      return;
    }

    if (dadosFormulario.fato === "SIM" && !dadosFormulario.fatoComentario) {
      toast.info("Descreva os fatos ocorridos.");
      return;
    }

    if (!dadosFormulario.fato) {
      toast.info("Responda a pergunta sobre os fatos.");
      return;
    }

    if (!dadosFormulario.tempoNotificacao) {
      toast.info("Responda a pergunta sobre a notificação.");
      return;
    }

    if (!dadosFormulario.agente) {
      toast.info("Responda a pergunta sobre a abordagem.");
      return;
    }

    if (dadosFormulario.agente === "SIM" && !dadosFormulario.acessoAuto) {
      toast.info("Responda se teve acesso ao auto de infração.");
      return;
    }

    if (selectedMulta.tipo_recurso === "BAFOMETRO") {
      if (!dadosFormulario.detalhamentoEtilometro) {
        toast.info("Responda se há detalhamento do etilômetro na notificação.");
        return;
      }

      if (!dadosFormulario.etilometroCondutorRetirada) {
        toast.info(
          "Responda se foi oferecido o etilômetro ao condutor que retirou o veículo.",
        );
        return;
      }
    }

    try {
      setGerando(true);

      await GerarPdf({
        dadosFormulario,
        dadosUsuario,
        endereco,
        selectedMulta,
        download: download,
        readOnly: readOnly,
      });
    } catch (error) {
      console.error("Erro ao gerar recurso:", error);
    } finally {
      setGerando(false);
    }
  };

  const isBafometro = selectedMulta?.tipo_recurso === "BAFOMETRO";
  const exibindoCarregamento = !hidratado || carregandoMultas;
  const multasFiltradas = multas.filter((multa) => {
    const correspondeTipo =
      filtroTipo === "TODOS" || multa.tipo_recurso === filtroTipo;
    const texto = normalizarBusca(
      `${multa.descricao} ${multa.codigo_multa} ${multa.artigo_multa}`,
    );
    return (
      correspondeTipo && texto.includes(normalizarBusca(buscaMulta.trim()))
    );
  });

  const perguntasCompletas = Boolean(
    dadosFormulario.fato &&
    (dadosFormulario.fato !== "SIM" || dadosFormulario.fatoComentario) &&
    dadosFormulario.tempoNotificacao &&
    dadosFormulario.agente &&
    (dadosFormulario.agente !== "SIM" || dadosFormulario.acessoAuto) &&
    (!isBafometro ||
      (dadosFormulario.detalhamentoEtilometro &&
        dadosFormulario.etilometroCondutorRetirada)),
  );

  const etapas = [
    {
      id: "recurso-infracao",
      titulo: "Infração",
      completo: Boolean(selectedMulta),
      icon: FileText,
    },
    {
      id: "recurso-defesa",
      titulo: "Tipo de defesa",
      completo: Boolean(dadosFormulario.tipoDefesa),
      icon: ShieldCheck,
    },
    {
      id: "recurso-usuario",
      titulo: "Dados do recorrente",
      completo: Boolean(dadosUsuario.nome && dadosUsuario.cpf),
      icon: UserRound,
    },
    {
      id: "recurso-endereco",
      titulo: "Endereço",
      completo: Boolean(endereco.cidade && endereco.uf),
      icon: MapPin,
    },
    {
      id: "recurso-perguntas",
      titulo: "Perguntas",
      completo: perguntasCompletas,
      icon: ClipboardList,
    },
  ];
  const etapasConcluidas = etapas.filter((etapa) => etapa.completo).length;
  const progresso = (etapasConcluidas / etapas.length) * 100;
  const prontoParaGerar = etapasConcluidas === etapas.length;
  const proximaEtapa = etapas.find((etapa) => !etapa.completo);
  const nomeDefesa = opcoesDefesa.find(
    (opcao) => opcao.value === dadosFormulario.tipoDefesa,
  )?.label;

  return (
    <section className="text-texto2 flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-slate-50">
      <div
        ref={conteudoRef}
        className="relative min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
      >
        <header className="bg-card shrink-0 border-b border-slate-200/80 px-5 py-5 sm:px-8 sm:py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
                <span>Administração</span>
                <ChevronRight className="size-3" aria-hidden="true" />
                <span className="font-medium text-slate-600">Recursos</span>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Gerar recurso
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Prepare a defesa e confira o documento antes de baixar.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="bg-cor1/10 text-cor1 flex size-10 items-center justify-center rounded-xl">
                <FileText className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Preenchimento</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-800">
                  {etapasConcluidas} de {etapas.length} etapas concluídas
                </p>
              </div>
            </div>
          </div>
        </header>
        <div className="mx-auto grid items-start gap-6 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_18rem] xl:p-8">
          <div className="min-w-0 space-y-5">
            <section
              id={etapas[0].id}
              aria-labelledby={`${etapas[0].id}-titulo`}
              className={classeSecao}
            >
              <div className={classeCabecalhoSecao}>
                <span
                  className={`${classeNumeroSecao} ${
                    etapas[0].completo
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-cor1/8 text-cor1"
                  }`}
                >
                  {etapas[0].completo ? <Check className="size-4" /> : "01"}
                </span>
                <div>
                  <h2
                    id={`${etapas[0].id}-titulo`}
                    className="font-semibold text-slate-900"
                  >
                    Selecione a infração
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Encontre a multa por descrição, código ou artigo.
                  </p>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_11rem]">
                  <div className="relative">
                    <Label htmlFor="recurso-busca" className="sr-only">
                      Buscar infração
                    </Label>
                    <Search
                      className="pointer-events-none absolute top-3.5 left-3.5 size-4 text-slate-400"
                      aria-hidden="true"
                    />
                    <Input
                      id="recurso-busca"
                      value={buscaMulta}
                      onChange={(event) => setBuscaMulta(event.target.value)}
                      placeholder="Buscar infração..."
                      className={`${classeInput} pr-10 pl-10`}
                    />
                    {buscaMulta && (
                      <button
                        type="button"
                        onClick={() => setBuscaMulta("")}
                        aria-label="Limpar busca"
                        className="absolute top-2 right-2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="recurso-filtro" className="sr-only">
                      Filtrar por tipo de recurso
                    </Label>
                    <select
                      id="recurso-filtro"
                      value={filtroTipo}
                      onChange={(event) =>
                        setFiltroTipo(
                          event.target.value as TipoRecurso | "TODOS",
                        )
                      }
                      className={`${classeInput} w-full text-slate-600`}
                    >
                      <option value="TODOS">Todos os tipos</option>
                      {Object.entries(tiposRecurso).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div
                  className="mb-3 flex items-center justify-between text-xs text-slate-500"
                  aria-live="polite"
                >
                  <span>
                    {exibindoCarregamento
                      ? "Carregando infrações..."
                      : `${multasFiltradas.length} ${
                          multasFiltradas.length === 1
                            ? "infração encontrada"
                            : "infrações encontradas"
                        }`}
                  </span>
                  <span>Selecione uma opção</span>
                </div>
                <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                  {exibindoCarregamento ? (
                    <div
                      role="status"
                      className="flex items-center justify-center gap-2 py-12 text-sm text-slate-500"
                    >
                      <LoaderCircle className="size-4 animate-spin" />{" "}
                      Carregando infrações...
                    </div>
                  ) : multasFiltradas.length ? (
                    multasFiltradas.map((multa) => {
                      const selecionada = multaSelecionadaId === multa.id;
                      const gravidade = gravidades[multa.tipo_multa];
                      return (
                        <button
                          key={multa.id}
                          type="button"
                          aria-pressed={selecionada}
                          onClick={() => setMultaSelecionadaId(multa.id)}
                          className={`${classeFoco} flex w-full cursor-pointer items-start gap-3 rounded-xl border p-4 text-left transition ${
                            selecionada
                              ? "border-cor1 bg-cor1/5"
                              : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${
                              selecionada
                                ? "border-cor1 bg-cor1 text-white"
                                : "border-slate-300"
                            }`}
                          >
                            {selecionada && (
                              <Check className="size-3.5" aria-hidden="true" />
                            )}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                              <span className="text-xs font-semibold text-slate-800">
                                {multa.artigo_multa}
                              </span>
                              <span className="text-xs text-slate-400">
                                {multa.codigo_multa}
                              </span>
                              <span
                                className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset ${gravidade.classe}`}
                              >
                                {gravidade.label}
                              </span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-slate-700">
                              {multa.descricao}
                            </p>
                            <p className="mt-2 text-xs text-slate-400">
                              {tiposRecurso[multa.tipo_recurso]}
                            </p>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center">
                      <Search
                        className="mb-3 size-6 text-slate-300"
                        aria-hidden="true"
                      />
                      <p className="text-sm font-medium text-slate-700">
                        Nenhuma infração encontrada
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Tente outro código, artigo ou tipo de recurso.
                      </p>
                      {(buscaMulta || filtroTipo !== "TODOS") && (
                        <button
                          type="button"
                          onClick={() => {
                            setBuscaMulta("");
                            setFiltroTipo("TODOS");
                          }}
                          className="text-cor1 mt-4 text-xs font-medium hover:underline"
                        >
                          Limpar filtros
                        </button>
                      )}
                    </div>
                  )}
                </div>
                {selectedMulta && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-xs text-emerald-700">
                    <CheckCheck
                      className="size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold">
                        {selectedMulta.artigo_multa}
                      </strong>{" "}
                      selecionado · {tiposRecurso[selectedMulta.tipo_recurso]}
                    </span>
                  </div>
                )}
              </div>
            </section>

            <section
              id={etapas[1].id}
              aria-labelledby={`${etapas[1].id}-titulo`}
              className={classeSecao}
            >
              <div className={classeCabecalhoSecao}>
                <span
                  className={`${classeNumeroSecao} ${
                    etapas[1].completo
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-cor1/8 text-cor1"
                  }`}
                >
                  {etapas[1].completo ? <Check className="size-4" /> : "02"}
                </span>
                <div>
                  <h2
                    id={`${etapas[1].id}-titulo`}
                    className="font-semibold text-slate-900"
                  >
                    Tipo de defesa
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Escolha a etapa do processo administrativo.
                  </p>
                </div>
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
                {opcoesDefesa.map((opcao) => {
                  const selecionado =
                    dadosFormulario.tipoDefesa === opcao.value;
                  return (
                    <button
                      key={opcao.value}
                      type="button"
                      aria-pressed={selecionado}
                      onClick={() =>
                        setDadosFormulario((prev) => ({
                          ...prev,
                          tipoDefesa: opcao.value,
                        }))
                      }
                      className={`${classeFoco} cursor-pointer rounded-xl border p-4 text-left transition ${
                        selecionado
                          ? "border-cor1 bg-cor1/5"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm font-semibold ${selecionado ? "text-cor1" : "text-slate-800"}`}
                        >
                          {opcao.label}
                        </span>
                        {selecionado ? (
                          <Check className="text-cor1 size-4 shrink-0" />
                        ) : (
                          <Circle className="size-4 shrink-0 text-slate-300" />
                        )}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500">
                        {opcao.descricao}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            <section
              id={etapas[2].id}
              aria-labelledby={`${etapas[2].id}-titulo`}
              className={classeSecao}
            >
              <div className={classeCabecalhoSecao}>
                <span
                  className={`${classeNumeroSecao} ${
                    etapas[2].completo
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-cor1/8 text-cor1"
                  }`}
                >
                  {etapas[2].completo ? <Check className="size-4" /> : "03"}
                </span>
                <div>
                  <h2
                    id={`${etapas[2].id}-titulo`}
                    className="font-semibold text-slate-900"
                  >
                    Dados do recorrente
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Identifique o solicitante, o veículo e o auto de infração.
                  </p>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  {camposUsuario.map((campo) => (
                    <div
                      key={campo.campo}
                      className={campo.campo === "nome" ? "sm:col-span-2" : ""}
                    >
                      <Label
                        htmlFor={`recurso-${campo.campo}`}
                        className="mb-2 block text-xs font-medium text-slate-600"
                      >
                        {campo.label}
                        {campo.obrigatorio && (
                          <span className="text-cor1 ml-1" aria-hidden="true">
                            *
                          </span>
                        )}
                      </Label>
                      <Input
                        id={`recurso-${campo.campo}`}
                        value={dadosUsuario[campo.campo]}
                        placeholder={campo.placeholder}
                        inputMode={campo.inputMode ?? "text"}
                        aria-required={campo.obrigatorio}
                        onChange={(event) => {
                          const value = campo.formatar
                            ? campo.formatar(event.target.value)
                            : event.target.value;
                          setDadosUsuario((prev) => ({
                            ...prev,
                            [campo.campo]: value,
                          }));
                        }}
                        className={classeInput}
                      />
                    </div>
                  ))}
                </div>
                <fieldset className="mt-6 border-t border-slate-100 pt-5">
                  <legend className="sr-only">
                    Quem está solicitando o recurso?
                  </legend>
                  <p className="mb-3 text-xs font-medium text-slate-600">
                    Quem está solicitando o recurso?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {(["Condutor", "Procurador"] as const).map((opcao) => (
                      <button
                        key={opcao}
                        type="button"
                        aria-pressed={dadosUsuario.solicitante === opcao}
                        onClick={() =>
                          setDadosUsuario((prev) => ({
                            ...prev,
                            solicitante: opcao,
                          }))
                        }
                        className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${
                          dadosUsuario.solicitante === opcao
                            ? "border-cor1 bg-cor1/5 text-cor1 font-medium"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {opcao === "Condutor" ? (
                          <UserRound className="size-4" />
                        ) : (
                          <ShieldCheck className="size-4" />
                        )}
                        {opcao}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            </section>

            <section
              id={etapas[3].id}
              aria-labelledby={`${etapas[3].id}-titulo`}
              className={classeSecao}
            >
              <div className={classeCabecalhoSecao}>
                <span
                  className={`${classeNumeroSecao} ${
                    etapas[3].completo
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-cor1/8 text-cor1"
                  }`}
                >
                  {etapas[3].completo ? <Check className="size-4" /> : "04"}
                </span>
                <div>
                  <h2
                    id={`${etapas[3].id}-titulo`}
                    className="font-semibold text-slate-900"
                  >
                    Endereço
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Informe o CEP para preencher a cidade e o estado.
                  </p>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <div className="grid gap-5 sm:grid-cols-[1fr_1.4fr_5rem]">
                  <div>
                    <Label
                      htmlFor="recurso-cep"
                      className="mb-2 block text-xs font-medium text-slate-600"
                    >
                      CEP
                    </Label>
                    <Input
                      id="recurso-cep"
                      value={endereco.cep ?? ""}
                      onChange={(event) =>
                        handleCEP(maskCEP(event.target.value))
                      }
                      placeholder="00000-000"
                      inputMode="numeric"
                      className={classeInput}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="recurso-cidade"
                      className="mb-2 block text-xs font-medium text-slate-600"
                    >
                      Cidade
                    </Label>
                    <Input
                      id="recurso-cidade"
                      value={endereco.cidade}
                      placeholder="Preenchida pelo CEP"
                      readOnly
                      className={`${classeInput} text-slate-500`}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="recurso-uf"
                      className="mb-2 block text-xs font-medium text-slate-600"
                    >
                      UF
                    </Label>
                    <Input
                      id="recurso-uf"
                      value={endereco.uf}
                      placeholder="UF"
                      readOnly
                      className={`${classeInput} text-slate-500`}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section
              id={etapas[4].id}
              aria-labelledby={`${etapas[4].id}-titulo`}
              className={classeSecao}
            >
              <div className={classeCabecalhoSecao}>
                <span
                  className={`${classeNumeroSecao} ${
                    etapas[4].completo
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-cor1/8 text-cor1"
                  }`}
                >
                  {etapas[4].completo ? <Check className="size-4" /> : "05"}
                </span>
                <div>
                  <h2
                    id={`${etapas[4].id}-titulo`}
                    className="font-semibold text-slate-900"
                  >
                    Perguntas sobre a infração
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    As respostas ajudam a compor o conteúdo do recurso.
                  </p>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                {isBafometro && (
                  <div className="mb-5 flex items-start gap-2 rounded-xl bg-blue-50 px-4 py-3 text-xs leading-relaxed text-blue-700">
                    <ClipboardList
                      className="mt-0.5 size-4 shrink-0"
                      aria-hidden="true"
                    />
                    Este tipo de recurso inclui perguntas específicas sobre o
                    etilômetro.
                  </div>
                )}
                <PerguntasRecurso
                  fato={dadosFormulario.fato}
                  tempoNotificacao={dadosFormulario.tempoNotificacao}
                  agente={dadosFormulario.agente}
                  acessoAuto={dadosFormulario.acessoAuto}
                  detalhamentoEtilometro={
                    dadosFormulario.detalhamentoEtilometro
                  }
                  etilometroCondutorRetirada={
                    dadosFormulario.etilometroCondutorRetirada
                  }
                  isBafometro={isBafometro}
                  comentarios={{ fato: dadosFormulario.fatoComentario }}
                  setDadosFormulario={setDadosFormulario}
                />
              </div>
            </section>
          </div>

          <aside
            className="sticky top-6 hidden space-y-4 xl:block"
            aria-label="Resumo do recurso"
          >
            <div className="bg-card overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/30">
              <div className="border-b border-slate-100 px-5 py-5">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Resumo do recurso
                  </h2>
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold tracking-wide text-slate-500">
                    PDF
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-xs text-slate-500">Preenchimento</p>
                  <span className="text-cor1 text-lg font-semibold">
                    {progresso}%
                  </span>
                </div>
                <Progress
                  value={progresso}
                  aria-label="Progresso de preenchimento"
                  className="[&_[data-slot=progress-indicator]]:bg-cor1 mt-2 h-1.5 bg-slate-100"
                />
              </div>

              <nav className="space-y-1 p-3" aria-label="Etapas do formulário">
                {etapas.map((etapa) => (
                  <button
                    key={etapa.id}
                    type="button"
                    onClick={() => {
                      const conteudo = conteudoRef.current;
                      const secao = document.getElementById(etapa.id);
                      if (!conteudo || !secao) return;

                      conteudo.scrollTo({
                        top:
                          conteudo.scrollTop +
                          secao.getBoundingClientRect().top -
                          conteudo.getBoundingClientRect().top -
                          24,
                        behavior: "smooth",
                      });
                    }}
                    className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50"
                  >
                    <span
                      className={`flex size-7 items-center justify-center rounded-lg ${etapa.completo ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}
                    >
                      {etapa.completo ? (
                        <Check className="size-3.5" />
                      ) : (
                        <etapa.icon className="size-3.5" />
                      )}
                    </span>
                    <span
                      className={`flex-1 text-xs ${etapa.completo ? "font-medium text-slate-800" : "text-slate-500"}`}
                    >
                      {etapa.titulo}
                    </span>
                    <ChevronRight
                      className="size-3 text-slate-300 group-hover:text-slate-500"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </nav>

              <div className="mx-5 space-y-4 border-t border-slate-100 py-5">
                <div>
                  <p className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                    Infração selecionada
                  </p>
                  {selectedMulta ? (
                    <>
                      <p className="mt-2 text-sm font-semibold text-slate-800">
                        {selectedMulta.artigo_multa}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {selectedMulta.descricao}
                      </p>
                      <span className="bg-cor1/5 text-cor1 mt-2 inline-block rounded-md px-2 py-1 text-[10px] font-medium">
                        {tiposRecurso[selectedMulta.tipo_recurso]}
                      </span>
                    </>
                  ) : (
                    <p className="mt-2 text-xs text-slate-400">
                      Nenhuma infração selecionada
                    </p>
                  )}
                </div>
                <div className="flex justify-between gap-3 text-xs">
                  <span className="text-slate-400">Defesa</span>
                  <span className="text-right font-medium text-slate-700">
                    {nomeDefesa ?? "Não selecionada"}
                  </span>
                </div>
                {dadosUsuario.nome && (
                  <div className="flex justify-between gap-3 text-xs">
                    <span className="text-slate-400">Recorrente</span>
                    <span className="min-w-0 truncate text-right font-medium text-slate-700">
                      {dadosUsuario.nome}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 bg-slate-50/70 p-5">
                <div
                  className={`mb-4 flex items-start gap-2 text-xs leading-relaxed ${prontoParaGerar ? "text-emerald-700" : "text-slate-500"}`}
                  aria-live="polite"
                >
                  {prontoParaGerar ? (
                    <CheckCheck className="mt-0.5 size-4 shrink-0" />
                  ) : (
                    <FileText className="mt-0.5 size-4 shrink-0" />
                  )}
                  <p>
                    {prontoParaGerar
                      ? "Tudo pronto. Confira a prévia do documento."
                      : `Próxima etapa: ${proximaEtapa?.titulo.toLowerCase()}.`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleGerarRecurso(false, true)}
                  disabled={gerando}
                  className={`${classeFoco} flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60`}
                >
                  <FileText className="size-4" /> Visualizar recurso
                </button>
                <button
                  type="button"
                  onClick={() => handleGerarRecurso(true, false)}
                  disabled={gerando}
                  className={`${classeFoco} bg-cor1 mt-2.5 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60`}
                >
                  {gerando ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <ArrowDownToLine className="size-4" />
                  )}
                  {gerando ? "Gerando documento..." : "Baixar PDF"}
                </button>
              </div>
            </div>
            <p className="px-3 text-center text-[11px] leading-relaxed text-slate-400">
              Revise as informações e as respostas antes de gerar o documento.
            </p>
          </aside>
        </div>
      </div>

      <footer className="bg-card shrink-0 border-t border-slate-200 px-4 py-3 sm:px-6 xl:hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
            {prontoParaGerar ? (
              <CheckCheck className="size-4 text-emerald-600" />
            ) : (
              <FileText className="size-4 text-slate-400" />
            )}
            {prontoParaGerar
              ? "Pronto para gerar"
              : `${etapasConcluidas} de ${etapas.length} etapas concluídas`}
          </div>
          <div className="grid w-full grid-cols-2 gap-2 sm:w-auto">
            <button
              type="button"
              onClick={() => handleGerarRecurso(false, true)}
              disabled={gerando}
              className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >
              <FileText className="size-4" /> Visualizar
            </button>
            <button
              type="button"
              onClick={() => handleGerarRecurso(true, false)}
              disabled={gerando}
              className="bg-cor1 flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {gerando ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <ArrowDownToLine className="size-4" />
              )}
              {gerando ? "Gerando..." : "Baixar PDF"}
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default RecursoDashboard;
