/**
 * Kontrastrevisjon av tokens.css.
 *
 *   node scripts/kontrast.mjs
 *
 * Leser fargetokens rett ut av assets/css/tokens.css for begge modi og regner
 * WCAG-kontrast for hvert par som faktisk forekommer i grensesnittet. Kjøres
 * etter enhver endring i paletten. En palett som ikke går grønt her, går ikke
 * i produksjon – da er «AA» en påstand og ikke et faktum.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const rot = join(dirname(fileURLToPath(import.meta.url)), '..')
const css = readFileSync(join(rot, 'assets/css/tokens.css'), 'utf8')

/** Plukker ut --navn: #hex fra en blokk. */
function tokens(blokk) {
  const ut = {}
  for (const [, navn, verdi] of blokk.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
    ut[navn] = verdi
  }
  return ut
}

/** :root-blokken uten mørk modus, og :root[data-theme="dark"]-blokken. */
function blokk(selektor) {
  const i = css.indexOf(selektor)
  if (i === -1) return ''
  const start = css.indexOf('{', i)
  let dybde = 0
  for (let j = start; j < css.length; j++) {
    if (css[j] === '{') dybde++
    else if (css[j] === '}') { dybde--; if (dybde === 0) return css.slice(start, j) }
  }
  return ''
}

const lys = tokens(blokk(':root {'))
const mork = { ...lys, ...tokens(blokk(':root[data-theme="dark"]')) }

function rgb(hex) {
  let h = hex.replace('#', '')
  if (h.length === 3) h = [...h].map((c) => c + c).join('')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
}

function luminans(hex) {
  const [r, g, b] = rgb(hex).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function kontrast(a, b) {
  const [x, y] = [luminans(a), luminans(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}

/**
 * Parene som faktisk forekommer. Krav følger WCAG 2.1:
 * 4.5 for brødtekst, 3.0 for stor tekst og for grafiske elementer / UI-flater.
 */
const PAR = [
  ['text', 'bg', 4.5, 'brødtekst på sidebakgrunn'],
  ['text', 'surface', 4.5, 'brødtekst på kort'],
  ['text', 'surface-2', 4.5, 'brødtekst på innskutt flate'],
  ['text-muted', 'bg', 4.5, 'dempet tekst på bakgrunn'],
  ['text-muted', 'surface', 4.5, 'dempet tekst på kort'],
  ['text-faint', 'bg', 3.0, 'svak tekst – kun stor tekst (WCAG 1.4.3)'],
  ['accent', 'bg', 4.5, 'lenkefarge i brødtekst'],
  ['accent', 'surface', 4.5, 'lenkefarge på kort'],
  ['accent-ink', 'accent', 4.5, 'knappetekst på aksentknapp'],
  ['brand-ink', 'brand', 4.5, 'tekst på merkevareflate'],
  ['border-strong', 'surface', 3.0, 'kant på skjemakontroll (WCAG 1.4.11)'],
  ['border-strong', 'bg', 3.0, 'kant på skjemakontroll mot bakgrunn'],
  ['focus', 'bg', 3.0, 'fokusring mot bakgrunn (WCAG 1.4.11)'],
  ['focus', 'surface', 3.0, 'fokusring mot kort'],
  ['ok', 'ok-soft', 4.5, 'suksesstekst på egen flate'],
  ['warn', 'warn-soft', 4.5, 'varseltekst på egen flate'],
  ['info', 'info-soft', 4.5, 'infotekst på egen flate'],
  ['accent', 'accent-soft', 4.5, 'aksenttekst på svak aksentflate'],
]

/**
 * Par som rapporteres, men ikke feiler. WCAG 1.4.11 krever 3:1 bare når
 * kantlinjen er det eneste som identifiserer komponenten. En dekorativ
 * kortkant er ikke det, og et krav her ville tvunget fram harde streker
 * over hele siden uten gevinst for noen.
 */
const OPPLYSENDE = [
  ['border', 'surface', 'dekorativ kortkant – ikke et WCAG-krav'],
  ['border', 'bg', 'dekorativ kant mot bakgrunn'],
  ['accent', 'bg', 'aksent som flate/ikon (3:1 ville holdt)'],
]

let feil = 0
let mangler = 0

for (const [navn, palett] of [['LYS MODUS', lys], ['MØRK MODUS', mork]]) {
  console.log(`\n\x1b[1m${navn}\x1b[0m`)
  for (const [a, b, krav, hva] of PAR) {
    if (!palett[a] || !palett[b]) {
      mangler++
      console.log(`  \x1b[2m·\x1b[0m ${hva} – mangler --${!palett[a] ? a : b}`)
      continue
    }
    const r = kontrast(palett[a], palett[b])
    const ok = r >= krav
    if (!ok) feil++
    const merke = ok ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m'
    const tall = r.toFixed(2).padStart(5)
    const farge = ok ? '' : '\x1b[31m'
    const slutt = ok ? '' : '\x1b[0m'
    console.log(`  ${merke} ${farge}${tall}:1${slutt} (krav ${krav.toFixed(1)})  ${hva}`)
    console.log(`      \x1b[2m--${a} ${palett[a]} mot --${b} ${palett[b]}\x1b[0m`)
  }

  for (const [a, b, hva] of OPPLYSENDE) {
    if (!palett[a] || !palett[b]) continue
    console.log(`  \x1b[2m· ${kontrast(palett[a], palett[b]).toFixed(2).padStart(5)}:1 (opplysende)  ${hva}\x1b[0m`)
  }
}

console.log(
  feil
    ? `\n\x1b[31m${feil} par under kravet\x1b[0m${mangler ? `, ${mangler} mangler token` : ''}\n`
    : `\n\x1b[32mAlle par består\x1b[0m${mangler ? ` – ${mangler} mangler token` : ''}\n`
)
process.exit(feil ? 1 : 0)
