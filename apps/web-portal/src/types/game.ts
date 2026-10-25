export type CardRarity = 'Common' | 'Fine' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Sovereign';

export type EquipmentSlot = 'Weapon' | 'Jacket' | 'Pants' | 'Shoes' | 'Accessory' | 'Mount';

export interface EquipmentItem {
  id: string;
  name: string;
  slot: EquipmentSlot;
  rank: CardRarity;
  serverLimit?: '1_OF_1' | '10_OF_10' | '100_OF_100' | 'UNLIMITED';
  editionNumber?: number;
  setName?: string;
  enhanceLevel?: number;
  level: number;
  maxLevel: number;
  stats: {
    hp?: number;
    atk?: number;
    def?: number;
    critRate?: number;
    critDamage?: number;
    styleBonus?: number;
    dodgeRate?: number;
    startingEnergy?: number;
    speed?: number;
    breakEfficiency?: number;
  };
  exclusivePerk?: {
    name: string;
    description: string;
  };
  image?: string;
  colorHex: string;
}

export interface EquipmentSet {
  id: string;
  name: string;
  serverLimit: '1_OF_1' | '10_OF_10' | '100_OF_100' | 'STANDARD';
  rank: CardRarity;
  description: string;
  items: EquipmentItem[];
  setBonuses: {
    piecesRequired: number;
    description: string;
    statsBonus: { hp?: number; atk?: number; def?: number; critRate?: number };
  }[];
}

export interface GachaChest {
  id: string;
  name: string;
  costCurrency: 'GOLD' | 'DIAMONDS';
  costAmount: number;
  minRarity: CardRarity;
  maxRarity: CardRarity;
  jackpotChance: number;
  icon: string;
  image?: string;
  bgGradient: string;
  borderColor: string;
  description: string;
}

export type SquadPosition = 'Frontline' | 'Midline' | 'Backline';
export type AscensionRealm = 'Star' | 'Moon' | 'Sun';

export interface AscensionInfo {
  realm: AscensionRealm;
  count: number; // 1 to 6
  symbol: string; // '⭐' | '🌙' | '☀️'
  fullDisplay: string; // e.g. "☀️☀️☀️☀️☀️☀️"
  isSixSuns: boolean;
  tierNumber: number; // 1 to 18
  realmTitle: string;
}

export function getHeroAscensionInfo(hero: {
  stars?: number;
  ascensionTier?: number;
  suns?: number;
  moons?: number;
}): AscensionInfo {
  let tier = hero.ascensionTier;
  if (!tier) {
    if (hero.suns && hero.suns > 0) {
      tier = 12 + Math.min(6, hero.suns);
    } else if (hero.moons && hero.moons > 0) {
      tier = 6 + Math.min(6, hero.moons);
    } else {
      tier = Math.min(6, Math.max(1, hero.stars || 1));
    }
  }

  if (tier >= 13) {
    const suns = Math.min(6, tier - 12);
    return {
      realm: 'Sun',
      count: suns,
      symbol: '☀️',
      fullDisplay: '☀️'.repeat(suns),
      isSixSuns: suns === 6,
      tierNumber: tier,
      realmTitle: suns === 6 ? '6 THÁI DƯƠNG TỐI CAO' : `${suns} Thái Dương`
    };
  } else if (tier >= 7) {
    const moons = Math.min(6, tier - 6);
    return {
      realm: 'Moon',
      count: moons,
      symbol: '🌙',
      fullDisplay: '🌙'.repeat(moons),
      isSixSuns: false,
      tierNumber: tier,
      realmTitle: `${moons} Huyền Nguyệt`
    };
  } else {
    const stars = Math.min(6, Math.max(1, tier));
    return {
      realm: 'Star',
      count: stars,
      symbol: '⭐',
      fullDisplay: '⭐'.repeat(stars),
      isSixSuns: false,
      tierNumber: tier,
      realmTitle: `${stars} Tinh Tú`
    };
  }
}

export interface CharacterCard {
  id: string;
  name: string;
  role: string;
  position: SquadPosition;
  rank: CardRarity;
  stars?: number;
  ascensionTier?: number; // 1..18 (1-6: Stars, 7-12: Moons, 13-18: Suns)
  tierRealm?: AscensionRealm;
  moons?: number;
  suns?: number;
  isAwakened?: boolean;
  avatarImage?: string;
  level: number;
  maxLevel: number;
  currentHp: number;
  maxHp: number;
  currentShield: number;
  atk: number;
  def: number;
  critRate: number;
  critDamage: number;
  styleBonus: number;
  avatarIcon: string;
  avatarBg: string;
  signatureSkill: {
    name: string;
    type: 'Attack' | 'Defense' | 'Skill' | 'Ultimate';
    energyCost: number;
    description: string;
  };
  skills?: HeroSkill[];
  archetype?: TeamArchetype;
  currentRage?: number; // 0..100 nộ khí
  maxRage?: number;     // 100
  title?: string;
  lore?: string;
  equippedItems: {
    Weapon?: EquipmentItem;
    Jacket?: EquipmentItem;
    Pants?: EquipmentItem;
    Shoes?: EquipmentItem;
    Accessory?: EquipmentItem;
    Mount?: EquipmentItem;
  };
  totalCombatPower: number;
  description: string;
  isStunned?: boolean;
  isImmune?: boolean;       // Trạng thái Bất Tử (HP không thể tụt dưới 1)
  immunityTurns?: number;   // Số lượt duy trì Bất Tử
  baseCombatPower?: number;
  baseAtk?: number;
  baseMaxHp?: number;
  baseDef?: number;
  baseCritRate?: number;
  baseCritDamage?: number;
  baseStyleBonus?: number;
}

export type CombatEffectType = 
  | 'DAMAGE' 
  | 'POISON' 
  | 'SHIELD' 
  | 'HEAL' 
  | 'TEAM_HEAL' 
  | 'HEAL_AND_SHIELD'       // Vừa hồi máu vừa tạo khiên 150% giá trị
  | 'HEAL_AND_IMMUNITY'     // Hồi máu khẩn cấp + Ban trạng thái Bất Tử
  | 'WEAKEN' 
  | 'TEAM_ATK_BUFF' 
  | 'CRIT_BURST' 
  | 'SINGLE_CRIT_EXECUTE'   // Dồn chí mạng đơn mục tiêu trảm sát
  | 'AOE_CRIT_BURST'        // Dồn chí mạng quét sạch toàn mục tiêu
  | 'CLEANSE' 
  | 'RAGE_BUFF'
  | 'STUN';

export type TeamArchetype = 
  | 'POISON_CORROSION' 
  | 'CRIT_HYPERCARRY' 
  | 'SHIELD_COUNTER' 
  | 'CONTROL_WEAKEN' 
  | 'IMMORTAL_CLEANSE';

export interface HeroSkill {
  id: string;
  name: string;
  type: 'Attack' | 'Defense' | 'Skill' | 'Ultimate' | 'Passive' | 'Aura';
  unlockRequirement: 'BASE' | 'STAR_6' | 'MOON_6' | 'SUN_6';
  minTier: number; // Tier 1..18
  cooldownTurns: number;
  cooldownRounds?: number;
  energyCost: number;
  effectType: CombatEffectType;
  targetScope?: 'SINGLE' | 'AOE' | 'CLEAVE' | 'SELF' | 'ALLIES';
  basePowerMultiplier: number;
  scalingAtkPercent?: number;
  effectValue: number;
  description: string;
  icon?: string;
  unlockCondition?: string;
}

// Hàm tính lực chiến trang bị chuẩn xác theo cân bằng RPG 2026
export function calculateItemCombatPower(item: EquipmentItem): number {
  const stats = item.stats || {};
  const baseHp = (stats.hp || 0) * 0.6;
  const baseAtk = (stats.atk || 0) * 3.2;
  const baseDef = (stats.def || 0) * 2.0;
  const baseCritRate = (stats.critRate || 0) * 35000;
  const baseCritDmg = (stats.critDamage || 0) * 15000;
  const baseSpeed = (stats.speed || 0) * 120;
  const baseDodge = (stats.dodgeRate || 0) * 20000;
  const baseStyle = (stats.styleBonus || 0) * 150;

  const rawCP = baseHp + baseAtk + baseDef + baseCritRate + baseCritDmg + baseSpeed + baseDodge + baseStyle;
  const enhanceMultiplier = 1 + (item.enhanceLevel || 0) * 0.06;

  // Mốc tối thiểu theo phẩm chất để đảm bảo cân bằng
  const rankFloorMap: Record<CardRarity, number> = {
    Common: 850,
    Fine: 2800,
    Rare: 7500,
    Epic: 18500,
    Legendary: 38000,
    Mythic: 72000,
    Sovereign: 135000
  };

  const calculated = Math.round((rawCP || rankFloorMap[item.rank] || 1000) * enhanceMultiplier);
  return Math.max(rankFloorMap[item.rank] || 850, calculated);
}

export interface SetResonanceResult {
  activeSets: { rank: CardRarity; count: number; bonusCp: number; bonusAtk: number; bonusDef: number; bonusHp: number }[];
  totalBonusCp: number;
  totalBonusAtk: number;
  totalBonusDef: number;
  totalBonusHp: number;
}

// Tính hiệu ứng kích hoạt bộ trang bị (2 món, 4 món, 6 món)
export function calculateEquipmentSetResonance(equippedItems: CharacterCard['equippedItems']): SetResonanceResult {
  const items = Object.values(equippedItems || {}).filter((item): item is EquipmentItem => Boolean(item));
  const rankCounts: Partial<Record<CardRarity, number>> = {};

  for (const item of items) {
    rankCounts[item.rank] = (rankCounts[item.rank] || 0) + 1;
  }

  const activeSets: SetResonanceResult['activeSets'] = [];
  let totalBonusCp = 0;
  let totalBonusAtk = 0;
  let totalBonusDef = 0;
  let totalBonusHp = 0;

  for (const [rankStr, count] of Object.entries(rankCounts)) {
    const rank = rankStr as CardRarity;
    let bonusCp = 0;
    let bonusAtk = 0;
    let bonusDef = 0;
    let bonusHp = 0;

    if (count >= 6) {
      if (rank === 'Sovereign') { bonusCp = 180000; bonusAtk = 15000; bonusDef = 6000; bonusHp = 80000; }
      else if (rank === 'Mythic') { bonusCp = 90000; bonusAtk = 7500; bonusDef = 3500; bonusHp = 45000; }
      else if (rank === 'Legendary') { bonusCp = 50000; bonusAtk = 4000; bonusDef = 2000; bonusHp = 25000; }
      else if (rank === 'Epic') { bonusCp = 25000; bonusAtk = 2000; bonusDef = 1000; bonusHp = 12000; }
      else if (rank === 'Rare') { bonusCp = 12000; bonusAtk = 900; bonusDef = 500; bonusHp = 6000; }
      else { bonusCp = 5000; bonusAtk = 300; bonusDef = 200; bonusHp = 2500; }
    } else if (count >= 4) {
      if (rank === 'Sovereign') { bonusCp = 80000; bonusAtk = 6000; bonusDef = 2500; bonusHp = 35000; }
      else if (rank === 'Mythic') { bonusCp = 40000; bonusAtk = 3000; bonusDef = 1500; bonusHp = 20000; }
      else if (rank === 'Legendary') { bonusCp = 22000; bonusAtk = 1800; bonusDef = 900; bonusHp = 11000; }
      else if (rank === 'Epic') { bonusCp = 11000; bonusAtk = 900; bonusDef = 450; bonusHp = 5500; }
      else if (rank === 'Rare') { bonusCp = 5000; bonusAtk = 400; bonusDef = 200; bonusHp = 2500; }
      else { bonusCp = 2000; bonusAtk = 120; bonusDef = 80; bonusHp = 1000; }
    } else if (count >= 2) {
      if (rank === 'Sovereign') { bonusCp = 30000; bonusAtk = 2200; bonusDef = 900; bonusHp = 12000; }
      else if (rank === 'Mythic') { bonusCp = 15000; bonusAtk = 1100; bonusDef = 550; bonusHp = 7000; }
      else if (rank === 'Legendary') { bonusCp = 8000; bonusAtk = 650; bonusDef = 350; bonusHp = 4000; }
      else if (rank === 'Epic') { bonusCp = 4000; bonusAtk = 300; bonusDef = 160; bonusHp = 2000; }
      else if (rank === 'Rare') { bonusCp = 2000; bonusAtk = 150; bonusDef = 80; bonusHp = 1000; }
      else { bonusCp = 800; bonusAtk = 50; bonusDef = 30; bonusHp = 400; }
    }

    if (bonusCp > 0) {
      activeSets.push({ rank, count, bonusCp, bonusAtk, bonusDef, bonusHp });
      totalBonusCp += bonusCp;
      totalBonusAtk += bonusAtk;
      totalBonusDef += bonusDef;
      totalBonusHp += bonusHp;
    }
  }

  return { activeSets, totalBonusCp, totalBonusAtk, totalBonusDef, totalBonusHp };
}

// Tính toán lại toàn bộ chỉ số và lực chiến của tướng khi gắn/tháo trang bị
export function recalculateHeroWithEquipment(
  hero: CharacterCard,
  newEquippedItems?: CharacterCard['equippedItems']
): CharacterCard {
  const currentEquipped = hero.equippedItems || {};
  const targetEquipped = newEquippedItems !== undefined ? newEquippedItems : currentEquipped;

  // 1. Xác định chỉ số gốc nếu chưa có
  let baseCombatPower = hero.baseCombatPower;
  let baseAtk = hero.baseAtk;
  let baseMaxHp = hero.baseMaxHp;
  let baseDef = hero.baseDef;
  let baseCritRate = hero.baseCritRate;
  let baseCritDamage = hero.baseCritDamage;
  let baseStyleBonus = hero.baseStyleBonus;

  if (baseCombatPower === undefined || baseAtk === undefined || baseMaxHp === undefined || baseDef === undefined) {
    const curEquippedItems = Object.values(currentEquipped).filter((item): item is EquipmentItem => Boolean(item));
    const curEquipCp = curEquippedItems.reduce((sum, it) => sum + calculateItemCombatPower(it), 0);
    const curSetBonus = calculateEquipmentSetResonance(currentEquipped);

    const curEquipAtk = curEquippedItems.reduce((sum, it) => sum + (it.stats.atk || 0), 0);
    const curEquipHp = curEquippedItems.reduce((sum, it) => sum + (it.stats.hp || 0), 0);
    const curEquipDef = curEquippedItems.reduce((sum, it) => sum + (it.stats.def || 0), 0);
    const curEquipCritRate = curEquippedItems.reduce((sum, it) => sum + (it.stats.critRate || 0), 0);
    const curEquipCritDmg = curEquippedItems.reduce((sum, it) => sum + (it.stats.critDamage || 0), 0);
    const curEquipStyle = curEquippedItems.reduce((sum, it) => sum + (it.stats.styleBonus || 0), 0);

    baseCombatPower = Math.max(Math.round(hero.totalCombatPower * 0.35), hero.totalCombatPower - curEquipCp - curSetBonus.totalBonusCp);
    baseAtk = Math.max(Math.round(hero.atk * 0.35), hero.atk - curEquipAtk - curSetBonus.totalBonusAtk);
    baseMaxHp = Math.max(Math.round(hero.maxHp * 0.35), hero.maxHp - curEquipHp - curSetBonus.totalBonusHp);
    baseDef = Math.max(Math.round(hero.def * 0.35), hero.def - curEquipDef - curSetBonus.totalBonusDef);
    baseCritRate = Math.max(0.05, (hero.critRate || 0.1) - curEquipCritRate);
    baseCritDamage = Math.max(1.5, (hero.critDamage || 1.5) - curEquipCritDmg);
    baseStyleBonus = Math.max(10, (hero.styleBonus || 50) - curEquipStyle);
  }

  // Đảm bảo không bị undefined
  const effectiveCritRate = baseCritRate ?? (hero.critRate || 0.1);
  const effectiveCritDmg = baseCritDamage ?? (hero.critDamage || 1.5);
  const effectiveStyle = baseStyleBonus ?? (hero.styleBonus || 50);

  // 2. Tính tổng chỉ số từ trang bị mới
  const newItems = Object.values(targetEquipped).filter((item): item is EquipmentItem => Boolean(item));
  const newEquipCp = newItems.reduce((sum, it) => sum + calculateItemCombatPower(it), 0);
  const newSetBonus = calculateEquipmentSetResonance(targetEquipped);

  const newEquipAtk = newItems.reduce((sum, it) => sum + (it.stats.atk || 0), 0);
  const newEquipHp = newItems.reduce((sum, it) => sum + (it.stats.hp || 0), 0);
  const newEquipDef = newItems.reduce((sum, it) => sum + (it.stats.def || 0), 0);
  const newEquipCritRate = newItems.reduce((sum, it) => sum + (it.stats.critRate || 0), 0);
  const newEquipCritDmg = newItems.reduce((sum, it) => sum + (it.stats.critDamage || 0), 0);
  const newEquipStyle = newItems.reduce((sum, it) => sum + (it.stats.styleBonus || 0), 0);

  const finalAtk = Math.round(baseAtk + newEquipAtk + newSetBonus.totalBonusAtk);
  const finalMaxHp = Math.round(baseMaxHp + newEquipHp + newSetBonus.totalBonusHp);
  const finalDef = Math.round(baseDef + newEquipDef + newSetBonus.totalBonusDef);
  const finalCritRate = Number((effectiveCritRate + newEquipCritRate).toFixed(3));
  const finalCritDamage = Number((effectiveCritDmg + newEquipCritDmg).toFixed(2));
  const finalStyleBonus = Math.round(effectiveStyle + newEquipStyle);
  const finalCombatPower = Math.round(baseCombatPower + newEquipCp + newSetBonus.totalBonusCp);

  // Giữ tỷ lệ phần trăm HP hiện tại
  const hpRatio = hero.maxHp > 0 ? hero.currentHp / hero.maxHp : 1;
  const finalCurrentHp = Math.max(1, Math.round(finalMaxHp * hpRatio));

  return {
    ...hero,
    baseCombatPower,
    baseAtk,
    baseMaxHp,
    baseDef,
    baseCritRate,
    baseCritDamage,
    baseStyleBonus,
    equippedItems: targetEquipped,
    atk: finalAtk,
    maxHp: finalMaxHp,
    currentHp: finalCurrentHp,
    def: finalDef,
    critRate: finalCritRate,
    critDamage: finalCritDamage,
    styleBonus: finalStyleBonus,
    totalCombatPower: finalCombatPower
  };
}

// Helper to determine unlocked skills for a hero based on ascension tier
export function getHeroUnlockedSkills(hero: CharacterCard): HeroSkill[] {
  const ascension = getHeroAscensionInfo(hero);
  const tier = ascension.tierNumber;

  if (hero.skills && hero.skills.length > 0) {
    return hero.skills.filter(s => tier >= s.minTier);
  }

  // Default fallback 6 skills generated procedurally if hero.skills not populated
  const baseSkills: HeroSkill[] = [
    {
      id: `${hero.id}_skill_1`,
      name: 'Đòn Đánh Căn Bản',
      type: 'Attack',
      unlockRequirement: 'BASE',
      minTier: 1,
      cooldownTurns: 0,
      energyCost: 0,
      effectType: 'DAMAGE',
      basePowerMultiplier: 1.0 + (tier * 0.05),
      effectValue: 0,
      description: 'Tấn công mục tiêu gây sát thương chuẩn theo ATK và hồi +25 Nộ.',
      icon: '⚔️'
    },
    {
      id: `${hero.id}_skill_2`,
      name: hero.signatureSkill?.name || 'Kỹ Năng Trấn Phái',
      type: 'Skill',
      unlockRequirement: 'BASE',
      minTier: 1,
      cooldownTurns: 2,
      energyCost: 1,
      effectType: hero.role.includes('Tank') ? 'SHIELD' : hero.role.includes('Heal') ? 'HEAL' : 'DAMAGE',
      basePowerMultiplier: 1.8 + (tier * 0.1),
      effectValue: hero.role.includes('Tank') ? 5000 * tier : 3000 * tier,
      description: hero.signatureSkill?.description || 'Giải phóng nội lực áp chế kẻ địch.',
      icon: '⚡'
    },
    {
      id: `${hero.id}_skill_3`,
      name: 'Chiến Ý Khởi Phát',
      type: 'Passive',
      unlockRequirement: 'BASE',
      minTier: 1,
      cooldownTurns: 0,
      energyCost: 0,
      effectType: 'TEAM_ATK_BUFF',
      basePowerMultiplier: 1.0,
      effectValue: 10 + Math.min(30, tier * 2),
      description: `Tăng vĩnh viễn +${10 + Math.min(30, tier * 2)}% sát thương bạo kích cho bản thân và đồng minh.`,
      icon: '🔥'
    }
  ];

  // Skill 4: Unlocks at 6 Stars (Tier >= 6)
  if (tier >= 6) {
    baseSkills.push({
      id: `${hero.id}_skill_4`,
      name: 'Tinh Tú Tuyệt Kỹ (6★)',
      type: 'Skill',
      unlockRequirement: 'STAR_6',
      minTier: 6,
      cooldownTurns: 3,
      energyCost: 2,
      effectType: hero.role.includes('Assassin') ? 'CRIT_BURST' : 'WEAKEN',
      basePowerMultiplier: 3.2 + (tier * 0.15),
      effectValue: 25,
      description: 'Triệu hồi sức mạnh 6 Tinh Tú, bộc phá sát thương và suy nhược đối thủ.',
      icon: '⭐'
    });
  }

  // Skill 5: Unlocks at 6 Moons (Tier >= 12)
  if (tier >= 12) {
    baseSkills.push({
      id: `${hero.id}_skill_5`,
      name: 'Nguyệt Quang Thần Giới (6🌙)',
      type: 'Ultimate',
      unlockRequirement: 'MOON_6',
      minTier: 12,
      cooldownTurns: 4,
      energyCost: 3,
      effectType: 'TEAM_HEAL',
      basePowerMultiplier: 5.0 + (tier * 0.2),
      effectValue: 15000 * (tier / 2),
      description: 'Vầng trăng thần giáng lâm hồi phục sinh lực và giải toàn bộ khống chế cho toàn đội.',
      icon: '🌙'
    });
  }

  // Skill 6: Unlocks at 6 Suns (Tier >= 18)
  if (tier >= 18) {
    baseSkills.push({
      id: `${hero.id}_skill_6`,
      name: 'Thái Dương Sáng Thế Thần Diệt (6☀️)',
      type: 'Ultimate',
      unlockRequirement: 'SUN_6',
      minTier: 18,
      cooldownTurns: 5,
      energyCost: 3,
      effectType: 'CRIT_BURST',
      basePowerMultiplier: 12.0,
      effectValue: 100,
      description: 'Sức mạnh 6 Mặt Trời Thần Cực nung chảy toàn bộ phòng tuyến đối phương, 100% bạo kích!',
      icon: '☀️'
    });
  }

  return baseSkills;
}

export interface TeamSynergy {
  id: string;
  name: string;
  partnerNames: string[];
  partnerIds: string[];
  badgeColor: string;
  passiveBonus: string;
  jointUltimateName: string;
  jointUltimateDesc: string;
}

export interface StageNode {
  id: string;
  chapter: number;
  name: string;
  subtitle: string;
  recommendedCP: number;
  bossName: string;
  isCleared: boolean;
  isUnlocked: boolean;
  drops: {
    rarity: CardRarity;
    name: string;
  }[];
}

export type ActionCardType = 'Attack' | 'Defense' | 'Skill' | 'Ultimate';

export interface ActionCard {
  id: string;
  name: string;
  type: ActionCardType;
  rarity: CardRarity;
  energyCost: number;
  characterOwnerId: string;
  characterOwnerName: string;
  damageValue?: number;
  breakDamage?: number;
  shieldValue?: number;
  healValue?: number;
  stylePoints: number;
  description: string;
  colorHex: string;
  iconName: string;
}

export type StyleRank = 'D' | 'C' | 'B' | 'A' | 'S' | 'SSS';

export interface BossIntent {
  type: 'Attack' | 'Defend' | 'Ultimate' | 'Stun';
  targetRole: SquadPosition | 'All';
  value: number;
  description: string;
}

export interface BossState {
  id: string;
  name: string;
  title: string;
  level?: number;
  currentHp: number;
  maxHp: number;
  currentBreak: number;
  maxBreak: number;
  def?: number;
  atk?: number;
  recommendedCP?: number;
  isStaggered: boolean;
  intent: BossIntent;
  phase: number;
  avatarBg: string;
  image?: string;
}

export interface BattleLogEntry {
  id: string;
  timestamp: string;
  text: string;
  type: 'player' | 'boss' | 'style' | 'system' | 'allout';
}

export type MainNavTab = 'bosshub' | 'battle' | 'squad' | 'gacha' | 'stages' | 'inventory' | 'events';

export interface RaidRanker {
  rank: number;
  playerName: string;
  guild: string;
  totalDamage: number;
  vipLevel: number;
}

export interface CarnivalLoginDay {
  day: number;
  title: string;
  rewardType: 'gold' | 'diamonds' | 'gacha' | 'item' | 'hero';
  rewardLabel: string;
  gold?: number;
  diamonds?: number;
  isClaimed: boolean;
  canClaim: boolean;
}

export interface EvolutionMaterial {
  id: string;
  name: string;
  rank: CardRarity;
  icon: string;
  count: number;
  description: string;
  targetStar: number;
  colorHex: string;
}

export type GachaDropType = 'EQUIPMENT' | 'HERO' | 'MATERIAL';

export interface GachaDropResult {
  id: string;
  type: GachaDropType;
  equipmentItem?: EquipmentItem;
  heroCard?: CharacterCard;
  materialItem?: EvolutionMaterial;
  isFlipped: boolean;
}

export interface TimedBossEvent {
  id: string;
  name: string;
  title: string;
  timeSlot: string; // e.g. '12:00 - 13:00'
  startHour: number;
  endHour: number;
  bossCode: string;
  icon: string;
  bgGradient: string;
  recommendedCP: number;
  drops: string[];
  bossState: BossState;
}

export interface CpRaceRanker {
  rank: number;
  playerName: string;
  guild: string;
  combatPower: number;
  vipLevel: number;
  badgeTitle: string;
}

export interface CpRaceMilestone {
  id: string;
  cpRequired: number;
  goldReward: number;
  diamondsReward: number;
  materialRewardName: string;
  materialCount: number;
  isClaimed: boolean;
}


