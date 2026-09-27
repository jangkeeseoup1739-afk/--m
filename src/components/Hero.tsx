import React from 'react';
import { Sparkles, Compass, Eye, ShieldCheck, ChevronDown, Check, Star, ArrowRight } from 'lucide-react';

interface HeroProps {
  onStartChart: () => void;
  onOpenBirthForm: () => void;
  onLoadSample: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartChart,
  onOpenBirthForm,
  onLoadSample,
}) => {
  const servicePillars = [
    { label: '사주팔자', desc: '년·월·일·시 4개 기둥의 명식' },
    { label: '음양오행', desc: '목·화·토·금·수 조화와 결핍' },
    { label: '십성 & 십이운성', desc: '생애 주기 에너지와 심리 기제' },
    { label: '신살 & 귀인', desc: '천을귀인·문창귀인 등 조력의 별' },
    { label: '대운 & 2026-2035 연운', desc: '10년 주기와 10개년 세부 흐름' },
    { label: '서양 & 태국 점성술', desc: '행성·하우스 & 수리야야트라 10행성' },
    { label: 'AI 종합 인생상담', desc: '명결 철학 기반 13단계 통합 분석' },
  ];

  return (
    <div className="space-y-12 pt-4 pb-16">
      {/* 1. Main Hero Banner Card - Exactly Matching Original Screenshot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-700/70 bg-[#1a1f3a] shadow-2xl min-h-[500px] lg:min-h-[580px] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
          {/* Background Image of Hanok Sunset and Hanbok Muse */}
          <div className="absolute inset-0 z-0">
            <img
              src="images/myeonggyeol_hero.jpg"
              alt="명결 한옥 배경"
              className="w-full h-full object-cover object-right lg:object-center brightness-[1.22] saturate-[1.12] contrast-[1.03]"
              referrerPolicy="no-referrer"
            />
            {/* Elegant Atmospheric Dark Gradient for Ultra Crisp Readability */}
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0b0d16]/88 via-[#0b0d16]/46 to-[#0b0d16]/12 sm:from-[#0b0d16]/90 sm:via-[#0b0d16]/46 sm:to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(#amber-400_1px,transparent_1px)] [background-size:40px_40px] opacity-10 pointer-events-none" />
          </div>

          {/* Top Status Bar inside Card */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-950/80 border border-stone-700/60 backdrop-blur-md text-stone-200 text-xs sm:text-sm font-medium shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>오늘도, 더 나은 내일을 위한</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-950/80 border border-stone-700/60 backdrop-blur-md text-stone-200 text-xs sm:text-sm font-medium shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>실시간 천문 만세력 연산 가동 중</span>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="relative z-10 max-w-2xl my-auto space-y-6">
            {/* 텍스트 뒤에만 깔리는 국소 스크림 — 사진 전체를 어둡게 하지 않고 글자만 보호 */}
            <div
              aria-hidden
              className="absolute -inset-x-6 -inset-y-8 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(8,10,22,0.72)_0%,rgba(8,10,22,0.42)_55%,transparent_78%)] blur-[2px] lg:bg-[radial-gradient(ellipse_at_center,rgba(8,10,22,0.55)_0%,rgba(8,10,22,0.28)_55%,transparent_78%)]"
            />
            <h1 className="font-serif-kr text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.25] [text-shadow:0_2px_10px_rgba(8,10,22,0.9),0_1px_3px_rgba(8,10,22,0.85)]">
              당신의 사주를, <br />
              <span className="relative inline-block text-amber-200">
                AI가 쉽게
                <span className="absolute bottom-1 sm:bottom-2 left-0 w-full h-[3px] sm:h-[4px] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-100 rounded-full" />
              </span>{' '}
              풀어드립니다.
            </h1>

            <p className="text-stone-200 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl [text-shadow:0_1px_8px_rgba(8,10,22,0.9)]">
              타고난 본원의 기운부터 재물·사업·연애·10년 대운의 흐름까지. 정통 천문 만세력의 정밀함과
              인공지능의 깊이 있는 통찰을 경험하세요.
            </p>

            {/* Action CTA & Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onStartChart}
                className="px-6 sm:px-7 py-3.5 rounded-xl bg-stone-900/90 hover:bg-stone-850 text-amber-200 border border-amber-400/80 font-medium text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-black/40 hover:border-amber-300 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
              >
                <span>내 사주 바로 보기</span>
                <ChevronDown className="w-4 h-4 text-amber-300 group-hover:translate-y-0.5 transition" />
              </button>

              <div className="flex items-center gap-1.5 px-3.5 py-3 rounded-lg bg-stone-950/70 border border-stone-800 text-xs font-medium text-stone-200 backdrop-blur-sm">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>100% 무료</span>
              </div>

              <div className="flex items-center gap-1.5 px-3.5 py-3 rounded-lg bg-stone-950/70 border border-stone-800 text-xs font-medium text-stone-200 backdrop-blur-sm">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>무가입 즉시 분석</span>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer Bar */}
          <div className="relative z-10 pt-8 sm:pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-stone-800/40 mt-6">
            <p className="text-xs sm:text-sm text-stone-400 font-serif-kr tracking-wide">
              명(命)을 풀고, 사람과 운을 연결하다
            </p>

            <div className="px-4 py-2 rounded-xl bg-stone-950/80 border border-amber-500/30 backdrop-blur-md shadow-lg text-xs sm:text-sm text-amber-100/90 font-serif-kr">
              “운명은 정해진 것이 아니라, 알고 나아가는 길입니다”
            </div>
          </div>
        </div>
      </section>

      {/* 2. Secondary Service Expansion & Quick Access */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0e111d]/60 border border-stone-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI 사주 · 인생차트 통합 서비스</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-kr text-white">
                태어난 순간의 정보를 바탕으로 나만의 인생차트를 만들어보세요.
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                전통 명리학의 정통 만세력 계산과 현대적 AI 해석, 서양·태국 점성술이 결합된 종합 리포트
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBirthForm}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>내 인생차트 무료로 보기</span>
              </button>

              <button
                onClick={onLoadSample}
                className="px-4 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 font-medium text-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-amber-400" />
                <span>샘플 차트 체험</span>
              </button>
            </div>
          </div>

          {/* 7 Core Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 pt-2">
            {servicePillars.map((p, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/70 hover:border-amber-500/30 transition text-center group"
              >
                <div className="text-xs font-bold text-amber-200/90 group-hover:text-amber-300 mb-0.5 font-serif-kr">
                  {p.label}
                </div>
                <div className="text-[10px] text-stone-400 leading-tight">
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
