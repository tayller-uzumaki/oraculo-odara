export default async function handler(req, res) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        sucesso: false,
        erro: "Variáveis do Supabase não encontradas na Vercel."
      });
    }

    const resposta = await fetch(
      `${supabaseUrl}/rest/v1/pedidos_consultas?select=id,nome,quantidade_contratada,perguntas_restantes,status_pagamento,status_consulta&limit=1`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Accept: "application/json"
        }
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      return res.status(resposta.status).json({
        sucesso: false,
        erro: "Não foi possível consultar o Supabase.",
        detalhes: dados
      });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: "Vercel conectada ao Supabase com sucesso.",
      dados
    });

  } catch (erro) {
    return res.status(500).json({
      sucesso: false,
      erro: erro.message
    });
  }
}
