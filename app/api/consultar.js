export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { nome, dataNascimento, pergunta, areaFoco, oduNascimento, qtdAbertos, nomeOdu } = req.body;

  const systemPrompt = `Você é um Sábio Babalorixá/Oráculo de Búzios com profundo conhecimento na tradição Nagô/Yorùbá.

Sua tarefa é interpretar a queda dos Búzios (${qtdAbertos} Abertos, ${16 - qtdAbertos} Fechados - Odù ${nomeOdu}) especificamente para a PERGUNTA do usuário e ÁREA DE FOCO escolhida.

DADOS DA CONSULTA:
- Nome do Usuário: ${nome || 'Consulente'}
- Data de Nascimento: ${dataNascimento || 'Não informada'}
- Odù Diretor/Nascimento: ${oduNascimento || 'Não informado'}
- Pergunta: "${pergunta}"
- Área de Foco: ${areaFoco}
- Queda da Mesa: ${qtdAbertos} búzios abertos (${nomeOdu})

INSTRUÇÕES RIGOROSAS:
Responda EXCLUSIVAMENTE em formato JSON VÁLIDO sem marcações markdown ao redor, contendo exatamente estas chaves:

{
  "resposta_direta": "SIM", "NÃO" ou "AINDA NÃO",
  "favorabilidade_porcentagem": 85, (número inteiro de 0 a 100),
  "favorabilidade_texto": "Muito Favorável", "Favorável", "Neutro/Atenção", "Desfavorável" ou "Caminhos Fechados Temporariamente",
  "o_que_os_buzios_revelam": "Escreva de 2 a 4 parágrafos profundos e solenes explicando o Odù ${nomeOdu} e a energia dessa queda ancestral.",
  "interpretacao_aplicada": "OBRIGATÓRIO: Conecte explicitamente a queda à pergunta '${pergunta}'. Cite detalhes da pergunta para demonstrar leitura 100% personalizada.",
  "influencias_espirituais": "Explicação dos Orixás regentes do Odù ${nomeOdu} e como atuam no momento do consulente.",
  "fatores_favoraveis": ["Ponto de luz 1", "Ponto de luz 2", "Ponto de luz 3"],
  "pontos_atencao": ["Alerta ou risco 1", "Alerta ou risco 2", "Alerta ou risco 3"],
  "orientacoes_praticas": "Ações práticas e comportamentos recomendados para os próximos dias.",
  "sabedoria_ancestral": "Um provérbio ou frase de sabedoria ancestral Yorùbá.",
  "resumo_final": "Um parágrafo de fechamento conectando a tendência ao próximo passo do consulente."
}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Realizar leitura para a pergunta: ${pergunta}` }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    const resultJson = JSON.parse(content.replace(/```json|```/g, ''));

    return res.status(200).json(resultJson);
  } catch (error) {
    console.error('Erro na consulta:', error);
    return res.status(500).json({ error: 'Erro ao consultar a sabedoria dos búzios.' });
  }
}
