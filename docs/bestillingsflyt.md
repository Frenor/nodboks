# Bestillingsflyten: byggeplan

Status: vedtatt retning, klar til bygging.
Gjelder: `index.html`, `assets/js/ui/bygger.js`, `assets/js/konfigurator.js`,
`assets/js/data/katalog.js`, `scripts/verifiser-katalog.mjs`.
Referanseprototype: `docs/design/flyt-direkte.html`, med rettelsene i § 4.

---

## 1. Hva vi bygger, i én setning

Kunden oppgir hvem som bor hjemme – voksne, barn, kjæledyr – og får med én gang
en komplett, ferdig priset og fullt begrunnet pakke tilbake. Resten av siden er
finjustering på noe som allerede er ferdig, ikke bygging fra bunnen.

Det gamle grensesnittet spurte om sju ting og satte sammen en eske til slutt.
Det nye setter sammen esken først og lar kunden være uenig i den.

---

## 2. Hvorfor «Ferdig fra første sekund» vant

Fire retninger ble tegnet og vurdert. Scoren var jevn (6,0 / 6,0 / 5,3 / 5,2),
så tallet alene avgjør ikke. Det som avgjør er hvilken **premiss** som bærer
prisen, og der er forskjellen stor.

**«Ferdig fra første sekund» (valgt).** Premisset er at butikken tar stilling.
Fire Petzl-hodelykter, Trangia-stormkjøkken og CO-varsler er allerede valgt når
kunden kommer, og kunden kan ta dem ut igjen. En kunde som skal betale rundt
tretten tusen kroner leter etter noen som kan faget sitt, ikke etter et verktøy
som lar dem gjøre jobben selv. Det er også den eneste av de fire der det tidlige
CTA-et har en ekte utbetaling: tallet kunden taster inn i heroen forandrer en
pris som står rett under fingeren, før de har rukket å scrolle.

**«Ett spor» (5,3).** En veiviser, ett spørsmål per skjerm. Lavest friksjon per
skjerm, men høyest samlet: sju skjermer før kunden har sett helheten. Og en
veiviser er fortsatt et skjema – det er bare brettet sammen. Premisset er at
kunden bygger pakken, som er nøyaktig det oppdraget ba om å komme bort fra.
Håndverket i filen er likevel det beste i settet, og vi henter mye fra den (§ 3).

**«To-lag» (6,0).** Riktig instinkt: standardvalget er godt nok, resten ligger
lukket. Men det andre laget leser som lekser som gjenstår, og prispanelet ligger
i en grid-rad som ikke dekker listeraden – den samme feilen som i vinneren, og et
tegn på at sticky-i-grid ikke er til å stole på. Vi beholder prinsippet
(§ 5.3, § 5.2.3) og forkaster to-lags-metaforen.

**«Listen» (5,2).** Innholdslisten *er* grensesnittet. Det ærligste av de fire,
og løsningen som best forsvarer en pris 63 % over billigste konkurrent. Men
tretti varelinjer som inngangsdør er det motsatte av «ferdig», og det er for mye
å be en småbarnsforelder om å lese før noe som helst har skjedd. Vi beholder
listen som andre halvdel av siden, ikke som første.

**Konklusjon.** Vi bygger «direkte»-arkitekturen, med «ett spor»-håndverket
inni komponentene, «listen»-mekanikken inne i innholdslisten, og «to-lag»-
disiplinen på justeringene.

---

## 3. Hva vi henter fra de andre

| Grep | Fra | Hvor det havner |
| --- | --- | --- |
| Husstandssteppere (voksne/barn/kjæledyr) i stedet for tre glidebrytere | ett-spor, to-lag | § 5.1 |
| Kalorimotor som skiller barn fra voksne, med utslag i pris | ett-spor, to-lag | § 6.4 |
| Signaturvarer låst med `fravalg: false` i datamodellen | ett-spor | § 6.2 |
| «Hvorfor»-setning knyttet til et tall eller en mekanisme på hver varelinje | ett-spor | § 5.2.2 |
| Ekte `<fieldset>/<legend>` for valg, `aria-pressed`-knapp for kuratering | ett-spor | § 7 |
| Native `<dialog>` + `showModal()` til full prisoversikt | ett-spor | § 5.3 |
| Én debouncet, samlet `role="status"`-melding per rolige tilstand | ett-spor, listen | § 7 |
| «Justering, ikke et hovedvalg»-merke på kassematerialet | ett-spor | § 5.2.3 |
| Fast prisbunnlinje (`position: fixed`), ikke sticky-i-grid | listen | § 5.3 |
| Kr per person per døgn rett under totalsummen | listen | § 5.3 |
| «Har dere den fra før?» som lenke *inne i varelinjen*, med overstreking og spart-beløp | listen | § 5.2.2 |
| Spøkelsesrad «+ Legg til …» for tillegg, plassert i riktig DSB-gruppe | listen | § 5.2.2 |
| Kjæledyrrader som kun vises når telleren er over null, med fotnote ellers | listen | § 6.6 |
| Lukket `<details>` der `<summary>` alltid viser gjeldende tilstand i klartekst | to-lag | § 5.2.3 |
| Påfyllets selvavlysende tekst ved langtidsmat | to-lag | § 5.2.3 |
| Fravalg vist som egen minuslinje i prisoppsettet, ikke stille fjerning | to-lag | § 5.3 |
| `prefers-reduced-motion` respektert i CSS *og* JS | to-lag | § 7 |
| Ferdig anbefalt pakke, prisen synlig i heroen fra første sekund | direkte | § 5.1 |

---

## 4. De seks feilene i vinneren, og hva vi gjør med dem

Juryen bekreftet disse ved lesing. De er rettet i planen under, og skal ikke
bygges videre på i sin nåværende form.

1. **Prisen forsvinner.** `.prispanel` er `position: sticky` inne i
   `.kontrollkolonne`, som på desktop er kortere enn innholdslisten ved siden
   av. Prisen slipper taket akkurat når kunden leser den lange, tillitsbyggende
   listen. → Erstattes av en fast bunnlinje, § 5.3.
2. **Ingenting huskes.** Bare tema lagres. En kunde som blir avbrutt midt i en
   vurdering på tretten tusen kroner, mister alt. → `localStorage`, § 5.5.
3. **To CTA-er som ikke stemmer med navnet sitt.** «Legg pakken i handlekurven»
   scroller bare, og rett under står «Gå til betaling» med samme tall. →
   Én kjøpsknapp, ett sted, § 5.4.
4. **«Juster pakken» er et skjema i miniatyr.** Matnivå og kassemateriale har
   identisk `.segmented`-styling rett under hverandre, pluss en avkrysningsboks.
   Oppdraget sa eksplisitt at disse ikke skal se like ut. → § 5.2.1 og § 5.2.3.
5. **Hero-forhåndsvisningen er `aria-hidden="true"`.** Selve ideen leverer ikke
   for skjermleserbrukere. → Fjernes, § 7.
6. **`render()` river ut noden du står i.** `innerHTML` på fire valgcontainere
   ved hver eneste tilstandsendring gjør at fokus faller til `<body>` hver gang
   du trykker mellomrom. → Ny renderingskontrakt, § 7.

---

## 5. Flyten, steg for steg

Tre seksjoner i denne DOM-rekkefølgen. Rekkefølgen er også leserekkefølgen og
tabrekkefølgen, og den fungerer uten CSS.

### 5.1 Seksjon 1 – heroen og det tidlige CTA-et

Ligger over bretten på 375 px. Innhold, i rekkefølge:

1. `<h1>` og ingress. Beholder dagens tone.
2. **Husstandskortet** – det tidlige CTA-et. Et `<fieldset>` med
   `<legend>` «Hvem bor hjemme hos dere?» som første og eneste direkte barn.
   Under legend: én hjelpesetning – «Barn spiser mindre enn voksne, og kjæledyr
   trenger eget vann. Begge deler regnes inn automatisk.»
3. Tre **steppere** i én kortstack (stablet på mobil, tre i bredden fra 34rem):

   | Felt | Etikett | Start | Grense | SVG-glyph |
   | --- | --- | --- | --- | --- |
   | `voksne` | Voksne | 2 | 1–8 | voksenfigur |
   | `barn` | Barn | 2 | 0–6 | barnefigur |
   | `kjaeledyr` | Kjæledyr | 0 | 0–4 | poteavtrykk |

   Hver stepper er: glyph, etikett, `−`-knapp, **synlig**
   `<input type="number" inputmode="numeric">`, `+`-knapp. Inputen er synlig –
   ikke et 1×1 px skjult felt bak en visningstekst, som i prototypen. Det
   fjerner hele fokusproblemet med steppere i ett grep, og gir en tastaturbruker
   et sted å skrive «4» direkte.
   Knappene er `disabled` på grensen. I tillegg gjelder et samlet tak:
   `voksne + barn ≤ 8`. Når taket er nådd, deaktiveres begge `+`-knappene og en
   setning under kortet sier hvorfor, med ekte e-postlenke: «Vi dimensjonerer
   opp til åtte i husstanden. Er dere flere, skriv til oss, så regner vi på det.»
4. **Svarsetningen.** Ett avsnitt rett under stepperne, oppdatert live:

   > Fire i husstanden og én hund: 61 400 kcal, 100 liter vann, og en eske på
   > rundt 31 kg. **kr 12 800** inkl. mva.

   Alle tallene regnes fra `byggPakke()`. Ingen av dem hardkodes i markup.
   Dette avsnittet er **ikke** `aria-hidden`. Se § 7 for annonsering.
5. **Primær CTA: «Vis pakken deres»** → `#pakke`. Flytter fokus dit.
   **Sekundær: «Se hva som ligger i den»** → `#innhold`. Flytter fokus dit.
6. DSB-lenken og ansvarsfraskrivelsen, uendret fra dagens hero.

Ved retur fra lagret tilstand (§ 5.5) står det i stedet, over stepperne:
«Vi husker at dere er to voksne og to barn. [Nullstill]» – som en ekte
`<button>`, ikke en falsk lenke.

### 5.2 Seksjon 2 – pakken

Åpner med en overskrift som forteller at jobben allerede er gjort:
«Pakken deres er klar», med `#pakke tabindex="-1"`.

Rett under overskriften: **chips** som gjentar husstanden («2 voksne · 2 barn ·
1 kjæledyr»), og et lukket `<details>` med `<summary>` «Endre husstand». Inni
ligger nøyaktig de samme tre stepperne, koblet til samme tilstand. Kunden skal
aldri måtte scrolle tilbake til heroen for å rette et tall.

Deretter, i denne DOM-rekkefølgen:

#### 5.2.1 Valget: hva slags mat?

Dette er det eneste **valget** som står igjen, og det skal se ut som et valg.
Fullt `<fieldset>` med `<legend>`, to store valgkort (`.segment` / `.option` fra
`base.css`), stablet på mobil, side ved side fra 34rem. Hvert kort:

- Tittel + **prisen for akkurat denne husstanden**, ikke en generisk fra-pris
- Kort beskrivelse
- Holdbarhetslinjal: to barer på samme skala (1 år mot 5 år), med tekst i
  tillegg til farge
- «Din jobb»-rad: «Bytte maten når vi sier fra – omtrent hvert år» mot
  «Nesten ingenting. Sjekk datoen av og til.»

Det tilgjengelige navnet på hver radio holdes til tittel + pris. Resten knyttes
med `aria-describedby`, per `designvalg.md` § 6.2.

#### 5.2.2 Innholdslisten – og all kuratering skjer her

Dette er det viktigste strukturelle grepet i planen, og den største forskjellen
fra prototypen.

Prototypen hadde tre lister: innholdslisten, en avkrysningsliste for «har fra
før», og en avkrysningsliste for tillegg. Tre lister over de samme varene.
**Vi har én.** Fravalg og tillegg skjer inne i varelinjen, på det stedet varen
faktisk hører hjemme. Det er det som gjør det til kuratering i stedet for
avkrysning: kunden plukker fra en disk, ikke fra et skjema.

Listen er åpen, aldri kollapset, gruppert etter DSBs fire overskrifter i DSBs
rekkefølge, med «Annet» og «Esken» til slutt og tydelig merket som våre egne.
Gruppering og rekkefølge kommer uendret fra `DSB_GRUPPER` og `GRUPPEREKKEFOLGE`
i `konfigurator.js`.

Hver **varelinje** har:

- Navn og spesifikasjon
- Antall og enhet (`.tnum`)
- Pris (`.tnum`)
- Én `hvorfor`-setning som knytter varen til et tall eller en mekanisme, ikke
  et adjektiv: «702 kcal per pose.» «En full 20-literskanne veier 21 kilo og kan
  ikke bæres av et barn.» «Den eneste grunnen til at vi tør selge et kokeapparat.»

Tre linjetyper i tillegg til den vanlige:

**Fravalgbar linje** (`type === 'engang'`, ikke esken, ikke tillegg, sum ≥ 100 kr).
Får en diskret `<button aria-pressed>` nederst i linjen: «Har dere den fra før?»
Trykket setter `aria-pressed="true"`, teksten blir «Tatt ut – legg tilbake?»,
og en CSS-regel på `.rad:has(button[aria-pressed="true"])` strekker over navn og
pris og viser «Dere sparer kr X» i `--ok`. Knappen blir aldri bygget på nytt, så
fokus blir stående der det var. Reversibelt i ett trykk.

**Låst linje** (`fravalg: false` i katalogen: CO-varsler, førstehjelp,
beredskapsperm, lanterne, esken). Ingen knapp. Dette er en strukturell, ikke
retorisk, grense mot at pakken spares tom for nettopp det som begrunner prisen.
Ingen advarsel, ingen forklaring på hvorfor knappen mangler – den bare finnes
ikke, og `hvorfor`-setningen bærer begrunnelsen.

**Spøkelsesrad** (tillegg som ikke er valgt). Står i sin egen DSB-gruppe, dempet,
med `+ Legg til Meshtastic-sett · kr 1 798`. Under: et `<details>` «Tre ting dere
bør vite først» med forbeholdene ordrett fra katalogen. Er den lagt til, blir
den en vanlig linje med en «Fjern»-knapp.

Over listen: teller og gruppeoversikt («31 varelinjer · for fire personer og
ett kjæledyr»). Under listen: «Kategoriene følger DSBs egen sjekkliste, så dere
kan holde listen vår mot den offisielle linje for linje.»

#### 5.2.3 Justeringene

Etter listen, ikke før. Tre lukkede `<details>` på rad, visuelt lettere enn
alt over: mindre, uten kortbakgrunn, med tynn skillelinje.

Regelen, hentet fra to-lag: **`<summary>` viser alltid gjeldende tilstand i
klartekst.** Ingen tom etikett med en pil. Ingenting må åpnes for å forstås.

| Justering | Lukket summary viser | Innhold når åpen |
| --- | --- | --- |
| Kassemateriale | «Utstyret ligger i plastkasser · kr 598» | Segmentert kontroll, plast/aluminium, med merket «Justering, ikke et hovedvalg» og prisen per kasse på hvert alternativ. Notis: «Mat og vann ligger i plast uansett.» |
| Omfang | «Komplett pakke – mat, vann og utstyr» | To alternativer: komplett / bare matpåfyll. Ved matpåfyll skjules utstyrsgruppene i listen, med en «vis likevel»-lenke i stedet for tomme kategorier. |
| Påfyll | «Vi minner dere før maten går ut · kr 0 i dag» | Avkrysning, **aldri forhåndsvalgt**. Når langtidsmat er valgt, forkorter teksten seg selv: «Gratis påminnelse · kr 0 i dag. Maten holder i fem år – et abonnement ville ikke gitt dere noe nytt.» Ellers: «Neste sending om omtrent ett år · anslagsvis kr X for maten alene · ingen bindingstid.» Aldri «kr 0 i dag» alene. |

Kassematerialet får aldri samme `.segmented`-styling som matnivået. Matnivået er
to store kort; kassematerialet er en liten segmentert kontroll inni et lukket
`<details>`. Det er hele forskjellen på et valg og en justering, og det var den
ene navngitte oppgaven vinnerprototypen ikke løste.

### 5.3 Prislinjen – alltid synlig, uten unntak

`position: fixed; left: 0; right: 0; bottom: 0`. Alltid der, på alle bredder,
fra første maling. `<body>` får `padding-bottom` lik linjens høyde, slik at
ingenting noen gang ligger under den.

Innhold, venstre mot høyre:

- Summen, stor, `.tnum` — og under den, mindre: «kr 457 per person per døgn».
  Det store tallet er begripelig først når det deles på det det faktisk dekker.
- En setning som sier posisjonen høyt, én gang, i nærheten av tallet:
  «Ikke den billigste. Den med mest i.» Ikke en påstand om kvalitet – en
  påstand om mengde, som listen rett over beviser.
- Venstre halvdel er en `<button>` som åpner en native `<dialog>` med
  `showModal()`: hele prisoppsettet, gruppert etter DSBs fire overskrifter
  (samme gruppering som listen – aldri to ulike grupperinger av samme tall),
  fravalget som én egen minuslinje **med varenavn**, mva-linjen, og summen.
- Høyre: primærknapp «Se oppsummering» → `#oppsummering`, flytter fokus.

**Merknad til `designvalg.md` § 4.5 og § 8.** Dokumentet forbyr «egen
dock/klebrig-linje styrt av scroll-posisjon eller IntersectionObserver», fordi
tre av fire skisser hadde tastaturfeller i akkurat den mekanikken. Forbudet
gjelder fortsatt og fullt ut: denne linjen har **null** scroll-lyttere, **null**
observere og ingen betinget synlighet. Den er der fra første maling til siste.
Det er nettopp fraværet av mekanikk som gjør den trygg – og sticky-i-grid, som
§ 4.5 anbefalte i stedet, er bevist utilstrekkelig i to av fire prototyper.
§ 4.5 oppdateres deretter når dette bygges.

### 5.4 Seksjon 3 – oppsummeringen

Samme regnestykke én gang til, samlet. `#oppsummering tabindex="-1"`.

- Referansesetning: «Komplett pakke · fire personer og ett kjæledyr · sju døgn ·
  vanlig butikkmat»
- Bruttosum per DSB-gruppe
- «Utstyr dere har fra før» som minuslinje, **med navnene listet**:
  «− kr 2 272 · Trangia stormkjøkken, Petzl hodelykt × 2». Kunden skal ikke
  måtte scrolle tilbake eller stole på minnet i akkurat det sekundet
  beslutningen tas.
- «Lagt til» som egen linje, med navn, av samme grunn
- «Herav mva. (15 % mat, 25 % utstyr)» som egen utregnet linje
- «Å betale», stor
- Fraktlinje: «Frakt kommer i tillegg og beregnes i kassen.» Aldri en nedtelling
  til fri frakt.
- **Den eneste kjøpsknappen på hele siden:** «Gå til betaling».

### 5.5 Hva som huskes

`localStorage`, nøkkel `nodboks:bestilling`, med `versjon: 1` i objektet.
Skrives debouncet (400 ms) ved hver tilstandsendring. Leses ved oppstart og
valideres hardt: feil versjon, ugyldig JSON, ukjente SKU-er eller tall utenfor
grensene forkastes i stillhet og gir standardtilstanden.

Lagres: `voksne`, `barn`, `kjaeledyr`, `matniva`, `modus`, `eskeType`, `utelatt`,
`tillegg`, `abonnement`. Lagres ikke: åpne/lukkede `<details>`, scrollposisjon.

All lesing og skriving i `try/catch`. I privat vindu eller med blokkerte
informasjonskapsler skal siden fungere nøyaktig som før – bare uten hukommelse.

Når lagret tilstand tas i bruk, sier heroen det (§ 5.1) og tilbyr «Nullstill».
Vi later ikke som tallene er nye.

---

## 6. Datamodellen

Dette er den delen som må være presis, fordi den rører ved katalogen.

### 6.1 Husstand og kontekst

I dag tar hver vare `antall: (p) => …`, der `p` er ett tall. Det er den eneste
grunnen til at alle behandles som voksne.

Vi innfører ett husstandsobjekt og én avledet kontekst:

```js
// Husstanden, slik kunden oppgir den.
const husstand = { voksne: 2, barn: 2, kjaeledyr: 0 }

// Konteksten, slik katalogen ser den. Avledet, aldri lagret.
function kontekst(h) {
  return {
    voksne: h.voksne,
    barn: h.barn,
    // Hoder: alle som bor der. Utstyr skalerer på denne.
    hoder: h.voksne + h.barn,
    // Voksenekvivalenter: mat skalerer på denne.
    ve: h.voksne + h.barn * KONFIG.barnFaktor,
    // Dyr: egne linjer skalerer på denne.
    dyr: h.kjaeledyr,
  }
}
```

**`barnFaktor` defineres som et forhold, ikke som et frittstående tall:**

```js
kcalVoksenDogn: 2338,
kcalBarnDogn:   1450,
get barnFaktor() { return this.kcalBarnDogn / this.kcalVoksenDogn }, // ≈ 0,620
```

Grunnen er ikke elegansen. Den er at energiberegningen og skaleringsreglene da
**ikke kan sprike**: `ve × kcalVoksenDogn × døgn` er per konstruksjon nøyaktig
det samme som `(voksne × 2338 + barn × 1450) × døgn`. Settes faktoren som et
uavhengig 0,62, kan de to drifte fra hverandre ved neste justering, og da
stemmer ikke lenger dekningsvarselet med maten som faktisk ligger i esken.
`verifiser-katalog.mjs` får en egen kontroll på nettopp denne identiteten
(§ 6.8).

Tallene 2 338 og 1 450 er våre egne, dokumentert i `pakkesammensetning.md`
§ 3. De skal aldri omtales som DSBs norm – DSB oppgir ingen kaloritall.

### 6.2 Endringer i `katalog.js`

Signaturen endres fra `antall(p)` til `antall(c)`, der `c` er konteksten over.
**Faktorene endres ikke.** De er utledet per voksen per døgn, og `ve` måles i
voksne. Diffen er derfor mekanisk, linje for linje lesbar, og hver eneste
eksisterende kommentar i katalogen forblir sann.

Regelen, som skrives inn øverst i varelisten:

> Mat skalerer på `c.ve`. Utstyr skalerer på `c.hoder`. Faste ting returnerer 1.
> Kjæledyrlinjer skalerer på `c.dyr`. Er du i tvil: teller varen porsjoner, er
> det `ve`; teller den hoder, hender eller senger, er det `hoder`.

| SKU | I dag | Etter | Felt |
| --- | --- | --- | --- |
| `knekkebrod` | `Math.ceil(p * 1.25)` | `Math.ceil(c.ve * 1.25)` | ve |
| `leverpostei` | `Math.ceil(p * 1.8)` | `Math.ceil(c.ve * 1.8)` | ve |
| `kaviar` | `Math.ceil(p * 0.7)` | `Math.ceil(c.ve * 0.7)` | ve |
| `makrell-tomat` | `Math.ceil(p * 0.9)` | `Math.ceil(c.ve * 0.9)` | ve |
| `nugatti` | `Math.ceil(p * 0.4)` | `Math.ceil(c.ve * 0.4)` | ve |
| `sjokolade` | `Math.ceil(p * 0.9)` | `Math.ceil(c.ve * 0.9)` | ve |
| `mariekjeks` | `Math.ceil(p * 0.6)` | `Math.ceil(c.ve * 0.6)` | ve |
| `peanotter` | `Math.ceil(p * 0.5)` | `Math.ceil(c.ve * 0.5)` | ve |
| `rosiner` | `Math.ceil(p * 0.35)` | `Math.ceil(c.ve * 0.35)` | ve |
| `oboy` | `Math.ceil(p * 0.25)` | `Math.ceil(c.ve * 0.25)` | ve |
| `fruktcocktail` | `Math.ceil(p / 4)` | `Math.ceil(c.ve / 4)` | ve |
| `havregryn` | `Math.ceil(p * 0.4)` | `Math.ceil(c.ve * 0.4)` | ve |
| `middagshermetikk` | `Math.ceil(p * 3.75)` | `Math.ceil(c.ve * 3.75)` | ve |
| `real-middag` | `p * KONFIG.dogn` | `Math.ceil(c.ve) * KONFIG.dogn` | ve |
| `real-frokost` | `p * 3` | `Math.ceil(c.ve) * 3` | ve |
| `vannkanne-10` | `p * 2` | `c.hoder * 2 + Math.ceil(c.dyr * 14 / 10)` | hoder + dyr, se § 6.5 |
| `aquatabs` | `Math.ceil(p / 4)` | `Math.ceil(c.hoder / 4)` | hoder |
| `vannfilter` | `Math.ceil(p / 6)` | `Math.ceil(c.hoder / 6)` | hoder |
| `kokeapparat` | `Math.ceil(p / 4)` | `Math.ceil(c.hoder / 4)` | hoder |
| `co-varsler` | `p <= 4 ? 1 : 2` | `c.hoder <= 4 ? 1 : 2` | hoder |
| `hodelykt` | `Math.max(p, 2)` | `Math.max(c.hoder, 2)` | hoder |
| `campinglykt` | `Math.ceil(p / 5)` | `Math.ceil(c.hoder / 5)` | hoder |
| `batterier-aaa` | `Math.ceil(p / 6)` | `Math.ceil(c.hoder / 6)` | hoder |
| `nodteppe` | `p` | `c.hoder` | hoder |
| `powerbank` | `Math.ceil(p / 5)` | `Math.ceil(c.hoder / 5)` | hoder |
| `pmr-radio` | `Math.max(1, Math.ceil(p / 4))` | `Math.max(1, Math.ceil(c.hoder / 4))` | hoder |
| `forstehjelp` | `Math.ceil(p / 6)` | `Math.ceil(c.hoder / 6)` | hoder |
| `blodstopper` | `Math.max(2, Math.ceil(p / 2))` | `Math.max(2, Math.ceil(c.hoder / 2))` | hoder |
| `hygienepakke` | `Math.ceil(p / 5)` | `Math.ceil(c.hoder / 5)` | hoder |
| `bottetoalett` | `Math.ceil(p / 4)` | `Math.ceil(c.hoder / 4)` | hoder |
| `multiverktoy` | `Math.ceil(p / 8)` | `Math.ceil(c.hoder / 8)` | hoder |
| `fyrstikker`, `telys`, `nodradio`, `meshtastic`, `beredskapsperm` | `() => 1` | `() => 1` | – |

Tre grensetilfeller som skal begrunnes i kommentar der de står, fordi de ikke
er opplagte:

- **`nodteppe` og `hygienepakke` teller hoder, ikke voksenekvivalenter.** Et
  barn trenger et helt nødteppe. Et halvt teppe varmer ingen.
- **`co-varsler` teller hoder.** Varsleren dekker rom, og rom skalerer med hvor
  mange som er der, ikke med hvor mye de spiser.
- **`real-middag` og `real-frokost` runder `ve` opp før multiplikasjon.** Man
  kan ikke sende 0,62 av en frysetørket porsjon, og et barn som får 62 % av en
  pose får i praksis en pose.

I tillegg innføres to nye, valgfrie felt på varen:

- `kunKjaeledyr: true` – varen gjelder bare når `c.dyr > 0` (§ 6.6)
- `mva: 'standard' | 'mat'` – overstyrer satsen som ellers utledes av kategorien
  (§ 6.6). Uten feltet er oppførselen nøyaktig som i dag.

### 6.3 Endringer i `konfigurator.js`

```js
byggPakke({ husstand: { voksne, barn, kjaeledyr }, matniva, modus, eskeType,
            abonnement, utelatt, tillegg })
```

- `klem()` splittes i `klemHusstand(h)`, som klemmer hvert felt til sin grense
  (`voksne` 1–8, `barn` 0–6, `kjaeledyr` 0–4) og deretter klemmer `voksne + barn`
  ned til `KONFIG.personerMaks`. Ved overskridelse trekkes det fra `barn` først,
  fordi det er `voksne` som er det obligatoriske feltet.
- `gjelder(vare, kontekst)` får ett nytt tilfelle først:
  `if (vare.kunKjaeledyr) return kontekst.dyr > 0`.
- Løkken kaller `vare.antall(kontekst)` i stedet for `vare.antall(personer)`.
- `mvaSats(vare)` tar nå varen, ikke kategorien:
  `vare.mva === 'standard' ? MVA.standard : (vare.kategori === 'Mat' ? MVA.mat : MVA.standard)`.
- `velgEske()` – se § 6.7.
- Returobjektet får `husstand` ved siden av dagens `valg.personer`, som beholdes
  som `voksne + barn` for bakoverkompatibilitet (§ 6.8).
- `referanse()` sier husstanden i klartekst: «fire personer og ett kjæledyr»,
  aldri bare «4 personer», når det er barn eller dyr i bildet.
- `pakkeId()` får med alle tre tallene. To pakker med samme hodetall men ulik
  sammensetning er ikke samme vare og skal ikke slås sammen i kurven.

### 6.4 Energiberegningen

```js
const kcalBehov = ctx.ve * KONFIG.kcalVoksenDogn * KONFIG.dogn
```

`KONFIG.kcalPerPersonPerDogn = 2200` utgår. Den flate satsen var en bevisst
forenkling *fordi flyten bare spurte om antall personer* – den begrunnelsen
forsvinner i det vi spør om sammensetningen. `pakkesammensetning.md` § 3
oppdateres tilsvarende: avsnittet som forklarer og forsvarer 2 200 skal erstattes
av en beskrivelse av den nye modellen, ikke stå igjen og motsi koden.

`dognUtenVarme` regnes mot samme grunnlag:
`Math.floor(kaldKcal / (ctx.ve * KONFIG.kcalVoksenDogn))`.

Utslaget er reelt og skal vises. En husstand med to voksne og to barn får nå
`ve = 3,24` i stedet for `4`, altså rundt 19 % mindre mat. Det er hele poenget:
en familie med to små skal ikke betale for mat de ikke trenger. Effekten sies
høyt i svarsetningen i heroen, i `hvorfor`-teksten på matlinjene, og i
hjelpeteksten under stepperne.

### 6.5 Vannmengden

**Vann skalerer på `hoder`, ikke på `ve`.** Dette er en bevisst asymmetri mot
maten, og den skal stå begrunnet i koden:

> DSBs 20 liter er ikke bare drikke. Den dekker matlaging og et minimum av
> hygiene, og husstanden koker og vasker for alle fra de samme kannene. Å
> underdimensjonere vannet for å spare 60 kroner tom plast er en dårlig
> byttehandel.

```js
const vannBehov = ctx.hoder * KONFIG.vannLiterPerPerson + ctx.dyr * KONFIG.vannLiterPerDyr
```

`KONFIG.vannLiterPerDyr = 14` (2 liter per døgn i sju døgn), med tallet og
antakelsen synlig i `hvorfor`-teksten på linjen. Kanneantallet blir
`hoder * 2 + Math.ceil(dyr * 14 / 10)`, altså én ekstra kanne per dyr.

### 6.6 Kjæledyr

Her avviker planen fra oppdragets ordlyd, og grunnen skal stå åpent.

`pakkesammensetning.md` § 8 har allerede vurdert og forkastet fôr til kjæledyr,
med en begrunnelse som fortsatt holder: vi kan ikke dimensjonere en fôrmengde
uten å vite dyreart, størrelse og fôrtype, og å gjette den er nøyaktig den
oppførselen vi kritiserer resten av markedet for. Alle tre prototypene som
håndterte kjæledyr, la inn en «Tørrfôr 3 kg · plassholder»-linje. Det er en
gjetning med prislapp på.

**Vi selger derfor ikke fôret. Vi selger plassen til det, vannet, og beskjeden.**
Kjæledyrtelleren legger tre konkrete ting i esken:

| Ny SKU | Navn | Kategori | Antall | Mva |
| --- | --- | --- | --- | --- |
| `dyrevann` | Vanndunk 10 liter til dyra | Vann | `Math.ceil(c.dyr * 14 / 10)` | standard |
| `dyreboks` | Tett fôrboks, 5 liter, med datoetikett | Mat | `c.dyr` | standard |
| *(ingen egen SKU)* | Fôr-siden i beredskapspermen | – | – | – |

Alle tre får `kunKjaeledyr: true` og vises bare når telleren er over null. Er
den null, står det én fotnote nederst i «Mat og vann»-gruppen: «Har dere
kjæledyr? Legg dem til i husstanden øverst, så følger vann og fôrboks med.»

`hvorfor`-teksten på `dyreboks` bærer innrømmelsen, i husets tone:

> Vi legger ikke fôr i esken. Vi vet ikke om dere har en chihuahua eller en
> grand danois, og en gjettet fôrmengde er verdiløs. Boksen er tett, merket og
> tom, og beredskapspermen har en side der dere skriver opp hva dere fylte i den
> og når. Fôret kjøper dere der dere alltid kjøper det.

Merk mva-satsen: fôrboksen er utstyr, og **fôr til dyr er 25 %, ikke 15 %** –
redusert sats gjelder næringsmidler til mennesker. Det er grunnen til at
`mva: 'standard'`-feltet innføres i § 6.2, selv om varen ligger i «Mat og
vann»-gruppen. Satsen bør bekreftes av regnskapsfører før lansering (§ 9).

### 6.7 Esken

`velgEske(kontekst, eskeType)` i stedet for `velgEske(personer, eskeType)`.
Sammenligningen mot `maksPersoner` skjer mot et **volumtall**, ikke mot hodetall:

```js
const eskeTall = ctx.hoder + Math.ceil(ctx.dyr / 2)
```

Vannkanner og fôrboks tar plass, og to dyr regnes som ett hode volummessig.
`maksPersoner` på eskene beholder navnet sitt, men får en kommentar om at
feltet nå sammenlignes mot `eskeTall`.

Volumbesparelsen fra barns mindre matmengde tas **ikke** ut i en mindre eske.
Å krympe kassen fordi barna spiser mindre gir en eske uten slingringsmonn, og
kunden skal kunne legge sine egne ting oppi. Det står som kommentar i koden, så
ingen «retter» det senere.

### 6.8 Bakoverkompatibilitet, kurv og verifisering

- `byggPakke({ personer: 4 })` uten `husstand` tolkes som
  `{ voksne: 4, barn: 0, kjaeledyr: 0 }`. Det holder eksisterende kall i
  `scripts/` og eventuelle produktsider i live mens de skrives om.
- `kurv.js` og `checkout/*` trenger ingen endring i seg selv, men
  `tilKurvpost()` skal sende `konfigurasjon.husstand` videre, og `referanse()`
  skal si sammensetningen i ordrelinjen. En ordre skal kunne leses uten å slå
  opp noe.
- `scripts/verifiser-katalog.mjs` må oppdateres. Nye og endrede kontroller:
  - Feilmeldingen `antall må være en funksjon av personer` → `…av konteksten`.
  - Kjør hele rutenettet: `voksne` 1–8 × `barn` 0–6 × `kjaeledyr` 0–4 ×
    2 matnivåer × 2 moduser, med taket `voksne + barn ≤ 8`. Hver kombinasjon
    skal gi endelige, ikke-negative antall og en sum over null.
  - **Ny identitetskontroll:** for hver husstand skal
    `ve * kcalVoksenDogn * dogn` være lik `voksne * 2338 * dogn + barn * 1450 * dogn`
    innenfor 0,5 kcal. Denne bevokter § 6.1 mot fremtidig drift.
  - **Ny monotonikontroll:** ett barn ekstra skal aldri gjøre pakken billigere,
    og aldri dyrere enn én voksen ekstra.
  - **Ny kjæledyrkontroll:** `kjaeledyr = 0` skal gi nøyaktig samme linjer som
    før endringen, slik at telleren er additiv og ikke rører den eksisterende
    pakken.
  - `klem`-testene erstattes av `klemHusstand`-tester, inkludert taket.

---

## 7. Tilgjengelighet

**Renderingskontrakten.** Dette er den viktigste tekniske regelen i hele planen,
og den som retter den alvorligste feilen i prototypen.

> Struktur bygges én gang, ved oppstart. `render()` endrer bare tekstnoder,
> `checked`, `aria-pressed`, `hidden`, `disabled` og `data-`-attributter.
> `render()` skriver aldri `innerHTML` på en container som kan inneholde det
> fokuserte elementet.

Konkret: alle varelinjer for alle SKU-er bygges ved oppstart, og skjules med
`hidden` når de ikke gjelder. Katalogen har rundt førti varer – det er en
billig pris for å eliminere hele feilklassen. Ingen fokus-gjenoppretting, ingen
`aktivtValgSelector`-hack: fokus flyttes aldri, fordi noden aldri byttes ut.

**Semantikk.**

- Ekte valg («velg ett av disse») → `<fieldset>` med `<legend>` som **første og
  eneste direkte barn**, og native `<input type="radio">` bak det visuelle.
  Piltastnavigasjon i radiogruppen kommer gratis.
- Kuratering («skru av/på denne») → `<button aria-pressed>`. Forskjellen på et
  valg og en av/på-bryter blir hørbar, ikke bare synlig.
- Steppere: synlig `<input type="number">` mellom to `<button>`-er med
  `aria-label` («Én voksen færre», «Én voksen til»). Hele gruppen i et
  `<fieldset>`.
- Ingen `<div>` med klikkhåndterer noe sted i flyten.
- Ingen `aria-hidden="true"` på et element som inneholder fokuserbare barn – og
  ingen `aria-hidden` på hero-forhåndsvisningen, som i prototypen.

**Annonsering.** Nøyaktig **én** `role="status" aria-live="polite"`-region på
hele siden, skjult, debouncet 700 ms. Den skriver hele tilstanden som én
setning når kunden har stoppet opp: «Komplett pakke, fire personer og ett
kjæledyr, sju døgn, vanlig butikkmat. kr 12 800.» Ikke ett varsel per
tastetrykk, og ikke konkurrerende regioner i hero og prislinje.

Regionen ligger i DOM-en **rett etter husstandskortet i heroen**, ikke nede ved
prislinjen. Det kobler «det jeg nettopp gjorde» til «der det annonseres», som
var den andre halvdelen av prototypens skjermleserproblem.

**Fokusstyring.**

- Alle ankermål (`#pakke`, `#innhold`, `#oppsummering`) har `tabindex="-1"` og
  får fokus når lenken til dem aktiveres. Ingen unntak – prototypen hadde det
  på det ene målet og ikke på det andre.
- `<summary>` «Endre husstand» flytter fokus inn i første stepper-input når den
  åpnes, ikke bare scroller.
- `<dialog showModal()>` gir fokusfelle, Escape og fokusretur gratis. Ingen
  hjemmesnekret modal.
- Fravalgsknappen beholder fokus etter trykk, fordi den ikke bygges på nytt.

**Bevegelse.** `prefers-reduced-motion: reduce` respekteres to steder: den
globale CSS-regelen i `base.css`, **og** en eksplisitt
`matchMedia('(prefers-reduced-motion: reduce)').matches`-sjekk før hver
programmatiske `scrollIntoView` og før enhver JS-drevet animasjon av prissummen.
CSS-regelen alene dekker ikke JS.

**Uten JavaScript.** Innholdslisten skal være åpen og etterprøvbar – det er hele
tillitsargumentet – og kan derfor ikke være avhengig av at JS kjører. Løsningen
uten byggsteg: et lite skript, `scripts/bygg-innholdsliste.mjs`, genererer
standardhusstandens fullstendige liste som statisk markup inn i `index.html`,
og kjøres manuelt ved endringer i katalogen. JS overtar og oppdaterer den ved
last. Feiler JS, står listen der likevel, med en `<noscript>`-linje som sier at
prisen ikke kan regnes om og hvordan kunden bestiller i stedet.

**Mål og marger.** Alle trykkflater minst 44 × 44 px. 16 px sidemarg under
26rem. Ingen horisontal scroll på 375 px. Prislinjen tar ikke mer enn 96 px
høyde på mobil.

**Kontrast.** Prislinjen er en mørk merkeflate i **begge** temaer – natten som
gjennomgående identitet, ikke bare enda et hvitt kort. Den introduserer dermed
nye flate/tekst-kombinasjoner. `node scripts/kontrast.mjs` kjøres når den
landes, og ingen ny hex-verdi legges inn utenfor `tokens.css`.

---

## 8. Hva vi bevisst ikke gjør

- **Ingen veiviser, ingen stegteller, ingen fremdriftsindikator.** Prisen er
  fremdriftsindikatoren. En stegteller sier «du er ikke ferdig», og hele
  premisset er at kunden er ferdig fra første sekund.
- **Ingen separate avkrysningslister for fravalg og tillegg.** Begge deler skjer
  inne i varelinjen, på varens egen plass i listen.
- **Ingen tredje glidebryter.** Kjæledyr er en teller som starter på null, og
  radene finnes ikke før den er over null.
- **Ingen gjettet fôrmengde.** Se § 6.6.
- **Ingen forhåndsavkrysset abonnement.** Aldri, uansett matnivå.
- **Ingen scroll- eller observerstyrt dock.** Prislinjen er ubetinget fast. Se
  § 5.3.
- **Ingen pris skjult til slutt**, ingen nedtelling, ingen lagerteller, ingen
  gjennomstreket førpris, ingen kundeomtaler, ingen stjerner, ingen «X ser på
  denne nå».
- **Ingen oppdiktede fakta.** Ingen org.nr., ingen adresse, ingen navngitte
  ansatte før de finnes.
- **Ingenting som ser ut som en lenke uten å være det.**
- **Ingen ny farge utenfor `tokens.css`.**
- **Ingen mediaspørring som fjerner en innrømmelse på mobil.** Er plassen trang,
  korter vi setningen.

---

## 9. Åpne spørsmål til oppdragsgiver

1. **2 338 / 1 450 erstatter 2 200.** Tallene er våre egne og dokumentert, men
   `pakkesammensetning.md` § 3 forsvarer i dag eksplisitt den flate satsen. Den
   teksten må skrives om samtidig, ellers motsier dokumentasjonen koden. Skal
   det gjøres i samme runde?
2. **Kjæledyr uten fôr.** § 6.6 avviker fra oppdragets ordlyd («kjæledyr trenger
   mat og vann – hva legger vi til?») ved å levere vann, boks og et skjema i
   stedet for fôr. Vi mener det er det eneste svaret som er i tråd med vår egen
   begrunnelse for hva vi ikke selger. Aksepteres avviket?
3. **Mva på fôrboks og dyrevann.** Vi legger dem som 25 %. Bekreftes av
   regnskapsfører før lansering.
4. **Vann skalerer på hoder, ikke på voksenekvivalenter** (§ 6.5). Det betyr at
   en familie med to små får full vannmengde, men redusert matmengde. Bevisst,
   men verdt en runde.
5. **Barnegrense.** Vi spør ikke om alder. En femtenåring spiser som en voksen.
   Skal hjelpeteksten si «barn under tolv», og hva gjør kunden med en
   sekstenåring? Forslaget er én setning: «Regn ungdom fra rundt tolv år som
   voksne – de spiser som oss.»
6. **Prislinjens posisjonering.** «Ikke den billigste. Den med mest i.» (§ 5.3)
   er den eneste stedet flyten sier posisjonen høyt. Er formuleringen riktig, og
   er det riktig sted?
7. **Amendering av `designvalg.md` § 4.5 og § 8** om den faste prislinjen (§ 5.3).
   Godkjennes endringen?

---

## 10. Byggerekkefølge

Fire etapper. Hver etappe skal kunne landes og verifiseres for seg.

1. **Datamodellen først, uten grensesnitt.**
   `katalog.js` (kontekstsignatur, `barnFaktor`, `kunKjaeledyr`, `mva`, tre nye
   SKU-er), `konfigurator.js` (`klemHusstand`, `kontekst`, `gjelder`,
   `mvaSats`, `velgEske`, `pakkeId`, `referanse`),
   `scripts/verifiser-katalog.mjs` med de fire nye kontrollene. Kjøres til grønt
   før noe HTML røres. `kjaeledyr = 0` skal gi identiske linjer som i dag.
2. **Prislinjen og renderingskontrakten.**
   Fast bunnlinje, `<dialog>` med prisoppsettet, `localStorage`, og omskriving
   av `bygger.js` til «bygg én gang, oppdater attributter». Dette er den største
   enkeltjobben og den som fjerner flest feil.
3. **Heroen og husstandswidgeten.**
   Stepperne, svarsetningen, `role="status"`-regionen, de to CTA-ene med
   fokusflytting, og `<details>`-gjentakelsen i pakkeseksjonen.
4. **Listen og justeringene.**
   Fravalg og tillegg flyttet inn i varelinjen, spøkelsesrader, de tre lukkede
   `<details>`-justeringene, oppsummeringsseksjonen med navngitt fravalg, og
   `scripts/bygg-innholdsliste.mjs` for tilstanden uten JS.

Etter siste etappe: `node scripts/kontrast.mjs`, gjennomgang på 375 px i begge
temaer, og en full tastaturgjennomgang fram og tilbake gjennom hele flyten uten
å røre musen.
