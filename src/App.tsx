/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fuel, Leaf, Calculator, Info, Car, TrendingUp, Cpu } from 'lucide-react';

// Médias específicas para o Ford New Fiesta 2014 1.6 Sigma TiVCT
const EFFICIENCY = {
  ethanol: 8.85,
  gasoline: 12.65,
};

export default function App() {
  const [ethanolPrice, setEthanolPrice] = useState<string>('');
  const [gasolinePrice, setGasolinePrice] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const stats = useMemo(() => {
    const e = parseFloat(ethanolPrice);
    const g = parseFloat(gasolinePrice);

    if (isNaN(e) || isNaN(g) || e <= 0 || g <= 0) return null;

    const costPerKmEthanol = e / EFFICIENCY.ethanol;
    const costPerKmGasoline = g / EFFICIENCY.gasoline;
    const ratio = e / g;
    const targetRatio = EFFICIENCY.ethanol / EFFICIENCY.gasoline; // ~0.70
    const betterFuel = ratio <= targetRatio ? 'ethanol' : 'gasoline';
    
    const savings = Math.abs(costPerKmEthanol - costPerKmGasoline) * 100;

    return {
      costPerKmEthanol,
      costPerKmGasoline,
      ratio,
      targetRatio,
      betterFuel,
      savings
    };
  }, [ethanolPrice, gasolinePrice]);

  const handleCalculate = () => {
    if (ethanolPrice && gasolinePrice) {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 font-sans md:p-10 flex items-center justify-center selection:bg-[#00529b]/30 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[840px] min-h-screen md:min-h-0 md:h-[650px] bg-[#15171e] md:rounded-2xl border-x-0 md:border-x border-y border-slate-800 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Cabeçalho / Marcação */}
        <div className="h-20 border-b border-slate-800 flex items-center justify-between px-6 bg-[#1a1d24] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00529b] rounded flex items-center justify-center font-bold text-white italic shadow-lg shadow-[#00529b]/20">F</div>
            <div>
              <h1 className="text-base md:text-lg font-bold tracking-tight text-white uppercase leading-none">Análise de Combustível</h1>
              <p className="text-[9px] md:text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Sistema de Diagnóstico v2.5</p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-slate-300">NEW FIESTA 2014</div>
            <div className="text-[10px] text-slate-500 font-mono uppercase">1.6 Sigma TiVCT Flex</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
          {/* Esquerda: Entradas e Especificações */}
          <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-slate-800 p-6 md:p-8 flex flex-col gap-6 bg-[#171a21]">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Leaf size={12} className="text-emerald-500" />
                  Preço Etanol (L)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-mono">R$</span>
                  <input 
                    type="number" 
                    step="0.01"
                    inputMode="decimal"
                    value={ethanolPrice}
                    onChange={(e) => { setEthanolPrice(e.target.value); setShowResult(false); }}
                    placeholder="0,00"
                    className="w-full bg-[#0a0c10] border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-2xl font-mono text-white focus:outline-none focus:border-[#00529b] transition-all placeholder:text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Fuel size={12} className="text-amber-500" />
                  Preço Gasolina (L)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-mono">R$</span>
                  <input 
                    type="number" 
                    step="0.01"
                    inputMode="decimal"
                    value={gasolinePrice}
                    onChange={(e) => { setGasolinePrice(e.target.value); setShowResult(false); }}
                    placeholder="0,00"
                    className="w-full bg-[#0a0c10] border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-2xl font-mono text-white focus:outline-none focus:border-[#00529b] transition-all placeholder:text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="bg-[#0a0c10] rounded-xl p-4 border border-slate-800">
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-3 flex items-center justify-between">
                  <span>Consumo de Fábrica</span>
                  <Car size={10} />
                </div>
                <div className="space-y-3 font-mono">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-tight">Etanol</span>
                      <span className="text-xs font-bold text-[#a5d6a7]">{EFFICIENCY.ethanol} km/L</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        className="bg-[#2e7d32] h-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-tight">Gasolina</span>
                      <span className="text-xs font-bold text-[#fbc02d]">{EFFICIENCY.gasoline} km/L</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className="bg-[#fbc02d] h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleCalculate}
              className="w-full bg-[#00529b] hover:bg-[#003d73] active:scale-[0.98] text-white font-bold py-5 rounded-xl shadow-lg shadow-[#00529b]/20 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2 group mb-4 md:mb-0"
            >
              <Calculator size={16} className="group-hover:rotate-12 transition-transform" />
              Executar Cálculo de Custo
            </button>
          </div>

          {/* Direita: Resultados e Visualização */}
          <div className="flex-1 p-6 md:p-8 bg-[#15171e] relative flex flex-col min-h-[400px] md:min-h-0">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-20 h-20 rounded-full border border-slate-800 flex items-center justify-center text-slate-700 animate-pulse">
                    <Info size={32} />
                  </div>
                  <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">Aguardando preços locais...</p>
                </motion.div>
              ) : stats && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="h-full flex flex-col"
                >
                  <div className="text-center mb-6">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Eficiência Detectada</div>
                    <div className={`inline-block px-4 py-1 border rounded-full mb-4 text-[10px] font-bold uppercase tracking-widest ${
                      stats.betterFuel === 'ethanol' 
                        ? 'border-[#a5d6a7]/30 bg-[#1e4620]/20 text-[#a5d6a7]' 
                        : 'border-[#fbc02d]/30 bg-[#4a4117]/20 text-[#fbc02d]'
                    }`}>
                      Escolha Ideal Identificada
                    </div>
                    <h2 className={`text-4xl md:text-6xl font-black tracking-tighter mb-2 italic uppercase ${
                      stats.betterFuel === 'ethanol' ? 'text-[#a5d6a7]' : 'text-[#fbc02d]'
                    }`}>
                      {stats.betterFuel === 'ethanol' ? 'VÁ DE ETANOL' : 'VÁ DE GASOLINA'}
                    </h2>
                    <p className="text-slate-400 text-xs font-mono">A paridade atual é de <span className="text-white font-bold">{(stats.ratio * 100).toFixed(1)}%</span></p>
                  </div>

                  <div className="flex-1 flex items-center justify-center mb-6">
                    <div className="relative w-40 h-40 md:w-56 md:h-56">
                      {/* Medidor */}
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#1e293b" strokeWidth="12" />
                        <motion.circle 
                          cx="50%" cy="50%" r="45%" fill="none" 
                          stroke={stats.betterFuel === 'ethanol' ? '#2e7d32' : '#fbc02d'} 
                          strokeWidth="12" 
                          strokeDasharray="100 100"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: stats.ratio }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
                        <span className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase mb-1">Custo / KM</span>
                        <span className="text-2xl md:text-4xl font-mono font-bold text-white tracking-tighter leading-none">
                          R$ {(stats.betterFuel === 'ethanol' ? stats.costPerKmEthanol : stats.costPerKmGasoline).toFixed(3)}
                        </span>
                        <span className="text-[9px] md:text-[10px] text-[#a5d6a7] font-mono mt-2 flex items-center gap-1">
                          <TrendingUp size={10} />
                          -{stats.savings.toFixed(2)} economizados/100KM
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <div className="p-4 rounded-xl bg-[#0a0c10] border border-slate-800 shadow-inner">
                      <div className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase mb-1">Custo em 100km</div>
                      <div className={`text-base md:text-lg font-mono font-bold ${stats.betterFuel === 'ethanol' ? 'text-[#a5d6a7]' : 'text-[#fbc02d]'}`}>
                        R$ {( (stats.betterFuel === 'ethanol' ? stats.costPerKmEthanol : stats.costPerKmGasoline) * 100 ).toFixed(2)}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#0a0c10] border border-slate-800 opacity-60">
                      <div className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase mb-1">Alternativa</div>
                      <div className="text-base md:text-lg font-mono font-bold text-slate-400">
                        R$ {( (stats.betterFuel === 'ethanol' ? stats.costPerKmGasoline : stats.costPerKmEthanol) * 100 ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Rodapé Informativo */}
        <div className="h-12 bg-[#0a0c10] border-t border-slate-800 flex items-center justify-between px-6 shrink-0">
          <div className="text-[9px] md:text-[10px] text-slate-600 font-mono flex items-center gap-2">
            <Cpu size={12} className={showResult ? 'animate-pulse text-blue-500' : ''} />
            SISTEMA SINCRONIZADO // PRONTO PARA ENTRADA
          </div>
          <div className="flex items-center gap-4">
            <motion.span 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"
            ></motion.span>
            <span className="text-[9px] md:text-[10px] text-slate-600 font-mono italic">Limite: 0.699</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
