import React, { useState } from 'react';
import { AnnualLuck } from '../types/saju';
import { Sparkles, Calendar, DollarSign, Briefcase, Users, Heart, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface AnnualLuckSectionProps {
  annualLuckList: AnnualLuck[];
}

export const AnnualLuckSection: React.FC<AnnualLuckSectionProps> = ({ annualLuckList }) => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [expandedYear, setExpandedYear] = useState<number | null>(2026);

  const currentYearData = annualLuckList.find((a) => a.year === selectedYear) || annualLuckList[0];

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-[#0d1124] border border-indigo-900/60 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-indigo-950">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>10개년 세운(歲運) 항해 지도</span>
          </div>
          <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-slate-100">
            2026 ~ 2035 연운(年運) 흐름
          </h3>
        </div>
        <p className="text-xs text-slate-400 font-light">
          붉은 말의 해(2026 丙午)부터 푸른 토끼의 해(2035 乙卯)까지의 흐름입니다.
        </p>
      </div>

      {/* Year Horizontal Selection Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {annualLuckList.map((item) => {
          const isSelected = selectedYear === item.year;

          return (
            <button
              key={item.year}
              onClick={() => {
                setSelectedYear(item.year);
                setExpandedYear(item.year);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition border ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] opacity-80">{item.pillar}</div>
              <div>{item.year}년</div>
            </button>
          );
        })}
      </div>

      {/* Featured Detailed Year Card */}
      {currentYearData && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0e1330] to-slate-900 border border-indigo-800/80 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-indigo-950 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {currentYearData.pillar}
                </span>
                <span className="text-xs text-slate-400">
                  {currentYearData.stemTenGod}의 해
                </span>
              </div>
              <h4 className="font-serif-kr text-xl sm:text-2xl font-bold text-slate-100 mt-1">
                {currentYearData.pillarName}
              </h4>
            </div>

            <div className="text-xs bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-slate-400">전반적 활력 지수: </span>
              <strong className="text-amber-300 font-bold">{currentYearData.overallScore}점</strong>
            </div>
          </div>

          {/* Overall Summary */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1">
            <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>한 해의 전체 흐름 요약</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {currentYearData.overallSummary}
            </p>
          </div>

          {/* 5 Area Cards (재물, 직업, 인간관계, 연애, 주의할 점) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                <DollarSign className="w-3.5 h-3.5" />
                <span>재물 및 금전 관리</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-light">{currentYearData.wealth}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-blue-300">
                <Briefcase className="w-3.5 h-3.5" />
                <span>직업 및 커리어 기회</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-light">{currentYearData.career}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-purple-300">
                <Users className="w-3.5 h-3.5" />
                <span>인간관계 및 네트워크</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-light">{currentYearData.relationships}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-rose-300">
                <Heart className="w-3.5 h-3.5" />
                <span>연애 및 부부 애정운</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-light">{currentYearData.love}</p>
            </div>

            <div className="sm:col-span-2 lg:col-span-2 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>이 시기 기억할 조언 및 점검 사항</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-light">{currentYearData.cautions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
