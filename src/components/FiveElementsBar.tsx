import React from 'react';
import { FiveElementsCount, ElementType } from '../types/saju';
import { ELEMENT_TRAITS } from '../data/interpretations';
import { Sparkles, Activity, ShieldCheck, AlertCircle } from 'lucide-react';

interface FiveElementsBarProps {
  fiveElements: FiveElementsCount;
}

export const FiveElementsBar: React.FC<FiveElementsBarProps> = ({ fiveElements }) => {
  const elements: { key: ElementType; label: string; hanja: string; color: string; bgBar: string }[] = [
    { key: 'wood', label: '목(木)', hanja: '木', color: 'text-emerald-400', bgBar: 'bg-emerald-500' },
    { key: 'fire', label: '화(火)', hanja: '火', color: 'text-rose-400', bgBar: 'bg-rose-500' },
    { key: 'earth', label: '토(土)', hanja: '土', color: 'text-amber-400', bgBar: 'bg-amber-500' },
    { key: 'metal', label: '금(金)', hanja: '金', color: 'text-slate-300', bgBar: 'bg-slate-300' },
    { key: 'water', label: '수(水)', hanja: '水', color: 'text-blue-400', bgBar: 'bg-blue-500' },
  ];

  const total = fiveElements.total || 8;
  const domInfo = ELEMENT_TRAITS[fiveElements.dominant];
  const lackNames = fiveElements.lacking.map((l) => ELEMENT_TRAITS[l].nameKr).join(', ');

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-[#0d1124] border border-indigo-900/60 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-indigo-950">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>오행 에너지 균형도</span>
          </div>
          <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-slate-100">
            음양오행 (陰陽五行) 분석
          </h3>
        </div>

        {/* Balance Score Badge */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
          <Activity className="w-4 h-4 text-amber-400" />
          <div className="text-xs">
            <span className="text-slate-400">오행 조화 지수: </span>
            <strong className="text-amber-300 font-bold text-sm">{fiveElements.balanceScore}점</strong>
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="space-y-4">
        {elements.map((item) => {
          const count = fiveElements[item.key];
          const pct = Math.round((count / total) * 100);
          const isDominant = fiveElements.dominant === item.key;
          const isLacking = count === 0;

          return (
            <div key={item.key} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${item.color} font-serif-kr`}>
                    {item.label}
                  </span>
                  {isDominant && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      최다 오행 (주도)
                    </span>
                  )}
                  {isLacking && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      보완 필요 (0개)
                    </span>
                  )}
                </div>
                <div className="text-slate-400 font-medium">
                  {count}개 <span className="text-[11px] text-slate-500">({pct}%)</span>
                </div>
              </div>

              {/* Progress track */}
              <div className="h-3 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${item.bgBar} ${
                    isDominant ? 'shadow-lg shadow-amber-500/20' : ''
                  }`}
                  style={{ width: `${Math.max(pct, count > 0 ? 5 : 0)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Comprehensive Insight Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>두드러진 기운: {domInfo.nameKr}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            당신의 차트에서는 <strong>{domInfo.nameKr}</strong>의 기운이 상대적으로 두드러집니다. {domInfo.nature}.
          </p>
          <div className="flex flex-wrap gap-1 pt-1">
            {domInfo.strengths.slice(0, 3).map((s, idx) => (
              <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/40">
                #{s}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <AlertCircle className="w-4 h-4" />
            <span>오행 조화 및 개운 팁</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            {fiveElements.lacking.length > 0 ? (
              <>
                상대적으로 부족한 <strong>{lackNames}</strong>의 에너지는 생활 속 색상이나 마음가짐, 습관을 통해 부드럽게 보완할 수 있습니다.
              </>
            ) : (
              '모든 오행이 골고루 갖추어져 있어 한 분야에 갇히지 않고 균형 잡힌 시각으로 삶을 조율하는 힘이 뛰어납니다.'
            )}
          </p>
          <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
            "오행은 길흉의 잣대가 아닌 에너지의 흐름입니다. 내게 강한 기운은 주력 무기로, 부족한 기운은 조율의 지표로 삼으세요."
          </p>
        </div>
      </div>
    </div>
  );
};
