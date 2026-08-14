/* ==========================================
   ORÁCULO ODARA - LÓGICA, RITUAL & SEGURANÇA
   ========================================== */

let consultasRestantes = 0;
let pacoteSelecionado = { quantidade: 5, valor: 25.99 };

// MAPEAMENTO DOS ODÙS
const ODUS_MAP = {
  0: { nome: "Opira", orixa: "Obaluaiê / Omolu", elemento: "Terra", caminho: "Momento de recolhimento, cautela e preservação. Evite decisões precipitadas." },
  1: { nome: "Okaran", orixa: "Exu", elemento: "Fogo", caminho: "Caminhos de transformação rápida, dinamismo e necessidade de clareza." },
  2: { nome: "Ejioko", orixa: "Ibejis / Ogum", elemento: "Terra", caminho: "Dualidade, parcerias, união e busca por estabilidade." },
  3: { nome: "Etaogundá", orixa: "Ogum", elemento: "Ferro / Fogo", caminho: "Superação de obstáculos, coragem, firmeza e ação." },
  4: { nome: "Irosun", orixa: "Iemanjá / Oxóssi", elemento: "Fogo / Água", caminho: "Intuição afiada, proteção ancestral e atenção a alertas sutis." },
  5: { nome: "Oxé", orixa: "Oxum", elemento: "Água", caminho: "Prosperidade, sensibilidade, beleza, renovação e caminhos abertos." },
  6: { nome: "Obará", orixa: "Xangô / Oxóssi", elemento: "Ar / Terra", caminho: "Grande riqueza, fartura, expansão e sorte nos negócios." },
  7: { nome: "Odi", orixa: "Obaluaiê / Oxóssi", elemento: "Terra", caminho: "Resistência, persistência e quebra de amarras antigas." },
  8: { nome: "Ejiologbon", orixa: "Nanã / Oxalufã", elemento: "Terra / Água", caminho: "Sabedoria da maturidade, reflexão profunda e calma." },
  9: { nome: "Osa", orixa: "Oyá (Iansã)", elemento: "Ar", caminho: "Ventos de mudança, movimento, intuição e liberdade." },
  10: { nome: "Ofun", orixa: "Oxalá", elemento: "Ar / Espaço", caminho: "Paz, pureza, bênçãos elevadas e respeito ao sagrado." },
  11: { nome: "Owonrin", orixa: "Exu / Oyá", elemento: "Fogo / Ar", caminho: "Imprevistos produtivos, dinamismo e necessidade de flexibilidade." },
  12: { nome: "Ejila Ebora", orixa: "Xangô", elemento: "Fogo", caminho: "Justiça, liderança, vitória sobre demandas e firmeza de propósito." },
  13: { nome: "Ejiologbon (Okanran Meji)", orixa: "Nanã", elemento: "Terra", caminho: "Transformação espiritual e encerramento de ciclos velhos." },
  14: { nome: "Iká", orixa: "Oxumarê", elemento: "Água / Ar", caminho: "Renovação contínua, sabedoria estratégica e flexibilidade." },
  15: { nome: "Ibeji / Ogbè", orixa: "Obá / Ewá", elemento: "Ar", caminho: "Conquistas pela perspicácia, proteção e intuição refinada." },
  16: { nome: "Alafia", orixa: "Oxalá / Todos os Orixás", elemento: "Luz", caminho: "Luz total, confirmação plena, paz e bênção máxima dos caminhos." }
};

// CÁLCULO GRATUITO DO ODÙ DE NASCIMENTO
document.getElementById('form-odu')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
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

// PACOTES E PAGAMENTO
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

// 🛑 TRAVA DE SEGURANÇA E DETECÇÃO DE RISCO
function verificarGatilhoSeguranca(texto) {
  const termosRisco = [
    'morrer', 'suicidio', 'suicídio', 'me matar', 'querer morrer', 
    'tirar minha vida', 'fim da minha vida', 'nao quero mais viver', 
    'não quero mais viver', 'acabar com tudo', 'auto exterminio', 'se matar'
  ];
  const textoLower = texto.toLowerCase();
  return termosRisco.some(termo => textoLower.includes(termo));
}

// RITUAL DA JOGADA DOS BÚZIOS
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

  // 1. CHECAGEM IMEDIATA DE SEGURANÇA (INTERCEPTA ANTES DE CONSUMIR O JOGO OU EXIBIR O ODÙ)
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
            <li style="margin-bottom: 6px;">📞 <strong>CVV (Centro de Valorização da Vida):</strong> Ligue <strong>188</strong> (Gratuito, 24 horas per dia, sigiloso).</li>
            <li>💬 <strong>Chat Online:</strong> Acesse <a href="https://www.cvv.org.br" target="_blank" style="color: #60A5FA; text-decoration: underline;">www.cvv.org.br</a> para conversar com um voluntário.</li>
          </ul>
        </div>
        <p style="color: #C9C4D6; font-size: 0.88rem;">Sua vida tem um valor inestimável para o mundo e para as forças que regem a existência. Por favor, busque ajuda humana e acolhedora neste momento.</p>
      </div>
    `;
    painelResultado.style.display = 'block';
    painelResultado.scrollIntoView({ behavior: 'smooth' });
    return; // Interrompe a execução para não rodar a jogada de búzios
  }

  // 2. CASO SEJA UMA PERGUNTA REGULAR: EXECUTA O RITUAL
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

  statusTexto.textContent = "🔮 Concentrando nas energias da sua pergunta...";

  setTimeout(() => {
    statusTexto.textContent = "✨ Evocando os Orixás e ouvindo a voz dos Odùs...";
  }, 1200);

  setTimeout(() => {
    statusTexto.textContent = "🍃 Lançando os 16 búzios sagrados sobre a mesa...";
  }, 2400);

  setTimeout(() => {
    mesa.classList.remove('mesa-chacoalhando');
    statusTexto.textContent = "";

    const buziosAbertos = Math.floor(Math.random() * 17);
    const buziosFechados = 16 - buziosAbertos;
    const oduSorteado = ODUS_MAP[buziosAbertos] || ODUS_MAP[16];

    for (let i = 0; i < 16; i++) {
      const buzio = document.createElement('div');
      buzio.className = 'buzio-item';
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

      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 110; 
      const x = 160 + radius * Math.cos(angle);
      const y = 120 + radius * Math.sin(angle);
      const rot = Math.floor(Math.random() * 360);

      buzio.style.left = `${x}px`;
      buzio.style.top = `${y}px`;
      buzio.style.transform = `rotate(${rot}deg) scale(0.1)`;
      buzio.style.opacity = '0';

      peneira.appendChild(buzio);

      setTimeout(() => {
        buzio.style.opacity = '1';
        buzio.style.transform = `rotate(${rot}deg) scale(1)`;
      }, i * 40);
    }

    setTimeout(() => {
      consultasRestantes--;
      document.getElementById('qtd-perguntas').textContent = consultasRestantes;

      const favorabilidade = Math.min(100, Math.max(15, Math.floor((buziosAbertos / 16) * 100) + Math.floor(Math.random() * 15)));

      painelResultado.className = "card card-resultado-dark";
      painelResultado.innerHTML = `
        <div style="border-bottom: 1px solid var(--card-border); padding-bottom: 12px; margin-bottom: 16px;">
          <span style="color: var(--gold-accent); font-size: 0.8rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Revelação do Oráculo</span>
          <h3 style="font-size: 1.4rem; color: var(--gold-light); margin-top: 4px;">Odù ${oduSorteado.nome} (${buziosAbertos} Búzios Abertos / ${buziosFechados} Fechados)</h3>
        </div>

        <div style="display: flex; gap: 15px; margin-bottom: 16px; flex-wrap: wrap;">
          <div style="background: rgba(139, 92, 246, 0.15); padding: 8px 16px; border-radius: 20px; font-size: 0.88rem;">
            Orixá Regente: <strong style="color: var(--gold-light);">${oduSorteado.orixa}</strong>
          </div>
          <div style="background: rgba(139, 92, 246, 0.15); padding: 8px 16px; border-radius: 20px; font-size: 0.88rem;">
            Favorabilidade: <strong style="color: var(--purple-accent);">${favorabilidade}%</strong>
          </div>
        </div>

        <div class="box-destaque-dark">
          <h4 style="color: var(--gold-accent); margin-bottom: 6px;">🎯 Resposta para a sua Pergunta:</h4>
          <p style="font-style: italic; color: var(--text-muted); margin-bottom: 8px;">"${pergunta}"</p>
          <p>${oduSorteado.caminho} Para a área de <strong>${area}</strong>, os búzios indicam clareza e caminhos estratégicos a serem seguidos com fé e serenidade.</p>
        </div>

        <div style="margin-top: 14px;">
          <h4 style="color: var(--gold-light); margin-bottom: 6px;">💡 Orientação Prática dos Orixás:</h4>
          <p style="color: var(--text-muted); font-size: 0.92rem;">Mantenha a mente firme em seus objetivos. Acenda uma vela branca para seu anjo da guarda e busque tomar decisões baseadas na razão e na sua intuição ancestral.</p>
        </div>
      `;

      painelResultado.style.display = 'block';
      painelResultado.scrollIntoView({ behavior: 'smooth' });
      btnJogar.disabled = false;
    }, 1000);

  }, 3600);
});
