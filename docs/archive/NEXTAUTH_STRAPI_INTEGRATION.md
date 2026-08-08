# NextAuth + Strapi JWT Integration Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ Frontend (Next.js 16 + NextAuth)                                │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ app/api/auth/[...nextauth]/route.ts                        │  │
│ │ - Credentials provider → calls Strapi /api/auth/local      │  │
│ │ - Maps Strapi user.role to JWT token                       │  │
│ └────────────────────────────────────────────────────────────┘  │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ app/middleware.ts                                          │  │
│ │ - Protects /admin routes (requires auth)                   │  │
│ │ - Enforces role-based access (/admin/articles→Éditeur)    │  │
│ └────────────────────────────────────────────────────────────┘  │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ lib/auth-client.ts                                         │  │
│ │ - StrapiClient class (handles JWT auth to backend)        │  │
│ │ - Role helper functions (isAdmin, isEditor, etc)          │  │
│ └────────────────────────────────────────────────────────────┘  │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ components/AuthProvider.tsx                                │  │
│ │ - SessionProvider wrapper for useSession() hook           │  │
│ └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
             ↓ HTTPS / JSON ↓
┌─────────────────────────────────────────────────────────────────┐
│ Backend (Strapi 5.x + PostgreSQL)                               │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ POST /api/auth/local                                       │  │
│ │ - Input: {identifier, password}                           │  │
│ │ - Output: {jwt, user: {id, email, role: {name, id}}}     │  │
│ └────────────────────────────────────────────────────────────┘  │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ Users & Permissions Plugin                                 │  │
│ │ - Roles: Admin, Éditeur (Editor), Lecteur (Reader)        │  │
│ │ - Permissions per role (CRUD on articles, projects, etc)  │  │
│ └────────────────────────────────────────────────────────────┘  │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ Protected API Endpoints (require JWT)                      │  │
│ │ - GET /api/articles (all roles)                           │  │
│ │ - POST /api/articles (Éditeur, Admin only)               │  │
│ │ - PUT /api/articles/:id (Éditeur, Admin only)            │  │
│ │ - DELETE /api/articles/:id (Admin only)                  │  │
│ └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
             ↓ PostgreSQL ↓
┌─────────────────────────────────────────────────────────────────┐
│ Database (PostgreSQL)                                            │
│ - users table                                                    │
│ - roles table (Admin, Éditeur, Lecteur)                        │
│ - permissions table                                              │
│ - articles, projects (content types)                            │
└─────────────────────────────────────────────────────────────────┘
```

## Authentication Flow

### 1. User Login

```
User → Login Form (French/Arabic)
     → signIn("credentials", {email, password})
     → NextAuth API Route (/api/auth/callback/credentials)
     → Strapi Backend (/api/auth/local)
     → JWT issued + User with Role
     → NextAuth stores JWT in session
     → Redirect to /admin
```

### 2. Session Management

```
NextAuth Session (JWT):
{
  user: {
    id: "1",
    email: "editor@asselda.org",
    name: "John Editor",
    role: "Éditeur"  // extracted from Strapi response
  },
  jwt: "eyJhbGciOiJIUzI1NiIs..."  // Strapi JWT stored in session
}
```

### 3. Making API Calls

```typescript
// In a Server Component or API Route:
const session = await getSession();
const client = createStrapiClient(session);
const articles = await client.get("/api/articles");
// JWT automatically attached to requests
```

## Setup Instructions

### Backend (Strapi)

#### Prerequisites

-   PostgreSQL 12+ running locally or remote
-   Node.js 18+
-   npm 9+

#### Installation & Setup

1. **Install dependencies**:

    ```bash
    cd apps/backend
    npm install
    ```

2. **Create environment file** (already created at `.env`):

    - `JWT_SECRET`: Secret for Strapi JWT signing
    - `ADMIN_JWT_SECRET`: Secret for admin panel sessions
    - `DB_HOST`, `DB_PORT`, `DB_NAME`: PostgreSQL connection
    - `FRONTEND_URL`: Next.js frontend URL for CORS

3. **Initialize Strapi**:

    ```bash
    npm run dev
    ```

    - Strapi will create database tables
    - Admin panel accessible at: `http://localhost:1337/admin`
    - Create admin user on first run

4. **Configure Roles** (in Strapi Admin):

    - See [RBAC_SETUP.md](docs/RBAC_SETUP.md) for detailed steps
    - Create roles: Admin, Éditeur, Lecteur
    - Set permissions per role

5. **Create Content Types** (in Strapi Admin):
    - Articles (title, content, author, status)
    - Projects (title, description, images)
    - Partners, Activities (optional)

### Frontend (Next.js)

#### Prerequisites

-   Node.js 18+
-   npm 9+
-   Backend running at `http://localhost:1337`

#### Installation & Setup

1. **Install dependencies**:

    ```bash
    cd apps/frontend
    npm install
    ```

2. **Configure environment** (already created at `.env.local`):

    ```env
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
    NEXT_PUBLIC_API_URL=http://localhost:1337
    ```

    To generate `NEXTAUTH_SECRET`:

    ```bash
    openssl rand -base64 32
    ```

3. **Start development server**:
    ```bash
    npm run dev
    ```
    App available at: `http://localhost:3000`

## Usage Examples

### 1. Check If User is Logged In (Client Component)

```typescript
"use client";
import { useSession } from "next-auth/react";

export function MyComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Not logged in</p>;

  return <p>Welcome, {session.user.name}!</p>;
}
```

### 2. Check User Role (Client Component)

```typescript
"use client";
import { useSession } from "next-auth/react";
import { isAdmin, isEditor } from "@/lib/auth-client";

export function AdminPanel() {
  const { data: session } = useSession();

  if (!isAdmin(session)) {
    return <p>Access Denied</p>;
  }

  return <div>Admin Controls</div>;
}
```

### 3. Make Authenticated API Call (Server Component)

```typescript
import { getSession } from "next-auth/react";
import { createStrapiClient } from "@/lib/auth-client";

export async function ArticlesList() {
  const session = await getSession();

  if (!session) {
    return <p>Sign in to see articles</p>;
  }

  const client = createStrapiClient(session);
  const data = await client.get("/api/articles");

  return (
    <ul>
      {data.data.map(article => (
        <li key={article.id}>{article.title}</li>
      ))}
    </ul>
  );
}
```

### 4. Create Content (Éditeur/Admin Only)

```typescript
"use client";
import { useSession } from "next-auth/react";
import { createStrapiClient, isEditor } from "@/lib/auth-client";

export function CreateArticleForm() {
  const { data: session } = useSession();

  if (!isEditor(session)) {
    return <p>Only editors can create articles</p>;
  }

  const handleSubmit = async (title: string, content: string) => {
    const client = createStrapiClient(session);

    try {
      const response = await client.post("/api/articles", {
        data: {
          title,
          content,
          author: session.user.id,
          status: "draft"
        }
      });
      console.log("Article created:", response);
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // form logic
    }}>
      {/* form fields */}
    </form>
  );
}
```

## Directory Structure

```
apps/
├── backend/ (Strapi)
│   ├── config/
│   │   ├── database.js
│   │   ├── plugins.js (users-permissions enabled)
│   │   ├── server.js
│   │   └── ...
│   ├── src/
│   │   └── api/ (content types)
│   ├── .env (DB, JWT secrets)
│   └── package.json
│
└── frontend/ (Next.js)
    ├── app/
    │   ├── api/auth/[...nextauth]/route.ts (NextAuth handler)
    │   ├── middleware.ts (route protection)
    │   ├── layout.tsx (AuthProvider wrapper)
    │   ├── fr/
    │   │   ├── login/page.tsx
    │   │   ├── admin/
    │   │   │   ├── page.tsx (dashboard)
    │   │   │   ├── articles/page.tsx
    │   │   │   └── projets/page.tsx
    │   │   └── ...
    │   └── ar/
    │       └── ... (Arabic mirror)
    ├── components/
    │   ├── AuthProvider.tsx
    │   └── ...
    ├── lib/
    │   ├── auth-client.ts (JWT client & helpers)
    │   └── ...
    ├── .env.local (NEXTAUTH config)
    └── package.json
```

## Environment Variables Reference

### Frontend (.env.local)

| Variable              | Description                   | Example                                  |
| --------------------- | ----------------------------- | ---------------------------------------- |
| `NEXTAUTH_URL`        | Frontend URL                  | `http://localhost:3000`                  |
| `NEXTAUTH_SECRET`     | Session JWT secret (32+ char) | Generated with `openssl rand -base64 32` |
| `NEXT_PUBLIC_API_URL` | Strapi backend URL            | `http://localhost:1337`                  |

### Backend (.env)

| Variable           | Description            | Example                       |
| ------------------ | ---------------------- | ----------------------------- |
| `JWT_SECRET`       | Strapi JWT secret      | `super_secret_key`            |
| `ADMIN_JWT_SECRET` | Admin panel JWT secret | `admin_secret_key`            |
| `API_TOKEN_SALT`   | API token salt         | `token_salt`                  |
| `DB_HOST`          | PostgreSQL host        | `localhost`                   |
| `DB_PORT`          | PostgreSQL port        | `5432`                        |
| `DB_NAME`          | Database name          | `asselda_db`                  |
| `DB_USERNAME`      | Database user          | `asselda`                     |
| `DB_PASSWORD`      | Database password      | `password123`                 |
| `FRONTEND_URL`     | Frontend URL for CORS  | `http://localhost:3000`       |
| `NODE_ENV`         | Environment            | `development` or `production` |

## Security Considerations

### Development

-   Use simple secrets (OK for dev only)
-   PostgreSQL can run locally
-   CORS enabled for `localhost:3000` and `localhost:3001`

### Production

1. **Generate strong secrets**:

    ```bash
    openssl rand -base64 32  # NEXTAUTH_SECRET
    openssl rand -base64 32  # JWT_SECRET
    ```

2. **Enable HTTPS**: All requests must use `https://`

3. **Set secure cookies**: NextAuth automatically uses secure, httpOnly cookies in production

4. **Database security**:

    - Use strong PostgreSQL password
    - Enable SSL/TLS for DB connection
    - Use environment-specific database

5. **Rate limiting**: Implement on auth endpoints (`/api/auth/local`)

6. **CORS configuration**: Whitelist only trusted frontend domains

7. **Audit logging**: Track login events and permission changes

## Troubleshooting

### 401 Unauthorized on API calls

-   **Cause**: JWT expired or missing
-   **Fix**: Ensure `NEXT_PUBLIC_API_URL` is correct, JWT is in Authorization header

### Login redirect loop

-   **Cause**: `NEXTAUTH_SECRET` mismatch between requests
-   **Fix**: Ensure `NEXTAUTH_SECRET` is set in `.env.local` (not empty)

### Strapi login returns 400

-   **Cause**: User not found or credentials wrong
-   **Fix**: Verify user exists in Strapi admin, check email/password

### Role not in session

-   **Cause**: NextAuth JWT callback not mapping role correctly
-   **Fix**: Verify `/api/auth/local` returns `user.role.name`, check JWT callback logic

## Next Steps

1. Start Strapi backend:

    ```bash
    cd apps/backend && npm run dev
    ```

2. Start Next.js frontend:

    ```bash
    cd apps/frontend && npm run dev
    ```

3. Access Strapi admin at `http://localhost:1337/admin` and create roles

4. Visit `http://localhost:3000/fr/login` and test login

5. Create admin pages in `apps/frontend/app/[lang]/admin/`

## References

-   [NextAuth.js Documentation](https://next-auth.js.org/)
-   [Strapi Users & Permissions Plugin](https://docs.strapi.io/dev-docs/plugins/users-permissions)
-   [NextAuth + Credentials Provider](https://next-auth.js.org/providers/credentials)
-   [Strapi API Authentication](https://docs.strapi.io/dev-docs/api/rest/authentication)
