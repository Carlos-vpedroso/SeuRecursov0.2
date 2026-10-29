"use client";

import { AlertTriangle, Home, ScrollText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContextoVazio() {
  return (
    <div className="bg-fundo2 flex min-h-[91vh] items-center justify-center">
      <div className="max-w-md space-y-4 text-center">
        <AlertTriangle className="mx-auto text-yellow-500" size={60} />

        <h2 className="text-texto2 text-2xl font-bold">
          Nenhuma multa selecionada
        </h2>

        <p className="text-muted-foreground">
          Não encontramos os dados necessários para continuar o preenchimento do
          recurso.
        </p>
        <div className="flex flex-col-reverse items-center justify-around gap-4 lg:flex-row">
          <Link href="/">
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
              <Home className="skew-x-21" />

              {/* Texto */}
              <span className="relative z-10 inline-block skew-x-21">
                Inicio
              </span>
            </motion.button>
          </Link>
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
    </div>
  );
}
