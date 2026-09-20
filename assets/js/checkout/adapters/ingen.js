/**
 * Fallback-adapter: ingen betalingsplattform koblet på ennå.
 *
 * I stedet for å blokkere salget lager den en ferdig utfylt e-postbestilling.
 * Det holder siden i drift fra første dag og gir samtidig reelle ordrer å
 * validere prisstrategien mot før plattformvalget låses.
 */

import { BUTIKK, kr } from '../../config.js'

function byggTekst(ordre) {
  const l = []
  l.push('Hei! Jeg vil bestille denne beredskapspakken:')
  l.push('')
  l.push(ordre.referanse)
  l.push('')
  l.push('Innhold:')
  for (const linje of ordre.linjer) {
    l.push(`  ${linje.antall} × ${linje.navn} — ${kr(linje.sum)}`)
  }
  l.push('')
  l.push(`Sum: ${kr(ordre.sum)} inkl. mva`)
  if (ordre.abonnement) {
    l.push(`Påfyll: ${ordre.abonnement.etikett}`)
  }
  l.push('')
  l.push('Navn:')
  l.push('Adresse:')
  l.push('Telefon:')
  return l.join('\n')
}

export const adapterIngen = {
  navn: 'ingen',
  etikett: 'Send bestilling',
  støtterAbonnement: true,

  klar: () => true,

  async checkout(ordre) {
    const url =
      `mailto:${BUTIKK.epost.mottaker}` +
      `?subject=${encodeURIComponent(BUTIKK.epost.emne)}` +
      `&body=${encodeURIComponent(byggTekst(ordre))}`
    return {
      ok: true,
      url,
      melding:
        'Vi åpner e-postprogrammet ditt med bestillingen ferdig utfylt. ' +
        'Du får svar med betalingsinformasjon samme dag.',
    }
  },
}
