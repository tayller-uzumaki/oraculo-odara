// api/consultar.js
// =========================================================
// ORÁCULO ODARA
// BACKEND OFICIAL DE CONSULTA
//
// FLUXO:
//
// PREPARAR
// 1. valida sessão
// 2. aplica segurança
// 3. verifica repetição
// 4. interpreta intenção
// 5. define protocolo e número de quedas
// 6. NÃO consome crédito
//
// INTERPRETAR
// 7. recebe as quedas reais vistas pelo usuário
// 8. enriquece os Odùs com a base Supabase
// 9. consome apenas 1 consulta
// 10. chama a OpenAI
// 11. salva a resposta
// 12. devolve saldo real
// =========================================================


// =========================================================
// 1. NORMALIZAÇÃO
// =========================================================

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


// =========================================================
// 2. SEGURANÇA CRÍTICA
// =========================================================

function detectarRiscoEmocional(texto) {

  const t =
    normalizarTexto(
      texto
    );


  const padroesDiretos = [

    /\bsuicid/,

    /\bauto ?mutil/,

    /\bme matar\b/,

    /\bme mato\b/,

    /\bquero morrer\b/,

    /\bqueria morrer\b/,

    /\bvontade de morrer\b/,

    /\bpenso em morrer\b/,

    /\bpensando em morrer\b/,

    /\btenho pensado em morrer\b/,

    /\bnao quero viver\b/,

    /\bnao quero mais viver\b/,

    /\bnao aguento mais viver\b/,

    /\btirar minha vida\b/,

    /\btirar a minha vida\b/,

    /\bacabar com minha vida\b/,

    /\bacabar com a minha vida\b/,

    /\bme machucar\b/,

    /\bme ferir\b/

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
    Segunda camada para pegar frases
    diferentes das cadastradas acima.
  */

  const primeiraPessoa =
    /\b(eu|me|minha|minha vida|comigo)\b/
      .test(t);


  const risco =
    /\b(morrer|matar|suicidio|machucar|ferir)\b/
      .test(t);


  const intencao =
    /\b(quero|queria|penso|pensando|vontade|posso|devo|pretendo)\b/
      .test(t);


  return (
    primeiraPessoa &&
    risco &&
    intencao
  );
}


// =========================================================
// 3. BLOQUEIOS OBRIGATÓRIOS
// =========================================================

function classificarBloqueio(texto) {

  const t =
    normalizarTexto(
      texto
    );


  // -------------------------------------------------------
  // A. RISCO EMOCIONAL / AUTOAGRESSÃO
  // -------------------------------------------------------

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
        'O que você escreveu merece acolhimento humano imediato, não uma leitura dos búzios. ' +
        'Por isso, o Oráculo não realizará esta consulta e nenhum crédito será consumido. ' +
        'Procure agora uma pessoa de confiança e apoio profissional. ' +
        'No Brasil, você também pode falar gratuitamente com o CVV pelo 188.'
    };
  }


  // -------------------------------------------------------
  // B. PREVISÃO DE MORTE
  // -------------------------------------------------------

  const termosMorte = [

    'quando vou morrer',

    'quando eu vou morrer',

    'como vou morrer',

    'como eu vou morrer',

    'data da minha morte',

    'dia da minha morte',

    'ano da minha morte',

    'quando ele vai morrer',

    'quando ela vai morrer',

    'como ele vai morrer',

    'como ela vai morrer'

  ];


  if (
    termosMorte.some(
      termo =>
        t.includes(termo)
    )
  ) {

    return {

      bloqueado:
        true,

      tipo:
        'PREVISAO_MORTE',

      mensagem:
        'O Oráculo não realiza previsões sobre data, forma ou circunstâncias de morte. ' +
        'A consulta não será realizada e seu saldo permanecerá intacto.'
    };
  }


  // -------------------------------------------------------
  // C. APOSTAS E JOGOS DE AZAR
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

    'numero da sorte',

    'palpite para apostar',

    'qual numero apostar'

  ];


  if (
    termosApostas.some(
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
        'Os búzios não serão utilizados para fornecer números, combinações, palpites ou estratégias de apostas. ' +
        'Se quiser, reformule sua pergunta para compreender seus caminhos financeiros, sua relação com o dinheiro ou uma decisão econômica pessoal. ' +
        'Nenhum crédito foi consumido.'
    };
  }


  // -------------------------------------------------------
  // D. DIAGNÓSTICO E PROMESSA DE CURA
  // -------------------------------------------------------

  const termosDiagnostico = [

    'qual minha doenca',

    'qual e minha doenca',

    'que doenca eu tenho',

    'qual meu diagnostico',

    'me diagnostique',

    'tenho cancer',

    'estou com cancer',

    'vou me curar',

    'vou ficar curado',

    'vou ficar curada',

    'essa doenca vai sumir',

    'posso parar meu remedio',

    'devo parar meu remedio'

  ];


  if (
    termosDiagnostico.some(
      termo =>
        t.includes(termo)
    )
  ) {

    return {

      bloqueado:
        true,

      tipo:
        'SAUDE_MEDICA',

      mensagem:
        'O Oráculo pode trabalhar reflexões sobre seu momento e bem-estar, mas não realiza diagnóstico médico, não determina tratamento e não promete cura. ' +
        'Questões médicas precisam ser avaliadas por profissionais de saúde. ' +
        'Esta consulta não será realizada e seu saldo será preservado.'
    };
  }


  return {

    bloqueado:
      false,

    tipo:
      null,

    mensagem:
      null
  };
}


// =========================================================
// 4. TEMAS SENSÍVEIS QUE PODEM SER CONSULTADOS
//
// NÃO BLOQUEIAM.
// SERVEM PARA A IA ADOTAR MAIS CUIDADO.
// =========================================================

function detectarSensibilidades(texto) {

  const t =
    normalizarTexto(
      texto
    );


  const sensibilidades =
    [];


  // -------------------------------------------------------
  // TRAIÇÃO / RELAÇÃO COM TERCEIROS
  // -------------------------------------------------------

  if (
    /\btraicao\b|\btraindo\b|\bme trai\b|\besta me traindo\b/
      .test(t)
  ) {

    sensibilidades.push(
      'TRAIÇÃO_OU_SUSPEITA'
    );
  }


  // -------------------------------------------------------
  // DEMANDA / FEITIÇO / INVEJA
  // -------------------------------------------------------

  if (
    /\bdemanda\b|\bfeitico\b|\bmacumba\b|\binveja\b|\btrabalho contra mim\b|\benergia negativa\b/
      .test(t)
  ) {

    sensibilidades.push(
      'NEGATIVIDADE_ESPIRITUAL'
    );
  }


  // -------------------------------------------------------
  // TRABALHISTA / JUDICIAL
  // -------------------------------------------------------

  if (
    /\bprocesso\b|\bjustica\b|\badvogado\b|\badvogada\b|\bindenizacao\b|\bacordo judicial\b|\bcausa trabalhista\b/
      .test(t)
  ) {

    sensibilidades.push(
      'QUESTAO_JURIDICA'
    );
  }


  // -------------------------------------------------------
  // FINANCEIRO DELICADO
  // -------------------------------------------------------

  if (
    /\bdivida\b|\bendividado\b|\bendividada\b|\bsem dinheiro\b|\bfalencia\b|\bperder dinheiro\b/
      .test(t)
  ) {

    sensibilidades.push(
      'FINANCEIRO_DELICADO'
    );
  }


  // -------------------------------------------------------
  // SAÚDE EM SENTIDO NÃO DIAGNÓSTICO
  // -------------------------------------------------------

  if (
    /\bsaude\b|\btratamento\b|\bcirurgia\b|\brecuperacao\b|\bbem estar\b/
      .test(t)
  ) {

    sensibilidades.push(
      'SAUDE_NAO_DIAGNOSTICA'
    );
  }


  return sensibilidades;
}


// =========================================================
// 5. CLASSIFICAÇÃO DA INTENÇÃO
// =========================================================

function classificarIntencao(pergunta) {

  const t =
    normalizarTexto(
      pergunta
    );


  // -------------------------------------------------------
  // A. ORIXÁS / CABEÇA / REGÊNCIA
  // -------------------------------------------------------

  const perguntaOrixas = [

    /\bqual meu orixa\b/,

    /\bqual e meu orixa\b/,

    /\bquais sao meus orixas\b/,

    /\bquem e meu orixa\b/,

    /\bquem sao meus orixas\b/,

    /\bpai de cabeca\b/,

    /\bmae de cabeca\b/,

    /\bpai e mae de cabeca\b/,

    /\bmae e pai de cabeca\b/,

    /\bquem e meu pai de cabeca\b/,

    /\bquem e minha mae de cabeca\b/,

    /\bquem sao meu pai e minha mae de cabeca\b/,

    /\bquais sao meu pai e minha mae de cabeca\b/,

    /\borixa de cabeca\b/,

    /\borixas de cabeca\b/,

    /\bquem rege minha cabeca\b/,

    /\bquem rege meu caminho\b/,

    /\bquem rege meus caminhos\b/,

    /\bqual meu eleda\b/,

    /\bmeu eleda\b/,

    /\bqual meu junto\b/,

    /\bmeu junto\b/,

    /\bqual meu adjunto\b/,

    /\bquais orixas se apresentam\b/,

    /\bquais sao os orixas que se apresentam\b/,

    /\borixas que se apresentam\b/,

    /\bforca principal complementar e ancestral\b/,

    /\bforca principal\b.*\bcomplementar\b.*\bancestral\b/,

    /\bprincipal\b.*\bcomplementar\b.*\bancestral\b.*\borixa\b/,

    /\bquais forcas regem meu momento\b/,

    /\bquais forcas regem meus caminhos\b/,

    /\bquais orixas regem meu momento\b/,

    /\bquais orixas regem meus caminhos\b/,

    /\bregencias do meu momento\b/,

    /\bregencias dos meus caminhos\b/

  ];


  if (
    perguntaOrixas.some(
      padrao =>
        padrao.test(t)
    )
  ) {

    return {

      contexto:
        'Identificação de Orixás e Regências',

      intencao:
        'IDENTIFICACAO_ORIXAS'
    };
  }


  // -------------------------------------------------------
  // B. TRABALHO
  // -------------------------------------------------------

  if (
    /\b(trabalho|emprego|vaga|carreira|profissional|profissao|empresa|chefe|promocao|entrevista|negocio|contrato|demissao)\b/
      .test(t)
  ) {

    return {

      contexto:
        'Trabalho e Carreira',

      intencao:
        'TRABALHO'
    };
  }


  // -------------------------------------------------------
  // C. FINANÇAS
  // -------------------------------------------------------

  if (
    /\b(dinheiro|financeiro|financas|divida|investimento|comprar|vender|prosperidade|renda|salario)\b/
      .test(t)
  ) {

    return {

      contexto:
        'Finanças e Prosperidade',

      intencao:
        'FINANCAS'
    };
  }


  // -------------------------------------------------------
  // D. FAMÍLIA
  // -------------------------------------------------------

  if (
    /\b(familia|filho|filha|irmao|irma|parentes|avo|tio|tia)\b/
      .test(t)
  ) {

    return {

      contexto:
        'Família e Vínculos',

      intencao:
        'FAMILIA'
    };
  }


  // -------------------------------------------------------
  // E. QUESTÕES JURÍDICAS
  // -------------------------------------------------------

  if (
    /\b(processo|justica|advogado|advogada|indenizacao|audiencia|causa trabalhista)\b/
      .test(t)
  ) {

    return {

      contexto:
        'Questões Jurídicas e Caminhos de Resolução',

      intencao:
        'JURIDICO'
    };
  }


  // -------------------------------------------------------
  // F. ESPIRITUALIDADE
  // -------------------------------------------------------

  if (
    /\b(espiritual|espiritualidade|protecao|inveja|demanda|energia|axe|feitico|macumba|ancestral|terreiro)\b/
      .test(t)
  ) {

    return {

      contexto:
        'Espiritualidade e Proteção',

      intencao:
        'ESPIRITUALIDADE'
    };
  }


  // -------------------------------------------------------
  // G. AMOR
  //
  // IMPORTANTE:
  // "ex" agora só é reconhecido como palavra isolada.
  // Assim "existe", "exemplo" e "experiencia"
  // não caem mais em Amor e Relacionamentos.
  // -------------------------------------------------------

  if (
    /\b(amor|relacionamento|namoro|namorada|namorado|casamento|marido|esposa|ex|parceiro|parceira|traicao|voltar|separacao|terminar)\b/
      .test(t)
  ) {

    return {

      contexto:
        'Amor e Relacionamentos',

      intencao:
        'RELACIONAMENTO'
    };
  }


  // -------------------------------------------------------
  // H. ORIENTAÇÃO GERAL
  // -------------------------------------------------------

  return {

    contexto:
      'Orientação Geral e Caminhos',

    intencao:
      'ORIENTACAO_GERAL'
  };
}


// =========================================================
// 6. PROTOCOLO DA CONSULTA
// =========================================================

function determinarProtocolo(
  intencao
) {

  // -------------------------------------------------------
  // CONSULTA ESPECIAL DE ORIXÁS
  // -------------------------------------------------------

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
        'Consulta especial com três quedas para leitura integrada das forças apresentadas.',

      posicoes: [

        {
          ordem: 1,

          chave:
            'ORIXA_FRENTE',

          titulo:
            'Força principal apresentada'
        },

        {
          ordem: 2,

          chave:
            'ORIXA_COMPLEMENTAR',

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


  // -------------------------------------------------------
  // CONSULTA NORMAL
  // -------------------------------------------------------

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
// 7. FUNÇÃO SEGURA DE CONSULTA AO SUPABASE
// =========================================================

async function consultarSupabase(
  url,
  headers
) {

  try {

    const resposta =
      await fetch(
        url,
        {
          headers
        }
      );


    if (
      !resposta.ok
    ) {

      console.error(
        'Consulta complementar Supabase falhou:',
        resposta.status,
        url
      );

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
// 8. BUSCAR BASE CULTURAL DO ODÙ
// =========================================================

async function buscarConhecimentoOdu({

  supabaseUrl,

  supabaseHeaders,

  numero,

  nome

}) {

  const conhecimento = {

    odu:
      null,

    arquetipos:
      [],

    interpretacoes:
      [],

    orixas:
      [],

    proverbios:
      [],

    mitos:
      []
  };


  // -------------------------------------------------------
  // TABELA PRINCIPAL ODUS
  //
  // A BASE DO PROJETO UTILIZA
  // numero_buzios COMO REFERÊNCIA.
  // -------------------------------------------------------

  let odus =
    null;


  if (
    numero !== undefined &&
    numero !== null
  ) {

    odus =
      await consultarSupabase(

        `${supabaseUrl}/rest/v1/odus` +
        `?numero_buzios=eq.${encodeURIComponent(numero)}` +
        `&select=*` +
        `&limit=1`,

        supabaseHeaders
      );
  }


  // -------------------------------------------------------
  // FALLBACK PELO NOME
  // -------------------------------------------------------

  if (
    !Array.isArray(
      odus
    ) ||
    odus.length === 0
  ) {

    if (nome) {

      odus =
        await consultarSupabase(

          `${supabaseUrl}/rest/v1/odus` +
          `?nome=eq.${encodeURIComponent(nome)}` +
          `&select=*` +
          `&limit=1`,

          supabaseHeaders
        );
    }
  }


  if (
    Array.isArray(
      odus
    ) &&
    odus.length > 0
  ) {

    conhecimento.odu =
      odus[0];
  }


  const oduId =
    conhecimento.odu?.id;


  if (!oduId) {

    return conhecimento;
  }


  // -------------------------------------------------------
  // INTERPRETAÇÕES
  // -------------------------------------------------------

  const interpretacoes =
    await consultarSupabase(

      `${supabaseUrl}/rest/v1/odu_interpretacoes` +
      `?odu_id=eq.${encodeURIComponent(oduId)}` +
      `&select=*`,

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
  // ARQUÉTIPOS
  // -------------------------------------------------------

  const arquetipos =
    await consultarSupabase(

      `${supabaseUrl}/rest/v1/odu_arquetipos` +
      `?odu_id=eq.${encodeURIComponent(oduId)}` +
      `&select=*`,

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
  // ORIXÁS RELACIONADOS
  // -------------------------------------------------------

  const orixas =
    await consultarSupabase(

      `${supabaseUrl}/rest/v1/odu_orixas` +
      `?odu_id=eq.${encodeURIComponent(oduId)}` +
      `&select=*`,

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
  // PROVÉRBIOS
  // -------------------------------------------------------

  const proverbios =
    await consultarSupabase(

      `${supabaseUrl}/rest/v1/odu_proverbios` +
      `?odu_id=eq.${encodeURIComponent(oduId)}` +
      `&select=*`,

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
  // MITOS
  // -------------------------------------------------------

  const mitos =
    await consultarSupabase(

      `${supabaseUrl}/rest/v1/odu_mitos` +
      `?odu_id=eq.${encodeURIComponent(oduId)}` +
      `&select=*`,

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
// 9. NORMALIZAR QUEDAS RECEBIDAS DO FRONTEND
// =========================================================

function montarQuedasRecebidas(
  body
) {

  if (
    Array.isArray(
      body.quedas
    ) &&
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
          Number.isFinite(
            Number(
              queda.numAbertos
            )
          )
            ? Number(
                queda.numAbertos
              )
            : null,

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


  // -------------------------------------------------------
  // COMPATIBILIDADE COM CHAMADAS ANTIGAS
  // -------------------------------------------------------

  if (
    body.oduNumero !== undefined ||
    body.oduNome
  ) {

    const abertos =
      Number(
        body.numAbertos
      );


    return [

      {

        ordem:
          1,

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
          Number.isFinite(
            abertos
          )
            ? abertos
            : null,

        numFechados:
          Number.isFinite(
            abertos
          )
            ? 16 -
              abertos
            : null

      }

    ];
  }


  return [];
}


// =========================================================
// 10. HANDLER PRINCIPAL
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


  // =======================================================
  // CONFIGURAÇÕES
  // =======================================================

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
    // 11. DADOS RECEBIDOS
    // =====================================================

    const pedidoId =
      req.body?.pedidoId;


    const pergunta =
      req.body?.pergunta;


    const acao =
      String(
        req.body?.acao ||
        'INTERPRETAR'
      )
        .toUpperCase()
        .trim();


    // =====================================================
    // 12. VALIDAÇÕES
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
      pergunta.trim().length < 3
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
    // 13. SEGURANÇA ANTES DE QUALQUER JOGADA
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
    // 14. IDENTIFICAR TEMAS SENSÍVEIS
    // =====================================================

    const sensibilidades =
      detectarSensibilidades(
        perguntaLimpa
      );


    // =====================================================
    // 15. BUSCAR SESSÃO REAL
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
      !Array.isArray(
        pedidos
      ) ||
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


    // =====================================================
    // 16. VALIDAR LIBERAÇÃO
    // =====================================================

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
      Number(
        pedido.perguntas_restantes
      ) <= 0
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
    // 17. PERGUNTA REPETIDA
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
            Number(
              pedido.perguntas_restantes
            )

        });
    }


    // =====================================================
    // 18. CLASSIFICAR PERGUNTA
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
    // 19. ETAPA PREPARAR
    //
    // NENHUM CRÉDITO É CONSUMIDO.
    // NENHUMA IA É CHAMADA.
    // NENHUMA QUEDA É CRIADA NO BACKEND.
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

          contexto,

          intencao,

          sensibilidades,

          protocolo:
            protocolo.protocolo,

          quedasNecessarias:
            protocolo.quedasNecessarias,

          posicoes:
            protocolo.posicoes,

          mensagem:
            protocolo.descricao,

          perguntasRestantes:
            Number(
              pedido.perguntas_restantes
            )

        });
    }


    // =====================================================
    // 20. ETAPA INTERPRETAR
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


    // =====================================================
    // 21. GARANTIR PROTOCOLO COMPLETO
    // =====================================================

    const protocoloCompleto =
      quedas.length >=
      protocolo.quedasNecessarias;


    /*
      Para consultas de Orixás,
      depois que o frontend foi validado
      com três quedas reais,
      não permitimos mais que uma única
      queda gere uma identificação incompleta.
    */

    if (
      protocolo.protocolo ===
        'ORIXAS_DO_MOMENTO' &&
      !protocoloCompleto
    ) {

      return res
        .status(400)
        .json({

          sucesso:
            false,

          error:
            'A consulta de Orixás precisa das três quedas previstas pelo protocolo.'

        });
    }


    // =====================================================
    // 22. ENRIQUECER AS QUEDAS
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
    // CONTINUA NA PARTE 2/2
    //
    // PARTE 2:
    // - registrar consulta
    // - consumir apenas 1 crédito
    // - preparar base cultural
    // - prompt novo
    // - regras por tema sensível
    // - leitura aprofundada de Orixás
    // - OpenAI
    // - salvar
    // - estorno
    // =====================================================
      // =====================================================
      // 23. REGISTRAR A CONSULTA COMO PROCESSANDO
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
                primeiraQueda
                  ?.numAbertos ??
                null,

              numero_buzios_fechados:
                primeiraQueda
                  ?.numFechados ??
                null

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

          sucesso:
            false,

          error:
            'Não foi possível registrar a consulta.'

        });
    }


    perguntaId =
      registro?.[0]?.id ||
      null;


    // =====================================================
    // 24. CONSUMIR SOMENTE 1 CRÉDITO
    //
    // MESMO QUANDO HOUVER 3 QUEDAS.
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

          `${supabaseUrl}/rest/v1/perguntas_consulta` +
          `?id=eq.${encodeURIComponent(perguntaId)}`,

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
                  'Não foi possível reservar o crédito.'

              })
          }
        );
      }


      return res
        .status(403)
        .json({

          sucesso:
            false,

          error:
            'Não foi possível utilizar uma pergunta desta sessão.'

        });
    }


    creditoConsumido =
      true;


    // =====================================================
    // 25. INTERPRETAR NOVO SALDO
    // =====================================================

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
    // 26. PREPARAR CONHECIMENTO PARA A IA
    // =====================================================

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
                  .slice(
                    0,
                    8
                  )
              : [];


          const arquetipos =
            Array.isArray(
              conhecimento.arquetipos
            )
              ? conhecimento.arquetipos
                  .slice(
                    0,
                    4
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


          return {

            ordem:
              index + 1,

            posicao:
              queda.posicao,

            queda: {

              numero:
                queda.numero,

              nome:
                queda.nome,

              orixa:
                queda.orixa,

              elemento:
                queda.elemento,

              favorabilidade:
                queda.favorabilidade,

              buziosAbertos:
                queda.numAbertos,

              buziosFechados:
                queda.numFechados

            },

            cadastroOdu:
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
    // 27. REGRA EXTRA PARA TEMAS SENSÍVEIS
    // =====================================================

    let regrasSensibilidade =
      'Nenhuma regra adicional de sensibilidade foi identificada.';


    if (
      sensibilidades.includes(
        'TRAIÇÃO_OU_SUSPEITA'
      )
    ) {

      regrasSensibilidade += `

TRAIÇÃO OU SUSPEITA:

- Não declare que houve traição como fato comprovado.
- Leia exclusivamente o que a queda indica.
- Se a queda não mostrar tensão relevante, diga claramente que a leitura não apresenta confirmação do temor.
- Se houver cautela, conflito ou ocultação nos dados, explique como sinal de atenção, e não como prova contra outra pessoa.
- Oriente o consulente a observar fatos concretos e comunicação real.
`;
    }


    if (
      sensibilidades.includes(
        'NEGATIVIDADE_ESPIRITUAL'
      )
    ) {

      regrasSensibilidade += `

NEGATIVIDADE ESPIRITUAL:

- Não afirme automaticamente que existe feitiço, demanda, ataque ou perseguição.
- Diferencie desgaste emocional, conflito, ambiente pesado e interpretação espiritual.
- Se a queda realmente pedir proteção ou resguardo, explique isso sem assustar.
- Não prescreva ebó, banho, oferenda, sacrifício ou obrigação.
- Caso a pessoa queira aprofundar ritualisticamente, a validação deve ser feita com liderança religiosa de confiança.
`;
    }


    if (
      sensibilidades.includes(
        'QUESTAO_JURIDICA'
      )
    ) {

      regrasSensibilidade += `

QUESTÃO JURÍDICA:

- O Oráculo pode interpretar tendências, obstáculos, movimento e necessidade de estratégia.
- Não prometa vitória judicial.
- Não determine prazo exato para pagamento, sentença ou acordo.
- Não substitua aconselhamento jurídico.
- Diferencie claramente a tendência oracular daquilo que depende do processo real.
`;
    }


    if (
      sensibilidades.includes(
        'FINANCEIRO_DELICADO'
      )
    ) {

      regrasSensibilidade += `

FINANCEIRO DELICADO:

- Não prometa riqueza ou entrada garantida de dinheiro.
- Não incentive aposta, endividamento ou investimento arriscado.
- Traga a responsabilidade pessoal para organização, planejamento e tomada de decisão.
`;
    }


    if (
      sensibilidades.includes(
        'SAUDE_NAO_DIAGNOSTICA'
      )
    ) {

      regrasSensibilidade += `

SAÚDE E BEM-ESTAR:

- Não diagnostique doença.
- Não prometa cura.
- Não diga para iniciar, interromper ou substituir tratamento.
- Você pode falar de cuidado, descanso, equilíbrio, apoio e aspectos simbólicos do momento.
`;
    }


    // =====================================================
    // 28. PROMPT PRINCIPAL
    // =====================================================

    const systemPrompt = `
Você é o intérprete digital do ORÁCULO ODARA.

Seu trabalho é realizar uma leitura inteligente, humana, contextualizada e respeitosa dos dados dos búzios fornecidos pelo sistema.

Você NÃO joga os búzios.

Você NÃO altera a queda.

Você NÃO escolhe o Odù.

Você interpreta exclusivamente as quedas que já aconteceram.

A REGRA MAIS IMPORTANTE É:

A QUEDA MANDA.
A INTERPRETAÇÃO NÃO PODE CONTRADIZER A CAÍDA PARA AGRADAR O CONSULENTE.


==================================================
1. COMO LER A PERGUNTA
==================================================

Antes de falar do Odù, compreenda o que a pessoa realmente quer saber.

Não responda apenas às palavras utilizadas.

Entenda:

- qual é a dúvida central
- qual decisão está envolvida
- qual expectativa está presente
- qual aspecto da vida precisa de orientação

Faça um reconhecimento humano breve e natural.

Isso NÃO significa fazer terapia.

Não diagnostique sentimentos ou condições psicológicas.

Não diga:

"eu sinto que você..."

"percebo espiritualmente que..."

"os Orixás me disseram..."

Você pode dizer, por exemplo:

"Sua pergunta busca entender..."

"O ponto central aqui parece ser..."

"Você está tentando compreender se..."

Sempre adapte ao contexto real.


==================================================
2. NÃO SEJA ROBÓTICO
==================================================

Não use sempre a mesma introdução.

Não transforme a resposta em formulário.

Não repita obrigatoriamente:

"Interpretação"

"Resposta objetiva"

"Pontos de atenção"

"Orientação"

como títulos em todas as consultas.

Você pode utilizar pequenos subtítulos quando eles realmente ajudarem.

Prefira uma leitura fluida, organizada em parágrafos curtos.


==================================================
3. FIDELIDADE AO ODÙ
==================================================

Use:

- a pergunta
- o contexto identificado
- o Odù
- os búzios abertos e fechados
- os Orixás relacionados
- os arquétipos
- as interpretações cadastradas
- os provérbios
- os demais dados culturais recebidos

como fundamentos.

Se a queda for desfavorável:

DIGA QUE É DESFAVORÁVEL.

Não transforme em:

"talvez tudo dê certo"

apenas para confortar.

Explique:

- qual dificuldade aparece
- onde existe bloqueio
- o que merece cautela
- o que pode depender de mudança de postura

Se a queda for favorável:

DIGA QUE EXISTE ABERTURA.

Mas não transforme abertura em promessa absoluta.


==================================================
4. POSITIVIDADE TÓXICA É PROIBIDA
==================================================

Evite frases genéricas como:

"vai dar tudo certo"

"confie no universo"

"tudo acontece por uma razão"

"coisas boas estão chegando"

"basta pensar positivo"

A menos que exista fundamento direto na leitura.

Acolher não significa maquiar a resposta.


==================================================
5. RESPONSABILIDADE SOBRE A PRÓPRIA VIDA
==================================================

O Oráculo não decide a vida do consulente.

Sempre que fizer sentido, mostre:

- o que depende da pessoa
- o que ela precisa observar
- qual postura pode ajudar
- qual comportamento pode piorar a situação
- onde é necessário paciência
- onde é necessário movimento

O objetivo é orientar, não criar dependência do Oráculo.


==================================================
6. PERGUNTAS SOBRE ORIXÁS
==================================================

Quando PROTOCOLO = ORIXAS_DO_MOMENTO:

Esta é uma consulta especial com três quedas reais.

A pessoa assistiu visualmente às três quedas.

Você deve respeitar exatamente a ordem.

QUEDA 1:
Força principal apresentada.

QUEDA 2:
Força complementar apresentada.

QUEDA 3:
Força ancestral ou de apoio apresentada.

NÃO ESCONDA OS ORIXÁS ENCONTRADOS.

NÃO transforme toda a resposta em ressalva.

Apresente de maneira clara, por exemplo:

"Nesta consulta, Oxum se apresenta como a força principal do seu momento."

ou:

"A primeira força apontada pela mesa foi Xangô."

Não diga de forma absoluta:

"Oxum é definitivamente seu Orixá de cabeça."

Mas também não diga:

"não podemos dizer nada sobre isso."

A plataforma REALIZOU uma leitura e precisa entregar o resultado dessa leitura.


==================================================
7. COMO EXPLICAR CADA ORIXÁ
==================================================

Para cada uma das três forças:

1. diga qual Orixá foi apresentado
2. diga em qual queda apareceu
3. explique a energia tradicionalmente associada a ele
4. apresente características frequentemente relacionadas a essa força
5. explique como essa energia pode aparecer no momento da pessoa

Evite afirmar que todas as pessoas ligadas ao Orixá possuem exatamente as mesmas características.

Prefira:

"Entre as características tradicionalmente associadas a essa força estão..."

"Essa energia costuma dialogar com..."

"A presença dessa força pode apontar para..."

Depois das três forças, explique A COMBINAÇÃO.

Não interprete cada Orixá como se os outros não existissem.

Mostre:

- onde se complementam
- onde entram em tensão
- como uma energia equilibra a outra
- qual mensagem conjunta aparece


==================================================
8. NÃO INVENTAR INFORMAÇÃO RELIGIOSA
==================================================

Não invente:

- qualidade de Orixá
- assentamento
- obrigação
- iniciação
- ebó
- banho
- oferenda
- sacrifício
- cargo religioso
- prazo ritual

se isso não estiver explicitamente sustentado pela base recebida.

Não ofereça instruções rituais.


==================================================
9. RESSALVA RELIGIOSA
==================================================

A ressalva é necessária, mas deve aparecer NO FINAL.

Ela não deve dominar a leitura.

Para consultas de Orixás, encerre com o sentido:

"Estas são as forças apresentadas pelas três quedas desta consulta digital. A confirmação ritual de Orixá de cabeça, Eledá, juntó, qualidades e obrigações pertence ao processo religioso e deve ser feita presencialmente com Babalorixá ou Ialorixá de confiança."

Não repita essa ressalva a cada parágrafo.


==================================================
10. QUESTÕES SOBRE TERCEIROS
==================================================

Nunca invente fatos sobre outra pessoa.

Não transforme símbolos em prova objetiva.

Exemplo:

Uma queda de tensão em pergunta sobre traição não prova traição.

Uma queda favorável também não prova fidelidade.

Explique como tendência da consulta.


==================================================
11. TOM
==================================================

Use português brasileiro.

Seja:

- humano
- acolhedor
- claro
- respeitoso
- seguro
- espiritualmente sensível
- direto quando necessário

Evite linguagem excessivamente acadêmica.

Evite jargões jurídicos.

Evite frases místicas vazias.

Não fale como personagem teatral.


==================================================
12. NOME DA PESSOA
==================================================

Use o nome somente quando houver um nome válido fornecido na sessão.

Use com moderação.

Nunca invente um nome.

Se o campo vier vazio ou inválido, simplesmente não use nome algum.

Não comece todos os parágrafos chamando a pessoa pelo nome.


==================================================
13. ESTRUTURA INTERNA
==================================================

Mesmo que você não mostre títulos fixos, a leitura deve contemplar:

- compreensão da pergunta
- resultado da queda
- resposta direta
- fundamento no Odù
- principais tensões ou aberturas
- pontos de atenção
- orientação prática
- responsabilidade pessoal
- ressalva adequada quando necessária


==================================================
14. LIMITES
==================================================

Não faça diagnóstico médico.

Não prometa cura.

Não faça previsão de morte.

Não forneça números de aposta.

Não dê orientação para atividades perigosas.

Não declare culpa criminal.

Não invente ações de terceiros.

Não prescreva tratamento religioso ou médico.


==================================================
15. REGRAS ESPECIAIS DESTA CONSULTA
==================================================

${regrasSensibilidade}
`;


    // =====================================================
    // 29. NOME SEGURO DA SESSÃO
    // =====================================================

    const nomeSessao =
      typeof pedido.nome ===
        'string' &&
      pedido.nome.trim().length >= 2

        ? pedido.nome.trim()

        : null;


    // =====================================================
    // 30. PROMPT ESPECÍFICO DO CONSULENTE
    // =====================================================

    const userPrompt = `
DADOS DO CONSULENTE

Nome:
${nomeSessao || 'NÃO INFORMADO'}

Pergunta:
"${perguntaLimpa}"


CLASSIFICAÇÃO

Contexto:
${contexto}

Intenção:
${intencao}

Sensibilidades identificadas:
${sensibilidades.length > 0
  ? sensibilidades.join(', ')
  : 'Nenhuma'}


PROTOCOLO

${protocolo.protocolo}

Quantidade de quedas:
${quedasEnriquecidas.length}


BASE DAS QUEDAS

${JSON.stringify(
  baseParaPrompt,
  null,
  2
)}
      });
  }
}
