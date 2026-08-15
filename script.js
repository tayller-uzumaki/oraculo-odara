// script.js - Lógica Client-Side, Odùs e Controle da Mesa de Búzios

// Banco de Dados Sagrado dos 16 Odùs
const ODUS_DATABASE = {
  1: { numero: 1, nome: "Okaran", orixa: "Exu", elemento: "Fogo", favorabilidade: 25, fatoresFavoraveis: ["Agilidade para corrigir erros", "Coragem para cortar laços nocivos"], pontosAtencao: ["Evitar discussões impulsivas", "Cuidado com teimosia"], caminho: "Caminho da transformação rápida através do confronto de verdades. Okaran alerta para não forçar portas fechadas sem antes limpar os caminhos." },
  2: { numero: 2, nome: "Ejioko", orixa: "Ibejis e Ogum", elemento: "Ar", favorabilidade: 48, fatoresFavoraveis: ["Receptividade para acordos", "Apoio de parcerias estratégicas"], pontosAtencao: ["Indecisão paralisante", "Dependência da opinião alheia"], caminho: "Caminho da dualidade e da busca por alianças justas. Ejioko indica que dois caminhos estão abertos e a pressa pode prejudicar." },
  3: { numero: 3, nome: "Etaogundá", orixa: "Ogum", elemento: "Terra", favorabilidade: 82, fatoresFavoraveis: ["Provas e argumentos sólidos ao seu favor", "Força de vontade inabalável"], pontosAtencao: ["Agressividade nas palavras", "Exaustão física"], caminho: "Caminho do guerreiro incansável. Etaogundá promete o triunfo para quem não recua diante das batalhas difíceis." },
  4: { numero: 4, nome: "Irosun", orixa: "Iemanjá e Oxóssi", elemento: "Terra", favorabilidade: 40, fatoresFavoraveis: ["Intuição apurada para farejar armadilhas", "Proteção ancestral silenciosa"], pontosAtencao: ["Ilusões e falsas promessas", "Cegueira emocional"], caminho: "Caminho da prudência e do olhar atento. Irosun pede paciência para que a névoa se desfaça antes do veredito." },
  5: { numero: 5, nome: "Oxê", orixa: "Oxum", elemento: "Água", favorabilidade: 88, fatoresFavoraveis: ["Magnetismo elevado", "Flexibilidade para contornar obstáculos"], pontosAtencao: ["Gasto de energia com intrigas", "Vaidade"], caminho: "Caminho do brilho e da fartura reconquistada. Oxê indica que o sofrimento está dando lugar à colheita merecida." },
  6: { numero: 6, nome: "Obará", orixa: "Xangô e Oxóssi", elemento: "Ar / Terra", favorabilidade: 95, fatoresFavoraveis: ["Reconhecimento do seu direito legítimo", "Clareza nos argumentos"], pontosAtencao: ["Excesso de ostentação", "Falar sobre a conquista antes da hora"], caminho: "Obará é o Odù da grande virada de chave. Representa a superação da humilhação e a conquista da honra e da fartura." },
  7: { numero: 7, nome: "Odi", orixa: "Obaluaê e Oxalufã", elemento: "Terra", favorabilidade: 35, fatoresFavoraveis: ["Firmeza para suportar a pressão", "Resiliência e paciência"], pontosAtencao: ["Apegos ao passado ou ressentimentos", "Pessimismo"], caminho: "Caminho do renascimento duro mas duradouro. Odi mostra que para o novo entrar, as dívidas do passado precisam ser zeradas." },
  8: { numero: 8, nome: "Ejionile", orixa: "Oxaguiã / Oxalá", elemento: "Ar", favorabilidade: 90, fatoresFavoraveis: ["Razão e ética ao seu lado", "Clareza mental absoluta"], pontosAtencao: ["Ansiedade e excesso de pensamentos", "Impaciência com os outros"], caminho: "Caminho da liderança elevada e da vitória da razão sobre o caos. Ejionile traz a paz que sucede a tempestade." },
  9: { numero: 9, nome: "Osa", orixa: "Oyá (Iansã) e Yemanja", elemento: "Fogo / Água", favorabilidade: 42, fatoresFavoraveis: ["Mudança rápida do cenário a seu favor", "Coragem para inovar"], pontosAtencao: ["Falta de foco e inquietação", "Explosões emocionais"], caminho: "Caminho da tempestade que varre o ultrapassado. Osa exige flexibilidade para se adaptar às guinadas." },
  10: { numero: 10, nome: "Ofun", orixa: "Oxalá", elemento: "Ar", favorabilidade: 85, fatoresFavoraveis: ["Autoridade moral inquestionável", "Proteção espiritual elevada"], pontosAtencao: ["Prepotência", "Isolamento"], caminho: "Caminho da bênção dos anciãos e da pureza de propósitos. Ofun concede a vitória aos que agem de boa-fé." },
  11: { numero: 11, nome: "Owonrin", orixa: "Exu e Oyá", elemento: "Fogo", favorabilidade: 30, fatoresFavoraveis: ["Capacidade de reação rápida a emergências", "Criatividade"], pontosAtencao: ["Desorganização ou perda de prazos", "Confiar em promessas verbais"], caminho: "Caminho do imprevisível e do aprendizado rápido. Owonrin avisa que o cenário pode mudar de posição de repente." },
  12: { numero: 12, nome: "Ejilaxeborá", orixa: "Xangô", elemento: "Fogo", favorabilidade: 92, fatoresFavoraveis: ["Provas irrefutáveis ao seu favor", "Sentença ou resolução justa"], pontosAtencao: ["Julgar os outros com rigor excessivo", "Orgulho"], caminho: "Caminho da balança exata e do tribunal divino. Ejilaxeborá traz o julgamento imparcial onde a verdade prevalece." },
  13: { numero: 13, nome: "Okanran Meji", orixa: "Nanã e Obaluaê", elemento: "Terra", favorabilidade: 45, fatoresFavoraveis: ["Estabilidade a longo prazo", "Decisão definitiva e sólida"], pontosAtencao: ["Impaciência angustiante", "Melancolia"], caminho: "Caminho da sabedoria ancestral da terra profunda. Ensina que frutos não amadurecem à força." },
  14: { numero: 14, nome: "Iká", orixa: "Oxumaré", elemento: "Água / Ar", favorabilidade: 84, fatoresFavoraveis: ["Capacidade de reinvenção", "Atração de oportunidades"], pontosAtencao: ["Espalhar energia em muitas coisas", "Falta de foco"], caminho: "Caminho do arco-íris e da transformação constante. Iká indica que a tempestade passou e traz novas opções." },
  15: { numero: 15, nome: "Obeogundá", orixa: "Ewá e Ogum", elemento: "Ar", favorabilidade: 38, fatoresFavoraveis: ["Proteção contra traições", "Estratégia perspicaz"], pontosAtencao: ["Desconfiança paranóica", "Isolamento excessivo"], caminho: "Caminho da visão além do alcance e da intuição afiada. Adverte contra armadilhas disfarçadas de facilidade." },
  16: { numero: 16, nome: "Alafia", orixa: "Orunmilá e Oxalá", elemento: "Luz / Ar", favorabilidade: 98, fatoresFavoraveis: ["Harmonia total dos fatores", "Conclusão extremamente favorável"], pontosAtencao: ["Acomodação na reta final", "Ingenuidade"], caminho: "Caminho da bênção suprema onde todos os búzios se abrem para confirmar a graça do oráculo." }
};

let oduDiretorAtual = null;
let perguntasRestantes = 0;
let pacoteAtivo = { qtd: 5, valor: 25.99 };
let ultimaPerguntaEnviada = "";

// 1. Calculadora de Odù de Nascimento
function calcularOduNumerologia(dataStr) {
  if (!dataStr) return 6;
  const numeros = dataStr.replace(/\D/g, '');
  let soma = numeros.split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  while (soma > 16) {
    soma = soma.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }
  return soma === 0 ? 1 : soma;
}

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
        ${oduDiretorAtual.caminho} Sob a regência do Orixá <strong>${oduDiretorAtual.orixa}</strong> e pela vibração do elemento <strong>${oduDiretorAtual.elemento}</strong>, este Odù guia seus passos e talentos naturais.
      </p>
      <div style="margin-top: 14px; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(245, 158, 11, 0.25);">
        <p style="color: #34d399; margin-bottom: 8px;"><strong>✨ Pontos Fortes:</strong> ${oduDiretorAtual.fatoresFavoraveis.join(' • ')}.</p>
        <p style="color: #f87171; margin-bottom: 0;"><strong>⚠️ Pontos de Alerta:</strong> ${oduDiretorAtual.pontosAtencao.join(' • ')}.</p>
      </div>
    `;

    document.getElementById('odu-caminho').innerHTML = textoCaminhoExpandido;
    document.getElementById('transicao-nome-odu').innerText = `${oduDiretorAtual.nome} (${oduDiretorAtual.orixa})`;

    const resOdu = document.getElementById('resultado-odu');
    resOdu.style.display = 'block';
    resOdu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    btn.innerText = '🔮 Descobrir Meu Odù';
  }, 600);
});

// 2. Gestão de Pacotes e PIX
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

// 3. Renderizador SVG dos Búzios
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

// 4. Pré-Filtro Client-Side de Apostas/Loterias (Evita gastar saldo antes da chamada)
function verificarApostaClient(pergunta) {
  const TERMOS_APOSTAS = [
    'mega sena', 'megasena', 'numeros da mega', 'números da mega', 'palpite',
    'quina', 'lotofacil', 'lotofácil', 'jogo do bicho', 'aposta', 'apostas',
    'loteria', 'tiger', 'tigrinho', 'bet', 'roleta', 'cassino'
  ];
  const pLower = pergunta.toLowerCase();
  return TERMOS_APOSTAS.some(t => pLower.includes(t));
}

// 5. Execução do Jogo de Búzios
document.getElementById('form-consulta')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  if (perguntasRestantes <= 0) {
    alert("Seu saldo de consultas acabou. Adquira um novo pacote!");
    return;
  }

  const perguntaInput = document.getElementById('pergunta');
  const pergunta = perguntaInput.value.trim();
  const area = document.getElementById('area-foco').value;

  // Trava anti-spam de pergunta idêntica
  if (pergunta === ultimaPerguntaEnviada) {
    alert("Você acabou de fazer essa mesma pergunta. Por favor, reformule a sua dúvida.");
    return;
  }

  // 🛡️ VERIFICAÇÃO CLIENT-SIDE DE APOSTAS (PRESERVA SALDO IMMEDIATAMENTE)
  if (verificarApostaClient(pergunta)) {
    const resContainer = document.getElementById('resultado-leitura');
    resContainer.style.display = 'block';
    resContainer.innerHTML = `
      <div class="card-bloqueio">
        <h3>🔮 Consulta Não Realizada</h3>
        <p>O jogo sagrado de búzios e os Orixás não indicam números de sorte, palpites para apostas, jogos de azar ou loterias. A sabedoria dos Odùs existe para orientar a vida, a evolução pessoal e o caminho espiritual.</p>
        <p class="nota-saldo">✨ <strong>Seu saldo foi preservado:</strong> você continua com <strong>${perguntasRestantes}</strong> consulta(s) disponível(is).</p>
      </div>
    `;
    resContainer.scrollIntoView({ behavior: 'smooth' });
    return;
  }

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

  // Sorteio dos Búzios
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
  }, 1200);

  // Chamada ao Backend (/api/consultar)
  try {
    const response = await fetch('/api/consultar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pergunta,
        area,
        oduNumero: oduJogo.numero,
        oduNome: oduJogo.nome,
        orixa: oduJogo.orixa,
        elemento: oduJogo.elemento,
        favorabilidade: oduJogo.favorabilidade,
        numAbertos
      })
    });

    const data = await response.json();

    setTimeout(() => {
      btn.disabled = false;
      const resContainer = document.getElementById('resultado-leitura');

      if (data.bloqueado) {
        // PERGUNTA BLOQUEADA POR SEGURANÇA OU APOSTAS -> NÃO DECREMENTA SALDO
        resContainer.innerHTML = `
          <div class="card-bloqueio">
            <p style="white-space: pre-line;">${data.mensagem}</p>
            <p class="nota-saldo">✨ <strong>Saldo Mantido:</strong> ${perguntasRestantes} consulta(s) disponível(is).</p>
          </div>
        `;
      } else {
        // CONSULTA REALIZADA COM SUCESSO -> DECREMENTA CRÉDITO
        perguntasRestantes--;
        document.getElementById('qtd-perguntas').innerText = perguntasRestantes;
        ultimaPerguntaEnviada = pergunta;

        const htmlRespostaFormatada = data.resposta
          .replace(/\n\n/g, '<br><br>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        resContainer.innerHTML = `
          <div class="leitura-header">
            <span class="tag-gold">🐚 Caída: ${numAbertos} Búzios Abertos | Odù ${oduJogo.nome} (${oduJogo.orixa})</span>
            <span class="area-tag">Área: <strong>${area}</strong></span>
          </div>

          <div class="favorability-container">
            <div class="favorability-label">
              <span>Favorabilidade Oracular</span>
              <span>${oduJogo.favorabilidade}%</span>
            </div>
            <div class="favorability-bar-bg">
              <div class="favorability-bar-fill" style="width: ${oduJogo.favorabilidade}%;"></div>
            </div>
          </div>

          <div class="resposta-ia-content">
            ${htmlRespostaFormatada}
          </div>
        `;
      }

      resContainer.style.display = 'block';
      resContainer.scrollIntoView({ behavior: 'smooth' });
      status.innerText = "Leitura concluída com sucesso!";
    }, 2800);

  } catch (err) {
    console.error("Erro na comunicação com a API:", err);
    btn.disabled = false;
    alert("Ocorreu uma oscilação na conexão com o oráculo. Nenhum crédito foi consumido.");
  }
});
