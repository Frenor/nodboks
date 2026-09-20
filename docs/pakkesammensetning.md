# Pakkesammensetning – stykkliste og begrunnelse

Dette dokumentet definerer hva som faktisk ligger i en Nødboks: hvilke varer,
i hvilket antall, etter hvilken skaleringsregel, og hvorfor. Det er skrevet
til å kunne mates rett inn i `assets/js/data/katalog.js` – kolonnen
«Skaleringsregel» under hver vare er skrevet i samme form som
`antall: (personer) => …` i konfiguratoren. **Ett unntak: esken.** Den er
ikke en `VARER`-linje med en `antall()`-funksjon, men ett av seks ferdige
`ESKER`-sett (tre husstandsstørrelser × to materialer) som konfiguratorens
`velgEske(personer, eskeType)` plukker basert på en `maksPersoner`-terskel –
se avsnitt 3.

**Kilder.** DSBs egenberedskapsbrosjyre (bokmål) og DSBs sjekkliste for
egenberedskap er grunnlaget for hvert DSB-punkt som siteres under. Produkter,
priser, kcal og holdbarhet er hentet fra `/tmp/nodboks/sourcing.txt` (14
varegrupper, kontrollert av en egen agent 20.09.2026) og fra den ferdig
uttestede sju-døgnsmenyen som lå i delt scratchpad
(`meny.py` / `meny2.txt`). `docs/konkurrentanalyse.md` er brukt for
markedstall og for DSBs eget forbehold om at ingen mengder utover vann er
tallfestet av myndighetene.

**Om tallene.** Priser er observerte norske butikkpriser inkl. mva., hentet
direkte fra produktsider 20.09.2026, med mindre annet er sagt. Ingen
leverandør har gitt oss en reell B2B-innkjøpspris ennå – hvert forsøk endte i
en innlogging eller en kundeavtale (se sourcingdataenes leverandørnotater).
Der et tall er et anslag – enten fordi det ikke finnes en observert kilde,
eller fordi det er utledet av en modell – er det merket som anslag med
begrunnelse for grunnlaget, ikke presentert som en observert pris.

---

## 1. Dimensjoneringsgrunnlaget

### 1.1 Sju døgn

Vi legger DSBs råd til grunn direkte: husstanden skal kunne klare seg selv i
sju døgn. DSB endret dette fra tre til sju døgn 29. mai 2024, og det er
gjeldende råd. Alle mengder under er regnet for sju døgn.

### 1.2 Vann: 20 liter per person – DSBs eneste tallfestede råd

DSB skriver ordrett: «Vi anbefaler å lagre rundt 20 liter drikkevann per
person.» Det er den **eneste** mengden DSB selv oppgir i hele
egenberedskapsrådet – ingen kalorier, ingen kilo mat, ingen antall
stearinlys eller batterier, ingen kronesum for kontanter. DSB skriver også
selv at sjekklisten «ikke [er] uttømmende, eller en fasit».

Vi legger derfor 20 liter per person til grunn som eneste hardt tallfestede
premiss, og bygger alt annet – mat, utstyrsmengder, kontantbeløp – som vår
egen, åpent merkede dimensjonering. Vi skriver det på hver produktside der
det er relevant: «Vi kaller det 20 liter fordi det er DSBs eget tall.
Kaloriene, utstyrsmengden og kontantbeløpet under er derimot Nødboks' egen
vurdering – DSB tallfester ikke det.»

20 literne dekker drikke, matlaging *og* et minimum av hygiene, ifølge DSB
selv («Du trenger vann til drikke, matlaging og hygiene»). Vår tørrmatmeny
(avsnitt 5) bruker 4,8 av de 20 literne til koking og kaffe – resten er
igjen til drikke og håndvask.

### 1.3 Vår egen kaloridimensjonering – og hvorfor den ikke er 2 400 eller 1 800

Fordi DSB ikke oppgir et kaloritall, måtte vi sette et selv. Vi valgte å
**ikke** gjøre det slik markedet gjør det: plukke et rundt måltall og
regne bakover til produkter. Det er nøyaktig den metoden som gir
nødrasjonenes ca. 2 400 kcal per døgn (BP‑ER og Seven Oceans, dimensjonert
for å holde en person i live på et minimum av vekt og pris) og
ReadyWise-pakkenes 1 740–1 983 kcal per døgn (dimensjonert for lettest og
billigst mulig porsjonsantall per pose, ikke for hva noen faktisk spiser).
Begge tallene er optimert for produktet, ikke for husstanden.

Vi gjorde det motsatt: vi satte sammen en reell ukesmeny av vanlig norsk
tørrmat – nøyaktig de varekategoriene DSB selv nevner (knekkebrød,
havregryn, hermetiske bønner, påleggshermetikk, tørket frukt, sjokolade,
honning, kjeks, nøtter, pasta, ris, posesuppe, middagshermetikk) – i
mengder en norsk husstand med barn faktisk ville spist i sju døgn uten å bli
lei, og lot kaloritallet falle ut av det. Det gir:

- **Voksendøgn: ca. 2 338 kcal**, bygget av havregrøt, knekkebrød med
  pålegg, middagshermetikk eller en varm rett, og et mellommåltid med kjeks,
  sjokolade eller nøtter.
- **Barnedøgn: ca. 60 % av voksendøgnet**, ca. 1 450 kcal, med samme
  varelinjer i mindre porsjoner.
- **Faktisk husstandssnitt i den ferdig uttestede menyen** (2 voksne + 2
  barn, se avsnitt 5): 2 023–2 169 kcal per person per døgn, snitt
  **2 069 kcal**.

Konfiguratoren (`KONFIG.kcalPerPersonPerDogn` i `katalog.js`) bruker i dag
en flat sats på **2 200 kcal per person per døgn**, uavhengig av alder,
fordi bestillingsflyten bare spør om antall personer, ikke sammensetning.
Det er en bevisst forenkling, og vi bør si det slik i produktteksten: en
husstand av bare voksne vil i praksis spise noe under normen per hode
(2 200 mot voksendøgnets 2 338), mens en småbarnsfamilie vil ligge noe over
det den faktisk trenger (2 200 mot husstandssnittet på 2 069). Avviket er
under 7 % begge veier, og vi mener det er en rimelig pris for å slippe å
spørre kunden om barnas alder i bestillingen. Det skal likevel stå tydelig
at 2 200 er **vårt** tall.

**Hvorfor ikke 2 400 (nødrasjonenes norm):** å legge oss på nødrasjonenes
kaloritall ville betydd å regne som om husstanden skal overleve på et
minimum, ikke leve et vanlig liv hjemme i sju døgn. Det er den holdningen vi
eksplisitt tar avstand fra – se avsnitt 7.

**Hvorfor ikke 1 800 (ReadyWise' faktiske nivå):** 1 740–1 983 kcal er ikke
et beredskapsfaglig mål hos ReadyWise, det er det porsjonsantallet posene
deres lander på. For en familie med barn i et kaldt hjem i sju døgn er det
tynt, og det bryter med DSBs eget punkt om at «nok mat for en uke» skal
holde husstanden gjennom hele perioden, ikke bare på papiret.

---

## 2. Engangsutstyr og forbruksvarer

Dette skillet er selve grunnlaget for abonnementet, og det avgjør hva
kunden faktisk betaler for over tid.

- **Engangsutstyr** (`type: 'engang'`) kjøpes én gang og holder i mange år:
  esken, vannkanner, kokeapparat, CO-varsler, lykter, radio, powerbank,
  brannteppe, boksåpner (fysisk), gaffateip, multiverktøy, bøttetoalett,
  dokumentmappe. Ingen av disse har en reell utløpsdato – de blir ikke
  dårligere av å ligge urørt i en bod i ti år. **Brennstoffet til
  kokeapparatet er bevisst holdt utenfor denne listen: det følger ikke med i
  det hele tatt** (se avsnitt 3).
- **Forbruksvarer** (`type: 'forbruk'`) går ut på dato og må byttes med jevne
  mellomrom: all mat, batterier, telys, nødteppe, aquatabs,
  førstehjelpsutstyrets forbruksdel, håndsprit, våtservietter.

Tabellen under viser hele stykklisten klassifisert, med holdbarhet. Se
avsnitt 3–4 for produkt, pris og skaleringsregel per vare.

| Vare | Type | Holdbarhet | Byttes fordi |
| --- | --- | --- | --- |
| Esken (stablekasser) | engang | – | Aldri – det er den fysiske beholderen abonnementet leverer inn i. |
| Vannkanner 10 l | engang | – | Ingen utløpsdato på plasten. Vannet i dem bør skiftes årlig – det er en påminnelse, ikke en vareforsendelse. |
| Kokeapparat (Trangia + gassbrenner) | engang | – | Mekanisk utstyr uten forbruksdel. Brennstoffet – gass eller rødsprit – følger **ikke** med og kjøpes lokalt av kunden, se avsnitt 3. |
| CO-varsler | engang | ca. 7 år (sensor) | Klassifisert som engangsutstyr i standardpakken. Sensoren har typisk sju års levetid; vi minner om funksjonstest ved neste komplette kjøp, men den inngår ikke i det ordinære matabonnementet. |
| Nødradio | engang | – | Batteriet er innebygd og skiftbart kun på oppgraderingsmodellen; regnes som engangsutstyr i standardpakken. |
| Powerbank | engang | – | Toppes opp årlig sammen med matbyttet, byttes ikke ut. |
| Brannteppe | engang | – | Ubrukt teppe forringes ikke. |
| Gaffateip | engang | – | 50 m er mer enn nok for sju døgn hvert år boksen står urørt. |
| Multiverktøy | engang | – | Mekanisk, ingen forbruksdel. |
| Hodelykt / campinglykt | engang | – | Selve lykta har ingen utløpsdato – batteriene i den har. |
| Bøttetoalett | engang | – | Ingen utløpsdato. |
| Dokumentmappe (aLOKSAK) + nødkort + notatbok | engang | – | Fylles ut én gang av kunden. |
| Boksåpner | engang/forbruk-følge | – | Selve verktøyet slites ikke, men vi sender den med i matpåfyllet fordi den er billig og lett å glemme å legge til side. |
| Mat, tørrmat-nivå | forbruk | ca. 1 år | Butikkvarer med vanlig holdbarhet – dette er selve grunnen til at abonnementet finnes. |
| Mat, langtidsnivå (REAL Field Meal) | forbruk | 5 år | Lengre syklus, men går likevel ut. |
| Batterier, litium AAA/AA | forbruk | 25 år | I praksis nesten aldri i en ti-årshorisont – men formelt en forbruksvare. |
| Telys | forbruk | 10 år | Byttes sjeldnere enn maten, men er ikke evigvarende. |
| Nødteppe | forbruk | 5 år | Folien sprekker i brettekantene over tid. |
| Aquatabs | forbruk | 5 år | Aktivt klor brytes langsomt ned. |
| Førstehjelpsskrin (forbruksdelen) | forbruk | 5 år | Sterile kompresser og sårvask er datomerket. |
| Håndsprit | forbruk | 3 år | Alkoholprosenten synker. |
| Våtservietter | forbruk | 3 år | Tørker ut når lokket har vært åpnet/lagret lenge. |

### Hva det betyr for totalkostnaden over ti år (eksempel: 4 personer, tørrmat, komplett pakke)

Engangsutstyret koster ca. **5 891 kr**, betalt én gang: esken (Nødboks
Mellom, 2 kasser, 598 kr – riktig sett for 4 personer, se avsnitt 3),
vannkanner (8 stk, 479 kr), kokeapparat – Trangia + gassbrenner, uten
brennstoff (1 298 kr), CO-varsler (349 kr, vår egen utsalgspris – ikke en
observert konkurrentpris, se avsnitt 3), nødradio (530 kr), powerbank
(659 kr), brannteppe (350 kr), gaffateip (192 kr), multiverktøy (250 kr),
hodelykter og campinglykter (558 kr), bøttetoalett (399 kr), dokumentmappe
(229 kr).

*(Esken over er rettet til den faktiske `ESKER`-modellen. De øvrige
enhetsprisene i dette regnestykket er ikke kontrollert på nytt mot gjeldende
`katalog.js` og bør oppdateres når det er avklart hvilken katalogversjon som
er riktig for lansering.)*

Forbruksvarene koster i snitt ca. **2 740 kr per år** over ti år, og maten
er over 90 % av det tallet: ca. 2 491 kr i mat hvert år (se avsnitt 5),
pluss aquatabs, nødteppe, håndsprit, våtservietter og førstehjelpsutstyr på
sine egne, lengre sykluser (til sammen ca. 250 kr/år i snitt). Batteriene er
så holdbare at de knapt trenger å byttes i det hele tatt i en tiårsperiode.
Brennstoff er ikke med i dette regnestykket i det hele tatt – kunden kjøper
gass eller rødsprit selv, lokalt, etter behov (se avsnitt 3), og det er en
kostnad og et kjøp som aldri går gjennom oss.

Ti år totalt blir da grovt **5 891 kr i engangsutstyr + ca. 27 400 kr i
forbruk = rundt 33 300 kr**, mot en kunde som i stedet kjøper en helt ny
komplett pakke hos en konkurrent hvert femte år fordi ingen sier fra at
maten er gått ut (2 × 6 999 kr hos beredskap1 for en firepersonspakke =
13 998 kr for to bokser – og fortsatt uten garanti for at noen faktisk
bytter maten i mellomtiden, og uten CO-varsler i noen av dem). Poenget er
ikke at abonnementet er billigst første året – det er at det er den eneste
modellen der kunden faktisk har fungerende beredskap i år ti, ikke bare i
år én.

---

## 3. Stykkliste – komplett pakke

Esken er ikke et DSB-punkt (DSB har intet råd om «kjøp en boks»), men den
er den praktiske forutsetningen for at alt annet holder: DSB sier lageret
skal stå samlet, tørt og lett tilgjengelig, og mat i en fuktig bod når ikke
datoen sin. Esken listes derfor for seg, før de fire DSB-overskriftene.

### Esken

Esken er ikke én kassestørrelse skalert i antall – sju døgns mat og vann til
fire personer veier rundt 36 kg, og det får ikke plass i én bærbar kasse for
en større husstand. Kunden får i stedet **ett ferdig eskesett**, valgt av
`velgEske(personer, eskeType)` i konfiguratoren: den plukker det minste av
tre `ESKER`-sett der husstanden er innenfor settets `maksPersoner`, og
`antall` for den valgte linjen er alltid `1` – aldri flere enkeltkasser lagt
sammen. Standardmaterialet er plast (`SmartStore Dry 45` fra Orthex); en
aluminiumsversjon (Zarges Eurobox til utstyret) finnes som eget valg i
konfiguratoren, men er en tilvalgspris utenfor denne stykklisten.

| Sett | Personer | Kasser (SmartStore Dry 45, 60×40×35 cm) | Volum | Pris | Terskel (`maksPersoner`) | Hvorfor |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| Nødboks Liten | 1–2 | 1 | 45 l | 299 kr | 2 | Én kasse tar mat, vann og utstyr til én eller to personer, og kan bæres av én person ned i boden uten hjelp. |
| Nødboks Mellom | 3–5 | 2 | 90 l | 598 kr | 5 | Maten til en familie på fire veier rundt 36 kg. Delt på to kasser kan hver av dem faktisk løftes, og du slipper å tømme hele boksen for å finne lommelykten. |
| Nødboks Stor | 6–8 | 3 | 135 l | 897 kr | 8 | Over fem personer blir én kasse per kategori (mat, vann, utstyr) det eneste som lar seg løfte. |

Alle tre bruker samme kasse – næringsmiddelgodkjent, IP44-tett, tåler
−40 til +70 °C, ti års garanti – de egenskapene som gjør at maten faktisk
lever til holdbarhetsdatoen i en norsk bod, og at esken selv lever like
lenge som abonnementet. Merkes med innholdsliste og eldste utløpsdato på
lokket.

### Mat og vann

DSBs sjekkliste under «Mat og vann»: rent drikkevann, mat som tåler
romtemperatur, kokeapparat/stormkjøkken, ekstra gassbeholder/brennstoff, mat
og vann til kjæledyr, kontanter og betalingskort. (Merk: DSB plasserer
kokeapparat og brennstoff under «Mat og vann», ikke under «Varme og lys» –
vi følger DSBs egen plassering, selv om det er en konstant kilde til
forvirring i markedet.)

| Vare | Produkt | Enhet | Mengde | Skaleringsregel | Holdbarhet | Hvorfor |
| --- | --- | --- | --- | --- | --- | --- |
| Drikkevann | Vanndunk 10 l, Biltema 88‑4110, 59,90 kr, leveres tom | stk | 2 per person (20 l/person) | `personer * 2` | – (vannet bør skiftes årlig) | DSBs eneste tallfestede råd. 10-literen er eneste størrelse hele husstanden – barn, eldre, gravide – faktisk kan bære og helle; en full 20-liter veier 21 kg. |
| Mat, sju døgn | Nødboks Familiemeny (33 varelinjer, se avsnitt 5) | sett | Se avsnitt 5/6 | gram per person, se avsnitt 5 | ca. 1 år | DSBs mat-punkt, ordrett: «litt ekstra av den maten du spiser til vanlig» og «ekstra matvarer med lang holdbarhet». |
| Kokeapparat | Trangia Stormkjøkken 25‑1 UL (Clas Ohlson 34‑6993, 799 kr) + generisk gassbrenner 2800 W (Fangstmann.no, 499 kr) – ett sett, to brennstoffalternativer | sett | 1 per påbegynt 4 personer | `Math.ceil(personer / 4)` | – | DSBs punkt om «kokeapparat som går på gass eller rødsprit». Vi selger begge brennerne i samme sett, ikke bare én, fordi valget mellom gass (raskt, kraftig) og rødsprit (en væske i skrukork som tåler å stå glemt i en bod i årevis, uten ventil som kan lekke) er kundens, ikke vårt – begge er lovlige å eie, men rødsprit er det eneste av de to som er lovlig å *lagre* i kjellerbod, der gass er forbudt. Kokekar, panne og vindskjerm følger med. **Apparatet er ikke godkjent for bruk i lukket rom uten ventilasjon** – se Brennstoff og CO-varsler under. |
| Brennstoff (gass eller rødsprit) | – **selges ikke, følger ikke med esken.** Kunden kjøper selv, lokalt (Clas Ohlson, Biltema, bensinstasjon m.fl.) | – | – | – | – | Gass er farlig gods klasse UN1950 (2.1) og rødsprit er UN1170 (klasse 3) – ingen av dem kan sendes som ordinær pakke. Vi sender derfor kokeapparatet helt uten brennstoff og sier nøyaktig hva du skal kjøpe og hvor mye: ca. 0,5 l rødsprit **eller** én 450 g gasskartusj per person for sju døgn ved én varm ting om dagen. Uansett hvilket du velger: **verken gass eller rødsprit er godkjent for bruk innendørs i lukket rom.** Karbonmonoksid er luktfritt – bruk apparatet med vindu på gløtt, aldri mens noen sover, og la CO-varsleren (se «Varme og lys» under) stå i samme rom. |
| Tenning | Fyrstikker, 10 esker à 45 stk, Biltema 37‑680/Nitedals, 12,90 kr | pakke | 1 per husstand | `1` | – (fosforstripe svekkes i fukt) | Tenningen til kokeapparat, telys og eventuell vedovn. Billigste reelle nytte i hele boksen. |
| Vannrensing | Aquatabs 50 stk, Beredskapsvakten, 149 kr | pakke | 1 per påbegynt 4 personer | `Math.ceil(personer / 4)` | 5 år | Reserve hvis en kanne må etterfylles fra usikker kilde, eller det kommer kokevarsel. Eneste komponent i vann-gruppen med utløpsdato. |
| Kontanter | Ingen vareforsendelse – tom, merket kontantlomme i dokumentmappen (se «Informasjon») pluss trykt regel på nødkortet | – | – | Regel trykt, ikke vare: 500 kr/person, tak 3 000 kr/husstand | – | DSBs punkt om «litt kontanter … og flere betalingskort», presisert med Norges Banks råd om små valører (butikken har lite vekslepenger når alle plutselig betaler kontant) og ett fysisk BankAxept-kort, fordi flere nødordninger for kortbetaling bygger på nettopp det kortet. Vi sender ikke penger i en boks. |
| Mat og vann til kjæledyr | – ikke solgt | – | – | – | – | Se avsnitt 7: krever kjennskap til dyreart, størrelse og fôrtype vi ikke har grunnlag for å dimensjonere generisk. |

### Varme og lys

DSBs sjekkliste under «Varme og lys»: varme klær/pledd/dyner/soveposer,
fyrstikker og stearinlys, ved (hvis vedovn), gass-/parafinovn, avtale om
overnatting, lommelykter/hodelykter. De tre første og de to siste av disse
er ting husstanden enten allerede eier eller selv må avtale – DSB peker
eksplisitt på klær, pledd, dyner og soveposer «folk allerede eier», ikke på
kjøpsvarer. Vi selger derfor det som faktisk mangler i de fleste hjem: lys
og batteriene til det. Vi legger i tillegg til én vare DSBs sjekkliste ikke
nevner, men som er en direkte konsekvens av at vi selger kokeapparatet i
«Mat og vann»-gruppen over: en CO-varsler. Verken gass eller rødsprit er
godkjent for lukket rom, men vi vet at folk kommer til å bruke apparatet
inne når det er kaldt og mørkt ute – og karbonmonoksid er luktfritt. Ingen
av de tolv kartlagte konkurrentene har dette med.

| Vare | Produkt | Enhet | Mengde | Skaleringsregel | Holdbarhet | Hvorfor |
| --- | --- | --- | --- | --- | --- | --- |
| Hodelykt | Hodelykt 250 lm, Biltema 24‑0301, 69,90 kr | stk | maks(personer, 2) | `Math.max(personer, 2)` | – | Én per person fra ca. seks år, aldri færre enn to per husstand – svikter den eneste lykta er man blind. Hodelykt slår lommelykt fordi begge hendene blir ledige. Flere av de kartlagte konkurrentene gir en familie på fire eller seks kun én. |
| Romlys | Campinglykt 90 lm, Biltema 24‑977, 139 kr | stk | 1 per påbegynt 3 personer, maks 3 | `Math.min(3, Math.ceil(personer / 3))` | – | Fire personer med hodelykter rundt et bord lyser hverandre i ansiktet. Romlys er det som gjør at en familie kan spise og spille kort sammen. |
| Batterier | Energizer Ultimate Lithium AAA (L92), 10‑pk, Batteri Online, 235 kr | pakke | 1 per påbegynt 2 personer | `Math.ceil(personer / 2)` | 25 år | DSBs råd slutter med «husk ekstra batterier» – en del av rådet, ikke et mersalg. Litium er valgt for lagringsforholdet, ikke ytelsen: en boks står urørt i en kald bod i tre til åtte år før den brukes, og alkaliske batterier kan lekke og ødelegge lykta stille, uten varsel. Batteriene skal ligge uåpnet i original blister, aldri monteres. |
| Reservelys | Telys av stearin, 50‑pk, Biltema 47‑1676, 59,90 kr | pakke | 1 per husstand | `1` | 10 år | DSB navngir stearinlys eksplisitt. Skal presenteres som reserve, ikke hovedlys – 300 lystimer er langt mer enn sju døgn krever. |
| CO-varsler | CO-varsler med display, batteridrevet, EN 50291‑1-sertifisert. Merke ikke valgt ennå – pris er vårt eget anslag, ikke en observert kilde (se `docs/innkjopsliste.md`) | stk | 1 for 1–4 personer, 2 for 5–8 | `personer <= 4 ? 1 : 2` | ca. 7 år (sensor) | Kokeapparatet er ikke godkjent for lukket rom, men folk kommer til å koke inne når det er kaldt og mørkt. De første symptomene på CO-forgiftning ligner influensa. Dette er den billigste varen i esken som kan redde liv, og den eneste grunnen til at vi tør selge et kokeapparat inn i en bolig for sju døgn. Kostnaden er rundt 209 kr eks. mva per stk – den skal kommuniseres som en inkludert selvfølge i komplett-pakken, ikke som et tillegg kunden må velge til. |

### Informasjon

DSBs sjekkliste under «Informasjon»: DAB-radio (batteri/sveiv/solcelle),
batterier og ladet batteribank, liste på papir med viktige telefonnumre.

| Vare | Produkt | Enhet | Mengde | Skaleringsregel | Holdbarhet | Hvorfor |
| --- | --- | --- | --- | --- | --- | --- |
| DAB-radio | Denver SCD‑2033, DAB+/FM, EAN 5706751088483, Batterionline, 530 kr | stk | 1 per husstand | `1` | – | NRKs FM-riksnett er slukket (2017); NRK P1, myndighetenes beredskapskanal, sendes på DAB+. En ren FM-radio dekker ikke DSBs råd i Norge. Vi navngir merke, modell og EAN – ingen av de tolv kartlagte konkurrentene gjør det. Sveiven gir ca. 3–5 minutters radio per minutt veiving; vi skriver det tallet rett ut i stedet for å late som sveiven er hovedløsningen. |
| Batteribank | Anker PowerCore 20 000 mAh 87 W, Teknikkdeler, 659 kr | stk | 1 per påbegynt 4 personer | `Math.ceil(personer / 4)` | – | DSBs «ladet batteribank». Innebygd USB-C-kabel er den enkeltdetaljen som betyr mest i en boks som skal stå urørt i årevis – kabelen er det som ellers forsvinner. Brukbart uttak er 50–60 Wh reelt, nok til 3,5–4,5 fulle mobilladinger, ikke de «opptil 8 gangene» markedsføring ofte hevder. |
| Kontaktliste og papirer | Dokumentmappe aLOKSAK 12×12″ (2‑pk), ARK Bokhandel, 229 kr, med eget laminert nødkort (materialkost ca. 5 kr), steinpapirblokk A6 og to blyanter | sett | 1 per husstand opp til 4, 2 for 5–8 | `Math.ceil(personer / 4)` | – | DSBs punkt om «papirliste med viktige telefonnummer» (nødnummer, legevakt, veterinær, familie/venner/naboer) og om kopier av viktige dokumenter. Mappen er gjennomsiktig og hermetisk – nødkortet leses uten å bryte forseglingen, og papir holder seg tørt i en fuktig bod. Blyant er valgt fremfor kulepenn fordi kulepenn slutter å skrive på fuktig eller kaldt papir; blyant gjør ikke det. Den ene posen i mappen er også kontantlommen nevnt under «Mat og vann». |

### Legemidler og hygiene

DSBs sjekkliste under «Legemidler og hygiene»: legemidler og
førstehjelpsutstyr, jodtabletter (for definerte grupper), hygieneartikler
(våtservietter, håndsprit, bleier, toalettpapir, bind/tamponger).

| Vare | Produkt | Enhet | Mengde | Skaleringsregel | Holdbarhet | Hvorfor |
| --- | --- | --- | --- | --- | --- | --- |
| Førstehjelp | Røde Kors Førstehjelpsskrin Stor, nettbutikk.rodekors.no, 529 kr | skrin | 1 for 1–4 personer, 2 for 5–8 | `Math.ceil(personer / 4)` | 5 år | Det eneste kittet vi fant som er satt sammen for en familie og ikke for et HMS-krav på en arbeidsplass – 25 plasterstrips, 3 sårvask, fingerbandasje, pinsett og trekanttørkle er det en familie faktisk bruker opp i sju døgn med barn og halvmørke. |
| Trykkbandasje | Cederroth 4‑in‑1 Blodstopper 1910, Røde Kors Førstehjelp, 98,75 kr | stk | min. 2, ellers 1 per påbegynt 2 personer | `Math.max(2, Math.ceil(personer / 2))` | 5 år | Røde Kors-skrinet mangler ordentlig trykkbandasje. En større blødning er den ene skaden der sju døgn uten strøm faktisk øker risikoen – folk sager ved, tenner primus, håndterer kniv i halvmørke. |
| Jodtabletter | Selges ikke – se avsnitt 7 | – | – | – | – | Apotekvare rettet mot avgrensede grupper, ikke en husstandsvare. |
| Toalettløsning | Bøttetoalett 22 l, Home And Beauty, 399 kr | stk | 1 per påbegynt 4 personer | `Math.ceil(personer / 4)` | – | Sittehøyde 37 cm og 130 kg bæreevne gjør at eldre, gravide og barn faktisk kan bruke den; en bøtte uten sete kan de ikke. Flere toaletter enn ett handler ikke om kø, men om posebytte – når en pose er full må den knytes og bæres ut. |
| Toalettforbruk | Biltema toalettpapir 530 m 24‑pk (99,90 kr) + søppelsekk 125 l 10‑pk (29 kr) + kattesand 10 l (99 kr) | sett | 1 sett per husstand | `1` | – (tørt lagret) | Dekker DSBs toalettpapir-punkt og løser sanitærbehovet uten avløp: dobbel søppelsekk over bøtta, kattesand som absorbent, knytes og kastes i restavfall. |
| Håndhygiene | Antibac 85 % håndsprit, 600 ml, Farmasiet, 112 kr | flaske | 1 per påbegynt 4 personer | `Math.ceil(personer / 4)` | 3 år | Erstatter håndvask når vannet er borte. 600 ml koster 187 kr/l mot 290 kr/l for 100 ml-flaskene beredskapsbutikkene selger – 55 % billigere for samme volum. |
| Kroppshygiene | Abena våtservietter 17×20 cm, 80 stk, Med24, 28 kr | pakke | 1 per påbegynte 2 personer | `Math.ceil(personer / 2)` | 3 år | Erstatter dusj/håndvask. Beste krone-for-krone-varen i hele sortimentet: 28 kr dekker én person i en uke. |

### Verktøy (utenfor DSBs fire overskrifter i brosjyren, men dekket av DSBs bredere nettliste)

DSBs brosjyre-sjekkliste har ingen egen verktøykategori, men DSBs videre
nettliste (sitert via Birkenes kommunes gjengivelse, siden dsb.no svarte 403
på direkte henting) nevner eksplisitt «hammer, spiker, multikniv og
gaffateip til små reparasjoner i huset», samt boksåpner under matpunktet.
Vi tar med disse fordi de er en direkte konsekvens av det vi selv legger i
boksen – en gassprimus og 50 telys i et mørkt hjem betyr at brannteppet ikke
er pynt, det er ansvaret som følger med det vi selger.

| Vare | Produkt | Enhet | Mengde | Skaleringsregel | Holdbarhet | Hvorfor |
| --- | --- | --- | --- | --- | --- | --- |
| Boksåpner | Coline boksåpner i rustfritt stål, Clas Ohlson 44‑2732, 79,90 kr | stk | 2 (tørrmat), 1 (langtidsmat), uansett husstandsstørrelse | `matniva === 'torrmat' ? 2 : 1` | – | Tørrmat-menyen er bygget på hermetikk. Uten boksåpner er halve matlageret utilgjengelig – høyest konsekvens per krone i hele verktøygruppen. To stykker: én i bruk, én uåpnet reserve. |
| Brannteppe | Housegard brannteppe 120×180 cm, Clas Ohlson 36‑9533, 349,90 kr | stk | 1 for 1–4 personer, 2 for 5–8 | `Math.ceil(personer / 4)` | – | Direkte konsekvens av at vi selger en gassprimus og 50 telys inn i et mørkt hjem. Skaleres på antall flammer/etasjer, ikke strengt på hoder. |
| Reparasjon | tesa Extra Power gaffateip 50 mm × 50 m, avxperten.no, 192 kr | rull | 1 per husstand | `1` | – | Står eksplisitt på DSBs (nett)liste. Løser de faktiske småkatastrofene i et sju døgns strømbrudd: knust rute, sprukket vannkanne, en lekkasje. |
| Multiverktøy | Multiverktøy 13‑i‑1, Clas Ohlson 31‑2191, 249,90 kr | stk | 1 per husstand | `1` | – | DSB skriver «multikniv». Realiteten i sju døgn hjemme er kutting av emballasje og stramming av en skrue, ikke felling av trær – én per husstand er riktig, ikke én per person. |

---

## 4. Stykkliste – matpåfyll

Matpåfyll inneholder **bare mat og vannrensetabletter**. Ingen eske, intet
utstyr – det forutsettes at kunden allerede har det fra en tidligere
komplett-pakke eller fra andre steder.

| Vare | Enhet | Mengde | Skaleringsregel | Holdbarhet |
| --- | --- | --- | --- | --- |
| Tørrmat, sju døgn (33 varelinjer, avsnitt 5) | sett | gram per person | se avsnitt 5 | ca. 1 år |
| REAL Field Meal (kun langtidsmat-nivå) | porsjon | 7 × personer | `personer * 7` | 5 år |
| Aquatabs 50 stk | pakke | 1 per påbegynt 4 personer | `Math.ceil(personer / 4)` | 5 år |
| Boksåpner (følger med kostnadsfritt) | stk | 1 | `1` | – |

Dette er den varegruppen der vi ligger direkte an mot markedets eneste
sammenlignbare tilbud: hjemmeberedt.no selger mat og vann for 999–4 299 kr
(1–5 personer) uten å oppgi kalorier, meny eller holdbarhetsdato – det er
taket vi ikke skal krysse for tilsvarende innhold. Vår tørrmatmeny til fire
personer koster 2 491 kr i observert forbrukerpris (Oda), mot hjemmeberedts
3 299 kr for firepersonspakken mat og vann – og vi kan i tillegg vise
kaloritall, meny dag for dag og holdbarhetsdato per vare, noe ingen av de
tolv kartlagte konkurrentene gjør.

---

## 5. Menyen dag for dag – tørrmatnivået

Menyen er bygget bakfra fra tilberedningsevne, ikke fra en innholdsliste:
hver dag har minst to måltider som ikke krever varme i det hele tatt, og
**dag 5 er konstruert helt uten brennstoff**. Det er ikke pynt. En meny der
alle middager krever kokeplate er en meny som slutter å virke i nøyaktig
den situasjonen boksen er kjøpt for – når gassen faktisk tar slutt, eller
når man sparer på den fordi man ikke vet hvor lenge den må vare. Alle
kcal-tall er per person per døgn for husstanden menyen ble regnet for (2
voksne + 2 barn); se avsnitt 1.3 for hvordan det henger sammen med
voksendøgn/barnedøgn.

| Dag | Frokost | Lunsj | Middag | Mellommåltid | kcal/person | Vann til mat/kaffe |
| --- | --- | --- | --- | --- | ---: | ---: |
| 1 | Havregrøt m/rosiner og honning (varme) | Knekkebrød m/leverpostei og makrell i tomat (**uten varme**) | Brun lapskaus m/flatbrød (varme) | Bixit, mandler og kakao (**uten varme**) | 2 097 | 2,1 l |
| 2 | Knekkebrød m/Nugatti og peanøttsmør, kakao (**uten varme**) | Toro tomatsuppe m/fullkornsmakaroni, knekkebrød m/leverpostei (varme) | Fiskeboller i hvit saus m/couscous og mais (varme) | Fruktcocktail og mariekjeks (**uten varme**) | 2 029 | 2,8 l |
| 3 | Havregrøt m/syltetøy (varme) | Knekkebrød m/tunfisk, mais og peanøttsmør (**uten varme**) | Pasta i tomatsaus m/tunfisk (varme) | Kvikk Lunsj, rosiner og mandler (**uten varme**) | 2 023 | 4,8 l |
| 4 | Havregrøt m/rosiner (varme) | Flatbrød m/leverpostei og makrell i tomat (**uten varme**) | Kjøttboller i tomatsaus m/couscous (varme) | Kjeks m/peanøttsmør, kakao (**uten varme**) | 2 169 | 2,5 l |
| **5 (brennstoffri)** | Knekkebrød m/syltetøy, honning og Nugatti, kald melk (**uten varme**) | Knekkebrød m/leverpostei, tomatbønner rett fra boks, mandler (**uten varme**) | Kald boksmiddag: tunfisk, tomatbønner, mais, knekkebrød, fruktcocktail (**uten varme**) | Kvikk Lunsj og Bixit (**uten varme**) | 2 034 | 0,6 l* |
| 6 | Havregrøt m/honning og rosiner (varme) | Knekkebrød m/Nugatti og peanøttsmør (**uten varme**) | Betasuppe m/couscous, flatbrød og leverpostei (varme) | Fruktcocktail, Bixit, kakao (**uten varme**) | 2 077 | 4,2 l |
| 7 | Knekkebrød m/peanøttsmør og syltetøy (**uten varme**) | Knekkebrød m/makrell i tomat, mais og mandler (**uten varme**) | Risgrøt m/sukker, kanel og syltetøy (varme) | Mariekjeks, rosiner, Kvikk Lunsj (**uten varme**) | 2 050 | 2,1 l |

\* Dag 5s 0,6 liter går til pulverkaffe, ikke til måltidene – alle fire
måltider den dagen kan spises kaldt rett fra emballasjen. Er brenselet helt
tomt kan også kaffen røres ut kald, akkurat som O'boy-kakaoen mellommåltidet
allerede gjør ved flere andre anledninger i uken.

**Sju døgn totalt: 57 918 kcal for husstanden = 2 069 kcal per person per
døgn**, observert forbrukerpris **2 491 kr for 4 personer** (2 512 kr for
selve varelinjene, minus 21 kr etter at Stabburet Makrell i tomat ble byttet
fra en utsolgt 110 g-boks til en tilgjengelig, billigere 170 g-boks – se
regel under). Vann til mat og drikke (kaffe inkludert): 19,1 l for
husstanden = 4,8 l per person over sju døgn, av DSBs 20.

### Full handleliste (2 voksne + 2 barn, sju døgn), priser fra oda.com 20.09.2026

| Vare | Enhet | Mengde brukt/husstand | Antall pakker | Pris | Regel (pk per person) |
| --- | --- | ---: | ---: | ---: | --- |
| TINE Langtidsholdbar Helmelk 1 l | l | 7 100 ml | 8 | 297,60 kr | 2,00 pk/person |
| Wasa Knekkebrød Husman 520 g | g | 2 120 g | 5 | 149,50 kr | 1,25 pk/person |
| Trondhjems Maxboller i tomatsaus 825 g | g | 1 650 g | 2 | 147,40 kr | 0,50 pk/person |
| Axa Bjørn Lettkokte Havregryn 1,1 kg | g | 1 600 g | 2 | 53,80 kr | 0,50 pk/person |
| Trondhjems Brun lapskaus 800 g | g | 1 600 g | 2 | 141,60 kr | 0,50 pk/person |
| Sunnmøre Fiskeboller 800 g | g | 1 600 g | 2 | 82,60 kr | 0,50 pk/person |
| Stabburet Leverpostei Original 100 g | g | 1 400 g | 14 | 217,00 kr | 3,50 pk/person |
| R Fruktcocktail i sukkerlake 820 g | g | 1 230 g | 2 | 62,40 kr | 0,50 pk/person |
| Prima Lavpris Maiskorn i lake 340 g | g | 1 020 g | 3 | 38,70 kr | 0,75 pk/person |
| R Tunfisk i vann MSC 185 g | g | 925 g | 5 | 100,00 kr | 1,25 pk/person |
| NORA Tomatbønner 420 g | g | 840 g | 2 | 39,20 kr | 0,50 pk/person |
| R Hakkede tomater m/urter 390 g | g | 780 g | 2 | 28,80 kr | 0,50 pk/person |
| Stabburet Makrell i tomat, **170 g** (korrigert fra 110 g – se note) | g | 660 g | 4 | 139,60 kr | ca. 1,00 pk/person |
| R Couscous 500 g | g | 650 g | 2 | 53,60 kr | 0,50 pk/person |
| Stabburet Jordbærsyltetøy 400 g | g | 600 g | 2 | 60,80 kr | 0,50 pk/person |
| Sopps Penne fullkorn 525 g | g | 600 g | 2 | 43,80 kr | 0,50 pk/person |
| Mors Hjemmebakte Flatbrød 520 g | g | 520 g | 1 | 47,40 kr | 0,25 pk/person |
| Mills Peanut Butter Grov 350 g | g | 520 g | 2 | 77,00 kr | 0,50 pk/person |
| Toro Grøtris 800 g | g | 450 g | 1 | 50,80 kr | 0,25 pk/person |
| R Rosiner 250 g | g | 400 g | 2 | 55,60 kr | 0,50 pk/person |
| Bixit Original 300 g | g | 390 g | 2 | 59,80 kr | 0,50 pk/person |
| Sætre Mariekjeks 200 g | g | 360 g | 2 | 36,40 kr | 0,50 pk/person |
| FREIA Kvikk Lunsj 200 g | g | 360 g | 2 | 59,80 kr | 0,50 pk/person |
| Nugatti Original 500 g | g | 300 g | 1 | 39,40 kr | 0,25 pk/person |
| R Mandler 250 g | g | 250 g | 1 | 44,20 kr | 0,25 pk/person |
| O'boy Original 450 g | g | 240 g | 1 | 54,90 kr | 0,25 pk/person |
| Toro Betasuppe 112 g | g | 224 g | 2 | 58,80 kr | 0,50 pk/person |
| Dansukker Sukker 1 kg | g | 220 g | 1 | 32,90 kr | 0,25 pk/person |
| R Rapsolje 1 l | ml | 190 ml | 1 | 29,90 kr | 0,25 pk/person |
| Honningcentralen Akasiehonning 350 g | g | 180 g | 1 | 69,90 kr | 0,25 pk/person |
| Toro Tomatsuppe m/fullkornsmakaroni 131 g | g | 131 g | 1 | 18,90 kr | 0,25 pk/person |
| Toro Hvit saus 38 g | g | 76 g | 2 | 31,40 kr | 0,50 pk/person |
| Nescafé Gull Refill 100 g | g | 56 g | 1 | 67,50 kr | 0,25 pk/person |

**Merk om makrell-byttet:** Stabburet Makrell i tomat 110 g var
«available_later» hos Oda ved kontroll 20.09.2026. Vi bytter til 170 g-boksen
(34,90 kr, 205 kr/kg mot 110 g-boksens ca. 245 kr/kg) – den er på lager,
billigere per kilo, og fire bokser dekker husstanden mot seks små. Det
sparer 21 kr og fjerner en leveranserisiko. Alle andre 32 linjer er
uendret fra den observerte handlelisten.

**Om skaleringsregelen «pk/person»:** denne er utledet for
2‑voksne‑2‑barn-husstanden over, og er den samme typen regel som gir den
jevne priskurven i avsnitt 6 (kg mat per person, ikke pakker per person).
Den er ikke direkte reprodusert for husstander på 1–3 personer i
sourcingdataene – se forbeholdet i avsnitt 6.

**Langtidsmat-nivået:** frokost, lunsj og mellommåltid hentes fra samme
tørrmatmeny som over, uansett matnivå – det er der den brennstoffrie dagen
hører hjemme. Middagen byttes til REAL Field Meal (håndplukket utvalg: Pasta
Bolognese, Lapskaus, Kjøttgryte, Taco Bowl, Kremet pasta med laks), 702 kcal
per pose, 7 poser per person for sju døgn. **Én ting bør vurderes videre før
lansering:** sourcingregelen sier «7 × personer poser», altså også på dag 5.
Det er verdt å diskutere om dag 5s middag bør holdes som den kalde
tørrmat-boksretten selv i langtidsmat-modus, slik at husstanden fortsatt har
minst én reelt brennstoffrie dag uansett matnivå – i dag krever REAL Field
Meal 3,7 dl kokende vann og ca. to minutters koking, som ville gjøre nettopp
den ene fuel-free-dagen avhengig av gass igjen.

---

## 6. Mengder per husstandsstørrelse 1–8

Tabellen viser at kurven er jevn – ingen enkeltvare hopper uforholdsmessig
ved noen bestemt husstandsstørrelse – fordi hver vare (utenom esken) er
skrevet som en funksjon av `personer`, ikke som et oppslag i en tabell.
Esken er det ene bevisste unntaket: den er ett ferdig sett valgt via en
personterskel (`maksPersoner`), ikke en formel – se avsnitt 3.

| Personer | Vann (l) | Eskesett (kasser) | Hodelykt (stk) | Litium AAA (10‑pk) | Kontanter (kr) | Førstehjelpsskrin | Håndsprit (fl.) | Bøttetoalett | Kokeapparat (sett) | CO-varsler (stk) | Nødteppe (stk) |
| ---: | ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 20 | Liten (1) | 2 | 1 | 500 | 1 | 1 | 1 | 1 | 1 | 1 |
| 2 | 40 | Liten (1) | 2 | 1 | 1 000 | 1 | 1 | 1 | 1 | 1 | 2 |
| 3 | 60 | Mellom (2) | 3 | 2 | 1 500 | 1 | 1 | 1 | 1 | 1 | 3 |
| 4 | 80 | Mellom (2) | 4 | 2 | 2 000 | 1 | 1 | 1 | 1 | 1 | 4 |
| 5 | 100 | Mellom (2) | 5 | 3 | 2 500 | 2 | 2 | 2 | 2 | 2 | 5 |
| 6 | 120 | Stor (3) | 6 | 3 | 3 000 (tak) | 2 | 2 | 2 | 2 | 2 | 6 |
| 7 | 140 | Stor (3) | 7 | 4 | 3 000 (tak) | 2 | 2 | 2 | 2 | 2 | 7 |
| 8 | 160 | Stor (3) | 8 | 4 | 3 000 (tak) | 2 | 2 | 2 | 2 | 2 | 8 |

Brennstoff (gass eller rødsprit) er bevisst utelatt fra denne tabellen: det
selges ikke av oss i noen mengde, se avsnitt 3.

Vannkolonnen er den strengeste testen: den følger DSBs 20 liter per person
nøyaktig ved hvert eneste trinn, uten avrundingstap – noe kun tre av de
tolv kartlagte konkurrentene i det hele tatt oppnår ved noen
husstandsstørrelse (se `docs/konkurrentanalyse.md`).

**Matkost per person, tørrmat (observert, gram-per-person-modellen):**
konkurrentanalysens harde fakta oppgir **623 · 626 · 584 · 593 · 585 kr**
per person for husstander på 4–8, beregnet slik at ingen enkeltvare hopper
uforholdsmessig ved noen husstandsstørrelse (den «naive» pakke-per-person-
regelen ville i kontrast gjort 5‑personersboksen 21 % dyrere per hode enn
4‑personers, fordi ti kryddervarer da hopper samtidig). **Vi har ikke** et
tilsvarende, verifisert tall for husstander på 1–3 personer i
sourcingdataene – å oppgi ett her ville krevd at vi selv antar en
sammensetning av voksne og barn for disse husstandene, noe modellen
bevisst ikke gjør generisk (den tar utgangspunkt i en navngitt husstand:
2 voksne + 2 barn). Det bør kjøres som egen beregning før lansering, med
samme metode som ga tallene for 4–8.

---

## 7. Hva vi bevisst utelater – og hvorfor

### Nødrasjoner (Seven Oceans, BP‑ER)

Skal **ikke** inn i noen Nødboks-pakke, i noen modus, på noe matnivå. Dette
er vårt viktigste differensieringspunkt: fem av de tolv kartlagte
konkurrentene selger komprimerte livbåtrasjoner som «beredskapsmat» – Seven
Oceans og BP‑ER, utviklet for redningsflåter, 475 kcal per 100 g, med
ingredienser som hvetemel, vegetabilsk olje (RSPO-palme), sukker,
glukosesirup og melkeprotein. Den ser overlegen ut på papiret: billigst per
kalori, lengst holdbarhet, null tilberedning. Men den løser et problem en
norsk husstand hjemme i sju døgn ikke har, og den står i direkte motstrid
til DSBs eget mat-råd om «litt ekstra av den maten du spiser til vanlig» og
om å holde på vante rutiner som faste måltider for den psykiske helsen.
Halve markedet selger altså det motsatte av det de bruker DSB som
salgsargument for.

### Jodtabletter

DSBs sjekkliste nevner jodtabletter eksplisitt, men avgrenset til bestemte
grupper: «barn og voksne under 40 år, gravide og ammende». Det er ikke en
generell husstandsvare på samme måte som resten av listen – riktig dose og
riktig målgruppe krever en vurdering per person, ikke per husstand, og hvem
i en gitt husstand som faktisk skal ha den varierer med alder og
livssituasjon på en måte ingen boks kan dimensjonere generisk. Vi selger
den ikke, og henviser i stedet til apotek, der en farmasøyt kan vurdere hvem
i husstanden rådet faktisk gjelder for.

### Reseptbelagte legemidler

Selges aldri. Ikke relevant for en nettbutikk. Faste, personlige medisiner
må kunden legge inn selv – det er også grensen førstehjelpsgruppen i
sourcingdataene selv trekker opp, og vi minner om det i utløpsvarselet
sammen med resten av innholdet.

### Aggregat / nødstrøm

DSB nevner nødstrøm («aggregat eller batteri med 230‑volts uttak») som noe
man «kan vurdere», ikke som en fast del av sjekklisten, og legger til at man
«må sette seg godt inn i regler og råd for sikker bruk». Det er en annen og
mye dyrere varegruppe enn det en husstandsboks dekker – et bensin- eller
gassdrevet aggregat krever egen lagring av brennstoff, ventilasjon for å
unngå karbonmonoksidforgiftning, og kunnskap om sikker tilkobling. Vårt
strømsortiment (powerbank) dekker bevisst bare mobiltelefon og radio, ikke
kjøleskap, varmepumpe eller medisinsk utstyr som CPAP – og vi sier det rett
ut i produktteksten i stedet for å la kunden tro at en powerbank løser noe
den ikke løser.

### Andre poster markert som «overflod i forkledning» i sourcingdataene

Disse er vurdert og bevisst holdt utenfor fordi de ser bra ut i en
innholdsliste uten å gjøre reell nytte i nøyaktig det scenariet boksen er
bygget for (sju døgn hjemme, uten strøm, med familie):

- **Stormfyrstikker** (Lifesystems, 7,96 kr/stikk mot Nitedals' 0,06 kr) –
  over hundre ganger prisen for en egenskap (branner i horisontalt regn)
  en husstand ikke bruker innendørs.
- **Brannsikker dokumentmappe** (Masterlock, 449,90 kr) – løser
  brann i boligen, ikke sju døgn uten strøm og vann. Et annet problem enn
  DSBs, til en høyere pris enn resten av dokumentgruppen til sammen.
- **Munnbind** – DSB nevner det ikke i hygienesammenheng. Beskytter verken
  mot kulde, forurenset drikkevann eller lukt fra nødtoalettet.
- **Sveiv-/solcelle-powerbank** (type «EX7») – to funksjoner som ser bra ut
  på en produktside og som ikke leverer målbar energi i løpet av sju døgn.
  Sveiv og minipanel hører hjemme på nødradioen, som trekker nesten
  ingenting; en 20 000 mAh-powerbank skal lades på forhånd, ikke i felt.
- **Egen merkevare-gassbrenner til stormkjøkkenet** (Trangia, 1 099 kr) –
  koster mer enn selve stormkjøkkenet den monteres i, for identisk
  funksjon som en generisk brenner til 499 kr.
- **Bluetooth-høyttaler og kompass på nødradio** – null nytte i sju døgn
  uten strøm; ren datablad-fyll som ikke skal stå i markedsføringen.
- **Vannfiltersystemer** (Sagan Life RapidFlo, XStream, Aquabrick,
  3 552–5 267 kr for ferdigpakker) – løser å gjøre elvevann drikkbart over
  lang tid. I sju døgn med springvann og Aquatabs som reserve er det en
  løsning på et problem en norsk husstand i all hovedsak ikke har.
- **Brannslukningsapparat** – vurdert og forkastet, men av juridiske grunner:
  forskrift om brannforebygging § 7 pålegger boligeieren å ha ett av flere
  godkjente slokkemidler uansett, og et lite 2 kg-apparat markedsført som
  «beredskap» oppfyller ikke kravet alene. Å selge det som en beredskapsvare
  ville underkommunisert det reelle, lovpålagte kravet.
- **Mat og vann til kjæledyr** – står på DSBs sjekkliste, men krever
  kjennskap til dyreart, størrelse og fôrtype vi ikke har grunnlag for å
  dimensjonere generisk i en husstandsboks. Nevnes i produktteksten som noe
  kunden bør legge til selv, i stedet for at vi gjetter en fôrmengde.

Den samlende begrunnelsen for hele denne listen er den samme som for
nødrasjonene: hver enkelt post ser overbevisende ut isolert – billig per
kalori, imponerende spesifikasjon, lang holdbarhet – men løser et problem
husstanden ikke har i akkurat det scenariet DSBs sju døgn beskriver. Det er
forskjellen mellom å bygge en innholdsliste som ser tung ut i en
nettbutikk, og å bygge en boks som faktisk virker den kvelden strømmen går.
