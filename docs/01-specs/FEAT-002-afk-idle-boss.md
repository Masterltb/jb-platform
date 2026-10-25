# FEAT-002: Hệ Thống Thám Hiểm Treo Máy (AFK Card Expeditions) & Thu Thập Tự Động

> **Mã đặc tả:** FEAT-002  
> **Trạng thái:** Approved for Prototype (Web Card Battler)  
> **Áp dụng cho:** `apps/web-portal/` & `services/game-backend/`  
> **Người thực hiện:** Solo Dev + AI Assistant  

---

## 💤 1. Mục tiêu & Trải nghiệm người chơi

Người chơi Web Card Game có thể bận rộn không thể online liên tục. Tính năng **Thám Hiểm Treo Máy (AFK Card Expeditions)** giúp đội hình thẻ bài vẫn mang lại tài nguyên phát triển không ngừng:
- **Treo máy trên nền Web (Active / Offline AFK)**: JaeBin và đội hình thẻ bài nhân vật phóng xe máy nẹt pô càn quét các địa bàn đã vượt qua. Khi tắt trình duyệt hoặc khóa điện thoại, hệ thống Server vẫn giả lập tính toán số lượng Boss đã hạ gục.
- **Thu thập Mảnh Thẻ & Trang Bị theo Rank**: Nhận Vàng, EXP, Đá Cường Hóa và các Rương Trang Bị phân cấp từ **Common, Fine, Rare** đến **Epic**.
- **Tự động phân giải đồ rác (Auto-Salvage)**: Tự động tách trang bị phẩm chất thấp (Common/Fine) thành Đá Cường Hóa để chống tràn kho trang bị.

---

## ⚙️ 2. Quy tắc Thám Hiểm & Phân Cấp Địa Bàn

### 2.1. Phân loại Ải Thám Hiểm (Expedition Zones)
1. **Địa Bàn Đường Phố (Street Zones - Thám hiểm tự do)**:
   - Các khu vực: *Phố Cổ, Chợ Đêm, Bến Tàu, Ngã Tư Tử Thần*.
   - **Quy tắc**: Khi bộ bài của người chơi đã đánh thắng ải thủ công 1 lần (đạt 3 sao), sẽ mở khóa cho phép đưa thẻ bài vào **Cắm trại Thám hiểm không giới hạn thời gian**.
2. **Khiêu Chiến Boss Thế Giới (World Boss Expeditions)**:
   - Yêu cầu dùng Vé Khiêu Chiến Boss (Boss Ticket) kiếm được từ nhiệm vụ ngày hoặc nạp thẻ.
   - Thưởng mảnh trang bị phẩm chất **Legendary (Cam)** và **Mythic (Đỏ Neon)**.

---

## 🧮 3. Công thức Tính toán Tài nguyên Offline (Server-Side Logic)

### 3.1. Nguyên tắc Chống Gian Lận (Anti-Cheat First)
> ⚠️ **TUYỆT ĐỐI KHÔNG DÙNG THỜI GIAN TRÌNH DUYỆT (CLIENT TIME)**.  
> Mọi tính toán thưởng offline đều được thực hiện trên Server dựa trên:  
> $\Delta T = \text{ServerTimeNow} - \text{LastSyncTime}$

### 3.2. Giới hạn Thời gian Tích lũy (Time Cap)
- **Tài khoản thường (F2P)**: Tích lũy tối đa **12 giờ** offline ($43,200 \text{ giây}$). Sau 12h, tài nguyên dừng tích lũy.
- **Tài khoản VIP / Thẻ Tháng**: Tích lũy tối đa **24 giờ** offline ($86,400 \text{ giây}$).

### 3.3. Tốc độ thu hoạch tài nguyên mỗi phút (Yield Rate per Minute)
Dựa trên Ải cao nhất ($S$) và Tổng Lực Chiến Bộ Bài ($CP$):

$$\text{Gold/phút} = 120 \times (1 + S \times 0.20) \times (1 + \frac{CP}{100,000})$$
$$\text{EXP/phút} = 60 \times (1 + S \times 0.15)$$
$$\text{Đá Cường Hóa/giờ} = 15 \times (1 + \lfloor S / 3 \rfloor)$$

### 3.4. Tỉ lệ Rơi Trang Bị Thẻ Bài Khi Đánh Boss Tự Động
Mỗi 5 phút cắm trại, Server kích hoạt 1 lần "Giả lập hạ Boss thường":
- $60\%$ tỉ lệ rơi: Trang bị / Thẻ **Common (Trắng)**
- $28\%$ tỉ lệ rơi: Trang bị / Thẻ **Fine (Xanh lá)**
- $10\%$ tỉ lệ rơi: Trang bị / Thẻ **Rare (Xanh lam)**
- $2\%$ tỉ lệ rơi: Trang bị / Thẻ **Epic (Tím)**
- $0\%$ tỉ lệ rơi Legendary (Trang bị Cam chỉ nhận qua Chế Tạo, Săn Boss Co-op hoặc Mở Pack Gacha).

---

## 🗑️ 4. Bộ Lọc Tự Động Phân Giải (Auto-Salvage Settings)

Người chơi có thể cấu hình trước trên giao diện Web:
```text
[x] Tự động phân giải Trang bị Common (Trắng)   -> Nhận 1x Đá Cường Hóa
[x] Tự động phân giải Trang bị Fine (Xanh lá)   -> Nhận 3x Đá Cường Hóa
[ ] Tự động phân giải Trang bị Rare (Xanh lam)  -> Nhận 1x Mảnh Hợp Kim Neon
```
- Khi mở lại Web, popup thông báo tổng kết chuyến thám hiểm:
  - *"Đội hình JaeBin đã viễn chinh 8 giờ 15 phút."*
  - *"Hạ gục: 1,600 lâu la, 99 Boss phố."*
  - *"Thu hoạch: 52,000 Vàng, 26,000 EXP, 2 Trang bị Epic (Tím)."*
  - *"Tự động phân giải 195 món đồ rác thành 450 Đá Cường Hóa."*

---

## 📡 5. API Data Contract (Backend Sync Endpoint)

### Request: `POST /api/v1/afk/claim`
```json
{
  "character_card_id": "card_jaebin_001",
  "client_timestamp": 1773804360
}
```

### Response: `200 OK`
```json
{
  "offline_seconds": 29700,
  "capped": false,
  "rewards": {
    "gold": 52000,
    "exp": 26000,
    "upgrade_stones": 450,
    "salvaged_count": 195,
    "items_retained": [
      {
        "item_id": "wpn_tuyp_neon_rare_01",
        "name": "Ống Tuýp Sắt Dạ Quang",
        "slot": "Weapon",
        "rarity": "Rare"
      },
      {
        "item_id": "jacket_bomber_epic_01",
        "name": "Áo Khoác Bomber Neon Phố Đêm",
        "slot": "Jacket",
        "rarity": "Epic"
      }
    ]
  }
}
```
