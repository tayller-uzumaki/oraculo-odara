// api/consultar.js - Endpoint Backend Serverless

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });

  try {
    const { pergunta, oduNumero, oduNome, orixa, elemento, favorabilidade, numAbertos } = req.body;

    if (!pergunta || typeof pergunta !== 'string') {
      return res.status(400).json({ error: 'Pergunta inválida.' });
    }

    const perguntaLower = pergunta.toLowerCase().trim();

    // 1. FILTRO DE SEGURANÇA HUMANA (SUICÍDIO / SAÚDE GRAVE)
    const TERMOS_RISCO_EMOCIONAL = [
      'suicidio', 'suicídio', 'me matar', 'tirar minha vida', 'automutilacao', 'automutilação'
    ];
    const TERMOS_SAUDE_GRAVE = [
      'cancer', 'câncer', 'vai morrer', 'quando vou morrer', 'data da morte', 'doença terminal'
    ];

    if (TERMOS_RISCO_EMOCIONAL.some(t => perguntaLower.includes(t))) {
      return res.status(422).json({
        bloqueado: true,
        mensagem: `🔮 **Aviso do Oráculo:** A espiritualidade valoriza a vida e seu bem-estar.\n\nSe você está passando por um momento difícil, busque ajuda especializada no Centro de Valorização da Vida (CVV) ligando para **188** ou acessando [cvv.org.br](https://www.cvv.org.br).\n\n*(Sua consulta não foi realizada e nenhum crédito foi consumido).*`
      });
    }

    if (TERMOS_SAUDE_GRAVE.some(t => perguntaLower.includes(t))) {
      return res.status(422).json({
        bloqueado: true,
        mensagem: `🔮 **Aviso do Oráculo:** Assuntos de saúde grave e previsões de morte não são objeto do jogo de búzios digital. Procure sempre orientação médica qualificada.\n\n*(Seu saldo não foi consumido).*`
      });
    }

    // 2. FILTRO DE APOSTAS / LOTERIAS
    const TERMOS_APOSTAS = [
      'mega sena', 'megasena', 'numeros da mega', 'palpite', 'quina', 'lotofacil',
      'jogo do bicho', 'aposta', 'apostas', 'loteria', 'tiger', 'tigrinho', 'bet', 'roleta'
    ];

    if (TERMOS_APOSTAS.some(t => perguntaLower.includes(t))) {
      return res.status(422).json({
        bloqueado: true,
        mensagem: `🔮 **Consulta Não Realizada:** Os búzios e os Orixás não indicam números de sorte ou palpites para loterias e apostas.\n\n*(Seu saldo foi preservado).*`
      });
    }

    // 3. DETECÇÃO SEMÂNTICA
    const TERMOS_ORIXA = ['qual meu orixá', 'qual meu orixa', 'quem é meu orixá', 'pai de cabeça', 'mãe de cabeça'];
    const TERMOS_NEGATIVOS = ['traição', 'traiçao', 'traindo', 'feitiço', 'macumba', 'inveja', 'demanda'];

    const ehPerguntaOrixa = TERMOS_ORIXA.some(t => perguntaLower.includes(t));
    const ehPerguntaNegativa = TERMOS_NEGATIVOS.some(t => perguntaLower.includes(t));

    // 4. SYSTEM PROMPT
    const systemPrompt = `
Você é o intérprete de Inteligência Artificial do "Oráculo Odara".

### PERSONA E TOM DE VOZ
- **Público-Alvo:** Jovens e leitores buscando orientação espiritual acessível sobre a cultura dos Orixás.
- **Tom:** Jovem, acolhedor, leve, direto, empático e cristalino.
- **PROIBIDO:** Usar termos arcaicos ou formalidades jurídicas ("tendência parcialmente favorável").
- Explique tudo de forma muito simples e pedagógica.

---

### ESTRUTURA OBRIGATÓRIA DA RESPOSTA (Siga rigorosamente estes 4 blocos):

1. **✦ Interpretação Direta:**
   Resposta curta, clara e direta à dúvida do consulente (3 a 4 frases simples). Vá direto ao ponto!

2. **✦ Atuação dos Orixás:**
   Explique quem são os Orixás associados ao Odù sorteado (${orixa}) e como essa energia atua na vida da pessoa agora.

3. **✦ Pontos de Atenção e Alertas:**
   Mencione claramente o que evitar, vigiar ou tomar cuidado no momento.

4. **✦ Orientação Prática & Harmonização:**
   Conselho prático e acionável para o dia a dia.

Ao final dos 4 blocos, inclua EXATAMENTE este aviso:
> ⚠️ *Aviso Importante: Esta consulta é uma orientação digital baseada em inteligência artificial. Para aprofundamentos, rituais, confirmações de Orixá e assentamentos, procure uma casa de Candomblé ou um Babalorixá / Ialorixá de sua confiança.*

${ehPerguntaOrixa ? `
A pergunta é sobre Orixá de Cabeça. Use esta estrutura exata:
**Seus Orixás no Seu Momento Atual:**
✦ **Seu Pai do Momento:** [Nome do Orixá principal] ([Qualidade simples])
✦ **Sua Mãe do Momento:** [Nome do Orixá secundário/água] ([Qualidade simples])
✦ **Força de Apoio (Juntó):** [Nome do Orixá de apoio] ([Qualidade])

**Entendendo a energia deles na sua vida:** [Explicação simples do momento atual]

✦ **Pontos de Atenção:** [O que evitar]
✦ **Orientação Prática:** [Ação prática]
*(Nota: A confirmação definitiva do seu Orixá de nascimento/Eledá é feita presencialmente em um terreiro por um Babalorixá ou Ialorixá).*
⚠️ *Aviso Importante: Esta consulta é uma orientação digital baseada em inteligência artificial. Para aprofundamentos, rituais, confirmações de Orixá e assentamentos, procure uma casa de Candomblé ou um Babalorixá / Ialorixá de sua confiança.*
` : ''}

${ehPerguntaNegativa ? `
A pergunta envolve algo negativo (traição, inveja, feitiço).
- Se a favorabilidade do Odù for alta (>=50%): Diga diretamente que NÃO indica a traição/mal temido ("Não indica traição", "Os caminhos não mostram demanda te parando").
- Se for baixa (<50%): Recomende cautela sem ser fatalista ou assustador ("O momento pede resguardo e cuidado ao compartilhar planos").
` : ''}
    `;

    const userPrompt = `
DADOS DA CONSULTA:
- Pergunta: "${pergunta}"
- Odù Sorteado: Odù nº ${oduNumero} - ${oduNome}
- Orixá Regente: ${orixa}
- Elemento: ${elemento}
- Favorabilidade: ${favorabilidade}%
- Búzios Abertos: ${numAbertos} de 16.
    `;

    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      const fallback = `
✦ **Interpretação Direta:**
${favorabilidade >= 50 
  ? `Para a sua dúvida, os búzios se mostram abertos e favoráveis. Não há motivos para insegurança; a energia atual favorece seus passos!` 
  : `Para a sua dúvida, os búzios pedem calma e observação. Não force as coisas agora, prefira escutar sua intuição.`}

✦ **Atuação dos Orixás:**
A queda traz a regência de **${orixa}** no Odù ${oduNome}. Esse Orixá atua trazendo clareza e abrindo seus caminhos para superar incertezas.

✦ **Pontos de Atenção e Alertas:**
Evite agir por impulso ou se desgastar com conversas desnecessárias. Guarde seus projetos até que estejam firmes.

✦ **Orientação Prática & Harmonização:**
Mantenha a mente serena e tome atitudes com confiança no seu próprio valor.

> ⚠️ *Aviso Importante: Esta consulta é uma orientação digital baseada em inteligência artificial. Para aprofundamentos, rituais, confirmações de Orixá e assentamentos, procure uma casa de Candomblé ou um Babalorixá / Ialorixá de sua confiança.*
      `;
      return res.status(200).json({ resposta: fallback.trim() });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
      })
    });

    const data = await response.json();
    const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({ resposta: texto || "Não foi possível gerar a leitura no momento." });

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao processar consulta.' });
  }
}
