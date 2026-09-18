import { test, describe } from 'node:test';
import assert from 'node:assert';
import { buildReport, REPORT_VERSIONS } from '../services/report/reportBuilder.js';
import { evaluateResponses, calculateCareerMatches } from '../services/careerEngine.service.js';

describe('TEST GROUP E — Report Single Source of Truth & Schema Integrity', () => {
  test('Canonical Report Preserves Exact Education Level Across All Sections', () => {
    const responses = [
      { questionId: 'interest-1', selectedOptionId: 'A' },
      { questionId: 'aptitude-1', selectedOptionId: 'A' }
    ];

    const { rawScores, normalizedScores, iqScore } = evaluateResponses(responses);
    const topCareers = calculateCareerMatches(normalizedScores);

    const testEducationLevel = 'class-10';

    const canonicalReport = buildReport(
      {
        educationLevel: testEducationLevel,
        responses,
        rawScores,
        normalizedScores,
        iqScore,
        userId: 'user-123'
      },
      null,
      topCareers
    );

    // 1. Root and metadata validation
    assert.strictEqual(canonicalReport.assessmentMetadata.educationLevel, 'class-10');
    assert.strictEqual(canonicalReport.userId, 'user-123');
    assert.strictEqual(canonicalReport.versions.assessmentVersion, REPORT_VERSIONS.assessmentVersion);

    // 2. Score separation validation
    assert.ok(canonicalReport.rawScores);
    assert.ok(canonicalReport.normalizedScores);
    assert.strictEqual(canonicalReport.rawScores.curiosity, 3);
    assert.ok(canonicalReport.normalizedScores.curiosity >= 0 && canonicalReport.normalizedScores.curiosity <= 100);

    // 3. Analytics single-source-of-truth validation
    assert.ok(canonicalReport.analytics.traitRanking);
    assert.ok(canonicalReport.analytics.careerReadiness);
    assert.ok(canonicalReport.analytics.learningProfile);
    assert.strictEqual(typeof canonicalReport.analytics.careerReadiness.score, 'number');
    assert.ok(canonicalReport.analytics.careerReadiness.score <= 100);

    // 4. Career recommendations match engine output
    assert.strictEqual(canonicalReport.topCareerRecommendations.length, topCareers.length);
    assert.strictEqual(canonicalReport.topCareerRecommendations[0].id, topCareers[0].id);
    assert.strictEqual(canonicalReport.topCareerRecommendations[0].score, topCareers[0].score);

    // 5. Roadmaps match top career recommendations
    assert.strictEqual(canonicalReport.careerRoadmaps.length, topCareers.length);
    assert.strictEqual(canonicalReport.careerRoadmaps[0].id, topCareers[0].id);
  });
});
