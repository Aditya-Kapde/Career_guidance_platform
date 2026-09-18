import { test, describe } from 'node:test';
import assert from 'node:assert';
import { buildReport } from '../services/report/reportBuilder.js';
import { calculateCareerMatches } from '../services/careerEngine.service.js';

describe('TEST GROUP G — AI Deterministic Boundaries & Safety', () => {
  test('AI Output Cannot Overwrite Deterministic Numeric Scores or Career IDs', () => {
    const deterministicCareers = [
      { id: 'civil-engineer', career: 'Civil Engineer', score: 88, description: 'Infrastructure design' },
      { id: 'mechanical-engineer', career: 'Mechanical Engineer', score: 82, description: 'Thermal and mechanical systems' }
    ];

    // Mock an adversarial or hallucinatory AI response that tries to swap career or inject fabricated scores
    const hallucinatoryAiReport = {
      summary: 'Hallucinated narrative',
      topCareers: [
        { career: 'Civil Engineer', score: 99, matchReason: 'AI invented score' },
        { career: 'Astronaut', score: 100, matchReason: 'AI hallucinated career' }
      ]
    };

    const report = buildReport(
      {
        educationLevel: 'undergraduate',
        responses: [{ questionId: 'interest-1', selectedOptionId: 'A' }],
        rawScores: { logicalThinking: 10 },
        normalizedScores: { logicalThinking: 80 },
        userId: null
      },
      hallucinatoryAiReport,
      deterministicCareers
    );

    // Assert that the canonical report PRESERVED the deterministic engine's scores & career IDs
    assert.strictEqual(report.topCareerRecommendations[0].id, 'civil-engineer');
    assert.strictEqual(report.topCareerRecommendations[0].score, 88); // preserved!
    assert.strictEqual(report.topCareerRecommendations[1].id, 'mechanical-engineer');
    assert.strictEqual(report.topCareerRecommendations[1].score, 82); // preserved!

    // Hallucinated 'Astronaut' was rejected because it is not in deterministic output
    assert.strictEqual(report.topCareerRecommendations.some(c => c.career === 'Astronaut'), false);
  });
});
