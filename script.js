// Variáveis de Controle de Estado e Histórico da Sessão
let isProcessing = false;
const perguntasRespondidasSet = new Set();

// Normalização de texto de pergunta para comparação
function normalizarTextoPergunta(texto) {
  return texto.trim().toLowerCase().replace(/\s+/g, ' ');
}

// Etapa 3: Jogada de Búzios com Trava Concorrente e Validação de Reuso
document.getElementById('form-consulta')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const inputPergunta = document.getElementById('pergunta');
  const perguntaRaw = inputPergunta ? inputPergunta.value : '';
  const perguntaNormalizada = normalizarTextoPergunta(perguntaRaw);
  const area = document.getElementById('area-foco')?.value || 'Geral';
  const btn = document.getElementById('btn-jogar');
  const status = document.getElementById('status-jogo');

  // 1. Bloqueio de múltiplas chamadas simultâneas
  if (isProcessing) {
    if (status) status.innerText = "Sua pergunta já está sendo processada.";
    return;
  }

  // 2. Bloqueio de reuso de pergunta já processada na mesma sessão
  if (perguntasRespondidasSet.has(perguntaNormalizada)) {
    if (status) {
      status.innerText = "Esta pergunta já foi consultada. Para uma nova jogada, faça uma pergunta diferente.";
    }
    alert("Esta pergunta já foi consultada. Para uma nova jogada, faça uma pergunta diferente.");
    return;
  }

  // 3. Verificação de Saldo de Consultas
  if (perguntasRestantes <= 0) {
    alert("Seu saldo de consultas acabou. Adquira um novo pacote!");
    return;
  }

  // Ativação imediata da trava de processamento e bloqueio do botão
  isProcessing = true;
  if (btn) btn.disabled = true;

  const mesa = document.getElementById('mesa-buzios');
  const peneira = document.getElementById('peneira');
  
  if (mesa) mesa.style.display = 'block';
  if (peneira) peneira.innerHTML = '';
  
  const resContainer = document.getElementById('resultado-leitura');
  if (resContainer) resContainer.style.display = 'none';

  if (mesa) {
    mesa.scrollIntoView({ behavior: 'smooth', block: 'center' });
    mesa.classList.add('mesa-chacoalhando');
  }

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

    if (peneira) peneira.appendChild(buzioEl);
  }

  if (status) status.innerText = "🔮 Lançando os búzios na mesa sagrada...";

  setTimeout(() => {
    if (mesa) mesa.classList.remove('mesa-chacoalhando');
    if (status) status.innerText = "✨ Consultando a sabedoria ancestral dos Orixás...";
  }, 1500);

  setTimeout(() => {
    if (status) status.innerText = "🕯️ Interpretando os sinais e a queda revelada...";
  }, 3000);

  setTimeout(() => {
    try {
      // Registrar pergunta no histórico da sessão e consumir crédito
      perguntasRespondidasSet.add(perguntaNormalizada);
      perguntasRestantes--;
      
      const qtdElem = document.getElementById('qtd-perguntas');
      if (qtdElem) qtdElem.innerText = perguntasRestantes;

      if (resContainer) {
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
            <p style="font-size: 12px; color: #a1a1aa; font-style: italic; margin-bottom: 8px;">" Pergunta: ${perguntaRaw} "</p>
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
      }

      if (status) status.innerText = "Leitura concluída com sucesso!";
    } finally {
      // Liberação garantida do estado
      isProcessing = false;
      if (btn) btn.disabled = false;
    }
  }, 4500);
});
