// Banco de Dados Sagrado dos 16 Odùs
const ODUS_DATABASE = {
  1: {
    numero: 1, nome: "Okaran", orixa: "Exu", elemento: "Fogo", tendenciaPadrao: "NÃO",
    favorabilidade: 25,
    tituloTendencia: "❌ Tendência: NÃO — Os búzios indicam turbulência ou bloqueio temporário.",
    caminho: "Caminho da transformação rápida através do confronto de verdades. Okaran alerta para não forçar portas fechadas sem antes limpar os caminhos.",
    influenciaEspiritual: "Exu atua trazendo movimento veloz, desmascarando intenções ocultas e cobrando disciplina e clareza absoluta.",
    fatoresFavoraveis: ["Agilidade para corrigir erros", "Coragem para cortar laços nocivos", "Capacidade de recomeçar"],
    pontosAtencao: ["Evitar discussões impulsivas", "Cuidado com teimosia", "Não agir movido pela raiva"],
    orientacoesPraticas: "Mantenha a calma, coloque os pés no chão e evite tomar decisões precipitadas nas próximas 72 horas.",
    sabedoriaAncestral: "Nem toda porta fechada é uma perda; muitas vezes é o universo impedindo você de entrar onde não há luz.",
    resumoFinal: "Cenário desfavorável para avançar agora. O momento pede recuo, proteção e paciência."
  },
  2: {
    numero: 2, nome: "Ejioko", orixa: "Ibejis e Ogum", elemento: "Ar", tendenciaPadrao: "AINDA NÃO",
    favorabilidade: 48,
    tituloTendencia: "⏳ Tendência: AINDA NÃO — A decisão depende de negociações e acordos pendentes.",
    caminho: "Caminho da dualidade e da busca por alianças justas. Ejioko indica que dois caminhos estão abertos e a pressa pode prejudicar.",
    influenciaEspiritual: "Os Ibejis trazem a surpresa e a renovação, enquanto Ogum exige postura firme na defesa dos seus direitos legítimos.",
    fatoresFavoraveis: ["Receptividade para acordos", "Apoio de parcerias estratégicas", "Intuição para perceber intenções"],
    pontosAtencao: ["Indecisão paralisante", "Dependência da opinião alheia", "Medo de posicionamento"],
    orientacoesPraticas: "Busque auxílio técnico ou neutro. Analise todas as cláusulas e opções antes de dar o próximo passo.",
    sabedoriaAncestral: "A dúvida é a pausa necessária para que a sabedoria tome o lugar da impulsividade.",
    resumoFinal: "Resultado em aberto. Ajuste os termos e aguarde novas informações antes de se comprometer."
  },
  3: {
    numero: 3, nome: "Etaogundá", orixa: "Ogum", elemento: "Terra", tendenciaPadrao: "SIM",
    favorabilidade: 82,
    tituloTendencia: "✅ Tendência: SIM — Vitória alcançada através do combate justo e da persistência.",
    caminho: "Caminho do guerreiro incansável. Etaogundá promete o triunfo para quem não recua diante das batalhas difíceis.",
    influenciaEspiritual: "Ogum quebra correntes de injustiça, abrindo caminhos à força para quem age com verdade e retidão.",
    fatoresFavoraveis: ["Provas e argumentos sólidos ao seu favor", "Força de vontade inabalável", "Proteção contra manobras desleais"],
    pontosAtencao: ["Agressividade nas palavras", "Exhaustão física", "Teimosia em detalhes menores"],
    orientacoesPraticas: "Mantenha foco absoluto nos fatos concretos. Não gaste energia com provações emocionais.",
    sabedoriaAncestral: "As espadas da justiça cortam os nós que o medo tentou dar no seu caminho.",
    resumoFinal: "Cenário altamente positivo. Avance com determinação e sem medo."
  },
  4: {
    numero: 4, nome: "Irosun", orixa: "Iemanjá e Oxossi", elemento: "Terra", tendenciaPadrao: "AINDA NÃO",
    favorabilidade: 40,
    tituloTendencia: "⏳ Tendência: AINDA NÃO — Há verdades ocultas que precisam emergir primeiro.",
    caminho: "Caminho da prudência e do olhar atento. Irosun pede paciência para que a névoa se desfaça antes do veredito.",
    influenciaEspiritual: "Iemanjá acalma as águas da ansiedade e Oxóssi mira com precisão no momento exato de agir.",
    fatoresFavoraveis: ["Intuição apurada para farejar armadilhas", "Proteção ancestral silenciosa", "Descoberta de fatos importantes"],
    pontosAtencao: ["Ilusões e falsas promessas", "Cegueira emocional diante da realidade", "Confiar em quem fala demais"],
    orientacoesPraticas: "Silencie seus planos. Não conte vitória antes da hora e guarde os detalhes sob reserva absoluta.",
    sabedoriaAncestral: "A calma da água esconde a profundidade do oceano; seja calmo por fora e firme por dentro.",
    resumoFinal: "Aguarde a névoa baixar. O tempo revelará os detalhes que faltam para sua decisão."
  },
  5: {
    numero: 5, nome: "Oxê", orixa: "Oxum", elemento: "Água", tendenciaPadrao: "SIM",
    favorabilidade: 88,
    tituloTendencia: "✅ Tendência: SIM — Favorável, trazendo renovação, prosperidade e encerramento doce.",
    caminho: "Caminho do brilho e da fartura reconquistada. Oxê indica que o sofrimento está dando lugar à colheita merecida.",
    influenciaEspiritual: "Oxum envolve a questão com diplomacia, doçura e atração de abundância material e espiritual.",
    fatoresFavoraveis: ["Magnetismo elevado", "Flexibilidade para contornar obstáculos", "Ganho ou reparação justa"],
    pontosAtencao: ["Gasto de energia com intrigas", "Vaidade", "Inconstância nos compromissos"],
    orientacoesPraticas: "Cuide da sua energia e do seu bem-estar. Mantenha a postura serena para atrair a prosperidade.",
    sabedoriaAncestral: "A água doce do rio sempre encontra o caminho para o mar, superando qualquer rocha.",
    resumoFinal: "Cenário muito abençoado e próspero. Confie no fluxo positivo dos acontecimentos."
  },
  6: {
    numero: 6, nome: "Obará", orixa: "Xangô e Oxóssi", elemento: "Ar / Terra", tendenciaPadrao: "SIM",
    favorabilidade: 95,
    tituloTendencia: "✅ Tendência: SIM — Altamente favorável, com prosperidade e triunfo justo.",
    caminho: "Obará é o Odù da grande virada de chave. Representa a superação da humilhação e a conquista da honra e da fartura.",
    influenciaEspiritual: "Xangô aplica a justiça equilibrada e Oxóssi garante que a flecha alcance a fartura e a prosperidade.",
    fatoresFavoraveis: ["Reconhecimento do seu direito legítimo", "Clareza nos argumentos", "Abertura substancial de caminhos"],
    pontosAtencao: ["Excesso de ostentação", "Falar sobre a conquista antes da hora", "Orgulho elevado"],
    orientacoesPraticas: "Mantenha a postura íntegra, mantenha o foco no seu objetivo e preserve o silêncio.",
    sabedoriaAncestral: "Aquele que já esteve na poeira conhece o valor de caminhar no topo com humildade.",
    resumoFinal: "Excelente sinalização oracular. Seus caminhos estão abertos para a vitória."
  },
  7: {
    numero: 7, nome: "Odi", orixa: "Obaluaê e Oxalufã", elemento: "Terra", tendenciaPadrao: "AINDA NÃO",
    favorabilidade: 35,
    tituloTendencia: "⏳ Tendência: AINDA NÃO — Exige resistência e encerramento definitivo de velhos ciclos.",
    caminho: "Caminho do renascimento duro mas duradouro. Odi mostra que para o novo entrar, as dívidas do passado precisam ser zeradas.",
    influenciaEspiritual: "Obaluaê limpa as impurezas e feridas antigas, garantindo que o chão reconstruído seja inabalável.",
    fatoresFavoraveis: ["Firmeza para suportar a pressão final", "Capacidade de resiliência e paciência", "Cura de injustiças antigas"],
    pontosAtencao: ["Apegos ao passado ou ressentimentos", "Rigidez excessiva", "Pessimismo no tempo de espera"],
    orientacoesPraticas: "Desapegue das frustrações anteriores. Faça uma limpeza energética e organize suas pendências.",
    sabedoriaAncestral: "O carvão sob extrema pressão e tempo é o que se transforma em diamante.",
    resumoFinal: "Feche o ciclo passado com firmeza antes de tentar iniciar esta nova etapa."
  },
  8: {
    numero: 8, nome: "Ejionile", orixa: "Oxaguiã / Oxalá", elemento: "Ar", tendenciaPadrao: "SIM",
    favorabilidade: 90,
    tituloTendencia: "✅ Tendência: SIM — Vitória garantida pela sabedoria, ética e estratégia pacífica.",
    caminho: "Caminho da liderança elevada e da vitória da razão sobre o caos. Ejionile traz a paz que sucede a tempestade.",
    influenciaEspiritual: "Oxaguiã sopra clareza mental e estratégia limpa, derrubando acusações infundadas.",
    fatoresFavoraveis: ["Razão e ética ao seu lado", "Clareza mental absoluta", "Respeito dos decisores"],
    pontosAtencao: ["Ansiedade e excesso de pensamentos", "Perfeccionismo sufocante", "Impaciência com os outros"],
    orientacoesPraticas: "Mantenha a calma. Evite conflitos acalorados e use a lógica como sua principal aliada.",
    sabedoriaAncestral: "A paz não é a ausência de guerra, é a presença do domínio sobre a própria mente.",
    resumoFinal: "Sinal verde do oráculo. Mantenha a cabeça fria e a conduta ética para triunfar."
  },
  9: {
    numero: 9, nome: "Osa", orixa: "Oyá (Iansã) e Yemanja", elemento: "Fogo / Água", tendenciaPadrao: "AINDA NÃO",
    favorabilidade: 42,
    tituloTendencia: "⏳ Tendência: AINDA NÃO — Ventos de mudança repentina podem alterar o rumo do processo.",
    caminho: "Caminho da tempestade que varre o ultrapassado. Osa exige flexibilidade para se adaptar às guinadas.",
    influenciaEspiritual: "Iansã traz a força do vento, cortando amarras e movimentando o que estava estagnado.",
    fatoresFavoraveis: ["Mudança rápida do cenário a seu favor", "Coragem para inovar", "Proteção contra falsos aliados"],
    pontosAtencao: ["Falta de foco e inquietação", "Explosões emocionais", "Agir sem planejar"],
    orientacoesPraticas: "Não tome decisões cruciais sob forte emoção. Respire e aguarde a poeira baixar.",
    sabedoriaAncestral: "O vento forte derruba árvores de raízes rasas, mas apenas dobra as que são flexíveis.",
    resumoFinal: "Imprevistos podem ocorrer. Reorganize a estratégia e espere o momento certo."
  },
  10: {
    numero: 10, nome: "Ofun", orixa: "Oxalá", elemento: "Ar", tendenciaPadrao: "SIM",
    favorabilidade: 85,
    tituloTendencia: "✅ Tendência: SIM — Solução abençoada pela sabedoria superior e respeito à verdade.",
    caminho: "Caminho da bênção dos anciãos e da pureza de propósitos. Ofun concede a vitória aos que agem de boa-fé.",
    influenciaEspiritual: "Oxalá estende sua proteção, afastando falsidades e desonestidades do seu caminho.",
    fatoresFavoraveis: ["Autoridade moral inquestionável", "Proteção espiritual elevada", "Solução honrosa do conflito"],
    pontosAtencao: ["Prepotência", "Violas princípios éticos", "Isolamento"],
    orientacoesPraticas: "Agradeça às suas forças protetoras e mantenha a intenção pura em cada passo.",
    sabedoriaAncestral: "A verdade pode tardar em ser ouvida, mas quando fala, o silêncio respeitoso se impõe.",
    resumoFinal: "Caminhos limpos e abençoados. O veredito tende a ser positivo para você."
  },
  11: {
    numero: 11, nome: "Owonrin", orixa: "Exu e Oyá", elemento: "Fogo", tendenciaPadrao: "NÃO",
    favorabilidade: 30,
    tituloTendencia: "❌ Tendência: NÃO — Cuidado com reviravoltas inesperadas ou imprevistos de última hora.",
    caminho: "Caminho do imprevisível e do aprendizado rápido. Owonrin avisa que o cenário pode mudar de posição de repente.",
    influenciaEspiritual: "Exu e Oyá cobram atenção redobrada com papéis, conversas informais e prazos.",
    fatoresFavoraveis: ["Capacidade de reação rápida a emergências", "Criatividade para saídas"],
    pontosAtencao: ["Desorganização ou perda de prazos", "Confiar em promessas verbais", "Desatenção"],
    orientacoesPraticas: "Confirme dados e acordos por escrito. A prevenção garantirá sua segurança.",
    sabedoriaAncestral: "Quando o vento muda de direção, o navegador inteligente ajusta as velas.",
    resumoFinal: "Alerta de risco. Não arrisque recursos ou expectativas nesta questão agora."
  },
  12: {
    numero: 12, nome: "Ejilaxeborá", orixa: "Xangô", elemento: "Fogo", tendenciaPadrao: "SIM",
    favorabilidade: 92,
    tituloTendencia: "✅ Tendência: SIM — Justiça plena, rigorosa e indiscutível.",
    caminho: "Caminho da balança exata e do tribunal divino. Ejilaxeborá traz o julgamento imparcial onde a verdade prevalece.",
    influenciaEspiritual: "Xangô reina supremo nesta caída, pesando os fatos com rigor e abrindo portas para a verdade.",
    fatoresFavoraveis: ["Provas irrefutáveis ao seu favor", "Sentença ou resolução justa", "Triunfo em disputas"],
    pontosAtencao: ["Julgar os outros com rigor excessivo", "Orgulho", "Estresse elevado"],
    orientacoesPraticas: "Permaneça estritamente dentro da verdade. A honestidade é sua maior garantia.",
    sabedoriaAncestral: "A justiça humana pode falhar por cegueira, mas a lei de causa e efeito nunca erra.",
    resumoFinal: "A justiça está a seu favor. Permaneça firme na verdade que o resultado virá."
  },
  13: {
    numero: 13, nome: "Okanran Meji", orixa: "Nanã e Obaluaê", elemento: "Terra", tendenciaPadrao: "AINDA NÃO",
    favorabilidade: 45,
    tituloTendencia: "⏳ Tendência: AINDA NÃO — Exige maturação lenta e paciência no tempo certo.",
    caminho: "Caminho da sabedoria ancestral da terra profunda. Ensina que frutos não amadurecem à força.",
    influenciaEspiritual: "Nanã traz a calma dos anciãos, preparando o terreno para que a solução venha sem traumas.",
    fatoresFavoraveis: ["Estabilidade a longo prazo", "Decisão definitiva e sólida", "Cura de mágoas"],
    pontosAtencao: ["Impaciência angustiante", "Tentar acelerar burocracias à força", "Melancolia"],
    orientacoesPraticas: "Respeite o tempo natural dos trâmites. Cuide dos afazeres do presente.",
    sabedoriaAncestral: "A paciência é a certeza de que a semente germina no escuro antes de ver a luz.",
    resumoFinal: "A resposta requer tempo. Mantenha a constância sem desespero."
  },
  14: {
    numero: 14, nome: "Iká", orixa: "Oxumaré", elemento: "Água / Ar", tendenciaPadrao: "SIM",
    favorabilidade: 84,
    tituloTendencia: "✅ Tendência: SIM — Ciclo de renovação trazendo flexibilidade e novos caminhos.",
    caminho: "Caminho do arco-íris e da transformação constante. Iká indica que a tempestade passou e traz novas opções.",
    influenciaEspiritual: "Oxumaré renova a energia do ambiente, transformando perdas aparentes em ganhos reais.",
    fatoresFavoraveis: ["Capacidade de reinvenção", "Atração de oportunidades", "Flexibilidade"],
    pontosAtencao: ["Espalhar energia em muitas coisas", "Promessas vagas de terceiros", "Falta de foco"],
    orientacoesPraticas: "Esteja aberto a caminhos e alternatives que você não havia considerado no início.",
    sabedoriaAncestral: "Após a chuva mais densa, o céu se pinta com as cores da renovação.",
    resumoFinal: "Cenário favorável e de renovação. Adapte-se e colha os frutos positivos."
  },
  15: {
    numero: 15, nome: "Obeogundá", orixa: "Ewá e Ogum", elemento: "Ar", tendenciaPadrao: "AINDA NÃO",
    favorabilidade: 38,
    tituloTendencia: "⏳ Tendência: AINDA NÃO — Exige discernimento apurado para enxergar as entrelinhas.",
    caminho: "Caminho da visão além do alcance e da intuição afiada. Adverte contra armadilhas disfarçadas de facilidade.",
    influenciaEspiritual: "Ewá protege os segredos e concede percepção para detectar más intenções a distância.",
    fatoresFavoraveis: ["Proteção contra traições", "Estratégia perspicaz", "Descoberta de falhas a tempo"],
    pontosAtencao: ["Desconfiança paranóica", "Isolamento excessivo", "Inquietação quanto ao futuro"],
    orientacoesPraticas: "Confie na sua percepção interior. Se algo parecer bom demais, investigue a fundo.",
    sabedoriaAncestral: "O escudo mais forte é a lucidez de enxergar as coisas exatamente como são.",
    resumoFinal: "Sinal amarelo. Investigue melhor antes de dar o próximo passo."
  },
  16: {
    numero: 16, nome: "Alafia", orixa: "Orunmilá e Oxalá", elemento: "Luz / Ar", tendenciaPadrao: "SIM",
    favorabilidade: 98,
    tituloTendencia: "✅ Tendência: SIM — Luz absoluta, paz de espírito, confirmação e vitória plena.",
    caminho: "Caminho da bênção suprema onde todos os búzios se abrem para confirmar a graça do oráculo.",
    influenciaEspiritual: "Orunmilá e Oxalá derramam sabedoria e luz, dissipando todas as trevas e incertezas.",
    fatoresFavoraveis: ["Harmonia total dos fatores", "Conclusão extremamente favorável", "Proteção contínua"],
    pontosAtencao: ["Acomodação ou descuido na reta final", "Ingenuidade diante do ambiente"],
    orientacoesPraticas: "Agradeça com o coração sereno. Mantenha a postura elevada e desfrute da conquista.",
    sabedoriaAncestral: "Quando a luz da verdade se acende por completo, a sombra simplesmente deixa de existir.",
    resumoFinal: "Confirmação absoluta e positiva. Vitória garantida nos caminhos."
  }
};

let oduDiretorAtual = null;
let perguntasRestantes = 0;
let pacoteAtivo = { qtd: 5, valor: 25.99 };

// Calculadora de Odù
function calcularOduNumerologia(dataStr) {
  if (!dataStr) return 6;
  const numeros = dataStr.replace(/\D/g, '');
  let soma = numeros.split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  while (soma > 16) {
    soma = soma.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }
  return soma === 0 ? 1 : soma;
}

// Etapa 1: Odù de Nascimento
document.getElementById('form-odu')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const dataInput = document.getElementById('dataNasc').value;
  if (!dataInput) return;

  const btn = document.getElementById('btn-calc-odu');
  btn.innerText = '🔮 Mapeando Força Ancestral...';

  setTimeout(() => {
    const numOdu = calcularOduNumerologia(dataInput);
    oduDiretorAtual = ODUS_DATABASE[numOdu] || ODUS_DATABASE[6];

    document.getElementById('odu-numero').innerText = oduDiretorAtual.numero;
    document.getElementById('odu-nome').innerText = oduDiretorAtual.nome;
    document.getElementById('odu-orixa').innerText = oduDiretorAtual.orixa;
    document.getElementById('odu-elemento').innerText = oduDiretorAtual.elemento;

    const textoCaminhoExpandido = `
      <p style="margin-bottom: 10px; line-height: 1.6;">
        ${oduDiretorAtual.caminho} Sob a regência ancestral do Orixá <strong>${oduDiretorAtual.orixa}</strong> e regido pela vibração do elemento <strong>${oduDiretorAtual.elemento}</strong>, este Odù atua como o mapa da sua jornada terrena. Ele direciona suas maiores aptidões e define como você enfrenta os ciclos de aprendizado e superação.
      </p>
      <p style="margin-bottom: 12px; line-height: 1.6;">
        A energia deste caminho requer constante alinhamento espiritual e autoconhecimento. Compreender a força interior do seu Odù permite destravar a prosperidade, proteger sua caminhada contra influências negativas e tomar decisões sábias nos momentos de maior desafio.
      </p>
      <div style="margin-top: 14px; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(245, 158, 11, 0.25);">
        <p style="color: #34d399; margin-bottom: 8px; line-height: 1.5;">
          <strong>✨ Pontos Fortes & Potenciais:</strong> ${oduDiretorAtual.fatoresFavoraveis.join(' • ')}.
        </p>
        <p style="color: #f87171; margin-bottom: 0; line-height: 1.5;">
          <strong>⚠️ Pontos de Alerta & Cuidados:</strong> ${oduDiretorAtual.pontosAtencao.join(' • ')}.
        </p>
      </div>
    `;

    document.getElementById('odu-caminho').innerHTML = textoCaminhoExpandido;
    
    const elemTransicao = document.getElementById('transicao-nome-odu');
    if (elemTransicao) {
      elemTransicao.innerText = `${oduDiretorAtual.nome} (${oduDiretorAtual.orixa})`;
    }

    const resOdu = document.getElementById('resultado-odu');
    resOdu.style.display = 'block';
    resOdu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    btn.innerText = '🔮 Descobrir Meu Odù';
  }, 800);
});

// Etapa 2: Seleção de Pacotes
function selecionarPacote(qtd, valor) {
  pacoteAtivo = { qtd, valor };
  document.getElementById('pacote-5').classList.toggle('active', qtd === 5);
  document.getElementById('pacote-10').classList.toggle('active', qtd === 10);
}

function gerarPix() {
  const container = document.getElementById('area-pix');
  const qrSimulado = "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865405" + pacoteAtivo.valor.toFixed(2) + "5802BR5913Oraculo Odara";

  container.innerHTML = `
    <div style="background: #0b0612; padding: 16px; border-radius: 8px; border: 1px solid #f59e0b; text-align: center; margin-top: 10px;">
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

// Criador de Búzios em SVG
function criarBuzioSVG(eAberto) {
  if (eAberto) {
    return `
      <svg viewBox="0 0 50 70" width="100%" height="100%">
        <defs>
          <radialGradient id="gradAberto" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="65%" stop-color="#fef3c7"/>
            <stop offset="100%" stop-color="#d97706"/>
          </radialGradient>
        </defs>
        <path d="M25 2 C 42 2, 48 18, 47 35 C 46 52, 38 68, 25 68 C 12 68, 4 52, 3 35 C 2 18, 8 2, 25 2 Z" fill="url(#gradAberto)" stroke="#78350f" stroke-width="1.5"/>
        <path d="M25 10 C 22 18, 22 52, 25 60 C 28 52, 28 18, 25 10 Z" fill="#451a03"/>
        <path d="M22 18 L25 19 L22 23 L25 24 L22 28 L25 29 L22 33 L25 34 L22 38 L25 39 L22 43 L25 44 L22 48 L25 49" stroke="#fef3c7" stroke-width="1" fill="none"/>
        <path d="M28 18 L25 19 L28 23 L25 24 L28 28 L25 29 L28 33 L25 34 L28 38 L25 39 L28 43 L25 44 L28 48 L25 49" stroke="#fef3c7" stroke-width="1" fill="none"/>
      </svg>
    `;
  } else {
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
        <path d="M25 6 C 29 20, 29 50, 25 64" stroke="#fef3c7" stroke-width="1" stroke-dasharray="2 3" opacity="0.4" fill="none"/>
      </svg>
    `;
  }
}

// Etapa 3: Jogada de Búzios
document.getElementById('form-consulta')?.addEventListener('submit', function (e) {
  e.preventDefault();
  if (perguntasRestantes <= 0) {
    alert("Seu saldo de consultas acabou. Adquira um novo pacote!");
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

  mesa.scrollIntoView({ behavior: 'smooth', block: 'center' });
  mesa.classList.add('mesa-chacoalhando');

  const numAbertos = Math.floor(Math.random() * 16) + 1;
  const oduJogo = ODUS_DATABASE[numAbertos];

  for (let i = 0; i < 16; i++) {
    const eAberto = i < numAbertos;
    const buzioEl = document.createElement('div');
    buzioEl.className = 'buzio buzio-animando';
    buzioEl.innerHTML = criarBuzioSVG(eAberto);
    
    const top = Math.floor(Math.random() * 65 + 15);
    const left = Math.floor(Math.random() * 65 + 15);
    const rot = Math.floor(Math.random() * 360);

    buzioEl.style.top = `${top}%`;
    buzioEl.style.left = `${left}%`;
    buzioEl.style.transform = `rotate(${rot}deg)`;
    buzioEl.style.animationDelay = `${i * 0.08}s`;

    peneira.appendChild(buzioEl);
  }

  status.innerText = "🔮 Lançando os búzios na mesa sagrada...";

  setTimeout(() => {
    mesa.classList.remove('mesa-chacoalhando');
    status.innerText = "✨ Consultando a sabedoria ancestral dos Orixás...";
  }, 1500);

  setTimeout(() => {
    status.innerText = "🕯️ Interpretando os sinais e a queda revelada...";
  }, 3000);

  setTimeout(() => {
    perguntasRestantes--;
    document.getElementById('qtd-perguntas').innerText = perguntasRestantes;

    const resContainer = document.getElementById('resultado-leitura');
    
    resContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #332147; padding-bottom: 10px; margin-bottom: 14px;">
        <span class="tag-gold">🐚 Caída: ${numAbertos} Búzios Abertos / ${16 - numAbertos} Fechados</span>
        <span style="font-size: 12px; color: #a1a1aa;">Área: <strong>${area}</strong></span>
      </div>

      <div style="background: #28173d; padding: 14px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 16px;">
        <span style="font-size: 11px; color: #fbbf24; font-weight: bold; text-transform: uppercase;">1. Tendência da Consulta</span>
        <h3 style="color: #fff; font-size: 16px; margin-top: 4px;">${oduJogo.tituloTendencia}</h3>
      </div>

      <div class="favorability-container">
        <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: bold; color: #fbbf24;">
          <span>Favorabilidade da Consulta</span>
          <span>${oduJogo.favorabilidade}%</span>
        </div>
        <div class="favorability-bar-bg">
          <div class="favorability-bar-fill" style="width: ${oduJogo.favorabilidade}%;"></div>
        </div>
      </div>

      <div style="margin: 16px 0; background: #0b0612; padding: 14px; border-radius: 8px; border: 1px solid #332147;">
        <h4 style="color: #fbbf24; font-size: 14px; margin-bottom: 8px;">2. O Que os Búzios Revelam (Odù ${oduJogo.nome})</h4>
        <p style="font-size: 13px; color: #d4d4d8; line-height: 1.6; margin-bottom: 8px;">
          ${oduJogo.caminho}
        </p>
        <p style="font-size: 13px; color: #d4d4d8; line-height: 1.6;">
          A queda de ${numAbertos} búzios traz a regência direta do Orixá <strong>${oduJogo.orixa}</strong>, ativando energias do elemento <strong>${oduJogo.elemento}</strong> para direcionar esta fase.
        </p>
      </div>

      <div style="margin: 16px 0; background: #0b0612; padding: 14px; border-radius: 8px; border: 1px solid #f59e0b;">
        <h4 style="color: #fbbf24; font-size: 14px; margin-bottom: 6px;">3. Interpretação Aplicada à Sua Pergunta</h4>
        <p style="font-size: 12px; color: #a1a1aa; font-style: italic; margin-bottom: 8px;">" Pergunta: ${pergunta} "</p>
        <p style="font-size: 13.5px; color: #fff; line-height: 1.6;">
          Em relação à sua dúvida sobre <strong>${area.toLowerCase()}</strong>, o oráculo revela que o cenário atual pede clareza. A energia de ${oduJogo.nome} indica que ${oduJogo.favorabilidade > 60 ? 'existem caminhos abertos e suporte favorável para o desfecho que você busca, desde que mantenha a postura recomendada' : 'existem obstáculos e pendências que precisam ser tratados com cautela antes que o resultado desejado possa se consolidar'}.
        </p>
      </div>

      <div style="margin: 16px 0; background: #0b0612; padding: 14px; border-radius: 8px; border: 1px solid #332147;">
        <h4 style="color: #fbbf24; font-size: 14px; margin-bottom: 6px;">4. Influências Espirituais Associadas</h4>
        <p style="font-size: 13px; color: #d4d4d8; line-height: 1.5;">${oduJogo.influenciaEspiritual}</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin: 16px 0;">
        <div style="background: #150a24; padding: 12px; border-radius: 8px; border: 1px solid #332147;">
          <h4 style="color: #34d399; font-size: 13px; margin-bottom: 6px;">5. ✨ Fatores Favoráveis</h4>
          <ul style="font-size: 12px; color: #a1a1aa; padding-left: 16px;">
            ${oduJogo.fatoresFavoraveis.map(f => `<li style="margin-bottom: 4px;">${f}</li>`).join('')}
          </ul>
        </div>
        <div style="background: #150a24; padding: 12px; border-radius: 8px; border: 1px solid #332147;">
          <h4 style="color: #f87171; font-size: 13px; margin-bottom: 6px;">6. ⚠️ Pontos de Atenção</h4>
          <ul style="font-size: 12px; color: #a1a1aa; padding-left: 16px;">
            ${oduJogo.pontosAtencao.map(p => `<li style="margin-bottom: 4px;">${p}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div style="margin: 16px 0; background: #0b0612; padding: 14px; border-radius: 8px; border: 1px solid #332147;">
        <h4 style="color: #fbbf24; font-size: 14px; margin-bottom: 6px;">7. 💡 Orientações Práticas</h4>
        <p style="font-size: 13px; color: #d4d4d8; line-height: 1.5;">${oduJogo.orientacoesPraticas}</p>
      </div>

      <div style="margin: 16px 0; padding: 12px; background: #28173d; border-radius: 8px; font-style: italic; text-align: center; color: #fde68a; font-size: 13px;">
        "8. ${oduJogo.sabedoriaAncestral}"
      </div>

      <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #332147; text-align: center;">
        <span style="font-size: 11px; color: #fbbf24; font-weight: bold; text-transform: uppercase;">9. Resumo Final</span>
        <p style="font-size: 13.5px; color: #fff; font-weight: bold; margin-top: 4px;">${oduJogo.resumoFinal}</p>
      </div>
    `;

    resContainer.style.display = 'block';
    resContainer.scrollIntoView({ behavior: 'smooth' });
    btn.disabled = false;
    status.innerText = "Leitura concluída com sucesso!";
  }, 4500);
});
