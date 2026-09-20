# Nødboks

Nettbutikk for ferdigpakkede beredskapsbokser til norske husstander, bygget på
DSBs anbefaling om sju døgns egenberedskap.

**Produksjon:** [nodboks.no](https://nodboks.no) · **Speil:** nødboks.no
(`xn--ndboks-bya.no`, satt opp som redirect)

## Hva dette er

En statisk side uten byggsteg. HTML, CSS og ES-moduler serveres direkte fra
GitHub Pages. Ingen `npm install`, ingen bundler, ingen CI-steg mellom `git push`
og publisert side.

Kjernen er **pakkebyggeren**: kunden drar i en slider for husstandsstørrelse
(1–8 personer), velger matnivå og modus, og ser innholdslisten og prisen endre
seg live. Alt regnes ut i nettleseren fra én datafil.

## Struktur

```
.
├── index.html                  Forside med pakkebyggeren
├── CNAME                       nodboks.no – GitHub Pages
├── .nojekyll                   Skru av Jekyll, slik at assets/ serveres som det er
├── assets/
│   ├── css/
│   │   ├── tokens.css          Farge, typografi, rom, bevegelse – ett sted
│   │   ├── base.css            Reset, layoutprimitiver, komponenter
│   │   └── app.css             Sidespesifikke seksjoner
│   ├── js/
│   │   ├── config.js           Plattformvalg og nøkler – ett sted
│   │   ├── data/katalog.js     Produktkatalogen – én datafil
│   │   ├── konfigurator.js     Regneregler for pakkene (ren logikk, uten DOM)
│   │   ├── kurv.js             Kurv i localStorage
│   │   ├── ui/                 Rendring
│   │   └── checkout/           Byttbart integrasjonslag
│   │       ├── index.js        Felles grensesnitt
│   │       └── adapters/       ingen · shopify · snipcart · stripe
│   └── img/                    Merke, ikoner, Open Graph
├── beredskap/                  Redaksjonelt innhold (SEO)
└── docs/                       Analyser og designspec
```

## Analysene

Prisene i konfiguratoren er ikke satt på slump – de følger av prisstrategien.
Endrer du et prispunkt, hører begrunnelsen hjemme i `docs/prisstrategi.md`.

| Dokument | Innhold |
| --- | --- |
| [`docs/konkurrentanalyse.md`](docs/konkurrentanalyse.md) | Det norske markedet: pris per husstandsstørrelse, pakkeinnhold, posisjonering, hull |
| [`docs/pakkesammensetning.md`](docs/pakkesammensetning.md) | Stykkliste per pakke og husstandsstørrelse, forankret i DSBs råd |
| [`docs/prisstrategi.md`](docs/prisstrategi.md) | Prispunkter, marginlogikk, gjenkjøp via påfyll, posisjonering |
| [`docs/designvalg.md`](docs/designvalg.md) | Designspec og begrunnelsen bak den |
| [`docs/design/`](docs/design/) | Designskisser – åpne HTML-filene direkte i nettleser |

## Utvikling

Ingen avhengigheter. Start en hvilken som helst statisk server i rota:

```bash
python3 -m http.server 8000
```

ES-moduler krever `http://`, ikke `file://`, så åpne
[localhost:8000](http://localhost:8000) framfor å dobbeltklikke `index.html`.

## Koble på nettbutikkplattform

Plattformen er ikke valgt ennå, så siden går i **e-postmodus**: kunden får en
ferdig utfylt bestilling på e-post, og du får reelle ordrer å teste
prisstrategien mot før du binder deg.

Når du skal bytte, endrer du kun `assets/js/config.js`:

```js
export const BUTIKK = {
  plattform: 'shopify',        // 'ingen' | 'shopify' | 'snipcart' | 'stripe'
  shopify: {
    domene: 'nodboks.myshopify.com',
    storefrontToken: '…',       // publikt Storefront-token
    variantKart: { 'boks-4': 'gid://shopify/ProductVariant/…' },
  },
}
```

| Plattform | Trenger | Abonnement |
| --- | --- | --- |
| `ingen` | ingenting | e-postavtale |
| `shopify` | Storefront-token + variant-ID per SKU | Shopify Subscriptions |
| `snipcart` | public API-key | innebygd |
| `stripe` | endepunkt som lager Checkout Session | Stripe Subscriptions |

Stripe kan ikke lage betalingssesjoner trygt fra en statisk side. Enten setter du
opp en liten funksjon på Vercel/Netlify/Cloudflare og peker
`stripe.checkoutEndpoint` dit, eller så bruker du ferdige Payment Links for faste
pakker. Hemmelige nøkler skal aldri inn i dette repoet.

## Publisering

`main` er ikke publiseringsbranch ennå. Sett GitHub Pages til å bygge fra rota
på den branchen du vil publisere, og legg inn `nodboks.no` som Custom domain –
`CNAME` i rota gjør resten.

DNS for de to domenene:

| Navn | Type | Verdi |
| --- | --- | --- |
| `nodboks.no` | A | GitHub Pages' fire IP-adresser |
| `www.nodboks.no` | CNAME | `<bruker>.github.io` |
| `xn--ndboks-bya.no` | – | redirect til `nodboks.no` hos registraren |

## Lisens og innhold

Innholdet bygger på DSBs offentlige råd om egenberedskap. Rådene er gjengitt
med kildehenvisning; Nødboks er ikke tilknyttet DSB.
