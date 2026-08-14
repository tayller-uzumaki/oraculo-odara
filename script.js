// ==========================================
// BANCO DE DADOS SAGRADO DOS 16 ODÙS
// ==========================================
const ODUS_DATABASE = {
  1: { numero: 1, nome: "Okaran", orixa: "Exu", elemento: "Fogo", tendenciaPadrao: "NÃO", favorabilidade: 25, tituloTendencia: "❌ Tendência: NÃO — Os búzios indicam turbulência ou bloqueio temporário.", caminho: "Caminho da transformação rápida através do confronto de verdades. Okaran alerta para não forçar portas fechadas sem antes limpar os caminhos.", influenciaEspiritual: "Exu atua trazendo movimento veloz, desmascarando intenções ocultas e cobrando disciplina e clareza absoluta.", fatoresFavoraveis: ["Agilidade para corrigir erros", "Coragem para cortar laços nocivos", "Capacidade de recomeçar"], pontosAtencao: ["Evitar discussões impulsivas", "Cuidado com teimosia", "Não agir movido pela raiva"], orientacoesPraticas: "Mantenha a calma, coloque os pés no chão e evite tomar decisões precipitadas nas próximas 72 horas.", sabedoriaAncestral: "Nem toda porta fechada é uma perda; muitas vezes é o universo impedindo você de entrar onde não há luz.", resumoFinal: "Cenário desfavorável para avançar agora. O momento pede recuo, proteção e paciência." },
  2: { numero: 2, nome: "Ejioko", orixa: "Ibejis e Ogum", elemento: "Ar", tendenciaPadrao: "AINDA NÃO", favorabilidade: 48, tituloTendencia: "⏳ Tendência: AINDA NÃO — A decisão depende de negociações e acordos pendentes.", caminho: "Caminho da dualidade e da busca por alianças justas. Ejioko indica que dois caminhos estão abertos e a pressa pode prejudicar.", influenciaEspiritual: "Os Ibejis trazem a surpresa e a renovação, enquanto Ogum exige postura firme na defesa dos seus direitos legítimos.", fatoresFavoraveis: ["Receptividade para acordos", "Apoio de parcerias estratégicas", "Intuição para perceber intenções"], pontosAtencao: ["Indecisão paralensante", "Dependência da opinião alheia", "Medo de posicionamento"], orientacoesPraticas: "Busque auxílio técnico ou neutro. Analise todas as cláusulas e opções antes de dar o próximo passo.", sabedoriaAncestral: "A dúvida é a pausa necessária para que a sabedoria tome o lugar da impulsividade.", resumoFinal: "Resultado em aberto. Ajuste os termos e aguarde novas informações antes de se comprometer." },
  3: { numero: 3, nome: "Etaogundá", orixa: "Ogum", elemento: "Terra", tendenciaPadrao: "SIM", favorabilidade: 82, tituloTendencia: "✅ Tendência: SIM — Vitória alcançada através do combate justo e da persistência.", caminho: "Caminho do guerreiro incansável. Etaogundá promete o triunfo para quem não recua diante das batalhas difíceis.", influenciaEspiritual: "Ogum quebra correntes de injustiça, abrindo caminhos à força para quem age com verdade e retidão.", fatoresFavoraveis: ["Provas e argumentos sólidos ao seu favor", "Força de vontade inabalável", "Proteção contra manobras desleais"], pontosAtencao: ["Agressividade nas palavras", "Exhaustão física", "Teimosia em detalhes menores"], orientacoesPraticas: "Mantenha foco absoluto nos fatos concretos. Não gaste energia com provações emocionais.", sabedoriaAncestral: "As espadas da justiça cortam os nós que o medo tentou dar no seu caminho.", resumoFinal: "Cenário altamente positivo. Avance com determinação e sem medo." },
  4: { numero: 4, nome: "Irosun", orixa: "Iemanjá e Oxossi", elemento: "Terra", tendenciaPadrao: "AINDA NÃO", favorabilidade: 40, tituloTendencia: "⏳ Tendência: AINDA NÃO — Há verdades ocultas que precisam emergir primeiro.", caminho: "Caminho da prudência e do olhar atento. Irosun pede paciência para que a névoa se desfaça antes do veredito.", influenciaEspiritual: "Iemanjá acalma as águas da ansiedade e Oxóssi mira com precisão no momento exato de agir.", fatoresFavoraveis: ["Intuição apurada para farejar armadilhas", "Proteção ancestral silenciosa", "Descoberta de fatos importantes"], pontosAtencao: ["Ilusões e falsas promessas", "Cegueira emocional diante da realidade", "Confiar em quem fala demais"], orientacoesPraticas: "Silencie seus planos. Não conte vitória antes da hora e guarde os detalhes sob reserva absoluta.", sabedoriaAncestral: "A calma da água esconde a profundidade do oceano; seja calmo por fora e firme por dentro.", resumoFinal: "Aguarde a névoa baixar. O tempo revelará os detalhes que faltam para sua decisão." },
  5: { numero: 5, nome: "Oxê", orixa: "Oxum", elemento: "Água", tendenciaPadrao: "SIM", favorabilidade: 88, tituloTendencia: "✅ Tendência: SIM — Favorável, trazendo renovação, prosperidade e encerramento doce.", caminho: "Caminho do brilho e da fartura reconquistada. Oxê indica que o sofrimento está dando lugar à colheita merecida.", influenciaEspiritual: "Oxum envolve a questão com diplomacia, doçura e atração de abundância material e espiritual.", fatoresFavoraveis: ["Magnetismo elevado", "Flexibilidade para contornar obstáculos", "Ganho ou reparação justa"], pontosAtencao: ["Gasto de energia com intrigas", "Vaidade", "Inconstância nos compromissos"], orientacoesPraticas: "Cuide da sua energia e do seu bem-estar. Mantenha a postura serena para atrair a prosperidade.", sabedoriaAncestral: "A água doce do rio sempre encontra o caminho para o mar, superando qualquer rocha.", resumoFinal: "Cenário muito abençoado e próspero. Confie no fluxo positivo dos acontecimentos." },
  6: { numero: 6, nome: "Obará", orixa: "Xangô e Oxóssi", elemento: "Ar / Terra", tendenciaPadrao: "SIM", favorabilidade: 95, tituloTendencia: "✅ Tendência: SIM — Altamente favorável, com prosperidade e triunfo justo.", caminho: "Obará é o Odù da grande virada de chave. Representa a superação da humilhação e a conquista da honra e da fartura.", influenciaEspiritual: "Xangô aplica a justiça equilibrada e Oxóssi garante que a flecha alcance a fartura e a prosperidade.", fatoresFavoraveis: ["Reconhecimento do seu direito legítimo", "Clareza nos argumentos", "Abertura substancial de caminhos"], pontosAtencao: ["Excesso de ostentação", "Falar sobre a conquista antes da hora", "Orgulho elevado"], orientacoesPraticas: "Mantenha a postura íntegra, mantenha o foco no seu objetivo e preserve o silêncio.", sabedoriaAncestral: "Aquele que já esteve na poeira conhece o valor de caminhar no topo com humildade.", resumoFinal: "Excelente sinalização oracular. Seus caminhos estão abertos para a vitória." },
  7: { numero: 7, nome: "Odi", orixa: "Obaluaê e Oxalufã", elemento: "Terra", tendenciaPadrao: "AINDA NÃO", favorabilidade: 35, tituloTendencia: "⏳ Tendência: AINDA NÃO — Exige resistência e encerramento definitivo de velhos ciclos.", caminho: "Caminho do renascimento duro mas duradouro. Odi mostra que para o novo entrar, as dívidas do passado precisam ser zeradas.", influenciaEspiritual: "Obaluaê limpa as impurezas e feridas antigas, garantindo que o chão reconstruído seja inabalável.", fatoresFavoraveis: ["Firmeza para suportar a pressão final", "Capacidade de resiliência e paciência", "Cura de injustiças antigas"], pontosAtencao: ["Apegos ao passado ou ressentimentos", "Rigidez excessiva", "Pessimismo no tempo de espera"], orientacoesPraticas: "Desapegue das frustrações anteriores. Faça uma limpeza energética e organize suas pendências.", sabedoriaAncestral: "O carvão sob extrema pressão e tempo é o que se transforma em diamante.", resumoFinal: "Feche o ciclo passado com firmeza antes de tentar iniciar esta nova etapa." },
  8: { numero: 8, nome: "Ejionile", orixa: "Oxaguiã / Oxalá", elemento: "Ar", tendenciaPadrao: "SIM", favorabilidade: 90, tituloTendencia: "✅ Tendência: SIM — Vitória garantida pela sabedoria, ética e estratégia pacífica.", caminho: "Caminho da liderança elevada e da vitória da razão sobre o caos. Ejionile traz a paz que sucede a tempestade.", influenciaEspiritual: "Oxaguiã sopra clareza mental e estratégia limpa, derrubando acusações infundadas.", fatoresFavoraveis: ["Razão e ética ao seu lado", "Clareza mental absoluta", "Respeito dos decisores"], pontosAtencao: ["Ansiedade e excesso de pensamentos", "Perfeccionismo sufocante", "Impaciência com os outros"], orientacoesPraticas: "Mantenha a calma. Evite conflitos acalorados e use a lógica como sua principal aliada.", sabedoriaAncestral: "A paz não é a ausência de guerra, é a presença do domínio sobre a própria mente.", resumoFinal: "Sinal verde do oráculo. Mantenha a cabeça fria e a conduta ética para triunfar." },
  9: { numero: 9, nome: "Osa", orixa: "Oyá (Iansã) e Yemanja", elemento: "Fogo / Água", tendenciaPadrao: "AINDA NÃO", favorabilidade: 42, tituloTendencia: "⏳ Tendência: AINDA NÃO — Ventos de mudança repentina podem alterar o rumo do processo.", caminho: "Caminho da tempestade que varre o ultrapassado. Osa exige flexibilidade para se adaptar às guinadas.", influenciaEspiritual: "Iansã traz a força do vento, cortando amarras e movimentando o que estava estagnado.", fatoresFavoraveis: ["Mudança rápida do cenário a seu favor", "Coragem para inovar", "Proteção contra falsos aliados"], pontosAtencao: ["Falta de foco e inquietação", "Explosões emocionais", "Agir sem planejar"], orientacoesPraticas: "Não tome decisões cruciais sob forte emoção. Respire e aguarde a poeira baixar.", sabedoriaAncestral: "O vento forte derruba árvores de raízes rasas, mas apenas dobra as que são flexíveis.", resumoFinal: "Imprevistos podem ocorrer. Reorganize a estratégia e espere o momento certo." },
  10: { numero: 10, nome: "Ofun", orixa: "Oxalá", elemento: "Ar", tendenciaPadrao: "SIM", favorabilidade: 85, tituloTendencia: "✅ Tendência: SIM — Solução abençoada pela sabedoria superior e respeito à verdade.", caminho: "Caminho da bênção dos anciãos e da pureza de propósitos. Ofun concede a vitória aos que agem de boa-fé.", influenciaEspiritual: "Oxalá estende sua proteção, afastando falsidades e desonestidades do seu caminho.", fatoresFavoraveis: ["Autoridade moral inquestionável", "Proteção espiritual elevada", "Solução honrosa do conflito"], pontosAtencao: ["Prepotência", "Violarem princípios éticos", "Isolamento"], orientacoesPraticas: "Agradeça às suas forças protetoras e mantenha a intenção pura em cada passo.", sabedoriaAncestral: "A verdade pode tardar em ser ouvida, mas quando fala, o silêncio respeitoso se impõe.", resumoFinal: "Caminhos limpos e abençoados. O veredito tende a ser positivo para você." },
  11: { numero: 11, nome: "Owonrin", orixa: "Exu e Oyá", elemento: "Fogo", tendenciaPadrao: "NÃO", favorabilidade: 30, tituloTendencia: "❌ Tendência: NÃO — Cuidado com reviravoltas inesperadas ou imprevistos de última hora.", caminho: "Caminho do imprevisível e do aprendizado rápido. Owonrin avisa que o cenário pode mudar de posição de repente.", influenciaEspiritual: "Exu e Oyá cobram atenção redobrada com papéis, conversas informais e prazos.", fatoresFavoraveis: ["Capacidade de reação rápida a emergências", "Criatividade para saídas"], pontosAtencao: ["Desorganização ou perda de prazos", "Confiar em promessas verbais", "Desatenção"], orientacoesPraticas: "Confirme dados e acordos por escrito. A prevenção garantirá sua segurança.", sabedoriaAncestral: "Quando o vento muda de direção, o navegador inteligente ajusta as velas.", resumoFinal: "Alerta de risco. Não arrisque recursos ou expectativas nesta questão agora." },
  12: { numero: 12, nome: "Ejilaxeborá", orixa: "Xangô", elemento: "Fogo", tendenciaPadrao: "SIM", favorabilidade: 92, tituloTendencia: "✅ Tendência: SIM — Justiça plena, rigorosa e indiscutível.", caminho: "Caminho da balança exata e do tribunal divino. Ejilaxeborá traz o julgamento imparcial onde a verdade prevalece.", influenciaEspiritual: "Xangô reina supremo nesta caída, pesando os fatos com rigor e abrindo portas para a verdade.", fatoresFavoraveis: ["Provas irrefutáveis ao seu favor", "Sentença ou resolução justa", "Triunfo em disputas"], pontosAtencao: ["Julgar os outros com rigor excessivo", "Orgulho", "Estresse elevado"], orientacoesPraticas: "Permaneça estritamente dentro da verdade. A honestidade é sua maior garantia.", sabedoriaAncestral: "A justiça humana pode falhar por cegueira, mas a lei de causa e efeito nunca erra.", resumoFinal: "A justiça está a seu favor. Permaneça firme na verdade que o resultado virá." },
  13: { numero: 13, nome: "Okanran Meji", orixa: "Nanã e Obaluaê", elemento: "Terra", tendenciaPadrao: "AINDA NÃO", favorabilidade: 45, tituloTendencia: "⏳ Tendência: AINDA NÃO — Exige maturação lenta e paciência no tempo certo.", caminho: "Caminho da sabedoria ancestral da terra profunda. Ensina que frutos não amadurecem à força.", influenciaEspiritual: "Nanã traz a calma dos anciãos, preparando o terreno para que a solução venha sem traumas.", fatoresFavoraveis: ["Estabilidade a longo prazo", "Decisão definitiva e sólida", "Cura de mágoas"], pontosAtencao: ["Impaciência angustiante", "Tentar acelerar burocracias à força", "Melancolia"], orientacoesPraticas: "Respeite o tempo natural dos trâmites. Cuide dos afazeres do presente.", sabedoriaAncestral: "A paciência é a certeza de que a semente germina no escuro antes de ver a luz.", resumoFinal: "A resposta requer tempo. Mantenha a constância sem desespero." },
  14: { numero: 14, nome: "Iká", orixa: "Oxumaré", elemento: "Água / Ar", tendenciaPadrao: "SIM", favorabilidade: 84, tituloTendencia: "✅ Tendência: SIM — Ciclo de renovação trazendo flexibilidade e novos caminhos.", caminho: "Caminho do arco-íris e da transformação constante. Iká indica que a tempestade passou e traz novas opções.", influenciaEspiritual: "Oxumaré renova a energia do ambiente, transformando perdas aparentes em ganhos reais.", fatoresFavoraveis: ["Capacidade de reinvenção", "Atração de oportunidades", "Flexibilidade"], pontosAtencao: ["Espalhar energia em muitas coisas", "Promessas vagas de terceiros", "Falta de foco"], orientacoesPraticas: "Esteja aberto a caminhos e alternativas que você não havia considerado no início.", sabedoriaAncestral: "Após a chuva mais densa, o céu se pinta com as cores da renovação.", resumoFinal: "Cenário favorável e de renovação. Adapte-se e colha os frutos positivos." },
  15: { numero: 15, nome: "Obeogundá", orixa: "Ewá e Ogum", elemento: "Ar", tendenciaPadrao: "AINDA NÃO", favorabilidade: 38, tituloTendencia: "⏳ Tendência: AINDA NÃO — Exige discernimento apurado para enxergar as entrelinhas.", caminho: "Caminho da visão além do alcance e da intuição afiada. Adverte contra armadilhas disfarçadas de facilidade.", influenciaEspiritual: "Ewá protege os segredos e concede percepção para detectar más intenções a distância.", fatoresFavoraveis: ["Proteção contra traições", "Estratégia perspicaz", "Descoberta de falhas a tempo"], pontosAtencao: ["Desconfiança paranóica", "Isolamento excessivo", "Inquietação quanto ao futuro"], orientacoesPraticas: "Confie na sua percepção interior. Se algo parecer bom demais, investigue a fundo.", sabedoriaAncestral: "O escudo mais forte é a lucidez de enxergar as coisas exatamente como são.", resumoFinal: "Sinal amarelo. Investigue melhor antes de dar o próximo passo." },
  16: { numero: 16, nome: "Alafia", orixa: "Orunmilá e Oxalá", elemento: "Luz / Ar", tendenciaPadrao: "SIM", favorabilidade: 98, tituloTendencia: "✅ Tendência: SIM — Luz absoluta, paz de espírito, confirmação e vitória plena.", caminho: "Caminho da bênção suprema onde todos os búzios se abrem para confirmar a graça do oráculo.", influenciaEspiritual: "Orunmilá e Oxalá derramam sabedoria e luz, dissipando todas as trevas e incertezas.", fatoresFavoraveis: ["Harmonia total dos fatores", "Conclusão extremamente favorável", "Proteção contínua"], pontosAtencao: ["Acomodação ou descuido na reta final", "Ingenuidade diante do ambiente"], orientacoesPraticas: "Agradeça com o coração sereno. Mantenha a postura elevada e desfrute da conquista.", sabedoriaAncestral: "Quando a luz da verdade se acende por completo, a sombra simplesmente deixa de existir.", resumoFinal: "Confirmação absoluta e positiva. Vitória garantida nos caminhos." }
};

// VÁRIAVEIS GLOBAIS DE ESTADO
let oduDiretorAtual = null;
let perguntasRestantes = 0;
let pacoteAtivo = { qtd: 5, valor: 25.99 };
let ultimaPerguntaFeita = { texto: "", area: "" };
let historicoConsultas = [];

// ==========================================
// CALCULADORA DE ODÙ DE NASCIMENTO
// ==========================================
function calcularOduNumerologia(dataStr) {
  if (!dataStr) return 6;
  const numeros = dataStr.replace(/\D/g, '');
  let soma = numeros.split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  while (soma > 16) {
    soma = soma.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }
  return soma === 0 ? 1 : soma;
}

// ETAPA 1: CONSULTA DO ODÙ DE NASCIMENTO
document.getElementById('form-odu')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const dataInput = document.getElementById('dataNasc').value;
  if (!dataInput) return;

  const btn = document.getElementById('btn-calc-odu');
  btn.innerText = '🔮 Mapeando Força Ancestral...';

  setTimeout(() => {
    const numOdu = calcularOduNumerologia(dataInput);
    oduDiretorAtual = ODUS_DATABASE[numOdu] || ODUS_DATABASE[6];

    document.getElementById('odu-numero').innerText = oduDiretorAtual.numero;
    document.getElementById('odu-nome').innerText = oduDiretorAtual.nome;
    document.getElementById('odu-orixa').innerText = oduDiretorAtual.orixa;
    document.getElementById('odu-elemento').innerText = oduDiretorAtual.elemento;

    // ESTILO REFORMULADO (Tons Claros e Terracota)
    const textoCaminhoExpandido = `
      <p style="margin-bottom: 10px; color: #4A443E; line-height: 1.6;">
        ${oduDiretorAtual.caminho} Sob a regência máster de <strong style="color: #8B3524;">${oduDiretorAtual.orixa}</strong>, este Odù atua através do elemento <strong>${oduDiretorAtual.elemento}</strong>, moldando os ciclos de crescimento, superação e colheita ao longo da sua jornada terrena.
      </p>
      <p style="margin-bottom: 12px; color: #4A443E; line-height: 1.6;">
        Esta força ancestral exige constante alinhamento espiritual e autoconhecimento para potencializar os caminhos da prosperidade e afastar energias de estagnação.
      </p>
      <div style="margin-top: 12px; padding: 14px; background: #FDFBF7; border-radius: 8px; border: 1px solid #E2DBD1;">
        <p style="color: #276749; margin-bottom: 6px; font-size: 13px;"><strong>✨ Pontos Fortes & Potenciais:</strong> ${oduDiretorAtual.fatoresFavoraveis.join(' • ')}.</p>
        <p style="color: #9B2C2C; margin-bottom: 0; font-size: 13px;"><strong>⚠️ Pontos de Alerta & Cuidados:</strong> ${oduDiretorAtual.pontosAtencao.join(' • ')}.</p>
      </div>
    `;

    document.getElementById('odu-caminho').innerHTML = textoCaminhoExpandido;
    
    const elemTransicao = document.getElementById('transicao-nome-odu');
    if (elemTransicao) {
      elemTransicao.innerText = `${oduDiretorAtual.nome} (${oduDiretorAtual.orixa})`;
    }

    const resOdu = document.getElementById('resultado-odu');
    resOdu.style.display = 'block';
    resOdu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    btn.innerText = '🔮 Descobrir Meu Odù';
  }, 800);
});

// ==========================================
// ETAPA 2: SELEÇÃO DE PACOTES E PIX
// ==========================================
function selecionarPacote(qtd, valor) {
  pacoteAtivo = { qtd, valor };
  document.getElementById('pacote-5')?.classList.toggle('active', qtd === 5);
  document.getElementById('pacote-10')?.classList.toggle('active', qtd === 10);
}

function gerarPix() {
  const container = document.getElementById('area-pix');
  const qrSimulado = "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865405" + pacoteAtivo.valor.toFixed(2) + "5802BR5913Oraculo Odara";

  // LAYOUT CLARO COMPATÍVEL COM O SITE
  container.innerHTML = `
    <div style="background: #FFFFFF; padding: 16px; border-radius: 8px; border: 1px solid #E2DBD1; text-align: center; margin-top: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
      <p style="color: #2C2622; font-size: 14px; margin-bottom: 8px; font-weight: 600;">Copia e Cola PIX (R$ ${pacoteAtivo.valor.toFixed(2)}):</p>
      <input type="text" value="${qrSimulado}" readonly style="width: 100%; padding: 10px; font-size: 12px; background: #F7F5F0; color: #2C2622; border: 1px solid #D1C7B7; border-radius: 6px; margin-bottom: 12px; text-align: center;" />
      <button onclick="confirmarPagamento()" class="btn-primary" style="background: #8B3524; color: #fff; width: 100%; padding: 12px; border-radius: 30px; font-weight: 600; cursor: pointer; border: none;">🛡️ Simular Pagamento Aprovado</button>
    </div>
  `;
}

function confirmarPagamento() {
  perguntasRestantes = pacoteAtivo.qtd;
  historicoConsultas = []; 
  
  const elQtd = document.getElementById('qtd-perguntas');
  if (elQtd) elQtd.innerText = perguntasRestantes;
  
  const secaoJogada = document.getElementById('secao-jogada');
  if (secaoJogada) {
    secaoJogada.style.display = 'block';
    secaoJogada.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================
// SVG DE BÚZIOS (COM DESIGN TERROSO)
// ==========================================
function criarBuzioSVG(eAberto) {
  if (eAberto) {
    return `
      <svg viewBox="0 0 50 70" width="100%" height="100%">
        <defs>
          <radialGradient id="gradAberto" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#F3E5D8"/>
            <stop offset="100%" stop-color="#C29B72"/>
          </radialGradient>
        </defs>
        <path d="M25 2 C 42 2, 48 18, 47 35 C 46 52, 38 68, 25 68 C 12 68, 4 52, 3 35 C 2 18, 8 2, 25 2 Z" fill="url(#gradAberto)" stroke="#8B3524" stroke-width="1.5"/>
        <path d="M25 10 C 22 18, 22 52, 25 60 C 28 52, 28 18, 25 10 Z" fill="#4A2810"/>
        <path d="M22 18 L25 19 L22 23 L25 24 L22 28 L25 29 L22 33 L25 34 L22 38 L25 39 L22 43 L25 44 L22 48 L25 49" stroke="#FFF" stroke-width="1" fill="none"/>
        <path d="M28 18 L25 19 L28 23 L25 24 L28 28 L25 29 L28 33 L25 34 L28 38 L25 39 L28 43 L25 44 L28 48 L25 49" stroke="#FFF" stroke-width="1" fill="none"/>
      </svg>
    `;
  } else {
    return `
      <svg viewBox="0 0 50 70" width="100%" height="100%">
        <defs>
          <radialGradient id="gradFechado" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#D4B08C"/>
            <stop offset="60%" stop-color="#8B5E34"/>
            <stop offset="100%" stop-color="#3D2314"/>
          </radialGradient>
        </defs>
        <path d="M25 3 C 41 3, 47 19, 46 35 C 45 51, 37 67, 25 67 C 13 67, 5 51, 4 35 C 3 19, 9 3, 25 3 Z" fill="url(#gradFechado)" stroke="#2C1A0E" stroke-width="1.5"/>
        <path d="M25 6 C 29 20, 29 50, 25 64" stroke="#FFF" stroke-width="1" stroke-dasharray="2 3" opacity="0.4" fill="none"/>
      </svg>
    `;
  }
}

// DETECTOR DE INTENÇÃO DE REGENCIAL
function verificarIntencaoOrixasRegentes(perguntaTexto) {
  const padroes = [
    /quais.*orix[aá]s/i,
    /quem.*s[ãa]o.*meus.*orix[aá]s/i,
    /meus.*orix[aá]s.*de.*cabe[çc]a/i,
    /orix[aá].*de.*frente/i,
    /orix[aá].*cabe[çc]a/i,
    /quais.*s[ãa]o.*meus.*regentes/i,
    /quem.*é.*meu.*junt[oó]/i,
    /quem.*é.*meu.*adjunto/i
  ];
  return padroes.some(regex => regex.test(perguntaTexto));
}

// MOTOR DE INTERPRETAÇÃO (TEMA CLARO)
function gerarInterpretacaoDinamicamente(perguntaText, oduObj, area) {
  const p = perguntaText.toLowerCase();
  const tend = oduObj.tendenciaPadrao;
  let direcionamento = "";

  if (p.includes("mãe de santo") || p.includes("mae de santo") || p.includes("pai de santo") || p.includes("aprovar") || p.includes("página") || p.includes("pagina") || p.includes("criação") || p.includes("criacao")) {
    if (tend === "SIM") {
      direcionamento = `Analisando a sua dúvida sobre a aprovação da sua Mãe/Pai de Santo quanto à criação da sua página de búzios: a caída revela que <strong>SIM, haverá acolhimento e bênção</strong>. A energia de <strong>${oduObj.orixa}</strong> abre portas para a sua expressão oracular, desde que você mantenha a postura de respeito e transparência com os seus mais velhos.`;
    } else {
      direcionamento = `Diante do seu questionamento sobre o apoio da sua autoridade espiritual para a página de búzios: os búzios indicam <strong>NECESSIDADE DE CAUTELA E DIÁLOGO PRÉVIO</strong>. A regência de <strong>${oduObj.nome}</strong> sugere que buscar a aprovação direta antes de tornar o projeto público evita mal-entendidos.`;
    }
  } else if (p.includes("casa") || p.includes("feitura") || p.includes("santo") || p.includes("terreiro") || p.includes("ilê") || p.includes("ile")) {
    if (tend === "SIM") {
      direcionamento = `A regência de <strong>${oduObj.nome}</strong> confirma que o local e o momento para o seu desenvolvimento espiritual estão <strong>FAVORÁVEIS</strong>. A força de <strong>${oduObj.orixa}</strong> sustenta o seu axé nessa casa.`;
    } else {
      direcionamento = `O oráculo sugere <strong>REAVALIAÇÃO E RESGUARDO</strong>. A vibração de <strong>${oduObj.nome}</strong> sinaliza que pendências de limpeza espiritual ou conversas precisam ser ajustadas antes de firmar compromissos definitivos.`;
    }
  } else if (p.includes("amor") || p.includes("relacionamento") || p.includes("voltar") || p.includes("casamento") || p.includes("namoro")) {
    if (tend === "SIM") {
      direcionamento = `Sobre o seu caminho afetivo: o resultado é <strong>POSITIVO</strong>. A regência do Odù <strong>${oduObj.nome}</strong> e a doçura de <strong>${oduObj.orixa}</strong> abrem o campo energético para entendimento e reciprocidade.`;
    } else {
      direcionamento = `No campo dos afetos, o momento exige <strong>PROTEÇÃO E PACIÊNCIA</strong>. A queda sob <strong>${oduObj.nome}</strong> avisa para não agir sob impulso e proteger seu coração contra ilusões.`;
    }
  } else if (p.includes("trabalho") || p.includes("emprego") || p.includes("dinheiro") || p.includes("negócio") || p.includes("negocio") || p.includes("finanças")) {
    if (tend === "SIM") {
      direcionamento = `Quanto aos seus caminhos materiais: a resposta é <strong>FAVORÁVEL</strong>. A força de <strong>${oduObj.orixa}</strong> atua diretamente para destravar negociações e atrair prosperidade em <em>${area}</em>.`;
    } else {
      direcionamento = `Para a área financeira e profissional: o momento pede <strong>PLANEJAMENTO E PRUDÊNCIA</strong>. O Odù <strong>${oduObj.nome}</strong> alerta para rever cláusulas e evitar gastos imprevistos.`;
    }
  } else {
    if (tend === "SIM") {
      direcionamento = `Respondendo diretamente à sua indagação: o veredito oracular é <strong>FAVORÁVEL (SIM)</strong>. As energias do Odù <strong>${oduObj.nome}</strong> indicam que as forças de <strong>${oduObj.orixa}</strong> estão atuando em seu benefício.`;
    } else {
      direcionamento = `Respondendo diretamente à sua questão: o oráculo pede <strong>ATENÇÃO E REORGANIZAÇÃO</strong>. A energia de <strong>${oduObj.nome}</strong> sugere prudência e fortalecimento espiritual antes de avançar.`;
    }
  }

  // RETORNO COM CONTAINER BRANCO/CREME
  return `
    <div style="background: #FFFFFF; padding: 16px; border-radius: 8px; border: 1px solid #E2DBD1; margin-bottom: 16px;">
      <span style="font-size: 11px; color: #8B3524; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">3. Interpretação Aplicada à Sua Pergunta</span>
      <p style="font-size: 13px; color: #5E5853; margin: 4px 0 12px 0; font-style: italic;">"Pergunta feita: ${perguntaText}"</p>
      
      <div style="background: #FDFBF7; padding: 14px; border-left: 3px solid #8B3524; border-radius: 4px; margin-bottom: 12px;">
        <p style="font-size: 14px; color: #2C2622; line-height: 1.6; margin: 0;">${direcionamento}</p>
      </div>

      <p style="font-size: 13px; color: #4A443E; line-height: 1.5; margin: 0;">
        ✨ <strong>Conselho da Caída:</strong> Sob o elemento <strong>${oduObj.elemento}</strong>, sua postura em <em>${area}</em> deve focar em: <em>${oduObj.orientacoesPraticas}</em>
      </p>
    </div>
  `;
}

// ENVIO DE E-MAIL
function enviarHistoricoCompletoEmail(emailUsuario) {
  const emailCCO = "suporte@oraculodosorixas.online";
  
  if (!emailUsuario) {
    emailUsuario = prompt("Por favor, informe seu e-mail para receber o relatório completo das suas consultas:");
    if (!emailUsuario) return;
  }

  let corpoTexto = `✨ RELATÓRIO COMPLETO DA SUA CONSULTA ORACULAR ✨\n\n`;
  corpoTexto += `Data da Leitura: ${new Date().toLocaleDateString('pt-BR')}\n`;
  corpoTexto += `--------------------------------------------------\n\n`;

  historicoConsultas.forEach((item, index) => {
    corpoTexto += `📌 PERGUNTA ${index + 1}: "${item.pergunta}" (Área: ${item.area})\n`;
    corpoTexto += `🔮 Odù Revelado: ${item.oduNome} (${item.orixa})\n`;
    corpoTexto += `📍 Resultado: ${item.tendencia}\n`;
    corpoTexto += `💡 Conselho: ${item.resumo}\n`;
    corpoTexto += `--------------------------------------------------\n\n`;
  });

  corpoTexto += `Que os Orixás iluminem seus caminhos com prosperidade e paz!`;

  const assunto = encodeURIComponent("📜 Seu Relatório Completo do Oráculo dos Orixás");
  const corpo = encodeURIComponent(corpoTexto);

  const statusEmail = document.getElementById('status-email-envio');
  if (statusEmail) {
    statusEmail.innerHTML = `✅ Relatório enviado para <strong>${emailUsuario}</strong>!`;
  }

  window.open(`mailto:${emailUsuario}?cc=${emailCCO}&subject=${assunto}&body=${corpo}`);
}

function prepararProximaPergunta() {
  const inputPergunta = document.getElementById('pergunta');
  if (inputPergunta) {
    inputPergunta.value = '';
    inputPergunta.focus();
  }
  document.getElementById('form-consulta')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function irParaPacotes() {
  document.getElementById('secao-pacotes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ==========================================
// ETAPA 3: JOGADA DE BÚZIOS (COMPLETA)
// ==========================================
document.getElementById('form-consulta')?.addEventListener('submit', function (e) {
  e.preventDefault();

  if (perguntasRestantes <= 0) {
    alert("Seu saldo de consultas acabou. Adquira um novo pacote para continuar!");
    irParaPacotes();
    return;
  }

  const perguntaInput = document.getElementById('pergunta');
  const areaInput = document.getElementById('area-foco');
  const emailInput = document.getElementById('email-usuario');
  
  const pergunta = perguntaInput.value.trim();
  const area = areaInput.value;
  const emailUsuario = emailInput ? emailInput.value.trim() : "";

  // Trava de Pergunta Duplicada
  if (pergunta.toLowerCase() === ultimaPerguntaFeita.texto.toLowerCase() && area === ultimaPerguntaFeita.area) {
    alert("⚠️ Você já fez essa exata pergunta nesta jogada! Para não consumir seus créditos repetidamente, altere o texto ou o foco antes de jogar.");
    perguntaInput.focus();
    return;
  }

  const btn = document.getElementById('btn-jogar');
  btn.disabled = true;

  const mesa = document.getElementById('mesa-buzios');
  const peneira = document.getElementById('peneira');
  const status = document.getElementById('status-jogo');
  const resLeitura = document.getElementById('resultado-leitura');

  mesa.style.display = 'block';
  peneira.innerHTML = '';
  resLeitura.style.display = 'none';

  mesa.scrollIntoView({ behavior: 'smooth', block: 'center' });
  mesa.classList.add('mesa-chacoalhando');

  const ehPerguntaRegencia = verificarIntencaoOrixasRegentes(pergunta);

  const numAbertos1 = Math.floor(Math.random() * 16) + 1;
  const oduJogo1 = ODUS_DATABASE[numAbertos1];

  let oduFrente = oduJogo1, oduJunto = null, oduAncestral = null;

  if (ehPerguntaRegencia) {
    let num2 = Math.floor(Math.random() * 16) + 1;
    let num3 = Math.floor(Math.random() * 16) + 1;
    oduJunto = ODUS_DATABASE[num2];
    oduAncestral = ODUS_DATABASE[num3];
  }

  // Animação de criação dos búzios
  for (let i = 0; i < 16; i++) {
    const eAberto = i < numAbertos1;
    const buzioEl = document.createElement('div');
    buzioEl.className = 'buzio buzio-animando';
    buzioEl.innerHTML = criarBuzioSVG(eAberto);

    const top = Math.floor(Math.random() * 65 + 15);
    const left = Math.floor(Math.random() * 65 + 15);
    const rot = Math.floor(Math.random() * 360);

    buzioEl.style.top = `${top}%`;
    buzioEl.style.left = `${left}%`;
    buzioEl.style.transform = `rotate(${rot}deg)`;
    buzioEl.style.animationDelay = `${i * 0.08}s`;

    peneira.appendChild(buzioEl);
  }

  status.innerText = ehPerguntaRegencia 
    ? "🔮 Mapeando as 3 Caídas Sagradas para Regência Espiritual..." 
    : "🔮 Lançando os búzios e consultando o oráculo...";

  // SIMULAÇÃO DO TEMPO DE RESPOSTA
  setTimeout(() => {
    mesa.classList.remove('mesa-chacoalhando');
    
    // Atualiza saldo e última pergunta
    perguntasRestantes--;
    document.getElementById('qtd-perguntas').innerText = perguntasRestantes;
    ultimaPerguntaFeita = { texto: pergunta, area: area };

    // Registra no histórico
    historicoConsultas.push({
      pergunta: pergunta,
      area: area,
      oduNome: oduJogo1.nome,
      orixa: oduJogo1.orixa,
      tendencia: oduJogo1.tituloTendencia,
      resumo: oduJogo1.resumoFinal
    });

    let htmlResultado = "";
    const htmlInterpretacaoAnalisada = gerarInterpretacaoDinamicamente(pergunta, oduJogo1, area);

    if (ehPerguntaRegencia) {
      // VISUAL CLARO PARA REGÊNCIA ESPIRITUAL
      htmlResultado = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2DBD1; padding-bottom: 10px; margin-bottom: 16px;">
          <span style="color: #8B3524; font-weight: bold; font-size: 13px;">👑 Mapeamento da Tríade Sagrada de Orixás</span>
          <span style="font-size: 12px; color: #5E5853;">Área: <strong>${area}</strong></span>
        </div>

        <div style="background: #FDFBF7; padding: 16px; border-radius: 8px; border-left: 4px solid #8B3524; margin-bottom: 12px;">
          <span style="font-size: 11px; color: #8B3524; font-weight: bold; text-transform: uppercase;">1. Orixá de Frente (Guiador Principal)</span>
          <h3 style="color: #2C2622; font-size: 18px; margin: 4px 0; font-family: 'Playfair Display', serif;">${oduFrente.orixa} (via Odù ${oduFrente.nome})</h3>
          <p style="font-size: 13px; color: #4A443E; margin: 0;">Representa a sua cabeça, sua essência e a forma como você se posiciona perante o mundo.</p>
        </div>

        <div style="background: #FDFBF7; padding: 16px; border-radius: 8px; border-left: 4px solid #B5935A; margin-bottom: 12px;">
          <span style="font-size: 11px; color: #B5935A; font-weight: bold; text-transform: uppercase;">2. Orixá Adjunto / Juntó (Sustentação)</span>
          <h3 style="color: #2C2622; font-size: 18px; margin: 4px 0; font-family: 'Playfair Display', serif;">${oduJunto.orixa} (via Odù ${oduJunto.nome})</h3>
          <p style="font-size: 13px; color: #4A443E; margin: 0;">Traz o equilíbrio emocional e a proteção lateral nos momentos de decisão e transição.</p>
        </div>

        <div style="background: #FDFBF7; padding: 16px; border-radius: 8px; border-left: 4px solid #5E5853; margin-bottom: 16px;">
          <span style="font-size: 11px; color: #5E5853; font-weight: bold; text-transform: uppercase;">3. Ancestralidade / Guia de Apoio</span>
          <h3 style="color: #2C2622; font-size: 18px; margin: 4px 0; font-family: 'Playfair Display', serif;">${oduAncestral.orixa} (via Odù ${oduAncestral.nome})</h3>
          <p style="font-size: 13px; color: #4A443E; margin: 0;">A força de apoio espiritual profunda que atua na proteção dos seus caminhos de vida.</p>
        </div>

        ${htmlInterpretacaoAnalisada}
      `;
    } else {
      // VISUAL CLARO PARA CONSULTA DIRETA
      htmlResultado = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2DBD1; padding-bottom: 10px; margin-bottom: 14px;">
          <span style="color: #8B3524; font-weight: bold; font-size: 13px;">🔮 Leitura Oracular Direta</span>
          <span style="font-size: 12px; color: #5E5853;">Área: <strong>${area}</strong></span>
        </div>

        <div style="background: #FDFBF7; padding: 16px; border-radius: 8px; border-left: 4px solid #8B3524; margin-bottom: 16px;">
          <span style="font-size: 11px; color: #8B3524; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">1. Diagnóstico do Lançamento</span>
          <h3 style="color: #2C2622; font-size: 20px; margin: 6px 0; font-family: 'Playfair Display', serif;">Odù ${oduJogo1.nome} (Nº ${oduJogo1.numero}) — Regência de ${oduJogo1.orixa}</h3>
          <p style="font-size: 14px; color: #8B3524; font-weight: bold; margin-top: 4px;">${oduJogo1.tituloTendencia}</p>
        </div>

        <div style="background: #FFFFFF; padding: 14px; border-radius: 8px; border: 1px solid #E2DBD1; margin-bottom: 16px;">
          <h4 style="color: #8B3524; font-size: 15px; margin-bottom: 6px; font-family: 'Playfair Display', serif;">2. Caminho e Influência Espiritual</h4>
          <p style="font-size: 14px; color: #4A443E; line-height: 1.6; margin-bottom: 10px;">${oduJogo1.caminho}</p>
          <p style="font-size: 13px; color: #5E5853; line-height: 1.4; font-style: italic;">" Sabedoria Ancestral: ${oduJogo1.sabedoriaAncestral} "</p>
        </div>

        ${htmlInterpretacaoAnalisada}

        <div style="background: #F7F5F0; padding: 16px; border-radius: 8px; text-align: center; border: 1px solid #E2DBD1; margin-bottom: 16px;">
          <span style="font-size: 12px; color: #8B3524; font-weight: bold; text-transform: uppercase;">Resumo Final da Caída</span>
          <p style="font-size: 15px; color: #2C2622; font-weight: bold; margin-top: 6px;">${oduJogo1.resumoFinal}</p>
        </div>
      `;
    }

    // BOTÕES DE AÇÃO DO FINAL DA LEITURA
    htmlResultado += `
      <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 10px;">
        <button onclick="prepararProximaPergunta()" class="btn-primary" style="background: #8B3524; color: #fff; width: 100%;">
          💬 Fazer Próxima Pergunta (${perguntasRestantes} restantes)
        </button>
        
        <button onclick="enviarHistoricoCompletoEmail('${emailUsuario}')" class="btn-secondary" style="width: 100%; border: 1px solid #8B3524; color: #8B3524; background: transparent; padding: 10px; border-radius: 30px; cursor: pointer;">
          📩 Receber Relatório das Consultas por E-mail
        </button>
        <div id="status-email-envio" style="font-size: 12px; color: #276749; text-align: center; margin-top: 4px;"></div>
      </div>
    `;

    resLeitura.innerHTML = htmlResultado;
    resLeitura.style.display = 'block';
    resLeitura.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    btn.disabled = false;

  }, 1200);
});
