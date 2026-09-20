/**
 * Nødboks – ett sted for butikkoppsett.
 *
 * Hele checkout-flyten leser herfra. Skal du bytte fra «ingen plattform» til
 * Shopify, Snipcart eller Stripe, endrer du `plattform` og fyller inn nøklene
 * for den ene plattformen. Ingenting annet i koden trenger å endres.
 *
 * Nøklene her er PUBLIKE nøkler (storefront/publishable) og er ment å ligge i
 * klienten. Hemmelige nøkler skal aldri inn i denne filen – de hører hjemme
 * bak `stripe.checkoutEndpoint` eller tilsvarende server.
 */

export const BUTIKK = {
  /** 'ingen' | 'shopify' | 'snipcart' | 'stripe' */
  plattform: 'ingen',

  valuta: 'NOK',
  land: 'NO',
  sprak: 'nb-NO',

  /** Fri frakt over denne summen (kr). 0 = alltid fri frakt. */
  friFraktOver: 0,

  shopify: {
    // f.eks. 'nodboks.myshopify.com'
    domene: '',
    // Storefront API access token (publikt)
    storefrontToken: '',
    apiVersjon: '2025-01',
    // Kobler intern SKU -> Shopify variant-GID.
    // { 'boks-4': 'gid://shopify/ProductVariant/1234567890' }
    variantKart: {},
    // Shopify Subscriptions: selling plan-ID for påfyllsabonnement
    sellingPlanKart: {},
  },

  snipcart: {
    // Public API key fra Snipcart-dashbordet
    apiKey: '',
    // Snipcart crawler henter pris/navn fra data-item-* attributter i DOM,
    // så prisene i katalogen er fasit også her.
    version: '3.7.1',
  },

  stripe: {
    // pk_live_... eller pk_test_...
    publicKey: '',
    // Endepunkt som lager en Checkout Session server-side og returnerer { url }.
    // Stripe kan ikke lage sesjoner trygt fra en statisk side, så dette må
    // være en liten funksjon (Vercel/Netlify/Cloudflare Worker).
    checkoutEndpoint: '',
    // Alternativ uten server: ferdige Payment Links per SKU.
    paymentLinks: {},
  },

  /**
   * Fallback så lenge `plattform` er 'ingen': kunden får en oppsummert
   * bestilling på e-post i stedet for en betalingsside. Siden er dermed
   * i drift fra dag én, uten betalingsleverandør på plass.
   */
  epost: {
    mottaker: 'post@nodboks.no',
    emne: 'Bestilling fra nodboks.no',
  },
}

/** Formatering av kroner – ett sted, brukes overalt. */
export const kr = (n) =>
  new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: BUTIKK.valuta,
    maximumFractionDigits: 0,
  }).format(Math.round(n))

/** Tall med norsk tusenskille, uten valutasymbol. */
export const tall = (n, desimaler = 0) =>
  new Intl.NumberFormat('nb-NO', {
    minimumFractionDigits: desimaler,
    maximumFractionDigits: desimaler,
  }).format(n)
