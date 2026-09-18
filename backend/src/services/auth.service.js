import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'pathfinder-career-guidance-secure-jwt-key-2026';
const TOKEN_EXPIRY = '7d';

/**
 * Generates a signed JWT session token.
 * @param {Object} user 
 * @returns {string} JWT token
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
};

/**
 * Verifies and decodes a JWT token.
 * @param {string} token 
 * @returns {Object|null} Decoded payload or null
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
