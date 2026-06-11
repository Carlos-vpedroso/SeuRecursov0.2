import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
  visible: boolean;
  position?: "fixed" | "sticky" | "relative";
  flex?: boolean;
};

export default function Header({
  visible,
  position = "sticky",
  flex = true,
}: HeaderProps) {
  return (
    <header
      className={`
        ${position}
        top-0 left-0 z-50 w-full
        transition-all duration-500
        ${visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
        }
      `}
    >
      <div
        className={`
          bg-fundo/80 mx-auto h-20 px-6 backdrop-blur-md
          ${flex ? "flex items-center justify-between" : ""}
        `}
      >
        {/* LOGOTIPO */}
        <Link
          href="/"
          className="font-title text-texto text-lg font-bold tracking-wide uppercase lg:text-3xl"
        >
          Derruba Multa
        </Link>

        {/* BOTÃO */}
        <Link href="/area-do-cliente">
          <motion.button
            initial="initial"
            whileHover="hover"
            className="bg-cor1 text-texto relative flex shrink-0 -skew-x-21 cursor-pointer items-center gap-2 overflow-hidden px-6 py-3 font-semibold uppercase"
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
            <span className="relative z-10 skew-x-21">Área do Cliente</span>
            <LogIn className="skew-x-21" />
          </motion.button>
        </Link>
      </div>
    </header>
  );
}
