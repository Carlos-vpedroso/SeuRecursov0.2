import { Marquee } from "@/components/ui/marquee";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Testimonials() {
  const reviews = [
    {
      name: "Carlos Henrique",
      company: "Motorista de App",
      comment:
        "Recebi uma multa injusta e consegui gerar meu recurso em menos de 5 minutos. O texto veio extremamente profissional.",
      imgCompany: "https://avatar.vercel.sh/carlos",
    },
    {
      name: "Mariana Silva",
      company: "Empresária",
      comment:
        "Achei que teria que gastar com advogado, mas a plataforma resolveu tudo de forma simples e automática.",
      imgCompany: "https://avatar.vercel.sh/mariana",
    },
    {
      name: "Ricardo Alves",
      company: "Representante Comercial",
      comment:
        "O sistema identificou erros na autuação que eu nem tinha percebido. Impressionante.",
      imgCompany: "https://avatar.vercel.sh/ricardo",
    },
    {
      name: "Fernanda Costa",
      company: "Condutora",
      comment:
        "O recurso ficou muito mais técnico e convincente do que qualquer modelo pronto da internet.",
      imgCompany: "https://avatar.vercel.sh/fernanda",
    },
    {
      name: "Roberto Lima",
      company: "Motorista Particular",
      comment:
        "Interface simples, rápida e objetiva. Em poucos minutos meu recurso já estava pronto para envio.",
      imgCompany: "https://avatar.vercel.sh/roberto",
    },
    {
      name: "Juliana Rocha",
      company: "Autônoma",
      comment:
        "Economizei tempo e dinheiro. Comprar o recurso saiu bem mais em conta.",
      imgCompany: "https://avatar.vercel.sh/juliana",
    },
    {
      name: "Paulo Sérgio",
      company: "Frotista",
      comment:
        "Excelente para quem administra vários veículos. Ajudou muito em nosso processo de defesa.",
      imgCompany: "https://avatar.vercel.sh/paulo",
    },
    {
      name: "Camila Mendes",
      company: "Condutora",
      comment:
        "Muito melhor do que copiar modelos prontos. O recurso ficou profissional e personalizado.",
      imgCompany: "https://avatar.vercel.sh/camila",
    },
    {
      name: "Diego Martins",
      company: "Motorista de Entregas",
      comment:
        "A plataforma transmite muita confiança. Dá para perceber que o sistema entende realmente da legislação.",
      imgCompany: "https://avatar.vercel.sh/diego",
    },
    {
      name: "Larissa Oliveira",
      company: "Consultora Comercial",
      comment:
        "Consegui recorrer sem burocracia e sem perder horas pesquisando modelos na internet.",
      imgCompany: "https://avatar.vercel.sh/larissa",
    },
  ];
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  const ReviewCard = ({
    imgCompany,
    name,
    company,
    comment,
  }: {
    imgCompany: string;
    name: string;
    company: string;
    comment: string;
  }) => {
    return (
      <figure
        className={clsx(
          "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
          // light styles
          "border-border/1 bg-white/10 transition-colors duration-300 hover:bg-white/20",
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <img
            className="rounded-full"
            width="32"
            height="32"
            alt=""
            src={imgCompany}
          />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium dark:text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium dark:text-white/40">{company}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm">{comment}</blockquote>
      </figure>
    );
  };
  return (
    <section id="depoimentos" className="py-20">
      <div className="relative z-10 container mx-auto mb-12 max-w-11/12 px-4 lg:px-8">
        <div className="mx-auto text-center">
          <h2 className="font-title text-texto text-4xl leading-tight font-extrabold drop-shadow-lg">
            Motoristas que recorreram com mais segurança
          </h2>
          <p className="mt-4 text-lg text-white/80 drop-shadow-md">
            Recursos técnicos, personalizados e gerados para aumentar suas
            chances de defesa.
          </p>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-11/12 flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:50s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:50s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>

        {/* Gradientes condicionais para os lados */}
        <div className="from-fundo pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r" />
        <div className="from-fundo pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l" />
      </div>
    </section>
  );
}
