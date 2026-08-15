export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { pergunta, oduRegente } = req.body;

  if (!pergunta) {
    return res.status(400).json({ error: 'A pergunta é obrigatória.' });
  }

  // Resposta estruturada e padronizada Serverless
  return res.status(200).json({
    sucesso: true,
    mensagem: "Consulta realizada com sucesso.",
    pergunta,
    odu: oduRegente || 6
  });
}
