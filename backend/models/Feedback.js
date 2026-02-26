const db = require('../database');

class Feedback {
    // Validate feedback data
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

        // Rating validation
        if (!data.rating) {
            errors.push({ field: 'rating', message: 'Rating is required' });
        } else if (data.rating < 1 || data.rating > 5) {
            errors.push({ field: 'rating', message: 'Rating must be between 1 and 5' });
        }

        // Message validation
        if (!data.message || !data.message.trim()) {
            errors.push({ field: 'message', message: 'Feedback message is required' });
        } else if (data.message.trim().length < 10) {
            errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
        }

        // Category validation (optional field but must be valid if provided)
        if (data.category && !['hotel', 'tour', 'website'].includes(data.category.toLowerCase())) {
            errors.push({ field: 'category', message: 'Invalid category selected' });
        }

        // Subject validation (optional field but must be valid if provided)
        if (data.subject && !['general', 'suggestion', 'complaint', 'compliment', 'other'].includes(data.subject.toLowerCase())) {
            errors.push({ field: 'subject', message: 'Invalid subject selected' });
        }

        return errors;
    }

    // Check for duplicate submission (same email + message within last minute)
    static checkDuplicate(email, message) {
        return new Promise(async (resolve, reject) => {
            try {
                // Check for submissions from same email in the last minute
                const sql = `
                    SELECT id FROM feedback 
                    WHERE email = ? 
                    AND message = ? 
                    AND created_at > datetime('now', '-1 minute')
                `;
                const rows = await db.all(sql, [email.toLowerCase(), message.trim()]);
                resolve(rows.length > 0);
            } catch (err) {
                reject(err);
            }
        });
    }

    // Create a new feedback
    static create(feedbackData) {
        return new Promise(async (resolve, reject) => {
            try {
                // Normalize email to lowercase
                const normalizedEmail = feedbackData.email.toLowerCase();

                // Insert feedback into database
                const sql = `
                    INSERT INTO feedback (name, email, rating, category, subject, message)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;

                const result = await db.run(
                    sql,
                    [
                        feedbackData.fullName.trim(),
                        normalizedEmail,
                        feedbackData.rating,
                        feedbackData.category || null,
                        feedbackData.subject || null,
                        feedbackData.message.trim()
                    ]
                );

                resolve({
                    id: result.lastID,
                    name: feedbackData.fullName.trim(),
                    email: normalizedEmail,
                    rating: feedbackData.rating,
                    category: feedbackData.category || null,
                    subject: feedbackData.subject || null,
                    message: feedbackData.message.trim()
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    // Get all feedback (for admin)
    static getAll(filters = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                let sql = 'SELECT * FROM feedback';
                const params = [];

                // Apply filters if provided
                if (filters.rating) {
                    sql += ' WHERE rating = ?';
                    params.push(filters.rating);
                }

                if (filters.category) {
                    sql += params.length > 0 ? ' AND' : ' WHERE';
                    sql += ' category = ?';
                    params.push(filters.category);
                }

                // Order by newest first
                sql += ' ORDER BY created_at DESC';

                const rows = await db.all(sql, params);
                resolve(rows);
            } catch (err) {
                reject(err);
            }
        });
    }

    // Get feedback by ID
    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const row = await db.get('SELECT * FROM feedback WHERE id = ?', [id]);
                resolve(row || null);
            } catch (err) {
                reject(err);
            }
        });
    }

    // Delete feedback
    static delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await db.run('DELETE FROM feedback WHERE id = ?', [id]);
                resolve(result.changes > 0);
            } catch (err) {
                reject(err);
            }
        });
    }

    // Get feedback statistics
    static getStatistics() {
        return new Promise(async (resolve, reject) => {
            try {
                // Get total count and average rating
                const stats = await db.get(`
                    SELECT 
                        COUNT(*) as total,
                        AVG(rating) as averageRating,
                        MIN(rating) as minRating,
                        MAX(rating) as maxRating
                    FROM feedback
                `);

                // Get rating distribution
                const distribution = await db.all(`
                    SELECT rating, COUNT(*) as count
                    FROM feedback
                    GROUP BY rating
                    ORDER BY rating DESC
                `);

                // Get category distribution
                const categoryStats = await db.all(`
                    SELECT category, COUNT(*) as count
                    FROM feedback
                    WHERE category IS NOT NULL
                    GROUP BY category
                `);

                resolve({
                    total: stats.total || 0,
                    averageRating: stats.averageRating ? parseFloat(stats.averageRating).toFixed(2) : 0,
                    minRating: stats.minRating || 0,
                    maxRating: stats.maxRating || 0,
                    ratingDistribution: distribution,
                    categoryDistribution: categoryStats
                });
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = Feedback;
