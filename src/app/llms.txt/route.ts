import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/seo'

// Voor chatbots en AI-crawlers die geen JavaScript uitvoeren: een korte,
// platte beschrijving van de site en de belangrijkste pagina's. Zie
// https://llmstxt.org/. Statisch gegenereerd, net als robots.ts en
// sitemap.ts — geen per-bezoeker data nodig.
export const dynamic = 'force-static'

const TAAL = routing.defaultLocale

export function GET() {
  const pad = (achtervoegsel = '') => `${SITE_URL}/${TAAL}${achtervoegsel}`

  const tekst = `# Wiskunde met Aaf

> Wiskunde met Aaf is een gratis oefensite voor het centraal examen vwo wiskunde B: echte eindexamenvragen met het antwoord uit het correctievoorschrift, uitleg bij elke stap en video's op aanvraag. Gemaakt door Aaf, docent wiskunde.

## Kernpagina's
- [Home](${pad()}): examenvragen oefenen, wanneer het examen is, een uitlegvideo aanvragen.
- [Theorie](${pad('/theorie')}): uitleg per onderwerp uit het boek, met voorbeelden.
- [Over Wiskunde met Aaf](${pad('/over')}): wie Aaf is en welke sites bij het merk horen.

## Zustersites en video's
- [afgeleideoefenen.nl](https://www.afgeleideoefenen.nl): differentiëren oefenen, regel voor regel.
- [integraaloefenen.nl](https://integraaloefenen.nl): primitiveren en integreren oefenen.
- [YouTube — @WiskundeMetAaf](https://www.youtube.com/@WiskundeMetAaf): video-uitleg bij wiskunde B.
`

  return new Response(tekst, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
