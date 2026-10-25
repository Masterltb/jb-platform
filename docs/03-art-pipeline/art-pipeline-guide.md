# Quy Trình Sản Xuất Đồ Họa Thẻ Bài Dành Cho Người Không Biết Vẽ

> **Tài liệu Hướng dẫn Thực chiến (Card Art & Hologram Pipeline Guide)**  
> *Mục tiêu: Dùng AI và CSS/Canvas tạo ra hàng trăm thẻ bài nhân vật và trang bị rực rỡ, phân định rõ cấp bậc Rank (Common -> Mythic).*

---

## 🎨 1. Triết Lý Card Art: "AI Vẽ Tranh + SVG Khung Rank + CSS 3D Hologram"

Thay vì phải vẽ tay từng lá bài, quy trình sản xuất thẻ bài Web tận dụng sức mạnh kết hợp của 3 yếu tố:
1. **AI Art (Midjourney / Flux / Niji 6)**: Vẽ hình minh họa nhân vật (Card Illustration) và icon 6 loại trang bị theo phong cách Anime Streetwear Cyberpunk.
2. **Khung Thẻ Theo Rank (SVG / Canvas Card Borders)**: Chuẩn hóa bộ khung viền thẻ theo 6 cấp bậc:
   - **Common (Trắng/Xám)**, **Fine (Xanh lá)**, **Rare (Xanh lam)**, **Epic (Tím)**, **Legendary (Cam Vàng)**, **Mythic (Đỏ Neon)**.
3. **Hiệu Ứng Hologram Foil trên Web (CSS 3D / Shaders)**:
   - Hiệu ứng lật thẻ 3D theo con trỏ chuột.
   - Lớp phủ ánh kim (Hologram Foil) đổi màu cầu vồng khi nghiêng thẻ bài đối với các thẻ Rank **Rare, Epic, Legendary, Mythic**.

---

## 🚀 2. Quy Trình 4 Bước Tạo Thẻ Bài

```text
[Bước 1: Prompt AI] -> [Bước 2: Ghép Khung Rank] -> [Bước 3: Gắn 6 Slot Trang Bị] -> [Bước 4: CSS Hologram Foil]
```

### Bước 1: Tạo Minh Họa Thẻ Bài bằng AI

#### A. Mẫu Prompt Thẻ Nhân Vật (JaeBin / Đồng Minh):
```text
anime card game art, JaeBin street hero, handsome bad boy, oversized cyberpunk bomber jacket with neon patches, glowing cyber sneakers, holding titanium glowing billiard bat, leaning against customized sports motorcycle, dynamic cool pose, vibrant neon city background, night street, high detail, sharp focus, 8k, --niji 6 --ar 3:4
```

#### B. Mẫu Prompt Thẻ Boss (Trùm Phố Đi Bộ):
```text
anime card game art, hulking gang boss monster, glowing robotic cyber arm, golden chain, spiky neon pipe, ferocious confident smirk, dark cyberpunk alleyway with smoke and red neon lights, dynamic perspective, trading card game illustration, --niji 6 --ar 3:4
```

#### C. Mẫu Prompt Icon 6 Món Trang Bị:
- **Vũ khí**: `isolated 2D game icon, titanium glowing billiard bat wrapped in neon tape, glowing sparks, transparent background, vector style, high resolution, --ar 1:1`
- **Áo khoác**: `isolated 2D game icon, cyberpunk neon streetwear bomber jacket, glowing cyan seams, high fashion, dark background, --ar 1:1`
- **Xe độ**: `isolated 2D game icon, customized street motorcycle with glowing titanium exhaust pipe, cyberpunk decals, side view, --ar 1:1`

---

## 🖼️ 3. Quy Chuẩn Khung Thẻ Theo Rank (Card Frame Design)

Mỗi tấm thẻ trên Web bao gồm 3 lớp layer xếp chồng lên nhau (Z-Index):

```text
+-------------------------------------------------------------+
| LỚP 3: Lớp Phủ Hologram Foil & Ánh Kim (Blend-mode: overlay)|
+-------------------------------------------------------------+
| LỚP 2: Khung Thẻ SVG Phân Cấp Rank (Tên, Rank, 6 Slot Đồ)    |
+-------------------------------------------------------------+
| LỚP 1: Bức Tranh Minh Họa AI (Illustration Image)           |
+-------------------------------------------------------------+
```

### Bảng Màu Viền & Glow CSS Theo Rank:

```css
/* Rank Common */
.card-rank-common {
  border-color: #94A3B8;
  box-shadow: 0 4px 12px rgba(148, 163, 184, 0.2);
}

/* Rank Fine */
.card-rank-fine {
  border-color: #10B981;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
}

/* Rank Rare */
.card-rank-rare {
  border-color: #3B82F6;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.5);
}

/* Rank Epic */
.card-rank-epic {
  border-color: #A855F7;
  box-shadow: 0 4px 24px rgba(168, 85, 247, 0.6);
}

/* Rank Legendary */
.card-rank-legendary {
  border-color: #F59E0B;
  box-shadow: 0 0 25px rgba(245, 158, 11, 0.7), inset 0 0 15px rgba(245, 158, 11, 0.3);
  animation: pulse-gold 2s infinite ease-in-out;
}

/* Rank Mythic */
.card-rank-mythic {
  border-color: #EF4444;
  box-shadow: 0 0 30px rgba(239, 68, 68, 0.8), inset 0 0 20px rgba(239, 68, 68, 0.4);
  animation: pulse-crimson 1.5s infinite ease-in-out;
}
```

---

## ✨ 4. Hiệu Ứng Lật Thẻ 3D & Hologram Foil trên Trình Duyệt

Sử dụng thư viện **Framer Motion** hoặc CSS biến đổi góc 3D (`transform: rotateX(...) rotateY(...)`):
- Khi di chuột qua thẻ: Tính toán tọa độ chuột so với tâm thẻ để làm nghiêng thẻ theo góc tương ứng.
- Lớp ánh sáng trắng chuyển động lướt qua thẻ (Shine Sweep) tạo cảm giác như đang cầm thẻ bài thật ngoài đời.
