"""
Portrait & Boss Generator for JaeBinPlatform
Generates high-detail character portraits and boss showcases with cyber aesthetic.
Pure character / boss artwork without stars or text.
"""

from PIL import Image, ImageDraw, ImageFilter
import math
import os

CHAR_DIR = "apps/web-portal/public/images/characters"
BOSS_DIR = "apps/web-portal/public/images/bosses"
os.makedirs(CHAR_DIR, exist_ok=True)
os.makedirs(BOSS_DIR, exist_ok=True)

SIZE = 512
CENTER = SIZE // 2

def create_portrait_base(primary_glow, secondary_glow):
    img = Image.new("RGBA", (SIZE, SIZE), (12, 16, 26, 255))
    glow = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(glow)
    # Radial dual glow
    for r in range(240, 40, -15):
        alpha = int(45 * (1 - r / 240))
        d.ellipse([CENTER - r, CENTER - r + 30, CENTER + r, CENTER + r + 30],
                  fill=(primary_glow[0], primary_glow[1], primary_glow[2], alpha))
    for r in range(160, 20, -12):
        alpha = int(60 * (1 - r / 160))
        d.ellipse([CENTER - r, CENTER - r - 40, CENTER + r, CENTER + r - 40],
                  fill=(secondary_glow[0], secondary_glow[1], secondary_glow[2], alpha))
    glow = glow.filter(ImageFilter.GaussianBlur(18))
    return Image.alpha_composite(img, glow)

# 1. Long Bida (Muscular Brawler / Titanium Cue)
def gen_longbida():
    img = create_portrait_base((168, 85, 247), (245, 158, 11))
    d = ImageDraw.Draw(img)
    # Heavy shoulders & muscular body
    d.polygon([(140, 512), (200, 320), (312, 320), (372, 512)], fill=(28, 22, 38, 255), outline=(168, 85, 247, 200), width=4)
    # Head & jaw
    d.polygon([(216, 170), (296, 170), (280, 280), (256, 310), (232, 280)], fill=(50, 40, 48, 255))
    # Brawler hair (Buzz cut with lightning shaved lines)
    d.polygon([(206, 170), (256, 110), (306, 170)], fill=(20, 16, 24, 255))
    d.line([(220, 150), (240, 160)], fill=(245, 158, 11, 255), width=3)
    # Cybernetic eye glow (Amber)
    d.ellipse([270, 205, 285, 220], fill=(245, 158, 11, 255), outline=(255, 255, 255, 255), width=2)
    # Heavy titanium cue resting on shoulder
    d.line([(100, 480), (410, 100)], fill=(220, 230, 245, 255), width=16)
    d.line([(380, 140), (410, 100)], fill=(245, 158, 11, 255), width=18)
    img.save(f"{CHAR_DIR}/avatar_longbida.png", "PNG")
    print("Saved avatar_longbida.png")

# 2. Hùng Pô Độ (Stunt Biker / Blue Flame Exhaust)
def gen_hungpodo():
    img = create_portrait_base((59, 130, 246), (0, 240, 255))
    d = ImageDraw.Draw(img)
    # Leather biker jacket with blue LED shoulder pads
    d.polygon([(130, 512), (190, 310), (322, 310), (382, 512)], fill=(18, 26, 40, 255), outline=(59, 130, 246, 220), width=4)
    # Angular helmet / cyber racing mask
    d.polygon([(210, 160), (302, 160), (315, 250), (256, 290), (197, 250)], fill=(15, 20, 32, 255), outline=(0, 240, 255, 240), width=3)
    # Glowing visor (Cyan laser sweep)
    d.rectangle([215, 200, 297, 230], fill=(0, 240, 255, 240), outline=(255, 255, 255, 255), width=2)
    # Exhaust pipe flames behind back
    d.polygon([(110, 320), (80, 220), (130, 260)], fill=(0, 240, 255, 220))
    d.polygon([(402, 320), (432, 220), (382, 260)], fill=(0, 240, 255, 220))
    img.save(f"{CHAR_DIR}/avatar_hungpodo.png", "PNG")
    print("Saved avatar_hungpodo.png")

# 3. Linh Neon (Cyan Twintails Assassin)
def gen_linhneon():
    img = create_portrait_base((0, 240, 255), (255, 0, 127))
    d = ImageDraw.Draw(img)
    # Slim cyber jacket with pink trim
    d.polygon([(160, 512), (210, 330), (302, 330), (352, 512)], fill=(20, 28, 38, 255), outline=(255, 0, 127, 200), width=3)
    # Face & chin
    d.polygon([(220, 190), (292, 190), (276, 275), (256, 295), (236, 275)], fill=(55, 45, 52, 255))
    # Twin braids (Cyan & Neon Pink)
    d.polygon([(170, 170), (220, 170), (160, 410), (130, 390)], fill=(0, 240, 255, 240))
    d.polygon([(292, 170), (342, 170), (382, 390), (352, 410)], fill=(255, 0, 127, 240))
    # Dual spinning daggers in foreground
    d.line([(140, 380), (200, 310)], fill=(0, 240, 255, 255), width=6)
    d.line([(372, 380), (312, 310)], fill=(255, 0, 127, 255), width=6)
    img.save(f"{CHAR_DIR}/avatar_linhneon.png", "PNG")
    print("Saved avatar_linhneon.png")

# 4. Tuấn Cyber (Tactician Hacker Sniper)
def gen_tuancyber():
    img = create_portrait_base((139, 92, 246), (16, 185, 129))
    d = ImageDraw.Draw(img)
    # Tactical hooded poncho
    d.polygon([(120, 512), (180, 290), (256, 130), (332, 290), (392, 512)], fill=(18, 22, 32, 255), outline=(139, 92, 246, 220), width=4)
    # Shadowed face inside hood
    d.ellipse([226, 180, 286, 245], fill=(10, 12, 18, 255))
    # Glowing infrared cybernetic monocle target
    d.ellipse([250, 195, 272, 217], fill=(239, 68, 68, 255), outline=(255, 255, 255, 255), width=2)
    d.line([(240, 206), (282, 206)], fill=(239, 68, 68, 200), width=2)
    # Floating holographic matrix code
    for y in range(280, 440, 25):
        d.line([(180, y), (332, y)], fill=(16, 185, 129, 140), width=2)
    img.save(f"{CHAR_DIR}/avatar_tuancyber.png", "PNG")
    print("Saved avatar_tuancyber.png")

# 5. Mai Dạ Quang (Hologram Healer Lotus Goddess)
def gen_maidaquang():
    img = create_portrait_base((244, 114, 182), (250, 204, 21))
    d = ImageDraw.Draw(img)
    # Flowing iridescent modern cheongsam
    d.polygon([(150, 512), (210, 320), (302, 320), (362, 512)], fill=(32, 20, 32, 255), outline=(244, 114, 182, 220), width=3)
    # Elegant graceful head
    d.ellipse([226, 160, 286, 245], fill=(52, 42, 48, 255))
    # Long flowing dark hair with pink highlight ribbons
    d.polygon([(210, 150), (256, 100), (302, 150), (330, 410), (182, 410)], fill=(24, 14, 26, 255))
    # Floating golden holographic lotus in front
    lotus_y = 360
    for deg in range(0, 360, 45):
        rad = math.radians(deg)
        lx = CENTER + int(35 * math.cos(rad))
        ly = lotus_y + int(25 * math.sin(rad))
        d.ellipse([lx - 12, ly - 12, lx + 12, ly + 12], fill=(250, 204, 21, 200), outline=(255, 255, 255, 255), width=2)
    d.ellipse([CENTER - 15, lotus_y - 15, CENTER + 15, lotus_y + 15], fill=(255, 255, 255, 255))
    img.save(f"{CHAR_DIR}/avatar_maidaquang.png", "PNG")
    print("Saved avatar_maidaquang.png")

# 6. Boss Cửu Linh Thị Xà (9-Headed Cyber Serpent Titan)
def gen_cuulinhthixa():
    img = create_portrait_base((168, 85, 247), (239, 68, 68))
    d = ImageDraw.Draw(img)
    # Central monstrous serpentine titan head
    d.polygon([(216, 180), (256, 80), (296, 180), (280, 330), (256, 360), (232, 330)], fill=(30, 16, 40, 255), outline=(168, 85, 247, 255), width=5)
    # Glowing crimson/violet venomous eyes
    d.ellipse([230, 190, 245, 210], fill=(239, 68, 68, 255), outline=(255, 255, 255, 255), width=2)
    d.ellipse([267, 190, 282, 210], fill=(239, 68, 68, 255), outline=(255, 255, 255, 255), width=2)
    # Cybernetic serpent fangs dripping purple plasma
    d.polygon([(242, 280), (248, 330), (252, 280)], fill=(0, 240, 255, 255))
    d.polygon([(260, 280), (264, 330), (270, 280)], fill=(0, 240, 255, 255))
    # Multiple surrounding shadow snake heads
    surrounding = [(120, 130), (100, 250), (140, 380), (392, 130), (412, 250), (372, 380)]
    for sx, sy in surrounding:
        d.ellipse([sx - 35, sy - 25, sx + 35, sy + 25], fill=(22, 10, 32, 255), outline=(168, 85, 247, 180), width=3)
        d.ellipse([sx - 10, sy - 8, sx - 2, sy], fill=(239, 68, 68, 255))
        d.ellipse([sx + 2, sy - 8, sx + 10, sy], fill=(239, 68, 68, 255))
    img.save(f"{BOSS_DIR}/boss_cuulinhthixa.png", "PNG")
    print("Saved boss_cuulinhthixa.png")

# 7. Boss Sư Đà Vương (7 Chuyển - Lion Demon King)
def gen_sudavuong():
    img = create_portrait_base((245, 158, 11), (239, 68, 68))
    d = ImageDraw.Draw(img)
    # Demonic fiery lion mane
    for deg in range(0, 360, 20):
        rad = math.radians(deg)
        mx = CENTER + int(150 * math.cos(rad))
        my = 230 + int(130 * math.sin(rad))
        d.polygon([(CENTER, 230), (mx, my), (mx + 15, my - 15)], fill=(245, 158, 11, 200))
    # Golden heavy warlord helm & face
    d.polygon([(206, 170), (256, 120), (306, 170), (290, 280), (256, 310), (222, 280)], fill=(45, 25, 15, 255), outline=(245, 158, 11, 255), width=5)
    # Roaring demonic maw with sharp fangs
    d.polygon([(236, 240), (276, 240), (256, 280)], fill=(20, 5, 5, 255))
    d.polygon([(242, 240), (246, 255), (250, 240)], fill=(255, 255, 255, 255))
    d.polygon([(262, 240), (266, 255), (270, 240)], fill=(255, 255, 255, 255))
    # Burning nether eyes
    d.ellipse([230, 190, 248, 208], fill=(239, 68, 68, 255), outline=(255, 255, 255, 255), width=2)
    d.ellipse([264, 190, 282, 208], fill=(239, 68, 68, 255), outline=(255, 255, 255, 255), width=2)
    img.save(f"{BOSS_DIR}/boss_sudavuong.png", "PNG")
    print("Saved boss_sudavuong.png")

if __name__ == "__main__":
    print("Generating Character & Boss Avatars...")
    gen_longbida()
    gen_hungpodo()
    gen_linhneon()
    gen_tuancyber()
    gen_maidaquang()
    gen_cuulinhthixa()
    gen_sudavuong()
    print("All avatars generated successfully!")
