export interface PlanProduct {
  id: string;
  tier: 'FREE' | 'BASIC' | 'PREMIUM' | 'AI_CONSULTING' | 'COMPATIBILITY';
  name: string;
  subtitle: string;
  badge?: string;
  price: number; // KRW
  originalPrice?: number;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export const PRODUCT_PLANS: PlanProduct[] = [
  {
    id: 'plan_free',
    tier: 'FREE',
    name: '무료 인생차트',
    subtitle: '누구나 즉시 체험하는 기본 명식',
    price: 0,
    features: [
      '사주팔자 4주(년·월·일·시) 명식 생성',
      '음양오행 분포 및 균형 지수 그래프',
      '본원(일간) 핵심 기운 및 성향 분석',
      '코스믹 만다라 인생차트 시각화',
      '시간 미상 보정 계산 지원',
      '출생정보 무저장 원칙 (보안 보장)',
    ],
    ctaText: '무료로 시작하기',
  },
  {
    id: 'plan_basic',
    tier: 'BASIC',
    name: '종합 사주 리포트',
    subtitle: '십성과 십이운성을 아우르는 심층 분석',
    badge: '실속형',
    price: 9900,
    originalPrice: 19000,
    features: [
      '무료 인생차트의 모든 기능 포함',
      '10성(비겁·식상·재성·관성·인성) 상세 분석',
      '12운성 생애주기 에너지 진단',
      '주요 길신·흉살(천을귀인, 문창, 도화, 역마 등)',
      '재물운 & 직업·사업운 1차 분석',
      '연애·인간관계 기본 가이드',
    ],
    ctaText: '종합 사주 열람하기',
  },
  {
    id: 'plan_premium',
    tier: 'PREMIUM',
    name: '13단계 프리미엄 올인원',
    subtitle: '동서양 천문 점성술과 10년 대운·세운 완벽 통합',
    badge: '가장 추천',
    isPopular: true,
    price: 24900,
    originalPrice: 49000,
    features: [
      '01~13단계 전 항목 프리미엄 종합 리포트',
      '10년 단위 대운 타임라인 전체 오픈',
      '2026~2035년 향후 10개년 세운 카드 전체 제공',
      '서양 10대 행성 & 하우스 점성술 차트 결합',
      '태국 수리야야트라 10행성 & 개운 지침',
      '건강 습관 라이프스타일 전통 명리 참고서',
      '영구 소장용 PDF 리포트 다운로드(예정)',
    ],
    ctaText: '프리미엄 차트 열기',
  },
  {
    id: 'plan_ai_consulting',
    tier: 'AI_CONSULTING',
    name: 'AI 도사 1:1 맞춤 상담권',
    subtitle: '내 차트 데이터를 학습한 AI와의 실시간 심층 문답',
    price: 14900,
    originalPrice: 29000,
    features: [
      '현재 사용자의 고유 명식 데이터 기반 질문 분석',
      '직업 전환, 이직, 창업, 투자 성향 맞춤 질문',
      '연애·결혼 타이밍 및 갈등 해결 질문 무제한 대화',
      'Gemini 3.8 Flash 최신 모델 즉각 추론',
      '명리학과 점성학 데이터 기반의 따뜻한 조언',
    ],
    ctaText: 'AI 상담 시작하기',
  },
  {
    id: 'plan_compatibility',
    tier: 'COMPATIBILITY',
    name: '명결 인연 궁합 리포트',
    subtitle: '단순 점수가 아닌 두 사람의 오행 조화와 소통법',
    badge: '연인·파트너 필수',
    price: 18900,
    originalPrice: 35000,
    features: [
      'A와 B 두 사람의 사주팔자 상호 교차 분석',
      '오행 상생·상극 밸런스 정밀 진단',
      '연애, 결혼, 사업 동업자 관점별 관계 패턴',
      '갈등 발생 시 현명한 대화법과 소통 솔루션',
      '두 사람의 10년 대운 시너지 비교',
    ],
    ctaText: '궁합 리포트 보기',
  },
];
