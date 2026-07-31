# 🎓 AI-Powered Student Career Guidance Platform MVP

A comprehensive, AI-driven career guidance application that evaluates student traits, skills, and preferences to provide highly personalized career recommendations. 

## 🌟 Features

- **Personalized Career Reports:** Utilizes the Groq API (LLaMA model) to generate tailored insights, identifying key strengths and actionable study tips.
- **Interactive Flow Diagrams:** Built with React Flow, providing visual representations of career paths.
- **Dynamic Assessments:** Evaluates student traits and aligns them with deterministically calculated career compatibility scores.
- **Modern UI/UX:** Responsive, aesthetic interface crafted with Tailwind CSS and Framer Motion.
- **Full-Stack Architecture:** 
  - Frontend: React, Vite, TailwindCSS
  - Backend: Node.js, Express, Groq SDK

## 🚀 Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS 4
- Framer Motion
- React Flow (`@xyflow/react`)
- React Router DOM
- Axios

### Backend
- Node.js
- Express
- Groq SDK for AI completion
- dotenv & cors

## 📂 Project Structure

```text
career-guidance/
├── backend/            # Express server and API integration
│   ├── src/
│   │   ├── services/   # Groq API integration and prompt generation
│   │   ├── data/       # Career libraries and flow trees
│   │   └── app.js      # Main Express application entry
│   └── package.json
└── frontend/           # React application
    ├── src/
    │   ├── components/ # Reusable UI elements (CareerFlowDiagram, etc.)
    │   ├── pages/      # Application views
    │   └── assets/     # Static assets
    ├── tailwind.config.js
    └── package.json
```

## 🛠️ Installation & Setup

1. **Clone the repository** (if applicable):
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

## 🧠 How it Works
1. **Assessment:** The user inputs their education level and answers questions that generate a profile of their dominant traits.
2. **Analysis:** The backend matches these traits against a local career database to find deterministic compatibility scores.
3. **AI Generation:** The profile and deterministic scores are passed to the Groq AI service, which generates a highly personalized, structured career guidance report.
4. **Visualization:** The user receives a detailed summary, strengths, areas to develop, custom study tips, and visual flowcharts mapping out their potential career paths.

## 📄 License
This project is licensed under the MIT License.
And is made and built by Aditya Kapde.
