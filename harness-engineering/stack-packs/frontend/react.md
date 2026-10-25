# Stack Pack: Frontend — Next.js 16 (React 19 / Tailwind CSS v4)

> Nạp file này khi `harness.config.yaml → surfaces.web-portal.stack: nextjs16-react19-tailwind4`.
> Áp dụng cho: `apps/web-portal/` (6 Interactive Production Dashboards, Combat Arena, Gacha 3D, Realtime Boss Hub).

## Khi nào dùng
Giao diện Web Portal & Game Client chạy Next.js 16, React 19, Tailwind CSS v4, Lucide Icons, Framer Motion, Howler/Audio effects.

## Lệnh chuẩn (điền vào surface `AGENTS.md`)
| Action | Command |
|---|---|
| TypeCheck | `npx tsc --noEmit` |
| Lint | `npm run lint` |
| Build (Production) | `npm run build` |
| Dev Server | `npm run dev` |

## Quy ước bắt buộc (agent PHẢI tuân theo)
- **Tech Stack**: Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript strict (`noUncheckedIndexedAccess: true`).
- **Hình ảnh & Next/Image**: Tuyệt đối không dùng query param trong `src` (vd: `image.png?v=2`) để tránh lỗi Next.js image optimizer; versioning trực tiếp bằng tên file (vd: `image_v2.png`). Mọi sprite/asset nhân vật, vũ khí, rương phải có transparent alpha hoặc object-contain căn chỉnh chuẩn tỷ lệ.
- **State Management**: State toàn cục hoặc realtime qua Zustand / Context, đồng bộ với types từ `FEAT-007`.
- **Game Mathematics & Formulas**: Tuyệt đối tuân thủ công thức tính sát thương, DEF mitigation, Break Stance, Crit rate và CP formula chuẩn từ [FEAT-007](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-007-production-ready-dashboards-and-balance.md).
- **A11y & UI Polish**: Dark theme Cyberpunk/Phong Ma sang trọng, viền vàng kim, thanh HP/Break động mượt mà, âm thanh và hiệu ứng rung màn hình (screen shake) khi ra đòn Ultimate.
- **Zero Build Error**: Mỗi lần thay đổi code dashboard bắt buộc phải chạy `npm run build` pass 100% không cảnh báo type.

## Tham chiếu
- docs/01-specs/FEAT-007-production-ready-dashboards-and-balance.md
- apps/web-portal/src/types/game.ts

