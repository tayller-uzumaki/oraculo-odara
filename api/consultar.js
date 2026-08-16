// api/consultar.js - Consulta Oráculo Odara
// Vercel + Supabase + OpenAI

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido.'
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({
      error: 'Configuração do Supabase não encontrada.'
    });
  }

  if (!openaiKey) {
    return res.status(500).json({
      error: 'Configuração da OpenAI não encontrada.'
    });
  }

  const supabaseHeaders = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json'
  };

  let creditoConsumido = false;
  let perguntaId = null;

  try {
    const {
      pedidoId,
      pergunta,
      oduNumero,
      oduNome,
      orixa,
      elemento,
      favorabilidade,
      numAbertos
    } = req.body;

    // =========================================================
    // 1. VALIDAÇÕES INICIAIS
    // =========================================================

    if (!pedidoId) {
      return res.status(400).json({
        error: 'Sessão de consulta não informada.'
      });
    }

    if (
      !pergunta ||
      typeof pergunta !== 'string' ||
      pergunta.trim().length < 3
    ) {
      return res.status(400).json({
        error: 'Pergunta inválida.'
      });
    }

    const perguntaLimpa = pergunta.trim();
    const perguntaLower = perguntaLimpa.toLowerCase();

    const perguntaNormalizada = perguntaLower
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // =========================================================
    // 2. SEGURANÇA
    // =========================================================

    const TERMOS_RISCO_EMOCIONAL = [
      'suicidio',
      'suicídio',
      'me matar',
      'tirar minha vida',
      'automutilacao',
      'automutilação',
      'quero morrer',
      'não quero mais viver',
      'nao quero mais viver'
    ];

    if (
      TERMOS_RISCO_EMOCIONAL.some(
        termo => perguntaLower.includes(termo)
      )
    ) {
      return res.status(200).json({
        sucesso: true,
        bloqueado: true,
        tipoBloqueio: 'RISCO_EMOCIONAL',
        consumirCredito: false,
        mensagem:
          'Essa pergunta precisa de acolhimento e apoio humano, e não de uma leitura oracular. A consulta não será realizada e nenhum crédito será consumido.'
      });
    }

    const TERMOS_MORTE = [
      'quando vou morrer',
      'data da morte',
      'dia da minha morte',
      'como vou morrer'
    ];

    if (
      TERMOS_MORTE.some(
        termo => perguntaLower.includes(termo)
      )
    ) {
      return res.status(200).json({
        sucesso: true,
        bloqueado: true,
        tipoBloqueio: 'PREVISAO_MORTE',
        consumirCredito: false,
        mensagem:
          'O Oráculo não realiza previsões sobre data ou circunstâncias de morte. A consulta não foi realizada e seu saldo foi preservado.'
      });
    }

    const TERMOS_APOSTAS = [
      'mega sena',
      'megasena',
      'numeros da mega',
      'números da mega',
      'quina',
      'lotofacil',
      'lotofácil',
      'jogo do bicho',
      'aposta',
      'apostas',
      'loteria',
      'tiger',
      'tigrinho',
      'bet',
      'roleta'
    ];

    if (
      TERMOS_APOSTAS.some(
        termo => perguntaLower.includes(termo)
      )
    ) {
      return res.status(200).json({
        sucesso: true,
        bloqueado: true,
        tipoBloqueio: 'APOSTAS',
        consumirCredito: false,
        mensagem:
          'O Oráculo não fornece números, combinações, garantias ou palpites para apostas e jogos de azar. Reformule sua pergunta para uma orientação sobre seus caminhos financeiros ou decisões pessoais. Seu saldo foi preservado.'
      });
    }

    // =========================================================
    // 3. BUSCAR SESSÃO NO SUPABASE
    // =========================================================

    const pedidoResponse = await fetch(
      `${supabaseUrl}/rest/v1/pedidos_consultas?id=eq.${encodeURIComponent(pedidoId)}&select=id,nome,quantidade_contratada,perguntas_restantes,status_pagamento,status_consulta,origem_liberacao&limit=1`,
      {
        headers: supabaseHeaders
      }
    );

    const pedidos = await pedidoResponse.json();

    if (!pedidoResponse.ok) {
      return res.status(500).json({
        error: 'Não foi possível consultar a sessão.'
      });
    }

    if (!pedidos || pedidos.length === 0) {
      return res.status(404).json({
        error: 'Sessão de consulta não encontrada.'
      });
    }

    const pedido = pedidos[0];

    // Nesta fase só permitimos sessão PAGA ou TESTE.
    if (
      !['PAGO', 'TESTE'].includes(pedido.status_pagamento)
    ) {
      return res.status(403).json({
        error: 'Esta consulta ainda não está liberada para uso.'
      });
    }

    if (pedido.perguntas_restantes <= 0) {
      return res.status(403).json({
        saldoEsgotado: true,
        error: 'Seu saldo de perguntas terminou.',
        perguntasRestantes: 0
      });
    }

    // =========================================================
    // 4. IMPEDIR PERGUNTA REPETIDA
    // =========================================================

    const repetidaResponse = await fetch(
      `${supabaseUrl}/rest/v1/perguntas_consulta?pedido_id=eq.${encodeURIComponent(pedidoId)}&pergunta_normalizada=eq.${encodeURIComponent(perguntaNormalizada)}&status=eq.CONCLUIDA&select=id&limit=1`,
      {
        headers: supabaseHeaders
      }
    );

    const repetidas = await repetidaResponse.json();

    if (
      repetidaResponse.ok &&
      repetidas &&
      repetidas.length > 0
    ) {
      return res.status(200).json({
        sucesso: true,
        bloqueado: true,
        tipoBloqueio: 'PERGUNTA_REPETIDA',
        consumirCredito: false,
        mensagem:
          'Você já realizou essa pergunta nesta consulta. Reformule a questão ou faça uma nova pergunta. Seu saldo foi preservado.',
        perguntasRestantes: pedido.perguntas_restantes
      });
    }

    // =========================================================
    // 5. CLASSIFICAÇÃO DE CONTEXTO
    // =========================================================

    let contexto = 'Geral';

    if (
      /amor|relacionamento|namoro|namorada|namorado|casamento|ex|voltar|traição|traicao/i.test(
        perguntaLimpa
      )
    ) {
      contexto = 'Amor e Relacionamentos';
    } else if (
      /trabalho|emprego|vaga|carreira|profissional|profissionais|profissão|profissao|empresa|chefe|promoção|promocao|entrevista|negócio|negocio/i.test(
        perguntaLimpa
      )
    ) {
      contexto = 'Trabalho e Carreira';
    } else if (
      /dinheiro|financeiro|finanças|financas|dívida|divida|investimento|comprar|vender/i.test(
        perguntaLimpa
      )
    ) {
      contexto = 'Finanças';
    } else if (
      /orixá|orixa|pai de cabeça|mãe de cabeça|eledá|eleda|juntó|junto/i.test(
        perguntaLimpa
      )
    ) {
      contexto = 'Orixás';
    } else if (
      /espiritual|proteção|protecao|inveja|demanda|energia|axé|axe/i.test(
        perguntaLimpa
      )
    ) {
      contexto = 'Espiritualidade';
    }

    // =========================================================
    // 6. REGISTRAR PERGUNTA COMO PROCESSANDO
    // =========================================================

    const registroResponse = await fetch(
      `${supabaseUrl}/rest/v1/perguntas_consulta`,
      {
        method: 'POST',
        headers: {
          ...supabaseHeaders,
          Prefer: 'return=representation'
        },
        body: JSON.stringify({
          pedido_id: pedidoId,
          pergunta: perguntaLimpa,
          pergunta_normalizada: perguntaNormalizada,
          contexto,
          tipo_classificacao: 'CONSULTA_VALIDA',
          bloqueada: false,
          consumiu_credito: false,
          status: 'PROCESSANDO',
          numero_buzios_abertos:
            Number.isInteger(Number(numAbertos))
              ? Number(numAbertos)
              : null,
          numero_buzios_fechados:
            Number.isInteger(Number(numAbertos))
              ? 16 - Number(numAbertos)
              : null
        })
      }
    );

    const registro = await registroResponse.json();

    if (!registroResponse.ok) {
      console.error(
        'Erro ao registrar pergunta:',
        registro
      );

      return res.status(500).json({
        error: 'Não foi possível registrar a consulta.'
      });
    }

    perguntaId = registro?.[0]?.id;

    // =========================================================
    // 7. RESERVAR / CONSUMIR 1 CRÉDITO
    // =========================================================

    const creditoResponse = await fetch(
      `${supabaseUrl}/rest/v1/rpc/consumir_credito`,
      {
        method: 'POST',
        headers: supabaseHeaders,
        body: JSON.stringify({
          p_pedido_id: pedidoId
        })
      }
    );

    const novoSaldo = await creditoResponse.json();

    if (!creditoResponse.ok) {
      if (perguntaId) {
        await fetch(
          `${supabaseUrl}/rest/v1/perguntas_consulta?id=eq.${perguntaId}`,
          {
            method: 'PATCH',
            headers: supabaseHeaders,
            body: JSON.stringify({
              status: 'ERRO',
              erro_tecnico:
                'Não foi possível reservar crédito.'
            })
          }
        );
      }

      return res.status(403).json({
        error:
          'Não foi possível utilizar uma pergunta desta sessão.'
      });
    }

    creditoConsumido = true;

    // =========================================================
    // 8. PROMPT OPENAI
    // =========================================================

    const systemPrompt = `
Você é o intérprete digital do Oráculo Odara.

Seu papel é interpretar uma pergunta considerando a caída dos búzios e o Odù informado pelo sistema.

REGRAS:

- Responda em português do Brasil.
- Seja acolhedor, humano, direto e acessível.
- Não fale como psicólogo, médico ou sacerdote.
- Não invente fatos que não estejam nos dados recebidos.
- Não declare certezas absolutas sobre o futuro.
- Não faça diagnóstico médico.
- Não forneça números ou estratégias para apostas.
- Não determine Orixá de cabeça como verdade definitiva.
- Diferencie orientação simbólica de confirmação religiosa.
- Não use linguagem assustadora ou fatalista.
- Responda especificamente à pergunta apresentada.

ESTRUTURA:

✦ Interpretação da sua pergunta

Reconheça brevemente o contexto humano apresentado.

✦ O que a caída dos búzios apresenta

Explique o Odù sorteado e relacione-o diretamente ao assunto perguntado.

✦ Resposta objetiva

Diga claramente se o cenário parece favorável, desfavorável, cauteloso ou dependente de determinadas atitudes.

✦ Pontos de atenção

Explique o que merece cuidado.

✦ Orientação prática

Apresente uma orientação simples e aplicável.

Ao final, inclua:

⚠️ Aviso Importante: Esta consulta é uma orientação digital baseada em inteligência artificial e referências culturais sobre os Odùs. Para confirmações religiosas, rituais ou aprofundamentos, procure um Babalorixá ou Ialorixá de sua confiança.
`;

    const userPrompt = `
Nome do consulente:
${pedido.nome}

Pergunta:
${perguntaLimpa}

Contexto identificado:
${contexto}

Dados da caída:

Odù número:
${oduNumero}

Nome do Odù:
${oduNome}

Orixá associado:
${orixa}

Elemento:
${elemento}

Favorabilidade calculada:
${favorabilidade}%

Búzios abertos:
${numAbertos} de 16

Interprete esses dados exclusivamente dentro da pergunta apresentada.
`;

    // =========================================================
    // 9. CHAMAR OPENAI
    // =========================================================

    const aiResponse = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userPrompt
            }
          ],
          temperature: 0.5,
          max_tokens: 900
        })
      }
    );

    const aiData = await aiResponse.json();

    if (!aiResponse.ok) {
      throw new Error(
        aiData?.error?.message ||
        'Erro ao gerar leitura com a IA.'
      );
    }

    const texto =
      aiData?.choices?.[0]?.message?.content;

    if (!texto) {
      throw new Error(
        'A IA não retornou uma leitura válida.'
      );
    }

    // =========================================================
    // 10. MARCAR PERGUNTA COMO CONCLUÍDA
    // =========================================================

    if (perguntaId) {
      await fetch(
        `${supabaseUrl}/rest/v1/perguntas_consulta?id=eq.${perguntaId}`,
        {
          method: 'PATCH',
          headers: supabaseHeaders,
          body: JSON.stringify({
            resposta: texto,
            consumiu_credito: true,
            status: 'CONCLUIDA',
            modelo_ia: 'gpt-4o-mini',
            concluido_em:
              new Date().toISOString()
          })
        }
      );
    }

    return res.status(200).json({
      sucesso: true,
      bloqueado: false,
      contexto,
      consumirCredito: true,
      resposta: texto,
      perguntasRestantes: novoSaldo
    });

  } catch (error) {
    console.error(
      'Erro consultar.js:',
      error
    );

    // =========================================================
    // 11. ESTORNAR CRÉDITO EM CASO DE ERRO
    // =========================================================

    try {
      const pedidoId = req.body?.pedidoId;

      if (
        creditoConsumido &&
        pedidoId &&
        supabaseUrl &&
        supabaseKey
      ) {
        await fetch(
          `${supabaseUrl}/rest/v1/rpc/estornar_credito`,
          {
            method: 'POST',
            headers: supabaseHeaders,
            body: JSON.stringify({
              p_pedido_id: pedidoId
            })
          }
        );
      }

      if (perguntaId) {
        await fetch(
          `${supabaseUrl}/rest/v1/perguntas_consulta?id=eq.${perguntaId}`,
          {
            method: 'PATCH',
            headers: supabaseHeaders,
            body: JSON.stringify({
              status: 'ERRO',
              consumiu_credito: false,
              erro_tecnico:
                'Falha durante o processamento da leitura.'
            })
          }
        );
      }
    } catch (erroEstorno) {
      console.error(
        'Erro ao estornar crédito:',
        erroEstorno
      );
    }

    return res.status(500).json({
      error:
        'Não foi possível concluir a leitura. Seu crédito foi preservado.'
    });
  }
}
