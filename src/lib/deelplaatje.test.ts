import { describe, expect, it } from 'vitest'

import { SITE_VARIANTEN } from '@/config/site'
import { DEELPLAATJE_MERK } from './deelplaatje'

describe('deelplaatje-merk', () => {
  it('heeft voor elke site eigen letters en een eigen tagline (WIS-48)', () => {
    // Zonder deze check zou het plaatje voor elke site hetzelfde (afgeleide)
    // merk kunnen tonen, zoals vóór deze reparatie: het logoblokje en de
    // regel onder de titel stonden hard gecodeerd op 'AO' en 'differentiëren'.
    expect(DEELPLAATJE_MERK.afgeleide).toEqual({
      letters: 'AO',
      tagline: 'Wiskunde B · differentiëren oefenen',
    })
    expect(DEELPLAATJE_MERK.wiskundemetaaf).toEqual({
      letters: 'WA',
      tagline: 'Wiskunde B · eindexamen oefenen',
    })
    expect(DEELPLAATJE_MERK.afgeleide).not.toEqual(DEELPLAATJE_MERK.wiskundemetaaf)
  })

  it('kent elke site een eigen merk toe', () => {
    for (const variant of SITE_VARIANTEN) {
      expect(DEELPLAATJE_MERK[variant]).toBeDefined()
    }
  })
})
