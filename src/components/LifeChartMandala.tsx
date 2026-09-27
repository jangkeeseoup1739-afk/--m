import React, { useState } from 'react';
import { LifeChartReport, ElementType } from '../types/saju';
import { Sparkles, Compass, Moon, Sun, Info, Eye } from 'lucide-react';
import { elemKr } from '../utils/korean';

interface LifeChartMandalaProps {
  report: LifeChartReport;
}

export const LifeChartMandala: React.FC<LifeChartMandalaProps> = ({ report }) => {
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const { birth, saju, fiveElements, westernAstrology, thaiAstrology } = report;

  // Colors for five elements
  const elemColors: Record<ElementType, string> = {
    wood: '#10b981',  // emerald
    fire: '#ef4444',  // rose-red
    earth: '#f59e0b', // amber
    metal: '#cbd5e1', // silver-white
    water: '#3b82f6', // sapphire-blue
  };

  // 12 Branches coordinates around circle (radius 140)
  const branchesList = [
    { char: '子', name: '자', animal: '쥐', elem: 'water', angle: 0 },
    { char: '丑', name: '축', animal: '소', elem: 'earth', angle: 30 },
    { char: '寅', name: '인', animal: '호랑이', elem: 'wood', angle: 60 },
    { char: '卯', name: '묘', animal: '토끼', elem: 'wood', angle: 90 },
    { char: '辰', name: '진', animal: '용', elem: 'earth', angle: 120 },
    { char: '巳', name: '사', animal: '뱀', elem: 'fire', angle: 150 },
    { char: '午', name: '오', animal: '말', elem: 'fire', angle: 180 },
    { char: '未', name: '미', animal: '양', elem: 'earth', angle: 210 },
    { char: '申', name: '신', animal: '원숭이', elem: 'metal', angle: 240 },
    { char: '酉', name: '유', animal: '닭', elem: 'metal', angle: 270 },
    { char: '戌', name: '술', animal: '개', elem: 'earth', angle: 300 },
    { char: '亥', name: '해', animal: '돼지', elem: 'water', angle: 330 },
  ];

  // 10 Stems coordinates around circle (radius 105)
  const stemsList = [
    { char: '甲', name: '갑', elem: 'wood', angle: 0 },
    { char: '乙', name: '을', elem: 'wood', angle: 36 },
    { char: '丙', name: '병', elem: 'fire', angle: 72 },
    { char: '丁', name: '정', elem: 'fire', angle: 108 },
    { char: '戊', name: '무', elem: 'earth', angle: 144 },
    { char: '己', name: '기', elem: 'earth', angle: 180 },
    { char: '庚', name: '경', elem: 'metal', angle: 216 },
    { char: '辛', name: '신', elem: 'metal', angle: 252 },
    { char: '壬', name: '임', elem: 'water', angle: 288 },
    { char: '癸', name: '계', elem: 'water', angle: 324 },
  ];

  // Helper to convert polar to cartesian
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0f142c] via-[#090c1c] to-[#080a16] border border-amber-500/20 shadow-2xl overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-indigo-950 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MYEONGGYEOL COSMIC LIFE MANDALA</span>
          </div>
          <h2 className="font-serif-kr text-2xl sm:text-3xl font-bold text-slate-100 flex items-center gap-3">
            <span>{birth.name}님의 인생차트</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-normal">
              {saju.dayMaster} 일원 ({saju.day.stemName})
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1.5 font-light">
            <span>출생: {birth.birthDate}</span>
            <span>·</span>
            <span>{birth.isUnknownTime ? '시간 미입력(삼주 중심)' : `${birth.birthTime}`}</span>
            <span>·</span>
            <span>{birth.birthCity}</span>
            <span>·</span>
            <span>{birth.calendarType === 'solar' ? '양력' : '음력'}</span>
          </div>
        </div>

        {/* Quick summary pill tags */}
        <div className="flex flex-wrap gap-2">
          {report.keywords.slice(0, 3).map((kw, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Centerpiece Mandala & Legend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Mandala (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          <div className="w-full max-w-[420px] aspect-square relative select-none">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-[0_0_25px_rgba(197,160,89,0.15)]"
            >
              <defs>
                <radialGradient id="mandalaCenterGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#c5a059" stopOpacity="0.3" />
                  <stop offset="60%" stopColor="#1e264a" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0c1022" stopOpacity="0.8" />
                </radialGradient>
                <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e5c97b" />
                  <stop offset="50%" stopColor="#c5a059" />
                  <stop offset="100%" stopColor="#937233" />
                </linearGradient>
              </defs>

              {/* Background circular guide tracks */}
              <circle cx="200" cy="200" r="185" fill="none" stroke="#252d52" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="200" cy="200" r="160" fill="none" stroke="url(#goldRing)" strokeWidth="1.5" opacity="0.6" />
              <circle cx="200" cy="200" r="125" fill="none" stroke="#313d6d" strokeWidth="1" />
              <circle cx="200" cy="200" r="85" fill="none" stroke="url(#goldRing)" strokeWidth="1.2" opacity="0.7" />
              <circle cx="200" cy="200" r="55" fill="url(#mandalaCenterGlow)" stroke="#c5a059" strokeWidth="1.5" />

              {/* Connecting cross rays */}
              <line x1="200" y1="15" x2="200" y2="385" stroke="#1d2444" strokeWidth="0.8" />
              <line x1="15" y1="200" x2="385" y2="200" stroke="#1d2444" strokeWidth="0.8" />
              <line x1="69" y1="69" x2="331" y2="331" stroke="#1d2444" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="69" y1="331" x2="331" y2="69" stroke="#1d2444" strokeWidth="0.5" strokeDasharray="2 2" />

              {/* Outer Ring: 12 Earthly Branches */}
              {branchesList.map((b) => {
                const pt = polarToCartesian(200, 200, 142, b.angle);
                const isUserBranch =
                  saju.year.branch === b.char ||
                  saju.month.branch === b.char ||
                  saju.day.branch === b.char ||
                  saju.hour?.branch === b.char;

                return (
                  <g
                    key={b.char}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setActiveSector(`지지 ${b.char} (${b.name}/${b.animal}) - ${elemKr(b.elem)} 기운`)}
                    onMouseLeave={() => setActiveSector(null)}
                  >
                    {isUserBranch && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="14"
                        fill={elemColors[b.elem as ElementType]}
                        fillOpacity="0.25"
                        stroke={elemColors[b.elem as ElementType]}
                        strokeWidth="1"
                      />
                    )}
                    <text
                      x={pt.x}
                      y={pt.y + 4}
                      textAnchor="middle"
                      fill={isUserBranch ? '#f8fafc' : '#64748b'}
                      fontSize={isUserBranch ? '13' : '11'}
                      fontWeight={isUserBranch ? 'bold' : 'normal'}
                      fontFamily="Noto Serif KR, serif"
                    >
                      {b.char}
                    </text>
                  </g>
                );
              })}

              {/* Middle Ring: 10 Heavenly Stems */}
              {stemsList.map((s) => {
                const pt = polarToCartesian(200, 200, 105, s.angle);
                const isUserStem =
                  saju.year.stem === s.char ||
                  saju.month.stem === s.char ||
                  saju.day.stem === s.char ||
                  saju.hour?.stem === s.char;

                const isDayMaster = saju.dayMaster === s.char;

                return (
                  <g
                    key={s.char}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setActiveSector(`천간 ${s.char} (${s.name}) - ${elemKr(s.elem)} 기운 ${isDayMaster ? '(일간/나 자신)' : ''}`)}
                    onMouseLeave={() => setActiveSector(null)}
                  >
                    {isUserStem && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="11"
                        fill={isDayMaster ? '#f59e0b' : elemColors[s.elem as ElementType]}
                        fillOpacity={isDayMaster ? '0.4' : '0.2'}
                        stroke={isDayMaster ? '#fbbf24' : elemColors[s.elem as ElementType]}
                        strokeWidth={isDayMaster ? '1.5' : '0.8'}
                      />
                    )}
                    <text
                      x={pt.x}
                      y={pt.y + 3.5}
                      textAnchor="middle"
                      fill={isDayMaster ? '#fef08a' : isUserStem ? '#f1f5f9' : '#475569'}
                      fontSize={isDayMaster ? '12' : '10'}
                      fontWeight={isUserStem ? 'bold' : 'normal'}
                      fontFamily="Noto Serif KR, serif"
                    >
                      {s.char}
                    </text>
                  </g>
                );
              })}

              {/* Inner Core: Day Master Emblem */}
              <circle cx="200" cy="200" r="32" fill="#080a14" stroke="#c5a059" strokeWidth="1.5" />
              <text
                x="200"
                y="196"
                textAnchor="middle"
                fill="#fbbf24"
                fontSize="24"
                fontWeight="bold"
                fontFamily="Noto Serif KR, serif"
              >
                {saju.dayMaster}
              </text>
              <text
                x="200"
                y="215"
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="9"
                fontWeight="500"
                letterSpacing="1"
              >
                {saju.day.stemName} / 日元
              </text>
            </svg>

            {/* Floating interactive tooltip */}
            {activeSector && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-slate-900/95 border border-amber-500/40 text-amber-200 text-xs shadow-lg whitespace-nowrap animate-fade-in pointer-events-none">
                {activeSector}
              </div>
            )}
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <Info className="w-3 h-3 text-slate-400" />
            원형의 글자에 마우스를 올리거나 터치하면 세부 기운을 확인할 수 있습니다.
          </p>
        </div>

        {/* Multi-System Synergy Dashboard (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                동양 명리학 본질 (사주팔자)
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {saju.day.stage}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              본인을 상징하는 일간은 <strong className="text-amber-300 font-semibold">{saju.dayMaster} ({saju.day.stemName})</strong>으로, 오행상으로는 <strong className="text-slate-100">{elemKr(fiveElements.dominant)}</strong>의 기운이 가장 든든한 기반을 형성하고 있습니다.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-blue-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Sun className="w-4 h-4" />
                서양 점성술 천체 좌표
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                {westernAstrology.sunSign.split(' ')[0]}
              </span>
            </div>
            <div className="text-xs text-slate-300 space-y-1 font-light">
              <div>태양: <span className="text-slate-100 font-medium">{westernAstrology.sunSign}</span></div>
              <div>달: <span className="text-slate-100 font-medium">{westernAstrology.moonSign}</span></div>
              <div>상승궁(ASC): <span className="text-slate-100 font-medium">{westernAstrology.ascendant}</span></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-purple-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Moon className="w-4 h-4" />
                태국 수리야야트라 10행성 체계
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {thaiAstrology.dayOfBirthThai}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {thaiAstrology.dayOfBirthThai}의 수호신인 <strong className="text-purple-300 font-medium">[{thaiAstrology.guardianPlanet}]</strong>의 축복과 <span className="text-slate-100">{thaiAstrology.sacredColor}</span>의 긍정적 에너지가 삶의 균형을 받쳐줍니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
