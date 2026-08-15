// api/consultar.js - Endpoint Backend para Interpretação dos Búzios com IA

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  try {
    const { pergunta, area, oduNumero, oduNome, orixa, elemento, favorabilidade, numAbertos } = req.body;

    if (!pergunta || typeof pergunta !== 'string') {
      return res.status(400).json({ error: 'Pergunta inválida.' });
    }

    const perguntaLower = pergunta.toLowerCase().trim();

    // ------------------------------------------------------------------
    // 1. FILTRO E BLOQUEIO DE SEGURANÇA HUMANA (RISCO EMOCIONAL / SAÚDE)
    // ------------------------------------------------------------------
    const TERMOS_RISCO_EMOCIONAL = [
      'suicidio', 'suicídio', 'me matar', 'tirar minha vida', 'cortei meu pulso',
      'automutilacao', 'automutilação', 'querer morrer', 'acabar com tudo'
    ];

    const TERMOS_SAUDE_GRAVE = [
      'cancer', 'câncer', 'vai morrer', 'quando vou morrer', 'data da morte',
      'doença terminal', 'diagnóstico médico', 'cirurgia vai dar certo'
    ];

    const temRiscoEmocional = TERMOS_RISCO_EMOCIONAL.some(t => perguntaLower.includes(t));
    if (temRiscoEmocional) {
      return res.status(422).json({
        bloqueado: true,
        tipo: 'RISCO_EMOCIONAL',
        mensagem: `🔮 **Aviso do Oráculo:** A espiritualidade preza, em primeiro lugar, pela vida e pelo seu bem-estar integrativo.\n\nSe você está passando por um momento de dor, ansiedade intensa ou sentimentos de desesperança, por favor, busque ajuda especializada imediatamente. O Centro de Valorização da Vida (CVV) realiza apoio emocional gratuito e confidencial 24 horas por dia.\n\n📞 **Ligue 188** ou acesse [cvv.org.br](https://www.cvv.org.br).\n\n*(Sua consulta não foi realizada e nenhum crédito foi consumido).*`
      });
    }

    const temRiscoSaude = TERMOS_SAUDE_GRAVE.some(t => perguntaLower.includes(t));
    if (temRiscoSaude) {
      return res.status(422).json({
        bloqueado: true,
        tipo: 'SAUDE',
        mensagem: `🔮 **Aviso do Oráculo:** Assuntos de saúde física, diagnósticos graves e previsão de morte não são objeto do jogo de búzios digital. Recomendamos que consulte sempre um médico ou profissional de saúde qualificado.\n\n*(Sua consulta não foi realizada e nenhum crédito foi consumido).*`
      });
    }

    // ------------------------------------------------------------------
    // 2. FILTRO EXPANDIDO DE APOSTAS E LOTERIAS
    // ------------------------------------------------------------------
    const TERMOS_APOSTAS_LOTERIA = [
      'mega sena', 'megasena', 'numeros da mega', 'números da mega', 'palpite',
      'quina', 'lotofacil', 'lotofácil', 'jogo do bicho', 'aposta', 'apostas',
      'loteria', 'tiger', 'tigrinho', 'bet', 'roleta', 'cassino'
    ];

    const temAposta = TERMOS_APOSTAS_LOTERIA.some(t => perguntaLower.includes(t));
    if (temAposta) {
      return res.status(422).json({
        bloqueado: true,
        tipo: 'LOTERIA',
        mensagem: `🔮 **Consulta Não Realizada:** O jogo sagrado de búzios e os Orixás não indicam números de sorte, palpites para apostas, jogos de azar ou loterias. A sabedoria dos Odùs existe para orientar a vida, a evolução pessoal e o caminho espiritual.\n\n*(Seu saldo de consultas foi preservado e nenhum crédito foi consumido).*`
      });
    }

    // ------------------------------------------------------------------
    // 3. DETECÇÃO SEMÂNTICA DA INTENÇÃO DA PERGUNTA
    // ------------------------------------------------------------------
    const TERMOS_ORIXA_CABECA = [
      'qual meu orixá', 'qual meu orixa', 'quem é meu orixá', 'quem é meu orixa',
      'meu pai de cabeça', 'minha mãe de cabeça', 'pai de cabeça', 'mãe de cabeça',
      'orixá de cabeça', 'orixa de cabeça', 'quem rege minha vida', 'orixá regente'
    ];

    const TERMOS_PERGUNTA_NEGATIVA = [
      'traição', 'traiçao', 'traindo', 'esta me traindo', 'está me traindo',
      'feitiço', 'feitico', 'demanda', 'estou com demanda', 'macumba',
      'inveja', 'perder o emprego', 'demissão', 'demissao', 'fui roubado'
    ];

    const ehPerguntaOrixa = TERMOS_ORIXA_CABECA.some(t => perguntaLower.includes(t));
    const ehPerguntaNegativa = TERMOS_PERGUNTA_NEGATIVA.some(t => perguntaLower.includes(t));

    // ------------------------------------------------------------------
    // 4. CONSTRUÇÃO DO SYSTEM PROMPT (PERSONA & REGRAS ESTRITAS)
    // ------------------------------------------------------------------
    const systemPrompt = `
Você é o intérprete de Inteligência Artificial do "Oráculo Odara", um jogo de búzios espiritual moderno e acessível.

### PERSONA E TOM DE VOZ
- **Público-Alvo:** Jovens e adolescentes que buscam orientação espiritual e desejam aprender mais sobre a cultura dos Orixás e religiões de matriz africana.
- **Tom e Estilo:** Linguagem jovem, acolhedora, leve, direta, empática e moderna.
- **PROIBIDO:** Usar termos arcaicos, juridiquês ou formalidades engessadas (como "a tendência é parcialmente favorável com ressalvas").
- **Caráter Didático/Pedagógico:** Explique sempre o que cada Orixá e Odù representam de forma simples, clara e sem complicação.

---

### ESTRUTURA OBRIGATÓRIA DA RESPOSTA (Siga estritamente esta formatação de 4 blocos):

1. **✦ Interpretação Direta:**
   Resposta categórica, transparente e direta à dúvida trazida (em 3 a 4 frases simples). Vá direto ao ponto!

2. **✦ Atuação dos Orixás:**
   Explique quem são os Orixás associados à queda do Odù do momento (${orixa}) e como essa energia específica atua e movimenta a vida do consulente agora.

3. **✦ Pontos de Atenção e Alertas:**
   Mencione claramente o que a pessoa precisa evitar, vigiar, tomar cuidado ou não fazer neste momento.

4. **✦ Orientação Prática & Harmonização:**
   Conselho prático, equilibrado e acionável sobre postura, reflexão ou atitudes do dia a dia para harmonizar as energias.

Ao final dos 4 blocos, adicione OBRIGATORIAMENTE este disclaimer exato:
> ⚠️ *Aviso Importante: Esta consulta é uma orientação digital baseada em inteligência artificial. Para aprofundamentos, rituais, confirmações de Orixá e assentamentos, procure uma casa de Candomblé ou um Babalorixá / Ialorixá de sua confiança.*

---

### REGRAS SEMÂNTICAS ESPECÍFICAS

${ehPerguntaOrixa ? `
A pergunta do usuário é sobre Orixá de Cabeça / Regente.
VOCÊ DEVE UTILIZAR ESTA ESTRUTURA EXACTA PARA A RESPOSTA:

**Seus Orixás no Seu Momento Atual:**
✦ **Seu Pai do Momento:** [Nome do Orixá principal da queda] ([Sua representação simples, ex: força, justiça, caminhos])
✦ **Sua Mãe do Momento:** [Nome do Orixá complementar ou de água/acolhimento associado ao Odù] ([Sua representação simples, ex: amor, maturação, acolhimento])
✦ **Força de Apoio (Juntó):** [Nome de um Orixá de suporte] ([Sua qualidade principal])

**Entendendo a energia deles na sua vida:**
No jogo de búzios digital, os Orixás que aparecem mostram a energia que está te guiando e influenciando agora. [Explicação didática de como agir com base neles].

✦ **Pontos de Atenção:** [O que evitar]
✦ **Orientação Prática:** [Ação prática de harmonização]
*(Nota: A confirmação definitiva do seu Orixá de nascimento/Eledá é feita presencialmente em um terreiro por um Babalorixá ou Ialorixá).*

⚠️ *Aviso Importante: Esta consulta é uma orientação digital baseada em inteligência artificial. Para aprofundamentos, rituais, confirmações de Orixá e assentamentos, procure uma casa de Candomblé ou um Babalorixá / Ialorixá de sua confiança.*
` : ''}

${ehPerguntaNegativa ? `
A pergunta do usuário traz uma dúvida sobre algo negativo (traição, feitiço/demanda, perda, demissão).
- **Se o Odù for Próspero/Positivo (Favorabilidade alta):** Diga diretamente que NÃO indica o mal temido! Exemplo: "Não indica traição." ou "Não há demanda pesada te parando. O caminho está limpo."
- **Se o Odù for Desfavorável/Alerta (Favorabilidade baixa):** Indique cautela de forma acolhedora: "O momento pede atenção e cuidado com quem você compartilha seus planos." (NUNCA use tom fatalista ou assustador).
` : ''}
    `;

    const userPrompt = `
DADOS DA CONSULTA:
- Pergunta do Consulente: "${pergunta}"
- Área de Foco: ${area}
- Odù Sorteado: Odù nº ${oduNumero} - ${oduNome}
- Orixá Regente da Queda: ${orixa}
- Elemento: ${elemento}
- Nível de Favorabilidade: ${favorabilidade}%
- Queda dos Búzios: ${numAbertos} abertos e ${16 - numAbertos} fechados.

Gere a resposta perfeita seguindo rigorosamente a persona jovem/didática e a estrutura pedida.
    `;

    // Chamada à API da Gemini ou provedor LLM configurado no ambiente
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Modos de fallback estruturado caso a chave de API não esteja configurada no ambiente local
      let respostaFallback = "";

      if (ehPerguntaOrixa) {
        respostaFallback = `
**Seus Orixás no Seu Momento Atual:**
✦ **Seu Pai do Momento:** ${orixa} (Proteção, coragem e abertura de caminhos)
✦ **Sua Mãe do Momento:** Yemanjá (Acolhimento, equilíbrio emocional e paz)
✦ **Força de Apoio (Juntó):** Oxóssi (Foco, sabedoria e fartura de ideias)

**Entendendo a energia deles na sua vida:**
No jogo de búzios digital, os Orixás que aparecem mostram a energia que está te guiando e influenciando agora no Odù ${oduNome}. Eles estão te chamando para alinhar seus pensamentos e agir com confiança na sua caminhada.

✦ **Pontos de Atenção:** Evite a ansiedade de querer respostas imediatas e não compartilhe seus projetos com pessoas pessimistas.
✦ **Orientação Prática:** Reserve alguns minutos do dia para relaxar, conectar-se com a natureza e manter pensamentos elevados.
*(Nota: A confirmação definitiva do seu Orixá de nascimento/Eledá é feita presencialmente em um terreiro por um Babalorixá ou Ialorixá).*

⚠️ *Aviso Importante: Esta consulta é uma orientação digital baseada em inteligência artificial. Para aprofundamentos, rituais, confirmações de Orixá e assentamentos, procure uma casa de Candomblé ou um Babalorixá / Ialorixá de sua confiança.*
        `;
      } else {
        respostaFallback = `
✦ **Interpretação Direta:**
${favorabilidade >= 60 
  ? `Para a sua pergunta sobre ${area.toLowerCase()}, os búzios mostram um cenário muito positivo e iluminado. A energia está a seu favor para seguir em frente sem medos!` 
  : `Para a sua dúvida sobre ${area.toLowerCase()}, os búzios pedem um pouco mais de calma e observação. Não é hora de forçar situações, mas sim de ajustar o rumo.`}

✦ **Atuação dos Orixás:**
A queda traz a vibração direta de **${orixa}** sob o elemento **${elemento}** no Odù ${oduNome}. Esse Orixá atua trazendo clareza e removendo a névoa das suas incertezas para que você enxergue suas reais oportunidades.

✦ **Pontos de Atenção e Alertas:**
Fique atento a reações impulsivas e conversas mal esclarecidas. Guarde seus planos em segredo até que estejam 100% concretizados.

✦ **Orientação Prática & Harmonização:**
Mantenha a mente firme e tome decisões baseadas na sua intuição. Faça uma pausa reflexiva e cuide da sua energia pessoal hoje.

⚠️ *Aviso Importante: Esta consulta é uma orientação digital baseada em inteligência artificial. Para aprofundamentos, rituais, confirmações de Orixá e assentamentos, procure uma casa de Candomblé ou um Babalorixá / Ialorixá de sua confiança.*
        `;
      }

      return res.status(200).json({ resposta: respostaFallback.trim() });
    }

    // Requisição para a API da Gemini (Google AI)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 900
        }
      })
    });

    const data = await response.json();
    const textoResposta = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textoResposta) {
      throw new Error("Resposta inválida da IA.");
    }

    return res.status(200).json({ resposta: textoResposta });

  } catch (error) {
    console.error('Erro na API de consulta:', error);
    return res.status(500).json({ error: 'Falha ao processar a leitura espiritual. Tente novamente em instantes.' });
  }
}
