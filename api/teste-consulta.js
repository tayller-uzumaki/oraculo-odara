export default async function handler(req, res) {
  try {
    const host = req.headers.host;
    const protocolo =
      host && host.includes('localhost')
        ? 'http'
        : 'https';

    const url = `${protocolo}://${host}/api/consultar`;

    const resposta = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pedidoId: '3518ac2a-7f6e-4897-9802-672360f5cbbd',

        pergunta:
          'Como estão meus caminhos profissionais neste momento?',

        oduNumero: 6,
        oduNome: 'Obará',
        orixa: 'Xangô / Oxóssi',
        elemento: 'Ar / Terra',
        favorabilidade: 80,
        numAbertos: 6
      })
    });

    const dados = await resposta.json();

    return res.status(resposta.status).json({
      teste: 'CONSULTA_COMPLETA',
      statusHttp: resposta.status,
      resultado: dados
    });

  } catch (erro) {
    return res.status(500).json({
      teste: 'CONSULTA_COMPLETA',
      sucesso: false,
      erro: erro.message
    });
  }
}
