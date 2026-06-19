import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, Mail, Phone } from "lucide-react";

export default function FooterInfo() {
  return (
    <section className="bg-fundo2 relative overflow-hidden">
      {/* Waves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Wave 1 */}
        <motion.div
          animate={{
            x: [0, -120, 0],
            rotate: [-6, -8, -6],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="border-cor2/10 absolute top-[10%] left-[-30%] h-[220px] w-[160%] rounded-full border"
          style={{
            filter: "blur(1px)",
          }}
        />

        {/* Wave 2 */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            rotate: [8, 5, 8],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="border-cor2 absolute top-[35%] left-[-20%] h-[260px] w-[170%] rounded-full border-b"
          style={{
            filter: "blur(2px)",
          }}
        />

        {/* Wave 3 */}
        <motion.div
          animate={{
            x: [0, -80, 0],
            rotate: [-4, -7, -4],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="border-cor2 absolute top-[65%] left-[-25%] h-[240px] w-[180%] rounded-full border"
          style={{
            filter: "blur(1px)",
          }}
        />
      </div>

      <footer className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Coluna 1 */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative h-32 w-32">
              <Image
                src="/Logo_Derruba.png"
                alt="Nome do Site"
                fill
                priority
                className="scale-150 object-cover brightness-0"
              />
            </div>

            <p className="text-texto2/60 text-center text-xs leading-relaxed">
              Gerador de recursos para multas de trânsito, oferecendo uma
              solução rápida e eficiente para motoristas que desejam contestar
              suas infrações.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="group hover:bg-cor2 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm transition-all"
              >
                <MessageCircle className="text-texto2/60 group-hover:text-texto2 h-5 w-5 transition-colors" />
              </a>
              <a
                href="#"
                className="group hover:bg-cor2 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm transition-all"
              >
                <MessageCircle className="text-texto2/60 group-hover:text-texto2 h-5 w-5 transition-colors" />
              </a>
              <a
                href="#"
                className="group hover:bg-cor2 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm transition-all"
              >
                <MessageCircle className="text-texto2/60 group-hover:text-texto2 h-5 w-5 transition-colors" />
              </a>
            </div>
          </div>

          {/* Coluna 2 */}
          <div className="text-center">
            <h4 className="text-texto2 mb-6 text-lg font-semibold">
              Institucional
            </h4>

            <ul className="space-y-3">
              {[
                "Sobre Nós",
                "Nossa História",
                "Política de Privacidade",
                "Termos de Uso",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group hover:text-cor2 text-texto2/60 inline-flex items-center text-sm transition-colors"
                  >
                    <span className="bg-cor2 mr-2 h-1 w-1 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 */}
          <div className="text-center">
            <h4 className="text-texto2 mb-6 text-lg font-semibold">
              Atendimento
            </h4>

            <ul className="space-y-3">
              {[
                "Central de Ajuda",
                "Trocas e Devoluções",
                "Envio e Entrega",
                "Formas de Pagamento",
                "FAQ",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group hover:text-cor2 text-texto2/60 inline-flex items-center text-sm transition-colors"
                  >
                    <span className="bg-cor2 mr-2 h-1 w-1 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 */}
          <div className="flex flex-col items-center">
            <h4 className="text-texto2 mb-6 text-lg font-semibold">Contato</h4>

            <ul className="space-y-4">
              <li className="text-texto2/60 flex items-center justify-center gap-3 text-sm">
                <MapPin className="text-cor2 mt-0.5 h-5 w-5 shrink-0" />

                <span>São Sebastião do Paraíso - MG</span>
              </li>

              <li className="text-texto2/60 flex items-center justify-center gap-3 text-sm">
                <Phone className="text-cor2 h-5 w-5 shrink-0" />

                <span>(35) 9 9999-9999</span>
              </li>

              <li className="text-texto2/60 flex items-center justify-center gap-3 text-sm">
                <Mail className="text-cor2 h-5 w-5 shrink-0" />

                <span>contato@derrubamulta.com</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="relative z-10 border-t border-black/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-500 md:flex-row">
          <p>
            © 2026 <span className="text-cor2">TecZed Solutions</span>. Todos os
            direitos reservados.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-cor2 transition-colors">
              Política de Cookies
            </a>

            <a href="#" className="hover:text-cor2 transition-colors">
              Acessibilidade
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
