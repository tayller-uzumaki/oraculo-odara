/* ==========================================
   ORÁCULO ODARA
   SCRIPT.JS OFICIAL

   FRONTEND:
   - Sessão
   - Odù gratuito
   - Pacotes
   - Créditos de teste
   - Segurança local
   - Búzios
   - Múltiplas quedas
   - Backend / OpenAI
   ========================================== */


// ==========================================
// 1. ESTADO GLOBAL
// ==========================================

let consultasContratadas = 0;
let consultasRestantes = 0;

let pacoteSelecionado = {
  quantidade: 5,
  valor: 25.99
};

let isProcessing = false;
let ultimaPerguntaProcessada = "";


// ==========================================
// 2. SESSÃO
// ==========================================

const params =
  new URLSearchParams(
    window.location.search
  );

const pedidoId =
  params.get('pedidoId');


// ==========================================
// 3. MAPA DOS ODÙS
// ==========================================

const ODUS_MAP = {

  0: {
    numero: 0,
    nome: "Opira",
    orixa: "Obaluaiê / Omolu",
    elemento: "Terra",
    caminho:
      "momento de recolhimento, cautela e preservação, evitando decisões precipitadas.",
    tendencia:
      "não tão favorável neste momento"
  },

  1: {
    numero: 1,
    nome: "Okaran",
    orixa: "Exu",
    elemento: "Fogo",
    caminho:
      "caminhos de transformação rápida, dinamismo e necessidade de clareza.",
    tendencia:
      "parcialmente favorável e requer atenção"
  },

  2: {
    numero: 2,
    nome: "Ejioko",
    orixa: "Ibejis / Ogum",
    elemento: "Terra",
    caminho:
      "dualidade, parcerias, união e busca por estabilidade sólida.",
    tendencia:
      "positiva e bastante favorável"
  },

  3: {
    numero: 3,
    nome: "Etaogundá",
    orixa: "Ogum",
    elemento: "Ferro / Fogo",
    caminho:
      "superação de obstáculos com coragem, firmeza e determinação.",
    tendencia:
      "positiva e favorável"
  },

  4: {
    numero: 4,
    nome: "Irosun",
    orixa: "Iemanjá / Oxóssi",
    elemento: "Fogo / Água",
    caminho:
      "intuição afiada, proteção ancestral e atenção aos alertas sutis.",
    tendencia:
      "parcialmente favorável"
  },

  5: {
    numero: 5,
    nome: "Oxé",
    orixa: "Oxum",
    elemento: "Água",
    caminho:
      "prosperidade, sensibilidade, renovação e caminhos abertos.",
    tendencia:
      "muito positiva e favorável"
  },

  6: {
    numero: 6,
    nome: "Obará",
    orixa: "Xangô / Oxóssi",
    elemento: "Ar / Terra",
    caminho:
      "expansão, fartura, reconhecimento e abertura de caminhos.",
    tendencia:
      "plenamente positiva e favorável"
  },

  7: {
    numero: 7,
    nome: "Odi",
    orixa: "Obaluaiê / Oxóssi",
    elemento: "Terra",
    caminho:
      "resistência, persistência e quebra gradual de amarras antigas.",
    tendencia:
      "parcialmente favorável"
  },

  8: {
    numero: 8,
    nome: "Ejiologbon",
    orixa: "Nanã / Oxalufã",
    elemento: "Terra / Água",
    caminho:
      "sabedoria da maturidade, reflexão profunda e calma estratégica.",
    tendencia:
      "parcialmente favorável com ressalvas"
  },

  9: {
    numero: 9,
    nome: "Osa",
    orixa: "Oyá (Iansã)",
    elemento: "Ar",
    caminho:
      "ventos de mudança rápida, movimento, intuição e libertação.",
    tendencia:
      "positiva e dinamizadora"
  },

  10: {
    numero: 10,
    nome: "Ofun",
    orixa: "Oxalá",
    elemento: "Ar / Espaço",
    caminho:
      "paz, pureza, bênçãos elevadas e respeito profundo ao sagrado.",
    tendencia:
      "positiva e abençoada"
  },

  11: {
    numero: 11,
    nome: "Owonrin",
    orixa: "Exu / Oyá",
    elemento: "Fogo / Ar",
    caminho:
      "imprevistos, dinamismo e necessidade de flexibilidade.",
    tendencia:
      "parcialmente favorável"
  },

  12: {
    numero: 12,
    nome: "Ejila Ebora",
    orixa: "Xangô",
    elemento: "Fogo",
    caminho:
      "justiça, liderança, vitória sobre demandas e firmeza moral.",
    tendencia:
      "positiva e favorável"
  },

  13: {
    numero: 13,
    nome: "Ejiologbon (Okanran Meji)",
    orixa: "Nanã",
    elemento: "Terra",
    caminho:
      "transformação espiritual exigente e encerramento de ciclos antigos.",
    tendencia:
      "não tão favorável no presente"
  },

  14: {
    numero: 14,
    nome: "Iká",
    orixa: "Oxumarê",
    elemento: "Água / Ar",
    caminho:
      "renovação contínua, sabedoria estratégica e capacidade de adaptação.",
    tendencia:
      "positiva e favorável"
  },

  15: {
    numero: 15,
    nome: "Ibeji / Ogbè",
    orixa: "Obá / Ewá",
    elemento: "Ar",
    caminho:
      "conquistas pela perspicácia, proteção sutil e intuição refinada.",
    tendencia:
      "positiva e favorável"
  },

  16: {
    numero: 16,
    nome: "Alafia",
    orixa: "Oxalá / Todos os Orixás",
    elemento: "Luz",
    caminho:
      "luz, confirmação, paz e abertura dos caminhos.",
    tendencia:
      "plenamente positiva e muito favorável"
  }
};


// ==========================================
// 4. FUNÇÕES GERAIS
// ==========================================

function esperar(ms) {

  return new Promise(
    resolve =>
      setTimeout(
        resolve,
        ms
      )
  );
}


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

  document
    .getElementById(
      'secao-pacotes'
    )
    ?.scrollIntoView({
      behavior: 'smooth'
    });
}


// ==========================================
// 5. CARREGAR SESSÃO REAL
// ==========================================

async function carregarSessao() {

  if (!pedidoId) {

    console.log(
      'Nenhum pedidoId informado na URL.'
    );

    atualizarContadores();

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
      consultasContratadas > 0
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
// 6. FORMATAR RESPOSTA DA IA
// ==========================================

function escaparHTML(texto) {

  const div =
    document.createElement(
      'div'
    );

  div.textContent =
    String(texto || '');

  return div.innerHTML;
}


function formatarRespostaIA(texto) {

  let seguro =
    escaparHTML(
      texto
    );


  seguro =
    seguro.replace(
      /\*\*(.*?)\*\*/g,
      '<strong>$1</strong>'
    );


  seguro =
    seguro.replace(
      /^###\s+(.*)$/gm,
      '<h4>$1</h4>'
    );


  seguro =
    seguro.replace(
      /^##\s+(.*)$/gm,
      '<h4>$1</h4>'
    );


  seguro =
    seguro.replace(
      /^#\s+(.*)$/gm,
      '<h4>$1</h4>'
    );


  seguro =
    seguro.replace(
      /\n{2,}/g,
      '</p><p>'
    );


  seguro =
    seguro.replace(
      /\n/g,
      '<br>'
    );


  return `
    <p>
      ${seguro}
    </p>
  `;
}


// ==========================================
// 7. CÁLCULO GRATUITO DO ODÙ
// ==========================================

document
  .getElementById(
    'form-odu'
  )
  ?.addEventListener(
    'submit',
    function (e) {

      e.preventDefault();


      const nome =
        document
          .getElementById(
            'nome'
          )
          ?.value
          ?.trim();


      const data =
        document
          .getElementById(
            'dataNasc'
          )
          ?.value;


      if (
        !data ||
        !nome
      ) {

        return;
      }


      const numeros =
        data.replace(
          /-/g,
          ''
        );


      let soma = 0;


      for (
        const char of numeros
      ) {

        soma +=
          parseInt(
            char
          );
      }


      let numOdu =
        soma;


      while (
        numOdu > 16
      ) {

        const str =
          numOdu.toString();


        numOdu = 0;


        for (
          const c of str
        ) {

          numOdu +=
            parseInt(
              c
            );
        }
      }


      if (
        numOdu === 0
      ) {

        numOdu = 16;
      }


      const infoOdu =
        ODUS_MAP[numOdu] ||
        ODUS_MAP[16];


      const painelOdu =
        document.getElementById(
          'resultado-odu'
        );


      if (!painelOdu) {
        return;
      }


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

            <span class="badge">

              Identificação:
              Odù #${numOdu} —
              ${infoOdu.nome}

            </span>


            <span class="badge">

              Regência:
              ${infoOdu.orixa}

            </span>


            <span class="badge">

              Elemento:
              ${infoOdu.elemento}

            </span>

          </div>


          <div class="box-destaque-dark">

            <h4 style="
              color: var(--gold-accent);
              margin-bottom: 10px;
            ">
              📜 Interpretação dos Seus Caminhos
            </h4>


            <p style="
              margin-bottom: 12px;
            ">

              <strong>
                Características principais:
              </strong>

              O Odù ${infoOdu.nome}
              traz a referência de
              ${infoOdu.orixa}
              e do elemento
              ${infoOdu.elemento}.

            </p>


            <p style="
              margin-bottom: 12px;
            ">

              <strong>
                Caminho simbólico:
              </strong>

              ${infoOdu.caminho}

            </p>


            <p>

              <strong>
                Tendência:
              </strong>

              ${infoOdu.tendencia}.

            </p>

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
              color: var(--gold-light);
              margin-bottom: 16px;
            ">

              ✨ Quer aprofundar seus caminhos atuais?
              Consulte a Mesa Sagrada dos Búzios.

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
// 8. PACOTES
// ==========================================

function selecionarPacote(
  qtd,
  valor
) {

  pacoteSelecionado = {
    quantidade: qtd,
    valor
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


  document
    .getElementById(
      `pacote-${qtd}`
    )
    ?.classList.add(
      'active'
    );
}


// ==========================================
// 9. ADICIONAR CRÉDITOS DE TESTE
//
// NÃO EXISTE MAIS SOMA SOMENTE LOCAL.
// O SUPABASE É A FONTE DO SALDO.
// ==========================================

async function gerarPix() {

  if (isProcessing) {
    return;
  }


  if (!pedidoId) {

    alert(
      'Não foi possível identificar sua sessão de consulta.'
    );

    return;
  }


  isProcessing =
    true;


  try {

    const resposta =
      await fetch(
        '/api/adicionar-creditos-teste',
        {
          method:
            'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body:
            JSON.stringify({

              pedidoId,

              quantidade:
                pacoteSelecionado.quantidade

            })
        }
      );


    const dados =
      await resposta.json();


    if (!resposta.ok) {

      throw new Error(
        dados?.error ||
        'Não foi possível adicionar as consultas.'
      );
    }


    /*
      O navegador não calcula saldo.

      O backend modifica o Supabase
      e devolve os números oficiais.
    */

    consultasContratadas =
      Number(
        dados.quantidadeContratada || 0
      );


    consultasRestantes =
      Number(
        dados.perguntasRestantes || 0
      );


    atualizarContadores();


    alert(
      `✨ Pacote de teste liberado!\n\n` +
      `${dados.quantidadeAdicionada} consultas foram adicionadas.\n` +
      `Saldo disponível: ${consultasRestantes}.`
    );


    const secaoJogada =
      document.getElementById(
        'secao-jogada'
      );


    if (secaoJogada) {

      secaoJogada.style.display =
        'block';


      secaoJogada.scrollIntoView({

        behavior:
          'smooth',

        block:
          'start'

      });
    }


  } catch (erro) {

    console.error(
      'Erro ao adicionar pacote:',
      erro
    );


    alert(
      erro?.message ||
      'Não foi possível liberar o pacote.'
    );


    try {

      await carregarSessao();

    } catch (
      erroSessao
    ) {

      console.error(
        'Falha ao recarregar sessão:',
        erroSessao
      );
    }


  } finally {

    isProcessing =
      false;
  }
}


// ==========================================
// 10. NOVA PERGUNTA
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


  const painel =
    document.getElementById(
      'resultado-leitura'
    );


  if (painel) {

    painel.style.display =
      'none';
  }


  limparMesa();


  document
    .getElementById(
      'form-consulta'
    )
    ?.scrollIntoView({
      behavior: 'smooth'
    });
}


// ==========================================
// 11. LIMPAR MESA
// ==========================================

function limparMesa() {

  const mesa =
    document.getElementById(
      'mesa-buzios'
    );


  const peneira =
    document.getElementById(
      'peneira'
    );


  const status =
    document.getElementById(
      'status-jogo'
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


  if (peneira) {

    peneira.innerHTML =
      '';
  }


  if (status) {

    status.textContent =
      '';
  }
}


// ==========================================
// 12. SEGURANÇA LOCAL
//
// É UMA PRIMEIRA BARREIRA.
// O BACKEND SEMPRE CONFERE NOVAMENTE.
// ==========================================

function detectarRiscoEmocional(
  texto
) {

  const t =
    normalizarTexto(
      texto
    );


  const padroes = [

    /\bsuicid/,

    /\bauto ?mutil/,

    /\bme matar\b/,

    /\bquero morrer\b/,

    /\bqueria morrer\b/,

    /\bvontade de morrer\b/,

    /\bpensando em morrer\b/,

    /\bpenso em morrer\b/,

    /\bnao quero mais viver\b/,

    /\btirar minha vida\b/,

    /\bacabar com minha vida\b/

  ];


  return padroes.some(
    padrao =>
      padrao.test(t)
  );
}


function classificarPerguntaLocal(
  texto
) {

  const t =
    normalizarTexto(
      texto
    );


  if (
    detectarRiscoEmocional(
      texto
    )
  ) {

    return {

      bloqueado:
        true,

      tipo:
        'RISCO_EMOCIONAL',

      mensagem:
        'Essa pergunta precisa de apoio humano e não será direcionada para uma leitura dos búzios. Nenhum crédito será consumido. Procure uma pessoa de confiança e apoio profissional adequado.'
    };
  }


  const apostas = [

    'mega sena',
    'megasena',
    'jogo do bicho',
    'lotofacil',
    'quina',
    'tigrinho',
    'loteria',
    'numeros da sorte'

  ];


  if (
    apostas.some(
      termo =>
        t.includes(termo)
    )
  ) {

    return {

      bloqueado:
        true,

      tipo:
        'APOSTAS',

      mensagem:
        'O Oráculo não fornece números ou palpites para apostas e jogos de azar. Seu saldo será preservado.'
    };
  }


  /*
    Diagnóstico médico fica preferencialmente
    no backend porque há regras mais completas.

    Isso é intencional:
    mesmo com saldo ZERO a pergunta chegará
    ao PREPARAR e poderá ser bloqueada antes
    da checagem de crédito.
  */


  return {
    bloqueado: false
  };
}


// ==========================================
// 13. MOSTRAR BLOQUEIO
//
// SEMPRE ESCONDE QUALQUER QUEDA ANTERIOR.
// ==========================================

function mostrarBloqueio(
  titulo,
  mensagem
) {

  limparMesa();


  const painel =
    document.getElementById(
      'resultado-leitura'
    );


  if (!painel) {
    return;
  }


  painel.className =
    'card card-resultado-dark';


  painel.innerHTML = `

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


  painel.style.display =
    'block';


  painel.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}


// ==========================================
// 14. DESENHO DOS BÚZIOS
// ==========================================

function criarDesenhoBuzio(
  aberto
) {

  if (aberto) {

    return `

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
    `;
  }


  return `

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
}


// ==========================================
// 15. SORTEAR QUEDA
// ==========================================

function sortearQueda() {

  const numAbertos =
    Math.floor(
      Math.random() * 17
    );


  const info =
    ODUS_MAP[numAbertos] ||
    ODUS_MAP[16];


  return {

    numero:
      numAbertos,

    nome:
      info.nome,

    orixa:
      info.orixa,

    elemento:
      info.elemento,

    tendencia:
      info.tendencia,

    caminho:
      info.caminho,

    numAbertos,

    numFechados:
      16 - numAbertos

  };
}


// ==========================================
// 16. STATUS DA MESA
// ==========================================

function obterStatusJogo(
  mesa
) {

  let status =
    document.getElementById(
      'status-jogo'
    );


  if (!status) {

    status =
      document.createElement(
        'p'
      );


    status.id =
      'status-jogo';


    mesa.parentNode.insertBefore(
      status,
      mesa.nextSibling
    );
  }


  return status;
}


// ==========================================
// 17. ANIMAÇÃO DE UMA QUEDA
//
// SEM CHACOALHAR MESA VAZIA.
// ==========================================

async function animarQueda({
  queda,
  numeroQueda,
  totalQuedas,
  tituloPosicao
}) {

  const mesa =
    document.getElementById(
      'mesa-buzios'
    );


  const peneira =
    document.getElementById(
      'peneira'
    );


  if (
    !mesa ||
    !peneira
  ) {

    throw new Error(
      'Mesa dos búzios não encontrada.'
    );
  }


  mesa.style.display =
    'block';


  mesa.classList.remove(
    'mesa-chacoalhando',
    'mesa-impacto',
    'mesa-revelando'
  );


  peneira.innerHTML =
    '';


  const status =
    obterStatusJogo(
      mesa
    );


  mesa.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });


  if (
    totalQuedas > 1
  ) {

    status.textContent =
      `🔮 Queda ${numeroQueda} de ${totalQuedas}: ${tituloPosicao}`;

  } else {

    status.textContent =
      '🔮 Concentrando na sua pergunta...';
  }


  /*
    Apenas meio segundo de preparação.
  */

  await esperar(
    500
  );


  status.textContent =
    '🍃 Os búzios são lançados sobre a mesa...';


  const larguraMesa =
    peneira.clientWidth;


  const alturaMesa =
    peneira.clientHeight;


  const centroX =
    larguraMesa / 2;


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
      i <
      queda.numAbertos;


    buzio.innerHTML =
      criarDesenhoBuzio(
        aberto
      );


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
      -65 -
      Math.random() *
      70;


    buzio.style.opacity =
      '1';


    peneira.appendChild(
      buzio
    );


    buzios.push(
      buzio
    );


    const atraso =
      i * 42 +
      Math.random() *
      120;


    setTimeout(
      () => {

        buzio.animate(
          [

            {
              transform:
                `translate(${deltaX}px, ${deltaY}px)
                 rotate(${rotacaoInicial}deg)
                 scale(0.55)`,

              opacity:
                0.15
            },

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
              2100 +
              Math.random() *
              350,

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


  await esperar(
    2200
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


  status.textContent =
    '✨ Os búzios tocaram a mesa e estão se assentando...';


  await esperar(
    850
  );


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


  status.textContent =
    `🔮 Odù ${queda.nome}: ${queda.numAbertos} abertos e ${queda.numFechados} fechados.`;


  await esperar(
    1300
  );


  mesa.classList.remove(
    'mesa-revelando'
  );


  return queda;
}


// ==========================================
// FIM DA PARTE 1/2
// ==========================================
// ==========================================
// 18. PREPARAR CONSULTA NO BACKEND
// ==========================================

async function prepararConsultaBackend(
  pergunta
) {

  if (!pedidoId) {

    throw new Error(
      'Esta consulta precisa de uma sessão válida.'
    );
  }


  const resposta =
    await fetch(
      '/api/consultar',
      {
        method:
          'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body:
          JSON.stringify({

            acao:
              'PREPARAR',

            pedidoId,

            pergunta

          })
      }
    );


  const dados =
    await resposta.json();


  if (!resposta.ok) {

    throw new Error(
      dados?.error ||
      'Não foi possível preparar a consulta.'
    );
  }


  return dados;
}


// ==========================================
// 19. INTERPRETAR CONSULTA NO BACKEND
// ==========================================

async function interpretarConsultaBackend({
  pergunta,
  quedas
}) {

  const resposta =
    await fetch(
      '/api/consultar',
      {
        method:
          'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body:
          JSON.stringify({

            acao:
              'INTERPRETAR',

            pedidoId,

            pergunta,

            quedas:
              quedas.map(
                queda => ({

                  numero:
                    queda.numero,

                  nome:
                    queda.nome,

                  orixa:
                    queda.orixa,

                  elemento:
                    queda.elemento,

                  tendencia:
                    queda.tendencia,

                  numAbertos:
                    queda.numAbertos

                })
              )

          })
      }
    );


  const dados =
    await resposta.json();


  if (!resposta.ok) {

    throw new Error(
      dados?.error ||
      'Não foi possível interpretar a consulta.'
    );
  }


  return dados;
}


// ==========================================
// 20. FLUXO ÚNICO DA CONSULTA
// ==========================================

document
  .getElementById(
    'form-consulta'
  )
  ?.addEventListener(
    'submit',
    async function (e) {

      e.preventDefault();


      // --------------------------------------
      // BLOQUEIO DE DUPLO CLIQUE
      // --------------------------------------

      if (isProcessing) {
        return;
      }


      const campoPergunta =
        document.getElementById(
          'pergunta'
        );


      const painel =
        document.getElementById(
          'resultado-leitura'
        );


      const btnJogar =
        document.getElementById(
          'btn-jogar'
        );


      if (
        !campoPergunta ||
        !painel
      ) {

        console.error(
          'Elementos da consulta não encontrados.'
        );

        return;
      }


      const pergunta =
        campoPergunta
          .value
          .trim();


      if (
        !pergunta ||
        pergunta.length < 3
      ) {

        return;
      }


      // ======================================
      // 21. SEGURANÇA LOCAL PRIMEIRO
      //
      // IMPORTANTE:
      // NÃO EXISTE MAIS CHECAGEM DE SALDO
      // ANTES DA SEGURANÇA.
      // ======================================

      const segurancaLocal =
        classificarPerguntaLocal(
          pergunta
        );


      if (
        segurancaLocal.bloqueado
      ) {

        mostrarBloqueio(
          'Consulta Não Realizada',
          segurancaLocal.mensagem
        );

        return;
      }


      // ======================================
      // 22. TRAVA LOCAL DE REPETIÇÃO
      // ======================================

      const perguntaNormalizada =
        normalizarTexto(
          pergunta
        );


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


      // ======================================
      // 23. PROCESSAMENTO
      // ======================================

      isProcessing =
        true;


      if (btnJogar) {

        btnJogar.disabled =
          true;
      }


      painel.style.display =
        'none';


      /*
        Limpamos a mesa anterior antes
        de começar uma nova consulta.
      */

      limparMesa();


      try {

        // ====================================
        // 24. PREPARAR NO BACKEND
        //
        // O BACKEND DECIDE:
        //
        // - segurança
        // - saldo
        // - repetição
        // - contexto
        // - protocolo
        // - número de quedas
        // ====================================

        const preparacao =
          await prepararConsultaBackend(
            pergunta
          );


        // ------------------------------------
        // BLOQUEIO DO BACKEND
        // ------------------------------------

        if (
          preparacao.bloqueado
        ) {

          mostrarBloqueio(

            preparacao.tipoBloqueio ===
              'PERGUNTA_REPETIDA'

              ? 'Pergunta Repetida Detectada'

              : 'Consulta Não Realizada',

            preparacao.mensagem ||
              'Esta consulta não pode ser realizada.'

          );


          if (
            Number.isFinite(
              Number(
                preparacao
                  .perguntasRestantes
              )
            )
          ) {

            consultasRestantes =
              Number(
                preparacao
                  .perguntasRestantes
              );


            atualizarContadores();
          }


          return;
        }


        // ====================================
        // 25. GARANTIR SALDO REAL
        //
        // Se o backend disser que o saldo
        // terminou, a consulta não avança.
        // ====================================

        if (
          preparacao.saldoEsgotado
        ) {

          await carregarSessao();


          mostrarBloqueio(
            'Saldo de Consultas Esgotado',
            preparacao.error ||
            'Seu saldo de perguntas terminou. Escolha um novo pacote para continuar.'
          );


          return;
        }


        // ====================================
        // 26. NÚMERO DE QUEDAS
        // ====================================

        let totalQuedas =
          Number(
            preparacao
              .quedasNecessarias || 1
          );


        if (
          !Number.isFinite(
            totalQuedas
          ) ||
          totalQuedas < 1
        ) {

          totalQuedas = 1;
        }


        /*
          Proteção do frontend.

          Hoje os protocolos válidos são:

          1 queda
          ou
          3 quedas
        */

        totalQuedas =
          Math.min(
            totalQuedas,
            3
          );


        const posicoes =
          Array.isArray(
            preparacao.posicoes
          )
            ? preparacao.posicoes
            : [];


        const protocolo =
          preparacao.protocolo ||
          'CONSULTA_PADRAO';


        const ehConsultaOrixas =
          protocolo ===
          'ORIXAS_DO_MOMENTO';


        console.log(
          'Consulta preparada:',
          {
            protocolo,
            totalQuedas,
            contexto:
              preparacao.contexto
          }
        );


        // ====================================
        // 27. EXECUTAR QUEDAS VISUAIS
        // ====================================

        const quedas =
          [];


        for (
          let i = 0;
          i < totalQuedas;
          i++
        ) {

          const numeroQueda =
            i + 1;


          const posicao =
            posicoes[i] ||
            {};


          const tituloPosicao =
            posicao.titulo ||
            (
              totalQuedas === 1

                ? 'Queda principal'

                : `Queda ${numeroQueda}`
            );


          /*
            O resultado sorteado aqui
            é exatamente o mesmo:

            - exibido na mesa
            - enviado ao backend
            - interpretado pela IA
          */

          const queda =
            sortearQueda();


          await animarQueda({

            queda,

            numeroQueda,

            totalQuedas,

            tituloPosicao

          });


          quedas.push(
            queda
          );


          // ----------------------------------
          // TRANSIÇÃO ENTRE QUEDAS
          // ----------------------------------

          if (
            numeroQueda <
            totalQuedas
          ) {

            const mesaAtual =
              document.getElementById(
                'mesa-buzios'
              );


            const statusAtual =
              mesaAtual
                ? obterStatusJogo(
                    mesaAtual
                  )
                : null;


            if (statusAtual) {

              statusAtual.textContent =
                `✨ ${tituloPosicao} registrada. Preparando a próxima queda...`;
            }


            await esperar(
              900
            );
          }
        }


        // ====================================
        // 28. INTERPRETAÇÃO
        // ====================================

        const mesaFinal =
          document.getElementById(
            'mesa-buzios'
          );


        const statusFinal =
          mesaFinal
            ? obterStatusJogo(
                mesaFinal
              )
            : null;


        if (statusFinal) {

          statusFinal.textContent =
            ehConsultaOrixas

              ? '🔮 As três quedas foram concluídas. Integrando as forças apresentadas...'

              : '🔮 Interpretando a caída apresentada...';
        }


        const resultado =
          await interpretarConsultaBackend({

            pergunta,

            quedas

          });


        // ====================================
        // 29. BLOQUEIO NA ETAPA FINAL
        // ====================================

        if (
          resultado.bloqueado
        ) {

          mostrarBloqueio(

            resultado.tipoBloqueio ===
              'PERGUNTA_REPETIDA'

              ? 'Pergunta Repetida Detectada'

              : 'Consulta Não Realizada',

            resultado.mensagem ||
              'Esta consulta não pode ser realizada.'

          );


          if (
            Number.isFinite(
              Number(
                resultado
                  .perguntasRestantes
              )
            )
          ) {

            consultasRestantes =
              Number(
                resultado
                  .perguntasRestantes
              );


            atualizarContadores();
          }


          return;
        }


        // ====================================
        // 30. VALIDAR RESPOSTA
        // ====================================

        if (
          !resultado.sucesso ||
          !resultado.resposta
        ) {

          throw new Error(
            resultado.error ||
            'A interpretação não retornou uma resposta válida.'
          );
        }


        // ====================================
        // 31. SALDO REAL DEVOLVIDO
        // ====================================

        if (
          Number.isFinite(
            Number(
              resultado
                .perguntasRestantes
            )
          )
        ) {

          consultasRestantes =
            Number(
              resultado
                .perguntasRestantes
            );


          atualizarContadores();
        }


        // ====================================
        // 32. MARCAR PERGUNTA COMO PROCESSADA
        // ====================================

        ultimaPerguntaProcessada =
          perguntaNormalizada;


        // ====================================
        // 33. RESUMO DAS QUEDAS
        // ====================================

        let resumoQuedas =
          '';


        if (
          totalQuedas > 1
        ) {

          resumoQuedas = `
            <div style="
              margin-bottom: 20px;
              display: grid;
              gap: 10px;
            ">
          `;


          quedas.forEach(
            (
              queda,
              index
            ) => {

              const titulo =
                posicoes[index]
                  ?.titulo ||
                `Queda ${index + 1}`;


              resumoQuedas += `

                <div style="
                  padding: 14px 16px;
                  background: rgba(18,10,31,0.58);
                  border: 1px solid rgba(212,175,55,0.28);
                  border-radius: 10px;
                ">

                  <div style="
                    color: var(--gold-accent);
                    font-size: 0.76rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.4px;
                    margin-bottom: 5px;
                  ">

                    ${titulo}

                  </div>


                  <div style="
                    color: var(--gold-light);
                    font-family: 'Cinzel', serif;
                    font-size: 1rem;
                    font-weight: 600;
                  ">

                    Odù ${queda.nome}

                  </div>


                  <div style="
                    color: var(--text-main);
                    font-size: 0.86rem;
                    margin-top: 3px;
                  ">

                    ${queda.numAbertos}
                    abertos /

                    ${queda.numFechados}
                    fechados

                  </div>


                  <div style="
                    color: var(--text-muted);
                    font-size: 0.82rem;
                    margin-top: 4px;
                  ">

                    Orixá associado:

                    <strong style="
                      color: var(--gold-light);
                    ">

                      ${queda.orixa}

                    </strong>

                  </div>

                </div>
              `;
            }
          );


          resumoQuedas += `
            </div>
          `;
        }


        // ====================================
        // 34. TÍTULO DA LEITURA
        // ====================================

        const primeiraQueda =
          quedas[0];


        const tituloResultado =
          ehConsultaOrixas

            ? 'Leitura das Forças Apresentadas'

            : `Odù ${primeiraQueda.nome}`;


        const subtituloResultado =
          ehConsultaOrixas

            ? `${totalQuedas} quedas realizadas nesta consulta`

            : `${primeiraQueda.numAbertos} abertos / ${primeiraQueda.numFechados} fechados`;


        // ====================================
        // 35. EXIBIR LEITURA
        // ====================================

        painel.className =
          'card card-resultado-dark';


        painel.innerHTML = `

          <div style="
            border-bottom: 1px solid var(--card-border);
            padding-bottom: 12px;
            margin-bottom: 16px;
          ">

            <span style="
              color: var(--gold-accent);
              font-size: 0.78rem;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1px;
            ">

              Revelação da Consulta Sagrada

            </span>


            <h3 style="
              font-size: 1.35rem;
              color: var(--gold-light);
              margin-top: 5px;
            ">

              ${tituloResultado}

            </h3>


            <p style="
              color: var(--text-muted);
              font-size: 0.84rem;
              margin-top: 4px;
            ">

              ${subtituloResultado}

            </p>


            ${
              resultado.contexto
                ? `
                  <p style="
                    color: var(--text-muted);
                    font-size: 0.82rem;
                    margin-top: 4px;
                  ">

                    Área identificada:

                    <strong>
                      ${resultado.contexto}
                    </strong>

                  </p>
                `
                : ''
            }

          </div>


          ${resumoQuedas}


          <div
            class="box-destaque-dark"
            style="
              line-height: 1.8;
              font-size: 0.95rem;
            "
          >

            ${formatarRespostaIA(
              resultado.resposta
            )}

          </div>


          <div class="disclaimer-callout">

            ⚠️

            <strong>
              Aviso Importante:
            </strong>

            Esta é uma leitura digital
            baseada nas quedas apresentadas
            e em referências culturais
            sobre os Odùs.

            Confirmações religiosas,
            obrigações, assentamentos,
            ebós e rituais devem ser
            avaliados presencialmente
            com Babalorixá ou Ialorixá
            de sua confiança.

          </div>


          <div style="
            margin-top: 18px;
            text-align: center;
            font-size: 0.85rem;
            color: var(--text-muted);
          ">

            Perguntas restantes:

            <strong style="
              color: var(--gold-light);
              font-size: 1rem;
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


        painel.style.display =
          'block';


        if (statusFinal) {

          statusFinal.textContent =
            '';
        }


        painel.scrollIntoView({

          behavior:
            'smooth',

          block:
            'start'

        });


      } catch (erro) {

        // ====================================
        // 36. TRATAMENTO DE ERRO
        // ====================================

        console.error(
          'Erro na consulta:',
          erro
        );


        /*
          Primeiro recarregamos o saldo real.
        */

        try {

          await carregarSessao();

        } catch (
          erroSessao
        ) {

          console.error(
            'Não foi possível atualizar a sessão:',
            erroSessao
          );
        }


        /*
          Se o erro for falta de saldo,
          mostramos mensagem específica.
        */

        const mensagemErro =
          erro?.message ||
          'Ocorreu um erro durante a leitura.';


        const ehSaldo =
          mensagemErro
            .toLowerCase()
            .includes(
              'saldo'
            );


        mostrarBloqueio(

          ehSaldo
            ? 'Saldo de Consultas Esgotado'
            : 'Não foi possível concluir a consulta',

          mensagemErro

        );


      } finally {

        // ====================================
        // 37. LIBERAR NOVA INTERAÇÃO
        // ====================================

        isProcessing =
          false;


        if (btnJogar) {

          btnJogar.disabled =
            false;
        }
      }
    }
  );


// ==========================================
// 38. INICIALIZAÇÃO
// ==========================================

document.addEventListener(
  'DOMContentLoaded',
  () => {

    atualizarContadores();

    carregarSessao();

  }
);


// ==========================================
// FIM DO SCRIPT.JS OFICIAL
// ==========================================
