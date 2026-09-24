/**
 * Selvtest for produktkatalogen og pakkebyggeren.
 *
 *   node scripts/verifiser-katalog.mjs
 *
 * Sjekker at hver pakke faktisk holder det siden lover: at energien dekker
 * DSBs sju døgn, at vannkannene rommer nok liter, at prisen vokser med
 * husstanden, og at ingen vare mangler begrunnelse eller pris. Kjøres for hånd
 * etter endringer i katalogen – det er billigere enn å oppdage det i kassen.
 */

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { byggPakke, klem, klemHusstand, kontekst } from '../assets/js/konfigurator.js'
import { KONFIG, VARER, ESKER, MATNIVAER, MODUSER, PAFYLL } from '../assets/js/data/katalog.js'

/*
 * Innkjøpsprisene ligger utenfor git, i innkjop.local.json.
 *
 * Repoet er offentlig og siden serveres fra det, så kostnadsstrukturen vår
 * har ingenting i katalogen å gjøre. Finnes filen ikke, hopper marginkontrollen
 * over – resten av selvtesten kjører som før, så en ny utvikler uten filen
 * fortsatt kan verifisere energi, vann og prisstigning.
 */
const rot = join(dirname(fileURLToPath(import.meta.url)), '..')
const stiInnkjop = join(rot, 'innkjop.local.json')
const harInnkjop = existsSync(stiInnkjop)
const INNKJOP = harInnkjop ? JSON.parse(readFileSync(stiInnkjop, 'utf8')) : {}

let feil = 0
let advarsler = 0

const ok = (t) => console.log(`  \x1b[32m✓\x1b[0m ${t}`)
const nei = (t) => { feil++; console.log(`  \x1b[31m✗ ${t}\x1b[0m`) }
const obs = (t) => { advarsler++; console.log(`  \x1b[33m!\x1b[0m ${t}`) }
const bolk = (t) => console.log(`\n\x1b[1m${t}\x1b[0m`)

// --- Katalogen i seg selv ---------------------------------------------------
bolk('Katalogen')

const skuer = new Set()
for (const v of VARER) {
  if (skuer.has(v.sku)) nei(`duplisert SKU: ${v.sku}`)
  skuer.add(v.sku)
  if (!(v.pris > 0)) nei(`${v.sku}: mangler pris`)
  if (harInnkjop) {
    const ink = INNKJOP[v.sku]?.innkjop
    if (!(ink >= 0)) nei(`${v.sku}: mangler innkjøpspris i innkjop.local.json`)
    else if (ink >= v.pris) obs(`${v.sku}: innkjøp ${ink} ≥ utsalg ${v.pris} – null margin`)
  }
  if (!v.hvorfor) nei(`${v.sku}: mangler begrunnelse (hvorfor)`)
  if (!['engang', 'forbruk'].includes(v.type)) nei(`${v.sku}: ugyldig type «${v.type}»`)
  if (typeof v.antall !== 'function') nei(`${v.sku}: antall må være en funksjon av personer`)
}
if (!feil) ok(`${VARER.length} varer, alle med pris, innkjøp, type og begrunnelse`)

for (const e of ESKER) {
  if (!(e.pris > 0)) nei(`eske ${e.sku}: mangler pris`)
  if (!(e.maksPersoner > 0)) nei(`eske ${e.sku}: mangler maksPersoner`)
}
ok(`${ESKER.length} eskestørrelser`)

const dekket = ESKER.some((e) => e.maksPersoner >= KONFIG.personerMaks)
dekket ? ok(`esker dekker opp til ${KONFIG.personerMaks} personer`)
       : nei(`ingen eske tar ${KONFIG.personerMaks} personer`)

// --- Husstandsrutenettet ----------------------------------------------------
for (const modus of MODUSER) {
  for (const niva of MATNIVAER) {
    bolk(`${modus.navn} · ${niva.navn}`)
    let feilFor = feil

    for (let voksne = 1; voksne <= KONFIG.personerMaks; voksne++) {
      for (let barn = 0; barn <= 6; barn++) {
        if (voksne + barn > KONFIG.personerMaks) continue
        for (const dyr of [0, 2, 4]) {
          const h = { voksne, barn, kjaeledyr: dyr }
          const pakke = byggPakke({ husstand: h, matniva: niva.id, modus: modus.id })
          const merke = `${voksne}v${barn}b${dyr}d`

          /*
           * Identiteten. Energibehovet regnes av ve, mengdene skaleres av ve,
           * og de to skal derfor være nøyaktig det samme som å regne voksne og
           * barn hver for seg. Ryker denne, har noen satt barnFaktor som et
           * frittstående tall, og da stemmer ikke dekningsvarselet med maten
           * som faktisk ligger i esken.
           */
          const direkte =
            (voksne * KONFIG.kcalVoksenDogn + barn * KONFIG.kcalBarnDogn) * KONFIG.dogn
          if (Math.abs(pakke.kcalBehov - direkte) > 0.5) {
            nei(`${merke}: energibehov ${pakke.kcalBehov.toFixed(1)} ≠ ${direkte.toFixed(1)}`)
          }

          /*
           * I eget-lager-sporet sender vi ingen mat, så pakkens egen dekning er
           * null med vilje. Kravet flyttes dit maten faktisk er: handlelisten
           * kunden får. Den skal dekke det samme behovet som en pakke vi
           * hadde sendt selv – ellers er lista en anbefaling vi ikke står for.
           */
          if (niva.senderMat === false) {
            const dekning = pakke.kcalBehov ? pakke.handlelisteKcal / pakke.kcalBehov : 0
            if (dekning < 0.95) {
              nei(`${merke}: handlelisten dekker ${Math.round(dekning * 100)} %`)
            }
            if (!pakke.handleliste.length) nei(`${merke}: tom handleliste`)
            if (pakke.linjer.some((l) => l.kategori === 'Mat' && !l.erBeholder && l.kcal > 0)) {
              nei(`${merke}: mat i pakken, men sporet sender ikke mat`)
            }
          } else if (pakke.kcalDekning < 0.95) {
            nei(`${merke}: energi dekker ${Math.round(pakke.kcalDekning * 100)} %`)
          }
          if (modus.medVann && pakke.liter < pakke.vannBehov) {
            nei(`${merke}: vann ${pakke.liter} l av ${pakke.vannBehov} l`)
          }
          if (dyr > 0 && modus.medEske) {
            const dyrelinjer = pakke.linjer.filter((l) => /^dyre|dyrevann/.test(l.sku))
            if (!dyrelinjer.length) nei(`${merke}: kjæledyr oppgitt, men ingen dyrevarer`)
          }
          if (dyr === 0 && pakke.linjer.some((l) => /^dyre|dyrevann/.test(l.sku))) {
            nei(`${merke}: ingen kjæledyr, men dyrevarer i pakken`)
          }
        }
      }
    }

    // Monotoni: ett barn ekstra gjør aldri pakken billigere, og aldri dyrere
    // enn én voksen ekstra. Fanger en skaleringsregel som peker feil vei.
    for (let voksne = 1; voksne <= 6; voksne++) {
      const grunn = byggPakke({ husstand: { voksne, barn: 0 }, matniva: niva.id, modus: modus.id }).sum
      const medBarn = byggPakke({ husstand: { voksne, barn: 1 }, matniva: niva.id, modus: modus.id }).sum
      const medVoksen = byggPakke({ husstand: { voksne: voksne + 1, barn: 0 }, matniva: niva.id, modus: modus.id }).sum
      if (medBarn < grunn) nei(`${voksne}v: ett barn til gjør pakken billigere`)
      if (medBarn > medVoksen) nei(`${voksne}v: ett barn koster mer enn én voksen`)
    }

    if (feil === feilFor) {
      const fire = byggPakke({ husstand: { voksne: 2, barn: 2 }, matniva: niva.id, modus: modus.id })
      ok(`hele rutenettet: 2 voksne + 2 barn gir ${fire.sum} kr, ` +
         `${fire.ctx.ve.toFixed(2)} voksenekvivalenter`)
    }
  }
}

// --- Marginer ---------------------------------------------------------------
/*
 * Dekningsgrad regnes på NETTO, ikke på utsalgsprisen.
 *
 * `pris` i katalogen er inkl. mva, `innkjop` er eks. mva. Å trekke det ene fra
 * det andre og kalle det margin er å sammenligne to ulike ting – det blåste
 * opp dekningsgraden med rundt fjorten prosentpoeng her. Momsen er statens,
 * ikke vår, og skal ut av begge sider av regnestykket.
 */
bolk('Marginer (regnet på netto, eks. mva)')
if (!harInnkjop) {
  console.log('  \x1b[2m· hoppet over – innkjop.local.json finnes ikke.')
  console.log('    Kopier innkjop.eksempel.json til innkjop.local.json for å slå den på.\x1b[0m')
}
const innkjopFor = (sku) => INNKJOP[sku]?.innkjop ?? 0

for (const modus of harInnkjop ? MODUSER : []) {
  for (const niva of MATNIVAER) {
    for (const p of [1, 2, 4, 6, 8]) {
      const pakke = byggPakke({ personer: p, matniva: niva.id, modus: modus.id })
      const kost = pakke.linjer.reduce((n, l) => n + innkjopFor(l.sku) * l.antall, 0)
      const db = pakke.netto - kost
      const margin = db / pakke.netto
      if (margin < 0.2) {
        nei(`${modus.id}/${niva.id}/${p}: dekningsgrad ${Math.round(margin * 100)} % – for tynt`)
      } else if (margin < 0.3) {
        obs(`${modus.id}/${niva.id}/${p}: dekningsgrad ${Math.round(margin * 100)} %`)
      }
    }
    const p4 = byggPakke({ personer: 4, matniva: niva.id, modus: modus.id })
    const kost4 = p4.linjer.reduce((n, l) => n + innkjopFor(l.sku) * l.antall, 0)
    console.log(
      `  \x1b[2m·\x1b[0m ${modus.id}/${niva.id} · 4 pers: ${p4.sum} kr inkl. mva ` +
      `→ ${p4.netto} kr netto, kost ${Math.round(kost4)} kr, ` +
      `DG ${Math.round(((p4.netto - kost4) / p4.netto) * 100)} %`
    )
  }
}

// --- Abonnement -------------------------------------------------------------
bolk('Påfyll og abonnement')
for (const plan of PAFYLL) {
  const pakke = byggPakke({ personer: 4, matniva: 'torrmat', modus: 'matpafyll', abonnement: plan.id })
  if (!pakke.abonnement) nei(`påfyllsplan «${plan.id}» ble ikke plukket opp`)
  else ok(`${plan.navn}: ${pakke.sum} → ${pakke.sumMedAbonnement} kr ` +
          `(−${Math.round(plan.rabatt * 100)} %), hver ${plan.intervallDager}. dag`)
}

// --- Klemming ---------------------------------------------------------------
bolk('Robusthet')
klem(0) === KONFIG.personerMin ? ok('0 personer klemmes opp til minimum') : nei('klem(0) feiler')
klem(99) === KONFIG.personerMaks ? ok('99 personer klemmes ned til maksimum') : nei('klem(99) feiler')
klem(NaN) === KONFIG.personerMin ? ok('NaN håndteres') : nei('klem(NaN) feiler')

const k1 = klemHusstand({ voksne: 5, barn: 5 })
k1.voksne === 5 && k1.barn === 3
  ? ok('taket på åtte trekker fra barn først: 5 voksne + 5 barn → 5 + 3')
  : nei(`klemHusstand(5v5b) ga ${k1.voksne}v${k1.barn}b`)

const k2 = klemHusstand({})
k2.voksne === 1 && k2.barn === 0 && k2.kjaeledyr === 0
  ? ok('tomt objekt gir én voksen')
  : nei('klemHusstand({}) feiler')

const k3 = klemHusstand({ voksne: 'to', barn: -3, kjaeledyr: 99 })
k3.voksne === 1 && k3.barn === 0 && k3.kjaeledyr === 4
  ? ok('søppel inn gir gyldig husstand ut')
  : nei(`klemHusstand(søppel) ga ${JSON.stringify(k3)}`)

const gammel = byggPakke({ personer: 4, matniva: 'torrmat', modus: 'komplett' })
const ny = byggPakke({ husstand: { voksne: 4 }, matniva: 'torrmat', modus: 'komplett' })
gammel.sum === ny.sum
  ? ok('gammelt {personer}-kall gir samme pakke som {husstand}')
  : nei(`bakoverkompatibilitet brutt: ${gammel.sum} mot ${ny.sum}`)

// --- Fasit ------------------------------------------------------------------
console.log(
  feil
    ? `\n\x1b[31m${feil} feil\x1b[0m, ${advarsler} advarsler\n`
    : `\n\x1b[32mAlt i orden\x1b[0m – ${advarsler} advarsler\n`
)
process.exit(feil ? 1 : 0)
