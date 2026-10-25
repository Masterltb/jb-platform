'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  CharacterCard, 
  EquipmentItem, 
  EquipmentSlot, 
  CardRarity, 
  calculateItemCombatPower, 
  calculateEquipmentSetResonance 
} from '@/types/game';
import { X, Shield, Zap, Sparkles, Check, ArrowRight, TrendingUp, TrendingDown, Swords, Heart } from 'lucide-react';
import { sound } from '@/utils/soundEffects';

interface EquipmentInspectorModalProps {
  card: CharacterCard | null;
  inventory: EquipmentItem[];
  onClose: () => void;
  onEquipItem: (cardId: string, slot: EquipmentSlot, item: EquipmentItem) => void;
  onUnequipItem: (cardId: string, slot: EquipmentSlot) => void;
}

export const EquipmentInspectorModal: React.FC<EquipmentInspectorModalProps> = ({
  card,
  inventory,
  onClose,
  onEquipItem,
  onUnequipItem
}) => {
  const [selectedSlot, setSelectedSlot] = useState<EquipmentSlot>('Weapon');
  const [selectedRankFilter, setSelectedRankFilter] = useState<string>('ALL');

  // Track Combat Power fluctuations for live animated feedback
  const [prevCp, setPrevCp] = useState<number>(card?.totalCombatPower || 0);
  const [cpDelta, setCpDelta] = useState<{ amount: number; id: number } | null>(null);

  useEffect(() => {
    if (card && card.totalCombatPower !== prevCp) {
      const delta = card.totalCombatPower - prevCp;
      setCpDelta({ amount: delta, id: Date.now() });
      setPrevCp(card.totalCombatPower);
      const timer = setTimeout(() => setCpDelta(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [card?.totalCombatPower, prevCp]);

  if (!card) return null;

  const slots: { slot: EquipmentSlot; label: string; icon: string }[] = [
    { slot: 'Weapon', label: 'Vũ Khí', icon: '🗡️' },
    { slot: 'Jacket', label: 'Áo Khoác', icon: '🧥' },
    { slot: 'Pants', label: 'Quần', icon: '👖' },
    { slot: 'Shoes', label: 'Sneaker', icon: '👟' },
    { slot: 'Accessory', label: 'Phụ Kiện', icon: '🕶️' },
    { slot: 'Mount', label: 'Xe Độ', icon: '🏍️' }
  ];

  const currentItem = card.equippedItems[selectedSlot];
  const currentItemCp = currentItem ? calculateItemCombatPower(currentItem) : 0;

  // Equipment & Set Resonance calculations
  const equippedList = Object.values(card.equippedItems || {}).filter((i): i is EquipmentItem => Boolean(i));
  const totalEquipCp = equippedList.reduce((sum, item) => sum + calculateItemCombatPower(item), 0);
  const setResonance = calculateEquipmentSetResonance(card.equippedItems);
  const baseCp = card.baseCombatPower ?? Math.max(1000, card.totalCombatPower - totalEquipCp - setResonance.totalBonusCp);

  const filteredInventory = inventory.filter((item) => {
    const matchSlot = item.slot === selectedSlot;
    const matchRank = selectedRankFilter === 'ALL' || item.rank === selectedRankFilter;
    return matchSlot && matchRank;
  });

  const getRankColor = (rank: string) => {
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

  const ranks = ['ALL', 'Sovereign', 'Mythic', 'Legendary', 'Epic', 'Rare', 'Fine', 'Common'];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 md:p-4">
      <div className="relative w-full max-w-5xl bg-[#0f1422] border-2 border-cyan-500/80 shadow-[8px_8px_0_#000000] p-4 md:p-5 rounded-sm flex flex-col max-h-[94vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className="text-xs font-black uppercase px-2.5 py-0.5 border border-black text-black shadow-[1px_1px_0_#000]"
              style={{ backgroundColor: getRankColor(card.rank) }}
            >
              {card.rank}
            </span>
            <div>
              <h3 className="text-base md:text-lg font-black text-white uppercase tracking-wide flex items-center gap-2">
                <span>QUẢN LÝ 6 Ô TRANG BỊ — {card.name}</span>
                {card.isAwakened && <span className="text-[10px] text-amber-400 font-mono">👑 6 THÁI DƯƠNG</span>}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Mỗi trang bị gắn vào sẽ trực tiếp cộng dồn ATK, HP, DEF, CRIT và Lực Chiến CP của nhân vật!
              </p>
            </div>
          </div>
          <button
            onClick={() => { sound.playCardWhoosh(); onClose(); }}
            className="p-1.5 bg-[#ef4444] hover:bg-rose-600 text-white border border-black shadow-[2px_2px_0_#000] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1">
          {/* Left Col (5 cols): Card Overview, Stats & 6 Slots */}
          <div className="md:col-span-5 bg-[#090c14] border-2 border-black p-3.5 flex flex-col justify-between shadow-[3px_3px_0_#000]">
            <div>
              {/* Card Hero Banner */}
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-3">
                <div
                  className={`w-16 h-16 rounded-sm bg-gradient-to-br ${card.avatarBg} border-2 border-black flex items-center justify-center text-3xl shadow-[2px_2px_0_#000] shrink-0`}
                >
                  {card.avatarIcon}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-extrabold text-sm text-white truncate">{card.name}</h4>
                  <span className="text-[11px] font-mono font-bold text-[#00f0ff] block">
                    Cấp {card.level}/{card.maxLevel} • {card.role}
                  </span>

                  {/* Main Combat Power with Live Delta Ping */}
                  <div className="flex items-center gap-2 mt-1 relative">
                    <span className="text-xs md:text-sm font-mono font-black text-[#f59e0b] block drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                      ⚡ LỰC CHIẾN CP: {card.totalCombatPower.toLocaleString()}
                    </span>
                    {cpDelta && (
                      <span
                        key={cpDelta.id}
                        className={`animate-bounce px-1.5 py-0.5 text-[10px] font-mono font-black border shadow-[1px_1px_0_#000] shrink-0 ${
                          cpDelta.amount > 0
                            ? 'bg-emerald-400 text-black border-emerald-200'
                            : 'bg-rose-600 text-white border-rose-300'
                        }`}
                      >
                        {cpDelta.amount > 0 ? `+${cpDelta.amount.toLocaleString()}` : `${cpDelta.amount.toLocaleString()}`} CP
                      </span>
                    )}
                  </div>

                  {/* CP Contribution Breakdown */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-[9px] font-mono">
                    <span className="px-1.5 py-0.5 bg-black/70 border border-slate-700 text-slate-300">
                      Gốc: {baseCp.toLocaleString()}
                    </span>
                    <span className="px-1.5 py-0.5 bg-cyan-950/70 border border-cyan-600 text-[#00f0ff] font-bold">
                      Đồ: +{totalEquipCp.toLocaleString()}
                    </span>
                    {setResonance.totalBonusCp > 0 && (
                      <span className="px-1.5 py-0.5 bg-amber-950/80 border border-amber-500 text-[#f59e0b] font-black animate-pulse">
                        Set: +{setResonance.totalBonusCp.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 4 Core Hero Stats */}
              <div className="grid grid-cols-4 gap-1.5 mb-3 p-2 bg-black/60 border border-slate-800 rounded-sm text-center">
                <div className="bg-[#121622] p-1 border border-slate-800">
                  <span className="text-[8px] text-slate-400 block font-bold">⚔️ ATK</span>
                  <span className="text-[11px] font-mono font-black text-rose-400">{card.atk.toLocaleString()}</span>
                </div>
                <div className="bg-[#121622] p-1 border border-slate-800">
                  <span className="text-[8px] text-slate-400 block font-bold">❤️ HP</span>
                  <span className="text-[11px] font-mono font-black text-emerald-400">{card.maxHp.toLocaleString()}</span>
                </div>
                <div className="bg-[#121622] p-1 border border-slate-800">
                  <span className="text-[8px] text-slate-400 block font-bold">🛡️ DEF</span>
                  <span className="text-[11px] font-mono font-black text-blue-400">{card.def.toLocaleString()}</span>
                </div>
                <div className="bg-[#121622] p-1 border border-slate-800">
                  <span className="text-[8px] text-slate-400 block font-bold">💥 BẠO</span>
                  <span className="text-[11px] font-mono font-black text-amber-400">{Math.round((card.critRate || 0.1) * 100)}%</span>
                </div>
              </div>

              {/* Active Set Resonance Badges */}
              {setResonance.activeSets.length > 0 && (
                <div className="mb-3 p-2 bg-[#1a1426] border border-amber-500/60 rounded-sm">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-[#f59e0b]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                    <span>HIỆU ỨNG BỘ TRANG BỊ ĐANG KÍCH HOẠT:</span>
                  </div>
                  <div className="space-y-1 mt-1">
                    {setResonance.activeSets.map((s, idx) => (
                      <div key={idx} className="text-[9px] font-mono text-amber-200 flex items-center justify-between">
                        <span>★ Bộ {s.count} món {s.rank}:</span>
                        <span className="font-bold text-[#00f0ff]">
                          +{s.bonusCp.toLocaleString()} CP (+{s.bonusAtk} ATK, +{s.bonusDef} DEF)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6 Equipment Slots Selector */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                  CHỌN Ô TRANG BỊ ĐỂ THAY ĐỒ:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {slots.map(({ slot, label, icon }) => {
                    const item = card.equippedItems[slot];
                    const isSelected = selectedSlot === slot;
                    const itemColor = item ? getRankColor(item.rank) : '#475569';
                    const itemCp = item ? calculateItemCombatPower(item) : 0;

                    return (
                      <div
                        key={slot}
                        onClick={() => {
                          sound.playCardWhoosh();
                          setSelectedSlot(slot);
                        }}
                        className={`p-2 border-2 border-black rounded-sm flex items-center gap-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#1e2638] ring-2 ring-[#00f0ff] shadow-[2px_2px_0_#000]'
                            : 'bg-[#121622] hover:bg-[#1a2030]'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded border border-black flex items-center justify-center text-sm shadow-[1px_1px_0_#000] shrink-0"
                          style={{ backgroundColor: `${itemColor}25`, borderColor: itemColor }}
                        >
                          {icon}
                        </div>
                        <div className="overflow-hidden flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-slate-400 truncate">
                              {label}
                            </span>
                            {item && (
                              <span className="text-[8px] font-mono font-bold text-[#00f0ff]">
                                +{itemCp.toLocaleString()} CP
                              </span>
                            )}
                          </div>
                          <span
                            className="text-[10px] font-black truncate block mt-0.5"
                            style={{ color: item ? itemColor : '#64748b' }}
                          >
                            {item ? item.name : 'Chưa mặc'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Active Slot Summary */}
            <div className="mt-3">
              {currentItem ? (
                <div className="p-2.5 bg-[#121622] border-2 border-black rounded-sm shadow-[1.5px_1.5px_0_#000]">
                  <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                    <span className="text-slate-400">Đang Mặc ({selectedSlot}):</span>
                    <button
                      onClick={() => onUnequipItem(card.id, selectedSlot)}
                      className="text-[#ef4444] hover:text-white hover:bg-rose-600 font-black text-[10px] px-2 py-0.5 bg-red-950/40 border border-red-700 rounded transition-all cursor-pointer"
                    >
                      Tháo Ra
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black truncate" style={{ color: getRankColor(currentItem.rank) }}>
                      {currentItem.name}
                    </span>
                    <span className="text-[9px] font-mono px-1 py-0.2 bg-black border border-slate-700 text-white shrink-0">
                      Lv.{currentItem.level} {currentItem.enhanceLevel ? `(+${currentItem.enhanceLevel})` : ''}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[9px] font-mono text-slate-300">
                    <span>Đóng góp: <strong className="text-[#00f0ff]">+{currentItemCp.toLocaleString()} CP</strong></span>
                    {currentItem.exclusivePerk && (
                      <span className="text-[#f59e0b] truncate max-w-[180px]">★ {currentItem.exclusivePerk.name}</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-2.5 bg-[#121622]/60 border border-dashed border-slate-700 rounded-sm text-center text-[10px] text-slate-400 font-mono">
                  Ô <strong className="text-white">{selectedSlot}</strong> hiện đang để trống. Chọn món bên phải để gắn và tăng lực chiến!
                </div>
              )}
            </div>
          </div>

          {/* Right Col (7 cols): Inventory to Equip */}
          <div className="md:col-span-7 bg-[#090c14] border-2 border-black p-3.5 flex flex-col justify-between shadow-[3px_3px_0_#000]">
            <div>
              {/* Filter Tabs by Rank */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-2 mb-2.5 gap-2">
                <span className="text-xs font-black uppercase text-white flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>KHO TRANG BỊ ({selectedSlot.toUpperCase()})</span>
                </span>
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                  {ranks.map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRankFilter(r)}
                      className={`text-[9px] font-black uppercase px-2 py-0.5 border border-black transition-all cursor-pointer ${
                        selectedRankFilter === r
                          ? 'bg-[#00f0ff] text-black shadow-[1px_1px_0_#000]'
                          : 'bg-[#1a2030] text-slate-400 hover:text-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List for the Selected Slot */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {filteredInventory.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded">
                    Không có trang bị ô {selectedSlot} phù hợp với bộ lọc trong kho.
                  </div>
                ) : (
                  filteredInventory.map((item) => {
                    const isEquipped = currentItem?.id === item.id;
                    const itemColor = getRankColor(item.rank);
                    const itemCp = calculateItemCombatPower(item);
                    const cpDiff = itemCp - currentItemCp;

                    return (
                      <div
                        key={item.id}
                        className={`p-3 border-2 border-black bg-[#121622] rounded-sm flex items-center justify-between gap-3 shadow-[2px_2px_0_#000] transition-all hover:bg-[#181e2e] ${
                          isEquipped ? 'ring-2 ring-emerald-500 bg-emerald-950/20' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          {item.image && (
                            <div className="relative w-11 h-11 border border-black overflow-hidden shrink-0 shadow-[1px_1px_0_#000] bg-black">
                              <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                          )}
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="text-[9px] font-black uppercase px-1.5 py-0.2 border border-black text-black shrink-0"
                                style={{ backgroundColor: itemColor }}
                              >
                                {item.rank}
                              </span>
                              <h5 className="font-extrabold text-xs text-white truncate" style={{ color: itemColor }}>
                                {item.name}
                              </h5>
                              {item.enhanceLevel ? (
                                <span className="text-[9px] font-mono text-amber-400 font-black">
                                  +{item.enhanceLevel}
                                </span>
                              ) : null}
                            </div>

                            {/* Stat details & Item Combat Power */}
                            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-300 mt-1">
                              <span className="text-[#00f0ff] font-black">
                                ⚡ +{itemCp.toLocaleString()} CP
                              </span>
                              {item.stats.atk ? <span>ATK +{item.stats.atk}</span> : null}
                              {item.stats.hp ? <span>HP +{item.stats.hp}</span> : null}
                              {item.stats.def ? <span>DEF +{item.stats.def}</span> : null}
                              {item.stats.critRate ? <span>CRIT +{Math.round(item.stats.critRate * 100)}%</span> : null}
                            </div>

                            {/* CP Comparison indicator vs currently equipped item */}
                            {!isEquipped && (
                              <div className="mt-1 text-[9px] font-mono font-bold flex items-center gap-1">
                                {!currentItem ? (
                                  <span className="text-[#10ffa0] flex items-center gap-0.5">
                                    <TrendingUp className="w-3 h-3" /> Tăng +{itemCp.toLocaleString()} CP vào thẻ
                                  </span>
                                ) : cpDiff > 0 ? (
                                  <span className="text-[#10ffa0] flex items-center gap-0.5">
                                    <TrendingUp className="w-3 h-3" /> Tăng thêm +{cpDiff.toLocaleString()} CP so với đồ hiện tại
                                  </span>
                                ) : cpDiff < 0 ? (
                                  <span className="text-rose-400 flex items-center gap-0.5">
                                    <TrendingDown className="w-3 h-3" /> Giảm -{Math.abs(cpDiff).toLocaleString()} CP so với đồ hiện tại
                                  </span>
                                ) : (
                                  <span className="text-slate-400">= CP tương đương món đang mặc</span>
                                )}
                              </div>
                            )}

                            {item.exclusivePerk && (
                              <p className="text-[9px] text-[#f59e0b] mt-0.5 truncate max-w-sm">
                                ★ {item.exclusivePerk.name}: {item.exclusivePerk.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="shrink-0">
                          {isEquipped ? (
                            <span className="flex items-center gap-1 text-emerald-400 text-xs font-black px-2.5 py-1.5 bg-emerald-950/60 border border-emerald-500 shadow-[1px_1px_0_#000]">
                              <Check className="w-4 h-4" /> ĐANG DÙNG
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                sound.playCritImpact();
                                onEquipItem(card.id, selectedSlot, item);
                              }}
                              className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-400 to-[#00f0ff] hover:from-cyan-300 hover:to-white text-black font-black uppercase text-xs border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1"
                            >
                              <span>GẮN VÀO THẺ</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800 text-[10px] text-slate-400 font-mono flex flex-col sm:flex-row justify-between gap-1">
              <span>💡 Mẹo: Gắn đủ bộ 2, 4 hoặc 6 món cùng Rank sẽ kích hoạt Set Bonus tăng từ +8,000 đến +180,000 CP!</span>
              <span className="text-[#10ffa0] font-bold">🟢 Tự động đồng bộ Server PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
