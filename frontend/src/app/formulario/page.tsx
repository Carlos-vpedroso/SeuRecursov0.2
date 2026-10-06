"use client";
import Header from "@/components/Header";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecursoContext } from "@/context/RecursoContext";
import { useAuth } from "@/hook/useAuth";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import { TipoDefesaComponent } from "./_components/TipoDefesa";
import Questions from "./_components/Questions";
import InfoUsuario from "./_components/InfoUsuario";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ContextoVazio from "@/components/ContextoVazio";
import Link from "next/link";
import LoadingScreen from "@/components/LoadingScreen";

export default function FormularioPage() {
  const {
    selectedMulta,
    dadosFormulario,
    setDadosFormulario,
    dadosUsuario,
    setDadosUsuario,
    endereco,
    setEndereco,
    loading,
  } = useAuth(RecursoContext);

  const progresso = useMemo(() => {
    const { fatoComentario, acessoAuto, ...dadosFormularioSemComentarios } =
      dadosFormulario;
    const { logradouro, numero, bairro, ...enderecoClear } = endereco;
    const campos = [
      ...Object.values(dadosFormularioSemComentarios),
      ...Object.values(dadosUsuario),
      ...Object.values(enderecoClear),
    ];

    const preenchidos = campos.filter(
      (valor) => valor !== "" && valor !== null && valor !== undefined,
    ).length;

    return Math.round((preenchidos / campos.length) * 100);
  }, [dadosFormulario, dadosUsuario, endereco]);

  const progressColor =
    progresso < 30
      ? "[&>div]:bg-red-500"
      : progresso < 70
        ? "[&>div]:bg-yellow-500"
        : "[&>div]:bg-green-500";

  const [step, setStep] = useState(1);
  const router = useRouter();

  // USE_EFFECT PARA APARECER ALERTA DE RELOAD DA PAGE
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (loading) {
    return (
      <LoadingScreen text="Aguarde enquanto recuperamos os dados do recurso e as informações das multas." />
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <TipoDefesaComponent
            onNext={() => setStep(2)}
            tipoDefesa={dadosFormulario.tipoDefesa}
            setTipoDefesa={(value) =>
              setDadosFormulario((prev) => ({
                ...prev,
                tipoDefesa: value,
              }))
            }
          />
        );

      case 2:
        return (
          <Questions
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            fato={dadosFormulario.fato}
            tempoNotificacao={dadosFormulario.tempoNotificacao}
            agente={dadosFormulario.agente}
            acessoAuto={dadosFormulario.acessoAuto}
            comentarios={{
              fato: dadosFormulario.fatoComentario,
            }}
            setDadosFormulario={setDadosFormulario}
          />
        );

      case 3:
        return (
          <InfoUsuario
            onNext={() => {
              localStorage.setItem(
                "recurso-formulario",
                JSON.stringify({
                  selectedMulta,
                  dadosFormulario,
                  dadosUsuario,
                  endereco,
                }),
              );

              router.push("/formulario/revisao");
            }}
            onBack={() => setStep(2)}
            nome={dadosUsuario.nome}
            celular={dadosUsuario.celular}
            cpf={dadosUsuario.cpf}
            rg={dadosUsuario.rg}
            autoInfracao={dadosUsuario.autoInfracao}
            placaVeiculo={dadosUsuario.placaVeiculo}
            solicitante={dadosUsuario.solicitante}
            cep={endereco.cep}
            cidade={endereco.cidade}
            uf={endereco.uf}
            setDadosUsuario={setDadosUsuario}
            setEndereco={setEndereco}
          />
        );

      // case 4:
      //     return (
      //         <Step4Revisao
      //             onBack={() => setStep(3)}
      //         />
      //     );

      default:
        return null;
    }
  };
  if (!selectedMulta) {
    return (
      <main>
        <Header visible={true} position="relative" />
        <ContextoVazio />
      </main>
    );
  }
  return (
    <main className="bg-fundo2 text-texto2 flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-11/12 items-start py-2">
        <Link href="/">
          <motion.button
            initial="initial"
            whileHover="hover"
            className="text-texto relative flex -skew-x-21 cursor-pointer gap-2 overflow-hidden bg-red-400 px-6 py-3 font-semibold uppercase"
          >
            {/* Background animado */}
            <motion.div
              variants={{
                initial: {
                  x: "-100%",
                  opacity: 0,
                },
                hover: {
                  x: "0%",
                  opacity: 1,
                },
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0 z-0 bg-red-900"
            />
            <ArrowLeft className="skew-x-21" />

            {/* Texto */}
            <span className="relative z-10 inline-block skew-x-21">Voltar</span>
          </motion.button>
        </Link>
      </div>

      <section className="mx-auto flex max-w-11/12 flex-1 flex-col items-center justify-center py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="flex h-full w-full lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                className="h-full w-full"
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
          <div>
            <div className="bg-card border-border mb-6 rounded-md p-4 shadow-sm">
              <div className="mb-2 flex justify-between space-x-4">
                <span className="font-title text-sm font-medium">
                  Progresso do Formulário
                </span>
                <span className="font-title text-sm font-bold">
                  {progresso}%
                </span>
              </div>

              <Progress value={progresso} className={`h-3 ${progressColor}`} />
            </div>
            <Card className="h-fit">
              <CardHeader className="font-title">
                <CardTitle>Informações da Multa</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-sm">Código</p>
                  <p className="font-medium">{selectedMulta.codigo_multa}</p>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm">Artigo</p>
                  <p className="font-medium">{selectedMulta.artigo_multa}</p>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm">Tipo</p>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
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
                </div>

                <div>
                  <p className="text-muted-foreground text-sm">Descrição</p>
                  <p className="font-medium">{selectedMulta.descricao}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-2">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Valor da Multa
                    </p>
                    <p className="font-bold text-red-600">
                      R$ {selectedMulta.valor_multa}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm">
                      Valor do Recurso
                    </p>
                    <p className="font-bold text-green-600">
                      R$ {selectedMulta.valor_recurso}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
