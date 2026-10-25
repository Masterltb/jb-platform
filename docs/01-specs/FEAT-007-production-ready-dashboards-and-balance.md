# FEAT-007: Production-Ready Dashboards, Combat Balance & Harness Process

> **Quy Chuẩn**: Harness Engineering Framework (HEF v4.0.0) — Constitution Inviolable  
> **Dự Án**: JaeBinPlatform (Anhem JaeBin – Ăn Chơi Điệu Nghệ)  
> **Trạng Thái**: Phê duyệt & Chuẩn bị triển khai (Approved for Implementation)  

---

## 🏛️ PHẦN 1: QUY TRÌNH HARNESS CẬP NHẬT THEO TECHSTACK

### 1.1. Ma Trận Techstack Chuẩn Hóa Monorepo
* **Frontend Surface (`apps/web-portal/`)**:
  * Core: **Next.js 16.4+ (App Router)**, **React 19**, **TypeScript 5**.
  * Styling & UI: **Tailwind CSS v4** (`@tailwindcss/turbopack`), Lucide Icons.
  * Audio & VFX: **Web Audio API** (0ms latency, synthesized SFX), Canvas Confetti.
  * Quality Gates: `npm run build` (0 error, type-check strict, ESLint clean).
* **Backend Surface (`services/game-backend/`)**:
  * Core: **Node.js (NestJS / Fastify Engine)** với TypeScript strict.
  * Database: **PostgreSQL 16** (ACID Transactions, JSONB cho Item stats).
  * ORM: **Prisma ORM** (Schema-driven migrations).
  * Cache & High-Speed: **Redis** (Sorted Sets cho Real-time CP Leaderboard, Redlock cho Idempotent 1-of-1 Gacha & Payment Webhooks).
  * Realtime: **Socket.io** (Jackpot Ticker, World Boss live raids).
* **Harness Engine (`harness-engineering/`)**:
  * CLI: `python harness-engineering/scripts/harness_cli.py` (Intake, Story, Gate, Trace).

### 1.2. Vòng Lặp Phát Triển Bắt Buộc (The Inviolable Loop)
Mọi tính năng phát triển phải đi qua 5 bước nghiêm ngặt:
```text
[1. Docs Spec First] ──> [2. Harness Intake & Story Add] ──> [3. Implementation] ──> [4. Quality Gates (Build/Test)] ──> [5. Story Verify & Trace]
```

---

## ⚔️ PHẦN 2: CÂN CHỈNH TOÁN HỌC SÁT THƯƠNG & CHỈ SỐ CHIẾN ĐẤU (COMBAT FORMULA BALANCE)

### 2.1. Công Thức Tính Sát Thương Thực Tế (Effective Damage)
Để trận đấu công bằng, kịch tính và có chiều sâu chiến thuật, sát thương gây ra giữa Người chơi và Boss tuân theo hệ số giảm trừ giáp phi tuyến tính:

$$\text{DamageDealt} = \text{ATK} \times \left( \frac{1000}{1000 + \text{DEF}_{\text{target}}} \right) \times \text{Multiplier}_{\text{skill}}$$

* **Đòn Đánh Chí Mạng (Critical Strike)**:
  $$\text{Damage}_{\text{crit}} = \text{DamageDealt} \times (1.5 + \text{CritDamage})$$
  *(Tỉ lệ nổ chí mạng cơ bản = $\text{CritRate} \in [0.05, 0.95]$)*
* **Xuyên Giáp (Armor Penetration)**:
  $$\text{DEF}_{\text{effective}} = \text{DEF}_{\text{target}} \times (1 - \text{ArmorPen})$$
  *(Set Hắc Long 1-of-1 có $\text{ArmorPen} = 1.0$, bỏ qua 100% giáp).*

### 2.2. Cơ Chế Thanh Phá Thế (Break Stance Gauge)
* Mỗi Boss sở hữu 2 thanh tài nguyên: **Thanh Máu (HP)** và **Thanh Giáp Trụ/Phá Thế (Break Stance)**.
* Khi thanh Break Stance bị đánh về $0$:
  * Boss rơi vào trạng thái **Choáng Váng (Staggered)** trong 2 lượt.
  * Mọi sát thương nhận vào trong lúc Staggered tăng thêm **+50%**.
  * Tỉ lệ bạo kích của cả đội hình lên Boss đạt **100%**.
  * Sát thương phá thế:
    $$\text{BreakDamage} = \text{BaseBreak} \times (1 + \text{BreakEfficiency}_{\text{item}})$$

### 2.3. Bảng Cân Bằng Chỉ Số 3 Đại Boss Thế Giới

| Thông số | Tier 5: Boss Sư Đà Vương | Tier 6: Boss Cửu Linh Thị Xà | Tier 7: Boss Kim Bằng Quỷ Vương |
| :--- | :--- | :--- | :--- |
| **Cấp độ / Chuyển sinh** | 5 Chuyển (Lv. 300) | 6 Chuyển (Lv. 371) | 7 Chuyển (Lv. 420) |
| **HP Tối Đa** | $250,000$ | $650,000$ | $1,500,000$ |
| **Thanh Phá Thế (Break)** | $4,000$ | $8,000$ | $15,000$ |
| **Sức Tấn Công (ATK)** | $3,500$ (Đơn thể / Tiền Tuyến) | $5,800$ (AOE Phun Độc 3 mục tiêu) | $9,200$ (Xuyên thấu Hậu Tuyến) |
| **Phòng Ngự (DEF)** | $1,200$ ($54.5\%$ kháng ST) | $2,400$ ($70.5\%$ kháng ST) | $4,500$ ($81.8\%$ kháng ST) |
| **Cơ Chế Đặc Biệt (Phase 2)**| Dưới $50\%$ HP: Bốc lửa cuồng nộ tăng $30\%$ ATK | Dưới $40\%$ HP: Triệu hồi lôi điện gây tê liệt 1 tướng | Dưới $30\%$ HP: Tạo khiên lượng tử $150,000$ HP |
| **Yêu Cầu Lực Chiến (CP)** | Khuyến nghị: $\ge 450,000$ CP | Khuyến nghị: $\ge 800,000$ CP | Khuyến nghị: $\ge 1,500,000$ CP |

### 2.4. Công Thức Lực Chiến Tổng (Combat Power - CP)
$$\mathbf{CP} = (\text{HP} \times 1.2) + (\text{ATK} \times 4.5) + (\text{DEF} \times 3.0) + (\text{CritRate} \times 20,000) + (\text{CritDMG} \times 15,000) + (\text{Speed} \times 100) + \text{BonusSet}$$

### 2.5. Bảng Cân Bằng Chỉ Số Vũ Khí & Trang Bị (Weapon & Equipment Tiers)

| Phẩm cấp (Rarity) | Slot Vũ Khí (Base ATK) | Slot Giáp (Base HP/DEF) | Tăng chỉ số mỗi cấp Cường Hóa (+1 đến +20) | Phân rã (Dismantle Yield) | Hợp nhất (Fusion Recipe) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Common (Trắng)** | $120$ ATK | $400$ HP, $30$ DEF | $+15$ ATK / $+50$ HP | $100$ Vàng, $1$ Đá Cường Hóa | 3 Món Common $\to$ 1 Món Fine |
| **Fine (Xanh lá)** | $280$ ATK | $1,000$ HP, $80$ DEF | $+35$ ATK / $+120$ HP | $300$ Vàng, $3$ Đá Cường Hóa | 3 Món Fine $\to$ 1 Món Rare |
| **Rare (Lam)** | $680$ ATK | $2,500$ HP, $220$ DEF | $+80$ ATK / $+280$ HP | $1,000$ Vàng, $8$ Đá Cường Hóa | 3 Món Rare $\to$ 1 Món Epic |
| **Epic (Tím)** | $1,450$ ATK | $5,500$ HP, $520$ DEF | $+180$ ATK / $+600$ HP | $3,500$ Vàng, $20$ Đá, $10$ KC | 3 Món Epic $\to$ 1 Món Legendary |
| **Legendary (Cam)** | $3,200$ ATK | $12,000$ HP, $1,100$ DEF | $+380$ ATK / $+1,200$ HP | $12,000$ Vàng, $50$ Đá, $50$ KC | 3 Món Legendary $\to$ 1 Món Mythic |
| **Mythic (Đỏ)** | $6,800$ ATK | $24,000$ HP, $2,200$ DEF | $+750$ ATK / $+2,500$ HP | $40,000$ Vàng, $150$ Đá, $200$ KC | 10-of-10 Server Limit (Đặc biệt) |
| **Sovereign (Hồng Kim)** | $14,000$ ATK | $45,000$ HP, $4,500$ DEF | $+1,500$ ATK / $+5,000$ HP | Không thể phân rã | 1-of-1 Độc Tôn Toàn Server |

---

## 🖥️ PHẦN 3: LỘ TRÌNH TRIỂN KHAI PRODUCTION READY CHO TỪNG DASHBOARD

### Dashboard 1: Bàn Đấu Boss Auto & Hiệu Ứng Tuyệt Chiêu (`BossCardBattleArena.tsx`)
- Tích hợp đúng công thức tính toán sát thương, giảm trừ giáp, chí mạng nảy số màu cam rực rỡ.
- Thanh Break Stance có hiệu ứng nứt vỡ kim loại khi bị đánh tụt.
- Tích hợp Cut-in Splash Animation khi tướng tích đủ 100 Nộ Khí.
- Chọn Boss từ Hub nào vào trận đấu đúng Boss đó với HP/ATK/Mechanic tương ứng.

### Dashboard 2: Săn Boss Hub & Sàn Đấu 4 Chế Độ (`BossHubAndModesView.tsx`)
- Hiển thị đủ 3 Đại Boss (Sư Đà Vương, Cửu Linh Thị Xà, Kim Bằng Quỷ Vương) với ảnh đại diện 3D và Drop Pool tương ứng.
- Đếm ngược hồi lượt săn Boss tự động (1 lượt mỗi 30 phút, tối đa 6 lượt).
- Nút "ĐI NGAY (CHIẾN)" truyền toàn bộ thông số và artwork sang sàn đấu.

### Dashboard 3: Đội Hình & 6 Ô Trang Bị (`TeamFormationTile.tsx` / `CharacterCardView.tsx`)
- Hiển thị 6 thẻ bài chiến đấu (Tiền Tuyến / Trung Tuyến / Hậu Tuyến).
- Căn chỉnh chân dung nhân vật vừa vặn 100% không bị cắt tóc hay khuất cằm.
- Kích hoạt huy hiệu Set Trang Bị (1-of-1 Hắc Long, 10-of-10 Lôi Thần, 100-of-100 Thần Ưng).
- Modal tháo/lắp đồ trực tiếp cho từng vị trí.

### Dashboard 4: Túi Đồ & Lò Rèn Nâng Cấp (`InventoryAndUpgradeView.tsx`)
- Hệ thống Cường hóa trang bị (+1 đến +20) với tỷ lệ xịt/đạt và tăng thuộc tính.
- Hệ thống Thăng sao nhân vật (1★ đến 6★) và Thức tỉnh hào quang.
- **Tính năng mới**: Lò Ghép Trang Bị (Fusion 3 món cùng phẩm lên 1 món phẩm kế tiếp) và Phân rã trang bị thừa lấy Đá Cường Hóa & Kim Cương.

### Dashboard 5: Bóc Pack 3D & Hòm Gacha (`GachaView.tsx`)
- 5 Hòm Gacha 3D hiển thị rõ ràng, lộng lẫy (Hòm Đồng, Bạc, Vàng, Lôi Thần, Hắc Long).
- Tỷ lệ rơi minh bạch theo quy chuẩn quốc tế.
- Hũ Jackpot toàn server nhảy số real-time.
- Hiệu ứng lật bài 3D kèm pháo giấy Confetti khi mở trúng đồ hiếm.

### Dashboard 6: Bản Đồ Ải Thế Giới & Thu Hoạch AFK (`StagesMapView.tsx`)
- Định vị từng khu phố (Phố Đi Bộ, Chợ Đêm Cyber, Khu Cảng Ngầm, Đỉnh Tháp Lôi Thần).
- Cơ chế tính thưởng AFK theo thời gian thực (Vàng, Exp, Đá cường hóa).

---

## 🛡️ PHẦN 4: TIÊU CHÍ NGHIỆM THU (ACCEPTANCE CRITERIA)
- [x] Quy trình Harness phản ánh đúng techstack monorepo.
- [x] Không có lỗi TypeScript (`npm run build` exit code 0).
- [x] Mọi tài nguyên đồ họa (Hero, Boss, Chest, Item) không bị che khuất hay đục lỗ.
- [x] Chỉ số sát thương và máu của Boss tuân thủ bảng cân bằng toán học.
- [x] Dữ liệu thay đổi được ghi nhận trong Story Packet và Trace của `harness_cli.py`.
