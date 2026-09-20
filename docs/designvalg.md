# Designvalg: nodboks.no

Dette er byggespecen for nettbutikken. Den beskriver retning, sidearkitektur,
pakkebyggeren i detalj, komponenter, typografi, tilgjengelighet og
tekstprinsipper — presist nok til at en utvikler kan bygge siden uten å måtte
gjette. Alt tekstinnhold på siden skal være norsk bokmål.

Grunnlaget: fire designskisser (`docs/design/skisse-*.html`) ble vurdert av en
jury gjennom tre linser — tillit, konvertering, håndverk. Alle fire brukte en
fargepalett som siden er forkastet (se `docs/farger.md`); skissene er derfor
kun gyldige som **layout og informasjonsarkitektur**. Ingen hex-verdier herfra
skal gjenbrukes. Fargen er «Natt», definert i `assets/css/tokens.css`.

Juryens poengsum: redaksjonell 7,3 · husholdning 7,0 · institusjonell 7,0 ·
produkt 7,0 — praktisk talt jevnt, og hver retning vant på noe de andre ikke
hadde. Denne specen er derfor ikke «bygg redaksjonell på nytt», men en
sammenstilling av de konkrete grepene juryen faktisk anbefalte å beholde, satt
sammen til én retning.

---

## 1. Retningsvalg

**Layoutskjelett: redaksjonell**, med **byggerens indre mekanikk fra
institusjonell**.

Redaksjonell vant på tone, hierarki og på å behandle kjøperen som voksen
(ingen utropstegn, ingen skremsel, en fireleddet «steg 1–4»-byggerform med
forklarende brødtekst per steg). Den arver vi som skjelett: seksjonsrekkefølge,
overskriftsform, og steg-strukturen i skjemaet.

Men redaksjonell hadde skissens alvorligste konverteringsfeil: fysisk avstand
mellom valg og begrunnelse. Matvalget ble tatt på linje ~2 500 px; tabellen som
faktisk begrunnet valget lå ~7 000 px lenger ned, og prispanelet var i
DOM-rekkefølge plassert *etter* hele innholdslisten, slik at kjøpsveien på
mobil ble unødvendig lang. Institusjonell hadde løst nøyaktig dette: matnivå
plassert som seksjon 02, rett etter byggeren (ikke etter tillit og FAQ), og
prispanelet plassert i DOM-rekkefølgen *mellom* valgene og innholdslisten — med
`position: sticky; bottom: 0` på et vanlig element i normalflyten, ikke
`position: fixed` med en JS-styrt observer. Det gir en klebrig kjøpsknapp helt
gratis, uten scroll-lyttere, uten IntersectionObserver-bugs, og uten risikoen
for tastaturfeller som flere av de andre skissenes faste bunnlinjer hadde.

Det er derfor institusjonells byggerstruktur (kontroll → prispanel → liste,
med sticky prispanel i normalflyt) vi bruker, fylt med redaksjonells
formuleringer, mikrotekst og de to sterkeste enkeltgrepene som gikk igjen på
tvers av flere skisser uavhengig av hvem som vant:

| Grep | Hentet fra | Hvorfor det er med |
| --- | --- | --- |
| Steg 1–4-strukturen med forklarende brødtekst per steg | redaksjonell | Tonen «behold»-listen roste mest: voksen, forklarende, ingen skremsel |
| Svarfelt rett under slideren («Det gir 56 måltider, 60 liter vann…») | redaksjonell | Umiddelbar konsekvens av et valg, ikke bare et tall som endrer seg |
| Holdbarhetslinjal i matkortene (8 % fylt mot 100 % fylt, samme skala) | redaksjonell, gjenbrukt i husholdning og produkt | Gjør en abstrakt forskjell (2 år mot 25 år) til én visuell linje, inni selve valget — ikke i en tabell 7 000 px unna |
| «Din jobb»-spesifikasjonsraden i matkortene | redaksjonell | Den ærligste formuleringen av prisforskjellen: «bytte annethvert år» mot «nesten ingenting» |
| Kontroll → prispanel → innholdsliste i DOM-rekkefølge, sticky prispanel i normalflyt | institusjonell | Løser avstanden mellom valg og kjøp uten JS-observer |
| Momsoppdeling (15 % mat, 25 % utstyr) i prisoppsettet | institusjonell | Eksplisitt krav fra oppdraget — se § 7 |
| «Dette selger vi ikke, men du bør ha det» | institusjonell | Eksplisitt krav fra oppdraget — se § 7 |
| Abonnementet som avlyser seg selv ved langtidsmat («Gratis påminnelse · kr 0») | institusjonell, husholdning, produkt | Gikk igjen i tre av fire skisser og ble rost i alle tre — sterkeste enkeltbevis på at mersalget er underordnet kundens faktiske behov |
| «Neste påfyll: om ca. 2 år / om ca. 25 år» som egen linje i prisoppsettet | produkt | Gjør en fremtidig forpliktelse til en linje i regnestykket, ikke en finskrift |
| Skjul nullinjer i prisoppsettet i stedet for å vise dem | redaksjonell, institusjonell | Enklere kvittering uten å skjule at noe faktisk koster noe |
| `role="status"` med debounce for skjermleseroppsummering av hele konfigurasjonen | produkt | Én sammenhengende setning i stedet for et helvete av live-oppdateringer for hvert tastetrykk |

**Det vi eksplisitt forkaster fra hver skisse**, fordi juryen dokumenterte at
det ikke virket eller var en tillitsfelle:

- Faste bunnlinjer skjult med `aria-hidden="true"` + `transform` (redaksjonell,
  husholdning) — tastaturfeller. Se § 6.3.
- Docker/klebrige linjer bundet med IntersectionObserver kun til
  `#pakkebygger` (husholdning, institusjonell) — kjøpsveien forsvinner i
  sammenligningstabellen, tillitsseksjonen og FAQ.
- Innrømmelser skjult på mobil med `display: none` (institusjonell,
  `.lang-tekst{display:none}` under 700 px).
- Sitatformatert brødtekst uten navngitt, lenket kilde (husholdning,
  redaksjonell) — leser som lånt autoritet.
- Skjold-med-hake eller andre sertifiseringslignende symboler ved siden av
  DSBs navn (nevnt som fare i `docs/farger.md`, gjentatt her som forbudt i
  § 7).
- Ethvert konkret, oppdiktet selskapsfaktum: org.nr. (institusjonell hadde et
  som ikke består mod11-kontrollen), antall ansatte, stedsnavn for lager,
  adresse. Se § 7.

---

## 2. Sidearkitektur

### 2.1 Forsiden — seksjonsrekkefølge

1. **Topplinje** (sticky). Merkenavn, hovednavigasjon (skjult under 52rem per
   eksisterende `.site-nav`-regel i `base.css`), og en alltid synlig
   CTA-lenke til byggeren (`.btn .btn--sm .btn--primary`, `href="#bygg"`,
   teksten «Sett sammen esken»). Denne lenken er det egentlige svaret på
   juryens «5 000 px uten kjøpsknapp»-kritikk: i stedet for å bygge et nytt
   scroll-styrt dock-lag, bruker vi et element som allerede er sticky og
   allerede finnes på hver eneste seksjon. Se § 4.5.

2. **Hero.** H1, ett ledd ingress, en saklig henvisning til DSBs råd (tekst +
   ekte lenke — se § 7 for forbudet mot skjold-symbolet), og en **reell
   prisforankring**: startprisen for byggerens standardoppsett (4 personer,
   komplett pakke, vanlig tørrmat), hentet fra samme prisberegning som
   byggeren selv bruker — ikke et eget markedsføringstall. Primær CTA til
   byggeren, sekundær lenke til innholdslisten. Dette retter opp i den
   gjennomgående svakheten i alle fire skisser: ingen pris over bretten.

3. **Kort situasjonsseksjon** («Det er ikke dramatisk. Det er bare uvant.» —
   redaksjonells `#dogn`-tone, men komprimert til 2–3 korte fakta/påstander
   med tallgrunnlag synlig, ikke en lang fortellende blokk). Avsluttes med en
   lenke videre til byggeren. Ingen blockquote uten navngitt, lenket kilde —
   se § 7.

4. **Pakkebyggeren** (`#bygg`). Selve kjernen. Beskrevet i detalj i § 3.
   Inneholder valgene, prispanelet og innholdslisten i én sammenhengende
   container.

5. **Utvidet matnivå-sammenligning** (`#matnivaa`), **rett etter** byggeren —
   ikke lenger nede på siden. Kortenes holdbarhetslinjal og «din jobb»-rad gir
   allerede kjernesammenligningen inni valget selv; denne seksjonen er for
   den som vil se hele regnestykket (kostnad over tid, kalorier, vann) før
   de bestemmer seg. Avsluttes med en «Tilbake til byggeren»-lenke.
   Ethvert tall her (kostnad over 10 år, kcal, liter) skal enten vises
   utregnet på siden eller lenkes til hvor det regnes ut — aldri påstås uten
   grunnlag. Se § 7.

6. **Tillit-seksjonen.** Et avgrenset sett med **etterprøvbare** punkter — se
   § 7 for hva som er tillatt og forbudt her. Avsluttes med en «Tilbake til
   byggeren»-lenke.

7. **«Dette selger vi ikke, men du bør ha det».** Se § 7.

8. **FAQ**, inkludert et ærlig nei-svar på «Er dette godkjent av DSB eller
   myndighetene?» og et nei-svar på jodtabletter med henvisning til apotek.
   Avsluttes med en «Tilbake til byggeren»-lenke.

9. **Bunntekst.** Se § 2.3.

Seksjon 5 og 6 kan bygges som to underseksjoner i samme `<section>` dersom det
gir bedre lesbarhet — poenget som ikke skal tapes, er avstanden: ingen av dem
skal ligge mer enn én skjermhøyde eller to unna byggeren.

### 2.2 Undersider

- **`/personvern/`** — reelt innhold, ikke plassholder. Lenkes fra bunntekst
  og eventuelt fra kassen når den bygges.
- **`/kjopsvilkar/`** — leverings-, retur- og angrerettvilkår. Innholdet her
  skal reflektere det virksomheten faktisk tilbyr. Denne specen foreskriver
  **plassering og form** (en ekte side, en ekte lenke), ikke tallene — de
  kommer fra hva selskapet reelt sett har vedtatt, aldri fra en skisse.
- **`/kontakt/`** — e-postadresse og eventuelt et skjema. Ingen oppdiktede
  navn, ingen påstått antall ansatte eller svartid vi ikke kan stå for.
- **`/tilgjengelighet/`** (valgfri, men anbefalt) — en ærlig
  tilgjengelighetserklæring som viser til `node scripts/kontrast.mjs` og
  hvilket nivå (WCAG 2.1 AA) siden er testet mot. Dette er reell dokumentasjon
  av noe som faktisk er gjort, ikke en markedsføringsside.

Ingen av disse skal ha `href="#"` eller `<span>` der besøkende forventer en
lenke. Se § 7.

### 2.3 Bunntekst

Firmanavn, lenke til DSBs offisielle råd om egenberedskap, lenker til
Personvern / Kjøpsvilkår / Kontakt (ekte `<a>`, se § 7), og — når og bare når
de faktisk finnes — organisasjonsnummer og adresse. Inntil de finnes: utelat
dem. Et tomt felt er ærlig; et oppdiktet felt er ikke det.

---

## 3. Pakkebyggeren i detalj

Dette er sidens kjerne og den vanskeligste layoututfordringen. Strukturen er
énform (`<form id="bygg">`) med tre deler i denne DOM-rekkefølgen — **denne
rekkefølgen er ikke tilfeldig, den er selve mekanismen som holder byggeren
klebrig uten JavaScript**:

1. `.kontroll` — de fire stegene
2. `.prispanel` — sticky prispanel
3. `.innholdsliste` — full vareliste

### 3.1 De fire stegene (`.kontroll`)

Hvert steg er et `<fieldset>` med `<legend>` som **direkte og eneste første
barn** (ikke pakket i en `<div>` — se § 5.7 for hvorfor dette gjentatte ganger
gikk galt i skissene).

1. **Husstand.** `input[type=range]` (gjenbruk eksisterende
   `input[type="range"]`-styling i `base.css`, som allerede har fylt spor via
   `--fill`, 28 px trykkflate på thumb, `::-moz-range-progress`-støtte).
   Rett under: et **svarfelt** (`aria-describedby` fra slideren) som
   oversetter tallet til konsekvens — «Det gir 56 måltider, 60 liter vann og
   én eske på rundt 31 kg» — der tallene beregnes live fra samme
   datakilde som resten av byggeren, aldri hardkodes i markup.
   Skjermleseroppdatering av dette feltet går gjennom det debouncede
   `role="status"`-feltet beskrevet i § 3.4, ikke et eget `aria-live` på hvert
   tastetrykk.

2. **Matnivå.** To valgkort bygget på `.segment` / `.option` fra `base.css`.
   Hvert kort har:
   - Tittel + pris per person i `.option__title` (dette er alt den
     tilgjengelige navnet skal inneholde — se § 5.7)
   - En kort `.option__desc`
   - En holdbarhetslinjal: to sammenlignbare barer på samme skala (f.eks. 2 år
     mot 25 år), med tekst, ikke bare farge, som forklaring
   - En «din jobb»-rad: hva kunden selv må gjøre («bytte annethvert år» mot
     «nesten ingenting»)

   `.segment__options--row` (eksisterende 34rem-brytning i `base.css`) gjør
   at kortene går fra stablet til side-ved-side.

3. **Omfang.** Komplett pakke vs. kun matpåfyll — samme `.segment`/`.option`-
   mønster, enklere kort (tittel + kort forklaring, ingen holdbarhetslinjal).

4. **Påfyll.** **Aldri forhåndsavkrysset.** `<input type="checkbox">`,
   `unchecked` som utgangspunkt, uansett hvilket matnivå som er valgt. Prisen
   ved siden av skal alltid være «kr 0 i dag» **sammen med** en synlig linje
   for hva avtalen koster *senere* («Neste sending: om ca. 2 år · anslagsvis
   kr X · ingen bindingstid») — aldri «kr 0 i dag» alene. Når matnivå er satt
   til langtidsmat, bytter både tittel og pris til noe som aktivt fraråder
   abonnementet der det ikke gir mening («Gratis påminnelse · kr 0 · Et
   abonnement ville ikke gitt deg noe nytt») — se retningsvalget i § 1.

### 3.2 Prispanelet (`.prispanel`)

Bygget som `.card .card--raised .card--pad-lg`. Innhold, i denne
rekkefølgen:

1. Sum i dag (stor, `.tnum` for tabellstilte tall) + kr per person
2. Kjøpsknapp: `.btn .btn--primary .btn--lg .btn--block`
3. Fraktlinje (skjules eller vises «Fri frakt» avhengig av terskel — aldri en
   nedtelling til fri frakt, bare en enkel setning)
4. `<details>` «Prisoppsett» (gjenbruk `details.accordion`-mønsteret fra
   `base.css`, med kortets egen `border-bottom` fjernet siden det ligger inni
   et kort) som åpner til en linjevis kvittering:
   - Mat (antall personer × pris)
   - Utstyr, grunnpakke
   - Utstyr per person
   - Frakt
   - **«Herav mva. (15 % mat, 25 % utstyr)»** — regnet ut, ikke påstått. Dette
     er et eksplisitt krav fra oppdraget (§ 7) og var i skissene det eneste
     stedet noen viste momsplikten i det hele tatt.
   - Sum

   Linjer som er null, skjules i stedet for å vises som «0 kr» — men **aldri**
   ved å skjule en linje som faktisk har en verdi.
5. Dersom påfyll er valgt: en tydelig linje for den fremtidige kostnaden,
   ikke bare «belastes ikke nå».
6. **Ingen** nedtelling, **ingen** lagerteller, **ingen** gjennomstreket
   førpris, **ingen** «X personer ser på denne nå». Se § 7.

`role="status"` med `aria-live="polite"` et sted i skjemaet, oppdatert med en
**debounce på ca. 700 ms** (ikke ved hvert tastetrykk på slideren), som leser
opp hele konfigurasjonen samlet: «4 personer, komplett pakke, vanlig tørrmat,
kr 6 610». Dette hindrer at en skjermleserbruker som drar i slideren får 8
separate kunngjøringer i sekundet.

CSS: `.prispanel { position: sticky; bottom: 0; }` **på et element i
normalflyten** — ikke `position: fixed`, ikke en separat dock-`<div>` styrt av
en scroll-lytter. Fordi panelet ligger i DOM-rekkefølge *mellom* kontroll og
innholdsliste, får dette automatisk effekten av en klebrig kjøpsknapp mens
brukeren blar gjennom innholdslisten, uten IntersectionObserver, uten
scroll-lyttere, og uten risikoen for at panelet blir liggende feil eller blir
en tastaturfelle.

### 3.3 Innholdslisten (`.innholdsliste`)

Full vareliste **synlig på siden før kjøp**, aldri bak en «se detaljer»-lenke.
Bygget på eksisterende `.table`-komponent:

- `<caption>` eller en synlig overskrift + metalinje («24 varelinjer · 61
  enheter · 14,2 kg»)
- Ekte `<th scope="col">` for Vare / Antall / Holdbarhet / Grunnlag — ikke en
  visuell kolonneoverskrift bygget av `<div>`er uten semantikk (én av
  skissene fikk nøyaktig dette til å feile på desktop-bredde)
- Eksplisitt `grid-template-columns` (eller ekte `<table>`-kolonner) per
  brytningspunkt — ikke implisitt auto-plassering, som var årsaken til at
  firekolonnelisten i én skisse ikke stemte på 1280 px
- «Grunnlag»-kolonnen viser hvilket punkt i DSBs anbefaling varen dekker.
  Finnes ikke et punkt, er ikke varen med.
- Under 30 rem bredde: behold `<th>`-strukturen, men legg til en
  visuelt skjult (`.visually-hidden`) etikett foran hver celle («Antall: »,
  «Holdbarhet: », «Grunnlag: ») slik at en skjermleser som linjeviser
  tabellen fortsatt gir mening uten kolonneoverskriften i syne.
- Fotnote om substitusjon: at en vare kan byttes mot et tilsvarende produkt
  ved utsolgt, aldri mot noe dårligere.
- `<noscript>`: telefonnummer og et løfte om at innholdslisten sendes på
  e-post før kjøp, for den som ikke har JavaScript.

### 3.4 Layout: mobil (375 px) vs. desktop

**Mobil (< 60rem / 960px), énkolonne, i denne rekkefølgen ovenfra og ned:**

1. Seksjonsoverskrift + kort ingress
2. Steg 1–4 (husstand → matnivå → omfang → påfyll)
3. Prispanelet — **rett etter** steg 4, **før** innholdslisten. Dette er den
   viktigste enkeltbeslutningen i mobillayouten: prisen og kjøpsknappen skal
   ikke ligge under en lang vareliste. `position: sticky; bottom: 0` gjelder
   på alle bredder, uten mediaspørring — samme regel, samme mekanisme, hele
   veien fra mobil til desktop.
4. Innholdslisten, i sin fulle bredde

Mens brukeren blar gjennom innholdslisten (steg 4 og nedover i DOM), henger
prispanelet klistret til bunnen av skjermen inntil listen tar slutt, hvor det
skrolles bort som normalt innhold igjen.

**Desktop (≥ 60rem / 960px), to kolonner:**

```
grid-template-columns: minmax(22.5rem, 25.25rem) minmax(0, 1fr);
grid-template-areas: "kontroll liste"
                      "pris     liste";
```

- Venstre kolonne: `.kontroll` øverst, `.prispanel` under — begge i samme
  kolonne, slik at prispanelet blir sittende værende synlig i bunnen av
  venstre kolonne når høyre kolonnes lengre innholdsliste skrolles forbi.
- Høyre kolonne: `.innholdsliste`, som spenner over begge radene.
- `.kontroll` får `padding-bottom` stor nok til at prispanelet ikke dekker
  siste steg når det stopper opp i sticky-posisjon (tilsvarende ca. 10–12rem,
  juster etter faktisk panelhøyde).

**Hva er synlig når, oppsummert:**

| Tilstand | Mobil | Desktop |
| --- | --- | --- |
| Ved ankomst til `#bygg` | Steg 1 øverst | Steg 1 (venstre) og toppen av innholdslisten (høyre), side ved side |
| Midt i utfylling | Gjeldende steg i visning, prispanel usynlig til man passerer steg 4 | Alle steg synlig i venstre kolonne samtidig, prispanel synlig når man har skrollet forbi kontrollene |
| Under gjennomlesing av innholdslisten | Prispanel klistret til bunn av skjerm | Prispanel klistret til bunn av venstre kolonne, innholdslisten fortsetter å skrolle i høyre kolonne |
| Etter innholdslisten | Prispanel skrolt forbi, vanlig innhold følger | Venstre kolonne slutter, prispanel skrolles bort med resten |

---

## 4. Komponenter

Bruk eksisterende klasser i `assets/css/base.css` der de dekker behovet. Det
som må legges til, er markert **(ny)**.

| Komponent | Klasse(r) | Merknad |
| --- | --- | --- |
| Primærknapp (kjøp) | `.btn .btn--primary .btn--lg` (`.btn--block` i prispanelet) | Allerede definert med hover/active/disabled-tilstander |
| Sekundærknapp | `.btn .btn--ghost` eller `.btn` | For «tilbake til byggeren»-lenker og lignende |
| Kort | `.card`, `.card--raised` for prispanelet, `.card--flat` for innskutte paneler | |
| Valgkort (matnivå, omfang) | `.segment` / `.option` / `.option__body` / `.option__title` / `.option__desc` | Utvid `.option__body` med de nye delene (holdbarhetslinjal, «din jobb»-rad) som ekstra barn — ikke inni den tekstlige delen av tilgjengelig navn, se § 5.7 |
| Slider | native `input[type=range]` | Allerede full styling i `base.css`, inkl. `--fill`-mønsteret |
| Prispanel | `.card--raised` + egne linjerader + `.tnum` | Se § 3.2 |
| Innholdsliste | `.table` | Se § 3.3 |
| Merkelapp (holdbarhet, status) | `.badge`, `.badge--accent/--ok/--warn/--info` | Bruk `--warn`/`--info` for holdbarhetsstatus, aldri `--accent` til noe som skal lese som en advarsel (kolliderer med kjøpsknappens farge, se `tokens.css`) |
| Varsel/alert **(ny)** | `.varsel`, `.varsel--ok/--advarsel/--info` | Bygges av `--ok`/`--warn`/`--info`-tokenparene. Alltid ikon + tekst, aldri farge alene (samme prinsipp som tokens.css allerede fastsetter for status). Brukes til f.eks. «Denne kombinasjonen dekker ikke DSBs anbefalte vannmengde for husstanden» |
| Trekkspill | `details.accordion` | Brukes til FAQ og til «Prisoppsett» i prispanelet (se § 3.2 for kort-spesifikk justering) |
| Sticky header-CTA **(ny)** | `.btn .btn--sm .btn--primary` i `.site-header__inner` | Se § 2.1 og § 4.5 |

### 4.5 Hvorfor ingen egen «dock»-komponent

Tre av fire skisser bygde en egen JavaScript-styrt klebrig kjøpslinje bundet
til `#pakkebygger` via `IntersectionObserver`. Juryen fant konkrete feil i
hver implementasjon: bundet til feil seksjon (kjøpsveien forsvant i
sammenligningstabellen og FAQ), skjult med `aria-hidden` + `transform` på et
element med ekte, fokuserbare knapper inni (tastaturfelle), eller inkonsistent
knappetekst mot resten av siden. Vi bygger derfor **ikke** en egen dock.
I stedet: den sticky topplinjen (som allerede finnes) får en alltid synlig
CTA-lenke til byggeren, og hver seksjon utenfor byggeren avsluttes med en
enkel tekstlenke tilbake dit. To mekanismer som allerede virker, i stedet for
en tredje som må testes for scroll-bugs og fokusfeller.

---

## 5. Typografi og rom

Bruk skalaen i `tokens.css` uendret — ingen nye trinn.

| Bruk | Token |
| --- | --- |
| H1 | `--step-5` (allerede satt globalt på `h1` i `base.css`) |
| H2 (seksjonstitler) | `--step-4` |
| H3 (stegtitler, korttitler) | `--step-2` |
| H4 (småoverskrifter i kort) | `--step-1` |
| Brødtekst | `--step-0` (body-standard) |
| Prissum i prispanelet | `--step-3` eller `--step-4`, satt i `--font-display` for å skille den fra brødtekst — dette er sidens viktigste enkelttall |
| Småtekst (fraktlinje, fotnoter, `.abo-linje`-type detaljer) | `--step--1` |

Rom: bruk `--sp-*`-skalaen konsekvent, ingen frihåndsverdier. Spesielt:

- Steg-til-steg-avstand i `.kontroll`: `--sp-6`/`--sp-7`
- Innvendig kortpolstring: `--sp-5` (`.card`) eller `--sp-4` (`.option__body`,
  allerede satt)
- Seksjonsavstand: `.section`-klassen (`clamp(var(--sp-7), 7vw, var(--sp-9))`)
  brukes på hver hovedseksjon på forsiden — ikke egne `padding`-verdier per
  seksjon.

Dette er den samme disiplinen `farger.md` og `tokens.css` allerede krever av
fargebruken: alt går gjennom et token, eller det er ikke et gyldig valg.

---

## 6. Tilgjengelighet

### 6.1 Tastatur

- Alle interaktive elementer er native (`<input>`, `<button>`, `<a href>`,
  `<details><summary>`) — ingen `<div>` med `onclick` og ingen custom
  ARIA-widget der HTML allerede løser det.
- `:focus-visible`-regelen i `base.css` gjelder globalt og skal **ikke**
  overstyres lokalt uten at kontrasten er sjekket mot den spesifikke flaten
  (se § 6.4) — en fokusring på 2,3:1 mot en mørk flate, som skjedde i én
  skisse, er ikke en fokusring.
- Ingen element skal skjules med `aria-hidden="true"` mens det fortsatt
  inneholder fokuserbare barn. Skjuling av den sticky-lignende mekanikken i
  § 3.2/§ 3.4 skjer utelukkende via layout (elementet skrolles ut av syne som
  normalt innhold), ikke via `display`/`visibility`/`aria-hidden`-triks.

### 6.2 Skjermleser

- `<fieldset>`/`<legend>`: `<legend>` er alltid **første og direkte barn** av
  `<fieldset>`, aldri pakket i en `<div>`. Flere skisser brøt dette og mistet
  gruppenavnet for skjermleserbrukere.
- Valgkortenes tilgjengelige navn holdes kort (tittel + pris). Den utvidede
  beskrivelsen (spec-rader, holdbarhetslinjal, brødtekst) knyttes til
  `<input>` via `aria-describedby`, eller kortets `<label>` gis en eksplisitt
  `aria-label` som overstyrer den automatiske sammenslåingen av all tekst i
  labelen. Én skisse endte med et 40+ ords tilgjengelig navn per radioknapp
  fordi hele kortet — inkludert spesifikasjonstabell — lå inni `<label>`
  uten noen av disse to rettelsene.
- Prisoppdateringer går gjennom ett debouncet `role="status"`-felt (§ 3.2),
  ikke separate `aria-live`-regioner per tall.
- Innholdslistens kolonner bruker ekte `<th scope="col">`; på smale skjermer
  suppleres med skjulte etiketter per celle (§ 3.3), aldri ved å fjerne
  kolonneoverskriften helt.

### 6.3 Redusert bevegelse

`base.css` har allerede en global `prefers-reduced-motion: reduce`-regel som
nuller CSS-transisjoner og -animasjoner. Den dekker **ikke**
JavaScript-drevet animasjon (f.eks. en opptellingsanimasjon på prissummen, et
«bump»-blink når antall endres). All slik JS-animasjon skal derfor i tillegg
lese `window.matchMedia('(prefers-reduced-motion: reduce)')` og hoppe rett til
sluttilstanden når det treffer. To lag, ikke ett — fordi CSS-regelen alene
ikke er nok.

### 6.4 Kontrast

Alle fargepar er målt, ikke påstått, av `node scripts/kontrast.mjs` — kjør det
etter enhver endring i `tokens.css` eller enhver ny flate/tekstkombinasjon som
introduseres i byggingen av denne siden (f.eks. hvis `.varsel`-komponenten
tar i bruk en ny bakgrunn-/tekstkombinasjon som ikke allerede er dekket).
Scriptet feiler bygget hvis noe ligger under kravet. Ikke-tekstlig kontrast
(WCAG 1.4.11) gjelder også: skjemakontroller, valgkortenes kant i uvalgt
tilstand, og fokusringer på alle flater siden faktisk bruker — ikke bare
standardflaten.

---

## 7. Tekstprinsipper

**Tone:** voksen, forklarende, ingen skremsel. Ingen utropstegn i brødtekst.
Vi selger husholdningsvarer satt i system — ikke overlevelsesutstyr.

**Hva vi aldri skriver:**

- Oppdiktede fakta av noe slag: organisasjonsnummer, adresser, antall
  ansatte, stedsnavn for lager («Laget i Trondheim» eller lignende),
  kundeomtaler, stjernerangeringer, «vanligste valg»-merkelapper eller annen
  sosial bevisføring en butikk uten salgshistorikk ikke kan stå for.
- Skjold-med-hake eller andre sertifiseringslignende symboler ved siden av
  DSBs navn. Vi henviser til DSBs råd; vi er ikke godkjent av DSB, og sier det
  rett ut i FAQ når vi blir spurt.
- Sitatformatert tekst (blockquote/`<cite>`) tilskrevet en uspesifisert
  «myndighetene» eller «offentlige kilder». Navngi DSB spesifikt, lenk til
  den faktiske kilden, eller ikke bruk sitatformatering.
- Nedtelling til et tilbud, lagerteller, gjennomstreket førpris, eller noe
  annet som låner vokabular fra hastverkssalg.
- Et tall («56 måltider», «2 400 kcal», «tre liter per person per døgn») som
  ikke enten er regnet ut synlig på siden (i innholdslisten eller
  prisoppsettet) eller lenket til hvor det regnes ut. Et påstått tall uten
  synlig grunnlag er ikke bedre enn et oppdiktet.
- En lenke som ikke er en `<a href>`. Personvern, Kjøpsvilkår, Kontakt og
  DSBs råd skal alle være ekte, fungerende lenker — aldri `<span>` eller
  `href="#"`.
- «kr 0 i dag» uten en synlig linje for hva det koster *senere*.

**Hva vi aktivt sier:**

- Et eget FAQ-svar: «Er dette godkjent av DSB eller myndighetene?» →
  «Nei, og ingen slik godkjenning finnes. DSB gir råd om hva en husstand bør
  ha; de godkjenner ikke enkeltprodukter eller -leverandører.»
- Et eget FAQ-svar om jodtabletter: vi selger dem ikke, forklarer hvorfor
  (reseptfri apotekvare for definerte grupper, brukes kun etter myndighetenes
  varsel), og sender kunden til apoteket.
- En seksjon **«Dette selger vi ikke, men du bør ha det»**: konkrete,
  kostnadsfrie råd vi ikke tjener penger på — kontanter i små sedler (kort- og
  minibanktjenester kan stå ved strømbrudd), jodtabletter (kjøpes på apotek,
  brukes kun ved myndighetsvarsel), medisiner husstanden bruker fast, kopi av
  viktige papirer, å fylle badekar og kanner ved varsel om vann- eller
  strømstans, og et avtalt møtested hvis mobilnettet er nede.
- En **påminnelse om utløpsdato som gratis tjeneste**, ikke mersalg: avkrysset
  frivillig, aldri forhåndshuket, med tydelig «kr 0 i dag» + hva det koster
  senere, og en tekst som aktivt fraråder abonnementet når det ikke gir
  kunden noe (langtidsmat).
- Momsoppdelingen (15 % mat, 25 % utstyr) synlig og utregnet i
  prisoppsettet.

---

## 8. Hva vi bevisst ikke gjør

- **Ingen egen dock/klebrig-linje styrt av scroll-posisjon eller
  IntersectionObserver.** Se § 4.5 — tre av fire skisser hadde bugs eller
  tastaturfeller i akkurat denne mekanikken. Sticky topplinje +
  normalflyt-sticky prispanel + retur-lenker gir samme effekt med færre
  bevegelige deler.
- **Ingen sammenligningstabell plassert langt fra valget den begrunner.**
  Kjernesammenligningen (holdbarhet, «din jobb») ligger inni matkortet selv;
  den utvidede tabellen ligger rett etter byggeren, ikke lenger ned på siden.
- **Ingen Om oss-side med navngitte ansatte eller stedsangivelser** før de
  faktisk finnes. En tom footer-linje er ærligere enn en oppdiktet.
- **Ingen fast org.nr./adresse i footer** før virksomheten faktisk har dem
  klare til publisering — og når de legges inn, skal org.nr. bestå
  mod11-kontrollen. Et organisasjonsnummer som ikke består kontrollsifferet
  er ikke en detalj; det er akkurat den typen feil en skeptisk kjøper
  sjekker.
- **Ingen sosial bevisføring** (kundeomtaler, stjerner, «vanligste valg»,
  «X ser på denne nå») på en butikk uten salgshistorikk å vise til.
- **Ingen nedtelling, ingen lagerteller, ingen gjennomstreket førpris.**
  Eksplisitt krav fra oppdraget, og fraværet av alt dette var noe av det
  produkt- og husholdning-skissene faktisk gjorde riktig.
- **Ingen ny fargebruk utover `tokens.css`.** Se `docs/farger.md` — «Natt» er
  vedtatt, skissenes krem/terrakotta-palett er forkastet i sin helhet, og
  ingen hex-verdi fra `docs/design/skisse-*.html` skal forekomme i den
  ferdige siden.
- **Ingen ekstra display-mekanikk for å skjule en innrømmelse på mobil.**
  Alt som står i tillitsteksten på desktop, står også på mobil. Hvis plassen
  er trang, korter vi setningen — vi fjerner den ikke med en mediaspørring.
