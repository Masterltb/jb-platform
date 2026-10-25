# Tầm Nhìn Dự Án: Anhem JaeBin – Ăn Chơi Điệu Nghệ

> **Bản Tuyên Ngôn Thiết Kế (Web Card Game Vision Document)**  
> *Phiên bản: 2.0 (Web Card Battler) — Dành cho Solo Developer & AI Pair Programmers*

---

## 🎯 1. Game này VUI ở điểm nào trong 10 phút đầu?

Trải nghiệm 10 phút đầu tiên quyết định 80% tỷ lệ giữ chân (Retention) của một tựa game thẻ bài trên web. Với **Anhem JaeBin**, niềm vui cốt lõi được xây dựng trên 3 trụ cột:

1. **Cảm giác "bóc pack" cực phê & visual thẻ bài Hologram sắc nét (0 - 3 phút đầu)**:
   - Ngay khi vào Web (không cần cài đặt), người chơi được tặng ngay gói **Pack Khởi Nghiệp Phố Đêm**.
   - Hiệu ứng mở pack thẻ xé bao bì, ánh sáng bùng nổ khi rút được Thẻ Nhân Vật **JaeBin (Rank Rare / Epic)** cùng các thẻ trang bị khởi đầu.
   - Thẻ bài có hiệu ứng 3D nghiêng theo chuột/con quay hồi chuyển điện thoại (Card Tilt / Hologram Foil Shine), viền phát sáng neon rực rỡ theo từng Rank: **Common, Fine, Rare, Epic, Legendary, Mythic**.

2. **Gắn Trang Bị Lên Thẻ Bài & Lực Chiến (CP) Nhảy Vọt (3 - 6 phút)**:
   - Mỗi thẻ bài nhân vật có 6 ô trang bị: **Vũ khí, Áo khoác, Quần, Sneaker, Phụ kiện, Xe độ**.
   - Kéo thả chiếc **Gậy Bida Phản Quang Titan (Rank Legendary)** và chiếc **SH Độ Pô Titan** vào thẻ JaeBin:
     - Thẻ bài biến đổi ngoại hình, viền hào quang cam rực lửa.
     - Điểm Lực Chiến ($\mathbf{CP}$) tăng vọt kèm âm thanh nảy số vui tai, kích thích tối đa dopamine sưu tầm.

3. **Chiến Đấu Thẻ Bài & Thanh Style "Ăn Chơi Điệu Nghệ" (6 - 10 phút)**:
   - Khiêu chiến Boss "Trùm Phố Đi Bộ" trên bàn đấu thẻ bài Web.
   - Cơ chế đánh thẻ theo nhịp kết hợp đòn chiêu thức tạo combo liên hoàn:
     - Thanh Style nhảy cấp liên tục từ: `D (Tập sự) -> C (Có nét) -> B (Dân chơi) -> A (Khét lẹt) -> S (Bá cháy) -> SSS (Ăn chơi điệu nghệ)`.
     - Càng đánh nhiều thẻ chiêu thức khắc chế và trang bị xịn, rank Style càng bùng nổ, nhân hệ số sát thương quét sạch bàn đấu.
   - Đánh bại Boss, mở khóa ngay tính năng **Viễn chinh Thẻ bài (AFK Card Expeditions)**: Đội hình thẻ bài tự động cày cuốc tài nguyên khi tắt trình duyệt.

---

## 💰 2. Chính sách Nạp tiền & Kiếm tiền (Monetization Policy)

### Triết lý: "Chơi vì đam mê – Nạp vì phong cách & tiện lợi (Anti Hard Pay-to-Win)"
Để dự án sống lâu dài và có cộng đồng trung thành, game nói **KHÔNG** với việc bán chỉ số độc quyền phá hủy hoàn toàn cân bằng game:

1. **Bán Thẩm mỹ & Khung Thẻ Độc Quyền (Cosmetics & Card Foil - 50% doanh thu)**:
   - Skin thẻ nhân vật phong cách Streetwear/Cyberpunk giới hạn mùa lễ hội.
   - Khung thẻ Hologram neon phát sáng, âm thanh rút bài đặc biệt (Custom SFX).
   - Card Sleeve (Mặt lưng thẻ bài cá tính).
2. **Tiện ích & Tiết kiệm thời gian (Time-Savers / Convenience - 35% doanh thu)**:
   - Vé mở rộng kho thẻ bài và hòm trang bị, mở rộng giới hạn AFK từ 12h lên 24h.
   - Thẻ tháng (Monthly Pass) tặng Kim Cương và Vé Bốc Bài hàng ngày.
   - Battle Pass Mùa Giải: Tích lũy điểm nhiệm vụ nhận Mảnh thẻ bài Legendary và Đá Cường Hóa.
3. **Quà Nạp Đầu & Gói Bốc Thẻ Tân Thủ (Entry Packs - 15% doanh thu)**:
   - Gói nạp đầu giá rẻ (~20.000đ - 50.000đ) tặng ngay thẻ vũ khí Gậy Bida Titan Legendary và Xe SH độ pô.
4. **Cơ chế Cày chay thân thiện**:
   - Mọi thẻ bài và trang bị từ Rare đến Legendary đều có thể thu thập qua mảnh ghép rơi từ Boss, Tháp Viễn Chinh và nhiệm vụ hàng ngày.
   - Người chơi cày chay biết tối ưu hóa phối hợp thẻ bài và trang bị hoàn toàn có thể đè bẹp đối thủ trên Bảng Xếp Hạng.

---

## 📱 3. Nền tảng phát hành ưu tiên

### Chiến lược: **Web First (PWA) -> Tích hợp Cổng Nạp -> Đóng Gói Mobile App**

1. **Giai đoạn 1 — Web Game trực tiếp (Next.js / Responsive Web)**:
   - **Lợi thế áp đảo**: Người chơi không cần tải vài GB như game native; chỉ cần mở link trên trình duyệt là chơi được ngay lập tức trên cả máy tính lẫn điện thoại.
   - Dễ dàng chia sẻ link trận đấu, link tặng thẻ bài hoặc rủ bạn bè qua Zalo, Facebook, TikTok.
   - Hỗ trợ công nghệ **PWA (Progressive Web App)**: Người chơi có thể "Thêm vào màn hình chính" (Add to Home Screen) để mở game toàn màn hình mượt như app cài đặt.
2. **Giai đoạn 2 — Cổng Nạp Thẻ Trực Tuyến & Chợ Thẻ Bài**:
   - Tích hợp thanh toán MoMo, VNPay, ZaloPay, Thẻ cào trực tiếp trên web, **tiết kiệm 30% phí hoa hồng** của App Store/Google Play.
   - Người chơi nạp trên Web nhận thêm 10% - 15% khuyến mãi Kim Cương.
3. **Giai đoạn 3 — Đóng gói Hybrid Mobile App (Capacitor / Tauri / Webview)**:
   - Sau khi game thẻ bài trên web đã ổn định và có cộng đồng, đóng gói đưa lên Google Play Store và Apple App Store để mở rộng tệp người dùng.

---

## ⚙️ 4. Lựa chọn Công nghệ Frontend: Next.js + React 19 vs Canvas Game Engine

### Quyết định: **Next.js (App Router) + React 19 + Tailwind CSS + Framer Motion & CSS 3D**

| Tiêu chí | Next.js + React + Framer Motion / 3D CSS | Phaser.js / Pixi.js thuần Canvas | Phán quyết cho Web Card Game |
| :--- | :--- | :--- | :--- |
| **Giao diện & Thao tác Thẻ bài** | Quản lý DOM linh hoạt, kéo thả thẻ trực quan, tooltip chỉ số trang bị dễ hiển thị, responsive hoàn hảo giữa Mobile và PC. | Vẽ toàn bộ lên canvas, tự code lại UI, button, modal rất tốn thời gian. | **Next.js + React thắng lớn** về tốc độ dựng UI thẻ bài và kho đồ. |
| **Hiệu ứng Thẻ bài & Foil/Hologram** | Hiệu ứng CSS 3D transforms, backdrop-blur neon, shader filter cực kỳ hiện đại và nhẹ nhàng. | Cần viết custom WebGL shader phức tạp. | **React + CSS 3D tối ưu cho Solo Dev**. |
| **Tích hợp Web Portal & Cổng Nạp** | Game và Web Portal nằm chung 1 hệ sinh thái: Đăng nhập, mở pack, nạp tiền mượt mà không bị chuyển trang. | Phải nhúng iframe hoặc chia 2 dự án riêng biệt. | **Đồng bộ 100% Monorepo**. |
| **Hỗ trợ của AI Coding** | Hệ sinh thái React/TypeScript/Tailwind có dữ liệu đào tạo AI phong phú nhất, code cực nhanh và chuẩn xác. | Khó bảo trì hơn khi dự án mở rộng. | **React thân thiện nhất với AI**. |

> **Kết luận**: Chọn **Next.js + TypeScript + Framer Motion / CSS 3D** làm nền tảng phát triển Web Card Game, kết hợp **Game Backend Node.js/Go** để tạo ra một game thẻ bài chiến thuật đường phố hiện đại, nhanh, đẹp và dễ tiếp cận nhất.
