'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CharacterCard, BossState, getHeroAscensionInfo, getHeroUnlockedSkills, HeroSkill } from '@/types/game';
import { Shield, Swords, Zap, Heart, Flame, Sparkles, RefreshCw, Play, Pause, FastForward, ArrowLeft, Trophy, Sun, Skull, Droplets, Feather } from 'lucide-react';
import { sound } from '@/utils/soundEffects';
import { gameApi } from '@/services/gameApiClient';

interface BossCardBattleArenaProps {
  squad: CharacterCard[];
  boss: BossState;
  onExitBattle: () => void;
  onVictoryRewards: (rewards: { gold: number; diamonds: number; itemsCount: number }) => void;
}

interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  isCrit?: boolean;
}

export const BossCardBattleArena: React.FC<BossCardBattleArenaProps> = ({
  squad,
  boss,
  onExitBattle,
  onVictoryRewards
}) => {
  // Battle state
  const [bossHp, setBossHp] = useState<number>(boss.currentHp);
  const maxBossHp = boss.maxHp;
  const [bossBreak, setBossBreak] = useState<number>(boss.currentBreak || boss.maxBreak || 8000);
  const maxBossBreak = boss.maxBreak || 8000;
  const [isStaggered, setIsStaggered] = useState<boolean>(false);
  const [staggerRoundsLeft, setStaggerRoundsLeft] = useState<number>(0);

  const [playerSquad, setPlayerSquad] = useState<CharacterCard[]>(squad);
  const [battleRound, setBattleRound] = useState<number>(1);
  const [isAuto, setIsAuto] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1); // 1x, 2x, 3x
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);

  // Tactical In-Arena Rage & Shields (FEAT-015)
  const [heroRageMap, setHeroRageMap] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    squad.forEach(c => { map[c.id] = c.currentRage || 35; });
    return map;
  });

  const [heroShieldMap, setHeroShieldMap] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    squad.forEach(c => { map[c.id] = c.currentShield || 0; });
    return map;
  });

  // Combat status effects
  const [bossPoisonStacks, setBossPoisonStacks] = useState<number>(0);
  const [bossWeakenTurns, setBossWeakenTurns] = useState<number>(0);
  const [teamAtkBuffTurns, setTeamAtkBuffTurns] = useState<number>(0);

  // In-Arena Active Skill Banner (Replaces full-screen cinematic modal!)
  const [activeSkillBanner, setActiveSkillBanner] = useState<{
    casterName: string;
    skillName: string;
    skillIcon: string;
    effectText: string;
    color: string;
  } | null>(null);

  // Sync state when boss changes
  useEffect(() => {
    setBossHp(boss.currentHp);
    setBossBreak(boss.currentBreak || boss.maxBreak || 8000);
    setIsStaggered(false);
    setStaggerRoundsLeft(0);
    setIsVictory(false);
    setBossPoisonStacks(0);
    setBossWeakenTurns(0);
    setTeamAtkBuffTurns(0);
  }, [boss.id, boss.name]);

  // Active combat animations
  const [activeAttackerId, setActiveAttackerId] = useState<string | null>(null);
  const [bossAttacking, setBossAttacking] = useState<boolean>(false);
  const [showSlashVfx, setShowSlashVfx] = useState<boolean>(false);
  const [showShieldVfx, setShowShieldVfx] = useState<boolean>(false);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  // Minions (4 hộ vệ của Boss)
  const [minions, setMinions] = useState([
    { id: 'minion_1', name: 'Ninja Phố 01', hp: 8500, maxHp: 8500, isAlive: true },
    { id: 'minion_2', name: 'Ninja Phố 02', hp: 8500, maxHp: 8500, isAlive: true },
    { id: 'minion_3', name: 'Thủy Quái Tinh', hp: 12000, maxHp: 12000, isAlive: true },
    { id: 'minion_4', name: 'Hỏa Ma Tinh', hp: 12000, maxHp: 12000, isAlive: true }
  ]);

  const addFloatingText = (text: string, color: string, isCrit = false, x = 50, y = 30) => {
    const id = `${Date.now()}_${Math.random()}`;
    setFloatingTexts(prev => [...prev, { id, text, color, isCrit, x, y }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== id));
    }, 1200);
  };

  // In-Arena Auto/Manual Skill Execution Engine (No modal popup, automatic VFX)
  const executeHeroSkill = (card: CharacterCard, forceSkill?: HeroSkill) => {
    const unlocked = getHeroUnlockedSkills(card);
    const skill = forceSkill || unlocked[unlocked.length - 1] || unlocked[0];
    if (!skill) return;

    sound.playCritImpact();
    // Display sleek in-arena banner directly on battlefield
    setActiveSkillBanner({
      casterName: card.name,
      skillName: skill.name,
      skillIcon: skill.icon || '⚡',
      effectText: skill.description,
      color:
        skill.effectType === 'POISON'
          ? '#10ffa0'
          : skill.effectType === 'SHIELD'
          ? '#00f0ff'
          : skill.effectType === 'HEAL' || skill.effectType === 'TEAM_HEAL'
          ? '#22c55e'
          : skill.effectType === 'WEAKEN'
          ? '#a855f7'
          : '#fbbf24'
    });

    setTimeout(() => {
      setActiveSkillBanner(null);
    }, 1400 / speedMultiplier);

    // Reset hero rage to 0
    setHeroRageMap(prev => ({ ...prev, [card.id]: 0 }));

    // Execute combat mechanical effect
    switch (skill.effectType) {
      case 'POISON': {
        setBossPoisonStacks(prev => Math.min(10, prev + 2));
        addFloatingText(`🧪 ĐỘC MÃNG +2 TẦNG!`, '#10ffa0', true, 50, 20);
        sound.playDebuffSound();
        break;
      }
      case 'SHIELD': {
        const shieldVal = Math.round(card.atk * 2.5 + 25000);
        setHeroShieldMap(prev => ({
          ...prev,
          [card.id]: (prev[card.id] || 0) + shieldVal
        }));
        addFloatingText(`🛡️ KHIÊN THẦN +${shieldVal.toLocaleString()}`, '#00f0ff', true, 50, 65);
        sound.playShieldBlock();
        break;
      }
      case 'HEAL':
      case 'TEAM_HEAL': {
        const healAmt = Math.round(card.maxHp * 0.25 + 15000);
        setPlayerSquad(prev =>
          prev.map(c => ({
            ...c,
            currentHp: Math.min(c.maxHp, c.currentHp + healAmt)
          }))
        );
        addFloatingText(`💚 HỒI MÁU CẢ ĐỘI +${healAmt.toLocaleString()}`, '#22c55e', true, 50, 70);
        sound.playBuffSound();
        break;
      }
      case 'WEAKEN': {
        setBossWeakenTurns(3);
        addFloatingText(`🔻 SUY NHƯỢC: GIẢM 40% DAME BOSS!`, '#a855f7', true, 50, 25);
        sound.playDebuffSound();
        break;
      }
      case 'TEAM_ATK_BUFF': {
        setTeamAtkBuffTurns(3);
        addFloatingText(`🔥 CUỒNG BẠO: BUFF DAME TEAM +35%!`, '#f97316', true, 50, 68);
        sound.playBuffSound();
        break;
      }
      case 'CLEANSE': {
        setPlayerSquad(prev => prev.map(c => ({ ...c, isStunned: false })));
        addFloatingText(`🕊️ THANH TẨY TOÀN BỘ KHỐNG CHẾ!`, '#ffffff', true, 50, 68);
        sound.playBuffSound();
        break;
      }
      case 'SINGLE_CRIT_EXECUTE': {
        const isExecutionRange = (bossHp / maxBossHp) < 0.35;
        const multiplier = isExecutionRange ? (skill.basePowerMultiplier || 4.5) * 1.8 : (skill.basePowerMultiplier || 4.5);
        const burstDmg = Math.round(card.atk * multiplier * (1.6 + (card.critDamage || 0.6)));
        setBossHp(prev => Math.max(0, prev - burstDmg));
        setShowSlashVfx(true);
        setTimeout(() => setShowSlashVfx(false), 500);
        addFloatingText(
          isExecutionRange
            ? `⚡ TRẢM SÁT ĐƠN THỂ (x1.8): -${burstDmg.toLocaleString()}!`
            : `⚡ TRẢM SÁT ĐƠN THỂ: -${burstDmg.toLocaleString()}!`,
          '#ff0055',
          true,
          50,
          20
        );
        sound.playCritImpact();
        break;
      }
      case 'AOE_CRIT_BURST': {
        const burstDmg = Math.round(card.atk * (skill.basePowerMultiplier || 3.2) * (1.4 + (card.critDamage || 0.5)));
        setBossHp(prev => Math.max(0, prev - burstDmg));
        setMinions(prev =>
          prev.map(m => {
            const minionDmg = Math.round(burstDmg * 0.85);
            const remHp = Math.max(0, m.hp - minionDmg);
            return { ...m, hp: remHp, isAlive: remHp > 0 };
          })
        );
        setShowSlashVfx(true);
        setTimeout(() => setShowSlashVfx(false), 700);
        addFloatingText(`💥 BÃO KIẾM TOÀN MỤC TIÊU: -${burstDmg.toLocaleString()}!`, '#00f0ff', true, 50, 22);
        addFloatingText(`⚔️ QUÉT SẠCH QUÁI PHỤ!`, '#a855f7', true, 50, 36);
        sound.playCritImpact();
        break;
      }
      case 'HEAL_AND_SHIELD': {
        const healAmt = Math.round(card.maxHp * 0.28 + 20000);
        const shieldVal = Math.round(healAmt * 1.5);
        setPlayerSquad(prev =>
          prev.map(c => ({
            ...c,
            currentHp: Math.min(c.maxHp, c.currentHp + healAmt)
          }))
        );
        setHeroShieldMap(prev => {
          const updated = { ...prev };
          playerSquad.forEach(c => {
            updated[c.id] = (updated[c.id] || 0) + shieldVal;
          });
          return updated;
        });
        addFloatingText(`💚 HỒI MÁU TOÀN ĐỘI: +${healAmt.toLocaleString()}`, '#22c55e', true, 50, 65);
        addFloatingText(`🛡️ KHIÊN THÁNH BAN PHƯỚC: +${shieldVal.toLocaleString()}`, '#00f0ff', true, 50, 75);
        sound.playBuffSound();
        sound.playShieldBlock();
        break;
      }
      case 'HEAL_AND_IMMUNITY': {
        const healAmt = Math.round(card.maxHp * 0.35 + 30000);
        setPlayerSquad(prev =>
          prev.map(c => ({
            ...c,
            currentHp: Math.min(c.maxHp, c.currentHp + healAmt),
            isImmune: true,
            immunityTurns: 2
          }))
        );
        addFloatingText(`💚 HỒI SINH LINH DƯỢC: +${healAmt.toLocaleString()}`, '#22c55e', true, 50, 65);
        addFloatingText(`✨ BAN TRẠNG THÁI BẤT TỬ (2 LƯỢT)!`, '#fbbf24', true, 50, 75);
        sound.playBuffSound();
        break;
      }
      case 'CRIT_BURST':
      default: {
        const burstDmg = Math.round(card.atk * (skill.basePowerMultiplier || 3.5) * (1.5 + (card.critDamage || 0.5)));
        setBossHp(prev => Math.max(0, prev - burstDmg));
        addFloatingText(`💥 BẠO KÍCH SIÊU CẤP: -${burstDmg.toLocaleString()}!`, '#fbbf24', true, 50, 22);
        sound.playCritImpact();
        break;
      }
    }
  };

  const getAuraClass = (cardOrRank: CharacterCard | string) => {
    if (typeof cardOrRank === 'object' && cardOrRank) {
      const ascension = getHeroAscensionInfo(cardOrRank);
      if (ascension.isSixSuns) return 'aura-six-suns-supreme';
      return getAuraClass(cardOrRank.rank);
    }
    switch (cardOrRank) {
      case 'Sovereign': return 'aura-sovereign';
      case 'Mythic': return 'aura-mythic';
      case 'Legendary': return 'aura-legendary';
      case 'Epic': return 'aura-epic';
      case 'Rare': return 'aura-rare';
      case 'Fine': return 'aura-fine';
      default: return 'aura-common';
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.includes('Tank') || role.includes('Defense')) return '🛡️';
    if (role.includes('Heal') || role.includes('Support')) return '➕';
    if (role.includes('Tactician') || role.includes('Debuff')) return '🔮';
    return '⚔️';
  };

  // Auto Combat Loop with Tactical Skills, Rage, Poison, Shields & Weaken (FEAT-015)
  useEffect(() => {
    if (!isAuto || isPaused || isVictory) return;

    const intervalTime = Math.max(700, 2000 / speedMultiplier);
    let cardTurnIndex = 0;

    const timer = setInterval(() => {
      // 1. Poison DoT Tick on Boss at turn start
      if (bossPoisonStacks > 0) {
        const dotDmg = bossPoisonStacks * 18000;
        setBossHp(prevHp => Math.max(0, prevHp - dotDmg));
        addFloatingText(`🧪 ĐỘC: -${dotDmg.toLocaleString()}`, '#10ffa0', false, 50, 32);
      }

      // 2. Pick next hero card to attack
      const activeCard = playerSquad[cardTurnIndex % playerSquad.length];
      cardTurnIndex++;

      if (activeCard && activeCard.currentHp > 0) {
        setActiveAttackerId(activeCard.id);
        sound.playAttackImpact();
        setShowSlashVfx(true);

        // Check hero rage: if >= 100, auto-trigger Ultimate skill!
        const curRage = heroRageMap[activeCard.id] || 0;
        if (curRage >= 100) {
          executeHeroSkill(activeCard);
        } else if (cardTurnIndex % 3 === 0) {
          // Every 3 turns, auto-cast special skill 2 or 4
          const unlocked = getHeroUnlockedSkills(activeCard);
          if (unlocked.length > 1) {
            executeHeroSkill(activeCard, unlocked[1]);
          }
        }

        // Increase hero rage (+25 per attack)
        setHeroRageMap(prev => ({
          ...prev,
          [activeCard.id]: Math.min(100, (prev[activeCard.id] || 0) + 25)
        }));

        // Notify server combat engine asynchronously for server-side authority
        gameApi.executeCombatAttack(activeCard.id, boss.id || 'boss_daicaphoco').catch(() => {});

        // Damage formula with ATK Buff and Weaken multipliers
        const bossDef = boss.def || 1800;
        const mitigation = 1000 / (1000 + bossDef);
        const isCrit = isStaggered || Math.random() < activeCard.critRate;
        const critMultiplier = isCrit ? (1.5 + (activeCard.critDamage || 0.5)) : 1.0;
        const staggerMultiplier = isStaggered ? 1.5 : 1.0;
        const teamAtkMultiplier = teamAtkBuffTurns > 0 ? 1.35 : 1.0;
        const variance = 0.95 + Math.random() * 0.1;

        const effectiveDmg = Math.round(activeCard.atk * mitigation * critMultiplier * staggerMultiplier * teamAtkMultiplier * variance);
        const breakDmg = Math.round(activeCard.atk * 0.35 + 200);

        setTimeout(() => {
          setShowSlashVfx(false);
          setActiveAttackerId(null);

          if (isCrit) {
            sound.playCritImpact();
            addFloatingText(`CRIT! -${effectiveDmg.toLocaleString()}`, '#fbbf24', true, 50, 24);
          } else {
            addFloatingText(`-${effectiveDmg.toLocaleString()}`, '#ff0055', false, 50, 28);
          }

          // Deplete Boss Break Stance
          setBossBreak(prevBreak => {
            if (isStaggered) return 0;
            const nextBreak = Math.max(0, prevBreak - breakDmg);
            if (nextBreak === 0 && !isStaggered) {
              setIsStaggered(true);
              setStaggerRoundsLeft(2);
              addFloatingText('⚡ PHÁ GIÁP! CHOÁNG VÁNG (+50% ST)', '#00f0ff', true, 50, 36);
            }
            return nextBreak;
          });

          // Handle Stagger round decrement
          if (isStaggered) {
            setStaggerRoundsLeft(prev => {
              if (prev <= 1) {
                setIsStaggered(false);
                setBossBreak(maxBossBreak);
                return 0;
              }
              return prev - 1;
            });
          }

          // Damage Boss HP
          setBossHp(prevHp => {
            const nextHp = Math.max(0, prevHp - effectiveDmg);

            // Boss Fury below 50% HP (No modal cutscene, in-place roar!)
            if (nextHp <= maxBossHp * 0.5 && prevHp > maxBossHp * 0.5) {
              sound.playCritImpact();
              addFloatingText('🔥 BOSS CUỒNG MA: BÙNG NỔ NỘ HỎA!', '#ef4444', true, 50, 18);
            }

            if (nextHp === 0 && !isVictory) {
              setIsVictory(true);
              sound.playAllOutResonance();
              onVictoryRewards({ gold: 50000, diamonds: 300, itemsCount: 4 });
            }
            return nextHp;
          });
        }, 450 / speedMultiplier);
      }

      // Decrement buff turns
      if (teamAtkBuffTurns > 0 && cardTurnIndex % playerSquad.length === 0) {
        setTeamAtkBuffTurns(prev => prev - 1);
      }
      if (bossWeakenTurns > 0 && cardTurnIndex % playerSquad.length === 0) {
        setBossWeakenTurns(prev => prev - 1);
      }

      // Boss Counter Attack every 4 turns
      if (cardTurnIndex % 4 === 0) {
        setTimeout(() => {
          setBossAttacking(true);
          setShowShieldVfx(true);
          sound.playShieldBlock();

          setTimeout(() => {
            setBossAttacking(false);
            setShowShieldVfx(false);
            addFloatingText(`🛡️ BẢO VỆ CHỐNG ĐỠ!`, '#00f0ff', false, 50, 75);

            // Weaken effect reduces boss attack by 40%
            const weakenMult = bossWeakenTurns > 0 ? 0.6 : 1.0;
            const bossBaseAtk = Math.round((boss.atk || 4500) * weakenMult);

            // Frontline takes damage, shields absorb first, immunity prevents death!
            setPlayerSquad(prev =>
              prev.map((c, idx) => {
                if (idx < 3) {
                  const heroMitigation = 1000 / (1000 + c.def);
                  let incomingDmg = Math.round(bossBaseAtk * heroMitigation * (0.85 + Math.random() * 0.3));

                  // Absorb with shield
                  const curShield = heroShieldMap[c.id] || 0;
                  if (curShield > 0) {
                    const absorbed = Math.min(curShield, incomingDmg);
                    incomingDmg -= absorbed;
                    setHeroShieldMap(sm => ({ ...sm, [c.id]: curShield - absorbed }));
                  }

                  // Gain +15 Rage when hit
                  setHeroRageMap(rm => ({ ...rm, [c.id]: Math.min(100, (rm[c.id] || 0) + 15) }));

                  // If hero has active Immunity, HP cannot drop below 1
                  if (c.isImmune) {
                    const nextHp = Math.max(1, c.currentHp - incomingDmg);
                    return {
                      ...c,
                      currentHp: nextHp,
                      immunityTurns: (c.immunityTurns || 1) - 1,
                      isImmune: (c.immunityTurns || 1) > 1
                    };
                  }

                  return { ...c, currentHp: Math.max(1, c.currentHp - incomingDmg) };
                }
                return c;
              })
            );
          }, 450 / speedMultiplier);
        }, 600 / speedMultiplier);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAuto, isPaused, speedMultiplier, isVictory, playerSquad, boss, isStaggered, maxBossBreak, maxBossHp, bossPoisonStacks, bossWeakenTurns, teamAtkBuffTurns, heroRageMap, heroShieldMap]);

  const bossHpPercent = Math.max(0, Math.min(100, (bossHp / maxBossHp) * 100));

  // Frontline (first 3) & Backline (next 3)
  const frontlineCards = playerSquad.slice(0, 3);
  const backlineCards = playerSquad.slice(3, 6);

  return (
    <div className="w-full max-w-5xl mx-auto p-2 md:p-4 space-y-3 font-sans">
      {/* ARENA HEADER: Return, Round, Controls */}
      <div className="bg-[#121622] border-2 border-black p-3 flex flex-wrap items-center justify-between gap-3 shadow-[4px_4px_0_#000]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playCardWhoosh();
              onExitBattle();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ef4444] text-white font-black text-xs uppercase border border-black shadow-[2px_2px_0_#000] hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Rút Lui</span>
          </button>
          <div>
            <span className="text-[10px] font-black uppercase text-[#00f0ff] tracking-wider block">
              CHIẾN TRƯỜNG THẺ BÀI ĐỐI KHÁNG
            </span>
            <h2 className="text-sm md:text-base font-black text-white uppercase">
              {boss.name} — <span className="text-[#f59e0b]">{boss.title}</span>
            </h2>
          </div>
        </div>

        {/* Speed & Auto Controls */}
        <div className="flex items-center gap-2">
          {/* Speed Multiplier Button */}
          <button
            onClick={() => {
              sound.playCardWhoosh();
              setSpeedMultiplier(prev => (prev === 1 ? 2 : prev === 2 ? 3 : 1));
            }}
            className="px-2.5 py-1.5 bg-[#1a2030] text-[#00f0ff] font-mono font-black text-xs border border-black shadow-[2px_2px_0_#000] flex items-center gap-1"
          >
            <FastForward className="w-3 h-3" />
            <span>Tốc Độ: {speedMultiplier}x</span>
          </button>

          {/* Automatic Skill Execution Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#121622] border border-amber-500/70 shadow-[2px_2px_0_#000] text-amber-300 font-black text-xs uppercase">
            <Zap className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 animate-pulse" />
            <span>TỰ ĐỘNG THI TRIỂN CHIÊU (AUTO VFX)</span>
          </div>

          {/* Auto Toggle */}
          <button
            onClick={() => {
              sound.playCardWhoosh();
              setIsAuto(!isAuto);
            }}
            className={`px-3 py-1.5 font-black text-xs uppercase border border-black shadow-[2px_2px_0_#000] flex items-center gap-1.5 transition-all ${
              isAuto
                ? 'bg-emerald-500 text-black'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            {isAuto ? <Play className="w-3 h-3 fill-black" /> : <Pause className="w-3 h-3" />}
            <span>AUTO: {isAuto ? 'BẬT' : 'TẮT'}</span>
          </button>
        </div>
      </div>

      {/* VERTICAL BATTLE ARENA (Recreating Image 2 Layout) */}
      <div className="relative w-full bg-gradient-to-b from-[#140b08] via-[#0d131f] to-[#0a0d14] border-4 border-black p-3 md:p-6 shadow-[6px_6px_0_#000] rounded-sm overflow-hidden min-h-[620px] flex flex-col justify-between">
        {/* Ancient Stone Road Background Texture in Center */}
        <div className="absolute inset-y-0 left-1/4 right-1/4 bg-stone-900/40 border-x-2 border-dashed border-amber-900/30 pointer-events-none" />

        {/* Floating Combat Damage Numbers */}
        {floatingTexts.map(item => (
          <div
            key={item.id}
            className={`absolute font-black tracking-wider uppercase pointer-events-none z-50 animate-bounce ${
              item.isCrit
                ? 'text-xl md:text-2xl text-amber-300 drop-shadow-[0_0_12px_#f59e0b]'
                : 'text-base md:text-lg drop-shadow-[0_0_8px_#ff0055]'
            }`}
            style={{
              top: `${item.y}%`,
              left: `${item.x}%`,
              color: item.color,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {item.text}
          </div>
        ))}

        {/* TOP: ENEMY / BOSS ZONE (Boss Center + 4 Minions) */}
        <div className="relative z-10 space-y-3">
          {/* Boss HP Bar */}
          <div className="max-w-md mx-auto bg-black/80 border-2 border-red-700 p-2 shadow-[2px_2px_0_#000]">
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span className="text-red-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                {boss.name} (LV.{boss.level || 300})
              </span>
              <span className="text-white font-mono">
                {bossHp.toLocaleString()} / {maxBossHp.toLocaleString()} ({bossHpPercent.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full h-3.5 bg-zinc-950 border border-black overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-red-700 via-rose-600 to-amber-500 transition-all duration-300"
                style={{ width: `${bossHpPercent}%` }}
              />
            </div>

            {/* Break Stance Gauge from FEAT-007 */}
            <div className="mt-1.5 pt-1 border-t border-zinc-800">
              <div className="flex justify-between text-[10px] font-mono font-bold mb-0.5">
                <span className={`${isStaggered ? 'text-cyan-300 animate-pulse font-black' : 'text-cyan-400'} flex items-center gap-1`}>
                  <Zap className="w-3 h-3 text-cyan-400" />
                  {isStaggered ? `⚡ CHOÁNG VÁNG (STAGGERED): +50% ST (${staggerRoundsLeft} LƯỢT)` : 'GIÁP PHÁ THẾ (BREAK GAUGE)'}
                </span>
                <span className="text-cyan-200 font-mono">
                  {isStaggered ? 'VỠ GIÁP!' : `${bossBreak.toLocaleString()} / ${maxBossBreak.toLocaleString()}`}
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-950 border border-black overflow-hidden relative">
                <div
                  className={`h-full transition-all duration-200 ${
                    isStaggered
                      ? 'bg-cyan-300 animate-ping'
                      : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-400'
                  }`}
                  style={{ width: `${Math.max(0, Math.min(100, (bossBreak / maxBossBreak) * 100))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Enemy Formation Grid (Boss In Center + 4 Ninja Minions) */}
          <div className="flex items-center justify-center gap-3 md:gap-6">
            {/* Left Minions (2 cards) */}
            <div className="flex flex-col gap-2">
              {minions.slice(0, 2).map(m => (
                <div
                  key={m.id}
                  className="w-16 h-20 md:w-20 md:h-24 bg-purple-950/80 border-2 border-purple-500 p-1 flex flex-col justify-between items-center rounded-sm shadow-[0_0_8px_#a855f7]"
                >
                  <span className="text-xl">🥷</span>
                  <p className="text-[9px] font-black text-purple-300 truncate">{m.name}</p>
                  <div className="w-full h-1 bg-black rounded overflow-hidden">
                    <div className="h-full bg-green-500 w-full" />
                  </div>
                </div>
              ))}
            </div>

            {/* BOSS MAIN CARD (Center Large) */}
            <div
              className={`relative w-32 h-44 md:w-40 md:h-52 bg-gradient-to-b from-red-950 via-purple-950 to-black border-4 border-amber-400 p-2 flex flex-col items-center justify-between rounded shadow-[0_0_25px_#ef4444] transition-transform ${
                bossAttacking ? 'animate-boss-slam' : ''
              } ${bossPoisonStacks > 0 ? 'animate-burn-pulse' : ''}`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                  BOSS
                </span>
                <span className="text-amber-400 text-xs">★★★</span>
              </div>

              {/* Boss Visual Avatar */}
              <div className="relative w-full flex-1 flex items-center justify-center my-1">
                {boss.image ? (
                  <div className="relative w-full h-full overflow-hidden rounded border border-red-500/40">
                    <Image src={boss.image} alt={boss.name} fill sizes="160px" className="object-contain p-1 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]" priority />
                  </div>
                ) : (
                  <div className="text-6xl md:text-7xl filter drop-shadow-[0_6px_12px_#000]">
                    🐉
                  </div>
                )}

                {/* Slash VFX overlay when hit */}
                {showSlashVfx && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-1 bg-[#00f0ff] animate-slash-vfx shadow-[0_0_15px_#00f0ff]" />
                  </div>
                )}
              </div>

              {/* Boss Status Badges */}
              <div className="flex flex-wrap items-center justify-center gap-1">
                {bossPoisonStacks > 0 && (
                  <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-500 px-1 py-0.2 rounded flex items-center gap-0.5 animate-pulse">
                    🧪 Độc x{bossPoisonStacks}
                  </span>
                )}
                {bossWeakenTurns > 0 && (
                  <span className="text-[9px] bg-purple-950 text-purple-300 border border-purple-500 px-1 py-0.2 rounded flex items-center gap-0.5">
                    🔻 Suy nhược ({bossWeakenTurns})
                  </span>
                )}
                <span className="text-[9px] bg-red-950 text-red-300 border border-red-500 px-1 py-0.2 rounded">
                  Cuồng Nộ
                </span>
              </div>
            </div>

            {/* Right Minions (2 cards) */}
            <div className="flex flex-col gap-2">
              {minions.slice(2, 4).map(m => (
                <div
                  key={m.id}
                  className="w-16 h-20 md:w-20 md:h-24 bg-purple-950/80 border-2 border-purple-500 p-1 flex flex-col justify-between items-center rounded-sm shadow-[0_0_8px_#a855f7]"
                >
                  <span className="text-xl">🥷</span>
                  <p className="text-[9px] font-black text-purple-300 truncate">{m.name}</p>
                  <div className="w-full h-1 bg-black rounded overflow-hidden">
                    <div className="h-full bg-green-500 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE COMBAT ZONE: Battlefield Road & Energy Clashes & Floating Skill Banner */}
        <div className="relative h-16 flex items-center justify-center pointer-events-none">
          {showShieldVfx && (
            <div className="absolute w-24 h-24 border-2 border-[#00f0ff] rounded-full animate-shield-pulse flex items-center justify-center">
              <Shield className="w-12 h-12 text-[#00f0ff]" />
            </div>
          )}

          {/* In-Arena Floating Skill Banner (Replaces modal cutscenes, auto-animates) */}
          {activeSkillBanner && (
            <div className="absolute z-30 pointer-events-none animate-bounce">
              <div
                className="p-[2px] rounded-lg shadow-[0_0_25px_rgba(245,158,11,0.9)]"
                style={{
                  background: `linear-gradient(90deg, ${activeSkillBanner.color}, #f59e0b, ${activeSkillBanner.color})`
                }}
              >
                <div className="bg-black/90 px-4 py-1.5 rounded-lg flex items-center gap-3 border border-amber-400/80">
                  <span className="text-2xl animate-pulse">{activeSkillBanner.skillIcon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-amber-300 uppercase tracking-wider">{activeSkillBanner.casterName}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/50">
                        {activeSkillBanner.effectText.slice(0, 24)}...
                      </span>
                    </div>
                    <p className="text-sm font-black text-white">{activeSkillBanner.skillName}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM: PLAYER SQUAD (6 CARDS IN 2 ROWS: FRONTLINE & BACKLINE) */}
        <div className="relative z-10 space-y-2">
          {/* Frontline Row (3 Cards) */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-400 mb-1 px-1">
              <span>TIỀN TUYẾN (FRONTLINE)</span>
              <span className="text-[#00f0ff]">3 Tướng Tiên Phong</span>
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {frontlineCards.map(card => {
                const isAttacking = activeAttackerId === card.id;
                const hpPct = Math.max(0, Math.min(100, (card.currentHp / card.maxHp) * 100));
                const ascension = getHeroAscensionInfo(card);
                const heroRage = heroRageMap[card.id] || 0;
                const heroShield = heroShieldMap[card.id] || 0;
                const isReadyToSkill = heroRage >= 100;

                return (
                  <div
                    key={card.id}
                    className={`relative bg-[#121622] rounded-sm p-2 flex flex-col justify-between transition-all duration-200 ${getAuraClass(
                      card
                    )} ${isAttacking ? 'animate-attack-lunge ring-4 ring-[#00f0ff]' : ''}`}
                  >
                    {/* Shield Indicator Badge */}
                    {heroShield > 0 && (
                      <div className="absolute -top-1.5 -right-1.5 bg-cyan-950/95 text-cyan-300 border border-cyan-400 text-[8px] font-mono font-bold px-1 py-0.2 rounded shadow flex items-center gap-0.5 z-20">
                        <Shield className="w-2.5 h-2.5 text-cyan-400 fill-cyan-400/40" />
                        <span>{heroShield.toLocaleString()}</span>
                      </div>
                    )}

                    {/* Immunity Indicator Badge */}
                    {card.isImmune && (
                      <div className="absolute -top-1.5 left-1 bg-yellow-950/95 text-amber-300 border border-amber-400 text-[8px] font-mono font-black px-1 py-0.2 rounded shadow flex items-center gap-0.5 z-20 animate-pulse">
                        <span>✨ BẤT TỬ</span>
                      </div>
                    )}

                    {/* Role Icon & Level & Skill Trigger */}
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="w-5 h-5 rounded-full bg-black/80 border border-black flex items-center justify-center text-xs">
                        {getRoleIcon(card.role)}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono font-bold text-amber-400">Lv.{card.level}</span>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            executeHeroSkill(card);
                          }}
                          title={`Tung kĩ năng của ${card.name} (Nộ: ${heroRage}/100)`}
                          className={`font-black text-[9px] px-1.5 py-0.2 border border-black shadow-[1px_1px_0_#000] active:scale-90 uppercase flex items-center gap-0.5 transition-all ${
                            isReadyToSkill
                              ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-black animate-pulse ring-2 ring-yellow-400'
                              : 'bg-zinc-800 text-zinc-300 hover:text-white'
                          }`}
                        >
                          <Zap className={`w-2.5 h-2.5 ${isReadyToSkill ? 'fill-black' : ''}`} />
                          <span>{isReadyToSkill ? 'CHIÊU' : `${heroRage}`}</span>
                        </button>
                      </div>
                    </div>

                    {/* Avatar Showcase */}
                    <div className="relative w-full h-20 md:h-24 rounded my-1 overflow-hidden flex items-center justify-center bg-black/50">
                      {card.avatarImage ? (
                        <Image
                          src={card.avatarImage}
                          alt={card.name}
                          fill
                          sizes="160px"
                          className={
                            card.id === 'card_jaebin_03'
                              ? "object-cover object-center"
                              : "object-contain object-center p-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                          }
                        />
                      ) : (
                        <span className="text-3xl filter drop-shadow-[0_2px_4px_#000]">{card.avatarIcon}</span>
                      )}
                      {ascension.isSixSuns && (
                        <div className="absolute top-1 left-1 badge-six-suns text-[8px] px-1 py-0.2 font-black uppercase flex items-center gap-0.5 rounded shadow">
                          <Sun className="w-2.5 h-2.5 animate-spin" />
                          <span>6☀️ SUPREME</span>
                        </div>
                      )}
                    </div>

                    {/* Card Name & Ascension & HP Bar & Rage Bar */}
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-black text-white truncate">{card.name}</p>
                        <span className="text-[9px] font-mono font-bold tracking-tighter">{ascension.fullDisplay}</span>
                      </div>
                      {/* HP Bar */}
                      <div className="w-full h-1.5 bg-black rounded mt-0.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-300"
                          style={{ width: `${hpPct}%` }}
                        />
                      </div>
                      {/* Rage Bar (0-100) */}
                      <div className="w-full h-1 bg-black rounded mt-0.5 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            isReadyToSkill ? 'bg-gradient-to-r from-yellow-400 to-amber-500 animate-pulse' : 'bg-cyan-500'
                          }`}
                          style={{ width: `${Math.min(100, heroRage)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Backline Row (3 Cards) */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-400 mb-1 px-1">
              <span>HẬU TUYẾN (BACKLINE)</span>
              <span className="text-purple-400">3 Tướng Trợ Chiến</span>
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {backlineCards.map(card => {
                const isAttacking = activeAttackerId === card.id;
                const hpPct = Math.max(0, Math.min(100, (card.currentHp / card.maxHp) * 100));
                const ascension = getHeroAscensionInfo(card);
                const heroRage = heroRageMap[card.id] || 0;
                const heroShield = heroShieldMap[card.id] || 0;
                const isReadyToSkill = heroRage >= 100;

                return (
                  <div
                    key={card.id}
                    className={`relative bg-[#121622] rounded-sm p-2 flex flex-col justify-between transition-all duration-200 ${getAuraClass(
                      card
                    )} ${isAttacking ? 'animate-attack-lunge ring-4 ring-[#ff0055]' : ''}`}
                  >
                    {/* Shield Indicator Badge */}
                    {heroShield > 0 && (
                      <div className="absolute -top-1.5 -right-1.5 bg-cyan-950/95 text-cyan-300 border border-cyan-400 text-[8px] font-mono font-bold px-1 py-0.2 rounded shadow flex items-center gap-0.5 z-20">
                        <Shield className="w-2.5 h-2.5 text-cyan-400 fill-cyan-400/40" />
                        <span>{heroShield.toLocaleString()}</span>
                      </div>
                    )}

                    {/* Immunity Indicator Badge */}
                    {card.isImmune && (
                      <div className="absolute -top-1.5 left-1 bg-yellow-950/95 text-amber-300 border border-amber-400 text-[8px] font-mono font-black px-1 py-0.2 rounded shadow flex items-center gap-0.5 z-20 animate-pulse">
                        <span>✨ BẤT TỬ</span>
                      </div>
                    )}

                    {/* Role Icon & Level & Skill Trigger */}
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="w-5 h-5 rounded-full bg-black/80 border border-black flex items-center justify-center text-xs">
                        {getRoleIcon(card.role)}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono font-bold text-amber-400">Lv.{card.level}</span>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            executeHeroSkill(card);
                          }}
                          title={`Tung kĩ năng của ${card.name} (Nộ: ${heroRage}/100)`}
                          className={`font-black text-[9px] px-1.5 py-0.2 border border-black shadow-[1px_1px_0_#000] active:scale-90 uppercase flex items-center gap-0.5 transition-all ${
                            isReadyToSkill
                              ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-black animate-pulse ring-2 ring-yellow-400'
                              : 'bg-zinc-800 text-zinc-300 hover:text-white'
                          }`}
                        >
                          <Zap className={`w-2.5 h-2.5 ${isReadyToSkill ? 'fill-black' : ''}`} />
                          <span>{isReadyToSkill ? 'CHIÊU' : `${heroRage}`}</span>
                        </button>
                      </div>
                    </div>

                    {/* Avatar Showcase */}
                    <div className="relative w-full h-20 md:h-24 rounded my-1 overflow-hidden flex items-center justify-center bg-black/50">
                      {card.avatarImage ? (
                        <Image
                          src={card.avatarImage}
                          alt={card.name}
                          fill
                          sizes="160px"
                          className={
                            card.id === 'card_jaebin_03'
                              ? "object-cover object-center"
                              : "object-contain object-center p-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                          }
                        />
                      ) : (
                        <span className="text-3xl filter drop-shadow-[0_2px_4px_#000]">{card.avatarIcon}</span>
                      )}
                      {ascension.isSixSuns && (
                        <div className="absolute top-1 left-1 badge-six-suns text-[8px] px-1 py-0.2 font-black uppercase flex items-center gap-0.5 rounded shadow">
                          <Sun className="w-2.5 h-2.5 animate-spin" />
                          <span>6☀️ SUPREME</span>
                        </div>
                      )}
                    </div>

                    {/* Card Name & Ascension & HP Bar & Rage Bar */}
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-black text-white truncate">{card.name}</p>
                        <span className="text-[9px] font-mono font-bold tracking-tighter">{ascension.fullDisplay}</span>
                      </div>
                      {/* HP Bar */}
                      <div className="w-full h-1.5 bg-black rounded mt-0.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-300"
                          style={{ width: `${hpPct}%` }}
                        />
                      </div>
                      {/* Rage Bar (0-100) */}
                      <div className="w-full h-1 bg-black rounded mt-0.5 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            isReadyToSkill ? 'bg-gradient-to-r from-yellow-400 to-amber-500 animate-pulse' : 'bg-cyan-500'
                          }`}
                          style={{ width: `${Math.min(100, heroRage)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* VICTORY MODAL OVERLAY */}
        {isVictory && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 z-50">
            <div className="bg-[#10141f] border-4 border-amber-400 p-6 max-w-md w-full text-center shadow-[0_0_30px_#f59e0b] animate-bounce">
              <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-2" />
              <h3 className="text-2xl font-black text-amber-300 uppercase tracking-wider">
                CHIẾN THẮNG TRÙM THÀNH CÔNG!
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Boss đã bị tiêu diệt hoàn toàn. Rơi 4 trang bị thần thoại và vàng bạc!
              </p>

              <div className="flex justify-center gap-4 my-3 font-mono font-bold text-sm">
                <span className="text-yellow-400 bg-black/60 px-2.5 py-1 rounded border border-yellow-700/50">+50,000 Vàng</span>
                <span className="text-cyan-400 bg-black/60 px-2.5 py-1 rounded border border-cyan-700/50">+300 Kim Cương</span>
              </div>

              {/* Dropped Equipment Showcase */}
              <div className="grid grid-cols-4 gap-2 my-3">
                <div className="bg-purple-950/80 border border-purple-500 p-2 rounded flex flex-col items-center shadow-[0_0_8px_#a855f7]">
                  <span className="text-xl">🗡️</span>
                  <p className="text-[9px] font-black text-purple-300 truncate mt-1">Đao Thần Ma</p>
                  <span className="text-[8px] text-amber-400 font-mono">★★★</span>
                </div>
                <div className="bg-amber-950/80 border border-amber-500 p-2 rounded flex flex-col items-center shadow-[0_0_8px_#f59e0b]">
                  <span className="text-xl">🥋</span>
                  <p className="text-[9px] font-black text-amber-300 truncate mt-1">Hộ Giáp Hỏa Sư</p>
                  <span className="text-[8px] text-amber-400 font-mono">★★★</span>
                </div>
                <div className="bg-red-950/80 border border-red-500 p-2 rounded flex flex-col items-center shadow-[0_0_8px_#ef4444]">
                  <span className="text-xl">💎</span>
                  <p className="text-[9px] font-black text-red-300 truncate mt-1">Đan Dược Cửu Linh</p>
                  <span className="text-[8px] text-red-400 font-mono">★★★★</span>
                </div>
                <div className="bg-cyan-950/80 border border-cyan-500 p-2 rounded flex flex-col items-center shadow-[0_0_8px_#00f0ff]">
                  <span className="text-xl">⚡</span>
                  <p className="text-[9px] font-black text-cyan-300 truncate mt-1">Đá Cường Hóa</p>
                  <span className="text-[8px] text-cyan-400 font-mono">x25</span>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playCardWhoosh();
                  onExitBattle();
                }}
                className="w-full bg-[#f59e0b] hover:bg-amber-400 text-black font-black py-2.5 px-4 border-2 border-black uppercase tracking-wider shadow-[3px_3px_0_#000]"
              >
                Nhận Thưởng & Quay Về
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
