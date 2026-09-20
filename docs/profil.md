# Merkevareprofil: Nødboks

Denne filen er skrevet for å kunne gis videre uten muntlig forklaring – til en
ny designer, en tekstforfatter eller en trykkerikontakt. Den beskriver merket,
ordmerket, fargebruken, typografien, stemmen og de fysiske flatene.

Den erstatter ikke `docs/farger.md` (utledningen av paletten) eller
`docs/designvalg.md` (byggespecen for nettsiden). Den forutsetter begge, og
henviser dit framfor å gjenta dem.

Alle kontrastforhold i denne filen er målt med `node scripts/kontrast.mjs`
eller med samme formel. Ingen av dem er påstått.

---

## 1. Posisjonen

> **Utstyr som er godt nok til at du bruker det ellers i året – satt sammen så
> husstanden klarer sju døgn hjemme.**

Premium her er funksjonelt, ikke sosialt. Begrunnelsen er ikke at kunden
fortjener det fine, men at en hodelykt du aldri har brukt, er en hodelykt du
fomler med i mørket. Beredskap som aldri berøres, er ikke beredskap – det er en
kasse med fremmede gjenstander. Det er også hele svaret på hvorfor
billigsegmentet vinner i dag: beredskap er død kapital for kunden. Utstyr man
faktisk bruker, er det ikke.

### Hva posisjonen forplikter oss til

Fire forpliktelser. De er skrevet slik at de kan brukes som avvisningsgrunn i
en konkret sak, ikke som verdiord.

1. **Brukstesten.** Enhver premium-påstand skal kunne fullføres med
   «… derfor tar du det med deg». Kan den ikke det, er den status og ikke
   funksjon, og den skal strykes. Bestått eksempel, allerede på siden: «Lykten
   blir med på hyttetur. Stormkjøkkenet står på svaberget i juli.»

2. **Kostnad før fordel.** Vi innrømmer prisen først og forklarer den etterpå,
   i den rekkefølgen, hver gang. Mønsteret står allerede i § 3b på forsiden:
   «Det koster mer. Til gjengjeld er det ikke penger som står og taper seg i en
   bod.»

3. **Tall framfor adjektiv.** En påstand og begrunnelsen for den skal stå i
   samme setning, og begrunnelsen skal være et tall eller en mekanisme. Se § 6.

4. **Ett signal per flate.** Hver flate utenfor nettsiden har nøyaktig ett
   felt i aksentfarge, og det er alltid det ene faktumet som er tidskritisk.
   Se § 4 og § 7.

---

## 2. Merket

### 2.1 Hva det er

**Glødepunktet**: en ring som holder en fylt kjerne.

Ringen er det uladede pigmentet. Kjernen er ettergløden. Samme kulør, motsatt
valør – nøyaktig mekanikken paletten er utledet fra (strontiumaluminat,
`docs/farger.md`), oversatt til geometri i stedet for til en tegning av
emballasjen.

Kontrasten mellom åpen ring og fylt kjerne **er** lysvirkningen. Den er ikke en
effekt lagt oppå.

I mørk modus – den primære identiteten – er kjernen lysere enn alt rundt seg og
leser som en innesluttet lyskilde. I lys modus er den mørkere enn flaten og
leser som pigmentet før det er ladet. Merket bytter altså tilstand med modusen,
på samme måte som paletten gjør det, i stedet for å bli lysnet mekanisk.

### 2.2 Geometrien

`viewBox="0 0 32 32"`, samme konvensjon som resten av ikonene.

| Element | Verdi |
| --- | --- |
| Ring | `circle cx=16 cy=16 r=10.5`, `fill=none`, `stroke=currentColor`, `stroke-width=3` |
| Kjerne | `circle cx=16 cy=16 r=5`, fylt i aksentfargen |
| Ringens ytre diameter | 24 av 32 enheter (75 %) |
| Kjernens diameter | 10 av 32 enheter (42 % av ringens) |
| Luft mellom kjerne og ringens innside | 4 enheter |

De tre forholdstallene er valgt sammen og skal ikke justeres hver for seg. En
tynnere ring med større tomrom (for eksempel `r=11`, `stroke-width=2`,
kjerne `r=4.5`) ble tegnet og sett på i nettleser ved siden av denne: den leser
som et blinkskudd eller en opptaksknapp. Den tyngre ringen med den kortere
luften leser som en form som holder noe. Forskjellen er ikke subtil ved 96 px,
og den er avgjørende ved 16 px.

Kjernen står **sentrert**. En forskjøvet kjerne leser som ubalanse, ikke som
bevegelse, ved små størrelser.

### 2.3 Fargekontrakten

| Kontekst | Ring | Kjerne |
| --- | --- | --- |
| Inline i sidens markup | `currentColor` | `var(--accent)` |
| Frittstående fil, lys systemmodus | `#12211D` | `#52601B` |
| Frittstående fil, mørk systemmodus | `#E8EFE9` | `#D9E6A0` |
| Favicon / app-ikon | `#E8EFE9` på flis `#12211D` | `#D9E6A0` |
| Ett-farge (gravering, ett-farge trykk) | valgt blekkfarge | samme blekkfarge |

To-tone-prinsippet eller solid-mot-åpen-prinsippet skal håndheves i **hver**
kontekst. Slippes det, kollapser merket til et generisk måltegn – det er
merkets eneste reelle svakhet, og den eneste forsvarslinjen mot den er
disiplin. Ett-farge-varianten er derfor ikke «merket uten farge»; den er en
egen, definert variant der verdikontrasten bæres av fylt mot åpen form.

**Fallgruve, dokumentert:** `assets/img/merke.svg` bytter tilstand etter
*systemets* fargemodus, ikke etter flaten den ligger på. Lastet som `<img>` på
en mørk flate i en nettleser som står i lys modus, blir ringen mørk mot mørkt
og forsvinner. Filen er derfor for inline bruk og for lyse flater. Skal merket
på en mørk flate i en sammenheng vi ikke styrer tokens i, bruk
ett-farge-varianten med lys blekkfarge.

### 2.4 Minstestørrelser

| Bruk | Minste mål | Begrunnelse |
| --- | --- | --- |
| Favicon, med flis | 16 px | Flisen holder merket avgrenset; ringstrek 1,3 px |
| Frittstående på skjerm | 20 px | Under dette er luften mellom kjerne og ring under 2 px og fyller seg igjen |
| Trykk, to farger | 7 mm | Ringstrek 0,66 mm, luft 0,87 mm |
| Gravering / preg | 12 mm | Grovere prosess, større minste detalj |

Favicon-varianten har egne mål (`favicon.svg`): merket er skalert ned til 22 av
32 enheter for å få luft inn til fliskanten. Formen er den samme. Flisen har
`rx=5`, som er flisradius og ikke en oppmykning av formspråket – merket selv
har ingen radius.

Favicon-varianten er **låst til natt-tilstanden** uten
`prefers-color-scheme`. Støtten for fargeskjema i SVG-favicons er ujevn på
tvers av nettlesere, og mørk modus er uansett den primære identiteten. Flisen
gjør dessuten merket lesbart på både lys og mørk fanelinje.

### 2.5 Friareal

**Friarealet er kjernens diameter** – 10 enheter ved `viewBox 32`, altså 42 %
av ringens diameter – målt fra ringens ytterkant, på alle fire sider.

Praktisk: ved et 26 px merke er det 8 px. Ved et 10 mm merke er det 4,2 mm.

### 2.6 Hva som ikke er lov

- **Ingen gradient og ingen glød.** Forbudet står allerede i `docs/farger.md`
  og gjelder merket spesielt: esken lyser ikke, og en glød uten referent er
  nøyaktig feilen den forrige paletten ble forkastet for.
- **Ingen stråler, ingen ekstra ringer.** Ett unntak: i stort format (over
  60 mm) kan én ekko-ring i 1–2 mm avstand legges til, som antydning av
  etterglød. Den er reservert for stort format fordi den ved liten størrelse
  bare leser som en utflytende kontur.
- **Ingen aksentfarge på ringen.** Aksenten bærer kjernen, aldri konturen.
  To aksentfargede elementer i samme merke opphever verdikontrasten som er
  hele poenget.
- **Ingen åpen kjerne.** Kjernen er alltid fylt.
- **Ingen rotasjon, ingen forskyvning, ingen beskjæring.**
- **Ingen plassering på en mellomtone** der verken ring eller kjerne når 3:1.
  Mål det; ikke anslå det.
- **Ingen bokseikon.** Det forrige merket – en strektegnet koffert med en
  sirkel og en diagonal strek inni – er trukket tilbake. Årsak, kort: sirkel
  med diagonal strek gjennom **er** det universelle forbudstegnet, og ved
  favicon-størrelse var det den mest sannsynlige lesningen. Et forbudsskilt på
  en side som selger trygghet er ikke pirk. Sett ved siden av det nye merket i
  nettleser ved 96 px var lesningen entydig.

---

## 3. Ordmerket og lås-opp

Det finnes tre versjoner. De er tre sjangre, ikke tre smaksvarianter, og
hvilken som gjelder følger av flaten.

### 3.1 Løpende ordmerke

**«Nødboks»**, liten forbokstav, systemserifen (`--font-display`), vekt 650,
sperring −0,02 em. Dette er allerede riktig satt i `.brandmark` i `base.css`
og skal ikke endres.

Grunnen til at løpende bruk **ikke** går i versaler: et produktnavn med «nød» i
seg trekker allerede mot varselskilt, og versaler forsterker det. «NØDBOKS»
uten sperring kolliderer dessuten optisk i overgangen Ø–D, der Ø-ens diagonale
utløpsstrek møter D-ens rette stamme.

### 3.2 Versalplaketten

**NØDBOKS** i systemgrotesken (`--font-ui`), vekt 600, sperring **0,10 em**.

Brukes på etikett, permomslag, Open Graph-bilde og eventuell bunntekstvignett –
altså der ordmerket settes som en plate, ikke som en lenke. Sperringen er ikke
pynt: uten den kolliderer Ø-en med D-en, som beskrevet over.

Under 3,5 mm eller 12 px økes sperringen til **0,14 em**. Små versaler trenger
mer luft, og trykkfarge sprer seg på matt kartong.

Fordi stakken er en systemstakk – Iowan Old Style eller San Francisco på Mac,
Segoe UI på Windows, ulikt på Linux – varierer sidebearings mellom
plattformer. **Sperringstallet skal derfor sjekkes visuelt på minst Mac og
Windows før en trykkoriginal låses.** Det er den samme disiplinen `farger.md`
krever av kontrast: mål det, ikke påstå det.

### 3.3 Sjablongmerkingen

**NØDBOKS** i grotesk, vekt 450–500, sperring 0,26–0,28 em.

Dette er ikke ordmerket. Det er en kassemerking – sjangeren er stemplet
transportkasse, den skal leses fra avstand og over en flate med struktur, og
den tåler derfor en sperring plaketten aldri ville tålt. Den brukes i
hero-illustrasjonen på forsiden i dag (`font-size 13`, `letter-spacing 3.5`),
og kan brukes ved trykk direkte på kassen.

Ikke bland: sjablongmerkingen skal aldri stå der plaketten skal stå, og
omvendt.

### 3.4 Lås-opp

Symbolet står til **venstre** for ordmerket, vertikalt sentrert mot ordmerkets
**versalhøyde** – ikke mot x-høyden. Serif-versalene definerer den optiske
boksen.

| Forhold | Verdi |
| --- | --- |
| Ringens ytre diameter | 1,35–1,40 × ordmerkets versalhøyde |
| SVG-boksens høyde | ringdiameteren ÷ 0,75 (boksen har 4 av 32 enheter luft på hver side) |
| Optisk gap, ringens kant til første bokstav | 0,5–0,6 × ringens diameter |

Topplinjen i dag: ordmerket står i `--step-1`, versalhøyde rundt 14 px;
symbolet er satt til 26 px, som gir en synlig ring på 19,5 px – forholdet
1,39. Det var 28 px før denne runden, altså 1,5, og symbolet dominerte mer enn
nødvendig.

**Åpent valg:** det optiske gapet i topplinjen er i dag rundt 0,78 × ringens
diameter (`gap: var(--sp-3)` i `.brandmark`, pluss symbolets egen luft på
3,25 px). Regelen over vil ha 0,5–0,6. Rettelsen er ett tokentrinn –
`var(--sp-2)` – men den ligger i `base.css`, som denne runden ikke skulle røre.
Den bør tas i en egen, liten endring.

---

## 4. Farge

Paletten «Natt», utledningen og alle målte forhold står i **`docs/farger.md`**.
Tokens står i **`assets/css/tokens.css`**. Ingenting av det gjentas her.

Det som hører hjemme her er **hvordan** fargene brukes når uttrykket skal være
premium. Kort: aksenten er et signal, ikke en dekor, og nesten alt skal være
ufarget.

### 4.1 Hva aksenten har lov til å bære

På nettsiden er aksenten reservert for tre ting:

1. **Handling** – primærknapp og lenke i brødtekst.
2. **Tilstand** – valgt kort, fylt spor i slideren, aktivt trinn.
3. **Merkets kjerne.**

Utenfor disse tre er aksenten ikke tillatt. Konkret betyr det: ingen
aksentfarget seksjonsbakgrunn, ingen aksentfarget overskrift, ingen
aksentfarget skillelinje, ingen aksentfarget ikonrekke, ingen aksent som
«liten piff» i en illustrasjon.

Hero-illustrasjonen på forsiden er fasiten og har allerede kommentaren som sier
det: *ett element i aksentfarge – lykten, det eneste lyset i bildet.* Resten er
hairline i tekst- og kantfarge.

### 4.2 På flater utenfor nettsiden

**Nøyaktig ett felt i aksent, og det er alltid det tidskritiske faktumet.**

På etiketten: byttedatoen. I utløpspåminnelsen: datolinjen. På Open
Graph-bildet: høyst ett ord. Ikke merket, ikke overskriften, ikke en ramme
rundt det hele.

Det gjør aksenten til noe som betyr «her», i stedet for noe som betyr «dette er
vår farge».

### 4.3 Hva som skal være ufarget

Overskrifter, brødtekst, tall, tabeller, kanter, ikoner og illustrasjoner står
i tekst- og kantfarge. Det er dette som gjør uttrykket dyrt: en side der
nesten alt er ufarget, og der det ene fargede feltet derfor faktisk blir sett.

Et billig oppsett kjennes igjen på det motsatte – merkefargen strødd utover
ikoner, streker, tagger og bakgrunner til den ikke lenger sier noe.

### 4.4 To aksentnivåer skal ikke stables

`--accent-soft` og `--accent-line` er **flater og kanter**, ikke en andre
aksent. En aksentknapp skal ikke stå på en `--accent-soft`-flate; da er det to
lag av det samme signalet, og begge blir svakere.

### 4.5 Ikke-tekstlig kontrast

Merket, kanter og fokusringer er grafiske elementer og faller inn under WCAG
1.4.11 (3:1). Det gjelder også flater som ikke er standardflaten. Kjør
`node scripts/kontrast.mjs` etter enhver ny flate/farge-kombinasjon.

---

## 5. Typografi

### 5.1 Stakkene

| Rolle | Token | Innhold |
| --- | --- | --- |
| Display | `--font-display` | Iowan Old Style, Palatino Linotype, Palatino, Book Antiqua, Charter, Georgia, ui-serif, serif |
| Grensesnitt og brødtekst | `--font-ui` | system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif |
| Tall og data | `--font-mono` | ui-monospace, SF Mono, Menlo, Consolas, monospace |

**Ingen webfont.** Terskelen står allerede i `tokens.css`: én variabel font,
selvhostet, `preload`, `font-display: swap` og `size-adjust` som holder
skiftet under 2 %. Den terskelen er fortsatt ikke nådd av noe vi trenger.

Kostnaden er reell og målbar – et ekstra nettverkskall i den kritiske kjeden og
et ombrekkingsskift på LCP-elementet – og gevinsten mot en serifstakk som
allerede er karakterfull er marginal. Et premiumuttrykk som koster kunden en
halv LCP-sekund er ikke premium.

### 5.2 Skalaen

Uendret fra `tokens.css`. Ingen nye trinn. Rollefordelingen står i
`docs/designvalg.md` § 5 og gjelder som den er.

Kontrastspennet mellom `--step-5` og `--step-0` er allerede riktig og skal
ikke svekkes for å gi plass til nye elementer.

### 5.3 Streng rollefordeling

- **Serifen** brukes til H1–H4 og til prissummen. Det er alt.
- **Grotesken** brukes til alt grensesnitt: knapper, navigasjon, skjemaetiketter,
  brødtekst, mikrotekst.
- **Monoen** brukes til data som skal leses tegn for tegn: konfigurasjonslinjer
  på etikett, serienummer den dagen de finnes, datoformater.

Serifen skal aldri inn i grensesnittkrom. Ett unntak er nok til å svekke hele
hierarkiet, fordi hierarkiet ikke er en følelse – det er at leseren kan slutte
noe av skriftbyttet.

### 5.4 Tallbehandling

**Tabellstilte tall (`tabular-nums`) overalt der tall står i kolonne eller
oppdateres live.** Det er allerede riktig gjort i `.tnum`, i prispanelet, i
varelisten og i sammenligningstabellen.

**Ingen oldstyle-tall.** Forslaget har vært oppe og avvises her, med to
grunner. Den prinsipielle: i denne butikken er tallene selve argumentet –
702 kcal, 1 800 dager, 21 kilo – og oldstyle-figurer er designet for å la tall
gli inn i tekstfargen. Vi vil ha det motsatte. Den praktiske: brødteksten er
satt i `--font-ui`, altså en systemgrotesk, og ingen av systemgroteskene på
Mac, Windows eller Android har et oldstyle-sett. Regelen ville vært en
no-op som så ut som en beslutning – og en kommentar som beskriver en intensjon
koden ikke utfører, er verre enn ingen kommentar.

### 5.5 Optiske justeringer

Disse er allerede i `base.css` og er en del av profilen, ikke tilfeldigheter:

| Sted | Justering | Hvorfor |
| --- | --- | --- |
| H1 | `letter-spacing: -0.032em` | Store grader faller fra hverandre uten innstramming |
| H2 | `-0.024em` | Samme, mindre grad |
| H3/H4 | `-0.015em` (arvet) | Så vidt |
| Ordmerke, løpende | `-0.02em` | Serif i vekt 650 |
| Versalplakett | `+0,10 em` (0,14 under 3,5 mm) | Versaler har ingen indre luft; Ø–D kolliderer |
| Sjablongmerking | `+0,26–0,28 em` | Egen sjanger, se § 3.3 |
| Mikroetiketter i versaler | `+0,08–0,12 em` | Null sperring på versal-mikrotekst er det enkleste kjennetegnet på et gratis temaoppsett |

---

## 6. Tekstprofil

Tonen finnes allerede, i brødteksten på forsiden og i `hvorfor`-feltene i
`assets/js/data/katalog.js`. Jobben her er ikke å lage den, men å navngi den,
slik at den holder også der skjemaet ikke tvinger den.

Det er den reelle risikoen: `hvorfor`-feltene står ved siden av en pris kunden
kan sammenligne, og den nærheten tvinger fram et tall. Løpende redaksjonell
tekst – hero, tillitsseksjonen, en framtidig om-side – har ingen slik tvang.
Det er akkurat der «premium» vil bli forstått som en oppfordring til flere
adjektiver.

### 6.1 Fem prinsipper

**1. Påstand og begrunnelse i samme setning.** Ikke en påstand, og så en
begrunnelse to setninger senere.

- Innafor: «Vi valgte 10-liters framfor 20-liters med vilje: en full
  20-literskanne veier 21 kilo og kan ikke bæres eller helles av et barn, en
  gravid eller en eldre.»
- Utafor: «Vi velger det beste utstyret for familien din.»

**2. Innrømmelse før påstand.** Si begrensningen høyt før du sier styrken.

- Innafor: «Vi er ikke godkjent av noen.» «Nei, og ingen slik godkjenning
  finnes.»
- Utafor: «Våre pakker følger beste praksis» – en begrensning pakket inn i
  passiv.

**3. Tall og navngitt kilde erstatter adjektiv.**

- Innafor: «702 kcal per pose mot 400–525 i den ordinære turmat-linjen.»
  «1 800 dager ved 2–25 grader.»
- Utafor: «eksepsjonell kvalitet», «markedsledende», «unikt utvalgt» – uansett
  hvor sant det føles.

**4. Voksen, andreperson, korte setninger, ingen utropstegn.**

- Innafor: «Har dere primus, lykter og radio fra før, kjøper dere bare maten.»
- Utafor: «Du fortjener å være trygg!»

**5. Si fra når data spriker.**

- Innafor: «Flere år. Sjekk datoen på posen – tallene som sirkulerer i bransjen
  spriker.»
- Test: ville en skeptisk kunde funnet kilden på under ett minutt? Hvis ikke,
  skriv ikke tallet.

### 6.2 Ordliste

**Ja:** beredskap, egenberedskap, husstand, sju døgn, uka, utstyr, mengder,
regnestykke, kilde oppgitt, kroner, kilo, liter, kcal, «ikke godkjent av»,
«ikke tilknyttet». Konkrete enheter foran adjektiv, alltid.

**Nei, med begrunnelse:**

| Ord | Hvorfor ikke |
| --- | --- |
| prepping, prepper | Subkultur-signal kundeprofilen aktivt flykter fra |
| overlevelse, overlevelsesutstyr | Eksplisitt forkastet i `designvalg.md` § 7 |
| katastrofe | Frykt-salg |
| krise som ramme | Kan stå i lenketekst når det siterer DSBs egen formulering. Våre egne setninger sier «uvant»: «Det er ikke dramatisk. Det er bare uvant.» |
| trygghet, ro (frittstående) | Markedsanalysen viser at trygghet er allemannseie som ingen eier. Ordet skal aldri stå alene som konklusjon – bare som beskrivelse av en konkret mekanisme. «Det gjør at du kjenner utstyret når det gjelder», ikke «du får trygghet» |
| eksklusiv, luksus, unik | Statusord, og de motsier at premium her er funksjonelt |

### 6.3 Konkurrentomtale

Alt som går i kundetekst skal være **mønster på markedsnivå** – aldri det
navngitte, tallfestede funnet fra `docs/konkurrentanalyse.md`.

Riktig, og allerede på siden: «flere av de største leverer samme antall lykter,
brennere og førstehjelpssett uansett hvor mange dere er.» Ingen navn, ingen
sporbare tall, fullt etterprøvbart for den som leter.

Samme mønster for matfunnet: «Mye av det som selges som beredskapsmat i Norge
er nødrasjoner utviklet for redningsflåter – ikke mat en familie spiser i sju
døgn.»

Aldri i kundetekst: butikknavn, kroner hos en navngitt konkurrent,
organisasjonsnummerfunn, eller sitat fra en konkurrents side. To grunner:
det bryter tonen (smålighet), og sammenlignende reklame som ikke er
uavhengig verifisert for publisering er en reell eksponering etter
markedsføringsloven. Funnene hører hjemme i `konkurrentanalyse.md`.

### 6.4 Mikrotekst

- **Knapper:** verb først. «Sett sammen esken din», «Legg i kurven», «Se hva
  som ligger i den», «Ja, hold styr på datoene for oss». Aldri «Send» eller
  «OK».
- **Feilmeldinger:** hva skjedde, hvorfor, hvordan det rettes – i samme tørre
  register som resten. Ingen «Oops», ingen unnskyldende fyllord. Mal: «Kunne
  ikke beregne prisen. Husstanden må være mellom 1 og 8 personer – juster
  glideren og prøv igjen.»
- **Tomme tilstander:** si rett ut hva som mangler og hva neste steg er. Ingen
  munter tomtilstand som later som ingenting mangler. Det er
  «et tomt felt er ærlig» anvendt på grensesnittet.
- **Kvitteringer:** gjenbruk prisoppsettets linjemønster ordrett, inkludert
  «Herav mva. (15 % mat, 25 % utstyr)» som egen utregnet linje. Aldri en
  samlesum uten mva-splitt.

---

## 7. Anvendelse

### 7.1 Esken

Kunden velger selv kasse: plast (SmartStore Dry 45) eller aluminium (**Zarges
Eurobox 40702, 600 × 400 × 330 mm**). Se `ESKER` i
`assets/js/data/katalog.js`.

Begge skal forbli hva de er. Merket tilfører **én etikett**; det maler ikke
kassen, og det legger ikke et trykt mønster på lokket. En bar aluminiumskasse
med én stram etikett er dyrere i uttrykk enn en kasse som er dekorert – og den
er ærligere, fordi kassen faktisk skal brukes til hyttetur og loft.

Husstander over fem personer får to eller tre kasser. Da merkes hver kasse for
seg, og sammenhengen sies i **tekst** – «ESKE 2 AV 3» – aldri med et symbol.
Et symbol ved siden av en kassemerking leser som en sertifisering eller en
fareseddel, som er samme feil som skjold-med-hake ved siden av DSBs navn.

### 7.2 Etiketten

Satt som `assets/img/etikett.svg`, i faktisk format: **148 × 105 mm (A6,
liggende)**, én SVG-brukerenhet er 1 mm. Formatet er målt mot Zarges-lokket
(600 × 400 mm), som er det ene kassemålet katalogen faktisk dokumenterer. Der
dekker etiketten rundt en fjerdedel av bredden – bredt nok til å leses fra
stående høyde, smalt nok til at kassen fortsatt er kassen.

Plastkassen har ikke et mål oppgitt i katalogen. Formatet må måles mot et
faktisk eksemplar før trykk; det er ikke gjettet her.

**Flaten er natt.** Bunn `#12211D`, tekst `#E8EFE9` (14,2:1), etterglød
`#D9E6A0` (12,5:1) på nøyaktig ett felt. Mørk modus er den primære
identiteten, og etiketten leses i praksis i en mørk bod med hodelykt.

Rekkefølgen ovenfra:

1. Merket og versalplaketten NØDBOKS, med «ESKE n AV m» høyrestilt på samme
   grunnlinje, i mono og dempet farge.
2. Hårlinje.
3. Konfigurasjonslinjen i mono: husstand, matnivå, omfang.
4. «I DENNE KASSEN» som mikroetikett, og under den katalogens egne
   kategorinavn i to kolonner.
5. **Byttedatofeltet** – flatens eneste fargede element. Ramme i etterglød,
   «PÅFYLL SENEST» og datoen på samme grunnlinje.
6. Bunnlinje som peker videre til permen.

Ingen hjørneradius: stanset kant, som resten av formspråket.

**Variable felt**, fylt ved pakking. Id-ene i filen er kroken:
`felt-eske`, `felt-konfigurasjon`, `felt-dato`.

**Ingen serienummer.** Et løpenummer må komme fra et ekte ordre- eller
lagersystem. Før det finnes, er et trykt nummer et oppdiktet faktum. Et tomt
felt er ærlig; et oppdiktet felt er ikke det.

**Ett-farge-variant** til gravering eller ett-farge trykk: samme oppsett, all
tekst i én blekkfarge, merket i ett-farge-varianten (§ 2.3), og
byttedatofeltet beholder rammen – da bæres signalet av rammen alene i stedet
for av farge.

**Før trykk:** konverter tekst til kurver, eller oppgi fontene til trykkeriet.
Fontstakkene i filen er systemstakker og finnes ikke i et RIP-miljø.

### 7.3 Åpningsopplevelsen

**Beredskapspermen** ligger øverst, rett under lokket, som det første kunden
ser. Den finnes allerede som vare i katalogen: trykt hefte med hva du gjør de
første timene, sju døgns menyplan med tilberedning, DSBs egen sjekkliste,
skjema for kontakter og medisiner, og en konvolutt til kontanter.

Anbefalt utførelse: **A5, med spiral- eller wire-o-rygg, ikke stiftet.** To
grunner, begge funksjonelle: permen skal ligge flatt oppslått på kjøkkenbenken
mens kontakt- og medisinskjemaet fylles ut, og konvolutten og løse skjema
sitter bedre bak en fast rygg med lomme enn i et stiftet hefte.

Omslaget bruker etikettens språk – versalplaketten på natt-flate – ikke
display-serifen. Sjangeren er den samme: en merket transportkasse, ikke en bok.

**Innholdslisten er ikke en del av permen.** Permen trykkes statisk i opplag;
innholdslisten er per konfigurasjon. Den følger derfor med som **ett løst
A4-ark**, skrevet ut ved pakking og lagt oppå permen, med samme
kolonneoverskrifter som nettsiden (Vare, Antall, Holdbarhet, Grunnlag) og med
antall og datoer i tabellstilte tall.

*Forbehold:* dette forutsetter at fulfillment kan skrive ut variabeldata ved
pakking. Det er en forutsetning, ikke en bekreftet kapasitet.

### 7.4 Utløpspåminnelsen

Dette er det eneste kontaktpunktet mellom kjøp og påfyll. Den skal se ut som en
kvittering, ikke som en kampanje.

- Enkel én-kolonne HTML-e-post, maks 600 px bred, systemfontstakk.
- Ordmerket **som tekst** øverst, ikke bare som bilde – bilder blokkeres ofte
  som standard.
- Emnelinje som fastslår fakta rolig: «Maten i esken din går ut på dato i
  august 2028.» Aldri «SISTE SJANSE» eller lignende hastverksspråk.
- **Datoen er e-postens eneste fargede element**, i etterglød.
- **To knapper med lik visuell vekt**, begge ekte `<a href>`: «Ja, send påfyll»
  og «Nei, ikke nå». Samme størrelse, samme kontrastnivå – målt, ikke påstått.
  Aldri én stor knapp mot én liten grå tekstlenke. Det er `designvalg.md`
  § 6.1 videreført til e-post: et reelt valg, ikke et forkledd nei.
- Speil formuleringene som allerede finnes: «Du kan si nei hver gang, og
  avslutte når du vil.» For husstander med langtidsmat: «Gratis påminnelse ·
  kr 0 · Et abonnement ville ikke gitt deg noe nytt.»
- Ingen nedtelling, ingen lagerteller, ingen gjennomstreket førpris.

### 7.5 Favicon, app-ikon og Open Graph

**Favicon** (`favicon.svg`): natt-flis med merket i lys ring og etterglød.
Låst, uten `prefers-color-scheme` – se § 2.4. Verifiser i en ekte fane i både
lys og mørk nettleser før det regnes som ferdig; anta ikke at det virker.

**App-ikoner** (`apple-touch-icon.png`, `ikon-192.png`, `ikon-512.png`): samme
farger som faviconet, men levert **full-bleed og uten egen avrunding**. iOS og
Android maskerer selv, og faviconets `rx=5` skal ikke følge med inn i
PNG-ene.

**`site.webmanifest`**: `theme_color` og `background_color` skal stemme med
`<meta name="theme-color">` i `index.html`. De gjorde det ikke og er rettet til
`#0B1513`.

**Open Graph-bilde**: 1200 × 630 px, bakgrunn i natt, versalplaketten, ingen
display-serif, ingen fargesplittet overskrift. Skal en tagline utheves, gjøres
det med etterglød på **ett ord** – aldri en hel setning.

Bildet bør genereres fra et script som leser `tokens.css` direkte, etter samme
mønster som `scripts/kontrast.mjs`. Det er nøyaktig manuell hex-duplisering som
gjorde at det gamle bildet drev fra paletten.

---

## 8. Hva vi bevisst ikke gjør

- **Ingen marineblå.** Hver eneste mørke flate i markedet er der.
  `docs/farger.md` har tellingen.
- **Ingen varm krem-bakgrunn med ravgul eller terrakotta aksent.** Forkastet i
  sin helhet, og kritikken var berettiget – det var i praksis en annen
  aktørs palett.
- **Ingen taktisk estetikk.** Ingen kamuflasje, ingen MOLLE, ingen
  militærreferanser, ingen skjold-med-hake. Kunden er en småbarnsforelder som
  har utsatt dette i to år, ikke en prepper, og blir skremt vekk av alt dette.
- **Ingen frykt-salg.** Ingen nedtelling, ingen lagerteller, ingen
  gjennomstreket førpris, ingen dommedagsbilder.
- **Ingen oppdiktede fakta.** Ingen organisasjonsnummer, adresser, ansattall,
  kundeomtaler eller stjerner før de faktisk finnes – og når org.nr. legges
  inn, skal det bestå mod11-kontrollen.
- **Ingen webfont** uten at LCP-kostnaden forsvares mot terskelen i
  `tokens.css`.
- **Ingen glød, gradient eller skygge som erstatter en flateforskjell.**
  Flater skilles med farge. Merket lyser ikke; det holder et lys.
- **Ingen aksentfarge som dekor.** Se § 4.
- **Ingen sosial bevisføring** på en butikk uten salgshistorikk.

---

## 9. Hva denne runden endret, og hva som står åpent

### Endret

| Fil | Endring |
| --- | --- |
| `assets/img/merke.svg` | Nytt merke (Glødepunkt). Hardkodet `#E79A4E` fjernet; ringen er `currentColor`, kjernen aksent-tokenet med `#52601B` som fallback, og en `svg:root`-regel gir riktige farger når filen står alene |
| `favicon.svg` | Nytt merke. Forkastet `#14342B`/`#E79A4E` erstattet av `#12211D`/`#E8EFE9`/`#D9E6A0`. Flisradius strammet fra 7 til 5 |
| `index.html` | Inline-merket i topplinjen byttet til ny geometri, og symbolet fra 28 til 26 px for å treffe lås-opp-forholdet |
| `site.webmanifest` | `theme_color` og `background_color` til `#0B1513`, slik at de stemmer med `<meta name="theme-color">` |
| `assets/img/etikett.svg` | Ny fil: kasseetiketten i faktisk format |

Ingen endringer i CSS, tokens eller katalogdata. `node scripts/kontrast.mjs`
går fortsatt grønt – ingen av endringene rører `tokens.css`.

### Står åpent

1. **`assets/img/og-bilde.png` og de tre PNG-ikonene** bruker fortsatt det
   forkastede uttrykket. De er rasterfiler og er ikke tegnet på nytt her.
   Spesifikasjonen ligger i § 7.5.
2. **Gapet i `.brandmark`** – ett tokentrinn i `base.css`, se § 3.4.
3. **Sperringen i versalplaketten** er begrunnet, men ikke målt på tvers av
   plattformer. Skal sjekkes på Mac og Windows før en trykkoriginal låses.
4. **Etikettformatet 148 × 105 mm** er valgt mot Zarges-lokket (600 × 400 mm),
   men er ikke prøvetrykt og klebet på en ekte kasse – og plastkassens mål står
   ikke i katalogen, så det må måles.
5. **Serienummer** finnes ikke, og skal ikke trykkes før et ekte ordresystem
   tildeler dem.
6. **Variabeldata-utskrift ved pakking** (§ 7.3) er en forutsetning, ikke en
   bekreftet kapasitet hos fulfillment.
