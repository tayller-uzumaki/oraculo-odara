/* ==========================================
   ORÁCULO ODARA - LÓGICA E RITUAL DOS BÚZIOS
   ========================================== */

let consultasContratadas = 0;
let consultasRestantes = 0;
let pacoteSelecionado = { quantidade: 5, valor: 25.99 };
let isProcessing = false;
let ultimaPerguntaProcessada = ""; // Controle da trava anti-spam

// ==========================================
// SESSÃO REAL DA CONSULTA
// ==========================================

const params = new URLSearchParams(window.location.search);
const pedidoId = params.get('pedidoId');

async function carregarSessao() {
  if (!pedidoId) {
    console.log('Nenhum pedidoId informado na URL. Mantendo modo local.');
    return;
  }

  try {
    const resposta = await fetch(
      `/api/sessao?pedidoId=${encodeURIComponent(pedidoId)}`
    );

    const dados = await resposta.json();

    if (!resposta.ok || !dados.sucesso || !dados.sessao) {
      console.error('Não foi possível carregar a sessão:', dados);
      return;
    }

    consultasContratadas = Number(
      dados.sessao.quantidadeContratada || 0
    );

    consultasRestantes = Number(
      dados.sessao.perguntasRestantes || 0
    );

    atualizarContadores();

    const secaoJogada =
      document.getElementById('secao-jogada');

    if (secaoJogada && consultasRestantes > 0) {
      secaoJogada.style.display = 'block';
    }

    console.log(
      'Sessão carregada com sucesso:',
      dados.sessao
    );

  } catch (erro) {
    console.error(
      'Erro ao carregar sessão:',
      erro
    );
  }
}

// ==========================================
// MAPA DOS ODÙS
// ==========================================

const ODUS_MAP = {
  0: {
    nome: "Opira",
    orixa: "Obaluaiê / Omolu",
    elemento: "Terra",
    caminho: "momento de recolhimento, cautela e preservação, evitando decisões precipitadas.",
    tendencia: "não tão favorável neste momento"
  },

  1: {
    nome: "Okaran",
    orixa: "Exu",
    elemento: "Fogo",
    caminho: "caminhos de transformação rápida, dinamismo e necessidade de clareza.",
    tendencia: "parcialmente favorável e requer atenção"
  },

  2: {
    nome: "Ejioko",
    orixa: "Ibejis / Ogum",
    elemento: "Terra",
    caminho: "dualidade, parcerias, união e busca por estabilidade solida.",
    tendencia: "positiva e bastante favorável"
  },

  3: {
    nome: "Etaogundá",
    orixa: "Ogum",
    elemento: "Ferro / Fogo",
    caminho: "superação de obstáculos com coragem, firmeza e determinação.",
    tendencia: "positiva e favorável"
  },

  4: {
    nome: "Irosun",
    orixa: "Iemanjá / Oxóssi",
    elemento: "Fogo / Água",
    caminho: "intuição afiada, proteção ancestral e atenção aos alertas sutis.",
    tendencia: "parcialmente favorável"
  },

  5: {
    nome: "Oxé",
    orixa: "Oxum",
    elemento: "Água",
    caminho: "prosperidade, sensibilidade, beleza, renovação e caminhos abertos.",
    tendencia: "muito positiva e favorável"
  },

  6: {
    nome: "Obará",
    orixa: "Xangô / Oxóssi",
    elemento: "Ar / Terra",
    caminho: "grande riqueza, fartura, expansão e sorte nos empreendimentos.",
    tendencia: "plenamente positiva e favorável"
  },

  7: {
    nome: "Odi",
    orixa: "Obaluaiê / Oxóssi",
    elemento: "Terra",
    caminho: "resistência, persistência e quebra gradual de amarras antigas.",
    tendencia: "parcialmente favorável"
  },

  8: {
    nome: "Ejiologbon",
    orixa: "Nanã / Oxalufã",
    elemento: "Terra / Água",
    caminho: "sabedoria da maturidade, reflexão profunda e calma estratégica.",
    tendencia: "parcialmente favorável com ressalvas"
  },

  9: {
    nome: "Osa",
    orixa: "Oyá (Iansã)",
    elemento: "Ar",
    caminho: "ventos de mudança rápida, movimento, intuição e libertação.",
    tendencia: "positiva e dinamizadora"
  },

  10: {
    nome: "Ofun",
    orixa: "Oxalá",
    elemento: "Ar / Espaço",
    caminho: "paz, pureza, bênçãos elevadas e respeito profundo ao sagrado.",
    tendencia: "positiva e abençoada"
  },

  11: {
    nome: "Owonrin",
    orixa: "Exu / Oyá",
    elemento: "Fogo / Ar",
    caminho: "imprevistos produtivos, dinamismo e necessidade de flexibilidade.",
    tendencia: "parcialmente favorável"
  },

  12: {
    nome: "Ejila Ebora",
    orixa: "Xangô",
    elemento: "Fogo",
    caminho: "justiça, liderança, vitória sobre demandas e firmeza moral.",
    tendencia: "positiva e favorável"
  },

  13: {
    nome: "Ejiologbon (Okanran Meji)",
    orixa: "Nanã",
    elemento: "Terra",
    caminho: "transformação espiritual exigente e encerramento de ciclos antigos.",
    tendencia: "não tão favorável no presente"
  },

  14: {
    nome: "Iká",
    orixa: "Oxumarê",
    elemento: "Água / Ar",
    caminho: "renovação contínua, sabedoria estratégica e capacidade de adaptação.",
    tendencia: "positiva e favorável"
  },

  15: {
    nome: "Ibeji / Ogbè",
    orixa: "Obá / Ewá",
    elemento: "Ar",
    caminho: "conquistas pela perspicácia, proteção sutil e intuição refinada.",
    tendencia: "positiva e favorável"
  },

  16: {
    nome: "Alafia",
    orixa: "Oxalá / Todos os Orixás",
    elemento: "Luz",
    caminho: "luz total, confirmação plena, paz e bênção máxima dos caminhos.",
    tendencia: "plenamente positiva e muito favorável"
  }
};

// ==========================================
// CONTADORES
// ==========================================

function atualizarContadores() {
  const elContratadas =
    document.getElementById('qtd-contratadas');

  const elRestantes =
    document.getElementById('qtd-perguntas');

  if (elContratadas) {
    elContratadas.textContent =
      consultasContratadas;
  }

  if (elRestantes) {
    elRestantes.textContent =
      consultasRestantes;
  }
}

function rolarParaPacotes() {
  const secao =
    document.getElementById('secao-pacotes');

  if (secao) {
    secao.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

// ==========================================
// 1. CÁLCULO GRATUITO DO ODÙ DE NASCIMENTO
// ==========================================

document
  .getElementById('form-odu')
  ?.addEventListener(
    'submit',
    function (e) {

      e.preventDefault();

      const nome =
        document
          .getElementById('nome')
          .value
          .trim();

      const data =
        document
          .getElementById('dataNasc')
          .value;

      if (!data || !nome) {
        return;
      }

      const numeros =
        data.replace(/-/g, '');

      let soma = 0;

      for (let char of numeros) {
        soma += parseInt(char);
      }

      let numOdu = soma;

      while (numOdu > 16) {
        let str =
          numOdu.toString();

        numOdu = 0;

        for (let c of str) {
          numOdu += parseInt(c);
        }
      }

      if (numOdu === 0) {
        numOdu = 16;
      }

      const infoOdu =
        ODUS_MAP[numOdu] ||
        ODUS_MAP[16];

      const painelOdu =
        document.getElementById(
          'resultado-odu'
        );

      painelOdu.innerHTML = `
        <div class="card-resultado-dark">

          <div style="
            border-bottom: 1px solid var(--card-border);
            padding-bottom: 12px;
            margin-bottom: 16px;
          ">

            <span style="
              color: var(--gold-accent);
              font-size: 0.8rem;
              font-weight: bold;
              text-transform: uppercase;
            ">
              Resultado do Odù de Nascimento
            </span>

            <h3 style="
              font-size: 1.4rem;
              color: var(--gold-light);
              margin-top: 4px;
            ">
              Olá, ${nome}! Seus Caminhos sob a Luz de Odù ${infoOdu.nome}
            </h3>

          </div>

          <div style="
            display: flex;
            gap: 12px;
            margin-bottom: 18px;
            flex-wrap: wrap;
          ">

            <span
              class="badge"
              style="background: rgba(212,175,55,0.15);"
            >
              Identificação: Odù #${numOdu} — ${infoOdu.nome}
            </span>

            <span
              class="badge"
              style="background: rgba(139,92,246,0.15);"
            >
              Regência: ${infoOdu.orixa}
            </span>

            <span
              class="badge"
              style="background: rgba(212,175,55,0.15);"
            >
              Elemento: ${infoOdu.elemento}
            </span>

          </div>

          <div class="box-destaque-dark">

            <h4 style="
              color: var(--gold-accent);
              margin-bottom: 10px;
            ">
              📜 Interpretação Completa dos Seus Caminhos
            </h4>

            <p style="margin-bottom: 12px;">
              <strong>
                Características Principais:
              </strong>

              O Odù ${infoOdu.nome} traz a regência de ${infoOdu.orixa},
              conferindo uma conexão especial com o elemento
              ${infoOdu.elemento}. Quem nasce sob este Odù possui uma
              presença marcante e capacidade natural para buscar o
              discernimento.
            </p>

            <p style="margin-bottom: 12px;">
              <strong>
                Potencial Espiritual:
              </strong>

              Sua vibração nativa favorece ${infoOdu.caminho}
              Esta influência confere resiliência e amparo em momentos
              de decisão.
            </p>

            <p style="margin-bottom: 4px;">
              <strong>
                Desafios e Aprendizados:
              </strong>

              O principal desafio deste Odù é manter o equilíbrio
              emocional e a paciência nas fases de transição, agindo
              sempre com reflexão antes de tomar atitudes definitivas.
            </p>

          </div>

          <div class="odu-pontos-grid">

            <div class="box-pontos-fortes">

              <h4>
                ✨ Pontos Fortes
              </h4>

              <ul>
                <li>
                  ✦ Intuição e percepção espiritual aguçadas
                </li>

                <li>
                  ✦ Proteção ancestral de ${infoOdu.orixa}
                </li>
              </ul>

            </div>

            <div class="box-pontos-atencao">

              <h4>
                ⚠️ Pontos de Atenção
              </h4>

              <ul>
                <li>
                  ✦ Evitar precipitações e ansiedade
                </li>

                <li>
                  ✦ Cuidado com desgastes na energia pessoal
                </li>
              </ul>

            </div>

          </div>

          <div style="
            margin-top: 24px;
            padding: 20px;
            background: rgba(139, 92, 246, 0.12);
            border: 1px solid var(--purple-accent);
            border-radius: 12px;
            text-align: center;
          ">

            <p style="
              font-size: 0.98rem;
              color: var(--gold-light);
              line-height: 1.6;
              margin-bottom: 16px;
            ">
              ✨ Quer se aprofundar e entender o que os búzios mostram
              sobre seus caminhos atuais, amor e carreira? Clique abaixo,
              escolha um dos nossos pacotes e faça sua consulta agora!
            </p>

            <button
              type="button"
              class="btn-primary"
              onclick="rolarParaPacotes()"
            >
              🔮 Ver Pacotes e Consultar os Búzios
            </button>

          </div>

        </div>
      `;

      painelOdu.style.display =
        'block';

      painelOdu.scrollIntoView({
        behavior: 'smooth'
      });
    }
  );

// ==========================================
// PACOTES
// ==========================================

function selecionarPacote(qtd, valor) {

  pacoteSelecionado = {
    quantidade: qtd,
    valor: valor
  };

  document
    .querySelectorAll(
      '.pacote-card, .package-card'
    )
    .forEach(
      card =>
        card.classList.remove(
          'active'
        )
    );

  const el =
    document.getElementById(
      `pacote-${qtd}`
    );

  if (el) {
    el.classList.add(
      'active'
    );
  }
}

// ==========================================
// PIX SIMULADO
// ==========================================

function gerarPix() {

  consultasContratadas +=
    pacoteSelecionado.quantidade;

  consultasRestantes +=
    pacoteSelecionado.quantidade;

  atualizarContadores();

  alert(
    `✨ Pagamento simulado com sucesso!\n\n` +
    `Foram adicionadas ${pacoteSelecionado.quantidade} consultas ao seu saldo.`
  );

  const secaoJogada =
    document.getElementById(
      'secao-jogada'
    );

  if (secaoJogada) {

    secaoJogada.style.display =
      'block';

    secaoJogada.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

// ==========================================
// NOVA PERGUNTA
// ==========================================

function reiniciarConsulta() {

  const campoPergunta =
    document.getElementById(
      'pergunta'
    );

  if (campoPergunta) {
    campoPergunta.value = '';
  }

  const painelResultado =
    document.getElementById(
      'resultado-leitura'
    );

  if (painelResultado) {
    painelResultado.style.display =
      'none';
  }

  const mesa =
    document.getElementById(
      'mesa-buzios'
    );

  if (mesa) {
    mesa.style.display =
      'none';
  }

  document
    .getElementById(
      'form-consulta'
    )
    ?.scrollIntoView({
      behavior: 'smooth'
    });
}

// ==========================================
// CLASSIFICAÇÃO SEMÂNTICA LOCAL
// ==========================================

function classificarPergunta(texto) {

  const t =
    texto.toLowerCase();

  if (
    [
      'me matar',
      'quer morrer',
      'quero morrer',
      'desaparecer',
      'nao aguento mais',
      'não aguento mais',
      'suicidio',
      'suicídio'
    ].some(
      g => t.includes(g)
    )
  ) {

    return {
      bloqueado: true,
      tipo: 'RISCO_EMOCIONAL',
      msg:
        "Essa pergunta indica um momento que precisa de apoio humano, " +
        "e não de uma leitura oracular. Procure alguém de confiança e " +
        "apoio profissional. Sua consulta não será realizada e seu saldo " +
        "será preservado."
    };
  }

  if (
    [
      'mega-sena',
      'megasena',
      'jogo do bicho',
      'quina',
      'lotofacil',
      'lotofácil',
      'numeros da sorte',
      'números da sorte',
      'loteria',
      'aposta'
    ].some(
      g => t.includes(g)
    )
  ) {

    return {
      bloqueado: true,
      tipo: 'LOTERIA',
      msg:
        "A plataforma se destina estritamente à orientação espiritual " +
        "e reflexão pessoal, não fornecendo números ou palpites para " +
        "apostas e jogos de azar."
    };
  }

  if (
    [
      'estou doente',
      'qual minha doença',
      'vencer o cancer',
      'vencer o câncer',
      'vou me curar',
      'diagnostico medico',
      'cura de'
    ].some(
      g => t.includes(g)
    )
  ) {

    return {
      bloqueado: true,
      tipo: 'SAUDE',
      msg:
        "O oráculo oferece orientação espiritual, mas não realiza " +
        "diagnósticos médicos nem promete curas físicas. Procure " +
        "profissionais de saúde qualificados."
    };
  }

  if (
    [
      'quando vou morrer',
      'vai morrer',
      'dia da minha morte',
      'morte de'
    ].some(
      g => t.includes(g)
    )
  ) {

    return {
      bloqueado: true,
      tipo: 'PREVISAO_MORTE',
      msg:
        "O Oráculo não realiza previsões sobre a data ou circunstâncias " +
        "de morte. A consulta não será realizada e seu saldo será preservado."
    };
  }

  let contexto =
    "Orientação Geral e Caminhos";

  if (
    /amor|namorada|namorado|casamento|traicao|traição|voltar|relacionamento|ex|parceiro/i
      .test(t)
  ) {

    contexto =
      "Amor e Relacionamentos";

  } else if (
    /trabalho|emprego|vaga|carreira|profissional|profissionais|profissão|profissao|empresa|chefe|promoção|promocao|entrevista|negócio|negocio/i
      .test(t)
  ) {

    contexto =
      "Trabalho e Tomada de Decisão";

  } else if (
    /dinheiro|financas|finanças|divida|dívida|investimento|comprar|vender/i
      .test(t)
  ) {

    contexto =
      "Prosperidade Financeira";

  } else if (
    /familia|família|mae|mãe|pai|filho|filha|irmao|irmão/i
      .test(t)
  ) {

    contexto =
      "Harmonia Familiar";

  } else if (
    /orixa|orixá|cabeca|cabeça|frente|junto|juntó|adjunto|santo/i
      .test(t)
  ) {

    contexto =
      "Identificação de Orixá de Cabeça";

  } else if (
    /espiritual|protecao|proteção|inveja|demanda/i
      .test(t)
  ) {

    contexto =
      "Espiritualidade e Proteção Ancestral";
  }

  return {
    bloqueado: false,
    contexto
  };
}

// ==========================================
// 2. RITUAL DE JOGADA DOS BÚZIOS
// ==========================================

document
  .getElementById('form-consulta')
  ?.addEventListener(
    'submit',
    function (e) {

      e.preventDefault();

      if (isProcessing) {
        return;
      }

      if (consultasRestantes <= 0) {

        alert(
          "Você precisa adquirir um pacote de consultas para realizar a jogada."
        );

        document
          .getElementById('secao-pacotes')
          ?.scrollIntoView({
            behavior: 'smooth'
          });

        return;
      }

      const pergunta =
        document
          .getElementById('pergunta')
          .value
          .trim();

      if (!pergunta) {
        return;
      }

      const perguntaNormalizada =
        pergunta
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^\w\s]/g, '')
          .replace(/\s+/g, ' ')
          .trim();

      if (
        perguntaNormalizada ===
        ultimaPerguntaProcessada
      ) {

        const painelResultado =
          document.getElementById(
            'resultado-leitura'
          );

        painelResultado.className =
          "card card-resultado-dark";

        painelResultado.innerHTML = `
          <div style="
            border-bottom: 1px solid rgba(212, 175, 55, 0.4);
            padding-bottom: 12px;
            margin-bottom: 16px;
          ">

            <span style="
              color: var(--gold-accent);
              font-size: 0.8rem;
              font-weight: bold;
              text-transform: uppercase;
            ">
              ⚠️ Atenção do Oráculo
            </span>

            <h3 style="
              font-size: 1.3rem;
              color: var(--gold-light);
              margin-top: 4px;
            ">
              Pergunta Repetida Detectada
            </h3>

          </div>

          <div
            class="box-destaque-dark"
            style="
              border-left-color: var(--gold-accent) !important;
            "
          >

            <p style="
              font-size: 0.95rem;
              line-height: 1.6;
            ">
              Você já fez essa pergunta recentemente.
              Para obter uma boa orientação, reflita
              sobre a resposta recebida antes de consultar
              os búzios novamente sobre o mesmo tema.
            </p>

          </div>

          <p style="
            font-size: 0.82rem;
            color: var(--text-muted);
            margin-top: 10px;
          ">
            ℹ️ Seu saldo de consultas foi totalmente preservado.
          </p>
        `;

        painelResultado.style.display =
          'block';

        painelResultado.scrollIntoView({
          behavior: 'smooth'
        });

        return;
      }

      const analise =
        classificarPergunta(
          pergunta
        );

      if (analise.bloqueado) {

        const painelResultado =
          document.getElementById(
            'resultado-leitura'
          );

        painelResultado.className =
          "card card-resultado-dark";

        painelResultado.innerHTML = `
          <div style="
            border-bottom: 1px solid rgba(239, 68, 68, 0.4);
            padding-bottom: 12px;
            margin-bottom: 16px;
          ">

            <span style="
              color: #F87171;
              font-size: 0.8rem;
              font-weight: bold;
              text-transform: uppercase;
            ">
              ⚠️ Orientação do Sistema
            </span>

            <h3 style="
              font-size: 1.3rem;
              color: #FCA5A5;
              margin-top: 4px;
            ">
              Consulta Não Realizada
            </h3>

          </div>

          <div
            class="box-destaque-dark"
            style="
              border-left-color: #EF4444 !important;
              background: rgba(45, 20, 20, 0.5) !important;
            "
          >

            <p style="
              font-size: 0.95rem;
              line-height: 1.6;
              color: #FEE2E2;
            ">
              ${analise.msg}
            </p>

          </div>

          <p style="
            font-size: 0.82rem;
            color: var(--text-muted);
            margin-top: 10px;
          ">
            ℹ️ Seu saldo de consultas não foi consumido.
          </p>
        `;

        painelResultado.style.display =
          'block';

        painelResultado.scrollIntoView({
          behavior: 'smooth'
        });

        return;
      }

      isProcessing = true;

      const mesa =
        document.getElementById(
          'mesa-buzios'
        );

      const peneira =
        document.getElementById(
          'peneira'
        );

      const painelResultado =
        document.getElementById(
          'resultado-leitura'
        );

      const btnJogar =
        document.getElementById(
          'btn-jogar'
        );

      if (btnJogar) {
        btnJogar.disabled = true;
      }

      painelResultado.style.display =
        'none';

      peneira.innerHTML = '';
      mesa.style.display = 'block';

      mesa.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      let statusTexto =
        document.getElementById(
          'status-jogo'
        );

      if (!statusTexto) {

        statusTexto =
          document.createElement('p');

        statusTexto.id =
          'status-jogo';

        statusTexto.style.cssText =
          "text-align:center;" +
          "color:var(--gold-light);" +
          "font-weight:600;" +
          "margin-top:15px;" +
          "font-family:'Cinzel',serif;";

        mesa.parentNode.insertBefore(
          statusTexto,
          mesa.nextSibling
        );
      }

      const ehOrixaCabeca =
        analise.contexto ===
        "Identificação de Orixá de Cabeça";

      statusTexto.textContent =
        "🔮 Concentrando nas energias da sua pergunta...";

      setTimeout(() => {
        statusTexto.textContent =
          ehOrixaCabeca
            ? "✨ Preparando dupla queda para Orixá de Frente e Juntó..."
            : "✨ Evocando os Orixás e ouvindo a voz dos Odùs...";
      }, 1100);

      setTimeout(() => {
        statusTexto.textContent =
          "🍃 Reunindo os búzios para o lançamento...";
      }, 2100);

      // ======================================
      // NOVA ANIMAÇÃO: ENTRADA + SALTOS + QUEDA
      // ======================================

      setTimeout(() => {

        const buziosAbertos1 =
          Math.floor(
            Math.random() * 17
          );

        const buziosFechados1 =
          16 - buziosAbertos1;

        const oduSorteado1 =
          ODUS_MAP[buziosAbertos1] ||
          ODUS_MAP[16];

        const buziosAbertos2 =
          Math.floor(
            Math.random() * 17
          );

        const oduSorteado2 =
          ODUS_MAP[buziosAbertos2] ||
          ODUS_MAP[16];

        const mesaRect =
          peneira.getBoundingClientRect();

        const centroX =
          mesaRect.width / 2;

        const centroY =
          mesaRect.height / 2;

        const buziosCriados = [];

        statusTexto.textContent =
          "✨ Os búzios estão sendo lançados sobre a mesa...";

        for (
          let i = 0;
          i < 16;
          i++
        ) {

          const buzio =
            document.createElement('div');

          buzio.className =
            'buzio-item';

          const isOpen =
            i < buziosAbertos1;

          buzio.innerHTML =
            isOpen
              ? `
                <svg viewBox="0 0 40 60">
                  <ellipse
                    cx="20"
                    cy="30"
                    rx="16"
                    ry="26"
                    fill="#F8F5F0"
                    stroke="#D4AF37"
                    stroke-width="2"
                  />

                  <ellipse
                    cx="20"
                    cy="30"
                    rx="8"
                    ry="16"
                    fill="#120A1F"
                    stroke="#8B5CF6"
                    stroke-width="1.5"
                  />

                  <line
                    x1="20"
                    y1="10"
                    x2="20"
                    y2="50"
                    stroke="#D4AF37"
                    stroke-width="1.5"
                  />
                </svg>
              `
              : `
                <svg viewBox="0 0 40 60">
                  <ellipse
                    cx="20"
                    cy="30"
                    rx="16"
                    ry="26"
                    fill="#EAD9C9"
                    stroke="#8B5CF6"
                    stroke-width="2"
                  />

                  <line
                    x1="20"
                    y1="8"
                    x2="20"
                    y2="52"
                    stroke="#5A3A7E"
                    stroke-width="2"
                  />
                </svg>
              `;

          const origemX =
            centroX - 16 +
            (Math.random() * 24 - 12);

          const origemY =
            Math.max(
              8,
              centroY - 95 +
              (Math.random() * 20 - 10)
            );

          buzio.style.left =
            `${origemX}px`;

          buzio.style.top =
            `${origemY}px`;

          buzio.style.opacity = '0';

          buzio.style.zIndex =
            String(20 + i);

          buzio.style.transition =
            'left 0.42s cubic-bezier(.2,.9,.35,1),' +
            'top 0.42s cubic-bezier(.2,.9,.35,1),' +
            'transform 0.42s cubic-bezier(.2,.9,.35,1),' +
            'opacity 0.18s ease';

          const rotInicial =
            Math.floor(
              Math.random() * 360
            );

          buzio.style.transform =
            `rotate(${rotInicial}deg) scale(0.55)`;

          peneira.appendChild(buzio);

          buziosCriados.push({
            el: buzio,
            rotInicial
          });
        }

        // Entrada inicial
        buziosCriados.forEach(
          ({ el, rotInicial }, index) => {

            setTimeout(() => {

              el.style.opacity = '1';

              el.style.transform =
                `rotate(${rotInicial + 120}deg) scale(0.9)`;

            }, index * 28);
          }
        );

        // Primeiro salto
        setTimeout(() => {

          buziosCriados.forEach(
            ({ el, rotInicial }, index) => {

              const saltoX =
                centroX - 16 +
                (Math.random() * 100 - 50);

              const saltoY =
                centroY - 35 +
                (Math.random() * 55 - 25);

              el.style.left =
                `${saltoX}px`;

              el.style.top =
                `${saltoY}px`;

              el.style.transform =
                `rotate(${rotInicial + 260 + index * 11}deg) ` +
                `translateY(-18px) scale(1.08)`;
            }
          );

          mesa.classList.add(
            'mesa-chacoalhando'
          );

          statusTexto.textContent =
            "🍃 Os búzios tocam a mesa e começam a se espalhar...";

        }, 520);

        // Segundo salto
        setTimeout(() => {

          buziosCriados.forEach(
            ({ el, rotInicial }, index) => {

              const angulo =
                (Math.PI * 2 * index / 16) +
                (Math.random() * 0.55 - 0.275);

              const raio =
                48 + Math.random() * 62;

              const x =
                centroX - 16 +
                Math.cos(angulo) * raio;

              const y =
                centroY - 23 +
                Math.sin(angulo) *
                (raio * 0.68);

              el.style.left =
                `${x}px`;

              el.style.top =
                `${y}px`;

              el.style.transform =
                `rotate(${rotInicial + 430 + index * 17}deg) ` +
                `translateY(-8px) scale(1)`;
            }
          );

        }, 960);

        // Queda final
        setTimeout(() => {

          mesa.classList.remove(
            'mesa-chacoalhando'
          );

          statusTexto.textContent =
            "🔮 Os búzios se assentaram. Revelando a caída...";

          buziosCriados.forEach(
            ({ el, rotInicial }, index) => {

              const angulo =
                (Math.PI * 2 * index / 16) +
                (Math.random() * 0.7 - 0.35);

              const raio =
                36 + Math.random() * 78;

              const maxX =
                Math.max(
                  20,
                  mesaRect.width - 52
                );

              const maxY =
                Math.max(
                  20,
                  mesaRect.height - 66
                );

              let x =
                centroX - 16 +
                Math.cos(angulo) * raio;

              let y =
                centroY - 23 +
                Math.sin(angulo) *
                (raio * 0.72);

              x = Math.min(
                maxX,
                Math.max(12, x)
              );

              y = Math.min(
                maxY,
                Math.max(10, y)
              );

              const rotFinal =
                rotInicial +
                560 +
                Math.floor(
                  Math.random() * 180
                );

              el.style.transition =
                'left 0.58s cubic-bezier(.22,.78,.28,1),' +
                'top 0.58s cubic-bezier(.22,.78,.28,1),' +
                'transform 0.58s cubic-bezier(.22,.78,.28,1)';

              el.style.left =
                `${x}px`;

              el.style.top =
                `${y}px`;

              el.style.transform =
                `rotate(${rotFinal}deg) scale(1)`;
            }
          );

        }, 1420);

        // Pequeno quique final
        setTimeout(() => {

          buziosCriados.forEach(
            ({ el }, index) => {

              el.style.transition =
                'transform 0.18s ease-out';

              setTimeout(() => {

                el.style.transform +=
                  ' translateY(-3px)';

              }, index * 16);

              setTimeout(() => {

                el.style.transform =
                  el.style.transform.replace(
                    ' translateY(-3px)',
                    ''
                  );

              }, 150 + index * 16);
            }
          );

        }, 2040);

        // ======================================
        // LEITURA APÓS A ANIMAÇÃO
        // ======================================

        setTimeout(() => {

          statusTexto.textContent = '';

          consultasRestantes--;

          if (
            consultasRestantes < 0
          ) {
            consultasRestantes = 0;
          }

          atualizarContadores();

          ultimaPerguntaProcessada =
            perguntaNormalizada;

          let paragrafo1 = '';
          let paragrafo2 = '';

          if (ehOrixaCabeca) {

            paragrafo1 =
              `Em relação à sua busca sincera sobre "<strong>${pergunta}</strong>", ` +
              `os búzios se moveram na mesa em uma dupla queda reveladora. ` +
              `A primeira queda manifestou a regência de ` +
              `<strong>${oduSorteado1.orixa}</strong> através de Odù ` +
              `${oduSorteado1.nome}, mostrando que a tendência para a sua ` +
              `liderança e presença no mundo é ${oduSorteado1.tendencia}. ` +
              `Esta primeira vibração direciona como você enfrenta os desafios ` +
              `diários, indicando que sua força interior se renova quando você ` +
              `atua com coragem, ética e alinhamento com a energia ancestral ` +
              `que o protege.`;

            paragrafo2 =
              `Na segunda queda da mesa sagrada, a energia do seu Orixá ` +
              `Adjunto (Juntó) revelou a força de ` +
              `<strong>${oduSorteado2.orixa}</strong> sob o Odù ` +
              `${oduSorteado2.nome}. Esta combinação mostra que o seu suporte ` +
              `emocional e sustentação espiritual atuam em complementaridade ` +
              `com seu Orixá de Frente. Para manter seus caminhos abertos e ` +
              `prósperos diante do que foi perguntado, é fundamental cultivar ` +
              `a paciência e manter atitudes ponderadas no cotidiano, lembrando ` +
              `sempre que a confirmação definitiva dessa regência é um ato ` +
              `sagrado presencial.`;

          } else {

            paragrafo1 =
              `Diante da sua questão específica — "<strong>${pergunta}</strong>" —, ` +
              `a mesa sagrada de búzios manifestou a vibração de ` +
              `<strong>Odù ${oduSorteado1.nome}</strong>, sob a regência direta ` +
              `de <strong>${oduSorteado1.orixa}</strong>. Ao analisar o momento ` +
              `que você atravessa na área de ${analise.contexto}, a queda ` +
              `oracular indica que a tendência para a sua pergunta é ` +
              `<strong>${oduSorteado1.tendencia}</strong>. Essa manifestação ` +
              `revela que o momento exige que você observe com atenção os ` +
              `sinais ao seu redor, pois a energia presente favorece que você ` +
              `${oduSorteado1.caminho}`;

            paragrafo2 =
              `Para que você consiga caminhar com firmeza e sabedoria em direção ` +
              `ao que busca, o oráculo orienta que você mantenha o discernimento ` +
              `e evite tomar decisões motivadas pela ansiedade ou por impulsos ` +
              `do momento. Lembre-se de que a leitura dos búzios ilumina as ` +
              `tendências do presente, mas o resultado final também é moldado ` +
              `pelas suas atitudes e escolhas. Cultive equilíbrio, observe os ` +
              `sinais com serenidade e siga com responsabilidade diante do que ` +
              `a leitura apresentou.`;
          }

          painelResultado.className =
            "card card-resultado-dark";

          painelResultado.innerHTML = `
            <div style="
              border-bottom: 1px solid var(--card-border);
              padding-bottom: 12px;
              margin-bottom: 16px;
            ">

              <span style="
                color: var(--gold-accent);
                font-size: 0.8rem;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
              ">
                Revelação da Consulta Sagrada
              </span>

              <h3 style="
                font-size: 1.4rem;
                color: var(--gold-light);
                margin-top: 4px;
              ">
                Odù ${oduSorteado1.nome}
                (${buziosAbertos1} Abertos /
                ${buziosFechados1} Fechados)
              </h3>

              <p style="
                font-size: 0.88rem;
                color: var(--text-muted);
                margin-top: 4px;
              ">
                Regência Principal:
                <strong>
                  ${oduSorteado1.orixa}
                </strong>
              </p>

            </div>

            <div
              class="box-destaque-dark"
              style="
                line-height: 1.8;
                font-size: 0.95rem;
              "
            >

              <p style="
                margin-bottom: 16px;
                text-indent: 12px;
              ">
                ${paragrafo1}
              </p>

              <p style="
                text-indent: 12px;
              ">
                ${paragrafo2}
              </p>

            </div>

            <div class="disclaimer-callout">

              ⚠️
              <strong>
                Aviso Importante:
              </strong>

              Esta é uma consulta orientativa realizada por uma
              inteligência artificial digital. Para aprofundamentos,
              trabalhos espirituais, rituais, confirmações de Odù
              e assentamentos, procure uma casa de Candomblé ou um
              Babalorixá / Ialorixá de sua confiança.

            </div>

            <div style="
              margin-top: 20px;
              text-align: center;
            ">

              <button
                type="button"
                class="btn-primary"
                onclick="reiniciarConsulta()"
              >
                ✨ Nova Pergunta
              </button>

            </div>
          `;

          painelResultado.style.display =
            'block';

          painelResultado.scrollIntoView({
            behavior: 'smooth'
          });

          if (btnJogar) {
            btnJogar.disabled = false;
          }

          isProcessing = false;

        }, 2700);

      }, 3000);
    }
  );

// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener(
  'DOMContentLoaded',
  () => {

    atualizarContadores();
    carregarSessao();

  }
);
