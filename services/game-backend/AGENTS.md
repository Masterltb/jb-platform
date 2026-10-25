# Game Backend — Agent Instructions

## Stack
- **Framework**: Node.js (NestJS / Fastify) hoặc Go (Gin/Echo)
- **Database & Cache**: PostgreSQL (Prisma/TypeORM) + Redis
- **Stack Pack**: Trỏ tới `harness-engineering/stack-packs/backend/node.md` (hoặc `go.md`)

## Commands
| Action | Command |
|---|---|
| Dev Server | `npm run start:dev` |
| Test Unit & E2E | `npm test` & `npm run test:e2e` |
| DB Migration | `npx prisma migrate dev` (hoặc migrate script) |
| Lint & Build | `npm run lint` & `npm run build` |

## Surface-Specific Rules
1. **Kiến Trúc Modular Monolith**:
   - Đóng gói theo module độc lập: `AuthModule`, `CardModule`, `EquipmentModule`, `BattleModule`, `AfkModule`, `MailModule`, `PaymentModule`.
   - Tránh circular dependency giữa các service.
2. **Quản Lý Thẻ Bài & 6 Ô Trang Bị Theo Rank**:
   - Thẩm định logic gắn trang bị vào thẻ bài: Kiểm tra đúng slot (`Weapon`, `Jacket`, `Pants`, `Shoes`, `Accessory`, `Mount`).
   - Sắp xếp và lọc trang bị theo rank (`Mythic`, `Legendary`, `Epic`, `Rare`, `Fine`, `Common`).
   - Tính toán chỉ số Lực Chiến ($\mathbf{CP}$) và bonus bộ trang bị chuẩn xác theo công thức server.
3. **AFK Calculation & Server Time Sync**:
   - Mọi mốc thời gian nhận quà AFK phải tính theo: $\Delta T = \text{ServerNow} - \text{LastSyncTime}$. Tuyệt đối không dùng thời gian từ payload của client.
4. **Idempotency & Chữ Ký Webhook Nạp Thẻ**:
   - Bắt buộc kiểm tra chữ ký HMAC SHA256 cho IPN từ MoMo, VNPay, ZaloPay.
   - Sử dụng bảng `processed_transactions` với Unique Constraint trên `order_id` / `transaction_id` để ngăn chặn cộng Kim Cương hai lần.
5. **Database Indexing**:
   - Đánh index cho các trường tra cứu cao: `user_id`, `card_id`, `item_id`, `rank`, `code_string`.

## Quality Gates
Xem `harness-engineering/quality-gates/backend-gates.md`.

## Read These First
- Kiến trúc tổng thể: [docs/02-architecture/system-architecture.md](file:///f:/project/repo-github/JaeBinPlatform/docs/02-architecture/system-architecture.md)
- Đặc tả đấu thẻ & Style: [docs/01-specs/FEAT-001-combat-style.md](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-001-combat-style.md)
- Đặc tả thám hiểm treo máy: [docs/01-specs/FEAT-002-afk-idle-boss.md](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-002-afk-idle-boss.md)
- Đặc tả thẻ bài & trang bị: [docs/01-specs/FEAT-003-item-combat-power.md](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-003-item-combat-power.md)
- Đặc tả Production-Ready & Cân bằng sát thương: [docs/01-specs/FEAT-007-production-ready-dashboards-and-balance.md](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-007-production-ready-dashboards-and-balance.md)
