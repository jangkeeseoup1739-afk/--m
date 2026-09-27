/**
 * 한국어 표기 유틸
 * 계산 엔진 내부 값(영문 ElementType 등)을 사용자 화면에 노출할 때 쓰는 변환·조사 처리.
 */
import { ElementType, YinYang } from '../types/saju';

/** 오행 한글 표기 */
export const ELEMENT_KR: Record<string, string> = {
  wood: '목(木)', fire: '화(火)', earth: '토(土)', metal: '금(金)', water: '수(水)',
};

/** 음양 한글 표기 */
export const YINYANG_KR: Record<string, string> = {
  yang: '양(陽)', yin: '음(陰)',
};

export const elemKr = (e?: ElementType | string) => ELEMENT_KR[String(e)] ?? String(e ?? '');
export const yinYangKr = (y?: YinYang | string) => YINYANG_KR[String(y)] ?? String(y ?? '');

/**
 * 받침 유무에 따라 한글 조사를 고른다.
 * 괄호·한자·공백은 무시하고 마지막 '한글' 음절로 판정하므로
 * "토(土)", "壬(임)" 같은 표기에도 올바르게 동작한다.
 */
export function josa(
  word: string,
  pair: '이/가' | '은/는' | '을/를' | '과/와' | '으로/로' | '이다/다'
): string {
  const korean = (word || '').replace(/[^가-힣]/g, '');
  const code = korean.charCodeAt(korean.length - 1);
  const hasBatchim =
    !Number.isNaN(code) && code >= 0xac00 && code <= 0xd7a3 ? (code - 0xac00) % 28 !== 0 : false;
  const [withBatchim, withoutBatchim] = pair.split('/');
  return hasBatchim ? withBatchim : withoutBatchim;
}

/** 단어 + 조사를 붙여 반환 */
export const withJosa = (
  word: string,
  pair: '이/가' | '은/는' | '을/를' | '과/와' | '으로/로' | '이다/다'
) => `${word}${josa(word, pair)}`;
