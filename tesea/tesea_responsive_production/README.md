# TESEA NECTA CBL LMS — Production-Ready Front-End Prototype

This build preserves the previous standalone platform and repairs the internal learner course route, public anchor targets and navigation/back-link pathways. It adds a boxed low-distraction landing page, sign-in/sign-up interfaces, Google/Microsoft OAuth-ready flows, and a front-end API adapter with mock fallback.

## Run
Open `index.html` directly for mock mode. For production API calls, edit `assets/config.js` and set `apiBaseUrl`, `mode: "live"`, and OAuth client/redirect settings.

## Connected dashboard logic
Learner assessment submissions, Rafiki requests, account events, tutor/admin save actions and AI draft generation write to a shared event store. Learner, Tutor and Super Admin dashboards display the same recent activity pathway. In live mode the same mutations POST to `/api/v1/events`.

## API files
- `api/contracts.json` — implementation contract for authentication, curriculum, learning, assessment, mastery, tutor/admin actions, Rafiki AI and shared events.
- `assets/api-contracts.js` — browser-readable copy of the contracts.
- `assets/api-client.js` — mock/live adapter.
- `assets/config.js` — environment configuration.

## OAuth
Google and Microsoft buttons work in local demo mode. In production, configure the provider client ID/redirect URI and implement the documented server endpoints. Do not place client secrets in this front-end package.

## Preserved files
Previous entry, JavaScript and CSS snapshots are retained as `legacy-index-preserved.html`, `assets/app.legacy-preserved.js`, and `assets/app.legacy-preserved.css`.


## Tutor Content Studio Upgrade

The tutor workspace now uses dedicated production interfaces for Interactive Text, Video, Audio, PDF, Shorts and Live Lessons. Each studio includes curriculum mapping, format-specific ingestion, production controls, quality/accessibility checks, metadata, publishing state, version actions, reviewer assignment and time-saving batch/template workflows. Resource cards and production-queue items route directly to these studios instead of opening a generic modal.

## Advanced Tutor Assessment Studio

The Tutor Assessment Studio now uses dedicated full-page builders rather than a generic creation modal. Dedicated routes are provided for Assignment, Quiz, Test and Exam authoring. Each builder starts with NECTA curriculum/outcome mapping, then applies an assessment blueprint, draws from the outcome-mapped question bank, configures format-specific delivery/marking rules, runs QA, and publishes or schedules the assessment.

Rafiki AI is provisioned as an assessment co-pilot for blueprint generation, question drafting/variation, distractor quality, mark schemes and rubrics, ambiguity/readability review, post-attempt item analysis, misconception diagnosis and targeted reassessment. Tutor approval remains the control point for generated or changed assessment content.


## Tutor Live Lessons upgrade

The Tutor Workspace now includes a focused Live Lessons operating model with three linked views: Live Lessons overview, Focused Live Teaching Studio, and Meeting Integrations. Sessions are mapped to one primary NECTA learning outcome and one explicit evidence goal before a provider can be scheduled.

The standalone prototype includes simulated connection controls for Zoom, Microsoft Teams and Google Meet. Production deployments should implement provider OAuth/token exchange on the backend and keep provider client secrets and refresh tokens out of browser storage. The included API contracts define connection, session creation/update, webhook, attendance and recording-import endpoints.

The live workflow covers pre-session reminders, diagnostic polls, agenda segments, attached resources, attendance capture, recordings/transcripts, exit evidence and automated intervention lists. Attendance is deliberately not treated as competence evidence by itself.


## Community Center upgrade
Added a curriculum-linked Community Center shared by learners, tutors and Super Admin moderators. Learners can participate in subject/topic discussions and peer-to-peer learning; verified tutors can guide, pin model explanations, seed prompts and escalate cases; Super Admin receives a dedicated moderation queue. Rafiki Community Moderator is provisioned as an assistive screening layer for safety, spam, off-topic content and likely active-assessment answer sharing. Human moderators remain the final authority for enforcement decisions.


## Question Bank & Learner Assessment Evidence Upgrade

- Tutor Question Bank now includes dedicated bulk ingestion and Rafiki AI generation workspaces.
- Bulk ingestion UI supports CSV, XLSX, JSON, QTI 2.1, Moodle XML, DOCX and PDF, with mapping profiles, staging, duplicate detection and outcome validation.
- AI generation is blueprint-driven and outcome-locked; generated items are staged for tutor review and never auto-published.
- Learner Assessment Evidence centre includes dedicated Guided Practice, Assignment, Topic Test and Exam interfaces.
- Evidence is displayed by learning outcome and connected to progression rules: Advance >= 80%, Reinforce 60-79%, Relearn < 60%.
- Production API contract placeholders were added for question imports, AI generation, learner submissions and assessment attempts.


## Tutor Class Management Upgrade

Added a dedicated Create Class studio and full Class Management workspace. Tutors can define Form, subject, section, academic period and mapped NECTA outcomes; ingest rosters by paste, CSV/XLSX, join code or existing cohort; and save reusable defaults for assessments, live teaching and community operations.

Each class now acts as a shared delivery cohort across Assessment Studio and Live Lessons. The class workspace includes outcome progress, roster/evidence access, assigned assignments/tests/exams, live teaching sessions, quick intervention actions and a dedicated Assignment Centre. Assessment builders and Live Lesson Studio can be launched directly from a class so the selected class becomes the intended delivery cohort.
