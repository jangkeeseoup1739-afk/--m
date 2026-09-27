import React, { useState } from 'react';
import { BirthInput, CompatibilityResult } from '../types/saju';
import { calculateCompatibility } from '../utils/compatibilityCalculator';
import { Sparkles, Heart, Users, MessageSquare, DollarSign, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface CompatibilitySectionProps {
  initialPersonA?: BirthInput | null;
}

export const CompatibilitySection: React.FC<CompatibilitySectionProps> = ({ initialPersonA }) => {
  const [personA, setPersonA] = useState<BirthInput>(
    initialPersonA || {
      name: '이민호',
      gender: 'male',
      birthDate: '1992-04-18',
      birthTime: '10:30',
      isUnknownTime: false,
      calendarType: 'solar',
      birthCity: '서울특별시',
      interest: 'relationship',
    }
  );

  const [personB, setPersonB] = useState<BirthInput>({
    name: '김지수',
    gender: 'female',
    birthDate: '1994-09-22',
    birthTime: '15:20',
    isUnknownTime: false,
    calendarType: 'solar',
    birthCity: '부산광역시',
    interest: 'relationship',
  });

  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const handleRunCompatibility = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateCompatibility(personA, personB);
    setResult(res);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Intro Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-semibold">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>명결 사주 인연 & 다차원 궁합 진단</span>
        </div>
        <h2 className="font-serif-kr text-2xl sm:text-3xl font-bold text-slate-100">
          두 사람의 기운과 인연의 연결 (命結)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
          단순한 '최고/최악'의 등급 매기기가 아닌, 서로의 타고난 차이를 이해하고 건강한 소통과 시너지를 일구는 관계의 나침반을 제공합니다.
        </p>
      </div>

      {/* Dual Input Form */}
      <form onSubmit={handleRunCompatibility} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Person A */}
          <div className="p-5 rounded-2xl bg-[#0d1124] border border-blue-900/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-blue-950 pb-3">
              <span className="font-serif-kr font-bold text-slate-200 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                첫 번째 대상자 (A)
              </span>
              <span className="text-[10px] text-blue-400/90 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-900/60">
                기본 축
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">이름 / 닉네임</label>
                <input
                  type="text"
                  value={personA.name}
                  onChange={(e) => setPersonA({ ...personA, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">성별</label>
                  <select
                    value={personA.gender}
                    onChange={(e) => setPersonA({ ...personA, gender: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                  >
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">출생지역</label>
                  <input
                    type="text"
                    value={personA.birthCity}
                    onChange={(e) => setPersonA({ ...personA, birthCity: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">생년월일 (양력)</label>
                <input
                  type="date"
                  value={personA.birthDate}
                  onChange={(e) => setPersonA({ ...personA, birthDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">출생시간</label>
                <input
                  type="time"
                  value={personA.birthTime}
                  onChange={(e) => setPersonA({ ...personA, birthTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Person B */}
          <div className="p-5 rounded-2xl bg-[#0d1124] border border-rose-900/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-rose-950 pb-3">
              <span className="font-serif-kr font-bold text-slate-200 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                두 번째 대상자 (B)
              </span>
              <span className="text-[10px] text-rose-400/90 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900/60">
                상대방
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">이름 / 닉네임</label>
                <input
                  type="text"
                  value={personB.name}
                  onChange={(e) => setPersonB({ ...personB, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">성별</label>
                  <select
                    value={personB.gender}
                    onChange={(e) => setPersonB({ ...personB, gender: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                  >
                    <option value="female">여성</option>
                    <option value="male">남성</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">출생지역</label>
                  <input
                    type="text"
                    value={personB.birthCity}
                    onChange={(e) => setPersonB({ ...personB, birthCity: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">생년월일 (양력)</label>
                <input
                  type="date"
                  value={personB.birthDate}
                  onChange={(e) => setPersonB({ ...personB, birthDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">출생시간</label>
                <input
                  type="time"
                  value={personB.birthTime}
                  onChange={(e) => setPersonB({ ...personB, birthTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-rose-500/20 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>두 사람의 사주 궁합 분석하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Compatibility Result Showcase */}
      {result && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1124] border border-amber-500/30 shadow-2xl space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-indigo-950 pb-4">
            <div>
              <div className="text-xs text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>명결 다면 궁합 리포트</span>
              </div>
              <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-slate-100">
                {result.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400">관계 공명 지수: </span>
              <strong className="text-amber-300 font-bold text-base">{result.overallResonanceScore}점</strong>
            </div>
          </div>

          {/* Core Philosophy Summary */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-amber-200/90 font-serif-kr leading-relaxed">
            "{result.summary}"
          </div>

          {/* Elemental Harmonies Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200">오행 및 기운의 상호작용</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {result.elementalHarmonies.map((h, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                  <div className="font-semibold text-slate-200">{h.title}</div>
                  <p className="text-slate-400 leading-relaxed font-light">{h.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Thematic Deep Dives */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>성향 차이 및 심리 동역학</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-light">{result.personalityDynamics}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>소통 및 대화 스타일 조화</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-light">{result.communicationStyle}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>연애 및 결혼 동반자 흐름</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-light">{result.loveAndMarriage}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>재물 자산 및 비즈니스 파트너십</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-light">{result.wealthAndPartnership}</p>
            </div>
          </div>

          {/* Key Advice & Conflict Resolution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
              <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>두 사람의 관계에서 빛나는 강점</span>
              </div>
              <ul className="space-y-1 text-slate-300 font-light">
                {result.positiveKeyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-2">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>갈등 예방을 위한 지혜로운 조언</span>
              </div>
              <p className="text-slate-300 font-light leading-relaxed mb-1">
                {result.conflictResolution}
              </p>
              <ul className="space-y-1 text-slate-400 font-light">
                {result.cautionPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
