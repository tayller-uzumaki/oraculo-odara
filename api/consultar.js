// api/consultar.js
// Oráculo Odara
// Vercel + Supabase + OpenAI
//
// FLUXO:
//
// 1. PREPARAR
//    - valida sessão
//    - verifica segurança
//    - verifica pergunta repetida
//    - entende a intenção
//    - define protocolo
//    - NÃO consome crédito
//
// 2. INTERPRETAR
//    - recebe a(s) queda(s)
//    - consulta a base cultural no Supabase
//    - registra a pergunta
//    - consome 1 crédito
//    - gera a leitura com IA
//    - salva resultado
//    - devolve novo saldo


// =========================================================
// FUNÇÕES AUXILIARES
// =========================================================

function normalizarTexto(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}


// =========================================================
// SEGURANÇA
// =========================================================

function detectarRiscoEmocional(texto) {
  const t = normalizarTexto(texto);

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
      padrao => padrao.test(t)
    )
  ) {
    return true;
  }

  const primeiraPessoa =
    /\b(eu|me|minha|minha vida|comigo)\b/
      .test(t);

  const termosRisco =
    /\b(morrer|matar|machucar|ferir|suicidio|desaparecer)\b/
      .test(t);

  const termosIntencao =
    /\b(quero|queria|penso|pensando|vontade|posso|devo|pretendo|considerando)\b/
      .test(t);

  return (
    primeiraPessoa &&
    termosRisco &&
    termosIntencao
  );
}


function classificarBloqueio(texto) {
  const t = normalizarTexto(texto);

  // -------------------------------------------------------
  // RISCO EMOCIONAL
  // -------------------------------------------------------

  if (detectarRiscoEmocional(texto)) {
    return {
      bloqueado: true,
      tipo: 'RISCO_EMOCIONAL',
      mensagem:
        'Essa pergunta indica uma situação que precisa de apoio humano e não de uma leitura oracular. ' +
        'A consulta não será realizada e nenhum crédito será consumido. ' +
        'Procure uma pessoa de confiança e apoio profissional adequado.'
    };
  }

  // -------------------------------------------------------
  // PREVISÃO DE MORTE
  // -------------------------------------------------------

  const previsaoMorte = [
    'quando vou morrer',
    'quando eu vou morrer',
    'como vou morrer',
    'como eu vou morrer',
    'dia da minha morte',
    'data da minha morte',
    'ano da minha morte',
    'quando ele vai morrer',
    'quando ela vai morrer',
    'como ele vai morrer',
    'como ela vai morrer'
  ];

  if (
    previsaoMorte.some(
      termo => t.includes(termo)
    )
  ) {
    return {
      bloqueado: true,
      tipo: 'PREVISAO_MORTE',
      mensagem:
        'O Oráculo não realiza previsões sobre data ou circunstâncias de morte. ' +
        'A consulta não será realizada e seu saldo será preservado.'
    };
  }

  // -------------------------------------------------------
  // APOSTAS
  // -------------------------------------------------------

  const termosApostas = [
    'mega sena',
    'megasena',
    'numeros da mega',
    'numero da mega',
    'quina',
    'lotofacil',
    'jogo do bicho',
    'aposta',
    'apostas',
    'loteria',
    'tigrinho',
    'tiger',
    'roleta',
    'bet',
    'numeros da sorte',
    'numero da sorte'
  ];

  if (
    termosApostas.some(
      termo => t.includes(termo)
    )
  ) {
    return {
      bloqueado: true,
      tipo: 'APOSTAS',
      mensagem:
        'O Oráculo não fornece números, combinações ou palpites para apostas e jogos de azar. ' +
        'Você pode reformular sua pergunta para buscar orientação sobre caminhos financeiros ou decisões pessoais. ' +
        'Seu saldo será preservado.'
    };
  }

  // -------------------------------------------------------
  // SAÚDE / DIAGNÓSTICO
  // -------------------------------------------------------

  const termosSaude = [
    'qual minha doenca',
    'qual e minha doenca',
    'qual meu diagnostico',
    'diagnostico medico',
    'tenho cancer',
    'estou com cancer',
    'vou me curar',
    'vou ficar curado',
    'vou ficar curada'
  ];

  if (
    termosSaude.some(
      termo => t.includes(termo)
    )
  ) {
    return {
      bloqueado: true,
      tipo: 'SAUDE',
      mensagem:
        'O Oráculo pode oferecer reflexão espiritual, mas não realiza diagnósticos médicos nem promete cura. ' +
        'Questões de saúde precisam ser acompanhadas por profissionais qualificados. ' +
        'Seu saldo será preservado.'
    };
  }

  return {
    bloqueado: false,
    tipo: null,
    mensagem: null
  };
}


// =========================================================
// CLASSIFICAÇÃO DA INTENÇÃO
// =========================================================

function classificarIntencao(pergunta) {
  const t = normalizarTexto(pergunta);

  let contexto =
    'Orientação Geral e Caminhos';

  let intencao =
    'ORIENTACAO_GERAL';


  // -------------------------------------------------------
  // ORIXÁS
  // -------------------------------------------------------

  const perguntaOrixa =
    (
      /\bqual meu orixa\b/.test(t) ||
      /\bqual e meu orixa\b/.test(t) ||
      /\bquais sao meus orixas\b/.test(t) ||
      /\bquem e meu orixa\b/.test(t) ||
      /\bpai de cabeca\b/.test(t) ||
      /\bmae de cabeca\b/.test(t) ||
      /\borixa de cabeca\b/.test(t) ||
      /\borixas de cabeca\b/.test(t) ||
      /\bquem rege minha cabeca\b/.test(t) ||
      /\bquem rege meu caminho\b/.test(t) ||
      /\bmeu eleda\b/.test(t) ||
      /\bqual meu eleda\b/.test(t) ||
      /\bmeu junto\b/.test(t) ||
      /\bmeu junto\b/.test(t)
    );

  if (perguntaOrixa) {
    return {
      contexto:
        'Orixás e Regências Espirituais',

      intencao:
        'IDENTIFICACAO_ORIXAS'
    };
  }


  // -------------------------------------------------------
  // AMOR / RELACIONAMENTO
  // -------------------------------------------------------

  if (
    /amor|namoro|namorada|namorado|casamento|relacionamento|ex|parceiro|parceira|traicao|voltar|separacao|terminar/
      .test(t)
  ) {
    contexto =
      'Amor e Relacionamentos';

    intencao =
      'RELACIONAMENTO';
  }


  // -------------------------------------------------------
  // TRABALHO
  // -------------------------------------------------------

  else if (
    /trabalho|emprego|vaga|carreira|profissional|profissao|empresa|chefe|promocao|entrevista|negocio|contrato|demissao/
      .test(t)
  ) {
    contexto =
      'Trabalho e Carreira';

    intencao =
      'TRABALHO';
  }


  // -------------------------------------------------------
  // FINANÇAS
  // -------------------------------------------------------

  else if (
    /dinheiro|financeiro|financas|divida|investimento|comprar|vender|prosperidade|renda|salario/
      .test(t)
  ) {
    contexto =
      'Finanças e Prosperidade';

    intencao =
      'FINANCAS';
  }


  // -------------------------------------------------------
  // FAMÍLIA
  // -------------------------------------------------------

  else if (
    /familia|mae|pai|filho|filha|irmao|irma|parentes/
      .test(t)
  ) {
    contexto =
      'Família';

    intencao =
      'FAMILIA';
  }


  // -------------------------------------------------------
  // ESPIRITUALIDADE
  // -------------------------------------------------------

  else if (
    /espiritual|protecao|inveja|demanda|energia|axe|feitico|macumba|ancestral/
      .test(t)
  ) {
    contexto =
      'Espiritualidade e Proteção';

    intencao =
      'ESPIRITUALIDADE';
  }

  return {
    contexto,
    intencao
  };
}


// =========================================================
// PROTOCOLO DE JOGO
// =========================================================

function determinarProtocolo(intencao) {

  if (
    intencao ===
    'IDENTIFICACAO_ORIXAS'
  ) {
    return {
      protocolo:
        'ORIXAS_DO_MOMENTO',

      quedasNecessarias:
        3,

      descricao:
        'Consulta especial com três quedas simbólicas.',

      posicoes: [
        {
          ordem: 1,
          chave:
            'FORCA_PRINCIPAL',
          titulo:
            'Força principal apresentada'
        },
        {
          ordem: 2,
          chave:
            'FORCA_COMPLEMENTAR',
          titulo:
            'Força complementar apresentada'
        },
        {
          ordem: 3,
          chave:
            'FORCA_ANCESTRAL_APOIO',
          titulo:
            'Força ancestral ou de apoio apresentada'
        }
      ]
    };
  }

  return {
    protocolo:
      'CONSULTA_PADRAO',

    quedasNecessarias:
      1,

    descricao:
      'Consulta oracular padrão com uma queda.',

    posicoes: [
      {
        ordem: 1,
        chave:
          'QUEDA_PRINCIPAL',
        titulo:
          'Queda principal'
      }
    ]
  };
}


// =========================================================
// UTILITÁRIO SUPABASE
// =========================================================

async function consultarSupabase(
  url,
  headers
) {

  try {

    const resposta =
      await fetch(
        url,
        { headers }
      );

    if (!resposta.ok) {
      return null;
    }

    return await resposta.json();

  } catch (erro) {

    console.error(
      'Falha ao consultar base complementar:',
      erro
    );

    return null;
  }
}


// =========================================================
// BUSCAR CONHECIMENTO DO ODÙ
//
// IMPORTANTE:
//
// As tabelas complementares do projeto podem ter
// estruturas diferentes.
//
// Por isso esta função é tolerante a falhas:
// se uma tabela ou coluna ainda não estiver pronta,
// a consulta principal continua funcionando.
// =========================================================

async function buscarConhecimentoOdu({
  supabaseUrl,
  supabaseHeaders,
  numero,
  nome
}) {

  const conhecimento = {
    odu: null,
    arquetipos: [],
    interpretacoes: [],
    orixas: [],
    proverbios: [],
    mitos: []
  };


  // -------------------------------------------------------
  // 1. TABELA PRINCIPAL ODUS
  // -------------------------------------------------------

  let odus = null;

  if (
    numero !== undefined &&
    numero !== null
  ) {

    odus =
      await consultarSupabase(
        `${supabaseUrl}/rest/v1/odus?numero=eq.${encodeURIComponent(numero)}&select=*&limit=1`,
        supabaseHeaders
      );
  }


  /*
    Caso o campo "numero" não exista
    ou não encontre resultado,
    tentamos pelo nome.
  */

  if (
    !odus ||
    !Array.isArray(odus) ||
    odus.length === 0
  ) {

    if (nome) {

      odus =
        await consultarSupabase(
          `${supabaseUrl}/rest/v1/odus?nome=eq.${encodeURIComponent(nome)}&select=*&limit=1`,
          supabaseHeaders
        );
    }
  }


  if (
    Array.isArray(odus) &&
    odus.length > 0
  ) {

    conhecimento.odu =
      odus[0];
  }


  const oduId =
    conhecimento.odu?.id;


  /*
    Sem ID não conseguimos garantir
    como as tabelas auxiliares estão
    relacionadas.

    Neste caso retornamos apenas o que
    conseguimos encontrar.
  */

  if (!oduId) {
    return conhecimento;
  }


  // -------------------------------------------------------
  // 2. INTERPRETAÇÕES
  // -------------------------------------------------------

  const interpretacoes =
    await consultarSupabase(
      `${supabaseUrl}/rest/v1/odu_interpretacoes?odu_id=eq.${encodeURIComponent(oduId)}&select=*`,
      supabaseHeaders
    );

  if (
    Array.isArray(
      interpretacoes
    )
  ) {

    conhecimento.interpretacoes =
      interpretacoes;
  }


  // -------------------------------------------------------
  // 3. ARQUÉTIPOS
  // -------------------------------------------------------

  const arquetipos =
    await consultarSupabase(
      `${supabaseUrl}/rest/v1/odu_arquetipos?odu_id=eq.${encodeURIComponent(oduId)}&select=*`,
      supabaseHeaders
    );

  if (
    Array.isArray(
      arquetipos
    )
  ) {

    conhecimento.arquetipos =
      arquetipos;
  }


  // -------------------------------------------------------
  // 4. ORIXÁS ASSOCIADOS
  // -------------------------------------------------------

  const orixas =
    await consultarSupabase(
      `${supabaseUrl}/rest/v1/odu_orixas?odu_id=eq.${encodeURIComponent(oduId)}&select=*`,
      supabaseHeaders
    );

  if (
    Array.isArray(
      orixas
    )
  ) {

    conhecimento.orixas =
      orixas;
  }


  // -------------------------------------------------------
  // 5. PROVÉRBIOS
  // -------------------------------------------------------

  const proverbios =
    await consultarSupabase(
      `${supabaseUrl}/rest/v1/odu_proverbios?odu_id=eq.${encodeURIComponent(oduId)}&select=*`,
      supabaseHeaders
    );

  if (
    Array.isArray(
      proverbios
    )
  ) {

    conhecimento.proverbios =
      proverbios;
  }


  // -------------------------------------------------------
  // 6. MITOS
  // -------------------------------------------------------

  const mitos =
    await consultarSupabase(
      `${supabaseUrl}/rest/v1/odu_mitos?odu_id=eq.${encodeURIComponent(oduId)}&select=*`,
      supabaseHeaders
    );

  if (
    Array.isArray(
      mitos
    )
  ) {

    conhecimento.mitos =
      mitos;
  }

  return conhecimento;
}


// =========================================================
// NORMALIZAR QUEDAS RECEBIDAS
// =========================================================

function montarQuedasRecebidas(body) {

  /*
    NOVO FORMATO:

    quedas: [
      {
        numero: 7,
        nome: "Odi",
        orixa: "...",
        elemento: "...",
        favorabilidade: 35,
        numAbertos: 7
      }
    ]
  */

  if (
    Array.isArray(body.quedas) &&
    body.quedas.length > 0
  ) {

    return body.quedas.map(
      (
        queda,
        index
      ) => ({

        ordem:
          index + 1,

        numero:
          queda.numero ??
          queda.oduNumero ??
          null,

        nome:
          queda.nome ??
          queda.oduNome ??
          null,

        orixa:
          queda.orixa ??
          null,

        elemento:
          queda.elemento ??
          null,

        favorabilidade:
          queda.favorabilidade ??
          null,

        numAbertos:
          queda.numAbertos ??
          null,

        numFechados:
          Number.isFinite(
            Number(
              queda.numAbertos
            )
          )
            ? 16 -
              Number(
                queda.numAbertos
              )
            : null
      })
    );
  }


  /*
    COMPATIBILIDADE COM O FRONTEND ANTIGO.

    Enquanto ainda não alteramos o script.js,
    o endpoint continua aceitando:

    oduNumero
    oduNome
    orixa
    elemento
    favorabilidade
    numAbertos
  */

  if (
    body.oduNumero !== undefined ||
    body.oduNome
  ) {

    return [
      {
        ordem: 1,

        numero:
          body.oduNumero ??
          null,

        nome:
          body.oduNome ??
          null,

        orixa:
          body.orixa ??
          null,

        elemento:
          body.elemento ??
          null,

        favorabilidade:
          body.favorabilidade ??
          null,

        numAbertos:
          body.numAbertos ??
          null,

        numFechados:
          Number.isFinite(
            Number(
              body.numAbertos
            )
          )
            ? 16 -
              Number(
                body.numAbertos
              )
            : null
      }
    ];
  }

  return [];
}


// =========================================================
// HANDLER PRINCIPAL
// =========================================================

export default async function handler(
  req,
  res
) {

  res.setHeader(
    'Access-Control-Allow-Origin',
    '*'
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, OPTIONS'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type'
  );


  if (
    req.method ===
    'OPTIONS'
  ) {

    return res
      .status(200)
      .end();
  }


  if (
    req.method !==
    'POST'
  ) {

    return res
      .status(405)
      .json({
        error:
          'Método não permitido.'
      });
  }


  const supabaseUrl =
    process.env
      .SUPABASE_URL;

  const supabaseKey =
    process.env
      .SUPABASE_SERVICE_ROLE_KEY;

  const openaiKey =
    process.env
      .OPENAI_API_KEY;


  if (
    !supabaseUrl ||
    !supabaseKey
  ) {

    return res
      .status(500)
      .json({
        error:
          'Configuração do Supabase não encontrada.'
      });
  }


  if (!openaiKey) {

    return res
      .status(500)
      .json({
        error:
          'Configuração da OpenAI não encontrada.'
      });
  }


  const supabaseHeaders = {

    apikey:
      supabaseKey,

    Authorization:
      `Bearer ${supabaseKey}`,

    'Content-Type':
      'application/json'
  };


  let creditoConsumido =
    false;

  let perguntaId =
    null;


  try {

    // =====================================================
    // DADOS RECEBIDOS
    // =====================================================

    const {
      pedidoId,
      pergunta
    } = req.body;


    /*
      "acao" pode ser:

      PREPARAR
      INTERPRETAR

      Por compatibilidade, se não for enviado,
      assumimos INTERPRETAR.
    */

    const acao =
      String(
        req.body?.acao ||
        'INTERPRETAR'
      )
        .toUpperCase()
        .trim();


    // =====================================================
    // 1. VALIDAÇÕES INICIAIS
    // =====================================================

    if (!pedidoId) {

      return res
        .status(400)
        .json({
          error:
            'Sessão de consulta não informada.'
        });
    }


    if (
      !pergunta ||
      typeof pergunta !==
        'string' ||
      pergunta
        .trim()
        .length < 3
    ) {

      return res
        .status(400)
        .json({
          error:
            'Pergunta inválida.'
        });
    }


    const perguntaLimpa =
      pergunta.trim();


    const perguntaNormalizada =
      normalizarTexto(
        perguntaLimpa
      );


    // =====================================================
    // 2. SEGURANÇA
    // =====================================================

    const seguranca =
      classificarBloqueio(
        perguntaLimpa
      );


    if (
      seguranca.bloqueado
    ) {

      return res
        .status(200)
        .json({

          sucesso:
            true,

          bloqueado:
            true,

          tipoBloqueio:
            seguranca.tipo,

          consumirCredito:
            false,

          mensagem:
            seguranca.mensagem
        });
    }


    // =====================================================
    // 3. BUSCAR SESSÃO
    // =====================================================

    const pedidoResponse =
      await fetch(

        `${supabaseUrl}/rest/v1/pedidos_consultas` +
        `?id=eq.${encodeURIComponent(pedidoId)}` +
        `&select=` +
        `id,` +
        `nome,` +
        `quantidade_contratada,` +
        `perguntas_restantes,` +
        `status_pagamento,` +
        `status_consulta,` +
        `origem_liberacao` +
        `&limit=1`,

        {
          headers:
            supabaseHeaders
        }
      );


    const pedidos =
      await pedidoResponse
        .json();


    if (
      !pedidoResponse.ok
    ) {

      return res
        .status(500)
        .json({
          error:
            'Não foi possível consultar a sessão.'
        });
    }


    if (
      !pedidos ||
      pedidos.length === 0
    ) {

      return res
        .status(404)
        .json({
          error:
            'Sessão de consulta não encontrada.'
        });
    }


    const pedido =
      pedidos[0];


    if (
      ![
        'PAGO',
        'TESTE'
      ].includes(
        pedido.status_pagamento
      )
    ) {

      return res
        .status(403)
        .json({
          error:
            'Esta consulta ainda não está liberada para uso.'
        });
    }


    if (
      pedido.perguntas_restantes <=
      0
    ) {

      return res
        .status(403)
        .json({

          saldoEsgotado:
            true,

          error:
            'Seu saldo de perguntas terminou.',

          perguntasRestantes:
            0
        });
    }


    // =====================================================
    // 4. VERIFICAR PERGUNTA REPETIDA
    // =====================================================

    const repetidaResponse =
      await fetch(

        `${supabaseUrl}/rest/v1/perguntas_consulta` +
        `?pedido_id=eq.${encodeURIComponent(pedidoId)}` +
        `&pergunta_normalizada=eq.${encodeURIComponent(perguntaNormalizada)}` +
        `&status=eq.CONCLUIDA` +
        `&select=id` +
        `&limit=1`,

        {
          headers:
            supabaseHeaders
        }
      );


    const repetidas =
      await repetidaResponse
        .json();


    if (
      repetidaResponse.ok &&
      Array.isArray(
        repetidas
      ) &&
      repetidas.length > 0
    ) {

      return res
        .status(200)
        .json({

          sucesso:
            true,

          bloqueado:
            true,

          tipoBloqueio:
            'PERGUNTA_REPETIDA',

          consumirCredito:
            false,

          mensagem:
            'Você já realizou essa pergunta nesta consulta. Reformule a questão ou faça uma nova pergunta. Seu saldo foi preservado.',

          perguntasRestantes:
            pedido.perguntas_restantes
        });
    }


    // =====================================================
    // 5. ENTENDER INTENÇÃO
    // =====================================================

    const classificacao =
      classificarIntencao(
        perguntaLimpa
      );


    const contexto =
      classificacao.contexto;


    const intencao =
      classificacao.intencao;


    const protocolo =
      determinarProtocolo(
        intencao
      );


    // =====================================================
    // 6. ETAPA PREPARAR
    //
    // NÃO registra pergunta
    // NÃO consome crédito
    // NÃO chama IA
    // =====================================================

    if (
      acao ===
      'PREPARAR'
    ) {

      return res
        .status(200)
        .json({

          sucesso:
            true,

          bloqueado:
            false,

          consumirCredito:
            false,

          etapa:
            'PREPARADA',

          nome:
            pedido.nome,

          contexto,

          intencao,

          protocolo:
            protocolo.protocolo,

          quedasNecessarias:
            protocolo.quedasNecessarias,

          posicoes:
            protocolo.posicoes,

          mensagem:
            protocolo.descricao,

          perguntasRestantes:
            pedido.perguntas_restantes
        });
    }


    // =====================================================
    // 7. ETAPA INTERPRETAR
    // =====================================================

    if (
      acao !==
      'INTERPRETAR'
    ) {

      return res
        .status(400)
        .json({
          error:
            'Etapa da consulta inválida.'
        });
    }


    const quedas =
      montarQuedasRecebidas(
        req.body
      );


    // =====================================================
    // 8. VALIDAR NÚMERO DE QUEDAS
    // =====================================================

    if (
      quedas.length === 0
    ) {

      return res
        .status(400)
        .json({
          error:
            'Nenhuma caída de búzios foi informada.'
        });
    }


    /*
      Para ORIXAS_DO_MOMENTO exigiremos
      as três quedas quando o novo
      frontend estiver conectado.

      Entretanto, enquanto estamos em
      migração, uma única queda ainda
      pode ser aceita para não quebrar
      testes antigos.
    */

    const protocoloCompleto =
      quedas.length >=
      protocolo.quedasNecessarias;


    // =====================================================
    // 9. ENRIQUECER CADA QUEDA COM O SUPABASE
    // =====================================================

    const quedasEnriquecidas =
      [];


    for (
      let i = 0;
      i < quedas.length;
      i++
    ) {

      const queda =
        quedas[i];


      const conhecimento =
        await buscarConhecimentoOdu({

          supabaseUrl,

          supabaseHeaders,

          numero:
            queda.numero,

          nome:
            queda.nome
        });


      const posicao =
        protocolo.posicoes[i] ||
        {
          ordem:
            i + 1,

          chave:
            `QUEDA_${i + 1}`,

          titulo:
            `Queda ${i + 1}`
        };


      quedasEnriquecidas.push({

        ...queda,

        posicao,

        conhecimento
      });
    }


    // =====================================================
    // A PARTIR DAQUI:
    //
    // - registrar PROCESSANDO
    // - consumir crédito
    // - montar prompt inteligente
    // - chamar OpenAI
    // - salvar resposta
    // - devolver saldo
    //
    // CONTINUA NA PARTE 2/2
    // =====================================================



      // =====================================================
    // 10. REGISTRAR PERGUNTA COMO PROCESSANDO
    // =====================================================

    const primeiraQueda =
      quedasEnriquecidas[0];


    const registroResponse =
      await fetch(

        `${supabaseUrl}/rest/v1/perguntas_consulta`,

        {
          method:
            'POST',

          headers: {
            ...supabaseHeaders,

            Prefer:
              'return=representation'
          },

          body:
            JSON.stringify({

              pedido_id:
                pedidoId,

              pergunta:
                perguntaLimpa,

              pergunta_normalizada:
                perguntaNormalizada,

              contexto,

              tipo_classificacao:
                protocolo.protocolo,

              bloqueada:
                false,

              consumiu_credito:
                false,

              status:
                'PROCESSANDO',

              numero_buzios_abertos:
                Number.isFinite(
                  Number(
                    primeiraQueda?.numAbertos
                  )
                )
                  ? Number(
                      primeiraQueda.numAbertos
                    )
                  : null,

              numero_buzios_fechados:
                Number.isFinite(
                  Number(
                    primeiraQueda?.numAbertos
                  )
                )
                  ? 16 -
                    Number(
                      primeiraQueda.numAbertos
                    )
                  : null
            })
        }
      );


    const registro =
      await registroResponse
        .json();


    if (
      !registroResponse.ok
    ) {

      console.error(
        'Erro ao registrar pergunta:',
        registro
      );

      return res
        .status(500)
        .json({
          error:
            'Não foi possível registrar a consulta.'
        });
    }


    perguntaId =
      registro?.[0]?.id ||
      null;


    // =====================================================
    // 11. CONSUMIR 1 CRÉDITO
    // =====================================================

    const creditoResponse =
      await fetch(

        `${supabaseUrl}/rest/v1/rpc/consumir_credito`,

        {
          method:
            'POST',

          headers:
            supabaseHeaders,

          body:
            JSON.stringify({
              p_pedido_id:
                pedidoId
            })
        }
      );


    const retornoCredito =
      await creditoResponse
        .json();


    if (
      !creditoResponse.ok
    ) {

      if (perguntaId) {

        await fetch(

          `${supabaseUrl}/rest/v1/perguntas_consulta?id=eq.${encodeURIComponent(perguntaId)}`,

          {
            method:
              'PATCH',

            headers:
              supabaseHeaders,

            body:
              JSON.stringify({

                status:
                  'ERRO',

                consumiu_credito:
                  false,

                erro_tecnico:
                  'Não foi possível reservar crédito.'
              })
          }
        );
      }


      return res
        .status(403)
        .json({
          error:
            'Não foi possível utilizar uma pergunta desta sessão.'
        });
    }


    creditoConsumido =
      true;


    /*
      Dependendo de como a RPC foi criada,
      o Supabase pode devolver:

      4

      ou

      { perguntas_restantes: 4 }

      ou

      [{ perguntas_restantes: 4 }]

      Tratamos os formatos para não
      depender de apenas um deles.
    */

    let novoSaldo =
      retornoCredito;


    if (
      Array.isArray(
        retornoCredito
      )
    ) {

      novoSaldo =
        retornoCredito?.[0]
          ?.perguntas_restantes ??
        retornoCredito?.[0]
          ?.novo_saldo ??
        retornoCredito?.[0]
          ?.saldo ??
        retornoCredito?.[0] ??
        null;
    }


    else if (
      retornoCredito &&
      typeof retornoCredito ===
        'object'
    ) {

      novoSaldo =
        retornoCredito
          .perguntas_restantes ??
        retornoCredito
          .novo_saldo ??
        retornoCredito
          .saldo ??
        null;
    }


    novoSaldo =
      Number(
        novoSaldo
      );


    if (
      !Number.isFinite(
        novoSaldo
      )
    ) {

      novoSaldo =
        Math.max(
          0,
          Number(
            pedido.perguntas_restantes
          ) - 1
        );
    }


    // =====================================================
    // 12. PREPARAR BASE CULTURAL PARA A IA
    // =====================================================

    /*
      Não enviamos o banco inteiro para a IA.

      Selecionamos somente os dados
      relevantes de cada queda para:

      - reduzir custo
      - evitar excesso de contexto
      - diminuir chance de respostas confusas
    */

    const baseParaPrompt =
      quedasEnriquecidas.map(
        (
          queda,
          index
        ) => {

          const conhecimento =
            queda.conhecimento ||
            {};


          const interpretacoes =
            Array.isArray(
              conhecimento.interpretacoes
            )
              ? conhecimento.interpretacoes
                  .filter(
                    item => {

                      if (!item) {
                        return false;
                      }

                      /*
                        Priorizamos a categoria
                        relacionada ao contexto.
                      */

                      const categoria =
                        normalizarTexto(
                          item.categoria
                        );

                      const contextoAtual =
                        normalizarTexto(
                          contexto
                        );

                      if (
                        !categoria
                      ) {
                        return true;
                      }

                      if (
                        contextoAtual.includes(
                          'amor'
                        )
                      ) {
                        return (
                          categoria.includes(
                            'amor'
                          ) ||
                          categoria.includes(
                            'relacion'
                          )
                        );
                      }

                      if (
                        contextoAtual.includes(
                          'trabalho'
                        )
                      ) {
                        return (
                          categoria.includes(
                            'trabalho'
                          ) ||
                          categoria.includes(
                            'carreira'
                          ) ||
                          categoria.includes(
                            'profissional'
                          )
                        );
                      }

                      if (
                        contextoAtual.includes(
                          'financ'
                        )
                      ) {
                        return (
                          categoria.includes(
                            'financ'
                          ) ||
                          categoria.includes(
                            'prosper'
                          ) ||
                          categoria.includes(
                            'dinheiro'
                          )
                        );
                      }

                      if (
                        contextoAtual.includes(
                          'famil'
                        )
                      ) {
                        return (
                          categoria.includes(
                            'famil'
                          )
                        );
                      }

                      if (
                        contextoAtual.includes(
                          'espiritual'
                        ) ||
                        contextoAtual.includes(
                          'orixa'
                        )
                      ) {
                        return (
                          categoria.includes(
                            'espiritual'
                          ) ||
                          categoria.includes(
                            'orixa'
                          ) ||
                          categoria.includes(
                            'geral'
                          )
                        );
                      }

                      return true;
                    }
                  )
                  .slice(
                    0,
                    6
                  )
              : [];


          const arquetipos =
            Array.isArray(
              conhecimento.arquetipos
            )
              ? conhecimento.arquetipos
                  .slice(
                    0,
                    2
                  )
              : [];


          const proverbios =
            Array.isArray(
              conhecimento.proverbios
            )
              ? conhecimento.proverbios
                  .slice(
                    0,
                    3
                  )
              : [];


          const mitos =
            Array.isArray(
              conhecimento.mitos
            )
              ? conhecimento.mitos
                  .slice(
                    0,
                    2
                  )
              : [];


          const orixas =
            Array.isArray(
              conhecimento.orixas
            )
              ? conhecimento.orixas
                  .slice(
                    0,
                    6
                  )
              : [];


          return {

            ordem:
              index + 1,

            posicao:
              queda.posicao,

            numero:
              queda.numero,

            nome:
              queda.nome,

            orixaInformado:
              queda.orixa,

            elemento:
              queda.elemento,

            favorabilidade:
              queda.favorabilidade,

            buziosAbertos:
              queda.numAbertos,

            buziosFechados:
              queda.numFechados,

            cadastroPrincipal:
              conhecimento.odu,

            arquetipos,

            interpretacoes,

            orixasRelacionados:
              orixas,

            proverbios,

            mitos
          };
        }
      );


    // =====================================================
    // 13. PROMPT INTELIGENTE
    // =====================================================

    const systemPrompt = `
Você é o intérprete digital do Oráculo Odara.

Seu trabalho NÃO é escrever um texto espiritual genérico.

Seu trabalho é compreender profundamente a pergunta do consulente e interpretar, com responsabilidade, os dados da caída dos búzios e a base cultural fornecida pelo sistema.

A CAÍDA TEM PRIORIDADE.

Você não deve mudar o sentido de uma caída para agradar, acalmar ou criar uma resposta positiva.

Se a leitura for desfavorável, cautelosa ou indicar obstáculos, diga isso com clareza e cuidado.

Se for favorável, diga que existe abertura, mas não transforme tendência em garantia.

--------------------------------------------------
1. TOM E RELAÇÃO COM O CONSULENTE
--------------------------------------------------

Responda em português do Brasil.

O texto deve parecer uma conversa humana, acolhedora e inteligente.

Antes de interpretar o Odù, reconheça brevemente o contexto humano da pergunta.

Exemplo de lógica:

"Você parece estar tentando entender se ainda vale insistir nessa situação..."

ou:

"Sua pergunta mostra que existe uma expectativa importante em torno dessa oportunidade..."

Não copie esses exemplos literalmente.

Não faça diagnóstico psicológico.

Não se apresente como psicólogo.

Não se apresente como sacerdote.

Não diga que está sentindo, vendo ou recebendo mensagens sobrenaturais.

O acolhimento deve vir da compreensão da pergunta, e não de afirmações inventadas sobre o estado emocional da pessoa.

--------------------------------------------------
2. PERSONALIZAÇÃO
--------------------------------------------------

Use o nome do consulente de forma natural quando isso melhorar a leitura.

Não repita o nome o tempo inteiro.

A resposta deve ser construída especificamente para a pergunta recebida.

Evite frases que poderiam ser reutilizadas para qualquer pessoa.

Evite textos como:

"confie no universo"

"tudo acontece no tempo certo"

"coisas boas estão chegando"

"mantenha pensamentos positivos"

a menos que exista uma razão concreta na leitura para dizer algo semelhante.

--------------------------------------------------
3. FIDELIDADE À CAÍDA
--------------------------------------------------

A interpretação deve respeitar:

- o Odù apresentado
- a quantidade de búzios abertos
- a tendência/favorabilidade informada
- os arquétipos disponíveis
- as interpretações da base
- os Orixás associados
- o contexto da pergunta

Não transforme uma resposta desfavorável em um "sim" disfarçado.

Não transforme uma resposta favorável em medo ou fatalismo.

Quando houver conflito entre uma frase genérica e os dados estruturados da base, priorize os dados estruturados.

A porcentagem de favorabilidade é apenas um sinal auxiliar.

Ela NÃO substitui os fundamentos do Odù.

--------------------------------------------------
4. RESPOSTA OBJETIVA
--------------------------------------------------

Em algum momento do início da resposta, deixe claro o que a leitura indica.

Use linguagem natural, como:

"a tendência é favorável"

"a leitura pede cautela"

"neste momento a queda não favorece..."

"há abertura, mas existem condições importantes..."

"o cenário depende principalmente de..."

Não é obrigatório usar essas frases literalmente.

--------------------------------------------------
5. RESPONSABILIDADE PESSOAL
--------------------------------------------------

O Oráculo orienta caminhos.

Ele não retira da pessoa a responsabilidade pelas próprias escolhas.

Mostre:

- o que está nas mãos do consulente
- o que merece atenção
- que comportamento pode fortalecer ou enfraquecer o caminho
- quais decisões precisam ser avaliadas com calma

Evite determinismo.

Evite dizer que algo "vai acontecer" como certeza absoluta.

--------------------------------------------------
6. QUANDO A LEITURA FOR DIFÍCIL
--------------------------------------------------

Não assuste.

Não use linguagem de condenação.

Não invente:

- morte
- doença
- maldição
- obsessão
- demanda espiritual
- traição
- feitiço
- perseguição

se isso não estiver sustentado pelos dados fornecidos.

Se a queda for desfavorável, explique:

- onde está o bloqueio
- por que a leitura pede cautela
- o que a pessoa pode observar
- o que ainda depende das escolhas dela

--------------------------------------------------
7. QUESTÕES SOBRE ORIXÁS
--------------------------------------------------

Quando o protocolo for ORIXAS_DO_MOMENTO:

NÃO declare definitivamente:

"seu pai é..."

"sua mãe é..."

"seu Orixá de cabeça é..."

"seu Eledá é..."

como verdade religiosa confirmada.

Apresente as quedas como:

"Força principal apresentada nesta consulta"

"Força complementar apresentada nesta consulta"

"Força ancestral ou de apoio apresentada nesta consulta"

Explique cada força separadamente.

Depois explique como essas energias dialogam entre si dentro da pergunta da pessoa.

Você pode explicar características culturais dos Orixás quando elas estiverem sustentadas pelos dados recebidos.

Não invente qualidades específicas de Orixás, caminhos iniciáticos, assentamentos ou obrigações.

Se nem todas as quedas previstas pelo protocolo estiverem presentes, diga claramente que a leitura está incompleta e NÃO invente as posições ausentes.

No encerramento desse tipo de consulta, explique que a configuração representa a leitura digital apresentada naquele momento e não substitui a confirmação ritual de Orixá de cabeça, Eledá, juntó ou demais posições religiosas.

--------------------------------------------------
8. BASE DE CONHECIMENTO
--------------------------------------------------

Use prioritariamente a BASE CULTURAL enviada pelo sistema.

A base pode conter:

- dados gerais do Odù
- arquétipos
- interpretações por área
- provérbios
- mitos
- associações com Orixás

Não invente informações que não estejam na base apenas para deixar a resposta mais completa.

Se a base de determinado Odù estiver incompleta, use somente os dados disponíveis da caída e seja mais prudente.

--------------------------------------------------
9. FORMATO DA RESPOSTA
--------------------------------------------------

A resposta NÃO deve parecer um formulário rígido.

Não é obrigatório repetir os mesmos títulos em todas as consultas.

Construa uma leitura fluida.

Ainda assim, internamente sua resposta precisa contemplar:

1. compreensão breve da pergunta
2. explicação do que caiu
3. resposta objetiva
4. fundamento da resposta no Odù
5. pontos de atenção
6. orientação prática
7. responsabilidade pessoal

Use parágrafos curtos.

Você pode usar pequenos subtítulos quando realmente ajudarem na leitura.

Evite uma lista excessiva de tópicos.

--------------------------------------------------
10. LIMITES
--------------------------------------------------

Não faça diagnóstico médico.

Não prometa cura.

Não faça previsão de morte.

Não indique números para apostas.

Não incentive decisões financeiras arriscadas.

Não declare confirmação religiosa definitiva.

Não invente fatos sobre terceiros.

--------------------------------------------------
11. AVISO FINAL
--------------------------------------------------

Finalize de forma breve com este sentido:

"Esta consulta é uma orientação digital baseada na interpretação dos Odùs e não substitui confirmações religiosas presenciais. Para rituais, obrigações ou confirmações de Orixá, procure um Babalorixá ou Ialorixá de sua confiança."

Você pode adaptar levemente a redação para não ficar robótica, preservando exatamente esse significado.
`;


    // =====================================================
    // 14. PROMPT DO CONSULENTE
    // =====================================================

    const userPrompt = `
CONSULENTE

Nome:
${pedido.nome || 'Consulente'}

Pergunta:
${perguntaLimpa}


CLASSIFICAÇÃO DA PERGUNTA

Contexto:
${contexto}

Intenção:
${intencao}


PROTOCOLO

Tipo:
${protocolo.protocolo}

Descrição:
${protocolo.descricao}

Quantidade prevista de quedas:
${protocolo.quedasNecessarias}

Quantidade de quedas recebidas:
${quedasEnriquecidas.length}

Protocolo completo:
${protocoloCompleto ? 'SIM' : 'NÃO'}


BASE CULTURAL E DADOS DAS QUEDAS

${JSON.stringify(
  baseParaPrompt,
  null,
  2
)}


INSTRUÇÃO PRINCIPAL

Responda especificamente à pergunta do consulente.

Primeiro compreenda o sentido humano da pergunta.

Depois interprete o que efetivamente apareceu nas quedas.

Não force positividade.

Não seja fatalista.

Não esconda uma indicação desfavorável.

Não transforme tendência em certeza.

Mostre de forma clara o que a leitura indica e quais atitudes continuam sob responsabilidade do consulente.
`;


    // =====================================================
    // 15. CHAMAR OPENAI
    // =====================================================

    const aiResponse =
      await fetch(

        'https://api.openai.com/v1/chat/completions',

        {
          method:
            'POST',

          headers: {

            'Content-Type':
              'application/json',

            Authorization:
              `Bearer ${openaiKey}`
          },

          body:
            JSON.stringify({

              model:
                'gpt-4o-mini',

              messages: [

                {
                  role:
                    'system',

                  content:
                    systemPrompt
                },

                {
                  role:
                    'user',

                  content:
                    userPrompt
                }
              ],

              temperature:
                0.55,

              max_tokens:
                1400
            })
        }
      );


    const aiData =
      await aiResponse
        .json();


    if (
      !aiResponse.ok
    ) {

      console.error(
        'Erro OpenAI:',
        aiData
      );

      throw new Error(

        aiData?.error
          ?.message ||

        'Erro ao gerar leitura com a IA.'
      );
    }


    const texto =
      aiData
        ?.choices
        ?.[0]
        ?.message
        ?.content;


    if (
      !texto ||
      typeof texto !==
        'string' ||
      texto.trim()
        .length === 0
    ) {

      throw new Error(
        'A IA não retornou uma leitura válida.'
      );
    }


    const respostaFinal =
      texto.trim();


    // =====================================================
    // 16. MARCAR PERGUNTA COMO CONCLUÍDA
    // =====================================================

    if (
      perguntaId
    ) {

      const conclusaoResponse =
        await fetch(

          `${supabaseUrl}/rest/v1/perguntas_consulta?id=eq.${encodeURIComponent(perguntaId)}`,

          {
            method:
              'PATCH',

            headers:
              supabaseHeaders,

            body:
              JSON.stringify({

                resposta:
                  respostaFinal,

                consumiu_credito:
                  true,

                status:
                  'CONCLUIDA',

                modelo_ia:
                  'gpt-4o-mini',

                concluido_em:
                  new Date()
                    .toISOString()
              })
          }
        );


      if (
        !conclusaoResponse.ok
      ) {

        const erroConclusao =
          await conclusaoResponse
            .json()
            .catch(
              () => null
            );


        console.error(
          'Não foi possível marcar consulta como concluída:',
          erroConclusao
        );


        /*
          A leitura foi gerada e o crédito
          já foi consumido.

          Neste caso lançamos erro para
          acionar o estorno e evitar que
          o usuário perca crédito sem
          persistência correta no banco.
        */

        throw new Error(
          'Não foi possível finalizar o registro da consulta.'
        );
      }
    }


    // =====================================================
    // 17. RETORNO PARA O FRONTEND
    // =====================================================

    return res
      .status(200)
      .json({

        sucesso:
          true,

        bloqueado:
          false,

        consumirCredito:
          true,

        contexto,

        intencao,

        protocolo:
          protocolo.protocolo,

        protocoloCompleto,

        quedasNecessarias:
          protocolo.quedasNecessarias,

        posicoes:
          protocolo.posicoes,

        resposta:
          respostaFinal,

        perguntasRestantes:
          novoSaldo
      });


  } catch (error) {

    console.error(
      'Erro consultar.js:',
      error
    );


    // =====================================================
    // 18. ESTORNAR CRÉDITO EM CASO DE ERRO
    // =====================================================

    try {

      const pedidoIdErro =
        req.body?.pedidoId;


      if (
        creditoConsumido &&
        pedidoIdErro &&
        supabaseUrl &&
        supabaseKey
      ) {

        const estornoResponse =
          await fetch(

            `${supabaseUrl}/rest/v1/rpc/estornar_credito`,

            {
              method:
                'POST',

              headers:
                supabaseHeaders,

              body:
                JSON.stringify({
                  p_pedido_id:
                    pedidoIdErro
                })
            }
          );


        if (
          !estornoResponse.ok
        ) {

          const erroEstornoBody =
            await estornoResponse
              .json()
              .catch(
                () => null
              );


          console.error(
            'Falha na RPC de estorno:',
            erroEstornoBody
          );

        } else {

          /*
            Impede que o bloco tente
            considerar novamente esse
            crédito como consumido.
          */

          creditoConsumido =
            false;
        }
      }


      // ===================================================
      // MARCAR PERGUNTA COMO ERRO
      // ===================================================

      if (
        perguntaId
      ) {

        await fetch(

          `${supabaseUrl}/rest/v1/perguntas_consulta?id=eq.${encodeURIComponent(perguntaId)}`,

          {
            method:
              'PATCH',

            headers:
              supabaseHeaders,

            body:
              JSON.stringify({

                status:
                  'ERRO',

                consumiu_credito:
                  false,

                erro_tecnico:
                  'Falha durante o processamento da leitura.'
              })
          }
        );
      }


    } catch (
      erroEstorno
    ) {

      console.error(
        'Erro ao estornar crédito:',
        erroEstorno
      );
    }


    // =====================================================
    // RESPOSTA SEGURA AO FRONTEND
    // =====================================================

    return res
      .status(500)
      .json({

        sucesso:
          false,

        error:
          'Não foi possível concluir a leitura. Seu crédito foi preservado.'
      });
  }
}
