/**
 * Oppstart for forsiden. Holder seg til å koble sammen modulene – all logikk
 * ligger i konfigurator.js, all rendring i ui/.
 *
 * Prisforankringen i heroen er ikke lenger et eget kall hit: heroens
 * husstandskort er koblet på den samme tilstanden som byggeren, så tallet over
 * bretten kan ikke komme i utakt med det kunden betaler.
 */

import { koblTemabryter } from './ui/tema.js'
import { koblKurvteller } from './kurv.js'
import { startBygger } from './ui/bygger.js'

koblTemabryter()
koblKurvteller()
startBygger()
