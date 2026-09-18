import { Router } from 'express';
import { fetchReport, fetchUserReports, downloadPdf } from '../controllers/report.controller.js';
import { apiRateLimiter } from '../middleware/rateLimiter.js';
import { optionalAuth, requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

// Routes
router.get('/user/me', requireAuth, fetchUserReports);
router.get('/:id', optionalAuth, fetchReport);
router.get('/pdf/:id', apiRateLimiter, optionalAuth, downloadPdf);

export default router;
