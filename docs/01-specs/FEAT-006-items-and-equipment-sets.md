# FEAT-006: Đặc Tả Hệ Thống Trang Bị, Bộ Đồ Giới Hạn Server (1 of 1, 10 of 10) & Lò Rèn

> **Dự án**: JaeBinPlatform (Anhem JaeBin – Ăn Chơi Điệu Nghệ)  
> **Trạng thái**: Production Ready (Approved)  
> **Phiên bản**: v1.0.0  
> **Lane**: high_risk (Kinh Tế Giới Hạn & Cường Hóa)  

---

## 1. Phân Cấp Độ Hiếm & Giới Hạn Toàn Server (Server Limit Tiers)

Khác với game gacha đại trà, Anhem JaeBin áp dụng cơ chế **Scarcity Độc Bản Số Hóa** trên Database:

| Cấp Độ Hiếm (Rarity) | Màu Nhận Diện | Giới Hạn Cả Server | Hiệu Ứng Hào Quang Thẻ Bài (Web UI) |
| :--- | :--- | :--- | :--- |
| **Sovereign (Độc Tôn)** | Hồng Neon Siêu Sáng `#ff007f` | **1 BỘ DUY NHẤT (1 OF 1)** | `.aura-sovereign`: Tia sét hồng đen, hạt lấp lánh xoay tròn, ánh sáng tỏa xung quanh |
| **Mythic (Thần Thoại)** | Đỏ Ruby Kim Cương `#ef4444` | **10 BỘ DUY NHẤT (10 OF 10)** | `.aura-mythic`: Lửa đỏ rực cháy, nhấp nháy 2 lớp viền kép neon |
| **Legendary (Huyền Thoại)** | Vàng Hoàng Gia `#f59e0b` | **100 BỘ (100 OF 100)** | `.aura-legendary`: Viền hổ phách rực rỡ, xung lực vàng kim |
| **Epic (Sử Thi)** | Tím Thạch Anh `#a855f7` | Vô hạn (Rớt Boss cao cấp) | `.aura-epic`: Hào quang tím ma thuật |
| **Rare (Hiếm)** | Xanh Dương Coban `#3b82f6` | Vô hạn (Phó bản tinh anh) | `.aura-rare`: Viền xanh lam biển sâu |
| **Fine (Tinh Tuyển)** | Xanh Lục Bảo `#10b981` | Vô hạn (Ải thông thường) | `.aura-fine`: Ánh xanh ngọc lục bảo |
| **Common (Phổ Thông)** | Xám Bạc `#64748b` | Vô hạn (Quái ven đường) | `.aura-common`: Viền vi tính tối giản |

> [!IMPORTANT]
> **Quy Chuẩn Thẻ Bài UI/UX**:
> Tuyệt đối **KHÔNG vẽ sao, số thứ tự, hay chữ độ hiếm lên phôi ảnh**.
> Toàn bộ sao (★), số edition (`#01/10` hoặc `#01/01`), và màu sắc viền hào quang đều được **Web UI (CSS & React component) tự động render** dựa trên dữ liệu server.

---

## 2. Chi Tiết Set 1 of 1 Server: SET HẮC LONG THẦN CƠ (Sovereign)

**Bộ trang bị đắt giá và quyền lực nhất toàn server JaeBinPlatform**. Chỉ có đúng 1 người duy nhất trong toàn bộ server sở hữu được cả 6 món.

### 2.1 Danh Sách 6 Món Độc Bản
1. **[Vũ Khí] Hắc Long Thần Trảm (1 of 1 Server)**:
   - ATK: +24,500 | Tỉ lệ Bạo Kích: +28% | Sát Thương Bạo Kích: +65%
   - Nội tại vũ khí: Đòn đánh thường có 40% cơ hội phóng ra Lôi Long Đen, cắn nuốt 10% thanh Break của mục tiêu.
2. **[Áo] Chiến Bào Hắc Long Nghìn Năm (1 of 1 Server)**:
   - HP: +185,000 | DEF: +9,800 | Kháng khống chế: +40%
3. **[Quần] Hắc Kim Chiến Giáp (1 of 1 Server)**:
   - DEF: +8,200 | HP: +95,000 | Phản đòn: +15%
4. **[Giày] Hắc Long Du Vân Ngoại (1 of 1 Server)**:
   - Tốc độ: +65 | Tỉ lệ Né tránh: +20% | Năng lượng khởi đầu: +2
5. **[Phụ Kiện] Nhẫn Mắt Rồng Hắc Ám (1 of 1 Server)**:
   - ATK: +12,000 | Hút máu: +18% | Xuyên giáp: +25%
6. **[Tọa Kỵ] Cơ Khí Siêu Xe Cyber-Dragon 2026 (1 of 1 Server)**:
   - HP: +250,000 | ATK: +15,000 | DEF: +7,500 | Gia tốc toàn đội: +25%

### 2.2 Hiệu Ứng Bộ Kích Hoạt (Set Bonuses)
- **Kích hoạt 2 Món**: Công Kích +25%, Tỉ lệ Bạo Kích +15%.
- **Kích hoạt 4 Món**: Nhận Khiên Hắc Long tương đương 40% HP tối đa ở đầu trận đấu; khiên nổ gây sát thương diện rộng khi vỡ.
- **Kích hoạt 6 Món (BÁ CHỦ SERVER)**:
  - Khi bắt đầu trận đấu, **cắt ngay 25% Máu Tối Đa của Boss** bằng đòn giáng Long Thần Khởi Đầu!
  - Đánh dấu **Dấu Ấn Hắc Long** lên toàn bộ kẻ địch: Mỗi khi mục tiêu trúng đòn, nhận thêm 15% sát thương chuẩn không thể giảm trừ.

---

## 3. Chi Tiết Set 10 of 10 Server: SET LÔI THẦN CYBER (Mythic)

Toàn server chỉ tồn tại đúng **10 bộ** được đánh số thứ tự từ `#01/10` đến `#10/10`. Người sở hữu có tên hiển thị trên Bảng Vinh Danh Server.

### 3.1 Danh Sách 6 Món (#01 ~ #10)
1. **[Vũ Khí] Kiếm Lôi Điện Neon Plasma**: ATK +14,800, Tốc độ +25.
2. **[Áo] Giáp Lôi Thần Cao Phân Tử**: HP +95,000, DEF +5,400.
3. **[Quần] Quần Chiến Thuật Kháng Sấm**: DEF +4,800, HP +52,000.
4. **[Giày] Ủng Siêu Âm Phản Lực**: Tốc độ +45, Né tránh +12%.
5. **[Phụ Kiện] Dây Chuyền Hạt Nhân Lôi Điện**: ATK +7,200, Hồi Nộ +1 mỗi lượt.
6. **[Tọa Kỵ] Mô Tô Lôi Thần Phân Khối Lớn Cyber-Bike**: HP +120,000, ATK +8,000.

### 3.2 Hiệu Ứng Bộ Kích Hoạt
- **2 Món**: ATK +15%, Tốc độ +15.
- **4 Món**: Đòn đánh có 35% tỉ lệ gọi Sét Phản Kích gây 180% sát thương sấm sét lên 3 mục tiêu ngẫu nhiên.
- **6 Món**: Toàn bộ đồng đội trong đội hình nhận hiệu ứng **Quá Tải Lôi Điện (Overdrive)**: Tăng 30% Sát thương kỹ năng và miễn nhiễm hoàn toàn với hiệu ứng Đóng Băng / Giảm Tốc.

---

## 4. Hệ Thống Cường Hóa (+1 đến +20)

Hệ thống cường hóa tại **Túi Đồ & Rèn** giúp tăng trực tiếp chỉ số cơ bản của trang bị:

$$\text{Chỉ số sau cường hóa} = \text{Chỉ số gốc} \times (1 + \text{Cấp Cường Hóa} \times 0.12)$$

| Cấp Cường Hóa | Tỉ Lệ Thành Công | Tiêu Hao Vàng | Tiêu Hao Kim Cương | Bảo Hiểm Thất Bại |
| :--- | :--- | :--- | :--- | :--- |
| **+1 -> +5** | 100% | 5,000 / cấp | 0 | Không bao giờ tụt cấp |
| **+6 -> +10** | 80% | 15,000 / cấp | 20 / cấp | Giữ nguyên cấp nếu thất bại |
| **+11 -> +15**| 50% | 40,000 / cấp | 50 / cấp | Rớt 1 cấp nếu không dùng Bùa May Mắn |
| **+16 -> +19**| 25% | 100,000 / cấp | 150 / cấp | Cần Đá Bảo Hiểm Rèn |
| **+20 (Cực Hạn)**| 10% | 300,000 | 500 | Tỏa Hào Quang Rực Rỡ Toàn Server |

---

## 5. Hệ Thống 5 Hòm Gacha & Quỹ Tiền Thưởng Jackpot Server

Khi người chơi mở bất kỳ hòm gacha nào, **10% giá trị kim cương/vàng** sẽ được tự động cộng vào **Quỹ Jackpot Server**.

| Cấp Hòm | Giá Mở | Tỉ Lệ Rớt Cực Phẩm | Khả Năng Nổ Jackpot |
| :--- | :--- | :--- | :--- |
| **Rương Gỗ / Đồng** | 5,000 Vàng | 1% Đồ Hiếm (Rare) | Không có |
| **Rương Bạc** | 20,000 Vàng | 5% Đồ Hiếm, 0.5% Epic | 0.01% Nhận 10% Quỹ Jackpot |
| **Rương Vàng Hoàng Gia**| 300 Kim Cương | 15% Epic, 2.5% Legendary | 0.1% Nhận 25% Quỹ Jackpot |
| **Rương Sấm Sét Lôi Thần**| 800 Kim Cương | 8% Legendary, 0.8% Set Lôi Thần (10 of 10) | 0.5% Nhận 50% Quỹ Jackpot |
| **Bảo Hạp Hắc Long Độc Tôn**| 2,000 Kim Cương| 3% Set Lôi Thần, 0.05% Set Hắc Long (1 of 1)| **1.0% NỔ TOÀN BỘ 100% QUỸ JACKPOT** |

### 5.1 Thông Báo Toàn Server (Server Announcement Ticker)
Khi bất kỳ người chơi nào trúng thưởng:
- **Nổ Jackpot**: Chuông vàng vang rền toàn server, chạy chữ hoa lệ trên thanh Ticker đầu trang:
  > *"💥 CHÚC MỪNG [TÊN NGƯỜI CHƠI] VỪA NỔ HŨ JACKPOT NHẬN [SỐ TIỀN] KIM CƯƠNG TỪ BẢO HẠP HẮC LONG!"*
- **Sở Hữu Món 1 of 1 hoặc 10 of 10**: Bắn pháo hoa rực rỡ khắp giao diện Web Portal.
