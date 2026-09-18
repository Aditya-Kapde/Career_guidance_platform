# PathFinder AI — Production Deployment Guide

This guide outlines the production deployment architecture, cloud infrastructure configuration, environment variables, build steps, and verification procedures for PathFinder AI.

---

## 1. Architecture Overview

```
[ Client Browser ]
       │
       ▼ (HTTPS)
[ Vercel CDN / Frontend Edge ] (React / Vite Production SPA Bundle)
       │
       ▼ (REST API / JSON / Cookies)
[ Cloud Container / Backend Server ] (Node.js Express / Puppeteer PDF Service)
       │
       ▼ (TLS / MongoDB Wire Protocol)
[ MongoDB Atlas Managed Cluster ] (Persistent User Accounts, Assessments & Reports)
```

---

## 2. Database Setup (MongoDB Atlas)

1. **Create Cluster**:
   - Create an M0/M10+ cluster on MongoDB Atlas in your preferred cloud region.
2. **Database User**:
   - Create a database user with `readWrite` permissions on the `pathfinder_production` database.
3. **Network Access**:
   - Add your backend host IP addresses (or `0.0.0.0/0` with strong password authentication for containerized cloud hosts like Render/Railway/Vercel).
4. **Connection String**:
   - Obtain the connection URI:
     `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/pathfinder_production?retryWrites=true&w=majority`

---

## 3. Backend Deployment (Render / Railway / AWS / Fly.io)

1. **Root Directory**: `Career_guidance_platform/backend`
2. **Build Command**: `npm install`
3. **Start Command**: `npm start` (runs `node src/app.js`)
4. **Environment Variables**:
   | Variable | Value / Description |
   | :--- | :--- |
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` (or injected by cloud provider) |
   | `MONGODB_URI` | `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/pathfinder_production?retryWrites=true&w=majority` |
   | `JWT_SECRET` | High-entropy random 256-bit signing secret (minimum 64 characters) |
   | `CLIENT_URL` | `https://your-frontend-app.vercel.app` |
   | `GROQ_API_KEY` | `gsk_...` (Groq production LLM API key) |
   | `GROQ_MODEL` | `openai/gpt-oss-120b` |

---

## 4. Frontend Deployment (Vercel)

1. **Root Directory**: `Career_guidance_platform/frontend`
2. **Framework Preset**: `Vite`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Environment Variables**:
   | Variable | Value / Description |
   | :--- | :--- |
   | `VITE_API_URL` | `https://your-backend-service.onrender.com` |
6. **Routing & Headers**:
   - Handled automatically via [frontend/vercel.json](file:///d:/Ellipsonic/career_guidance/Career_guidance_platform/frontend/vercel.json) with SPA catch-all rewrite and production security headers.

---

## 5. Pre-Flight Verification Checklist

- [x] **Persistent Database:** MongoDB Atlas connected and serving requests.
- [x] **Database Isolation:** User sessions and reports persist across process restarts.
- [x] **Cross-Account Security:** Access to foreign report IDs strictly returns `403 Forbidden`.
- [x] **Deterministic Scoring:** Canonical 15 traits evaluated server-side.
- [x] **AI Safety Fallback:** System fails gracefully to rule-based synthesis if AI provider is unreachable.
- [x] **Zero Secret Leakage:** Production JS bundle verified free of API keys or JWT secrets.
- [x] **Accessibility:** Semantic fieldsets, radio inputs, and ARIA live regions active.
- [x] **PDF Generation:** Headless Chrome endpoint produces valid downloadable A4 PDFs.
