# TESEA API Pathways

## 1. Authentication
Browser -> `/auth/signup` or `/auth/signin` -> Auth service -> user + role + access token -> role workspace.

Google/Microsoft: Browser -> `/auth/oauth/{provider}/start` -> provider consent -> `/auth/oauth/{provider}/callback` -> Auth service -> TESEA session -> dashboard. Provider client secrets stay server-side.

## 2. Learner competence pathway
Curriculum API -> course/topic/outcome -> lesson API -> learning-event API -> assessment submission -> mastery evidence -> recommendation engine -> next lesson / targeted relearning.

## 3. Tutor pathway
Tutor class API -> learner mastery evidence -> intervention queue -> content/assessment authoring -> publish/assign -> learner workspace -> submission -> tutor review -> mastery evidence update.

## 4. Super Admin pathway
Curriculum governance -> content review -> publishing -> entitlement policy -> learner/tutor delivery. Admin analytics consumes learning, assessment, subscription and platform-event streams.

## 5. Rafiki AI pathway
Learner/tutor request -> outcome/context resolver -> Rafiki AI service -> response or question draft -> review/guardrail layer -> learner practice or question bank. Formal mastery must come from approved evidence, not from unreviewed AI output.

## 6. Shared platform event pathway
Learner, tutor and admin mutations -> `/events` -> event store -> dashboard activity, analytics and notifications. The standalone build mirrors this with `localStorage` so the user journey can be tested before a backend is connected.
