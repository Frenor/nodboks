/**
 * Bestillingsflyten – rendring.
 *
 * ## Renderingskontrakten
 *
 * Strukturen bygges ÉN gang ved oppstart. Etterpå endrer `tegn()` bare
 * tekstnoder, `checked`, `aria-pressed`, `hidden`, `disabled` og
 * data-attributter. Ingen `innerHTML` på noe som kan inneholde det fokuserte
 * elementet.
 *
 * Dette er ikke stilpreferanse. Den forrige versjonen bygde markup på nytt ved
 * hver tilstandsendring, og dermed falt fokus til <body> hver gang kunden
 * trykket mellomrom eller skrev et tall. Kontrakten fjerner hele feilklassen
 * framfor å lappe på den med fokus-gjenoppretting.
 *
 * Varelinjer for ALLE varer bygges ved oppstart og skjules med `hidden` når de
 * ikke gjelder. Da finnes noden allerede når den skal vises, og ingenting
 * settes inn eller rives ut mens kunden bruker siden.
 */

import {
  byggPakke, referanse, tilKurvpost, velgEske, dsbGruppe,
  GRUPPEREKKEFOLGE, MATNIVAER, MODUSER, ESKETYPER, PAFYLL, KONFIG,
} from '../konfigurator.js'
import { VARER, ESKER } from '../data/katalog.js'

/*
 * Esker er ikke varer i katalogen, men de blir varelinjer i pakken. Uten dem her
 * hadde raden for esken aldri eksistert, og den dyreste enkeltposten i pakken
 * ville vært usynlig i innholdslisten.
 */
const ALLE_VARER = [
  ...ESKER.map((e) => ({ ...e, kategori: 'Esken', type: 'engang', enhet: 'stk' })),
  ...VARER,
]
const finnVare = (sku) => ALLE_VARER.find((v) => v.sku === sku)
import { kr, tall } from '../config.js'
import { kurv } from '../kurv.js'
import { kasseStatus } from '../checkout/index.js'
import { tilstand } from '../tilstand.js'

const $ = (sel, rot = document) => rot.querySelector(sel)
const $$ = (sel, rot = document) => [...rot.querySelectorAll(sel)]
const lagEl = (tag, klasse, tekst) => {
  const el = document.createElement(tag)
  if (klasse) el.className = klasse
  if (tekst != null) el.textContent = tekst
  return el
}

const personord = (n) => `${n} ${n === 1 ? 'person' : 'personer'}`
const rolig = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Holdbarhet som noe man kan lese. Under to år tenker folk i måneder. */
function holdbarhet(ar) {
  if (!ar) return null
  if (ar < 2) {
    const md = Math.round(ar * 12)
    return `${md} måned${md === 1 ? '' : 'er'}`
  }
  return `${tall(Math.round(ar))} år`
}

const STEPPERE = [
  { felt: 'voksne', etikett: 'Voksne', min: 1, maks: KONFIG.personerMaks },
  { felt: 'barn', etikett: 'Barn', min: 0, maks: 6 },
  { felt: 'kjaeledyr', etikett: 'Kjæledyr', min: 0, maks: 4 },
]

const GLYFER = {
  voksne: '<circle cx="12" cy="6.5" r="3.2"/><path d="M5.5 21v-4a6.5 6.5 0 0 1 13 0v4"/>',
  barn: '<circle cx="12" cy="8" r="2.6"/><path d="M7.5 21v-3.5a4.5 4.5 0 0 1 9 0V21"/>',
  kjaeledyr:
    '<ellipse cx="12" cy="15.5" rx="4.2" ry="3.4"/><circle cx="6.5" cy="10" r="1.9"/><circle cx="10.2" cy="7" r="1.9"/><circle cx="13.8" cy="7" r="1.9"/><circle cx="17.5" cy="10" r="1.9"/>',
}

/* ------------------------------------------------------------------ bygging */

function byggStepper(felt, etikett, min, maks) {
  const boks = lagEl('div', 'stepper')
  boks.dataset.felt = felt
  boks.innerHTML = `
    <svg class="stepper__glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${GLYFER[felt]}</svg>
    <label class="stepper__etikett" for="felt-${felt}">${etikett}</label>
    <div class="stepper__rad">
      <button type="button" class="stepper__knapp" data-steg="-1"
              aria-label="Én ${etikett.toLowerCase()} færre">−</button>
      <input class="stepper__tall" id="felt-${felt}" type="number" inputmode="numeric"
             min="${min}" max="${maks}" step="1" value="${min}">
      <button type="button" class="stepper__knapp" data-steg="1"
              aria-label="Én ${etikett.toLowerCase()} til">+</button>
    </div>`
  return boks
}

function byggVarelinje(vare) {
  const rad = lagEl('div', 'vare')
  rad.dataset.sku = vare.sku
  rad.hidden = true
  rad.append(
    lagEl('span', 'vare__navn', vare.navn),
    lagEl('span', 'vare__antall'),
    lagEl('p', 'vare__hvorfor', vare.hvorfor ?? '')
  )
  const merker = lagEl('div', 'vare__merker')
  rad.append(merker)

  if (vare.bruksanvisning) {
    const lenke = lagEl('a', 'vare__lenke', 'Bruksanvisning')
    lenke.href = vare.bruksanvisning
    rad.append(lenke)
  }

  /*
   * Kurateringen ligger i varelinjen, ikke i en egen avkrysningsliste.
   * Prototypen hadde tre lister over de samme varene; dette er den ene.
   * En aria-pressed-knapp, ikke en avkrysningsboks: dette er «skru av», ikke
   * «velg ett», og forskjellen skal være hørbar og ikke bare synlig.
   */
  if (vare.tillegg) {
    const knapp = lagEl('button', 'vare__handling')
    knapp.type = 'button'
    knapp.dataset.handling = 'tillegg'
    knapp.setAttribute('aria-pressed', 'false')
    rad.append(knapp)
  } else if (vare.type === 'engang' && vare.kategori !== 'Esken') {
    const knapp = lagEl('button', 'vare__handling')
    knapp.type = 'button'
    knapp.dataset.handling = 'utelatt'
    knapp.setAttribute('aria-pressed', 'false')
    knapp.textContent = 'Har dere den fra før?'
    rad.append(knapp)
  }
  return rad
}

function byggValgkort(navn, id, tittel, beskrivelse, bilde) {
  const label = lagEl('label', 'option' + (bilde ? ' option--bilde' : ''))
  const inp = document.createElement('input')
  inp.type = 'radio'
  inp.name = navn
  inp.value = id
  inp.setAttribute('aria-describedby', `${navn}-${id}-desc`)
  const kropp = lagEl('span', 'option__body')
  const tit = lagEl('span', 'option__title')
  tit.append(document.createTextNode(tittel + ' '))
  const pris = lagEl('span', 'tnum')
  pris.dataset.pris = id
  tit.append(pris)
  const desc = lagEl('p', 'option__desc', beskrivelse)
  desc.id = `${navn}-${id}-desc`
  kropp.append(tit, desc)
  label.append(inp, kropp)
  return label
}

/* ------------------------------------------------------------------- start */

export function startBygger(rot = document) {
  const skjema = $('#bygger', rot)
  if (!skjema) return

  /* --- struktur, én gang --- */

  for (const vert of $$('[data-steppere]', rot)) {
    for (const s of STEPPERE) vert.append(byggStepper(s.felt, s.etikett, s.min, s.maks))
  }

  const matRot = $('#matnivaer', skjema)
  if (matRot && !matRot.children.length) {
    for (const m of MATNIVAER) {
      const kort = byggValgkort('matniva', m.id, m.navn, m.beskrivelse)
      const linjal = lagEl('div', 'holdbarhet')
      linjal.innerHTML = `<div class="holdbarhet__spor"><div class="holdbarhet__fyll"></div></div>
        <div class="holdbarhet__tekst"><span>Holdbarhet</span><span>${holdbarhet(m.holdbarhetAr)}</span></div>`
      linjal.dataset.holdbarhet = m.id
      $('.option__body', kort).append(linjal)
      matRot.append(kort)
    }
  }

  const modusRot = $('#moduser', skjema)
  if (modusRot && !modusRot.children.length) {
    for (const m of MODUSER) modusRot.append(byggValgkort('modus', m.id, m.navn, m.beskrivelse))
  }

  const eskeRot = $('#eskevalg', skjema)
  if (eskeRot && !eskeRot.children.length) {
    for (const e of ESKETYPER) eskeRot.append(byggValgkort('eskeType', e.id, e.navn, e.beskrivelse, e.bilde))
    visKassebilder(eskeRot)
  }

  const pafyllRot = $('#pafyllsvalg', skjema)
  if (pafyllRot && !pafyllRot.children.length) {
    for (const p of PAFYLL) pafyllRot.append(byggValgkort('pafyll', p.id, p.navn, p.beskrivelse))
  }

  // Alle varelinjer, for alle varer, én gang. Skjules når de ikke gjelder.
  const listeRot = $('#innholdsliste', rot)
  if (listeRot && !listeRot.children.length) {
    // Gruppene i DSBs faste rekkefølge – ikke rekkefølgen i den første pakken,
    // som mangler alle grupper kunden ennå ikke har varer i.
    for (const navn of GRUPPEREKKEFOLGE) {
      const seksjon = lagEl('section', 'gruppe')
      seksjon.dataset.gruppe = navn
      seksjon.hidden = true
      seksjon.append(lagEl('h3', 'gruppe__navn', navn))
      listeRot.append(seksjon)
    }
    for (const vare of ALLE_VARER) {
      $(`[data-gruppe="${dsbGruppe(vare.kategori)}"]`, listeRot).append(byggVarelinje(vare))
    }
  }

  /* --- hendelser --- */

  rot.addEventListener('click', (e) => {
    const steg = e.target.closest('.stepper__knapp')
    if (steg) {
      const felt = steg.closest('.stepper').dataset.felt
      const spec = STEPPERE.find((s) => s.felt === felt)
      const verdi = tilstand.les()[felt] + Number(steg.dataset.steg)
      tilstand.sett({ [felt]: Math.min(spec.maks, Math.max(spec.min, verdi)) })
      return
    }
    const handling = e.target.closest('[data-handling]')
    if (handling) {
      tilstand.veksle(handling.dataset.handling, handling.closest('.vare').dataset.sku)
      return
    }
    if (e.target.closest('[data-nullstill]')) tilstand.nullstill()
  })

  rot.addEventListener('input', (e) => {
    const inp = e.target.closest('.stepper__tall')
    if (!inp) return
    const felt = inp.closest('.stepper').dataset.felt
    const spec = STEPPERE.find((s) => s.felt === felt)
    const n = Number(inp.value)
    if (!Number.isFinite(n)) return
    tilstand.sett({ [felt]: Math.min(spec.maks, Math.max(spec.min, Math.round(n))) })
  })

  skjema.addEventListener('change', (e) => {
    const inp = e.target
    if (inp.name === 'matniva') tilstand.sett({ matniva: inp.value })
    else if (inp.name === 'modus') tilstand.sett({ modus: inp.value })
    else if (inp.name === 'eskeType') tilstand.sett({ eskeType: inp.value })
    else if (inp.name === 'pafyll') tilstand.sett({ abonnement: inp.value })
    else if (inp.id === 'abonnement') {
      tilstand.sett({ abonnement: inp.checked ? ($('input[name="pafyll"]:checked', skjema)?.value ?? PAFYLL[0].id) : null })
    }
  })

  const dialog = $('#prisdialog', rot)
  $('[data-apne-pris]', rot)?.addEventListener('click', () => dialog?.showModal())
  $('[data-lukk-pris]', rot)?.addEventListener('click', () => dialog?.close())

  for (const lenke of $$('[data-flytt-fokus]', rot)) {
    lenke.addEventListener('click', (e) => {
      const mal = $(lenke.getAttribute('href'), rot)
      if (!mal) return
      e.preventDefault()
      mal.setAttribute('tabindex', '-1')
      mal.scrollIntoView({ behavior: rolig() ? 'auto' : 'smooth', block: 'start' })
      mal.focus({ preventScroll: true })
    })
  }

  const kjop = $('#legg-i-kurv', rot)
  if (kjop) {
    kjop.dataset.tekst = kjop.textContent
    kjop.addEventListener('click', () => {
      kurv.leggTil(tilKurvpost(byggPakke(tilstand.tilValg())))
      kjop.textContent = 'Lagt i kurven'
      setTimeout(() => (kjop.textContent = kjop.dataset.tekst), 2000)
    })
  }

  if (kasseStatus().erFallback) {
    const notis = $('#kasse-notis', rot)
    if (notis) notis.hidden = false
  }

  /* --- tegning --- */

  let annonserTimer = null
  const status = $('#pris-status', rot)

  function tegn() {
    const t = tilstand.les()
    const pakke = byggPakke(tilstand.tilValg())

    tegnSteppere(rot, t)
    tegnSvar(rot, pakke)
    tegnValg(skjema, t, pakke)
    tegnListe(listeRot, pakke)
    tegnPris(rot, pakke)
    tegnGjenopprettet(rot)

    // Én samlet melding per rolige tilstand, ikke én per tastetrykk.
    if (status) {
      clearTimeout(annonserTimer)
      annonserTimer = setTimeout(() => {
        status.textContent = `${referanse(pakke)}. ${kr(pakke.abonnement ? pakke.sumMedAbonnement : pakke.sum)}.`
      }, 700)
    }
  }

  tilstand.lytt(tegn)
  tegn()
  return () => byggPakke(tilstand.tilValg())
}

/* ------------------------------------------------------------------ tegning */

function tegnSteppere(rot, t) {
  for (const boks of $$('.stepper', rot)) {
    const felt = boks.dataset.felt
    const spec = STEPPERE.find((s) => s.felt === felt)
    const inp = $('.stepper__tall', boks)
    if (document.activeElement !== inp) inp.value = String(t[felt])
    const takNadd = t.voksne + t.barn >= KONFIG.personerMaks
    for (const knapp of $$('.stepper__knapp', boks)) {
      const steg = Number(knapp.dataset.steg)
      const ny = t[felt] + steg
      const overTak = steg > 0 && felt !== 'kjaeledyr' && takNadd
      knapp.disabled = ny < spec.min || ny > spec.maks || overTak
    }
  }
  const tak = $('[data-tak]', rot)
  if (tak) tak.hidden = t.voksne + t.barn < KONFIG.personerMaks
}

function tegnSvar(rot, pakke) {
  const el = $('#svar', rot)
  if (!el) return
  const { voksne, barn, kjaeledyr } = pakke.valg.husstand
  const hvem = [
    `${voksne} ${voksne === 1 ? 'voksen' : 'voksne'}`,
    barn ? `${barn} ${barn === 1 ? 'barn' : 'barn'}` : null,
    kjaeledyr ? `${kjaeledyr} ${kjaeledyr === 1 ? 'kjæledyr' : 'kjæledyr'}` : null,
  ].filter(Boolean)

  const kaldt =
    pakke.dognUtenVarme >= KONFIG.dogn
      ? 'Hele uka kan spises kald hvis brennstoffet tar slutt.'
      : `Uten brennstoff rekker maten ${pakke.dognUtenVarme} døgn.`

  el.textContent =
    `${hvem.join(', ')}: ${tall(Math.round(pakke.kcal))} kcal, ${tall(pakke.liter)} liter vann, ` +
    `og ${pakke.eske ? pakke.eske.navn.split('–')[1]?.trim() ?? 'esken' : 'et påfyll'} ` +
    `på rundt ${tall(Math.round(pakke.vekt))} kg. ${kaldt}`
}

function tegnValg(skjema, t, pakke) {
  for (const [navn, verdi] of [
    ['matniva', t.matniva],
    ['modus', t.modus],
    ['eskeType', t.eskeType],
    ['pafyll', t.abonnement ?? PAFYLL[0].id],
  ]) {
    for (const inp of $$(`input[name="${navn}"]`, skjema)) inp.checked = inp.value === verdi
  }

  const abo = $('#abonnement', skjema)
  if (abo) abo.checked = Boolean(t.abonnement)

  const eskeSteg = $('#eskevalg', skjema)?.closest('.steg')
  if (eskeSteg) eskeSteg.hidden = !pakke.modus.medEske

  for (const type of ESKETYPER) {
    const merke = $(`[data-pris="${type.id}"]`, skjema)
    if (merke) merke.textContent = kr(velgEske(pakke.ctx.hoder + Math.ceil(pakke.ctx.dyr / 2), type.id).pris)
  }

  const maks = Math.max(...MATNIVAER.map((m) => m.holdbarhetAr))
  for (const m of MATNIVAER) {
    const fyll = $(`[data-holdbarhet="${m.id}"] .holdbarhet__fyll`, skjema)
    if (fyll) fyll.style.width = `${Math.max(4, (m.holdbarhetAr / maks) * 100)}%`
  }
}

function tegnListe(listeRot, pakke) {
  if (!listeRot) return

  const iPakken = new Map(pakke.linjer.map((l) => [l.sku, l]))
  const kanBort = new Map(pakke.utstyrsvalg.map((u) => [u.sku, u]))
  const tillegg = new Map(pakke.tilleggsvalg.map((t) => [t.sku, t]))

  for (const rad of $$('.vare', listeRot)) {
    const sku = rad.dataset.sku
    const linje = iPakken.get(sku)
    const bort = kanBort.get(sku)
    const till = tillegg.get(sku)

    // Fravalgte varer blir stående. En vare som forsvinner i det du klikker på
    // den, kan ikke angres – og da er «har dere den fra før?» en felle.
    rad.hidden = !linje && !bort && !till
    if (rad.hidden) continue

    const vare = finnVare(sku)
    const antall = linje?.antall ?? bort?.antall ?? till?.antall ?? 1
    $('.vare__antall', rad).textContent = linje ? `${tall(antall)} ${linje.enhet ?? vare.enhet ?? 'stk'}` : ''

    const merker = $('.vare__merker', rad)
    const merkenokkel = linje ? String(linje.holdbarhetAr) + linje.type : 'av'
    if (merker.dataset.for !== merkenokkel) {
      merker.dataset.for = merkenokkel
      merker.textContent = ''
      if (linje) {
        const h = holdbarhet(linje.holdbarhetAr)
        if (h) merker.append(lagEl('span', 'badge', `Holdbar ${h}`))
        merker.append(lagEl('span', 'badge', linje.type === 'engang' ? 'Varer i mange år' : 'Går ut på dato'))
      }
    }

    const knapp = $('[data-handling]', rad)
    if (!knapp) continue
    if (knapp.dataset.handling === 'utelatt') {
      // Bare varer over fravalgsterskelen kan tas ut. Knappen finnes ikke på de
      // andre, framfor å finnes og ikke virke.
      knapp.hidden = !bort
      if (!bort) { rad.classList.remove('vare--utelatt'); continue }
      const spart = Math.round(bort.sum * (1 - (pakke.modus.rabatt ?? 0)))
      knapp.setAttribute('aria-pressed', String(bort.valgtBort))
      knapp.textContent = bort.valgtBort ? `Tatt ut – dere sparer ${kr(spart)}` : 'Har dere den fra før?'
      rad.classList.toggle('vare--utelatt', bort.valgtBort)
    } else {
      knapp.hidden = false
      knapp.setAttribute('aria-pressed', String(Boolean(till?.valgt)))
      knapp.textContent = till?.valgt ? 'Fjern fra pakken' : `Legg til – ${kr(till?.sum ?? 0)}`
      rad.classList.toggle('vare--tillegg', !till?.valgt)
    }
  }

  for (const seksjon of $$('.gruppe', listeRot)) {
    seksjon.hidden = !$$('.vare:not([hidden])', seksjon).length
  }

  const teller = $('#innhold-teller')
  if (teller) teller.textContent = `${tall(pakke.linjer.reduce((n, l) => n + l.antall, 0))} varer`

  const dyrefot = $('#dyrefotnote')
  if (dyrefot) dyrefot.hidden = pakke.ctx.dyr > 0
}

function tegnPris(rot, pakke) {
  const abo = Boolean(pakke.abonnement)
  const sum = abo ? pakke.sumMedAbonnement : pakke.sum

  for (const el of $$('[data-sum]', rot)) el.textContent = kr(sum)
  const enhet = $('[data-pris-enhet]', rot)
  if (enhet) {
    enhet.textContent = `${kr(pakke.prisPerPersonPerDogn)} per person per døgn · ${personord(pakke.valg.personer)} · ${KONFIG.dogn} døgn`
  }

  const linjer = $('#pris-linjer', rot)
  if (linjer) {
    const mat = pakke.linjer.filter((l) => ['Mat', 'Vann'].includes(l.kategori)).reduce((n, l) => n + l.sum, 0)
    const utstyr = pakke.sumVarer - mat + pakke.spart
    const rader = []
    if (mat) rader.push(['Mat og vann', mat])
    if (utstyr) rader.push([pakke.eske ? 'Utstyr og eske' : 'Utstyr', utstyr])
    for (const l of pakke.fravalgt) rader.push([`Uten ${l.navn.toLowerCase()}`, -l.sum])
    if (pakke.pakkerabatt) rader.push(['Pakkerabatt', -pakke.pakkerabatt])
    if (pakke.abonnementsrabatt) rader.push(['Påfyllsrabatt', -pakke.abonnementsrabatt])

    linjer.textContent = ''
    for (const [navn, verdi] of rader) {
      const rad = lagEl('div', 'prispanel__linje')
      rad.append(lagEl('span', null, navn), lagEl('span', null, kr(verdi)))
      linjer.append(rad)
    }
    const sumrad = lagEl('div', 'prispanel__linje prispanel__linje--sum')
    sumrad.append(lagEl('span', null, 'Å betale'), lagEl('span', null, kr(sum)))
    linjer.append(sumrad)
  }

  const mva = $('#pris-mva', rot)
  if (mva) mva.textContent = `Herav mva. ${kr(pakke.mva)} – 15 % på mat, 25 % på utstyr.`

  const neste = $('#pris-neste', rot)
  if (neste) neste.textContent = pakke.holdbarhetAr ? `Neste påfyll om rundt ${holdbarhet(pakke.holdbarhetAr)}.` : ''

  const varsler = $('#varsler', rot)
  if (varsler) {
    const nøkkel = pakke.varsler.map((v) => v.tekst).join('|')
    if (varsler.dataset.for !== nøkkel) {
      varsler.dataset.for = nøkkel
      varsler.textContent = ''
      for (const v of pakke.varsler) {
        const boks = lagEl('div', `varsel varsel--${v.type === 'warn' ? 'warn' : 'info'}`)
        boks.append(lagEl('p', null, v.tekst))
        varsler.append(boks)
      }
    }
  }
}

function tegnGjenopprettet(rot) {
  const el = $('[data-gjenopprettet]', rot)
  if (el) el.hidden = !tilstand.bleGjenopprettet()
}

/**
 * Bildene av kassene settes bare inn hvis ALLE finnes.
 *
 * Et valgkort med foto ved siden av et uten er ikke et nøytralt valg: bildet
 * selger for seg selv. Siden aluminium koster flere tusen mer og forskjellen
 * er visuell, ville en ensidig illustrasjon vært en tommel på vekten.
 */
async function visKassebilder(rot) {
  const typer = ESKETYPER.filter((e) => e.bilde)
  if (typer.length !== ESKETYPER.length) return
  const lastet = await Promise.all(
    typer.map(
      (e) =>
        new Promise((ok) => {
          const b = new Image()
          b.onload = () => ok(true)
          b.onerror = () => ok(false)
          b.src = `${e.bilde}-600.webp`
        })
    )
  )
  if (!lastet.every(Boolean)) return
  for (const type of typer) {
    const kropp = rot.querySelector(`input[value="${type.id}"]`)?.closest('.option')?.querySelector('.option__body')
    if (!kropp || kropp.querySelector('.option__foto')) continue
    const el = document.createElement('img')
    el.className = 'option__foto'
    el.src = `${type.bilde}-900.webp`
    el.srcset = `${type.bilde}-900.webp 900w, ${type.bilde}-600.webp 600w`
    el.sizes = '(min-width: 60rem) 22rem, 45vw'
    el.width = 900
    el.height = 675
    el.alt = ''
    el.loading = 'lazy'
    el.decoding = 'async'
    kropp.prepend(el)
  }
}
