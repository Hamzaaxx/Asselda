# Plan Implémentation Backend Asselda

## Vue d'ensemble

Backend Strapi + PostgreSQL pour gérer dynamiquement articles, projets, galeries, événements et adhésions. Frontend Next.js consommera les APIs REST. Architecture multilingue (FR/AR) avec traductions côté frontend. Formulaires protégés par reCAPTCHA v2. Hébergement monorepo avec déploiement simultané.

**Note**: Ce plan est structuré en 8 phases indépendantes. Chaque phase peut être implémentée séparément selon vos priorités et contraintes. Consultez la checklist de vérification pour valider chaque étape.

---

## PHASE 1 : Infrastructure & Configuration (Fondations)

### 1. Initialiser Strapi avec PostgreSQL

-   Créer un nouveau projet Strapi dans `apps/backend/` ou `apps/backend/`
-   Configurer PostgreSQL comme base de données (via `DATABASE_URL`)
-   Ajouter les variables d'environnement (JWT_SECRET, API_TOKEN_SALT, etc.)

### 2. Configurer Strapi + Prisma

-   Strapi utilise sa propre ORM par défaut
-   Décision: Strapi gère l'ORM — garder simplement Strapi

### 3. Structurer le monorepo

-   Créer un `package.json` racine pour orchestrer frontend + backend
-   Scripts npm: `dev` (lance front + back), `build` (compile front + back)
-   Clarifier les conventions de déploiement

---

## PHASE 2 : Modèles de contenu Strapi (Collections Types)

### 4. Créer les Collections Types dans Strapi

-   **Articles** : titre, contenu (rich text), brouillon/publié, image à la une, auteur, date publication, catégorie
-   **Projets** : titre, description, statut (En cours/Terminé), budget, date début/fin, partenaires (relation), galerie liée, résultats
-   **Événements** : titre, date, lieu, description, statut (programmé/publié)
-   **Galerie** : albums, photos (upload multiple), organisation hiérarchique, métadonnées (titre, description)
-   **Partenaires** : nom, logo, description, URL
-   **Adhésions** : prénom/nom, email, message, statut (En attente/Validé/Refusé), date demande

### 5. Configurer les relations et permissions

-   Projets ↔ Galerie (une-à-plusieurs)
-   Projets ↔ Partenaires (plusieurs-à-plusieurs)
-   Articles ↔ Catégories
-   Administrateurs avec rôles (admin, éditeur, lecteur)

---

## PHASE 3 : Authentification & Contrôle d'accès

### 6. Configurer NextAuth + JWT pour l'authentification

-   Strapi fournit des endpoints `/auth/local` pour authentification
-   Configurer JWT avec NextAuth dans le frontend pour sessions admin
-   Setup 2FA optionnel avec un plugin Strapi (strapi-plugin-users-permissions)

### 7. Gérer les rôles utilisateurs

-   Admin : accès complet à tout le CMS
-   Éditeur : créer/modifier articles et projets
-   Lecteur : consultation uniquement
-   Implémenter via Strapi's built-in Role-Based Access Control (RBAC)

---

## PHASE 4 : Fonctionnalités avancées & Intégrations

### 8. Gestion des uploads (Galerie)

-   Configurer le provider de stockage Strapi (local ou S3)
-   Setup upload multiple, organisation par album
-   Permissions: admin peut modifier/supprimer, lecteur peut voir

### 9. Emailings avec Nodemailer + SMTP

-   Configurer Nodemailer dans un plugin Strapi personnalisé
-   Déclencher emails lors de :
    -   Soumission de contact
    -   Nouvelle adhésion (notification à l'admin)
    -   Publication programmée d'événements
-   Variables d'environnement : SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

### 10. Publication programmée

-   Strapi supporte nativement `publishedAt` — exploiter pour événements/articles
-   Optionnel: webhook pour publier automatiquement via CRON

### 11. Export CSV des adhésions

-   Créer un endpoint custom Strapi `/api/memberships/export`
-   Utiliser une librairie CSV (csv-parser, papaparse)

---

## PHASE 5 : Intégration Frontend

### 12. Créer les services API côté frontend

-   Remplacer les données statiques (`lib/activities.ts`, `lib/projects.tsx`) par appels API vers Strapi
-   Créer `lib/api.ts` avec fetch/axios client
-   Configurer base URL de l'API (`NEXT_PUBLIC_STRAPI_URL`)
-   Gestion du cache et SSR/ISR dans Next.js

### 13. Convertir les composants statiques

-   `<ActivityList />` fetch depuis `/api/activities`
-   `<ProjectCarousel />` fetch depuis `/api/projects`
-   `<Gallery />` fetch depuis `/api/galleries`
-   Ajouter loading states et error handling

---

## PHASE 6 : Tests et Déploiement

### 14. Tester les APIs Strapi

-   Vérifier tous les endpoints CRUD (articles, projets, galeries, adhésions)
-   Tester permissions et authentification
-   Vérifier uploads et stockage

### 15. Intégration e2e

-   Frontend récupère bien les données dynamiques
-   Formulaires (contact, adhésion) fonctionnent
-   Emails envoyés correctement

### 16. Déploiement monorepo

-   Configurer Docker ou hosting (Vercel pour frontend, Render/Railway pour backend)
-   Scripts de migration PostgreSQL automatisés

---

## PHASE 7 : Gestion multilingue (Strapi + Frontend)

### 17. Structurer les contenus bilingues dans Strapi

-   Collections avec champs dupliqués pour FR/AR :
    -   `Article` : `titleFr`, `titleAr`, `contentFr`, `contentAr`, `imageCover` (partagée)
    -   `Project` : `titleFr`, `titleAr`, `descriptionFr`, `descriptionAr`, `resultsFr`, `resultsAr`
    -   `Event` : `titleFr`, `titleAr`, `descriptionFr`, `descriptionAr`, `location` (partagée)
    -   `Gallery` : `nameFr`, `nameAr`, `images` (partagées par album)
-   **Alternative avancée** : Utiliser le plugin i18n Strapi si vous avez besoin de scalabilité multilingue au-delà de FR/AR (ex: 5+ langues, gestion complexe de variantes). Ce plugin ajoute complexité de déploiement mais élimine la duplication de champs.

### 18. Frontend - Consommer contenu multilingue

-   Service API `lib/api.ts` récupère ressources Strapi (articles, projets)
-   Hook `useLanguage()` détermine la langue courante (`/fr/` ou `/ar/`)
-   Composants affichent le bon champ selon la langue :
    ```ts
    const title = lang === "fr" ? article.titleFr : article.titleAr;
    ```
-   Traductions **locales** (menus, labels, footers) restent dans `lib/translations.ts` JSON

### 19. Routing et SEO multilingue

-   Conserver structure `/fr/[route]` et `/ar/[route]`
-   Métadonnées dynamiques : traduire `metadata` dans `app/[lang]/layout.tsx`
-   Hreflang tags pour SEO (lier versions FR/AR)

---

## PHASE 8 : Formulaires protégés par reCAPTCHA v2

### 20. Setup Google reCAPTCHA v2

-   Créer compte Google Cloud / reCAPTCHA v2 Checkbox
-   Générer **Site Key** (publique, frontend) et **Secret Key** (privée, backend)
-   Ajouter domaines autorisés (localhost, production domain)

### 21. Backend : Endpoint de vérification captcha

-   Créer route custom Strapi : `POST /api/verify-captcha`
-   Paramètres : `recaptchaToken` (du frontend)
-   Vérifier auprès de Google : `https://www.google.com/recaptcha/api/siteverify`
-   Réponse : score de confiance, retourner `valid: true/false`

### 22. Frontend : Ajouter reCAPTCHA aux formulaires

-   Installer `react-google-recaptcha`
-   Ajouter composant `<ReCAPTCHA />` sur :
    -   Form de contact (`/[lang]/contact/page.tsx`)
    -   Form d'adhésion (`/[lang]/rejoindre/page.tsx`)
-   Configuration :
    ```ts
    <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} />
    ```

### 23. Flow soumission formulaire

-   User remplit formulaire (nom, email, message)
-   User clique Captcha → Google valide (popup automatique v2)
-   Si captcha OK → token généré
-   Frontend envoie POST : `{ ...formData, recaptchaToken }`
-   Backend valide token avec Google API
-   Si valide → traiter le formulaire (envoyer email, créer adhésion)
-   Si invalide → retourner erreur 403

### 24. Intégration Nodemailer pour formulaires

-   Email contact : envoyer à admin avec données saisies
-   Email adhésion : notifier admin + email de confirmation à l'utilisateur
-   Utiliser variables d'env SMTP (configurées en phase 4)

---

## Fichiers clés à modifier/créer

### Strapi

-   `apps/backend/package.json` — dépendances Strapi, plugins, scripts dev
-   `apps/backend/.env.local` — DATABASE_URL, JWT_SECRET, SMTP config, RECAPTCHA_SECRET_KEY
-   `apps/backend/src/api/` — collections types et endpoints custom
-   `apps/backend/src/plugins/` — plugin Nodemailer custom (si nécessaire)
-   `apps/backend/src/api/custom-routes/` — route `/verify-captcha` POST

### Frontend

-   `apps/frontend/lib/api.ts` — client API pour consommer Strapi
-   `apps/frontend/.env.local` — `NEXT_PUBLIC_STRAPI_URL`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
-   `apps/frontend/app/[lang]/contact/page.tsx` — ajouter composant ReCAPTCHA
-   `apps/frontend/app/[lang]/rejoindre/page.tsx` — ajouter composant ReCAPTCHA

### Monorepo

-   `package.json` (racine) — workspace monorepo configuration

---

## Checklist de vérification

### Phase 1-2 (Strapi + Collections)

-   ✅ Strapi accessible sur `http://localhost:1337/admin`
-   ✅ PostgreSQL connectée (`strapi start` sans erreurs)
-   ✅ Collections types créées et visibles dans l'admin Strapi

### Phase 3 (Authentification)

-   ✅ Au moins 1 admin créé avec rôle approprié
-   ✅ JWT fonctionne (`POST /api/auth/local`)

### Phase 4 (Fonctionnalités avancées)

-   ✅ Upload galerie fonctionne
-   ✅ Variables SMTP configurées correctement

### Phase 5 (Frontend integration)

-   ✅ Au moins 1 article/projet créé via admin → accessible via `GET /api/articles`
-   ✅ Frontend consomme l'API (page articles affiche contenu dynamique)

### Phase 6 (Tests & Déploiement)

-   ✅ Tous les endpoints CRUD testés
-   ✅ Email de contact envoyé avec succès

### Phase 7 (Multilingue)

-   ✅ Article créé en Strapi avec `titleFr`, `contentFr`, `titleAr`, `contentAr`
-   ✅ Frontend affiche titre FR ou AR selon URL (`/fr/actualites` vs `/ar/actualites`)

### Phase 8 (Captcha)

-   ✅ Captcha checkbox visible sur form contact et adhésion
-   ✅ Captcha valide → formulaire accepté
-   ✅ Captcha échoue/expiré → message d'erreur "Veuillez vérifier le captcha"
-   ✅ Email envoyé après validation formulaire + captcha

---

## Considérations supplémentaires

1. **Plugin i18n Strapi** : Pour éviter duplication de champs, installer plugin i18n pour variantes natives (mais plus complexe à déployer)

2. **reCAPTCHA v3 alternative** : Si préférer invisible (score automatique), v3 est moins UX-invasif mais moins transparent pour l'utilisateur

3. **Stockage données formulaires** : Les adhésions doivent-elles être exportées CSV depuis Strapi ou créer une collection "Membership" dédiée ?

4. **Typo dans le repo** : `src/middlewar/` devrait être `src/middleware/`

5. **Strapi vs Prisma uniquement** : Strapi inclut sa propre ORM — garder seulement la config Prisma ou supprimer ?

6. **Admin panel** : Strapi fournit un admin graphique complet. Dashboard NextJS personnalisé en plus ou suffisant le panel Strapi native ?

---

## Décisions d'architecture

-   **Strapi vs Express custom** : Strapi = gain temps massif pour CMS + auth, moins flexible pour logique métier complexe
-   **Localisation** : Traductions JSON côté frontend pour contenus génériques, champs dupliqués FR/AR dans Strapi pour contenus dynamiques
-   **Déploiement** : PostgreSQL persistant via managed service (AWS RDS, Railway, Render, DigitalOcean)
-   **Performance** : Activer caches API dans Next.js (ISR, SWR) pour réduire appels à Strapi
-   **Captcha** : Google reCAPTCHA v2 Checkbox pour UX acceptable avec bonne sécurité
-   **Sécurité** : Vérification captcha backend obligatoire, variables d'env secrets jamais commitées
