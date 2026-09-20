#!/usr/bin/env python3
"""
Genererer rasterbildene fra paletten i tokens.css.

Open Graph-bildet og app-ikonene kan ikke være SVG, så de må tegnes. Tidligere
var hex-verdiene skrevet inn for hånd, og da drev bildene fra paletten uten at
noen oppdaget det. Dette skriptet leser tokens.css direkte, på samme måte som
scripts/kontrast.mjs, slik at det ikke kan skje igjen.

    python3 scripts/lag-bilder.py
"""

import os
import re
from PIL import Image, ImageDraw, ImageFont

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def les_tokens():
    """Henter mørk modus-tokens, som er den primære identiteten."""
    css = open(os.path.join(ROT, "assets/css/tokens.css"), encoding="utf-8").read()
    i = css.index(':root[data-theme="dark"]')
    blokk = css[i : css.index("}", i)]
    ut = {}
    for navn, verdi in re.findall(r"--([a-z0-9-]+):\s*(#[0-9A-Fa-f]{3,8})", blokk):
        ut[navn] = verdi
    return ut


T = les_tokens()
GRUNN = T["brand"]
FLATE = T["bg"]
TEKST = T["text"]
AKSENT = T["accent"]
DEMPET = T["text-muted"]
LINJE = T["border"]


def merke(d, x, y, s, ringfarge, kjernefarge):
    """Glødepunktet: ring som holder en fylt kjerne. Se docs/profil.md."""
    u = s / 32
    strek = max(2, round(3 * u))
    r = 10.5 * u
    d.ellipse([x + 16 * u - r, y + 16 * u - r, x + 16 * u + r, y + 16 * u + r],
              outline=ringfarge, width=strek)
    k = 5 * u
    d.ellipse([x + 16 * u - k, y + 16 * u - k, x + 16 * u + k, y + 16 * u + k],
              fill=kjernefarge)


def font(kandidater, storrelse):
    for sti in kandidater:
        if os.path.exists(sti):
            try:
                return ImageFont.truetype(sti, storrelse)
            except Exception:
                pass
    return ImageFont.load_default()


SERIF = ["/System/Library/Fonts/Supplemental/Palatino.ttc",
         "/System/Library/Fonts/Supplemental/Georgia.ttf",
         "/System/Library/Fonts/Supplemental/Times New Roman.ttf"]
SANS = ["/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/Supplemental/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial.ttf"]

# --- App-ikoner ------------------------------------------------------------
for sti, storrelse in [("apple-touch-icon.png", 180),
                       ("assets/img/ikon-192.png", 192),
                       ("assets/img/ikon-512.png", 512)]:
    im = Image.new("RGB", (storrelse, storrelse), GRUNN)
    merke(ImageDraw.Draw(im), storrelse * 0.16, storrelse * 0.16, storrelse * 0.68,
          TEKST, AKSENT)
    im.save(os.path.join(ROT, sti))
    print("skrev", sti)

# --- Open Graph ------------------------------------------------------------
B, H = 1200, 630
og = Image.new("RGB", (B, H), FLATE)
d = ImageDraw.Draw(og)

merke(d, 84, 74, 64, TEKST, AKSENT)
d.text((172, 84), "NØDBOKS", font=font(SANS, 30), fill=TEKST)

d.text((84, 212), "Beredskap du", font=font(SERIF, 78), fill=TEKST)
d.text((84, 306), "faktisk bruker", font=font(SERIF, 78), fill=AKSENT)

f = font(SANS, 31)
d.text((86, 436), "Ferdigpakket egenberedskap for sju døgn,", font=f, fill=DEMPET)
d.text((86, 480), "med utstyr du tar med på tur.", font=f, fill=DEMPET)

d.line([84, 552, 1116, 552], fill=LINJE, width=2)
d.text((84, 574), "nodboks.no", font=font(SANS, 26), fill=DEMPET)
og.save(os.path.join(ROT, "assets/img/og-bilde.png"), quality=92)
print("skrev assets/img/og-bilde.png")
print("palett lest fra tokens.css:", GRUNN, FLATE, TEKST, AKSENT)
