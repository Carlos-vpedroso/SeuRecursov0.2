import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const initialCards = [
  {
    id: 1,
    title: "Defesa Prévia",
    content: "Contestação inicial antes da aplicação definitiva da penalidade.",
    style: "border border-blue-400/30 bg-[#0f172a]",
  },
  {
    id: 2,
    title: "JARI",
    content: "Recurso administrativo com análise técnica da autuação.",
    style: "border border-cyan-400/20 bg-[#111827]",
  },
  {
    id: 3,
    title: "CETRAN",
    content: "Última instância administrativa para revisão da multa.",
    style: "border border-white/10 bg-[#1e293b]",
  },
];

export default function CardStack() {
  const [cards, setCards] = useState(initialCards);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCards((prev) => {
        const updated = [...prev];
        const first = updated.shift();

        if (first) {
          updated.push(first);
        }

        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="relative h-[300px] w-[420px]">
      <AnimatePresence>
        {cards.map((card, index) => {
          const offset = index * 35;

          return (
            <motion.div
              key={card.id}
              layout
              onMouseEnter={() => index === 0 && setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              initial={{ y: 40 }}
              animate={{
                top: offset,
                left: offset,
                scale: 1 - index * 0.05,
                zIndex: cards.length - index,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
              whileHover={
                index === 0
                  ? {
                      scale: 1.1,
                    }
                  : undefined
              }
              className={`absolute ${card.style} flex h-40 w-80 cursor-pointer flex-col overflow-hidden rounded-2xl shadow-2xl`}
            >
              <div className="relative z-20 p-4">
                <h3 className="text-2xl font-bold tracking-tight text-[#f8fafc]">
                  {card.title}
                </h3>
              </div>

              <p className="flex-1 p-4 leading-relaxed text-[#f1f1e6]/80">
                {card.content}
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
