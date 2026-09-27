import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  Eye,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Star,
  Moon,
  Sun,
  Flame,
  Droplets,
  Layers,
  Heart,
  MessageSquare,
  HelpCircle,
  Lock,
  ArrowRight,
  Clock,
  Globe2,
} from 'lucide-react';

interface MainPageSectionsProps {
  onStartChart: () => void;
  onOpenBirthForm: () => void;
  onLoadSample: () => void;
  onOpenPricing: () => void;
}

export const MainPageSections: React.FC<MainPageSectionsProps> = ({
  onStartChart,
  onOpenBirthForm,
  onLoadSample,
  onOpenPricing,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: '출생시간을 정확히 모르면 사주나 차트를 볼 수 없나요?',
      a: '출생시간을 몰라도 충분히 정확도 높은 분석이 가능합니다. [출생시간을 모릅니다] 옵션을 선택하시면 임의 추정 없이 년주·월주·일주 3주 6자를 기준으로 본원의 기운과 오행, 10년 대운을 엄밀하게 분석해 드립니다.',
    },
    {
      q: '입력한 출생정보(생년월일시, 이름)는 서버에 저장되나요?',
      a: '명결은 개인정보 최소화 및 무저장 원칙을 철저히 준수합니다. 입력하신 정보는 사용자의 브라우저 세션 내에서만 연산에 사용되며, 별도의 회원가입 없이 외부 데이터베이스에 개인정보를 영구 보관하지 않습니다.',
    },
    {
      q: '전통 사주명리학과 서양·태국 점성술이 어떻게 연결되나요?',
      a: '태어난 순간의 천문학적 좌표라는 동일한 시작점을 공유합니다. 동양의 음양오행과 십성이 내면의 심리와 사회적 관계를 조명한다면, 서양의 10대 행성과 태국 수리야야트라는 무의식적 성향과 천체 에너지를 보완하여 보다 입체적인 인생 지도를 완성합니다.',
    },
    {
      q: 'AI(Gemini)가 사주팔자를 임의로 추측해서 만들어내나요?',
      a: '절대 그렇지 않습니다. 명결은 천문 만세력 및 율리우스 적일수 기반의 결정론적 계산 엔진(sajuCalculator)을 거쳐 4주 8자와 오행 수치를 먼저 엄밀하게 계산합니다. AI는 이 계산된 데이터를 바탕으로 명리학 원전에 입각한 해석자의 역할만을 수행합니다.',
    },
    {
      q: '무속적인 저주나 공포스러운 살(殺)이 나오면 어떻게 하나요?',
      a: '명결은 공포나 미신을 조장하지 않습니다. 전통 신살(도화살, 역마살 등)은 나쁜 흉조가 아니라 현대 사회에서 매력, 추진력, 독창성으로 승화될 수 있는 고유의 역동적 에너지이자 대인관계 체크포인트로 재해석하여 설명합니다.',
    },
    {
      q: '모바일 환경에서도 모든 차트와 리포트를 편리하게 볼 수 있나요?',
      a: '네, 명결은 모바일 최우선 반응형 웹으로 설계되었습니다. 하단 5대 퀵 네비게이션과 터치 친화적 아코디언, 인터랙티브 원형 차트를 통해 스마트폰에서도 한눈에 쾌적하게 열람하실 수 있습니다.',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* 1. 명결은 무엇인가? (Brand Philosophy) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0f1324] to-[#0a0d18] border border-amber-500/20 p-8 sm:p-12 overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>명결(命結)의 철학과 지향점</span>
            </div>

            <h2 className="font-serif-kr text-2xl sm:text-4xl font-bold text-white leading-snug">
              "명(命)은 타고난 삶의 구조이며, <br className="hidden sm:inline" />
              <span className="text-amber-300">결(結)은 사람과 인연, 그리고 선택의 연결입니다."</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              명결은 미래를 신통하게 맞히는 요행이나 불안을 자극하는 무속적 예언 사이트가 아닙니다.
              수천 년 동안 축적된 동양 전통 명리학의 수학적 질서와 현대 인공지능의 심층 언어 모델을 결합하여,
              내가 어떤 기운을 품고 태어났는지 객관적으로 이해하고 오늘과 내일의 올바른 선택을 내릴 수 있도록 돕는
              <strong> 현대인을 위한 지적인 인생 분석 플랫폼</strong>입니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <div className="text-amber-400 font-serif-kr font-bold text-base">01. 공포 없는 분석</div>
                <p className="text-xs text-stone-400 leading-normal">
                  흉살이나 운명의 단정 대신, 강점을 살리고 취약점을 보완하는 실용적 조언에 집중합니다.
                </p>
              </div>
              <div className="space-y-1">
                <div className="text-amber-400 font-serif-kr font-bold text-base">02. 수학적 만세력 연산</div>
                <p className="text-xs text-stone-400 leading-normal">
                  AI 환각 없는 독립 연산 엔진으로 4주 8자와 오행 수치를 1초 만에 오차 없이 도출합니다.
                </p>
              </div>
              <div className="space-y-1">
                <div className="text-amber-400 font-serif-kr font-bold text-base">03. 동서양 천문 통합</div>
                <p className="text-xs text-stone-400 leading-normal">
                  사주팔자 + 오행 + 십성 + 대운에 서양 10대 행성과 태국 수리야야트라를 하나로 결합합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 나의 인생차트 시각화 & 구성 (Life Chart Preview) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
            <Compass className="w-3.5 h-3.5" />
            <span>나만의 고유한 천문 지도</span>
          </div>
          <h2 className="font-serif-kr text-2xl sm:text-4xl font-bold text-white">
            원형 인생차트 (Life Chart Mandala)
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light">
            복잡한 한자와 역학 기호를 단 하나의 조화로운 코스믹 원형 차트로 시각화하여 내 삶의 에너지를 직관적으로 파악합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Chart Feature Cards Left */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/30 transition">
              <div className="text-xs font-semibold text-amber-400 mb-1">01. 사주팔자 4주</div>
              <h4 className="text-white font-bold text-sm mb-1">년·월·일·시 8글자의 배치</h4>
              <p className="text-xs text-stone-400">
                뿌리(년주), 사회성(월주), 자아(일주), 미래 결실(시주)의 상호 역학을 한눈에 조망합니다.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/30 transition">
              <div className="text-xs font-semibold text-amber-400 mb-1">02. 음양오행 밸런스</div>
              <h4 className="text-white font-bold text-sm mb-1">목·화·토·금·수 조화도</h4>
              <p className="text-xs text-stone-400">
                어떤 기운이 넘치고 어떤 기운이 부족한지 0~100점의 오행 조화 지표로 명쾌하게 진단합니다.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/30 transition">
              <div className="text-xs font-semibold text-amber-400 mb-1">03. 10대 대운 타임라인</div>
              <h4 className="text-white font-bold text-sm mb-1">10년 주기의 거대한 계절 변화</h4>
              <p className="text-xs text-stone-400">
                내 삶의 봄, 여름, 가을, 겨울이 언제 찾아오고 어떤 기회가 열리는지 타임라인으로 보여줍니다.
              </p>
            </div>
          </div>

          {/* Central Visual Graphic */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl bg-[#0c1022] border border-amber-500/30 shadow-2xl relative">
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-amber-500/30 relative flex items-center justify-center bg-radial from-amber-500/10 via-[#070914] to-[#04060c]">
              <div className="absolute inset-2 rounded-full border border-dashed border-indigo-400/30 animate-spin" style={{ animationDuration: '30s' }} />
              <div className="text-center space-y-1">
                <span className="font-serif-kr text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                  命結
                </span>
                <p className="text-[10px] text-amber-300 font-semibold tracking-widest uppercase">
                  Cosmic Life Chart
                </p>
              </div>

              {/* Orbital Nodes */}
              <div className="absolute -top-3 px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-600 text-[10px]">
                木 木气
              </div>
              <div className="absolute -right-3 px-2 py-0.5 rounded bg-rose-950/90 text-rose-300 border border-rose-600 text-[10px]">
                火 火气
              </div>
              <div className="absolute -bottom-3 px-2 py-0.5 rounded bg-blue-950/90 text-blue-300 border border-blue-600 text-[10px]">
                水 水气
              </div>
              <div className="absolute -left-3 px-2 py-0.5 rounded bg-slate-800/90 text-slate-200 border border-slate-500 text-[10px]">
                金 金气
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={onLoadSample}
                className="px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer mx-auto"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>샘플 인생차트 실시간 열람</span>
              </button>
            </div>
          </div>

          {/* Chart Feature Cards Right */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/30 transition">
              <div className="text-xs font-semibold text-amber-400 mb-1">04. 2026~2035 10개년 연운</div>
              <h4 className="text-white font-bold text-sm mb-1">해마다 맞이하는 실질적 기운</h4>
              <p className="text-xs text-stone-400">
                향후 10년간 재물, 직업, 연애, 인간관계에서 참고해야 할 핵심 포인트와 행동 지침 카드 제공.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/30 transition">
              <div className="text-xs font-semibold text-amber-400 mb-1">05. 서양 & 태국 점성학</div>
              <h4 className="text-white font-bold text-sm mb-1">태양·달·10행성과 수리야야트라</h4>
              <p className="text-xs text-stone-400">
                동양 명리학의 분석과 교차 검증하여 성향의 일치점과 개운 컬러·방위를 명확히 짚어냅니다.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/30 transition">
              <div className="text-xs font-semibold text-amber-400 mb-1">06. 13단계 AI 종합 리포트</div>
              <h4 className="text-white font-bold text-sm mb-1">Gemini 기반 품격 있는 인생상담</h4>
              <p className="text-xs text-stone-400">
                전체 명식 데이터에 특화된 AI가 궁금한 질문에 따뜻하고 신뢰도 높은 해답을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 인연 궁합 & AI 상담 안내 (Synergy & Consultation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Compatibility Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-rose-950/20 via-[#0e1122] to-slate-900/90 border border-rose-500/20 space-y-5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-white mb-2">
                명결 인연 궁합 : 단절이 아닌 소통
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                "이 궁합은 최악입니다", "헤어져야 합니다"와 같은 자극적인 단정을 거부합니다.
                두 사람의 오행 차이와 일간의 기운을 대조하여, 서로의 기질을 어떻게 보듬고 갈등 시 어떤 언어로 소통해야 하는지 해법을 제시합니다.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onStartChart}
                className="px-5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>두 사람 궁합 분석하기</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* AI Consultation Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/30 via-[#0e1122] to-slate-900/90 border border-indigo-500/30 space-y-5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-white mb-2">
                AI 도사 1:1 인생상담 : 내 차트 맞춤 문답
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                일반적인 챗봇이 아닙니다. 이미 계산된 내 사주 명식과 오행, 대운의 컨텍스트를 완벽히 인지한 상태에서
                "이직 타이밍", "동업 시 유의점", "올해 재물 관리 비법" 등 개인화된 질문에 명쾌하게 답합니다.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onStartChart}
                className="px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>내 차트로 AI 질문하기</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 자주 묻는 질문 FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>궁금한 점을 미리 풀어드립니다</span>
          </div>
          <h2 className="font-serif-kr text-2xl sm:text-3xl font-bold text-white">
            자주 묻는 질문 (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-stone-900/60 border border-stone-800/80 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-white hover:text-amber-300 transition cursor-pointer"
                >
                  <span className="font-medium text-sm sm:text-base flex items-center gap-2.5">
                    <span className="text-amber-400 font-bold font-serif-kr">Q.</span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/40 animate-fade-in font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. 하단 무료 분석 즉시 시작 CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#101426] to-amber-500/10 border border-amber-500/30 p-8 sm:p-14 text-center space-y-6 shadow-2xl overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              MYEONGGYEOL LIFE CHART PLATFORM
            </span>
            <h2 className="font-serif-kr text-2xl sm:text-4xl font-bold text-white">
              지금, 당신만의 인생차트를 열어보세요.
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light">
              태어난 순간의 천문 정보로 사주팔자부터 10년 대운, 2026~2035 연운까지 무료로 분석해 드립니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenBirthForm}
              className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base shadow-xl shadow-amber-500/20 transition hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-5 h-5" />
              <span>내 인생차트 무료로 보기</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenPricing}
              className="px-6 py-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-semibold text-sm transition cursor-pointer"
            >
              프리미엄 리포트 안내
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              회원가입 없는 즉시 분석
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" />
              출생정보 비저장 원칙 준수
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
