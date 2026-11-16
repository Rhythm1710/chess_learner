"""Draw the Chess Learner home-screen icons.

Run from the repo root: python3 scripts/generate-icons.py
"""

from pathlib import Path

from PIL import Image, ImageDraw

BARK = (16, 18, 16, 255)
FELT = (196, 165, 116, 255)
BONE = (26, 22, 16, 255)
ROOT = Path(__file__).resolve().parents[1]


def draw_king(draw: ImageDraw.ImageDraw, size: int, scale: float = 1) -> None:
    cx = size / 2
    top = size * (0.5 - 0.24 * scale)
    arm = size * 0.03 * scale
    cross_h = size * 0.13 * scale
    draw.rectangle([cx - arm, top, cx + arm, top + cross_h], fill=BONE)
    bar_y = top + size * 0.04 * scale
    draw.rectangle(
        [cx - size * 0.065 * scale, bar_y, cx + size * 0.065 * scale, bar_y + arm * 2],
        fill=BONE,
    )
    crown_top = top + cross_h * 0.92
    draw.polygon(
        [
            (cx - size * 0.15 * scale, crown_top + size * 0.07 * scale),
            (cx - size * 0.11 * scale, crown_top),
            (cx - size * 0.035 * scale, crown_top + size * 0.05 * scale),
            (cx, crown_top - size * 0.01 * scale),
            (cx + size * 0.035 * scale, crown_top + size * 0.05 * scale),
            (cx + size * 0.11 * scale, crown_top),
            (cx + size * 0.15 * scale, crown_top + size * 0.07 * scale),
        ],
        fill=BONE,
    )
    body_top = crown_top + size * 0.065 * scale
    body_bottom = body_top + size * 0.18 * scale
    draw.polygon(
        [
            (cx - size * 0.09 * scale, body_top),
            (cx + size * 0.09 * scale, body_top),
            (cx + size * 0.15 * scale, body_bottom),
            (cx - size * 0.15 * scale, body_bottom),
        ],
        fill=BONE,
    )
    base_top = body_bottom + size * 0.012 * scale
    radius = max(2, int(size * 0.02 * scale))
    draw.rounded_rectangle(
        [
            cx - size * 0.18 * scale,
            base_top,
            cx + size * 0.18 * scale,
            base_top + size * 0.045 * scale,
        ],
        radius=radius,
        fill=BONE,
    )


def rounded_icon(size: int) -> Image.Image:
    image = Image.new("RGBA", (size, size), BARK)
    draw = ImageDraw.Draw(image)
    margin = int(size * 0.08)
    draw.rounded_rectangle(
        [margin, margin, size - 1 - margin, size - 1 - margin],
        radius=int(size * 0.22),
        fill=FELT,
    )
    draw_king(draw, size, scale=0.92)
    return image


def maskable_icon(size: int) -> Image.Image:
    image = Image.new("RGBA", (size, size), FELT)
    draw = ImageDraw.Draw(image)
    draw_king(draw, size, scale=0.62)
    return image


def main() -> None:
    icons = ROOT / "public" / "icons"
    icons.mkdir(parents=True, exist_ok=True)
    rounded_icon(192).save(icons / "icon-192.png")
    rounded_icon(512).save(icons / "icon-512.png")
    maskable_icon(512).save(icons / "icon-maskable-512.png")
    maskable_icon(180).save(ROOT / "public" / "apple-touch-icon.png")
    favicon = rounded_icon(32)
    favicon.save(ROOT / "app" / "favicon.ico", sizes=[(32, 32)])


if __name__ == "__main__":
    main()
