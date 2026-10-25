'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Flame,
  Calendar,
  Gift,
  Trophy,
  Zap,
  Sparkles,
  Award,
  Crown,
  CheckCircle,
  Clock,
  ArrowRight,
  Shield,
  Coins,
  ChevronRight,
  Swords
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/utils/soundEffects';
import { 
  RAID_RANKERS_DATA, 
  CARNIVAL_DAYS_DATA, 
  LUCKY_WHEEL_SLOTS,
  TIMED_BOSS_EVENTS,
  CP_RACE_RANKERS,
  CP_RACE_MILESTONES
} from '@/data/mockGameData';
import { RaidRanker, CarnivalLoginDay, TimedBossEvent, CpRaceRanker, CpRaceMilestone, BossState, CharacterCard, TeamArchetype, getHeroUnlockedSkills } from '@/types/game';
import { ALL_SOVEREIGN_HEROES, ALL_MYTHIC_HEROES, TEAM_ARCHETYPES_META } from '@/data/archetypesAndSovereignRoster';

interface EventsViewProps {
  gold: number;
  diamonds: number;
  playerCP?: number;
  onAddGold: (amount: number) => void;
  onAddDiamonds: (amount: number) => void;
  onDeductDiamonds: (amount: number) => boolean;
  onGoToBattle: () => void;
  onChallengeBoss?: (boss: BossState) => void;
  onAddHeroCard?: (hero: CharacterCard) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({
  gold,
  diamonds,
  playerCP = 245000,
  onAddGold,
  onAddDiamonds,
  onDeductDiamonds,
  onGoToBattle,
  onChallengeBoss,
  onAddHeroCard
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'sovereign_summon' | 'timed_boss' | 'cp_race' | 'raid' | 'login' | 'wheel' | 'pass'>('sovereign_summon');
  const [selectedArchetypeFilter, setSelectedArchetypeFilter] = useState<TeamArchetype | 'ALL'>('ALL');
  const [sovereignBanner, setSovereignBanner] = useState<string | null>(null);
  const [isSummoningSovereign, setIsSummoningSovereign] = useState(false);
  const [selectedHeroDetail, setSelectedHeroDetail] = useState<CharacterCard | null>(null);

  // Safe fallback data guards to prevent undefined errors under fast HMR
  const timedBossList = (TIMED_BOSS_EVENTS && Array.isArray(TIMED_BOSS_EVENTS) && TIMED_BOSS_EVENTS.length > 0)
    ? TIMED_BOSS_EVENTS
    : [
        {
          id: 'timed_boss_12h',
          name: 'Cửu Linh Thị Xà',
          title: 'Thần Mãng Độc Trạch (Ca Trưa 12:00 - 13:00)',
          timeSlot: '12:00 - 13:00',
          startHour: 12,
          endHour: 13,
          bossCode: 'tier_5',
          icon: '🐍',
          bgGradient: 'from-emerald-950 via-teal-950 to-black',
          recommendedCP: 250000,
          drops: ['Đá Tinh Chế Lam (x200)', 'Mảnh Tướng SR Tự Chọn', 'Rương Gacha Bạc'],
          bossState: {
            id: 'tb_01',
            name: 'Cửu Linh Thị Xà',
            title: 'Thần Mãng Độc Trạch (Ca Trưa)',
            level: 60,
            currentHp: 850000,
            maxHp: 850000,
            currentBreak: 4500,
            maxBreak: 4500,
            def: 1200,
            atk: 3200,
            recommendedCP: 250000,
            isStaggered: false,
            intent: { type: 'Attack' as const, targetRole: 'Frontline' as const, value: 4500, description: 'Phun nọc độc axit ăn mòn 30% giáp tiền tuyến.' },
            phase: 1,
            avatarBg: 'from-emerald-900 to-black',
            image: '/images/bosses/boss_cuulinhthixa_v2.png'
          }
        },
        {
          id: 'timed_boss_18h',
          name: 'Sư Đà Yêu Vương',
          title: 'Hùng Ba Trấn Lộ (Ca Chiều 18:00 - 19:00)',
          timeSlot: '18:00 - 19:00',
          startHour: 18,
          endHour: 19,
          bossCode: 'tier_6',
          icon: '🦁',
          bgGradient: 'from-amber-950 via-orange-950 to-black',
          recommendedCP: 450000,
          drops: ['Tinh Thể Huyền Lam (x300)', 'Mảnh Trang Bị Cam', 'Rương Gacha Vàng'],
          bossState: {
            id: 'tb_02',
            name: 'Sư Đà Yêu Vương',
            title: 'Hùng Ba Trấn Lộ (Ca Chiều)',
            level: 70,
            currentHp: 1500000,
            maxHp: 1500000,
            currentBreak: 6000,
            maxBreak: 6000,
            def: 1800,
            atk: 4800,
            recommendedCP: 450000,
            isStaggered: false,
            intent: { type: 'Attack' as const, targetRole: 'All' as const, value: 7200, description: 'Cuồng nộ gầm rống chấn động toàn đội hình.' },
            phase: 1,
            avatarBg: 'from-amber-900 to-black',
            image: '/images/bosses/boss_suda.png'
          }
        },
        {
          id: 'timed_boss_20h',
          name: 'Kim Bằng Quỷ Điêu',
          title: 'Ma Điêu Xé Gió (Ca Tối 20:00 - 21:00)',
          timeSlot: '20:00 - 21:00',
          startHour: 20,
          endHour: 21,
          bossCode: 'tier_7',
          icon: '🦅',
          bgGradient: 'from-purple-950 via-slate-900 to-black',
          recommendedCP: 750000,
          drops: ['Linh Ngọc Tím Thạch Anh (x500)', 'Ấn Ký Huyền Thoại', 'Hòm Lôi Thần Lượng Tử'],
          bossState: {
            id: 'tb_03',
            name: 'Kim Bằng Quỷ Điêu',
            title: 'Ma Điêu Xé Gió (Ca Tối)',
            level: 80,
            currentHp: 2800000,
            maxHp: 2800000,
            currentBreak: 9000,
            maxBreak: 9000,
            def: 2400,
            atk: 7500,
            recommendedCP: 750000,
            isStaggered: false,
            intent: { type: 'Ultimate' as const, targetRole: 'Backline' as const, value: 12000, description: 'Bổ nhào từ hư không ám sát mục tiêu hàng sau!' },
            phase: 1,
            avatarBg: 'from-purple-900 to-black',
            image: '/images/bosses/boss_kimbang.png'
          }
        },
        {
          id: 'timed_boss_22h',
          name: 'Thái Cổ Lôi Thần',
          title: 'Chúa Tể Lôi Phạt (Ca Đêm 22:00 - 23:00)',
          timeSlot: '22:00 - 23:00',
          startHour: 22,
          endHour: 23,
          bossCode: 'tier_8',
          icon: '⚡',
          bgGradient: 'from-pink-950 via-rose-950 to-black',
          recommendedCP: 1200000,
          drops: ['Ấn Ký Sovereign Vô Cực [1-of-1]', 'Mảnh Thần Khí 1-of-1', 'Bảo Hạp Hắc Long Độc Tôn'],
          bossState: {
            id: 'tb_04',
            name: 'Thái Cổ Lôi Thần',
            title: 'Chúa Tể Lôi Phạt (Ca Đêm)',
            level: 95,
            currentHp: 5500000,
            maxHp: 5500000,
            currentBreak: 15000,
            maxBreak: 15000,
            def: 3800,
            atk: 14000,
            recommendedCP: 1200000,
            isStaggered: false,
            intent: { type: 'Ultimate' as const, targetRole: 'All' as const, value: 25000, description: 'Tung Thiên Phạt Lôi Cương giáng sấm sét xé toạc không gian!' },
            phase: 1,
            avatarBg: 'from-pink-900 to-black',
            image: '/images/bosses/boss_thundergod.png'
          }
        }
      ];

  const cpMilestonesList = (CP_RACE_MILESTONES && Array.isArray(CP_RACE_MILESTONES) && CP_RACE_MILESTONES.length > 0)
    ? CP_RACE_MILESTONES
    : [
        { id: 'cp_m1', cpRequired: 50000, goldReward: 100000, diamondsReward: 200, materialRewardName: 'Đá Tiến Hóa Sơ Cấp', materialCount: 100, isClaimed: true },
        { id: 'cp_m2', cpRequired: 120000, goldReward: 250000, diamondsReward: 500, materialRewardName: 'Đá Tinh Chế Lam', materialCount: 200, isClaimed: true },
        { id: 'cp_m3', cpRequired: 300000, goldReward: 600000, diamondsReward: 1000, materialRewardName: 'Tinh Thể Huyền Lam', materialCount: 300, isClaimed: false },
        { id: 'cp_m4', cpRequired: 650000, goldReward: 1500000, diamondsReward: 2500, materialRewardName: 'Linh Ngọc Tím Thạch Anh', materialCount: 500, isClaimed: false },
        { id: 'cp_m5', cpRequired: 1000000, goldReward: 5000000, diamondsReward: 5000, materialRewardName: 'Ấn Ký Sovereign Vô Cực [1-of-1]', materialCount: 1, isClaimed: false }
      ];

  const cpRankersList = (CP_RACE_RANKERS && Array.isArray(CP_RACE_RANKERS) && CP_RACE_RANKERS.length > 0)
    ? CP_RACE_RANKERS
    : [
        { rank: 1, playerName: 'JaeBinMaster', guild: 'Anhem JaeBin', combatPower: 1450200, vipLevel: 10, badgeTitle: '👑 ĐỆ NHẤT CHIẾN THẦN' },
        { rank: 2, playerName: 'LongBiDa_Pro', guild: 'Cơ Thủ Phố Cổ', combatPower: 1280500, vipLevel: 9, badgeTitle: '⚔️ VÔ SONG CHIẾN VƯƠNG' },
        { rank: 3, playerName: 'HungPoDo_HN', guild: 'Quái Xế Đêm', combatPower: 1150000, vipLevel: 8, badgeTitle: '🔥 BÁ VƯƠNG ĐƯỜNG PHỐ' },
        { rank: 4, playerName: 'LinhNeon_Cyber', guild: 'Cyberpunk Team', combatPower: 980400, vipLevel: 8, badgeTitle: '⚡ QUANG HỌC CHIẾN TƯỚNG' },
        { rank: 5, playerName: 'TuanHacker2026', guild: 'Anhem JaeBin', combatPower: 890000, vipLevel: 7, badgeTitle: '👾 BẬC THẦY MÃ HÓA' }
      ];

  // Timed Bosses State
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());

  // CP Race State
  const [claimedCpMilestones, setClaimedCpMilestones] = useState<string[]>(['cp_m1', 'cp_m2']);

  // Event 1: Raid State
  const [claimedMilestones, setClaimedMilestones] = useState<number[]>([10]);

  // Event 2: 7-Day Login State
  const [carnivalDays, setCarnivalDays] = useState<CarnivalLoginDay[]>(CARNIVAL_DAYS_DATA);


  // Event 3: Lucky Wheel State
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelWonPrize, setWheelWonPrize] = useState<any | null>(null);

  // Event 4: Pass State
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [passLevel] = useState(14);

  // Handler: Claim Milestone
  const handleClaimMilestone = (mId: number, rewardGold: number, rewardDia: number) => {
    if (claimedMilestones.includes(mId)) return;
    sound.playCritImpact();
    setClaimedMilestones(prev => [...prev, mId]);
    onAddGold(rewardGold);
    onAddDiamonds(rewardDia);
    try {
      confetti({ particleCount: 80, spread: 60 });
    } catch {}
    alert(`🎉 ĐÃ NHẬN MỐC TOÀN SERVER: +${rewardGold.toLocaleString()} 🪙 Vàng và +${rewardDia} 💎 Kim Cương!`);
  };

  // Handler: Claim Carnival Day
  const handleClaimDay = (dayIndex: number) => {
    const dayItem = carnivalDays[dayIndex];
    if (dayItem.isClaimed || !dayItem.canClaim) return;

    sound.playBuffSound();
    setCarnivalDays(prev =>
      prev.map((d, idx) => (idx === dayIndex ? { ...d, isClaimed: true, canClaim: false } : d))
    );

    if (dayItem.gold) onAddGold(dayItem.gold);
    if (dayItem.diamonds) onAddDiamonds(dayItem.diamonds);

    try {
      confetti({ particleCount: 120, spread: 80 });
    } catch {}
    alert(`🎁 ĐIỂM DANH THÀNH CÔNG: Nhận phần thưởng ${dayItem.rewardLabel}!`);
  };

  // Handler: Spin Lucky Wheel
  const handleSpinWheel = (isFree = false) => {
    if (isSpinning) return;
    if (!isFree) {
      if (!onDeductDiamonds(100)) {
        alert('Không đủ Kim Cương! Cần 100 💎 để quay.');
        return;
      }
    }

    setIsSpinning(true);
    setWheelWonPrize(null);
    sound.playCardWhoosh();

    // Random landing slot index 0..7
    const randomSlotIdx = Math.floor(Math.random() * LUCKY_WHEEL_SLOTS.length);
    const chosenPrize = LUCKY_WHEEL_SLOTS[randomSlotIdx];

    // Each slot is 360 / 8 = 45 degrees
    const extraRotations = 360 * 5; // 5 full spins
    const targetDeg = extraRotations + (360 - randomSlotIdx * 45) + 22.5;

    setWheelRotation(prev => prev + targetDeg);

    setTimeout(() => {
      setIsSpinning(false);
      setWheelWonPrize(chosenPrize);
      sound.playCritImpact();

      if (chosenPrize.type === 'gold' && chosenPrize.value) {
        onAddGold(chosenPrize.value);
      } else if (chosenPrize.type === 'diamonds' && chosenPrize.value) {
        onAddDiamonds(chosenPrize.value);
      }

      try {
        confetti({ particleCount: 150, spread: 90 });
      } catch {}
    }, 3200);
  };

  // Handler: Unlock Premium Pass
  const handleUnlockPremiumPass = () => {
    if (isPremiumUnlocked) return;
    if (!onDeductDiamonds(999)) {
      alert('Không đủ Kim Cương! Cần 999 💎 để mở khóa Street Pass Hoàng Kim.');
      return;
    }
    sound.playCritImpact();
    setIsPremiumUnlocked(true);
    onAddGold(500000);
    onAddDiamonds(2000);
    try {
      confetti({ particleCount: 180, spread: 100 });
    } catch {}
    alert('👑 CHÚC MỪNG: Đã mở khóa Street Pass Hoàng Kim Mùa 1! Nhận ngay +500,000 Vàng và +2,000 Kim Cương khởi đầu!');
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-3 md:p-6 space-y-5 font-sans">
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-950 via-[#10141f] to-amber-950 border-4 border-amber-400 p-4 md:p-6 shadow-[0_0_35px_#f59e0b55]">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="bg-[#ff0055] text-white text-[11px] font-black px-2.5 py-0.5 border border-black uppercase tracking-widest shadow-[2px_2px_0_#000]">
                LIVEOPS 2026 • LỄ HỘI PHỐ CỔ
              </span>
              <span className="text-[#00f0ff] font-mono text-xs font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Còn lại: 5 ngày 18 giờ
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black uppercase text-white tracking-tight drop-shadow-[0_2px_10px_#000]">
              TRUNG TÂM SỰ KIỆN & LỄ HỘI SERVER
            </h1>
            <p className="text-xs md:text-sm text-slate-300 font-medium">
              Tham gia Đua Top Boss Thế Giới, Điểm Danh 7 Ngày Nhận Thần Tướng JaeBin 6★ và Vòng Quay May Mắn!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onGoToBattle}
              className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-xs md:text-sm uppercase border-2 border-black shadow-[4px_4px_0_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span>Vào Đấu Boss Ngay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar (7 Live Events) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 bg-[#0c101a] p-1.5 border-2 border-black shadow-[4px_4px_0_#000]">
        <button
          onClick={() => {
            sound.playCardWhoosh();
            setActiveSubTab('sovereign_summon');
          }}
          className={`py-2 px-2 text-xs md:text-sm font-black uppercase border-2 border-black transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'sovereign_summon'
              ? 'bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 text-white shadow-[2px_2px_0_#000] ring-2 ring-amber-400'
              : 'bg-[#141926] text-amber-300 hover:text-white'
          }`}
        >
          <Crown className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
          <span>👑 HÒM SOVEREIGN</span>
        </button>

        <button
          onClick={() => {
            sound.playCardWhoosh();
            setActiveSubTab('timed_boss');
          }}
          className={`py-2 px-2 text-xs md:text-sm font-black uppercase border-2 border-black transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'timed_boss'
              ? 'bg-[#ef4444] text-white shadow-[2px_2px_0_#000]'
              : 'bg-[#141926] text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-300" />
          <span>1. 4 Khung Giờ Boss</span>
        </button>

        <button
          onClick={() => {
            sound.playCardWhoosh();
            setActiveSubTab('cp_race');
          }}
          className={`py-2 px-2 text-xs md:text-sm font-black uppercase border-2 border-black transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'cp_race'
              ? 'bg-[#f59e0b] text-black shadow-[2px_2px_0_#000]'
              : 'bg-[#141926] text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>2. Đua Lực Chiến</span>
        </button>

        <button
          onClick={() => {
            sound.playCardWhoosh();
            setActiveSubTab('raid');
          }}
          className={`py-2 px-2 text-xs md:text-sm font-black uppercase border-2 border-black transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'raid'
              ? 'bg-[#a855f7] text-white shadow-[2px_2px_0_#000]'
              : 'bg-[#141926] text-slate-400 hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-300" />
          <span>3. Đua Top Boss</span>
        </button>

        <button
          onClick={() => {
            sound.playCardWhoosh();
            setActiveSubTab('login');
          }}
          className={`py-2 px-2 text-xs md:text-sm font-black uppercase border-2 border-black transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'login'
              ? 'bg-[#10ffa0] text-black shadow-[2px_2px_0_#000]'
              : 'bg-[#141926] text-slate-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>4. Điểm Danh 7 Ngày</span>
        </button>

        <button
          onClick={() => {
            sound.playCardWhoosh();
            setActiveSubTab('wheel');
          }}
          className={`py-2 px-2 text-xs md:text-sm font-black uppercase border-2 border-black transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'wheel'
              ? 'bg-[#00f0ff] text-black shadow-[2px_2px_0_#000]'
              : 'bg-[#141926] text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>5. Vòng Quay May Mắn</span>
        </button>

        <button
          onClick={() => {
            sound.playCardWhoosh();
            setActiveSubTab('pass');
          }}
          className={`py-2 px-2 text-xs md:text-sm font-black uppercase border-2 border-black transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'pass'
              ? 'bg-[#ff007f] text-white shadow-[2px_2px_0_#000]'
              : 'bg-[#141926] text-slate-400 hover:text-white'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>6. Street Pass 2026</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 00: HÒM SỰ KIỆN TỐI THƯỢNG - SOVEREIGN 1-OF-1 & 5 ARCHETYPES */}
      {/* ========================================================================= */}
      {activeSubTab === 'sovereign_summon' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* Server Global Sovereign Winner Announcement */}
          {sovereignBanner && (
            <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 border-2 border-amber-300 p-3 rounded shadow-[0_0_20px_#f59e0b] animate-bounce">
              <p className="text-center font-black text-white text-xs md:text-sm uppercase tracking-wider drop-shadow-[0_2px_4px_#000]">
                {sovereignBanner}
              </p>
            </div>
          )}

          {/* Banner & Rules Notice */}
          <div className="bg-[#121622] border-2 border-amber-500/80 p-4 shadow-[4px_4px_0_#000] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-pink-600 to-amber-500 text-white text-[10px] font-black px-2 py-0.5 border border-black uppercase tracking-wider">
                  ĐỘC QUYỀN SỰ KIỆN SERVER
                </span>
                <span className="text-amber-400 text-xs font-mono font-bold">
                  Bóc Gacha thường cao nhất là Mythic • Sovereign CHỈ QUAY TẠI ĐÂY!
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black uppercase text-white">
                HÒM TRIỆU HỒI TƯỚNG TỐI THƯỢNG SOVEREIGN [1-OF-1]
              </h2>
              <p className="text-xs text-slate-300">
                Toàn server sở hữu 30 tướng Sovereign chia theo 5 hệ Team Archetype (Độc, Bạo Kích, Khiên Giáp, Khống Chế, Bất Tử). Mỗi tướng sở hữu tối đa 6 Tuyệt Kỹ chiến đấu tự động!
              </p>
            </div>

            {/* Summon Button */}
            <div className="flex flex-col items-end gap-1.5 w-full md:w-auto">
              <button
                disabled={isSummoningSovereign}
                onClick={() => {
                  if (diamonds < 3000) {
                    alert('Không đủ Kim Cương! Cần 3,000 💎 để mở Hòm Sự Kiện Sovereign.');
                    return;
                  }
                  onDeductDiamonds(3000);
                  setIsSummoningSovereign(true);
                  sound.playCardWhoosh();

                  setTimeout(() => {
                    setIsSummoningSovereign(false);
                    const pool = selectedArchetypeFilter === 'ALL'
                      ? ALL_SOVEREIGN_HEROES
                      : ALL_SOVEREIGN_HEROES.filter(h => h.archetype === selectedArchetypeFilter);
                    const rand = Math.random();

                    // 15% rate to pull full Sovereign Hero 1-of-1, 85% to receive 30 Ancient Sovereign Shards
                    if (rand < 0.15 || pool.length > 0) {
                      const luckyHero = pool[Math.floor(Math.random() * pool.length)] || ALL_SOVEREIGN_HEROES[0];
                      const summonedHero: CharacterCard = {
                        ...luckyHero,
                        id: `sovereign_summoned_${Date.now()}`
                      };
                      onAddHeroCard?.(summonedHero);
                      sound.playCritImpact();
                      setSovereignBanner(`👑 [ĐẠI THẦN TÍCH SERVER] Bạn vừa mở được TƯỚNG ĐỘC TÔN 1-OF-1 [${luckyHero.name}] Bậc SOVEREIGN (${luckyHero.totalCombatPower.toLocaleString()} CP)!`);
                      try {
                        confetti({ particleCount: 250, spread: 130, origin: { y: 0.5 } });
                      } catch {}
                    } else {
                      onAddGold(300000);
                      alert('Nhận được 30 Mảnh Tướng Sovereign Cổ Đại & +300,000 Vàng!');
                    }
                  }, 900);
                }}
                className={`w-full md:w-auto px-5 py-3 font-black text-xs md:text-sm uppercase border-2 border-black shadow-[4px_4px_0_#000] active:scale-95 transition-all flex items-center justify-center gap-2 ${
                  isSummoningSovereign
                    ? 'bg-slate-700 text-slate-400 cursor-wait'
                    : 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-300 hover:to-red-400 text-black shadow-[0_0_20px_#f59e0b]'
                }`}
              >
                <Crown className="w-4 h-4 fill-black" />
                <span>{isSummoningSovereign ? 'ĐANG KHỞI MÃ HÒM...' : 'MỞ HÒM SỰ KIỆN (3,000 💎)'}</span>
              </button>
              <span className="text-[10px] text-amber-300/80 font-mono">
                Tỉ lệ: 15% Rơi Tướng Sovereign 1-of-1 • 85% Mảnh Sovereign & Vàng
              </span>
            </div>
          </div>

          {/* Archetype Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#0c101a] p-2 border-2 border-black">
            <span className="text-xs font-black uppercase text-slate-400 px-2">HỆ ARCHETYPE:</span>
            <button
              onClick={() => setSelectedArchetypeFilter('ALL')}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded border transition-all ${
                selectedArchetypeFilter === 'ALL'
                  ? 'bg-amber-400 text-black border-amber-300 font-black'
                  : 'bg-[#182030] text-slate-300 border-zinc-700 hover:text-white'
              }`}
            >
              Tất Cả (15 Sovereign Tinh Hoa)
            </button>
            {Object.values(TEAM_ARCHETYPES_META).map(arch => (
              <button
                key={arch.type}
                onClick={() => setSelectedArchetypeFilter(arch.type)}
                className={`px-3 py-1.5 text-xs font-bold uppercase rounded border transition-all flex items-center gap-1 ${
                  selectedArchetypeFilter === arch.type
                    ? 'text-black font-black'
                    : 'bg-[#182030] text-slate-300 border-zinc-700 hover:text-white'
                }`}
                style={{
                  backgroundColor: selectedArchetypeFilter === arch.type ? arch.accentColor : undefined,
                  borderColor: selectedArchetypeFilter === arch.type ? arch.accentColor : undefined
                }}
              >
                <span>{arch.icon}</span>
                <span>{arch.name}</span>
              </button>
            ))}
          </div>

          {/* Sovereign Heroes Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_SOVEREIGN_HEROES.filter(
              h => selectedArchetypeFilter === 'ALL' || h.archetype === selectedArchetypeFilter
            ).map(hero => {
              const skills = getHeroUnlockedSkills(hero);
              const archMeta = hero.archetype ? TEAM_ARCHETYPES_META[hero.archetype] : null;

              return (
                <div
                  key={hero.id}
                  className="bg-[#121622] border-2 border-amber-500/60 hover:border-amber-400 p-3 rounded flex flex-col justify-between shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all hover:scale-[1.01]"
                >
                  {/* Top info */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-gradient-to-r from-pink-600 to-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                        SOVEREIGN 1-OF-1
                      </span>
                      {archMeta && (
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded border flex items-center gap-1"
                          style={{ borderColor: archMeta.accentColor, color: archMeta.accentColor }}
                        >
                          <span>{archMeta.icon}</span>
                          <span>{archMeta.name}</span>
                        </span>
                      )}
                    </div>

                    {/* Avatar & Title */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-20 bg-black/60 rounded border border-amber-400 overflow-hidden flex items-center justify-center shrink-0">
                        {hero.avatarImage ? (
                          <Image
                            src={hero.avatarImage}
                            alt={hero.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-3xl">{hero.avatarIcon || '👑'}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-black text-white truncate">{hero.name}</h3>
                        <p className="text-[11px] text-amber-300 font-bold truncate">{hero.title}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          CP: <strong className="text-yellow-400">{hero.totalCombatPower.toLocaleString()}</strong>
                        </p>
                        <p className="text-[9px] text-cyan-300 font-mono">
                          HP: {hero.maxHp.toLocaleString()} | CÔNG: {hero.atk.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* 6 Skills Showcase Preview */}
                    <div className="mt-3 pt-2 border-t border-zinc-800">
                      <p className="text-[10px] font-black text-slate-300 uppercase mb-1 flex items-center justify-between">
                        <span>HỆ THỐNG 6 CHIÊU THỨC (3 GỐC + 3 MỐC)</span>
                        <span className="text-amber-400 font-mono">MAX 6 SKILLS</span>
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {skills.map((sk, skIdx) => (
                          <div
                            key={sk.id}
                            className="bg-black/50 border border-zinc-700/80 p-1 rounded flex items-center gap-1.5 text-[9px]"
                          >
                            <span className="text-xs shrink-0">{sk.icon || '⚡'}</span>
                            <div className="min-w-0">
                              <p className="font-bold text-white truncate">{sk.name}</p>
                              <span className="text-[8px] text-amber-300/80 block truncate">
                                {sk.effectType} • {sk.unlockCondition}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action detail button */}
                  <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-[9px] text-emerald-400 font-bold">
                      ✓ Tự Động Thi Triển Chiến Đấu
                    </span>
                    <button
                      onClick={() => setSelectedHeroDetail(hero)}
                      className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-amber-300 px-2 py-1 rounded font-bold border border-amber-500/50 flex items-center gap-1"
                    >
                      <span>Xem Chi Tiết 6 Chiêu</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hero Detail Modal */}
          {selectedHeroDetail && (
            <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
              <div className="bg-[#10141f] border-4 border-amber-400 p-5 max-w-lg w-full rounded shadow-[0_0_35px_#f59e0b] space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-pink-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                      SOVEREIGN 1-OF-1
                    </span>
                    <h3 className="text-lg font-black text-white">{selectedHeroDetail.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedHeroDetail(null)}
                    className="text-slate-400 hover:text-white font-black text-sm px-2 py-1 bg-zinc-800 rounded"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-amber-300 font-bold">{selectedHeroDetail.title}</p>
                  <p className="text-xs text-slate-300">{selectedHeroDetail.lore}</p>
                </div>

                {/* 6 Skills Details */}
                <div className="space-y-2">
                  <p className="text-xs font-black uppercase text-amber-400">
                    BỘ 6 CHIÊU THỨC TỰ ĐỘNG THI TRIỂN TRONG CHIẾN TRƯỜNG:
                  </p>
                  <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                    {getHeroUnlockedSkills(selectedHeroDetail).map((sk, idx) => (
                      <div key={sk.id} className="bg-black/60 border border-zinc-700 p-2 rounded">
                        <div className="flex items-center justify-between text-xs font-bold text-white mb-0.5">
                          <span className="flex items-center gap-1">
                            <span>{sk.icon || '⚡'}</span>
                            <span>{sk.name}</span>
                          </span>
                          <span className="text-[10px] font-mono text-cyan-300">
                            {sk.unlockCondition}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300">{sk.description}</p>
                        <div className="flex items-center gap-2 mt-1 text-[9px] font-mono text-amber-300/80">
                          <span>Hiệu ứng: {sk.effectType}</span>
                          <span>•</span>
                          <span>Hồi chiêu: {sk.cooldownRounds} lượt</span>
                          <span>•</span>
                          <span>Tỉ lệ: {sk.scalingAtkPercent}% ATK</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedHeroDetail(null)}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-black font-black py-2 uppercase text-xs rounded border border-black shadow"
                >
                  Đóng Thông Tin
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 0A: 4 SCHEDULED TIMED WORLD BOSSES (FEAT-012) */}
      {/* ========================================================================= */}
      {activeSubTab === 'timed_boss' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="bg-[#121622] border-2 border-black p-4 shadow-[4px_4px_0_#000] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 border border-black uppercase tracking-wider">
                  4 KHUNG GIỜ VÀNG
                </span>
                <span className="text-amber-400 text-xs font-mono font-bold">
                  Khung giờ: 12h Trưa • 18h Chiều • 20h Tối • 22h Đêm
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-black uppercase text-white mt-1">
                SĂN BOSS THẾ GIỚI THEO KHUNG GIỜ CỐ ĐỊNH
              </h2>
              <p className="text-xs text-slate-300">
                Mỗi khung giờ xuất hiện một Trùm Thần Thoại với tỷ lệ rơi Đá/Ngọc Tiến Hóa tương ứng.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-[#0a0d14] border-2 border-black p-2.5 shadow-[2px_2px_0_#000]">
              <Clock className="w-5 h-5 text-[#00f0ff] animate-spin" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Giờ Server Hiện Tại</p>
                <p className="text-sm font-black text-[#00f0ff] font-mono">
                  {currentHour.toString().padStart(2, '0')}:00:00 (Hệ Thống Live)
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {timedBossList.map(tb => {
              const isOpenNow = currentHour >= tb.startHour && currentHour < tb.endHour;

              return (
                <div
                  key={tb.id}
                  className={`border-4 border-black p-4 shadow-[5px_5px_0_#000] flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${tb.bgGradient}`}
                >
                  <div>
                    {/* Header: Slot & Badge */}
                    <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{tb.icon}</span>
                        <div>
                          <span className="text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest block">
                            KHUNG GIỜ: {tb.timeSlot}
                          </span>
                          <h3 className="text-base font-black text-white uppercase">{tb.name}</h3>
                        </div>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-1 border border-black uppercase ${
                        isOpenNow
                          ? 'bg-emerald-400 text-black animate-pulse shadow-[2px_2px_0_#000]'
                          : 'bg-[#182030] text-amber-300'
                      }`}>
                        {isOpenNow ? '🟢 ĐANG MỞ CHIẾN TRƯỜNG' : `⏳ MỞ LÚC ${tb.startHour}:00`}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-medium mb-3 italic">
                      "{tb.title}"
                    </p>

                    {/* Stats & CP */}
                    <div className="grid grid-cols-3 gap-2 bg-black/60 p-2.5 border border-white/10 mb-3 text-center">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Máu Boss</span>
                        <span className="text-xs font-mono font-black text-red-400">
                          {tb.bossState.maxHp.toLocaleString()} HP
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Giáp / ATK</span>
                        <span className="text-xs font-mono font-black text-amber-400">
                          {tb.bossState.def} / {tb.bossState.atk}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Đề Xuất CP</span>
                        <span className="text-xs font-mono font-black text-cyan-300">
                          {tb.recommendedCP.toLocaleString()} CP
                        </span>
                      </div>
                    </div>

                    {/* Drops Pool */}
                    <div className="mb-4">
                      <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                        🎁 Rơi Vật Phẩm Hiếm & Nguyên Liệu Tiến Hóa:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {tb.drops.map((drop, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-black/80 text-white font-bold px-2 py-0.5 border border-amber-400/40"
                          >
                            {drop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Battle Enter Button */}
                  <button
                    onClick={() => {
                      sound.playCritImpact();
                      if (onChallengeBoss) {
                        onChallengeBoss(tb.bossState);
                      } else {
                        onGoToBattle();
                      }
                    }}
                    className={`w-full py-2.5 px-3 border-2 border-black font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-[3px_3px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all ${
                      isOpenNow
                        ? 'bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white'
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white'
                    }`}
                  >
                    <Swords className="w-4 h-4" />
                    <span>{isOpenNow ? 'VÀO CHIẾN TRƯỜNG NGAY (ĐANG MỞ)' : 'KHIÊU CHIẾN THỬ SỨC VỚI BOSS NÀY'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 0B: CP RACE LEADERBOARD & MILESTONES (FEAT-012) */}
      {/* ========================================================================= */}
      {activeSubTab === 'cp_race' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* Top Banner: Player CP and Season Timer */}
          <div className="bg-gradient-to-r from-[#1a1208] via-[#121622] to-[#1a0f1e] border-2 border-amber-400 p-4 shadow-[4px_4px_0_#000] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-400 border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0_#000]">
                🏆
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                  ĐUA LỰC CHIẾN TOÀN SERVER (CP RACE SEASON 1)
                </span>
                <h2 className="text-xl font-black uppercase text-white">
                  BẢNG VÀNG CHIẾN THẦN ĐỈNH CAO
                </h2>
                <p className="text-xs text-slate-300">
                  Top 1 nhận Rương Thần Khí Sovereign 1-of-1 và Danh Hiệu Độc Quyền Vĩnh Viễn.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#0a0d14] border-2 border-black p-3 shadow-[3px_3px_0_#000]">
              <Shield className="w-6 h-6 text-amber-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Lực Chiến Đội Hình Bạn</p>
                <p className="text-lg font-black text-amber-400 font-mono">
                  {playerCP.toLocaleString()} CP
                </p>
              </div>
            </div>
          </div>

          {/* CP Milestones Rewards Bar */}
          <div className="bg-[#121622] border-2 border-black p-4 space-y-3 shadow-[4px_4px_0_#000]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase text-white flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-400" />
                MỐC LỰC CHIẾN NHẬN THƯỞNG ĐÁ TIẾN HÓA & VÀNG
              </h3>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                Mốc cao nhất: 1,000,000 CP (Ấn Ký Sovereign)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {cpMilestonesList.map(m => {
                const isClaimed = claimedCpMilestones.includes(m.id);
                const canClaim = playerCP >= m.cpRequired && !isClaimed;

                return (
                  <div
                    key={m.id}
                    className={`p-3 border-2 border-black flex flex-col justify-between gap-2 text-xs transition-all ${
                      isClaimed
                        ? 'bg-[#0f1420] opacity-75'
                        : canClaim
                        ? 'bg-[#18261e] border-emerald-400 shadow-[2px_2px_0_#000]'
                        : 'bg-[#1a2030]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-black text-amber-300">
                          {m.cpRequired.toLocaleString()} CP
                        </span>
                        {isClaimed && <span className="text-emerald-400 text-[10px] font-bold">✓ ĐÃ NHẬN</span>}
                      </div>

                      <div className="space-y-0.5 text-[11px] text-slate-300">
                        <p className="text-yellow-400 font-bold">🪙 +{m.goldReward.toLocaleString()} Vàng</p>
                        <p className="text-cyan-300 font-bold">💎 +{m.diamondsReward} KC</p>
                        <p className="text-purple-300 font-black truncate">
                          🔮 {m.materialCount}x {m.materialRewardName}
                        </p>
                      </div>
                    </div>

                    <button
                      disabled={isClaimed || !canClaim}
                      onClick={() => {
                        sound.playCritImpact();
                        setClaimedCpMilestones(prev => [...prev, m.id]);
                        onAddGold(m.goldReward);
                        onAddDiamonds(m.diamondsReward);
                        try {
                          confetti({ particleCount: 100, spread: 70 });
                        } catch {}
                        alert(`🎉 ĐÃ NHẬN MỐC LỰC CHIẾN ${m.cpRequired.toLocaleString()} CP: +${m.goldReward.toLocaleString()} Vàng, +${m.diamondsReward} KC và ${m.materialCount}x ${m.materialRewardName}!`);
                      }}
                      className={`w-full py-1.5 px-2 text-[10px] font-black uppercase border border-black ${
                        isClaimed
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : canClaim
                          ? 'bg-emerald-400 text-black hover:bg-emerald-300 shadow-[1px_1px_0_#000] animate-bounce'
                          : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isClaimed ? 'Đã Nhận' : canClaim ? 'Nhận Ngay!' : 'Chưa Đạt CP'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top 10 CP Leaderboard Table */}
          <div className="bg-[#121622] border-2 border-black p-4 space-y-3 shadow-[4px_4px_0_#000]">
            <h3 className="text-base font-black uppercase text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              TOP 10 ANH HÙNG LỰC CHIẾN BÁ CHỦ MÙA 1
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#1c2233] border-b-2 border-black text-slate-400 font-black uppercase">
                    <th className="p-2.5">Hạng</th>
                    <th className="p-2.5">Chiến Thần</th>
                    <th className="p-2.5">Bang Hội</th>
                    <th className="p-2.5 text-right">Tổng Lực Chiến (CP)</th>
                    <th className="p-2.5 text-center">Danh Hiệu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/40">
                  {cpRankersList.map((ranker) => (
                    <tr
                      key={ranker.rank}
                      className={`hover:bg-[#182030] transition-colors ${
                        ranker.rank === 1
                          ? 'bg-amber-950/40 text-amber-300 font-bold'
                          : ranker.rank === 2
                          ? 'bg-slate-800/40 text-slate-200'
                          : ranker.rank === 3
                          ? 'bg-orange-950/30 text-orange-200'
                          : 'text-slate-300'
                      }`}
                    >
                      <td className="p-2.5 font-black text-sm">
                        {ranker.rank === 1 ? '🥇 Top 1' : ranker.rank === 2 ? '🥈 Top 2' : ranker.rank === 3 ? '🥉 Top 3' : `#${ranker.rank}`}
                      </td>
                      <td className="p-2.5 font-extrabold flex items-center gap-2">
                        <span>{ranker.playerName}</span>
                        <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded-xs font-black">
                          VIP {ranker.vipLevel}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-400 font-medium">{ranker.guild}</td>
                      <td className="p-2.5 text-right font-mono font-black text-amber-400 text-sm">
                        {ranker.combatPower.toLocaleString()} CP
                      </td>
                      <td className="p-2.5 text-center">
                        <span className="text-[10px] font-black bg-black/60 px-2 py-0.5 border border-white/20 text-cyan-300">
                          {ranker.badgeTitle}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: WORLD BOSS RAID LEADERBOARD */}
      {/* ========================================================================= */}
      {activeSubTab === 'raid' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* Boss HP & Milestone Bar */}
          <div className="bg-[#121622] border-2 border-black p-4 space-y-3 shadow-[4px_4px_0_#000]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-red-600 text-white font-black flex items-center justify-center text-sm border border-black">
                  👹
                </span>
                <div>
                  <h3 className="text-base font-black uppercase text-white">
                    TRÙM THẾ GIỚI: THÁI CỔ LÔI THẦN (CHƯƠNG 5)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Tổng sát thương toàn server đã gây: <strong className="text-amber-400">1,854,200,000 / 2,000,000,000 DMG (92.7%)</strong>
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-red-950 text-red-300 border border-red-500 font-black text-xs uppercase animate-pulse">
                GIAI ĐOẠN CUỐI
              </span>
            </div>

            {/* HP Bar */}
            <div className="w-full h-4 bg-black border-2 border-slate-700 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 via-rose-600 to-red-600 transition-all duration-500"
                style={{ width: '92.7%' }}
              />
            </div>

            {/* Milestones Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {[
                { id: 10, target: '10M DMG', gold: 100000, dia: 500 },
                { id: 50, target: '50M DMG', gold: 250000, dia: 1000 },
                { id: 200, target: '200M DMG', gold: 500000, dia: 2000 },
                { id: 1000, target: '1B DMG (MAX)', gold: 1500000, dia: 5000 }
              ].map(m => {
                const isClaimed = claimedMilestones.includes(m.id);
                return (
                  <div
                    key={m.id}
                    className={`p-2 border-2 border-black flex flex-col justify-between gap-1 text-xs ${
                      isClaimed ? 'bg-[#0f1420] opacity-80' : 'bg-[#1a2030]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-amber-300">{m.target}</span>
                      {isClaimed && <span className="text-emerald-400 text-[10px] font-bold">✓ ĐÃ NHẬN</span>}
                    </div>
                    <span className="text-[10px] text-slate-300 font-mono">
                      +{m.gold.toLocaleString()} 🪙 / +{m.dia} 💎
                    </span>
                    <button
                      disabled={isClaimed}
                      onClick={() => handleClaimMilestone(m.id, m.gold, m.dia)}
                      className={`py-1 text-[10px] font-black uppercase border border-black transition-all ${
                        isClaimed
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-[#10ffa0] hover:bg-emerald-400 text-black shadow-[1px_1px_0_#000]'
                      }`}
                    >
                      {isClaimed ? 'Đã Nhận Quà' : 'Nhận Mốc'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-[#121622] border-2 border-black p-4 space-y-3 shadow-[4px_4px_0_#000]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm md:text-base font-black uppercase text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>BẢNG XẾP HẠNG SÁT THƯƠNG BOSS TOÀN SERVER</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Cập nhật mỗi 5 phút</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#0a0d14] text-slate-400 font-black border-b-2 border-black">
                    <th className="p-2.5">HẠNG</th>
                    <th className="p-2.5">CAO THỦ</th>
                    <th className="p-2.5">BANG HỘI</th>
                    <th className="p-2.5">TỔNG SÁT THƯƠNG</th>
                    <th className="p-2.5 text-right">PHẦN THƯỞNG MÙA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {RAID_RANKERS_DATA.map((player: RaidRanker) => (
                    <tr
                      key={player.rank}
                      className={player.rank === 1 ? 'bg-amber-950/30 font-bold' : 'hover:bg-slate-900'}
                    >
                      <td className="p-2.5">
                        {player.rank === 1 ? (
                          <span className="w-6 h-6 rounded-full bg-amber-400 text-black font-black flex items-center justify-center text-xs shadow-[1px_1px_0_#000]">
                            🥇
                          </span>
                        ) : player.rank === 2 ? (
                          <span className="w-6 h-6 rounded-full bg-slate-300 text-black font-black flex items-center justify-center text-xs">
                            🥈
                          </span>
                        ) : player.rank === 3 ? (
                          <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-black flex items-center justify-center text-xs">
                            🥉
                          </span>
                        ) : (
                          <span className="text-slate-400 font-bold pl-2">#{player.rank}</span>
                        )}
                      </td>
                      <td className="p-2.5 font-sans font-black text-white flex items-center gap-1.5">
                        <span>{player.playerName}</span>
                        <span className="bg-[#ff0055] text-white text-[9px] px-1 font-mono font-bold">
                          VIP {player.vipLevel}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-300 font-sans">{player.guild}</td>
                      <td className="p-2.5 text-amber-300 font-bold">
                        {player.totalDamage.toLocaleString()} DMG
                      </td>
                      <td className="p-2.5 text-right font-sans font-bold">
                        {player.rank === 1 ? (
                          <span className="text-[#ff0055] font-black">👑 Hòm Sovereign 1-of-1 + 50k 💎</span>
                        ) : player.rank <= 5 ? (
                          <span className="text-amber-400">Trang Bị Mythic + 25k 💎</span>
                        ) : (
                          <span className="text-purple-300">Rương Legendary + 10k 💎</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CYBER CARNIVAL 7-DAY LOGIN */}
      {/* ========================================================================= */}
      {activeSubTab === 'login' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="bg-[#121622] border-2 border-black p-4 shadow-[4px_4px_0_#000]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-base font-black uppercase text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#10ffa0]" />
                  <span>ĐÊM HỘI PHỐ CỔ — ĐIỂM DANH 7 NGÀY NHẬN THẦN TƯỚNG 6★</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Đăng nhập mỗi ngày để nhận Vàng, Kim Cương, Vé Gacha và mở khóa Thần Tướng JaeBin Thức Tỉnh ngày thứ 7!
                </p>
              </div>
              <span className="bg-amber-400 text-black font-black text-xs px-2 py-1 border border-black shadow-[2px_2px_0_#000]">
                TIẾN TRÌNH: 3/7 NGÀY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {carnivalDays.map((item, idx) => (
                <div
                  key={item.day}
                  className={`border-3 border-black p-3 flex flex-col justify-between text-center transition-all ${
                    item.day === 7
                      ? 'bg-gradient-to-b from-amber-950 via-[#181126] to-black border-amber-400 shadow-[0_0_15px_#f59e0b]'
                      : item.isClaimed
                      ? 'bg-[#0b0e17] opacity-75'
                      : item.canClaim
                      ? 'bg-[#182338] border-[#00f0ff] ring-2 ring-[#00f0ff] animate-pulse'
                      : 'bg-[#10141f]'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      NGÀY {item.day}
                    </span>
                    <div className="w-12 h-12 mx-auto rounded-full bg-black/60 border border-slate-700 flex items-center justify-center text-2xl my-2">
                      {item.day === 7 ? '👑' : item.rewardType === 'gold' ? '🪙' : item.rewardType === 'diamonds' ? '💎' : item.rewardType === 'gacha' ? '🎟️' : '⚔️'}
                    </div>
                    <p className="text-xs font-black text-white leading-snug">{item.rewardLabel}</p>
                  </div>

                  <div className="pt-3">
                    {item.isClaimed ? (
                      <span className="w-full py-1 block bg-slate-800 text-slate-400 text-[10px] font-black uppercase border border-black">
                        ✓ ĐÃ NHẬN
                      </span>
                    ) : item.canClaim ? (
                      <button
                        onClick={() => handleClaimDay(idx)}
                        className="w-full py-1.5 bg-[#10ffa0] hover:bg-emerald-400 text-black text-[11px] font-black uppercase border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5"
                      >
                        NHẬN NGAY
                      </button>
                    ) : (
                      <span className="w-full py-1 block bg-[#10141f] text-slate-500 text-[10px] font-bold uppercase border border-slate-800">
                        CHƯA MỞ
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: LUCKY CYBER WHEEL */}
      {/* ========================================================================= */}
      {activeSubTab === 'wheel' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="bg-[#121622] border-2 border-black p-4 md:p-6 shadow-[4px_4px_0_#000]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Wheel Graphic */}
              <div className="flex flex-col items-center justify-center relative">
                {/* Needle */}
                <div className="absolute top-0 z-20 text-3xl text-amber-400 filter drop-shadow-[0_4px_6px_#000] animate-bounce">
                  ▼
                </div>

                {/* Rotating Wheel Container */}
                <div
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-black shadow-[0_0_40px_#00f0ff44] overflow-hidden relative transition-all duration-[3000ms] ease-out flex items-center justify-center bg-gradient-to-tr from-purple-900 via-slate-900 to-black"
                  style={{ transform: `rotate(${wheelRotation}deg)` }}
                >
                  {/* Wheel spokes / items */}
                  {LUCKY_WHEEL_SLOTS.map((slot, idx) => {
                    const angle = idx * 45;
                    return (
                      <div
                        key={slot.id}
                        className="absolute w-full h-full top-0 left-0 flex items-start justify-center pt-3 select-none pointer-events-none"
                        style={{ transform: `rotate(${angle}deg)` }}
                      >
                        <div className="text-center font-black text-[10px] md:text-xs text-white drop-shadow-[0_2px_4px_#000]">
                          <span className="block text-base md:text-xl">{slot.icon}</span>
                          <span className="block max-w-[70px] truncate">{slot.name}</span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Center Hub */}
                  <div className="w-16 h-16 rounded-full bg-black border-4 border-amber-400 z-10 flex items-center justify-center text-amber-300 font-black text-xs shadow-[0_0_15px_#f59e0b]">
                    JB
                  </div>
                </div>

                {/* Prize Banner */}
                {wheelWonPrize && (
                  <div className="mt-4 p-2.5 bg-gradient-to-r from-amber-500 to-rose-600 text-white font-black text-xs border-2 border-black shadow-[3px_3px_0_#000] text-center animate-bounce">
                    🎉 CHÚC MỪNG BẠN TRÚNG: [{wheelWonPrize.name}]!
                  </div>
                )}
              </div>

              {/* Spin Controls & Rules */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="bg-[#00f0ff] text-black text-[10px] font-black px-2 py-0.5 border border-black uppercase tracking-wider">
                    VÒNG QUAY MAY MẮN SỐ 1
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase">
                    VÒNG QUAY THẦN TÀI CYBER 2026
                  </h3>
                  <p className="text-xs text-slate-300">
                    Cơ hội trúng ngay <strong>Sovereign 1-of-1 Token</strong>, 10,000 Kim Cương và Vũ Khí Mythic cực phẩm!
                  </p>
                </div>

                <div className="bg-[#0a0d14] p-3 border-2 border-black space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Số Kim Cương của bạn:</span>
                    <strong className="text-[#00f0ff] font-mono text-sm">{diamonds.toLocaleString()} 💎</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Lượt quay miễn phí hôm nay:</span>
                    <strong className="text-[#10ffa0]">1 Lượt sẵn sàng</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    disabled={isSpinning}
                    onClick={() => handleSpinWheel(true)}
                    className="py-3 bg-[#10ffa0] hover:bg-emerald-400 text-black font-black text-xs md:text-sm uppercase border-2 border-black shadow-[4px_4px_0_#000] active:translate-x-0.5 disabled:opacity-50"
                  >
                    {isSpinning ? 'Đang quay...' : 'QUAY MIỄN PHÍ'}
                  </button>

                  <button
                    disabled={isSpinning}
                    onClick={() => handleSpinWheel(false)}
                    className="py-3 bg-[#00f0ff] hover:bg-cyan-300 text-black font-black text-xs md:text-sm uppercase border-2 border-black shadow-[4px_4px_0_#000] active:translate-x-0.5 disabled:opacity-50"
                  >
                    {isSpinning ? 'Đang quay...' : 'QUAY 100 💎'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: STREET PASS 2026 */}
      {/* ========================================================================= */}
      {activeSubTab === 'pass' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="bg-[#121622] border-2 border-black p-4 space-y-4 shadow-[4px_4px_0_#000]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-amber-950 via-slate-900 to-black p-3 border-2 border-amber-400">
              <div>
                <span className="text-[10px] text-amber-300 font-black uppercase tracking-wider block">
                  CHIẾN DỊCH MÙA 1 (30 CẤP ĐỘ)
                </span>
                <h3 className="text-lg md:text-xl font-black uppercase text-white">
                  STREET BATTLE PASS: VUA PHỐ CỔ
                </h3>
                <p className="text-xs text-slate-300">
                  Cấp Pass hiện tại: <strong className="text-amber-400 font-mono text-sm">Cấp {passLevel} / 30</strong>
                </p>
              </div>

              {!isPremiumUnlocked ? (
                <button
                  onClick={handleUnlockPremiumPass}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-300 hover:from-amber-400 hover:to-yellow-200 text-black font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0_#000] active:translate-x-0.5 flex items-center gap-1.5"
                >
                  <Crown className="w-4 h-4 fill-black" />
                  <span>MỞ KHÓA HOÀNG KIM (999 💎)</span>
                </button>
              ) : (
                <span className="px-3 py-1 bg-amber-400 text-black font-black text-xs uppercase border border-black">
                  ✓ ĐÃ KÍCH HOẠT VIP PASS
                </span>
              )}
            </div>

            {/* Pass Tiers List */}
            <div className="space-y-2">
              {[
                { lvl: 5, free: '50,000 Vàng', vip: '500 Kim Cương + 5 Vé Gacha' },
                { lvl: 10, free: 'Rương Trang Bị Rare', vip: 'Rương Vũ Khí Legendary' },
                { lvl: 15, free: '100,000 Vàng', vip: '1,500 Kim Cương + Cánh Cyber' },
                { lvl: 20, free: '10 Vé Gacha', vip: 'Thần Tướng Mythic Tự Chọn' },
                { lvl: 25, free: '200,000 Vàng', vip: 'Rương Trang Bị Mythic 80★' },
                { lvl: 30, free: '1,000 Kim Cương', vip: 'Trang Bị Tối Thượng Sovereign 1-of-1' }
              ].map(tier => {
                const isReached = passLevel >= tier.lvl;
                return (
                  <div
                    key={tier.lvl}
                    className={`p-3 border-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
                      isReached ? 'bg-[#182338]' : 'bg-[#0d1017] opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full border-2 border-black flex items-center justify-center font-black text-xs ${
                          isReached ? 'bg-[#00f0ff] text-black' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Lv.{tier.lvl}
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">
                          Tầng Thường (Free): <strong className="text-white">{tier.free}</strong>
                        </span>
                        <span className="text-[10px] text-amber-300 font-bold block uppercase">
                          Tầng Hoàng Kim (VIP): <strong className="text-yellow-300">{tier.vip}</strong>
                        </span>
                      </div>
                    </div>

                    <button
                      disabled={!isReached}
                      onClick={() => {
                        sound.playCritImpact();
                        onAddGold(100000);
                        if (isPremiumUnlocked) onAddDiamonds(500);
                        try {
                          confetti({ particleCount: 80, spread: 60 });
                        } catch {}
                        alert(`🎁 ĐÃ NHẬN THƯỞNG PASS CẤP ${tier.lvl}!`);
                      }}
                      className={`px-3 py-1.5 text-xs font-black uppercase border border-black ${
                        isReached
                          ? 'bg-[#10ffa0] hover:bg-emerald-400 text-black shadow-[2px_2px_0_#000]'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {isReached ? 'Nhận Quà Cấp' : 'Chưa Đạt Cấp'}
                    </button>
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
