import express from 'express';
import { verifyToken, superAdminOrAdminMiddleware } from '../../../core/middlewares/authMiddleware.js';
import { getLenderStats } from './lenderStats.controller.js';

const router = express.Router();

router.get('/lender-stats', verifyToken, superAdminOrAdminMiddleware, getLenderStats);

export default router;
