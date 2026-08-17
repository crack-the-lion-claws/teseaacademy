# TESEA Production Integration Logic

The browser is a presentation client. Authentication, authorization, payments, AI calls, meeting-provider credentials, email delivery, bulk imports and moderation enforcement must be executed by trusted server-side services.

## Core request path

`Browser → HTTPS edge/CDN → TESEA Web → TESEA API → domain service → PostgreSQL / object storage / queue → provider adapter`

Authenticated browser calls use short-lived access tokens. Refresh sessions should use secure, HttpOnly, SameSite cookies. Every privileged write is re-authorized server-side against role plus resource scope.

## Event path

`Domain write → transactional outbox → queue/event bus → subscribers → analytics / CRM / notifications / evidence engine / audit`

Use stable event IDs and idempotent consumers. This prevents duplicate emails, duplicate rewards, duplicate CRM conversions or repeated payment processing when providers retry webhooks.

## Learning evidence

`Lesson/practice/assessment event → evidence normalizer → outcome evidence ledger → progression policy → Advance | Reinforce | Relearn → learner/tutor notification`

Formal progression must use independently controlled evidence. AI-generated practice is formative unless an approved assessment policy explicitly states otherwise.

## AI/Rafiki

`User request → policy/role check → curriculum retrieval → provider abstraction → safety/quality filters → draft/result → human approval when required → audit metadata`

Question generation, moderation and support triage must not auto-publish irreversible decisions. Store model/provider/version, prompt template version and reviewer state for traceability.

## Payments/subscriptions

`Checkout request → payment adapter → provider checkout → signed webhook → idempotent payment ledger → subscription entitlement → CRM/customer event`

Never trust browser success redirects as proof of payment. Subscription validity is based on verified provider events and the server billing ledger.

## Email/CRM

`CRM audience query → consent/suppression check → frequency cap → campaign job → provider send → delivery/click webhook → attribution → conversion/retention analytics`

Unsubscribe and suppression checks occur again at send time. Do not rely only on audience state captured when a campaign was created.

## Live lessons

`Tutor schedule → meeting adapter → Zoom/Teams/Google Meet API → encrypted provider connection → meeting metadata → attendance/recording webhook → evidence review`

OAuth refresh tokens and service-account credentials belong in a secret manager. Browser clients receive only join/start URLs allowed for the current user.

## Media/content

`Create upload session → signed object-storage upload → malware/content validation → transcode/OCR/transcription job → metadata review → publish`

Use immutable source assets and versioned derived assets. Large media must bypass the web process and upload directly to object storage.

## Community moderation

`Post → automated screening → visible/held decision → report/escalation → moderator case → hide/delete/restore → audit event`

Hide is reversible and removes normal community visibility. Delete is a privileged enforcement operation with retained audit metadata according to policy.

## Security baseline

Use TLS, CSP, HSTS, rate limits, WAF where appropriate, MFA for privileged accounts, audit retention, secret rotation, encrypted backups, dependency scanning, SAST/DAST and least-privilege service identities.
