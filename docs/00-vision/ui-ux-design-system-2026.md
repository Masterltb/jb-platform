# Hệ Thống Thiết Kế UI/UX 2026: Acid Cyber & Street Neo-Brutalism

> **Dự án**: Anhem JaeBin – Ăn Chơi Điệu Nghệ  
> **Định vị thẩm mỹ**: Gen Z, Phố đêm Cyberpunk, Đậm chất đường phố, Táo bạo (Neo-Brutalism) & Trực quan Bento Grid 2026.  
> **Cốt lõi**: Đội hình chiến thuật **6 Thẻ Bài Nhân Vật** săn Boss thế giới, trang bị phân cấp theo Rank.

---

## 🎨 1. Triết Lý Thiết Kế: "Acid Cyber & Street Neo-Brutalism"

Khác biệt hoàn toàn với các web game phẳng đơn điệu hay giao diện kiếm hiệp cổ trang cũ kỹ, UI/UX của **Anhem JaeBin** ứng dụng xu hướng thiết kế giao diện game hàng đầu năm 2026:

1. **Neo-Brutalism x Cyberpunk (Đường Phố Nổi Loạn & Công Nghệ Cao)**:
   - Đường viền đen/neon dứt khoát ($2\text{px} - 3\text{px}$ solid borders).
   - Đổ bóng cứng (Hard offset drop shadow $4\text{px} - 6\text{px}$ không làm mờ - Zero blur), tạo cảm giác các khối linh kiện phần cứng hoặc các tấm thẻ bài vật lý cầm được trên tay.
   - Nhãn dán sticker phong cách đường phố (Graffiti decals, băng keo phản quang, tem niêm phong holographic, badge huy hiệu).

2. **Bento Grid Architecture 2026 (Tổ Chức Không Gian Module Khoa Học)**:
   - Sử dụng bố cục Bento Grid bất đối xứng chia nhỏ thông tin thành các ô module thông minh.
   - Giúp người chơi Gen Z nắm bắt nhanh chỉ số đội hình 6 thẻ, trạng thái Boss và thanh Style trong chưa đầy $3$ giây mà không bị rối mắt (Zero Cognitive Overload).

3. **Hyper-Tactile & Spatial 3D Feel (Cảm Giác Xúc Giác & Chiều Sâu 3D)**:
   - Thẻ bài nghiêng 3D theo con trỏ chuột hoặc góc nghiêng điện thoại (Gyro / Cursor 3D Parallax Tilt).
   - Hiệu ứng ánh kim đổi màu quang học (**Holographic Rainbow Foil Shine**) chuyển động trên bề mặt thẻ bài Rank **Legendary** và **Mythic**.
   - Cảm giác tương tác nặng tay (Weighty feedback): Kéo thẻ có quán tính, thả thẻ gây chấn động nổ vệt sáng neon, rung màn hình (Screen shake) và dập bass đanh thép.

---

## 🌈 2. Bảng Màu Chuẩn (Color Palette & Tokens 2026)

### 2.1. Màu Nền & Chiều Sâu (Surface & Background)
Giao diện Dark Mode sâu thẳm giúp các chi tiết Neon rực sáng nổi bật:
- **Midnight Obsidian (Nền chính)**: `#0A0D14`
- **Dark Slate / Street Asphalt (Nền card module)**: `#121622`
- **Elevated Cyber Surface (Bề mặt thẻ)**: `#1A2030`
- **Border Stark (Viền Neo-brutalist)**: `#2A324B` (hoặc Solid `#000000`)

### 2.2. Bảng Màu Điểm Nhấn Acid Neon (Gen Z Neon Accents)
- **Hyper Cyan (Hacker/Năng lượng)**: `#00F0FF` (`hsl(184, 100%, 50%)`)
- **Acid Pink / Hot Magenta (Thời trang/Combo)**: `#FF0055` (`hsl(340, 100%, 50%)`)
- **Toxic Lime / Electric Volt (Tốc độ/Né đòn)**: `#10FFA0` (`hsl(156, 100%, 53%)`)
- **Cyber Amber / Gold (Vàng kim Legendary)**: `#FFB800` (`hsl(43, 100%, 50%)`)
- **Neon Purple / Ultraviolet (Sử thi Epic)**: `#A855F7` (`hsl(271, 91%, 65%)`)
- **Crimson Neon (Thần thoại Mythic / Boss Nộ)**: `#EF4444` (`hsl(0, 84%, 60%)`)

### 2.3. Bảng Màu Phân Định 6 Bậc Rank Thẻ Bài & Trang Bị
```text
[COMMON]    Slate Gray     #94A3B8  | Viền xám tối giản, không hạt sáng
[FINE]      Emerald Green  #10B981  | Viền xanh lục neon, ánh sáng tĩnh
[RARE]      Electric Blue  #3B82F6  | Viền xanh biển rực, tia điện nhỏ
[EPIC]      Neon Purple    #A855F7  | Viền tím phát quang, bụi hạt ánh sao
[LEGENDARY] Cyber Amber    #F59E0B  | Viền lửa cam nảy lửa, Foil Hologram 3D
[MYTHIC]    Crimson Neon   #EF4444  | Viền đỏ sấm sét, hào quang rung chấn
```

---

## 🔤 3. Hệ Thống Typography (Font Chữ & Cấp Bậc)

- **Display & Header Font (Tiêu đề, Rank SSS, Số Lực Chiến CP)**:
  - Khuyên dùng: **Syne** / **Outfit** / **Clash Display** (Bold 800 - 900, All Caps, dứt khoát, hiện đại, đậm chất thời trang dạo phố).
- **Body & Description Font (Mô tả kỹ năng, thông số trang bị)**:
  - Khuyên dùng: **Plus Jakarta Sans** / **Inter** (Chữ mảnh rõ nét, đọc tốt trên mobile ở cỡ chữ nhỏ $12\text{px} - 14\text{px}$).
- **Monospace Font (Chỉ số sát thương, cooldown, terminal HUD)**:
  - Khuyên dùng: **JetBrains Mono** / **Space Mono** (Tạo cảm giác máy móc số liệu chính xác).

---

## ⚔️ 4. Layout Bàn Đấu Boss Xoay Quanh Đội Hình 6 Thẻ Bài (Bento Grid)

Trong trận đấu, màn hình Web được tổ chức theo cấu trúc Bento Grid thông minh:

```text
+----------------------------------------------------------------------------------------------------+
| [HEADER BAR: Logo Anhem JaeBin | Vàng: 154,200 | Kim Cương: 1,850 | Vé Boss: 12 | Cài Đặt]        |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  [BENTO TILE 1: BOSS ARENA - 65% CHIỀU RỘNG]               [BENTO TILE 2: THANH STYLE & COMBO - 35%]|
|  +-------------------------------------------------------+  +-------------------------------------+|
|  | BOSS: ĐẠI CA PHỐ CỔ - "BÁ QUYỀN HẮC LONG" (HP: 85%)   |  | STYLE METER: [ SSS ] 960/1000       ||
|  | [HP Bar: ============================------ 42,500]   |  | "ĂN CHƠI ĐIỆU NGHỆ" (+60% DMG BUFF) ||
|  | [Break/Giáp: ======---- 1,200/2,000] [Ý định: Tuyệt Kỹ]|  | [COMBO x14] [TIME SLOW ACTIVE]      ||
|  |                                                       |  |                                     ||
|  |          [CARD ART BOSS TRƯNG BÀY KHỔNG LỒ]           |  | >> NÚT KÍCH HOẠT HỢP KÍCH 6 THẺ <<  ||
|  |             (Hiệu ứng sấm sét đỏ Neon)                |  | (ALL-OUT RESONANCE READY!)          ||
|  +-------------------------------------------------------+  +-------------------------------------+|
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  [BENTO TILE 3: ĐỘI HÌNH 6 THẺ BÀI CHIẾN ĐẤU (TEAM FORMATION 2x3)]                                 |
|                                                                                                    |
|      -- TIỀN TUYẾN (VANGUARD / TANK) --        -- HẬU PHƯƠNG (DPS / BURST / STYLE AMPLIFIER) --   |
|                                                                                                    |
|   [THẺ 1: LONG BIDA]      [THẺ 2: HÙNG XE ĐỘ]     [THẺ 3: JAEBIN LEADER]    [THẺ 4: LINH NEON]    |
|   Rank: Epic (Tanker)     Rank: Rare (Vanguard)   Rank: Legendary (Carry)   Rank: Rare (Assassin) |
|   HP: 18,200 / DEF: 820   HP: 15,400 / Nẹt Pô     HP: 24,500 / ATK: 3,850   HP: 12,000 / Crit 45% |
|   [6 Slot Đồ: Tím/Lam]    [6 Slot Đồ: Lam/Lục]    [6 Slot Đồ: Cam/Tím]      [6 Slot Đồ: Lam/Lục]  |
|                                                                                                    |
|   [THẺ 5: TUẤN CYBER]     [THẺ 6: MAI DẠ QUANG]                                                   |
|   Rank: Epic (Hacker)     Rank: Legendary (Buffer)                                                |
|   Debuff Giáp Boss        Hồi Máu & Hack Năng Lượng                                               |
|   [6 Slot Đồ: Tím/Lam]    [6 Slot Đồ: Cam/Tím]                                                    |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  [BENTO TILE 4: KHAY BÀI HÀNH ĐỘNG TRÊN TAY & NĂNG LƯỢNG]                                          |
|  [Năng Lượng Phố: ⚡ 5/5]                                                     [KẾT THÚC LƯỢT]     |
|                                                                                                    |
|   [Thẻ: Đòn Gậy Bida]  [Thẻ: Bomber Chắn]  [Thẻ: Nẹt Pô Stun]  [Thẻ: Chém Neon]  [Thẻ: Lướt Né]    |
|   (Cost: 1 Energy)     (Cost: 1 Energy)    (Cost: 2 Energy)    (Cost: 1 Energy)  (Cost: 1 Energy)  |
+----------------------------------------------------------------------------------------------------+
```

---

## 🎴 5. Giải Phẫu Thẻ Bài Nhân Vật (Card Anatomy)

Mỗi thẻ bài nhân vật trên giao diện web gồm 5 thành phần trực quan:

```text
+-------------------------------------------------------------+
| [BADGE RANK: LEGENDARY]                       [CP: 142,600] | <- Header viền kim loại Neo-brutalist
+-------------------------------------------------------------+
|                                                             |
|                                                             |
|                 CARD ART MINH HỌA NHÂN VẬT                  |
|                 (Tỉ lệ 3:4, góc nghiêng 3D)                 |
|                                                             |
|                                                             |
+-------------------------------------------------------------+
| JAEBIN — "BÁ CHỦ PHỐ ĐÊM" (Cấp 45/60)                       | <- Tên thẻ & Level
| HP: 24,500   |   ATK: 3,850   |   DEF: 1,920   |   CRIT: 32%    | <- Chỉ số cốt lõi
+-------------------------------------------------------------+
| 6 Ô TRANG BỊ GẮN TRỰC TIẾP VÀO THẺ (KÈM MÀU VIỀN RANK):     |
|  [🗡️ Vũ Khí]  [🧥 Áo Khoác] [👖 Quần]   [👟 Giày] [🕶️ Kính] [🏍️ Xe Đua] |
|   (Cam-Leg)    (Tím-Epic)    (Lam-Rare)  (Tím)     (Lam)     (Cam-Leg)  |
+-------------------------------------------------------------+
| Kỹ năng độc quyền: "Bá Chủ Màn Đêm" (Triệu hồi siêu xe)     | <- Tooltip hiệu ứng
+-------------------------------------------------------------+
```

---

## 💥 6. Hiệu Ứng "Juice", Âm Thanh & Micro-Interactions (Gen Z Polish)

1. **Hiệu Ứng Hợp Kích 6 Thẻ (All-Out Resonance Attack)**:
   - Khi thanh Style chạm mốc **SSS ("Ăn Chơi Điệu Nghệ")**, nút Hợp Kích phát sáng cầu vồng neon.
   - Khi bấm nút: Bàn đấu tối sầm lại (Dim background), 6 thẻ bài đồng loạt bay vút vào trung tâm màn hình, xếp thành hình lục giác phát sáng, tung chuỗi đòn phối hợp với hiệu ứng manga comic zoom và nhát cắt chém nổ tung Boss.
2. **Âm Thanh Tactile (Sound Design)**:
   - Rút thẻ: Tiếng rít bài đanh, sắc.
   - Đánh thẻ: Tiếng gõ bi da nổ giòn, tiếng nẹt pô xe rít ga gầm rú.
   - Rank SSS: Tiếng reo hò và nhịp bass 808 drop sôi động kích thích dopamine.
3. **Sticker Badges & Hài Hước Đường Phố**:
   - Các nhãn sticker dán chéo góc thẻ: *"KHÔNG THỂ CẢN PHÁ"*, *"CHẤT PHỐ"*, *"BÁ CHÁY CON BÀ BẢY"*, *"CHÍ MẠNG 100%"*.
