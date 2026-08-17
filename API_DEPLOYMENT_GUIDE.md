# TESEA Production Integration Guide

This package now supports clean HTTP routes for the public landing page and all four authenticated workspaces while preserving hash routes for file-based/static preview.

## Entry points

- Landing page: `/`
- Learner workspace: `/app/learner/dashboard`
- Tutor workspace: `/app/tutor/dashboard`
- Super Admin workspace: `/app/admin/dashboard` (alias `/super-admin`)
- CRM workspace: `/app/crm/dashboard`
- Sign in: `/app/signin`
- Sign up: `/app/signup`
- API: `/api/v1/*`
- Health: `/healthz`
- Readiness: `/readyz`

## Backend structure

`server/src/index.ts` owns HTTP/security/static routing. `server/src/api.ts` implements a deployable TypeScript/Express API scaffold matching the browser API client and OpenAPI boundary. `server/src/store.ts` is a deliberately replaceable in-memory repository used for integration testing and developer hand-off.

Before production launch, replace `store.ts` with PostgreSQL/ORM repositories and real authentication/JWT validation. Provider-specific email, payment, OAuth, live meeting, AI and object-storage adapters must be configured with secret-manager values. Do not move secret values into browser JavaScript.

## Deployment modes

For a same-origin deployment set `API_BASE_URL` to the public app origin and `API_MODE=live`. For a split API deployment set `API_BASE_URL=https://api.example.com`, configure `CORS_ORIGINS`, and deploy the same `/api/v1` contract behind the API host.

Run `npm run build`, then `npm start`. Docker uses the same build/start path.
