const Hotel = require('../models/Hotel');
const db = require('../database');

// Hotel Owner: Add a new hotel listing
exports.addHotel = async (req, res) => {
    try {
        const { name, description, location, facilities, contactDetails,
            pricePerNight, totalRooms, roomTypes, imageUrl } = req.body;

        if (!name || !name.trim() || !location || !location.trim()) {
            return res.status(400).json({ success: false, message: 'Hotel name and location are required' });
        }

        const hotel = await Hotel.create({
            ownerId: req.user.id,
            name: name.trim(),
            description,
            location: location.trim(),
            facilities,
            contactDetails,
            pricePerNight: parseFloat(pricePerNight) || 0,
            totalRooms: parseInt(totalRooms) || 0,
            roomTypes,
            imageUrl
        });

        return res.status(201).json({
            success: true,
            message: 'Hotel submitted for admin review',
            hotel
        });
    } catch (error) {
        console.error('Add hotel error:', error);
        return res.status(500).json({ success: false, message: 'Server error adding hotel' });
    }
};

// Hotel Owner: Get their own hotels
exports.getMyHotels = async (req, res) => {
    try {
        const hotels = await Hotel.findByOwner(req.user.id);
        return res.json({ success: true, hotels });
    } catch (error) {
        console.error('Get my hotels error:', error);
        return res.status(500).json({ success: false, message: 'Server error fetching hotels' });
    }
};

// Hotel Owner: Update one of their hotels
exports.updateMyHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, location, facilities, contactDetails,
            pricePerNight, totalRooms, roomTypes, imageUrl } = req.body;

        if (!name || !name.trim() || !location || !location.trim()) {
            return res.status(400).json({ success: false, message: 'Hotel name and location are required' });
        }

        const result = await Hotel.update(id, req.user.id, {
            name: name.trim(),
            description: description || '',
            location: location.trim(),
            facilities: facilities || '',
            contactDetails: contactDetails || '',
            pricePerNight: parseFloat(pricePerNight) || 0,
            totalRooms: parseInt(totalRooms) || 0,
            roomTypes: roomTypes || '',
            imageUrl: imageUrl || ''
        });

        if (result.changes === 0) {
            return res.status(404).json({ success: false, message: 'Hotel not found or not yours' });
        }

        const updated = await Hotel.findById(id);
        return res.json({ success: true, message: 'Hotel updated successfully', hotel: updated });
    } catch (error) {
        console.error('Update hotel error:', error);
        return res.status(500).json({ success: false, message: 'Server error updating hotel' });
    }
};

// Hotel Owner: Delete one of their hotels
exports.deleteMyHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Hotel.delete(id, req.user.id);
        if (result.changes === 0) {
            return res.status(404).json({ success: false, message: 'Hotel not found or not yours' });
        }
        return res.json({ success: true, message: 'Hotel deleted' });
    } catch (error) {
        console.error('Delete hotel error:', error);
        return res.status(500).json({ success: false, message: 'Server error deleting hotel' });
    }
};

// Hotel Owner: See bookings for their hotels
exports.getMyHotelBookings = async (req, res) => {
    try {
        const hotels = await Hotel.findByOwner(req.user.id);
        if (hotels.length === 0) {
            return res.json({ success: true, bookings: [] });
        }
        const hotelIds = hotels.map((h) => h.id);
        const placeholders = hotelIds.map(() => '?').join(',');
        const bookings = await db.all(`
            SELECT b.*, u.fullName as guestName, u.email as guestEmail
            FROM bookings b
            LEFT JOIN users u ON b.user_id = u.id
            WHERE b.booking_type = 'hotel' AND b.item_id IN (${placeholders})
            ORDER BY b.created_at DESC
        `, hotelIds);
        return res.json({ success: true, bookings });
    } catch (error) {
        console.error('Get hotel bookings error:', error);
        return res.status(500).json({ success: false, message: 'Server error fetching hotel bookings' });
    }
};

// Hotel Owner: Accept or reject a booking
exports.updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['confirmed', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Status must be confirmed or rejected' });
        }
        // Ensure the booking belongs to one of this owner's hotels
        const hotels = await Hotel.findByOwner(req.user.id);
        const hotelIds = hotels.map((h) => h.id);
        const booking = await db.get('SELECT * FROM bookings WHERE id = ?', [id]);
        if (!booking || !hotelIds.includes(booking.item_id)) {
            return res.status(404).json({ success: false, message: 'Booking not found or not for your hotel' });
        }
        await db.run('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
        return res.json({ success: true, message: `Booking ${status}` });
    } catch (error) {
        console.error('Update booking status error:', error);
        return res.status(500).json({ success: false, message: 'Server error updating booking' });
    }
};

// Public: Get all approved hotels
exports.getApprovedHotels = async (req, res) => {
    try {
        const hotels = await Hotel.findApproved();
        return res.json({ success: true, hotels });
    } catch (error) {
        console.error('Get approved hotels error:', error);
        return res.status(500).json({ success: false, message: 'Server error fetching hotels' });
    }
};
