# Favicon-familie: afgeleide, integraal, wiskundemetaaf

Beslissing van Aaf (18-11, WIS-15): alle drie de sites blijven **groen**
(`#2d5a3d`), zoals ze er nu al uitzien. Afgeleide en integraal krijgen elk
hun **eigen letter** in de bestaande opzet (groen vlak, afgeronde hoeken
`rx=14` op een 64×64-raster, Georgia-achtige letter in crème `#f0ebe0`).
Wiskundemetaaf krijgt het vereenvoudigde **gezichtje**, ook in groen, in
plaats van een letter.

Niet meer **AO** naast **IO**: die schelen op 16 pixel alleen in de eerste
letter en zijn dan niet uit elkaar te houden. Gekozen is voor één grote
letter per site in plaats van twee kleine:

- **afgeleideoefenen.nl** — **A**
- **integraaloefenen.nl** — **I** (vet, anders valt de verticale streep weg
  op 16 pixel)
- **wiskundemetaaf.nl** — gezichtje (twee stipjes + een lach), geen letter

Geverifieerd op 16×16 en 64×64 (`docs/favicons/tabblad-16px-vergelijk.png`
is niet meegecommit, alleen de eindbestanden hieronder) — op 16 pixel blijven
alle drie duidelijk verschillend.

## Bestanden per site

Elke map bevat kant-en-klare bestanden, gegenereerd uit `favicon.svg` (de
bron) met `rsvg-convert` (png) en Pillow (ico, meerdere groottes 16/32/48):

```
docs/favicons/<site>/favicon.svg            bron, 64×64 viewBox
docs/favicons/<site>/favicon.png            512×512
docs/favicons/<site>/favicon.ico            16/32/48 in één bestand
docs/favicons/<site>/apple-touch-icon.png   180×180
```

Wijzig je de letter of het gezichtje later, pas dan `favicon.svg` aan en
genereer de rest opnieuw:

```bash
rsvg-convert -w 512 -h 512 favicon.svg -o favicon.png
rsvg-convert -w 180 -h 180 favicon.svg -o apple-touch-icon.png
python3 -c "
from PIL import Image
Image.open('favicon.png').convert('RGBA').save(
    'favicon.ico', format='ICO', sizes=[(16,16),(32,32),(48,48)]
)"
```

## Wat er nog moet gebeuren

Dit zijn **ontwerpbestanden**, nog niet in de site zelf verwerkt. Per site
een bouwticket (zie WIS-15):

- **afgeleideoefenen.nl** en **integraaloefenen.nl**: andere organisatie,
  dus via een "Doorzetten: …"-ticket (regelboek 2) naar Aaf.
- **wiskundemetaaf.nl**: rechtstreeks ticket aan de Ontwikkelaar hier, want
  dat is deze repo.

Bij alle drie: bestanden kopiëren naar `public/`, `icons.apple` toevoegen aan
de Next.js-metadata (nu alleen `icon`, geen `apple-touch-icon`), en nalopen
op een echte pagina met Playwright-schermafbeeldingen van het tabblad op
computer- en telefoonformaat — dat raakt `public/`, dus langs de Controleur
(regelboek 3).
