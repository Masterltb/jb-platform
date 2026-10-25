# FEAT-012: Đại Mở Rộng 10 Chương (100 Ải), Roster 50 Tướng, Gacha Nhân Vật & Vật Phẩm Tiến Hóa, 4 Boss Khung Giờ & Đua Lực Chiến

> **Mã Spec**: `FEAT-012`  
> **Risk Lane**: `normal`  
> **Trạng thái**: `APPROVED`  
> **Tác giả**: Solo Dev + AI Synergy  
> **Thuộc hệ thống**: Harness Engineering Framework (HEF v4.0.0)

---

## 1. Mục Tiêu & Yêu Cầu Tổng Quan

Dựa trên yêu cầu trực tiếp từ Nhà Phát Triển / Người Chơi:
1. **Tiến trình Chiến Dịch Tự Động (Auto-Advance & Clear State)**:
   - Khi vượt qua ải/chương chưa cập nhật hoàn thành, hệ thống phải cập nhật trạng thái `isCleared = true` và `isUnlocked = true` cho ải tiếp theo.
   - Khi hoàn thành ải số 10 của một chương: Chương đó được đánh dấu hoàn thành, mở khóa chương kế tiếp và giao diện tự động chuyển sang chương mới.
2. **Hệ Thống 10 Chương (Mỗi Chương 10 Ải = 100 Ải Chiến Dịch)**:
   - 10 khu vực bản đồ đặc sắc với độ khó tăng dần (CP đề xuất từ 1,500 đến 1,200,000+).
   - Mỗi chương có 9 ải quái tinh anh và 1 ải Boss Tối Thượng ở ải thứ 10.
3. **4 Sự Kiện Boss Thế Giới Theo Khung Giờ (Scheduled World Bosses)**:
   - Khung 1: `12:00 - 13:00` — Boss **Cửu Linh Thị Xà** (Thần Mãng Độc Trạch).
   - Khung 2: `18:00 - 19:00` — Boss **Sư Đà Yêu Vương** (Kim Cương Bất Hoại).
   - Khung 3: `20:00 - 21:00` — Boss **Kim Bằng Quỷ Điêu** (Tốc Độ Bão Tố).
   - Khung 4: `22:00 - 23:00` — Boss Tối Cao **Thái Cổ Lôi Thần** (Thần Thoại Hư Không).
   - Trạng thái trực tiếp: Đang diễn ra, đếm ngược thời gian kết thúc hoặc đếm ngược mở cổng tiếp theo.
4. **Sự Kiện Đua Lực Chiến Toàn Server (CP Race)**:
   - Bảng xếp hạng Lực Chiến (CP Leaderboard) thời gian thực.
   - Mốc thưởng bậc chiến lực và danh hiệu Đệ Nhất Chiến Thần.
5. **Gacha Bóc Nhân Vật & Vật Phẩm Nâng Cấp/Tiến Hóa Bậc Thang**:
   - Hòm gacha có tỷ lệ triệu hồi Thẻ Nhân Vật trực tiếp (từ Common đến Mythic/Sovereign).
   - Tỷ lệ rơi vật phẩm tiến hóa tương ứng với cấp bậc:
     - 1★ -> 2★: Đá Tiến Hóa Thường (*Common*)
     - 2★ -> 3★: Đá Tinh Chế Lam (*Fine*)
     - 3★ -> 4★: Tinh Thể Huyền Lam (*Rare*)
     - 4★ -> 5★: Linh Ngọc Tím Thạch Anh (*Epic*)
     - 5★ -> 6★: Hồn Ngọc Hoàng Kim (*Legendary*)
     - 6★ Thần Thoại Thức Tỉnh: Hạt Nhân Lôi Thần (*Mythic*) + Ấn Ký Duy Nhất (*Sovereign* - Cực hiếm).
6. **Roster 50 Nhân Vật Hoàn Chỉnh**:
   - Trải đều 5 Phái / Phe phái: JaeBin Syndicate, Cơ Khí Phố Đêm, Băng Dạ Quang, Sát Thủ Cyber, Thần Bí Tây Bắc.
   - Độ hiếm từ Sovereign (Server Unique 1-of-1) đến Common.

---

## 2. Danh Sách 10 Chương (100 Ải Chiến Dịch)

| Chương | Tên Chương & Bối Cảnh | Ải | Boss Cuối (Ải 10) | CP Đề Xuất | Phần Thưởng Tiêu Biểu |
|:---|:---|:---:|:---|:---:|:---|
| **Ch.1** | Phố Cổ Hà Nội — Bão Đèn Neon | 1 - 10 | Trùm Ma Men Phố Tạ Hiện | 1,500 - 5,000 | Đá Nâng Cấp Common, Thẻ Tân Binh |
| **Ch.2** | Cảng Biển Cyber Hải Phòng | 11 - 20 | Thuyền Trưởng Cơ Khí Bạch Đằng | 5,500 - 15,000 | Đá Tinh Chế Fine, Rương Gacha Bạc |
| **Ch.3** | Đỉnh Mẫu Sơn Băng Phong | 21 - 30 | Băng Ma Lãnh Khốc Đỉnh Núi | 16,000 - 35,000 | Tinh Thể Huyền Lam Rare, Giáp Tuyết |
| **Ch.4** | Hầm Mỏ Titan Vùng Than | 31 - 40 | Titan Búa Máy Hầm Lò Sâu | 36,000 - 65,000 | Mảnh Thẻ Tướng Epic, Ngọc Cường Hóa |
| **Ch.5** | Tháp Trời Lăng Kính Cyber | 41 - 50 | Trí Tuệ Nhân Tạo Siêu Cấp X-9 | 70,000 - 110,000 | Linh Ngọc Tím Thạch Anh, Rương Vàng |
| **Ch.6** | Rừng Đước Bionic Cà Mau | 51 - 60 | Thủy Quái Đột Biến Gen Đầm Lầy | 115,000 - 180,000 | Hồn Ngọc Hoàng Kim, Vũ Khí Cyber |
| **Ch.7** | Cao Nguyên Đất Đỏ Tây Nguyên | 61 - 70 | Hùng Kê Lửa Thần Rừng Già | 190,000 - 280,000 | Thẻ Tướng SSR, Đá Tinh Luyện Cao Cấp |
| **Ch.8** | Cố Đô Huyền Bí Sông Hương | 71 - 80 | Hắc Y Kiếm Tiên Cung Đình Cổ | 300,000 - 450,000 | Mảnh Thần Khí Mythic, Phù Chú Cổ |
| **Ch.9** | Đảo Ngọc Lượng Tử Phú Quốc | 81 - 90 | Leviathan Hạt Nhân Biển Sâu | 480,000 - 750,000 | Hạt Nhân Lôi Thần Mythic, Thẻ Thần |
| **Ch.10**| Tòa Thành Hư Không Vô Cực | 91 - 100| JaeBin Vô Thượng Thần Tối Cao | 800,000 - 1,200,000| **Ấn Ký Sovereign**, Danh Hiệu Thần Cấp |

### Quy Tắc Chuyển Chương Tự Động (Auto-Advance Algorithm):
```typescript
function onStageVictory(clearedStageId: string) {
  // 1. Cập nhật ải hiện tại thành cleared
  stages[clearedStageId].isCleared = true;
  
  // 2. Mở khóa ải tiếp theo
  const nextStage = getNextStage(clearedStageId);
  if (nextStage) {
    nextStage.isUnlocked = true;
  }
  
  // 3. Nếu là ải cuối cùng của chương (Stage 10)
  if (isLastStageOfChapter(clearedStageId)) {
    const currentChapter = getCurrentChapter(clearedStageId);
    chapters[currentChapter].isCleared = true;
    
    const nextChapter = currentChapter + 1;
    if (chapters[nextChapter]) {
      chapters[nextChapter].isUnlocked = true;
      // Tự động chuyển camera/giao diện sang chương mới
      setActiveChapter(nextChapter);
    }
  }
}
```

---

## 3. Hệ Thống 4 Khung Giờ Boss Thế Giới & Đua Lực Chiến

### 3.1. 4 Khung Giờ Boss Thế Giới
1. **Ca Trưa (12:00 - 13:00)**: Cửu Linh Thị Xà — Rơi nhiều Đá Tinh Chế & Rương Gacha.
2. **Ca Chiều (18:00 - 19:00)**: Sư Đà Yêu Vương — Rơi nhiều Tinh Thể Hiếm & Thẻ Anh Hùng.
3. **Ca Tối (20:00 - 21:00)**: Kim Bằng Quỷ Điêu — Rơi Linh Ngọc Tím & Rương Hoàng Kim.
4. **Ca Đêm (22:00 - 23:00)**: Thái Cổ Lôi Thần (Boss Đỉnh Cấp) — Rơi Mảnh Mythic & Ấn Ký Thần Thoại.

### 3.2. Bảng Xếp Hạng Đua Lực Chiến (CP Race Leaderboard)
- Xếp hạng theo tổng CP đội hình cao nhất của người chơi.
- Top 1: Danh hiệu "Chiến Thần Vô Song" + Rương Thần Khí Tối Thượng Sovereign.
- Top 2 - 3: Rương Thần Thoại Mythic + 10x Vé Quay Cao Cấp.
- Top 4 - 10: Rương Hoàng Kim Legendary + 5,000 Kim Cương.
- Top 11 - 50: Rương Tinh Anh Epic.

---

## 4. Hệ Thống Vật Phẩm Tiến Hóa Phân Tầng & Gacha Nhân Vật

### 4.1. Bảng Phân Tầng Vật Phẩm Tiến Hóa
| Cấp Sao Mục Tiêu | Vật Phẩm Yêu Cầu | Số Lượng Cần | Nguồn Rơi Chính |
|:---|:---|:---:|:---|
| **1★ -> 2★** | Đá Tiến Hóa Sơ Cấp (`mat_evo_common`) | 100 | Chương 1-2, Gacha Thường |
| **2★ -> 3★** | Đá Tinh Chế Lam (`mat_evo_fine`) | 250 | Chương 3-4, Boss Ca Trưa |
| **3★ -> 4★** | Tinh Thể Huyền Lam (`mat_evo_rare`) | 500 | Chương 5-6, Boss Ca Chiều |
| **4★ -> 5★** | Linh Ngọc Tím Thạch Anh (`mat_evo_epic`) | 1,000 | Chương 7-8, Boss Ca Tối |
| **5★ -> 6★** | Hồn Ngọc Hoàng Kim (`mat_evo_legendary`) | 2,500 | Chương 9-10, Đua Lực Chiến |
| **6★ -> Thần Cấp**| Hạt Nhân Lôi Thần Mythic (`mat_evo_mythic`) + Ấn Ký Duy Nhất (`mat_evo_sovereign`) | 5,000 + 1 | Boss Đêm 22h, Hòm Sovereign |

### 4.2. Gacha Tướng & Vật Phẩm
- Thêm tab gacha: **"CHIÊU MỘ ANH HÙNG & KHO BÁU TIẾN HÓA"**
- Tỷ lệ:
  - 15% Rơi Thẻ Nhân Vật trực tiếp.
  - 45% Rơi Vật Phẩm Tiến Hóa (theo cấp bậc rương).
  - 40% Rơi Trang Bị & Thần Khí.

---

## 5. Roster 50 Nhân Vật Chuẩn Hóa
- **Sovereign (Duy nhất 1 server)**:
  1. `hero_sovereign_jaebin`: JaeBin Thần Thoại Ăn Chơi Điệu Nghệ (CP: 999,999)
- **Mythic (5 Tướng Thần Thoại)**:
  2. `hero_mythic_loithan`: Thái Cổ Lôi Thần Sơn Tinh
  3. `hero_mythic_thuatinh`: Thủy Tinh Ma Thần Biển Cả
  4. `hero_mythic_thanhgiong`: Thiên Vương Thiết Mã Gióng
  5. `hero_mythic_ancau`: An Cậu Đế Vương Bóng Tối
  6. `hero_mythic_phuonghoang`: Hỏa Phượng Hoàng Tái Sinh
- **Legendary (14 Tướng Hoàng Kim SSR)**:
  7 - 20: Tướng SSR với tuyệt kỹ phong phú, chỉ số CP 150,000 - 350,000.
- **Epic (15 Tướng Tinh Anh SR)**:
  21 - 35: Tướng SR phục vụ mid-game.
- **Rare & Common (15 Tướng Cơ Bản R & N)**:
  36 - 50: Tướng mở đầu và nguyên liệu dung hợp.

---

## 6. Tiêu Chí Nghiệm Thu (Acceptance Criteria)
- [x] Đầy đủ 10 chương x 10 ải = 100 ải, có thể chọn và hiển thị đầy đủ trên Map.
- [x] Khi đánh thắng ải 10, chương cập nhật đã hoàn thành và tự động chuyển camera sang chương mới.
- [x] Tab Sự Kiện có mục 4 Khung Giờ Boss Thế Giới với đếm ngược và trạng thái Tham Gia.
- [x] Có bảng xếp hạng Đua Lực Chiến (CP Race) cùng mốc phần thưởng tương ứng.
- [x] Hòm Gacha có khả năng chiêu mộ Tướng và rơi Vật Phẩm Tiến Hóa theo từng độ hiếm.
- [x] Giao diện Tăng Sao Nhân Vật tiêu thụ đúng loại vật phẩm tiến hóa theo bậc sao.
- [x] Build Next.js & NestJS không có lỗi compile.
