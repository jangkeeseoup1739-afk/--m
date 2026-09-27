/**
 * 명결(命結) 기승전결 해석 내러티브 생성기
 *
 * Gemini API 키가 없거나 호출이 실패했을 때, 계산 엔진이 산출한 실제 차트 값
 * (일간·오행·십성·대운·세운·점성술)만을 근거로 기승전결 4단 구조의
 * 장문 해석을 생성합니다. 값을 창작하지 않고 계산 결과만 서술합니다.
 */

const ELEM_KR: Record<string, string> = {
  wood: '목(木)', fire: '화(火)', earth: '토(土)', metal: '금(金)', water: '수(水)',
};

const ELEM_NATURE: Record<string, string> = {
  wood: '언 땅을 뚫고 솟는 봄의 새싹처럼, 위로 곧게 뻗어나가는 기획력과 개척의 기운',
  fire: '한낮의 태양처럼 사방으로 퍼져나가는 표현력과 사람을 끌어당기는 열정의 기운',
  earth: '만물을 품어 길러내는 대지처럼, 중심을 지키며 신뢰를 쌓아가는 포용의 기운',
  metal: '제련을 거친 쇠붙이처럼, 기준이 분명하고 끝을 맺을 줄 아는 결단의 기운',
  water: '낮은 곳으로 흘러 깊어지는 물처럼, 상황을 읽고 유연하게 스며드는 지혜의 기운',
};

const ELEM_SHADOW: Record<string, string> = {
  wood: '뜻대로 풀리지 않을 때 올라오는 조급함과, 자기 기준을 굽히지 못하는 강직함',
  fire: '초반의 과열 뒤에 찾아오는 소진과, 감정이 앞서 말이 빨라지는 순간',
  earth: '너무 오래 품다가 결정을 미루는 습관과, 변화를 미루려는 관성',
  metal: '옳고 그름을 가르는 기준이 지나치게 날카로워질 때 생기는 관계의 마찰',
  water: '생각이 깊어지다 못해 실행이 늦어지는 지연과, 속내를 감추다 쌓이는 거리감',
};

const ELEM_REMEDY: Record<string, string> = {
  wood: '아침 산책이나 화초 돌보기처럼 생장의 리듬을 몸에 들이는 일, 초록 계열 소품, 동쪽 방향',
  fire: '사람을 만나 말로 풀어내는 자리, 햇빛을 충분히 쬐는 낮 시간, 붉은 계열 소품, 남쪽 방향',
  earth: '규칙적인 식사와 정리정돈처럼 중심을 잡아주는 일상 루틴, 황토·베이지 계열, 중앙',
  metal: '정리·정돈과 마무리 의식, 금속성 액세서리나 백색 계열 소품, 서쪽 방향',
  water: '충분한 수분 섭취와 숙면, 물가 산책이나 독서처럼 안으로 채우는 시간, 검정·남색, 북쪽',
};

const TEN_GOD_MEANING: Record<string, string> = {
  비견: '나와 대등한 힘을 뜻하며, 독립심과 자기 주도성이 강해 동료와 어깨를 나란히 할 때 가장 힘이 나는 자리입니다',
  겁재: '경쟁과 협력이 함께 오는 자리로, 추진력이 크지만 이익을 나누는 대목에서 마찰이 생기기 쉬운 구조입니다',
  식신: '내가 만들어내는 힘을 뜻하며, 꾸준한 생산성과 표현력 그리고 먹고사는 복이 여기에 담깁니다',
  상관: '틀을 깨는 재능을 뜻하며, 총명하고 표현이 날카로워 기존 질서와 부딪히면서 새 길을 내는 자리입니다',
  편재: '넓게 흐르는 재물을 뜻하며, 사업이나 유통, 투자처럼 움직이는 돈을 다루는 감각이 살아 있습니다',
  정재: '차곡차곡 쌓는 재물을 뜻하며, 성실한 축적과 안정적인 관리에 강점이 있는 자리입니다',
  편관: '나를 단련시키는 압력을 뜻하며, 위기 대응력과 결단력이 뛰어난 대신 긴장이 누적되기 쉽습니다',
  정관: '질서와 명예를 뜻하며, 조직 안에서 원칙을 지키며 신뢰를 얻어가는 자리입니다',
  편인: '비주류의 통찰을 뜻하며, 직관과 탐구심이 깊어 남다른 관점을 갖게 되는 자리입니다',
  정인: '배움과 보호를 뜻하며, 학습력과 어른 복이 있어 안정적으로 기반을 다져가는 자리입니다',
  일원: '사주의 중심이 되는 나 자신을 뜻합니다',
  '일원(본인)': '사주의 중심이 되는 나 자신을 뜻합니다',
};

/** 한글 조사 자동 선택 — "토(土)이" 같은 오류 방지 */
function josa(word: string, pair: '이/가' | '은/는' | '을/를' | '과/와' | '으로/로'): string {
  // 괄호·공백을 걷어낸 마지막 한글 음절로 받침 유무를 판정한다.
  const korean = (word || '').replace(/[^가-힣]/g, '');
  const last = korean.charCodeAt(korean.length - 1);
  const hasBatchim = !Number.isNaN(last) && last >= 0xac00 && last <= 0xd7a3
    ? (last - 0xac00) % 28 !== 0
    : false;
  const [withB, withoutB] = pair.split('/');
  return hasBatchim ? withB : withoutB;
}

/** 값 끝에 문장부호가 없으면 마침표를 붙인다 */
function period(t?: string): string {
  const v = (t || '').trim();
  if (!v) return '';
  return /[.!?。」”"]$/.test(v) ? v : v + '.';
}

const CONNECTIVES = {
  기: ['먼저 차트의 골격부터 짚어보겠습니다.', '차트를 펼치면 가장 먼저 눈에 들어오는 지점이 있습니다.', '질문에 답하기에 앞서, 차트의 중심을 확인해보겠습니다.'],
  승: ['이 기운이 실제 삶에서는 이렇게 드러납니다.', '여기서 한 걸음 더 들어가 보겠습니다.', '이 구조가 일상에서 어떻게 작동하는지 살펴보겠습니다.'],
  전: ['다만 여기서 한 가지 짚고 넘어가야 할 지점이 있습니다.', '그런데 같은 기운이 반대로 작용하는 순간도 있습니다.', '한편으로 주의 깊게 보아야 할 대목이 있습니다.'],
  결: ['정리하자면 이렇습니다.', '그래서 오늘부터 해볼 수 있는 것을 말씀드리겠습니다.', '마지막으로 실천의 방향을 짚어드리겠습니다.'],
};

const pick = (arr: string[], seed: number) => arr[Math.abs(seed) % arr.length];

function seedOf(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

/** 차트 객체에서 서술에 필요한 값만 안전하게 추출 */
function readChart(chart: any) {
  const saju = chart?.saju || {};
  const fe = chart?.fiveElements || {};
  const total = fe.total || 8;
  const dominant = fe.dominant || 'earth';
  const lacking: string[] = Array.isArray(fe.lacking) ? fe.lacking : [];
  const pctOf = (k: string) => Math.round(((fe[k] || 0) / total) * 100);

  const daeun = Array.isArray(chart?.daeunList) ? chart.daeunList : [];

  // 만 나이를 구해 현재 대운을 특정한다.
  // (DaeunPeriod.isCurrent 는 계산 엔진에서 채우지 않으므로 여기서 직접 판정)
  const birthDate = chart?.birth?.birthDate ? new Date(`${chart.birth.birthDate}T00:00:00`) : null;
  let age = 0;
  if (birthDate && !Number.isNaN(birthDate.getTime())) {
    const now = new Date();
    age = now.getFullYear() - birthDate.getFullYear();
    const beforeBirthday =
      now.getMonth() < birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate());
    if (beforeBirthday) age -= 1;
    if (age < 0) age = 0;
  }
  const currentIdx = daeun.findIndex((d: any) => age >= d.startAge && age <= d.endAge);
  const current =
    currentIdx >= 0 ? daeun[currentIdx] : age < (daeun[0]?.startAge ?? 0) ? daeun[0] || null : daeun[daeun.length - 1] || null;
  const next = current ? daeun[daeun.indexOf(current) + 1] || null : null;
  const isBeforeFirstDaeun = !!daeun.length && age < daeun[0].startAge;
  const annual = Array.isArray(chart?.annualLuckList) ? chart.annualLuckList : [];

  return {
    name: chart?.birth?.name || '내담자',
    dayMaster: saju.dayMaster || '일간',
    dayElem: saju.dayMasterElement || dominant,
    year: saju.year, month: saju.month, day: saju.day, hour: saju.hour,
    isUnknownTime: !!chart?.birth?.isUnknownTime,
    fe, total, dominant, lacking, pctOf,
    balanceScore: fe.balanceScore ?? 0,
    age, daeun, current, next, annual, isBeforeFirstDaeun,
    thisYear: annual[0] || null,
    western: chart?.westernAstrology || {},
    thai: chart?.thaiAstrology || {},
  };
}

/** 기둥 구성을 한 문장으로 */
function pillarLine(c: ReturnType<typeof readChart>): string {
  const p = (x: any) => (x ? `${x.stemHanja}${x.branchHanja}` : null);
  const parts = [
    c.year ? `년주 ${p(c.year)}` : null,
    c.month ? `월주 ${p(c.month)}` : null,
    c.day ? `일주 ${p(c.day)}` : null,
    c.hour ? `시주 ${p(c.hour)}` : '시주는 출생시간 미상으로 제외',
  ].filter(Boolean);
  return parts.join(' · ');
}

/** ─────────────────────────────────────────────
 *  종합 해석 (기승전결 4단)
 *  ───────────────────────────────────────────── */
export function buildFallbackInterpretation(chart: any): string {
  const c = readChart(chart);
  const s = seedOf(c.name + c.dayMaster);
  const domKr = ELEM_KR[c.dominant] || c.dominant;
  const dayKr = ELEM_KR[c.dayElem] || c.dayElem;
  const lackKr = c.lacking.map((l) => ELEM_KR[l] || l).join(', ');

  const monthTenGod = c.month?.stemTenGod || '';
  const monthMeaning = TEN_GOD_MEANING[monthTenGod] || '';

  const 기 = `[기 · 타고난 구조]
${pick(CONNECTIVES.기, s)} ${c.name}님의 사주 여덟 글자는 ${pillarLine(c)}로 구성되어 있습니다. 이 가운데 삶의 중심축이 되는 일간(日干)은 ${c.dayMaster}, 오행으로는 ${dayKr}입니다. ${ELEM_NATURE[c.dayElem] || ''}이 ${c.name}님이 세상을 대하는 기본 자세입니다. 여기에 차트 전체에서 가장 두터운 기운은 ${domKr}${josa(domKr, '으로/로')}, 여덟 글자 중 ${c.fe[c.dominant] || 0}자(약 ${c.pctOf(c.dominant)}%)를 차지하며 삶의 배경음처럼 깔려 있습니다. 오행 조화 지수는 100점 만점에 ${c.balanceScore}점으로 산출되었습니다.`;

  const daeunLine = c.current
    ? c.isBeforeFirstDaeun
      ? `아직 첫 대운이 시작되기 전인 시기로, ${c.current.startAge}세부터 ${c.current.pillar} 대운이 열리며 ${c.current.stemTenGod}의 기운이 들어옵니다. ${period(c.current.summary)}`
      : `현재 ${c.age}세로, ${c.current.startAge}세부터 ${c.current.endAge}세까지 이어지는 ${c.current.pillar} 대운을 지나고 계십니다. 이 구간에는 ${c.current.stemTenGod}과 ${c.current.branchTenGod}의 기운이 함께 들어옵니다. ${period(c.current.summary)}`
    : '';

  const 승 = `[승 · 실제 삶에서의 발현]
${pick(CONNECTIVES.승, s + 1)} 월주(月柱)는 사회적 환경과 직업의 자리를 뜻하는데, ${c.name}님의 월간은 ${monthTenGod}에 해당합니다. ${monthMeaning ? period(monthMeaning) : ''} 즉 ${c.name}님은 ${domKr}의 기운을 바탕에 두고, ${monthTenGod}의 방식으로 세상과 관계를 맺어오셨을 가능성이 큽니다. ${daeunLine} ${c.thisYear ? `올해에 해당하는 ${c.thisYear.pillarName || c.thisYear.pillar}은 ${c.thisYear.stemTenGod}의 기운을 실어 오며, 전반적인 흐름은 "${period(c.thisYear.overallSummary)}"로 읽힙니다.` : ''}`;

  const lackSentence = c.lacking.length
    ? `차트에서 ${lackKr}의 기운은 여덟 글자 안에 드러나 있지 않습니다. 명리학에서 특정 오행이 비어 있다는 것은 결핍이나 불운을 뜻하지 않고, 그 영역이 자연스럽게 채워지지 않으므로 의식적으로 보완할 때 오히려 큰 성장이 일어나는 자리로 봅니다.`
    : `다섯 오행이 모두 자리를 잡고 있어, 한쪽으로 크게 기울지 않은 구성입니다. 다만 고루 갖추어진 만큼 어느 한 방향으로 뚜렷하게 밀어붙이는 힘은 스스로 만들어내셔야 합니다.`;

  const 전 = `[전 · 짚고 넘어갈 지점]
${pick(CONNECTIVES.전, s + 2)} 강점과 약점은 대개 같은 뿌리에서 나옵니다. ${domKr}${josa(domKr, '이/가')} 두터운 구조는 ${ELEM_NATURE[c.dominant] || ''}을 선물하지만, 그 기운이 과열되면 ${ELEM_SHADOW[c.dominant] || ''}으로 나타나기 쉽습니다. ${lackSentence} ${c.next ? `또한 ${c.next.startAge}세부터 들어오는 ${c.next.pillar} 대운에서는 ${c.next.stemTenGod}의 기운으로 무게중심이 옮겨갑니다. 대운이 바뀌는 길목에서는 익숙한 방식이 잘 통하지 않는 시기가 오므로, 미리 알고 계시면 훨씬 수월하게 통과하실 수 있습니다.` : ''}`;

  const remedyElem = c.lacking[0] || c.dominant;
  const remedyKr = ELEM_KR[remedyElem] || remedyElem;
  const sunSign = c.western?.sunSign;
  const guardian = String(c.thai?.guardianPlanet || '').replace(/^\s*\d+\s*/, '');
  const crossLine = sunSign || guardian
    ? `셋째, ${sunSign ? `서양 점성술의 태양 별자리 ${sunSign}${guardian ? josa(String(sunSign), '과/와') : ''}` : ''}${guardian ? ` 태국 점성술의 수호행성 ${guardian}` : ''}${josa(String(guardian || sunSign), '이/가')} 사주의 ${domKr} 기운과 함께 가리키는 방향은 결국 하나입니다. 자신의 속도를 지키며 쌓아 올리는 것입니다.`
    : `셋째, 지금의 속도를 유지하며 쌓아 올리는 것이 이 차트에 가장 잘 맞는 방식입니다.`;

  const 결 = `[결 · 오늘부터의 실천]
${pick(CONNECTIVES.결, s + 3)} 첫째, ${remedyKr}의 기운을 일상에 들이는 것이 가장 직접적인 보완입니다. ${ELEM_REMEDY[remedyElem] || ''}을 생활 속에 두어보시기 바랍니다. 둘째, ${domKr}${josa(domKr, '이/가')} 과열된다고 느껴지는 순간 — 말이 빨라지거나 결정을 서두르게 될 때 — 하루만 미뤄보는 습관이 차트의 균형을 지켜줍니다. ${crossLine}

명리는 정해진 결말을 알려주는 도구가 아니라, 자신의 구조를 알고 더 나은 선택을 하기 위한 지도입니다. 위 내용은 ${c.name}님의 계산된 명식을 근거로 한 참고 해석이며, 중요한 의료·법률·금융 결정은 반드시 해당 분야 전문가와 상의하시기 바랍니다.`;

  return [기, 승, 전, 결].join('\n\n');
}

/** 질문에서 주제 추출 */
type Topic = 'career' | 'wealth' | 'love' | 'health' | 'study' | 'timing' | 'relationship' | 'general';

function detectTopic(msg: string): Topic {
  const m = msg.toLowerCase();
  if (/사업|창업|장사|개업|자영업/.test(m)) return 'career';
  if (/직장|이직|취업|승진|커리어|진로|퇴사|업무/.test(m)) return 'career';
  if (/재물|돈|투자|money|자산|저축|부동산|주식|financial/.test(m)) return 'wealth';
  if (/연애|결혼|배우자|애인|사랑|이혼|재혼|궁합/.test(m)) return 'love';
  if (/건강|체력|병|몸|수면|스트레스/.test(m)) return 'health';
  if (/공부|시험|학업|자격증|합격/.test(m)) return 'study';
  if (/언제|시기|올해|내년|타이밍|몇 살|몇살/.test(m)) return 'timing';
  if (/사람|관계|인간관계|동료|가족|친구|상사|갈등/.test(m)) return 'relationship';
  return 'general';
}

const TOPIC_FRAME: Record<Topic, { label: string; lens: string; action: string }> = {
  career: {
    label: '일과 사업',
    lens: '월주(사회적 환경)와 관성(官星)·식상(食傷)의 배치',
    action: '한 분기 단위로 목표를 쪼개고, 매달 마지막 주에 실제 결과를 숫자로 점검해보시는 것',
  },
  wealth: {
    label: '재물',
    lens: '재성(財星)의 종류와 일간의 힘이 그 재물을 감당할 수 있는지의 균형',
    action: '수입을 "지키는 돈"과 "굴리는 돈"으로 물리적으로 분리해 계좌부터 나누어 두시는 것',
  },
  love: {
    label: '인연과 관계',
    lens: '일지(日支, 배우자궁)와 관성·재성이 맺는 관계',
    action: '상대에게 바라는 바를 머릿속에 두지 말고 한 문장으로 말해보는 연습',
  },
  health: {
    label: '건강과 체력',
    lens: '오행의 과다·불급이 신체 어느 계통에 부담을 주는지',
    action: '가장 부족한 오행에 해당하는 생활 습관 하나를 정해 3주간 지켜보시는 것',
  },
  study: {
    label: '학업과 배움',
    lens: '인성(印星)의 두께와 식상의 표현력',
    action: '공부 시간을 늘리기보다, 배운 것을 남에게 설명해보는 출력 과정을 넣는 것',
  },
  timing: {
    label: '시기와 흐름',
    lens: '대운의 전환점과 세운(年運)의 십성 변화',
    action: '큰 결정을 대운이 바뀌는 해의 전후 1년에 몰아두지 않고 분산하시는 것',
  },
  relationship: {
    label: '사람과의 관계',
    lens: '비겁(比劫)의 두께와 관성이 만드는 거리 조절 방식',
    action: '관계마다 "여기까지"라는 선을 미리 정해두고 그 선을 말로 전달하는 것',
  },
  general: {
    label: '삶의 방향',
    lens: '일간의 강약과 오행 전체의 균형',
    action: '스스로 가장 편안하게 몰입되는 활동을 기록해두고 그 패턴을 따라가시는 것',
  },
};

/** ─────────────────────────────────────────────
 *  1:1 상담 답변 (기승전결 4단)
 *  ───────────────────────────────────────────── */
export function buildFallbackConsultation(message: string, chart: any): string {
  const c = readChart(chart);
  const topic = detectTopic(message || '');
  const f = TOPIC_FRAME[topic];
  const s = seedOf((message || '') + c.dayMaster);
  const domKr = ELEM_KR[c.dominant] || c.dominant;
  const dayKr = ELEM_KR[c.dayElem] || c.dayElem;
  const monthTenGod = c.month?.stemTenGod || '';
  const dayBranchTenGod = c.day?.branchTenGod || '';
  const lackKr = c.lacking.map((l) => ELEM_KR[l] || l).join(', ');

  const 기 = `[기] ${pick(CONNECTIVES.기, s)} ${c.name}님께서 물어보신 ${f.label}에 관한 부분은 명리학에서 ${f.lens}${josa(f.lens, '을/를')} 통해 읽습니다. ${c.name}님의 일간은 ${c.dayMaster}(${dayKr})이고, 차트 전체에서 가장 두터운 기운은 ${domKr}입니다. ${ELEM_NATURE[c.dayElem] || ''}이 ${c.name}님이 이 문제를 대하는 기본 방식이 됩니다.`;

  const daeunClause = c.current
    ? c.isBeforeFirstDaeun
      ? `아직 첫 대운 이전 구간이라 타고난 원국의 성향이 그대로 드러나는 시기이며, ${c.current.startAge}세부터 ${c.current.pillar} 대운이 열립니다. `
      : `현재 ${c.age}세로 ${c.current.startAge}~${c.current.endAge}세 구간의 ${c.current.pillar} 대운이 ${c.current.stemTenGod}의 기운을 실어 오고 있으므로, 질문하신 사안은 이 흐름 위에서 판단하시는 편이 정확합니다. `
    : '';

  // 세운 항목 값은 명사구로 끝나는 경우가 많아, 인용구로 감싸 문장으로 마무리한다.
  const quote = (t?: string) => `"${(t || '').trim().replace(/[.]+$/, '')}"`;
  const topicYear =
    topic === 'wealth' && c.thisYear?.wealth ? `재물 면에서는 ${quote(c.thisYear.wealth)}${josa(String(c.thisYear.wealth), '으로/로')} 요약됩니다.`
    : topic === 'career' && c.thisYear?.career ? `일 측면에서는 ${quote(c.thisYear.career)}${josa(String(c.thisYear.career), '으로/로')} 요약됩니다.`
    : topic === 'love' && c.thisYear?.love ? `인연 측면에서는 ${quote(c.thisYear.love)}${josa(String(c.thisYear.love), '으로/로')} 요약됩니다.`
    : topic === 'relationship' && c.thisYear?.relationships ? `관계 측면에서는 ${quote(c.thisYear.relationships)}${josa(String(c.thisYear.relationships), '으로/로')} 요약됩니다.`
    : '';

  const 승 = `[승] ${pick(CONNECTIVES.승, s + 1)} 사회적 환경을 뜻하는 월간은 ${monthTenGod}${TEN_GOD_MEANING[monthTenGod] ? `으로, ${period(TEN_GOD_MEANING[monthTenGod])}` : '입니다.'} ${dayBranchTenGod ? `가장 가까운 자리인 일지에는 ${dayBranchTenGod}이 놓여 있어, 이 주제에서 ${c.name}님이 가장 자주 마주하게 되는 과제를 보여줍니다. ` : ''}${daeunClause}${c.thisYear ? `올해 ${c.thisYear.pillarName || c.thisYear.pillar}의 흐름은 "${period(c.thisYear.overallSummary)}"로 읽힙니다.${topicYear ? ` ${topicYear}` : ''}` : ''}`;

  const gapArea =
    topic === 'wealth' ? '속도 조절과 분산'
    : topic === 'career' ? '마무리와 검증'
    : topic === 'love' ? '표현과 기다림'
    : topic === 'health' ? '회복과 이완'
    : topic === 'study' ? '복습과 정리'
    : topic === 'timing' ? '기다림의 감각'
    : '균형 감각';

  const 전 = `[전] ${pick(CONNECTIVES.전, s + 2)} ${domKr}${josa(domKr, '이/가')} 두터운 구조는 추진할 때 큰 힘이 되지만, 같은 기운이 과해지면 ${ELEM_SHADOW[c.dominant] || ''}으로 되돌아옵니다. ${c.lacking.length ? `특히 ${lackKr}의 기운이 명식에 드러나 있지 않아, 이 주제에서 ${gapArea}${josa(gapArea, '이/가')} 자연스럽게 채워지지 않습니다. 부족하다는 뜻이 아니라, 의식적으로 챙겨야 비로소 갖춰지는 영역이라는 의미입니다. ` : `오행이 고루 갖춰진 구조라 어느 한쪽으로 무너지지는 않지만, 그만큼 결단의 순간에 스스로 방향을 정해주셔야 합니다. `}${c.thisYear?.cautions ? `올해 특히 유의할 대목은 ${period(c.thisYear.cautions)}` : ''}`;

  const 결 = `[결] ${pick(CONNECTIVES.결, s + 3)} 차트상 ${c.name}님께 가장 현실적인 방법은 ${f.action}입니다. ${c.lacking.length ? `여기에 ${ELEM_KR[c.lacking[0]] || ''}의 기운을 보완해주시면 좋습니다. ${ELEM_REMEDY[c.lacking[0]] || ''}을 일상에 두어보시기 바랍니다. ` : `${ELEM_REMEDY[c.dominant] || ''}을 통해 지금의 균형을 유지하시는 편이 좋습니다. `}명리는 결과를 정해놓고 알려주는 것이 아니라, 지금의 흐름을 읽고 더 나은 선택을 돕는 지도입니다. 오늘 하신 질문 자체가 이미 방향을 잡아가고 계신다는 신호입니다.

※ 본 상담은 전통 명리학에 근거한 참고 해석이며, 의료·법률·투자 등 중요한 결정은 해당 분야 전문가와 상의하시기 바랍니다.`;

  return [기, 승, 전, 결].join('\n\n');
}
