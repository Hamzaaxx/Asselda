# RBAC - Role-Based Access Control Setup Guide

## Overview

This guide explains how to set up and configure Role-Based Access Control (RBAC) in Strapi for the Asselda project. Strapi 5.x uses the built-in **Users & Permissions** plugin to manage roles and permissions.

## Default Roles

The Asselda CMS uses three main roles:

### 1. **Admin (Administrator)**

-   Full access to the entire CMS
-   Can create, read, update, and delete content
-   Can manage users and permissions
-   Can access admin panel
-   Can modify system settings

### 2. **Éditeur (Editor)**

-   Can create, read, update articles and projects
-   Can publish/unpublish content
-   Cannot manage users
-   Cannot access system settings
-   Limited to content management

### 3. **Lecteur (Reader)**

-   Read-only access
-   Can view articles and projects
-   Cannot create or modify content
-   Cannot delete content
-   Useful for consultation-only accounts

## Setting Up RBAC in Strapi

### Step 1: Access the Users & Permissions Plugin

1. Start the Strapi development server:

    ```bash
    cd apps/backend
    npm run dev
    ```

    Strapi admin panel will be available at: `http://localhost:1337/admin`

2. Navigate to **Settings** → **Users & Permissions Plugin** → **Roles**

### Step 2: Create Custom Roles

#### Create "Éditeur" (Editor) Role:

1. Click **+ Add New Role**
2. Set Name: `Éditeur` (or `Editor` for English)
3. Set Description: `Can create and modify articles and projects`
4. Under **Permissions**, enable the following:

    - **Content Manager**:
        - `find` - View all articles/projects
        - `findOne` - View single article/project
        - `create` - Create new articles/projects
        - `update` - Edit articles/projects
        - `publish` - Publish content (if using draft/publish workflow)
    - **API**:
        - For `/api/articles`:
            - `GET` (find, findOne)
            - `POST` (create)
            - `PUT` (update)
        - For `/api/projects`:
            - `GET` (find, findOne)
            - `POST` (create)
            - `PUT` (update)

5. Click **Save**

#### Create "Lecteur" (Reader) Role:

1. Click **+ Add New Role**
2. Set Name: `Lecteur` (or `Reader` for English)
3. Set Description: `Read-only access to content`
4. Under **Permissions**, enable only:

    - **Content Manager**:
        - `find` - View all articles/projects
        - `findOne` - View single article/project
    - **API**:
        - For `/api/articles`:
            - `GET` (find, findOne)
        - For `/api/projects`:
            - `GET` (find, findOne)

5. Click **Save**

### Step 3: Manage Users

1. Go to **Content Manager** → **Users**
2. Create or edit users and assign them to one of the roles:
    - Admin (system role)
    - Éditeur (custom role)
    - Lecteur (custom role)

## Permissioning Strategy

### Content Types Access

| Content Type | Admin | Éditeur | Lecteur |
| ------------ | ----- | ------- | ------- |
| Articles     | CRUD  | CR*U*D  | R       |
| Projects     | CRUD  | CR*U*D  | R       |
| Partners     | CRUD  | R       | R       |
| Activities   | CRUD  | R       | R       |
| Users        | CRUD  | -       | -       |

**Legend:** C=Create, R=Read, U=Update, D=Delete

### API Endpoints Access

| Endpoint                 | Admin | Éditeur | Lecteur |
| ------------------------ | ----- | ------- | ------- |
| GET /api/articles        | ✓     | ✓       | ✓       |
| POST /api/articles       | ✓     | ✓       | -       |
| PUT /api/articles/:id    | ✓     | ✓       | -       |
| DELETE /api/articles/:id | ✓     | -       | -       |

## JWT Token & Role Claim

When a user logs in via `/api/auth/local`, Strapi returns a JWT token and user object:

```json
{
	"jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	"user": {
		"id": 1,
		"username": "john_editor",
		"email": "john@example.com",
		"role": {
			"id": 2,
			"name": "Éditeur",
			"description": "Can create and modify articles and projects"
		}
	}
}
```

The NextAuth frontend integration extracts `user.role.name` and stores it in the session, making it available via:

```typescript
const session = useSession();
const userRole = session.user.role; // "Admin", "Éditeur", or "Lecteur"
```

## Frontend Integration

The frontend uses the `auth-client.ts` utility to:

1. **Check user role**:

    ```typescript
    import { isAdmin, isEditor, isAuthenticated } from "@/lib/auth-client";

    if (isEditor(session)) {
    	// Show editor UI
    }
    ```

2. **Make authenticated API calls**:

    ```typescript
    const client = createStrapiClient(session);
    const articles = await client.get("/api/articles");
    ```

3. **Protect routes** via middleware:
    - `/fr/admin/*` - requires authentication
    - `/fr/admin/articles` - requires "Éditeur" or "Admin" role
    - `/fr/admin/projects` - requires "Éditeur" or "Admin" role

## Testing RBAC

### Manual Testing:

1. Create test users with different roles
2. Log in as each user
3. Verify permissions:
    - Admin can create/edit/delete
    - Éditeur can create/edit articles and projects
    - Lecteur can only view content

### API Testing:

```bash
# Get JWT token
curl -X POST http://localhost:1337/api/auth/local \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "editor@example.com",
    "password": "password123"
  }'

# Use JWT to access protected endpoint
curl -X GET http://localhost:1337/api/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Try to delete (should fail for Éditeur)
curl -X DELETE http://localhost:1337/api/articles/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Advanced: Custom Policies

For more fine-grained control, you can create custom Strapi policies. Example: `src/policies/isOwner.ts`

```typescript
export default (policyContext, config, { strapi }) => {
	const { state } = policyContext;

	// Check if user is the owner of the article
	if (state.user.id === state.params.id) {
		return true;
	}

	return false;
};
```

Then enable in route config:

```typescript
// src/api/article/routes/article.ts
{
  method: 'put',
  path: '/articles/:id',
  handler: 'article.update',
  config: {
    policies: ['isOwner']
  }
}
```

## Optional: 2FA (Two-Factor Authentication)

Strapi supports 2FA via plugins. To enable 2FA:

1. Install a community plugin (e.g., `strapi-plugin-users-permissions-2fa`)
2. Configure in `config/plugins.js`
3. Enable 2FA in user settings

Note: Implementation deferred. See `docs/2FA_SETUP.md` for details.

## Security Best Practices

1. **Change JWT_SECRET** in production `.env`
2. **Use HTTPS** in production
3. **Rotate app keys** regularly
4. **Audit user roles** periodically
5. **Log authentication events** (optional)
6. **Enable rate limiting** on auth endpoints

## Troubleshooting

### Roles not showing in Strapi admin:

-   Ensure `@strapi/plugin-users-permissions` is installed
-   Verify `config/plugins.js` has `users-permissions: { enabled: true }`
-   Restart Strapi: `npm run dev`

### JWT not containing role:

-   Verify user is assigned a role (not just default "Authenticated")
-   Check JWT payload via https://jwt.io/
-   Verify NextAuth callback is mapping `user.role.name` correctly

### Permissions not enforced:

-   Verify role permissions are set in Strapi admin
-   Check middleware is running on protected routes
-   Ensure JWT token is being sent in Authorization header

## Resources

-   [Strapi Users & Permissions Plugin](https://docs.strapi.io/user-docs/users-roles-permissions/managing-users)
-   [Strapi JWT Authentication](https://docs.strapi.io/dev-docs/plugins/users-permissions)
-   [NextAuth.js JWT Sessions](https://next-auth.js.org/v3/configuration/callbacks#jwt-callback)
