export default async function handler(req, res) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        sucesso: false,
        erro: "OPENAI_API_KEY não encontrada na Vercel."
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Você é um assistente do Oráculo Odara."
            },
            {
              role: "user",
              content: "Responda somente: Conexão com OpenAI funcionando."
            }
          ],
          max_tokens: 30
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        sucesso: false,
        erro: "Erro ao conectar com a OpenAI.",
        detalhes: data?.error?.message || data
      });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: "Vercel conectada à OpenAI com sucesso.",
      resposta: data?.choices?.[0]?.message?.content
    });

  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
}
