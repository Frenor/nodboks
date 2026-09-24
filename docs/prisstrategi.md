# Prisstrategi

**Skrevet 20. september 2026, avstemt mot katalogen på nytt 24. september 2026,
på grunnlag av `docs/konkurrentanalyse.md`, `docs/innkjopsliste.md` og den
katalogen som faktisk kjører i `assets/js/data/katalog.js` /
`assets/js/konfigurator.js`.**

Siden forrige versjon av dette dokumentet har katalogen endret seg på sju
punkter som gjør de gamle tallene her foreldede:

1. **Premiumdreiningen.** Ni varegrupper er byttet til kvalitetsprodukter:
   Petzl Actik Core hodelykt, Sangean MMR-88 DAB-radio, Trangia 25-5 HA,
   Katadyn BeFree vannfilter, Leatherman Rev, Lifesystems førstehjelp,
   Cederroth blodstopper, Ledlenser ML4 lanterne, Anker PowerCore 20 000.
2. **Prisregelen er lagt om** fra 85 % av butikkpris (et «du sparer»-argument
   som ga netto 0,68R og 12 % dekningsgrad når innkjøp lå på 0,6R) til hele
   butikkpris (netto 0,80R, 21–23 % dekningsgrad).
3. **Kassen er et kundevalg** mellom plast (SmartStore Dry 45) og aluminium
   (Zarges Eurobox til utstyret; mat og vann ligger i plast uansett).
4. **Utstyrstersklene er spredt** (`ceil(p/4)`, `ceil(p/5)`, `ceil(p/6)`,
   `ceil(p/8)`) i stedet for at alt hoppet samtidig ved femte person.
5. **Husstanden er delt i voksne, barn og kjæledyr.** Maten skalerer nå på
   voksenekvivalenter i stedet for hoder, og matfaktorene ble justert opp 8 %
   i samme slengen. Alle prispunkter i dette dokumentet er regnet for voksne
   uten barn eller dyr, slik at stigen kan leses som før.
6. **Bøttetoalettet (399 kr) er kommet inn** i utstyret, med terskelen
   `ceil(p/4)`.
7. **Langtidsmaten er rebalansert bort fra REAL Turmat.** REAL-frokosten er
   fjernet helt, REAL-middagen er nede fra sju døgn til fire, og havregrøt og
   middagshermetikk – som til nå bare fantes i tørrmatpakken – dekker resten.
   REAL kostet 0,18 kr per kalori mot havregrynenes 0,007, og bar derfor det
   meste av matkostnaden uten å bære tilsvarende mye av energien.

**Alle prispunkter under er hentet fra en kjøring av `byggPakke()` mot dagens
katalog, 24.09.2026 – `scripts/tall.mjs` for pris, energidekning, kalde døgn
og varelinjer, og de samme kallene med `innkjop.local.json` påkoblet for
innkjøpskost og dekningsgrad – ikke beregnet på nytt av meg.** Der jeg utleder
noe fra de tallene (marginalpris mellom to husstandsstørrelser, blandet
mva-sats, følsomhet på innkjøpsfaktoren), står utledningen i klartekst i
avsnittet, slik at den kan etterprøves linje for linje. Der et tall er et
anslag, står det at det er et anslag.

**Tre ting denne runden fant løst, og som derfor ikke lenger diskuteres som
åpne problemer:** kategorinøkkel-feilen i `ui/bygger.js` som lot all mat telle
som utstyr i mva-oppdelingen er rettet (mva-satsen ligger nå ett sted, i
`konfigurator.js`, og prispanelet leser derfra via `MATGRUPPER` — verifisert
direkte i koden); utstyrsterskler som tidligere hoppet samtidig ved femte
person er spredt; og rødsprit er fjernet fra sortimentet – kokeapparatet
selges nå kun med gassbrenner, og brennstoff følger uansett aldri med esken.

---

## Kort oppsummering

- Med dagens katalog koster en komplett tørrmatboks til fire personer
  **13 124 kr** i plastkasse. Det er **72 % over** markedets desidert
  dyreste tilbud, beredskap24 (7 650 kr, frysetørket). Det er ikke lenger et
  spørsmål om hvor i feltet vi ligger – vi ligger langt utenfor feltet, på
  hver eneste husstandsstørrelse og på begge matnivåer. Se punkt 1 for et
  ærlig regnskap over om det er forsvarlig.
- Dekningsgraden ligger på **21–23 % på komplett-pakken og 30–31 % på
  matpåfyll**, praktisk talt likt uansett husstandsstørrelse (1–8 personer).
  Det er en konsekvens av at prisregelen nå er én flat regel – pris = full
  butikkpris, innkjøp = 0,6 × butikkpris – ikke lenger en bevisst
  margintrapp som stiger med husstandsstørrelsen. Se punkt 2–4.
- Kunden velger kasse: plast eller aluminium. Forskjellen er **eksakt
  3 478 kr, på hver eneste husstandsstørrelse og begge matnivåer** – et
  rendyrket, valgfritt oppsalg kunden tar selv, ikke noe som endrer
  kjerneproduktet. Se eget avsnitt i punkt 3.
- Enpersonspakken (9 753 kr) er strukturelt den vanskeligste å forsvare:
  beregnet direkte fra katalogens egne skaleringsregler utgjør utstyr som
  ikke blir billigere av å kjøpe for én person i stedet for fire, rundt
  77 % av prisen. Se eget avsnitt i punkt 1.
- Treffer innkjøpsanslaget for høyt (0,6 i dag), er dekningsgraden fortsatt
  positiv ned mot verre anslag, men går innkjøpet ned mot 0,5–0,45 stiger
  dekningsgraden til 35–42 %. Se følsomhetsanalysen i punkt 3, koblet til
  `docs/innkjopsliste.md`.
- Abonnement er fortsatt den riktige forretningsmodellen, men gevinsten er
  mindre enn de eldste versjonene av dette dokumentet hevdet – fordi den
  gamle refill-marginen var bevisst bygget opp som en buffer mot rabatten, og
  den bufferen finnes ikke lenger under «alt til butikkpris»-regelen. På
  langtidsmat er gevinsten dessuten blitt mindre av rebalanseringen, siden
  det er påfyllet som ble billigere. Se punkt 5.
- Frakt er kjøpers, og vi bruker ikke gjennomstrekede førpriser. Begge deler
  står ved lag. Se punkt 7–8.

---

## Metode: hvordan tallene er regnet

`byggPakke({ husstand, matniva, modus, eskeType })` i `konfigurator.js`
bygger den faktiske varelinjen for en gitt konfigurasjon – med kassevalg som
fjerde parameter, og med husstanden delt i voksne, barn og kjæledyr – beregner
mva per linje (mat til 15 %, alt annet, inkludert tomme vannkanner og esken,
til 25 %) og gir `sum` (inkl. mva), `netto` (eks. mva) og `mva`. Alle tall
under er regnet for voksne alene. Innkjøpskost er summert per linje fra
`innkjop.local.json` – filen kostnadene ble flyttet til da de gikk ut av det
offentlige repoet – med samme `gjelder()`-logikk som konfiguratoren selv
bruker for modus, matnivå og eskeType.

**Dekningsgrad i dette dokumentet er alltid:**

```
dekningsgrad = (netto − innkjøpskost) / netto
```

— begge ledd eks. mva, slik `docs/innkjopsliste.md` også insisterer på.

**Innkjøpstallene er nå én ensartet faktor, ikke lenger delt mellom mat og
utstyr.** `INNKJOPSFAKTOR = 0.6` i `katalog.js` gjelder for hele katalogen –
sjekket linje for linje mot varelinjene i punkt 2, ligger både mat (knekkebrød
0,598×) og de nye premiumproduktene (Petzl-hodelykt, Trangia, Katadyn,
Leatherman, alle nøyaktig 0,600×) på samme faktor. Det eneste unntaket er
beredskapspermen (49 kr), som er vår egen trykksak og ikke er utledet av
faktoren i det hele tatt – se punkt 2. Det er en forenkling fra forrige
versjon av dette dokumentet, som antok en delt sats (0,60 for mat, 0,65–0,72
for utstyr). Den antakelsen stemmer ikke lenger mot katalogen, og er derfor
fjernet, ikke bare oppdatert.

---

## 1. Posisjonsvalget og hva det faktisk koster oss

### Vi er ikke lenger «midt i feltet» – vi er utenfor det

Forrige versjon av dette dokumentet fant at Nødboks lå midt mellom norberedt
og krisesikker, og diskuterte om en foreslått økning til 253 kr per person
per døgn var forsvarlig mot beredskap24s 273. Det spørsmålet er forbigått av
hendelsene. Med dagens katalog:

| Butikk | kr/person/døgn | Matnivå |
| --- | ---: | --- |
| hjemmeberedt.no | 166 | vanlig butikkmat |
| sikkerheten-selv.no | 179 | uoppgitt |
| norberedt.no | 214 | uoppgitt |
| krisesikker.no | 225 | nødrasjon |
| beredskap1.no | 250 | nødrasjon |
| beredskap24.org | 273 | frysetørket |
| **Nødboks, komplett tørrmat, plast (4 pers.)** | **469** | vanlig butikkmat |
| **Nødboks, komplett tørrmat, aluminium (4 pers.)** | **593** | vanlig butikkmat |

(469 kr/person/døgn og 593 kr/person/døgn er lest direkte fra kjøringen,
`komplett / torrmat / plast` og `.../alu`, 4 personer.)

Det er ikke en marginal forskyvning. **469 kr er 71,8 % mer enn beredskap24s
273 kr** (469 / 273 = 1,718) – markedets desidert dyreste tilbud, en
frysetørket premiumpakke vi tidligere brukte som eneste referanse for hvor
høyt vi kunne gå. Vi krysser ikke lenger toppen av markedet; vi legger oss
et sted markedet ikke dekker i det hele tatt. Og det gjelder selv på
tørrmat, den matkategorien som skulle vært vår billigste posisjon – ikke
bare på langtidsmat, der en sammenligning med frysetørket i det minste er
rimelig.

### Er det forsvarlig? Et ærlig svar, ikke et pyntet et

Tre argumenter taler for at avstanden er reell verdi, ikke bare pris:

1. **Utstyret er reelt omtrent doblet**, ikke bare byttet til dyrere merker.
   Fire personer får fire Petzl-hodelykter (2 296 kr av katalogens egen
   pris), ikke den ene hodelykten beredskap24 gir en firepersonskunde
   (konkurrentanalysens egen funn: beredskap24s 4-personerskasse har samme
   utstyr som deres 2-personerskasse – én primus, én hodelykt, én radio).
   Vi legger til et Katadyn-vannfilter (799 kr) og en CO-varsler (349 kr)
   ingen av de tolv kartlagte konkurrentene har i det hele tatt, og vi
   leverer DSBs fulle 20 liter vann per person (80 liter til fire personer)
   der beredskap24 selv oppgir 15 liter per person – 25 % mindre enn DSBs
   råd (konkurrentanalysens egen tabell), som isolert sett betyr at våre
   80 liter til fire personer er 33 % mer enn de antatte 60 literne
   beredskap24 leverer til samme husstand. **Dette er et anslag på
   innholdsforholdet, ikke en eksakt kalkyle** – jeg har ikke
   SKU-for-SKU-sammenlignet hele beredskap24-sortimentet – men retningen er
   entydig og dokumentert på
   hvert enkeltpunkt: mer vann, mer lys, et vannfilter og en CO-varsler som
   ikke finnes hos konkurrenten i det hele tatt.
2. **Utstyret er ikke lenger død kapital.** Et Trangia-kjøkken og en
   Petzl-hodelykt er ting en friluftsfamilie bruker hele året, ikke bare
   utstyr som ligger urørt i en bod. Det er den funksjonelle begrunnelsen
   bak premiumdreiningen (se `katalog.js`), og den holder uavhengig av pris.
3. **Prisregelen selv er mer ærlig** enn den gamle: vi later ikke lenger som
   vi underbyr butikkpris mens vi kjøper billig inn. Kunden betaler det
   varene faktisk koster i butikk, pluss det å få riktig utvalg, riktige
   mengder og noen som holder styr på datoene.

Men to ting taler mot å kalle avstanden automatisk forsvarlig, og de skal
sies like høyt:

1. **Vi har null datapunkter i nærheten av vår egen pris.** Den gamle
   versjonen av dette dokumentet kunne i det minste vise til beredskap24 som
   et ekte markedspunkt nær vår foreslåtte pris. Det finnes ikke lenger noe
   slikt ankerpunkt. 469 kr per person per døgn er ikke «nær toppen av
   markedet» – det er 72 % over toppen, uten en eneste observert konkurrent
   som har validert at noen betaler noe i nærheten av det for en boks uten
   frysetørket mat. Det er en påstand om at doblet innhold rettferdiggjør
   mer enn doblet pris, og den påstanden er ikke testet mot en eneste
   kjøpsbeslutning ennå.
2. **«Vanlig butikkmat» var vår billigste posisjon – og etter rebalanseringen
   av langtidsmaten er den knapt billigere enn vår egen frysetørkede.** For
   fire personer koster langtidsmat nå 14 422 kr mot tørrmatens 13 124 – en
   forskjell på 1 298 kr, eller 9,9 %, mot 16 447 kr og 25 % før REAL-andelen
   ble skåret ned. At vi likevel koster mer per person per døgn enn en
   frysetørket premiumpakke (469 kr på tørrmat, 515 kr på langtidsmat, mot
   beredskap24s 273) er et reelt spenn å forklare til en kunde som
   sammenligner. Men
   rebalanseringen flytter hvor forklaringen må ligge: avstanden til markedet
   er nå nesten utelukkende utstyr, ikke mat. Maten utgjør 18 % av
   innkjøpskosten på tørrmat og 26 % på langtidsmat; resten er utstyr, vann
   og eske. Argumentet må bæres av utstyret og tjenesten – og det er et
   tyngre argument å holde oppe enn «vi er billigere per kalori».

**Min vurdering:** avstanden er forsvarlig som posisjon – premiumutstyret og
den ærlige prisregelen er reelle valg, ikke pyntetriks – men den er ikke
automatisk forsvarlig som *pris*, og jeg vil ikke late som den er testet.
**Anbefaling:** lansér med denne prisen, men sett en eksplisitt
tripwire: hvis konverteringen på komplett-pakken (særlig 3–5 personer, der
vi ikke har en eneste nærliggende konkurrent å lene oss på) er lav de første
ukene, er første sted å teste en lavere dekningsgrad *ikke* premiumutstyret
i seg selv (det er den funksjonelle begrunnelsen som holder produktet
oppe), men marginen over butikkpris på selve utstyrslinjene. Det er en
reversibel prisknapp; premiumsortimentet er ikke det.

### Enpersonspakken – det strukturelt vanskeligste punktet i hele stigen

9 753 kr for én person (1 393 kr per person per døgn – nesten tre ganger
4-personsraten på 469) er ikke bare «dyrt». Det er strukturelt vanskelig, og
grunnen er tallfestbar: de fleste av premiumproduktene er priset for én
husstand, ikke én person, og skaleringsregelen deres i `katalog.js` gir
**nøyaktig samme antall ved én person som ved fire**:

| Vare | Regel | Antall ved 1 og ved 4 personer | Retailverdi (inkl. mva) |
| --- | --- | ---: | ---: |
| Trangia Stormkjøkken 25-5 HA | `ceil(p/4)` | 1 | 1 698 kr |
| Sangean DAB-radio | fast | 1 | 1 190 kr |
| Katadyn BeFree vannfilter | `ceil(p/6)` | 1 | 799 kr |
| Leatherman Rev multiverktøy | `ceil(p/8)` | 1 | 799 kr |
| Lifesystems førstehjelp | `ceil(p/6)` | 1 | 749 kr |
| Anker PowerCore | `ceil(p/5)` | 1 | 659 kr |
| Ledlenser ML4 lanterne | `ceil(p/5)` | 1 | 474 kr |
| Bøttetoalett | `ceil(p/4)` | 1 | 399 kr |
| CO-varsler | `p ≤ 4 ? 1 : 2` | 1 | 349 kr |
| Beredskapspermen | fast | 1 | 199 kr |
| Cederroth blodstopper | `max(2, ceil(p/2))` | 2 | 198 kr |
| Aquatabs | `ceil(p/4)` | 1 | 149 kr |
| Hygienepakke | `ceil(p/5)` | 1 | 149 kr |
| AAA-batterier | `ceil(p/6)` | 1 | 80 kr |
| Telys | fast | 1 | 60 kr |
| Fyrstikker | fast | 1 | 13 kr |
| **Sum, fast uansett 1–4 personer** | | | **7 964 kr** |

(Utledet direkte fra `vare.antall()`-reglene i `katalog.js` og enhetsprisene i
varelinjene for 4-personerspakken – samme enhetspris gjelder uansett antall,
så tallet over er ikke et anslag. Petzl-hodelykten sto i denne tabellen i
forrige versjon og er tatt ut: `max(p, 2)` gir to ved én person og fire ved
fire, så den er ikke fast.)

`sumVarer` før pakkerabatt for 1-personerspakken er 9 753 / 0,94 ≈ 10 376 kr.
**Rundt 77 % av det beløpet er altså utstyr en firepersonershusstand betaler
nøyaktig det samme for.** Det er ikke en svikt i regnestykket – det er
fysikken i et stormkjøkken og en radio: de blir ikke billigere av at færre
skal bruke dem. Det som gjør 1-personspakken billigere enn 4-personspakken
i det hele tatt, er maten (som skalerer ned kraftig) og eskevalget (Nødboks
Liten, 299 kr, mot Nødboks Mellom, 598 kr) – ikke utstyret.

**Hva vi gjør med det, og om det er nok:**

1. **Avhukingen av utstyr man har fra før blir mer verdt, ikke mindre, av
   premiumdreiningen.** `FRAVALG_TERSKEL` (100 kr) filtrerte tidligere ut
   billig Biltema-utstyr (en hodelykt til 59–70 kr kom aldri over grensa).
   Nå ligger nesten hele fastkost-tabellen over over 100 kr og kan krysses
   av. En kunde som allerede eier et Trangia-kjøkken, en Petzl-hodelykt og
   et multiverktøy – nøyaktig den profilen premiumsortimentet er valgt for
   å treffe – fjerner 3 645 kr bare på de tre (Trangia 1 698, to Petzl-lykter
   1 148, multiverktøy 799). Alt som kan krysses av i enpersonspakken summerer
   seg til 7 834 kr fordelt på elleve linjer. Det er den mekanismen som
   faktisk løser problemet for den kunden det gjelder mest: en friluftsperson
   som skal utstyre seg selv.
2. **Matpåfyll (964 kr for én person, tørrmat) er det billige inngangsproduktet.** Det er billigere enn både Røde Kors' (1 999 kr) og
   beredskapslager.nos (1 799 kr) komplette 1-personspakker, og det krever
   ingen investering i utstyr i det hele tatt.
3. **Er det nok? Ikke alene.** Avhukingen løser problemet bare for kunder som
   allerede eier friluftsutstyr, og matpåfyllet løser det bare ved å hoppe
   over utstyrsspørsmålet helt – det er en vei rundt problemet, ikke en
   løsning på det. En 1- eller 2-personshusstand som *ikke* har utstyr fra
   før, og som vil ha den komplette boksen, sitter fortsatt med en pris der
   nesten åtte av ti kroner er utstyr dimensjonert for en husstand, ikke en
   person. Det er ikke noe dette dokumentet kan prise seg ut av – utstyret
   koster det samme uansett prisregel. **Det er et produktspørsmål, ikke et
   prisspørsmål:** en lettere, billigere «1–2 personer»-utstyrsprofil (for
   eksempel uten multiverktøy og med ett vannfilter delt over en lengre
   ceil-terskel) ville redusert fastkostblokken reelt. Det er utenfor dette
   dokumentets mandat å endre `katalog.js`, men det hører hjemme på
   produktteamets bord, ikke bare i avhukingsfunksjonen.

---

## 2. Kostnadsgrunnlaget

### Én faktor, ett unntak

`INNKJOPSFAKTOR = 0.6` gjelder hele katalogen. Kontrollert mot varelinjene
for komplett tørrmat, 4 personer, plast (de detaljerte linjene under):

| Vare (utvalg) | Enhetspris | Innkjøp/enhet | Faktor |
| --- | ---: | ---: | ---: |
| Wasa Husman knekkebrød | 30 kr | 17,95 kr | 0,598 |
| Petzl Actik Core hodelykt | 574 kr | 344,40 kr | 0,600 |
| Trangia 25-5 HA | 1 698 kr | 1 018,80 kr | 0,600 |
| Katadyn BeFree vannfilter | 799 kr | 479,40 kr | 0,600 |
| Sangean MMR-88 DAB-radio | 1 190 kr | 714,00 kr | 0,600 |
| CO-varsler (anslag, ikke sourcet) | 349 kr | 209,00 kr | 0,599 |
| **Beredskapspermen** | **199 kr** | **49,00 kr** | **0,246** |

Beredskapspermen er fortsatt det eneste ekte kostnadstallet i sortimentet –
en egen trykksak, ikke utledet fra faktoren. Det betyr at den *ikke* beveger
seg når innkjøpsfaktoren endres i følsomhetsanalysen i punkt 3; alt annet
gjør det.

### Firepersonspakken, komplett tørrmat, plast – hele varelinjen

| Vare | Antall | Enhetspris | Sum | Innkjøp/enhet |
| --- | ---: | ---: | ---: | ---: |
| Nødboks Mellom – to kasser | 1 | 598 | 598 | 358,80 |
| Wasa Husman knekkebrød, 520 g | 6 | 30 | 180 | 17,95 |
| Stabburet Leverpostei Original, 200 g | 8 | 25 | 200 | 14,95 |
| Mills Kaviar, 185 g | 4 | 37 | 148 | 22,30 |
| Stabburet Makrell i tomat, 170 g | 4 | 35 | 140 | 20,95 |
| Nugatti Original, 350 g | 2 | 28 | 56 | 16,75 |
| Freia Melkesjokolade, 200 g | 4 | 30 | 120 | 17,95 |
| Sætre Mariekjeks, 350 g | 3 | 32 | 96 | 19,15 |
| Peanøtter, 500 g | 3 | 40 | 120 | 24,20 |
| Rosiner, 500 g | 2 | 55 | 110 | 33,30 |
| O'boy sjokoladedrikk, 450 g | 2 | 55 | 110 | 32,95 |
| Fruktcocktail i sukkerlake, 820 g | 1 | 31 | 31 | 18,70 |
| Axa Bjørn Lettkokte Havregryn, 1,1 kg | 2 | 27 | 54 | 16,15 |
| Trondhjems middagshermetikk, fire sorter | 17 | 67 | 1 139 | 40,40 |
| Vanndunk 10 liter, gjennomsiktig | 8 | 60 | 480 | 35,95 |
| Aquatabs vannrensetabletter, 50 stk | 1 | 149 | 149 | 89,40 |
| Katadyn BeFree 1 liter vannfilter | 1 | 799 | 799 | 479,40 |
| Trangia Stormkjøkken 25-5 HA m/gassbrenner | 1 | 1 698 | 1 698 | 1 018,80 |
| CO-varsler med display, batteridrevet | 1 | 349 | 349 | 209,00 |
| Fyrstikker, 10 esker | 1 | 13 | 13 | 7,75 |
| Petzl Actik Core hodelykt, 450 lumen | 4 | 574 | 2 296 | 344,40 |
| Ledlenser ML4 Warm Light lanterne | 1 | 474 | 474 | 284,40 |
| AAA-batterier, alkaliske, 40-pakning | 1 | 80 | 80 | 47,95 |
| Telys av stearin, 50-pakning | 1 | 60 | 60 | 35,95 |
| Nødteppe, 140 × 220 cm | 4 | 30 | 120 | 17,95 |
| Sangean MMR-88 DAB nødradio | 1 | 1 190 | 1 190 | 714,00 |
| Anker PowerCore 20 000 mAh | 1 | 659 | 659 | 395,40 |
| Lifesystems Waterproof førstehjelpssett | 1 | 749 | 749 | 449,40 |
| Cederroth 4-in-1 blodstopper | 2 | 99 | 198 | 59,25 |
| Hygienepakke | 1 | 149 | 149 | 89,40 |
| Bøttetoalett 22 liter med sete og lokk | 1 | 399 | 399 | 239,40 |
| Leatherman Rev multiverktøy | 1 | 799 | 799 | 479,40 |
| Beredskapspermen | 1 | 199 | 199 | 49,00 |

Sum varer før pakkerabatt: 13 962 kr. Etter 6 % pakkerabatt (`modus.rabatt`
for komplett-modus): **13 124 kr** – som er nøyaktig kjøringens tall. Netto
eks. mva: 10 663 kr. Innkjøpskost: 8 309 kr. Dekningsgrad: **22,1 %.**

Denne tabellen er selve grunnlaget for både momsoppdelingen i punkt 6 og
følsomhetsanalysen i punkt 3 – begge er utledet fra den, ikke fra separate
anslag.

### Hva langtidsmat bytter ut

Langtidspakken er nøyaktig den samme på alle utstyrs- og vannlinjer. Bare tre
matlinjer skiller de to nivåene, og det er der hele prisforskjellen ligger
(4 personer, plast):

| Vare | Tørrmat | Langtidsmat | Enhetspris | Innkjøp/enhet |
| --- | ---: | ---: | ---: | ---: |
| Axa Bjørn Lettkokte Havregryn, 1,1 kg | 2 (54 kr) | 4 (108 kr) | 27 | 16,15 |
| Trondhjems middagshermetikk, fire sorter | 17 (1 139 kr) | 6 (402 kr) | 67 | 40,40 |
| REAL Field Meal, 700 kcal | 0 | 16 (2 064 kr) | 129 | 77,40 |

Matlinjene går dermed fra 2 504 kr til 3 885 kr, og sum varer fra 13 962 kr
til 15 343 kr. Rollefordelingen er ny: REAL dekker fire av sju middager, ikke
alle måltidene, havregrøt er frokosten alle sju døgnene, og hermetikken tar de
tre middagene REAL ikke tar.

Det er den endringen som gjør de gamle langtidstallene i dette dokumentet
foreldede, og den er verdt å tallfeste. Før rebalanseringen bar REAL 78 % av
matkronene i firepersonspakken (72–80 % over hele stigen) mot 34 % av
kaloriene; nå bærer den 53 % av kronene mot 14 % av kaloriene. Komplett
langtidsmat i plast falt fra 16 447 til 14 422 kr for fire personer, fra
10 524 til 10 050 for én og fra 30 336 til 26 286 for åtte. Samtidig steg
energidekningen (111 → 122 % ved fire personer, 104–142 % → 116–156 % over
hele stigen), og antall døgn maten rekker uten brennstoff gikk fra fire–fem
til seks–sju for alle husstander på to og oppover, fordi havregryn og
hermetikk kan spises kalde og REAL ikke kan. Kunden får altså mer mat og mer
robust mat for færre kroner; det er marginen i prosent som holder seg, ikke
kronebeløpet. Tørrmatnivået er bit for bit uendret.

---

## 3. Prispunkter

Alle tabellene under er transkribert direkte fra kjøringen av `byggPakke()`.
Ingen av dem er beregnet på nytt. Dekningsgraden står med én desimal, fordi
den ellers hopper mellom 22 og 23 % på ren avrunding og ser ut som en trapp
den ikke er.

### Komplett pakke, tørrmat – plast

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | kr/person/døgn |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 9 753 | 7 856 | 6 155 | 21,6 % | 1 393 |
| 2 | 10 385 | 8 395 | 6 559 | 21,9 % | 742 |
| 3 | 11 901 | 9 647 | 7 528 | 22,0 % | 567 |
| 4 | 13 124 | 10 663 | 8 309 | 22,1 % | 469 |
| 5 | 16 836 | 13 667 | 10 678 | 21,9 % | 481 |
| 6 | 19 544 | 15 871 | 12 407 | 21,8 % | 465 |
| 7 | 22 352 | 18 153 | 14 200 | 21,8 % | 456 |
| 8 | 23 627 | 19 214 | 15 014 | 21,9 % | 422 |

### Komplett pakke, tørrmat – aluminium

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | kr/person/døgn |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 13 231 | 10 638 | 8 375 | 21,3 % | 1 890 |
| 2 | 13 863 | 11 178 | 8 779 | 21,5 % | 990 |
| 3 | 15 379 | 12 429 | 9 748 | 21,6 % | 732 |
| 4 | 16 602 | 13 445 | 10 529 | 21,7 % | 593 |
| 5 | 20 314 | 16 450 | 12 898 | 21,6 % | 580 |
| 6 | 23 022 | 18 654 | 14 627 | 21,6 % | 548 |
| 7 | 25 830 | 20 935 | 16 420 | 21,6 % | 527 |
| 8 | 27 105 | 21 997 | 17 234 | 21,7 % | 484 |

### Komplett pakke, langtidsmat – plast

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | kr/person/døgn |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 10 050 | 8 114 | 6 344 | 21,8 % | 1 436 |
| 2 | 11 003 | 8 933 | 6 952 | 22,2 % | 786 |
| 3 | 12 878 | 10 496 | 8 149 | 22,4 % | 613 |
| 4 | 14 422 | 11 792 | 9 135 | 22,5 % | 515 |
| 5 | 18 494 | 15 109 | 11 733 | 22,3 % | 528 |
| 6 | 21 522 | 17 591 | 13 667 | 22,3 % | 512 |
| 7 | 24 690 | 20 186 | 15 688 | 22,3 % | 504 |
| 8 | 26 286 | 21 526 | 16 708 | 22,4 % | 469 |

### Komplett pakke, langtidsmat – aluminium

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | kr/person/døgn |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 13 528 | 10 896 | 8 564 | 21,4 % | 1 933 |
| 2 | 14 481 | 11 715 | 9 172 | 21,7 % | 1 034 |
| 3 | 16 356 | 13 279 | 10 369 | 21,9 % | 779 |
| 4 | 17 900 | 14 574 | 11 355 | 22,1 % | 639 |
| 5 | 21 972 | 17 891 | 13 953 | 22,0 % | 628 |
| 6 | 25 000 | 20 374 | 15 887 | 22,0 % | 595 |
| 7 | 28 168 | 22 968 | 17 908 | 22,0 % | 575 |
| 8 | 29 764 | 24 309 | 18 927 | 22,1 % | 532 |

### Matpåfyll, tørrmat

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | kr/person/døgn |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 964 | 828 | 580 | 30,0 % | 138 |
| 2 | 1 486 | 1 282 | 894 | 30,3 % | 106 |
| 3 | 2 076 | 1 795 | 1 248 | 30,5 % | 99 |
| 4 | 2 653 | 2 297 | 1 595 | 30,5 % | 95 |
| 5 | 3 333 | 2 878 | 2 004 | 30,4 % | 95 |
| 6 | 3 908 | 3 378 | 2 350 | 30,4 % | 93 |
| 7 | 4 445 | 3 844 | 2 673 | 30,5 % | 91 |
| 8 | 5 077 | 4 394 | 3 053 | 30,5 % | 91 |

### Matpåfyll, langtidsmat

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | kr/person/døgn |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 1 279 | 1 102 | 768 | 30,3 % | 183 |
| 2 | 2 143 | 1 853 | 1 287 | 30,6 % | 153 |
| 3 | 3 115 | 2 698 | 1 870 | 30,7 % | 148 |
| 4 | 4 034 | 3 497 | 2 422 | 30,8 % | 144 |
| 5 | 5 096 | 4 411 | 3 059 | 30,7 % | 146 |
| 6 | 6 013 | 5 208 | 3 610 | 30,7 % | 143 |
| 7 | 6 932 | 6 007 | 4 161 | 30,7 % | 141 |
| 8 | 7 906 | 6 854 | 4 746 | 30,8 % | 141 |

Matpåfyll har ingen kasse i det hele tatt (mat sendes i kartong, ikke
Nødboks-kassene), så kassevalget gjelder bare komplett-pakken.

**Det er langtidspåfyllet rebalanseringen treffer hardest.** For fire personer
falt det fra 6 188 til 4 034 kr – 35 % bort – mens den komplette
langtidspakken falt 12 %, fra 16 447 til 14 422 kr. Det er som forventet:
påfyllet er ren mat, og det var i maten REAL utgjorde nesten fire femdeler av
kostnaden. Dekningsgraden er upåvirket (den følger av 0,6-faktoren, ikke av
utvalget), men kronebeløpet en langtidskunde legger igjen hvert femte år er
nå vesentlig mindre. Se punkt 5.

### Kassevalget som prisinstrument

Aluminiumskassen er ikke en annen pakke – den er nøyaktig samme utstyr og
mat, i en Zarges Eurobox i stedet for SmartStore-plastkasser til utstyret
(mat og vann ligger i plast uansett kassevalg). Forskjellen i sluttpris er
påfallende presis:

| | Plast | Aluminium | Differanse |
| --- | ---: | ---: | ---: |
| Eskepris (retail, inkl. mva) | 299–897 kr (1–8 pers.) | 3 999–4 597 kr | **eksakt 3 700 kr, ved hver husstandsstørrelse** |
| Effekt på sluttpris (etter 6 % pakkerabatt) | – | – | **eksakt 3 478 kr, ved hver husstandsstørrelse og begge matnivåer** |

(Verifisert linje for linje mot begge tabellene over: differansen mellom
plast- og aluminiumsraden er 3 478 kr på alle 16 kombinasjoner av
1–8 personer × tørrmat/langtidsmat. Den er konstant fordi Zarges-kassen
alltid erstatter plastkassen(e) til utstyret med en fast prisdifferanse på
3 700 kr per eskesett, og pakkerabatten på 6 % skalerer den ned til
3 700 × 0,94 = 3 478 kr uansett husstandsstørrelse.)

Det gjør aluminium til et rendyrket, forutsigbart oppsalg: kunden betaler
nøyaktig 3 478 kr mer for en kasse som tåler å stå ute, på et biltak eller i
en båt, og som er noe man faktisk bruker – ikke for mer eller annet innhold.
Det er også et oppsalg med tynnere prosentvis margin enn resten av
sortimentet (samme 0,6-faktor på en dyrere kasse gir lavere dekningsgrad i
prosent, selv om kronebeløpet er høyt – se DG-kolonnen, som ligger 0,2–0,5
prosentpoeng lavere for aluminium på hver husstandsstørrelse). Det er ikke et
problem: det er en kunde som bevisst kjøper et bruksobjekt, ikke beredskap, og betaler
for det – nøyaktig den samme logikken som resten av premiumsortimentet, bare
enda tydeligere fordi kunden selv trykker på knappen.

### Følsomhet: hva som skjer hvis innkjøpsanslaget bommer

Alle tallene over hviler på `INNKJOPSFAKTOR = 0,6`. Ingen leverandør har gitt
oss en reell B2B-pris ennå (samme konklusjon som `docs/innkjopsliste.md`
trekker), så dette er fortsatt en arbeidshypotese. Under er dekningsgraden
regnet om for lavere faktorer, ved å skalere alt annet enn beredskapspermen
(fast realkost, 49 kr, se punkt 2) proporsjonalt og holde netto fast –
utledet fra firepersonspakkens egne tall i punkt 2 og 3, ikke fra en ny
modellkjøring:

**Komplett tørrmat, 4 personer, plast** (netto fast på 10 663 kr):

| Innkjøpsfaktor | Innkjøpskost | Dekningsgrad |
| --- | ---: | ---: |
| 0,60 (dagens anslag) | 8 309 kr | 22,1 % |
| 0,55 | 7 621 kr | 28,5 % |
| 0,50 | 6 932 kr | 35,0 % |
| 0,45 | 6 244 kr | 41,4 % |

**Komplett langtidsmat, 4 personer, plast** (netto fast på 11 792 kr):

| Innkjøpsfaktor | Innkjøpskost | Dekningsgrad |
| --- | ---: | ---: |
| 0,60 (dagens anslag) | 9 135 kr | 22,5 % |
| 0,55 | 8 378 kr | 29,0 % |
| 0,50 | 7 621 kr | 35,4 % |
| 0,45 | 6 864 kr | 41,8 % |

**Matpåfyll, tørrmat, 4 personer** (netto fast på 2 297 kr, ingen fast
realkost å holde utenfor – hele linjen er mat og aquatabs, ikke egne
trykksaker):

| Innkjøpsfaktor | Innkjøpskost | Dekningsgrad |
| --- | ---: | ---: |
| 0,60 (dagens anslag) | 1 595 kr | 30,5 % |
| 0,55 | 1 462 kr | 36,3 % |
| 0,50 | 1 329 kr | 42,1 % |
| 0,45 | 1 197 kr | 47,9 % |

Selv i et scenario der innkjøpsanslaget er for optimistisk (0,60 blir 0,70,
altså verre enn i dag), holder komplett-pakken seg klart over den 12 %
dekningsgraden konfiguratorens egen kildekommentar bruker som eksempel på
«ikke en forretning»: ved 0,70 blir dekningsgraden på komplett tørrmat,
4 personer, (10 663 − (8 259,9 × 0,70/0,6 + 49)) / 10 663 ≈ **9,2 %** – tynt,
men ikke i nærheten av den katastrofen `docs/innkjopsliste.md` sin egen,
foreldede tabell viser (3 % ved 0,70, regnet på de gamle, lavere prisene).
**`docs/innkjopsliste.md` sin egen følsomhetstabell er ikke oppdatert etter
premiumdreiningen og prisendringen, og bør erstattes med tabellen over** – den
er utenfor mandatet til dette dokumentet å rette, men den er nevnt her fordi
den ellers gir et misvisende bilde av hvor sårbar dekningsgraden faktisk er i
dag.

---

## 4. Prisstigen

### Det finnes ikke lenger en bevisst margintrapp

Forrige versjon av dette dokumentet bygget en eksplisitt måltabell for
dekningsgrad per husstandsstørrelse – 20 % ved 1 person, stigende til 35 %
ved 8, fordi vi «står mest alene i markedet» ved store husstander. Den
trappen finnes ikke lenger. Under «alt til butikkpris»-regelen er
dekningsgraden en ren konsekvens av at pris = 1 × butikkpris og innkjøp =
0,6 × butikkpris for nesten hver eneste linje – og siden det forholdet er
likt for alle husstandsstørrelser, blir dekningsgraden det også: **21,6 % ved
1 person og 21,9 % ved 8 på tørrmat, og 21,8–22,5 % over hele stigen på
langtidsmat**, se tabellene i punkt 3. Det er en forenkling, ikke en feil –
men det betyr at vi ikke
lenger bevisst henter mer margin der konkurransen er svakest (6–8 personer,
der ingen konkurrent i det hele tatt dekker husstanden). Det er verdt å
merke seg som en åpen strategisk avveining, ikke noe jeg endrer her: pengene
ligger fortsatt igjen på bordet ved 7–8 personer, bare av en annen grunn enn
før (ingen bevisst trapp, i stedet for en for lav trappetrinn).

### Marginalprisen – det kunden faktisk sammenligner

Oppdraget spør konkret: Norberedt tar en flat 1 000 kr per ekstra person,
Røde Kors tar 750 kr flatt. Hva tar vi? Fortsatt ikke et flatt beløp, av
samme grunn som før: en radio og et boksåpnerpar følger husstanden, ikke
personen. Men utstyrstersklene er nå spredt over flere husstandsstørrelser
(`ceil(p/4)`, `ceil(p/5)`, `ceil(p/6)`, `ceil(p/8)`) i stedet for at alt
hoppet samtidig ved femte person – beregnet direkte fra tabellen i punkt 3,
komplett tørrmat, plast:

| Fra → til | Marginalpris | Hva som driver den |
| --- | ---: | --- |
| 1 → 2 | 632 kr | Kun mat, vann og nødtepper – samme eske (Nødboks Liten) tar begge. |
| 2 → 3 | 1 516 kr | Eskebytte (Nødboks Liten → Mellom ved 3), pluss hodelykt og nødteppe per hode. |
| 3 → 4 | 1 223 kr | Fortsatt innenfor samme utstyrssett. |
| **4 → 5** | **3 712 kr** | **Kokeapparat, CO-varsler, aquatabs og bøttetoalett krysser alle `ceil(p/4)`-terskelen samtidig** – dette er den ene terskelen som ikke ble spredt, fordi de fire varene fortsatt deler samme divisor. |
| 5 → 6 | 2 708 kr | Campinglykt (Ledlenser), powerbank og hygienepakke krysser `ceil(p/5)`. Eske til Nødboks Stor. |
| 6 → 7 | 2 808 kr | Vannfilter (Katadyn), batterier og førstehjelp krysser `ceil(p/6)`. |
| 7 → 8 | 1 275 kr | Ingen nye terskler krysses (multiverktøyets `ceil(p/8)` krysser først ved 9). |

Snittet over de sju trinnene er **1 982 kr** – fortsatt høyere enn
Norberedts flate 1 000 kr, og fortsatt trappet, ikke flatt. Men i motsetning
til før er ikke lenger ett eneste trinn (4 → 5) desidert størst: 5 → 6 og
6 → 7 er nå nesten like store (2 708 og 2 808 kr), fordi kokeapparat,
CO-varsler, aquatabs og bøttetoalett er de eneste varene som fortsatt deler
`ceil(p/4)`-terskelen, mens campinglykt/powerbank/hygienepakke (`ceil(p/5)`)
og vannfilter/batterier/førstehjelp (`ceil(p/6)`) nå hopper hver for seg ved
6 og 7. Det er spredningen oppdraget ba om, synlig direkte i tallene – ikke
bare i koden.

### Hvor grensen går

Ved 8 personer er prisen 23 627 / 8 = **2 953 kr per person**, mot 9 753 kr
ved 1 person – en nedgang på **69,7 %**. Innkjøpskosten per person faller
nesten identisk: fra 6 155 kr (1 person) til 15 014 / 8 = 1 877 kr (8
personer), en nedgang på **69,5 %**. De to prosentene ligger praktisk talt
oppå hverandre – det er selve konsekvensen av at dekningsgraden er flat
(punkt 3) i stedet for stigende: vi gir i dag videre nesten hele
stordriftsfordelen til kunden, i stedet for å beholde en økende andel av den
slik den forrige margintrappen var bygget for å gjøre. Det er en bevisst
avveining verdt å ha et øye på: enklere å forklare og forsvare (samme
prisregel for alle), men det er ikke lenger en mekanisme som henter mer
margin akkurat der vi står uten konkurranse.

---

## 5. Abonnementet

Fortsatt forretningsmodellen, ikke en tilleggstjeneste – tolv av tolv
konkurrenter mangler den. Men tallene under er lavere enn de eldste
versjonene av dette dokumentet hevdet, og grunnen er verdt å forklare før
tallene selv:
**den forrige refill-marginen (30–38 %) var en bevisst konstruert buffer mot
abonnementsrabatten**, satt høyere enn komplett-pakkens dekningsgrad med
vilje. Under «alt til butikkpris»-regelen er ikke det lenger en bevisst
policy – matpåfyllets 30–31 % dekningsgrad er nå en konsekvens av
vareutvalget (nesten bare mat, lav mva-sats, se punkt 6), ikke et mål vi har
satt for å tåle rabatten. Bufferen er dermed tynnere enn før den gang den var
et bevisst designvalg.

### To nivåer, og ett som ble tatt bort

Katalogen har nå to `PAFYLL`-nivåer: gratis varsel (0 % rabatt, hver 365. dag)
og årlig påfyll (10 %, hver 365. dag). Rollene er uendret – gratis varsel er
tillitspunktet, årlig er hovedproduktet. Det halvårlige nivået (15 %, hver
182. dag) er fjernet fra katalogen: det sendte hele matpakken på nytt hver
sjette måned til mat med ett års holdbarhet, og det er å selge folk mat de
ikke trenger. Det legitime halvårsbehovet – meieri og annet med kort dato –
hører hjemme som en egen liten ferskmodul, ikke som en dobbel forsendelse av
alt. Se `docs/sortiment.md`.

### Regnestykket: hva rabatten faktisk koster oss i dag

For en firepersoners tørrmat-påfyll (2 653 kr, 30,5 % dekningsgrad før
rabatt, netto 2 297 kr, innkjøp 1 595 kr – alle fra kjøringen):

| Abonnement | Rabatt | Kundepris | Vår netto etter rabatt | Innkjøp | Dekningsgrad etter rabatt |
| --- | ---: | ---: | ---: | ---: | ---: |
| Ingen (engangskjøp) | 0 % | 2 653 kr | 2 297 kr | 1 595 kr | 30,5 % |
| Årlig påfyll | 10 % | 2 388 kr | 2 067 kr | 1 595 kr | 22,8 % |

(Rabatten trekkes fra etter at mva er beregnet på full pris, akkurat som
før – den går fra vår netto margin, ikke fra avgiften.)

**Bekymringen forrige versjon reiste er løst, men ikke av prisarbeid:** årlig
påfyll holder seg godt over 20 % (22,8 %), og det halvårlige nivået, som falt
til 15,9 % etter rabatt – under den 20 %-grensa som tidligere var selve
begrunnelsen for å prise matpåfyllet med en ekstra buffer – finnes ikke lenger.
Det ble fjernet fordi det solgte folk mat de ikke trengte; at marginproblemet
forsvant i samme slengen er en bivirkning, ikke begrunnelsen. Kommer et
halvårsprodukt tilbake som en egen ferskmodul, må marginen på den regnes for
seg: den arver ikke matpåfyllets tall.

### Livstidsverdi – fortsatt argumentet for abonnement, men et mindre tall

Regnet på en firepersoners tørrmatkunde: boksprofitt ved kjøp (netto minus
innkjøp på komplett-pakken) er **10 663 − 8 309 = 2 354 kr**. Refillprofitt
per syklus, årlig nivå: **2 067 − 1 595 = 472 kr**.

| Kundetype | Profitt ved kjøp | Kumulativ profitt, etter 5 år | Kumulativ profitt, etter 10 år |
| --- | ---: | ---: | ---: |
| Engangskunde (kjøper boksen, kommer aldri tilbake) | 2 354 kr | 2 354 kr | 2 354 kr |
| Årlig abonnent (boks + årlig påfyll, 5/10 sykluser) | 2 354 kr | 4 714 kr | 7 074 kr |
| Annethvert år (boks + påfyll hvert annet år, 2/5 sykluser, se under) | 2 354 kr | 3 528 kr | 5 288 kr |

En årlig abonnent er verdt **3,0 ganger** en engangskunde etter ti år
(7 074 / 2 354) – ikke 4,6 ganger, som den eldste versjonen av dette
dokumentet hevdet, og litt bedre enn de 2,7 gangene forrige avstemming fant.
Forskjellen er ikke en regnefeil noe sted; den følger av at matpåfyllet har
vokst mer enn boksen etter at matmengdene ble justert opp, mens
refillmarginen fortsatt ikke er kunstig oppblåst som en rabattbuffer.
Konklusjonen står: abonnenten er verdt tre ganger så mye, og differansen
vokser hvert år etter det, siden engangskunden flater ut for alltid mens
abonnenten legger til 472 kr netto per år.

**«Annethvert år»-nivået finnes fortsatt ikke i `PAFYLL`** – tallet over
(5 % rabatt i stedet for 10 %, refill hvert annet år) er fortsatt et forslag,
ikke et produkt, av samme grunn som før: en sjeldnere kunde er en mindre
forpliktet kunde. **Anbefaling uendret:** legg til et tredje `PAFYLL`-nivå.
Selv ved halv frekvens og halv rabatt er kunden 2,2 ganger mer verdt enn en
engangskunde over ti år.

### Langtidsmat: fortsatt bare det gratis varselet, av samme grunn

Langtidsmat er merket med fem års holdbarhet mot tørrmatens ett år, og et
abonnement som fornyer seg årlig ville betydd å kaste REAL-poser som ikke er
i nærheten av å gå ut. Regnet med dagens tall: boksprofitt på komplett
langtidsmat, 4 personer, plast, er **11 792 − 9 135 = 2 657 kr**. Refillprofitt uten rabatt (siden vi
ikke selger et betalt abonnement på langtidsmat) er **3 497 − 2 422 =
1 075 kr** per femårssyklus.

Over 20 år (fire fornyelser ved 5, 10, 15 og 20 år): **2 657 + 4 × 1 075 =
6 957 kr**, mot engangskundens flate 2 657 kr – **2,6 ganger**. Til
sammenligning, en tørrmat-abonnent over samme 20-årsperiode (20 årlige
sykluser): **2 354 + 20 × 472 = 11 794 kr**, mot engangskundens 2 354 kr –
**5,0 ganger**. Tørrmat-abonnementet er tydelig sterkere som
*abonnement* enn langtidsmats femårssyklus (5,0× mot 2,6× over samme
periode) – og gapet har vokst med rebalanseringen, fordi det er
langtidspåfyllet som ble billigere: refillprofitten per femårssyklus falt fra
1 659 til 1 075 kr. Konklusjonen står, og står sterkere enn før:
**abonnement er tørrmatens forretning. Langtidsmat er et enkeltkjøp med en
ærlig påminnelse fem år fram i tid.** Det er verdt å merke seg som en
bivirkning av en matfaglig riktig endring: billigere mat til kunden er
mindre livstidsverdi til oss, og det er en byttehandel vi har gjort med
åpne øyne.

**Men premisset for «bare gratis varsel» er svekket, og det skal sies rett
ut.** De fem årene gjelder REAL-posene, ikke pakken: `byggPakke()` rapporterer
`holdbarhetAr: 1` på begge matnivåer, fordi knekkebrød, pålegg, gryn og
sjokolade ruller i sin egen takt uansett hvilket nivå kunden velger. Før
rebalanseringen var det en fotnote – 21,7 % av matkronene på langtidsnivået
hadde under fem års holdbarhet. Nå er andelen 46,9 %, fordi havregrynene
(ett år) og hermetikken (to år) står for 510 av 3 885 matkroner der de før
sto for null. Det velter ikke slutningen over – et årlig abonnement på
*hele* langtidspakken ville fortsatt vært å kaste REAL-poser med fire år
igjen – men «ingenting å fylle på før om fem år» er ikke lenger sant for
nesten halve matkurven. Et påfyll som bare dekker den korte maten er dermed
et reelt produktspørsmål på langtidsnivået også, ikke bare på tørrmat.

---

## 6. Momsen

Mat-linjer (kategori `'Mat'` eksplisitt, ikke `'Vann'`) er satt til 15 % mva,
alt annet – inkludert tomme vannkanner, vannfilteret, aquatabs og esken – til
25 %. Det er uendret fra før, og fortsatt en bevisst, riktig
avgiftsmessig vurdering gjort i `konfigurator.js`, ikke noe jeg endrer her.

**`ui/bygger.js`-feilen som lot prispanelet vise all mat som utstyr, er
rettet.** Verifisert direkte i koden: filteret bruker nå
`MATGRUPPER.includes(l.kategori)` (`MATGRUPPER = ['Mat', 'Vann']`), importert
fra `konfigurator.js` – samme sted mva-satsen selv ligger. Prispanelet og
selvtesten leser fra samme kilde, slik oppdraget krevde. Dette punktet er
derfor ikke lenger en forutsetning som gjenstår, slik det var i forrige
versjon av dette dokumentet.

### Blandet mva-sats, beregnet fra dagens priser

Beregnet fra tabellene i punkt 3 (mva = pris inkl. mva − netto; blandet sats
= mva / netto), 4 personer:

| Pakke | Mva-beløp | Netto | Blandet mva-sats | Hvorfor |
| --- | ---: | ---: | ---: | --- |
| Komplett tørrmat, plast | 2 461 kr | 10 663 kr | **23,1 %** | Stor andel utstyr (radio, kokeapparat, vannfilter, CO-varsler, lys, bøttetoalett, eske) til 25 %. |
| Komplett langtidsmat, plast | 2 630 kr | 11 792 kr | **22,3 %** | Flere matkroner (REAL-middagene er halvparten av dem) trekker snittet mot 15 % – men mindre enn før, siden REAL nå dekker fire av sju middager i stedet for alle måltidene. |
| Matpåfyll, tørrmat | 356 kr | 2 297 kr | **15,5 %** | Nesten bare mat; aquatabs (25 %) er eneste utstyrslinje. |
| Matpåfyll, langtidsmat | 537 kr | 3 497 kr | **15,4 %** | Samme, med dyrere matlinjer som forsterker mat-andelen. |

Avstanden mellom de to komplett-radene er blitt mindre av rebalanseringen: før
lå langtidsmat på 21,4 % blandet sats, fordi REAL-måltidene alene utgjorde
nesten fire femdeler av matkronene. Nå er den 22,3 %, bare 0,8 prosentpoeng
under tørrmat.

For komplett tørrmat er dette verifisert helt ned til varelinjenivå (se
punkt 2): 2 504 kr av 13 962 kr i varesum (før pakkerabatt) er kategorien
`'Mat'` og mva-belastes med 15 %; resten, 11 458 kr, mva-belastes med 25 %.
Det gir et blandet mva-beløp på 2 618 kr før rabatt, som skaleres til 2 461
kr etter 6 % pakkerabatt – nøyaktig tallet i tabellen over.

### Hvorfor vi fortsatt viser oppdelingen åpent

Uendret begrunnelse: det er den eneste måten å gjøre forskjellen i
dekningsgrad mellom komplett-pakken (21–23 %) og matpåfyllet (30–31 %)
forklarlig for en kunde som spør hvorfor vi «tjener mer» på påfyllet – svaret
er delvis avgiftsstruktur (matpåfyllet er nesten bare 15 %-varer), ikke bare
prisvalg. Med bygger.js-feilen rettet, holder løftet om åpen momsvisning nå
faktisk i grensesnittet, ikke bare i dette dokumentet.

---

## 7. Frakt og retur

Uendret fra forrige versjon på alle punkter unntatt ett tall: dekningsgraden
frakt-argumentet lener seg på er nå **21–23 % på komplett-pakken** (punkt 3),
ikke 17–28 % som før. Konklusjonen er den samme, bare med et smalere og mer
presist intervall: å la kjøper betale frakt separat holder den dekningsgraden
urørt av en fraktkostnad markedet stort sett later som ikke finnes.

Resten av avsnittet – at markedets «fri frakt» ofte ikke stemmer med
vilkårene, anslagene på 250–1 800 kr per boks avhengig av antall kolli og
landsdel, anbefalingen om å innhente reelle avtaler fra Bring og PostNord før
lansering, og 30 dagers angrerett på uåpnet utstyr og eske – er uendret av de
sju tingene som er beskrevet innledningsvis, og gjentas ikke her.

---

## 8. Hva vi ikke gjør

**Ingen gjennomstrekede førpriser. Ingen kunstige tilbud. Ingen nedtelling.**
Uendret, og enda viktigere nå enn før: en kunde som skal akseptere en pris
72 % over markedets dyreste konkurrent (punkt 1) må stole fullt ut på at
prisen som står, er prisen som gjelder – en falsk førpris ved siden av det
regnestykket ville vært det motsatte av den ærligheten som er hele
forsvaret for posisjonen.

De tre grunnene fra forrige versjon står ved lag uendret: det er ulovlig i
praksis (markedsføringsloven), det motsier hele posisjonen, og det ødelegger
abonnementet. På det siste punktet er tallet oppdatert: abonnementet er
verdt **3,0 ganger** et engangskjøp over ti år (punkt 5), ikke 4,6 ganger –
fortsatt et argument som forutsetter en kunde som stoler på oss over tid, og
fortsatt et argument en falsk førpris ved førstegangskjøpet ville ødelagt.

---

## Prioritert liste over det som må skje før disse tallene kan brukes i produksjon

Tre punkter fra forrige versjon er løst og er fjernet fra listen:
kategorinøkkel-feilen i `ui/bygger.js` er rettet, utstyrstersklene er
spredt (`ceil(p/4)`, `ceil(p/5)`, `ceil(p/6)`, `ceil(p/8)`), og halvårlig
påfylls tynne margin etter rabatt er ikke lenger et punkt – nivået finnes ikke
i katalogen. Gjenstående:

1. **Reelle B2B-priser på premiumutstyret**, ikke 0,6×-anslaget. Trangia,
   de fire Petzl-lyktene, Sangean, Katadyn, Leatherman og Lifesystems utgjør
   alene 4 519 kr av firepersonspakkens 8 309 kr i anslått innkjøp – 54 %.
   Følsomhetsanalysen i punkt 3 viser at dette er den enkeltendringen som
   betyr mest for dekningsgraden, på begge matnivåer.
2. **Reell B2B-pris fra Drytech/REAL Turmat** – fortsatt uavklart, men ikke
   lenger øverst på listen. Etter rebalanseringen utgjør REAL-middagene
   1 238 kr av langtidspakkens 9 135 kr i anslått innkjøp (13,6 %), og
   ingenting i tørrmatpakken. Før rebalanseringen bar REAL nesten fire
   femdeler av matkostnaden på langtidsnivået; nå bærer havregryn og
   middagshermetikk størstedelen av måltidene, og de er begge varer vi
   allerede kjøper til tørrmatpakken. Det gjør REAL-avtalen mindre kritisk
   og volumet på hermetikken mer.
3. **Reelle fraktpriser** fra Bring og/eller PostNord bedriftsavtale –
   punkt 7s tall er fortsatt anslag.
4. **Legg til et «annethvert år»-nivå i `PAFYLL`** for tørrmatkunder med
   lavere forpliktelsesvilje enn årlig (punkt 5) – uendret anbefaling.
5. **Vurder en lettere utstyrsprofil for 1–2 personer** (punkt 1) – rundt
   77 % av enpersonspakkens pris er i dag utstyr som ikke blir billigere av
   færre brukere. Avhukingen av eid utstyr og matpåfyllet som inngangsprodukt
   hjelper, men løser det ikke for en kunde uten utstyr fra før. Dette er et
   produktspørsmål for `katalog.js`, ikke noe jeg endrer i dette dokumentet.
6. **Følg konverteringen på komplett-pakken tett etter lansering** (punkt 1)
   – prisen er nå 72 % over markedets dyreste observerte konkurrent, uten et
   eneste nærliggende datapunkt som validerer at noen betaler det. Lav
   konvertering, særlig ved 3–5 personer, er første varsel om at avstanden
   er for stor i praksis, ikke bare i teorien.
7. **`docs/innkjopsliste.md` sin egen følsomhetstabell bør oppdateres** til
   å reflektere premiumdreiningen og «alt til butikkpris»-regelen (punkt 3)
   – den viser i dag tall fra før begge endringene og undervurderer
   dagens dekningsgrad kraftig.

Disse sju er produkt- og innkjøpsarbeid, ikke prisarbeid – men prisstrategien
over holder kun så lenge disse forutsetningene enten stemmer eller blir
rettet.
