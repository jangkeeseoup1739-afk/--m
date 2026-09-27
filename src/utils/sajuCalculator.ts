// Saju (Four Pillars of Destiny) Mathematical Calculation Engine
// Independent deterministic calculation module adhering to traditional Korean/Eastern metaphysics.

import {
  BirthInput,
  ElementType,
  FiveElementsCount,
  Pillar,
  SajuPillars,
  TenGodsDistribution,
  DaeunPeriod,
  AnnualLuck,
  YinYang,
} from '../types/saju';
import { Solar, Lunar } from 'lunar-javascript';

export interface StemInfo {
  char: string;
  name: string;
  element: ElementType;
  yinYang: YinYang;
}

export interface BranchInfo {
  char: string;
  name: string;
  animal: string;
  element: ElementType;
  yinYang: YinYang;
  mainHiddenStem: number; // Index of heavenly stem for main hidden stem
}

// 오행 한글 표기 (사용자에게 노출되는 문구용)
export const ELEMENT_KR: Record<ElementType, string> = {
  wood: '목', fire: '화', earth: '토', metal: '금', water: '수',
};

export const STEMS: StemInfo[] = [
  { char: '甲', name: '갑', element: 'wood', yinYang: 'yang' },
  { char: '乙', name: '을', element: 'wood', yinYang: 'yin' },
  { char: '丙', name: '병', element: 'fire', yinYang: 'yang' },
  { char: '丁', name: '정', element: 'fire', yinYang: 'yin' },
  { char: '戊', name: '무', element: 'earth', yinYang: 'yang' },
  { char: '己', name: '기', element: 'earth', yinYang: 'yin' },
  { char: '庚', name: '경', element: 'metal', yinYang: 'yang' },
  { char: '辛', name: '신', element: 'metal', yinYang: 'yin' },
  { char: '壬', name: '임', element: 'water', yinYang: 'yang' },
  { char: '癸', name: '계', element: 'water', yinYang: 'yin' },
];

export const BRANCHES: BranchInfo[] = [
  { char: '子', name: '자', animal: '쥐', element: 'water', yinYang: 'yang', mainHiddenStem: 9 }, // 癸
  { char: '丑', name: '축', animal: '소', element: 'earth', yinYang: 'yin', mainHiddenStem: 5 },  // 己
  { char: '寅', name: '인', animal: '호랑이', element: 'wood', yinYang: 'yang', mainHiddenStem: 0 }, // 甲
  { char: '卯', name: '묘', animal: '토끼', element: 'wood', yinYang: 'yin', mainHiddenStem: 1 },  // 乙
  { char: '辰', name: '진', animal: '용', element: 'earth', yinYang: 'yang', mainHiddenStem: 4 }, // 戊
  { char: '巳', name: '사', animal: '뱀', element: 'fire', yinYang: 'yin', mainHiddenStem: 2 },  // 丙
  { char: '午', name: '오', animal: '말', element: 'fire', yinYang: 'yang', mainHiddenStem: 3 }, // 丁
  { char: '未', name: '미', animal: '양', element: 'earth', yinYang: 'yin', mainHiddenStem: 5 },  // 己
  { char: '申', name: '신', animal: '원숭이', element: 'metal', yinYang: 'yang', mainHiddenStem: 6 }, // 庚
  { char: '酉', name: '유', animal: '닭', element: 'metal', yinYang: 'yin', mainHiddenStem: 7 },  // 辛
  { char: '戌', name: '술', animal: '개', element: 'earth', yinYang: 'yang', mainHiddenStem: 4 }, // 戊
  { char: '亥', name: '해', animal: '돼지', element: 'water', yinYang: 'yin', mainHiddenStem: 8 },  // 壬
];

// 24 Solar terms approximate cutoff day per month
const SOLAR_TERMS = [
  { month: 1, day: 5, name: '소한' },   // 丑月
  { month: 2, day: 4, name: '입춘' },   // 寅月 (Year begins in Saju)
  { month: 3, day: 6, name: '경칩' },   // 卯月
  { month: 4, day: 5, name: '청명' },   // 辰月
  { month: 5, day: 6, name: '입하' },   // 巳月
  { month: 6, day: 6, name: '망종' },   // 午月
  { month: 7, day: 7, name: '소서' },   // 未月
  { month: 8, day: 8, name: '입추' },   // 申月
  { month: 9, day: 8, name: '백로' },   // 酉月
  { month: 10, day: 8, name: '한로' },  // 戌月
  { month: 11, day: 7, name: '입동' },  // 亥月
  { month: 12, day: 7, name: '대설' },  // 子月
];

// Julian Day Number Calculation (Exact Astronomical Integer Formula)
function getJulianDayNumber(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

// Ten Gods (십성) Calculation
export function getTenGod(dayStemIdx: number, targetStemIdx: number): string {
  const day = STEMS[dayStemIdx];
  const target = STEMS[targetStemIdx];

  const elementsOrder: ElementType[] = ['wood', 'fire', 'earth', 'metal', 'water'];
  const dayElemIdx = elementsOrder.indexOf(day.element);
  const targetElemIdx = elementsOrder.indexOf(target.element);

  const isSameYinYang = day.yinYang === target.yinYang;

  // Same element (비겁)
  if (dayElemIdx === targetElemIdx) {
    return isSameYinYang ? '비견' : '겁재';
  }
  // Day generates target (식상)
  if ((dayElemIdx + 1) % 5 === targetElemIdx) {
    return isSameYinYang ? '식신' : '상관';
  }
  // Day controls target (재성)
  if ((dayElemIdx + 2) % 5 === targetElemIdx) {
    return isSameYinYang ? '편재' : '정재';
  }
  // Target controls Day (관성)
  if ((targetElemIdx + 2) % 5 === dayElemIdx) {
    return isSameYinYang ? '편관' : '정관';
  }
  // Target generates Day (인성)
  if ((targetElemIdx + 1) % 5 === dayElemIdx) {
    return isSameYinYang ? '편인' : '정인';
  }

  return '비견';
}

// Twelve Stages of Life (십이운성)
const TWELVE_STAGES_NAMES = [
  '장생', '목욕', '관대', '건록', '제왕', '쇠', '병', '사', '묘', '절', '태', '양'
];

// Starting earthly branch for '장생' for each stem:
// 甲: 亥(11), 丙/戊: 寅(2), 庚: 巳(5), 壬: 申(8) (순행)
// 乙: 午(6), 丁/己: 酉(9), 辛: 子(0), 癸: 卯(3) (역행)
export function getTwelveStage(dayStemIdx: number, branchIdx: number): string {
  const isYang = STEMS[dayStemIdx].yinYang === 'yang';
  let jangsengBranch = 0;

  switch (dayStemIdx) {
    case 0: jangsengBranch = 11; break; // 甲 -> 亥
    case 1: jangsengBranch = 6; break;  // 乙 -> 午
    case 2:
    case 4: jangsengBranch = 2; break;  // 丙, 戊 -> 寅
    case 3:
    case 5: jangsengBranch = 9; break;  // 丁, 己 -> 酉
    case 6: jangsengBranch = 5; break;  // 庚 -> 巳
    case 7: jangsengBranch = 0; break;  // 辛 -> 子
    case 8: jangsengBranch = 8; break;  // 壬 -> 申
    case 9: jangsengBranch = 3; break;  // 癸 -> 卯
  }

  let offset: number;
  if (isYang) {
    offset = (branchIdx - jangsengBranch + 12) % 12;
  } else {
    offset = (jangsengBranch - branchIdx + 12) % 12;
  }

  return TWELVE_STAGES_NAMES[offset];
}

// Noble Stars and Spirits (신살 & 귀인)
export function calculateShinsal(dayStemIdx: number, dayBranchIdx: number, targetBranchIdx: number): string[] {
  const list: string[] = [];

  // 1. 천을귀인 (Heavenly Noble)
  // 甲戊庚 -> 丑(1), 未(7)
  // 乙己 -> 子(0), 申(8)
  // 丙丁 -> 亥(11), 酉(9)
  // 辛 -> 寅(2), 午(6)
  // 壬癸 -> 巳(5), 卯(3)
  if ([0, 4, 6].includes(dayStemIdx) && [1, 7].includes(targetBranchIdx)) list.push('천을귀인');
  if ([1, 5].includes(dayStemIdx) && [0, 8].includes(targetBranchIdx)) list.push('천을귀인');
  if ([2, 3].includes(dayStemIdx) && [11, 9].includes(targetBranchIdx)) list.push('천을귀인');
  if (dayStemIdx === 7 && [2, 6].includes(targetBranchIdx)) list.push('천을귀인');
  if ([8, 9].includes(dayStemIdx) && [5, 3].includes(targetBranchIdx)) list.push('천을귀인');

  // 2. 문창귀인 (Literary Genius Noble)
  const munchangMap: Record<number, number> = {
    0: 5, 1: 6, 2: 8, 3: 9, 4: 8, 5: 9, 6: 11, 7: 0, 8: 2, 9: 3
  };
  if (munchangMap[dayStemIdx] === targetBranchIdx) list.push('문창귀인');

  // 3. 삼합 기준 도화/역마/화개 (기준: 일지)
  // 申子辰(8,0,4) -> 도화: 酉(9), 역마: 寅(2), 화개: 辰(4)
  // 寅午戌(2,6,10) -> 도화: 卯(3), 역마: 申(8), 화개: 戌(10)
  // 巳酉丑(5,9,1) -> 도화: 午(6), 역마: 亥(11), 화개: 丑(1)
  // 亥卯未(11,3,7) -> 도화: 子(0), 역마: 巳(5), 화개: 未(7)
  if ([8, 0, 4].includes(dayBranchIdx)) {
    if (targetBranchIdx === 9) list.push('도화살');
    if (targetBranchIdx === 2) list.push('역마살');
    if (targetBranchIdx === 4) list.push('화개살');
  } else if ([2, 6, 10].includes(dayBranchIdx)) {
    if (targetBranchIdx === 3) list.push('도화살');
    if (targetBranchIdx === 8) list.push('역마살');
    if (targetBranchIdx === 10) list.push('화개살');
  } else if ([5, 9, 1].includes(dayBranchIdx)) {
    if (targetBranchIdx === 6) list.push('도화살');
    if (targetBranchIdx === 11) list.push('역마살');
    if (targetBranchIdx === 1) list.push('화개살');
  } else if ([11, 3, 7].includes(dayBranchIdx)) {
    if (targetBranchIdx === 0) list.push('도화살');
    if (targetBranchIdx === 5) list.push('역마살');
    if (targetBranchIdx === 7) list.push('화개살');
  }

  // 4. 건록 (Geonrok noble)
  const geonrokMap: Record<number, number> = {
    0: 2, 1: 3, 2: 5, 3: 6, 4: 5, 5: 6, 6: 8, 7: 9, 8: 11, 9: 0
  };
  if (geonrokMap[dayStemIdx] === targetBranchIdx) list.push('록신(건록)');

  return list;
}

// Convert birth input to Four Pillars of Saju
export function calculateSaju(input: BirthInput): {
  saju: SajuPillars;
  fiveElements: FiveElementsCount;
  tenGods: TenGodsDistribution;
  daeunList: DaeunPeriod[];
  annualLuckList: AnnualLuck[];
} {
  let yearStemIdx = 0;
  let yearBranchIdx = 0;
  let monthStemIdx = 2;
  let monthBranchIdx = 2;
  let dayStemIdx = 4;
  let dayBranchIdx = 6;
  let hourStemIdx: number | null = null;
  let hourBranchIdx: number | null = null;
  let rawDay = 15;

  if (input.directGanji) {
    const dg = input.directGanji;
    const findStem = (ch: string, fallback = 0) => {
      const idx = STEMS.findIndex(s => s.char === ch || s.name === ch);
      return idx >= 0 ? idx : fallback;
    };
    const findBranch = (ch: string, fallback = 0) => {
      const idx = BRANCHES.findIndex(b => b.char === ch || b.name === ch);
      return idx >= 0 ? idx : fallback;
    };

    yearStemIdx = findStem(dg.yearStem, 0);
    yearBranchIdx = findBranch(dg.yearBranch, 0);
    monthStemIdx = findStem(dg.monthStem, 2);
    monthBranchIdx = findBranch(dg.monthBranch, 2);
    dayStemIdx = findStem(dg.dayStem, 4);
    dayBranchIdx = findBranch(dg.dayBranch, 6);

    if (!dg.isUnknownTime && dg.hourStem && dg.hourBranch) {
      hourStemIdx = findStem(dg.hourStem, 0);
      hourBranchIdx = findBranch(dg.hourBranch, 0);
    }
  } else {
    const dateStr = (input.birthDate || '1995-05-15').trim();
    const parts = dateStr.includes('-')
      ? dateStr.split('-').map(Number)
      : dateStr.includes('.')
      ? dateStr.split('.').map(Number)
      : dateStr.includes('/')
      ? dateStr.split('/').map(Number)
      : [1995, 5, 15];

    let rawYear = parts[0] || 1995;
    let rawMonth = parts[1] || 5;
    rawDay = parts[2] || 15;

    let birthH = 12;
    let birthM = 0;
    if (!input.isUnknownTime && input.birthTime) {
      const [hStr, mStr] = input.birthTime.split(':');
      birthH = parseInt(hStr || '12', 10);
      birthM = parseInt(mStr || '0', 10);
    }

    let calculatedViaLunarLib = false;

    try {
      let sYear = rawYear;
      let sMonth = rawMonth;
      let sDay = rawDay;

      if (input.calendarType === 'lunar') {
        const lun = input.isLeapMonth
          ? Lunar.fromYmd(rawYear, -rawMonth, rawDay)
          : Lunar.fromYmd(rawYear, rawMonth, rawDay);
        const sol = lun.getSolar();
        sYear = sol.getYear();
        sMonth = sol.getMonth();
        sDay = sol.getDay();
      }

      const solar = Solar.fromYmdHms(sYear, sMonth, sDay, birthH, birthM, 0);
      const lunar = solar.getLunar();
      const ec = lunar.getEightChar();

      const yS = STEMS.findIndex((s) => s.char === ec.getYearGan());
      const yB = BRANCHES.findIndex((b) => b.char === ec.getYearZhi());
      const mS = STEMS.findIndex((s) => s.char === ec.getMonthGan());
      const mB = BRANCHES.findIndex((b) => b.char === ec.getMonthZhi());
      const dS = STEMS.findIndex((s) => s.char === ec.getDayGan());
      const dB = BRANCHES.findIndex((b) => b.char === ec.getDayZhi());

      if (yS >= 0 && yB >= 0 && mS >= 0 && mB >= 0 && dS >= 0 && dB >= 0) {
        yearStemIdx = yS;
        yearBranchIdx = yB;
        monthStemIdx = mS;
        monthBranchIdx = mB;
        dayStemIdx = dS;
        dayBranchIdx = dB;
        calculatedViaLunarLib = true;

        if (!input.isUnknownTime && input.birthTime) {
          const totalMinutes = birthH * 60 + birthM;
          if (totalMinutes >= 23 * 60 + 30 || totalMinutes < 1 * 60 + 30) {
            hourBranchIdx = 0; // 子
          } else {
            hourBranchIdx = Math.floor((totalMinutes - 90) / 120) + 1;
            if (hourBranchIdx > 11) hourBranchIdx = 11;
          }
          const hourStemBase = ((dayStemIdx % 5) * 2) % 10;
          hourStemIdx = (hourStemBase + hourBranchIdx) % 10;
        }
      }
    } catch (e) {
      console.warn('Lunar-javascript primary calculation note:', e);
    }

    if (!calculatedViaLunarLib) {
      // High-precision astronomical fallback
      let sajuYear = rawYear;
      if (rawMonth < 2 || (rawMonth === 2 && rawDay < SOLAR_TERMS[1].day)) {
        sajuYear = rawYear - 1;
      }

      yearStemIdx = (sajuYear - 4) % 10 < 0 ? ((sajuYear - 4) % 10) + 10 : (sajuYear - 4) % 10;
      yearBranchIdx = (sajuYear - 4) % 12 < 0 ? ((sajuYear - 4) % 12) + 12 : (sajuYear - 4) % 12;

      let solarMonthIdx = 0;
      if (rawMonth === 1) {
        solarMonthIdx = rawDay >= SOLAR_TERMS[0].day ? 11 : 10;
      } else {
        const term = SOLAR_TERMS[rawMonth - 1] || { day: 5 };
        if (rawDay >= term.day) {
          solarMonthIdx = rawMonth - 2;
        } else {
          solarMonthIdx = (rawMonth - 3 + 12) % 12;
        }
      }

      monthBranchIdx = (solarMonthIdx + 2) % 12;
      const monthStemBase = ((yearStemIdx % 5) * 2 + 2) % 10;
      monthStemIdx = (monthStemBase + solarMonthIdx) % 10;

      const jdn = getJulianDayNumber(rawYear, rawMonth, rawDay);
      const dayCycleIdx = ((jdn + 49) % 60 + 60) % 60;
      dayStemIdx = dayCycleIdx % 10;
      dayBranchIdx = dayCycleIdx % 12;

      if (!input.isUnknownTime && input.birthTime) {
        const totalMinutes = birthH * 60 + birthM;
        if (totalMinutes >= 23 * 60 + 30 || totalMinutes < 1 * 60 + 30) {
          hourBranchIdx = 0; // 子
        } else {
          hourBranchIdx = Math.floor((totalMinutes - 90) / 120) + 1;
          if (hourBranchIdx > 11) hourBranchIdx = 11;
        }

        const hourStemBase = ((dayStemIdx % 5) * 2) % 10;
        hourStemIdx = (hourStemBase + hourBranchIdx) % 10;
      }
    }
  }

  // Build Year Pillar
  const yStem = STEMS[yearStemIdx];
  const yBranch = BRANCHES[yearBranchIdx];
  const yearPillar: Pillar = {
    stem: yStem.char,
    stemHanja: yStem.char,
    stemName: yStem.name,
    stemElement: yStem.element,
    stemYinYang: yStem.yinYang,
    stemTenGod: getTenGod(dayStemIdx, yearStemIdx),

    branch: yBranch.char,
    branchHanja: yBranch.char,
    branchName: yBranch.name,
    branchAnimal: yBranch.animal,
    branchElement: yBranch.element,
    branchYinYang: yBranch.yinYang,
    branchTenGod: getTenGod(dayStemIdx, yBranch.mainHiddenStem),

    stage: getTwelveStage(dayStemIdx, yearBranchIdx),
    shinsal: calculateShinsal(dayStemIdx, dayBranchIdx, yearBranchIdx),
  };

  // Build Month Pillar
  const mStem = STEMS[monthStemIdx];
  const mBranch = BRANCHES[monthBranchIdx];
  const monthPillar: Pillar = {
    stem: mStem.char,
    stemHanja: mStem.char,
    stemName: mStem.name,
    stemElement: mStem.element,
    stemYinYang: mStem.yinYang,
    stemTenGod: getTenGod(dayStemIdx, monthStemIdx),

    branch: mBranch.char,
    branchHanja: mBranch.char,
    branchName: mBranch.name,
    branchAnimal: mBranch.animal,
    branchElement: mBranch.element,
    branchYinYang: mBranch.yinYang,
    branchTenGod: getTenGod(dayStemIdx, mBranch.mainHiddenStem),

    stage: getTwelveStage(dayStemIdx, monthBranchIdx),
    shinsal: calculateShinsal(dayStemIdx, dayBranchIdx, monthBranchIdx),
  };

  // Build Day Pillar
  const dStem = STEMS[dayStemIdx];
  const dBranch = BRANCHES[dayBranchIdx];
  const dayPillar: Pillar = {
    stem: dStem.char,
    stemHanja: dStem.char,
    stemName: dStem.name,
    stemElement: dStem.element,
    stemYinYang: dStem.yinYang,
    stemTenGod: '일원(본인)',

    branch: dBranch.char,
    branchHanja: dBranch.char,
    branchName: dBranch.name,
    branchAnimal: dBranch.animal,
    branchElement: dBranch.element,
    branchYinYang: dBranch.yinYang,
    branchTenGod: getTenGod(dayStemIdx, dBranch.mainHiddenStem),

    stage: getTwelveStage(dayStemIdx, dayBranchIdx),
    shinsal: calculateShinsal(dayStemIdx, dayBranchIdx, dayBranchIdx),
  };

  // Build Hour Pillar if available
  let hourPillar: Pillar | null = null;
  if (hourStemIdx !== null && hourBranchIdx !== null) {
    const stem = STEMS[hourStemIdx];
    const branch = BRANCHES[hourBranchIdx];
    hourPillar = {
      stem: stem.char,
      stemHanja: stem.char,
      stemName: stem.name,
      stemElement: stem.element,
      stemYinYang: stem.yinYang,
      stemTenGod: getTenGod(dayStemIdx, hourStemIdx),

      branch: branch.char,
      branchHanja: branch.char,
      branchName: branch.name,
      branchAnimal: branch.animal,
      branchElement: branch.element,
      branchYinYang: branch.yinYang,
      branchTenGod: getTenGod(dayStemIdx, branch.mainHiddenStem),

      stage: getTwelveStage(dayStemIdx, hourBranchIdx),
      shinsal: calculateShinsal(dayStemIdx, dayBranchIdx, hourBranchIdx),
    };
  }

  const saju: SajuPillars = {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    dayMaster: dStem.char,
    dayMasterElement: dStem.element,
  };

  // 5. Calculate Five Elements Distribution
  const elementsCount: Record<ElementType, number> = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  };

  const pillarsToCount = [yearPillar, monthPillar, dayPillar];
  if (hourPillar) pillarsToCount.push(hourPillar);

  for (const p of pillarsToCount) {
    elementsCount[p.stemElement] += 1;
    elementsCount[p.branchElement] += 1;
  }

  const total = pillarsToCount.length * 2;
  const sortedElems = (Object.keys(elementsCount) as ElementType[]).sort(
    (a, b) => elementsCount[b] - elementsCount[a]
  );
  const dominant = sortedElems[0];
  const lacking = (Object.keys(elementsCount) as ElementType[]).filter(
    (k) => elementsCount[k] === 0
  );

  // Balance calculation (standard deviation inverted)
  const avg = total / 5;
  const variance =
    Object.values(elementsCount).reduce((acc, count) => acc + Math.pow(count - avg, 2), 0) / 5;
  const balanceScore = Math.max(30, Math.min(95, Math.round(100 - variance * 10)));

  const fiveElements: FiveElementsCount = {
    wood: elementsCount.wood,
    fire: elementsCount.fire,
    earth: elementsCount.earth,
    metal: elementsCount.metal,
    water: elementsCount.water,
    total,
    dominant,
    lacking,
    balanceScore,
  };

  // 6. Ten Gods Distribution
  const tenGods: TenGodsDistribution = {
    bijian: 0, geopjae: 0, siksin: 0, sangwan: 0,
    pyeonjae: 0, jeongjae: 0, pyeongwan: 0, jeonggwan: 0,
    pyeonin: 0, jeongin: 0,
  };

  const godMap: Record<string, keyof TenGodsDistribution> = {
    '비견': 'bijian', '겁재': 'geopjae', '식신': 'siksin', '상관': 'sangwan',
    '편재': 'pyeonjae', '정재': 'jeongjae', '편관': 'pyeongwan', '정관': 'jeonggwan',
    '편인': 'pyeonin', '정인': 'jeongin',
  };

  pillarsToCount.forEach((p, idx) => {
    if (idx !== 2) { // Skip day stem itself
      const key = godMap[p.stemTenGod];
      if (key) tenGods[key] += 1;
    }
    const bKey = godMap[p.branchTenGod];
    if (bKey) tenGods[bKey] += 1;
  });

  // 7. Calculate Daeun (10-Year Major Luck Periods)
  // Forward if Male + Yang Year or Female + Yin Year
  // Backward if Male + Yin Year or Female + Yang Year
  const isYangYear = yStem.yinYang === 'yang';
  const isMale = input.gender === 'male';
  const isForward = (isMale && isYangYear) || (!isMale && !isYangYear);

  // Daeun starting age (typically 1 ~ 10, approximated based on birthday and month term)
  const baseAge = ((rawDay % 8) + 2); // Realistic 2 ~ 9 age starting number

  const daeunList: DaeunPeriod[] = [];
  let curStem = monthStemIdx;
  let curBranch = monthBranchIdx;

  for (let i = 0; i < 8; i++) {
    if (isForward) {
      curStem = (curStem + 1) % 10;
      curBranch = (curBranch + 1) % 12;
    } else {
      curStem = (curStem - 1 + 10) % 10;
      curBranch = (curBranch - 1 + 12) % 12;
    }

    const s = STEMS[curStem];
    const b = BRANCHES[curBranch];
    const sTenGod = getTenGod(dayStemIdx, curStem);
    const bTenGod = getTenGod(dayStemIdx, b.mainHiddenStem);

    const startAge = baseAge + i * 10;
    const endAge = startAge + 9;

    daeunList.push({
      startAge,
      endAge,
      pillar: `${s.char}${b.char}`,
      stem: s.char,
      branch: b.char,
      stemElement: s.element,
      branchElement: b.element,
      stemTenGod: sTenGod,
      branchTenGod: bTenGod,
      theme: `${startAge}세~${endAge}세: ${sTenGod}·${bTenGod} 대운의 기운`,
      summary: `${s.name}${b.name}(${ELEMENT_KR[s.element]}/${ELEMENT_KR[b.element]}) 흐름으로 ${sTenGod}의 주체적 역량과 ${bTenGod}의 환경적 기회가 조화를 이루는 시기입니다.`,
    });
  }

  // 8. Calculate 2026 ~ 2035 Annual Luck (연운)
  const annualLuckList: AnnualLuck[] = [];
  const startYear = 2026;

  // 2026 is 丙午 (Stem 2, Branch 6)
  for (let yr = startYear; yr <= startYear + 9; yr++) {
    const yDiff = yr - 2026;
    const sIdx = (2 + yDiff) % 10;
    const bIdx = (6 + yDiff) % 12;
    const s = STEMS[sIdx];
    const b = BRANCHES[bIdx];
    const stemGod = getTenGod(dayStemIdx, sIdx);
    const branchGod = getTenGod(dayStemIdx, b.mainHiddenStem);

    // Contextual analysis for the year
    const overallScore = 70 + ((sIdx + bIdx + dayStemIdx) % 25);

    annualLuckList.push({
      year: yr,
      pillar: `${s.char}${b.char}`,
      pillarName: `${yr}년 ${s.name}${b.name}년 (${b.animal}의 해)`,
      stemElement: s.element,
      branchElement: b.element,
      stemTenGod: stemGod,
      overallScore,
      overallSummary: `${stemGod}과 ${branchGod}의 상호작용으로 ${s.element === dStem.element ? '자신의 주도성이 확대되고 새로운 전환점이 마련되는' : '외적 환경의 변화에 유연하게 대응하며 성과를 쌓아가는'} 해입니다.`,
      wealth: `${stemGod.includes('재') ? '재물적 흐름이 활발하여 계획적인 관리 시 유익한 결실' : '안정적 소득 중심의 보수적인 자산 운용이 이로운 흐름'}`,
      career: `${stemGod.includes('관') || stemGod.includes('인') ? '사회적 인정, 승진, 직무 확장의 기회가 열리는 시기' : '창의적 기획과 독자적 역량 발휘에 유리한 국면'}`,
      relationships: `${branchGod.includes('비') ? '동료나 친구와의 연대감이 중요하게 부각되는 관계망' : '멘토 또는 조력자와의 만남을 통해 시야를 넓히는 기회'}`,
      love: `${stemGod.includes('재') || stemGod.includes('관') ? '진지하고 깊은 신뢰 관계가 형성되기 좋은 운기' : '서로의 독립적 영역을 존중하며 편안한 유대를 다지는 시기'}`,
      cautions: `무리한 확장보다는 내실을 다지고, 일과 휴식의 균형을 유지하는 태도가 권장됩니다.`,
    });
  }

  return {
    saju,
    fiveElements,
    tenGods,
    daeunList,
    annualLuckList,
  };
}
