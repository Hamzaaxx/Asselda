# Quick Start Guide - Authentication Setup

## 🚀 Run in 5 Minutes

### **Step 1: Backend (Strapi)**

```bash
# Terminal 1
cd apps/backend

# Install dependencies (if not already installed)
npm install

# Start Strapi
npm run dev
```

✅ Strapi runs at: `http://localhost:1337/admin`  
✅ Create admin user on first run

### **Step 2: Create Roles in Strapi Admin**

1. Visit `http://localhost:1337/admin`
2. Go to **Settings** → **Users & Permissions** → **Roles**
3. Create three roles:
    - **Admin** (full access)
    - **Éditeur** (create/edit articles and projects)
    - **Lecteur** (read-only)

⚠️ See [RBAC_SETUP.md](RBAC_SETUP.md) for detailed permission configuration

### **Step 3: Create Test Users**

In Strapi admin, create test users with different roles:

-   admin@example.com (Admin role)
-   editor@example.com (Éditeur role)
-   reader@example.com (Lecteur role)

### **Step 4: Frontend (Next.js)**

```bash
# Terminal 2
cd apps/frontend

# Install dependencies (if not already installed)
npm install

# Generate NextAuth secret
openssl rand -base64 32
# → Copy the output

# Update .env.local with the generated secret
# NEXTAUTH_SECRET=<paste-generated-secret>

# Start frontend
npm run dev
```

✅ Frontend runs at: `http://localhost:3000`

### **Step 5: Test Login**

1. Visit: `http://localhost:3000/fr/login`
2. Login with admin@example.com (password from Strapi)
3. Should redirect to dashboard at `/fr/admin`
4. Test with different users/roles

---

## 📦 What Was Implemented

### Frontend Files Created

-   `app/api/auth/[...nextauth]/route.ts` - Authentication handler
-   `app/middleware.ts` - Route protection
-   `app/layout.tsx` - AuthProvider wrapper
-   `app/fr/login/page.tsx` - French login page
-   `app/ar/login/page.tsx` - Arabic login page
-   `app/fr/admin/page.tsx` - Admin dashboard (French)
-   `app/ar/admin/page.tsx` - Admin dashboard (Arabic)
-   `components/AuthProvider.tsx` - Session provider
-   `lib/auth-client.ts` - API client & helpers
-   `.env.local` - Configuration

### Backend Files Created

-   `.env` - Database & JWT configuration
-   Strapi already configured with users-permissions plugin

### Documentation Created

-   `IMPLEMENTATION_SUMMARY.md` - Complete overview
-   `RBAC_SETUP.md` - Role & permission configuration
-   `NEXTAUTH_STRAPI_INTEGRATION.md` - Technical details

---

## 🔐 Available Roles

| Role        | Permissions                                |
| ----------- | ------------------------------------------ |
| **Admin**   | Full access, manage users, system settings |
| **Éditeur** | Create/edit articles & projects, publish   |
| **Lecteur** | Read-only access                           |

---

## 📝 Environment Variables

### Frontend (.env.local)

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generated-secret>
NEXT_PUBLIC_API_URL=http://localhost:1337
```

### Backend (.env)

```env
JWT_SECRET=super_secret_jwt_key_change_in_production_123456
DB_HOST=localhost
DB_PORT=5432
DB_NAME=asselda_db
DB_USERNAME=asselda
DB_PASSWORD=password123
FRONTEND_URL=http://localhost:3000
```

---

## 🧪 Quick Tests

### Test 1: Login

-   [ ] Visit `http://localhost:3000/fr/login`
-   [ ] Login with admin@example.com
-   [ ] Dashboard should display role

### Test 2: Different Roles

-   [ ] Login as Éditeur user
-   [ ] Should see articles & projects options
-   [ ] Cannot see users management (admin-only)

### Test 3: Protected Routes

-   [ ] Try accessing `/fr/admin` without login
-   [ ] Should redirect to `/fr/login`

### Test 4: Arabic Interface

-   [ ] Visit `http://localhost:3000/ar/login`
-   [ ] Login and test dashboard in Arabic

---

## ❓ Troubleshooting

| Issue                | Solution                                             |
| -------------------- | ---------------------------------------------------- |
| Login fails with 401 | Verify Strapi running, check credentials             |
| Role not showing     | Verify user has role assigned in Strapi              |
| CORS error           | Check `NEXT_PUBLIC_API_URL` in frontend `.env.local` |
| Session disappears   | Ensure `NEXTAUTH_SECRET` is set in `.env.local`      |

---

## 📚 Full Documentation

-   **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Complete feature list
-   **[RBAC_SETUP.md](RBAC_SETUP.md)** - Role configuration guide
-   **[NEXTAUTH_STRAPI_INTEGRATION.md](NEXTAUTH_STRAPI_INTEGRATION.md)** - Technical details

---

## 🎯 Next Steps

Once testing is complete:

1. Create article management pages
2. Create project management pages
3. Add user management (admin only)
4. Deploy to production
5. Set up database backups
6. Configure email notifications (optional)

---

**Status**: ✅ Ready to test  
**Last Updated**: May 16, 2026
