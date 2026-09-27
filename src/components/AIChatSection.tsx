import React, { useState, useRef, useEffect } from 'react';
import { LifeChartReport, ChatMessage } from '../types/saju';
import { requestAiConsultation } from '../services/geminiService';
import { Sparkles, Send, Bot, User, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';
import { elemKr } from '../utils/korean';

interface AIChatSectionProps {
  report: LifeChartReport;
}

export const AIChatSection: React.FC<AIChatSectionProps> = ({ report }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: `반갑습니다, ${report.birth.name}님. 명결(命結) AI 인생상담실입니다. ${report.birth.name}님의 사주명식(일간: ${report.saju.dayMaster} / 주도오행: ${elemKr(report.fiveElements.dominant)})과 점성술 차트 데이터를 바탕으로 무엇이든 정성껏 상담해 드립니다. 일, 재물, 관계, 진로 등 궁금한 점을 편안하게 물어보세요.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    '내가 사업을 한다면 어떤 점을 조심해야 할까?',
    '나는 어떤 업무 환경에서 가장 능력을 잘 발휘할까?',
    '재물을 모을 때 내 차트에서 주의할 점은?',
    '연애나 인간관계에서 나에게 가장 중요한 요소는?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isSending) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsSending(true);

    try {
      const historyFormatted = messages.map((m) => ({
        sender: m.sender as 'user' | 'assistant',
        content: m.content,
      }));

      const reply = await requestAiConsultation(query, report, historyFormatted);

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>명결 맞춤 AI 1:1 인생상담</span>
        </div>
        <h2 className="font-serif-kr text-2xl sm:text-3xl font-bold text-slate-100">
          내 인생차트에 대해 더 물어보기
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-light">
          {report.birth.name}님의 계산된 사주·오행·대운 좌표를 실시간으로 참조하여 답변합니다.
        </p>
      </div>

      {/* Suggested Questions Quick Buttons */}
      <div className="space-y-1.5">
        <div className="text-[11px] text-slate-400 font-medium px-1">추천 질문:</div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((sq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(sq)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 transition cursor-pointer text-left"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window Box */}
      <div className="rounded-2xl bg-[#0d1124] border border-indigo-900/60 shadow-2xl flex flex-col h-[560px] sm:h-[680px] overflow-hidden">
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => {
            const isUser = m.sender === 'user';

            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-indigo-950 text-amber-300 border border-indigo-800'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[82%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-amber-500 text-slate-950 font-medium shadow-md shadow-amber-500/15'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md font-light'
                  }`}
                >
                  <div className="whitespace-pre-line">{m.content}</div>
                  <div
                    className={`text-[9px] mt-1.5 ${
                      isUser ? 'text-slate-800' : 'text-slate-500'
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isSending && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-950 text-amber-300 border border-indigo-800 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-300 flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <span>{report.birth.name}님의 사주와 대운을 조율하여 사유하는 중입니다...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-[#090c1a] border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="궁금한 내용을 입력하세요 (예: 올해 이직을 준비하기에 적절한 시기인가요?)"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition"
              disabled={isSending}
            />
            <button
              type="submit"
              disabled={isSending || !inputMessage.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition active:scale-95 disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">전송</span>
            </button>
          </form>
          <div className="text-[10px] text-slate-500 mt-2 px-1 flex items-center gap-1.5">
            <AlertCircle className="w-3 h-3 text-slate-400" />
            <span>AI 상담은 전통 명리학적 참고 해석이며, 중요한 법률·의료·금융 결정은 전문가와 상의하시기 바랍니다.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
