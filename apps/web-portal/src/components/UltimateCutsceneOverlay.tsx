'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Zap, Sparkles, Flame, Swords, X, Play, Clock, Volume2 } from 'lucide-react';
import { sound } from '@/utils/soundEffects';

export interface UltimateCutsceneOverlayProps {
  casterName: string;
  skillName: string;
  skillType: 'hero' | 'boss';
  avatarImage?: string;
  avatarEmoji?: string;
  quote?: string;
  damageValue?: number;
  durationMs?: number; // Default 3200ms for short clip
  videoUrl?: string; // Optional short clip video
  onComplete: () => void;
}

export const UltimateCutsceneOverlay: React.FC<UltimateCutsceneOverlayProps> = ({
  casterName,
  skillName,
  skillType,
  avatarImage,
  avatarEmoji = '🐉',
  quote,
  damageValue = 48000,
  durationMs = 3200,
  videoUrl,
  onComplete
}) => {
  const [phase, setPhase] = useState<'slash' | 'action' | 'impact'>('slash');
  const [timeRemainingMs, setTimeRemainingMs] = useState<number>(durationMs);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  // Safe Timer & Progress bar
  useEffect(() => {
    sound.playAllOutResonance();

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, durationMs - elapsed);
      setTimeRemainingMs(remaining);

      if (elapsed >= 400 && elapsed < 2400) {
        setPhase('action');
      } else if (elapsed >= 2400) {
        setPhase('impact');
      }

      if (remaining <= 0) {
        clearInterval(interval);
        handleFinish();
      }
    }, 50);

    // ESC key listener to skip/close immediately
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

  // Anime speed lines on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isHero = skillType === 'hero';
    const lines: Array<{ angle: number; length: number; speed: number; color: string; width: number }> = [];
    for (let i = 0; i < 45; i++) {
      lines.push({
        angle: Math.random() * Math.PI * 2,
        length: Math.random() * 300 + 150,
        speed: Math.random() * 15 + 10,
        color: isHero
          ? Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.45)' : 'rgba(255, 0, 85, 0.45)'
          : Math.random() > 0.5 ? 'rgba(239, 68, 68, 0.55)' : 'rgba(245, 158, 11, 0.5)',
        width: Math.random() * 3 + 1
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;

      for (const line of lines) {
        line.length += line.speed;
        if (line.length > Math.max(width, height)) {
          line.length = Math.random() * 100;
        }

        const startDist = line.length * 0.4;
        const x1 = centerX + Math.cos(line.angle) * startDist;
        const y1 = centerY + Math.sin(line.angle) * startDist;
        const x2 = centerX + Math.cos(line.angle) * line.length;
        const y2 = centerY + Math.sin(line.angle) * line.length;

        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [skillType]);

  const isHero = skillType === 'hero';
  const progressPercent = Math.max(0, Math.min(100, ((durationMs - timeRemainingMs) / durationMs) * 100));

  return (
    <div
      onClick={handleFinish}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 select-none overflow-hidden cursor-pointer"
    >
      {/* Anime Speedlines Dynamic Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Top Bar: Progress Timer & Close Button */}
      <div
        onClick={e => e.stopPropagation()}
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-3 md:p-4 bg-gradient-to-b from-black/90 to-transparent"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#10141f] border border-[#00f0ff] shadow-[2px_2px_0_#000] text-xs font-mono font-bold text-[#00f0ff]">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            <span>CLIP: {(timeRemainingMs / 1000).toFixed(1)}s</span>
          </div>
          <div className="hidden sm:block w-36 md:w-56 h-2.5 bg-black border border-slate-700 overflow-hidden">
            <div
              className={`h-full transition-all duration-75 ${
                isHero ? 'bg-gradient-to-r from-[#00f0ff] to-[#ff0055]' : 'bg-gradient-to-r from-amber-500 to-rose-600'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Skip / Close Button */}
        <button
          onClick={handleFinish}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#ff0055] hover:bg-rose-600 text-white font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <span>BỎ QUA / TẮT (ESC)</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Center Cinematic Container */}
      <div
        onClick={e => e.stopPropagation()}
        className={`relative z-10 w-full max-w-4xl mx-4 border-y-4 ${
          isHero ? 'border-[#00f0ff] bg-[#0c101d]/95 shadow-[0_0_60px_#00f0ff44]' : 'border-red-600 bg-[#180a0a]/95 shadow-[0_0_60px_#ef444455]'
        } p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 transform ${
          phase === 'slash' ? 'scale-95 opacity-90' : phase === 'action' ? 'scale-100 opacity-100' : 'scale-105 opacity-100'
        }`}
      >
        {/* Short Clip Video element (if provided) or Anime Visualizer */}
        {videoUrl ? (
          <div className="absolute inset-0 z-0 opacity-40 overflow-hidden">
            <video
              src={videoUrl}
              autoPlay
              muted
              playsInline
              onEnded={handleFinish}
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}

        {/* Diagonal Slash FX */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div
            className={`w-[200%] h-3 bg-gradient-to-r ${
              isHero ? 'from-[#00f0ff] via-white to-[#ff0055]' : 'from-red-600 via-amber-300 to-red-600'
            } rotate-[-20deg] shadow-[0_0_35px_#fff] transition-all duration-300 ${
              phase === 'slash' ? 'scale-x-150 opacity-100' : 'scale-x-100 opacity-30'
            }`}
          />
        </div>

        {/* Left Side: Cinematic Details & Skill Name */}
        <div className="space-y-3 z-10 max-w-lg text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span
              className={`text-[11px] font-black uppercase px-2.5 py-0.5 border border-black shadow-[2px_2px_0_#000] tracking-widest ${
                isHero ? 'bg-[#ff0055] text-white' : 'bg-red-600 text-black'
              }`}
            >
              {isHero ? '★ TUYỆT KỸ BÀI TRÙNG 6★ ★' : '☠ CUỒNG NỘ TRÙM MA THÚ ☠'}
            </span>
            <span className="text-amber-300 font-mono text-xs font-black flex items-center gap-1 bg-black/60 px-2 py-0.5 border border-amber-500">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              OVERDRIVE ULTIMATE
            </span>
          </div>

          <h2
            className={`text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] ${
              isHero
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f0ff] to-[#ff0055]'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-rose-600'
            }`}
          >
            {skillName}
          </h2>

          <div className="flex items-center justify-center md:justify-start gap-2 text-sm md:text-base font-extrabold text-white">
            <span className="text-slate-400">Thi triển bởi:</span>
            <span className={`px-2 py-0.5 border border-black ${isHero ? 'bg-[#00f0ff] text-black' : 'bg-rose-950 text-white'}`}>
              {casterName}
            </span>
          </div>

          {quote && (
            <p className="text-xs md:text-sm italic text-amber-200 bg-black/70 p-2.5 border-l-4 border-amber-400 shadow-[2px_2px_0_#000]">
              "{quote}"
            </p>
          )}

          {/* Sát thương uy lực cực đại */}
          <div className="pt-1 flex items-center justify-center md:justify-start gap-3">
            <div className="bg-red-600 text-white font-black text-sm md:text-lg px-3 py-1 border-2 border-black shadow-[3px_3px_0_#000] animate-pulse">
              UY LỰC: -{damageValue.toLocaleString()} DMG
            </div>
            <span className="text-[11px] font-mono text-[#10ffa0] font-bold">
              PHÁ KHIÊN & CRIT 100%
            </span>
          </div>
        </div>

        {/* Right Side: Zoomed-in Character/Boss Hero Art */}
        <div className="relative w-44 h-44 md:w-60 md:h-60 shrink-0 flex items-center justify-center z-10">
          <div
            className={`w-full h-full rounded-full border-4 ${
              isHero ? 'border-[#00f0ff] shadow-[0_0_40px_#00f0ff]' : 'border-rose-500 shadow-[0_0_40px_#ef4444]'
            } bg-gradient-to-b from-slate-900 to-black overflow-hidden relative flex items-center justify-center`}
          >
            {avatarImage ? (
              <img
                src={avatarImage}
                alt={casterName}
                className="w-full h-full object-cover object-center scale-125 transition-transform duration-500 hover:scale-135"
                onError={e => {
                  // Fallback emoji if image fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : null}
            <div className="absolute inset-0 flex items-center justify-center text-7xl select-none pointer-events-none">
              {!avatarImage && avatarEmoji}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 mt-6 text-center text-xs font-mono text-slate-400 tracking-wider flex items-center gap-2 bg-black/80 px-4 py-1.5 border border-slate-800">
        <span className="w-2 h-2 rounded-full bg-[#10ffa0] animate-ping" />
        <span>Clip sẽ tự đóng sau {(timeRemainingMs / 1000).toFixed(1)}s • Nhấn <strong>ESC</strong> hoặc <strong>Click bất kỳ</strong> để tắt ngay lập tức</span>
      </div>
    </div>
  );
};
