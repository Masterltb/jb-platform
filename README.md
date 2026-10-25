# Anhem JaeBin – Ăn Chơi Điệu Nghệ (JaeBinPlatform)

> **Dự án Game Thẻ Bài Chiến Thuật trên Web (Web Card Battler / Card RPG) kết hợp Hệ Thống Web Portal (Sự kiện, Giftcode, Nạp thẻ)**  
> *Slogan: "Đấu bài đỉnh cao – Phong cách ngầu lòi – Ăn chơi điệu nghệ"*

---

## 📌 1. Tổng quan dự án

**Anhem JaeBin** là dự án game thẻ bài chiến thuật chạy trực tiếp trên nền tảng Web (Desktop & Mobile Web) được xây dựng theo mô hình **Monorepo** và phương pháp **Docs-as-Code** (toàn bộ logic game thẻ bài, đặc tả trang bị, phân cấp rank, sự kiện được quản lý tập trung bằng Markdown & JSON schema).

### Thể loại & Lối chơi chính
- **Web Card RPG / Boss Battler**: Đấu thẻ bài săn Boss chiến thuật đường phố, xoay quanh **Đội hình 6 Thẻ Bài (6-Card Squad)** phối hợp chuỗi combo chiêu thức kích hoạt thanh **Style ("Ăn Chơi Điệu Nghệ")** từ rank D đến SSS.
- **Đội Hình 6 Thẻ Bài & 6 Ô Trang Bị Trên Từng Thẻ**:
  - Đội hình 6 thẻ gồm: **2 Tiền Tuyến (Tank/Vanguard)** che chắn phá giáp, **3 Hàng Giữa (Carry/Assassin/Debuffer)** dồn sát thương, **1 Hàng Sau (Healer/Style Buffer)** khuếch đại phong cách.
  - Mỗi thẻ nhân vật được gắn 6 món trang bị: **Vũ khí, Áo khoác, Quần, Sneaker, Phụ kiện mặt, Xe độ**.
  - Phân cấp Rank chuẩn mực: **Common (Trắng)** $\to$ **Fine (Xanh lá)** $\to$ **Rare (Xanh lam)** $\to$ **Epic (Tím)** $\to$ **Legendary (Cam)** $\to$ **Mythic (Đỏ Neon)**.
- **Kỹ Năng Hợp Kích 6 Thẻ Tối Thượng (All-Out Resonance)**: Khi thanh Style chạm mốc **SSS**, cả 6 thẻ bài đồng loạt kích hoạt hợp kích toàn màn hình quét sạch Boss.
- **Phong Cách Thẩm Mỹ Gen Z & Bento Grid UI/UX 2026**:
  - Phong cách **Acid Cyber & Street Neo-Brutalism**: Viền đen dứt khoát, đổ bóng cứng, sticker graffiti, hiệu ứng thẻ 3D Parallax Tilt và lớp phủ **Hologram Rainbow Foil** óng ánh.
- **Viễn chinh Treo máy (AFK Card Expeditions)**: Đội hình 6 thẻ tự động càn quét phó bản Boss khi offline, tự động phân giải đồ rác thành Đá Cường Hóa.
- **Web Portal tích hợp**: Mở pack thẻ Gacha, BXH Lực Chiến Đội Hình ($\mathbf{Team\ CP}$), Nhập code và Nạp thẻ trực tuyến.

---

## 🏗️ 2. Cấu trúc Monorepo

```text
JaeBinPlatform/
├── docs/                      # Nguồn sự thật (Source of Truth) cho toàn bộ game thẻ bài
│   ├── 00-vision/             # Tầm nhìn, định vị, triết lý thiết kế & monetization
│   ├── 01-specs/              # Đặc tả chi tiết từng tính năng (FEAT-XXX)
│   ├── 02-architecture/       # Kiến trúc hệ thống, API, sơ đồ Client-Server
│   └── 03-art-pipeline/       # Hướng dẫn tạo hình Card Art, Khung thẻ theo Rank từ AI
├── apps/                      # Các ứng dụng client
│   ├── web-portal/            # Web Card Game & Portal (Next.js/React, TypeScript)
│   └── mobile-client/         # Mobile Wrapper / PWA Package (sau khi Web game hoàn tất)
├── services/                  # Backend services
│   └── game-backend/          # API Server, Auth, Quản lý Bộ bài, Trang bị, AFK, Payment
├── data/                      # Dữ liệu game (Game Data / Configs / Schemas)
│   ├── items/                 # Bảng thẻ bài nhân vật & trang bị theo rank (JSON/YAML)
│   ├── skills/                # Bảng chiêu thức thẻ bài & hiệu ứng combo
│   └── events/                # Cấu hình sự kiện, card pack & giftcode
├── infra/                     # Cấu hình hạ tầng triển khai (Docker, Nginx, CI/CD)
├── harness-engineering/       # Bộ công cụ chuẩn hóa quy trình kỹ thuật & CI/CD
├── AGENTS.md                  # Hướng dẫn & quy ước làm việc dành cho AI Coding Agents
└── README.md                  # File tài liệu này
```

---

## 🛠️ 3. Tech Stack cốt lõi

| Thành phần | Công nghệ | Lý do lựa chọn |
| :--- | :--- | :--- |
| **Web Card Game & Portal** | **Next.js (App Router), React 19, TypeScript** | Chạy ngay trên web mọi trình duyệt, SEO tốt, load siêu tốc, hỗ trợ PWA mượt mà. |
| **Giao diện & Hiệu ứng Thẻ**| **Tailwind CSS, Vanilla CSS, Framer Motion / Canvas** | Hiệu ứng lật thẻ 3D, viền phát sáng neon theo rank (Foil/Hologram) chuẩn 60 FPS. |
| **Art & Card Generation** | **AI (Midjourney/Flux/Niji) + Khung thẻ theo Rank** | Tạo art thẻ bài phong cách Streetwear/Cyberpunk, khung viền phân biệt từ Rare tới Mythic. |
| **Game Backend** | **Node.js (NestJS / Fastify) hoặc Go** | Modular Monolith xử lý mở pack thẻ, xác thực trận đấu, AFK offline và thanh toán. |
| **Database & Cache** | **PostgreSQL + Redis** | PostgreSQL lưu tài khoản, bộ bài, kho trang bị; Redis lưu Leaderboard Lực chiến, Session. |
| **DevOps / Hosting** | **Docker, Docker Compose, Nginx** | Đóng gói nhẹ nhàng, chi phí vận hành thấp cho solo dev. |

---

## 🚀 4. Lộ trình phát triển (Roadmap)

- [x] **Phase 0: Groundwork & Card Art Pipeline**: Thiết lập Monorepo, chuẩn bị tài liệu Vision, 3 Specs cốt lõi và kiểm chứng quy trình sản xuất Card Art bằng AI.
- [ ] **Phase 1: Web Card Battler Prototype**: Giao diện bàn đấu thẻ bài trên Web (Thẻ JaeBin + 6 ô trang bị + Rank Legendary/Rare + Thanh Style D->SSS).
- [ ] **Phase 2: Game Backend & Core Loop**: API lưu trữ bộ bài, gắn trang bị, thuật toán AFK chống hack, tính toán Lực chiến chuẩn hóa.
- [ ] **Phase 3: Web Portal, Gacha & Nạp Thẻ**: Cổng mở pack thẻ bài, Giftcode, Thanh toán Sandbox (MoMo/VNPay/ZaloPay), BXH Realtime.
- [ ] **Phase 4: Bang Hội Đấu Bài & Tối Ưu PWA**: Khiêu chiến Boss Bang bằng bộ bài hợp lực, tối ưu trải nghiệm chạm vuốt trên mobile web.

---

## 📖 5. Hướng dẫn sử dụng tài liệu

1. **Đọc định hướng game**: Xem [vision.md](file:///f:/project/repo-github/JaeBinPlatform/docs/00-vision/vision.md).
2. **Quy trình làm hình ảnh không cần biết vẽ**: Xem [art-pipeline-guide.md](file:///f:/project/repo-github/JaeBinPlatform/docs/03-art-pipeline/art-pipeline-guide.md).
3. **Đặc tả tính năng game**:
   - [FEAT-001: Combat & Thanh Style "Ăn Chơi Điệu Nghệ"](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-001-combat-style.md)
   - [FEAT-002: Hệ Thống Treo Máy (AFK) Đánh Boss](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-002-afk-idle-boss.md)
   - [FEAT-003: Trang Bị, Vật Phẩm & Lực Chiến](file:///f:/project/repo-github/JaeBinPlatform/docs/01-specs/FEAT-003-item-combat-power.md)
4. **Quy tắc phối hợp cùng AI Agent**: Xem [AGENTS.md](file:///f:/project/repo-github/JaeBinPlatform/AGENTS.md).
