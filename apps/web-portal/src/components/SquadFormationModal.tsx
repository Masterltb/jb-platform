'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CharacterCard, getHeroAscensionInfo } from '@/types/game';
import { 
  Users, 
  Shield, 
  Zap, 
  Sparkles, 
  Check, 
  X, 
  ArrowLeftRight, 
  Shuffle, 
  Search, 
  Filter, 
  Sun, 
  Crown,
  ChevronRight,
  Flame,
  AlertCircle
} from 'lucide-react';
import { sound } from '@/utils/soundEffects';

interface SquadFormationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSquad: CharacterCard[];
  ownedHeroes: CharacterCard[];
  onSaveSquad: (newSquad: CharacterCard[]) => void;
}

const POSITIONS = ['Frontline', 'Midline', 'Backline'] as const;

export const SquadFormationModal: React.FC<SquadFormationModalProps> = ({
  isOpen,
  onClose,
  currentSquad,
  ownedHeroes,
  onSaveSquad
}) => {
  // Local state for selecting 6 heroes
  const [selectedHeroIds, setSelectedHeroIds] = useState<string[]>(() => {
    return currentSquad.slice(0, 6).map(c => c.id);
  });

  const [activeSlotIdx, setActiveSlotIdx] = useState<number | null>(null);
  const [filterRank, setFilterRank] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  // Build the 6-hero working squad from selected IDs
  const heroMap = new Map<string, CharacterCard>();
  ownedHeroes.forEach(h => heroMap.set(h.id, h));
  currentSquad.forEach(h => {
    if (!heroMap.has(h.id)) heroMap.set(h.id, h);
  });

  const selectedSquad = selectedHeroIds
    .map(id => heroMap.get(id))
    .filter((h): h is CharacterCard => Boolean(h));

  const totalCP = selectedSquad.reduce((sum, h) => sum + h.totalCombatPower, 0);

  // Toggle or assign hero
  const handleToggleHero = (hero: CharacterCard) => {
    sound.playCardWhoosh();
    const isAlreadySelected = selectedHeroIds.includes(hero.id);

    if (isAlreadySelected) {
      // Remove from squad
      setSelectedHeroIds(prev => prev.filter(id => id !== hero.id));
    } else {
      // Add or replace
      if (activeSlotIdx !== null && activeSlotIdx < 6) {
        // Replace hero at activeSlotIdx
        const next = [...selectedHeroIds];
        next[activeSlotIdx] = hero.id;
        setSelectedHeroIds(next);
        setActiveSlotIdx(null);
      } else if (selectedHeroIds.length < 6) {
        setSelectedHeroIds(prev => [...prev, hero.id]);
      } else {
        alert('Đội hình xuất chiến tối đa 6 tướng! Vui lòng bỏ chọn bớt 1 tướng hoặc nhấn vào ô cần thay thế.');
      }
    }
  };

  const handleRemoveSlot = (slotIdx: number) => {
    sound.playCardWhoosh();
    setSelectedHeroIds(prev => prev.filter((_, idx) => idx !== slotIdx));
  };

  // Auto-fill top 6 highest CP heroes
  const handleAutoDeployTopCP = () => {
    sound.playBuffSound();
    const sorted = [...heroMap.values()].sort((a, b) => b.totalCombatPower - a.totalCombatPower);
    const top6 = sorted.slice(0, 6).map(h => h.id);
    setSelectedHeroIds(top6);
  };

  const handleConfirm = () => {
    if (selectedSquad.length !== 6) {
      if (!confirm(`Bạn mới chọn ${selectedSquad.length}/6 tướng xuất chiến. Bạn có chắc chắn muốn lưu?`)) {
        return;
      }
    }
    sound.playBuffSound();
    onSaveSquad(selectedSquad);
    onClose();
  };

  // Filtered reserve heroes
  const filteredHeroes = Array.from(heroMap.values()).filter(hero => {
    if (filterRank !== 'ALL' && hero.rank !== filterRank) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return hero.name.toLowerCase().includes(q) || hero.role.toLowerCase().includes(q);
    }
    return true;
  });

  const getSlotPositionLabel = (idx: number) => {
    if (idx < 2) return { text: 'TIỀN TUYẾN (FRONTLINE)', color: 'text-blue-400', border: 'border-blue-500' };
    if (idx < 4) return { text: 'HÀNG GIỮA (MIDLINE)', color: 'text-amber-400', border: 'border-amber-500' };
    return { text: 'HÀNG SAU (BACKLINE)', color: 'text-rose-400', border: 'border-rose-500' };
  };

  const getRankBadgeColor = (rank: string) => {
    switch (rank) {
      case 'Sovereign': return 'bg-gradient-to-r from-pink-500 via-rose-600 to-amber-500 text-white shadow-[0_0_10px_#ff007f]';
      case 'Mythic': return 'bg-red-600 text-white';
      case 'Legendary': return 'bg-amber-500 text-black';
      case 'Epic': return 'bg-purple-600 text-white';
      case 'Rare': return 'bg-blue-600 text-white';
      default: return 'bg-slate-600 text-white';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 md:p-4 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#0e131f] border-4 border-black shadow-[8px_8px_0_#000] flex flex-col max-h-[92vh] overflow-hidden rounded-sm">
        
        {/* HEADER */}
        <div className="p-3 md:p-4 bg-gradient-to-r from-[#171d2d] via-[#1a233a] to-[#121622] border-b-2 border-black flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#00f0ff] text-black border border-black shadow-[2px_2px_0_#000]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base md:text-xl font-black text-white uppercase tracking-wide flex items-center gap-2">
                <span>TUYỂN CHỌN ĐỘI HÌNH 6 TƯỚNG XUẤT CHIẾN</span>
                <span className="text-xs bg-[#00f0ff] text-black px-2 py-0.5 rounded font-black">
                  {selectedSquad.length}/6 TƯỚNG
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Nhấp vào thẻ hoặc ô để chỉ định tướng tham chiến trận địa. Lực chiến đội hình tự động cập nhật.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-black/80 border border-slate-700 px-3 py-1 font-mono">
              <span className="text-[10px] text-amber-400 font-bold block">TỔNG LỰC CHIẾN:</span>
              <span className="text-sm md:text-base font-black text-yellow-300">
                ⚡ {totalCP.toLocaleString()} CP
              </span>
            </div>

            <button
              onClick={handleAutoDeployTopCP}
              className="px-3 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs uppercase border border-black shadow-[2px_2px_0_#000] active:scale-95 flex items-center gap-1.5"
            >
              <Shuffle className="w-4 h-4" />
              <span className="hidden sm:inline">TỰ ĐỘNG XẾP TƯỚNG MẠNH NHẤT</span>
              <span className="sm:hidden">TỰ ĐỘNG</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-white border border-black active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BODY CONTAINER */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4">
          
          {/* SECTION 1: 6 ACTIVE COMBAT SLOTS */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs md:text-sm font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                6 VỊ TRÍ XUẤT CHIẾN CHÍNH THỨC (BẤM Ô ĐỂ CHỌN HOẶC GỠ BỎ):
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                2 Tiền Tuyến • 2 Hàng Giữa • 2 Hàng Sau
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {[0, 1, 2, 3, 4, 5].map(slotIdx => {
                const hero = selectedSquad[slotIdx];
                const posMeta = getSlotPositionLabel(slotIdx);
                const isActive = activeSlotIdx === slotIdx;
                const ascension = hero ? getHeroAscensionInfo(hero) : null;

                return (
                  <div
                    key={`slot_${slotIdx}`}
                    onClick={() => setActiveSlotIdx(isActive ? null : slotIdx)}
                    className={`relative rounded-sm border-2 p-2 flex flex-col justify-between transition-all cursor-pointer min-h-[220px] ${
                      hero
                        ? `${posMeta.border} bg-[#121622] hover:ring-2 hover:ring-cyan-400`
                        : 'border-dashed border-slate-700 bg-slate-900/40 hover:border-cyan-400 hover:bg-slate-900/80'
                    } ${isActive ? 'ring-4 ring-yellow-400 scale-[1.02]' : ''} ${
                      ascension?.isSixSuns ? 'aura-six-suns-supreme' : ''
                    }`}
                  >
                    {/* Position Label Tag */}
                    <div className="flex items-center justify-between text-[9px] font-black border-b border-white/10 pb-1 mb-1">
                      <span className={posMeta.color}>SLOT {slotIdx + 1}</span>
                      <span className="text-slate-400 uppercase text-[8px] truncate">
                        {posMeta.text.split(' ')[0]}
                      </span>
                    </div>

                    {hero ? (
                      <>
                        {/* Avatar */}
                        <div className="relative w-full h-24 rounded overflow-hidden my-1 flex items-center justify-center bg-black/60 border border-black">
                          {hero.avatarImage ? (
                            <Image src={hero.avatarImage} alt={hero.name} fill className="object-cover" />
                          ) : (
                            <span className="text-4xl">{hero.avatarIcon || '👤'}</span>
                          )}
                          {ascension?.isSixSuns && (
                            <div className="absolute top-1 left-1 badge-six-suns text-[8px] px-1 py-0.2 font-black uppercase flex items-center gap-0.5 rounded shadow">
                              <Sun className="w-2.5 h-2.5 animate-spin" />
                              <span>6☀️</span>
                            </div>
                          )}
                          <span className={`absolute bottom-1 right-1 text-[8px] font-black uppercase px-1 py-0.2 rounded ${getRankBadgeColor(hero.rank)}`}>
                            {hero.rank}
                          </span>
                        </div>

                        {/* Name & Stars & CP */}
                        <div className="text-center">
                          <p className="text-[11px] font-black text-white truncate">{hero.name}</p>
                          <div className="text-[9px] font-mono font-bold text-amber-400 my-0.5">
                            {ascension?.fullDisplay}
                          </div>
                          <p className="text-[10px] font-mono font-black text-cyan-300">
                            ⚡ {hero.totalCombatPower.toLocaleString()} CP
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-1 pt-1 border-t border-slate-800 flex items-center justify-between">
                          <span className="text-[8px] text-slate-400 uppercase font-mono">Lv.{hero.level}</span>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleRemoveSlot(slotIdx);
                            }}
                            className="text-[9px] bg-red-950 hover:bg-red-900 text-red-400 border border-red-800 px-1.5 py-0.5 rounded font-black active:scale-90"
                          >
                            GỠ
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-2 space-y-1">
                        <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center text-slate-500 text-lg">
                          +
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Ô TRỐNG</p>
                        <p className="text-[8px] text-slate-500">Bấm chọn tướng bên dưới</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: HERO RESERVE ROSTER (KHO TƯỚNG SỞ HỮU) */}
          <div className="bg-[#121622] border-2 border-black p-3 rounded-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs md:text-sm font-black text-white uppercase tracking-wider">
                  KHO TƯỚNG SỞ HỮU ({filteredHeroes.length} TƯỚNG)
                </h4>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Tìm tên tướng..."
                    className="bg-black/70 border border-slate-700 text-white text-xs px-2 py-1 pl-7 rounded focus:border-cyan-400 outline-none w-36 sm:w-44"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto">
                  {['ALL', 'Sovereign', 'Mythic', 'Legendary', 'Epic', 'Rare'].map(rk => (
                    <button
                      key={rk}
                      onClick={() => setFilterRank(rk)}
                      className={`text-[9px] font-black uppercase px-2 py-1 rounded border transition-all ${
                        filterRank === rk
                          ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_8px_#00f0ff]'
                          : 'bg-black/60 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {rk}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Roster Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-72 overflow-y-auto pr-1">
              {filteredHeroes.map(hero => {
                const isSelected = selectedHeroIds.includes(hero.id);
                const ascension = getHeroAscensionInfo(hero);

                return (
                  <div
                    key={hero.id}
                    onClick={() => handleToggleHero(hero)}
                    className={`relative bg-[#0d111a] border-2 rounded p-1.5 flex flex-col justify-between cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                      isSelected
                        ? 'border-yellow-400 bg-yellow-950/30 ring-2 ring-yellow-400/80 shadow-[0_0_12px_#f59e0b]'
                        : 'border-slate-800 hover:border-slate-600'
                    } ${ascension.isSixSuns ? 'aura-six-suns-supreme' : ''}`}
                  >
                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-1 right-1 z-10 w-4 h-4 bg-yellow-400 text-black rounded-full flex items-center justify-center font-black text-[9px]">
                        ✓
                      </div>
                    )}

                    {/* Rank Badge */}
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[7px] font-black uppercase px-1 py-0.2 rounded ${getRankBadgeColor(hero.rank)}`}>
                        {hero.rank}
                      </span>
                      <span className="text-[8px] font-mono text-slate-400">Lv.{hero.level}</span>
                    </div>

                    {/* Avatar */}
                    <div className="relative w-full h-16 rounded overflow-hidden my-0.5 bg-black/60 flex items-center justify-center border border-black">
                      {hero.avatarImage ? (
                        <Image src={hero.avatarImage} alt={hero.name} fill className="object-cover" />
                      ) : (
                        <span className="text-2xl">{hero.avatarIcon || '👤'}</span>
                      )}
                      {ascension.isSixSuns && (
                        <div className="absolute top-0.5 left-0.5 badge-six-suns text-[6px] px-1 font-black uppercase flex items-center">
                          6☀️
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="text-center mt-1">
                      <p className="text-[10px] font-black text-white truncate">{hero.name}</p>
                      <p className="text-[8px] text-amber-300 font-mono font-bold tracking-tighter">
                        {ascension.fullDisplay}
                      </p>
                      <p className="text-[9px] font-mono font-black text-cyan-300">
                        {hero.totalCombatPower.toLocaleString()} CP
                      </p>
                    </div>

                    {/* Deploy Toggle Tag */}
                    <div className="mt-1 pt-1 border-t border-slate-800/80 text-center">
                      <span className={`text-[8px] font-black uppercase block py-0.5 rounded ${
                        isSelected
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                          : 'bg-cyan-950/60 text-cyan-400 border border-cyan-800'
                      }`}>
                        {isSelected ? 'ĐÃ XUẤT TRẬN' : '+ RA TRẬN'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-3 md:p-4 bg-[#141a29] border-t-2 border-black flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>
              Đã chọn: <strong className="text-yellow-300">{selectedSquad.length}</strong> / 6 tướng.
              {selectedSquad.length === 6 ? (
                <span className="text-emerald-400 font-bold ml-1">Đủ điều kiện xuất chiến!</span>
              ) : (
                <span className="text-rose-400 font-bold ml-1">Cần đủ 6 tướng để đạt Synergy tối đa (+80,000 CP)!</span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase border border-black active:scale-95"
            >
              HỦY BỎ
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-black text-xs md:text-sm uppercase border-2 border-black shadow-[3px_3px_0_#000] active:scale-95 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>XÁC NHẬN ĐỘI HÌNH (LƯU 6 TƯỚNG)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
