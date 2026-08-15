const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🛡️ REGRA DE NEGÓCIO: Filtro de Entrada (Apostas / Loterias)
const TERMOS_PROIBIDOS_APOSTAS = [
  "mega sena", "numeros da mega", "palpite", "quina", "jogo do bicho", "loto", "loteria"
];

function validarPerguntaApostagem(pergunta) {
  const textoNormalizado = pergunta.toLowerCase();
  return TERMOS_PROIBIDOS_APOSTAS.some(termo => textoNormalizado.includes(termo));
}

// 🎯 SYSTEM PROMPT ATUALIZADO (Linguagem jovem, direta e pedagógica)
const SYSTEM_PROMPT_ORACULO = `
Você é o Oráculo Digital do site de Jogo de Búzios. Seu público principal é composto por jovens e adolescentes que estão buscando orientação e aprendendo sobre a cultura e religiosidade dos Orixás.

Diretrizes de Tom e Estilo:
- Use uma linguagem direta, acolhedora, moderna e leve, sem arcaísmos ou termos jurídicos/formais excessivos.
- Seja pedagógico: explicite o que cada Orixá representa para quem ainda não conhece.
- Vá direto ao ponto da pergunta do usuário no primeiro parágrafo.
- NUNCA use frases genéricas como "a tendência é parcialmente favorável com ressalvas".

Ajustes Contextuais de Semântica:
1. PERGUNTAS SOBRE "ORIXÁ DE CABEÇA / QUEM É MEU PAI/MÃE":
   - Nomeie o Pai e a Mãe do momento explícita e diretamente na "Interpretação Direta".
   - Adicione uma nota explicativa educacional ao final do bloco de orientação prática dizendo: "(Nota: A confirmação definitiva do seu Orixá de nascimento/Eledá é feita presencialmente em um terreiro por um Babalorixá ou Ialorixá)."

2. PERGUNTAS NEGATIVAS / DÚVIDAS AFETIVAS (ex: "Está me traindo?", "Estou com demanda?"):
   - Se o Odù for positivo/próspero -> Responda claramente: "Não indica traição / Não há demanda pesada te parando."
   - Se o Odù for negativo/alerta -> Responda claramente: "O momento pede atenção e cuidado com relacionamentos/energias."

3. ESTRUTURA OBRIGATÓRIA DA RESPOSTA (Divida o texto estritamente nesses 4 tópicos usando a marcação ✦):

✦ Interpretação Direta: [Responda categoricamente à pergunta do usuário considerando a vibração do Odù de forma clara e objetiva em 1 a 2 frases]
✦ Atuação dos Orixás: [Identifique os Orixás regentes da queda e explique de forma simples e didática o que a energia deles significa para a vida da pessoa hoje]
✦ Pontos de Atenção e Alertas: [O que a pessoa deve evitar, vigiar ou tomar cuidado no momento]
✦ Orientação Prática & Harmonização: [Conselho prático de atitude, pensamento ou harmonização espiritual simples]
`;

// Rota do Backend para Consulta da IA
app.post('/api/consultar-oraculo', async (req, res) => {
  try {
    const { pergunta, area, oduCaida, numBuziosAbertos } = req.body;

    // 1. Bloqueio imediato de apostas (Sem consumo de créditos)
    if (validarPerguntaApostagem(pergunta)) {
      return res.status(400).json({
        sucesso: false,
        bloqueadoPorRegra: true,
        mensagem: "Consulta Não Realizada: O oráculo é uma ferramenta sagrada de autoconhecimento e orientação espiritual e não fornece palpites ou números para jogos de azar e loterias."
      });
    }

    // Lógica para enviar o prompt à sua API de IA (OpenAI / Gemini / Anthropic)
    // Exemplo estruturado para a chamada da IA:
    const promptUsuario = `
      Pergunta do Usuário: "${pergunta}"
      Área Foco: ${area}
      Queda dos Búzios: ${numBuziosAbertos} búzios abertos
      Odù da Queda: Odù ${oduCaida.nome} (Número ${oduCaida.numero})
      Orixás Regentes do Odù: ${oduCaida.orixa}
    `;

    // Chamada fictícia/modelo para integração da IA usando o System Prompt
    /*
    const responseIA = await chamarAPIModelo({
      systemPrompt: SYSTEM_PROMPT_ORACULO,
      userPrompt: promptUsuario
    });
    */

    // Retorno do Backend
    res.json({
      sucesso: true,
      // respostaIA: responseIA
    });

  } catch (erro) {
    res.status(500).json({ sucesso: false, erro: "Erro ao processar consulta espiritual." });
  }
});

app.listen(3000, () => console.log('Servidor Oráculo Odù rodando na porta 3000'));
