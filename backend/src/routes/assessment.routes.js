import { Router } from 'express';
import { analyzeAssessment, getQuestions } from '../controllers/assessment.controller.js';
import { apiRateLimiter } from '../middleware/rateLimiter.js';
import { optionalAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/questions', getQuestions);
router.post('/analyze', apiRateLimiter, optionalAuth, analyzeAssessment);

export default router;
