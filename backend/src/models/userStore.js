import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/user.repository.js';

/**
 * Creates and registers a new user with hashed credentials in persistent storage.
 * @param {Object} userData - { name, email, password }
 * @returns {Promise<Object>} Safe user object without password
 */
export const createUser = async ({ name, email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await userRepository.findByEmail(normalizedEmail);
  if (existingUser) {
    throw new Error('An account with this email address already exists.');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const savedUser = await userRepository.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash
  });

  return {
    id: savedUser.id,
    name: savedUser.name,
    email: savedUser.email,
    createdAt: savedUser.createdAt
  };
};

/**
 * Finds user by email (including passwordHash for auth verification).
 * @param {string} email 
 * @returns {Promise<Object|null>}
 */
export const findUserByEmail = async (email) => {
  if (!email) return null;
  const user = await userRepository.findByEmail(email);
  if (!user) return null;
  return {
    id: user._id || user.id,
    name: user.name,
    email: user.email,
    passwordHash: user.passwordHash,
    createdAt: user.createdAt
  };
};

/**
 * Finds user by ID (safe object without password hash).
 * @param {string} id 
 * @returns {Promise<Object|null>}
 */
export const findUserById = async (id) => {
  if (!id) return null;
  return userRepository.findById(id);
};

/**
 * Validates candidate password against hashed password.
 * @param {string} candidatePassword 
 * @param {string} hash 
 * @returns {Promise<boolean>}
 */
export const verifyPassword = async (candidatePassword, hash) => {
  if (!candidatePassword || !hash) return false;
  return bcrypt.compare(candidatePassword, hash);
};

/**
 * Reset store (for testing).
 */
export const clearUserStore = async () => {
  return userRepository.clear();
};
