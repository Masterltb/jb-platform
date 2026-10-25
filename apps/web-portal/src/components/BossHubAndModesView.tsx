'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Skull, Swords, Zap, Shield, Sparkles, Clock, Plus, BookOpen, Bell, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { sound } from '@/utils/soundEffects';

interface BossTier {
  id: string;
  rebornTier: string;
  level: number;
  name: string;
  title: string;
  image: string;
  status: 'refreshed' | 'locked';
  avatarEmoji: string;
  avatarBg: string;
  maxHp: number;
  maxBreak: number;
  def: number;
  atk: number;
  recommendedCP: number;
  drops: {
    name: string;
    type: string;
    rarity: 'Sovereign' | 'Mythic' | 'Legendary' | 'Epic' | 'Rare';
    stars: number;
    color: string;
    icon: string;
  }[];
}

interface BossHubAndModesViewProps {
  onEnterBattle: (bossInfo: {
    id: string;
    name: string;
    level: number;
    title: string;
    image: string;
    maxHp: number;
    maxBreak: number;
    def: number;
    atk: number;
    avatarBg: string;
  }) => void;
  gold: number;
  diamonds: number;
}

export const BossHubAndModesView: React.FC<BossHubAndModesViewProps> = ({
  onEnterBattle,
  gold,
  diamonds
}) => {
  const [selectedMode, setSelectedMode] = useState<'suda' | 'private' | 'world' | 'guild'>('suda');
  const [autoBattleEnabled, setAutoBattleEnabled] = useState<boolean>(true);
  const [bossAttempts, setBossAttempts] = useState<number>(3);
  const maxAttempts = 6;

  const bossTiers: BossTier[] = [
    {
      id: 'tier_5',
      rebornTier: '5 Chuyển',
      level: 300,
      name: 'Boss Sư Đà Vương',
      title: 'Hỏa Sư Cuồng Ma',
      image: '/images/bosses/boss_sudavuong_v2.png',
      status: 'refreshed',
      avatarEmoji: '🦁',
      avatarBg: 'from-amber-950 via-orange-950 to-black',
      maxHp: 250000,
      maxBreak: 4000,
      def: 1200,
      atk: 3500,
      recommendedCP: 450000,
      drops: [
        { name: 'Đao Sư Đà Cuồng Nộ', type: 'Vũ Khí', rarity: 'Epic', stars: 2, color: '#a855f7', icon: '🗡️' },
        { name: 'Hộ Giáp Hỏa Sư', type: 'Giáp', rarity: 'Epic', stars: 2, color: '#a855f7', icon: '🥋' }
      ]
    },
    {
      id: 'tier_6',
      rebornTier: '6 Chuyển',
      level: 371,
      name: 'Boss Cửu Linh Thị Xà',
      title: 'Yêu Vương Biển Sâu',
      image: '/images/bosses/boss_cuulinhthixa_v2.png',
      status: 'refreshed',
      avatarEmoji: '🐉',
      avatarBg: 'from-rose-950 via-purple-950 to-black',
      maxHp: 650000,
      maxBreak: 8000,
      def: 2400,
      atk: 5800,
      recommendedCP: 800000,
      drops: [
        { name: 'Thần Dược Cửu Linh', type: 'Đan Dược', rarity: 'Sovereign', stars: 3, color: '#ff007f', icon: '💎' },
        { name: 'Thần Kiếm 6 Chuyển', type: 'Vũ Khí', rarity: 'Mythic', stars: 3, color: '#ef4444', icon: '⚔️' },
        { name: 'Thần Giáp 4 Chuyển', type: 'Giáp Thân', rarity: 'Legendary', stars: 3, color: '#f59e0b', icon: '🛡️' },
        { name: 'Cổ Vật Trấn Ma', type: 'Pháp Bảo', rarity: 'Legendary', stars: 3, color: '#f59e0b', icon: '🏺' },
        { name: 'Bí Kíp Thái Cực', type: 'Kinh Sách', rarity: 'Legendary', stars: 2, color: '#f59e0b', icon: '📜' },
        { name: 'Kiếm Huyết Thần', type: 'Vũ Khí', rarity: 'Mythic', stars: 3, color: '#ef4444', icon: '🗡️' },
        { name: 'Giày Phong Lôi', type: 'Giày', rarity: 'Legendary', stars: 3, color: '#f59e0b', icon: '👟' },
        { name: 'Mão Tử Kim', type: 'Mũ', rarity: 'Epic', stars: 3, color: '#a855f7', icon: '👑' },
        { name: 'Bào Tử Thần', type: 'Áo', rarity: 'Epic', stars: 3, color: '#a855f7', icon: '👘' },
        { name: 'Quần Dạ Hành', type: 'Quần', rarity: 'Epic', stars: 3, color: '#a855f7', icon: '👖' }
      ]
    },
    {
      id: 'tier_7',
      rebornTier: '7 Chuyển',
      level: 420,
      name: 'Boss Kim Bằng Quỷ Vương',
      title: 'Bá Chủ Không Gian',
      image: '/images/bosses/boss_kimbangquyvuong_v2.png',
      status: 'refreshed',
      avatarEmoji: '🦅',
      avatarBg: 'from-amber-950 via-yellow-950 to-black',
      maxHp: 1500000,
      maxBreak: 15000,
      def: 4500,
      atk: 9200,
      recommendedCP: 1500000,
      drops: [
        { name: 'Kim Bằng Cơ Khí Hộ Thân', type: 'Thú Cưỡi', rarity: 'Legendary', stars: 3, color: '#f59e0b', icon: '🦅' },
        { name: 'Cung Thần Ưng Lượng Tử', type: 'Vũ Khí', rarity: 'Legendary', stars: 3, color: '#f59e0b', icon: '🏹' }
      ]
    },
    {
      id: 'tier_8',
      rebornTier: '8 Chuyển',
      level: 520,
      name: 'Kim Cang Cự Thú',
      title: 'Thiết Giáp Tối Thượng',
      image: '/images/bosses/boss_sudavuong_v2.png',
      status: 'locked',
      avatarEmoji: '🦏',
      avatarBg: 'from-cyan-950 to-black',
      maxHp: 3000000,
      maxBreak: 30000,
      def: 6000,
      atk: 15000,
      recommendedCP: 2500000,
      drops: [
        { name: 'Kim Cang Bổng', type: 'Vũ Khí', rarity: 'Sovereign', stars: 3, color: '#ff007f', icon: '🔱' }
      ]
    },
    {
      id: 'tier_9',
      rebornTier: '9 Chuyển',
      level: 620,
      name: 'Cửu Thiên Ma Tổ',
      title: 'Bá Chủ Hư Không',
      image: '/images/bosses/boss_cuulinhthixa_v2.png',
      status: 'locked',
      avatarEmoji: '🧙‍♂️',
      avatarBg: 'from-amber-950 to-black',
      maxHp: 6000000,
      maxBreak: 50000,
      def: 9000,
      atk: 25000,
      recommendedCP: 5000000,
      drops: [
        { name: 'Trượng Hư Không', type: 'Vũ Khí', rarity: 'Sovereign', stars: 3, color: '#ff007f', icon: '🔮' }
      ]
    },
    {
      id: 'tier_bachho',
      rebornTier: 'Thần Thoại I',
      level: 680,
      name: 'Bạch Hổ Thần Tướng Lôi Chấn Quân',
      title: 'Bạo Kích Trảm Sát (Cần Khiên & Heal Bất Tử)',
      image: '/images/bosses/boss_kimbangquyvuong_v2.png',
      status: 'refreshed',
      avatarEmoji: '🐯',
      avatarBg: 'from-yellow-950 via-amber-900 to-black',
      maxHp: 8500000,
      maxBreak: 60000,
      def: 10000,
      atk: 32000,
      recommendedCP: 6500000,
      drops: [
        { name: 'Bạch Hổ Lôi Kiếm', type: 'Vũ Khí', rarity: 'Sovereign', stars: 4, color: '#ff007f', icon: '⚔️' },
        { name: 'Lôi Giáp Hộ Thân', type: 'Giáp Thân', rarity: 'Mythic', stars: 3, color: '#ef4444', icon: '🥋' }
      ]
    },
    {
      id: 'tier_hatvuong',
      rebornTier: 'Thần Thoại II',
      level: 750,
      name: 'U Minh Hạt Vương Thiên Độc',
      title: 'Kịch Độc Ăn Mòn (Cần Cleanse & Team Heal)',
      image: '/images/bosses/boss_cuulinhthixa_v2.png',
      status: 'refreshed',
      avatarEmoji: '🦂',
      avatarBg: 'from-emerald-950 via-teal-900 to-black',
      maxHp: 12000000,
      maxBreak: 75000,
      def: 12000,
      atk: 38000,
      recommendedCP: 8500000,
      drops: [
        { name: 'Độc Hạt Phù Chỉ', type: 'Pháp Bảo', rarity: 'Sovereign', stars: 4, color: '#ff007f', icon: '💎' },
        { name: 'U Độc Châu', type: 'Đan Dược', rarity: 'Mythic', stars: 3, color: '#ef4444', icon: '🔮' }
      ]
    },
    {
      id: 'tier_thienho',
      rebornTier: 'Thần Thoại III',
      level: 820,
      name: 'Cửu Vĩ Thiên Hồ Mị Ảnh Chi Vương',
      title: 'Triệu Hồi Ảo Ảnh (Cần AoE Crit Burst Dọn Đệ)',
      image: '/images/bosses/boss_sudavuong_v2.png',
      status: 'refreshed',
      avatarEmoji: '🦊',
      avatarBg: 'from-purple-950 via-pink-900 to-black',
      maxHp: 16500000,
      maxBreak: 90000,
      def: 14000,
      atk: 45000,
      recommendedCP: 11000000,
      drops: [
        { name: 'Cửu Vĩ Mị Vũ Hài', type: 'Giày', rarity: 'Sovereign', stars: 4, color: '#ff007f', icon: '👟' },
        { name: 'Thiên Hồ Linh Đan', type: 'Đan Dược', rarity: 'Sovereign', stars: 4, color: '#ff007f', icon: '🌸' }
      ]
    },
    {
      id: 'tier_hoakylan',
      rebornTier: 'Thần Thoại IV',
      level: 900,
      name: 'Hỏa Kỳ Lân Thần Thú Viêm Ma Nộ',
      title: 'Cuồng Bạo 100% Công Khi Máu Dưới 50%',
      image: '/images/bosses/boss_sudavuong_v2.png',
      status: 'refreshed',
      avatarEmoji: '🔥',
      avatarBg: 'from-red-950 via-orange-900 to-black',
      maxHp: 22000000,
      maxBreak: 120000,
      def: 16000,
      atk: 55000,
      recommendedCP: 14000000,
      drops: [
        { name: 'Hỏa Kỳ Lân Chiến Bào', type: 'Áo', rarity: 'Sovereign', stars: 5, color: '#ff007f', icon: '👘' },
        { name: 'Viêm Hỏa Châu', type: 'Pháp Bảo', rarity: 'Mythic', stars: 4, color: '#ef4444', icon: '🔥' }
      ]
    },
    {
      id: 'tier_titancyber',
      rebornTier: 'Vô Cực I',
      level: 960,
      name: 'Cơ Giáp Tối Thượng Titan Cyber 2026',
      title: 'Pháo Đài Kim Loại Phản Chấn & Break 150K',
      image: '/images/bosses/boss_kimbangquyvuong_v2.png',
      status: 'refreshed',
      avatarEmoji: '🤖',
      avatarBg: 'from-cyan-950 via-slate-900 to-black',
      maxHp: 30000000,
      maxBreak: 150000,
      def: 22000,
      atk: 68000,
      recommendedCP: 18000000,
      drops: [
        { name: 'Siêu Chiến Xa Titan Sovereign', type: 'Thú Cưỡi', rarity: 'Sovereign', stars: 5, color: '#ff007f', icon: '🏍️' },
        { name: 'Lõi Lượng Tử Titan', type: 'Pháp Bảo', rarity: 'Sovereign', stars: 5, color: '#ff007f', icon: '⚛️' }
      ]
    },
    {
      id: 'tier_hukhongma',
      rebornTier: 'Đế Thần Sovereign [1-OF-1]',
      level: 999,
      name: 'Hư Không Thần Ma Hỗn Độn Vương',
      title: 'Trùm Cuối Vũ Trụ (Phase 1-2-3 Biến Hình)',
      image: '/images/bosses/boss_cuulinhthixa_v2.png',
      status: 'refreshed',
      avatarEmoji: '👑',
      avatarBg: 'from-pink-950 via-rose-950 to-black',
      maxHp: 50000000,
      maxBreak: 250000,
      def: 30000,
      atk: 95000,
      recommendedCP: 25000000,
      drops: [
        { name: 'Ấn Ký Hỗn Độn Độc Tôn [1-OF-1]', type: 'Pháp Bảo', rarity: 'Sovereign', stars: 6, color: '#ff007f', icon: '👑' },
        { name: 'Vô Cực Thần Kiếm 1-of-1', type: 'Vũ Khí', rarity: 'Sovereign', stars: 6, color: '#ff007f', icon: '⚡' }
      ]
    }
  ];

  const [selectedTier, setSelectedTier] = useState<BossTier>(bossTiers[1]); // Default 6 chuyển

  const handleStartFight = () => {
    sound.playCritImpact();
    onEnterBattle({
      id: selectedTier.id,
      name: selectedTier.name,
      level: selectedTier.level,
      title: `${selectedTier.rebornTier} • ${selectedTier.title}`,
      image: selectedTier.image,
      maxHp: selectedTier.maxHp,
      maxBreak: selectedTier.maxBreak,
      def: selectedTier.def,
      atk: selectedTier.atk,
      avatarBg: selectedTier.avatarBg
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-2 md:p-5 space-y-4 font-sans text-slate-100">
      {/* TOP HEADER: Game Title, Currencies */}
      <div className="bg-[#120a06] border-2 border-[#b45309] px-4 py-2 flex flex-wrap items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-red-700 flex items-center justify-center text-lg font-black text-black shadow-[0_0_10px_#f59e0b]">
            🐉
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[#fef08a] tracking-wider uppercase drop-shadow-[0_2px_4px_#000]">
            SƯ ĐÀ YÊU LĨNH • SĂN TRÙM MA THÚ
          </h1>
        </div>

        {/* Currency Display */}
        <div className="flex items-center gap-3 text-xs md:text-sm font-mono font-bold">
          <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 border border-amber-800 rounded">
            <span className="text-amber-400">🔥 Đan Hồn:</span>
            <span className="text-white font-bold">120</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 border border-amber-800 rounded">
            <span className="text-yellow-400">🪙 Vàng:</span>
            <span className="text-white font-bold">{gold.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 border border-amber-800 rounded">
            <span className="text-cyan-400">💎 Kim Cương:</span>
            <span className="text-white font-bold">{diamonds.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* MAIN HUB STAGE: Center 3D Boss + Right Drops Grid (Mirror Image 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-gradient-to-b from-[#180d08] via-[#0f0907] to-[#080504] border-2 border-[#78350f] p-3 md:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.9)] relative overflow-hidden rounded-sm">
        {/* Ambient Dark Fantasy Smoke */}
        <div className="absolute -top-32 left-1/3 w-96 h-96 bg-red-900/15 rounded-full blur-3xl pointer-events-none" />

        {/* LEFT & CENTER (8 cols): Colossal 3D Boss Showcase */}
        <div className="lg:col-span-8 flex flex-col items-center justify-between min-h-[380px] md:min-h-[460px] relative">
          {/* Boss Name Tag Badge on Left */}
          <div className="absolute top-2 left-2 z-20 bg-black/80 border border-amber-700/80 p-2.5 rounded shadow-[0_4px_10px_#000]">
            <span className="text-[10px] font-black uppercase text-amber-500 block tracking-widest">
              TRÙM SƯ ĐÀ
            </span>
            <h2 className="text-lg md:text-xl font-black text-rose-300 drop-shadow-[0_2px_4px_#ef4444]">
              {selectedTier.name}
            </h2>
            <p className="text-[11px] font-bold text-slate-300 mt-0.5">
              Cấp: <span className="text-amber-400">{selectedTier.level}</span> ({selectedTier.rebornTier})
            </p>
          </div>

          {/* 18+ Mature Action Badge */}
          <div className="absolute top-2 right-2 md:right-10 z-20 w-8 h-8 rounded-full border-2 border-red-600 bg-black flex items-center justify-center text-xs font-black text-red-500 shadow-[0_0_8px_#ef4444]">
            18+
          </div>

          {/* Colossal Boss Center Graphic */}
          <div className="flex-1 w-full flex flex-col items-center justify-center my-6 relative z-10">
            {/* Boss Pedestal Glow */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-t from-red-950/70 via-purple-950/40 to-transparent flex items-center justify-center border-b-4 border-amber-600/60 shadow-[0_20px_50px_rgba(239,68,68,0.4)] group">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-red-500/30 animate-ping pointer-events-none" />

              {/* Monster Avatar */}
              <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-2 border-amber-500/50 shadow-[0_0_20px_#ef4444] transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={selectedTier.image}
                  alt={selectedTier.name}
                  fill
                  sizes="240px"
                  className="object-contain p-2 drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
                  priority
                />
              </div>

              {/* Dragon Heads Multi-Aura */}
              <div className="absolute -top-3 left-6 text-4xl filter drop-shadow-[0_4px_8px_#ef4444] animate-pulse">
                🐉
              </div>
              <div className="absolute -top-3 right-6 text-4xl filter drop-shadow-[0_4px_8px_#ef4444] animate-pulse">
                🐉
              </div>

              {/* Level & Subtitle floating below */}
              <div className="absolute -bottom-4 bg-gradient-to-r from-amber-900 via-red-950 to-amber-900 border border-amber-500 px-4 py-1 rounded shadow-[0_4px_10px_#000]">
                <span className="text-xs font-black text-amber-200 tracking-wider uppercase">
                  {selectedTier.rebornTier} • {selectedTier.level} CẤP • {selectedTier.status === 'refreshed' ? 'ĐÃ LÀM MỚI ✓' : 'CHƯA MỞ'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (4 cols): RỚT HIẾM (DROP POOL GRID) (Mirror Image 1) */}
        <div className="lg:col-span-4 bg-[#0d0705]/90 border-2 border-[#b45309] p-3 flex flex-col shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
          <div className="border-b-2 border-amber-900/80 pb-2 mb-2 flex items-center justify-between">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              RỚT HIẾM (DROP POOL)
            </h3>
            <span className="text-[10px] text-slate-400 font-bold">Tỉ lệ rơi đồ cực cao</span>
          </div>

          {/* Grid 2x5 Drops */}
          <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto max-h-[360px] pr-1">
            {selectedTier.drops.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#1a0f0a] border p-2 flex flex-col justify-between rounded-sm relative group hover:scale-[1.02] transition-transform"
                style={{ borderColor: item.color }}
              >
                {/* Rarity & Stars */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center text-[9px] text-amber-400">
                    {Array.from({ length: item.stars }).map((_, s) => (
                      <span key={s}>★</span>
                    ))}
                  </div>
                  <span
                    className="text-[8px] font-black uppercase px-1 py-0.2 rounded"
                    style={{ backgroundColor: `${item.color}33`, color: item.color }}
                  >
                    {item.rarity}
                  </span>
                </div>

                {/* Item Icon & Name */}
                <div className="flex items-center gap-2 my-1">
                  <div
                    className="w-8 h-8 rounded border flex items-center justify-center text-base shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.8)]"
                    style={{ borderColor: item.color, backgroundColor: `${item.color}22` }}
                  >
                    {item.icon}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-black truncate text-white" style={{ color: item.color }}>
                      {item.name}
                    </p>
                    <p className="text-[9px] text-slate-400 truncate">{item.type}</p>
                  </div>
                </div>

                <div className="text-[8px] text-right text-slate-500 font-mono">
                  {selectedTier.rebornTier}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HORIZONTAL TIER SELECTOR: 5 Chuyển, 6 Chuyển, 7 Chuyển... (Mirror Image 1) */}
      <div className="bg-[#120a06] border-2 border-amber-900/80 p-2 overflow-x-auto">
        <div className="flex items-center gap-3 min-w-max">
          {bossTiers.map((tier) => {
            const isSelected = selectedTier.id === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => {
                  sound.playCardWhoosh();
                  setSelectedTier(tier);
                }}
                className={`p-2.5 rounded-sm border-2 flex items-center gap-3 min-w-[170px] transition-all text-left ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-900/90 to-red-950/90 border-amber-400 shadow-[0_0_15px_#f59e0b]'
                    : tier.status === 'refreshed'
                    ? 'bg-[#1c100a] border-amber-900 hover:border-amber-600'
                    : 'bg-[#0f0805] border-stone-800 opacity-60 cursor-not-allowed'
                }`}
                disabled={tier.status === 'locked'}
              >
                <div className="w-10 h-10 rounded-full bg-black/60 border border-amber-700 flex items-center justify-center text-xl shrink-0 shadow-[0_2px_4px_#000]">
                  {tier.avatarEmoji}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-black text-amber-300 uppercase">
                      {tier.rebornTier}
                    </span>
                    {tier.status === 'locked' && <Lock className="w-3 h-3 text-stone-500" />}
                  </div>
                  <p className="text-xs font-black text-white">{tier.level} Cấp</p>
                  <p className={`text-[10px] font-bold ${
                    tier.status === 'refreshed' ? 'text-emerald-400' : 'text-stone-500'
                  }`}>
                    {tier.status === 'refreshed' ? 'Đã làm mới' : 'Chưa mở khóa'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CONTROLS & ACTION BAR (Mirror Image 1) */}
      <div className="bg-[#120a06] border-2 border-[#b45309] p-3 flex flex-wrap items-center justify-between gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
        {/* Attempts & Timer */}
        <div className="flex items-center gap-3 text-xs md:text-sm font-bold">
          <span className="text-amber-200">Lượt Yêu Vương:</span>
          <div className="flex items-center gap-1 bg-black/80 px-2.5 py-1 border border-amber-700 rounded text-amber-400 font-mono font-black">
            <span>{bossAttempts}/{maxAttempts}</span>
            <button
              onClick={() => {
                if (bossAttempts < maxAttempts && diamonds >= 50) {
                  setBossAttempts(prev => prev + 1);
                  sound.playBuffSound();
                }
              }}
              className="text-emerald-400 hover:scale-110 ml-1"
              title="Mua thêm lượt (+50 Kim Cương)"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-stone-400 text-xs flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-stone-400" /> (00:28:26 hồi 1 lần)
          </span>
        </div>

        {/* Action Buttons: Đi Ngay & Tự Động */}
        <div className="flex items-center gap-3">
          {/* Toggle Auto */}
          <button
            onClick={() => {
              sound.playCardWhoosh();
              setAutoBattleEnabled(!autoBattleEnabled);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 border rounded font-black text-xs uppercase transition-all ${
              autoBattleEnabled
                ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-[0_0_10px_#10b981]'
                : 'bg-stone-900 border-stone-700 text-stone-400'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Tự Động: {autoBattleEnabled ? 'BẬT' : 'TẮT'}</span>
          </button>

          {/* Nút To "ĐI NGAY" */}
          <button
            onClick={handleStartFight}
            className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-black font-black text-base md:text-lg px-8 py-2.5 border-2 border-amber-300 shadow-[0_0_18px_#10b981] rounded flex items-center gap-2 uppercase tracking-widest active:scale-95 transition-all"
          >
            <Swords className="w-5 h-5 text-black" />
            <span>ĐI NGAY (CHIẾN)</span>
          </button>
        </div>
      </div>

      {/* BOTTOM MODE SELECTOR TABS (Yêu Vương Riêng, Sư Đà Yêu Lĩnh, Server, Bổn Tông, Vượt Tông) */}
      <div className="flex items-center justify-center gap-2 md:gap-4 overflow-x-auto pt-2 border-t border-amber-950">
        {[
          { key: 'private', label: 'Yêu Vương Riêng' },
          { key: 'suda', label: 'Sư Đà Yêu Lĩnh' },
          { key: 'world', label: 'Boss Server' },
          { key: 'guild', label: 'Boss Bổn Tông' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              sound.playCardWhoosh();
              setSelectedMode(tab.key as 'suda' | 'private' | 'world' | 'guild');
            }}
            className={`px-4 py-1.5 text-xs md:text-sm font-black uppercase rounded border transition-all ${
              selectedMode === tab.key
                ? 'bg-gradient-to-r from-red-800 to-amber-700 border-amber-400 text-white shadow-[0_0_10px_#f59e0b]'
                : 'bg-[#120a06] border-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
