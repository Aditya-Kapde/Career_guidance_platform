# PathFinder AI — Production Hardening Matrix

This document tracks all defects, architectural shortcomings, and audit findings from the senior developer production audit, along with their verified root causes, implementation fixes, affected files, tests added, and verification status.

---

## Findings & Remediation Matrix

### Finding 1: Deep Links Return 404 (P0)
- **Root Cause**: Vite Single Page Application (SPA) deployed without rewrite rules. Direct URL requests to `/dashboard`, `/assessment`, `/report`, `/results`, or `/career/:careerId` attempted to resolve static files on the server instead of falling back to `/index.html`.
- **Implementation Fix**:
  - Added `frontend/vercel.json` with SPA rewrite rule (`"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]`) and hardened production security headers.
  - Configured proxy and static fallback in backend for monolithic previews.
- **Affected Files**:
  - `frontend/vercel.json`
  - `frontend/vite.config.js`
  - `backend/src/app.js`
- **Tests Added**: TEST GROUP A (Route smoke tests, direct link navigation, refresh survival).
- **Verification Status**: **VERIFIED / PASS**

---

### Finding 2: Assessment State Corruption (P0)
- **Root Cause**:
  1. Questions and responses were indexed by unstable array indices (`0..39`) rather than immutable `questionId`s.
  2. Question array was randomly re-shuffled client-side on mount / stage selection (`0.5 - Math.random()`).
  3. Single-choice auto-advance used an asynchronous `setTimeout(300)` that caused state race conditions upon rapid clicking or `Previous` navigation.
  4. Scoring relied on client-side state mapping instead of server-validated immutable question-response pairs.
- **Implementation Fix**:
  - Refactored `AssessmentContext` to index all state strictly by immutable `questionId`.
  - Replaced client random shuffle with deterministic versioned question catalog.
  - Removed racing timeouts and added transition debounce guards.
  - Implemented server-side response evaluation enforcing question version integrity and question existence.
- **Affected Files**:
  - `frontend/src/context/AssessmentContext.jsx`
  - `frontend/src/pages/Assessment.jsx`
  - `frontend/src/components/QuestionCard.jsx`
  - `backend/src/controllers/assessment.controller.js`
  - `backend/src/services/careerEngine.service.js`
- **Tests Added**: TEST GROUP C & D (`src/tests/assessmentState.test.js`, `src/tests/scoring.test.js`).
- **Verification Status**: **VERIFIED / PASS**

---

### Finding 3: No Real Authentication / Authorization (P0)
- **Root Cause**:
  - Clean browser sessions accessed dashboard/assessment as "Guest Student".
  - Reports were stored in an unauthenticated global in-memory Map keyed by predictable UUIDs and cached in client `localStorage`.
  - Anyone with a report ID could access another student's assessment report without ownership verification.
- **Implementation Fix**:
  - Implemented secure user authentication (Register, Login, Logout, Session Verification) with `bcryptjs` password hashing.
  - Issued JWT tokens in `HttpOnly`, `SameSite=Lax`, `Secure` cookies with Bearer header fallback.
  - Scoped assessment records and reports to authenticated user accounts in server store (`userStore.js`, `reportStore.js`).
  - Added authorization middleware blocking cross-user report and assessment access (`403 Forbidden`).
  - Cleared sensitive report data from client `localStorage`.
- **Affected Files**:
  - `backend/src/models/userStore.js`
  - `backend/src/controllers/auth.controller.js`
  - `backend/src/routes/auth.routes.js`
  - `backend/src/middleware/auth.middleware.js`
  - `backend/src/services/report/reportStore.js`
  - `backend/src/controllers/report.controller.js`
  - `frontend/src/context/AuthContext.jsx`
  - `frontend/src/components/auth/ProtectedRoute.jsx`
  - `frontend/src/services/authApi.js`
- **Tests Added**: TEST GROUP B (`src/tests/auth.test.js`).
- **Verification Status**: **VERIFIED / PASS**

---

### Finding 4: Contradictory Report Data & Schema Gaps (P0)
- **Root Cause**:
  - In `analytics.service.js`, trait names (`logical`, `analytical`, `social`, `practical`) did not match the 15 canonical trait IDs in `master.json` (`logicalThinking`, `analyticalThinking`), triggering fallback calculations.
  - Raw scores (0-15) were mixed directly with percentage metrics (0-100) without explicit normalization.
  - Master questions between frontend (`pattern-1..12`) and backend (`iq-1..10`) were desynchronized.
  - Education level was derived independently and inconsistent across components.
- **Implementation Fix**:
  - Synchronized master question catalogs across frontend and backend.
  - Established canonical `AssessmentResult` and `UnifiedReport` schema with explicit `rawScores` (0-15), `normalizedScores` (0-100), and `dominantTraits`.
  - Added schema validation at API boundaries that fails closed on corrupted data.
- **Affected Files**:
  - `backend/src/services/report/analytics.service.js`
  - `backend/src/services/report/reportBuilder.js`
  - `backend/src/services/report/report.types.js`
  - `backend/src/data/master.json`
  - `frontend/src/data/questions.json`
  - `frontend/src/components/report/*`
- **Tests Added**: TEST GROUP E (`src/tests/reportConsistency.test.js`).
- **Verification Status**: **VERIFIED / PASS**

---

### Finding 5: Career Roadmap Contamination (P1)
- **Root Cause**:
  - `DOMAIN_PROFILES` in `flowTree.service.js` used substring matches (`matches: ['engineer', 'civil']`), causing Civil Engineer to match Tech (software/CTO track) and Law (advocate track).
  - `careerKnowledgeBase.json` had software engineering certifications (AWS, CompTIA) mistakenly hardcoded on the Civil Engineer profile.
- **Implementation Fix**:
  - Replaced substring matching in `flowTree.service.js` with explicit domain keys and specialized STEM Engineering profiles.
  - Cleaned `careerKnowledgeBase.json` civil engineering certifications (AutoCAD, STAAD.Pro, LEED, PMP).
  - Enforced strict validation: `roadmap.careerId === selectedCareer.id`.
- **Affected Files**:
  - `backend/src/services/flowTree.service.js`
  - `backend/src/data/careerKnowledgeBase.json`
  - `backend/src/services/report/roadmap.service.js`
- **Tests Added**: TEST GROUP F (`src/tests/roadmapIsolation.test.js`).
- **Verification Status**: **VERIFIED / PASS**

---

### Finding 6: Accessibility Gaps (P1)
- **Root Cause**:
  - Assessment options were rendered as clickable `<div>`s instead of semantic radio buttons and fieldsets.
  - Pattern SVGs had missing accessible labels/alt text.
  - Question changes lacked screen reader announcements and visible keyboard focus management.
- **Implementation Fix**:
  - Converted question cards to semantic `<fieldset>` with `<legend>` and `<input type="radio">`.
  - Added keyboard navigation support (Arrow keys, Enter, Space).
  - Added `aria-live="polite"` region for question and progress announcements.
  - Added meaningful `alt` text and ARIA descriptions to spatial pattern tiles.
- **Affected Files**:
  - `frontend/src/components/QuestionCard.jsx`
  - `frontend/src/components/PatternTile.jsx`
  - `frontend/src/pages/Assessment.jsx`
- **Tests Added**: TEST GROUP I.
- **Verification Status**: **VERIFIED / PASS**

---

### Finding 7: Unsupported Authority & Certainty Claims (P1)
- **Root Cause**:
  - Marketing copy and report headers used unsubstantiated badges ("OFFICIAL CAREER INTELLIGENCE REPORT", "Verified Analysis").
  - `report.utils.js` generated random confidence scores (`Math.floor(Math.random() * 20 + 80)`).
- **Implementation Fix**:
  - Replaced inflated terminology with transparent, grounded wording ("Career Guidance Report", "Trait Profile", "Assessment Results").
  - Removed pseudo-random confidence generators; documented scoring methodology clearly.
  - Added explicit ethical disclaimer clarifying that the tool is an educational guidance aid, not a clinical psychometric diagnosis.
- **Affected Files**:
  - `frontend/src/components/report/ReportHeader.jsx`
  - `frontend/src/components/report/ReportFooter.jsx`
  - `backend/src/services/report/report.utils.js`
  - `backend/src/services/report/reportBuilder.js`
- **Verification Status**: **VERIFIED / PASS**

---

### Finding 8: Weak Frontend Security Headers, Secrets & Monitoring (P1)
- **Root Cause**:
  - Missing Content Security Policy (CSP), Strict-Transport-Security (HSTS), and Permissions-Policy.
  - Unstructured console logging without structured error handling on API boundaries.
- **Implementation Fix**:
  - Configured robust CSP, HSTS, X-Frame-Options, and X-Content-Type-Options in backend middleware and `vercel.json`.
  - Added centralized error handler sanitizing production stack traces.
  - Enforced strict backend-only Groq API key handling.
- **Affected Files**:
  - `backend/src/app.js`
  - `backend/src/middleware/errorHandler.js`
  - `frontend/vercel.json`
- **Tests Added**: TEST GROUP B & Backend security assertions.
- **Verification Status**: **VERIFIED / PASS**

---

### Finding 9: Incorrect/Placeholder Page Title & Marketing Data (Addl)
- **Root Cause**:
  - `frontend/index.html` title was set to `frontend`.
  - Landing page displayed hardcoded static results ("88/100", "Top 5% Match") without clear indication that they were demo illustrations.
- **Implementation Fix**:
  - Updated title to `PathFinder AI — Career Guidance & Assessment Platform` with Open Graph tags and meta description.
  - Added clear "Sample Report Preview" badge to onboarding illustrations.
- **Affected Files**:
  - `frontend/index.html`
  - `frontend/src/pages/Onboarding.jsx`
- **Verification Status**: **VERIFIED / PASS**

---

### Finding 10: PDF Export Lacked Visible Status States (Addl)
- **Root Cause**: PDF generation triggered direct URL navigation without real-time UI state (generating / success / failure toast).
- **Implementation Fix**:
  - Implemented async download handler with modal/toast progress indicators and error recovery.
  - Added PDF buffer verification and mime-type assertions.
- **Affected Files**:
  - `frontend/src/pages/Report.jsx`
  - `frontend/src/components/layout/Header.jsx`
  - `backend/src/services/pdf.service.js`
  - `backend/src/controllers/report.controller.js`
- **Tests Added**: TEST GROUP H.
- **Verification Status**: **VERIFIED / PASS**
