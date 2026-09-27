import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { MYEONGGYEOL_SYSTEM_PROMPT } from './src/services/aiPrompts.ts';
import {
  buildFallbackInterpretation,
  buildFallbackConsultation,
} from './src/services/fallbackNarrative.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI SDK if key exists
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    ai = new GoogleGenAI({ apiKey });
  }

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: !!ai,
      timestamp: new Date().toISOString(),
    });
  });

  // Comprehensive AI Analysis endpoint
  app.post('/api/analyze', async (req, res) => {
    try {
      const { chartData } = req.body;
      if (!chartData) {
        return res.status(400).json({ error: 'chartData is required' });
      }

      if (!ai) {
        // API 키 미설정 시: 계산된 차트 값만으로 기승전결 장문 해석을 생성해 반환한다.
        // aiInterpretation 필드를 반드시 채워야 프런트의 해석 카드가 정상 노출된다.
        return res.json({
          success: true,
          mode: 'fallback',
          message: 'API 키가 설정되지 않아 사전 계산된 명결 정밀 해석 엔진으로 분석을 제공합니다.',
          aiInterpretation: buildFallbackInterpretation(chartData),
        });
      }

      const prompt = `
[사용자 차트 데이터]:
이름: ${chartData.birth?.name || '사용자'}
일간(나 자신): ${chartData.saju?.dayMaster} (${chartData.saju?.day?.stemName})
사주 구성:
- 년주: ${chartData.saju?.year?.stemHanja}${chartData.saju?.year?.branchHanja} (${chartData.saju?.year?.stemTenGod} / ${chartData.saju?.year?.branchTenGod})
- 월주: ${chartData.saju?.month?.stemHanja}${chartData.saju?.month?.branchHanja} (${chartData.saju?.month?.stemTenGod} / ${chartData.saju?.month?.branchTenGod})
- 일주: ${chartData.saju?.day?.stemHanja}${chartData.saju?.day?.branchHanja} (일원 / ${chartData.saju?.day?.branchTenGod})
- 시주: ${chartData.saju?.hour ? `${chartData.saju?.hour?.stemHanja}${chartData.saju?.hour?.branchHanja}` : '출생시간 미상'}
오행 분포(여덟 글자 중 글자 수 / 총 ${chartData.fiveElements?.total ?? 8}자): 목 ${chartData.fiveElements?.wood}자, 화 ${chartData.fiveElements?.fire}자, 토 ${chartData.fiveElements?.earth}자, 금 ${chartData.fiveElements?.metal}자, 수 ${chartData.fiveElements?.water}자
주도 오행: ${chartData.fiveElements?.dominant} / 비어 있는 오행: ${(chartData.fiveElements?.lacking || []).join(', ') || '없음'} / 조화 지수: ${chartData.fiveElements?.balanceScore ?? '-'}점
서양 별자리: 태양 ${chartData.westernAstrology?.sunSign}, 달 ${chartData.westernAstrology?.moonSign}, 상승궁 ${chartData.westernAstrology?.ascendant}
태국 점성술: ${chartData.thaiAstrology?.dayOfBirthThai} 출생, 수호행성 ${chartData.thaiAstrology?.guardianPlanet}

위 데이터를 바탕으로 10대 분석 원칙과 기승전결 4단 표준 포맷을 준수하여 종합 해석을 작성하십시오.

- [기 · 타고난 구조]: 일간과 여덟 글자 구성, 주도 오행을 근거로 한 본질적 기질
- [승 · 실제 삶에서의 발현]: 월주와 십성, 현재 대운과 세운의 흐름이 재물·커리어·인간관계에서 작동하는 방식
- [전 · 짚고 넘어갈 지점]: 같은 기운이 과열될 때의 그림자와 비어 있는 오행이 뜻하는 보완 지점
- [결 · 오늘부터의 실천]: 방향·색상·습관·주기처럼 바로 적용 가능한 제언 2~3가지와 선택권 존중 마무리

반드시 공백 포함 1,200자 이상으로, 단답형 없이 각 단락을 충실히 채워 작성하십시오.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: MYEONGGYEOL_SYSTEM_PROMPT,
        },
      });

      return res.json({
        success: true,
        mode: 'ai_enhanced',
        aiInterpretation: response.text,
      });
    } catch (err: any) {
      console.error('Gemini Analysis Error:', err);
      return res.json({
        success: true,
        mode: 'fallback',
        error: err.message,
        aiInterpretation: buildFallbackInterpretation(req.body?.chartData),
      });
    }
  });

  // Interactive AI Consultation endpoint
  app.post('/api/consult', async (req, res) => {
    try {
      const { message, chartData, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'message is required' });
      }

      if (!ai) {
        // API 키 미설정 시: 차트 값 기반 기승전결 장문 상담 답변을 생성해 반환한다.
        return res.json({
          success: true,
          mode: 'fallback',
          reply: buildFallbackConsultation(message, chartData),
        });
      }

      const chatContents: any[] = [];
      if (Array.isArray(history)) {
        for (const h of history.slice(-6)) {
          chatContents.push({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.content }],
          });
        }
      }
      chatContents.push({
        role: 'user',
        parts: [
          {
            text: `[사용자 차트 컨텍스트: 성함 ${chartData?.birth?.name || '내담자'}, 일간 ${chartData?.saju?.dayMaster}, 주도오행 ${chartData?.fiveElements?.dominant}, 비어있는 오행 ${(chartData?.fiveElements?.lacking || []).join(', ') || '없음'}, 조화지수 ${chartData?.fiveElements?.balanceScore ?? '-'}점, 현재 대운 ${chartData?.daeunList?.find((d: any) => d.isCurrent)?.pillar || chartData?.daeunList?.[0]?.pillar || '-'}, 올해 세운 ${chartData?.annualLuckList?.[0]?.pillar || '-'}]\n사용자 질문: ${message}\n\n[답변 지침] 반드시 [기]/[승]/[전]/[결] 4단 구조로, 공백 포함 600자 이상으로 답변하십시오. 단답형으로 끝내지 말고 위 차트 데이터를 근거로 인용하며 서술하십시오.`,
          },
        ],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: chatContents,
        config: {
          systemInstruction: MYEONGGYEOL_SYSTEM_PROMPT,
        },
      });

      return res.json({
        success: true,
        reply: response.text,
      });
    } catch (err: any) {
      console.error('Gemini Consultation Error:', err);
      return res.json({
        success: true,
        mode: 'fallback',
        reply: buildFallbackConsultation(req.body?.message || '', req.body?.chartData),
      });
    }
  });

  // Serve static files or Vite dev server
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[명결] Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
