# Pau FC — Architecture

Refonte complète du site officiel Pau FC. Stack : Next.js 14 App Router (JS pur, pas de TypeScript), Prisma + Postgres (Supabase), Tailwind, R3F + drei pour le configurateur 3D, Stripe pour les paiements, Supabase Storage pour les médias.

Source de vérité : `prisma/schema.prisma` (24 modèles).

---

## 1. Sitemap complet

### Public — `app/(public)/`

| Route | Fichier | Intent | Source data |
|---|---|---|---|
| `/` | `app/(public)/page.js` | Accueil club, match à venir, news, teasers boutique/billetterie | Match, Article, Product, Partner |
| `/billetterie` | `app/(public)/billetterie/page.js` | Vue d'ensemble billetterie matchs domicile + lien externe | Match (filtré isHome) |
| `/billetterie/abonnements` | `app/(public)/billetterie/abonnements/page.js` | Présentation des formules abonnement saison | static |
| `/billetterie/cashless` | `app/(public)/billetterie/cashless/page.js` | Explication système cashless stade | static |
| `/boutique` | `app/(public)/boutique/page.js` | Index produits actifs, filtres catégories | Product, Category |
| `/boutique/[slug]` | `app/(public)/boutique/[slug]/page.js` | Fiche produit, sélection variante, ajout panier | Product, ProductVariant, StockItem |
| `/boutique/categorie/[slug]` | `app/(public)/boutique/categorie/[slug]/page.js` | Liste produits filtrés par catégorie | Category, Product |
| `/boutique/personnalisation` | `app/(public)/boutique/personnalisation/page.js` | Configurateur maillot 3D R3F | Product (maillot officiel), JerseyCustomization |
| `/calendrier` | `app/(public)/calendrier/page.js` | Tous les matchs saison, groupés par mois | Match |
| `/equipe` | `app/(public)/equipe/page.js` | Effectif pro groupé par poste | Player (active=true) |
| `/equipe/[slug]` | `app/(public)/equipe/[slug]/page.js` | Fiche joueur + stats saison | Player, PlayerStats |
| `/actualites` | `app/(public)/actualites/page.js` | Liste articles paginée par catégorie | Article |
| `/actualites/[slug]` | `app/(public)/actualites/[slug]/page.js` | Article complet + commentaires modérés | Article, Comment |
| `/club` | `app/(public)/club/page.js` | Présentation institutionnelle | static |
| `/club/histoire` | `app/(public)/club/histoire/page.js` | Frise historique club | static |
| `/club/staff` | `app/(public)/club/staff/page.js` | Staff sportif et dirigeants | Player (role=staff/coach) |
| `/club/nouste-camp` | `app/(public)/club/nouste-camp/page.js` | Présentation stade | static |
| `/partenaires` | `app/(public)/partenaires/page.js` | Annuaire partenaires (charte dorée `#CBA74D`) | Partner |
| `/contact` | `app/(public)/contact/page.js` | Formulaire contact + coordonnées | static + POST |
| `/presse` | `app/(public)/presse/page.js` | Espace presse, accréditations | static |
| `/galerie` | `app/(public)/galerie/page.js` | Grille photos avec filtre catégorie | Gallery |
| `/videos` | `app/(public)/videos/page.js` | Grille vidéos avec filtre catégorie | Video |
| `/panier` | `app/(public)/panier/page.js` | Récap panier client (CartReservation) | CartReservation, ProductVariant |
| `/checkout` | `app/(public)/checkout/page.js` | Saisie adresses, redirection Stripe Checkout | User, Address, Order |
| `/checkout/success` | `app/(public)/checkout/success/page.js` | Confirmation post-paiement | Order |
| `/newsletter/confirm/[token]` | `app/(public)/newsletter/confirm/[token]/page.js` | Validation double opt-in | NewsletterSubscriber |
| `/cgv`, `/cgv-billetterie`, `/mentions-legales`, `/rgpd`, `/cookies` | `app/(public)/.../page.js` | Pages légales | static |

### Auth — `app/(auth)/`

| Route | Intent |
|---|---|
| `/connexion` | Login email + mot de passe (Supabase Auth) |
| `/inscription` | Création compte client |
| `/mot-de-passe-oublie` | Demande lien de reset |
| `/reinitialiser-mot-de-passe` | Saisie nouveau mot de passe (token) |

### Compte — `app/compte/` (auth required)

| Route | Intent | Source |
|---|---|---|
| `/compte` | Tableau de bord client (dernières commandes, billets) | User, Order |
| `/compte/commandes` | Historique commandes | Order, OrderItem |
| `/compte/billets` | Billets dématérialisés | (futur) |
| `/compte/profil` | Coordonnées, adresses, mot de passe | User, Address |
| `/compte/abonnements` | Abonnement saison + newsletter | NewsletterSubscriber |
| `/compte/favoris` | Produits favoris | Favorite, Product |

### Admin — `app/admin/` (middleware role check : admin / staff_*)

| Route | Intent | Source |
|---|---|---|
| `/admin` | KPIs ventes (jour/semaine/mois), alertes stock, commandes en attente | Order, StockItem, StockMovement |
| `/admin/produits` | Liste produits + recherche | Product |
| `/admin/produits/nouveau` | Création produit + variantes | Product, ProductVariant |
| `/admin/produits/[id]` | Édition produit, galerie, variantes, stock | Product, ProductVariant, StockItem |
| `/admin/produits/categories` | Gestion catégories et ordre | Category |
| `/admin/commandes` | Liste commandes, filtres status | Order |
| `/admin/commandes/[number]` | Détail commande, changement statut, remboursement | Order, OrderItem |
| `/admin/codes-promo` | CRUD coupons | Coupon |
| `/admin/stock` | Vue mutualisée tous variantes (onHand, reserved, lowStock) | StockItem |
| `/admin/stock/mouvements` | Journal append-only des mouvements | StockMovement |
| `/admin/pos` | Interface caisse simplifiée tactile | ProductVariant, StockItem |
| `/admin/pos/sessions` | Historique sessions caisse + Z journalier | Order (channel=pos) |
| `/admin/personnalisations` | Commandes maillot custom à floquer | JerseyCustomization, OrderItem |
| `/admin/matchs` | CRUD matchs et événements | Match, MatchEvent |
| `/admin/joueurs` | CRUD joueurs et stats | Player, PlayerStats |
| `/admin/actualites` | CRUD articles, modération commentaires | Article, Comment |
| `/admin/clients` | Liste clients, recherche | User |
| `/admin/clients/[id]` | Fiche client, commandes, segments | User, Order, NewsletterSubscriber |
| `/admin/newsletter` | Abonnés, filtres, export CSV | NewsletterSubscriber |
| `/admin/marketing` | Campagnes (stub) + segments | NewsletterSubscriber |
| `/admin/contenus` | Pages statiques éditables (CMS léger) | static / future Content table |
| `/admin/partenaires` | CRUD partenaires par tier | Partner |
| `/admin/galerie` | CRUD galerie photos | Gallery |
| `/admin/videos` | CRUD vidéos | Video |
| `/admin/parametres` | Paramètres généraux site | static / env |
| `/admin/tools` | Outils (réindexation, purge cache) | services internes |
| `/admin/exports` | Exports CSV (commandes, clients, stock) | services internes |

**Total : 67 routes** (29 public + 4 auth + 6 compte + 28 admin).

---

## 2. Sections homepage (ordre)

1. **Hero** — visuel ou vidéo bg, titre club, CTA billetterie. Slider rotatif optionnel (3 slides max). Source : config statique.
2. **MatchFeatured** — prochain match en grand : compétition, date, lieu, adversaire, CTA billetterie. Si match en cours : score live. Source : `Match` (prochain `scheduled` ou `live`).
3. **NewsListing** — grille 3 colonnes des 6 derniers articles publiés, featured en avant. Source : `Article` (publishedAt desc).
4. **BoutiqueTeaser** — bandeau fullbleed avec 4 produits featured et CTA `/boutique`. Source : `Product` (featured=true, status=active).
5. **BilletterieTeaser** — block dual CTA : matchs domicile + abonnements. Source : `Match` (next 3 isHome).
6. **PersonnalisationTeaser** — bandeau dédié configurateur maillot 3D, CTA `/boutique/personnalisation`. Static.
7. **PartnersTiers** — 3 tiers (`premium`, `officiel`, `local`) avec logos monochromes. Couleur `#CBA74D` réservée à cette section. Source : `Partner` (active=true, ordonné par tier+position).
8. **NewsletterInline** — input email centré + segments cochables, opt-in RGPD. POST `/api/newsletter`. Source : aucune (form).

---

## 3. Section inventory autres pages

- **`/billetterie`** : hero court, liste prochains matchs domicile (cards), bloc abonnements, bloc cashless, FAQ.
- **`/boutique`** : hero, filtres catégories sticky, grille produits, pagination.
- **`/calendrier`** : header saison, filtres compétition, liste matchs groupés par mois, légende statuts.
- **`/equipe`** : header, sections par poste (gardiens, défenseurs, milieux, attaquants), grille `PlayerCard`.
- **`/equipe/[slug]`** : photo plein cadre, identité, stats saison (PlayerStats), bio, derniers matchs.
- **`/actualites`** : hero, filtres catégorie, grille articles, pagination.
- **`/actualites/[slug]`** : titre, cover, body, partage, articles liés, commentaires modérés.
- **`/club`** : intro club, blocs renvoyant vers histoire/staff/stade, chiffres clés.
- **`/partenaires`** : intro, sections par tier (`premium`, `officiel`, `local`), accents `#CBA74D` exclusivement ici.
- **`/contact`** : coordonnées + carte (placeholder) + formulaire.

---

## 4. Stock mutualisé + POS

**Modèle**

- `StockItem` (1-1 avec `ProductVariant`) : `onHand` (stock physique), `reserved` (paniers actifs TTL 15 min), `lowStock` (seuil alerte).
- `StockMovement` (journal append-only) : `type` enum (`restock`, `sale_online`, `sale_pos`, `return_online`, `return_pos`, `adjustment`, `reservation`, `release`), `quantity` signée, `source` (terminal id, order id, admin id), `sourceRef`.
- `CartReservation` : maintient `reserved` côté `StockItem`, expire à 15 min, cron de cleanup.

**Service unique `lib/stock.js`** (côté serveur) :
- `applyMovement({ variantId, type, quantity, source, sourceRef })` — transaction Prisma : crée `StockMovement` + recalcule projection `StockItem.onHand`.
- `reserve(variantId, qty, sessionId)` / `release(...)` — crée/retire `CartReservation`, ajuste `reserved`.
- Toute mutation passe par ce service. Pas d'écriture directe sur `onHand`.

**POS (`/admin/pos`)**
- Interface caisse plein écran tactile : `PosProductSearch` (par nom ou SKU), scan barcode placeholder (input focus), `PosCart` (lignes ticket modifiables), `PosPaymentSheet` (espèces / CB).
- Validation : crée `Order` avec `couponCode?` snapshot, items snapshotés, puis pour chaque ligne `applyMovement({ type: 'sale_pos', quantity: -qty, source: 'pos:terminal-1', sourceRef: order.id })`.
- Pas d'intégration externe : tout interne. Le SKU partagé garantit cohérence boutique en ligne / physique.
- Sessions caisse : agrégation simple par jour à partir de `Order` filtré sur `source` POS.

> Note : le schéma actuel ne possède pas de champ `channel` sur `Order`. La distinction POS / online se fait via le préfixe de `OrderItem`/`StockMovement.source` (`pos:*` vs `web:*`). À formaliser plus tard si besoin (champ `channel` ou table `PosSession`).

---

## 5. Configurateur maillot 3D

- Page `/boutique/personnalisation` — composant client `JerseyScene3D` (R3F + drei).
- Modèle GLTF chargé depuis `/public/models/jersey.glb`. Si absent au build, fallback géométrie `<mesh>` cube/sphère stylisée pour démo (zéro crash).
- Champs `CustomizationForm` :
  - **Nom** : input contrôlé, max 12 caractères, uppercase auto.
  - **Numéro** : 1 à 99.
  - **Couleur** : 3 options (`domicile` bleu `#1A1D38`, `extérieur` blanc, `third` doré `#CBA74D`).
  - **Taille** : S, M, L, XL, XXL.
  - **Police** : `club`, `stadium`, `vintage` (champ `font` du modèle Prisma).
- Preview : auto-rotation, drag-to-rotate (OrbitControls limited), bouton snapshot (toBlob → upload Supabase Storage → `JerseyCustomization.previewUrl`).
- Texte appliqué via texture canvas dynamique (pas de bibliothèque externe) sur material du maillot.
- Ajout au panier :
  1. POST `/api/customizations` → crée `JerseyCustomization`.
  2. Client ajoute ligne panier référence `customizationId` + `variantId` (taille + couleur).
  3. À la commande, `OrderItem.customizationId` lie la perso (relation 1-1 unique).

---

## 6. Newsletter (double opt-in)

- Inputs : footer site, section home `NewsletterInline`, optionnel checkbox checkout.
- POST `/api/newsletter` → upsert `NewsletterSubscriber` (email unique), `confirmedAt = null`, `source` = origine, segments par défaut `[all]`.
- Email confirmation : stub `lib/mailer.js` qui `console.log` token signé en démo (à brancher Resend/Postmark plus tard).
- `/newsletter/confirm/[token]` : vérifie token, set `confirmedAt = now()`.
- Désabonnement : lien `/newsletter/unsubscribe/[token]` set `unsubscribedAt`.
- `/admin/newsletter` : liste, filtre `confirmedAt != null`, segments, export CSV streamé.

---

## 7. Component inventory

**Layout** : `Header` (sticky, logo gauche, nav, CTA billetterie + panier badge), `Footer` (4 niveaux : club, billetterie/boutique, partenaires tiers `#CBA74D`, légal), `MobileNav`, `CartDrawer`.

**Marketing** : `SectionTitle`, `Eyebrow`, `Reveal` (scroll fade subtil), `Container`, `Button` (primary jaune, ghost, link).

**Cards** : `ProductCard`, `MatchCard` (variants compact / featured), `PlayerCard`, `ArticleCard`, `PartnerCard` (variant tier), `GalleryCard`, `VideoCard`.

**Sections home** : `Hero`, `MatchFeatured`, `NewsListing`, `BoutiqueTeaser`, `BilletterieTeaser`, `PersonnalisationTeaser`, `PartnersTiers`, `NewsletterInline`.

**Boutique** : `CategoryFilters`, `ProductGallery`, `VariantPicker`, `AddToCartForm`, `StockBadge`, `CartLine`, `CheckoutSummary`.

**Customizer** : `JerseyScene3D`, `CustomizationForm`, `JerseyPreview`, `ColorSwatches`, `FontPicker`.

**Admin** : `AdminShell`, `AdminSidebar`, `AdminTopbar`, `KpiCard`, `DataTable`, `EmptyState`, `PageHeader`, `StatusBadge`, `StockBadge`, `Toolbar`, `FormRow`, `MediaUploader`.

**POS** : `PosTerminal`, `PosCart`, `PosProductSearch`, `PosPaymentSheet`, `PosNumpad`, `PosReceipt`.

---

## 8. API / actions surface

| Méthode | Path | Payload | Réponse |
|---|---|---|---|
| POST | `/api/newsletter` | `{ email, source, segments? }` | `{ ok, status }` |
| POST | `/api/cart/reserve` | `{ variantId, quantity, sessionId }` | `{ reservationId, expiresAt }` |
| DELETE | `/api/cart/reserve/:id` | — | `{ ok }` |
| POST | `/api/customizations` | `{ name, number, font, color, variantId }` | `{ id, previewUrl? }` |
| POST | `/api/checkout` | `{ items, addresses, couponCode? }` | `{ stripeUrl }` |
| POST | `/api/stripe/webhook` | Stripe event | `{ received }` |
| POST | `/api/contact` | `{ name, email, subject, message }` | `{ ok }` |
| POST | `/api/admin/stock/movement` | `{ variantId, type, quantity, note? }` | `{ movementId, onHand }` |
| POST | `/api/admin/pos/checkout` | `{ items, payment }` | `{ orderNumber }` |
| GET | `/api/admin/exports/:resource` | — | CSV stream |

Pour mutations admin internes, privilégier Server Actions plutôt que routes API dédiées (sauf si appelées par client interactif comme POS).

---

## 9. Rendering policy (`force-dynamic`)

- Toutes les pages serveur lisant Prisma → `export const dynamic = 'force-dynamic'`. Concerne quasi tout `(public)/*`, `compte/*`, `admin/*`.
- Pages 100 % statiques (légales, `club/*` sans data, billetterie sous-pages info) → SSG par défaut, pas de directive.
- Routes `/api/*` → dynamiques par défaut, pas de cache.
- Pas de `revalidate`. Pas d'ISR pour cette V1 — on assume Postgres rapide via pooler.

---

## 10. Non-functional

- **Auth** : Supabase Auth (email + password), session cookie httpOnly. Middleware `app/middleware.js` protège `/compte/*` et `/admin/*`. Vérif rôle (`User.role`) côté admin.
- **Perf** : LCP < 2.5s mobile, images Next/Image avec Supabase loader, fonts swap, JS critique seulement sur pages interactives (panier, customizer, POS).
- **SEO** : metadata par page, sitemap.xml dynamique (produits, articles, joueurs, matchs), robots.txt, Open Graph par template.
- **i18n** : français unique en V1. Pas de framework i18n.
- **A11y** : WCAG AA. Contraste vérifié sur charte (jaune `#FFCC00` sur bleu nuit OK, jamais sur blanc seul). Focus visible. Navigation clavier complète y compris customizer (alternative form si 3D désactivée).
- **Brand voice** : tutoiement public, vouvoiement compte client + admin. Tout en français. Pas d'emoji, pas d'icône décorative gratuite.

---

## 11. Don'ts

- Pas de fichier `CLAUDE.md`, `AGENTS.md`, `PLAN_*.md`, `AJOUTER_*.md`, `ANALYSE_*.md`, `*Maquette*`, `*-old`, `*-backup`, `*-minimal`, `*Variant*`.
- Pas d'emoji nulle part (code, UI, commentaires, commits).
- Pas de JSDoc verbeux par défaut. Utils complexes uniquement (`lib/stock.js`, `lib/pricing.js`).
- Pas de commentaires « TODO Claude », « généré par AI », « selon brief », « comme refonte », « style maquette ».
- Pas de signature AI dans commits.
- Naming organique, ordre d'imports : externes → next → `@/components` → `@/lib` → relatifs.
- Pas de TypeScript. JS pur partout.
- Pas de Shopify ni d'intégration e-commerce externe — tout interne.
- Pas de magnetic CTA, pas d'animations gratuites — sobriété club.

---

## 12. Open decisions

- **Channel POS vs online** : pas de champ `channel` sur `Order` aujourd'hui. Distinction via préfixe `source` sur `StockMovement`. Si reporting POS approfondi requis, ajouter migration `Order.channel` + table `PosSession`.
- **Billets dématérialisés** : pas de modèle Prisma. V1 : redirection externe via `Match.ticketUrl`. V2 : table `Ticket` propre.
- **Mailer** : stub `console.log` en démo. Prod : Resend ou Postmark à brancher.
- **CMS pages statiques** : `/admin/contenus` listé mais sans modèle Prisma. V1 : édition fichiers MDX. V2 : table `Page`.
- **Recherche produit POS** : full-text Postgres simple en V1, pgvector si besoin V2.
- **Stripe** : Checkout hosted (pas Elements) en V1 pour minimiser PCI scope.
