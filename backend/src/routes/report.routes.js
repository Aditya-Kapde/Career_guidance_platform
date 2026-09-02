import { Router } from 'express';
import { fetchReport, downloadPdf } from '../controllers/report.controller.js';
import { apiRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Routes
router.get('/:id', fetchReport);
router.get('/pdf/:id', apiRateLimiter, downloadPdf);

export default router;
