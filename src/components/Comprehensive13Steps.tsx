import React, { useState } from 'react';
import { LifeChartReport, StepAnalysis } from '../types/saju';
import { Sparkles, ChevronDown, ChevronUp, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

interface Comprehensive13StepsProps {
  report: LifeChartReport;
  onOpenChat: () => void;
  aiInterpretation?: string | null;
  isLoadingAi?: boolean;
  focusedStep?: string | null;
}

export const Comprehensive13Steps: React.FC<Comprehensive13StepsProps> = ({
  report,
  onOpenChat,
  aiInterpretation,
  isLoadingAi,
  focusedStep,
}) => {
  const [openSteps, setOpenSteps] = useState<Record<string, boolean>>({
    '01': true, // Open step 1 by default
    '06': false,
    '07': false,
    '08': false,
    '13': true, // Open step 13 (인생상담) by default
  });

  React.useEffect(() => {
    if (focusedStep) {
      setOpenSteps((prev) => ({
        ...prev,
        [focusedStep]: true,
      }));
    }
  }, [focusedStep]);

  const toggleStep = (stepNumber: string) => {
    setOpenSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Headline & Core Summary Card (Section 31 UX) */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#121733] via-[#0d1124] to-[#0a0d1e] border border-amber-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>차트에서 가장 먼저 확인되는 핵심 특징</span>
            </div>
            <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-slate-100">
              {report.birth.name}님의 인생 명리 총평
            </h3>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {report.keywords.map((kw, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed font-serif-kr p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          "{report.keyHeadline}"
        </p>

        {/* AI Enhanced Synthesis Card if available */}
        {isLoadingAi ? (
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300 flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            <span>Gemini AI가 차트의 사주·오행·대운을 심층 종합 해석하고 있습니다...</span>
          </div>
        ) : aiInterpretation ? (
          <div className="p-4 sm:p-5 rounded-xl bg-indigo-950/30 border border-indigo-800/60 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>명결 AI 심층 종합 분석 제언</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed font-light whitespace-pre-line">
              {aiInterpretation}
            </div>
          </div>
        ) : null}
      </div>

      {/* 13 Steps Accordion List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-serif-kr text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>13단계 프리미엄 종합사주 리포트</span>
            <span className="text-xs font-normal text-slate-400">(01 ~ 13)</span>
          </h3>
          <span className="text-xs text-slate-400">카드를 클릭하여 상세 분석 펼치기</span>
        </div>

        {report.steps.map((step) => {
          const isOpen = !!openSteps[step.stepNumber];
          const isConsultStep = step.stepNumber === '12';
          const isLifeAdviceStep = step.stepNumber === '13';

          return (
            <div
              key={step.stepNumber}
              className={`rounded-2xl transition border overflow-hidden ${
                isOpen
                  ? 'bg-[#0d1124] border-indigo-800/80 shadow-lg'
                  : 'bg-[#0a0d1e]/80 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => toggleStep(step.stepNumber)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isOpen
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}>
                    {step.stepNumber}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-serif-kr text-sm sm:text-base font-bold text-slate-100 truncate">
                        {step.title}
                      </h4>
                      {step.tags && step.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.2 rounded bg-slate-900 text-slate-400 hidden sm:inline-block">
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-400 truncate mt-0.5 font-light">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-slate-400">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 space-y-4 border-t border-slate-800/80 pt-4">
                  {/* Summary Highlight */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-amber-200/90 font-serif-kr leading-relaxed">
                    "{step.summary}"
                  </div>

                  {/* Detailed Analysis Points */}
                  <div className="space-y-2 text-xs">
                    {step.detailedAnalysis.map((para, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-slate-300 font-light leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <p>{para}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recommendation Box */}
                  <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 font-semibold">명결의 삶의 제언: </strong>
                      <span className="text-slate-300 font-light">{step.recommendation}</span>
                    </div>
                  </div>

                  {/* Interactive Button for Step 12 (AI Chat) */}
                  {isConsultStep && (
                    <div className="pt-2">
                      <button
                        onClick={onOpenChat}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>내 차트에 대해 더 물어보기 (AI 1:1 상담)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Disclaimer for Step 09 (Health) */}
                  {step.stepNumber === '09' && (
                    <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-900/40 text-[11px] text-rose-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>건강 관련 내용은 전통 명리학적 참고 해석이며, 의학적 진단이나 치료를 대신하지 않습니다.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
