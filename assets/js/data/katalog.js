/**
 * Produktkatalogen – all varekunnskap ett sted.
 *
 * Filen er ren data uten avhengigheter. `konfigurator.js` gjør regningen,
 * `ui/bygger.js` tegner den; ingen av dem vet noe om et enkelt produkt.
 *
 * ## Tallenes status
 *
 * `pris` er vårt utsalg inkl. mva. `innkjop` er anslått innkjøp eks. mva.
 * Ingen leverandør har gitt oss en reell B2B-pris ennå – hver eneste kjede vi
 * fulgte (Drytech, Nordiska Plast, Orkla Storhusholdning, ASKO, Biltema
 * Bedrift, Ultimate Nordic) ender i en innlogging eller en kundeavtale. Derfor
 * er `innkjop` konsekvent satt til **0,6 × billigste observerte detaljpris**,
 * i tråd med sourcing-oppdraget. Det er en arbeidshypotese, ikke et tilbud.
 * Den eneste varen med et ekte kostnadstall er beredskapspermen, som er vår
 * egen trykksak. Se `docs/leverandorer.md` for hva som er observert og hva som
 * er antatt, vare for vare.
 *
 * `pris` er observert norsk butikkpris, både for mat og utstyr.
 *
 * ## Hvor innkjøpsprisene ble av
 *
 * De lå her. De ligger nå i `innkjop.local.json`, som ikke er i git.
 *
 * Grunnen er enkel: dette repoet er offentlig, og siden serveres fra det.
 * Førtito innkjøpspriser i denne filen betydde at hele kostnadsstrukturen og
 * marginen vår var lesbar for hvem som helst – inkludert de tolv konkurrentene
 * konkurrentanalysen kartla. Det spilte liten rolle mens tallene var anslag.
 * Det spiller stor rolle i det de blir ekte.
 *
 * `scripts/verifiser-katalog.mjs` leser filen hvis den finnes, og hopper over
 * marginkontrollen hvis den ikke gjør det. `verktoy/innkjop.html` er
 * arbeidsflaten. `innkjop.eksempel.json` er malen.
 *
 * Utstyret ble en periode priset til 85 % av butikkpris, som et «du sparer på
 * å kjøpe av oss»-argument. Det ble forkastet, og regnestykket er grunnen:
 * kjøper vi inn til 0,6R og selger til 0,85R inkl. mva, blir netto 0,68R og
 * dekningsgraden 12 %. Å underby butikkprisen samtidig som vi kjøper inn til
 * seksti prosent er ikke en forretning.
 *
 * Til butikkpris blir netto 0,80R og dekningsgraden 25 %. Kunden betaler det de
 * ville betalt uansett, og det de kjøper av oss er utvalget, riktige mengder,
 * koblingen mot DSBs liste, CO-varsleren ingen andre legger ved, og at noen
 * holder styr på datoene. Ikke en rabatt.
 *
 * Får vi reelle innkjøpspriser under 0,5R, kan rabatten komme tilbake som et
 * ekte tilbud framfor et som spiser hele marginen. Se docs/innkjopsliste.md.
 *
 * ## Hvorfor utstyret koster det det koster
 *
 * Utstyrsdelen av katalogen lå til høsten 2026 på billigste fornuftige valg,
 * stort sett Biltema-nivå. Den er nå byttet til turutstyr av merker som selges
 * i norsk friluftshandel. Begrunnelsen er ikke posisjonering for posisjoneringens
 * skyld, men at en hodelykt som ligger urørt i en kasse i ti år er en lykt
 * kunden fomler med i mørket den kvelden den trengs. Utstyr kunden tar med på
 * hyttetur, kjenner kunden i hånda. Det løser samtidig at beredskap ellers er
 * død kapital: en Petzl-lykt og et Trangia-kjøkken brukes hele året.
 *
 * Hver eneste oppgradering under har derfor en funksjonell begrunnelse i
 * `hvorfor`, formulert slik at kunden kan være uenig i den. Der merprisen bare
 * er et merkenavn, har vi latt være: Trangias egen gassbrenner GB77 til 899 kr
 * har nøyaktig samme EN 417-gjengeventil som den generiske til 499 kr, og vi
 * selger den generiske. Taktisk utstyr er heller ikke premium her – kunden er
 * en småbarnsforelder, ikke en prepper.
 *
 * Konsekvensen er at flere varer nå ligger over terskelen i `FRAVALG_TERSKEL`
 * og kan krysses av som «har den fra før». Det er med vilje. En kunde som
 * allerede eier en Petzl-lykt og et Trangia skal ikke måtte kjøpe dem om igjen
 * for å få resten.
 *
 * ## Brennstoff følger ikke med
 *
 * Verken gass eller rødsprit kan sendes som vanlig pakke – gass er UN1950
 * klasse 2.1, rødsprit er UN1170 klasse 3. Konkurrentene løser det ved å
 * sende brenner uten beholder og la være å nevne det. Vi sender brenner uten
 * beholder og sier nøyaktig hva du skal kjøpe, hvor mye, og hvorfor. Se
 * seksjonen «Dette selger vi ikke, men du bør ha det» på forsiden.
 *
 * ## Ett kjent avvik mot grensesnittet
 *
 * `ui/bygger.js` deler prisen i «Mat og vann» mot «Utstyr» ved å se etter
 * kategorien `'Mat og vann'`. Kontrakten for denne filen krever `'Mat'` og
 * `'Vann'` som to atskilte kategorier, og det er kontrakten som gjelder her.
 * Konsekvensen er at momsoppdelingen i prispanelet i dag regner all mat som
 * utstyr. Det er en feil i bygger.js, ikke i katalogen, og den må rettes der –
 * filteret skal være `['Mat', 'Vann'].includes(l.kategori)`. Nevnt her fordi
 * det er lett å tro at katalogen har feil kategorinavn.
 */

/**
 * Forholdet mellom anslått innkjøp og observert butikkpris.
 *
 * Ingen leverandør har gitt oss en reell B2B-pris ennå, så `innkjop` er
 * konsekvent satt til denne faktoren ganger billigste observerte detaljpris.
 * Konstanten står her fordi konfiguratoren regner den andre veien for å vise
 * kunden hva delene koster hver for seg. Får vi ekte innkjøpspriser, skal
 * varene få et eget `veilPris`-felt i stedet for at faktoren brukes baklengs.
 */
export const INNKJOPSFAKTOR = 0.6

export const KONFIG = {
  dogn: 7,
  personerMin: 1,
  personerMaks: 8,
  // DSBs råd: 9 liter drikkevann per person i tre døgn, skalert til sju døgn
  // og rundet til 20 liter som også dekker matlaging og et minimum av hygiene.
  vannLiterPerPerson: 20,
  // Vår egen dimensjonering. DSB oppgir ingen kaloritall i det hele tatt –
  // rådet deres er «nok mat for en uke». Det skal aldri stå på siden at
  // 2 200 kcal er DSBs norm.
  kcalPerPersonPerDogn: 2200,
}

// -----------------------------------------------------------------------------
// Esker
// -----------------------------------------------------------------------------
// Sju døgns mat til fire personer veier rundt 36 kg. Det får ikke plass i én
// 50-liters kasse, og derfor teller esken enheter, ikke «en boks».
//
// ## To ulike kasser, med vilje
//
// Utstyret ligger i en Zarges Eurobox 40702 i aluminium: 60 liter, IP54-pakning
// i lokket, rustfrie hengsler, lås. Det er kassen kunden faktisk tar med på
// hytta eller i bilen, og aluminium sprekker ikke slik polypropylen gjør etter
// ti vintre med frost og tining i en kald bod.
//
// Mat og vann ligger i SmartStore Dry 45 fra Orthex: næringsmiddelgodkjent,
// dokumentert fra −40 til +70 grader, IP44, ti års garanti. Det er en ærlig
// kasse til 299 kr, og en aluminiumskoffert til 3 999 kr gjør ingenting for en
// boks makrell i tomat som den ikke gjør. Å selge tre Zarges-kasser til en
// familie på seks ville lagt over elleve tusen kroner på emballasje alene, og
// det er nøyaktig den typen merpris vi har lovet å ikke ta.
//
// Kjent mangel: `konfigurator.js` lar ikke esken velges bort (`kategori !==
// 'Esken'` i fravalgsfilteret). Zarges Eurobox er en kasse mange friluftsfolk
// allerede eier, og den burde hatt sin egen avkrysning på linje med Trangiaen
// og hodelykten. Det må rettes i konfiguratoren, ikke her.

/**
 * Kassevalg: plast eller aluminium.
 *
 * Aluminiumskassen er bare til utstyret. Mat og vann ligger i plast uansett,
 * fordi en aluminiumskoffert ikke gjør noe for en boks makrell som en
 * dokumentert plastkasse ikke gjør – og fordi tre Zarges-kasser til en familie
 * på seks ville lagt tolv tusen kroner på emballasje alene.
 *
 * Til gjengjeld er Zarges-kassen noe man faktisk bruker: den tåler å stå ute,
 * kan sitte på et biltak eller i en båt, og er selv et turobjekt. Det er det
 * eneste argumentet som holder for merprisen, og det står i valgteksten.
 */
export const ESKETYPER = [
  {
    id: 'plast',
    // Bildet er ikke pynt. Aluminiumskassen koster 3 478 kr mer, og den
    // forskjellen er visuell og taktil før den er funksjonell – å be noen
    // betale for den uten å vise den er å be dem kjøpe katta i sekken.
    bilde: 'assets/img/kasse-plast.webp',
    navn: 'Plastkasser',
    beskrivelse:
      'SmartStore Dry 45 fra Orthex: IP44, tåler −40 til +70 °C, næringsmiddelgodkjent, ti års garanti. Stablbar, tett mot støv og fukt.',
  },
  {
    id: 'alu',
    bilde: 'assets/img/kasse-alu.webp',
    navn: 'Aluminiumskasse til utstyret',
    beskrivelse:
      'Zarges Eurobox i aluminium til utstyret, plastkasser til mat og vann. Kassen tåler å stå ute, på et biltak eller i en båt – den er selv noe du bruker, ikke bare noe innholdet ligger i.',
  },
]

export const ESKER = [
  {
    sku: 'eske-liten',
    type: 'plast',
    navn: 'Nødboks Liten – én kasse på 45 liter',
    beskrivelse:
      'Én stablebar SmartStore Dry 45 med tetningslist og klips, merket med innholdsliste og byttedato.',
    hvorfor:
      'Tar mat, vann og utstyr til to personer, og kan bæres av én.',
    maksPersoner: 2,
    liter: 45,
    pris: 299,
    vektKg: 2.4,
    produkt: { merke: 'Orthex', modell: 'SmartStore Dry 45', kilde: 'Europris 299 kr, observert 20.09.2026', url: '' },
  },
  {
    sku: 'eske-mellom',
    type: 'plast',
    navn: 'Nødboks Mellom – to kasser på 45 liter',
    beskrivelse:
      'To stablebare kasser: én for mat, én for vann og utstyr. Stables i hverandre og merkes hver for seg.',
    hvorfor:
      '36 kilo mat fordelt på to kasser, så hver av dem lar seg løfte.',
    maksPersoner: 5,
    liter: 90,
    pris: 598,
    vektKg: 4.8,
    produkt: { merke: 'Orthex', modell: 'SmartStore Dry 45 × 2', kilde: 'Europris 299 kr per kasse', url: '' },
  },
  {
    sku: 'eske-stor',
    type: 'plast',
    navn: 'Nødboks Stor – tre kasser på 45 liter',
    beskrivelse:
      'Tre stablebare kasser: mat, vann og utstyr hver for seg, merket med innhold og byttedato.',
    hvorfor:
      'Én kasse per kategori. Du finner fram uten å tømme alt på gulvet.',
    maksPersoner: 8,
    liter: 135,
    pris: 897,
    vektKg: 7.2,
    produkt: { merke: 'Orthex', modell: 'SmartStore Dry 45 × 3', kilde: 'Europris 299 kr per kasse', url: '' },
  },
  {
    sku: 'eske-alu-liten',
    type: 'alu',
    navn: 'Nødboks Liten i aluminium – én Zarges-kasse',
    beskrivelse:
      'Zarges Eurobox 40702 i aluminium, 60 liter, med tetningslist og to hengelåsbeslag.',
    hvorfor:
      'Tåler å stå ute, på et biltak eller i en båt.',
    maksPersoner: 2,
    liter: 60,
    pris: 3999,
    vektKg: 4.9,
    produkt: { merke: 'Zarges', modell: 'Eurobox 40702', kilde: 'Capro 3 999 kr, observert 20.09.2026', url: '' },
  },
  {
    sku: 'eske-alu-mellom',
    type: 'alu',
    navn: 'Nødboks Mellom i aluminium – Zarges og matkasse',
    beskrivelse:
      'Zarges Eurobox i aluminium til utstyret, én SmartStore Dry 45 til mat og vann.',
    hvorfor:
      'Aluminium til utstyret du tar med deg, plast til maten som blir stående.',
    maksPersoner: 5,
    liter: 105,
    pris: 4298,
    vektKg: 7.3,
    produkt: { merke: 'Zarges + Orthex', modell: 'Eurobox 40702 + SmartStore Dry 45', kilde: 'Capro 3 999 kr, Europris 299 kr', url: '' },
  },
  {
    sku: 'eske-alu-stor',
    type: 'alu',
    navn: 'Nødboks Stor i aluminium – Zarges og to matkasser',
    beskrivelse:
      'Zarges Eurobox i aluminium til utstyret, to SmartStore Dry 45 til mat og vann.',
    hvorfor:
      'To matkasser så hver av dem lar seg løfte. Utstyret blir i aluminiumskassen.',
    maksPersoner: 8,
    liter: 150,
    pris: 4597,
    vektKg: 9.7,
    produkt: { merke: 'Zarges + Orthex', modell: 'Eurobox 40702 + SmartStore Dry 45 × 2', kilde: 'Capro 3 999 kr, Europris 299 kr', url: '' },
  },
]

export const finnEsketype = (id) => ESKETYPER.find((e) => e.id === id) ?? ESKETYPER[0]

// -----------------------------------------------------------------------------
// Matnivåer
// -----------------------------------------------------------------------------
// Holdbarhetstallene er de vi kan dokumentere, ikke de bransjen bruker.
// Drytech garanterer fem år fra produksjon og oppgir 5–7 år indikativt. De
// 25 årene som går igjen i markedet gjelder ReadyWise i en annen emballasje,
// og skal ikke brukes om noe vi selger.

export const MATNIVAER = [
  {
    id: 'torrmat',
    navn: 'Vanlig butikkmat',
    kortnavn: 'Tørrmat',
    beskrivelse:
      'Havregryn, knekkebrød, leverpostei og middagshermetikk – maten familien spiser fra før. Billigst, og den eneste som også smaker som en vanlig uke.',
    holdbarhetAr: 1,
    fordeler: [
      'Barn spiser den frivillig, også på døgn fem.',
      'Rundt en tredel av prisen på frysetørket.',
      'Middagshermetikken kan spises kald hvis brenselet tar slutt.',
      'Går den ikke ut på dato hos oss, spiser du den opp hjemme.',
    ],
    ulemper: [
      'Må byttes omtrent hvert år – det er derfor påfyll finnes.',
      'Veier mest: rundt 36 kilo for fire personer.',
      'Grøt og suppe bruker av de 20 literne vann.',
    ],
  },
  {
    id: 'langtidsmat',
    navn: 'Frysetørket langtidsmat',
    kortnavn: 'Langtidsmat',
    beskrivelse:
      'Norskprodusert REAL Field Meal fra Drytech i Tromsø, én varm middag og frokost per person per døgn. Dyrere, men du slipper å tenke på den.',
    holdbarhetAr: 5,
    fordeler: [
      'Fem års garantert kvalitet fra produksjon, oppgitt av produsenten selv.',
      'Norsk, laget i Tromsø av samme fabrikk som leverer til Forsvaret.',
      'Veier en firedel av tørrmaten.',
      'Vi håndplukker milde retter – ingen karri, ingen chili, ingen bacalao.',
    ],
    ulemper: [
      'Rundt tre ganger prisen per måltid.',
      'Hver porsjon krever 3,7 dl kokende vann – uten primus er den uspiselig.',
      'Brød og pålegg følger fortsatt den vanlige byttesyklusen.',
      'Ikke 25 år. Den påstanden gjelder et annet produkt i en annen emballasje.',
    ],
  },
]

// -----------------------------------------------------------------------------
// Moduser
// -----------------------------------------------------------------------------

export const MODUSER = [
  {
    id: 'komplett',
    navn: 'Komplett pakke',
    beskrivelse:
      'Mat, vann, kokeapparat, lys, radio, førstehjelp og esken de står i. Alt du trenger for å klare sju døgn hjemme.',
    medEske: true,
    medVann: true,
    // Pakkerabatten er reell: bestanddelene koster mer hver for seg i butikk.
    rabatt: 0.06,
  },
  {
    id: 'matpafyll',
    navn: 'Matpåfyll',
    beskrivelse:
      'Bare mat og vannrensetabletter, til deg som har utstyret fra før og skal bytte maten som går ut på dato.',
    medEske: false,
    medVann: false,
    rabatt: 0,
  },
]

// -----------------------------------------------------------------------------
// Påfyll
// -----------------------------------------------------------------------------
// Ingen av de tolv konkurrentene vi kartla tilbyr påfyll eller utløpsvarsling.
// Den gratis påminnelsen ligger først med vilje: den er det ærligste tilbudet
// i lista, og for en langtidsmatkunde er det som regel det riktige.

/*
 * Påfyllsnivåer.
 *
 * Det fantes et halvårlig nivå som sendte hele matpakken på nytt hver sjette
 * måned, til mat med ett års holdbarhet. Det er å selge folk mat de ikke
 * trenger, og det er nøyaktig oppførselen vi kritiserer markedet for. Det er
 * fjernet.
 *
 * Det legitime halvårsbehovet finnes likevel: meieri og annet med kort dato
 * tåler ikke et helt år. Det hører hjemme som en egen liten ferskmodul, ikke
 * som en dobbel forsendelse av alt. Se docs/sortiment.md.
 */
export const PAFYLL = [
  {
    id: 'varsel',
    navn: 'Gratis påminnelse',
    beskrivelse:
      'Vi sier fra når maten nærmer seg datoen, og minner deg om å toppe opp radio og powerbank. Du bestiller selv, eller lar være. Koster ingenting.',
    intervallDager: 365,
    rabatt: 0,
  },
  {
    id: 'arlig',
    navn: 'Årlig påfyll',
    beskrivelse:
      'Ny mat på døra hvert år, før den gamle går ut. Du spiser opp den gamle. Kan stanses når som helst.',
    intervallDager: 365,
    rabatt: 0.1,
  },
]

// -----------------------------------------------------------------------------
// Varer
// -----------------------------------------------------------------------------
//
// Skaleringsreglene er funksjoner av husstandsstørrelsen, aldri oppslag i en
// tabell. Faktorene under er utledet per person per døgn og rundet opp til
// hele pakker – det gir en jevn priskurve. Den naive regelen «én pakke per
// person» lar ti varer hoppe samtidig ved femte person og gjør
// fem-personersboksen 21 % dyrere per hode enn fire-personersboksen.
//
// Merk at `liter` KUN settes på vannkanner. Feltet er lagringskapasitet, ikke
// vannforbruk; setter man det på grøt og suppe, tror pakkebyggeren at maten
// dekker DSBs 20 liter.

export const VARER = [
  // ---------------------------------------------------------------------------
  // Mat – felles for begge matnivåer
  // ---------------------------------------------------------------------------
  {
    sku: 'knekkebrod',
    navn: 'Wasa Husman knekkebrød, 520 g',
    beskrivelse: 'Grovt rugknekkebrød i økonomipakke, rundt 43 skiver.',
    hvorfor:
      'Brødet i boksen. Verken vann, varme eller kjøleskap.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'pakke',
    pris: 30,
    holdbarhetAr: 1.2,
    kcal: 1716,
    vektKg: 0.52,
    dsb: 'Mat: knekkebrød',
    produkt: {
      merke: 'Wasa (Barilla Norge)',
      modell: 'Husman 520 g, GTIN 7300400118408',
      kilde: 'Oda, observert 20.09.2026: 29,90 kr',
      url: 'https://oda.com/no/products/1612-wasa-knekkebrod-husman/',
    },
    // 72 g (6 skiver) per voksendøgn, 40 g per barnedøgn, sju døgn.
    antall: (p) => Math.ceil(p * 1.25),
  },
  {
    sku: 'leverpostei',
    navn: 'Stabburet Leverpostei Original, 200 g',
    beskrivelse: 'Steril leverpostei i form, med 6,2 mg jern per 100 g.',
    hvorfor:
      'Holdbar 1 800 dager. Leverpostei på knekkebrød smaker ikke krise.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'stk',
    pris: 25,
    holdbarhetAr: 4.9,
    kcal: 450,
    vektKg: 0.2,
    dsb: 'Mat: påleggshermetikk',
    produkt: {
      merke: 'Stabburet (Orkla Foods Norge)',
      modell: 'Leverpostei Original 200 g, GTIN 07039010132435',
      kilde: 'Oda, observert 20.09.2026: 24,90 kr. Holdbarhet fra Matinfo.',
      url: 'https://oda.com/no/products/6535-stabburet-leverpostei-original/',
    },
    // Én åpnet form må spises opp samme døgn uten kjøleskap. Husstander på
    // én til to bør ha 100 g-formen i stedet; det håndteres ved plukk.
    antall: (p) => Math.ceil(p * 1.8),
  },
  {
    sku: 'kaviar',
    navn: 'Mills Kaviar, 185 g',
    beskrivelse: 'Kaviar på tube – pålegg som verken trenger kjøling eller kniv.',
    hvorfor:
      'Tredje pålegg i rotasjonen. Tuben tåler å stå åpnet i en kald leilighet.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'stk',
    pris: 37,
    holdbarhetAr: 1.5,
    kcal: 799,
    vektKg: 0.185,
    dsb: 'Mat: påleggshermetikk',
    produkt: {
      merke: 'Mills',
      modell: 'Kaviar original, tube',
      kilde: 'Oda, prisen utledet fra observert porsjonspris 5,03 kr per 25 g',
      url: 'https://oda.com/no/products/4819-mills-kaviar/',
    },
    antall: (p) => Math.ceil(p * 0.7),
  },
  {
    sku: 'makrell-tomat',
    navn: 'Stabburet Makrell i tomat, 170 g',
    beskrivelse: 'Makrellfilet i tomatsaus på boks.',
    hvorfor:
      'Fet fisk og protein i en meny som ellers er korn og hermetikk.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'stk',
    pris: 35,
    holdbarhetAr: 2,
    kcal: 340,
    vektKg: 0.17,
    dsb: 'Mat: påleggshermetikk',
    produkt: {
      merke: 'Stabburet (Orkla Foods Norge)',
      modell: 'Makrell i tomat 170 g',
      kilde: 'Oda, observert 20.09.2026: 34,90 kr',
      url: 'https://oda.com/no/products/69867-stabburet-makrell-i-tomat/',
    },
    antall: (p) => Math.ceil(p * 0.9),
  },
  {
    sku: 'nugatti',
    navn: 'Nugatti Original, 350 g',
    beskrivelse: 'Kakaopålegg.',
    hvorfor:
      '66 kalorier per krone, og det barna ser fram til på knekkebrødet.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'stk',
    pris: 28,
    holdbarhetAr: 1,
    kcal: 1838,
    vektKg: 0.35,
    dsb: 'Mat: mat som tåler romtemperatur',
    produkt: {
      merke: 'Nugatti (Orkla)',
      modell: 'Nugatti Original',
      kilde: 'Oda, prisen utledet fra observert porsjonspris 1,58 kr per 20 g',
      url: 'https://oda.com/no/products/1117-nugatti-nugatti-original/',
    },
    antall: (p) => Math.ceil(p * 0.4),
  },
  {
    sku: 'sjokolade',
    navn: 'Freia Melkesjokolade, 200 g',
    beskrivelse: 'Melkesjokolade i plate.',
    hvorfor:
      'Står på DSBs egen liste. En kveld som ligner en vanlig kveld.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'stk',
    pris: 30,
    holdbarhetAr: 1,
    kcal: 1120,
    vektKg: 0.2,
    dsb: 'Mat: sjokolade',
    produkt: {
      merke: 'Freia (Mondelez)',
      modell: 'Melkesjokolade 200 g',
      kilde: 'Oda, prisen utledet fra observert porsjonspris 5,98 kr per 40 g',
      url: 'https://oda.com/no/products/269-freia-melkesjokolade/',
    },
    antall: (p) => Math.ceil(p * 0.9),
  },
  {
    sku: 'mariekjeks',
    navn: 'Sætre Mariekjeks, 350 g',
    beskrivelse: 'Tørre kjeks som tåler å ligge lenge.',
    hvorfor:
      'Kveldsmat uten tilberedning, og det som går ned når ingen orker mer.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'pakke',
    pris: 32,
    holdbarhetAr: 1,
    kcal: 1558,
    vektKg: 0.35,
    dsb: 'Mat: kjeks',
    produkt: {
      merke: 'Sætre (Orkla)',
      modell: 'Mariekjeks',
      kilde: 'Oda, prisen utledet fra observert porsjonspris 3,64 kr per 40 g',
      url: 'https://oda.com/no/products/66256-saetre-mariekjeks/',
    },
    antall: (p) => Math.ceil(p * 0.6),
  },
  {
    sku: 'peanotter',
    navn: 'Peanøtter, 500 g',
    beskrivelse: 'Saltede peanøtter.',
    hvorfor:
      'Fett og protein i en karbotung meny. Hele nøtter er kvelningsfare under fire år.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'pakke',
    pris: 40,
    // Peanøtter harskner. Ett år er grensen, ikke to.
    holdbarhetAr: 1,
    kcal: 3083,
    vektKg: 0.5,
    dsb: 'Mat: nøtter',
    produkt: {
      merke: 'REMA 1000 / R',
      modell: 'Peanøtter salte',
      kilde: 'Oda, prisen utledet fra observert porsjonspris 2,42 kr per 30 g',
      url: 'https://oda.com/no/products/8732-r-peanotter/',
    },
    antall: (p) => Math.ceil(p * 0.5),
  },
  {
    sku: 'rosiner',
    navn: 'Rosiner, 500 g',
    beskrivelse: 'Tørket frukt.',
    hvorfor:
      'Det som gjør havregrøt på vann til noe barn spiser.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'pakke',
    pris: 55,
    holdbarhetAr: 1,
    kcal: 1675,
    vektKg: 0.5,
    dsb: 'Mat: tørket frukt',
    produkt: {
      merke: 'REMA 1000 / R',
      modell: 'Rosiner',
      kilde: 'Oda, prisen utledet fra observert porsjonspris 2,22 kr per 20 g',
      url: 'https://oda.com/no/products/65770-r-rosiner/',
    },
    antall: (p) => Math.ceil(p * 0.35),
  },
  {
    sku: 'oboy',
    navn: "O'boy sjokoladedrikk, 450 g",
    beskrivelse: 'Kakaopulver som røres ut i varmt eller kaldt vann.',
    hvorfor:
      'Noe varmt som ikke er kaffe. Rører seg også ut i kaldt vann.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'stk',
    pris: 55,
    holdbarhetAr: 1.5,
    kcal: 1740,
    vektKg: 0.45,
    dsb: 'Mat: mat som tåler romtemperatur',
    produkt: {
      merke: "O'boy (Mondelez)",
      modell: "O'boy Original",
      kilde: 'Oda, prisen utledet fra observert porsjonspris 1,83 kr per 15 g',
      url: 'https://oda.com/no/products/463-oboy-oboy-original/',
    },
    antall: (p) => Math.ceil(p * 0.25),
  },
  {
    sku: 'fruktcocktail',
    navn: 'Fruktcocktail i sukkerlake, 820 g',
    beskrivelse: 'Hermetisk frukt.',
    hvorfor:
      'C-vitamin og noe friskt på døgn tre, når alt har smakt hermetikk.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'stk',
    pris: 31,
    holdbarhetAr: 2,
    kcal: 508,
    vektKg: 0.82,
    dsb: 'Mat: mat som tåler romtemperatur',
    produkt: {
      merke: 'REMA 1000 / R',
      modell: 'Fruktcocktail i sukkerlake 820 g',
      kilde: 'Oda, observert 20.09.2026: 31,20 kr',
      url: 'https://oda.com/no/products/66103-r-fruktcocktail-i-sukkerlake/',
    },
    antall: (p) => Math.ceil(p / 4),
  },

  // ---------------------------------------------------------------------------
  // Mat – kun tørrmat
  // ---------------------------------------------------------------------------
  {
    sku: 'havregryn',
    navn: 'Axa Bjørn Lettkokte Havregryn, 1,1 kg',
    beskrivelse: 'Lettkokte havregryn – trekker ferdig på ett minutt i kokende vann.',
    hvorfor:
      '150 kcal per krone, best i katalogen. Kan bløtlegges kaldt over natten.',
    kategori: 'Mat',
    type: 'forbruk',
    matnivaer: ['torrmat'],
    enhet: 'pakke',
    pris: 27,
    holdbarhetAr: 1,
    kcal: 4037,
    vektKg: 1.1,
    dsb: 'Mat: havregryn',
    produkt: {
      merke: 'Axa (Lantmännen Cerealia)',
      modell: 'Bjørn Lettkokte Havregryn 1,1 kg',
      kilde: 'Oda, observert 20.09.2026: 26,90 kr',
      url: 'https://oda.com/no/products/1035-axa-bjorn-lettkokte-havregryn/',
    },
    // 80 g per voksendøgn, 50 g per barnedøgn, på fire av sju døgn.
    antall: (p) => Math.ceil(p * 0.4),
  },
  {
    sku: 'middagshermetikk',
    navn: 'Trondhjems middagshermetikk, fire sorter',
    beskrivelse:
      'Spaghetti a la Capri, Maxboller i tomatsaus, brun lapskaus og lys lapskaus – fordelt slik at ingen sort går igjen to døgn på rad.',
    hvorfor:
      'Den eneste middagen som kan spises kald rett fra boksen.',
    kategori: 'Mat',
    type: 'forbruk',
    matnivaer: ['torrmat'],
    enhet: 'stk',
    pris: 67,
    holdbarhetAr: 2,
    // Snitt av de fire sortene: 1 048 / 861 / 728 / 624 kcal.
    kcal: 815,
    vektKg: 0.83,
    dsb: 'Mat: middagshermetikk',
    produkt: {
      merke: 'Trondhjems (Orkla Foods Norge)',
      modell: 'Spaghetti a la Capri 870 g / Maxboller 825 g / Brun og lys lapskaus 800 g',
      kilde: 'Oda, observert 20.09.2026: 62,40–73,70 kr, snitt 67,35 kr',
      url: 'https://oda.com/no/products/13660-trondhjems-maxboller-i-tomatsaus/',
    },
    // En åpnet boks kan ikke kjøles og må spises opp samme døgn. Regelen er
    // derfor drøyt en halv boks per person per døgn. Trondhjems Sodd er
    // bevisst holdt utenfor: 47 kcal per 100 g er kraft, ikke middag.
    antall: (p) => Math.ceil(p * 3.75),
  },

  // ---------------------------------------------------------------------------
  // Mat – kun langtidsmat
  // ---------------------------------------------------------------------------
  {
    sku: 'real-middag',
    navn: 'REAL Field Meal, 700 kcal – håndplukket utvalg',
    beskrivelse:
      'Frysetørket middag i porsjonspose: Pasta Bolognese, Lapskaus, Kjøttgryte, Taco Bowl og Kremet pasta med laks. 3,7 dl kokende vann, åtte minutter.',
    hvorfor:
      '702 kcal per pose. Vi plukker rettene selv, så karri og bacalao blir igjen.',
    kategori: 'Mat',
    type: 'forbruk',
    matnivaer: ['langtidsmat'],
    enhet: 'porsjon',
    pris: 129,
    // Fem år garantert fra produksjon. Produsenten oppgir 5–7 år indikativt.
    holdbarhetAr: 5,
    kcal: 702,
    vektKg: 0.15,
    // Krever 3,7 dl kokende vann per pose. Uten brennstoff er den uspiselig,
    // og derfor teller den ikke med i «døgn uten varme» i konfiguratoren.
    kreverVarme: true,
    dsb: 'Mat: frysetørket mat',
    produkt: {
      merke: 'REAL Turmat / Drytech AS, Tromsø',
      modell: 'REAL Field Meal Full Meal 700 kcal',
      kilde: 'Beredskapslager og Widforss, begge observert 20.09.2026: 129 kr',
      url: 'https://www.beredskapslager.no/produkt/mat/turmat/real-field-meal-kylling-karri/',
    },
    // Én varm middag per person per døgn. Full frysetørket kost ville kostet
    // rundt 10 800 kr for fire personer og spist 7,8 av de 20 literne vann
    // per person. Resten av døgnet dekkes av tørrvarene over.
    antall: (p) => p * KONFIG.dogn,
  },
  {
    sku: 'real-frokost',
    navn: 'REAL Turmat frokost – müsli og havregrøt',
    beskrivelse:
      'Blåbær- og vaniljemüsli, crunchy granola, sjokolademüsli og havregrøt med eple og kanel. Kan lages på kaldt vann.',
    hvorfor:
      'Det eneste måltidet i langtidspakken som ikke krever kokeplate.',
    kategori: 'Mat',
    type: 'forbruk',
    matnivaer: ['langtidsmat'],
    enhet: 'porsjon',
    pris: 93,
    holdbarhetAr: 5,
    kcal: 450,
    vektKg: 0.1,
    // Krever 3,7 dl kokende vann per pose. Uten brennstoff er den uspiselig,
    // og derfor teller den ikke med i «døgn uten varme» i konfiguratoren.
    kreverVarme: true,
    dsb: 'Mat: frysetørket mat',
    produkt: {
      merke: 'REAL Turmat / Drytech AS, Tromsø',
      modell: 'Frokostposer fra Preparedness Pack',
      kilde: 'Drytech egen nettbutikk, observert 20.09.2026: 92,80 kr per måltid',
      url: 'https://realoutdoorfood.com/products/preparedness-pack-big/',
    },
    // Tre av sju frokoster. De øvrige dekkes av knekkebrød med pålegg –
    // både fordi det er billigere og fordi ingen orker müsli sju dager.
    antall: (p) => p * 3,
  },

  // ---------------------------------------------------------------------------
  // Vann
  // ---------------------------------------------------------------------------
  // Vi sender ikke vann. 160 kilo vann kan ikke fraktes lønnsomt til en
  // husstand som har rent vann i kranen, og DSBs eget råd forutsetter at du
  // fyller selv. Vi sender tomme, næringsmiddelgodkjente kanner.
  {
    sku: 'vannkanne-10',
    navn: 'Vanndunk 10 liter, gjennomsiktig',
    beskrivelse:
      'Næringsmiddelgodkjent PE-dunk med skrulokk og bærehåndtak, stablebar. 23 × 19 × 31 cm.',
    hvorfor:
      'En full 20-literskanne veier 21 kilo. Ti liter kan et barn bære.',
    kategori: 'Vann',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 60,
    holdbarhetAr: null,
    liter: 10,
    vektKg: 0.7,
    dsb: 'Vann: 20 liter per person i sju døgn',
    produkt: {
      merke: 'Biltema',
      modell: 'Vanndunk 10 liter, art. 88-4110',
      kilde: 'Biltema, observert 20.09.2026: 59,90 kr inkl. mva',
      url: 'https://www.biltema.no/fritid/friluftsliv-og-camping/vannkanner/vanndunk-10-liter-2000058583',
    },
    // To kanner per person gir nøyaktig DSBs 20 liter. Stablet i to høyder
    // tar åtte kanner 0,17 m² gulv og 62 cm høyde – det får plass i en bod.
    antall: (p) => p * 2,
  },
  {
    sku: 'aquatabs',
    navn: 'Aquatabs vannrensetabletter, 50 stk',
    beskrivelse:
      'Klorbaserte desinfeksjonstabletter i blister, til vann av usikker kvalitet.',
    hvorfor:
      'For når kanna er tom eller kokevarselet kommer. Tar ikke partikler eller kjemikalier.',
    kategori: 'Vann',
    type: 'forbruk',
    enhet: 'pakke',
    pris: 149,
    holdbarhetAr: 5,
    vektKg: 0.07,
    dsb: 'Vann: rensing ved kokevarsel',
    produkt: {
      merke: 'Aquatabs',
      modell: 'Vannrensetabletter 50 stk',
      kilde: 'Beredskapsvakten, observert 20.09.2026: 149 kr',
      url: 'https://beredskapsvakten.no/products/aquatabs-vannrensetabletter',
    },
    // Reserve for etterfylling, ikke primærforsyning – derfor skalerer den
    // mot husstand, ikke mot totalt vannvolum. Eneste vannkomponent med
    // utløpsdato, og derfor den eneste som hører hjemme i påfyllet.
    antall: (p) => Math.ceil(p / 4),
  },
  {
    sku: 'vannfilter',
    navn: 'Katadyn BeFree 1 liter vannfilter',
    beskrivelse:
      'Myk klemflaske med hulfibermembran på 0,1 mikron. 2 liter i minuttet, 1 000 liter per membran, 63 gram.',
    hvorfor:
      'Fjerner partikler og protozoer som tabletter ikke tar. Fire liter på to minutter.',
    kategori: 'Vann',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 799,
    holdbarhetAr: null,
    vektKg: 0.063,
    dsb: 'Vann: rensing ved kokevarsel',
    produkt: {
      merke: 'Katadyn',
      modell: 'BeFree 1.0 L, EZ-Clean hulfibermembran 0,1 mikron',
      kilde: 'Arctic-Fritid, observert 20.09.2026: 799 kr. Reservemembran 599 kr hos Widforss.',
      url: 'https://www.arctic-fritid.as/produkt/friluftsliv/mat-og-turkjokken/vann-og-vannrensing/katadyn-befree-vannfilter-1l/',
    },
    // `liter` settes bevisst ikke: filteret er ikke lagringskapasitet, og
    // pakkebyggeren ville ellers tro at det dekker DSBs 20 liter.
    // Ett filter per påbegynte fire personer – 1 000 liter membran er rikelig
    // for sju døgn, så det andre filteret er redundans, ikke kapasitet.
    antall: (p) => Math.ceil(p / 6),
  },

  // ---------------------------------------------------------------------------
  // Matlaging
  // ---------------------------------------------------------------------------
  {
    sku: 'kokeapparat',
    navn: 'Trangia Stormkjøkken 25-5 HA med gassbrenner',
    beskrivelse:
      'Stormkjøkken i hardanodisert aluminium med dobbel vindskjerm, to slippbelagte kokekar på 1,75 og 1,5 liter, slippbelagt stekepanne, gripetang og bærereim, levert med gassbrenner på 2800 W. Spritbrenneren følger med settet fra fabrikk. 905 gram, pakkemål 22 × 10,5 cm.',
    hvorfor:
      'Vindskjermen er grunnen: den virker på en balkong i november. Ikke godkjent for lukket rom.',
    kategori: 'Matlaging',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'sett',
    pris: 1698,
    holdbarhetAr: null,
    vektKg: 1.03,
    dsb: 'Mat: grill, kokeapparat eller stormkjøkken',
    produkt: {
      merke: 'Trangia + generisk gassbrenner',
      modell: 'Trangia 25-5 HA (hardanodisert) + gassbrenner 2800 W med gjengeventil EN 417',
      kilde: 'Outnorth 1 199 kr, NorskeNettbutikker 499 kr – begge observert 20.09.2026',
      url: 'https://www.outnorth.com/no/trangia/25-5-ha-83496',
    },
    // Brenneren er bevisst den generiske til 499 kr. Trangias egen GB77 koster
    // 899 kr og har nøyaktig samme EN 417-gjengeventil; 400 kroner for et navn
    // som ikke gjør noe annet, er den typen merpris vi har lovet å ikke ta.
    // Merk også at 25-5 UL, den lette utgaven med samme slippbelegg, koster
    // 70 kr MER enn den hardanodiserte og er mindre slitesterk.
    // 1,75 liter er det største kokekaret. Å varme mat til fem-åtte personer i
    // porsjoner under to liter tar for lang tid over sju døgn, og to sett gir
    // dessuten redundans om den ene brenneren svikter.
    antall: (p) => Math.ceil(p / 4),
  },

  {
    sku: 'co-varsler',
    navn: 'CO-varsler med display, batteridrevet',
    beskrivelse:
      'Karbonmonoksidvarsler med sifferdisplay og testknapp. Går på batteri og virker uten strøm.',
    hvorfor:
      'CO lukter ingenting, og symptomene ligner influensa. Billigste varen som kan redde liv.',
    kategori: 'Varme og lys',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 349,
    holdbarhetAr: 7,
    vektKg: 0.2,
    dsb: 'Varme: brannsikkerhet ved økt bruk av åpen ild',
    produkt: {
      merke: 'ikke valgt',
      modell: 'EN 50291-1-sertifisert CO-varsler for bolig',
      kilde: 'IKKE SOURCET – pris er anslag, se docs/innkjopsliste.md',
      url: '',
    },
    // Én per husstand opp til fire, to over det: en CO-varsler dekker rommet
    // den står i, og større husstander bruker oftere mer enn ett rom.
    antall: (p) => (p <= 4 ? 1 : 2),
  },
  {
    sku: 'fyrstikker',
    navn: 'Fyrstikker, 10 esker',
    beskrivelse: 'Vanlige husholdningsfyrstikker, 45 stikker per eske.',
    hvorfor:
      'Piezotenning er det første som slutter å virke etter år i fuktig bod.',
    kategori: 'Matlaging',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'pakke',
    pris: 13,
    holdbarhetAr: null,
    vektKg: 0.2,
    dsb: 'Varme og lys: fyrstikker eller lighter',
    produkt: {
      merke: 'Nitedals / Biltema',
      modell: 'Fyrstikkeske 10-pakning, Biltema art. 37-680',
      kilde: 'Biltema, observert 20.09.2026: 12,90 kr',
      url: 'https://www.biltema.no/fritid/friluftsliv-og-camping/stormkjokken/',
    },
    antall: () => 1,
  },

  // ---------------------------------------------------------------------------
  // Varme og lys
  // ---------------------------------------------------------------------------
  {
    sku: 'hodelykt',
    navn: 'Petzl Actik Core hodelykt, 450 lumen',
    beskrivelse:
      'Hybridlykt på 75 gram: oppladbart CORE-batteri eller tre vanlige AAA, uten adapter eller verktøy. 450 / 100 / 6 lumen, 2 / 8 / 130 timer, fast rødt lys, IPX4.',
    hvorfor:
      'Lades på USB, går på tre AAA når pakken er tom. Begge hender ledige.',
    kategori: 'Varme og lys',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 574,
    holdbarhetAr: null,
    vektKg: 0.075,
    dsb: 'Lys: lommelykter eller hodelykter',
    produkt: {
      merke: 'Petzl',
      modell: 'ACTIK CORE, 450 lm, CORE-batteri + 3 × AAA/LR03',
      kilde: 'CampNord, observert 20.09.2026: 574 kr (ned fra 649). Også hos XXL og Fjellsport.',
      url: 'https://campnord.no/produkt/tur-og-friluftsliv/hodelykter/petzl-actika-core-hodelykt/',
    },
    // Avvist med vilje: Petzl Swift RL og Black Diamond Spot 400-R har fast
    // innebygd batteri uten mulighet for løse AAA. Et dødt batteri gjør dem til
    // dødvekt, og da er hele poenget borte. Fenix HM65R er sterkere på papiret,
    // men går på CR123A, som verken bensinstasjonen eller matbutikken selger.
    // Én per person fra rundt seks år, aldri færre enn to per husstand:
    // svikter den eneste lyskilden er man blind, og reservelykten er den
    // billigste forsikringen i hele esken. Flere av de kartlagte
    // konkurrentene gir en familie på seks én hodelykt.
    antall: (p) => Math.max(p, 2),
  },
  {
    sku: 'campinglykt',
    navn: 'Ledlenser ML4 Warm Light lanterne',
    beskrivelse:
      'Rundstrålende lanterne med varmt lys, 300 / 150 / 50 / 5 lumen, opptil 40 timer på laveste nivå. IP66, 71 gram med batteri, karabinkrok. Oppladbart batteri eller fire vanlige AA.',
    hvorfor:
      'Romlys, så familien kan spise sammen i stedet for hver sin lyskjegle.',
    kategori: 'Varme og lys',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 474,
    holdbarhetAr: null,
    vektKg: 0.071,
    dsb: 'Lys: lys i rommet, ikke bare i kjeglen',
    produkt: {
      merke: 'Ledlenser',
      modell: 'ML4 Warm Light, sort',
      kilde: 'AktivVinter, observert 20.09.2026: 474 kr. Var på forhåndsbestilling med lager 10.10.2026.',
      url: 'https://aktivvinter.no/ledlenser-ml4-warm-light-lanterne-black-25547',
    },
    // Én ærlig ulempe: ML4 tar AA, hodelykten tar AAA. Esken har dermed to
    // batteriformater, og det bryter med regelen om ett format vi holdt så
    // lenge alt lys var Biltema. Vi tok det byttet bevisst – reservekilden i
    // selve lampen er mer verdt enn at de to lyskildene deler batteri – men
    // AA-linjen mangler ennå og må prises før dette kan sendes. Se
    // kommentaren under `batterier-aaa`.
    // Avvist: ML6 er sterkere og har powerbank-funksjon, men har KUN innebygd
    // Li-ion uten mulighet for løse batterier. Da er hele argumentet borte.
    // En husstand trekker sammen i ett eller to rom under et langvarig
    // strømbrudd – DSB anbefaler selv å stenge dører for å holde på varmen.
    // Én lykt per fem personer, altså per rom det faktisk sitter folk i.
    // Én per person ville blitt liggende i esken.
    antall: (p) => Math.ceil(p / 5),
  },
  {
    sku: 'batterier-aaa',
    navn: 'AAA-batterier, alkaliske, 40-pakning',
    beskrivelse: 'Vanlige alkaliske AAA-batterier med rundt ti års lagringstid.',
    hvorfor:
      'Reserven til hodelykten. Alkaliske holder rundt ti år på lager.',
    kategori: 'Varme og lys',
    type: 'forbruk',
    moduser: ['komplett'],
    enhet: 'pakke',
    pris: 80,
    holdbarhetAr: 10,
    vektKg: 0.46,
    dsb: 'Lys: ekstra batterier',
    produkt: {
      merke: 'Biltema',
      modell: 'Batteri AAA alkalisk 40-pk, art. 84-1382',
      kilde: 'Biltema, observert 20.09.2026: 79,90 kr',
      url: 'https://www.biltema.no/fritid/Belysning/hodelykt/hodelykt-250-lm-2000067364',
    },
    // Tre timers bruk per person per døgn er 21 timer, altså to sett per
    // hodelykt – seks AAA per person. Én 40-pakning rekker dermed til seks
    // personer med lykt.
    //
    // ÅPENT PUNKT: lanternen ble byttet til Ledlenser ML4, som tar AA og ikke
    // AAA. Esken mangler derfor en AA-linje, og setningen om «ett batteriformat»
    // er ikke lenger sann. Vi har ikke observert pris på en AA-pakke i denne
    // runden og nekter å gjette på en – linjen skal prises før dette sendes.
    // Lanternen har eget oppladbart batteri og lades fra powerbanken i
    // mellomtiden, så mangelen er en svakhet, ikke et hull i beredskapen.
    // Vurder samtidig litium framfor alkalisk: Energizer Ultimate Lithium AAA
    // er dokumentert ned til −40 grader og er det riktige valget for en kasse
    // som står i en kald bod. Heller ikke den er priset ennå.
    antall: (p) => Math.ceil(p / 6),
  },
  {
    sku: 'telys',
    navn: 'Telys av stearin, 50-pakning',
    beskrivelse: '100 % stearin, seks timers brenntid per lys. 300 lystimer i pakken.',
    hvorfor:
      'Det eneste lyset som ikke går tomt for batteri. Aldri uten tilsyn.',
    kategori: 'Varme og lys',
    type: 'forbruk',
    moduser: ['komplett'],
    enhet: 'pakke',
    pris: 60,
    holdbarhetAr: 10,
    vektKg: 1,
    dsb: 'Lys: et lager med stearinlys eller telys',
    produkt: {
      merke: 'Biltema',
      modell: 'Telys av stearin 50-pk, art. 47-1676',
      kilde: 'Biltema, observert 20.09.2026: 59,90 kr',
      url: 'https://www.biltema.no/hjem/innredning-og-dekorasjon/lys-og-lyslykter/telys/telys-av-stearin-50-pakning-2000047849',
    },
    // 300 lystimer. Tre lys i fem timer hver kveld i sju døgn er 18 av 50.
    // To pakker er overflod, uansett husstandsstørrelse.
    antall: () => 1,
  },
  {
    sku: 'nodteppe',
    navn: 'Nødteppe, 140 × 220 cm',
    beskrivelse: 'Aluminiumsbelagt polyeten, 50 gram, pakkes til lommestørrelse.',
    hvorfor:
      'For det ene tilfellet der dere må forlate boligen. Hjemme bruker du dyna.',
    kategori: 'Varme og lys',
    type: 'forbruk',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 30,
    // Folien sprekker i brettekantene etter noen år i en kald bod.
    holdbarhetAr: 5,
    vektKg: 0.05,
    dsb: 'Varme: hold på kroppsvarmen',
    produkt: {
      merke: 'Biltema',
      modell: 'Aluminiumsteppe 140 × 220 cm, art. 40-495',
      kilde: 'Biltema, observert 20.09.2026: 29,90 kr',
      url: 'https://www.biltema.no/bil---mc/biltilbehor/sikkerhetsdetaljer/aluminiumsteppe-140-x-220-cm-2000042007',
    },
    antall: (p) => p,
  },

  // ---------------------------------------------------------------------------
  // Strøm og samband
  // ---------------------------------------------------------------------------
  {
    sku: 'nodradio',
    navn: 'Sangean MMR-88 DAB nødradio',
    beskrivelse:
      'Ekte DAB+, FM og RDS med 20 DAB-forhåndsvalg. Byttbart 18350-litiumbatteri, lading via micro-USB, solcelle eller håndsveiv. USB-utgang for nødlading av mobil, lommelykt, 374 gram.',
    hvorfor:
      'FM-riksnettet er slukket. NRK P1 går på DAB+, og batteriet kan byttes.',
    kategori: 'Strøm og samband',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 1190,
    holdbarhetAr: null,
    vektKg: 0.374,
    dsb: 'Informasjon: DAB-radio med batteri',
    produkt: {
      merke: 'Sangean',
      modell: 'MMR-88 DAB (Survivor-serien), gul',
      kilde: 'Clas Ohlson og NetOnNet, observert 20.09.2026: 1 190 kr',
      url: 'https://www.clasohlson.com/no/Sangean-sveiveradio-MMR88-DAB-USB,-solcelle-og-dynamo/p/31-8820',
    },
    // Avvist: MMR-99 (1 697–1 947 kr) har IP55 og Bluetooth-høyttaler, men
    // løser et problem denne esken ikke har – radioen skal stå tørt på
    // kjøkkenbenken. Umerkede import-nødradioer med «4500 mAh» er avvist på
    // regelen om at vi alltid navngir merke og modell.
    // Rimeligere alternativ vi kan tilby på forespørsel: Nedis DAB+ til 995 kr
    // med USB-C og 2 500 mAh, men med fastloddet batteri.
    // Radio er en delt informasjonskilde som står på kjøkkenbenken og høres
    // av alle i rommet – ikke et per-person-produkt. Vi legger ikke inn
    // radio nummer to i åtte-personersboksen for å få lista til å vokse.
    antall: () => 1,
  },

  /*
   * Tillegg.
   *
   * Tillegg er ikke med før kunden krysser dem av. De skal tåle den samme
   * testen som resten av katalogen, med ett unntak vi er åpne om: LoRa krever
   * mer av brukeren enn noe annet i esken. Vi løser det ved å levere enhetene
   * ferdig satt opp – se varens egen tekst.
   */
  {
    sku: 'pmr-radio',
    navn: 'Motorola Talkabout T42, toveisradio (2-pakning)',
    beskrivelse:
      'PMR446-radioer med åtte kanaler. Ingen lisens, ingen oppsett – sett i batterier, velg kanal, snakk.',
    hvorfor:
      'Tale når mobilnettet er nede. Én til to kilometer i by, mer i åpent terreng.',
    kategori: 'Strøm og samband',
    type: 'engang',
    tillegg: true,
    enhet: 'sett',
    pris: 319,
    holdbarhetAr: null,
    vektKg: 0.2,
    dsb: 'Informasjon: kommunikasjon når mobilnettet er borte',
    produkt: {
      merke: 'Motorola',
      modell: 'Talkabout T42',
      kilde: 'avxperten.no 319 kr, observert 20.09.2026',
      url: '',
    },
    antall: (p) => Math.max(1, Math.ceil(p / 4)),
  },
  {
    sku: 'meshtastic',
    navn: 'Meshtastic-sett, ferdig satt opp (2 enheter)',
    beskrivelse:
      'To SenseCAP T1000-E på 868 MHz. Sender tekstmeldinger mellom telefoner uten mobilnett, og videresender for andre i rekkevidde.',
    hvorfor:
      'Meldinger når nettet er nede. Vi setter opp frekvens og kanal før forsendelse, så de virker ut av esken.',
    kategori: 'Strøm og samband',
    type: 'engang',
    tillegg: true,
    enhet: 'sett',
    pris: 1798,
    holdbarhetAr: null,
    vektKg: 0.1,
    dsb: 'Informasjon: kommunikasjon når mobilnettet er borte',
    produkt: {
      merke: 'Seeed Studio',
      modell: 'SenseCAP Card Tracker T1000-E',
      kilde: 'Observert 899 kr per enhet. Kjøpes fra EØS-forhandler, så importøransvaret ligger hos dem. Lagerstatus må bekreftes per ordre.',
      url: '',
    },
    /*
     * Tre ting denne varen ikke skal selges uten at kunden får vite:
     *
     * 1. Den sender TEKST, ikke tale. Telefonen er skjerm og tastatur, og den
     *    virker fint uten nett – men den må ha strøm, så powerbanken hører med.
     * 2. Rekkevidden avhenger av hvem andre som har utstyret. To enheter alene
     *    er punkt til punkt, to til ni kilometer med fri sikt og mindre i skog.
     *    Nettet er tettest rundt Oslo og Bergen og tynt nord for Trøndelag.
     * 3. Vi leverer dem satt til frekvensen det norske miljøet bruker, ikke
     *    fabrikkinnstillingen – den kolliderer med norske AMS-målere.
     *
     * Alle tre står i produktteksten på siden. Å selge dette uten dem ville
     * vært å gjøre nøyaktig det vi kritiserer markedet for.
     */
    bruksanvisning: 'beredskap/meshtastic.html',
    forbehold: [
      'Det er tekst, ikke tale. Telefonen er skjerm og tastatur – den virker uten nett, men trenger strøm, så powerbanken hører med.',
      'Rekkevidden avhenger av hvem andre som har utstyret. To enheter alene rekker to til ni kilometer med fri sikt, mindre i skog. Nettet er tettest rundt Oslo og Bergen og tynt nord for Trøndelag.',
      'Vi setter dem til frekvensen det norske miljøet bruker, ikke fabrikkinnstillingen – den kolliderer med norske strømmålere.',
    ],
    antall: (p) => 1,
  },
  {
    sku: 'powerbank',
    navn: 'Anker PowerCore 20 000 mAh',
    beskrivelse:
      '20 000 mAh med USB-C inn og ut. Lader en mobil fire til fem ganger, eller en radio og en lykt flere ganger over.',
    hvorfor:
      '20 000 mAh og lav selvutlading. Lad den to ganger i året.',
    kategori: 'Strøm og samband',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 659,
    holdbarhetAr: null,
    vektKg: 0.35,
    dsb: 'Informasjon: batterier og ladet batteribank',
    produkt: {
      merke: 'Anker',
      modell: 'PowerCore 20000',
      kilde: 'Observert 659 kr, se docs/leverandorer.md',
      url: '',
    },
    antall: (p) => Math.ceil(p / 5),
  },

  // ---------------------------------------------------------------------------
  // Helse og hygiene
  // ---------------------------------------------------------------------------
  {
    sku: 'forstehjelp',
    navn: 'Lifesystems Waterproof førstehjelpssett',
    beskrivelse:
      'Rulleforseglet vanntett pakke, 500 gram: gjenopplivningsmaske, saks, pinsett, termometer, to par nitrilhansker, crepebandasje, trekanttørkle, fem sterile kompresser, sårpute 12 × 12 cm, sårlukkingsstrips, seks saltvannservietter, brannskadegel, plaster og gnagsårplaster.',
    hvorfor:
      'Rulleforseglet vanntett, med publisert innholdsliste. Trykkbandasje ligger ved siden av.',
    kategori: 'Helse og hygiene',
    type: 'forbruk',
    moduser: ['komplett'],
    enhet: 'sett',
    pris: 749,
    holdbarhetAr: 5,
    vektKg: 0.5,
    dsb: 'Legemidler: førstehjelpsutstyr',
    produkt: {
      merke: 'Lifesystems',
      modell: 'Waterproof First Aid Kit, art. LIFE-2020, 330 × 160 × 80 mm',
      kilde: 'Norsegear, observert 20.09.2026: 749 kr',
      url: 'https://www.norsegear.no/life-2020-lifesystems-waterproof-first-aid-kit',
    },
    // Avvist: BFG Micro Trauma Kit, Direct Action-båre og HyFin brystforsegling
    // er militært traumeutstyr. Det er feil merkevare og feil problem for en
    // småbarnsfamilie, uansett hvor godt det er. Care Plus-settene er laget for
    // reisemål med utrygge nåler, ikke for sju døgn hjemme i Norge.
    // Ett husstandssett dekker inntil seks personer. Sårstell skalerer ikke
    // lineært med antall hoder slik mat og hygiene gjør.
    antall: (p) => Math.ceil(p / 6),
  },
  {
    sku: 'blodstopper',
    navn: 'Cederroth 4-in-1 blodstopper',
    beskrivelse:
      'Steril trykkbandasje: én kompress 14 × 23 cm og to elastiske bind på 10 cm × 3 m, med bildeinstruksjon trykt på emballasjen.',
    hvorfor:
      'For blødningen som ikke stopper. Instruksjon med bilder på utsiden.',
    kategori: 'Helse og hygiene',
    type: 'forbruk',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 99,
    holdbarhetAr: 5,
    vektKg: 0.1,
    dsb: 'Legemidler: førstehjelpsutstyr',
    produkt: {
      merke: 'Cederroth (Essity)',
      modell: 'Blodstopper 1910 NO 4-in-1, art. CR201040',
      kilde: 'Røde Kors Førstehjelp, observert 20.09.2026: 98,75 kr',
      url: 'https://www.rodekorsforstehjelp.no/produkter/blodstopper-cederroth-1910-no-4-in-1-cr201040/',
    },
    // Aldri under to, deretter én per påbegynte to personer. En trykkbandasje
    // brukes opp på ett sår, og da skal det ligge en til igjen i esken.
    antall: (p) => Math.max(2, Math.ceil(p / 2)),
  },
  {
    sku: 'hygienepakke',
    navn: 'Hygienepakke',
    beskrivelse:
      'Våtservietter, håndsprit, kraftige søppelsekker, toalettpapir og en pakke engangskluter.',
    hvorfor:
      'Uten vann virker heller ikke toalettet. Det blir vanskeligere enn maten.',
    kategori: 'Helse og hygiene',
    type: 'forbruk',
    moduser: ['komplett'],
    enhet: 'sett',
    pris: 149,
    holdbarhetAr: 3,
    vektKg: 1.2,
    dsb: 'Hygiene: våtservietter, håndsprit og søppelsekker',
    produkt: {
      merke: 'Ikke låst – settes sammen av standardvarer',
      modell: 'Nødboks hygienesett',
      kilde: 'ANSLAG. 149 kr er summen av typiske norske butikkpriser for delene, ikke en observert pakkepris.',
      url: '',
    },
    // Hygiene er reelt forbruk per hode, og skalerer raskere enn
    // førstehjelpen: ett sett per påbegynte fem personer.
    antall: (p) => Math.ceil(p / 5),
  },

  {
    sku: 'bottetoalett',
    navn: 'Bøttetoalett 22 liter med sete og lokk',
    beskrivelse:
      'Bøtte med ekte toalettsete og tett lokk. Sittehøyde 37 cm, bæreevne 130 kg. Brukes med dobbel søppelsekk og absorbent.',
    hvorfor:
      'Sittehøyde 37 cm, bæreevne 130 kg. En bøtte uten sete kan ikke eldre og barn bruke.',
    kategori: 'Helse og hygiene',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 399,
    holdbarhetAr: null,
    vektKg: 1.8,
    dsb: 'Hygiene: nødtoalett når vannet er borte',
    produkt: {
      merke: 'Home And Beauty',
      modell: 'Bøttetoalett 22 l',
      kilde: 'Observert 399 kr. MERK: var utsolgt ved kontroll – lagerstatus må bekreftes før lansering.',
      url: '',
    },
    // Flere enn ett handler ikke om kø, men om posebytte: når en pose er full
    // må den knytes og bæres ut, og da er det greit å ha et toalett igjen.
    antall: (p) => Math.ceil(p / 4),
  },

  // ---------------------------------------------------------------------------
  // Verktøy og dokumenter
  // ---------------------------------------------------------------------------
  {
    sku: 'multiverktoy',
    navn: 'Leatherman Rev multiverktøy',
    beskrivelse:
      'Fjorten verktøy i rustfritt 420HC-stål: låsbart knivblad, kombitang med avbiter, fil, wirestripper, boks- og flaskeåpner og flere skrutrekkere. Lukket 97 mm, 168 gram, avtakbar belteklips.',
    hvorfor:
      'Knivbladet låses i åpen stilling. 25 års garanti fra Leatherman.',
    kategori: 'Verktøy og dokumenter',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 799,
    holdbarhetAr: null,
    vektKg: 0.168,
    dsb: 'Annet: verktøy til enkle reparasjoner',
    produkt: {
      merke: 'Leatherman',
      modell: 'Rev, 14 funksjoner, 420HC rustfritt stål',
      kilde: 'Clas Ohlson, observert 20.09.2026: 799 kr. Var oppgitt utsolgt i nettbutikken – sjekk lager før bestilling.',
      url: 'https://www.clasohlson.com/no/Leatherman-Rev-multiverkt%C3%B8y/p/Pr311725000',
    },
    // Wave+ til 1 799 kr gir sag og saks, og er en reell funksjonsutvidelse for
    // den som vil ha den – men ikke noe en beredskapseske trenger. Free P4 og
    // Signal er dyrere uten å løse et problem esken har. Vi valgte bevisst et
    // multiverktøy framfor en ren kniv, men Mora Companion Spark til 399 kr er
    // et godt og billigere valg for den som heller vil ha kniv og fyrstål.
    // Ett verktøy per påbegynte fire personer, som kokeapparatet: det andre er
    // redundans og gjør at to personer kan jobbe hver for seg.
    antall: (p) => Math.ceil(p / 8),
  },
  {
    sku: 'beredskapsperm',
    navn: 'Beredskapspermen',
    beskrivelse:
      'Trykt hefte: hva du gjør de første timene, sju døgns menyplan med tilberedning, DSBs egen sjekkliste, skjema for kontakter og medisiner, og en kontantkonvolutt med valørtabell og dato for sist fylt.',
    hvorfor:
      'Papir virker når telefonen er død. Menyplanen står trykt, døgn for døgn, og konvolutten viser hva som ligger i den uten at du åpner den.',
    kategori: 'Verktøy og dokumenter',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 199,
    // Eneste reelle kostnadstall i katalogen: trykk og innbinding i opplag.
    holdbarhetAr: null,
    vektKg: 0.25,
    dsb: 'Informasjon: viktige papirer og kontanter',
    produkt: {
      merke: 'Nødboks',
      modell: 'Beredskapspermen, 1. utgave',
      kilde: 'Egen trykksak. Kostnaden er trykkeanslag ved 500 eksemplarer.',
      url: '',
    },
    antall: () => 1,
  },
]

export const finnMatniva = (id) => MATNIVAER.find((m) => m.id === id) ?? MATNIVAER[0]
export const finnModus = (id) => MODUSER.find((m) => m.id === id) ?? MODUSER[0]
