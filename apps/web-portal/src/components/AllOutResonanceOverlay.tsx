'use client';

import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CharacterCard } from '@/types/game';
import { Sparkles, Flame, Zap, X, Clock } from 'lucide-react';
import { sound } from '@/utils/soundEffects';

interface AllOutResonanceOverlayProps {
  squad: CharacterCard[];
  onComplete: () => void;
  damageDealt: number;
  durationMs?: number; // Default 3200ms
}

export const AllOutResonanceOverlay: React.FC<AllOutResonanceOverlayProps> = ({
  squad,
  onComplete,
  damageDealt,
  durationMs = 3200
}) => {
  const [timeRemainingMs, setTimeRemainingMs] = useState<number>(durationMs);

  // Guarantee onComplete is called strictly once using ref guard
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const hasFinishedRef = useRef(false);

  const handleFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    sound.playCritImpact();
    onCompleteRef.current();
  };

  useEffect(() => {
    sound.playAllOutResonance();

    try {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#00F0FF', '#FF0055', '#FFB800', '#10FFA0', '#A855F7']
      });
    } catch {}

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, durationMs - elapsed);
      setTimeRemainingMs(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        handleFinish();
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [durationMs]);

  const progressPercent = Math.max(0, Math.min(100, ((durationMs - timeRemainingMs) / durationMs) * 100));

  return (
    <div
      onClick={handleFinish}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-pointer select-none overflow-hidden"
    >
      {/* Top Bar with Timer & Close Button */}
      <div
        onClick={e => e.stopPropagation()}
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-3 md:p-4 bg-gradient-to-b from-black/90 to-transparent"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#10141f] border border-[#ff0055] shadow-[2px_2px_0_#000] text-xs font-mono font-bold text-[#ff0055]">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            <span>CLIP HỢP KÍCH: {(timeRemainingMs / 1000).toFixed(1)}s</span>
          </div>
          <div className="hidden sm:block w-36 md:w-56 h-2.5 bg-black border border-slate-700 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-[#00f0ff] transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={handleFinish}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#ff0055] hover:bg-rose-600 text-white font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <span>BỎ QUA / TẮT (ESC)</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Background Neon Speed Lines */}
      <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500 via-rose-600 to-transparent animate-pulse" />

      {/* Main Title Banner */}
      <div className="relative z-10 text-center space-y-2 mb-6">
        <div className="inline-block bg-[#ff0055] text-white font-black text-xs md:text-sm px-3 py-1 border-2 border-black uppercase tracking-widest shadow-[3px_3px_0_#000]">
          STYLE RANK SSS • TUYỆT KỸ TỐI THƯỢNG
        </div>
        <h1 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter filter drop-shadow-[0_0_20px_#f59e0b]">
          ALL-OUT RESONANCE!
        </h1>
        <p className="text-sm md:text-lg text-[#00f0ff] font-extrabold tracking-wide uppercase">
          ★ BĂNG ANHEM JAEBIN 6 THẺ ĐỒNG LOẠT XUẤT CHIÊU ★
        </p>
      </div>

      {/* 6 Cards Hexagon Formation Animation */}
      <div className="relative z-10 grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-4xl w-full mb-8">
        {squad.map((card, idx) => (
          <div
            key={card.id}
            className="bg-[#121622] border-2 border-black p-2 rounded flex flex-col items-center text-center shadow-[4px_4px_0_#000] transform hover:scale-105 transition-all animate-bounce"
            style={{
              animationDelay: `${idx * 0.1}s`,
              borderColor: card.rank === 'Legendary' ? '#f59e0b' : card.rank === 'Epic' ? '#a855f7' : '#00f0ff'
            }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-800 to-black border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0_#000] mb-1">
              {card.avatarIcon}
            </div>
            <span className="text-[10px] font-black text-white truncate w-full block">
              {card.name}
            </span>
            <span className="text-[9px] font-mono text-[#00f0ff] font-bold">
              {card.role.split('/')[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Massive Hit Damage Splash */}
      <div className="relative z-10 flex flex-col items-center animate-pulse">
        <div className="bg-[#ef4444] text-white font-black text-2xl md:text-4xl px-6 py-2 border-3 border-black shadow-[6px_6px_0_#000] transform -rotate-2">
          CRITICAL: -{damageDealt.toLocaleString()} DMG!
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 mt-6 text-center text-xs font-mono text-slate-400 tracking-wider flex items-center gap-2 bg-black/80 px-4 py-1.5 border border-slate-800">
        <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
        <span>Clip sẽ tự đóng sau {(timeRemainingMs / 1000).toFixed(1)}s • Nhấn <strong>ESC</strong> hoặc <strong>Click bất kỳ</strong> để tắt</span>
      </div>
    </div>
  );
};
