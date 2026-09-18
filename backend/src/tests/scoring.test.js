import { test, describe } from 'node:test';
import assert from 'node:assert';
import { evaluateResponses, calculateCareerMatches, CANONICAL_TRAITS } from '../services/careerEngine.service.js';

describe('TEST GROUP D — Deterministic Scoring & Career Matching Fixtures', () => {
  test('Canonical 15 Traits are Present and Initialized', () => {
    assert.strictEqual(CANONICAL_TRAITS.length, 15);
    const expected = [
      'logicalThinking', 'problemSolving', 'creativity', 'leadership',
      'communication', 'curiosity', 'teamwork', 'decisionMaking',
      'adaptability', 'planning', 'attentionToDetail', 'riskTaking',
      'analyticalThinking', 'empathy', 'learningStyle'
    ];
    assert.deepStrictEqual(CANONICAL_TRAITS, expected);
  });

  test('Deterministic Scoring on Known Response Fixture', () => {
    const knownFixture = [
      { questionId: 'interest-1', selectedOptionId: 'A' },  // curiosity: 3, learningStyle: 1
      { questionId: 'interest-2', selectedOptionId: 'A' },  // learningStyle: 3
      { questionId: 'aptitude-1', selectedOptionId: 'B' },  // logicalThinking: 3, problemSolving: 2, isCorrect: true
      { questionId: 'behaviour-1', selectedOptionId: 'A' }  // planning: 2, adaptability: 1
    ];

    const result = evaluateResponses(knownFixture);
    
    assert.strictEqual(result.validCount, 4);
    assert.strictEqual(result.iqScore, 1);
    assert.ok(result.rawScores);
    assert.ok(result.normalizedScores);

    // Verify exact raw trait accumulations
    assert.strictEqual(result.rawScores.curiosity, 3);
    assert.strictEqual(result.rawScores.learningStyle, 4); // 1 + 3
    assert.strictEqual(result.rawScores.logicalThinking, 3);
    assert.strictEqual(result.rawScores.attentionToDetail, 2);
    assert.strictEqual(result.rawScores.planning, 2);
    assert.strictEqual(result.rawScores.adaptability, 1);

    // Normalized scores must be within 0-100 range
    Object.values(result.normalizedScores).forEach(score => {
      assert.ok(score >= 0 && score <= 100, `Score ${score} out of 0-100 bounds`);
    });

    // Match careers from normalized scores
    const topCareers = calculateCareerMatches(result.normalizedScores);
    assert.ok(Array.isArray(topCareers));
    assert.strictEqual(topCareers.length, 4);
    assert.ok(topCareers[0].score >= topCareers[1].score);
  });

  test('Invalid / Fake Question IDs are Safely Ignored in Scoring', () => {
    const maliciousPayload = [
      { questionId: 'fake_question_999', selectedOptionId: 'X' },
      { questionId: 'interest-1', selectedOptionId: 'A' }
    ];

    const result = evaluateResponses(maliciousPayload);
    assert.strictEqual(result.validCount, 1);
    assert.strictEqual(result.rawScores.curiosity, 3);
  });

  test('Empty Responses Produce Zeroed Baseline Scores', () => {
    const result = evaluateResponses([]);
    assert.strictEqual(result.validCount, 0);
    assert.strictEqual(result.iqScore, 0);
    Object.values(result.rawScores).forEach(val => assert.strictEqual(val, 0));
  });
});
