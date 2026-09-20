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
 * `pris` er satt slik: mat prises på observert norsk butikkpris (vi tar
 * betalt for utvalget og logistikken, ikke for et påslag på matvarer), utstyr
 * prises rundt 85 % av observert butikkpris (volumet skal komme kunden til
 * gode og er vårt svar på at et Biltema-kjøp alltid er et alternativ).
 * Sammen med pakkerabatten gir det en dekningsgrad rundt 30 %.
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

export const ESKER = [
  {
    sku: 'eske-liten',
    navn: 'Nødboks Liten – én kasse på 50 liter',
    beskrivelse:
      'Én stablebar 50-liters kasse med tett lokk og hank, merket med innholdsliste og byttedato.',
    hvorfor:
      'Én kasse tar mat, vann og utstyr til én eller to personer, og den kan bæres av én person ned i boden uten hjelp.',
    maksPersoner: 2,
    liter: 50,
    pris: 249,
    innkjop: 149,
    vektKg: 2.4,
  },
  {
    sku: 'eske-mellom',
    navn: 'Nødboks Mellom – to kasser på 50 liter',
    beskrivelse:
      'To stablebare 50-liters kasser: én for mat, én for vann og utstyr. Stables i hverandre og merkes hver for seg.',
    hvorfor:
      'Maten til en familie på fire veier rundt 36 kilo. Delt på to kasser kan hver av dem faktisk løftes, og du slipper å tømme hele boksen for å finne lommelykten.',
    maksPersoner: 5,
    liter: 100,
    pris: 449,
    innkjop: 298,
    vektKg: 4.8,
  },
  {
    sku: 'eske-stor',
    navn: 'Nødboks Stor – tre kasser på 50 liter',
    beskrivelse:
      'Tre stablebare 50-liters kasser med tett lokk, merket mat, vann og utstyr.',
    hvorfor:
      'Fra seks personer og oppover blir matvekten alene over 50 kilo. Tre kasser holder hver enkelt under det en voksen kan bære i trapp.',
    maksPersoner: 8,
    liter: 150,
    pris: 649,
    innkjop: 447,
    vektKg: 7.2,
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
    pris: 51,
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
    pris: 127,
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

  // ---------------------------------------------------------------------------
  // Matlaging
  // ---------------------------------------------------------------------------
  {
    sku: 'kokeapparat',
    navn: 'Trangia Stormkjøkken 25-1 UL med gassbrenner',
    beskrivelse:
      'Stormkjøkken med dobbel vindskjerm, kokekar på 1,75 og 1,5 liter, stekepanne og gripetang, levert med gassbrenner på 2800 W. Spritbrenneren følger med settet fra fabrikk.',
    hvorfor:
      'Vindskjermen er selve konstruksjonen, ikke et tilbehør, og det er den som gjør at apparatet virker på en balkong i november. Settet gir deg to brennstoffer å velge mellom: gass når det skal gå fort, eller rødsprit hvis du vil ha noe som tåler å stå glemt i en bod i årevis. Brennstoffet kjøper du selv – se hvorfor i listen over det vi ikke selger. Apparatet er ikke godkjent for lukket rom: bruk det med vindu på gløtt, aldri mens du sover, og la CO-varsleren stå i samme rom.',
    kategori: 'Matlaging',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'sett',
    pris: 1198,
    innkjop: 778.8,
    holdbarhetAr: null,
    vektKg: 1.03,
    dsb: 'Mat: grill, kokeapparat eller stormkjøkken',
    produkt: {
      merke: 'Trangia + generisk gassbrenner',
      modell: 'Trangia 25-1 UL (Clas Ohlson 34-6993) + gassbrenner 2800 W med gjengeventil EN 417',
      kilde: 'Clas Ohlson 799 kr, Fangstmann 499 kr – begge observert 20.09.2026',
      url: 'https://www.clasohlson.com/no/Trangia-stormkjokken-25-1-UL/p/34-6993',
    },
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
    pris: 11,
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
    navn: 'Hodelykt 250 lumen',
    beskrivelse:
      'Tre lysnivåer inkludert rødt lys, 3 til 18 timers brenntid, IPX4. Går på tre vanlige AAA-batterier.',
    hvorfor:
      'Hodelykt slår lommelykt fordi begge hendene blir ledige – du skal bære vann, lage mat og lese på en medisinpakning. Batteritypen er det viktigste valget: en oppladbar lykt er ubrukelig på døgn tre uten strøm, mens AAA går så lenge du har batterier. Det røde nivået lar én person bevege seg i et rom der andre sover.',
    kategori: 'Varme og lys',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 59,
    innkjop: 41.95,
    holdbarhetAr: null,
    vektKg: 0.093,
    dsb: 'Lys: lommelykter eller hodelykter',
    produkt: {
      merke: 'Biltema',
      modell: 'Hodelykt 250 lm, art. 24-0301',
      kilde: 'Biltema, observert 20.09.2026: 69,90 kr',
      url: 'https://www.biltema.no/fritid/Belysning/hodelykt/hodelykt-250-lm-2000067364',
    },
    // Én per person fra rundt seks år, aldri færre enn to per husstand:
    // svikter den eneste lyskilden er man blind, og reservelykten er den
    // billigste forsikringen i hele esken. Flere av de kartlagte
    // konkurrentene gir en familie på seks én hodelykt.
    antall: (p) => Math.max(p, 2),
  },
  {
    sku: 'campinglykt',
    navn: 'Campinglykt 90 lumen',
    beskrivelse: 'Rundstrålende LED-lykt med krok og magnet. Samme AAA-batterier som hodelykten.',
    hvorfor:
      'Fire personer med hodelykter rundt et bord lyser hverandre i ansiktet og ser ingenting på bordet. Romlys er det som gjør at en familie kan spise og spille kort sammen i stedet for å sitte i hver sin lyskjegle.',
    kategori: 'Varme og lys',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 118,
    innkjop: 83.4,
    holdbarhetAr: null,
    vektKg: 0.13,
    dsb: 'Lys: lys i rommet, ikke bare i kjeglen',
    produkt: {
      merke: 'Biltema',
      modell: 'Campinglykt 90 lm, art. 24-977',
      kilde: 'Biltema, observert 20.09.2026: 139 kr',
      url: 'https://www.biltema.no/fritid/Belysning/lykter/campinglykt-90-lm-2000041334',
    },
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
      'DSBs råd om lys slutter med «husk ekstra batterier», og det er en del av rådet, ikke et mersalg. Hele lyskategorien går på ett batteriformat med vilje, slik at du aldri står med feil batteri i mørket.',
    kategori: 'Varme og lys',
    type: 'forbruk',
    moduser: ['komplett'],
    enhet: 'pakke',
    pris: 68,
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
    // personer med lykt, pluss campinglykta.
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
    pris: 51,
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
    pris: 25,
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
    navn: 'Nødradio med DAB+, solcelle og sveiv',
    beskrivelse:
      'Ekte DAB+ og FM, 2000 mAh batteri, lading via USB-C, solcelle eller håndsveiv. Lommelykt med SOS.',
    hvorfor:
      'NRKs FM-riksnett ble slukket i 2017, og NRK P1 – myndighetenes beredskapskanal – sendes på DAB+. En ren FM-radio dekker derfor ikke DSBs råd i Norge. Vi oppgir merke, modell og EAN, som ingen av de tolv konkurrentene vi kartla gjør. Om sveiven: ett minutt gir tre til fem minutters radio, så den er siste utvei – driftsformen er ladet batteri, solcelle i vinduet og USB-C fra powerbanken.',
    kategori: 'Strøm og samband',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 451,
    innkjop: 318,
    holdbarhetAr: null,
    vektKg: 0.35,
    dsb: 'Informasjon: DAB-radio med batteri',
    produkt: {
      merke: 'Denver A/S (Danmark)',
      modell: 'SCD-2033, EAN 5706751088483',
      kilde: 'Batterionline, observert 20.09.2026: 530 kr. Krisesikker selger samme vare til 799 kr uten å nevne merket.',
      url: 'https://www.batterionline.no/denver-scd-2033-n-dradio-h-ndsving-solcelle-lygte-powerbank-fm-am-dab-bt',
    },
    // Radio er en delt informasjonskilde som står på kjøkkenbenken og høres
    // av alle i rommet – ikke et per-person-produkt. Vi legger ikke inn
    // radio nummer to i åtte-personersboksen for å få lista til å vokse.
    antall: () => 1,
  },
  {
    sku: 'powerbank',
    navn: 'Powerbank 10 000 mAh med USB-C',
    beskrivelse: 'Nødlading til mobil, hodelykt og radio. USB-C inn og ut.',
    hvorfor:
      'Radioens eget batteri skal brukes til radio. Nødlading av mobil er en egen jobb, og 10 000 mAh er rundt to fulle telefonladinger – nok til å holde én telefon i live gjennom uka hvis den brukes med måte. Skal toppes opp én gang i året; det minner vi om sammen med matbyttet.',
    kategori: 'Strøm og samband',
    type: 'engang',
    moduser: ['komplett'],
    enhet: 'stk',
    pris: 212,
    innkjop: 149.4,
    holdbarhetAr: null,
    vektKg: 0.2,
    dsb: 'Informasjon: strøm til mobilen',
    produkt: {
      merke: 'Ikke låst – kandidater hos Biltema, Clas Ohlson og Jula',
      modell: '10 000 mAh, USB-C inn og ut',
      kilde: 'ANSLAG. Ingen enkeltmodell er verifisert; 249 kr er et typisk norsk prisnivå, ikke en observert pris på en navngitt vare.',
      url: '',
    },
    antall: (p) => Math.ceil(p / 6),
  },

  // ---------------------------------------------------------------------------
  // Helse og hygiene
  // ---------------------------------------------------------------------------
  {
    sku: 'forstehjelp',
    navn: 'Førstehjelpspakke for husstand',
    beskrivelse:
      'Plaster i flere størrelser, sterile kompresser, elastisk bind, saks, pinsett, engangshansker, termometer og en trykt veiledning.',
    hvorfor:
      'Med fordi legevakt og ambulanse kan være forsinket når mange trenger hjelp samtidig. Merk at dette er en pakke for småskader og sårstell – faste medisiner, reseptbelagte legemidler og allergimedisin må du legge ved selv, og vi minner om det i utløpsvarselet.',
    kategori: 'Helse og hygiene',
    type: 'forbruk',
    moduser: ['komplett'],
    enhet: 'sett',
    pris: 254,
    innkjop: 179.4,
    holdbarhetAr: 5,
    vektKg: 0.6,
    dsb: 'Legemidler: førstehjelpsutstyr',
    produkt: {
      merke: 'Ikke låst – kandidater Cederroth, Salvequick og Norsk Førstehjelp',
      modell: 'Husstandssett',
      kilde: 'ANSLAG. 299 kr er et typisk norsk prisnivå for et husstandssett, ikke en observert pris på en navngitt vare.',
      url: '',
    },
    // Ett husstandssett dekker inntil seks personer. Sårstell skalerer ikke
    // lineært med antall hoder slik mat og hygiene gjør.
    antall: (p) => Math.ceil(p / 6),
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
    pris: 127,
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
