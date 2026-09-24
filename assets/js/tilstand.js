/**
 * Tilstanden i bestillingsflyten.
 *
 * Ett sted. Alt som kan endres av kunden bor her, og alt som tegner leser
 * herfra. Grunnen er ikke ryddighet for sin egen skyld: da flyten hadde
 * tilstand spredt i DOM-en, måtte hver visning lese den ut av markup igjen,
 * og da måtte markup bygges på nytt ved hver endring – som er nettopp det som
 * river ut noden kunden står i.
 *
 * Lagring er debouncet og feiltolerant. I privat vindu eller med blokkerte
 * informasjonskapsler skal siden virke nøyaktig som før, bare uten hukommelse.
 */

import { KONFIG, MATNIVAER, MODUSER, ESKETYPER, PAFYLL, VARER } from './data/katalog.js'

const NOKKEL = 'nodboks:bestilling'
const VERSJON = 1
const LAGRE_ETTER_MS = 400

const STANDARD = {
  voksne: 2,
  barn: 2,
  kjaeledyr: 0,
  matniva: MATNIVAER[0].id,
  modus: MODUSER[0].id,
  eskeType: ESKETYPER[0].id,
  utelatt: [],
  tillegg: [],
  abonnement: null,
}

const gyldigeSkuer = new Set(VARER.map((v) => v.sku))
const heltall = (n, min, maks) =>
  Number.isFinite(Number(n)) ? Math.min(maks, Math.max(min, Math.round(Number(n)))) : null

/**
 * Validerer hardt. Alt som ikke kjennes igjen forkastes i stillhet og
 * erstattes av standarden – en lagret tilstand fra en eldre versjon skal
 * aldri kunne sette flyten i en tilstand koden ikke lenger forstår.
 */
function vask(rå) {
  if (!rå || rå.versjon !== VERSJON) return null
  const voksne = heltall(rå.voksne, 1, KONFIG.personerMaks)
  const barn = heltall(rå.barn, 0, 6)
  const kjaeledyr = heltall(rå.kjaeledyr, 0, 4)
  if (voksne === null || barn === null || kjaeledyr === null) return null
  if (voksne + barn > KONFIG.personerMaks) return null

  const iListe = (liste, verdi, fallback) =>
    liste.some((x) => x.id === verdi) ? verdi : fallback

  return {
    voksne,
    barn,
    kjaeledyr,
    matniva: iListe(MATNIVAER, rå.matniva, STANDARD.matniva),
    modus: iListe(MODUSER, rå.modus, STANDARD.modus),
    eskeType: iListe(ESKETYPER, rå.eskeType, STANDARD.eskeType),
    utelatt: (Array.isArray(rå.utelatt) ? rå.utelatt : []).filter((s) => gyldigeSkuer.has(s)),
    tillegg: (Array.isArray(rå.tillegg) ? rå.tillegg : []).filter((s) => gyldigeSkuer.has(s)),
    abonnement: PAFYLL.some((p) => p.id === rå.abonnement) ? rå.abonnement : null,
  }
}

function les() {
  try {
    const rå = localStorage.getItem(NOKKEL)
    return rå ? vask(JSON.parse(rå)) : null
  } catch {
    return null
  }
}

let lagretVedOppstart = les()
let nå = { ...STANDARD, ...(lagretVedOppstart ?? {}) }

const lyttere = new Set()
let lagreTimer = null

function lagre() {
  clearTimeout(lagreTimer)
  lagreTimer = setTimeout(() => {
    try {
      localStorage.setItem(NOKKEL, JSON.stringify({ versjon: VERSJON, ...nå }))
    } catch {
      /* privat modus, blokkerte cookies, fullt lager – siden virker uansett */
    }
  }, LAGRE_ETTER_MS)
}

export const tilstand = {
  /** Gjeldende tilstand. Alltid en kopi, så ingen kan endre den utenom sett(). */
  les: () => ({ ...nå }),

  /** Hadde vi noe lagret da siden ble åpnet? Heroen sier det til kunden. */
  bleGjenopprettet: () => lagretVedOppstart !== null,

  /** Er dette en gyldig husstand, eller er taket nådd? */
  takNadd: () => nå.voksne + nå.barn >= KONFIG.personerMaks,

  sett(endringer) {
    const før = JSON.stringify(nå)
    nå = { ...nå, ...endringer }
    // Taket på åtte gjelder mennesker. Barn trekkes fra først – se klemHusstand.
    if (nå.voksne + nå.barn > KONFIG.personerMaks) {
      nå.barn = Math.max(0, KONFIG.personerMaks - nå.voksne)
    }
    if (JSON.stringify(nå) === før) return false
    lagre()
    for (const l of lyttere) l(this.les())
    return true
  },

  /** Skru en sku av og på i en liste. Brukes av fravalg og tillegg. */
  veksle(felt, sku) {
    const liste = new Set(nå[felt])
    liste.has(sku) ? liste.delete(sku) : liste.add(sku)
    return this.sett({ [felt]: [...liste] })
  },

  nullstill() {
    lagretVedOppstart = null
    try {
      localStorage.removeItem(NOKKEL)
    } catch {
      /* som over */
    }
    nå = { ...STANDARD }
    for (const l of lyttere) l(this.les())
  },

  lytt(fn) {
    lyttere.add(fn)
    return () => lyttere.delete(fn)
  },

  /** Formen byggPakke() forventer. */
  tilValg() {
    return {
      husstand: { voksne: nå.voksne, barn: nå.barn, kjaeledyr: nå.kjaeledyr },
      matniva: nå.matniva,
      modus: nå.modus,
      eskeType: nå.eskeType,
      utelatt: nå.utelatt,
      tillegg: nå.tillegg,
      abonnement: nå.abonnement,
    }
  },
}
