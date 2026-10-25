# FEAT-003: Hệ Thống Thẻ Bài Đội Hình 6 Người, Trang Bị Gắn Thẻ & Phân Cấp Rank

> **Mã đặc tả:** FEAT-003  
> **Trạng thái:** Approved for Prototype (Web Card Battler)  
> **Áp dụng cho:** `apps/web-portal/` & `services/game-backend/`  
> **Người thực hiện:** Solo Dev + AI Assistant  

---

## 🃏 1. Mục tiêu & Trải nghiệm người chơi

Hệ thống **Đội hình 6 Thẻ Bài & Trang Bị Gắn Vào Thẻ** tạo nên chiều sâu chiến thuật và thỏa mãn đam mê sưu tập của game thủ Gen Z:
- **Đội hình 6 Thẻ Bài Độc Nhất (6-Card Squad)**: Người chơi kết hợp 6 thẻ bài nhân vật (*Vanguard, DPS, Assassin, Tactician, Healer, Buffer*) tạo nên một băng nhóm đường phố bất khả chiến bại.
- **6 Ô Trang Bị Trên Từng Thẻ Bài**: Mỗi nhân vật trong số 6 thẻ đều có thể gắn đủ 6 món thời trang đường phố: **Vũ khí, Áo khoác, Quần, Sneaker, Phụ kiện, Xe độ**. (Tổng cộng người chơi quản lý 36 món trang bị trên cả đội hình).
- **Phân Cấp Rank Rõ Ràng**: Cả Thẻ bài lẫn Trang bị phân định theo 6 cấp: **Common $\to$ Fine $\to$ Rare $\to$ Epic $\to$ Legendary $\to$ Mythic**.
- **Chỉ Số Lực Chiến Đội Hình ($\mathbf{Team\ CP}$)**: Tổng hợp sức mạnh từ cả 6 thẻ bài nhân vật và 36 món trang bị, cộng thêm điểm thưởng kích hoạt hệ (Team Synergy Bonus).

---

## 🎴 2. Cấu Trúc Đội Hình 6 Thẻ & 6 Vị Trí Trang Bị

### 2.1. Phân Bổ Vị Trí Trong Đội Hình 6 Thẻ (Squad Roles)
```text
+-----------------------------------------------------------------------------------+
|                  BĂNG ANHEM JAEBIN — TỔNG LỰC CHIẾN CP: 670,400                   |
+-----------------------------------------------------------------------------------+
| TIỀN TUYẾN (FRONT):  [THẺ 1: Long Bida (Tank)]    |  [THẺ 2: Hùng Xe Độ (CC/Stun)]|
|                      HP: 14,500 / DEF: 1,400      |  HP: 12,200 / DEF: 1,100      |
|                      (Chắn đòn, phản sát thương)  |  (Nẹt pô, phá giáp Break)     |
+---------------------------------------------------+-------------------------------+
| HÀNG GIỮA (MIDLINE): [THẺ 3: JaeBin (Carry Burst)]|  [THẺ 4: Linh Neon (Assassin)]|
|                      HP: 24,500 / ATK: 3,850      |  HP: 8,600 / CRIT: 35%        |
|                      (Dồn sát thương chính)       |  (Ám sát chí mạng chớp nhoáng)|
|                      -----------------------------+-------------------------------|
|                      [THẺ 5: Tuấn Cyber (Tactician / Debuffer)]                   |
|                      HP: 9,800 / Giật điện neon tăng 35% DMG nhận của Boss        |
+-----------------------------------------------------------------------------------+
| HÀNG SAU (BACKLINE): [THẺ 6: Mai Dạ Quang (Style Amplifier / Healer)]             |
|                      HP: 11,500 / Hồi 3,500 HP toàn đội, hack Năng Lượng & Style  |
+-----------------------------------------------------------------------------------+
```

### 2.2. 6 Vị Trí Trang Bị Trên Mỗi Thẻ Bài Nhân Vật
Mỗi thẻ bài trong số 6 thẻ sở hữu 6 ô trang bị:
1. **Ô 1 — Vũ khí Chính (Weapon)**: Gậy bida titan, Ống tuýp neon, Song đao phố, Kiếm gỗ (Tăng mạnh ATK, Tỉ lệ Chí mạng).
2. **Ô 2 — Áo Khoác (Jacket / Armor)**: Bomber da lộn, Áo bóng chày phản quang, Giáp ngực biker (Tăng mạnh HP, DEF, Giáp ảo).
3. **Ô 3 — Quần (Pants)**: Quần thụng túi hộp (Cargo pants), Jean rách gối Cyber (Tăng HP, Kháng hiệu ứng khống chế).
4. **Ô 4 — Sneaker (Shoes)**: Giày đế bóng khí, Sneaker dạ quang (Tăng Tốc độ hành động, Tỉ lệ Né đòn, Khung bất tử).
5. **Ô 5 — Phụ Kiện Mặt (Accessory)**: Kính râm LED, Khẩu trang ninja phố, Dây chuyền xích vàng (Tăng Sát thương Chí mạng, Tăng điểm thưởng Style).
6. **Ô 6 — Xe Độ (Mount / Bike)**: Siêu xe SH độ pô titan, Cào cào bốc đầu, Ván trượt phản trọng lực (Tăng Năng lượng ban đầu, Kỹ năng nẹp pô mở màn làm choáng địch).

---

## 🌟 3. Hệ Thống Phân Cấp Rank (Rarity Tiers & Visuals)

Thẻ bài và Trang bị được chuẩn hóa theo 6 cấp bậc Rank với màu sắc nhận diện đặc trưng:

| Bậc Rank | Tên tiếng Việt | Màu sắc chủ đạo | Mã màu Hex | Dòng Thuộc tính Phụ | Hiệu ứng Card Web | Giới hạn Cấp |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Common** | Phổ thông | Xám Slate | `#94A3B8` | $0$ dòng | Viền xám mờ tối giản | Cấp 20 |
| **Fine** | Ưu tú | Xanh Lục | `#10B981` | $1$ dòng | Viền xanh neon tĩnh | Cấp 30 |
| **Rare** | Hiếm | Xanh Lam | `#3B82F6` | $2$ dòng | Viền xanh biển, tia điện nhẹ | Cấp 40 |
| **Epic** | Sử thi | Tím Neon | `#A855F7` | $3$ dòng | Viền tím phát quang, hiệu ứng hạt bụi sáng | Cấp 50 |
| **Legendary** | Huyền thoại | Vàng Cam | `#F59E0B` | $4$ dòng $+ 1$ Kỹ năng Trang Bị Độc Quyền | Lớp phủ Hologram Foil 3D, viền lửa cam nảy lửa | Cấp 60 |
| **Mythic** | Thần thoại | Đỏ Neon | `#EF4444` | $4$ dòng $+ 2$ Kỹ năng Thức Tỉnh Siêu Phàm | Hiệu ứng sấm sét đỏ, hào quang ma thuật rung chuyển | Cấp 70 |

---

## ⚡ 4. Công Thức Tính Lực Chiến Đội Hình (Team Combat Power - Team CP)

Tổng Lực Chiến của đội hình ($\mathbf{Team\ CP}$) là tổng lực chiến của từng thẻ bài cộng với điểm kích hoạt liên kết đội hình (Synergy Resonance):

$$\mathbf{Team\ CP} = \sum_{i=1}^{6} \mathbf{Card\_CP}_i + \mathbf{SynergyBonus}$$

Trong đó, Lực chiến của từng Thẻ Bài ($\mathbf{Card\_CP}$) tính theo:
$$\mathbf{Card\_CP} = (\text{HP} \times 0.25) + (\text{ATK} \times 3.0) + (\text{DEF} \times 2.0) + (\text{CRIT\_RATE\%} \times 60) + (\text{CRIT\_DMG\%} \times 35) + (\text{STYLE\_BONUS} \times 50) + \mathbf{RankMultiplier}$$

### Điểm Kích Hoạt Liên Kết Đội Hình ($\mathbf{SynergyBonus}$):
- **Kích hoạt 3 Thẻ cùng Băng Nhóm**: $+20,000 \text{ CP}$ (Tăng $+12\%$ ATK toàn đội).
- **Kích hoạt đủ 6 Thẻ Băng Nhóm (Full Team Resonance)**: $+80,000 \text{ CP}$ (Mở khóa Tuyệt Kỹ Hợp Kích 6 Thẻ khi Style đạt SSS).
- **Bộ trang bị đồng bộ Rank (Full Set Resonance)**: Khi 1 thẻ bài mang đủ 6 món trang bị cùng bậc Legendary trở lên: Nhận thêm $+40,000 \text{ CP}$.

---

## 🔨 5. Cơ Chế Cường Hóa & Nâng Cấp Trang Bị
- **Nguyên liệu**: Tiêu hao **Đá Cường Hóa** (thu được từ phân giải trang bị AFK) + Vàng.
- **Tỉ lệ thành công**:
  - Cấp $+1 \to +5$: $100\%$ thành công.
  - Cấp $+6 \to +10$: $70\%$ thành công (nếu thất bại: Tích lũy $+10\%$ may mắn cho lần đập sau).
  - Cấp $+11 \to +15$: $40\%$ thành công (thất bại: **Không tụt cấp, không gãy trang bị**; tích điểm thanh Pity bar, đầy 100% chắc chắn lên).
