import React, { useState, useEffect, useMemo } from 'react';
import { BirthInput, DirectGanjiInput } from '../types/saju';
import { SAMPLE_PROFILES } from '../data/sampleProfiles';
import { calculateSaju } from '../utils/sajuCalculator';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Target,
  AlertCircle,
  User,
  Info,
  Layers,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';

// 정밀 만세력 연산이 보장되는 출생연도 하한
const MIN_BIRTH_YEAR = 1900;
const CURRENT_YEAR = new Date().getFullYear();

interface BirthFormProps {
  onSubmit: (data: BirthInput) => void;
  isLoading?: boolean;
  initialData?: BirthInput | null;
  onCancel?: () => void;
}

export const STEM_LIST = [
  { char: '甲', name: '갑', element: '목(木)', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30' },
  { char: '乙', name: '을', element: '목(木)', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30' },
  { char: '丙', name: '병', element: '화(火)', color: 'text-rose-400 border-rose-500/40 bg-rose-950/30' },
  { char: '丁', name: '정', element: '화(火)', color: 'text-rose-400 border-rose-500/40 bg-rose-950/30' },
  { char: '戊', name: '무', element: '토(土)', color: 'text-amber-400 border-amber-500/40 bg-amber-950/30' },
  { char: '己', name: '기', element: '토(土)', color: 'text-amber-400 border-amber-500/40 bg-amber-950/30' },
  { char: '庚', name: '경', element: '금(金)', color: 'text-slate-200 border-slate-400/40 bg-slate-800/40' },
  { char: '辛', name: '신', element: '금(金)', color: 'text-slate-200 border-slate-400/40 bg-slate-800/40' },
  { char: '壬', name: '임', element: '수(水)', color: 'text-sky-400 border-sky-500/40 bg-sky-950/30' },
  { char: '癸', name: '계', element: '수(水)', color: 'text-sky-400 border-sky-500/40 bg-sky-950/30' },
];

export const BRANCH_LIST = [
  { char: '子', name: '자(쥐)', element: '수(水)', color: 'text-sky-400 border-sky-500/40 bg-sky-950/30' },
  { char: '丑', name: '축(소)', element: '토(土)', color: 'text-amber-400 border-amber-500/40 bg-amber-950/30' },
  { char: '寅', name: '인(호랑이)', element: '목(木)', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30' },
  { char: '卯', name: '묘(토끼)', element: '목(木)', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30' },
  { char: '辰', name: '진(용)', element: '토(土)', color: 'text-amber-400 border-amber-500/40 bg-amber-950/30' },
  { char: '巳', name: '사(뱀)', element: '화(火)', color: 'text-rose-400 border-rose-500/40 bg-rose-950/30' },
  { char: '午', name: '오(말)', element: '화(火)', color: 'text-rose-400 border-rose-500/40 bg-rose-950/30' },
  { char: '未', name: '미(양)', element: '토(土)', color: 'text-amber-400 border-amber-500/40 bg-amber-950/30' },
  { char: '申', name: '신(원숭이)', element: '금(金)', color: 'text-slate-200 border-slate-400/40 bg-slate-800/40' },
  { char: '酉', name: '유(닭)', element: '금(金)', color: 'text-slate-200 border-slate-400/40 bg-slate-800/40' },
  { char: '戌', name: '술(개)', element: '토(土)', color: 'text-amber-400 border-amber-500/40 bg-amber-950/30' },
  { char: '亥', name: '해(돼지)', element: '수(水)', color: 'text-sky-400 border-sky-500/40 bg-sky-950/30' },
];

export const TRADITIONAL_TIMES = [
  { label: '자시 (23:30 ~ 01:29)', time: '00:30' },
  { label: '축시 (01:30 ~ 03:29)', time: '02:30' },
  { label: '인시 (03:30 ~ 05:29)', time: '04:30' },
  { label: '묘시 (05:30 ~ 07:29)', time: '06:30' },
  { label: '진시 (07:30 ~ 09:29)', time: '08:30' },
  { label: '사시 (09:30 ~ 11:29)', time: '10:30' },
  { label: '오시 (11:30 ~ 13:29)', time: '12:30' },
  { label: '미시 (13:30 ~ 15:29)', time: '14:30' },
  { label: '신시 (15:30 ~ 17:29)', time: '16:30' },
  { label: '유시 (17:30 ~ 19:29)', time: '18:30' },
  { label: '술시 (19:30 ~ 21:29)', time: '20:30' },
  { label: '해시 (21:30 ~ 23:29)', time: '22:30' },
];

export const BirthForm: React.FC<BirthFormProps> = ({
  onSubmit,
  isLoading,
  initialData,
  onCancel,
}) => {
  // Input mode: 'date' = 생년월일시 입력, 'direct' = 사주팔자(간지) 직접 입력
  const [inputMode, setInputMode] = useState<'date' | 'direct'>('date');

  // Standard date form state
  const [formData, setFormData] = useState<BirthInput>(() => {
    if (initialData) return initialData;
    return {
      name: '',
      gender: 'female',
      birthDate: '1995-05-15',
      birthTime: '08:30',
      isUnknownTime: false,
      calendarType: 'solar',
      isLeapMonth: false,
      birthCity: '서울특별시',
      interest: 'all',
    };
  });

  // Direct Ganji form state
  const [directGanji, setDirectGanji] = useState<DirectGanjiInput>({
    gender: 'female',
    yearStem: '乙',
    yearBranch: '亥',
    monthStem: '辛',
    monthBranch: '巳',
    dayStem: '丁',
    dayBranch: '卯',
    hourStem: '甲',
    hourBranch: '辰',
    isUnknownTime: false,
    birthCity: '서울특별시',
    interest: 'all',
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync initialData when provided or updated
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.directGanji) {
        setDirectGanji(initialData.directGanji);
        setInputMode('direct');
      }
    }
  }, [initialData]);

  // Real-time deterministic Manseryeok calculation for instant verification
  const liveSaju = useMemo(() => {
    try {
      if (inputMode === 'date') {
        if (!formData.birthDate || formData.birthDate.length < 8) return null;
        return calculateSaju(formData);
      } else {
        return calculateSaju({
          ...formData,
          directGanji,
        });
      }
    } catch (e) {
      return null;
    }
  }, [inputMode, formData, directGanji]);

  // Split date into year, month, day for robust dropdown fallback
  const birthYear = formData.birthDate ? formData.birthDate.split('-')[0] || '1995' : '1995';
  const birthMonth = formData.birthDate ? formData.birthDate.split('-')[1] || '05' : '05';
  const birthDay = formData.birthDate ? formData.birthDate.split('-')[2] || '15' : '15';

  const updateBirthDate = (y: string, m: string, d: string) => {
    const formattedM = m.padStart(2, '0');
    const formattedD = d.padStart(2, '0');
    setFormData((prev) => ({
      ...prev,
      birthDate: `${y}-${formattedM}-${formattedD}`,
    }));
  };

  const cities = [
    '서울특별시', '경기도', '인천광역시', '부산광역시', '대구광역시',
    '대전광역시', '광주광역시', '울산광역시', '세종특별자치시',
    '강원특별자치도', '충청북도', '충청남도', '전북특별자치도',
    '전라남도', '경상북도', '경상남도', '제주특별자치도', '해외 출생'
  ];

  const interests: { id: BirthInput['interest']; label: string }[] = [
    { id: 'all', label: '전체 (종합 흐름)' },
    { id: 'wealth', label: '재물 · 자산운' },
    { id: 'career', label: '직업 · 커리어' },
    { id: 'business', label: '사업 · 창업' },
    { id: 'love', label: '연애 · 애정' },
    { id: 'marriage', label: '결혼 · 배우자' },
    { id: 'relationship', label: '인간관계 · 대인운' },
    { id: 'family', label: '가족 · 환경' },
  ];

  const handleSampleSelect = (profile: typeof SAMPLE_PROFILES[0]) => {
    setFormData(profile.input);
    setInputMode('date');
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const targetName = formData.name.trim() || '사용자';

    if (inputMode === 'date') {
      if (!formData.birthDate || formData.birthDate.length < 8) {
        setValidationError('생년월일을 올바르게 입력해주세요 (예: 1995-05-15).');
        return;
      }

      // 생년월일 유효 범위 검증 (만세력 연산 가능 구간)
      const parsed = new Date(`${formData.birthDate}T00:00:00`);
      if (Number.isNaN(parsed.getTime())) {
        setValidationError('생년월일을 올바르게 입력해주세요 (예: 1995-05-15).');
        return;
      }
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (parsed.getTime() > today.getTime()) {
        setValidationError('아직 오지 않은 날짜입니다. 실제 태어나신 날짜를 입력해주세요.');
        return;
      }
      if (parsed.getFullYear() < MIN_BIRTH_YEAR) {
        setValidationError(`${MIN_BIRTH_YEAR}년 이후 출생일만 정밀 만세력 연산이 가능합니다.`);
        return;
      }

      if (!formData.isUnknownTime && !formData.birthTime) {
        setValidationError('출생시간을 입력하시거나 [출생시간을 모릅니다]에 체크해주세요.');
        return;
      }

      onSubmit({
        ...formData,
        name: targetName,
        directGanji: undefined,
      });
    } else {
      // Direct Ganji Mode
      const finalInput: BirthInput = {
        name: targetName,
        gender: directGanji.gender,
        birthDate: formData.birthDate || '1995-05-15',
        birthTime: directGanji.isUnknownTime ? '' : '12:00',
        isUnknownTime: directGanji.isUnknownTime || false,
        calendarType: 'solar',
        birthCity: formData.birthCity || '서울특별시',
        interest: formData.interest || 'all',
        directGanji: {
          ...directGanji,
          name: targetName,
        },
      };

      onSubmit(finalInput);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 sm:py-6">
      {/* Sample Quick Selector */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            빠른 샘플 불러오기
          </span>
          <span className="text-[11px] text-slate-400">클릭 시 즉시 자동 완성됩니다</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SAMPLE_PROFILES.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSampleSelect(p)}
              className="text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 transition text-xs cursor-pointer group"
            >
              <div className="font-medium text-slate-200 group-hover:text-amber-300 truncate">
                {p.input.name} ({p.input.birthDate.substring(0, 4)}년생)
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {p.input.gender === 'female' ? '여성' : '남성'} · {p.input.interest === 'all' ? '전체 종합' : p.input.interest === 'wealth' ? '재물' : '직업'}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1124] border border-amber-500/20 shadow-2xl relative">
        {/* Header */}
        <div className="mb-6 border-b border-indigo-950 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>정밀 만세력 & AI 인생차트</span>
            </div>
            <h2 className="font-serif-kr text-2xl font-bold text-slate-100">
              사주팔자 정보 입력란
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              생년월일시를 입력하시거나, 이미 알고 계신 사주팔자 8글자(간지)를 직접 입력하세요.
            </p>
          </div>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs transition"
            >
              닫기
            </button>
          )}
        </div>

        {/* Mode Selector Tabs (생년월일시 vs 사주팔자 간지 직접입력) */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900/90 rounded-xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => setInputMode('date')}
            className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition flex items-center justify-center gap-2 cursor-pointer ${
              inputMode === 'date'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>생년월일시로 입력 (만세력 자동)</span>
          </button>

          <button
            type="button"
            onClick={() => setInputMode('direct')}
            className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition flex items-center justify-center gap-2 cursor-pointer ${
              inputMode === 'direct'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>사주팔자(간지) 직접 입력</span>
          </button>
        </div>

        {validationError && (
          <div className="mb-5 p-3.5 rounded-lg bg-rose-950/70 border border-rose-800 text-rose-200 text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span className="font-medium">{validationError}</span>
          </div>
        )}

        {/* noValidate: 브라우저 기본 검증이 submit을 가로채면 한글 안내 문구가 표시되지 않으므로,
    검증은 handleSubmit 에서 일괄 처리한다. date input 의 min/max 는 달력 UI 힌트로만 남긴다. */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Common: Name & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                이름 또는 닉네임 <span className="text-amber-400 text-[11px]">(미입력 시 '사용자'로 표기)</span>
              </label>
              <input
                type="text"
                placeholder="예: 김명결"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                성별 <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, gender: 'female' });
                    setDirectGanji({ ...directGanji, gender: 'female' });
                  }}
                  className={`py-2.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    (inputMode === 'date' ? formData.gender : directGanji.gender) === 'female'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  여성
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, gender: 'male' });
                    setDirectGanji({ ...directGanji, gender: 'male' });
                  }}
                  className={`py-2.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    (inputMode === 'date' ? formData.gender : directGanji.gender) === 'male'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  남성
                </button>
              </div>
            </div>
          </div>

          {/* ================= MODE 1: DATE INPUT ================= */}
          {inputMode === 'date' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Birth Date & Calendar Type */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    생년월일 <span className="text-rose-400">*</span>
                  </label>

                  {/* Solar / Lunar Toggle */}
                  <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, calendarType: 'solar' })}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
                        formData.calendarType === 'solar'
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      양력
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, calendarType: 'lunar' })}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
                        formData.calendarType === 'lunar'
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      음력
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    {/* Year Select */}
                    <div>
                      <select
                        value={birthYear}
                        onChange={(e) => updateBirthDate(e.target.value, birthMonth, birthDay)}
                        className="w-full px-3 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition"
                      >
                        {Array.from({ length: CURRENT_YEAR - MIN_BIRTH_YEAR + 1 }, (_, i) => CURRENT_YEAR - i).map((y) => (
                          <option key={y} value={y} className="bg-slate-900 text-slate-100">
                            {y}년
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Month Select */}
                    <div>
                      <select
                        value={birthMonth}
                        onChange={(e) => updateBirthDate(birthYear, e.target.value, birthDay)}
                        className="w-full px-3 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition"
                      >
                        {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((m) => (
                          <option key={m} value={m} className="bg-slate-900 text-slate-100">
                            {parseInt(m, 10)}월
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Day Select */}
                    <div>
                      <select
                        value={birthDay}
                        onChange={(e) => updateBirthDate(birthYear, birthMonth, e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition"
                      >
                        {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map((d) => (
                          <option key={d} value={d} className="bg-slate-900 text-slate-100">
                            {parseInt(d, 10)}일
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Standard date picker input for quick typing/calendar popup */}
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      min={`${MIN_BIRTH_YEAR}-01-01`}
                      max={new Date().toISOString().slice(0, 10)}
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="flex-1 px-3.5 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-amber-400 transition"
                    />

                    {formData.calendarType === 'lunar' && (
                      <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={formData.isLeapMonth || false}
                          onChange={(e) => setFormData({ ...formData, isLeapMonth: e.target.checked })}
                          className="rounded text-amber-500 focus:ring-0"
                        />
                        <span>윤달(閏月)</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Birth Time & Unknown Time Option */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    출생시간
                  </label>

                  <label className="flex items-center gap-1.5 text-xs text-amber-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.isUnknownTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isUnknownTime: e.target.checked,
                          birthTime: e.target.checked ? '' : formData.birthTime || '12:00',
                        })
                      }
                      className="rounded text-amber-500 focus:ring-0 bg-slate-900 border-slate-700"
                    />
                    <span>출생시간을 모릅니다 (3주 6자 정밀분석)</span>
                  </label>
                </div>

                {!formData.isUnknownTime ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="block text-[11px] text-slate-400 mb-1">12간지시 빠른 선택</span>
                        <select
                          value={formData.birthTime}
                          onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition"
                        >
                          {TRADITIONAL_TIMES.map((t) => (
                            <option key={t.time} value={t.time} className="bg-slate-900 text-slate-100">
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <span className="block text-[11px] text-slate-400 mb-1">정확한 분 단위 입력</span>
                        <input
                          type="time"
                          value={formData.birthTime}
                          onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/50 text-indigo-300 text-xs flex items-start gap-2">
                    <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      "출생시간을 모르는 경우 년·월·일 3주 6자를 기준으로 본원의 기운과 음양오행, 대운을 명확하게 분석합니다."
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= MODE 2: DIRECT GANJI INPUT ================= */}
          {inputMode === 'direct' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  본인의 사주 4기둥(년·월·일·시)의 천간(10간)과 지지(12지)를 직접 선택하여 즉시 분석할 수 있습니다.
                </p>
              </div>

              {/* Four Pillars Selection Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* 1. Year Pillar */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-2.5">
                  <div className="text-center font-serif-kr text-xs font-bold text-amber-300 border-b border-slate-800 pb-1.5">
                    년주 (年柱)
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">천간(天干)</label>
                    <select
                      value={directGanji.yearStem}
                      onChange={(e) => setDirectGanji({ ...directGanji, yearStem: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                    >
                      {STEM_LIST.map((s) => (
                        <option key={s.char} value={s.char}>
                          {s.char} ({s.name}·{s.element})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">지지(地支)</label>
                    <select
                      value={directGanji.yearBranch}
                      onChange={(e) => setDirectGanji({ ...directGanji, yearBranch: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                    >
                      {BRANCH_LIST.map((b) => (
                        <option key={b.char} value={b.char}>
                          {b.char} ({b.name}·{b.element})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. Month Pillar */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-2.5">
                  <div className="text-center font-serif-kr text-xs font-bold text-amber-300 border-b border-slate-800 pb-1.5">
                    월주 (月柱)
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">천간(天干)</label>
                    <select
                      value={directGanji.monthStem}
                      onChange={(e) => setDirectGanji({ ...directGanji, monthStem: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                    >
                      {STEM_LIST.map((s) => (
                        <option key={s.char} value={s.char}>
                          {s.char} ({s.name}·{s.element})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">지지(地支)</label>
                    <select
                      value={directGanji.monthBranch}
                      onChange={(e) => setDirectGanji({ ...directGanji, monthBranch: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                    >
                      {BRANCH_LIST.map((b) => (
                        <option key={b.char} value={b.char}>
                          {b.char} ({b.name}·{b.element})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 3. Day Pillar (Self / 일원) */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/60 shadow-lg shadow-amber-500/5 space-y-2.5 relative">
                  <div className="text-center font-serif-kr text-xs font-bold text-amber-400 border-b border-amber-500/20 pb-1.5 flex items-center justify-center gap-1">
                    <span>일주 (日柱 - 나)</span>
                  </div>
                  <div>
                    <label className="block text-[11px] text-amber-300 mb-1">일간 (나의 본원)</label>
                    <select
                      value={directGanji.dayStem}
                      onChange={(e) => setDirectGanji({ ...directGanji, dayStem: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-amber-500/60 text-amber-200 text-xs font-bold focus:outline-none focus:border-amber-400"
                    >
                      {STEM_LIST.map((s) => (
                        <option key={s.char} value={s.char}>
                          {s.char} ({s.name}·{s.element})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">일지 (배우자궁)</label>
                    <select
                      value={directGanji.dayBranch}
                      onChange={(e) => setDirectGanji({ ...directGanji, dayBranch: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                    >
                      {BRANCH_LIST.map((b) => (
                        <option key={b.char} value={b.char}>
                          {b.char} ({b.name}·{b.element})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Hour Pillar */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                    <span className="font-serif-kr text-xs font-bold text-amber-300">시주 (時柱)</span>
                    <label className="text-[10px] text-slate-400 flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={directGanji.isUnknownTime || false}
                        onChange={(e) => setDirectGanji({ ...directGanji, isUnknownTime: e.target.checked })}
                        className="rounded text-amber-500 focus:ring-0"
                      />
                      <span>미상</span>
                    </label>
                  </div>

                  {!directGanji.isUnknownTime ? (
                    <>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">천간(天干)</label>
                        <select
                          value={directGanji.hourStem || '甲'}
                          onChange={(e) => setDirectGanji({ ...directGanji, hourStem: e.target.value })}
                          className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                        >
                          {STEM_LIST.map((s) => (
                            <option key={s.char} value={s.char}>
                              {s.char} ({s.name}·{s.element})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">지지(地支)</label>
                        <select
                          value={directGanji.hourBranch || '子'}
                          onChange={(e) => setDirectGanji({ ...directGanji, hourBranch: e.target.value })}
                          className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                        >
                          {BRANCH_LIST.map((b) => (
                            <option key={b.char} value={b.char}>
                              {b.char} ({b.name}·{b.element})
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <div className="py-6 text-center text-xs text-slate-500 font-light">
                      시주 미상으로 분석
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Four Pillars Preview Banner */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-900/60 flex items-center justify-around text-center">
                <div>
                  <div className="text-[10px] text-slate-400">시주</div>
                  <div className="text-sm font-bold text-amber-300 font-serif-kr">
                    {directGanji.isUnknownTime ? '미상' : `${directGanji.hourStem || '甲'}${directGanji.hourBranch || '子'}`}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-amber-400">일주 (나)</div>
                  <div className="text-base font-bold text-amber-400 font-serif-kr underline">
                    {directGanji.dayStem}{directGanji.dayBranch}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">월주</div>
                  <div className="text-sm font-bold text-amber-300 font-serif-kr">
                    {directGanji.monthStem}{directGanji.monthBranch}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">년주</div>
                  <div className="text-sm font-bold text-amber-300 font-serif-kr">
                    {directGanji.yearStem}{directGanji.yearBranch}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Region & Interest */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                출생지역
              </label>
              <select
                value={formData.birthCity}
                onChange={(e) => setFormData({ ...formData, birthCity: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition"
              >
                {cities.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-slate-200">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                관심 테마
              </label>
              <select
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition"
              >
                {interests.map((it) => (
                  <option key={it.id} value={it.id} className="bg-slate-900 text-slate-200">
                    {it.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Real-time Manseryeok Live Calculation Card */}
          {liveSaju && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#0c1024] to-[#121630] border border-amber-500/40 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-indigo-950 pb-2.5">
                <div className="flex items-center gap-2 text-amber-300 font-semibold">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>정통 천문 만세력 실시간 연산 가동</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] text-emerald-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>실시간 계산 반영 중</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {/* 시주 */}
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                  <div className="text-[10px] text-slate-400 mb-0.5">시주 (時柱)</div>
                  <div className="font-serif-kr text-base sm:text-lg font-bold text-amber-300">
                    {liveSaju.saju.hour ? `${liveSaju.saju.hour.stem}${liveSaju.saju.hour.branch}` : '미상'}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {liveSaju.saju.hour ? `${liveSaju.saju.hour.stemName}${liveSaju.saju.hour.branchName}` : '3주 중심'}
                  </div>
                </div>

                {/* 일주 (본인) */}
                <div className="p-2.5 rounded-lg bg-amber-500/15 border border-amber-500/70 shadow-sm">
                  <div className="text-[10px] text-amber-400 font-bold mb-0.5">일주 (나·본원)</div>
                  <div className="font-serif-kr text-base sm:text-lg font-bold text-amber-200">
                    {liveSaju.saju.day.stem}{liveSaju.saju.day.branch}
                  </div>
                  <div className="text-[10px] text-amber-300 mt-0.5 font-medium">
                    {liveSaju.saju.day.stemName}일원 ({liveSaju.saju.dayMasterElement === 'wood' ? '목' : liveSaju.saju.dayMasterElement === 'fire' ? '화' : liveSaju.saju.dayMasterElement === 'earth' ? '토' : liveSaju.saju.dayMasterElement === 'metal' ? '금' : '수'})
                  </div>
                </div>

                {/* 월주 */}
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                  <div className="text-[10px] text-slate-400 mb-0.5">월주 (月柱)</div>
                  <div className="font-serif-kr text-base sm:text-lg font-bold text-amber-300">
                    {liveSaju.saju.month.stem}{liveSaju.saju.month.branch}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {liveSaju.saju.month.stemName}${liveSaju.saju.month.branchName}
                  </div>
                </div>

                {/* 년주 */}
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                  <div className="text-[10px] text-slate-400 mb-0.5">년주 (年柱)</div>
                  <div className="font-serif-kr text-base sm:text-lg font-bold text-amber-300">
                    {liveSaju.saju.year.stem}{liveSaju.saju.year.branch}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {liveSaju.saju.year.stemName}${liveSaju.saju.year.branchName}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                <span>오행 구성: 목({liveSaju.fiveElements.wood}) 화({liveSaju.fiveElements.fire}) 토({liveSaju.fiveElements.earth}) 금({liveSaju.fiveElements.metal}) 수({liveSaju.fiveElements.water})</span>
                <span className="text-amber-300 font-medium">주도: {liveSaju.fiveElements.dominant === 'wood' ? '목(木)' : liveSaju.fiveElements.dominant === 'fire' ? '화(火)' : liveSaju.fiveElements.dominant === 'earth' ? '토(土)' : liveSaju.fiveElements.dominant === 'metal' ? '금(金)' : '수(水)'}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>만세력 및 인생차트 정밀 연산 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>
                    {inputMode === 'date' ? '내 사주팔자 인생차트 만들기' : '입력한 사주팔자로 차트 생성하기'}
                  </span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-2">
              입력하신 정보는 별도 서버에 저장되지 않으며 즉시 안전하게 계산됩니다.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
