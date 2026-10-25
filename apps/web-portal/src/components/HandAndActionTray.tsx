'use client';

import React from 'react';
import { ActionCard, BattleLogEntry } from '@/types/game';
import { sound } from '@/utils/soundEffects';
import { Play, Shield, Flame, Crosshair, Cpu, Sparkles, Zap, ArrowRightCircle } from 'lucide-react';

interface HandAndActionTrayProps {
  hand: ActionCard[];
  currentEnergy: number;
  onPlayCard: (card: ActionCard) => void;
  onEndTurn: () => void;
  logs: BattleLogEntry[];
  isPlayerTurn: boolean;
}

export const HandAndActionTray: React.FC<HandAndActionTrayProps> = ({
  hand,
  currentEnergy,
  onPlayCard,
  onEndTurn,
  logs,
  isPlayerTurn
}) => {
  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Crosshair': return <Crosshair className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-[#121622] border-2 border-black p-3.5 shadow-[4px_4px_0_#000000] rounded-sm flex flex-col md:flex-row gap-3">
      {/* Cards in Hand (70% width on desktop) */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b-2 border-black pb-1.5 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-white uppercase tracking-wider">
              KHAY BÀI HÀNH ĐỘNG ({hand.length} THẺ)
            </span>
            <span className="text-[10px] text-slate-400">
              Nhấp thẻ để thi triển chiêu thức
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#00f0ff]">
              NĂNG LƯỢNG: {currentEnergy} ⚡
            </span>
            <button
              onClick={() => {
                sound.playCardWhoosh();
                onEndTurn();
              }}
              disabled={!isPlayerTurn}
              className={`px-3 py-1.5 border-2 border-black font-black uppercase text-xs flex items-center gap-1.5 shadow-[2px_2px_0_#000] transition-all ${
                isPlayerTurn
                  ? 'bg-[#10ffa0] text-black hover:bg-emerald-400 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
              }`}
            >
              <span>KẾT THÚC LƯỢT</span>
              <ArrowRightCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hand Cards List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {hand.map((card) => {
            const canAfford = currentEnergy >= card.energyCost && isPlayerTurn;
            return (
              <div
                key={card.id}
                onClick={() => {
                  if (canAfford) {
                    onPlayCard(card);
                  }
                }}
                className={`relative bg-[#1a2030] border-2 border-black p-2 rounded-sm flex flex-col justify-between shadow-[2.5px_2.5px_0_#000] transition-all select-none ${
                  canAfford
                    ? 'hover:-translate-y-2 hover:shadow-[4px_6px_0_#000] cursor-pointer'
                    : 'opacity-40 grayscale-[40%] cursor-not-allowed'
                }`}
                style={{
                  borderColor: canAfford ? card.colorHex : '#2a324b'
                }}
              >
                {/* Cost & Type Badges */}
                <div className="flex items-center justify-between mb-1">
                  <span className="w-5 h-5 rounded-full bg-[#00f0ff] text-black font-black text-xs flex items-center justify-center border border-black shadow-[1px_1px_0_#000]">
                    {card.energyCost}
                  </span>
                  <span
                    className="text-[8px] font-black uppercase px-1 py-0.2 border border-black text-black"
                    style={{ backgroundColor: card.colorHex }}
                  >
                    {card.type}
                  </span>
                </div>

                {/* Card Icon & Character Owner */}
                <div className="my-1 flex items-center gap-1.5">
                  <div
                    className="p-1 rounded bg-[#0a0d14] border border-black text-white"
                    style={{ color: card.colorHex }}
                  >
                    {getCardIcon(card.iconName)}
                  </div>
                  <span className="text-[9px] font-black text-slate-300 truncate">
                    {card.characterOwnerName}
                  </span>
                </div>

                {/* Card Name */}
                <h5 className="font-extrabold text-[11px] text-white line-clamp-1 mb-1" title={card.name}>
                  {card.name}
                </h5>

                {/* Description */}
                <p className="text-[9px] text-slate-400 line-clamp-2 leading-tight">
                  {card.description}
                </p>

                {/* Style Bonus Indicator */}
                <div className="mt-1 pt-1 border-t border-black/40 flex items-center justify-between text-[8px] font-mono text-[#f59e0b]">
                  <span>+STYLE:</span>
                  <span className="font-black">+{card.stylePoints}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Battle Log Box (30% width on desktop) */}
      <div className="w-full md:w-64 bg-[#0a0d14] border-2 border-black p-2.5 flex flex-col justify-between shadow-[2px_2px_0_#000]">
        <div className="text-[10px] font-black uppercase text-slate-400 border-b border-slate-800 pb-1 mb-1.5 flex items-center justify-between">
          <span>NHẬT KÝ CHIẾN TRƯỜNG</span>
          <span className="text-emerald-400">● TRỰC TIẾP</span>
        </div>
        <div className="flex-1 overflow-y-auto max-h-36 space-y-1 font-mono text-[10px] pr-1">
          {logs.slice(-6).map((log) => (
            <div
              key={log.id}
              className={`leading-tight p-1 border-l-2 ${
                log.type === 'player'
                  ? 'border-[#00f0ff] text-slate-200'
                  : log.type === 'boss'
                  ? 'border-[#ef4444] text-rose-300'
                  : log.type === 'allout'
                  ? 'border-[#f59e0b] text-[#f59e0b] font-bold bg-[#f59e0b]/10'
                  : log.type === 'style'
                  ? 'border-[#ff0055] text-pink-300'
                  : 'border-slate-600 text-slate-400'
              }`}
            >
              <span className="text-slate-500 text-[8px] mr-1">[{log.timestamp}]</span>
              <span>{log.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
