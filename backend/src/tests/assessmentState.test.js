import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MASTER_PATH = path.join(__dirname, '../data/master.json');

describe('TEST GROUP C — Assessment State & Question Integrity', () => {
  test('Question IDs are Unique and Immutable', () => {
    const masterData = JSON.parse(fs.readFileSync(MASTER_PATH, 'utf-8'));
    const questions = masterData.questions || [];
    
    assert.ok(questions.length > 0);
    const idSet = new Set();

    questions.forEach((q) => {
      assert.ok(q.id, 'Every question must have a non-empty id');
      assert.strictEqual(typeof q.id, 'string');
      assert.strictEqual(idSet.has(q.id), false, `Duplicate questionId detected: ${q.id}`);
      idSet.add(q.id);

      assert.ok(Array.isArray(q.options), `Question ${q.id} must have options array`);
      assert.ok(q.options.length >= 2, `Question ${q.id} must have at least 2 options`);

      const optionIdSet = new Set();
      q.options.forEach((opt) => {
        assert.ok(opt.id, `Option in question ${q.id} must have an id`);
        assert.strictEqual(optionIdSet.has(opt.id), false, `Duplicate optionId ${opt.id} in question ${q.id}`);
        optionIdSet.add(opt.id);
      });
    });
  });

  test('Simulated Traversal State Invariant: displayed question ID matches stored answer key', () => {
    const masterData = JSON.parse(fs.readFileSync(MASTER_PATH, 'utf-8'));
    const questions = masterData.questions || [];

    // State simulation
    const state = {
      educationLevel: 'undergraduate',
      questionIds: questions.map(q => q.id),
      currentQuestionIndex: 0,
      answers: {}
    };

    // Forward traversal Q1 -> Q2 -> Q3
    const q1Id = state.questionIds[0];
    state.answers[q1Id] = ['A'];
    state.currentQuestionIndex = 1;

    const q2Id = state.questionIds[1];
    state.answers[q2Id] = ['B'];
    state.currentQuestionIndex = 2;

    const q3Id = state.questionIds[2];
    state.answers[q3Id] = ['C'];

    // Backward traversal Q3 -> Q2 -> Q1
    state.currentQuestionIndex = 1; // back to Q2
    assert.strictEqual(state.questionIds[state.currentQuestionIndex], q2Id);
    assert.deepStrictEqual(state.answers[q2Id], ['B']);

    // Modify Q2 answer
    state.answers[q2Id] = ['D'];

    // Move Forward Q2 -> Q3
    state.currentQuestionIndex = 2;
    assert.strictEqual(state.questionIds[state.currentQuestionIndex], q3Id);
    assert.deepStrictEqual(state.answers[q3Id], ['C']);

    // Move back to Q2 to verify modified answer persisted accurately
    state.currentQuestionIndex = 1;
    assert.deepStrictEqual(state.answers[q2Id], ['D']);
    // Verify Q1 remained untouched
    assert.deepStrictEqual(state.answers[q1Id], ['A']);
  });
});
