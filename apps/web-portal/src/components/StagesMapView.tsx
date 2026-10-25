'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Shield, Zap, Skull, Crown, Star, Flame, CheckCircle, Lock, ArrowRight, Swords, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CAMPAIGN_STAGES, CHAPTERS_META_10, ACTIVE_SYNERGIES } from '@/data/mockGameData';
import { StageNode, CardRarity } from '@/types/game';
import { sound } from '@/utils/soundEffects';
import { gameApi } from '@/services/gameApiClient';

interface StagesMapViewProps {
  playerCP: number;
  onSelectStage: (stage: StageNode) => void;
  onGoToBattle: () => void;
  onClaimAfkRewards?: (rewards: { gold: number; diamonds: number }) => void;
  stagesList?: StageNode[];
  onClearStageSuccess?: (clearedStageId: string) => void;
}

export const StagesMapView: React.FC<StagesMapViewProps> = ({
  playerCP,
  onSelectStage,
  onGoToBattle,
  onClaimAfkRewards,
  stagesList,
  onClearStageSuccess
}) => {
  const [stages, setStages] = useState<StageNode[]>(stagesList || CAMPAIGN_STAGES);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [selectedStage, setSelectedStage] = useState<StageNode>(stages[0] || CAMPAIGN_STAGES[0]);
  const [chapterVictoryBanner, setChapterVictoryBanner] = useState<string | null>(null);

  useEffect(() => {
    if (stagesList && stagesList.length > 0) {
      setStages(stagesList);
      // Keep selectedStage updated with latest clear state
      const current = stagesList.find(s => s.id === selectedStage.id);
      if (current) setSelectedStage(current);
    }
  }, [stagesList, selectedStage.id]);


  // Real-time AFK Idle Rewards Ticker (FEAT-002 & FEAT-007)
  const [afkSeconds, setAfkSeconds] = useState<number>(4520);
  const [afkGold, setAfkGold] = useState<number>(128500);
  const [afkDiamonds, setAfkDiamonds] = useState<number>(45);

  // Sync AFK status from NestJS Fastify backend
  React.useEffect(() => {
    gameApi.getAfkStatus()
      .then(res => {
        if (res && res.elapsedSeconds !== undefined) {
          setAfkSeconds(res.elapsedSeconds);
          setAfkGold(res.accumulatedGold);
          setAfkDiamonds(res.accumulatedDiamonds);
        }
      })
      .catch(() => {});

    const timer = setInterval(() => {
      setAfkSeconds(prev => prev + 1);
      setAfkGold(prev => prev + 35);
      if (Math.random() < 0.1) {
        setAfkDiamonds(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatAfkTime = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClaimAfk = async () => {
    if (afkGold === 0 && afkDiamonds === 0) return;
    sound.playCritImpact();

    try {
      const res = await gameApi.claimAfkRewards();
      if (res && res.claimedGold !== undefined) {
        onClaimAfkRewards?.({ gold: res.claimedGold, diamonds: res.claimedDiamonds });
        try {
          import('canvas-confetti').then(c => c.default({ particleCount: 120, spread: 80 }));
        } catch {}
        alert(`🎁 SERVER XÁC NHẬN: Thu hoạch AFK thành công! Nhận +${res.claimedGold.toLocaleString()} Vàng và +${res.claimedDiamonds} Kim Cương vào ví!`);
        setAfkGold(0);
        setAfkDiamonds(0);
        setAfkSeconds(0);
        return;
      }
    } catch (apiErr: any) {
      console.warn('Backend claim error, using client fallback:', apiErr.message);
    }

    onClaimAfkRewards?.({ gold: afkGold, diamonds: afkDiamonds });
    try {
      import('canvas-confetti').then(c => c.default({ particleCount: 100, spread: 70 }));
    } catch {}
    alert(`🎁 THU HOẠCH THÀNH CÔNG: Nhận +${afkGold.toLocaleString()} Vàng và +${afkDiamonds} Kim Cương!`);
    setAfkGold(0);
    setAfkDiamonds(0);
    setAfkSeconds(0);
  };

  const getRarityBadge = (rarity: CardRarity) => {
    switch (rarity) {
      case 'Sovereign':
        return 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-black font-black border-pink-300 animate-pulse';
      case 'Mythic':
        return 'bg-red-600 text-white font-bold border-red-400';
      case 'Legendary':
        return 'bg-amber-500 text-black font-black border-amber-300';
      case 'Epic':
        return 'bg-purple-600 text-white font-bold border-purple-400';
      case 'Rare':
        return 'bg-blue-600 text-white font-bold border-blue-400';
      case 'Fine':
        return 'bg-emerald-600 text-white font-bold border-emerald-400';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-500';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-3 md:p-6 space-y-6">
      {/* Top Banner / Hero Title */}
      <div className="bg-[#10141f] border-4 border-black p-4 md:p-6 shadow-[6px_6px_0_#000] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#ff0055] text-white text-xs font-black px-2 py-0.5 border border-black uppercase tracking-widest shadow-[2px_2px_0_#000]">
                2026 WORLD MAP
              </span>
              <span className="text-[#00f0ff] text-xs font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> 6 KHU VỰC CHIẾN DỊCH
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide uppercase">
              Bản Đồ Ải Quái & Chiến Thuật Bài Trùng
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Vượt ải diệt Trùm khu phố, mở khóa phó bản săn đồ từ <span className="text-slate-400 font-bold">Common</span> đến <span className="text-[#ff007f] font-black underline decoration-2">Thần Khí Độc Tôn (1-of-1 Server)</span>.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#0a0d14] border-2 border-black p-3 shadow-[3px_3px_0_#000]">
            <Shield className="w-6 h-6 text-[#00f0ff]" />
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase">Lực Chiến Đội Hình (CP)</p>
              <p className="text-xl font-black text-[#00f0ff] font-mono tracking-wider">
                {playerCP.toLocaleString()} CP
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* REAL-TIME AFK IDLE REWARDS WIDGET (FEAT-002 & FEAT-007) */}
      <div className="bg-gradient-to-r from-[#181124] via-[#10141f] to-[#121820] border-2 border-amber-400/80 p-3 md:p-4 shadow-[4px_4px_0_#000] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-xl shadow-[0_0_12px_rgba(245,158,11,0.4)] animate-pulse">
            ⏳
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> THU HOẠCH TREO MÁY REAL-TIME (AFK IDLE REVENUE)
            </span>
            <div className="flex items-center gap-4 text-xs font-mono font-bold mt-0.5">
              <span className="text-slate-300">Thời Gian Treo: <span className="text-cyan-400 font-mono">{formatAfkTime(afkSeconds)}</span></span>
              <span className="text-yellow-400">🪙 +{afkGold.toLocaleString()} Vàng</span>
              <span className="text-cyan-300">💎 +{afkDiamonds} KC</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleClaimAfk}
          className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs uppercase px-5 py-2.5 border-2 border-black shadow-[2px_2px_0_#000] active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 fill-black" />
          <span>THU HOẠCH TỨC THÌ</span>
        </button>
      </div>

      {/* Main Grid: World Map Display + Stage Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive World Map Graphic (7 cols) */}
        <div className="lg:col-span-7 bg-[#10141f] border-4 border-black p-4 shadow-[6px_6px_0_#000] flex flex-col justify-between">
          <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-3">
            <h2 className="text-base font-black text-white uppercase flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#ff0055]" />
              Sơ Đồ Tác Chiến Không Gian 2026
            </h2>
            <span className="text-xs bg-[#00f0ff]/10 text-[#00f0ff] font-bold px-2 py-0.5 border border-[#00f0ff]/30">
              Live Stage Nodes
            </span>
          </div>

          {/* Map Image with Overlaid Hologram Nodes */}
          <div className="relative w-full aspect-video border-2 border-black overflow-hidden shadow-[4px_4px_0_#000] group">
            <Image
              src="/images/world_stage_map.jpg"
              alt="World Stage Map JaeBin Platform"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Quick node markers over the map */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/85 backdrop-blur-md border border-white/20 p-2.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00f0ff] animate-ping" />
                <span className="text-xs font-black text-white uppercase">
                  Đang chọn: {selectedStage.name} (Chương {selectedStage.chapter})
                </span>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 border ${
                selectedStage.isCleared ? 'bg-emerald-950 text-emerald-400 border-emerald-500' : 'bg-amber-950 text-amber-400 border-amber-500'
              }`}>
                {selectedStage.isCleared ? 'Đã Chinh Phục ✓' : 'Đang Khiêu Chiến ⚔️'}
              </span>
            </div>
          </div>

          {/* Chapter Selector Tabs (FEAT-012: 10 Chapters) */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-black uppercase text-slate-300">
              <span className="flex items-center gap-1.5 text-amber-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>CHỌN CHƯƠNG CHIẾN DỊCH (10 KHU VỰC CHIẾN LƯỢC):</span>
              </span>
              <span className="text-[11px] font-mono text-[#00f0ff]">
                Chương {selectedChapter} / 10
              </span>
            </div>

            {/* 10 Chapters Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {CHAPTERS_META_10.map(c => {
                const isActive = selectedChapter === c.chapter;
                // Check if any stage in this chapter is unlocked
                const chapterStages = stages.filter(s => s.chapter === c.chapter);
                const isChapterUnlocked = chapterStages.some(s => s.isUnlocked);
                const isChapterCompleted = chapterStages.length === 10 && chapterStages.every(s => s.isCleared);

                return (
                  <button
                    key={c.chapter}
                    onClick={() => {
                      sound.playCardWhoosh();
                      setSelectedChapter(c.chapter);
                      const firstStage = stages.find(s => s.chapter === c.chapter);
                      if (firstStage) {
                        setSelectedStage(firstStage);
                        onSelectStage(firstStage);
                      }
                    }}
                    className={`py-2 px-2 text-xs font-black uppercase border-2 transition-all flex flex-col items-center justify-center relative overflow-hidden ${
                      isActive
                        ? 'bg-amber-400 text-black border-black shadow-[2px_2px_0_#000] scale-102 font-black'
                        : isChapterCompleted
                        ? 'bg-[#102418] text-emerald-400 border-emerald-600/50 hover:bg-[#163020]'
                        : isChapterUnlocked
                        ? 'bg-[#141926] text-slate-300 border-slate-700 hover:text-white hover:border-[#00f0ff]'
                        : 'bg-[#0a0d14] text-slate-600 border-slate-800 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span>{c.shortTitle}</span>
                      {isChapterCompleted && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Chapter Victory Banner */}
            {chapterVictoryBanner && (
              <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-black border-2 border-emerald-400 p-2.5 shadow-[4px_4px_0_#000] flex items-center justify-between animate-bounce">
                <span className="text-xs font-black text-emerald-300 uppercase flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  {chapterVictoryBanner}
                </span>
                <button
                  onClick={() => setChapterVictoryBanner(null)}
                  className="text-xs text-slate-400 hover:text-white font-bold px-2 py-0.5"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Stages Grid of Selected Chapter (10 Stages per Chapter) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
              {stages.filter(stg => stg.chapter === selectedChapter).map((stg, idx) => {
                const isSelected = selectedStage.id === stg.id;
                const isLastStageOfCh = (idx + 1) === 10;

                return (
                  <button
                    key={stg.id}
                    onClick={() => {
                      sound.playCardWhoosh();
                      setSelectedStage(stg);
                      onSelectStage(stg);
                    }}
                    className={`p-2 border-2 text-left transition-all relative overflow-hidden ${
                      isSelected
                        ? 'bg-[#00f0ff] text-black border-black shadow-[3px_3px_0_#000] scale-102 font-black'
                        : isLastStageOfCh
                        ? 'bg-[#2a0e1a] text-red-300 border-red-500/70 hover:border-red-400'
                        : stg.isUnlocked
                        ? 'bg-[#1a2030] text-white border-black hover:border-[#00f0ff]'
                        : 'bg-[#0c0f17] text-slate-500 border-slate-800 opacity-60 cursor-not-allowed'
                    }`}
                    disabled={!stg.isUnlocked}
                  >
                    <div className="flex items-center justify-between text-[10px] font-black uppercase mb-1">
                      <span className={isLastStageOfCh ? 'text-red-400 font-black' : ''}>
                        {stg.name.split(':')[0]}
                      </span>
                      {stg.isCleared ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      ) : !stg.isUnlocked ? (
                        <Lock className="w-3.5 h-3.5 text-slate-500" />
                      ) : isLastStageOfCh ? (
                        <Skull className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                      ) : (
                        <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                      )}
                    </div>
                    <p className="text-[11px] font-black truncate leading-tight">
                      {stg.name.split(':')[1] || stg.name}
                    </p>
                    {isLastStageOfCh && (
                      <span className="text-[9px] bg-red-600/30 text-red-300 px-1 py-0.2 rounded-xs mt-1 block font-black border border-red-500/40">
                        👹 TRÙM CHƯƠNG
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Selected Stage Intel & Rewards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#10141f] border-4 border-black p-5 shadow-[6px_6px_0_#000]">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#00f0ff]">
                  THÔNG TIN ẢI CHIẾN DỊCH • CHƯƠNG {selectedStage.chapter}
                </span>
                <h3 className="text-xl font-black text-white uppercase">{selectedStage.name}</h3>
                <p className="text-xs text-slate-400">{selectedStage.subtitle}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Yêu Cầu CP</span>
                <span className={`text-sm font-mono font-black ${
                  playerCP >= selectedStage.recommendedCP ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {selectedStage.recommendedCP.toLocaleString()} CP
                </span>
              </div>
            </div>

            {/* Boss Info in this Stage */}
            <div className="bg-[#0a0d14] border-2 border-black p-3 mb-4 shadow-[2px_2px_0_#000] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-950 border-2 border-black flex items-center justify-center text-xl shadow-[1px_1px_0_#000]">
                  👹
                </div>
                <div>
                  <p className="text-[10px] text-red-400 font-black uppercase tracking-wider">Trùm Địa Bàn</p>
                  <p className="text-sm font-black text-white">{selectedStage.bossName}</p>
                </div>
              </div>
              <span className={`text-xs font-mono font-black px-2 py-0.5 border ${
                selectedStage.isCleared ? 'bg-emerald-950 text-emerald-400 border-emerald-500' : 'bg-amber-950 text-amber-400 border-amber-500'
              }`}>
                {selectedStage.isCleared ? 'ĐÃ HOÀN THÀNH ✓' : 'CHƯA HOÀN THÀNH ⚔️'}
              </span>
            </div>

            {/* Stage Drop Pool */}
            <div className="mb-4">
              <p className="text-xs font-black text-slate-300 uppercase mb-2 flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-[#f59e0b]" />
                Vật Phẩm Rơi Ngẫu Nhiên:
              </p>
              <div className="space-y-2">
                {selectedStage.drops.map((drop, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-[#1a2030] border border-black p-2 shadow-[1px_1px_0_#000]"
                  >
                    <span className="text-xs font-bold text-white truncate max-w-[220px]">
                      {drop.name}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 border border-black ${getRarityBadge(drop.rarity)}`}>
                      {drop.rarity.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Battle & Auto-Clear / Advance */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  sound.playAttackImpact();
                  onGoToBattle();
                }}
                className="w-full bg-[#ff0055] hover:bg-[#ff1a6b] text-white font-black py-3 px-4 border-2 border-black shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 uppercase tracking-wider text-sm transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <Swords className="w-4 h-4" />
                <span>Vào Bàn Đấu Khiêu Chiến Ải Này</span>
              </button>

              <button
                onClick={() => {
                  if (!selectedStage.isUnlocked) {
                    alert('Ải này chưa được mở khóa!');
                    return;
                  }

                  sound.playCritImpact();
                  try {
                    confetti({ particleCount: 100, spread: 70 });
                  } catch {}

                  // Calculate advancement
                  const currentCh = selectedStage.chapter;
                  // Extract stage number from id 'stage_{ch}_{s}'
                  const parts = selectedStage.id.split('_');
                  const stageNum = parseInt(parts[2], 10) || 1;
                  const isLastStageOfCh = stageNum === 10;

                  // Update stage state
                  const updatedStages = stages.map(stg => {
                    if (stg.id === selectedStage.id) {
                      return { ...stg, isCleared: true };
                    }
                    // Unlock next stage in current chapter
                    if (stg.chapter === currentCh && stg.id === `stage_${currentCh}_${stageNum + 1}`) {
                      return { ...stg, isUnlocked: true };
                    }
                    // If clearing stage 10, unlock first stage of next chapter
                    if (isLastStageOfCh && currentCh < 10 && stg.id === `stage_${currentCh + 1}_1`) {
                      return { ...stg, isUnlocked: true };
                    }
                    return stg;
                  });

                  setStages(updatedStages);
                  onClearStageSuccess?.(selectedStage.id);

                  if (isLastStageOfCh) {
                    const nextCh = currentCh < 10 ? currentCh + 1 : 10;
                    setChapterVictoryBanner(`🎉 ĐẠI THẮNG! Bạn đã diệt sạch 10 ải và vượt qua Chương ${currentCh}! Đã mở khóa Chương mới: ${CHAPTERS_META_10[nextCh - 1]?.title}!`);
                    setSelectedChapter(nextCh);
                    const nextFirstStage = updatedStages.find(s => s.chapter === nextCh && s.id === `stage_${nextCh}_1`);
                    if (nextFirstStage) {
                      setSelectedStage(nextFirstStage);
                      onSelectStage(nextFirstStage);
                    }
                  } else {
                    const nextStageInCh = updatedStages.find(s => s.id === `stage_${currentCh}_${stageNum + 1}`);
                    if (nextStageInCh) {
                      setSelectedStage(nextStageInCh);
                      onSelectStage(nextStageInCh);
                    }
                  }
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-2.5 px-4 border-2 border-black shadow-[3px_3px_0_#000] flex items-center justify-center gap-2 uppercase tracking-wider text-xs transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>VƯỢT ẢI NHANH & CHUYỂN CHƯƠNG MỚI (AUTO-ADVANCE)</span>
              </button>
            </div>
          </div>

          {/* Server Exclusive 1 of 1 Showcase Card */}
          <div className="bg-[#10141f] border-4 border-black p-4 shadow-[6px_6px_0_#000] relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 border-2 border-[#ff007f] shrink-0 overflow-hidden shadow-[2px_2px_0_#000]">
                <Image
                  src="/images/sovereign_unique_weapon.jpg"
                  alt="Thần Khí Độc Tôn 1-of-1"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="bg-[#ff007f] text-white text-[9px] font-black px-1.5 py-0.2 border border-black uppercase tracking-widest animate-pulse">
                    1 OF 1 SERVER
                  </span>
                  <span className="text-[#f59e0b] text-[10px] font-bold">SOVEREIGN RANK</span>
                </div>
                <h4 className="text-xs font-black text-white">Thần Khí Độc Tôn: Hắc Long Thần Cơ Neon</h4>
                <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">
                  Đang chờ vị vua Đỉnh Phong Mùa Giải đoạt lấy tại Tòa Tháp Cyber.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Synergies & Team Pairings Section (Cơ chế Bài Trùng Liên Minh Anh Hùng) */}
      <div className="bg-[#10141f] border-4 border-black p-5 shadow-[6px_6px_0_#000]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b-2 border-black pb-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#f59e0b] text-black text-xs font-black px-2 py-0.5 border border-black uppercase tracking-widest shadow-[2px_2px_0_#000]">
                HỢP KÍCH BÀI TRÙNG
              </span>
              <h3 className="text-lg font-black text-white uppercase tracking-wide">
                Cơ Chế Duyên Phận Đội Hình (3 Cặp Bài Trùng Kích Hoạt)
              </h3>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Xếp đúng cặp tướng bài trùng vào trận hình 6 thẻ để kích hoạt kỹ năng Hợp Thể và siêu buff chỉ số.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#00f0ff]">
            <Sparkles className="w-4 h-4" />
            <span>Kích hoạt 3/3 Cặp Trùng</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ACTIVE_SYNERGIES.map((syn) => (
            <div
              key={syn.id}
              className="bg-[#0a0d14] border-2 border-black p-4 shadow-[4px_4px_0_#000] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[11px] font-black px-2 py-0.5 border border-black uppercase tracking-wider"
                    style={{ backgroundColor: syn.badgeColor, color: '#000' }}
                  >
                    {syn.name}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 border border-emerald-500">
                    KÍCH HOẠT ✓
                  </span>
                </div>

                <p className="text-xs text-white font-extrabold mb-1">
                  Cặp Tướng: <span className="text-[#00f0ff]">{syn.partnerNames.join(' ⚔️ ')}</span>
                </p>
                <p className="text-[11px] text-slate-300 mb-3 bg-[#141b2b] p-2 border border-black/40">
                  <strong className="text-amber-400">Nội Tại:</strong> {syn.passiveBonus}
                </p>
              </div>

              <div className="border-t border-slate-800 pt-2.5">
                <p className="text-[10px] text-[#ff0055] font-black uppercase tracking-wide flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Hợp Kích: {syn.jointUltimateName}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 italic">
                  "{syn.jointUltimateDesc}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
