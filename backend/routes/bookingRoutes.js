const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/bookings
// @desc    Create a booking
// @access  Private
router.post('/', protect, bookingController.createBooking);

// @route   GET /api/bookings/my
// @desc    Get current user's bookings
// @access  Private
router.get('/my', protect, bookingController.getMyBookings);

// @route   DELETE /api/bookings/:id
// @desc    Cancel a booking
// @access  Private
router.delete('/:id', protect, bookingController.cancelBooking);

module.exports = router;
