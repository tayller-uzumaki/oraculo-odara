// api/sessao.js
// Retorna o estado atual de uma sessão de consulta no Supabase

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Método não permitido.'
    });
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        sucesso: false,
        error: 'Configuração do Supabase não encontrada.'
      });
    }

    const { pedidoId } = req.query;

    if (!pedidoId) {
      return res.status(400).json({
        sucesso: false,
        error: 'pedidoId não informado.'
      });
    }

    const resposta = await fetch(
      `${supabaseUrl}/rest/v1/pedidos_consultas?id=eq.${encodeURIComponent(pedidoId)}&select=id,nome,email,pacote_escolhido,quantidade_contratada,perguntas_restantes,status_pagamento,status_consulta&limit=1`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Accept: 'application/json'
        }
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      return res.status(resposta.status).json({
        sucesso: false,
        error: 'Não foi possível consultar a sessão.',
        detalhes: dados
      });
    }

    if (!dados || dados.length === 0) {
      return res.status(404).json({
        sucesso: false,
        error: 'Sessão não encontrada.'
      });
    }

    const sessao = dados[0];

    return res.status(200).json({
      sucesso: true,
      sessao: {
        id: sessao.id,
        nome: sessao.nome,
        email: sessao.email,
        pacoteEscolhido: sessao.pacote_escolhido,
        quantidadeContratada: sessao.quantidade_contratada,
        perguntasRestantes: sessao.perguntas_restantes,
        statusPagamento: sessao.status_pagamento,
        statusConsulta: sessao.status_consulta
      }
    });

  } catch (error) {
    console.error('Erro sessao.js:', error);

    return res.status(500).json({
      sucesso: false,
      error: 'Erro ao consultar a sessão.'
    });
  }
}
