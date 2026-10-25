'use client';

import React from 'react';
import { Volume2, VolumeX, Shield, Sparkles, RefreshCw, Layers, Swords, Gift, MapPin, Hammer, User, Activity, Flame } from 'lucide-react';
import { sound } from '@/utils/soundEffects';

interface HeaderNavProps {
  gold: number;
  diamonds: number;
  bossTickets: number;
  currentEnergy: number;
  maxEnergy: number;
  activeTab: 'bosshub' | 'battle' | 'squad' | 'gacha' | 'stages' | 'inventory' | 'events';
  setActiveTab: (tab: 'bosshub' | 'battle' | 'squad' | 'gacha' | 'stages' | 'inventory' | 'events') => void;
  onResetBattle: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  serverStatus?: 'online' | 'offline' | 'checking';
  latencyMs?: number;
  username?: string;
  vipLevel?: number;
  onOpenAuthModal?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  gold,
  diamonds,
  bossTickets,
  currentEnergy,
  maxEnergy,
  activeTab,
  setActiveTab,
  onResetBattle,
  soundEnabled,
  setSoundEnabled,
  serverStatus = 'online',
  latencyMs = 12,
  username = 'JaeBinMaster',
  vipLevel = 8,
  onOpenAuthModal
}) => {
  const toggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sound.playCardWhoosh();
    }
  };

  return (
    <header className="w-full bg-[#10141f] border-b-2 border-black px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-[0_4px_0_#000000] z-30 sticky top-0">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#00f0ff] border-2 border-black flex items-center justify-center font-black text-black text-lg shadow-[2px_2px_0_#000]">
          JB
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-wider text-white text-base md:text-lg">
              ANHEM JAEBIN
            </span>
            <span className="bg-[#ff0055] text-white text-[10px] font-black px-1.5 py-0.5 border border-black uppercase tracking-widest shadow-[1px_1px_0_#000]">
              2026 WEB CARD
            </span>
          </div>
          <p className="text-[11px] text-[#00f0ff] font-bold tracking-tight">
            ĂN CHƠI ĐIỆU NGHỆ • SĂN BOSS & ĐỘI HÌNH BÀI TRÙNG
          </p>
        </div>
      </div>

      {/* Navigation View Switcher */}
      <div className="flex items-center gap-1.5 bg-[#0a0d14] p-1 border-2 border-black shadow-[2px_2px_0_#000] overflow-x-auto">
        {/* Boss Hub Button (Image 1 Style) */}
        <button
          onClick={() => { sound.playCardWhoosh(); setActiveTab('bosshub'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase transition-all ${
            activeTab === 'bosshub'
              ? 'bg-[#b45309] text-white border-2 border-amber-300 shadow-[2px_2px_0_#000]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Săn Boss (Hub)</span>
        </button>

        {/* Auto Battle Arena Button (Image 2 Style) */}
        <button
          onClick={() => { sound.playCardWhoosh(); setActiveTab('battle'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase transition-all ${
            activeTab === 'battle'
              ? 'bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0_#000]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Swords className="w-3.5 h-3.5" />
          <span>Đấu Boss Auto</span>
        </button>

        {/* Stages Map */}
        <button
          onClick={() => { sound.playCardWhoosh(); setActiveTab('stages'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase transition-all ${
            activeTab === 'stages'
              ? 'bg-[#10b981] text-black border-2 border-black shadow-[2px_2px_0_#000]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Bản Đồ Ải</span>
        </button>

        {/* Squad */}
        <button
          onClick={() => { sound.playCardWhoosh(); setActiveTab('squad'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase transition-all ${
            activeTab === 'squad'
              ? 'bg-[#ff0055] text-white border-2 border-black shadow-[2px_2px_0_#000]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Đội Hình & Đồ</span>
        </button>

        {/* Inventory & Forge */}
        <button
          onClick={() => { sound.playCardWhoosh(); setActiveTab('inventory'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase transition-all ${
            activeTab === 'inventory'
              ? 'bg-[#8b5cf6] text-white border-2 border-purple-300 shadow-[2px_2px_0_#000]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Hammer className="w-3.5 h-3.5 text-purple-300" />
          <span>Túi Đồ & Rèn</span>
        </button>

        {/* Gacha */}
        <button
          onClick={() => { sound.playCardWhoosh(); setActiveTab('gacha'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase transition-all ${
            activeTab === 'gacha'
              ? 'bg-[#f59e0b] text-black border-2 border-black shadow-[2px_2px_0_#000]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>Bóc Pack 3D</span>
        </button>

        {/* Live Events (FEAT-011) */}
        <button
          onClick={() => { sound.playCardWhoosh(); setActiveTab('events'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase transition-all ${
            activeTab === 'events'
              ? 'bg-[#ef4444] text-white border-2 border-amber-400 shadow-[2px_2px_0_#000] animate-pulse'
              : 'text-slate-400 hover:text-amber-400'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Sự Kiện</span>
          <span className="bg-[#ff0055] text-white text-[9px] font-black px-1 py-0.2 border border-black shadow-[1px_1px_0_#000]">
            HOT
          </span>
        </button>
      </div>

      {/* Currencies & Controls */}
      <div className="flex items-center gap-3">
        {/* Street Energy */}
        <div className="flex items-center gap-1 bg-[#1a2030] border-2 border-black px-2.5 py-1 shadow-[2px_2px_0_#000]">
          <span className="text-[#00f0ff] text-xs font-black">⚡ NĂNG LƯỢNG:</span>
          <span className="text-white text-xs font-black">
            {currentEnergy}/{maxEnergy}
          </span>
        </div>

        {/* Gold */}
        <div className="hidden sm:flex items-center gap-1 bg-[#1a2030] border-2 border-black px-2 py-1 shadow-[2px_2px_0_#000]">
          <span className="text-[#f59e0b] text-xs font-black">🪙</span>
          <span className="text-white text-xs font-mono font-bold">
            {gold.toLocaleString()}
          </span>
        </div>

        {/* Diamonds */}
        <div className="hidden sm:flex items-center gap-1 bg-[#1a2030] border-2 border-black px-2 py-1 shadow-[2px_2px_0_#000]">
          <span className="text-[#00f0ff] text-xs font-black">💎</span>
          <span className="text-white text-xs font-mono font-bold">
            {diamonds.toLocaleString()}
          </span>
        </div>

        {/* Live Server Indicator & Account Modal Button */}
        <button
          onClick={() => {
            sound.playCardWhoosh();
            onOpenAuthModal?.();
          }}
          title="Xem trạng thái Server DB & Tài khoản"
          className="flex items-center gap-1.5 bg-[#121622] hover:bg-[#1a2030] border-2 border-[#00f0ff] px-2 py-1 shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              serverStatus === 'online'
                ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]'
                : serverStatus === 'checking'
                ? 'bg-amber-400'
                : 'bg-rose-500'
            }`}
          />
          <div className="text-left hidden md:block">
            <span className="text-[10px] text-[#00f0ff] font-extrabold block leading-tight">
              {serverStatus === 'online' ? `LIVE DB :3001` : 'OFFLINE'}
            </span>
            <span className="text-[9px] text-slate-300 font-bold block leading-tight truncate max-w-[80px]">
              {username}
            </span>
          </div>
          <User className="w-3.5 h-3.5 text-[#00f0ff]" />
        </button>

        {/* Reset / Sound Buttons */}
        <button
          onClick={onResetBattle}
          title="Reset lại ván đấu"
          className="p-1.5 bg-[#1e293b] text-slate-300 hover:text-white border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <button
          onClick={toggleSound}
          title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          className={`p-1.5 border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 ${
            soundEnabled ? 'bg-[#10ffa0] text-black' : 'bg-[#1e293b] text-slate-400'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
