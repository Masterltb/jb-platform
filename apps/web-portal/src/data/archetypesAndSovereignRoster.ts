import { CharacterCard, HeroSkill, TeamArchetype } from '@/types/game';

// 5 Archetypes metadata
export const TEAM_ARCHETYPES_META: Record<
  TeamArchetype,
  { type: TeamArchetype; name: string; icon: string; color: string; accentColor: string; description: string; synergyBuff: string }
> = {
  POISON_CORROSION: {
    type: 'POISON_CORROSION',
    name: 'Độc Dược & Hủ Thực (Poison DoT)',
    icon: '🧪',
    color: '#10ffa0',
    accentColor: '#10ffa0',
    description: 'Chuyên rút máu % HP, gây độc ăn mòn giáp và giảm 50% hồi phục của đối thủ.',
    synergyBuff: '+45% Sát Thương Độc & Giảm 30% Hồi Máu Boss'
  },
  CRIT_HYPERCARRY: {
    type: 'CRIT_HYPERCARRY',
    name: 'Dồn Chí Mạng & Nộ Bộc Phát (Crit Burst)',
    icon: '⚡',
    color: '#ff0055',
    accentColor: '#ff0055',
    description: 'Bơm nộ liên tục, phân hóa Đơn Mục Tiêu (Single Execute) và Toàn Mục Tiêu (AoE Burst).',
    synergyBuff: '+50% Tỉ Lệ Bạo Kích & Hồi +35 Nộ Mỗi Lượt'
  },
  SHIELD_COUNTER: {
    type: 'SHIELD_COUNTER',
    name: 'Thần Khiên & Phản Sát (Iron Bastion)',
    icon: '🛡️',
    color: '#00f0ff',
    accentColor: '#00f0ff',
    description: 'Dựng rào chắn kiên cố hàng trăm nghìn HP, phản chấn 60% sát thương nhận vào.',
    synergyBuff: '+65% Lượng Khiên & Phản 50% Sát Thương Về Boss'
  },
  CONTROL_WEAKEN: {
    type: 'CONTROL_WEAKEN',
    name: 'Băng Phong & Suy Nhược (Freeze & Weaken)',
    icon: '❄️',
    color: '#38bdf8',
    accentColor: '#38bdf8',
    description: 'Làm chậm nộ, đóng băng gián đoạn đòn đánh và suy nhược giảm 40% sát thương của Boss.',
    synergyBuff: 'Giảm 35% Sát Thương Boss & Đóng Băng 1 Lượt'
  },
  IMMORTAL_CLEANSE: {
    type: 'IMMORTAL_CLEANSE',
    name: 'Bất Diệt, Thánh Y & Thanh Tẩy (Heal & Cleanse)',
    icon: '🕊️',
    color: '#f59e0b',
    accentColor: '#f59e0b',
    description: 'Hồi phục kết hợp Khiên hoặc ban trạng thái Bất Tử, giải trừ mọi khống chế.',
    synergyBuff: 'Hồi Máu + Khiên/Bất Tử & Miễn Dịch Tử Vong'
  }
};

// =========================================================================
// 15 SOVEREIGN ELITE HEROES (3 TƯỚNG TINH HOA / ARCHETYPE)
// Độc Quyền Sự Kiện 1-of-1, Chiến Thuật Đa Dạng
// =========================================================================

// --- ARCHETYPE 1: POISON / CORROSION (3 Sovereign) ---
export const SOVEREIGN_POISON_HEROES: CharacterCard[] = [
  {
    id: 'sov_poison_jaebin',
    name: 'JaeBin Độc Tôn Ma Hoàng [1-OF-1]',
    title: 'Vạn Độc Hắc Long Chi Chủ',
    lore: 'Nắm giữ Cổ Độc vạn năm, mỗi đòn đánh phủ độc tử thần ăn mòn giáp và % máu tối đa của Boss.',
    role: 'Sovereign / Poison Carry',
    position: 'Frontline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 260000, maxHp: 260000, currentShield: 40000,
    atk: 48000, def: 20000, critRate: 0.65, critDamage: 3.2, styleBonus: 500,
    avatarIcon: '👑', avatarBg: 'from-emerald-900 to-black',
    avatarImage: '/images/jaebin_awakened_hero.jpg',
    archetype: 'POISON_CORROSION',
    totalCombatPower: 1880000,
    description: 'Chúa tể Cổ Độc phủ độc tử thần ăn mòn sinh lực.',
    signatureSkill: { name: 'Vạn Độc Hắc Long Phệ', type: 'Ultimate', energyCost: 3, description: 'Phun nọc độc axit ăn mòn 5% HP tối đa của Boss mỗi lượt.' },
    equippedItems: {},
    skills: [
      { id: 'sk_p1', name: 'Hủ Cốt Độc Trảo', type: 'Attack', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 1, energyCost: 0, effectType: 'POISON', basePowerMultiplier: 1.5, effectValue: 2, description: 'Đánh thường tẩm độc gây 2 tầng độc ăn mòn.', icon: '🧪', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_p2', name: 'Hắc Phong Độc Chấn', type: 'Skill', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 2, energyCost: 1, effectType: 'POISON', basePowerMultiplier: 2.2, effectValue: 3, description: 'Bộc phát luồng độc khí làm giảm 30% giáp Boss.', icon: '🌪️', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_p3', name: 'Vạn Độc Hắc Long Phệ', type: 'Ultimate', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 3, energyCost: 3, effectType: 'POISON', basePowerMultiplier: 3.8, effectValue: 5, description: 'Triệu hồi Hắc Long độc phệ nuốt chửng 5% HP Boss.', icon: '🐉', unlockCondition: 'Tuyệt Kỹ Khởi Đầu' },
      { id: 'sk_p4', name: 'Tử Thần Huyết Khí', type: 'Passive', unlockRequirement: 'STAR_6', minTier: 6, cooldownTurns: 0, energyCost: 0, effectType: 'WEAKEN', basePowerMultiplier: 1.0, effectValue: 40, description: 'Mở khóa mốc 6★: Khiến mục tiêu bị trúng độc suy nhược giảm 40% ATK.', icon: '⭐', unlockCondition: 'Mở ở 6 Sao (Tier 6)' },
      { id: 'sk_p5', name: 'Bão Độc Vô Cực', type: 'Skill', unlockRequirement: 'MOON_6', minTier: 12, cooldownTurns: 3, energyCost: 2, effectType: 'AOE_CRIT_BURST', basePowerMultiplier: 3.5, effectValue: 0, description: 'Mở khóa mốc 6🌙: Bão độc quét sạch quái phụ và dồn sát thương lên Boss.', icon: '🌙', unlockCondition: 'Mở ở 6 Mặt Trăng (Tier 12)' },
      { id: 'sk_p6', name: 'Cửu U Tuyệt Mệnh Trận', type: 'Aura', unlockRequirement: 'SUN_6', minTier: 18, cooldownTurns: 4, energyCost: 3, effectType: 'POISON', basePowerMultiplier: 5.5, effectValue: 10, description: 'Mở khóa mốc 6☀️: Kích nổ 10 tầng độc tối đa gây hàng triệu sát thương chuẩn!', icon: '☀️', unlockCondition: 'Mở ở 6 Mặt Trời (Tier 18)' }
    ]
  },
  {
    id: 'sov_poison_medusa',
    name: 'U Minh Xà Hậu Medusa [1-OF-1]',
    title: 'Hóa Thạch Độc Cơ',
    lore: 'Nữ hoàng rắn Cyberpunk với ánh mắt hóa đá và khóa hoàn toàn khả năng hồi phục của Boss.',
    role: 'Sovereign / Heal Blocker',
    position: 'Midline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 240000, maxHp: 240000, currentShield: 35000,
    atk: 46000, def: 21000, critRate: 0.60, critDamage: 2.9, styleBonus: 460,
    avatarIcon: '🐍', avatarBg: 'from-emerald-950 to-teal-950',
    archetype: 'POISON_CORROSION',
    totalCombatPower: 1840000,
    description: 'Chuyên gia khóa hồi máu và phủ nọc độc tê liệt.',
    signatureSkill: { name: 'Ánh Nhìn Hóa Thạch', type: 'Skill', energyCost: 2, description: 'Cấm Boss hồi máu và gây 3 tầng kịch độc.' },
    equippedItems: {},
    skills: [
      { id: 'sk_pm1', name: 'Băng Xà Xạ Kích', type: 'Attack', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 1, energyCost: 0, effectType: 'POISON', basePowerMultiplier: 1.6, effectValue: 2, description: 'Bắn tia nọc rắn gây độc liên tục.', icon: '🐍', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_pm2', name: 'Ánh Nhìn Hóa Thạch', type: 'Skill', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 2, energyCost: 2, effectType: 'WEAKEN', basePowerMultiplier: 2.4, effectValue: 35, description: 'Làm chậm nộ khí và suy nhược 35% sát thương Boss.', icon: '👁️', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_pm3', name: 'Xà Vũ Cuồng Loạn', type: 'Ultimate', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 3, energyCost: 3, effectType: 'POISON', basePowerMultiplier: 4.0, effectValue: 4, description: 'Hàng ngàn rắn độc vây hãm Boss cấm hồi máu.', icon: '⚡', unlockCondition: 'Tuyệt Kỹ Khởi Đầu' },
      { id: 'sk_pm4', name: 'Huyết Độc Thấu Tâm', type: 'Passive', unlockRequirement: 'STAR_6', minTier: 6, cooldownTurns: 0, energyCost: 0, effectType: 'POISON', basePowerMultiplier: 1.2, effectValue: 3, description: 'Mở khóa mốc 6★: Mỗi đòn đánh tích thêm 3 tầng độc.', icon: '⭐', unlockCondition: 'Mở ở 6 Sao (Tier 6)' },
      { id: 'sk_pm5', name: 'Mê Hồn Độc Trụ', type: 'Skill', unlockRequirement: 'MOON_6', minTier: 12, cooldownTurns: 3, energyCost: 2, effectType: 'AOE_CRIT_BURST', basePowerMultiplier: 3.4, effectValue: 0, description: 'Mở khóa mốc 6🌙: Quét sạch lính phụ quanh Boss.', icon: '🌙', unlockCondition: 'Mở ở 6 Mặt Trăng (Tier 12)' },
      { id: 'sk_pm6', name: 'Tuyệt Diệt Thạch Trận', type: 'Aura', unlockRequirement: 'SUN_6', minTier: 18, cooldownTurns: 4, energyCost: 3, effectType: 'POISON', basePowerMultiplier: 5.2, effectValue: 8, description: 'Mở khóa mốc 6☀️: Hóa thạch toàn sân đấu, gây bạo kích kịch độc.', icon: '☀️', unlockCondition: 'Mở ở 6 Mặt Trời (Tier 18)' }
    ]
  },
  {
    id: 'sov_poison_cuuu',
    name: 'Hắc Ám Độc Tiên Cửu U [1-OF-1]',
    title: 'Bậc Thầy Bộc Phát Độc',
    lore: 'Luyện độc thành đan, có khả năng kích nổ tất cả tầng độc hiện có thành sát thương tức thời.',
    role: 'Sovereign / DoT Detonator',
    position: 'Backline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 220000, maxHp: 220000, currentShield: 30000,
    atk: 50000, def: 18000, critRate: 0.68, critDamage: 3.4, styleBonus: 480,
    avatarIcon: '☠️', avatarBg: 'from-purple-950 to-black',
    archetype: 'POISON_CORROSION',
    totalCombatPower: 1860000,
    description: 'Kích nổ độc tố thành sát thương chuẩn cực đại.',
    signatureSkill: { name: 'Cửu U Độc Bạo', type: 'Ultimate', energyCost: 3, description: 'Kích nổ tất cả tầng độc trên Boss, gây 50,000 sát thương mỗi tầng.' },
    equippedItems: {},
    skills: [
      { id: 'sk_pc1', name: 'Tử Đan Xạ Kích', type: 'Attack', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 1, energyCost: 0, effectType: 'POISON', basePowerMultiplier: 1.7, effectValue: 2, description: 'Bắn đan dược độc ăn mòn HP.', icon: '🟣', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_pc2', name: 'Độc Vân Hãm Trận', type: 'Skill', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 2, energyCost: 1, effectType: 'POISON', basePowerMultiplier: 2.5, effectValue: 3, description: 'Rải mây độc làm chậm nộ khí Boss.', icon: '☁️', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_pc3', name: 'Cửu U Độc Bạo', type: 'Ultimate', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 3, energyCost: 3, effectType: 'SINGLE_CRIT_EXECUTE', basePowerMultiplier: 4.6, effectValue: 0, description: 'Kích nổ toàn bộ độc tố dồn sát thương cực đại.', icon: '💥', unlockCondition: 'Tuyệt Kỹ Khởi Đầu' },
      { id: 'sk_pc4', name: 'Ăn Mòn Tủy Xương', type: 'Passive', unlockRequirement: 'STAR_6', minTier: 6, cooldownTurns: 0, energyCost: 0, effectType: 'WEAKEN', basePowerMultiplier: 1.0, effectValue: 30, description: 'Mở khóa mốc 6★: Giảm thêm 30% giáp của Boss.', icon: '⭐', unlockCondition: 'Mở ở 6 Sao (Tier 6)' },
      { id: 'sk_pc5', name: 'Vạn Dược Nghịch Chuyển', type: 'Skill', unlockRequirement: 'MOON_6', minTier: 12, cooldownTurns: 3, energyCost: 2, effectType: 'AOE_CRIT_BURST', basePowerMultiplier: 3.6, effectValue: 0, description: 'Mở khóa mốc 6🌙: Quét sạch lính phụ, dồn sát thương lên Boss.', icon: '🌙', unlockCondition: 'Mở ở 6 Mặt Trăng (Tier 12)' },
      { id: 'sk_pc6', name: 'Tuyệt Mệnh Đan Hỏa', type: 'Aura', unlockRequirement: 'SUN_6', minTier: 18, cooldownTurns: 4, energyCost: 3, effectType: 'SINGLE_CRIT_EXECUTE', basePowerMultiplier: 6.0, effectValue: 0, description: 'Mở khóa mốc 6☀️: Trảm sát đòn chí mạng kết liễu Boss!', icon: '☀️', unlockCondition: 'Mở ở 6 Mặt Trời (Tier 18)' }
    ]
  }
];

// --- ARCHETYPE 2: CRIT HYPERCARRY (3 Sovereign - Đơn Mục Tiêu vs Toàn Mục Tiêu) ---
export const SOVEREIGN_CRIT_HEROES: CharacterCard[] = [
  {
    id: 'sov_crit_jaebin',
    name: 'JaeBin Lôi Thần Kiếm Đế [1-OF-1]',
    title: 'Đơn Mục Tiêu - Tuyệt Kỹ Trảm Sát Kết Liễu',
    lore: 'Đệ nhất kiếm thánh hệ Lôi, tập trung toàn bộ uy lực vào 1 kiếm duy nhất chém đứt sinh mệnh Boss (tăng 1.8x sát thương khi Boss dưới 35% HP).',
    role: 'Sovereign / Single Nuke Assassin',
    position: 'Frontline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 250000, maxHp: 250000, currentShield: 35000,
    atk: 56000, def: 19000, critRate: 0.85, critDamage: 4.2, styleBonus: 600,
    avatarIcon: '⚡', avatarBg: 'from-amber-950 via-rose-950 to-black',
    avatarImage: '/images/jaebin_awakened_hero.jpg',
    archetype: 'CRIT_HYPERCARRY',
    totalCombatPower: 1950000,
    description: 'Chuyên gia trảm sát đơn mục tiêu One Shot Boss!',
    signatureSkill: { name: 'Lôi Kiếm Tru Thần', type: 'Ultimate', energyCost: 3, description: 'Trảm sát đơn mục tiêu gây 4,500% ATK, tăng 1.8x khi Boss dưới 35% HP.' },
    equippedItems: {},
    skills: [
      { id: 'sk_c1', name: 'Lôi Quang Trảm', type: 'Attack', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 1, energyCost: 0, effectType: 'DAMAGE', targetScope: 'SINGLE', basePowerMultiplier: 2.0, effectValue: 0, description: 'Chém đơn mục tiêu tích +25 nộ.', icon: '🗡️', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_c2', name: 'Tụ Khí Lôi Đài', type: 'Skill', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 2, energyCost: 1, effectType: 'RAGE_BUFF', targetScope: 'SELF', basePowerMultiplier: 1.0, effectValue: 50, description: 'Hồi ngay +50 nộ khí sẵn sàng tung tuyệt kỹ.', icon: '⚡', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_c3', name: 'Lôi Kiếm Tru Thần', type: 'Ultimate', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 3, energyCost: 3, effectType: 'SINGLE_CRIT_EXECUTE', targetScope: 'SINGLE', basePowerMultiplier: 4.5, effectValue: 0, description: 'Trảm sát đơn mục tiêu dồn chí mạng cực hạn.', icon: '🌩️', unlockCondition: 'Tuyệt Kỹ Khởi Đầu' },
      { id: 'sk_c4', name: 'Tâm Kiếm Hợp Nhất', type: 'Passive', unlockRequirement: 'STAR_6', minTier: 6, cooldownTurns: 0, energyCost: 0, effectType: 'TEAM_ATK_BUFF', targetScope: 'ALLIES', basePowerMultiplier: 1.0, effectValue: 35, description: 'Mở khóa mốc 6★: Tăng 35% ATK cho toàn đội.', icon: '⭐', unlockCondition: 'Mở ở 6 Sao (Tier 6)' },
      { id: 'sk_c5', name: 'Thiểm Điện Phá Thế', type: 'Skill', unlockRequirement: 'MOON_6', minTier: 12, cooldownTurns: 3, energyCost: 2, effectType: 'SINGLE_CRIT_EXECUTE', targetScope: 'SINGLE', basePowerMultiplier: 5.0, effectValue: 0, description: 'Mở khóa mốc 6🌙: Kiếm kích trảm phá giáp Boss, bạo kích x2.', icon: '🌙', unlockCondition: 'Mở ở 6 Mặt Trăng (Tier 12)' },
      { id: 'sk_c6', name: 'Thiên Phạt Diệt Thế', type: 'Aura', unlockRequirement: 'SUN_6', minTier: 18, cooldownTurns: 4, energyCost: 3, effectType: 'SINGLE_CRIT_EXECUTE', targetScope: 'SINGLE', basePowerMultiplier: 6.8, effectValue: 0, description: 'Mở khóa mốc 6☀️: Đòn trảm sát tối thượng 6,800% ATK kết liễu Boss!', icon: '☀️', unlockCondition: 'Mở ở 6 Mặt Trời (Tier 18)' }
    ]
  },
  {
    id: 'sov_crit_bachlong',
    name: 'Thần Kiếm Vô Cực Bạch Long [1-OF-1]',
    title: 'Toàn Mục Tiêu - Bão Kiếm Càn Quét Chiến Trường',
    lore: 'Luyện thành Vô Cực Kiếm Trận, có thể phân tách vạn đạo kiếm quang quét sạch toàn bộ quái phụ và dồn sát thương diện rộng lên Boss.',
    role: 'Sovereign / AoE Cleave Carry',
    position: 'Backline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 240000, maxHp: 240000, currentShield: 30000,
    atk: 53000, def: 20000, critRate: 0.75, critDamage: 3.8, styleBonus: 550,
    avatarIcon: '🐉', avatarBg: 'from-blue-950 to-indigo-950',
    archetype: 'CRIT_HYPERCARRY',
    totalCombatPower: 1920000,
    description: 'Chuyên gia bão kiếm toàn mục tiêu, dọn sân thần tốc.',
    signatureSkill: { name: 'Vạn Kiếm Quy Tông', type: 'Ultimate', energyCost: 3, description: 'Bão kiếm càn quét toàn bộ quái phụ và gây 3,500% ATK lên Boss.' },
    equippedItems: {},
    skills: [
      { id: 'sk_cb1', name: 'Bạch Long Khinh Kiếm', type: 'Attack', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 1, energyCost: 0, effectType: 'DAMAGE', targetScope: 'SINGLE', basePowerMultiplier: 1.8, effectValue: 0, description: 'Chém thường tích nộ.', icon: '🗡️', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_cb2', name: 'Kiếm Khí Tung Hoành', type: 'Skill', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 2, energyCost: 1, effectType: 'AOE_CRIT_BURST', targetScope: 'AOE', basePowerMultiplier: 2.6, effectValue: 0, description: 'Kiếm khí quét ngang toàn đội hình địch.', icon: '🌊', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_cb3', name: 'Vạn Kiếm Quy Tông', type: 'Ultimate', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 3, energyCost: 3, effectType: 'AOE_CRIT_BURST', targetScope: 'AOE', basePowerMultiplier: 3.8, effectValue: 0, description: 'Bão kiếm toàn mục tiêu tiêu diệt lính phụ tức thì.', icon: '🌪️', unlockCondition: 'Tuyệt Kỹ Khởi Đầu' },
      { id: 'sk_cb4', name: 'Long Ngâm Trấn Địa', type: 'Passive', unlockRequirement: 'STAR_6', minTier: 6, cooldownTurns: 0, energyCost: 0, effectType: 'TEAM_ATK_BUFF', targetScope: 'ALLIES', basePowerMultiplier: 1.0, effectValue: 30, description: 'Mở khóa mốc 6★: Tăng 30% sát thương chí mạng toàn đội.', icon: '⭐', unlockCondition: 'Mở ở 6 Sao (Tier 6)' },
      { id: 'sk_cb5', name: 'Băng Long Phá Giáp', type: 'Skill', unlockRequirement: 'MOON_6', minTier: 12, cooldownTurns: 3, energyCost: 2, effectType: 'AOE_CRIT_BURST', targetScope: 'AOE', basePowerMultiplier: 4.2, effectValue: 0, description: 'Mở khóa mốc 6🌙: Long ảnh chém phá phòng ngự toàn sân đấu.', icon: '🌙', unlockCondition: 'Mở ở 6 Mặt Trăng (Tier 12)' },
      { id: 'sk_cb6', name: 'Vô Cực Bão Kiếm Trận', type: 'Aura', unlockRequirement: 'SUN_6', minTier: 18, cooldownTurns: 4, energyCost: 3, effectType: 'AOE_CRIT_BURST', targetScope: 'AOE', basePowerMultiplier: 5.8, effectValue: 0, description: 'Mở khóa mốc 6☀️: Đại bão kiếm hủy diệt toàn bộ quân địch!', icon: '☀️', unlockCondition: 'Mở ở 6 Mặt Trời (Tier 18)' }
    ]
  },
  {
    id: 'sov_crit_cuonglong',
    name: 'Cuồng Nộ Chiến Đế Bạt Đao [1-OF-1]',
    title: 'Bậc Thầy Bơm Nộ & Kích Nổ Bạo Kích',
    lore: 'Vị tướng cuồng nộ luôn giữ nhịp trận đấu ở tốc độ cao nhất, liên tục sạc nộ cho đồng đội tung tuyệt chiêu.',
    role: 'Sovereign / Rage Battery & Crit Booster',
    position: 'Midline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 270000, maxHp: 270000, currentShield: 40000,
    atk: 51000, def: 22000, critRate: 0.70, critDamage: 3.5, styleBonus: 500,
    avatarIcon: '🪓', avatarBg: 'from-red-950 to-orange-950',
    archetype: 'CRIT_HYPERCARRY',
    totalCombatPower: 1900000,
    description: 'Bơm nộ và buff 100% bạo kích cho chủ lực.',
    signatureSkill: { name: 'Cuồng Bạo Nộ Hỏa', type: 'Skill', energyCost: 2, description: 'Tăng 100% tỉ lệ chí mạng và hồi đầy nộ cho tướng sát thương chính.' },
    equippedItems: {},
    skills: [
      { id: 'sk_cc1', name: 'Bạt Đao Trảm', type: 'Attack', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 1, energyCost: 0, effectType: 'DAMAGE', targetScope: 'SINGLE', basePowerMultiplier: 1.9, effectValue: 0, description: 'Đao kích nhanh rút ngắn hồi chiêu.', icon: '🗡️', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_cc2', name: 'Nộ Huyết Sôi Trào', type: 'Skill', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 2, energyCost: 1, effectType: 'RAGE_BUFF', targetScope: 'ALLIES', basePowerMultiplier: 1.0, effectValue: 40, description: 'Sạc ngay +40 nộ khí cho toàn đội hình.', icon: '🔥', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_cc3', name: 'Trảm Phá Sơn Hà', type: 'Ultimate', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 3, energyCost: 3, effectType: 'SINGLE_CRIT_EXECUTE', targetScope: 'SINGLE', basePowerMultiplier: 4.2, effectValue: 0, description: 'Bổ đao cực mạnh xé rách phòng ngự Boss.', icon: '🪓', unlockCondition: 'Tuyệt Kỹ Khởi Đầu' },
      { id: 'sk_cc4', name: 'Chiến Ý Bất Tận', type: 'Passive', unlockRequirement: 'STAR_6', minTier: 6, cooldownTurns: 0, energyCost: 0, effectType: 'TEAM_ATK_BUFF', targetScope: 'ALLIES', basePowerMultiplier: 1.0, effectValue: 35, description: 'Mở khóa mốc 6★: Tăng 35% sát thương toàn đội.', icon: '⭐', unlockCondition: 'Mở ở 6 Sao (Tier 6)' },
      { id: 'sk_cc5', name: 'Huyết Đao Liệt Trận', type: 'Skill', unlockRequirement: 'MOON_6', minTier: 12, cooldownTurns: 3, energyCost: 2, effectType: 'AOE_CRIT_BURST', targetScope: 'AOE', basePowerMultiplier: 3.8, effectValue: 0, description: 'Mở khóa mốc 6🌙: Quét sạch lính phụ và chém Boss.', icon: '🌙', unlockCondition: 'Mở ở 6 Mặt Trăng (Tier 12)' },
      { id: 'sk_cc6', name: 'Cuồng Nộ Diệt Thế', type: 'Aura', unlockRequirement: 'SUN_6', minTier: 18, cooldownTurns: 4, energyCost: 3, effectType: 'SINGLE_CRIT_EXECUTE', targetScope: 'SINGLE', basePowerMultiplier: 6.2, effectValue: 0, description: 'Mở khóa mốc 6☀️: Trảm sát bạo kích kết liễu tối hậu!', icon: '☀️', unlockCondition: 'Mở ở 6 Mặt Trời (Tier 18)' }
    ]
  }
];

// --- ARCHETYPE 3: SHIELD COUNTER (3 Sovereign) ---
export const SOVEREIGN_SHIELD_HEROES: CharacterCard[] = [
  {
    id: 'sov_shield_jaebin',
    name: 'JaeBin Kim Cương Bất Hoại [1-OF-1]',
    title: 'Thần Khiên Thánh Giáp Trấn Thế',
    lore: 'Phòng thủ tuyệt đối, vừa tạo khiên khổng lồ hàng trăm nghìn HP vừa phản chấn sát thương về Boss.',
    role: 'Sovereign / Main Tank & Shield Counter',
    position: 'Frontline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 350000, maxHp: 350000, currentShield: 100000,
    atk: 40000, def: 35000, critRate: 0.40, critDamage: 2.2, styleBonus: 450,
    avatarIcon: '🛡️', avatarBg: 'from-cyan-950 to-blue-950',
    avatarImage: '/images/jaebin_awakened_hero.jpg',
    archetype: 'SHIELD_COUNTER',
    totalCombatPower: 1890000,
    description: 'Thần hộ mệnh che chở toàn bộ tiền tuyến và phản đòn cực mạnh.',
    signatureSkill: { name: 'Kim Cang Bất Hoại Thể', type: 'Ultimate', energyCost: 3, description: 'Phủ lá chắn 200,000 HP cho toàn đội và phản 60% sát thương nhận vào.' },
    equippedItems: {},
    skills: [
      { id: 'sk_s1', name: 'Thiết Thuẫn Đả', type: 'Attack', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 1, energyCost: 0, effectType: 'SHIELD', basePowerMultiplier: 1.5, effectValue: 30000, description: 'Đập khiên tạo 30,000 lá chắn.', icon: '🛡️', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_s2', name: 'Kim Cang Trấn Khí', type: 'Defense', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 2, energyCost: 1, effectType: 'SHIELD', basePowerMultiplier: 2.0, effectValue: 60000, description: 'Tạo rào chắn kiên cố cho hàng tiền tuyến.', icon: '🔰', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_s3', name: 'Kim Cang Bất Hoại Thể', type: 'Ultimate', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 3, energyCost: 3, effectType: 'HEAL_AND_SHIELD', basePowerMultiplier: 3.0, effectValue: 120000, description: 'Vừa hồi máu vừa tạo khiên khổng lồ bảo vệ cả đội.', icon: '✨', unlockCondition: 'Tuyệt Kỹ Khởi Đầu' },
      { id: 'sk_s4', name: 'Phản Kích Gai Nhọn', type: 'Passive', unlockRequirement: 'STAR_6', minTier: 6, cooldownTurns: 0, energyCost: 0, effectType: 'SHIELD', basePowerMultiplier: 1.0, effectValue: 50, description: 'Mở khóa mốc 6★: Phản lại 50% sát thương nhận vào.', icon: '⭐', unlockCondition: 'Mở ở 6 Sao (Tier 6)' },
      { id: 'sk_s5', name: 'Thánh Thuẫn Ba Động', type: 'Skill', unlockRequirement: 'MOON_6', minTier: 12, cooldownTurns: 3, energyCost: 2, effectType: 'AOE_CRIT_BURST', basePowerMultiplier: 3.2, effectValue: 0, description: 'Mở khóa mốc 6🌙: Nổ khiên thành sóng chấn quét sạch lính phụ.', icon: '🌙', unlockCondition: 'Mở ở 6 Mặt Trăng (Tier 12)' },
      { id: 'sk_s6', name: 'Thần Giáp Vô Địch Trận', type: 'Aura', unlockRequirement: 'SUN_6', minTier: 18, cooldownTurns: 4, energyCost: 3, effectType: 'HEAL_AND_SHIELD', basePowerMultiplier: 4.5, effectValue: 200000, description: 'Mở khóa mốc 6☀️: Khiên thần tối thượng hấp thụ 200,000 sát thương!', icon: '☀️', unlockCondition: 'Mở ở 6 Mặt Trời (Tier 18)' }
    ]
  },
  {
    id: 'sov_shield_huyenvu',
    name: 'Huyền Vũ Đế Quân Trấn Hải [1-OF-1]',
    title: 'Bậc Thầy Phản Sát 80%',
    lore: 'Thần thú Huyền Vũ ngự trị bắc hải, biến mọi đòn đánh của Boss thành phản lực đánh trả ngược lại.',
    role: 'Sovereign / Retaliation Bruiser',
    position: 'Frontline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 380000, maxHp: 380000, currentShield: 80000,
    atk: 38000, def: 38000, critRate: 0.35, critDamage: 2.0, styleBonus: 420,
    avatarIcon: '🐢', avatarBg: 'from-teal-950 to-blue-950',
    archetype: 'SHIELD_COUNTER',
    totalCombatPower: 1870000,
    description: 'Phản đòn 80% sát thương khiến Boss tự đánh chết mình.',
    signatureSkill: { name: 'Huyền Vũ Phản Chấn', type: 'Skill', energyCost: 2, description: 'Phản 80% sát thương nhận vào trong 3 lượt.' },
    equippedItems: {}
  },
  {
    id: 'sov_shield_thietve',
    name: 'Thần Khôi Thiết Vệ Vạn Thuẫn [1-OF-1]',
    title: 'Pháo Đài Kim Loại Cyber',
    lore: 'Bộ giáp cơ giới tối thượng hấp thu động năng chuyển hóa thành xung chấn phá nát giáp Boss.',
    role: 'Sovereign / Break Shield Tank',
    position: 'Frontline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 360000, maxHp: 360000, currentShield: 90000,
    atk: 39000, def: 36000, critRate: 0.40, critDamage: 2.1, styleBonus: 440,
    avatarIcon: '🤖', avatarBg: 'from-slate-900 to-cyan-950',
    archetype: 'SHIELD_COUNTER',
    totalCombatPower: 1880000,
    description: 'Chuyên gia phá thế Break Stance của Boss bằng lá chắn xung kích.',
    signatureSkill: { name: 'Xung Kích Phá Thế', type: 'Ultimate', energyCost: 3, description: 'Phá nát 3,000 điểm Break Gauge của Boss ngay lập tức.' },
    equippedItems: {}
  }
];

// --- ARCHETYPE 4: CONTROL & WEAKEN (3 Sovereign) ---
export const SOVEREIGN_CONTROL_HEROES: CharacterCard[] = [
  {
    id: 'sov_control_jaebin',
    name: 'JaeBin Băng Phong Tuyệt Cảnh [1-OF-1]',
    title: 'Hàn Băng Thần Tôn Gián Đoạn Đòn Đánh',
    lore: 'Đóng băng vạn vật, làm chậm toàn bộ đòn đánh của Boss và làm suy nhược 40% ATK đối thủ.',
    role: 'Sovereign / Freeze Controller',
    position: 'Midline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 260000, maxHp: 260000, currentShield: 40000,
    atk: 47000, def: 23000, critRate: 0.55, critDamage: 2.8, styleBonus: 480,
    avatarIcon: '❄️', avatarBg: 'from-sky-950 via-cyan-950 to-black',
    avatarImage: '/images/jaebin_awakened_hero.jpg',
    archetype: 'CONTROL_WEAKEN',
    totalCombatPower: 1880000,
    description: 'Đóng băng Boss gián đoạn đòn tấn công cuồng nộ.',
    signatureSkill: { name: 'Hàn Băng Vạn Niên Trận', type: 'Ultimate', energyCost: 3, description: 'Đóng băng Boss 1 lượt và suy nhược giảm 40% ATK trong 3 lượt.' },
    equippedItems: {}
  },
  {
    id: 'sov_control_tuyetnu',
    name: 'Hàn Băng Thần Nữ Tuyết Cơ [1-OF-1]',
    title: 'Nữ Hoàng Bão Tuyết Suy Nhược',
    lore: 'Triệu hồi bão tuyết âm 200 độ C đóng băng năng lượng nộ của toàn bộ quân địch.',
    role: 'Sovereign / Silence Controller',
    position: 'Backline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 240000, maxHp: 240000, currentShield: 35000,
    atk: 48000, def: 21000, critRate: 0.58, critDamage: 3.0, styleBonus: 500,
    avatarIcon: '🧊', avatarBg: 'from-indigo-950 to-slate-950',
    archetype: 'CONTROL_WEAKEN',
    totalCombatPower: 1860000,
    description: 'Giảm 50% ATK Boss và cấm tích nộ.',
    signatureSkill: { name: 'Băng Tuyết Phong Tỏa', type: 'Skill', energyCost: 2, description: 'Tước đoạt 50 nộ khí của Boss và kéo dài thời gian suy nhược.' },
    equippedItems: {}
  },
  {
    id: 'sov_control_damavuong',
    name: 'U Hồn Phong Ấn Sư Dạ Ma [1-OF-1]',
    title: 'Bậc Thầy Khóa Chiêu & Trấn Áp',
    lore: 'Dùng xích sắt ma đạo khóa chặt Boss, ngăn chặn Boss tung tuyệt chiêu nộ.',
    role: 'Sovereign / Ultimate Silencer',
    position: 'Backline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 250000, maxHp: 250000, currentShield: 35000,
    atk: 46000, def: 22000, critRate: 0.52, critDamage: 2.7, styleBonus: 460,
    avatarIcon: '⛓️', avatarBg: 'from-purple-950 to-black',
    archetype: 'CONTROL_WEAKEN',
    totalCombatPower: 1850000,
    description: 'Khóa chặt Boss không cho tung chiêu cuồng bạo.',
    signatureSkill: { name: 'U Hồn Tỏa Ma Xích', type: 'Ultimate', energyCost: 3, description: 'Khóa kỹ năng Boss trong 2 lượt liên tiếp.' },
    equippedItems: {}
  }
];

// --- ARCHETYPE 5: IMMORTAL & CLEANSE (3 Sovereign - Heal+Khiên vs Heal+Bất Tử) ---
export const SOVEREIGN_IMMORTAL_HEROES: CharacterCard[] = [
  {
    id: 'sov_immortal_jaebin',
    name: 'JaeBin Cửu Chuyển Trường Sinh [1-OF-1]',
    title: 'Heal Khẩn Cấp & Ban Trạng Thái Bất Tử (2 Lượt)',
    lore: 'Nắm giữ bí pháp Cửu Chuyển Hoàn Hồn, khi đồng minh nguy kịch sẽ hồi đầy máu và ban trạng thái BẤT TỬ (không thể chết trong 2 lượt khi HP tụt về 1).',
    role: 'Sovereign / Invulnerability Healer',
    position: 'Backline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 300000, maxHp: 300000, currentShield: 60000,
    atk: 44000, def: 28000, critRate: 0.50, critDamage: 2.5, styleBonus: 550,
    avatarIcon: '🕊️', avatarBg: 'from-amber-950 via-yellow-950 to-black',
    avatarImage: '/images/jaebin_awakened_hero.jpg',
    archetype: 'IMMORTAL_CLEANSE',
    totalCombatPower: 1910000,
    description: 'Hồi sinh lực cực đại và ban trạng thái Bất Tử chặn tử vong.',
    signatureSkill: { name: 'Cửu Chuyển Hoàn Hồn Bất Tử', type: 'Ultimate', energyCost: 3, description: 'Hồi 35% HP cả đội và ban trạng thái BẤT TỬ trong 2 lượt.' },
    equippedItems: {},
    skills: [
      { id: 'sk_i1', name: 'Linh Thần Thủ Ấn', type: 'Attack', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 1, energyCost: 0, effectType: 'HEAL', basePowerMultiplier: 1.6, effectValue: 20000, description: 'Đánh thường hồi máu cho đồng minh thấp nhất.', icon: '🌿', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_i2', name: 'Thanh Tẩy Linh Ba', type: 'Skill', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 2, energyCost: 1, effectType: 'CLEANSE', basePowerMultiplier: 1.0, effectValue: 0, description: 'Hóa giải lập tức mọi khống chế và độc tố.', icon: '🕊️', unlockCondition: 'Kỹ Năng Gốc' },
      { id: 'sk_i3', name: 'Cửu Chuyển Bất Tử Thuật', type: 'Ultimate', unlockRequirement: 'BASE', minTier: 1, cooldownTurns: 3, energyCost: 3, effectType: 'HEAL_AND_IMMUNITY', basePowerMultiplier: 3.5, effectValue: 50000, description: 'Hồi đầy sinh lực và ban BẤT TỬ chặn tử vong!', icon: '✨', unlockCondition: 'Tuyệt Kỹ Khởi Đầu' },
      { id: 'sk_i4', name: 'Trường Sinh Quang Hoàn', type: 'Passive', unlockRequirement: 'STAR_6', minTier: 6, cooldownTurns: 0, energyCost: 0, effectType: 'TEAM_ATK_BUFF', basePowerMultiplier: 1.0, effectValue: 25, description: 'Mở khóa mốc 6★: Tăng 25% công kích và phòng thủ toàn đội.', icon: '⭐', unlockCondition: 'Mở ở 6 Sao (Tier 6)' },
      { id: 'sk_i5', name: 'Thánh Thuẫn Sinh Mệnh', type: 'Skill', unlockRequirement: 'MOON_6', minTier: 12, cooldownTurns: 3, energyCost: 2, effectType: 'HEAL_AND_SHIELD', basePowerMultiplier: 3.0, effectValue: 80000, description: 'Mở khóa mốc 6🌙: Vừa hồi máu vừa phủ khiên thánh bảo hộ.', icon: '🌙', unlockCondition: 'Mở ở 6 Mặt Trăng (Tier 12)' },
      { id: 'sk_i6', name: 'Niết Bàn Đại Tái Sinh', type: 'Aura', unlockRequirement: 'SUN_6', minTier: 18, cooldownTurns: 4, energyCost: 3, effectType: 'HEAL_AND_IMMUNITY', basePowerMultiplier: 5.0, effectValue: 120000, description: 'Mở khóa mốc 6☀️: Bất tử toàn đội trong 2 lượt, hồi 100% HP!', icon: '☀️', unlockCondition: 'Mở ở 6 Mặt Trời (Tier 18)' }
    ]
  },
  {
    id: 'sov_immortal_nietban',
    name: 'Phục Sinh Thần Hoàng Niết Bàn [1-OF-1]',
    title: 'Heal Kết Hợp Khiên Thánh (150% Khiên)',
    lore: 'Phượng hoàng thần thánh niết bàn hồi sinh, mỗi lần tung chiêu vừa phục hồi sinh lực vừa tạo thêm lá chắn bảo vệ gấp rưỡi lượng máu hồi.',
    role: 'Sovereign / Shielded Healer',
    position: 'Backline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 280000, maxHp: 280000, currentShield: 55000,
    atk: 45000, def: 27000, critRate: 0.52, critDamage: 2.6, styleBonus: 520,
    avatarIcon: '🦚', avatarBg: 'from-orange-950 to-red-950',
    archetype: 'IMMORTAL_CLEANSE',
    totalCombatPower: 1890000,
    description: 'Vừa hồi máu vừa phủ khiên dày 150% lượng máu hồi.',
    signatureSkill: { name: 'Niết Bàn Thánh Quang', type: 'Ultimate', energyCost: 3, description: 'Hồi 80,000 HP và ban 120,000 Khiên bảo hộ toàn đội.' },
    equippedItems: {}
  },
  {
    id: 'sov_immortal_duocvuong',
    name: 'Dược Vương Thánh Mẫu Linh Thảo [1-OF-1]',
    title: 'Bậc Thầy Thanh Tẩy & Miễn Nhiễm Khống Chế',
    lore: 'Bậc thầy thảo dược cổ truyền, bảo đảm đội hình không bao giờ bị dính độc, suy nhược hay choáng váng.',
    role: 'Sovereign / Cleanse & Regen',
    position: 'Midline',
    rank: 'Sovereign',
    stars: 6, moons: 6, suns: 6, ascensionTier: 18, tierRealm: 'Sun',
    level: 100, maxLevel: 100,
    currentHp: 290000, maxHp: 290000, currentShield: 50000,
    atk: 43000, def: 29000, critRate: 0.48, critDamage: 2.4, styleBonus: 500,
    avatarIcon: '🌸', avatarBg: 'from-emerald-950 to-yellow-950',
    archetype: 'IMMORTAL_CLEANSE',
    totalCombatPower: 1870000,
    description: 'Thanh tẩy vĩnh viễn mọi debuff và hồi máu liên tục mỗi lượt.',
    signatureSkill: { name: 'Vạn Dược Hồi Xuân', type: 'Skill', energyCost: 2, description: 'Hồi 20% HP mỗi lượt cho toàn đội trong 4 lượt liên tiếp.' },
    equippedItems: {}
  }
];

// Dàn 15 Tướng Sovereign Tinh Hoa (3 tướng x 5 Archetypes)
export const ALL_SOVEREIGN_HEROES: CharacterCard[] = [
  ...SOVEREIGN_POISON_HEROES,
  ...SOVEREIGN_CRIT_HEROES,
  ...SOVEREIGN_SHIELD_HEROES,
  ...SOVEREIGN_CONTROL_HEROES,
  ...SOVEREIGN_IMMORTAL_HEROES
];

// =========================================================================
// 30 MYTHIC HEROES CATEGORIZED INTO 5 ARCHETYPES (6 TƯỚNG / HỆ)
// =========================================================================
export const ALL_MYTHIC_HEROES: CharacterCard[] = [
  // Poison Mythic (6)
  { id: 'myth_p1', name: 'Bạch Xà Vương Lam Thủy', role: 'Poison DPS', position: 'Frontline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 160000, maxHp: 160000, currentShield: 20000, atk: 32000, def: 14000, critRate: 0.45, critDamage: 2.2, styleBonus: 300, avatarIcon: '🐍', avatarBg: 'from-green-950 to-black', archetype: 'POISON_CORROSION', totalCombatPower: 980000, description: 'Phun độc làm giảm tốc độ xuất chiêu của đối phương.', signatureSkill: { name: 'Thủy Xà Độc Sát', type: 'Skill', energyCost: 2, description: 'Gây 1,800% sát thương độc ăn mòn.' }, equippedItems: {} },
  { id: 'myth_p2', name: 'Thiên Hạt Sát Thủ U Linh', role: 'Poison Assassin', position: 'Backline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 140000, maxHp: 140000, currentShield: 15000, atk: 35000, def: 12000, critRate: 0.55, critDamage: 2.5, styleBonus: 320, avatarIcon: '🦂', avatarBg: 'from-emerald-950 to-black', archetype: 'POISON_CORROSION', totalCombatPower: 960000, description: 'Chọc đuôi bọ cạp tiêm kịch độc gây choáng.', signatureSkill: { name: 'Hạt Vĩ Độc Thứ', type: 'Ultimate', energyCost: 3, description: 'Đâm xuyên tim gây sát thương chí mạng độc.' }, equippedItems: {} },
  { id: 'myth_p3', name: 'Cổ Độc Y Sư Ba Thục', role: 'Poison Buffer', position: 'Midline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 170000, maxHp: 170000, currentShield: 25000, atk: 29000, def: 16000, critRate: 0.40, critDamage: 2.0, styleBonus: 280, avatarIcon: '🧪', avatarBg: 'from-teal-950 to-black', archetype: 'POISON_CORROSION', totalCombatPower: 940000, description: 'Pha chế cổ trùng tăng 30% độc thương toàn đội.', signatureSkill: { name: 'Vạn Cổ Trùng Trận', type: 'Skill', energyCost: 2, description: 'Buff sát thương độc cho toàn đội.' }, equippedItems: {} },
  { id: 'myth_p4', name: 'U Độc Thiềm Thừ Thần', role: 'Poison Tank', position: 'Frontline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 210000, maxHp: 210000, currentShield: 35000, atk: 26000, def: 22000, critRate: 0.35, critDamage: 1.8, styleBonus: 260, avatarIcon: '🐸', avatarBg: 'from-green-950 to-black', archetype: 'POISON_CORROSION', totalCombatPower: 970000, description: 'Cóc vàng phun nọc độc hộ giáp.', signatureSkill: { name: 'Thiềm Thừ Độc Bào', type: 'Skill', energyCost: 2, description: 'Tạo giáp độc phản chấn.' }, equippedItems: {} },
  { id: 'myth_p5', name: 'Độc Chu Nữ Hoàng Nhện', role: 'Poison Web Controller', position: 'Midline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 155000, maxHp: 155000, currentShield: 20000, atk: 33000, def: 13000, critRate: 0.50, critDamage: 2.3, styleBonus: 310, avatarIcon: '🕷️', avatarBg: 'from-purple-950 to-black', archetype: 'POISON_CORROSION', totalCombatPower: 950000, description: 'Bủa vây tơ nhện độc giam cầm đối thủ.', signatureSkill: { name: 'Thiên La Độc Võng', type: 'Skill', energyCost: 2, description: 'Khóa chân đối thủ và tiêm độc.' }, equippedItems: {} },
  { id: 'myth_p6', name: 'Minh Phủ Độc Sư Tôn', role: 'Poison Finisher', position: 'Backline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 150000, maxHp: 150000, currentShield: 18000, atk: 36000, def: 13000, critRate: 0.52, critDamage: 2.4, styleBonus: 330, avatarIcon: '💀', avatarBg: 'from-zinc-950 to-black', archetype: 'POISON_CORROSION', totalCombatPower: 990000, description: 'Kích nổ độc tố hạ gục mục tiêu máu thấp.', signatureSkill: { name: 'Tuyệt Mệnh Độc Thiểm', type: 'Ultimate', energyCost: 3, description: 'Gây bạo kích theo số tầng độc.' }, equippedItems: {} },

  // Crit Mythic (6)
  { id: 'myth_c1', name: 'Lôi Đình Kiếm Tôn Bá Đao', role: 'Crit Burst DPS', position: 'Frontline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 165000, maxHp: 165000, currentShield: 20000, atk: 38000, def: 14000, critRate: 0.65, critDamage: 3.0, styleBonus: 350, avatarIcon: '⚡', avatarBg: 'from-red-950 to-black', archetype: 'CRIT_HYPERCARRY', totalCombatPower: 1050000, description: 'Chém bạo kích sấm sét xé rách chiến trường.', signatureSkill: { name: 'Lôi Đình Nhất Kiếm', type: 'Ultimate', energyCost: 3, description: 'Gây 2,800% sát thương chí mạng.' }, equippedItems: {} },
  { id: 'myth_c2', name: 'Phong Lôi Thần Thương Càn Khôn', role: 'Single Execute', position: 'Frontline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 160000, maxHp: 160000, currentShield: 20000, atk: 37000, def: 15000, critRate: 0.60, critDamage: 2.8, styleBonus: 340, avatarIcon: '🔱', avatarBg: 'from-orange-950 to-black', archetype: 'CRIT_HYPERCARRY', totalCombatPower: 1020000, description: 'Đâm xuyên giáp với tỉ lệ bạo kích 100%.', signatureSkill: { name: 'Thần Thương Phá Thiên', type: 'Skill', energyCost: 2, description: 'Đòn đâm xuyên giáp 1 mục tiêu.' }, equippedItems: {} },
  { id: 'myth_c3', name: 'Cung Thần Liệt Nhật Ánh Dương', role: 'AoE Crit Cleave', position: 'Backline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 145000, maxHp: 145000, currentShield: 15000, atk: 39000, def: 12000, critRate: 0.70, critDamage: 3.2, styleBonus: 360, avatarIcon: '🏹', avatarBg: 'from-amber-950 to-black', archetype: 'CRIT_HYPERCARRY', totalCombatPower: 1040000, description: 'Bắn mưa tên bạo kích quét sạch quân địch.', signatureSkill: { name: 'Vạn Tiễn Quy Tâm', type: 'Ultimate', energyCost: 3, description: 'Mưa tên chí mạng toàn sân đấu.' }, equippedItems: {} },
  { id: 'myth_c4', name: 'Cuồng Nộ Đao Vương Huyết Hải', role: 'Rage Battery', position: 'Midline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 180000, maxHp: 180000, currentShield: 25000, atk: 35000, def: 16000, critRate: 0.55, critDamage: 2.6, styleBonus: 320, avatarIcon: '⚔️', avatarBg: 'from-rose-950 to-black', archetype: 'CRIT_HYPERCARRY', totalCombatPower: 1010000, description: 'Mỗi đòn đánh hồi +30 nộ khí cho đồng đội.', signatureSkill: { name: 'Huyết Khí Trợ Chiến', type: 'Skill', energyCost: 1, description: 'Hồi nộ cho tướng dame chính.' }, equippedItems: {} },
  { id: 'myth_c5', name: 'Ám Ảnh Thích Khách Dạ Vũ', role: 'Single Execute', position: 'Backline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 140000, maxHp: 140000, currentShield: 15000, atk: 40000, def: 11000, critRate: 0.75, critDamage: 3.5, styleBonus: 380, avatarIcon: '🗡️', avatarBg: 'from-purple-950 to-black', archetype: 'CRIT_HYPERCARRY', totalCombatPower: 1060000, description: 'Bóng ma trảm sát Boss dưới 30% HP.', signatureSkill: { name: 'Ám Ảnh Tuyệt Diệt', type: 'Ultimate', energyCost: 3, description: 'Trảm sát gây 3,200% ATK.' }, equippedItems: {} },
  { id: 'myth_c6', name: 'Hỏa Phụng Chiến Tướng Viêm Đế', role: 'Crit Buffer', position: 'Midline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 175000, maxHp: 175000, currentShield: 25000, atk: 36000, def: 15000, critRate: 0.58, critDamage: 2.7, styleBonus: 330, avatarIcon: '🔥', avatarBg: 'from-orange-950 to-black', archetype: 'CRIT_HYPERCARRY', totalCombatPower: 1030000, description: 'Tăng 40% sát thương bạo kích toàn đội.', signatureSkill: { name: 'Viêm Hỏa Chúc Phúc', type: 'Skill', energyCost: 2, description: 'Buff bạo kích toàn đội.' }, equippedItems: {} },

  // Shield Mythic (6)
  { id: 'myth_s1', name: 'Kim Cang La Hán Phật Môn', role: 'Shield Tank', position: 'Frontline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 240000, maxHp: 240000, currentShield: 50000, atk: 25000, def: 25000, critRate: 0.30, critDamage: 1.8, styleBonus: 280, avatarIcon: '🛡️', avatarBg: 'from-amber-950 to-black', archetype: 'SHIELD_COUNTER', totalCombatPower: 1020000, description: 'Lá chắn hộ thể kim cương bảo vệ cả đội.', signatureSkill: { name: 'Kim Cang Hộ Thể', type: 'Skill', energyCost: 2, description: 'Tạo 80,000 giáp bảo vệ.' }, equippedItems: {} },
  { id: 'myth_s2', name: 'Thiết Giáp Chiến Thần Titan', role: 'Counter Bruiser', position: 'Frontline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 230000, maxHp: 230000, currentShield: 45000, atk: 27000, def: 24000, critRate: 0.32, critDamage: 1.9, styleBonus: 290, avatarIcon: '🤖', avatarBg: 'from-cyan-950 to-black', archetype: 'SHIELD_COUNTER', totalCombatPower: 1010000, description: 'Phản đòn 40% sát thương khi có khiên.', signatureSkill: { name: 'Thiết Giáp Phản Kích', type: 'Skill', energyCost: 2, description: 'Phản đòn khi bị tấn công.' }, equippedItems: {} },
  { id: 'myth_s3', name: 'Băng Giáp Tướng Quân Bắc Hàn', role: 'Shield & Freeze', position: 'Frontline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 220000, maxHp: 220000, currentShield: 40000, atk: 28000, def: 23000, critRate: 0.35, critDamage: 2.0, styleBonus: 300, avatarIcon: '🧊', avatarBg: 'from-blue-950 to-black', archetype: 'SHIELD_COUNTER', totalCombatPower: 1000000, description: 'Khiên băng làm chậm đòn đánh của Boss.', signatureSkill: { name: 'Băng Giáp Nghinh Phong', type: 'Skill', energyCost: 2, description: 'Tạo giáp và làm chậm Boss.' }, equippedItems: {} },
  { id: 'myth_s4', name: 'Thạch Cương Bá Vương Sơn Nhạc', role: 'Damage Absorber', position: 'Frontline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 250000, maxHp: 250000, currentShield: 55000, atk: 24000, def: 26000, critRate: 0.28, critDamage: 1.7, styleBonus: 270, avatarIcon: '⛰️', avatarBg: 'from-stone-900 to-black', archetype: 'SHIELD_COUNTER', totalCombatPower: 1030000, description: 'Hấp thụ sát thương chuyển hóa thành nộ.', signatureSkill: { name: 'Thạch Sơn Trấn Áp', type: 'Ultimate', energyCost: 3, description: 'Hấp thụ 100% sát thương đòn đánh.' }, equippedItems: {} },
  { id: 'myth_s5', name: 'Thần Mộc Hộ Giáp Mẫu Thần', role: 'Heal & Shield Combo', position: 'Midline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 200000, maxHp: 200000, currentShield: 40000, atk: 26000, def: 20000, critRate: 0.30, critDamage: 1.8, styleBonus: 310, avatarIcon: '🌳', avatarBg: 'from-emerald-950 to-black', archetype: 'SHIELD_COUNTER', totalCombatPower: 990000, description: 'Vừa hồi máu vừa tạo lá chắn bảo vệ.', signatureSkill: { name: 'Mộc Linh Thánh Thuẫn', type: 'Skill', energyCost: 2, description: 'Hồi 30,000 HP và ban khiên 45,000.' }, equippedItems: {} },
  { id: 'myth_s6', name: 'Hộ Thần Chiến Tướng Lôi Đài', role: 'Shield Buffer', position: 'Midline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 210000, maxHp: 210000, currentShield: 40000, atk: 27000, def: 21000, critRate: 0.32, critDamage: 1.9, styleBonus: 300, avatarIcon: '✨', avatarBg: 'from-yellow-950 to-black', archetype: 'SHIELD_COUNTER', totalCombatPower: 1000000, description: 'Tăng 40% giá trị khiên cho cả đội.', signatureSkill: { name: 'Quang Khiên Phù Trì', type: 'Skill', energyCost: 2, description: 'Khuếch đại khiên toàn đội.' }, equippedItems: {} },

  // Control Mythic (6)
  { id: 'myth_k1', name: 'Hàn Băng Pháp Vương Tuyết Cảnh', role: 'Freeze Controller', position: 'Midline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 160000, maxHp: 160000, currentShield: 20000, atk: 34000, def: 15000, critRate: 0.45, critDamage: 2.3, styleBonus: 310, avatarIcon: '❄️', avatarBg: 'from-cyan-950 to-black', archetype: 'CONTROL_WEAKEN', totalCombatPower: 980000, description: 'Đóng băng mục tiêu trong 1 lượt.', signatureSkill: { name: 'Hàn Băng Phong Tỏa', type: 'Skill', energyCost: 2, description: 'Đóng băng kẻ địch.' }, equippedItems: {} },
  { id: 'myth_k2', name: 'Suy Nhược Vu Nữ Minh Phủ', role: 'Damage Reducer', position: 'Backline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 150000, maxHp: 150000, currentShield: 20000, atk: 33000, def: 14000, critRate: 0.40, critDamage: 2.1, styleBonus: 300, avatarIcon: '👁️', avatarBg: 'from-purple-950 to-black', archetype: 'CONTROL_WEAKEN', totalCombatPower: 970000, description: 'Giảm 35% sát thương tấn công của Boss.', signatureSkill: { name: 'U Hồn Nguyền Rủa', type: 'Skill', energyCost: 2, description: 'Giảm sát thương kẻ địch.' }, equippedItems: {} },
  { id: 'myth_k3', name: 'Lôi Điện Tỏa Xích Thần Quân', role: 'Stunner', position: 'Frontline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 180000, maxHp: 180000, currentShield: 25000, atk: 32000, def: 17000, critRate: 0.42, critDamage: 2.2, styleBonus: 320, avatarIcon: '⚡', avatarBg: 'from-blue-950 to-black', archetype: 'CONTROL_WEAKEN', totalCombatPower: 990000, description: 'Xích sắt giật điện gây choáng váng.', signatureSkill: { name: 'Lôi Tỏa Thần Lực', type: 'Skill', energyCost: 2, description: 'Choáng váng đối phương.' }, equippedItems: {} },
  { id: 'myth_k4', name: 'Hắc Ám Mê Hồn Cơ Cyber', role: 'Rage Drainer', position: 'Backline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 155000, maxHp: 155000, currentShield: 18000, atk: 35000, def: 13000, critRate: 0.48, critDamage: 2.4, styleBonus: 330, avatarIcon: '🕷️', avatarBg: 'from-indigo-950 to-black', archetype: 'CONTROL_WEAKEN', totalCombatPower: 980000, description: 'Hút 40 nộ khí của đối phương.', signatureSkill: { name: 'Mê Hồn Điện Từ', type: 'Skill', energyCost: 2, description: 'Hút nộ khí kẻ địch.' }, equippedItems: {} },
  { id: 'myth_k5', name: 'Cuồng Phong Trấn Áp Sứ Giả', role: 'Slow Controller', position: 'Midline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 165000, maxHp: 165000, currentShield: 22000, atk: 33000, def: 15000, critRate: 0.42, critDamage: 2.1, styleBonus: 310, avatarIcon: '🌪️', avatarBg: 'from-teal-950 to-black', archetype: 'CONTROL_WEAKEN', totalCombatPower: 960000, description: 'Lốc xoáy làm chậm 50% tốc đánh đối phương.', signatureSkill: { name: 'Cuồng Phong Trảm', type: 'Skill', energyCost: 2, description: 'Làm chậm tốc đánh.' }, equippedItems: {} },
  { id: 'myth_k6', name: 'U Uất Cầm Nữ Khúc Vô Thanh', role: 'Silence Controller', position: 'Backline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 145000, maxHp: 145000, currentShield: 18000, atk: 36000, def: 12000, critRate: 0.50, critDamage: 2.4, styleBonus: 340, avatarIcon: '🎵', avatarBg: 'from-rose-950 to-black', archetype: 'CONTROL_WEAKEN', totalCombatPower: 990000, description: 'Tiếng đàn phong ấn kỹ năng trong 1 lượt.', signatureSkill: { name: 'Đoạn Hồn Cầm Khúc', type: 'Ultimate', energyCost: 3, description: 'Khóa kỹ năng đối thủ.' }, equippedItems: {} },

  // Immortal Mythic (6)
  { id: 'myth_i1', name: 'Phật Quang Bồ Tát Từ Bi', role: 'Team Healer', position: 'Backline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 190000, maxHp: 190000, currentShield: 30000, atk: 28000, def: 18000, critRate: 0.35, critDamage: 1.8, styleBonus: 340, avatarIcon: '🕊️', avatarBg: 'from-amber-950 to-black', archetype: 'IMMORTAL_CLEANSE', totalCombatPower: 1010000, description: 'Hồi phục sinh lực toàn đội và xóa bỏ khống chế.', signatureSkill: { name: 'Phật Quang Phổ Độ', type: 'Ultimate', energyCost: 3, description: 'Hồi 60,000 HP toàn đội.' }, equippedItems: {} },
  { id: 'myth_i2', name: 'Thần Y Biển Thước Truyền Nhân', role: 'Heal & Shield', position: 'Midline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 180000, maxHp: 180000, currentShield: 28000, atk: 29000, def: 17000, critRate: 0.38, critDamage: 1.9, styleBonus: 330, avatarIcon: '🌿', avatarBg: 'from-green-950 to-black', archetype: 'IMMORTAL_CLEANSE', totalCombatPower: 990000, description: 'Châm cứu hồi máu và ban lá chắn sinh mệnh.', signatureSkill: { name: 'Châm Cứu Hoàn Sinh', type: 'Skill', energyCost: 2, description: 'Hồi 35,000 HP và ban khiên 50,000.' }, equippedItems: {} },
  { id: 'myth_i3', name: 'Bạch Y Thánh Nữ Ánh Sáng', role: 'Immunity Ward', position: 'Backline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 175000, maxHp: 175000, currentShield: 25000, atk: 30000, def: 16000, critRate: 0.40, critDamage: 2.0, styleBonus: 350, avatarIcon: '✨', avatarBg: 'from-yellow-950 to-black', archetype: 'IMMORTAL_CLEANSE', totalCombatPower: 1020000, description: 'Ban trạng thái Bất Tử 1 lượt cho tướng máu thấp nhất.', signatureSkill: { name: 'Ánh Sáng Bất Diệt', type: 'Ultimate', energyCost: 3, description: 'Chặn tử vong cho đồng minh.' }, equippedItems: {} },
  { id: 'myth_i4', name: 'Linh Thảo Tiên Cô Trường Xuân', role: 'Cleanse & Regen', position: 'Midline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 185000, maxHp: 185000, currentShield: 28000, atk: 27000, def: 19000, critRate: 0.32, critDamage: 1.8, styleBonus: 320, avatarIcon: '🌸', avatarBg: 'from-emerald-950 to-black', archetype: 'IMMORTAL_CLEANSE', totalCombatPower: 980000, description: 'Hồi phục sinh lực liên tục mỗi lượt.', signatureSkill: { name: 'Linh Thảo Phục Sinh', type: 'Skill', energyCost: 2, description: 'Hồi 15% HP mỗi lượt.' }, equippedItems: {} },
  { id: 'myth_i5', name: 'Hộ Thể Kim Tiên Vô Lượng', role: 'Death Ward Tank', position: 'Frontline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 220000, maxHp: 220000, currentShield: 40000, atk: 26000, def: 23000, critRate: 0.30, critDamage: 1.7, styleBonus: 300, avatarIcon: '⭐', avatarBg: 'from-amber-950 to-black', archetype: 'IMMORTAL_CLEANSE', totalCombatPower: 1000000, description: 'Bất tử khi HP tụt xuống 1 trong 1 lượt.', signatureSkill: { name: 'Bất Hoại Thần Thông', type: 'Defense', energyCost: 0, description: 'Chống chết 1 lần mỗi trận.' }, equippedItems: {} },
  { id: 'myth_i6', name: 'Thanh Tâm Đạo Trưởng Côn Lôn', role: 'All Cleanse', position: 'Backline', rank: 'Mythic', stars: 6, moons: 3, suns: 0, level: 90, maxLevel: 90, currentHp: 170000, maxHp: 170000, currentShield: 25000, atk: 31000, def: 17000, critRate: 0.38, critDamage: 2.0, styleBonus: 330, avatarIcon: '☯️', avatarBg: 'from-blue-950 to-black', archetype: 'IMMORTAL_CLEANSE', totalCombatPower: 990000, description: 'Xóa sạch toàn bộ debuff, độc và suy nhược.', signatureSkill: { name: 'Bát Quái Thanh Khí', type: 'Skill', energyCost: 1, description: 'Thanh tẩy hoàn toàn hiệu ứng xấu.' }, equippedItems: {} }
];
