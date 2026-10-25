# Specification: FEAT-015 — 6-Skills Progression, In-Arena Combat VFX (No Cinematic), 5 Team Archetypes & 60+ Sovereign/Mythic Roster

## 1. Mục Đích & Bối Cảnh
Nâng tầm toàn diện hệ thống chiến đấu của JaeBinPlatform theo định hướng chiến thuật đỉnh cao:
1. **Tiến trình Kỹ năng 6 Chiêu**: Mỗi tướng khởi đầu với 3 chiêu thức căn bản. Khi thăng cấp sao/trăng/mặt trời, sức mạnh kỹ năng tăng tiến theo từng mốc.
   - Đạt **6★ (Tier 6)**: Mở khóa Kỹ năng thứ 4.
   - Đạt **6🌙 (Tier 12)**: Mở khóa Kỹ năng thứ 5.
   - Đạt **6☀️ (Tier 18)**: Mở khóa Kỹ năng thứ 6 (Thần Kỹ Tối Thượng).
2. **Loại bỏ Hoàn toàn Cutscene/Cinematic Che Màn Hình**: Tướng tự động đánh, tích Nộ (Rage 0..100) và tự động thi triển chiêu thức trực tiếp trên sàn đấu với hoạt ảnh VFX nội tại (In-Arena Combat VFX), mượt mà, không gián đoạn.
3. **Đa Dạng Hóa Hiệu Ứng Chiến Đấu Chuyên Sâu**:
   - Tạo khiên chắn bản thân / toàn đội (`SHIELD`)
   - Gây độc tích tầng ăn mòn theo thời gian (`POISON`)
   - Nổ sát thương bạo kích cực đại (`CRIT_BURST`)
   - Hồi máu bản thân & hồi máu toàn đội (`HEAL` & `TEAM_HEAL`)
   - Suy nhược giảm sát thương đối thủ (`WEAKEN`)
   - Buff tăng sát thương cho toàn đội (`TEAM_ATK_BUFF`)
   - Giải khống chế & miễn dịch trạng thái bất lợi (`CLEANSE`)
   - Bơm nộ xoay vòng tuyệt kỹ (`RAGE_BUFF`)
4. **Quy Chuẩn Gacha & Sự Kiện Mới**:
   - Bóc pack thường / cao cấp: Rơi tối đa đến bậc **Mythic** (không giới hạn số lượng tướng Mythic).
   - Tướng bậc **Sovereign**: Không còn bị giới hạn duy nhất 1 con. Tướng Sovereign chỉ có thể săn được thông qua Hòm Sự Kiện, Đánh Boss Thế Giới rơi Hòm Thần Cực (tỉ lệ hiếm), hoặc Tích Lũy Sự Kiện.
5. **5 Team Archetypes & Mở Rộng 60+ Tướng Sovereign & Mythic**:
   - Xây dựng 5 hệ đội hình chiến thuật tiêu biểu, mỗi hệ có ít nhất 6 tướng Sovereign tương ứng và dàn tướng Mythic trợ chiến (> 50 tướng tổng cộng).

---

## 2. Thiết Kế Chi Tiết 5 Team Archetypes

| Hệ Đội Hình (Archetype) | Cơ Chế Cốt Lõi | Sovereign Đại Diện (6 con/hệ) | Mythic Đại Diện (6 con/hệ) |
| :--- | :--- | :--- | :--- |
| **Độc Dược & Hủ Thực (Poison/DoT)** | Tích tầng Độc Mãng, trừ % máu tối đa, giảm 50% hồi phục của Boss | JaeBin Độc Tôn, Mạn Đà La Hậu, Vu Độc Dạ Xoa, Hắc Ám Dược Thần, Thiềm Thừ Thần Tướng, Thất Tinh Độc Long | Bọ Cạp Tử Thần, Mãng Xà U Minh, Độc Nhãn Ma, Ngô Công Thần, Tà Linh Trảo, Chu Sa Nữ |
| **Dồn Bạo Kích & Siêu Nộ (Crit/Rage)** | Dồn toàn bộ nộ và buff ATK cho chủ lực 1-hit One Shot | JaeBin Thần Kiếm Nhất Kích, Cuồng Bạo Lôi Vương, Vô Cực Kiếm Thánh, A Tu La Chiến Thần, Nộ Diễm Bá Vương, Phá Quân Tinh Tôn | Bạch Hổ Chiến Thần, Lôi Đình Thần Tướng, Phong Bạo Kiếm Sĩ, Viêm Ma Tướng, Cuồng Nộ Trảo, Thần Lôi Xạ Thủ |
| **Thần Khiên & Phản Sát (Shield/Counter)** | Tạo khiên dày hàng trăm nghìn HP, phản chấn 60% sát thương nhận vào | JaeBin Kim Cương Bất Hoại, Titan Thần Khiên, Huyền Vũ Thần Đế, Kim Cương La Hán, Thần Hộ Vệ Thái Cổ, Minh Phủ Chiến Giáp | Thiết Vệ Thần Tinh, Thạch Ma Vương, Cương Lực Thần Bổng, Hộ Pháp Kim Cang, Trấn Sơn Cự Thú, Khiên Thần Nữ |
| **Băng Phong & Suy Nhược (Freeze/Weaken)** | Giảm 40% ATK địch, đóng băng, làm chậm nộ đối phương | JaeBin Băng Thần Tuyệt Đối, Vực Thẳm Ma Vương, Phược Thần Hư Không, Minh Chủ U Hồn, Cực Hàn Tiên Nữ, Hắc Lôi Ma Quân | Tuyết Nữ Băng Cơ, Hàn Băng Dực Long, Tật Phong Quái, Băng Tinh Thần, Âm Lôi Ma Cô, Hư Ảnh Sát |
| **Bất Diệt & Thanh Tẩy (Immortal/Cleanse)** | Hồi máu liên tục toàn đội, thanh tẩy choáng/độc, bất tử 2 lượt | JaeBin Quang Minh Thánh Đế, Phượng Hoàng Niết Bàn, Bồ Đề Thánh Tôn, Bích Dao Tiên Tử, Sinh Mệnh Nữ Thần, Vạn Thọ Chân Nhân | Dược Sư Lưu Ly, Thiên Sứ Hộ Mệnh, Thánh Thủy Tinh, Linh Chi Thần Nữ, Phục Sinh Linh Điểu, Thần Mộc Lão Nhân |

---

## 3. Cơ Chế Chiến Đấu Tự Động (Auto Combat Engine & Visual VFX)
- Loại bỏ Component `UltimateCutsceneOverlay` khỏi luồng chiến đấu.
- Mỗi tướng có thanh **Nộ Khí (Rage Bar: 0..100)**:
  - Tấn công thường: +25 Nộ.
  - Nhận sát thương: +15 Nộ.
  - Kỹ năng buff nộ của đồng đội: +30..+50 Nộ.
  - Khi đạt 100 Nộ: Tự động kích hoạt **Tuyệt Kỹ Thần Cực** ngay trong lượt đánh.
- Hiển thị trực tiếp các hạt hiệu ứng (Floating status tags, colored slashes, shield bubbles, healing auras, poison smoke).
