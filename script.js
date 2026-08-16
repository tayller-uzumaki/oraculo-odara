/* ==========================================
   ORÁCULO ODARA - LÓGICA E RITUAL DOS BÚZIOS
   ========================================== */

let consultasContratadas = 0;
let consultasRestantes = 0;

let pacoteSelecionado = {
  quantidade: 5,
  valor: 25.99
};

let isProcessing = false;
let ultimaPerguntaProcessada = "";

// ==========================================
// SESSÃO REAL DA CONSULTA
// ==========================================

const params =
  new URLSearchParams(
    window.location.search
  );

const pedidoId =
  params.get('pedidoId');

async function carregarSessao() {

  if (!pedidoId) {

    console.log(
      'Nenhum pedidoId informado na URL. Mantendo modo local.'
    );

    return;
  }

  try {

    const resposta =
      await fetch(
        `/api/sessao?pedidoId=${encodeURIComponent(pedidoId)}`
      );

    const dados =
      await resposta.json();

    if (
      !resposta.ok ||
      !dados.sucesso ||
      !dados.sessao
    ) {

      console.error(
        'Não foi possível carregar a sessão:',
        dados
      );

      return;
    }

    consultasContratadas =
      Number(
        dados.sessao
          .quantidadeContratada || 0
      );

    consultasRestantes =
      Number(
        dados.sessao
          .perguntasRestantes || 0
      );

    atualizarContadores();

    const secaoJogada =
      document.getElementById(
        'secao-jogada'
      );

    if (
      secaoJogada &&
      consultasRestantes > 0
    ) {

      secaoJogada.style.display =
        'block';
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

    caminho:
      "momento de recolhimento, cautela e preservação, evitando decisões precipitadas.",

    tendencia:
      "não tão favorável neste momento"
  },

  1: {
    nome: "Okaran",
    orixa: "Exu",
    elemento: "Fogo",

    caminho:
      "caminhos de transformação rápida, dinamismo e necessidade de clareza.",

    tendencia:
      "parcialmente favorável e requer atenção"
  },

  2: {
    nome: "Ejioko",
    orixa: "Ibejis / Ogum",
    elemento: "Terra",

    caminho:
      "dualidade, parcerias, união e busca por estabilidade sólida.",

    tendencia:
      "positiva e bastante favorável"
  },

  3: {
    nome: "Etaogundá",
    orixa: "Ogum",
    elemento: "Ferro / Fogo",

    caminho:
      "superação de obstáculos com coragem, firmeza e determinação.",

    tendencia:
      "positiva e favorável"
  },

  4: {
    nome: "Irosun",
    orixa: "Iemanjá / Oxóssi",
    elemento: "Fogo / Água",

    caminho:
      "intuição afiada, proteção ancestral e atenção aos alertas sutis.",

    tendencia:
      "parcialmente favorável"
  },

  5: {
    nome: "Oxé",
    orixa: "Oxum",
    elemento: "Água",

    caminho:
      "prosperidade, sensibilidade, beleza, renovação e caminhos abertos.",

    tendencia:
      "muito positiva e favorável"
  },

  6: {
    nome: "Obará",
    orixa: "Xangô / Oxóssi",
    elemento: "Ar / Terra",

    caminho:
      "grande riqueza, fartura, expansão e sorte nos empreendimentos.",

    tendencia:
      "plenamente positiva e favorável"
  },

  7: {
    nome: "Odi",
    orixa: "Obaluaiê / Oxóssi",
    elemento: "Terra",

    caminho:
      "resistência, persistência e quebra gradual de amarras antigas.",

    tendencia:
      "parcialmente favorável"
  },

  8: {
    nome: "Ejiologbon",
    orixa: "Nanã / Oxalufã",
    elemento: "Terra / Água",

    caminho:
      "sabedoria da maturidade, reflexão profunda e calma estratégica.",

    tendencia:
      "parcialmente favorável com ressalvas"
  },

  9: {
    nome: "Osa",
    orixa: "Oyá (Iansã)",
    elemento: "Ar",

    caminho:
      "ventos de mudança rápida, movimento, intuição e libertação.",

    tendencia:
      "positiva e dinamizadora"
  },

  10: {
    nome: "Ofun",
    orixa: "Oxalá",
    elemento: "Ar / Espaço",

    caminho:
      "paz, pureza, bênçãos elevadas e respeito profundo ao sagrado.",

    tendencia:
      "positiva e abençoada"
  },

  11: {
    nome: "Owonrin",
    orixa: "Exu / Oyá",
    elemento: "Fogo / Ar",

    caminho:
      "imprevistos produtivos, dinamismo e necessidade de flexibilidade.",

    tendencia:
      "parcialmente favorável"
  },

  12: {
    nome: "Ejila Ebora",
    orixa: "Xangô",
    elemento: "Fogo",

    caminho:
      "justiça, liderança, vitória sobre demandas e firmeza moral.",

    tendencia:
      "positiva e favorável"
  },

  13: {
    nome: "Ejiologbon (Okanran Meji)",
    orixa: "Nanã",
    elemento: "Terra",

    caminho:
      "transformação espiritual exigente e encerramento de ciclos antigos.",

    tendencia:
      "não tão favorável no presente"
  },

  14: {
    nome: "Iká",
    orixa: "Oxumarê",
    elemento: "Água / Ar",

    caminho:
      "renovação contínua, sabedoria estratégica e capacidade de adaptação.",

    tendencia:
      "positiva e favorável"
  },

  15: {
    nome: "Ibeji / Ogbè",
    orixa: "Obá / Ewá",
    elemento: "Ar",

    caminho:
      "conquistas pela perspicácia, proteção sutil e intuição refinada.",

    tendencia:
      "positiva e favorável"
  },

  16: {
    nome: "Alafia",
    orixa:
      "Oxalá / Todos os Orixás",
    elemento: "Luz",

    caminho:
      "luz total, confirmação plena, paz e bênção máxima dos caminhos.",

    tendencia:
      "plenamente positiva e muito favorável"
  }
};

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

function atualizarContadores() {

  const elContratadas =
    document.getElementById(
      'qtd-contratadas'
    );

  const elRestantes =
    document.getElementById(
      'qtd-perguntas'
    );

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
    document.getElementById(
      'secao-pacotes'
    );

  if (secao) {

    secao.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

// ==========================================
// NORMALIZAÇÃO DE TEXTO
// ==========================================

function normalizarTexto(texto) {

  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(
      /[\u0300-\u036f]/g,
      ''
    )
    .replace(
      /[^\w\s]/g,
      ' '
    )
    .replace(
      /\s+/g,
      ' '
    )
    .trim();
}

// ==========================================
// 1. CÁLCULO GRATUITO DO ODÙ
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
          .getElementById(
            'dataNasc'
          )
          .value;

      if (!data || !nome) {
        return;
      }

      const numeros =
        data.replace(
          /-/g,
          ''
        );

      let soma = 0;

      for (
        let char of numeros
      ) {

        soma +=
          parseInt(char);
      }

      let numOdu =
        soma;

      while (
        numOdu > 16
      ) {

        let str =
          numOdu.toString();

        numOdu =
          0;

        for (
          let c of str
        ) {

          numOdu +=
            parseInt(c);
        }
      }

      if (
        numOdu === 0
      ) {

        numOdu =
          16;
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
              style="
                background: rgba(212,175,55,0.15);
              "
            >
              Identificação:
              Odù #${numOdu} —
              ${infoOdu.nome}
            </span>

            <span
              class="badge"
              style="
                background: rgba(139,92,246,0.15);
              "
            >
              Regência:
              ${infoOdu.orixa}
            </span>

            <span
              class="badge"
              style="
                background: rgba(212,175,55,0.15);
              "
            >
              Elemento:
              ${infoOdu.elemento}
            </span>

          </div>

          <div class="box-destaque-dark">

            <h4 style="
              color: var(--gold-accent);
              margin-bottom: 10px;
            ">
              📜 Interpretação Completa dos Seus Caminhos
            </h4>

            <p style="
              margin-bottom: 12px;
            ">

              <strong>
                Características Principais:
              </strong>

              O Odù ${infoOdu.nome}
              traz a regência de
              ${infoOdu.orixa},
              conferindo uma conexão
              especial com o elemento
              ${infoOdu.elemento}.

              Quem nasce sob este Odù
              possui uma presença
              marcante e capacidade
              natural para buscar o
              discernimento.

            </p>

            <p style="
              margin-bottom: 12px;
            ">

              <strong>
                Potencial Espiritual:
              </strong>

              Sua vibração nativa
              favorece
              ${infoOdu.caminho}

              Esta influência confere
              resiliência e amparo em
              momentos de decisão.

            </p>

            <p style="
              margin-bottom: 4px;
            ">

              <strong>
                Desafios e Aprendizados:
              </strong>

              O principal desafio deste
              Odù é manter o equilíbrio
              emocional e a paciência
              nas fases de transição,
              agindo sempre com reflexão
              antes de tomar atitudes
              definitivas.

            </p>

          </div>

          <div class="odu-pontos-grid">

            <div class="box-pontos-fortes">

              <h4>
                ✨ Pontos Fortes
              </h4>

              <ul>

                <li>
                  ✦ Intuição e percepção
                  espiritual aguçadas
                </li>

                <li>
                  ✦ Proteção ancestral
                  de ${infoOdu.orixa}
                </li>

              </ul>

            </div>

            <div class="box-pontos-atencao">

              <h4>
                ⚠️ Pontos de Atenção
              </h4>

              <ul>

                <li>
                  ✦ Evitar precipitações
                  e ansiedade
                </li>

                <li>
                  ✦ Cuidado com desgastes
                  na energia pessoal
                </li>

              </ul>

            </div>

          </div>

          <div style="
            margin-top: 24px;
            padding: 20px;
            background: rgba(139,92,246,0.12);
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

              ✨ Quer se aprofundar e
              entender o que os búzios
              mostram sobre seus
              caminhos atuais, amor e
              carreira?

              Clique abaixo, escolha um
              dos nossos pacotes e faça
              sua consulta agora!

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

function selecionarPacote(
  qtd,
  valor
) {

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
    `Foram adicionadas ` +
    `${pacoteSelecionado.quantidade} ` +
    `consultas ao seu saldo.`
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

    campoPergunta.value =
      '';
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

    mesa.classList.remove(
      'mesa-chacoalhando',
      'mesa-impacto',
      'mesa-revelando'
    );
  }

  const peneira =
    document.getElementById(
      'peneira'
    );

  if (peneira) {

    peneira.innerHTML =
      '';
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
// SEGURANÇA LOCAL
// ==========================================

function detectarRiscoEmocional(
  texto
) {

  const t =
    normalizarTexto(
      texto
    );

  /*
    Expressões de risco direto.
    A validação definitiva também deverá
    permanecer no backend.
  */

  const padroesDiretos = [

    /\bsuicid/,

    /\bauto ?mutil/,

    /\bme matar\b/,

    /\bme mato\b/,

    /\bposso me matar\b/,

    /\bdevo me matar\b/,

    /\bquero morrer\b/,

    /\bqueria morrer\b/,

    /\bvontade de morrer\b/,

    /\bcom vontade de morrer\b/,

    /\bpensando em morrer\b/,

    /\bpenso em morrer\b/,

    /\bestou pensando em morrer\b/,

    /\btenho pensado em morrer\b/,

    /\bnao quero viver\b/,

    /\bnao quero mais viver\b/,

    /\bnao aguento mais viver\b/,

    /\btirar minha vida\b/,

    /\btirar a minha vida\b/,

    /\bacabar com minha vida\b/,

    /\bacabar com a minha vida\b/,

    /\bme machucar\b/,

    /\bme ferir\b/,

    /\bme fazer mal\b/,

    /\bsumir para sempre\b/,

    /\bdesaparecer para sempre\b/

  ];

  if (
    padroesDiretos.some(
      padrao =>
        padrao.test(t)
    )
  ) {

    return true;
  }

  /*
    Combinações de primeira pessoa
    + intenção relacionada à própria vida.
  */

  const primeiraPessoa =
    /\b(eu|me|minha|minha vida|comigo)\b/
      .test(t);

  const termosRisco =
    /\b(morrer|matar|machucar|ferir|suicidio|vida|desaparecer)\b/
      .test(t);

  const termosIntencao =
    /\b(quero|queria|penso|pensando|vontade|posso|devo|pretendo|considerando|cansado|cansada)\b/
      .test(t);

  if (
    primeiraPessoa &&
    termosRisco &&
    termosIntencao
  ) {

    return true;
  }

  return false;
}

// ==========================================
// CLASSIFICAÇÃO SEMÂNTICA LOCAL
// ==========================================

function classificarPergunta(
  texto
) {

  const t =
    normalizarTexto(
      texto
    );

  // --------------------------------------
  // RISCO EMOCIONAL
  // --------------------------------------

  if (
    detectarRiscoEmocional(
      texto
    )
  ) {

    return {

      bloqueado: true,

      tipo:
        'RISCO_EMOCIONAL',

      msg:
        "Essa pergunta indica uma situação que precisa de apoio humano imediato, e não de uma leitura oracular. " +
        "A consulta não será realizada e nenhum crédito deve ser consumido. " +
        "Procure uma pessoa adulta de confiança e apoio profissional ou um serviço de emergência da sua região."
    };
  }

  // --------------------------------------
  // PREVISÃO DE MORTE
  // --------------------------------------

  const previsaoMorte = [

    'quando vou morrer',

    'quando eu vou morrer',

    'como vou morrer',

    'como eu vou morrer',

    'dia da minha morte',

    'data da minha morte',

    'ano da minha morte',

    'quando ele vai morrer',

    'quando ela vai morrer'

  ];

  if (
    previsaoMorte.some(
      termo =>
        t.includes(termo)
    )
  ) {

    return {

      bloqueado: true,

      tipo:
        'PREVISAO_MORTE',

      msg:
        "O Oráculo não realiza previsões sobre data ou circunstâncias de morte. " +
        "A consulta não será realizada e seu saldo será preservado."
    };
  }

  // --------------------------------------
  // APOSTAS
  // --------------------------------------

  const termosApostas = [

    'mega sena',

    'megasena',

    'jogo do bicho',

    'quina',

    'lotofacil',

    'numeros da sorte',

    'numero da sorte',

    'loteria',

    'aposta',

    'apostas',

    'tigrinho',

    'tiger',

    'roleta',

    'bet'
  ];

  if (
    termosApostas.some(
      termo =>
        t.includes(termo)
    )
  ) {

    return {

      bloqueado: true,

      tipo:
        'APOSTAS',

      msg:
        "A plataforma se destina à orientação espiritual e reflexão pessoal. " +
        "Não fornecemos números, combinações ou palpites para apostas e jogos de azar. " +
        "Seu saldo será preservado."
    };
  }

  // --------------------------------------
  // SAÚDE / DIAGNÓSTICO
  // --------------------------------------

  const termosSaude = [

    'qual minha doenca',

    'qual e minha doenca',

    'tenho cancer',

    'estou com cancer',

    'vou me curar',

    'vou ficar curado',

    'vou ficar curada',

    'diagnostico medico',

    'qual meu diagnostico',

    'cura de'

  ];

  if (
    termosSaude.some(
      termo =>
        t.includes(termo)
    )
  ) {

    return {

      bloqueado: true,

      tipo:
        'SAUDE',

      msg:
        "O Oráculo pode oferecer reflexão espiritual, mas não realiza diagnósticos médicos nem promete cura. " +
        "Para questões de saúde, procure profissionais qualificados. " +
        "Seu saldo será preservado."
    };
  }

  // --------------------------------------
  // CONTEXTO DA PERGUNTA
  // --------------------------------------

  let contexto =
    "Orientação Geral e Caminhos";

  if (
    /amor|namorada|namorado|casamento|traicao|voltar|relacionamento|ex|parceiro/
      .test(t)
  ) {

    contexto =
      "Amor e Relacionamentos";

  } else if (
    /trabalho|emprego|vaga|carreira|profissional|profissao|empresa|chefe|promocao|entrevista|negocio/
      .test(t)
  ) {

    contexto =
      "Trabalho e Tomada de Decisão";

  } else if (
    /dinheiro|financeiro|financas|divida|investimento|comprar|vender/
      .test(t)
  ) {

    contexto =
      "Prosperidade Financeira";

  } else if (
    /familia|mae|pai|filho|filha|irmao|casa/
      .test(t)
  ) {

    contexto =
      "Harmonia Familiar";

  } else if (
    /orixa|cabeca|frente|junto|junto|adjunto|santo|eleda/
      .test(t)
  ) {

    contexto =
      "Identificação de Orixá de Cabeça";

  } else if (
    /espiritual|protecao|inveja|demanda|energia|axe/
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
// EXIBIÇÃO DE BLOQUEIOS
// ==========================================

function mostrarBloqueio(
  titulo,
  mensagem
) {

  const painelResultado =
    document.getElementById(
      'resultado-leitura'
    );

  if (!painelResultado) {
    return;
  }

  painelResultado.className =
    "card card-resultado-dark";

  painelResultado.innerHTML = `
    <div style="
      border-bottom: 1px solid rgba(239,68,68,0.4);
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
        ${titulo}
      </h3>

    </div>

    <div
      class="box-destaque-dark"
      style="
        border-left-color: #EF4444 !important;
        background: rgba(45,20,20,0.5) !important;
      "
    >

      <p style="
        font-size: 0.95rem;
        line-height: 1.7;
        color: #FEE2E2;
      ">
        ${mensagem}
      </p>

    </div>

    <p style="
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-top: 10px;
    ">
      ℹ️ Seu saldo de consultas foi preservado.
    </p>
  `;

  painelResultado.style.display =
    'block';

  painelResultado.scrollIntoView({
    behavior: 'smooth'
  });
}

// ==========================================
// 2. RITUAL DE JOGADA DOS BÚZIOS
// ==========================================

document
  .getElementById(
    'form-consulta'
  )
  ?.addEventListener(
    'submit',
    function (e) {

      e.preventDefault();

      // --------------------------------------
      // EVITA DUPLO CLIQUE / DUPLO PROCESSAMENTO
      // --------------------------------------

      if (isProcessing) {
        return;
      }

      // --------------------------------------
      // VERIFICA SALDO
      // --------------------------------------

      if (
        consultasRestantes <= 0
      ) {

        alert(
          "Você precisa adquirir um pacote de consultas para realizar a jogada."
        );

        document
          .getElementById(
            'secao-pacotes'
          )
          ?.scrollIntoView({
            behavior: 'smooth'
          });

        return;
      }

      // --------------------------------------
      // CAPTURA A PERGUNTA
      // --------------------------------------

      const campoPergunta =
        document.getElementById(
          'pergunta'
        );

      if (!campoPergunta) {
        return;
      }

      const pergunta =
        campoPergunta
          .value
          .trim();

      if (!pergunta) {
        return;
      }

      const perguntaNormalizada =
        normalizarTexto(
          pergunta
        );

      // --------------------------------------
      // TRAVA DE PERGUNTA REPETIDA
      // --------------------------------------

      if (
        perguntaNormalizada ===
        ultimaPerguntaProcessada
      ) {

        mostrarBloqueio(
          'Pergunta Repetida Detectada',
          'Você já realizou essa pergunta recentemente. Reformule a questão ou faça uma nova pergunta antes de consultar novamente.'
        );

        return;
      }

      // --------------------------------------
      // SEGURANÇA ANTES DA JOGADA
      // --------------------------------------

      const analise =
        classificarPergunta(
          pergunta
        );

      if (
        analise.bloqueado
      ) {

        mostrarBloqueio(
          'Consulta Não Realizada',
          analise.msg
        );

        return;
      }

      // --------------------------------------
      // COMEÇA O PROCESSAMENTO
      // --------------------------------------

      isProcessing =
        true;

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

      if (
        !mesa ||
        !peneira ||
        !painelResultado
      ) {

        console.error(
          'Elementos da mesa não encontrados.'
        );

        isProcessing =
          false;

        return;
      }

      if (btnJogar) {

        btnJogar.disabled =
          true;
      }

      painelResultado.style.display =
        'none';

      peneira.innerHTML =
        '';

      mesa.classList.remove(
        'mesa-chacoalhando',
        'mesa-impacto',
        'mesa-revelando'
      );

      mesa.style.display =
        'block';

      mesa.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      // ======================================
      // TEXTO DE STATUS
      // ======================================

      let statusTexto =
        document.getElementById(
          'status-jogo'
        );

      if (!statusTexto) {

        statusTexto =
          document.createElement(
            'p'
          );

        statusTexto.id =
          'status-jogo';

        mesa.parentNode.insertBefore(
          statusTexto,
          mesa.nextSibling
        );
      }

      const ehOrixaCabeca =
        analise.contexto ===
        "Identificação de Orixá de Cabeça";

      statusTexto.textContent =
        "🔮 Concentrando na energia da sua pergunta...";

      // ======================================
      // DEFINE A CAÍDA ANTES DA ANIMAÇÃO
      // ======================================

      const buziosAbertos1 =
        Math.floor(
          Math.random() * 17
        );

      const buziosFechados1 =
        16 - buziosAbertos1;

      const oduSorteado1 =
        ODUS_MAP[
          buziosAbertos1
        ] ||
        ODUS_MAP[16];

      const buziosAbertos2 =
        Math.floor(
          Math.random() * 17
        );

      const oduSorteado2 =
        ODUS_MAP[
          buziosAbertos2
        ] ||
        ODUS_MAP[16];

      // ======================================
      // ETAPA 1 - PREPARAÇÃO
      // ======================================

      setTimeout(
        () => {

          statusTexto.textContent =
            ehOrixaCabeca
              ? "✨ Preparando a queda para leitura das forças espirituais..."
              : "✨ Reunindo os 16 búzios para o lançamento...";

        },
        850
      );

      // ======================================
      // ETAPA 2 - CRIA OS BÚZIOS
      // ======================================

      setTimeout(
        () => {

          statusTexto.textContent =
            "🍃 Os búzios são lançados sobre a mesa...";

          mesa.classList.add(
            'mesa-chacoalhando'
          );

          const larguraMesa =
            peneira.clientWidth;

          const alturaMesa =
            peneira.clientHeight;

          const centroX =
            larguraMesa / 2;

          /*
            O ponto inicial fica próximo ao
            centro superior da mesa.
          */

          const origemX =
            centroX - 16;

          const origemY =
            18;

          const buzios =
            [];

          for (
            let i = 0;
            i < 16;
            i++
          ) {

            const buzio =
              document.createElement(
                'div'
              );

            buzio.className =
              'buzio-item buzio-lancando';

            const aberto =
              i < buziosAbertos1;

            // --------------------------------
            // DESENHO ATUAL DOS BÚZIOS
            // --------------------------------

            buzio.innerHTML =
              aberto
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

            // --------------------------------
            // POSIÇÃO FINAL ALEATÓRIA
            // --------------------------------

            const anguloBase =
              (
                Math.PI *
                2 *
                i
              ) / 16;

            const variacaoAngulo =
              (
                Math.random() -
                0.5
              ) * 0.65;

            const anguloFinal =
              anguloBase +
              variacaoAngulo;

            const raio =
              42 +
              Math.random() *
              82;

            let finalX =
              centroX -
              16 +
              Math.cos(
                anguloFinal
              ) *
              raio;

            let finalY =
              alturaMesa /
              2 -
              23 +
              Math.sin(
                anguloFinal
              ) *
              raio *
              0.62;

            // --------------------------------
            // IMPEDE QUE SAIAM DA MESA
            // --------------------------------

            finalX =
              Math.max(
                12,
                Math.min(
                  larguraMesa - 46,
                  finalX
                )
              );

            finalY =
              Math.max(
                12,
                Math.min(
                  alturaMesa - 60,
                  finalY
                )
              );

            /*
              O elemento já fica no destino,
              enquanto a animação usa translate
              para simular sua trajetória.
            */

            buzio.style.left =
              `${finalX}px`;

            buzio.style.top =
              `${finalY}px`;

            const deltaX =
              origemX -
              finalX +
              (
                Math.random() *
                24 -
                12
              );

            const deltaY =
              origemY -
              finalY;

            const rotacaoInicial =
              Math.floor(
                Math.random() *
                120
              );

            const rotacaoFinal =
              rotacaoInicial +
              500 +
              Math.floor(
                Math.random() *
                420
              );

            const alturaSalto =
              -55 -
              Math.random() *
              55;

            buzio.style.transform =
              `rotate(${rotacaoFinal}deg)`;

            buzio.style.opacity =
              '1';

            peneira.appendChild(
              buzio
            );

            buzios.push(
              buzio
            );

            // =================================
            // ANIMAÇÃO PRINCIPAL DO BÚZIO
            // =================================

            const atraso =
              i * 28 +
              Math.random() *
              90;

            setTimeout(
              () => {

                buzio.animate(
                  [

                    // -------------------------
                    // COMEÇA REUNIDO
                    // -------------------------

                    {
                      transform:
                        `translate(${deltaX}px, ${deltaY}px)
                         rotate(${rotacaoInicial}deg)
                         scale(0.55)`,

                      opacity:
                        0.15
                    },

                    // -------------------------
                    // SOBE / É LANÇADO
                    // -------------------------

                    {
                      offset:
                        0.23,

                      transform:
                        `translate(
                          ${deltaX * 0.72}px,
                          ${deltaY * 0.58 + alturaSalto}px
                        )
                        rotate(${rotacaoInicial + 170}deg)
                        scale(0.95)`,

                      opacity:
                        1
                    },

                    // -------------------------
                    // CRUZA A MESA NO AR
                    // -------------------------

                    {
                      offset:
                        0.52,

                      transform:
                        `translate(
                          ${deltaX * 0.28}px,
                          ${alturaSalto * 0.55}px
                        )
                        rotate(${rotacaoInicial + 370}deg)
                        scale(1.12)`
                    },

                    // -------------------------
                    // PRIMEIRO IMPACTO
                    // -------------------------

                    {
                      offset:
                        0.76,

                      transform:
                        `translate(
                          ${deltaX * 0.07}px,
                          4px
                        )
                        rotate(${rotacaoFinal - 80}deg)
                        scale(0.92)`
                    },

                    // -------------------------
                    // PEQUENO QUIQUE
                    // -------------------------

                    {
                      offset:
                        0.88,

                      transform:
                        `translate(
                          ${deltaX * 0.025}px,
                          -10px
                        )
                        rotate(${rotacaoFinal - 25}deg)
                        scale(1.03)`
                    },

                    // -------------------------
                    // POSIÇÃO FINAL
                    // -------------------------

                    {
                      transform:
                        `translate(0, 0)
                         rotate(${rotacaoFinal}deg)
                         scale(1)`,

                      opacity:
                        1
                    }

                  ],

                  {
                    duration:
                      1150 +
                      Math.random() *
                      230,

                    easing:
                      'cubic-bezier(0.18,0.72,0.28,1)',

                    fill:
                      'forwards'
                  }
                );

              },
              atraso
            );

          }

          // ==================================
          // IMPACTO DA MESA
          // ==================================

          setTimeout(
            () => {

              mesa.classList.remove(
                'mesa-chacoalhando'
              );

              mesa.classList.add(
                'mesa-impacto'
              );

              buzios.forEach(
                buzio => {

                  buzio.classList.remove(
                    'buzio-lancando'
                  );

                  buzio.classList.add(
                    'buzio-impacto'
                  );
                }
              );

              statusTexto.textContent =
                "✨ Os búzios tocaram a mesa e estão se assentando...";

            },
            1120
          );

          // ==================================
          // ASSENTAMENTO FINAL
          // ==================================

          setTimeout(
            () => {

              mesa.classList.remove(
                'mesa-impacto'
              );

              mesa.classList.add(
                'mesa-revelando'
              );

              buzios.forEach(
                buzio => {

                  buzio.classList.remove(
                    'buzio-impacto'
                  );

                  buzio.classList.add(
                    'buzio-assentado'
                  );
                }
              );

              statusTexto.textContent =
                "🔮 A caída foi formada. Interpretando o Odù...";

            },
            1650
          );

        },
        1850
      );

      // ======================================
      // ETAPA 3 - APRESENTAÇÃO DA LEITURA
      // ======================================

      setTimeout(
        () => {

          mesa.classList.remove(
            'mesa-revelando'
          );

          statusTexto.textContent =
            '';

          // ----------------------------------
          // DESCONTA 1 CRÉDITO LOCAL
          // ----------------------------------

          consultasRestantes--;

          if (
            consultasRestantes < 0
          ) {

            consultasRestantes =
              0;
          }

          atualizarContadores();

          ultimaPerguntaProcessada =
            perguntaNormalizada;

          let paragrafo1 =
            '';

          let paragrafo2 =
            '';

          // ==================================
          // PERGUNTAS SOBRE ORIXÁS
          // ==================================

          if (
            ehOrixaCabeca
          ) {

            paragrafo1 =
              `Em relação à sua busca sobre "<strong>${pergunta}</strong>", ` +
              `a primeira queda apresentou <strong>Odù ${oduSorteado1.nome}</strong>, ` +
              `associado nesta estrutura à força de ` +
              `<strong>${oduSorteado1.orixa}</strong>. ` +
              `Dentro da leitura simbólica desta consulta, a tendência ` +
              `apresentada é ${oduSorteado1.tendencia}. ` +
              `A queda aponta para ${oduSorteado1.caminho}`;

            paragrafo2 =
              `Como força complementar da consulta, a segunda referência ` +
              `apresentou <strong>${oduSorteado2.orixa}</strong> através de ` +
              `Odù ${oduSorteado2.nome}. ` +
              `Essa combinação deve ser entendida como uma orientação ` +
              `simbólica do momento, e não como confirmação definitiva ` +
              `de Orixá de cabeça. Confirmações religiosas dessa natureza ` +
              `devem ser realizadas presencialmente com um sacerdote ` +
              `ou sacerdotisa de confiança.`;

          }

          // ==================================
          // DEMAIS PERGUNTAS
          // ==================================

          else {

            paragrafo1 =
              `Diante da sua questão específica — "<strong>${pergunta}</strong>" —, ` +
              `a mesa apresentou <strong>Odù ${oduSorteado1.nome}</strong>, ` +
              `sob a referência de <strong>${oduSorteado1.orixa}</strong>. ` +
              `Considerando a área de ${analise.contexto}, ` +
              `a tendência desta caída é ` +
              `<strong>${oduSorteado1.tendencia}</strong>. ` +
              `A leitura chama atenção para ${oduSorteado1.caminho}`;

            paragrafo2 =
              `Como orientação prática, observe o cenário com calma antes ` +
              `de tomar decisões importantes. Evite agir apenas pela ansiedade ` +
              `ou pela pressa e procure avaliar fatos concretos, conversas e ` +
              `possibilidades disponíveis. A leitura mostra uma tendência do ` +
              `momento, enquanto suas escolhas continuam tendo papel importante ` +
              `no caminho que será construído.`;
          }

          // ==================================
          // MONTA O CARD DO RESULTADO
          // ==================================

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

                (${buziosAbertos1}
                Abertos /

                ${buziosFechados1}
                Fechados)

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

              <p style="
                font-size: 0.82rem;
                color: var(--text-muted);
                margin-top: 4px;
              ">

                Área identificada:

                <strong>
                  ${analise.contexto}
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
              ">
                ${paragrafo1}
              </p>

              <p>
                ${paragrafo2}
              </p>

            </div>

            <div class="disclaimer-callout">

              ⚠️

              <strong>
                Aviso Importante:
              </strong>

              Esta consulta é uma orientação digital
              baseada em inteligência artificial e
              referências culturais sobre os Odùs.

              Para confirmações religiosas, rituais
              ou aprofundamentos, procure um
              Babalorixá ou Ialorixá de sua confiança.

            </div>

            <div style="
              margin-top: 16px;
              text-align: center;
              font-size: 0.85rem;
              color: var(--text-muted);
            ">

              Perguntas restantes:

              <strong style="
                color: var(--gold-light);
              ">
                ${consultasRestantes}
              </strong>

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
            behavior: 'smooth',
            block: 'start'
          });

          if (btnJogar) {

            btnJogar.disabled =
              false;
          }

          isProcessing =
            false;

        },
        4300
      );

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
