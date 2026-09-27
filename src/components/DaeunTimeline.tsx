import React, { useState } from 'react';
import { DaeunPeriod } from '../types/saju';
import { Sparkles, Calendar, ChevronRight, Compass } from 'lucide-react';
import { elemKr } from '../utils/korean';

interface DaeunTimelineProps {
  daeunList: DaeunPeriod[];
}

export const DaeunTimeline: React.FC<DaeunTimelineProps> = ({ daeunList }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(2); // Default around 20s or 30s

  const currentDaeun = daeunList[selectedIdx] || daeunList[0];

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-[#0d1124] border border-indigo-900/60 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-indigo-950">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>10년 주기 환경 변화의 큰 물줄기</span>
          </div>
          <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-slate-100">
            대운(大運) 인생 타임라인
          </h3>
        </div>
        <p className="text-xs text-slate-400 font-light">
          타임라인의 노드를 클릭하면 해당 10년의 핵심 테마와 운기를 확인합니다.
        </p>
      </div>

      {/* Interactive Horizontal Timeline Tracker */}
      <div className="relative py-6 overflow-x-auto">
        {/* Horizontal Connector Line */}
        <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />

        <div className="relative z-10 flex items-center justify-between min-w-[580px] px-4 gap-2">
          {daeunList.map((d, idx) => {
            const isSelected = selectedIdx === idx;

            return (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className="flex flex-col items-center group cursor-pointer focus:outline-none transition"
              >
                {/* Age Tag */}
                <span
                  className={`text-[11px] mb-2 font-medium transition ${
                    isSelected ? 'text-amber-300 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {d.startAge}세~
                </span>

                {/* Node Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-serif-kr text-xs font-bold transition shadow-lg ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30 scale-110'
                      : 'bg-slate-900 text-slate-300 border border-slate-700 group-hover:border-amber-400/60 group-hover:text-white'
                  }`}
                >
                  {d.pillar}
                </div>

                {/* Subtitle */}
                <span
                  className={`text-[10px] mt-2 transition ${
                    isSelected ? 'text-amber-300/90 font-medium' : 'text-slate-500'
                  }`}
                >
                  {d.stemTenGod}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Daeun Detail Card */}
      {currentDaeun && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0e132e] to-slate-900 border border-amber-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
            <div>
              <div className="text-[11px] text-amber-400 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>선택된 대운 구간: {currentDaeun.startAge}세 ~ {currentDaeun.endAge}세</span>
              </div>
              <h4 className="font-serif-kr text-xl font-bold text-slate-100 mt-1">
                {currentDaeun.pillar} 대운 ({currentDaeun.stemTenGod} · {currentDaeun.branchTenGod})
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                천간 {currentDaeun.stem} ({elemKr(currentDaeun.stemElement)})
              </span>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                지지 {currentDaeun.branch} ({elemKr(currentDaeun.branchElement)})
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="text-amber-200/90 font-serif-kr text-sm leading-relaxed">
              "{currentDaeun.theme}"
            </div>
            <p className="text-slate-300 leading-relaxed font-light">
              {currentDaeun.summary}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
            <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              대운은 10년 동안 내가 머무는 기후이자 환경적 무대입니다. 이 시기에는 {currentDaeun.stemTenGod}의 주도성과 {currentDaeun.branchTenGod}의 실질적 여건이 맞물려 삶의 새로운 지평을 열어주는 기회가 마련됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
