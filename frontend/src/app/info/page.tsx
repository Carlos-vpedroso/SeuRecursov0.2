"use client";
import Image from "next/image";
import Header from "@/components/Header";
import FooterInfo from "./_components/FooterInfo";

export default function InfoPage() {
  return (
    <main className="bg-fundo2 flex min-h-screen flex-col">
      <Header visible={true} />

      <section className="flex flex-1 justify-center py-8">
        <div className="w-full max-w-11/12">
          <div className="relative flex h-80 overflow-hidden rounded-xl">
            <Image
              src="/Imagem_Protocolo.jpg"
              alt="Como Protocolar o Recurso"
              fill
              className="object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80" />

            <div className="z-10 flex h-full w-full flex-col justify-end p-8">
              <h1 className="font-title text-texto text-center text-3xl font-bold lg:text-5xl">
                Como Protocolar o Recurso
              </h1>
              <p className="text-texto/80 mt-2 hidden text-center text-sm lg:block">
                Aprenda o passo a passo para protocolar seu recurso de forma
                eficiente e aumentar suas chances de sucesso.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-10 px-4">
            <div className="space-y-6">
              <h1 className="font-title text-texto2 text-2xl font-bold lg:text-4xl">
                Passos para Protocolar o Recurso
              </h1>

              <p className="text-texto2 leading-relaxed">
                Após gerar seu recurso, é fundamental realizar a{" "}
                <span className="text-primary font-semibold">
                  protocolização
                </span>{" "}
                dentro do prazo estabelecido pelo órgão autuador. Somente após o
                protocolo o pedido passa a integrar oficialmente o processo
                administrativo e pode ser analisado pela autoridade competente.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-title text-texto2 text-xl font-bold lg:text-2xl">
                1. Verifique o prazo para apresentação
              </h2>

              <p className="text-texto2 leading-relaxed">
                Antes de enviar qualquer documento, confira a{" "}
                <span className="font-semibold">data limite para recurso</span>{" "}
                informada na notificação recebida.
              </p>

              <div className="border-primary/20 bg-primary/5 rounded-lg border-l-4 p-4">
                <p className="text-texto2 text-sm leading-relaxed">
                  <span className="font-semibold">Atenção:</span> recursos
                  apresentados fora do prazo normalmente não são conhecidos pelo
                  órgão responsável, mesmo quando possuem argumentos
                  consistentes.
                </p>
              </div>

              <p className="text-texto2 leading-relaxed">
                Caso tenha dúvidas sobre a data correta, consulte os canais
                oficiais do órgão autuador ou verifique as informações
                constantes na própria notificação.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-title text-texto2 text-xl font-bold lg:text-2xl">
                2. Separe toda a documentação necessária
              </h2>

              <p className="text-texto2 leading-relaxed">
                Além do recurso gerado, alguns documentos costumam ser exigidos
                para comprovar a legitimidade do pedido e permitir a análise do
                processo.
              </p>

              <div className="bg-fundo rounded-xl p-5">
                <h3 className="mb-3 font-semibold">
                  Documentos normalmente solicitados:
                </h3>

                <ul className="text-texto/80 list-disc space-y-2 pl-5">
                  <li>Documento oficial com foto;</li>
                  <li>CNH do condutor;</li>
                  <li>CRLV ou documento do veículo;</li>
                  <li>Notificação de autuação ou penalidade;</li>
                  <li>
                    Fotografias, comprovantes ou demais provas pertinentes.
                  </li>
                </ul>
              </div>

              <p className="text-texto2 leading-relaxed">
                Quanto mais organizados e legíveis estiverem os documentos, mais
                simples será a análise realizada pelo órgão responsável.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-title text-texto2 text-xl font-bold lg:text-2xl">
                3. Assine o recurso corretamente
              </h2>

              <p className="text-texto2 leading-relaxed">
                Verifique se o recurso está devidamente assinado pelo{" "}
                <span className="font-semibold">
                  proprietário do veículo, condutor identificado ou
                  representante legal
                </span>
                , quando aplicável.
              </p>

              <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
                <p className="text-texto2 text-sm">
                  Recursos sem assinatura ou com informações incompletas podem
                  ser devolvidos ou ter sua análise prejudicada.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-title text-texto2 text-xl font-bold lg:text-2xl">
                4. Escolha o canal de protocolo
              </h2>

              <p className="text-texto2 leading-relaxed">
                Cada órgão de trânsito pode disponibilizar diferentes formas
                para envio do recurso.
              </p>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="bg-fundo rounded-lg p-4">
                  <h3 className="font-semibold">Portal Online</h3>
                  <p className="mt-2 text-sm">
                    Opção mais rápida quando disponível.
                  </p>
                </div>

                <div className="bg-fundo rounded-lg p-4">
                  <h3 className="font-semibold">Atendimento Presencial</h3>
                  <p className="mt-2 text-sm">
                    Entrega diretamente em unidade autorizada.
                  </p>
                </div>

                <div className="bg-fundo rounded-lg p-4">
                  <h3 className="font-semibold">Correios</h3>
                  <p className="mt-2 text-sm">
                    Disponível apenas quando previsto pelo órgão.
                  </p>
                </div>
              </div>

              <p className="text-texto2 leading-relaxed">
                Consulte sempre as orientações oficiais para confirmar quais
                modalidades estão disponíveis para o seu caso.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-title text-texto2 text-xl font-bold lg:text-2xl">
                5. Guarde o comprovante de protocolo
              </h2>

              <p className="text-texto2 leading-relaxed">
                Após o envio, mantenha o comprovante em local seguro. Esse
                documento comprova que o recurso foi apresentado dentro do prazo
                e poderá ser utilizado em eventuais consultas futuras.
              </p>

              <div className="border-primary/20 bg-primary/5 rounded-lg border-l-4 p-4">
                <p className="text-texto2 text-sm">
                  Sempre salve uma cópia digital do comprovante e dos documentos
                  encaminhados.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-title text-texto2 text-xl font-bold lg:text-2xl">
                6. Acompanhe o andamento do processo
              </h2>

              <p className="text-texto2 leading-relaxed">
                Após protocolado, o recurso seguirá para análise da autoridade
                ou junta responsável.
              </p>

              <p className="text-texto2 leading-relaxed">
                O prazo de resposta pode variar conforme o órgão e o volume de
                processos em tramitação. Durante esse período, acompanhe
                regularmente a situação utilizando os canais oficiais
                disponibilizados.
              </p>

              <div className="bg-fundo rounded-lg p-4">
                <p className="text-sm">
                  Você poderá acompanhar atualizações, solicitações
                  complementares e a decisão final do recurso.
                </p>
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 px-6">
              <h2 className="font-title text-texto2 text-xl font-bold lg:text-2xl">
                Dicas para aumentar a organização
              </h2>

              <ul className="text-texto2 list-disc space-y-3 pl-5">
                <li>Revise todas as informações antes de realizar o envio.</li>

                <li>Utilize arquivos nítidos e facilmente legíveis.</li>

                <li>
                  Organize documentos e comprovantes em uma pasta específica.
                </li>

                <li>Guarde cópias de tudo que foi encaminhado ao órgão.</li>

                <li>Consulte regularmente o andamento do processo.</li>
              </ul>
            </div>

            <div className="border-primary/20 bg-primary/5 rounded-xl border p-6">
              <h2 className="font-title text-texto2 mb-4 text-xl font-bold lg:text-2xl">
                Importante
              </h2>

              <p className="text-texto2 leading-relaxed">
                A geração do recurso representa apenas a{" "}
                <span className="font-semibold">
                  etapa de elaboração da defesa
                </span>
                . A efetiva apresentação perante o órgão autuador continua sendo
                de responsabilidade do proprietário ou condutor do veículo.
              </p>

              <p className="text-texto2 mt-2 leading-relaxed">
                Antes de protocolar, confirme os requisitos específicos exigidos
                pelo órgão responsável, pois procedimentos, formulários e
                documentos podem variar conforme a autuação e a localidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterInfo />
    </main>
  );
}
