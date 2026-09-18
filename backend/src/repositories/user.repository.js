import { User } from '../models/User.js';

export class UserRepository {
  async create({ name, email, passwordHash }) {
    const normalizedEmail = email.toLowerCase().trim();
    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash
    });
    await user.save();
    return user.toJSON();
  }

  async findByEmail(email) {
    if (!email) return null;
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    return user;
  }

  async findById(id) {
    if (!id) return null;
    const user = await User.findById(id);
    return user ? user.toJSON() : null;
  }

  async deleteById(id) {
    return User.findByIdAndDelete(id);
  }

  async clear() {
    return User.deleteMany({});
  }
}

export const userRepository = new UserRepository();
