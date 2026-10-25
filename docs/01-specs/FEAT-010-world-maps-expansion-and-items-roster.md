# FEAT-010: Bản Đồ Thế Giới Mở Rộng (5 Chương Chiến Dịch), Trang Bị & Nhân Vật Mới

> **Nền tảng**: Harness Engineering Framework (HEF v4.0.0)  
> **Dự án**: JaeBinPlatform (Anhem JaeBin – Ăn Chơi Điệu Nghệ)  
> **Trạng thái**: Approved & Specification Standard  

---

## 1. Tổng Quan Kiến Trúc Bản Đồ Chiến Dịch (5 Chương)

Thế giới JaeBinPlatform mở rộng thành 5 Chương bản đồ với 25 ải chiến dịch, mỗi chương có môi trường độc bản, cơ chế quái, trùm khu vực và tỷ lệ tích lũy AFK tăng tiến theo cấp số nhân:

```
[Chương 1: Phố Cổ Hà Nội] 
   └── Ải 1-1 đến 1-5 (Boss: Đại Ca Phố Cổ - Cửu Linh Thị Xã) • Thu nhập AFK: 120 Vàng/phút
[Chương 2: Cảng Biển Cyber Hải Phòng]
   └── Ải 2-1 đến 2-5 (Boss: Kim Bảng Quỷ Vương - Hắc Sa Tướng Quân) • Thu nhập AFK: 350 Vàng/phút
[Chương 3: Đỉnh Mẫu Sơn Băng Phong]
   └── Ải 3-1 đến 3-5 (Boss: Tuyết Sơn Yêu Cơ - Hàn Băng Ma Thú) • Thu nhập AFK: 850 Vàng/phút
[Chương 4: Hầm Mỏ Titan Vùng Than Quảng Ninh]
   └── Ải 4-1 đến 4-5 (Boss: Sư Đà Vương - Titan Cự Thần) • Thu nhập AFK: 1,800 Vàng/phút
[Chương 5: Tháp Trời Lăng Kính Cyber Neon 2026]
   └── Ải 5-1 đến 5-5 (Boss: Thái Cổ Lôi Thần - Chúa Tể Hư Không) • Thu nhập AFK: 3,500 Vàng/phút
```

---

## 2. Bảng Thông Số 25 Ải & Trùm Khu Vực

| Chương | Tên Ải | Cấp Yêu Cầu | Lực Chiến (CP) | Trùm Ải / Tinh Anh | Phần Thưởng Vượt Ải Lần Đầu | Tỷ Lệ Rơi Trang Bị |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1: Phố Cổ** | 1-1: Hàng Ngang | Lv.1 | 5,000 | Du Côn Đường Phố | 10,000 Vàng, 50 KC | Common - Fine |
| | 1-2: Hàng Đào | Lv.5 | 15,000 | Ninja Chợ Đêm | 20,000 Vàng, 100 KC | Fine - Rare |
| | 1-3: Chợ Đồng Xuân | Lv.10 | 35,000 | Đao Khách Ngõ Gạch | 35,000 Vàng, 150 KC | Rare |
| | 1-4: Cầu Long Biên | Lv.15 | 60,000 | Tinh Anh Phố Cổ | 50,000 Vàng, 200 KC | Rare - Epic |
| | 1-5: Tổng Hành Dinh | Lv.20 | 100,000 | **Đại Ca Phố Cổ** | Rương Epic Chọn, 500 KC | Epic (100%) |
| **2: Cảng Hải Phòng** | 2-1: Cầu Bính Cyber | Lv.25 | 160,000 | Hải Tặc Cảng Đỏ | 70,000 Vàng, 250 KC | Rare - Epic |
| | 2-2: Kho Hàng Container | Lv.30 | 240,000 | Robot Tuần Tra Cảng | 90,000 Vàng, 300 KC | Epic |
| | 2-3: Bến Tàu Quốc Tế | Lv.35 | 350,000 | Thủy Quái Đột Biến | 120,000 Vàng, 400 KC | Epic - Legendary |
| | 2-4: Tàu Ngầm Hắc Sa | Lv.40 | 500,000 | Hắc Sa Đại Tướng | 160,000 Vàng, 500 KC | Legendary (30%) |
| | 2-5: Đài Chỉ Huy Hắc Sa | Lv.45 | 700,000 | **Kim Bảng Quỷ Vương** | Vũ Khí Legendary, 800 KC | Legendary (100%) |
| **3: Mẫu Sơn Băng** | 3-1: Chân Đèo Tuyết | Lv.50 | 950,000 | Băng Lang Quái | 200,000 Vàng, 600 KC | Epic - Legendary |
| | 3-2: Rừng Tùng Đóng Băng | Lv.55 | 1,250,000 | Băng Tinh Ma Nữ | 250,000 Vàng, 700 KC | Legendary |
| | 3-3: Cung Điện Gió Bắc | Lv.60 | 1,650,000 | Hộ Pháp Băng Phong | 320,000 Vàng, 850 KC | Legendary |
| | 3-4: Vực Sâu Vĩnh Cửu | Lv.65 | 2,100,000 | Băng Long Ma Thú | 400,000 Vàng, 1,000 KC | Legendary - Mythic |
| | 3-5: Đỉnh Cực Bắc | Lv.70 | 2,700,000 | **Tuyết Sơn Yêu Cơ** | Giáp Trụ Mythic, 1,500 KC | Mythic (50%) |
| **4: Vùng Than Titan** | 4-1: Mỏ Lộ Thiên Cọc Sáu | Lv.75 | 3,400,000 | Quái Thạch Thiết Giáp | 500,000 Vàng, 1,200 KC | Legendary - Mythic |
| | 4-2: Lò Luyện Titan Cyber | Lv.80 | 4,200,000 | Người Máy Nhiệt Hạch | 650,000 Vàng, 1,400 KC | Mythic |
| | 4-3: Giếng Than Sâu 300m | Lv.85 | 5,200,000 | Ma Quáng Cổ Xưa | 800,000 Vàng, 1,600 KC | Mythic |
| | 4-4: Lòng Núi Kim Cương | Lv.90 | 6,500,000 | Titan Cự Long | 1,000,000 Vàng, 2,000 KC | Mythic (80%) |
| | 4-5: Đền Thờ Titan Cổ | Lv.95 | 8,000,000 | **Sư Đà Vương (Titan)** | Vũ Khí Mythic 5★, 3,000 KC | Mythic (100%) |
| **5: Tháp Lăng Kính** | 5-1: Cổng Trời Lăng Kính | Lv.100 | 10,000,000 | Thiên Sứ Cyber | 1,500,000 Vàng, 2,500 KC | Mythic |
| | 5-2: Tầng Không Gian Ảo | Lv.105 | 12,500,000 | Ảo Ảnh Hư Không | 2,000,000 Vàng, 3,000 KC | Mythic |
| | 5-3: Lõi Năng Lượng Vũ Trụ | Lv.110 | 15,500,000 | Hộ Vệ Thần Giới | 2,800,000 Vàng, 4,000 KC | Mythic - Sovereign |
| | 5-4: Bệ Ngai Lôi Thần | Lv.115 | 19,000,000 | Lôi Thần Hộ Pháp | 3,800,000 Vàng, 5,000 KC | Sovereign Mảnh (20%) |
| | 5-5: Đỉnh Tháp Vô Tận | Lv.120 | 25,000,000 | **Thái Cổ Lôi Thần** | Ấn Ký Vô Song, 10,000 KC | **Sovereign 1-of-1** |

---

## 3. Bổ Sung Bách Khoa Trang Bị Mới (New Equipment Sets)

### Set 1: Bộ Vô Song Bá Vương (Sovereign 1-of-1)
- **Cơ chế**: Toàn server chỉ tồn tại đúng 1 set duy nhất, định danh theo số Serial #01/01.
- **Vũ khí**: *Hoàng Kim Trảm Long Đao [Sovereign]* (ATK +12,800, Crit +25%, Tỷ lệ chí mạng x2.5).
- **Áo giáp**: *Bá Vương Hắc Long Bào* (HP +65,000, DEF +3,500, Kháng 40% sát thương trùm).
- **Hiệu ứng Set 6 món**: Khi HP tụt dưới 30%, lập tức hồi 100% HP và miễn nhiễm mọi sát thương trong 5 giây (Hồi chiêu 180s).

### Set 2: Bộ Cyber Neon Void (Mythic)
- **Vũ khí**: *Phản Vật Chất Lôi Thần Kiếm* (ATK +7,500, Tốc đánh +30%).
- **Trang sức**: *Vòng Cổ Hư Không Cyber* (Crit Rate +18%, Bỏ qua 25% Giáp Boss).
- **Hiệu ứng Set 4 món**: Mỗi đòn đánh thường tích lũy 1 tầng Phản Vật Chất, đủ 5 tầng phát nổ gây 250% sát thương diện rộng.

---

## 4. Bổ Sung Nhân Vật Mới (New Roster Additions)

1. **JaeBin Chúa Tể Lôi Đình (Sovereign 6★)**:
   - Vai trò: Chủ Lực / Sát Thủ Đột Phá.
   - Tuyệt kỹ: *Cửu Thiên Lôi Giới (Vạn Lôi Quy Tông)* — Gây 120,000 sát thương chuẩn, phá vỡ thanh Stagger của Boss ngay lập tức.
2. **Hồng Tuyết Cơ (Mythic 5★)**:
   - Vai trò: Khống Chế / Hỗ Trợ Đóng Băng.
   - Kỹ năng: *Hàn Băng Thần Chưởng* — Đóng băng toàn bộ hộ vệ của Boss trong 4 giây.
3. **Quang Thần Tướng (Legendary 5★)**:
   - Vai trò: Tiên Phong Đỡ Đòn (Super Tanker).
   - Kỹ năng: *Kim Cang Bất Hoại Thể* — Tăng 80% DEF và phản lại 30% sát thương nhận vào.
