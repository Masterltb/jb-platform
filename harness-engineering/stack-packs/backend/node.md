# Stack Pack: Backend — Node.js (NestJS / Fastify / PostgreSQL / Redis)

> Nạp file này khi `harness.config.yaml → surfaces.backend.stack: node-nestjs`.
> Áp dụng cho: Game Backend, Auth, Gacha 1-of-1 Idempotency, AFK Calculator, Leaderboards.

## Khi nào dùng
API game backend, xác thực người chơi, giao dịch Gacha, chống hack tính toán sát thương & AFK.

## Tech Stack Cốt Lõi
- **Framework**: NestJS (v10+) chạy trên Fastify engine.
- **Database**: PostgreSQL 16 (ACID transactions, JSONB).
- **ORM**: Prisma ORM (Type-safe client & schema migrations).
- **Cache & Realtime**: Redis (Sorted Sets cho Real-time CP Leaderboard, Redlock cho Idempotent 1-of-1 Gacha & Webhooks), Socket.io.

## Lệnh chuẩn (điền vào surface `AGENTS.md`)
| Action | Command |
|---|---|
| Dev Server | `npm run start:dev` |
| Test | `npm test` & `npm run test:e2e` |
| Lint & Build | `npm run lint` & `npm run build` |
| Migration | `npx prisma migrate dev` |
| Prisma Studio | `npx prisma studio` |

## Quy ước bắt buộc (agent PHẢI tuân theo)
- Không dùng `any` — bật `strict: true` trong `tsconfig.json`.
- Sử dụng chung Schema và Interface với `apps/web-portal/src/types/game.ts` để đảm bảo đồng bộ Monorepo.
- Mọi API Gacha, Nạp thẻ, Nhận Giftcode bắt buộc có **Idempotency Key** và kiểm tra chữ ký HMAC SHA256.
- Tuyệt đối tính toán phần thưởng AFK và sát thương trận đấu trên Server (`Never trust the client`).
- Cập nhật điểm Lực Chiến (CP) vào Redis Sorted Set (`ZADD leaderboard:cp <cp> <userId>`) để truy xuất Top 100 trong < 2ms.
- Validation input qua `class-validator` và `class-transformer` tại mọi DTO boundary.

## Quality gate bổ sung
Xem `quality-gates/backend-gates.md`. Test coverage tối thiểu 60%, 0 critical vulnerabilities.

## Tham chiếu
- https://docs.nestjs.com
- https://www.prisma.io/docs
- docs/01-specs/FEAT-007-production-ready-dashboards-and-balance.md
