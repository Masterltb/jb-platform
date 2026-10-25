'use client';

import React from 'react';
import { StyleRank } from '@/types/game';
import { Flame, Sparkles, Zap, Award } from 'lucide-react';
import { sound } from '@/utils/soundEffects';

interface StyleMeterTileProps {
  stylePoints: number;
  styleRank: StyleRank;
  comboStreak: number;
  onTriggerAllOut: () => void;
  canTriggerAllOut: boolean;
}

export const StyleMeterTile: React.FC<StyleMeterTileProps> = ({
  stylePoints,
  styleRank,
  comboStreak,
  onTriggerAllOut,
  canTriggerAllOut
}) => {
  const getRankInfo = (rank: StyleRank) => {
    switch (rank) {
      case 'SSS':
        return {
          title: 'ĂN CHƠI ĐIỆU NGHỆ',
          buff: '+60% SÁT THƯƠNG + HỒI 2 ENERGY',
          color: '#ff0055',
          textColor: 'text-[#ff0055]',
          bgGradient: 'from-amber-500 via-rose-600 to-pink-600'
        };
      case 'S':
        return {
          title: 'BÁ CHÁY',
          buff: '+40% SÁT THƯƠNG',
          color: '#f59e0b',
          textColor: 'text-[#f59e0b]',
          bgGradient: 'from-yellow-500 to-amber-600'
        };
      case 'A':
        return {
          title: 'KHÉT LẸT',
          buff: '+25% SÁT THƯƠNG',
          color: '#a855f7',
          textColor: 'text-[#a855f7]',
          bgGradient: 'from-purple-500 to-indigo-600'
        };
      case 'B':
        return {
          title: 'DÂN CHƠI',
          buff: '+15% SÁT THƯƠNG',
          color: '#00f0ff',
          textColor: 'text-[#00f0ff]',
          bgGradient: 'from-cyan-500 to-blue-600'
        };
      case 'C':
        return {
          title: 'CÓ NÉT',
          buff: '+8% SÁT THƯƠNG',
          color: '#10ffa0',
          textColor: 'text-[#10ffa0]',
          bgGradient: 'from-emerald-500 to-green-600'
        };
      default:
        return {
          title: 'TẬP SỰ',
          buff: '+0% SÁT THƯƠNG',
          color: '#94a3b8',
          textColor: 'text-slate-400',
          bgGradient: 'from-slate-600 to-slate-800'
        };
    }
  };

  const rankInfo = getRankInfo(styleRank);
  const meterPercent = Math.min(100, Math.max(0, (stylePoints / 1000) * 100));

  return (
    <div className="bg-[#121622] border-2 border-black p-3.5 flex flex-col justify-between shadow-[4px_4px_0_#000000] rounded-sm min-h-[220px]">
      {/* Tile Header */}
      <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase text-white tracking-wider">
          <Flame className="w-4 h-4 text-[#ff0055]" />
          <span>THANH STYLE PHONG CÁCH</span>
        </div>
        <div className="bg-[#ff0055] text-white text-[10px] font-black px-2 py-0.5 border border-black shadow-[1.5px_1.5px_0_#000]">
          COMBO x{comboStreak}
        </div>
      </div>

      {/* Main Style Rank Showcase */}
      <div className="flex items-center justify-between gap-3 my-1">
        <div className="flex items-center gap-3">
          {/* Big Chunky Rank Badge */}
          <div
            className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center font-black text-2xl md:text-3xl text-white border-2 border-black shadow-[3px_3px_0_#000] bg-gradient-to-br ${rankInfo.bgGradient}`}
          >
            {styleRank}
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
              BẬC PHONG CÁCH:
            </span>
            <h4 className={`text-sm md:text-base font-black tracking-wide ${rankInfo.textColor}`}>
              {rankInfo.title}
            </h4>
            <span className="text-[10px] font-mono text-emerald-400 font-extrabold block">
              {rankInfo.buff}
            </span>
          </div>
        </div>

        <div className="text-right font-mono">
          <span className="text-xl md:text-2xl font-black text-white">
            {stylePoints}
          </span>
          <span className="text-xs text-slate-500 font-bold">/1000</span>
        </div>
      </div>

      {/* Style Progress Bar */}
      <div className="w-full my-1.5">
        <div className="w-full h-3 bg-[#0a0d14] border-2 border-black overflow-hidden relative">
          <div
            className={`h-full bg-gradient-to-r ${rankInfo.bgGradient} transition-all duration-300`}
            style={{ width: `${meterPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[8px] font-mono text-slate-500 mt-1 uppercase font-bold">
          <span>D (0)</span>
          <span>C (150)</span>
          <span>B (350)</span>
          <span>A (550)</span>
          <span>S (750)</span>
          <span className="text-[#ff0055] font-black">SSS (900+)</span>
        </div>
      </div>

      {/* ALL-OUT RESONANCE ATTACK BUTTON */}
      <button
        onClick={() => {
          if (canTriggerAllOut) {
            sound.playAllOutResonance();
            onTriggerAllOut();
          }
        }}
        disabled={!canTriggerAllOut}
        className={`w-full py-2.5 px-3 border-2 border-black font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-all ${
          canTriggerAllOut
            ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white sss-pulse hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
            : 'bg-[#1a2030] text-slate-600 border-slate-800 cursor-not-allowed opacity-60'
        }`}
      >
        <Sparkles className={`w-4 h-4 ${canTriggerAllOut ? 'animate-spin' : ''}`} />
        <span>
          {canTriggerAllOut
            ? '🔥 HỢP KÍCH 6 THẺ: ALL-OUT RESONANCE! 🔥'
            : 'ĐẠT STYLE RANK SSS ĐỂ MỞ HỢP KÍCH 6 THẺ'}
        </span>
      </button>
    </div>
  );
};
