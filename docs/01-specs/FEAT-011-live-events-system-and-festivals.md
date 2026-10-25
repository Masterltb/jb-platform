# FEAT-011: Hệ Thống Sự Kiện Trực Tuyến & Lễ Hội (In-Game Live Events & Festivals)

> **Nền tảng**: Harness Engineering Framework (HEF v4.0.0)  
> **Dự án**: JaeBinPlatform (Anhem JaeBin – Ăn Chơi Điệu Nghệ)  
> **Trạng thái**: Approved & Specification Standard  

---

## 1. Mục Tiêu & Kiến Trúc Sự Kiện

Hệ thống sự kiện trực tuyến được thiết kế theo chuẩn LiveOps 2026, hỗ trợ đồng bộ thời gian thực từ Server NestJS, đảm bảo tính công bằng (Anti-Cheat Server-Side), và cung cấp động lực cày cuốc liên tục cho người chơi.

```
                    ┌─────────────────────────────────┐
                    │     TRUNG TÂM SỰ KIỆN LỄ HỘI     │
                    └────────────────┬────────────────┘
                                     │
       ┌───────────────┬─────────────┴─────────────┬───────────────┐
       ▼               ▼                           ▼               ▼
[1. ĐUA TOP BOSS] [2. ĐIỂM DANH 7 NGÀY]   [3. VÒNG QUAY MAY MẮN] [4. BATTLE PASS 2026]
(Raid Leaderboard) (Cyber Carnival Login)  (Lucky Wheel)          (Street Pass Mùa 1)
```

---

## 2. Chi Tiết 4 Sự Kiện Chính

### Sự Kiện 1: Đua Top Săn Trùm Toàn Server (World Boss Raid Leaderboard)
- **Thời gian diễn ra**: 7 ngày (tự động reset theo mùa).
- **Cơ chế**:
  - Mỗi ngày người chơi nhận 3 Vé Khiêu Chiến Boss Thế Giới.
  - Tổng sát thương gây ra cho Trùm Thế Giới (Thái Cổ Lôi Thần) được ghi nhận lên Bảng Xếp Hạng Server qua API `/api/events/boss-raid/record`.
- **Phần thưởng Xếp Hạng Chung Cuộc**:
  - **Top 1**: Danh hiệu độc quyền *«ĐỆ NHẤT THỢ SĂN 2026»*, Hòm Trang Bị Sovereign 1-of-1, 50,000 Kim Cương.
  - **Top 2 - 5**: Danh hiệu *«BÁ CHỦ PHỐ CỔ»*, 2 Trang Bị Mythic Tự Chọn, 25,000 Kim Cương.
  - **Top 6 - 20**: 1 Trang Bị Mythic, 10,000 Kim Cương, 100 Vé Gacha.
  - **Top 21 - 100**: 5,000 Kim Cương, 50 Vé Gacha.
- **Mốc Sát Thương Toàn Server (Community Milestones)**:
  - Mốc 10,000,000 DMG: Toàn server nhận 100,000 Vàng + 500 Kim Cương.
  - Mốc 50,000,000 DMG: Toàn server nhận 10 Vé Gacha Vàng.
  - Mốc 200,000,000 DMG: Toàn server nhận Rương Tướng Legendary Chọn.
  - Mốc 1,000,000,000 DMG: Mở khóa x2 Tỷ Lệ Drop Gacha trong 24 giờ!

---

### Sự Kiện 2: Lễ Hội Đêm Phố Cổ — Điểm Danh 7 Ngày (Cyber Carnival 7-Day Login)
- **Cơ chế**: Nhận quà miễn phí mỗi ngày khi đăng nhập vào hệ thống, lưu trữ trạng thái nhận trên Server PostgreSQL.

| Ngày | Phần Thưởng | Giá Trị Ước Tính |
| :---: | :--- | :--- |
| **Ngày 1** | 100,000 Vàng + 500 Kim Cương | Nhập môn giang hồ |
| **Ngày 2** | 10 Vé Bóc Pack Thần Binh 3D | Quay đồ khởi động |
| **Ngày 3** | Rương Vũ Khí Legendary Tự Chọn Cấp 60 | Tăng vọt 50,000 CP |
| **Ngày 4** | 2,500 Kim Cương + 50 Đá Cường Hóa Huyền Thiết | Nâng cấp trang bị |
| **Ngày 5** | Thẻ Nhân Vật Mythic: *Hồng Tuyết Cơ 5★* | Tướng khống chế siêu cấp |
| **Ngày 6** | 1 Vé Mở Hòm Tối Thượng Sovereign Hoàng Kim | Cơ hội rớt đồ 1-of-1 |
| **Ngày 7** | **Thần Tướng JaeBin Thức Tỉnh 6★** + Khung Avatar Cyber Hoàng Kim | Tối thượng chiến lực |

---

### Sự Kiện 3: Vòng Quay May Mắn Kim Cương (Lucky Cyber Wheel)
- **Cơ chế**:
  - Mỗi ngày nhận 1 Lượt Quay Miễn Phí.
  - Mỗi lượt quay tiếp theo tiêu hao 100 Kim Cương (hoặc 1 Vé Quay May Mắn).
- **Cơ cấu giải thưởng**:
  1. **Ô ĐẶC BIỆT (0.1%)**: 1-of-1 Sovereign Token (Đổi trang bị độc bản).
  2. **Ô KIM CƯƠNG ĐẠI PHÁT (1.5%)**: Nổ Hũ 10,000 Kim Cương!
  3. **Ô VŨ KHÍ MYTHIC (3.4%)**: Kiếm Phản Vật Chất Lôi Thần.
  4. **Ô VÀNG ĐẠI LỘC (20%)**: 500,000 Vàng.
  5. **Ô VÉ GACHA (25%)**: 3 Vé Bóc Pack Hoàng Kim.
  6. **Ô ĐÁ CƯỜNG HÓA (50%)**: 20 Đá Nâng Cấp Titan.

---

### Sự Kiện 4: Street Pass Mùa 1 — Chiến Dịch Cyber Phố Cổ 2026
- **Cơ chế**: Hoàn thành nhiệm vụ ngày và nhiệm vụ tuần để tích lũy Điểm Chiến Công (Exp Pass) mở khóa 30 cấp bậc thưởng.
- **2 Tầng Phần Thưởng**:
  - **Tầng Miễn Phí (Free Pass)**: Tổng cộng 1,500,000 Vàng, 3,000 Kim Cương, 20 Vé Gacha, Rương Tướng Epic.
  - **Tầng Hoàng Kim (Premium Pass - 999 KC)**: Mở khóa Skin Độc Quyền *JaeBin Cyber Samurai*, Cánh Lôi Thần Vũ Trụ, 15,000 Kim Cương, Hòm Trang Bị Mythic 6★.
