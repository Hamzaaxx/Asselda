# API Endpoints Documentation

## Base URL

```
http://localhost:1337/api
```

## Authentication

Les endpoints modifiables (POST, PUT, DELETE) nécessitent une authentification.

### Login

```
POST /auth/local
Content-Type: application/json

{
  "identifier": "admin@asselda.org",
  "password": "your_password"
}

Response:
{
  "jwt": "eyJhbGci...",
  "user": { ... }
}
```

### Headers requis pour actions authentifiées

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

<details>
<summary>Ces fonctionnalitées ne sont pas encore finalisées et n'ont étées testées que via le panel admin</summary>

## Articles

### Lister les articles publiés

```
GET /articles?populate=*&filters[publishedAt][$notNull]=true
```

### Créer un article (Admin)

```
POST /articles
Content-Type: application/json

{
  "titleFr": "Titre de l'article",
  "titleAr": "عنوان المقال",
  "contentFr": "<p>Contenu...</p>",
  "contentAr": "<p>المحتوى...</p>",
  "descriptionFr": "Description courte",
  "descriptionAr": "الوصف المختصر",
  "category": "news"
}
```

---

## Projects

### Lister les projets

```
GET /projects?populate=*&filters[publishedAt][$notNull]=true
```

### Créer un projet (Admin)

```
POST /projects
Content-Type: application/json

{
  "titleFr": "Nom du projet",
  "titleAr": "اسم المشروع",
  "descriptionFr": "<p>Description...</p>",
  "descriptionAr": "<p>الوصف...</p>",
  "status": "En cours",
  "budget": 50000,
  "startDate": "2024-01-01",
  "endDate": "2024-12-31"
}
```

---

## Events

### Lister les événements

```
GET /events?populate=*&filters[publishedAt][$notNull]=true
```

### Créer un événement (Admin)

```
POST /events
Content-Type: application/json

{
  "titleFr": "Nom de l'événement",
  "titleAr": "اسم الحدث",
  "descriptionFr": "<p>Description...</p>",
  "descriptionAr": "<p>الوصف...</p>",
  "date": "2024-06-15T14:00:00Z",
  "location": "Douar Asselda"
}
```

---

## Galleries

### Lister les galeries

```
GET /galleries?populate=*&filters[publishedAt][$notNull]=true
```

### Créer une galerie avec photos (Admin)

```
POST /galleries
Content-Type: multipart/form-data

- nameFr: Album Name
- nameAr: اسم الألبوم
- descriptionFr: Description
- descriptionAr: الوصف
- images: [file1.jpg, file2.jpg, ...]
- type: project
- project: 1 (ID du projet)
```

---

## Partners

### Lister les partenaires

```
GET /partners?populate=*
```

### Créer un partenaire (Admin)

```
POST /partners
Content-Type: multipart/form-data

- name: Partner Name
- descriptionFr: Description
- descriptionAr: الوصف
- logo: file.png
- website: https://example.com
- email: contact@example.com
```

---

## Memberships (Adhésions)

### Soumettre une demande d'adhésion (Public)

```
POST /memberships
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+212 6XX XXX XXX",
  "message": "Je voudrais rejoindre l'association"
}
```

### Lister les adhésions (Admin)

```
GET /memberships?filters[status][$eq]=En attente
```

### Approuver une adhésion (Admin)

```
PUT /memberships/1
Content-Type: application/json

{
  "status": "Validé",
  "approvedAt": "2024-05-16T10:00:00Z"
}
```

---

## Contact Submissions

### Soumettre un formulaire de contact (Public)

```
POST /contact-submissions
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+212 6XX XXX XXX",
  "subject": "Information sur les projets",
  "message": "<p>Message...</p>"
}
```

### Lister les messages de contact (Admin)

```
GET /contact-submissions?filters[read][$eq]=false
```

</details>

## Query Parameters

### Pagination

```
GET /articles?pagination[page]=1&pagination[pageSize]=10
```

### Filtering

```
GET /articles?filters[category][$eq]=news
GET /projects?filters[status][$eq]=En cours
GET /events?filters[date][$gte]=2024-01-01
```

### Population (Relations)

```
GET /projects?populate=gallery,partners,imageCover
GET /articles?populate=author,imageCover
```

### Sorting

```
GET /articles?sort=createdAt:desc
GET /events?sort=date:asc
```

---

## Error Responses

### 400 Bad Request

```json
{
	"error": {
		"status": 400,
		"name": "BadRequestError",
		"message": "Invalid input"
	}
}
```

### 401 Unauthorized

```json
{
	"error": {
		"status": 401,
		"name": "UnauthorizedError",
		"message": "Invalid token"
	}
}
```

### 403 Forbidden

```json
{
	"error": {
		"status": 403,
		"name": "ForbiddenError",
		"message": "Insufficient permissions"
	}
}
```

---

## Rate Limiting

À configurer selon les besoins en production (middleware Koa ou plugin Strapi).

## CORS

À configurer dans `config/server.js` pour accepter requêtes du frontend.
