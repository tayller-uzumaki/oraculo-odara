/* ==========================================
   ORÁCULO ODARA - LÓGICA E RITUAL DOS BÚZIOS
   ========================================== */

// Estado global simples com persistência
let consultasContratadas = 0;
let consultasRestantes = 0;
let pacoteSelecionado = { quantidade: 5, valor: 25.99 };
let isProcessing = false; // Trava de proteção contra múltiplos envios

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
  16: { nome: "Alafia", orixa: "Oxalá / Todos os Orixás", elemento: "Luz", caminho: "Luz total, confirmação plena, paz e bênção máxima dos caminhos." }
};

// Atualiza o contador permanente visual de perguntas
function atualizarContadores() {
  const elContratadas = document.getElementById('qtd-contratadas');
  const elRestantes = document.getElementById('qtd-perguntas');
  if (elContratadas) elContratadas.textContent = consultasContratadas;
  if (elRestantes) elRestantes.textContent = consultasRestantes;
}

// 2. CÁLCULO GRATUITO DO ODÙ DE NASCIMENTO (Estrutura Obrigatória Item 4)
document.getElementById('form-odu')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const data = document.getElementById('dataNasc').value;

  if (!data || !nome) return;

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
  const painelOdu = document.getElementById('resultado-odu');

  // Construção do Resultado Estruturado conforme Requisito 4
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
        
        <p style="margin-bottom: 12px; text-indent: 10px;">
          <strong>Características Principais:</strong> Que a paz de Axé acompanhe seus passos, ${nome}. O Odù ${infoOdu.nome} manifesta em sua essência a regência de ${infoOdu.orixa}, conferindo uma personalidade marcante, conectada ao elemento ${infoOdu.elemento}. Aqueles que nascem sob esta vibração trazem uma marca única de percepção e presença no mundo.
        </p>

        <p style="margin-bottom: 12px; text-indent: 10px;">
          <strong>Potencial Espiritual e Pessoal:</strong> Seus caminhos carregam a força da ancestralidade para superar intempéries com dignidade. Seu potencial interior revela uma capacidade natural de ${infoOdu.caminho.toLowerCase()} Esta bênção oracular indica que, quando alinhado com suas virtudes, você alcança um estado elevado de discernimento e prosperidade.
        </p>

        <p style="margin-bottom: 12px; text-indent: 10px;">
          <strong>Desafios e Aprendizados:</strong> Como toda grande força, ${nome}, o Odù ${infoOdu.nome} exige maturidade na condução do livre-arbítrio. O principal aprendizado desta regência é manter o equilíbrio emocional e espiritual nos momentos de oscilação, evitando decisões impulsivas e buscando a sabedoria do silêncio e da reflexão antes de agir.
        </p>

        <p style="margin-bottom: 4px; text-indent: 10px;">
          <strong>Orientações Gerais:</strong> Mantenha sua fé firme e cuide de sua energia vital. Respeite seus ciclos, cultive a gratidão aos Orixás e busque sempre a clareza espiritual em suas escolhas. Lembre-se de que o Odù aponta a direção, mas a caminhada é fortalecida pela sua conduta e pureza de coração.
        </p>
      </div>

      <div class="odu-pontos-grid">
        <div class="box-pontos-fortes">
          <h4>✨ Pontos Fortes</h4>
          <ul>
            <li>✦ Intuição e percepção espiritual aguçadas</li>
            <li>✦ Capacidade de resiliência e renovação</li>
            <li>✦ Proteção ancestral de ${infoOdu.orixa}</li>
            <li>✦ Determinação para alcançar seus objetivos</li>
          </ul>
        </div>

        <div class="box-pontos-atencao">
          <h4>⚠️ Pontos de Atenção</h4>
          <ul>
            <li>✦ Necessidade de manter a calma perante imprevistos</li>
            <li>✦ Evitar atitudes precipitadas ou ansiedade</li>
            <li>✦ Cuidado com desgastes na energia pessoal</li>
            <li>✦ Atenção ao equilíbrio entre a razão e a emoção</li>
          </ul>
        </div>
      </div>

      <div class="banner-transicao" style="margin-top: 20px; padding: 12px; background: rgba(0,0,0,0.25); border-left: 3px solid var(--gold-accent); border-radius: 6px; font-size: 0.88rem;">
        ✨ ${nome}, agora que você conhece a estrutura do seu Odù de nascimento (${infoOdu.nome}), consulte abaixo a mesa de búzios para obter respostas específicas sobre o seu momento atual.
      </div>
    </div>
  `;

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
  consultasContratadas += pacoteSelecionado.quantidade;
  consultasRestantes += pacoteSelecionado.quantidade;
  atualizarContadores();
  
  alert(`✨ Pagamento simulado com sucesso!\n\nForam adicionadas ${pacoteSelecionado.quantidade} consultas ao seu saldo.`);
  
  const secaoJogada = document.getElementById('secao-jogada');
  secaoJogada.style.display = 'block';
  secaoJogada.scrollIntoView({ behavior: 'smooth' });
}

// 4. REINICIAR FORMULÁRIO DE CONSULTA (Botão "Nova Pergunta")
function reiniciarConsulta() {
  const campoPergunta = document.getElementById('pergunta');
  if (campoPergunta) campoPergunta.value = '';

  const painelResultado = document.getElementById('resultado-leitura');
  if (painelResultado) painelResultado.style.display = 'none';

  const mesa = document.getElementById('mesa-buzios');
  if (mesa) mesa.style.display = 'none';

  document.getElementById('form-consulta')?.scrollIntoView({ behavior: 'smooth' });
}

// 5. RITUAL DA JOGADA DOS BÚZIOS (COM ROLAGEM AUTOMÁTICA E PROTEÇÃO CONTRA DUPLO CLIQUE)
document.getElementById('form-consulta')?.addEventListener('submit', function (e) {
  e.preventDefault();

  // Proteção contra múltiplos envios (Requisito 1.4)
  if (isProcessing) {
    alert("Sua pergunta já está sendo processada.");
    return;
  }

  if (consultasRestantes <= 0) {
    alert("Você precisa adquirir um pacote de consultas para realizar a jogada.");
    document.getElementById('secao-pacotes').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const pergunta = document.getElementById('pergunta').value.trim();
  if (!pergunta) return;

  // Ativar trava de processamento
  isProcessing = true;

  const mesa = document.getElementById('mesa-buzios');
  const peneira = document.getElementById('peneira');
  const painelResultado = document.getElementById('resultado-leitura');
  const btnJogar = document.getElementById('btn-jogar');

  btnJogar.disabled = true;
  painelResultado.style.display = 'none';
  peneira.innerHTML = '';
  mesa.style.display = 'block';
  
  // Rolagem Automática Imediata para a Mesa (Requisito 1.1)
  mesa.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // RITUAL - FASE 1: Chacoalhar a mesa
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

  // RITUAL - FASE 2: Queda e Sorteio
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

    // RITUAL - FASE 3: Revelação Padronizada da Resposta da IA / Oráculo (Requisito 3)
    setTimeout(() => {
      // Consumir 1 consulta do saldo e atualizar contador
      consultasRestantes--;
      atualizarContadores();

      const favorabilidade = Math.min(100, Math.max(15, Math.floor((buziosAbertos / 16) * 100) + Math.floor(Math.random() * 15)));

      painelResultado.className = "card card-resultado-dark";
      painelResultado.innerHTML = `
        <div style="border-bottom: 1px solid var(--card-border); padding-bottom: 12px; margin-bottom: 16px;">
          <span style="color: var(--gold-accent); font-size: 0.8rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Revelação da Consulta Sagrada</span>
          <h3 style="font-size: 1.4rem; color: var(--gold-light); margin-top: 4px;">Odù ${oduSorteado.nome} (${buziosAbertos} Abertos / ${buziosFechados} Fechados)</h3>
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
          <h4 style="color: var(--gold-accent); margin-bottom: 6px;">🎯 Resposta Oracular para a sua Questão:</h4>
          <p style="font-style: italic; color: var(--text-muted); margin-bottom: 10px;">"${pergunta}"</p>
          <p style="line-height: 1.7;">
            Que as bênçãos dos Orixás tragam luz à sua busca. Ao lançar os búzios para a sua dúvida, o sagrado manifestou a energia de <strong>Odù ${oduSorteado.nome}</strong>. Este caminho indica que ${oduSorteado.caminho.toLowerCase()} Mantenha o coração sereno e a firmeza em seu propósito.
          </p>
        </div>

        <div style="margin-top: 14px;">
          <h4 style="color: var(--gold-light); margin-bottom: 6px;">💡 Orientação e Acolhimento Ancestral:</h4>
          <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">
            A sabedoria dos búzios nos ensina que a clareza vem com a paciência e a fé. Recomendamos acender uma vela branca ao seu anjo da guarda, fortalecendo sua intuição e permitindo que as energias de ${oduSorteado.orixa} abram seus caminhos com prosperidade e proteção.
          </p>
        </div>

        <!-- Botão "Nova Pergunta" conforme Requisito 1.3 -->
        <div style="margin-top: 24px; text-align: center;">
          <button type="button" class="btn-primary" onclick="reiniciarConsulta()">✨ Nova Pergunta</button>
        </div>
      `;

      painelResultado.style.display = 'block';
      painelResultado.scrollIntoView({ behavior: 'smooth' });

      // Liberação dos botões e travas
      btnJogar.disabled = false;
      isProcessing = false;
    }, 1000);

  }, 3600);
});

// Inicialização dos contadores na carga da página
document.addEventListener('DOMContentLoaded', atualizarContadores);
