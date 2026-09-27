// Saju, Astrology, and Analysis Type Definitions

export type Gender = 'male' | 'female';
export type CalendarType = 'solar' | 'lunar';

export type ElementType = 'wood' | 'fire' | 'earth' | 'metal' | 'water';
export type YinYang = 'yin' | 'yang';

export interface DirectGanjiInput {
  name?: string;
  gender: Gender;
  yearStem: string;   // '甲' ~ '癸'
  yearBranch: string; // '子' ~ '亥'
  monthStem: string;
  monthBranch: string;
  dayStem: string;
  dayBranch: string;
  hourStem?: string;
  hourBranch?: string;
  isUnknownTime?: boolean;
  birthCity?: string;
  interest?: 'all' | 'wealth' | 'career' | 'business' | 'love' | 'marriage' | 'relationship' | 'family';
}

export interface BirthInput {
  name: string;
  gender: Gender;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  isUnknownTime: boolean;
  calendarType: CalendarType;
  isLeapMonth?: boolean;
  birthCity: string;
  interest: 'all' | 'wealth' | 'career' | 'business' | 'love' | 'marriage' | 'relationship' | 'family';
  directGanji?: DirectGanjiInput;
}

export interface Pillar {
  stem: string;       // 천간 (e.g., '甲', '丙')
  stemHanja: string;
  stemName: string;   // '갑', '병'
  stemElement: ElementType;
  stemYinYang: YinYang;
  stemTenGod: string; // 십성 (비견, 겁재, etc.)

  branch: string;     // 지지 (e.g., '子', '午')
  branchHanja: string;
  branchName: string; // '자', '오'
  branchAnimal: string; // '쥐', '말'
  branchElement: ElementType;
  branchYinYang: YinYang;
  branchTenGod: string;

  stage: string;      // 십이운성 (장생, 건록, etc.)
  shinsal: string[];  // 지지 기준 신살/귀인
}

export interface SajuPillars {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar | null; // null if unknown time
  dayMaster: string;   // 일간 (e.g. '甲')
  dayMasterElement: ElementType;
}

export interface FiveElementsCount {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
  total: number;
  dominant: ElementType;
  lacking: ElementType[];
  balanceScore: number; // 0-100
}

export interface TenGodsDistribution {
  bijian: number;  // 비견
  geopjae: number; // 겁재
  siksin: number;  // 식신
  sangwan: number; // 상관
  pyeonjae: number;// 편재
  jeongjae: number;// 정재
  pyeongwan: number;// 편관
  jeonggwan: number;// 정관
  pyeonin: number; // 편인
  jeongin: number;  // 정인
}

export interface DaeunPeriod {
  startAge: number;
  endAge: number;
  pillar: string;       // e.g. "庚子"
  stem: string;
  branch: string;
  stemElement: ElementType;
  branchElement: ElementType;
  stemTenGod: string;
  branchTenGod: string;
  theme: string;
  summary: string;
  stage?: string;
  stemInfluence?: string;
  branchInfluence?: string;
  wealthAdvice?: string;
  careerAdvice?: string;
  cautions?: string;
  isCurrent?: boolean;
}

export interface AnnualLuck {
  year: number;
  pillar: string;       // e.g. "丙午"
  pillarName: string;   // "병오년 (붉은 말의 해)"
  stemElement: ElementType;
  branchElement: ElementType;
  stemTenGod: string;
  overallScore: number; // 0-100
  overallSummary: string;
  wealth: string;
  career: string;
  relationships: string;
  love: string;
  cautions: string;
}

export interface WesternPlanetPosition {
  name: string;
  nameKr: string;
  sign: string;
  signKr: string;
  degree: number;
  house: number;
  element: 'fire' | 'earth' | 'air' | 'water';
}

export interface WesternAstrologyData {
  sunSign: string;
  moonSign: string;
  ascendant: string;
  planets: WesternPlanetPosition[];
  dominantElement: string;
  keyAspects: string[];
}

export interface ThaiPlanetPosition {
  number: number; // 0 ~ 9
  name: string;
  nameKr: string;
  thaiName: string;
  sign: string;
  meaning: string;
  auspiciousDirection: string;
  color: string;
}

export interface ThaiAstrologyData {
  dayOfBirthThai: string;
  guardianPlanet: string;
  sacredColor: string;
  auspiciousDirection: string;
  planets: ThaiPlanetPosition[];
  destinySummary: string;
}

export interface StepAnalysis {
  stepNumber: string; // "01", "02", ... "13"
  title: string;
  subtitle: string;
  tags: string[];
  summary: string;
  detailedAnalysis: string[];
  recommendation: string;
}

export interface LifeChartReport {
  id: string;
  createdAt: string;
  birth: BirthInput;
  saju: SajuPillars;
  fiveElements: FiveElementsCount;
  tenGods: TenGodsDistribution;
  daeunList: DaeunPeriod[];
  annualLuckList: AnnualLuck[];
  westernAstrology: WesternAstrologyData;
  thaiAstrology: ThaiAstrologyData;
  keywords: string[];
  keyHeadline: string;
  steps: StepAnalysis[];
  isAiEnhanced?: boolean;
}

export interface CompatibilityInput {
  personA: BirthInput;
  personB: BirthInput;
}

export interface CompatibilityResult {
  personA: LifeChartReport;
  personB: LifeChartReport;
  overallResonanceScore: number; // 0-100
  title: string;
  summary: string;
  elementalHarmonies: {
    title: string;
    description: string;
    harmonyType: 'synergy' | 'balance' | 'growth';
  }[];
  personalityDynamics: string;
  communicationStyle: string;
  loveAndMarriage: string;
  wealthAndPartnership: string;
  conflictResolution: string;
  positiveKeyPoints: string[];
  cautionPoints: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}
