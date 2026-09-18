import { createUser, findUserByEmail, verifyPassword } from '../models/userStore.js';
import { generateToken } from '../services/auth.service.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

/**
 * Register a new student account.
 * POST /api/auth/register
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters long.' });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const user = await createUser({ name, email, password });
    const token = generateToken(user);

    res.cookie('token', token, COOKIE_OPTIONS);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      user,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(400).json({ error: error.message || 'Registration failed.' });
  }
};

/**
 * Login existing student.
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const userRecord = findUserByEmail(email);
    if (!userRecord) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isValid = await verifyPassword(password, userRecord.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const safeUser = {
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      createdAt: userRecord.createdAt
    };

    const token = generateToken(safeUser);
    res.cookie('token', token, COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      user: safeUser,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal login error.' });
  }
};

/**
 * Logout student.
 * POST /api/auth/logout
 */
export const logout = (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS);
  return res.status(200).json({ success: true, message: 'Logged out successfully.' });
};

/**
 * Get current authenticated student profile.
 * GET /api/auth/me
 */
export const getMe = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
};
