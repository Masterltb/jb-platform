'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { EquipmentItem, CharacterCard, EquipmentSet, CardRarity, EvolutionMaterial, getHeroAscensionInfo, calculateItemCombatPower } from '@/types/game';
import { EQUIPMENT_SETS, EVOLUTION_MATERIALS_DEFAULT } from '@/data/mockGameData';
import { Shield, Swords, Zap, Sparkles, Star, ArrowUpCircle, Hammer, Award, RefreshCw, Check, Flame, Trash2, Layers, AlertCircle, Sparkle, Sun, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/utils/soundEffects';
import { gameApi } from '@/services/gameApiClient';

interface InventoryAndUpgradeViewProps {
  inventory: EquipmentItem[];
  squad: CharacterCard[];
  gold: number;
  diamonds: number;
  evolutionMaterials?: EvolutionMaterial[];
  onConsumeEvolutionMaterial?: (matId: string, count: number) => boolean;
  onUpdateInventoryItem: (updatedItem: EquipmentItem) => void;
  onUpdateCharacter: (updatedCard: CharacterCard) => void;
  onDeductGold: (amount: number) => boolean;
  onDeductDiamonds: (amount: number) => boolean;
  onAddGold?: (amount: number) => void;
  onAddDiamonds?: (amount: number) => void;
  onRemoveInventoryItems?: (itemIds: string[]) => void;
  onAddInventoryItem?: (item: EquipmentItem) => void;
}

export const InventoryAndUpgradeView: React.FC<InventoryAndUpgradeViewProps> = ({
  inventory,
  squad,
  gold,
  diamonds,
  evolutionMaterials,
  onConsumeEvolutionMaterial,
  onUpdateInventoryItem,
  onUpdateCharacter,
  onDeductGold,
  onDeductDiamonds,
  onAddGold,
  onAddDiamonds,
  onRemoveInventoryItems,
  onAddInventoryItem
}) => {
  const [subTab, setSubTab] = useState<'inventory' | 'fusion' | 'dismantle' | 'sets' | 'heroes'>('inventory');
  const [selectedItem, setSelectedItem] = useState<EquipmentItem>(inventory[0] || ({} as EquipmentItem));
  const [selectedHero, setSelectedHero] = useState<CharacterCard>(squad[0]);

  // Fusion & Dismantle states
  const [fusionSelectedIds, setFusionSelectedIds] = useState<string[]>([]);
  const [dismantleSelectedIds, setDismantleSelectedIds] = useState<string[]>([]);

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

  const getAuraClass = (rank: string) => {
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

  // Enhance Equipment Handler
  const handleEnhanceItem = async () => {
    const currentEnhance = selectedItem.enhanceLevel || 0;
    if (currentEnhance >= 20) {
      alert('Trang bị này đã đạt cấp cường hóa tối đa (+20)!');
      return;
    }

    const costGold = (currentEnhance + 1) * 8000;
    if (gold < costGold) {
      alert(`Không đủ Vàng để cường hóa! Cần ${costGold.toLocaleString()} 🪙.`);
      return;
    }

    sound.playCritImpact();

    try {
      const res = await gameApi.enhanceItem(selectedItem.id);
      if (res && res.item) {
        onDeductGold(costGold);
        setSelectedItem(res.item);
        onUpdateInventoryItem(res.item);
        try {
          confetti({ particleCount: 70, spread: 60 });
        } catch {}
        return;
      }
    } catch (apiErr: any) {
      console.warn('Backend enhance error, using client calculation:', apiErr.message);
    }

    // Client fallback
    onDeductGold(costGold);
    const updated: EquipmentItem = {
      ...selectedItem,
      enhanceLevel: currentEnhance + 1,
      stats: {
        ...selectedItem.stats,
        atk: selectedItem.stats.atk ? Math.round(selectedItem.stats.atk * 1.1) : undefined,
        hp: selectedItem.stats.hp ? Math.round(selectedItem.stats.hp * 1.1) : undefined,
        def: selectedItem.stats.def ? Math.round(selectedItem.stats.def * 1.1) : undefined
      }
    };

    setSelectedItem(updated);
    onUpdateInventoryItem(updated);

    try {
      confetti({ particleCount: 60, spread: 50 });
    } catch {}
  };

  const [localMaterials, setLocalMaterials] = useState<EvolutionMaterial[]>(evolutionMaterials || EVOLUTION_MATERIALS_DEFAULT);

  React.useEffect(() => {
    if (evolutionMaterials && evolutionMaterials.length > 0) {
      setLocalMaterials(evolutionMaterials);
    }
  }, [evolutionMaterials]);

  const ASCENSION_TIER_REQUIREMENTS: Record<number, {
    tier: number;
    title: string;
    realm: 'Star' | 'Moon' | 'Sun';
    symbol: string;
    count: number;
    matId: string;
    matName: string;
    matCount: number;
    icon: string;
    diamonds: number;
    cpMultiplier: number;
  }> = {
    // STAR REALM (1★ -> 6★)
    2: { tier: 2, title: '2 Sao Tinh Anh', realm: 'Star', symbol: '⭐', count: 2, matId: 'mat_evo_common', matName: 'Đá Tiến Hóa Sơ Cấp', matCount: 50, icon: '🪨', diamonds: 200, cpMultiplier: 1.25 },
    3: { tier: 3, title: '3 Sao Dũng Sĩ', realm: 'Star', symbol: '⭐', count: 3, matId: 'mat_evo_fine', matName: 'Đá Tinh Chế Lam', matCount: 150, icon: '💎', diamonds: 400, cpMultiplier: 1.30 },
    4: { tier: 4, title: '4 Sao Tướng Quân', realm: 'Star', symbol: '⭐', count: 4, matId: 'mat_evo_rare', matName: 'Tinh Thể Huyền Lam', matCount: 300, icon: '🔮', diamonds: 600, cpMultiplier: 1.35 },
    5: { tier: 5, title: '5 Sao Thống Soái', realm: 'Star', symbol: '⭐', count: 5, matId: 'mat_evo_epic', matName: 'Linh Ngọc Tím Thạch Anh', matCount: 600, icon: '💜', diamonds: 1000, cpMultiplier: 1.40 },
    6: { tier: 6, title: '6 Sao Cực Hạn (Chạm Đỉnh Sao)', realm: 'Star', symbol: '⭐', count: 6, matId: 'mat_evo_legendary', matName: 'Huyết Tinh Huyền Thoại', matCount: 1200, icon: '🌟', diamonds: 1500, cpMultiplier: 1.50 },

    // MOON REALM (1🌙 -> 6🌙)
    7: { tier: 7, title: '1 Trăng Tân Nguyệt (Đột Phá Nguyệt Giới)', realm: 'Moon', symbol: '🌙', count: 1, matId: 'mat_evo_legendary', matName: 'Huyết Tinh Huyền Thoại', matCount: 1500, icon: '🌙', diamonds: 2500, cpMultiplier: 1.60 },
    8: { tier: 8, title: '2 Trăng Thượng Huyền', realm: 'Moon', symbol: '🌙', count: 2, matId: 'mat_evo_legendary', matName: 'Huyết Tinh Huyền Thoại', matCount: 1800, icon: '🌙', diamonds: 3000, cpMultiplier: 1.30 },
    9: { tier: 9, title: '3 Trăng Bán Nguyệt', realm: 'Moon', symbol: '🌙', count: 3, matId: 'mat_evo_legendary', matName: 'Huyết Tinh Huyền Thoại', matCount: 2200, icon: '🌙', diamonds: 3500, cpMultiplier: 1.30 },
    10: { tier: 10, title: '4 Trăng Trương Huyền', realm: 'Moon', symbol: '🌙', count: 4, matId: 'mat_evo_legendary', matName: 'Huyết Tinh Huyền Thoại', matCount: 2600, icon: '🌙', diamonds: 4000, cpMultiplier: 1.35 },
    11: { tier: 11, title: '5 Trăng Viên Nguyệt', realm: 'Moon', symbol: '🌙', count: 5, matId: 'mat_evo_legendary', matName: 'Huyết Tinh Huyền Thoại', matCount: 3000, icon: '🌙', diamonds: 4500, cpMultiplier: 1.40 },
    12: { tier: 12, title: '6 Trăng Nguyệt Hoàng (Chạm Đỉnh Trăng)', realm: 'Moon', symbol: '🌙', count: 6, matId: 'mat_evo_legendary', matName: 'Huyết Tinh Huyền Thoại', matCount: 4000, icon: '🌙', diamonds: 5500, cpMultiplier: 1.55 },

    // SUN REALM (1☀️ -> 6☀️)
    13: { tier: 13, title: '1 Trời Sơ Dương (Đột Phá Thái Dương)', realm: 'Sun', symbol: '☀️', count: 1, matId: 'mat_evo_sovereign', matName: 'Ấn Ký Sovereign Vô Cực [1-of-1]', matCount: 1, icon: '☀️', diamonds: 6000, cpMultiplier: 1.80 },
    14: { tier: 14, title: '2 Trời Triều Dương', realm: 'Sun', symbol: '☀️', count: 2, matId: 'mat_evo_sovereign', matName: 'Ấn Ký Sovereign Vô Cực [1-of-1]', matCount: 1, icon: '☀️', diamonds: 8000, cpMultiplier: 1.40 },
    15: { tier: 15, title: '3 Trời Liệt Dương', realm: 'Sun', symbol: '☀️', count: 3, matId: 'mat_evo_sovereign', matName: 'Ấn Ký Sovereign Vô Cực [1-of-1]', matCount: 2, icon: '☀️', diamonds: 10000, cpMultiplier: 1.45 },
    16: { tier: 16, title: '4 Trời Hạo Dương', realm: 'Sun', symbol: '☀️', count: 4, matId: 'mat_evo_sovereign', matName: 'Ấn Ký Sovereign Vô Cực [1-of-1]', matCount: 2, icon: '☀️', diamonds: 12000, cpMultiplier: 1.50 },
    17: { tier: 17, title: '5 Trời Cực Dương', realm: 'Sun', symbol: '☀️', count: 5, matId: 'mat_evo_sovereign', matName: 'Ấn Ký Sovereign Vô Cực [1-of-1]', matCount: 3, icon: '☀️', diamonds: 15000, cpMultiplier: 1.60 },
    18: { tier: 18, title: '6 Trời Thái Dương Tối Cao (ĐẠT ĐỈNH SÁNG THẾ)', realm: 'Sun', symbol: '☀️', count: 6, matId: 'mat_evo_sovereign', matName: 'Ấn Ký Sovereign Vô Cực [1-of-1]', matCount: 5, icon: '👑', diamonds: 25000, cpMultiplier: 2.50 }
  };

  // 3-Realm Ascension Hero Handler (FEAT-013: 6 Stars -> 6 Moons -> 6 Suns)
  const handleStarUpHero = () => {
    const currentAscension = getHeroAscensionInfo(selectedHero);
    if (currentAscension.tierNumber >= 18) {
      alert('Tướng đã đạt cảnh giới Thái Dương Tối Cao tối thượng (6☀️ - Sáng Thế Vô Song)!');
      return;
    }

    const nextTier = currentAscension.tierNumber + 1;
    const req = ASCENSION_TIER_REQUIREMENTS[nextTier] || ASCENSION_TIER_REQUIREMENTS[2];
    const userMat = localMaterials.find(m => m.id === req.matId);
    const currentQty = userMat ? userMat.count : 0;

    if (currentQty < req.matCount) {
      alert(`Thiếu nguyên liệu tiến hóa! Cần ${req.matCount}x ${req.matName} (Hiện có: ${currentQty}). Hãy mở hòm Gacha hoặc săn Boss Thế Giới để thu thập thêm!`);
      return;
    }

    if (!onDeductDiamonds(req.diamonds)) {
      alert(`Không đủ Kim Cương! Cần ${req.diamonds.toLocaleString()} 💎 để nâng cấp.`);
      return;
    }

    // Deduct material
    if (onConsumeEvolutionMaterial) {
      onConsumeEvolutionMaterial(req.matId, req.matCount);
    }
    setLocalMaterials(prev => prev.map(m => m.id === req.matId ? { ...m, count: m.count - req.matCount } : m));

    sound.playBuffSound();
    const isAwakened = nextTier >= 6;
    const isSixSuns = nextTier === 18;

    let targetRealm: 'Star' | 'Moon' | 'Sun' = req.realm;
    let targetRank: CardRarity = selectedHero.rank;
    if (nextTier >= 13) {
      targetRank = 'Sovereign';
    } else if (nextTier >= 7) {
      targetRank = 'Mythic';
    }

    const updatedHero: CharacterCard = {
      ...selectedHero,
      ascensionTier: nextTier,
      tierRealm: targetRealm,
      stars: nextTier <= 6 ? nextTier : 6,
      moons: nextTier >= 7 && nextTier <= 12 ? nextTier - 6 : (nextTier > 12 ? 6 : undefined),
      suns: nextTier >= 13 ? nextTier - 12 : undefined,
      isAwakened,
      rank: targetRank,
      atk: Math.round(selectedHero.atk * req.cpMultiplier),
      maxHp: Math.round(selectedHero.maxHp * req.cpMultiplier),
      currentHp: Math.round(selectedHero.maxHp * req.cpMultiplier),
      totalCombatPower: Math.round(selectedHero.totalCombatPower * req.cpMultiplier)
    };

    setSelectedHero(updatedHero);
    onUpdateCharacter(updatedHero);

    if (isSixSuns) {
      sound.playCritImpact();
      try {
        confetti({ particleCount: 300, spread: 150, origin: { y: 0.5 } });
      } catch {}
      alert(`☀️☀️☀️☀️☀️☀️ ĐỘT PHÁ CỰC HẠN THÀNH CÔNG: [${updatedHero.name}] đã đạt 6 MẶT TRỜI TỐI CAO! Kích hoạt Hào Quang Thái Dương Sáng Thế vô song!`);
    } else if (nextTier === 13) {
      sound.playCritImpact();
      try {
        confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
      } catch {}
      alert(`☀️ ĐỘT PHÁ THÁI DƯƠNG THÀNH CÔNG: [${updatedHero.name}] chính thức bước vào Cảnh Giới Thái Dương (1☀️)!`);
    } else if (nextTier === 7) {
      sound.playCritImpact();
      try {
        confetti({ particleCount: 150, spread: 90 });
      } catch {}
      alert(`🌙 ĐỘT PHÁ NGUYỆT GIỚI THÀNH CÔNG: [${updatedHero.name}] chính thức bước vào Cảnh Giới Huyền Nguyệt (1🌙)!`);
    } else {
      try {
        confetti({ particleCount: 80, spread: 70 });
      } catch {}
    }
  };

  // Next rarity mapping from FEAT-007
  const NEXT_RARITY: Record<CardRarity, CardRarity | null> = {
    Common: 'Fine',
    Fine: 'Rare',
    Rare: 'Epic',
    Epic: 'Legendary',
    Legendary: 'Mythic',
    Mythic: null,
    Sovereign: null
  };

  const DISMANTLE_YIELD: Record<CardRarity, { gold: number; stones: number; diamonds: number }> = {
    Common: { gold: 100, stones: 1, diamonds: 0 },
    Fine: { gold: 300, stones: 3, diamonds: 0 },
    Rare: { gold: 1000, stones: 8, diamonds: 0 },
    Epic: { gold: 3500, stones: 20, diamonds: 10 },
    Legendary: { gold: 12000, stones: 50, diamonds: 50 },
    Mythic: { gold: 40000, stones: 150, diamonds: 200 },
    Sovereign: { gold: 0, stones: 0, diamonds: 0 }
  };

  // Fusion Execute Handler (3 items -> 1 next tier)
  const handleExecuteFusion = async () => {
    const selectedItems = inventory.filter(i => fusionSelectedIds.includes(i.id));
    if (selectedItems.length !== 3) {
      alert('Vui lòng chọn chính xác 3 món trang bị để tiến hành Dung Luyện Ghép!');
      return;
    }
    const firstRank = selectedItems[0]?.rank;
    if (!firstRank || !selectedItems.every(i => i.rank === firstRank)) {
      alert('Cả 3 trang bị phải cùng Phẩm cấp (Rarity) mới có thể hợp nhất!');
      return;
    }
    const targetRank = NEXT_RARITY[firstRank];
    if (!targetRank) {
      alert(`Không thể ghép trang bị cấp ${firstRank}!`);
      return;
    }
    const fusionCost = 5000;
    if (gold < fusionCost) {
      alert(`Không đủ Vàng để Dung Luyện! Cần ${fusionCost.toLocaleString()} 🪙.`);
      return;
    }

    try {
      // Backend transaction authority
      const res = await gameApi.fuseItems(fusionSelectedIds);
      if (res && res.fusedItem) {
        onDeductGold(fusionCost);
        onRemoveInventoryItems?.(fusionSelectedIds);
        onAddInventoryItem?.(res.fusedItem);
        setFusionSelectedIds([]);
        sound.playCritImpact();
        try {
          confetti({ particleCount: 150, spread: 90 });
        } catch {}
        alert(`🎉 CHÚC MỪNG: Server đã chứng thực tạo tác thành công [${res.fusedItem.name}] (${res.fusedItem.rank})!`);
        return;
      }
    } catch (apiErr: any) {
      console.warn('Backend fusion error, falling back to local:', apiErr.message);
    }

    // Client fallback
    onDeductGold(fusionCost);
    const baseSlot = selectedItems[0]?.slot || 'Weapon';
    const newItem: EquipmentItem = {
      id: `fused_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: `${targetRank === 'Fine' ? 'Tinh Chế' : targetRank === 'Rare' ? 'Huyền Thiết' : targetRank === 'Epic' ? 'Đột Biến Cyber' : targetRank === 'Legendary' ? 'Thần Binh Titan' : 'Lôi Thần Phá Không'} ${selectedItems[0]?.name.split(': ').pop() || selectedItems[0]?.name}`,
      slot: baseSlot,
      rank: targetRank,
      level: 20,
      maxLevel: targetRank === 'Mythic' ? 80 : targetRank === 'Legendary' ? 60 : 50,
      enhanceLevel: 0,
      stats: {
        atk: baseSlot === 'Weapon' ? (targetRank === 'Fine' ? 280 : targetRank === 'Rare' ? 680 : targetRank === 'Epic' ? 1450 : targetRank === 'Legendary' ? 3200 : 6800) : undefined,
        hp: baseSlot !== 'Weapon' ? (targetRank === 'Fine' ? 1000 : targetRank === 'Rare' ? 2500 : targetRank === 'Epic' ? 5500 : targetRank === 'Legendary' ? 12000 : 24000) : undefined,
        def: baseSlot !== 'Weapon' ? (targetRank === 'Fine' ? 80 : targetRank === 'Rare' ? 220 : targetRank === 'Epic' ? 520 : targetRank === 'Legendary' ? 1100 : 2200) : undefined,
        critRate: targetRank === 'Legendary' || targetRank === 'Mythic' ? 0.15 : 0.05
      },
      image: selectedItems[0]?.image,
      colorHex: getRankColor(targetRank)
    };

    onRemoveInventoryItems?.(fusionSelectedIds);
    onAddInventoryItem?.(newItem);
    setFusionSelectedIds([]);
    sound.playCritImpact();
    try {
      confetti({ particleCount: 150, spread: 90 });
    } catch {}
    alert(`🎉 CHÚC MỪNG: Dung luyện thành công [${newItem.name}] (${newItem.rank})!`);
  };

  // Dismantle Execute Handler
  const handleExecuteDismantle = async () => {
    const selectedItems = inventory.filter(i => dismantleSelectedIds.includes(i.id));
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất 1 trang bị để phân rã!');
      return;
    }

    try {
      const res = await gameApi.dismantleItems(dismantleSelectedIds);
      if (res && res.gainedGold !== undefined) {
        onRemoveInventoryItems?.(dismantleSelectedIds);
        if (res.gainedGold > 0) onAddGold?.(res.gainedGold);
        if (res.gainedDiamonds > 0) onAddDiamonds?.(res.gainedDiamonds);
        setDismantleSelectedIds([]);
        sound.playCardWhoosh();
        alert(`♻️ Server đã phân rã thành công ${selectedItems.length} trang bị! Thu được +${res.gainedGold.toLocaleString()} Vàng, +${res.gainedDiamonds.toLocaleString()} Kim Cương.`);
        return;
      }
    } catch (apiErr: any) {
      console.warn('Backend dismantle error, falling back locally:', apiErr.message);
    }

    let totalGold = 0;
    let totalDiamonds = 0;
    let totalStones = 0;
    for (const item of selectedItems) {
      if (item.rank === 'Sovereign') continue;
      const y = DISMANTLE_YIELD[item.rank] || { gold: 100, stones: 1, diamonds: 0 };
      totalGold += y.gold;
      totalDiamonds += y.diamonds;
      totalStones += y.stones;
    }
    onRemoveInventoryItems?.(dismantleSelectedIds);
    if (totalGold > 0) onAddGold?.(totalGold);
    if (totalDiamonds > 0) onAddDiamonds?.(totalDiamonds);
    setDismantleSelectedIds([]);
    sound.playCardWhoosh();
    alert(`♻️ Đã phân rã ${selectedItems.length} trang bị! Thu được +${totalGold.toLocaleString()} Vàng, +${totalDiamonds} Kim Cương, +${totalStones} Đá Cường Hóa.`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-3 md:p-6 space-y-4 font-sans">
      {/* Sub-tab Navigation */}
      <div className="bg-[#10141f] border-2 border-black p-2 flex flex-wrap items-center justify-between gap-3 shadow-[4px_4px_0_#000]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSubTab('inventory')}
            className={`px-3 py-2 font-black text-xs uppercase border border-black transition-all ${
              subTab === 'inventory'
                ? 'bg-[#00f0ff] text-black shadow-[2px_2px_0_#000]'
                : 'bg-[#1a2030] text-slate-400 hover:text-white'
            }`}
          >
            TÚI ĐỒ & CƯỜNG HÓA
          </button>

          <button
            onClick={() => setSubTab('fusion')}
            className={`px-3 py-2 font-black text-xs uppercase border border-black transition-all flex items-center gap-1.5 ${
              subTab === 'fusion'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[2px_2px_0_#000]'
                : 'bg-[#1a2030] text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>LÒ GHÉP (FUSION)</span>
          </button>

          <button
            onClick={() => setSubTab('dismantle')}
            className={`px-3 py-2 font-black text-xs uppercase border border-black transition-all flex items-center gap-1.5 ${
              subTab === 'dismantle'
                ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-[2px_2px_0_#000]'
                : 'bg-[#1a2030] text-slate-400 hover:text-white'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-300" />
            <span>PHÂN RÃ ĐỒ</span>
          </button>

          <button
            onClick={() => setSubTab('sets')}
            className={`px-3 py-2 font-black text-xs uppercase border border-black transition-all ${
              subTab === 'sets'
                ? 'bg-[#ff007f] text-white shadow-[2px_2px_0_#000]'
                : 'bg-[#1a2030] text-slate-400 hover:text-white'
            }`}
          >
            FULL SET ĐỘC QUYỀN
          </button>

          <button
            onClick={() => setSubTab('heroes')}
            className={`px-3 py-2 font-black text-xs uppercase border border-black transition-all ${
              subTab === 'heroes'
                ? 'bg-[#f59e0b] text-black shadow-[2px_2px_0_#000]'
                : 'bg-[#1a2030] text-slate-400 hover:text-white'
            }`}
          >
            TIẾN HÓA TƯỚNG (1★-6★)
          </button>
        </div>

        {/* Currency summary */}
        <div className="flex items-center gap-3 text-xs font-mono font-bold">
          <span className="text-yellow-400 font-mono">🪙 {gold.toLocaleString()} Vàng</span>
          <span className="text-cyan-400 font-mono">💎 {diamonds.toLocaleString()} KC</span>
        </div>
      </div>

      {/* SUB-TAB 1: INVENTORY & ENHANCE */}
      {subTab === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Grid: Inventory Items (7 cols) */}
          <div className="lg:col-span-7 bg-[#10141f] border-4 border-black p-4 shadow-[6px_6px_0_#000]">
            <div className="border-b-2 border-black pb-2 mb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00f0ff]" />
                KHO TRANG BỊ TOÀN NĂNG ({inventory.length} MÓN)
              </h3>
              <span className="text-xs text-slate-400 font-mono">Chọn món để nâng cấp</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
              {inventory.map(item => {
                const isSelected = selectedItem?.id === item.id;
                const itemColor = getRankColor(item.rank);

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      sound.playCardWhoosh();
                      setSelectedItem(item);
                    }}
                    className={`p-2.5 rounded-sm border-2 cursor-pointer transition-all bg-[#121622] flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#00f0ff] ring-2 ring-[#00f0ff] shadow-[3px_3px_0_#000] scale-[1.02]'
                        : 'border-black hover:border-slate-500'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[9px] mb-1">
                        <span
                          className="font-black uppercase px-1 py-0.2 rounded text-black"
                          style={{ backgroundColor: itemColor }}
                        >
                          {item.rank}
                        </span>
                        {item.enhanceLevel && item.enhanceLevel > 0 && (
                          <span className="font-mono font-black text-amber-400">
                            +{item.enhanceLevel}
                          </span>
                        )}
                      </div>

                      {item.image ? (
                        <div className="relative w-full h-16 rounded overflow-hidden border border-black my-1 bg-black/40">
                          <Image src={item.image} alt={item.name} fill sizes="120px" className="object-contain" />
                        </div>
                      ) : (
                        <div className="w-full h-16 bg-black/40 rounded flex items-center justify-center text-3xl my-1">
                          🗡️
                        </div>
                      )}

                      <h5 className="font-black text-xs text-white truncate" style={{ color: itemColor }}>
                        {item.name}
                      </h5>
                    </div>

                    <div className="border-t border-slate-800 pt-1 text-[9px] font-mono flex items-center justify-between">
                      <span className="text-[#00f0ff] font-bold">⚡ +{calculateItemCombatPower(item).toLocaleString()} CP</span>
                      <span className="text-slate-400">{item.slot}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Selected Item Inspector & Enhance Anvil (5 cols) */}
          <div className="lg:col-span-5 bg-[#10141f] border-4 border-black p-5 shadow-[6px_6px_0_#000] flex flex-col justify-between">
            <div>
              <div className="border-b-2 border-black pb-3 mb-3">
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                  BÀN RÈN CƯỜNG HÓA
                </span>
                <h3
                  className="text-lg font-black uppercase"
                  style={{ color: getRankColor(selectedItem.rank) }}
                >
                  {selectedItem.name}{' '}
                  {selectedItem.enhanceLevel ? `(+${selectedItem.enhanceLevel})` : '(+0)'}
                </h3>
                <div className="flex items-center justify-between mt-1 text-xs text-slate-400">
                  <span>
                    Phẩm chất: <strong style={{ color: getRankColor(selectedItem.rank) }}>{selectedItem.rank}</strong> • Vị trí: {selectedItem.slot}
                  </span>
                  <span className="text-amber-400 font-mono font-black text-xs bg-black/60 px-2 py-0.5 rounded border border-amber-500/50">
                    ⚡ +{calculateItemCombatPower(selectedItem).toLocaleString()} CP
                  </span>
                </div>
              </div>

              {/* Item Artwork Showcase on Anvil */}
              <div className="relative w-full h-36 bg-black/60 border-2 border-black rounded mb-3 flex items-center justify-center overflow-hidden">
                {selectedItem.image ? (
                  <div className="relative w-28 h-28 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    <Image src={selectedItem.image} alt={selectedItem.name} fill sizes="112px" className="object-contain" priority />
                  </div>
                ) : (
                  <div className="text-6xl">🗡️</div>
                )}
              </div>

              {/* Stats Breakdown */}
              <div className="bg-[#0a0d14] border-2 border-black p-3 space-y-2 mb-4">
                <h5 className="text-xs font-black text-slate-300 uppercase">Chỉ Số Hiện Tại:</h5>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {selectedItem.stats.atk && (
                    <div className="bg-black/60 p-2 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">TẤN CÔNG (ATK):</span>
                      <span className="text-red-400 font-bold text-sm">+{selectedItem.stats.atk}</span>
                    </div>
                  )}
                  {selectedItem.stats.hp && (
                    <div className="bg-black/60 p-2 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">SINH LỰC (HP):</span>
                      <span className="text-green-400 font-bold text-sm">+{selectedItem.stats.hp}</span>
                    </div>
                  )}
                  {selectedItem.stats.def && (
                    <div className="bg-black/60 p-2 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">PHÒNG THỦ (DEF):</span>
                      <span className="text-blue-400 font-bold text-sm">+{selectedItem.stats.def}</span>
                    </div>
                  )}
                  {selectedItem.stats.critRate && (
                    <div className="bg-black/60 p-2 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">TỈ LỆ CHÍ MẠNG:</span>
                      <span className="text-yellow-400 font-bold text-sm">+{Math.round(selectedItem.stats.critRate * 100)}%</span>
                    </div>
                  )}
                </div>

                {selectedItem.exclusivePerk && (
                  <div className="bg-amber-950/40 border border-amber-600/60 p-2 mt-2">
                    <span className="text-[10px] font-black text-amber-300 block uppercase">
                      ★ Perk Độc Quyền: {selectedItem.exclusivePerk.name}
                    </span>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {selectedItem.exclusivePerk.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Enhance Button */}
            <div className="border-t-2 border-black pt-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-slate-300">Chi Phí Cường Hóa:</span>
                <span className="text-yellow-400">
                  {((selectedItem.enhanceLevel || 0) + 1) * 8000} 🪙 Vàng
                </span>
              </div>
              <button
                onClick={handleEnhanceItem}
                className="w-full bg-[#f59e0b] hover:bg-amber-400 text-black font-black py-3 px-4 border-2 border-black shadow-[3px_3px_0_#000] flex items-center justify-center gap-2 uppercase tracking-wider text-sm transition-transform active:translate-x-0.5 active:translate-y-0.5"
              >
                <Hammer className="w-4 h-4" />
                <span>CƯỜNG HÓA LÊN +{(selectedItem.enhanceLevel || 0) + 1}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: FULL SETS (1 OF 1 & 10 OF 10) */}
      {subTab === 'sets' && (
        <div className="space-y-4">
          {EQUIPMENT_SETS.map(set => (
            <div
              key={set.id}
              className="bg-[#10141f] border-4 border-black p-5 shadow-[6px_6px_0_#000] space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-black uppercase px-2 py-0.5 border border-black shadow-[2px_2px_0_#000]"
                      style={{ backgroundColor: getRankColor(set.rank), color: '#000' }}
                    >
                      {set.serverLimit.replace(/_/g, ' ')}
                    </span>
                    <h3 className="text-lg md:text-xl font-black text-white uppercase">
                      {set.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{set.description}</p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 bg-black/60 px-2.5 py-1 border border-amber-500/40">
                  Số Món: {set.items.length}/6 Món
                </span>
              </div>

              {/* 6 Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {set.items.map(item => (
                  <div
                    key={item.id}
                    className="bg-[#0a0d14] border-2 border-black p-2 rounded-sm text-center shadow-[2px_2px_0_#000]"
                    style={{ borderColor: getRankColor(item.rank) }}
                  >
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">
                      {item.slot}
                    </span>
                    {item.image ? (
                      <div className="relative w-full h-16 rounded overflow-hidden border border-black my-1">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-full h-16 bg-black/40 rounded flex items-center justify-center text-3xl my-1">
                        🗡️
                      </div>
                    )}
                    <p className="text-[10px] font-black text-white truncate" style={{ color: getRankColor(item.rank) }}>
                      {item.name}
                    </p>
                    <span className="text-[9px] font-mono text-amber-400">
                      +{item.enhanceLevel || 0}
                    </span>
                  </div>
                ))}
              </div>

              {/* Set Bonuses */}
              <div className="bg-[#0a0d14] border border-black p-3 space-y-1.5 mt-2">
                <span className="text-xs font-black text-amber-400 uppercase block mb-1">
                  KÍCH HOẠT HIỆU ỨNG BỘ TRANG BỊ:
                </span>
                {set.setBonuses.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <span className="text-emerald-400 font-bold bg-emerald-950 px-1.5 py-0.2 border border-emerald-500 text-[10px]">
                      {b.piecesRequired} MÓN:
                    </span>
                    <span className="text-slate-200">{b.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 3: HERO STAR-UP & TALENTS */}
      {subTab === 'heroes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Heroes List (5 cols) */}
          <div className="lg:col-span-5 bg-[#10141f] border-4 border-black p-4 shadow-[6px_6px_0_#000]">
            <h3 className="text-sm font-black text-white uppercase border-b-2 border-black pb-2 mb-3">
              DANH SÁCH 6 THẺ TƯỚNG
            </h3>
            <div className="space-y-2">
              {squad.map(card => {
                const isSelected = selectedHero.id === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => {
                      sound.playCardWhoosh();
                      setSelectedHero(card);
                    }}
                    className={`p-2.5 rounded-sm border-2 cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#1a2030] border-[#00f0ff] shadow-[2px_2px_0_#000]'
                        : 'bg-[#121622] border-black hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded border border-black flex items-center justify-center text-xl bg-black/60">
                        {card.avatarIcon}
                      </div>
                      <div>
                        <h5 className="font-extrabold text-xs text-white">{card.name}</h5>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {(() => {
                            const heroAsc = getHeroAscensionInfo(card);
                            return (
                              <span className="text-[10px] font-mono leading-none" title={heroAsc.realmTitle}>
                                {heroAsc.fullDisplay}
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-xs font-bold text-[#00f0ff] block">
                        CP {card.totalCombatPower.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400">Lv.{card.level}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hero Star-up Panel (7 cols) */}
          <div className={`lg:col-span-7 bg-[#10141f] border-4 border-black p-5 shadow-[6px_6px_0_#000] flex flex-col justify-between ${
            getHeroAscensionInfo(selectedHero).isSixSuns ? 'aura-six-suns-supreme' : ''
          }`}>
            <div>
              <div className="border-b-2 border-black pb-3 mb-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-white uppercase">{selectedHero.name}</h3>
                    {getHeroAscensionInfo(selectedHero).isSixSuns && (
                      <span className="badge-six-suns text-[9px] px-2 py-0.5 rounded uppercase font-black">
                        ☀️ 6 THÁI DƯƠNG TỐI CAO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    {selectedHero.role} • Vị trí: {selectedHero.position} • Cảnh Giới: <strong className="text-amber-400">{getHeroAscensionInfo(selectedHero).realmTitle}</strong>
                  </p>
                </div>
                <div className="text-base font-mono">
                  {getHeroAscensionInfo(selectedHero).fullDisplay}
                </div>
              </div>

              {/* Hero Stats */}
              <div className="bg-[#0a0d14] border-2 border-black p-3 space-y-2 mb-4">
                <h5 className="text-xs font-black text-slate-300 uppercase">Chỉ Số Sức Mạnh:</h5>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-black/60 p-2 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">TẤN CÔNG (ATK):</span>
                    <span className="text-red-400 font-bold">{selectedHero.atk.toLocaleString()}</span>
                  </div>
                  <div className="bg-black/60 p-2 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">SINH LỰC (HP):</span>
                    <span className="text-green-400 font-bold">{selectedHero.maxHp.toLocaleString()}</span>
                  </div>
                  <div className="bg-black/60 p-2 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">PHÒNG THỦ (DEF):</span>
                    <span className="text-blue-400 font-bold">{selectedHero.def.toLocaleString()}</span>
                  </div>
                  <div className="bg-black/60 p-2 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">LỰC CHIẾN (CP):</span>
                    <span className="text-yellow-400 font-bold">{selectedHero.totalCombatPower.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-purple-950/40 border border-purple-600/60 p-2 mt-2">
                  <span className="text-[10px] font-black text-purple-300 uppercase block">
                    Tuyệt Kỹ: {selectedHero.signatureSkill.name}
                  </span>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {selectedHero.signatureSkill.description}
                  </p>
                </div>
              </div>
            </div>

            {/* 3-Realm Ascension Action (FEAT-013: 6 Stars -> 6 Moons -> 6 Suns) */}
            <div className="border-t-2 border-black pt-3 space-y-2.5">
              {(() => {
                const currentAsc = getHeroAscensionInfo(selectedHero);
                const nextTier = currentAsc.tierNumber + 1;
                const isMax = currentAsc.tierNumber >= 18;
                const req = ASCENSION_TIER_REQUIREMENTS[nextTier] || ASCENSION_TIER_REQUIREMENTS[2];
                const userMat = localMaterials.find(m => m.id === req.matId);
                const currentQty = userMat ? userMat.count : 0;
                const hasEnough = currentQty >= req.matCount;

                if (isMax) {
                  return (
                    <div className="aura-six-suns-supreme bg-amber-950/80 border-2 border-amber-300 p-4 text-center rounded-sm space-y-1">
                      <span className="text-2xl animate-bounce block">☀️☀️☀️☀️☀️☀️</span>
                      <h4 className="text-sm font-black text-amber-300 uppercase tracking-wide">
                        ĐÃ ĐẠT CẢNH GIỚI THÁI DƯƠNG TỐI CAO (6☀️ - SÁNG THẾ VÔ SONG)!
                      </h4>
                      <p className="text-[11px] text-yellow-200">
                        Kích hoạt Hào Quang Thái Dương Độc Tôn. Sát thương bỏ qua 100% Giáp và Khiên Boss!
                      </p>
                    </div>
                  );
                }

                return (
                  <>
                    <div className="bg-[#0c101a] border-2 border-black p-2.5 flex items-center justify-between shadow-[2px_2px_0_#000]">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{req.icon}</span>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">
                            Nguyên Liệu Cần Để Đột Phá Lên {req.title}:
                          </span>
                          <span className="text-xs font-black text-white">{req.matName}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-mono block">Kho Hiện Có / Cần</span>
                        <span className={`text-xs font-mono font-black ${hasEnough ? 'text-emerald-400' : 'text-red-400'}`}>
                          {currentQty} / {req.matCount} Viên {hasEnough ? '✓ Đủ' : '✕ Thiếu'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono font-bold">
                      <span className="text-slate-300">Kim Cương Tiêu Hao:</span>
                      <span className="text-cyan-400">
                        {req.diamonds.toLocaleString()} 💎 Kim Cương
                      </span>
                    </div>

                    <button
                      onClick={handleStarUpHero}
                      className={`w-full py-3 px-4 border-2 border-black shadow-[3px_3px_0_#000] flex items-center justify-center gap-2 uppercase tracking-wider text-sm font-black transition-transform active:scale-95 ${
                        hasEnough
                          ? nextTier === 18
                            ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-black shadow-[0_0_15px_#f59e0b]'
                            : nextTier >= 13
                            ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white'
                            : nextTier >= 7
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                            : 'bg-[#ff0055] hover:bg-[#ff1a6b] text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      <ArrowUpCircle className="w-4 h-4" />
                      <span>
                        {nextTier === 18
                          ? '☀️ ĐẠT ĐỈNH 6☀️ (THÁI DƯƠNG TỐI CAO - SÁNG THẾ)'
                          : nextTier === 13
                          ? '☀️ ĐỘT PHÁ LÊN 1☀️ (THÁI DƯƠNG SÁNG THẾ)'
                          : nextTier === 7
                          ? '🌙 ĐỘT PHÁ LÊN 1🌙 (NGUYỆT GIỚI)'
                          : `TIẾN HÓA LÊN ${req.title}`}
                      </span>
                    </button>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: LÒ GHÉP TRANG BỊ (FUSION 3-INTO-1) */}
      {subTab === 'fusion' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Fusion Crucible & Slots (5 cols) */}
          <div className="lg:col-span-5 bg-[#10141f] border-4 border-black p-4 shadow-[6px_6px_0_#000] flex flex-col justify-between">
            <div>
              <div className="border-b-2 border-black pb-2 mb-3">
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                  BÍ THUẬT DUNG LUYỆN HUYỀN THIẾT
                </span>
                <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
                  LÒ DUNG LUYỆN (3 CÙNG CẤP LÊN 1 CẤP TRÊN)
                </h3>
              </div>

              {/* 3 Fusion Input Slots */}
              <div className="space-y-2 mb-4">
                <p className="text-xs text-slate-400 font-mono">
                  3 Trang Bị Nguyên Liệu ({fusionSelectedIds.length}/3):
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map(idx => {
                    const itemId = fusionSelectedIds[idx];
                    const item = inventory.find(i => i.id === itemId);

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (itemId) {
                            sound.playCardWhoosh();
                            setFusionSelectedIds(prev => prev.filter(id => id !== itemId));
                          }
                        }}
                        className={`h-28 border-2 rounded-sm p-1.5 flex flex-col items-center justify-between text-center cursor-pointer transition-all ${
                          item
                            ? 'bg-[#181d2a] border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                            : 'bg-black/40 border-dashed border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        {item ? (
                          <>
                            <span
                              className="text-[9px] font-black uppercase px-1 py-0.2 rounded text-black truncate w-full"
                              style={{ backgroundColor: getRankColor(item.rank) }}
                            >
                              {item.rank}
                            </span>
                            <div className="relative w-10 h-10 my-0.5">
                              {item.image ? (
                                <Image src={item.image} alt={item.name} fill sizes="40px" className="object-contain" />
                              ) : (
                                <span className="text-xl">🗡️</span>
                              )}
                            </div>
                            <p className="text-[10px] font-bold text-white truncate w-full">
                              {item.name}
                            </p>
                            <span className="text-[8px] text-rose-400 hover:underline">Nhấp bỏ</span>
                          </>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                            <span className="text-xl opacity-40">⚔️</span>
                            <span className="text-[10px] mt-1 font-mono">Ô {idx + 1} Trống</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Result Preview Box */}
              <div className="bg-[#121724] border-2 border-indigo-500/60 p-3 rounded-sm shadow-[inset_0_0_12px_rgba(99,102,241,0.2)]">
                <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider block mb-1">
                  KẾT QUẢ DUNG LUYỆN DỰ KIẾN:
                </span>
                {fusionSelectedIds.length === 3 ? (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-black/60 border border-indigo-400 rounded flex items-center justify-center text-2xl">
                      💎
                    </div>
                    <div>
                      <p className="text-xs font-black text-amber-300">
                        1 Trang Bị Phẩm Cấp Kế Tiếp ({NEXT_RARITY[inventory.find(i => i.id === fusionSelectedIds[0])?.rank || 'Common'] || 'Tối Đa'})
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Chỉ số ATK / HP tăng vọt theo bảng cân bằng FEAT-007
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Hãy chọn đủ 3 món trang bị cùng bậc để kích hoạt lò luyện.
                  </p>
                )}
              </div>
            </div>

            {/* Fusion Action Button */}
            <div className="border-t-2 border-black pt-3 mt-4">
              <div className="flex justify-between text-xs font-mono font-bold mb-2">
                <span className="text-slate-400">Chi Phí Luyện Khí:</span>
                <span className="text-yellow-400">5,000 🪙 Vàng</span>
              </div>
              <button
                onClick={handleExecuteFusion}
                disabled={fusionSelectedIds.length !== 3}
                className={`w-full py-3 px-4 border-2 border-black shadow-[3px_3px_0_#000] font-black text-xs uppercase flex items-center justify-center gap-2 transition-all ${
                  fusionSelectedIds.length === 3
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black hover:scale-[1.01] active:scale-95'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                }`}
              >
                <Flame className="w-4 h-4 fill-black" />
                <span>HỢP NHẤT DUNG LUYỆN (3 THÀNH 1)</span>
              </button>
            </div>
          </div>

          {/* Right: Selectable Items Grid (7 cols) */}
          <div className="lg:col-span-7 bg-[#10141f] border-4 border-black p-4 shadow-[6px_6px_0_#000]">
            <div className="border-b-2 border-black pb-2 mb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                CHỌN NGUYÊN LIỆU ({inventory.length} MÓN TRONG KHO)
              </h3>
              <span className="text-xs text-slate-400 font-mono">Nhấp để thêm/bỏ</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
              {inventory.map(item => {
                const isSelected = fusionSelectedIds.includes(item.id);
                const itemColor = getRankColor(item.rank);

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      sound.playCardWhoosh();
                      if (isSelected) {
                        setFusionSelectedIds(prev => prev.filter(id => id !== item.id));
                      } else {
                        if (fusionSelectedIds.length >= 3) {
                          alert('Lò Dung Luyện chỉ chứa tối đa 3 trang bị!');
                          return;
                        }
                        // Check same rank
                        if (fusionSelectedIds.length > 0) {
                          const firstItem = inventory.find(i => i.id === fusionSelectedIds[0]);
                          if (firstItem && firstItem.rank !== item.rank) {
                            alert(`Vui lòng chọn trang bị cùng phẩm cấp ${firstItem.rank}!`);
                            return;
                          }
                        }
                        setFusionSelectedIds(prev => [...prev, item.id]);
                      }
                    }}
                    className={`p-2.5 rounded-sm border-2 cursor-pointer transition-all bg-[#121622] flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-400 ring-2 ring-amber-400 shadow-[3px_3px_0_#000] scale-[1.02]'
                        : 'border-black hover:border-slate-500'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[9px] mb-1">
                        <span
                          className="font-black uppercase px-1 py-0.2 rounded text-black"
                          style={{ backgroundColor: itemColor }}
                        >
                          {item.rank}
                        </span>
                        {isSelected && (
                          <span className="bg-amber-400 text-black text-[9px] font-black px-1.5 rounded-full">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="relative w-full h-14 my-1">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill sizes="100px" className="object-contain" />
                        ) : (
                          <span className="text-2xl flex items-center justify-center h-full">🗡️</span>
                        )}
                      </div>
                      <p className="text-xs font-black text-white truncate">{item.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: PHÂN RÃ TRANG BỊ (DISMANTLE) */}
      {subTab === 'dismantle' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Dismantle Calculator & Yield (5 cols) */}
          <div className="lg:col-span-5 bg-[#10141f] border-4 border-black p-4 shadow-[6px_6px_0_#000] flex flex-col justify-between">
            <div>
              <div className="border-b-2 border-black pb-2 mb-3">
                <span className="text-[10px] font-black uppercase text-rose-400 tracking-wider block">
                  TÁI CHẾ TÀI NGUYÊN & NGUYÊN LIỆU
                </span>
                <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-rose-500" />
                  LÒ PHÂN RÃ TRANG BỊ
                </h3>
              </div>

              {/* Yield Breakdown according to FEAT-007 */}
              <div className="space-y-3 mb-4">
                <p className="text-xs text-slate-300">
                  Phân rã các trang bị thừa hoặc cấp thấp để thu hồi 100% Vàng, Kim Cương và Đá Cường Hóa theo bảng cân bằng:
                </p>

                {(() => {
                  const selectedItems = inventory.filter(i => dismantleSelectedIds.includes(i.id));
                  let estGold = 0;
                  let estDiamonds = 0;
                  let estStones = 0;
                  for (const item of selectedItems) {
                    if (item.rank === 'Sovereign') continue;
                    const y = DISMANTLE_YIELD[item.rank] || { gold: 100, stones: 1, diamonds: 0 };
                    estGold += y.gold;
                    estDiamonds += y.diamonds;
                    estStones += y.stones;
                  }

                  return (
                    <div className="bg-[#121622] border-2 border-black p-3 space-y-2 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-slate-400">Số lượng đã chọn:</span>
                        <span className="text-white font-bold">{selectedItems.length} Món</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-yellow-400 flex items-center gap-1">🪙 Vàng Thu Hồi:</span>
                        <span className="text-yellow-300 font-bold">+{estGold.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-cyan-400 flex items-center gap-1">💎 Kim Cương Thu Hồi:</span>
                        <span className="text-cyan-300 font-bold">+{estDiamonds}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-purple-400 flex items-center gap-1">⚡ Đá Cường Hóa:</span>
                        <span className="text-purple-300 font-bold">+{estStones} Viên</span>
                      </div>
                    </div>
                  );
                })()}

                {/* Quick Selection Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      sound.playCardWhoosh();
                      const lowTierIds = inventory
                        .filter(i => (i.rank === 'Common' || i.rank === 'Fine') && !i.serverLimit)
                        .map(i => i.id);
                      setDismantleSelectedIds(lowTierIds);
                    }}
                    className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-200 border border-slate-600 rounded"
                  >
                    Chọn Hết Common & Fine
                  </button>
                  <button
                    onClick={() => {
                      sound.playCardWhoosh();
                      setDismantleSelectedIds([]);
                    }}
                    className="py-1.5 px-3 bg-black hover:bg-zinc-900 text-[11px] font-bold text-rose-400 border border-rose-900 rounded"
                  >
                    Bỏ Chọn
                  </button>
                </div>
              </div>
            </div>

            {/* Dismantle Action Button */}
            <div className="border-t-2 border-black pt-3">
              <button
                onClick={handleExecuteDismantle}
                disabled={dismantleSelectedIds.length === 0}
                className={`w-full py-3 px-4 border-2 border-black shadow-[3px_3px_0_#000] font-black text-xs uppercase flex items-center justify-center gap-2 transition-all ${
                  dismantleSelectedIds.length > 0
                    ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white hover:scale-[1.01] active:scale-95'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span>TIẾN HÀNH PHÂN RÃ ({dismantleSelectedIds.length} MÓN)</span>
              </button>
            </div>
          </div>

          {/* Right: Multi-select Inventory Grid (7 cols) */}
          <div className="lg:col-span-7 bg-[#10141f] border-4 border-black p-4 shadow-[6px_6px_0_#000]">
            <div className="border-b-2 border-black pb-2 mb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-rose-400" />
                DANH SÁCH TRANG BỊ CÓ THỂ PHÂN RÃ
              </h3>
              <span className="text-xs text-slate-400 font-mono">Không thể rã Thần Khí 1-of-1</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
              {inventory.map(item => {
                const isSelected = dismantleSelectedIds.includes(item.id);
                const isSovereign = item.rank === 'Sovereign';
                const itemColor = getRankColor(item.rank);

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (isSovereign) {
                        alert('Thần Khí Độc Tôn 1-of-1 Server không thể bị phân rã!');
                        return;
                      }
                      sound.playCardWhoosh();
                      if (isSelected) {
                        setDismantleSelectedIds(prev => prev.filter(id => id !== item.id));
                      } else {
                        setDismantleSelectedIds(prev => [...prev, item.id]);
                      }
                    }}
                    className={`p-2.5 rounded-sm border-2 cursor-pointer transition-all bg-[#121622] flex flex-col justify-between ${
                      isSovereign
                        ? 'opacity-40 cursor-not-allowed border-rose-900'
                        : isSelected
                        ? 'border-rose-500 ring-2 ring-rose-500 shadow-[3px_3px_0_#000] scale-[1.02]'
                        : 'border-black hover:border-slate-500'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[9px] mb-1">
                        <span
                          className="font-black uppercase px-1 py-0.2 rounded text-black"
                          style={{ backgroundColor: itemColor }}
                        >
                          {item.rank}
                        </span>
                        {isSelected && (
                          <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 rounded-full">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="relative w-full h-14 my-1">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill sizes="100px" className="object-contain" />
                        ) : (
                          <span className="text-2xl flex items-center justify-center h-full">🗡️</span>
                        )}
                      </div>
                      <p className="text-xs font-black text-white truncate">{item.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
