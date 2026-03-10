const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { protect, isHotelOwner } = require('../middleware/authMiddleware');

// @route   GET /api/hotels/approved
// @desc    Get all approved hotels (public listing)
// @access  Public
router.get('/approved', hotelController.getApprovedHotels);

// @route   POST /api/hotels
// @desc    Hotel owner adds a new hotel listing
// @access  Hotel Owner
router.post('/', protect, isHotelOwner, hotelController.addHotel);

// @route   GET /api/hotels/my
// @desc    Hotel owner gets their hotels
// @access  Hotel Owner
router.get('/my', protect, isHotelOwner, hotelController.getMyHotels);

// @route   GET /api/hotels/my-bookings
// @desc    Hotel owner sees bookings for their hotels
// @access  Hotel Owner
router.get('/my-bookings', protect, isHotelOwner, hotelController.getMyHotelBookings);

// @route   PUT /api/hotels/:id/booking-status
// @desc    Hotel owner accepts or rejects a booking
// @access  Hotel Owner
router.put('/:id/booking-status', protect, isHotelOwner, hotelController.updateBookingStatus);

// @route   PUT /api/hotels/:id
// @desc    Hotel owner updates their hotel listing
// @access  Hotel Owner
router.put('/:id', protect, isHotelOwner, hotelController.updateMyHotel);

// @route   DELETE /api/hotels/:id
// @desc    Hotel owner deletes their hotel listing
// @access  Hotel Owner
router.delete('/:id', protect, isHotelOwner, hotelController.deleteMyHotel);

module.exports = router;
