require('dotenv').config();
const Contact = require('../models/Contact');

// Submit new contact message
exports.submitContact = async (req, res) => {
    try {
        const { name, email, subject, message, phone } = req.body;

        // Validate contact data
        const validationErrors = Contact.validate({
            name,
            email,
            subject,
            message,
            phone
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

        // Create new contact message
        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
            phone
        });

        // Return success response
        return res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully',
            contact: {
                id: contact.id,
                name: contact.name,
                createdAt: contact.created_at
            }
        });

    } catch (error) {
        console.error('Contact submission error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during message submission'
        });
    }
};

// Get all contact messages (admin)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.getAll();

        return res.status(200).json({
            success: true,
            count: contacts.length,
            contacts: contacts
        });

    } catch (error) {
        console.error('Get contacts error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching contacts'
        });
    }
};

// Get contact message by ID (admin)
exports.getContactById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Contact ID is required'
            });
        }

        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        return res.status(200).json({
            success: true,
            contact: contact
        });

    } catch (error) {
        console.error('Get contact error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching contact'
        });
    }
};

// Delete contact message (admin)
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Contact ID is required'
            });
        }

        const deleted = await Contact.delete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });

    } catch (error) {
        console.error('Delete contact error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while deleting contact'
        });
    }
};
