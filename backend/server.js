require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const contactRoutes = require('./routes/contactRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ success: true, status: 'ok', message: 'Visit Sri Lanka API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoints:`);
    console.log(`  POST /api/auth/register`);
    console.log(`  POST /api/auth/login`);
    console.log(`  POST /api/feedback`);
    console.log(`  GET  /api/feedback`);
    console.log(`  GET  /api/feedback/stats`);
    console.log(`  DELETE /api/feedback/:id`);
    console.log(`  POST /api/contact`);
    console.log(`  GET  /api/contact`);
    console.log(`  GET  /api/contact/:id`);
    console.log(`  DELETE /api/contact/:id`);
    console.log(`  GET  /api/health`);
    console.log(`  POST /api/bookings`);
    console.log(`  GET  /api/bookings/my`);
    console.log(`  DELETE /api/bookings/:id`);
    console.log(`  PUT  /api/auth/profile`);
    console.log(`  POST /api/auth/forgot-password`);
    console.log(`  POST /api/auth/reset-password`);
    console.log(`  GET  /api/hotels/approved`);
    console.log(`  POST /api/hotels (hotel owner)`);
    console.log(`  GET  /api/hotels/my (hotel owner)`);
    console.log(`  GET  /api/hotels/my-bookings (hotel owner)`);
    console.log(`  GET  /api/admin/stats (admin)`);
    console.log(`  GET  /api/admin/users (admin)`);
    console.log(`  GET  /api/admin/hotels (admin)`);
    console.log(`  GET  /api/admin/bookings (admin)`);
    console.log(`  Default admin: admin@visitsrilanka.lk / Admin@123`);
});
