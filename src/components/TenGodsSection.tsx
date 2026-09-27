import React, { useState } from 'react';
import { TenGodsDistribution } from '../types/saju';
import { Sparkles, Users, Briefcase, DollarSign, Brain, Heart, ChevronRight } from 'lucide-react';

interface TenGodsSectionProps {
  tenGods: TenGodsDistribution;
}

export const TenGodsSection: React.FC<TenGodsSectionProps> = ({ tenGods }) => {
  const [selectedGod, setSelectedGod] = useState<string>('비견');

  const godProfiles: Record<
    string,
    {
      name: string;
      hanja: string;
      category: string;
      key: keyof TenGodsDistribution;
      meaning: string;
      relationship: string;
      career: string;
      wealth: string;
      behavior: string;
    }
  > = {
    비견: {
      name: '비견 (比肩)',
      hanja: '比肩',
      category: '비겁(자립성)',
      key: 'bijian',
      meaning: '나와 어깨를 나란히 하는 벗이자 동료. 주체적인 자립심과 자존감의 원천.',
      relationship: '동등한 신뢰 기반의 친구, 동료 관계를 중시하며 수평적인 소통을 지향합니다.',
      career: '독립적인 전문직, 자율성이 높은 업무 환경, 파트너십 형태의 프로젝트에 적합합니다.',
      wealth: '정당한 노력에 따른 대가를 선호하며, 동료와의 공동 성과를 함께 나누는 구조가 이롭습니다.',
      behavior: '타인의 간섭을 싫어하며 스스로 결정하고 책임지는 단단한 태도를 보입니다.',
    },
    겁재: {
      name: '겁재 (劫財)',
      hanja: '劫財',
      category: '비겁(승부욕)',
      key: 'geopjae',
      meaning: '경쟁을 두려워하지 않는 승부 근성과 강한 결단력, 위기를 기회로 바꾸는 힘.',
      relationship: '승부욕과 리더십이 있으며, 마음을 연 사람에게는 아낌없이 베푸는 의리가 있습니다.',
      career: '경쟁이 치열한 시장, 영업, 스포츠, 벤처 창업 등 과감한 돌파력이 요구되는 분야.',
      wealth: '통 큰 투자나 모험을 즐기기 쉬우므로, 감정적 지출을 통제하는 시스템적 관리가 권장됩니다.',
      behavior: '한번 목표를 정하면 저돌적으로 밀어붙이며 위기 상황에서 탁월한 기지를 발휘합니다.',
    },
    식신: {
      name: '식신 (食神)',
      hanja: '食神',
      category: '식상(창의표현)',
      key: 'siksin',
      meaning: '마르지 않는 샘물처럼 솟아나는 창의력, 풍류와 여유, 표현의 즐거움.',
      relationship: '따스하고 너그러운 성품으로 주위 사람들에게 편안함과 맛있는 음식을 대접하는 온정.',
      career: '연구, 교육, 미식/외식업, 예술 창작, 전문 기술직 등 몰입을 요하는 분야.',
      wealth: '전문 기술이나 남다른 창작물을 통해 꾸준하고 안정적으로 소득을 축적하는 흐름.',
      behavior: '조급해하지 않고 좋아하는 일에 깊이 몰입하며 삶의 질과 행복을 음미합니다.',
    },
    상관: {
      name: '상관 (傷官)',
      hanja: '傷官',
      category: '식상(혁신발휘)',
      key: 'sangwan',
      meaning: '기존의 틀을 깨는 파격적인 아이디어, 날카로운 직관과 탁월한 언변.',
      relationship: '센스와 재치가 넘쳐 대화를 주도하지만, 직설적인 화법으로 오해를 사지 않도록 유의합니다.',
      career: '기획, 마케팅, 방송/미디어, 디자인, 비평 및 컨설팅 등 트렌드를 선도하는 직무.',
      wealth: '탁월한 아이디어와 기민한 트렌드 감각으로 일시에 큰 부가가치를 창출하는 잠재력.',
      behavior: '부조리한 권위에 당당히 맞서며 새로운 대안을 창의적으로 제시합니다.',
    },
    편재: {
      name: '편재 (偏財)',
      hanja: '偏財',
      category: '재성(활동재물)',
      key: 'pyeonjae',
      meaning: '넓은 시야와 거시적인 유통 감각, 유동적인 자본과 네트워크를 다루는 역량.',
      relationship: '마당발처럼 넓은 대인관계를 유지하며, 다양한 사람들과 격의 없이 어울립니다.',
      career: '무역, 유통, 사업 경영, 금융 투자, 글로벌 비즈니스 등 활동 반경이 넓은 분야.',
      wealth: '돈의 흐름을 꿰뚫어 보며 규모감 있는 기회를 포착하는 감각이 탁월합니다.',
      behavior: '과감하게 행동하고 판을 크게 벌리며 융통성 있는 결단을 내립니다.',
    },
    정재: {
      name: '정재 (正財)',
      hanja: '正財',
      category: '재성(안전자산)',
      key: 'jeongjae',
      meaning: '한 푼의 낭비도 없이 철저하게 관리하는 신용, 정확성, 정직한 결실.',
      relationship: '약속과 신뢰를 가장 중요하게 여기며, 가정을 안정적으로 지키는 든든한 태도.',
      career: '회계, 금융, 공공 행정, 체계적인 관리직, 데이터 분석 등 정확성을 요하는 직무.',
      wealth: '티끌 모아 태산을 이루듯, 계획적이고 보수적인 저축과 안전 자산 중심의 축적.',
      behavior: '돌다리도 두드려보고 건너듯 신중하고 성실하며 원칙에 입각해 움직입니다.',
    },
    편관: {
      name: '편관 (偏官)',
      hanja: '偏官',
      category: '관성(카리스마)',
      key: 'pyeongwan',
      meaning: '엄격한 자기 절제, 난관을 돌파하는 강한 책임감과 카리스마.',
      relationship: '의리와 명분을 중시하며, 위기에 처한 사람을 보호하려는 협객의 기질.',
      career: '위기 관리, 법조, 군경, 의료, 특수 엔지니어링, 고도의 책임이 따르는 총책임자.',
      wealth: '명예와 지위가 올라감에 따라 자연스럽게 재물이 따라오는 권력/명예 연계형.',
      behavior: '스스로에게 혹독할 정도로 절제하며 극한의 상황에서도 흔들리지 않는 인내심.',
    },
    정관: {
      name: '정관 (正官)',
      hanja: '正官',
      category: '관성(공공규범)',
      key: 'jeonggwan',
      meaning: '사회의 규범을 준수하고 공정한 질서를 수호하는 신뢰와 품격의 별.',
      relationship: '예의 바르고 공적인 선을 지키며, 누구에게나 존경과 신뢰를 받는 안정된 관계.',
      career: '공직, 대기업 관리직, 제도권 기관, 교육자, 준법 감시 등 정통 시스템.',
      wealth: '안정적인 정기 급여와 공적인 직위를 바탕으로 서서히 사회적 자산을 확장.',
      behavior: '단정하고 품위 있는 언행을 유지하며 규칙과 법도를 철저히 존중합니다.',
    },
    편인: {
      name: '편인 (偏印)',
      hanja: '偏印',
      category: '인성(특수지혜)',
      key: 'pyeonin',
      meaning: '남들이 보지 못하는 이면의 진실을 꿰뚫는 특수 학문과 신비로운 직관력.',
      relationship: '소수의 깊은 교감을 선호하며, 지적인 수준이 통하는 사람과 진솔한 대화를 나눕니다.',
      career: '철학, IT 개발, 심리학, 특수 기술, 인문학 연구, 예술, 비선 전략가.',
      wealth: '자신만의 독보적인 지적 재산권이나 특수 면허, 노하우를 통한 라이선스형 소득.',
      behavior: '사색과 고독을 즐기며 사물의 근원과 인간 내면의 심리를 깊이 탐구합니다.',
    },
    정인: {
      name: '정인 (正印)',
      hanja: '正印',
      category: '인성(도덕지성)',
      key: 'jeongin',
      meaning: '어머니의 무조건적인 사랑과 같은 온정, 정통 학문과 도덕적 품성.',
      relationship: '많은 사람들의 존경을 받으며 덕을 베풀고 타인의 아픔을 품어주는 자비심.',
      career: '교수, 학자, 문화 예술 진흥, 복지, 상담가, 정통 학술 연구.',
      wealth: '문서운과 지적 자산이 탄탄하여 부동산이나 공인된 자격을 통한 안정적 소득.',
      behavior: '온화하고 자상하며 언제나 배움을 멈추지 않는 겸허한 학구열을 유지합니다.',
    },
  };

  const current = godProfiles[selectedGod] || godProfiles['비견'];

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-[#0d1124] border border-indigo-900/60 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-indigo-950">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>심리 동기와 행동 기제</span>
          </div>
          <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-slate-100">
            십성(十星 / 육친) 다면 심층 분석
          </h3>
        </div>
        <p className="text-xs text-slate-400 font-light">
          원하는 십성을 선택하면 세부 행동 양식과 영역별 특징을 확인할 수 있습니다.
        </p>
      </div>

      {/* Ten Gods 10-button Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {Object.keys(godProfiles).map((godName) => {
          const profile = godProfiles[godName];
          const count = tenGods[profile.key];
          const isSelected = selectedGod === godName;

          return (
            <button
              key={godName}
              onClick={() => setSelectedGod(godName)}
              className={`p-2.5 rounded-xl text-left transition border relative ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] text-slate-400 truncate">{profile.category}</div>
              <div className="font-serif-kr text-xs font-bold text-slate-100">{profile.name}</div>
              <div className="text-[10px] text-amber-400/90 mt-1 font-semibold">
                차트 보유: {count}개
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Showcase Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0d122b] to-slate-900 border border-indigo-900/80 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-indigo-950 pb-4">
          <div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
              {current.category}
            </span>
            <h4 className="font-serif-kr text-xl font-bold text-slate-100 mt-1">
              {current.name}
            </h4>
          </div>
          <div className="text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            내 사주 내 분포: <strong className="text-amber-400 font-bold">{tenGods[current.key]}개</strong>
          </div>
        </div>

        <p className="text-sm text-amber-200/90 font-serif-kr italic">
          "{current.meaning}"
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>인간관계 및 소통 스타일</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">{current.relationship}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>직무 및 업무 적성</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">{current.career}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <span>재물 운용 및 자산 관리 성향</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">{current.wealth}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <Brain className="w-3.5 h-3.5 text-purple-400" />
              <span>특유의 행동 패턴 및 마음가짐</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">{current.behavior}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
