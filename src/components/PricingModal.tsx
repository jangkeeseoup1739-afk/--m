import React from 'react';
import { X, Check, Sparkles, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { PRODUCT_PLANS, PlanProduct } from '../data/products';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: PlanProduct) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#0c0f1c] border border-stone-800 rounded-3xl shadow-2xl p-6 sm:p-10 my-8 overflow-hidden text-slate-100 max-h-[90vh] flex flex-col">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>명결(命結) 멤버십 및 리포트 안내</span>
            </div>
            <h2 className="font-serif-kr text-2xl sm:text-3xl font-bold text-white">
              인생차트 서비스 플랜
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              현재 기본 사주와 인생차트는 100% 무료로 즉시 체험하실 수 있으며, 향후 심층 리포트 확장 구조를 지원합니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 py-6 overflow-y-auto pr-1">
          {PRODUCT_PLANS.map((plan) => {
            const isHighlight = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-5 transition border ${
                  isHighlight
                    ? 'bg-gradient-to-b from-amber-500/15 via-[#12162a] to-[#0d1020] border-amber-500/60 shadow-xl shadow-amber-500/10'
                    : 'bg-stone-900/50 border-stone-800/80 hover:border-stone-700'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] shadow">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="text-xs font-medium text-amber-400 mb-0.5">{plan.tier}</div>
                  <h3 className="font-serif-kr text-base font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-[11px] text-stone-400 mb-3 h-8 leading-snug">{plan.subtitle}</p>

                  <div className="mb-4 pb-3 border-b border-stone-800">
                    {plan.price === 0 ? (
                      <div className="text-2xl font-bold text-emerald-400 font-serif-kr">무료</div>
                    ) : (
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-bold text-amber-200">
                          ₩{plan.price.toLocaleString()}
                        </span>
                        {plan.originalPrice && (
                          <span className="text-xs text-stone-500 line-through">
                            ₩{plan.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-2 mb-6 text-[11px] text-stone-300">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectPlan(plan);
                    onClose();
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1 ${
                    isHighlight
                      ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Notice */}
        <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            안전한 결제 아키텍처 연동 규격 준수 (현재 단계에서는 모의 신청 및 무료 체험 적용)
          </span>
          <button
            onClick={onClose}
            className="text-amber-400 hover:underline cursor-pointer text-xs"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
