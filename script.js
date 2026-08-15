// script.js - Lógica e Animação dos Búzios Restauradas

const ODUS_DATABASE = {
  1: { numero: 1, nome: "Okaran", orixa: "Exu", elemento: "Fogo", favorabilidade: 25, fortes: ["Agilidade para corrigir erros", "Coragem para cortar laços nocivos"], atencao: ["Evitar discussões impulsivas", "Cuidado com teimosia"], caminho: "O Odù Okaran traz a regência de Exu, conferindo uma ligação forte com a transformação rápida e o movimento. Quem nasce sob este Odù possui coragem e agilidade." },
  2: { numero: 2, nome: "Ejioko", orixa: "Ibejis e Ogum", elemento: "Ar", favorabilidade: 48, fortes: ["Receptividade para acordos", "Apoio de parcerias"], atencao: ["Indecisão paralisante", "Dependência dos outros"], caminho: "O Odù Ejioko traz a regência de Ibejis e Ogum, conferindo capacidade de união e busca por justiça. Quem nasce sob este Odù possui sensibilidade para alianças." },
  3: { numero: 3, nome: "Etaogundá", orixa: "Ogum", elemento: "Terra", favorabilidade: 82, fortes: ["Força de vontade inabalável", "Determinação para vencer"], atencao: ["Agressividade nas palavras", "Exaustão física"], caminho: "O Odù Etaogundá traz a regência de Ogum, conferindo firmeza e capacidade de superar obstáculos difíceis através do trabalho." },
  4: { numero: 4, nome: "Irosun", orixa: "Iemanjá e Oxóssi", elemento: "Terra", favorabilidade: 40, fortes: ["Intuição apurada", "Proteção ancestral"], atencao: ["Ilusões e falsas promessas", "Cegueira emocional"], caminho: "O Odù Irosun traz a regência de Iemanjá e Oxóssi, conferindo intuição afiada e sabedoria para enxergar além das aparências." },
  5: { numero: 5, nome: "Oxê", orixa: "Oxum", elemento: "Água", favorabilidade: 88, fortes: ["Magnetismo elevado", "Flexibilidade"], atencao: ["Inveja alheia", "Vaidade em excesso"], caminho: "O Odù Oxê traz a regência de Oxum, conferindo sensibilidade, encanto e grande capacidade de renovação." },
  6: { numero: 6, nome: "Obará", orixa: "Xangô / Oxóssi", elemento: "Ar / Terra", favorabilidade: 95, fortes: ["Intuição e percepção espiritual aguçadas", "Proteção ancestral de Xangô / Oxóssi"], atencao: ["Evitar precipitações e ansiedade", "Cuidado com desgastes na energia pessoal"], caminho: "O Odù Obará traz a regência de Xangô / Oxóssi, conferindo uma conexão especial com o elemento Ar / Terra. Quem nasce sob este Odù possui uma presença marcante e capacidade natural para buscar o discernimento. Sua vibração nativa favorece grande riqueza, fartura e expansão." },
  7: { numero: 7, nome: "Odi", orixa: "Obaluaê e Oxalufã", elemento: "Terra", favorabilidade: 35, fortes: ["Firmeza para suportar pressão", "Resiliência"], atencao: ["Apegos ao passado", "Pessimismo"], caminho: "O Odù Odi traz a regência de Obaluaê e Oxalufã, conferindo capacidade de resistência e reconstrução." },
  8: { numero: 8, nome: "Ejionile", orixa: "Oxaguiã / Oxalá", elemento: "Ar", favorabilidade: 90, fortes: ["Liderança natural", "Clareza mental"], atencao: ["Ansiedade e excesso de pensamentos", "Impaciência"], caminho: "O Odù Ejionile traz a regência de Oxaguiã, conferindo dinamismo, inteligência e força de liderança." },
  9: { numero: 9, nome: "Osa", orixa: "Oyá (Iansã)", elemento: "Fogo", favorabilidade: 42, fortes: ["Coragem para inovar", "Adaptabilidade"], atencao: ["Inquietação", "Impulsividade"], caminho: "O Odù Osa traz a regência de Oyá, conferindo movimento e força para transformar situações estagnadas." },
  10: { numero: 10, nome: "Ofun", orixa: "Oxalá", elemento: "Ar", favorabilidade: 85, fortes: ["Sabedoria e autoridade moral", "Proteção"], atencao: ["Prepotência", "Isolamento"], caminho: "O Odù Ofun traz a regência de Oxalá, conferindo paz, elevação e bênçãos espirituais." },
  11: { numero: 11, nome: "Owonrin", orixa: "Exu e Oyá", elemento: "Fogo", favorabilidade: 30, fortes: ["Reação rápida a mudanças", "Criatividade"], atencao: ["Desorganização", "Confiar sem verificar"], caminho: "O Odù Owonrin traz a regência de Exu e Oyá, ensinando a ter maleabilidade diante dos ventos." },
  12: { numero: 12, nome: "Ejilaxeborá", orixa: "Xangô", elemento: "Fogo", favorabilidade: 92, fortes: ["Justiça ao seu lado", "Verdade"], atencao: ["Julgamento rigoroso", "Orgulho"], caminho: "O Odù Ejilaxeborá traz a regência de Xangô, concedendo equilíbrio, honra e triunfo da justiça." },
  13: { numero: 13, nome: "Okanran Meji", orixa: "Nanã", elemento: "Terra", favorabilidade: 45, fortes: ["Maturidade", "Decisões ponderadas"], atencao: ["Impaciência angustiante", "Melancolia"], caminho: "O Odù Okanran Meji traz a regência de Nanã, ensinando a respeitar o tempo das coisas." },
  14: { numero: 14, nome: "Iká", orixa: "Oxumaré", elemento: "Água / Ar", favorabilidade: 84, fortes: ["Renovação contínua", "Flexibilidade"], atencao: ["Falta de foco", "Falar demais"], caminho: "O Odù Iká traz a regência de Oxumaré, promovendo prosperidade e capacidade de adaptação." },
  15: { numero: 15, nome: "Obeogundá", orixa: "Ewá e Ogum", elemento: "Ar", favorabilidade: 38, fortes: ["Percepção afiada", "Estratégia"], atencao: ["Desconfiança excessiva", "Isolamento"], caminho: "O Odù Obeogundá traz a regência de Ewá e Ogum, favorecendo a intuição e a autoproteção." },
  16: { numero: 16, nome: "Alafia", orixa: "Orunmilá e Oxalá", elemento: "Luz / Ar", favorabilidade: 98, fortes: ["Harmonia total", "Paz e confirmação"], atencao: ["Acomodação", "Ingenuidade"], caminho: "O Odù Alafia traz a regência de Orunmilá e Oxalá, indicando luz, abertura total e bênçãos." }
};

let perguntasRestantes = 0;
let pacoteAtivo = { qtd: 10, valor: 39.99 };

// Calculadora Numerológica de Odù (1 a 16)
function calcularOduNumerologia(dataStr) {
  if (!dataStr) return 6;
  const numeros = dataStr.replace(/\D/g, '');
  let soma = numeros.split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  while (soma > 16) {
    soma = soma.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }
  return soma === 0 ? 1 : soma;
}

// 1. Descobrir Odù de Nascimento
document.getElementById('form-odu')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nomeConsulente').value.trim();
  const dataInput = document.getElementById('dataNasc').value;

  const numOdu = calcularOduNumerologia(dataInput);
  const oduObj = ODUS_DATABASE[numOdu] || ODUS_DATABASE[6];

  const nomeUpper = nome ? nome.toUpperCase() : 'CONSULTANTE';
  document.getElementById('odu-headline-nome').innerText = `OLÁ, ${nomeUpper}! SEUS CAMINHOS SOB A LUZ DE ODÙ ${oduObj.nome.toUpperCase()}`;

  document.getElementById('pill-identificacao').innerText = `Identificação: Odù ${oduObj.numero < 10 ? '0' + oduObj.numero : oduObj.numero} — ${oduObj.nome}`;
  document.getElementById('pill-regencia').innerText = `Regência: ${oduObj.orixa}`;
  document.getElementById('pill-elemento').innerText = `Elemento: ${oduObj.elemento}`;

  document.getElementById('odu-texto-caminho').innerHTML = `<p>${oduObj.caminho}</p>`;

  // Renderizar Pontos
  document.getElementById('lista-pontos-fortes').innerHTML = oduObj.fortes.map(f => `<li>${f}</li>`).join('');
  document.getElementById('lista-pontos-atencao').innerHTML = oduObj.atencao.map(a => `<li>${a}</li>`).join('');

  const resOdu = document.getElementById('resultado-odu');
  resOdu.style.display = 'block';
  resOdu.scrollIntoView({ behavior: 'smooth' });
});

function rolarParaPacotes() {
  document.getElementById('secao-pacotes').scrollIntoView({ behavior: 'smooth' });
}

// 2. Pacotes e PIX
function selecionarPacote(qtd, valor) {
  pacoteAtivo = { qtd, valor };
  document.getElementById('pacote-5').classList.toggle('active', qtd === 5);
  document.getElementById('pacote-10').classList.toggle('active', qtd === 10);
}

function gerarPix() {
  const container = document.getElementById('area-pix');
  const qrSimulado = "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865405" + pacoteAtivo.valor.toFixed(2) + "5802BR5913Oraculo Odara";

  container.innerHTML = `
    <div style="background: #190a2b; padding: 16px; border-radius: 8px; border: 1px solid #8b5cf6; text-align: center; margin-top: 14px;">
      <p style="color: #fff; font-size: 13px; margin-bottom: 8px;">Copia e Cola PIX (R$ ${pacoteAtivo.valor.toFixed(2)}):</p>
      <input type="text" value="${qrSimulado}" readonly style="width: 100%; padding: 8px; font-size: 11px; background: #0b0512; color: #fef08a; border: 1px solid #321752; border-radius: 4px; margin-bottom: 12px;" />
      <button onclick="confirmarPagamento()" class="btn-purple" style="background: #059669; color: #fff;">🛡️ Simular Pagamento Aprovado</button>
    </div>
  `;
}

function confirmarPagamento() {
  perguntasRestantes = pacoteAtivo.qtd;
  document.getElementById('qtd-perguntas').innerText = perguntasRestantes;
  document.getElementById('secao-jogada').style.display = 'block';
  document.getElementById('secao-jogada').scrollIntoView({ behavior: 'smooth' });
}

// 3. Renderização SVG dos Búzios
function criarBuzioSVG(eAberto) {
  if (eAberto) {
    return `
      <svg viewBox="0 0 50 70" width="100%" height="100%">
        <path d="M25 2 C 42 2, 48 18, 47 35 C 46 52, 38 68, 25 68 C 12 68, 4 52, 3 35 C 2 18, 8 2, 25 2 Z" fill="#fef3c7" stroke="#8b5cf6" stroke-width="2"/>
        <path d="M25 10 C 22 18, 22 52, 25 60 C 28 52, 28 18, 25 10 Z" fill="#451a03"/>
      </svg>
    `;
  } else {
    return `
      <svg viewBox="0 0 50 70" width="100%" height="100%">
        <path d="M25 3 C 41 3, 47 19, 46 35 C 45 51, 37 67, 25 67 C 13 67, 5 51, 4 35 C 3 19, 9 3, 25 3 Z" fill="#78350f" stroke="#321752" stroke-width="2"/>
      </svg>
    `;
  }
}

// 4. Pré-filtro Client-side para apostas (Preserva saldo)
function verificarApostaClient(pergunta) {
  const TERMOS_APOSTAS = [
    'mega sena', 'megasena', 'numeros da mega', 'números da mega', 'palpite',
    'quina', 'lotofacil', 'lotofácil', 'jogo do bicho', 'aposta', 'apostas',
    'loteria', 'tiger', 'tigrinho', 'bet', 'roleta', 'cassino'
  ];
  return TERMOS_APOSTAS.some(t => pergunta.toLowerCase().includes(t));
}

// 5. Lançar os Búzios na Mesa
document.getElementById('form-consulta')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  if (perguntasRestantes <= 0) {
    alert("Seu saldo de consultas acabou. Adquira um novo pacote!");
    return;
  }

  const perguntaInput = document.getElementById('pergunta');
  const pergunta = perguntaInput.value.trim();

  // Trava de aposta no client-side
  if (verificarApostaClient(pergunta)) {
    const resContainer = document.getElementById('resultado-leitura');
    resContainer.style.display = 'block';
    resContainer.innerHTML = `
      <div class="card-alerta-sensivel">
        <p>🔮 <strong>Consulta Não Realizada:</strong> O jogo de búzios e os Orixás não indicam palpites para apostas, loterias ou jogos de azar. A sabedoria dos Odùs é voltada para orientação pessoal e espiritual.</p>
        <p style="margin-top: 8px; color: var(--gold-text);">✨ Seu saldo permanece intacto: <strong>${perguntasRestantes}</strong> consulta(s) disponível(is).</p>
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
  mesa.classList.add('mesa-sacudindo');

  // Sorteio dos 16 búzios
  const numAbertos = Math.floor(Math.random() * 16) + 1;
  const oduJogo = ODUS_DATABASE[numAbertos];

  for (let i = 0; i < 16; i++) {
    const eAberto = i < numAbertos;
    const buzioEl = document.createElement('div');
    buzioEl.className = 'buzio';
    buzioEl.innerHTML = criarBuzioSVG(eAberto);

    const top = Math.floor(Math.random() * 65 + 15);
    const left = Math.floor(Math.random() * 65 + 15);
    const rot = Math.floor(Math.random() * 360);

    buzioEl.style.top = `${top}%`;
    buzioEl.style.left = `${left}%`;
    buzioEl.style.transform = `rotate(${rot}deg)`;

    peneira.appendChild(buzioEl);
  }

  status.innerText = "🔮 Lançando os búzios na mesa sagrada...";

  setTimeout(() => {
    mesa.classList.remove('mesa-sacudindo');
    status.innerText = "✨ Consultando a sabedoria ancestral dos Orixás...";
  }, 1000);

  try {
    const response = await fetch('/api/consultar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pergunta,
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
        // Bloqueio por segurança/aposta -> Não decrementa crédito
        resContainer.innerHTML = `
          <div class="card-alerta-sensivel">
            <p style="white-space: pre-line;">${data.mensagem}</p>
          </div>
        `;
      } else {
        // Sucesso -> Decrementa crédito
        perguntasRestantes--;
        document.getElementById('qtd-perguntas').innerText = perguntasRestantes;

        const htmlRespostaFormatada = data.resposta
          .replace(/\n\n/g, '<br><br>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        resContainer.innerHTML = `
          <div class="resposta-texto">
            ${htmlRespostaFormatada}
          </div>
        `;
      }

      resContainer.style.display = 'block';
      resContainer.scrollIntoView({ behavior: 'smooth' });
    }, 2200);

  } catch (err) {
    btn.disabled = false;
    alert("Erro na conexão com o oráculo. Seu crédito não foi consumido.");
  }
});
