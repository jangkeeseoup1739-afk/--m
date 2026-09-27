import { MYEONGGYEOL_SYSTEM_PROMPT } from '../src/services/aiPrompts';
import { buildFallbackInterpretation } from '../src/services/fallbackNarrative';
import { getAi, GEMINI_MODEL, readBody } from './_gemini';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { chartData } = readBody(req);
  if (!chartData) return res.status(400).json({ error: 'chartData is required' });

  const ai = getAi();
  if (!ai) {
    // 키 미설정: 계산 엔진 값만으로 기승전결 장문 해석을 생성해 반환
    return res.status(200).json({
      success: true,
      mode: 'fallback',
      message: 'API 키가 설정되지 않아 사전 계산된 명결 정밀 해석 엔진으로 분석을 제공합니다.',
      aiInterpretation: buildFallbackInterpretation(chartData),
    });
  }

  const fe = chartData.fiveElements || {};
  const prompt = `
[사용자 차트 데이터]:
이름: ${chartData.birth?.name || '사용자'}
일간(나 자신): ${chartData.saju?.dayMaster} (${chartData.saju?.day?.stemName})
사주 구성:
- 년주: ${chartData.saju?.year?.stemHanja}${chartData.saju?.year?.branchHanja} (${chartData.saju?.year?.stemTenGod} / ${chartData.saju?.year?.branchTenGod})
- 월주: ${chartData.saju?.month?.stemHanja}${chartData.saju?.month?.branchHanja} (${chartData.saju?.month?.stemTenGod} / ${chartData.saju?.month?.branchTenGod})
- 일주: ${chartData.saju?.day?.stemHanja}${chartData.saju?.day?.branchHanja} (일원 / ${chartData.saju?.day?.branchTenGod})
- 시주: ${chartData.saju?.hour ? `${chartData.saju?.hour?.stemHanja}${chartData.saju?.hour?.branchHanja}` : '출생시간 미상'}
오행 분포(여덟 글자 중 글자 수 / 총 ${fe.total ?? 8}자): 목 ${fe.wood}자, 화 ${fe.fire}자, 토 ${fe.earth}자, 금 ${fe.metal}자, 수 ${fe.water}자
주도 오행: ${fe.dominant} / 비어 있는 오행: ${(fe.lacking || []).join(', ') || '없음'} / 조화 지수: ${fe.balanceScore ?? '-'}점
현재 대운: ${chartData.daeunList?.find((d: any) => d.isCurrent)?.pillar || chartData.daeunList?.[0]?.pillar || '-'}
올해 세운: ${chartData.annualLuckList?.[0]?.pillar || '-'}
서양 별자리: 태양 ${chartData.westernAstrology?.sunSign}, 달 ${chartData.westernAstrology?.moonSign}, 상승궁 ${chartData.westernAstrology?.ascendant}
태국 점성술: ${chartData.thaiAstrology?.dayOfBirthThai} 출생, 수호행성 ${chartData.thaiAstrology?.guardianPlanet}

위 데이터를 바탕으로 10대 분석 원칙과 기승전결 4단 표준 포맷을 준수하여 종합 해석을 작성하십시오.

- [기 · 타고난 구조]: 일간과 여덟 글자 구성, 주도 오행을 근거로 한 본질적 기질
- [승 · 실제 삶에서의 발현]: 월주와 십성, 현재 대운과 세운의 흐름이 재물·커리어·인간관계에서 작동하는 방식
- [전 · 짚고 넘어갈 지점]: 같은 기운이 과열될 때의 그림자와 비어 있는 오행이 뜻하는 보완 지점
- [결 · 오늘부터의 실천]: 방향·색상·습관·주기처럼 바로 적용 가능한 제언 2~3가지와 선택권 존중 마무리

반드시 공백 포함 1,200자 이상으로, 단답형 없이 각 단락을 충실히 채워 작성하십시오.
`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: { systemInstruction: MYEONGGYEOL_SYSTEM_PROMPT },
    });
    return res.status(200).json({ success: true, mode: 'ai_enhanced', aiInterpretation: response.text });
  } catch (err: any) {
    console.error('Gemini Analysis Error:', err);
    return res.status(200).json({
      success: true,
      mode: 'fallback',
      error: err?.message,
      aiInterpretation: buildFallbackInterpretation(chartData),
    });
  }
}
