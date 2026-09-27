// Preset Realistic Sample Profiles for Instant Exploration

import { BirthInput } from '../types/saju';

export const SAMPLE_PROFILES: { label: string; description: string; input: BirthInput }[] = [
  {
    label: '성장과 도약을 꿈꾸는 청년 (1995년생)',
    description: '1995년 5월 15일 08:30 서울 출생 · 진취적 도전과 커리어 전환점',
    input: {
      name: '김서연',
      gender: 'female',
      birthDate: '1995-05-15',
      birthTime: '08:30',
      isUnknownTime: false,
      calendarType: 'solar',
      birthCity: '서울특별시',
      interest: 'career',
    },
  },
  {
    label: '안정적인 결실과 자산을 추구하는 직장인 (1988년생)',
    description: '1988년 10월 24일 14:15 부산 출생 · 재물 자산과 사업 파트너십',
    input: {
      name: '이도현',
      gender: 'male',
      birthDate: '1988-10-24',
      birthTime: '14:15',
      isUnknownTime: false,
      calendarType: 'solar',
      birthCity: '부산광역시',
      interest: 'wealth',
    },
  },
  {
    label: '출생시간 미상 샘플 (1992년생)',
    description: '1992년 7월 8일 대전 출생 · 삼주(년/월/일) 중심 직관적 분석',
    input: {
      name: '박민우',
      gender: 'male',
      birthDate: '1992-07-08',
      birthTime: '',
      isUnknownTime: true,
      calendarType: 'solar',
      birthCity: '대전광역시',
      interest: 'all',
    },
  },
];
