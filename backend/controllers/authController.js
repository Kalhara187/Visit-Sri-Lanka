const User = require('../models/User');

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

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Login successful',
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
