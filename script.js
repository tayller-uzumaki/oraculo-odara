/* ==========================================
   ORÁCULO ODARA - LÓGICA, RITUAL, SEGURANÇA & LEITURA ROBUSTA
   ========================================== */

let consultasRestantes = 0;
let pacoteSelecionado = { quantidade: 5, valor: 25.99 };

// 1. MAPEAMENTO COMPLETO DOS 16 ODÙS
const ODUS_MAP = {
  0: { 
    nome: "Opira", 
    orixa: "Obaluaiê / Omolu", 
    elemento: "Terra", 
    tendenciaPadrao: "NÃO",
    caminho: "Momento de recolhimento absoluto, cautela e preservação. O momento exige parar, analisar e proteger seus recursos.",
    espiritual: "Necessidade urgente de limpeza energética e fortalecimento de proteção de ancestralidade.",
    fortes: "Excelente para planejar em silêncio, evitar exposição desnecessária e acumular forças internas.",
    alertas: "Evite assinar contratos de risco, expor planos a terceiros ou tomar decisões sob impulso emocional.",
    orientacao: "Acenda uma vela branca para seu anjo da guarda e faça um banho de manjericão morno para acalmar os pensamentos."
  },
  1: { 
    nome: "Okaran", 
    orixa: "Exu", 
    elemento: "Fogo", 
    tendenciaPadrao: "AINDA NÃO",
    caminho: "Caminhos de transformação rápida, imprevistos e dinamismo. As coisas estão se movimentando, mas exigem clareza antes do fechamento.",
    espiritual: "Exu solicita atenção à comunicação e ao equilíbrio interpessoal. Há energias em conflito no ar.",
    fortes: "Garra, astúcia para contornar problemas e capacidade de reagir rápido a mudanças de cenário.",
    alertas: "Cuidado com mal-entendidos, discussões acaloradas e palavras ditas sem pensar.",
    orientacao: "Trabalhe a paciência. Antes de agir, certifique-se de que possui todos os fatos reais em mãos."
  },
  2: { 
    nome: "Ejioko", 
    orixa: "Ibejis / Ogum", 
    elemento: "Terra", 
    tendenciaPadrao: "SIM",
    caminho: "Dualidade, parcerias, união e firmeza de propósitos. Indica caminhos propícios para sociedades e alianças estratégicas.",
    espiritual: "Harmonia entre energias complementares e proteção da infância e da alegria.",
    fortes: "Facilidade de associação, poder de negociação e equilíbrio nas decisões divididas.",
    alertas: "Evite a indecisão prolongada entre duas opções igualmente atraentes.",
    orientacao: "Busque conselhos de pessoas neutras e experientes para firmar sua escolha."
  },
  3: { 
    nome: "Etaogundá", 
    orixa: "Ogum", 
    elemento: "Ferro / Fogo", 
    tendenciaPadrao: "SIM",
    caminho: "Superação de obstáculos através do trabalho e da coragem. Vitórias obtidas mediante esforço contínuo.",
    espiritual: "Ogum abre caminhos cortando amarras e protegendo contra demandas diretas.",
    fortes: "Foco inabalável, determinação, força para vencer disputas jurídicas ou profissionais.",
    alertas: "Atenção ao excesso de rigidez e ao estresse por querer resolver tudo sozinho.",
    orientacao: "Mantenha a postura ereta e a estratégia clara. A vitória virá pelo mérito de sua dedicação."
  },
  4: { 
    nome: "Irosun", 
    orixa: "Iemanjá / Oxóssi", 
    elemento: "Fogo / Água", 
    tendenciaPadrao: "AINDA NÃO",
    caminho: "Intuição afiada, proteção ancestral e necessidade de enxergar além das aparências.",
    espiritual: "Alerta de ancestralidade: seus guias estão tentando lhe soprar avisos importantes.",
    fortes: "Sensibilidade aguçada, visão estratégica a longo prazo e acolhimento emocional.",
    alertas: "Cuidado com ilusões e falsas promessas de facilidade imediata.",
    orientacao: "Escute seu sexto sentido. Se algo parece estranho no fundo do seu coração, recue e investigue."
  },
  5: { 
    nome: "Oxé", 
    orixa: "Oxum", 
    elemento: "Água", 
    tendenciaPadrao: "SIM",
    caminho: "Prosperidade, sensibilidade, beleza, renovação e caminhos abertos para o sucesso e o afeto.",
    espiritual: "Bênção das águas doces trazendo purificação, fertilidade de projetos e magnetismo.",
    fortes: "Charmoso poder de persuasão, intuição para bons negócios e atração de abundância.",
    alertas: "Não deixe a vaidade ou o apego excessivo a detalhes superficiais atrapalharem o progresso.",
    orientacao: "Cuide da sua autoestima e vista-se de confiança ao apresentar suas ideias."
  },
  6: { 
    nome: "Obará", 
    orixa: "Xangô / Oxóssi", 
    elemento: "Ar / Terra", 
    tendenciaPadrao: "SIM",
    caminho: "Grande riqueza, fartura, expansão e sorte nos negócios. Odù de prosperidade máxima.",
    espiritual: "Xangô e Oxóssi abençoam a justiça e a caça do sustento material.",
    fortes: "Magnetismo financeiro, liderança, reconhecimento de méritos e superação de crises.",
    alertas: "Evite ostentação e ajude quem esteve com você nos momentos difíceis.",
    orientacao: "Compartilhe a boa sorte e invista em seu crescimento pessoal e profissional."
  },
  7: { 
    nome: "Odi", 
    orixa: "Obaluaiê / Oxóssi", 
    elemento: "Terra", 
    tendenciaPadrao: "NÃO",
    caminho: "Resistência, persistência e quebra de amarras antigas. Período que pede quebra de rotinas presas ao passado.",
    espiritual: "Necessidade de libertar sentimentos guardados e padrões repetitivos tóxicos.",
    fortes: "Resiliência extraordinária, independência e força de vontade.",
    alertas: "Teimosia em manter estruturas que já não funcionam mais.",
    orientacao: "Desapegue do passado. Renove seu espaço físico e livre-se do que está quebrado ou sem uso."
  },
  8: { 
    nome: "Ejiologbon", 
    orixa: "Nanã / Oxalufã", 
    elemento: "Terra / Água", 
    tendenciaPadrao: "AINDA NÃO",
    caminho: "Sabedoria da maturidade, reflexão profunda e calma. O tempo dos orixás exige paciência.",
    espiritual: "Nanã indica que o fruto precisa amadurecer no tempo certo sem pressa.",
    fortes: "Decisões ponderadas, experiência acumulada e paz mental.",
    alertas: "Acomodação, desânimo ou lentidão excessiva para dar passos necessários.",
    orientacao: "Respeite o tempo dos processos. Acelerar o passo agora pode estragar o resultado."
  },
  9: { 
    nome: "Osa", 
    orixa: "Oyá (Iansã)", 
    elemento: "Ar", 
    tendenciaPadrao: "SIM",
    caminho: "Ventos de mudança, movimento, intuição e liberdade. Ruptura com o estagnado.",
    espiritual: "Iansã varre as energias negativas e abre o caminho para o novo com velocidade.",
    fortes: "Coragem para recomeçar, carisma, rapidez mental e intuição afiada.",
    alertas: "Inconstância, agir no impulso da raiva ou abandonar tarefas no meio.",
    orientacao: "Aproveite a onda de mudança, mas mantenha os pés firmes no chão."
  },
  10: { 
    nome: "Ofun", 
    orixa: "Oxalá", 
    elemento: "Ar / Espaço", 
    tendenciaPadrao: "SIM",
    caminho: "Paz, pureza, bênçãos elevadas e respeito ao sagrado. Triunfo da verdade.",
    espiritual: "Proteção máxima de Oxalá, trazendo clareza e solução harmoniosa.",
    fortes: "Autoridade moral, serenidade, respeito e capacidade de pacificação.",
    alertas: "Cuidado com o orgulho ou com tentar impor verdades absolutas aos outros.",
    orientacao: "Mantenha pensamentos puros e busque a conciliação pacífica."
  },
  11: { 
    nome: "Owonrin", 
    orixa: "Exu / Oyá", 
    elemento: "Fogo / Ar", 
    tendenciaPadrao: "AINDA NÃO",
    caminho: "Imprevistos produtivos, dinamismo e necessidade de flexibilidade imediata.",
    espiritual: "Giro de sorte que exige agilidade de adaptação.",
    fortes: "Adaptabilidade, rapidez de raciocínio e visão de oportunidades ocultas.",
    alertas: "Falta de foco, espalhar energia em vários objetivos ao mesmo tempo.",
    orientacao: "Defina uma prioridade clara e não se distraia com promessas secundárias."
  },
  12: { 
    nome: "Ejila Ebora", 
    orixa: "Xangô", 
    elemento: "Fogo", 
    tendenciaPadrao: "SIM",
    caminho: "Justiça, liderança, vitória sobre demandas e firmeza de propósito em causas e acordos.",
    espiritual: "O Machado de Xangô pesa a favor da razão e da verdade dos fatos.",
    fortes: "Triunfo em processos, liderança natural, justiça e retidão.",
    alertas: "Arrogância ou tentar fazer justiça com as próprias mãos.",
    orientacao: "Confie na lei e no direito correto. Mantenha seus papéis e atitudes organizados."
  },
  13: { 
    nome: "Ejiologbon (Okanran Meji)", 
    orixa: "Nanã", 
    elemento: "Terra", 
    tendenciaPadrao: "NÃO",
    caminho: "Transformação espiritual e encerramento obrigatório de ciclos antigos.",
    espiritual: "Renovação profunda. Aceitação necessária para o surgimento do novo.",
    fortes: "Capacidade de desapego, purificação e renovação de forças.",
    alertas: "Resistência a aceitar o encerramento natural de um ciclo que expirou.",
    orientacao: "Feche a porta do passado com dignidade para que a nova porta se abra."
  },
  14: { 
    nome: "Iká", 
    orixa: "Oxumarê", 
    elemento: "Água / Ar", 
    tendenciaPadrao: "SIM",
    caminho: "Renovação contínua, sabedoria estratégica, flexibilidade e novos ciclos de ganhos.",
    espiritual: "O Arco-Íris de Oxumarê traz renovação após a tempestade.",
    fortes: "Visão estratégica, flexibilidade para contornar crises e sorte renovada.",
    alertas: "Falta de constância ou desviar-se do plano original no meio do caminho.",
    orientacao: "Aja com diplomacia e flexibilidade diante das curvas da vida."
  },
  15: { 
    nome: "Ibeji / Ogbè", 
    orixa: "Obá / Ewá", 
    elemento: "Ar", 
    tendenciaPadrao: "SIM",
    caminho: "Conquistas pela perspicácia, intuição refinada e proteção em momentos críticos.",
    espiritual: "Percepção refinada de perigos e proteção contra falsidades.",
    fortes: "Foco, intuição aguçada e perspicácia em negociações difíceis.",
    alertas: "Isolamento emocional e desconfiança excessiva de tudo e de todos.",
    orientacao: "Confie em sua percepção interna e mantenha a atenção nos pequenos detalhes."
  },
  16: { 
    nome: "Alafia", 
    orixa: "Oxalá / Todos os Orixás", 
    elemento: "Luz", 
    tendenciaPadrao: "SIM",
    caminho: "Luz total, confirmação plena, paz e bênção máxima para a realização do objetivo.",
    espiritual: "Confirmação absoluta dos orixás, plenitude e caminhos totalmente abertos.",
    fortes: "Paz, clareza absoluta, êxito total e proteção espiritual máxima.",
    alertas: "Apenas gratidão e cuidado para manter a humildade perante o sagrado.",
    orientacao: "Siga em frente com determinação total. Os caminhos estão abertos e iluminados."
  }
};

// CÁLCULO GRATUITO DO ODÙ DE NASCIMENTO
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

  const infoOdu = ODUS_MAP[numOdu] || ODUS_MAP[16];

  document.getElementById('odu-numero').textContent = numOdu;
  document.getElementById('odu-nome').textContent = infoOdu.nome;
  document.getElementById('odu-orixa').textContent = infoOdu.orixa;
  document.getElementById('odu-elemento').textContent = infoOdu.elemento;
  document.getElementById('odu-caminho').textContent = infoOdu.caminho;
  document.getElementById('transicao-nome-odu').textContent = infoOdu.nome;

  const painelOdu = document.getElementById('resultado-odu');
  painelOdu.style.display = 'block';
  painelOdu.scrollIntoView({ behavior: 'smooth' });
});

// SELEÇÃO DE PACOTES E PAGAMENTO
function selecionarPacote(qtd, valor) {
  pacoteSelecionado = { quantidade: qtd, valor: valor };
  document.querySelectorAll('.pacote-card, .package-card').forEach(card => card.classList.remove('active'));
  const el = document.getElementById(`pacote-${qtd}`);
  if (el) el.classList.add('active');
}

function gerarPix() {
  consultasRestantes += pacoteSelecionado.quantidade;
  document.getElementById('qtd-perguntas').textContent = consultasRestantes;
  alert(`✨ Pagamento simulado com sucesso!\n\nForam adicionadas ${pacoteSelecionado.quantidade} consultas ao seu saldo.`);
  const secaoJogada = document.getElementById('secao-jogada');
  secaoJogada.style.display = 'block';
  secaoJogada.scrollIntoView({ behavior: 'smooth' });
}

// 🛑 TRAVA DE SEGURANÇA E DETECÇÃO DE RISCO (SAÚDE MENTAL)
function verificarGatilhoSeguranca(texto) {
  const termosRisco = [
    'morrer', 'suicidio', 'suicídio', 'me matar', 'querer morrer', 
    'tirar minha vida', 'fim da minha vida', 'nao quero mais viver', 
    'não quero mais viver', 'acabar com tudo', 'auto exterminio', 'se matar'
  ];
  const textoLower = texto.toLowerCase();
  return termosRisco.some(termo => textoLower.includes(termo));
}

// 🔍 DETECÇÃO DE PERGUNTAS SOBRE ORIXÁS DE CABEÇA
function verificarPerguntaOrixaCabeça(texto) {
  const termosOrixa = [
    'meu orixa', 'meus orixas', 'orixá de cabeça', 'orixa de cabeça', 
    'orixá de frente', 'orixa de frente', 'junto', 'juntó', 'ancestral', 
    'quem é meu orixá', 'quem e meu orixa', 'quais sao meus orixas', 'qual meu orixa'
  ];
  const textoLower = texto.toLowerCase();
  return termosOrixa.some(termo => textoLower.includes(termo));
}

// 🔮 RITUAL DA JOGADA DOS BÚZIOS (COM FÍSICA REALISTA & LEITURA COMPLETA)
document.getElementById('form-consulta')?.addEventListener('submit', function (e) {
  e.preventDefault();

  if (consultasRestantes <= 0) {
    alert("Você precisa adquirir um pacote de consultas para realizar a jogada.");
    document.getElementById('secao-pacotes').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const pergunta = document.getElementById('pergunta').value;
  const area = document.getElementById('area-foco').value;
  const painelResultado = document.getElementById('resultado-leitura');

  // 1. CHECAGEM IMEDIATA DE SEGURANÇA
  if (verificarGatilhoSeguranca(pergunta)) {
    painelResultado.className = "card box-alerta-seguranca";
    painelResultado.innerHTML = `
      <div style="text-align: center;">
        <h3 style="color: #F87171; font-size: 1.3rem; margin-bottom: 12px;">💛 Você Não Está Sozinho(a)</h3>
        <p style="color: #F8F5F0; font-size: 0.95rem; margin-bottom: 16px; line-height: 1.6;">
          Percebemos que você está passando por um momento de dor ou exaustão profunda. O Oráculo Odara preza antes de tudo pela sua vida e pelo seu bem-estar.
        </p>
        <div style="background: rgba(0,0,0,0.4); padding: 16px; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.4); margin-bottom: 16px; text-align: left;">
          <p style="color: #FCA5A5; font-weight: bold; margin-bottom: 6px;">Procure apoio profissional e acolhimento gratuito agora mesmo:</p>
          <ul style="color: #F8F5F0; font-size: 0.9rem; list-style: none; padding: 0;">
            <li style="margin-bottom: 6px;">📞 <strong>CVV (Centro de Valorização da Vida):</strong> Ligue <strong>188</strong> (Gratuito, 24 horas por dia, sigiloso).</li>
            <li>💬 <strong>Chat Online:</strong> Acesse <a href="https://www.cvv.org.br" target="_blank" style="color: #60A5FA; text-decoration: underline;">www.cvv.org.br</a> para conversar com um voluntário.</li>
          </ul>
        </div>
        <p style="color: #C9C4D6; font-size: 0.88rem;">Sua vida tem um valor inestimável para o mundo e para as forças que regem a existência. Por favor, busque ajuda humana e acolhedora neste momento.</p>
      </div>
    `;
    painelResultado.style.display = 'block';
    painelResultado.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  // 2. INÍCIO DO RITUAL DE LANÇAMENTO
  const mesa = document.getElementById('mesa-buzios');
  const peneira = document.getElementById('peneira');
  const btnJogar = document.getElementById('btn-jogar');

  btnJogar.disabled = true;
  painelResultado.style.display = 'none';
  peneira.innerHTML = '';
  mesa.style.display = 'block';

  mesa.classList.add('mesa-chacoalhando');

  let statusTexto = document.getElementById('status-jogo');
  if (!statusTexto) {
    statusTexto = document.createElement('p');
    statusTexto.id = 'status-jogo';
    statusTexto.style.cssText = "text-align: center; color: var(--gold-light); font-weight: 600; margin-top: 15px; font-family: 'Cinzel', serif;";
    mesa.parentNode.insertBefore(statusTexto, mesa.nextSibling);
  }

  statusTexto.textContent = "🔮 Chacoalhando os búzios e evocando as forças ancestrais...";

  // 2.1 PARADA DO CHACOALHO & LANÇAMENTO DOS BÚZIOS (2 SEG DE MOVIMENTO)
  setTimeout(() => {
    mesa.classList.remove('mesa-chacoalhando');
    statusTexto.textContent = "🍃 Lançando os 16 búzios sagrados sobre a mesa de jogo...";

    const buziosAbertos = Math.floor(Math.random() * 17);
    const buziosFechados = 16 - buziosAbertos;
    const oduSorteado = ODUS_MAP[buziosAbertos] || ODUS_MAP[16];

    // Desenhar e disparar os 16 búzios com física deslizando do centro
    for (let i = 0; i < 16; i++) {
      const buzio = document.createElement('div');
      buzio.className = 'buzio-item buzio-lancando';
      const isOpen = i < buziosAbertos;

      buzio.innerHTML = isOpen ? `
        <svg viewBox="0 0 40 60">
          <ellipse cx="20" cy="30" rx="16" ry="26" fill="#F8F5F0" stroke="#D4AF37" stroke-width="2"/>
          <ellipse cx="20" cy="30" rx="8" ry="16" fill="#120A1F" stroke="#8B5CF6" stroke-width="1.5"/>
          <line x1="20" y1="10" x2="20" y2="50" stroke="#D4AF37" stroke-width="1.5"/>
        </svg>
      ` : `
        <svg viewBox="0 0 40 60">
          <ellipse cx="20" cy="30" rx="16" ry="26" fill="#EAD9C9" stroke="#8B5CF6" stroke-width="2"/>
          <line x1="20" y1="8" x2="20" y2="52" stroke="#5A3A7E" stroke-width="2"/>
        </svg>
      `;

      // Começam agrupados no centro da mesa
      buzio.style.left = `160px`;
      buzio.style.top = `120px`;
      peneira.appendChild(buzio);

      // Trajetória randômica para onde vão deslizar e girar
      const angle = Math.random() * Math.PI * 2;
      const radius = 25 + Math.random() * 115; 
      const finalX = 160 + radius * Math.cos(angle);
      const finalY = 120 + radius * Math.sin(angle);
      const finalRot = Math.floor(Math.random() * 720) - 360; // Gira até 2 voltas

      // Pequeno escalonamento no disparo
      setTimeout(() => {
        buzio.style.left = `${finalX}px`;
        buzio.style.top = `${finalY}px`;
        buzio.style.transform = `rotate(${finalRot}deg) scale(1)`;
        buzio.style.opacity = '1';
      }, i * 35);
    }

    // 2.2 PAUSA DRAMÁTICA DE 2 SEGUNDOS COM BÚZIOS PARADOS
    setTimeout(() => {
      statusTexto.textContent = "✨ Búzios assentados. Revelando a mensagem do Oráculo...";
    }, 2000);

    // 2.3 APÓS A PAUSA DRAMÁTICA, RENDERIZA A RESPOSTA COMPLETA
    setTimeout(() => {
      statusTexto.textContent = "";
      consultasRestantes--;
      document.getElementById('qtd-perguntas').textContent = consultasRestantes;

      const favorabilidade = Math.min(100, Math.max(15, Math.floor((buziosAbertos / 16) * 100) + Math.floor(Math.random() * 10)));
      const isPerguntaOrixa = verificarPerguntaOrixaCabeça(pergunta);

      painelResultado.className = "card card-resultado-dark";

      // SE FOR PERGUNTA SOBRE ORIXÁS DE CABEÇA
      if (isPerguntaOrixa) {
        painelResultado.innerHTML = `
          <div style="border-bottom: 1px solid var(--card-border); padding-bottom: 12px; margin-bottom: 18px;">
            <span style="color: var(--gold-accent); font-size: 0.8rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Mapeamento Ancestral da Cabeça (Ori)</span>
            <h3 style="font-size: 1.4rem; color: var(--gold-light); margin-top: 4px;">Cruz Oracular dos Orixás (${buziosAbertos} Búzios Abertos)</h3>
          </div>

          <div style="background: rgba(18, 10, 31, 0.7); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px; padding: 18px; margin-bottom: 18px;">
            <h4 style="color: var(--gold-accent); font-size: 1.1rem; margin-bottom: 8px;">👑 Orixá Regente de Frente (Guia Principal):</h4>
            <p style="font-size: 1.05rem; font-weight: 600; color: #FFF; margin-bottom: 4px;">${oduSorteado.orixa}</p>
            <p style="color: var(--text-muted); font-size: 0.92rem;">Sua caminhada é regida pela energia de ${oduSorteado.orixa}. Este Orixá molda sua personalidade, sua determinação para enfrentar desafios e o seu propósito divino nesta existência.</p>
          </div>

          <div style="background: rgba(18, 10, 31, 0.7); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; padding: 18px; margin-bottom: 18px;">
            <h4 style="color: var(--purple-accent); font-size: 1.1rem; margin-bottom: 8px;">🛡️ Orixá Juntó / Ancestral (Sustentação & Equilíbrio):</h4>
            <p style="color: var(--text-muted); font-size: 0.92rem;">Os búzios em posição lateral indicam a força de sustentação e contraponto emocional, garantindo que a sua força de frente não entre em excessos. Esta energia protege seus passos e traz equilíbrio nas crises.</p>
          </div>

          <div class="box-destaque-dark">
            <h4 style="color: var(--gold-accent); margin-bottom: 6px;">💡 Diretriz para o seu Ori (Sua Consciência):</h4>
            <p style="color: var(--text-main);">Alimente sua cabeça com pensamentos de paz. Evite desgastes com ambientes pesados, cultive momentos de silêncio e busque fortalecer sua intuição através de preces e contato com a natureza.</p>
          </div>
        `;
      } 
      // SE FOR PERGUNTA GERAL OU OBJETIVA (ESTRUTURA DE 7 BLOCOS)
      else {
        // Definição da Tendência Direta
        let tendencia = oduSorteado.tendenciaPadrao;
        let corBadge = "#10B981"; // Verde (SIM)
        if (tendencia === "NÃO") corBadge = "#EF4444"; // Vermelho
        if (tendencia === "AINDA NÃO") corBadge = "#F59E0B"; // Amarelo/Laranja

        painelResultado.innerHTML = `
          <!-- 1. RESPOSTA DIRETA -->
          <div style="background: rgba(18, 10, 31, 0.8); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px; padding: 18px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <div>
              <span style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Tendência da Resposta</span>
              <h3 style="font-size: 1.3rem; color: #FFF; margin-top: 2px;">Para a pergunta: <span style="font-style: italic; color: var(--gold-light);">"${pergunta}"</span></h3>
            </div>
            <div style="background: ${corBadge}; color: #FFF; font-weight: 700; font-size: 1.1rem; padding: 8px 22px; border-radius: 25px; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
              TENDÊNCIA: ${tendencia}
            </div>
          </div>

          <!-- 2. EXPLICAÇÃO DO ODÙ REVELADO -->
          <div style="border-bottom: 1px solid var(--card-border); padding-bottom: 14px; margin-bottom: 16px;">
            <h4 style="color: var(--gold-accent); font-size: 1.15rem;">🔮 Odù ${oduSorteado.nome} (${buziosAbertos} Búzios Abertos / ${buziosFechados} Fechados)</h4>
            <p style="color: var(--text-main); margin-top: 6px;">${oduSorteado.caminho} Aplicando este regimento à área de <strong>${area}</strong>, a mesa oracular revela a conjuntura exata das suas forças atuais.</p>
          </div>

          <!-- 3. INFLUÊNCIAS ESPIRITUAIS ASSOCIADAS -->
          <div style="margin-bottom: 18px;">
            <h4 style="color: var(--gold-light); font-size: 1rem; margin-bottom: 4px;">🕊️ Influências Espirituais e Orixá Regente:</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem;">A energia dominante nesta queda vem de <strong style="color: var(--gold-accent);">${oduSorteado.orixa}</strong> (Elemento: ${oduSorteado.elemento}). ${oduSorteado.espiritual}</p>
          </div>

          <!-- 4. FATORES FAVORÁVEIS (PONTOS FORTES) -->
          <div style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10B981; padding: 14px; border-radius: 6px; margin-bottom: 14px;">
            <h4 style="color: #34D399; font-size: 0.98rem; margin-bottom: 4px;">🌟 Fatores Favoráveis e Pontos Fortes:</h4>
            <p style="color: var(--text-main); font-size: 0.93rem;">${oduSorteado.fortes}</p>
          </div>

          <!-- 5. PONTOS DE ATENÇÃO (ALERTAS) -->
          <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #EF4444; padding: 14px; border-radius: 6px; margin-bottom: 18px;">
            <h4 style="color: #FCA5A5; font-size: 0.98rem; margin-bottom: 4px;">⚠️ Pontos de Atenção e Alertas:</h4>
            <p style="color: var(--text-main); font-size: 0.93rem;">${oduSorteado.alertas}</p>
          </div>

          <!-- 6. ORIENTAÇÕES PRÁTICAS PARA O CONSULENTE -->
          <div class="box-destaque-dark" style="margin-bottom: 18px;">
            <h4 style="color: var(--gold-accent); margin-bottom: 6px;">💡 Orientações Práticas do Oráculo:</h4>
            <p style="color: var(--text-main); font-size: 0.94rem;">${oduSorteado.orientacao}</p>
          </div>

          <!-- 7. MENSAGEM FINAL DE REFLEXÃO -->
          <div style="text-align: center; border-top: 1px dashed rgba(255, 255, 255, 0.15); padding-top: 14px; margin-top: 10px;">
            <p style="color: var(--text-muted); font-size: 0.88rem; font-style: italic;">
              "O oráculo não determina um destino imutável, mas sim ilumina o caminho com sabedoria ancestral para que você tome as melhores decisões."
            </p>
          </div>
        `;
      }

      painelResultado.style.display = 'block';
      painelResultado.scrollIntoView({ behavior: 'smooth' });
      btnJogar.disabled = false;
    }, 4000); // 2 segundos deslizando + 2 segundos de pausa dramática

  }, 1200); // Duração do chacoalho inicial
});
