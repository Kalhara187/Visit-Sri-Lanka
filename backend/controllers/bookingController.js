const Booking = require('../models/Booking');

// Create a new booking (protected - requires login)
exports.createBooking = async (req, res) => {
    try {
        const { bookingType, itemId, itemName, guests, checkIn, checkOut, totalPrice, paymentMethod, specialRequests } = req.body;

        if (!bookingType || !itemName || !guests || !checkIn || !checkOut || !totalPrice || !paymentMethod) {
            return res.status(400).json({ success: false, message: 'All booking fields are required' });
        }

        if (!['tour', 'hotel'].includes(bookingType)) {
            return res.status(400).json({ success: false, message: 'Invalid booking type' });
        }

        if (guests < 1 || guests > 20) {
            return res.status(400).json({ success: false, message: 'Guests must be between 1 and 20' });
        }

        const booking = await Booking.create({
            userId: req.user.id,
            bookingType,
            itemId,
            itemName,
            guests: parseInt(guests),
            checkIn,
            checkOut,
            totalPrice: parseFloat(totalPrice),
            paymentMethod,
            specialRequests
        });

        return res.status(201).json({
            success: true,
            message: 'Booking confirmed successfully!',
            booking
        });
    } catch (error) {
        console.error('Booking error:', error);
        return res.status(500).json({ success: false, message: 'Server error during booking' });
    }
};

// Get all bookings for the logged-in user
exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.findByUser(req.user.id);
        return res.json({ success: true, bookings });
    } catch (error) {
        console.error('Get bookings error:', error);
        return res.status(500).json({ success: false, message: 'Server error fetching bookings' });
    }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Booking.cancel(id, req.user.id);
        if (result.changes === 0) {
            return res.status(404).json({ success: false, message: 'Booking not found or not yours' });
        }
        return res.json({ success: true, message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error('Cancel booking error:', error);
        return res.status(500).json({ success: false, message: 'Server error cancelling booking' });
    }
};

// Admin: Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        return res.json({ success: true, bookings });
    } catch (error) {
        console.error('Get all bookings error:', error);
        return res.status(500).json({ success: false, message: 'Server error fetching bookings' });
    }
};
