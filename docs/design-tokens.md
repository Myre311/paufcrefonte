# Design tokens — Pau FC refonte

## Palette

| Token           | Hex       | Usage strict                                                         |
|-----------------|-----------|----------------------------------------------------------------------|
| `pau-night`     | `#04091D` | Header, footer, fond boutique, toute surface sombre principale       |
| `pau-primary`   | `#1A1D38` | Cards, surfaces secondaires, fond modal, identité club               |
| `pau-yellow`    | `#FFCC00` | CTA primaires, accents, badges actifs, hover states                  |
| `pau-gold`      | `#CBA74D` | PARTENAIRES UNIQUEMENT — sponsors, logos partenaires, section dédiée |
| `pau-white`     | `#FFFFFF` | Fonds clairs, texte sur fonds sombres, lisibilité                    |

### Opacités autorisées (white uniquement)

- `white/80` — texte secondaire, labels
- `white/60` — texte tertiaire, meta, timestamps
- `white/40` — placeholders, texte désactivé
- `white/10` — borders subtiles, séparateurs

### Couleurs hors palette

- `red-500` (Tailwind natif) — erreurs form, états destructifs uniquement
- Aucune autre couleur n'est autorisée

### Interdits absolus

- `pau-gold` en dehors de la section partenaires — jamais sur nav, jamais sur CTA, jamais sur texte courant
- Gradients décoratifs sur les fonds principaux
- Shadows décoratives gratuites (box-shadow uniquement si fonctionnel : dropdown, modal)
- Toute couleur non listée ci-dessus


## Typographie

### Familles

| Rôle      | Famille       | Variable CSS       | Poids         |
|-----------|---------------|--------------------|---------------|
| Display   | Archivo Black | `--font-display`   | 400 (seul)    |
| Body      | Inter         | `--font-sans`      | 400 500 600 700 |

Via `next/font/google` — pas de CDN externe, pas de `@import`.

### Pairing

- H1, H2 : `font-display uppercase tracking-tight`
- H3, H4 : `font-sans font-700 uppercase tracking-wide`
- Body, labels, nav : `font-sans`
- Stat, prix, score : `font-display tabular-nums`

### Echelle de types (major third — 1.25x)

| Nom   | Classe Tailwind | Rendu approx. |
|-------|-----------------|---------------|
| 2xl   | `text-5xl`      | 48px — H1 hero |
| xl    | `text-4xl`      | 36px — H1 page |
| lg    | `text-2xl`      | 24px — H2      |
| md    | `text-xl`       | 20px — H3      |
| base  | `text-base`     | 16px — body    |
| sm    | `text-sm`       | 14px — meta    |

Line-height : `leading-tight` (1.25) pour display, `leading-relaxed` (1.625) pour body.


## Espacement (grille 8px)

| Nom       | Valeur | Usage                              |
|-----------|--------|------------------------------------|
| `space-2` | 8px    | Gap interne card, icône + label    |
| `space-4` | 16px   | Padding card, gap inline           |
| `space-6` | 24px   | Gap entre éléments de liste        |
| `space-8` | 32px   | Padding section mobile             |
| `space-12`| 48px   | Gap entre blocs                    |
| `space-24`| 96px   | Padding section vertical           |
| `space-32`| 128px  | Padding section hero               |

### Section rhythm

```
py-24 md:py-32
```

### Container

```
max-w-7xl mx-auto px-6 md:px-8
```


## Grille

- 12 colonnes sur desktop, 4 sur mobile
- Gap : `gap-6` (24px) standard, `gap-8` (32px) pour sections
- Breakpoints Tailwind natifs : `sm` 640 / `md` 768 / `lg` 1024 / `xl` 1280 / `2xl` 1536


## Motion

Déclarés dans `globals.css` :

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--duration-base: 240ms;
```

| Token         | Valeur   | Usage                                  |
|---------------|----------|----------------------------------------|
| instant       | 0ms      | Changements d'état sans feedback visuel|
| quick         | 120ms    | Hover, focus, petits états             |
| base          | 240ms    | Transitions standard (défaut)          |
| slow          | 400ms    | Entrées de page, modals                |
| ease-out-expo | voir CSS | Toutes les transitions de déplacement  |

L'animation `marquee` (28s linear infinite) est déclarée dans `tailwind.config.js` — utilisée pour le bandeau partenaires / sponsors.

`prefers-reduced-motion` : toutes les animations sont désactivées via reset global dans `globals.css`.


## Composants — inventaire

### Atoms
- `Button` — variantes : primary (jaune), ghost (white/10), destructive (red-500)
- `Badge` — statut match, catégorie article
- `Input`, `Textarea`, `Select` — formulaires, fond pau-primary, border white/10
- `Avatar` — photo joueur, initiales fallback
- `Logo` — SVG club, variante light/dark

### Molecules
- `NavLink` — avec état actif (jaune), underline animated
- `Card` — fond pau-primary, hover lift subtil
- `ScoreBlock` — affichage score match, font-display
- `MatchRow` — date + adversaire + score inline
- `ArticleCard` — image + titre + meta
- `SponsorLogo` — UNIQUEMENT sur section partenaires, peut utiliser pau-gold
- `Toast` — via sonner, richColors

### Organisms
- `Header` — fond pau-night, logo gauche, nav centre, CTA droite
- `Hero` — plein écran, photo/vidéo bg, overlay sombre, titre H1 display
- `MatchesBand` — bandeau prochain match / résultats
- `NewsGrid` — grille articles, 3 col desktop
- `StandingsTable` — classement championnat
- `SquadGrid` — grille joueurs
- `PartnersSection` — SEULE section autorisant pau-gold
- `Footer` — fond pau-night, colonnes liens, logos partenaires bas

### Disponibilité

shadcn/ui couvre : Button, Input, Textarea, Select, Avatar, Toast (remplacé par sonner), Badge.
Tout le reste : custom.


## Don'ts visuels

- Pas d'emoji dans l'UI
- Pas de gradient fancy sur les fonds principaux (overlay sombre uniforme sur hero : `bg-pau-night/60`)
- Pas de shadow décorative gratuite
- `pau-gold` est sacré : partenaires uniquement, jamais ailleurs
- `pau-yellow` n'est pas du texte courant : CTA et accents seulement
- Pas de border-radius excessif : `rounded` (4px) ou `rounded-lg` (8px) max sur cards
- Pas de typographie mixte dans un même bloc : display OU sans, pas les deux
