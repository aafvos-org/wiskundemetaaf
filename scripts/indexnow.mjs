/**
 * Meldt de openbare pagina's bij IndexNow (Bing, en via Bing ook Copilot en
 * ChatGPT-zoeken) na een merge naar `main`. Elke merge op `main` is meteen
 * live (zie AGENTS.md), dus dit is het moment om te melden dat er iets
 * veranderd kan zijn.
 *
 * De sleutel hieronder is geen geheim: IndexNow vraagt juist om hem publiek
 * op de site te zetten, als bewijs dat jij de eigenaar bent. Hij staat ook
 * in `public/<sleutel>.txt`. Wijzig je de sleutel, wijzig dan dat bestand
 * mee (en hernoem het).
 *
 *   node scripts/indexnow.mjs
 *
 * Haalt de live sitemap op en stuurt elk adres daaruit door. Lukt dat niet
 * (bijvoorbeeld omdat de bouw na de merge nog niet klaar is), dan stopt het
 * script met uitleg en afsluitcode 1 — dat mag de merge zelf niet laten
 * mislukken, dus de workflow laat dit nooit de build breken.
 */
const SITE_URL = 'https://www.wiskundemetaaf.nl'
const INDEXNOW_KEY = 'e5505c804fc785d9dc468a8bda28ca93'

async function haalSitemapAdressen() {
  const antwoord = await fetch(`${SITE_URL}/sitemap.xml`)
  if (!antwoord.ok) {
    throw new Error(`Sitemap ophalen gaf status ${antwoord.status}`)
  }
  const xml = await antwoord.text()
  const adressen = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
  if (adressen.length === 0) {
    throw new Error('Geen enkel adres gevonden in de sitemap.')
  }
  return adressen
}

async function meldBijIndexNow(urlList) {
  const antwoord = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  })
  // IndexNow geeft 200 of 202 bij een geslaagde melding.
  if (antwoord.status !== 200 && antwoord.status !== 202) {
    throw new Error(`IndexNow gaf status ${antwoord.status}: ${await antwoord.text()}`)
  }
}

try {
  const adressen = await haalSitemapAdressen()
  await meldBijIndexNow(adressen)
  console.log(`IndexNow gemeld: ${adressen.length} adressen.`)
} catch (err) {
  const fout = err instanceof Error ? err.message : String(err)
  console.error(`IndexNow-melding is niet gelukt: ${fout}`)
  process.exit(1)
}
