// Banco de Dados Sagrado dos 16 Odùs
const ODUS_DATABASE = {
  1: {
    numero: 1, nome: "Okaran", orixa: "Exu", elemento: "Fogo",
    mensagemGeral: "Okaran traz o movimento veloz e o confronto com as verdades. É um momento de cautela, onde forçar portas fechadas pode trazer desgastes desnecessários. Exu pede clareza, disciplina e pé no chão.",
    conselho: "Não tome decisões precipitadas nem aja movido pela impulsividade nas próximas horas. Recue um passo para enxergar o cenário com maior lucidez."
  },
  2: {
    numero: 2, nome: "Ejioko", orixa: "Ibejis e Ogum", elemento: "Ar",
    mensagemGeral: "Ejioko aponta para um momento de dualidade e negociação. Existem caminhos que dependem de acordos justos e de equilíbrio emocional. A pressa pode atrapalhar a construção de uma aliança sólida.",
    conselho: "Busque o diálogo e analise todas as opções com calma antes de se comprometer."
  },
  3: {
    numero: 3, nome: "Etaogundá", orixa: "Ogum", elemento: "Terra",
    mensagemGeral: "Etaogundá fala da força do guerreiro e do triunfo alcançado através da persistência e do combate justo. Ogum abre caminhos para quem age com verdade e determinação.",
    conselho: "Mantenha o foco nos seus objetivos concretos e não se deixe abalar por provações emocionais passageiras."
  },
  4: {
    numero: 4, nome: "Irosun", orixa: "Iemanjá e Oxóssi", elemento: "Terra",
    mensagemGeral: "Irosun pede calma e olhar atento. É uma energia de proteção ancestral que orienta a aguardar a névoa baixar para que todos os fatos se revelem com clareza.",
    conselho: "Guarde seus planos em silêncio e evite precipitações enquanto os detalhes ainda estão se ajustando."
  },
  5: {
    numero: 5, nome: "Oxê", orixa: "Oxum", elemento: "Água",
    mensagemGeral: "Oxê traz a doçura de Oxum, a renovação e a prosperidade. Indica que fases difíceis estão dando lugar a um ciclo de acolhimento, magnetismo e colheita merecida.",
    conselho: "Cuide do seu bem-estar emocional e espiritual, mantendo a serenidade para atrair o que há de melhor."
  },
  6: {
    numero: 6, nome: "Obará", orixa: "Xangô e Oxóssi", elemento: "Ar / Terra",
    mensagemGeral: "Obará é o Odù da grande virada, representando a superação de desafios e o alcance da fartura e do reconhecimento. A justiça e a verdade prevalecem neste caminho.",
    conselho: "Mantenha a postura íntegra e humilde, mantendo o foco em suas metas sem ostentação."
  },
  7: {
    numero: 7, nome: "Odi", orixa: "Obaluaê e Oxalufã", elemento: "Terra",
    mensagemGeral: "Odi mostra a importância de encerrar ciclos antigos para permitir o surgimento do novo. Exige resiliência, paciência e desapego do que já não serve mais.",
    conselho: "Faça uma limpeza emocional, liberando frustrações passadas para caminhar mais leve."
  },
  8: {
    numero: 8, nome: "Ejionile", orixa: "Oxaguiã / Oxalá", elemento: "Ar",
    mensagemGeral: "Ejionile traz a vitória impulsionada pela sabedoria, clareza mental e postura ética. Oxaguiã sopra a paz após a tempestade e orienta com estratégia.",
    conselho: "Evite conflitos e use a lógica e a serenidade como suas principais ferramentas."
  },
  9: {
    numero: 9, nome: "Osa", orixa: "Oyá (Iansã) e Yemanjá", elemento: "Fogo / Água",
    mensagemGeral: "Osa traz a força dos ventos de Iansã, movimentando o que estava estagnado e exigindo flexibilidade para se adaptar a mudanças de rumo.",
    conselho: "Não tome decisões cruciais sob forte emoção. Respire fundo e espere o momento certo para agir."
  },
  10: {
    numero: 10, nome: "Ofun", orixa: "Oxalá", elemento: "Ar",
    mensagemGeral: "Ofun traz a bênção da sabedoria superior e da proteção de Oxalá. Favorece soluções honrosas para quem caminha com boa-fé e respeito.",
    conselho: "Mantenha suas intenções puras e confie na proteção espiritual que envolve seus caminhos."
  },
  11: {
    numero: 11, nome: "Owonrin", orixa: "Exu e Oyá", elemento: "Fogo",
    mensagemGeral: "Owonrin alerta para a necessidade de atenção dobrada com imprevistos, acordos e comunicação. Pede cuidado especial com detalhes e organização.",
    conselho: "Confirme dados por escrito e previna-se antes de assumir novos compromissos."
  },
  12: {
    numero: 12, nome: "Ejilaxeborá", orixa: "Xangô", elemento: "Fogo",
    mensagemGeral: "Ejilaxeborá representa a balança da justiça e a força do equilíbrio. Onde há honestidade e razão, o resultado se mostra justo e firme.",
    conselho: "Permaneça fiel aos seus valores e à verdade, deixando que o tempo coloque cada coisa em seu devido lugar."
  },
  13: {
    numero: 13, nome: "Okanran Meji", orixa: "Nanã e Obaluaê", elemento: "Terra",
    mensagemGeral: "Okanran Meji lembra que certos processos exigem o tempo da maturação natural. A sabedoria de Nanã ensina a ter paciência e respeito aos ciclos.",
    conselho: "Respeite o ritmo das coisas sem desespero. O amadurecimento trará frutos sólidos."
  },
  14: {
    numero: 14, nome: "Iká", orixa: "Oxumaré", elemento: "Água / Ar",
    mensagemGeral: "Iká simboliza a renovação contínua e a capacidade de se reinventar. A energia de Oxumaré transforma dificuldades em novas oportunidades de crescimento.",
    conselho: "Mantenha a mente aberta para caminhos alternativos que possam surgir."
  },
  15: {
    numero: 15, nome: "Obeogundá", orixa: "Ewá e Ogum", elemento: "Ar",
    mensagemGeral: "Obeogundá concede percepção aguçada e discernimento para enxergar além das aparências. Protege contra ilusões e promessas vazias.",
    conselho: "Confie na sua intuição e investigue com calma antes de tomar qualquer direção."
  },
  16: {
    numero: 16, nome: "Alafia", orixa: "Orunmilá e Oxalá", elemento: "Luz / Ar",
    mensagemGeral: "Alafia é a confirmação da luz, da paz de espírito e da bênção plena. Indica harmonia nos caminhos e sustentação espiritual.",
    conselho: "Agradeça com o coração sereno e siga seu caminho com leveza e confiança."
  }
};

// ----------------------------------------------------
// TRAVA DE SEGURANÇA E BLOQUEIO DE CONTEÚDO SENSÍVEL
// ----------------------------------------------------
function verificarPerguntaSensivel(textoPergunta) {
  const perguntaLower = textoPergunta.toLowerCase();

  // 1. Palavras e Expressões de Ideação Suicida / Morte / Autoagressão
  const termosMorteSuicidio = [
    'quero morrer', 'desejo morrer', 'vou me matar', 'pensando em me matar',
    'suicidio', 'suicídio', 'cometer suicidio', 'tirar minha vida', 'tirar a minha vida',
    'fim da minha vida', 'nao quero mais viver', 'não quero mais viver', 'me matar',
    'cortar os pulsos', 'me enforcar', 'overdose'
  ];

  // 2. Palavras e Expressões de Jogos de Azar / Apostas / Loteria
  const termosJogosAzar = [
    'jogo do bicho', 'loteria', 'mega sena', 'megasena', 'quina', 'lotofacil',
    'lotofácil', 'tigrinho', 'bet', 'aposta', 'numeros da sorte', 'números da sorte',
    'palpite de hoje', 'ganhar na loteria', 'cassino'
  ];

  for (let termo of termosMorteSuicidio) {
    if (perguntaLower.includes(termo)) {
      return { bloqueado: true, tipo: 'SAUDE_MENTAL' };
    }
  }

  for (let termo of termosJogosAzar) {
    if (perguntaLower.includes(termo)) {
      return { bloqueado: true, tipo: 'JOGOS_AZAR' };
    }
  }

  return { bloqueado: false };
}

// Estado da Aplicação
let oduDiretorAtual = null;
let perguntasRestantes = 5;
let pacoteAtivo = { qtd: 5, valor: 25.99 };

// Calculadora de Odù de Nascimento
function calcularOduNumerologia(dataStr) {
  if (!dataStr) return 6;
  const numeros = dataStr.replace(/\D/g, '');
  let soma = numeros.split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  while (soma > 16) {
    soma = soma.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }
  return soma === 0 ? 1 : soma;
}

// Etapa 1: Odù de Nascimento
document.getElementById('form-odu')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const dataInput = document.getElementById('dataNasc').value;
  if (!dataInput) return;

  const btn = document.getElementById('btn-calc-odu');
  if (btn) btn.innerText = '🔮 Mapeando Força Ancestral...';

  setTimeout(() => {
    const numOdu = calcularOduNumerologia(dataInput);
    oduDiretorAtual = ODUS_DATABASE[numOdu] || ODUS_DATABASE[6];

    const elNum = document.getElementById('odu-numero');
    const elNome = document.getElementById('odu-nome');
    const elOrixa = document.getElementById('odu-orixa');
    const elElem = document.getElementById('odu-elemento');
    const elCaminho = document.getElementById('odu-caminho');

    if (elNum) elNum.innerText = oduDiretorAtual.numero;
    if (elNome) elNome.innerText = oduDiretorAtual.nome;
    if (elOrixa) elOrixa.innerText = oduDiretorAtual.orixa;
    if (elElem) elElem.innerText = oduDiretorAtual.elemento;

    if (elCaminho) {
      elCaminho.innerHTML = `
        <p style="margin-bottom: 12px; line-height: 1.7; font-size: 14.5px; color: #e4e4e7;">
          Seu Odù de nascimento é <strong>${oduDiretorAtual.nome}</strong>, sob a regência de <strong>${oduDiretorAtual.orixa}</strong> e elemento <strong>${oduDiretorAtual.elemento}</strong>.
        </p>
        <p style="margin-bottom: 12px; line-height: 1.7; font-size: 14px; color: #d4d4d8;">
          ${oduDiretorAtual.mensagemGeral}
        </p>
        <p style="margin-bottom: 0; line-height: 1.7; font-size: 14px; color: #fbbf24; font-style: italic;">
          " ${oduDiretorAtual.conselho} "
        </p>
      `;
    }

    const resOdu = document.getElementById('resultado-odu');
    if (resOdu) {
      resOdu.style.display = 'block';
      resOdu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (btn) btn.innerText = '🔮 Descobrir Meu Odù';
  }, 600);
});

// Etapa 2: Pacotes
function selecionarPacote(qtd, valor) {
  pacoteAtivo = { qtd, valor };
  document.getElementById('pacote-5')?.classList.toggle('active', qtd === 5);
  document.getElementById('pacote-10')?.classList.toggle('active', qtd === 10);
}

function gerarPix() {
  const container = document.getElementById('area-pix');
  if (!container) return;
  
  const qrSimulado = "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865405" + pacoteAtivo.valor.toFixed(2) + "5802BR5913Oraculo Odara";

  container.innerHTML = `
    <div style="background: #0b0612; padding: 16px; border-radius: 8px; border: 1px solid #f59e0b; text-align: center; margin-top: 10px;">
      <p style="color: #fff; font-size: 14px; margin-bottom: 8px;">Copia e Cola PIX (R$ ${pacoteAtivo.valor.toFixed(2)}):</p>
      <input type="text" value="${qrSimulado}" readonly style="width: 100%; padding: 8px; font-size: 11px; background: #150a24; color: #fbbf24; border: 1px solid #332147; border-radius: 4px; margin-bottom: 12px;" />
      <button onclick="confirmarPagamento()" class="btn-primary" style="background: #059669; color: #fff; cursor: pointer; padding: 10px 18px; border-radius: 6px; border: none; font-weight: bold;">🛡️ Simular Pagamento Aprovado</button>
    </div>
  `;
}

function confirmarPagamento() {
  perguntasRestantes = pacoteAtivo.qtd;
  const elemQtd = document.getElementById('qtd-perguntas');
  if (elemQtd) elemQtd.innerText = perguntasRestantes;
  
  const secaoJogada = document.getElementById('secao-jogada');
  if (secaoJogada) {
    secaoJogada.style.display = 'block';
    secaoJogada.scrollIntoView({ behavior: 'smooth' });
  }
}

// Criador de Búzios em SVG
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

// Etapa 3: Jogada de Búzios e Consulta
document.getElementById('form-consulta')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const perguntaInput = document.getElementById('pergunta');
  const pergunta = perguntaInput ? perguntaInput.value.trim() : '';

  if (!pergunta) return;

  if (perguntasRestantes <= 0) {
    alert("Seu saldo de consultas acabou. Adquira um novo pacote para continuar!");
    return;
  }

  // --- VERIFICAÇÃO DE SEGURANÇA (TRAVA) ---
  const checagemSeguranca = verificarPerguntaSensivel(pergunta);

  if (checagemSeguranca.bloqueado) {
    const resContainer = document.getElementById('resultado-leitura');
    if (resContainer) {
      if (checagemSeguranca.tipo === 'SAUDE_MENTAL') {
        resContainer.innerHTML = `
          <div style="background: rgba(220, 38, 38, 0.12); border: 2px solid #ef4444; padding: 22px; border-radius: 12px; color: #fff; line-height: 1.7; margin-top: 15px;">
            <h3 style="color: #f87171; font-size: 18px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
              💛 Você não está só. Sua vida é preciosa!
            </h3>
            <p style="font-size: 14.5px; color: #fecdd3; margin-bottom: 12px;">
              Sentimos muito por você estar passando por um momento de dor ou esgotamento. O Oráculo é um espaço de orientação ancestral, mas questões delicadas ligadas ao sofrimento emocional profundo precisam do acolhimento humano e profissional adequado.
            </p>
            <p style="font-size: 14px; color: #fff; margin-bottom: 12px;">
              <strong>Por favor, busque apoio agora mesmo. Há pessoas prontas para te ouvir de forma gratuita, sigilosa e sem julgamentos:</strong>
            </p>
            <ul style="background: rgba(0,0,0,0.3); padding: 14px 20px; border-radius: 8px; font-size: 14px; color: #fbbf24; list-style: none;">
              <li style="margin-bottom: 6px;">📞 <strong>CVV (Centro de Valorização da Vida):</strong> Ligue <strong>188</strong> (Gratuito, 24 horas)</li>
              <li style="margin-bottom: 6px;">💬 <strong>Chat online:</strong> Acesse <a href="https://www.cvv.org.br" target="_blank" style="color: #60a5fa; text-decoration: underline;">www.cvv.org.br</a></li>
              <li>🏥 Busque uma Unidade Básica de Saúde (UBS) ou ligue 192 (SAMU) em emergências.</li>
            </ul>
            <p style="font-size: 13px; color: #a1a1aa; margin-top: 12px; text-align: center;">
              Nenhuma pergunta foi descontada do seu saldo. Por favor, cuide de você!
            </p>
          </div>
        `;
      } else if (checagemSeguranca.tipo === 'JOGOS_AZAR') {
        resContainer.innerHTML = `
          <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid #f59e0b; padding: 20px; border-radius: 12px; color: #fff; line-height: 1.7; margin-top: 15px;">
            <h3 style="color: #fbbf24; font-size: 17px; margin-bottom: 8px;">⚠️ Política de Uso do Oráculo</h3>
            <p style="font-size: 14px; color: #e4e4e7;">
              O jogo sagrado de búzios é uma ferramenta ancestral voltada para orientação de vida, espiritualidade e autoconhecimento. O oráculo <strong>não realiza palpites, previsões ou revelações para loterias, jogos de azar ou apostas financeiras</strong>.
            </p>
            <p style="font-size: 13px; color: #a1a1aa; margin-top: 10px;">
              Seu saldo de perguntas permanece intacto. Sinta-se à vontade para reformular sua dúvida focando em seus caminhos pessoais, profissionais ou afetivos.
            </p>
          </div>
        `;
      }

      resContainer.style.display = 'block';
      resContainer.scrollIntoView({ behavior: 'smooth' });
    }
    return; // Interrompe e não roda a animação nem consome pergunta
  }

  // --- FLUXO NORMAL DA CONSULTA (HUMANIZADO E FLUIDO) ---
  const areaSelect = document.getElementById('area-foco');
  const area = areaSelect ? areaSelect.value : 'Geral';
  const btn = document.getElementById('btn-jogar');
  if (btn) btn.disabled = true;

  const mesa = document.getElementById('mesa-buzios');
  const peneira = document.getElementById('peneira');
  const status = document.getElementById('status-jogo');
  
  if (mesa) mesa.style.display = 'block';
  if (peneira) peneira.innerHTML = '';
  
  const resContainer = document.getElementById('resultado-leitura');
  if (resContainer) resContainer.style.display = 'none';

  if (mesa) {
    mesa.scrollIntoView({ behavior: 'smooth', block: 'center' });
    mesa.classList.add('mesa-chacoalhando');
  }

  const numAbertos = Math.floor(Math.random() * 16) + 1;
  const oduJogo = ODUS_DATABASE[numAbertos] || ODUS_DATABASE[5];

  if (peneira) {
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
  }

  if (status) status.innerText = "🔮 Lançando os búzios na mesa sagrada...";

  setTimeout(() => {
    if (mesa) mesa.classList.remove('mesa-chacoalhando');
    if (status) status.innerText = "✨ Ouvindo a voz dos Orixás...";
  }, 1200);

  setTimeout(() => {
    // Desconta pergunta e atualiza interface
    perguntasRestantes--;
    const elemQtd = document.getElementById('qtd-perguntas');
    if (elemQtd) elemQtd.innerText = perguntasRestantes;

    if (resContainer) {
      // CONSTRUÇÃO DE TEXTO FLUIDO E HUMANO (SEM CAIXINHAS OU NÚMEROS)
      resContainer.innerHTML = `
        <div style="background: rgba(21, 10, 36, 0.95); border: 1px solid #f59e0b; padding: 24px; border-radius: 12px; color: #f4f4f5; font-size: 15px; line-height: 1.8; margin-top: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <p style="color: #fbbf24; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; font-weight: bold;">
            🐚 Revelação dos Búzios (${numAbertos} abertos / ${16 - numAbertos} fechados) • Odù ${oduJogo.nome}
          </p>

          <p style="font-size: 14px; color: #a1a1aa; font-style: italic; margin-bottom: 16px; border-left: 3px solid #fbbf24; padding-left: 10px;">
            Sua pergunta: "${pergunta}"
          </p>

          <p style="margin-bottom: 14px;">
            Olá! Ao lançar os búzios para a sua dúvida, a mesa se abriu sob a influência de <strong>Odù ${oduJogo.nome}</strong>, trazendo a presença e a força espiritual do Orixá <strong>${oduJogo.orixa}</strong>.
          </p>

          <p style="margin-bottom: 14px;">
            ${oduJogo.mensagemGeral}
          </p>

          <p style="margin-bottom: 14px;">
            Olhando para a sua questão no âmbito de <strong>${area.toLowerCase()}</strong>, a mensagem principal é de clareza e paciência. Os caminhos mostram que as coisas estão se movimentando, mas exigem de você maturidade para não agir no impulso e sabedoria para respeitar o tempo das coisas.
          </p>

          <p style="margin-bottom: 16px; background: rgba(245, 158, 11, 0.08); padding: 14px; border-radius: 8px; border: 1px dashed rgba(245, 158, 11, 0.3); color: #fde68a;">
            💡 <strong>Conselho para o seu momento:</strong> ${oduJogo.conselho}
          </p>

          <p style="text-align: center; color: #a1a1aa; font-size: 13px; margin-top: 18px; border-top: 1px solid #332147; padding-top: 12px; font-style: italic;">
            Que a sabedoria ancestral ilumine e traga paz aos seus passos!
          </p>

        </div>
      `;

      resContainer.style.display = 'block';
      resContainer.scrollIntoView({ behavior: 'smooth' });
    }

    if (btn) btn.disabled = false;
    if (status) status.innerText = "Leitura concluída com sucesso.";
  }, 2800);
});
