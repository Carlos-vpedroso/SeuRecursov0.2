import type { Content } from "pdfmake/interfaces";

export function equipamentoMedidorPadrao(): Content[] {
  return [
    {
      text: "3. DO EQUIPAMENTO",
      style: "paragrafosBold",
    },
    {
      text: "A resolução 798/2020 do Contran estabelece as orientações que delimitam sobre a NECESSIDADE de aferição do equipamento responsável pela aferição da infração e demais regras. Segue o estabelecido:",
      style: "paragrafos",
    },
    {
      text: "RESOLUÇÃO CONTRAN nº 396/11",
      style: "titleSection",
    },
    {
      text: "Art. 2º A medição de velocidade que exceda o limite regulamentar para o local, desenvolvida pelos veículos automotores, elétricos, reboques e semirreboques nas vias terrestres abertas à circulação, deve ser efetuada por medidor de velocidade nos termos desta Resolução. § 1º Considera-se medidor de velocidade o instrumento ou equipamento de aferição destinado a fiscalizar o limite máximo de velocidade regulamentado para o local, que indique a velocidade medida e contenha dispositivo registrador de imagem que comprove o cometimento da infração. § 2º A medição de velocidade, por meio do medidor descrito no § 1º, é indispensável para a caracterização das infrações de trânsito de excesso de velocidade.",
      style: "paragrafosBoldRight",
    },
    {
      text: "Art. 4º Os medidores de velocidade devem observar: I - requisitos metrológicos: a) ter seu modelo aprovado pelo Instituto Nacional de Metrologia, Qualidade e Tecnologia (Inmetro), atendendo à legislação metrológica em vigor e aos requisitos estabelecidos nesta Resolução; b) ser aprovado na verificação metrológica pelo Inmetro ou entidade por ele delegada; e c) ser verificado pelo Inmetro ou entidade por ele delegada, com periodicidade mínima de doze meses, conforme regulamentação metrológica em vigor. II - requisitos técnicos: a) registrar a velocidade medida do veículo em km/h; b) registrar a contagem volumétrica de tráfego; c) registrar a latitude e longitude do local de operação; e d) possuir tecnologia de Reconhecimento Óptico de Caracteres (OCR).",
      style: "paragrafosBoldRight",
    },
    {
      text: "Note-se que os incisos acima citados, preveem vários procedimentos que devem ser atendidos por tais equipamentos, pois podem sofrer avarias por causa das intempéries, razão mais do que suficiente para se exigir a anexação pela autoridade de trânsito competente, de documento que comprove que o equipamento cuja numeração é citada, fora submetida à aferição. É necessário também que os equipamentos eletrônicos estejam comprovadamente certificados e aprovados por Portaria do INMETRO.",
      style: "paragrafos",
    },
    {
      text: "Esses equipamentos estão sujeitos à falibilidade do citado objeto eletrônico, seja por dano, temperatura, severidade, interferência eletromagnética, umidade, intempérie ou falha qualquer.",
      style: "paragrafos",
    },
    {
      text: "Portanto, alicerçado nesta sustentação requer, a comprovação nos autos da Portaria da aprovação do modelo de equipamento ou a nulidade do auto de infração por falta de atendimento de essencial requisito formalizador, qual seja a comprovação nos autos da homologação pelo INMETRO.",
      style: "paragrafos",
    },
  ];
}
