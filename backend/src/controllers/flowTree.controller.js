import { getFlowTreeById } from '../services/flowTree.service.js';

/**
 * Controller endpoint to retrieve a career flow tree by its ID.
 * Exposes: GET /api/flow-tree/:careerId
 */
export const getFlowTree = async (req, res) => {
  try {
    const { careerId } = req.params;
    const flowTree = getFlowTreeById(careerId);

    if (!flowTree) {
      return res.status(404).json({
        error: `Flow tree not found for career ID: ${careerId}`
      });
    }

    return res.status(200).json(flowTree);
  } catch (error) {
    console.error("Error in getFlowTree controller:", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred while retrieving the flow tree."
    });
  }
};
