# Project Constitution — Anhem JaeBin – Ăn Chơi Điệu Nghệ

> **Nguyên tắc Bất Biến của Dự Án (Inviolables)**  
> Mọi tài liệu (Specs, Architecture, PRD), kế hoạch và mã nguồn bắt buộc phải nhất quán với Constitution này.  
> Nếu một giải pháp kỹ thuật mâu thuẫn với Constitution, đó là tín hiệu DỪNG LẠI để xin ý kiến của Developer.

---

## 1. Sứ Mệnh (Mission)
Xây dựng tựa **Game Thẻ Bài Chiến Thuật Đường Phố trên Web (Web Card RPG / Card Battler)** "Anhem JaeBin – Ăn Chơi Điệu Nghệ". Trải nghiệm mở thẻ bài, gắn trang bị đa dạng theo cấp bậc (Rank từ Common đến Legendary, Mythic), đấu bài chiến thuật kết hợp thanh Style kích thích dopamine, tích hợp Web Portal cộng đồng (Giftcode, Sự kiện, Nạp thẻ), do **1 Solo Developer** phát triển và vận hành bền vững với sự trợ lực từ AI Coding Agents.

---

## 2. Những Điều Tuyệt Đối Không Được Vi Phạm (Non-Negotiables)

1. **Không Bao Giờ Tin Tưởng Client (`Never Trust The Client`)**:
   - Kết quả bốc thẻ (Gacha / Card Pack), tính toán sát thương trận đấu thẻ bài và thời gian/tài nguyên treo máy (AFK) bắt buộc xác thực trên Server. Mọi tính toán offline phải dựa trên `last_sync_timestamp` của cơ sở dữ liệu.
   - Không cộng Kim Cương, thẻ bài hay trang bị trực tiếp từ Client; toàn bộ giao dịch thanh toán phải qua Server Webhook được ký điện tử (HMAC SHA256).
2. **Cơ Chế Bất Khả Lặp Bắt Buộc (`Idempotency Everywhere`)**:
   - Mọi API nhận mã Giftcode, mở pack thẻ bài và xử lý Webhook nạp tiền (MoMo, VNPay, ZaloPay, Thẻ cào) phải có khóa Idempotency Key chống Double-spending và Replay Attack.
3. **Nói Không Với Hút Máu Cực Đoan (`Anti Hard Pay-to-Win`)**:
   - Không bán chỉ số độc quyền mà người cày chay không thể có. Thẻ bài và trang bị cấp cao (Rare, Epic, Legendary) đều có thể cày cuốc qua ải, phó bản Boss và nâng cấp.
   - Doanh thu tập trung $85\%$ vào Thẩm mỹ (Card Skin, Khung thẻ Hologram Neon, Hiệu ứng xuất chiêu) và Tiện ích tiết kiệm thời gian (Mở rộng kho thẻ/rương, Thẻ tháng, Battle Pass).
4. **Docs Là Nguồn Sự Thật (`Docs is Source of Truth`)**:
   - Không viết code khi chưa có file đặc tả tương ứng trong `docs/01-specs/FEAT-XXX.md`.
   - Nếu trong quá trình phát triển phát sinh logic thẻ bài mới hoặc điều chỉnh công thức tính Lực Chiến (CP), bắt buộc cập nhật lại file spec trước khi kết thúc phiên làm việc.
5. **Tiêu Chuẩn Trải Nghiệm Web 60 FPS & Hiệu Ứng Thẻ Bài Đỉnh Cao**:
   - Tối ưu hóa hiệu ứng chuyển động lật thẻ, kéo thả thẻ bài mượt mà 60 FPS, không gây giật lag trình duyệt.
   - Thiết kế giao diện thẻ bài đậm chất Neon Cyberpunk Streetwear, hiệu ứng lấp lánh (Foil/Holographic) phân định rõ các cấp bậc Rank.

---

## 3. Những Điều Chủ Động Nằm Ngoài Phạm Vi (Explicitly Out of Scope)

1. **Tránh Phân Mảnh Microservices**: Backend được đóng gói theo dạng **Modular Monolith** duy nhất.
2. **Tập Trung Web First (PWA / Responsive Web)**: Game chạy trực tiếp trên trình duyệt Web (Desktop & Mobile Browser qua PWA), không đòi hỏi cài đặt ứng dụng native cồng kềnh trong giai đoạn đầu. Bản đóng gói Native App Store chỉ thực hiện khi web game đã hoàn thiện.
3. **Không Làm Sàn Giao Dịch Tự Do Giữa Người Chơi (P2P Free Market)**: Tránh phát sinh gian lận, bot cày tiền và chợ đen trong giai đoạn MVP.

---

## 4. Quyền Hạn Ra Quyết Định (Decision Authority)

- **Quyết định tối cao**: Thuộc về **Solo Developer** của dự án.
- **Vai trò của AI Agent**: Đề xuất giải pháp, thực thi kiểm thử và viết code tuân thủ theo các Quality Gates. AI **tuyệt đối không tự ý nới lỏng** các rào chắn kỹ thuật hoặc chỉnh sửa Constitution mà không có sự chỉ đạo rõ ràng từ Developer.

---

## 5. Tham Chiếu Bắt Buộc
- Quy chuẩn AI hàng ngày: [AGENTS.md](file:///f:/project/repo-github/JaeBinPlatform/AGENTS.md)
- Cấu hình khung kỹ thuật: [harness.config.yaml](file:///f:/project/repo-github/JaeBinPlatform/harness-engineering/harness.config.yaml)
- Tầm nhìn 10 phút đầu & Định vị: [docs/00-vision/vision.md](file:///f:/project/repo-github/JaeBinPlatform/docs/00-vision/vision.md)
- Quy trình Solutioning Gate: [harness-engineering/discovery/README.md](file:///f:/project/repo-github/JaeBinPlatform/harness-engineering/discovery/README.md)
