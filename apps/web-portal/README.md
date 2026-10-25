# Web Card Game & Portal (Next.js / TypeScript / Tailwind CSS)

> Ứng dụng Web Game Thẻ Bài Chiến Thuật kết hợp Cổng Thông Tin, Gacha, Bảng Xếp Hạng và Nạp Thẻ trực tuyến cho tựa game **Anhem JaeBin – Ăn Chơi Điệu Nghệ**.

---

## 🚀 Các tính năng chính:

1. **Bàn Đấu Thẻ Bài Trực Tuyến (`/battle` hoặc `/play`)**:
   - Đấu bài chiến thuật trên web chuẩn 60 FPS.
   - Cơ chế kéo thả thẻ hành động (Tấn công, Thủ, Né lướt, Tuyệt kỹ).
   - Thanh Style "Ăn Chơi Điệu Nghệ" nhảy rank $D \to C \to B \to A \to S \to SSS$ bùng nổ hiệu ứng.

2. **Quản Lý Bộ Bài & 6 Ô Trang Bị (`/deck` hoặc `/inventory`)**:
   - Thẻ bài nhân vật (JaeBin, Long Bida, Linh Neon...).
   - Gắn trực tiếp 6 món trang bị vào thẻ bài (Vũ khí, Áo khoác, Quần, Sneaker, Phụ kiện, Xe độ).
   - Sắp xếp và phân loại thẻ bài / trang bị theo cấp bậc Rank: **Mythic $\to$ Legendary $\to$ Epic $\to$ Rare $\to$ Fine $\to$ Common**.
   - Hiệu ứng thẻ 3D Tilt nghiêng theo chuột, phủ Hologram Foil óng ánh và hào quang theo rank.

3. **Gacha Mở Pack Thẻ Bài (`/gacha`)**:
   - Mở gói thẻ bài khởi nghiệp, hiệu ứng xé bao bì và tia sáng neon theo rank của thẻ bài rút được.

4. **Thám Hiểm Treo Máy (`/expedition`)**:
   - Cho đội hình thẻ bài đi thám hiểm cày Vàng, EXP và Đá Cường Hóa khi offline.

5. **Web Portal Tích Hợp**:
   - **Cổng Giftcode (`/giftcode`)**: Nhập mã nhận quà hòm thư.
   - **Bảng Xếp Hạng (`/leaderboard`)**: Tra cứu top 100 bộ bài có Lực Chiến ($CP$) khủng nhất toàn server (Redis Cache).
   - **Cổng Nạp Thẻ (`/shop`)**: Thanh toán MoMo, VNPay, ZaloPay, Thẻ cào nhận Kim Cương với chiết khấu $10\%$.

---

## 🛠️ Công nghệ:
- **Framework**: Next.js (App Router), React 19
- **Ngôn ngữ**: TypeScript
- **Styling & Animation**: Tailwind CSS, Framer Motion, Vanilla CSS (Glassmorphism & Neon Street Dark Mode, 3D Card Tilt)
