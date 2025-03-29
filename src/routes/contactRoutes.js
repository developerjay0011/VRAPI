const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createContact,
  getAllContacts,
  getContactById,
} = require('../controllers/contactController');

// Public route for creating contact
router.post('/', createContact);

// Admin routes
router.get('/', auth, getAllContacts);
router.get('/:id', auth, getContactById);

module.exports = router;
