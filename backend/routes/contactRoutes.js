const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// @route   POST /api/contact
// @desc    Submit new contact message
// @access  Public
router.post('/', contactController.submitContact);

// @route   GET /api/contact
// @desc    Get all contact messages (admin)
// @access  Public (for now, can be restricted to admin later)
router.get('/', contactController.getAllContacts);

// @route   GET /api/contact/:id
// @desc    Get contact message by ID (admin)
// @access  Public (for now, can be restricted to admin later)
router.get('/:id', contactController.getContactById);

// @route   DELETE /api/contact/:id
// @desc    Delete contact message
// @access  Public (for now, can be restricted to admin later)
router.delete('/:id', contactController.deleteContact);

module.exports = router;
