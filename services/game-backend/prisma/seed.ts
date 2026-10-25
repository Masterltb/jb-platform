import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting JaeBinPlatform Game Database Seeding...');

  // 1. Clean existing records in development
  await prisma.transactionAudit.deleteMany();
  await prisma.equipmentItem.deleteMany();
  await prisma.characterCard.deleteMany();
  await prisma.afkSession.deleteMany();
  await prisma.bossState.deleteMany();
  await prisma.gachaJackpotPool.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Default Player Account
  const passwordHash = await bcrypt.hash('jaebin2026', 10);
  const user = await prisma.user.create({
    data: {
      email: 'player@jaebin.platform',
      username: 'JaeBinMaster',
      passwordHash,
      gold: BigInt(580000),
      diamonds: 2450,
      energy: 5,
      maxEnergy: 5,
      totalCp: BigInt(785200)
    }
  });

  console.log(`✅ Created User: ${user.username} (${user.id})`);

  // 3. Create AFK Session
  await prisma.afkSession.create({
    data: {
      userId: user.id,
      lastClaimedAt: new Date(Date.now() - 3600 * 1000 * 2), // 2 hours ago
      rateGoldPerSec: 35,
      rateExpPerSec: 15,
      rateDiamondChance: 0.05
    }
  });

  // 4. Create 6 Character Cards for the Squad
  const squadTemplates = [
    {
      templateId: 'card_longbida_01',
      name: 'Long Bida',
      role: 'Tanker / Counter Striker',
      position: 'Frontline',
      rank: 'Epic',
      stars: 4,
      ascensionTier: 4,
      moons: 0,
      suns: 0,
      tierRealm: 'Star',
      isActiveSquad: true,
      level: 42,
      currentHp: 18500,
      maxHp: 18500,
      currentShield: 2000,
      atk: 1450,
      def: 2100,
      critRate: 0.12,
      critDamage: 1.5,
      styleBonus: 50,
      avatarIcon: '🎱',
      avatarBg: 'from-blue-900 to-slate-950',
      avatarImage: '/images/characters/avatar_longbida_v2.png',
      signatureSkill: JSON.stringify({
        name: 'Thế Cơ Tam Giác Vàng',
        type: 'Defense',
        energyCost: 1,
        description: 'Dựng cơ bida tạo rào chắn phản chấn 3,500 sát thương cho 2 tướng Tiền Tuyến.'
      })
    },
    {
      templateId: 'card_hungpodo_02',
      name: 'Hùng Pô Độ',
      role: 'Bruiser / Crowd Control',
      position: 'Frontline',
      rank: 'Epic',
      stars: 4,
      ascensionTier: 4,
      moons: 0,
      suns: 0,
      tierRealm: 'Star',
      isActiveSquad: true,
      level: 40,
      currentHp: 16200,
      maxHp: 16200,
      currentShield: 1000,
      atk: 1980,
      def: 1650,
      critRate: 0.18,
      critDamage: 1.6,
      styleBonus: 65,
      avatarIcon: '🏍️',
      avatarBg: 'from-amber-900 to-slate-950',
      avatarImage: '/images/characters/avatar_hungpodo_v2.png',
      signatureSkill: JSON.stringify({
        name: 'Nẹt Pô Lửa Khạc Khói',
        type: 'Skill',
        energyCost: 2,
        description: 'Phóng luồng lửa thiêu rụi giáp Boss, làm choáng 1 lượt và giảm 30% Giáp.'
      })
    },
    {
      templateId: 'card_jaebin_03',
      name: 'JaeBin (6 Thái Dương Tối Cao)',
      role: 'Leader / Sovereign God Burst DPS',
      position: 'Midline',
      rank: 'Sovereign',
      stars: 6,
      moons: 6,
      suns: 6,
      ascensionTier: 18,
      tierRealm: 'Sun',
      isActiveSquad: true,
      level: 99,
      isAwakened: true,
      currentHp: 245000,
      maxHp: 245000,
      currentShield: 50000,
      atk: 42000,
      def: 18500,
      critRate: 0.75,
      critDamage: 3.50,
      styleBonus: 200,
      avatarIcon: '👑',
      avatarBg: 'from-amber-600 via-rose-900 to-black',
      avatarImage: '/images/jaebin_awakened_hero.jpg',
      signatureSkill: JSON.stringify({
        name: 'Thái Dương Sáng Thế • Thiên Địa Vô Song',
        type: 'Ultimate',
        energyCost: 3,
        description: 'Phóng xuất sức mạnh 6 Mặt Trời, xé toạc không gian gây 2,500% Sát thương Chuẩn bỏ qua giáp và khiên của Boss!'
      })
    },
    {
      templateId: 'card_linhneon_04',
      name: 'Linh Neon',
      role: 'Assassin / Crit Carry',
      position: 'Midline',
      rank: 'Rare',
      stars: 3,
      ascensionTier: 3,
      moons: 0,
      suns: 0,
      tierRealm: 'Star',
      isActiveSquad: true,
      level: 36,
      currentHp: 9800,
      maxHp: 9800,
      currentShield: 0,
      atk: 2100,
      def: 720,
      critRate: 0.42,
      critDamage: 2.1,
      styleBonus: 60,
      avatarIcon: '⚡',
      avatarBg: 'from-cyan-900 to-slate-950',
      avatarImage: '/images/characters/avatar_linhneon_v2.png',
      signatureSkill: JSON.stringify({
        name: 'Lưỡi Dao Xoay 360',
        type: 'Skill',
        energyCost: 1,
        description: 'Chém 3 nhát liên hoàn chớp nhoáng, 100% nổ chí mạng nếu Boss đang bị Stun.'
      })
    },
    {
      templateId: 'card_tuancyber_05',
      name: 'Tuấn Cyber',
      role: 'Tactician / Debuffer',
      position: 'Midline',
      rank: 'Epic',
      stars: 4,
      ascensionTier: 4,
      moons: 0,
      suns: 0,
      tierRealm: 'Star',
      isActiveSquad: true,
      level: 40,
      currentHp: 11200,
      maxHp: 11200,
      currentShield: 0,
      atk: 1850,
      def: 950,
      critRate: 0.18,
      critDamage: 1.65,
      styleBonus: 65,
      avatarIcon: '💻',
      avatarBg: 'from-violet-900 to-slate-950',
      avatarImage: '/images/characters/avatar_tuancyber_v2.png',
      signatureSkill: JSON.stringify({
        name: 'Quá Tải Lưới Neon',
        type: 'Skill',
        energyCost: 2,
        description: 'Phóng xung điện hack camera, khiến Boss nhận thêm 35% sát thương trong 2 lượt.'
      })
    },
    {
      templateId: 'card_maidaquang_06',
      name: 'Mai Dạ Quang',
      role: 'Style Amplifier / Healer',
      position: 'Backline',
      rank: 'Legendary',
      stars: 5,
      ascensionTier: 5,
      moons: 0,
      suns: 0,
      tierRealm: 'Star',
      isActiveSquad: true,
      level: 44,
      currentHp: 13500,
      maxHp: 13500,
      currentShield: 0,
      atk: 1650,
      def: 1100,
      critRate: 0.22,
      critDamage: 1.6,
      styleBonus: 95,
      avatarIcon: '✨',
      avatarBg: 'from-pink-900 via-rose-950 to-black',
      avatarImage: '/images/characters/avatar_maidaquang_v2.png',
      signatureSkill: JSON.stringify({
        name: 'Vũ Điệu Hologram',
        type: 'Ultimate',
        energyCost: 2,
        description: 'Hồi 4,000 HP cho cả 6 thẻ bài, hồi 2 Năng Lượng và tăng ngay +250 Điểm Style!'
      })
    }
  ];

  const createdCards = [];
  for (const cardData of squadTemplates) {
    const created = await prisma.characterCard.create({
      data: {
        userId: user.id,
        ...cardData
      }
    });
    createdCards.push(created);
  }
  console.log(`✅ Created ${createdCards.length} Character Cards for squad.`);

  // 5. Seed Equipment Items for User & Equip on Leader (JaeBin)
  const jaebinCard = createdCards.find(c => c.templateId === 'card_jaebin_03')!;

  const equipmentList = [
    // 1-of-1 Sovereign Set items
    {
      userId: user.id,
      characterCardId: jaebinCard.id,
      name: 'Thần Khí Độc Tôn: Hắc Long Thần Cơ Neon',
      slot: 'Weapon',
      rank: 'Sovereign',
      serverLimit: '1_OF_1',
      editionNumber: 1,
      setName: 'Set Hắc Long Thần Cơ (1 of 1 Server)',
      enhanceLevel: 15,
      level: 30,
      maxLevel: 100,
      stats: JSON.stringify({ atk: 3500, critRate: 0.35, critDamage: 0.75, styleBonus: 150 }),
      exclusivePerk: JSON.stringify({
        name: 'Quyền Năng Độc Tôn',
        description: 'Nhát chém bỏ qua 100% Giáp & Miễn nhiễm mọi hiệu ứng bất tử của Boss.'
      }),
      image: '/images/items/item_sovereign_weapon.png',
      colorHex: '#FF007F'
    },
    {
      userId: user.id,
      characterCardId: jaebinCard.id,
      name: 'Bá Long Hắc Y Thần Giáp',
      slot: 'Jacket',
      rank: 'Sovereign',
      serverLimit: '1_OF_1',
      editionNumber: 1,
      setName: 'Set Hắc Long Thần Cơ (1 of 1 Server)',
      enhanceLevel: 15,
      level: 30,
      maxLevel: 100,
      stats: JSON.stringify({ hp: 12000, def: 1200, styleBonus: 100 }),
      exclusivePerk: JSON.stringify({
        name: 'Long Lân Hộ Thể',
        description: 'Khi nhận đòn chí tử, lập tức hồi 50% HP và tạo khiên bất tử.'
      }),
      image: '/images/items/item_sovereign_jacket.png',
      colorHex: '#FF007F'
    },
    {
      userId: user.id,
      characterCardId: jaebinCard.id,
      name: 'Thần Ma Vạn Kiếp Khố',
      slot: 'Pants',
      rank: 'Sovereign',
      serverLimit: '1_OF_1',
      editionNumber: 1,
      setName: 'Set Hắc Long Thần Cơ (1 of 1 Server)',
      enhanceLevel: 15,
      level: 30,
      maxLevel: 100,
      stats: JSON.stringify({ hp: 8500, def: 850, dodgeRate: 0.2 }),
      exclusivePerk: JSON.stringify({
        name: 'Vạn Tà Bất Xâm',
        description: 'Miễn nhiễm 100% hiệu ứng Choáng (Stun) và Đóng băng.'
      }),
      image: '/images/items/item_sovereign_pants.png',
      colorHex: '#FF007F'
    },
    {
      userId: user.id,
      characterCardId: jaebinCard.id,
      name: 'Hư Không Lạc Vân Hài',
      slot: 'Shoes',
      rank: 'Sovereign',
      serverLimit: '1_OF_1',
      editionNumber: 1,
      setName: 'Set Hắc Long Thần Cơ (1 of 1 Server)',
      enhanceLevel: 15,
      level: 30,
      maxLevel: 100,
      stats: JSON.stringify({ speed: 85, dodgeRate: 0.25, styleBonus: 90 }),
      exclusivePerk: JSON.stringify({
        name: 'Bộ Bộ Sinh Liên',
        description: 'Mỗi lần né đòn kích hoạt phản công sấm sét gây 400% ATK.'
      }),
      image: '/images/items/item_sovereign_shoes.png',
      colorHex: '#FF007F'
    },
    {
      userId: user.id,
      characterCardId: jaebinCard.id,
      name: 'Hắc Long Ngọc Bội Thần Cảnh',
      slot: 'Accessory',
      rank: 'Sovereign',
      serverLimit: '1_OF_1',
      editionNumber: 1,
      setName: 'Set Hắc Long Thần Cơ (1 of 1 Server)',
      enhanceLevel: 15,
      level: 30,
      maxLevel: 100,
      stats: JSON.stringify({ critRate: 0.3, critDamage: 0.8, startingEnergy: 3 }),
      exclusivePerk: JSON.stringify({
        name: 'Nộ Khí Vô Song',
        description: 'Vào trận với đầy 100 điểm Nộ Khí, tung Tuyệt Chiêu ngay lượt 1.'
      }),
      image: '/images/items/item_sovereign_accessory.png',
      colorHex: '#FF007F'
    },
    {
      userId: user.id,
      characterCardId: jaebinCard.id,
      name: 'Siêu Xe SH Độ Pô Titan Hắc Long',
      slot: 'Mount',
      rank: 'Sovereign',
      serverLimit: '1_OF_1',
      editionNumber: 1,
      setName: 'Set Hắc Long Thần Cơ (1 of 1 Server)',
      enhanceLevel: 15,
      level: 30,
      maxLevel: 100,
      stats: JSON.stringify({ hp: 15000, speed: 120, styleBonus: 200 }),
      exclusivePerk: JSON.stringify({
        name: 'Pô Độ Sấm Sét 1-of-1',
        description: 'Đầu trận phóng sóng âm làm Boss choáng 2 lượt và giảm 50% Tốc.'
      }),
      image: '/images/items/item_sovereign_mount.png',
      colorHex: '#FF007F'
    },

    // Inventory items (Unassigned)
    {
      userId: user.id,
      characterCardId: null,
      name: 'Gậy Bida Phản Quang Titan',
      slot: 'Weapon',
      rank: 'Legendary',
      level: 15,
      maxLevel: 60,
      stats: JSON.stringify({ atk: 850, critRate: 0.15, styleBonus: 45 }),
      image: '/images/items/item_legendary_weapon.png',
      colorHex: '#F59E0B'
    },
    {
      userId: user.id,
      characterCardId: null,
      name: 'Súng Phun Lửa Bio Đột Biến',
      slot: 'Weapon',
      rank: 'Epic',
      level: 15,
      maxLevel: 50,
      stats: JSON.stringify({ atk: 920, critRate: 0.12, styleBonus: 35 }),
      image: '/images/items/item_bm_flamethrower.png',
      colorHex: '#A855F7'
    },
    {
      userId: user.id,
      characterCardId: null,
      name: 'Rolex Cyber Lộ Máy Vàng 24K',
      slot: 'Accessory',
      rank: 'Legendary',
      level: 20,
      maxLevel: 60,
      stats: JSON.stringify({ critRate: 0.15, critDamage: 0.35, styleBonus: 85 }),
      image: '/images/items/item_bm_gold_rolex.png',
      colorHex: '#F59E0B'
    },
    {
      userId: user.id,
      characterCardId: null,
      name: 'Vali Vàng Thỏi 9999 Ngầm',
      slot: 'Accessory',
      rank: 'Epic',
      level: 15,
      maxLevel: 50,
      stats: JSON.stringify({ hp: 1500, styleBonus: 100 }),
      image: '/images/items/item_bm_gold_bars.png',
      colorHex: '#A855F7'
    },
    {
      userId: user.id,
      characterCardId: null,
      name: 'Cờ Lê Thủy Lực Đột Biến',
      slot: 'Weapon',
      rank: 'Rare',
      level: 12,
      maxLevel: 40,
      stats: JSON.stringify({ atk: 680, breakEfficiency: 0.25 }),
      image: '/images/items/item_bm_wrench.png',
      colorHex: '#3B82F6'
    },
    {
      userId: user.id,
      characterCardId: null,
      name: 'Ống Tuýp Sắt Dạ Quang Phố Đêm',
      slot: 'Weapon',
      rank: 'Rare',
      level: 12,
      maxLevel: 40,
      stats: JSON.stringify({ atk: 450, breakEfficiency: 0.2 }),
      image: '/images/items/item_rare_weapon.png',
      colorHex: '#3B82F6'
    },
    {
      userId: user.id,
      characterCardId: null,
      name: 'Kính Râm LED Phong Cách Cyber',
      slot: 'Accessory',
      rank: 'Rare',
      level: 12,
      maxLevel: 40,
      stats: JSON.stringify({ critRate: 0.08, styleBonus: 35 }),
      image: '/images/items/item_rare_accessory.png',
      colorHex: '#3B82F6'
    },
    {
      userId: user.id,
      characterCardId: null,
      name: 'Dao Găm Xoay Phản Quang',
      slot: 'Weapon',
      rank: 'Fine',
      level: 8,
      maxLevel: 30,
      stats: JSON.stringify({ atk: 240, critRate: 0.05 }),
      image: '/images/items/item_fine_weapon.png',
      colorHex: '#10B981'
    },
    {
      userId: user.id,
      characterCardId: null,
      name: 'Áo Gió Thể Thao Phản Quang',
      slot: 'Jacket',
      rank: 'Fine',
      level: 8,
      maxLevel: 30,
      stats: JSON.stringify({ hp: 850, def: 90 }),
      image: '/images/items/item_fine_jacket.png',
      colorHex: '#10B981'
    },
    {
      userId: user.id,
      characterCardId: null,
      name: 'Gậy Gỗ Tập Luyện Phố Hẻm',
      slot: 'Weapon',
      rank: 'Common',
      level: 5,
      maxLevel: 20,
      stats: JSON.stringify({ atk: 120 }),
      image: '/images/items/item_common_weapon.png',
      colorHex: '#94A3B8'
    },
    {
      userId: user.id,
      characterCardId: null,
      name: 'Quần Jean Rách Bụi Bặm',
      slot: 'Pants',
      rank: 'Common',
      level: 5,
      maxLevel: 20,
      stats: JSON.stringify({ hp: 350, def: 25 }),
      image: '/images/items/item_common_pants.png',
      colorHex: '#94A3B8'
    }
  ];

  for (const itemData of equipmentList) {
    await prisma.equipmentItem.create({ data: itemData });
  }
  console.log(`✅ Seeded ${equipmentList.length} Equipment items.`);

  // 6. Seed 3 World Bosses according to FEAT-007
  const bosses = [
    {
      code: 'tier_5',
      name: 'Boss Sư Đà Vương',
      title: 'Hỏa Sư Cuồng Ma',
      level: 300,
      rebornTier: '5 Chuyển',
      maxHp: 250000,
      currentHp: 250000,
      maxBreak: 4000,
      currentBreak: 4000,
      def: 1200,
      atk: 3500,
      image: '/images/bosses/boss_sudavuong_v2.png',
      drops: JSON.stringify([
        { name: 'Đao Sư Đà Cuồng Nộ', type: 'Vũ Khí', rarity: 'Epic', stars: 2, color: '#a855f7', icon: '🗡️' },
        { name: 'Hộ Giáp Hỏa Sư', type: 'Giáp', rarity: 'Epic', stars: 2, color: '#a855f7', icon: '🥋' }
      ])
    },
    {
      code: 'tier_6',
      name: 'Boss Cửu Linh Thị Xà',
      title: 'Yêu Vương Biển Sâu',
      level: 371,
      rebornTier: '6 Chuyển',
      maxHp: 650000,
      currentHp: 650000,
      maxBreak: 8000,
      currentBreak: 8000,
      def: 2400,
      atk: 5800,
      image: '/images/bosses/boss_cuulinhthixa_v2.png',
      drops: JSON.stringify([
        { name: 'Thần Dược Cửu Linh', type: 'Đan Dược', rarity: 'Sovereign', stars: 3, color: '#ff007f', icon: '💎' },
        { name: 'Thần Kiếm 6 Chuyển', type: 'Vũ Khí', rarity: 'Mythic', stars: 3, color: '#ef4444', icon: '⚔️' },
        { name: 'Thần Giáp 4 Chuyển', type: 'Giáp Thân', rarity: 'Legendary', stars: 3, color: '#f59e0b', icon: '🛡️' }
      ])
    },
    {
      code: 'tier_7',
      name: 'Boss Kim Bằng Quỷ Vương',
      title: 'Bá Chủ Không Gian',
      level: 420,
      rebornTier: '7 Chuyển',
      maxHp: 1500000,
      currentHp: 1500000,
      maxBreak: 15000,
      currentBreak: 15000,
      def: 4500,
      atk: 9200,
      image: '/images/bosses/boss_kimbangquyvuong_v2.png',
      drops: JSON.stringify([
        { name: 'Kim Bằng Cơ Khí Hộ Thân', type: 'Thú Cưỡi', rarity: 'Legendary', stars: 3, color: '#f59e0b', icon: '🦅' },
        { name: 'Cung Thần Ưng Lượng Tử', type: 'Vũ Khí', rarity: 'Legendary', stars: 3, color: '#f59e0b', icon: '🏹' }
      ])
    },
    {
      code: 'tier_8',
      name: 'Tuyết Sơn Yêu Cơ',
      title: 'Nữ Chúa Băng Phong Mẫu Sơn',
      level: 500,
      rebornTier: '8 Chuyển',
      maxHp: 2700000,
      currentHp: 2700000,
      maxBreak: 25000,
      currentBreak: 25000,
      def: 6200,
      atk: 14500,
      image: '/images/bosses/boss_sudavuong_v2.png',
      drops: JSON.stringify([
        { name: 'Vương Miện Tuyết Nữ', type: 'Phụ Kiện', rarity: 'Mythic', stars: 4, color: '#ef4444', icon: '👑' },
        { name: 'Áo Choàng Băng Phong', type: 'Áo', rarity: 'Mythic', stars: 4, color: '#ef4444', icon: '🥋' }
      ])
    },
    {
      code: 'tier_9',
      name: 'Thái Cổ Lôi Thần',
      title: 'Chúa Tể Càn Khôn Vô Cực (Trùm Thế Giới)',
      level: 666,
      rebornTier: '9 Chuyển Tối Thượng',
      maxHp: 6800000,
      currentHp: 6800000,
      maxBreak: 50000,
      currentBreak: 50000,
      def: 9800,
      atk: 28000,
      image: '/images/bosses/boss_kimbangquyvuong_v2.png',
      drops: JSON.stringify([
        { name: 'Hoàng Kim Trảm Long Đao', type: 'Vũ Khí', rarity: 'Sovereign', stars: 5, color: '#ff007f', icon: '⚡' },
        { name: 'Bá Vương Hắc Long Bào', type: 'Giáp Thân', rarity: 'Sovereign', stars: 5, color: '#ff007f', icon: '🐉' }
      ])
    }
  ];

  for (const b of bosses) {
    await prisma.bossState.create({ data: b });
  }
  console.log(`✅ Seeded ${bosses.length} World Bosses.`);

  // 7. Seed Gacha Jackpot Pool
  await prisma.gachaJackpotPool.create({
    data: {
      goldPool: BigInt(15480000),
      diamondPool: 68500
    }
  });
  console.log('✅ Seeded Gacha Jackpot Pool.');

  console.log('✨ All Production Data Seeded Successfully!');
}

main()
  .catch(e => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
