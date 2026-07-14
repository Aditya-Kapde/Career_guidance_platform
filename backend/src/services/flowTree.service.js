import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FLOW_TREES_PATH = path.join(__dirname, '../data/careerFlowTrees.json');
let flowTrees = [];

try {
  flowTrees = JSON.parse(fs.readFileSync(FLOW_TREES_PATH, 'utf-8'));
} catch (error) {
  console.error("Error reading career flow trees database:", error);
}

/**
 * Retrieves the flow tree for a given career ID.
 * 
 * @param {string} careerId - Kebab-case career ID (e.g. 'software-engineer')
 * @returns {Object|null} The flow tree object or null if not found
 */
export const getFlowTreeById = (careerId) => {
  if (!careerId) return null;
  return flowTrees.find(tree => tree.id === careerId) || null;
};
