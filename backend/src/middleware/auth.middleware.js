import { verifyToken } from '../services/auth.service.js';
import { findUserById } from '../models/userStore.js';

/**
 * Middleware enforcing real JWT user authentication.
 * Checks HttpOnly cookie first, then Authorization Bearer header.
 */
export const requireAuth = (req, res, next) => {
  try {
    let token = null;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        error: 'Authentication required. Please log in to access this resource.'
      });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        error: 'Invalid or expired session token. Please log in again.'
      });
    }

    const user = findUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        error: 'User account not found.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ error: 'Internal authentication error.' });
  }
};

/**
 * Optional authentication middleware for endpoints accessible by guests or users.
 */
export const optionalAuth = (req, res, next) => {
  try {
    let token = null;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = verifyToken(token);
      if (decoded && decoded.userId) {
        const user = findUserById(decoded.userId);
        if (user) {
          req.user = user;
        }
      }
    }

    next();
  } catch (error) {
    next();
  }
};
