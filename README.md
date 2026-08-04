# 🎓 AI-Powered Student Career Guidance Platform

A comprehensive, enterprise-grade AI-driven career guidance application that evaluates student traits, skills, and preferences to provide highly personalized career recommendations and deep analytics.

## 🌟 Key Features

### 1. **Advanced Analytics Engine**
- **Deterministic Analytics:** Calculates deterministic metrics based on student traits without relying solely on LLMs.
- **Career Readiness Score:** Computes a 0-100 score indicating how well-aligned a student's foundational traits are with their top career matches.
- **Trait Rankings & Dominant Traits:** Identifies core strengths and areas for development.
- **Learning Profiles:** Infers preferred learning styles (Visual, Analytical, Collaborative, etc.) with a calculated confidence rating.
- **Interest & Strength Distributions:** Categorizes career interests and maps traits into overarching strength buckets (Technical, Leadership, Execution, etc.).

### 2. **AI-Enhanced Personalization**
- Utilizes the Groq API (LLaMA model) to generate tailored insights, executive summaries, and actionable study tips based on the student's unique profile.

### 3. **Premium Student Report Dashboard**
- A state-of-the-art, Notion/Linear-inspired report dashboard that consumes a unified data layer.
- **Data Visualizations:** Utilizes Recharts to render Trait Radars, Career Compatibility horizontal bar charts, Career Readiness circular progress rings, and Interest Distribution pie charts.

### 4. **Dynamic Assessments**
- Evaluates student traits dynamically and maps them against a robust local career library to find highly accurate compatibility scores.

### 5. **Interactive Flow Diagrams**
- Built with React Flow, providing visual representations of step-by-step career roadmaps.

---

## 🚀 Tech Stack

### Frontend Architecture
- **Framework:** React 19, Vite
- **Styling:** Tailwind CSS 4, Framer Motion
- **Data Visualization:** Recharts
- **Interactive UI:** React Flow (`@xyflow/react`), Lucide React (Icons)
- **Routing & Networking:** React Router DOM, Axios

### Backend Architecture
- **Runtime:** Node.js, Express
- **AI Integration:** Groq SDK
- **Data Layer:** In-memory deterministic Unified Report builder
- **Utilities:** dotenv, cors

---

## 📂 Project Structure

### Backend
```text
backend/
├── src/
│   ├── app.js                          # Main Express application entry & routing setup
│   ├── controllers/
│   │   ├── assessment.controller.js    # Handles assessment submission and analysis
│   │   ├── report.controller.js        # Handles fetching the unified report
│   │   ├── roadmap.controller.js       # Handles roadmap retrieval
│   │   └── flowTree.controller.js      # Handles flow tree retrieval
│   ├── routes/
│   │   ├── assessment.routes.js        # POST /api/assessment/analyze
│   │   ├── report.routes.js            # GET /api/report/latest
│   │   ├── roadmap.routes.js           # GET /api/roadmaps/:careerId
│   │   └── flowTree.routes.js          # GET /api/flow-tree/:careerId
│   ├── services/
│   │   ├── report/                     # 🆕 Unified Report Data Layer
│   │   │   ├── analytics.service.js    # Deterministic analytics engine
│   │   │   ├── reportBuilder.js        # Aggregates AI & Engine data into Unified Object
│   │   │   ├── reportStore.js          # In-memory store for generated reports
│   │   │   ├── report.utils.js         # Helper functions
│   │   │   └── report.types.js         # JSDoc type definitions for the Report object
│   │   ├── careerEngine.service.js     # Deterministic career matching algorithm
│   │   ├── groq.service.js             # LLM prompt generation and Groq API calls
│   │   ├── roadmap.service.js          # Roadmap data fetching
│   │   └── flowTree.service.js         # Flow tree data fetching
│   ├── data/                           # JSON databases (master.json, careerLibrary.json)
│   └── prompts/                        # LLM prompt templates
└── package.json
```

### Frontend
```text
frontend/
├── src/
│   ├── App.jsx                         # Application router setup
│   ├── pages/
│   │   ├── Onboarding.jsx              # Landing page
│   │   ├── Assessment.jsx              # Assessment form
│   │   ├── Loading.jsx                 # Transition states
│   │   ├── Results.jsx                 # Legacy AI results view
│   │   ├── Report.jsx                  # 🆕 Premium Student Report Dashboard
│   │   └── CareerRoadmap.jsx           # React Flow integration
│   ├── components/
│   │   └── report/                     # 🆕 Report Visualization Components
│   │       ├── TraitRadar.jsx          # Recharts Radar Chart
│   │       ├── TraitRanking.jsx        # Recharts Bar Chart
│   │       ├── CareerCompatibility.jsx # Recharts Bar Chart
│   │       ├── InterestDistribution.jsx# Recharts Pie Chart
│   │       ├── CareerReadinessCard.jsx # Circular Progress Card
│   │       ├── LearningProfileCard.jsx
│   │       ├── ExecutiveSummary.jsx
│   │       ├── CareerCards.jsx
│   │       └── ... (Strengths, Development Areas, AI Insights)
│   ├── context/
│   │   └── AssessmentContext.jsx       # Global state management
│   ├── assets/                         # Static assets
│   └── index.css                       # Global Tailwind directives
├── tailwind.config.js
└── package.json
```

---

## 🔌 API Endpoints

### Assessment
- **`POST /api/assessment/analyze`**
  - **Payload:** `{ educationLevel: string, responses: object, traitScores: object }`
  - **Description:** Submits assessment data. Internally triggers the deterministic compatibility engine and Groq AI service, generates a `UnifiedReport` object, saves it in-memory, and returns the legacy response payload.

### Report Data Layer
- **`GET /api/report/latest`**
  - **Description:** Retrieves the comprehensive `UnifiedReport` object for the most recently analyzed assessment.
  - **Response:** Contains `student`, `assessmentMetadata`, `traitScores`, `analytics` (rankings, readiness, confidence, learning profile, distributions), `careerRoadmaps`, and `aiInsights`.

### Careers & Roadmaps
- **`GET /api/roadmaps/:careerId`**
  - **Description:** Retrieves the structured roadmap milestones for a specific career.
- **`GET /api/flow-tree/:careerId`**
  - **Description:** Retrieves the React Flow nodes and edges for visualizing a career path.
- **`GET /api/health`**
  - **Description:** Server health check.

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd career-guidance
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory based on `.env.example`.
   - Add your Groq API key:
     ```env
     GROQ_API_KEY=your_groq_api_key_here
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Setup the Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

---

## 🧠 Application Workflow

1. **Assessment:** The user completes a dynamic questionnaire on the frontend, generating a profile of trait scores (Logical, Creative, Analytical, etc.).
2. **Analysis:** The `POST /api/assessment/analyze` endpoint deterministically matches traits against a local career library.
3. **Data Aggregation:** The Groq AI adds qualitative insights. Both deterministic scores and AI insights are combined by `reportBuilder.js` into a standardized `UnifiedReport` object, which is passed through `analytics.service.js` to compute distributions, readiness, and learning profiles.
4. **Visualization:** The user navigates to the `/report` dashboard. The frontend fetches the `UnifiedReport` via `GET /api/report/latest` and renders a suite of rich charts and metric cards without recalculating complex logic in the browser.

---

## 📄 License
This project is licensed under the MIT License.
Built by Aditya Kapde.
