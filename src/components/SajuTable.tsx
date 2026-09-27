import React, { useState } from 'react';
import { SajuPillars, Pillar, ElementType } from '../types/saju';
import { Sparkles, Info } from 'lucide-react';
import { SajuDetailModal } from './SajuDetailModal';

interface SajuTableProps {
  saju: SajuPillars;
}

export const SajuTable: React.FC<SajuTableProps> = ({ saju }) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    pillarName: '년주' | '월주' | '일주' | '시주';
    pillarData?: Pillar;
    cellType: 'gan' | 'ji' | 'tenGod' | 'stage';
    isUnknown?: boolean;
  }>({
    isOpen: false,
    pillarName: '일주',
    cellType: 'gan',
  });

  const openDetail = (
    pillarName: '년주' | '월주' | '일주' | '시주',
    pillarData: Pillar | null,
    cellType: 'gan' | 'ji' | 'tenGod' | 'stage',
    isUnknown: boolean = false
  ) => {
    setModalState({
      isOpen: true,
      pillarName,
      pillarData: pillarData || undefined,
      cellType,
      isUnknown,
    });
  };

  const elemBadge = (elem: ElementType) => {
    switch (elem) {
      case 'wood':
        return { name: '목(木)', bg: 'bg-emerald-950/70', border: 'border-emerald-700/60', text: 'text-emerald-300' };
      case 'fire':
        return { name: '화(火)', bg: 'bg-rose-950/70', border: 'border-rose-700/60', text: 'text-rose-300' };
      case 'earth':
        return { name: '토(土)', bg: 'bg-amber-950/70', border: 'border-amber-700/60', text: 'text-amber-300' };
      case 'metal':
        return { name: '금(金)', bg: 'bg-slate-800/80', border: 'border-slate-500/60', text: 'text-slate-200' };
      case 'water':
        return { name: '수(水)', bg: 'bg-blue-950/70', border: 'border-blue-700/60', text: 'text-blue-300' };
    }
  };

  const pillars: { title: '시주' | '일주' | '월주' | '년주'; subtitle: string; p: Pillar | null }[] = [
    { title: '시주', subtitle: '말년운 · 결실', p: saju.hour },
    { title: '일주', subtitle: '본인(日元) · 자아', p: saju.day },
    { title: '월주', subtitle: '사회성 · 직업 환경', p: saju.month },
    { title: '년주', subtitle: '근본 · 조상 기반', p: saju.year },
  ];

  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-[#0d1124] border border-indigo-900/60 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-indigo-950">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>전통 사주팔자 정밀 명식표</span>
          </div>
          <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>사주 명식 (四柱 八字)</span>
            <span className="text-xs font-normal text-slate-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              (각 칸을 누르면 상세 설명이 펼쳐집니다)
            </span>
          </h3>
        </div>
        {!saju.hour && (
          <div className="text-[11px] px-3 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
            출생시간 미입력으로 년·월·일 3주 정밀 분석
          </div>
        )}
      </div>

      {/* 4 Pillars Grid (Right to Left flow) */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
        {pillars.map((item, idx) => {
          const p = item.p;

          if (!p) {
            return (
              <div
                key={idx}
                onClick={() => openDetail(item.title, null, 'gan', true)}
                className="flex flex-col rounded-xl bg-slate-900/40 border border-dashed border-slate-800 p-3 sm:p-4 text-slate-500 cursor-pointer hover:border-amber-500/40 transition"
              >
                <div className="text-xs font-semibold text-slate-400 mb-1">{item.title} (時柱)</div>
                <div className="text-[10px] text-slate-500 mb-4">{item.subtitle}</div>
                <div className="my-auto py-10 text-xs text-slate-400">
                  출생시간 미입력<br />
                  <span className="text-[10px] text-amber-400/80 underline mt-1 block">안내 보기</span>
                </div>
              </div>
            );
          }

          const sBadge = elemBadge(p.stemElement);
          const bBadge = elemBadge(p.branchElement);
          const isDayPillar = idx === 1;

          return (
            <div
              key={idx}
              className={`flex flex-col rounded-xl p-3 sm:p-4 transition border ${
                isDayPillar
                  ? 'bg-gradient-to-b from-amber-500/10 via-slate-900/90 to-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Pillar Header */}
              <div className="mb-3 border-b border-slate-800 pb-2">
                <div className={`text-xs sm:text-sm font-bold ${isDayPillar ? 'text-amber-300' : 'text-slate-200'}`}>
                  {item.title} {isDayPillar && <span className="text-[10px] px-1 py-0.5 rounded bg-amber-500/20 text-amber-300 ml-1">나(日元)</span>}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                  {item.subtitle}
                </div>
              </div>

              {/* 천간 (Heavenly Stem) */}
              <div className="space-y-1.5 mb-4">
                <div className="text-[10px] text-slate-400 font-medium">천간 (天干)</div>
                <button
                  type="button"
                  onClick={() => openDetail(item.title, p, 'gan')}
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-xl bg-[#070914] border border-slate-700/60 flex flex-col items-center justify-center shadow-inner hover:border-amber-400 hover:scale-105 active:scale-95 transition cursor-pointer group"
                >
                  <span className="font-serif-kr text-2xl sm:text-3xl font-extrabold text-slate-100 group-hover:text-amber-300 transition">
                    {p.stemHanja}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium -mt-0.5">
                    {p.stemName}
                  </span>
                </button>
                <div className="flex justify-center">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${sBadge.bg} ${sBadge.border} ${sBadge.text}`}>
                    {sBadge.name}
                  </span>
                </div>
              </div>

              {/* 지지 (Earthly Branch) */}
              <div className="space-y-1.5 mb-4">
                <div className="text-[10px] text-slate-400 font-medium">지지 (地支)</div>
                <button
                  type="button"
                  onClick={() => openDetail(item.title, p, 'ji')}
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-xl bg-[#070914] border border-slate-700/60 flex flex-col items-center justify-center shadow-inner hover:border-amber-400 hover:scale-105 active:scale-95 transition cursor-pointer group"
                >
                  <span className="font-serif-kr text-2xl sm:text-3xl font-extrabold text-slate-100 group-hover:text-amber-300 transition">
                    {p.branchHanja}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium -mt-0.5">
                    {p.branchName} ({p.branchAnimal})
                  </span>
                </button>
                <div className="flex justify-center">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${bBadge.bg} ${bBadge.border} ${bBadge.text}`}>
                    {bBadge.name}
                  </span>
                </div>
              </div>

              {/* 십성 (Ten Gods) */}
              <div className="pt-2 border-t border-slate-800/80 space-y-1 mb-2">
                <div className="text-[9px] sm:text-[10px] text-slate-400">십성</div>
                <button
                  type="button"
                  onClick={() => openDetail(item.title, p, 'tenGod')}
                  className="w-full text-[11px] sm:text-xs font-semibold text-amber-200/90 py-1 rounded bg-slate-800/50 hover:bg-amber-500/20 hover:text-amber-300 transition cursor-pointer"
                >
                  {p.stemTenGod}
                </button>
              </div>

              {/* 십이운성 (Twelve Stages) */}
              <div className="space-y-1">
                <div className="text-[9px] sm:text-[10px] text-slate-400">십이운성</div>
                <button
                  type="button"
                  onClick={() => openDetail(item.title, p, 'stage')}
                  className="w-full text-[10px] sm:text-[11px] text-slate-300 py-0.5 rounded bg-slate-800/30 hover:bg-slate-700/50 hover:text-white transition cursor-pointer"
                >
                  {p.stage}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <SajuDetailModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        pillarName={modalState.pillarName}
        pillarData={modalState.pillarData}
        cellType={modalState.cellType}
        isUnknown={modalState.isUnknown}
      />
    </div>
  );
};
