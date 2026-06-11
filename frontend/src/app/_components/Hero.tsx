import { motion } from "framer-motion";
import { LogIn, MoveRight, Zap } from "lucide-react";

import { handleScrollToSection } from "@/lib/utils";
import { fadeUp, transition } from "@/lib/motionVariants";

import CardStack from "./Cards";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-screen overflow-hidden"
    >
      {/* Vídeo de fundo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/mp_.mp4" type="video/mp4" />
      </video>

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gradiente */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.92)_0%,rgba(15,23,42,0.88)_45%,rgba(15,23,42,0.75)_100%)] lg:bg-[linear-gradient(105deg,rgba(15,23,42,1),rgba(15,23,42,0.92)_50%,transparent_100%)]" />

      {/* Conteúdo */}
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Lado esquerdo */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="w-full max-w-2xl space-y-8 px-6 py-24 text-center lg:max-w-6xl lg:space-y-12 lg:px-16 lg:py-0">
            {/* Logo */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: 0.1 }}
              className="flex justify-center"
            >
              <img
                src="/Logo_Derruba.png"
                alt="Logo Derruba"
                className="h-48 w-auto scale-125 object-contain lg:h-64 lg:scale-150"
              />
            </motion.div>

            {/* Título */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: 0.3 }}
              className="font-title text-texto text-4xl leading-tight font-semibold tracking-tight lg:text-6xl lg:leading-snug"
            >
              Derrube sua multa com especialistas
            </motion.h1>

            {/* Texto */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: 0.5 }}
              className="text-texto/70 mx-auto max-w-md text-base leading-relaxed lg:max-w-2xl lg:text-2xl"
            >
              Recursos administrativos estratégicos para aumentar suas chances
              de cancelamento.
            </motion.p>

            {/* Botões */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: 0.7 }}
              className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-6"
            >
              {/* CTA principal */}
              <Link href="/multas">
                <motion.button
                  initial="initial"
                  whileHover="hover"
                  className="relative flex -skew-x-21 cursor-pointer items-center gap-3 overflow-hidden border-none bg-transparent px-10 py-[18px] outline-none"
                >
                  {/* Bordas animadas */}
                  <span className="bg-cor1 absolute top-0 left-0 h-[2px] w-full [animation:border-run-h_2s_linear_infinite]" />
                  <span className="bg-cor1 absolute bottom-0 left-0 h-[2px] w-full [animation:border-run-h_2s_linear_infinite_1s]" />
                  <span className="bg-cor1 absolute top-0 left-0 h-full w-[2px] [animation:border-run-v_2s_linear_infinite_1.5s]" />
                  <span className="bg-cor1 absolute top-0 right-0 h-full w-[2px] [animation:border-run-v_2s_linear_infinite_0.5s]" />

                  {/* Fill no hover */}
                  <motion.span
                    variants={{ initial: { x: "-101%" }, hover: { x: "0%" } }}
                    transition={{ duration: 0.4, ease: [0.77, 0, 0.18, 1] }}
                    className="bg-cor1 absolute inset-0 z-0"
                  />

                  <span className="relative z-10 flex skew-x-21 items-center gap-3 text-base font-semibold tracking-wide uppercase">
                    Comece Agora
                    <Zap size={20} />
                  </span>
                </motion.button>
              </Link>

              {/* Como funciona */}
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group relative hidden cursor-pointer lg:block"
                onClick={() => handleScrollToSection("multas")}
              >
                {/* Linha animada */}
                <motion.div
                  variants={{
                    rest: { width: 0 },
                    hover: { width: "100%" },
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeInOut",
                  }}
                  className="bg-cor1 absolute bottom-0 left-0 h-[2px]"
                />

                {/* Conteúdo */}
                <div className="flex items-center gap-3 px-2 py-2 text-lg whitespace-nowrap lg:text-xl">
                  <span className="text-texto font-medium">Como Funciona</span>

                  <motion.div
                    variants={{
                      rest: { x: 0 },
                      hover: { x: 8 },
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeInOut",
                    }}
                  >
                    <MoveRight size={24} className="text-texto" />
                  </motion.div>
                </div>
              </motion.div>

              <Link
                href="/area-do-cliente"
                className="flex items-center gap-3 px-2 py-2 text-lg whitespace-nowrap lg:hidden lg:text-xl"
              >
                <span className="text-texto font-medium">Área do Cliente</span>

                <motion.div
                  variants={{
                    rest: { x: 0 },
                    hover: { x: 8 },
                  }}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                  }}
                >
                  <MoveRight size={24} className="text-texto" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Lado direito */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.8,
          }}
          className="relative z-10 hidden flex-col items-end justify-between p-8 lg:flex"
        >
          {/* Área do cliente */}
          {/* BOTÃO */}
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

            {/* Texto */}
            <span className="relative z-10 inline-block skew-x-21">
              Área do Cliente
            </span>
            <LogIn className="skew-x-21" />
          </motion.button>

          {/* Cards */}
          <div className="flex w-full items-center justify-end">
            <CardStack />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
