const Contact = require('../models/Contact');

// Create a new contact submission
exports.createContact = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;
    
    const contact = await Contact.create({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Thank you for contacting us. We will get back to you soon.',
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form. Please try again.',
      error: error.message,
    });
  }
};

// Get all contacts (admin only)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message,
    });
  }
};

// Get contact by ID (admin only)
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: error.message,
    });
  }
};
