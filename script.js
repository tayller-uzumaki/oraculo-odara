// Banco de Dados Sagrado dos 16 Odùs
const ODUS_DATABASE = {
  1: {
    numero: 1, nome: "Okaran", orixa: "Exu", elemento: "Fogo", tendenciaPadrao: "NAO",
    tituloTendencia: "NÃO — Há forte turbulência e risco de conflitos.",
    caminho: "Caminho da transformação rápida através do confronto de verdades. Okaran alerta para não forçar portas fechadas sem antes limpar os caminhos.",
    influenciaEspiritual: "Exu atua trazendo movimento veloz, desmascarando intenções ocultas e cobrando disciplina.",
    fatoresFavoraveis: ["Agilidade para corrigir erros do passado", "Coragem para cortar laços tóxicos", "Capacidade de recomeçar do zero"],
    pontosAtencao: ["Evitar discussões por impulso", "Cuidado com orgulho e teimosia", "Não agir sob efeito da raiva"],
    orientacoesPraticas: "Coloque os pés na terra, mantenha a calma e evite tomar decisões precipitadas nas próximas 72 horas.",
    mensagemReflexao: "Nem toda porta que se fecha é uma perda; muitas vezes é o universo impedindo você de entrar onde não há luz."
  },
  2: {
    numero: 2, nome: "Ejioko", orixa: "Ibejis e Ogum", elemento: "Ar", tendenciaPadrao: "AINDA_NAO",
    tituloTendencia: "AINDA NÃO — A decisão depende de negociações e acordos pendentes.",
    caminho: "Caminho da dualidade e da busca por alianças justas. Ejioko indica que dois caminhos estão abertos e que a pressa pode prejudicar.",
    influenciaEspiritual: "Os Ibejis trazem a surpresa, enquanto Ogum exige postura firme na defesa dos seus direitos.",
    fatoresFavoraveis: ["Boa receptividade para acordos", "Apoio de parcerias chave", "Intuição afiada para perceber blefes"],
    pontosAtencao: ["Indecisão que paralisa", "Dependência excessiva da opinião alheia", "Medo de se posicionar"],
    orientacoesPraticas: "Busque auxílio neutro ou técnico. Analise todas as cláusulas antes de dar o próximo passo.",
    mensagemReflexao: "A dúvida é a pausa necessária para que a sabedoria tome o lugar do impulso."
  },
  3: {
    numero: 3, nome: "Etaogundá", orixa: "Ogum", elemento: "Terra", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Vitória alcançada através do combate justo e da persistência.",
    caminho: "Caminho do guerreiro incansável. Etaogundá promete o triunfo para quem não recua diante das batalhas difíceis.",
    influenciaEspiritual: "Ogum quebra correntes de injustiça e abre caminhos à força para quem age com retidão.",
    fatoresFavoraveis: ["Provas e argumentos sólidos ao seu favor", "Força de vontade inabalável", "Proteção contra manobras desleais"],
    pontosAtencao: ["Excesso de agressividade nas palavras", "Exhaustão física e mental", "Teimosia em detalhes irrelevantes"],
    orientacoesPraticas: "Mantenha o foco absoluto nos fatos concretos. Não gaste energia com provações emocionais.",
    mensagemReflexao: "As espadas da justiça cortam os nós que o medo deu no seu caminho."
  },
  4: {
    numero: 4, nome: "Irosun", orixa: "Iemanjá e Oxossi", elemento: "Terra", tendenciaPadrao: "AINDA_NAO",
    tituloTendencia: "AINDA NÃO — Há verdades ocultas que precisam emergir primeiro.",
    caminho: "Caminho da prudência e do olhar atento. Irosun pede paciência para que a névoa se desfaça antes do veredito.",
    influenciaEspiritual: "Iemanjá acalma as águas da ansiedade e Oxóssi mira com precisão no momento exato do movimento.",
    fatoresFavoraveis: ["Intuição apurada para farejar armadilhas", "Proteção ancestral silenciosa", "Descoberta de fatos importantes"],
    pontosAtencao: ["Ilusões e falsas promessas", "Cegueira emocional diante da realidade", "Confiar em quem fala demais"],
    orientacoesPraticas: "Silencie seus planos. Não conte vitória antes da hora e guarde os detalhes sob reserva absoluta.",
    mensagemReflexao: "A calma da água esconde a profundidade do oceano; seja calmo por fora e firme por dentro."
  },
  5: {
    numero: 5, nome: "Oxê", orixa: "Oxum", elemento: "Água", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Favorável, trazendo renovação, prosperidade e encerramento doce.",
    caminho: "Caminho do brilho e da fartura reconquistada. Oxê indica que o sofrimento está dando lugar à colheita merecida.",
    influenciaEspiritual: "Oxum envolve a questão com diplomacia, doçura e atração de abundância.",
    fatoresFavoraveis: ["Magnetismo e poder de persuasão elevados", "Flexibilidade para contornar obstáculos", "Ganho ou reparação justa"],
    pontosAtencao: ["Gasto de energia com intrigas", "Vaidade e desatenção aos detalhes", "Inconstância nos compromissos"],
    orientacoesPraticas: "Cuide da sua energia e do seu bem-estar. Mantenha a postura serena para atrair abundância.",
    mensagemReflexao: "A água doce do rio sempre encontra o caminho para o mar, superando qualquer rocha."
  },
  6: {
    numero: 6, nome: "Obará", orixa: "Xangô e Oxóssi", elemento: "Ar / Terra", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Tendência altamente favorável, com prosperidade e triunfo justo.",
    caminho: "Obará é o Odù da grande virada de chave. Representa a superação da humilhação e a conquista da honra e da fartura.",
    influenciaEspiritual: "Xangô aplica o machado da justiça equilibrada e Oxóssi garante que a flecha alcance a fartura.",
    fatoresFavoraveis: ["Reconhecimento do seu direito legítimo", "Clareza nos argumentos", "Abertura substancial de caminhos"],
    pontosAtencao: ["Excesso de vaidade ou ostentação", "Falar sobre a conquista antes da hora", "Orgulho elevado"],
    orientacoesPraticas: "Mantenha a postura íntegra. Mantenha o foco no seu objetivo e preserve o silêncio.",
    mensagemReflexao: "Aquele que já esteve na poeira conhece o valor de caminhar no topo com humildade."
  },
  7: {
    numero: 7, nome: "Odi", orixa: "Obaluaê e Oxalufã", elemento: "Terra", tendenciaPadrao: "AINDA_NAO",
    tituloTendencia: "AINDA NÃO — Exige resistência e encerramento definitivo de velhos ciclos.",
    caminho: "Caminho do renascimento duro mas duradouro. Odi mostra que para o novo entrar, as dívidas e amarras do passado precisam ser zeradas.",
    influenciaEspiritual: "Obaluaê limpa as impurezas e feridas antigas, garantindo que o chão reconstruído seja inabalável.",
    fatoresFavoraveis: ["Firmeza para suportar a pressão final", "Capacidade de resiliência e paciência", "Cura de injustiças antigas"],
    pontosAtencao: ["Apegos ao passado ou ressentimentos", "Rigidez excessiva", "Pessimismo nos momentos de espera"],
    orientacoesPraticas: "Desapegue das frustrações anteriores. Faça uma limpeza energética no seu espaço e organize pendências.",
    mensagemReflexao: "O carvão sob extrema pressão e tempo é o que se transforma em diamante."
  },
  8: {
    numero: 8, nome: "Ejionile", orixa: "Oxaguiã / Oxalá", elemento: "Ar", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Vitória garantida pela sabedoria, ética e estratégia pacífica.",
    caminho: "Caminho da liderança elevada e da vitória da razão sobre o caos. Ejionile traz a paz que sucede a tempestade.",
    influenciaEspiritual: "Oxaguiã sopra clareza mental e estratégia limpa, derrubando acusações infundadas.",
    fatoresFavoraveis: ["Razão e ética ao seu lado", "Clareza mental absoluta", "Respeito dos decisores"],
    pontosAtencao: ["Ansiedade e excesso de pensamentos", "Perfeccionismo sufocante", "Impaciência com o ritmo alheio"],
    orientacoesPraticas: "Mantenha a calma. Evite conflitos acalorados e use a lógica como sua principal aliada.",
    mensagemReflexao: "A paz não é a ausência de guerra, é a presença do domínio sobre a própria mente."
  },
  9: {
    numero: 9, nome: "Osa", orixa: "Oyá (Iansã) e Yemanja", elemento: "Fogo / Água", tendenciaPadrao: "AINDA_NAO",
    tituloTendencia: "AINDA NÃO — Ventos de mudança repentina podem alterar o rumo do processo.",
    caminho: "Caminho da tempestade que varre o que está ultrapassado. Osa exige flexibilidade para se adaptar às guinadas.",
    influenciaEspiritual: "Iansã traz a força do vento, cortando amarras e movimentando o que estava estagnado.",
    fatoresFavoraveis: ["Mudança rápida do cenário a seu favor", "Coragem para inovar", "Forte proteção contra falsos aliados"],
    pontosAtencao: ["Falta de foco e inquietação", "Ações movidas por explosões emocionais", "Agir sem planejar"],
    orientacoesPraticas: "Não tome decisões cruciais sob forte emoção. Respire e aguarde a poeira baixar.",
    mensagemReflexao: "O vento forte derruba árvores de raízes rasas, mas apenas dobra as que são flexíveis."
  },
  10: {
    numero: 10, nome: "Ofun", orixa: "Oxalá", elemento: "Ar", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Solução abençoada pela sabedoria superior e respeito à verdade.",
    caminho: "Caminho da bênção dos anciãos e da pureza de propósitos. Ofun concede a vitória aos que agem de boa-fé.",
    influenciaEspiritual: "Oxalá estende sua proteção, afastando falsidades e desonestidades.",
    fatoresFavoraveis: ["Autoridade moral inquestionável", "Proteção espiritual elevada", "Solução honrosa do conflito"],
    pontosAtencao: ["Evitar atitudes prepotentes", "Não violar princípios éticos", "Isolamento"],
    orientacoesPraticas: "Agradeça às suas forças protetoras e mantenha a intenção pura em cada passo.",
    mensagemReflexao: "A verdade pode tardar em ser ouvida, mas quando fala, o silêncio respeitoso se impõe."
  },
  11: {
    numero: 11, nome: "Owonrin", orixa: "Exu e Oyá", elemento: "Fogo", tendenciaPadrao: "NAO",
    tituloTendencia: "NÃO — Cuidado com reviravoltas inesperadas ou imprevistos de última hora.",
    caminho: "Caminho do imprevisível e do aprendizado rápido. Owonrin avisa que o cenário pode mudar de posição de repente.",
    influenciaEspiritual: "Exu e Oyá cobram atenção redobrada com papéis, conversas e prazos.",
    fatoresFavoraveis: ["Capacidade de reação rápida a emergências", "Criatividade para encontrar saídas"],
    pontosAtencao: ["Desorganização ou perda de prazos", "Confiar em promessas informais", "Falta de atenção"],
    orientacoesPraticas: "Confirme dados, contratos e acordos duas vezes. A prevenção garantirá sua segurança.",
    mensagemReflexao: "Quando o vento muda de direção, o navegador inteligente ajusta as velas."
  },
  12: {
    numero: 12, nome: "Ejilaxeborá", orixa: "Xangô", elemento: "Fogo", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Justiça plena, rigorosa e indiscutível.",
    caminho: "Caminho da balança exata e do tribunal divino. Ejilaxeborá traz o julgamento imparcial onde a verdade prevalece.",
    influenciaEspiritual: "Xangô reina supremo nesta caída, pesando os fatos com rigor absoluto.",
    fatoresFavoraveis: ["Provas irrefutáveis ao seu favor", "Sentença ou resolução justa", "Triunfo em disputas"],
    pontosAtencao: ["Julgar os outros com rigor excessivo", "Orgulho ao vencer", "Estresse elevado"],
    orientacoesPraticas: "Permaneça estritamente dentro da verdade. A honestidade é sua maior garantia.",
    mensagemReflexao: "A justiça humana pode falhar por cegueira, mas a lei de causa e efeito nunca erra."
  },
  13: {
    numero: 13, nome: "Okanran Meji", orixa: "Nanã e Obaluaê", elemento: "Terra", tendenciaPadrao: "AINDA_NAO",
    tituloTendencia: "AINDA NÃO — Exige maturação lenta e muita paciência no tempo certo.",
    caminho: "Caminho da sabedoria ancestral da terra profunda. Ensina que frutos não amadurecem à força.",
    influenciaEspiritual: "Nanã traz a calma dos anciãos, preparando o terreno para que a solução venha sem trauma.",
    fatoresFavoraveis: ["Estabilidade a longo prazo", "Decisão definitiva e sólida", "Cura de mágoas"],
    pontosAtencao: ["Impaciência que gera angústia", "Querer acelerar processos burocráticos à força", "Melancolia"],
    orientacoesPraticas: "Respeite o tempo natural dos trâmites. Cuide dos afazeres do presente.",
    mensagemReflexao: "A paciência é a certeza de que a semente germina no escuro antes de ver a luz."
  },
  14: {
    numero: 14, nome: "Iká", orixa: "Oxumaré", elemento: "Água / Ar", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Ciclo de renovação trazendo flexibilidade e novos caminhos.",
    caminho: "Caminho do arco-íris e da transformação constante. Iká indica que a tempestade passou e traz novas opções.",
    influenciaEspiritual: "Oxumaré renova a energia do ambiente, transformando perdas aparentes em ganhos reais.",
    fatoresFavoraveis: ["Capacidade de reinvenção", "Atração de novas oportunidades", "Flexibilidade nas propostas"],
    pontosAtencao: ["Espalhar energia em muitas coisas", "Promessas vagas de terceiros", "Falta de foco"],
    orientacoesPraticas: "Esteja aberto a caminhos e alternativas que você não havia considerado no início.",
    mensagemReflexao: "Após a chuva mais densa, o céu se pinta com as cores da renovação."
  },
  15: {
    numero: 15, nome: "Obeogundá", orixa: "Ewá e Ogum", elemento: "Ar", tendenciaPadrao: "AINDA_NAO",
    tituloTendencia: "AINDA NÃO — Exige discernimento apurado para enxergar as entrelinhas.",
    caminho: "Caminho da visão além do alcance e da intuição afiada. Adverte contra armadilhas disfarçadas de facilidade.",
    influenciaEspiritual: "Ewá protege os segredos e concede percepção para detectar más intenções a distância.",
    fatoresFavoraveis: ["Proteção contra traições", "Estratégia perspicaz", "Descoberta a tempo de falhas"],
    pontosAtencao: ["Desconfiança paranóica", "Isolamento excessivo", "Inquietação quanto ao futuro"],
    orientacoesPraticas: "Confie na sua percepção interior. Se algo parecer bom demais para ser verdade, investigue.",
    mensagemReflexao: "O escudo mais forte é a lucidez de enxergar as coisas exatamente como são."
  },
  16: {
    numero: 16, nome: "Alafia", orixa: "Orunmilá e Oxalá", elemento: "Luz / Ar", tendenciaPadrao: "SIM",
    tituloTendencia: "SIM — Luz absoluta, paz de espírito, confirmação e vitória plena.",
    caminho: "Caminho da bênção suprema onde todos os búzios se abrem para confirmar a graça do oráculo.",
    influenciaEspiritual: "Orunmilá e Oxalá derramam sabedoria e luz, dissipando todas as trevas e incertezas.",
    fatoresFavoraveis: ["Harmonia total dos fatores", "Conclusão extremamente favorável", "Proteção e bênçãos contínuas"],
    pontosAtencao: ["Acomodação ou descuido na reta final", "Ingenuidade diante do ambiente"],
    orientacoesPraticas: "Agradeça com o coração sereno. Mantenha a postura elevada e desfrute da conquista.",
    mensagemReflexao: "Quando a luz da verdade se acende por completo, a sombra simplesmente deixa de existir."
  }
};

let oduDiretorAtual = null;
let perguntasRestantes = 0;
let pacoteAtivo = { qtd: 5, valor: 25.99 };

// Calculadora de Odù por Data de Nascimento
function calcularOduNumerologia(dataStr) {
  if (!dataStr) return 6;
  const numeros = dataStr.replace(/\D/g, '');
  let soma = numeros.split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  while (soma > 16) {
    soma = soma.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }
  return soma === 0 ? 1 : soma;
}

// Handler da Etapa 1
document.getElementById('form-odu')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const dataInput = document.getElementById('dataNasc').value;
  if (!dataInput) return;

  const btn = document.getElementById('btn-calc-odu');
  btn.innerText = 'Calculando...';

  setTimeout(() => {
    const numOdu = calcularOduNumerologia(dataInput);
    oduDiretorAtual = ODUS_DATABASE[numOdu] || ODUS_DATABASE[6];

    document.getElementById('odu-numero').innerText = oduDiretorAtual.numero;
    document.getElementById('odu-nome').innerText = oduDiretorAtual.nome;
    document.getElementById('odu-orixa').innerText = oduDiretorAtual.orixa;
    document.getElementById('odu-elemento').innerText = oduDiretorAtual.elemento;
    document.getElementById('odu-caminho').innerText = oduDiretorAtual.caminho;

    document.getElementById('resultado-odu').style.display = 'block';
    btn.innerText = 'Calcular Odù Diretor';
  }, 800);
});

// Handler da Etapa 2 (Pacotes)
function selecionarPacote(qtd, valor) {
  pacoteAtivo = { qtd, valor };
  document.getElementById('pacote-5').classList.toggle('active', qtd === 5);
  document.getElementById('pacote-10').classList.toggle('active', qtd === 10);
}

function gerarPix() {
  const container = document.getElementById('area-pix');
  const qrSimulado = "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865405" + pacoteAtivo.valor.toFixed(2) + "5802BR5913Oraculo Odara";

  container.innerHTML = `
    <div style="background: #0b0612; padding: 16px; border-radius: 8px; border: 1px solid #f59e0b; text-align: center;">
      <p style="color: #fff; font-size: 14px; margin-bottom: 8px;">Copia e Cola PIX (R$ ${pacoteAtivo.valor.toFixed(2)}):</p>
      <input type="text" value="${qrSimulado}" readonly style="width: 100%; padding: 8px; font-size: 11px; background: #150a24; color: #fbbf24; border: 1px solid #332147; border-radius: 4px; margin-bottom: 12px;" />
      <button onclick="confirmarPagamento()" class="btn-primary" style="background: #059669; color: #fff;">🛡️ Simular Pagamento Aprovado</button>
    </div>
  `;
}

function confirmarPagamento() {
  perguntasRestantes = pacoteAtivo.qtd;
  document.getElementById('qtd-perguntas').innerText = perguntasRestantes;
  document.getElementById('secao-jogada').style.display = 'block';
  document.getElementById('secao-jogada').scrollIntoView({ behavior: 'smooth' });
}

// Gerador de Búzios Anatômicos em SVG
function criarBuzioSVG(eAberto) {
  if (eAberto) {
    // Búzio Aberto: Fresta serrilhada realista com iluminação central
    return `
      <svg viewBox="0 0 50 70" width="100%" height="100%">
        <defs>
          <radialGradient id="gradAberto" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="60%" stop-color="#fef3c7"/>
            <stop offset="100%" stop-color="#d97706"/>
          </radialGradient>
        </defs>
        <!-- Coroa/Corpo exterior da concha -->
        <path d="M25 2 C 42 2, 48 18, 47 35 C 46 52, 38 68, 25 68 C 12 68, 4 52, 3 35 C 2 18, 8 2, 25 2 Z" fill="url(#gradAberto)" stroke="#78350f" stroke-width="1.5"/>
        <!-- Fresta Serrilhada Interior -->
        <path d="M25 10 C 22 18, 22 52, 25 60 C 28 52, 28 18, 25 10 Z" fill="#451a03"/>
        <!-- Dentes da fresta -->
        <path d="M22 18 L25 19 L22 23 L25 24 L22 28 L25 29 L22 33 L25 34 L22 38 L25 39 L22 43 L25 44 L22 48 L25 49" stroke="#fef3c7" stroke-width="1" fill="none"/>
        <path d="M28 18 L25 19 L28 23 L25 24 L28 28 L25 29 L28 33 L25 34 L28 38 L25 39 L28 43 L25 44 L28 48 L25 49" stroke="#fef3c7" stroke-width="1" fill="none"/>
      </svg>
    `;
  } else {
    // Búzio Fechado: Concha curvada e lisa com reflexo
    return `
      <svg viewBox="0 0 50 70" width="100%" height="100%">
        <defs>
          <radialGradient id="gradFechado" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#d97706"/>
            <stop offset="50%" stop-color="#78350f"/>
            <stop offset="100%" stop-color="#270e03"/>
          </radialGradient>
        </defs>
        <path d="M25 3 C 41 3, 47 19, 46 35 C 45 51, 37 67, 25 67 C 13 67, 5 51, 4 35 C 3 19, 9 3, 25 3 Z" fill="url(#gradFechado)" stroke="#1c1917" stroke-width="1.5"/>
        <!-- Linha da lombada da concha -->
        <path d="M25 6 C 29 20, 29 50, 25 64" stroke="#fef3c7" stroke-width="1" stroke-dasharray="2 3" opacity="0.4" fill="none"/>
      </svg>
    `;
  }
}

// Gerador de Interpretação Fluida e Profunda
function gerarInterpretacaoProfunda(pergunta, area, odu, abertos) {
  const totalFechados = 16 - abertos;
  
  let textoInterpretacao = "";
  if (odu.tendenciaPadrao === "SIM") {
    textoInterpretacao = `Ao analisar sua questão na área de <strong>${area}</strong> ("<em>${pergunta}</em>"), a caída de <strong>${abertos} búzios abertos</strong> traz a regência direta do Odù <strong>${odu.nome}</strong>, emitindo uma vibração de forte confirmação. A energia de ${odu.orixa} atua abrindo caminhos concretos para que sua busca alcance o êxito desejado. Este momento exige que você mantenha a postura firme, aproveitando o impulso de força favorável para agilizar decisões que antes pareciam paradas.`;
  } else if (odu.tendenciaPadrao === "AINDA_NAO") {
    textoInterpretacao = `Diante da sua consulta sobre <strong>${area}</strong> ("<em>${pergunta}</em>"), a mesa revelou <strong>${abertos} búzios abertos e ${totalFechados} fechados</strong> sob a regência de <strong>${odu.nome}</strong>. O oráculo indica que o resultado final ainda está em gestação e depende da resolução de pontas soltas ou amarras antigas. A influência espiritual de ${odu.orixa} recomenda paciência estratégica: não force respostas antes da hora, pois verdades cruciais e detalhes ocultos emergirão nos próximos dias para dar a você a segurança necessária.`;
  } else {
    textoInterpretacao = `Para a sua indagação em <strong>${area}</strong> ("<em>${pergunta}</em>"), a configuração dos búzios revelou a forte presença do Odù <strong>${odu.nome}</strong> (${abertos} abertos / ${totalFechados} fechados). O oráculo sinaliza uma tendência de cautela e atenção redobrada. Sob o olhar de ${odu.orixa}, este é um alerta sagrado para não dar passos no escuro ou agir impulsionado por ansiedade. Recue um passo, revise acertos e contratos e proteja seus planos do ambiente externo antes de avançar.`;
  }

  return textoInterpretacao;
}

// Handler da Jogada de Búzios (Etapa 3)
document.getElementById('form-consulta')?.addEventListener('submit', function (e) {
  e.preventDefault();
  if (perguntasRestantes <= 0) {
    alert("Seu saldo de perguntas acabou. Adquira um novo pacote!");
    return;
  }

  const pergunta = document.getElementById('pergunta').value;
  const area = document.getElementById('area-foco').value;
  const btn = document.getElementById('btn-jogar');
  btn.disabled = true;

  const mesa = document.getElementById('mesa-buzios');
  const peneira = document.getElementById('peneira');
  const status = document.getElementById('status-jogo');
  
  mesa.style.display = 'block';
  peneira.innerHTML = '';
  document.getElementById('resultado-leitura').style.display = 'none';

  // Sorteia a quantidade de búzios abertos (1 a 16)
  const numAbertos = Math.floor(Math.random() * 16) + 1;
  const oduJogo = ODUS_DATABASE[numAbertos];

  // Renderiza os 16 Búzios na Peneira com animação
  for (let i = 0; i < 16; i++) {
    const eAberto = i < numAbertos;
    const buzioEl = document.createElement('div');
    buzioEl.className = 'buzio';
    buzioEl.innerHTML = criarBuzioSVG(eAberto);
    
    // Posições orgânicas espalhadas no círculo
    const top = Math.floor(Math.random() * 65 + 15);
    const left = Math.floor(Math.random() * 65 + 15);
    const rot = Math.floor(Math.random() * 360);

    buzioEl.style.top = `${top}%`;
    buzioEl.style.left = `${left}%`;
    buzioEl.style.transform = `rotate(${rot}deg)`;
    peneira.appendChild(buzioEl);
  }

  status.innerText = "Chacoalhando a peneira e invocando as forças dos Orixás...";

  setTimeout(() => {
    status.innerText = "Lendo a posição dos búzios e interpretando os Odùs...";
  }, 1800);

  setTimeout(() => {
    perguntasRestantes--;
    document.getElementById('qtd-perguntas').innerText = perguntasRestantes;

    const textoInterpretacao = gerarInterpretacaoProfunda(pergunta, area, oduJogo, numAbertos);
    const resContainer = document.getElementById('resultado-leitura');
    
    resContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #332147; padding-bottom: 8px;">
        <span class="tag-gold">🐚 ${numAbertos} Búzios Abertos / ${16 - numAbertos} Fechados</span>
        <span style="font-size: 12px; color: #a1a1aa;">Área: <strong>${area}</strong></span>
      </div>

      <h3 style="color: #fbbf24; font-size: 20px; margin-bottom: 4px;">Odù ${oduJogo.nome} (Regência de ${oduJogo.orixa})</h3>
      
      <div style="background: #28173d; padding: 12px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 14px 0;">
        <span style="font-size: 11px; color: #fbbf24; font-weight: bold; text-transform: uppercase; display: block; margin-bottom: 2px;">Veredito do Oráculo</span>
        <strong style="color: #fff; font-size: 15px;">${oduJogo.tituloTendencia}</strong>
      </div>

      <div style="margin: 16px 0; line-height: 1.6; color: #e4e4e7; font-size: 14px; background: #0b0612; padding: 14px; border-radius: 8px; border: 1px solid #332147;">
        <span style="color: #fbbf24; font-weight: bold; display: block; margin-bottom: 6px;">📖 Leitura Oracular Personalizada:</span>
        <p>${textoInterpretacao}</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-top: 14px;">
        <div style="background: #150a24; padding: 12px; border-radius: 8px; border: 1px solid #332147;">
          <h4 style="color: #34d399; font-size: 13px; margin-bottom: 6px;">✨ Fatores Favoráveis</h4>
          <ul style="font-size: 12px; color: #a1a1aa; padding-left: 16px;">
            ${oduJogo.fatoresFavoraveis.map(f => `<li style="margin-bottom: 4px;">${f}</li>`).join('')}
          </ul>
        </div>
        <div style="background: #150a24; padding: 12px; border-radius: 8px; border: 1px solid #332147;">
          <h4 style="color: #f87171; font-size: 13px; margin-bottom: 6px;">⚠️ Alertas & Cuidados</h4>
          <ul style="font-size: 12px; color: #a1a1aa; padding-left: 16px;">
            ${oduJogo.pontosAtencao.map(p => `<li style="margin-bottom: 4px;">${p}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid #332147; font-size: 13px; color: #fde68a; font-style: italic; text-align: center;">
        "${oduJogo.mensagemReflexao}"
      </div>
    `;

    resContainer.style.display = 'block';
    resContainer.scrollIntoView({ behavior: 'smooth' });
    btn.disabled = false;
    status.innerText = "Leitura concluída com sucesso!";
  }, 3500);
});
