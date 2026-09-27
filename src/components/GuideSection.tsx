import React from 'react';
import { Sparkles, BookOpen, Compass, ShieldCheck, Heart, Users, Star, ArrowRight } from 'lucide-react';

interface GuideSectionProps {
  onStartFreeSaju: () => void;
}

export const GuideSection: React.FC<GuideSectionProps> = ({ onStartFreeSaju }) => {
  const principles = [
    {
      title: '命(명)과 結(결)의 조화',
      desc: '명(命)은 내가 타고난 본연의 기질과 에너지를 뜻하며, 결(結)은 사람과 인연, 그리고 현재의 의식적 선택이 빚어내는 삶의 연결을 의미합니다.',
      icon: Sparkles,
    },
    {
      title: '공포와 미신의 배제',
      desc: '과거의 자극적인 흉살론이나 100% 단정 짓는 예언을 거부합니다. 인생은 정해진 각본이 아니라 내 악기의 음색을 알고 연주하는 능동적인 예술입니다.',
      icon: ShieldCheck,
    },
    {
      title: '동서양 천문학의 통합',
      desc: '음양오행과 십성에 기반한 동양 사주명리학과 10대 행성을 아우르는 서양 점성술, 태국 수리야야트라 10행성 체계를 하나의 차트에 입체적으로 녹여냅니다.',
      icon: Compass,
    },
    {
      title: '실용적인 현대적 해석',
      desc: '오늘날의 직업 생태계, 커리어 전환, 건강한 파트너십, 자산 관리 원칙에 알맞게 현대적으로 재해석된 분석을 제공합니다.',
      icon: Users,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>명결(命結) 서비스 철학과 이용 가이드</span>
        </div>
        <h2 className="font-serif-kr text-3xl sm:text-4xl font-bold text-slate-100">
          나를 이해하는 가장 오래된 지혜, <br />
          가장 현대적인 방식으로 만나다
        </h2>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto font-light leading-relaxed">
          명결은 단순한 길흉화복을 점치는 곳이 아니라, 타고난 고유한 구조를 이해하고 오늘날의 현명한 선택을 사유하는 인생 분석 플랫폼입니다.
        </p>
      </div>

      {/* 4 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {principles.map((pr, idx) => {
          const Icon = pr.icon;

          return (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-[#0d1124] border border-indigo-900/60 shadow-xl space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif-kr text-lg font-bold text-slate-100">
                {pr.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {pr.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* How to use the chart */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0e132e] to-slate-900 border border-indigo-800/80 space-y-5">
        <h3 className="font-serif-kr text-xl font-bold text-slate-100 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400" />
          <span>명결 인생차트 200% 활용하는 법</span>
        </h3>

        <div className="space-y-4 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </div>
            <div>
              <strong className="text-slate-100 font-semibold">일간(日干)과 오행의 주도 기운 먼저 확인하기:</strong>
              <p className="text-slate-400 mt-0.5 leading-relaxed font-light">
                사주팔자에서 나를 상징하는 일간 글자와 가장 비중이 큰 오행을 살펴봄으로써, 나 자신이 어떤 환경에서 가장 편안하고 활력을 얻는지 인지합니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </div>
            <div>
              <strong className="text-slate-100 font-semibold">대운과 연운으로 계절의 리듬 읽기:</strong>
              <p className="text-slate-400 mt-0.5 leading-relaxed font-light">
                대운은 10년 단위의 인생 계절이며, 연운은 그 계절 속 날씨입니다. 무리한 질주보다 계절에 맞는 씨뿌리기와 결실의 타이밍을 점검하세요.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </div>
            <div>
              <strong className="text-slate-100 font-semibold">궁금한 점은 AI 1:1 상담으로 직접 대화하기:</strong>
              <p className="text-slate-400 mt-0.5 leading-relaxed font-light">
                나의 차트 데이터가 프롬프트 맥락으로 연결된 AI 상담사에게 구체적인 고민(이직, 사업, 대인관계)을 질문하여 맞춤형 혜안을 얻습니다.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onStartFreeSaju}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition inline-flex items-center gap-2 cursor-pointer"
          >
            <span>지금 무료로 내 인생차트 만들기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
