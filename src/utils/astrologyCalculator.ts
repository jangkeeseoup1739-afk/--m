// Western Astrology Planetary & Zodiac Calculation Module

import { BirthInput, WesternAstrologyData, WesternPlanetPosition } from '../types/saju';

export interface ZodiacSignInfo {
  name: string;
  nameKr: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  modality: 'cardinal' | 'fixed' | 'mutable';
  ruler: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
}

export const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  { name: 'Aries', nameKr: '양자리', element: 'fire', modality: 'cardinal', ruler: 'Mars', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: 'Taurus', nameKr: '황소자리', element: 'earth', modality: 'fixed', ruler: 'Venus', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: 'Gemini', nameKr: '쌍둥이자리', element: 'air', modality: 'mutable', ruler: 'Mercury', startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 },
  { name: 'Cancer', nameKr: '게자리', element: 'water', modality: 'cardinal', ruler: 'Moon', startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 },
  { name: 'Leo', nameKr: '사자자리', element: 'fire', modality: 'fixed', ruler: 'Sun', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: 'Virgo', nameKr: '처녀자리', element: 'earth', modality: 'mutable', ruler: 'Mercury', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: 'Libra', nameKr: '천칭자리', element: 'air', modality: 'cardinal', ruler: 'Venus', startMonth: 9, startDay: 23, endMonth: 10, endDay: 23 },
  { name: 'Scorpio', nameKr: '전갈자리', element: 'water', modality: 'fixed', ruler: 'Pluto', startMonth: 10, startDay: 24, endMonth: 11, endDay: 22 },
  { name: 'Sagittarius', nameKr: '사수자리', element: 'fire', modality: 'mutable', ruler: 'Jupiter', startMonth: 11, startDay: 23, endMonth: 12, endDay: 21 },
  { name: 'Capricorn', nameKr: '염소자리', element: 'earth', modality: 'cardinal', ruler: 'Saturn', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { name: 'Aquarius', nameKr: '물병자리', element: 'air', modality: 'fixed', ruler: 'Uranus', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: 'Pisces', nameKr: '물고기자리', element: 'water', modality: 'mutable', ruler: 'Neptune', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
];

export function getSunSign(month: number, day: number): ZodiacSignInfo {
  for (const sign of ZODIAC_SIGNS) {
    if (sign.startMonth === sign.endMonth) {
      if (month === sign.startMonth && day >= sign.startDay && day <= sign.endDay) return sign;
    } else if (sign.startMonth > sign.endMonth) { // Capricorn spans Dec-Jan
      if ((month === sign.startMonth && day >= sign.startDay) || (month === sign.endMonth && day <= sign.endDay)) {
        return sign;
      }
    } else {
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay)
      ) {
        return sign;
      }
    }
  }
  return ZODIAC_SIGNS[0];
}

export function calculateWesternAstrology(input: BirthInput): WesternAstrologyData {
  const dateStr = (input.birthDate || '1995-05-15').replace(/[./]/g, '-');
  const parts = dateStr.split('-').map(Number);
  const rawYear = parts[0] || 1990;
  const rawMonth = parts[1] || 1;
  const rawDay = parts[2] || 1;

  let birthHour = 12;
  let birthMinute = 0;
  if (!input.isUnknownTime && input.birthTime) {
    const [h, m] = input.birthTime.split(':').map(Number);
    birthHour = isNaN(h) ? 12 : h;
    birthMinute = isNaN(m) ? 0 : m;
  }

  const sunSign = getSunSign(rawMonth, rawDay);
  const sunSignIdx = ZODIAC_SIGNS.findIndex(s => s.name === sunSign.name);

  // Ascendant estimation:
  // Sun rises at ~6am. Every 2 hours shifts 1 zodiac sign.
  const hoursSinceSunrise = (birthHour + birthMinute / 60 - 6 + 24) % 24;
  const ascShift = Math.floor(hoursSinceSunrise / 2);
  const ascIdx = (sunSignIdx + ascShift) % 12;
  const ascSign = ZODIAC_SIGNS[ascIdx];

  // Moon sign estimation: Moon cycles through 12 signs in ~27.3 days (approx 2.3 days per sign)
  const dayOfYear = (rawMonth - 1) * 30 + rawDay;
  const moonIdx = (dayOfYear + Math.floor(rawYear * 1.3)) % 12;
  const moonSign = ZODIAC_SIGNS[moonIdx];

  // Planets calculation
  const planetsList: { name: string; nameKr: string; cycleOffset: number; houseOffset: number }[] = [
    { name: 'Sun', nameKr: '태양 (자아/본질)', cycleOffset: 0, houseOffset: 1 },
    { name: 'Moon', nameKr: '달 (감성/내면)', cycleOffset: moonIdx - sunSignIdx, houseOffset: 4 },
    { name: 'Mercury', nameKr: '수성 (지성/소통)', cycleOffset: (rawDay % 3) - 1, houseOffset: 3 },
    { name: 'Venus', nameKr: '금성 (사랑/가치관)', cycleOffset: (rawDay % 5) - 2, houseOffset: 7 },
    { name: 'Mars', nameKr: '화성 (열정/추진력)', cycleOffset: (rawMonth + 2) % 12, houseOffset: 10 },
    { name: 'Jupiter', nameKr: '목성 (확장/행운)', cycleOffset: (rawYear % 12), houseOffset: 9 },
    { name: 'Saturn', nameKr: '토성 (책임/성숙)', cycleOffset: Math.floor(rawYear / 2.5) % 12, houseOffset: 6 },
    { name: 'Uranus', nameKr: '천왕성 (혁신/독창)', cycleOffset: Math.floor(rawYear / 7) % 12, houseOffset: 11 },
    { name: 'Neptune', nameKr: '해왕성 (영감/직관)', cycleOffset: Math.floor(rawYear / 14) % 12, houseOffset: 12 },
    { name: 'Pluto', nameKr: '명왕성 (변혁/재생)', cycleOffset: Math.floor(rawYear / 20) % 12, houseOffset: 8 },
  ];

  const planets: WesternPlanetPosition[] = planetsList.map((p) => {
    const signIndex = (sunSignIdx + p.cycleOffset + 120) % 12;
    const sign = ZODIAC_SIGNS[signIndex];
    const degree = Math.floor(1 + ((rawDay * 7 + p.houseOffset * 13) % 28));
    const house = ((signIndex - ascIdx + 12) % 12) + 1;

    return {
      name: p.name,
      nameKr: p.nameKr,
      sign: sign.name,
      signKr: sign.nameKr,
      degree,
      house,
      element: sign.element,
    };
  });

  const dominantElement = sunSign.element;

  const keyAspects = [
    `태양 ${sunSign.nameKr}과 달 ${moonSign.nameKr}의 조화: ${sunSign.nameKr}의 의지와 ${moonSign.nameKr}의 직관력이 삶의 중심축을 형성합니다.`,
    `상승궁(Ascendant) ${ascSign.nameKr}: 타인에게 비치는 첫인상과 세상을 향해 나아가는 방식에 ${ascSign.element === 'fire' ? '진취적인 열정' : ascSign.element === 'water' ? '섬세한 공감능력' : ascSign.element === 'air' ? '지적 유연성과 소통' : '안정적이고 신뢰감 있는 무게감'}이 돋보입니다.`,
    `수성과 금성의 위치: 감성과 논리가 분리되지 않고 상황에 알맞은 균형점을 찾는 소통 역량을 제공합니다.`,
  ];

  return {
    sunSign: `${sunSign.nameKr} (${sunSign.name})`,
    moonSign: `${moonSign.nameKr} (${moonSign.name})`,
    ascendant: input.isUnknownTime ? `${ascSign.nameKr} (출생시간 미입력 시 추정)` : `${ascSign.nameKr} (${ascSign.name})`,
    planets,
    dominantElement,
    keyAspects,
  };
}
