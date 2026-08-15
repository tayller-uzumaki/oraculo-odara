// ==========================================
// ESTADO GLOBAL DA APLICAÇÃO
// ==========================================
let pacoteSelecionado = 5;
let valorSelecionado = 25.99;
let perguntasRestantes = 0;

// ==========================================
// BANCO DE DADOS DOS ODÙS DE NASCIMENTO
// ==========================================
const ODUS_NASCIMENTO = {
  1: { nome: "Okaran", orixa: "Exu", elemento: "Fogo", caminho: "Representa a transformação rápida, a intuição afiada e a quebra de obstáculos.", fortes: ["Resiliência", "Independência"], alertas: ["Impulsividade", "Atritos verbais"] },
  2: { nome: "Ejioko", orixa: "Ibejis / Ogum", elemento: "Terra", caminho: "Caminho da união, alianças estratégicas e conquistas materiais seguras.", fortes: ["Diplomacia", "Determinação"], alertas: ["Indecisão", "Medo de mudanças"] },
  3: { nome: "Etaogundá", orixa: "Ogum", elemento: "Ferro / Fogo", caminho: "Energia da batalha, superação e construção de novas oportunidades pelo esforço.", fortes: ["Coragem", "Capacidade de trabalho"], alertas: ["Rigidez", "Estresse acumulado"] },
  4: { nome: "Irosun", orixa: "Iemanjá / Oxóssi", elemento: "Fogo / Água", caminho: "Forte proteção ancestral, clareza mental e sensibilidade aguçada.", fortes: ["Intuição", "Proteção espiritual"], alertas: ["Apego ao passado", "Ingenuidade"] },
  5: { nome: "Oxé", orixa: "Oxum", elemento: "Água", caminho: "Magnetismo natural, prosperidade material e poder de renovação emocional.", fortes: ["Carisma", "Gosto por artes e beleza"], alertas: ["Vaidade", "Instabilidade de humor"] },
  6: { nome: "Obará", orixa: "Xangô / Oxóssi", elemento: "Ar / Terra", caminho: "Grande fartura, liderança respeitada e capacidade de dar a volta por cima.", fortes: ["Sorte nos negócios", "Visão expansiva"], alertas: ["Desperdício", "Orgulho excessivo"] },
  7: { nome: "Odi", orixa: "Obaluaiê", elemento: "Terra", caminho: "Resistência inabalável, superação de crises e reconstrução firme da vida.", fortes: ["Resistência", "Honestidade"], alertas: ["Ressentimento", "Apego à rotina"] },
  8: { nome: "Ejiologbon", orixa: "Nanã / Oxalufã", elemento: "Terra / Água", caminho: "Sabedoria madura, paciência estratégica e visão profunda do futuro.", fortes: ["Ponderação", "Calma nas decisões"], alertas: ["Lentidão", "Isolamento"] },
  9: { nome: "Osa", orixa: "Oyá (Iansã)", elemento: "Ar", caminho: "Liberdade, transformações rápidas e grande capacidade de renovação espiritual.", fortes: ["Coragem", "Liderança nata"], alertas: ["Inconstância", "Impaciência"] },
  10: { nome: "Ofun", orixa: "Oxalá", elemento: "Ar / Espaço", caminho: "Caminho da iluminação, paz interior, respeito e elevadas bençãos.", fortes: ["Elevada intuição", "Respeito público"], alertas: ["Perfeccionismo", "Suscetibilidade"] },
  11: { nome: "Owonrin", orixa: "Exu / Oyá", elemento: "Fogo / Ar", caminho: "Dinamismo, versatilidade e talento para movimentar finanças e projetos.", fortes: ["Agilidade", "Adaptabilidade"], alertas: ["Dispersão", "Falta de rotina"] },
  12: { nome: "Ejila Ebora", orixa: "Xangô", elemento: "Fogo", caminho: "Triunfo em causas difíceis, busca por justiça e liderança respeitada.", fortes: ["Liderança", "Senso de justiça"], alertas: ["Inflexibilidade", "Intolerância"] },
  13: { nome: "Okanran Meji", orixa: "Nanã", elemento: "Terra", caminho: "Maturidade espiritual, encerramento consciente de ciclos e renovação.", fortes: ["Introspecção", "Desapego"], alertas: ["Melancolia", "Resistência ao novo"] },
  14: { nome: "Iká", orixa: "Oxumarê", elemento: "Água / Ar", caminho: "Flexibilidade estratégica, visão diplomática e renovação de oportunidades.", fortes: ["Estratégia", "Capacidade de recomeço"], alertas: ["Desconfiança", "Reservado em excesso"] },
  15: { nome: "Ogbè / Ibeji", orixa: "Obá / Ewá", elemento: "Ar", caminho: "Perspicácia, agilidade de raciocínio e proteção contra enganos.", fortes: ["Foco cirúrgico", "Intuição afiada"], alertas: ["Isolamento", "Remoer mágoas"] },
  16: { nome: "Alafia", orixa: "Oxalá", elemento: "Luz", caminho: "Confirmação de vitória, clareza absoluta, paz e luz espiritual permanente.", fortes: ["Paz interior", "Êxito completo"], alertas: ["Acomodação", "Negligência"] }
};

// BANCO DE DADOS DAS RESPOSTAS CONSULTIVAS DO JOGO DE BÚZIOS
const ODUS_JOGO = {
  1: { tendencia: "❌ Tendência: NÃO", favorabilidade: 25, titulo: "Bloqueio Temporário", desc: "Os búzios alertam para atritos e resistências no caminho. Não force situações no momento." },
  2: { tendencia: "⏳ Tendência: AINDA NÃO", favorabilidade: 48, titulo: "Ajuste e Acordos", desc: "A questão depende do alinhamento entre as partes antes de evoluir." },
  3: { tendencia: "✅ Tendência: SIM", favorabilidade: 82, titulo: "Caminho Aberto pelo Trabalho", desc: "O resultado será favorável desde que você mantenha o foco e a determinação." },
  4: { tendencia: "⏳ Tendência: AINDA NÃO", favorabilidade: 40, titulo: "Aguarde Clareza", desc: "Fatores não revelados precisam ser analisados antes de tomar qualquer decisão." },
  5: { tendencia: "✅ Tendência: SIM", favorabilidade: 88, titulo: "Prosperidade e Encanto", desc: "Forças de atração e renovação positiva estão atuando a favor do seu pedido." },
  6: { tendencia: "✅ Tendência: SIM", favorabilidade: 95, titulo: "Fartura e Êxito", desc: "Grande indicação de triunfo, avanço rápido e superação de limitações." },
  7: { tendencia: "⏳ Tendência: AINDA NÃO", favorabilidade: 35, titulo: "Encerramento de Pendências", desc: "Resolva questões antigas antes de investir energia neste novo passo." },
  8: { tendencia: "✅ Tendência: SIM", favorabilidade: 90, titulo: "Sabedoria e Razão", desc: "Sinal verde para prosseguir, mantendo a serenidade e o planejamento." },
  9: { tendencia: "⏳ Tendência: AINDA NÃO", favorabilidade: 42, titulo: "Mudanças de Vento", desc: "O cenário ainda passará por instabilidades. Aguarde alguns dias." },
  10: { tendencia: "✅ Tendência: SIM", favorabilidade: 85, titulo: "Bênção e Harmonia", desc: "Caminho protegido e abençoado com paz de espírito e clareza." },
  11: { tendencia: "❌ Tendência: NÃO", favorabilidade: 30, titulo: "Atenção com Imprevistos", desc: "Cuidado com documentos, promessas informais ou desatenção." },
  12: { tendencia: "✅ Tendência: SIM", favorabilidade: 92, titulo: "Justiça a seu Favor", desc: "A verdade prevalecerá. Aja de forma transparente e correta." },
  13: { tendencia: "⏳ Tendência: AINDA NÃO", favorabilidade: 45, titulo: "Tempo de Maturação", desc: "Respeite o tempo natural das coisas. A pressa pode atrapalhar." },
  14: { tendencia: "✅ Tendência: SIM", favorabilidade: 84, titulo: "Renovação de Estratégia", desc: "Seja flexível e adapte seus planos para obter o resultado desejado." },
  15: { tendencia: "⏳ Tendência: AINDA NÃO", favorabilidade: 38, titulo: "Observação Atenta", desc: "Avalie com calma o cenário antes de assumir compromissos definitivos." },
  16: { tendencia: "✅ Tendência: SIM", favorabilidade: 98, titulo: "Confirmação Plena", desc: "Caminhos abertos, proteção total e luz sobre a sua dúvida." }
};

// ==========================================
// 1. CÁLCULO DO ODÙ DE NASCIMENTO (ETAPA 1)
// ==========================================
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

  const info = ODUS_NASCIMENTO[numOdu] || ODUS_NASCIMENTO[16];
  const painelOdu = document.getElementById('resultado-odu');

  painelOdu.innerHTML = `
    <div style="background: rgba(0,0,0,0.3); padding: 18px; border-radius: 10px; border: 1px solid var(--gold-light, #f59e0b);">
      <h3 style="color: var(--gold-light, #fde68a); font-size: 1.4rem; margin-bottom: 4px;">
        ${nome}, seu Odù é #${numOdu} - ${info.nome}
      </h3>
      <p style="color: var(--gold-accent, #f59e0b); font-weight: 600; margin-bottom: 12px;">
        Regência: ${info.orixa} | Elemento: ${info.elemento}
      </p>
      <p style="font-size: 0.95rem; line-height: 1.5; margin-bottom: 14px; color: #e4e4e7;">
        ${info.caminho}
      </p>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem;">
          ✓ Força: ${info.fortes.join(', ')}
        </span>
        <span style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem;">
          ⚠️ Atenção: ${info.alertas.join(', ')}
        </span>
      </div>
    </div>
  `;

  painelOdu.style.display = 'block';
  painelOdu.scrollIntoView({ behavior: 'smooth' });
});

// ==========================================
// 2. SELEÇÃO DE PACOTES E PIX (ETAPA 2)
// ==========================================
function selecionarPacote(qtd, preco) {
  pacoteSelecionado = qtd;
  valorSelecionado = preco;

  const card5 = document.getElementById('pacote-5');
  const card10 = document.getElementById('pacote-10');

  if (card5 && card10) {
    if (qtd === 5) {
      card5.classList.add('active');
      card10.classList.remove('active');
    } else {
      card10.classList.add('active');
      card5.classList.remove('active');
    }
  }
}

function gerarPix() {
  perguntasRestantes = pacoteSelecionado;

  const contadorEl = document.getElementById('qtd-perguntas');
  if (contadorEl) {
    contadorEl.innerText = perguntasRestantes;
  }

  const secaoJogada = document.getElementById('secao-jogada');
  if (secaoJogada) {
    secaoJogada.style.display = 'block';
    secaoJogada.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================
// 3. CONSULTA NA MESA DE BÚZIOS (ETAPA 3)
// ==========================================
document.getElementById('form-consulta')?.addEventListener('submit', function (e) {
  e.preventDefault();

  if (perguntasRestantes <= 0) {
    alert("Seu saldo de consultas acabou! Selecione um pacote para liberar mais perguntas.");
    document.getElementById('secao-pacotes')?.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const pergunta = document.getElementById('pergunta').value;
  const area = document.getElementById('area-foco').value;
  const btn = document.getElementById('btn-jogar');
  btn.disabled = true;

  const mesa = document.getElementById('mesa-buzios');
  const peneira = document.getElementById('peneira');
  const status = document.getElementById('status-jogo');
  const resContainer = document.getElementById('resultado-leitura');

  mesa.style.display = 'block';
  peneira.innerHTML = '';
  resContainer.style.display = 'none';

  mesa.scrollIntoView({ behavior: 'smooth', block: 'center' });
  status.innerText = "🔮 Lançando os búzios sagrados na mesa...";

  // Sortear número de búzios abertos (1 a 16)
  const numAbertos = Math.floor(Math.random() * 16) + 1;
  const odulido = ODUS_JOGO[numAbertos] || ODUS_JOGO[16];
  const infoNascimento = ODUS_NASCIMENTO[numAbertos] || ODUS_NASCIMENTO[16];

  // Renderizar os 16 búzios
  for (let i = 0; i < 16; i++) {
    const eAberto = i < numAbertos;
    const buzioEl = document.createElement('div');
    buzioEl.style.position = 'absolute';
    buzioEl.style.width = '20px';
    buzioEl.style.height = '28px';
    buzioEl.style.borderRadius = '50%';
    buzioEl.style.background = eAberto ? '#fef3c7' : '#78350f';
    buzioEl.style.border = '1px solid #451a03';

    const top = Math.floor(Math.random() * 65 + 15);
    const left = Math.floor(Math.random() * 65 + 15);
    buzioEl.style.top = `${top}%`;
    buzioEl.style.left = `${left}%`;

    peneira.appendChild(buzioEl);
  }

  setTimeout(() => {
    // Desconta consulta
    perguntasRestantes--;
    const contadorEl = document.getElementById('qtd-perguntas');
    if (contadorEl) contadorEl.innerText = perguntasRestantes;

    status.innerText = "✓ Consulta realizada!";

    resContainer.innerHTML = `
      <div style="background: rgba(0,0,0,0.3); padding: 18px; border-radius: 10px; border: 1px solid var(--gold-light, #f59e0b);">
        <h3 style="color: var(--gold-light, #fde68a); font-size: 1.3rem;">
          ${odulido.tendencia} — Odù ${infoNascimento.nome}
        </h3>
        <p style="color: var(--gold-accent, #f59e0b); font-weight: bold; margin-bottom: 8px;">
          ${odulido.titulo} (Regente: ${infoNascimento.orixa})
        </p>
        <p style="font-size: 0.9rem; color: #a1a1aa; margin-bottom: 12px;">
          Área consultada: <strong>${area}</strong> | Favorabilidade: <strong>${odulido.favorabilidade}%</strong>
        </p>
        <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; margin-bottom: 12px;">
          <p style="font-style: italic; color: #d4d4d8; font-size: 0.88rem;">"${pergunta}"</p>
          <p style="margin-top: 8px; font-size: 0.95rem; color: #fff;">${odulido.desc}</p>
        </div>
      </div>
    `;

    resContainer.style.display = 'block';
    resContainer.scrollIntoView({ behavior: 'smooth' });
    btn.disabled = false;
  }, 1800);
});
