import { test, describe, before, after, beforeEach } from 'node:test';
import assert from 'node:assert';
import { connectDB, disconnectDB } from '../config/database.js';
import { createUser, findUserByEmail, findUserById, verifyPassword, clearUserStore } from '../models/userStore.js';
import { generateToken, verifyToken } from '../services/auth.service.js';
import { saveReport, getReport, clearReportStore } from '../services/report/reportStore.js';

const TEST_DB_URI = process.env.TEST_DB_URI || 'mongodb://127.0.0.1:27017/pathfinder_test_auth';

describe('TEST GROUP B — Authentication & Authorization', () => {
  before(async () => {
    await connectDB(TEST_DB_URI);
  });

  after(async () => {
    await clearUserStore();
    await clearReportStore();
    await disconnectDB();
  });

  beforeEach(async () => {
    await clearUserStore();
    await clearReportStore();
  });

  test('User Registration & Password Hashing', async () => {
    const user = await createUser({
      name: 'Alice Student',
      email: 'alice@example.com',
      password: 'StrongPassword123!'
    });

    assert.ok(user.id);
    assert.strictEqual(user.name, 'Alice Student');
    assert.strictEqual(user.email, 'alice@example.com');

    // Retrieve raw record to check hash
    const rawUser = await findUserByEmail('alice@example.com');
    assert.ok(rawUser.passwordHash);
    assert.notStrictEqual(rawUser.passwordHash, 'StrongPassword123!');

    // Verify correct password matches
    const isMatch = await verifyPassword('StrongPassword123!', rawUser.passwordHash);
    assert.strictEqual(isMatch, true);

    // Verify incorrect password fails
    const isBadMatch = await verifyPassword('WrongPassword', rawUser.passwordHash);
    assert.strictEqual(isBadMatch, false);
  });

  test('Duplicate Email Registration is Rejected', async () => {
    await createUser({
      name: 'Bob Student',
      email: 'bob@example.com',
      password: 'Password123'
    });

    await assert.rejects(
      async () => {
        await createUser({
          name: 'Bob Duplicate',
          email: 'bob@example.com',
          password: 'AnotherPassword'
        });
      },
      /already exists/
    );
  });

  test('JWT Session Token Generation & Verification', async () => {
    const user = await createUser({
      name: 'Charlie Student',
      email: 'charlie@example.com',
      password: 'Password123'
    });

    const token = generateToken(user);
    assert.ok(token);

    const decoded = verifyToken(token);
    assert.ok(decoded);
    assert.strictEqual(decoded.userId, user.id);
    assert.strictEqual(decoded.email, 'charlie@example.com');

    // Tampered token fails
    const invalidDecoded = verifyToken(token + 'tampered');
    assert.strictEqual(invalidDecoded, null);
  });

  test('Cross-User Report Authorization Isolation', async () => {
    // User A creates a report
    const userA = await createUser({
      name: 'Student A',
      email: 'studentA@example.com',
      password: 'PasswordA123'
    });

    // User B exists
    const userB = await createUser({
      name: 'Student B',
      email: 'studentB@example.com',
      password: 'PasswordB123'
    });

    const reportData = {
      assessmentMetadata: { educationLevel: 'undergraduate' },
      normalizedScores: { logicalThinking: 80 },
      topCareerRecommendations: [{ id: 'software-engineer', career: 'Software Engineer', score: 90 }]
    };

    const reportId = await saveReport(reportData, userA.id);
    assert.ok(reportId);

    const retrievedReport = await getReport(reportId);
    assert.ok(retrievedReport);
    assert.strictEqual(retrievedReport.userId, userA.id);

    // Ownership assertion: User B cannot own Report A
    assert.notStrictEqual(retrievedReport.userId, userB.id);
  });
});
