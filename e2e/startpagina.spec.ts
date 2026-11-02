import { expect, test } from '@playwright/test'

/**
 * De startpagina van wiskundemetaaf.nl (WIS-30). De YouTube-welkomstbanner
 * hoort alleen te verschijnen voor wie via `?van=youtube` binnenkomt, en
 * nergens anders — ook niet bij een gewoon bezoek aan dezelfde pagina.
 */
test('geen YouTube-welkom bij een gewoon bezoek aan de startpagina', async ({ page }) => {
  await page.goto('/nl')
  await expect(page.getByRole('heading', { name: /echte examenvragen/ })).toBeVisible()
  await expect(page.getByText('Kom je van YouTube?')).toBeHidden()
})

test('YouTube-welkom verschijnt met ?van=youtube en wijst naar de examenvragen', async ({
  page,
}) => {
  await page.goto('/nl?van=youtube')
  await expect(page.getByText('Kom je van YouTube? Oefen de som zelf — meteen nakijken.')).toBeVisible()

  await page.getByRole('link', { name: 'Probeer de som' }).click()
  // Zonder account stuurt /oefenen door naar inloggen; de banner wijst dus
  // naar dezelfde plek als de gewone CTA "Begin met examenvragen".
  await expect(page).toHaveURL(/\/nl\/inloggen/)
})
