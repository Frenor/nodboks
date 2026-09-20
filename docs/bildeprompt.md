# Prompt til bildegenerering

Til bruk hos en modell som kan generere bilder. Skrevet for å kunne limes rett
inn. Palett og produkter er hentet fra `assets/css/tokens.css` og
`assets/js/data/katalog.js`, så bildene ikke driver fra resten av siden.

---

## Først: to bilder, ikke ett

Heroen skal si premisset — **utstyr du bruker på tur** — og premisset vises
best av utstyr i bruk. Produktet vises best av innholdet lagt ut. Det er to
jobber, og ett bilde gjør begge dårlig.

| | Hva | Hvor |
| --- | --- | --- |
| **Bilde 1** | Utstyret i bruk, på tur | Heroen |
| **Bilde 2** | Innholdet lagt ut, ovenfra | Seksjonen «Dette ligger i esken» |

Bilde 2 er dessuten det som **senere skal bli dynamisk** og skalere med antall
voksne, barn og kjæledyr. Et generert rasterbilde kan ikke gjøre det. Regn
derfor bilde 2 som midlertidig, og bruk det til å bestemme hvordan den tegnede
versjonen skal se ut — ikke som noe som skal ligge der for alltid.

---

## Lys og mørk modus

Siden har to fargemodi som begge er designet, ikke invertert. Et bilde med
hardkodet bakgrunn vil se feil ut i én av dem.

**Be om bildet med gjennomsiktig bakgrunn (PNG med alfakanal) der det er mulig.**
Er det ikke mulig, be om to varianter:

- **Lys modus:** bakgrunn `#F1F4F1` — kjølig, svakt grønnlig off-white
- **Mørk modus:** bakgrunn `#0B1513` — nesten svart, grønn underton

---

## Bilde 1 — heroen

> Premium produktfotografi til en norsk nettbutikk som selger
> beredskapsutstyr av høy kvalitet.
>
> **Motiv:** En voksen og et barn på ti år sitter på en svaberg­knaus ved sjøen
> i Norge, sen ettermiddag i september. De koker vann på et Trangia
> stormkjøkken i aluminium. Barnet holder en hodelykt i hånda og ser på den,
> ikke på kamera. En 10-liters vannkanne i gjennomsiktig plast står ved siden
> av. Rolig, hverdagslig, ingen dramatikk.
>
> **Lys:** Lavt, varmt sidelys fra en sol som er på vei ned. Lange myke
> skygger. Ingen kontrastfylt motlys, ingen linseflare.
>
> **Farger:** Dempet og kjølig palett — grågrønn stein, mørk sjø, gråhvit
> himmel. Det eneste varme i bildet er sollyset og flammen. Unngå mettede
> farger i klærne; ull og bomull i naturtoner, ingen logoer.
>
> **Komposisjon:** Vidformat 16:9. Menneskene og utstyret i høyre tredjedel.
> Venstre halvdel er rolig bakgrunn med plass til overskrift. Kamera i
> øyehøyde med de sittende, ikke ovenfra.
>
> **Stil:** Redaksjonelt dokumentarisk. Naturlig dybdeskarphet, ikke
> utvisket bakgrunn. Filmisk, men ikke etterbehandlet. Som et bilde fra en
> norsk turreportasje, ikke fra et reklamebyrå.
>
> **Unngå:** kamuflasje, taktisk utstyr, militære referanser, gassmasker,
> mørke skyer, ansikter i bekymring, dommedagsstemning, amerikansk
> «prepper»-estetikk, oransje og svart som fargepar, synlige merkelogoer,
> tekst i bildet, vannmerker.

### Variant med mørk stemning

Trenger du en versjon til mørk modus, be om samme motiv **én time senere**:
skumring, lyset fra hodelykten og primusen er de eneste lyskildene, himmelen er
dyp blågrønn. Ikke be om «natt» — da blir det dramatisk. Be om **blåtimen**.

---

## Bilde 2 — innholdet lagt ut

> Premium produktfotografi ovenfra (knolling / flat lay) av innholdet i en
> norsk beredskapspakke.
>
> **Motiv:** Utstyret lagt ut i et stramt rutenett på en flate i lys,
> kjølig grå-grønn tone. Innholdet: fire hodelykter, et Trangia
> stormkjøkken med kjeler, en liten DAB-radio, en powerbank, et vannfilter,
> et multiverktøy, en rød førstehjelpspose, en CO-varsler, åtte
> gjennomsiktige 10-liters vannkanner, stearinlys og fyrstikker, og
> matvarer i enkle bokser og pakker uten lesbare etiketter.
>
> **Ordning:** Alt ligger rett, parallelt, med lik avstand. Ingen gjenstander
> overlapper. Ryddig og systematisk, som en teknisk illustrasjon — ikke
> tilfeldig strødd.
>
> **Lys:** Mykt, jevnt, diffust ovenfra. Nesten ingen skygger. Ingen refleks
> i metall eller plast.
>
> **Komposisjon:** Kvadratisk eller 4:3, rett ovenfra, ingen perspektiv­
> forvrengning. Jevn marg rundt hele oppstillingen.
>
> **Farger:** Dempet. Naturlige materialer — aluminium, sort gummi,
> gjennomsiktig plast, ubleket papp. Én rød gjenstand (førstehjelpsposen) som
> eneste fargeaksent.
>
> **Unngå:** lesbar tekst og logoer på emballasjen, våpen, kniver med lange
> blad, kamuflasje, militært utstyr, hermetikk med amerikanske etiketter,
> pistoler, ammunisjon, gassmasker, tekst i bildet.

---

## Når bildet kommer tilbake

Sjekk tre ting før det legges inn. De to første er tillitsspørsmål, ikke
smakssaker:

1. **Viser bildet noe vi ikke selger?** Et kniv- eller våpenlignende objekt,
   en gassboks, en type mat vi ikke har. Da er bildet en påstand vi ikke
   innfrir, og det er nøyaktig det vi kritiserer konkurrentene for.
2. **Er antallet riktig?** Fire hodelykter til en familie på fire. Viser bildet
   én, motsier det vårt eget hovedargument om at utstyret skalerer.
3. **Leser det som prepper?** Hvis førsteinntrykket er «overlevelse» framfor
   «tur», er det feil bilde uansett hvor pent det er.

## Filformat og plassering

- **Format:** WebP hvis mulig, ellers JPEG. PNG bare hvis du trenger
  gjennomsiktig bakgrunn.
- **Bredde:** 2400 px for heroen, 1600 px for flat lay. Begge under 300 kB
  etter komprimering — siden har ingen byggsteg, så ingen optimaliserer dem
  for deg.
- **Legges i:** `assets/img/`
- Si fra når filen ligger der, så kobles den inn med riktig
  `srcset`, `width`, `height` og `loading`-attributt, slik at den ikke
  ødelegger LCP-en vi har holdt nede ved å droppe webfonter.
