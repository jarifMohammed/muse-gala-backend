import express from 'express';
import {
    getReturnPageController,
    submitReturnController,
    generateReturnLinkController,
    getReturnsAttentionController,
    getOverdueSummaryController,
    approveChargeController,
    reportIssueController
} from './return.controller.js';
import {
    verifyToken,
    superAdminOrAdminMiddleware,
    lenderMiddleware
} from '../../../core/middlewares/authMiddleware.js';

const router = express.Router();


// ── Admin Routes (must be BEFORE /:token to avoid wildcard match) ──
router.post('/generate-link/:bookingId', verifyToken, superAdminOrAdminMiddleware, generateReturnLinkController);
router.get('/admin/attention', verifyToken, superAdminOrAdminMiddleware, getReturnsAttentionController);
router.get('/admin/overdue-summary', verifyToken, superAdminOrAdminMiddleware, getOverdueSummaryController);
router.post('/admin/approve-charge/:bookingId', verifyToken, superAdminOrAdminMiddleware, approveChargeController);


// ── Lender Routes ──
router.post('/lender/report-issue/:bookingId', verifyToken, lenderMiddleware, reportIssueController);


// ── Public Routes (No Auth — Secure Token) ──
// These MUST be LAST because /:token is a wildcard
router.get('/:token', getReturnPageController);
router.post('/:token/submit', submitReturnController);


export default router;
