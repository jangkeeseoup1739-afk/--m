/**
 * Vercel Serverless Function 공통 유틸
 * 로컬 개발은 server.ts(express)가, 배포 환경은 이 파일을 쓰는 api/* 함수가 담당한다.
 * 프롬프트와 폴백 내러티브는 src/services 의 단일 소스를 그대로 재사용한다.
 */
import { GoogleGenAI } from '@google/genai';

export const GEMINI_MODEL = 'gemini-3.8-flash';

let cached: GoogleGenAI | null | undefined;

/** API 키가 설정된 경우에만 클라이언트를 반환한다. 미설정이면 null. */
export function getAi(): GoogleGenAI | null {
  if (cached !== undefined) return cached;
  const apiKey = process.env.GEMINI_API_KEY;
  cached = apiKey && apiKey !== 'MY_GEMINI_API_KEY' ? new GoogleGenAI({ apiKey }) : null;
  return cached;
}

/** POST 외 메서드 차단 + JSON 바디 파싱 */
export function readBody(req: any): any {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return req.body;
}
