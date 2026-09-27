import { MYEONGGYEOL_SYSTEM_PROMPT } from '../src/services/aiPrompts';
import { buildFallbackConsultation } from '../src/services/fallbackNarrative';
import { getAi, GEMINI_MODEL, readBody } from './_gemini';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, chartData, history } = readBody(req);
  if (!message) return res.status(400).json({ error: 'message is required' });

  const ai = getAi();
  if (!ai) {
    return res.status(200).json({
      success: true,
      mode: 'fallback',
      reply: buildFallbackConsultation(message, chartData),
    });
  }

  try {
    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const h of history.slice(-6)) {
        contents.push({ role: h.sender === 'user' ? 'user' : 'model', parts: [{ text: h.content }] });
      }
    }
    const fe = chartData?.fiveElements || {};
    contents.push({
      role: 'user',
      parts: [{
        text: `[사용자 차트 컨텍스트: 성함 ${chartData?.birth?.name || '내담자'}, 일간 ${chartData?.saju?.dayMaster}, 주도오행 ${fe.dominant}, 비어있는 오행 ${(fe.lacking || []).join(', ') || '없음'}, 조화지수 ${fe.balanceScore ?? '-'}점, 현재 대운 ${chartData?.daeunList?.find((d: any) => d.isCurrent)?.pillar || chartData?.daeunList?.[0]?.pillar || '-'}, 올해 세운 ${chartData?.annualLuckList?.[0]?.pillar || '-'}]
사용자 질문: ${message}

[답변 지침] 반드시 [기]/[승]/[전]/[결] 4단 구조로, 공백 포함 600자 이상으로 답변하십시오. 단답형으로 끝내지 말고 위 차트 데이터를 근거로 인용하며 서술하십시오.`,
      }],
    });

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: { systemInstruction: MYEONGGYEOL_SYSTEM_PROMPT },
    });
    return res.status(200).json({ success: true, mode: 'ai_enhanced', reply: response.text });
  } catch (err: any) {
    console.error('Gemini Consultation Error:', err);
    return res.status(200).json({
      success: true,
      mode: 'fallback',
      reply: buildFallbackConsultation(message, chartData),
    });
  }
}
