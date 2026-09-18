import { Router } from 'express';
import { register, login, logout, getMe } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { apiRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/register', apiRateLimiter, register);
router.post('/login', apiRateLimiter, login);
router.post('/logout', logout);
router.get('/me', requireAuth, getMe);

export default router;
