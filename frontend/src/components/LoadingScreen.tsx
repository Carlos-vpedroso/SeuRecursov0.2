"use client";

import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  text: string;
}

export default function LoadingScreen({
  text = "Aguarde enquanto recuperamos os dados do recurso e as informações das multas.",
}: LoadingScreenProps) {
  return (
    <div className="bg-fundo2 flex min-h-screen items-center justify-center">
      <div className="max-w-md space-y-6 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="flex justify-center"
        >
          <LoaderCircle size={70} className="text-cor1" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-texto2 font-title text-2xl font-bold">
            Carregando informações
          </h2>

          <p className="text-muted-foreground">{text}</p>
        </div>
      </div>
    </div>
  );
}
