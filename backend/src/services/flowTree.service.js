import { getRoadmapById } from './roadmap.service.js';

/**
 * Retrieves the flow tree for a given career ID.
 * 
 * @param {string} careerId - Kebab-case career ID (e.g. 'software-engineer')
 * @returns {Object|null} The flow tree object or null if not found
 */
export const getFlowTreeById = (careerId) => {
  if (!careerId) return null;
  
  const roadmap = getRoadmapById(careerId);
  if (!roadmap || !roadmap.timeline) return null;

  const nodes = roadmap.timeline.map((step, index) => ({
    id: `${careerId}-node-${index}`,
    label: step.focus || step.title || `Step ${index + 1}`,
    level: index,
    type: 'core'
  }));

  const edges = roadmap.timeline.slice(0, -1).map((_, index) => ({
    source: `${careerId}-node-${index}`,
    target: `${careerId}-node-${index + 1}`
  }));

  return { id: careerId, nodes, edges };
};
