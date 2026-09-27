import React, { useState } from 'react';
import { Sparkles, Compass, UserCheck, BookOpen, MessageSquare, Heart, Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasChart: boolean;
  onOpenBirthForm: () => void;
  onSelectStep?: (step: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  hasChart,
  onOpenBirthForm,
  onSelectStep,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact navigation matching original screenshot
  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'life-chart', label: '사주팔자', requiresChart: true },
    { id: 'wealth', label: '재물운', requiresChart: true, targetStep: '07' },
    { id: 'career', label: '사업운', requiresChart: true, targetStep: '08' },
    { id: 'compatibility', label: '궁합' },
    { id: 'daeun-annual', label: '대운·세운', requiresChart: true, targetStep: '10' },
    { id: 'ai-consult', label: 'AI상담', requiresChart: true },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.requiresChart && !hasChart) {
      onOpenBirthForm();
    } else if (item.targetStep && onSelectStep) {
      onSelectStep(item.targetStep);
    } else if (item.id === 'wealth' || item.id === 'career' || item.id === 'daeun-annual') {
      setActiveTab('comprehensive');
    } else {
      setActiveTab(item.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0d0a2a]/92 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity from Original Site */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-stone-900 border border-amber-500/30 flex items-center justify-center shadow-lg group-hover:border-amber-400/60 transition">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif-kr text-xl sm:text-2xl font-bold tracking-tight text-white">
                  명결
                </span>
                <span className="font-serif-kr text-xs text-amber-400 font-semibold">
                  命結
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-light hidden sm:block tracking-tight">
                당신의 운명을 이어주는 특별한 순간
              </p>
            </div>
          </div>

          {/* Desktop Navigation matching original site */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive =
                activeTab === item.id ||
                (activeTab === 'comprehensive' && (item.id === 'wealth' || item.id === 'career' || item.id === 'daeun-annual'));

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-stone-800/80 text-white font-semibold border border-white/10 shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Status Badge & Saju Input CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-800 text-xs text-stone-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>정통 만세력 가동</span>
            </div>

            <button
              onClick={onOpenBirthForm}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>사주팔자 입력</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-900 text-stone-300 hover:text-white border border-stone-800"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0d0a2a]/85 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1">
          <div className="mb-3 px-2 py-2 rounded-lg bg-white/[0.07] border border-white/10 text-xs text-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>정통 만세력 & AI 도사 상시 대기</span>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-stone-200 hover:bg-stone-800/60 transition flex items-center justify-between"
            >
              <span>{item.label}</span>
              {item.requiresChart && !hasChart && (
                <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                  생성필요
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-800">
            <button
              onClick={() => {
                onOpenBirthForm();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm text-center"
            >
              내 사주 바로 보기
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
