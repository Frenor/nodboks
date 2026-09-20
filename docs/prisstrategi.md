# Prisstrategi

**Skrevet 20. september 2026, avstemt mot katalogen samme dag, på grunnlag av
`docs/konkurrentanalyse.md`, `docs/innkjopsliste.md` og den katalogen som
faktisk kjører i `assets/js/data/katalog.js` / `assets/js/konfigurator.js`.**

Siden forrige versjon av dette dokumentet har katalogen endret seg på fire
punkter som gjør de gamle tallene her foreldede:

1. **Premiumdreiningen.** Ni varegrupper er byttet til kvalitetsprodukter:
   Petzl Actik Core hodelykt, Sangean MMR-88 DAB-radio, Trangia 25-5 HA,
   Katadyn BeFree vannfilter, Leatherman Rev, Lifesystems førstehjelp,
   Cederroth blodstopper, Ledlenser ML4 lanterne, Anker PowerCore 20 000.
2. **Prisregelen er lagt om** fra 85 % av butikkpris (et «du sparer»-argument
   som ga netto 0,68R og 12 % dekningsgrad når innkjøp lå på 0,6R) til hele
   butikkpris (netto 0,80R, 22–23 % dekningsgrad).
3. **Kassen er et kundevalg** mellom plast (SmartStore Dry 45) og aluminium
   (Zarges Eurobox til utstyret; mat og vann ligger i plast uansett).
4. **Utstyrstersklene er spredt** (`ceil(p/4)`, `ceil(p/5)`, `ceil(p/6)`,
   `ceil(p/8)`) i stedet for at alt hoppet samtidig ved femte person.

**Alle prispunkter under er hentet direkte fra `/tmp/nodboks/fasit.md` —
en kjøring av `byggPakke()` mot dagens katalog, 20.09.2026 — ikke beregnet på
nytt av meg.** Der jeg utleder noe fra de tallene (marginalpris mellom to
husstandsstørrelser, blandet mva-sats, følsomhet på innkjøpsfaktoren), står
utledningen i klartekst i avsnittet, slik at den kan etterprøves linje for
linje. Der et tall er et anslag, står det at det er et anslag.

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
  **12 471 kr** i plastkasse. Det er **63 % over** markedets desidert
  dyreste tilbud, beredskap24 (7 650 kr, frysetørket). Det er ikke lenger et
  spørsmål om hvor i feltet vi ligger – vi ligger langt utenfor feltet, på
  hver eneste husstandsstørrelse og på begge matnivåer. Se punkt 1 for et
  ærlig regnskap over om det er forsvarlig.
- Dekningsgraden ligger på **22–23 % på komplett-pakken og 30–31 % på
  matpåfyll**, praktisk talt likt uansett husstandsstørrelse (1–8 personer).
  Det er en konsekvens av at prisregelen nå er én flat regel – pris = full
  butikkpris, innkjøp = 0,6 × butikkpris – ikke lenger en bevisst
  margintrapp som stiger med husstandsstørrelsen. Se punkt 2–4.
- Kunden velger kasse: plast eller aluminium. Forskjellen er **eksakt
  3 478 kr, på hver eneste husstandsstørrelse og begge matnivåer** – et
  rendyrket, valgfritt oppsalg kunden tar selv, ikke noe som endrer
  kjerneproduktet. Se eget avsnitt i punkt 3.
- Enpersonspakken (9 315 kr) er strukturelt den vanskeligste å forsvare:
  beregnet direkte fra katalogens egne skaleringsregler utgjør utstyr som
  ikke blir billigere av å kjøpe for én person i stedet for fire, rundt
  77 % av prisen. Se eget avsnitt i punkt 1.
- Treffer innkjøpsanslaget for høyt (0,6 i dag), er dekningsgraden fortsatt
  positiv ned mot verre anslag, men går innkjøpet ned mot 0,5–0,45 stiger
  dekningsgraden til 35–41 %. Se følsomhetsanalysen i punkt 3, koblet til
  `docs/innkjopsliste.md`.
- Abonnement er fortsatt den riktige forretningsmodellen, men gevinsten er
  mindre enn forrige versjon av dette dokumentet hevdet – fordi den forrige
  refill-marginen var bevisst bygget opp som en buffer mot rabatten, og den
  bufferen finnes ikke lenger under «alt til butikkpris»-regelen. Se punkt 5.
- Frakt er kjøpers, og vi bruker ikke gjennomstrekede førpriser. Begge deler
  står ved lag. Se punkt 7–8.

---

## Metode: hvordan tallene er regnet

`byggPakke({ personer, matniva, modus, eskeType })` i `konfigurator.js`
bygger den faktiske varelinjen for en gitt konfigurasjon – nå med kassevalg
som fjerde parameter – beregner mva per linje (mat til 15 %, alt annet,
inkludert tomme vannkanner og esken, til 25 %) og gir `sum` (inkl. mva),
`netto` (eks. mva) og `mva`. Innkjøpskost er summert per linje fra
`vare.innkjop`, samme `gjelder()`-logikk som konfiguratoren selv bruker for
modus, matnivå og eskeType.

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
| **Nødboks, komplett tørrmat, plast (4 pers.)** | **445** | vanlig butikkmat |
| **Nødboks, komplett tørrmat, aluminium (4 pers.)** | **570** | vanlig butikkmat |

(445 kr/person/døgn og 570 kr/person/døgn er lest direkte fra fasiten,
`komplett / torrmat / plast` og `.../alu`, 4 personer.)

Det er ikke en marginal forskyvning. **445 kr er 63,0 % mer enn beredskap24s
273 kr** (445 / 273 = 1,630) – markedets desidert dyreste tilbud, en
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
   slikt ankerpunkt. 445 kr per person per døgn er ikke «nær toppen av
   markedet» – det er 63 % over toppen, uten en eneste observert konkurrent
   som har validert at noen betaler noe i nærheten av det for en boks uten
   frysetørket mat. Det er en påstand om at doblet innhold rettferdiggjør
   mer enn doblet pris, og den påstanden er ikke testet mot en eneste
   kjøpsbeslutning ennå.
2. **«Vanlig butikkmat» var vår billigste posisjon – den er det ikke lenger
   i kroner.** At vi nå koster mer per person per døgn enn en frysetørket
   premiumpakke, selv når vi selger den billigste matkategorien i markedet,
   er et reelt spenn å forklare til en kunde som sammenligner. Argumentet må
   bæres av utstyret og tjenesten, ikke av maten – og det er et tyngre
   argument å holde oppe enn «vi er billigere per kalori».

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

9 315 kr for én person (1 331 kr per person per døgn – tre ganger 4-persons
raten på 445) er ikke bare «dyrt». Det er strukturelt vanskelig, og grunnen
er tallfestbar: de fleste av premiumproduktene er priset for én husstand,
ikke én person, og skaleringsregelen deres i `katalog.js` gir **nøyaktig
samme antall ved én person som ved fire**:

| Vare | Regel | Antall ved 1 og ved 4 personer | Retailverdi (inkl. mva) |
| --- | --- | ---: | ---: |
| Trangia Stormkjøkken 25-5 HA | `ceil(p/4)` | 1 | 1 698 kr |
| Sangean DAB-radio | fast | 1 | 1 190 kr |
| Katadyn BeFree vannfilter | `ceil(p/6)` | 1 | 799 kr |
| Leatherman Rev multiverktøy | `ceil(p/8)` | 1 | 799 kr |
| Lifesystems førstehjelp | `ceil(p/6)` | 1 | 749 kr |
| Anker PowerCore | `ceil(p/5)` | 1 | 659 kr |
| CO-varsler | `p ≤ 4 ? 1 : 2` | 1 | 349 kr |
| Beredskapspermen | fast | 1 | 199 kr |
| Telys | fast | 1 | 60 kr |
| Fyrstikker | fast | 1 | 13 kr |
| Petzl-hodelykt | `max(p, 2)` | 2 | 1 148 kr |
| **Sum, fast uansett 1–4 personer** | | | **7 663 kr** |

(Utledet direkte fra `vare.antall(personer)`-reglene i `katalog.js` og
enhetsprisene i fasitens varelinjer for 4-personerspakken – samme
enhetspris gjelder uansett antall, så tallet over er ikke et anslag.)

`sumVarer` før pakkerabatt for 1-personerspakken er 9 315 / 0,94 ≈ 9 910 kr.
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
   å treffe – kan i prinsippet fjerne opp mot 4 000–5 000 kr av den faste
   utstyrsposten. Det er den mekanismen som faktisk løser problemet for den
   kunden det gjelder mest: en friluftsperson som skal utstyre seg selv.
2. **Matpåfyll (897 kr for én person, tørrmat) er det billige inngangsproduktet.** Det er billigere enn både Røde Kors' (1 999 kr) og
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
for komplett tørrmat, 4 personer, plast (fasitens detaljerte linjer):

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
| Wasa Husman knekkebrød, 520 g | 5 | 30 | 150 | 17,95 |
| Stabburet Leverpostei Original, 200 g | 8 | 25 | 200 | 14,95 |
| Mills Kaviar, 185 g | 3 | 37 | 111 | 22,30 |
| Stabburet Makrell i tomat, 170 g | 4 | 35 | 140 | 20,95 |
| Nugatti Original, 350 g | 2 | 28 | 56 | 16,75 |
| Freia Melkesjokolade, 200 g | 4 | 30 | 120 | 17,95 |
| Sætre Mariekjeks, 350 g | 3 | 32 | 96 | 19,15 |
| Peanøtter, 500 g | 2 | 40 | 80 | 24,20 |
| Rosiner, 500 g | 2 | 55 | 110 | 33,30 |
| O'boy sjokoladedrikk, 450 g | 1 | 55 | 55 | 32,95 |
| Fruktcocktail i sukkerlake, 820 g | 1 | 31 | 31 | 18,70 |
| Axa Bjørn Lettkokte Havregryn, 1,1 kg | 2 | 27 | 54 | 16,15 |
| Trondhjems middagshermetikk, fire sorter | 15 | 67 | 1 005 | 40,40 |
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
| Leatherman Rev multiverktøy | 1 | 799 | 799 | 479,40 |
| Beredskapspermen | 1 | 199 | 199 | 49,00 |

Sum varer før pakkerabatt: 13 267 kr. Etter 6 % pakkerabatt (`modus.rabatt`
for komplett-modus): **12 471 kr** – som er nøyaktig fasitens tall. Netto
eks. mva: 10 121 kr. Innkjøpskost: 7 891 kr. Dekningsgrad: **22 %.**

Denne tabellen er selve grunnlaget for både momsoppdelingen i punkt 6 og
følsomhetsanalysen i punkt 3 – begge er utledet fra den, ikke fra separate
anslag.

---

## 3. Prispunkter

Alle tabellene under er transkribert direkte fra `/tmp/nodboks/fasit.md`.
Ingen av dem er beregnet på nytt.

### Komplett pakke, tørrmat – plast

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | kr/person/døgn |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 9 315 | 7 501 | 5 876 | 22 % | 1 331 |
| 2 | 9 909 | 8 008 | 6 255 | 22 % | 708 |
| 3 | 11 435 | 9 268 | 7 230 | 22 % | 545 |
| 4 | 12 471 | 10 121 | 7 891 | 22 % | 445 |
| 5 | 15 855 | 12 866 | 10 051 | 22 % | 453 |
| 6 | 18 578 | 15 083 | 11 790 | 22 % | 442 |
| 7 | 21 338 | 17 323 | 13 552 | 22 % | 435 |
| 8 | 22 430 | 18 225 | 14 250 | 22 % | 401 |

### Komplett pakke, tørrmat – aluminium

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | kr/person/døgn |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 12 793 | 10 283 | 8 096 | 21 % | 1 828 |
| 2 | 13 387 | 10 790 | 8 475 | 21 % | 956 |
| 3 | 14 913 | 12 050 | 9 450 | 22 % | 710 |
| 4 | 15 949 | 12 904 | 10 111 | 22 % | 570 |
| 5 | 19 333 | 15 649 | 12 272 | 22 % | 552 |
| 6 | 22 056 | 17 866 | 14 010 | 22 % | 525 |
| 7 | 24 816 | 20 106 | 15 772 | 22 % | 506 |
| 8 | 25 908 | 21 008 | 16 470 | 22 % | 463 |

### Komplett pakke, langtidsmat – plast

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | kr/person/døgn |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 10 149 | 8 226 | 6 407 | 22 % | 1 450 |
| 2 | 11 602 | 9 480 | 7 334 | 23 % | 829 |
| 3 | 13 962 | 11 465 | 8 840 | 23 % | 665 |
| 4 | 15 920 | 13 120 | 10 089 | 23 % | 569 |
| 5 | 20 163 | 16 612 | 12 796 | 23 % | 576 |
| 6 | 23 720 | 19 555 | 15 066 | 23 % | 565 |
| 7 | 27 339 | 22 541 | 17 375 | 23 % | 558 |
| 8 | 29 328 | 24 224 | 18 644 | 23 % | 524 |

### Komplett pakke, langtidsmat – aluminium

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | kr/person/døgn |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 13 627 | 11 009 | 8 627 | 22 % | 1 947 |
| 2 | 15 080 | 12 262 | 9 554 | 22 % | 1 077 |
| 3 | 17 440 | 14 247 | 11 060 | 22 % | 830 |
| 4 | 19 398 | 15 903 | 12 309 | 23 % | 693 |
| 5 | 23 641 | 19 395 | 15 016 | 23 % | 675 |
| 6 | 27 198 | 22 337 | 17 286 | 23 % | 648 |
| 7 | 30 817 | 25 324 | 19 595 | 23 % | 629 |
| 8 | 32 806 | 27 006 | 20 864 | 23 % | 586 |

### Matpåfyll, tørrmat

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | kr/person/døgn |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 897 | 770 | 539 | 30 % | 128 |
| 2 | 1 379 | 1 189 | 829 | 30 % | 99 |
| 3 | 1 979 | 1 711 | 1 190 | 30 % | 94 |
| 4 | 2 357 | 2 039 | 1 417 | 30 % | 84 |
| 5 | 3 087 | 2 664 | 1 856 | 30 % | 88 |
| 6 | 3 679 | 3 178 | 2 212 | 30 % | 88 |
| 7 | 4 164 | 3 600 | 2 504 | 30 % | 85 |
| 8 | 4 602 | 3 981 | 2 767 | 30 % | 82 |

### Matpåfyll, langtidsmat

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | kr/person/døgn |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 1 784 | 1 541 | 1 070 | 31 % | 255 |
| 2 | 3 180 | 2 755 | 1 907 | 31 % | 227 |
| 3 | 4 667 | 4 048 | 2 800 | 31 % | 222 |
| 4 | 6 026 | 5 230 | 3 614 | 31 % | 215 |
| 5 | 7 670 | 6 649 | 4 601 | 31 % | 219 |
| 6 | 9 149 | 7 935 | 5 488 | 31 % | 218 |
| 7 | 10 548 | 9 151 | 6 327 | 31 % | 215 |
| 8 | 11 940 | 10 362 | 7 162 | 31 % | 213 |

Matpåfyll har ingen kasse i det hele tatt (mat sendes i kartong, ikke
Nødboks-kassene), så kassevalget gjelder bare komplett-pakken.

### Kassevalget som prisinstrument

Aluminiumskassen er ikke en annen pakke – den er nøyaktig samme utstyr og
mat, i en Zarges Eurobox i stedet for SmartStore-plastkasser til utstyret
(mat og vann ligger i plast uansett kassevalg). Forskjellen i sluttpris er
påfallende presis:

| | Plast | Aluminium | Differanse |
| --- | ---: | ---: | ---: |
| Eskepris (retail, inkl. mva) | 299–897 kr (1–8 pers.) | 3 999–4 597 kr | **eksakt 3 700 kr, ved hver husstandsstørrelse** |
| Effekt på sluttpris (etter 6 % pakkerabatt) | – | – | **eksakt 3 478 kr, ved hver husstandsstørrelse og begge matnivåer** |

(Verifisert linje for linje mot begge fasit-tabellene: differansen mellom
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
prosent, selv om kronebeløpet er høyt – se DG-kolonnen, som er 1
prosentpoeng lavere for aluminium ved 1–2 personer). Det er ikke et problem:
det er en kunde som bevisst kjøper et bruksobjekt, ikke beredskap, og betaler
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

**Komplett tørrmat, 4 personer, plast** (netto fast på 10 121 kr):

| Innkjøpsfaktor | Innkjøpskost | Dekningsgrad |
| --- | ---: | ---: |
| 0,60 (dagens anslag) | 7 891 kr | 22,0 % |
| 0,55 | 7 238 kr | 28,5 % |
| 0,50 | 6 584 kr | 34,9 % |
| 0,45 | 5 931 kr | 41,4 % |

**Komplett langtidsmat, 4 personer, plast** (netto fast på 13 120 kr):

| Innkjøpsfaktor | Innkjøpskost | Dekningsgrad |
| --- | ---: | ---: |
| 0,60 (dagens anslag) | 10 089 kr | 23,1 % |
| 0,55 | 9 253 kr | 29,5 % |
| 0,50 | 8 416 kr | 35,9 % |
| 0,45 | 7 579 kr | 42,2 % |

**Matpåfyll, tørrmat, 4 personer** (netto fast på 2 039 kr, ingen fast
realkost å holde utenfor – hele linjen er mat og aquatabs, ikke egne
trykksaker):

| Innkjøpsfaktor | Innkjøpskost | Dekningsgrad |
| --- | ---: | ---: |
| 0,60 (dagens anslag) | 1 417 kr | 30,5 % |
| 0,55 | 1 299 kr | 36,3 % |
| 0,50 | 1 181 kr | 42,1 % |
| 0,45 | 1 063 kr | 47,9 % |

Selv i et scenario der innkjøpsanslaget er for optimistisk (0,60 blir 0,70,
altså verre enn i dag), holder komplett-pakken seg klart over den 12 %
dekningsgraden konfiguratorens egen kildekommentar bruker som eksempel på
«ikke en forretning»: ved 0,70 blir dekningsgraden på komplett tørrmat,
4 personer, (10 121 − (7 842,3 × 0,70/0,6 + 49)) / 10 121 ≈ **9,1 %** – tynt,
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
likt for alle husstandsstørrelser, blir dekningsgraden det også: **22 % ved
både 1 og 8 personer på tørrmat, 22–23 % på langtidsmat**, se tabellene i
punkt 3. Det er en forenkling, ikke en feil – men det betyr at vi ikke
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
| 1 → 2 | 594 kr | Kun mat, vann og prisforskjellen mellom lik eske. |
| 2 → 3 | 1 526 kr | Eskebytte (Nødboks Liten → Mellom ved 3). |
| 3 → 4 | 1 036 kr | Fortsatt innenfor samme utstyrssett. |
| **4 → 5** | **3 384 kr** | **Kokeapparat, CO-varsler og aquatabs krysser alle `ceil(p/4)`-terskelen samtidig** – dette er den ene terskelen som ikke ble spredt, fordi de tre varene fortsatt deler samme divisor. |
| 5 → 6 | 2 723 kr | Campinglykt (Ledlenser), powerbank og hygienepakke krysser `ceil(p/5)`. Eske til Nødboks Stor. |
| 6 → 7 | 2 760 kr | Vannfilter (Katadyn), batterier og førstehjelp krysser `ceil(p/6)`. |
| 7 → 8 | 1 092 kr | Ingen nye terskler krysses (multiverktøyets `ceil(p/8)` krysser først ved 9). |

Snittet over de sju trinnene er **1 874 kr** – fortsatt høyere enn
Norberedts flate 1 000 kr, og fortsatt trappet, ikke flatt. Men i motsetning
til før er ikke lenger ett eneste trinn (4 → 5) desidert størst: 5 → 6 og
6 → 7 er nå nesten like store (2 723 og 2 760 kr), fordi kokeapparat,
CO-varsler og aquatabs er de eneste varene som fortsatt deler
`ceil(p/4)`-terskelen, mens campinglykt/powerbank/hygienepakke (`ceil(p/5)`)
og vannfilter/batterier/førstehjelp (`ceil(p/6)`) nå hopper hver for seg ved
6 og 7. Det er spredningen oppdraget ba om, synlig direkte i tallene – ikke
bare i koden.

### Hvor grensen går

Ved 8 personer er prisen 22 430 / 8 = **2 804 kr per person**, mot 9 315 kr
ved 1 person – en nedgang på **69,9 %**. Innkjøpskosten per person faller
nesten identisk: fra 5 876 kr (1 person) til 14 250 / 8 = 1 781 kr (8
personer), en nedgang på **69,7 %**. De to prosentene ligger praktisk talt
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
konkurrenter mangler den. Men tallene under er lavere enn forrige versjon av
dette dokumentet hevdet, og grunnen er verdt å forklare før tallene selv:
**den forrige refill-marginen (30–38 %) var en bevisst konstruert buffer mot
abonnementsrabatten**, satt høyere enn komplett-pakkens dekningsgrad med
vilje. Under «alt til butikkpris»-regelen er ikke det lenger en bevisst
policy – matpåfyllets 30–31 % dekningsgrad er nå en konsekvens av
vareutvalget (nesten bare mat, lav mva-sats, se punkt 6), ikke et mål vi har
satt for å tåle rabatten. Bufferen er dermed tynnere enn før den gang den var
et bevisst designvalg.

### Tre nivåer, samme jobb som før

Katalogens tre `PAFYLL`-nivåer er uendret: gratis varsel (0 % rabatt, hver
365. dag), årlig påfyll (10 %, hver 365. dag) og halvårlig påfyll (15 %,
hver 182. dag). Rollene deres er også uendret – gratis varsel er
tillitspunktet, årlig er hovedproduktet, halvårlig er et nisjeprodukt.

### Regnestykket: hva rabatten faktisk koster oss i dag

For en firepersoners tørrmat-påfyll (2 357 kr, 30 % dekningsgrad før
rabatt, netto 2 039 kr, innkjøp 1 417 kr – alle fra fasiten):

| Abonnement | Rabatt | Kundepris | Vår netto etter rabatt | Innkjøp | Dekningsgrad etter rabatt |
| --- | ---: | ---: | ---: | ---: | ---: |
| Ingen (engangskjøp) | 0 % | 2 357 kr | 2 039 kr | 1 417 kr | 30,5 % |
| Årlig påfyll | 10 % | 2 121 kr | 1 803 kr | 1 417 kr | 21,4 % |
| Halvårlig påfyll | 15 % | 2 003 kr | 1 685 kr | 1 417 kr | 15,9 % |

(Rabatten trekkes fra etter at mva er beregnet på full pris, akkurat som
før – den går fra vår netto margin, ikke fra avgiften.)

**Det er en reell endring fra forrige versjon å merke seg:** årlig påfyll
holder seg fortsatt over 20 % (21,4 %), men halvårlig faller nå til
**15,9 %** – under den 20 %-grensa som tidligere var selve begrunnelsen for
å prise matpåfyllet med en ekstra buffer. Halvårlig-nivået er fortsatt et
lite volumprodukt (nisje for husstander med kortdatert meieri i samme
forsendelse), så det haster ikke, men det er ikke lenger en marginmessig
selvfølge slik det var da matpåfyllet bevisst var priset til 37,5 %. Verdt
å ta opp igjen når volumet på halvårlig-nivået faktisk blir stort nok til å
telle.

### Livstidsverdi – fortsatt argumentet for abonnement, men et mindre tall

Regnet på en firepersoners tørrmatkunde: boksprofitt ved kjøp (netto minus
innkjøp på komplett-pakken) er **10 121 − 7 891 = 2 230 kr**. Refillprofitt
per syklus, årlig nivå: **1 803 − 1 417 = 386 kr**.

| Kundetype | Profitt ved kjøp | Kumulativ profitt, etter 5 år | Kumulativ profitt, etter 10 år |
| --- | ---: | ---: | ---: |
| Engangskunde (kjøper boksen, kommer aldri tilbake) | 2 230 kr | 2 230 kr | 2 230 kr |
| Årlig abonnent (boks + årlig påfyll, 5/10 sykluser) | 2 230 kr | 4 160 kr | 6 090 kr |
| Annethvert år (boks + påfyll hvert annet år, se under) | 2 230 kr | 3 238 kr | 4 750 kr |

En årlig abonnent er verdt **2,7 ganger** en engangskunde etter ti år
(6 090 / 2 230) – ikke 4,6 ganger, som forrige versjon av dette dokumentet
hevdet. Forskjellen er ikke en regnefeil noe sted; den er den direkte
konsekvensen av at refillmarginen ikke lenger er kunstig oppblåst som en
rabattbuffer. Konklusjonen står likevel: abonnenten er fortsatt verdt
nesten tre ganger så mye, og differansen vokser hvert år etter det, siden
engangskunden flater ut for alltid mens abonnenten legger til 386 kr netto
per år.

**«Annethvert år»-nivået finnes fortsatt ikke i `PAFYLL`** – tallet over
(5 % rabatt i stedet for 10 %, refill hvert annet år) er fortsatt et forslag,
ikke et produkt, av samme grunn som før: en sjeldnere kunde er en mindre
forpliktet kunde. **Anbefaling uendret:** legg til et fjerde `PAFYLL`-nivå.
Selv ved halv frekvens og halv rabatt er kunden 2,1 ganger mer verdt enn en
engangskunde over ti år.

### Langtidsmat: fortsatt bare det gratis varselet, av samme grunn

Langtidsmat har fem års holdbarhet mot tørrmatens ett år, og et abonnement
som fornyer seg årlig ville betydd å kaste mat som ikke er i nærheten av å gå
ut. Regnet med dagens tall: boksprofitt på komplett langtidsmat, 4 personer,
plast, er **13 120 − 10 089 = 3 031 kr**. Refillprofitt uten rabatt (siden vi
ikke selger et betalt abonnement på langtidsmat) er **5 230 − 3 614 =
1 616 kr** per femårssyklus.

Over 20 år (fire fornyelser ved 5, 10, 15 og 20 år): **3 031 + 4 × 1 616 =
9 495 kr**, mot engangskundens flate 3 031 kr – **3,1 ganger**. Til
sammenligning, en tørrmat-abonnent over samme 20-årsperiode (20 årlige
sykluser): **2 230 + 20 × 386 = 9 950 kr**, mot engangskundens 2 230 kr –
**4,5 ganger**. Tørrmat-abonnementet er fortsatt tydelig sterkere som
*abonnement* enn langtidsmats femårssyklus (4,5× mot 3,1× over samme
periode) – men gapet er langt mindre dramatisk enn forrige versjons
«8,2 ganger mot 3,4 ganger». Konklusjonen står: **abonnement er tørrmatens
forretning. Langtidsmat er et enkeltkjøp med en ærlig påminnelse fem år fram
i tid** – bare med et mer realistisk tallgrunnlag bak den.

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
| Komplett tørrmat, plast | 2 350 kr | 10 121 kr | **23,2 %** | Stor andel utstyr (radio, kokeapparat, vannfilter, CO-varsler, lys, eske) til 25 %. |
| Komplett langtidsmat, plast | 2 800 kr | 13 120 kr | **21,3 %** | Mer mat (REAL Field Meal) trekker snittet mot 15 %. |
| Matpåfyll, tørrmat | 318 kr | 2 039 kr | **15,6 %** | Nesten bare mat; aquatabs (25 %) er eneste utstyrslinje. |
| Matpåfyll, langtidsmat | 796 kr | 5 230 kr | **15,2 %** | Samme, med dyrere matlinjer som forsterker mat-andelen. |

For komplett tørrmat er dette verifisert helt ned til varelinjenivå (se
punkt 2): 2 208 kr av 13 267 kr i varesum (før pakkerabatt) er kategorien
`'Mat'` og mva-belastes med 15 %; resten, 11 059 kr, mva-belastes med 25 %.
Det gir et blandet mva-beløp på 2 500 kr før rabatt, som skaleres til 2 350
kr etter 6 % pakkerabatt – nøyaktig tallet i tabellen over.

### Hvorfor vi fortsatt viser oppdelingen åpent

Uendret begrunnelse: det er den eneste måten å gjøre forskjellen i
dekningsgrad mellom komplett-pakken (22–23 %) og matpåfyllet (30–31 %)
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
fire tingene som er beskrevet innledningsvis, og gjentas ikke her.

---

## 8. Hva vi ikke gjør

**Ingen gjennomstrekede førpriser. Ingen kunstige tilbud. Ingen nedtelling.**
Uendret, og enda viktigere nå enn før: en kunde som skal akseptere en pris
63 % over markedets dyreste konkurrent (punkt 1) må stole fullt ut på at
prisen som står, er prisen som gjelder – en falsk førpris ved siden av det
regnestykket ville vært det motsatte av den ærligheten som er hele
forsvaret for posisjonen.

De tre grunnene fra forrige versjon står ved lag uendret: det er ulovlig i
praksis (markedsføringsloven), det motsier hele posisjonen, og det ødelegger
abonnementet. På det siste punktet er tallet oppdatert: abonnementet er
verdt **2,7 ganger** et engangskjøp over ti år (punkt 5), ikke 4,6 ganger –
fortsatt et argument som forutsetter en kunde som stoler på oss over tid, og
fortsatt et argument en falsk førpris ved førstegangskjøpet ville ødelagt.

---

## Prioritert liste over det som må skje før disse tallene kan brukes i produksjon

To punkter fra forrige versjon er løst og er fjernet fra listen:
kategorinøkkel-feilen i `ui/bygger.js` er rettet, og utstyrstersklene er
spredt (`ceil(p/4)`, `ceil(p/5)`, `ceil(p/6)`, `ceil(p/8)`). Gjenstående:

1. **Reell B2B-pris fra Drytech/REAL Turmat**, ikke 0,6×-anslaget resten av
   katalogen bruker. Følsomhetsanalysen i punkt 3 viser at dette fortsatt er
   den enkeltendringen som betyr mest for dekningsgraden.
2. **Reelle fraktpriser** fra Bring og/eller PostNord bedriftsavtale –
   punkt 7s tall er fortsatt anslag.
3. **Legg til et «annethvert år»-nivå i `PAFYLL`** for tørrmatkunder med
   lavere forpliktelsesvilje enn årlig (punkt 5) – uendret anbefaling.
4. **Se på halvårlig påfylls dekningsgrad etter rabatt (15,9 %, punkt 5)**
   når volumet på det nivået faktisk blir stort nok til å telle – ikke
   akutt, men ikke lenger dekket av en bevisst marginbuffer slik det var
   under den gamle prisregelen.
5. **Vurder en lettere utstyrsprofil for 1–2 personer** (punkt 1) – rundt
   77 % av enpersonspakkens pris er i dag utstyr som ikke blir billigere av
   færre brukere. Avhukingen av eid utstyr og matpåfyllet som inngangsprodukt
   hjelper, men løser det ikke for en kunde uten utstyr fra før. Dette er et
   produktspørsmål for `katalog.js`, ikke noe jeg endrer i dette dokumentet.
6. **Følg konverteringen på komplett-pakken tett etter lansering** (punkt 1)
   – prisen er nå 63 % over markedets dyreste observerte konkurrent, uten et
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
