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
BREDDER = [(1600, "hero-1600"), (2400, "hero-2400")]
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

    utdata = []
    for bredde, navn in BREDDER:
        if bredde > b:
            print(f"  · hopper over {bredde} px – kilden er bare {b} px bred")
            continue
        ny = bilde.resize((bredde, round(bredde / forhold)), Image.LANCZOS)
        sti = os.path.join(ROT, "assets/img", navn + ".webp")
        ny.save(sti, "WEBP", quality=KVALITET, method=6)
        kb = os.path.getsize(sti) / 1024
        merke = "" if kb <= TAK_KB else f"  ! over {TAK_KB} kB – vurder lavere kvalitet"
        print(f"  ✓ {navn}.webp  {ny.size[0]} × {ny.size[1]}  {kb:.0f} kB{merke}")
        utdata.append((navn, ny.size))

    if not utdata:
        sys.exit("Ingen filer skrevet – kilden er for liten.")

    stor = utdata[-1]
    markering = f"""      <figure class="hero__bilde">
        <picture>
          <source srcset="assets/img/hero-2400.webp 2400w, assets/img/hero-1600.webp 1600w"
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
        print("\n· index.html har allerede bildet – markeringen er ikke rørt")
    else:
        print("\n! Fant verken strektegningen eller bildet i index.html.")
        print("  Lim inn dette der heroillustrasjonen skal stå:\n")
        print(markering)

    print("\nKjør til slutt:  node scripts/kontrast.mjs")


if __name__ == "__main__":
    main()
