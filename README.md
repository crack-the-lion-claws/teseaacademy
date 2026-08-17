# TESEA Academy — NECTA Competence-Based Learning Platform (CBL LMS)

TESEA Academy is an outcome-mapped, competence-based Learning Management System (LMS) designed specifically for Forms 1–6 secondary education under the NECTA syllabus framework in Tanzania. 

The platform connects curriculum outcomes, interactive learning content, guided practice, tutor interventions, assessment evidence, and live classroom tools into a unified web application.

---

## 🌟 Key Platform Features

### 1. Learner Workspace
- **Competence-Based Learning Path**: Step-by-step navigation from diagnosis to learning, practice, application, mastery checks, gap relearning, and outcome demonstration.
- **27 Mapped Subject Pathways**: Full coverage of Form 1–6 NECTA subjects (Biology, Mathematics, Physics, Chemistry, Geography, History, Civics, Literature, etc.).
- **Multi-Format Lessons**: Supports Interactive Text, Video, Audio, PDF Notes, Shorts, and Live Lessons.
- **Real-Time Outcome Progress & Evidence**: Progression status driven by assessment evidence (Advance $\ge$ 80%, Reinforce 60–79%, Relearn < 60%).
- **Cloud Account Synchronization**: User state, progress, assessment history, and evidence ledgers are automatically synchronized to Firebase Cloud Firestore using the user's Account ID.

### 2. Tutor & Teacher Workspace
- **Tutor Content Studio**: Specialized creation and publishing tools for Interactive Text, Video, Audio, PDF, Shorts, and Live Lessons mapped directly to NECTA learning outcomes.
- **Advanced Assessment Studio**: Full-page builders for Assignment, Quiz, Topic Test, and Exam authoring with outcome-mapped blueprints and rubrics.
- **Question Bank & Bulk Ingestion**:
  - Outcome-locked Question Bank.
  - Bulk ingestion supporting CSV, XLSX, JSON, QTI 2.1, Moodle XML, DOCX, and PDF formats with validation and duplicate checks.
  - Rafiki AI co-pilot for blueprint generation, question drafting, distractor quality analysis, and misconception diagnosis with tutor review control.
- **Class & Cohort Management**:
  - Class creation studio with Form, Subject, Section, and Term configuration.
  - Roster management (paste, CSV/XLSX, join code) and student evidence tracking.
  - Reusable defaults for assessments, live teaching, and interventions.
- **Focused Live Teaching Studio**: Scheduled live sessions mapped to specific learning outcomes, attendance tracking, diagnostic polls, and session recordings.

### 3. Super Admin & Operations
- **Curriculum & Outcome Management**: Configure and update NECTA syllabus trees, topics, sub-topics, and learning outcomes.
- **Moderation Queue & Community Center**: Platform-wide discussion channels with moderation tools, report handling, policy controls, and audit trails.
- **CRM & Stakeholder Workflows**: Manage leads, school partnerships, support cases, and communication campaigns.

### 4. Authentication & Security
- **Firebase Authentication**: Email & Password sign-in, account creation, and password reset.
- **OAuth Ready**: Google and Microsoft sign-in integration support.
- **Account-Based Data Persistence**: User progress is tied directly to the user's unique Account ID (`uid`) in cloud database storage, ensuring seamless access across multiple devices.

---

## 🏗️ Architecture & Technology Stack

- **Frontend**: Vanilla HTML5, Modern Modular JavaScript (ES2022+), CSS3 with CSS Variables & Responsive Layouts.
- **Backend API**: Node.js, Express, TypeScript (`server/src/index.ts`).
- **Database & Auth**: Firebase Authentication & Firebase Firestore Database.
- **Security**: Helmet headers, Rate Limiting, CORS configuration, and strict Firestore Security Rules (`firestore.rules`).

---

## 🚀 Getting Started & Deployment

### Environment Setup
1. Clone the repository to your server or local machine.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running in Development Mode
Start the Node.js server in development mode:
```bash
npm run dev
```
The application will serve on port `3000` by default.

### Production Build & Deployment
1. Build the TypeScript server:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

---

## 📁 Directory Structure

```
├── assets/
│   ├── app.js               # Main application logic & client routing
│   ├── firebase-service.js   # Firebase Auth & Firestore synchronization
│   ├── compatibility.css    # UI styling, layout fixes & brand presentation
│   ├── config.js            # Environment configuration & API baselines
│   └── tesea-logo.png       # Official TESEA Academy logo mark
├── server/
│   ├── src/
│   │   └── index.ts         # Express production server & API routes
│   └── tsconfig.json        # TypeScript configuration for server
├── firebase-applet-config.json # Firebase SDK initialization configuration
├── firebase-blueprint.json  # Database collection schema definitions
├── firestore.rules          # Firestore security & access rules
├── index.html               # Main application entry point
├── package.json             # Node.js project manifest & dependencies
└── README.md                # System documentation
```

---

## 🔒 Security & Privacy
- User passwords and credentials are managed securely via Firebase Auth.
- Database access is governed by Firestore security rules, allowing users to access and update only their authorized profile and learning evidence records.
- No sensitive API keys or credentials are exposed to the client bundle.

---
© TESEA Academy — Competence-Based Learning Platform.
