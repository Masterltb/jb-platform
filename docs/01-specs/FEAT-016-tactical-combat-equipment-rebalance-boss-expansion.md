# FEAT-016: Đa Dạng Hóa Chiến Thuật (AoE/Single Crit, Heal+Khiên/Bất Tử), Tinh Gọn 15 Sovereign, Cân Bằng Lực Chiến Trang Bị & Thêm Boss

> **Tài liệu tham chiếu**: [AGENTS.md](file:///f:/project/repo-github/JaeBinPlatform/AGENTS.md) | [CONSTITUTION.md](file:///f:/project/repo-github/JaeBinPlatform/harness-engineering/CONSTITUTION.md)  
> **Risk Lane**: `normal`  
> **Trạng thái**: Đã phê duyệt và đang triển khai  
> **Mã Story HEF**: `US-030`  

---

## 1. Mục Tiêu & Yêu Cầu Thiết Kế

1. **Đa dạng hóa lối chơi chiến thuật (Tactical Combat Variety)**:
   - **Tướng dồn chí mạng (Crit Burst)** phân hóa thành:
     - `SINGLE_CRIT_EXECUTE`: Dồn sát thương đơn mục tiêu cực hạn vào Boss, trảm sát tăng 100% sát thương khi mục tiêu dưới 30% HP.
     - `AOE_CRIT_BURST`: Quét sạch toàn bộ Minions lân cận và gây sát thương diện rộng lên Boss.
   - **Tướng hồi phục (Heal)** phân hóa thành:
     - `HEAL_AND_SHIELD`: Vừa hồi máu vừa phủ khiên bảo vệ 150% giá trị hồi phục.
     - `HEAL_AND_IMMUNITY`: Hồi máu khẩn cấp và ban trạng thái **Bất Tử (Immunity / Death Ward)** trong 1-2 lượt (HP không thể tụt dưới 1).
2. **Tinh gọn dàn tướng Sovereign (Compact 15 Sovereign Roster)**:
   - Giảm từ 30 tướng Sovereign xuống **15 Tướng Sovereign Tinh Hoa** (3 tướng mỗi hệ trong 5 Archetypes: Poison, Crit, Shield, Control, Immortal).
   - Tăng cường chất lượng, bản sắc kỹ năng, hiệu ứng độc tôn, không bị trùng lặp hay loãng.
3. **Cân bằng lực chiến trang bị (Equipment CP Balance)**:
   - Công thức tính CP trang bị chuẩn xác dựa trên các chỉ số ATK, HP, DEF, CritRate, CritDamage, Speed, Dodge, Enhance Level.
   - Phân cấp CP trang bị rõ ràng từ Common (500 - 1,200 CP) tới Sovereign 1-of-1 (95,000 - 150,000 CP/món).
4. **Bổ sung 6 Trùm Boss Thế Giới & Ải Mới (Boss Expansion)**:
   - Bổ sung 6 Boss với cơ chế chiến đấu độc đáo: Phân thân, Trảm sát, Độc lan, Phản chấn giáp Titan, Cuồng bạo Phase 1-2-3.

---

## 2. Danh Sách 15 Tướng Sovereign Tinh Hoa (3 tướng / Hệ)

| Hệ Archetype | Tướng 1 (Chuyên Sâu A) | Tướng 2 (Chuyên Sâu B) | Tướng 3 (Đặc Biệt / Hỗ Trợ) |
| :--- | :--- | :--- | :--- |
| **Poison DoT** | `JaeBin Độc Tôn Ma Hoàng` (AoE Poison) | `U Minh Xà Hậu` (Khóa hồi máu) | `Hắc Ám Độc Tiên` (Kích nổ độc) |
| **Crit Hypercarry** | `JaeBin Lôi Thần Kiếm Đế` (Single Execute) | `Thần Kiếm Vô Cực` (AoE Crit Burst) | `Cuồng Nộ Chiến Đế` (100% Crit Buff) |
| **Shield Counter** | `JaeBin Kim Cương Bất Hoại` (Khiên Thánh Cả Đội) | `Huyền Vũ Đế Quân` (Phản 80% Sát Thương) | `Thần Khôi Thiết Vệ` (Khiên Nổ Chuẩn) |
| **Control & Weaken** | `JaeBin Băng Phong Tuyệt Cảnh` (Đóng Băng Boss) | `Hàn Băng Thần Nữ` (Giảm 50% ATK Boss) | `U Hồn Phong Ấn Sư` (Cấm Nộ) |
| **Immortal & Cleanse** | `JaeBin Cửu Chuyển Trường Sinh` (Heal + Bất Tử) | `Phục Sinh Thần Hoàng` (Heal + Khiên Sinh Mệnh) | `Dược Vương Thánh Mẫu` (Thanh Tẩy Toàn Diện) |

---

## 3. Công Thức Lực Chiến Trang Bị (Equipment CP Formula)

$$\text{CP}_{\text{item}} = (\text{ATK} \times 3.2) + (\text{HP} \times 0.6) + (\text{DEF} \times 2.0) + (\text{CritRate} \times 35,000) + (\text{CritDamage} \times 15,000) + (\text{Speed} \times 120) + (\text{DodgeRate} \times 20,000)$$

Kèm hệ số cường hóa: $\times (1 + \text{enhanceLevel} \times 0.06)$.
