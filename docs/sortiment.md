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

Syv kandidater ble testet i første runde. Tre besto den første gjennomgangen, og
kontrollen felte to av dem på leverandørforhold. En åttende – LoRa og mesh – ble
reist etterpå og er vurdert for seg rett under tabellen:

| Modul | Status | Blokkering |
| --- | --- | --- |
| Kommunikasjon (PMR446) | **Holder uten forbehold** | Ingen |
| Kommunikasjon (LoRa/mesh) | Forkastet for husstandsboksen | Krav 6: app og kanaloppsett før enheten sier et ord. Ingen norsk handel, og ingen noder i nabolaget for de fleste |
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

### LoRa og mesh-kommunikasjon

> **Beslutning, 20. september 2026.** Oppdragsgiver har overprøvd anbefalingen
> under og valgt å tilby Meshtastic som **tillegg** i pakkebyggeren. Begrunnelsen
> er en vurdering analysen ikke kan avgjøre: at MQTT- og Meshtastic-miljøet i
> Norge er i vekst, og at nodetettheten som feller forslaget i dag ikke
> nødvendigvis gjør det om to år.
>
> Analysen under står uendret, fordi innvendingene er reelle uansett hvilken vei
> miljøet går. Den er nå et krav til hvordan produktet må utformes, ikke et
> argument mot å ha det:
>
> - **Vi leverer enhetene ferdig konfigurert** – region, kanal og den frekvensen
>   det norske miljøet faktisk bruker, ikke fabrikkinnstillingen som kolliderer
>   med norske AMS-målere. Det er det som svarer på krav 6, og det er samtidig
>   det eneste som skiller oss fra å kjøpe direkte fra Shenzhen.
> - **De tre forbeholdene står i selve valgkortet**, ikke i en fotnote: at det er
>   tekst og ikke tale, at rekkevidden avhenger av hvem andre som har utstyret,
>   og at nettet er tynt nord for Trøndelag. Å selge dette uten dem ville vært
>   nøyaktig det vi kritiserer markedet for.
> - **Det er et tillegg, ikke standard.** Ingen får det uten å be om det.
>
> **Importøransvaret er avklart.** Enhetene kjøpes fra forhandler innenfor EØS.
> Da er det forhandleren som er importør etter radioutstyrsdirektivet og bærer
> CE-merking, samsvarserklæring og dokumentasjonsplikten. Nødboks er distributør,
> og plikten vår er lettere, men ikke null: vi skal kontrollere at CE-merke og
> norsk eller engelsk bruksanvisning følger med, ikke selge utstyr vi har grunn
> til å tro ikke er i samsvar, og kunne opplyse hvem vi kjøpte fra i ti år.
>
> Det siste er verdt å merke seg fordi det påvirker en praktisk ting: vi
> konfigurerer enhetene før forsendelse. Å endre frekvens og kanal innenfor det
> enheten allerede er godkjent for er bruk, ikke en endring av produktet – men
> fastvareoppdatering til en versjon produsenten ikke har samsvarsvurdert ville
> vært noe annet. Vi setter opp, vi flasher ikke.


**Kortsvaret er nei.** Kommunikasjonsmodulen forblir Motorola Talkabout T42
(PMR446, 319 kr). LoRa er lovlig uten søknad – det er ikke der problemet ligger
– men enheten må pares med en telefon-app over Bluetooth, få riktig region og
riktig kanalnøkkel før den sier et ord, og i Norge dessuten flyttes bort fra
fabrikkfrekvensen for å nå noen i det hele tatt. Det er beredskapsutstyr som
krever konfigurasjon når det gjelder, og det er nøyaktig det krav 6 er skrevet
for å stoppe.

Spørsmålet fortjener likevel et helt avsnitt, fordi anledningen er ekte:
Egenberedskapsuka 2026 har bortfall av ekom som tema, bekreftet på dsb.no. Men
DSBs eget svar på det temaet er kommunale informasjonspunkter og DAB-radio, ikke
node-til-node-meldingsradio for enkelthusstander. Vi kan altså ikke hekte LoRa
på DSB-forankringen. Hadde vi solgt det, måtte begrunnelsen båret seg selv – og
den gjør den ikke.

#### Regelverket: lovlig, og det er ikke problemet

LoRa på 868 MHz er fribruk i Norge, uten søknad og uten individuell
Nkom-tillatelse. Hjemmelen er fribruksforskriften (FOR-2012-01-19-77) § 8. Det
gir LoRa samme rettslige status som PMR446, og en helt annen enn VHF, som ble
forkastet i punkt 5 nettopp fordi Nkom-tillatelsen ville lagt en søknadsprosess
på kunden. Den innvendingen gjelder ikke her.

Begrensningene er tekniske, ikke administrative:

- **Effekt og sendetid er delt i underbånd.** 862–868,6 MHz og deler av
  869,2–870 MHz gir maks 25 mW e.r.p. med 0,1–1 % sendetid. 868,6–868,7 og
  869,2–869,4 MHz (trygghetsalarmer) gir 10 mW. Det gunstigste underbåndet,
  869,4–869,65 MHz, gir 500 mW e.r.p. og 10 % sendetid. Meshtastics europeiske
  standardprofil sender på 869,525 MHz og er bygget for å holde seg innenfor
  nettopp den 10 %-grensen.
- **Sendetidsgrensen gjelder per enhet og teller videresendt trafikk.** Det
  finnes ingen bestemmelse som forbyr mesh-relé – reglene bryr seg bare om
  effekt og sendetid – men en node som relayer for mange andre nærmer seg taket
  lettere enn én PMR446-samtale gjør. MeshCore-protokollen har 50 % airtime som
  standard og ligger dermed langt over grensen; Meshtastics EU_868 gjør det
  ikke, så lenge kunden ikke selv velger feil regionprofil.
- **Kryptering er lov.** AES-256 på kanalnivå er innenfor fribruksforskriften.
  Forbudet mot kodede meldinger gjelder amatørradiobåndene, ikke dette.

Det som faktisk ville kostet oss noe, er to ting til:

**Importøransvaret.** Salg krever CE-merking etter radioutstyrsdirektivet
(2014/53/EU, gjennomført i FOR-2016-04-15-377). Kjøper vi maskinvaren direkte
fra en produsent utenfor EØS – som er den vanlige kanalen i dette markedet –
blir Nødboks selv rettslig importør og arver fullt samsvarsansvar: teknisk
dokumentasjon og samsvarserklæring bevart i ti år, CE-merking på produkt og
emballasje, eget navn og adresse på varen. Kjøper vi gjennom en EØS-etablert
distributør som allerede har gjort jobben, reduseres det til å verifisere at
dokumentasjonen følger med – altså samme situasjon som PMR446 hos en etablert
forhandler. Forskjellen mellom de to kanalene er reell og må tas før første
innkjøp, ikke etter.

*Valgt 20.09.2026: EØS-forhandler. Vi blir distributør, ikke importør. Se
beslutningsboksen øverst i dette avsnittet for hva plikten da faktisk er.*

**Frakten er derimot ikke et problem.** Litiumbatteriene i en LoRa-håndenhet
ligger typisk på 4–20 Wh og faller inn under særbestemmelse 188, som unntar små
batterier montert i utstyr fra full klasse 9-behandling. De kan sendes som
ordinær pakke med litiummerking, uten egen fraktavtale for farlig gods. Postens
egne vilkår krever at batteriet sitter montert, er kortslutningssikret, og maks
to batterier eller fire celler per sending. Dette er altså en annen situasjon
enn EcoFlow-strømstasjonen i punkt 9 (245 Wh, UN 3480/3481, egen klasse
9-avtale). *Forbehold:* DSBs FAQ om litiumbatterier ga 403 ved direkte henting,
og innholdet er hentet via søkeindeksering. Det må etterprøves mot primærkilden
før det legges til grunn for en fraktavtale.

#### Produktene: én bekreftet norsk pris, og den var utsolgt

Alle priser observert 20.09.2026.

| Produkt | Pris | Butikk | Oppsett |
| --- | ---: | --- | --- |
| SenseCAP Card Tracker T1000-E | 899 kr | beredskapsutstyr.net | App, Bluetooth-PIN, regionvalg. Ingen skjerm å skrive tekst på – i praksis en tracker, ikke en meldingsenhet |
| Meshtastic Startpakke (2 × Wio Tracker L1 Pro + 1 solnode) | 3 590 kr, **utsolgt** | beredskapsutstyr.net | Samme, og frekvensen må stemme med det norske nettet |
| RAK WisMesh Pocket V2 | 99 EUR, ingen bekreftet NOK-pris | Hexaspot (EØS, VOEC-registrert for Norge) | Ferdig flashet, egen OLED-skjerm. Kanaloppsett fortsatt i app |
| LilyGO T-Echo, T-Beam Supreme | ingen bekreftet pris | lilygo.cc, direkte fra Kina | Produsenten skriver selv at produktet forutsetter «basic programming knowledge» |
| *Motorola Talkabout T42, 2-pk (referanse)* | *319 kr* | *avxperten.no* | *Batterier inn, velg kanal, trykk og snakk* |

To ting i tabellen er verdt å lese to ganger. Den eneste ferdige norske pakken
er syv ganger dyrere enn kommunikasjonsmodulen og var utsolgt med venteliste.
Og IP-klasse er ikke oppgitt for T-Echo, T-Beam eller WisMesh Pocket – bare
T1000-E har et tall (IP65). Krav 3 er altså ikke engang dokumenterbart for de
fleste av dem, og vi skal ikke påstå noe vi ikke kan lese av et datablad.

Prisbildet for maskinvaren er dessuten ustabilt: samme modell ga sprik fra
13 til 45 dollar i ulike treff. Ingen av tallene over uten oppgitt norsk
forhandler skal gjenbrukes senere; de må hentes på nytt på kjøpstidspunktet.

#### Bruksrealiteten: hvem kunden faktisk kan snakke med

Det norske Meshtastic-nettet er ekte, og det er lite. Ved kontroll 20.09.2026
viste map.868.no **108 registrerte noder og 57 online**, kryssjekket mot et
uavhengig globalt MQTT-kart som ga samme størrelsesorden. Fordelingen er
skjevere enn tallet: rundt 62 noder i og ved Oslo, 18 ved Bergen, enkeltsifrede
forekomster i Trøndelag, Møre og Romsdal, Innlandet, Agder og Vestfold – og
praktisk talt ingenting i Nordland, Troms eller Finnmark.

Konsekvensen er hele svaret på spørsmålet. For de aller fleste norske adresser
kjøper kunden **to enheter som snakker med hverandre**. Det er punkt-til-punkt,
ikke mesh: samme jobb som PMR446 gjør, i tekst i stedet for tale, til minst tre
ganger prisen. Mesh-fordelen – at meldingen hopper videre via andres noder – er
et fellesgode kunden ikke eier og ikke kan kjøpe: den forutsetter at fremmede i
nabolaget har utstyret på, ladet og innenfor rekkevidde akkurat den dagen.

Rekkevidden er lavere enn databladene. Norske brukere oppgir selv 2–9 km per
hopp, der høyde er den dominerende faktoren og skog og kupert terreng kutter
det. På Norsk Beredskapsforums egen tråd beskriver en bruker langs en fjordarm
at han måtte planlegge egne repeaternoder på fjelltopper for å dekke sitt eget
fjordområde. Det er brukernes egen erfaring med teknologien, ikke en konkurrents
kritikk av den.

Og fabrikkinnstillingene virker ikke her. Norske AMS-målere sender i samme
frekvensområde, med dokumentert aktivitet nøyaktig på Meshtastics europeiske
standardfrekvens 869,525 MHz. Det norske miljøet har derfor blitt enige om egne
innstillinger – 869,618 MHz, 62 kHz båndbredde, spredningsfaktor 8 – for i det
hele tatt å nå hverandre pålitelig. En kunde som pakker opp esken og lar
innstillingene stå, står utenfor det norske nettet til noen endrer dem manuelt.
*Forbehold:* interferensfunnet er dokumentert av entusiastmiljøet selv
(meshwiki.no), ikke verifisert direkte mot Nkom i denne runden.

#### Passformen mot de seks kravene

| Krav | Dom | Hvorfor |
| --- | --- | --- |
| 1. En turgåer ville valgt det | **Nei** | Det brukes på tur i Norge i dag – av entusiaster med radioamatør- og makerbakgrunn, som selv bygger og plasserer repeatere. PMR446 står på ekte pakkelister. Meshtastic står i en Discord |
| 2. Det holder i ti år | **Nei** | Ingen norsk garantikjede, ingen reservedeler, ingen reparasjon. goTenna er presedensen: forbrukerlinjen og supporten ble avviklet i 2024, selskapet kjøpt opp i oktober 2025, og enhetene mistet verdien sin mens de lå i skuffen |
| 3. Det virker i norsk vinter | **Ikke dokumentert** | IP-klasse mangler for tre av fire enheter. T-Echo har dessuten 850 mAh, altså kort driftstid |
| 4. Det finnes i norsk handel | **Nei** | Én norsk nisjebutikk med ferdig sett, utsolgt ved kontroll. Ellers EØS-nisjebutikk via VOEC eller direkte fra Shenzhen. Ingen av de store kjedene fører det |
| 5. Skarpere, ikke bredere | **Nei** | Vare nummer to i en kategori vi allerede har løst. Samme feil som et nytt vannfilter ved siden av Katadyn BeFree, § 5 |
| 6. Uten opplæring etter to år i en kasse | **Nei, og klarest av alle** | Se under |

Krav 6 er det som avgjør, og det fortjener å stå i klartekst. Slik møter en
LoRa-enhet kunden etter to år i kassen: batteriet er tomt, telefonen må ha
Meshtastic-appen installert, enheten pares over Bluetooth med PIN-kode, regionen
settes til EU_868, kanalnavn og nøkkel må stemme mellom alle enhetene i
husstanden, og skal noen utenfor husstanden nås, må frekvensen dessuten flyttes
bort fra fabrikkinnstillingen. Appen har hatt to år på seg til å endre seg.
Talkabout T42 krever batterier, en kanal og en knapp. Forskjellen er ikke grader
av brukervennlighet – det er forskjellen på et utstyr og et prosjekt.

Og selv når oppsettet sitter: det er tekst, ikke tale. LoRa har ingen
taleoverføring. Avstanden mellom å trykke på en knapp og å låse opp en telefon,
åpne en app og skrive en setning er større i mørket, med barn, enn den ser ut på
papiret. Det er akkurat den bruken familien i posisjonen vår faktisk trenger.

#### Alternativene

**Mot PMR446:** LoRa koster mer, krever oppsett, gir tekst i stedet for tale, og
gir for de fleste kunder ikke lengre reell rekkevidde – fordi mesh-fordelen
uteblir uten naboer på nettet. Det er dyrere på alle akser og bedre på ingen som
gjelder en husstand hjemme. PMR446 blir stående.

**Mot satellitt:** Garmin inReach Mini 2 koster 4 099 kr og inReach Messenger
Plus 4 699 kr hos dntbutikken.no, Zoleo 2 999 kr hos widforss.no (utsolgt ved
kontroll). Abonnement fra rundt 105 kr/mnd pluss 525 kr aktivering – tall fra en
tredjepartskilde, ikke Garmins egen norske prisside, og må bekreftes før det
brukes. Disse løser et annet problem enn LoRa: kontakt ut av området og en
SOS-knapp mot en reell døgnbemannet sentral, uten at noe av det avhenger av
naboene. Messenger Plus er den eneste enheten i hele gjennomgangen som kan lese
og skrive meldinger uten telefon.

Men prisnivået er ti til femten ganger kommunikasjonsmodulens, pluss abonnement,
og satellitt er derfor ikke et svar på spørsmålet som ble stilt. Det er en egen
kategorivurdering – med egen begrunnelse, egen marginregning og et åpent
spørsmål om abonnement passer i en butikk som selger utstyr. Den er ikke
bestilt, og den gjøres ikke her.

#### Konklusjonen, med forbehold

**Nei til LoRa i beredskapsboksen.** Kommunikasjonsmodulen står uendret: punkt 5
i veikartet, Motorola Talkabout T42, 319 kr.

Det smalere brukstilfellet parkeres framfor å forkastes. I et borettslag eller
et hyttefelt kjøpes flere enheter inn i samme fysiske område samtidig, og da
oppstår det interne meshet uten at noen fremmed node trengs – nøyaktig
mekanismen som mangler for enkelthusstanden. Det er strukturelt samme sak som
styreboksen og fellesvannlageret i punkt 10 og 11: en tjeneste til et
fellesskap, ikke en vare til en husstand. Hører det hjemme noe sted, hører det
hjemme der, som fastmontert utstyr med tilsyn – ikke som en enhet i familieesken.

Dette er heller ikke et permanent nei. Nettet er lite, men organisert og i vekst,
og bildet kan se annerledes ut om to–tre år. Vurder på nytt når tre ting er sanne
samtidig: en ferdig konfigurert enhet selges av en etablert norsk forhandler med
garanti; den virker uten telefon-app for både oppsett og daglig bruk; og
nodetettheten dekker mer enn to byer. Ingen av de tre er sanne i dag. Sett en
årlig gjennomgang.

Forbehold ved denne vurderingen:

- **Nodetallet er et gulv, ikke fasiten.** Mange noder velger bevisst å ikke
  rapportere posisjon til offentlig MQTT. Det reelle nettet er trolig større enn
  108/57, men vi har ingen pålitelig måte å tallfeste hvor mye – og et ukjent
  tall skal ikke rundes oppover.
- **Konklusjonen gjelder nasjonalt.** For husstander inne i Oslo- eller
  Bergen-klyngen er brukstesten i praksis bestått allerede i dag. Det er likevel
  ikke et argument for å selge produktet i en nasjonal katalog uten å si til
  resten av kundene at konklusjonen ikke gjelder dem.
- **AMS-interferensen** er dokumentert av entusiastmiljøet, ikke mot Nkom
  direkte.
- **SP188-unntaket for frakt** er hentet via søkeindeksering fordi dsb.no ga
  403, og må etterprøves mot primærkilden.
- **Ingen av de tolv aktørene i `konkurrentanalyse.md` er sjekket for om de
  allerede selger LoRa eller satellitt.** Vi vet altså ikke om et nei her betyr
  at vi står alene eller står med alle andre. Det er ikke kartlagt, og det skal
  ikke påstås i noen retning.

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

## 6. Kontanter og valuta

**Kortsvaret er nei til begge deler nå.** Et dollar-tilvalg er entydig
valutavirksomhet etter finansforetaksloven § 2-5 og krever i praksis konsesjon
som finansieringsforetak med 5 millioner euro i startkapital – det er ikke en
terskel vi kommer over, og varen har dessuten ingen forankring i DSBs råd. Å
legge norske sedler i esken er ikke valutavirksomhet, men kan være
konsesjonspliktig som betalingstjenesten «pengeoverføring», og det spørsmålet
klarte vi ikke å besvare mot noen kilde. Uautorisert konsesjonspliktig
virksomhet er straffbart, så dette er ikke noe vi prøver oss fram på: behovet
dekkes i mellomtiden av konvolutten vi allerede trykker.

### 6.1 Regelverket

Tabellen skiller mellom det som er lest ordrett i lovteksten og det som ikke er
det. Ingenting under er juridisk rådgivning – det er hva vi fant, og hva som må
sjekkes av noen som kan det.

| Hjemmel | Hva den sier | Lest ordrett |
| --- | --- | --- |
| Finansforetaksloven § 2-5 | Valutavirksomhet er «virksomhet som består i omsetning av valuta», og kan bare drives av bank, betalingsforetak, e-pengeforetak eller finansieringsforetak med tillatelse | **Ja** |
| Finansforetaksloven § 2-9 første ledd bokstav c | Et foretak som utelukkende skal drive valutaomsetning, må ha konsesjon som finansieringsforetak | **Ja** |
| Finansforetaksloven § 3-4 første og femte ledd | Finansieringsforetak: minst 5 mill. euro startkapital. Departementet kan i særlige tilfeller godta ned til 1 mill. euro | **Ja** |
| Finansforetaksloven § 3-4 andre ledd | Betalingsforetak og e-pengeforetak: 20 000–125 000 euro, avhengig av tjenestetype | **Ja** |
| Finansforetaksloven § 22-1 | Bot, eller fengsel inntil ett år under særlig skjerpende omstendigheter, for forsettlig eller uaktsom overtredelse av loven | **Ja** |
| Hvitvaskingsloven § 4 første ledd | Lister «foretak som driver valutavirksomhet» blant de rapporteringspliktige | **Ja** |
| Merverdiavgiftsloven § 3-6 bokstav d | Omsetning av gyldige betalingsmidler er unntatt merverdiavgift | **Ja** |
| Angrerettloven § 22 | Fjorten uttømmende unntak fra angreretten (bokstav a–n). Ingen av dem nevner penger. Bokstav d unntar varer der prisen avhenger av svingninger i finansmarkedet selgeren ikke kontrollerer | **Ja** |
| Forbrukerkjøpsloven § 14 fjerde ledd | Ved sendekjøp går risikoen over på forbrukeren først når varen er fysisk mottatt, når det er selgeren som velger fraktløsning | **Ja** |
| Finansavtaleloven § 1-5 første ledd | Definerer betalingstjenester, blant dem «overføring eller mottak av betalingsmidler uten kontoavtale» – pengeoverføring | **Nei.** Parafrasert sammendrag, ikke sitert lovtekst |
| Finansforetaksloven § 1-7 bokstav k og l, jf. finansforetaksforskriften § 1-8 | Forenklet meldeplikt for betalingstjenester i begrenset nettverk eller lavvolums elektronisk kommunikasjon, med beløpstak på 50/300 euro | **Nei.** Lest hos Finanstilsynet, ikke i forskriftsteksten |
| Hvitvaskingsloven kap. 3, 4, 5 og 7 | Risikovurdering, rutiner, kundetiltak, undersøkelses- og rapporteringsplikt til Økokrim, internkontroll og opplæring | **Nei.** Hentet fra kapitteloversikt, ikke lest paragraf for paragraf |
| Hvitvaskingsloven kap. 2 (trolig § 5) | Forbud mot å motta 40 000 kr eller mer kontant som vederlag for varer | **Nei.** Sekundærkilder, og paragrafnummeret er ikke bekreftet |

**Dollar er avgjort av de fire første linjene.** Å veksle USD mot NOK er
omsetning av valuta. Sporet fram til lovlig drift går gjennom
finansieringsforetak-konsesjon, og startkapitalkravet der er 5 millioner euro –
rundt 55–60 millioner kroner. Selv unntaksbestemmelsen på 1 million euro er
langt utenfor rekkevidde. Det eneste realistiske alternativet er et agent- eller
distribusjonsforhold med noen som allerede har konsesjonen. Det er ikke
undersøkt, verken rettslig eller praktisk, og skal ikke antas å finnes.

**Norske kontanter er det uavklarte.** Selger vi norske sedler mot kortbetaling,
skjer det ingen veksling mellom to valutaer, og det er derfor ikke
valutavirksomhet etter § 2-5. Men kunden betaler uten kontoavtale hos oss, og vi
gjør et tilsvarende beløp tilgjengelig i kontanter. Det ligner strukturelt på
definisjonen av pengeoverføring i finansavtaleloven § 1-5.

Her må vi være helt presise om hva vi vet: **vi fant ingen kilde – ingen
forskrift, intet rundskriv, ingen forvaltningspraksis – som drøfter dette
konkrete tilfellet.** En nettbutikk som sender fysiske sedler i posten til den
samme personen som nettopp betalte med kort, er ikke et eksempel noen har
skrevet om. Lesningen over er en slutning fra ordlyden, ikke en bekreftet
konklusjon, og den skal ikke brukes i noen retning: verken som grunn til å la
være, eller som trygghet for at det går bra. Den må avklares skriftlig før noe
selges.

Skulle svaret bli at det er pengeoverføring, går sporet til betalingsforetak,
ikke finansieringsforetak, og startkapitalkravet er da 20 000–125 000 euro. Det
er en reell konsesjonsprosess med egnethetsvurdering av eiere og ledelse, men
ikke praktisk umulig slik finansieringsforetak-sporet er.

**Hvitvaskingsloven følger med på kjøpet.** Blir Nødboks konsesjonert
valutavirksomhet eller betalingsforetak, utløses hele pakken: egen skriftlig
risikovurdering, ID-kontroll av kunden ved kjøp, en reell hvitvaskingsansvarlig
i ledelsen, dokumenterte rutiner, og plikt til å undersøke og rapportere
mistenkelige transaksjoner til Økokrim. Det er ikke et skjema som fylles ut én
gang. Det er en løpende driftskostnad og et personlig ansvar, i en butikk som i
dag har null compliance-apparat.

**Og straffebudet er ekte.** Finansforetaksloven § 22-1 gir bot, og fengsel
inntil ett år under særlig skjerpende omstendigheter, også ved uaktsom
overtredelse. Bekymringen er altså ikke overdrevet, og «vi visste ikke» er ikke
et forsvar loven gir oss.

**Ett spor er ikke undersøkt i det hele tatt:** å selge sedler som *vare* –
samlermynt eller pakket seddelsett til overpris – i stedet for som tjeneste.
Intuisjonen er at en tilsynsmyndighet ville sett på det reelle innholdet i
transaksjonen, kort inn og kontanter ut, og ikke på etiketten. Men det er en
intuisjon, ikke et funn. Å bygge en forretningsmodell på den forskjellen uten en
presis juridisk avklaring frarådes.

### 6.2 Praktikken

Anta for et øyeblikk at jusen løsner. Da gjenstår fire ting som hver for seg er
håndterbare og til sammen ikke er det.

**Frakt.** Kontanter kan ikke ligge i esken. Postens egne vilkår forbyr penger
og verdipapirer i ordinær pakke – de kan bare sendes som **verdibrev**, som er
en egen tjeneste og ikke et tillegg i en sending vi allerede gjør. Verdibrevet
koster fra 656 kr, pluss 80 kr per påbegynte 10 000 kr i deklarert verdi over de
første 10 000. Det er innenlands, maks 2 kg, maks 40 000 kr forsikret verdi, og
**mottakeren må hente på postkontor og legitimere seg.** Det bryter med hele
leveransemodellen: én eske, hjem til døren, alt i samme sending.

**Forsikring og ansvar.** Posten fraskriver seg uttrykkelig ansvar for kontanter
sendt på annen måte enn som verdipostsending, og selv med verdibrev er
erstatningen begrenset til deklarert verdi. Det spiller uansett mindre rolle for
oss enn det ser ut: etter forbrukerkjøpsloven § 14 fjerde ledd bærer **vi**
risikoen helt til kunden fysisk har varen, fordi det er vi som velger
fraktløsningen. Forsvinner en kontantsending, skylder vi kunden pengene,
uavhengig av hva Posten betaler oss. En kontantbeholdning på lager er dessuten
et eget sikringsspørsmål: som størrelsesorden begrenser ett forsikringsselskaps
bedriftsvilkår erstatning for kontanter til 25 000 kr i FG-godkjent skap uten
alarm og 50 000 kr med alarm, med krav om to ansatte eller kameraovervåkning
over 200 000 kr. Tallene er ett selskaps vilkår, hentet via søk – de er en
indikasjon på hva som vil kreves, ikke vår avtale.

**Angrerett.** Angrerettloven § 22 har fjorten unntak, og ingen av dem nevner
penger. For norske kroner treffer heller ikke bokstav d, som krever
markedssvingning selgeren ikke kontrollerer: én krone er én krone. Da gjelder
vanlig fjorten dagers angrerett på et produkt som er fullstendig fungibelt.
Kunden kan motta sedlene og angre, og vi har ingen måte å se om det er de samme
pengene som kommer tilbake. Det er en misbruksrisiko som er spesifikk for penger
som vare, og den finnes ikke på noen annen linje i katalogen.

**Merverdiavgift og margin.** Salg av gyldige betalingsmidler er unntatt mva
etter merverdiavgiftsloven § 3-6 bokstav d. Det er den ene gode nyheten, og den
løser ingenting: **en seddel solgt til pålydende har null dekningsbidrag.** Hele
inntekten må ligge i et gebyr, og det gebyret skal dekke 656 kr i verdibrevporto,
sikret lager, forsikring, ID-kontroll og en løpende hvitvaskingsrutine. DSB
anbefaler «litt kontanter». Gebyret som bærer kostnadene ville vært en betydelig
andel av beløpet kunden fikk utlevert, og det er ikke et produkt vi kan forsvare
å sette navnet vårt på. Om et slikt gebyr i det hele tatt faller innenfor
mva-unntaket, eller blir en egen avgiftspliktig tjeneste, er heller ikke avklart.

Sett mot marginlogikken i § 1: dette er det motsatte av beredskapspermen. Permen
er en egen trykksak med 69 % dekningsgrad og ingen regulatorisk overbygning.
Kontanter er null margin på varen, en egen fraktklasse, en konsesjonsvurdering og
et compliance-apparat.

### 6.3 Dollar særskilt

Dollar må avvises to ganger, og den andre gangen er den viktigste.

**Juridisk** er det avgjort over: valutavirksomhet, finansieringsforetak, 5
millioner euro. Det finnes ingen forenklet ordning som fanger dette – den
meldepliktige lavvolumsordningen gjelder betalingsinstrumenter i begrensede
nettverk med tak på 50 og 300 euro, ikke valutaveksling.

**Merkevaremessig** ville vi sagt nei selv om konsesjonen lå i skuffen. DSBs
brosjyre nevner konsekvent kontanter og aldri utenlandsk valuta – verken i
avsnittet om betalingsberedskap eller i listen over hva man tar med ved
evakuering på kort varsel. Norges Bank gir samme råd om kontanter og flere
betalingskort, uten et ord om valuta. Mekanismen bak rådet forklarer hvorfor:
poenget er at kortterminalen krever strøm og nett, og at nærbutikken da må kunne
ta imot det den kan gi tilbake i vekslepenger. En nærbutikk uten strøm har verken
kurs eller vekslingsmulighet for dollar. Tilvalget løser altså ikke scenarioet
butikken er bygget rundt.

Testen i § 1 er om varen kan begrunnes ut fra noe vi allerede har skrevet ned.
Dollar kan det ikke, på nøyaktig samme måte som kart og kompass ikke kan det:
det er et godt produkt for en annen situasjon. Det ærlige unntaket finnes – en
husstand som må ut av landet, eller som handler over riksgrensen, kan ha reell
nytte av utenlandsk valuta – men det er et annet behov enn sju døgn hjemme, og
DSB nevner det ikke engang på evakueringslisten. Å ta det inn ville vært
sortimentsspredning uten DSB-forankring, som er den ene feilen krav 5 er skrevet
for å stoppe.

**Dollar er derfor et nei uavhengig av hva den juridiske avklaringen lander på.**
Det er verdt å si høyt, fordi det betyr at ingen bør bruke tid på
konsesjonssporet for dollar i det hele tatt.

### 6.4 Hva vi gjør i stedet

Behovet er ekte og myndighetsforankret. Det er bare ikke et behov som må dekkes
med en vare. Alle tre tiltakene under er billige, DSB-forankrede og bygger på noe
vi allerede har.

**1. Konvolutten i beredskapspermen får en valørtabell og et datofelt.**
Konvolutten finnes allerede, tom, med en påminnelse om å legge penger i selv. Den
mangler det rådet som faktisk er vanskelig å gi seg selv: hvilke valører. Norges
Bank begrunner rådet om mindre valører konkret – butikkene kan ha begrenset med
vekslepenger når mange betaler kontant samtidig, som er nøyaktig situasjonen
kortterminalen er nede. Konvoluttens innside får derfor en enkel tabell der
kunden fyller inn antall: femtilapper, hundrelapper, mynt til småbeløp. Beløpet
skriver kunden selv, fordi DSB ikke oppgir noe.

Pluss ett **«sist fylt»-felt** med dato. Konvolutten er en egen flate, og
regelen i profilens § 4.2 gjelder der som andre steder: nøyaktig ett felt i
aksentfarge, og det er det tidskritiske faktumet. På konvolutten er det denne
datoen – ikke et andre aksentfelt på etiketten, og ikke et tillegg til
byttedatoen.

*Koster:* en trykksakendring i et opplag vi uansett skal bestille. Ingen ny
varekost, ingen ny SKU, ingen endring i permens 69 %.

**2. Én linje i utløpsvarselet.** Punkt 1 i veikartet sender allerede en årlig
e-post om at maten nærmer seg dato. Den får én setning til om å sjekke
kontantkonvolutten. Penger blir ikke dårlige – de blir glemt, og det er samme
mekanisme tjenesten allerede er bygget for. Kostnad: en tekstendring. Det skal
være én linje i en e-post som finnes, ikke et eget varsel med egen frekvens.

**3. Et regnestykke for beløp – bare hvis kilden holder.** Kunden spør «hvor
mye?», og DSB svarer bevisst ikke. Vi kan hjelpe med et åpent regnestykke for
mat, drivstoff og apotekvarer i sju døgn, men bare med navngitt kilde per linje,
etter prinsipp 3 og 5 i profilens tekstprofil. SIFOs referansebudsjett er den
anerkjente norske kilden for matutgifter, men er ikke lest direkte i denne
runden, og drivstoffprisen er ferskvare etter avgiftsendringen 1. september 2026.
Holder ikke kildene, skal vi la være – et anslag fra oss er verre enn ingen
kalkulator.

Og kontanter blir stående under **«Dette selger vi ikke, men du bør ha det»**,
sammen med medisiner og jodtabletter. Der hører det hjemme, og begrunnelsen kan
stå rett ut i teksten: det å selge penger er en annen bransje med egen
konsesjon. Det er innrømmelse før påstand, anvendt på noe vi faktisk ikke gjør.

### 6.5 Forbehold

**Ingenting i dette avsnittet er juridisk rådgivning.** Det er hva vi fant, og
hva som må sjekkes av noen som kan det.

- **Hovedspørsmålet er ubesvart.** Om salg av norske sedler mot kortbetaling
  rammes som konsesjonspliktig pengeoverføring, er en slutning fra ordlyden i
  finansavtaleloven § 1-5. Ingen kilde vi fant drøfter tilfellet. Det må avklares
  skriftlig – med advokat, og trolig med en uttalelse fra Finanstilsynet – før
  noe som helst selges. Det skal ikke antas i noen retning.
- **Finansavtaleloven § 1-5 er ikke sitert ordrett** i denne runden, bare
  parafrasert.
- **Hvitvaskingslovens kapitler 3, 4, 5 og 7** er lest som kapitteloversikt, ikke
  paragraf for paragraf. Omfanget av pliktene er derfor beskrevet i grove trekk.
- **Kontantforbudet på 40 000 kr** er hentet fra sekundærkilder, og
  paragrafnummeret er ikke bekreftet. Det treffer trolig ikke oss, siden kunden
  betaler med kort – men det ville blitt relevant om betalingsformen endres.
- **«Sedler som vare»-sporet er ikke undersøkt mot primærkilder overhodet.**
  Ingen konklusjon er trukket der, bare en advarsel.
- **Agent- eller distribusjonsforhold med en aktør som allerede har konsesjon**
  er nevnt som en mulig vei, men er ikke utredet. Det er ikke en plan.
- **Forsikringstallene er ett selskaps vilkår** via søk, ikke vår egen avtale.
  Størrelsesorden, ikke fasit.
- **Fraktvurderingen forutsetter Posten.** Bruker vi en annen fraktør, må
  tilsvarende vilkår sjekkes der.
- **Angrerettvurderingen for dollar** – at bokstav d trolig ville truffet fordi
  valutakurs svinger utenfor vår kontroll – er vår egen lesning av lovteksten.
  Ingen norsk forvaltningspraksis eller veiledning fra Forbrukertilsynet er
  funnet som gjelder valutasalg fra nettbutikk. Den er uansett uten praktisk
  betydning, siden dollar avvises på andre grunnlag.
- **Om et handteringsgebyr faller innenfor mva-unntaket** i § 3-6 bokstav d er
  ikke avklart. Må tas med regnskapsfører eller som bindende forhåndsuttalelse
  før en pris settes.
- **Kassasystem- og bokføringsspørsmålet** (om kontantsalg over nett utløser krav
  til sertifisert kassasystem, og hvordan en kontantbeholdning for videresalg
  skal klassifiseres i regnskapet) er bare berørt via sekundærkilder.
- **Norges Banks formulering** om kontanter og valører er bekreftet på
  norges-bank.no som veiledningsside, men det konkrete sitatet i researchen kom
  via en sekundærkilde. Det må leses direkte før noe av det går i kundetekst.
- **Ingen kronesum er verifisert hos DSB eller Norges Bank.** DSBs sjekkliste
  sier «Litt kontanter og flere betalingskort», og brosjyren ber folk vurdere
  beløpet ut fra husstandens størrelse. Tallene som sirkulerer i sekundærkilder –
  1 000 kr til basisbehov, 5 000 kr til langvarig krise – finnes ikke igjen i
  DSBs egen tekst og skal ikke siteres som DSBs anbefaling.
- **SIFOs referansebudsjett** er ikke lest direkte, og drivstoffprisen er et
  øyeblikksbilde rett etter en avgiftsendring. Begge må hentes på nytt, med dato,
  hvis kalkulatoren faktisk bygges.

---

## 7. Forbehold

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
9. **Kontantsalg, hvis det noen gang tas opp igjen.** Om salg av norske sedler
   mot kortbetaling er konsesjonspliktig pengeoverføring, er ubesvart og må
   avklares skriftlig med advokat og Finanstilsynet før noe selges. Se § 6.
   Dollar-tilvalget krever ingen slik avklaring – det er avvist også
   merkevaremessig, og skal ikke utredes videre.
