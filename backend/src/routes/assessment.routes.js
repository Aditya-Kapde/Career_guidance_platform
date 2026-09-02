import { Router } from 'express';
import { startAssessment, submitAssessment, analyzeAssessment } from '../controllers/assessment.controller.js';
import { apiRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Routes
router.get('/start', startAssessment);
router.post('/submit', submitAssessment);
router.post('/analyze', apiRateLimiter, analyzeAssessment);

export default router;
