const db = require('../database');
const Hotel = require('../models/Hotel');

// GET /api/admin/stats
exports.getStats = async (req, res) => {
    try {
        const [users, hotels, bookings, feedback, contacts] = await Promise.all([
            db.get("SELECT COUNT(*) as count FROM users WHERE role != 'admin'"),
            db.get('SELECT COUNT(*) as count FROM hotels'),
            db.get('SELECT COUNT(*) as count FROM bookings'),
            db.get('SELECT COUNT(*) as count FROM feedback'),
            db.get('SELECT COUNT(*) as count FROM contact_messages'),
        ]);
        const pendingHotels = await db.get("SELECT COUNT(*) as count FROM hotels WHERE status = 'pending'");
        return res.json({
            success: true,
            stats: {
                totalUsers: users.count,
                totalHotels: hotels.count,
                pendingHotels: pendingHotels.count,
                totalBookings: bookings.count,
                totalFeedback: feedback.count,
                totalContacts: contacts.count,
            }
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        return res.status(500).json({ success: false, message: 'Server error fetching stats' });
    }
};

// GET /api/admin/users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.all(
            "SELECT id, fullName, email, role, phone, created_at FROM users WHERE role != 'admin' ORDER BY created_at DESC"
        );
        return res.json({ success: true, users });
    } catch (error) {
        console.error('Admin get users error:', error);
        return res.status(500).json({ success: false, message: 'Server error fetching users' });
    }
};

// DELETE /api/admin/users/:id
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.run("DELETE FROM users WHERE id = ? AND role != 'admin'", [id]);
        if (result.changes === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Admin delete user error:', error);
        return res.status(500).json({ success: false, message: 'Server error deleting user' });
    }
};

// GET /api/admin/hotels
exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.findAll();
        return res.json({ success: true, hotels });
    } catch (error) {
        console.error('Admin get hotels error:', error);
        return res.status(500).json({ success: false, message: 'Server error fetching hotels' });
    }
};

// PUT /api/admin/hotels/:id/approve
exports.approveHotel = async (req, res) => {
    try {
        const { id } = req.params;
        await Hotel.updateStatus(id, 'approved');
        return res.json({ success: true, message: 'Hotel approved' });
    } catch (error) {
        console.error('Admin approve hotel error:', error);
        return res.status(500).json({ success: false, message: 'Server error approving hotel' });
    }
};

// PUT /api/admin/hotels/:id/reject
exports.rejectHotel = async (req, res) => {
    try {
        const { id } = req.params;
        await Hotel.updateStatus(id, 'rejected');
        return res.json({ success: true, message: 'Hotel rejected' });
    } catch (error) {
        console.error('Admin reject hotel error:', error);
        return res.status(500).json({ success: false, message: 'Server error rejecting hotel' });
    }
};

// DELETE /api/admin/hotels/:id
exports.deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Hotel.adminDelete(id);
        if (result.changes === 0) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }
        return res.json({ success: true, message: 'Hotel deleted' });
    } catch (error) {
        console.error('Admin delete hotel error:', error);
        return res.status(500).json({ success: false, message: 'Server error deleting hotel' });
    }
};

// GET /api/admin/bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await db.all(`
            SELECT b.*, u.fullName as userName, u.email as userEmail
            FROM bookings b
            LEFT JOIN users u ON b.user_id = u.id
            ORDER BY b.created_at DESC
        `);
        return res.json({ success: true, bookings });
    } catch (error) {
        console.error('Admin get bookings error:', error);
        return res.status(500).json({ success: false, message: 'Server error fetching bookings' });
    }
};

// GET /api/admin/feedback
exports.getAllFeedback = async (req, res) => {
    try {
        const feedback = await db.all('SELECT * FROM feedback ORDER BY created_at DESC');
        return res.json({ success: true, feedback });
    } catch (error) {
        console.error('Admin get feedback error:', error);
        return res.status(500).json({ success: false, message: 'Server error fetching feedback' });
    }
};

// DELETE /api/admin/feedback/:id
exports.deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.run('DELETE FROM feedback WHERE id = ?', [id]);
        if (result.changes === 0) {
            return res.status(404).json({ success: false, message: 'Feedback not found' });
        }
        return res.json({ success: true, message: 'Feedback deleted' });
    } catch (error) {
        console.error('Admin delete feedback error:', error);
        return res.status(500).json({ success: false, message: 'Server error deleting feedback' });
    }
};

// GET /api/admin/contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await db.all('SELECT * FROM contact_messages ORDER BY created_at DESC');
        return res.json({ success: true, contacts });
    } catch (error) {
        console.error('Admin get contacts error:', error);
        return res.status(500).json({ success: false, message: 'Server error fetching contacts' });
    }
};

// DELETE /api/admin/contacts/:id
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.run('DELETE FROM contact_messages WHERE id = ?', [id]);
        if (result.changes === 0) {
            return res.status(404).json({ success: false, message: 'Contact message not found' });
        }
        return res.json({ success: true, message: 'Contact message deleted' });
    } catch (error) {
        console.error('Admin delete contact error:', error);
        return res.status(500).json({ success: false, message: 'Server error deleting contact message' });
    }
};
