const db = require('../database');
const bcrypt = require('bcryptjs');

class User {
    // Validate user registration data
    static validate(data) {
        const errors = [];

        // Full Name validation
        if (!data.fullName || !data.fullName.trim()) {
            errors.push({ field: 'fullName', message: 'Full name is required' });
        } else if (data.fullName.trim().length < 2) {
            errors.push({ field: 'fullName', message: 'Full name must be at least 2 characters' });
        }

        // Email validation
        if (!data.email || !data.email.trim()) {
            errors.push({ field: 'email', message: 'Email address is required' });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.push({ field: 'email', message: 'Please enter a valid email address' });
        }

        // Password validation
        if (!data.password) {
            errors.push({ field: 'password', message: 'Password is required' });
        } else if (data.password.length < 6) {
            errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
        }

        // Confirm Password validation
        if (!data.confirmPassword) {
            errors.push({ field: 'confirmPassword', message: 'Please confirm your password' });
        } else if (data.password !== data.confirmPassword) {
            errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
        }

        // User Type validation
        if (!data.userType) {
            errors.push({ field: 'userType', message: 'Please select an account type' });
        } else if (!['traveler', 'hotelOwner'].includes(data.userType)) {
            errors.push({ field: 'userType', message: 'Invalid account type' });
        }

        // Terms acceptance validation
        if (!data.acceptTerms) {
            errors.push({ field: 'acceptTerms', message: 'You must accept the Terms & Conditions' });
        }

        return errors;
    }

    // Check if email already exists
    static checkEmailExists(email) {
        return new Promise((resolve, reject) => {
            db.get('SELECT id FROM users WHERE email = ?', [email.toLowerCase()], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(!!row);
                }
            });
        });
    }

    // Create a new user
    static create(userData) {
        return new Promise(async (resolve, reject) => {
            try {
                // Hash the password
                const hashedPassword = await bcrypt.hash(userData.password, 10);

                // Normalize email to lowercase
                const normalizedEmail = userData.email.toLowerCase();

                // Determine role
                const role = userData.userType === 'hotelOwner' ? 'hotelOwner' : 'traveler';

                // Insert user into database
                const sql = `
                    INSERT INTO users (fullName, email, password, phone, role, acceptTerms)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;

                db.run(
                    sql,
                    [
                        userData.fullName.trim(),
                        normalizedEmail,
                        hashedPassword,
                        userData.phone || null,
                        role,
                        userData.acceptTerms ? 1 : 0
                    ],
                    function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                id: this.lastID,
                                fullName: userData.fullName.trim(),
                                email: normalizedEmail,
                                role: role
                            });
                        }
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    }

    // Find user by email
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Verify password
    static verifyPassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = User;
