'use client';

import { useState } from 'react';
import { Sparkles, Compass, CreditCard, RefreshCw, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

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
        orixa: "Xangô / Oxóssi",
        elemento: "Ar",
        polaridade: "Masculino"
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
    <div className="min-h-screen bg-[#0d0714] text-gray-100 flex flex-col items-center justify-between p-4 md:p-8">
      <header className="w-full max-w-4xl text-center py-8 border-b border-amber-500/20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" /> Oráculo Sagrado dos Orixás & Odùs
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">
          ORÁCULO ODARA
        </h1>
        <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
          Conecte-se com a sabedoria ancestral através da leitura numerológica dos Odùs e a magia sagrada dos búzios.
        </p>
      </header>

      <main className="w-full max-w-4xl my-8 space-y-12">
        <section className="bg-gradient-to-b from-[#180e29] to-[#120a1f] p-6 md:p-8 rounded-2xl border border-amber-500/30 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-amber-200">Etapa 1: Descubra seu Odù Diretor</h2>
              <p className="text-sm text-gray-400">Insira sua data de nascimento para calcular seu regente de vida gratuitamente.</p>
            </div>
          </div>

          <form onSubmit={handleCalcularOdu} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Seu Nome Completo</label>
              <input
                type="text"
                placeholder="Ex: Maria Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-[#0d0714] border border-amber-500/30 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-amber-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Data de Nascimento</label>
              <input
                type="date"
                required
                value={dataNasc}
                onChange={(e) => setDataNasc(e.target.value)}
                className="w-full bg-[#0d0714] border border-amber-500/30 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-amber-400 transition"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={carregandoOdu}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold py-3 px-6 rounded-xl shadow-lg transition duration-200 flex items-center justify-center gap-2"
              >
                {carregandoOdu ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Calcular Odù Diretor'}
              </button>
            </div>
          </form>

          {oduDiretor && (
            <div className="mt-8 p-6 bg-amber-500/10 border border-amber-500/40 rounded-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-400">Seu Regente Ancestral</span>
                  <h3 className="text-3xl font-extrabold text-amber-200 mt-1">
                    Odù #{oduDiretor.numero} - {oduDiretor.nome}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full border border-amber-500/30">Orixá: {oduDiretor.orixa}</span>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full border border-amber-500/30">Elemento: {oduDiretor.elemento}</span>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <span className="inline-flex items-center gap-1 text-emerald-400 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> Odù Mapeado
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>

        {!pagamentoAprovado && (
          <section className="bg-gradient-to-b from-[#180e29] to-[#120a1f] p-6 md:p-8 rounded-2xl border border-amber-500/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-200">Etapa 2: Escolha seu Pacote de Consulta</h2>
                <p className="text-sm text-gray-400">Liberado instantaneamente via PIX.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div
                onClick={() => setPacoteSelecionado('PACOTE_5')}
                className={`cursor-pointer p-6 rounded-2xl border transition ${
                  pacoteSelecionado === 'PACOTE_5' ? 'border-amber-400 bg-amber-500/10' : 'border-gray-800 bg-[#0d0714]'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-100">Pacote Essencial</h3>
                    <p className="text-sm text-gray-400">5 Perguntas ao Oráculo</p>
                  </div>
                  <span className="text-2xl font-extrabold text-amber-400">R$ 25,99</span>
                </div>
              </div>

              <div
                onClick={() => setPacoteSelecionado('PACOTE_10')}
                className={`cursor-pointer p-6 rounded-2xl border transition relative ${
                  pacoteSelecionado === 'PACOTE_10' ? 'border-amber-400 bg-amber-500/10' : 'border-gray-800 bg-[#0d0714]'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-100">Pacote Completo</h3>
                    <p className="text-sm text-gray-400">10 Perguntas ao Oráculo</p>
                  </div>
                  <span className="text-2xl font-extrabold text-amber-400">R$ 39,99</span>
                </div>
              </div>
            </div>

            {!pixDados ? (
              <button
                onClick={handleGerarPix}
                disabled={gerandoPix}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-extrabold py-4 px-8 rounded-xl shadow-xl flex items-center justify-center gap-2 text-lg"
              >
                {gerandoPix ? <RefreshCw className="w-6 h-6 animate-spin" /> : 'Gerar Pagamento PIX'}
              </button>
            ) : (
              <div className="bg-[#0d0714] p-6 rounded-2xl border border-amber-500/40 text-center space-y-4">
                <h3 className="text-lg font-bold text-amber-200">Pagamento PIX Gerado</h3>
                <div className="bg-[#180e29] p-3 rounded-xl text-xs font-mono text-amber-300 break-all border border-amber-500/20">
                  {pixDados.qrCode}
                </div>
                <div className="pt-2 flex flex-col md:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigator.clipboard.writeText(pixDados.qrCode)}
                    className="bg-amber-500/20 text-amber-300 font-bold py-2.5 px-6 rounded-xl border border-amber-500/30 text-sm"
                  >
                    Copiar Código PIX
                  </button>
                  <button
                    onClick={handleSimularAprovacao}
                    className="bg-emerald-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg text-sm flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5" /> Confirmar Pagamento & Jogar
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {pagamentoAprovado && (
          <section className="bg-gradient-to-b from-[#180e29] to-[#120a1f] p-6 md:p-8 rounded-2xl border border-amber-500/50 shadow-2xl space-y-8">
            <div className="flex justify-between items-center border-b border-amber-500/20 pb-6">
              <h2 className="text-3xl font-extrabold text-amber-200">A Mesa Sagrada de Búzios</h2>
              <span className="px-4 py-2 bg-amber-500/20 rounded-xl border border-amber-500/40 text-amber-300 text-sm font-bold">
                Perguntas Restantes: {perguntasRestantes}
              </span>
            </div>

            <form onSubmit={handleConsultarOraculo} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Área de Foco</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Amor & Relacionamentos', 'Trabalho & Finanças', 'Saúde & Vitalidade', 'Caminho Espiritual'].map((area) => (
                    <button
                      type="button"
                      key={area}
                      onClick={() => setAreaFoco(area)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                        areaFoco === area ? 'bg-amber-500 text-black border-amber-400' : 'bg-[#0d0714] text-gray-300 border-gray-800'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Sua Pergunta</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Escreva sua dúvida com clareza..."
                  value={perguntaText}
                  onChange={(e) => setPerguntaText(e.target.value)}
                  className="w-full bg-[#0d0714] border border-amber-500/30 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <button
                type="submit"
                disabled={jogandoBuzios || perguntasRestantes <= 0 || !perguntaText}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-black py-4 px-8 rounded-xl shadow-2xl flex items-center justify-center gap-3 text-lg"
              >
                {jogandoBuzios ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" /> Lançando os Búzios...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Lançar Búzios na Mesa
                  </>
                )}
              </button>
            </form>

            {resultadoConsulta && !jogandoBuzios && (
              <div className="bg-[#0d0714] p-6 rounded-2xl border border-amber-500/40 space-y-4">
                <h3 className="text-2xl font-bold text-amber-200">
                  {resultadoConsulta.buziosAbertos} Búzios Abertos - Odù {resultadoConsulta.odu?.nome}
                </h3>
                <div className="text-gray-200 text-sm leading-relaxed whitespace-pre-line bg-[#180e29]/50 p-6 rounded-xl">
                  {resultadoConsulta.resposta}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
