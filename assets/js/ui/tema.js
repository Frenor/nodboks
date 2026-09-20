/**
 * Lys/mørk modus.
 *
 * Standard er systemets innstilling. Velger brukeren selv, husker vi det.
 * Selve «flash of wrong theme» unngås av et lite inline-script i <head> på
 * hver side – denne modulen håndterer bare bryteren etterpå.
 */

const NØKKEL = 'nodboks:tema'

export function lesTema() {
  try {
    return localStorage.getItem(NØKKEL) // 'light' | 'dark' | null (= system)
  } catch {
    return null
  }
}

export function settTema(tema) {
  const rot = document.documentElement
  if (tema === 'light' || tema === 'dark') {
    rot.setAttribute('data-theme', tema)
    try { localStorage.setItem(NØKKEL, tema) } catch { /* privat modus */ }
  } else {
    rot.removeAttribute('data-theme')
    try { localStorage.removeItem(NØKKEL) } catch { /* privat modus */ }
  }
  oppdaterKnapper()
}

function erMørk() {
  const valgt = document.documentElement.getAttribute('data-theme')
  if (valgt) return valgt === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function oppdaterKnapper() {
  const mørk = erMørk()
  for (const knapp of document.querySelectorAll('[data-tema-bryter]')) {
    knapp.setAttribute('aria-pressed', String(mørk))
    knapp.setAttribute('aria-label', mørk ? 'Bytt til lys modus' : 'Bytt til mørk modus')
    const ikon = knapp.querySelector('[data-tema-ikon]')
    if (ikon) ikon.dataset.temaIkon = mørk ? 'sol' : 'mane'
  }
}

export function koblTemabryter() {
  for (const knapp of document.querySelectorAll('[data-tema-bryter]')) {
    knapp.addEventListener('click', () => settTema(erMørk() ? 'light' : 'dark'))
  }
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', oppdaterKnapper)
  oppdaterKnapper()
}
