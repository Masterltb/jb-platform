# Web Card Game & Portal (Next.js / TypeScript) — Agent Instructions

## Stack
- **Framework**: Next.js (App Router), React 19, TypeScript
- **Styling & Motion**: Tailwind CSS / Vanilla CSS, Framer Motion (Dark mode, Neon Street, Glassmorphism, 3D Card Tilt)
- **Stack Pack**: Trỏ tới `harness-engineering/stack-packs/frontend/react.md`

## Commands
| Action | Command |
|---|---|
| Dev Server | `npm run dev` |
| Lint & Typecheck | `npm run lint` & `npm run type-check` |
| Build Production | `npm run build` |
| Test | `npm test` |

## Surface-Specific Rules
1. **Rich Aesthetics, Card Visuals & Wow Factor**:
   - Giao diện đậm chất đường phố Neon Cyberpunk: Dark background, viền phát sáng neon theo Rank thẻ bài:
     - **Common (#94A3B8)**, **Fine (#10B981)**, **Rare (#3B82F6)**, **Epic (#A855F7)**, **Legendary (#F59E0B)**, **Mythic (#EF4444)**.
   - Thẻ bài phải có hiệu ứng **3D Tilt** (nghiêng theo chuột) và lớp phủ **Hologram Foil Shine** cho thẻ Rare trở lên.
   - 6 ô trang bị trên Thẻ bài nhân vật (Vũ khí, Áo, Quần, Giày, Phụ kiện, Xe độ) phải kéo thả được trực quan.
2. **Cơ Chế Bàn Đấu Thẻ Bài & Thanh Style 60 FPS**:
   - Thao tác ra bài mượt mà, không giật lag.
   - Thanh Style Rank $D \to SSS$ cập nhật hiệu ứng bốc lửa theo combo bài.
3. **Bảo Mật Giao Dịch & Nhập Mã**:
   - `Never trust the client`: Kết quả bốc bài Gacha, tính sát thương và nhận thưởng Giftcode/Nạp thẻ đều gửi về Backend xác thực.
   - Thêm nút chống spam (`debounce` / `isSubmitting` state) khi mở pack bài hoặc bấm thanh toán.
4. **Responsive Mobile-First (PWA Ready)**:
   - Tối ưu chạm vuốt (touch gestures) trên màn hình cảm ứng điện thoại, cho phép thêm ra màn hình chính (Add to Home Screen).

## Quality Gates
Xem `harness-engineering/quality-gates/frontend-gates.md`.

## Read These First
- **Đặc tả Production Dashboards & Cân bằng Chiến đấu (MỚI NHẤT)**: [docs/01-specs/FEAT-007-production-ready-dashboards-and-balance.md](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-007-production-ready-dashboards-and-balance.md)
- Đặc tả đấu thẻ bài & Style: [docs/01-specs/FEAT-001-combat-style.md](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-001-combat-style.md)
- Đặc tả thám hiểm treo máy: [docs/01-specs/FEAT-002-afk-idle-boss.md](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-002-afk-idle-boss.md)
- Đặc tả thẻ bài & 6 ô trang bị theo rank: [docs/01-specs/FEAT-003-item-combat-power.md](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-003-item-combat-power.md)
- Dữ liệu thẻ & trang bị mẫu: [data/items/items.json](file:///f:/project/repo-github/JaeBinPlatform/data/items/items.json)

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
