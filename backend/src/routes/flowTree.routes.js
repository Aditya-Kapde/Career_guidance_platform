import { Router } from 'express';
import { getFlowTree } from '../controllers/flowTree.controller.js';

const router = Router();

// GET /api/flow-tree/:careerId
router.get('/:careerId', getFlowTree);

export default router;
