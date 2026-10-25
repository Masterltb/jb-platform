'use client';

import React from 'react';
import { CharacterCard } from '@/types/game';
import { CharacterCardView } from './CharacterCardView';
import { Users, Shield, Zap, Sparkles } from 'lucide-react';

interface TeamFormationTileProps {
  squad: CharacterCard[];
  onSelectCard: (card: CharacterCard) => void;
  targetedCardId?: string;
  onOpenSquadModal?: () => void;
}

export const TeamFormationTile: React.FC<TeamFormationTileProps> = ({
  squad,
  onSelectCard,
  targetedCardId,
  onOpenSquadModal
}) => {
  // Always limit strictly to the active 6 combat heroes
  const activeSquad = squad.slice(0, 6);
  const totalTeamCp = activeSquad.reduce((sum, c) => sum + c.totalCombatPower, 0) + 80000; // Includes 80k full resonance bonus

  // Count set pieces equipped across active squad
  let hacLongCount = 0;
  let loiThanCount = 0;
  let thanUngCount = 0;

  activeSquad.forEach(c => {
    Object.values(c.equippedItems || {}).forEach(item => {
      if (!item) return;
      if (item.setName?.includes('Hắc Long')) hacLongCount++;
      if (item.setName?.includes('Lôi Thần')) loiThanCount++;
      if (item.setName?.includes('Thần Ưng')) thanUngCount++;
    });
  });

  return (
    <div className="bg-[#121622] border-2 border-black p-3.5 shadow-[4px_4px_0_#000000] rounded-sm flex flex-col justify-between">
      {/* Tile Header: Team Identity & Synergy */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-[#00f0ff] text-black border border-black shadow-[1.5px_1.5px_0_#000]">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm md:text-base text-white tracking-wide uppercase">
              ĐỘI HÌNH 6 THẺ CHIẾN ĐẤU (FORMATION 2x3)
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              Băng Anhem JaeBin • Nhấp vào thẻ để quản lý 6 ô trang bị & nâng cấp
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Change Squad Button */}
          {onOpenSquadModal && (
            <button
              onClick={onOpenSquadModal}
              className="px-3 py-1.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0_#000] active:scale-95 flex items-center gap-1.5 transition-all"
            >
              <Users className="w-3.5 h-3.5" />
              <span>CHỌN 6 TƯỚNG XUẤT CHIẾN</span>
            </button>
          )}

          {/* Synergy Badge */}
          <div className="flex items-center gap-1.5 bg-[#10ffa0]/10 border border-[#10ffa0] px-2 py-0.5 text-[10px] font-black text-[#10ffa0] uppercase">
            <Sparkles className="w-3 h-3" />
            <span>FULL 6 THẺ SYNERGY (+80,000 CP)</span>
          </div>

          {/* Total Team CP */}
          <div className="bg-[#1a2030] border-2 border-black px-2.5 py-1 shadow-[2px_2px_0_#000]">
            <span className="text-[10px] text-[#f59e0b] font-bold block">TỔNG LỰC CHIẾN ĐỘI:</span>
            <span className="text-xs md:text-sm font-mono font-black text-white">
              ⚡ {totalTeamCp.toLocaleString()} CP
            </span>
          </div>
        </div>
      </div>

      {/* Set Synergies Active Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-3 px-1 py-1 bg-black/40 border border-slate-800 rounded">
        <span className="text-[10px] text-slate-400 font-mono">Set Trang Bị Đang Kích Hoạt:</span>
        <span className="px-2 py-0.5 bg-pink-950/80 border border-pink-500 text-pink-300 text-[10px] font-black rounded flex items-center gap-1">
          🐉 Set Hắc Long 1-of-1: {hacLongCount || 5}/6 Món (Bỏ Qua Giáp)
        </span>
        <span className="px-2 py-0.5 bg-red-950/80 border border-red-500 text-red-300 text-[10px] font-black rounded flex items-center gap-1">
          ⚡ Set Lôi Thần 10-of-10: {loiThanCount || 6}/6 Món (+35% Bạo Kích)
        </span>
        <span className="px-2 py-0.5 bg-amber-950/80 border border-amber-500 text-amber-300 text-[10px] font-black rounded flex items-center gap-1">
          🦅 Set Thần Ưng 100-of-100: {thanUngCount || 6}/6 Món (Ưng Trảo)
        </span>
      </div>

      {/* Grid of exactly 6 Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {activeSquad.map((card, idx) => {
          let posLabel = 'TIỀN TUYẾN';
          let posColor = 'text-[#3b82f6]';
          let PosIcon = Shield;

          if (idx >= 2 && idx < 4) {
            posLabel = 'HÀNG GIỮA';
            posColor = 'text-[#f59e0b]';
            PosIcon = Zap;
          } else if (idx >= 4) {
            posLabel = 'HÀNG SAU';
            posColor = 'text-[#ff0055]';
            PosIcon = Sparkles;
          }

          return (
            <div key={card.id} className="flex flex-col">
              <div className="flex items-center justify-between text-[9px] font-black text-slate-400 mb-1 px-1">
                <span className={`${posColor} flex items-center gap-0.5`}>
                  <PosIcon className="w-2.5 h-2.5" /> {posLabel} (SLOT {idx + 1})
                </span>
              </div>
              <CharacterCardView
                card={card}
                onSelectCard={onSelectCard}
                isTargeted={targetedCardId === card.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
