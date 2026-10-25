'use client';

import React, { useState } from 'react';
import { CharacterCard, EquipmentSlot, getHeroAscensionInfo } from '@/types/game';
import { sound } from '@/utils/soundEffects';

import Image from 'next/image';
import { Star } from 'lucide-react';

interface CharacterCardViewProps {
  card: CharacterCard;
  onSelectCard: (card: CharacterCard) => void;
  isTargeted?: boolean;
}

export const CharacterCardView: React.FC<CharacterCardViewProps> = ({
  card,
  onSelectCard,
  isTargeted
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const ascension = getHeroAscensionInfo(card);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const getRankColor = (rank: string) => {
    if (ascension.isSixSuns) return '#FFE600';
    switch (rank) {
      case 'Sovereign': return '#ff007f';
      case 'Mythic': return '#ef4444';
      case 'Legendary': return '#f59e0b';
      case 'Epic': return '#a855f7';
      case 'Rare': return '#3b82f6';
      case 'Fine': return '#10b981';
      default: return '#94a3b8';
    }
  };

  const rankColor = getRankColor(card.rank);
  const isHighTier = card.rank === 'Legendary' || card.rank === 'Mythic' || card.rank === 'Sovereign' || ascension.realm !== 'Star';

  const slots: { slot: EquipmentSlot; label: string; icon: string }[] = [
    { slot: 'Weapon', label: 'Vũ Khí', icon: '🗡️' },
    { slot: 'Jacket', label: 'Áo Khoác', icon: '🧥' },
    { slot: 'Pants', label: 'Quần', icon: '👖' },
    { slot: 'Shoes', label: 'Sneaker', icon: '👟' },
    { slot: 'Accessory', label: 'Phụ Kiện', icon: '🕶️' },
    { slot: 'Mount', label: 'Xe Độ', icon: '🏍️' }
  ];

  const hpPercent = Math.max(0, Math.min(100, (card.currentHp / card.maxHp) * 100));

  const getAuraClass = (rank: string) => {
    if (ascension.isSixSuns) {
      return 'aura-six-suns-supreme';
    }
    switch (rank) {
      case 'Sovereign': return 'aura-sovereign';
      case 'Mythic': return 'aura-mythic';
      case 'Legendary': return 'aura-legendary';
      case 'Epic': return 'aura-epic';
      case 'Rare': return 'aura-rare';
      case 'Fine': return 'aura-fine';
      default: return 'aura-common';
    }
  };

  return (
    <div
      className="card-perspective cursor-pointer select-none group"
      onClick={() => {
        sound.playCardWhoosh();
        onSelectCard(card);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`card-inner relative bg-[#121622] rounded-sm p-2 flex flex-col justify-between transition-transform duration-150 ${getAuraClass(card.rank)} ${
          isTargeted ? 'ring-4 ring-[#00f0ff] scale-[1.04]' : ''
        }`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* Hologram Foil Layer for High Tier */}
        {isHighTier && <div className="hologram-foil absolute inset-0 z-10 rounded-sm" />}

        {/* Card Header: Level & Position/CP */}
        <div className="flex items-center justify-between gap-1 mb-1 z-20">
          <span className="text-[10px] font-mono text-[#00f0ff] font-bold">
            Lv.{card.level}
          </span>
          <span className="text-[10px] font-mono font-bold text-slate-300">
            CP {card.totalCombatPower.toLocaleString()}
          </span>
        </div>

        {/* WEB UI MANAGED STARS / MOONS / SUNS (FEAT-013) */}
        <div className={`flex items-center justify-between px-1.5 py-0.5 mb-1.5 z-20 rounded-sm border ${
          ascension.isSixSuns
            ? 'badge-six-suns border-amber-300'
            : ascension.realm === 'Sun'
            ? 'bg-amber-950/90 border-amber-500'
            : ascension.realm === 'Moon'
            ? 'bg-indigo-950/90 border-indigo-400'
            : 'bg-black/90 border-slate-800'
        }`}>
          <div className="flex items-center gap-0.5 font-mono text-[11px] leading-none" title={ascension.realmTitle}>
            {ascension.fullDisplay}
          </div>
          <span
            className={`text-[8px] font-black uppercase px-1.5 py-0.2 border border-black shadow-[1px_1px_0_#000] ${
              ascension.isSixSuns ? 'bg-amber-400 text-black animate-pulse font-extrabold' : 'text-black'
            }`}
            style={{ backgroundColor: ascension.isSixSuns ? '#FFE600' : rankColor }}
          >
            {ascension.isSixSuns ? '6☀️ THÁI DƯƠNG' : card.rank}
          </span>
        </div>

        {/* Character Visual Showcase (Thuần Artwork nhân vật, không chứa sao hay text) */}
        <div
          className={`relative w-full h-28 rounded-sm bg-gradient-to-br ${card.avatarBg} border border-black flex flex-col items-center justify-center overflow-hidden mb-1.5 shadow-[inset_0_0_12px_rgba(0,0,0,0.6)]`}
        >
          {card.avatarImage ? (
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
              <Image
                src={card.avatarImage}
                alt={card.name}
                fill
                sizes="160px"
                className={
                  card.id === 'card_jaebin_03'
                    ? "object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    : "object-contain object-bottom p-1 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : (
            <div className="text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transform group-hover:scale-110 transition-transform">
              {card.avatarIcon}
            </div>
          )}

          <span className="absolute bottom-1 right-1 text-[9px] font-black uppercase tracking-wider text-white px-1.5 py-0.5 bg-black/85 border border-black/40 rounded z-20">
            {card.role}
          </span>
        </div>

        {/* Card Identity & Level */}
        <div className="mb-1.5 z-20">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-xs text-white truncate max-w-[110px]" title={card.name}>
              {card.name}
            </h4>
            <span className="text-[10px] font-mono text-[#00f0ff] font-bold">
              Lv.{card.level}
            </span>
          </div>

          {/* HP Bar */}
          <div className="w-full bg-[#0a0d14] h-2 border border-black mt-1 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-300"
              style={{ width: `${hpPercent}%` }}
            />
            {card.currentShield > 0 && (
              <div
                className="absolute top-0 left-0 h-full bg-[#00f0ff]/60 border-r border-black"
                style={{ width: `${Math.min(100, (card.currentShield / card.maxHp) * 100)}%` }}
              />
            )}
          </div>
          <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-0.5">
            <span>HP: {card.currentHp}/{card.maxHp}</span>
            {card.currentShield > 0 && <span className="text-[#00f0ff]">+{card.currentShield}</span>}
          </div>
        </div>

        {/* 6 MINI EQUIPMENT SLOTS */}
        <div className="bg-[#0a0d14] p-1 border border-black rounded-sm z-20">
          <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 mb-0.5">
            <span>6 Ô TRANG BỊ</span>
            <span className="text-[#f59e0b] group-hover:underline">Chi tiết &gt;</span>
          </div>
          <div className="grid grid-cols-6 gap-1">
            {slots.map(({ slot, label, icon }) => {
              const item = card.equippedItems[slot];
              const itemRankColor = item ? getRankColor(item.rank) : '#2a324b';
              return (
                <div
                  key={slot}
                  title={item ? `${label}: ${item.name} (${item.rank})` : `${label}: Chưa trang bị`}
                  className="aspect-square flex items-center justify-center rounded-[2px] border text-[9px] transition-transform hover:scale-125"
                  style={{
                    backgroundColor: item ? `${itemRankColor}22` : '#121622',
                    borderColor: itemRankColor
                  }}
                >
                  <span>{icon}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
