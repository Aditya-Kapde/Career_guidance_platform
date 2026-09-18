import { test, describe } from 'node:test';
import assert from 'node:assert';
import { getFlowTreeForCareer } from '../services/flowTree.service.js';
import { getRoadmapById } from '../services/roadmap.service.js';

describe('TEST GROUP F — Career Roadmap & Domain Isolation', () => {
  test('Civil Engineer Flow Tree is Free from Software/Tech Contamination', () => {
    const tree = getFlowTreeForCareer('civil-engineer');
    assert.ok(tree);
    assert.strictEqual(tree.careerId, 'civil-engineer');

    const labels = tree.nodes.map(n => n.label.toLowerCase());

    // Civil engineering flow tree MUST NOT contain software development progression
    assert.strictEqual(
      labels.some(l => /\bvp of engineering\b/i.test(l) || /\bcto\b/i.test(l) || /\bprincipal architect\b/i.test(l)),
      false,
      'Civil Engineer decision tree must not contain CTO / VP of Engineering roles'
    );

    assert.strictEqual(
      labels.some(l => /\bbca\b/i.test(l) || /\bmca\b/i.test(l)),
      false,
      'Civil Engineer decision tree must not contain BCA/MCA degrees'
    );

    // MUST contain Core Engineering milestones
    assert.ok(
      labels.some(l => l.includes('civil') || l.includes('engineering') || l.includes('cad') || l.includes('structural')),
      'Civil Engineer tree must contain Civil / Structural engineering milestones'
    );
  });

  test('Civil Engineer Knowledge Base Entry Has Appropriate Engineering Certifications', () => {
    const roadmap = getRoadmapById('civil-engineer');
    assert.ok(roadmap);
    assert.strictEqual(roadmap.id, 'civil-engineer');

    const certs = roadmap.certifications || [];
    assert.ok(certs.length > 0);

    // Certs must NOT be generic software certs
    assert.strictEqual(
      certs.includes('CompTIA Security+'),
      false,
      'Civil Engineer must not list CompTIA Security+'
    );
    assert.strictEqual(
      certs.includes('AWS Certified Cloud Practitioner'),
      false,
      'Civil Engineer must not list AWS Cloud Practitioner'
    );

    // Certs MUST contain domain-specific civil/structural credentials
    assert.ok(
      certs.some(c => c.toLowerCase().includes('autocad') || c.toLowerCase().includes('staad') || c.toLowerCase().includes('leed') || c.toLowerCase().includes('pmp')),
      'Civil Engineer must contain civil/structural engineering credentials'
    );
  });

  test('Doctor Flow Tree Contains Medical Clinical Milestones', () => {
    const tree = getFlowTreeForCareer('doctor');
    assert.ok(tree);

    const labels = tree.nodes.map(n => n.label.toLowerCase());
    assert.ok(labels.some(l => l.includes('mbbs') || l.includes('neet') || l.includes('clinical') || l.includes('hospital')));
    assert.strictEqual(labels.some(l => l.includes('software') || l.includes('b.tech cs')), false);
  });

  test('Lawyer Flow Tree Contains Legal Milestones', () => {
    const tree = getFlowTreeForCareer('lawyer');
    assert.ok(tree);

    const labels = tree.nodes.map(n => n.label.toLowerCase());
    assert.ok(labels.some(l => l.includes('llb') || l.includes('clat') || l.includes('bar')));
    assert.strictEqual(labels.some(l => l.includes('software') || l.includes('b.tech cs')), false);
  });
});
