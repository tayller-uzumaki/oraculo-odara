// DADOS DOS ODÙS PARA CALCULADORA DA ETAPA 1
const odusMatriz = [
  { nome: "Okaran", desc: "Regido por Exu. Revela força de superação, garra, liderança e independência para vencer obstáculos." },
  { nome: "Ejiokô", desc: "Regido pelos Ibejis e Ogum. Representa caminhos duplos, intuição, busca por estabilidade e união." },
  { nome: "Etaogundá", desc: "Regido por Ogum. Força de trabalho, justiça, superação de desafios e conquistas com coragem." },
  { nome: "Irossun", desc: "Regido por Iemanjá e Oxossi. Traz intuição profunda, proteção dos ancestrais e clareza de visão." },
  { nome: "Obará", desc: "Regido por Oxóssi e Xangô. O Odù da prosperidade, da fartura, do brilho pessoal e da realização." },
  { nome: "Obará Meji", desc: "Regido por Xangô. Justiça, equilíbrio, expansão de negócios e força de realização." },
  { nome: "Odi", desc: "Regido por Obaluaiê. Sabedoria de vida, renovação, perseverança e firmeza de propósitos." },
  { nome: "Ejiologbon", desc: "Regido por Nanã. Calma, maturação de planos, ponderação e sabedoria ancestral." }
];

let oduUsuario = null;

// SVG ANATÔMICO DO BÚZIO ABERTO
const svgBuzioAberto = `
<svg width="45" height="60" viewBox="0 0 60 80" fill="none" class="buzio-svg">
  <defs>
    <radialGradient id="shell-body" cx="30" cy="35" r="28" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="55%" stop-color="#F7F1E5"/>
      <stop offset="85%" stop-color="#E5D3B3"/>
      <stop offset="100%" stop-color="#C2A882"/>
    </radialGradient>
    <linearGradient id="slit-depth" x1="30" y1="12" x2="30" y2="68" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#3A281A"/>
      <stop offset="50%" stop-color="#1A0F0A"/>
      <stop offset="100%" stop-color="#3A281A"/>
    </linearGradient>
  </defs>
  <path d="M 30 6 C 14 6, 6 22, 7 42 C 8 58, 18 72, 30 73 C 42 72, 52 58, 53 42 C 54 22, 46 6, 30 6 Z" fill="url(#shell-body)" stroke="#B59A72" stroke-width="1.2"/>
  <path d="M 30 14 C 25 22, 24 38, 25 50 C 26 58, 28 64, 30 64 C 32 64, 34 58, 35 50 C 36 38, 35 22, 30 14 Z" fill="url(#slit-depth)"/>
  <path d="M 18 22 L 26 23 M 17 28 L 25 28.5 M 16 34 L 25 34 M 16 40 L 25 39.5 M 17 46 L 25 45" stroke="#FDFBF7" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M 42 22 L 34 23 M 43 28 L 35 28.5 M 44 34 L 35 34 M 44 40 L 35 39.5 M 43 46 L 35 45" stroke="#FDFBF7" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;

// SVG ANATÔMICO DO BÚZIO FECHADO (COM CORTE TRADICIONAL)
const svgBuzioFechado = `
<svg width="45" height="60" viewBox="0 0 60 80" fill="none" class="buzio-svg">
  <defs>
    <radialGradient id="shell-back" cx="30" cy="40" r="30" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFDF9"/>
      <stop offset="50%" stop-color="#F0E2CE"/>
      <stop offset="80%" stop-color="#D6C0A0"/>
      <stop offset="100%" stop-color="#A88B63"/>
    </radialGradient>
    <radialGradient id="inner-cut" cx="30" cy="40" r="15" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1F150E"/>
      <stop offset="70%" stop-color="#423123"/>
      <stop offset="100%" stop-color="#735B43"/>
    </radialGradient>
  </defs>
  <path d="M 30 6 C 14 6, 6 22, 7 42 C 8 58, 18 72, 30 73 C 42 72, 52 58, 53 42 C 54 22, 46 6, 30 6 Z" fill="url(#shell-back)" stroke="#A0835B" stroke-width="1.2"/>
  <ellipse cx="30" cy="40" rx="19" ry="26" fill="none" stroke="#DDA15E" stroke-width="2.5" opacity="0.4"/>
  <ellipse cx="30" cy="41" rx="12" ry="18" fill="url(#inner-cut)" stroke="#A0835B" stroke-width="1"/>
</svg>`;

// 1. CALCULAR ODÙ DIRETOR
function calcularOdu(event) {
  event.preventDefault();
  const data = document.getElementById('data-nascimento').value;
  if (!data) return;

  const numeros = data.replace(/-/g, '').split('').map(Number);
  const soma = numeros.reduce((a, b) => a + b, 0);
  const index = (soma % odusMatriz.length);
  
  oduUsuario = odusMatriz[index];

  document.getElementById('nome-odu-revelado').innerText = oduUsuario.nome;
  document.getElementById('desc-odu-revelado').innerText = oduUsuario.desc + " Agora que sua regência foi ativada, faça sua pergunta na Mesa de Búzios abaixo.";
  document.getElementById('resultado-odu').classList.remove('hidden');
}

function rolarParaMesa() {
  document.getElementById('etapa-2').scrollIntoView({ behavior: 'smooth' });
}

// 2. REALIZAR CONSULTA / RITUAL DOS BÚZIOS
async function realizarConsulta(event) {
  event.preventDefault();

  const pergunta = document.getElementById('pergunta').value;
  const areaFoco = document.getElementById('area-foco').value;
  const nome = document.getElementById('nome-usuario').value;

  // Lançar Búzios Aleatórios (16 búzios)
  const qtdAbertos = Math.floor(Math.random() * 16) + 1;
  const mesa = document.getElementById('mesa-buzios');
  mesa.innerHTML = '';

  // Renderizar Búzios na Mesa com posições e rotações orgânicas
  for (let i = 0; i < 16; i++) {
    const isAberto = i < qtdAbertos;
    const div = document.createElement('div');
    div.className = 'buzio-wrapper';
    div.innerHTML = isAberto ? svgBuzioAberto : svgBuzioFechado;
    
    // Posição e Rotação Aleatória
    const rot = Math.floor(Math.random() * 360);
    const top = Math.floor(Math.random() * 65) + 10;
    const left = Math.floor(Math.random() * 70) + 10;

    div.style.cssText = `top: ${top}%; left: ${left}%; transform: rotate(${rot}deg);`;
    mesa.appendChild(div);
  }

  // ANIMAÇÃO DE LOADING RITUALÍSTICO (4 MENSAGENS SEQUENCIAIS)
  const overlay = document.getElementById('loading-overlay');
  const loadingMsg = document.getElementById('loading-msg');
  overlay.classList.remove('hidden');

  const mensagens = [
    "🔮 Lançando os búzios na mesa sagrada...",
    "✨ Consultando a sabedoria dos Odùs e Ancestrais...",
    "🕯️ Interpretando as aberturas e os sinais revelados...",
    "📜 Tecendo a orientação para a sua pergunta..."
  ];

  let msgIndex = 0;
  const interval = setInterval(() => {
    msgIndex = (msgIndex + 1) % mensagens.length;
    loadingMsg.innerText = mensagens[msgIndex];
  }, 1200);

  try {
    const response = await fetch('/api/consultar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        pergunta,
        areaFoco,
        oduNascimento: oduUsuario ? oduUsuario.nome : 'Não calculado',
        qtdAbertos,
        nomeOdu: `Queda de ${qtdAbertos} Búzios Abertos`
      })
    });

    const data = await response.json();
    clearInterval(interval);
    overlay.classList.add('hidden');

    // EXIBIR RESULTADOS
    exibirResultado(data);
  } catch (error) {
    clearInterval(interval);
    overlay.classList.add('hidden');
    alert("Ocorreu um erro ao consultar os búzios. Tente novamente.");
  }
}

function exibirResultado(data) {
  document.getElementById('resultado-consulta').classList.remove('hidden');

  // Veredicto e Barra
  document.getElementById('veredicto-tag').innerText = data.resposta_direta || "SIM";
  document.getElementById('texto-favorabilidade').innerText = data.favorabilidade_texto || "Favorável";
  
  const pct = data.favorabilidade_porcentagem || 80;
  document.getElementById('porcentagem-favorabilidade').innerText = `${pct}%`;
  
  const barra = document.getElementById('barra-favorabilidade');
  barra.style.width = `${pct}%`;

  // Cores dinâmicas da barra
  if (pct >= 70) {
    barra.style.background = 'linear-gradient(90deg, #10B981, #059669)';
  } else if (pct >= 40) {
    barra.style.background = 'linear-gradient(90deg, #F59E0B, #D97706)';
  } else {
    barra.style.background = 'linear-gradient(90deg, #EF4444, #DC2626)';
  }

  // Textos
  document.getElementById('texto-revelacao').innerText = data.o_que_os_buzios_revelam || '';
  document.getElementById('texto-interpretacao').innerText = data.interpretacao_aplicada || '';
  document.getElementById('texto-influencias').innerText = data.influencias_espirituais || '';

  // Listas
  const ulFav = document.getElementById('lista-favoraveis');
  ulFav.innerHTML = (data.fatores_favoraveis || []).map(item => `<li>✨ ${item}</li>`).join('');

  const ulAtn = document.getElementById('lista-atencao');
  ulAtn.innerHTML = (data.pontos_atencao || []).map(item => `<li>⚠️ ${item}</li>`).join('');

  // Rolar até o resultado
  document.getElementById('resultado-consulta').scrollIntoView({ behavior: 'smooth' });
}

function abrirPagamento() {
  alert("Redirecionando para o checkout da Consulta Premium (Mercado Pago / Stripe / Kiwify)...");
}
