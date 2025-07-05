import pdfMake from 'pdfmake/build/pdfmake'
import 'pdfmake/build/vfs_fonts'

const GerarPdf = (InfoCliente, DadosPessoais) => {
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    /*
    const DadosPessoais = {
        autoInfracao: '',
        bairro: '',
        celular: '',
        cep: '',
        cidade: '',
        cpf: '',
        logradouro: '',
        nome: '',
        numero: '',
        placaVeiculo: '',
        rg: '',
        solicitante: ''
        tipoUsuario: '',
        uf: '',
        ufEmissao: ''
        } 
    

    
    const InfoCliente = {
        artigoMulta: multa.artigo_multa,
        codigoMulta: multa.codigo_multa,
        valorMulta: multa.valor_multa,
        valorRecurso: multa.valor_recurso,
        descricao: multa.descricao,
        tipoMulta: multa.tipo_multa,
        tipoDefesa: '',
        fato: '',
        fatoComentario: '',
        notificado: '',
        tempoNotificacao: '',
        agente: '',
        acessoAuto: '',
        patio: '',
        patioComentario: ''
        }
    */



    const title = [

    ];

    function Body(InfoCliente) {
        if (InfoCliente.notificado === 'NÃO') {
            if (InfoCliente.descricao === 'Dirigir veículo com validade de CNH/PPD vencida há mais de 30 dias') {
                return [

                    {
                        text: 'ILUSTRÍSSIMOS (A) SENHORES (A) DOUTORES (A) JULGADORES',
                        style: 'header'
                    },

                    { text: ['Auto de Infração', { text: ` ${DadosPessoais.autoInfracao}`, style: 'dadosVariaveis' }], style: 'paragrafos' },
                    { text: ['Recorrente:', { text: ` ${DadosPessoais.nome}`, style: 'dadosVariaveis' }], style: 'paragrafos' },
                    {
                        text: [{ text: `${DadosPessoais.nome}`, style: 'dadosVariaveis' },
                            ', brasileiro, portador do CPF ',
                        { text: `${DadosPessoais.cpf}`, style: 'dadosVariaveis' },
                            ' do RG ',
                        { text: `${DadosPessoais.rg}`, style: 'dadosVariaveis' },
                            ', ',
                        { text: `${DadosPessoais.solicitante}`, style: 'dadosVariaveis' },
                            ' do veículo de placa ',
                        { text: `${DadosPessoais.placaVeiculo}`, style: 'dadosVariaveis' },
                            ', vem respeitosamente a presença de Vossa Senhoria, com fundamento na Constituição da República, Lei 9.503/97 e demais dispositivos aplicáveis à espécie, interpor a presente:'], style: 'paragrafos'
                    },

                    {
                        text: `${InfoCliente.tipoDefesa}`,
                        style: 'title1'
                    },

                    { text: 'Em face da penalidade aplicada irregularmente conforme será demonstrado, sem obedecer às delimitações estabelecidas pelo CONTRAN.', style: 'paragrafos' },

                    {
                        text: 'DA TEMPESTIVIDADE',
                        style: 'title1'
                    },

                    { text: 'O presente recurso é tempestivo, eis que segue o prazo previsto no auto de infração em anexo, e em razão ao posicionamento unânime dos Tribunais Superiores, “que o decurso do tempo não convalida o que nasceu invalido.” Segue:', style: 'paragrafos' },

                    {
                        text: 'DIREITO ADMINISTRATIVO. ATO ADMINISTRATIVO NULO. IMPRESCRITIBILIDADE. DECRETO 20.910/32 - ART. 1º. 1. Não se pode levar na devida linha de conta a tese da prescrição quinquenal (art. 1º do Decreto 20.910/32), em se tratando de ato administrativo nulo, porquanto, nestas condições, "o decurso do tempo não convalida o que nasceu inválido." Precedentes. 2. Recurso especial conhecido. (STJ - REsp: 311044 RJ 2001/0031224-1, Relator: Ministro FERNANDO GONÇALVES, Data de Julgamento: 27/08/2002, T6 - SEXTA TURMA, Data de Publicação:  --> DJ 23/09/2002 p. 401)',
                        style: 'alinhadoDireita'
                    },

                    { text: 'Assim fica nítida a validade do presente recurso, requerendo assim sua plena análise e seu total provimento pelos motivos elencados.', style: 'paragrafos' },

                    {
                        text: `DOS FATOS`,
                        style: 'title2'
                    },

                    {
                        text: ['Fui autuado por supostamente ',
                            { text: `${InfoCliente.descricao}`, style: 'dadosVariaveis' },
                            ' , infração prevista no artigo ',
                            { text: `${InfoCliente.artigoMulta}`, style: 'dadosVariaveis' },
                            ' do Código de Trânsito Brasileiro. '], style: 'paragrafos'
                    },

                    { text: 'Tal infração, não merece ser mantida, já que ao longo de toda a minha trajetória como condutor, sempre respeitei e zelei pelas normas de trânsito.', style: 'paragrafos' },

                    { text: 'Além disso, o auto de infração imposto contém inúmeras irregularidades e vícios insanáveis, além de ausência de informações imprescindíveis, conforme será demonstrado a seguir.', style: 'paragrafos' },

                    { text: 'Portanto, o recurso interposto busca a anulação do presente auto de infração, e seu consequente arquivamento, evitando assim, a aplicação da penalidade de forma injusta.', style: 'paragrafos' },

                    {
                        text: `DO DESCUMPRIMENTO DE PRINCÍPIOS BÁSICOS DA ADMINISTRAÇÃO PÚBLICA`,
                        style: 'title2'
                    },

                    { text: 'A Constituição Federal, em seu artigo 37, discorre acerca dos princípios básicos da Administração Pública, que são: Legalidade, impessoalidade, moralidade, publicidade e eficiência.', style: 'paragrafos' },

                    { text: 'O princípio da legalidade na administração pública implica que ela está vinculada estritamente à lei, agindo somente dentro dos limites estabelecidos e de acordo com os procedimentos legais prescritos. Isso reflete a ideia do "império da lei" sobre a vontade arbitrária dos indivíduos.', style: 'paragrafos' },

                    { text: 'Já a impessoalidade procura evitar que agentes públicos ajam visando interesses pessoais, garantindo que suas ações sejam guiadas pelo bem comum, em vez de preferências individuais, evitando assim desvios de finalidade ou abusos de poder.', style: 'paragrafos' },

                    { text: 'O princípio da moralidade refere-se à conduta ética e honesta, alinhada com o interesse público, diferenciando-se da moral individual. Ele complementa o princípio da legalidade, exigindo que os agentes públicos considerem não apenas a legalidade formal, mas também a moralidade em suas decisões.', style: 'paragrafos' },

                    { text: 'A publicidade na administração pública implica que seus atos e decisões devem ser transparentes e acessíveis ao conhecimento público, evitando segredos ou sigilos que possam prejudicar os interesses individuais ou coletivos.', style: 'paragrafos' },

                    { text: 'Por fim, a eficiência na administração pública diz respeito à otimização dos recursos e ações, visando a redução de erros e a obtenção dos melhores resultados possíveis, embora esse conceito possa ser interpretado de várias maneiras e, por vezes, restrito a uma visão muito específica.', style: 'paragrafos' },

                    { text: 'Portanto, fica claro que é obrigatório à Administração Pública, o cumprimento destes princípios BÁSICOS acima expostos, para que haja a regularidade da infração e o cumprimento da aplicação da penalidade. No caso a seguir, podemos observar que há a inobservância de tais princípios, merecendo assim a anulação do presente auto.', style: 'paragrafos' },

                    {
                        text: `DA MOTIVAÇÃO DOS ATOS ADMINISTRATIVOS`,
                        style: 'title2'
                    },

                    { text: 'Reza o artigo 50 da lei 9.784/99 que regula os atos administrativos, aplica parâmetros para que a administração pública siga e aja de acordo com os dizeres da lei. É impossível deixar de expor os dizeres de tal artigo que EXIGE que os órgãos públicos sigam tais parâmetros:', style: 'paragrafos' },

                    {
                        text: 'Art. 50. Os atos administrativos deverão ser motivados, com indicação dos fatos e dos fundamentos jurídicos, quando:',
                        style: 'alinhadoDireita'
                    },


                    {
                        text: 'I - neguem, limitem ou afetem direitos ou interesses;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'II - imponham ou agravem deveres, encargos ou sanções;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'III - decidam processos administrativos de concurso ou seleção pública;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'IV - dispensem ou declarem a inexigibilidade de processo licitatório;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'V - decidam recursos administrativos;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'VI - decorram de reexame de ofício;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'VII - deixem de aplicar jurisprudência firmada sobre a questão ou discrepem de pareceres, laudos, propostas e relatórios oficiais;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'VIII - importem anulação, revogação, suspensão ou convalidação de ato administrativo.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: '§ 1o A motivação deve ser explícita, clara e congruente, podendo consistir em declaração de concordância com fundamentos de anteriores pareceres, informações, decisões ou propostas, que, neste caso, serão parte integrante do ato.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: '§ 2o Na solução de vários assuntos da mesma natureza, pode ser utilizado meio mecânico que reproduza os fundamentos das decisões, desde que não prejudique direito ou garantia dos interessados.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: '§ 3o A motivação das decisões de órgãos colegiados e comissões ou de decisões orais constará da respectiva ata ou de termo escrito.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: `DA IMPOSSIBILIDADE DE ACESSO AO AUTO DE INFRAÇÃO `,
                        style: 'title1'
                    },

                    { text: 'O auto de infração é um documento público, lavrado pelo agente de trânsito no momento em que constata a ocorrência da infração. Trata-se de um documento de suma importância, pois ele é necessário para instauração do processo administrativo de trânsito, conforme dispõe o artigo 280 do Código de Trânsito Brasileiro.', style: 'paragrafos' },

                    { text: 'Somente através do processo administrativo, com a observância dos princípios do contraditório e da ampla defesa, que é possível imputar ao condutor a prática de alguma infração e aplicar a penalidade devida.', style: 'paragrafos' },

                    { text: 'Dada sua importância, a notificação de infração é classificada como um ato administrativo vinculado. Em outras palavras, o agente público responsável não possui discricionariedade para deixar de lavrar o auto no momento que atesta a infração, assim como não pode lavrá-lo sem que haja qualquer suporte fático que lhe dê sustentação.', style: 'paragrafos' },

                    { text: 'Ao tentar consultar o AIT ORIGINAL lavrado no momento pelo agente, foi possível verificar que o mesmo não está disponível, e considerando que em momento algum foi disponibilizado ao Recorrente cópia do AIT original, estando o mesmo ocultado, se chega a conclusão de que na verdade não há lavratura de tal documento, infração apenas imputada sem preenchimento do documento obrigatório, segue cópia comprovando em anexo.', style: 'paragrafos' },

                    { text: 'E é nesse ponto que exsurge o vício presente no auto de infração aqui impugnado. A simples leitura do documento em questão mostra que o policial responsável por sua lavratura apenas assinalou a opção que indicava a suposta infração.', style: 'paragrafos' },

                    { text: 'Resumo Explicativo:', style: 'paragrafosBold' },

                    {
                        ul: [
                            { text: 'AIT INDISPONÍVEL', bold: true },
                            { text: 'NOTIFICAÇÃO DE AUTUAÇÃO INÉPTA', bold: true },
                            { text: 'NÃO FOI DADA CÓPIA DO AIT AO RECORRENTE PELO AGENTE', bold: true },
                            { text: 'DESCARACTERIZAÇÃO E NULIDADE ABSOLUTA DO AIT', bold: true }
                        ],
                        margin: [150, 10, 0, 0]

                    },

                    {
                        text: `DO NÃO CUMPRIMENTO DE MEDIDA ADMINISTRATIVA OBRIGATÓRIA`,
                        style: 'title1'
                    },

                    { text: 'Analisando o artigo de lei da infração imposta, conclui-se que é indispensável o cumprimento de medida administrativa, aliado com imposição de penalidade aplicado pelo agente policial.', style: 'paragrafos' },

                    { text: ['Fica clara a ', { text: 'OMISSÃO', bold: true }, ' do agente que lavrou o auto de infração, o fazendo de forma arbitrária, uma vez que se omitiu e não aplicou a medida administrativa imposta pelo artigo que tipificou a infração, já que não houve o cumprimento de medida administrativo. Desta forma como há a possibilidade de dar credibilidade a tal autuação, se em sua lavratura não há um mínimo de regularidade para sua aplicação?'], style: 'paragrafos' },

                    { text: 'Todavia, o Código de Trânsito Brasileiro que instituiu o Sistema Nacional de Trânsito, teve como fundamento a diminuição no cometimento das infrações de trânsito, bem como incentivar à sua educação. Tais medidas devem ser atreladas às possíveis sanções para quem demandar contrariamente às determinações legais.', style: 'paragrafos' },

                    { text: 'Portanto, é um conjunto punitivo que trará ao condutor infrator a pretensão de não cometer novas infrações, educando-o.', style: 'paragrafos' },

                    { text: 'Neste diapasão, gostaria que observasse o que determina o art. 161 do CTB:', style: 'paragrafos' },

                    { text: 'Art. 161 - Constitui infração de trânsito a inobservância de qualquer preceito deste Código, da legislação complementar ou das resoluções do CONTRAN, sendo o infrator sujeito às penalidades e medidas administrativas indicadas em cada artigo, além das punições previstas no Capítulo XIX.', style: 'alinhadoDireita' },

                    { text: 'Logo, depreende-se de que no momento da aplicação da medida punitiva, não se poderá deixar esta ou aquela determinação para cumprimento ao bom senso do agente autuador, mas sim, deverá ser aplicada como está expressa de forma positivada em cada um dos artigos da lei. Desta forma, se o agente, ao praticar ato administrativo de sua competência, fazê-lo ao arrepio do que determina a lei, este ato todo está eivado de vícios e passível de anulabilidade.', style: 'paragrafos' },

                    { text: 'Portanto, não é outra a determinação daquele códex, senão:', style: 'alinhadoDireita' },

                    { text: 'Art. 5.º O Sistema Nacional de Trânsito é o conjunto de órgãos e entidades da União, dos Estados, do Distrito Federal e dos Municípios que tem por finalidade o exercício das atividades de planejamento, administração, normatização, pesquisa, registro e licenciamento de veículos, formação, habilitação e reciclagem de condutores, educação, engenharia, operação do sistema viário, policiamento, fiscalização, julgamento de infrações e de recursos e aplicação de penalidades.', style: 'alinhadoDireita' },

                    { text: 'Também, reforçando tal interpretação:', style: 'alinhadoDireita' },

                    { text: 'Art. 24 - Compete aos órgãos e entidades executivos de trânsito dos Municípios, no âmbito de sua circunscrição: ', style: 'alinhadoDireita' },

                    { text: 'I - cumprir e fazer cumprir a legislação e as normas de trânsito, no âmbito de suas atribuições;', style: 'alinhadoDireita' },

                    { text: 'Portanto, é justo vir perante Vs. Senhoria, expor o contraditório a autuação e requerer a declaração de nulidade da mesma.', style: 'paragrafos' },

                    { text: ['O que se vê é uma clara arbitrariedade do agente, e uma grande irresponsabilidade no exercício de sua relevante função. A falta de informações decorre, na realidade, da inexistência de qualquer infração. Por fim, ressalte-se que não houve o cumprimento de medida administrativa', { text: 'OBRIGATÓRIA.', bold: true }], style: 'paragrafos' },


                    {
                        text: `DA IRREGULARIDADE E INCONSISTÊNCIA DA PENALIDADE`,
                        style: 'title2'
                    },

                    { text: 'Inicialmente, é preciso esclarecer, a presente notificação é nula, de pleno direito, eis que o Código de Trânsito traz a seguinte determinação:', style: 'paragrafos' },

                    {
                        text: 'Art. 281. A autoridade de trânsito, na esfera da competência estabelecida neste Código e dentro de sua circunscrição, julgará a consistência do auto de infração e aplicará a penalidade cabível.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'Parágrafo único. O auto de infração será arquivado e seu registro julgado insubsistente:',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'I - se considerado inconsistente ou irregular;',
                        style: 'alinhadoDireita'
                    },

                    { text: 'O auto de infração é um documento público, lavrado pelo agente de trânsito no momento em que constata a ocorrência da infração. Trata-se de um documento de suma importância, pois ele é necessário para instauração do processo administrativo de trânsito, conforme dispõe o artigo 280 do Código de Trânsito Brasileiro. Somente através do processo administrativo, com a observância dos princípios do contraditório e da ampla defesa, que é possível imputar ao condutor a prática de alguma infração e aplicar a penalidade devida.', style: 'paragrafos' },

                    { text: 'Dada sua importância, a autuação é classificada como um ato administrativo vinculado. Em outras palavras, o agente público responsável não possui discricionariedade para deixar de lavrar o auto no momento que atesta a infração, assim como não pode lavrá-lo sem que haja qualquer suporte fático que lhe dê sustentação.', style: 'paragrafos' },

                    { text: 'E é nesse ponto que exsurge o vício presente no auto de infração aqui impugnado. A simples leitura do documento em questão mostra que o agente fiscal responsável por sua lavratura apenas assinalou a opção que indicava a suposta infração, sem contudo explicitar de que modo a conduta do suposto infrator se enquadrava na tipificação indicada.', style: 'paragrafos' },

                    { text: 'Em nenhum momento o agente de trânsito narrou ou descreveu, ainda que de forma sucinta, as circunstâncias em que se deu a suposta infração. É nítido na notificação anexa ao presente, a total inviabilidade do mesmo, tendo incorrido de forma totalmente contrária ao que é estipulado pelo Código de Trânsito Vigente, pois não há nele, sendo necessário assim, o seu imediato arquivamento.', style: 'paragrafos' },

                    { text: 'O ordenamento jurídico pátrio repele a possibilidade de atribuição de responsabilidade infracional com a mera citação da norma supostamente infringida. Tal ato, ofende os direitos constitucionais do cidadão e atenta contra a razoabilidade que deve imperar na aplicação da lei, que a autoridade de trânsito faça imputações infracionais, sem oferecer qualquer elemento concreto que justifique a autuação.', style: 'paragrafos' },

                    { text: 'A Constituição Federal, em seu artigo 5º, inciso LV, assegura o direito de defesa também em processos administrativos. Como se sabe, todo aquele que é acusado de ter cometido algum ilícito, seja ele de que natureza for, se defende é dos fatos que lhe são imputados, e não da capitulação jurídica. Como é possível que o suposto infrator exerça em plenitude seu direito de defesa se não há mínima descrição dos fatos que ele possa contraditar e refutar? Como é possível que se sustente a veracidade da imputação registrada no auto de infração, sem qualquer suporte fático ou lastro probatório? Seria justo enfatizar a declaração do agente de trânsito como verdade absoluta e incontestável?', style: 'paragrafos' },

                    { text: 'E é nesse sentido que se orienta a interpretação que deve ser dada ao artigo 280 do Código de Trânsito Brasileiro, quando em seu inciso I exige a “tipificação da infração” como elemento essencial do auto de infração.', style: 'paragrafos' },

                    { text: ['Essa interpretação é ainda reforçada pelo ', { text: 'DENATRAN', bold: true }, '(Departamento Nacional de Trânsito), que acertadamente editou a Resolução 390/11, dispondo sobre os procedimentos administrativos necessários para lavratura do auto de infração. O artigo 3º da referida Resolução assim prescreve:'], style: 'paragrafos' },

                    {
                        text: 'RESOLUÇÃO Nº 390 DE 11 DE AGOSTO DE 2011 - DENATRAN',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'Art. 3º O Auto de infração previsto no artigo anterior deverá ser composto, no mínimo, pelos blocos de campos estabelecidos no Anexo I desta Reslução, os quais são de preenchimento obrigatório.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'ANEXO I',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'Definição dos blocos e campos mínimos que deverão compor o Auto de Infração:',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'IV. BLOCO 4',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'CAMPO 3 - “OBSERVAÇÕES” (campo destinado ao detalhamento da infração de preenchimento obrigatório).',
                        style: 'alinhadoDireita'
                    },

                    { text: 'Excelentíssimo julgador, de que forma os dados inseridos no auto de infração, cuja cópia se encontra em anexo, auxiliam a compreensão da ocorrência? Onde estão os elementos que motivaram a autuação? Como pode o agente afirmar com exatidão a conduta descrita, se nem mesmo preencheu de forma correta o auto de infração?', style: 'paragrafos' },

                    { text: 'Ora Ilustríssimo julgador, como pode o recorrente se defender dignamente de tal autuação, lavrada de forma tão genérica? Não há controvérsias frente a tal fato. A omissão do agente que lavrou o auto de infração, feriu os direitos constitucionais e da  ampla defesa e ao contraditório, assim prejudicando o devido processo legal.', style: 'paragrafos' },

                    { text: 'Tal afronta a vida pregressa do recorrente é penalidade sem intuito educativo, apenas ensejando penalizar por conduta incerta e incoerente. Frente a tal fato, não há que se falar em deferir tal penalização obscura.', style: 'paragrafos' },

                    { text: 'O que se vê é uma clara arbitrariedade do agente e uma grande irresponsabilidade no exercício de sua relevante função. A falta de informações decorre, na realidade, da inexistência de qualquer infração. O condutor é motorista de longa data e responsável, que sempre dirigiu com prudência e cautela, cumprindo com afinco todos os ditames legais. É claro que, assim como todo ser humano, pode cometer erros, mas não pode concordar em assumir a responsabilidade por algo que não fez.', style: 'paragrafos' },

                    { text: 'Todo o exposto revela que se trata de um Auto de Infração irregular e inepto, que obstaculizou o exercício do direito de defesa da recorrente. A falta de elementos concretos para caracterização da infração reforça ainda mais sua inconsistência. Nesses casos, o artigo 281, parágrafo único, inciso I, do Código de trânsito Brasileiro nos apresenta o único desfecho possível, que é seu imediato arquivamento.', style: 'paragrafosBold' },

                    { text: 'O Supremo Tribunal Federal já pacificou matéria quanto à possibilidade da Administração Pública anular os seus atos eivados de nulidades, conforme a Súmula nº 473, transcrita a seguir:', style: 'paragrafos' },

                    {
                        text: '“A administração pode anular seus próprios atos quando eivados de vícios que os tornam ilegais, porque deles não se originam direitos, ou revoga-los, por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos, e ressalvada em todos os casos a apreciação judicial.”',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: `DOS PEDIDOS`,
                        style: 'title2'
                    },

                    { text: 'Estando demonstrada a absoluta inviabilidade jurídica dessa penalidade, requer seja acolhido o presente recurso, com o consequente arquivamento do Auto de Infração aqui impugnado. Caso, contudo, não seja este o entendimento do julgador, requer seja a decisão devidamente motivada, sob pena de nulidade, a teor do Art. 50, I e II, parágrafo 1º, da Lei nº 9.784/99.', style: 'paragrafos' },

                    {
                        ul: [
                            { text: 'Que suspenda seus efeitos até o julgamento;', bold: true },
                            { text: 'Que seja convertido o ônus da prova ao órgão competente;', bold: true },
                            { text: 'A improcedência da penalidade;', bold: true },
                            { text: 'A declaração de nulidade do presente;', bold: true },
                            { text: 'Que seja arquivado e julgado insubsistente.', bold: true },
                        ],
                        margin: [150, 10, 0, 0]

                    },

                    { text: `${DadosPessoais.cidade}-${DadosPessoais.uf}, ${dataFormatada}`, style: 'paragrafosVarCentral' },

                    { text: 'Nesses termos, ', style: 'paragrafosCentral' },

                    { text: 'Pede deferimento', style: 'paragrafosCentral' },

                    { text: '_____________________________________', style: 'paragrafosCentral2' },

                    { text: `${DadosPessoais.nome}`, style: 'paragrafosVarCentral' },

                    { text: 'Recorrente', style: 'paragrafosCentral' }

                ];
            }
            return [

                {
                    text: 'ILUSTRÍSSIMOS (A) SENHORES (A) DOUTORES (A) JULGADORES',
                    style: 'header'
                },

                { text: ['Auto de Infração', { text: ` ${DadosPessoais.autoInfracao}`, style: 'dadosVariaveis' }], style: 'paragrafos' },
                { text: ['Recorrente:', { text: ` ${DadosPessoais.solicitante}`, style: 'dadosVariaveis' }], style: 'paragrafos' },
                {
                    text: [{ text: `${DadosPessoais.nome}`, style: 'dadosVariaveis' },
                        ', brasileiro, portador do CPF ',
                    { text: `${DadosPessoais.cpf}`, style: 'dadosVariaveis' },
                        ' do RG ',
                    { text: `${DadosPessoais.rg}`, style: 'dadosVariaveis' },
                        ', ',
                    { text: `${DadosPessoais.solicitante}`, style: 'dadosVariaveis' },
                        ' do veículo de placa ',
                    { text: `${DadosPessoais.placaVeiculo}`, style: 'dadosVariaveis' },
                        ', vem respeitosamente a presença de Vossa Senhoria, com fundamento na Constituição da República, Lei 9.503/97 e demais dispositivos aplicáveis à espécie, interpor a presente:'], style: 'paragrafos'
                },

                {
                    text: `${InfoCliente.tipoDefesa}`,
                    style: 'title1'
                },

                { text: 'Em face da penalidade aplicada irregularmente conforme será demonstrado, sem obedecer às delimitações estabelecidas pelo CONTRAN.', style: 'paragrafos' },

                {
                    text: 'DA TEMPESTIVIDADE',
                    style: 'title1'
                },

                { text: 'O presente recurso é tempestivo, eis que segue o prazo previsto no auto de infração em anexo, e em razão ao posicionamento unânime dos Tribunais Superiores, “que o decurso do tempo não convalida o que nasceu invalido.” Segue:', style: 'paragrafos' },

                {
                    text: 'DIREITO ADMINISTRATIVO. ATO ADMINISTRATIVO NULO. IMPRESCRITIBILIDADE. DECRETO 20.910/32 - ART. 1º. 1. Não se pode levar na devida linha de conta a tese da prescrição quinquenal (art. 1º do Decreto 20.910/32), em se tratando de ato administrativo nulo, porquanto, nestas condições, "o decurso do tempo não convalida o que nasceu inválido." Precedentes. 2. Recurso especial conhecido. (STJ - REsp: 311044 RJ 2001/0031224-1, Relator: Ministro FERNANDO GONÇALVES, Data de Julgamento: 27/08/2002, T6 - SEXTA TURMA, Data de Publicação:  --> DJ 23/09/2002 p. 401)',
                    style: 'alinhadoDireita'
                },

                { text: 'Assim fica nítida a validade do presente recurso, requerendo assim sua plena análise e seu total provimento pelos motivos elencados.', style: 'paragrafos' },

                {
                    text: `DOS FATOS`,
                    style: 'title2'
                },

                {
                    text: ['Fui autuado por supostamente ',
                        { text: `${InfoCliente.descricao}`, style: 'dadosVariaveis' },
                        ' , infração prevista no artigo ',
                        { text: `${InfoCliente.artigoMulta}`, style: 'dadosVariaveis' },
                        ' do Código de Trânsito Brasileiro. '], style: 'paragrafos'
                },

                { text: 'Tal infração, não merece ser mantida, já que ao longo de toda a minha trajetória como condutor, sempre respeitei e zelei pelas normas de trânsito.', style: 'paragrafos' },

                { text: 'Além disso, o auto de infração imposto contém inúmeras irregularidades e vícios insanáveis, além de ausência de informações imprescindíveis, conforme será demonstrado a seguir.', style: 'paragrafos' },

                { text: 'Portanto, o recurso interposto busca a anulação do presente auto de infração, e seu consequente arquivamento, evitando assim, a aplicação da penalidade de forma injusta.', style: 'paragrafos' },

                {
                    text: `DO DESCUMPRIMENTO DE PRINCÍPIOS BÁSICOS DA ADMINISTRAÇÃO PÚBLICA`,
                    style: 'title2'
                },

                { text: 'A Constituição Federal, em seu artigo 37, discorre acerca dos princípios básicos da Administração Pública, que são: Legalidade, impessoalidade, moralidade, publicidade e eficiência.', style: 'paragrafos' },

                { text: 'O princípio da legalidade na administração pública implica que ela está vinculada estritamente à lei, agindo somente dentro dos limites estabelecidos e de acordo com os procedimentos legais prescritos. Isso reflete a ideia do "império da lei" sobre a vontade arbitrária dos indivíduos.', style: 'paragrafos' },

                { text: 'Já a impessoalidade procura evitar que agentes públicos ajam visando interesses pessoais, garantindo que suas ações sejam guiadas pelo bem comum, em vez de preferências individuais, evitando assim desvios de finalidade ou abusos de poder.', style: 'paragrafos' },

                { text: 'O princípio da moralidade refere-se à conduta ética e honesta, alinhada com o interesse público, diferenciando-se da moral individual. Ele complementa o princípio da legalidade, exigindo que os agentes públicos considerem não apenas a legalidade formal, mas também a moralidade em suas decisões.', style: 'paragrafos' },

                { text: 'A publicidade na administração pública implica que seus atos e decisões devem ser transparentes e acessíveis ao conhecimento público, evitando segredos ou sigilos que possam prejudicar os interesses individuais ou coletivos.', style: 'paragrafos' },

                { text: 'Por fim, a eficiência na administração pública diz respeito à otimização dos recursos e ações, visando a redução de erros e a obtenção dos melhores resultados possíveis, embora esse conceito possa ser interpretado de várias maneiras e, por vezes, restrito a uma visão muito específica.', style: 'paragrafos' },

                { text: 'Portanto, fica claro que é obrigatório à Administração Pública, o cumprimento destes princípios BÁSICOS acima expostos, para que haja a regularidade da infração e o cumprimento da aplicação da penalidade. No caso a seguir, podemos observar que há a inobservância de tais princípios, merecendo assim a anulação do presente auto.', style: 'paragrafos' },

                {
                    text: `DA MOTIVAÇÃO DOS ATOS ADMINISTRATIVOS`,
                    style: 'title2'
                },

                { text: 'Reza o artigo 50 da lei 9.784/99 que regula os atos administrativos, aplica parâmetros para que a administração pública siga e aja de acordo com os dizeres da lei. É impossível deixar de expor os dizeres de tal artigo que EXIGE que os órgãos públicos sigam tais parâmetros:', style: 'paragrafos' },

                {
                    text: 'Art. 50. Os atos administrativos deverão ser motivados, com indicação dos fatos e dos fundamentos jurídicos, quando:',
                    style: 'alinhadoDireita'
                },


                {
                    text: 'I - neguem, limitem ou afetem direitos ou interesses;',
                    style: 'alinhadoDireita'
                },

                {
                    text: 'II - imponham ou agravem deveres, encargos ou sanções;',
                    style: 'alinhadoDireita'
                },

                {
                    text: 'III - decidam processos administrativos de concurso ou seleção pública;',
                    style: 'alinhadoDireita'
                },

                {
                    text: 'IV - dispensem ou declarem a inexigibilidade de processo licitatório;',
                    style: 'alinhadoDireita'
                },

                {
                    text: 'V - decidam recursos administrativos;',
                    style: 'alinhadoDireita'
                },

                {
                    text: 'VI - decorram de reexame de ofício;',
                    style: 'alinhadoDireita'
                },

                {
                    text: 'VII - deixem de aplicar jurisprudência firmada sobre a questão ou discrepem de pareceres, laudos, propostas e relatórios oficiais;',
                    style: 'alinhadoDireita'
                },

                {
                    text: 'VIII - importem anulação, revogação, suspensão ou convalidação de ato administrativo.',
                    style: 'alinhadoDireita'
                },

                {
                    text: '§ 1o A motivação deve ser explícita, clara e congruente, podendo consistir em declaração de concordância com fundamentos de anteriores pareceres, informações, decisões ou propostas, que, neste caso, serão parte integrante do ato.',
                    style: 'alinhadoDireita'
                },

                {
                    text: '§ 2o Na solução de vários assuntos da mesma natureza, pode ser utilizado meio mecânico que reproduza os fundamentos das decisões, desde que não prejudique direito ou garantia dos interessados.',
                    style: 'alinhadoDireita'
                },

                {
                    text: '§ 3o A motivação das decisões de órgãos colegiados e comissões ou de decisões orais constará da respectiva ata ou de termo escrito.',
                    style: 'alinhadoDireita'
                },

                {
                    text: `DA IMPOSSIBILIDADE DE ACESSO AO AUTO DE INFRAÇÃO `,
                    style: 'title1'
                },

                { text: 'O auto de infração é um documento público, lavrado pelo agente de trânsito no momento em que constata a ocorrência da infração. Trata-se de um documento de suma importância, pois ele é necessário para instauração do processo administrativo de trânsito, conforme dispõe o artigo 280 do Código de Trânsito Brasileiro.', style: 'paragrafos' },

                { text: 'Somente através do processo administrativo, com a observância dos princípios do contraditório e da ampla defesa, que é possível imputar ao condutor a prática de alguma infração e aplicar a penalidade devida.', style: 'paragrafos' },

                { text: 'Dada sua importância, a notificação de infração é classificada como um ato administrativo vinculado. Em outras palavras, o agente público responsável não possui discricionariedade para deixar de lavrar o auto no momento que atesta a infração, assim como não pode lavrá-lo sem que haja qualquer suporte fático que lhe dê sustentação.', style: 'paragrafos' },

                { text: 'Ao tentar consultar o AIT ORIGINAL lavrado no momento pelo agente, foi possível verificar que o mesmo não está disponível, e considerando que em momento algum foi disponibilizado ao Recorrente cópia do AIT original, estando o mesmo ocultado, se chega a conclusão de que na verdade não há lavratura de tal documento, infração apenas imputada sem preenchimento do documento obrigatório, segue cópia comprovando em anexo.', style: 'paragrafos' },

                { text: 'E é nesse ponto que exsurge o vício presente no auto de infração aqui impugnado. A simples leitura do documento em questão mostra que o policial responsável por sua lavratura apenas assinalou a opção que indicava a suposta infração.', style: 'paragrafos' },

                { text: 'Resumo Explicativo:', style: 'paragrafosBold' },

                {
                    ul: [
                        { text: 'AIT INDISPONÍVEL', bold: true },
                        { text: 'NOTIFICAÇÃO DE AUTUAÇÃO INÉPTA', bold: true },
                        { text: 'NÃO FOI DADA CÓPIA DO AIT AO RECORRENTE PELO AGENTE', bold: true },
                        { text: 'DESCARACTERIZAÇÃO E NULIDADE ABSOLUTA DO AIT', bold: true }
                    ],
                    margin: [150, 10, 0, 0]

                },

                {
                    text: `DA IRREGULARIDADE E INCONSISTÊNCIA DA PENALIDADE`,
                    style: 'title2'
                },

                { text: 'Inicialmente, é preciso esclarecer, a presente notificação é nula, de pleno direito, eis que o Código de Trânsito traz a seguinte determinação:', style: 'paragrafos' },

                {
                    text: 'Art. 281. A autoridade de trânsito, na esfera da competência estabelecida neste Código e dentro de sua circunscrição, julgará a consistência do auto de infração e aplicará a penalidade cabível.',
                    style: 'alinhadoDireita'
                },

                {
                    text: 'Parágrafo único. O auto de infração será arquivado e seu registro julgado insubsistente:',
                    style: 'alinhadoDireita'
                },

                {
                    text: 'I - se considerado inconsistente ou irregular;',
                    style: 'alinhadoDireita'
                },

                { text: 'O auto de infração é um documento público, lavrado pelo agente de trânsito no momento em que constata a ocorrência da infração. Trata-se de um documento de suma importância, pois ele é necessário para instauração do processo administrativo de trânsito, conforme dispõe o artigo 280 do Código de Trânsito Brasileiro. Somente através do processo administrativo, com a observância dos princípios do contraditório e da ampla defesa, que é possível imputar ao condutor a prática de alguma infração e aplicar a penalidade devida.', style: 'paragrafos' },

                { text: 'Dada sua importância, a autuação é classificada como um ato administrativo vinculado. Em outras palavras, o agente público responsável não possui discricionariedade para deixar de lavrar o auto no momento que atesta a infração, assim como não pode lavrá-lo sem que haja qualquer suporte fático que lhe dê sustentação.', style: 'paragrafos' },

                { text: 'E é nesse ponto que exsurge o vício presente no auto de infração aqui impugnado. A simples leitura do documento em questão mostra que o agente fiscal responsável por sua lavratura apenas assinalou a opção que indicava a suposta infração, sem contudo explicitar de que modo a conduta do suposto infrator se enquadrava na tipificação indicada.', style: 'paragrafos' },

                { text: 'Em nenhum momento o agente de trânsito narrou ou descreveu, ainda que de forma sucinta, as circunstâncias em que se deu a suposta infração. É nítido na notificação anexa ao presente, a total inviabilidade do mesmo, tendo incorrido de forma totalmente contrária ao que é estipulado pelo Código de Trânsito Vigente, pois não há nele, sendo necessário assim, o seu imediato arquivamento.', style: 'paragrafos' },

                { text: 'O ordenamento jurídico pátrio repele a possibilidade de atribuição de responsabilidade infracional com a mera citação da norma supostamente infringida. Tal ato, ofende os direitos constitucionais do cidadão e atenta contra a razoabilidade que deve imperar na aplicação da lei, que a autoridade de trânsito faça imputações infracionais, sem oferecer qualquer elemento concreto que justifique a autuação.', style: 'paragrafos' },

                { text: 'A Constituição Federal, em seu artigo 5º, inciso LV, assegura o direito de defesa também em processos administrativos. Como se sabe, todo aquele que é acusado de ter cometido algum ilícito, seja ele de que natureza for, se defende é dos fatos que lhe são imputados, e não da capitulação jurídica. Como é possível que o suposto infrator exerça em plenitude seu direito de defesa se não há mínima descrição dos fatos que ele possa contraditar e refutar? Como é possível que se sustente a veracidade da imputação registrada no auto de infração, sem qualquer suporte fático ou lastro probatório? Seria justo enfatizar a declaração do agente de trânsito como verdade absoluta e incontestável?', style: 'paragrafos' },

                { text: 'E é nesse sentido que se orienta a interpretação que deve ser dada ao artigo 280 do Código de Trânsito Brasileiro, quando em seu inciso I exige a “tipificação da infração” como elemento essencial do auto de infração.', style: 'paragrafos' },

                { text: ['Essa interpretação é ainda reforçada pelo ', { text: 'DENATRAN', bold: true }, '(Departamento Nacional de Trânsito), que acertadamente editou a Resolução 390/11, dispondo sobre os procedimentos administrativos necessários para lavratura do auto de infração. O artigo 3º da referida Resolução assim prescreve:'], style: 'paragrafos' },

                {
                    text: 'RESOLUÇÃO Nº 390 DE 11 DE AGOSTO DE 2011 - DENATRAN',
                    style: 'alinhadoDireita'
                },

                {
                    text: 'Art. 3º O Auto de infração previsto no artigo anterior deverá ser composto, no mínimo, pelos blocos de campos estabelecidos no Anexo I desta Reslução, os quais são de preenchimento obrigatório.',
                    style: 'alinhadoDireita'
                },

                {
                    text: 'ANEXO I',
                    style: 'alinhadoDireita'
                },

                {
                    text: 'Definição dos blocos e campos mínimos que deverão compor o Auto de Infração:',
                    style: 'alinhadoDireita'
                },

                {
                    text: 'IV. BLOCO 4',
                    style: 'alinhadoDireita'
                },

                {
                    text: 'CAMPO 3 - “OBSERVAÇÕES” (campo destinado ao detalhamento da infração de preenchimento obrigatório).',
                    style: 'alinhadoDireita'
                },

                { text: 'Excelentíssimo julgador, de que forma os dados inseridos no auto de infração, cuja cópia se encontra em anexo, auxiliam a compreensão da ocorrência? Onde estão os elementos que motivaram a autuação? Como pode o agente afirmar com exatidão a conduta descrita, se nem mesmo preencheu de forma correta o auto de infração?', style: 'paragrafos' },

                { text: 'Ora Ilustríssimo julgador, como pode o recorrente se defender dignamente de tal autuação, lavrada de forma tão genérica? Não há controvérsias frente a tal fato. A omissão do agente que lavrou o auto de infração, feriu os direitos constitucionais e da  ampla defesa e ao contraditório, assim prejudicando o devido processo legal.', style: 'paragrafos' },

                { text: 'Tal afronta a vida pregressa do recorrente é penalidade sem intuito educativo, apenas ensejando penalizar por conduta incerta e incoerente. Frente a tal fato, não há que se falar em deferir tal penalização obscura.', style: 'paragrafos' },

                { text: 'O que se vê é uma clara arbitrariedade do agente e uma grande irresponsabilidade no exercício de sua relevante função. A falta de informações decorre, na realidade, da inexistência de qualquer infração. O condutor é motorista de longa data e responsável, que sempre dirigiu com prudência e cautela, cumprindo com afinco todos os ditames legais. É claro que, assim como todo ser humano, pode cometer erros, mas não pode concordar em assumir a responsabilidade por algo que não fez.', style: 'paragrafos' },

                { text: 'Todo o exposto revela que se trata de um Auto de Infração irregular e inepto, que obstaculizou o exercício do direito de defesa da recorrente. A falta de elementos concretos para caracterização da infração reforça ainda mais sua inconsistência. Nesses casos, o artigo 281, parágrafo único, inciso I, do Código de trânsito Brasileiro nos apresenta o único desfecho possível, que é seu imediato arquivamento.', style: 'paragrafosBold' },

                { text: 'O Supremo Tribunal Federal já pacificou matéria quanto à possibilidade da Administração Pública anular os seus atos eivados de nulidades, conforme a Súmula nº 473, transcrita a seguir:', style: 'paragrafos' },

                {
                    text: '“A administração pode anular seus próprios atos quando eivados de vícios que os tornam ilegais, porque deles não se originam direitos, ou revoga-los, por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos, e ressalvada em todos os casos a apreciação judicial.”',
                    style: 'alinhadoDireita'
                },

                {
                    text: `DOS PEDIDOS`,
                    style: 'title2'
                },

                { text: 'Estando demonstrada a absoluta inviabilidade jurídica dessa penalidade, requer seja acolhido o presente recurso, com o consequente arquivamento do Auto de Infração aqui impugnado. Caso, contudo, não seja este o entendimento do julgador, requer seja a decisão devidamente motivada, sob pena de nulidade, a teor do Art. 50, I e II, parágrafo 1º, da Lei nº 9.784/99.', style: 'paragrafos' },

                {
                    ul: [
                        { text: 'Que suspenda seus efeitos até o julgamento;', bold: true },
                        { text: 'Que seja convertido o ônus da prova ao órgão competente;', bold: true },
                        { text: 'A improcedência da penalidade;', bold: true },
                        { text: 'A declaração de nulidade do presente;', bold: true },
                        { text: 'Que seja arquivado e julgado insubsistente.', bold: true },
                    ],
                    margin: [150, 10, 0, 0]

                },

                { text: `${DadosPessoais.cidade}-${DadosPessoais.uf}, ${dataFormatada}`, style: 'paragrafosVarCentral' },

                { text: 'Nesses termos, ', style: 'paragrafosCentral' },

                { text: 'Pede deferimento', style: 'paragrafosCentral' },

                { text: '_____________________________________', style: 'paragrafosCentral2' },

                { text: `${DadosPessoais.nome}`, style: 'paragrafosVarCentral' },

                { text: 'Recorrente', style: 'paragrafosCentral' }

            ];
        } else {
            if (InfoCliente.descricao === 'Dirigir veículo com validade de CNH/PPD vencida há mais de 30 dias') {
                return [

                    {
                        text: 'ILUSTRÍSSIMOS (A) SENHORES (A) DOUTORES (A) JULGADORES',
                        style: 'header'
                    },

                    { text: ['Auto de Infração', { text: ` ${DadosPessoais.autoInfracao}`, style: 'dadosVariaveis' }], style: 'paragrafos' },
                    { text: ['Recorrente:', { text: ` ${DadosPessoais.nome}`, style: 'dadosVariaveis' }], style: 'paragrafos' },
                    {
                        text: [{ text: `${DadosPessoais.nome}`, style: 'dadosVariaveis' },
                            ', brasileiro, portador do CPF ',
                        { text: `${DadosPessoais.cpf}`, style: 'dadosVariaveis' },
                            ' do RG ',
                        { text: `${DadosPessoais.rg}`, style: 'dadosVariaveis' },
                            ', ',
                        { text: `${DadosPessoais.solicitante}`, style: 'dadosVariaveis' },
                            ' do veículo de placa ',
                        { text: `${DadosPessoais.placaVeiculo}`, style: 'dadosVariaveis' },
                            ', vem respeitosamente a presença de Vossa Senhoria, com fundamento na Constituição da República, Lei 9.503/97 e demais dispositivos aplicáveis à espécie, interpor a presente:'], style: 'paragrafos'
                    },

                    {
                        text: `${InfoCliente.tipoDefesa}`,
                        style: 'title1'
                    },

                    { text: 'Em face da penalidade aplicada irregularmente conforme será demonstrado, sem obedecer às delimitações estabelecidas pelo CONTRAN.', style: 'paragrafos' },

                    {
                        text: 'DA TEMPESTIVIDADE',
                        style: 'title1'
                    },

                    { text: 'O presente recurso é tempestivo, eis que segue o prazo previsto no auto de infração em anexo, e em razão ao posicionamento unânime dos Tribunais Superiores, “que o decurso do tempo não convalida o que nasceu invalido.” Segue:', style: 'paragrafos' },

                    {
                        text: 'DIREITO ADMINISTRATIVO. ATO ADMINISTRATIVO NULO. IMPRESCRITIBILIDADE. DECRETO 20.910/32 - ART. 1º. 1. Não se pode levar na devida linha de conta a tese da prescrição quinquenal (art. 1º do Decreto 20.910/32), em se tratando de ato administrativo nulo, porquanto, nestas condições, "o decurso do tempo não convalida o que nasceu inválido." Precedentes. 2. Recurso especial conhecido. (STJ - REsp: 311044 RJ 2001/0031224-1, Relator: Ministro FERNANDO GONÇALVES, Data de Julgamento: 27/08/2002, T6 - SEXTA TURMA, Data de Publicação:  --> DJ 23/09/2002 p. 401)',
                        style: 'alinhadoDireita'
                    },

                    { text: 'Assim fica nítida a validade do presente recurso, requerendo assim sua plena análise e seu total provimento pelos motivos elencados.', style: 'paragrafos' },

                    {
                        text: `DOS FATOS`,
                        style: 'title2'
                    },

                    {
                        text: ['Fui autuado por supostamente ',
                            { text: `${InfoCliente.descricao}`, style: 'dadosVariaveis' },
                            ' , infração prevista no artigo ',
                            { text: `${InfoCliente.artigoMulta}`, style: 'dadosVariaveis' },
                            ' do Código de Trânsito Brasileiro. '], style: 'paragrafos'
                    },

                    { text: 'Tal infração, não merece ser mantida, já que ao longo de toda a minha trajetória como condutor, sempre respeitei e zelei pelas normas de trânsito.', style: 'paragrafos' },

                    { text: 'Além disso, o auto de infração imposto contém inúmeras irregularidades e vícios insanáveis, além de ausência de informações imprescindíveis, conforme será demonstrado a seguir.', style: 'paragrafos' },

                    { text: 'Portanto, o recurso interposto busca a anulação do presente auto de infração, e seu consequente arquivamento, evitando assim, a aplicação da penalidade de forma injusta.', style: 'paragrafos' },

                    {
                        text: `DO DESCUMPRIMENTO DE PRINCÍPIOS BÁSICOS DA ADMINISTRAÇÃO PÚBLICA`,
                        style: 'title2'
                    },

                    { text: 'A Constituição Federal, em seu artigo 37, discorre acerca dos princípios básicos da Administração Pública, que são: Legalidade, impessoalidade, moralidade, publicidade e eficiência.', style: 'paragrafos' },

                    { text: 'O princípio da legalidade na administração pública implica que ela está vinculada estritamente à lei, agindo somente dentro dos limites estabelecidos e de acordo com os procedimentos legais prescritos. Isso reflete a ideia do "império da lei" sobre a vontade arbitrária dos indivíduos.', style: 'paragrafos' },

                    { text: 'Já a impessoalidade procura evitar que agentes públicos ajam visando interesses pessoais, garantindo que suas ações sejam guiadas pelo bem comum, em vez de preferências individuais, evitando assim desvios de finalidade ou abusos de poder.', style: 'paragrafos' },

                    { text: 'O princípio da moralidade refere-se à conduta ética e honesta, alinhada com o interesse público, diferenciando-se da moral individual. Ele complementa o princípio da legalidade, exigindo que os agentes públicos considerem não apenas a legalidade formal, mas também a moralidade em suas decisões.', style: 'paragrafos' },

                    { text: 'A publicidade na administração pública implica que seus atos e decisões devem ser transparentes e acessíveis ao conhecimento público, evitando segredos ou sigilos que possam prejudicar os interesses individuais ou coletivos.', style: 'paragrafos' },

                    { text: 'Por fim, a eficiência na administração pública diz respeito à otimização dos recursos e ações, visando a redução de erros e a obtenção dos melhores resultados possíveis, embora esse conceito possa ser interpretado de várias maneiras e, por vezes, restrito a uma visão muito específica.', style: 'paragrafos' },

                    { text: 'Portanto, fica claro que é obrigatório à Administração Pública, o cumprimento destes princípios BÁSICOS acima expostos, para que haja a regularidade da infração e o cumprimento da aplicação da penalidade. No caso a seguir, podemos observar que há a inobservância de tais princípios, merecendo assim a anulação do presente auto.', style: 'paragrafos' },

                    {
                        text: `DA MOTIVAÇÃO DOS ATOS ADMINISTRATIVOS`,
                        style: 'title2'
                    },

                    { text: 'Reza o artigo 50 da lei 9.784/99 que regula os atos administrativos, aplica parâmetros para que a administração pública siga e aja de acordo com os dizeres da lei. É impossível deixar de expor os dizeres de tal artigo que EXIGE que os órgãos públicos sigam tais parâmetros:', style: 'paragrafos' },

                    {
                        text: 'Art. 50. Os atos administrativos deverão ser motivados, com indicação dos fatos e dos fundamentos jurídicos, quando:',
                        style: 'alinhadoDireita'
                    },


                    {
                        text: 'I - neguem, limitem ou afetem direitos ou interesses;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'II - imponham ou agravem deveres, encargos ou sanções;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'III - decidam processos administrativos de concurso ou seleção pública;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'IV - dispensem ou declarem a inexigibilidade de processo licitatório;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'V - decidam recursos administrativos;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'VI - decorram de reexame de ofício;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'VII - deixem de aplicar jurisprudência firmada sobre a questão ou discrepem de pareceres, laudos, propostas e relatórios oficiais;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'VIII - importem anulação, revogação, suspensão ou convalidação de ato administrativo.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: '§ 1o A motivação deve ser explícita, clara e congruente, podendo consistir em declaração de concordância com fundamentos de anteriores pareceres, informações, decisões ou propostas, que, neste caso, serão parte integrante do ato.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: '§ 2o Na solução de vários assuntos da mesma natureza, pode ser utilizado meio mecânico que reproduza os fundamentos das decisões, desde que não prejudique direito ou garantia dos interessados.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: '§ 3o A motivação das decisões de órgãos colegiados e comissões ou de decisões orais constará da respectiva ata ou de termo escrito.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: `DO NÃO CUMPRIMENTO DE MEDIDA ADMINISTRATIVA OBRIGATÓRIA`,
                        style: 'title1'
                    },

                    { text: 'Analisando o artigo de lei da infração imposta, conclui-se que é indispensável o cumprimento de medida administrativa, aliado com imposição de penalidade aplicado pelo agente policial.', style: 'paragrafos' },

                    { text: ['Fica clara a ', { text: 'OMISSÃO', bold: true }, ' do agente que lavrou o auto de infração, o fazendo de forma arbitrária, uma vez que se omitiu e não aplicou a medida administrativa imposta pelo artigo que tipificou a infração, já que não houve o cumprimento de medida administrativo. Desta forma como há a possibilidade de dar credibilidade a tal autuação, se em sua lavratura não há um mínimo de regularidade para sua aplicação?'], style: 'paragrafos' },

                    { text: 'Todavia, o Código de Trânsito Brasileiro que instituiu o Sistema Nacional de Trânsito, teve como fundamento a diminuição no cometimento das infrações de trânsito, bem como incentivar à sua educação. Tais medidas devem ser atreladas às possíveis sanções para quem demandar contrariamente às determinações legais.', style: 'paragrafos' },

                    { text: 'Portanto, é um conjunto punitivo que trará ao condutor infrator a pretensão de não cometer novas infrações, educando-o.', style: 'paragrafos' },

                    { text: 'Neste diapasão, gostaria que observasse o que determina o art. 161 do CTB:', style: 'paragrafos' },

                    { text: 'Art. 161 - Constitui infração de trânsito a inobservância de qualquer preceito deste Código, da legislação complementar ou das resoluções do CONTRAN, sendo o infrator sujeito às penalidades e medidas administrativas indicadas em cada artigo, além das punições previstas no Capítulo XIX.', style: 'alinhadoDireita' },

                    { text: 'Logo, depreende-se de que no momento da aplicação da medida punitiva, não se poderá deixar esta ou aquela determinação para cumprimento ao bom senso do agente autuador, mas sim, deverá ser aplicada como está expressa de forma positivada em cada um dos artigos da lei. Desta forma, se o agente, ao praticar ato administrativo de sua competência, fazê-lo ao arrepio do que determina a lei, este ato todo está eivado de vícios e passível de anulabilidade.', style: 'paragrafos' },

                    { text: 'Portanto, não é outra a determinação daquele códex, senão:', style: 'alinhadoDireita' },

                    { text: 'Art. 5.º O Sistema Nacional de Trânsito é o conjunto de órgãos e entidades da União, dos Estados, do Distrito Federal e dos Municípios que tem por finalidade o exercício das atividades de planejamento, administração, normatização, pesquisa, registro e licenciamento de veículos, formação, habilitação e reciclagem de condutores, educação, engenharia, operação do sistema viário, policiamento, fiscalização, julgamento de infrações e de recursos e aplicação de penalidades.', style: 'alinhadoDireita' },

                    { text: 'Também, reforçando tal interpretação:', style: 'alinhadoDireita' },

                    { text: 'Art. 24 - Compete aos órgãos e entidades executivos de trânsito dos Municípios, no âmbito de sua circunscrição: ', style: 'alinhadoDireita' },

                    { text: 'I - cumprir e fazer cumprir a legislação e as normas de trânsito, no âmbito de suas atribuições;', style: 'alinhadoDireita' },

                    { text: 'Portanto, é justo vir perante Vs. Senhoria, expor o contraditório a autuação e requerer a declaração de nulidade da mesma.', style: 'paragrafos' },

                    { text: ['O que se vê é uma clara arbitrariedade do agente, e uma grande irresponsabilidade no exercício de sua relevante função. A falta de informações decorre, na realidade, da inexistência de qualquer infração. Por fim, ressalte-se que não houve o cumprimento de medida administrativa', { text: 'OBRIGATÓRIA.', bold: true }], style: 'paragrafos' },


                    {
                        text: `DA IRREGULARIDADE E INCONSISTÊNCIA DA PENALIDADE`,
                        style: 'title2'
                    },

                    { text: 'Inicialmente, é preciso esclarecer, a presente notificação é nula, de pleno direito, eis que o Código de Trânsito traz a seguinte determinação:', style: 'paragrafos' },

                    {
                        text: 'Art. 281. A autoridade de trânsito, na esfera da competência estabelecida neste Código e dentro de sua circunscrição, julgará a consistência do auto de infração e aplicará a penalidade cabível.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'Parágrafo único. O auto de infração será arquivado e seu registro julgado insubsistente:',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'I - se considerado inconsistente ou irregular;',
                        style: 'alinhadoDireita'
                    },

                    { text: 'O auto de infração é um documento público, lavrado pelo agente de trânsito no momento em que constata a ocorrência da infração. Trata-se de um documento de suma importância, pois ele é necessário para instauração do processo administrativo de trânsito, conforme dispõe o artigo 280 do Código de Trânsito Brasileiro. Somente através do processo administrativo, com a observância dos princípios do contraditório e da ampla defesa, que é possível imputar ao condutor a prática de alguma infração e aplicar a penalidade devida.', style: 'paragrafos' },

                    { text: 'Dada sua importância, a autuação é classificada como um ato administrativo vinculado. Em outras palavras, o agente público responsável não possui discricionariedade para deixar de lavrar o auto no momento que atesta a infração, assim como não pode lavrá-lo sem que haja qualquer suporte fático que lhe dê sustentação.', style: 'paragrafos' },

                    { text: 'E é nesse ponto que exsurge o vício presente no auto de infração aqui impugnado. A simples leitura do documento em questão mostra que o agente fiscal responsável por sua lavratura apenas assinalou a opção que indicava a suposta infração, sem contudo explicitar de que modo a conduta do suposto infrator se enquadrava na tipificação indicada.', style: 'paragrafos' },

                    { text: 'Em nenhum momento o agente de trânsito narrou ou descreveu, ainda que de forma sucinta, as circunstâncias em que se deu a suposta infração. É nítido na notificação anexa ao presente, a total inviabilidade do mesmo, tendo incorrido de forma totalmente contrária ao que é estipulado pelo Código de Trânsito Vigente, pois não há nele, sendo necessário assim, o seu imediato arquivamento.', style: 'paragrafos' },

                    { text: 'O ordenamento jurídico pátrio repele a possibilidade de atribuição de responsabilidade infracional com a mera citação da norma supostamente infringida. Tal ato, ofende os direitos constitucionais do cidadão e atenta contra a razoabilidade que deve imperar na aplicação da lei, que a autoridade de trânsito faça imputações infracionais, sem oferecer qualquer elemento concreto que justifique a autuação.', style: 'paragrafos' },

                    { text: 'A Constituição Federal, em seu artigo 5º, inciso LV, assegura o direito de defesa também em processos administrativos. Como se sabe, todo aquele que é acusado de ter cometido algum ilícito, seja ele de que natureza for, se defende é dos fatos que lhe são imputados, e não da capitulação jurídica. Como é possível que o suposto infrator exerça em plenitude seu direito de defesa se não há mínima descrição dos fatos que ele possa contraditar e refutar? Como é possível que se sustente a veracidade da imputação registrada no auto de infração, sem qualquer suporte fático ou lastro probatório? Seria justo enfatizar a declaração do agente de trânsito como verdade absoluta e incontestável?', style: 'paragrafos' },

                    { text: 'E é nesse sentido que se orienta a interpretação que deve ser dada ao artigo 280 do Código de Trânsito Brasileiro, quando em seu inciso I exige a “tipificação da infração” como elemento essencial do auto de infração.', style: 'paragrafos' },

                    { text: ['Essa interpretação é ainda reforçada pelo ', { text: 'DENATRAN', bold: true }, '(Departamento Nacional de Trânsito), que acertadamente editou a Resolução 390/11, dispondo sobre os procedimentos administrativos necessários para lavratura do auto de infração. O artigo 3º da referida Resolução assim prescreve:'], style: 'paragrafos' },

                    {
                        text: 'RESOLUÇÃO Nº 390 DE 11 DE AGOSTO DE 2011 - DENATRAN',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'Art. 3º O Auto de infração previsto no artigo anterior deverá ser composto, no mínimo, pelos blocos de campos estabelecidos no Anexo I desta Reslução, os quais são de preenchimento obrigatório.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'ANEXO I',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'Definição dos blocos e campos mínimos que deverão compor o Auto de Infração:',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'IV. BLOCO 4',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'CAMPO 3 - “OBSERVAÇÕES” (campo destinado ao detalhamento da infração de preenchimento obrigatório).',
                        style: 'alinhadoDireita'
                    },

                    { text: 'Excelentíssimo julgador, de que forma os dados inseridos no auto de infração, cuja cópia se encontra em anexo, auxiliam a compreensão da ocorrência? Onde estão os elementos que motivaram a autuação? Como pode o agente afirmar com exatidão a conduta descrita, se nem mesmo preencheu de forma correta o auto de infração?', style: 'paragrafos' },

                    { text: 'Ora Ilustríssimo julgador, como pode o recorrente se defender dignamente de tal autuação, lavrada de forma tão genérica? Não há controvérsias frente a tal fato. A omissão do agente que lavrou o auto de infração, feriu os direitos constitucionais e da  ampla defesa e ao contraditório, assim prejudicando o devido processo legal.', style: 'paragrafos' },

                    { text: 'Tal afronta a vida pregressa do recorrente é penalidade sem intuito educativo, apenas ensejando penalizar por conduta incerta e incoerente. Frente a tal fato, não há que se falar em deferir tal penalização obscura.', style: 'paragrafos' },

                    { text: 'O que se vê é uma clara arbitrariedade do agente e uma grande irresponsabilidade no exercício de sua relevante função. A falta de informações decorre, na realidade, da inexistência de qualquer infração. O condutor é motorista de longa data e responsável, que sempre dirigiu com prudência e cautela, cumprindo com afinco todos os ditames legais. É claro que, assim como todo ser humano, pode cometer erros, mas não pode concordar em assumir a responsabilidade por algo que não fez.', style: 'paragrafos' },

                    { text: 'Todo o exposto revela que se trata de um Auto de Infração irregular e inepto, que obstaculizou o exercício do direito de defesa da recorrente. A falta de elementos concretos para caracterização da infração reforça ainda mais sua inconsistência. Nesses casos, o artigo 281, parágrafo único, inciso I, do Código de trânsito Brasileiro nos apresenta o único desfecho possível, que é seu imediato arquivamento.', style: 'paragrafosBold' },

                    { text: 'O Supremo Tribunal Federal já pacificou matéria quanto à possibilidade da Administração Pública anular os seus atos eivados de nulidades, conforme a Súmula nº 473, transcrita a seguir:', style: 'paragrafos' },

                    {
                        text: '“A administração pode anular seus próprios atos quando eivados de vícios que os tornam ilegais, porque deles não se originam direitos, ou revoga-los, por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos, e ressalvada em todos os casos a apreciação judicial.”',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: `DOS PEDIDOS`,
                        style: 'title2'
                    },

                    { text: 'Estando demonstrada a absoluta inviabilidade jurídica dessa penalidade, requer seja acolhido o presente recurso, com o consequente arquivamento do Auto de Infração aqui impugnado. Caso, contudo, não seja este o entendimento do julgador, requer seja a decisão devidamente motivada, sob pena de nulidade, a teor do Art. 50, I e II, parágrafo 1º, da Lei nº 9.784/99.', style: 'paragrafos' },

                    {
                        ul: [
                            { text: 'Que suspenda seus efeitos até o julgamento;', bold: true },
                            { text: 'Que seja convertido o ônus da prova ao órgão competente;', bold: true },
                            { text: 'A improcedência da penalidade;', bold: true },
                            { text: 'A declaração de nulidade do presente;', bold: true },
                            { text: 'Que seja arquivado e julgado insubsistente.', bold: true },
                        ],
                        margin: [150, 10, 0, 0]

                    },

                    { text: `${DadosPessoais.cidade}-${DadosPessoais.uf}, ${dataFormatada}`, style: 'paragrafosVarCentral' },

                    { text: 'Nesses termos, ', style: 'paragrafosCentral' },

                    { text: 'Pede deferimento', style: 'paragrafosCentral' },

                    { text: '_____________________________________', style: 'paragrafosCentral2' },

                    { text: `${DadosPessoais.nome}`, style: 'paragrafosVarCentral' },

                    { text: 'Recorrente', style: 'paragrafosCentral' }

                ];
            } else {
                return [

                    {
                        text: 'ILUSTRÍSSIMOS (A) SENHORES (A) DOUTORES (A) JULGADORES',
                        style: 'header'
                    },

                    { text: ['Auto de Infração', { text: ` ${DadosPessoais.autoInfracao}`, style: 'dadosVariaveis' }], style: 'paragrafos' },
                    { text: ['Recorrente:', { text: ` ${DadosPessoais.nome}`, style: 'dadosVariaveis' }], style: 'paragrafos' },
                    {
                        text: [{ text: `${DadosPessoais.nome}`, style: 'dadosVariaveis' },
                            ', brasileiro, portador do CPF ',
                        { text: `${DadosPessoais.cpf}`, style: 'dadosVariaveis' },
                            ' do RG ',
                        { text: `${DadosPessoais.rg}`, style: 'dadosVariaveis' },
                            ', ',
                        { text: `${DadosPessoais.solicitante}`, style: 'dadosVariaveis' },
                            ' do veículo de placa ',
                        { text: `${DadosPessoais.placaVeiculo}`, style: 'dadosVariaveis' },
                            ', vem respeitosamente a presença de Vossa Senhoria, com fundamento na Constituição da República, Lei 9.503/97 e demais dispositivos aplicáveis à espécie, interpor a presente:'], style: 'paragrafos'
                    },

                    {
                        text: `${InfoCliente.tipoDefesa}`,
                        style: 'title1'
                    },

                    { text: 'Em face da penalidade aplicada irregularmente conforme será demonstrado, sem obedecer às delimitações estabelecidas pelo CONTRAN.', style: 'paragrafos' },

                    {
                        text: 'DA TEMPESTIVIDADE',
                        style: 'title1'
                    },

                    { text: 'O presente recurso é tempestivo, eis que segue o prazo previsto no auto de infração em anexo, e em razão ao posicionamento unânime dos Tribunais Superiores, “que o decurso do tempo não convalida o que nasceu invalido.” Segue:', style: 'paragrafos' },

                    {
                        text: 'DIREITO ADMINISTRATIVO. ATO ADMINISTRATIVO NULO. IMPRESCRITIBILIDADE. DECRETO 20.910/32 - ART. 1º. 1. Não se pode levar na devida linha de conta a tese da prescrição quinquenal (art. 1º do Decreto 20.910/32), em se tratando de ato administrativo nulo, porquanto, nestas condições, "o decurso do tempo não convalida o que nasceu inválido." Precedentes. 2. Recurso especial conhecido. (STJ - REsp: 311044 RJ 2001/0031224-1, Relator: Ministro FERNANDO GONÇALVES, Data de Julgamento: 27/08/2002, T6 - SEXTA TURMA, Data de Publicação:  --> DJ 23/09/2002 p. 401)',
                        style: 'alinhadoDireita'
                    },

                    { text: 'Assim fica nítida a validade do presente recurso, requerendo assim sua plena análise e seu total provimento pelos motivos elencados.', style: 'paragrafos' },

                    {
                        text: `DOS FATOS`,
                        style: 'title2'
                    },

                    {
                        text: ['Fui autuado por supostamente ',
                            { text: `${InfoCliente.descricao}`, style: 'dadosVariaveis' },
                            ' , infração prevista no artigo ',
                            { text: `${InfoCliente.artigoMulta}`, style: 'dadosVariaveis' },
                            ' do Código de Trânsito Brasileiro. '], style: 'paragrafos'
                    },

                    { text: 'Tal infração, não merece ser mantida, já que ao longo de toda a minha trajetória como condutor, sempre respeitei e zelei pelas normas de trânsito.', style: 'paragrafos' },

                    { text: 'Além disso, o auto de infração imposto contém inúmeras irregularidades e vícios insanáveis, além de ausência de informações imprescindíveis, conforme será demonstrado a seguir.', style: 'paragrafos' },

                    { text: 'Portanto, o recurso interposto busca a anulação do presente auto de infração, e seu consequente arquivamento, evitando assim, a aplicação da penalidade de forma injusta.', style: 'paragrafos' },

                    {
                        text: `DO DESCUMPRIMENTO DE PRINCÍPIOS BÁSICOS DA ADMINISTRAÇÃO PÚBLICA`,
                        style: 'title2'
                    },

                    { text: 'A Constituição Federal, em seu artigo 37, discorre acerca dos princípios básicos da Administração Pública, que são: Legalidade, impessoalidade, moralidade, publicidade e eficiência.', style: 'paragrafos' },

                    { text: 'O princípio da legalidade na administração pública implica que ela está vinculada estritamente à lei, agindo somente dentro dos limites estabelecidos e de acordo com os procedimentos legais prescritos. Isso reflete a ideia do "império da lei" sobre a vontade arbitrária dos indivíduos.', style: 'paragrafos' },

                    { text: 'Já a impessoalidade procura evitar que agentes públicos ajam visando interesses pessoais, garantindo que suas ações sejam guiadas pelo bem comum, em vez de preferências individuais, evitando assim desvios de finalidade ou abusos de poder.', style: 'paragrafos' },

                    { text: 'O princípio da moralidade refere-se à conduta ética e honesta, alinhada com o interesse público, diferenciando-se da moral individual. Ele complementa o princípio da legalidade, exigindo que os agentes públicos considerem não apenas a legalidade formal, mas também a moralidade em suas decisões.', style: 'paragrafos' },

                    { text: 'A publicidade na administração pública implica que seus atos e decisões devem ser transparentes e acessíveis ao conhecimento público, evitando segredos ou sigilos que possam prejudicar os interesses individuais ou coletivos.', style: 'paragrafos' },

                    { text: 'Por fim, a eficiência na administração pública diz respeito à otimização dos recursos e ações, visando a redução de erros e a obtenção dos melhores resultados possíveis, embora esse conceito possa ser interpretado de várias maneiras e, por vezes, restrito a uma visão muito específica.', style: 'paragrafos' },

                    { text: 'Portanto, fica claro que é obrigatório à Administração Pública, o cumprimento destes princípios BÁSICOS acima expostos, para que haja a regularidade da infração e o cumprimento da aplicação da penalidade. No caso a seguir, podemos observar que há a inobservância de tais princípios, merecendo assim a anulação do presente auto.', style: 'paragrafos' },

                    {
                        text: `DA MOTIVAÇÃO DOS ATOS ADMINISTRATIVOS`,
                        style: 'title2'
                    },

                    { text: 'Reza o artigo 50 da lei 9.784/99 que regula os atos administrativos, aplica parâmetros para que a administração pública siga e aja de acordo com os dizeres da lei. É impossível deixar de expor os dizeres de tal artigo que EXIGE que os órgãos públicos sigam tais parâmetros:', style: 'paragrafos' },

                    {
                        text: 'Art. 50. Os atos administrativos deverão ser motivados, com indicação dos fatos e dos fundamentos jurídicos, quando:',
                        style: 'alinhadoDireita'
                    },


                    {
                        text: 'I - neguem, limitem ou afetem direitos ou interesses;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'II - imponham ou agravem deveres, encargos ou sanções;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'III - decidam processos administrativos de concurso ou seleção pública;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'IV - dispensem ou declarem a inexigibilidade de processo licitatório;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'V - decidam recursos administrativos;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'VI - decorram de reexame de ofício;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'VII - deixem de aplicar jurisprudência firmada sobre a questão ou discrepem de pareceres, laudos, propostas e relatórios oficiais;',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'VIII - importem anulação, revogação, suspensão ou convalidação de ato administrativo.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: '§ 1o A motivação deve ser explícita, clara e congruente, podendo consistir em declaração de concordância com fundamentos de anteriores pareceres, informações, decisões ou propostas, que, neste caso, serão parte integrante do ato.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: '§ 2o Na solução de vários assuntos da mesma natureza, pode ser utilizado meio mecânico que reproduza os fundamentos das decisões, desde que não prejudique direito ou garantia dos interessados.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: '§ 3o A motivação das decisões de órgãos colegiados e comissões ou de decisões orais constará da respectiva ata ou de termo escrito.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: `DA IRREGULARIDADE E INCONSISTÊNCIA DA PENALIDADE`,
                        style: 'title2'
                    },

                    { text: 'Inicialmente, é preciso esclarecer, a presente notificação é nula, de pleno direito, eis que o Código de Trânsito traz a seguinte determinação:', style: 'paragrafos' },

                    {
                        text: 'Art. 281. A autoridade de trânsito, na esfera da competência estabelecida neste Código e dentro de sua circunscrição, julgará a consistência do auto de infração e aplicará a penalidade cabível.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'Parágrafo único. O auto de infração será arquivado e seu registro julgado insubsistente:',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'I - se considerado inconsistente ou irregular;',
                        style: 'alinhadoDireita'
                    },

                    { text: 'O auto de infração é um documento público, lavrado pelo agente de trânsito no momento em que constata a ocorrência da infração. Trata-se de um documento de suma importância, pois ele é necessário para instauração do processo administrativo de trânsito, conforme dispõe o artigo 280 do Código de Trânsito Brasileiro. Somente através do processo administrativo, com a observância dos princípios do contraditório e da ampla defesa, que é possível imputar ao condutor a prática de alguma infração e aplicar a penalidade devida.', style: 'paragrafos' },

                    { text: 'Dada sua importância, a autuação é classificada como um ato administrativo vinculado. Em outras palavras, o agente público responsável não possui discricionariedade para deixar de lavrar o auto no momento que atesta a infração, assim como não pode lavrá-lo sem que haja qualquer suporte fático que lhe dê sustentação.', style: 'paragrafos' },

                    { text: 'E é nesse ponto que exsurge o vício presente no auto de infração aqui impugnado. A simples leitura do documento em questão mostra que o agente fiscal responsável por sua lavratura apenas assinalou a opção que indicava a suposta infração, sem contudo explicitar de que modo a conduta do suposto infrator se enquadrava na tipificação indicada.', style: 'paragrafos' },

                    { text: 'Em nenhum momento o agente de trânsito narrou ou descreveu, ainda que de forma sucinta, as circunstâncias em que se deu a suposta infração. É nítido na notificação anexa ao presente, a total inviabilidade do mesmo, tendo incorrido de forma totalmente contrária ao que é estipulado pelo Código de Trânsito Vigente, pois não há nele, sendo necessário assim, o seu imediato arquivamento.', style: 'paragrafos' },

                    { text: 'O ordenamento jurídico pátrio repele a possibilidade de atribuição de responsabilidade infracional com a mera citação da norma supostamente infringida. Tal ato, ofende os direitos constitucionais do cidadão e atenta contra a razoabilidade que deve imperar na aplicação da lei, que a autoridade de trânsito faça imputações infracionais, sem oferecer qualquer elemento concreto que justifique a autuação.', style: 'paragrafos' },

                    { text: 'A Constituição Federal, em seu artigo 5º, inciso LV, assegura o direito de defesa também em processos administrativos. Como se sabe, todo aquele que é acusado de ter cometido algum ilícito, seja ele de que natureza for, se defende é dos fatos que lhe são imputados, e não da capitulação jurídica. Como é possível que o suposto infrator exerça em plenitude seu direito de defesa se não há mínima descrição dos fatos que ele possa contraditar e refutar? Como é possível que se sustente a veracidade da imputação registrada no auto de infração, sem qualquer suporte fático ou lastro probatório? Seria justo enfatizar a declaração do agente de trânsito como verdade absoluta e incontestável?', style: 'paragrafos' },

                    { text: 'E é nesse sentido que se orienta a interpretação que deve ser dada ao artigo 280 do Código de Trânsito Brasileiro, quando em seu inciso I exige a “tipificação da infração” como elemento essencial do auto de infração.', style: 'paragrafos' },

                    { text: ['Essa interpretação é ainda reforçada pelo ', { text: 'DENATRAN', bold: true }, '(Departamento Nacional de Trânsito), que acertadamente editou a Resolução 390/11, dispondo sobre os procedimentos administrativos necessários para lavratura do auto de infração. O artigo 3º da referida Resolução assim prescreve:'], style: 'paragrafos' },

                    {
                        text: 'RESOLUÇÃO Nº 390 DE 11 DE AGOSTO DE 2011 - DENATRAN',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'Art. 3º O Auto de infração previsto no artigo anterior deverá ser composto, no mínimo, pelos blocos de campos estabelecidos no Anexo I desta Reslução, os quais são de preenchimento obrigatório.',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'ANEXO I',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'Definição dos blocos e campos mínimos que deverão compor o Auto de Infração:',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'IV. BLOCO 4',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: 'CAMPO 3 - “OBSERVAÇÕES” (campo destinado ao detalhamento da infração de preenchimento obrigatório).',
                        style: 'alinhadoDireita'
                    },

                    { text: 'Excelentíssimo julgador, de que forma os dados inseridos no auto de infração, cuja cópia se encontra em anexo, auxiliam a compreensão da ocorrência? Onde estão os elementos que motivaram a autuação? Como pode o agente afirmar com exatidão a conduta descrita, se nem mesmo preencheu de forma correta o auto de infração?', style: 'paragrafos' },

                    { text: 'Ora Ilustríssimo julgador, como pode o recorrente se defender dignamente de tal autuação, lavrada de forma tão genérica? Não há controvérsias frente a tal fato. A omissão do agente que lavrou o auto de infração, feriu os direitos constitucionais e da  ampla defesa e ao contraditório, assim prejudicando o devido processo legal.', style: 'paragrafos' },

                    { text: 'Tal afronta a vida pregressa do recorrente é penalidade sem intuito educativo, apenas ensejando penalizar por conduta incerta e incoerente. Frente a tal fato, não há que se falar em deferir tal penalização obscura.', style: 'paragrafos' },

                    { text: 'O que se vê é uma clara arbitrariedade do agente e uma grande irresponsabilidade no exercício de sua relevante função. A falta de informações decorre, na realidade, da inexistência de qualquer infração. O condutor é motorista de longa data e responsável, que sempre dirigiu com prudência e cautela, cumprindo com afinco todos os ditames legais. É claro que, assim como todo ser humano, pode cometer erros, mas não pode concordar em assumir a responsabilidade por algo que não fez.', style: 'paragrafos' },

                    { text: 'Todo o exposto revela que se trata de um Auto de Infração irregular e inepto, que obstaculizou o exercício do direito de defesa da recorrente. A falta de elementos concretos para caracterização da infração reforça ainda mais sua inconsistência. Nesses casos, o artigo 281, parágrafo único, inciso I, do Código de trânsito Brasileiro nos apresenta o único desfecho possível, que é seu imediato arquivamento.', style: 'paragrafosBold' },

                    { text: 'O Supremo Tribunal Federal já pacificou matéria quanto à possibilidade da Administração Pública anular os seus atos eivados de nulidades, conforme a Súmula nº 473, transcrita a seguir:', style: 'paragrafos' },

                    {
                        text: '“A administração pode anular seus próprios atos quando eivados de vícios que os tornam ilegais, porque deles não se originam direitos, ou revoga-los, por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos, e ressalvada em todos os casos a apreciação judicial.”',
                        style: 'alinhadoDireita'
                    },

                    {
                        text: `DOS PEDIDOS`,
                        style: 'title2'
                    },

                    { text: 'Estando demonstrada a absoluta inviabilidade jurídica dessa penalidade, requer seja acolhido o presente recurso, com o consequente arquivamento do Auto de Infração aqui impugnado. Caso, contudo, não seja este o entendimento do julgador, requer seja a decisão devidamente motivada, sob pena de nulidade, a teor do Art. 50, I e II, parágrafo 1º, da Lei nº 9.784/99.', style: 'paragrafos' },

                    {
                        ul: [
                            { text: 'Que suspenda seus efeitos até o julgamento;', bold: true },
                            { text: 'Que seja convertido o ônus da prova ao órgão competente;', bold: true },
                            { text: 'A improcedência da penalidade;', bold: true },
                            { text: 'A declaração de nulidade do presente;', bold: true },
                            { text: 'Que seja arquivado e julgado insubsistente.', bold: true },
                        ],
                        margin: [150, 10, 0, 0]

                    },

                    { text: `${DadosPessoais.cidade}-${DadosPessoais.uf}, ${dataFormatada}`, style: 'paragrafosVarCentral' },

                    { text: 'Nesses termos, ', style: 'paragrafosCentral' },

                    { text: 'Pede deferimento', style: 'paragrafosCentral' },

                    { text: '_____________________________________', style: 'paragrafosCentral2' },

                    { text: `${DadosPessoais.nome}`, style: 'paragrafosVarCentral' },

                    { text: 'Recorrente', style: 'paragrafosCentral' }

                ];
            }

        }
    }

    function Rodape(currentPage, pageCount) {
        return [
            {
                text: currentPage + ' / ' + pageCount,
                fontSize: 8,
                bold: true,
                alignment: 'right',
                margin: [0, 10, 20, 0]
            }
        ]
    }

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],


        header: [title],
        content: Body(InfoCliente),
        styles: {
            header: {
                fontSize: 16,
                bold: true,
                alignment: 'center',
                margin: [0, 5]
            },

            dadosVariaveis: {
                color: '#FF0000',
                bold: true
            },

            paragrafos: {
                margin: [0, 10, 0, 0],
                fontSize: 12
            },

            paragrafosBold: {
                margin: [0, 10, 0, 0],
                fontSize: 12,
                bold: true
            },

            title1: {
                margin: [0, 10, 0, 0],
                fontSize: 16,
                bold: true,
                alignment: 'center',
                decoration: 'underline'
            },

            alinhadoDireita: {
                fontSize: 12,
                bold: true,
                italics: true,
                alignment: 'left',
                margin: [250, 10, 2, 0]
            },

            title2: {
                fontSize: 16,
                bold: true,
                alignment: 'center',
                margin: [0, 10, 0, 0]
            },

            paragrafosCentral: {
                margin: [0, 10, 0, 0],
                fontSize: 12,
                alignment: 'center'
            },

            paragrafosCentral2: {
                margin: [0, 40, 0, 0],
                fontSize: 12,
                alignment: 'center'
            },

            cidadeData: {
                margin: [0, 50, 0, 0],
                fontSize: 12,
                color: '#FF0000',
                alignment: 'center'
            },

            paragrafosVarCentral: {
                bold: true,
                fontSize: 12,
                color: '#FF0000',
                alignment: 'center'
            }
        },
        footer: Rodape
    };

    // pdfMake.createPdf(docDefinitions).download(`Recurso ${DadosPessoais.nome}-${DadosPessoais.autoInfracao}`);
    pdfMake.createPdf(docDefinitions).open();
}

export default GerarPdf;