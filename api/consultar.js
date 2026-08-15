export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { pergunta, oduRegente } = req.body;

  if (!pergunta) {
    return res.status(400).json({ error: 'A pergunta é obrigatória.' });
  }

  const perguntaTexto = pergunta.toLowerCase();

  // 1. REGRAS DE BLOQUEIO E REDIRECIONAMENTO IMEDIATO
  // 1.1 Risco Emocional Severo / Suicídio / Automutilação
  const gatilhosSuicidio = ['me matar', 'quer morrer', 'quero morrer', 'desaparecer', 'nao aguento mais', 'não aguento mais', 'suicidio', 'suicídio', 'tirar minha vida'];
  if (gatilhosSuicidio.some(g => perguntaTexto.includes(g))) {
    return res.status(200).json({
      bloqueado: true,
      tipoBloqueio: 'RISCO_EMOCIONAL',
      mensagem: "Percebo que você está passando por um momento de dor intensa. O jogo de búzios não é o recurso adequado para este momento. Por favor, busque ajuda profissional. Ligue gratuitamente para o CVV no número 188 (disponível 24h) ou procure um serviço de emergência e alguém de sua confiança."
    });
  }

  // 1.2 Loterias e Jogos de Azar
  const gatilhosLoterias = ['mega-sena', 'megasena', 'jogo do bicho', 'quina', 'lotofacil', 'lotofácil', 'numeros da sorte', 'números da sorte', 'loteria', 'aposta'];
  if (gatilhosLoterias.some(g => perguntaTexto.includes(g))) {
    return res.status(200).json({
      bloqueado: true,
      tipoBloqueio: 'LOTERIA',
      mensagem: "A plataforma do Oráculo Odara se destina estritamente à orientação espiritual, reflexão e autoconhecimento. Não fornecemos números, combinações ou palpites para apostas e jogos de azar."
    });
  }

  // 1.3 Saúde Física e Diagnósticos
  const gatilhosSaude = ['estou doente', 'qual minha doença', 'vence o cancer', 'vence o câncer', 'vou me curar', 'diagnostico medico', 'cura de'];
  if (gatilhosSaude.some(g => perguntaTexto.includes(g))) {
    return res.status(200).json({
      bloqueado: true,
      tipoBloqueio: 'SAUDE',
      mensagem: "O oráculo oferece caminhos e acolhimento espiritual, mas não realiza diagnósticos médicos nem promete curas físicas. Para questões de saúde, consulte sempre médicos e profissionais qualificados."
    });
  }

  // 1.4 Previsão de Morte
  const gatilhosMorte = ['quando vou morrer', 'vai morrer', 'dia da minha morte', 'morte de'];
  if (gatilhosMorte.some(g => perguntaTexto.includes(g))) {
    return res.status(200).json({
      bloqueado: true,
      tipoBloqueio: 'PREVISAO_MORTE',
      mensagem: "O Oráculo não realiza previsões relativas à data ou circunstâncias de morte. Nossos caminhos são focados na valorização da vida, nas escolhas do presente e no equilíbrio espiritual."
    });
  }

  // 2. CLASSIFICAÇÃO SEMÂNTICA CONTEXTUAL
  let contexto = "Geral e Orientação de Vida";
  if (/amor|namorada|namorado|casamento|traicao|traição|voltar|relacionamento|ex|parceiro/i.test(perguntaTexto)) {
    contexto = "Amor e Relacionamentos";
  } else if (/trabalho|emprego|vaga|carreira|empresa|promocao|promoção|chefe|negocio|negócio|projeto/i.test(perguntaTexto)) {
    contexto = "Trabalho, Carreira e Tomada de Decisão";
  } else if (/dinheiro|financas|finanças|divida|dívida|investimento|comprar|vender|bens/i.test(perguntaTexto)) {
    contexto = "Prosperidade Financeira e Material";
  } else if (/familia|família|mae|mãe|pai|filho|filha|irmao|irmão|casa/i.test(perguntaTexto)) {
    contexto = "Harmonia Familiar e Lar";
  } else if (/orixa|orixá|cabeca|cabeça|frente|junto|juntó|adjunto|santo/i.test(perguntaTexto)) {
    contexto = "Identificação de Orixá de Cabeça";
  } else if (/espiritual|protecao|proteção|inveja|demanda|axé|axe/i.test(perguntaTexto)) {
    contexto = "Espiritualidade e Proteção Ancestral";
  }

  return res.status(200).json({
    sucesso: true,
    bloqueado: false,
    mensagem: "Consulta realizada com sucesso.",
    pergunta,
    contexto,
    odu: oduRegente || 6
  });
}
