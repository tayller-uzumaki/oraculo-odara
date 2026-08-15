/* ==========================================
   ORÁCULO ODARA - LÓGICA E RITUAL DOS BÚZIOS
   ========================================== */

let consultasContratadas = 0;
let consultasRestantes = 0;
let pacoteSelecionado = { quantidade: 5, valor: 25.99 };
let isProcessing = false;

const ODUS_MAP = {
  0: { nome: "Opira", orixa: "Obaluaiê / Omolu", elemento: "Terra", caminho: "Momento de recolhimento, cautela e preservação. Evite decisões precipitadas.", tendencia: "Desfavorável neste momento" },
  1: { nome: "Okaran", orixa: "Exu", elemento: "Fogo", caminho: "Caminhos de transformação rápida, dinamismo e necessidade de clareza.", tendencia: "Parcialmente Favorável / Requer Atenção" },
  2: { nome: "Ejioko", orixa: "Ibejis / Ogum", elemento: "Terra", caminho: "Dualidade, parcerias, união e busca por estabilidade.", tendencia: "Favorável" },
  3: { nome: "Etaogundá", orixa: "Ogum", elemento: "Ferro / Fogo", caminho: "Superação de obstáculos, coragem, firmeza e ação.", tendencia: "Favorável" },
  4: { nome: "Irosun", orixa: "Iemanjá / Oxóssi", elemento: "Fogo / Água", caminho: "Intuição afiada, proteção ancestral e atenção a alertas sutis.", tendencia: "Parcialmente Favorável / Requer Atenção" },
  5: { nome: "Oxé", orixa: "Oxum", elemento: "Água", caminho: "Prosperidade, sensibilidade, beleza, renovação e caminhos abertos.", tendencia: "Favorável" },
  6: { nome: "Obará", orixa: "Xangô / Oxóssi", elemento: "Ar / Terra", caminho: "Grande riqueza, fartura, expansão e sorte nos negócios.", tendencia: "Favorável" },
  7: { nome: "Odi", orixa: "Obaluaiê / Oxóssi", elemento: "Terra", caminho: "Resistência, persistência e quebra de amarras antigas.", tendencia: "Parcialmente Favorável / Requer Atenção" },
  8: { nome: "Ejiologbon", orixa: "Nanã / Oxalufã", elemento: "Terra / Água", caminho: "Sabedoria da maturidade, reflexão profunda e calma.", tendencia: "Parcialmente Favorável / Requer Atenção" },
  9: { nome: "Osa", orixa: "Oyá (Iansã)", elemento: "Ar", caminho: "Ventos de mudança, movimento, intuição e liberdade.", tendencia: "Favorável" },
  10: { nome: "Ofun", orixa: "Oxalá", elemento: "Ar / Espaço", caminho: "Paz, pureza, bênçãos elevadas e respeito ao sagrado.", tendencia: "Favorável" },
  11: { nome: "Owonrin", orixa: "Exu / Oyá", elemento: "Fogo / Ar", caminho: "Imprevistos produtivos, dinamismo e necessidade de flexibilidade.", tendencia: "Parcialmente Favorável / Requer Atenção" },
  12: { nome: "Ejila Ebora", orixa: "Xangô", elemento: "Fogo", caminho: "Justiça, liderança, vitória sobre demandas e firmeza de propósito.", tendencia: "Favorável" },
  13: { nome: "Ejiologbon (Okanran Meji)", orixa: "Nanã", elemento: "Terra", caminho: "Transformação espiritual e encerramento de ciclos velhos.", tendencia: "Desfavorável neste momento" },
  14: { nome: "Iká", orixa: "Oxumarê", elemento: "Água / Ar", caminho: "Renovação contínua, sabedoria estratégica e flexibilidade.", tendencia: "Favorável" },
  15: { nome: "Ibeji / Ogbè", orixa: "Obá / Ewá", elemento: "Ar", caminho: "Conquistas pela perspicácia, proteção e intuição refinada.", tendencia: "Favorável" },
  16: { nome: "Alafia", orixa: "Oxalá / Todos os Orixás", elemento: "Luz", caminho: "Luz total, confirmação plena, paz e bênção máxima dos caminhos.", tendencia: "Favorável" }
};

function atualizarContadores() {
  const elContratadas = document.getElementById('qtd-contratadas');
  const elRestantes = document.getElementById('qtd-perguntas');
  if (elContratadas) elContratadas.textContent = consultasContratadas;
  if (elRestantes) elRestantes.textContent = consultasRestantes;
}

// CÁLCULO GRATUITO DO ODÙ DE NASCIMENTO
document.getElementById('form-odu')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const data = document.getElementById('dataNasc').value;

  if (!data || !nome) return;

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
  const painelOdu = document.getElementById('resultado-odu');

  painelOdu.innerHTML = `
    <div class="card-resultado-dark">
      <div style="border-bottom: 1px solid var(--card-border); padding-bottom: 12px; margin-bottom: 16px;">
        <span style="color: var(--gold-accent); font-size: 0.8rem; font-weight: bold; text-transform: uppercase;">Resultado do Odù de Nascimento</span>
        <h3 style="font-size: 1.4rem; color: var(--gold-light); margin-top: 4px;">Olá, ${nome}! Seus Caminhos sob a Luz de Odù ${infoOdu.nome}</h3>
      </div>

      <div style="display: flex; gap: 12px; margin-bottom: 18px; flex-wrap: wrap;">
        <span class="badge" style="background: rgba(212,175,55,0.15);">Identificação: Odù #${numOdu} — ${infoOdu.nome}</span>
        <span class="badge" style="background: rgba(139,92,246,0.15);">Regência: ${infoOdu.orixa}</span>
        <span class="badge" style="background: rgba(212,175,55,0.15);">Elemento: ${infoOdu.elemento}</span>
      </div>

      <div class="box-destaque-dark">
        <h4 style="color: var(--gold-accent); margin-bottom: 10px;">📜 Interpretação Completa dos Seus Caminhos</h4>
        <p style="margin-bottom: 12px;"><strong>Características Principais:</strong> O Odù ${infoOdu.nome} traz a regência de ${infoOdu.orixa}, conferindo conexão especial ao elemento ${infoOdu.elemento}.</p>
        <p style="margin-bottom: 12px;"><strong>Potencial Espiritual:</strong> Sua energia nativa favorece ${infoOdu.caminho.toLowerCase()}</p>
        <p style="margin-bottom: 4px;"><strong>Desafios:</strong> Mantenha o equilíbrio nos momentos de transição, agindo com sabedoria e paciência.</p>
      </div>

      <div class="odu-pontos-grid">
        <div class="box-pontos-fortes">
          <h4>✨ Pontos Fortes</h4>
          <ul>
            <li>✦ Intuição e percepção espiritual aguçadas</li>
            <li>✦ Proteção ancestral de ${infoOdu.orixa}</li>
          </ul>
        </div>
        <div class="box-pontos-atencao">
          <h4>⚠️ Pontos de Atenção</h4>
          <ul>
            <li>✦ Evitar precipitações e ansiedade</li>
            <li>✦ Cuidado com desgastes na energia pessoal</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  painelOdu.style.display = 'block';
  painelOdu.scrollIntoView({ behavior: 'smooth' });
});

function selecionarPacote(qtd, valor) {
  pacoteSelecionado = { quantidade: qtd, valor: valor };
  document.querySelectorAll('.pacote-card, .package-card').forEach(card => card.classList.remove('active'));
  const el = document.getElementById(`pacote-${qtd}`);
  if (el) el.classList.add('active');
}

function gerarPix() {
  consultasContratadas += pacoteSelecionado.quantidade;
  consultasRestantes += pacoteSelecionado.quantidade;
  atualizarContadores();
  alert(`✨ Pagamento simulado com sucesso!\n\nForam adicionadas ${pacoteSelecionado.quantidade} consultas ao seu saldo.`);
  const secaoJogada = document.getElementById('secao-jogada');
  secaoJogada.style.display = 'block';
  secaoJogada.scrollIntoView({ behavior: 'smooth' });
}

function reiniciarConsulta() {
  const campoPergunta = document.getElementById('pergunta');
  if (campoPergunta) campoPergunta.value = '';

  const painelResultado = document.getElementById('resultado-leitura');
  if (painelResultado) painelResultado.style.display = 'none';

  const mesa = document.getElementById('mesa-buzios');
  if (mesa) mesa.style.display = 'none';

  document.getElementById('form-consulta')?.scrollIntoView({ behavior: 'smooth' });
}

// ANALISADOR SEMÂNTICO LOCAL E REGRAS DE BLOQUEIO
function classificarPergunta(texto) {
  const t = texto.toLowerCase();

  if (['me matar', 'quer morrer', 'quero morrer', 'desaparecer', 'nao agumento mais', 'não aguento mais', 'suicidio', 'suicídio'].some(g => t.includes(g))) {
    return { bloqueado: true, tipo: 'RISCO_EMOCIONAL', msg: "Percebo que você está passando por um momento de dor intensa. O jogo de búzios não é o recurso adequado para este momento. Por favor, busque ajuda profissional. Ligue gratuitamente para o CVV no número 188 (disponível 24h) ou procure um serviço de emergência e alguém de sua confiança." };
  }

  if (['mega-sena', 'megasena', 'jogo do bicho', 'quina', 'lotofacil', 'lotofácil', 'numeros da sorte', 'números da sorte', 'loteria', 'aposta'].some(g => t.includes(g))) {
    return { bloqueado: true, tipo: 'LOTERIA', msg: "A plataforma se destina estritamente à orientação espiritual e reflexão pessoal, não fornecendo números ou palpites para apostas e jogos de azar." };
  }

  if (['estou doente', 'qual minha doença', 'vencer o cancer', 'vencer o câncer', 'vou me curar', 'diagnostico medico', 'cura de'].some(g => t.includes(g))) {
    return { bloqueado: true, tipo: 'SAUDE', msg: "O oráculo oferece orientação espiritual, mas não realiza diagnósticos médicos nem promete curas físicas. Por favor, consulte médicos e profissionais de saúde qualificados." };
  }

  if (['quando vou morrer', 'vai morrer', 'dia da minha morte', 'morte de'].some(g => t.includes(g))) {
    return { bloqueado: true, tipo: 'PREVISAO_MORTE', msg: "O Oráculo não realiza previsões sobre a data ou circunstâncias de morte. Nossos caminhos são focados no fortalecimento da vida e nas escolhas do presente." };
  }

  let contexto = "Orientação Geral e Caminhos";
  if (/amor|namorada|namorado|casamento|traicao|traição|voltar|relacionamento|ex|parceiro/i.test(t)) contexto = "Amor e Relacionamentos";
  else if (/trabalho|emprego|vaga|carreira|empresa|promocao|promoção|chefe|negocio|negócio|projeto/i.test(t)) contexto = "Trabalho e Tomada de Decisão";
  else if (/dinheiro|financas|finanças|divida|dívida|investimento|comprar|vender/i.test(t)) contexto = "Prosperidade Financeira";
  else if (/familia|família|mae|mãe|pai|filho|filha|irmao|irmão/i.test(t)) contexto = "Harmonia Familiar";
  else if (/orixa|orixá|cabeca|cabeça|frente|junto|juntó|adjunto|santo/i.test(t)) contexto = "Identificação de Orixá de Cabeça";
  else if (/espiritual|protecao|proteção|inveja|demanda/i.test(t)) contexto = "Espiritualidade e Proteção Ancestral";

  return { bloqueado: false, contexto };
}

// RITUAL DE LANÇAMENTO DOS BÚZIOS
document.getElementById('form-consulta')?.addEventListener('submit', function (e) {
  e.preventDefault();

  if (isProcessing) return;

  if (consultasRestantes <= 0) {
    alert("Você precisa adquirir um pacote de consultas para realizar a jogada.");
    document.getElementById('secao-pacotes').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const pergunta = document.getElementById('pergunta').value.trim();
  if (!pergunta) return;

  // Analisa semanticamente antes de debitar saldo ou mover a mesa
  const analise = classificarPergunta(pergunta);

  // SE FOR PERGUNTA BLOQUEADA: Não consome saldo e exibe o painel de suporte
  if (analise.bloqueado) {
    const painelResultado = document.getElementById('resultado-leitura');
    painelResultado.className = "card card-resultado-dark";
    painelResultado.innerHTML = `
      <div style="border-bottom: 1px solid rgba(239, 68, 68, 0.4); padding-bottom: 12px; margin-bottom: 16px;">
        <span style="color: #F87171; font-size: 0.8rem; font-weight: bold; text-transform: uppercase;">⚠️ Orientação do Sistema</span>
        <h3 style="font-size: 1.3rem; color: #FCA5A5; margin-top: 4px;">Consulta Não Realizada</h3>
      </div>
      <div class="box-destaque-dark" style="border-left-color: #EF4444 !important; background: rgba(45, 20, 20, 0.5) !important;">
        <p style="font-size: 0.95rem; line-height: 1.6; color: #FEE2E2;">${analise.msg}</p>
      </div>
      <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 10px;">ℹ️ Seu saldo de consultas não foi consumido.</p>
    `;
    painelResultado.style.display = 'block';
    painelResultado.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  isProcessing = true;

  const mesa = document.getElementById('mesa-buzios');
  const peneira = document.getElementById('peneira');
  const painelResultado = document.getElementById('resultado-leitura');
  const btnJogar = document.getElementById('btn-jogar');

  btnJogar.disabled = true;
  painelResultado.style.display = 'none';
  peneira.innerHTML = '';
  mesa.style.display = 'block';

  mesa.scrollIntoView({ behavior: 'smooth', block: 'center' });
  mesa.classList.add('mesa-chacoalhando');

  let statusTexto = document.getElementById('status-jogo');
  if (!statusTexto) {
    statusTexto = document.createElement('p');
    statusTexto.id = 'status-jogo';
    statusTexto.style.cssText = "text-align: center; color: var(--gold-light); font-weight: 600; margin-top: 15px; font-family: 'Cinzel', serif;";
    mesa.parentNode.insertBefore(statusTexto, mesa.nextSibling);
  }

  const ehOrixaCabeca = analise.contexto === "Identificação de Orixá de Cabeça";

  statusTexto.textContent = "🔮 Concentrando nas energias da sua pergunta...";

  setTimeout(() => {
    statusTexto.textContent = ehOrixaCabeca ? "✨ Preparando dupla queda para Orixá de Frente e Juntó..." : "✨ Evocando os Orixás e ouvindo a voz dos Odùs...";
  }, 1200);

  setTimeout(() => {
    statusTexto.textContent = "🍃 Lançando os 16 búzios sagrados sobre a mesa...";
  }, 2400);

  setTimeout(() => {
    mesa.classList.remove('mesa-chacoalhando');
    statusTexto.textContent = "";

    const buziosAbertos1 = Math.floor(Math.random() * 17);
    const buziosFechados1 = 16 - buziosAbertos1;
    const oduSorteado1 = ODUS_MAP[buziosAbertos1] || ODUS_MAP[16];

    let buziosAbertos2 = Math.floor(Math.random() * 17);
    let oduSorteado2 = ODUS_MAP[buziosAbertos2] || ODUS_MAP[16];

    for (let i = 0; i < 16; i++) {
      const buzio = document.createElement('div');
      buzio.className = 'buzio-item';
      const isOpen = i < buziosAbertos1;

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
      // Consome 1 consulta do saldo
      consultasRestantes--;
      atualizarContadores();

      const favorabilidade = Math.min(100, Math.max(15, Math.floor((buziosAbertos1 / 16) * 100) + Math.floor(Math.random() * 10)));

      // Verificação de perguntas sobre terceiros
      const sobreTerceiros = /ele|ela|marido|esposa|namorado|namorada|chefe|parceiro/i.test(pergunta);
      const notaTerceiros = sobreTerceiros ? `<p style="font-size: 0.88rem; color: var(--gold-light); margin-top: 8px;"><strong>Nota sobre Leitura de Terceiros:</strong> O oráculo reflete como essas energias impactam <em>sua vida e suas decisões</em>, preservando o livre-arbítrio alheio.</p>` : '';

      let blocoResultadoEspecial = '';

      if (ehOrixaCabeca) {
        blocoResultadoEspecial = `
          <div class="box-destaque-dark">
            <h4 style="color: var(--gold-accent); margin-bottom: 8px;">👑 Leitura do Orixá de Cabeça (Dupla Queda)</h4>
            <p style="margin-bottom: 10px;"><strong>1ª Queda (Orixá de Frente):</strong> Odù ${oduSorteado1.nome} — Regência de <strong>${oduSorteado1.orixa}</strong>. Traz a energia principal que guia seus passos, sua liderança e sua força de vontade no mundo.</p>
            <p style="margin-bottom: 10px;"><strong>2ª Queda (Orixá Adjunto / Juntó):</strong> Odù ${oduSorteado2.nome} — Regência de <strong>${oduSorteado2.orixa}</strong>. Representa seu suporte emocional, equilíbrio e sustentação em momentos de oscilação.</p>
            <p style="font-size: 0.9rem; color: var(--text-muted);">A aliança entre ${oduSorteado1.orixa} e ${oduSorteado2.orixa} mostra que suas decisões precisam equilibrar dinamismo e sabedoria espiritual.</p>
          </div>
        `;
      } else {
        blocoResultadoEspecial = `
          <div class="box-destaque-dark">
            <h4 style="color: var(--gold-accent); margin-bottom: 6px;">🎯 Interpretação Contextual: ${analise.contexto}</h4>
            <p style="font-style: italic; color: var(--text-muted); margin-bottom: 10px;">"${pergunta}"</p>
            <p style="line-height: 1.7;">
              Ao analisar sua questão sob o tema de <strong>${analise.contexto}</strong>, o sagrado manifestou o <strong>Odù ${oduSorteado1.nome}</strong>. Esta regência de ${oduSorteado1.orixa} indica que ${oduSorteado1.caminho.toLowerCase()} 
            </p>
            ${notaTerceiros}
          </div>
        `;
      }

      painelResultado.className = "card card-resultado-dark";
      painelResultado.innerHTML = `
        <!-- 1. ACOLHIMENTO E CABEÇALHO -->
        <div style="border-bottom: 1px solid var(--card-border); padding-bottom: 12px; margin-bottom: 16px;">
          <span style="color: var(--gold-accent); font-size: 0.8rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Revelação Oracular Acolhedora</span>
          <h3 style="font-size: 1.4rem; color: var(--gold-light); margin-top: 4px;">Odù ${oduSorteado1.nome} (${buziosAbertos1} Abertos / ${buziosFechados1} Fechados)</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 6px;">Compreendemos a importância da sua pergunta. Que as luzes dos Orixás tragam clareza e paz ao seu coração.</p>
        </div>

        <!-- 2. RESULTADO DA CONSULTA (TENDÊNCIA) -->
        <div style="display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;">
          <div style="background: rgba(139, 92, 246, 0.15); padding: 8px 16px; border-radius: 20px; font-size: 0.88rem;">
            Tendência: <strong style="color: var(--gold-light);">${oduSorteado1.tendencia}</strong>
          </div>
          <div style="background: rgba(139, 92, 246, 0.15); padding: 8px 16px; border-radius: 20px; font-size: 0.88rem;">
            Favorabilidade: <strong style="color: var(--purple-accent);">${favorabilidade}%</strong>
          </div>
        </div>

        <!-- 3. INTERPRETAÇÃO DO ODÙ + CONTEXTO -->
        ${blocoResultadoEspecial}

        <!-- 4. ORIENTAÇÃO PRÁTICA E ÉTICA -->
        <div style="margin-top: 14px;">
          <h4 style="color: var(--gold-light); margin-bottom: 6px;">💡 Orientação Prática e Ética</h4>
          <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">
            A sabedoria ancestral nos lembra que as cartas e os búzios mostram tendências, mas quem constrói o caminho é você através das suas atitudes no presente. Mantenha a clareza, evite agir por impulso e busque equilibrar suas energias com pensamentos elevados.
          </p>
        </div>

        <!-- DISCLAIMER OBRIGATÓRIO (AVISO LEGAL/RELIGIOSO) -->
        <div class="disclaimer-callout">
          ⚠️ <strong>Aviso Importante:</strong> Esta é uma consulta orientativa realizada por uma inteligência artificial digital. Para aprofundamentos, trabalhos espirituais, rituais, confirmações de Odù e assentamentos, procure uma casa de Candomblé ou um Babalorixá / Ialorixá de sua extrema confiança.
        </div>

        <div style="margin-top: 20px; text-align: center;">
          <button type="button" class="btn-primary" onclick="reiniciarConsulta()">✨ Nova Pergunta</button>
        </div>
      `;

      painelResultado.style.display = 'block';
      painelResultado.scrollIntoView({ behavior: 'smooth' });

      btnJogar.disabled = false;
      isProcessing = false;
    }, 1000);

  }, 3600);
});

document.addEventListener('DOMContentLoaded', atualizarContadores);
