import { Router } from 'express';
import { getRoadmap } from '../controllers/roadmap.controller.js';

const router = Router();

// GET /api/roadmaps/:careerId
router.get('/:careerId', getRoadmap);

export default router;
