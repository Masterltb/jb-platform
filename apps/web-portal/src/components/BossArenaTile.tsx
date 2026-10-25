'use client';

import React from 'react';
import { BossState } from '@/types/game';
import { AlertTriangle, ShieldAlert, Skull, Zap } from 'lucide-react';

interface BossArenaTileProps {
  boss: BossState;
  bossDamageFloat?: number | null;
  isBossAttacking?: boolean;
}

export const BossArenaTile: React.FC<BossArenaTileProps> = ({
  boss,
  bossDamageFloat,
  isBossAttacking
}) => {
  const hpPercent = Math.max(0, Math.min(100, (boss.currentHp / boss.maxHp) * 100));
  const breakPercent = Math.max(0, Math.min(100, (boss.currentBreak / boss.maxBreak) * 100));

  return (
    <div className="relative bg-[#121622] border-2 border-black p-3.5 flex flex-col justify-between shadow-[4px_4px_0_#000000] overflow-hidden rounded-sm min-h-[220px]">
      {/* Neo-brutalist Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="bg-[#ef4444] text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black shadow-[1.5px_1.5px_0_#000]">
            BOSS THẾ GIỚI
          </span>
          <h3 className="font-extrabold text-sm md:text-base text-white tracking-wide uppercase">
            {boss.name} — <span className="text-[#f59e0b]">{boss.title}</span>
          </h3>
        </div>
        <span className="text-[11px] font-mono font-bold text-slate-400">
          Giai Đoạn {boss.phase}/3
        </span>
      </div>

      {/* Main Arena Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center my-1">
        {/* Boss Visual Art & Animations */}
        <div className="md:col-span-4 flex flex-col items-center justify-center">
          <div
            className={`relative w-28 h-28 md:w-32 md:h-32 rounded-sm bg-gradient-to-br ${boss.avatarBg} border-2 border-black flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(239,68,68,0.5),3px_3px_0_#000] transition-all duration-200 ${
              isBossAttacking ? 'scale-110 rotate-2 ring-4 ring-[#ef4444]' : ''
            } ${boss.isStaggered ? 'animate-pulse opacity-80' : ''}`}
          >
            {/* Boss Emoji Avatar */}
            <div className="text-5xl md:text-6xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              🐉
            </div>

            {/* Staggered Status Badge */}
            {boss.isStaggered && (
              <div className="absolute top-1 bg-[#f59e0b] text-black text-[9px] font-black px-1.5 py-0.5 border border-black uppercase tracking-wider animate-bounce">
                CHOÁNG VÁNG! (+50% DMG)
              </div>
            )}

            {/* Damage Popup Float */}
            {bossDamageFloat && (
              <div className="absolute -top-3 right-0 bg-[#ff0055] text-white font-black text-sm md:text-base px-2 py-0.5 border border-black shadow-[2px_2px_0_#000] animate-bounce z-30">
                -{bossDamageFloat.toLocaleString()}!
              </div>
            )}
          </div>
        </div>

        {/* Boss Vitals & Intent */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-2">
          {/* Boss HP Bar */}
          <div>
            <div className="flex justify-between text-xs font-mono font-bold text-slate-300 mb-1">
              <span className="flex items-center gap-1 text-[#ef4444]">
                <Skull className="w-3.5 h-3.5" />
                <span>SINH LỰC BOSS:</span>
              </span>
              <span>
                {boss.currentHp.toLocaleString()} / {boss.maxHp.toLocaleString()} ({hpPercent.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full h-4 bg-[#0a0d14] border-2 border-black overflow-hidden relative shadow-[inset_0_0_6px_#000]">
              <div
                className="h-full bg-gradient-to-r from-red-700 via-rose-600 to-red-500 transition-all duration-300"
                style={{ width: `${hpPercent}%` }}
              />
            </div>
          </div>

          {/* Break Stance Bar */}
          <div>
            <div className="flex justify-between text-[11px] font-mono font-bold text-slate-400 mb-0.5">
              <span className="flex items-center gap-1 text-[#f59e0b]">
                <Zap className="w-3 h-3" />
                <span>GIÁP BREAK (STANCE):</span>
              </span>
              <span>
                {boss.currentBreak} / {boss.maxBreak}
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#0a0d14] border border-black overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 transition-all duration-300"
                style={{ width: `${breakPercent}%` }}
              />
            </div>
          </div>

          {/* Boss Intent Indicator */}
          <div className="bg-[#0a0d14] border-2 border-black p-2 flex items-center justify-between shadow-[2px_2px_0_#000]">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-[#ef4444] text-white border border-black">
                <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
              </span>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wide block">
                  Ý ĐỊNH RA ĐÒN TIẾP THEO:
                </span>
                <span className="text-xs font-extrabold text-[#f1f5f9]">
                  {boss.intent.description}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="bg-[#ff0055] text-white text-[10px] font-mono font-black px-1.5 py-0.5 border border-black">
                SÁT THƯƠNG: ~{boss.intent.value.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
