# Leverandører og innkjøp

Sourcing-rapport for katalogen i `assets/js/data/katalog.js`. Alle priser er
hentet 20. september 2026. Dokumentet er skrevet for å kunne legges foran en
innkjøper uten muntlig forklaring, og det er derfor mer opptatt av hva vi
**ikke** vet enn av hva vi vet.

---

## 0. Les dette først: tre ting som ikke er i orden

Rapporten konkluderer positivt på produktvalg og negativt på tallgrunnlag. De
tre funnene under er viktigere enn resten av dokumentet til sammen.

**1. Vi har ingen reell innkjøpspris. Ikke på én eneste vare.**
Hver kjede vi fulgte ender i en innlogging eller en kundeavtale: Drytechs
`shop.drytech.no`, ASKO Servering, Orkla Storhusholdning, Ahlsell, Oslo Engros,
Biltema Bedrift. Samtlige `innkjop`-tall i katalogen er derfor **0,6 × billigste
observerte detaljpris** — en arbeidshypotese pålagt av oppdraget, ikke et
tilbud. Ett unntak: beredskapspermen, som er vår egen trykksak.

**2. Dekningsgraden på den komplette pakken er 22 %.**
`scripts/verifiser-katalog.mjs` regner den nå riktig — nettoomsetning eks. mva
mot vareforbruk eks. mva, ikke kundepris inkl. mva mot innkjøp eks. mva — og
advarer på hver eneste komplette pakke, i alle husstandsstørrelser. Til fire
personer ser det slik ut:

| Pakke (4 personer) | Kundepris inkl. mva | Netto eks. mva | Vareforbruk | **Dekningsgrad** |
| --- | ---: | ---: | ---: | ---: |
| Komplett · tørrmat | 13 124 | 10 663 | 8 309 | **22 %** |
| Komplett · langtidsmat | 14 422 | 11 792 | 9 135 | **23 %** |
| Matpåfyll · tørrmat | 2 653 | 2 297 | 1 595 | **31 %** |
| Matpåfyll · langtidsmat | 4 034 | 3 497 | 2 422 | **31 %** |

Tjueto prosent dekker ikke frakt, emballasje, svinn, retur og lønn. Det er ikke
en levedyktig margin på den komplette pakken. Tre ting kan fikse det, i
prioritert rekkefølge: (a) skaffe ekte innkjøpspriser — hvis 0,6-faktoren i
virkeligheten er 0,5, går komplett tørrmat fra 22 % til 35 %; (b) heve prisen,
som bryter prisbåndet oppdraget satte; (c) ta ut utstyr. Vi anbefaler (a), og at
ingenting trykkes eller lanseres før den er forsøkt.

Legg samtidig merke til mønsteret i tabellen: **påfyllet tjener klart bedre enn
boksen** — 31 % mot 22–23 %. Det er ikke et problem, det er forretningsmodellen.
Boksen er kundeanskaffelsen; abonnementet er inntekten. Ingen av de tolv
kartlagte konkurrentene tilbyr påfyll i det hele tatt.

**3. Rødsprit kan ikke sendes i en vanlig pakke.**
Kemetyl rødsprit er UN1170, klasse 3, og står på Postens liste over forbudt
innhold. Det samme gjelder gassbokser. Enten skaffer vi avtale om begrenset
mengde (LQ/ADR) med fraktleverandør, eller så leveres brenneren med beskjed om
å kjøpe to liter lokalt — og da må det stå på produktsiden, ikke oppdages ved
åpning. Dette er en forretningsbeslutning som må tas før lansering, ikke en
detalj. Se § 4.

---

## 1. Varegruppe for varegruppe

Kolonnen «Innkjøp» er eks. mva og er **anslag** overalt der ikke annet står.
Kolonnen «Detalj» er observert norsk butikkpris inkl. mva.

### Mat — felles for begge matnivåer

| Vare | Merke / modell | Detalj | Vår pris | Innkjøp | Kilde |
| --- | --- | ---: | ---: | ---: | --- |
| Knekkebrød 520 g | Wasa Husman, GTIN 7300400118408 | 29,90 | 30 | 17,95 | [Oda](https://oda.com/no/products/1612-wasa-knekkebrod-husman/) |
| Leverpostei 200 g | Stabburet Original, GTIN 07039010132435 | 24,90 | 25 | 14,95 | [Oda](https://oda.com/no/products/6535-stabburet-leverpostei-original/) |
| Kaviar 185 g | Mills | 37,20 ▲ | 37 | 22,30 | [Oda](https://oda.com/no/products/4819-mills-kaviar/) |
| Makrell i tomat 170 g | Stabburet | 34,90 | 35 | 20,95 | [Oda](https://oda.com/no/products/69867-stabburet-makrell-i-tomat/) |
| Nugatti 350 g | Orkla | 27,90 ▲ | 28 | 16,75 | [Oda](https://oda.com/no/products/1117-nugatti-nugatti-original/) |
| Melkesjokolade 200 g | Freia | 29,90 ▲ | 30 | 17,95 | [Oda](https://oda.com/no/products/269-freia-melkesjokolade/) |
| Mariekjeks 350 g | Sætre | 31,90 ▲ | 32 | 19,15 | [Oda](https://oda.com/no/products/66256-saetre-mariekjeks/) |
| Peanøtter 500 g | REMA 1000 | 40,30 ▲ | 40 | 24,20 | [Oda](https://oda.com/no/products/8732-r-peanotter/) |
| Rosiner 500 g | REMA 1000 | 55,50 ▲ | 55 | 33,30 | [Oda](https://oda.com/no/products/65770-r-rosiner/) |
| O'boy 450 g | Mondelez | 54,90 ▲ | 55 | 32,95 | [Oda](https://oda.com/no/products/463-oboy-oboy-original/) |
| Fruktcocktail 820 g | REMA 1000 | 31,20 | 31 | 18,70 | [Oda](https://oda.com/no/products/66103-r-fruktcocktail-i-sukkerlake/) |
| Havregryn 1,1 kg | Axa Bjørn Lettkokte | 26,90 | 27 | 16,15 | [Oda](https://oda.com/no/products/1035-axa-bjorn-lettkokte-havregryn/) |
| Middagshermetikk 800–870 g | Trondhjems, fire sorter | 62,40–73,70 (snitt 67,35) | 67 | 40,40 | [Oda](https://oda.com/no/products/13660-trondhjems-maxboller-i-tomatsaus/) |

▲ = pakkeprisen er **regnet ut** fra en observert porsjonspris, ikke lest av en
produktside. Se § 5.

Havregryn og middagshermetikk ligger i begge matnivåer, men med ulik rolle og
derfor ulikt antall. Til fire personer: to pakker havregryn og 17 bokser
hermetikk i tørrmat, mot fire pakker havregryn og seks bokser i langtidsmat. I
langtidsmat er havregrøt frokosten alle sju døgn, og hermetikken dekker de tre
middagene REAL ikke tar.

### Mat — kun langtidsmat

| Vare | Merke / modell | Detalj | Vår pris | Innkjøp | Kilde |
| --- | --- | ---: | ---: | ---: | --- |
| REAL Field Meal 700 kcal | Drytech AS, Tromsø | 129 | 129 | 77,40 | [Beredskapslager](https://www.beredskapslager.no/produkt/mat/turmat/real-field-meal-kylling-karri/) |

Fire porsjoner per person, altså fire av sju middager. Til fire personer er det
16 poser, 2 064 kr — 53 % av matkostnaden i langtidsmat og 14 % av kaloriene.
Det er den dyreste kalorien i katalogen: 0,18 kr/kcal, mot 0,08 for
middagshermetikk og 0,007 for havregryn.

### Vann

| Vare | Merke / modell | Detalj | Vår pris | Innkjøp | Kilde |
| --- | --- | ---: | ---: | ---: | --- |
| Vanndunk 10 l | Biltema art. 88-4110 | 59,90 | 51 | 35,95 | [Biltema](https://www.biltema.no/fritid/friluftsliv-og-camping/vannkanner/vanndunk-10-liter-2000058583) |
| Aquatabs 50 stk | Aquatabs | 149 | 127 | 89,40 | [Beredskapsvakten](https://beredskapsvakten.no/products/aquatabs-vannrensetabletter) |

### Matlaging

| Vare | Merke / modell | Detalj | Vår pris | Innkjøp | Kilde |
| --- | --- | ---: | ---: | ---: | --- |
| Stormkjøkken 25-1 UL | Trangia AB | 799 | 679 | 479,40 | [Clas Ohlson](https://www.clasohlson.com/no/Trangia-stormkjokken-25-1-UL/p/34-6993) |
| Rødsprit 1 l | Kemetyl T-röd | 79,90 | 68 | 47,95 | [Clas Ohlson](https://www.clasohlson.com/no/Kemetyl-rodsprit-1-liter-rengjoringsmiddel/p/34-9841) |
| Fyrstikker 10-pk | Nitedals / Biltema art. 37-680 | 12,90 | 11 | 7,75 | [Biltema](https://www.biltema.no/fritid/friluftsliv-og-camping/stormkjokken/) |

### Varme og lys

| Vare | Merke / modell | Detalj | Vår pris | Innkjøp | Kilde |
| --- | --- | ---: | ---: | ---: | --- |
| Hodelykt 250 lm | Biltema art. 24-0301 | 69,90 | 59 | 41,95 | [Biltema](https://www.biltema.no/fritid/Belysning/hodelykt/hodelykt-250-lm-2000067364) |
| Campinglykt 90 lm | Biltema art. 24-977 | 139 | 118 | 83,40 | [Biltema](https://www.biltema.no/fritid/Belysning/lykter/campinglykt-90-lm-2000041334) |
| AAA alkalisk 40-pk | Biltema art. 84-1382 | 79,90 | 68 | 47,95 | [Biltema](https://www.biltema.no/fritid/Belysning/hodelykt/) |
| Telys stearin 50-pk | Biltema art. 47-1676 | 59,90 | 51 | 35,95 | [Biltema](https://www.biltema.no/hjem/innredning-og-dekorasjon/lys-og-lyslykter/telys/telys-av-stearin-50-pakning-2000047849) |
| Nødteppe 140 × 220 | Biltema art. 40-495 | 29,90 | 25 | 17,95 | [Biltema](https://www.biltema.no/bil---mc/biltilbehor/sikkerhetsdetaljer/aluminiumsteppe-140-x-220-cm-2000042007) |

### Strøm og samband

| Vare | Merke / modell | Detalj | Vår pris | Innkjøp | Kilde |
| --- | --- | ---: | ---: | ---: | --- |
| Nødradio DAB+ | Denver SCD-2033, EAN 5706751088483 | 530 | 451 | 318 | [Batterionline](https://www.batterionline.no/denver-scd-2033-n-dradio-h-ndsving-solcelle-lygte-powerbank-fm-am-dab-bt) |
| Powerbank 10 000 mAh | **ikke valgt** | ~249 ✱ | 212 | 149,40 | — |

### Helse og hygiene, verktøy

| Vare | Merke / modell | Detalj | Vår pris | Innkjøp | Kilde |
| --- | --- | ---: | ---: | ---: | --- |
| Førstehjelpspakke | **ikke valgt** | ~299 ✱ | 254 | 179,40 | — |
| Hygienepakke | **ikke valgt** | ~149 ✱ | 127 | 89,40 | — |
| Beredskapspermen | Nødboks, egen trykksak | — | 199 | **49** (reelt) | trykkeanslag, 500 eks. |

✱ = **ingen navngitt vare, ingen kilde, ingen observasjon.** Se § 5.

### Esker

| Eske | Innhold | Opp til | Vår pris | Innkjøp |
| --- | --- | ---: | ---: | ---: |
| Nødboks Liten | 1 × 50 l kasse | 2 pers. | 249 | 149 ✱ |
| Nødboks Mellom | 2 × 50 l kasser | 5 pers. | 449 | 298 ✱ |
| Nødboks Stor | 3 × 50 l kasser | 8 pers. | 649 | 447 ✱ |

Eskestørrelsene er drevet av vekt, ikke volum: sju døgns tørrmat til fire
personer veier 29 kg, og en full 4-personers Nødboks veier 48 kg inklusive
tomme vannkanner og utstyr. Langtidsmat-utgaven veier 44 kg: hermetikken og
havregrynene tar igjen mye av det de frysetørkede posene sparer.

---

## 2. Leverandørkjeden

### Drytech AS — den eneste kjeden vi har helt kartlagt

| Ledd | Hvem | Kontaktvei |
| --- | --- | --- |
| Produsent | Drytech AS, Ørnevegen 110, 9015 Tromsø. Org. 986405178 | post@drytech.no, +47 77 60 03 00 |
| Forhandlerregistrering | Drytech selv — ingen mellomledd | [Registrering for norske forhandlere](https://realoutdoorfood.com/retailers/register-as-retailer-in-norway/) |
| B2B-butikk | `shop.drytech.no` | krever innlogging etter godkjenning |

Produsenten oppgir selv, sitat: «No binding period. No membership fee. No
purchase commitment.» Det er de gunstigste forhandlervilkårene vi fant i hele
kartleggingen, og selskapet er solid (206,4 MNOK i driftsinntekter, 20,8 MNOK i
driftsresultat, 2024). **Dette er første telefon som skal tas.**

### Øvrige kjeder — alle blokkert

| Vare | Produsent | Importør / grossist | Status |
| --- | --- | --- | --- |
| Trangia | Trangia AB, Sverige | **Ultimate Nordic AS**, kundeservice@ultimatenordic.no, 22 57 50 50 | Bekreftet norsk distributør direkte fra Trangias egen kontaktside. Forhandlerportal krever registrering. |
| Rødsprit | Kemetyl Norge AS, Henrik Ibsens gate 90, Oslo | Ahlsell Norge, art. 113478 | Ahlsell fører varen, men prisen er bak innlogging. |
| Leverpostei, Trondhjems, Nugatti, Sætre | Orkla Foods Norge | ASKO Servering; Orkla Storhusholdning (tlf. 22 06 27 92, kl. 9–12) | Begge krever kundeavtale. Engrosnett.no viser 28,31 kr inkl. mva for leverpostei — **dyrere enn butikk**, altså ingen reell engrosfordel der. |
| Øvrig dagligvare | diverse | ASKO, Oslo Engros | Priser bak innlogging. |
| Vannkanner, lykter, batterier, telys, nødteppe | Biltema (egenimport) | — | «Biltema Bedrift» er en **kredittkonto, ikke en engrosordning**: du handler til ordinær butikkpris på faktura. Ingen volumrabatt er nevnt noe sted. biltemabedrift@biltema.no |
| Nødradio | Denver A/S, Danmark | ingen nordisk distributør funnet | Ingen B2B-side. Må kontaktes direkte. |

To observasjoner verdt å ta med i forhandling:

- **Beredskapsbutikkene tar 50–140 % påslag på umerkede importvarer.**
  Krisesikker.no selger Denver SCD-2033 til 799 kr uten å nevne at det er en
  Denver; deres eget Shopify-felt oppgir `vendor: "Denver"` og samme EAN som
  Batterionline, som tar 530 kr. Food Force 21 måltider koster 879 kr hos
  Foodstuff og 1 355 kr hos Beredskapsvakten — samme varenummer, 54 % påslag.
- **Nordiska Plasts vannkanne koster 289 kr hos Beredskapsvakten og 389 kr hos
  Bole.** Spredningen viser at det finnes rom i marginen. Witre AS (org.
  933249352, Halden) er en norsk grossist som fører merket med eks.mva-priser,
  men foreløpig bare 5 l og 13 l — ikke 20 l-modellen.

Vi valgte likevel Biltemas 10-literskanne, fordi kjøpsargumentet ikke er pris:
en full 20-literskanne veier 21 kg og kan ikke bæres eller helles av et barn,
en gravid eller en eldre. Det er akkurat de som skal kunne hente sitt eget vann.

---

## 3. Hva som kan kjøpes norskprodusert

| Vare | Produksjonssted | Hva det er verdt |
| --- | --- | --- |
| **REAL Field Meal** | Tromsø (Drytech AS) | De fire varme middagene i langtidsmat-linjen: 53 % av matkostnaden, 14 % av kaloriene. |
| Leverpostei | Fredrikstad (Orkla Foods) | Norges mest spiste pålegg. |
| Trondhjems middagshermetikk | Orkla Foods Norge | Navnet gjør jobben alene. |
| Rødsprit | Kemetyl Norge AS, Oslo | Produksjonssted (Halden/Fredrikstad) er **ikke bekreftet** — ikke bruk i markedsføring uten kilde. |

**Hvorfor Drytech er verdt mer enn opprinnelsesmerket.** Argumentet er ikke
patriotisk, det er etterprøvbart, og det treffer der konkurrentene er svakest:

1. *Vi kan navngi fabrikken.* Fem av de tolv kartlagte aktørene selger
   komprimerte livbåtrasjoner (Seven Oceans, BP-ER) som «beredskapsmat». Vi kan
   si hvem som lager maten, hvor, og hva de ellers leverer til.
2. *Vi kan håndplukke rettene.* Drytechs egen beredskapspakke har 12 av 28
   middager med karri, chili, garam masala eller bacalao — 43 % av pakken er
   retter mange norske barn ikke spiser. Ved å kjøpe enkeltposer i stedet for
   ferdigpakke velger vi Pasta Bolognese, Lapskaus, Kjøttgryte, Taco Bowl og
   Kremet pasta med laks. Det er hele den barnevennlige posisjonen, og den er
   umulig hvis vi videreselger en ferdigpakke.
3. *Kort kjede gir fersk produksjonsdato.* Vi selger utløpsvarsling. Da må
   varen være fersk når den sendes, og det får vi bare ved å kjøpe fra
   produsenten.

**Og det vi ikke skal si.** Bransjens «25 års holdbarhet» gjelder ikke Real
Turmat. Drytech garanterer fem år fra produksjon og oppgir 5–7 år indikativt;
de 25 årene gjelder ReadyWise i Metallyte-poser i bøtte — en annen
emballasjeteknologi. Maksimal etterprøvbare påstand er *«fem års garantert
kvalitet fra produksjon»*. Tilsvarende: vi skal ikke gjenta produsentens
formulering om at 56 måltider er «familie på fire i én uke». Det er to måltider
per person per døgn, rundt 900 kcal — halv kost. Og kaloritallet Drytech selv
oppgir for Beredskapspakke Stor, 12 628 kcal, er nesten sikkert feil: delt på 28
gir det nøyaktig 451,0, som er middagssummen fra den *lille* pakken. Ikke
gjenbruk tallet uten skriftlig bekreftelse.

---

## 4. Åpne punkter som må lukkes før lansering

| # | Punkt | Konsekvens hvis ignorert |
| --- | --- | --- |
| 1 | **Ekte innkjøpspriser.** Start med Drytech-registrering. | Hele marginen er hypotetisk. |
| 2 | **Frakt av rødsprit** (UN1170). LQ/ADR-avtale, eller «kjøp lokalt»-instruks på produktsiden. | Vi selger et kokeapparat uten brensel og oppdager det i kassen. |
| 3 | **Velg powerbank, førstehjelp og hygienepakke.** Tre varer uten navngitt produkt. | 593 kr av 5 484 er ikke sourcet. |
| 4 | **Velg eskeleverandør.** Alle tre eskeprisene er anslag. | 449 kr av 5 484 er ikke sourcet. |
| 5 | **Mål brenntiden på campinglykta selv.** Biltema oppgir den ikke. | Hull i spesifikasjonen akkurat der vi lover ærlige tall. |
| 6 | **Vei vanndunkene.** Biltema publiserer ikke tomvekt; 0,7 kg er anslag. | Fraktvekten i katalogen er feil. |
| 7 | **Verifiser Aquatabs-styrken.** Selges i flere styrker under samme navn — er 50 tabletter til 1 l eller 20 l? | Vi trykker feil dosering på en vannrensetablett. |
| 8 | **Biltemas sortiment roterer raskt.** Hodelykt 24-981 → 24-0301, telys 47-1603 → 47-1676 er byttet nylig. | Fast innholdsliste på emballasje mot en leverandør som bytter artikkelnummer. |
| 9 | **Rett `ui/bygger.js`.** Momsoppdelingen ser etter kategorien `'Mat og vann'`; katalogen bruker `'Mat'` og `'Vann'` slik kontrakten krever. | All mat regnes som 25 % utstyr i prispanelet. Filteret skal være `['Mat','Vann'].includes(l.kategori)`. |

---

## 5. Observert kontra antatt — vare for vare

Dette er avsnittet oppdraget ba om å være ubehagelig tydelig på.

**Observert direkte på en produktside, med pris og varenummer (18 varer).**
Havregryn, knekkebrød, leverpostei, makrell i tomat, fruktcocktail,
middagshermetikk, REAL Field Meal, vanndunk 10 l, Aquatabs, Trangia 25-1 UL,
rødsprit, fyrstikker, hodelykt, campinglykt, telys, nødteppe,
nødradio, AAA-batterier. Disse er kontrollert mot kilden samme dag, og flere er
kryssjekket mot en annen butikk.

**Pakkepris regnet ut fra en observert porsjonspris (7 varer).**
Kaviar, Nugatti, melkesjokolade, mariekjeks, peanøtter, rosiner, O'boy.
Grunnlaget er en observert kroner-per-porsjon fra Oda, ganget opp til vanlig
pakkestørrelse. Aritmetikken er riktig, men **pakkeprisen er ikke lest av en
produktside.** Skal kontrolleres ved første innkjøp.

**Ingen kilde i det hele tatt (5 varer + 3 esker).**
Powerbank, førstehjelpspakke, hygienepakke og de tre eskene. Her er selv
«detaljprisen» et anslag om hva slike varer koster i Norge. Til sammen utgjør
de **1 042 kr av en 4-personers pakke på 5 484 kr — 19 % av varelinjen.**

**Alle `innkjop`-tall, uten unntak bortsett fra beredskapspermen.**
0,6 × detaljpris. Faktoren er pålagt av oppdraget og har ingen empirisk støtte i
noen av kildene. Reell dagligvaremargin ligger ofte lavere for grossist enn
0,6, og reell hardware-margin ofte høyere. Sensitiviteten er stor: endres
faktoren til 0,5, går dekningsgraden på komplett tørrmat fra 22 % til 35 %;
endres den til 0,7, faller den til 9 %.

**Holdbarhetstall.** Bare to er dokumenterte: leverpostei 1 800 dager ved 2–25 °C
(Matinfo, GTIN 07039010132435) og Real Turmat fem år garantert fra produksjon
(Drytechs eget hjelpesenter). Resten er anslag basert på varetype.

---

## 6. Ting vi bevisst ikke tok inn

Konkurrentene selger alt dette. Vi mener det er overflod — ting som ser sterkt
ut i en innholdsliste og ikke gjør nytte i sju døgn i en norsk husstand.

| Vare | Observert pris | Hvorfor ikke |
| --- | ---: | --- |
| Nødrasjon (Seven Oceans / BP-ER) | 59–84 kr/døgn | Billigst per kalori og lengst holdbarhet — og likevel den viktigste posten å avvise. Livbåtrasjonen er optimalisert for at en livbåt ikke har plass. En bod har plass. Et barn som får presset kjeksblokk til alle måltider i sju dager spiser den ikke, og da er 59 kr/døgn ikke billig, det er bortkastet. |
| Sagan Life vannfilter | 899–3 290 kr | Løser elvevann over lang tid. Et filter til 3 290 kr tilsvarer 68 liter lagringskapasitet i kanner. |
| Vannrensetabletter for 1 250 l | — | En firepersonershusstand trenger 80 liter. Et tall som selger, ikke et volum noen bruker. |
| ReadyWise 7 dager, «60 porsjoner» | 3 199 kr | 13 880 kcal / 60 = 231 kcal per «porsjon». Det er et mellommåltid. Krever dessuten 14,2 l vann — 71 % av én persons hele vannlager. |
| Toro «Rett i koppen» | 13,60 kr | 6,6 kcal per krone, dårligste kjøp i hele undersøkelsen. Ti poser gir en fin linje i innholdslista og 900 kcal. |
| Trondhjems Sodd | 48,40 kr | 395 kcal per boks. Kraft med kjøttbiter. Ser tradisjonelt norsk ut, metter ingen. |
| Campinglykt 1 500 lm, oppladbar | 299 kr | Stort lumen-tall, 1–8 timers drift, 7–8 timers ladetid fra en død stikkontakt. Ser best ut i lista, dårligst i bruk. |
| Trangias egen gassbrenner | 1 099 kr | Koster mer enn stormkjøkkenet den monteres i, og gjør det samme som en generisk 2 800 W-brenner til 499 kr. |
| Gassovn | 999 kr | DSB og forsikringsbransjen advarer eksplisitt mot frittstående gassovn som primær varmekilde over tid — kullosfare. Vi ville solgt produktet inn i nøyaktig den bruken produsenten advarer mot. Dessuten kan propan ikke sendes. |
| Ullpledd | 500–1 500 kr | DSB sier «pledd, dyner eller soveposer» fordi folk allerede eier dem. Å legge et ullpledd i esken er å selge kunden sofaen sin tilbake. |
| UHT-melk | 37,20 kr/l | Tatt **ut** av boksen, ikke bort fra menyen. Holdbarheten er 6–8 måneder mot resten av boksens ett år, og den ville alene styrt hele påfyllsyklusen. Selges heller som «ferskmodul» med eget halvårsvarsel. Konkurrenter som legger UHT-melk i en 25-årsboks har et problem de ikke har oppdaget. |

---

## 7. Første innkjøpsordre

**Ti komplette pakker til fire personer, tørrmat.** Salgsverdi 54 840 kr inkl.
mva, nettoomsetning 45 666 kr eks. mva.

| Antall | Enhet | Vare | Kost eks. mva |
| ---: | --- | --- | ---: |
| 150 | stk | Trondhjems middagshermetikk, fire sorter | 6 060 |
| 10 | sett | Trangia Stormkjøkken 25-1 UL | 4 794 |
| 10 | stk | Nødradio Denver SCD-2033 | 3 180 |
| 10 | stk | Nødboks Mellom (2 × 50 l kasse) | 2 980 |
| 80 | stk | Vanndunk 10 liter | 2 876 |
| 10 | sett | Førstehjelpspakke | 1 794 |
| 40 | stk | Hodelykt 250 lm | 1 678 |
| 10 | stk | Powerbank 10 000 mAh | 1 494 |
| 80 | stk | Leverpostei 200 g | 1 196 |
| 20 | stk | Kemetyl rødsprit 1 l | 959 |
| 50 | pakke | Wasa Husman knekkebrød | 898 |
| 10 | pakke | Aquatabs 50 stk | 894 |
| 10 | sett | Hygienepakke | 894 |
| 10 | stk | Campinglykt 90 lm | 834 |
| 40 | stk | Makrell i tomat 170 g | 838 |
| 40 | stk | Freia Melkesjokolade 200 g | 718 |
| 40 | stk | Nødteppe | 718 |
| 30 | stk | Mills Kaviar 185 g | 669 |
| 20 | pakke | Rosiner 500 g | 666 |
| 30 | pakke | Sætre Mariekjeks 350 g | 575 |
| 10 | stk | Beredskapspermen | 490 |
| 20 | pakke | Peanøtter 500 g | 484 |
| 10 | pakke | AAA alkalisk 40-pk | 480 |
| 10 | pakke | Telys stearin 50-pk | 360 |
| 20 | pakke | Axa Bjørn Havregryn 1,1 kg | 323 |
| 20 | stk | Nugatti 350 g | 335 |
| 10 | stk | O'boy 450 g | 330 |
| 10 | stk | Fruktcocktail 820 g | 187 |
| 10 | pakke | Fyrstikker 10-pk | 78 |
| | | **Kapitalbinding** | **37 779** |

**Dekningsbidrag på ti pakker: 7 887 kr** (45 666 − 37 779). Det skal dekke
frakt inn, frakt ut, emballasje, svinn og all arbeidstid. Det holder ikke, og
det er tallet som gjør § 0 punkt 1 til førsteprioritet.

**Merknader til bestillingen.**

- **Middagshermetikken er største enkeltpost (6 060 kr, 16 % av ordren).** 150
  bokser skal fordeles på fire sorter, rundt 38 av hver, og legges i menyen slik
  at ingen sort går igjen to døgn på rad.
- **Rødspriten (20 flasker) kan ikke fraktes med vanlig pakke.** Se § 0 punkt 3.
  Bestill den lokalt til pakkeriet, ikke som del av en samleordre.
- **Bestill ett eksemplar ekstra av vanndunk og campinglykt til måling.** Tomvekt
  og brenntid mangler, og begge skal trykkes i innholdslista.
- **Bestill mat sist.** Utstyret er holdbart; maten begynner å gå ut på dato den
  dagen den kommer inn på lager, og vi selger utløpsvarsling. Ordren bør derfor
  deles: utstyr og esker først, mat når de ti pakkene faktisk er solgt eller
  nær solgt.
- **Til sammenligning:** hjemmeberedt.no tar 3 299 kr for mat *og vann* alene til
  fire personer. Vår komplette pakke med samme mat, vann og alt utstyret ligger
  på 5 484 kr. Marginen skal ikke forsvares med lavere pris, men med at vi viser
  menyen, kaloriene og byttedatoen som de holder skjult.
