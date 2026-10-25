"""
Smart Cropper for User-Uploaded 24-Item Showcase Sheet (1024x558)
Extracts pure item icons without text labels, applies transparent background enhancement,
and replaces the items in public/images/items/
"""

from PIL import Image
import os

SRC_PATH = r"C:\Users\ltbab\.gemini\antigravity-ide\brain\551de758-18d4-4fa3-9de4-5649e34ba2c0\.user_uploaded\media_1792915234342.png"
OUT_DIR = r"apps\web-portal\public\images\items"
os.makedirs(OUT_DIR, exist_ok=True)

img = Image.open(SRC_PATH).convert("RGBA")
W, H = img.size # 1024, 558

# 5 rows
# Row heights: approx 110px each
row_height = H / 5.0 # ~111.6
col_width = W / 6.0  # ~170.6

# Grid definitions: (row, col, filename, crop_y_ratio)
# crop_y_ratio: (start_offset, end_offset) to exclude text at bottom
CROPS = [
    # Row 0: Sovereign
    (0, 0, "item_sovereign_weapon.png", 0.05, 0.72),
    (0, 1, "item_sovereign_jacket.png", 0.05, 0.72),
    (0, 2, "item_sovereign_pants.png", 0.05, 0.72),
    (0, 3, "item_sovereign_shoes.png", 0.05, 0.72),
    (0, 4, "item_sovereign_accessory.png", 0.05, 0.72),
    (0, 5, "item_sovereign_mount.png", 0.05, 0.72),

    # Row 1: Mythic
    (1, 0, "item_mythic_weapon.png", 0.05, 0.72),
    (1, 1, "item_mythic_jacket.png", 0.05, 0.72),
    (1, 2, "item_mythic_pants.png", 0.05, 0.72),
    (1, 3, "item_mythic_shoes.png", 0.05, 0.72),
    (1, 4, "item_mythic_accessory.png", 0.05, 0.72),
    (1, 5, "item_mythic_mount.png", 0.05, 0.72),

    # Row 2: Legendary / Epic
    (2, 0, "item_legendary_weapon.png", 0.05, 0.68),
    (2, 1, "item_legendary_jacket.png", 0.05, 0.68),
    (2, 2, "item_legendary_shoes.png", 0.05, 0.68),
    (2, 3, "item_legendary_accessory.png", 0.05, 0.68),
    (2, 4, "item_epic_jacket.png", 0.05, 0.68),
    (2, 5, "item_epic_shoes.png", 0.05, 0.68),

    # Row 3: Rare / Fine
    (3, 0, "item_rare_weapon.png", 0.05, 0.72),
    (3, 1, "item_rare_jacket.png", 0.05, 0.72),
    (3, 2, "item_rare_accessory.png", 0.05, 0.72),
    (3, 3, "item_fine_accessory.png", 0.05, 0.72),
    (3, 4, "item_fine_weapon.png", 0.05, 0.72),
    (3, 5, "item_fine_jacket.png", 0.05, 0.72),

    # Row 4: Common
    (4, 0, "item_common_shoes.png", 0.05, 0.75),
    (4, 1, "item_common_pants.png", 0.05, 0.75),
    (4, 3, "item_common_accessory.png", 0.05, 0.75),
    (4, 5, "item_common_weapon.png", 0.05, 0.75),
]

for r, c, filename, y_start, y_end in CROPS:
    x0 = int(c * col_width)
    x1 = int((c + 1) * col_width)
    y_base = r * row_height
    y0 = int(y_base + y_start * row_height)
    y1 = int(y_base + y_end * row_height)

    # Add small horizontal padding
    pad_x = 10
    crop_box = (max(0, x0 + pad_x), max(0, y0), min(W, x1 - pad_x), min(H, y1))
    cropped = img.crop(crop_box)

    # Pad to square (1:1 aspect ratio) with smooth dark canvas
    max_dim = max(cropped.width, cropped.height)
    square_img = Image.new("RGBA", (max_dim, max_dim), (10, 14, 24, 255))
    offset = ((max_dim - cropped.width) // 2, (max_dim - cropped.height) // 2)
    square_img.paste(cropped, offset, cropped)

    # Resize to clean 256x256
    square_img = square_img.resize((256, 256), Image.Resampling.LANCZOS)
    target_path = os.path.join(OUT_DIR, filename)
    square_img.save(target_path, "PNG")
    print(f"Extracted pure item: {filename}")

print("All user-generated items successfully cropped and replaced!")
