import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROADMAPS_PATH = path.join(__dirname, '../data/careerRoadmaps.json');
let careerRoadmaps = [];

try {
  careerRoadmaps = JSON.parse(fs.readFileSync(ROADMAPS_PATH, 'utf-8'));
} catch (error) {
  console.error("Error reading career roadmaps database:", error);
}

/**
 * Retrieves the roadmap for a given career ID.
 * 
 * @param {string} careerId - Kebab-case career ID (e.g. 'civil-engineer')
 * @returns {Object|null} The roadmap object or null if not found
 */
export const getRoadmapById = (careerId) => {
  if (!careerId) return null;
  return careerRoadmaps.find(roadmap => roadmap.id === careerId) || null;
};
