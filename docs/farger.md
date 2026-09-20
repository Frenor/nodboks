# Farger: «Natt»

## Hvorfor den forrige paletten ble forkastet

Den første paletten var varm papirhvit bakgrunn (`#FBF8F3`) med en brent
ravgul aksent (`#B4551A`). Oppdragsgiver kjente den igjen: det er i praksis
AI-assistenten Claudes egen palett. Kritikken var berettiget.

En designkritiker gikk deretter gjennom tokens-filen og alle fire
designskissene og fant at problemet var systematisk, ikke enkeltstående:

- **70–88 % av de mettede fargeverdiene lå i hue 20–50.** `skisse-produkt`
  87,9 %, `skisse-husholdning` 73,2 %, `skisse-redaksjonell` 70,2 %. Fire
  retninger som skulle være uavhengige brukte altså nesten hele fargebudsjettet
  sitt på de samme tretti hue-gradene.
- **Alle fem grunnflatene lå innenfor 8 hue-grader av hverandre** — og av
  Claudes `#FAF9F5`. `#FBF8F3`, `#F7F1E8`, `#F2EFE7`, `#F5F2ED`, `#FAF7F1`.
- **Én skisse leverte en aksent 3 grader fra Claudes hue** — altså nærmere enn
  den som allerede var forkastet.
- **Mørk modus var regnet ut, ikke designet.** Fire av fem filer brukte samme
  mekaniske regel: +7 hue, +20 lightness. Alle fem hadde en kommentar som
  påsto at mørk modus var egen palett.

Det siste er verdt å huske: en kommentar som beskriver en intensjon koden ikke
utfører, er verre enn ingen kommentar.

## Markedskartet

Hentet 20. september 2026 ved å laste ned konkurrentenes stilark og telle
hex-verdier, gråtoner filtrert bort.

| Hue-bånd | Forekomster | Hvem |
| --- | ---: | --- |
| Blå 195–255 | 13 | Primærfarge hos 5 av 9. **Hver eneste mørke flate i markedet** er marineblå: `#0e2e5a`, `#003388`, `#1d3686`, `#110077`, `#222299` |
| Grønn 70–165 | 8 | spredt, som sekundærfarge |
| Oransje/rav 20–50 | 7 | beredskap24 `#fe9103`, norberedskap `#e8af57` — og den forkastede paletten |
| Rød 340–20 | 6 | Røde Kors `#d42b1e`, norgesberedskap `#e03114` |
| Cyan/teal 165–195 | 5 | krisesikker og hjemmeberedt, begge `#108474` |
| **Gul 50–70** | **1** | praktisk talt ledig |

Blått er kategoriens trygghetsrefleks, og det er fullt. Rav er både opptatt og
forkastet. Gult er tomt.

## Kilden

**Strontiumaluminat, SrAl₂O₄:Eu²⁺,Dy³⁺** — det etterlysende pigmentet i
rømningsmerking og nødskilt. Det lader seg i dagslys og lyser grønngult i
mørket, i timer etter at strømmen er borte.

Det er ikke en stemning. Det er nøyaktig det produktet lover, i kjemisk form:
noe som tar imot lys mens alt er normalt, og gir det fra seg når det ikke er
det.

Derav grunnideen: **mørk modus er den primære identiteten**, fordi mørket er
når boksen betyr noe. Lys modus er dagvarianten av den samme identiteten.

### Utledningen

Pigmentet har to tilstander, og modiene henter fra hver sin:

| Tilstand | Modus | Farge | Hue |
| --- | --- | --- | ---: |
| Uladet pigment i dagslys — blekt grønngult pulver, mørknet til tekstbærende valør | Lys | `#52601B` | 72 |
| Ladet pigment i mørket — ettergløden | Mørk | `#D9E6A0` | 71 |

Samme kulør, motsatt valør. Det er utledningen. Det er ikke regelen «løft
lysheten i mørk modus», som er det de forkastede palettene gjorde.

At dette også lander i det ene ledige hue-båndet i markedet er en bonus, ikke
begrunnelsen.

## Paletten

Alle kontrastforhold er målt, ikke påstått. `node scripts/kontrast.mjs` leser
tokens rett ut av `tokens.css` og feiler hvis et par ligger under kravet.

### Lys modus — dagslys

| Token | Hex | Rolle | Målt |
| --- | --- | --- | --- |
| `--bg` | `#F1F4F1` | sidebakgrunn, kjølig grønnlig dagslys | — |
| `--surface` | `#FFFFFF` | kort | 1,11:1 mot bg |
| `--surface-2` | `#E3E9E4` | innskutt panel | 1,23:1 mot surface |
| `--text` | `#10201C` | brødtekst | 15,3:1 |
| `--text-muted` | `#4E615B` | dempet | 6,4:1 |
| `--text-faint` | `#6E827B` | svak, kun stor tekst | 3,9:1 |
| `--border-strong` | `#6B7D76` | skjemakontroller | 4,2:1 mot hvit |
| `--accent` | `#52601B` | uladet pigment | 6,2:1 mot bg |
| `--accent-ink` | `#FFFFFF` | knappetekst | 6,9:1 |
| `--brand` | `#12211D` | natten, også om dagen | 14,8:1 med brand-ink |
| `--focus` | `#0F6A8C` | fokusring | 5,0:1 |

### Mørk modus — natten

| Token | Hex | Rolle | Målt |
| --- | --- | --- | --- |
| `--bg` | `#0B1513` | natten selv | — |
| `--surface` | `#182A25` | kort | 1,24:1 mot bg |
| `--surface-2` | `#253A34` | innskutt panel | 1,24:1 mot surface |
| `--text` | `#E8EFE9` | brødtekst | 14,1:1 |
| `--text-muted` | `#9CB0AA` | dempet | 6,5:1 |
| `--border-strong` | `#6E8880` | skjemakontroller | 3,2:1 mot kort |
| `--accent` | `#D9E6A0` | ettergløden | 12,6:1 mot bg |
| `--accent-ink` | `#0B1513` | knappetekst | 12,6:1 |
| `--focus` | `#B7E3EF` | fokusring | 10,7:1 |

## De to svakhetene som ble rettet

Fargearket som ble levert hadde to dokumenterte feil:

1. **Flatene lå for tett.** Kort mot bakgrunn var **1,08:1** og innskutt felt
   mot kort **1,13:1** — i praksis usynlig uten kantlinje, altså nøyaktig den
   krykken vi kritiserte markedet for. Rettet til 1,24:1 på begge trinn i mørk
   modus.
2. **Lysmodus-aksenten lå i konkurrentenes grønnbånd.** `#0F463C` er hue 169;
   krisesikker og hjemmeberedt bruker begge `#108474` (hue 172). Flyttet til
   hue 72, som også er der kilden peker.

En tredje feil fulgte fra den gamle paletten og er rettet på veien:
`--border-strong` lå på **1,64:1** på skjemakontroller mot kravet 3:1 i
WCAG 1.4.11. Et inputfelt hvis eneste avgrensning er 1,64:1 er ikke synlig for
en bruker med redusert kontrastfølsomhet.

## Semantiske farger

Når merkeaksenten selv er grønngul, kolliderer den med konvensjonen «suksess =
grønn, advarsel = gul». En advarsel med samme farge som kjøpsknappen er
ubrukelig, og pakkebyggeren bruker faktisk disse varslene — om energidekning,
vanndekning og holdbarhet.

Derfor er `--ok` skjøvet mot blågrønt (hue 150) og `--warn` mot oransje
(hue 30), begge godt unna aksentens hue 72. I tillegg bruker varslene alltid
ikon og tekst, aldri farge alene.

## De fire retningene som tapte

| Retning | Kilde | Hvorfor den tapte |
| --- | --- | --- |
| **Signal** | NVEs og Meteorologisk institutts firetrinns faregradsskala | Sterkest markedsargument — gult er ledig — men vanskeligst å få til å virke dyr framfor billig |
| **Sink og messing** | De fysiske materialene i kassa, hver med navngitt pigment | Vakker og ærlig, men risikerer å lese som gråbrun framfor bevisst |
| **Arkiv** | Norsk offentlig trykksaktradisjon, fire navngitte trykksaker | Stempelfiolett er distinkt, men kilden er en stilart snarere enn noe ved produktet |
| **Blåtimen** | Chappuis-absorpsjonen — grunnen til at skumringen er blåfiolett | Fysisk presis utledning, men fiolett leser som teknologi, ikke som beredskap |

## Hva vi bevisst ikke gjør

- **Ingen glødende gradient bak hero.** Kritikeren fant fem lag av oransje
  glød i én av skissene, uten referent — esken lyser ikke, lykten er ikke tent.
- **Ingen skygge som erstatning for flateskille.** Flater skilles med farge.
- **Ingen skjold-med-hake ved siden av DSBs navn.** Skjold med hake *er* det
  visuelle språket for en sertifisering. Kombinert med et direktoratsnavn leser
  det som godkjenning. Vi henviser til DSBs råd; vi er ikke godkjent av DSB.
- **Ingen marineblå.** Hele markedet er der.
- **Ingen webfonter.** Systemfonter gir null nettverkskall og ingen
  layout-shift, som holder LCP nede på GitHub Pages.
