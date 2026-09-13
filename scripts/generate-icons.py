from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent.parent
FONT = Path("C:/Windows/Fonts/segoeuib.ttf")


def make_icon(size: int) -> None:
    scale = size / 512
    image = Image.new("RGB", (size, size), "#20342b")
    draw = ImageDraw.Draw(image)
    width = round(44 * scale)
    bounds = tuple(round(value * scale) for value in (102, 90, 410, 398))
    draw.arc(bounds, start=0, end=200, fill="#d8ff53", width=width)

    font = ImageFont.truetype(str(FONT), round(112 * scale))
    slash_font = ImageFont.truetype(str(FONT), round(78 * scale))
    draw.text((250 * scale, 248 * scale), "rep", font=font, fill="white", anchor="mm")
    draw.text((365 * scale, 254 * scale), "/", font=slash_font, fill="#d8ff53", anchor="mm")

    image.save(ROOT / "icons" / f"icon-{size}.png", optimize=True)


for icon_size in (180, 192, 512):
    make_icon(icon_size)
