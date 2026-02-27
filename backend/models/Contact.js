const db = require('../database');

class Contact {
    // Validate contact data
    static validate(data) {
        const errors = [];

        // Full Name validation
        if (!data.name || !data.name.trim()) {
            errors.push({ field: 'name', message: 'Full name is required' });
        } else if (data.name.trim().length < 2) {
            errors.push({ field: 'name', message: 'Full name must be at least 2 characters' });
        }

        // Email validation
        if (!data.email || !data.email.trim()) {
            errors.push({ field: 'email', message: 'Email address is required' });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.push({ field: 'email', message: 'Please enter a valid email address' });
        }

        // Subject validation
        if (!data.subject || !data.subject.trim()) {
            errors.push({ field: 'subject', message: 'Subject is required' });
        }

        // Message validation
        if (!data.message || !data.message.trim()) {
            errors.push({ field: 'message', message: 'Message is required' });
        } else if (data.message.trim().length < 10) {
            errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
        }

        return errors;
    }

    // Create a new contact message
    static create(contactData) {
        return new Promise(async (resolve, reject) => {
            try {
                // Normalize email to lowercase
                const normalizedEmail = contactData.email.toLowerCase();

                // Insert contact into database
                const sql = `
                    INSERT INTO contact_messages (name, email, subject, message, phone)
                    VALUES (?, ?, ?, ?, ?)
                `;

                const result = await db.run(
                    sql,
                    [
                        contactData.name.trim(),
                        normalizedEmail,
                        contactData.subject.trim(),
                        contactData.message.trim(),
                        contactData.phone || null
                    ]
                );

                resolve({
                    id: result.lastID,
                    name: contactData.name.trim(),
                    email: normalizedEmail,
                    subject: contactData.subject.trim(),
                    message: contactData.message.trim(),
                    phone: contactData.phone || null
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    // Get all contact messages (admin)
    static getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const rows = await db.all('SELECT * FROM contact_messages ORDER BY created_at DESC');
                resolve(rows);
            } catch (err) {
                reject(err);
            }
        });
    }

    // Get contact message by ID
    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const row = await db.get('SELECT * FROM contact_messages WHERE id = ?', [id]);
                resolve(row || null);
            } catch (err) {
                reject(err);
            }
        });
    }

    // Delete contact message
    static delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await db.run('DELETE FROM contact_messages WHERE id = ?', [id]);
                resolve(result.changes > 0);
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = Contact;
