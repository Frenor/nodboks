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

import { byggPakke, klem } from '../assets/js/konfigurator.js'
import { KONFIG, VARER, ESKER, MATNIVAER, MODUSER, PAFYLL } from '../assets/js/data/katalog.js'

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
  if (!(v.innkjop >= 0)) nei(`${v.sku}: mangler innkjøpspris`)
  if (v.innkjop >= v.pris) obs(`${v.sku}: innkjøp ${v.innkjop} ≥ utsalg ${v.pris} – null margin`)
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

// --- Hver kombinasjon -------------------------------------------------------
for (const modus of MODUSER) {
  for (const niva of MATNIVAER) {
    bolk(`${modus.navn} · ${niva.navn}`)
    let forrige = 0
    for (let p = KONFIG.personerMin; p <= KONFIG.personerMaks; p++) {
      const pakke = byggPakke({ personer: p, matniva: niva.id, modus: modus.id })

      if (pakke.sum <= forrige) nei(`${p} pers: prisen (${pakke.sum}) vokser ikke fra ${forrige}`)
      forrige = pakke.sum

      if (pakke.kcalDekning < 0.95) {
        nei(`${p} pers: energi dekker bare ${Math.round(pakke.kcalDekning * 100)} % av ${KONFIG.dogn} døgn`)
      }
      if (modus.medVann && pakke.vanndekning < 0.999) {
        nei(`${p} pers: vann ${pakke.liter} l av ${pakke.vannBehov} l`)
      }
      if (pakke.linjer.length === 0) nei(`${p} pers: tom pakke`)
      if (modus.medEske && !pakke.eske) nei(`${p} pers: mangler eske`)
    }

    const en = byggPakke({ personer: 1, matniva: niva.id, modus: modus.id })
    const atte = byggPakke({ personer: 8, matniva: niva.id, modus: modus.id })
    const skala = atte.sum / en.sum
    if (skala > 8) obs(`8 personer koster ${skala.toFixed(1)}× én person – dårlig skalafordel`)
    ok(`1–${KONFIG.personerMaks} personer: ${en.sum}–${atte.sum} kr, ` +
       `${en.prisPerPersonPerDogn}–${atte.prisPerPersonPerDogn} kr per person per døgn`)
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
const innkjopFor = (sku) =>
  VARER.find((v) => v.sku === sku)?.innkjop ?? ESKER.find((e) => e.sku === sku)?.innkjop ?? 0

for (const modus of MODUSER) {
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

// --- Fasit ------------------------------------------------------------------
console.log(
  feil
    ? `\n\x1b[31m${feil} feil\x1b[0m, ${advarsler} advarsler\n`
    : `\n\x1b[32mAlt i orden\x1b[0m – ${advarsler} advarsler\n`
)
process.exit(feil ? 1 : 0)
