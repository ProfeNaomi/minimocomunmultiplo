import React, { useState, useMemo } from 'react';
import { Instagram } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const colors = ['#3b82f6', '#ec4899', '#8b5cf6', '#f97316'];

export default function App() {
  const [inputs, setInputs] = useState<string[]>(['2', '3', '', '']);
  const maxNumber = 100;

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const validNumbers = useMemo(() => {
    return inputs.map(n => parseInt(n)).filter(n => !isNaN(n) && n > 0);
  }, [inputs]);

  const mcm = useMemo(() => {
    if (validNumbers.length < 2) return null;
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);
    return validNumbers.reduce((acc, curr) => lcm(acc, curr));
  }, [validNumbers]);

  const commonMultiples = useMemo(() => {
    if (!mcm) return [];
    const common = [];
    for (let i = mcm; i <= maxNumber; i += mcm) {
      common.push(i);
    }
    return common;
  }, [mcm]);

  return (
    <div className="min-h-screen bg-stone-50 pb-32 font-sans">
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-8 text-center mt-4">
          <h1 className="text-4xl font-extrabold text-stone-800 mb-4 tracking-tight">
            Visualizador de Mínimo Común Múltiplo (MCM)
          </h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Ingresa hasta 4 números para ver sus múltiplos en la recta numérica. 
            Los saltos muestran los múltiplos y se resaltarán las coincidencias para encontrar el MCM.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
            <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
              <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-lg text-sm">1</span>
              Ingresa los números
            </h2>
            <div className="flex flex-wrap gap-4">
              {inputs.map((val, idx) => (
                <div key={idx} className="flex flex-col flex-1 min-w-[100px]">
                  <label className="text-sm font-semibold text-stone-500 mb-2 text-center">
                    Número {idx + 1}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={val}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    className="w-full px-4 py-4 text-2xl font-black text-center rounded-2xl border-2 focus:outline-none transition-all shadow-inner bg-stone-50"
                    style={{ 
                      borderColor: val ? colors[idx] : '#e2e8f0',
                      color: val ? colors[idx] : '#94a3b8',
                      backgroundColor: val ? `${colors[idx]}10` : '#f8fafc'
                    }}
                    placeholder="-"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500"></div>
            <h2 className="text-xl font-bold text-stone-800 mb-2">Resultado MCM</h2>
            {validNumbers.length < 2 ? (
              <p className="text-stone-500 text-sm px-4">Ingresa al menos 2 números para calcular el MCM</p>
            ) : mcm ? (
              <div className="flex flex-col items-center">
                <div className="text-7xl font-black text-indigo-600 my-2 drop-shadow-sm">
                  {mcm}
                </div>
                <div className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-bold mt-2">
                  Mínimo Común Múltiplo
                </div>
                {mcm > maxNumber && (
                  <p className="text-stone-500 text-sm mt-3 px-4 font-medium text-center">
                    (Fuera del rango visual de la recta)
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-6">
          {inputs.map((val, idx) => {
            const num = parseInt(val);
            if (isNaN(num) || num <= 0) return null;
            return (
              <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm" style={{ backgroundColor: colors[idx] }}>
                    {num}
                  </div>
                  <h3 className="font-bold text-stone-700 text-lg">Múltiplos de {num}</h3>
                </div>
                <NumberLine 
                  number={num} 
                  maxNumber={maxNumber} 
                  commonMultiples={commonMultiples} 
                  mcm={mcm} 
                  color={colors[idx]} 
                />
              </div>
            );
          })}
        </div>
      </div>

      <footer className="fixed bottom-0 w-full bg-stone-900 text-stone-300 p-4 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] z-50 border-t-4 border-indigo-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-bold text-xl text-white tracking-wide flex items-center gap-2">
            <span className="bg-indigo-500 text-white px-2 py-1 rounded-md text-sm">Profe</span>
            la_transformada_de_naomi
          </div>
          <div className="flex gap-4">
            <a href="https://instagram.com/la_transformada_de_naomi" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white hover:bg-pink-600 transition bg-stone-800 px-5 py-2.5 rounded-full font-semibold">
              <Instagram size={20} />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <a href="https://tiktok.com/@la_transformada_de_naomi" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white hover:bg-black transition bg-stone-800 px-5 py-2.5 rounded-full font-semibold border border-stone-700 hover:border-stone-500">
              <TikTokIcon className="w-5 h-5" />
              <span className="hidden sm:inline">TikTok</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const NumberLine = ({ number, maxNumber, commonMultiples, mcm, color }: { number: number, maxNumber: number, commonMultiples: number[], mcm: number | null, color: string }) => {
  const width = maxNumber * 30 + 60;
  const height = 140;
  const paddingX = 30;
  const paddingY = 90; 
  const tickSpacing = 30;

  const getX = (val: number) => paddingX + val * tickSpacing;

  const multiples = [];
  for (let i = number; i <= maxNumber; i += number) {
    multiples.push(i);
  }

  return (
    <div className="overflow-x-auto w-full pb-4 scrollbar-thin">
      <div style={{ minWidth: `${width}px` }}>
        <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          <defs>
            <marker id={`arrow-${color.replace('#', '')}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
            </marker>
          </defs>

          {/* Base line */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
          
          {/* Ticks and labels */}
          {Array.from({ length: maxNumber + 1 }).map((_, i) => {
            const x = getX(i);
            const isCommon = commonMultiples.includes(i);
            const isMcm = mcm === i;
            const isMultiple = i > 0 && i % number === 0;

            return (
              <g key={i}>
                <line 
                  x1={x} y1={paddingY - 6} 
                  x2={x} y2={paddingY + 6} 
                  stroke={isCommon ? '#10b981' : isMultiple ? color : '#cbd5e1'} 
                  strokeWidth={isCommon || isMultiple ? 3 : 2} 
                />
                <text 
                  x={x} y={paddingY + 28} 
                  textAnchor="middle" 
                  fontSize={isMcm ? "18" : isCommon ? "16" : "14"} 
                  fontWeight={isMcm || isCommon || isMultiple ? "bold" : "normal"} 
                  fill={isCommon ? '#10b981' : isMultiple ? color : '#94a3b8'}
                >
                  {i}
                </text>
                
                {/* Highlight MCM */}
                {isMcm && (
                  <circle cx={x} cy={paddingY} r="20" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="3" />
                )}
                
                {/* Highlight other common multiples */}
                {isCommon && !isMcm && (
                  <circle cx={x} cy={paddingY} r="6" fill="#10b981" />
                )}
              </g>
            );
          })}

          {/* Arcs (Jumps) */}
          {multiples.map((m) => {
            const startVal = m - number;
            const endVal = m;
            const x1 = getX(startVal);
            const x2 = getX(endVal);
            const cx = (x1 + x2) / 2;
            const arcHeight = Math.min(30 + number * 3, 75);
            const cy = paddingY - arcHeight;

            return (
              <path
                key={m}
                d={`M ${x1} ${paddingY - 2} Q ${cx} ${cy} ${x2} ${paddingY - 2}`}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeDasharray="6 4"
                markerEnd={`url(#arrow-${color.replace('#', '')})`}
                className="opacity-80"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
