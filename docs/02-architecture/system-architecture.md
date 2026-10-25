# Kiến Trúc Hệ Thống Nền Tảng (System Architecture)

> **Dự án: JaeBinPlatform (Anhem JaeBin – Ăn Chơi Điệu Nghệ)**  
> *Mô hình: Monorepo — Kết nối Web Card Game, Web Portal và Game Backend Services.*

---

## 🏛️ 1. Sơ đồ Kiến trúc Tổng thể (High-Level Topology)

```text
+-------------------------------------------------------------------------------+
|                    CLIENT: Web Card Game & Portal (Next.js / React)           |
|                                                                               |
|  [Module Bàn Đấu Thẻ Bài]   [Module 6 Ô Trang Bị]   [Gacha Mở Pack Thẻ]       |
|  - Drag & Drop Cards        - Lắp đồ vào Thẻ Nhân Vật - Hiệu ứng xé pack thẻ  |
|  - Thanh Style D->SSS       - Xếp hạng theo Rank    - Viền Hologram 3D Foil   |
|                                                                               |
|  [Hòm Thư & Giftcode]       [Bảng Xếp Hạng CP]      [Cổng Nạp Thẻ Trực Tuyến] |
|  - Nhập code nhận quà       - Top Cao Thủ Toàn SV   - MoMo / VNPay / Thẻ cào  |
+---------------------------------------+---------------------------------------+
                                        |
                             HTTPS REST API / WebSocket
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                      BACKEND: Game Backend Services (Node.js / Go)            |
|                                                                               |
|  [Auth & Account Service]   [Character & Card Service]  [Battle Validator]    |
|  - JWT, Quản lý tài khoản   - Quản lý thẻ bài & 6 ô đồ   - Thẩm định kết quả   |
|                                                                               |
|  [AFK Expedition Service]   [Payment & Giftcode Webhook][Leaderboard Manager] |
|  - Tính toán tài nguyên     - Chữ ký HMAC SHA256         - Cập nhật BXH       |
|    Server-side anti-cheat   - Idempotency chống lặp                           |
+---------------------------------------+---------------------------------------+
                                        |
                    +-------------------+-------------------+
                    |                                       |
                    v                                       v
         +---------------------+                 +---------------------+
         |     PostgreSQL      |                 |     Redis Cache     |
         | - User Accounts     |                 | - Session Store     |
         | - Character Cards   |                 | - CP Leaderboards   |
         | - Inventory Items   |                 | - Rate Limiting     |
         | - Transactions      |                 | - Live Events Cache |
         | - Mailbox & Codes   |                 | - Card Draw Cache   |
         +---------------------+                 +---------------------+
```

---

## 🌐 2. Luồng Xử Lý Cốt Lõi Trên Web

### 2.1. Quản lý Thẻ Bài Nhân Vật & 6 Ô Trang Bị
1. Client tải danh sách Thẻ bài nhân vật và Kho trang bị từ API `GET /api/v1/cards/my-deck`.
2. Khi người chơi kéo thả món trang bị (VD: Gậy Bida Titan Rank Legendary) vào Thẻ JaeBin:
   - Client tính nháp Lực Chiến ($\mathbf{CP}$) tăng lên và áp dụng hiệu ứng viền phát sáng cam.
   - Gửi yêu cầu `POST /api/v1/cards/equip` lên Backend xác nhận.
   - Backend thẩm định: Kiểm tra quyền sở hữu món đồ, đúng slot vũ khí, tính toán lại chính xác $\mathbf{CP}$ và lưu vào PostgreSQL.

### 2.2. Trận Đấu Thẻ Bài & Xác Thực Chống Hack (Battle Verification)
- **Luồng an toàn**: Để tránh việc người chơi can thiệp code JavaScript trên trình duyệt tự ý sửa máu hoặc lực đánh:
  - Khi bắt đầu trận: Server tạo phiên đấu `battle_session_id`, lưu hạt giống ngẫu nhiên (RNG seed) và trạng thái quái.
  - Mỗi lượt ra bài, Client gửi danh sách mã thẻ bài đã dùng (`played_card_ids`).
  - Server thẩm định Năng Lượng (Energy) có đủ không, tính toán sát thương, cập nhật Style Rank và trả về trạng thái mới.

### 2.3. Cổng Nạp Thẻ Trực Tuyến & Idempotent Webhook
- Thanh toán trực tiếp trên Web giúp giữ trọn vẹn 100% doanh thu (không bị Apple/Google cắt 30%).
- Mọi Webhook từ MoMo, VNPay, ZaloPay đều được xác minh chữ ký HMAC SHA256 và kiểm tra Idempotency Key trước khi cộng Kim Cương hoặc tặng Thẻ Bài.

---

## ⚖️ 3. Lợi Thế Mô Hình Monorepo Cho Game Thẻ Bài Web

| Tiêu chí | Tiếp cận Nhiều Repo Rời Rạc | Gộp vào 1 Monorepo Duy Nhất (Chuẩn Lựa Chọn) |
| :--- | :--- | :--- |
| **Chia sẻ Type & Schema** | Phải export npm package hoặc duplicate định nghĩa thẻ bài giữa frontend và backend. | Dùng chung 1 schema TypeScript cho Thẻ Bài, Ranks và Trang bị giữa `apps/web-portal/` và `services/game-backend/`. |
| **Đồng bộ Spec & Logic** | Sửa công thức Lực chiến trong code nhưng quên sửa file spec. | Cập nhật đồng bộ trong 1 commit duy nhất từ `docs/01-specs/FEAT-003.md`, `data/items/items.json` cho tới UI. |
| **Vận hành cho 1 Solo Dev**| Mở nhiều cửa sổ, cấu hình CI phức tạp. | 1 môi trường duy nhất, dễ dàng test toàn diện cả giao diện đấu bài lẫn API. |
