export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { pergunta, area, oduRegente } = req.body;

  if (!pergunta) {
    return res.status(400).json({ error: 'A pergunta é obrigatória.' });
  }

  // Resposta simulada ou conectada com OpenAI/Groq API
  return res.status(200).json({
    sucesso: true,
    mensagem: "Consulta realizada com sucesso.",
    pergunta,
    area,
    odu: oduRegente || 6
  });
}
