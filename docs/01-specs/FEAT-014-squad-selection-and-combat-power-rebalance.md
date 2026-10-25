# Specification: FEAT-014 — Squad 6-Hero Selection & Combat Power Rebalancing

## 1. Mục Đích & Bối Cảnh
- **Vấn đề 1 (JaeBin Rank & Visual)**: JaeBin bị lưu trong backend database với Rank cũ `Mythic` và `6 Stars`, khiến sau khi fetch API đè mất thuộc tính `Sovereign 6 Suns (6☀️ SUPREME)`.
- **Vấn đề 2 (Squad Selection)**: Hiện tại khi quay Gacha ra tướng mới, game tự động cộng dồn vào danh sách khiến đội hình phình to lên 7+ thẻ. Người chơi chưa có giao diện chọn lựa chính xác 6 tướng ra trận từ kho tướng sở hữu.
- **Vấn đề 3 (Combat Power Balance)**: Chỉ số chiến lực giữa các cấp bậc Rank và Cảnh giới Tiến Hóa bị lệch (Ronin Legendary 4★ lại có 258,000 CP cao hơn JaeBin Mythic 90,950 CP). Cần công thức chuẩn hóa thống nhất toàn hệ thống.

---

## 2. Thiết Kế & Yêu Cầu Kỹ Thuật

### 2.1. Cập Nhật Backend Database & JaeBin Sovereign 6 Suns
- Cập nhật Prisma Schema (`CharacterCard`):
  - `ascensionTier`: Int (1 - 18)
  - `moons`: Int (0 - 6)
  - `suns`: Int (0 - 6)
  - `tierRealm`: String ('Star' | 'Moon' | 'Sun')
  - `isActiveSquad`: Boolean (default true)
- Cập nhật `seed.ts`:
  - `card_jaebin_03`: Rank = `'Sovereign'`, `stars = 6`, `moons = 6`, `suns = 6`, `ascensionTier = 18`, `tierRealm = 'Sun'`.
  - Base Stats: HP `245,000`, ATK `42,000`, DEF `18,500`, Crit `0.75`, CritDamage `3.50`.
  - CP = `1,850,000 CP`.

### 2.2. Chuẩn Hóa Công Thức Lực Chiến (Combat Power Formula)
Công thức tính CP chuẩn hóa cho cả Frontend và Backend:
$$\text{CP} = \left[ \text{BaseCP}(\text{HP}, \text{ATK}, \text{DEF}, \text{Crit}, \text{Style}) \times \text{AscensionMult} \times \text{RankMult} \right] + \text{EquipCP}$$

- **Ascension Multiplier**:
  - Stars (1★ - 6★): $1.0 + (\text{stars} - 1) \times 0.15$ (1.0x - 1.75x)
  - Moons (1🌙 - 6🌙): $2.0 + (\text{moons} - 1) \times 0.35$ (2.0x - 3.75x)
  - Suns (1☀️ - 6☀️): $4.5 + (\text{suns} - 1) \times 0.9$ (4.5x - **9.0x**)
- **Rank Multiplier**:
  - Common: 0.8x
  - Fine: 0.9x
  - Rare: 1.0x
  - Epic: 1.15x
  - Legendary: 1.4x
  - Mythic: 1.8x
  - Sovereign (1-of-1): **2.5x**
- Cân bằng Ronin Legendary Lv.68: CP chuẩn hóa ~158,000 CP.
- JaeBin 6 Suns Sovereign Lv.99: CP chuẩn hóa ~1,850,000 CP.

### 2.3. Tính Năng Tuyển Chọn Đội Hình 6 Tướng Xuất Chiến
- Tách bạch rõ 2 tập dữ liệu:
  - `ownedHeroes`: Danh sách tất cả anh hùng mà người chơi sở hữu (Kho Tướng).
  - `squad`: Chính xác 6 anh hùng đang được triển khai xuất chiến (2 Tiền Tuyến, 2 Hàng Giữa, 2 Hàng Sau hoặc 3 Tiền Tuyến / 3 Hàng Sau).
- **Giao diện Modal Tuyển Chọn Đội Hình (Squad Selection Modal)**:
  - Nút **"ĐỔI ĐỘI HÌNH (CHỌN 6 TƯỚNG)"** trên giao diện Đội Hình.
  - Cho phép chọn/bỏ chọn từng tướng trong Kho Tướng.
  - Chỉ thị rõ slot (Tiền tuyến, Hàng giữa, Hàng sau) cho từng tướng.
  - Nút **"TỰ ĐỘNG XẾP TƯỚNG MẠNH NHẤT"** (Auto-pick top 6 CP).
  - Khóa giới hạn nghiêm ngặt ở mức 6 tướng khi lưu.
- Khi chiêu mộ Gacha:
  - Tướng mới được đẩy vào `ownedHeroes`.
  - Không tự ý nhồi vào `squad` nếu đã đủ 6 tướng.

---

## 3. Tiêu Chí Nghiệm Thu (Acceptance Criteria)
1. Thẻ JaeBin hiển thị đúng Rank `Sovereign`, hào quang `6☀️ SUPREME` với 6 Mặt Trời, chiến lực đứng đầu đội ngũ (> 1,800,000 CP).
2. Tướng Legendary, Epic, Rare có chiến lực cân đối, không bị lệch hoặc cao bất thường hơn cấp bậc cao hơn.
3. Người chơi có thể tự do chọn và thay thế 6 tướng xuất chiến từ danh sách tướng sở hữu. Đội hình luôn duy trì chuẩn 6 tướng.
4. Build Next.js và Backend TypeScript pass 100%.
