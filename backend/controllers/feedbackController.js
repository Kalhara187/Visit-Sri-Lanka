require('dotenv').config();
const Feedback = require('../models/Feedback');

// Submit new feedback
exports.submitFeedback = async (req, res) => {
    try {
        const { fullName, email, rating, category, subject, message } = req.body;

        // Validate feedback data
        const validationErrors = Feedback.validate({
            fullName,
            email,
            rating,
            category,
            subject,
            message
        });

        if (validationErrors.length > 0) {
            // Return validation errors
            const errors = {};
            validationErrors.forEach(err => {
                errors[err.field] = err.message;
            });

            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        // Check for duplicate submission
        const isDuplicate = await Feedback.checkDuplicate(email, message);
        if (isDuplicate) {
            return res.status(429).json({
                success: false,
                message: 'Duplicate submission detected. Please wait before submitting again.'
            });
        }

        // Create new feedback
        const feedback = await Feedback.create({
            fullName,
            email,
            rating,
            category,
            subject,
            message
        });

        // Return success response
        return res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully',
            feedback: {
                id: feedback.id,
                name: feedback.name,
                rating: feedback.rating,
                category: feedback.category,
                createdAt: feedback.created_at
            }
        });

    } catch (error) {
        console.error('Feedback submission error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during feedback submission'
        });
    }
};

// Get all feedback (admin)
exports.getAllFeedback = async (req, res) => {
    try {
        const { rating, category } = req.query;

        const filters = {};
        if (rating) filters.rating = parseInt(rating);
        if (category) filters.category = category;

        const feedbackList = await Feedback.getAll(filters);

        return res.status(200).json({
            success: true,
            count: feedbackList.length,
            feedback: feedbackList
        });

    } catch (error) {
        console.error('Get feedback error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching feedback'
        });
    }
};

// Get feedback statistics (admin)
exports.getFeedbackStats = async (req, res) => {
    try {
        const stats = await Feedback.getStatistics();

        return res.status(200).json({
            success: true,
            statistics: stats
        });

    } catch (error) {
        console.error('Get feedback stats error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching feedback statistics'
        });
    }
};

// Delete feedback (admin)
exports.deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Feedback ID is required'
            });
        }

        const deleted = await Feedback.delete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Feedback not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Feedback deleted successfully'
        });

    } catch (error) {
        console.error('Delete feedback error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while deleting feedback'
        });
    }
};
