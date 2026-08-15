// BANCO DE DADOS COMPLETO DOS ODÙS DE NASCIMENTO
const ODUS_NASCIMENTO = {
  1: {
    nome: "Okaran", orixa: "Exu", elemento: "Fogo",
    caminho: "O Odù Okaran representa a força primordial da transformação, da rapidez e da capacidade de abrir caminhos onde antes só existiam obstáculos. Quem nasce sob a regência deste Odù carrega uma mente aguçada, um espírito independente e um forte dom para a liderança. No entanto, é um caminho que exige constante domínio da impulsividade para que a própria energia não crie turbulências desnecessárias nas relações pessoais e profissionais.",
    fortes: ["Capacidade de superação rápida de crises", "Independência e forte poder de decisão", "Espírito protetor e guerreiro"],
    alertas: ["Impulsividade e precipitação ao falar", "Tendência a atritos por falta de paciência", "Cuidado com o orgulho em momentos de discórdia"]
  },
  2: {
    nome: "Ejioko", orixa: "Ibejis / Ogum", elemento: "Terra",
    caminho: "Ejioko é o Odù da dualidade, da união e da busca por estabilidade material e emocional. Traz a bênção da aliança, do trabalho em equipe e da capacidade de conciliar interesses opostos com diplomacia. Sua jornada exige o aprendizado do equilíbrio interior, ensinando que para alcançar grandes conquistas é necessário manter a mente calma e os pés bem firmes sobre o solo.",
    fortes: ["Habilidade para parcerias e sociedades", "Firmeza de caráter e lealdade", "Visão prática para prosperidade material"],
    alertas: ["Indecisão prolongada diante de escolhas", "Apego à zona de conforto", "Medo excessivo de mudanças e riscos"]
  },
  3: {
    nome: "Etaogundá", orixa: "Ogum", elemento: "Ferro / Fogo",
    caminho: "Etaogundá é a representação do trabalho incansável, da coragem e da quebra de barreiras pela força da determinação. Os regidos por este Odù são construtores por natureza, dotados de uma resiliência única que transforma qualquer desafio em degrau para a vitória. Sua missão é aprender a dosar a rigidez, aplicando a estratégia antes da força bruta para evitar desgaste desnecessário.",
    fortes: ["Foco inabalável em objetivos difíceis", "Capacidade de proteger e defender os seus", "Determinação e garra para vencer disputas"],
    alertas: ["Estresse e sobrecarga por carregar tudo sozinho", "Rigidez e teimosia em aceitar opiniões", "Tendência a reações defensivas ou agressivas"]
  },
  4: {
    nome: "Irosun", orixa: "Iemanjá / Oxóssi", elemento: "Fogo / Água",
    caminho: "Irosun é o caminho da intuição afiada, da proteção ancestral e da visão profunda que enxerga através das aparências. Traz a bênção do olhar calmo e da sabedoria interior, permitindo antecipar problemas e tomar decisões baseadas em sentimentos nobres. Exige cuidado com momentos de ilusão ou melancolia, mantendo a mente sempre conectada com a luz espiritual e com a realidade.",
    fortes: ["Intuição apurada para farejar perigos", "Forte proteção de ancestrais e guias", "Sensibilidade e capacidade de acolhimento"],
    alertas: ["Melancolia ou apego a lembranças dolorosas", "Tendência a idealizar pessoas ou situações", "Cuidado com a ingenuidade e falsas promessas"]
  },
  5: {
    nome: "Oxé", orixa: "Oxum", elemento: "Água",
    caminho: "Oxé é o Odù do encanto, da prosperidade, da cura e da renovação constante das energias vitais. Os filhos deste caminho possuem um magnetismo natural, sabedoria para atrair oportunidades e uma facilidade enorme para se reinventar após períodos difíceis. Sua regência ensina que a verdadeira força reside na flexibilidade da água e na valorização da autoestima sem cair no vício do egocentrismo.",
    fortes: ["Magnetismo e facilidade para prosperar", "Poder de cura emocional e diplomacia", "Intuição refinada para artes e negócios"],
    alertas: ["Vaidade e necessidade constante de aprovação", "Volatilidade emocional diante de críticas", "Apego ao supérfluo ou superficial"]
  },
  6: {
    nome: "Obará", orixa: "Xangô / Oxóssi", elemento: "Ar / Terra",
    caminho: "Obará é o Odù da grande fartura, do brilho pessoal, da prosperidade ilimitada e da vitória sobre as dificuldades financeiras. Traz a energia da expansão e do sucesso comercial, abençoando o regido com ideias criativas e grande liderança. Sua grande lição é manter a simplicidade e a generosidade, pois a fartura multiplicada deve ser usada para proteger e elevar todos ao seu redor.",
    fortes: ["Sorte extraordinária para negócios e ganhos", "Liderança nata e carisma contagiante", "Capacidade de dar a volta por cima na vida"],
    alertas: ["Ostentação ou desperdício de recursos", "Inveja gerada pelo próprio brilho exagerado", "Orgulho e dificuldade em admitir fraquezas"]
  },
  7: {
    nome: "Odi", orixa: "Obaluaiê / Oxalufã", elemento: "Terra",
    caminho: "Odi é o caminho da resistência inabalável, do encerramento de ciclos estagnados e do renascimento espiritual forte. Ensina que após cada momento de provação surge uma estabilidade duradoura e inquebrável. Os regidos por Odi possuem uma estrutura moral fortíssima e sabedoria para reconstruir a vida do zero, necessitando apenas libertar ressentimentos e desapegar do que já cumpriu seu papel.",
    fortes: ["Firmeza extraordinária de caráter e resiliência", "Capacidade de recomeçar do zero e vencer", "Proteção para a saúde física e espiritual"],
    alertas: ["Apegos ao passado ou ressentimentos guardados", "Rigidez excessiva em suas certezas", "Tendência ao pessimismo em momentos difíceis"]
  },
  8: {
    nome: "Ejiologbon", orixa: "Nanã / Oxalufã", elemento: "Terra / Água",
    caminho: "Ejiologbon traz a sabedoria dos anciãos, a paciência madura e o entendimento profundo sobre os ciclos naturais da vida. Quem nasce neste Odù possui uma mente contemplativa e capacidade de dar conselhos valiosos, sabendo esperar o tempo certo para o fruto amadurecer. Exige combate ao desânimo e ao isolamento, lembrando que a paciência deve ser aliada da ação consciente.",
    fortes: ["Ponderação e sabedoria para resolver conflitos", "Respeito e prestígio acumulados com o tempo", "Paz interior e grande equilíbrio mental"],
    alertas: ["Lentidão excessiva para tomar atitudes", "Desânimo ou tendência ao isolamento social", "Teimosia por excesso de apego a tradições"]
  },
  9: {
    nome: "Osa", orixa: "Oyá (Iansã)", elemento: "Ar",
    caminho: "Osa é o Odù da liberdade, dos ventos da transformação rápida e da intuição afiada como um raio. Traz uma força espiritual poderosa que não tolera injustiças ou amarras, impulsionando o regido a estar sempre em movimento produtivo. Sua lição é aprender a canalizar essa grande tempestade criativa com foco, evitando que a inconstância atrapalhe o fechamento de grandes projetos.",
    fortes: ["Coragem para romper com o que faz mal", "Rapidez de raciocínio e visão de futuro", "Forte proteção contra energias negativas"],
    alertas: ["Inconstância e mudança brusca de rumo", "Acessos de raiva ou reações passionais", "Impaciência com o ritmo mais lento dos outros"]
  },
  10: {
    nome: "Ofun", orixa: "Oxalá", elemento: "Ar / Espaço",
    caminho: "Ofun é o Odù do respeito ao sagrado, da iluminação, da paz de espírito e da pureza de intenções. É considerado o caminho das bênçãos maiores de Oxalá, trazendo proteção e autoridade moral onde quer que o regido esteja. Exige uma vida pautada na verdade, na honestidade e no respeito aos preceitos espirituais, pois sua luz ilumina os caminhos e afasta toda espécie de escuridão.",
    fortes: ["Elevada proteção espiritual e paz", "Autoridade moral e respeito da comunidade", "Capacidade de pacificar e harmonizar ambientes"],
    alertas: ["Orgulho espiritual ou ar de superioridade", "Rigidez moral excessiva ao julgar os outros", "Sensibilidade extrema a ambientes pesados"]
  },
  11: {
    nome: "Owonrin", orixa: "Exu / Oyá", elemento: "Fogo / Ar",
    caminho: "Owonrin representa o dinamismo da vida, os giros inesperados da sorte e a capacidade de encontrar oportunidades onde os outros enxergam apenas caos. Traz grande inteligência prática e capacidade de adaptação. Sua missão é usar essa versatilidade com responsabilidade, mantendo a disciplina para não abandonar metas importantes diante de novidades passageiras.",
    fortes: ["Adaptabilidade incrível a qualquer cenário", "Agilidade mental para resolver imprevistos", "Visão de oportunidades financeiras ocultas"],
    alertas: ["Falta de constância e dispersão de energia", "Tendência a assumir riscos sem planejar", "Instabilidade interpessoal por tédio fácil"]
  },
  12: {
    nome: "Ejila Ebora", orixa: "Xangô", elemento: "Fogo",
    caminho: "Ejila Ebora é o Odù da liderança nata, da busca incessante pela justiça e do triunfo em grandes causas. Traz a firmeza de Xangô para proteger a honra e o direito de quem age com retidão. Os regidos por este caminho são admirados por sua postura e coragem, mas precisam ter cuidado para não agir como juízes implacáveis de si mesmos e das pessoas ao seu redor.",
    fortes: ["Forte senso de justiça e integridade", "Vitória em questões jurídicas ou disputas", "Liderança natural e respeito público"],
    alertas: ["Inflexibilidade e intolerância com erros", "Tendência a reações impulsivas de orgulho", "Sobrecarga emocional por buscar perfeição"]
  },
  13: {
    nome: "Ejiologbon (Okanran Meji)", orixa: "Nanã", elemento: "Terra",
    caminho: "Este Odù representa a necessidade de transformação interior profunda, o encerramento consciente de velhas etapas e a renovação de forças espirituais. Ensina a sabedoria do desapego e a humildade para aceitar que certos ciclos precisam findar para que coisas maiores nasçam. É um caminho de enorme cura e maturidade para quem aprende a ouvir a própria alma.",
    fortes: ["Profunda maturidade e visão espiritual", "Capacidade de cura emocional e resiliência", "Desapego de coisas que não agregam mais"],
    alertas: ["Dificuldade em aceitar mudanças impostas", "Melancolia e apego a perdas do passado", "Resistência em pedir ajuda quando precisa"]
  },
  14: {
    nome: "Iká", orixa: "Oxumarê", elemento: "Água / Ar",
    caminho: "Iká é o caminho da renovação contínua, da sabedoria estratégica e do arco-íris da prosperidade após as tempestades. Os regidos por Iká possuem uma mente perspicaz e diplomática, sendo capazes de contornar crises complexas com extrema inteligência. Sua jornada exige foco e determinação, garantindo que suas grandes estratégias saiam do papel e se concretizem em vitórias.",
    fortes: ["Estratégia brilhante e visão de longo prazo", "Capacidade de renovação física e financeira", "Diplomacia para vencer sem entrar em conflito"],
    alertas: ["Desconfiança excessiva das intenções alheias", "Tendência a guardar segredos demais", "Inconstância se não houver um objetivo claro"]
  },
  15: {
    nome: "Ibeji / Ogbè", orixa: "Obá / Ewá", elemento: "Ar",
    caminho: "Este Odù traz o dom da perspicácia, da proteção contra falsidades e do triunfo alcançado através da observação atenta. Quem nasce sob este Odù possui uma intuição refinada que percebe o perigo antes que ele se aproxime. Sua lição é cultivar a confiança em si mesmo e não permitir que o medo do engano o afaste de construir relacionamentos sinceros e felizes.",
    fortes: ["Foco cirúrgico e intuição afiada", "Proteção natural contra enganos e falsidades", "Capacidade de superação por perspicácia"],
    alertas: ["Isolamento por excesso de desconfiança", "Tendência a remoer mágoas antigas", "Dificuldade em se abrir emocionalmente"]
  },
  16: {
    nome: "Alafia", orixa: "Oxalá / Todos os Orixás", elemento: "Luz",
    caminho: "Alafia é a confirmação do sucesso, da iluminação total, da paz e do alinhamento perfeito com o propósito divino. Traz a bênção da clareza mental, do bem-estar e da facilidade para encontrar caminhos abertos em todas as áreas da vida. Exige apenas a manutenção da humildade e da gratidão diária, garantindo que essa luz permaneça guiando e abençoando seus passos.",
    fortes: ["Plenitude, paz de espírito e clareza", "Facilidade para abrir caminhos e obter êxito", "Proteção espiritual máxima e harmonia"],
    alertas: ["Acomodação por excesso de facilidade", "Negligência com os cuidados espirituais diários", "Cuidado para não esquecer as raízes no sucesso"]
  }
};

// BANCO DE DADOS DAS RESPOSTAS CONSULTIVAS DO ORÁCULO DE BÚZIOS (1 a 16)
const ODUS_JOGO = {
  1: { tendencia: "❌ Tendência: NÃO", favorabilidade: 25, titulo: "Bloqueio e Necessidade de Recuo", desc: "Os búzios alertam para atritos ou bloqueios imediatos. Não force decisões agora." },
  2: { tendencia: "⏳ Tendência: AINDA NÃO", favorabilidade: 48, titulo: "Negociação Pendente", desc: "A questão depende de acordos e ajustes interpessoais antes de se definir." },
  3: { tendencia: "✅ Tendência: SIM", favorabilidade: 82, titulo: "Triunfo Pelo Esforço", desc: "Caminho aberto para a vitória desde que haja firmeza, ética e determinação." },
  4: { tendencia: "⏳ Tendência: AINDA NÃO", favorabilidade: 40, titulo: "Névoa e Revelação", desc: "Existem fatores ocultos que precisam vir à tona. Mantenha a reserva." },
  5: { tendencia: "✅ Tendência: SIM", favorabilidade: 88, titulo: "Renovação e Prosperidade", desc: "Cenário extremamente favorável trazido por forças de doçura e atração material." },
  6: { tendencia: "✅ Tendência: SIM", favorabilidade: 95, titulo: "Fartura e Virada de Chave", desc: "Excepcional sinalização de prosperidade, justiça e avanço rápido." },
  7: { tendencia: "⏳ Tendência: AINDA NÃO", favorabilidade: 35, titulo: "Encerramento de Ciclo", desc: "Livre-se de velhas pendências antes de dar início a este novo projeto." },
  8: { tendencia: "✅ Tendência: SIM", favorabilidade: 90, titulo: "Estratégia e Razão", desc: "Sinal verde. Mantenha a mente serena, a ética e a postura equilibrada." },
  9: { tendencia: "⏳ Tendência: AINDA NÃO", favorabilidade: 42, titulo: "Mudanças Repentinas", desc: "O cenário pode sofrer guinadas inesperadas. Aguarde o vento acalmar." },
  10: { tendencia: "✅ Tendência: SIM", favorabilidade: 85, titulo: "Bênção e Proteção Superior", desc: "Desfecho honroso e protegido pela luz espiritual e pelo respeito." },
  11: { tendencia: "❌ Tendência: NÃO", favorabilidade: 30, titulo: "Alerta de Imprevistos", desc: "Atenção com detalhes técnicos, documentos e promessas informais." },
  12: { tendencia: "✅ Tendência: SIM", favorabilidade: 92, titulo: "Justiça e Resolução", desc: "A verdade prevalecerá a seu favor. Permaneça correto e transparente." },
  13: { tendencia: "⏳ Tendência: AINDA NÃO", favorabilidade: 45, titulo: "Maturação Lenta", desc: "Respeite o tempo de gestação dos acontecimentos sem ansiedade." },
  14: { tendencia: "✅ Tendência: SIM", favorabilidade: 84, titulo: "Renovação e Flexibilidade", desc: "Adapte-se às novidades e colha os frutos positivos das transformações." },
  15: { tendencia: "⏳ Tendência: AINDA NÃO", favorabilidade: 38, titulo: "Observação Cautelosa", desc: "Analise melhor as intenções e o cenário antes de assinar ou concordar." },
  16: { tendencia: "✅ Tendência: SIM", favorabilidade: 98, titulo: "Confirmação Absoluta", desc: "Caminhos abertos, harmonia total e vitória plena concedida pelo Oráculo." }
};

// ==========================================
// VARIÁVEIS GLOBAIS DE ESTADO
// ==========================================
let pacoteSelecionado = 5;
let valorSelecionado = 25.99;
let perguntasRestantes = 0;

// ==========================================
// 1. CÁLCULO E EXIBIÇÃO DO ODÙ DE NASCIMENTO
// ==========================================
document.getElementById('form-odu')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = document.getElementById('dataNasc').value;
  if (!data) return;

  const numeros = data.replace(/-/g, '');
  let soma = 0;
  for (let char of numeros) soma += parseInt(char);

  let numOdu = soma;
  while (numOdu > 16) {
    let str = numOdu.toString();
    numOdu = 0;
    for (let c of str) numOdu += parseInt(c);
  }
  if (numOdu === 0) numOdu = 16;

  const info = ODUS_NASCIMENTO[numOdu] || ODUS_NASCIMENTO[16];

  const painelOdu = document.getElementById('resultado-odu');
  painelOdu.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; margin-bottom: 12px;">
      <div>
        <span style="color: var(--gold-accent); font-size: 0.78rem; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase;">SEU REGENTE ANCESTRAL</span>
        <h3 style="font-size: 1.8rem; color: var(--gold-light); margin-top: 2px;">Odù #${numOdu} - ${info.nome}</h3>
      </div>
      <span style="background: rgba(16, 185, 129, 0.15); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.3); padding: 4px 12px; border-radius: 15px; font-size: 0.8rem; font-weight: 600;">
        ✓ Odù Mapeado
      </span>
    </div>

    <div style="display: flex; gap: 10px; margin-bottom: 22px; flex-wrap: wrap;">
      <span style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.12); padding: 6px 16px; border-radius: 20px; font-size: 0.88rem; color: var(--text-main);">
        Orixá: <strong style="color: var(--gold-light);">${info.orixa}</strong>
      </span>
      <span style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.12); padding: 6px 16px; border-radius: 20px; font-size: 0.88rem; color: var(--text-main);">
        Elemento: <strong style="color: var(--gold-light);">${info.elemento}</strong>
      </span>
    </div>

    <div style="margin-bottom: 24px;">
      <h4 style="color: var(--gold-accent); font-size: 1.05rem; margin-bottom: 8px;">📜 O Caminho do seu Odù:</h4>
      <p style="color: var(--text-main); font-size: 0.96rem; line-height: 1.65; text-align: justify;">
        ${info.caminho}
      </p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 15px;">
      <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 18px;">
        <h4 style="color: #34D399; font-size: 1rem; margin-bottom: 12px;">💡 Pontos Fortes</h4>
        <ul style="list-style-type: disc; padding-left: 18px; color: var(--text-main); font-size: 0.9rem; line-height: 1.6;">
          ${info.fortes.map(p => `<li style="margin-bottom: 6px;">${p}</li>`).join('')}
        </ul>
      </div>

      <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 18px;">
        <h4 style="color: #FCA5A5; font-size: 1rem; margin-bottom: 12px;">⚠️ Pontos de Alerta</h4>
        <ul style="list-style-type: disc; padding-left: 18px; color: var(--text-main); font-size: 0.9rem; line-height: 1.6;">
          ${info.alertas.map(a => `<li style="margin-bottom: 6px;">${a}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div style="margin-top: 25px; padding: 20px; background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(138, 43, 226, 0.15) 100%); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 14px; text-align: center;">
      <h4 style="color: var(--gold-light); font-size: 1.15rem; margin-bottom: 8px;">✨ Quer orientações detalhadas sobre Amor, Trabalho e Saúde?</h4>
      <p style="color: var(--text-main); font-size: 0.92rem; line-height: 1.5; margin-bottom: 16px;">
        Saber seu Odù de Nascimento é o primeiro passo. Consulte o <strong>Jogo Sagrado de Búzios Online</strong> para suas dúvidas imediatas.
      </p>
      <button id="btn-ir-pacotes" class="btn-primary" style="max-width: 320px; margin: 0 auto;">🔮 Ver Pacotes de Leitura de Búzios</button>
    </div>
  `;

  painelOdu.style.display = 'block';
  painelOdu.scrollIntoView({ behavior: 'smooth' });

  document.getElementById('btn-ir-pacotes')?.addEventListener('click', function () {
    const alvo = document.getElementById('secao-pacotes');
    if (alvo) alvo.scrollIntoView({ behavior: 'smooth' });
  });
});

// ==========================================
// 2. SELEÇÃO DE PACOTES E LIBERAÇÃO PIX
// ==========================================
function selecionarPacote(qtd, preco) {
  pacoteSelecionado = qtd;
  valorSelecionado = preco;

  const card5 = document.getElementById('pacote-5');
  const card10 = document.getElementById('pacote-10');

  if (card5 && card10) {
    if (qtd === 5) {
      card5.classList.add('active');
      card10.classList.remove('active');
    } else {
      card10.classList.add('active');
      card5.classList.remove('active');
    }
  }
}

function gerarPix() {
  perguntasRestantes = pacoteSelecionado;

  const contadorEl = document.getElementById('qtd-perguntas');
  if (contadorEl) {
    contadorEl.innerText = perguntasRestantes;
  }

  const secaoJogada = document.getElementById('secao-jogada');
  if (secaoJogada) {
    secaoJogada.style.display = 'block';
    secaoJogada.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================
// 3. ANIMAÇÃO SVG E JOGADA COMPLETA DE BÚZIOS
// ==========================================
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
      </svg>
    `;
  }
}

document.getElementById('form-consulta')?.addEventListener('submit', function (e) {
  e.preventDefault();

  if (perguntasRestantes <= 0) {
    alert("Seu saldo de consultas acabou! Selecione um pacote para liberar mais perguntas.");
    const secaoPacotes = document.getElementById('secao-pacotes');
    if (secaoPacotes) secaoPacotes.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const pergunta = document.getElementById('pergunta').value;
  const area = document.getElementById('area-foco').value;
  const btn = document.getElementById('btn-jogar');
  btn.disabled = true;

  const mesa = document.getElementById('mesa-buzios');
  const peneira = document.getElementById('peneira');
  const status = document.getElementById('status-jogo');
  const resContainer = document.getElementById('resultado-leitura');

  mesa.style.display = 'block';
  peneira.innerHTML = '';
  resContainer.style.display = 'none';

  mesa.scrollIntoView({ behavior: 'smooth', block: 'center' });
  mesa.classList.add('mesa-chacoalhando');

  // Sorteio de Búzios Abertos (1 a 16)
  const numAbertos = Math.floor(Math.random() * 16) + 1;
  const odulido = ODUS_JOGO[numAbertos] || ODUS_JOGO[16];
  const infoNascimento = ODUS_NASCIMENTO[numAbertos] || ODUS_NASCIMENTO[16];

  // Renderiza os 16 Búzios na Peneira
  for (let i = 0; i < 16; i++) {
    const eAberto = i < numAbertos;
    const buzioEl = document.createElement('div');
    buzioEl.className = 'buzio';
    buzioEl.innerHTML = criarBuzioSVG(eAberto);

    const top = Math.floor(Math.random() * 60 + 20);
    const left = Math.floor(Math.random() * 60 + 20);
    const rot = Math.floor(Math.random() * 360);

    buzioEl.style.top = `${top}%`;
    buzioEl.style.left = `${left}%`;
    buzioEl.style.transform = `rotate(${rot}deg)`;

    peneira.appendChild(buzioEl);
  }

  status.innerText = "🔮 Chacoalhando e lançando os búzios sagrados...";

  setTimeout(() => {
    mesa.classList.remove('mesa-chacoalhando');
    status.innerText = "✨ Lendo a posição das caídas e a vontade dos Orixás...";
  }, 1200);

  setTimeout(() => {
    // Desconta a consulta utilizada
    perguntasRestantes--;
    const contadorEl = document.getElementById('qtd-perguntas');
    if (contadorEl) contadorEl.innerText = perguntasRestantes;

    status.innerText = "✓ Consulta concluída!";

    resContainer.innerHTML = `
      <div style="background: #0b0612; padding: 18px; border-radius: 10px; border: 1px solid var(--gold-accent);">
        
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #332147; padding-bottom: 10px; margin-bottom: 12px; flex-wrap: wrap;">
          <span style="color: var(--gold-accent); font-weight: bold; font-size: 0.9rem;">
            🐚 Caída: ${numAbertos} Búzios Abertos / ${16 - numAbertos} Fechados
          </span>
          <span style="font-size: 0.85rem; color: var(--text-sub);">Área: <strong>${area}</strong></span>
        </div>

        <h3 style="color: var(--gold-light); font-size: 1.3rem; margin-bottom: 6px;">
          ${odulido.tendencia} — Odù ${infoNascimento.nome}
        </h3>
        <p style="color: var(--gold-accent); font-size: 0.95rem; font-weight: 600; margin-bottom: 14px;">
          ${odulido.titulo} (Regência de ${infoNascimento.orixa})
        </p>

        <div class="favorability-container">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--gold-light);">
            <span>Favorabilidade da Questão</span>
            <span>${odulido.favorabilidade}%</span>
          </div>
          <div class="favorability-bar-bg">
            <div class="favorability-bar-fill" style="width: ${odulido.favorabilidade}%;"></div>
          </div>
        </div>

        <div style="margin: 16px 0; background: #150a24; padding: 14px; border-radius: 8px; border-left: 3px solid var(--gold-accent);">
          <p style="font-size: 0.88rem; color: var(--text-sub); font-style: italic; margin-bottom: 6px;">" ${pergunta} "</p>
          <p style="font-size: 0.95rem; color: #fff; line-height: 1.5;">
            <strong>Interpretação do Oráculo:</strong> ${odulido.desc} Para a área de <strong>${area.toLowerCase()}</strong>, a regência de ${infoNascimento.orixa} sob o elemento ${infoNascimento.elemento} orienta que você aja com prudência e foco nos seus objetivos primordiais.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-top: 14px;">
          <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 6px; border: 1px solid rgba(16, 185, 129, 0.2);">
            <strong style="color: #34D399; font-size: 0.85rem;">✨ Ponto Favorável:</strong>
            <p style="font-size: 0.85rem; color: var(--text-main); margin-top: 2px;">${infoNascimento.fortes[0]}</p>
          </div>
          <div style="background: rgba(239, 68, 68, 0.1); padding: 10px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.2);">
            <strong style="color: #FCA5A5; font-size: 0.85rem;">⚠️ Ponto de Atenção:</strong>
            <p style="font-size: 0.85rem; color: var(--text-main); margin-top: 2px;">${infoNascimento.alertas[0]}</p>
          </div>
        </div>

      </div>
    `;

    resContainer.style.display = 'block';
    resContainer.scrollIntoView({ behavior: 'smooth' });
    btn.disabled = false;
  }, 2600);
});
