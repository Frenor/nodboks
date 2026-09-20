/**
 * Snipcart v3.
 *
 * Snipcart validerer pris ved å hente produktsiden på nytt (crawler-modus),
 * så hver SKU må ha en `data-item-url` som peker på en side der prisen står.
 * Vi bruker produktsidene under /produkt/ til det.
 */

import { BUTIKK } from '../../config.js'
import { lastScript } from '../index.js'

export const adapterSnipcart = {
  navn: 'snipcart',
  etikett: 'Til kassen',
  støtterAbonnement: true,

  klar: () => Boolean(BUTIKK.snipcart.apiKey),

  async init() {
    if (document.getElementById('snipcart')) return

    const lenke = document.createElement('link')
    lenke.rel = 'stylesheet'
    lenke.href = `https://cdn.snipcart.com/themes/v${BUTIKK.snipcart.version}/default/snipcart.css`
    document.head.appendChild(lenke)

    const rot = document.createElement('div')
    rot.id = 'snipcart'
    rot.hidden = true
    rot.setAttribute('data-api-key', BUTIKK.snipcart.apiKey)
    rot.setAttribute('data-config-add-product-behavior', 'none')
    rot.setAttribute('data-currency', BUTIKK.valuta.toLowerCase())
    document.body.appendChild(rot)

    await lastScript(
      `https://cdn.snipcart.com/themes/v${BUTIKK.snipcart.version}/default/snipcart.js`
    )
  },

  async checkout(ordre) {
    if (!window.Snipcart) throw new Error('Snipcart er ikke lastet')

    for (const linje of ordre.linjer) {
      const vare = {
        id: linje.sku,
        name: linje.navn,
        price: linje.enhetspris,
        url: `${location.origin}/produkt/${linje.sku}.html`,
        quantity: linje.antall,
        metadata: { konfigurasjon: ordre.referanse, ...linje.metadata },
      }
      if (ordre.abonnement) {
        vare.plans = [
          {
            id: `pafyll-${ordre.abonnement.intervallDager}`,
            name: ordre.abonnement.etikett,
            frequency: 'daily',
            interval: ordre.abonnement.intervallDager,
          },
        ]
      }
      await window.Snipcart.api.cart.items.add(vare)
    }

    await window.Snipcart.api.theme.cart.open()
    return { ok: true }
  },
}
