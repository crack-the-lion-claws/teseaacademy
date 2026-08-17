# TESEA Link and Interface Audit

Audit scope: public landing page, learner workspace, tutor workspace, Super Admin workspace, CRM, authentication, modal actions, lesson modes and API boot files.

## Repairs made
- Fixed learner Subject -> Course route. The prior `course` state existed but was not handled by `learnerPage()`, which returned the dashboard.
- Added valid landing anchors for Learning Path, Subjects and Access.
- Added sign-in and sign-up routes plus website backlinks.
- Added persistent in-app back navigation in authenticated workspaces.
- Linked the TESEA logo back to the public website.
- Added sign-out pathway.
- Added action attributes to previously inert buttons/tabs, including assessment tabs, tutor class controls, assessment review/marking, live lesson edit, subscription plan controls, entitlement controls, governance records, school accounts and support records.
- Added shared learner/tutor/admin activity events so mutations are visible across dashboard roles.
- Added API adapter, contracts and OAuth provider configuration paths.

## Static QA checks
- JavaScript syntax checked with Node.
- Public hash anchors resolve to existing IDs.
- No rendered button template remains without a navigation/action/data binding.
- API boot files referenced by `index.html` exist.
- Previous UI source is preserved in legacy snapshot files.

## Production boundary
Google and Microsoft buttons run a local demo session until real OAuth client IDs, redirect URIs and server endpoints are configured. Client secrets must never be stored in this package.
