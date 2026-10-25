# Spec FEAT-009: Live UI/UX & Backend Relational Database Integration

> **Feature Code**: `FEAT-009`  
> **Risk Lane**: `normal`  
> **Status**: `PROPOSED`  
> **Authors**: JaeBin Core Team & AI Synergy  
> **Surfaces**: `apps/web-portal/` & `services/game-backend/`  
> **Related Specs**: [FEAT-007](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-007-production-ready-dashboards-and-balance.md), [FEAT-008](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-008-backend-database-production-ready.md)

---

## 🎯 1. MỤC TIÊU CỐT LÕI (OBJECTIVES)
Nâng cấp trải nghiệm người dùng (UI/UX) trên toàn bộ 6 Dashboard tương ứng với hệ thống Backend & Database vừa xây dựng:
1. **Live Server Indicator & Auth Profile Modal**:
   - Hiển thị huy hiệu kết nối thời gian thực: `🟢 LIVE DB CONNECTED` khi kết nối tới NestJS Fastify (`http://localhost:3001`), tự động chuyển sang `🟡 OFFLINE FALLBACK` nếu mất kết nối.
   - Nút thông tin tài khoản hiển thị Username (`JaeBinMaster`), Level, Tổng Lực Chiến ($\mathbf{CP}$) và mở Modal Đăng Nhập / Đăng Ký tài khoản mới.
2. **Tương tác Gacha 3D Live Database**:
   - Thao tác mở hòm trong `GachaView.tsx` gọi trực tiếp API `POST /api/gacha/open`, trừ Vàng/Kim Cương thực tế từ Database, sinh trang bị mới và hiển thị thẻ lật 3D.
3. **Tương tác Lò Rèn (Forge, Fusion & Dismantle) Live Database**:
   - `InventoryAndUpgradeView.tsx` kết nối với API `/api/inventory/enhance`, `/api/inventory/fuse`, `/api/inventory/dismantle`, lưu trạng thái cường hóa và dung luyện trực tiếp vào cơ sở dữ liệu.
4. **Tương tác Sàn Đấu Boss (Combat Authority)**:
   - `BossCardBattleArena.tsx` gửi đòn tấn công qua API `POST /api/combat/attack`, Server thẩm định sát thương, giảm thanh Break Stance và máu Boss trong DB.
5. **Tương tác Thu Hoạch Treo Máy (AFK Server-Time Claim)**:
   - `StagesMapView.tsx` gọi `POST /api/afk/claim` để nhận Vàng và Kim Cương theo thời gian thực của Server.

---

## 🖥️ 2. THIẾT KẾ GIAO DIỆN & TƯƠNG TÁC (UI/UX FLOWS)

### 2.1. Thanh Điều Hướng (HeaderNav & Auth Modal)
- Nút **"TÀI KHOẢN"** có avatar nhân vật và chấm xanh Realtime Status.
- Nhấp vào mở Modal **"THÔNG TIN TÀI KHOẢN & ĐĂNG NHẬP"**:
  - Tab 1: Hồ Sơ Người Chơi (ID, Username, Email, Ví tiền, Tổng Lực Chiến).
  - Tab 2: Đăng Nhập / Đăng Ký (Email, Mật khẩu, lưu JWT vào LocalStorage).

### 2.2. Toast Thông Báo & Feedback Âm Thanh
- Mọi giao dịch thành công (Cường hóa đạt, Ghép đồ thành công, Nổ hũ Jackpot, Nhận quà AFK) đều hiển thị **Floating Toast** rực rỡ với icon và hiệu ứng pháo giấy Confetti.

---

## 🛡️ 3. TIÊU CHÍ NGHIỆM THU (ACCEPTANCE CRITERIA)
- [ ] Giao diện Web Portal hiển thị trạng thái kết nối Backend rõ ràng.
- [ ] Mở Modal đăng nhập/hồ sơ tài khoản mượt mà, hỗ trợ chuyển đổi tài khoản.
- [ ] Mở Gacha, Cường hóa, Hợp nhất và Phân rã trang bị đều gửi request thành công về NestJS backend và cập nhật UI ngay lập tức.
- [ ] Không có bất kỳ lỗi biên dịch nào trên TypeScript (`npm run build` exit code 0).
