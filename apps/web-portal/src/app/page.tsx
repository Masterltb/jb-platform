'use client';
import React, { useState, useEffect } from 'react';
import {
  CharacterCard,
  EquipmentItem,
  EquipmentSlot,
  ActionCard,
  BossState,
  StyleRank,
  BattleLogEntry,
  StageNode,
  EvolutionMaterial,
  recalculateHeroWithEquipment
} from '@/types/game';
import {
  INITIAL_6_CARD_SQUAD,
  INITIAL_BOSS,
  INITIAL_ACTION_DECK,
  EQUIPMENT_INVENTORY,
  CAMPAIGN_STAGES,
  EVOLUTION_MATERIALS_DEFAULT,
  ROSTER_50_HEROES
} from '@/data/mockGameData';
import { gameApi } from '@/services/gameApiClient';
import { HeaderNav } from '@/components/HeaderNav';
import { BossArenaTile } from '@/components/BossArenaTile';
import { StyleMeterTile } from '@/components/StyleMeterTile';
import { TeamFormationTile } from '@/components/TeamFormationTile';
import { HandAndActionTray } from '@/components/HandAndActionTray';
import { EquipmentInspectorModal } from '@/components/EquipmentInspectorModal';
import { AllOutResonanceOverlay } from '@/components/AllOutResonanceOverlay';
import { GachaView } from '@/components/GachaView';
import { StagesMapView } from '@/components/StagesMapView';
import { BossHubAndModesView } from '@/components/BossHubAndModesView';
import { BossCardBattleArena } from '@/components/BossCardBattleArena';
import { InventoryAndUpgradeView } from '@/components/InventoryAndUpgradeView';
import { AuthProfileModal } from '@/components/AuthProfileModal';
import { EventsView } from '@/components/EventsView';
import { SquadFormationModal } from '@/components/SquadFormationModal';
import { sound } from '@/utils/soundEffects';

export default function Home() {
  // Game States (Initial values serve as immediate fallback while loading live DB)
  const [squad, setSquad] = useState<CharacterCard[]>(() => INITIAL_6_CARD_SQUAD.slice(0, 6));
  const [ownedHeroes, setOwnedHeroes] = useState<CharacterCard[]>(() => {
    const map = new Map<string, CharacterCard>();
    INITIAL_6_CARD_SQUAD.forEach(c => map.set(c.id, c));
    ROSTER_50_HEROES.forEach(c => {
      if (!map.has(c.id)) map.set(c.id, c);
    });
    return Array.from(map.values());
  });
  const [isSquadModalOpen, setIsSquadModalOpen] = useState<boolean>(false);
  const [inventory, setInventory] = useState<EquipmentItem[]>(EQUIPMENT_INVENTORY);
  const [campaignStages, setCampaignStages] = useState<StageNode[]>(CAMPAIGN_STAGES);
  const [evolutionMaterials, setEvolutionMaterials] = useState<EvolutionMaterial[]>(EVOLUTION_MATERIALS_DEFAULT);
  const [currentStageId, setCurrentStageId] = useState<string>('stage_1_1');
  const [boss, setBoss] = useState<BossState>(INITIAL_BOSS);
  const [deck] = useState<ActionCard[]>(INITIAL_ACTION_DECK);
  const [hand, setHand] = useState<ActionCard[]>(INITIAL_ACTION_DECK.slice(0, 5));

  // Server & Profile States
  const [serverStatus, setServerStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [latencyMs, setLatencyMs] = useState<number>(12);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<{ username: string; email: string; level: number; vipLevel: number }>({
    username: 'JaeBinMaster',
    email: 'master@jaebin.com',
    level: 50,
    vipLevel: 8
  });

  const loadBackendState = () => {
    gameApi.checkHealth().then(health => {
      setServerStatus(health.status as any);
      if (health.latencyMs >= 0) setLatencyMs(health.latencyMs);
    });

    gameApi.getGameState()
      .then(data => {
        if (data.squad && data.squad.length > 0) {
          // Strictly take 6 cards for active battle squad
          const active6 = data.squad.slice(0, 6);
          setSquad(active6);
          // Add all backend cards to owned heroes pool
          setOwnedHeroes(prev => {
            const map = new Map<string, CharacterCard>();
            prev.forEach(h => map.set(h.id, h));
            data.squad.forEach((h: CharacterCard) => map.set(h.id, h));
            return Array.from(map.values());
          });
        }
        if (data.inventory) {
          setInventory(data.inventory);
        }
        if (data.user) {
          setGold(data.user.gold);
          setDiamonds(data.user.diamonds);
          setEnergy(data.user.energy);
          setUserProfile({
            username: data.user.username || 'JaeBinMaster',
            email: data.user.email || 'master@jaebin.com',
            level: data.user.level || 50,
            vipLevel: data.user.vipLevel || 8
          });
        }
        if (data.boss) {
          setBoss(data.boss);
        }
        setServerStatus('online');
        addLog('🟢 Đã đồng bộ dữ liệu Real-time với PostgreSQL / Fastify Backend (:3001)!', 'system');
      })
      .catch(err => {
        setServerStatus('offline');
        console.warn('Backend sync notice (offline mode active):', err.message);
      });
  };

  // Live Database Sync on Mount & Periodic Health Heartbeat
  useEffect(() => {
    loadBackendState();
    const interval = setInterval(() => {
      gameApi.checkHealth().then(health => {
        setServerStatus(health.status as any);
        if (health.latencyMs >= 0) setLatencyMs(health.latencyMs);
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Battle Resources
  const [energy, setEnergy] = useState<number>(5);
  const maxEnergy = 5;
  const [stylePoints, setStylePoints] = useState<number>(380); // Starts at B (Dân chơi) for quick testing!
  const [comboStreak, setComboStreak] = useState<number>(4);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);

  // Currencies
  const [gold, setGold] = useState<number>(145000);
  const [diamonds, setDiamonds] = useState<number>(2500);
  const [bossTickets, setBossTickets] = useState<number>(8);

  // Navigation & Modals: default to 'bosshub'
  const [activeTab, setActiveTab] = useState<'bosshub' | 'battle' | 'squad' | 'gacha' | 'stages' | 'inventory' | 'events'>('bosshub');
  const [selectedCard, setSelectedCard] = useState<CharacterCard | null>(null);
  const [isAllOutActive, setIsAllOutActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Animations & Floats
  const [bossDamageFloat, setBossDamageFloat] = useState<number | null>(null);
  const [isBossAttacking, setIsBossAttacking] = useState<boolean>(false);
  const [screenShake, setScreenShake] = useState<boolean>(false);

  // Battle Logs
  const [logs, setLogs] = useState<BattleLogEntry[]>([
    {
      id: '1',
      timestamp: '00:01',
      text: 'Trận chiến bắt đầu! Boss Đại Ca Phố Cổ xuất hiện.',
      type: 'system'
    },
    {
      id: '2',
      timestamp: '00:02',
      text: 'Đội hình 6 thẻ bài Anhem JaeBin kích hoạt Synergy +80,000 CP!',
      type: 'style'
    }
  ]);

  const addLog = (text: string, type: BattleLogEntry['type']) => {
    const now = new Date();
    const timeStr = `${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    setLogs(prev => [...prev, { id: `${Date.now()}_${Math.random()}`, timestamp: timeStr, text, type }]);
  };

  // Stage Clearance & Auto-Advance Handler (FEAT-012)
  const handleClearStage = (stageId: string) => {
    const parts = stageId.split('_');
    const ch = parseInt(parts[1], 10) || 1;
    const s = parseInt(parts[2], 10) || 1;
    const isLastStageOfCh = s === 10;

    setCampaignStages(prev =>
      prev.map(stg => {
        if (stg.id === stageId) {
          return { ...stg, isCleared: true };
        }
        if (stg.chapter === ch && stg.id === `stage_${ch}_${s + 1}`) {
          return { ...stg, isUnlocked: true };
        }
        if (isLastStageOfCh && ch < 10 && stg.id === `stage_${ch + 1}_1`) {
          return { ...stg, isUnlocked: true };
        }
        return stg;
      })
    );

    addLog(`Đã vượt qua ải ${ch}-${s}! Tiến trình chiến dịch được cập nhật thành công.`, 'style');
  };

  // Hero Chiêu Mộ Drop Handler (FEAT-012, FEAT-014)
  const handleAddHeroCard = (hero: CharacterCard) => {
    // 1. Add to ownedHeroes
    setOwnedHeroes(prev => {
      const existingIdx = prev.findIndex(h => h.id === hero.id || h.name === hero.name);
      if (existingIdx !== -1) {
        return prev.map((h, i) =>
          i === existingIdx
            ? { ...h, stars: Math.min(6, (h.stars || 1) + 1), totalCombatPower: h.totalCombatPower + 15000 }
            : h
        );
      }
      return [hero, ...prev];
    });

    // 2. If active squad is less than 6, auto-slot hero
    setSquad(prev => {
      const existingIdx = prev.findIndex(h => h.id === hero.id || h.name === hero.name);
      if (existingIdx !== -1) {
        return prev.map((h, i) =>
          i === existingIdx
            ? { ...h, stars: Math.min(6, (h.stars || 1) + 1), totalCombatPower: h.totalCombatPower + 15000 }
            : h
        );
      }
      if (prev.length < 6) {
        return [...prev, hero];
      }
      return prev;
    });

    addLog(`🌟 CHIÊU MỘ ANH HÙNG: Đã thêm tướng [${hero.name}] (${hero.rank}) vào Kho Tướng! Vào Đội Hình để đổi xuất chiến.`, 'style');
  };

  // Evolution Materials Gacha Drops Handler (FEAT-012)
  const handleAddEvolutionMaterial = (matId: string, count: number) => {
    setEvolutionMaterials(prev =>
      prev.map(m => (m.id === matId ? { ...m, count: m.count + count } : m))
    );
    addLog(`🔮 Thu thập được +${count} viên nguyên liệu tiến hóa từ Gacha!`, 'style');
  };

  // Evolution Materials Consume Handler (FEAT-012)
  const handleConsumeEvolutionMaterial = (matId: string, count: number): boolean => {
    let success = false;
    setEvolutionMaterials(prev =>
      prev.map(m => {
        if (m.id === matId && m.count >= count) {
          success = true;
          return { ...m, count: m.count - count };
        }
        return m;
      })
    );
    return success;
  };

  // Timed Boss Challenge Jump (FEAT-012)
  const handleChallengeTimedBoss = (timedBossState: BossState) => {
    setBoss(timedBossState);
    setActiveTab('battle');
    addLog(`⚔️ VÀO CHIẾN TRƯỜNG BOSS KHUNG GIỜ: ${timedBossState.name} (${timedBossState.title})!`, 'system');
  };

  // Calculate current Style Rank
  const getStyleRank = (pts: number): StyleRank => {
    if (pts >= 900) return 'SSS';
    if (pts >= 750) return 'S';
    if (pts >= 550) return 'A';
    if (pts >= 350) return 'B';
    if (pts >= 150) return 'C';
    return 'D';
  };

  const currentStyleRank = getStyleRank(stylePoints);

  // Trigger Screen Shake Helper
  const triggerShake = () => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 300);
  };

  // Play a Card from Hand
  const handlePlayCard = (card: ActionCard) => {
    if (energy < card.energyCost || !isPlayerTurn) return;

    setEnergy(prev => prev - card.energyCost);
    setComboStreak(prev => prev + 1);

    // Style Rank multiplier
    let multiplier = 1.0;
    if (currentStyleRank === 'SSS') multiplier = 1.6;
    else if (currentStyleRank === 'S') multiplier = 1.4;
    else if (currentStyleRank === 'A') multiplier = 1.25;
    else if (currentStyleRank === 'B') multiplier = 1.15;
    else if (currentStyleRank === 'C') multiplier = 1.08;

    // Execute Card Effects
    if (card.damageValue) {
      sound.playAttackImpact();
      triggerShake();
      const actualDmg = Math.round(card.damageValue * multiplier);
      setBossDamageFloat(actualDmg);
      setTimeout(() => setBossDamageFloat(null), 1000);

      setBoss(prev => {
        const newHp = Math.max(0, prev.currentHp - actualDmg);
        const newBreak = Math.max(0, prev.currentBreak - (card.breakDamage || 200));
        const isNowStaggered = newBreak === 0;

        return {
          ...prev,
          currentHp: newHp,
          currentBreak: newBreak,
          isStaggered: isNowStaggered
        };
      });

      addLog(
        `${card.characterOwnerName} tung [${card.name}] gây ${actualDmg.toLocaleString()} sát thương!`,
        'player'
      );
    } else if (card.shieldValue) {
      sound.playShieldBlock();
      // Shield Frontline
      setSquad(prev =>
        prev.map(c =>
          c.position === 'Frontline' ? { ...c, currentShield: c.currentShield + (card.shieldValue || 2000) } : c
        )
      );
      addLog(`${card.characterOwnerName} dựng khiên bảo vệ Tiền Tuyến!`, 'player');
    } else if (card.healValue) {
      sound.playCardWhoosh();
      // Heal all 6 cards
      setSquad(prev =>
        prev.map(c => ({
          ...c,
          currentHp: Math.min(c.maxHp, c.currentHp + (card.healValue || 3000))
        }))
      );
      addLog(`${card.characterOwnerName} hồi phục máu cho toàn bộ 6 thẻ bài!`, 'style');
    }

    // Add Style points
    const newPts = Math.min(1000, stylePoints + card.stylePoints);
    setStylePoints(newPts);

    // Remove played card and draw replacement
    setHand(prev => {
      const remaining = prev.filter(c => c.id !== card.id);
      const nextCard = deck[Math.floor(Math.random() * deck.length)];
      return [...remaining, { ...nextCard, id: `${nextCard.id}_${Date.now()}` }];
    });
  };

  // End Turn & Boss Attacks
  const handleEndTurn = () => {
    setIsPlayerTurn(false);
    addLog('Kết thúc lượt người chơi. Boss chuẩn bị phản công!', 'system');

    // Boss attack after 800ms
    setTimeout(() => {
      setIsBossAttacking(true);
      sound.playAttackImpact();
      triggerShake();

      // Damage frontline cards
      const bossDmg = boss.intent.value;
      setSquad(prev =>
        prev.map(c => {
          if (c.position === 'Frontline') {
            const shieldAbsorb = Math.min(c.currentShield, bossDmg);
            const remainingDmg = bossDmg - shieldAbsorb;
            return {
              ...c,
              currentShield: Math.max(0, c.currentShield - shieldAbsorb),
              currentHp: Math.max(1, c.currentHp - remainingDmg)
            };
          }
          return c;
        })
      );

      addLog(`Boss tung chiêu [${boss.intent.description}] giáng ${bossDmg} sát thương vào Tiền Tuyến!`, 'boss');

      setTimeout(() => {
        setIsBossAttacking(false);
        // Reset player energy and start new turn
        setEnergy(maxEnergy);
        setIsPlayerTurn(true);
        addLog('Lượt mới bắt đầu! Năng Lượng hồi phục đầy 5/5.', 'system');
      }, 700);
    }, 800);
  };

  // Trigger SSS All-Out 6-Card Resonance Attack!
  const handleTriggerAllOut = () => {
    setIsAllOutActive(true);
    triggerShake();

    const totalAllOutDmg = 52000;
    setBoss(prev => ({
      ...prev,
      currentHp: Math.max(0, prev.currentHp - totalAllOutDmg),
      currentBreak: 0,
      isStaggered: true
    }));

    addLog('🔥 KÍCH HOẠT HỢP KÍCH 6 THẺ: ALL-OUT RESONANCE! Boss nhận 52,000 sát thương cực đại!', 'allout');

    // Style points reset to A (600) after ultimate
    setStylePoints(600);
  };

  // Equip Item on Character Card (FEAT-016 Full CP & Stats Scaling)
  const handleEquipItem = (cardId: string, slot: EquipmentSlot, item: EquipmentItem) => {
    let cpDelta = 0;

    setSquad(prev =>
      prev.map(c => {
        if (c.id === cardId) {
          const oldCp = c.totalCombatPower;
          const updatedEquip = { ...c.equippedItems, [slot]: item };
          const recalculated = recalculateHeroWithEquipment(c, updatedEquip);
          cpDelta = recalculated.totalCombatPower - oldCp;
          return recalculated;
        }
        return c;
      })
    );

    setOwnedHeroes(prev =>
      prev.map(c => {
        if (c.id === cardId) {
          const oldCp = c.totalCombatPower;
          const updatedEquip = { ...c.equippedItems, [slot]: item };
          const recalculated = recalculateHeroWithEquipment(c, updatedEquip);
          if (cpDelta === 0) cpDelta = recalculated.totalCombatPower - oldCp;
          return recalculated;
        }
        return c;
      })
    );

    // Update selected card preview in modal
    setSelectedCard(prev => {
      if (prev && prev.id === cardId) {
        const updatedEquip = { ...prev.equippedItems, [slot]: item };
        return recalculateHeroWithEquipment(prev, updatedEquip);
      }
      return prev;
    });

    const deltaSign = cpDelta >= 0 ? `+${cpDelta.toLocaleString()}` : `${cpDelta.toLocaleString()}`;
    addLog(`Đã gắn [${item.name}] (${item.rank}) vào ô ${slot}! Lực chiến biến động: ${deltaSign} CP!`, 'style');
    // Persist to Database
    gameApi.equipItem(cardId, slot, item.id).catch(err => console.warn('Sync equip warning:', err.message));
  };

  // Unequip Item (FEAT-016 Full CP & Stats Scaling)
  const handleUnequipItem = (cardId: string, slot: EquipmentSlot) => {
    let cpDelta = 0;

    setSquad(prev =>
      prev.map(c => {
        if (c.id === cardId) {
          const oldCp = c.totalCombatPower;
          const updatedEquip = { ...c.equippedItems };
          delete updatedEquip[slot];
          const recalculated = recalculateHeroWithEquipment(c, updatedEquip);
          cpDelta = recalculated.totalCombatPower - oldCp;
          return recalculated;
        }
        return c;
      })
    );

    setOwnedHeroes(prev =>
      prev.map(c => {
        if (c.id === cardId) {
          const oldCp = c.totalCombatPower;
          const updatedEquip = { ...c.equippedItems };
          delete updatedEquip[slot];
          const recalculated = recalculateHeroWithEquipment(c, updatedEquip);
          if (cpDelta === 0) cpDelta = recalculated.totalCombatPower - oldCp;
          return recalculated;
        }
        return c;
      })
    );

    setSelectedCard(prev => {
      if (prev && prev.id === cardId) {
        const updatedEquip = { ...prev.equippedItems };
        delete updatedEquip[slot];
        return recalculateHeroWithEquipment(prev, updatedEquip);
      }
      return prev;
    });

    const deltaSign = cpDelta >= 0 ? `+${cpDelta.toLocaleString()}` : `${cpDelta.toLocaleString()}`;
    addLog(`Đã tháo trang bị ô ${slot}! Lực chiến thay đổi: ${deltaSign} CP.`, 'style');
    // Persist to Database
    gameApi.unequipItem(cardId, slot).catch(err => console.warn('Sync unequip warning:', err.message));
  };

  // Reset Battle
  const handleResetBattle = () => {
    sound.playCardWhoosh();
    setBoss(INITIAL_BOSS);
    setSquad(INITIAL_6_CARD_SQUAD);
    setEnergy(5);
    setStylePoints(380);
    setComboStreak(4);
    setIsPlayerTurn(true);
    addLog('Đã khởi động lại trận đấu Boss!', 'system');
  };

  return (
    <div className={`min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col ${screenShake ? 'screen-shake' : ''}`}>
      {/* Header Bar */}
      <HeaderNav
        gold={gold}
        diamonds={diamonds}
        bossTickets={bossTickets}
        currentEnergy={energy}
        maxEnergy={maxEnergy}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetBattle={handleResetBattle}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        serverStatus={serverStatus}
        latencyMs={latencyMs}
        username={userProfile.username}
        vipLevel={userProfile.vipLevel}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-2 md:p-4 max-w-7xl w-full mx-auto space-y-3.5">
        {activeTab === 'bosshub' ? (
          <BossHubAndModesView
            gold={gold}
            diamonds={diamonds}
            onEnterBattle={bossInfo => {
              setBoss(prev => ({
                ...prev,
                id: bossInfo.id,
                name: bossInfo.name,
                level: bossInfo.level,
                title: bossInfo.title,
                image: bossInfo.image,
                maxHp: bossInfo.maxHp,
                currentHp: bossInfo.maxHp,
                maxBreak: bossInfo.maxBreak,
                currentBreak: bossInfo.maxBreak,
                def: bossInfo.def,
                atk: bossInfo.atk,
                avatarBg: bossInfo.avatarBg,
                isStaggered: false,
                phase: 1
              }));
              setActiveTab('battle');
              addLog(`Bắt đầu vào chiến trường săn trùm: ${bossInfo.name} (${bossInfo.title}) - HP: ${bossInfo.maxHp.toLocaleString()} | Giáp: ${bossInfo.def}`, 'system');
            }}
          />
        ) : activeTab === 'battle' ? (
          <BossCardBattleArena
            squad={squad}
            boss={boss}
            onExitBattle={() => setActiveTab('bosshub')}
            onVictoryRewards={rewards => {
              setGold(prev => prev + rewards.gold);
              setDiamonds(prev => prev + rewards.diamonds);
              handleClearStage(currentStageId);
              addLog(`Chiến thắng Boss! Nhận +${rewards.gold.toLocaleString()} Vàng và +${rewards.diamonds} Kim Cương. Tiến trình ải [${currentStageId}] đã hoàn thành!`, 'style');
            }}
          />
        ) : activeTab === 'squad' ? (
          <div className="space-y-4">
            <div className="bg-[#121622] border-2 border-black p-4 shadow-[4px_4px_0_#000] rounded-sm flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black uppercase text-white mb-1">
                  QUẢN LÝ ĐỘI HÌNH & 6 Ô TRANG BỊ
                </h2>
                <p className="text-xs text-slate-400">
                  Chọn đúng 6 tướng xuất chiến từ Kho Tướng. Nhấp vào từng thẻ nhân vật để mở modal quản lý 6 món trang bị.
                </p>
              </div>
              <button
                onClick={() => setIsSquadModalOpen(true)}
                className="px-4 py-2.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-black text-xs md:text-sm uppercase border-2 border-black shadow-[3px_3px_0_#000] active:scale-95 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>🔄 ĐỔI TƯỚNG XUẤT CHIẾN (CHỌN 6 TƯỚNG)</span>
              </button>
            </div>
            <TeamFormationTile
              squad={squad}
              onSelectCard={card => setSelectedCard(card)}
              onOpenSquadModal={() => setIsSquadModalOpen(true)}
            />
          </div>
        ) : activeTab === 'stages' ? (
          <StagesMapView
            playerCP={squad.reduce((sum, c) => sum + c.totalCombatPower, 0)}
            stagesList={campaignStages}
            onSelectStage={stage => {
              setCurrentStageId(stage.id);
              setBoss(prev => ({
                ...prev,
                name: stage.bossName,
                title: `Trùm Địa Bàn (${stage.subtitle})`,
                maxHp: 180000,
                currentHp: 180000,
                maxBreak: 3500,
                currentBreak: 3500,
                def: 950,
                atk: 2800
              }));
              addLog(`Đã định vị mục tiêu khiêu chiến: ${stage.name} - ${stage.bossName}`, 'system');
            }}
            onGoToBattle={() => setActiveTab('battle')}
            onClearStageSuccess={handleClearStage}
            onClaimAfkRewards={rewards => {
              setGold(prev => prev + rewards.gold);
              setDiamonds(prev => prev + rewards.diamonds);
              addLog(`Thu hoạch AFK treo máy: +${rewards.gold.toLocaleString()} Vàng và +${rewards.diamonds} Kim Cương!`, 'style');
            }}
          />
        ) : activeTab === 'inventory' ? (
          <InventoryAndUpgradeView
            inventory={inventory}
            squad={squad}
            gold={gold}
            diamonds={diamonds}
            evolutionMaterials={evolutionMaterials}
            onConsumeEvolutionMaterial={handleConsumeEvolutionMaterial}
            onUpdateInventoryItem={updatedItem => {
              setInventory(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
              // Cập nhật lại các tướng đang mặc món đồ này và tính lại CP
              setSquad(prev => prev.map(c => {
                let hasItem = false;
                const newEquip = { ...c.equippedItems };
                for (const [slot, it] of Object.entries(newEquip)) {
                  if (it && it.id === updatedItem.id) {
                    newEquip[slot as EquipmentSlot] = updatedItem;
                    hasItem = true;
                  }
                }
                return hasItem ? recalculateHeroWithEquipment(c, newEquip) : c;
              }));
              setOwnedHeroes(prev => prev.map(c => {
                let hasItem = false;
                const newEquip = { ...c.equippedItems };
                for (const [slot, it] of Object.entries(newEquip)) {
                  if (it && it.id === updatedItem.id) {
                    newEquip[slot as EquipmentSlot] = updatedItem;
                    hasItem = true;
                  }
                }
                return hasItem ? recalculateHeroWithEquipment(c, newEquip) : c;
              }));
              setSelectedCard(prev => {
                if (!prev) return null;
                let hasItem = false;
                const newEquip = { ...prev.equippedItems };
                for (const [slot, it] of Object.entries(newEquip)) {
                  if (it && it.id === updatedItem.id) {
                    newEquip[slot as EquipmentSlot] = updatedItem;
                    hasItem = true;
                  }
                }
                return hasItem ? recalculateHeroWithEquipment(prev, newEquip) : prev;
              });
              addLog(`Cường hóa thành công [${updatedItem.name}] lên +${updatedItem.enhanceLevel || 0}! Lực chiến trang bị và tướng đã được tăng tương ứng.`, 'style');
            }}
            onUpdateCharacter={updatedCard => {
              setSquad(prev => prev.map(hero => hero.id === updatedCard.id ? updatedCard : hero));
              addLog(`Tiến hóa nhân vật ${updatedCard.name} lên ${updatedCard.stars || 1}★! Chiến lực: +${updatedCard.totalCombatPower.toLocaleString()}`, 'style');
            }}
            onDeductGold={amount => {
              if (gold >= amount) {
                setGold(prev => prev - amount);
                return true;
              }
              return false;
            }}
            onDeductDiamonds={amount => {
              if (diamonds >= amount) {
                setDiamonds(prev => prev - amount);
                return true;
              }
              return false;
            }}
            onAddGold={amount => {
              setGold(prev => prev + amount);
            }}
            onAddDiamonds={amount => {
              setDiamonds(prev => prev + amount);
            }}
            onRemoveInventoryItems={itemIds => {
              const idSet = new Set(itemIds);
              setInventory(prev => prev.filter(item => !idSet.has(item.id)));
            }}
            onAddInventoryItem={newItem => {
              setInventory(prev => [newItem, ...prev]);
            }}
          />
        ) : activeTab === 'events' ? (
          <EventsView
            gold={gold}
            diamonds={diamonds}
            playerCP={squad.reduce((sum, c) => sum + c.totalCombatPower, 0)}
            onAddGold={amount => setGold(prev => prev + amount)}
            onAddDiamonds={amount => setDiamonds(prev => prev + amount)}
            onDeductDiamonds={cost => {
              if (diamonds >= cost) {
                setDiamonds(prev => prev - cost);
                return true;
              }
              return false;
            }}
            onGoToBattle={() => setActiveTab('battle')}
            onChallengeBoss={handleChallengeTimedBoss}
            onAddHeroCard={handleAddHeroCard}
          />
        ) : (
          <GachaView
            onAddEquipmentToInventory={newItem => setInventory(prev => [newItem, ...prev])}
            onAddHeroCard={handleAddHeroCard}
            onAddEvolutionMaterial={handleAddEvolutionMaterial}
            diamonds={diamonds}
            gold={gold}
            onDeductDiamonds={cost => {
              if (diamonds >= cost) {
                setDiamonds(prev => prev - cost);
                return true;
              }
              return false;
            }}
            onDeductGold={cost => {
              if (gold >= cost) {
                setGold(prev => prev - cost);
                return true;
              }
              return false;
            }}
            onSyncWallet={(g, d) => {
              setGold(g);
              setDiamonds(d);
            }}
          />
        )}
      </main>

      {/* Equipment Inspector Modal */}
      {selectedCard && (
        <EquipmentInspectorModal
          card={selectedCard}
          inventory={inventory}
          onClose={() => setSelectedCard(null)}
          onEquipItem={handleEquipItem}
          onUnequipItem={handleUnequipItem}
        />
      )}

      {/* Auth & Profile System Modal */}
      <AuthProfileModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={{ ...userProfile, gold, diamonds }}
        serverStatus={serverStatus}
        latencyMs={latencyMs}
        onUserChange={loadBackendState}
      />

      {/* SSS All-Out Resonance Cinematic Overlay */}
      {isAllOutActive && (
        <AllOutResonanceOverlay
          squad={squad}
          onComplete={() => setIsAllOutActive(false)}
          damageDealt={52000}
        />
      )}

      {/* Squad Formation Selection Modal (FEAT-014) */}
      <SquadFormationModal
        isOpen={isSquadModalOpen}
        onClose={() => setIsSquadModalOpen(false)}
        currentSquad={squad}
        ownedHeroes={ownedHeroes}
        onSaveSquad={newSquad => {
          const valid6 = newSquad.slice(0, 6);
          setSquad(valid6);
          addLog(`✅ Đã lưu đội hình 6 tướng xuất chiến thành công! Tổng CP: ${valid6.reduce((s, c) => s + c.totalCombatPower, 0).toLocaleString()} CP`, 'allout');
        }}
      />
    </div>
  );
}
