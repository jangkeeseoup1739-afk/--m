import React from 'react';
import { SajuPillars } from '../types/saju';
import { Sparkles, TrendingUp, Compass, Info } from 'lucide-react';

interface TwelveStagesSectionProps {
  saju: SajuPillars;
}

export const TwelveStagesSection: React.FC<TwelveStagesSectionProps> = ({ saju }) => {
  const allStages = [
    { name: '절 (絶)', energy: '새로운 씨앗이 잉태되기 전 정적의 시기, 순수한 가능성' },
    { name: '태 (胎)', energy: '어머니 뱃속에 새 생명이 깃드는 시기, 미래에 대한 희망' },
    { name: '양 (養)', energy: '안전한 보호 속에서 조용히 자양분을 흡수하는 양육의 시기' },
    { name: '장생 (長生)', energy: '세상에 첫 울음을 터뜨리는 탄생, 귀인의 도움과 새로운 시작' },
    { name: '목욕 (沐浴)', energy: '순수하고 매력 넘치며 세상의 시선을 받는 호기심의 시기' },
    { name: '관대 (冠帶)', energy: '청년이 관을 쓰고 사회에 나아가는 패기와 당당한 진취성' },
    { name: '건록 (建祿)', energy: '스스로의 힘으로 터전을 닦고 벼슬과 자립을 완성하는 안정기' },
    { name: '제왕 (帝旺)', energy: '에너지가 최고조에 달하여 당당한 리더십을 발휘하는 전성기' },
    { name: '쇠 (衰)', energy: '원숙한 지혜와 경륜으로 뒤에서 조직을 든든하게 조율하는 시기' },
    { name: '병 (病)', energy: '감수성이 깊어지고 타인의 아픔을 깊이 공감하는 예술적 성찰' },
    { name: '사 (死)', energy: '정신적인 집중력과 학문적 깊이가 최고조에 이르는 사색기' },
    { name: '묘 (墓)', energy: '경험과 가치를 소중히 저장하고 내실을 다지는 보존의 시기' },
  ];

  const userStages = [
    { pillarName: '일지 (본인 내면)', stage: saju.day.stage, branch: saju.day.branchHanja },
    { pillarName: '월지 (사회 환경)', stage: saju.month.stage, branch: saju.month.branchHanja },
    { pillarName: '년지 (선조 근본)', stage: saju.year.stage, branch: saju.year.branchHanja },
    ...(saju.hour ? [{ pillarName: '시지 (만년 결실)', stage: saju.hour.stage, branch: saju.hour.branchHanja }] : []),
  ];

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-[#0d1124] border border-indigo-900/60 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-indigo-950">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>생애 에너지의 12단계 순환 곡선</span>
          </div>
          <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-slate-100">
            십이운성 (十二運星) 분석
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-indigo-300">
          <TrendingUp className="w-4 h-4" />
          <span>에너지의 흥망성쇠 사이클</span>
        </div>
      </div>

      {/* User's Current Saju Stages */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {userStages.map((us, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-slate-900/80 border border-indigo-800/50 space-y-1 text-center"
          >
            <div className="text-[10px] text-slate-400">{us.pillarName}</div>
            <div className="text-sm font-semibold text-slate-200">지지 {us.branch}</div>
            <div className="text-base font-serif-kr font-bold text-amber-300 bg-amber-500/10 py-1 rounded-lg border border-amber-500/20">
              {us.stage}
            </div>
          </div>
        ))}
      </div>

      {/* 12 Stages Visual Cycle */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          십이운성 12단계 에너지 생애주기 해설
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
          {allStages.map((st, idx) => {
            const isUserHas = userStages.some((u) => u.stage.includes(st.name.split(' ')[0]));

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl transition border ${
                  isUserHas
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-md shadow-amber-500/5'
                    : 'bg-slate-900/50 border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-serif-kr font-bold text-sm ${isUserHas ? 'text-amber-300' : 'text-slate-200'}`}>
                    {st.name}
                  </span>
                  {isUserHas && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-medium">
                      내 명식 보유
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                  {st.energy}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          십이운성은 높낮이나 우열이 아니라, '에너지가 발현되는 양식'을 뜻합니다. 제왕의 시기에는 강력한 리더십이 요구되고, 사·묘·절의 시기에는 깊은 사색과 전략적 축적이 가장 강력한 힘이 됩니다.
        </p>
      </div>
    </div>
  );
};
