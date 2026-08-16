// api/adicionar-creditos-teste.js
// =========================================================
// ORÁCULO ODARA
// RECARGA EXCLUSIVA PARA SESSÕES DE TESTE
//
// IMPORTANTE:
// Esta rota NÃO libera créditos para sessões pagas.
// Será usada somente durante os testes da plataforma.
// O pagamento real terá fluxo próprio posteriormente.
// =========================================================

export default async function handler(req, res) {

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


  if (req.method === 'OPTIONS') {

    return res
      .status(200)
      .end();
  }


  if (req.method !== 'POST') {

    return res
      .status(405)
      .json({
        sucesso: false,
        error: 'Método não permitido.'
      });
  }


  try {

    // =====================================================
    // 1. CONFIGURAÇÃO
    // =====================================================

    const supabaseUrl =
      process.env.SUPABASE_URL;

    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;


    if (
      !supabaseUrl ||
      !supabaseKey
    ) {

      return res
        .status(500)
        .json({
          sucesso: false,
          error: 'Configuração do Supabase não encontrada.'
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


    // =====================================================
    // 2. DADOS RECEBIDOS
    // =====================================================

    const pedidoId =
      req.body?.pedidoId;


    const quantidade =
      Number(
        req.body?.quantidade
      );


    if (!pedidoId) {

      return res
        .status(400)
        .json({
          sucesso: false,
          error: 'Sessão não informada.'
        });
    }


    /*
      Somente os pacotes de teste atualmente
      existentes na plataforma são aceitos.
    */

    if (
      ![5, 10].includes(
        quantidade
      )
    ) {

      return res
        .status(400)
        .json({
          sucesso: false,
          error: 'Quantidade de consultas inválida.'
        });
    }


    // =====================================================
    // 3. BUSCAR A SESSÃO
    // =====================================================

    const pedidoResponse =
      await fetch(

        `${supabaseUrl}/rest/v1/pedidos_consultas` +
        `?id=eq.${encodeURIComponent(pedidoId)}` +
        `&select=` +
        `id,` +
        `quantidade_contratada,` +
        `perguntas_restantes,` +
        `status_pagamento,` +
        `status_consulta` +
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

      console.error(
        'Erro Supabase:',
        pedidos
      );


      return res
        .status(500)
        .json({
          sucesso: false,
          error: 'Não foi possível consultar a sessão.'
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
          sucesso: false,
          error: 'Sessão não encontrada.'
        });
    }


    const pedido =
      pedidos[0];


    // =====================================================
    // 4. PROTEÇÃO CRÍTICA
    //
    // ESSA ROTA SÓ FUNCIONA EM SESSÃO TESTE.
    //
    // Uma sessão PAGA jamais poderá adicionar
    // crédito chamando esta URL.
    // =====================================================

    if (
      pedido.status_pagamento !==
      'TESTE'
    ) {

      return res
        .status(403)
        .json({
          sucesso: false,
          error:
            'Esta função está disponível somente para sessões de teste.'
        });
    }


    // =====================================================
    // 5. CALCULAR NOVOS SALDOS
    // =====================================================

    const contratadasAtuais =
      Number(
        pedido.quantidade_contratada || 0
      );


    const restantesAtuais =
      Number(
        pedido.perguntas_restantes || 0
      );


    const novaQuantidadeContratada =
      contratadasAtuais +
      quantidade;


    const novasPerguntasRestantes =
      restantesAtuais +
      quantidade;


    // =====================================================
    // 6. ATUALIZAR O SUPABASE
    // =====================================================

    const atualizarResponse =
      await fetch(

        `${supabaseUrl}/rest/v1/pedidos_consultas` +
        `?id=eq.${encodeURIComponent(pedidoId)}`,

        {
          method:
            'PATCH',

          headers: {
            ...supabaseHeaders,

            Prefer:
              'return=representation'
          },

          body:
            JSON.stringify({

              quantidade_contratada:
                novaQuantidadeContratada,

              perguntas_restantes:
                novasPerguntasRestantes,

              status_consulta:
                'EM_ANDAMENTO'

            })
        }
      );


    const atualizado =
      await atualizarResponse
        .json();


    if (
      !atualizarResponse.ok
    ) {

      console.error(
        'Erro ao adicionar créditos:',
        atualizado
      );


      return res
        .status(500)
        .json({
          sucesso: false,
          error:
            'Não foi possível adicionar consultas à sessão.'
        });
    }


    // =====================================================
    // 7. DEVOLVER O SALDO REAL
    // =====================================================

    return res
      .status(200)
      .json({

        sucesso:
          true,

        modo:
          'TESTE',

        quantidadeAdicionada:
          quantidade,

        quantidadeContratada:
          novaQuantidadeContratada,

        perguntasRestantes:
          novasPerguntasRestantes,

        mensagem:
          `${quantidade} consultas de teste foram adicionadas com sucesso.`

      });


  } catch (error) {

    console.error(
      'Erro adicionar-creditos-teste.js:',
      error
    );


    return res
      .status(500)
      .json({

        sucesso:
          false,

        error:
          'Erro ao adicionar consultas de teste.'

      });
  }
}
