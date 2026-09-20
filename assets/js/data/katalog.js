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

export const ESKER = [
  /*
   * Kassene.
   *
   * Premiumsourcingen anbefalte Zarges Eurobox i aluminium til 3 399 kr. Den er
   * overprøvd, og begrunnelsen er premisset vårt eget: utstyret skal være noe
   * kunden faktisk bruker. Ingen tar en aluminiumskoffert med på fjellet, og en
   * koffert gjør ingenting for en boks makrell som en dokumentert plastkasse
   * ikke gjør. Med tre kasser til en familie på seks ville det lagt over elleve
   * tusen kroner på emballasje alene.
   *
   * SmartStore Dry 45 fra Orthex er det motsatte av en merkevarepremie: IP44,
   * tåler −40 til +70 °C, næringsmiddelgodkjent, ti års garanti, stablbar.
   * Den gjør jobben, og pengene går til utstyret inni.
   */
  {
    sku: 'eske-liten',
    navn: 'Nødboks Liten – én kasse på 45 liter',
    beskrivelse:
      'Én stablebar SmartStore Dry 45 med tetningslist og klips, merket med innholdsliste og byttedato.',
    hvorfor:
      'Én kasse tar mat, vann og utstyr til én eller to personer, og den kan bæres av én person ned i boden uten hjelp.',
    maksPersoner: 2,
    liter: 45,
    pris: 299,
    innkjop: 179.4,
    vektKg: 2.4,
    produkt: {
      merke: 'Orthex',
      modell: 'SmartStore Dry 45',
      kilde: 'Europris 299 kr, observert 20.09.2026',
      url: '',
    },
  },
  {
    sku: 'eske-mellom',
    navn: 'Nødboks Mellom – to kasser på 45 liter',
    beskrivelse:
      'To stablebare kasser: én for mat, én for vann og utstyr. Stables i hverandre og merkes hver for seg.',
    hvorfor:
      'Maten til en familie på fire veier rundt 36 kilo. Delt på to kasser kan hver av dem faktisk løftes, og du slipper å tømme hele boksen for å finne lommelykten.',
    maksPersoner: 5,
    liter: 90,
    pris: 598,
    innkjop: 358.8,
    vektKg: 4.8,
    produkt: {
      merke: 'Orthex',
      modell: 'SmartStore Dry 45 × 2',
      kilde: 'Europris 299 kr per kasse, observert 20.09.2026',
      url: '',
    },
  },
  {
    sku: 'eske-stor',
    navn: 'Nødboks Stor – tre kasser på 45 liter',
    beskrivelse:
      'Tre stablebare kasser: mat, vann og utstyr hver for seg, merket med innhold og byttedato.',
    hvorfor:
      'Over fem personer blir én kasse per kategori det eneste som lar seg løfte. Da finner du også fram uten å tømme alt på gulvet.',
    maksPersoner: 8,
    liter: 135,
    pris: 897,
    innkjop: 538.2,
    vektKg: 7.2,
    produkt: {
      merke: 'Orthex',
      modell: 'SmartStore Dry 45 × 3',
      kilde: 'Europris 299 kr per kasse, observert 20.09.2026',
      url: '',
    },
  },
]

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
  {
    id: 'halvarlig',
    navn: 'Halvårlig påfyll',
    beskrivelse:
      'For husstander som vil ha det ferskeste lageret, og for deg som også vil ha meieri og annet med kort dato i samme forsendelse.',
    intervallDager: 182,
    rabatt: 0.15,
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
      'Brødet i boksen. Det er det eneste brødsubstituttet som verken krever vann, varme eller kjøleskap, og det tåler romtemperatur også etter at pakken er åpnet.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'pakke',
    pris: 30,
    innkjop: 17.95,
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
      'Den mest barnevennlige varen i hele boksen, og den med lengst dokumentert holdbarhet: 1 800 dager ved 2–25 grader. Et barn som får leverpostei på knekkebrød merker ikke at det er krise.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'stk',
    pris: 25,
    innkjop: 14.95,
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
      'Tredje pålegg i rotasjonen, slik at ingen spiser leverpostei sju dager på rad. Tuben tåler å ligge åpnet i en kald leilighet, i motsetning til nesten alt annet pålegg.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'stk',
    pris: 37,
    innkjop: 22.3,
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
      'Fet fisk og protein i en meny som ellers er korn og hermetikk. 170 g-boksen er billigere per kilo enn den lille og ikke utsolgt hos leverandør, slik 110 g-boksen var da vi sjekket.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'stk',
    pris: 35,
    innkjop: 20.95,
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
      'Frokost på knekkebrød de dagene ingen orker grøt, og det billigste vi kan legge i boksen som får et barn til å se fram til et måltid. 66 kalorier per krone gjør den dessuten til et av de mest effektive kjøpene i lista.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'stk',
    pris: 28,
    innkjop: 16.75,
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
      'DSB navngir sjokolade i sin egen liste, og grunnen er ikke kalorier. Et kveldsmåltid som ligner en vanlig kveld er det som gjør at sju døgn går an å holde ut, særlig med barn i huset.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'stk',
    pris: 30,
    innkjop: 17.95,
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
      'Kveldsmat uten tilberedning, og det som holder ut lengst av alt i posen når noen blir kvalm eller ikke orker et helt måltid.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'pakke',
    pris: 32,
    innkjop: 19.15,
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
      'Den nest beste kalorien per krone i hele boksen, og fett og protein i en meny som ellers er tung på karbohydrat. Merk pakken: hele nøtter er kvelningsfare for barn under fire år.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'pakke',
    pris: 40,
    innkjop: 24.2,
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
      'Det som gjør havregrøt på vann til noe et barn spiser. DSB navngir tørket frukt, og dette er den formen som tåler å ligge i en kald bod.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'pakke',
    pris: 55,
    innkjop: 33.3,
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
      'Noe varmt å drikke som ikke er kaffe, og det eneste i boksen som gjør et krus kokt vann til noe barn ber om. Rører seg også ut i kaldt vann hvis brenselet må spares.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'stk',
    pris: 55,
    innkjop: 32.95,
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
      'Jobben er ikke næring, men C-vitamin og noe friskt på døgn tre til fem, når alt annet har smakt hermetikk. Én boks per husstand uansett størrelse – mer er overflod.',
    kategori: 'Mat',
    type: 'forbruk',
    enhet: 'stk',
    pris: 31,
    innkjop: 18.7,
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
      'Den klart beste kalorien per krone i hele katalogen, rundt 150 kcal per krone. Grynene kan også bløtlegges kaldt over natten hvis brenselet må spares, og det er få andre varmretter som kan det.',
    kategori: 'Mat',
    type: 'forbruk',
    matnivaer: ['torrmat'],
    enhet: 'pakke',
    pris: 27,
    innkjop: 16.15,
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
      'Den eneste middagen i hele sortimentet som kan spises kald rett fra boksen hvis både strøm og brensel er borte. Rundt 600 gram av innholdet er dessuten vann som ikke tappes av de 20 literne. Vi kjøper den for vann og moral, ikke for kalorier.',
    kategori: 'Mat',
    type: 'forbruk',
    matnivaer: ['torrmat'],
    enhet: 'stk',
    pris: 67,
    innkjop: 40.4,
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
      'Norskprodusert i Tromsø, og 702 kcal per pose mot 400–525 i den ordinære turmat-linjen. Vi kjøper enkeltposer nettopp for å styre utvalget: produsentens egen beredskapspakke har 12 av 28 middager i karri-, chili- og fiskesjiktet, og det er retter mange norske barn ikke spiser.',
    kategori: 'Mat',
    type: 'forbruk',
    matnivaer: ['langtidsmat'],
    enhet: 'porsjon',
    pris: 129,
    innkjop: 77.4,
    // Fem år garantert fra produksjon. Produsenten oppgir 5–7 år indikativt.
    holdbarhetAr: 5,
    kcal: 702,
    vektKg: 0.15,
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
      'Frokosten er det eneste måltidet i langtidsmat-pakken som ikke krever kokeplate, og det er poenget: går gassen tom på døgn fire, stopper ikke frokosten – den blir bare kald.',
    kategori: 'Mat',
    type: 'forbruk',
    matnivaer: ['langtidsmat'],
    enhet: 'porsjon',
    pris: 93,
    innkjop: 55.7,
    holdbarhetAr: 5,
    kcal: 450,
    vektKg: 0.1,
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
      'Ti liter er den eneste størrelsen hele husstanden kan bruke. En full 20-literskanne veier 21 kilo og kan i praksis ikke bæres eller helles av et barn, en gravid eller en eldre – og det er akkurat de som skal kunne hente vann når det står på. Gjennomsiktig plast betyr at du ser nivået og ser om vannet er blitt uklart, uten å åpne.',
    kategori: 'Vann',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 60,
    innkjop: 35.95,
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
      'Sju døgn er lang nok tid til at en kanne kan gå tom eller et kokevarsel kan komme. Da er 70 gram tabletter forskjellen på å ha vann og ikke ha det. Merk at tabletter desinfiserer mot bakterier og virus i klart vann – de fjerner ikke partikler, tungmetaller eller kjemisk forurensning.',
    kategori: 'Vann',
    type: 'forbruk',
    enhet: 'pakke',
    pris: 149,
    innkjop: 89.4,
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
      'Klortabletter desinfiserer, men de fjerner verken partikler eller protozoer, og de gjør ikke bekkevann klart. Filteret gjør det, og det tar to minutter å fylle fire liter gjennom det. Dette er filteret norske langturfolk faktisk går med – det er ment å ligge i sekken på en helgetur og bli fylt fra en bekk, ikke å ligge urørt i esken. Merk to ting: membranen fjerner ikke virus, så tablettene blir liggende ved siden av, og den tåler ikke å fryse mens den er våt. Filteret skal ligge tomt og tørt.',
    kategori: 'Vann',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 799,
    innkjop: 479.4,
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
      'Vindskjermen er selve konstruksjonen, ikke et tilbehør, og det er den som gjør at apparatet virker på en balkong i november. Settet gir deg to brennstoffer å velge mellom: gass når det skal gå fort, eller rødsprit hvis du vil ha noe som tåler å stå glemt i en bod i årevis – og rødspriten bryr seg ikke om at det er tjue kuldegrader, mens en gassboks mister trykk. HA-varianten er valgt framfor den bare aluminiumsutgaven av to grunner du merker i bruk: begge kokekarene er slippbelagt, så maten ikke brenner seg fast og oppvasken kan gjøres med en kopp vann i stedet for en bøtte, og den hardanodiserte ramma tåler riper og slag markant bedre. Det er 400 kroner mer enn 25-1, og det er et kjøkken familien tar med på hyttetur, ikke et apparat som pakkes ut første gang i en krise. Brennstoffet kjøper du selv – se hvorfor i listen over det vi ikke selger. Apparatet er ikke godkjent for lukket rom: bruk det med vindu på gløtt, aldri mens du sover, og la CO-varsleren stå i samme rom.',
    kategori: 'Matlaging',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'sett',
    pris: 1698,
    innkjop: 1018.8,
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
      'Kokeapparatet er ikke godkjent for lukket rom, men vi vet at folk kommer til å bruke det inne når det er kaldt og mørkt. Karbonmonoksid er luktfritt, og de første symptomene ligner influensa. Dette er den billigste varen i esken som kan redde liv, og den eneste grunnen til at vi tør selge et kokeapparat til en husstand som skal klare seg i sju døgn.',
    kategori: 'Varme og lys',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 349,
    innkjop: 209,
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
      'Tenningen. Piezotenning er det første som slutter å virke etter år i kald, fuktig lagring, og det er et bekvemmelighetstrekk man verken skal betale for eller stole på.',
    kategori: 'Matlaging',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'pakke',
    pris: 13,
    innkjop: 7.75,
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
      'Hodelykt slår lommelykt fordi begge hendene blir ledige – du skal bære vann, lage mat og lese på en medisinpakning. Batteritypen er det viktigste valget, og Actik Core er den eneste måten å slippe å velge: den lades på USB som en vanlig lykt, og tar du ut pakken, går den på tre AAA fra kjøkkenskuffen. Lykten kjenner selv igjen hvilken type som står i. Det røde lyset er fast, ikke et blinkende signallys, så én person kan bevege seg i et rom der andre sover uten å ødelegge nattesynet for dem. Dette er lykten som faktisk blir med på kveldstur og hyttetur – det er også grunnen til at den virker den kvelden det gjelder, i stedet for å være et ukjent apparat man fomler med i mørket. Hodebånd og batteripakke selges som reservedeler, så lykten kan repareres i stedet for å kastes.',
    kategori: 'Varme og lys',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 574,
    innkjop: 344.4,
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
      'Fire personer med hodelykter rundt et bord lyser hverandre i ansiktet og ser ingenting på bordet. Romlys er det som gjør at en familie kan spise og spille kort sammen i stedet for å sitte i hver sin lyskjegle. Det som skiller denne fra en billig campinglykt er to uavhengige strømkilder i samme lampe: den lades magnetisk på USB, og går den tom, tar den fire AA. Lyset er varmt og ikke blåhvitt, og det betyr mer enn man tror rundt et kjøkkenbord på døgn fem. 71 gram og karabinkrok gjør at den faktisk blir med i sekken på tur – det er meningen.',
    kategori: 'Varme og lys',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 474,
    innkjop: 284.4,
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
      'DSBs råd om lys slutter med «husk ekstra batterier», og det er en del av rådet, ikke et mersalg. AAA er reserven til hodelykten: Petzl-lykten lades på USB til daglig, men tar tre vanlige AAA når pakken er tom, og da er det disse som ligger klare. Alkaliske batterier holder rundt ti år på lager og er de samme du får kjøpt i enhver butikk.',
    kategori: 'Varme og lys',
    type: 'forbruk',
    moduser: ['komplett'],
    enhet: 'pakke',
    pris: 80,
    innkjop: 47.95,
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
      'Det eneste lyset i esken som ikke kan gå tomt for batteri, og DSB navngir det selv. Rekkefølgen skal likevel være tydelig: batterilys først, telys som reserve. Mer bruk av åpen ild i en mørk bolig er den vanligste måten et strømbrudd blir til en brann på – aldri uten tilsyn, aldri på soverom.',
    kategori: 'Varme og lys',
    type: 'forbruk',
    moduser: ['komplett'],
    enhet: 'pakke',
    pris: 60,
    innkjop: 35.95,
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
      'Med i esken for det ene tilfellet der husstanden må forlate boligen: teppet ligger i sekken, dyna gjør ikke det. Den varmen du skal bruke hjemme er pledd, dyner og soveposer du allerede eier – det er også det DSB faktisk anbefaler. Merk at teppet er lettantennelig og ikke skal i nærheten av telysene i samme eske.',
    kategori: 'Varme og lys',
    type: 'forbruk',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 30,
    innkjop: 17.95,
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
      'NRKs FM-riksnett ble slukket i 2017, og NRK P1 – myndighetenes beredskapskanal – sendes på DAB+. En ren FM-radio dekker derfor ikke DSBs råd i Norge. Det som skiller MMR-88 fra en billig nødradio er at batteriet kan byttes: cellen er en standard ICR18350 som selges løst, så et batteri som er blitt dårlig etter åtte år koster et batteri, ikke en ny radio. Sangean har laget radioer siden 1974 og ble kåret til best i test hos Tek.no i 2025. Om sveiven: den er siste utvei – driftsformen er ladet batteri, solcelle i vinduet og lading fra powerbanken. To ærlige forbehold: radioen lades på micro-USB, ikke USB-C som resten av esken, så du trenger den ene ekstra kabelen. Og vi finner ingen offisiell IP-klasse fra produsenten, så vi sier vannavstøtende og ikke noe tall.',
    kategori: 'Strøm og samband',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 1190,
    innkjop: 714,
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
  {
    sku: 'powerbank',
    navn: 'Anker PowerCore 20 000 mAh',
    beskrivelse:
      '20 000 mAh med USB-C inn og ut. Lader en mobil fire til fem ganger, eller en radio og en lykt flere ganger over.',
    hvorfor:
      'Valgt på kapasitet og lav selvutlading, ikke på ladeeffekt. Den dyrere Prime-modellen gir 220 W og et display – fint på reise, men ingen beredskapsfunksjon, og den koster tusen kroner mer for samme antall mobiloppladninger. Lad den opp to ganger i året; den mister lite strøm i mellomtiden.',
    kategori: 'Strøm og samband',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 659,
    innkjop: 395.4,
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
      'Med fordi legevakt og ambulanse kan være forsinket når mange trenger hjelp samtidig. Vi valgte dette framfor et rimeligere husstandsskrin av to grunner: innholdslisten er publisert av produsenten stykke for stykke, så vi kan skrive nøyaktig hva du får i stedet for «plaster i flere størrelser», og pakken er rulleforseglet vanntett. Et førstehjelpssett som har ligget åtte år i en fuktig bod, er ikke sterilt lenger. Det er samtidig et sett en turgåer kjenner igjen fra egen sekk, og det er poenget med hele esken. Merk hva settet IKKE har: produsenten sier selv at det ikke inneholder trykkbandasje – den ligger som egen vare ved siden av. Reseptbelagte legemidler, faste medisiner og allergimedisin må du legge ved selv, og vi minner om det i utløpsvarselet.',
    kategori: 'Helse og hygiene',
    type: 'forbruk',
    moduser: ['komplett'],
    enhet: 'sett',
    pris: 749,
    innkjop: 449.4,
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
      'Førstehjelpssettet dekker kutt, gnagsår og brannskader. Det dekker ikke en blødning som ikke stopper, og produsenten sier det selv. Dette er varen som gjør det – én pakke gir trykk på såret og holder det der, og instruksjonen står med bilder på utsiden slik at den kan brukes av noen som ikke har hatt kurs. Dette er ikke en oppgradering vi selger deg fordi det er premium; det er den ene delen av helsekategorien vi mener er nødvendig. To pakker er minimum, fordi den ene brukes opp på ett sår.',
    kategori: 'Helse og hygiene',
    type: 'forbruk',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 99,
    innkjop: 59.25,
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
      'Uten vann i springen blir hygiene raskt det vanskeligste, ikke maten. Søppelsekkene er med av en grunn folk ikke liker å tenke på: uten vann virker heller ikke toalettet, og en dobbel søppelsekk i toalettskålen er det som gjør en leilighet beboelig i sju døgn.',
    kategori: 'Helse og hygiene',
    type: 'forbruk',
    moduser: ['komplett'],
    enhet: 'sett',
    pris: 149,
    innkjop: 89.4,
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

  // ---------------------------------------------------------------------------
  // Verktøy og dokumenter
  // ---------------------------------------------------------------------------
  {
    sku: 'multiverktoy',
    navn: 'Leatherman Rev multiverktøy',
    beskrivelse:
      'Fjorten verktøy i rustfritt 420HC-stål: låsbart knivblad, kombitang med avbiter, fil, wirestripper, boks- og flaskeåpner og flere skrutrekkere. Lukket 97 mm, 168 gram, avtakbar belteklips.',
    hvorfor:
      'Det er ingen elektronikk, ingen gummi og ingen batterier i et multiverktøy, og det virker likt ved minus tjue som ved pluss tjue. Det viktigste er at knivbladet låses i åpen stilling – et blad som klapper igjen mens du skjærer, er den vanligste måten et billig multiverktøy gir deg et kutt du må behandle med innholdet i førstehjelpssettet. Leatherman gir 25 års garanti på egne verktøy og reparerer dem; et navnløst 13-i-1 til 250 kr har ingenting utover lovpålagt reklamasjonsrett. Dette er verktøyet som ligger i sekken på tur og i hanskerommet resten av året, og som derfor er kjent i hånda den dagen noe må åpnes, kuttes eller skrus i mørket.',
    kategori: 'Verktøy og dokumenter',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 799,
    innkjop: 479.4,
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
      'Trykt hefte: hva du gjør de første timene, sju døgns menyplan med tilberedning, DSBs egen sjekkliste, skjema for kontakter og medisiner, og en konvolutt til kontanter.',
    hvorfor:
      'Papir virker når telefonen er død. Menyplanen står trykt fordi den eneste måten å vite at maten faktisk rekker sju døgn, er å ha den fordelt på døgn på forhånd – og fordi minst to måltider hver dag skal kunne lages helt uten varme. Konvolutten er tom; kontanter legger du i selv, men vi minner om det, for kortterminaler går på strøm.',
    kategori: 'Verktøy og dokumenter',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 199,
    // Eneste reelle kostnadstall i katalogen: trykk og innbinding i opplag.
    innkjop: 49,
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
