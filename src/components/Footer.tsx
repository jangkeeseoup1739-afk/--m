import React from 'react';
import { ShieldCheck, Sparkles, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const seoKeywords = [
    '무료사주', '사주팔자', '사주풀이', '무료사주사이트', '인생차트',
    '사주궁합', '무료궁합', '재물운', '직업운', '연애운',
    '대운', '사주대운', '자미두수', '점성술', '태국점성술',
  ];

  return (
    <footer className="bg-gradient-to-b from-[#0d0a2a]/35 via-[#0d0a2a]/65 to-[#0d0a2a]/85 backdrop-blur-xl border-t border-white/10 text-slate-300 text-xs py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Section: Brand Story & Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif-kr text-2xl font-bold text-slate-100">
                명결 <span className="text-amber-400 font-serif-kr text-lg">命結</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-indigo-200 border border-white/15">
                AI 사주 · 인생차트
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md font-serif-kr">
              "命"은 타고난 삶의 고유한 결을, "結"은 사람과 인연, 그리고 현재의 선택이 빚어내는 삶의 연결을 뜻합니다.
            </p>
            <p className="text-slate-300/90 text-xs leading-relaxed max-w-md">
              명결은 단순한 미래 예측이 아닌, 나만의 타고난 구조를 깊이 이해하고 오늘과 내일의 현명한 선택을 함께 사유하는 현대적 인생 분석 서비스입니다.
            </p>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold text-sm mb-3">빠른 메뉴</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('free-saju')} className="hover:text-amber-300 transition">
                  무료 사주 시작
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('life-chart')} className="hover:text-amber-300 transition">
                  나의 인생차트
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('comprehensive')} className="hover:text-amber-300 transition">
                  13단계 프리미엄 분석
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compatibility')} className="hover:text-amber-300 transition">
                  사주 궁합 진단
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-consult')} className="hover:text-amber-300 transition">
                  AI 1:1 인생상담
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guide')} className="hover:text-amber-300 transition">
                  서비스 철학 및 이용안내
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-slate-200 font-semibold text-sm">개인정보 및 안전 안내</h4>
            <div className="flex items-start gap-2 text-slate-300/90 text-xs leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>입력하신 출생정보는 안전하게 클라이언트 브라우저 및 일회성 AI 분석 연산에만 사용되며, 불필요한 개인 식별 데이터는 서버에 무단 영구 저장되지 않습니다.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-300/90 text-xs leading-relaxed">
              <HeartHandshake className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>어떠한 무속적 공포나 단정적 예언을 배제하고, 주체적인 삶의 통찰을 지향합니다.</span>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Required by Prompt */}
        <div className="bg-white/[0.05] p-4 sm:p-5 rounded-xl border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>명결 서비스 면책 및 해석 기준 고지</span>
          </div>
          <p className="text-slate-300/90 text-[11px] leading-relaxed">
            "명결의 사주 및 점성술 분석은 전통적인 명리학과 점성술 체계를 바탕으로 한 참고용 해석입니다. 미래의 결과를 확정적으로 예측하거나 의료·법률·투자 등의 전문적인 판단을 대신하지 않습니다."
          </p>
        </div>

        {/* SEO Keywords */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <div className="text-[11px] text-slate-400 font-medium">연관 검색어 키워드 안내:</div>
          <div className="flex flex-wrap gap-1.5">
            {seoKeywords.map((kw) => (
              <span
                key={kw}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.07] text-slate-300 border border-white/10"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 pt-4 border-t border-white/10 gap-2">
          <p>© {new Date().getFullYear()} 명결(命結) AI 인생차트. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <span>개인정보처리방침</span>
            <span>·</span>
            <span>이용약관</span>
            <span>·</span>
            <span>문의 및 지원</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
