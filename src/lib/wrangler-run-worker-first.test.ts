import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Zonder run_worker_first zou OpenNext's eigen asset-resolver een klaargezet
 * bestand dat op het pad past zelf teruggeven zodra de worker draait, los
 * van een zoekopdracht of sessiekoekje — de uitzonderingen in
 * src/lib/startpagina-snel.ts (anoniemeInloggenPagina,
 * anoniemeUitlegVideosPagina) zouden dan geen effect hebben (AFG-632,
 * AFG-635). Een pad met een zoekopdracht die de server iets anders moet
 * laten doen, hoort daarom in run_worker_first.
 */
function runWorkerFirst(bestand: string): string[] {
  const tekst = fs.readFileSync(path.join(process.cwd(), bestand), 'utf8')
  const match = /"run_worker_first":\s*\[([^\]]*)\]/.exec(tekst)
  if (!match) {
    throw new Error(`Geen run_worker_first gevonden in ${bestand}.`)
  }
  return [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
}

describe.each(['wrangler.jsonc'])(
  'run_worker_first in %s',
  (bestand) => {
    it('stuurt /nl/inloggen eerst naar de worker (?naar=, ?error=, ?mail=)', () => {
      const paden = runWorkerFirst(bestand)
      expect(paden).toContain('/nl/inloggen')
      expect(paden).toContain('/nl/inloggen/')
    })

    it('stuurt /nl/uitleg-videos eerst naar de worker (?video= stuurt oude links door)', () => {
      const paden = runWorkerFirst(bestand)
      expect(paden).toContain('/nl/uitleg-videos')
      expect(paden).toContain('/nl/uitleg-videos/')
    })
  },
)
