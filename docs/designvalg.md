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
`position: fixed` med en JS-styrt observer. Poenget var aldri `sticky` i seg
selv, men de tre kravene den oppfylte: prisen skal aldri ligge under en lang
vareliste, den skal være der uten scroll-lyttere og uten
IntersectionObserver-bugs, og den skal ikke kunne bli en tastaturfelle slik
flere av de andre skissenes faste bunnlinjer var.

De tre kravene står. Vi oppfyller dem bare strengere enn `sticky` klarte.
Prisen ligger nå i en **fast prislinje** (`.prisbar`, `position: fixed;
bottom: 0`) som er tatt helt ut av dokumentflyten: den står utenfor alle
seksjoner, rett før `</body>`, og er synlig på alle bredder fra første maling.
Null scroll-lyttere, null observere, ingen betinget synlighet. Et sticky-panel
er den beste løsningen *innenfor* flyten, men det har fortsatt en plassering
som kan bli feil og en rullestilling der det slipper taket; en linje som aldri
er i flyten, har ingen av delene. Den koster like lite JavaScript — ingenting —
og har ingen tilstand å ta feil av, og dermed heller ingen tilstand der den kan
skjule fokuserbare knapper for tastaturet. `<body>` får `padding-bottom:
7.5rem` som klaring, og det er hele mekanikken.

Byggerstrukturen er derfor institusjonells, forenklet til **kontroll → liste**
med prisen i den faste linjen, fylt med redaksjonells formuleringer, mikrotekst
og de to sterkeste enkeltgrepene som gikk igjen på tvers av flere skisser
uavhengig av hvem som vant:

| Grep | Hentet fra | Hvorfor det er med |
| --- | --- | --- |
| Den nummererte stegstrukturen med forklarende brødtekst per steg (hos oss fem steg, se § 3.1) | redaksjonell | Tonen «behold»-listen roste mest: voksen, forklarende, ingen skremsel |
| Svarfelt rett under husstandsstepperne («2 voksne, 2 barn: … kcal, … liter vann, og en eske på rundt … kg») | redaksjonell | Umiddelbar konsekvens av et valg, ikke bare et tall som endrer seg |
| Holdbarhetslinjal i matkortene (20 % fylt mot 100 % fylt, samme skala) | redaksjonell, gjenbrukt i husholdning og produkt | Gjør en abstrakt forskjell (1 år mot 5 år) til én visuell linje, inni selve valget — ikke i en tabell 7 000 px unna |
| «Din jobb»-raden i matnivå-sammenligningen | redaksjonell | Den ærligste formuleringen av prisforskjellen: «bytte maten når vi sier fra» mot «nesten ingenting» |
| Prisen aldri under innholdslisten — nå som fast prislinje utenfor flyten | institusjonell, videreført | Løser avstanden mellom valg og kjøp uten scroll-lytter og uten observer. Se § 3.2 |
| Momsoppdeling (15 % mat, 25 % utstyr) i prisoppsettet | institusjonell | Eksplisitt krav fra oppdraget — se § 7 |
| «Dette selger vi ikke, men du bør ha det» | institusjonell | Eksplisitt krav fra oppdraget — se § 7 |
| Abonnementet som avlyser seg selv ved langtidsmat («Gratis påminnelse · kr 0») | institusjonell, husholdning, produkt | Gikk igjen i tre av fire skisser og ble rost i alle tre — sterkeste enkeltbevis på at mersalget er underordnet kundens faktiske behov |
| «Neste påfyll om rundt 1 år / om rundt 5 år» som egen linje i regnestykket | produkt | Gjør en fremtidig forpliktelse til en linje i regnestykket, ikke en finskrift |
| Skjul nullinjer i prisoppsettet i stedet for å vise dem | redaksjonell, institusjonell | Enklere kvittering uten å skjule at noe faktisk koster noe |
| `role="status"` med debounce for skjermleseroppsummering av hele konfigurasjonen | produkt | Én sammenhengende setning i stedet for et helvete av live-oppdateringer for hvert tastetrykk |

**Det vi eksplisitt forkaster fra hver skisse**, fordi juryen dokumenterte at
det ikke virket eller var en tillitsfelle:

- Faste bunnlinjer som **skjules og vises igjen** med `aria-hidden="true"` +
  `transform` (redaksjonell, husholdning) — tastaturfeller. Det er skjulingen
  som er feilen, ikke `position: fixed`: vår egen prislinje er fast nettopp
  fordi den da aldri trenger å skjules. Se § 6.1.
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
   ekte lenke — se § 7 for forbudet mot skjold-symbolet), og et
   **husstandskort**: spørsmålet «Hvem bor hjemme hos dere?» med de samme tre
   stepperne som står i steg 1 (§ 3.1), en levende svarsetning, og prisen
   hentet fra samme `[data-sum]` som den faste prislinjen — ikke et eget
   markedsføringstall. Primær CTA til byggeren, sekundær lenke til
   innholdslisten.

   Dette retter opp i to ting. Alle fire skisser manglet pris over bretten;
   men en fast prisforankring på «fire personer» er dessuten feil tall for
   alle som ikke er fire, og den som leser er sjelden gjennomsnittet. Kunden
   svarer i stedet på det ene spørsmålet som avgjør alt annet — mengder,
   eskestørrelse og pris — og svaret følger med inn i byggeren: samme
   tilstand, samme steppere, ingen ny inntasting tolv skjermhøyder lenger ned.

   CTA-ene flytter **fokus**, ikke bare rullestillingen: målet får
   `tabindex="-1"` og `focus({ preventScroll: true })`, og `scrollIntoView`
   respekterer `prefers-reduced-motion`. En lenke som bare ruller, etterlater
   tastaturbrukeren på toppen av siden mens skjermen viser bunnen.

3. **Kort situasjonsseksjon** («Det er ikke dramatisk. Det er bare uvant.» —
   redaksjonells `#dogn`-tone, men komprimert til 2–3 korte fakta/påstander
   med tallgrunnlag synlig, ikke en lang fortellende blokk). Avsluttes med en
   lenke videre til byggeren. Ingen blockquote uten navngitt, lenket kilde —
   se § 7.

4. **Pakkebyggeren** (`#bygg`). Selve kjernen. Beskrevet i detalj i § 3.
   Inneholder valgene og innholdslisten i én sammenhengende container. Prisen
   ligger *ikke* her, men i den faste linjen nederst i vinduet, utenfor alle
   seksjoner (§ 3.2).

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

Dette er sidens kjerne og den vanskeligste layoututfordringen. Strukturen er to
deler inne i `#bygg`, og én utenfor:

1. `.kontroll` — de fem stegene, som samtidig er skjemaet (`<form id="bygger">`)
2. `.innholdsliste` — **den ene** varelisten, der fravalg og tillegg også skjer
3. `.prisbar` — den faste prislinjen, som ikke ligger i byggeren i det hele
   tatt, men rett før `</body>`

Delingen er ikke tilfeldig. Prisen er det kunden lurer mest på, og den er
derfor tatt ut av dokumentflyten helt: da finnes det ingen DOM-rekkefølge,
ingen rullestilling og ingen seksjonsgrense som kan gjøre den utilgjengelig.
Det som er igjen inne i byggeren, er valgene og konsekvensen av dem.

### 3.1 De fem stegene (`.kontroll`)

Hvert steg er `role="group"`, eller `role="radiogroup"` der valgene er
gjensidig utelukkende, med `aria-labelledby` som peker på stegets `<h3>`.

**Ikke `<fieldset>`/`<legend>`**, som opprinnelig var foreskrevet her. Det var
galt: en `<legend>` teller bare som gruppetittel når den er første og direkte
barn av sin `<fieldset>`, og stegtittelen ligger inne i et hode (`.steg__hode`)
sammen med stegnummeret. Enten måtte hodet vrenges for å tilfredsstille et
HTML-krav, eller så måtte gruppenavnet ofres — og i praksis ble det ofret, helt
til stegene ble bygget om. `aria-labelledby` har ikke noe krav til plassering,
og kan derfor ikke brytes av en layoutendring. Se § 6.2.

1. **Husstand.** Tre steppere — voksne (1–8), barn (0–6) og kjæledyr (0–4) —
   ikke én slider. Slideren ga ett tall for «personer», men barn spiser mindre
   enn voksne og kjæledyr trenger sitt eget vann; ett tall kunne ikke bære tre
   ulike beregninger, og et gjennomsnitt ville vært feil for alle tre.

   Hvert tall er et **synlig `<input type="number">`**, ikke en `<span>` mellom
   to knapper. Kunden skal kunne skrive «6» i stedet for å trykke fire ganger,
   og tastaturbrukere får pil opp/ned gratis.

   Layout: én rad per stepper på telefon (ikon + etikett til venstre,
   `[− n +]` til høyre), tre kolonner fra 34rem. Tre kolonner ble prøvd på
   telefon først, men tre 44 px-knapper får ikke plass i 106 px, og å krympe
   dem til 32 px for å vinne en layout er å gjøre selve inntastingen verre.
   Trykkflaten vinner over rutenettet, ikke omvendt. Se § 6.5.

   Rett under: et **svarfelt** (`#svar`) som oversetter tallene til konsekvens
   — «2 voksne, 2 barn: … kcal, … liter vann, og en eske på rundt … kg», og en
   setning om hvor mange døgn maten rekker uten brennstoff — der alle tall
   beregnes live fra samme datakilde som resten av byggeren, aldri hardkodes i
   markup. Skjermleseroppdatering går gjennom det debouncede
   `role="status"`-feltet beskrevet i § 3.2, ikke et eget `aria-live` på hvert
   tastetrykk.

   Samme stepper-sett står **to steder** — i heroens husstandskort (§ 2.1) og
   her — mot den samme tilstanden. Hvert sett har sin egen id-forstavelse
   (`hero-voksne`, `bygger-voksne`); to `<input id="voksne">` ville gjort at
   byggerens etikett pekte på heroens felt, og et klikk på «Voksne» nede ville
   flyttet fokus tolv skjermhøyder opp.

2. **Matnivå.** To valgkort bygget på `.segment` / `.option` fra `base.css`.
   Hvert kort har:
   - Tittel + pris i `.option__title` (dette er alt det tilgjengelige navnet
     skal inneholde — se § 6.2)
   - En kort `.option__desc`
   - En holdbarhetslinjal: to sammenlignbare barer på samme skala (1 år mot
     5 år), med tekst, ikke bare farge, som forklaring

   Kortene står stablet på alle bredder. `.segment__options--row` finnes i
   `base.css` og legger dem side ved side fra 34rem, men kontrollkolonnen er
   maks 25,25rem bred (§ 3.4) — side ved side der ville gitt to kort på under
   12rem hver, og da er holdbarhetslinjalen ikke lenger lesbar.

   Den fulle sammenligningen, inkludert «din jobb»-raden, ligger i seksjonen
   rett etter byggeren (§ 2.1, punkt 5), lenket fra stegets hjelpetekst.

3. **Modus.** Komplett pakke vs. kun matpåfyll — samme `.segment`/`.option`-
   mønster, enklere kort (tittel + kort forklaring, ingen holdbarhetslinjal).
   Valget styrer om steg 4 finnes i det hele tatt.

4. **Eske.** Hva utstyret skal ligge i: plastkasser eller aluminiumskasse til
   utstyret. Mat og vann ligger i plast uansett, og det står i stegets
   hjelpetekst, slik at valget ikke leses som noe større enn det er. Prisen per
   eskevalg står i kortets tittel og oppdateres med husstanden, siden
   eskestørrelsen følger antallet.

   Steget settes `hidden` når modus er matpåfyll. Der finnes det ingen eske å
   velge, og et steg som vises uten å ha noen virkning er verre enn ingen steg
   — det er derfor stegene teller fem og ikke alltid viser fem.

5. **Påfyll.** **Aldri forhåndsavkrysset.** `<input type="checkbox">`,
   `unchecked` som utgangspunkt, uansett hvilket matnivå som er valgt. Prisen
   ved siden av skal alltid være «kr 0 i dag» **sammen med** en synlig linje
   for hva avtalen koster *senere* («Neste sending: om rundt 1 år · anslagsvis
   kr X · ingen bindingstid») — aldri «kr 0 i dag» alene. Når matnivå er satt
   til langtidsmat, bytter både tittel og pris til noe som aktivt fraråder
   abonnementet der det ikke gir mening («Gratis påminnelse · kr 0 · Et
   abonnement ville ikke gitt deg noe nytt») — se retningsvalget i § 1.

### 3.2 Den faste prislinjen (`.prisbar`) og regnestykket

Prisen ligger i en fast linje mot bunnen av vinduet, utenfor alle seksjoner,
rett før `</body>`:

```css
.prisbar { position: fixed; left: 0; right: 0; bottom: 0; }
body     { padding-bottom: 7.5rem; }   /* klaring, så ingenting havner under */
```

Alltid synlig, på alle bredder, fra første maling. **Null scroll-lyttere, null
observere, ingen betinget synlighet.** Det er den samme begrunnelsen som gjorde
sticky-i-normalflyt riktig i § 1, tatt ett skritt lenger: en pris som dukker opp
og forsvinner, er en pris man slutter å stole på, og en mekanisme som kan skjule
linjen er samtidig en mekanisme som kan skjule de fokuserbare knappene i den.
Linjen har ingen tilstand, og kan derfor ikke havne i feil tilstand.

Innhold, fra venstre:

1. **Prisen, som selv er knappen** (`<button class="prisbar__pris"
   data-apne-pris aria-haspopup="dialog">`): summen (`.prisbar__sum .tnum`),
   enhetsprisen («kr X per person per døgn · N personer · 7 døgn») og hintet
   «Se regnestykket». En egen «Se regnestykket»-knapp ved siden av gjorde
   stablet linje 158 px høy på telefon — en femtedel av skjermen, permanent. Å
   trykke på tallet for å se hva tallet består av, er dessuten det folk prøver
   først.
2. Kjøpsknapp: `.btn .btn--primary`.
3. `#pris-status`, visuelt skjult. Se nedenfor.

Målt: på én rad er linjen 93 px på telefon og 79 px på skrivebord. Under 34rem
skjules enhetsprisen — det er ikke plass til både den og hintet, og hintet
vinner, fordi det er det som forteller at tallet i det hele tatt kan trykkes på.

**Regnestykket ligger i en ekte `<dialog id="prisdialog">`**, åpnet med
`showModal()` — ikke et `<details>`-trekkspill inne i linjen, som ville dyttet
en fast linje oppover halve skjermen når den åpnet seg. `showModal()` gir
fokusfelle innenfor dialogen, `Esc` og inert bakgrunn fra plattformen, uten at
vi skriver noe av det selv.

Klassene `.prispanel__linjer`, `.prispanel__linje`, `.prispanel__mva` og
`.prispanel__fot` lever videre **inne i dialogen** — det er de samme
kvitteringslinjene, bare på et nytt sted. `.prispanel`, `.prispanel__sum` og
`.prispanel__enhet` er slettet.

Linjene i dialogen, i rekkefølge:

- Mat og vann
- Utstyr og eske (bare «Utstyr» i matpåfyll-modus, der det ikke er noen eske)
- **Én fradragslinje per fravalgt vare, med varenavn** («Uten hodelykt») — ikke
  én samlet fravalgssum. Kunden skal kunne se hvilken vare fradraget gjelder;
  ellers er tallet en påstand om noe kunden nettopp gjorde selv.
- Pakkerabatt og påfyllsrabatt, hver for seg
- «Å betale»
- **«Herav mva. … – 15 % på mat, 25 % på utstyr»** — regnet ut, ikke påstått.
  Dette er et eksplisitt krav fra oppdraget (§ 7) og var i skissene det eneste
  stedet noen viste momsplikten i det hele tatt.
- «Neste påfyll om rundt X» — en fremtidig forpliktelse som egen linje, ikke
  som finskrift, og ikke bare «belastes ikke nå»
- «Frakt kommer i tillegg og beregnes i kassen» — én enkel setning, aldri en
  nedtelling til fri frakt

Linjer som er null, skjules i stedet for å vises som «0 kr» — men **aldri** ved
å skjule en linje som faktisk har en verdi.

**Ingen** nedtelling, **ingen** lagerteller, **ingen** gjennomstreket førpris,
**ingen** «X personer ser på denne nå». Se § 7.

`role="status"` med `aria-live="polite"` (`#pris-status`, visuelt skjult inne i
prislinjen), oppdatert med en **debounce på ca. 700 ms** — ikke ved hvert
tastetrykk i et stepperfelt — som leser opp hele konfigurasjonen samlet:
«Komplett pakke · 4 personer · 7 døgn · Vanlig butikkmat. kr X». Én melding per
rolige tilstand. Dette hindrer at en skjermleserbruker som holder inne
pluss-knappen eller skriver et tall, får én kunngjøring per tastetrykk.

### 3.3 Innholdslisten (`.innholdsliste`)

Full vareliste **synlig på siden før kjøp**, aldri bak en «se detaljer»-lenke.
Og dette er **den ene** listen som finnes. Siden hadde tidligere tre lister
over nøyaktig de samme varene: innholdslisten, en avkrysningsliste for «har du
noe av dette fra før?» og en for tillegg. Kunden måtte holde tre framstillinger
av det samme mot hverandre for å finne ut hva esken faktisk inneholdt. De to
stegene er fjernet (§ 3.1), og kurateringen er flyttet inn i varelinjen, der
varen hører hjemme.

Struktur — ikke en `<table>`, men grupper med ekte overskrift:

- Synlig overskrift + metalinje i en `.badge` («N varer»)
- Varene gruppert i `<section class="gruppe">` etter **DSBs egne fire
  overskrifter** — «Mat og vann», «Varme og lys», «Informasjon», «Legemidler og
  hygiene» — med «Annet» og «Esken» som våre egne til slutt, tydelig atskilt.
  Da kan kunden holde listen vår mot den offisielle linje for linje. Finnes det
  ikke et punkt i DSBs anbefaling varen dekker, er ikke varen med; gruppen den
  havner i, viser hvilket. En gruppe uten synlige varer er `hidden`.
- Hver vare er en `.vare`-rad med eksplisitt `grid-template-columns: 1fr auto`
  — ikke implisitt auto-plassering, som var årsaken til at firekolonnelisten i
  én skisse ikke stemte på 1280 px. Raden inneholder navn, antall, en
  `.vare__hvorfor`-linje som sier hvilket behov varen dekker, holdbarhet som
  `.badge`, og eventuelt en lenke til bruksanvisningen.
- `.varsel`-bokser over listen der pakken ikke dekker noe den burde, f.eks.
  vannmengden for husstanden.
- Fotnote om substitusjon: at en vare kan byttes mot et tilsvarende produkt
  ved utsolgt, aldri mot noe dårligere.
- `<noscript>`: en henvisning til hvordan innholdslisten kan fås tilsendt før
  kjøp, for den som ikke har JavaScript.

**Fravalg og tillegg skjer i selve varelinjen.** Knappen er en
`<button class="vare__handling" aria-pressed>`, ikke en avkrysningsboks: dette
er «skru av», ikke «velg ett», og forskjellen skal være hørbar og ikke bare
synlig.

- En fravalgt vare **blir stående i listen**, gjennomstreket
  (`.vare--utelatt`), med teksten «Tatt ut – dere sparer kr X». En vare som
  forsvinner idet du klikker på den, kan ikke angres — og da er «har dere den
  fra før?» en felle framfor et tilbud.
- Fravalgsknappen vises bare på varer over **fravalgsterskelen på 100 kr**
  (`FRAVALG_TERSKEL`), der den faktisk har virkning. En eske fyrstikker til
  elleve kroner fortjener ikke en avkrysning; den gjør bare listen lengre og
  valget vanskeligere. Knappen finnes ikke på de billigere varene, framfor å
  finnes og ikke virke.
- Et tillegg som ikke er valgt ennå, er et tilbud og ikke en del av pakken, og
  tegnes svakere (`.vare--tillegg`).
- Hvert fravalg får sin egen navngitte fradragslinje i regnestykket (§ 3.2),
  slik at kunden finner igjen valget som nettopp ble tatt.

### 3.4 Layout: mobil (375 px) vs. desktop

**Mobil (< 60rem / 960px), énkolonne, i denne rekkefølgen ovenfra og ned:**

1. Seksjonsoverskrift + kort ingress
2. Steg 1–5 (husstand → matnivå → modus → eske → påfyll)
3. Innholdslisten, i sin fulle bredde

Prislinjen står ikke i rekkefølgen, fordi den ikke er en del av flyten. Den
ligger fast mot bunnen av vinduet hele veien, over alt innhold, og `<body>`
har `padding-bottom: 7.5rem` slik at ingenting blir liggende under den. Det var
dette mobillayouten egentlig trengte — prisen og kjøpsknappen skal ikke ligge
under en lang vareliste — og nå trenger den ingen plassering i det hele tatt
for å få det. Samme regel, samme mekanisme, hele veien fra mobil til
skrivebord, uten mediaspørring.

**Desktop (≥ 60rem / 960px), to kolonner:**

```
grid-template-columns: minmax(22.5rem, 25.25rem) minmax(0, 1fr);
grid-template-areas: "kontroll liste";
align-items: start;
```

- Venstre kolonne: `.kontroll` — de fem stegene.
- Høyre kolonne: `.innholdsliste`.
- **To områder, ikke tre.** `pris`-området er borte sammen med panelet, og
  `.kontroll` trenger ingen `padding-bottom` for å komme klar av noe i sin egen
  kolonne. Klaringen ligger på `<body>` og gjelder hele siden, ikke bare
  byggeren — som er riktig, siden linjen også er der i tillitsseksjonen og
  FAQ-en.

**Hva er synlig når, oppsummert:**

| Tilstand | Mobil | Desktop |
| --- | --- | --- |
| Ved ankomst til siden | Prislinjen i bunn | Prislinjen i bunn |
| Ved ankomst til `#bygg` | Steg 1 øverst, prislinjen i bunn | Steg 1 (venstre) og toppen av innholdslisten (høyre) side ved side, prislinjen i bunn |
| Midt i utfylling | Gjeldende steg i visning, prislinjen i bunn | Alle steg synlig i venstre kolonne samtidig, prislinjen i bunn |
| Under gjennomlesing av innholdslisten | Prislinjen i bunn | Prislinjen i bunn, innholdslisten fortsetter å skrolle i høyre kolonne |
| Etter innholdslisten, i tillit og FAQ | Prislinjen i bunn | Prislinjen i bunn |

At tabellen nå har én verdi i hver celle, er ikke en svakhet ved tabellen — det
er hele poenget. Den gamle mekanikken hadde fire ulike tilstander, og hver av
dem var en tilstand som kunne bli feil på en skjermhøyde vi ikke hadde testet.

### 3.5 Renderingskontrakten

Dette er den viktigste arkitekturbeslutningen i hele byggeren, og den er en
regel, ikke en stilpreferanse:

> Strukturen bygges **én gang** ved oppstart. Etterpå endrer `tegn()` bare
> tekstnoder, `checked`, `aria-pressed`, `hidden`, `disabled` og
> data-attributter. Ingen `innerHTML` på noe som kan inneholde det fokuserte
> elementet.

Varelinjer for **alle** varer i katalogen bygges ved oppstart og skjules med
`hidden` når de ikke gjelder. Da finnes noden allerede når den skal vises, og
ingenting settes inn eller rives ut mens kunden bruker siden.

Grunnen: den forrige versjonen bygde markup på nytt ved hver tilstandsendring,
og fokus falt derfor til `<body>` hver gang kunden trykket mellomrom eller skrev
et tall. Kontrakten fjerner hele feilklassen i stedet for å lappe på den med
fokus-gjenoppretting — en gjenoppretting må huske hvilket element, hvilken
markørposisjon og hvilken markering, og tar feil på den fjerde tingen den ikke
visste at den måtte huske.

To følger er verdt å skrive ned, fordi de ellers ser ut som tilfeldigheter i
koden:

- **All tilstand bor ett sted** (`tilstand.js`), ikke i DOM-en. Leses tilstanden
  ut av markup, må markup bygges på nytt for å endre den — og da er vi tilbake
  til å rive ut noden kunden står i.
- **Stepperens tallfelt skrives ikke over mens det har fokus.** `tegn()` setter
  `input.value` bare når `document.activeElement !== input`. Ellers ville en
  kunde som er i ferd med å skrive «12», fått markøren kastet til slutten i det
  «1» ble klemt til et gyldig tall.

### 3.6 Persistens

Valgene lagres i `localStorage` under `nodboks:bestilling`, versjonert, og
gjenopprettes ved neste besøk. Lagringen er debouncet og feiltolerant: i privat
vindu eller med blokkerte informasjonskapsler skal siden virke nøyaktig som før,
bare uten hukommelse. Hver lesing og skriving er pakket i `try`/`catch`, og et
fall tilbake til standardoppsettet er et gyldig utfall, ikke en feil å melde
fra om.

En lagret tilstand valideres hardt før den brukes. Alt som ikke kjennes igjen —
ukjent versjon, en sku som ikke finnes lenger, en husstand over taket —
forkastes i stillhet og erstattes av standarden. En lagret tilstand fra en
eldre versjon skal aldri kunne sette flyten i en tilstand koden ikke lenger
forstår.

Gjenopprettelsen er **synlig**: en notis «Vi husker hva dere valgte sist» med en
«Start på nytt»-knapp, både i heroens husstandskort og i byggeren. Å huske uten
å si fra er å la kunden tro at tallene er regnet ut på nytt for dagen i dag.

---

## 4. Komponenter

Bruk eksisterende klasser i `assets/css/base.css` der de dekker behovet. Det
som må legges til, er markert **(ny)**.

| Komponent | Klasse(r) | Merknad |
| --- | --- | --- |
| Primærknapp (kjøp) | `.btn .btn--primary` i prislinjen, `.btn--lg` i heroens CTA | Allerede definert med hover/active/disabled-tilstander |
| Sekundærknapp | `.btn .btn--ghost` eller `.btn` | For «tilbake til byggeren»-lenker og lignende |
| Kort | `.card`, `.card--raised` for hevede flater, `.card--flat` for innskutte paneler | |
| Valgkort (matnivå, modus, eske, påfyll) | `.segment` / `.option` / `.option__body` / `.option__title` / `.option__desc` | Utvid `.option__body` med de nye delene (holdbarhetslinjal, kassebilde) som ekstra barn — ikke inni den tekstlige delen av tilgjengelig navn, se § 6.2 |
| Stepper **(ny)** | `.steppere` / `.stepper` / `.stepper__knapp` / `.stepper__tall` | Tre felt mot samme tilstand; tallet er et synlig `<input type="number">`, knappene 44 px. Se § 3.1 |
| Husstandskort i heroen **(ny)** | `.husstandskort` + `.steppere` | Samme steppere og samme tilstand som steg 1, egen id-forstavelse. Se § 2.1 |
| Fast prislinje **(ny)** | `.prisbar` / `.prisbar__pris` / `.prisbar__sum` / `.prisbar__enhet` / `.prisbar__hint` | `position: fixed`, utenfor alle seksjoner, rett før `</body>`. Prisen er selv knappen. Se § 3.2 |
| Regnestykket **(ny)** | `<dialog class="prisdialog">` + `.prispanel__linjer` / `__linje` / `__mva` / `__fot` | Åpnes med `showModal()`. Kvitteringslinjene er de samme som før, bare flyttet inn i dialogen. `.prispanel`, `.prispanel__sum` og `.prispanel__enhet` er slettet |
| Innholdsliste | `.gruppe` / `.gruppe__navn` / `.vare` / `.vare__navn` / `.vare__antall` / `.vare__hvorfor` | Ikke `.table` — grupper med ekte `<h3>` og eksplisitt `1fr auto`-rutenett per rad. Se § 3.3 |
| Fravalg og tillegg i varelinjen **(ny)** | `.vare__handling`, `.vare--utelatt`, `.vare--tillegg` | `<button aria-pressed>`, ikke avkrysningsboks. Vises bare over fravalgsterskelen. Se § 3.3 |
| Merkelapp (holdbarhet, status) | `.badge`, `.badge--accent/--ok/--warn/--info` | Bruk `--warn`/`--info` for holdbarhetsstatus, aldri `--accent` til noe som skal lese som en advarsel (kolliderer med kjøpsknappens farge, se `tokens.css`) |
| Varsel/alert **(ny)** | `.varsel`, `.varsel--ok/--advarsel/--info` | Bygges av `--ok`/`--warn`/`--info`-tokenparene. Alltid ikon + tekst, aldri farge alene (samme prinsipp som tokens.css allerede fastsetter for status). Brukes til f.eks. «Denne kombinasjonen dekker ikke DSBs anbefalte vannmengde for husstanden» |
| Trekkspill | `details.accordion` | Brukes til FAQ. Regnestykket bruker `<dialog>`, ikke trekkspill — et trekkspill inni en fast linje dytter linjen oppover halve skjermen. Se § 3.2 |
| Sticky header-CTA **(ny)** | `.btn .btn--sm .btn--primary` i `.site-header__inner` | Se § 2.1 og § 4.5 |

### 4.5 Hvorfor den faste prislinjen ikke er en «dock»

Tre av fire skisser bygde en egen JavaScript-styrt klebrig kjøpslinje bundet
til `#pakkebygger` via `IntersectionObserver`. Juryen fant konkrete feil i
hver implementasjon: bundet til feil seksjon (kjøpsveien forsvant i
sammenligningstabellen og FAQ), skjult med `aria-hidden` + `transform` på et
element med ekte, fokuserbare knapper inni (tastaturfelle), eller inkonsistent
knappetekst mot resten av siden.

Vi har en fast linje mot bunnen (§ 3.2), men den er ikke en dock, og det er
ikke ordkløveri: alle tre feilene over er feil i **når linjen vises**. Vår
linje har ikke noe «når». Den er der fra første maling, på alle bredder, i alle
seksjoner, og det finnes ingen kodesti som skjuler den. Ingen observer å binde
til feil seksjon, ingen `aria-hidden` å sette på fokuserbare knapper, ingen
skjult tilstand å teste — og dermed heller ingenting å få galt i en
nettleserversjon vi ikke har prøvd.

I tillegg beholder vi de to mekanismene som allerede virket: den sticky
topplinjen har en alltid synlig CTA-lenke til byggeren, og hver seksjon utenfor
byggeren avsluttes med en enkel tekstlenke tilbake dit. Tre måter til kjøp, og
ingen av dem trenger å vite hvor på siden brukeren er.

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
| Prissummen i prislinjen (`.prisbar__sum`) | `--step-3`, med `.tnum` for tabellstilte tall og strammet `letter-spacing` — dette er sidens viktigste enkelttall, og det skal kunne leses på en armlengdes avstand |
| Småtekst (enhetspris, hint, fotnoter, kvitteringslinjer) | `--step--1` |

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
  inneholder fokuserbare barn. Prislinjen (§ 3.2) skjules **aldri** — verken
  med `aria-hidden`, `transform`, `display` eller `visibility` — og det er den
  enkleste måten å oppfylle regelen på: en knapp som alltid er synlig, kan ikke
  bli en tastaturfelle.
- Regnestykket åpnes med `<dialog>.showModal()`, som gir fokusfelle innenfor
  dialogen, lukking med `Esc` og inert bakgrunn fra plattformen. Ingen av de
  tre skrives av oss, og ingen av dem kan derfor glemmes ved neste endring.

### 6.2 Skjermleser

- Stegene er `role="group"` / `role="radiogroup"` med `aria-labelledby` mot
  stegets `<h3>` — **ikke** `<fieldset>`/`<legend>`. En `<legend>` teller bare
  som gruppetittel når den er første og direkte barn av sin `<fieldset>`, og
  stegtittelen ligger inne i et hode sammen med stegnummeret. Flere skisser
  brøt dette og mistet gruppenavnet for skjermleserbrukere; vår egen markup
  gjorde den samme feilen helt til stegene ble bygget om. `aria-labelledby`
  har ikke noe krav til plassering, og kan derfor ikke brytes av en
  layoutendring senere.
- Fravalg og tillegg er `<button aria-pressed>`, ikke avkrysningsbokser. En
  avkrysningsboks leses som «velg ett av flere»; dette er «skru av noe som
  allerede er med», og det skal være hørbart, ikke bare synlig.
- Valgkortenes tilgjengelige navn holdes kort (tittel + pris). Den utvidede
  beskrivelsen (spec-rader, holdbarhetslinjal, brødtekst) knyttes til
  `<input>` via `aria-describedby`, eller kortets `<label>` gis en eksplisitt
  `aria-label` som overstyrer den automatiske sammenslåingen av all tekst i
  labelen. Én skisse endte med et 40+ ords tilgjengelig navn per radioknapp
  fordi hele kortet — inkludert spesifikasjonstabell — lå inni `<label>`
  uten noen av disse to rettelsene.
- Prisoppdateringer går gjennom ett debouncet `role="status"`-felt (§ 3.2),
  ikke separate `aria-live`-regioner per tall.
- Innholdslisten er ikke en tabell, men grupper med overskrift (§ 3.3): hver
  `<section class="gruppe">` har en ekte `<h3>`, slik at en skjermleser kan
  hoppe mellom DSBs fire kategorier. En gruppe uten synlige varer settes
  `hidden` — en overskrift over ingenting er verre enn ingen overskrift.

### 6.3 Redusert bevegelse

`base.css` har allerede en global `prefers-reduced-motion: reduce`-regel som
nuller CSS-transisjoner og -animasjoner. Den dekker **ikke**
JavaScript-drevet animasjon (f.eks. en opptellingsanimasjon på prissummen, et
«bump»-blink når antall endres). All slik JS-animasjon skal derfor i tillegg
lese `window.matchMedia('(prefers-reduced-motion: reduce)')` og hoppe rett til
sluttilstanden når det treffer. To lag, ikke ett — fordi CSS-regelen alene
ikke er nok.

Det gjelder også ren rulling: CTA-ene i heroen bruker `scrollIntoView`, og
`behavior` settes til `'auto'` i stedet for `'smooth'` når mediaspørringen
treffer. Myk rulling over tolv skjermhøyder er nettopp den bevegelsen
innstillingen finnes for.

### 6.4 Kontrast

Alle fargepar er målt, ikke påstått, av `node scripts/kontrast.mjs` — kjør det
etter enhver endring i `tokens.css` eller enhver ny flate/tekstkombinasjon som
introduseres i byggingen av denne siden (f.eks. hvis `.varsel`-komponenten
tar i bruk en ny bakgrunn-/tekstkombinasjon som ikke allerede er dekket).
Scriptet feiler bygget hvis noe ligger under kravet. Ikke-tekstlig kontrast
(WCAG 1.4.11) gjelder også: skjemakontroller, valgkortenes kant i uvalgt
tilstand, og fokusringer på alle flater siden faktisk bruker — ikke bare
standardflaten.

### 6.5 Trykkflater

Alle berøringsmål er minst 24 × 24 px (WCAG 2.5.8). Stepperknappene er 44 px,
altså det romsligere 2.5.5-målet, og det er de som avgjør layouten og ikke
omvendt: tre 44 px-knapper får ikke plass i 106 px, og derfor ligger stepperne
som rader på telefon i stedet for som tre kolonner (§ 3.1). Å krympe knappen
til 32 px for å vinne et rutenett er å gjøre selve inntastingen verre for å
vinne en layout.

Innlinjelenker i løpende tekst er unntatt, per standardens egen
«inline»-unntak. Unntaket gjelder **bare** lenker som står inne i en setning.
En lenke som står som egen linje — `.vare__lenke` til bruksanvisningen, for
eksempel — er ikke inline, og får derfor eksplisitt høyde. Unntaket er en
beskrivelse av hva som er umulig å styre, ikke en tillatelse til å la være.

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

- **Ingen kjøpslinje styrt av scroll-posisjon eller IntersectionObserver.**
  Se § 4.5 — tre av fire skisser hadde bugs eller tastaturfeller i akkurat
  denne mekanikken, og alle tre var feil i *når* linjen ble vist. Vår prislinje
  er fast og alltid synlig, og har derfor ingen slik mekanikk å ta feil av.
  Sticky topplinje + fast prislinje + retur-lenker gir effekten uten en eneste
  bevegelig del.
- **Ingen sammenligningstabell plassert langt fra valget den begrunner.**
  Kjernesammenligningen (holdbarhetslinjalen) ligger inni matkortet selv; den
  utvidede tabellen med «din jobb»-raden ligger rett etter byggeren, ikke
  lenger ned på siden.
- **Ingen egen liste for det kunden har fra før.** Se § 3.3 — tre lister over
  de samme varene er tre versjoner av sannheten, og kunden må lese alle tre for
  å finne ut hvilken som gjelder. Fravalget hører hjemme på varelinjen.
- **Ingen markup som bygges på nytt mens kunden holder på.** Se § 3.5.
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
