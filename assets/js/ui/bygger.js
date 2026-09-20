/**
 * Pakkebyggeren – rendring.
 *
 * All regning skjer i konfigurator.js. Denne filen gjør tre ting: leser valgene
 * ut av skjemaet, ber om en ferdig regnet pakke, og tegner den. Prisen som
 * vises er derfor alltid den samme prisen som legges i kurven.
 */

import {
  byggPakke,
  velgEske,
  MATGRUPPER,
  FRAVALG_TERSKEL,
  referanse,
  tilKurvpost,
  klem,
  MATNIVAER,
  MODUSER,
  PAFYLL,
  ESKETYPER,
  KONFIG,
} from '../konfigurator.js'
import { kr, tall } from '../config.js'
import { kurv } from '../kurv.js'
import { kasseStatus } from '../checkout/index.js'

const $ = (sel, rot = document) => rot.querySelector(sel)
const $$ = (sel, rot = document) => [...rot.querySelectorAll(sel)]

/** Norsk flertall uten å skrive «1 personer». */
const personer = (n) => `${n} ${n === 1 ? 'person' : 'personer'}`

/**
 * Holdbarhet som noe man kan lese.
 *
 * Katalogen lagrer år som desimaltall fordi mengdene regnes ut av dem. «1,2 år»
 * er presist og ubrukelig; under to år er måneder det folk faktisk tenker i.
 */
function holdbarhet(ar) {
  if (!ar) return null
  if (ar < 2) {
    const md = Math.round(ar * 12)
    return `${md} måned${md === 1 ? '' : 'er'}`
  }
  return `${tall(Math.round(ar))} år`
}

const ikon = {
  ok: '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8.5 6.5 12 13 4.5"/></svg>',
  warn: '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2.5 15 14H1z"/><path d="M8 6.5v3.2"/><path d="M8 11.8v.6"/></svg>',
  info: '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6.5"/><path d="M8 7.2v4"/><path d="M8 4.6v.6"/></svg>',
}

export function startBygger(rot = document) {
  const skjema = $('#bygger', rot)
  if (!skjema) return

  byggValg(skjema)

  const slider = $('#husstand', skjema)
  const status = $('#pris-status', rot)
  let sistePakke = null

  function lesValg() {
    return {
      personer: klem(Number(slider.value)),
      matniva: $('input[name="matniva"]:checked', skjema)?.value,
      modus: $('input[name="modus"]:checked', skjema)?.value,
      eskeType: $('input[name="eskeType"]:checked', skjema)?.value,
      utelatt: $$('input[name="harfraFor"]:checked', skjema).map((i) => i.value),
      abonnement: $('#abonnement', skjema)?.checked
        ? $('input[name="pafyll"]:checked', skjema)?.value ?? PAFYLL[0]?.id
        : null,
    }
  }

  function tegn() {
    const pakke = byggPakke(lesValg())
    sistePakke = pakke
    tegnHusstand(rot, pakke)
    tegnSvar(rot, pakke)
    tegnMatnivaer(rot, pakke)
    tegnEskevalg(rot, pakke)
  tegnHarFraFor(rot, pakke)
    tegnPris(rot, pakke)
    tegnListe(rot, pakke)
    tegnVarsler(rot, pakke)
    oppdaterSlider(slider)
    // Skjermlesere får én samlet melding, ikke én per tastetrykk.
    if (status) {
      clearTimeout(status._t)
      status._t = setTimeout(() => {
        status.textContent =
          `${referanse(pakke)}. ${kr(pakke.abonnement ? pakke.sumMedAbonnement : pakke.sum)}.`
      }, 400)
    }
  }

  skjema.addEventListener('input', tegn)
  skjema.addEventListener('change', tegn)

  $$('[data-husstand-steg]', skjema).forEach((knapp) => {
    knapp.addEventListener('click', () => {
      slider.value = String(klem(Number(slider.value) + Number(knapp.dataset.husstandSteg)))
      tegn()
    })
  })

  const kjop = $('#legg-i-kurv', rot)
  if (kjop) {
    kjop.addEventListener('click', () => {
      if (!sistePakke) return
      kurv.leggTil(tilKurvpost(sistePakke))
      kjop.textContent = 'Lagt i kurven'
      setTimeout(() => { kjop.textContent = kjop.dataset.tekst }, 2000)
    })
    kjop.dataset.tekst = kjop.textContent
  }

  const kasse = kasseStatus()
  const kasseNotis = $('#kasse-notis', rot)
  if (kasseNotis && kasse.erFallback) {
    kasseNotis.hidden = false
  }

  tegn()
  return () => sistePakke
}

/** Bygger valgkortene fra katalogen, slik at HTML-en ikke dupliserer data. */
function byggValg(skjema) {
  const matRot = $('#matnivaer', skjema)
  if (matRot && !matRot.children.length) {
    matRot.innerHTML = MATNIVAER.map(
      (m, i) => `
      <label class="option">
        <input type="radio" name="matniva" value="${m.id}" ${i === 0 ? 'checked' : ''}
               aria-describedby="matniva-${m.id}-desc">
        <span class="option__body">
          <span class="option__title">${m.navn}</span>
          <p class="option__desc" id="matniva-${m.id}-desc">${m.beskrivelse}</p>
          <div class="holdbarhet" data-holdbarhet="${m.id}">
            <div class="holdbarhet__spor"><div class="holdbarhet__fyll"></div></div>
            <div class="holdbarhet__tekst">
              <span>Holdbarhet</span><span>${m.holdbarhetAr} år</span>
            </div>
          </div>
        </span>
      </label>`
    ).join('')
  }

  const modusRot = $('#moduser', skjema)
  if (modusRot && !modusRot.children.length) {
    modusRot.innerHTML = MODUSER.map(
      (m, i) => `
      <label class="option">
        <input type="radio" name="modus" value="${m.id}" ${i === 0 ? 'checked' : ''}
               aria-describedby="modus-${m.id}-desc">
        <span class="option__body">
          <span class="option__title">${m.navn}</span>
          <p class="option__desc" id="modus-${m.id}-desc">${m.beskrivelse}</p>
        </span>
      </label>`
    ).join('')
  }

  const eskeRot = $('#eskevalg', skjema)
  if (eskeRot && !eskeRot.children.length) {
    eskeRot.innerHTML = ESKETYPER.map(
      (e, i) => `
      <label class="option">
        <input type="radio" name="eskeType" value="${e.id}" ${i === 0 ? 'checked' : ''}
               aria-describedby="eske-${e.id}-desc">
        <span class="option__body">
          <span class="option__title">${e.navn} <span class="tnum" id="eske-${e.id}-pris"></span></span>
          <p class="option__desc" id="eske-${e.id}-desc">${e.beskrivelse}</p>
        </span>
      </label>`
    ).join('')
  }

  const pafyllRot = $('#pafyllsvalg', skjema)
  if (pafyllRot && !pafyllRot.children.length && PAFYLL.length) {
    pafyllRot.innerHTML = PAFYLL.map(
      (p, i) => `
      <label class="option">
        <input type="radio" name="pafyll" value="${p.id}" ${i === 0 ? 'checked' : ''}>
        <span class="option__body">
          <span class="option__title">${p.navn}</span>
          <p class="option__desc">${p.beskrivelse}</p>
        </span>
      </label>`
    ).join('')
  }
}

/** Fyller sliderens spor fram til håndtaket. */
function oppdaterSlider(slider) {
  const min = Number(slider.min || 1)
  const maks = Number(slider.max || 8)
  const andel = ((Number(slider.value) - min) / (maks - min)) * 100
  slider.style.setProperty('--fill', `${andel}%`)
}

function tegnHusstand(rot, pakke) {
  const el = $('#husstand-tall', rot)
  if (el) el.textContent = String(pakke.valg.personer)
  const etikett = $('#husstand-etikett', rot)
  if (etikett) etikett.textContent = pakke.valg.personer === 1 ? 'person' : 'personer'
}

function tegnSvar(rot, pakke) {
  const el = $('#svar', rot)
  if (!el) return
  const deler = []
  const mat = pakke.linjer.filter((l) => l.kcal > 0).reduce((n, l) => n + l.antall, 0)
  if (mat) deler.push(`<b>${tall(mat)}</b> matvarer`)
  if (pakke.liter) deler.push(`<b>${tall(pakke.liter)} liter</b> vannkapasitet`)
  if (pakke.eske) deler.push(`${pakke.eske.navn.toLowerCase().startsWith('nødboks') ? pakke.eske.navn.split('–')[1]?.trim() ?? 'esken' : 'esken'} på til sammen <b>${tall(pakke.vekt, 0)} kg</b>`)
  const kaldt =
    pakke.dognUtenVarme >= KONFIG.dogn
      ? `Hele uka kan spises kald hvis brennstoffet tar slutt.`
      : `Uten brennstoff rekker maten <b>${pakke.dognUtenVarme} døgn</b> – resten krever kokende vann.`
  el.innerHTML = `<p>Det gir ${deler.join(', ')} – nok til ${personer(pakke.valg.personer)}
    i ${KONFIG.dogn} døgn.</p><p style="margin-top:var(--sp-2)">${kaldt}</p>`
}

/** Holdbarhetslinjalen skalerer mot det lengstholdbare nivået i katalogen. */
function tegnMatnivaer(rot, pakke) {
  const maks = Math.max(...MATNIVAER.map((m) => m.holdbarhetAr))
  for (const m of MATNIVAER) {
    const fyll = $(`[data-holdbarhet="${m.id}"] .holdbarhet__fyll`, rot)
    if (fyll) fyll.style.width = `${Math.max(4, (m.holdbarhetAr / maks) * 100)}%`
  }
}

/** Viser hva hvert kassemateriale koster for den valgte husstanden. */
function tegnEskevalg(rot, pakke) {
  const steg = $('#eskevalg', rot)?.closest('.steg')
  if (steg) steg.hidden = !pakke.modus.medEske
  for (const type of ESKETYPER) {
    const merke = $(`#eske-${type.id}-pris`, rot)
    if (!merke) continue
    const eske = velgEske(pakke.valg.personer, type.id)
    merke.textContent = kr(eske.pris)
  }
}

/**
 * Utstyret kunden kan ha fra før.
 *
 * Listen bygges på nytt hver gang, fordi hvilket utstyr som er med avhenger av
 * modus og husstandsstørrelse. Avkrysningene holdes ved like over rendring, så
 * et hakk ikke forsvinner når kunden drar i slideren.
 */
function tegnHarFraFor(rot, pakke) {
  const el = $('#harfraFor', rot)
  if (!el) return
  const steg = el.closest('.steg')
  if (steg) steg.hidden = pakke.utstyrsvalg.length === 0

  const avkrysset = new Set(pakke.valg.utelatt)
  const signatur = pakke.utstyrsvalg.map((u) => `${u.sku}:${u.antall}:${u.sum}`).join('|')
  if (el.dataset.signatur !== signatur) {
    el.dataset.signatur = signatur
    el.innerHTML = pakke.utstyrsvalg
      .map(
        (u) => `
        <label class="harfor">
          <input type="checkbox" name="harfraFor" value="${u.sku}" ${avkrysset.has(u.sku) ? 'checked' : ''}>
          <span class="harfor__navn">${u.navn}</span>
          <span class="harfor__sum tnum">− ${kr(u.sum)}</span>
        </label>`
      )
      .join('')
  } else {
    for (const boks of $$('input[name="harfraFor"]', el)) {
      boks.checked = avkrysset.has(boks.value)
    }
  }

  const oppsummering = $('#harfraFor-sum', rot)
  if (oppsummering) {
    oppsummering.textContent = pakke.spartNetto
      ? `Du sparer ${kr(pakke.spartNetto)} på å ikke kjøpe det du allerede har.`
      : ''
  }
}

function tegnPris(rot, pakke) {
  const abo = Boolean(pakke.abonnement)
  const sum = abo ? pakke.sumMedAbonnement : pakke.sum

  const el = $('#pris-sum', rot)
  if (el) el.textContent = kr(sum)

  const enhet = $('#pris-enhet', rot)
  if (enhet) {
    enhet.textContent =
      `${kr(pakke.prisPerPersonPerDogn)} per person per døgn · ${personer(pakke.valg.personer)} · ${KONFIG.dogn} døgn`
  }

  const linjer = $('#pris-linjer', rot)
  if (linjer) {
    // Utstyret vises til full pris med fradraget som egen linje, ikke som et
    // lavere tall uten forklaring. Kunden skal se hva settet koster og hva de
    // slipper å betale for.
    const mat = pakke.linjer.filter((l) => MATGRUPPER.includes(l.kategori)).reduce((n, l) => n + l.sum, 0)
    const utstyr = pakke.sumVarer - mat + pakke.spart
    const rader = []
    if (mat) rader.push(['Mat og vann', mat])
    if (utstyr) rader.push([pakke.eske ? 'Utstyr og eske' : 'Utstyr', utstyr])
    if (pakke.spart) rader.push(['Utstyr du har fra før', -pakke.spart])
    if (pakke.pakkerabatt) rader.push(['Pakkerabatt', -pakke.pakkerabatt])
    if (pakke.abonnementsrabatt) rader.push([`Påfyllsrabatt`, -pakke.abonnementsrabatt])
    linjer.innerHTML =
      rader
        .map(([n, v]) => `<div class="prispanel__linje"><span>${n}</span><span>${kr(v)}</span></div>`)
        .join('') +
      `<div class="prispanel__linje prispanel__linje--sum"><span>Å betale</span><span>${kr(sum)}</span></div>`
  }

  // Momsoppdelingen står synlig. Mat har redusert sats, utstyr ordinær, og en
  // kunde som sammenligner to tilbud har krav på å se hvorfor de er ulike.
  // Beløpet kommer fra konfiguratoren, ikke fra en egen utregning her.
  const mva = $('#pris-mva', rot)
  if (mva) {
    mva.textContent = `Herav mva. ${kr(pakke.mva)} – 15 % på mat, 25 % på utstyr.`
  }

  /*
   * Vi lover ikke at det er billigere. Varene er priset til butikkpris, og det
   * står her framfor å bli antydet – en kunde som sjekker én pris og finner den
   * lik, skal finne at vi allerede har sagt det.
   */
  const egenkjop = $('#pris-egenkjop', rot)
  if (egenkjop) {
    egenkjop.textContent = pakke.modus.medEske
      ? 'Varene koster det samme som i butikk. Det du betaler for, er utvalget, riktige mengder og at noen holder styr på datoene.'
      : ''
  }

  const neste = $('#pris-neste', rot)
  if (neste) {
    neste.textContent = pakke.holdbarhetAr
      ? `Neste påfyll om rundt ${holdbarhet(pakke.holdbarhetAr)}.`
      : ''
  }
}

function tegnListe(rot, pakke) {
  const el = $('#innholdsliste', rot)
  if (!el) return
  const antall = pakke.linjer.reduce((n, l) => n + l.antall, 0)

  const teller = $('#innhold-teller', rot)
  if (teller) teller.textContent = `${tall(antall)} varer`

  el.innerHTML = pakke.grupper
    .map(
      (g) => `
      <section class="gruppe">
        <h3 class="gruppe__navn">${g.navn}</h3>
        ${g.varer
          .map(
            (v) => `
          <div class="vare">
            <span class="vare__navn">${v.navn}</span>
            <span class="vare__antall">${tall(v.antall)} ${v.enhet}</span>
            ${v.hvorfor ? `<p class="vare__hvorfor">${v.hvorfor}</p>` : ''}
            <div class="vare__merker">
              ${holdbarhet(v.holdbarhetAr) ? `<span class="badge">Holdbar ${holdbarhet(v.holdbarhetAr)}</span>` : ''}
              <span class="badge">${v.type === 'engang' ? 'Varer i mange år' : 'Går ut på dato'}</span>
            </div>
          </div>`
          )
          .join('')}
      </section>`
    )
    .join('')
}

function tegnVarsler(rot, pakke) {
  const el = $('#varsler', rot)
  if (!el) return
  el.innerHTML = pakke.varsler
    .map(
      (v) => `<div class="varsel varsel--${v.type === 'warn' ? 'warn' : 'info'}">
        ${ikon[v.type === 'warn' ? 'warn' : 'info']}<p>${v.tekst}</p></div>`
    )
    .join('')
}
