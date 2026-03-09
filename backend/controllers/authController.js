require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const db = require('../database');

// JWT configuration from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'visit-sri-lanka-secret-key-2024';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Register a new user
exports.register = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword, phone, userType, acceptTerms } = req.body;

        // Validate user data
        const validationErrors = User.validate({
            fullName,
            email,
            password,
            confirmPassword,
            phone,
            userType,
            acceptTerms
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

        // Check if email already exists
        const emailExists = await User.checkEmailExists(email);
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists',
                errors: {
                    email: 'This email is already registered'
                }
            });
        }

        // Create new user
        const user = await User.create({
            fullName,
            email,
            password,
            phone,
            userType,
            acceptTerms
        });

        // Return success response
        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find user by email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Verify password
        const isMatch = await User.verifyPassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Return success response with token
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
};

// Update logged-in user profile
exports.updateProfile = async (req, res) => {
    try {
        const { fullName, phone } = req.body;
        if (!fullName || !fullName.trim()) {
            return res.status(400).json({ success: false, message: 'Full name is required' });
        }
        await db.run(
            'UPDATE users SET fullName = ?, phone = ? WHERE id = ?',
            [fullName.trim(), phone || '', req.user.id]
        );
        const updated = await db.get(
            'SELECT id, fullName, email, phone, role, created_at FROM users WHERE id = ?',
            [req.user.id]
        );
        return res.json({ success: true, message: 'Profile updated', user: updated });
    } catch (error) {
        console.error('Update profile error:', error);
        return res.status(500).json({ success: false, message: 'Server error updating profile' });
    }
};

// Forgot Password - generate a reset code
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

        const user = await db.get('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
        // Always return success to avoid email enumeration
        if (!user) {
            return res.json({ success: true, message: 'If that email exists, a reset code has been sent.' });
        }

        // Generate 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 min

        // Invalidate old tokens for this email
        await db.run('DELETE FROM password_reset_tokens WHERE email = ?', [email.toLowerCase()]);
        await db.run(
            'INSERT INTO password_reset_tokens (email, token, expires_at) VALUES (?, ?, ?)',
            [email.toLowerCase(), code, expiresAt]
        );

        // In production this would send an email; for dev we return the code directly
        return res.json({ success: true, message: 'Reset code generated.', resetCode: code });
    } catch (error) {
        console.error('Forgot password error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Reset Password - verify code and set new password
exports.resetPassword = async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;
        if (!email || !code || !newPassword) {
            return res.status(400).json({ success: false, message: 'Email, code, and new password are required' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
        }

        const record = await db.get(
            'SELECT * FROM password_reset_tokens WHERE email = ? AND token = ? AND used = 0',
            [email.toLowerCase(), code]
        );

        if (!record) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset code' });
        }

        if (new Date(record.expires_at) < new Date()) {
            return res.status(400).json({ success: false, message: 'Reset code has expired. Please request a new one.' });
        }

        const bcrypt = require('bcryptjs');
        const hashed = await bcrypt.hash(newPassword, 10);
        await db.run('UPDATE users SET password = ? WHERE email = ?', [hashed, email.toLowerCase()]);
        await db.run('UPDATE password_reset_tokens SET used = 1 WHERE id = ?', [record.id]);

        return res.json({ success: true, message: 'Password reset successfully. You can now sign in.' });
    } catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get current logged-in user profile
exports.getMe = async (req, res) => {
    try {
        // req.user is set by the protect middleware
        const user = await db.get(
            'SELECT id, fullName, email, phone, role, created_at FROM users WHERE id = ?',
            [req.user.id]
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            user: user
        });

    } catch (error) {
        console.error('Get profile error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching profile'
        });
    }
};
