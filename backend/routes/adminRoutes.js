const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// All admin routes require authentication + admin role
router.use(protect, isAdmin);

// Stats
router.get('/stats', adminController.getStats);

// User management
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);

// Hotel management
router.get('/hotels', adminController.getAllHotels);
router.put('/hotels/:id/approve', adminController.approveHotel);
router.put('/hotels/:id/reject', adminController.rejectHotel);
router.delete('/hotels/:id', adminController.deleteHotel);

// Bookings (read-only for admin)
router.get('/bookings', adminController.getAllBookings);

// Feedback management
router.get('/feedback', adminController.getAllFeedback);
router.delete('/feedback/:id', adminController.deleteFeedback);

// Contact messages management
router.get('/contacts', adminController.getAllContacts);
router.delete('/contacts/:id', adminController.deleteContact);

module.exports = router;
