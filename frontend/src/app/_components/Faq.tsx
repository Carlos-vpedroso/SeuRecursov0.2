import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ShieldCheck, FileText, Clock3 } from "lucide-react";

import Image from "next/image";

const leftQuestions = [
  {
    icon: FileText,
    title: "Recursos personalizados",
    description:
      "Cada recurso é gerado com base nas informações da sua autuação e nas respostas fornecidas.",
  },
  {
    icon: ShieldCheck,
    title: "Seus dados protegidos",
    description:
      "Utilizamos conexão criptografada para garantir total segurança das suas informações.",
  },
  {
    icon: Clock3,
    title: "Processo rápido e simples",
    description:
      "Em poucos minutos você responde as perguntas, realiza o pagamento e baixa seu recurso pronto.",
  },
];

const questions = [
  {
    ask: "O recurso é realmente personalizado?",
    answer:
      "Sim. Nosso sistema gera o recurso com base na infração selecionada e nas respostas informadas por você, criando um documento técnico e adaptado ao seu caso.",
  },
  {
    ask: "Preciso contratar advogado para recorrer?",
    answer:
      "Não. A legislação brasileira permite que o próprio condutor ou proprietário do veículo apresente defesa administrativa de multas.",
  },
  {
    ask: "Quanto tempo leva para gerar o recurso?",
    answer:
      "O preenchimento leva apenas alguns minutos. Após a confirmação do pagamento, o recurso fica disponível imediatamente para download na sua área de acesso.",
  },
  {
    ask: "Os recursos seguem a legislação de trânsito?",
    answer:
      "Sim. Os documentos são estruturados com base no Código de Trânsito Brasileiro (CTB), resoluções do CONTRAN e fundamentos técnicos aplicáveis à infração.",
  },
  {
    ask: "Posso recorrer de qualquer tipo de multa?",
    answer:
      "A plataforma possui suporte para diversas infrações de trânsito, incluindo multas por velocidade, celular, avanço de sinal, estacionamento irregular e outras.",
  },
  {
    ask: "Como recebo meu recurso?",
    answer:
      "Após a aprovação do pagamento, o recurso fica disponível imediatamente em sua área de acesso para download.",
  },
  {
    ask: "Meus dados estão seguros?",
    answer:
      "Sim. Todas as informações enviadas são protegidas por criptografia e utilizadas exclusivamente para a geração do recurso.",
  },
  {
    ask: "O recurso garante o cancelamento da multa?",
    answer:
      "Nenhum recurso administrativo pode garantir resultado. Porém, um documento técnico, personalizado e bem fundamentado aumenta significativamente a qualidade da defesa apresentada.",
  },
];

function QuestionBlock() {
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-10">
      {questions.map((question, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className={`rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/15 ${
            index % 2 === 0 ? "lg:mr-16" : "lg:ml-16"
          } `}
        >
          <AccordionTrigger className="font-title flex cursor-pointer items-center px-6 py-6 text-left text-lg font-semibold text-white transition-all duration-300 hover:translate-x-2 hover:no-underline">
            {question.ask}
          </AccordionTrigger>

          <AccordionContent className="px-6 pb-6 text-base leading-relaxed text-white/80">
            {question.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="bg-fundo2 text-texto2 relative py-20">
      <div className="container mx-auto grid max-w-11/12 overflow-hidden rounded-3xl lg:grid-cols-3">
        {/* Lado esquerdo */}
        <div className="bg-fundo text-texto flex flex-col justify-around px-8 py-16">
          <div className="space-y-4">
            <h1 className="font-title text-center text-4xl font-bold text-white">
              Perguntas frequentes
            </h1>

            <h2 className="font-title text-center text-lg text-white/70">
              Tire suas dúvidas sobre a geração do recurso e o funcionamento da
              plataforma.
            </h2>
          </div>

          <div className="mt-10 flex flex-col space-y-6">
            {leftQuestions.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg"
                >
                  <div className="flex items-center justify-center rounded-full border border-white/10 bg-white/10 p-2">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <div>
                    <h3 className="font-title text-lg font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-white/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lado direito */}
        <div className="relative overflow-hidden px-8 py-18 lg:col-span-2">
          <Image
            src="https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="FAQ"
            fill
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" />

          <div className="relative z-10">
            <QuestionBlock />
          </div>
        </div>
      </div>
    </section>
  );
}
