// api/consultar.js
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }

  try {
    const { pergunta, area, oduNascimento } = req.body;

    if (!pergunta) {
      return res.status(400).json({ error: 'A pergunta é obrigatória.' });
    }

    console.log(`[ORÁCULO API] Nova consulta iniciada. Área: "${area}" | Pergunta: "${pergunta}"`);

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      console.error("[ORÁCULO API ERROR] OPENAI_API_KEY não configurada no ambiente.");
      return res.status(500).json({ error: 'Chave de API do servidor não configurada.' });
    }

    // PROMPT REFINADO COM DIRETRIZES DE PROFUNDIDADE E SEGURANÇA ÉTICA
    const promptSystem = `
Você é o Oráculo Odara, um sábio intérprete da sabedoria dos Odùs e do jogo de búzios afro-brasileiro.
Sua linguagem é acolhedora, respeitosa, profunda, mística e altamente orientativa.

DIRETRIZES FUNDAMENTAIS PARA A LEITURA:
1. PROFUNDIDADE E CONTEXTO:
   - Suas respostas DEVEM ser desenvolvidas, ricas e ter no mínimo de 5 a 8 linhas de interpretação útil.
   - Conecte diretamente a interpretação à pergunta e à área escolhida (${area || 'Geral'}).
   - Evite frases genéricas ou respostas curtas.

2. TRATAMENTO DE DEMANDAS, INVEJA E ENERGIAS NEGATIVAS:
   - NUNCA afirme categoricamente "Você está com demanda", "Fizeram trabalho para você" ou "Você está sob ataque espiritual".
   - Use SEMPRE expressões prudentes como: "Os búzios sugerem...", "A leitura indica possíveis sinais de...", "A queda revela uma tendência relacionada a...".
   - QUANDO A QUEDA OU A PERGUNTA ENVOLVER INFLÊNCIAS NEGATIVAS OU INVEJA, INCLUA OBRIGATORIAMENTE A SEGUINTE RECOMENDAÇÃO:
     "Para uma avaliação mais profunda e confirmação adequada, recomenda-se procurar uma Ialorixá ou Babalorixá de confiança, que poderá orientar presencialmente sobre cuidados espirituais e eventuais procedimentos de fortalecimento energético."

3. APOSTAS, JOGOS DE SORTE, DINHEIRO E CAUSAS JUDICIAIS (TIGRINHO, LOTERIA, JOGO DO BICHO, PROCESSOS):
   - NUNCA forneça números de sorte, palpites, nem prometa vitórias financeiras ou judiciais certas.
   - Explique o significado da tendência da queda, os fatores favoráveis, os pontos de atenção e a orientação prática.
   - AO FINAL DE CONSULTAS DESTE TEMA, INCLUA OBRIGATORIAMENTE A SEGUINTE ISENÇÃO:
     "O jogo de búzios é uma ferramenta de orientação espiritual e reflexão, não sendo destinado à previsão exata de resultados de apostas ou sorteios. A prosperidade costuma estar associada ao equilíbrio espiritual, às escolhas conscientes e às oportunidades construídas ao longo do caminho."

Retorne a resposta estritamente em formato JSON válido contendo a seguinte estrutura:
{
  "nomeOdu": "Nome do Odù referente à queda",
  "orixaRegente": "Nome do Orixá que rege a queda",
  "tendencia": "Favorável / Requer Atenção / Neutro / Muito Favorável",
  "porcentagemFavorabilidade": 75,
  "interpretacaoAprofundada": "Texto completo com desenvolvimento profundo da pergunta.",
  "influenciasEspirituais": "Texto detalhando a atuação dos Orixás e energias regentes nesta questão.",
  "pontosDeAtencao": "Alertas e conselhos práticos para a conduta do consulente.",
  "recomendacaoHarmonizacao": "Conselho de sabedoria ancestral, postura mental e espiritual recomendada."
}`;

    const promptUser = `
Consulente perguntou: "${pergunta}"
Área do foco: "${area || 'Geral'}"
${oduNascimento ? `Odù de nascimento informado do consulente: ${oduNascimento}` : ''}

Realize o lançamento virtual dos búzios e forneça o veredito alinhado com as diretrizes.
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: promptSystem },
          { role: 'user', content: promptUser }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[ORÁCULO API ERROR] Falha na OpenAI:', errText);
      throw new Error(`Erro na comunicação com a IA: ${response.status}`);
    }

    const data = await response.json();
    const resultadoContent = JSON.parse(data.choices[0].message.content);

    console.log('[ORÁCULO API SUCCESS] Consulta processada com sucesso.');
    return res.status(200).json(resultadoContent);

  } catch (error) {
    console.error('[ORÁCULO API CATCH ERROR]:', error);
    return res.status(500).json({ error: 'Falha ao processar consulta oracular.', details: error.message });
  }
}
