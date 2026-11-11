import type { MetadataRoute } from 'next'

import { DIFFERENTIEERREGELS_PAD } from '@/content/theory/differentieerregels'
import { EXAMENTRAINING_PAD } from '@/content/theory/examentraining'
import { EXTREME_WAARDEN_PAD } from '@/content/theory/extreme-waarden'
import { KETTINGREGEL_PAD } from '@/content/theory/kettingregel'
import { MACHTSREGEL_PAD } from '@/content/theory/machtsregel'
import { PRODUCTREGEL_PAD } from '@/content/theory/productregel'
import { QUOTIENTREGEL_PAD } from '@/content/theory/quotientregel'
import { RAAKLIJN_PAD } from '@/content/theory/raaklijn'
import { SOMREGEL_PAD } from '@/content/theory/somregel'
import { getVoorbeelden, voorbeeldPad } from '@/content/voorbeelden'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/seo'
import { getUitlegVideos, uitlegVideoPad } from '@/lib/videos'

// De pagina's staan in `src/app/[locale]`, dus hun echte adres begint met een
// taalcode. Zonder taalcode werkt het ook, maar via een doorverwijzing — en in
// een sitemap hoort het adres te staan waar de pagina zelf op antwoordt.
const TAAL = routing.defaultLocale

// Alleen pagina's die een zoekmachine mag bezoeken. De persoonlijke pagina's
// (en ook inloggen en registreren) staan in `robots.ts` op niet-bezoeken, dus
// die horen hier niet bij.
//
// `lastModified` is de datum van de laatste commit die de inhoud van die
// pagina echt veranderde (`git log -1 --format=%cI -- <bestand>`), niet
// `new Date()`: een datum van "nu" verandert bij elke opvraag, en dat
// vertrouwt een zoekmachine terecht niet. Verander je de inhoud van een
// pagina inhoudelijk, werk dan de datum hieronder bij.
const LASTMOD = {
  home: '2026-11-04',
  over: '2026-10-29',
  privacy: '2026-10-29',
  hoeHetWerkt: '2026-10-28',
  theorie: '2026-10-28',
  differentieerregels: '2026-10-28',
  kettingregel: '2026-10-28',
  productregel: '2026-10-28',
  quotientregel: '2026-10-28',
  somregel: '2026-10-28',
  machtsregel: '2026-10-28',
  raaklijn: '2026-10-28',
  extremeWaarden: '2026-10-28',
  examentraining: '2026-10-28',
  uitlegVideos: '2026-10-28',
  videoAanvragen: '2026-10-28',
  voorbeelden: '2026-10-28',
} as const

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/${TAAL}`,
      lastModified: LASTMOD.home,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/${TAAL}/over`,
      lastModified: LASTMOD.over,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/${TAAL}/privacy`,
      lastModified: LASTMOD.privacy,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/${TAAL}/hoe-het-werkt`,
      lastModified: LASTMOD.hoeHetWerkt,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/${TAAL}/theorie`,
      lastModified: LASTMOD.theorie,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/${TAAL}${DIFFERENTIEERREGELS_PAD}`,
      lastModified: LASTMOD.differentieerregels,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/${TAAL}${KETTINGREGEL_PAD}`,
      lastModified: LASTMOD.kettingregel,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/${TAAL}${PRODUCTREGEL_PAD}`,
      lastModified: LASTMOD.productregel,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/${TAAL}${QUOTIENTREGEL_PAD}`,
      lastModified: LASTMOD.quotientregel,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/${TAAL}${SOMREGEL_PAD}`,
      lastModified: LASTMOD.somregel,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/${TAAL}${MACHTSREGEL_PAD}`,
      lastModified: LASTMOD.machtsregel,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/${TAAL}${RAAKLIJN_PAD}`,
      lastModified: LASTMOD.raaklijn,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/${TAAL}${EXTREME_WAARDEN_PAD}`,
      lastModified: LASTMOD.extremeWaarden,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/${TAAL}${EXAMENTRAINING_PAD}`,
      lastModified: LASTMOD.examentraining,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/${TAAL}/uitleg-videos`,
      lastModified: LASTMOD.uitlegVideos,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/${TAAL}/video-aanvragen`,
      lastModified: LASTMOD.videoAanvragen,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...getUitlegVideos().map((video) => ({
      url: `${SITE_URL}/${TAAL}${uitlegVideoPad(video.slug)}`,
      lastModified: LASTMOD.uitlegVideos,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...getVoorbeelden().map((voorbeeld) => ({
      url: `${SITE_URL}/${TAAL}${voorbeeldPad(voorbeeld.slug)}`,
      lastModified: LASTMOD.voorbeelden,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
