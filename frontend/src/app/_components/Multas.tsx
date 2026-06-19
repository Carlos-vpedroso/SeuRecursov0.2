import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import {
  RefreshCcw,
  ScrollText,
  Search,
  ClipboardList,
  ShieldCheck,
  FileCheck,
  CreditCard,
} from "lucide-react";
import { useState } from "react";
import { multasMock } from "@/data/multas";
import { useAuth } from "@/hook/useAuth";
import { RecursoContext } from "@/context/RecursoContext";
import CardMultas from "@/components/Cardmultas";
import Link from "next/link";

const cards = [
  {
    title: "Passo 1",
    subtitle: "Encontre sua infração",
    description:
      "Pesquise sua infração pelo código, artigo ou descrição da multa e encontre rapidamente o motivo da autuação.",
    src: "/Passo1.png",
    icon: Search,
  },
  {
    title: "Passo 2",
    subtitle: "Responda poucas perguntas",
    description:
      "Selecione a infração recebida e responda algumas perguntas rápidas para criarmos um recurso completo, técnico e profissional.",
    src: "/Passo2.png",
    icon: ClipboardList,
  },
  {
    title: "Passo 3",
    subtitle: "Preencha seus dados com segurança",
    description:
      "Informe seus dados pessoais com total segurança. Nossa plataforma utiliza criptografia para garantir 100% de proteção das suas informações.",
    src: "/Passo3.png",
    icon: ShieldCheck,
  },
  {
    title: "Passo 4",
    subtitle: "Revise e confirme",
    description:
      "Visualize um resumo completo das informações preenchidas e confirme os dados para a geração final do seu recurso.",
    src: "/Passo4.png",
    icon: FileCheck,
  },
  {
    title: "Passo 5",
    subtitle: "Pagamento e download imediato",
    description:
      "Realize o pagamento via PIX ou Cartão e acesse imediatamente sua área “Meus Recursos” para baixar seu recurso profissional.",
    src: "/Passo5.png",
    icon: CreditCard,
  },
];

export default function Multas() {
  const [loading, setLoading] = useState(false);

  const { setSelectedMulta } = useAuth(RecursoContext);

  return (
    <section id="multas" className="bg-fundo2 relative min-h-screen">
      <div className="container mx-auto flex max-w-11/12 flex-col space-y-8 py-12">
        {/* CAROUSEL + PASSO A PASSO */}
        <div className="relative w-full">
          <Carousel
            className="m-0 w-full p-0 select-none"
            opts={{
              loop: true,
              align: "center",
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnMouseEnter: true,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent>
              {cards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <CarouselItem key={index} className="basis-[80%] pl-4">
                    <div className="relative flex h-80 overflow-hidden rounded-xl">
                      {/* IMAGEM */}
                      <Image
                        src={card.src}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/80" />

                      {/* CONTEÚDO */}
                      <div className="text-texto relative z-10 flex h-full w-full flex-col justify-between p-8">
                        {/* TOPO */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="space-y-2">
                            <h1 className="font-title text-2xl font-bold lg:text-4xl">
                              {card.title}
                            </h1>

                            <h2 className="font-title text-texto/80 hidden text-2xl lg:block">
                              {card.subtitle}
                            </h2>
                          </div>

                          {Icon && (
                            <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                              <Icon className="text-texto h-6 w-6 lg:h-8 lg:w-8" />
                            </div>
                          )}
                        </div>

                        {/* DESCRIÇÃO */}
                        <p className="text-texto/90 max-w-2xl leading-relaxed lg:text-lg">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
        {/* INPUT + CARD DAS MULTAS */}
        <div className="relative z-10">
          <div className="focus-within:ring-cor1 flex w-full items-center overflow-hidden rounded-2xl border shadow-md transition-all duration-300 focus-within:ring-1">
            <input
              type="text"
              placeholder="Buscar Multa..."
              className="text-texto2 placeholder:text-texto2/50 bg-card h-14 w-full px-5 outline-none"
            />

            <button
              onClick={() => setLoading((prev) => !prev)}
              className="bg-cor1 hover:bg-cor1/90 text-texto mr-2 flex h-10 cursor-pointer items-center gap-2 rounded-xl px-4 font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              {loading ? (
                <RefreshCcw className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span className="text-sm">Buscar</span>
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {multasMock.slice(0, 6).map((multa) => (
              <CardMultas
                key={multa.id}
                multa={multa}
                setStateSelectedMulta={setSelectedMulta}
              />
            ))}
          </div>
        </div>
        {/* BOTÃO DE VER MAIS MULTAS */}
        <div className="z-10 mt-16 mb-30 flex w-full items-center justify-center gap-4">
          {/* Botão */}
          <Link href="/multas">
            <motion.button
              initial="initial"
              whileHover="hover"
              className="bg-cor1 text-texto relative flex -skew-x-21 cursor-pointer gap-2 overflow-hidden px-6 py-3 font-semibold uppercase"
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
                className="bg-fundo absolute inset-0 z-0"
              />
              <ScrollText className="skew-x-21" />

              {/* Texto */}
              <span className="relative z-10 inline-block skew-x-21">
                Ver todas as multas
              </span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* EFEITO DA WAVE (ONDA) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <motion.svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="relative block h-64 w-full"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.path
            fill="#0f172a"
            animate={{
              d: [
                "M0,160L60,176C120,192,240,224,360,224C480,224,600,192,720,176C840,160,960,160,1080,176C1200,192,1320,224,1380,240L1440,256L1440,320L0,320Z",

                "M0,192L60,186.7C120,181,240,171,360,154.7C480,139,600,117,720,128C840,139,960,181,1080,202.7C1200,224,1320,224,1380,224L1440,224L1440,320L0,320Z",

                "M0,160L60,176C120,192,240,224,360,224C480,224,600,192,720,176C840,160,960,160,1080,176C1200,192,1320,224,1380,240L1440,256L1440,320L0,320Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </div>
    </section>
  );
}
