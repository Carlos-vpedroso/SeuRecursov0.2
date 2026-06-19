import { UserContext } from "@/context/UserContext";
import { useAuth } from "@/hook/useAuth";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
  const { user } = useAuth(UserContext);

  const initials = user?.name
    .split(" ")
    .slice(0, 2)
    .map((n: any) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header
      className={` ${position} top-0 left-0 z-50 w-full transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
      } `}
    >
      <div
        className={`bg-fundo/80 mx-auto h-20 px-6 backdrop-blur-md ${flex ? "flex items-center justify-between" : ""} `}
      >
        <div className="mx-auto flex w-full items-center justify-between lg:max-w-11/12">
          {/* LOGOTIPO */}
          <Link
            href="/"
            className="font-title text-texto text-lg font-bold tracking-wide uppercase lg:text-3xl"
          >
            Derruba Multa
          </Link>

          {/* BOTÃO */}
          {user ? (
            <Link href="/perfil" className="flex items-center gap-4">
              <Avatar className="ring-cor1/40 ring-offset-fundo2 h-12 w-12 ring-2 ring-offset-2">
                <AvatarImage
                  src={user?.image || ""}
                  alt={user?.name || "Usuário"}
                />
                <AvatarFallback className="bg-cor1/20 bg- text-cor1 font-title text-2xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <span className="text-texto font-title hidden text-xl lg:block">
                {user?.name}
              </span>
            </Link>
          ) : (
            <Link href="/perfil">
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
          )}
        </div>
      </div>
    </header>
  );
}
