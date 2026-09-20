# Sortimentsutvidelse: hva Nødboks skal bygge de neste tolv månedene

Dette dokumentet er en beslutningsgrunn, ikke en idéliste. Det forutsetter
`docs/profil.md` (posisjonen), `docs/konkurrentanalyse.md` (markedet),
`docs/pakkesammensetning.md` (stykklisten og begrunnelsene) og
`assets/js/data/katalog.js` (dagens sortiment), og gjentar dem ikke.

Fem akser er utforsket – nabopakker, moduler, turlinjen, B2B og tjenester – og
hvert forslag er kontrollert mot kilde etterpå. Kontrollen fant reelle feil.
De står i teksten der de hører hjemme, ikke i en fotnote.

Alle priser er observert norsk butikkpris inkl. mva. per 20.09.2026 med
navngitt forhandler, eller eksplisitt merket som anslag. Ingen leverandør har
gitt oss en reell B2B-pris ennå; `innkjop` er fortsatt 0,6 × billigste
observerte detaljpris, i tråd med `INNKJOPSFAKTOR` i katalogen.

---

## 1. Utgangspunktet

### Hva vi selger i dag

Ett produkt i to moduser. Komplett pakke – mat, vann, kokeapparat, lys, radio,
førstehjelp og esken de står i, skalert 1–8 personer – og matpåfyll for den som
har utstyret fra før. To matnivåer (tørrmat, langtidsmat), to kassetyper (plast,
aluminium), tre påfyllsnivåer der det ene er gratis.

Dekningsgraden er **22–23 % på komplett-pakken og 30–31 % på matpåfyll**,
praktisk talt likt på alle husstandsstørrelser. Firepersoners tørrmatboks i
plast koster kunden 12 471 kr og gir oss 2 230 kr i dekningsbidrag.

### Hva profilen forplikter oss til når vi utvider

De fire kravene fra kjernesortimentet gjelder uendret: en turgåer ville valgt
det, det holder i ti år, det virker i norsk vinter, det finnes i norsk handel
med reell forhandler. Og ett krav til, som bare gjelder utvidelser:

> **Det skal gjøre sortimentet skarpere, ikke bredere.**

Dette er ikke en høflighetsfrase. Sortimentsspredning er hvordan premium dør,
og det dør på en bestemt måte: hver enkelt vare er forsvarlig isolert, ingen av
dem bryter noen regel, og etter atten måneder er butikken en generell
friluftsbutikk med en beredskapsseksjon. Posisjonen vår er ikke «godt utstyr».
Den er «utstyr som er godt nok til at du bruker det ellers i året, satt sammen
så husstanden klarer sju døgn hjemme». Andre ledd er det som gjør oss til noe
annet enn XXL, og det er andre ledd som ryker først når sortimentet vokser.

Den praktiske testen er derfor: **kan varen begrunnes ut fra noe vi allerede
har skrevet ned?** Termosen kan det – den løser dag 5 i menyen, den bevisst
brennstoffrie dagen. Strømstasjonen kan det – den svarer på en begrensning vi
selv har innrømmet høyt i `pakkesammensetning.md` § 7. En kompasspakke kan det
ikke: DSBs sju-døgn-hjemme-scenario handler ikke om å finne veien.

### Marginlogikken i en utvidelse – og hvorfor den peker vekk fra varer

Dette er det viktigste enkeltmomentet i hele dokumentet, og det er lett å
overse: **under dagens prisregel lander enhver ny innkjøpt vare på 25 %
dekningsgrad.** Pris = observert butikkpris (R), innkjøp = 0,6 R, netto etter
mva = 0,8 R, dekningsbidrag = 0,2 R. Det gjelder termosen, radioene,
sitteunderlaget, strømstasjonen og spaden helt likt.

Marginen er altså ikke en rangeringsfaktor *mellom* varer. Men den er en
knallhard rangeringsfaktor mellom **varer og alt annet**:

| Type utvidelse | Dekningsgrad | Hvorfor |
| --- | ---: | --- |
| Ny innkjøpt vare, solgt enkeltvis | 25 % | Låst av 0,6 R-regelen |
| Vare inn i komplett-pakken | 22 % | Pakkerabatten på 6 % spiser 3 poeng |
| Matpåfyll | 30 % | Lav mva-sats, nesten bare mat |
| Beredskapspermen | **69 %** | Egen trykksak: 199 kr utsalg, 49 kr reell kostnad |
| Utløpsvarsling | – | Ingen varekost i det hele tatt |

Beredskapspermen er den eneste varen i hele katalogen med et ekte kostnadstall,
og den har tre ganger dekningsgraden til alt annet vi selger. Det er ikke
tilfeldig: det er hva som skjer når vi lager noe selv i stedet for å kjøpe det
inn. Tjenester har samme egenskap i enda sterkere grad.

**Konsekvens for rangeringen:** tjenester, egne trykksaker og nye salgsflater
for varer vi allerede har, slår nye varer på margin – hver gang, uten unntak.
De slår dem også på risiko, siden de ikke krever leverandørforhold, lager eller
UN-klassifisering. Rangeringen under følger dette, og ikke hvor stort noe
kunne blitt.

---

## 2. Den største åpningen

Kontrollen og konkurrentanalysen peker begge på det samme, og det er ikke en
vare.

**Konkurrentanalysen** rangerer gjenkjøp som hull nummer én av seks: tolv av
tolv aktører mangler abonnement og påfyll. Det er verifisert *negativt* – søk
på `selling_plan`, abonnement, påfyll, utløp og fornyelse ga null treff hos
alle tolv. Den ene som lover utløpsvarsling, norberedt.no, har ingen tjeneste
bak løftet.

**Kontrollen** ga høyest profilpassform (9 av 10) til å åpne den gratis
utløpsvarslingen for alle husstander, uavhengig av kjøp – og bekreftet at
tjenesten allerede finnes i `PAFYLL` i katalogen, til kr 0, med akkurat den
mekanikken.

Og **profilens egen logikk** sier det tredje gangen: mat familien faktisk
spiser har kortere holdbarhet, kortere holdbarhet krever påfyll, påfyll krever
at noen holder styr på datoene. Ingen gjør det i dag.

### Hva vi skal gjøre med den

Åpne varslingen for alle, ikke bare kunder. Brukeren legger inn hva de har
liggende og når det går ut; vi sender e-post når det nærmer seg. Ingen kjøp
kreves.

Begrunnelsen er marginlogikken over, snudd riktig vei. Vi gir bort noe som
koster oss ingenting i varekost, og det vi får tilbake er en liste over
husstander som har innrømmet – ved å bruke tjenesten – at de bryr seg om datoen
på maten sin. Det er den eneste kundelisten i dette markedet som er kvalifisert
på noe annet enn annonseklikk.

Og de kjøper inn i det riktige produktet. En årlig påfyllskunde er verdt
**2,7 ganger** en engangskunde over ti år (6 090 kr mot 2 230 kr i kumulativ
profitt, firepersoners tørrmat). Matpåfyll har 30 % dekningsgrad mot
komplett-pakkens 22 %. Den som kommer inn via varslingen, kommer inn i
abonnementstrakten – ikke i et engangssalg.

**Hva det koster:** ingen varekost. Utviklingsarbeid for en innmeldingsflate
uten kjøp, og en GDPR-riktig lagring av det folk legger inn. Det er billig å
drifte, ikke gratis å bygge riktig.

**Hva det gjør med posisjonen:** det er brukstesten anvendt på tjenestesiden.
Nyttig hver gang, ikke bare i en krise. Og det er den eneste utvidelsen i hele
dette dokumentet som ikke legger en eneste ny vare i sortimentet.

**Risiko, sagt høyt:** gratis for alle betyr supportvolum uten inntekt bak.
Tjenesten må være helt automatisk fra dag én, ellers vokser kostnaden med
brukertallet mens inntekten står stille.

---

## 3. Rangert veikart

Rangert etter profilpassform og marginlogikk. Ikke etter hvor stort noe kunne
blitt – B2B-sporet er det klart største markedet i dette dokumentet og ligger
likevel under strek.

### Gjør nå

**1. Åpne utløpsvarslingen for alle.** Se punkt 2. Koster utviklingstid, ingen
varekost. Kan ikke selges for noe, og skal ikke. Posisjon: lukker markedets
best dokumenterte hull og bygger den eneste kvalifiserte kundelisten i
kategorien.

**2. Turlinjen som presentasjonsgrep.** Gi fem varer vi allerede selger –
Petzl Actik Core (574 kr), Trangia 25-5 HA med generisk brenner (1 698 kr),
Leatherman Rev (799 kr), Ledlenser ML4 Warm Light (474 kr) og Katadyn BeFree
(799 kr) – egne produktsider med to faner: «På tur» og «I esken». Alle fem
priser er kontrollert mot `katalog.js` og stemmer.

*Koster:* null sourcing, null nye leverandører. Den reelle kostnaden er
utvikling: `konfigurator.js` og `ui/bygger.js` må kunne vise et enkeltprodukt
utenfor personantall-logikken, og fravalgsfilteret (`kategori !== 'Esken'`) må
utvides. Ikke trivielt.

*Selges for:* samme pris som i katalogen. Dekningsgrad 25 %, altså tre poeng
høyere enn i komplett-pakken, siden enkeltvarer ikke bærer pakkerabatten på
6 %.

*Posisjon:* dette er profilens hovedpåstand gjort etterprøvbar. Vi sier at
utstyret er godt nok til at du bruker det på tur. Å nekte å selge det til folk
som bare vil ha lykten, er å ikke tro på egen påstand. `hvorfor`-tekstene er
allerede skrevet – jobben er å gi dem en egen inngang.

*Kannibalisering:* reell i teorien, men det er nøyaktig den kunden
fravalgsfilteret allerede er bygget for. En som eier Petzl fra før skal ikke
måtte kjøpe den om igjen.

**3. Beredskapspermen som eget produkt, lansert i uke 44.** 199 kr utsalg,
49 kr trykkanslag ved 500 eksemplarer – **69 % dekningsgrad**, den klart
høyeste i sortimentet. Egenberedskapsuka 2026 er uke 44 (26. oktober–1.
november), og DSBs tema det året er bortfall av ekom, strøm og mobilnett. Det
er bekreftet.

*Koster:* et opplag og en produktside. *Posisjon:* en lavterskelvare som
skaper etterspørselen etter esken i stedet for å kannibalisere den, og som kan
markedsføres mot DSBs eget tema i stedet for et generisk budskap. Den reelle
konkurrenten er DSBs gratis PDF – forskjellen må være reell og konkret:
menyplan, utfyllbare skjemaer, spiralinnbinding som ligger flatt,
kontantkonvolutt.

*Fallgruve:* uke 44-tidspress kan skape et hastverkspreg profilen eksplisitt
forbyr. Ingen nedtelling, ingen lagerteller.

**4. Evakueringssekk.** Bergans Hugger 25 (749 kr, 25 l, 360 g, kontrollert
mot bergans.com) fylt med redusert mengde av varer vi allerede selger:
hodelykt, mini-førstehjelp, powerbank, Aquatabs, dokumentmappe – pluss ett tomt,
merket felt for det DSB selv kaller personlig og som ingen boks kan
dimensjonere: medisiner, briller, kontaktlinser.

*Koster:* én ny SKU og en mengdetabell. Ingen nye leverandørforhold.
*Selges for:* 749 kr for sekken alene (dekningsgrad 25 %), pluss innholdet.
*Posisjon:* dette er DSBs eget skille mellom «klare seg hjemme i sju døgn» og
«må forlate hjemmet på kort varsel», og ingen av de tolv kartlagte
konkurrentene skiller mellom å bli og å dra. Nesten alt innholdet er allerede
kvalitetstestet og prissatt.

*Åpent punkt:* mengdetabellen for redusert innhold er ikke spesifisert ennå.
Lagerstatus på sekken var uavklart ved kontroll og må bekreftes før innkjøp.

**5. Kommunikasjonsmodul.** Motorola Talkabout T42, PMR446, 2-pakning,
319 kr hos avxperten.no. Kontrollert: pris eksakt, på lager, 3–5 virkedagers
levering. Det eneste forslaget i hele dokumentet som besto kontrollen uten
forbehold.

*Koster:* én SKU, ett nytt leverandørforhold. *Selges for:* 319 kr,
dekningsgrad 25 %. *Posisjon:* lisensfritt, altså ingen søknad lagt på kunden.
VHF-alternativet (Biltema Komradio, 949 kr) ble forkastet fordi det krever
Nkom-tillatelse for bruk i Norge – bekreftet på Biltemas egen produktside. Det
er krav 5-disiplin i praksis.

*Forbehold:* avxperten.no bruker dansk VOEC-språk på den norske siden og må
bekreftes som reell norsk leveringspartner før fast opptak. Rekkevidden på 4 km
gjelder åpent terreng; det skal stå ærlig i produktteksten, samme prinsipp som
sveivtallet på nødradioen.

**6. Hyttepakke som konfigurasjonsvariant.** Ingen ny SKU. En avkrysning:
«denne esken skal til hytta» – bøttetoalett fravalgbart der det finnes utedo,
CO-varsler obligatorisk der det er vedovn.

*Koster:* en konfiguratorendring. *Selges for:* uendret pris. *Posisjon:*
hytta er det sterkeste brukstilfellet vi har – innholdet brukes hver gang
familien åpner hytta for sesongen, ikke hypotetisk. Ingen av de tolv
konkurrentene har en DSB-forankret hytteberedskap.

*Skal håndheves:* dette blir en variant, ikke en produktlinje med egen side og
eget budsjett. Blir det en linje, er det brudd på krav 5.

**7. To turlinje-tilvalg med lav billett.** Stanley Legendary Classic Bottle
1,4 l (603 kr hos milrab.no, kontrollert, på lager) og Therm-a-Rest Z Seat Sol
(429 kr hos fjellsport.no, kontrollert, på lager). Begge 25 % dekningsgrad.

Termosen har en ekte, allerede trykt begrunnelse: en termos fylt kvelden før
gir varm drikke på dag 5, den bevisst brennstoffrie dagen i menyen. Uten den
historien er det bare enda en termos, og da er det bedre å la være.

Sitteunderlaget er et grensetilfelle mot vår egen regel om at pledd, dyner og
soveposer er ting husstanden allerede eier. Et skum-sitteunderlag er forskjellig
nok til å holde, men produktteksten må si det eksplisitt, ellers leser det som
at vi bryter en regel vi selv har skrevet.

### Gjør senere

**8. Sanitærmodul – etter at én intern beslutning er tatt.** Dette er den
best dokumenterte åpningen i hele researchen: DSB beskriver metoden ordrett, og
null av tolv konkurrenter selger noe i kategorien overhodet. Prisene er
kontrollert og stemmer: Home And Beauty WC-bøtte 399 kr, Biolan bioposer
(komposterbare, EN 13432) 349 kr, sum 748 kr.

Den holder likevel ikke slik den står, av to grunner:

- **WC-bøtta er utsolgt** hos leverandøren, bekreftet ved egen kontroll.
- **Viktigere:** bøttetoalettet er dokumentert som kjernevare i
  `pakkesammensetning.md` (Toalettløsning, 399 kr, Home And Beauty), men
  **finnes ikke i `katalog.js`**. Katalogens faktiske sanitærløsning er en helt
  annen metode – dobbel søppelsekk i toalettskålen med kattesand som absorbent,
  inne i hygienepakken. Forslaget bygger altså på en vare vi ikke selger.

Beslutningen som må tas først er ikke om modulen skal lanseres, men om
bøttetoalettet faktisk skal inn i katalogen. Det er et avvik mellom to av våre
egne dokumenter, og det bør lukkes uansett.

*Når det er lukket:* modulen selges for 748 kr, 25 % dekningsgrad, og er den
utvidelsen med sterkest markedsargument i dokumentet. Et åpent punkt består:
vi fant ingen norsk forhandler av gelerende luktkontrollpulver. Det skal stå
som et hull, ikke fylles med et gjettet tall.

**9. Strømmodul.** EcoFlow River 3, 245 Wh LiFePO4, 300 W, 3,5 kg – 2 599 kr
hos Clas Ohlson (kampanje til 19.03.2027, normalpris 3 249 kr). Alle tall
kontrollert og korrekte.

Begrunnelsen er den beste i dokumentet etter sanitær: `pakkesammensetning.md`
§ 7 sier eksplisitt at powerbanken «dekker bevisst bare mobiltelefon og radio,
ikke kjøleskap, varmepumpe eller medisinsk utstyr som CPAP». Strømmodulen er
svaret på en begrensning vi allerede har innrømmet høyt. Det er § 6.1s
innrømmelse-før-påstand brukt riktig. Og det er ikke et aggregat: ingen
forbrenning, ingen CO-risiko, ingen av grunnene til at nødstrøm ble avvist.

Tre grunner til å vente:

- **Utsolgt.** Både River 3 og solcellepanelet (36-8823, 4 699 kr) er
  «Finnes ikke på lager» hos Clas Ohlson ved kontroll. Dette var ikke fanget
  opp i det opprinnelige forslaget.
- **Kampanjepris.** 2 599 kr utløper 19.03.2027. Prises varen etter observert
  butikkpris, flytter marginen seg 650 kr når kampanjen tar slutt.
- **Klasse 9-frakt.** LiFePO4 er UN 3480/3481, farlig gods klasse 9. Ikke
  fraktforbudt slik gass (UN1950) og rødsprit (UN1170) er, men det krever en
  fraktavtale som håndterer klasse 9 og riktig merking. Må avklares med
  fraktleverandør før varen legges i sortimentet.

Dette er også den utvidelsen som ligger nærmest grensen for å utvide framfor å
skjerpe: dyr, tung, ny varekategori, egen fraktavtale.

**10. Kollektivt innkjøp gjennom styret.** Ikke et nytt produkt – en
salgskanal. Styret sender ut en lenke, beboerne bestiller den eksisterende
katalogen, hver husstand betaler selv.

Vi skal **ikke** konkurrere med OBOS/Røde Kors direkte. Deres avtale (ca.
2 500 kr for to personer, 5 500 borettslag, 286 000 husstander, 10 % rabatt,
overskudd til Røde Kors' hjelpearbeid – alt kontrollert og korrekt) har et
argument vi aldri kan matche. Men den dekker bekreftet bare 1–3 personer, har
ingen påfyllsordning, og gjelder i praksis OBOS-forvaltede boligselskap. Det
etterlater husstander på fire og oppover, og hele USBL, TOBB og selvforvaltede
sameier.

*Koster:* ingenting i varelager. Salgsarbeid mot styrer, som er en salgssyklus
vi ikke har erfaring med – styremøter og årsmøter, ikke handlekurv.
*Posisjon:* uendret produkt gjennom ny dør. Består krav 5 trivielt.

**11. Fellesvannlager med årlig tilsyn – som tjeneste, ikke som vare.** DSB
anbefaler eksplisitt felles vannlager i borettslag og sameier, og ingen
konkurrent har et produkt for det. Bulklager av vanndunker (Biltema 88-4110,
59,90 kr – samme SKU som `vannkanne-10` i katalogen) pluss en årlig
tilsynsavtale med en rapport styret kan legge ved internkontrollen.

Her må vi være ærlige om noe: **vanndunkene i et fellesareal har ingen
turbruk.** Det er et unntak fra kjerneprinsippet, og det skal ikke pyntes bort.
Det som faktisk brukes utenom en krise, er tilsynsbesøket – en tjeneste styret
uansett trenger for internkontrollen. Dette skal derfor selges som en
tjenesteavtale og aldri markedsføres med brukstest-språket resten av katalogen
bruker.

Kan bundles med en **styreboks**: beredskapspermen (199 kr) og to Ledlenser
ML4 til trapperommet (2 × 474 kr) = **1 147 kr**, dekningsgrad 32,7 % fordi
permens ekte kostnad drar snittet opp. Skal aldri selges frittstående – da
forsvarer den ikke salgsarbeidet mot styret.

*Må avklares før lansering:* lekkasje til underliggende leilighet er et reelt
ansvarsproblem. Løses med dryppfat, plassering på gulv og skriftlig
ansvarsavklaring – men det må være på plass først.

### Gjør ikke

**Bilpakke.** Diagnosen er riktig: de to konkurrentene som selger dette
(norgesberedskap.no 2 999 kr / 20 komponenter, beredskap24.org 3 790 kr og
1 850 kr – alle kontrollert og korrekte) selger anonyme importvarer uten merke
som ligger ubrukt i bagasjerommet. Det er samme feil som en billigboks i boden,
flyttet til bilen.

Men vårt eget forslag holder ikke. Av fire varelinjer har **én** et faktisk
produkt: Clas Ohlson sammenleggbar spade 31-3347, 129,90 kr, 996 g – og den er
en anonym egenmerkevare uten kjent merke eller ettermarked. Den består altså
ikke merkevaretesten forslaget bygger hele argumentet sitt på, og den var
dessuten utsolgt ved kontroll. De tre andre – startkabel/powerbank, ullteppe,
istrekker – har ingen navngitte produkter i det hele tatt.

Dessuten innfører pakken tre varekategorier katalogen ikke har (startkabler,
tauverk, isskrape). Det er nøyaktig sortimentsspredningen krav 5 advarer mot.

**Ikke bygg.** Kan tas opp igjen hvis hver varelinje får et konkret,
merkevareforankret produkt med ettermarked – og en eventuell litiumstartkabel
sjekkes mot UN 3480/3481 og Wh-grensen for forsendelse.

**Hundesekk.** norgesberedskap.no har allerede den ansvarlige varianten
(1 499 kr, bag + dyre-førstehjelp + vannkanne, uten fôr – kontrollert). Det er
ikke et tomrom, det er gjort. Vårt forslag har ikke noe eget produkt å vurdere,
og er den svakeste koblingen til DSBs sju døgn av alt som er utforsket. Den er
der fordi den passer i kategorien. Parkeres.

**Ullsokker.** Kontrollen fant en feil i forslagets egen risikoavbøtning:
Devold Nansen herre (299 kr hos intersport.no) selges allerede i to størrelser
på samme produktside, så «vi selger bare én størrelse» er ikke en egenskap
produktet har – det er et aktivt kutt vi må gjøre. Varen var dessuten utsolgt.
Spørsmålet er uansett større enn denne ene varen: skal Nødboks ha et
klessortiment med størrelsesmatrise? Ingen vare i katalogen har størrelsesvalg
i dag. Det skal avgjøres bevisst, ikke smugles inn via ett produktforslag.

**Solcellelader.** Goal Zero Nomad 14+ (1 749 kr hos miltrad.no) er utsolgt hos
den eneste forhandleren vi har funnet, og består derfor ikke krav 4 akkurat nå.
Kontrollen avklarte riktignok den åpne UN-risikoen i vår favør – panelet har
ikke innebygd batteri og kan sendes fritt – men varen er smalest av alle i
segment og høyest i pris, og ligner mest på «vi selger det fordi vi kan».

**Kontinuitetsboks for bedrifter.** Null navngitte produkter, null priser, null
referansekunder, ukjent salgsprosess. Innkjøpsbeslutningen ligger hos noen som
optimerer for compliance-kost, ikke merkevare. Parkeres til punkt 10 og 11 er
bevist – ikke forkastes, men ikke startes parallelt.

**Gavekort og livshendelsespakker.** Forslaget oppga «299 kr eske + innhold for
1–2 personer», og det er feil bruk av et tall fra katalogen: 299 kr er prisen
på `eske-liten` (SmartStore Dry 45) alene, ikke en komplett pakke. Reell
enpersonspakke er 9 315 kr. Markedsgrunnlaget er dessuten selverkjent
ukartlagt, og forslaget tilfører ingen ny nytte – bare en ny leveranseflate for
et eksisterende produkt, som krever reell gaveflyt i checkout og fulfillment.
Ikke nå.

---

## 4. Per akse: hva som holder og hva som ikke gjør det

### Nabopakker

**Holder:** evakueringssekken og hyttepakken. Begge gjenbruker varer som
allerede er kvalitetstestet, begge dekker et scenario ingen av de tolv
konkurrentene skiller ut, og hyttepakken krever ikke en eneste ny SKU.

**Holder ikke:** bilpakken og hundesekken. Begrunnelse over.

**Feil som må rettes videre:** Norsk Brannvern «Hyttepakke trådløs» ble oppgitt
til 1 398,75 kr. Reell pris er **2 686,25 kr**, og produktet var utsolgt. Tallet
brukes bare som referanse for å vise at hyttemarkedet dekker brannsikkerhet og
ikke DSBs sju døgn, så konklusjonen står – men prisen må rettes overalt den
siteres.

### Moduler

Syv kandidater ble testet. Tre besto den første gjennomgangen, og kontrollen
felte to av dem på leverandørforhold:

| Modul | Status | Blokkering |
| --- | --- | --- |
| Kommunikasjon (PMR446) | **Holder uten forbehold** | Ingen |
| Sanitær | Holder som idé, ikke som forslag | Utsolgt + varen finnes ikke i katalogen |
| Strøm | Holder som idé, ikke som forslag | Utsolgt + kampanjepris + klasse 9-frakt |
| Vinter | Forkastet | Ville reversert vår egen trykte begrunnelse |
| Vann | Forkastet | Mer av det samme, skalerer allerede |
| Medisin | Forkastet | LUA-registrering hos DMP, uforholdsmessig |
| Barn | Forkastet | Allerede dimensjonert inn i hovedsortimentet |

Vintermodulen fortjener en egen merknad, fordi den er det reneste eksempelet på
hvordan krav 5 skal brukes: den ville lansert pledd, soveposer og ullplagg –
akkurat de varene `pakkesammensetning.md` eksplisitt holder utenfor fordi DSB
selv peker på at husstanden allerede eier dem. Å selge dem nå ville motsagt vårt
eget publiserte resonnement uten at én ny opplysning hadde endret det.

### Turlinjen

Hovedfunnet er at det viktigste turlinje-grepet ikke er nye produkter, men å
selge fem varer vi allerede har, enkeltvis. Det er høyest profilpassform i hele
utredningen (9), null sourcingrisiko og tre marginpoeng bedre enn i pakken.

To tilvalg holder (termos, sitteunderlag). To gjør det ikke (solcellepanel,
ullsokker) – begge utsolgt, og sokkene med en feil i sin egen risikoavbøtning.

Én markedspåstand må nedgraderes: at ingen av de tolv beredskapsbutikkene
selger enkeltvarer separat fra pakken, står ikke eksplisitt i
`konkurrentanalyse.md`. Det er en rimelig slutning fra tabellene der, men ikke
et observert funn, og det skal ikke brukes som salgsargument før det er
sjekket.

### B2B

Den mest forsvarlige aksen strukturelt – tre av fire forslag legger ingen ny
vare i sortimentet – og likevel den vi ikke skal prioritere først. Grunnen er
ikke at markedet er lite. Det er at salgssyklusen er en annen forretning:
styremøter, årsmøter, fakturering mot felleskostnader, tilbud og kontrakt. Et
underressurssatt B2B-spor sprer fokus på nøyaktig den måten profilen advarer
mot.

Rekkefølgen er derfor: kollektivt innkjøp først (lav risiko, ingen
varelagerendring), deretter tilsynsavtale pluss styreboks som ett tilbud – og
først etter at prisgrunnlaget er dokumentert og lekkasjeansvaret avklart
skriftlig.

**Feil som er rettet:** XL Tank 200 l ble oppgitt med «uklar mva-status». Den
er ikke uklar – kr 2 950–3 900 er **eks. mva.**, altså ca. 3 688–4 875 kr inkl.
Tanken er uansett bare et alternativ, ikke grunnlaget for noe anslag.

**Tall som er fjernet:** fellesvannlageret ble oppgitt med anslått pris
1 198 kr uten noen synlig utledning – verken antall dunker, tilsynshonorar
eller marginlogikk. Det står nå uten pris til en reell stykkliste foreligger.

### Tjenester

Sterkeste aksen samlet, og den eneste der marginlogikken ikke låser oss til
25 %. Utløpsvarslingen (9) og beredskapspermen alene i uke 44 (8) ligger begge
i «gjør nå».

**Førstehjelpskurs i samarbeid med navngitt leverandør** holder som idé og er
brukstesten overført fra utstyr til kompetanse: en trykkbandasje du aldri har
brukt, er en trykkbandasje du fomler med når det blør. Observerte priser:
forstehjelpskurs.com 5 295 kr fast for tre timer eller fra 430 kr per deltaker
i delt opplegg; 1hjelp.no 3 500 kr for to timer (kursene er
undervisningstjenester uten mva-plikt – formuleringen «inkl. mva» var upresis);
Norsk Folkehjelp Stavanger 1 800 kr/time pluss 40 kr materiell per deltaker.

To forbehold: vi holder ikke kurset selv og skal aldri markedsføre det som
«vårt kurs» – da påtar vi oss en sertifiseringspåstand vi eksplisitt sier vi
ikke har. Og markedspåstanden er ubekreftet: konkurrentanalysen kartla ikke
kurstilbud hos de tolv, så fravær kan ikke hevdes.

---

## 5. Hva vi ikke skal selge, og hvorfor

Dette avsnittet er like viktig som anbefalingene. Hver avvisning under er en
grense vi kan vise til neste gang noe «passer i kategorien».

**Småbarnspakke** (bleier, morsmelkerstatning, barnemat). Bleiestørrelse følger
barnets vekst over måneder, morsmelkerstatning har 12–18 måneders holdbarhet og
en merkeavhengighet foreldrene allerede har valgt selv. Bryter
ti-års-testen hardere enn noen annen vare vi har vurdert, og gjentar
dimensjoneringsfeilen vi allerede har avvist for jodtabletter: riktig mengde og
type krever en vurdering per barn, ikke per husstand.

**Eldre- og pleiepakke.** DSBs egen evakueringsliste plasserer briller,
kontaktlinser, rullator og høreapparat som personlige gjenstander nettopp fordi
de er individuelle. En generisk eldrepakke ville vært den boksen som garantert
ikke matcher den faktiske beboerens faktiske hjelpemidler.

**Båtpakke.** Markedet er dekket av spesialiserte båtbutikker med
SOLAS-godkjent utstyr. Den ene varen som faktisk ville differensiert en båtpakke
fra en bilpakke – nødbluss – er UN-klasse 1.3/1.4, eksplosiver, og kan ikke
sendes som ordinær pakke. En båtpakke uten pyroteknikk er bilpakken med et
maritimt klistremerke.

**Vintermodul.** Ville motsagt `pakkesammensetning.md` sin egen begrunnelse for
hvorfor pledd, dyner og soveposer bevisst er utelatt. Vedovnstilbehør som
smalere alternativ gjelder bare husstander med vedovn og er nisjespredning.

**Vannmodul.** Innholdet skalerer allerede med husstanden i katalogen. Mer av
det samme gjør sortimentet tyngre, ikke skarpere.

**Medisinmodul.** LUA-ordningen hos DMP gjør det lovlig å selge enkelte
reseptfrie legemidler utenom apotek, men å bli utsalgssted krever egen
registrering, aldersgrensekontroll ved nettkjøp og datovarslingslogikk på et
nytt varelager. En hel compliance-kategori for en marginal tilleggsvare, når
førstehjelpsbehovet allerede er dekket av Lifesystems-settet og
Cederroth-blodstopperen.

**Barnemodul.** Den funksjonelle jobben er gjort andre steder: hodelykt skalerer
fra seks år og aldri under to per husstand, campinglykten har bevisst varmt lys,
menyen inneholder Kvikk Lunsj og kjeks nettopp for at et barn ikke skal merke at
det er krise. En egen barnemodul ville blitt komfortvarer uten en tilsvarende
hard begrunnelse.

**Nytt vannfilter ved siden av Katadyn BeFree.** To konkurrerende vannfiltre i
samme sortiment er sortimentsspredning, ikke presisjon. Riktig løsning er å
selge BeFree separat.

**Eget turkokekar ved siden av Trangia.** Samme funksjon i annen størrelse.

**Kart og kompass.** Godt turprodukt, tvunget kobling. DSBs sju-døgn-hjemme
handler ikke om å finne veien.

**Innholdsrotasjon** (kunden returnerer mat nær utløp mot ny). Fraktmatematikken
dreper den: Norgespakke fra 76 kr under 5 kg og fra 140 kr under 35 kg hver vei,
og en tørrmatpakke til fire veier rundt 36 kg. To veier frakt på en vare vi
uansett ikke lovlig kan videreselge, siden vi ikke har kontroll på
lagringsforholdene. Dagens modell – vi sender ny, kunden spiser opp den gamle –
løser samme behov billigere.

**Lojalitetsprogram og poengstige.** Ligner rabattstige-taktikken vi selv
kritiserer, og kolliderer med forbudet mot kampanjesalgsestetikk i profilens
§ 8.

**Utleie av turutstyr.** Motsier tesen: kunden skal eie utstyret og bli kjent
med det. Utleie er en annen forretning med rengjørings-, skade- og
logistikkansvar.

**Egen forsikring eller utvidet garanti som finansprodukt.** Konsesjonspliktig
virksomhet under Finanstilsynet.

**Aggregat til fellesareal.** Enda høyere ansvar og kompleksitet enn det som
allerede ble avvist for privatbolig. Vi er et utstyrsfirma, ikke et
elektrikerfirma.

**Tilfluktsromutstyr og -sertifisering.** Sivilforsvaret regulerer og fører
register. Fagkompetanse og godkjenninger vi verken har eller kan dokumentere.

**Kommunalt anbud på beredskapsutstyr til innbyggere.** Vi fant ingen
dokumentasjon på at noen norsk kommune faktisk kjøper dette inn via anbud. Å
bygge strategi på et anbudsmarked vi ikke kan dokumentere finnes, ville vært
oppdiktede fakta.

**Lovpålagt HMS-førstehjelpsutstyr til bedrifter.** Dominert av etablerte
distributører som vinner på laveste compliance-kost via rammeavtaler. Ikke der
premium vinner.

**Jodtabletter og kjæledyrfôr, også i fellesskaps- og B2B-varianter.** Samme
begrunnelse som i kjernesortimentet. Avvisningen gjelder uansett kanal.

---

## 6. Forbehold

### Hvilke tall som er anslag

- **Alle innkjøpstall er anslag.** `INNKJOPSFAKTOR` er 0,6 × billigste
  observerte detaljpris. Ingen leverandør har gitt oss en reell B2B-pris ennå.
  Hvert dekningsgradstall i dette dokumentet arver den usikkerheten. Går reelt
  innkjøp ned mot 0,5–0,45, stiger dekningsgraden til 35–41 %.
- **Beredskapspermens 69 % er det eneste marginaltallet med reell kostnad
  bak** – 49 kr er et trykkeanslag ved 500 eksemplarer, ikke en observert
  faktura, men det er nærmere sannheten enn noe annet tall her.
- **Fellesvannlagerets pris er fjernet, ikke anslått.** Det opprinnelige
  forslaget oppga 1 198 kr uten utledning. Det står nå uten tall.
- **To priser er kampanjepriser med utløpsdato:** EcoFlow River 3 (2 599 kr,
  normalpris 3 249 kr, kampanjen går til 19.03.2027) og Stanley-termosen
  (603 kr, ned fra 849 kr). Prisregelen vår er observert butikkpris – når
  kampanjen tar slutt, flytter både pris og margin seg. Det må håndteres i
  produktteksten og ikke oppdages i regnskapet.

### Hva som ikke er verifisert

- **At ingen av de tolv beredskapsbutikkene selger enkeltvarer separat fra
  pakken.** Rimelig slutning fra `konkurrentanalyse.md`, men ikke et observert
  funn der. Skal ikke brukes i markedsføring før det er sjekket.
- **At ingen av de tolv tilbyr førstehjelpskurs.** Kurstilbud ble aldri kartlagt
  i konkurrentanalysen. Fravær kan ikke hevdes.
- **At ingen av de tolv har gavekortfunksjon.** Samme – ikke kartlagt.
- **DSBs evakueringsråd** er i denne runden hentet via en sekundærkilde
  (Gjensidiges gjennomgang), fordi dsb.no ga 403 ved direkte henting. Selve
  veilederen «Egenberedskap i borettslag og sameier» er derimot bekreftet
  direkte.

### Hva som må avklares før noe bestilles

1. **Bøttetoalettet.** Det står som kjernevare i `pakkesammensetning.md` og
   finnes ikke i `katalog.js`, som i stedet bruker dobbel-søppelsekk-metoden
   inne i hygienepakken. Dette avviket mellom to av våre egne dokumenter må
   lukkes før sanitærmodulen kan vurderes videre – og bør lukkes uansett.
2. **Lagerstatus, fem varer.** Utsolgt ved kontroll 20.09.2026: Home And Beauty
   WC-bøtte, EcoFlow River 3, EcoFlow solcellepanel 220 W, Clas Ohlson spade
   31-3347, Goal Zero Nomad 14+, Devold Nansen ullsokker. Bergans Hugger 25 ga
   uavklart lagerstatus. Ingenting bestilles på en utsolgt vare.
3. **Klasse 9-frakt.** Litiumbatteriet i strømmodulen er UN 3480/3481. Ikke
   fraktforbudt slik gass (UN1950) og rødsprit (UN1170) er, men det krever en
   fraktavtale som håndterer klasse 9 og riktig merking. Må være på plass før
   varen legges inn. Samme sjekk gjelder enhver startkabel- eller
   powerbankkombinasjon som senere vurderes.
4. **avxperten.no som norsk leveringspartner.** Bruker dansk VOEC-språk på den
   norske siden. Må bekreftes som reell norsk leverandør, ikke bare brukes som
   prisreferanse.
5. **Ansvarsavklaring for fellesvannlager.** Lekkasje til underliggende
   leilighet er et dokumentert ansvarsproblem. Dryppfat, gulvplassering og
   skriftlig avklaring med styret må på plass før tilbudet gis.
6. **GDPR for åpen utløpsvarsling.** Vi vil lagre hva folk har i boden og når
   det går ut, for husstander som ikke er kunder. Behandlingsgrunnlag,
   lagringstid og sletterutine må være avklart før tjenesten åpnes.
7. **Norsk Brannvern-prisen.** 2 686,25 kr, ikke 1 398,75 kr. Rettes der den
   siteres.
8. **Gelerende luktkontrollpulver.** Ingen norsk forhandler funnet. Den reelle
   differensieringen i sanitærmodulen mangler dermed et siste produkt. Står som
   åpent punkt og fylles ikke med et gjettet tall.
