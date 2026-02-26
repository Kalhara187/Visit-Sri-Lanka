const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// @route   POST /api/feedback
// @desc    Submit new feedback
// @access  Public
router.post('/', feedbackController.submitFeedback);

// @route   GET /api/feedback
// @desc    Get all feedback (with optional filters)
// @access  Public (for now, can be restricted to admin later)
router.get('/', feedbackController.getAllFeedback);

// @route   GET /api/feedback/stats
// @desc    Get feedback statistics
// @access  Public (for now, can be restricted to admin later)
router.get('/stats', feedbackController.getFeedbackStats);

// @route   DELETE /api/feedback/:id
// @desc    Delete feedback
// @access  Public (for now, can be restricted to admin later)
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
