# FEAT-001: Bàn Đấu Boss Đội Hình 6 Thẻ Bài & Thanh Style "Ăn Chơi Điệu Nghệ"

> **Mã đặc tả:** FEAT-001  
> **Trạng thái:** Approved for Prototype (Web Card Battler)  
> **Áp dụng cho:** `apps/web-portal/` (Next.js/React Card Engine) & `services/game-backend/`  
> **Người thực hiện:** Solo Dev + AI Assistant  

---

## 🃏 1. Mục tiêu & Trải nghiệm người chơi

Hệ thống chiến đấu thẻ bài chiến thuật là linh hồn của tựa game **Anhem JaeBin**. Mục tiêu là mang lại cảm giác săn Boss dồn dập, mãn nhãn với phong cách Gen Z và hệ thống Bento Grid 2026:
- **Đội hình 6 Thẻ Bài Nhân Vật (6-Card Squad)**: Thay vì chỉ điều khiển 1 nhân vật đơn lẻ, người chơi xây dựng một băng nhóm 6 thẻ bài phối hợp nhịp nhàng:
  - **2 Tiền tuyến (Frontline / Tanker)**: Hút sát thương, dựng khiên chắn, làm choáng (Stun) Boss.
  - **3 Hàng giữa (Midline / Burst DPS & Debuffer)**: Xả sát thương chí mạng, tung combo chiêu thức, bào mòn thanh Giáp Break của Boss.
  - **1 Hàng sau (Backline / Style Amplifier & Healer)**: Hồi máu, hack Năng Lượng và tăng tốc độ tích lũy thanh Style.
- **Thanh Style "Ăn Chơi Điệu Nghệ" ($D \to SSS$)**: Thước đo độ nghệ thuật của chuỗi đòn đánh. Càng tạo nhiều combo liên hoàn giữa các thẻ, điểm Style càng tăng vọt.
- **Tuyệt Kỹ Hợp Kích 6 Thẻ (All-Out 6-Card Resonance Attack)**: Khi đạt **Style Rank SSS**, mở khóa đòn hợp lực toàn đội hình, kích hoạt animation điện ảnh quét sạch thanh máu của Boss.

---

## 🎴 2. Chi tiết Cơ chế Đấu Boss (Boss Battle Mechanics)

### 2.1. Cấu trúc Bàn Đấu Bento Grid (Layout Chuẩn 2026)

```text
+---------------------------------------------------------------------------------------+
|  [BOSS TILE: ĐẠI CA PHỐ CỔ (BÁ QUYỀN HẮC LONG)]     | [STYLE METER TILE]              |
|  - Máu: [============================== 85,000 HP]   | Rank: [ SSS ] (980/1000)        |
|  - Giáp Break: [==========---- 1,500/2,500]          | Buff: +60% Sát thương toàn đội  |
|  - Ý định ra đòn: [⚠️ Tuyệt Kỹ Bổ Củi vào Hàng Trước]  | [>> ALL-OUT RESONANCE READY <<] |
+------------------------------------------------------+---------------------------------+
|                                                                                       |
|  [ĐỘI HÌNH 6 THẺ BÀI CHIẾN ĐẤU (FORMATION 2x3)]                                       |
|                                                                                       |
|  TIỀN TUYẾN:   [THẺ 1: Long Bida (Tank)]           [THẺ 2: Hùng Xe Độ (Vanguard Stun)] |
|  HÀNG GIỮA:    [THẺ 3: JaeBin (Burst Leader)]      [THẺ 4: Linh Neon (Crit Assassin)]  |
|                [THẺ 5: Tuấn Cyber (Debuffer)]                                         |
|  HÀNG SAU:     [THẺ 6: Mai Dạ Quang (Style Healer)]                                   |
|                                                                                       |
+---------------------------------------------------------------------------------------+
|  [KHAY THẺ BÀI HÀNH ĐỘNG RÚT RA TỪ 6 THẺ]            | [NĂNG LƯỢNG PHỐ: ⚡ 5/5]        |
|  [Đòn Cơ Bida] [Nẹt Pô Stun] [Chém Neon] [Hack Điện] | [NÚT KẾT THÚC LƯỢT]            |
+---------------------------------------------------------------------------------------+
```

### 2.2. Vòng Lặp Lượt Đấu (Turn Cycle & Shared Energy)
1. **Năng Lượng Phố Chia Sẻ (Shared Street Energy)**:
   - Toàn đội 6 thẻ dùng chung một bình Năng Lượng (mặc định $5$ điểm mỗi lượt).
   - Mỗi thẻ kỹ năng tiêu hao từ $1$ đến $3$ Energy. Người chơi phải tính toán dùng Năng lượng cho Tanker dựng khiên hay cho Carry xả sát thương.
2. **Cơ Chế Bẻ Giáp Boss (Stance / Break System)**:
   - Boss sở hữu **Thanh Máu (HP)** và **Thanh Giáp (Break Gauge)**.
   - Khi bị tấn công bởi các chiêu thức nặng đô (như *Cú Bốc Đầu của Hùng Pô* hoặc *Gậy Bida Titan của JaeBin*), thanh Break của Boss tụt nhanh.
   - Khi Break về $0$: Boss rơi vào trạng thái **Choáng Váng (Staggered)** trong 1 lượt, nhận thêm **$+50\%$ sát thương** từ toàn bộ đội hình.

---

## 🔥 3. Thanh Style "Ăn Chơi Điệu Nghệ" (Style Meter System)

### 3.1. Các bậc Rank Style & Hiệu Ứng Bàn Đấu
Điểm Style tích lũy từ $0$ đến $1000$ điểm:

| Bậc Rank | Tên gọi | Điểm yêu cầu | Buff Toàn Bộ 6 Thẻ | Hiệu ứng Giao diện Neo-Brutalist |
| :---: | :---: | :---: | :---: | :---: |
| **D** | **Tập Sự** | $0 - 150$ | $+0\%$ Sát thương | Badge xám mờ góc màn hình. |
| **C** | **Có Nét** | $151 - 350$ | $+8\%$ Sát thương | Badge xanh lục neon, tia điện chạy viền. |
| **B** | **Dân Chơi** | $351 - 550$ | $+15\%$ Sát thương | Badge xanh cyan, các thẻ phát sáng nhẹ. |
| **A** | **Khét Lẹt** | $551 - 750$ | $+25\%$ Sát thương | Badge tím neon, viền Bento rực lửa hologram. |
| **S** | **Bá Cháy** | $751 - 900$ | $+40\%$ Sát thương | Badge vàng kim, mở khóa Tuyệt Kỹ cá nhân. |
| **SSS** | **Ăn Chơi Điệu Nghệ** | $901 - 1000$ | **$+60\%$ Sát thương + Hồi 2 Energy** | Bàn đấu nổ pháo hoa neon, bass 808 cực bốc, **mở khóa Hợp Kích 6 Thẻ!** |

### 3.2. Cơ Chế Hợp Kích 6 Thẻ (All-Out 6-Card Resonance Attack)
- Khi đạt Style Rank SSS, nút **ALL-OUT RESONANCE** phát sáng cực đại.
- Khi người chơi nhấn kích hoạt:
  1. Toàn bộ sàn đấu tối lại, nhạc nền chuyển sang drop beat cực căng.
  2. 6 thẻ bài lần lượt phóng ra giữa màn hình thành vòng tròn trận đồ lục giác.
  3. Cả 6 nhân vật xuất chiêu đồng loạt: *Long Bida hất tung -> Tuấn Cyber phóng sét -> Linh Neon chém lướt -> Hùng Pô nẹt pô rung chuyển -> Mai Dạ Quang buff ánh sáng -> JaeBin phi siêu xe giáng đòn chí mạng*.
  4. Gây ra tổng cộng **$1,500\% \text{ Team ATK}$** sát thương lên Boss, chắc chắn kết liễu hoặc đẩy Boss sang giai đoạn chuyển pha.

---

## ⚡ 4. Game "Juice" & Tương Tác Xúc Giác (Tactile Micro-Interactions)

1. **Hiệu Ứng 3D Parallax & Hologram Foil**:
   - Khi di chuyển chuột trên bàn đấu, toàn bộ 6 thẻ bài nghiêng $12^{\circ}$ theo góc nhìn tạo chiều sâu 3D chân thực.
   - Các thẻ có trang bị Legendary phản chiếu ánh sáng cầu vồng sắc nét.
2. **Hit Stop & Chấn Động Màn Hình (Screen Shake)**:
   - Mỗi cú đập thẻ bài vào Boss có độ trễ $0.06s$ (Hit stop) tạo cảm giác đòn đánh có trọng lực nặng nề.
   - Text sát thương nhảy số dạng 3D pop-out với hiệu ứng khói neon bay lên.
3. **Sticker Phản Hồi Trận Đấu**:
   - Khi né đòn thành công: Dán nhãn sticker neon *"NÉ KHÉT LẸT!"* đè lên thẻ bài.
   - Khi nổ đòn chí mạng: Dán nhãn *"BÁ CHÁY!"* kèm tiếng reo hò.
