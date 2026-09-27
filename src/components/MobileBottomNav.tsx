import React from 'react';
import { Home, Compass, UserCheck, Heart, MessageSquare, Sparkles } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasChart: boolean;
  onOpenBirthForm: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  hasChart,
  onOpenBirthForm,
}) => {
  const items = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'life-chart', label: '내 차트', icon: Compass, requiresChart: true },
    { id: 'free-saju', label: '무료사주', icon: Sparkles },
    { id: 'compatibility', label: '궁합', icon: Heart },
    { id: 'ai-consult', label: 'AI상담', icon: MessageSquare, requiresChart: true },
  ];

  const handleClick = (id: string, requiresChart?: boolean) => {
    if (requiresChart && !hasChart) {
      onOpenBirthForm();
    } else {
      setActiveTab(id);
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0a2a]/90 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 shadow-[0_-4px_24px_rgba(13,10,42,0.55)]">
      <div className="grid grid-cols-5 gap-1 text-center">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id, item.requiresChart)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition ${
                isActive ? 'text-amber-400 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400 scale-110' : 'text-slate-300'} transition`} />
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
