// Client Service for AI Analysis & Consultation
import { LifeChartReport } from '../types/saju';
import { buildFallbackInterpretation, buildFallbackConsultation } from './fallbackNarrative';

export async function requestAiAnalysis(chartData: LifeChartReport): Promise<{
  success: boolean;
  aiInterpretation?: string;
  mode: string;
}> {
  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chartData }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    // 서버가 폴백 모드로 aiInterpretation 없이 200을 반환하는 경우에도
    // 해석 카드가 빈 채로 사라지지 않도록 클라이언트에서 기승전결 해석을 채운다.
    if (!data?.aiInterpretation) {
      return {
        ...data,
        success: true,
        mode: data?.mode || 'fallback',
        aiInterpretation: buildFallbackInterpretation(chartData),
      };
    }
    return data;
  } catch (err) {
    console.warn('AI analysis request failed or running in preview client mode:', err);
    return {
      success: true,
      mode: 'fallback',
      aiInterpretation: buildFallbackInterpretation(chartData),
    };
  }
}

export async function requestAiConsultation(
  message: string,
  chartData: LifeChartReport,
  history: { sender: 'user' | 'assistant'; content: string }[]
): Promise<string> {
  try {
    const res = await fetch('/api/consult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, chartData, history }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.reply || buildFallbackConsultation(message, chartData);
  } catch (err) {
    console.warn('AI consultation request failed:', err);
    // 서버에 닿지 못하는 정적 미리보기 환경에서도 차트 기반 기승전결 답변을 제공한다.
    return buildFallbackConsultation(message, chartData);
  }
}
