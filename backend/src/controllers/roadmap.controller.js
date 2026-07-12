import { getRoadmapById } from '../services/roadmap.service.js';

/**
 * Controller endpoint to retrieve a career roadmap by its ID.
 * Exposes: GET /api/roadmaps/:careerId
 */
export const getRoadmap = async (req, res) => {
  try {
    const { careerId } = req.params;
    const roadmap = getRoadmapById(careerId);

    if (!roadmap) {
      return res.status(404).json({
        error: `Roadmap not found for career ID: ${careerId}`
      });
    }

    return res.status(200).json(roadmap);
  } catch (error) {
    console.error("Error in getRoadmap controller:", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred while retrieving the roadmap."
    });
  }
};
