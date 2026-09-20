# Prisstrategi

**Skrevet 20. september 2026, på grunnlag av `docs/konkurrentanalyse.md`,
`/tmp/nodboks/sourcing.txt` og den katalogen som faktisk kjører i
`assets/js/data/katalog.js` / `assets/js/konfigurator.js`.**

Alle tall i dette dokumentet som ikke er merket «observert» eller «anslag» er
**beregnet** ved å kjøre `byggPakke()` fra `konfigurator.js` mot den ekte
katalogen, med en foreslått prisjustering lagt på toppen (metoden er beskrevet
i hvert avsnitt). Det betyr at hvert eneste prispunkt i dette dokumentet kan
regnes etter i konsollen — det er ikke en Excel-øvelse ved siden av koden.

---

## Kort oppsummering

- Vi legger oss **over** hjemmeberedt.no (som deler vår matposisjon) og over
  alle nødrasjon-selgerne, men **ikke** overalt over beredskap24 (frysetørket
  premium) — det avhenger av husstandsstørrelse, og det er ikke tilfeldig.
  Se punkt 1.
- Dagens katalogpriser gir 15–21 % dekningsgrad på komplett-pakken og 28–31 %
  på påfyll, regnet riktig (netto mot netto). Det bekrefter tallene i
  `docs/innkjopsliste.md`. Se punkt 2–3.
- Vi løser det med en **prisstige som gir høyest margin der vi er mest alene i
  markedet** (6–8 personer) og lavest margin der konkurransen er hardest
  (1–2 personer) — ikke med en flat prisøkning. Se punkt 3–4.
- Komplett langtidsmat for 4 personer kan **ikke** prises under beredskap24s
  7 650 kr uten å gå med tap, gitt dagens innkjøpsanslag. Det er det viktigste
  enkeltfunnet i dette dokumentet. Se punkt 1 og 3.
- Påfyll prises med en bevisst margin­buffer (30–38 %, ikke bare 20 %), fordi
  abonnementsrabatten skal spises av den bufferen, ikke av kundeprisen. Se
  punkt 5.
- Frakt er kjøpers og skal aldri kalkuleres inn i varekosten. Se punkt 7.
- Vi bruker ikke gjennomstrekede førpriser. Se punkt 8 — og se hvorfor det er
  mer enn en stilfølelse, i lys av hva vi fant hos beredskapslager.no.

---

## Metode: hvordan tallene er regnet

`byggPakke({ personer, matniva, modus })` i `konfigurator.js` bygger den
faktiske varelinjen for en gitt konfigurasjon, beregner mva per linje (mat og
vann til 15 %, alt annet til 25 %) og gir `sum` (inkl. mva), `netto` (eks.
mva) og `mva`. Det tallet konfiguratoren **ikke** gir, er innkjøpskost — det
har jeg lagt til ved å summere `innkjop × antall` for de samme linjene som
faktisk inngår i pakken (samme `gjelder()`-logikk som konfiguratoren selv
bruker for modus og matnivå).

**Dekningsgrad i dette dokumentet er alltid:**

```
dekningsgrad = (netto − innkjøpskost) / netto
```

— begge ledd eks. mva, slik `docs/innkjopsliste.md` også insisterer på. Der
skriptet i `leverandorer.md` blander `sum` (inkl. mva) med `innkjøp` (eks.
mva), er det en enhetsfeil som overvurderer dekningsgraden med 13–14
prosentpoeng. Dette dokumentet gjør ikke den feilen.

**Innkjøpstallene er, uten unntak, 0,6 × observert detaljpris** — en
arbeidshypotese, ikke en kjent kostnad. Ingen leverandør i sourcingen har gitt
oss en reell B2B-pris. Det er den enkeltfaktoren som betyr mest i hele dette
dokumentet, og den har sitt eget avsnitt i punkt 2 og sin egen
følsomhetsanalyse i punkt 3.

---

## 1. Posisjonsvalget og hva det koster oss

### Vi kan ikke være billigst, og vi prøver ikke

Røde Kors (1 999 kr for én person, overskudd til humanitært arbeid) og
beredskapslager.no (1 799 kr) setter et prisgulv vi ikke skal prøve å underby.
Det står allerede i konkurrentanalysen, og det er riktig: vi taper den kampen
uansett, og vi ødelegger egen margin på veien. Vi priser oss ikke mot gulvet.

### Vi kan heller ikke være billigst *per kalori solgt av nødrasjon* — og det er greit

Beredskap1 (3 999/4 999/6 999/7 999 for 1/2/4/6), krisesikker.no
(3 499/4 999/6 299 for 1/2/4) og norberedt.no (2 999→7 999 for 1–6) selger
komprimerte livbåtrasjoner (Seven Oceans, BP-ER) som «beredskapsmat». Det gjør
ikke vi, og fravær av nødrasjon er ikke gratis: hermetikk, knekkebrød og
leverpostei koster mer per kalori enn en nødrasjonsblokk. Vi skal derfor ikke
skamme oss over å ligge på linje med eller over disse butikkene i kroner — vi
selger noe kundens barn faktisk spiser, ikke noe redningsflåter er utstyrt
med.

### Beregnet: hvor vi faktisk havner, ærlig regnet

Her er det ubehagelige tallet, beregnet direkte fra katalogen (før noen
prisjustering i det hele tatt, altså dagens priser): en komplett tørrmatboks
til 4 personer koster i dag 6 172 kr og gir **252 kr per person per døgn**.
Til sammenligning (fra konkurrentanalysens egen tabell, 4 personer, inkl.
mva.):

| Butikk | kr/person/døgn | Matnivå |
| --- | ---: | --- |
| hjemmeberedt.no | 166 | vanlig butikkmat |
| sikkerheten-selv.no | 179 | uoppgitt |
| norberedt.no | 214 | uoppgitt |
| krisesikker.no | 225 | nødrasjon |
| beredskap1.no | 250 | nødrasjon |
| **Nødboks tørrmat (i dag)** | **252** | vanlig butikkmat |
| beredskap24.org | 273 | frysetørket |

Vi ligger allerede **mellom beredskap1 og beredskap24 på pris**, selv om vi
selger den billigste matkategorien i markedet (vanlig tørrmat) og selv om vi
ikke har hevet en eneste krone ennå. Det er ikke et argument for å holde
prisen lav — det er beviset på at «vanlig norsk mat» aldri var en
lavprisposisjon for oss. Den eneste sammenlignbare aktøren, hjemmeberedt.no,
ligger 34 % under oss allerede i dag, uten prisøkning. Det er fordi
hjemmeberedt selger mat og vann alene — ingen skalert utstyr, ingen radio,
intet stormkjøkken, ingen CO-varsler, ingen dokumentmappe. De to postene er
ikke sammenlignbare produkter, og vi skal si det høyt i markedsføringen: vi er
dyrere enn hjemmeberedt fordi vi selger mer enn mat, ikke fordi maten er
dyrere.

**Konklusjonen for posisjonen:** vi legger oss et sted mellom «vanlig
bekvemmelighetspakke» (norberedt, beredskap1) og «premium merkevare»
(beredskap24), men vi eier et argument ingen av dem har: alt i esken skalerer
med husstanden, dokumentert vare for vare. Det er derfor vi kan forsvare en
pris nær toppen av markedet uten å selge nødrasjon eller skjule
holdbarhetstall.

### Beredskap24 — det ene stedet vi bevisst går over dem, og hvorfor

Oppdraget er eksplisitt: vi kan ikke ta beredskap24s premiumpris (7 650 kr for
fire personer) uten frysetørket gjennomgående, og vår langtidsmat-modus er
ikke det — det er én varm frysetørket middag og en frysetørket frokost per
person per døgn, resten er tørrmat-menyen (se `sourcing.txt`, varegruppe
`mat-lang`).

Regnet mot beredskap24s egen 4-personerspris viser dette seg å være
strengere enn det høres ut: **selv om vi solgte vår komplett langtidsmat-boks
til nøyaktig beredskap24s pris (7 650 kr), ville dekningsgraden vært 0,6 %** —
praktisk talt null margin, med dagens innkjøpsanslag. Vi kan ikke prise oss
under beredskap24 på denne pakken og samtidig tjene penger på den. Det er ikke
et forhandlingsspørsmål, det er aritmetikk: REAL Turmat-linjene alene utgjør
44 % av hele pakkens innkjøpskost for 4 personer (2 836 av 6 388 kr), og de
resterende 56 % er faste kostnader (radio, stormkjøkken, CO-varsler, eske) som
ikke går ned uansett hvor lite vi tar for maten.

Så vi gjør det motsatte av å presse prisen ned til beredskap24s nivå: vi
priser komplett langtidsmat etter **vår egen kost pluss en stige som starter
lavt og stiger** (se punkt 3–4), og lar avstanden til beredskap24 vokse med
husstandsstørrelsen. Ved 2 personer er vi 6–7 % over dem. Ved 4 personer er vi
38 % over dem. Det er ikke tilfeldig, og det skal sies rett ut i
produktteksten: **beredskap24s 4-personersboks har samme utstyr som deres
2-personersboks** — én primus, én hodelykt, én nødradio, samme 75 telys og
samme 10 batterier, ifølge konkurrentanalysen. Vår boks skalerer hodelykt,
vannkanner, nødtepper og — fra og med femte person — et helt ekstra
stormkjøkken og en ekstra CO-varsler. Avstanden i pris er nøyaktig avstanden i
hva kunden får. Der vi ikke kan begrunne avstanden (1–2 personer, der skalering
knapt merkes), holder vi prisen tettere på dem — se punkt 3.

---

## 2. Kostnadsgrunnlaget

### Hva som er observert og hva som er anslått — vi skjuler det ikke

**Ingen eneste innkjøpspris i hele katalogen er en reell, forhandlet B2B-pris.**
`docs/innkjopsliste.md` sier det rett ut, og sourcingen bekrefter det
varegruppe for varegruppe: hver kjede endte i en innloggingsside eller en
kundeavtale (Drytechs `shop.drytech.no`, ASKO, Orkla Storhusholdning, Ahlsell,
Biltema Bedrift, Orthex Norway). Alle `innkjop`-tall i katalogen er derfor
**0,6 × observert detaljpris** — «en arbeidshypotese, ikke et tilbud», som det
står i katalogens egen kildekommentar. Det eneste ekte kostnadstallet i hele
sortimentet er beredskapspermen, vår egen trykksak (49 kr, basert på
trykkeanslag ved 500 eksemplarer).

Det finnes ett unntak fra 0,6-regelen som ikke er en detaljpris i det hele
tatt: **CO-varsleren**. Den har ingen valgt leverandør, ingen observert pris i
det hele tatt — katalogens `pris: 349 / innkjop: 209` er et rent anslag satt
fordi varen må ha et tall for at konfiguratoren skal fungere, ikke fordi noen
har sett en CO-varsler til den prisen. Se punkt 3 for hvordan den likevel
brukes i prisstrategien.

### Vareforbruk per husstandsstørrelse — beregnet, ikke antatt

Skaleringen er kodet som funksjoner av personer, ikke tabelloppslag, nøyaktig
slik oppdraget krever. Under er totalvekt og kaloridekning slik konfiguratoren
faktisk regner dem ut for komplett tørrmat, ved dagens priser (før
justeringen i punkt 3):

| Personer | Vekt totalt | Kaloridekning | Vanndekning |
| ---: | ---: | ---: | ---: |
| 1 | 19,1 kg | ≥ 100 % | 100 % |
| 2 | 25,7 kg | ≥ 100 % | 100 % |
| 4 | 42,6 kg | ≥ 100 % | 100 % |
| 6 | 64,7 kg | ≥ 100 % | 100 % |
| 8 | 79,9 kg | ≥ 100 % | 100 % |

(Kaloridekningen skal alltid presenteres som **vår egen dimensjonering** —
2 200 kcal per person per døgn — aldri som et DSB-tall. DSB tallfester
ingenting utover de 20 literne vann per person, og det står trykt i
`konfigurator.js` sin egen kildekommentar nettopp for å hindre at noen glemmer
det.)

Vekttallene forklarer hvorfor esken må være flere kasser, ikke én stor boks:
80 kg vann og mat til en firepersonershusstand kan ikke bæres av én person i
trapp. Det er også derfor fraktkostnaden (punkt 7) er reell og ikke kan gjemmes
i produktprisen slik markedet gjør.

### Innkjøpsanslagene i tall — hva 4-personersboksen faktisk koster oss

| Modus × matnivå (4 personer) | Netto salg (dagens pris) | Innkjøpskost (0,6×anslag) | Dekningsgrad i dag |
| --- | ---: | ---: | ---: |
| Komplett · tørrmat | 5 082 kr | 4 190 kr | **17,5 %** |
| Komplett · langtidsmat | 8 081 kr | 6 388 kr | **21,0 %** |
| Matpåfyll · tørrmat | 2 022 kr | 1 417 kr | **29,9 %** |
| Matpåfyll · langtidsmat | 5 212 kr | 3 614 kr | **30,7 %** |

Disse fire tallene er beregnet med dagens katalogpriser, uendret, og de
bekrefter — uavhengig av `docs/innkjopsliste.md` — de intervallene
oppdragsgiver allerede har fastslått (15–17 %, 17–21 %, 28–30 %, 30–31 %).
Det er ikke en tilfeldighet at de stemmer: begge dokumentene leser samme
katalog med samme formel.

**Prisstrategien MÅ derfor ta stilling til nøyaktig det oppdraget krever:
enten prisene opp, eller innkjøpsfaktoren ned, eller begge.** Vi velger begge,
men vekter dem ulikt per husstandsstørrelse og per produktlinje — det er
kjernen i punkt 3.

---

## 3. Prispunkter

### Metode: en prisstige, ikke en flat økning

En jevn prosentvis økning på alle husstandsstørrelser var det første jeg
regnet på, og jeg forkaster den. Grunnen er punkt 1: ved 1 person er vi
allerede dyrest eller nest dyrest i markedet uten noen økning i det hele tatt,
mens ved 7–8 personer har vi **ingen konkurrent å måle oss mot** — ingen av de
tolv kartlagte butikkene dekker over 6 personer. Å øke prisen like mye overalt
betyr enten at vi priser oss ut av markedet ved 1–2 personer, eller at vi lar
verdifull margin ligge urørt ved 7–8.

I stedet setter jeg et **dekningsgradsmål per husstandsstørrelse**, lavest der
konkurransen er hardest og høyest der vi står alene, og løser prisen bakover:

```
k = innkjøpskost / (dagens netto × (1 − måldekningsgrad))
ny pris = dagens pris × k
```

Måltallene for komplett-pakken:

| Personer | Tørrmat, måldekning | Langtidsmat, måldekning | Begrunnelse |
| ---: | ---: | ---: | --- |
| 1 | 20 % | 15 % | Tettest konkurranse (beredskap1, hjemmeberedt). Vi tar minimumsmarginen, ikke mer. |
| 2 | 22 % | 18 % | Fortsatt tett marked (krisesikker, beredskap24 ved langtidsmat). |
| 3 | 25 % | 24 % | Halve markedet har ingen 3-personspakke i det hele tatt (se konkurrentanalysens faktasjekk). |
| 4 | 28 % | 28 % | Siste punkt der beredskap24 er en direkte referanse for langtidsmat. |
| 5 | 32 % | 32 % | Markedet tynnes ut — kun norberedt og beredskap1 går videre. |
| 6 | 33 % | 34 % | Kun to konkurrenter (norberedt, beredskap1) dekker i det hele tatt. |
| 7 | 34 % | 35 % | Ingen konkurrent. Vi setter prisen selv. |
| 8 | 35 % | 36 % | Ingen konkurrent. Vi setter prisen selv. |

Matpåfyll har et annet mål: den eneste referansen er hjemmeberedt.no, og
sourcingens egen anbefaling for firepersonspakken er å legge oss **15–25 %
under** deres pris (se `sourcing.txt`, varegruppe «meny»). Jeg bruker samme
logikk for alle størrelser: liten økning ved 1–2 personer (der marginen på
avstand til 999/1 799 kr er knappest), større ved 4 personer og oppover (der
avstanden til 3 299/4 299 kr er god).

### Komplett pakke, tørrmat

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | Pris per person |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 4 320 kr | 3 510 kr | 2 810 kr | 19,9 % | 4 320 kr |
| 2 | 5 010 kr | 4 090 kr | 3 190 kr | 22,0 % | 2 505 kr |
| 3 | 6 230 kr | 5 113 kr | 3 832 kr | 25,1 % | 2 077 kr |
| 4 | 7 070 kr | 5 823 kr | 4 190 kr | 28,0 % | 1 768 kr |
| 5 | 10 280 kr | 8 443 kr | 5 749 kr | 31,9 % | 2 056 kr |
| 6 | 11 900 kr | 9 790 kr | 6 558 kr | 33,0 % | 1 983 kr |
| 7 | 13 520 kr | 11 130 kr | 7 359 kr | 33,9 % | 1 931 kr |
| 8 | 14 450 kr | 11 914 kr | 7 754 kr | 34,9 % | 1 806 kr |

### Komplett pakke, langtidsmat

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | Pris per person |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 4 790 kr | 3 931 kr | 3 341 kr | 15,0 % | 4 790 kr |
| 2 | 6 260 kr | 5 200 kr | 4 268 kr | 17,9 % | 3 130 kr |
| 3 | 8 550 kr | 7 149 kr | 5 441 kr | 23,9 % | 2 850 kr |
| 4 | 10 570 kr | 8 875 kr | 6 388 kr | 28,0 % | 2 643 kr |
| 5 | 14 930 kr | 12 508 kr | 8 493 kr | 32,1 % | 2 986 kr |
| 6 | 17 740 kr | 14 889 kr | 9 834 kr | 33,9 % | 2 957 kr |
| 7 | 20 500 kr | 17 223 kr | 11 182 kr | 35,1 % | 2 929 kr |
| 8 | 22 570 kr | 19 002 kr | 12 148 kr | 36,1 % | 2 822 kr |

Legg merke til at 1- og 2-personerspunktene ligger under den formelle
20 %-grensa oppdraget setter (15,0 % og 17,9 %). Det er et bevisst valg, ikke
en glipp: som vist i punkt 1 er dette den eneste kombinasjonen i hele
sortimentet der en direkte konkurrent (beredskap24) setter et pristak vi ikke
kan komme under med akseptabel margin. Vi velger å ta en tynnere margin på et
lite volum (1–2-personershusstander som velger frysetørket er trolig den
minste kundegruppen i porteføljen) framfor enten å tape penger på hvert salg
eller å prise oss vekk fra beredskap24-segmentet helt. **Dette er også det
klareste argumentet i hele dokumentet for hvorfor Drytech-forhandleravtalen
(se punkt 2) må prioriteres foran alle andre leverandørsamtaler** — REAL
Turmat er 44 % av kostnaden i akkurat den pakken der marginen er tynnest.

### Matpåfyll, tørrmat

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad | Hjemmeberedts referanse | Avstand |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 900 kr | 776 kr | 539 kr | 30,5 % | 999 kr | 9,9 % under |
| 2 | 1 460 kr | 1 260 kr | 829 kr | 34,2 % | 1 799 kr | 18,8 % under |
| 3 | 2 160 kr | 1 872 kr | 1 190 kr | 36,4 % | — | (ingen referanse) |
| 4 | 2 620 kr | 2 266 kr | 1 417 kr | 37,5 % | 3 299 kr | 20,6 % under |
| 5 | 3 410 kr | 2 946 kr | 1 856 kr | 37,0 % | 4 299 kr | 20,7 % under |
| 6 | 4 070 kr | 3 523 kr | 2 212 kr | 37,2 % | — | (ingen referanse) |
| 7 | 4 620 kr | 3 996 kr | 2 504 kr | 37,3 % | — | (ingen referanse) |
| 8 | 5 110 kr | 4 422 kr | 2 767 kr | 37,4 % | — | (ingen referanse) |

### Matpåfyll, langtidsmat

| Personer | Pris inkl. mva | Netto eks. mva | Innkjøp eks. mva | Dekningsgrad |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 1 820 kr | 1 572 kr | 1 070 kr | 31,9 % |
| 2 | 3 360 kr | 2 909 kr | 1 907 kr | 34,4 % |
| 3 | 5 070 kr | 4 398 kr | 2 800 kr | 36,3 % |
| 4 | 6 610 kr | 5 740 kr | 3 614 kr | 37,0 % |
| 5 | 8 400 kr | 7 283 kr | 4 601 kr | 36,8 % |
| 6 | 10 030 kr | 8 700 kr | 5 488 kr | 36,9 % |
| 7 | 11 570 kr | 10 039 kr | 6 327 kr | 37,0 % |
| 8 | 13 100 kr | 11 372 kr | 7 162 kr | 37,0 % |

Ingen konkurrent selger langtidsmat som påfyll i det hele tatt, så det finnes
ingen ytre pristak å måle mot her. Marginen ligger bevisst høyere enn
20 %-kravet (32–37 %) fordi denne linjen skal bære abonnementsrabatten uten å
falle under 20 % netto — se regnestykket i punkt 5.

### Følsomhet: hva som skjer hvis innkjøpsanslaget bommer

Alle tallene over hviler på 0,6 × detaljpris. Her er hva som skjer med
dekningsgraden ved de foreslåtte prisene (4 personer) dersom den reelle
B2B-prisen viser seg å være en annen brøk av detaljprisen:

| Innkjøpsfaktor | Komplett tørrmat | Komplett langtidsmat | Matpåfyll tørrmat | Matpåfyll langtidsmat |
| --- | ---: | ---: | ---: | ---: |
| 0,70 (verre enn antatt) | 16,1 % | 16,0 % | 27,0 % | 26,5 % |
| 0,60 (samme som i dag) | 28,0 % | 28,0 % | 37,5 % | 37,0 % |
| 0,55 | 34,0 % | 34,0 % | 42,7 % | 42,3 % |
| 0,50 | 40,0 % | 40,0 % | 47,9 % | 47,5 % |
| 0,45 (best mulig forhandling) | 46,0 % | 46,0 % | 53,1 % | 52,8 % |

Med de nye prispunktene tåler vi at innkjøpsfaktoren blir *verre* enn dagens
anslag (0,70) og fortsatt lander over 16 % på komplett-pakken — mot
katastrofen i `docs/innkjopsliste.md` sin egen tabell, der 0,70 på **dagens**
priser ga 3 %. Det er selve poenget med å prise etter mål i stedet for å prise
etter kost pluss et fast påslag: prisstigen gir en buffer mot at anslaget er
feil, ikke bare mot at det stemmer.

---

## 4. Prisstigen

### Marginalprisen — det kunden faktisk sammenligner

Oppdraget spør konkret: Norberedt tar en flat 1 000 kr per ekstra person,
Røde Kors tar 750 kr flatt. Hva tar vi?

**Vi tar ikke et flatt beløp, og vi sier hvorfor.** En flat pris per ekstra
person later som at hver ny person koster butikken det samme å utstyre. Det
gjør de ikke: en radio, en dokumentmappe, et boksåpnerpar, en gaffateiprull og
et brannteppe følger husstanden, ikke personen. Jo flere personer den delte
kostnaden fordeles på, jo billigere blir person nummer to, tre og fire — helt
til utstyret treffer en fysisk grense (et stormkjøkken rekker fire personer,
en CO-varsler dekker ett rom) og et helt nytt sett må kjøpes. Da hopper prisen.

Beregnet marginalpris, komplett tørrmat, ved de foreslåtte prisene i punkt 3:

| Fra → til | Marginalpris | Hva som driver den |
| --- | ---: | --- |
| 1 → 2 | 690 kr | Kun mat, vann og én ekstra hodelykt. Radio, kokeapparat og eske er allerede kjøpt. |
| 2 → 3 | 1 220 kr | Vekttrinn i esken nærmer seg (Nødboks Mellom trer inn ved 3). |
| 3 → 4 | 840 kr | Fortsatt innenfor samme utstyrssett. |
| **4 → 5** | **3 210 kr** | **Stormkjøkken nummer to, CO-varsler nummer to og en ekstra pakke vannrensetabletter krysser terskelen samtidig** (alle bruker `ceil(personer/4)`). |
| 5 → 6 | 1 620 kr | Esken går fra to til tre kasser (Nødboks Stor). |
| 6 → 7 | 1 640 kr | Batteripakken krysser en `ceil(personer/6)`-terskel. |
| 7 → 8 | 910 kr | Ingen nye terskler. |

Snittet over de sju trinnene er **1 447 kr** — høyere enn Norberedts flate
1 000 kr, men formen er ikke flat, den er trappet. Vi **jevner ikke ut
5-persons-hakket kunstig**. Det ville vært akkurat den typen listetriks vi
kritiserer markedet for: beredskap1 later som utstyret skalerer og gjør det
ikke; vi skal ikke late som prisen er jevn når kostnaden ikke er det. I
stedet forklarer vi hoppet i produktteksten — «fra og med femte person følger
et helt ekstra stormkjøkken og en ekstra CO-varsler med, fordi ett sett ikke
rekker til fem» — som er nøyaktig den samme ærligheten posisjonen vår er bygget
på.

**Anbefaling til produktteamet (ikke en endring i denne omgangen, siden
oppdraget er avgrenset til prisdokumentet):** vurder om `co-varsler`,
`kokeapparat` og `aquatabs` bør skaleres med samme «gram/enhet per person»-logikk
som menyen allerede har (se `sourcing.txt`, varegruppe «meny», som fikset
akkurat dette problemet for maten: 623/626/584/593/585 kr per person for
4–8 personer, jevnt, i stedet for at ti kryddervarer hopper samtidig). Tre
utstyrslinjer som alle bruker `ceil(personer/4)` og krysser terskelen ved
nøyaktig samme husstandsstørrelse er det samme underliggende problemet menyen
løste, ikke løst for utstyret ennå. Det er et forslag til en annen økt — jeg
rører ikke `katalog.js` her.

### Hvor grensen går

Grensen for hvor langt prisstigen kan gå ned per person, er der marginen
treffer gulvet i punkt 3 (20 % ved 1 person, stigende). Vi lar ikke prisen per
person falle lenger enn kostnaden faktisk faller. Ved 8 personer er
prisen 1 806 kr per person mot 4 320 kr ved 1 person — en nedgang på 58 %,
mens innkjøpskostnaden per person i samme intervall bare faller 31 % (fra
2 810 til 969 kr per person). Differansen er nøyaktig den økende
dekningsgraden fra punkt 3 — vi gir ikke bort stordriftsfordelen, vi beholder
en økende andel av den, fordi det er nettopp i dette segmentet (6–8 personer)
vi står uten konkurranse og kan ta betalt for det.

---

## 5. Abonnementet

Dette er forretningsmodellen — ikke en tilleggstjeneste. Tolv av tolv
konkurrenter mangler den (konkurrentanalysens hull nr. 1), og det er den
åpningen som er lettest å forsvare av alle fire.

### Tre nivåer, ulik jobb

Katalogen har allerede tre nivåer i `PAFYLL`: gratis varsel (0 % rabatt),
årlig påfyll (10 % rabatt) og halvårlig påfyll (15 % rabatt). Prisstrategisk
gjør de tre forskjellige jobber:

- **Gratis varsel** koster oss ingenting å love og er selve tillitspunktet:
  vi er den eneste aktøren som sier fra når maten går ut. Den skal aldri
  prises — verdien er i engasjementet, ikke i transaksjonen.
- **Årlig påfyll** er hovedproduktet for tørrmat, fordi det treffer
  tørrmatens egen holdbarhet nesten nøyaktig (1 år, jf. `MATNIVAER`).
- **Halvårlig påfyll** er et nisjeprodukt for husstander som også vil ha
  meieriprodukter og annet med kort dato i samme forsendelse — ikke noe vi
  skal presse på de fleste.

### Regnestykket: hva rabatten faktisk koster oss

Abonnementsrabatten i `konfigurator.js` trekkes fra **etter** at mva er
beregnet på full pris (`sumMedAbonnement = sum − abonnementsrabatt`, mens
`mva`-feltet forblir uendret). Det betyr at hele rabatten i praksis går fra
vår netto margin, ikke fra avgiften. For en firepersoners tørrmat-påfyll
(2 620 kr, 37,5 % dekningsgrad før rabatt):

| Abonnement | Rabatt | Kundepris | Vår netto etter rabatt | Innkjøp | Dekningsgrad etter rabatt |
| --- | ---: | ---: | ---: | ---: | ---: |
| Ingen (engangskjøp) | 0 % | 2 620 kr | 2 266 kr | 1 417 kr | 37,5 % |
| Årlig påfyll | 10 % | 2 358 kr | 2 004 kr | 1 417 kr | 29,3 % |
| Halvårlig påfyll | 15 % | 2 227 kr | 1 873 kr | 1 417 kr | 24,3 % |

Dette er selve grunnen til at matpåfyllet prises med 30–38 % margin i punkt 3
i stedet for akkurat 20 %: **20 % var aldri målet for påfyllet — bufferen for
abonnementsrabatten er det.** Med bare 20 % margin før rabatt ville en
10 %-rabatt sendt oss rett under nullstreken. Med 37,5 % lander vi fortsatt
trygt over minimumskravet på 20 % selv etter rabatt, og godt over det på
årlig-nivået.

### Livstidsverdi — hvorfor abonnement er modellen

Regnet på en firepersoners tørrmatkunde, beregnet fra tallene over
(engangskjøp av komplett-boksen + påfyll):

| Kundetype | Profil | Netto driftsresultat, år 1 | Netto driftsresultat, år 5 | Netto driftsresultat, år 10 |
| --- | --- | ---: | ---: | ---: |
| Engangskunde | Kjøper komplett-boksen én gang, kommer aldri tilbake | 1 633 kr | 1 633 kr | 1 633 kr |
| Årlig abonnent | Komplett-boks + årlig påfyll (10 % rabatt) | 1 633 kr | **4 568 kr** | **7 503 kr** |
| Annethvert år | Komplett-boks + påfyll hvert annet år, lavere rabatt (se under) | 1 633 kr | 2 351 kr | **4 505 kr** |

En kunde som abonnerer årlig er verdt **4,6 ganger** en engangskunde etter
ti år — og differansen vokser hvert eneste år etter det, siden engangskunden
flater ut ved 1 633 kr for alltid mens abonnenten legger til ca. 587 kr netto
per år. Det er dette tallet — ikke prisen på selve boksen — som gjør
abonnement til forretningsmodellen og ikke bare en funksjon.

**Merk at katalogen i dag ikke har et eget «annethvert år»-nivå** —
`PAFYLL` har kun 365 og 182 dager. Tallet i tabellen over («annethvert år»)
er derfor et forslag basert på en lavere rabatt (5 % i stedet for 10 %, fordi
en sjeldnere kunde er en mindre forpliktet kunde), ikke et eksisterende
produkt. **Anbefaling:** legg til et fjerde `PAFYLL`-nivå for kunder som vil
ha lavere forpliktelse enn årlig, men mer enn bare varselet — det er en
produktendring i `katalog.js`, ikke noe jeg gjør i dette dokumentet, men
regnestykket over viser at det er verdt å bygge: selv ved halv frekvens og
halv rabatt er kunden 2,8 ganger mer verdt enn en engangskunde over ti år.

### Hvorfor abonnement er lite relevant ved langtidsmat — og hvorfor vi sier det høyt

Langtidsmat har fem års holdbarhet (`MATNIVAER.langtidsmat.holdbarhetAr`), mot
tørrmatens ett år. Et abonnement som fornyer seg hvert eller hvert annet år
ville betydd å kaste mat som ikke er i nærheten av å gå ut — det stikk
motsatte av hva DSB ber husstander gjøre («ha litt ekstra av den maten du
spiser til vanlig»), og det motsatte av hva vi selv kritiserer markedet for
(å selge mer enn kunden trenger).

Beregnet: en firepersoners langtidsmatkunde som fornyer hvert femte år (den
naturlige syklusen, ikke en påtvunget) gir et netto driftsresultat på
**8 347 kr over 20 år** mot engangskundens 2 487 kr — 3,4 ganger så mye. Det
er en reell, god forretning. Men sammenlignet med tørrmatabonnentens 8,2
ganger over samme periode, er det tydelig svakere som *abonnement* — fordi et
intervall på fem år knapt kvalifiserer som en abonnementsrelasjon i kundens
øyne. Det er ikke noe kunden «abonnerer» på; det er noe vi minner dem på én
gang hvert femte år.

**Derfor: for langtidsmat selger vi kun det gratis varselet, ikke et betalt
abonnement.** Når varselet går av (etter fire–fem år), er neste kjøp et
ordinært salg av matpåfyll, ikke en abonnementsfornyelse. Å late som
langtidsmat egner seg for abonnement — bare for å ha «abonnement» på alle
produktlinjer i markedsføringen — ville vært akkurat den typen
oppsalgslogikk konkurrentanalysen kritiserer resten av markedet for
(«ser bra ut i en innholdsliste», jf. sourcingens gjentatte «MARKERT SOM
OVERFLØD»-merknader). Vi sier heller: abonnement er tørrmatens forretning.
Langtidsmat er et enkeltkjøp med en ærlig påminnelse fem år fram i tid.

---

## 6. Momsen

Mat og vann-linjer er satt til 15 % mva (`MVA.mat`), alt annet — inkludert
**tomme vannkanner**, som er utstyr og ikke en drikkevare — til 25 %
(`MVA.standard`). Det er en bevisst, riktig avgiftsmessig vurdering allerede
gjort i `konfigurator.js`, ikke noe jeg endrer her.

### Hva det gjør med bruttomarginen ved samme påslag

For hver 100 kr kunden betaler: ved 15 % mva sitter vi igjen med 87,0 kr
netto; ved 25 % mva sitter vi igjen med 80,0 kr netto. Det er en forskjell på
7 prosentpoeng **før noe annet er regnet** — bare fordi avgiftssatsen er
ulik. Det er derfor matpåfyllet strukturelt vil vise en høyere dekningsgrad
enn komplett-pakken selv om vi la på nøyaktig samme prosentvise påslag på
begge: komplett-pakken har en betydelig andel 25 %-varer (radio, kokeapparat,
CO-varsler, eske, lys), mens matpåfyllet nesten utelukkende består av
15 %-varer (mat) pluss en liten andel 25 %-varer (vannrensetabletter, som er
kategorisert «Vann», ikke «Mat»).

Beregnet blandet mva-sats ved de foreslåtte prisene, 4 personer:

| Pakke | Blandet mva-sats | Hvorfor |
| --- | ---: | --- |
| Komplett tørrmat | ≈ 21,5 % | Stor andel utstyr (radio, kokeapparat, lys, CO-varsler, eske) til 25 % |
| Komplett langtidsmat | ≈ 19,6 % | Mer mat (frysetørket) trekker snittet mot 15 % |
| Matpåfyll tørrmat | ≈ 15,5 % | Nesten bare mat; aquatabs (25 %) er eneste utstyrslinje |
| Matpåfyll langtidsmat | ≈ 15,2 % | Samme, med dyrere matlinjer som forsterker mat-andelen |

### Hvorfor vi viser oppdelingen åpent

Fordi det er den eneste måten å gjøre forskjellen forklarlig for kunden: en
kunde som sammenligner «matpåfyll 37 % margin» mot «komplett 28 % margin» og
tror vi tjener mer på påfyllet, har rett — men av strukturelle avgiftsgrunner
like mye som av prisvalg. Å vise mva-oppdelingen i prispanelet (mat og vann
for seg, utstyr for seg) er ikke bare et tillitsgrep — det er nødvendig for
at tallene i det hele tatt skal henge sammen for en kunde som spør «hvorfor
er dette dyrere per krone innkjøpt enn det andre».

**Viktig funn å rette før lansering, ikke noe jeg endrer her:** katalogens
egen kildekommentar i `katalog.js` sier eksplisitt at `ui/bygger.js` i dag
grupperer prispanelets «Mat og vann» mot «Utstyr» ved å lete etter kategorien
`'Mat og vann'` — en kategori som ikke finnes i `VARER` (kategoriene er `Mat`
og `Vann` hver for seg). Konsekvensen er at **prispanelet i dag viser all mat
som utstyr**, ifølge samme kommentar. Skal punkt 6 i dette oppdraget faktisk
holde — «vis oppdelingen åpent i prispanelet» — må den feilen rettes i
`ui/bygger.js` før lansering. Det er et eget arbeid, utenfor dette
dokumentets fil, men det er en forutsetning for at momsargumentet over i det
hele tatt vises riktig til kunden.

---

## 7. Frakt og retur

### Hva markedet gjør

Konkurrentanalysen dokumenterer at fri frakt er normen i markedsføringen —
og at den ikke alltid stemmer med vilkårene. beredskap1.no lover «fri frakt
på alle beredskapspakker» i banneret, men fraktpolicyen gir gratis levering
kun til hentested. beredskapslager.no sier i FAQ at alt sendes med gratis
frakt, mens en annen side motsier det. Der fraktløftet *er* reelt
(krisesikker.no: fri frakt over 1 000 kr, 30 dagers åpent kjøp med gratis
returfrakt), er det bakt inn i produktprisen — noen betaler for det, og det
er ikke transportøren.

### Hva det koster å sende en boks på 35–80 kg

Ingen fraktavtale er innhentet i denne runden — tallene under er **anslag**
basert på generell kunnskap om norske pakkepriser for tunge forsendelser, ikke
observerte tilbud fra Bring, PostNord eller Instabox. De skal bekreftes med
reelle bedriftsavtaler før lansering.

Eskevalget i sourcingen (`SmartStore Dry 45`, én størrelse, skalert i antall
i stedet for i volum) gir en praktisk fordel her, tatt av andre grunner
(bæreevne, stablingsevne) men relevant for frakt: en firepersonersboks
(42,6 kg) leveres som «Nødboks Mellom» — to kasser à omtrent 20 kg hver, ikke
én 43-kilos kolli. Det holder hver enkelt pakke innenfor det ordinære
stykkgodsnettet (typisk 20–35 kg maksgrense per kolli hos Bring/PostNord)
uten å måtte over på pall/spedisjon, som er vesentlig dyrere og tregere. En
åttepersonersboks («Nødboks Stor», tre kasser, 79,9 kg totalt) blir tre
kolli, samme logikk.

Anslagsvis, uverifisert:

| Husstand | Antall kolli | Anslått frakt, sentralt strøk | Anslått frakt, distrikt/Nord-Norge |
| --- | ---: | --- | --- |
| 1–2 personer (1 kolli) | 1 | 250–450 kr | 400–700 kr |
| 3–5 personer (2 kolli) | 2 | 450–800 kr | 700–1 300 kr |
| 6–8 personer (3 kolli) | 3 | 650–1 100 kr | 1 000–1 800 kr |

**Anbefaling:** frakt beregnes ved kassen etter faktisk vekt og postnummer —
ikke som en flat sats og ikke subsidiert i varekosten. Innhent reelle
bedriftsavtaler fra minst to transportører (Bring og PostNord er de eneste
med stykkgodsnett som dekker hele landet inkludert Nord-Norge) før tallene
over erstattes med observerte priser.

### Hvorfor frakt hos kjøper er riktig, ikke bare pålagt

Oppdragsgiver har allerede besluttet dette, men det er verdt å si hvorfor det
er en fordel og ikke bare et sparetiltak: markedet reklamerer nesten
unisont med «fri frakt», og bærer dermed en reell, betydelig kostnad selv —
250–1 800 kr per boks etter tabellen over — inne i en dekningsgrad som
allerede er trang for oss (17–28 % på komplett-pakken, se punkt 3). Ved å la
kjøper betale frakt separat, forbedrer vi dekningsgraden vesentlig uten å
røre en eneste produktpris, og vi kan bruke det i posisjoneringen: **vi tar
ikke betalt for frakt gjennom varelinjene, slik markedet stort sett gjør.**
Det er en ærlig linje i kassen, ikke en skjult kostnad i produktprisen.

### Retur

Norsk angrerettlov gir uansett minst 14 dagers lovpålagt angrerett på
nettkjøp av fysiske varer — det er ikke noe en butikk kan love bort eller
forbedre bort, kun utvide. krisesikker.no observeres å tilby 30 dager med
gratis returfrakt; beredskap1.no *lover* 30 dager i markedsføringen, men den
formelle policyen nevner det ikke (konkurrentanalysens funn om sprik mellom
banner og vilkår).

**Anbefaling:** 30 dagers angrerett på uåpnet utstyr og eske (over det
lovpålagte minimumet, og i tråd med det eneste tallet i markedet som faktisk
er verifisert å holde — krisesikkers 30 dager), men **ikke** retur på åpnet
eller matpåfyll levert etter abonnementsavtale — av samme grunn som
matvarebutikker ikke tar i retur åpnet mat. Dette skal stå skrevet klart i
vilkårene, ikke bare i banneret, nettopp fordi konkurrentanalysen viser hva
som skjer når det ikke gjør det.

---

## 8. Hva vi ikke gjør

**Ingen gjennomstrekede førpriser. Ingen kunstige tilbud. Ingen nedtelling.**

Dette er ikke bare en stilfølelse. Sourcingen fant konkrete eksempler på
akkurat det mønsteret oppdraget advarer mot, hos en av leverandørene vi
selv kjøper fra: beredskapslager.no viser REAL Turmats «Beredskapspakke
Stor» til «5 199 kr (ned fra 6 005 kr)» og 42-pakningen til «4 299 kr (ned
fra 4 599 kr)» — permanente «førpriser» på produktsider vi har lest direkte i
denne sourcingrunden. Vi vet ikke om 6 005 kr og 4 599 kr noen gang var
reelle salgspriser eller om de er satt for å vise en rabatt, men mønsteret er
nøyaktig det oppdraget beskriver: en permanent «nedsatt» pris fra en førpris
ingen kan etterprøve.

Tre grunner til at vi ikke gjør det samme:

1. **Det er ulovlig i praksis, ikke bare uetisk.** Markedsføringsloven og
   Forbrukertilsynets praksis krever at en oppgitt førpris faktisk har vært
   den reelle salgsprisen over en sammenhengende periode rett før
   «tilbudet» — en permanent strøket pris som aldri har vært reell, er
   villedende prismarkedsføring og kan medføre pålegg fra Forbrukertilsynet.
   Det er ikke en risiko verdt å ta for en ny aktør som skal bygge tillit fra
   null.

2. **Det motsier hele posisjonen.** Hele denne strategien er bygget på at vi
   er ærlige der markedet ikke er det — om hva som er DSBs råd og hva som er
   vårt eget anslag (punkt 2), om hva som faktisk skalerer (punkt 4), om hva
   ting koster å sende (punkt 7). En falsk førpris på selve produktet ville
   vært den ene tingen som gjorde alt det andre umulig å tro på.

3. **Det ødelegger abonnementet.** En kunde som opplever én falsk rabatt ved
   førstegangskjøpet, stoler ikke på at «vi sier fra når maten går ut» er en
   ærlig påminnelse og ikke et nytt salgstriks to år senere. Punkt 5 viser at
   abonnementet er verdt 4,6 ganger et engangskjøp over ti år — det tallet
   forutsetter en kunde som stoler på oss over tid. En falsk førpris koster
   ikke bare det ene salget, den koster den relasjonen.

Prisene i dette dokumentet skal stå der de står, oppgis som de er, og endres
når vi faktisk endrer dem — ikke pyntes med en strøket linje ved siden av.

---

## Prioritert liste over det som må skje før disse tallene kan brukes i produksjon

1. **Reell B2B-pris fra Drytech/REAL Turmat**, ikke 0,6×-anslaget. Dette er
   den enkeltendringen som betyr mest, fordi REAL Turmat er 44 % av
   innkjøpskosten på den ene pakken (langtidsmat, 1–2 personer) der marginen
   i dag er under 20 %-kravet.
2. **Reelle fraktpriser** fra Bring og/eller PostNord bedriftsavtale — punkt
   7s tall er anslag, og fraktkalkylen i kassen kan ikke bygges på et anslag.
3. **Rett `ui/bygger.js`** slik at prispanelets mva-oppdeling faktisk viser
   mat og vann til 15 % og utstyr til 25 %, ikke all mat som utstyr (punkt
   6). Uten dette holder ikke løftet om åpen momsvisning.
4. **Vurder gram/enhet-basert skalering** for `co-varsler`, `kokeapparat` og
   `aquatabs`, som i dag alle hopper samtidig ved 5 personer (punkt 4) —
   samme problem menyen allerede løste for maten.
5. **Legg til et «annethvert år»-nivå i `PAFYLL`** for tørrmatkunder med
   lavere forpliktelsesvilje enn årlig (punkt 5).

Disse fem er produkt- og innkjøpsarbeid, ikke prisarbeid — men prisstrategien
over holder kun så lenge disse forutsetningene enten stemmer eller blir
rettet.
