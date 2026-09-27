import React, { useState, useEffect } from 'react';
import { BirthInput, LifeChartReport } from './types/saju';
import { calculateSaju } from './utils/sajuCalculator';
import { calculateWesternAstrology } from './utils/astrologyCalculator';
import { calculateThaiAstrology } from './utils/thaiAstrologyCalculator';
import { buildLifeChartReport } from './data/interpretations';
import { SAMPLE_PROFILES } from './data/sampleProfiles';
import { requestAiAnalysis } from './services/geminiService';
import { PlanProduct } from './data/products';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { MainPageSections } from './components/MainPageSections';
import { BirthForm } from './components/BirthForm';
import { LifeChartMandala } from './components/LifeChartMandala';
import { SajuTable } from './components/SajuTable';
import { FiveElementsBar } from './components/FiveElementsBar';
import { TenGodsSection } from './components/TenGodsSection';
import { TwelveStagesSection } from './components/TwelveStagesSection';
import { ShinsalSection } from './components/ShinsalSection';
import { DaeunTimeline } from './components/DaeunTimeline';
import { AnnualLuckSection } from './components/AnnualLuckSection';
import { AstrologySection } from './components/AstrologySection';
import { Comprehensive13Steps } from './components/Comprehensive13Steps';
import { CompatibilitySection } from './components/CompatibilitySection';
import { AIChatSection } from './components/AIChatSection';
import { GuideSection } from './components/GuideSection';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PricingModal } from './components/PricingModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentReport, setCurrentReport] = useState<LifeChartReport | null>(null);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [aiInterpretation, setAiInterpretation] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [showBirthFormInLifeChart, setShowBirthFormInLifeChart] = useState(false);
  const [isUserCustomData, setIsUserCustomData] = useState(false);
  const [targetStep, setTargetStep] = useState<string | null>(null);

  // Initialize with sample report on first load for instant exploration availability
  useEffect(() => {
    const defaultSample = SAMPLE_PROFILES[0].input;
    generateReport(defaultSample, false, false);
  }, []);

  const generateReport = async (input: BirthInput, navigateToChart = true, isUserCreated = true) => {
    setIsLoadingChart(true);
    setCalculationError(null);

    try {
      // 1. Pure deterministic Saju calculation engine
      const sajuCalc = calculateSaju(input);

      // 2. Western astrology calculation engine
      const westernCalc = calculateWesternAstrology(input);

      // 3. Thai astrology calculation engine
      const thaiCalc = calculateThaiAstrology(input);

      // 4. Synthesize complete 13-stage structured report
      const report = buildLifeChartReport(
        input,
        sajuCalc.saju,
        sajuCalc.fiveElements,
        sajuCalc.tenGods,
        sajuCalc.daeunList,
        sajuCalc.annualLuckList,
        westernCalc,
        thaiCalc
      );

      setCurrentReport(report);
      setIsUserCustomData(isUserCreated);
      setShowBirthFormInLifeChart(false);
      setAiInterpretation(null);

      if (navigateToChart) {
        setActiveTab('life-chart');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // 5. Asynchronously invoke Gemini AI analysis to enhance the interpretation
      setIsLoadingAi(true);
      requestAiAnalysis(report)
        .then((aiRes) => {
          if (aiRes && aiRes.aiInterpretation) {
            setAiInterpretation(aiRes.aiInterpretation);
          }
        })
        .catch((e) => console.error('AI Analysis Background Error:', e))
        .finally(() => setIsLoadingAi(false));
    } catch (err: any) {
      console.error('Calculation Error:', err);
      setCalculationError('사주팔자 계산 중 문제가 발생했습니다: ' + (err?.message || '입력 정보를 다시 확인해주세요.'));
    } finally {
      setIsLoadingChart(false);
    }
  };

  const handleStartChart = () => {
    setActiveTab('free-saju');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadSample = () => {
    const sample = SAMPLE_PROFILES[0].input;
    generateReport(sample, true, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlanSelect = (plan: PlanProduct) => {
    if (plan.tier === 'FREE') {
      handleStartChart();
    } else if (plan.tier === 'COMPATIBILITY') {
      setActiveTab('compatibility');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (plan.tier === 'AI_CONSULTING') {
      if (currentReport) {
        setActiveTab('ai-consult');
      } else {
        handleStartChart();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentReport) {
        setActiveTab('comprehensive');
      } else {
        handleStartChart();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 pb-16 md:pb-0">
      {/* Top Brand Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasChart={!!currentReport}
        onOpenBirthForm={handleStartChart}
        onSelectStep={(step) => {
          setTargetStep(step);
          setActiveTab('comprehensive');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main App Content Body */}
      <main className="flex-1">
        {/* TAB: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Main Hero Banner with Authentic Screenshot Image */}
            <Hero
              onStartChart={handleStartChart}
              onOpenBirthForm={handleStartChart}
              onLoadSample={handleLoadSample}
            />

            {/* Quick Preview of Life Chart if loaded */}
            {currentReport && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div>
                    <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-slate-100">
                      인생차트 미리보기
                    </h3>
                    <p className="text-xs text-slate-400">
                      최근 생성된 {currentReport.birth.name}님의 인생차트 요약입니다.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('life-chart')}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>전체 차트 상세 보기</span>
                    <span>→</span>
                  </button>
                </div>

                <LifeChartMandala report={currentReport} />
                <SajuTable saju={currentReport.saju} />
              </div>
            )}

            {/* Full Main Page Flow (명결 소개 -> 원형 차트 구조 -> 7대 기둥 -> 궁합/AI 소개 -> FAQ -> CTA) */}
            <MainPageSections
              onStartChart={handleStartChart}
              onOpenBirthForm={handleStartChart}
              onLoadSample={handleLoadSample}
              onOpenPricing={() => setIsPricingOpen(true)}
            />
          </div>
        )}

        {/* TAB: FREE SAJU (BIRTH INPUT FORM) */}
        {activeTab === 'free-saju' && (
          <div className="py-6">
            {calculationError && (
              <div className="max-w-3xl mx-auto px-4 mb-4">
                <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-sm">
                  {calculationError}
                </div>
              </div>
            )}
            <BirthForm
              onSubmit={(data) => {
                generateReport(data, true, true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              isLoading={isLoadingChart}
            />
          </div>
        )}

        {/* TAB: LIFE CHART (나의 인생차트 종합 화면) */}
        {activeTab === 'life-chart' && currentReport && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
            {/* Top Navigation & Saju Input Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0e1224] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold font-serif-kr text-lg shadow-inner">
                  {currentReport.saju.dayMaster}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base sm:text-lg">
                      {currentReport.birth.name}님의 사주팔자 인생차트
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30">
                      {currentReport.birth.gender === 'female' ? '여성' : '남성'}
                    </span>
                    {!isUserCustomData ? (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium">
                        샘플 데이터
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        정통 만세력 연산 완료
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {currentReport.birth.birthDate}{' '}
                    {currentReport.birth.isUnknownTime ? '(출생시간 미상)' : currentReport.birth.birthTime} ·{' '}
                    {currentReport.birth.birthCity}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowBirthFormInLifeChart(!showBirthFormInLifeChart)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>{showBirthFormInLifeChart ? '입력창 닫기' : '내 사주팔자 새로 입력 / 수정'}</span>
                </button>
              </div>
            </div>

            {/* Inline Birth Form if toggled */}
            {showBirthFormInLifeChart && (
              <div className="animate-fadeIn">
                <BirthForm
                  initialData={currentReport.birth}
                  onSubmit={(data) => {
                    generateReport(data, true, true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  isLoading={isLoadingChart}
                  onCancel={() => setShowBirthFormInLifeChart(false)}
                />
              </div>
            )}

            {calculationError && (
              <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-sm">
                {calculationError}
              </div>
            )}

            {/* 1. Celestial Life Mandala */}
            <LifeChartMandala report={currentReport} />

            {/* 2. Traditional Four Pillars Table with Cell Click Explanation */}
            <SajuTable saju={currentReport.saju} />

            {/* 3. Five Elements Balance Analysis */}
            <FiveElementsBar fiveElements={currentReport.fiveElements} />

            {/* 4. Daeun Timeline */}
            <DaeunTimeline daeunList={currentReport.daeunList} />

            {/* 5. 2026 ~ 2035 Annual Luck */}
            <AnnualLuckSection annualLuckList={currentReport.annualLuckList} />

            {/* 6. Western & Thai Astrology */}
            <AstrologySection
              western={currentReport.westernAstrology}
              thai={currentReport.thaiAstrology}
            />

            {/* 7. 13-Step Comprehensive Summary */}
            <Comprehensive13Steps
              report={currentReport}
              onOpenChat={() => {
                setActiveTab('ai-consult');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aiInterpretation={aiInterpretation}
              isLoadingAi={isLoadingAi}
              focusedStep={targetStep}
            />
          </div>
        )}

        {/* TAB: COMPREHENSIVE ANALYSIS (13단계 프리미엄 분석) */}
        {activeTab === 'comprehensive' && currentReport && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <Comprehensive13Steps
              report={currentReport}
              onOpenChat={() => {
                setActiveTab('ai-consult');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aiInterpretation={aiInterpretation}
              isLoadingAi={isLoadingAi}
              focusedStep={targetStep}
            />

            <TenGodsSection tenGods={currentReport.tenGods} />
            <TwelveStagesSection saju={currentReport.saju} />
            <ShinsalSection saju={currentReport.saju} />
          </div>
        )}

        {/* TAB: COMPATIBILITY (사주 궁합) */}
        {activeTab === 'compatibility' && (
          <CompatibilitySection initialPersonA={currentReport?.birth || null} />
        )}

        {/* TAB: AI CONSULTATION (AI 1:1 상담) */}
        {activeTab === 'ai-consult' && currentReport && (
          <AIChatSection report={currentReport} />
        )}

        {/* TAB: GUIDE (이용안내 및 철학) */}
        {activeTab === 'guide' && (
          <GuideSection onStartFreeSaju={handleStartChart} />
        )}
      </main>

      {/* Brand Footer with Disclaimers and Privacy Protection */}
      <Footer
        onNavigate={(tab) => {
          if (tab === 'pricing') {
            setIsPricingOpen(true);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* Pricing / Product Plans Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onSelectPlan={handlePlanSelect}
      />

      {/* Mobile Bottom Navigation Bar (5 tabs) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasChart={!!currentReport}
        onOpenBirthForm={handleStartChart}
      />
    </div>
  );
}
