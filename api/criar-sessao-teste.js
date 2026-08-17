// api/criar-sessao-teste.js
// =========================================================
// ORÁCULO ODARA
// NOVA SESSÃO DE TESTE
//
// REGRA:
// CADA NOVO PACOTE = NOVO pedidoId
//
// SUPORTA:
// 1. primeira sessão de teste, sem pedidoId anterior
// 2. novo pacote a partir de uma sessão de teste existente
//
// NÃO ALTERA:
// - consultas pagas
// - sessões comerciais
// - consumo de créditos
// =========================================================

import {
  randomUUID
} from 'node:crypto';


export default async function handler(
  req,
  res
) {

  // =======================================================
  // 1. CORS
  // =======================================================

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

        sucesso:
          false,

        error:
          'Método não permitido.'

      });
  }


  try {

    // =====================================================
    // 2. CONFIGURAÇÃO SUPABASE
    // =====================================================

    const supabaseUrl =
      process.env
        .SUPABASE_URL;


    const supabaseKey =
      process.env
        .SUPABASE_SERVICE_ROLE_KEY;


    if (
      !supabaseUrl ||
      !supabaseKey
    ) {

      return res
        .status(500)
        .json({

          sucesso:
            false,

          error:
            'Configuração do Supabase não encontrada.'

        });
    }


    const headers = {

      apikey:
        supabaseKey,

      Authorization:
        `Bearer ${supabaseKey}`,

      'Content-Type':
        'application/json'

    };


    // =====================================================
    // 3. DADOS RECEBIDOS
    // =====================================================

    const pedidoIdAtual =
      req.body?.pedidoIdAtual ||
      null;


    const quantidade =
      Number(
        req.body?.quantidade
      );


    if (
      ![5, 10].includes(
        quantidade
      )
    ) {

      return res
        .status(400)
        .json({

          sucesso:
            false,

          error:
            'Pacote inválido.'

        });
    }


    // =====================================================
    // 4. DADOS BASE DA NOVA SESSÃO
    // =====================================================

  let dadosSessaoBase = {

  nome:
    'Usuário de Teste',

  email:
    `teste.${randomUUID()}@example.com`,

  data_nascimento:
    null,

  odu_nascimento_id:
    null

};

    // =====================================================
    // 5. SE EXISTIR SESSÃO ANTERIOR,
    //    VALIDAR E COPIAR OS DADOS DELA
    // =====================================================

    if (
      pedidoIdAtual
    ) {

      const sessaoResponse =
        await fetch(

          `${supabaseUrl}/rest/v1/pedidos_consultas` +
          `?id=eq.${encodeURIComponent(pedidoIdAtual)}` +
          `&select=` +
          `id,` +
          `nome,` +
          `email,` +
          `data_nascimento,` +
          `odu_nascimento_id,` +
          `status_pagamento` +
          `&limit=1`,

          {
            headers
          }
        );


      const sessoes =
        await sessaoResponse
          .json();


      if (
        !sessaoResponse.ok
      ) {

        console.error(
          'Erro ao buscar sessão:',
          sessoes
        );


        return res
          .status(500)
          .json({

            sucesso:
              false,

            error:
              'Não foi possível consultar a sessão atual.'

          });
      }


      if (
        !Array.isArray(
          sessoes
        ) ||
        sessoes.length === 0
      ) {

        return res
          .status(404)
          .json({

            sucesso:
              false,

            error:
              'Sessão atual não encontrada.'

          });
      }


      const sessaoAtual =
        sessoes[0];


      // ---------------------------------------------------
      // PROTEÇÃO:
      // NÃO USAR ESTA ROTA PARA PEDIDOS PAGOS
      // ---------------------------------------------------

      if (
        sessaoAtual.status_pagamento !==
        'TESTE'
      ) {

        return res
          .status(403)
          .json({

            sucesso:
              false,

            error:
              'Esta função está disponível somente para sessões de teste.'

          });
      }


      dadosSessaoBase = {

  nome:
    sessaoAtual.nome ||
    'Usuário de Teste',

  email:
    sessaoAtual.email ||
    `teste.${randomUUID()}@example.com`,

  data_nascimento:
    sessaoAtual.data_nascimento ||
    null,

  odu_nascimento_id:
    sessaoAtual.odu_nascimento_id ||
    null

};
    }


    // =====================================================
    // 6. CRIAR NOVO PEDIDO
    // =====================================================

    const novoPedidoId =
      randomUUID();


    const pacoteEscolhido =
      quantidade === 10

        ? 'TESTE_10'

        : 'TESTE_5';


    const novoPedido = {

      id:
        novoPedidoId,

      nome:
        dadosSessaoBase.nome,

      email:
        dadosSessaoBase.email,

      data_nascimento:
        dadosSessaoBase.data_nascimento,

      odu_nascimento_id:
        dadosSessaoBase.odu_nascimento_id,

      pacote_escolhido:
        pacoteEscolhido,

      quantidade_contratada:
        quantidade,

      perguntas_restantes:
        quantidade,

      status_pagamento:
        'TESTE',

      status_consulta:
        'EM_ANDAMENTO',

      origem_liberacao:
        'TESTE_ADMIN'

    };


    // =====================================================
    // 7. CRIAR NO SUPABASE
    // =====================================================

    const criarResponse =
      await fetch(

        `${supabaseUrl}/rest/v1/pedidos_consultas`,

        {
          method:
            'POST',

          headers: {

            ...headers,

            Prefer:
              'return=representation'

          },

          body:
            JSON.stringify(
              novoPedido
            )
        }
      );


    const criado =
      await criarResponse
        .json();


    if (
      !criarResponse.ok
    ) {

      console.error(
        'Erro ao criar nova sessão:',
        criado
      );


      return res
        .status(500)
        .json({

          sucesso:
            false,

          error:
            'Não foi possível criar a nova sessão de teste.'

        });
    }


    // =====================================================
    // 8. RETORNO
    // =====================================================

    return res
      .status(200)
      .json({

        sucesso:
          true,

        modo:
          'TESTE',

        primeiraSessao:
          !pedidoIdAtual,

        pedidoId:
          novoPedidoId,

        pacoteEscolhido,

        quantidadeContratada:
          quantidade,

        perguntasRestantes:
          quantidade,

        mensagem:
          !pedidoIdAtual

            ? 'Sessão inicial de teste criada com sucesso.'

            : 'Nova sessão de teste criada com sucesso.'

      });


  } catch (
    error
  ) {

    console.error(
      'Erro criar-sessao-teste.js:',
      error
    );


    return res
      .status(500)
      .json({

        sucesso:
          false,

        error:
          'Erro ao criar nova sessão de teste.'

      });
  }
}
