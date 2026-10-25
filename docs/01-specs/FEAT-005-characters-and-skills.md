# FEAT-005: Đặc Tả Hệ Thống Nhân Vật, Thức Tỉnh Sao & Kỹ Năng (Characters & Star Awakening)

> **Dự án**: JaeBinPlatform (Anhem JaeBin – Ăn Chơi Điệu Nghệ)  
> **Trạng thái**: Production Ready (Approved)  
> **Phiên bản**: v1.0.0  
> **Lane**: normal  

---

## 1. Triết Lý Thiết Kế 6 Nhân Vật & Duyên Phận Bài Trùng

Lấy cảm hứng từ hệ thống thẻ bài tương hỗ "Liên Minh Anh Hùng", 6 nhân vật chủ chốt đại diện cho 6 mắt xích hoàn hảo trong đội hình chiến thuật:

```
[Hàng Trước - Frontline]
⚔️ Long Bida (Đấu Sĩ / Phá Giáp)  🛡️ Hùng Pô (Siêu Tanker / Khiên Hào Quang)  ⚔️ JaeBin (Leader / Sát Thương Chủ Lực)

[Hàng Sau - Backline]
🔮 Linh Neon (Phù Thủy / Hỗ Trợ Nộ) 🎯 Tuấn Cyber (Xạ Thủ Bắn Tỉa / Khống Chế) ➕ Mai Dạ Quang (Thần Y / Hồi Phục & Hóa Giải)
```

---

## 2. Hệ Thống Thức Tỉnh Sao (1★ đến 6★ Mythic Awakening)

Mỗi nhân vật có thể nâng cấp tiến hóa từ 1★ lên 6★ thông qua **Túi Đồ & Rèn / Tiến Hóa Tướng**:

| Mốc Sao | Tiêu hao nguyên liệu | Mở khóa đặc quyền | Chỉ số cộng thêm |
| :--- | :--- | :--- | :--- |
| **1★ (Khởi Đầu)** | Mặc định sở hữu | Mở Kỹ năng thường 1 | Căn bản 100% |
| **2★ (Đột Phá)** | 50 Mảnh tướng + 10,000 Vàng | Mở Kỹ năng bị động 1 | +20% HP, +15% ATK |
| **3★ (Chiến Binh)** | 100 Mảnh + 30,000 Vàng | Tăng cấp Ultimate lên Lv 2 | +35% HP, +30% ATK |
| **4★ (Thủ Lĩnh)** | 200 Mảnh + 100 Kim Cương | Kích hoạt hào quang đồng minh | +55% HP, +50% ATK |
| **5★ (Huyền Thoại)** | 400 Mảnh + 300 Kim Cương | Mở Kỹ năng thức tỉnh 2 | +80% HP, +75% ATK |
| **6★ (Mythic Thần Thoại)**| 800 Mảnh + 1,000 Kim Cương | **Shortclip Cutscene Độc Quyền** + Phản đòn | +120% HP, +110% ATK |

---

## 3. Chi Tiết 6 Nhân Vật Chủ Lực

### 3.1 JaeBin — Đại Ca Phố Sấm (Leader / Burst DPS)
- **Hệ / Vai trò**: Lôi Hệ • Sát Thương Bùng Nổ Đơn & Đa Mục Tiêu
- **Chỉ số gốc (Lv 1 / 1★)**: HP: 2,800 | ATK: 520 | DEF: 180 | Tốc: 105
- **Chỉ số cực hạn (Lv 100 / 6★)**: HP: 320,000 | ATK: 78,500 | DEF: 24,000
- **Bộ Kỹ Năng**:
  1. *Lôi Trảo Quyết (Đánh thường)*: Gây 120% ATK, có 25% làm tê liệt đối thủ 1 hiệp.
  2. *Thiên Lôi Trảm (Chủ động)*: Tụ lôi điện chém đường chéo hàng trước, gây 260% ATK.
  3. *Hào Quang Đại Ca (Bị động)*: Tăng 15% Tấn công cho toàn bộ thành viên trong đội.
  4. *LÔI LONG PHÁ GIỚI (Ultimate Cinematic Cutscene)*: Triệu hồi Rồng Sấm khổng lồ nuốt chửng hàng ngũ địch, gây 650% ATK, làm choáng toàn bộ đội hình địch nếu đối phương có dưới 30% giáp Break.

---

### 3.2 Long Bida — Thần Cơ Cơ Bắp (Sát Thủ Cơ Khí / Đơn Trảm)
- **Hệ / Vai trò**: Cơ Giới • Bạo Kích & Hành Quyết Đơn Mục Tiêu
- **Chỉ số cực hạn**: HP: 260,000 | ATK: 89,000 | DEF: 19,500 | Tỉ lệ Crit: 45%
- **Kỹ năng chủ chốt**:
  - *Cú Thọc Lốc Xoáy*: Dồn lực vào gậy bida trợ lực, gây 350% ATK xuyên 50% giáp.
  - *HÀNH QUYẾT BẠO LỰC (Ultimate Cutscene)*: Tốc biến ra sau lưng Boss, tung chuỗi 9 cú đánh bạo liệt kết thúc bằng pha dộng gậy chấn thiên, gây sát thương gấp 3 nếu Boss dưới 40% máu.

---

### 3.3 Hùng Pô — Hộ Vệ Thần Lực (Frontline Mega Tanker)
- **Hệ / Vai trò**: Thổ Hệ • Hút Hỏa Lực, Khiên Chắn & Phản Đòn
- **Chỉ số cực hạn**: HP: 580,000 | ATK: 32,000 | DEF: 48,000 | Giảm sát thương: 35%
- **Kỹ năng chủ chốt**:
  - *Khiên Hợp Kim Titan*: Kích hoạt lá chắn hấp thụ lượng sát thương tương đương 30% HP tối đa.
  - *TIẾNG GẦM HỘ THÂN (Ultimate Cutscene)*: Giẫm nát mặt đất dựng lên bức tường năng lượng kiên cố, hút toàn bộ đòn đánh của địch về phía mình và phản lại 25% sát thương nhận vào.

---

### 3.4 Linh Neon — Nữ Chúa Điều Khiển Nhịp (Support / Tích Nộ & Tốc Độ)
- **Hệ / Vai trò**: Năng Lượng Tần Số Cao • Hỗ Trợ Đội Hình
- **Chỉ số cực hạn**: HP: 240,000 | ATK: 45,000 | DEF: 21,000 | Tốc độ: 125 (Nhanh nhất)
- **Kỹ năng chủ chốt**:
  - *Nhịp Đập Bass Siêu Trầm*: Hồi ngay 3 điểm Năng Lượng / Nộ cho toàn đội hình.
  - *SÓNG ÂM NEON CUỒNG LOẠN (Ultimate Cutscene)*: Thả sàn nhảy laser 3D làm chậm toàn bộ kẻ địch 50% và tăng 40% Tỉ lệ bạo kích cho đồng minh trong 3 hiệp.

---

### 3.5 Tuấn Cyber — Thợ Săn Không Gian (Xạ Thủ Khống Chế Tầm Xa)
- **Hệ / Vai trò**: Hư Không • Xuyên Hàng & Phá Break Gauge Cực Nhanh
- **Chỉ số cực hạn**: HP: 275,000 | ATK: 81,000 | DEF: 20,500
- **Kỹ năng chủ chốt**:
  - *Đạn Xuyên Giáp Chân Không*: Bắn xuyên từ hàng trước ra hàng sau, trừ thẳng 150,000 điểm thanh Break Stance của Boss.
  - *MƯA TÊN LỬA VỆ TINH (Ultimate Cutscene)*: Gọi vệ tinh quỹ đạo bắn 12 quả tên lửa EMP, vô hiệu hóa hoàn toàn chiêu thức tiếp theo của Boss.

---

### 3.6 Mai Dạ Quang — Thánh Nữ Thánh Thủy (Healer & Hóa Giải Hiệu Ứng)
- **Hệ / Vai trò**: Thủy / Quang • Hồi Máu Toàn Đội & Hồi Sinh
- **Chỉ số cực hạn**: HP: 310,000 | ATK: 41,000 | DEF: 26,000
- **Kỹ năng chủ chốt**:
  - *Mưa Thuốc Quang Học*: Hồi phục 25% HP tối đa cho toàn đội hình và giải trừ mọi trạng thái Độc/Chảy Máu.
  - *HỒI SINH LINH HỒN (Ultimate Cutscene)*: Tạo vòng hoa sen phát sáng bao phủ đội ngũ, hồi sinh ngay lập tức 1 đồng đội đã ngã xuống với 50% HP.

---

## 4. Bảng Duyên Phận Bài Trùng (Synergy Combos)

Khi xuất trận cùng nhau, các cặp thẻ bài kích hoạt **Hiệu Ứng Duyên Phận**:

| Cặp Bài Trùng | Nhân vật tham gia | Hiệu ứng cộng hưởng kích hoạt |
| :--- | :--- | :--- |
| **Song Long Hội Ngộ** | JaeBin + Long Bida | +25% Bạo Kích, Đòn đánh có 30% gây nổ Lôi Hỏa liên hoàn |
| **Khiên Thép Đêm Trắng**| Hùng Pô + Mai Dạ Quang | Giảm 20% sát thương phải gánh, hồi 3% HP mỗi lượt |
| **Nhịp Điệu Chết Chóc** | Linh Neon + Tuấn Cyber | Tăng 35 Tốc độ xuất chiêu, đòn xuyên giáp gây thêm Stun |
| **ANHEM JAEBIN FULL SET**| Cả 6 nhân vật cùng ra trận | Kích hoạt chiêu thức liên kích SSS All-Out Attack (+80,000 CP) |
