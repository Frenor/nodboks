/**
 * Byttbart checkout-lag.
 *
 * Resten av siden kaller kun `sendTilKasse(ordre)` og bryr seg ikke om hvilken
 * plattform som er koblet på. Hver adapter implementerer det samme grensesnittet:
 *
 *   {
 *     navn: string,
 *     etikett: string,              // vises i knappetekst/statusfelt
 *     klar(): boolean,              // er nøklene fylt inn?
 *     støtterAbonnement: boolean,
 *     init?(): Promise<void>,       // laster ev. SDK, kalles én gang
 *     checkout(ordre): Promise<{ ok: boolean, url?: string, melding?: string }>
 *   }
 *
 * Ordreobjektet er normalisert og plattformuavhengig:
 *
 *   {
 *     linjer: [{ sku, navn, antall, enhetspris, sum, type, metadata }],
 *     sum: number,                  // kr, inkl. mva
 *     valuta: 'NOK',
 *     abonnement: null | { intervallDager, etikett },
 *     referanse: string,            // menneskelesbar oppsummering av konfigurasjonen
 *     konfigurasjon: object         // rå konfig, legges ved som ordremetadata
 *   }
 */

import { BUTIKK } from '../config.js'
import { adapterIngen } from './adapters/ingen.js'
import { adapterShopify } from './adapters/shopify.js'
import { adapterSnipcart } from './adapters/snipcart.js'
import { adapterStripe } from './adapters/stripe.js'

const ADAPTERE = {
  ingen: adapterIngen,
  shopify: adapterShopify,
  snipcart: adapterSnipcart,
  stripe: adapterStripe,
}

let initialisert = null

/** Returnerer adapteren for valgt plattform – faller tilbake til e-postflyten. */
export function velgAdapter() {
  const valgt = ADAPTERE[BUTIKK.plattform]
  if (valgt && valgt.klar()) return valgt
  if (valgt && !valgt.klar()) {
    console.warn(
      `[nodboks] Plattformen «${BUTIKK.plattform}» er valgt, men nøklene i ` +
        `assets/js/config.js er ikke fylt ut. Faller tilbake til e-postbestilling.`
    )
  }
  return adapterIngen
}

/** Laster adapterens SDK én gang. Trygt å kalle flere ganger. */
export async function forberedKasse() {
  const adapter = velgAdapter()
  if (!initialisert) {
    initialisert = adapter.init ? adapter.init() : Promise.resolve()
  }
  await initialisert
  return adapter
}

/**
 * Sender ordren til kassen. Returnerer et resultatobjekt i stedet for å kaste,
 * slik at kalleren kan vise en rolig feilmelding framfor å miste kurven.
 */
export async function sendTilKasse(ordre) {
  const adapter = await forberedKasse()
  try {
    const res = await adapter.checkout(ordre)
    if (res?.url) window.location.assign(res.url)
    return res ?? { ok: true }
  } catch (feil) {
    console.error('[nodboks] Kassen feilet', feil)
    return {
      ok: false,
      melding:
        'Vi fikk ikke kontakt med betalingsløsningen. Prøv igjen, eller ' +
        'send bestillingen på e-post – vi svarer samme dag.',
    }
  }
}

/** Brukes av UI for å vise riktig knappetekst og eventuelle forbehold. */
export function kasseStatus() {
  const adapter = velgAdapter()
  return {
    navn: adapter.navn,
    etikett: adapter.etikett,
    støtterAbonnement: adapter.støtterAbonnement,
    erFallback: adapter.navn === 'ingen',
  }
}

/** Laster et eksternt script én gang. Brukes av adapterne. */
export function lastScript(src, attributter = {}) {
  return new Promise((resolve, reject) => {
    const eksisterende = document.querySelector(`script[src="${src}"]`)
    if (eksisterende) return resolve()
    const el = document.createElement('script')
    el.src = src
    el.async = true
    for (const [k, v] of Object.entries(attributter)) el.setAttribute(k, v)
    el.onload = () => resolve()
    el.onerror = () => reject(new Error(`Fikk ikke lastet ${src}`))
    document.head.appendChild(el)
  })
}
