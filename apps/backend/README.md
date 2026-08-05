# Backend Strapi - Association Asselda

Backend API CMS pour le site web de l'Association Asselda utilisant Strapi et PostgreSQL.

## Installation

### Prérequis

-   Node.js >= 18.0.0
-   PostgreSQL >= 12 (Ou MySQL si préféré, mais PostgreSQL est recommandé)
-   npm >= 9.0.0

### Setup initial

1. **Naviger vers la racine du projet et installer les dépendances**

```bash
npm install
```

2. **Configurer les variables d'environnement**

```bash
cp .env.example .env
```

Éditez `.env` et configurez :

-   `DATABASE_URL` : Connection string PostgreSQL/MySQL
-   `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD` : Port, nom d'utilisateur et mot de passe de la base de données
-   `JWT_SECRET` : Clé secrète JWT. Il sera généré automatiquement lors du premier lancement, mais il est recommandé de
    le définir manuellement pour la production.
-   `APP_KEYS` : Clés d'application pour Strapi (2 ou plus, séparées par des virgules)
-   `SMTP_*` : Variables SMTP pour les emails
-   `RECAPTCHA_SECRET_KEY` : Clé secrète reCAPTCHA

Pour générer des clés sécurisées, vous pouvez utiliser des outils en ligne ou la commande suivante dans un terminal :

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

3. **Créer la base de données PostgreSQL/MySQL**

```sql
CREATE DATABASE asselda_db;
```

4. **Aouter un utilisateur et lui donner les permissions nécessaires**

Avec PostgreSQL :

```sql
CREATE USER asselda WITH PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE asselda_db TO asselda;
```

Avec MySQL :

```sql
CREATE USER 'asselda'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON asselda_db.* TO 'asselda'@'localhost';
FLUSH PRIVILEGES;
```

4. **Démarrer le serveur**

```bash
npm run backend:dev
```

L'admin est accessible sur `http://localhost:1337/admin`

## Architecture

### Collections Types (Phase 2)

-   **Article** : Articles et actualités avec contenu bilingue FR/AR
-   **Project** : Projets réalisés et en cours avec relations partenaires et galerie
-   **Event** : Événements et activités avec calendrier
-   **Gallery** : Albums de photos avec organisation hiérarchique
-   **Partner** : Partenaires de l'association
-   **Membership** : Demandes d'adhésion avec statuts
-   **ContactSubmission** : Soumissions du formulaire de contact

### Permissions

-   **Admin** : Accès complet (créer, modifier, supprimer)
-   **Éditeur** : Créer et modifier contenu publié
-   **Lecteur** : Consultation uniquement

### Routes API

**Publiques (GET)** :

-   `GET /api/articles` - Lister articles publiés
-   `GET /api/articles/:id` - Détail article
-   `GET /api/projects` - Lister projets publiés
-   `GET /api/events` - Lister événements publiés
-   `GET /api/galleries` - Lister galeries
-   `GET /api/partners` - Lister partenaires

**Authentifiées (POST/PUT/DELETE)** :

-   Articles, Projets, Événements, Partenaires CRUD
-   `POST /api/memberships` - Soumettre adhésion (public)
-   `POST /api/contact-submissions` - Soumettre contact (public)

## Variables d'environnement

Voir `.env.example` pour toutes les variables disponibles.

### Essentielles pour production

```
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=<generate-secure-secret>
API_TOKEN_SALT=<generate-secure-salt>
ADMIN_JWT_SECRET=<generate-secure-secret>
NODE_ENV=production
```

## Scripts

```bash
npm run dev     # Développement avec rechargement automatique
npm run start   # Production
npm run build   # Build
npm run strapi  # CLI Strapi
```

## Documentation

-   [Strapi Documentation](https://docs.strapi.io)
-   [Plan Backend Complet](../../.github/prompts/plan-backend-asselda.prompt.md)

## Phases d'implémentation

-   ✅ Phase 1 : Infrastructure & Configuration
-   ✅ Phase 2 : Modèles de contenu
-   ⏳ Phase 3 : Authentification & Contrôle d'accès
-   ⏳ Phase 4 : Fonctionnalités avancées & Intégrations
-   ⏳ Phase 5 : Intégration Frontend
-   ⏳ Phase 6 : Tests et Déploiement
-   ⏳ Phase 7 : Gestion multilingue
-   ⏳ Phase 8 : Formulaires + reCAPTCHA

## Support

Pour des questions ou problèmes, consulter la documentation Strapi ou le plan backend détaillé.
