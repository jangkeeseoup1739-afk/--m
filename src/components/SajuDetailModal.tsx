import React from 'react';
import { X, BookOpen, Compass } from 'lucide-react';
import { Pillar } from '../types/saju';
import { elemKr, yinYangKr, josa } from '../utils/korean';

interface SajuDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  pillarName: '년주' | '월주' | '일주' | '시주';
  pillarData?: Pillar;
  cellType: 'gan' | 'ji' | 'tenGod' | 'stage';
  isUnknown?: boolean;
}

export const SajuDetailModal: React.FC<SajuDetailModalProps> = ({
  isOpen,
  onClose,
  pillarName,
  pillarData,
  cellType,
  isUnknown,
}) => {
  if (!isOpen) return null;

  const pillarRoleMap: Record<string, { title: string; lifeStage: string; desc: string }> = {
    년주: {
      title: '근본(뿌리)과 조상·가문·유년기',
      lifeStage: '0세 ~ 19세 유년기 및 성장 환경',
      desc: '자신이 물려받은 유전적 기질, 가문의 분위기, 사회적 첫인상 및 대외적 배경을 상징합니다.',
    },
    월주: {
      title: '사회적 활동과 직업 환경·청년기',
      lifeStage: '20세 ~ 39세 사회 진출기 및 직업 활동',
      desc: '본격적인 사회적 관계망, 직장 및 사업의 기반, 부모 및 형제와의 유대, 격국(사회적 역할)을 나타냅니다.',
    },
    일주: {
      title: '나 자신(본원)과 배우자궁·장년기',
      lifeStage: '40세 ~ 59세 자아 완성 및 인생의 황금기',
      desc: '일간(천간)은 나의 영혼이자 의식의 중심이며, 일지(지지)는 내면의 성향이자 배우자와의 관계를 상징합니다.',
    },
    시주: {
      title: '내면의 무의식과 자녀·노년기·결실',
      lifeStage: '60세 이후 노년기 및 삶의 총체적 결실',
      desc: '말년의 안락함, 자녀 및 후배와의 관계, 은밀한 취미와 창작욕, 인생 후반부의 성취를 관장합니다.',
    },
  };

  const getCellDetail = () => {
    if (isUnknown) {
      return {
        title: `${pillarName} (출생시간 미상)`,
        sub: '세부 시간 정보 없음',
        badge: '보정 처리',
        explanation:
          '출생시간을 정확히 모를 경우 시주(時柱)는 임의 추정하지 않으며, 년주·월주·일주 3주 6자를 중심으로 높은 신뢰도의 분석을 진행합니다.',
      };
    }

    if (!pillarData) return null;

    if (cellType === 'gan') {
      return {
        title: `천간(天干) : ${pillarData.stemHanja} (${pillarData.stemName})`,
        sub: `오행: ${elemKr(pillarData.stemElement)} / 음양: ${yinYangKr(pillarData.stemYinYang)}`,
        badge: '드러난 의식',
        explanation: `${pillarData.stemHanja}(${pillarData.stemName})${josa(pillarData.stemName, '은/는')} 하늘의 기운이자 겉으로 드러나는 명확한 생각과 이상을 의미합니다. ${elemKr(pillarData.stemElement)}의 특성이 ${yinYangKr(pillarData.stemYinYang)}의 방식으로 표출되며, 타인에게 가장 뚜렷하게 관측되는 행동 양식입니다.`,
      };
    }

    if (cellType === 'ji') {
      return {
        title: `지지(地支) : ${pillarData.branchHanja} (${pillarData.branchName})`,
        sub: `오행: ${elemKr(pillarData.branchElement)} / 동물(띠): ${pillarData.branchAnimal}`,
        badge: '현실적 기반',
        explanation: `${pillarData.branchHanja}(${pillarData.branchName}, ${pillarData.branchAnimal})${josa(pillarData.branchAnimal, '은/는')} 땅의 기운이자 현실적인 환경, 내면의 본능과 정서적 기반을 뜻합니다. 겉마음(천간)을 떠받치는 현실 세계의 물질적 조건과 건강, 배우자궁의 터전을 이룹니다.`,
      };
    }

    if (cellType === 'tenGod') {
      return {
        title: `십성(十星) : ${pillarData.stemTenGod}`,
        sub: `일간(본원)과의 역학적 상생상극 관계`,
        badge: '심리 기제 & 사회적 역할',
        explanation: `${pillarData.stemTenGod}은 나(본원)를 기준으로 이 글자가 어떤 심리적 욕구와 사회적 역할(인간관계, 재물, 직업, 명예)을 수행하는지를 명쾌하게 보여줍니다.`,
      };
    }

    if (cellType === 'stage') {
      return {
        title: `십이운성(十二運星) : ${pillarData.stage}`,
        sub: `글자가 머무는 에너지의 생로병사 주기`,
        badge: '에너지 강약',
        explanation: `${pillarData.stage}은 인간의 생로병사 12단계에 빗대어 해당 기둥의 잠재 에너지가 현재 얼마나 활발하게 피어오르고 있거나 안정적으로 수렴하고 있는지를 나타냅니다.`,
      };
    }

    return null;
  };

  const role = pillarRoleMap[pillarName];
  const detail = getCellDetail();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0e1120] border border-amber-500/30 rounded-2xl shadow-2xl p-6 sm:p-7 overflow-hidden text-slate-100">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs text-amber-400 font-semibold">{pillarName} 심층 해석</span>
              <h3 className="font-serif-kr text-lg font-bold text-white">{detail?.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4">
          <div className="flex items-center justify-between text-xs px-3.5 py-2 rounded-lg bg-white/5 border border-white/10">
            <span className="text-slate-300">{detail?.sub}</span>
            <span className="text-amber-300 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              {detail?.badge}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm leading-relaxed text-slate-200">
            {detail?.explanation}
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1 text-xs">
            <div className="font-bold text-amber-200 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{pillarName}{josa(pillarName, '이/가')} 관장하는 삶의 영역 : {role?.title}</span>
            </div>
            <p className="text-slate-300 leading-normal">{role?.desc}</p>
            <p className="text-amber-400/80 text-[11px] pt-1">시기: {role?.lifeStage}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
