"""
High-Fidelity PNG Generator for JaeBinPlatform
Generates pure item artwork & 3D chest artwork (no text, no stars, no UI frames).
Uses PIL (Pillow) with anti-aliasing, multi-layer gradients, lighting highlights, and drop shadows.
"""

import math
import os
from PIL import Image, ImageDraw, ImageFilter

ITEMS_DIR = "apps/web-portal/public/images/items"
CHESTS_DIR = "apps/web-portal/public/images/chests"
os.makedirs(ITEMS_DIR, exist_ok=True)
os.makedirs(CHESTS_DIR, exist_ok=True)

SIZE = 512
CENTER = SIZE // 2

def create_base_canvas(bg_color=(10, 14, 24, 255), glow_color=None):
    img = Image.new("RGBA", (SIZE, SIZE), bg_color)
    if glow_color:
        # Radial ambient glow in center
        glow_layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
        draw_glow = ImageDraw.Draw(glow_layer)
        for r in range(180, 20, -10):
            alpha = int(40 * (1 - r / 180))
            draw_glow.ellipse(
                [CENTER - r, CENTER - r, CENTER + r, CENTER + r],
                fill=(glow_color[0], glow_color[1], glow_color[2], alpha)
            )
        glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(15))
        img = Image.alpha_composite(img, glow_layer)
    return img

# =========================================================================
# 1. SOVEREIGN JACKET: Bá Long Hắc Y Thần Giáp
# =========================================================================
def draw_sovereign_jacket():
    img = create_base_canvas(glow_color=(255, 0, 127))
    draw = ImageDraw.Draw(img)

    # Shadow
    draw.ellipse([140, 420, 372, 460], fill=(0, 0, 0, 120))

    # Jacket torso base (Dragon scale matte black)
    torso_coords = [
        (180, 130), (256, 170), (332, 130), # Collar
        (380, 180), (360, 390), (152, 390), (132, 180) # Body
    ]
    draw.polygon(torso_coords, fill=(22, 18, 30, 255), outline=(255, 0, 127, 220), width=4)

    # Left & Right Shoulders (Armor Pauldrons)
    draw.polygon([(110, 170), (180, 130), (160, 260), (100, 240)], fill=(35, 28, 48, 255), outline=(255, 0, 127, 180), width=3)
    draw.polygon([(402, 170), (332, 130), (352, 260), (412, 240)], fill=(35, 28, 48, 255), outline=(255, 0, 127, 180), width=3)

    # Dragon scales pattern on chest
    for y in range(210, 370, 30):
        for x in range(190, 320, 35):
            draw.arc([x, y, x + 30, y + 25], start=0, end=180, fill=(255, 0, 127, 140), width=2)

    # Neon Circuit Lines (Hot Pink & Cyan)
    draw.line([(256, 170), (256, 390)], fill=(255, 0, 127, 255), width=5)
    draw.line([(180, 130), (210, 300), (256, 330)], fill=(0, 240, 255, 200), width=3)
    draw.line([(332, 130), (302, 300), (256, 330)], fill=(0, 240, 255, 200), width=3)

    # Sovereign Dragon Core on Chest
    draw.ellipse([236, 210, 276, 250], fill=(255, 0, 127, 255), outline=(255, 255, 255, 255), width=3)
    draw.ellipse([246, 220, 266, 240], fill=(255, 255, 255, 255))

    img.save(f"{ITEMS_DIR}/item_sovereign_jacket.png", "PNG")
    print("Saved item_sovereign_jacket.png")

# =========================================================================
# 2. SOVEREIGN PANTS: Thần Ma Vạn Kiếp Khố
# =========================================================================
def draw_sovereign_pants():
    img = create_base_canvas(glow_color=(255, 0, 127))
    draw = ImageDraw.Draw(img)

    # Shadow
    draw.ellipse([140, 440, 372, 475], fill=(0, 0, 0, 120))

    # Waistband
    draw.rectangle([180, 100, 332, 140], fill=(32, 25, 42, 255), outline=(255, 0, 127, 220), width=3)
    draw.ellipse([240, 108, 272, 132], fill=(255, 0, 127, 255), outline=(255, 255, 255, 200), width=2)

    # Left Leg & Right Leg
    draw.polygon([(180, 140), (250, 140), (240, 240), (220, 430), (160, 425), (170, 240)], fill=(20, 18, 28, 255), outline=(255, 0, 127, 180), width=3)
    draw.polygon([(262, 140), (332, 140), (342, 240), (352, 425), (292, 430), (272, 240)], fill=(20, 18, 28, 255), outline=(255, 0, 127, 180), width=3)

    # Segmented Knee Armor Plates
    draw.rectangle([165, 280, 215, 335], fill=(45, 30, 58, 255), outline=(255, 0, 127, 255), width=3)
    draw.rectangle([297, 280, 347, 335], fill=(45, 30, 58, 255), outline=(255, 0, 127, 255), width=3)

    # Neon energy straps
    draw.line([(180, 170), (235, 220)], fill=(0, 240, 255, 220), width=3)
    draw.line([(332, 170), (277, 220)], fill=(0, 240, 255, 220), width=3)

    img.save(f"{ITEMS_DIR}/item_sovereign_pants.png", "PNG")
    print("Saved item_sovereign_pants.png")

# =========================================================================
# 3. SOVEREIGN SHOES: Hư Không Lạc Vân Hài
# =========================================================================
def draw_sovereign_shoes():
    img = create_base_canvas(glow_color=(255, 0, 127))
    draw = ImageDraw.Draw(img)

    draw.ellipse([100, 380, 412, 430], fill=(0, 0, 0, 140))

    # Sneaker Profile (Left shoe showcase)
    shoe_coords = [
        (130, 330), (160, 220), (230, 180), (270, 210), (290, 270),
        (380, 290), (410, 340), (370, 360), (130, 360)
    ]
    draw.polygon(shoe_coords, fill=(24, 20, 34, 255), outline=(255, 0, 127, 240), width=4)

    # Aerodynamic Sole Air Cushion (Neon Magenta Glow)
    sole_coords = [(120, 360), (410, 360), (395, 395), (135, 395)]
    draw.polygon(sole_coords, fill=(255, 0, 127, 240), outline=(255, 255, 255, 220), width=3)

    # Jet Micro Thrusters at heel
    draw.ellipse([115, 335, 145, 365], fill=(0, 240, 255, 255), outline=(255, 255, 255, 255), width=2)
    draw.line([(90, 350), (115, 350)], fill=(0, 240, 255, 200), width=4)

    # Speed wings & dragon claw accent
    draw.polygon([(240, 230), (320, 260), (280, 290)], fill=(45, 30, 60, 255), outline=(255, 0, 127, 200), width=2)

    img.save(f"{ITEMS_DIR}/item_sovereign_shoes.png", "PNG")
    print("Saved item_sovereign_shoes.png")

# =========================================================================
# 4. SOVEREIGN ACCESSORY: Hắc Long Ngọc Bội Thần Cảnh
# =========================================================================
def draw_sovereign_accessory():
    img = create_base_canvas(glow_color=(255, 0, 127))
    draw = ImageDraw.Draw(img)

    # Cord & Tassel
    draw.line([(CENTER, 60), (CENTER, 170)], fill=(255, 0, 127, 255), width=5)
    draw.line([(CENTER, 350), (CENTER, 450)], fill=(255, 0, 127, 255), width=6)
    draw.polygon([(CENTER - 25, 430), (CENTER + 25, 430), (CENTER, 470)], fill=(0, 240, 255, 255))

    # Outer Dragon Jade Ring
    draw.ellipse([150, 160, 362, 372], fill=(18, 14, 26, 255), outline=(255, 0, 127, 240), width=8)

    # Inner Core Ring
    draw.ellipse([190, 200, 322, 332], fill=(30, 20, 45, 255), outline=(0, 240, 255, 220), width=4)

    # Central Dragon Eye Gemstone
    draw.ellipse([226, 236, 286, 296], fill=(255, 0, 127, 255), outline=(255, 255, 255, 255), width=3)
    # Slit pupil
    draw.polygon([(CENTER, 242), (CENTER + 6, 266), (CENTER, 290), (CENTER - 6, 266)], fill=(255, 255, 255, 255))

    # Dragon horns / spikes around rim
    for deg in range(0, 360, 45):
        rad = math.radians(deg)
        x1 = CENTER + int(106 * math.cos(rad))
        y1 = 266 + int(106 * math.sin(rad))
        x2 = CENTER + int(130 * math.cos(rad))
        y2 = 266 + int(130 * math.sin(rad))
        draw.line([(x1, y1), (x2, y2)], fill=(255, 0, 127, 255), width=4)

    img.save(f"{ITEMS_DIR}/item_sovereign_accessory.png", "PNG")
    print("Saved item_sovereign_accessory.png")

# =========================================================================
# 5. SOVEREIGN MOUNT: Siêu Chiến Xa Hắc Long Cơ
# =========================================================================
def draw_sovereign_mount():
    img = create_base_canvas(glow_color=(255, 0, 127))
    draw = ImageDraw.Draw(img)

    # Ground shadow & hover glow
    draw.ellipse([80, 380, 432, 440], fill=(0, 0, 0, 160))
    draw.ellipse([120, 385, 392, 425], fill=(255, 0, 127, 80))

    # Hypercar Chassis (Futuristic Cyber Dragon)
    chassis = [
        (90, 350), (130, 270), (220, 230), (320, 230), (410, 290), (440, 360),
        (390, 375), (120, 375)
    ]
    draw.polygon(chassis, fill=(20, 18, 28, 255), outline=(255, 0, 127, 240), width=4)

    # Cockpit Windshield (Glossy Cyan HUD)
    cockpit = [(230, 235), (310, 235), (350, 280), (200, 280)]
    draw.polygon(cockpit, fill=(0, 240, 255, 180), outline=(255, 255, 255, 220), width=2)

    # Neon Headlights & Thruster Lines
    draw.line([(400, 310), (440, 350)], fill=(0, 240, 255, 255), width=4)
    draw.line([(100, 330), (180, 330)], fill=(255, 0, 127, 255), width=5)

    # Dragon Wings Aerodynamic Spoilers
    draw.polygon([(100, 280), (140, 230), (160, 280)], fill=(40, 25, 55, 255), outline=(255, 0, 127, 220), width=3)

    img.save(f"{ITEMS_DIR}/item_sovereign_mount.png", "PNG")
    print("Saved item_sovereign_mount.png")

# =========================================================================
# 6. MYTHIC WEAPON: Thần Kiếm Neon Phân Tách Không Gian (10 of 10)
# =========================================================================
def draw_mythic_weapon():
    img = create_base_canvas(glow_color=(239, 68, 68))
    draw = ImageDraw.Draw(img)

    # Sword Blade (Diagonal Katana 45 deg)
    blade_start = (140, 372)
    blade_end = (380, 132)

    # Glow under blade
    draw.line([blade_start, blade_end], fill=(239, 68, 68, 120), width=18)
    # Outer Ruby Plasma Edge
    draw.line([blade_start, blade_end], fill=(239, 68, 68, 255), width=8)
    # Inner White-hot core
    draw.line([blade_start, blade_end], fill=(255, 255, 255, 240), width=3)

    # Tsuba / Guard
    draw.ellipse([125, 355, 165, 395], fill=(35, 15, 20, 255), outline=(239, 68, 68, 255), width=4)

    # Hilt / Handle
    draw.line([(100, 412), (135, 377)], fill=(245, 158, 11, 255), width=8)

    # Lightning Sparks around blade
    sparks = [(220, 270), (280, 210), (320, 170)]
    for sx, sy in sparks:
        draw.line([(sx - 15, sy), (sx, sy - 10), (sx + 15, sy + 5)], fill=(255, 240, 100, 255), width=2)

    img.save(f"{ITEMS_DIR}/item_mythic_weapon.png", "PNG")
    print("Saved item_mythic_weapon.png")

# =========================================================================
# 7. MYTHIC JACKET: Giáp Điện Tử Lôi Thần (10 of 10)
# =========================================================================
def draw_mythic_jacket():
    img = create_base_canvas(glow_color=(239, 68, 68))
    draw = ImageDraw.Draw(img)

    draw.polygon([(180, 140), (256, 175), (332, 140), (375, 190), (355, 390), (157, 390), (137, 190)],
                 fill=(32, 16, 22, 255), outline=(239, 68, 68, 240), width=4)

    # Red Lightning Conduits
    draw.line([(256, 175), (256, 390)], fill=(239, 68, 68, 255), width=4)
    draw.line([(180, 140), (220, 280), (256, 310)], fill=(245, 158, 11, 220), width=3)
    draw.line([(332, 140), (292, 280), (256, 310)], fill=(245, 158, 11, 220), width=3)

    img.save(f"{ITEMS_DIR}/item_mythic_jacket.png", "PNG")
    print("Saved item_mythic_jacket.png")

# =========================================================================
# 8. MYTHIC MOUNT: Chiến Mã Phản Trọng Lực Cyberpunk (10 of 10)
# =========================================================================
def draw_mythic_mount():
    img = create_base_canvas(glow_color=(239, 68, 68))
    draw = ImageDraw.Draw(img)

    draw.ellipse([80, 390, 432, 440], fill=(0, 0, 0, 140))

    # Dual Hubless Light Cycle Wheels
    draw.ellipse([110, 290, 210, 390], fill=(20, 12, 18, 255), outline=(239, 68, 68, 255), width=8)
    draw.ellipse([302, 290, 402, 390], fill=(20, 12, 18, 255), outline=(239, 68, 68, 255), width=8)

    # Bike Body Frame
    bike_frame = [(160, 330), (230, 220), (310, 220), (360, 330), (260, 310)]
    draw.polygon(bike_frame, fill=(35, 18, 25, 255), outline=(239, 68, 68, 255), width=4)

    # Neon Handlebars & Headlight
    draw.line([(230, 220), (260, 180)], fill=(245, 158, 11, 255), width=5)
    draw.polygon([(310, 220), (350, 240), (330, 260)], fill=(255, 255, 255, 240))

    img.save(f"{ITEMS_DIR}/item_mythic_mount.png", "PNG")
    print("Saved item_mythic_mount.png")

# =========================================================================
# 9. LEGENDARY WEAPON & MOUNT: Gậy Bida Titan & Siêu Xe SH
# =========================================================================
def draw_legendary_items():
    # 9a. Gậy Bida Phản Quang Titan
    img = create_base_canvas(glow_color=(245, 158, 11))
    draw = ImageDraw.Draw(img)
    # Shaft
    draw.line([(100, 412), (370, 142)], fill=(210, 215, 225, 255), width=10)
    # Tip glowing neon ball
    draw.ellipse([360, 132, 400, 172], fill=(245, 158, 11, 255), outline=(255, 255, 255, 255), width=3)
    # Handle wrap
    draw.line([(100, 412), (180, 332)], fill=(40, 30, 20, 255), width=12)
    img.save(f"{ITEMS_DIR}/item_legendary_weapon.png", "PNG")
    print("Saved item_legendary_weapon.png")

    # 9b. Siêu Xe SH Độ Pô Titan
    img = create_base_canvas(glow_color=(245, 158, 11))
    draw = ImageDraw.Draw(img)
    # Scooter profile
    draw.ellipse([110, 310, 190, 390], fill=(25, 20, 15, 255), outline=(245, 158, 11, 255), width=6)
    draw.ellipse([320, 310, 400, 390], fill=(25, 20, 15, 255), outline=(245, 158, 11, 255), width=6)
    draw.polygon([(150, 340), (220, 250), (310, 240), (350, 320), (250, 350)], fill=(35, 28, 20, 255), outline=(245, 158, 11, 255), width=4)
    # Pô titan rainbow pipe
    draw.line([(180, 360), (130, 340)], fill=(0, 240, 255, 255), width=8)
    draw.line([(150, 350), (130, 340)], fill=(255, 0, 127, 255), width=8)
    img.save(f"{ITEMS_DIR}/item_legendary_mount.png", "PNG")
    print("Saved item_legendary_mount.png")

# =========================================================================
# 10. EPIC & RARE ITEMS
# =========================================================================
def draw_epic_and_rare():
    # 10a. Áo Khoác Bomber Neon (Epic)
    img = create_base_canvas(glow_color=(168, 85, 247))
    draw = ImageDraw.Draw(img)
    draw.polygon([(170, 150), (256, 180), (342, 150), (370, 210), (350, 380), (162, 380), (142, 210)],
                 fill=(35, 20, 50, 255), outline=(168, 85, 247, 240), width=4)
    draw.line([(256, 180), (256, 380)], fill=(0, 240, 255, 220), width=3)
    img.save(f"{ITEMS_DIR}/item_epic_jacket.png", "PNG")
    print("Saved item_epic_jacket.png")

    # 10b. Sneaker Dạ Quang (Epic)
    img = create_base_canvas(glow_color=(168, 85, 247))
    draw = ImageDraw.Draw(img)
    draw.polygon([(140, 340), (170, 230), (240, 190), (280, 230), (380, 300), (410, 350), (140, 350)],
                 fill=(30, 18, 45, 255), outline=(168, 85, 247, 255), width=4)
    draw.polygon([(130, 350), (410, 350), (395, 385), (145, 385)], fill=(168, 85, 247, 255))
    img.save(f"{ITEMS_DIR}/item_epic_shoes.png", "PNG")
    print("Saved item_epic_shoes.png")

    # 10c. Ống Tuýp Sắt Dạ Quang (Rare)
    img = create_base_canvas(glow_color=(59, 130, 246))
    draw = ImageDraw.Draw(img)
    draw.line([(120, 392), (392, 120)], fill=(180, 190, 210, 255), width=14)
    # Blue neon wire wrap
    for offset in range(160, 350, 35):
        draw.line([(offset - 10, 512 - offset), (offset + 10, 512 - offset - 15)], fill=(59, 130, 246, 255), width=4)
    img.save(f"{ITEMS_DIR}/item_rare_weapon.png", "PNG")
    print("Saved item_rare_weapon.png")

    # 10d. Quần Cargo Bụi Đời (Rare)
    img = create_base_canvas(glow_color=(59, 130, 246))
    draw = ImageDraw.Draw(img)
    draw.polygon([(180, 140), (250, 140), (240, 240), (220, 420), (160, 415), (170, 240)], fill=(22, 28, 40, 255), outline=(59, 130, 246, 200), width=3)
    draw.polygon([(262, 140), (332, 140), (342, 240), (352, 415), (292, 420), (272, 240)], fill=(22, 28, 40, 255), outline=(59, 130, 246, 200), width=3)
    img.save(f"{ITEMS_DIR}/item_rare_pants.png", "PNG")
    print("Saved item_rare_pants.png")

    # 10e. Dây Chuyền Móng Hổ (Rare)
    img = create_base_canvas(glow_color=(59, 130, 246))
    draw = ImageDraw.Draw(img)
    draw.arc([170, 140, 342, 310], start=0, end=180, fill=(245, 158, 11, 255), width=6)
    # Claw
    draw.polygon([(CENTER, 310), (CENTER + 15, 330), (CENTER + 5, 380), (CENTER - 15, 340)], fill=(240, 240, 240, 255), outline=(59, 130, 246, 255), width=2)
    img.save(f"{ITEMS_DIR}/item_rare_accessory.png", "PNG")
    print("Saved item_rare_accessory.png")

# =========================================================================
# 11. 5 GACHA CHESTS (3D CHEST RENDER)
# =========================================================================
def draw_chests():
    # Helper to draw an isometric chest box
    def draw_chest_box(color_primary, color_accent, glow_col, file_name):
        img = create_base_canvas(glow_color=glow_col)
        draw = ImageDraw.Draw(img)

        # Ground shadow
        draw.ellipse([110, 380, 402, 440], fill=(0, 0, 0, 160))

        # Chest base body (Front face)
        draw.rectangle([150, 240, 362, 390], fill=color_primary, outline=color_accent, width=5)

        # Chest Lid (Top)
        draw.polygon([(130, 240), (160, 170), (352, 170), (382, 240)], fill=color_primary, outline=color_accent, width=5)

        # Metal Straps / Rivets
        draw.line([(200, 170), (180, 390)], fill=color_accent, width=8)
        draw.line([(312, 170), (332, 390)], fill=color_accent, width=8)

        # Center Keyhole Lock / Emblem
        draw.ellipse([231, 220, 281, 270], fill=color_accent, outline=(255, 255, 255, 240), width=3)
        draw.polygon([(CENTER - 6, 240), (CENTER + 6, 240), (CENTER, 258)], fill=(10, 10, 15, 255))

        # Energy Glow Seam (Where lid opens)
        draw.line([(135, 240), (377, 240)], fill=(255, 255, 255, 220), width=3)

        img.save(f"{CHESTS_DIR}/{file_name}", "PNG")
        print(f"Saved {file_name}")

    # 1. Bronze Chest
    draw_chest_box((70, 50, 40, 255), (190, 120, 60, 255), (190, 120, 60), "chest_bronze.png")
    # 2. Silver Chest
    draw_chest_box((45, 55, 75, 255), (180, 210, 240, 255), (180, 210, 240), "chest_silver.png")
    # 3. Gold Chest
    draw_chest_box((80, 55, 15, 255), (245, 180, 20, 255), (245, 180, 20), "chest_gold.png")
    # 4. Mythic Chest (Lôi Thần)
    draw_chest_box((55, 15, 25, 255), (239, 68, 68, 255), (239, 68, 68), "chest_mythic.png")
    # 5. Sovereign Chest (Bảo Hạp Hắc Long Độc Tôn)
    draw_chest_box((30, 10, 35, 255), (255, 0, 127, 255), (255, 0, 127), "chest_sovereign.png")

def draw_fine_and_common():
    # Kính Râm LED Phong Cách (Rare Accessory)
    img = create_base_canvas(glow_color=(59, 130, 246))
    draw = ImageDraw.Draw(img)
    draw.polygon([(130, 230), (230, 230), (220, 290), (140, 290)], fill=(15, 20, 30, 255), outline=(0, 240, 255, 255), width=3)
    draw.polygon([(282, 230), (382, 230), (372, 290), (292, 290)], fill=(15, 20, 30, 255), outline=(0, 240, 255, 255), width=3)
    draw.line([(230, 250), (282, 250)], fill=(0, 240, 255, 255), width=4)
    img.save(f"{ITEMS_DIR}/item_rare_glasses.png", "PNG")

    # Xe Cào Cào (Rare Mount)
    img = create_base_canvas(glow_color=(59, 130, 246))
    draw = ImageDraw.Draw(img)
    draw.ellipse([110, 310, 190, 390], fill=(20, 25, 35, 255), outline=(59, 130, 246, 255), width=6)
    draw.ellipse([320, 310, 400, 390], fill=(20, 25, 35, 255), outline=(59, 130, 246, 255), width=6)
    draw.line([(150, 350), (240, 230), (310, 260), (360, 350)], fill=(59, 130, 246, 255), width=5)
    img.save(f"{ITEMS_DIR}/item_rare_mount.png", "PNG")

    # Dao Găm Xoay (Fine Weapon)
    img = create_base_canvas(glow_color=(16, 185, 129))
    draw = ImageDraw.Draw(img)
    draw.polygon([(256, 110), (290, 280), (256, 320), (222, 280)], fill=(200, 240, 220, 255), outline=(16, 185, 129, 255), width=3)
    draw.line([(256, 320), (256, 410)], fill=(50, 70, 60, 255), width=10)
    img.save(f"{ITEMS_DIR}/item_fine_weapon.png", "PNG")

    # Áo Gió (Fine Jacket)
    img = create_base_canvas(glow_color=(16, 185, 129))
    draw = ImageDraw.Draw(img)
    draw.polygon([(180, 150), (256, 180), (332, 150), (360, 200), (340, 380), (172, 380), (152, 200)], fill=(20, 40, 30, 255), outline=(16, 185, 129, 240), width=4)
    img.save(f"{ITEMS_DIR}/item_fine_jacket.png", "PNG")

    # Giày Vải (Fine Shoes)
    img = create_base_canvas(glow_color=(16, 185, 129))
    draw = ImageDraw.Draw(img)
    draw.polygon([(140, 340), (170, 250), (240, 210), (380, 310), (410, 350), (140, 350)], fill=(25, 45, 35, 255), outline=(16, 185, 129, 240), width=3)
    img.save(f"{ITEMS_DIR}/item_fine_shoes.png", "PNG")

    # Dây Chuyền Bạc (Fine Accessory)
    img = create_base_canvas(glow_color=(16, 185, 129))
    draw = ImageDraw.Draw(img)
    draw.arc([170, 150, 342, 320], start=0, end=180, fill=(200, 210, 220, 255), width=5)
    img.save(f"{ITEMS_DIR}/item_fine_accessory.png", "PNG")

    # Xe Tay Ga (Fine Mount)
    img = create_base_canvas(glow_color=(16, 185, 129))
    draw = ImageDraw.Draw(img)
    draw.ellipse([120, 320, 190, 390], fill=(20, 35, 30, 255), outline=(16, 185, 129, 255), width=5)
    draw.ellipse([320, 320, 390, 390], fill=(20, 35, 30, 255), outline=(16, 185, 129, 255), width=5)
    img.save(f"{ITEMS_DIR}/item_fine_mount.png", "PNG")

    # Gạch Ống Xây Dựng (Common Weapon)
    img = create_base_canvas(glow_color=(100, 116, 139))
    draw = ImageDraw.Draw(img)
    draw.polygon([(160, 230), (310, 170), (370, 210), (220, 270)], fill=(180, 80, 60, 255), outline=(100, 40, 30, 255), width=3)
    draw.polygon([(160, 230), (220, 270), (220, 350), (160, 310)], fill=(150, 60, 45, 255), outline=(100, 40, 30, 255), width=3)
    draw.polygon([(220, 270), (370, 210), (370, 290), (220, 350)], fill=(120, 50, 35, 255), outline=(100, 40, 30, 255), width=3)
    img.save(f"{ITEMS_DIR}/item_common_weapon.png", "PNG")

    # Áo Ba Lỗ (Common Jacket)
    img = create_base_canvas(glow_color=(100, 116, 139))
    draw = ImageDraw.Draw(img)
    draw.polygon([(190, 150), (256, 180), (322, 150), (345, 220), (330, 380), (182, 380), (167, 220)], fill=(220, 220, 220, 255), outline=(100, 116, 139, 255), width=3)
    img.save(f"{ITEMS_DIR}/item_common_jacket.png", "PNG")

    # Quần Đùi (Common Pants)
    img = create_base_canvas(glow_color=(100, 116, 139))
    draw = ImageDraw.Draw(img)
    draw.rectangle([180, 180, 332, 230], fill=(40, 45, 55, 255), outline=(100, 116, 139, 255), width=2)
    draw.polygon([(180, 230), (250, 230), (240, 340), (170, 330)], fill=(40, 45, 55, 255), outline=(100, 116, 139, 255), width=2)
    draw.polygon([(262, 230), (332, 230), (342, 330), (272, 340)], fill=(40, 45, 55, 255), outline=(100, 116, 139, 255), width=2)
    img.save(f"{ITEMS_DIR}/item_common_pants.png", "PNG")

    # Dép Tổ Ong (Common Shoes)
    img = create_base_canvas(glow_color=(100, 116, 139))
    draw = ImageDraw.Draw(img)
    draw.ellipse([140, 240, 372, 360], fill=(240, 230, 180, 255), outline=(180, 160, 100, 255), width=4)
    # Honeycomb holes
    for hx in range(190, 330, 30):
        for hy in range(270, 330, 25):
            draw.ellipse([hx, hy, hx + 12, hy + 12], fill=(160, 140, 80, 255))
    img.save(f"{ITEMS_DIR}/item_common_shoes.png", "PNG")

    # Bật Lửa Khò Đỏ (Common Accessory)
    img = create_base_canvas(glow_color=(100, 116, 139))
    draw = ImageDraw.Draw(img)
    draw.rectangle([220, 210, 292, 380], fill=(220, 40, 40, 255), outline=(160, 20, 20, 255), width=3)
    draw.rectangle([230, 160, 282, 210], fill=(180, 190, 200, 255))
    # Flame tip
    draw.polygon([(256, 100), (270, 150), (242, 150)], fill=(0, 240, 255, 255))
    img.save(f"{ITEMS_DIR}/item_common_accessory.png", "PNG")

    # Xe Đạp Phượng Hoàng Cổ (Common Mount)
    img = create_base_canvas(glow_color=(100, 116, 139))
    draw = ImageDraw.Draw(img)
    draw.ellipse([110, 300, 200, 390], fill=(0, 0, 0, 0), outline=(100, 116, 139, 255), width=6)
    draw.ellipse([312, 300, 402, 390], fill=(0, 0, 0, 0), outline=(100, 116, 139, 255), width=6)
    draw.line([(155, 345), (240, 250), (330, 250), (357, 345)], fill=(140, 150, 165, 255), width=5)
    img.save(f"{ITEMS_DIR}/item_common_mount.png", "PNG")

if __name__ == "__main__":
    print("Rendering Item PNGs...")
    draw_sovereign_jacket()
    draw_sovereign_pants()
    draw_sovereign_shoes()
    draw_sovereign_accessory()
    draw_sovereign_mount()
    draw_mythic_weapon()
    draw_mythic_jacket()
    draw_mythic_mount()
    draw_legendary_items()
    draw_epic_and_rare()
    draw_fine_and_common()
    draw_chests()
    print("All item & chest PNGs generated successfully!")

