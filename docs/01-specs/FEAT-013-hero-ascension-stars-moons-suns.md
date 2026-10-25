# FEAT-013: Hero 3-Realm Ascension System (6 Stars ➔ 6 Moons ➔ 6 Suns) & Supreme Solar Aura

- **ID Tính Năng**: `FEAT-013`
- **Mã User Story**: `US-027`
- **Phân luồng rủi ro (Risk Lane)**: `normal`
- **Tác giả**: Antigravity Solo Dev + AI Synergy
- **Trạng thái**: Đã phê duyệt (Approved) & Sẵn sàng triển khai

---

## 1. Bối Cảnh & Mục Tiêu Kỹ Thuật

Trước đây, hệ thống nâng cấp thẻ tướng chỉ dừng lại ở **6 Sao Vàng (6★)**. Để tạo chiều sâu tiến hóa vô tận và kích thích cảm giác sở hữu tướng tối thượng cho người chơi, hệ thống mở rộng giới hạn nâng cấp thành **3 Cảnh Giới Tiến Hóa Thần Cấp**:

1. **Cảnh giới Tinh Tú (Star Realm - 1★ đến 6★)**:
   - Biểu tượng: ⭐ (Sao Vàng)
   - Cấp 1 ➔ 6
   - Vật phẩm yêu cầu: `mat_evo_common` (Đá Tiến Hóa Sơ Cấp) đến `mat_evo_legendary` (Huyết Tinh Huyền Thoại).
2. **Cảnh giới Huyền Nguyệt (Moon Realm - 1🌙 đến 6🌙)**:
   - Biểu tượng: 🌙 (Mặt Trăng Bạc Ánh Tím Cyber)
   - Cấp 7 ➔ 12 (Tương đương 1 đến 6 Nguyệt Ấn)
   - Đột phá từ 6★ lên 1🌙 yêu cầu: `Ấn Ký Huyền Thoại` & `Đá Nguyệt Quang Bionic`.
   - Thuộc tính tăng: +150% HP, +120% ATK, mở khóa thiên phú Nguyệt Ảnh Hộ Thể.
3. **Cảnh giới Thái Dương Vô Cực (Sun Realm - 1☀️ đến 6☀️)**:
   - Biểu tượng: ☀️ (Mặt Trời Rực Lửa Sáng Thế)
   - Cấp 13 ➔ 18 (Tương đương 1 đến 6 Thái Dương Thần Cực)
   - Đột phá từ 6🌙 lên 1☀️ yêu cầu: `Ấn Ký Sovereign Vô Cực [1-of-1]` & `Hạt Nhân Thái Dương Thần Khí`.

---

## 2. Đặc Quyền & Hiệu Ứng Cực Hạn Ở Cấp 6 MẶT TRỜI (6☀️)

Khi nhân vật đạt cảnh giới tối thượng **6 MẶT TRỜI (6☀️ - CỰC HẠN THÁI DƯƠNG SÁNG THẾ)**:
- **Hiệu ứng quanh thẻ (Visual FX)**:
  - Class CSS: `aura-six-suns-supreme`.
  - Vòng lửa plasma Thái Dương rực cháy xoay quanh thẻ 360 độ (`solar-corona-spin`).
  - Hào quang lửa thần cam vàng chói lọi kết hợp tia chớp hồng neon Sovereign.
  - Hạt lửa particle bốc lên liên tục, rung chuyển năng lượng hạt nhân.
  - Huy hiệu đỉnh đầu: `☀️☀️☀️☀️☀️☀️ 6 THÁI DƯƠNG TỐI CAO`.
- **Chỉ số chiến đấu vượt bậc**:
  - Lực chiến cơ bản đạt từ `1,500,000 CP` đến `3,000,000+ CP`.
  - Đòn đánh thường tự động chuyển thành **Sát thương Thái Dương Chuẩn (True Solar Burn)** bỏ qua 100% Giáp và Khiên của Boss.
  - Toàn đội hình nhận hào quang buff: +30% Tốc đánh, +50% Tỉ lệ bạo kích và hồi 5% Năng Lượng mỗi lượt.

---

## 3. Bảng Yêu Cầu Tiến Hóa 18 Cấp Độ

| Cấp | Cảnh Giới | Biểu Tượng | Tên Phẩm Hàm | Nguyên Liệu Yêu Cầu | Tiền Tệ | Bonus CP |
|:---|:---|:---|:---|:---|:---|:---|
| 1 | Star | ⭐ | 1 Sao Khởi Đầu | Mặc định | 0 | Cơ bản |
| 2 | Star | ⭐⭐ | 2 Sao Tinh Anh | 50x Đá Sơ Cấp | 300 💎 | +15,000 |
| 3 | Star | ⭐⭐⭐ | 3 Sao Dũng Sĩ | 150x Đá Tinh Chế | 600 💎 | +35,000 |
| 4 | Star | ⭐⭐⭐⭐ | 4 Sao Tướng Quân | 300x Tinh Thể Huyền Lam | 900 💎 | +65,000 |
| 5 | Star | ⭐⭐⭐⭐⭐ | 5 Sao Thống Soái | 600x Linh Ngọc Tím | 1,500 💎 | +110,000 |
| 6 | Star | ⭐⭐⭐⭐⭐⭐ | 6 Sao Cực Hạn | 1,500x Huyết Tinh Huyền Thoại | 2,500 💎 | +180,000 |
| 7 | Moon | 🌙 | 1 Trăng Tân Nguyệt | 1x Ấn Ký Huyền Thoại + 200x Huyết Tinh | 3,000 💎 | +270,000 |
| 8 | Moon | 🌙🌙 | 2 Trăng Thượng Huyền | 300x Huyết Tinh Huyền Thoại | 3,500 💎 | +380,000 |
| 9 | Moon | 🌙🌙🌙 | 3 Trăng Bán Nguyệt | 500x Huyết Tinh Huyền Thoại | 4,000 💎 | +510,000 |
| 10 | Moon | 🌙🌙🌙🌙 | 4 Trăng Trương Huyền | 700x Huyết Tinh Huyền Thoại | 4,500 💎 | +660,000 |
| 11 | Moon | 🌙🌙🌙🌙🌙 | 5 Trăng Viên Nguyệt | 1,000x Huyết Tinh Huyền Thoại | 5,000 💎 | +830,000 |
| 12 | Moon | 🌙🌙🌙🌙🌙🌙 | 6 Trăng Nguyệt Hoàng | 1,500x Huyết Tinh + 1x Lôi Thần Hạt Nhân | 6,000 💎 | +1,050,000 |
| 13 | Sun | ☀️ | 1 Trời Sơ Dương | 1x Ấn Ký Sovereign Vô Cực [1-of-1] | 8,000 💎 | +1,350,000 |
| 14 | Sun | ☀️☀️ | 2 Trời Triều Dương | 2x Ấn Ký Sovereign | 10,000 💎 | +1,700,000 |
| 15 | Sun | ☀️☀️☀️ | 3 Trời Liệt Dương | 3x Ấn Ký Sovereign | 12,000 💎 | +2,100,000 |
| 16 | Sun | ☀️☀️☀️☀️ | 4 Trời Hạo Dương | 4x Ấn Ký Sovereign | 15,000 💎 | +2,550,000 |
| 17 | Sun | ☀️☀️☀️☀️☀️ | 5 Trời Cực Dương | 5x Ấn Ký Sovereign | 18,000 💎 | +3,100,000 |
| 18 | Sun | ☀️☀️☀️☀️☀️☀️ | **6 Trời Thái Dương Tối Cao** | **10x Ấn Ký Sovereign Vô Cực [1-of-1]** | **25,000 💎** | **+4,000,000 (Hiệu Ứng Thái Dương Sáng Thế)** |

---

## 4. Kế Hoạch Triển Khai (Implementation Tasks)
1. **Types**: Mở rộng `CharacterCard` với `ascensionTier` (1-18), helper `getHeroAscensionInfo(hero)`.
2. **CSS Global FX**: Viết keyframes và animation `aura-six-suns-supreme`, `solar-corona-spin`, `solar-pulsing-glow`.
3. **Inventory & Upgrade**: Cho phép thăng cấp liền mạch từ 1★ đến 6☀️, hiển thị nguyên liệu tương ứng.
4. **Card Components**: Tích hợp hiển thị icon Sao ⭐, Trăng 🌙, Trời ☀️ và tự động kích hoạt hiệu ứng 6 Mặt Trời trên mọi card renderer (Đội hình, Trận đấu Boss Arena, Bóc Pack 3D, Modal Thông tin).
