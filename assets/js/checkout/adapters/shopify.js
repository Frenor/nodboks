/**
 * Shopify Storefront API (cart-mutasjon → checkout-URL).
 *
 * Krever: `domene`, `storefrontToken` og et `variantKart` som binder våre
 * SKU-er til Shopify-varianter. Abonnement krever i tillegg Shopify
 * Subscriptions og selling plan-ID-er i `sellingPlanKart`.
 *
 * Prisen som belastes er Shopifys egen variantpris. Prisene i katalogen vår
 * må derfor speiles i Shopify – katalogfilen er fasit, Shopify er kopien.
 */

import { BUTIKK } from '../../config.js'

const MUTASJON = `
  mutation opprettKurv($input: CartInput!) {
    cartCreate(input: $input) {
      cart { checkoutUrl }
      userErrors { field message }
    }
  }
`

export const adapterShopify = {
  navn: 'shopify',
  etikett: 'Til kassen',
  støtterAbonnement: true,

  klar: () =>
    Boolean(BUTIKK.shopify.domene) &&
    Boolean(BUTIKK.shopify.storefrontToken) &&
    Object.keys(BUTIKK.shopify.variantKart).length > 0,

  async checkout(ordre) {
    const { domene, storefrontToken, apiVersjon, variantKart, sellingPlanKart } =
      BUTIKK.shopify

    const lines = []
    const mangler = []
    for (const linje of ordre.linjer) {
      const variant = variantKart[linje.sku]
      if (!variant) {
        mangler.push(linje.sku)
        continue
      }
      const l = { merchandiseId: variant, quantity: linje.antall }
      if (ordre.abonnement && sellingPlanKart[linje.sku]) {
        l.sellingPlanId = sellingPlanKart[linje.sku]
      }
      lines.push(l)
    }

    if (mangler.length) {
      return {
        ok: false,
        melding: `Mangler Shopify-variant for: ${mangler.join(', ')}. ` +
          'Fyll inn variantKart i assets/js/config.js.',
      }
    }

    const svar = await fetch(`https://${domene}/api/${apiVersjon}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken,
      },
      body: JSON.stringify({
        query: MUTASJON,
        variables: {
          input: {
            lines,
            attributes: [
              { key: 'konfigurasjon', value: ordre.referanse },
              { key: 'kilde', value: 'pakkebygger' },
            ],
          },
        },
      }),
    })

    if (!svar.ok) throw new Error(`Shopify svarte ${svar.status}`)
    const data = await svar.json()
    const feil = data?.data?.cartCreate?.userErrors ?? []
    if (feil.length) return { ok: false, melding: feil.map((f) => f.message).join(' ') }

    const url = data?.data?.cartCreate?.cart?.checkoutUrl
    if (!url) throw new Error('Shopify returnerte ingen checkoutUrl')
    return { ok: true, url }
  },
}
