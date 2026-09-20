/**
 * Kurv.
 *
 * Én konfigurert pakke er én kurvpost. Posten tar vare på hele
 * konfigurasjonen (personer, matnivå, modus, abonnement) slik at kunden kan
 * gå tilbake og justere, og slik at ordren kan gjenskapes i ettertid.
 */

import { kr } from './config.js'

const NØKKEL = 'nodboks:kurv'
const lyttere = new Set()

function les() {
  try {
    const rå = localStorage.getItem(NØKKEL)
    const data = rå ? JSON.parse(rå) : []
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function skriv(poster) {
  try { localStorage.setItem(NØKKEL, JSON.stringify(poster)) } catch { /* privat modus */ }
  for (const l of lyttere) l(poster)
  document.dispatchEvent(new CustomEvent('kurv:endret', { detail: { poster } }))
}

export const kurv = {
  poster: () => les(),

  antall: () => les().reduce((n, p) => n + p.antall, 0),

  sum: () => les().reduce((n, p) => n + p.sum * p.antall, 0),

  /** @param {{id,tittel,sum,linjer,konfigurasjon,abonnement}} post */
  leggTil(post) {
    const poster = les()
    const fins = poster.find((p) => p.id === post.id)
    if (fins) fins.antall += 1
    else poster.push({ ...post, antall: 1 })
    skriv(poster)
    return poster
  },

  settAntall(id, antall) {
    const poster = les()
      .map((p) => (p.id === id ? { ...p, antall: Math.max(0, antall) } : p))
      .filter((p) => p.antall > 0)
    skriv(poster)
    return poster
  },

  fjern(id) {
    skriv(les().filter((p) => p.id !== id))
  },

  tøm() {
    skriv([])
  },

  /** Normaliserer kurven til ordreobjektet checkout-laget forventer. */
  tilOrdre() {
    const poster = les()
    const linjer = []
    for (const post of poster) {
      for (const linje of post.linjer) {
        linjer.push({
          sku: linje.sku,
          navn: linje.navn,
          antall: linje.antall * post.antall,
          enhetspris: linje.enhetspris,
          sum: linje.enhetspris * linje.antall * post.antall,
          type: post.abonnement ? 'abonnement' : 'engang',
          metadata: { pakke: post.tittel },
        })
      }
    }
    const abonnement = poster.find((p) => p.abonnement)?.abonnement ?? null
    return {
      linjer,
      sum: linjer.reduce((n, l) => n + l.sum, 0),
      valuta: 'NOK',
      abonnement,
      referanse: poster.map((p) => `${p.antall} × ${p.tittel} (${kr(p.sum)})`).join('; '),
      konfigurasjon: poster.map((p) => p.konfigurasjon),
    }
  },

  lytt(fn) {
    lyttere.add(fn)
    return () => lyttere.delete(fn)
  },
}

/** Holder tallet i topplinjen oppdatert på alle sider. */
export function koblKurvteller() {
  const tegn = () => {
    const n = kurv.antall()
    for (const el of document.querySelectorAll('[data-kurv-teller]')) {
      el.textContent = String(n)
      el.hidden = n === 0
    }
    for (const el of document.querySelectorAll('[data-kurv-sum]')) {
      el.textContent = kr(kurv.sum())
    }
  }
  kurv.lytt(tegn)
  window.addEventListener('storage', tegn)
  tegn()
}
