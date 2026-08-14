'use client';

import { useState } from 'react';

// Banco de Dados Sagrado com Regras, Tendências e Interpretações Profundas dos 16 Odùs
const ODUS_DATABASE = {
  1: {
    numero: 1, nome: "Okaran", orixa: "Exu", elemento: "Fogo", tendenciaPadrao: "NAO",
    tituloTendencia: "NÃO — Há forte turbulência e risco de conflitos.",
    caminho: "Caminho da transformação rápida através do confronto de verdades. Okaran alerta para que não se force portas fechadas sem antes limpar os caminhos.",
    influenciaEspiritual: "Exu atua trazendo movimento veloz, desmascarando intenções ocultas e cobrando disciplina e pés no chão.",
    fatoresFavoraveis: ["Agilidade para corrigir erros do passado", "Coragem para cortar laços tóxicos", "Capacidade de recomeçar do zero com mais força"],
    pontosAtencao: ["Evitar discussões por impulso", "Cuidado com orgulho e teimosia", "Não agir sob efeito da raiva"],
    orientacoesPraticas: "Coloque os pés na terra, mantenha a calma e evite tomar decisões precipitadas nas próximas 72 horas.",
    mensagemReflexao: "Nem toda porta que se fecha é uma perda; muitas vezes é o universo impedindo você de entrar onde não há luz."
  },
  2: {
    numero: 2, nome: "Ejioko", orixa: "Ibejis e Ogum", elemento: "Ar", tendenciaPadrao: "AINDA_NAO",
    tituloTendencia: "AINDA NÃO — A decisão depende de negociações e acordos pendentes.",
    caminho: "Caminho da dualidade e da busca por alianças justas. Ejioko indica que dois caminhos estão abertos e que a pressa pode prejudicar o resultado.",
    influenciaEspiritual: "Os Ibejis trazem a pureza e a surpresa, enquanto Ogum exige postura firme na defesa dos seus direitos.",
    fatoresFavoraveis: ["Boa receptividade para acordos e conciliações", "Apoio de parcerias ou testemunhas chave", "Intuição afiada para perceber blefes"],
    pontosAtencao: ["Indecisão paralisa o progresso", "Dependência excessiva da opinião de terceiros", "Medo de se posicionar"],
    orientacoesPraticas: "Busque auxílio técnico ou jurídico neutro. Analise os papéis com lupa antes de dar o próximo passo.",
    mensagemReflexao: "A dúvida é a pausa necessária para que a sabedoria tome o lugar do impulso."
  },
  3: {
    numero: 3, nome: "Etaogundá", orixa: "Ogum", elemento: "Terra", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Vitória alcançada através do combate justo e da persistência.",
    caminho: "Caminho do guerreiro incansável. Etaogundá promete o triunfo para quem não recua diante das batalhas difíceis.",
    influenciaEspiritual: "Ogum quebra correntes de injustiça e abre caminhos à força para quem age com retidão e coragem.",
    fatoresFavoraveis: ["Provas e argumentos sólidos ao seu favor", "Força de vontade inabalável", "Proteção contra manobras de deslealdade"],
    pontosAtencao: ["Excesso de agressividade nas palavras", "Exaustão física e mental", "Teimosia em detalhes irrelevantes"],
    orientacoesPraticas: "Mantenha o foco absoluto nos fatos concretos. Não gaste energia com provações emocionais.",
    mensagemReflexao: "As espadas da justiça cortam os nós que o medo deu no seu caminho."
  },
  4: {
    numero: 4, nome: "Irosun", orixa: "Iemanjá e Oxossi", elemento: "Terra", tendenciaPadrao: "AINDA_NAO",
    tituloTendencia: "AINDA NÃO — Há verdades ocultas que precisam emergir primeiro.",
    caminho: "Caminho da prudência e do olhar atento. Irosun pede paciência para que a névoa se desfaça antes do veredito final.",
    influenciaEspiritual: "Iemanjá acalma as águas da ansiedade e Oxóssi mira com precisão no momento exato do movimento.",
    fatoresFavoraveis: ["Intuição apurada para farejar armadilhas", "Proteção ancestral silenciosa", "Descoberta de fatos que mudam o jogo a seu favor"],
    pontosAtencao: ["Ilusões e falsas promessas", "Cegueira emocional diante da realidade", "Confiar em quem fala demais"],
    orientacoesPraticas: "Silencie seus planos. Não conte vitória antes da hora e guarde os detalhes sob reserva absoluta.",
    mensagemReflexao: "A calma da água esconde a profundidade do oceano; seja calmo por fora e firme por dentro."
  },
  5: {
    numero: 5, nome: "Oxê", orixa: "Oxum", elemento: "Água", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Favorável, trazendo renovação, prosperidade e encerramento doce.",
    caminho: "Caminho do brilho e da fartura reconquistada. Oxê indica que o sofrimento está dando lugar à colheita merecida.",
    influenciaEspiritual: "Oxum envolve o caso com diplomacia, doçura e atração de abundância, abrindo portas financeiras.",
    fatoresFavoraveis: ["Magnetismo e poder de persuasão elevados", "Flexibilidade para contornar obstáculos", "Ganho financeiro ou reparação justa"],
    pontosAtencao: ["Gasto de energia com intrigas rasteiras", "Vaidade e desatenção aos detalhes", "Inconstância nos compromissos"],
    orientacoesPraticas: "Cuide do seu bem-estar. Um banho de pétalas de flores amarelas trará serenidade e atração de prosperidade.",
    mensagemReflexao: "A água doce do rio sempre encontra o caminho para o mar, superando qualquer rocha no caminho."
  },
  6: {
    numero: 6, nome: "Obará", orixa: "Xangô e Oxóssi", elemento: "Ar / Terra", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Tendência altamente favorável, com prosperidade e triunfo justo.",
    caminho: "Obará é o Odù da grande virada de chave. Representa a superação da humilhação e a conquista da honra e da fartura.",
    influenciaEspiritual: "Xangô aplica o machado da justiça equilibrada e Oxóssi garante que a flecha alcance o objetivo de fartura.",
    fatoresFavoraveis: ["Reconhecimento do seu direito legítimo", "Clareza solar nos argumentos", "Abertura substancial de caminhos financeiros"],
    pontosAtencao: ["Excesso de vaidade ou ostentação", "Falar sobre a conquista antes de ela estar concretizada", "Orgulho elevado"],
    orientacoesPraticas: "Mantenha a postura íntegra. Acenda uma vela branca em agradecimento pela clareza e mantenha silêncio absoluto.",
    mensagemReflexao: "Aquele que já esteve na poeira conhece o valor de caminhar no topo com humildade."
  },
  7: {
    numero: 7, nome: "Odi", orixa: "Obaluaê e Oxalufã", elemento: "Terra", tendenciaPadrao: "AINDA_NAO",
    tituloTendencia: "AINDA NÃO — Exige resistência e encerramento definitivo de velhos ciclos.",
    caminho: "Caminho do renascimento duro mas duradouro. Odi mostra que para o novo entrar, as dívidas do passado precisam ser zeradas.",
    influenciaEspiritual: "Obaluaê limpa as impurezas e feridas antigas, garantindo que o chão reconstruído seja inabalável.",
    fatoresFavoraveis: ["Firmeza para suportar a pressão final", "Capacidade de resiliência e paciência", "Cura de injustiças antigas"],
    pontosAtencao: ["Apegos ao passado ou ressentimentos", "Rigidez excessiva", "Pessimismo nos momentos de espera"],
    orientacoesPraticas: "Desapegue da raiva do passado. Lave suas mãos com água de canjica para atrair paz e limpeza espiritual.",
    mensagemReflexao: "O carvão sob extrema pressão e tempo é o que se transforma em diamante."
  },
  8: {
    numero: 8, nome: "Ejionile", orixa: "Oxaguiã / Oxalá", elemento: "Ar", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Vitória garantida pela sabedoria, ética e estratégia pacífica.",
    caminho: "Caminho da liderança elevada e da vitória da razão sobre o caos. Ejionile traz a paz que sucede a tempestade.",
    influenciaEspiritual: "Oxaguiã sopra clareza mental e estratégia limpa, derrubando acusações infundadas.",
    fatoresFavoraveis: ["Razão e ética inquestionáveis ao seu lado", "Clareza mental absoluta", "Respeito dos que julgam o seu caso"],
    pontosAtencao: ["Ansiedade e excesso de pensamentos à noite", "Perfeccionismo sufocante", "Impaciência com o ritmo dos outros"],
    orientacoesPraticas: "Vista-se de cores claras. Evite discussões acaloradas e mantenha a serenidade como sua maior arma.",
    mensagemReflexao: "A paz não é a ausência de guerra, é a presença do domínio sobre a própria mente."
  },
  9: {
    numero: 9, nome: "Osa", orixa: "Oyá (Iansã) e Yemanja", elemento: "Fogo / Água", tendenciaPadrao: "AINDA_NAO",
    tituloTendencia: "AINDA NÃO — Ventos de mudança repentina podem alterar o rumo do processo.",
    caminho: "Caminho da tempestade que varre o que está ultrapassado. Osa exige flexibilidade para se adaptar às guinadas do destino.",
    influenciaEspiritual: "Iansã traz a força do vento e dos raios, cortando amarras e movimentando o que estava parado.",
    fatoresFavoraveis: ["Mudança rápida do cenário a seu favor", "Coragem para inovar na estratégia", "Forte proteção contra falsos amigos"],
    pontosAtencao: ["Falta de foco e inquietação", "Ações movidas por explosões temperamentais", "Agir sem planejar"],
    orientacoesPraticas: "Não tome decisões cruciais nos dias de tempestade emocional. Respire fundo e espere a poeira baixar.",
    mensagemReflexao: "O vento forte derruba árvores de raízes rasas, mas apenas dobra as que são flexíveis."
  },
  10: {
    numero: 10, nome: "Ofun", orixa: "Oxalá", elemento: "Ar", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Solução abençoada pela sabedoria superior e respeito à verdade.",
    caminho: "Caminho da bênção dos anciãos e da pureza de propósitos. Ofun concede a vitória aos que agem de boa-fé.",
    influenciaEspiritual: "Oxalá estende seu manto sagrado, trazendo proteção máxima contra traições e desonestidades.",
    fatoresFavoraveis: ["Autoridade moral inquestionável", "Proteção espiritual elevada", "Solução honrosa do conflito"],
    pontosAtencao: ["Evitar soberba e atitudes prepotentes", "Não violar princípios morais", "Isolamento triste"],
    orientacoesPraticas: "Agradeça aos seus ancestrais. Faça uma oração sincera pedindo paz e discernimento.",
    mensagemReflexao: "A verdade pode tardar em ser ouvida, mas quando fala, o silêncio respeitoso se impõe."
  },
  11: {
    numero: 11, nome: "Owonrin", orixa: "Exu e Oyá", elemento: "Fogo", tendenciaPadrao: "NAO",
    tituloTendencia: "NÃO — Cuidado com reviravoltas inesperadas ou imprevistos de última hora.",
    caminho: "Caminho do imprevisível e do aprendizado rápido. Owonrin avisa que o tabuleiro pode mudar de posição de repente.",
    influenciaEspiritual: "Exu e Oyá trazem testes de esperteza e agilidade, cobrando atenção redobrada com documentos.",
    fatoresFavoraveis: ["Capacidade de reação rápida a emergências", "Criatividade para encontrar saídas não convencionais"],
    pontosAtencao: ["Desorganização ou perda de prazos", "Confiar em promessas informais", "Falta de atenção às letras miúdas"],
    orientacoesPraticas: "Confira todos os documentos, prazos e assinaturas duas vezes. Prevenção é a palavra chave.",
    mensagemReflexao: "Quando o vento muda de direção, o navegador inteligente ajusta as velas em vez de reclamar."
  },
  12: {
    numero: 12, nome: "Ejilaxeborá", orixa: "Xangô", elemento: "Fogo", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Justiça plena, rigorosa e indiscutível.",
    caminho: "Caminho da balança exata e do tribunal divino. Ejilaxeborá traz o julgamento imparcial onde a verdade prevalece.",
    influenciaEspiritual: "Xangô reina supremo nesta caída, pesando os atos de cada envolvido com rigor absoluto.",
    fatoresFavoraveis: ["Provas irrefutáveis ao seu favor", "Sentença ou resolução justa", "Triunfo em disputas e julgamentos"],
    pontosAtencao: ["Julgar os outros com crueldade", "Orgulho excessivo ao vencer", "Estresse elevado que afeta a saúde"],
    orientacoesPraticas: "Permaneça dentro da estrita legalidade e da honestidade. A verdade é sua melhor advogada.",
    mensagemReflexao: "A justiça do homem pode falhar por cegueira, mas a lei de causa e efeito nunca erra o endereço."
  },
  13: {
    numero: 13, nome: "Okanran Meji", orixa: "Nanã e Obaluaê", elemento: "Terra", tendenciaPadrao: "AINDA_NAO",
    tituloTendencia: "AINDA NÃO — Exige maturação lenta e muita paciência no tempo certo.",
    caminho: "Caminho da sabedoria ancestral das águas paradas e da terra profunda. Okanran Meji ensina que a fruta não amadurece à força.",
    influenciaEspiritual: "Nanã traz a calma dos anciãos, amaciando o terreno para que a solução venha sem trauma.",
    fatoresFavoraveis: ["Estabilidade a longo prazo", "Decisão definitiva e sem margem para recursos futuros", "Cura de mágoas"],
    pontosAtencao: ["Impaciência que gera desespero", "Querer acelerar processos burocráticos à força", "Melancolia"],
    orientacoesPraticas: "Respeite o tempo dos trâmites. Dedique-se ao seu presente enquanto o tempo trabalha ao seu favor.",
    mensagemReflexao: "A paciência não é espera passiva; é a certeza de que a semente germina no escuro antes de ver o sol."
  },
  14: {
    numero: 14, nome: "Iká", orixa: "Oxumaré", elemento: "Água / Ar", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Ciclo de renovação trazendo flexibilidade e novos caminhos.",
    caminho: "Caminho do arco-íris e da transformação constante. Iká indica que a tempestade passou e a bonança traz novas opções.",
    influenciaEspiritual: "Oxumaré renova a energia do ambiente, transformando perdas aparentes em ganhos reais.",
    fatoresFavoraveis: ["Capacidade de reinvenção", "Atração de novas oportunidades financeiras", "Flexibilidade nas propostas"],
    pontosAtencao: ["Espalhar energia em muitas coisas ao mesmo tempo", "Promessas vagas de terceiros", "Falta de foco"],
    orientacoesPraticas: "Esteja aberto a soluções alternativas que você não havia considerado originalmente.",
    mensagemReflexao: "Após a chuva mais densa, o céu se pinta com as cores da renovação para quem sabe olhar para cima."
  },
  15: {
    numero: 15, nome: "Obeogundá", orixa: "Ewá e Ogum", elemento: "Ar", tendenciaPadrao: "AINDA_NAO",
    tituloTendencia: "AINDA NÃO — Exige discernimento apurado para enxergar entrelinhas.",
    caminho: "Caminho da visão além do alcance e da intuição afiada. Obeogundá adverte contra armadilhas disfarçadas de facilidade.",
    influenciaEspiritual: "Ewá protege os segredos e concede visão de águia para detectar más intenções a distância.",
    fatoresFavoraveis: ["Proteção contra traições espirituais ou materiais", "Estratégia perspicaz", "Descoberta a tempo de falhas"],
    pontosAtencao: ["Desconfiança paranóica sem provas", "Isolamento do mundo", "Nervosismo com o futuro"],
    orientacoesPraticas: "Confie no seu sexto sentido. Se algo parecer estranho ou bom demais para ser verdade, investigue.",
    mensagemReflexao: "O escudo mais forte é a lucidez de enxergar as coisas exatamente como são, sem disfarces."
  },
  16: {
    numero: 16, nome: "Alafia", orixa: "Orunmilá e Oxalá", elemento: "Luz / Ar", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Luz absoluta, paz de espírito, confirmação e vitória plena.",
    caminho: "Caminho da bênção suprema onde todos os búzios se abrem para confirmar a graça e a concordância do oráculo.",
    influenciaEspiritual: "Orunmilá e Oxalá derramam sabedoria e luz branca, dissipando todas as trevas e incertezas.",
    fatoresFavoraveis: ["Harmonia total dos fatores", "Conclusão extremamente favorável", "Proteção e bênçãos divinas continuas"],
    pontosAtencao: ["Acomodação ou descuido na reta final", "Ingenuidade em relação a maus perdedores"],
    orientacoesPraticas: "Agradeça com o coração em paz. Mantenha a conduta elevada e desfrute do resultado em serenidade.",
    mensagemReflexao: "Quando a luz da verdade se acende por completo, a sombra simplesmente deixa de existir."
  }
};

export default function Home() {
  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [oduDiretor, setOduDiretor] = useState(null);
  const [carregandoOdu, setCarregandoOdu] = useState(false);

  const [pacoteSelecionado, setPacoteSelecionado] = useState('PACOTE_5');
  const [pixDados, setPixDados] = useState(null);
  const [gerandoPix, setGerandoPix] = useState(false);
  const [pagamentoAprovado, setPagamentoAprovado] = useState(false);
  const [perguntasRestantes, setPerguntasRestantes] = useState(0);

  const [areaFoco, setAreaFoco] = useState('Trabalho & Finanças');
  const [perguntaText, setPerguntaText] = useState('');
  
  // Estados da Animação Ritualística dos Búzios
  const [faseLancamento, setFaseLancamento] = useState('INICIAL'); // 'INICIAL', 'LANCANDO', 'DESACELERANDO', 'PAUSA_DRAMATICA', 'REVELADO'
  const [resultadoConsulta, setResultadoConsulta] = useState(null);
  const [listaBuziosMesa, setListaBuziosMesa] = useState([]);

  // Cálculo da Numerologia Sagrada dos Odùs (1 a 16)
  const calcularOduNumerologia = (dataStr) => {
    if (!dataStr) return 6;
    const numeros = dataStr.replace(/\D/g, '');
    let soma = numeros.split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    while (soma > 16) {
      soma = soma.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    }
    return soma === 0 ? 1 : soma;
  };

  const handleCalcularOdu = (e) => {
    e.preventDefault();
    if (!dataNasc) return;
    setCarregandoOdu(true);

    setTimeout(() => {
      const numeroOdu = calcularOduNumerologia(dataNasc);
      const oduInfo = ODUS_DATABASE[numeroOdu] || ODUS_DATABASE[6];
      setOduDiretor(oduInfo);
      setCarregandoOdu(false);
    }, 800);
  };

  const handleGerarPix = () => {
    setGerandoPix(true);
    setTimeout(() => {
      const valor = pacoteSelecionado === 'PACOTE_10' ? 39.99 : 25.99;
      setPixDados({
        valor,
        qrCode: "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865405" + valor.toFixed(2) + "5802BR5913Oraculo Odara6009Sao Paulo62070503***6304E2CA",
        perguntas: pacoteSelecionado === 'PACOTE_10' ? 10 : 5
      });
      setGerandoPix(false);
    }, 800);
  };

  const handleSimularAprovacao = () => {
    const qtd = pacoteSelecionado === 'PACOTE_10' ? 10 : 5;
    setPerguntasRestantes(qtd);
    setPagamentoAprovado(true);
  };

  // Gerador de Posições e Física Orgânica dos Búzios
  const gerarCaidaBuziosAnimada = (qtdAbertos) => {
    const buzios = [];
    const totalBuzios = 16;

    // Posições orgânicas finais espalhadas pela Peneira
    const posicoesFinais = [
      { top: '24%', left: '32%', rot: '14deg' }, { top: '22%', left: '52%', rot: '-28deg' },
      { top: '29%', left: '68%', rot: '42deg' }, { top: '39%', left: '22%', rot: '-12deg' },
      { top: '41%', left: '44%', rot: '88deg' }, { top: '37%', left: '62%', rot: '-55deg' },
      { top: '44%', left: '78%', rot: '18deg' }, { top: '57%', left: '26%', rot: '-42deg' },
      { top: '61%', left: '46%', rot: '32deg' }, { top: '56%', left: '66%', rot: '-18deg' },
      { top: '72%', left: '36%', rot: '68deg' }, { top: '74%', left: '56%', rot: '-78deg' },
      { top: '33%', left: '38%', rot: '8deg' },  { top: '66%', left: '64%', rot: '52deg' },
      { top: '51%', left: '34%', rot: '-38deg' }, { top: '49%', left: '54%', rot: '22deg' }
    ];

    for (let i = 0; i < totalBuzios; i++) {
      const eAberto = i < qtdAbertos;
      // Trajetórias e rotações aleatórias intermediárias para simular física de rolar na mesa
      const randomTopOffset = (Math.random() * 30 - 15).toFixed(1);
      const randomLeftOffset = (Math.random() * 30 - 15).toFixed(1);
      const randomRotation = Math.floor(Math.random() * 720 - 360);

      buzios.push({
        id: i + 1,
        aberto: eAberto,
        topFinal: posicoesFinais[i].top,
        leftFinal: posicoesFinais[i].left,
        rotFinal: posicoesFinais[i].rot,
        topMid: `calc(${posicoesFinais[i].top} + ${randomTopOffset}%)`,
        leftMid: `calc(${posicoesFinais[i].left} + ${randomLeftOffset}%)`,
        rotMid: `${randomRotation}deg`
      });
    }

    return buzios.sort(() => Math.random() - 0.5);
  };

  const handleConsultarOraculo = (e) => {
    e.preventDefault();
    if (!perguntaText || perguntasRestantes <= 0 || faseLancamento !== 'INICIAL' && faseLancamento !== 'REVELADO') return;

    // Determina o Odù regente da jogada
    const oduAtual = oduDiretor ? oduDiretor : ODUS_DATABASE[6];
    const buziosAnimados = gerarCaidaBuziosAnimada(oduAtual.numero);

    setListaBuziosMesa(buziosAnimados);
    setResultadoConsulta(null);

    // FLUXO RITUALÍSTICO PASSO A PASSO
    // 1. Início do Movimento/Física (2 segundos)
    setFaseLancamento('LANCANDO');

    setTimeout(() => {
      // 2. Desaceleração Gradual (1 segundo)
      setFaseLancamento('DESACELERANDO');
    }, 2000);

    setTimeout(() => {
      // 3. Pausa Dramática de Suspense (2 segundos - Búzios estáticos na peneira antes do texto)
      setFaseLancamento('PAUSA_DRAMATICA');
    }, 3000);

    setTimeout(() => {
      // 4. Revelação Completa do Texto
      setResultadoConsulta({
        buziosAbertos: oduAtual.numero,
        buziosFechados: 16 - oduAtual.numero,
        odu: oduAtual,
        pergunta: perguntaText,
        area: areaFoco
      });

      setPerguntasRestantes(prev => prev - 1);
      setFaseLancamento('REVELADO');
    }, 5000); // Total de 5s de experiência ritualística
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0b0612', color: '#f3f4f6', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* CSS para Animações e Transições Físicas dos Búzios */}
      <style jsx global>{`
        @keyframes chacoalharPeneira {
          0% { transform: translate(0, 0) scale(1); }
          15% { transform: translate(-6px, 4px) rotate(-2deg); }
          30% { transform: translate(6px, -4px) rotate(2deg); }
          45% { transform: translate(-4px, -3px) rotate(-1deg); }
          60% { transform: translate(4px, 3px) rotate(1deg); }
          75% { transform: translate(-2px, 1px) rotate(-0.5deg); }
          100% { transform: translate(0, 0) scale(1); }
        }

        .peneira-chacoalhando {
          animation: chacoalharPeneira 0.4s infinite ease-in-out;
        }

        .buzio-item {
          transition: all 1.8s cubic-bezier(0.25, 1, 0.5, 1);
        }

        @keyframes pulsarGlow {
          0% { box-shadow: 0 0 15px rgba(245, 158, 11, 0.3); }
          50% { box-shadow: 0 0 30px rgba(245, 158, 11, 0.7); }
          100% { box-shadow: 0 0 15px rgba(245, 158, 11, 0.3); }
        }

        .pausa-dramatica-glow {
          animation: pulsarGlow 1.5s infinite ease-in-out;
        }
      `}</style>

      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        {/* CABEÇALHO */}
        <header style={{ textAlign: 'center', padding: '24px 10px', borderBottom: '1px solid #332147', marginBottom: '24px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '20px', backgroundColor: '#28173d', color: '#fbbf24', fontSize: '13px', fontWeight: 'bold' }}>
            ✨ Oráculo Sagrado dos Orixás & Odùs
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fbbf24', margin: '12px 0 6px 0' }}>
            ORÁCULO ODARA
          </h1>
          <p style={{ color: '#a1a1aa', fontSize: '15px', margin: 0 }}>
            Conecte-se com a sabedoria ancestral através da leitura numerológica dos Odùs e a magia sagrada dos búzios.
          </p>
        </header>

        <main style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* ETAPA 1: ODÙ DIRETOR */}
          <section style={{ backgroundColor: '#150a24', padding: '24px', borderRadius: '16px', border: '1px solid #332147' }}>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>🧭 Etapa 1: Descubra seu Odù Diretor</h2>
              <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '4px 0 0 0' }}>Insira sua data de nascimento para calcular seu regente de vida gratuitamente.</p>
            </div>

            <form onSubmit={handleCalcularOdu} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#d4d4d8', marginBottom: '6px' }}>Seu Nome Completo</label>
                <input
                  type="text"
                  placeholder="Ex: Bernardo Silva"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0b0612', border: '1px solid #332147', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#d4d4d8', marginBottom: '6px' }}>Data de Nascimento</label>
                <input
                  type="date"
                  required
                  value={dataNasc}
                  onChange={(e) => setDataNasc(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0b0612', border: '1px solid #332147', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  type="submit"
                  disabled={carregandoOdu}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#f59e0b', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                >
                  {carregandoOdu ? 'Calculando...' : 'Calcular Odù Diretor'}
                </button>
              </div>
            </form>

            {oduDiretor && (
              <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#1c0f30', border: '1px solid #f59e0b', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fbbf24', textTransform: 'uppercase' }}>Seu Regente Ancestral</span>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '4px 0' }}>
                      Odù #{oduDiretor.numero} - {oduDiretor.nome}
                    </h3>
                  </div>
                  <span style={{ color: '#34d399', fontSize: '13px', fontWeight: 'bold' }}>
                    ✓ Odù Mapeado
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: '#28173d', borderRadius: '20px', fontSize: '12px', color: '#fde68a' }}>Orixá: {oduDiretor.orixa}</span>
                  <span style={{ padding: '4px 12px', backgroundColor: '#28173d', borderRadius: '20px', fontSize: '12px', color: '#fde68a' }}>Elemento: {oduDiretor.elemento}</span>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #332147' }}>
                  <h4 style={{ color: '#fbbf24', fontSize: '15px', fontWeight: 'bold', margin: '0 0 6px 0' }}>📜 O Caminho do seu Odù:</h4>
                  <p style={{ fontSize: '14px', color: '#e4e4e7', lineHeight: '1.6', margin: 0 }}>
                    {oduDiretor.caminho}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* ETAPA 2: PACOTES & PAGAMENTO */}
          {!pagamentoAprovado && (
            <section style={{ backgroundColor: '#150a24', padding: '24px', borderRadius: '16px', border: '1px solid #332147' }}>
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>💳 Etapa 2: Escolha seu Pacote de Consulta</h2>
                <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '4px 0 0 0' }}>Liberado instantaneamente via PIX.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                <div
                  onClick={() => setPacoteSelecionado('PACOTE_5')}
                  style={{
                    cursor: 'pointer',
                    padding: '16px',
                    borderRadius: '12px',
                    border: pacoteSelecionado === 'PACOTE_5' ? '2px solid #f59e0b' : '1px solid #332147',
                    backgroundColor: pacoteSelecionado === 'PACOTE_5' ? '#28173d' : '#0b0612'
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>Pacote Essencial</h3>
                  <p style={{ margin: '4px 0 10px 0', fontSize: '12px', color: '#a1a1aa' }}>5 Perguntas ao Oráculo</p>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>R$ 25,99</span>
                </div>

                <div
                  onClick={() => setPacoteSelecionado('PACOTE_10')}
                  style={{
                    cursor: 'pointer',
                    padding: '16px',
                    borderRadius: '12px',
                    border: pacoteSelecionado === 'PACOTE_10' ? '2px solid #f59e0b' : '1px solid #332147',
                    backgroundColor: pacoteSelecionado === 'PACOTE_10' ? '#28173d' : '#0b0612'
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>Pacote Completo</h3>
                  <p style={{ margin: '4px 0 10px 0', fontSize: '12px', color: '#a1a1aa' }}>10 Perguntas ao Oráculo</p>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>R$ 39,99</span>
                </div>
              </div>

              {!pixDados ? (
                <button
                  onClick={handleGerarPix}
                  disabled={gerandoPix}
                  style={{ width: '100%', padding: '14px', borderRadius: '8px', backgroundColor: '#f59e0b', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                >
                  {gerandoPix ? 'Gerando PIX...' : 'Gerar Pagamento PIX'}
                </button>
              ) : (
                <div style={{ backgroundColor: '#0b0612', padding: '20px', borderRadius: '12px', border: '1px solid #f59e0b', textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#fff' }}>Pagamento PIX Gerado</h3>
                  <p style={{ wordBreak: 'break-all', fontSize: '11px', backgroundColor: '#150a24', padding: '10px', borderRadius: '8px', color: '#fbbf24', border: '1px solid #332147' }}>
                    {pixDados.qrCode}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '14px' }}>
                    <button
                      onClick={() => navigator.clipboard.writeText(pixDados.qrCode)}
                      style={{ padding: '10px 18px', borderRadius: '8px', backgroundColor: '#28173d', color: '#fbbf24', border: '1px solid #f59e0b', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Copiar PIX
                    </button>
                    <button
                      onClick={handleSimularAprovacao}
                      style={{ padding: '10px 18px', borderRadius: '8px', backgroundColor: '#059669', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      🛡️ Confirmar Pagamento & Jogar
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ETAPA 3: MESA SAGRADA DE BÚZIOS */}
          {pagamentoAprovado && (
            <section style={{ backgroundColor: '#150a24', padding: '24px', borderRadius: '16px', border: '1px solid #f59e0b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>🐚 A Mesa Sagrada de Búzios</h2>
                <span style={{ padding: '6px 12px', backgroundColor: '#28173d', borderRadius: '8px', color: '#fbbf24', fontSize: '13px', fontWeight: 'bold' }}>
                  Perguntas Restantes: {perguntasRestantes}
                </span>
              </div>

              <form onSubmit={handleConsultarOraculo} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#d4d4d8', marginBottom: '6px' }}>Área de Foco</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                    {['Trabalho & Finanças', 'Amor & Relacionamentos', 'Saúde & Vitalidade', 'Caminho Espiritual'].map((area) => (
                      <button
                        type="button"
                        key={area}
                        onClick={() => setAreaFoco(area)}
                        style={{
                          padding: '10px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          border: areaFoco === area ? '1px solid #f59e0b' : '1px solid #332147',
                          backgroundColor: areaFoco === area ? '#f59e0b' : '#0b0612',
                          color: areaFoco === area ? '#000' : '#d4d4d8'
                        }}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#d4d4d8', marginBottom: '6px' }}>Sua Pergunta</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Escreva sua dúvida com clareza (Ex: Vou ganhar a causa trabalhista contra minha empresa anterior?)"
                    value={perguntaText}
                    onChange={(e) => setPerguntaText(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0b0612', border: '1px solid #332147', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={faseLancamento !== 'INICIAL' && faseLancamento !== 'REVELADO' || perguntasRestantes <= 0 || !perguntaText}
                  style={{ width: '100%', padding: '14px', borderRadius: '8px', backgroundColor: '#f59e0b', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                >
                  {faseLancamento === 'INICIAL' || faseLancamento === 'REVELADO' ? '🔮 Lançar Búzios na Mesa' : '✨ Conectando aos Orixás...'}
                </button>
              </form>

              {/* EXPERIÊNCIA VISUAL: PENEIRA SAGRADA E FÍSICA DOS BÚZIOS */}
              {faseLancamento !== 'INICIAL' && (
                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                  
                  {/* Status Ritualístico em Tempo Real */}
                  <div style={{ marginBottom: '12px', minHeight: '28px' }}>
                    {faseLancamento === 'LANCANDO' && (
                      <span style={{ color: '#fbbf24', fontSize: '15px', fontWeight: 'bold' }}>
                        🌀 Chacoalhando a peneira e lançando os búzios na mesa...
                      </span>
                    )}
                    {faseLancamento === 'DESACELERANDO' && (
                      <span style={{ color: '#f59e0b', fontSize: '15px', fontWeight: 'bold' }}>
                        🍃 Búzios rolando e encontrando suas posições sagradas...
                      </span>
                    )}
                    {faseLancamento === 'PAUSA_DRAMATICA' && (
                      <span style={{ color: '#34d399', fontSize: '15px', fontWeight: 'bold' }}>
                        ✨ Búzios assentados na mesa... Interpretando a vontade dos Orixás...
                      </span>
                    )}
                    {faseLancamento === 'REVELADO' && (
                      <span style={{ color: '#fbbf24', fontSize: '15px', fontWeight: 'bold' }}>
                        📜 Caída Revelada com Sucesso
                      </span>
                    )}
                  </div>

                  {/* Peneira / Alguidar Sagrado */}
                  <div 
                    className={`
                      ${faseLancamento === 'LANCANDO' ? 'peneira-chacoalhando' : ''}
                      ${faseLancamento === 'PAUSA_DRAMATICA' ? 'pausa-dramatica-glow' : ''}
                    `}
                    style={{
                      width: '100%',
                      maxWidth: '380px',
                      height: '380px',
                      margin: '0 auto',
                      borderRadius: '50%',
                      backgroundColor: '#1c102b',
                      border: '8px solid #b45309',
                      boxShadow: 'inset 0 0 35px rgba(0,0,0,0.85), 0 0 20px rgba(245, 158, 11, 0.25)',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundImage: 'radial-gradient(#2a1742 2px, transparent 2px)',
                      backgroundSize: '16px 16px'
                    }}
                  >
                    {/* Renderização Individual dos 16 Búzios com Animação Físico-Orgânica */}
                    {listaBuziosMesa.map((buzio) => {
                      // Define a posição baseada na fase da animação
                      let currentTop = buzio.topFinal;
                      let currentLeft = buzio.leftFinal;
                      let currentRot = buzio.rotFinal;

                      if (faseLancamento === 'LANCANDO') {
                        currentTop = '45%';
                        currentLeft = '45%';
                        currentRot = buzio.rotMid;
                      } else if (faseLancamento === 'DESACELERANDO') {
                        currentTop = buzio.topMid;
                        currentLeft = buzio.leftMid;
                        currentRot = buzio.rotMid;
                      }

                      return (
                        <div
                          key={buzio.id}
                          className="buzio-item"
                          style={{
                            position: 'absolute',
                            top: currentTop,
                            left: currentLeft,
                            transform: `rotate(${currentRot})`,
                            width: buzio.aberto ? '32px' : '26px',
                            height: buzio.aberto ? '42px' : '36px',
                            borderRadius: '50%',
                            backgroundColor: buzio.aberto ? '#fef3c7' : '#78350f',
                            border: buzio.aberto ? '2px solid #d97706' : '2px solid #451a03',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '2px 4px 6px rgba(0,0,0,0.6)',
                            zIndex: buzio.aberto ? 2 : 1
                          }}
                        >
                          {/* Fenda/Ombro do Búzio se estiver Aberto */}
                          {buzio.aberto ? (
                            <div style={{ width: '8px', height: '24px', backgroundColor: '#b45309', borderRadius: '10px', border: '1px solid #78350f' }} />
                          ) : (
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#451a03' }} />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Legenda de Validação dos Búzios */}
                  {faseLancamento === 'REVELADO' && resultadoConsulta && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '14px', fontSize: '13px' }}>
                      <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>
                        🐚 {resultadoConsulta.buziosAbertos} Abertos
                      </span>
                      <span style={{ color: '#a1a1aa' }}>
                        🌰 {resultadoConsulta.buziosFechados} Fechados
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* LEITURA APROFUNDADA E RESPOSTA OBJETIVA (EXIBIDA SÓ APÓS A PAUSA DRAMÁTICA) */}
              {faseLancamento === 'REVELADO' && resultadoConsulta && (
                <div style={{ marginTop: '24px', backgroundColor: '#0b0612', padding: '24px', borderRadius: '14px', border: '1px solid #f59e0b' }}>
                  
                  {/* Cabeçalho da Revelação */}
                  <div style={{ borderBottom: '1px solid #332147', paddingBottom: '16px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                      <span style={{ fontSize: '12px', color: '#fbbf24', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                        {resultadoConsulta.buziosAbertos} Búzios Abertos na Mesa
                      </span>
                      <span style={{ fontSize: '12px', color: '#a1a1aa', fontStyle: 'italic' }}>
                        Área: {resultadoConsulta.area}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '22px', color: '#fff', margin: '6px 0 0 0', fontWeight: 'bold' }}>
                      Odù {resultadoConsulta.odu.nome} (Regência de {resultadoConsulta.odu.orixa})
                    </h3>
                  </div>

                  {/* BANNER DE RESPOSTA DIRETA (SIM / NÃO / AINDA NÃO) */}
                  <div style={{
                    padding: '16px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    border: '1px solid',
                    backgroundColor: 
                      resultadoConsulta.odu.tendenciaPadrao === 'SIM' ? 'rgba(16, 185, 129, 0.12)' :
                      resultadoConsulta.odu.tendenciaPadrao === 'NAO' ? 'rgba(239, 68, 68, 0.12)' :
                      'rgba(245, 158, 11, 0.12)',
                    borderColor:
                      resultadoConsulta.odu.tendenciaPadrao === 'SIM' ? '#10b981' :
                      resultadoConsulta.odu.tendenciaPadrao === 'NAO' ? '#ef4444' :
                      '#f59e0b'
                  }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#a1a1aa' }}>
                      VEREDITO DO ORÁCULO PARA SUA PERGUNTA
                    </span>
                    <h4 style={{
                      margin: '4px 0 0 0',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: 
                        resultadoConsulta.odu.tendenciaPadrao === 'SIM' ? '#34d399' :
                        resultadoConsulta.odu.tendenciaPadrao === 'NAO' ? '#f87171' :
                        '#fbbf24'
                    }}>
                      🎯 Tendência: {resultadoConsulta.odu.tituloTendencia}
                    </h4>
                  </div>

                  {/* ESTRUTURA COMPLETA E RESPEITOSA DA RESPOSTA */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    {/* 1. Preságio do Oráculo & Pergunta */}
                    <div style={{ backgroundColor: '#150a24', padding: '16px', borderRadius: '10px', borderLeft: '4px solid #f59e0b' }}>
                      <h4 style={{ color: '#fbbf24', margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold' }}>🔮 Preságio do Oráculo para a Pergunta</h4>
                      <p style={{ color: '#d4d4d8', fontSize: '13px', margin: '0 0 10px 0', fontStyle: 'italic', backgroundColor: '#0b0612', padding: '8px 12px', borderRadius: '6px' }}>
                        "{resultadoConsulta.pergunta}"
                      </p>
                      <p style={{ color: '#e4e4e7', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                        {resultadoConsulta.odu.caminho}
                      </p>
                    </div>

                    {/* 2. Influências Espirituais */}
                    <div style={{ backgroundColor: '#150a24', padding: '16px', borderRadius: '10px', borderLeft: '4px solid #a78bfa' }}>
                      <h4 style={{ color: '#a78bfa', margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold' }}>🕊️ Influências Espirituais Associadas</h4>
                      <p style={{ color: '#e4e4e7', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                        {resultadoConsulta.odu.influenciaEspiritual}
                      </p>
                    </div>

                    {/* 3. Fatores Favoráveis */}
                    <div style={{ backgroundColor: '#150a24', padding: '16px', borderRadius: '10px', borderLeft: '4px solid #34d399' }}>
                      <h4 style={{ color: '#34d399', margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold' }}>✨ Fatores Favoráveis</h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#e4e4e7', fontSize: '14px', lineHeight: '1.6' }}>
                        {resultadoConsulta.odu.fatoresFavoraveis.map((item, idx) => (
                          <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* 4. Pontos de Atenção */}
                    <div style={{ backgroundColor: '#150a24', padding: '16px', borderRadius: '10px', borderLeft: '4px solid #f87171' }}>
                      <h4 style={{ color: '#f87171', margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold' }}>⚠️ Pontos de Atenção & Alertas</h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#e4e4e7', fontSize: '14px', lineHeight: '1.6' }}>
                        {resultadoConsulta.odu.pontosAtencao.map((item, idx) => (
                          <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* 5. Orientações Práticas */}
                    <div style={{ backgroundColor: '#150a24', padding: '16px', borderRadius: '10px', borderLeft: '4px solid #38bdf8' }}>
                      <h4 style={{ color: '#38bdf8', margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold' }}>🛠️ Orientações Práticas para o Consulente</h4>
                      <p style={{ color: '#e4e4e7', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                        {resultadoConsulta.odu.orientacoesPraticas}
                      </p>
                    </div>

                    {/* 6. Mensagem Final de Reflexão */}
                    <div style={{ backgroundColor: '#1c0f30', padding: '16px', borderRadius: '10px', border: '1px solid #f59e0b', textAlign: 'center', marginTop: '8px' }}>
                      <h4 style={{ color: '#fbbf24', margin: '0 0 6px 0', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>💬 Sabedoria Ancestral</h4>
                      <p style={{ color: '#fde68a', fontSize: '14px', fontStyle: 'italic', margin: 0, lineHeight: '1.5' }}>
                        "{resultadoConsulta.odu.mensagemReflexao}"
                      </p>
                    </div>

                  </div>
                </div>
              )}

            </section>
          )}

        </main>
      </div>
    </div>
  );
}
