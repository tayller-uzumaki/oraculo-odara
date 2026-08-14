'use client';

import { useState } from 'react';

// Banco de Dados Completo com os 16 Odùs Tradicionais
const ODUS_DATABASE = {
  1: {
    numero: 1, nome: "Okaran", orixa: "Exu", elemento: "Fogo",
    caminho: "Caminho da transformação rápida, do dinamismo e da abertura de caminhos. Okaran exige atenção para evitar impulsividade, mas traz uma capacidade única de romper obstáculos e recomeçar.",
    pontosFortes: ["Força de iniciativa e coragem", "Capacidade de superar crises rapidamente", "Independência e liderança"],
    pontosAlerta: ["Cuidado com a agressividade ou grosseria", "Evite tomar decisões no impulso da raiva", "Atenção a conflitos desnecessários"]
  },
  2: {
    numero: 2, nome: "Ejioko", orixa: "Ibejis e Ogum", elemento: "Ar",
    caminho: "Caminho da dualidade, da união e das escolhas. Indica a busca constante por equilíbrio emocional e material. Traz forte intuição e proteção em parcerias.",
    pontosFortes: ["Diplomacia e facilidade de convivência", "Forte intuição e percepção", "Sucesso em parcerias e sociedades"],
    pontosAlerta: ["Indecisão e insegurança", "Dependência emocional dos outros", "Tendência a remoer o passado"]
  },
  3: {
    numero: 3, nome: "Etaogundá", orixa: "Ogum", elemento: "Terra",
    caminho: "Caminho do guerreiro, da superação e do trabalho duro. A pessoa regida por este Odù vence na vida com o próprio esforço e persistência inabalável.",
    pontosFortes: ["Enorme determinação e força de vontade", "Proteção contra injustiças", "Capacidade de liderar projetos difíceis"],
    pontosAlerta: ["Teimosia excessiva", "Tendência ao estresse e exaustão", "Atenção com acidentes por descuido"]
  },
  4: {
    numero: 4, nome: "Irosun", orixa: "Iemanjá e Oxossi", elemento: "Terra",
    caminho: "Caminho da sabedoria ancestral, da cautela e do mistério. Representa a paciência, o olhar profundo sobre a vida e o respeito à intuição.",
    pontosFortes: ["Visão estratégica a longo prazo", "Forte intuição e sensibilidade espiritual", "Capacidade de dar bons conselhos"],
    pontosAlerta: ["Isolamento excessivo ou melancolia", "Ilusões e falsas expectativas", "Cuidado com a ingenuidade com estranhos"]
  },
  5: {
    numero: 5, nome: "Oxê", orixa: "Oxum", elemento: "Água",
    caminho: "Caminho da beleza, da sensibilidade, da prosperidade e do amor. Traz grande magnetismo pessoal e facilidade para atrair oportunidades.",
    pontosFortes: ["Carisma e encanto natural", "Sensibilidade artística e criatividade", "Atração de prosperidade e abundância"],
    pontosAlerta: ["Inconstância emocional", "Cuidado com gastos impulsivos", "Vulnerabilidade a ciúmes e inveja"]
  },
  6: {
    numero: 6, nome: "Obará", orixa: "Xangô e Oxóssi", elemento: "Ar / Terra",
    caminho: "Obará traz a regência da prosperidade através da sabedoria, da justiça e do discernimento. É o Odù da transformação material pela força da mente.",
    pontosFortes: ["Grande capacidade de atração financeira", "Carisma e liderança marcante", "Proteção contra calúnias ao manter a integridade"],
    pontosAlerta: ["Cuidado com a vaidade e ostentação", "Evite contar planos antes de realizá-los", "Orgulho excessivo"]
  },
  7: {
    numero: 7, nome: "Odi", orixa: "Obaluaê e Oxalufã", elemento: "Terra",
    caminho: "Caminho da resistência, do encerramento de ciclos e do renascimento. Ensina que após momentos de provação surge a estabilidade duradoura.",
    pontosFortes: ["Firmeza de caráter e resiliência", "Capacidade de recomeçar do zero e vencer", "Proteção para a saúde física e espiritual"],
    pontosAlerta: ["Apegos ao passado ou ressentimentos", "Rigidez excessiva", "Tendência ao pessimismo em momentos difíceis"]
  },
  8: {
    numero: 8, nome: "Ejionile", orixa: "Oxaguiã / Oxalá", elemento: "Ar",
    caminho: "Caminho da paz, da liderança ética, da clareza e da busca pela perfeição. Exige serenidade e sabedoria para governar a própria vida.",
    pontosFortes: ["Visão ampla e inteligência elevada", "Liderança pacífica e respeitada", "Proteção espiritual constante"],
    pontosAlerta: ["Ansiedade e excesso de pensamentos", "Perfeccionismo sufocante", "Impaciência com o ritmo alheio"]
  },
  9: {
    numero: 9, nome: "Osa", orixa: "Oyá (Iansã) e Yemanja", elemento: "Fogo / Água",
    caminho: "Caminho do vento, da transformação rápida, da liberdade e da intuição afiada. Traz movimento constante e coragem para inovar.",
    pontosFortes: ["Adaptação rápida a mudanças", "Forte intuição e mediunidade", "Independência e coragem"],
    pontosAlerta: ["Inquietude e falta de foco", "Explosões temperamentais", "Dificuldade em manter rotinas longas"]
  },
  10: {
    numero: 10, nome: "Ofun", orixa: "Oxalá", elemento: "Ar",
    caminho: "Caminho da pureza, do respeito aos mais velhos, da sabedoria superior e da fartura. Exige conduta moral elevada para manter a sorte.",
    pontosFortes: ["Respeito e autoridade moral", "Grande sabedoria de vida", "Proteção espiritual contra males profundos"],
    pontosAlerta: ["Evitar soberba e prepotência", "Cuidado com contaminações espirituais", "Tendência ao isolamento"]
  },
  11: {
    numero: 11, nome: "Owonrin", orixa: "Exu e Oyá", elemento: "Fogo",
    caminho: "Caminho do dinamismo, da imprevistabilidade e da sorte inesperada. Ensina que as maiores oportunidades surgem das mudanças repentinas.",
    pontosFortes: ["Agilidade mental e perspicácia", "Sorte em momentos de reviravolta", "Criatividade para sair de crises"],
    pontosAlerta: ["Desorganização ou pressa", "Inconstância em compromissos", "Cuidado com distrações"]
  },
  12: {
    numero: 12, nome: "Ejilaxeborá", orixa: "Xangô", elemento: "Fogo",
    caminho: "Caminho da justiça rigorosa, da honra e do triunfo. Traz proteção contra injustiças e recompensa para quem age com verdade.",
    pontosFortes: ["Senso imparcial de justiça e ética", "Autoridade natural", "Triunfo sobre processos e disputas"],
    pontosAlerta: ["Julgar os outros com rigor excessivo", "Orgulho elevado", "Cuidado com dores de cabeça causadas por estresse"]
  },
  13: {
    numero: 13, nome: "Okanran Meji", orixa: "Nanã e Obaluaê", elemento: "Terra",
    caminho: "Caminho da maturidade, da cura e da calma. Ensina a ter paciência para colher os frutos no tempo certo.",
    pontosFortes: ["Sabedoria profunda e paciência", "Poder de cura física e emocional", "Estabilidade duradoura"],
    pontosAlerta: ["Lentidão excessiva nas tomadas de decisão", "Resistência a novidades", "Ressentimentos antigos"]
  },
  14: {
    numero: 14, nome: "Iká", orixa: "Oxumaré", elemento: "Água / Ar",
    caminho: "Caminho da renovação, da flexibilidade e da conquista de horizontes distantes. Traz capacidade de se reinventar constantemente.",
    pontosFortes: ["Flexibilidade e capacidade de adaptação", "Visão de futuro e inovação", "Capacidade de atrair prosperidade de várias fontes"],
    pontosAlerta: ["Falta de raízes ou inconsistência", "Desperdício de energia em muitas coisas ao mesmo tempo", "Falsas promessas"]
  },
  15: {
    numero: 15, nome: "Obeogundá", orixa: "Ewá e Ogum", elemento: "Ar",
    caminho: "Caminho do discernimento, do mistério e da proteção espiritual elevada. Garante a capacidade de enxergar o que os outros não vêem.",
    pontosFortes: ["Intuição aguçada e percepção espiritual", "Proteção contra falsidades", "Agilidade mental"],
    pontosAlerta: ["Atenção a desconfianças infundadas", "Isolamento emocional", "Nervosismo acumulado"]
  },
  16: {
    numero: 16, nome: "Alafia", orixa: "Orunmilá e Oxalá", elemento: "Luz / Ar",
    caminho: "Caminho da luz total, da paz de espírito, do sucesso pleno e da bênção divina. Representa o ápice da realização espiritual e material.",
    pontosFortes: ["Harmonia em todas as áreas da vida", "Clareza mental e paz interior", "Grande proteção divina e boa sorte"],
    pontosAlerta: ["Acomodação por excesso de facilidade", "Excesso de ingenuidade perante pessoas más", "Desatenção a pequenos detalhes"]
  }
};

export default function Home() {
  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [oduDiretor, setOduDiretor] = useState(null);
  const [carregandoOdu, setCarregandoOdu] = useState(false);

  const [pacoteSelecionado, setPacoteSelecionado] = useState('PACOTE_5');
  const [pixDados, setPixDados] = useState(null);
  const [gerandoPix, setGerandoPix] = useState(false);
  const [pagamentoAprovado, setPagamentoAprovado] = useState(false);
  const [perguntasRestantes, setPerguntasRestantes] = useState(0);

  const [areaFoco, setAreaFoco] = useState('Trabalho & Finanças');
  const [perguntaText, setPerguntaText] = useState('');
  const [jogandoBuzios, setJogandoBuzios] = useState(false);
  const [resultadoConsulta, setResultadoConsulta] = useState(null);

  // Cálculo de numerologia real dos Odùs (1 a 16)
  const calcularOduNumerologia = (dataStr) => {
    if (!dataStr) return 6;
    const numeros = dataStr.replace(/\D/g, '');
    let soma = numeros.split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    while (soma > 16) {
      soma = soma.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    }
    return soma === 0 ? 1 : soma;
  };

  const handleCalcularOdu = (e) => {
    e.preventDefault();
    if (!dataNasc) return;
    setCarregandoOdu(true);

    setTimeout(() => {
      const numeroOdu = calcularOduNumerologia(dataNasc);
      const oduInfo = ODUS_DATABASE[numeroOdu] || ODUS_DATABASE[6];
      setOduDiretor(oduInfo);
      setCarregandoOdu(false);
    }, 800);
  };

  const handleGerarPix = () => {
    setGerandoPix(true);
    setTimeout(() => {
      const valor = pacoteSelecionado === 'PACOTE_10' ? 39.99 : 25.99;
      setPixDados({
        valor,
        qrCode: "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865405" + valor.toFixed(2) + "5802BR5913Oraculo Odara6009Sao Paulo62070503***6304E2CA",
        perguntas: pacoteSelecionado === 'PACOTE_10' ? 10 : 5
      });
      setGerandoPix(false);
    }, 800);
  };

  const handleSimularAprovacao = () => {
    const qtd = pacoteSelecionado === 'PACOTE_10' ? 10 : 5;
    setPerguntasRestantes(qtd);
    setPagamentoAprovado(true);
  };

  const handleConsultarOraculo = (e) => {
    e.preventDefault();
    if (!perguntaText || perguntasRestantes <= 0) return;

    setJogandoBuzios(true);
    setResultadoConsulta(null);

    setTimeout(() => {
      const oduAtual = oduDiretor ? oduDiretor : ODUS_DATABASE[6];

      // Gerador de Resposta Completa e Estruturada por Categoria
      const respostasDetalhadas = {
        "Trabalho & Finanças": {
          presagio: `Os 16 búzios caíram revelando a energia dominante de ${oduAtual.nome} (regido por ${oduAtual.orixa}). Para a sua pergunta: "${perguntaText}", o oráculo indica um momento de movimento e abertura de portas profissionais, contanto que você aja com estratégia e determinação.`,
          conselho: `Não espere passivamente pelas oportunidades. O caminho do Odù ${oduAtual.nome} exige clareza e posicionamento firme. É o momento ideal para atualizar seus conhecimentos, networking e demonstrar confiança nas suas competências.`,
          alerta: `Cuidado com conversas paralelas no ambiente de trabalho e com o hábito de divulgar seus projetos antes que o contrato esteja assinado. A energia da inveja pode ser neutralizada com silêncio estratégico.`,
          orientacao: `Acenda uma vela branca ou amarela pedindo clareza mental e abertura de caminhos a ${oduAtual.orixa}. Um banho de alecrim com louro trará foco e magnetismo para entrevistas e reuniões.`
        },
        "Amor & Relacionamentos": {
          presagio: `A caída traz a vibração do Odù ${oduAtual.nome} (regência de ${oduAtual.orixa}). Sobre a sua questão: "${perguntaText}", os búzios mostram a necessidade de reequilíbrio nas trocas afetivas e clareza sobre o que você realmente deseja vivenciar a dois.`,
          conselho: `Cultive o amor-próprio e o diálogo sincero. Este Odù favorece encontros de almas e fortalecimento de laços quando há maturidade emocional e respeito mútuo.`,
          alerta: `Evite guardar insatisfações até que elas explodam em brigas desnecessárias. Cuidado com o ciúme reflexivo e a mania de comparar sua vida amorosa com a de outras pessoas.`,
          orientacao: `Tome um banho de rosas brancas com camomila do pescoço para baixo. Mentalize a harmonização das suas emoções e a atração de conexões sinceras e respeitosas.`
        },
        "Saúde & Vitalidade": {
          presagio: `A regência do Odù ${oduAtual.nome} na área de Saúde pede atenção ao equilíbrio entre corpo, mente e espírito para a questão: "${perguntaText}".`,
          conselho: `Priorize noites de sono reparadoras e momentos de desaceleração. Sua vitalidade responde diretamente à sua saúde emocional e ao nível de estresse acumulado.`,
          alerta: `Não ignore pequenos sinais de cansaço ou dores físicas persistentes. Evite excesso de autocrítica e preocupações com problemas que ainda nem aconteceram.`,
          orientacao: `Beba bastante água fresca e faça uma limpeza energética na sua casa com defumação simples de sabugueiro ou manjericão para renovar o ar espiritual.`
        },
        "Caminho Espiritual": {
          presagio: `Sob o Odù ${oduAtual.nome} e a regência ancestral de ${oduAtual.orixa}, a resposta para "${perguntaText}" indica um chamado claro para o fortalecimento da sua intuição e conexão com seus protetores.`,
          conselho: `Dedique momentos diários de silêncio, oração ou meditação. Sua sensibilidade espiritual está aguçada e você receberá intuições claras através de sonhos ou pensamentos recorrentes.`,
          alerta: `Fique atento para não absorver cargas emocionais pesadas dos ambientes ou de pessoas próximas. Aprenda a filtrar o que é seu e o que pertence aos outros.`,
          orientacao: `Faça um banho de folha de colônia ou manjericão branco para proteger sua aura e acenda uma vela de 7 dias para o seu Anjo da Guarda.`
        }
      };

      const conteudoResposta = respostasDetalhadas[areaFoco] || respostasDetalhadas["Trabalho & Finanças"];

      setResultadoConsulta({
        buziosAbertos: oduAtual.numero,
        odu: oduAtual,
        conteudo: conteudoResposta
      });

      setPerguntasRestantes(prev => prev - 1);
      setJogandoBuzios(false);
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0b0612', color: '#f3f4f6', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        {/* CABEÇALHO */}
        <header style={{ textAlign: 'center', padding: '24px 10px', borderBottom: '1px solid #332147', marginBottom: '24px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '20px', backgroundColor: '#28173d', color: '#fbbf24', fontSize: '13px', fontWeight: 'bold' }}>
            ✨ Oráculo Sagrado dos Orixás & Odùs
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fbbf24', margin: '12px 0 6px 0' }}>
            ORÁCULO ODARA
          </h1>
          <p style={{ color: '#a1a1aa', fontSize: '15px', margin: 0 }}>
            Conecte-se com a sabedoria ancestral através da leitura numerológica dos Odùs e a magia sagrada dos búzios.
          </p>
        </header>

        <main style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* ETAPA 1 */}
          <section style={{ backgroundColor: '#150a24', padding: '24px', borderRadius: '16px', border: '1px solid #332147' }}>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>🧭 Etapa 1: Descubra seu Odù Diretor</h2>
              <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '4px 0 0 0' }}>Insira sua data de nascimento para calcular seu regente de vida gratuitamente.</p>
            </div>

            <form onSubmit={handleCalcularOdu} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#d4d4d8', marginBottom: '6px' }}>Seu Nome Completo</label>
                <input
                  type="text"
                  placeholder="Ex: Tayller Silva"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0b0612', border: '1px solid #332147', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#d4d4d8', marginBottom: '6px' }}>Data de Nascimento</label>
                <input
                  type="date"
                  required
                  value={dataNasc}
                  onChange={(e) => setDataNasc(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0b0612', border: '1px solid #332147', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  type="submit"
                  disabled={carregandoOdu}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#f59e0b', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                >
                  {carregandoOdu ? 'Calculando...' : 'Calcular Odù Diretor'}
                </button>
              </div>
            </form>

            {/* Resultado do Odù Diretor */}
            {oduDiretor && (
              <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#1c0f30', border: '1px solid #f59e0b', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fbbf24', textTransform: 'uppercase' }}>Seu Regente Ancestral</span>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '4px 0' }}>
                      Odù #{oduDiretor.numero} - {oduDiretor.nome}
                    </h3>
                  </div>
                  <span style={{ color: '#34d399', fontSize: '13px', fontWeight: 'bold' }}>
                    ✓ Odù Mapeado
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: '#28173d', borderRadius: '20px', fontSize: '12px', color: '#fde68a' }}>Orixá: {oduDiretor.orixa}</span>
                  <span style={{ padding: '4px 12px', backgroundColor: '#28173d', borderRadius: '20px', fontSize: '12px', color: '#fde68a' }}>Elemento: {oduDiretor.elemento}</span>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #332147' }}>
                  <h4 style={{ color: '#fbbf24', fontSize: '15px', fontWeight: 'bold', margin: '0 0 6px 0' }}>📜 O Caminho do seu Odù:</h4>
                  <p style={{ fontSize: '14px', color: '#e4e4e7', lineHeight: '1.6', margin: 0 }}>
                    {oduDiretor.caminho}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginTop: '16px' }}>
                  <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <h5 style={{ color: '#34d399', fontSize: '14px', fontWeight: 'bold', margin: '0 0 8px 0' }}>💡 Pontos Fortes</h5>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#d4d4d8' }}>
                      {oduDiretor.pontosFortes.map((item, index) => (
                        <li key={index} style={{ marginBottom: '4px' }}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    <h5 style={{ color: '#f87171', fontSize: '14px', fontWeight: 'bold', margin: '0 0 8px 0' }}>⚠️ Pontos de Alerta</h5>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#d4d4d8' }}>
                      {oduDiretor.pontosAlerta.map((item, index) => (
                        <li key={index} style={{ marginBottom: '4px' }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            )}
          </section>

          {/* ETAPA 2 */}
          {!pagamentoAprovado && (
            <section style={{ backgroundColor: '#150a24', padding: '24px', borderRadius: '16px', border: '1px solid #332147' }}>
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>💳 Etapa 2: Escolha seu Pacote de Consulta</h2>
                <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '4px 0 0 0' }}>Liberado instantaneamente via PIX.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                <div
                  onClick={() => setPacoteSelecionado('PACOTE_5')}
                  style={{
                    cursor: 'pointer',
                    padding: '16px',
                    borderRadius: '12px',
                    border: pacoteSelecionado === 'PACOTE_5' ? '2px solid #f59e0b' : '1px solid #332147',
                    backgroundColor: pacoteSelecionado === 'PACOTE_5' ? '#28173d' : '#0b0612'
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>Pacote Essencial</h3>
                  <p style={{ margin: '4px 0 10px 0', fontSize: '12px', color: '#a1a1aa' }}>5 Perguntas ao Oráculo</p>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>R$ 25,99</span>
                </div>

                <div
                  onClick={() => setPacoteSelecionado('PACOTE_10')}
                  style={{
                    cursor: 'pointer',
                    padding: '16px',
                    borderRadius: '12px',
                    border: pacoteSelecionado === 'PACOTE_10' ? '2px solid #f59e0b' : '1px solid #332147',
                    backgroundColor: pacoteSelecionado === 'PACOTE_10' ? '#28173d' : '#0b0612'
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>Pacote Completo</h3>
                  <p style={{ margin: '4px 0 10px 0', fontSize: '12px', color: '#a1a1aa' }}>10 Perguntas ao Oráculo</p>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>R$ 39,99</span>
                </div>
              </div>

              {!pixDados ? (
                <button
                  onClick={handleGerarPix}
                  disabled={gerandoPix}
                  style={{ width: '100%', padding: '14px', borderRadius: '8px', backgroundColor: '#f59e0b', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                >
                  {gerandoPix ? 'Gerando PIX...' : 'Gerar Pagamento PIX'}
                </button>
              ) : (
                <div style={{ backgroundColor: '#0b0612', padding: '20px', borderRadius: '12px', border: '1px solid #f59e0b', textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#fff' }}>Pagamento PIX Gerado</h3>
                  <p style={{ wordBreak: 'break-all', fontSize: '11px', backgroundColor: '#150a24', padding: '10px', borderRadius: '8px', color: '#fbbf24', border: '1px solid #332147' }}>
                    {pixDados.qrCode}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '14px' }}>
                    <button
                      onClick={() => navigator.clipboard.writeText(pixDados.qrCode)}
                      style={{ padding: '10px 18px', borderRadius: '8px', backgroundColor: '#28173d', color: '#fbbf24', border: '1px solid #f59e0b', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Copiar PIX
                    </button>
                    <button
                      onClick={handleSimularAprovacao}
                      style={{ padding: '10px 18px', borderRadius: '8px', backgroundColor: '#059669', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      🛡️ Confirmar Pagamento & Jogar
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ETAPA 3 */}
          {pagamentoAprovado && (
            <section style={{ backgroundColor: '#150a24', padding: '24px', borderRadius: '16px', border: '1px solid #f59e0b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>🐚 A Mesa Sagrada de Búzios</h2>
                <span style={{ padding: '6px 12px', backgroundColor: '#28173d', borderRadius: '8px', color: '#fbbf24', fontSize: '13px', fontWeight: 'bold' }}>
                  Perguntas Restantes: {perguntasRestantes}
                </span>
              </div>

              <form onSubmit={handleConsultarOraculo} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#d4d4d8', marginBottom: '6px' }}>Área de Foco</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                    {['Trabalho & Finanças', 'Amor & Relacionamentos', 'Saúde & Vitalidade', 'Caminho Espiritual'].map((area) => (
                      <button
                        type="button"
                        key={area}
                        onClick={() => setAreaFoco(area)}
                        style={{
                          padding: '10px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          border: areaFoco === area ? '1px solid #f59e0b' : '1px solid #332147',
                          backgroundColor: areaFoco === area ? '#f59e0b' : '#0b0612',
                          color: areaFoco === area ? '#000' : '#d4d4d8'
                        }}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#d4d4d8', marginBottom: '6px' }}>Sua Pergunta</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Escreva sua dúvida com clareza..."
                    value={perguntaText}
                    onChange={(e) => setPerguntaText(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0b0612', border: '1px solid #332147', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={jogandoBuzios || perguntasRestantes <= 0 || !perguntaText}
                  style={{ width: '100%', padding: '14px', borderRadius: '8px', backgroundColor: '#f59e0b', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                >
                  {jogandoBuzios ? 'Lançando os Búzios na Mesa...' : '🔮 Lançar Búzios na Mesa'}
                </button>
              </form>

              {/* REVELAÇÃO DETALHADA DO BÚZIO */}
              {resultadoConsulta && !jogandoBuzios && (
                <div style={{ marginTop: '24px', backgroundColor: '#0b0612', padding: '20px', borderRadius: '12px', border: '1px solid #f59e0b' }}>
                  <div style={{ borderBottom: '1px solid #332147', paddingBottom: '12px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '12px', color: '#fbbf24', textTransform: 'uppercase', fontWeight: 'bold' }}>
                      {resultadoConsulta.buziosAbertos} Búzios Abertos na Mesa
                    </span>
                    <h3 style={{ fontSize: '22px', color: '#fff', margin: '4px 0 0 0', fontWeight: 'bold' }}>
                      Revelação do Odù {resultadoConsulta.odu?.nome} ({resultadoConsulta.odu?.orixa})
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ backgroundColor: '#150a24', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                      <h4 style={{ color: '#fbbf24', margin: '0 0 6px 0', fontSize: '14px', fontWeight: 'bold' }}>🔮 Preságio do Oráculo</h4>
                      <p style={{ color: '#e4e4e7', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                        {resultadoConsulta.conteudo.presagio}
                      </p>
                    </div>

                    <div style={{ backgroundColor: '#150a24', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #34d399' }}>
                      <h4 style={{ color: '#34d399', margin: '0 0 6px 0', fontSize: '14px', fontWeight: 'bold' }}>💡 Conselho Estratégico</h4>
                      <p style={{ color: '#e4e4e7', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                        {resultadoConsulta.conteudo.conselho}
                      </p>
                    </div>

                    <div style={{ backgroundColor: '#150a24', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #f87171' }}>
                      <h4 style={{ color: '#f87171', margin: '0 0 6px 0', fontSize: '14px', fontWeight: 'bold' }}>⚠️ Pontos de Alerta</h4>
                      <p style={{ color: '#e4e4e7', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                        {resultadoConsulta.conteudo.alerta}
                      </p>
                    </div>

                    <div style={{ backgroundColor: '#150a24', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #a78bfa' }}>
                      <h4 style={{ color: '#a78bfa', margin: '0 0 6px 0', fontSize: '14px', fontWeight: 'bold' }}>🌿 Recomendação & Harmonização</h4>
                      <p style={{ color: '#e4e4e7', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                        {resultadoConsulta.conteudo.orientacao}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

        </main>
      </div>
    </div>
  );
}
