// Compatibility (사주 궁합) Multi-dimensional Relationship Engine
// Analyzes elemental dynamics, personality synergy, communication, and growth without binary fatalistic ratings.

import { BirthInput, CompatibilityResult, ElementType } from '../types/saju';
import { calculateSaju } from './sajuCalculator';
import { calculateWesternAstrology } from './astrologyCalculator';
import { calculateThaiAstrology } from './thaiAstrologyCalculator';
import { buildLifeChartReport } from '../data/interpretations';

export function calculateCompatibility(personAInput: BirthInput, personBInput: BirthInput): CompatibilityResult {
  const sajuA = calculateSaju(personAInput);
  const westA = calculateWesternAstrology(personAInput);
  const thaiA = calculateThaiAstrology(personAInput);
  const reportA = buildLifeChartReport(
    personAInput,
    sajuA.saju,
    sajuA.fiveElements,
    sajuA.tenGods,
    sajuA.daeunList,
    sajuA.annualLuckList,
    westA,
    thaiA
  );

  const sajuB = calculateSaju(personBInput);
  const westB = calculateWesternAstrology(personBInput);
  const thaiB = calculateThaiAstrology(personBInput);
  const reportB = buildLifeChartReport(
    personBInput,
    sajuB.saju,
    sajuB.fiveElements,
    sajuB.tenGods,
    sajuB.daeunList,
    sajuB.annualLuckList,
    westB,
    thaiB
  );

  const dmA = reportA.saju.dayMaster;
  const dmB = reportB.saju.dayMaster;
  const elemA = reportA.fiveElements.dominant;
  const elemB = reportB.fiveElements.dominant;

  // Relationship Resonance Score (75-96)
  const baseResonance = 78 + (Math.abs(reportA.fiveElements.balanceScore - reportB.fiveElements.balanceScore) % 18);

  const elementalHarmonies = [
    {
      title: `${reportA.birth.name}님의 [${elemA}]과 ${reportB.birth.name}님의 [${elemB}]의 상호작용`,
      description: `서로의 기운이 ${elemA === elemB ? '동일한 오행으로 공감대 형성이 빠르고 취향이 잘 통하는 구조' : '서로 다른 오행으로 부족한 부분을 채워주며 새로운 시야를 열어주는 상호보완적 구조'}를 이룹니다.`,
      harmonyType: (elemA === elemB ? 'synergy' : 'growth') as 'synergy' | 'balance' | 'growth',
    },
    {
      title: '일지(배우자궁) 간의 조화와 기운 흐름',
      description: `${reportA.birth.name}님의 일지 [${reportA.saju.day.branchAnimal}]와 ${reportB.birth.name}님의 일지 [${reportB.saju.day.branchAnimal}]는 일상 속에서 서로의 독립적 공간을 인정해줄 때 가장 편안한 안도감을 선사합니다.`,
      harmonyType: 'balance' as const,
    },
    {
      title: '별자리와 삶의 가치관 연결',
      description: `${reportA.westernAstrology.sunSign}와 ${reportB.westernAstrology.sunSign}의 조합으로, 현실적인 목표 추구와 감정적 교류에서 서로의 장점을 존중하는 파트너십을 형성합니다.`,
      harmonyType: 'synergy' as const,
    },
  ];

  const personalityDynamics = `${reportA.birth.name}님은 ${dmA}의 주체성과 결단력이 돋보이는 반면, ${reportB.birth.name}님은 ${dmB}의 유연성과 세심함이 특징입니다. 한 사람이 방향타를 잡을 때 다른 한 사람이 항로를 세밀히 살펴주는 이상적인 협력 구도를 이룰 수 있습니다.`;

  const communicationStyle = `대화할 때 ${reportA.birth.name}님은 결론과 핵심을 명확히 하는 소통을 선호하고, ${reportB.birth.name}님은 맥락과 감정적 교감을 중시합니다. 결론을 서두르기보다 상대의 감정을 한 번 더 짚어주는 한 마디가 두 사람의 신뢰를 배가시킵니다.`;

  const loveAndMarriage = `연애 초기에는 서로의 뚜렷한 개성에 강한 끌림을 느끼며, 시간이 지날수록 서로가 곁에 있을 때 오는 안정감이 깊어지는 흐름입니다. 중요한 가치관이나 금전 문제에 대해 솔직하게 오픈하고 상의하는 문화가 장기적 행복의 초석입니다.`;

  const wealthAndPartnership = `비즈니스나 자산 관리 측면에서는 매우 유익한 파트너십입니다. 과감한 기회 포착과 꼼꼼한 리스크 관리가 조화롭게 결합되어, 독단적인 결정을 예방하고 실질적인 결실을 거두는 시너지를 냅니다.`;

  const conflictResolution = `갈등이 발생했을 때 즉각적인 감정 공방보다는, 각자 20~30분의 쿨링 타임을 가진 뒤 차분하게 '내가 느낀 감정'을 전하는 I-Message 대화법을 실천하는 것이 권장됩니다.`;

  const positiveKeyPoints = [
    '서로의 부족한 영역을 보완해주는 탁월한 균형 감각',
    '위기 상황에서 서로에게 든든한 심리적 안전기지 역할',
    '서로의 성장과 꿈을 아낌없이 응원해주는 진정한 지지자',
  ];

  const cautionPoints = [
    '자신의 기준이나 방식을 당연하게 여기고 상대에게 강요하지 않기',
    '서운한 점이 생겼을 때 침묵하기보다 부드러운 언어로 조기에 나누기',
  ];

  return {
    personA: reportA,
    personB: reportB,
    overallResonanceScore: baseResonance,
    title: `${personAInput.name}님과 ${personBInput.name}님의 조화로운 인연 분석`,
    summary: `두 분의 관계는 '다름을 통해 서로를 완성해나가는 상호보완적 인연'입니다. 일방적인 맞춤이 아닌 존중과 배려 속에서 함께 성장하는 따뜻한 시너지를 지니고 있습니다.`,
    elementalHarmonies,
    personalityDynamics,
    communicationStyle,
    loveAndMarriage,
    wealthAndPartnership,
    conflictResolution,
    positiveKeyPoints,
    cautionPoints,
  };
}
