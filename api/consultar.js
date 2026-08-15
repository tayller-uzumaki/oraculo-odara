// api/consultar.js - Endpoint Backend Serverless

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido.'
    });
  }

  try {
    const {
      pergunta,
      oduNumero,
      oduNome,
      orixa,
      elemento,
      favorabilidade,
      numAbertos
    } = req.body;

    if (
      !pergunta ||
      typeof pergunta !== 'string' ||
      pergunta.trim().length < 3
    ) {
      return res.status(400).json({
        error: 'Pergunta inválida.'
      });
    }

    const perguntaLimpa = pergunta.trim();
    const perguntaLower = perguntaLimpa.toLowerCase();

    // =========================================================
    // 1. SEGURANÇA
    // =========================================================

    const TERMOS_RISCO_EMOCIONAL = [
      'suicidio',
      'suicídio',
      'me matar',
      'tirar minha vida',
      'automutilacao',
      'automutilação',
      'quero morrer',
      'não quero mais viver',
      'nao quero mais viver'
    ];

    if (
      TERMOS_RISCO_EMOCIONAL.some(
        termo => perguntaLower.includes(termo)
      )
    ) {
      return res.status(200).json({
        bloqueado: true,
        tipoBloqueio: 'RISCO_EMOCIONAL',
        consumirCredito: false,
        mensagem:
          'Essa pergunta indica um momento que precisa de apoio humano, e não de uma leitura oracular. Procure alguém de confiança e apoio profissional. No Brasil, o CVV atende gratuitamente pelo 188. Sua consulta não foi realizada e nenhum crédito foi consumido.'
      });
    }

    const TERMOS_MORTE = [
      'quando vou morrer',
      'data da morte',
      'dia da minha morte',
      'como vou morrer'
    ];

    if (
      TERMOS_MORTE.some(
        termo => perguntaLower.includes(termo)
      )
    ) {
      return res.status(200).json({
        bloqueado: true,
        tipoBloqueio: 'PREVISAO_MORTE',
        consumirCredito: false,
        mensagem:
          'O Oráculo não realiza previsões sobre data ou circunstâncias de morte. A consulta não foi realizada e seu saldo foi preservado.'
      });
    }

    const TERMOS_APOSTAS = [
      'mega sena',
      'megasena',
      'numeros da mega',
      'números da mega',
      'quina',
      'lotofacil',
      'lotofácil',
      'jogo do bicho',
      'aposta',
      'apostas',
      'loteria',
      'tiger',
      'tigrinho',
      'bet',
      'roleta'
    ];

    if (
      TERMOS_APOSTAS.some(
        termo => perguntaLower.includes(termo)
      )
    ) {
      return res.status(200).json({
        bloqueado: true,
        tipoBloqueio: 'APOSTAS',
        consumirCredito: false,
        mensagem:
          'O Oráculo não fornece números, combinações, garantias ou palpites destinados a apostas e jogos de azar. Reformule sua pergunta para uma orientação sobre seus caminhos financeiros ou decisões pessoais. Seu saldo foi preservado.'
      });
    }

    // =========================================================
    // 2. CLASSIFICAÇÃO BÁSICA
    // =========================================================

    let contexto = 'Geral';

    if (
      /amor|relacionamento|namoro|namorada|namorado|casamento|ex|voltar|traição|traicao/i.test(
        perguntaLimpa
      )
    ) {
      contexto = 'Amor e Relacionamentos';
    } else if (
      /trabalho|emprego|vaga|carreira|empresa|chefe|promoção|promocao|entrevista|negócio|negocio/i.test(
        perguntaLimpa
      )
    ) {
      contexto = 'Trabalho e Carreira';
    } else if (
      /dinheiro|financeiro|finanças|financas|dívida|divida|investimento|comprar|vender/i.test(
        perguntaLimpa
      )
    ) {
      contexto = 'Finanças';
    } else if (
      /orixá|orixa|pai de cabeça|mãe de cabeça|eledá|eleda|juntó|junto/i.test(
        perguntaLimpa
      )
    ) {
      contexto = 'Orixás';
    } else if (
      /espiritual|proteção|protecao|inveja|demanda|energia|axé|axe/i.test(
        perguntaLimpa
      )
    ) {
      contexto = 'Espiritualidade';
    }

    // =========================================================
    // 3. OPENAI
    // =========================================================

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'OPENAI_API_KEY não encontrada na Vercel.'
      });
    }

    const systemPrompt = `
Você é o intérprete digital do Oráculo Odara.

Seu papel é interpretar uma pergunta considerando a caída dos búzios e o Odù informado pelo sistema.

REGRAS:

- Responda em português do Brasil.
- Seja acolhedor, humano, direto e acessível.
- Não fale como psicólogo, médico ou sacerdote.
- Não invente fatos que não estejam nos dados recebidos.
- Não declare certezas absolutas sobre o futuro.
- Não faça diagnóstico médico.
- Não forneça números ou estratégias para apostas.
- Não determine Orixá de cabeça como verdade definitiva.
- Diferencie orientação simbólica de confirmação religiosa.
- Não use linguagem assustadora ou fatalista.
- Responda de forma específica à pergunta apresentada.

ESTRUTURA:

✦ Interpretação da sua pergunta

Primeiro reconheça brevemente o contexto humano presente na pergunta.

✦ O que a caída dos búzios apresenta

Explique o Odù sorteado e relacione-o diretamente ao assunto perguntado.

✦ Resposta objetiva

Diga claramente se o cenário apresentado pela leitura parece favorável, desfavorável, cauteloso ou dependente de determinadas atitudes.

✦ Pontos de atenção

Explique o que merece cuidado.

✦ Orientação prática

Apresente uma orientação simples e aplicável.

Ao final, inclua:

⚠️ Aviso Importante: Esta consulta é uma orientação digital baseada em inteligência artificial e referências culturais sobre os Odùs. Para confirmações religiosas, rituais ou aprofundamentos, procure um Babalorixá ou Ialorixá de sua confiança.
`;

    const userPrompt = `
Pergunta:
${perguntaLimpa}

Contexto identificado:
${contexto}

Dados da caída:

Odù número:
${oduNumero}

Nome do Odù:
${oduNome}

Orixá associado:
${orixa}

Elemento:
${elemento}

Favorabilidade calculada:
${favorabilidade}%

Búzios abertos:
${numAbertos} de 16

Interprete esses dados exclusivamente dentro da pergunta apresentada.
`;

    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userPrompt
            }
          ],
          temperature: 0.5,
          max_tokens: 900
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro OpenAI:', data);

      return res.status(502).json({
        error: 'Não foi possível gerar a leitura.',
        detalhes: data?.error?.message || 'Erro desconhecido.'
      });
    }

    const texto =
      data?.choices?.[0]?.message?.content;

    if (!texto) {
      return res.status(502).json({
        error: 'A IA não retornou uma leitura válida.'
      });
    }

    return res.status(200).json({
      sucesso: true,
      bloqueado: false,
      contexto,
      consumirCredito: true,
      resposta: texto
    });

  } catch (error) {
    console.error('Erro consultar.js:', error);

    return res.status(500).json({
      error: 'Erro ao processar consulta.'
    });
  }
}
