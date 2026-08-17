# TESEA Academy — Full-Stack Production Handoff

This package preserves the TESEA NECTA CBL UI and repairs routing so it can be handed to a full-stack developer as one deployable TypeScript/Express project. The public landing page, learner workspace, tutor workspace, Super Admin workspace and CRM workspace are all reachable through stable clean URLs.

## Start locally

1. `npm install`
2. `cp .env.example .env`
3. For same-origin local API testing set `API_BASE_URL=http://localhost:8080` and `API_MODE=live`.
4. `npm run dev`
5. Open `http://localhost:8080/`

A file-based landing preview is also included as `standalone-landing.html`. It falls back to hash navigation because clean History API routes require an HTTP server.

## Production URLs

- Landing: `/`
- Learner: `/app/learner/dashboard`
- Tutor: `/app/tutor/dashboard`
- Super Admin: `/app/admin/dashboard`
- CRM: `/app/crm/dashboard`
- Sign in: `/app/signin`
- Sign up: `/app/signup`

Back/Forward navigation, direct deep links and role/page validation are handled consistently. Static assets use root-safe paths during HTTP deployment, preventing nested route failures such as `/app/learner/assets/app.css`.

## API contract and backend scaffold

The API contract is defined in `api/openapi.yaml`, `api/contracts.json`, and `assets/api-contracts.js`. The browser client calls `/api/v1/*` when `API_MODE=live`.

`server/src/api.ts` implements development/integration endpoints for authentication, users, curriculum, lessons, assessments, classes, community moderation, subscriptions, CRM, support, announcements, platform settings and events. `server/src/store.ts` is an intentionally replaceable in-memory repository. Replace it with PostgreSQL/ORM repositories and real JWT/session verification before launch.

External integrations—email, payments, OAuth, Zoom/Teams/Meet, AI and object storage—remain adapter boundaries and require provider credentials through the deployment secret manager.

## Build and deploy

- Development: `npm run dev`
- Route audit: `npm run audit`
- Compile: `npm run build`
- Production: `npm start`
- Container: build from the included `Dockerfile`

Recommended topology:

`CDN/WAF -> TESEA Express web/API container -> PostgreSQL + Redis/queue + object storage -> external providers`

For split web/API hosting, set `API_BASE_URL` to the API origin and configure `CORS_ORIGINS`. For same-origin hosting, set it to the public TESEA origin.

## Production hardening still required

The package is deployment-oriented, not a substitute for infrastructure provisioning. Before go-live, configure real database migrations, password hashing/identity provider, JWT/session validation, RBAC middleware, audit persistence, payment/email webhooks, object storage, monitoring, backups, CI/CD and secrets management.
