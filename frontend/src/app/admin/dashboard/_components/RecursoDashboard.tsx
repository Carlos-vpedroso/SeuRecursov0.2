"use client";

import { useState } from "react";
import { buscarCEP } from "@/lib/utils";
import { useAuth } from "@/hook/useAuth";
import { Textarea } from "@/components/ui/textarea";
import { Address, DadosFormulario, DadosUsuario, TipoDefesa } from "@/types";
import { Input } from "@/components/ui/input";
import GerarPdf from "@/pdfSistem";
import { DashboardContext } from "@/context/DashboardContext";
import { FloatingInput } from "@/components/FloatingInput";
import { toast } from "sonner";
import { Download, Eye } from "lucide-react";

const RecursoDashboard = () => {
  const { multas } = useAuth(DashboardContext);

  const [multaSelecionadaId, setMultaSelecionadaId] = useState("");

  const [dadosFormulario, setDadosFormulario] = useState<DadosFormulario>({
    tipoDefesa: "" as TipoDefesa,
    fato: "",
    fatoComentario: "",
    tempoNotificacao: "",
    agente: "",
    acessoAuto: "",
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

    if (!dadosUsuario.nome || !dadosUsuario.cpf) {
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

  return (
    <section className="flex max-h-screen min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-4 py-6">
      {/* HEADER */}
      <div className="flex shrink-0 flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="min-w-0">
          <h1 className="font-title text-texto2 text-2xl font-semibold">
            Geração de Recurso
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Gere recursos administrativos por aqui.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <section className="mt-6 min-h-0 flex-1 overflow-y-auto rounded-2xl p-5">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* ====================================================== */}
          {/* MULTA */}
          {/* ====================================================== */}

          <div>
            <h2 className="text-texto2 text-lg font-semibold">Infração</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Selecione a multa para a qual o recurso será gerado.
            </p>

            <div className="mt-4 max-h-[420px] overflow-y-auto rounded-xl border border-zinc-200 p-3">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {multas.map((multa) => {
                  const selecionada = multaSelecionadaId === multa.id;

                  return (
                    <button
                      key={multa.id}
                      type="button"
                      onClick={() => setMultaSelecionadaId(multa.id)}
                      className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                        selecionada
                          ? "border-cor1 bg-cor1/10 shadow-sm"
                          : "hover:border-cor1/50 border-zinc-200 bg-white hover:bg-zinc-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Indicador de seleção */}
                        <div
                          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            selecionada
                              ? "border-cor1 bg-cor1"
                              : "border-zinc-300 bg-white"
                          }`}
                        >
                          {selecionada && (
                            <div className="h-2 w-2 rounded-full bg-white" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          {/* Tipo da multa */}
                          <span
                            className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide uppercase ${
                              multa.tipo_multa === "GRAVISSIMA"
                                ? "bg-red-100 text-red-700"
                                : multa.tipo_multa === "GRAVE"
                                  ? "bg-orange-100 text-orange-700"
                                  : multa.tipo_multa === "MEDIA"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                          >
                            {multa.tipo_multa}
                          </span>
                          <span
                            className={`ml-2 inline-flex rounded-md bg-zinc-200 px-2.5 py-1 text-xs font-semibold tracking-wide uppercase`}
                          >
                            {multa.tipo_recurso}
                          </span>

                          {/* Descrição */}
                          <p
                            className={`mt-3 text-sm leading-relaxed font-medium ${
                              selecionada ? "text-cor1" : "text-texto2"
                            }`}
                          >
                            {multa.descricao}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedMulta && (
              <div className="border-cor1/30 bg-cor1/5 mt-4 rounded-xl border p-4">
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                      Infração selecionada
                    </p>

                    <p className="text-texto2 mt-2 font-medium">
                      {selectedMulta.descricao}
                    </p>

                    <span
                      className={`mt-3 inline-flex rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide uppercase ${
                        selectedMulta.tipo_multa === "GRAVISSIMA"
                          ? "bg-red-100 text-red-700"
                          : selectedMulta.tipo_multa === "GRAVE"
                            ? "bg-orange-100 text-orange-700"
                            : selectedMulta.tipo_multa === "MEDIA"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                      }`}
                    >
                      {selectedMulta.tipo_multa}
                    </span>
                    <span className="bg-cor1 mt-3 ml-2 inline-flex rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase">
                      {selectedMulta.tipo_recurso}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ====================================================== */}
          {/* TIPO DE DEFESA */}
          {/* ====================================================== */}

          <div>
            <h2 className="text-texto2 text-lg font-semibold">
              Tipo de defesa
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Selecione o tipo de defesa que será utilizado no recurso.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  label: "Defesa Prévia",
                  value: "Defesa Prévia",
                },
                {
                  label: "JARI",
                  value: "Jari",
                },
                {
                  label: "CETRAN",
                  value: "Cetran",
                },
              ].map((opcao) => {
                const selecionado = dadosFormulario.tipoDefesa === opcao.value;

                return (
                  <button
                    key={opcao.value}
                    type="button"
                    onClick={() =>
                      setDadosFormulario((prev) => ({
                        ...prev,
                        tipoDefesa: opcao.value as TipoDefesa,
                      }))
                    }
                    className={`hover:border-cor1 cursor-pointer space-y-2 rounded-xl border p-5 text-left transition-all duration-200 hover:shadow-md ${
                      selecionado
                        ? "border-cor1 bg-cor1/10 shadow-sm"
                        : "border-zinc-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={`font-title text-base font-semibold ${
                          selecionado ? "text-cor1" : "text-texto2"
                        }`}
                      >
                        {opcao.label}
                      </h3>

                      {/* Indicador de seleção */}
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          selecionado
                            ? "border-cor1 bg-cor1"
                            : "border-zinc-300 bg-white"
                        }`}
                      >
                        {selecionado && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ====================================================== */}
          {/* DADOS DO USUÁRIO */}
          {/* ====================================================== */}

          <div>
            <h2 className="text-texto2 text-lg font-semibold">
              Dados do usuário
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
              <FloatingInput
                label="Seu Nome"
                value={dadosUsuario.nome}
                setState={(value) =>
                  setDadosUsuario((prev) => ({
                    ...prev,
                    nome: value,
                  }))
                }
              />

              <FloatingInput
                label="Celular"
                value={dadosUsuario.celular}
                setState={(value) =>
                  setDadosUsuario((prev) => ({
                    ...prev,
                    celular: value,
                  }))
                }
                mask="phone"
              />

              <FloatingInput
                label="CPF"
                value={dadosUsuario.cpf}
                setState={(value) =>
                  setDadosUsuario((prev) => ({
                    ...prev,
                    cpf: value,
                  }))
                }
                mask="cpf"
              />

              <FloatingInput
                label="RG"
                value={dadosUsuario.rg}
                setState={(value) =>
                  setDadosUsuario((prev) => ({
                    ...prev,
                    rg: value,
                  }))
                }
                mask="rg"
              />

              <FloatingInput
                label="Nº do Auto da Infração"
                value={dadosUsuario.autoInfracao}
                setState={(value) =>
                  setDadosUsuario((prev) => ({
                    ...prev,
                    autoInfracao: value,
                  }))
                }
              />

              <FloatingInput
                label="Placa do Veículo"
                value={dadosUsuario.placaVeiculo}
                setState={(value) =>
                  setDadosUsuario((prev) => ({
                    ...prev,
                    placaVeiculo: value,
                  }))
                }
                mask="plate"
              />
            </div>
            <div className="mx-auto mt-6 grid grid-cols-1 gap-2 lg:col-span-2">
              <div className="flex gap-4">
                <div
                  onClick={() =>
                    setDadosUsuario((prev) => ({
                      ...prev,
                      solicitante: "Procurador",
                    }))
                  }
                  className={`bg-card hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                    dadosUsuario.solicitante === "Procurador"
                      ? "border-cor1 bg-cor1/10"
                      : "border-border"
                  } `}
                >
                  <span>Procurador</span>
                </div>
                <div
                  onClick={() =>
                    setDadosUsuario((prev) => ({
                      ...prev,
                      solicitante: "Condutor",
                    }))
                  }
                  className={`bg-card hover:border-cor1 max-h-10 cursor-pointer space-y-2 rounded-lg border p-2 text-center transition-all hover:shadow-md ${
                    dadosUsuario.solicitante === "Condutor"
                      ? "border-cor1 bg-cor1/10"
                      : "border-border"
                  } `}
                >
                  <span>Condutor</span>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================== */}
          {/* ENDEREÇO */}
          {/* ====================================================== */}

          <div>
            <h2 className="text-texto2 text-lg font-semibold">Endereço</h2>

            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <FloatingInput
                label="CEP"
                value={endereco.cep ?? ""}
                setState={handleCEP}
                mask="cep"
              />

              <FloatingInput
                label="Cidade"
                value={endereco.cidade}
                setState={(value) =>
                  setEndereco((prev) => ({
                    ...prev,
                    cidade: value,
                  }))
                }
                disabled
              />

              <FloatingInput
                label="Estado"
                value={endereco.uf}
                setState={(value) =>
                  setEndereco((prev) => ({
                    ...prev,
                    uf: value.toUpperCase(),
                  }))
                }
                disabled
              />
            </div>
          </div>

          {/* ====================================================== */}
          {/* PERGUNTAS */}
          {/* ====================================================== */}

          <div>
            <h2 className="text-texto2 text-lg font-semibold">Perguntas</h2>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* 01 - FATOS */}
              <div className="bg-card rounded-xl border p-5">
                <div className="bg-cor1 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                  01
                </div>

                <h3 className="mt-4 text-lg">
                  Você gostaria de descrever os fatos ocorridos na sua multa?
                </h3>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setDadosFormulario((prev) => ({
                        ...prev,
                        fato: "NÃO",
                        fatoComentario: "",
                      }))
                    }
                    className={`cursor-pointer rounded-lg border px-4 py-2 ${
                      dadosFormulario.fato === "NÃO"
                        ? "border-cor1 bg-cor1/10"
                        : ""
                    }`}
                  >
                    Não
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setDadosFormulario((prev) => ({
                        ...prev,
                        fato: "SIM",
                        fatoComentario: "",
                      }))
                    }
                    className={`cursor-pointer rounded-lg border px-4 py-2 ${
                      dadosFormulario.fato === "SIM"
                        ? "border-cor1 bg-cor1/10"
                        : ""
                    }`}
                  >
                    Sim
                  </button>
                </div>

                {dadosFormulario.fato === "SIM" && (
                  <Textarea
                    className="mt-4"
                    placeholder="Informe sobre o ocorrido"
                    value={dadosFormulario.fatoComentario}
                    onChange={(e) =>
                      setDadosFormulario((prev) => ({
                        ...prev,
                        fatoComentario: e.target.value,
                      }))
                    }
                  />
                )}
              </div>

              {/* 02 - NOTIFICAÇÃO */}
              <div className="bg-card rounded-xl border p-5">
                <div className="bg-cor1 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                  02
                </div>

                <h3 className="mt-4 text-lg">
                  A notificação de autuação (primeira notificação) foi emitida
                  em mais de 30 dias após a data do cometimento da infração?
                </h3>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setDadosFormulario((prev) => ({
                        ...prev,
                        tempoNotificacao: "NÃO",
                      }))
                    }
                    className={`cursor-pointer rounded-lg border px-4 py-2 ${
                      dadosFormulario.tempoNotificacao === "NÃO"
                        ? "border-cor1 bg-cor1/10"
                        : ""
                    }`}
                  >
                    Não
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setDadosFormulario((prev) => ({
                        ...prev,
                        tempoNotificacao: "SIM",
                      }))
                    }
                    className={`cursor-pointer rounded-lg border px-4 py-2 ${
                      dadosFormulario.tempoNotificacao === "SIM"
                        ? "border-cor1 bg-cor1/10"
                        : ""
                    }`}
                  >
                    Sim
                  </button>
                </div>
              </div>

              {/* 03 - AGENTE */}
              <div className="bg-card rounded-xl border p-5">
                <div className="bg-cor1 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                  03
                </div>

                <h3 className="mt-4 text-lg">
                  O veículo foi parado e abordado pelo agente de trânsito?
                </h3>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setDadosFormulario((prev) => ({
                        ...prev,
                        agente: "NÃO",
                        acessoAuto: "",
                      }))
                    }
                    className={`cursor-pointer rounded-lg border px-4 py-2 ${
                      dadosFormulario.agente === "NÃO"
                        ? "border-cor1 bg-cor1/10"
                        : ""
                    }`}
                  >
                    Não
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setDadosFormulario((prev) => ({
                        ...prev,
                        agente: "SIM",
                        acessoAuto: "",
                      }))
                    }
                    className={`cursor-pointer rounded-lg border px-4 py-2 ${
                      dadosFormulario.agente === "SIM"
                        ? "border-cor1 bg-cor1/10"
                        : ""
                    }`}
                  >
                    Sim
                  </button>
                </div>
              </div>

              {/* 04 - ACESSO AO AUTO */}
              {dadosFormulario.agente === "SIM" && (
                <div className="bg-card rounded-xl border p-5">
                  <div className="bg-cor1 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                    04
                  </div>

                  <h3 className="mt-4 text-lg">
                    Você teve acesso ao auto de infração (papel da infração) no
                    momento da abordagem?
                  </h3>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setDadosFormulario((prev) => ({
                          ...prev,
                          acessoAuto: "NÃO",
                        }))
                      }
                      className={`cursor-pointer rounded-lg border px-4 py-2 ${
                        dadosFormulario.acessoAuto === "NÃO"
                          ? "border-cor1 bg-cor1/10"
                          : ""
                      }`}
                    >
                      Não
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setDadosFormulario((prev) => ({
                          ...prev,
                          acessoAuto: "SIM",
                        }))
                      }
                      className={`cursor-pointer rounded-lg border px-4 py-2 ${
                        dadosFormulario.acessoAuto === "SIM"
                          ? "border-cor1 bg-cor1/10"
                          : ""
                      }`}
                    >
                      Sim
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ====================================================== */}
          {/* GERAR */}
          {/* ====================================================== */}

          <div className="flex justify-end gap-3 border-t border-zinc-200 pt-6">
            <button
              type="button"
              onClick={() => handleGerarRecurso(false, true)}
              disabled={gerando}
              className="text-texto2 hover:border-cor1 hover:bg-cor1/5 flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Eye className="h-5 w-5" />
              Visualizar
            </button>

            <button
              type="button"
              onClick={() => handleGerarRecurso(true, false)}
              disabled={gerando}
              className="bg-cor1 flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 font-medium text-white transition hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-5 w-5" />
              {gerando ? "Gerando..." : "Baixar PDF"}
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default RecursoDashboard;
