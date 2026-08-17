# TESEA Academy — Integrations & Developer Handover Guide

This guide details how incoming developers can attach the **Rafiki AI Engine** and **Payment Gateway (AzamPay / Selcom / M-Pesa / DPO / Stripe)** to TESEA Academy.

All API routes and configuration endpoints have been established as clean, production-ready contract boundaries.

---

## 🤖 1. Rafiki AI Engine Integration

### Configuration Points
Configuration is managed in `.env` and exposed via runtime endpoint `/assets/config.js` (`window.TESEA_CONFIG.rafikiAi`).

```env
RAFIKI_AI_ENABLED=true
RAFIKI_AI_PROVIDER=custom          # Options: custom, gemini, openai, anthropic
RAFIKI_AI_MODEL=gemini-1.5-flash
RAFIKI_AI_ENDPOINT=https://ai.teseaacademy.ac.tz/v1/chat
RAFIKI_AI_API_KEY=your_live_api_key
RAFIKI_AI_MAX_TOKENS=2048
RAFIKI_AI_TEMPERATURE=0.7
RAFIKI_AI_SYSTEM_PROMPT="You are Rafiki AI, the official outcome-mapped learning assistant for TESEA Academy."
```

### API Contracts
| Method | Endpoint | Description | Expected Handler File |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/ai/config` | Returns current AI engine status and parameters | `server/src/api.ts` |
| `POST` | `/api/v1/ai/chat` | Handles Rafiki student chat & tutoring queries | `server/src/api.ts` |
| `POST` | `/api/v1/ai/generate` | Generates outcome-mapped assessment drafts | `server/src/api.ts` |

### Integration Instructions for AI Developer
1. Open `server/src/api.ts`.
2. Locate the `/ai/chat` and `/ai/generate` routes.
3. Replace the contract stub logic with your preferred AI SDK call (e.g., `@google/genai`, `openai`, or custom Axios request to your internal AI microservice).
4. Use `process.env.RAFIKI_AI_API_KEY` for authentication.

---

## 💳 2. Payment Gateway Integration (AzamPay, Selcom, M-Pesa, Stripe)

### Configuration Points
Configuration is managed in `.env` and exposed via runtime endpoint `/assets/config.js` (`window.TESEA_CONFIG.payment`).

```env
PAYMENT_ENABLED=true
PAYMENT_PROVIDER=azampay             # Options: azampay, selcom, mpesa, dpo, stripe
PAYMENT_MODE=sandbox                # Options: sandbox, production
PAYMENT_CURRENCY=TZS
PAYMENT_MERCHANT_ID=your_merchant_id
PAYMENT_PUBLIC_KEY=your_public_key
PAYMENT_SECRET_KEY=your_secret_key
PAYMENT_WEBHOOK_SECRET=your_webhook_signing_secret
PAYMENT_CALLBACK_URL=https://api.teseaacademy.ac.tz/api/v1/payments/webhook
PAYMENT_SUCCESS_URL=https://teseaacademy.ac.tz/app/learner/subscription?status=success
PAYMENT_CANCEL_URL=https://teseaacademy.ac.tz/app/learner/subscription?status=cancelled
```

### API Contracts
| Method | Endpoint | Description | Expected Handler File |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/payments/config` | Returns Gateway readiness and merchant settings | `server/src/api.ts` |
| `POST` | `/api/v1/payments/checkout` | Initiates payment session (AzamPay/Selcom/M-Pesa push) | `server/src/api.ts` |
| `GET` | `/api/v1/payments/verify/:transactionId` | Verifies status of a transaction | `server/src/api.ts` |
| `POST` | `/api/v1/payments/webhook` | Receives Instant Payment Notifications (IPN) / Webhooks | `server/src/api.ts` |

### Integration Instructions for Payment Developer
1. Open `server/src/api.ts`.
2. Locate the `/payments/checkout`, `/payments/verify/:transactionId`, and `/payments/webhook` routes.
3. Replace the contract stub logic with your Payment Gateway SDK calls (e.g. AzamPay Checkout API, Selcom Payment Gateway, Vodacom M-Pesa OpenAPI).
4. Handle the IPN webhook in `/payments/webhook` to update user subscription state in Firestore or primary database.

---
© TESEA Academy — Engineering & Integration Handover.
