/**
 * Autoritative tall til dokumentasjonen.
 *
 * Finnes for at analysedokumentene skal kunne oppdateres mot kjørende kode i
 * stedet for mot hukommelsen. Alt her regnes ut, ingenting er skrevet inn.
 *
 *   node scripts/tall.mjs            – nøkkeltall
 *   node scripts/tall.mjs linjer     – alle varelinjer per matnivå, 4 personer
 */
import { byggPakke } from '../assets/js/konfigurator.js'
import { VARER, MATNIVAER, ESKER } from '../assets/js/data/katalog.js'

const kr = (n) => new Intl.NumberFormat('nb-NO').format(n)
const pakke = (v, niva, modus = 'komplett', b = 0, d = 0) =>
  byggPakke({ husstand: { voksne: v, barn: b, kjaeledyr: d }, matniva: niva, modus, eskeType: 'plast' })

const MODUS = process.argv[2]

if (MODUS === 'leverandorer') {
  /*
   * Tabellene i docs/leverandorer.md, generert fra katalogen.
   *
   * Finnes fordi § 1 og § 7 i det dokumentet drev fra hverandre: de var et
   * øyeblikksbilde fra en gammel commit, med tretten feil priser, seks
   * manglende varer og tjue flasker rødsprit vi ikke selger lenger. Et
   * dokument som regenereres kan ikke drive.
   *
   *   node scripts/tall.mjs leverandorer            skriv til skjerm
   *   node scripts/tall.mjs leverandorer --skriv    splei inn i dokumentet
   */
  const { readFileSync, writeFileSync, existsSync } = await import('node:fs')
  const innkjop = existsSync('innkjop.local.json')
    ? JSON.parse(readFileSync('innkjop.local.json', 'utf8'))
    : {}

  const ut = []
  const w = (linje = '') => ut.push(linje)
  const nok = (n) => (n == null ? '—' : n.toLocaleString('nb-NO'))
  const anslag = (k) => !k || /ANSLAG|ikke sourcet|ikke valgt|Ikke låst/i.test(k)
  const lenke = (p) => (p?.url ? `[kilde](${p.url})` : '—')
  const merket = (v) => [v.produkt?.merke, v.produkt?.modell].filter(Boolean).join(' ') || '**ikke valgt**'

  const GRUPPER = ['Mat', 'Vann', 'Matlaging', 'Varme og lys', 'Strøm og samband', 'Helse og hygiene', 'Verktøy og dokumenter']

  for (const kategori of GRUPPER) {
    const varer = VARER.filter((v) => v.kategori === kategori)
    if (!varer.length) continue
    w(`### ${kategori}`)
    w()
    w('| Vare | Merke / modell | Vår pris | Innkjøp | Kilde |')
    w('| --- | --- | ---: | ---: | --- |')
    for (const v of varer) {
      const flagg = anslag(v.produkt?.kilde) ? ' ✱' : ''
      w(`| ${v.navn}${flagg} | ${merket(v)} | ${nok(v.pris)} | ${nok(innkjop[v.sku]?.innkjop)} | ${lenke(v.produkt)} |`)
    }
    w()
  }

  w('### Esker')
  w()
  w('| Eske | Opp til | Vår pris | Innkjøp |')
  w('| --- | ---: | ---: | ---: |')
  for (const e of ESKER) {
    const flagg = anslag(innkjop[e.sku]?.kilde) ? ' ✱' : ''
    w(`| ${e.navn}${flagg} | ${e.maksPersoner} pers. | ${nok(e.pris)} | ${nok(innkjop[e.sku]?.innkjop)} |`)
  }
  w()

  const alle = [...VARER, ...ESKER]
  const usourcet = alle.filter((v) => anslag(v.produkt?.kilde ?? innkjop[v.sku]?.kilde))
  w(`✱ = ingen navngitt produkt eller ingen observert kilde. **${alle.length - usourcet.length} av ${alle.length} varer er sourcet.**`)
  w(`Gjenstår: ${usourcet.map((v) => v.navn.split(/[,–]/)[0].trim()).join(', ')}.`)

  const ORDRE = 10
  const p = pakke(4, 'torrmat')
  const rader = p.linjer
    .map((l) => ({
      navn: l.navn,
      enhet: l.enhet,
      antall: l.antall * ORDRE,
      kost: (innkjop[l.sku]?.innkjop ?? 0) * l.antall * ORDRE,
      mangler: innkjop[l.sku]?.innkjop == null,
    }))
    .sort((a, b) => b.kost - a.kost)
  const kapital = rader.reduce((n, r) => n + r.kost, 0)
  const netto = Math.round(p.netto * ORDRE)

  const ordre = []
  const o = (linje = '') => ordre.push(linje)
  o(`**${ORDRE} komplette pakker til fire personer, tørrmat.** Salgsverdi ${nok(p.sum * ORDRE)} kr`)
  o(`inkl. mva, nettoomsetning ${nok(netto)} kr eks. mva.`)
  o()
  o('| Antall | Enhet | Vare | Kost eks. mva |')
  o('| ---: | --- | --- | ---: |')
  for (const r of rader) {
    o(`| ${nok(r.antall)} | ${r.enhet} | ${r.navn}${r.mangler ? ' **(ingen innkjøpspris)**' : ''} | ${r.kost ? nok(Math.round(r.kost)) : '—'} |`)
  }
  o(`| | | **Kapitalbinding** | **${nok(Math.round(kapital))}** |`)
  o()
  o(`**Dekningsbidrag på ${ORDRE} pakker: ${nok(netto - Math.round(kapital))} kr** (${nok(netto)} − ${nok(Math.round(kapital))}).`)
  o('Det skal dekke frakt inn, frakt ut, emballasje, svinn og all arbeidstid.')

  const blokker = { tabeller: ut.join('\n'), ordre: ordre.join('\n') }

  if (process.argv.includes('--skriv')) {
    const DOK = 'docs/leverandorer.md'
    let d = readFileSync(DOK, 'utf8')
    for (const [navn, innhold] of Object.entries(blokker)) {
      const a = `<!-- GENERERT:${navn} -->`
      const b = `<!-- /GENERERT:${navn} -->`
      const i = d.indexOf(a)
      const j = d.indexOf(b)
      if (i === -1 || j === -1) {
        console.error(`Fant ikke markørene for «${navn}» i ${DOK}.`)
        process.exit(1)
      }
      d = d.slice(0, i + a.length) + '\n\n' + innhold + '\n\n' + d.slice(j)
    }
    writeFileSync(DOK, d)
    console.log(`${DOK} oppdatert fra katalogen.`)
  } else {
    console.log(blokker.tabeller)
    console.log()
    console.log(blokker.ordre)
  }
  process.exit(0)
}

if (MODUS === 'linjer') {
  for (const niva of ['torrmat', 'langtidsmat']) {
    console.log(`\n## ${niva} – komplett, 4 voksne\n`)
    console.log('| SKU | Antall | Enhet | Pris | Sum | kcal | Krever varme |')
    console.log('|---|---|---|---|---|---|---|')
    for (const l of pakke(4, niva).linjer) {
      console.log(`| ${l.sku} | ${l.antall} | ${l.enhet} | ${l.enhetspris} | ${l.sum} | ${l.kcal} | ${l.kreverVarme ? 'ja' : 'nei'} |`)
    }
  }
  process.exit(0)
}

console.log('## Pris, energidekning, kalde døgn og vekt\n')
console.log('| Modus | Matnivå | Personer | Sum inkl. mva | Energidekning | Døgn uten varme | Vekt |')
console.log('|---|---|---|---|---|---|---|')
for (const modus of ['komplett', 'matpafyll']) {
  for (const niva of ['torrmat', 'langtidsmat']) {
    for (const v of [1, 2, 4, 6, 8]) {
      const p = pakke(v, niva, modus)
      console.log(`| ${modus} | ${niva} | ${v} | ${kr(p.sum)} kr | ${Math.round(p.kcalDekning * 100)} % | ${p.dognUtenVarme} | ${Math.round(p.vekt)} kg |`)
    }
  }
}

console.log('\n## Matvarer per nivå\n')
for (const m of MATNIVAER) {
  const i = VARER.filter((v) => v.kategori === 'Mat' && (!v.matnivaer || v.matnivaer.includes(m.id)))
  console.log(`**${m.id}** (${i.length} varer): ${i.map((v) => v.sku).join(', ')}`)
}

console.log('\n## Skaleringsformler, matvarer\n')
for (const v of VARER.filter((x) => x.kategori === 'Mat')) {
  console.log(`- \`${v.sku}\` — ${String(v.antall).replace(/\s+/g, ' ')}`)
}
