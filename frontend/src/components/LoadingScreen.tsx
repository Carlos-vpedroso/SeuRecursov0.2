"use client";

import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
    return (
        <div className="flex min-h-screen bg-fundo2 items-center justify-center">
            <div className="max-w-md text-center space-y-6">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                    className="flex justify-center"
                >
                    <LoaderCircle
                        size={70}
                        className="text-cor1"
                    />
                </motion.div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-texto2 font-title">
                        Carregando informações
                    </h2>

                    <p className="text-muted-foreground">
                        Aguarde enquanto recuperamos os dados do recurso e as
                        informações das multas.
                    </p>
                </div>
            </div>
        </div>
    );
}