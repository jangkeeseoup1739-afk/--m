import React, { useState } from 'react';
import { WesternAstrologyData, ThaiAstrologyData } from '../types/saju';
import { Sparkles, Sun, Moon, Compass, Globe, Star, Shield, Info } from 'lucide-react';

interface AstrologySectionProps {
  western: WesternAstrologyData;
  thai: ThaiAstrologyData;
}

export const AstrologySection: React.FC<AstrologySectionProps> = ({ western, thai }) => {
  const [activeTab, setActiveTab] = useState<'western' | 'thai'>('western');

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-[#0d1124] border border-indigo-900/60 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-indigo-950">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>동서양 천체 좌표의 교차 분석</span>
          </div>
          <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-slate-100">
            점성술 (서양 점성학 & 태국 수리야야트라)
          </h3>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('western')}
            className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
              activeTab === 'western'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            서양 점성술 차트
          </button>
          <button
            onClick={() => setActiveTab('thai')}
            className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
              activeTab === 'thai'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            태국 전통 점성술 (10행성)
          </button>
        </div>
      </div>

      {activeTab === 'western' ? (
        <div className="space-y-6">
          {/* Western Top 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">SUN SIGN (태양)</div>
              <div className="font-serif-kr text-lg font-bold text-slate-100">{western.sunSign}</div>
              <p className="text-[11px] text-slate-400">자아의 본질, 의식적 추구 방향</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">MOON SIGN (달)</div>
              <div className="font-serif-kr text-lg font-bold text-slate-100">{western.moonSign}</div>
              <p className="text-[11px] text-slate-400">무의식과 감성, 내밀한 심리 안정기지</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider">ASCENDANT (상승궁)</div>
              <div className="font-serif-kr text-lg font-bold text-slate-100">{western.ascendant}</div>
              <p className="text-[11px] text-slate-400">세상을 향한 첫인상과 행동의 관문</p>
            </div>
          </div>

          {/* 10 Planets Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              주요 10대 행성 위치 및 하우스(House) 배치도
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
              {western.planets.map((p, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 space-y-1"
                >
                  <div className="text-[10px] text-slate-400 font-medium truncate">{p.nameKr}</div>
                  <div className="font-semibold text-slate-200">{p.signKr}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>{p.degree}° 도수</span>
                    <span className="text-amber-400/90 font-medium">{p.house}하우스</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Aspects & Synthesis */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-200">서양 점성학적 천체 배치 핵심 해석</div>
            <ul className="space-y-1.5 text-xs text-slate-300 font-light">
              {western.keyAspects.map((asp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>{asp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Thai Day-of-birth Guardian Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900/80 to-indigo-950/40 border border-purple-800/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                태국 전통 요일별 수호신 체계
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {thai.dayOfBirthThai} 출생
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400">수호 행성(신)</div>
                <div className="font-bold text-slate-100 text-sm mt-0.5">{thai.guardianPlanet}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400">개운의 조화 색상</div>
                <div className="font-bold text-slate-100 text-sm mt-0.5">{thai.sacredColor}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400">기운이 트이는 방위</div>
                <div className="font-bold text-slate-100 text-sm mt-0.5">{thai.auspiciousDirection}</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {thai.destinySummary}
            </p>
          </div>

          {/* Thai 10 Planets Grid (0 to 9) */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-purple-400" />
              태국 수리야야트라 10대 천체 체계 (0~9)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
              {thai.planets.map((tp) => (
                <div
                  key={tp.number}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      행성 {tp.number}
                    </span>
                    <span className="text-[10px] text-slate-500 font-serif">{tp.thaiName}</span>
                  </div>
                  <div className="font-semibold text-slate-100">{tp.nameKr}</div>
                  <div className="text-[10px] text-amber-300/80">{tp.sign}</div>
                  <p className="text-[10px] text-slate-400 leading-tight pt-1 border-t border-slate-800">
                    {tp.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
        <Info className="w-4 h-4 text-amber-400 shrink-0" />
        <span>서양 점성학과 태국 점성술은 사주명리학과 함께 개인의 성향과 삶의 환경을 다각도로 비추는 입체적 렌즈로 활용됩니다.</span>
      </div>
    </div>
  );
};
