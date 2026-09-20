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
  ESKETYPER,
  finnEsketype,
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
/*
 * Satsen utledes av kategorien, men varen kan overstyre den. Fôrboksen ligger
 * i «Mat og vann»-gruppen og har likevel ordinær sats: redusert mva gjelder
 * næringsmidler til mennesker.
 */
export const mvaSats = (vare) =>
  (typeof vare === 'string' ? vare : vare?.mva ?? vare?.kategori) === 'Mat'
    ? MVA.mat
    : MVA.standard

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

const heltall = (n, min, maks) =>
  Math.min(maks, Math.max(min, Math.round(Number(n) || 0)))

/**
 * Klemmer husstanden inn i det katalogen dekker.
 *
 * Taket på åtte gjelder mennesker. Når det brytes, trekkes barn fra først –
 * en husstand som oppgir fem voksne og fem barn har neppe ment å fjerne en
 * voksen, og av de to feilene er det den minst gale.
 */
export function klemHusstand(h = {}) {
  const voksne = heltall(h.voksne ?? 1, 1, KONFIG.personerMaks)
  let barn = heltall(h.barn ?? 0, 0, 6)
  if (voksne + barn > KONFIG.personerMaks) barn = KONFIG.personerMaks - voksne
  return { voksne, barn, kjaeledyr: heltall(h.kjaeledyr ?? 0, 0, 4) }
}

/**
 * Konteksten katalogen ser. Avledet, aldri lagret.
 *
 * Mat skalerer på voksenekvivalenter, utstyr på hoder. Er du i tvil: teller
 * varen porsjoner, er det ve; teller den hoder, hender eller senger, er det
 * hoder.
 */
export function kontekst(h) {
  const { voksne, barn, kjaeledyr } = klemHusstand(h)
  return {
    voksne,
    barn,
    hoder: voksne + barn,
    ve: voksne + barn * KONFIG.barnFaktor,
    dyr: kjaeledyr,
  }
}

/** Tar imot både {voksne, barn} og det gamle {personer}. */
const lesHusstand = (valg) =>
  valg.husstand
    ? klemHusstand(valg.husstand)
    : klemHusstand({ voksne: valg.personer ?? 1, barn: 0, kjaeledyr: 0 })

/**
 * Gjelder varen for denne kombinasjonen?
 *
 * Tillegg er motsatt av alt annet i katalogen: de er ikke med før kunden ber
 * om dem. Utstyr velges bort, tillegg velges til. Skillet ligger på varen selv
 * framfor i en egen liste, slik at katalogen fortsatt er ett sted.
 */
function gjelder(vare, { modus, matniva, tillegg, ctx }) {
  if (vare.kunKjaeledyr) return ctx.dyr > 0
  if (vare.tillegg) return tillegg.has(vare.sku)
  if (vare.moduser && !vare.moduser.includes(modus)) return false
  if (vare.matnivaer && !vare.matnivaer.includes(matniva)) return false
  return true
}

/**
 * Minste eske som tar husstanden, i valgt materiale.
 *
 * Faller tilbake til den største i samme materiale, og til plast hvis
 * materialet ikke finnes – kassen er strukturell, så den skal aldri mangle.
 */
export function velgEske(personer, eskeType = 'plast') {
  const p = klem(personer)
  const ivalgt = ESKER.filter((e) => e.type === eskeType)
  const kandidater = ivalgt.length ? ivalgt : ESKER.filter((e) => e.type === 'plast')
  return kandidater.find((e) => p <= e.maksPersoner) ?? kandidater[kandidater.length - 1]
}

/**
 * Setter sammen pakken.
 *
 * @param {{personer:number, matniva:string, modus:string, abonnement?:string|null}} valg
 * @returns pakkeobjekt med linjer, grupper, nøkkeltall og eventuelle varsler
 */
export function byggPakke(valg) {
  const husstand = lesHusstand(valg)
  const ctx = kontekst(husstand)
  const personer = ctx.hoder
  const matniva = finnMatniva(valg.matniva)
  const modus = finnModus(valg.modus)
  const abonnementId = valg.abonnement ?? null
  const utelatt = new Set(valg.utelatt ?? [])
  const tillegg = new Set(valg.tillegg ?? [])
  const eskeType = finnEsketype(valg.eskeType).id

  const utvalg = { modus: modus.id, matniva: matniva.id, tillegg, ctx }

  let linjer = []
  for (const vare of VARER) {
    if (!gjelder(vare, utvalg)) continue
    const antall = Math.max(0, Math.ceil(vare.antall(ctx)))
    if (antall === 0) continue
    linjer.push({
      sku: vare.sku,
      navn: vare.navn,
      beskrivelse: vare.beskrivelse,
      hvorfor: vare.hvorfor,
      kategori: vare.kategori,
      mva: vare.mva ?? null,
      type: vare.type, // 'engang' (utstyr) eller 'forbruk'
      enhet: vare.enhet,
      antall,
      enhetspris: vare.pris,
      sum: vare.pris * antall,
      holdbarhetAr: vare.holdbarhetAr ?? null,
      dsb: vare.dsb ?? null,
      bruksanvisning: vare.bruksanvisning ?? null,
      kcal: (vare.kcal ?? 0) * antall,
      kreverVarme: vare.kreverVarme === true,
      erTillegg: vare.tillegg === true,
      liter: (vare.liter ?? 0) * antall,
      vekt: (vare.vektKg ?? 0) * antall,
    })
  }

  // Esken følger bare med i den komplette pakken; påfyll sendes i kartong.
  // Dyra tar plass: to dyr regnes som ett ekstra hode når esken velges.
  const eske = velgEske(ctx.hoder + Math.ceil(ctx.dyr / 2), eskeType)
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
    (l) => l.type === 'engang' && l.kategori !== 'Esken' && !l.erTillegg && l.sum >= FRAVALG_TERSKEL
  )
  const fravalgt = kanVelgesBort.filter((l) => utelatt.has(l.sku))
  const spart = fravalgt.reduce((n, l) => n + l.sum, 0)
  linjer = linjer.filter((l) => !utelatt.has(l.sku))

  const tilleggsvalg = VARER.filter((v) => v.tillegg).map((v) => {
    const antall = Math.max(1, Math.ceil(v.antall(personer)))
    return {
      sku: v.sku,
      navn: v.navn,
      beskrivelse: v.beskrivelse,
      hvorfor: v.hvorfor,
      forbehold: v.forbehold ?? [],
      bruksanvisning: v.bruksanvisning ?? null,
      antall,
      sum: v.pris * antall,
      valgt: tillegg.has(v.sku),
    }
  })

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
    const sats = mvaSats(l)
    return n + (brutto - brutto / (1 + sats))
  }, 0)
  const netto = sum - mvaBelop

  /*
   * Hvor lenge maten rekker uten brennstoff.
   *
   * Vi sender ikke gass eller rødsprit – det kan ikke fraktes som vanlig pakke.
   * Da må kunden få vite hva som skjer hvis de aldri får kjøpt det, eller går
   * tom på døgn fire. Tallet regnes fra maten som kan spises kald, mot samme
   * energidimensjonering som resten, og er det ærlige svaret på et spørsmål
   * ingen andre i markedet stiller.
   */
  const kaldKcal = linjer.filter((l) => !l.kreverVarme).reduce((n, l) => n + l.kcal, 0)
  const dognUtenVarme = ctx.ve
    ? Math.floor(kaldKcal / (ctx.ve * KONFIG.kcalVoksenDogn))
    : 0

  const kcal = linjer.reduce((n, l) => n + l.kcal, 0)
  const liter = linjer.reduce((n, l) => n + l.liter, 0)
  const vekt = linjer.reduce((n, l) => n + l.vekt, 0)

  const kcalBehov = ctx.ve * KONFIG.kcalVoksenDogn * KONFIG.dogn

  /*
   * Vann skalerer på hoder, ikke på voksenekvivalenter. Bevisst asymmetri mot
   * maten: DSBs 20 liter er ikke bare drikke, den dekker matlaging og et
   * minimum av hygiene, og husstanden koker og vasker for alle fra de samme
   * kannene. Å underdimensjonere vannet for å spare seksti kroner tom plast er
   * en dårlig byttehandel.
   */
  const vannBehov =
    ctx.hoder * KONFIG.vannLiterPerPerson + ctx.dyr * KONFIG.vannLiterPerDyr

  return {
    valg: {
      husstand,
      personer,
      matniva: matniva.id,
      modus: modus.id,
      abonnement: abonnementId,
      eskeType,
      utelatt: [...utelatt],
      tillegg: [...tillegg],
    },
    matniva,
    modus,
    eske: modus.medEske ? eske : null,
    ctx,
    linjer,
    grupper: grupper(linjer),
    utstyrsvalg: kanVelgesBort.map((l) => ({
      sku: l.sku,
      navn: l.navn,
      antall: l.antall,
      sum: l.sum,
      valgtBort: utelatt.has(l.sku),
    })),
    tilleggsvalg,
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
    kaldKcal,
    dognUtenVarme: Math.min(dognUtenVarme, KONFIG.dogn),
    kcalBehov,
    kcalDekning: kcalBehov ? kcal / kcalBehov : 0,
    liter,
    vannBehov,
    vanndekning: vannBehov ? liter / vannBehov : 0,
    vekt: Math.round(vekt * 10) / 10,
    holdbarhetAr: korteste(linjer),
    varsler: varsler({ personer, matniva, modus, kcal, kcalBehov, liter, vannBehov, dognUtenVarme }),
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

function varsler({ personer, matniva, modus, kcal, kcalBehov, liter, vannBehov, dognUtenVarme }) {
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
  if (dognUtenVarme < KONFIG.dogn) {
    ut.push({
      type: 'info',
      tekst:
        `Maten rekker ${dognUtenVarme} døgn uten varme. Resten krever kokende vann, ` +
        `og brennstoff sendes ikke med – se hva du skal kjøpe under «dette selger vi ikke».`,
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
  const med = v.tillegg?.length ? 'med-' + [...v.tillegg].sort().join('_') : ''
  const h = v.husstand ?? { voksne: v.personer, barn: 0, kjaeledyr: 0 }
  return ['pakke', v.modus, `${h.voksne}v${h.barn}b${h.kjaeledyr}d`, v.matniva, v.eskeType, v.abonnement ?? 'engang', uten, med]
    .filter(Boolean)
    .join('-')
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

export { MATNIVAER, MODUSER, PAFYLL, KONFIG, ESKER, ESKETYPER }
