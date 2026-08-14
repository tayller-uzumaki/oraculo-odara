'use client';

import { useState } from 'react';
import { Sparkles, Compass, CreditCard, RefreshCw, Send, CheckCircle2, ShieldCheck, AlertTriangle, Lightbulb } from 'lucide-react';

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

  const [areaFoco, setAreaFoco] = useState('Amor & Relacionamentos');
  const [perguntaText, setPerguntaText] = useState('');
  const [jogandoBuzios, setJogandoBuzios] = useState(false);
  const [resultadoConsulta, setResultadoConsulta] = useState(null);

  const handleCalcularOdu = async (e) => {
    e.preventDefault();
    if (!dataNasc) return;
    setCarregandoOdu(true);

    setTimeout(() => {
      setOduDiretor({
        numero: 6,
        nome: "Obará",
        orixa: "Xangô e Oxóssi",
        elemento: "Ar / Terra",
        polaridade: "Masculino",
        caminho: "Obará traz a regência da prosperidade através da sabedoria, da justiça e do discernimento. É o Odù da transformação material pela força do trabalho e da mente. Quem nasce sob este caminho possui uma ligação forte com a fartura, mas aprende que a verdadeira riqueza surge do equilíbrio emocional e da generosidade.",
        pontosFortes: [
          "Grande capacidade de atração financeira e fartura.",
          "Liderança natural, forte carisma e presença marcante.",
          "Visão estratégica para negócios e resolução de conflitos.",
          "Proteção espiritual contra calúnias quando mantém a integridade."
        ],
        pontosAlerta: [
          "Cuidado com a vaidade excessiva e a ostentação.",
          "Evite contar seus planos antes de se concretizarem (inveja).",
          "Tendência ao orgulho e a querer resolver tudo sozinho.",
          "Atenção para não alternar entre momentos de extrema fartura e descuido financeiro."
        ]
      });
      setCarregandoOdu(false);
    }, 1000);
  };

  const handleGerarPix = async () => {
    setGerandoPix(true);
    setTimeout(() => {
      const valor = pacoteSelecionado === 'PACOTE_10' ? 39.99 : 25.99;
      setPixDados({
        valor,
        qrCode: "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865405" + valor.toFixed(2) + "5802BR5913Oraculo Odara6009Sao Paulo62070503***6304E2CA",
        perguntas: pacoteSelecionado === 'PACOTE_10' ? 10 : 5
      });
      setGerandoPix(false);
    }, 1200);
  };

  const handleSimularAprovacao = () => {
    const qtd = pacoteSelecionado === 'PACOTE_10' ? 10 : 5;
    setPerguntasRestantes(qtd);
    setPagamentoAprovado(true);
  };

  const handleConsultarOraculo = async (e) => {
    e.preventDefault();
    if (!perguntaText || perguntasRestantes <= 0) return;

    setJogandoBuzios(true);
    setResultadoConsulta(null);

    setTimeout(() => {
      setResultadoConsulta({
        buziosAbertos: 6,
        odu: { nome: "Obará", orixa: "Xangô / Oxóssi" },
        resposta: `✨ **Revelação do Odù Obará (6 Búzios Abertos)**\n\nOs búzios caíram revelando a prosperidade e clareza sob a regência de **Xangô e Oxóssi**.\n\n**Para a sua dúvida em ${areaFoco}:** "${perguntaText}"\n\nEste Odù ensina que o momento pede sabedoria, firmeza e fé. A abundância e a solução dos problemas estão ao seu alcance assim que você mantiver a mente positiva e tomar decisões estratégicas sem hesitar.`
      });
      setPerguntasRestantes(prev => prev - 1);
      setJogandoBuzios(false);
    }, 2500);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0714', color: '#f3f4f6', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Cabeçalho */}
        <header style={{ textAlign: 'center', padding: '30px 0', borderBottom: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', fontSize: '14px', marginBottom: '16px' }}>
            <Sparkles size={16} /> Oráculo Sagrado dos Orixás & Odùs
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fbbf24', margin: '10px 0' }}>
            ORÁCULO ODARA
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '16px' }}>
            Conecte-se com a sabedoria ancestral através da leitura numerológica dos Odùs e a magia sagrada dos búzios.
          </p>
        </header>

        <main style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Etapa 1 */}
          <section style={{ backgroundColor: '#180e29', padding: '24px', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ padding: '10px', backgroundColor: 'rgba(245, 158, 11, 0.2)', borderRadius: '10px', color: '#fbbf24' }}>
                <Compass size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fef3c7', margin: 0 }}>Etapa 1: Descubra seu Odù Diretor</h2>
                <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0 0' }}>Insira sua data de nascimento para calcular seu regente de vida gratuitamente.</p>
              </div>
            </div>

            <form onSubmit={handleCalcularOdu} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#d1d5db', marginBottom: '6px' }}>Seu Nome Completo</label>
                <input
                  type="text"
                  placeholder="Ex: Tayller Silva"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0d0714', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#d1d5db', marginBottom: '6px' }}>Data de Nascimento</label>
                <input
                  type="date"
                  required
                  value={dataNasc}
                  onChange={(e) => setDataNasc(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0d0714', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  type="submit"
                  disabled={carregandoOdu}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#f59e0b', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  {carregandoOdu ? <RefreshCw size={18} className="animate-spin" /> : 'Calcular Odù Diretor'}
                </button>
              </div>
            </form>

            {/* Resultado do Odù Diretor Expandido */}
            {oduDiretor && (
              <div style={{ marginTop: '24px', padding: '20px', backgroundColor: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#fbbf24', textTransform: 'uppercase' }}>Seu Regente Ancestral</span>
                    <h3 style={{ fontSize: '26px', fontWeight: 'bold', color: '#fef3c7', margin: '4px 0' }}>
                      Odù #{oduDiretor.numero} - {oduDiretor.nome}
                    </h3>
                  </div>
                  <span style={{ color: '#34d399', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={16} /> Odù Mapeado
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: 'rgba(245, 158, 11, 0.2)', borderRadius: '20px', fontSize: '12px', color: '#fde68a' }}>Orixás Regentes: {oduDiretor.orixa}</span>
                  <span style={{ padding: '4px 12px', backgroundColor: 'rgba(245, 158, 11, 0.2)', borderRadius: '20px', fontSize: '12px', color: '#fde68a' }}>Elemento: {oduDiretor.elemento}</span>
                </div>

                {/* Descrição do Caminho */}
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <h4 style={{ color: '#fbbf24', fontSize: '15px', fontWeight: 'bold', margin: '0 0 6px 0' }}>📜 O Caminho de {oduDiretor.nome}:</h4>
                  <p style={{ fontSize: '14px', color: '#e5e7eb', lineHeight: '1.6', margin: 0 }}>
                    {oduDiretor.caminho}
                  </p>
                </div>

                {/* Pontos Fortes e Alerta */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginTop: '16px' }}>
                  <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <h5 style={{ color: '#34d399', fontSize: '14px', fontWeight: 'bold', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Lightbulb size={16} /> Pontos Fortes
                    </h5>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#d1d5db' }}>
                      {oduDiretor.pontosFortes.map((item, index) => (
                        <li key={index} style={{ marginBottom: '4px' }}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    <h5 style={{ color: '#f87171', fontSize: '14px', fontWeight: 'bold', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertTriangle size={16} /> Pontos de Alerta
                    </h5>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#d1d5db' }}>
                      {oduDiretor.pontosAlerta.map((item, index) => (
                        <li key={index} style={{ marginBottom: '4px' }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            )}
          </section>

          {/* Etapa 2 */}
          {!pagamentoAprovado && (
            <section style={{ backgroundColor: '#180e29', padding: '24px', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '10px', backgroundColor: 'rgba(245, 158, 11, 0.2)', borderRadius: '10px', color: '#fbbf24' }}>
                  <CreditCard size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fef3c7', margin: 0 }}>Etapa 2: Escolha seu Pacote de Consulta</h2>
                  <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0 0' }}>Liberado instantaneamente via PIX.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div
                  onClick={() => setPacoteSelecionado('PACOTE_5')}
                  style={{
                    cursor: 'pointer',
                    padding: '16px',
                    borderRadius: '12px',
                    border: pacoteSelecionado === 'PACOTE_5' ? '2px solid #f59e0b' : '1px solid #374151',
                    backgroundColor: pacoteSelecionado === 'PACOTE_5' ? 'rgba(245, 158, 11, 0.1)' : '#0d0714'
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>Pacote Essencial</h3>
                  <p style={{ margin: '4px 0 12px 0', fontSize: '12px', color: '#9ca3af' }}>5 Perguntas ao Oráculo</p>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>R$ 25,99</span>
                </div>

                <div
                  onClick={() => setPacoteSelecionado('PACOTE_10')}
                  style={{
                    cursor: 'pointer',
                    padding: '16px',
                    borderRadius: '12px',
                    border: pacoteSelecionado === 'PACOTE_10' ? '2px solid #f59e0b' : '1px solid #374151',
                    backgroundColor: pacoteSelecionado === 'PACOTE_10' ? 'rgba(245, 158, 11, 0.1)' : '#0d0714'
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>Pacote Completo</h3>
                  <p style={{ margin: '4px 0 12px 0', fontSize: '12px', color: '#9ca3af' }}>10 Perguntas ao Oráculo</p>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>R$ 39,99</span>
                </div>
              </div>

              {!pixDados ? (
                <button
                  onClick={handleGerarPix}
                  disabled={gerandoPix}
                  style={{ width: '100%', padding: '14px', borderRadius: '10px', backgroundColor: '#f59e0b', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  {gerandoPix ? <RefreshCw size={20} className="animate-spin" /> : 'Gerar Pagamento PIX'}
                </button>
              ) : (
                <div style={{ backgroundColor: '#0d0714', padding: '20px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.4)', textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#fef3c7' }}>Pagamento PIX Gerado</h3>
                  <p style={{ wordBreak: 'break-all', fontSize: '12px', backgroundColor: '#180e29', padding: '10px', borderRadius: '8px', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                    {pixDados.qrCode}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '14px' }}>
                    <button
                      onClick={() => navigator.clipboard.writeText(pixDados.qrCode)}
                      style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.4)', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Copiar Código PIX
                    </button>
                    <button
                      onClick={handleSimularAprovacao}
                      style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#059669', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <ShieldCheck size={18} /> Confirmar Pagamento & Jogar
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Etapa 3 */}
          {pagamentoAprovado && (
            <section style={{ backgroundColor: '#180e29', padding: '24px', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fef3c7', margin: 0 }}>A Mesa Sagrada de Búzios</h2>
                <span style={{ padding: '6px 14px', backgroundColor: 'rgba(245, 158, 11, 0.2)', borderRadius: '10px', color: '#fbbf24', fontSize: '13px', fontWeight: 'bold' }}>
                  Perguntas Restantes: {perguntasRestantes}
                </span>
              </div>

              <form onSubmit={handleConsultarOraculo} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#d1d5db', marginBottom: '8px' }}>Área de Foco</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                    {['Amor & Relacionamentos', 'Trabalho & Finanças', 'Saúde & Vitalidade', 'Caminho Espiritual'].map((area) => (
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
                          border: areaFoco === area ? '1px solid #f59e0b' : '1px solid #374151',
                          backgroundColor: areaFoco === area ? '#f59e0b' : '#0d0714',
                          color: areaFoco === area ? '#000' : '#d1d5db'
                        }}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#d1d5db', marginBottom: '8px' }}>Sua Pergunta</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Escreva sua dúvida com clareza..."
                    value={perguntaText}
                    onChange={(e) => setPerguntaText(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0d0714', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={jogandoBuzios || perguntasRestantes <= 0 || !perguntaText}
                  style={{ width: '100%', padding: '14px', borderRadius: '10px', backgroundColor: '#f59e0b', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  {jogandoBuzios ? (
                    <>
                      <RefreshCw size={20} className="animate-spin" /> Lançando os Búzios...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Lançar Búzios na Mesa
                    </>
                  )}
                </button>
              </form>

              {resultadoConsulta && !jogandoBuzios && (
                <div style={{ marginTop: '20px', backgroundColor: '#0d0714', padding: '20px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                  <h3 style={{ fontSize: '20px', color: '#fef3c7', margin: '0 0 10px 0' }}>
                    {resultadoConsulta.buziosAbertos} Búzios Abertos - Odù {resultadoConsulta.odu?.nome}
                  </h3>
                  <div style={{ fontSize: '14px', color: '#e5e7eb', lineHeight: '1.6', whitespace: 'pre-line', backgroundColor: '#180e29', padding: '16px', borderRadius: '8px' }}>
                    {resultadoConsulta.resposta}
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
