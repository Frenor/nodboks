#!/usr/bin/env python3
"""
Lager WebP-varianter av et bilde.

    python3 scripts/klargjor-bilde.py assets/img/kasse-plast.png kasse-plast 600 900

Argumentene er kilde, navn på utdataene, og breddene som skal lages. Bredder
over kildens egen hoppes over – et bilde skaleres aldri opp, da lages det bare
piksler som ikke finnes.

Siden har ingen byggsteg, så ingen optimaliserer bilder for deg.
"""

import os
import sys
from PIL import Image

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KVALITET = 82
TAK_KB = 300


def main():
    if len(sys.argv) < 4:
        sys.exit("Bruk: python3 scripts/klargjor-bilde.py <kilde> <navn> <bredde...>")

    kilde, navn = sys.argv[1], sys.argv[2]
    bredder = sorted({int(x) for x in sys.argv[3:]})

    if not os.path.exists(kilde):
        sys.exit(f"Fant ikke {kilde}")

    bilde = Image.open(kilde).convert("RGB")
    b, h = bilde.size
    print(f"Kilde: {b} x {h} px, forhold {b / h:.2f}:1")

    laget = 0
    for bredde in bredder:
        if bredde > b:
            print(f"  · hopper over {bredde} px – kilden er bare {b} px bred")
            continue
        ny = bilde.resize((bredde, round(bredde * h / b)), Image.LANCZOS)
        sti = os.path.join(ROT, "assets/img", f"{navn}-{bredde}.webp")
        ny.save(sti, "WEBP", quality=KVALITET, method=6)
        kb = os.path.getsize(sti) / 1024
        merke = "" if kb <= TAK_KB else f"  ! over {TAK_KB} kB"
        print(f"  OK {navn}-{bredde}.webp  {ny.size[0]} x {ny.size[1]}  {kb:.0f} kB{merke}")
        laget += 1

    if not laget:
        sys.exit("Ingen filer skrevet – kilden er for liten.")


if __name__ == "__main__":
    main()
