# Archived documentation

These documents are kept for reference only. **None of them describe the current
codebase**, and following them will not work.

## Describes features that were never built

| File | Why it is archived |
|---|---|
| `NEXTAUTH_STRAPI_INTEGRATION.md` | Describes a NextAuth + Strapi login integration that does not exist. Nothing in the frontend ever imported `next-auth`, and the dependency was removed during the redesign. |
| `RBAC_SETUP.md` | Describes a role-and-permission system built on that integration. Also never built. |
| `QUICK_START.md` | "Authentication Setup — run in 5 minutes", for the same non-existent system. |
| `IMPLEMENTATION_SUMMARY.md` | Titled "Phase 3: Authentication & Access Control — Implementation Summary" and marks that work as completed. It was not. |

If the association does want an admin login layer, these are a reasonable
starting point for the *design*, but `next-auth` would have to be reinstalled and
the whole thing implemented from scratch.

## Describes the previous frontend

| File | Superseded by |
|---|---|
| `CONTACT_FORM_IMPLEMENTATION.md` | The form now posts through a Server Action in `apps/frontend/lib/forms/actions.ts`, with shared validation in `validation.ts`. |
| `FOOTER_DOCUMENTATION.md` | The footer is `apps/frontend/components/layout/Footer.tsx`, generated from `lib/navigation.ts`. The language system is `lib/i18n/`. |

## Current documentation

- `apps/frontend/README.md` — architecture, conventions, and the image audit
- `docs/AUDIT-AND-ROADMAP.md` — outstanding issues and priorities
- `docs/superpowers/specs/` — the redesign design record
- `docs/Maquettes/` — the original design mockups
