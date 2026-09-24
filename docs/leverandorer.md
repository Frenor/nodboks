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

**3. Vi kan ikke sende brennstoff i det hele tatt.**
Kokeapparatet er nå Trangia 25-5 HA med gassbrenner, ikke rødsprit. Det løser
ingenting fraktmessig: gassbokser er UN2037 og rødsprit UN1170, og begge står
på Postens liste over forbudt innhold. Enten skaffer vi avtale om begrenset
mengde (LQ/ADR) med fraktleverandør, eller så leveres brenneren med beskjed om
å kjøpe gass lokalt — og da må det stå på produktsiden, ikke oppdages ved
åpning.

Katalogen tar konsekvensen av dette allerede: den regner ut hvor mange døgn
maten rekker uten varme, og viser tallet i byggeren. Etter at REAL-andelen ble
redusert og hermetikk og havregryn kom inn, er det tallet seks til sju døgn i
begge matnivåer — mot fire til fem før. Det gjør beslutningen mindre akutt,
men ikke mindre nødvendig.

---

## 1. Varegruppe for varegruppe

Kolonnen «Innkjøp» er eks. mva. Alle innkjøpstall er **anslag** – 0,6 × observert
detaljpris – bortsett fra de to egne trykksakene, der kostnaden er et
trykkeanslag. Se § 0 punkt 1.

> **Tabellene under er generert fra katalogen.** Rediger dem ikke for hånd:
> kjør `node scripts/tall.mjs leverandorer --skriv`, så hentes de fra
> `assets/js/data/katalog.js` og `innkjop.local.json`. Denne seksjonen var
> tidligere et øyeblikksbilde fra en gammel commit, med tretten feil priser og
> seks varer som manglet helt. Den skal ikke kunne drive igjen.

<!-- GENERERT:tabeller -->

### Mat

| Vare | Merke / modell | Vår pris | Innkjøp | Kilde |
| --- | --- | ---: | ---: | --- |
| Wasa Husman knekkebrød, 520 g | Wasa (Barilla Norge) Husman 520 g, GTIN 7300400118408 | 30 | 17,95 | [kilde](https://oda.com/no/products/1612-wasa-knekkebrod-husman/) |
| Stabburet Leverpostei Original, 200 g | Stabburet (Orkla Foods Norge) Leverpostei Original 200 g, GTIN 07039010132435 | 25 | 14,95 | [kilde](https://oda.com/no/products/6535-stabburet-leverpostei-original/) |
| Mills Kaviar, 185 g | Mills Kaviar original, tube | 37 | 22,3 | [kilde](https://oda.com/no/products/4819-mills-kaviar/) |
| Stabburet Makrell i tomat, 170 g | Stabburet (Orkla Foods Norge) Makrell i tomat 170 g | 35 | 20,95 | [kilde](https://oda.com/no/products/69867-stabburet-makrell-i-tomat/) |
| Nugatti Original, 350 g | Nugatti (Orkla) Nugatti Original | 28 | 16,75 | [kilde](https://oda.com/no/products/1117-nugatti-nugatti-original/) |
| Freia Melkesjokolade, 200 g | Freia (Mondelez) Melkesjokolade 200 g | 30 | 17,95 | [kilde](https://oda.com/no/products/269-freia-melkesjokolade/) |
| Sætre Mariekjeks, 350 g | Sætre (Orkla) Mariekjeks | 32 | 19,15 | [kilde](https://oda.com/no/products/66256-saetre-mariekjeks/) |
| Peanøtter, 500 g | REMA 1000 / R Peanøtter salte | 40 | 24,2 | [kilde](https://oda.com/no/products/8732-r-peanotter/) |
| Rosiner, 500 g | REMA 1000 / R Rosiner | 55 | 33,3 | [kilde](https://oda.com/no/products/65770-r-rosiner/) |
| O'boy sjokoladedrikk, 450 g | O'boy (Mondelez) O'boy Original | 55 | 32,95 | [kilde](https://oda.com/no/products/463-oboy-oboy-original/) |
| Fruktcocktail i sukkerlake, 820 g | REMA 1000 / R Fruktcocktail i sukkerlake 820 g | 31 | 18,7 | [kilde](https://oda.com/no/products/66103-r-fruktcocktail-i-sukkerlake/) |
| Axa Bjørn Lettkokte Havregryn, 1,1 kg | Axa (Lantmännen Cerealia) Bjørn Lettkokte Havregryn 1,1 kg | 27 | 16,15 | [kilde](https://oda.com/no/products/1035-axa-bjorn-lettkokte-havregryn/) |
| Trondhjems middagshermetikk, fire sorter | Trondhjems (Orkla Foods Norge) Spaghetti a la Capri 870 g / Maxboller 825 g / Brun og lys lapskaus 800 g | 67 | 40,4 | [kilde](https://oda.com/no/products/13660-trondhjems-maxboller-i-tomatsaus/) |
| REAL Field Meal, 700 kcal – håndplukket utvalg | REAL Turmat / Drytech AS, Tromsø REAL Field Meal Full Meal 700 kcal | 129 | 77,4 | [kilde](https://www.beredskapslager.no/produkt/mat/turmat/real-field-meal-kylling-karri/) |
| Tett fôrboks, 5 liter, med datoetikett ✱ | Orthex SmartStore boks 5 l | 129 | 77,4 | — |

### Vann

| Vare | Merke / modell | Vår pris | Innkjøp | Kilde |
| --- | --- | ---: | ---: | --- |
| Vanndunk 10 liter, gjennomsiktig | Biltema Vanndunk 10 liter, art. 88-4110 | 60 | 35,95 | [kilde](https://www.biltema.no/fritid/friluftsliv-og-camping/vannkanner/vanndunk-10-liter-2000058583) |
| Aquatabs vannrensetabletter, 50 stk | Aquatabs Vannrensetabletter 50 stk | 149 | 89,4 | [kilde](https://beredskapsvakten.no/products/aquatabs-vannrensetabletter) |
| Vanndunk 10 liter til dyra | Biltema Vanndunk 10 l | 60 | 36 | — |
| Katadyn BeFree 1 liter vannfilter | Katadyn BeFree 1.0 L, EZ-Clean hulfibermembran 0,1 mikron | 799 | 479,4 | [kilde](https://www.arctic-fritid.as/produkt/friluftsliv/mat-og-turkjokken/vann-og-vannrensing/katadyn-befree-vannfilter-1l/) |

### Matlaging

| Vare | Merke / modell | Vår pris | Innkjøp | Kilde |
| --- | --- | ---: | ---: | --- |
| Trangia Stormkjøkken 25-5 HA med gassbrenner | Trangia + generisk gassbrenner Trangia 25-5 HA (hardanodisert) + gassbrenner 2800 W med gjengeventil EN 417 | 1 698 | 1 018,8 | [kilde](https://www.outnorth.com/no/trangia/25-5-ha-83496) |
| Fyrstikker, 10 esker | Nitedals / Biltema Fyrstikkeske 10-pakning, Biltema art. 37-680 | 13 | 7,75 | [kilde](https://www.biltema.no/fritid/friluftsliv-og-camping/stormkjokken/) |

### Varme og lys

| Vare | Merke / modell | Vår pris | Innkjøp | Kilde |
| --- | --- | ---: | ---: | --- |
| CO-varsler med display, batteridrevet ✱ | ikke valgt EN 50291-1-sertifisert CO-varsler for bolig | 349 | 209 | — |
| Petzl Actik Core hodelykt, 450 lumen | Petzl ACTIK CORE, 450 lm, CORE-batteri + 3 × AAA/LR03 | 574 | 344,4 | [kilde](https://campnord.no/produkt/tur-og-friluftsliv/hodelykter/petzl-actika-core-hodelykt/) |
| Ledlenser ML4 Warm Light lanterne | Ledlenser ML4 Warm Light, sort | 474 | 284,4 | [kilde](https://aktivvinter.no/ledlenser-ml4-warm-light-lanterne-black-25547) |
| AAA-batterier, alkaliske, 40-pakning | Biltema Batteri AAA alkalisk 40-pk, art. 84-1382 | 80 | 47,95 | [kilde](https://www.biltema.no/fritid/Belysning/hodelykt/hodelykt-250-lm-2000067364) |
| Telys av stearin, 50-pakning | Biltema Telys av stearin 50-pk, art. 47-1676 | 60 | 35,95 | [kilde](https://www.biltema.no/hjem/innredning-og-dekorasjon/lys-og-lyslykter/telys/telys-av-stearin-50-pakning-2000047849) |
| Nødteppe, 140 × 220 cm | Biltema Aluminiumsteppe 140 × 220 cm, art. 40-495 | 30 | 17,95 | [kilde](https://www.biltema.no/bil---mc/biltilbehor/sikkerhetsdetaljer/aluminiumsteppe-140-x-220-cm-2000042007) |

### Strøm og samband

| Vare | Merke / modell | Vår pris | Innkjøp | Kilde |
| --- | --- | ---: | ---: | --- |
| Sangean MMR-88 DAB nødradio | Sangean MMR-88 DAB (Survivor-serien), gul | 1 190 | 714 | [kilde](https://www.clasohlson.com/no/Sangean-sveiveradio-MMR88-DAB-USB,-solcelle-og-dynamo/p/31-8820) |
| Motorola Talkabout T42, toveisradio (2-pakning) | Motorola Talkabout T42 | 319 | 191,4 | — |
| Meshtastic-sett, ferdig satt opp (2 enheter) | Seeed Studio SenseCAP Card Tracker T1000-E | 1 798 | 1 078,8 | — |
| Anker PowerCore 20 000 mAh | Anker PowerCore 20000 | 659 | 395,4 | — |

### Helse og hygiene

| Vare | Merke / modell | Vår pris | Innkjøp | Kilde |
| --- | --- | ---: | ---: | --- |
| Lifesystems Waterproof førstehjelpssett | Lifesystems Waterproof First Aid Kit, art. LIFE-2020, 330 × 160 × 80 mm | 749 | 449,4 | [kilde](https://www.norsegear.no/life-2020-lifesystems-waterproof-first-aid-kit) |
| Cederroth 4-in-1 blodstopper | Cederroth (Essity) Blodstopper 1910 NO 4-in-1, art. CR201040 | 99 | 59,25 | [kilde](https://www.rodekorsforstehjelp.no/produkter/blodstopper-cederroth-1910-no-4-in-1-cr201040/) |
| Hygienepakke ✱ | Ikke låst – settes sammen av standardvarer Nødboks hygienesett | 149 | 89,4 | — |
| Bøttetoalett 22 liter med sete og lokk | Home And Beauty Bøttetoalett 22 l | 399 | 239,4 | — |

### Verktøy og dokumenter

| Vare | Merke / modell | Vår pris | Innkjøp | Kilde |
| --- | --- | ---: | ---: | --- |
| Leatherman Rev multiverktøy | Leatherman Rev, 14 funksjoner, 420HC rustfritt stål | 799 | 479,4 | [kilde](https://www.clasohlson.com/no/Leatherman-Rev-multiverkt%C3%B8y/p/Pr311725000) |
| Rulleringssettet | Nødboks Rulleringssettet, 1. utgave | 249 | 22 | [kilde](https://www.lasertrykk.no/) |
| Beredskapspermen ✱ | Nødboks Beredskapspermen, 1. utgave | 199 | 49 | — |

### Esker

| Eske | Opp til | Vår pris | Innkjøp |
| --- | ---: | ---: | ---: |
| Nødboks Liten – én kasse på 45 liter ✱ | 2 pers. | 299 | 179,4 |
| Nødboks Mellom – to kasser på 45 liter ✱ | 5 pers. | 598 | 358,8 |
| Nødboks Stor – tre kasser på 45 liter ✱ | 8 pers. | 897 | 538,2 |
| Nødboks Liten i aluminium – én Zarges-kasse ✱ | 2 pers. | 3 999 | 2 399,4 |
| Nødboks Mellom i aluminium – Zarges og matkasse ✱ | 5 pers. | 4 298 | 2 578,8 |
| Nødboks Stor i aluminium – Zarges og to matkasser ✱ | 8 pers. | 4 597 | 2 758,2 |

✱ = ingen navngitt produkt eller ingen observert kilde. **40 av 44 varer er sourcet.**
Gjenstår: Tett fôrboks, CO-varsler med display, Hygienepakke, Beredskapspermen.

<!-- /GENERERT:tabeller -->

**Havregryn og middagshermetikk ligger i begge matnivåer, men med ulik rolle.**
Til fire personer: to pakker havregryn og 17 bokser hermetikk i tørrmat, mot
fire pakker og seks bokser i langtidsmat. I langtidsmat er havregrøt frokosten
alle sju døgn, og hermetikken dekker de tre middagene REAL ikke tar.

**REAL Field Meal er fire porsjoner per voksenekvivalent** – fire av sju
middager. Til fire voksne er det 16 poser, 2 064 kr: 53 % av matkostnaden i
langtidsmat og 14 % av kaloriene. Det er den dyreste kalorien i katalogen, 0,18
kr/kcal, mot 0,08 for middagshermetikk og 0,007 for havregryn.

**Eskestørrelsene er drevet av vekt, ikke volum.** Sju døgns tørrmat til fire
personer veier 29 kg, og en full firepersoners Nødboks veier 48 kg med tomme
vannkanner og alt utstyret. Langtidsmat-utgaven veier 44 kg: hermetikken og
havregrynene tar igjen mye av det de frysetørkede posene sparer.

**Vi sender ikke brennstoff.** Kokeapparatet leveres med gassbrenner, men verken
gassboks eller rødsprit kan gå i en vanlig pakke. Se § 0 punkt 3. Katalogen
regner derfor ut hvor mange døgn maten rekker uten varme, og tallet vises til
kunden i byggeren.

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
| Leverpostei, Trondhjems, Nugatti, Sætre | Orkla Foods Norge | ASKO Servering; Orkla Storhusholdning (tlf. 22 06 27 92, kl. 9–12) | Begge krever kundeavtale. Engrosnett.no viser 28,31 kr inkl. mva for leverpostei — **dyrere enn butikk**, altså ingen reell engrosfordel der. |
| Øvrig dagligvare | diverse | ASKO, Oslo Engros | Priser bak innlogging. |
| Vannkanner, lykter, batterier, telys, nødteppe | Biltema (egenimport) | — | «Biltema Bedrift» er en **kredittkonto, ikke en engrosordning**: du handler til ordinær butikkpris på faktura. Ingen volumrabatt er nevnt noe sted. biltemabedrift@biltema.no |
| Nødradio | Sangean Electronics, Taiwan | Clas Ohlson (art. 31-8820) | Kjøpes over disk til 1 190 kr. Ingen norsk B2B-kanal funnet for Sangean direkte. |
| Petzl, Ledlenser, Leatherman, Katadyn, Lifesystems | diverse | Clas Ohlson, Campnord, AktivVinter, Norsegear, Arctic Fritid | Alle kjøpt som detaljvare. Ingen av dem er forhandlet som B2B ennå — det er punkt 1 i § 4. |

To observasjoner verdt å ta med i forhandling:

- **Beredskapsbutikkene tar 50–140 % påslag på umerkede importvarer.**
  Observasjonen står, selv om vi endte med å velge en annen radio:
  Krisesikker.no solgte Denver SCD-2033 til 799 kr uten å nevne at det er en
  Denver; deres eget Shopify-felt oppgir `vendor: "Denver"` og samme EAN som
  Batterionline, som tok 530 kr. Food Force 21 måltider koster 879 kr hos
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
| 2 | **Frakt av gass** (UN2037). LQ/ADR-avtale, eller «kjøp lokalt»-instruks på produktsiden. | Vi selger et kokeapparat uten brensel og oppdager det i kassen. |
| 3 | **Velg CO-varsler, hygienepakke og fôrboks.** Tre varer uten navngitt produkt. | 498 kr av 13 124 i en vanlig pakke, pluss 129 kr per kjæledyr. |
| 4 | **Velg eskeleverandør.** Alle seks eskeprisene er anslag, og Zarges-kassene er de dyreste enkeltpostene i katalogen. | 598 kr av en plastpakke, 4 298 kr av en aluminiumspakke. |
| 5 | **Verifiser Aquatabs-styrken.** Selges i flere styrker under samme navn — er 50 tabletter til 1 l eller 20 l? | Vi trykker feil dosering på en vannrensetablett. |
| 6 | **Vei vanndunkene.** Biltema publiserer ikke tomvekt; 0,7 kg er anslag. | Fraktvekten i katalogen er feil. |
| 7 | **Ledlenser ML4 var på forhåndsbestilling** med lager 10.10.2026 da den ble observert. | Vi lover en lanterne vi ikke får tak i. |
| 8 | **Biltemas sortiment roterer raskt.** Batterier, telys, nødteppe, fyrstikker og vanndunk kommer alle derfra, og artikkelnumre er byttet før. | Fast innholdsliste på emballasje mot en leverandør som bytter artikkelnummer. |
| 9 | **Boksåpner mangler i katalogen.** Spesifisert i `pakkesammensetning.md` med kilde (Coline, Clas Ohlson 44‑2732, 79,90 kr), men SKU-en finnes ikke. Et matpåfyll til fire har 34 bokser, minst 18 uten rivelokk, og ingen verktøyvarer i det hele tatt. | Kunden får maten, men kommer ikke inn i den. |
| 10 | **Bekreft trykkeprisen på rulleringssettet.** 22 kr per sett er kalkulatorpris; tolv kort × 500 sett er 6 000 kort, utenfor det kalkulatoren kunne teste. | Den høyeste dekningsgraden i katalogen hviler på et tall ingen har fakturert. |

**Lukket siden forrige utgave.** Powerbank, førstehjelpssett, hodelykt,
campinglykt, nødradio og multiverktøy hadde ingen navngitt vare; alle seks er nå
valgt og sourcet. Momsoppdelingen i `ui/bygger.js` som regnet all mat som 25 %
utstyr, er rettet — `mvaSats` ligger nå i `konfigurator.js` og brukes ett sted.

---

## 5. Observert kontra antatt — vare for vare

Dette er avsnittet oppdraget ba om å være ubehagelig tydelig på. Tallene er
bedre enn forrige utgave, og de er fortsatt ikke gode nok.

**Navngitt produkt med observert kilde: 40 av 44 varer.** Kjør
`node scripts/tall.mjs leverandorer` for den gjeldende listen — den regnes ut,
så den kan ikke bli utdatert slik forrige utgave ble.

**Uten kilde (4 varer).** Fôrboksen, CO-varsleren, hygienepakka og
beredskapspermen. For de tre første er selv detaljprisen et anslag om hva slike
varer koster i Norge. Beredskapspermen er vår egen trykksak, så der er
kostnaden et trykkeanslag og ikke en gjetning om butikkpris.

**Eskene.** Alle seks eskeprisene er anslag. Plastkassene er den mindre av
risikoene; Zarges-kassene er katalogens dyreste enkeltposter, og en feil på ti
prosent der flytter mer enn hele matbudsjettet.

**Pakkepris regnet ut fra en observert porsjonspris (7 varer).**
Kaviar, Nugatti, melkesjokolade, mariekjeks, peanøtter, rosiner, O'boy.
Grunnlaget er en observert kroner-per-porsjon fra Oda, ganget opp til vanlig
pakkestørrelse. Aritmetikken er riktig, men **pakkeprisen er ikke lest av en
produktside.** Skal kontrolleres ved første innkjøp.

**Alle `innkjop`-tall, med to unntak.** 0,6 × detaljpris. Faktoren er pålagt av
oppdraget og har ingen empirisk støtte i noen av kildene. Reell dagligvaremargin
ligger ofte lavere for grossist enn 0,6, og reell hardware-margin ofte høyere.
Sensitiviteten er stor: endres faktoren til 0,5, går dekningsgraden på komplett
tørrmat fra 22 % til 35 %; endres den til 0,7, faller den til 9 %. Unntakene er
de to trykksakene, der kostnaden er et trykkeanslag: beredskapspermen 49 kr og
rulleringssettet 22 kr.

**Holdbarhetstall.** Bare to er dokumenterte: leverpostei 1 800 dager ved 2–25 °C
(Matinfo, GTIN 07039010132435) og REAL Turmat fem år garantert fra produksjon
(Drytechs eget hjelpesenter). Resten er anslag basert på varetype. Merk at
pakkens korteste dato er ett år i **begge** matnivåer — brød, pålegg og kjeks
setter den, ikke de frysetørkede posene.

---

## 6. Ting vi bevisst ikke tok inn

Konkurrentene selger alt dette. Vi mener det er overflod — ting som ser sterkt
ut i en innholdsliste og ikke gjør nytte i sju døgn i en norsk husstand.

| Vare | Observert pris | Hvorfor ikke |
| --- | ---: | --- |
| Nødrasjon (Seven Oceans / BP-ER) | 59–84 kr/døgn | Billigst per kalori og lengst holdbarhet — og likevel den viktigste posten å avvise. Livbåtrasjonen er optimalisert for at en livbåt ikke har plass. En bod har plass. Et barn som får presset kjeksblokk til alle måltider i sju dager spiser den ikke, og da er 59 kr/døgn ikke billig, det er bortkastet. |
| Sagan Life og andre filter**systemer** | 899–3 290 kr | Løser elvevann over lang tid. Et filter til 3 290 kr tilsvarer 68 liter lagringskapasitet i kanner. Vi sender derimot et personlig filter: Katadyn BeFree 1 l til 799 kr, som er reserven når kannene er tomme og springen er urein – ikke et system for å gjøre elva til vannverk. |
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

> **Tabellen er generert.** `node scripts/tall.mjs leverandorer --skriv` henter
> den fra katalogen. Den forrige utgaven bestilte tjue flasker rødsprit vi ikke
> selger lenger, og bygde på en pakkepris som var under halvparten av dagens.

<!-- GENERERT:ordre -->

**10 komplette pakker til fire personer, tørrmat.** Salgsverdi 131 240 kr
inkl. mva, nettoomsetning 106 630 kr eks. mva.

| Antall | Enhet | Vare | Kost eks. mva |
| ---: | --- | --- | ---: |
| 40 | stk | Petzl Actik Core hodelykt, 450 lumen | 13 776 |
| 10 | sett | Trangia Stormkjøkken 25-5 HA med gassbrenner | 10 188 |
| 10 | stk | Sangean MMR-88 DAB nødradio | 7 140 |
| 170 | stk | Trondhjems middagshermetikk, fire sorter | 6 868 |
| 10 | stk | Katadyn BeFree 1 liter vannfilter | 4 794 |
| 10 | stk | Leatherman Rev multiverktøy | 4 794 |
| 10 | sett | Lifesystems Waterproof førstehjelpssett | 4 494 |
| 10 | stk | Anker PowerCore 20 000 mAh | 3 954 |
| 10 | stk | Nødboks Mellom – to kasser på 45 liter | 3 588 |
| 80 | stk | Vanndunk 10 liter, gjennomsiktig | 2 876 |
| 10 | stk | Ledlenser ML4 Warm Light lanterne | 2 844 |
| 10 | stk | Bøttetoalett 22 liter med sete og lokk | 2 394 |
| 10 | stk | CO-varsler med display, batteridrevet | 2 090 |
| 80 | stk | Stabburet Leverpostei Original, 200 g | 1 196 |
| 20 | stk | Cederroth 4-in-1 blodstopper | 1 185 |
| 60 | pakke | Wasa Husman knekkebrød, 520 g | 1 077 |
| 10 | pakke | Aquatabs vannrensetabletter, 50 stk | 894 |
| 10 | sett | Hygienepakke | 894 |
| 40 | stk | Mills Kaviar, 185 g | 892 |
| 40 | stk | Stabburet Makrell i tomat, 170 g | 838 |
| 30 | pakke | Peanøtter, 500 g | 726 |
| 40 | stk | Freia Melkesjokolade, 200 g | 718 |
| 40 | stk | Nødteppe, 140 × 220 cm | 718 |
| 20 | pakke | Rosiner, 500 g | 666 |
| 20 | stk | O'boy sjokoladedrikk, 450 g | 659 |
| 30 | pakke | Sætre Mariekjeks, 350 g | 575 |
| 10 | stk | Beredskapspermen | 490 |
| 10 | pakke | AAA-batterier, alkaliske, 40-pakning | 480 |
| 10 | pakke | Telys av stearin, 50-pakning | 360 |
| 20 | stk | Nugatti Original, 350 g | 335 |
| 20 | pakke | Axa Bjørn Lettkokte Havregryn, 1,1 kg | 323 |
| 10 | stk | Fruktcocktail i sukkerlake, 820 g | 187 |
| 10 | pakke | Fyrstikker, 10 esker | 78 |
| | | **Kapitalbinding** | **83 089** |

**Dekningsbidrag på 10 pakker: 23 541 kr** (106 630 − 83 089).
Det skal dekke frakt inn, frakt ut, emballasje, svinn og all arbeidstid.

<!-- /GENERERT:ordre -->

**Merknader til bestillingen.**

- **Hodelyktene er største enkeltpost.** Førti Petzl Actik Core er 13 776 kr,
  17 % av hele ordren. Det er prisen på premiumvalget, og den er verdt å se i
  øynene før den bestilles: en Biltema-lykt til 70 kr ville tatt posten ned til
  1 700 kr. Begrunnelsen for Petzl står i `sortiment.md` – utstyr kunden
  faktisk tar med på tur, og derfor stoler på – men den er en beslutning, ikke
  en selvfølge.
- **Middagshermetikken er største matpost.** 170 bokser skal fordeles på fire
  sorter, rundt 43 av hver, og legges i menyen slik at ingen sort går igjen to
  døgn på rad.
- **Ingen brennstoff i ordren.** Kokeapparatet kommer med gassbrenner, men
  gassboksene må kunden kjøpe lokalt. Det skal stå på produktsiden, ikke
  oppdages ved åpning. Se § 0 punkt 3.
- **Bestill ett eksemplar ekstra av vanndunk til måling.** Biltema publiserer
  ikke tomvekt, og 0,7 kg er anslag som går rett inn i fraktvekten.
- **Bestill mat sist.** Utstyret er holdbart; maten begynner å gå ut på dato den
  dagen den kommer inn på lager, og vi selger utløpsvarsling. Ordren bør derfor
  deles: utstyr og esker først, mat når pakkene faktisk er solgt eller nær solgt.
- **Fire varer har ingen innkjøpspris fra en navngitt kilde**: fôrboksen,
  CO-varsleren, hygienepakka og beredskapspermen. De tre første må velges før
  ordren sendes.
- **Til sammenligning:** hjemmeberedt.no tar 3 299 kr for mat *og vann* alene til
  fire personer. Vår komplette pakke med mat, vann og alt utstyret ligger på
  13 124 kr. Det er ikke samme produkt, og sammenligningen holder bare på
  matdelen: der ligger vi på 2 504 kr for mat og 1 428 kr for vann. Marginen
  skal uansett ikke forsvares med lavere pris, men med at vi viser menyen,
  kaloriene og byttedatoen som de holder skjult.
