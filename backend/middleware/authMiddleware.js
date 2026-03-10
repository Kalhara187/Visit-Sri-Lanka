require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'visit-sri-lanka-secret-key-2024';

// Protect routes - verify JWT token
const protect = (req, res, next) => {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized. No token provided.'
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized. Token is invalid or expired.'
        });
    }
};

// Optional auth - attaches user if token present, continues either way
const optionalAuth = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
        } catch (error) {
            // Token invalid - continue without user
            req.user = null;
        }
    }

    next();
};

// Admin-only middleware (must be used after protect)
const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    next();
};

// Hotel owner middleware – admin can also access (must be used after protect)
const isHotelOwner = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    if (req.user.role !== 'hotelOwner' && req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Hotel owner access required' });
    }
    next();
};

module.exports = { protect, optionalAuth, isAdmin, isHotelOwner };
