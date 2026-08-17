# TESEA Production Routes

## Public / SEO
- `/` landing page
- `/subjects/`
- `/learning-path/`
- `/plans/`
- `/about/`
- `/app/signin`
- `/app/signup`

## Workspace entry points
- `/app/learner/dashboard`
- `/app/tutor/dashboard`
- `/app/admin/dashboard` (Super Admin)
- `/app/crm/dashboard`

Aliases `/learner`, `/tutor`, `/admin`, `/super-admin`, and `/crm` redirect to the corresponding dashboard.

## Workspace deep links
Use `/app/{role}/{page}`. Express validates the role/page combination before serving the SPA shell. Browser Back/Forward uses the History API. The same `assets/app.js` preserves hash routing when opened from the standalone file preview.

## API
- `/api/v1/*` TypeScript/Express API scaffold
- `/healthz`
- `/readyz`
- `/assets/config.js` runtime public configuration
