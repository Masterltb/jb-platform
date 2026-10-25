"""
Advanced Transparent Background Remover & Edge Cleaner for JaeBinPlatform Items
Removes the dark background (40, 40, 40), eliminates rectangular borders,
and saves pure transparent RGBA PNGs.
"""

from PIL import Image, ImageFilter
import numpy as np
import os

SRC_PATH = r"C:\Users\ltbab\.gemini\antigravity-ide\brain\551de758-18d4-4fa3-9de4-5649e34ba2c0\.user_uploaded\media_1792915234342.png"
OUT_DIR = r"apps\web-portal\public\images\items"
os.makedirs(OUT_DIR, exist_ok=True)

img = Image.open(SRC_PATH).convert("RGBA")
W, H = img.size

row_height = H / 5.0
col_width = W / 6.0

CROPS = [
    # Row 0: Sovereign
    (0, 0, "item_sovereign_weapon.png", 0.05, 0.70),
    (0, 1, "item_sovereign_jacket.png", 0.05, 0.70),
    (0, 2, "item_sovereign_pants.png", 0.05, 0.70),
    (0, 3, "item_sovereign_shoes.png", 0.05, 0.70),
    (0, 4, "item_sovereign_accessory.png", 0.05, 0.70),
    (0, 5, "item_sovereign_mount.png", 0.05, 0.70),

    # Row 1: Mythic
    (1, 0, "item_mythic_weapon.png", 0.05, 0.70),
    (1, 1, "item_mythic_jacket.png", 0.05, 0.70),
    (1, 2, "item_mythic_pants.png", 0.05, 0.70),
    (1, 3, "item_mythic_shoes.png", 0.05, 0.70),
    (1, 4, "item_mythic_accessory.png", 0.05, 0.70),
    (1, 5, "item_mythic_mount.png", 0.05, 0.70),

    # Row 2: Legendary / Epic
    (2, 0, "item_legendary_weapon.png", 0.05, 0.65),
    (2, 1, "item_legendary_jacket.png", 0.05, 0.65),
    (2, 2, "item_legendary_shoes.png", 0.05, 0.65),
    (2, 3, "item_legendary_accessory.png", 0.05, 0.65),
    (2, 4, "item_epic_jacket.png", 0.05, 0.65),
    (2, 5, "item_epic_shoes.png", 0.05, 0.65),

    # Row 3: Rare / Fine
    (3, 0, "item_rare_weapon.png", 0.05, 0.70),
    (3, 1, "item_rare_jacket.png", 0.05, 0.70),
    (3, 2, "item_rare_accessory.png", 0.05, 0.70),
    (3, 3, "item_fine_accessory.png", 0.05, 0.70),
    (3, 4, "item_fine_weapon.png", 0.05, 0.70),
    (3, 5, "item_fine_jacket.png", 0.05, 0.70),

    # Row 4: Common
    (4, 0, "item_common_shoes.png", 0.05, 0.72),
    (4, 1, "item_common_pants.png", 0.05, 0.72),
    (4, 3, "item_common_accessory.png", 0.05, 0.72),
    (4, 5, "item_common_weapon.png", 0.05, 0.72),
]

def make_transparent(cropped_img):
    arr = np.array(cropped_img, dtype=np.float32)
    rgb = arr[:, :, :3]
    
    # Background color reference
    bg_color = np.array([40.0, 40.0, 39.0])
    
    # Distance from background color
    dist = np.linalg.norm(rgb - bg_color, axis=-1)
    
    # Luminance of pixel
    luminance = 0.299 * rgb[:, :, 0] + 0.587 * rgb[:, :, 1] + 0.114 * rgb[:, :, 2]
    
    # Chromatic difference (is it colorful/glowing rather than neutral grey?)
    max_c = np.max(rgb, axis=-1)
    min_c = np.min(rgb, axis=-1)
    chroma = max_c - min_c

    # Calculate alpha mask:
    # If dist < 12 and chroma < 10 -> alpha = 0 (pure background)
    # If dist > 35 or chroma > 15 -> alpha = 255 (solid item)
    # Smooth ramp in between
    t_low = 14.0
    t_high = 36.0
    
    # Score based on distance, brightness and chroma
    score = np.maximum(dist, chroma * 1.8)
    alpha = np.clip((score - t_low) / (t_high - t_low), 0.0, 1.0) * 255.0
    
    # Fade out edges slightly to eliminate square border artifact
    h, w = alpha.shape
    y_idx, x_idx = np.ogrid[:h, :w]
    edge_dist_x = np.minimum(x_idx, w - 1 - x_idx)
    edge_dist_y = np.minimum(y_idx, h - 1 - y_idx)
    min_edge_dist = np.minimum(edge_dist_x, edge_dist_y)
    edge_mask = np.clip(min_edge_dist / 6.0, 0.0, 1.0)
    
    alpha = alpha * edge_mask
    arr[:, :, 3] = alpha
    
    return Image.fromarray(np.uint8(arr), mode="RGBA")

for r, c, filename, y_start, y_end in CROPS:
    x0 = int(c * col_width)
    x1 = int((c + 1) * col_width)
    y_base = r * row_height
    y0 = int(y_base + y_start * row_height)
    y1 = int(y_base + y_end * row_height)

    pad_x = 8
    crop_box = (max(0, x0 + pad_x), max(0, y0), min(W, x1 - pad_x), min(H, y1))
    cropped = img.crop(crop_box)

    # Apply transparency extraction
    trans_img = make_transparent(cropped)

    # Fit into a 256x256 transparent square canvas
    max_dim = max(trans_img.width, trans_img.height)
    square_img = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
    offset = ((max_dim - trans_img.width) // 2, (max_dim - trans_img.height) // 2)
    square_img.paste(trans_img, offset, trans_img)

    square_img = square_img.resize((256, 256), Image.Resampling.LANCZOS)
    target_path = os.path.join(OUT_DIR, filename)
    square_img.save(target_path, "PNG")
    print(f"Processed transparent pure item: {filename}")

print("All items successfully converted to transparent pure PNGs (Zero black borders)!")
