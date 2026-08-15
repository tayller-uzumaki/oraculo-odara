/* ==========================================
   ORÁCULO ODARA - LÓGICA E RITUAL DOS BÚZIOS
   ========================================== */

// Estado global simples
let consultasRestantes = 0;
let pacoteSelecionado = { quantidade: 5, valor: 25.99 };

// 1. MAPEAMENTO DOS ODÙS PELOS BÚZIOS ABERTOS (0 a 16)
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
  16: { Alafia: "Alafia", orixa: "Oxalá / Todos os Orixás", elemento: "Luz", caminho: "Luz total, confirmação plena, paz e bênção máxima dos caminhos." }
};

// 2. CÁLCULO GRATUITO DO ODÙ DE NASCIMENTO
document.getElementById('form-odu')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const data = document.getElementById('dataNasc').value;

  if (!data) return;

  // Soma dos dígitos da data de nascimento
  const numeros = data.replace(/-/g, '');
  let soma = 0;
  for (let char of numeros) soma += parseInt(char);

  // Redução oracular para o intervalo 1-16
  let numOdu = soma;
  while (numOdu > 16) {
    let str = numOdu.toString();
    numOdu = 0;
    for (let c of str) numOdu += parseInt(c);
  }
  if (numOdu === 0) numOdu = 16;

  const infoOdu = ODUS_MAP[numOdu] || ODUS_MAP[16];

  // Exibição dos resultados
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

// 3. SELEÇÃO DE PACOTES E PAGAMENTO
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

// 4. RITUAL DA JOGADA DOS BÚZIOS (COM CHACOALHO, SUSPENSE E QUEDA)
document.getElementById('form-consulta')?.addEventListener('submit', function (e) {
  e.preventDefault();

  if (consultasRestantes <= 0) {
    alert("Você precisa adquirir um pacote de consultas para realizar a jogada.");
    document.getElementById('secao-pacotes').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const pergunta = document.getElementById('pergunta').value;
  const area = document.getElementById('area-foco').value;

  // Preparar elementos da mesa
  const mesa = document.getElementById('mesa-buzios');
  const peneira = document.getElementById('peneira');
  const painelResultado = document.getElementById('resultado-leitura');
  const btnJogar = document.getElementById('btn-jogar');

  btnJogar.disabled = true;
  painelResultado.style.display = 'none';
  peneira.innerHTML = '';
  mesa.style.display = 'block';
  
  // RITUAL - FASE 1: Chacoalhar a mesa com mensagens de suspense
  mesa.classList.add('mesa-chacoalhando');
  
  // Criar div de status do suspense caso não exista
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

  // RITUAL - FASE 2: Parada do chacoalho e sorteio da queda
  setTimeout(() => {
    mesa.classList.remove('mesa-chacoalhando');
    statusTexto.textContent = "";

    // Sorteio oracular: quantidade de búzios abertos (0 a 16)
    const buziosAbertos = Math.floor(Math.random() * 17);
    const buziosFechados = 16 - buziosAbertos;
    const oduSorteado = ODUS_MAP[buziosAbertos] || ODUS_MAP[16];

    // Desenhar os 16 búzios com posições e rotações randômicas
    for (let i = 0; i < 16; i++) {
      const buzio = document.createElement('div');
      buzio.className = 'buzio-item';
      
      const isOpen = i < buziosAbertos;
      
      // SVG estilizado para os Búzios (Aberto x Fechado)
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

      // Posicionamento harmônico dentro do círculo da mesa
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

      // Animação de entrada cascata dos búzios
      setTimeout(() => {
        buzio.style.opacity = '1';
        buzio.style.transform = `rotate(${rot}deg) scale(1)`;
      }, i * 40);
    }

    // RITUAL - FASE 3: Revelação do Veredito Completo após a queda
    setTimeout(() => {
      // Consumir 1 consulta do saldo
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
