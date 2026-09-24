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
import { VARER, MATNIVAER } from '../assets/js/data/katalog.js'

const kr = (n) => new Intl.NumberFormat('nb-NO').format(n)
const pakke = (v, niva, modus = 'komplett', b = 0, d = 0) =>
  byggPakke({ husstand: { voksne: v, barn: b, kjaeledyr: d }, matniva: niva, modus, eskeType: 'plast' })

if (process.argv[2] === 'linjer') {
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
