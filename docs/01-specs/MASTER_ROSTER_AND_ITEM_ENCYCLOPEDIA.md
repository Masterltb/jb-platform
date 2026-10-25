# MASTER_ROSTER_AND_ITEM_ENCYCLOPEDIA.md — Đại Từ Điển Nhân Vật, Trang Bị & Hòm Báu Toàn Game

> **Dự án**: JaeBinPlatform (Anhem JaeBin – Ăn Chơi Điệu Nghệ)  
> **Phiên bản**: v1.0.0 Production Ready  
> **Ngày cập nhật**: 2026-10-25  
> **Nguồn sự thật**: [mockGameData.ts](file:///f:/project/repo-github/JaeBinPlatform/apps/web-portal/src/data/mockGameData.ts)  

---

## MỤC LỤC
1. [TỔNG QUAN HỆ THỐNG](#1-tổng-quan-hệ-thống)
2. [DANH SÁCH TẤT CẢ NHÂN VẬT (HERO ROSTER)](#2-danh-sách-tất-cả-nhân-vật-hero-roster)
   - [2.1 Sáu Tướng Chủ Lực Đội Hình](#21-sáu-tướng-chủ-lực-đội-hình)
   - [2.2 Cây Thức Tỉnh Sao (1★ đến 6★ Mythic Awakening)](#22-cây-thức-tỉnh-sao-1-đến-6-mythic-awakening)
   - [2.3 Hệ Thống Duyên Phận Bài Trùng (Synergy Pairs)](#23-hệ-thống-duyên-phận-bài-trùng-synergy-pairs)
   - [2.4 Đội Ngũ Minion & Quái Hộ Vệ](#24-đội-ngũ-minion--quái-hộ-vệ)
3. [DANH SÁCH TẤT CẢ TRANG BỊ (EQUIPMENT ENCYCLOPEDIA)](#3-danh-sách-tất-cả-trang-bị-equipment-encyclopedia)
   - [3.1 Bộ Trang Bị 1 of 1 Server — Set Hắc Long Thần Cơ (Sovereign)](#31-bộ-trang-bị-1-of-1-server--set-hắc-long-thần-cơ-sovereign)
   - [3.2 Bộ Trang Bị 10 of 10 Server — Set Lôi Thần Cyber (Mythic)](#32-bộ-trang-bị-10-of-10-server--set-lôi-thần-cyber-mythic)
   - [3.3 Trang Bị Bậc Huyền Thoại — Legendary](#33-trang-bị-bậc-huyền-thoại--legendary)
   - [3.4 Trang Bị Bậc Sử Thi — Epic](#34-trang-bị-bậc-sử-thi--epic)
   - [3.5 Trang Bị Bậc Hiếm — Rare](#35-trang-bị-bậc-hiếm--rare)
   - [3.6 Trang Bị Bậc Tinh Tuyển — Fine](#36-trang-bị-bậc-tinh-tuyển--fine)
   - [3.7 Trang Bị Bậc Phổ Thông — Common](#37-trang-bị-bậc-phổ-thông--common)
4. [DANH SÁCH 5 HÒM GACHA SĂN ĐỒ & QUỸ JACKPOT](#4-danh-sách-5-hòm-gacha-săn-đồ--quỹ-jackpot)
5. [DANH SÁCH THẺ BÀI CHIẾN THUẬT (ACTION DECK)](#5-danh-sách-thẻ-bài-chiến-thuật-action-deck)

---

## 1. TỔNG QUAN HỆ THỐNG

### 1.1 Nguyên Tắc Trình Diễn Đồ Họa 2026 (Pure Artwork Architecture)
- **Tách Biệt Triệt Để**: Toàn bộ file ảnh nhân vật, vật phẩm và hòm báu là **Pure Artwork** (chỉ chứa hình ảnh vật thể và nhân vật trên nền không gian ánh sáng phong cách Cyberpunk, tuyệt đối không in sẵn số sao, chữ Rank hay khung viền thẻ).
- **Web UI Render**: Cấp sao (★), số sê-ri phiên bản (`#01/01`, `#03/10`), cấp cường hóa (+1 đến +20), và viền hào quang động (`.aura-sovereign`, `.aura-mythic`...) được thực hiện bằng mã CSS/React thời gian thực.

---

## 2. DANH SÁCH TẤT CẢ NHÂN VẬT (HERO ROSTER)

### 2.1 Sáu Tướng Chủ Lực Đội Hình

#### 1. JaeBin (Thức Tỉnh 6★) — Đại Ca Phố Sấm
- **ID Thẻ Bài**: `card_jaebin_03`
- **Vai trò**: Leader / Burst DPS (Thủ Lĩnh / Sát Thương Chủ Lực)
- **Vị trí trận hình**: Midline (Hàng Giữa)
- **Cấp phẩm**: Mythic (6★ Thức Tỉnh Thần Thoại)
- **Chỉ số chiến đấu**:
  - HP: 24,500 / 24,500 | ATK: 4,200 | DEF: 1,850
  - Tỉ lệ Chí Mạng (Crit Rate): 28% | Sát Thương Chí Mạng: 185%
  - Điểm Phong Cách (Style Bonus): +75 | Tổng Lực Chiến (CP): **168,500**
- **Tuyệt Kỹ Độc Quyền**:
  - *Tên chiêu*: **Bá Chủ Màn Đêm (Hắc Long Phá Thiên)**
  - *Tiêu hao*: 3 Năng lượng
  - *Hiệu ứng*: Triệu hồi siêu xe Hắc Long SH lướt nát bàn cờ, gây 1,200% ATK, làm chậm thời gian và kích hoạt Cinematic Shortclip độc quyền.
- **Tài nguyên ảnh**: `/images/jaebin_awakened_hero.jpg`

---

#### 2. Long Bida — Thần Cơ Cơ Bắp
- **ID Thẻ Bài**: `card_longbida_01`
- **Vai trò**: Vanguard / Main Tank (Tiên Phong / Chống Chịu Chính)
- **Vị trí trận hình**: Frontline (Hàng Trước)
- **Cấp phẩm**: Epic
- **Chỉ số chiến đấu**:
  - HP: 16,800 / 16,800 | ATK: 1,450 | DEF: 1,520
  - Tỉ lệ Chí Mạng: 12% | Sát Thương Chí Mạng: 150%
  - Style Bonus: +40 | Tổng Lực Chiến (CP): **112,400**
- **Kỹ năng chủ chốt**:
  - *Tên chiêu*: **Thế Đỡ Cơ Titan** (Loại: Phòng Ngự)
  - *Tiêu hao*: 1 Năng lượng
  - *Hiệu ứng*: Dựng gậy bida trợ lực tạo lớp khiên 3,000 HP bảo vệ toàn bộ tiền tuyến, phản đòn 30% sát thương nhận vào.
- **Tài nguyên đại diện**: Icon 🛡️, Nền gradient tím than sang trọng.

---

#### 3. Hùng Pô Độ — Quái Xế Đường Phố
- **ID Thẻ Bài**: `card_hungpodo_02`
- **Vai trò**: Vanguard / Stunner (Tiên Phong / Khống Chế & Phá Giáp)
- **Vị trí trận hình**: Frontline (Hàng Trước)
- **Cấp phẩm**: Rare
- **Chỉ số chiến đấu**:
  - HP: 14,200 / 14,200 | ATK: 1,250 | DEF: 1,180
  - Tỉ lệ Chí Mạng: 14% | Sát Thương Chí Mạng: 150%
  - Style Bonus: +45 | Tổng Lực Chiến (CP): **92,800**
- **Kỹ năng chủ chốt**:
  - *Tên chiêu*: **Cú Bốc Đầu Titan** (Loại: Kỹ Năng)
  - *Tiêu hao*: 2 Năng lượng
  - *Hiệu ứng*: Nẹt pô xe rít ga lao tới, làm choáng Boss 1 lượt và đánh sập trực tiếp 450 Giáp Break.
- **Tài nguyên đại diện**: Icon 🏍️, Nền gradient xanh dương bóng đêm.

---

#### 4. Linh Neon — Sát Thủ Cơ Khí Ánh Sáng
- **ID Thẻ Bài**: `card_linhneon_04`
- **Vai trò**: Assassin / Crit Carry (Sát Thủ Bạo Kích Đơn Mục Tiêu)
- **Vị trí trận hình**: Midline (Hàng Giữa)
- **Cấp phẩm**: Rare
- **Chỉ số chiến đấu**:
  - HP: 9,800 / 9,800 | ATK: 2,100 | DEF: 720
  - Tỉ lệ Chí Mạng: **42%** | Sát Thương Chí Mạng: **210%**
  - Style Bonus: +60 | Tổng Lực Chiến (CP): **96,400**
- **Kỹ năng chủ chốt**:
  - *Tên chiêu*: **Lưỡi Dao Xoay 360** (Loại: Kỹ Năng)
  - *Tiêu hao*: 1 Năng lượng
  - *Hiệu ứng*: Chém 3 nhát liên hoàn chớp nhoáng, đảm bảo 100% nổ chí mạng nếu Boss đang trong trạng thái Choáng (Stun).
- **Tài nguyên đại diện**: Icon ⚡, Nền gradient xanh cyan điện quang.

---

#### 5. Tuấn Cyber — Thợ Săn Không Gian & Dữ Liệu
- **ID Thẻ Bài**: `card_tuancyber_05`
- **Vai trò**: Tactician / Debuffer (Chiến Thuật Gia / Phá Giáp Tầm Xa)
- **Vị trí trận hình**: Midline (Hàng Giữa)
- **Cấp phẩm**: Epic
- **Chỉ số chiến đấu**:
  - HP: 11,200 / 11,200 | ATK: 1,850 | DEF: 950
  - Tỉ lệ Chí Mạng: 18% | Sát Thương Chí Mạng: 165%
  - Style Bonus: +65 | Tổng Lực Chiến (CP): **108,900**
- **Kỹ năng chủ chốt**:
  - *Tên chiêu*: **Quá Tải Lưới Neon** (Loại: Kỹ Năng)
  - *Tiêu hao*: 2 Năng lượng
  - *Hiệu ứng*: Phóng xung điện EMP hack thiết bị, khiến Boss nhận thêm 35% sát thương từ toàn đội trong 2 lượt tiếp theo.
- **Tài nguyên đại diện**: Icon 💻, Nền gradient tím violet công nghệ.

---

#### 6. Mai Dạ Quang — Nguồn Bơm Sinh Lực & Nhịp Điệu
- **ID Thẻ Bài**: `card_maidaquang_06`
- **Vai trò**: Style Amplifier / Healer (Trị Liệu & Hồi Phục Năng Lượng)
- **Vị trí trận hình**: Backline (Hàng Sau)
- **Cấp phẩm**: Legendary
- **Chỉ số chiến đấu**:
  - HP: 13,500 / 13,500 | ATK: 1,650 | DEF: 1,100
  - Tỉ lệ Chí Mạng: 22% | Sát Thương Chí Mạng: 160%
  - Style Bonus: **+95** | Tổng Lực Chiến (CP): **148,500**
- **Tuyệt Kỹ Độc Quyền**:
  - *Tên chiêu*: **Vũ Điệu Hologram** (Loại: Ultimate)
  - *Tiêu hao*: 2 Năng lượng
  - *Hiệu ứng*: Hồi phục 4,000 HP cho cả 6 thẻ bài, hồi ngay 2 Năng Lượng tác chiến và tăng vọt +250 Điểm Style Rank.
- **Tài nguyên đại diện**: Icon ✨, Nền gradient hồng dạ quang.

---

### 2.2 Cây Thức Tỉnh Sao (1★ đến 6★ Mythic Awakening)

Mỗi nhân vật khi thăng cấp sao trong tab **Túi Đồ & Rèn / Tiến Hóa Tướng** sẽ kích hoạt chỉ số và hiệu ứng mới:
- **1★ (Tân Binh)**: Mở khóa Kỹ năng thường, chỉ số cơ bản 100%.
- **2★ (Đột Phá)**: Tăng 20% HP, 15% ATK, mở khóa Kỹ năng bị động 1.
- **3★ (Chiến Binh)**: Tăng 35% HP, 30% ATK, Kỹ năng chủ động tăng cấp Lv 2.
- **4★ (Thủ Lĩnh)**: Tăng 55% HP, 50% ATK, mở Hào Quang Đồng Minh (+10% chỉ số toàn đội).
- **5★ (Huyền Thoại)**: Tăng 80% HP, 75% ATK, mở Kỹ năng thức tỉnh 2.
- **6★ (Thần Thoại Thức Tỉnh - Mythic Awakening)**:
  - Tăng 120% HP, 110% ATK.
  - Chuyển đổi phẩm chất thẻ bài thành **Mythic**.
  - **Mở khóa Cinematic Shortclip Cutscene Fullscreen** khi xuất chiêu.

---

### 2.3 Hệ Thống Duyên Phận Bài Trùng (Synergy Pairs)

Khi bố trí các cặp nhân vật trùng duyên vào đội hình 6 người:

| Tên Duyên Phận | Nhân Vật Ghép Cặp | Hiệu Ứng Kích Hoạt |
| :--- | :--- | :--- |
| **Song Sát Phố Đi Bộ** | Long Bida + Hùng Pô Độ | Giảm 20% sát thương nhận vào cho hàng trước; đòn phản công gây choáng 1 lượt. |
| **Bá Chủ & Trí Tuệ** | JaeBin + Tuấn Cyber | Tăng 25% Sát thương bạo kích của JaeBin; mỗi lần bẻ khóa giáp hồi 1 Năng Lượng. |
| **Ánh Sáng & Nhịp Điệu** | Linh Neon + Mai Dạ Quang | Tăng 30 Tốc độ tấn công; đòn chí mạng hồi phục 5% HP cho thẻ bài thấp máu nhất. |
| **ANHEM JAEBIN TỀ TỰU** | Đầy đủ cả 6 nhân vật | Kích hoạt chiêu thức liên kích **SSS All-Out Attack** (+80,000 CP, quét sạch 50% máu quái). |

---

### 2.4 Đội Ngũ Minion & Quái Hộ Vệ (Boss Minions)
Trong các trận chiến săn Boss, bên cạnh Boss chính luôn có 4 quái phụ trợ:
1. `minion_1`: **Ninja Phố 01** — HP 8,500, kỹ năng che chắn đòn đánh tầm xa cho Boss.
2. `minion_2`: **Ninja Phố 02** — HP 8,500, phóng phi tiêu gây độc rút máu hàng trước.
3. `minion_3`: **Thủy Quái Tinh** — HP 12,000, kỹ năng bơm giáp ảo cho Boss.
4. `minion_4`: **Hỏa Ma Tinh** — HP 12,000, kỹ năng thiêu đốt gây nổ diện rộng khi bị hạ gục.

---

## 3. DANH SÁCH TẤT CẢ TRANG BỊ (EQUIPMENT ENCYCLOPEDIA)

### 3.1 Bộ Trang Bị 1 of 1 Server — Set Hắc Long Thần Cơ (Sovereign)
*Duy nhất 1 bộ hoàn chỉnh trên toàn server. Hiệu ứng viền hào quang hồng đen lôi điện xoay tròn.*

```
[Vũ Khí] Hắc Long Thần Trảm ────── [Áo] Bá Long Hắc Y Thần Giáp
      │                                   │
[Quần] Thần Ma Vạn Kiếp Khố ────── [Giày] Hư Không Lạc Vân Hài
      │                                   │
[Phụ Kiện] Hắc Long Ngọc Bội ──── [Tọa Kỵ] Siêu Chiến Xa Hắc Long Cơ
```

1. **[Vũ Khí] Thần Khí Độc Tôn: Hắc Long Thần Cơ Neon**
   - *ID*: `wpn_haclong_sovereign_01` | *Vị trí*: Weapon | *Phẩm*: Sovereign (1 of 1)
   - *Chỉ số*: ATK +3,500, Crit Rate +35%, Crit Damage +75%, Style Bonus +150
   - *Perk*: **Quyền Năng Độc Tôn**: Đòn đánh bỏ qua 100% Giáp & Miễn nhiễm mọi hiệu ứng bất tử của Boss.
   - *Ảnh PNG*: `/images/sovereign_unique_weapon.jpg`
2. **[Áo] Bá Long Hắc Y Thần Giáp**
   - *ID*: `jkt_haclong_sovereign_01` | *Vị trí*: Jacket | *Phẩm*: Sovereign (1 of 1)
   - *Chỉ số*: HP +12,000, DEF +1,200, Style Bonus +100
   - *Perk*: **Long Lân Hộ Thể**: Khi nhận đòn chí tử, lập tức hồi 50% HP và tạo khiên bất tử trong 2 lượt.
   - *Ảnh PNG*: `/images/items/item_sovereign_jacket.png`
3. **[Quần] Thần Ma Vạn Kiếp Khố**
   - *ID*: `pnt_haclong_sovereign_01` | *Vị trí*: Pants | *Phẩm*: Sovereign (1 of 1)
   - *Chỉ số*: HP +8,500, DEF +850, Dodge Rate +20%
   - *Perk*: **Vạn Tà Bất Xâm**: Miễn nhiễm 100% hiệu ứng Choáng, Đóng băng và Thiêu đốt.
   - *Ảnh PNG*: `/images/items/item_sovereign_pants.png`
4. **[Giày] Hư Không Lạc Vân Hài**
   - *ID*: `shs_haclong_sovereign_01` | *Vị trí*: Shoes | *Phẩm*: Sovereign (1 of 1)
   - *Chỉ số*: Speed +85, Dodge Rate +25%, Style Bonus +90
   - *Perk*: **Bộ Bộ Sinh Liên**: Mỗi lần né đòn thành công phóng sấm sét phản công 400% ATK.
   - *Ảnh PNG*: `/images/items/item_sovereign_shoes.png`
5. **[Phụ Kiện] Hắc Long Ngọc Bội Thần Cảnh**
   - *ID*: `acc_haclong_sovereign_01` | *Vị trí*: Accessory | *Phẩm*: Sovereign (1 of 1)
   - *Chỉ số*: Crit Rate +30%, Crit Damage +80%, Năng lượng xuất phát +3
   - *Perk*: **Nộ Khí Vô Song**: Khởi đầu trận đấu với đầy 100 điểm Nộ Khí, cho phép tung Tuyệt Chiêu ngay lượt 1.
   - *Ảnh PNG*: `/images/items/item_sovereign_accessory.png`
6. **[Tọa Kỵ] Siêu Chiến Xa Hắc Long Cơ**
   - *ID*: `mnt_haclong_sovereign_01` | *Vị trí*: Mount | *Phẩm*: Sovereign (1 of 1)
   - *Chỉ số*: HP +15,000, DEF +950, Speed +100, Style Bonus +200
   - *Perk*: **Long Uy Trấn Phố**: Đầu trận làm giảm 40% ATK và 50% Giáp của toàn bộ quân địch trong 3 lượt.
   - *Ảnh PNG*: `/images/items/item_sovereign_mount.png`

- **Hiệu Ứng Bộ Full 6 Món**:
  - *2 Món*: ATK +25%, Crit Rate +15%.
  - *4 Món*: Khiên chắn Hắc Long tương đương 40% HP tối đa.
  - *6 Món*: **Cắt đứt ngay 25% Máu Tối Đa của Boss khi vào trận** + Áp dấu ấn sát thương chuẩn +15%.

---

### 3.2 Bộ Trang Bị 10 of 10 Server — Set Lôi Thần Cyber (Mythic)
*Giới hạn đúng 10 bộ trên toàn server, đánh số định danh `#01/10` đến `#10/10`.*

1. **[Vũ Khí] Thần Kiếm Neon Phân Tách Không Gian**
   - *ID*: `wpn_katana_neon_mythic_01` | *Phẩm*: Mythic (10 of 10)
   - *Chỉ số*: ATK +1,800, Crit Rate +25%, Crit Damage +45%, Style Bonus +80
   - *Perk*: **Nhát Chém Không Gian**: Bỏ qua 100% Giáp và tấn công 2 lần mỗi lượt.
   - *Ảnh PNG*: `/images/items/item_mythic_weapon.png`
2. **[Áo] Giáp Điện Tử Lôi Thần**
   - *ID*: `jkt_katana_neon_mythic_01` | *Phẩm*: Mythic (10 of 10)
   - *Chỉ số*: HP +6,500, DEF +550, Style Bonus +60
   - *Ảnh PNG*: `/images/items/item_mythic_jacket.png`
3. **[Tọa Kỵ] Chiến Mã Phản Trọng Lực Cyberpunk**
   - *ID*: `mnt_hoverbike_cyber_mythic_01` | *Phẩm*: Mythic (10 of 10)
   - *Chỉ số*: HP +4,500, DEF +400, Năng lượng xuất phát +2, Style Bonus +100
   - *Perk*: **Quá Tải Lượng Tử**: Vào trận với Style Rank S ngay lập tức.
   - *Ảnh PNG*: `/images/items/item_mythic_mount.png`

- **Hiệu Ứng Bộ Full Set Lôi Thần**:
  - *2 Món*: ATK +15%, Tốc độ +15.
  - *4 Món*: Sấm sét phản kích 180% sát thương nảy 3 mục tiêu.
  - *6 Món*: Trạng thái **Quá Tải Lôi Điện (Overdrive)**: Tăng 30% Sát thương kỹ năng và miễn nhiễm hoàn toàn Đóng Băng / Chậm.

---

### 3.3 Trang Bị Bậc Huyền Thoại — Legendary
1. **[Vũ Khí] Gậy Bida Phản Quang Titan**
   - *ID*: `wpn_bida_titan_legendary_01` | *Phẩm*: Legendary | *Max Level*: 60
   - *Chỉ số*: ATK +850, Crit Rate +15%, Style Bonus +45
   - *Perk*: **Cơ Thủ Phố Đi Bộ**: Mỗi cú đánh thứ 3 tạo bi neon nảy sát thương 200%.
   - *Ảnh PNG*: `/images/items/item_legendary_weapon.png`
2. **[Tọa Kỵ] Siêu Xe SH Độ Pô Titan**
   - *ID*: `mnt_sh_titan_legendary_01` | *Phẩm*: Legendary | *Max Level*: 60
   - *Chỉ số*: HP +2,800, DEF +220, Năng lượng xuất phát +1, Style Bonus +60
   - *Perk*: **Nẹt Pô Chấn Động**: Đầu trận làm choáng Boss 1 lượt.
   - *Ảnh PNG*: `/images/items/item_legendary_mount.png`

---

### 3.4 Trang Bị Bậc Sử Thi — Epic
1. **[Áo] Áo Khoác Bomber Neon Phố Đêm**
   - *ID*: `jkt_bomber_cyber_epic_01` | *Phẩm*: Epic | *Chỉ số*: HP +2,200, DEF +180
   - *Ảnh PNG*: `/images/items/item_epic_jacket.png`
2. **[Giày] Sneaker Dạ Quang Đế Khí**
   - *ID*: `shs_sneaker_glow_epic_01` | *Phẩm*: Epic | *Chỉ số*: HP +1,100, Dodge Rate +15%, Speed +25
   - *Ảnh PNG*: `/images/items/item_epic_shoes.png`

---

### 3.5 Trang Bị Bậc Hiếm — Rare
1. **[Vũ Khí] Ống Tuýp Sắt Dạ Quang**
   - *ID*: `wpn_tuyp_neon_rare_01` | *Chỉ số*: ATK +420, Crit Rate +8%, Style Bonus +20
   - *Ảnh PNG*: `/images/items/item_rare_weapon.png`
2. **[Quần] Quần Thụng Cargo Túi Hộp**
   - *ID*: `pnt_cargo_street_rare_01` | *Chỉ số*: HP +1,400, DEF +110
   - *Ảnh PNG*: `/images/items/item_rare_pants.png`
3. **[Phụ Kiện] Kính Râm LED Phong Cách**
   - *ID*: `acc_led_glasses_rare_01` | *Chỉ số*: Crit Damage +20%, Style Bonus +25
   - *Ảnh PNG*: `/images/items/item_rare_glasses.png`
4. **[Tọa Kỵ] Xe Cào Cào Biểu Diễn**
   - *ID*: `mnt_caocao_stunt_rare_01` | *Chỉ số*: HP +1,600, DEF +95, Style Bonus +30
   - *Ảnh PNG*: `/images/items/item_rare_mount.png`

---

### 3.6 Trang Bị Bậc Tinh Tuyển — Fine
1. **[Vũ Khí] Dao Găm Xoay Phản Quang** (`wpn_dao_neon_fine_01`): ATK +220, Crit Rate +5% | Ảnh: `/images/items/item_fine_weapon.png`
2. **[Áo] Áo Gió Phản Quang Thể Thao** (`jkt_windbreaker_fine_01`): HP +850, DEF +65 | Ảnh: `/images/items/item_fine_jacket.png`
3. **[Giày] Giày Vải Bạt Dạo Phố** (`shs_sneaker_classic_fine_01`): HP +550, Dodge Rate +6% | Ảnh: `/images/items/item_fine_shoes.png`
4. **[Phụ Kiện] Dây Chuyền Bạc Đường Phố** (`acc_chain_gold_fine_01`): Style Bonus +15 | Ảnh: `/images/items/item_fine_accessory.png`
5. **[Tọa Kỵ] Xe Tay Ga Đèn LED** (`mnt_scooter_cyber_fine_01`): HP +900, DEF +50 | Ảnh: `/images/items/item_fine_mount.png`

---

### 3.7 Trang Bị Bậc Phổ Thông — Common
1. **[Vũ Khí] Gạch Ống Xây Dựng / Gậy Gỗ** (`wpn_wood_bat_common_01`): ATK +90 | Ảnh: `/images/items/item_common_weapon.png`
2. **[Áo] Áo Ba Lỗ Đường Phố** (`jkt_balodp_common_01`): HP +350, DEF +25 | Ảnh: `/images/items/item_common_jacket.png`
3. **[Quần] Quần Jean Đen Bụi Phố** (`pnt_jean_street_common_01`): HP +400, DEF +30 | Ảnh: `/images/items/item_common_pants.png`
4. **[Giày] Dép Tổ Ong Huyền Thoại** (`shs_toong_common_01`): Speed +10, Dodge +4% | Ảnh: `/images/items/item_common_shoes.png`
5. **[Phụ Kiện] Khẩu Trang Đen Đường Phố / Bật Lửa Khò** (`acc_mask_ninja_common_01`): DEF +15 | Ảnh: `/images/items/item_common_accessory.png`
6. **[Tọa Kỵ] Xe Đạp Phượng Hoàng Cổ** (`mnt_xedap_common_01`): HP +300, Speed +15 | Ảnh: `/images/items/item_common_mount.png`

---

## 4. DANH SÁCH 5 HÒM GACHA SĂN ĐỒ & QUỸ JACKPOT

| Tên Hòm Báu | Chi Phí Mở | Dải Rớt Đồ | Cơ Hội Nổ Jackpot | Tài Nguyên Ảnh 3D |
| :--- | :--- | :--- | :--- | :--- |
| **Hòm Đồng Đường Phố** | 50,000 🪙 Vàng | Common ~ Rare | 0.001% (Tân thủ) | [`chest_bronze.png`](file:///f:/project/repo-github/JaeBinPlatform/apps/web-portal/public/images/chests/chest_bronze.png) |
| **Hòm Bạc Dạ Quang** | 150 💎 Kim Cương | Rare ~ Epic | 0.01% (Nhận 10% Quỹ) | [`chest_silver.png`](file:///f:/project/repo-github/JaeBinPlatform/apps/web-portal/public/images/chests/chest_silver.png) |
| **Rương Vàng Cơ Thủ** | 500 💎 Kim Cương | Epic ~ Legendary | 0.05% (Nhận 25% Quỹ) | [`chest_gold.png`](file:///f:/project/repo-github/JaeBinPlatform/apps/web-portal/public/images/chests/chest_gold.png) |
| **Hòm Lôi Thần Lượng Tử** | 1,200 💎 Kim Cương | Legendary ~ Mythic | 0.15% (Cơ hội Set 10-of-10) | [`chest_mythic.png`](file:///f:/project/repo-github/JaeBinPlatform/apps/web-portal/public/images/chests/chest_mythic.png) |
| **Bảo Hạp Hắc Long Độc Tôn** | 3,000 💎 Kim Cương | Mythic ~ Sovereign | **0.35% (100% NỔ HŨ TOÀN SERVER)** | [`chest_sovereign.png`](file:///f:/project/repo-github/JaeBinPlatform/apps/web-portal/public/images/chests/chest_sovereign.png) |

---

## 5. DANH SÁCH THẺ BÀI CHIẾN THUẬT (ACTION DECK)

Trong chế độ chiến đấu thẻ bài thủ công hoặc phối hợp cùng auto:
1. **[Tấn Công] Đấm Móc Cơ Khí**: Tiêu hao 1 Năng lượng, gây 1,800 sát thương + 120 Break damage.
2. **[Kỹ Năng] Phá Giáp Đột Kích**: Tiêu hao 2 Năng lượng, giảm 40% giáp của Boss trong 2 hiệp.
3. **[Phòng Ngự] Khiên Chắn Hợp Kim**: Tiêu hao 1 Năng lượng, tạo lớp khiên 2,500 HP cho toàn bộ hàng trước.
4. **[Hỗ Trợ] Tiếp Tế Năng Lượng**: Tiêu hao 0 Năng lượng, hồi phục 2 Năng lượng và rút thêm 2 thẻ bài.
5. **[Tuyệt Kỹ] Lôi Long Phá Giới (JaeBin)**: Tiêu hao 3 Năng lượng, kích hoạt hoạt cảnh chém vỡ màn hình gây sát thương diện rộng cực đại.

---

## 6. BỔ SUNG TƯỚNG MỞ RỘNG CHIẾN DỊCH 2026 (EXPANSION HEROES)

### 6.1 JaeBin — Chúa Tể Lôi Đình (Sovereign 6★ Tối Thượng)
- **ID**: `card_jaebin_sovereign_01`
- **Vai trò**: Burst Assassin / Void Breaker (Sát Thủ Hư Không)
- **Chỉ số căn bản**: HP: 38,000 | ATK: 7,500 | DEF: 2,800 | Crit Rate: 45% | Crit DMG: 250% | CP: **285,000**
- **Tuyệt Kỹ**: *Cửu Thiên Lôi Giới (Vạn Lôi Quy Tông)* — Phá tan 100% khiên giáp Boss, gây 120,000 sát thương chuẩn và làm choáng 3 hiệp.

### 6.2 Hồng Tuyết Cơ — Băng Phong Ma Nữ (Mythic 5★)
- **ID**: `card_hongtuyet_mythic_02`
- **Vai trò**: Crowd Control / Freeze Buffer (Phù Thủy Khống Chế Tuyết)
- **Chỉ số căn bản**: HP: 26,000 | ATK: 3,800 | DEF: 2,100 | CP: **195,000**
- **Tuyệt Kỹ**: *Hàn Băng Thần Chưởng* — Đóng băng vĩnh cửu toàn bộ quái phụ và giảm 60% tốc đánh của Trùm Thế Giới.

### 6.3 Quang Thần Tướng — Hộ Quốc Kim Cang (Legendary 5★)
- **ID**: `card_quangthan_legendary_03`
- **Vai trò**: Super Fortress Tanker (Hộ Pháp Kim Cang)
- **Chỉ số căn bản**: HP: 35,000 | ATK: 2,200 | DEF: 3,400 | CP: **178,000**
- **Kỹ năng**: *Kim Cang Bất Hoại Thể* — Tăng 80% DEF, giảm 50% sát thương nhận vào cho toàn đội.

---

## 7. BỔ SUNG CÁC BỘ TRANG BỊ MỞ RỘNG (EXPANSION EQUIPMENT SETS)

### 7.1 Bộ Vô Song Bá Vương (Sovereign 1-of-1)
- `wpn_sovereign_vosong_01`: **Hoàng Kim Trảm Long Đao** (ATK +12,800, Crit +25%)
- `jkt_sovereign_vosong_01`: **Bá Vương Hắc Long Bào** (HP +65,000, DEF +3,500)
- `acc_sovereign_vosong_01`: **Huyết Ngọc Tối Thượng** (Hồi phục 5% HP mỗi hiệp, CP +95,000)
- **Hiệu ứng Set**: Bất tử trong 5 giây khi nhận đòn chí tử, phản đòn 100% sát thương.

### 7.2 Bộ Cyber Neon Void (Mythic 6 Món)
- `wpn_mythic_void_01`: **Phản Vật Chất Lôi Thần Kiếm** (ATK +7,500)
- `acc_mythic_void_01`: **Vòng Cổ Hư Không Cyber** (Bỏ qua 30% DEF Boss)
- `mnt_mythic_void_01`: **Chiến Xa Lượng Tử Siêu Thanh** (Tốc đánh x1.5, CP +65,000)
- **Hiệu ứng Set**: Kích nổ hạt lôi điện gây sát thương diện rộng liên tục mỗi 3 giây.

