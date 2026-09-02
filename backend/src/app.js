import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import assessmentRoutes from './routes/assessment.routes.js';
import roadmapRoutes from './routes/roadmap.routes.js';
import flowTreeRoutes from './routes/flowTree.routes.js';
import reportRoutes from './routes/report.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parser with size limit to prevent Denial of Service via large payloads
app.use(express.json({ limit: '200kb' }));

// Basic Security Headers (Helmet alternative)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Routes
app.use('/api/assessment', assessmentRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/flow-tree', flowTreeRoutes);
app.use('/api/report', reportRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

console.log("Groq Key Loaded:", !!process.env.GROQ_API_KEY);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
