# Game Backend Service

> Backend API Service cho **Anhem JaeBin – Ăn Chơi Điệu Nghệ** (Modular Monolith)

## 📌 Nhiệm vụ cốt lõi:
- **Xác thực (Auth)**: JWT Token, đăng ký/đăng nhập bằng Email, Google, Guest Account.
- **Quản lý Thẻ Bài & 6 Ô Trang Bị (Cards & Equipment API)**:
  - Quản lý kho Thẻ bài nhân vật (JaeBin, Long Bida, Linh Neon...) và 6 ô trang bị (Vũ khí, Áo khoác, Quần, Sneaker, Phụ kiện, Xe độ).
  - Phân loại và sắp xếp thẻ/trang bị theo Rank: **Mythic $\to$ Legendary $\to$ Epic $\to$ Rare $\to$ Fine $\to$ Common**.
  - Tính toán và thẩm định điểm Lực Chiến ($\mathbf{CP}$) chính xác phía server.
- **Thẩm định Trận Đấu Thẻ Bài (Battle Validator)**: Xác thực các lượt ra bài, Năng Lượng và tính toán sát thương/thanh Style phía Server để chống gian lận.
- **Tính toán Thám Hiểm Treo máy (AFK Expeditions)**: Tính toán Vàng, EXP, Đá Cường Hóa và tỉ lệ rơi đồ/thẻ theo Server Time ($\Delta T$).
- **Hòm thư & Giftcode (Mailbox & Giftcode API)**: Tiếp nhận mã giftcode có Idempotency Key, phát thưởng thẻ bài và kim cương vào hòm thư.
- **Xử lý Thanh toán (Payment Webhooks)**: Tiếp nhận IPN từ MoMo, VNPay, ZaloPay, xác minh chữ ký HMAC SHA256 và cộng Kim Cương bảo mật.
