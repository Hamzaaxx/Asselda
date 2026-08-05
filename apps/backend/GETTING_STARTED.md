# Instructions de déploiement initial

## Étape 1 : Installer les dépendances

```bash
cd apps/backend
npm install
```

## Étape 2 : Configurer la base de données

### Option A : PostgreSQL local

1. Installer PostgreSQL
2. Créer une base de données :

```sql
CREATE USER asselda WITH PASSWORD 'password123';
CREATE DATABASE asselda_db OWNER asselda;
GRANT ALL PRIVILEGES ON DATABASE asselda_db TO asselda;
```

3. Copier et éditer `.env` :

```bash
cp .env.example .env
```

### Option B : PostgreSQL distant (Railway, Render, etc.)

Obtenir la connection string et la mettre dans `DATABASE_URL` dans `.env`

## Étape 3 : Démarrer Strapi

```bash
npm run dev
```

Strapi créera les tables automatiquement.

## Étape 4 : Accéder au panel admin

1. Ouvrir `http://localhost:1337/admin`
2. Créer le compte administrateur initial
3. Se connecter

## Étape 5 : Vérifier les collections

1. Dans le menu Admin, vérifier que toutes les collections sont présentes :
    - Articles
    - Projects
    - Events
    - Galleries
    - Partners
    - Memberships
    - Contact Submissions

## Étape 6 : Créer du contenu de test

### Créer un article

1. Aller à "Articles"
2. Cliquer "Create new entry"
3. Remplir les champs FR et AR
4. Sauvegarder et publier

### Créer un projet

1. Aller à "Projects"
2. Créer avec titre, description et image
3. Lier à des partenaires et galeries

### Uploader une galerie

1. Aller à "Galleries"
2. Créer un album
3. Ajouter des images
4. Lier à un projet si nécessaire

## Étape 7 : Tester les API publiques

```bash
# Tester depuis le terminal
curl http://localhost:1337/api/articles
curl http://localhost:1337/api/projects
curl http://localhost:1337/api/partners
```

## Configuration pour le frontend

### Variables d'environnement frontend

Ajouter à `apps/frontend/.env.local` :

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### Activer CORS dans Strapi

Éditer `config/server.js` :

```javascript
module.exports = ({ env }) => ({
	// ... autres configs
	middleware: ["strapi::cors"],
});
```

## Troubleshooting

### Erreur de connexion PostgreSQL

-   Vérifier que PostgreSQL est en cours d'exécution
-   Vérifier les credentials dans `.env`
-   Vérifier le port (par défaut 5432)

### Collections vides

-   Strapi crée les tables automatiquement au démarrage
-   Vérifier les logs pour les erreurs
-   Consulter `config/database.js`

### Admin panel non accessible

-   Vérifier que Strapi est en cours d'exécution
-   Vérifier le port (par défaut 1337)
-   Nettoyer le cache du navigateur

## Prochaines étapes

✅ Phases 1 & 2 complétées
⏳ Phase 3 : Configuration authentification + rôles
⏳ Phase 4 : Intégration Nodemailer pour emails
⏳ Phase 5 : Intégration avec frontend

## Documentation supplémentaire

-   [Strapi v4 Docs](https://docs.strapi.io)
-   [API Endpoints](./API_ENDPOINTS.md)
-   [Backend README](./README.md)
