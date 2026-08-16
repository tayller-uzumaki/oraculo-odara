// api/criar-sessao-teste.js

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido'
    });
  }

  const { pacote, email } = req.body;

  if (!pacote || !email) {
    return res.status(400).json({
      error: 'Pacote e e-mail são obrigatórios.'
    });
  }

  // Simulação temporária de criação de sessão
  const sessaoId = 'sessao_' + Date.now();

  return res.status(200).json({
    sucesso: true,
    sessaoId,
    email,
    pacote,
    creditos:
      pacote === 5
        ? 5
        : pacote === 10
        ? 10
        : 0,
    message: 'Sessão de teste criada com sucesso.'
  });
}
