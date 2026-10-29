# Indeling — wiskundemetaaf.nl voor alle niveaus en klassen

Vastgelegd na een brainstorm met Aaf op 29 oktober 2026 (ticket WIS-1). Dit
bestand beschrijft **de indeling**, niet de inhoud: geen opgaven, voorbeelden
of theorietekst uit Getal & Ruimte zelf (regelboek 8). Hoofdstuk- en
paragraafnamen hieronder zijn werktitels, geen letterlijke titels uit het
boek — die controleren of navragen we per hoofdstuk apart als het zover is.

## Richting

wiskundemetaaf.nl krijgt twee delen naast elkaar:

1. **Oefenen** (werktitel) — maakt de volledige structuur van Getal & Ruimte
   12e editie na: alle niveaus (vmbo-t, havo, vwo) en alle klassen (1 t/m 6),
   met per hoofdstuk de paragrafen, en per paragraaf de bijbehorende theorie
   en oefensommen. Voor wie extra wil oefenen of extra uitleg wil, los van
   het examenjaar.
2. **Examen** — het huidige wiskundemetaaf.nl blijft bestaan zoals het is:
   echte examenvragen, examenstijl-oefenvragen (H16) en de zeven
   examen-vraagsoorten. Specifiek voor eindexamenklassen.

**afgeleideoefenen.nl en integraaloefenen.nl blijven los bestaan**, met
kruislinks zoals nu vanaf wiskundemetaaf.nl ("liever oefenen per
onderwerp?"). Ze gaan niet op in wiskundemetaaf.nl. Dat geldt zeker voor
integraaloefenen.nl, dat sinds 9 oktober 2026 een eigen database heeft
(migratie `0034_restanten_gedeelde_database.sql`) — dat weer samenvoegen is
een aparte, grote stap die hier niet aan de orde is.

## Navigatiepad in "Oefenen"

```
niveau (eenmalig, wisselbaar)
  → klas (eenmalig, wisselbaar)
    → hoofdstuk (boekvolgorde)
      → paragraaf
        → theorie (precies één theorieblok per paragraaf, altijd)
        → oefenen (de soorten sommen van die paragraaf)
```

- **Niveau en klas** worden na het kiezen opgeslagen in het profiel (een
  "schoolpas"), met een wisselknop in de koptekst. Niet elke keer opnieuw
  kiezen. `profiles` heeft al een `klas`-kolom; niveau komt erbij.
- **Theorie volgt het boek strikt**: altijd precies één theorieblok per
  paragraaf, ook als dat een klein blokje is. Nooit twee paragrafen
  samenvoegen tot één theorieblok — dat is waarom "ik zit in §4.2" moet
  blijven kloppen.
- Een hoofdstuk zonder boekparagrafen (zoals nu "Beweging") houdt zijn eigen
  indeling met onderwerpen direct eronder — dat bestaat al en verandert niet.

Dit navigatiepad bouwt voort op wat er al in de code zit
(`src/lib/practice/oefenen-indeling.ts`): hoofdstuk → paragraaf →
theorieblok → onderwerp → soort som. Nieuw zijn vooral de niveau/klas-stap
ervoor, en dat hoofdstukken nu per niveau/klas bestaan in plaats van alleen
voor vwo B.

## Variant die afviel

Overwogen maar afgeraden: **één doorlopende leerlijn per vak-onderwerp**
(zoals nu bij afgeleideoefenen.nl), met niveau/klas als filterknop in plaats
van een aparte stap. Dat is sneller voor een site met één onderwerp, maar
een leerling herkent dan niet meer "ik zit in H4 van mijn boek" — precies
wat Aaf wil. Niet gekozen.

## Bouwvolgorde (voorstel)

Zie het "Beslissing"-ticket bij WIS-1 voor de voorgestelde volgorde waarin
dit gebouwd wordt, en voor de open punten die de Ontwikkelaar per stap moet
oplossen (zoals hergebruik van de bestaande afgeleide-inhoud voor het
hoofdstuk "Afgeleide functies").
