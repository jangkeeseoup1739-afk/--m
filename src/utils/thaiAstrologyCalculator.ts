// Thai Astrology (โหราศาสตร์ไทย - Horasat Thai) Calculation Module
// Features the 10-planet Suriyayatra planetary system and Thai day-of-birth auspicious coordinates.

import { BirthInput, ThaiAstrologyData, ThaiPlanetPosition } from '../types/saju';

export interface ThaiDayInfo {
  dayName: string;
  dayNameKr: string;
  guardian: string;
  guardianKr: string;
  color: string;
  colorName: string;
  direction: string;
}

const THAI_DAY_SYSTEM: Record<number, ThaiDayInfo> = {
  0: { dayName: 'Wan Athit', dayNameKr: '일요일', guardian: 'Phra Athit', guardianKr: '1 태양 (태양신 아팃)', color: '#ef4444', colorName: '붉은색 (진홍/버건디)', direction: '북동쪽' },
  1: { dayName: 'Wan Chan', dayNameKr: '월요일', guardian: 'Phra Chan', guardianKr: '2 달 (달의 신 찬)', color: '#eab308', colorName: '황금빛 노랑', direction: '동쪽' },
  2: { dayName: 'Wan Angkhan', dayNameKr: '화요일', guardian: 'Phra Angkhan', guardianKr: '3 화성 (용기와 결단의 앙칸)', color: '#ec4899', colorName: '연분홍 / 로즈', direction: '남동쪽' },
  3: { dayName: 'Wan Phut', dayNameKr: '수요일', guardian: 'Phra Phut', guardianKr: '4 수성 (지혜와 소통의 풋)', color: '#10b981', colorName: '비취색 / 에메랄드 그린', direction: '남쪽' },
  4: { dayName: 'Wan Phruehat', dayNameKr: '목요일', guardian: 'Phra Phruehat', guardianKr: '5 목성 (스승과 진리의 프르핫)', color: '#f97316', colorName: '오렌지 / 호박색', direction: '서쪽' },
  5: { dayName: 'Wan Suk', dayNameKr: '금요일', guardian: 'Phra Suk', guardianKr: '6 금성 (예술과 풍요의 쑥)', color: '#06b6d4', colorName: '하늘색 / 청록', direction: '북쪽' },
  6: { dayName: 'Wan Sao', dayNameKr: '토요일', guardian: 'Phra Sao', guardianKr: '7 토성 (인내와 성찰의 사오)', color: '#8b5cf6', colorName: '보라색 / 딥 바이올렛', direction: '남서쪽' },
};

export const THAI_TEN_PLANETS = [
  { number: 0, name: 'Maruetthayu', nameKr: '천왕 (0)', thaiName: 'ดาวมฤตยู', meaning: '급격한 혁신, 기존 틀을 깨는 독창성, 현대적 지식', color: '#6366f1', auspiciousDirection: '중앙' },
  { number: 1, name: 'Athit', nameKr: '태양 (1)', thaiName: 'พระอาทิตย์', meaning: '명예, 리더십, 존재감, 당당한 생명력', color: '#ef4444', auspiciousDirection: '북동쪽' },
  { number: 2, name: 'Chan', nameKr: '달 (2)', thaiName: 'พระจันทร์', meaning: '부드러움, 감수성, 인간적인 매력과 친화력', color: '#facc15', auspiciousDirection: '동쪽' },
  { number: 3, name: 'Angkhan', nameKr: '화성 (3)', thaiName: 'พระอังคาร', meaning: '투지, 도전정신, 빠른 결단력과 행동력', color: '#ec4899', auspiciousDirection: '남동쪽' },
  { number: 4, name: 'Phut', nameKr: '수성 (4)', thaiName: 'พระพุธ', meaning: '언변, 협상력, 상업적 감각과 기민함', color: '#10b981', auspiciousDirection: '남쪽' },
  { number: 5, name: 'Phruehat', nameKr: '목성 (5)', thaiName: 'พระพฤหัสบดี', meaning: '도덕성, 스승의 지혜, 학문과 보호의 축복', color: '#f97316', auspiciousDirection: '서쪽' },
  { number: 6, name: 'Suk', nameKr: '금성 (6)', thaiName: 'พระศุกร์', meaning: '미적 감각, 재물운, 삶의 즐거움과 사랑', color: '#06b6d4', auspiciousDirection: '북쪽' },
  { number: 7, name: 'Sao', nameKr: '토성 (7)', thaiName: 'พระเสาร์', meaning: '끈기, 깊은 사색, 고난을 극복하고 쌓는 성취', color: '#8b5cf6', auspiciousDirection: '남서쪽' },
  { number: 8, name: 'Rahu', nameKr: '라후 (8)', thaiName: 'พระราหู', meaning: '비범한 전략, 신비로운 추진력, 밤의 지혜', color: '#475569', auspiciousDirection: '북서쪽' },
  { number: 9, name: 'Ket', nameKr: '케투 (9)', thaiName: 'พระเกตุ', meaning: '영적 직관, 조상의 가호, 신비로운 행운', color: '#eab308', auspiciousDirection: '천문' },
];

export function calculateThaiAstrology(input: BirthInput): ThaiAstrologyData {
  const dateStr = (input.birthDate || '1995-05-15').replace(/[./]/g, '-');
  const parts = dateStr.split('-').map(Number);
  const rawYear = parts[0] || 1990;
  const rawMonth = parts[1] || 1;
  const rawDay = parts[2] || 1;

  const birthDateObj = new Date(rawYear, rawMonth - 1, rawDay);
  const dayOfWeek = birthDateObj.getDay(); // 0 is Sunday, 6 is Saturday

  // In Thai astrology, Wednesday Night (after 18:00) is governed by Rahu (8)
  let dayInfo = THAI_DAY_SYSTEM[dayOfWeek] || THAI_DAY_SYSTEM[0];
  if (dayOfWeek === 3 && !input.isUnknownTime && input.birthTime) {
    const hour = parseInt(input.birthTime.split(':')[0] || '12', 10);
    if (hour >= 18 || hour < 6) {
      dayInfo = {
        dayName: 'Wan Phut Klang Khuen',
        dayNameKr: '수요일 (야간-라후)',
        guardian: 'Phra Rahu',
        guardianKr: '8 라후 (신비와 전략의 라후)',
        color: '#475569',
        colorName: '스모키 그레이 / 밤하늘빛',
        direction: '북서쪽',
      };
    }
  }

  // Generate Thai 10-planets arrangement for chart
  const thaiSigns = [
    '메사 (양궁)', '프르솝 (황소궁)', '메툰 (쌍둥이궁)', '꺼라꼿 (게궁)',
    '싱 (사자궁)', '깐 (처녀궁)', '뚠 (천칭궁)', '프릭 (전갈궁)',
    '타누 (사수궁)', '망껀 (염소궁)', '꿈 (물병궁)', '민 (물고기궁)'
  ];

  const planets: ThaiPlanetPosition[] = THAI_TEN_PLANETS.map((tp, idx) => {
    const signIdx = (dayOfWeek * 2 + idx * 3 + rawDay) % 12;
    return {
      number: tp.number,
      name: tp.name,
      nameKr: tp.nameKr,
      thaiName: tp.thaiName,
      sign: thaiSigns[signIdx],
      meaning: tp.meaning,
      auspiciousDirection: tp.auspiciousDirection,
      color: tp.color,
    };
  });

  const destinySummary = `태국 전통 수리야야트라 체계에 따르면, ${dayInfo.dayNameKr} 출생자는 [${dayInfo.guardianKr}]의 특별한 수호 에너지를 품고 있습니다. ${dayInfo.colorName} 계열의 색상과 ${dayInfo.direction} 방향이 에너지 흐름을 원활하게 돕는 조화의 축으로 작용합니다.`;

  return {
    dayOfBirthThai: dayInfo.dayNameKr,
    guardianPlanet: dayInfo.guardianKr,
    sacredColor: dayInfo.colorName,
    auspiciousDirection: dayInfo.direction,
    planets,
    destinySummary,
  };
}
