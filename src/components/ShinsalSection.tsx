import React from 'react';
import { SajuPillars } from '../types/saju';
import { Sparkles, Star, Shield, Flame, Compass, Heart } from 'lucide-react';

interface ShinsalSectionProps {
  saju: SajuPillars;
}

export const ShinsalSection: React.FC<ShinsalSectionProps> = ({ saju }) => {
  // Collect all unique shinsal from all available pillars
  const allUserShinsal = [
    ...(saju.year.shinsal || []),
    ...(saju.month.shinsal || []),
    ...(saju.day.shinsal || []),
    ...(saju.hour?.shinsal || []),
  ].filter((v, i, a) => a.indexOf(v) === i);

  const shinsalKnowledge: Record<
    string,
    { title: string; category: string; icon: any; modernRole: string; advice: string }
  > = {
    천을귀인: {
      title: '천을귀인 (天乙貴人)',
      category: '최고의 조력 길신',
      icon: Star,
      modernRole: '위기 속에서 예상치 못한 지혜로운 조력자를 만나 실마리를 풀고 명예를 지키는 강력한 수호 에너지.',
      advice: '겸손한 태도로 주위 사람들에게 신뢰를 쌓아둘수록 필요할 때 든든한 귀인의 도움이 자연스럽게 연결됩니다.',
    },
    문창귀인: {
      title: '문창귀인 (文昌貴人)',
      category: '학문과 총명 길신',
      icon: Compass,
      modernRole: '문장력, 논리적 기획력, 지적 통찰이 뛰어나 글과 콘텐츠, 학술과 연구 분야에서 두각을 나타내는 기운.',
      advice: '아이디어를 머릿속에만 두지 말고 글이나 문서, 체계적인 기획서로 시각화할 때 가치가 극대화됩니다.',
    },
    도화살: {
      title: '도화살 (桃花殺)',
      category: '대중적 매력과 공감',
      icon: Heart,
      modernRole: '현대에는 사람을 끌어당기는 천부적인 호감과 스타성, 방송/미디어/영업/예술 분야의 차별화된 매력.',
      advice: '사람들의 시선과 인기를 자신의 전문적 역량과 결합하여 건강한 퍼스널 브랜딩으로 승화시키세요.',
    },
    역마살: {
      title: '역마살 (驛馬殺)',
      category: '기동력과 글로벌 활동',
      icon: Flame,
      modernRole: '한곳에 정체되지 않고 새로운 영역을 개척하는 기동력, 글로벌 비즈니스, 출장과 이주, 기민한 실행력.',
      advice: '물리적 이동뿐만 아니라 새로운 지식이나 트렌드를 빠르게 흡수하는 지적 역마로 활용하면 성공 확률이 높아집니다.',
    },
    화개살: {
      title: '화개살 (華蓋殺)',
      category: '인문학적 통찰과 예술성',
      icon: Shield,
      modernRole: '고독 속에서 피어나는 깊은 예술성, 철학과 영성, 전문 분야를 집요하게 파고들어 마스터하는 집중력.',
      advice: '혼자만의 시간을 외로움이 아닌 내면의 깊이를 심화하는 창작과 사색의 충전기로 삼으세요.',
    },
    '록신(건록)': {
      title: '건록 (建祿)',
      category: '자립과 정당한 결실',
      icon: Star,
      modernRole: '남에게 의지하지 않고 자신의 실력과 땀으로 기반을 닦아 탄탄한 벼슬과 자립을 완성하는 길신.',
      advice: '정직하고 원칙적인 노력을 지속할 때 흔들리지 않는 장기적인 사회적 지위와 재물이 보장됩니다.',
    },
  };

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-[#0d1124] border border-indigo-900/60 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-indigo-950">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>두려움이 아닌 개성과 잠재력의 렌즈</span>
          </div>
          <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-slate-100">
            신살(神殺)과 귀인(貴人) 현대적 해석
          </h3>
        </div>
        <div className="text-xs text-amber-300/90 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
          내 차트의 특별한 별: <strong className="font-bold">{allUserShinsal.length}개</strong> 감지
        </div>
      </div>

      {allUserShinsal.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allUserShinsal.map((starName, idx) => {
            const star = shinsalKnowledge[starName] || {
              title: starName,
              category: '전통 명리 요소',
              icon: Star,
              modernRole: '전통 명리학에서 삶의 고유한 개성과 성향의 촉매제로 해석하는 요소입니다.',
              advice: '자신의 개성을 조화롭게 발휘할 수 있는 환경을 선택하고 관계에서의 배려를 지켜나가세요.',
            };
            const Icon = star.icon;

            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif-kr text-sm font-bold text-slate-100">{star.title}</h4>
                      <span className="text-[10px] text-amber-400/90">{star.category}</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    차트 활성화
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="text-slate-300 leading-relaxed font-light">
                    <strong className="text-slate-100 font-medium">현대적 의미:</strong> {star.modernRole}
                  </div>
                  <div className="text-slate-400 leading-relaxed font-light pt-1 border-t border-slate-800">
                    <strong className="text-amber-300 font-medium">명결의 조언:</strong> {star.advice}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 text-center space-y-2">
          <p className="text-sm text-slate-300">
            특정 살의 굴곡 없이 온화하고 조화로운 평온의 기운이 흐르고 있습니다.
          </p>
          <p className="text-xs text-slate-400">
            극단적인 환경 변화에 흔들리지 않고 일상의 꾸준함으로 성과를 쌓아가는 안정된 구조입니다.
          </p>
        </div>
      )}

      {/* Modern Perspective Note */}
      <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-xs text-indigo-300 leading-relaxed">
        <strong>명결의 신살 해석 원칙:</strong> 과거의 폐쇄적 농경 사회에서는 '변화'나 '인기'를 위험한 살(殺)로 경계했으나, 다원화된 현대 사회에서 도화·역마·화개 등은 글로벌 영향력과 창의적 전문성을 견인하는 최고의 자산으로 평가받습니다.
      </div>
    </div>
  );
};
