import { Router } from 'express';
import { fetchLatestReport, downloadPdf } from '../controllers/report.controller.js';

const router = Router();

// Routes
router.get('/latest', fetchLatestReport);
router.get('/pdf', downloadPdf);

export default router;
