// Banco de Dados Sagrado com os 16 Odùs
const ODUS_DATABASE = {
  1: { numero: 1, nome: "Okaran", orixa: "Exu", elemento: "Fogo", caminho: "Caminho da transformação rápida através do confronto de verdades. Okaran alerta para não forçar portas fechadas sem limpar o caminho.", tendencia: "NÃO — Turbulência e risco de conflitos." },
  2: { numero: 2, nome: "Ejioko", orixa: "Ibejis e Ogum", elemento: "Ar", caminho: "Caminho da dualidade e da busca por alianças justas. Ejioko indica que dois caminhos estão abertos.", tendencia: "AINDA NÃO — Depende de negociações e acordos." },
  3: { numero: 3, nome: "Etaogundá", orixa: "Ogum", elemento: "Terra", caminho: "Caminho do guerreiro incansável. Etaogundá promete o triunfo para quem não recua diante das batalhas difíceis.", tendencia: "SIM — Vitória pelo combate justo e persistência." },
  4: { numero: 4, nome: "Irosun", orixa: "Iemanjá e Oxossi", elemento: "Terra", caminho: "Caminho da prudência e do olhar atento. Irosun pede paciência para que a névoa se desfaça.", tendencia: "AINDA NÃO — Verdades ocultas precisam emergir." },
  5: { numero: 5, nome: "Oxê", orixa: "Oxum", elemento: "Água", caminho: "Caminho do brilho e da fartura reconquistada. Oxê indica que o sofrimento dá lugar à colheita merecida.", tendencia: "SIM — Renovação, prosperidade e encerramento doce." },
  6: { numero: 6, nome: "Obará", orixa: "Xangô e Oxóssi", elemento: "Ar / Terra", caminho: "Odù da grande virada de chave. Representa a superação da humilhação e a conquista da honra e da fartura.", tendencia: "SIM — Altamente favorável e próspero." },
  7: { numero: 7, nome: "Odi", orixa: "Obaluaê e Oxalufã", elemento: "Terra", caminho: "Caminho do renascimento duro mas duradouro. Odi mostra que as dívidas do passado precisam ser zeradas.", tendencia: "AINDA NÃO — Exige resistência e encerramento de ciclos." },
  8: { numero: 8, nome: "Ejionile", orixa: "Oxaguiã / Oxalá", elemento: "Ar", caminho: "Caminho da liderança elevada e da vitória da razão sobre o caos. Ejionile traz a paz após a tempestade.", tendencia: "SIM — Vitória garantida pela sabedoria e ética." },
  9: { numero: 9, nome: "Osa", orixa: "Oyá (Iansã) e Yemanja", elemento: "Fogo / Água", caminho: "Caminho da tempestade que varre o que está ultrapassado. Exige flexibilidade para se adaptar.", tendencia: "AINDA NÃO — Ventos de mudança repentina." },
  10: { numero: 10, nome: "Ofun", orixa: "Oxalá", elemento: "Ar", caminho: "Caminho da bênção dos anciãos e da pureza de propósitos. Concede a vitória aos de boa-fé.", tendencia: "SIM — Solução abençoada pela sabedoria superior." },
  11: { numero: 11, nome: "Owonrin", orixa: "Exu e Oyá", elemento: "Fogo", caminho: "Caminho do imprevisível e do aprendizado rápido. Owonrin avisa que o tabuleiro muda de posição de repente.", tendencia: "NÃO — Cuidado com reviravoltas e imprevistos." },
  12: { numero: 12, nome: "Ejilaxeborá", orixa: "Xangô", elemento: "Fogo", caminho: "Caminho da balança exata e do tribunal divino. Traz o julgamento imparcial onde a verdade prevalece.", tendencia: "SIM — Justiça plena, rigorosa e indiscutível." },
  13: { numero: 13, nome: "Okanran Meji", orixa: "Nanã e Obaluaê", elemento: "Terra", caminho: "Caminho da sabedoria ancestral das águas paradas. Ensona que a fruta não amadurece à força.", tendencia: "AINDA NÃO — Exige maturação lenta e paciência." },
  14: { numero: 14, nome: "Iká", orixa: "Oxumaré", elemento: "Água / Ar", caminho: "Caminho do arco-íris e da transformação constante. Indica que a bonança traz novas opções.", tendencia: "SIM — Ciclo de renovação e flexibilidade." },
  15: { numero: 15, nome: "Obeogundá", orixa: "Ewá e Ogum", elemento: "Ar", caminho: "Caminho da visão além do alcance e da intuição afiada. Adverte contra armadilhas disfarçadas.", tendencia: "AINDA NÃO — Exige discernimento apurado." },
  16: { numero: 16, nome: "Alafia", orixa: "Orunmilá e Oxalá", elemento: "Luz / Ar", caminho: "Caminho da bênção suprema onde todos os búzios se abrem para confirmar a graça.", tendencia: "SIM — Luz absoluta, paz e vitória plena." }
};

let oduDiretorAtual = null;
let perguntasRestantes = 0;
let pacoteAtivo = { qtd: 5, valor: 25.99 };

// Função de Numerologia dos Odùs
function calcularOduNumerologia(dataStr) {
  if (!dataStr) return 6;
  const numeros = dataStr.replace(/\D/g, '');
  let soma = numeros.split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  while (soma > 16) {
    soma = soma.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }
  return soma === 0 ? 1 : soma;
}

// Etapa 1: Calcular Odù
document.getElementById('form-odu')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const dataInput = document.getElementById('dataNasc').value;
  if (!dataInput) return;

  const btn = document.getElementById('btn-calc-odu');
  btn.innerText = 'Calculando...';

  setTimeout(() => {
    const numOdu = calcularOduNumerologia(dataInput);
    oduDiretorAtual = ODUS_DATABASE[numOdu] || ODUS_DATABASE[6];

    document.getElementById('odu-numero').innerText = oduDiretorAtual.numero;
    document.getElementById('odu-nome').innerText = oduDiretorAtual.nome;
    document.getElementById('odu-orixa').innerText = oduDiretorAtual.orixa;
    document.getElementById('odu-elemento').innerText = oduDiretorAtual.elemento;
    document.getElementById('odu-caminho').innerText = oduDiretorAtual.caminho;

    document.getElementById('resultado-odu').style.display = 'block';
    btn.innerText = 'Calcular Odù Diretor';
  }, 800);
});

// Etapa 2: Seleção de Pacotes
function selecionarPacote(qtd, valor) {
  pacoteAtivo = { qtd, valor };
  document.getElementById('pacote-5').classList.toggle('active', qtd === 5);
  document.getElementById('pacote-10').classList.toggle('active', qtd === 10);
}

function gerarPix() {
  const container = document.getElementById('area-pix');
  const qrSimulado = "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865405" + pacoteAtivo.valor.toFixed(2) + "5802BR5913Oraculo Odara";

  container.innerHTML = `
    <div style="background: #0b0612; padding: 16px; border-radius: 8px; border: 1px solid #f59e0b; text-align: center;">
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

// Etapa 3: Jogada de Búzios
document.getElementById('form-consulta')?.addEventListener('submit', function (e) {
  e.preventDefault();
  if (perguntasRestantes <= 0) {
    alert("Seu saldo de perguntas acabou. Adquira um novo pacote!");
    return;
  }

  const pergunta = document.getElementById('pergunta').value;
  const area = document.getElementById('area-foco').value;
  const btn = document.getElementById('btn-jogar');
  btn.disabled = true;

  const mesa = document.getElementById('mesa-buzios');
  const peneira = document.getElementById('peneira');
  const status = document.getElementById('status-texto');
  
  mesa.style.display = 'block';
  peneira.innerHTML = '';
  document.getElementById('resultado-leitura').style.display = 'none';

  // Escolhe o Odù da jogada
  const numOduResult = oduDiretorAtual ? oduDiretorAtual.numero : Math.floor(Math.random() * 16) + 1;
  const oduJogo = ODUS_DATABASE[numOduResult];

  // Gera 16 Búzios com posições orgânicas na peneira
  for (let i = 0; i < 16; i++) {
    const buzio = document.createElement('div');
    const eAberto = i < oduJogo.numero;
    buzio.className = `buzio ${eAberto ? 'aberto' : 'fechado'}`;
    
    // Posições aleatórias dentro do círculo
    const top = Math.floor(Math.random() * 70 + 15);
    const left = Math.floor(Math.random() * 70 + 15);
    const rot = Math.floor(Math.random() * 360);

    buzio.style.top = `${top}%`;
    buzio.style.left = `${left}%`;
    buzio.style.transform = `rotate(${rot}deg)`;
    peneira.appendChild(buzio);
  }

  status.innerText = "Chacoalhando a peneira e invocando os Orixás...";

  setTimeout(() => {
    status.innerText = "Lendo a queda dos búzios...";
  }, 2000);

  setTimeout(() => {
    perguntasRestantes--;
    document.getElementById('qtd-perguntas').innerText = perguntasRestantes;

    const resContainer = document.getElementById('resultado-leitura');
    resContainer.innerHTML = `
      <h3 style="color: #fbbf24; margin-bottom: 8px;">Veredito dos Búzios</h3>
      <p style="font-size: 14px; color: #fff; margin-bottom: 6px;"><strong>Sua Pergunta (${area}):</strong> "${pergunta}"</p>
      <hr style="border-color: #332147; margin: 12px 0;">
      <p style="font-size: 16px; font-weight: bold; color: #34d399;">Tendência: ${oduJogo.tendencia}</p>
      <p style="font-size: 14px; color: #e4e4e7; margin-top: 8px;"><strong>Caída:</strong> Odù #${oduJogo.numero} - ${oduJogo.nome} (${oduJogo.orixa})</p>
      <p style="font-size: 13px; color: #a1a1aa; margin-top: 6px; line-height: 1.5;">${oduJogo.caminho}</p>
    `;
    resContainer.style.display = 'block';
    btn.disabled = false;
    status.innerText = "Leitura concluída com sucesso!";
  }, 4000);
});
