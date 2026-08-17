# TESEA CRM Full Deployment Upgrade

This build preserves the existing TESEA standalone application and activates a more complete CRM lifecycle across acquisition, conversion and retention.

## Activated CRM areas
- Lead capture with consent, source, intent score, owner and next action.
- CSV/XLSX ingestion workflow with production validation requirements.
- Lead conversion stages: New → Qualified → Trial/Proposal → Payment → Active.
- Customer 360 linked conceptually to subscription, learning activity and support context.
- Email Campaign Studio for prospects and existing customers.
- Newsletter Centre with subscriber governance.
- Retention desk using renewal, activity, payment and support signals.
- Lifecycle automations for nurture, trial expiry, inactivity and renewal.
- CRM analytics for funnel, attribution and retention.

## Production connectivity
The browser prototype stores sample CRM state in localStorage. Production deployment should connect the contracts in `api/contracts.json` to a server-side database and services for authentication/RBAC, email delivery, payment webhooks, subscription events, learning engagement events, scheduler/worker jobs, consent/suppression management and analytics.

Provider secrets and OAuth/API keys must never be stored in browser localStorage.
