"use client"
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
const faqData = [
    {
        question: "Como funciona o seu Recurso ?",
        answer:
            "Se você se recusou ao teste do bafômetro e está preocupado com as consequências, nós...",
    },
    {
        question: "Como posso pagar pelo recurso?",
        answer: "Você pode pagar via Pix, cartão de crédito ou boleto bancário.",
    },
    {
        question: "Posso mudar os textos dos recursos?",
        answer: "Sim, você pode personalizar os textos antes de enviar.",
    },
    {
        question: "Paguei meu recurso, e agora?",
        answer: "Após o pagamento, começamos o processo de elaboração do recurso.",
    },
    {
        question: "Em quanto tempo recebo meu recurso?",
        answer: "Normalmente em até 48h úteis após o pagamento.",
    },
    {
        question: "Os recursos valem para qualquer instância?",
        answer: "Sim, são elaborados conforme as normas de todas as instâncias.",
    },
];
const Perguntas = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <div className="bg-azul text-white w-full max-w-md mx-auto rounded-md overflow-hidden shadow">
            {faqData.map((item, index) => (
                <div key={index} className="border-b border-white/10">
                    <button
                        onClick={() => toggle(index)}
                        className="w-full text-left px-4 py-3 flex justify-between items-center font-semibold tracking-wide hover:bg-[#003366] transition"
                    >
                        {item.question}
                        {openIndex === index ? (
                            <ChevronUp className="w-5 h-5" />
                        ) : (
                            <ChevronDown className="w-5 h-5" />
                        )}
                    </button>
                    {openIndex === index && (
                        <div className="px-4 py-4 text-sm bg-white text-black">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Perguntas