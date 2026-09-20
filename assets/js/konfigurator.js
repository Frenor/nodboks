/**
 * Pakkebyggeren – ren regnelogikk, uten DOM.
 *
 * All produktkunnskap ligger i data/katalog.js. Denne filen vet bare hvordan
 * man setter sammen en pakke av den: hvilke varer som gjelder for valgt modus
 * og matnivå, hvor mange av hver, hvilken eske de får plass i, og hva det
 * koster. Funksjonene er rene, slik at de kan testes og gjenbrukes fra både
 * pakkebyggeren og en eventuell produktside.
 */

import {
  KONFIG,
  ESKER,
  VARER,
  MATNIVAER,
  MODUSER,
  PAFYLL,
  finnMatniva,
  finnModus,
} from './data/katalog.js'

/**
 * Merverdiavgift per varekategori.
 *
 * Næringsmidler har redusert sats. Alt annet – kanner, primus, lykter, radio –
 * er ordinær sats, også når det står i «Mat og vann»-gruppen i prispanelet.
 * Tomme vannkanner er utstyr, ikke drikkevarer.
 *
 * Satsen ligger her og ikke i grensesnittet, fordi både prispanelet og
 * selvtesten trenger den og de to ikke får lov til å sprike.
 */
export const MVA = { mat: 0.15, standard: 0.25 }
export const mvaSats = (kategori) => (kategori === 'Mat' ? MVA.mat : MVA.standard)

/** Kategoriene som vises samlet som «Mat og vann» i prispanelet. */
export const MATGRUPPER = ['Mat', 'Vann']

/**
 * Nedre grense for hva kunden kan krysse av som «har den fra før».
 *
 * Poenget er å slippe å kjøpe det dyre dobbelt. En eske fyrstikker til elleve
 * kroner fortjener ikke en avkrysning – den gjør bare steget lengre og valget
 * vanskeligere, og det er en dårlig byttehandel for begge parter.
 */
export const FRAVALG_TERSKEL = 100

/**
 * Innholdslisten grupperes etter DSBs egne fire overskrifter, ikke etter våre.
 *
 * DSBs trykte sjekkliste har nøyaktig fire: «Mat og vann», «Varme og lys»,
 * «Informasjon» og «Legemidler og hygiene». Ved å bruke de samme kan kunden
 * holde vår liste mot den offisielle linje for linje. Det er et sterkere
 * tillitsgrep enn kategorier vi finner på selv, og det koster oss ingenting.
 *
 * «Annet» og «Esken» er våre egne og står sist, tydelig atskilt fra DSBs.
 */
export const DSB_GRUPPER = {
  'Mat': 'Mat og vann',
  'Vann': 'Mat og vann',
  'Matlaging': 'Mat og vann',
  'Varme og lys': 'Varme og lys',
  'Strøm og samband': 'Informasjon',
  'Helse og hygiene': 'Legemidler og hygiene',
  'Verktøy og dokumenter': 'Annet',
  'Esken': 'Esken',
}

const GRUPPEREKKEFOLGE = [
  'Mat og vann',
  'Varme og lys',
  'Informasjon',
  'Legemidler og hygiene',
  'Annet',
  'Esken',
]

/** Hvilken av DSBs overskrifter varen hører under. */
export const dsbGruppe = (kategori) => DSB_GRUPPER[kategori] ?? 'Annet'

/** Klemmer personantallet inn i det katalogen faktisk dekker. */
export const klem = (n) =>
  Math.min(KONFIG.personerMaks, Math.max(KONFIG.personerMin, Math.round(n || 1)))

/** Gjelder varen for denne kombinasjonen av modus og matnivå? */
function gjelder(vare, { modus, matniva }) {
  if (vare.moduser && !vare.moduser.includes(modus)) return false
  if (vare.matnivaer && !vare.matnivaer.includes(matniva)) return false
  return true
}

/** Minste eske som tar husstanden. Faller tilbake til den største. */
export function velgEske(personer) {
  const p = klem(personer)
  return ESKER.find((e) => p <= e.maksPersoner) ?? ESKER[ESKER.length - 1]
}

/**
 * Setter sammen pakken.
 *
 * @param {{personer:number, matniva:string, modus:string, abonnement?:string|null}} valg
 * @returns pakkeobjekt med linjer, grupper, nøkkeltall og eventuelle varsler
 */
export function byggPakke(valg) {
  const personer = klem(valg.personer)
  const matniva = finnMatniva(valg.matniva)
  const modus = finnModus(valg.modus)
  const abonnementId = valg.abonnement ?? null
  const utelatt = new Set(valg.utelatt ?? [])

  const kontekst = { personer, matniva: matniva.id, modus: modus.id }

  let linjer = []
  for (const vare of VARER) {
    if (!gjelder(vare, kontekst)) continue
    const antall = Math.max(0, Math.ceil(vare.antall(personer)))
    if (antall === 0) continue
    linjer.push({
      sku: vare.sku,
      navn: vare.navn,
      beskrivelse: vare.beskrivelse,
      hvorfor: vare.hvorfor,
      kategori: vare.kategori,
      type: vare.type, // 'engang' (utstyr) eller 'forbruk'
      enhet: vare.enhet,
      antall,
      enhetspris: vare.pris,
      sum: vare.pris * antall,
      holdbarhetAr: vare.holdbarhetAr ?? null,
      dsb: vare.dsb ?? null,
      kcal: (vare.kcal ?? 0) * antall,
      liter: (vare.liter ?? 0) * antall,
      vekt: (vare.vektKg ?? 0) * antall,
    })
  }

  // Esken følger bare med i den komplette pakken; påfyll sendes i kartong.
  const eske = velgEske(personer)
  if (modus.medEske) {
    linjer.unshift({
      sku: eske.sku,
      navn: eske.navn,
      beskrivelse: eske.beskrivelse,
      hvorfor: eske.hvorfor,
      kategori: 'Esken',
      type: 'engang',
      enhet: 'stk',
      antall: 1,
      enhetspris: eske.pris,
      sum: eske.pris,
      holdbarhetAr: null,
      dsb: null,
      kcal: 0,
      liter: 0,
      vekt: eske.vektKg ?? 0,
    })
  }

  /*
   * Utstyr kunden allerede eier.
   *
   * Bare engangsutstyr kan velges bort – man «har ikke havregryn fra før» på en
   * måte som hjelper i sju døgn. Esken går heller ikke an å velge bort, fordi
   * resten ikke har noe å ligge i.
   *
   * Dette koster oss penger med vilje. En kunde som allerede har en god hodelykt
   * skal ikke måtte kjøpe en til for å få resten, og alternativet – at de lar
   * være å kjøpe noe – er dyrere for begge.
   */
  const kanVelgesBort = linjer.filter(
    (l) => l.type === 'engang' && l.kategori !== 'Esken' && l.sum >= FRAVALG_TERSKEL
  )
  const fravalgt = kanVelgesBort.filter((l) => utelatt.has(l.sku))
  const spart = fravalgt.reduce((n, l) => n + l.sum, 0)
  linjer = linjer.filter((l) => !utelatt.has(l.sku))

  const sumVarer = linjer.reduce((n, l) => n + l.sum, 0)
  const pakkerabatt = Math.round(sumVarer * (modus.rabatt ?? 0))
  const sum = sumVarer - pakkerabatt

  const abonnement = abonnementId ? finnPafyll(abonnementId) : null
  const abonnementsrabatt = abonnement ? Math.round(sum * abonnement.rabatt) : 0

  // Mva regnes per linje, fordi mat og utstyr har ulik sats. Pakkerabatten
  // fordeles proporsjonalt, ellers ville rabatten flyttet avgift mellom satsene.
  const rabattfaktor = sumVarer ? sum / sumVarer : 1
  const mvaBelop = linjer.reduce((n, l) => {
    const brutto = l.sum * rabattfaktor
    const sats = mvaSats(l.kategori)
    return n + (brutto - brutto / (1 + sats))
  }, 0)
  const netto = sum - mvaBelop

  const kcal = linjer.reduce((n, l) => n + l.kcal, 0)
  const liter = linjer.reduce((n, l) => n + l.liter, 0)
  const vekt = linjer.reduce((n, l) => n + l.vekt, 0)

  const kcalBehov = personer * KONFIG.dogn * KONFIG.kcalPerPersonPerDogn
  const vannBehov = personer * KONFIG.vannLiterPerPerson

  return {
    valg: {
      personer,
      matniva: matniva.id,
      modus: modus.id,
      abonnement: abonnementId,
      utelatt: [...utelatt],
    },
    matniva,
    modus,
    eske: modus.medEske ? eske : null,
    linjer,
    grupper: grupper(linjer),
    utstyrsvalg: kanVelgesBort.map((l) => ({
      sku: l.sku,
      navn: l.navn,
      antall: l.antall,
      sum: l.sum,
      valgtBort: utelatt.has(l.sku),
    })),
    fravalgt,
    /** Bruttoverdien av det som er tatt ut – brukes i prisoppsettets fradragslinje. */
    spart,
    /*
     * Det kunden faktisk sparer. Lavere enn bruttoverdien, fordi pakkerabatten
     * regnes av en mindre pakke når utstyr tas ut. Å love bruttotallet ville
     * vært et kroner-og-øre-løfte vi ikke holder.
     */
    spartNetto: Math.round(spart * (1 - (modus.rabatt ?? 0))),
    sumVarer,
    pakkerabatt,
    sum,
    abonnement,
    abonnementsrabatt,
    sumMedAbonnement: sum - abonnementsrabatt,
    mva: Math.round(mvaBelop),
    netto: Math.round(netto),
    prisPerPerson: Math.round(sum / personer),
    prisPerPersonPerDogn: Math.round(sum / personer / KONFIG.dogn),
    kcal,
    kcalBehov,
    kcalDekning: kcalBehov ? kcal / kcalBehov : 0,
    liter,
    vannBehov,
    vanndekning: vannBehov ? liter / vannBehov : 0,
    vekt: Math.round(vekt * 10) / 10,
    holdbarhetAr: korteste(linjer),
    varsler: varsler({ personer, matniva, modus, kcal, kcalBehov, liter, vannBehov }),
  }
}

/** Grupperer linjene etter DSBs overskrifter, i DSBs egen rekkefølge. */
function grupper(linjer) {
  const kart = new Map()
  for (const l of linjer) {
    const g = dsbGruppe(l.kategori)
    if (!kart.has(g)) kart.set(g, [])
    kart.get(g).push(l)
  }
  return GRUPPEREKKEFOLGE.filter((g) => kart.has(g)).map((navn) => {
    const varer = kart.get(navn)
    return {
      navn,
      dsb: navn !== 'Annet' && navn !== 'Esken',
      varer,
      sum: varer.reduce((n, v) => n + v.sum, 0),
      antall: varer.reduce((n, v) => n + v.antall, 0),
    }
  })
}

/** Korteste holdbarhet i pakken – det er den som avgjør når påfyll trengs. */
function korteste(linjer) {
  const år = linjer.map((l) => l.holdbarhetAr).filter((n) => typeof n === 'number' && n > 0)
  return år.length ? Math.min(...år) : null
}

function varsler({ personer, matniva, modus, kcal, kcalBehov, liter, vannBehov }) {
  const ut = []
  if (modus.id === 'matpafyll') {
    ut.push({
      type: 'info',
      tekst:
        'Påfyllet inneholder bare mat og vann. Utstyret – primus, radio, lykter og ' +
        'førstehjelp – forutsetter vi at du allerede har.',
    })
  }
  if (kcalBehov && kcal / kcalBehov < 0.95) {
    ut.push({
      type: 'warn',
      tekst: `Maten dekker ${Math.round((kcal / kcalBehov) * 100)} % av energibehovet for ` +
        `${personer} ${personer === 1 ? 'person' : 'personer'} i ${KONFIG.dogn} døgn.`,
    })
  }
  if (vannBehov && liter / vannBehov < 0.999) {
    ut.push({
      type: 'warn',
      tekst:
        `Kannene rommer ${liter} liter. DSB anbefaler ${vannBehov} liter for ` +
        `${personer} ${personer === 1 ? 'person' : 'personer'} – fyll dem før du trenger dem.`,
    })
  }
  if (matniva.id === 'torrmat') {
    ut.push({
      type: 'info',
      tekst: `Vanlig tørrmat holder ${matniva.holdbarhetAr} år. Sett på påfyll, så sier vi fra i tide.`,
    })
  }
  return ut
}

function finnPafyll(id) {
  return PAFYLL.find((p) => p.id === id) ?? null
}

/** Menneskelesbar oppsummering – følger ordren helt inn i kassen. */
export function referanse(pakke) {
  const { personer } = pakke.valg
  const deler = [
    `${pakke.modus.navn}`,
    `${personer} ${personer === 1 ? 'person' : 'personer'}`,
    `${KONFIG.dogn} døgn`,
    pakke.matniva.navn,
  ]
  if (pakke.fravalgt.length) deler.push(`uten ${pakke.fravalgt.length} vare${pakke.fravalgt.length === 1 ? '' : 'r'} du har fra før`)
  if (pakke.abonnement) deler.push(`påfyll ${pakke.abonnement.navn.toLowerCase()}`)
  return deler.join(' · ')
}

/** Stabil ID slik at samme konfigurasjon slår sammen i kurven. */
export function pakkeId(pakke) {
  const v = pakke.valg
  const uten = v.utelatt?.length ? 'uten-' + [...v.utelatt].sort().join('_') : 'full'
  return ['pakke', v.modus, v.personer, v.matniva, v.abonnement ?? 'engang', uten].join('-')
}

/** Gjør pakken om til en kurvpost. */
export function tilKurvpost(pakke) {
  return {
    id: pakkeId(pakke),
    tittel: referanse(pakke),
    sum: pakke.abonnement ? pakke.sumMedAbonnement : pakke.sum,
    linjer: pakke.linjer.map((l) => ({
      sku: l.sku,
      navn: l.navn,
      antall: l.antall,
      enhetspris: l.enhetspris,
    })),
    konfigurasjon: pakke.valg,
    abonnement: pakke.abonnement
      ? { intervallDager: pakke.abonnement.intervallDager, etikett: pakke.abonnement.navn }
      : null,
  }
}

export { MATNIVAER, MODUSER, PAFYLL, KONFIG, ESKER }
