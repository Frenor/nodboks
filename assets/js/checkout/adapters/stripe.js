/**
 * Stripe Checkout.
 *
 * To veier, avhengig av hva som er fylt inn i config:
 *
 *  1. `checkoutEndpoint` – anbefalt. En liten serverfunksjon lager en Checkout
 *     Session av ordrelinjene og returnerer { url }. Dette er den eneste måten
 *     å få riktig pris og abonnement uten å eksponere en hemmelig nøkkel.
 *  2. `paymentLinks` – helt uten server. Én ferdiglaget Payment Link per SKU.
 *     Da må konfigurasjonene være faste produkter, ikke fritt satt sammen.
 */

import { BUTIKK } from '../../config.js'

export const adapterStripe = {
  navn: 'stripe',
  etikett: 'Betal med kort',
  støtterAbonnement: true,

  klar: () =>
    Boolean(BUTIKK.stripe.checkoutEndpoint) ||
    Object.keys(BUTIKK.stripe.paymentLinks).length > 0,

  async checkout(ordre) {
    const { checkoutEndpoint, paymentLinks } = BUTIKK.stripe

    if (checkoutEndpoint) {
      const svar = await fetch(checkoutEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valuta: BUTIKK.valuta,
          linjer: ordre.linjer.map((l) => ({
            sku: l.sku,
            navn: l.navn,
            antall: l.antall,
            belop_ore: Math.round(l.enhetspris * 100),
          })),
          abonnement: ordre.abonnement,
          referanse: ordre.referanse,
          konfigurasjon: ordre.konfigurasjon,
          retur: {
            ok: new URL('takk.html', document.baseURI).href,
            avbrutt: `${location.origin}/#pakkebygger`,
          },
        }),
      })
      if (!svar.ok) throw new Error(`Checkout-endepunktet svarte ${svar.status}`)
      const { url } = await svar.json()
      if (!url) throw new Error('Checkout-endepunktet returnerte ingen url')
      return { ok: true, url }
    }

    // Payment Link-modus: krever at hele ordren er én forhåndsdefinert SKU.
    if (ordre.linjer.length === 1 && paymentLinks[ordre.linjer[0].sku]) {
      return { ok: true, url: paymentLinks[ordre.linjer[0].sku] }
    }

    return {
      ok: false,
      melding:
        'Denne sammensetningen finnes ikke som ferdig Payment Link. ' +
        'Sett opp stripe.checkoutEndpoint for fritt satte pakker.',
    }
  },
}
