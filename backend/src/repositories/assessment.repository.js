import { Assessment } from '../models/Assessment.js';

export class AssessmentRepository {
  async create({ userId, educationLevel, responses, status = 'completed' }) {
    const assessment = new Assessment({
      userId: userId || null,
      educationLevel,
      responses,
      status,
      completedAt: new Date()
    });
    await assessment.save();
    return assessment.toJSON();
  }

  async findById(id) {
    if (!id) return null;
    const assessment = await Assessment.findById(id);
    return assessment ? assessment.toJSON() : null;
  }

  async findByUserId(userId) {
    if (!userId) return [];
    const assessments = await Assessment.find({ userId }).sort({ createdAt: -1 });
    return assessments.map(a => a.toJSON());
  }

  async clear() {
    return Assessment.deleteMany({});
  }
}

export const assessmentRepository = new AssessmentRepository();
