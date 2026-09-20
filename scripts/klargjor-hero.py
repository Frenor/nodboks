#!/usr/bin/env python3
"""
Klargjør herobildet og kobler det inn på forsiden.

    python3 scripts/klargjor-hero.py assets/img/hero.png

Gjør tre ting: lager WebP i to bredder, rapporterer hva det koster i vekt, og
bytter ut strektegningen i index.html med et <picture>-element som har faste
mål og riktig lasteprioritet.

Grunnen til at det er et skript og ikke en manuell jobb: siden har ingen
byggsteg, så ingen optimaliserer bilder for deg. Et ukomprimert PNG på to
tusen piksler river ned den LCP-gevinsten vi tok ved å droppe webfonter.
"""

import os
import re
import sys
from PIL import Image

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Faste bredder, pluss kildens egen hvis den ligger mellom dem. Et bilde
# skaleres aldri opp – da lages det bare piksler som ikke finnes.
BREDDER = [1200, 1600, 2400]
KVALITET = 82
TAK_KB = 300


def main():
    if len(sys.argv) < 2:
        sys.exit("Bruk: python3 scripts/klargjor-hero.py <sti til bildet>")

    kilde = sys.argv[1]
    if not os.path.exists(kilde):
        sys.exit(f"Fant ikke {kilde}")

    bilde = Image.open(kilde).convert("RGB")
    b, h = bilde.size
    forhold = b / h
    print(f"Kilde: {b} × {h} px, forhold {forhold:.2f}:1")
    if forhold < 2.0:
        print("  ! Smalere enn ventet. Heroen er satt opp for et vidt format;")
        print("    sjekk at motivet ikke beskjæres feil på mobil.")

    mål = sorted({min(x, b) for x in BREDDER})
    utdata = []
    for bredde in mål:
        navn = f"hero-{bredde}"
        ny = bilde.resize((bredde, round(bredde / forhold)), Image.LANCZOS)
        sti = os.path.join(ROT, "assets/img", navn + ".webp")
        ny.save(sti, "WEBP", quality=KVALITET, method=6)
        kb = os.path.getsize(sti) / 1024
        merke = "" if kb <= TAK_KB else f"  ! over {TAK_KB} kB – vurder lavere kvalitet"
        print(f"  ✓ {navn}.webp  {ny.size[0]} × {ny.size[1]}  {kb:.0f} kB{merke}")
        utdata.append((navn, ny.size))

    if not utdata:
        sys.exit("Ingen filer skrevet – kilden er for liten.")

    # srcset bygges av filene som faktisk ble laget, aldri av lista over
    # ønskede bredder. En kilde som er smalere enn taket skal ikke gi en
    # peker til en fil som ikke finnes.
    srcset = ", ".join(f"assets/img/{n}.webp {s[0]}w" for n, s in reversed(utdata))
    stor = utdata[-1]
    markering = f"""      <figure class="hero__bilde">
        <picture>
          <source srcset="{srcset}"
                  sizes="(min-width: 60rem) 50vw, 100vw" type="image/webp">
          <img src="assets/img/{stor[0]}.webp"
               width="{stor[1][0]}" height="{stor[1][1]}"
               alt="En voksen og et barn koker vann på et stormkjøkken på et svaberg i skumringen. Barnet holder en hodelykt, og en vannkanne står ved siden av."
               fetchpriority="high" decoding="async">
        </picture>
      </figure>"""

    sti_html = os.path.join(ROT, "index.html")
    html = open(sti_html, encoding="utf-8").read()
    treff = re.search(r'      <figure class="eske">.*?</figure>', html, re.S)
    if treff:
        open(sti_html, "w", encoding="utf-8").write(
            html[: treff.start()] + markering + html[treff.end():]
        )
        print("\n✓ index.html: strektegningen er byttet ut med bildet")
    elif 'class="hero__bilde"' in html:
        eldre = re.search(r'      <figure class="hero__bilde">.*?</figure>', html, re.S)
        open(sti_html, "w", encoding="utf-8").write(
            html[: eldre.start()] + markering + html[eldre.end():]
        )
        print("\n✓ index.html: markeringen er oppdatert")
    else:
        print("\n! Fant verken strektegningen eller bildet i index.html.")
        print("  Lim inn dette der heroillustrasjonen skal stå:\n")
        print(markering)

    print("\nKjør til slutt:  node scripts/kontrast.mjs")


if __name__ == "__main__":
    main()
