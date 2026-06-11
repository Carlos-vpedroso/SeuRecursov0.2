import { motion } from "framer-motion";

export default function Cta() {
  return (
    <section className="bg-fundo relative overflow-hidden border-b py-16">
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
          className="border-cor2/10 absolute top-[35%] left-[-20%] h-[260px] w-[170%] rounded-full border-b"
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
          className="border-cor2/10 absolute top-[65%] left-[-25%] h-[240px] w-[180%] rounded-full border"
          style={{
            filter: "blur(1px)",
          }}
        />
      </div>
    </section>
  );
}
