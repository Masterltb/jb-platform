'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { EquipmentItem, CardRarity, GachaChest, CharacterCard, EvolutionMaterial, getHeroAscensionInfo } from '@/types/game';
import { GACHA_CHESTS, EQUIPMENT_INVENTORY, ROSTER_50_HEROES, EVOLUTION_MATERIALS_DEFAULT } from '@/data/mockGameData';
import { ALL_MYTHIC_HEROES } from '@/data/archetypesAndSovereignRoster';
import { 
  Gift, 
  Sparkles, 
  Eye, 
  Star, 
  Zap, 
  Award, 
  Flame, 
  Volume2, 
  Trophy, 
  UserCheck, 
  Shield, 
  Crown,
  Layers,
  ArrowRight,
  Sun
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/utils/soundEffects';
import { gameApi } from '@/services/gameApiClient';

interface GachaViewProps {
  onAddEquipmentToInventory: (item: EquipmentItem) => void;
  onAddHeroCard?: (hero: CharacterCard) => void;
  onAddEvolutionMaterial?: (matId: string, count: number) => void;
  diamonds: number;
  gold: number;
  onDeductDiamonds: (amount: number) => boolean;
  onDeductGold: (amount: number) => boolean;
  onSyncWallet?: (gold: number, diamonds: number) => void;
}

export interface PulledCardState {
  id: string;
  dropType: 'EQUIPMENT' | 'HERO' | 'MATERIAL';
  item?: EquipmentItem;
  hero?: CharacterCard;
  material?: EvolutionMaterial & { pulledCount: number };
  isFlipped: boolean;
}

export interface HeroGachaPack {
  id: string;
  name: string;
  subtitle: string;
  costCurrency: 'GOLD' | 'DIAMONDS';
  costAmount: number;
  featuredHeroName: string;
  featuredHeroRole: string;
  featuredHeroRank: string;
  featuredHeroImage: string;
  bgGradient: string;
  borderColor: string;
  badge: string;
  description: string;
  rateHighlights: string;
}

export const HERO_GACHA_PACKS: HeroGachaPack[] = [
  {
    id: 'pack_hero_rookie',
    name: 'Quán Trọ Hào Kiệt Phố Cổ',
    subtitle: 'Chiêu Mộ Tướng Tân Thủ',
    costCurrency: 'GOLD',
    costAmount: 50000,
    featuredHeroName: 'Long Bida & Hùng Pô Độ',
    featuredHeroRole: 'Vanguard / Main Tank',
    featuredHeroRank: 'Epic',
    featuredHeroImage: '/images/characters/avatar_longbida_v2.png',
    bgGradient: 'from-emerald-950 via-slate-900 to-black',
    borderColor: '#10B981',
    badge: 'TÂN BINH',
    description: 'Chiêu mộ các tay cơ, quái xế và tân binh hẻm phố từ Common đến Epic.',
    rateHighlights: 'Epic 10% | Rare 30% | Fine 40% | Common 20%'
  },
  {
    id: 'pack_hero_premium',
    name: 'Đại Điện Thần Bí Cyber 2026',
    subtitle: 'Tướng Tinh Anh & Huyền Thoại',
    costCurrency: 'DIAMONDS',
    costAmount: 500,
    featuredHeroName: 'Mai Dạ Quang & Phượng Hoàng Lửa',
    featuredHeroRole: 'Style Amplifier & Assassin',
    featuredHeroRank: 'Legendary',
    featuredHeroImage: '/images/characters/avatar_maidaquang_v2.png',
    bgGradient: 'from-purple-950 via-indigo-950 to-black',
    borderColor: '#A855F7',
    badge: 'CAO CẤP',
    description: 'Bảo đảm 100% nhận tướng từ Rare đến Legendary. Tỉ lệ nổ tướng Huyền Thoại cực cao!',
    rateHighlights: 'Legendary 15% | Epic 40% | Rare 45%'
  },
  {
    id: 'pack_hero_mythic',
    name: 'Đại Điện Thần Cực Tinh Hoa (Mythic Peak)',
    subtitle: 'Triệu Hồi Dàn Tướng Thần Thoại 5 Archetype',
    costCurrency: 'DIAMONDS',
    costAmount: 1500,
    featuredHeroName: 'Long Thần Độc Cổ & Lôi Đế (30+ Tướng Mythic)',
    featuredHeroRole: 'Mythic Core (Độc / Bạo / Khiên / Giảm Dame)',
    featuredHeroRank: 'Mythic',
    featuredHeroImage: '/images/characters/avatar_longbida_v2.png',
    bgGradient: 'from-amber-950 via-red-950 to-black',
    borderColor: '#F59E0B',
    badge: 'MYTHIC MAX (GÓI BÓC CAO NHẤT)',
    description: 'Bóc pack cao nhất ra bậc Mythic (không giới hạn sở hữu). Tướng Sovereign 1-of-1 chỉ có thể săn ở Rương Sự Kiện & Boss Khung Giờ!',
    rateHighlights: 'Mythic 25% | Legendary 75% (Không rớt Sovereign ở Pack thường)'
  }
];

export interface MaterialPackConfig {
  id: string;
  name: string;
  subtitle: string;
  costCurrency: 'GOLD' | 'DIAMONDS';
  costAmount: number;
  icon: string;
  description: string;
  bgGradient: string;
  borderColor: string;
  targetStarDesc: string;
}

export const MATERIAL_PACKS_CONFIG: MaterialPackConfig[] = [
  {
    id: 'mat_pack_basic',
    name: 'Túi Tinh Thạch Sơ Cấp (1★ - 3★)',
    subtitle: 'Nâng Cấp & Đột Phá Cơ Bản',
    costCurrency: 'GOLD',
    costAmount: 40000,
    icon: '🪨',
    description: 'Rơi ra từ 50 đến 200 Đá Tiến Hóa Sơ Cấp & Đá Tinh Chế Lam.',
    bgGradient: 'from-slate-900 to-emerald-950',
    borderColor: '#10B981',
    targetStarDesc: 'Dùng thăng cấp tướng lên 2★ và 3★'
  },
  {
    id: 'mat_pack_elite',
    name: 'Rương Linh Ngọc Sử Thi (3★ - 5★)',
    subtitle: 'Đột Phá Chiến Lực Cao Cấp',
    costCurrency: 'DIAMONDS',
    costAmount: 350,
    icon: '🔮',
    description: 'Rơi ra từ 50 đến 150 Ngọc Hồn Hiếm & Linh Đan Sử Thi.',
    bgGradient: 'from-purple-950 to-blue-950',
    borderColor: '#8B5CF6',
    targetStarDesc: 'Dùng thăng cấp tướng lên 4★ và 5★'
  },
  {
    id: 'mat_pack_sovereign',
    name: 'Bảo Hạp Khởi Nguyên Thần Cực (5★ - 6★ Thức Tỉnh)',
    subtitle: 'Thức Tỉnh Cực Hạn Toàn Năng',
    costCurrency: 'DIAMONDS',
    costAmount: 1800,
    icon: '👑',
    description: 'Rơi ra Huyết Tinh Huyền Thoại và Ấn Ký Sovereign Vô Cực [1-of-1] cực hiếm!',
    bgGradient: 'from-rose-950 via-amber-950 to-black',
    borderColor: '#FF007F',
    targetStarDesc: 'Dùng thăng cấp 6★ & Thức Tỉnh Thần Thoại'
  }
];

export const GachaView: React.FC<GachaViewProps> = ({
  onAddEquipmentToInventory,
  onAddHeroCard,
  onAddEvolutionMaterial,
  diamonds,
  gold,
  onDeductDiamonds,
  onDeductGold,
  onSyncWallet
}) => {
  // Navigation mode: 'heroes' (Default) | 'chests' | 'materials'
  const [gachaMode, setGachaMode] = useState<'heroes' | 'chests' | 'materials'>('heroes');
  const [selectedHeroPack, setSelectedHeroPack] = useState<HeroGachaPack>(HERO_GACHA_PACKS[2]); // Default Sovereign Pack
  const [selectedChest, setSelectedChest] = useState<GachaChest>(GACHA_CHESTS[2]); // Default Gold chest
  const [selectedMaterialPack, setSelectedMaterialPack] = useState<MaterialPackConfig>(MATERIAL_PACKS_CONFIG[1]); // Default Elite Material
  const [isOpening, setIsOpening] = useState(false);
  const [pulledCards, setPulledCards] = useState<PulledCardState[]>([]);
  const [jackpotPoolGold, setJackpotPoolGold] = useState<number>(15480000);
  const [jackpotPoolDiamonds, setJackpotPoolDiamonds] = useState<number>(68500);
  const [jackpotWinnerBanner, setJackpotWinnerBanner] = useState<string | null>(null);

  // Live Jackpot sync from PostgreSQL / SQLite backend
  useEffect(() => {
    gameApi.getJackpotPool()
      .then(pool => {
        if (pool && pool.goldPool) {
          setJackpotPoolGold(pool.goldPool);
          setJackpotPoolDiamonds(pool.diamondPool || 68500);
        }
      })
      .catch(() => {});

    const timer = setInterval(() => {
      setJackpotPoolGold(prev => prev + Math.floor(Math.random() * 250 + 50));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getAuraClass = (rank: string, isSixSuns?: boolean) => {
    if (isSixSuns) return 'aura-six-suns-supreme';
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

  // =========================================================================
  // 1. HERO GACHA RECRUITMENT HANDLER (FEAT-012)
  // =========================================================================
  const handleOpenHeroPack = (pack: HeroGachaPack, count = 1) => {
    const totalCost = pack.costAmount * count;

    if (pack.costCurrency === 'DIAMONDS') {
      if (diamonds < totalCost) {
        alert(`Không đủ Kim Cương! Cần ${totalCost.toLocaleString()} 💎 để chiêu mộ.`);
        return;
      }
      onDeductDiamonds(totalCost);
    } else {
      if (gold < totalCost) {
        alert(`Không đủ Vàng! Cần ${totalCost.toLocaleString()} 🪙 để chiêu mộ.`);
        return;
      }
      onDeductGold(totalCost);
    }

    setIsOpening(true);
    setPulledCards([]);
    sound.playCardWhoosh();

    setTimeout(() => {
      const results: PulledCardState[] = [];
      let triggeredJackpot = false;

      // Filter heroes pool according to pack tier
      const pool = ROSTER_50_HEROES.filter(h => {
        if (pack.id === 'pack_hero_mythic') {
          return h.rank === 'Mythic' || h.rank === 'Legendary';
        }
        if (pack.id === 'pack_hero_premium') {
          return h.rank === 'Legendary' || h.rank === 'Epic' || h.rank === 'Rare';
        }
        return h.rank === 'Epic' || h.rank === 'Rare' || h.rank === 'Fine' || h.rank === 'Common';
      });

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let candidate: CharacterCard;

        if (pack.id === 'pack_hero_mythic') {
          // Bóc pack cao nhất ra Mythic (25% Mythic từ dàn 30 tướng Mythic 5 Archetype, 75% Legendary)
          if (rand < 0.25) {
            candidate = ALL_MYTHIC_HEROES[Math.floor(Math.random() * ALL_MYTHIC_HEROES.length)] || pool[0];
            triggeredJackpot = true;
          } else {
            const legendaries = pool.filter(h => h.rank === 'Legendary');
            candidate = legendaries[Math.floor(Math.random() * legendaries.length)] || pool[0];
          }
        } else if (pack.id === 'pack_hero_premium') {
          // 15% Legendary, 45% Epic, 40% Rare
          if (rand < 0.15) {
            const legendaries = pool.filter(h => h.rank === 'Legendary');
            candidate = legendaries[Math.floor(Math.random() * legendaries.length)] || pool[0];
          } else if (rand < 0.60) {
            const epics = pool.filter(h => h.rank === 'Epic');
            candidate = epics[Math.floor(Math.random() * epics.length)] || pool[0];
          } else {
            const rares = pool.filter(h => h.rank === 'Rare');
            candidate = rares[Math.floor(Math.random() * rares.length)] || pool[0];
          }
        } else {
          // Rookie: 10% Epic, 30% Rare, 40% Fine, 20% Common
          if (rand < 0.10) {
            const epics = pool.filter(h => h.rank === 'Epic');
            candidate = epics[Math.floor(Math.random() * epics.length)] || pool[0];
          } else if (rand < 0.40) {
            const rares = pool.filter(h => h.rank === 'Rare');
            candidate = rares[Math.floor(Math.random() * rares.length)] || pool[0];
          } else if (rand < 0.80) {
            const fines = pool.filter(h => h.rank === 'Fine');
            candidate = fines[Math.floor(Math.random() * fines.length)] || pool[0];
          } else {
            const commons = pool.filter(h => h.rank === 'Common');
            candidate = commons[Math.floor(Math.random() * commons.length)] || pool[0];
          }
        }

        const heroInstance: CharacterCard = {
          ...candidate,
          id: `hero_pulled_${Date.now()}_${i}`
        };

        results.push({
          id: heroInstance.id,
          dropType: 'HERO',
          hero: heroInstance,
          isFlipped: false
        });

        onAddHeroCard?.(heroInstance);
      }

      setPulledCards(results);
      setIsOpening(false);
      sound.playGachaReveal();

      if (triggeredJackpot) {
        sound.playCritImpact();
        setJackpotWinnerBanner(
          `🌟 [TOÀN SERVER] CHÚC MỪNG BẠN CHIÊU MỘ ĐƯỢC TƯỚNG THẦN THOẠI [${results[0]?.hero?.name}] BẬC MYTHIC! (Tướng Sovereign chỉ có thể săn ở Rương Sự Kiện)`
        );
        try {
          confetti({ particleCount: 220, spread: 130, origin: { y: 0.5 } });
        } catch {}
      } else {
        try {
          confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        } catch {}
      }
    }, 700);
  };

  // =========================================================================
  // 2. EVOLUTION MATERIAL GACHA HANDLER (FEAT-012)
  // =========================================================================
  const handleOpenMaterialPack = (pack: MaterialPackConfig, count = 1) => {
    const totalCost = pack.costAmount * count;

    if (pack.costCurrency === 'DIAMONDS') {
      if (diamonds < totalCost) {
        alert(`Không đủ Kim Cương! Cần ${totalCost.toLocaleString()} 💎 để mở túi nguyên liệu.`);
        return;
      }
      onDeductDiamonds(totalCost);
    } else {
      if (gold < totalCost) {
        alert(`Không đủ Vàng! Cần ${totalCost.toLocaleString()} 🪙 để mở túi nguyên liệu.`);
        return;
      }
      onDeductGold(totalCost);
    }

    setIsOpening(true);
    setPulledCards([]);
    sound.playCardWhoosh();

    setTimeout(() => {
      const results: PulledCardState[] = [];
      let triggeredJackpot = false;

      for (let i = 0; i < count; i++) {
        let mat = EVOLUTION_MATERIALS_DEFAULT[0];
        let qty = 30;

        if (pack.id === 'mat_pack_sovereign') {
          if (Math.random() < 0.25) {
            mat = EVOLUTION_MATERIALS_DEFAULT[5]; // mat_evo_sovereign
            qty = 1;
            triggeredJackpot = true;
          } else {
            mat = EVOLUTION_MATERIALS_DEFAULT[4]; // mat_evo_legendary
            qty = Math.floor(Math.random() * 50 + 50);
          }
        } else if (pack.id === 'mat_pack_elite') {
          mat = Math.random() < 0.5 ? EVOLUTION_MATERIALS_DEFAULT[2] : EVOLUTION_MATERIALS_DEFAULT[3];
          qty = Math.floor(Math.random() * 30 + 20);
        } else {
          mat = Math.random() < 0.6 ? EVOLUTION_MATERIALS_DEFAULT[0] : EVOLUTION_MATERIALS_DEFAULT[1];
          qty = Math.floor(Math.random() * 60 + 40);
        }

        results.push({
          id: `mat_pulled_${Date.now()}_${i}`,
          dropType: 'MATERIAL',
          material: { ...mat, pulledCount: qty },
          isFlipped: false
        });

        onAddEvolutionMaterial?.(mat.id, qty);
      }

      setPulledCards(results);
      setIsOpening(false);
      sound.playGachaReveal();

      if (triggeredJackpot) {
        sound.playCritImpact();
        setJackpotWinnerBanner(
          `🔮 [TOÀN SERVER] CHÚC MỪNG BẠN MỞ ĐƯỢC NGUYÊN LIỆU THẦN CẤP [Ấn Ký Sovereign Vô Cực 1-of-1]!`
        );
        try {
          confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
        } catch {}
      } else {
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch {}
      }
    }, 600);
  };

  // =========================================================================
  // 3. EQUIPMENT CHESTS GACHA HANDLER
  // =========================================================================
  const handleOpenChest = async (chest: GachaChest, count = 1) => {
    const totalCost = chest.costAmount * count;

    if (chest.costCurrency === 'DIAMONDS') {
      if (diamonds < totalCost) {
        alert(`Không đủ Kim Cương! Cần ${totalCost.toLocaleString()} 💎 để mở.`);
        return;
      }
    } else {
      if (gold < totalCost) {
        alert(`Không đủ Vàng! Cần ${totalCost.toLocaleString()} 🪙 để mở.`);
        return;
      }
    }

    setIsOpening(true);
    setPulledCards([]);
    sound.playCardWhoosh();

    try {
      // Server-Side Authority: Fastify Gacha Engine with Idempotency
      const res = await gameApi.openGachaChest(chest.id, count);
      if (res && res.newItems && res.newItems.length > 0) {
        if (res.user && onSyncWallet) {
          onSyncWallet(res.user.gold, res.user.diamonds);
        } else {
          if (chest.costCurrency === 'DIAMONDS') onDeductDiamonds(totalCost);
          else onDeductGold(totalCost);
        }

        const results: PulledCardState[] = res.newItems.map((item: EquipmentItem) => {
          onAddEquipmentToInventory(item);
          return { id: item.id || `item_${Math.random()}`, dropType: 'EQUIPMENT', item, isFlipped: false };
        });

        setPulledCards(results);
        setIsOpening(false);
        sound.playGachaReveal();

        if (res.jackpotWon) {
          sound.playCritImpact();
          setJackpotWinnerBanner(
            `📢 [TOÀN SERVER] CHÚC MỪNG BẠN VỪA NỔ HŨ JACKPOT VÀ ĐOẠT ĐƯỢC [${results[0]?.item?.name || 'SIÊU PHẨM'}]! THƯỞNG NÓNG VÀNG VÀ KIM CƯƠNG TỪ SERVER!`
          );
          try {
            confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
          } catch {}
        } else {
          try {
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          } catch {}
        }
        return;
      }
    } catch (apiErr: any) {
      console.warn('Backend gacha error, using client-side calculation:', apiErr.message);
    }

    // Client fallback if backend is offline
    setTimeout(() => {
      if (chest.costCurrency === 'DIAMONDS') onDeductDiamonds(totalCost);
      else onDeductGold(totalCost);

      const results: PulledCardState[] = [];
      let triggeredJackpot = false;

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let chosenItem: EquipmentItem;

        if (rand < chest.jackpotChance * 0.1 || (chest.id === 'chest_sovereign' && rand < 0.25)) {
          chosenItem = EQUIPMENT_INVENTORY[0];
          triggeredJackpot = true;
        } else if (rand < 0.15) {
          chosenItem = EQUIPMENT_INVENTORY.find(item => item.rank === 'Mythic') || EQUIPMENT_INVENTORY[1];
        } else if (rand < 0.40) {
          chosenItem = EQUIPMENT_INVENTORY.find(item => item.rank === 'Legendary') || EQUIPMENT_INVENTORY[2];
        } else if (rand < 0.70) {
          chosenItem = EQUIPMENT_INVENTORY.find(item => item.rank === 'Epic') || EQUIPMENT_INVENTORY[3];
        } else if (rand < 0.90) {
          chosenItem = EQUIPMENT_INVENTORY.find(item => item.rank === 'Rare') || EQUIPMENT_INVENTORY[4];
        } else {
          chosenItem = EQUIPMENT_INVENTORY.find(item => item.rank === 'Fine') || EQUIPMENT_INVENTORY[5];
        }

        const pulledInstance: EquipmentItem = {
          ...chosenItem,
          id: `pulled_${Date.now()}_${i}`
        };

        results.push({
          id: pulledInstance.id,
          dropType: 'EQUIPMENT',
          item: pulledInstance,
          isFlipped: false
        });
        onAddEquipmentToInventory(pulledInstance);
      }

      setPulledCards(results);
      setIsOpening(false);
      sound.playGachaReveal();

      if (triggeredJackpot) {
        sound.playCritImpact();
        setJackpotWinnerBanner(
          `📢 [TOÀN SERVER] CHÚC MỪNG BẠN VỪA NỔ HŨ JACKPOT VÀ ĐOẠT ĐƯỢC [${results[0]?.item?.name || 'SIÊU PHẨM'}]! THƯỞNG NÓNG 5,000,000 VÀNG!`
        );
        try {
          confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
        } catch {}
      } else {
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch {}
      }
    }, 700);
  };

  const flipCard = (index: number) => {
    sound.playGachaReveal();
    setPulledCards(prev =>
      prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c))
    );
  };

  const flipAllCards = () => {
    sound.playCritImpact();
    setPulledCards(prev => prev.map(c => ({ ...c, isFlipped: true })));
    try {
      confetti({ particleCount: 150, spread: 100 });
    } catch {}
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-3 md:p-6 space-y-5 font-sans">
      {/* SERVER JACKPOT TICKER BANNER */}
      <div className="bg-gradient-to-r from-red-950 via-amber-900 to-purple-950 border-4 border-amber-400 p-3 md:p-4 shadow-[0_0_25px_#f59e0b] relative overflow-hidden rounded-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left z-10 relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-300 border-2 border-black flex items-center justify-center text-2xl shadow-[0_0_15px_#f59e0b] animate-bounce">
              💰
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-300 tracking-widest flex items-center gap-1 justify-center md:justify-start">
                <Flame className="w-3.5 h-3.5 text-red-500" /> HŨ JACKPOT VÔ CỰC TOÀN SERVER
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-yellow-300 tracking-wider font-mono">
                {jackpotPoolGold.toLocaleString()} 🪙 + {jackpotPoolDiamonds.toLocaleString()} 💎
              </h2>
            </div>
          </div>

          <div className="bg-black/80 px-4 py-2 border border-amber-500/60 rounded text-xs font-bold text-slate-300 max-w-xs">
            Mở rương báu & Bóc Pack có cơ hội nổ Hũ Jackpot & sở hữu <strong className="text-[#ff007f]">Tướng & Thần Khí 1-of-1</strong>!
          </div>
        </div>

        {/* Jackpot Server Ticker message */}
        {jackpotWinnerBanner && (
          <div className="mt-3 bg-red-950/90 border border-amber-300 p-2 text-center text-xs font-black text-amber-200 animate-pulse tracking-wide">
            {jackpotWinnerBanner}
          </div>
        )}
      </div>

      {/* MODE SELECTOR TABS (HEROES | EQUIPMENT | MATERIALS) */}
      <div className="flex flex-col sm:flex-row border-4 border-black p-1.5 bg-[#0b0e17] shadow-[5px_5px_0_#000] gap-2">
        <button
          onClick={() => {
            sound.playCardWhoosh();
            setGachaMode('heroes');
          }}
          className={`flex-1 py-3 px-4 text-xs md:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-black transition-all ${
            gachaMode === 'heroes'
              ? 'bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 text-black shadow-[3px_3px_0_#000] scale-[1.01]'
              : 'bg-[#151a28] text-slate-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>CHIÊU MỘ ANH HÙNG (50 TƯỚNG 3D)</span>
        </button>

        <button
          onClick={() => {
            sound.playCardWhoosh();
            setGachaMode('chests');
          }}
          className={`flex-1 py-3 px-4 text-xs md:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-black transition-all ${
            gachaMode === 'chests'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[3px_3px_0_#000] scale-[1.01]'
              : 'bg-[#151a28] text-slate-400 hover:text-white'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>HÒM THẦN KHÍ & TRANG BỊ (5 CẤP)</span>
        </button>

        <button
          onClick={() => {
            sound.playCardWhoosh();
            setGachaMode('materials');
          }}
          className={`flex-1 py-3 px-4 text-xs md:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-black transition-all ${
            gachaMode === 'materials'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[3px_3px_0_#000] scale-[1.01]'
              : 'bg-[#151a28] text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>KHO BÁU NGUYÊN LIỆU TIẾN HÓA</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: CHIÊU MỘ ANH HÙNG (50 TƯỚNG 3D) */}
      {/* ========================================================================= */}
      {gachaMode === 'heroes' && (
        <div className="bg-[#10141f] border-4 border-black p-4 md:p-6 shadow-[6px_6px_0_#000] space-y-5 animate-in fade-in duration-150">
          <div className="border-b-2 border-black pb-3 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-wide flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                CHIÊU MỘ DANH TƯỚNG ANHEM JAEBIN (50 NHÂN VẬT)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Mở Pack nhận ngay thẻ Tướng vào Đội hình. Tỉ lệ rơi từ Common đến Sovereign (1-of-1 Server).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400 uppercase bg-amber-400/10 px-2.5 py-1 border border-amber-400/30">
                ⭐ BẢO ĐẢM RA TƯỚNG 100%
              </span>
            </div>
          </div>

          {/* 3 Hero Gacha Packs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HERO_GACHA_PACKS.map(pack => {
              const isSelected = selectedHeroPack.id === pack.id;
              return (
                <div
                  key={pack.id}
                  onClick={() => {
                    sound.playCardWhoosh();
                    setSelectedHeroPack(pack);
                  }}
                  className={`p-4 rounded-sm border-2 cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden bg-gradient-to-b ${
                    pack.bgGradient
                  } ${
                    isSelected
                      ? 'border-amber-400 ring-4 ring-amber-400/40 shadow-[0_0_22px_#f59e0b] scale-[1.02]'
                      : 'border-black hover:border-slate-500'
                  }`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-red-600 text-white rounded">
                      {pack.badge}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300 font-bold">
                      {pack.rateHighlights}
                    </span>
                  </div>

                  {/* Featured Hero Portrait */}
                  <div className="text-center my-2">
                    <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.5)] mb-2">
                      <Image
                        src={pack.featuredHeroImage}
                        alt={pack.featuredHeroName}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block">
                      TƯỚNG TIÊU BIỂU:
                    </span>
                    <h4 className="font-black text-sm md:text-base text-white uppercase truncate">
                      {pack.featuredHeroName}
                    </h4>
                    <p className="text-[11px] text-slate-300 font-medium">
                      {pack.featuredHeroRole}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 text-center my-2 min-h-[36px]">
                    {pack.description}
                  </p>

                  {/* Pricing & Buttons */}
                  <div className="pt-3 border-t border-white/10 space-y-2 mt-auto">
                    <div className="bg-black/80 p-2 border border-black text-center font-mono font-black text-sm text-yellow-300">
                      {pack.costCurrency === 'GOLD' ? (
                        <span>{pack.costAmount.toLocaleString()} 🪙 Vàng</span>
                      ) : (
                        <span>{pack.costAmount.toLocaleString()} 💎 Kim Cương</span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleOpenHeroPack(pack, 1);
                        }}
                        disabled={isOpening}
                        className="w-full bg-[#f59e0b] hover:bg-amber-400 text-black font-black text-xs py-2 border border-black uppercase shadow-[2px_2px_0_#000] active:scale-95"
                      >
                        Chiêu Mộ 1x
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleOpenHeroPack(pack, 5);
                        }}
                        disabled={isOpening}
                        className="w-full bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-black text-xs py-2 border border-black uppercase shadow-[2px_2px_0_#000] active:scale-95"
                      >
                        Chiêu Mộ 5x
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bulk Pull 10x Banner Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => handleOpenHeroPack(selectedHeroPack, 10)}
              disabled={isOpening}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-rose-600 to-purple-600 text-white font-black text-sm md:text-base uppercase border-2 border-black shadow-[4px_4px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>
                CHIÊU MỘ 10 LẦN LIÊN TIẾP [{selectedHeroPack.name}] (GIẢM 15%)
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: HÒM THẦN KHÍ & TRANG BỊ (5 CẤP BẬC) */}
      {/* ========================================================================= */}
      {gachaMode === 'chests' && (
        <div className="bg-[#10141f] border-4 border-black p-4 md:p-6 shadow-[6px_6px_0_#000] space-y-4 animate-in fade-in duration-150">
          <div className="border-b-2 border-black pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-wide flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#f59e0b]" />
                CHỌN HÒM GACHA SĂN ĐỒ (5 CẤP BẬC)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Từ Hòm Đồng 50,000 Vàng đến Bảo Hạp Hắc Long Độc Tôn 3,000 Kim Cương.
              </p>
            </div>
            <span className="text-xs font-black text-[#00f0ff] uppercase bg-[#00f0ff]/10 px-2.5 py-1 border border-[#00f0ff]/30">
              Tỉ lệ thật 100%
            </span>
          </div>

          {/* 5 Chests Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {GACHA_CHESTS.map(chest => {
              const isSelected = selectedChest.id === chest.id;
              return (
                <div
                  key={chest.id}
                  onClick={() => {
                    sound.playCardWhoosh();
                    setSelectedChest(chest);
                  }}
                  className={`p-3.5 rounded-sm border-2 cursor-pointer transition-all flex flex-col justify-between bg-gradient-to-b ${
                    chest.bgGradient
                  } ${
                    isSelected
                      ? 'border-amber-400 ring-4 ring-amber-400/40 shadow-[0_0_18px_#f59e0b] scale-[1.03]'
                      : 'border-black hover:border-slate-500'
                  }`}
                >
                  {/* Chest Icon & Name */}
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto my-2 filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.9)] transform transition-transform group-hover:scale-110">
                      {chest.image ? (
                        <Image src={chest.image} alt={chest.name} fill sizes="100px" className="object-contain" priority />
                      ) : (
                        <div className="text-5xl">{chest.icon}</div>
                      )}
                    </div>
                    <h4 className="font-black text-xs md:text-sm text-white uppercase tracking-wide">
                      {chest.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-2 my-1">
                      {chest.description}
                    </p>
                  </div>

                  {/* Chest Price & Rarity tags */}
                  <div className="mt-3 pt-2 border-t border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-400">Rớt:</span>
                      <span className="text-amber-300 font-black">
                        {chest.minRarity} - {chest.maxRarity}
                      </span>
                    </div>

                    <div className="bg-black/80 p-1.5 border border-black text-center font-mono font-black text-xs text-yellow-300">
                      {chest.costCurrency === 'GOLD' ? (
                        <span>{chest.costAmount.toLocaleString()} 🪙</span>
                      ) : (
                        <span>{chest.costAmount.toLocaleString()} 💎</span>
                      )}
                    </div>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleOpenChest(chest, 1);
                      }}
                      disabled={isOpening}
                      className="w-full bg-[#f59e0b] hover:bg-amber-400 text-black font-black text-[11px] py-1.5 border border-black uppercase shadow-[2px_2px_0_#000] active:scale-95"
                    >
                      Mở 1 Lần
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* OPEN 5 PACKS BULK BUTTON */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handleOpenChest(selectedChest, 5)}
              disabled={isOpening}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 via-rose-600 to-purple-600 text-white font-black text-sm md:text-base uppercase border-2 border-black shadow-[4px_4px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>
                MỞ 5 LẦN [{selectedChest.name}] (GIẢM 10%)
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: KHO BÁU NGUYÊN LIỆU TIẾN HÓA */}
      {/* ========================================================================= */}
      {gachaMode === 'materials' && (
        <div className="bg-[#10141f] border-4 border-black p-4 md:p-6 shadow-[6px_6px_0_#000] space-y-5 animate-in fade-in duration-150">
          <div className="border-b-2 border-black pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                RƯƠNG NGUYÊN LIỆU TIẾN HÓA (ĐỘT PHÁ TƯỚNG 1★ ➔ 6★)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Cung cấp Tinh Thạch, Đá Năng Lượng, Linh Đan và Ấn Ký Sovereign để nâng cấp sao nhân vật.
              </p>
            </div>
            <span className="text-xs font-black text-purple-400 uppercase bg-purple-500/10 px-2.5 py-1 border border-purple-500/30">
              100% NGUYÊN LIỆU
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MATERIAL_PACKS_CONFIG.map(pack => {
              const isSelected = selectedMaterialPack.id === pack.id;
              return (
                <div
                  key={pack.id}
                  onClick={() => {
                    sound.playCardWhoosh();
                    setSelectedMaterialPack(pack);
                  }}
                  className={`p-4 rounded-sm border-2 cursor-pointer transition-all flex flex-col justify-between bg-gradient-to-b ${
                    pack.bgGradient
                  } ${
                    isSelected
                      ? 'border-purple-400 ring-4 ring-purple-400/40 shadow-[0_0_20px_#a855f7] scale-[1.02]'
                      : 'border-black hover:border-slate-500'
                  }`}
                >
                  <div className="text-center my-3">
                    <div className="text-5xl mb-2 animate-bounce">{pack.icon}</div>
                    <h4 className="font-black text-sm md:text-base text-white uppercase">
                      {pack.name}
                    </h4>
                    <p className="text-xs text-purple-300 font-mono font-bold mt-1">
                      {pack.targetStarDesc}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 text-center my-2 min-h-[36px]">
                    {pack.description}
                  </p>

                  <div className="pt-3 border-t border-white/10 space-y-2 mt-auto">
                    <div className="bg-black/80 p-2 border border-black text-center font-mono font-black text-sm text-yellow-300">
                      {pack.costCurrency === 'GOLD' ? (
                        <span>{pack.costAmount.toLocaleString()} 🪙 Vàng</span>
                      ) : (
                        <span>{pack.costAmount.toLocaleString()} 💎 Kim Cương</span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleOpenMaterialPack(pack, 1);
                        }}
                        disabled={isOpening}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black text-xs py-2 border border-black uppercase shadow-[2px_2px_0_#000] active:scale-95"
                      >
                        Mở 1 Lần
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleOpenMaterialPack(pack, 5);
                        }}
                        disabled={isOpening}
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs py-2 border border-black uppercase shadow-[2px_2px_0_#000] active:scale-95"
                      >
                        Mở 5 Lần
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3D CARD FLIP SHOWCASE (LẬT MẶT TỪNG THẺ THUẦN ART KHÔNG DÍNH SAO) */}
      {/* ========================================================================= */}
      {pulledCards.length > 0 && (
        <div className="bg-[#10141f] border-4 border-black p-5 shadow-[6px_6px_0_#000] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-3 flex-wrap gap-2">
            <h4 className="text-sm md:text-base font-black text-white uppercase text-[#10ffa0] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              KẾT QUẢ BÓC PACK (CHẠM ĐỂ LẬT MẶT 3D HOẶC BẤM LẬT TẤT CẢ):
            </h4>
            <button
              onClick={flipAllCards}
              className="px-4 py-2 bg-[#f59e0b] text-black font-black text-xs uppercase border border-black shadow-[2px_2px_0_#000] flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <Eye className="w-4 h-4" />
              <span>LẬT TẤT CẢ THẺ BÀI</span>
            </button>
          </div>

          {/* 3D Flip Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 perspective-1000">
            {pulledCards.map((cardState, idx) => {
              const { isFlipped, dropType } = cardState;
              const cardId = cardState.hero?.id || cardState.material?.id || cardState.item?.id || `card_${idx}`;
              const rank = cardState.hero?.rank || cardState.material?.rank || cardState.item?.rank || 'Common';
              const colorHex = cardState.hero?.rank === 'Sovereign' ? '#ff007f' : (cardState.material?.colorHex || cardState.item?.colorHex || '#3b82f6');

              return (
                <div
                  key={cardId}
                  onClick={() => !isFlipped && flipCard(idx)}
                  className="relative w-full h-72 cursor-pointer preserve-3d transition-transform duration-500 group"
                  style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  {/* BACK OF CARD (Facedown dark cyberpunk back) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-black border-2 border-amber-500/60 p-3 rounded-sm flex flex-col items-center justify-center backface-hidden shadow-[3px_3px_0_#000] group-hover:scale-105">
                    <div className="w-14 h-14 rounded-full border-2 border-amber-400 flex items-center justify-center text-amber-400 text-xl font-black mb-2 animate-pulse shadow-[0_0_12px_#f59e0b]">
                      JB
                    </div>
                    <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest">
                      CHẠM ĐỂ LẬT 3D
                    </p>
                  </div>

                  {/* FRONT OF CARD: HERO */}
                  {dropType === 'HERO' && cardState.hero && (() => {
                    const hero = cardState.hero;
                    const ascension = getHeroAscensionInfo(hero);
                    return (
                      <div
                        className={`absolute inset-0 bg-[#121622] rounded-sm p-3 flex flex-col justify-between backface-hidden rotate-y-180 shadow-[4px_4px_0_#000] border-2 border-black ${getAuraClass(
                          rank,
                          ascension.isSixSuns
                        )}`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span
                              className="text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm"
                              style={{ backgroundColor: colorHex, color: '#000' }}
                            >
                              {rank}
                            </span>
                            {ascension.isSixSuns ? (
                              <span className="badge-six-suns text-[9px] px-1.5 py-0.5 rounded font-black uppercase flex items-center gap-1 shadow">
                                <Sun className="w-3 h-3 animate-spin" />
                                6☀️ SUPREME
                              </span>
                            ) : (
                              <span className="text-[9px] font-black bg-rose-600 text-white px-1.5 py-0.5 rounded uppercase animate-pulse">
                                👑 TƯỚNG MỚI
                              </span>
                            )}
                          </div>

                          {hero.avatarImage ? (
                            <div className="relative w-full h-28 rounded overflow-hidden border border-black my-1">
                              <Image src={hero.avatarImage} alt={hero.name} fill className="object-cover" />
                            </div>
                          ) : (
                            <div className="w-full h-28 bg-gradient-to-tr from-purple-900 to-indigo-950 rounded flex items-center justify-center text-5xl my-1 border border-black">
                              {hero.avatarIcon || '👤'}
                            </div>
                          )}

                          <h5 className="font-black text-xs text-white truncate mt-1" style={{ color: colorHex }}>
                            {hero.name}
                          </h5>
                          <p className="text-[10px] text-slate-300 truncate font-medium">{hero.role}</p>
                        </div>

                        <div className="border-t border-slate-800 pt-1.5 flex items-center justify-between text-[11px] font-mono font-black">
                          <span className="text-amber-400 font-bold tracking-tight">{ascension.fullDisplay}</span>
                          <span className="text-cyan-300">{hero.totalCombatPower.toLocaleString()} CP</span>
                        </div>
                      </div>
                    );
                  })()}

                  {/* FRONT OF CARD: EVOLUTION MATERIAL */}
                  {dropType === 'MATERIAL' && cardState.material && (
                    <div
                      className={`absolute inset-0 bg-[#0e1626] rounded-sm p-3 flex flex-col justify-between backface-hidden rotate-y-180 shadow-[4px_4px_0_#000] border-2 border-black ${getAuraClass(
                        rank
                      )}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className="text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm"
                            style={{ backgroundColor: cardState.material.colorHex, color: '#000' }}
                          >
                            {rank}
                          </span>
                          <span className="text-[9px] font-black bg-purple-600 text-white px-1.5 py-0.5 rounded uppercase">
                            🔮 TIẾN HÓA
                          </span>
                        </div>

                        <div className="w-full h-28 bg-black/60 rounded flex flex-col items-center justify-center my-1 border border-black relative">
                          <span className="text-5xl animate-bounce">{cardState.material.icon}</span>
                          <span className="text-xs font-mono font-black text-amber-300 mt-2 bg-black/90 px-2.5 py-0.5 rounded border border-amber-400/50">
                            +{cardState.material.pulledCount} Viên
                          </span>
                        </div>

                        <h5 className="font-black text-xs text-white truncate mt-1" style={{ color: cardState.material.colorHex }}>
                          {cardState.material.name}
                        </h5>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{cardState.material.description}</p>
                      </div>

                      <div className="border-t border-slate-800 pt-1.5 text-[10px] font-mono text-emerald-400 font-bold truncate">
                        Cần cho: {cardState.material.targetStar - 1}★ ➔ {cardState.material.targetStar}★
                      </div>
                    </div>
                  )}

                  {/* FRONT OF CARD: EQUIPMENT */}
                  {dropType === 'EQUIPMENT' && cardState.item && (
                    <div
                      className={`absolute inset-0 bg-[#121622] rounded-sm p-3 flex flex-col justify-between backface-hidden rotate-y-180 shadow-[4px_4px_0_#000] border-2 border-black ${getAuraClass(
                        rank
                      )}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className="text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm"
                            style={{ backgroundColor: cardState.item.colorHex, color: '#000' }}
                          >
                            {rank}
                          </span>
                          <span className="text-[9px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded uppercase">
                            ⚔️ TRANG BỊ
                          </span>
                        </div>

                        {cardState.item.image ? (
                          <div className="relative w-full h-28 rounded overflow-hidden border border-black my-1">
                            <Image src={cardState.item.image} alt={cardState.item.name} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-full h-28 bg-black/40 rounded flex items-center justify-center text-5xl my-1">
                            🗡️
                          </div>
                        )}

                        <h5 className="font-black text-xs text-white truncate mt-1" style={{ color: cardState.item.colorHex }}>
                          {cardState.item.name}
                        </h5>
                        <p className="text-[10px] text-slate-400 truncate">{cardState.item.slot}</p>
                      </div>

                      <div className="border-t border-slate-800 pt-1.5 text-[10px] font-mono text-slate-300 flex justify-between">
                        {cardState.item.stats.atk && <span>ATK +{cardState.item.stats.atk}</span>}
                        {cardState.item.stats.hp && <span>HP +{cardState.item.stats.hp}</span>}
                        {cardState.item.stats.critRate && <span>CRIT +{Math.round(cardState.item.stats.critRate * 100)}%</span>}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
