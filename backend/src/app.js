import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import assessmentRoutes from './routes/assessment.routes.js';
import roadmapRoutes from './routes/roadmap.routes.js';
import flowTreeRoutes from './routes/flowTree.routes.js';
import reportRoutes from './routes/report.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectDB, disconnectDB, getDatabaseStatus } from './config/database.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with credential support
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Cookie parser for JWT tokens
app.use(cookieParser());

// Body parser with size limit to prevent Denial of Service via large payloads
app.use(express.json({ limit: '200kb' }));

// Hardened Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Application Routes
app.use('/api/auth', authRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/flow-tree', flowTreeRoutes);
app.use('/api/report', reportRoutes);

// Health check endpoint with database health status
app.get('/api/health', (req, res) => {
  const dbStatus = getDatabaseStatus();
  res.status(200).json({
    status: 'ok',
    message: 'PathFinder AI backend is running healthy',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Centralized error handler
app.use(errorHandler);

// Connect to MongoDB and start server (unless in test mode)
if (process.env.NODE_ENV !== 'test') {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`PathFinder AI Server is running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error(`Failed to initialize server due to database error: ${err.message}`);
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      } else {
        // In local development allow server to boot while attempting reconnects
        app.listen(PORT, () => {
          console.log(`PathFinder AI Server running on port ${PORT} (Database Degraded)`);
        });
      }
    });
}

// Graceful shutdown handlers
process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectDB();
  process.exit(0);
});

export default app;
