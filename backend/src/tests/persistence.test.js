import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/database.js';
import { createUser, findUserByEmail, findUserById, clearUserStore } from '../models/userStore.js';
import { saveReport, getReport, getReportsByUserId, clearReportStore } from '../services/report/reportStore.js';
import { assessmentRepository } from '../repositories/assessment.repository.js';
import { buildReport } from '../services/report/reportBuilder.js';

const TEST_DB_URI = process.env.TEST_DB_URI || 'mongodb://127.0.0.1:27017/pathfinder_test_persistence';

describe('TEST GROUP H — MongoDB Persistence & Database Isolation', () => {
  before(async () => {
    await connectDB(TEST_DB_URI);
    await clearUserStore();
    await clearReportStore();
    await assessmentRepository.clear();
  });

  after(async () => {
    await clearUserStore();
    await clearReportStore();
    await assessmentRepository.clear();
    await disconnectDB();
  });

  test('TEST 1: User Persistence Across Database Disconnect and Reconnect', async () => {
    const userA = await createUser({
      name: 'Persistence Student A',
      email: 'studentA@persistence.test',
      password: 'StrongPassword123!'
    });

    assert.ok(userA.id, 'User A created with UUID');
    assert.strictEqual(userA.email, 'studenta@persistence.test');

    // Simulate backend restart by disconnecting and reconnecting
    await disconnectDB();
    await connectDB(TEST_DB_URI);

    // Verify user survives restart
    const retrievedUser = await findUserByEmail('studentA@persistence.test');
    assert.ok(retrievedUser, 'User A retrieved after database reconnect');
    assert.strictEqual(retrievedUser.id, userA.id);
    assert.strictEqual(retrievedUser.name, 'Persistence Student A');
  });

  test('TEST 2: Report Persistence Across Database Disconnect and Reconnect', async () => {
    const userA = await findUserByEmail('studentA@persistence.test');
    
    const canonicalReport = buildReport(
      {
        educationLevel: 'class-9-10',
        responses: [{ questionId: 'aptitude-1', selectedOptionId: 'B' }],
        rawScores: { logicalThinking: 12 },
        normalizedScores: { logicalThinking: 85 },
        userId: userA.id
      },
      null,
      [{ id: 'civil-engineer', career: 'Civil Engineer', score: 90 }]
    );

    const reportId = await saveReport(canonicalReport, userA.id);
    assert.ok(reportId, 'Report saved successfully with ID');

    // Simulate backend restart
    await disconnectDB();
    await connectDB(TEST_DB_URI);

    // Verify report survives restart
    const retrievedReport = await getReport(reportId);
    assert.ok(retrievedReport, 'Report retrieved after restart');
    assert.strictEqual(retrievedReport.userId, userA.id);
    assert.strictEqual(retrievedReport.assessmentMetadata.educationLevel, 'class-9-10');
    assert.strictEqual(retrievedReport.topCareerRecommendations[0].id, 'civil-engineer');
    assert.strictEqual(retrievedReport.topCareerRecommendations[0].score, 90);
  });

  test('TEST 3: Assessment Persistence Across Database Disconnect and Reconnect', async () => {
    const userA = await findUserByEmail('studentA@persistence.test');
    
    const assessment = await assessmentRepository.create({
      userId: userA.id,
      educationLevel: 'class-9-10',
      responses: [
        { questionId: 'aptitude-1', selectedOptionId: 'B' },
        { questionId: 'interest-1', selectedOptionId: 'A' }
      ]
    });

    assert.ok(assessment.id, 'Assessment created');

    // Simulate backend restart
    await disconnectDB();
    await connectDB(TEST_DB_URI);

    // Verify assessment survives restart
    const retrievedAssessment = await assessmentRepository.findById(assessment.id);
    assert.ok(retrievedAssessment, 'Assessment retrieved after restart');
    assert.strictEqual(retrievedAssessment.userId, userA.id);
    assert.strictEqual(retrievedAssessment.responses.length, 2);
    assert.strictEqual(retrievedAssessment.responses[0].questionId, 'aptitude-1');
  });

  test('TEST 4 & 5: Data Ownership & Authorization Matrix on Persistent DB', async () => {
    const userA = await findUserByEmail('studentA@persistence.test');
    const userB = await createUser({
      name: 'Persistence Student B',
      email: 'studentB@persistence.test',
      password: 'StrongPassword456!'
    });

    const userAReports = await getReportsByUserId(userA.id);
    assert.ok(userAReports.length > 0, 'User A has at least 1 report');
    const userAReportId = userAReports[0].reportId || userAReports[0].id;

    // Simulation of controller-level authorization logic over persistent records
    const authorizeReportAccess = async (reportId, requestingUserId) => {
      const report = await getReport(reportId);
      if (!report) return { status: 404, message: 'Report not found' };
      if (report.userId && report.userId !== requestingUserId) {
        return { status: 403, message: 'Forbidden: Access denied' };
      }
      return { status: 200, data: report };
    };

    // User B attempts access to User A report
    const userBAttack = await authorizeReportAccess(userAReportId, userB.id);
    assert.strictEqual(userBAttack.status, 403, 'Cross-user report access correctly returned 403 Forbidden');

    // User A accesses own report
    const userAAuthorized = await authorizeReportAccess(userAReportId, userA.id);
    assert.strictEqual(userAAuthorized.status, 200, 'Owner report access returned 200 OK');
  });

  test('TEST 6: Concurrency & Race Condition Handling', async () => {
    // 10 concurrent report creations
    const userA = await findUserByEmail('studentA@persistence.test');
    const concurrentSaves = Array.from({ length: 10 }, (_, i) => {
      const report = buildReport(
        {
          educationLevel: 'undergraduate',
          responses: [{ questionId: 'aptitude-1', selectedOptionId: 'B' }],
          rawScores: { logicalThinking: i },
          normalizedScores: { logicalThinking: i * 10 },
          userId: userA.id
        },
        null,
        [{ id: 'software-engineer', career: 'Software Engineer', score: 80 + i }]
      );
      return saveReport(report, userA.id);
    });

    const savedReportIds = await Promise.all(concurrentSaves);
    assert.strictEqual(savedReportIds.length, 10, 'All 10 concurrent reports saved');

    // Verify all 10 are distinct and retrievable
    const uniqueIds = new Set(savedReportIds);
    assert.strictEqual(uniqueIds.size, 10, 'All report IDs are globally unique');

    const userReports = await getReportsByUserId(userA.id);
    assert.ok(userReports.length >= 10, 'User reports query returns all concurrent reports');
  });
});
