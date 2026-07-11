import { Router } from 'express';
import { startAssessment, submitAssessment, analyzeAssessment } from '../controllers/assessment.controller.js';

const router = Router();

// Routes
router.get('/start', startAssessment);
router.post('/submit', submitAssessment);
router.post('/analyze', analyzeAssessment);

export default router;
