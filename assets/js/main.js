/**
 * Oppstart for forsiden. Holder seg til å koble sammen modulene – all logikk
 * ligger i konfigurator.js, all rendring i ui/.
 */

import { koblTemabryter } from './ui/tema.js'
import { koblKurvteller } from './kurv.js'
import { startBygger } from './ui/bygger.js'
import { byggPakke } from './konfigurator.js'
import { kr } from './config.js'

koblTemabryter()
koblKurvteller()
startBygger()

/* Prisforankringen i heroen hentes fra samme beregning som byggeren bruker,
   slik at tallet over bretten aldri kan komme i utakt med det kunden betaler. */
const anker = document.querySelector('[data-hero-pris]')
if (anker) {
  const standard = byggPakke({ personer: 4, matniva: 'torrmat', modus: 'komplett' })
  anker.textContent = kr(standard.sum)
}
