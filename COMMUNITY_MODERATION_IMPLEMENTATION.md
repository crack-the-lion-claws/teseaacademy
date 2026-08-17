# TESEA Community Moderation — Super Admin

This build preserves the uploaded Tutor Class Management package and activates a dedicated Super Admin Community Moderation workspace.

## Activated flows
- Unified queue for Rafiki AI flags, tutor escalations and learner/tutor reports.
- Risk/severity context and subject/topic channel context.
- **Hide** immediately removes a discussion from Learner and Tutor Community Center views while keeping it available for audit/appeal.
- **Delete** soft-deletes a discussion from normal community views and records the moderation action.
- **Restore** returns hidden/deleted content to the community after review.
- **Dismiss flag** resolves a false-positive moderation case.
- Learner/Tutor Report actions now create Super Admin moderation cases.
- Tutor Escalate creates a high-priority Super Admin case.
- Moderation activity is persisted in the standalone prototype via `localStorage`.

## Production connectivity
Use the contracts in `api/contracts.json` and `api/openapi.yaml`. Enforcement must be server-authoritative. Store immutable audit events, require Super Admin/moderator RBAC, and use soft deletion/retention policies appropriate to the organisation. Rafiki AI should provide triage scores and recommendations, not final enforcement authority.


## Integrated build verification

This preserved build integrates Community Moderation with the active CRM-enabled TESEA application. Super Admin actions operate on the same persisted Community Center state used by learner and tutor views.

- Hide: removes the discussion from learner/tutor Community Center rendering while retaining the record for audit and appeal.
- Delete: removes the discussion from normal community rendering and records an enforcement audit event.
- Restore: republishes previously hidden/deleted content.
- Rafiki AI flags, tutor escalations and user reports converge into the same moderation queue.
- All moderation actions are designed for server-side RBAC and immutable audit logging in production.
